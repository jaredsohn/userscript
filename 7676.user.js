// ==UserScript==
// @name           GMail - GTD Tickler
// @author         Martin Ruiz
// @namespace      Martin Ruiz
// @description    Very Simple Ticker file functionality to GMail/GTDGMail using GCal
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
/*
   Author: Martin Ruiz

   Credits:

     - I adapted code from a lot of other scripts on userscripts...  lost track:)

   Features:
     + Adds 'Tickle me' link for each message in message view.
     + Custom Popup for Quick Add and link to 'edit event details>>'
     + ';' shortcut key to popup 'Tickle Me' box. 
     + Quickly add 'When' you want to be reminded, just like GCal QuickAdd - otherwise -
     + Opens and Fills out GCal Template in separate window with link to original message.
     + Link in GCal reminder will open GMail message in a seperate window.

   Tips:
     + Choose the color 'red' or some other bold color so that it clearly stands out.
     + Make your goals calendar public and have your friends track your goals too.

   Bonus:
     + Also works with Drafts - In round about way. Draft and email, save, leave draft,
       come back to draft, then 'Tickle Me' 
       - Catch: only works with keyboard shortcut because 'Tickle Me' link does not appear 
         with draft.   

   Todo:
     + Add 'Tickle Me' link when new msgs in thread appear.
     + When not in GMail - The highlighted text and current link are included in GCal details

   Testing:
     + Works with Firefox 2.0 for PC with Greasemonkey

   Version History:
       2.8.1 - 02.21.2009 - last script change didn't work for everyone so I added a 'Tickle me' button on the top right near login
       2.8 - 02.19.2009 - recent gmail changes broke script... appears that gmail greasemonkey api doesn't work like it used to
       2.6 - 06.01.2008 - Add short excerpt of email in gcal entry. Add 'shift+;' shortcut key to redirect to email inside gmail session
       2.5 - 05.05.2008 - merge bug fixes by cbg3 
       2.4 - 03.26.2007 - Fix date issues
       2.3 - 11.12.2007 - Fixed for New GMail
       2.2 - 10.29.2007 - Bug fix - default reminders not being set
       2.1 - 10.23.2007 - Bug fix - disable shortcut in text areas
       2.0 - 09.01.2007 - Rewrite
                + Shortcut
                + Quick Add
*/
(function() {

var gmail;
var DEBUG = true;
var p = null;
var Window;
var Document;

window.addEventListener('load', function(){
	tryGmail();
}, true);

function tryGmail(){
	try{
		if (unsafeWindow.gmonkey){
			if (unsafeWindow.gmonkey.isLoaded('1.0')){
				unsafeWindow.gmonkey.get('1.0').registerViewChangeCallback(function(){});
				var g = unsafeWindow.gmonkey.get('1.0');
				Document = g.getMastheadElement().ownerDocument;
				Window = Document.defaultView;
				if (Document.getElementById('guser')){
					main(g);
					return;
				}
			}
		}
		setTimeout(function(){tryGmail();},100);
	}catch(e){alert('GTD Tickler: '+e);
		setTimeout(function(){tryGmail();},100);
	}
}

function main(g){//alert('in main');

	function prependChild(parent,child){
		parent.insertBefore(child,parent.firstChild);
	}
	
	gmail = g;
	Document = gmail.getMastheadElement().ownerDocument;
	Window = Document.defaultView;
	if (Document.getElementById('tickler_prompt')){ return; }

	var guser = Document.getElementById('guser');
	var t = Document.createElement('span');
	t.innerHTML = '<a id="tickleme_btn" href="#">Tickle Me</a>&nbsp;|&nbsp;';
	prependChild(guser.firstElementChild,t);
	var tme = Document.getElementById('tickleme_btn');
	tme.addEventListener("click",delegate,false);

	p = new Prompt();
	setupShortcut();
}

function runGTDTickler() {
	if (gmail.getActiveViewType() != 'cv') return;
	//gmail.getActiveViewElement().addEventListener("DOMNodeInserted", function() { insertDelegateLinks() }, false);
	insertDelegateLinks();
}

function setupShortcut() // keyboard shortcut: ";"
{
 	Window.addEventListener('keyup', function(e) { 
		if (e.altKey || e.ctrlKey || e.metaKey) {
    			return false;
  		}  
		if (e.keyCode!=59) return;
		if (p.isEditing()) return;

		var element;
		if(e.target) element=e.target;
		else if(e.srcElement) element=e.srcElement;
		if(element.nodeType==3) element=element.parentNode;

		if(element.tagName == 'INPUT' || 
			element.tagName == 'TEXTAREA') return;

		if (e.shiftKey) {
			gotoMessage();
		} else {
			delegate();
		}
	}, true);
}

function addReminder(title,when,content,msgtxt) {
	when = parseWhen(when);
	gcalHttpRequestUnauthorized({
		method: 'GET',
		url: 'http://www.google.com/calendar/compose?ctext=myevent%20' + when,
		onComplete: function(detail) {
			var txt = detail.responseText;
			txt = txt.replace(/while\(1\)\;/ig,'');
			log(txt);
			var dates = eval('('+txt+')');
			var enddate;
			var startdate;
			var date;
			var from = dates[0][4];
			var to = dates[0][5];
			if (noDate(from) && noDate(to) ) {
				alert('Tickle Me Error. Invalid date or time');
				return;
			}
			// some heuristics...
			if ( noDate(to) ) {
				date = from;
				log("no to date");
			} else if ( noDate(from) ) {
				date = to;
				log("no from date");
			} else if ( containsToday(when) ) {
				date = from;
				log("contains today");
			} else if ( containsTomorrow(when) ) {
				date = from;
				log("contains tomorrow");
			} else if ( containsDay(when) && !containsMonth(when) ) {//mon vs month
				date = from;
				log("contains day but not month");
			} else if ( containsNext(when) ) {
				date = from;
				log("contains next");
			} else if ( !isToday(from)) {
				date = from;
				log(from+' != '+today());
				log("from != today");
			} else {
				date = to;
				log("default date = to");
			}
			if (containsTime(when)) {
				startdate = enddate = formatDate(date)+formatTime(date);
			} else {
				startdate = formatDate(date);
			}
			log(startdate+' - '+enddate);
			addEvent(title, content, startdate, enddate, msgtxt);
		},
		onError: function(detail) {
			alert('Tickle Me Error. Invalid date or time.');
		}
	});
}

function addEvent(title, content, startdate, enddate, msgtxt) {
	var link = content;
	if (msgtxt) content = content+"\n\nEMail Excerpt:\n"+msgtxt;
	var data=
    		"<entry xmlns='http://www.w3.org/2005/Atom'"+
    		"    xmlns:gd='http://schemas.google.com/g/2005'>"+
    		"  <category scheme='http://schemas.google.com/g/2005#kind'"+
    		" term='http://schemas.google.com/g/2005#event'></category>"+
    		"  <title type='text'>"+title+"</title>"+
    		(content?("<content type='text'>"+content+"</content>"):"")+
    		"  <gd:transparency"+
    		"   value='http://schemas.google.com/g/2005#event.opaque'>"+
    		"  </gd:transparency>"+
			(link?("<gd:where valueString='"+link+"'></gd:where>"):"")+
    		"  <gd:eventStatus"+
    		" value='"+"http://schemas.google.com/g/2005#event.confirmed"+"'>"+
    		"  </gd:eventStatus>"+
    		"  <gd:when startTime='"+startdate+"'"+
		(enddate?" endTime='"+enddate+"'":"")+ "><gd:reminder/></gd:when>"+
    		"</entry>";
	log(data);
	gcalHttpRequestAuthorized({
		method: 'POST',
		url: "https://www.google.com/calendar/feeds/default/private/full",
		data: data
	});
}

function gcalHttpRequestAuthorized(params) {
	gcalHttpRequestUnauthorized({
		method: 'POST',
		data: '',
		url: "http://www.google.com/calendar/render",
		onComplete: function (detail) {
			var token;
			try {
  				detail.responseHeaders.match(/CAL=([^;]+)/);
  				token= RegExp.$1;
				if (!params.headers) params['headers'] = {};
				params['headers']['Authorization'] = "GoogleLogin auth="+token;
				gcalHttpRequestUnauthorized(params);
			} catch (e) {}
			if (!token) { alert('You may not be logged into GCal. Try again later.'); return;}
		},
		onError: function (detail) {
			alert('Tickle Me Error. You may not be logged into GCal.');
		}
	});
}

function gcalHttpRequestUnauthorized(params) {
	log('params\n'+requestToString(params)+'/params');
	var r = {headers:{}};

	r.method = params.method;

	r.headers = (params.headers?params.headers:{});

	r.headers["Content-Type"] = "application/atom+xml";
	if (params.data) {
		r.headers['Content-length'] = params.data.length;
		r.data = params.data;
	} else {
		r.headers['Content-length'] = 0;
	}

	r.url = params.url;

	r.onload = function(detail) {
      			if (detail.status == 200 || detail.status == 201) {
        			if(params.onComplete) params.onComplete(detail);
      			} else {
				if (params.onError) params.onError(detail);
        			error("HTTP request failed2", detail);
      			}
    		   }

	r.onerror = function(detail) {
			if (params.onError) params.onError(detail);
      			error("HTTP request failed", detail);
		   }
	
	log('req\n'+requestToString(r)+'/req');

  	GM_xmlhttpRequest(r);
}

function requestToString(r) {
	var s='';
	for (var i in r) {
		s = s + i + ": "+
		(i=='headers'?requestToString(r[i]):r[i]) + "\n";
	}
	return s;
}

function parseWhen(when) {
	var w = String(when);

	// support 'tomorrow' shortcut 'tom'
	w = w.replace(/^tom$/ig,"tomorrow");

	if (containsNext(w)) {
		if (!containsDay(w)) {
			// support 'next' instead of one
			w = w.replace(/next/ig,'one');
		}
	}
	return w;
}

function get2Digits(x) {
	return (x<10?'0'+x:x);
}
function today()  {
  var date = "yyyymmdd";
  var d = new Date();
 
  date = date.replace(/yyyy/i, d.getFullYear());
  date = date.replace(/mm/i, get2Digits(d.getMonth()+1));
  date = date.replace(/dd/i, get2Digits(d.getDate()));
  log('today is '+date);
  return date;
}
function isToday(d) { return (d==today()); }

function noDate(date) {return (date.search(/^\?/ig) > -1);}
function containsMonth(when) {return (when.search(/month/ig) > -1);}
function containsTomorrow(when) {return (when.search(/tomorrow/ig) > -1);}
function containsToday(when) {return (when.search(/(tod(ay)?)|(now)/ig) > -1);}
function containsNext(when) {return (when.search(/next/ig) > -1);}
function containsTime(when) {return (when.search(/\d{1,2}((pm|am)|(:\d{2}(am|pm)))/ig) > -1);}
function containsDay(when)  {return (when.search(/(mon(day)?)|(tue(sday)?)|(wed(nesday)?)|(thu(rsday)?)|(fri(day)?)|(sat(urday)?)|(sun(day)?)/ig) > -1);}
function formatTime(date) {
	var s = 'T00:00:00.000';//Z

	if (date.length>8) {
	s =	'T'+
		date.substr(9,2)+':'+
		date.substr(11,2)+':'+
		date.substr(13,2)+'.000';//Z
	}
	
	return s;
}

function formatDate(date) {
	var s =	date.substr(0,4)+'-'+
		date.substr(4,2)+'-'+
		date.substr(6,2);


	return s;
}

function containsTime(when) {
	var t = /\d{1,2}((pm|am)|(:\d{2}(am|pm)))/ig;
	return (when.search(t)>-1);
}

function log(x) {
	if (!DEBUG) return;
	GM_log(x);
	return;
	if (unsafeWindow.console) {
      		unsafeWindow.console.log.apply(unsafeWindow.console,
                	                     Array.slice(arguments));
    	}
}

function error(x,d) { log(x+"\n"+d.responseText); };

function askWhen(callback) {

	p.show(callback);
	return;

	var when = prompt("When? eg. tomorrow, next week, friday at 4pm");
	if (callback && when != null) callback(when);
}

function editReminderDetails(url) {
	var nwin = Window.open(url,"Tickle Me",'height=470,width=600,scrollbars=yes,menubar=no,toolbar=no,status=no');
	if (nwin.focus) {nwin.focus();}
}

function processReminder(when, title, gmail_url, event_details_url, msgtxt, edit) {
	if (when == null) return; //cancelled
//	msgtxt = msgtxt.replace(/(\n+)/ig,"\n");//clean up for display
	if (edit || !when) {
			editReminderDetails(event_details_url, msgtxt);
			return;
	}

//alert("add reminder"+title+",\n"+when+",\n"+gmail_url+",\n"+msgtxt);
	addReminder(title, when, gmail_url, msgtxt);
}

function gotoMessage() {
	var msgtxt = getMessageText();
	var re = /search\=all\&th\=(\w{16})/;
	GM_log(msgtxt);
	var id = re.exec(msgtxt);
	if (!id) return;
	top.location.hash = "#all/"+id[1];
}

function delegate()
{
	var url = String(Window.top.location);
	var real_id = url.match(/#(.*)?\/(.*)/)[2];
	var title = Window.frames.content.document.title; var t=title;
	title = escape(t);
	//var gmail_url = 'http://mail.google.com/mail/?source=navclient-ff#inbox/'+real_id;
    var gmail_url = "http://mail.google.com/mail/?tf=1&fs=1&source=atom&view=cv&search=all&th=" +  real_id;
	var event_details_url = "http://www.google.com/calendar/event?action=TEMPLATE&text=" + title;// + "&details=" + escape(gmail_url);

	var gmail_urlx = gmail_url.replace(/\&/ig,'&amp;'); // replace ampersands
 
	var msgtxt = "";//getMessageText();
//	msgtxt = msgtxt.substr(1,500);
	GM_log(msgtxt);
	
	askWhen(function(when,edit) { processReminder(when, t, gmail_urlx, event_details_url+"&ctext=myevent "+when+"&details=" + escape(gmail_url), msgtxt,edit); });		
}

function insertDelegateLinks() {
	var msgs = getMessages();

	var msg_count = msgs.length;
//	alert("messages: "+msg_count);
	for(var id=0; id < msg_count; id++) {
		var msg = msgs[id];
		if(!Document.getElementById("remindme_" + id)) {

			var td = msg.parentNode;
			var x = document.createElement('td');
			td.parentNode.insertBefore(x,td.nextSibling);
			
			var y = document.createElement('td');
			x.parentNode.insertBefore(y,x.nextSibling);

			var footerLink = document.createElement('div');
			footerLink.className = "mD mG";
			footerLink.setAttribute("style","float: left;");
			footerLink.id = "remindme_" + id;
			footerLink.addEventListener("click",delegate,false);
		
			footerLink.innerHTML = '<span class="qZkfSe">Tickle Me</span>';
		
			y.appendChild(footerLink);

/*
			var footerLink = document.createElement('div');
			footerLink.className = "X5Xvu";
			footerLink.setAttribute("style","float: left;");
			footerLink.id = "remindme_" + id;
			footerLink.addEventListener("click",delegate,false);
		
			footerLink.innerHTML = '<span class="qZkfSe">Tickle Me</span>';
		
			msg.appendChild(footerLink);
*/
		}
	}
}

// customized popup window
function Prompt()
{
	var box = Document.getElementById('tickler_prompt');
	if (box&&p) { p.show(); return this; }

	var self = this;

	this.callback = null;
	
	box = Document.createElement('div');
	box.setAttribute('id','tickler_prompt');
	box.style.zIndex = '101';

	var overlay = Document.createElement('div');
	box.appendChild(overlay);
	overlay.setAttribute('style','display: none;position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;background: #FFFFFF;filter: alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5;');

	var container = Document.createElement('div');
	box.appendChild(container);
	container.setAttribute('style','display: none;position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;background: transparent;z-index: 1001;');
	var inner = Document.createElement('div');
	container.appendChild(inner);
	inner.setAttribute('style','display: block;width: 325px;height: 131px;margin: 120px auto 0 auto;background: #FFFFFF;text-align: center;border: 2px solid rgb(171, 171, 171); -moz-border-radius: 25px;');	

	inner.innerHTML= 
		'<div style="height:25px;width:100%;">'+
			'<div style="width:34; height:33; float:right; margin-right:10px;"><div style="height: 10px;"></div>'+
				'<img id="tickler_close_btn" width="14" height="13" '+ 'src="http://www.google.com/calendar/images/close.gif" '+
					'style="z-index: 184; cursor: pointer;"/>'+
			'</div>'+
		'</div><div style="height:10px;"></div>'+
		'<div>'+
				'<table style="font-size: small;"><tbody>'+
				'<tr><td><div style="width: 15px"></div></td>'+
					'<td>When?</td>'+
					'<td style="width: 100%;">'+
						'<input id="tickler_when" type="text" name="when" style="width: 100%;"/>'+
					'</td>'+
					'<td><div style="width: 25px"></div></td>'+
				'</tr>'+
				'<tr><td></td><td></td>'+
					'<td style="font-size: 86%;">e.g., tomorrow, next week, friday at 5pm</td>'+
				'<td></td></tr>'+
				'<tr><td></td><td></td>'+
					'<td><input id="tickler_btn" type="button" value="Remind Me"/>'+
						' '+ //need space 
						'<label id="tickler_edit_details" style="color: #0000CC; cursor: pointer; text-decoration: underline; white-space: nowrap; font-size: 90%;">edit event details <strong>»</strong></label>'+
					'</td>'+
				'<td></td></tr>'+	
				'</tbody></table>'+
		'</div>';

	this.box = box;
	this.overlay = overlay;
	this.container = container;
	this.inner = inner;

	this.isEditing = function() { return (this.box.style.display=='');}

	this.hide = function() { this.box.style.display = this.overlay.style.display = this.container.style.display= 'none';}
	this.show = function(callback) {
		try{
		this.callback = callback;
		var when = Document.getElementById('tickler_when');
		this.box.style.display = this.overlay.style.display = this.container.style.display= '';
		when.value = '';
		when.focus();		
		}catch(e){alert('Prompt.show: '+e);}
	}

	this.hide();

	Document.body.appendChild(box);
	
	// close button
	Document.getElementById('tickler_close_btn').addEventListener("mousedown", function() {  self.hide();}, false);
	// ok button - book reminder in gcal
	Document.getElementById('tickler_btn').addEventListener("click", 
		function() { 
			self.hide();
			var when = Document.getElementById('tickler_when').value;
			if(when) self.callback(when); 
		}, false);
	// goto to gcal details
	Document.getElementById('tickler_edit_details').addEventListener("mousedown", 
		function() { 
			self.hide();
			var when = Document.getElementById('tickler_when').value;
			self.callback(when,true); 
		}, false);
	// escape key
	//Document.getElementById('tickler_when').addEventListener("blur", function(e) { self.hide(); }, false);

	// enter and submit
	Document.getElementById('tickler_when').addEventListener("keydown", 
		function(e) {
			if (e.keyCode == 27) self.hide();
		}, false);

	Document.getElementById('tickler_when').addEventListener("keyup", 
		function(e) {
			if (e.keyCode == 13) {
				self.hide();
				self.callback((e.target.value.length>0?e.target.value:null));
			}
		}, false);

}

function getMessageText() {
	var txt;
	// id=:gi class=li gt
	try {
		var iterator = gmail.getActiveViewElement().ownerDocument.evaluate(
			".//div[contains(concat(' ', @class, ' '), ' li gt ')]",
			gmail.getActiveViewElement(),
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null);
	} catch(e) { return null; }
	for (var msg = iterator.iterateNext(); msg; msg = iterator.iterateNext()) {
		txt = msg.textContent;
	}
	return txt;
}

function getMessages()
{
	var msgs = [];
//			".//td[contains(concat(' ', @class, ' '), ' bEgJye ')]",

	try {
		var iterator = gmail.getActiveViewElement().ownerDocument.evaluate(
			".//div[contains(concat(' ', @class, ' '), ' XymfBd ')]",
			gmail.getActiveViewElement(),
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null);
	} catch(e) { return null; }
	for (var msg = iterator.iterateNext(); msg; msg = iterator.iterateNext()) {
		msgs.push(msg);
	}

	return msgs;
}

})();