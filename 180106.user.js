// ==UserScript==
// @name       WebCagerizer
// @version    0.1
// @description  changes out images on websites for choice pictures of acting legend nick cage
// @run-at document-end
// @copyright  2013, fakeplasticdroid
// ==/UserScript==

var img = document.getElementsByTagName('img');
var image;

var imageCollection = new Array();
imageCollection[0] = 'http://i.imgur.com/Ex8845b.jpg';
imageCollection[1] = 'http://i.imgur.com/os5G4No.jpg';
imageCollection[2] = 'http://i.imgur.com/iT9UAkJ.jpg';
imageCollection[3] = 'http://i.imgur.com/DC1o6kC.jpg';
imageCollection[4] = 'http://i.imgur.com/JI4nx43.jpg';
imageCollection[5] = 'http://i.imgur.com/9Cnzqbih.jpg';
imageCollection[6] = 'http://i.imgur.com/461kslTh.jpg';
imageCollection[7] = 'http://i.imgur.com/hpVtVXuh.jpg';
imageCollection[8] = 'http://i.imgur.com/O6q5sca.jpg';
imageCollection[9] = 'http://i.imgur.com/EGtmDDl.jpg';
imageCollection[10] = 'http://i.imgur.com/mEeHrLb.jpg';
imageCollection[11] = 'http://i.imgur.com/f6VQGlC.jpg';
imageCollection[12] = 'http://i.imgur.com/IaUFuut.jpg';
imageCollection[13] = 'http://i.imgur.com/Cvvyx3f.jpg';
imageCollection[14] = 'http://i.imgur.com/66c9z84.jpg';
imageCollection[15] = 'http://i.imgur.com/IHmK4ci.jpg';
imageCollection[16] = 'http://i.imgur.com/ytor1uN.jpg';
imageCollection[17] = 'http://i.imgur.com/Fp3a0te.jpg';
imageCollection[18] = 'http://i.imgur.com/0TIDT9F.jpg';
imageCollection[19] = 'http://i.imgur.com/8KMAli6.jpg';
imageCollection[20] = 'http://i.imgur.com/XWLMKG0.jpg';
imageCollection[21] = 'http://i.imgur.com/IlMJWGB.jpg';
imageCollection[22] = 'http://i.imgur.com/KGF7taL.jpg';
imageCollection[23] = 'http://i.imgur.com/sy9FJ1B.jpg';
imageCollection[24] = 'http://i.imgur.com/HMt8ztX.png';
imageCollection[25] = 'http://i.imgur.com/7dt3HdO.jpg';
imageCollection[26] = 'http://i.imgur.com/FbHKouJ.png';
imageCollection[27] = 'http://i.imgur.com/r2ANifEh.jpg';
imageCollection[28] = 'http://i.imgur.com/kkI6JZd.jpg';
imageCollection[29] = 'http://i.imgur.com/EOKg2nn.jpg';

for(var i=0; i<img.length; i++) {
    image = new Image();
    image.src = img[i].src;
    var random = Math.floor((Math.random()*imageCollection.length));
    img[i].style.width = image.width+"px";
    img[i].style.height = image.height+"px";
    
    img[i].src = imageCollection[random];
}