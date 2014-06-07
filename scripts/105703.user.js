
// ==UserScript==
// @name           Ryan Davis replacement
// @description    Replace a gorrilla head with a ryan davis head on turntable.
// @include       *
// ==/UserScript==
function changeImg(){
var imag = document.getElementsByTagName('img');
for(var i=0;i<imag.length;i++){
if(imag[i].getAttribute('src')=='https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/avatars/23/headfront.png'){
imag[i].setAttribute('src','http://iamoptimuspri.me/junk/davis.png');
}
}
}
changeImg()