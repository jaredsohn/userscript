// ==UserScript==
// @id             subba.blog.hu-2a851aa8-3334-4391-830c-4f3ec124732c@scriptish
// @name           Antifilmkiller
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://*subba.blog.hu/*
// @run-at         document-end
// ==/UserScript==

elements = document.getElementsByClassName('commentText');
for (var i = 0; i < elements.length; ++i) {
  var item = elements[i];
  if(item.innerHTML.length > 2000){
	item.innerHTML = "";
	}
}