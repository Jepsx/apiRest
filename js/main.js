const URL_EXPLORE_RANDOM_DOGS = 'https://api.thedogapi.com/v1/images/search?limit=3';
const URL_FAVORITES_DOGS = 'https://api.thedogapi.com/v1/favourites';


const changeImage = async ()=>{
    const exploreSection = document.querySelector('#explore');
    let uldData = await fetch(URL_EXPLORE_RANDOM_DOGS);
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
                const art = document.createElement("articule");
                const pic = document.createElement("picture");
                const img = document.createElement('img');
                art.classList.add('explore__article');
                pic.classList.add('img-container');
                img.classList.add('img-container__img');
                img.src = item.url;
                art.append(pic);
                pic.append(img);
                exploreSection.insertAdjacentElement('afterbegin',art);
    
    
        });
    }

}

const getFavorites = async ()=>{
    const favoriteSection = document.querySelector('#favorites');
    let uldData = await fetch(URL_FAVORITES_DOGS);
    console.log(uldData);

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
    }
}

changeImage();
getFavorites();

const btn = document.querySelector('button');
btn.addEventListener('click', changeImage);
