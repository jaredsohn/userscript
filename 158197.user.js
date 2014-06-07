// ==UserScript==
// @name		InGo NocNoc 
// @namespace		http://ingo.bugs3.com/scripts
// @version		V1
// @description		Loader for InGo NocNoc 
// @include		http://apps.facebook.com/inthemafia/*	
// @include        	https://apps.facebook.com/inthemafia/*
// @include        	http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        	https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          	http://apps.facebook.com/inthemafia/*
// @match          	https://apps.facebook.com/inthemafia/*
// @match          	http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          	https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==


if (/html_server/.test(document.location.href)) {
    var jmu ='https://github.com/jonnyreeves/jquery-Mustache/blob/master/jquery.mustache.js';
    var url ='http://ingo.bugs3.com/scripts/ingo_script.js';
    loadScriptSource(jmu+"?"+Math.random);
    loadScriptSource(url+"?"+Math.random);
}

function loadScriptSource(u) {
    var x = 0;    
    var demon_waiter = setInterval(
        function (){
           if ($('#demon_frame').length){
              clearInterval(demon_waiter);
              $('#demon_frame').css('display','none');
           }
           if (x > 200){
              //demon didnt load
              clearInterval(demon_waiter);
              return;
           }else{
              x++;
           }
        } ,50)
    var h = document.getElementsByTagName('head').item(0);
    var i = document.createElement('script');
    i.src = u;
    i.type = 'text/javascript';
    i.id = "script";
    h.appendChild(i);
}

