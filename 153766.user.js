(function ()
{
var fileMETA=new Array(); 
// ==UserScript==
// @name                   4chan B fixer
fileMETA["name"] =        '4chan B fixer';
// @description            fixes rotated and annoying background
fileMETA["description"] = 'enhances 4chan by changing the live layout, allowing more images, and auto animates them';
// @details                enhances 4chan by changing the live layout, allowing more images, and auto animates them
fileMETA["details"] =     'enhances 4chan by changing the live layout, allowing more images, and auto animates them';
// @namespace              fake://4chan/tools/gmscripts/
fileMETA["@namespace"]=    'fake://4chan/tools/gmscripts/';
// @version                20121208
fileMETA["version"]=      '20121208';
// @license                GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
fileMETA["license"] =     'GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)';
fileMETA["author"] = 'Ellipsis (fake://4chan/tools/gmscripts/)';
// @contributor            Ellipsis (fake://4chan/tools/gmscripts/)
fileMETA["contributor"] = 'Ellipsis (fake://4chan/tools/gmscripts/)';
// @updatemetaurl              fake://4chan/tools/gmscripts/4chan_enhanced.meta.js
fileMETA["@updatemetaurl"] =  'fake://4chan/tools/gmscripts/4chan_enhanced.meta.js';
// @updateurl                  fake://4chan/tools/gmscripts/4chan_enhanced.user.js
fileMETA["@updateurl"] =       'fake://4chan/tools/gmscripts/4chan_enhanced.user.js';

// @include        http://boards.4chan.org/b*
// @include        https://boards.4chan.org/b*
// @exclude        *phpMyAdmin*
// ==/UserScript==


    var css = 'body{transform:rotate(0deg) !important;-ms-transform:rotate(0deg) !important;-moz-transform:rotate(0deg) !important;-webkit-transform:rotate(0deg) !important;-o-transform:rotate(0deg) !important;background-image:none!important;background-repeat:none;}',
    body = document.getElementsByTagName('body')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if(style.styleSheet){
        style.styleSheet.cssText = css;
    }else{
        style.appendChild(document.createTextNode(css));
    }
    body.appendChild(style);



})();