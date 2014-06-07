// ==UserScript==
// @name           GayRomeo Image Inverter
// @namespace      http://www.google.de
// @description    Dieses Script dreht und invertiert Bilder auf GayRomeo.com
// @include        http*://83.98.143.20/*auswertung/pix/popup.php*
// @include        http*://www.gayromeo.com/*auswertung/pix/popup.php*
// @include        http*://www.planetromeo.com/*auswertung/pix/popup.php*
// @include        http*://83.98.143.20/*auswertung/album/mainpage.php*
// @include        http*://www.gayromeo.com/*auswertung/album/mainpage.php*
// @include        http*://www.planetromeo.com/*auswertung/album/mainpage.php*
// @version        2.2.1
// @date           2009/05/04 16:59:00
// ==/UserScript==

var img = document.getElementsByTagName("img")[0];
var button_inv = document.createElement("div");
var button_r = document.createElement("div");
var max = Math.max(img.height,img.width);
var min = Math.min(img.height,img.width);
var orientation = 't';
var offset = 0;
var isinvert = false;

function create_canvas() {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.zIndex = "1";
    canvas.id = 'canvas';
    canvas.width = max;
    canvas.height = max;
    var c = canvas.getContext('2d');
    c.drawImage(img,0,0);
    var p = img.parentNode;
    p.appendChild(canvas);
    img.style.opacity = '0';
    offset = window.innerHeight - img.height;
    if(document.getElementById('border')) {
        document.getElementById('border').style.border = 0;
    }
}

button_inv.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAACXBIWXMAAFxGAABcRgEUlENBAAAACXRFWHRDb21tZW50AACJKo0GAAAEjklEQVR4nIVWS0xcZRS+y5lhHkBFIbZxYWBlV2LixrBwYdypiWlpNC5MTDdNXOjKhBrtI1ojpUV59WF5FwodOrQDUy1tSYe2wEgZZhiGYYa3w0OpYLWttp/nnHv/62VKI8khd+a/3/nO4zvnHw2AduCK7XM2eQAe4/r8O/q3g4tfYPXPkHwo1E+haSfvONGV2InOSQ+0yiEH7t6PoTnqkteK6secaKIPwcX35I3ATI7uzBt/HadGXTgTdtLhR2ibcENjh6fvOMBuakJZYN+tkSz9gFBlKjiyPcLeMuZGw5gLLeNunCMX3oQHdAit9ucsnB51ojHiQe90iRzWhRzQqoYdCK9U4gciXtjooecvUUN82vFBBzpjJTgxkiWHjREXqug77WCfDXzISD5soJyIw6eiSreEPRheeQ6hlfwnrH8+D+yA3iuQFDgnDqxt/EWJnKvz1z9LUoD4bxVSJc7iaNCuV6qaClE3oheD42qPFUls8bU6tMbcAuyIe1BD4QmAq8exMvByajeuzLyPxFoTgZ6Bd3KnMDKwekgHlFYO6gkqYI0Ad5mMZ4xqHKA8VNL5XOXDV2040m/HNxnGZ2Rd0iL+Z4D2WPpnNe5roXqPXyzgknHptiopl5pLzqVXAJJgthknq+9S8mWzMueppF1T2WgOuxlUpJXfsJvJDSzsE9BQ+hOcpaq0EyAw/YoJ4vC047fs0noGDSx+jO7Ea/AlikV2fz9a38REgP1axU07WIIMOEXdnl3vRj11uydVIiAGtJN1KsDRmzZpWHi5Ev1ze0maPxn55ErDRkmmPaliAemAARu+M7rMTA1jBUjebUNv8k3qdqOAFJMAvg3apMPfE4j/GBRKHxQxtkS3Y3T5sAkSALe74rbdBDFTR+xVKAVzeLqCZR5KuQ++prCDwtoMUoVg0Nlxp8yDKQ3WCTdwKx2xvgwt5WdqKV8BlRAzwU8zi1MYPvJN7RnOfYcoxMupbbixmEfrIxc+UsIFw3xTOehO5uBi6j/zs03rFpjJRd/8NgR/yUOAfBzSx9+ntFrK+fM+4nqo+VLFZClyF1jDw0ufmquB7ZyhMhbNeWNNsET9qWy1Y0r1DWCRqyr89bkPpe2h9H6T6Orcu0j93mroxEPPDXj0+D5N3ltPENUOZxmyIIJjJO8ao7OZRN7JYnROvEQK/hGR1XLEfq3G/EY3Rb+DnL4gQ7ZVRrWkFpOgwhgHtkByF9J/BJG+F8TI0tc0R3kUaYdZtnojm4UNv5RumjJafxDH+sM4XV5vy8ioBWkSqPFRi1LpVG3a24ufYWT5K3Kch9boDkytNaNvdrfZHzUprZZseKGaBOUD+rixWYmuze4DX6vXZvcKUd/MB4iuVosQWqLPyw177+GcuamtRFaCsiP9+niqza0mriv+hhCp/vCM852s+sNETZFnpWyZiisP2vWFx2uSB6SKroZjRLIVkcroaUKwSrsx4qQGm0NXpAatgJc4a/cEycs74YI/6cLFKbdpl9iSm81vWG/KhQtxF05SAIb+0+xz06qwrIxC4wqy/oz4PyszMIWZ/v4Ffciuoi1lCFwAAAAASUVORK5CYII=')";
button_inv.id = "button_inv";
button_inv.style.position= "absolute";
button_inv.style.top = 5 + 'px';
button_inv.style.left = '5px';
button_inv.style.zIndex = 100;
button_inv.style.cursor = "pointer";
button_inv.style.width = "24px";
button_inv.style.height = "24px";

