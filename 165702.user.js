// ==UserScript==
// @name        Coldwell
// @namespace   http://userscripts.org
// @description Replaces the cute shared display picture.
// @include     *facebook.*
// @version     1
// @grant       none
// ==/UserScript==

var images = document.getElementsByTagName ("img");

var x=0;

while(x<images.length)

{
switch (images[x].src)
{
case "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/s32x32/623500_100000204210494_1733639137_q.jpg";
    images[x].src = "http://ajhutton.net/coldwell/jack.png";
    break;
case "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/s32x32/22980_1792180408_933298123_q.jpg";
    images[x].src = "http://ajhutton.net/coldwell/harry.png";
    break;
}
x=x+1;

}