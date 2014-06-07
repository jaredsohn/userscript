// ==UserScript==
// @name           Flickr tags bigger box
// @namespace      http://www.panix.com/~eli/
// @description    Change the tags text input to a textarea. Flickr requires spaces between tags, so just putting one per line does not work. In some cases one per line with commas at the ends of the lines will work.
// @author         Eli the Bearded
// @include        http://www.flickr.com/photos/*/*/
// @include        http://flickr.com/photos/*/*/
// ==/UserScript==


(function() {

orig_atb=document.getElementById('addtagbox');
orig_atb.setAttribute("id",'unused_addtagbox');
orig_atb.setAttribute("name",'unused_tags');
new_atb=document.createElement('textarea');
new_atb.setAttribute("id",'addtagbox');
new_atb.setAttribute("name",'tag');
new_atb.setAttribute("cols",20);
new_atb.setAttribute("rows",10);
new_atb.setAttribute("onblur",orig_atb.getAttribute("onblur"));
new_atb.setAttribute("value",orig_atb.getAttribute("value"));
// Thanks to GustavoG for figuring out that parentNode.replaceChild works
// here. I had been trying using an appendChild without luck.
orig_atb.parentNode.replaceChild(new_atb, orig_atb);

})();
