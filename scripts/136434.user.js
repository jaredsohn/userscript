// ==UserScript==
// @name       Cartooniverse Grabber
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.cartooniverse.co.uk/mangaview/*/*.html
// @copyright  2012+, You
// ==/UserScript==

var init_url = document.getElementById('supermanga').src;
var n = init_url.search(".inc")-3;

var prefix_url = init_url.substr(0,n);
var max_page = document.getElementsByName('page')[0].length;
var download_url;
var page = 1;

function pad(number, length) {
    
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    
    return str;
}

function removeImg()
{
    var img = document.getElementById('supermanga');
    img.parentNode.removeChild(img);
}

function createLink()
{
    
    
    var a = document.createElement('a');
    var br = document.createElement('br');
    
    a.setAttribute('href', download_url);
    a.appendChild(document.createTextNode("page" + pad(page,3)));
    
    
    document.getElementsByClassName('one-page')[0].appendChild(a);
    document.getElementsByClassName('one-page')[0].appendChild(br);      
}

removeImg();
for ( page = 1 ; page <= max_page; page++){   
    
    download_url = prefix_url + pad(page,3) + ".inc.dll";  
    createLink();
    
    
}


