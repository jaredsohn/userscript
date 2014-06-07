// Yumyum, UI enhancements for del.icio.us
// Copyright: Daniel Kinzler, brightbyte.de, 2007
// Version: 0.3, 20070319
// License: GPL
//
// ==UserScript==
// @name          yumyum
// @namespace     http://brightbyte.de/gm/
// @description   bulk-editing for your del.icio.us account
// @include       http://del.icio.us/*
// ==/UserScript==

//FIXME: when checking many link to the same server, insert a delay; otherwise, timeouts may occur; -> group work-queue by target host.
//TODO: process items in-sequence (xpath seems to return the snapshot in a strange order?!)
//TODO: use Their code to make tag suggestions in input field
//TODO: play nicely with bottom bar. if there are *few* links, the bar is pushed off-screen.

var yumyumDebug = 0; // 0 = no debug, 10 = trace (live), 20 = late intercept (simulate), 30 = early intercept (check)
var yumyumDelay = 2 * 1000; // 2 seconds delay between requests (not counting response time)
var yumyumLinkCheckDelay = 500; // 0.5 seconds delay between requests when checking URLs. Ugly workaround, should use by-host grouping.
var yumyumLinkCheckTimeout = 23 * 1000; // 23 seconds before giving up
var yumyumDepink = true; // apply depinkification to "saved by x other people"

////////////////////////////////////////////////////////////////////////////////////////////////////////

var yumyumAPI = "https://api.del.icio.us/v1/";
var yumyumURI = 'http://brightbyte.de/gm/yumyum';
var yumyumUA = yumyumURI + ' using Greasemonkey on ' + navigator.userAgent;

////////////////////////////////////////////////////////////////////////////////////////////////////////

var yumyumUser = null;
var yumyumHome = false;
var yumyumAtHome = false;

var yumyumJobs = [];
var yumyumActive = false;
var yumyumEnabled = true;

var yumyumControls = '<div class="yumyum-controls" id="yumyum-ctrl{n}" style="background-color:#DDDDFF; border:1px solid #888888; padding:0.5ex; margin:0.5ex; font-size:80%;">'
+ ' <div style="float:right; font-size:72%; text-align:right; background-repeat:no-repeat; background-position:right center;" id="yumyum-ctrl-deco{n}">[<a id="yumyum-toolbox-toggle{n}" href="javascript:void(0)">^</a>]'
+ '                                         <br/><a href="'+yumyumURI+'">YumYum</a></div>'
+ ' <button id="yumyum-select{n}" title="select all">select</button> <button id="yumyu-unselect{n}" title="unselect all">unselect</button> all | '
+ ' <button id="yumyum-check{n}" title="check selected links">check</button> <button id="yumyum-delete{n}" title="DELETE selected posts" onmouseover="this.style.backgroundColor=\'#AA3333\'" onmouseout="this.style.backgroundColor=null">delete</button>'
+ ' <button id="yumyum-private{n}" title="conceal (unshare) selected posts">conceal</button> <button id="yumyum-public{n}" title="share selected posts">share</button> selected | ' 
+ ' <button id="yumyum-add{n}" title="add tags to the selected posts">add</button> <button id="yumyum-remove{n}" title="remove tags from the selected posts">remove</button>'
+ ' <input id="yumyum-ctrl{n}-tags" type="text" class="tags" title="tags to add or remove"/> tags'
//+ ' <input id="yumyum-ctrl{n}-tags" type="text" class="tags" onfocus="showSuggest()" onblur="hideSuggest()" onkeypress="keypress()" onkeyup="keyup()" onkeydown="keydown()" /> tags'
+ ' <!--<button id="yumyum-fix{n}">fix</button>-->'
+ '</div>';

