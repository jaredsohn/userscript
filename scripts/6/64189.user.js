// ==UserScript==
// @name           Messager
// @namespace      www.userscript.org/sripts/show
// @include        http://www.facebook.com/social_graph.php*node_id=*
// @include        http://www.facebook.com/inbox/?compose
// @include        http://www.facebook.com/inbox/?compose&id=*
// @include        http://www.facebook.com/group.php?gid=*
// ==/UserScript==

	var lang;
	var intID;
	var i;
	var iframe;
	var intID2;
	var links;

(function (){
	if (window.location.href.indexOf('social_graph') != -1) Setup();
	else if (GM_getValue('messaging', 0) && window.location.href.indexOf('compose&id') != -1) intID2 = setInterval(PostMessage, 100);
	else if (window.location.href.indexOf('group') != -1) GM_setValue('messaging', 0);
	else if (GM_getValue('compose', 0)) intID2 = setInterval(InitComposeMessage, 100);
})()

function Setup(){
	var div; var span; var a;
	div = document.getElementsByClassName('UIMediaHeader_Nav')[0];
	if (div.getElementsByTagName('a')[0].textContent.indexOf('Natrag') != -1) lang=1;		// language detection
	else lang=0;
	span = document.createElement('span');
	span.textContent = ' - ';
	div.appendChild(span);
	a = document.createElement('a');
	a.href = '#';
	div.appendChild(a);
	a.addEventListener('click', ComposeHandler, false);
	
	if (GM_getValue('messaging', 0)){
		if (lang) { a.title = 'Stani, STANI SAD!'; a.textContent = 'Prekini slanje'; }
		else { a.title = 'Stop, STOP NOW!'; a.textContent = 'Cancel messaging'; }
		Init();
	}
	else {
		if (lang) { a.title = 'Pošalji poruku SVAKOME!!'; a.textContent = 'Pošalji poruku svima'; }
		else { a.title = 'Send a message to EVERYONE!'; a.textContent = 'Message all'; }
	}
	
	if (!GM_getValue('messaging', 0) && GM_getValue('counter', 0)){			// if previous run was interrupted
		span = document.createElement('span');
		span.textContent = ' - ';
		div.appendChild(span);
		a = document.createElement('a');
		a.href = '#';
		div.appendChild(a);
		a.addEventListener('click', Restart, false);
		if (lang) { a.title = 'Šalji ponovo svima'; a.textContent = 'Kreni iz početka'; }
		else { a.title = 'Send again to everyone'; a.textContent = 'Start over'; }
	}
	
}

function PostMessage(){
	var div;
	div = document.getElementsByClassName('dialog_body')[0];
	if (!div) return;
	clearInterval(intID2);
	document.getElementById('subject').value = GM_getValue('title');			// paste the title and message
	GM_log(GM_getValue('title'));
	div.getElementsByTagName('textarea')[0].textContent = GM_getValue('message');
	GM_log(GM_getValue('title'));
	GM_log(GM_getValue('message'));
	div = div.getElementsByClassName('UIComposer_SubmitButton UIButton UIButton_Blue UIFormButton')[0];
	ClickMe(div.getElementsByTagName('input')[0]);
	GM_setValue('msg_sent', 1);
}

function Restart(){
	GM_setValue('counter', 0);
	ComposeHandler();
}

function ComposeHandler(){
	if (GM_getValue('messaging', 0)) CleanAndExit();
	else {
		// load the compose mesage page
		GM_setValue('compose', 1);
		GM_setValue('url', window.location.href);
		window.location.href = 'http://www.facebook.com/inbox/?compose';
	}
}

// start the timer
function Init(){
	var div;
	i=0;
	// create the frame
	iframe = document.createElement('iframe');
	//iframe.style.display = 'none';
	iframe.style.width = '600px';
	iframe.style.heigth = '400px';
	GM_setValue('msg_sent', 1);
	document.body.appendChild(iframe);
	div = document.getElementsByClassName('UITwoColumnLayout_Content')[0];
	links = div.getElementsByClassName('actionspro_a');
	intID = setInterval(SendMessages, 1000);
}

function SendMessages(){
	var a; var counter;
	if (!GM_getValue('msg_sent', 1)) return;
	GM_setValue('msg_sent', 0);
	// look for a send message link
	for (; i<links.length; i++){
		if (links[i].href.indexOf('compose') != -1){
			iframe.src = links[i].href;
			i++;
			return;
		}
	}
	a = document.getElementsByClassName('UIPager_Button UIPager_ButtonForward');
	if (!a[0]) CleanAndExit();							// there aren't any more pages so wrap it up
	else {
		clearInterval(intID);							// make sure to stop the process before trying to laod the next page
		counter = GM_getValue('counter', 0)+10;			// go to the next page
		GM_setValue('counter', counter);
		window.location.href = GM_getValue('url') + '&start=' + counter;
	}
}

function InitComposeMessage(){
	var span; var a;
	GM_setValue('compose', 0);
	span = document.getElementsByClassName('UIComposer_SubmitButton UIButton UIButton_Blue UIFormButton')[0];
	if (!span) return;
	clearInterval(intID2);
	span.getElementsByTagName('input')[0].addEventListener('click', ComposeMessage, false);
}

// the Send message button intercept
function ComposeMessage(evt){
	var div; var title; var message;
	div = document.getElementsByClassName('dialog_body')[0];
	title = div.getElementsByTagName('input')[1].value;		// get the title nad message
	message = div.getElementsByTagName('textarea')[0].value;
	if (title.length>0 && message.length>0){
		// if user entered a non-zero length title and message, store them and get back to the group page
		GM_setValue('messaging', 1);
		GM_setValue('title', title);
		GM_setValue('message', message);
		window.location.href = GM_getValue('url');
	}
	evt.preventDefault();
}

// clear the interval, cancel the messaging process and reload the group page
function CleanAndExit(){
	GM_setValue('messaging', 0);
	clearInterval(intID);
	window.location.href = GM_getValue('url');
}

function ClickMe(handle){
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return handle.dispatchEvent(evt);
}
