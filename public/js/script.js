document.addEventListener('DOMContentLoaded',function () {
    const btn = document.querySelectorAll('.searchbtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.querySelector('#searchInput');
    const searchclose = document.querySelector('#searchClose');

    for(var i=0;i<btn.length;i++){
        btn[i].addEventListener('click',function () {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded','true');
            searchInput.focus();
        })
    }
    searchclose.addEventListener('click',function () {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded','false');
    })
})