function yumyumInitControls(n) {
	document.getElementById('yumyum-toolbox-toggle'+n).addEventListener('click', function() { yumyumSetToolboxVisible(true); }, false);

	document.getElementById('yumyum-select'+n).addEventListener('click', function() { yumyumSelect(true); }, false);
	document.getElementById('yumyu-unselect'+n).addEventListener('click', function() { yumyumSelect(false); }, false);

	document.getElementById('yumyum-check'+n).addEventListener('click', function() { yumyumCheckLinks(); }, false);
	document.getElementById('yumyum-delete'+n).addEventListener('click', function() { yumyumDelete(); }, false);
	document.getElementById('yumyum-private'+n).addEventListener('click', function() { yumyumShare("no"); }, false);
	document.getElementById('yumyum-public'+n).addEventListener('click', function() { yumyumShare("yes"); }, false);

	var field = document.getElementById('yumyum-ctrl'+n+'-tags');
	document.getElementById('yumyum-add'+n).addEventListener('click', function() { yumyumMangleTags(field, false); }, false);
	document.getElementById('yumyum-remove'+n).addEventListener('click', function() { yumyumMangleTags(field, true); }, false);

	var fix = document.getElementById('yumyum-fix'+n);
	if (fix) fix.addEventListener('click', function() { yumyumDecorateAllItems(); }, false);
}


function yumyumTrace(msg) {
	if (yumyumDebug <= 0) return;
	if (GM_log) GM_log(msg);
	//if (yumyumDebug >= 20) document.body.innerHTML = msg + "<br/>" + document.body.innerHTML;
}

function yumyumDelete () {
	mangler = function( post ) {
		return { 'url': post['url'] }; //only use url, ignore other properties
	};

	yumyumRun('delete', mangler, "\n****** DELETE ******\n them");
}

function yumyumCheckLinks(url, descr, e) {
	yumyumRun('checklinks', null, "check their URLs");
}

function yumyumShare(shared) {
	mangler = function( post ) {
		if (post['shared'] == shared) return null; //skip item
		post['shared'] = shared;
		return post;
	};

	yumyumRun('add', mangler, shared == "yes" ? "SHARE them" : "CONCEAL them");
}


function yumyumMangleTags(field, remove) {
	var v = field.value.replace(/^ +| +$/, '').replace(/  +/, ' '); //notemalize spaces
	var tt = v == "" ? [] : v.split(' ');

	if (tt.length == 0) {
		alert("no tags specified!");
		return;
	}

	mangler = function( post ) {
		var t = post['+tagarr'];

		var nt = t.filter( function(x) { return tt.indexOf(x) < 0; } ); //note: always remove, to avoid duplicates
		if (!remove) nt = nt.concat(tt);

		if (nt.length == t.length) return null; //nothing to do!

		post['+tagarr'] = nt;
		post['tags'] = nt.join(' ');
		return post; 
	};

	yumyumRun('add', mangler, ( remove ? "REMOVE" : "ADD" ) + " these tags: " + tt.join(' '));
}

function yumyumRun(command, mangler, desc) {
	if (yumyumActive) {
		alert("YumYum is still busy. Please be patient!");
		return;
	}

	var posts = yumyumCollect();
	if (posts.length == 0) {
		alert("no posts selected!");
		return;
	}
	else {
		if (!confirm(posts.length + " posts selected.\nDo you want to " + desc + "?")) 
			return;
	}

	var cmd = yumyumAPI + "posts/" + command + "?";
	var mth = 'GET';

	for(var i=0; i<posts.length; i++) {
		var p = posts[i];

		var a = {};
		for(var k in p) a[k] = p[k];
		if (mangler) a = mangler(a);
		if (!a) continue; //mangler returned null, so skip it

		var u = cmd + "&" + yumyumArgs(a);
		var headers = {}; 
		var timeout = null;
		var delay = yumyumDelay;

		if (command == 'checklinks') {
			//mth = 'HEAD';
			u = p['url'];
			headers['Range'] = '0-1'; //one byte is enough
			headers['If-Modified-Since'] = new Date().toUTCString(); //probably not modified since now.
			timeout = yumyumLinkCheckTimeout;
			delay = yumyumLinkCheckDelay;
		}

		if (yumyumDebug >= 30) {
			yumyumTrace(mth+" "+u);
		}
		else {
			var job = {
				'command': command,
				'method': mth,
				'action': u,
				'headers': headers,
				'data': a,
				'item': p['+item'],
				'name': p['url'],
				'url': p['url'],
				'key': p['+item'].id,
				'timeout': timeout,
				'delay': delay,
			};

			yumyumSchedule(job);
		}
	}
}

