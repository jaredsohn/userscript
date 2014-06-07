// ==UserScript==
// @name       Disable youtubeblocker
// @namespace  http://linge-ma.ws
// @version    0.3.6
// @description Removes the retarded "Share to View" social crap on sites that use youtubeblocker
// @match      http://*/*
// @copyright  Bogdan "Znuff" Ilisei - 2014
// ==/UserScript==

var o = document.getElementsByClassName('youtubeblocker');
videos = o.length;
for (var i = 0; i < videos; i++) {
    if (o[i].style.display!="none") {
        var regex = /.*^.*(background.*youtu.be\/|v\/|\/vi\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?\/]*).*'\).*/;
        var match = o[i].firstElementChild.getAttribute('style').match(regex);
        var videoid = match[2];
        if (videoid.length==11) {
            console.log('Unblocking ' + videoid);
            var iframe = document.createElement('iframe');
            iframe.src='//www.youtube.com/embed/' + videoid + '?rel=0';
            iframe.width='560';
            iframe.height='315';
            iframe.frameborder='0';
            iframe.setAttribute('allowfullscreen','');
            o[i].outerHTML=iframe.outerHTML;
        };
    };
};

if (window.location.href.toString().match('funnyclipe')) {
    blocker = document.getElementById('pampam');
    blocker.parentNode.removeChild(blocker);
    video = document.getElementById('video-wrapper');
    video.setAttribute('style','display:visible');
}	