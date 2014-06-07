// ==UserScript==
// @name           One Image
// @namespace      http://userscripts.org/users/95890
// @include        http://*.imagevenue.com/img.php?image=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var img = null;
    
    $('img').each(function() {
        if(this.width > 300 && this.height > 300) {
            img = this;
            return;
        }
    });
    
    if(img) {
        var imgWidth = $(img).width();
        var imgHeight = $(img).height();
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var ratio = Math.max(imgWidth/winWidth, imgHeight/winHeight); // limit width only, not height?
        if(ratio > 1) {
            img.width = Math.round(imgWidth/ratio);
            img.height = Math.round(imgHeight/ratio);
        }
        img.style.marginTop = Math.round((winHeight-img.height)/2);
        $('body').empty().css({'margin':0,'padding':0,'background':'#000','text-align':'center'}).append(img);
    }
});   