const heroPageNavBar = document.querySelector('#home-page-icon #nav-bar-container');

function handleLogoChangeToNavBar (entries, mainLogoObserver)
{
    entries.forEach(entry => {
        if (entry.isIntersecting)
        {
            heroPageNavBar.classList.add('hero-page');
        }
        else
        {
            heroPageNavBar.classList.remove('hero-page');
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