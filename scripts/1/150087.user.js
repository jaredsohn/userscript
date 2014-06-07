// ==UserScript==
// @name       Drawception Autoskipper
// @namespace  http://drawception.com/player/204803/talon/
// @version    0.1
// @description  Autoskips when it hits certain words defined in the script
// @match      http://drawception.com/play/
// ==/UserScript==

// list here the words you wanna skip
var words = [
                'gangnam',
                'Bravocolli',
                'sexy dragon cow',
                'nyan'
            ];

for(var i=0; i<words.length; i++){
    if(unsafeWindow.jQuery('.play-phrase:contains('+words[i]+')').length>0){
        console.log('match found');
        unsafeWindow.DrawceptionPlay.skipPanel();
        break;
    }
}