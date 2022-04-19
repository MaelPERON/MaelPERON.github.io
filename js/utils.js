function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function getThumbnail(src){
    return /\.jpg$/.exec(src) != null ? src.replace(/(\.\/files)\/((thumbnails)\/)?/, '$1/thumbnails/') : src
}

function getVideoID(str) {
    return /(\/|\?v=)?([\w\d\-]*)$/.exec(str)[2]
}