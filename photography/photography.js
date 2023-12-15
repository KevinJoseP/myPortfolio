const smilesGallery = document.getElementById('smiles-gallery-section');
const photoGallery = document.getElementById('photography-gallery-section');
const myGalleryBtn = document.getElementById('my-gallery-button');
const smileSectBtn = document.getElementById('smile-sect-button');
const smilesSect = document.getElementById('smiles-intro');
const gallerySect = document.getElementById('photography-intro');
const navBarContHeader = document.getElementById('photography-nav-bar-cont-header');
const back2TopObserver = new IntersectionObserver (handleBack2Top, {});

const MAX_SMILES_PHOTO_COUNT = 63;
const MAX_GALLERY_PHOTO_COUNT = 66;
const SMILE_URL = "./smiles/smiles";
const GALLERY_URL = "./gallery/gallery"

function addBackToTopBtn(galleryCnt)
{
    // Create the anchor element
    var a = document.createElement('a');
    a.href = './photography.html#section-top';
    a.classList.add('back-to-top');

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
        const backToTopBtnHackdiv = document.createElement('div');
        backToTopBtnHackdiv.classList.add('backtotophack');
        galleryImg.classList.add('gallery-photo');
        galleryImg.src = tempUrl;
        photoCont.classList.add('photo-cont');
        photoCont.appendChild(galleryImg);
        if (isSmiles)
        {
            smilesGallery.appendChild(photoCont);
            if (i == 0)
            {
                smilesGallery.appendChild(backToTopBtnHackdiv);
            }
        }
        else
        {
            photoGallery.appendChild(photoCont);
            if (i == 0)
            {
                photoGallery.appendChild(backToTopBtnHackdiv);
            }
        }
    }

    if(isSmiles)addBackToTopBtn(smilesGallery);
    else addBackToTopBtn(photoGallery);
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
        const backToTopBtn = document.querySelector('.back-to-top');
        if (entry.isIntersecting)
        {
            console.log(entry);
            if (backToTopBtn)backToTopBtn.classList.add('display-none');
        }
        else
        {
            console.log(entry);
            if (backToTopBtn)backToTopBtn.classList.remove('display-none');
        }
    });
}


fillInPhotos(false);
controlBack2TopButton();
if (myGalleryBtn)myGalleryBtn.addEventListener('click', handleChangeToGallery);
if (smileSectBtn)smileSectBtn.addEventListener('click', handleChangeToSmile);