function yumyumSchedule(job) {
	yumyumJobs.push(job);

	if (!yumyumActive) {
		yumyumTrace("activating worker");
		yumyumActive = true;
		yumyumRunNextJob();
	}

	yumyumSetEnabled(false);
}

/*
function yumyumCall(job){
	alert("YumYUm!");
	type = 'edit';
	var post = job['item'];
	var data = getPostData(post);
	if (!data.link) return true;
	var form = makePostForm(data, post, type);

	alert(data);
	alert(form);
}*/

function yumyumCall(job) {
	var item = job['item'];
	var complete = false;
	//var throbber = job['throbber'];

	var callback = function(response) {
		if (complete) {
			yumyumTrace("WARNING: job "+job['name']+" was already canceled by watchdog!");
			if (job['command']!='checklinks') return; //in checklinks-mode, accept the response anyway. may look odd, but no har is done.
		}

		//item.removeChild(throbber);
		complete = true;
		item.style.backgroundColor = job['oldbg'];
		item.style.backgroundImage = null;
		yumyumApplyResponse(job, response);
	}
	
	if (yumyumDebug >= 20) {
		yumyumTrace("SIMULATING "+job['method']+" "+job['action']);

		response = {
			readyState : 4,
			status : 200,
			statusText : 'OK',
			responseHeaders : [],
			responseText : '<result code="done"/>',
		};

		callback(response);
	}
	else {
		yumyumTrace(job['method']+" "+job['action']);

		var headers = job['headers'];
		headers['User-Agent'] = yumyumUA;

		var request = new GM_xmlhttpRequest({
			'method': job['method'],
			'url': job['action'],
			'headers': headers,
			'onload': callback,
			'onerror': callback, //doesn't handle TCP errors :(  ...or any errors, it seems.
		});
	}	

	if (job['timeout']) {
		yumyumTrace("starting watchdog with "+job['timeout']+"ms delay");

		var dog = function() {
			if (complete) return;

			response = {
				readyState : -1, //error state
				status : 510,    //timeout
				statusText : 'Timeout',
				responseHeaders : [],
				responseText : '<result code="timeout"/>',
			};
	
			callback(response);
		};

		window.setTimeout(dog, job['timeout']);
	}
}

function yumyumRunNextJob() {
	yumyumTrace("job queue: " + yumyumJobs.length);

	job = yumyumJobs.pop();
	if (!job) {
		yumyumActive = false;
		yumyumSetEnabled(true);
		return;
	}

	yumyumTrace("Running job: " + job['name']);

	var item = job['item'];
	job['oldbg'] = item.style.backgroundColor;
	item.style.backgroundColor = '#CCCCCC';
	item.style.backgroundImage = 'url(chrome://browser/skin/Throbber.gif)';
	item.style.backgroundRepeat = 'no-repeat';
	item.style.backgroundPosition = 'right center';

	//item.insertBefore(throbber, item.firstChild);

	try {	
		yumyumCall(job);
	}
	finally {
		yumyumTrace("setting next timer");
		window.setTimeout(yumyumRunNextJob, job['delay']);
	}
}

function yumyumArgs(args) {
	var a = '';
	var k;
	for (k in args) {
		var v = args[k];
		if (v==null) continue;
		if (typeof(v)!="string") continue;
		if (v.match(/^\+/)) continue;

		if (a!='') a+= "&";
		a+= k;
		a+= "=";
		a+= encodeURIComponent(v);
	}
	return a;
}

