const headerCont = document.getElementById('article-nav');
const contents = document.querySelectorAll('.content');
const titlePage = document.querySelector('.title-grouping');


const mainOpt = {
}

const mainPageObserver = new IntersectionObserver(function (entries, mainPageObserver){
    entries.forEach(entry => {
        if (!entry.isIntersecting)
        {
            return;
        }
        else
        {
            headerCont.classList.add('display-none');
        }
    });
}, mainOpt);

const titleObserver = new IntersectionObserver(function (entries, mainPageObserver){
    entries.forEach(entry => {
        if (!entry.isIntersecting)
        {
            return;
        }
        else
        {
            headerCont.classList.remove('display-none');
        }
    });
}, mainOpt);

contents.forEach(content => {
    mainPageObserver.observe(content);
});
titleObserver.observe(titlePage);
