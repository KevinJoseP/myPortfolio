const heroPageNavBarLogo = document.querySelector('#home-page-icon #nav-bar-container .nav-logo-grouping .image-link');

function handleLogoChangeToNavBar (entries, mainLogoObserver)
{
    entries.forEach(entry => {
        if (entry.isIntersecting)
        {
            heroPageNavBarLogo.classList.add('hero-page');
            console.log("is Intersecting");
        }
        else
        {
            heroPageNavBarLogo.classList.remove('hero-page');
            console.log("is not intersecting");
        }
    })
}





const mainLogoObserver = new IntersectionObserver(handleLogoChangeToNavBar, {
    threshold: 0.5
});

const heroLogoImg = document.querySelector('#welcome-section .main-icon-cont img');
if (heroLogoImg)
{
    mainLogoObserver.observe(heroLogoImg);
}