// ==UserScript==
// @name           Mass-Delete
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=*
// @include        http://goallineblitz.com/game/forum_thread_list.pl?team_id=*
// ==/UserScript==

function findName(test) {
    if (test.getAttribute('class')=='thread_title') return 1;
  return 0;
}

function deleteCheck(test) {
    if (test.checked == true) return 1;
  return 0;
}


var boxint = 0
var box = new Array()
var els = document.getElementsByTagName('a');
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
	   var test = els[i].getAttribute('href')
	   var test2 = test.split('thread_id=', 2)
	   box[boxint] = document.createElement('input')
	   box[boxint].setAttribute('type', 'checkbox')
	   box[boxint].setAttribute('value', test2[1])
	   box[boxint].setAttribute('style', 'vertical-align: middle')
	   els[i].parentNode.appendChild(box[boxint])
	   boxint = boxint + 1
	}
}

function deleteThread(id) {
	GM_xmlhttpRequest({
	method: 'GET',
	url: id,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
}

function purge() {
var els2 = document.getElementsByTagName('input');
for(var i=0,j=els2.length; i<j; i++) {
	if (deleteCheck(els2[i])){
	   var deleteid = document.location.href + '&thread_id=' + els2[i].value + '&delete=0'
	   deleteThread(deleteid)
	}
}
setTimeout("location.reload(true);",1000)
}

function errorPrevention(id) {
if (confirm("Really delete these threads?")) {
purge()
}
}

var threads = document.getElementById('threads')
var deletebutton = document.createElement('input')
deletebutton.setAttribute('type', 'button')
deletebutton.setAttribute('value', 'Delete Selected')
deletebutton.setAttribute('style', 'position:absolute')
deletebutton.addEventListener('click', errorPrevention, false)
threads.appendChild(deletebutton)