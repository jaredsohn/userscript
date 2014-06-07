// ==UserScript==
// @name           ESPN Gamecast - No ad video
// @description    Hides ESPN Gamecast ad video container so that you can see the Gamecast
// @include        http://scores.espn.go.com/*/gamecast?gameId=*
// ==/UserScript==

function removeClass(element, className) {
    element.className = element.className.replace(className, '');
}

function removeClassFromElements(elements, className) {
    for (var i = 0; i < elements.length; i++) {
        removeClass(elements[i], className);
    }
}

function unhideStuff() {
    var vidHides = [];
    var ids = ['drivechartWrapper'];
    for (var i = 0; i < ids.length; i++) {
        var element = document.getElementById(ids[i]);
        if (element)
            vidHides.push(element);
    }
    removeClassFromElements(vidHides, 'vidHide');
    
    var hideMes = document.getElementsByClassName('hideMe');
    removeClassFromElements(hideMes, 'hideMe');
}

function hideVideoContainer() {
    var vidContainer = document.getElementById('videoContainer');
    if (vidContainer)
        vidContainer.style.display = 'none';
    
    unhideStuff();
}

hideVideoContainer();
setInterval(hideVideoContainer, 10000);
