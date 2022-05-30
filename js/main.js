const URL_EXPLORE_RANDOM_DOGS = 'https://api.thedogapi.com/v1/images/search';
const URL_FAVORITES_DOGS = 'https://api.thedogapi.com/v1/favourites';
const URL_UPLOAD_DOG = 'https://api.thedogapi.com/v1/images/upload';

const URL_FAVORITES_DOGS_DELETE = (id)=>`https://api.thedogapi.com/v1/favourites/${id}`;


const changeImage = async ()=>{
    const exploreSection = document.querySelector('#explore');
    let uldData = await fetch(URL_EXPLORE_RANDOM_DOGS+'?limit=3');
    if(uldData.status != 200){
        const art = document.createElement("articule");     
        const span = document.createElement("span");     
        const p = document.createElement("p");
        span.innerText = uldData.status;
        p.innerText = 'Oops!, something went wrong.'
        art.classList.add('error');
        span.classList.add('errorSpan');
        p.classList.add('errorP');
        art.append(span);
        art.append(p);
        exploreSection.append(art);

    }else{

        let json = await uldData.json();
    
        json.forEach((item)=>{
            if(exploreSection.children.length == 5){
                let expChildren = exploreSection.children;
                for(i = expChildren.length - 1; i >=0; i--){
                    let expChild = expChildren[i];
    
                    if(expChild.localName === 'articule'){
                        expChild.remove();
                    }
                 }
    
            }
            createElement(exploreSection,item);
        });
    }

}

const getFavorites = async ()=>{
    const favoriteSection = document.querySelector('#favorites');
    let uldData = await fetch(URL_FAVORITES_DOGS,{
        method:'GET',
        headers:{ 'x-api-key':'85959606-c561-4542-bbf6-fbf6de1bd3d0',}});
    if(uldData.status != 200){
        const art = document.createElement("articule");     
        const span = document.createElement("span");     
        const p = document.createElement("p");
        span.innerText = uldData.status;
        p.innerText = 'Oops!, something went wrong.'
        art.classList.add('error');
        span.classList.add('errorSpan');
        p.classList.add('errorP');
        art.append(span);
        art.append(p);
        favoriteSection.append(art);

    }else{
        let json = await uldData.json();
        if(favoriteSection.children.length>1){
            let favChildren = favoriteSection.children;
                for(i = favChildren.length - 1; i >=0; i--){
                    let favChild = favChildren[i];
    
                    if(favChild.localName === 'articule'){
                        favChild.remove();
                    }
                 }
    
        }
            json.forEach((item)=>{
                createElement(favoriteSection,item);
            })


       
    }
}

const saveFavoriteDog = async (id ,art)=>{

    const res = await  fetch(URL_FAVORITES_DOGS,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'x-api-key':'85959606-c561-4542-bbf6-fbf6de1bd3d0'
        },
        body: JSON.stringify({
            image_id: id 
        } 
        )
    });
    art.remove();
    const explore = document.querySelector('#explore');
    let uldData = await fetch(URL_EXPLORE_RANDOM_DOGS+'?limit=1');
    let json = await uldData.json();
    json.forEach((item)=>{
        createElement(explore,item);
    });
    getFavorites();
    
    
}

const createElement = (parent, item)=>{
    const art = document.createElement("articule");
    const pic = document.createElement("picture");
    const img = document.createElement('img');
    const span = document.createElement("span");
    art.classList.add('explore__article');
    pic.classList.add('img-container');
    img.classList.add('img-container__img');
    if(parent==document.querySelector('#explore')){
        span.classList.add('star');
        span.addEventListener('click',()=>{saveFavoriteDog(item.id,art)});
    }else{
        span.classList.add('cancel');
        span.addEventListener('click',()=>{deleteFavorite(item.id,art)});
    }

    if(parent==document.querySelector('#explore')){

        img.src = item.url;
    }else{
        img.src = item.image.url;
    }
    art.append(pic);
    pic.append(img);
    art.append(span);
    if (parent==document.querySelector('#explore')){
        parent.insertAdjacentElement('afterbegin',art);
    }else{
        parent.insertAdjacentElement('beforeend',art);
    }
}

const deleteFavorite =  async (id, child)=>{
    const res = await  fetch(URL_FAVORITES_DOGS_DELETE(id),{
        method:'DELETE',
        headers:{'x-api-key':'85959606-c561-4542-bbf6-fbf6de1bd3d0'}
    });
    if(res.status != 200){
        const art = document.createElement("articule");     
        const span = document.createElement("span");     
        const p = document.createElement("p");
        span.innerText = uldData.status;
        p.innerText = 'Oops!, something went wrong.'
        art.classList.add('error');
        span.classList.add('errorSpan');
        p.classList.add('errorP');
        art.append(span);
        art.append(p);
        favoriteSection.append(art);
    }
    child.remove();
}
const nameDog = document.getElementById('nameDog');
const inputDogFile = document.getElementById('file');
inputDogFile.addEventListener('change', ()=>{
    const form = document.getElementById('uploadingDog');
    const formData = new FormData(form);
    const previewImage = document.createElement('img');
    previewImage.classList.add('img-style');
    const reader = new FileReader();
    const file = formData.get('file');

    reader.addEventListener('load',()=>{
        previewImage.src = reader.result;
        
    },false);
    if(file){

        reader.readAsDataURL(file);
    }
    nameDog.insertAdjacentElement('beforebegin',previewImage)
    nameDog.innerText = file.name;
    nameDog.classList.add('load')
})

const uploadDogPic = async ()=>{
    const form = document.getElementById('uploadingDog');
    const formData = new FormData(form);

    const res = await fetch(URL_UPLOAD_DOG,{
        method: 'POST',
        headers:{
            'x-api-key':'85959606-c561-4542-bbf6-fbf6de1bd3d0',
        },
        body: formData
    })
}


changeImage();
getFavorites(); 
const btn = document.querySelector('button');
btn.addEventListener('click', changeImage);
