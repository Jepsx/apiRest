const URL = 'https://api.thedogapi.com/v1/images/search?limit=3';


const changeImage = async ()=>{
    let uldData = await fetch(URL);
    let json = await uldData.json();
    const exploreSection = document.querySelector('#explore');
    json.forEach((item)=>{
        if(exploreSection.children.length == 4){
            let expChildren = exploreSection.children;
            for(i = 0; i < expChildren.length; i++){
                let expChild = expChildren[i];
                console.log(expChild.localName);
                if(expChild.localName === 'articule'){
                    expChild.remove();
                }
             }

        }else{
            const art = document.createElement("articule");
            const pic = document.createElement("picture");
            const img = document.createElement('img');
            pic.classList.add('img-container');
            img.classList.add('img-container__img');
            img.src = item.url;
            art.append(pic);
            pic.append(img);
            exploreSection.insertAdjacentElement('afterbegin',art);
        }

    });

}

changeImage();

const btn = document.querySelector('button');
btn.addEventListener('click', changeImage);
