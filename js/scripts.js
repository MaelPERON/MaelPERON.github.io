particles = []

function randomNumber(min, max, r = 2) {
    return (Math.floor(Math.random() * (max - min)) + min).toFixed(r)
}

window.onload = () => {

    [...Array(10).keys()].forEach(x => {


            /* obj = document.createElement("img")
            obj.setAttribute("src", "./assets/svg/hexagon.svg");
            [x, y, r] = [
                [0, 100],
                [0, 100],
                [2, 15]
            ].map(a => randomNumber(a[0], a[1]))
            obj.setAttribute("style", `position: absolute; top: ${x}%; left: ${y}%; height: ${r}%;`)
            particles.push([obj, x, y])
            document.querySelector("#particles").appendChild(obj) */
        })
        // requestAnimationFrame(animate)
}