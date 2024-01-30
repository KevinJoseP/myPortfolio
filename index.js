const heroPageNavBar = document.querySelector('#home-page-icon #nav-bar-container');
const projectsSection = document.getElementById('projects');
const welcomeSection = document.getElementById('welcome-section');
const heroLogoImg = document.querySelector('#welcome-section .main-icon-cont img');
const downArrow = document.querySelector('#welcome-section .down-arrow');
const backtoTopBtn = document.getElementById('back-to-top-btn');
const projects = document.querySelectorAll('.project-inst');
const closeBtns = document.querySelectorAll('.modal-cont .close');
const sections = document.querySelectorAll('section.sections');
const navElems = document.querySelectorAll('a.nav-link');
const hoverCloseBtns = document.querySelectorAll('.modal-cont .bottom-floating-panel .close');

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

function handleHoverCloseBtnOnModal(e)
{
    e.preventDefault();
    //wtf??
    const currProjectModal = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    currProjectModal.classList.remove('active');
    currProjectModal.classList.remove('fade-in');
}


function handleSectionChange(entries, sectionIntersectionObserver)
{
    entries.forEach(entry => {
        if (entry.isIntersecting)
        {
            sections.forEach(section => section.classList.remove('active'));
            let id = entry.target.getAttribute('id') + "-nav";
            navElems.forEach(nav => nav.classList.remove('active'));
            const lNav = document.getElementById(id);
            if (lNav)
            {
                lNav.classList.add('active');
            }


        }
    });
}



function updateElementPosition() {
    let element = document.querySelector('body');
    let leftElement = document.getElementById('back-to-top-btn');
    let windowWidth = element.clientWidth;
    let leftPosition = windowWidth/2;
    leftElement.style.left = leftPosition + 'px';
}

// Run once and also on window resize
updateElementPosition();
window.onresize = updateElementPosition;


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

const sectionIntersectionObserver = new IntersectionObserver(handleSectionChange, {
 threshold: 0.2
});

//sections.forEach(section => sectionIntersectionObserver.observe(section));

// for scroll selections
document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.querySelectorAll('section.sections');
    console.log(sections);
    window.addEventListener('scroll', () => {
        let currentActive = '';
    
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
    
          // Calculate the middle of the viewport
          const scrollMiddle = window.scrollY + window.innerHeight / 2;
    
          // Check if the middle of the viewport is within the section
          if (scrollMiddle >= sectionTop && scrollMiddle <= sectionBottom) {
            currentActive = section.getAttribute('id');
          }
        });
    
        // Remove 'active' class from all nav elements
        sections.forEach(section => {
          const navId = section.getAttribute('id') + '-nav';
          const navElement = document.getElementById(navId);
          if (navElement) {
            navElement.classList.remove('active');
          }
        });
    
        // Add 'active' class to the current nav element
        const currentNavId = currentActive + '-nav';
        const currentNavElement = document.getElementById(currentNavId);
        if (currentNavElement) {
          currentNavElement.classList.add('active');
        }
    });
});


projects.forEach(project => project.addEventListener('click', handleProjectModalOpen));
closeBtns.forEach(close => close.addEventListener('click', handleCloseButtonOnModal));
hoverCloseBtns.forEach(close => close.addEventListener('click', handleHoverCloseBtnOnModal));