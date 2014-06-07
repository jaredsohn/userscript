// ==UserScript==
// @name	  Textarea RTL/LTR for wordpress
// @namespace	  http://userscripts.org
// @description	  Textarea RTL/LTR for wordpress
// @version	  08 Aug. 2011
// @include	  http://mahawees.com/*
// @author	  abdullah.diaa@gmail.com
// ==/UserScript==
(function () {
    var button, div;
    var textarea = document.getElementById("content");
                div = document.createElement('div');
                button = document.createElement('button');
                button.setAttribute('type', 'button')
                button.innerHTML = 'RTL/LTR';
                button.addEventListener('click', function(e){
                   var direction = document.getElementById("content").style.direction;
					if (direction == "ltr"){
						document.getElementById("content").style.direction = "rtl";
					}else {
						document.getElementById("content").style.direction = "ltr";
					}
                }, false);
                textarea.parentNode.insertBefore(div, textarea);
                div.appendChild(textarea);
                div.appendChild(document.createElement('br'));
                div.appendChild(button);
})();