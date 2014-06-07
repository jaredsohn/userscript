/*
    License: MIT
    Copyright (c) 2012
    http://opensource.org/licenses/MIT
*/

// ==UserScript==
// @name           BOL Return Of The Old Smileys
// @version        0.3.5
// @description    Dodatak vraca stare emotikone na BOL forum.
// @namespace      http://www.bug.hr/d.tiny_mce/
// @match          http://www.bug.hr/d.tiny_mce/plugins/emotions/emotions.aspx
// @match          http://www.bug.hr/forum/newpost/*
// @include        http://www.bug.hr/d.tiny_mce/plugins/emotions/emotions.aspx
// @include        http://www.bug.hr/forum/newpost/*
// @author         drnde (http://www.bug.hr/forum/user/drnde/6251.aspx)
// ==/UserScript==

(function(){

var PRECACHE_IMAGES = true;
var EMO_PATH = 'http://www.bug.hr/d.tiny_mce/plugins/emotions'
var BASE_IMAGE_URL = EMO_PATH + '/img/';
var EMO_WINDOW_URL = EMO_PATH + '/emotions.aspx';

var EMOTICONS = [
    ['smiley-cool.gif', 'Cool', 'cool'],
    ['smiley-cry.gif', 'Plač', 'cry'],
    ['smiley-embarassed.gif', 'Sramim se', 'embarassed'],
    ['smiley-foot-in-mouth.gif', 'Izlanuo se', 'foot_in_mouth'],
    ['smiley-frown.gif', 'Mršti se', 'frown'],
    ['smiley-innocent.gif', 'Nevinašce', 'innocent'],
    ['smiley-kiss.gif', 'Poljubac', 'kiss'],
    ['smiley-laughing.gif', 'Smijeh', 'laughing'],
    ['smiley-money-mouth.gif', 'Bogataš', 'money_mouth'],
    ['smiley-sealed.gif', 'Šutim', 'sealed'],
    ['smiley-smile.gif', 'Osmijeh', 'smile'],
    ['smiley-surprised.gif', 'Iznenađen', 'surprised'],
    ['smiley-tongue-out.gif', 'Belji se', 'tongue_out'],
    ['smiley-undecided.gif', 'Neodlučan', 'undecided'],
    ['smiley-wink.gif', 'Namigiva', 'wink'],
    ['smiley-yell.gif', 'Viče', 'yell'],
    ['smiley-cool.png', 'Cool', 'cool'],
    ['smiley-cry.png', 'Plač', 'cry'],
    ['smiley-embarassed.png', 'Sramim se', 'embarassed'],
    ['smiley-foot-in-mouth.png', 'Izlanuo se', 'foot_in_mouth'],
    ['smiley-frown.png', 'Mršti se', 'frown'],
    ['smiley-innocent.png', 'Nevinašce', 'innocent'],
    ['smiley-kiss.png', 'Poljubac', 'kiss'],
    ['smiley-laughing.png', 'Smijeh', 'laughing'],
    ['smiley-money-mouth.png', 'Bogataš', 'money_mouth'],
    ['smiley-sealed.png', 'Šutim', 'sealed'],
    ['smiley-smile.png', 'Osmijeh', 'smile'],
    ['smiley-surprised.png', 'Iznenađen', 'surprised'],
    ['smiley-tongue-out.png', 'Belji se', 'tongue_out'],
    ['smiley-undecided.png', 'Neodlučan', 'undecided'],
    ['smiley-wink.png', 'Namigiva', 'wink'],
    ['smiley-yell.png', 'Viče', 'yell'],
    ['tp3.gif','Spava',''],
    ['tr1.gif','Prdi',''],
    ['tr7.gif','Belji se','tongue_out'],
    ['tr8.gif','Nevinašce','innocent'],
    ['ts1.gif','Ponosan',''],
    ['ts9.gif','Iznenađen','surprised'],
    ['tt1.gif','Smijeh','laughing'],
    ['tt3.gif','Osmijeh','smile'],
    ['tp7.gif','Prase',''],
    ['z_signs-and-flags006.gif','Ban?','']
];

if(location.href !== EMO_WINDOW_URL && PRECACHE_IMAGES){
    var imgCacheArray = [];
    for(var idx = 0; idx < EMOTICONS.length; idx++) {
        imgCacheArray[idx] = new Image();
        imgCacheArray[idx].src = BASE_IMAGE_URL + EMOTICONS[idx][0];
    }
}

else if(location.href === EMO_WINDOW_URL){
    var smileyBox = document.getElementsByTagName('body')[0].children[0];
    var aElement, imgElement, emotionsDlg;

    for(var idx2 = (EMOTICONS.length - 1); idx2 > -1; idx2--){
        aElement = document.createElement('a');
        imgElement = document.createElement('img');
        emotionsDlg = '';
        if(EMOTICONS[idx2][2]){
            emotionsDlg = 'emotions_dlg.' + EMOTICONS[idx2][2]
        }       
        aElement.setAttribute('href', 'javascript:EmotionsDialog.insert("'+
            EMOTICONS[idx2][0] + '","' + emotionsDlg + '")');
        imgElement.setAttribute('src', BASE_IMAGE_URL + EMOTICONS[idx2][0]);
        imgElement.setAttribute('border', '0');
        if(EMOTICONS[idx2][1]){
            imgElement.setAttribute('alt', EMOTICONS[idx2][1]);
            imgElement.setAttribute('title', EMOTICONS[idx2][1]);
        }
        imgElement.setAttribute('style', "padding-right:6px;");
        aElement.appendChild(imgElement);

        switch(EMOTICONS[idx2][1]){
            case 'Ban?':
                smileyBox.appendChild(aElement);
                break;
            default:
                smileyBox.insertBefore(aElement,smileyBox.children[1]);
        }
    }
}

})();
