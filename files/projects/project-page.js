document.addEventListener("DOMContentLoaded", () => {
    lazyLoading();
})

projectId = /projects\/(.*)\.html(#.*)?$/.exec(document.location.href)[1]
fetch("../projects.json")
    .then(res => res.json())
    .then((data) => {
        el = document.querySelector('.project-grid');
        projectObj = data.projects.find(obj => obj.id == projectId)
        document.title = document.title.replace("TEMPLATE", projectObj.name)
        document.querySelector(".presentation img").setAttribute("src", projectObj.thumbnail.replace("./", '../'))
        document.querySelector(".presentation h1").textContent = projectObj.name
        document.querySelectorAll(".presentation h2")[0].textContent = `${projectObj.icon} ${projectObj.type}` 
        document.querySelectorAll(".presentation h2")[1].textContent = `📅 ${projectObj.date}`
        if(projectObj.description) {
            document.querySelector(".content .description").append(createElementFromHTML(`<p>${projectObj.description}<br></p>`))
        }
        if(projectObj.more){
            document.querySelector(".content .description").append(createElementFromHTML(`<a href="${projectObj.more.replace("./", "../")}" class="more" target="_blank" ref="noopener noreferrer">En savoir plus...</a>`))
        }
});

controller = new ScrollMagic.Controller()

window.onload = () => {
    // HEADER'S ANIMATION
    headerTimeline = anime.timeline()
    headerTimeline.add({
        targets: '.presentation img',
        duration: 600,
        easing: 'easeInOutQuint',
        translateY: [-50, 0],
        opacity: [0, 1]
    })
    headerTimeline.add({
        targets: '.presentation h1',
        duration: 600,
        easing: 'easeInOutQuint',
        translateY: [50, 0],
        opacity: [0, 1]
    })
    headerTimeline.add({
        targets: '.presentation h2',
        duration: 300,
        delay: anime.stagger(300),
        easing: 'easeOutExpo',
        translateX: function (el, i) {
            return [4 * (i * 2 - 1) + "rem", 0]
        },
        opacity: [0, 1]
    })

    // CONTENT'S ANIMATION
    contentTimeline = anime.timeline({ autoplay: false })
    contentTimeline.add({
        targets: '.content .description',
        duration: 600,
        easing: 'easeInOutQuint',
        translateY: [-50, 0],
        opacity: [0, 1]
    })
    contentTimeline.add({
        targets: '.preview h1',
        duration: 300,
        easing: 'easeInOutQuint',
        translateY: [50, 0],
        opacity: [0, 1]
    })
    contentTimeline.add({
        targets: '.card',
        duration: 300,
        delay: anime.stagger(100),
        easing: 'easeOutQuint',
        translateY: [20, 0],
        opacity: [0, 1]
    })
    contentSection = new ScrollMagic.Scene({
        triggerElement: '.content'
    }).on('enter', (e) => {
        contentTimeline.play()
        contentTimeline.finished.then(() => {
            contentTimeline.remove()
            Array.from(document.querySelectorAll(".card")).forEach(card => card.style.transform = "")
        })
        e.target.remove()
    }).addTo(controller)

    setupCards(Array.from(document.querySelectorAll(".preview .grid .card")))
}