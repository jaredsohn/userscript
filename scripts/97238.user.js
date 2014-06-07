// ==UserScript==
// @name           TattooFinder.com - Remove scrolling bars
// @namespace      #omninate
// @include        http://www.tattoofinder.com/find_tattooDB.asp*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// @description    Replaces the watermarked SWF with the image that it loads instead.
// ==/UserScript==

var chars = " !\"#$%&amp;'()*+'-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
var swf = document.embeds[0], img = new Image(), query = swf.src.substr(swf.src.indexOf('?')+1);
var letterArr = query.split('!');
for(var i=0; i<letterArr.length; i++){
    letterArr[i] = chars.charAt(letterArr[i] - 28);
};
img.src = "http://www.tattoofinder.com/content/" + letterArr.join('') + '.jpg';
swf = swf.parentNode.parentNode;
swf.parentNode.replaceChild(img, swf);
img.setAttribute('id','gmImageReplacement');

function makeFlash(data) {
    var chars = " !\"#$%&amp;'()*+'-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    var letterArr = data.split('!');
    for(var i=0; i<letterArr.length; i++){
        letterArr[i] = chars.charAt(letterArr[i] - 28);
    };
    var imgTarget = document.getElementById('gmImageReplacement');
    imgTarget.src = "http://www.tattoofinder.com/content/" + letterArr.join('') + '.jpg';
};
function embedFunction(s) {
    document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
};
embedFunction(makeFlash);