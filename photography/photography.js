const smilesGallery = document.getElementById('smiles-gallery-section');
const MAX_SMILES_PHOTO_COUNT = 63;
const MAX_GALLERY_PHOTO_COUNT = 2;
const SMILE_URL = "./smiles/smiles";


function fillInPhotos(isSmiles)
{
    smilesGallery.innerHTML = '';
    let currMaxCount = 0;
    if (isSmiles)
    {
        currMaxCount = MAX_SMILES_PHOTO_COUNT;
        currUrl = SMILE_URL;
    }
    else
    {
        currMaxCount = MAX_GALLERY_PHOTO_COUNT;

    }

    for (let i = 0; i < currMaxCount;i++)
    {
        let tempUrl = currUrl + i + ".jpg";
        const photoCont = document.createElement('div');
        const galleryImg = document.createElement('img');
        galleryImg.classList.add('gallery-photo');
        galleryImg.src = tempUrl;
        galleryImg.loading = "lazy";
        photoCont.classList.add('photo-cont');
        photoCont.appendChild(galleryImg);
        smilesGallery.appendChild(photoCont);
    }
}

fillInPhotos(true);