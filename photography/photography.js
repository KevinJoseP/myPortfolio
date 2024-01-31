const photoGallery = document.getElementById('photography-gallery-section');
const smileSectBtn = document.getElementById('smile-sect-button');
const gallerySect = document.getElementById('photography-intro');
const back2TopObserver = new IntersectionObserver (handleBack2Top, {});
const back2TopObserverMobile = new IntersectionObserver (handleBack2TopMobile, {
    threshold: 0.5
});
const shuffleBtn = document.querySelector('.shuffle');


const MAX_GALLERY_PHOTO_COUNT = 66;
const GALLERY_URL = "./gallery/gallery"

const mediaQuery = window.matchMedia('(max-width: 40em)');
let isCurrentScreenSmiles = false;
let isMobile = mediaQuery.matches;
mediaQuery.addEventListener('change', handleMediaChange);

function handleMediaChange(e)
{
    let screenOldValue = isMobile;
    //console.log("hanldeMediaChange");
    if (e.matches)
    {
        isMobile = true;
    }
    else
    {
        isMobile = false;
    }

    if (screenOldValue != isMobile)
    {
        triggerMediaChangeActions();
    }

}

function triggerMediaChangeActions()
{
    //console.log("triggerMediaChangeActions");
    if(isMobile)
    {
        deleteHackDiv();
        addBottomPanelObserverForMobile();
    }
    else
    {
        addBackToTopHack();
        removeBottomPanelObserverForLargeScreens();
    }
    deleteBottomNavbar();
    addBottomNavBar();
}



function deleteHackDiv()
{
    const hackDiv = document.querySelector('#photography-gallery-section .backtotophack');
    photoGallery.removeChild(hackDiv);
}


function addBackToTopHack()
{
    let galleryCnt = photoGallery;
    const backToTopBtnHackdiv = document.createElement('div');
    backToTopBtnHackdiv.classList.add('backtotophack');
    back2TopObserver.observe(backToTopBtnHackdiv);
    galleryCnt.insertBefore(backToTopBtnHackdiv, galleryCnt.children[1]);
}

function addBottomNavBar()
{
    let currGalleryCnt = photoGallery;
    const bottomNavBar = document.createElement('div');
    bottomNavBar.classList.add('bottom-control-panel');

    addBackToTopBtn(bottomNavBar);
    addShuffleBtn(bottomNavBar);
    currGalleryCnt.appendChild(bottomNavBar);
    //console.log("added bottom nav")
}

function deleteBottomNavbar()
{
    bottomNavBar = document.querySelector('#photography-intro .bottom-control-panel');
    //console.log(bottomNavBar);
    let currGallery = photoGallery
    currGallery.removeChild(bottomNavBar);
    //console.log("deletedBottomNavBar");
}

function addShuffleBtn(navCnt)
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

    navCnt.appendChild(a);
}

function addBackToTopBtn(navCnt)
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

    navCnt.appendChild(a);
}


function fillInPhotos()
{
    let currMaxCount = 0;
    let currGallery;
    currMaxCount = MAX_GALLERY_PHOTO_COUNT;
    currUrl = GALLERY_URL;
    photoGallery.innerHTML = '';
    currGallery = photoGallery;

    for (let i = 0; i < currMaxCount;i++)
    {
        let tempUrl = currUrl + i + ".jpg";
        const photoCont = document.createElement('div');
        const galleryImg = document.createElement('img');
        galleryImg.classList.add('gallery-photo');
        galleryImg.src = tempUrl;
        photoCont.classList.add('photo-cont');
        photoCont.appendChild(galleryImg);
        currGallery.appendChild(photoCont);
    }

    addBottomNavBar();
    if (!isMobile)
    {
        addBackToTopHack();
    }
    else
    {
        addBottomPanelObserverForMobile();
    }
}


function handleBack2Top(entries, back2TopObserver)
{
    entries.forEach(entry => {
        // //console.log("handleBack2top")
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

function handleBack2TopMobile(entries, back2TopObserverMobile)
{
    entries.forEach(entry => {
        // //console.log("handleBack2topMobile")
        let bottomNavBar;
        bottomNavBar = document.querySelector('#photography-intro .bottom-control-panel'); 
        
        if (!entry.isIntersecting)
        {
            bottomNavBar.classList.remove('display-none');
        }
        else
        {
            bottomNavBar.classList.add('display-none');
        }
    });
}

function handleShuffle(e)
{
    if (!isMobile)deleteHackDiv();
    deleteBottomNavbar();
    let currGallery = photoGallery;
    const divs = Array.prototype.slice.call(currGallery.children);
    while (divs.length) {
        currGallery.appendChild(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
    if (!isMobile)addBackToTopHack();
    addBottomNavBar(currGallery);
    
}

function addBottomPanelObserverForMobile()
{
    const introSection = document.querySelector('#photography-intro .descr-section-title');
    back2TopObserverMobile.observe(introSection);

}

function removeBottomPanelObserverForLargeScreens()
{
    const introSection = document.querySelector('#photography-intro .descr-section-title');
    back2TopObserverMobile.unobserve(introSection);
}


function init()
{
    fillInPhotos();
    handleShuffle();
}

init();


