// ==UserScript==
// @name            Shopulses
// @description     Shopulses
// @version         1.0
// @author          Shopulses

// @include         http://pinterest.com/*
// @include         http://wanelo.com/*
// @exclude         file://*
// @grant           GM_openInTab
// ==/UserScript==
if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return; 
var body = document.body;
var win="";
body.addEventListener("contextmenu", initMenu, false); 
var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-search-by-image" type="context">\
                    <menuitem label="Shop in Shopulses"\
                              icon="http://shopulses.com/web/css/images/video_back.png"></menuitem>\
                  </menu>'; 
document.querySelector("#userscript-search-by-image menuitem")
        .addEventListener("click", searchKeyword, false); 
function initMenu(aEvent) { 
  var node = aEvent.target;
  var item = document.querySelector("#userscript-search-by-image menuitem");
  if (node.localName == "img") {
    body.setAttribute("contextmenu", "userscript-search-by-image");
    item.setAttribute("imageURL", node.alt);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imageURL");
  }
}  
function searchKeyword(aEvent) {
    var imageURL = aEvent.target.getAttribute("imageURL");  
  /* if(win==""){
win=window.open("https://apps.facebook.com/shopulses?keyword="+imageURL,'_default');
		 
	}   */
 GM_openInTab("https://apps.facebook.com/shopulses?keyword="+imageURL);   
}