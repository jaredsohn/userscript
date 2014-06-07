// ==UserScript==
// @id             planetsuzy.org-1029042c-1bfd-412a-82a3-18b6e901a827@scriptish
// @name           planetsuzy remove subscription
// @version        1.1
// @namespace      
// @author         Will Marangoni
// @description    
// @include        http://planetsuzy.org/subscription.php?do=*
// @run-at         document-end
// ==/UserScript==

var urloriginal = document.URL;

urlremove = urloriginal.replace('addsubscription', 'removesubscription');

var newbtn = document.createElement("input");
newbtn.setAttribute = ('class', 'button');
newbtn.type = "button";
newbtn.accesskey = "r";
newbtn.value = "Unsubscribe";
newbtn.onclick = function(){
    window.location = urlremove;
};

document.getElementsByTagName('div')[19].appendChild(newbtn);