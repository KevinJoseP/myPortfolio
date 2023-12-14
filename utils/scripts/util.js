const menuBtn = document.querySelector('.mobile-header .menu-btn');
const mobileNavbar = document.querySelector('.mobile-header');
const desktopNavBar = document.getElementById('nav-bar-container');
const closeBtn = document.querySelector('#nav-bar-container .close-btn');
const navLinks = document.querySelectorAll('.nav-link');
const logoBtnMobile = document.querySelector('#nav-bar-container .image-link');


function handleMenuButton(e)
{
    desktopNavBar.classList.add('mobile');
    mobileNavbar.classList.add('display-none');
    e.preventDefault();
}

function handleCloseButton(e)
{
    desktopNavBar.classList.remove('mobile');
    mobileNavbar.classList.remove('display-none');
    e.preventDefault()

}

function handleNavClick(e)
{
    desktopNavBar.classList.remove('mobile');
    mobileNavbar.classList.remove('display-none');
}

menuBtn.addEventListener('click', handleMenuButton);
closeBtn.addEventListener('click', handleCloseButton);

navLinks.forEach(navLink => {
    console.log(navLink);
    navLink.addEventListener('click', handleNavClick);
});
logoBtnMobile.addEventListener('click', handleNavClick);