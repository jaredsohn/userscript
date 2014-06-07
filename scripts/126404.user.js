// ==UserScript==
// @name          Pandora Cleanup
// @version       0.03
// @date          2012-02-22
// @description   Intended to tweak the appearance of Pandora after being mangled by noscript and adblock.
// @copyright     Buhman 2012
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include	      http://www.pandora.com/
// @include	      http*://*.pandora.com/*
// @include	      http://pandora.com/*
// ==/UserScript==

var prohibited_ids = ['splash',
    'pandoraRibbonContainer',
    'brandingBar',
    'footer',
    'promobox',
    'promobox-business',
    'ad_container',
    'companion_frame'];
    
for (var i = 0; i < prohibited_ids.length; i++) {
    
    var element = document.getElementById(prohibited_ids[i]);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

var prohibited_classes = [
    'slidesBackground',
    'platformPromo'];
    
for (var i = 0; i < prohibited_classes.length; i++) {
    
    class_list = document.getElementsByClassName(prohibited_classes[i]);
    
    for (var j = 0; j < class_list.length; j++) {
        
        class_list[j].parentNode.removeChild(class_list[j]);
    }
}

class_list = document.getElementsByClassName('adSupported-layout');

for (var i = 0; i < class_list.length; i++) {

    class_list[i].className = 'width-p1-noAds';
}

class_list = document.getElementsByClassName('contentContainer');

for (var i = 0; i < class_list.length; i++) {

    class_list[i].style.width = '600px';
}

document.getElementById('mainContainer').id = 'not_mainContainer';
document.getElementById('main').style.top = '80px';
document.getElementById('adLayout').style.marginLeft = '20px';
document.getElementById('playerBar').style.minWidth = '600px';

function refresh() {

    Pandora.sendTunerCommand("ext_pause","");
    Pandora.sendTunerCommand("ext_play","");
}

rintv = window.setInterval("refresh()",3540000);