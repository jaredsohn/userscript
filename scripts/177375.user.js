// ==UserScript==
// @name LightVideo
// @version 0.01
// @include http://*/*
// @include https://*/*
// @match http://*/*
// @match https://*/*
// ==/UserScript==
window.addEventListener('DOMContentLoaded', function() {

    var videoPortal;
    var allLinks = document.getElementsByTagName('A');
    for (var i= 0; i < allLinks.length; i++){
        if(allLinks[i].href.match('youtube.com') || allLinks[i].href.match('youtu.be')){
            videoPortal = 'youtube';
            createPlayerIcon(allLinks[i], videoPortal);
        }
        if(allLinks[i].href.match('vimeo.com')){
            videoPortal = 'vimeo';
            createPlayerIcon(allLinks[i], videoPortal);
        }
    }
});
var popup = null;
var playIconYoutube = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAMZQTFRFkQ0IyBILyBILkQ0IyBILkQ0IkQ0IyBILyBILkQ0IpA8JmQ4JlQ4Ing4JuxEKtRAKwBEKxBELyBILkQ0IAAAA+fn5wRcQtR0Yvh8YqRsWrx0XoxsV56Wj8vLy9+/vyTMttxgS252b6Ojo0WNfnRcTy8jIlg4JzL+/XAgFjjAtdAoHiFNRmA4IbxQQgQwI05qYmw4JrI2M8fHx1dXV5+fn3d3dkQ0IpA8JtRAKyBILng4Jqg8JrxAKuxEKmQ4JwBEKxBELlQ4ItxbjVAAAABV0Uk5TCaUJBvmihNKi2PzMh+rq/MyHzMwAD5S0KQAAAItJREFUGNOFz8cWgjAARNGxKx2CvWDvFRILCuj//5QJcYMuvKt3Zjdwv+BnyOec4u2j4lRd2M8MG1bCNXpeIlkwIq5VH0yilAHzyjV9vz8aijLxEDqU0vEhTdyFNmNssUoTyoXrBsFptxWlQA+56WyzPooIdagxN1/uY0mF9srQgBIhZ6lGSLmAv2/fr2gov1/MElQAAAAASUVORK5CYII='";
var playIconVimeo = "'data:image/gif;base64,R0lGODlhEAAQAMQfAAuUuQynzzu83u/09Ryy2Su320rC4IbW6mKOngqHq5GvuoO3xhVbc0m92zV7keDo60R8j8Hc5KHEzwuawGSluaTg8Ah1lfD5/BmPsJPI13fR6LLd6f///wuavg2t1gAAACH5BAEAAB8ALAAAAAAQABAAAAVu4NeNZFmKgqeurCqMbbzCbrEWh0ao9MFdNgNnWOF1CJUhR+PZDIYRY2MRGWYIFsVQYgRYHNBAc4gwqiaPoUfIkQDMKsnwkB5YZp0VRTmEsGgeGHwIb3grAVoDCAktgB4WEAyMjY4AYpQiJpojHyEAOw=='";
function youtubeLink(link){
    var resLink = link.href;
    resLink = link.href.match('youtu.be') ? resLink.replace(/.*youtu.be\/([-_a-zA-Z0-9]+)/, '$1') : resLink.replace(/.*[?&/]vi{0,1}[=/]([-_a-zA-Z0-9]+).*/, '$1');
    return(resLink);
}
function vimeoLink(link){
    var resLink = link.href;
    if(link.href.match('player'))
        resLink = resLink.replace(/.*video\/([0-9]+).*/, '$1');
    else if(link.href.match('moogaloop.swf'))
        resLink = resLink.replace(/.*clip_id=([0-9]+).*/, '$1');
    else
        resLink = resLink.replace(/.*vimeo.com\/([0-9]+).*/, '$1');
    return(resLink);
}
function createPlayerIcon(link, videoPortal) {
    var playerIcon = document.createElement('span');
    playerIcon.style.display = 'inline-block';
    playerIcon.style.width = '1em';
    playerIcon.style.height = '1em';
    playerIcon.style.paddingRight = '0.3em';
    playerIcon.style.paddingBottom = '1px';
    playerIcon.style.verticalAlign = 'text-bottom';
    playerIcon.style.cursor = 'pointer';
    if (videoPortal == 'youtube')
        playerIcon.style.background = 'url(' + playIconYoutube + ') 5px 0 no-repeat';
    else if (videoPortal == 'vimeo')
        playerIcon.style.background = 'url(' + playIconVimeo + ') 5px 0 no-repeat';
    link.appendChild(playerIcon);
    playerIcon.addEventListener('click', handleClick, false);

    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        drawPlayer(link, videoPortal);
    }

}
function drawYoutubePlayer (link) {
    var player = document.createElement('embed');
    var id = this.youtubeLink(link);
    currentFlash = 'http://www.youtube.com/v/' + id + '?version=3&autoplay=1&fs=1';
    currentVideoPage = 'http://www.youtube.com/watch?v=' + id;
    player.setAttribute('src', currentFlash);
    player.setAttribute('type', 'application/x-shockwave-flash');
    player.setAttribute('allowfullscreen', 'true');
    player.setAttribute('allowScriptAccess', 'always');
    player.setAttribute('width', '800');
    player.setAttribute('height', '480');
    return(player);
}
function drawVimeoPlayer (link) {
    var player = document.createElement('embed');
    var id = this.vimeoLink(link);
    currentFlash = 'http://vimeo.com/moogaloop.swf?clip_id=' + id + '&amp;server=vimeo.com&amp;fullscreen=1&amp;autoplay=1';
    currentVideoPage = 'http://vimeo.com/' + id;
    player.setAttribute('src', currentFlash);
    player.setAttribute('type', 'application/x-shockwave-flash');
    player.setAttribute('allowfullscreen', 'true');
    player.setAttribute('allowScriptAccess', 'always');
    player.setAttribute('width', '800');
    player.setAttribute('height', '480');
    return(player);
}
function createPopup(link, videoPortal) {
    if(!popup) {
        popup = {
            overlay: document.createElement('div'),
            player: document.createElement('div'),
            container: document.createElement('div')
        };

        popup.overlay.style.position = 'fixed';
        popup.overlay.style.zIndex = '1000';
        popup.overlay.style.left = '0';
        popup.overlay.style.top = '0';
        popup.overlay.style.width = '100%';
        popup.overlay.style.height = '100%';
        popup.overlay.style.backgroundColor = 'rgba(0, 0, 0, .8)';
        popup.overlay.addEventListener('click', hidePlayer, false);

        popup.player.style.position = 'fixed';
        popup.player.style.zIndex = '1001';
        popup.player.style.backgroundColor = '#FFF';
        popup.player.style.border = '1px solid #DDD';
        popup.player.style.borderRadius = '5px';
        popup.player.style.padding = '5px';
        popup.player.addEventListener('click', function(e) {e.stopPropagation()}, false);
        popup.player.appendChild(popup.container);
        popup.overlay.appendChild(popup.player);
        document.body.appendChild(popup.overlay);
    }
    popup.overlay.style.display = 'block';
}


function repositionPopup(width/*, height*/) {
    var cx = (document.body.offsetWidth - width) / 2;
    popup.player.style.left = cx + 'px';
    popup.player.style.top = '100px';
}
function drawPlayer (link, videoPortal){
    if (videoPortal == 'youtube'){
        drawYoutubePlayer(link);
        createPopup(link, videoPortal);
        repositionPopup(800, 480);
        setTimeout(function() {popup.container.appendChild(drawYoutubePlayer(link))},100);
    }
    else if (videoPortal == 'vimeo'){
        drawVimeoPlayer(link);
        createPopup(link, videoPortal);
        repositionPopup(800, 480);
        setTimeout(function() {popup.container.appendChild(drawVimeoPlayer(link))},100);
    }
    else
        return(false)
}

function hidePlayer(e) {
    popup.overlay.style.display = 'none';
    var children = popup.container.childNodes;
    for(var i = children.length - 1; i >= 0; i--) popup.container.removeChild(children[i])
    e.preventDefault();
}