const heroPageNavBar = document.querySelector('#home-page-icon #nav-bar-container');
const projectsSection = document.getElementById('projects');
const welcomeSection = document.getElementById('welcome-section');
const heroLogoImg = document.querySelector('#welcome-section .main-icon-cont img');
const downArrow = document.querySelector('#welcome-section .down-arrow');

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

function handleWelcomeScreenChange (entries, welcomeScreenObserver)
{
    entries.forEach(entry => {
        if (entry.isIntersecting)
        {
            downArrow.classList.remove('non-hero-page');
        }
        else
        {
            downArrow.classList.add('non-hero-page');
        }
    })
}






const mainLogoObserver = new IntersectionObserver(handleLogoChangeToNavBar, {
    threshold: 0.5
});
const welcomeScreenObserver = new IntersectionObserver(handleWelcomeScreenChange, {
    threshold: 0.9
});

if (heroLogoImg)
{
    mainLogoObserver.observe(heroLogoImg);
}

if (welcomeSection)
{
    welcomeScreenObserver.observe(welcomeSection);
}