// ==UserScript==
// @name          SSL Proxy Cleaner
// @namespace     http://userstyles.org
// @author        RNiK
// @version       2.0
// @description	  Remove some unnecessary element when using web-proxies like Libertybell.biz
// @include       http://*libertybell.biz/home.php/*
// @include       https://*libertybell.biz/home.php/*
// @include       http://*freesslproxy.com/home.php/*
// @include       https://*freesslproxy.com/home.php/*
// ==/UserScript==

// Remove big table on top with sponsor ads
var elm = document.evaluate("/html/body/div[2]", document, null, 9, null).singleNodeValue;
elm.parentNode.removeChild(elm);

// Show/Hide DIV function
// Credits to devnull69 (http://userscripts.org/topics/51159#posts-243709)
function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(window.getComputedStyle(e, null).getPropertyValue('display') == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}

function insertLinkBefore(id) {
  var e = document.getElementById(id);
  var button=document.createElement('input');
    button.Id='button';
    button.setAttribute("type", "button");
    button.setAttribute("align","center");
    button.setAttribute("style","float:none; display:block; margin:2px auto;");
    button.value='Show/Hide DIV';
    button.addEventListener('click', function () {
          toggle_visibility(id);
       }, false);
//    button.setAttribute('onclick', 'toggle_visibility(id);');
    e.parentNode.insertBefore(button, e);
}

insertLinkBefore("include");