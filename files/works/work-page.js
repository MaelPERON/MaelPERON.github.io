document.addEventListener("DOMContentLoaded", () => {
    lazyLoading();
})

workId = /works\/(.*)\.html(#.*)?$/.exec(document.location.href)[1]
fetch("../works.json")
    .then(res => res.json())
    .then((data) => {
        el = document.querySelector('.project-grid');
        workObj = data.works.find(obj => obj.id == workId)
        document.title = document.title.replace("TEMPLATE", workObj.name)
        document.querySelector(".presentation h1").textContent = workObj.name
        if(workObj.description) {
            document.querySelector(".presentation p").append(createElementFromHTML(`<p style="opacity: 0;">${workObj.description}</p>`))
        }
});

controller = new ScrollMagic.Controller()

window.onload = () => {
    collectionList = document.querySelector(".collections-list .list-grid")
    Array.from(document.querySelectorAll(".collection")).forEach((collection, i) => {
        el = createElementFromHTML(`\
        <div class="collection-card">\
        <h3>${collection.querySelector(".description h1").textContent}</h3>\
        </div>`)
        el.addEventListener('click', (e) => {
            link = document.createElement("a")
            link.setAttribute("href", `#${collection.getAttribute("id")}`)
            link.click()
        })
        collectionList.append(el)
        setupCards(Array.from(collection.querySelectorAll(".card")))
    })

    presentationAnimation = anime.timeline()
    presentationAnimation.add({
        targets: '.presentation h1',
        duration: 300,
        easing: 'easeInOutQuint',
        translateY: [-50, 0],
        opacity: {
            value: [0, 1],
            duration: 200
        }
    })
    presentationAnimation.add({
        targets: '.presentation p',
        duration: 600,
        easing: 'easeInOutQuad',
        translateY: [-50, 0],
        opacity: [0, 1]
    })

    contentAnimation = anime.timeline({ autoplay: false })
    contentAnimation.add({
        targets: '.collections-list h2',
        duration: 300,
        easing: 'easeInOutQuint',
        translateY: [-50, 0],
        opacity: [0, 1]
    })
    contentAnimation.add({
        targets: '.collection-card',
        duration: 200,
        easing: 'easeInOutQuad',
        delay: anime.stagger(20),
        translateY: [50, 0],
        opacity: [0, 1]
    })
    contentSection = new ScrollMagic.Scene({
        triggerElement: document.querySelector(".content"),
        triggerHook: 0.6
    }).on('enter', (e) => {
        contentAnimation.play()
        contentAnimation.finished.then(() => {
            Array.from(document.querySelectorAll(".collection-card")).forEach(card => card.style.transform = "")
        })
        e.target.remove();
    }).addIndicators().addTo(controller)

    scrollBack = document.querySelector("#scroll-back")
    scrollBack.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo(0,document.querySelector(".collections-list").offsetHeight)
    })

    document.addEventListener("scroll", (e) => {
        scrollBack.style.display = (window.scrollY > document.querySelector(".collections-list").scrollHeight + parseInt(window.getComputedStyle(document.querySelector(".collections-list")).height.slice(0, -2))) ? '' : 'none';
    })
}