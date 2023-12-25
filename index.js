const heroPageNavBar = document.querySelector('#home-page-icon #nav-bar-container');
const projectsSection = document.getElementById('projects');
const welcomeSection = document.getElementById('welcome-section');
const heroLogoImg = document.querySelector('#welcome-section .main-icon-cont img');
const downArrow = document.querySelector('#welcome-section .down-arrow');
const backtoTopBtn = document.getElementById('back-to-top-btn');
const projects = document.querySelectorAll('.project-inst');
const closeBtns = document.querySelectorAll('.modal-cont .close');

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
    });
}

function handleWelcomeScreenChange (entries, welcomeScreenObserver)
{
    entries.forEach(entry => {
        if (entry.isIntersecting)
        {
            downArrow.classList.remove('non-hero-page');
            backtoTopBtn.classList.add('top');
        }
        else
        {
            downArrow.classList.add('non-hero-page');
            backtoTopBtn.classList.remove('top');
        }
    });
}

function handleProjectModalOpen(e)
{
    const currProject = e.currentTarget;
    const modalId = currProject.dataset.modalId;
    if (modalId)
    {
        e.preventDefault();
        const lProjectModal = document.getElementById(modalId).parentElement;
        lProjectModal.classList.add('active');
        setTimeout(() => {
            lProjectModal.classList.add('fade-in');
        }, 10);
    }
}

function handleCloseButtonOnModal(e)
{
    e.preventDefault();
    const currProjectModal = e.currentTarget.parentElement.parentElement;
    currProjectModal.classList.remove('active');
    currProjectModal.classList.remove('fade-in');
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


projects.forEach(project => project.addEventListener('click', handleProjectModalOpen));
closeBtns.forEach(close => close.addEventListener('click', handleCloseButtonOnModal));