function yumyumSetEnabled(enabled) {
	yumyumTrace("Enabled: " + (enabled ? "yes" : "no"));
	yumyumEnabled = enabled;

	yumyumSetControlsEnabled(1, enabled);
	yumyumSetControlsEnabled(2, enabled);
	yumyumSetControlsEnabled(3, enabled);
}

function yumyumSetControlsEnabled(n, enabled) {
	document.getElementsByTagName("body")[0].style.backgroundColor = (enabled || !yumyumActive ? 'inherit' : '#F0F0F0');
	document.getElementById("main").style.backgroundColor = (enabled || !yumyumActive ? 'inherit' : '#F0F0F0');

	//document.getElementById("yumyum-ctrl"+n).style.backgroundColor = (enabled ? '#EEEEEE' : 'blue');
	document.getElementById("yumyum-ctrl-deco"+n).style.backgroundImage = (enabled || !yumyumActive ? null : 'url(chrome://browser/skin/Throbber.gif)');

	document.getElementById('yumyum-select'+n).disabled= !enabled;
	document.getElementById('yumyu-unselect'+n).disabled= !enabled;

	document.getElementById('yumyum-check'+n).disabled= !enabled;
	document.getElementById('yumyum-delete'+n).disabled= !enabled;
	document.getElementById('yumyum-private'+n).disabled= !enabled;
	document.getElementById('yumyum-public'+n).disabled= !enabled;

	var tags = document.getElementById('yumyum-ctrl'+n+'-tags');
	tags.disabled= !enabled;
	if (enabled) tags.value = ' ';

	document.getElementById('yumyum-add'+n).disabled= !enabled;
	document.getElementById('yumyum-remove'+n).disabled= !enabled;

	var fix = document.getElementById('yumyum-fix'+n);
	if (fix) fix.disabled= !enabled;
}

