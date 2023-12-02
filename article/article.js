const headerNavCont = document.getElementById('nav-bar-container');
const contents = document.querySelectorAll('.content');
const titlePage = document.querySelector('.title-grouping');
const cutTheBs = document.getElementById('cutTheBs');
const elaborate = document.getElementById('elaborate');
const elaborateContent = document.getElementById('detailed-content');
const summarizedContent = document.getElementById('summarized-content');
const floatingPanel = document.querySelector('.bottom-floating-panel');


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

const titleObserver = new IntersectionObserver(function (entries, mainPageObserver){
    entries.forEach(entry => {
        console.log(entry)
        headerNavCont.classList.toggle('display-none', !entry.isIntersecting);
        floatingPanel.classList.toggle('display-none', entry.isIntersecting);
    });
}, {
    threshold: 0.9
});

// contents.forEach(content => {
//     mainPageObserver.observe(content);
// });
titleObserver.observe(titlePage);

function handleBsButton(e)
{
    console.log(e);
    elaborateContent.classList.add('display-none');
    summarizedContent.classList.remove('display-none');
    cutTheBs.classList.add('display-none');
    elaborate.classList.remove('display-none');
}

function handleElaborateButton(e)
{
    console.log(e);
    summarizedContent.classList.add('display-none');
    elaborateContent.classList.remove('display-none');
    elaborate.classList.add('display-none');
    cutTheBs.classList.remove('display-none');
}


if (cutTheBs)cutTheBs.addEventListener('click', handleBsButton);
if (elaborate)elaborate.addEventListener('click', handleElaborateButton);
