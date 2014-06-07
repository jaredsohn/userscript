// ==UserScript==
// @name          Yahoo Mail Full Photo
// @description   Shows all image attachments in original size instead of thumbnails - by Amish Mehta
// @namespace     http://greasemonkey.mozdev.com
// @include       *.mail.yahoo.com/*
// ==/UserScript==

(function() {
    var i, doctables=document.getElementsByTagName('table');
    var my_func=function(e){this.width=this.naturalWidth;this.height=this.naturalHeight;e.preventDefault();};
    for (i=0; i<doctables.length; i++) {
        if (doctables[i].className == 'photopanel') {
            var j, imgs = doctables[i].getElementsByTagName('img');
            for (j=0; j<imgs.length; j++) imgs[j].addEventListener('load', my_func, true);
            var svlnks = doctables[i].getElementsByTagName('td');
            for (j=0; j<svlnks.length; j++) {
                if (svlnks[j].className == 'savetolinks') {
                    var bca = svlnks[j].getElementsByTagName('a');
                    if (bca.length > 0) {//we assume last link is 'save to photos'
                        var newa = document.createElement('a');
                        newa.target = '_blank';
                        newa.innerHTML = 'View Full Photo';
                        newa.href = bca[bca.length-1].href;
                        newa.href = newa.href.replace(/&Briefcase=1/g,'');
                        newa.href = newa.href.replace(/&VScan=1/g,'');
                        bca[bca.length-1].parentNode.insertBefore(document.createElement('br'), bca[bca.length-1].nextSibling);
                        bca[bca.length-1].parentNode.insertBefore(newa, bca[bca.length-1].nextSibling.nextSibling);
                    }
                }
            }
        }
    }
})();
