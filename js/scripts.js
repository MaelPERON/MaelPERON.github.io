particles = []

function randomNumber(min, max, r=2){
    return (Math.floor(Math.random() * (max - min)) + min).toFixed(r)
}

window.onload = () => {
    [...Array(10).keys()].forEach(x => {
        obj = document.createElement("img")
        obj.setAttribute("src", "./assets/svg/hexagon.svg")
        obj.setAttribute("style", `position: absolute; top: ${randomNumber(0,100)}%; left: ${randomNumber(0,100)}%;`)
        particles.push(obj)
        document.querySelector("#particles").appendChild(obj)
    })
}


particlesJS.load('particles-js', '../assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});