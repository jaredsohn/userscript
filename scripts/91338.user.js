// ==UserScript==
// @name           Stackoverflow.com Enhancer
// @description Makes the stackoverflow top bar stay fixed to the top of the window and shrink when scrolled down. 
// @version       1.4
// @history        1.4 fixed background duplication problem and top bar from hiding the notifications
// @history        1.3.4 make rounded tabs
// @history        1.3.3 add horizontal scrolling to fixed bar
// @history        1.3.2 fix margin on stackexchange link/inbox
// @history        1.3 revert to 1.1
// @history        1.2 broken
// @history        1.1 on all stackoverflow.com pages
// @history        1.0 Initial release
// @include        http://superuser.com/*
// @include        http://superuser.com
// @include        http://www.superuser.com/*
// @include        http://www.superuser.com
// @include        http://stackoverflow.com/*
// @include        http://stackoverflow.com
// @include        http://www.stackoverflow.com/*
// @include        http://www.stackoverflow.com
// ==/UserScript==

//unaccepted questions
if (window.location.href.match("/users/[^\/]+/[^\/?]+#unaccepted")) {
    alert('yo');
    var userID = document.getElementById('hlinks-user').childNodes(1).getAttribute('href').replace('/users/recent/','');
    var unacceptedURL = window.location.href.substring(0, window.location.href.indexOf('.com/')+5).replace("http://","http://api.") + "1.1/users/" + userID + "/questions/unaccepted";
    var script = document.createElement("script");
    script.setAttribute("src", unacceptedURL + "?jsonp=uaj%3D");
    script.addEventListener('load', function (){
alert("ye");
   alert(uaj);
}, false);
    document.body.appendChild(script);


}


//notification bar
var notifybar = document.getElementById('notify-container');
//notifybar.style.top = '31px';

//rounding
var eleHs = document.getElementsByClassName('youarehere');
var i = 0;
for (i=0; i<eleHs.length;i++) {
    var eleH = eleHs[i];
    if (eleH.tagName == 'A') {
        eleH.style.borderRadius = '7px 7px 0 0';
        eleH.style.WebkitBorderRadius = '7px 7px 0 0';
        eleH.style.MozBorderRadius = '7px 7px 0 0';
    }
}
//general
document.getElementById('portalLink').style.marginLeft = '0px';

//fixed bar
var header = document.getElementById('header');
var headerP = document.createElement('div');
headerP.setAttribute('id','headerP');
header.parentNode.insertBefore(headerP, header);
headerP.appendChild(header);

var offset = '0px';
if (document.getElementById('notify-5') != null) {
     offset = document.getElementById('notify-5').offsetHeight + 'px';
}

document.getElementById('custom-header').style.top = offset;
headerP.style.top = offset;
window.onresize = function () {
var offset = '0px';
if (document.getElementById('notify-5') != null) {
     offset = document.getElementById('notify-5').offsetHeight + 'px';
}
document.getElementById('custom-header').style.top = offset;
headerP.style.top = offset;
}

window.onscroll = function () {
var logo = document.getElementById('hlogo').childNodes(1); 
var hmenus = document.getElementById('hmenus');
var header = document.getElementById('header');
var headerP = document.getElementById('headerP');

if (window.pageYOffset > 33) {

logo.style.backgroundPosition = '-45px -34px';
logo.style.height = '30px';
logo.style.marginLeft = '45px';


hmenus.style.paddingTop = '0px';
hmenus.style.paddingBottom = '10px';



header.style.height ='80px';
headerP.style.height ='80px';
headerP.style.width = '100%';
headerP.style.position = 'fixed';
header.style.position = 'static';
headerP.style.background = 'rgba(255,255,255,0.8) url(http://sstatic.net/stackoverflow/img/bg-header.png) repeat-x scroll 0% 0%';

if (document.getElementById('notify-5') != null) {
document.getElementById('content').style.marginTop = (document.getElementById('notify-5').offsetHeight + 125) + 'px';
} else {
document.getElementById('content').style.marginTop = '125px';
}
document.getElementsByClassName('container')(0).style.backgroundImage = 'none !important';
} else {

logo.style.backgroundPosition = '0px 0px';
logo.style.height = '61px';
logo.style.marginLeft = '0px';


hmenus.style.paddingTop = '34px';
hmenus.style.paddingBottom = '20px';


headerP.style.height ='120px';
headerP.style.position = 'static';
headerP.style.background = 'transparent';
document.getElementById('content').style.marginTop = '0px'; document.getElementsByClassName('container')(0).style.background = 'transparent url(http://sstatic.net/stackoverflow/img/bg-header.png) repeat-x scroll 0% 0%';
}
if (window.innerWidth < 920) {
document.getElementById('headerP').style.left = -window.pageXOffset + 'px !important'; 
document.getElementById('custom-header').style.left = -window.pageXOffset + 'px'; 
}
}