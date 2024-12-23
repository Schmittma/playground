fetch('/assets/html/nav.html')
.then(res => res.text())
.then(text => {
    let elem = document.querySelector("nav#navbar");
    elem.innerHTML = text;
})

fetch('/assets/html/footer.html')
.then(res => res.text())
.then(text => {
    let elem = document.querySelector("footer");
    elem.innerHTML = text;
})