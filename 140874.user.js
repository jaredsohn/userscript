// ==UserScript==
// @id             baiduwenkuCopy-baiduwenkuCopy
// @name           baiduwenkuCopy
// @version        1.0
// @namespace      http://userscripts.org/users/shadowedge
// @author         shadowedge
// @description    
// @include        http://wenku.baidu.com/view/*.html*
// @run-at         document-end
// ==/UserScript==

var loc = window.location.toString();
var div = document.getElementById("page-curmbs");
// alert(div);
// div.style.backgroundColor = "yellow";
var link =  document.createElement("a");
    link.style.backgroundColor = "yellow";
    link.target = "_blank";

	var suffix = loc.substr(loc.indexOf("wenku.baidu.com"), loc.length-1);
	// alert(suffix);
	var url = "http://"+"wap"+suffix;
	link.href = url;
    link.onClick = function(){ 
		//alert(url);
	}
    link.appendChild(document.createTextNode("ToCopyPage"));
    div.appendChild(link);
