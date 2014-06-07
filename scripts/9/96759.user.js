// ==UserScript==
// @name			Twitvid Hotlink
// @description		Obtiene el enlace directo del video y lo muestra en la parte de abajo.
// @version			1.1
// @date			11/02/2011
// @author			JNeutron
// @include			http://*twitvid.com/*
// @exclude			http://*twitvid.com/videos/*
// ==/UserScript==
(function(){
    function getVideoLink(){
        var object = document.getElementsByName('flashvars');
        var flashvars = object[0];
        var video = flashvars.getAttribute('value').substr(5,90);
        var link = decodeURIComponent(video.replace(/\+/g,  " "));
        var source = document.getElementById('get_email');
        var html = '<div style="background:#FFF9D7; border:1px solid #E2C822; padding:6px 0;width:100%;margin:0 auto;"><input type="text" size="46" style="border:none;background:#FFF9D7;font-weight:bold;font-size:11px;font-family:verdana;" onclick="select(this);" value="' + link + '"/></div>';
        source.innerHTML = html;
        source.style["display"] = 'block';
    }
    
    getVideoLink();
})();
