const smilesGallery = document.getElementById('smiles-gallery-section');
const photoGallery = document.getElementById('photography-gallery-section');
const myGalleryBtn = document.getElementById('my-gallery-button');
const smileSectBtn = document.getElementById('smile-sect-button');
const smilesSect = document.getElementById('smiles-intro');
const gallerySect = document.getElementById('photography-intro');
const navBarContHeader = document.getElementById('photography-nav-bar-cont-header');
const back2TopObserver = new IntersectionObserver (handleBack2Top, {});
const shuffleBtn = document.querySelector('.shuffle');

const MAX_SMILES_PHOTO_COUNT = 63;
const MAX_GALLERY_PHOTO_COUNT = 66;
const SMILE_URL = "./smiles/smiles";
const GALLERY_URL = "./gallery/gallery"

function addBackToTopHack(galleryCnt)
{
    const backToTopBtnHackdiv = document.createElement('div');
    backToTopBtnHackdiv.classList.add('backtotophack');
    back2TopObserver.observe(backToTopBtnHackdiv);
    galleryCnt.insertBefore(backToTopBtnHackdiv, galleryCnt.children[1]);
}

function addBottomNavBar(galleryCnt)
{
    const bottomNavBar = document.createElement('div');
    bottomNavBar.classList.add('bottom-control-panel');

    addBackToTopBtn(bottomNavBar);
    addShuffleBtn(bottomNavBar);
    galleryCnt.appendChild(bottomNavBar);
}

function addShuffleBtn(galleryCnt)
{
    var a = document.createElement('a');
    a.classList.add('shuffle');

    // Create the image element
    var img = document.createElement('img');
    img.src = './../photography/util/shuffle.svg';
    img.alt = 'shuffle image';

    // Append the image and the description div to the anchor
    a.appendChild(img);
    a.addEventListener('click', handleShuffle);

    galleryCnt.appendChild(a);
}

function addBackToTopBtn(galleryCnt)
{
    // Create the anchor element
    var a = document.createElement('a');
    a.href = './photography.html#section-top';
    a.classList.add('back-to-top-photo');

    // Create the image element
    var img = document.createElement('img');
    img.src = './../images/back2Top.svg';
    img.alt = 'up arrow key indicating back to top';

    // Append the image and the description div to the anchor
    a.appendChild(img);

    galleryCnt.appendChild(a);
}


function fillInPhotos(isSmiles)
{
    let currMaxCount = 0;
    if (isSmiles)
    {
        currMaxCount = MAX_SMILES_PHOTO_COUNT;
        currUrl = SMILE_URL;
        photoGallery.innerHTML = '';
        smilesGallery.innerHTML = '';
        navBarContHeader.classList.add('type-smile');
    }
    else
    {
        currMaxCount = MAX_GALLERY_PHOTO_COUNT;
        currUrl = GALLERY_URL;
        photoGallery.innerHTML = '';
        smilesGallery.innerHTML = '';
        navBarContHeader.classList.remove('type-smile');

    }

    for (let i = 0; i < currMaxCount;i++)
    {
        let tempUrl = currUrl + i + ".jpg";
        const photoCont = document.createElement('div');
        const galleryImg = document.createElement('img');
        galleryImg.classList.add('gallery-photo');
        galleryImg.src = tempUrl;
        photoCont.classList.add('photo-cont');
        photoCont.appendChild(galleryImg);
        if (isSmiles)
        {
            smilesGallery.appendChild(photoCont);
        }
        else
        {
            photoGallery.appendChild(photoCont);
        }
    }

    if(isSmiles)
    {
        addBackToTopHack(smilesGallery)
        addBottomNavBar(smilesGallery);
    }
    else
    { 
        addBackToTopHack(photoGallery);
        addBottomNavBar(photoGallery);
    }
}

function handleChangeToGallery()
{
    smilesSect.classList.add('display-none');
    gallerySect.classList.remove('display-none');
    fillInPhotos(false);
    controlBack2TopButton();
}

function handleChangeToSmile()
{
    gallerySect.classList.add('display-none');
    smilesSect.classList.remove('display-none');
    fillInPhotos(true);
    controlBack2TopButton();
}

function controlBack2TopButton()
{
    const back2TopHack = document.querySelector('.backtotophack');
    back2TopObserver.observe(back2TopHack);
}

function handleBack2Top(entries, back2TopObserver)
{
    entries.forEach(entry => {
        const backToTopBtn = document.querySelector('.back-to-top-photo');
        if (entry.isIntersecting)
        {
            if (backToTopBtn)backToTopBtn.classList.add('display-none');
        }
        else
        {
            if (backToTopBtn)backToTopBtn.classList.remove('display-none');
        }
    });
}

function handleShuffle(e)
{
    if (navBarContHeader.classList.contains('type-smile'))
    {
        const hackDiv = document.querySelector('#smiles-gallery-section .backtotophack');
        smilesGallery.removeChild(hackDiv);
        const divs = Array.prototype.slice.call(smilesGallery.children);
        while (divs.length) {
            smilesGallery.appendChild(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
        addBackToTopHack(smilesGallery);
    }
    else
    {
        const hackDiv = document.querySelector('#photography-gallery-section .backtotophack');
        photoGallery.removeChild(hackDiv);
        const divs = Array.prototype.slice.call(photoGallery.children);
        while (divs.length) {
            photoGallery.appendChild(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
        addBackToTopHack(photoGallery);
    }
    
}


fillInPhotos(false);
controlBack2TopButton();
if (myGalleryBtn)myGalleryBtn.addEventListener('click', handleChangeToGallery);
if (smileSectBtn)smileSectBtn.addEventListener('click', handleChangeToSmile);
