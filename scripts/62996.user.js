// ==UserScript==
// @name           voop-travian
// @namespace      none
// @description    voop travaian
// @include        http://*.travian.cz*/a2b.php*
// ==/UserScript==


if (e = document.getElementsByTagName("input")) {  
	c = e.length;  
	for(i = 0; i < c; i++) {  
		if (e[i].hasAttribute("name")) {  
			if ((e[i].getAttribute("name") == "t1"))  {
				e[i].value = 5;
			}
			if ((e[i].getAttribute("name") == "c")&&(e[i].getAttribute("value") == "3"))  {
				e[i].checked = true;
			}
		}
	}
}
