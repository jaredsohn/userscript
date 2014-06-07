// ==UserScript==
// @name           4chan image leech helper
// @namespace      http://userscripts.org/users/113091
// @description    Makes a list of images for easy leeching
// @include        http://boards.4chan.org/*/res/*
// ==/UserScript==


//  Xpath constants
const fullImgPath = '//span[@class="filesize"]/a[@target]/@href';
const fileNamePath = '//span[@class="filesize"]/span/@title';

//  Base64 Encoder from http://www.webtoolkit.info/
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";var k,h,f,j,g,e,d;var b=0;c=Base64._utf8_encode(c);while(b<c.length){k=c.charCodeAt(b++);h=c.charCodeAt(b++);f=c.charCodeAt(b++);j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)}return a},decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));g=this._keyStr.indexOf(c.charAt(b++));e=this._keyStr.indexOf(c.charAt(b++));d=this._keyStr.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+String.fromCharCode(k);if(e!=64){a=a+String.fromCharCode(h)}if(d!=64){a=a+String.fromCharCode(f)}}a=Base64._utf8_decode(a);return a},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}};

//  Main function, makes a new tab and fills it with links to images.
function makeLeechPage()
{
    function evalXpath(xpath)
    {
        return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    var imgsList = evalXpath(fullImgPath);
    var fileNameList = evalXpath(fileNamePath);
    var htmlString = '<html><head><META HTTP-EQUIV="content-type" CONTENT="text/html; charset=UTF-8"></head><body>\n';
    htmlString += '<p>Number of images: ' + imgsList.snapshotLength + '</p>\n<p>';
    var i,x = '';
    for (i=0;i<imgsList.snapshotLength;i++)
    {
        x += (i+1) + '. <a href="' + imgsList.snapshotItem(i).nodeValue + '">' + fileNameList.snapshotItem(i).nodeValue + '</a><br>\n';
    }
    htmlString += x + '</p>\n</body></html>';
    GM_openInTab("data:text/html;base64," + Base64.encode(htmlString));
}

//  Adds the greasemonkey menu command.
GM_registerMenuCommand("4chan image leech helper", makeLeechPage);