// ==UserScript==
// @name           mitx-courseware-chat
// @namespace      thomasloch
// @version        0.10
// @description    Add instant chat box to courseware pages
// @include        https://6002x.mitx.mit.edu/courseware/*
// ==/UserScript==

/*

MITx Courseware Chat
--------------------

Add instant chat box to courseware pages. Currently uses freeshoutbox.net
as service provider. 

*/


unsafeWindow.console.log('Chat loading...');

var indexbar;

var v = document.getElementsByTagName('section');
//for each(var e in v) {
for(var e, j = 0; (e = v[j]) != null; j++) {
	if(e.getAttribute('class') && (e.getAttribute('class') == 'course-index') ) {
		indexbar = e;
		break;
	}
}

// create chat area and add it to index bar
var chat_area = document.createElement("div");
chat_area.setAttribute('class', 'ui-accordion ui-widget ui-helper-reset ui-accordion-icons');
//chat_area.setAttribute('style', 'border: solid green 1px;');
chat_area.style.textAlign = 'center';
indexbar.appendChild(chat_area);



// put actual chat frame into above item
var chat_frame = document.createElement("iframe");
chat_frame.setAttribute('style', 'width: 100%; height: 500px;');
chat_frame.setAttribute('id', 'ircframe');

// mibbit crap
//chat_frame.setAttribute('src', 'http://widget.mibbit.com/?settings=0130844742eb726b6ec3cc1490389515&server=irc.Mibbit.Net&channel=%23amee2k');

// freeshoutbox
chat_frame.setAttribute('src', 'http://mitxbox.freeshoutbox.net/');

// freenode webchat (not very useful since it dies across page changes...)
/*chat_frame.setAttribute('src', 'http://webchat.freenode.net/'
	+ '?channels=6002'
	+ '&uio=Mj10cnVlJjQ9dHJ1ZSY5PXRydWUmMTM9ZmFsc2UmMTQ9ZmFsc2Ua4'
	+ '&randomnick=1'
	+ '&prompt=1'
);/**/

chat_area.appendChild(chat_frame);



var chat_link = document.createElement("a");
var chat_url = 'http://mitxbox.freeshoutbox.net/';
var chat_options = 'width=550,height=450,resizable=yes';
chat_link.setAttribute('href', 'javascript: window.open("'+chat_url+'", "mitx-webchat", "'+chat_options+'").focus()');
chat_link.innerHTML = '<i>Pop out the shoutbox!</i>';
chat_area.appendChild(chat_link);



/*

<noscript>Enable Javascript to get full functionality of this <a href="http://www.freeshoutbox.net/">shoutbox</a><br /></noscript>
<iframe src="http://mitxbox.freeshoutbox.net/" height="300" width="500" frameborder="0"></iframe>

<a href="http://mitxbox.freeshoutbox.net/" target="_blank">[Insert link title here]</a>

*/