button_inv.addEventListener("click", function () {
    if(!document.getElementById('canvas'))
        create_canvas();
    if(!document.getElementById('grtInvScr')) {
        var scr=document.createElement('script');
        scr.type='text/javascript';
        scr.id='grtInvScr';
        scr.innerHTML="function inv() {var canv=document.getElementById('canvas'); var c=canv.getContext('2d');var x=canvas.width,y=canvas.height;var frame=c.getImageData(0,0,x,y),data=frame.data;for(var i=x*y-1;i>=0;i--){var o=oR=i*4,oG=o+1,oB=o+2;data[oR]=(data[oR]^0xff)&255;data[oG]=(data[oG]^0xff)&255;data[oB]=(data[oB]^0xff)&255;}c.putImageData(frame,0,0);}";
        document.getElementsByTagName('head')[0].appendChild(scr);
    }
    invert('invert');
}, false);

function invert(r) {
    var scr=document.createElement('script');
    scr.type='text/javascript';
    scr.innerHTML="inv();";
    document.getElementsByTagName('head')[0].appendChild(scr);
    if(r == 'invert')
        isinvert = !isinvert;
}

document.getElementsByTagName('body')[0].appendChild(button_inv);

button_r.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAACXBIWXMAAFxGAABcRgEUlENBAAAACXRFWHRDb21tZW50AACJKo0GAAAD5UlEQVR4nI1WSVMTURCeY/awavAOVZ48+y+8KVRxwoP/QQs8uBy0RBBBNhEQkFUxYspoiVY0oOwERLYElIhAuZSKWAi0/b15b5hMQJ2qBjLvff318nUHjYi0c09tZ2Hij/qIi7pmffrbymEn4QU+ZOMFrmu1Yy7C0zXrJa1s0EF40fzGLa7lNEy4qIk/tM94xY3gYqru7AY7058dcaFt2kMaHNaNOQhuwAZXdyad+gGjClVwbHmCvWXCQ40TbmqZ8lAHu7g35yU+JK1qxEl14y56MHdUsOCwethBWsWQgw8yaGNrham36c5bD1Uyn3ZtwEGv4kVUM+qkW5zm7Uk3VfA77XyvjXAIJA4bOSfm8KuoPrZEvDS0dpCG13xJFlrKJDjge1kiBeSEwFBJRI7kN7e/UOdMhggSVUIWV8P23UpVj+rFiH5to8RnR1Suk8tbyeEJAKqHWPvjpxnQJYDbO78EI5ICI7K+MagDcssG9ASbJo4IIEpfIxlRCQU8x3mopH2o8sVnNroUstNli+GMrVu0CD8kKM/UP7Ohr9nqHi5moWQo3V4lRalRcpReAah7LsWIE+pr5QRVZe5ySbvnU6g54gEoRyt+aU9KDqD4j4dJIISnXXtlT6rI0veA6MDK+vMEEAOKtJJ+O0GCOsBL1udF/Di1y24LwNV+G6HTAG1srYpL7775xe9w/KQQOFgA0gF9NrrOzVKDdHPczeai0PsCapC6UiABuBK2icEqZ9D0p0YjPKsYARIAtLvktV2fxpEUI7xkkJiHXPTB3xRxcFh2g8kKap1yiXkwpAGdoIF76Qj6klryWbXkU0AlRCt4PzM5JenDZ2hPOvdf4BAfx9Lp5YdMerSQRn5Wwn1p/vlUehBNpZ7YrgVgC7oFF9OodymdwsuZFGQfF/Tx9yut5iJ/jDrqodSkiqkGtFl2Ivq1njpm0kQbO6TKIJq7ck1AooFYitoxufoGMMlVFX4/IuwePMvrT6hz9sC+RFVDTikLJihleVfKzlqJ6nklT3+uFbtpr2ftZ5idHkoiqmK1GAQlchyUfNQCHFg+s6fT3XW4Tf0fTon9BgI1MmpBGgRqfCqkRmHB2AnD0eznZs4kTZRth34Lx6GlAqNsalLMRFioBkFxnz5uMEUUWS3nTbxJLZOHjYxgvYv5Cf1pMPXHTGQmKLwU0scTm1sRBaP51DN3TGSzX3/+prjisF1feFiTGJAK/mooZRIrUbmpdP9DdHvSxQ02hi5HDVoWlji0W8PyujftpkDUTT3zHsMewqKJFpD2KOam+zNuquUApP4/wmfCqjCtjGz5FWT+N+JfVigx2VZ/fwBUYL8y2nj9fQAAAABJRU5ErkJggg==')";
button_r.id = "button_r";
button_r.style.position= "absolute";
button_r.style.top = 5 + 'px';
button_r.style.left = '34px';
button_r.style.zIndex = 101;
button_r.style.cursor = "pointer";
button_r.style.width = "24px";
button_r.style.height = "24px";
button_r.addEventListener("click", drehen,false);
document.getElementsByTagName('body')[0].appendChild(button_r);


