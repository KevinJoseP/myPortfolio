const menuBtn = document.querySelector('.mobile-header .menu-btn');
const mobileNavbar = document.querySelector('.mobile-header');
const desktopNavBar = document.getElementById('nav-bar-container');
const closeBtn = document.querySelector('#nav-bar-container .close-btn');
const navLinks = document.querySelectorAll('.nav-link');
const logoBtnMobile = document.querySelector('#nav-bar-container .image-link');
const galleryToggleImgs = document.querySelectorAll('.option-logo');

function processHideClassToZIndexMessUp(isAdd)
{
    if (galleryToggleImgs)
    {
        galleryToggleImgs.forEach(img=>
            {
                if (isAdd)img.classList.add('hide-if-needed');
                else img.classList.remove('hide-if-needed');
            });
    }
}

function handleMenuButton(e)
{
    e.preventDefault();
    desktopNavBar.classList.add('mobile');
    mobileNavbar.classList.add('display-none');
    processHideClassToZIndexMessUp(true);
}

function handleCloseButton(e)
{
    console.log("ssss");
    desktopNavBar.classList.remove('mobile');
    mobileNavbar.classList.remove('display-none');
    processHideClassToZIndexMessUp(false);
    e.preventDefault()

}

function handleNavClick(e)
{
    desktopNavBar.classList.remove('mobile');
    mobileNavbar.classList.remove('display-none');
    processHideClassToZIndexMessUp(false);
}


menuBtn.addEventListener('click', handleMenuButton);
closeBtn.addEventListener('click', handleCloseButton);

navLinks.forEach(navLink => {
    navLink.addEventListener('click', handleNavClick);
});
logoBtnMobile.addEventListener('click', handleNavClick);
