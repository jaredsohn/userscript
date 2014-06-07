　　// ==UserScript==
　　// @name douban.com Quick Select-All
　　// @description Ease the batch select operation when inviting people to groups/online events.
　　// @namespace http://thinlight.org/
　　// @include http://www.douban.com/group/*/invite
　　// @include http://www.douban.com/online/*/invite
   // @include http://www.douban.com/event/*/invite
　　// ==/UserScript==
　　
　　var wrapper = document.getElementById('in_tablem');
　　var checkboxes = wrapper.getElementsByTagName('input');
　　
　　var checkAll = document.createElement('input');
　　checkAll.type = 'checkbox';
　　
　　var span = document.createElement('span');
　　span.innerHTML = '\u5168\u9009 ';
　　span.appendChild(checkAll);
　　span.style.cssFloat = 'right';
　　
　　var container = wrapper.firstChild.nextSibling.firstChild;
　　container.insertBefore(span, container.firstChild);
　　
　　checkAll.addEventListener('click', function(e) {
　　 var checked = checkAll.checked;
　　 for each (checkbox in checkboxes)
　　 {
　　 if (checkbox.type == 'checkbox')
　　 {
　　 checkbox.checked = checked;
　　 }
　　 }
　　}, false); 
