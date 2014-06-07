// ==UserScript==
// @name       Infamous UB Changer
// @namespace  http://megaproducts.org/
// @version    0.2
// @description  Corrects the Infamous UB.
// @include    *hackforums.net*
// @copyright  2013, .Neon
// ==/UserScript==

if(document.body.innerHTML.indexOf("infamous.gif") != -1) {
 document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/x\.hackforums\.net\/images\/blackreign\/groupimages\/english\/infamous\.gif/g,"http://i.imgur.com/hqEtryR.png");
}
if(document.body.innerHTML.indexOf("infamous.gif") != -1) {
 document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/x\.hackforums\.net\/images\/modern\/groupimages\/english\/infamous\.gif/g,"http://i.imgur.com/hqEtryR.png");
}