function yumyumApplyResponse(job, response) {
	yumyumTrace("Apply: " + job['name'] + " [" + response.status + "] " + response.responseText.substring(0,127));

	var xml = null;
	var code = null;

	if (job['command'] == 'checklinks') {
		var desc =  document.evaluate('./*[@class="desc"]/a', job['item'], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

		if (response.status == 200 || response.status == 304) {
			desc.style.color = 'green';
		}
		else {
			desc.style.color = 'red';
		}

		return;
	}
	
	if (response.status == 200) {
		var parser = new DOMParser();
		xml = parser.parseFromString(response.responseText, "application/xml");

		var r = xml.evaluate('/result', xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		if (!r) code = 'bad response: ' + response.responseText;
		else {
			r = r.snapshotItem(0);
			code = r.getAttribute('code');
		}
	}
	else {
		//TODO: handle 503 (Blocked/overloaded) specially
		code = "HTTP "+response.status+" "+response.statusText;
		document.cookie = 'yumyum_ping=error'; //NOTE: force destroy cookie, to re-force ping
	}

	var item = job['item'];

	if (code != 'done') {
		var msg = document.createElement('div');
		msg.className = 'yumyum-error';
		msg.style.color = 'red';
		msg.appendChild( document.createTextNode('failed: '+code) );
		item.appendChild(msg);
		return;
	}

	//all is well
	if (job['command'] == 'delete') {
		item.parentNode.removeChild(item); //throw away.
	}
	else {
		yumyumUpdateItem(job['item'], job['data']);
	}
}

function yumyumUpdateItem(item, data) {
	var desc =  document.evaluate('./*[@class="desc"]/a', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var notes = document.evaluate('./*[@class="notes"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var meta =  document.evaluate('./*[@class="meta"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var tags =  document.evaluate('./*[@class="meta"]/*[@class="tag"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var private =  document.evaluate('./*[@class="meta"]/*[@class="private"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var date =  document.evaluate('./*[@class="meta"]/*[@class="date"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

	/*
	if (data['url']) desc.href = data['url']; //FIXME: update edit/delete links (and key, too?)

	if (data['description']) {
		while (desc.firstChild) desc.removeChild(desc.firstChild);
		desc.appendChild(document.createTextNode(data['description']));
	}

	if (data['notes']) {
		if (!notes) {
			notes = document.createElement('p');
			notes.className = 'notes';
			notes.appendChild( document.createTextNode(data['notes']) );
		}

		while (desc.firstChild) desc.removeChild(firstChild);
		desc.appendChild(document.createTextNode(data['description']));
	}
	*/


	if (data['+tagarr']) {
		var j = 0;
		while ( (e = tags.snapshotItem(j++) ) !=null ) {
			e.parentNode.removeChild(e);
			//TODO: remove trainling spaces too
		}

		if (meta.firstChild.nodeName != '#text' || meta.firstChild.nodeValue != 'to ') //unstable - make sure the "to" text is there.
			meta.insertBefore(document.createTextNode('to '), meta.firstChild);

		var before = meta.firstChild.nextSibling; //unstable - points between "to" and "..."

		var tt = data['+tagarr'];
		for (var i = 0; i<tt.length; i++) {
			var t = tt[i];
			
			var a = document.createElement('a');
			a.className = 'tag';
			a.href = yumyumUser + "/" + encodeURIComponent(t);
			a.appendChild( document.createTextNode(t) );

			meta.insertBefore(a, before);
			meta.insertBefore(document.createTextNode(' '), before);
		}
	}

	if (data['shared']) {
		//TODO: also add/remove "share"-command
		if (data['shared']=='no' && !private) {
			var privateText = document.createElement('span');
			privateText.style.color = 'red';
			privateText.appendChild( document.createTextNode('not shared') );

			private = document.createElement('span');
			private.className = 'private';
			private.appendChild( document.createTextNode('...') );
			private.appendChild( privateText );

			meta.insertBefore(private, date);
		}
		else if (data['shared']=='yes' && private) {
			private.parentNode.removeChild(private);
		}
	}
}

/*
//reload item, just like they do... how? WOuld be an alternative to yumyumUpdateItem
function yumyumReloadItem(data) {
	var e = yumyumLoadItem(data['url']);
	yumyumDecorateItem(e);

	var item = data['item'];
	item.parentNode.rempaceChild(item, e);
}
*/

function yumyumGetItemData(item) {
	var boxes = document.evaluate('.//input[@class="yumyum-select"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var chk= boxes.snapshotItem(0);
	var u = decodeURIComponent(chk.name);

	var desc =  document.evaluate('./*[@class="desc"]/a', item, null, XPathResult.STRING_TYPE, null);
	var notes = document.evaluate('./*[@class="notes"]', item, null, XPathResult.STRING_TYPE, null);
	var tags =  document.evaluate('./*[@class="meta"]/*[@class="tag"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var private =  document.evaluate('./*[@class="meta"]/*[@class="private"]', item, null, XPathResult.STRING_TYPE, null);
	var date =  document.evaluate('./*[@class="meta"]/*[@class="date"]', item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var description = desc.stringValue;
	var extended = notes.stringValue;
	
	var tagarr = [];
	var j = 0;
	while ( (t = tags.snapshotItem(j++) ) !=null ) {
		tagarr.push(t.firstChild.nodeValue);
	}

	var shared = private.stringValue ? "no" : "yes";
	var dt = date.snapshotItem(0).title;

	var p = {
		"url": u,
		"description": description,
		"extended": extended,
		"+tagarr": tagarr,
		"tags": tagarr.join(' '),
		"shared": shared,
		"dt": dt,
		"+item": item,
	};

	return p;
}

function yumyumCollect() {
	var posts = [];

	var boxes = document.evaluate('//input[@class="yumyum-select"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	var e;
	while ( (e = boxes.snapshotItem(i++) ) !=null ) {
		if (!e.checked) continue; //note selected, ignore

		var item = e;
		while (item && !item.className.match(/(^| )post($| )/)) item = item.parentNode;
		if (!item) continue; //something is wrong
	
		var p = yumyumGetItemData(item);
		posts.push(p);
	}

	return posts;
}

function yumyumSelect(chk) {
	var boxes = document.evaluate('//input[@class="yumyum-select"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	var e;
	while ( (e = boxes.snapshotItem(i++) ) !=null ) {
		e.checked = chk;
	}
}

function yumyumZap(e) {
	while (e && !e.className.match(/(^| )post($| )/)) e = e.parentNode;
        if (e && e.parentNode) e.parentNode.removeChild(e); 
}

function yumyumDecorateItem(e) {
	if (yumyumAtHome) {
		if (e.className && !e.className.match(/(^| )post($| )/)) return; //make sure there's something to decorate
		if (e.firstChild && e.firstChild.className == "yumyum-select") return; //already decorate
	
		var links = document.evaluate('.//*[@class="desc"]/a', e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var a = links.snapshotItem(0);
		if (!a) return;
		
		var url = a.href;
		var descr = a.firstChild.nodeValue; //unstable!
	
		var chk = document.createElement("input");
		chk.type = "checkbox";
		chk.className = "yumyum-select";
		chk.name = encodeURIComponent(url);
	
		e.insertBefore(chk, e.firstChild);
		e.id = e.getAttribute('key'); //for easy access. Why the hell do they use "key" anyway?!
	
		var divs = document.evaluate('.//*[@class="commands"]', e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var cmds = divs.snapshotItem(0);
		if (!cmds) return; 
	
		var btn = document.createElement("a");
		btn.href = "javascript:void(0)";
		btn.className = "yumyum-zap";
		btn.title = "ignore temporarily";
		btn.style.fontSize = "110%";
		btn.style.fontWeight = "bold";
		btn.style.color = "black ! important";
		btn.appendChild(document.createTextNode(">.<"));
		btn.addEventListener('click', function(ev) { yumyumZap(ev.target); }, false);
		cmds.appendChild( document.createTextNode("  ("));
		cmds.appendChild(btn);
		cmds.appendChild( document.createTextNode(")  "));
	}

	if (yumyumDepink) {
		var pop = document.evaluate('.//*[@class="pop"]', e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if (pop) {
			pop.style.backgroundColor = null;
			var n = pop.firstChild.nodeValue.replace(/^saved by (\d+) other people$/, '$1');
			if (n.match(/^\d+$/)) {
				if (n > 10000) pop.style.fontSize = '130%';
				else if (n > 1000) pop.style.fontSize = '120%';
				else if (n > 100) pop.style.fontSize = '110%';
				else if (n > 10) pop.style.fontSize = '100%';
				else if (n > 0) pop.style.fontSize = '90%';
	
				if (n > 0) pop.style.fontWeight = 'bold';
			}
		}
	}
}

function yumyumDecorateAllItems() {
	var entries = document.evaluate('//li[starts-with(@class,"post")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	var e;
	while ( (e = entries.snapshotItem(i++) ) !=null ) {
		yumyumDecorateItem(e);
	}
}

function yumyumPingAPI() {
		if (document.cookie.match('(^|; *)yumyum_ping=ok(; *|$)')) {
			return;
		}

		var u = yumyumAPI + 'posts/update';

		var error = function(details) {
			yumyumTrace("ping failed, code "+details.status);
			document.cookie = "yumyum_ping=failed";
			yumyumSetEnabled(false);
			alert("Failed to access del.icio.us API, YumYum will not work.\n(code: "+details.status+" "+details.statusText+")\n"+u); 
		}

		var complete = function(details) {
			document.cookie = "yumyum_ping=ok";
			yumyumTrace("received ping response, code "+details.status); 
		}

		//just load something, to trigger http auth
		var request = new GM_xmlhttpRequest({
			method: 'GET',
			url: u,
			headers: {
				'User-agent': yumyumUA,
			},
			onload: function(details) { 
				if (details.status==200) complete(details);
				else error(details);
			},

			onerror: error,
		});
	
}

function yumyumSetToolboxVisible(visible) {
	document.getElementById('yumyum-ctrl1').style.display = visible ? 'none' : 'block';
	document.getElementById('yumyum-ctrl2').style.display = visible ? 'none' : 'block';
	document.getElementById('yumyum-ctrl3').style.display = visible ? 'block' : 'none';

	var exp = new Date();
	exp.setMonth( (exp.month +1) % 12);
	document.cookie = 'yumyum_toolbox=' + ( visible ? 'yes' : 'no' ) + '; expires=' + exp.toGMTString();
}

function yumyumInit() {
	yumyumTrace("init()");
	yumyumAtHome = false;

	if ( document.getElementById("yumyum-ctrl1") ) {  //already initialized
		yumyumTrace("init aborted: already initialized");
		return; 
	}

	if (!GM_xmlhttpRequest) {
		yumyumTrace("init aborted: GM_xmlhttpRequest not found");
		alert('GM_xmlhttpRequest not found, yumyum will not work! Please update GreaseMonkey');
		return;
	}

	//find out the user name
	var links = document.evaluate('//*[@id="header-user-links"]//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	while ( (a = links.snapshotItem(i++) ) !=null ) {
		yumyumUser = decodeURIComponent( a.href.replace(/^.*\/([^\/?]+)([?#].*)?$/, '$1') );
		if (yumyumUser != '') break;
	}

	if (!yumyumUser || yumyumUser=='') { //user name not detected. probably not logged in
		yumyumTrace("init aborted: not logged in");
		return; 
	}

	yumyumHome = location.protocol + '//' + location.host + '/' + decodeURIComponent(yumyumUser);
	yumyumAtHome = ( location.href.indexOf(yumyumHome) == 0 || location.href.match(/^https?:\/\/[^\/]+\/search\/?\?.*&type=user/));

	if (!yumyumAtHome) { //we are on another user's turf
		yumyumTrace("init aborted: not your home");
		return; 
	}

	//inject control panels
	var divs = document.evaluate('//*[@id="main"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var main = divs.snapshotItem(0);
	if (main && main.className != 'postui') {
		main.innerHTML = yumyumControls.replace(/{n}/g, '3').replace(/ \| /g, '<br/>')
				+ yumyumControls.replace(/{n}/g, '1') 
				+ main.innerHTML 
				+ yumyumControls.replace(/{n}/g, '2');

		var box = document.getElementById('yumyum-ctrl3');
		box.style.position = 'fixed';
		box.style.top = '0.5ex';
		box.style.right = '0.5ex';
		box.style.width = '28%';
		box.style.border = '3px solid #888888';
		box.style.padding = '0.5ex';
		box.style.fontSize = '80%;';

		yumyumInitControls(1);
		yumyumInitControls(2);
		yumyumInitControls(3);

		var toggle = document.getElementById('yumyum-toolbox-toggle3');
		toggle.addEventListener('click', function() { yumyumSetToolboxVisible(false) }, false);
		toggle.removeChild(toggle.firstChild);
		toggle.appendChild(document.createTextNode('x'));

		var visible = document.cookie.match('yumyum_toolbox=yes');
		yumyumSetToolboxVisible(visible);
	}

	//listen for dom events, so we can decorate items comming from ajax calls
	var postlists = document.evaluate('//*[@class="posts"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	while ( (p = postlists.snapshotItem(i++) ) !=null ) {
		p.addEventListener('DOMNodeInserted', function(ev) { yumyumDecorateItem(ev.target); } , false);
	}

	//check API access (async)
	yumyumPingAPI();
}

yumyumInit();
yumyumDecorateAllItems();
