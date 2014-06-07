// ==UserScript==
// @name          MyWebIsDelicious
// @namespace     http://kludgebox.com/greasemonkey
// @description   Popup pre-filled MyWeb form on del.icio.us save.
// @include       http://del.icio.us/*url=*
// ==/UserScript==
var delForm = document.getElementById('delForm');
if (delForm) { delForm.addEventListener('submit', post_to_myweb, false); }

function post_to_myweb(e) {
	var delForm = e.target;
	var tags = escape(delForm.tags.value.replace(/\s+/g, ', '));
	var title = escape(delForm.description.value);
	var url = escape(delForm.url.value);
	var notes = escape(delForm.notes.value);
	void window.open('http://myweb2.search.yahoo.com/myresults/bookmarklet?t='+title+'&u='+url+'&tag='+tags+'&d='+notes,'popup','width=520px,height=420px,status=0,location=0,resizable=1,scrollbars=1,left=100,top=50',0);
}