function drehen() { 
    if(!document.getElementById('canvas'))
        create_canvas();
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var context = canvas.getContext('2d');
        context.translate(max, 0);
        context.rotate(90 * Math.PI/180);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0,0);
        if(isinvert) {
            invert('drehen');
        }
        if(img.height == max) {
            switch(orientation) {
                case 'r':
                    orientation = 'u';
                    canvas.style.left = -(max-min)+'px';
                    window.innerHeight = img.height+offset;
                    window.innerWidth = img.width;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "inline";
                    }
                    break;
                case 'u':
                    orientation = 'l';
                    canvas.style.left = 0+'px';
                    canvas.style.top = -(max-min)+'px';
                    window.innerHeight = img.width;
                    window.innerWidth = img.height;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "none";
                    }
                    break;
                case 'l':
                    orientation = 't';
                    canvas.style.top = 0+'px';
                    window.innerHeight = img.height+offset;
                    window.innerWidth = img.width;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "inline";
                    }
                    break;
                case 't':
                    orientation = 'r';
                    window.innerHeight = img.width;
                    window.innerWidth = img.height;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "none";
                    }
                    break;
            }
        }
        else { 
            switch(orientation) {
                case 'r':
                    orientation = 'u';
                    canvas.style.left = 0+'px';
                    canvas.style.top = -(max-min)+'px';
                    window.innerHeight = img.height+offset;
                    window.innerWidth = img.width;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "inline";
                    }
                    break;
                case 'u':
                    orientation = 'l';
                    canvas.style.top = 0+'px';
                    window.innerHeight = img.width;
                    window.innerWidth = img.height;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "none";
                    }
                    break;
                case 'l':
                    orientation = 't';
                    canvas.style.top = 0+'px';
                    window.innerHeight = img.height+offset;
                    window.innerWidth = img.width;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "inline";
                    }
                    break;
                case 't':
                    orientation = 'r';
                    canvas.style.left = -(max-min)+'px';
                    window.innerHeight = img.width;
                    window.innerWidth = img.height;
                    if(document.getElementById('comment')) {
                        document.getElementById('comment').style.display = "none";
                    }
                    break;
            }
        }
    }
}