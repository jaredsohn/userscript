// ==UserScript== 
// @name Tumblr Retina Icons
// @namespace http://edada.ms/havent-set-this-up
// @description Tumblr hadn't Retina-optimized the user icons on the dashboard... Until now
// @include www.tumblr.com/* 
// @include http://tumblr.com/* 
// @include http://www.tumblr.com/* 
// ==/UserScript== 

function etri(){ // make function to be executed
    var docHead = document.getElementsByTagName('head')[0];
    var theStyle = document.createElement('style');
    theStyle.type = 'text/css';
    theStyle.id = 'tumblr_retina_icon';

    var posterIcon = document.getElementById('post_controls_avatar').style.backgroundImage;

    var posterIcon2x = posterIcon.replace('_64.png','_128.png');

    var otherIcons = document.getElementsByClassName('post_avatar');

    for(i=0;i<otherIcons.length;i++){
    	var icon2x = otherIcons[i].style.backgroundImage.replace('_64.png','_128.png');
    	console.log("i is: "+i);
    	console.log("style is: "+icon2x);
    	otherIcons[i].setAttribute("style","background-image: "+icon2x+" !important;background-size: 64px;");
    	otherIcons[i].setAttribute("data-icon2x","1")
    }

    console.log("otherIcons: "+otherIcons+"\nposterIcon: "+posterIcon);

    var styleInner = 'a#post_controls_avatar.post_avatar { background-size: 64px; background-image: url('+posterIcon2x+');}';
    theStyle.innerHTML = styleInner;
    docHead.appendChild(theStyle);
}

window.addEventListener("DOMContentLoaded", etri, true); // run it after body load