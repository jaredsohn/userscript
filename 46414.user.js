// ==UserScript==
// @name           freeblog pager
// @namespace      fp
// @description    Freeblog.hu pager
// @include        http://*.freeblog.hu/*
// ==/UserScript==


var loc = document.location.host;

var jovobe = "";
var multba = "";

if( loc.indexOf("freeblog.hu") > -1 ){  // freeblogon vagyunk

    var t = document.location.pathname.indexOf("/page/");    
    var i = 1;
    if( t > -1 ){
        i = document.location.pathname.substring(t+6);    

        if( i.substring(i.length-1) == '/' ) {
            i = i.substring(0,i.length-1);           
        }
    }
    var multba = "http://" + loc  + "/page/" + ( ( i*1 )+1);    
    if( i-1 > 0 ) {
        var jovobe = "http://" + loc  + "/page/" + (i-1);
        jovobe = ' <a href="' + jovobe + '" style="color:#ddd;text-decoration:none;">jövőbe &gt;&gt;</a>';
    }
    var multba = '<a href="'+ multba +'" style="color:#ddd;text-decoration:none;">&lt;&lt; múltba</a> ';  
}

var z = multba + '[<a href="javascript:scroll(0,0);" style="color:#ddd;text-decoration:none;">fel</a>][<a href="javascript:scroll(0,'+ document.height +');" style="color:#ddd;text-decoration:none;">le</a>]' + jovobe;


var z2 = document.createElement('div');
z2.setAttribute('style','float:left; position:fixed; bottom:0px; left:40%; padding: 10px; background-color: #000; color:#999; font-size:2em;');
z2.innerHTML = z;

document.getElementsByTagName('body')[0].appendChild(z2);   