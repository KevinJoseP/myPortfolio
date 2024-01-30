const contents = document.querySelectorAll('.article .content');
const titlePage = document.querySelector('.article .title-grouping');
const cutTheBs = document.querySelector('.article #cutTheBs');
const elaborate = document.querySelector('.article #elaborate');
const elaborateContent = document.querySelector('.article #detailed-content');
const summarizedContent = document.querySelector('.article #summarized-content');
const floatingPanel = document.querySelector('.article .bottom-floating-panel');
const healthCare = document.querySelector('.modal-cont#healthcare .project-title');


const mainOpt = {
}

// const mainPageObserver = new IntersectionObserver(function (entries, mainPageObserver){
//     entries.forEach(entry => {
//         if (!entry.isIntersecting)
//         {
//             return;
//         }
//         else
//         {
//             headerCont.classList.add('display-none');
//         }
//     });
// }, mainOpt);

const titleObserver = new IntersectionObserver(function (entries, titleObserver){
    entries.forEach(entry => {
        floatingPanel.classList.toggle('display-none', entry.isIntersecting);
    });
}, {
    threshold: 0.9
});

const titleObserverGeneral = new IntersectionObserver(function (entries, titleObserverGeneral){
    entries.forEach(entry => {
        const floatingPanelidentifier = ".bottom-floating-panel.healthcare";
        const floatingPanelGen = document.querySelector(floatingPanelidentifier);
        const sidePanelIdentifier = ".side-nav-panel.healthcare";
        const sidePanelGen = document.querySelector(sidePanelIdentifier);
        console.log(entry.isIntersecting);
        if (floatingPanelGen)
        {
            console.log("toggle");
            floatingPanelGen.classList.toggle('display-none', entry.isIntersecting);
            sidePanelGen.classList.toggle('display-none', entry.isIntersecting);
        }
    });
}, {
    
});


// contents.forEach(content => {
//     mainPageObserver.observe(content);
// });
titleObserver.observe(titlePage);
titleObserverGeneral.observe(healthCare);
function handleBsButton(e)
{
    elaborateContent.classList.add('display-none');
    summarizedContent.classList.remove('display-none');
    cutTheBs.classList.add('display-none');
    elaborate.classList.remove('display-none');
}

function handleElaborateButton(e)
{
    summarizedContent.classList.add('display-none');
    elaborateContent.classList.remove('display-none');
    elaborate.classList.add('display-none');
    cutTheBs.classList.remove('display-none');
}


if (cutTheBs)cutTheBs.addEventListener('click', handleBsButton);
if (elaborate)elaborate.addEventListener('click', handleElaborateButton);
