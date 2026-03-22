// Side-nav scroll observer for standalone project pages
// Extracted from index.js activateSideBarNavOnSection

function activateSideBarNavOnSection(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    if (!sections.length) return;

    window.addEventListener('scroll', () => {
        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            const lScrollTop = window.scrollY;
            const lInnerHeight = window.innerHeight;

            const scrollMiddle = lScrollTop + lInnerHeight / 2;
            const windowHeight = lScrollTop + lInnerHeight;

            if (scrollMiddle >= sectionTop && scrollMiddle <= sectionBottom) {
                currentActive = section.getAttribute('id');
            }
            if (sectionTop >= lScrollTop && sectionBottom <= windowHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        if (currentActive) {
            sections.forEach(section => {
                const navId = section.getAttribute('id') + '-nav';
                const navElement = document.getElementById(navId);
                if (navElement) {
                    navElement.classList.remove('active');
                }
            });
        }

        const currentNavId = currentActive + '-nav';
        const currentNavElement = document.getElementById(currentNavId);
        if (currentNavElement) {
            currentNavElement.classList.add('active');
        }
    });
}

// Side nav click handler
function handleSideNavBarClick(e) {
    const currActive = e.target;
    const allSiblingNav = Array.from(e.target.parentElement.children);
    allSiblingNav.forEach(sibling => {
        if (sibling) {
            sibling.classList.remove('active');
        }
    });
    currActive.classList.add('active');
}

// Bottom floating panel and side nav visibility toggle
const bottomHoverPanelMods = document.querySelectorAll('.modal-cont .project-title');
const titleObserverGeneral = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        const floatingPanelidentifier = ".bottom-floating-panel." + entry.target.dataset.titleId;
        const floatingPanelGen = document.querySelector(floatingPanelidentifier);
        const sidePanelIdentifier = ".side-nav-panel." + entry.target.dataset.titleId;
        const sidePanelGen = document.querySelector(sidePanelIdentifier);
        if (floatingPanelGen) {
            floatingPanelGen.classList.toggle('display-none', entry.isIntersecting);
        }
        if (sidePanelGen) {
            sidePanelGen.classList.toggle('display-none', entry.isIntersecting);
        }
    });
}, { threshold: 0.5 });

bottomHoverPanelMods.forEach(modal => {
    titleObserverGeneral.observe(modal);
});

// Initialize side nav for pages that have it
document.addEventListener('DOMContentLoaded', () => {
    const sideNavBtns = document.querySelectorAll('.side-nav-panel a');
    sideNavBtns.forEach(sideNav => {
        sideNav.addEventListener('click', handleSideNavBarClick);
    });

    // Healthcare page
    const healthcareSections = document.querySelectorAll('.side-bar-nav-section');
    if (healthcareSections.length > 0) {
        activateSideBarNavOnSection('.side-bar-nav-section');
    }
});
