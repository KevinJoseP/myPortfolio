const menuBtn = document.querySelector('.mobile-header .menu-btn');
const mobileNavbar = document.querySelector('.mobile-header');
const desktopNavBar = document.getElementById('nav-bar-container');
const closeBtn = document.querySelector('#nav-bar-container .close-btn');

function handleMenuButton(e)
{
    e.preventDefault();
    mobileNavbar.classList.add('display-none');
    desktopNavBar.classList.add('display-flex');
}

function handleCloseButton(e)
{
    e.preventDefault();
    mobileNavbar.classList.remove('display-none');
    desktopNavBar.classList.remove('display-flex');
}



menuBtn.addEventListener('click', handleMenuButton);
closeBtn.addEventListener('click', handleCloseButton);