const smilesGallery = document.getElementById('smiles-gallery-section');
const photoGallery = document.getElementById('photography-gallery-section');
const myGalleryBtn = document.getElementById('my-gallery-button');
const smileSectBtn = document.getElementById('smile-sect-button');
const smilesSect = document.getElementById('smiles-intro');
const gallerySect = document.getElementById('photography-intro');
const navBarContHeader = document.getElementById('photography-nav-bar-cont-header');

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
        smilesGallery.innerHTML = '';
        navBarContHeader.classList.add('type-smile');
    }
    else
    {
        currMaxCount = MAX_GALLERY_PHOTO_COUNT;
        currUrl = GALLERY_URL;
        photoGallery.innerHTML = '';
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

    if(isSmiles)addBackToTopBtn(smilesGallery);
    else addBackToTopBtn(photoGallery);
}

function handleChangeToGallery()
{
    smilesSect.classList.add('display-none');
    gallerySect.classList.remove('display-none');
    fillInPhotos(false);
}

function handleChangeToSmile()
{
    gallerySect.classList.add('display-none');
    smilesSect.classList.remove('display-none');
    fillInPhotos(true);
}


fillInPhotos(false);
if (myGalleryBtn)myGalleryBtn.addEventListener('click', handleChangeToGallery);
if (smileSectBtn)smileSectBtn.addEventListener('click', handleChangeToSmile);