const URL = 'https://api.thedogapi.com/v1/images/search?limit=3';


const changeImage = async ()=>{
    let uldData = await fetch(URL);
    let json = await uldData.json();
    let breeds = json[0].breeds;
    const exploreSection = document.querySelector('#explore');
    debugger;
    // const imageCap = document.querySelector('figcaption');
    imageSrc.src = json[0].url;
    // imageSrc.alt = breeds[0].bred_for;
    // imageCap.innerText = breeds[0].bred_for;
}

changeImage();

const btn = document.querySelector('button');
btn.addEventListener('click', changeImage);
