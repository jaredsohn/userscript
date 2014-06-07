// ==UserScript==
// @name          Yahoo Photo Grid
// @description   Defines all images attachments with the real size instead of thumbnails size. Created by Nando Vieira.
// @namespace     http://simplesideias.com.br/greasemonkey/yahoo
// @include       *.mail.yahoo.com/*
// ==/UserScript==
/*
Created by Nando Vieira
http://simplesideias.com.br/
*/

(function() {
    var tables      = document.getElementsByTagName('table');
    var photogrid   = '';
    
    for (var i = 0; i < tables.length; i++)
        if (tables[i].className == 'photogrid') {
            var photogrid = tables[i];
            break;
        }
        
    if (!photogrid) return;
    
    var imgs = photogrid.getElementsByTagName('img');
    var imagenode = document.createElement('div');
    var len = imgs.length;
    imagenode.innerHTML = "<p><strong>Images:</strong> #" + len + "</p>";    
        
    for (var i = 0; i < len; i++) {
        imgs[i].addEventListener('load', function()
        {
            this.width  = this.naturalWidth;
            this.height = this.naturalHeight;
            imagenode.innerHTML += this.parentNode.innerHTML + '<br /><br />';
        }, true);
    }
    photogrid.parentNode.replaceChild(imagenode, photogrid);
})();


