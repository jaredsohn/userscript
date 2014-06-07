// ==UserScript==
// @name           lirumenu
// @namespace      lirumenu
// @include        http://www.liveinternet.ru/*
// @include        http://liveinternet.ru/*
// ==/UserScript==
var css="div#GlFtrInnr { display: none !important; } span[id=bantop_span]{ display: none !important; }";
var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
		}
var menubtn, MenuLiru
MenuLiru = document.getElementById("GlHdr");
 function getCookie(name) 
	    {   
		    var search = name + "=";
		    if (document.cookie.length > 0) 
		    {  
			    offset = document.cookie.indexOf(search);
			    if (offset != -1) 
			    {
				    offset += search.length;                     
				    end = document.cookie.indexOf(";", offset);  
				    if (end == -1) end = document.cookie.length;
				    return unescape(document.cookie.substring(offset, end));
			    }
		    }
	    }
   function setCookie(name, value) 
	    {
		    document.cookie = name + "=" + value + "; path=/;";
	    }
	    
if (getCookie("menuliru")=="true")
{if (MenuLiru = document.getElementById("GlHdr")){;
	MenuLiru.style.display='none';}
}
else{ if(MenuLiru = document.getElementById("GlHdr")){MenuLiru.style.display='block';}}
if (MenuLiru){
menubtn= document.createElement("span");
menubtn.innerHTML='<a href="#" OnClick="show_hide_effect(\'GlHdr\');if (getCookie(\'menuliru\')==\'true\') setCookie(\'menuliru\',\'false\');else setCookie(\'menuliru\',\'true\');"> Меню</a>';
MenuLiru.parentNode.insertBefore(menubtn, MenuLiru.nextSibling);
             } 