// ==UserScript==
// @name			Recreatu Chatroom Enchancement
// @include			http://*.rescreatu.com/chat/*
// @description		An extension to add rich features to the Rescreatu shoutbox
// @version			2.2.5
// ==/UserScript==

/*
	This work is protected by copyright. I reserve the right to refuse use of my work to anyone.
*/

(function (window, undefined) {
"use strict";
	var data = { // not a configuration, all data needs to be set on runtime in release version
			alert:[] // empty array to store alert objects that are loaded
		,	DOMLoadTimer:null
		,	options:{}
		,	playAudio:null
		,	poll:null
		,	soundurl:['http://www.ilovewavs.com/Effects/Beeps/Bleep.wav'] // array of some sound files
		,	timeout:1225
		,	tmp:null
		,	userid:null
		,	userlist:{}
		,	usersound:{} // map some user ids to sounds ids
	}
	,	loader = document.createElement('div')
	,	$_RCVmeta = {
			major:1
		,	minor:8
		,	revision:107
	};

	// quality assurance, and beta testing; helps me find new javascript errors and bugs to fix
	window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
		// there's an error we keep catching that's not my fault and I don't have control to fix
		if (errorMsg.toLowerCase() == "uncaught typeerror: cannot set property 'innerhtml' of null") return false;//&& lineNumber == 285) return false; // so we try to detect it and ignore

		if(confirm('An unexpected error has occured on line '+lineNumber+'\nMay we attempt to notify the developer?')) { // ask user for permission to report it
			var posty = new Poll('POST');
			posty.callback('http://www.rescreatu.com/rmail/new/', { // gonna send an rmail through ajax
				'open' : function () {
					this.ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
					return 'to=pseudonymous&subject=ResChatv1%20beta%20error%20report&message='+encodeURIComponent('<div><b>'+errorMsg+'</b></div><div><b>Error line:</b> '+lineNumber+'</div><div><b>Error url:</b> '+url+'</div><div><b>Last MID:</b> '+(data.room.last||'none')+'</div><div><b>Message count:</b> '+(this.msgcount||0)+'</div>');
				},
				'success':function(){
					alert('The error had been reported,\nThank you for your help and testing!\n\nYou may need to refresh the page if have any issues');
				},
				'unexpected':function () {
					alert('That failed too... Please contact pseudonymous through rmail.\n\nError message: '+errorMsg+'\nError line: '+lineNumber);
				}
			});
		};
		return false;
	}

	// temporary bandaid until I improve the preferences
	window.onhashchange = function () {
		if (confirm('Changing options requires the page to reload.\nAre you sure you want to continue?')) window.location.reload();
	};

	document.body.style.overflow = 'hidden'; // hide scrollbars
	loader.style.backgroundColor = '#000';
	// this is an entire gif file encoded in base64 and embedded directly on the page using data-uris, because it's silly to have to wait to load a "now loading" image
	loader.style.backgroundImage = 'url(data:image/gif;base64,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)';
	loader.style.backgroundPosition = 'center center';
	loader.style.backgroundRepeat = 'no-repeat';
	loader.style.height = '100%';
	loader.style.left = '0px';
	loader.style.position = 'fixed';
	loader.style.top = '0px';
	loader.style.width = '100%';
	loader.style.zIndex = '999999999';
	document.body.appendChild(loader); // we cleanup a lot of stuff, which looks quite ugly as we load, so we create an element to overlay and hide everything

	data.DOMLoadTimer = setInterval(init, 10); // An interval to constantly run init every one hundredth of a second until DOM is Ready

	function init() {
		if (/loaded|complete/i.test(document.readyState)) { // Begin working if DOM is Ready or do nothing
			clearInterval(data.DOMLoadTimer); // Clear interval so we only run the code once
			window.onload = function () { clearTimeout(window.counter); }; // Stop the timer that refreshes the page

			var userid = document.getElementById('avatar').src // Looking for the userid, which can be found in the avatar url
			,	username = document.getElementById('username').children[0].innerText // Looking for the member's username
			,	chatmini = document.getElementById('chatroom')
			,	matchsound = []
			,	usersound = [];

			// mini chat still loads on rescreatu.com/chat/ rather than rescreatu.com/chat.php
			if (chatmini) document.body.removeChild(chatmini); // so remove it
			else {
				chatmini = document.getElementById('chatroom_close');
				if (chatmini) document.body.removeChild(chatmini);
				//else probably b& or does not meet coppa
			};

			data.options = init.getOptions({
				audio:'true'
			,	autolink:'false'
			,	last:null
			,	lean:'true'
			,	limit:20
			,	matchsound:''
			,	threshold:1000
			,	usersound:''
			});

			data.options.limit = Number(data.options.limit);
			data.options.threshold = Number(data.options.threshold);

			if (data.options.matchsound.length > 0) {
				matchsound = data.options.matchsound.split('|');
			}

			if (data.options.usersound.length > 0) {
				usersound = data.options.usersound.split('|');
				for (var i = 0; i < usersound.length; ++i) data.usersound[usersound[i].toLowerCase()] = 0;
			}

			userid = userid.split('/').pop(); // splits string into array then gets last array item

			if (userid == 'empty-na.gif') { console.log("You must be logged in"); return; }; // end it all if not logged in

			// expects userid to be something like "crop.php?id=__UID__"
			userid = userid.substring(12); // Final digest for userid, everything from 12th char to the end of string

			data.userid = userid; // remember userid in global scope
			if (data.options.lean != 'false') data.userlist[userid] = [username,'font-style:italic;']; // username and some user specific css in global scope

			if (!inArray(matchsound, username)) matchsound.push(username);
			data.alert.push(new Audio(data.soundurl[0],matchsound)); // creates and registers a new sound

			data.tmp = (new Temp()).getContent().makeStyle('dynamic').makeBody();
			data.room = (new Room(data.tmp)).makeRoom().makeToolbar().start(); // Bulk of work in creating template

			/*data.post = new Poll('POST');
			data.post.callback('http://www.rescreatu.com/getTime.php',{
				'open' : function (event) {
				};
			,	'success' : function (event) {
				};
			,	'unexpected' : function () {
					alert('Unable to query server, chatting will not be available at this time.');
				};
			};);

			else this.get.open('GET','http://www.rescreatu.com/tagbox2/getChat.php?chat=1');*/
		};
	};

	init.getOptions = function (ret) { // takes object of defaults
		if (window.location.hash.length > 1) {
			var query = window.location.hash.substring(1)
			,	vars = query.split('&')
			,	i,pair;

			for (i = 0; i < vars.length; i++) {
				pair = vars[i].split('=');
				ret[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			};
		};
		return ret;
	};

	init.setOptions = function (opt) {
		var i, ret=[];
		for (i in opt) ret.push(encodeURIComponent(i)+'='+encodeURIComponent(opt[i]));
		return ret.join('&');
	};

	function Audio (url,list) {
		this.regex = Audio.setMatchList(list);
		this.audio = document.createElement('audio');
		this.audio.setAttribute('preload','auto');
		this.audio.setAttribute('src',url);
		document.body.appendChild(this.audio);
		return this;
	};

	Audio.play = function (index) {
		data.alert[index||data.playAudio].play();
	};

	Audio.prototype.play = function () {
		return this.audio.play();
	};

	Audio.setMatchList = function (list) {
		if (isArray(list) && list.length > 0) {
			list.sort(); // sort first
			return new RegExp('\\b'+list.join('\\b|\\b')+'\\b','i'); // should make something like /\bentry1\b|\bentry2\b|\bentry3\b/i
		}
		return null;
	};

	Audio.prototype.setMatchList = function (list) {
		this.regex = Audio.setMatchList(list);
		return this;
	};

	Audio.test = function (text) {
		var	i = 0
		,	x = data.alert.length;
		for (; i < x; ++i) if ((data.alert[i].regex !== null && data.alert[i].regex.test(text))) return i;
		return null;
	};

/* [s]this ajax class is garbage and needs a complete redo[/s] - gettin better */
	function Poll (method,fn) {
		var _t = this; // event scopes
		// XMLHttpRequest won't work on interneh splorerer
		this.method = method||'GET';
		this.event = {};
		this.state = fn||Poll.noop;
		this.ajax = new XMLHttpRequest;

		this.ajax.onreadystatechange = function(event){ // simple event mapper
			//console.log(_t.ajax.readyState,event);
			var eventname = Poll._[_t.ajax.readyState];
			if (_t.state[eventname]) _t.state[eventname].call(_t,event);
		};

		return this;
	};

	Poll.prototype.getTime = function () {
		//this.bg.open('GET','http://www.rescreatu.com/getTime.php');
	};

	Poll.prototype.setEvent = function (name, fn) {
		this.event[name] = fn;
		//this.bg.open('GET','http://www.rescreatu.com/getTime.php');
	};

	Poll.prototype.setEvents = function (fn) {
		this.event = fn;
		//this.bg.open('GET','http://www.rescreatu.com/getTime.php');
	};

	Poll.prototype.callback = function (url, events, fn, method, async) {
		if (events) this.event = events;
		if (fn) this.state = fn;
		if (method) this.method = method;
		return this.ajax.open(this.method, url, (async===false?false:true));
	};

	Poll._ = ['start','open','send','load','end'];

	Poll.noop = {
		start:function(event){ if (this.event.start) this.event.start.call(this,event); }
	,	open:function(event){
			var params = null;
			if (this.event.open) params = this.event.open.call(this,open)||null;
			this.ajax.send(params);
		}
	,	send:function(event){}
	,	load:function(event){}
	,	end:function(event){
			switch (this.ajax.status) {
				case 200:
					if (this.event.success) this.event.success.call(this,event);
				break;
				default:
					if (this.event.unexpected) this.event.unexpected.call(this,event);
				break;
			};
		}
	};

/* very sloppy and lazy, but effective template system */
	function Temp () {
		this.index = {
			$:[]
		,	_:{}
		,	css:{
				dynamic : {
					'a.uc':'color:#000;font-weight:bold'
				,	'div[data-mid]':'margin:2px 0'
				,	'div[data-mid]:hover':'background-color:#eee'
				,	'.space':'margin-left:5px'
				,	'.wrap':'border:#ccc 1px solid; border-radius:5px; float:left'
				,	'.btn':'background-color:#eee; cursor:pointer; padding:5px'
				,	'.btn:hover':'background-color:#ddd; padding:5px'
				,	'.input':'background-color:transparent; border:none; color:#59534C; font-family:Tahoma, Arial, Verdana; padding:4px'
				,	'.input:focus':'outline:none'
				,	'#room':'font-size:10pt; height:400px; margin:0px 10px; overflow-Y:scroll; word-wrap:break-word'
				,	'#room img':'max-height:15px'
				,	'#toolbar':'border-top:#e1ecef 1px solid; margin:0 10px; padding-top:10px'
				,	'#btn-alerts':''
				}
			}
		};

		return this;
	};

	Temp.ele = function (node,style,attr,events) {
		var node = document.createElement(node)
		,	index;
		if (style) for (index in style) node.style[index] = style[index];
		if (attr) for (index in attr) node.setAttribute(index,attr[index]);
		if (events) for (index in events) node.addEventListener(index,events[index],false);
		return node;
	};

	Temp.prototype.appendTo = function (index,obj) { // get object by name
		return this.index.$[index].appendChild(obj);
	};

	Temp.prototype.get = function (name) { // get object by name
		return this.index.$[this.index._[name]];
	};

	Temp.prototype.geti = function (name) { // get index by name
		return this.index._[name];
	};

	Temp.prototype.set = function (name,value,appendTo) {
		if (this.index._[name]) this.index.$[this.index._[name]] = value;
		else {
			this.index._[name] = this.index.$.length;
			this.index.$.push(value);
		};
		if (appendTo) {
			if (typeof this.index._[appendTo] == 'number') {
				this.index.$[this.index._[appendTo]].appendChild(this.index.$[this.index._[name]]);
			}
			else if (appendTo.appendChild) appendTo.appendChild(this.index.$[this.index._[name]]);
		};
		return this.index._[name];
	};

	Temp.prototype.setStyle = function (name) {
		var si=this.geti(name),i,css='';
		for (i in this.index.css[name]) css+=i+'{'+this.index.css[name][i]+'}';
		this.index.$[si].innerHTML = css;
	};

	Temp.prototype.getContent = function () {
		var ci = this.set('content',document.getElementById('content')); // Content: Wrapper for the old body
		this.index.$[ci].removeChild(document.getElementById('body')); // remove old body
		this.set('header',document.getElementById('breadcrumbs')); // breadcrumbs becomes our header
		return this;
	};

	Temp.prototype.makeBody = function () {
		this.set('body',Temp.ele('div',{
			background:'white url(http://www.rescreatu.com/system/schemes/images/content-corner-bottom.gif) no-repeat center bottom'
		,	float:'left'
		,	minHeight:'757px'
		,	width:'630px'
		}),'content');
		return this;
	};

	Temp.prototype.makeStyle = function (name,noset) {
		name = name||'style';
		this.set(name,Temp.ele('style'),document.getElementsByTagName('head')[0]);
		if(!noset) this.setStyle(name);
		return this;
	};

	Temp.userCaption = function (uid, name, css) {
		var anchor = Temp.ele('a',false,{
			class:'uc'
		,	'data-uid':uid
		,	href:'../profile.php?id='+uid
		,	style:css||null
		,	target:'_blank'
		});
		anchor.appendChild(document.createTextNode(name));
		return anchor;
	};

/* Todo:
	make work the same with minichat, standard chat, and/or popup window chat
 */
	function Room (tmp) {
		this.index = {
			$:[],
			_:{}
		};
		this.first = this.last = this.msgcount = this.offsetTop = 0;
		this.tmp = tmp;
		this.get = new Poll('GET');
		this.post = new Poll('POST');

		return this;
	};

	Room.prototype.start = function () {
		var T = this, strikes = 0;

		this.get.callback('http://www.rescreatu.com/tagbox2/getChat.php?chat=1',{
			'success' : function (event) {
				if (data.options.limit > 20) { // user wants more messages, so we get a new list based on last message's id
					var last = this.ajax.responseXML.firstChild.lastChild.getAttribute('id') // expects lastChild to be a message
					,	limit = last-(data.options.limit>data.options.threshold&&data.options.threshold>0?data.options.threshold:data.options.limit); // make sure limit does not exceed threshold
					T.get.setEvent('success',procedure);
					console.log(limit, limit>1);
					T.get.callback('http://www.rescreatu.com/tagbox2/getChat.php?chat=1&last='+(limit>1?limit:1)); // we can only start where mid is 2
				}
				else procedure.call(this);
			}
		,	'unexpected' : function () {
				keepAlive.call(this);
			}
		});

		this.post.setEvents({
			'open' : function (event) {
				clearTimeout(data.timer);
				T.tmp.index.$[T.ii].style.color = '#aaa';
				T.tmp.index.$[T.ii].readonly = 'readonly';
				T.tmp.index.$[T.si].setAttribute('data-disabled','true');
				this.ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				if (data.options.autolink == 'true'){
					T.tmp.index.$[T.ii].value = T.tmp.index.$[T.ii].value.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[url=$1]');
				}
				return 'chat=1&message='+encodeURIComponent(T.tmp.index.$[T.ii].value);
			},
			'success' : function (event) {
				T.tmp.index.$[T.ii].style.color = '';
				T.tmp.index.$[T.ii].readonly = '';
				T.tmp.index.$[T.ii].value = '';
				T.tmp.index.$[T.ii].focus();
				T.tmp.index.$[T.si].setAttribute('data-disabled','false');
				T.parse(this,true);
				strikes = 0;
				clearTimeout(data.timer);
				data.timer = setTimeout(loopFunc, data.timeout);
			}
		,	'unexpected' : function () {
				keepAlive.call(this);
			}
		});

		return this;
		function procedure () {
			T.get.setEvent('success',function () { // simplify success event, which we run very often
				T.parse(this);
				strikes = 0;
				clearTimeout(data.timer);
				data.timer = setTimeout(loopFunc, data.timeout);
			});

			T.parse(this);
			strikes = 0;
			clearTimeout(data.timer);
			data.timer = setTimeout(loopFunc, data.timeout);

			loader.style.display = 'none';
			document.body.style.overflow = 'auto';
			document.body.scrollTop = T.offsetTop;
		};
		function loopFunc () {
			T.get.callback('http://www.rescreatu.com/tagbox2/getChat.php?chat=1&last='+T.last);
		};
		function keepAlive () {
			++strikes;
			clearTimeout(data.timer);
			if (strikes == 3) {
				var oldTO = data.timeout;
				data.timeout = data.timeout * 4;
				this.setEvent('success',function(){
					T.get.setEvent('success',function () { // simplify success event, which we run very often
						T.parse(this);
						strikes = 0;
						clearTimeout(data.timer);
						data.timer = setTimeout(loopFunc, data.timeout);
					});
					data.timeout = oldTO;
					strikes = 0;
					clearTimeout(data.timer);
					data.timer = setTimeout(loopFunc, data.timeout);
				});
				if (confirm('Unable to query server, would you like to keep trying?')) data.timer = setTimeout(loopFunc, data.timeout);
			}
			else data.timer = setTimeout(loopFunc, data.timeout);
		};
		//this.post = new Poll('GET');
	}

	Room.prototype.makeRoom = function () {
		this.ri = this.tmp.set('room', Temp.ele('div',false,{
			id:'room'
		}), 'body');
		this.offsetTop = document.getElementById('sidebar').offsetTop;
		this.scrollHeight = this.tmp.index.$[this.ri].scrollHeight;

		return this;
	}

	Room.prototype.makeToolbar = function () {
		var te = false, beText = document.createTextNode('Expand View'), m=10, T=this;

		this.be = this.tmp.set('btn-expand',Temp.ele('span',{
			'cursor':'pointer'
		,	'float':'left'
		,	'font-size':'11px'
		,	'padding':'7px 0 0 15px'
		},false,{
			'mouseout':function () {
				this.style.textDecoration = 'none';
			},
			'mouseover':function () {
				this.style.textDecoration = 'underline';
			},
			'mouseup':function () {
				te = !te;
				if (te) {
					beText.nodeValue = 'Collapse View';
					T.tmp.index.$[T.ri].style.height = 'auto';
					T.tmp.index.$[T.ri].style.overflowY = 'visible';
				}
				else {
					beText.nodeValue = 'Expand View';
					T.tmp.index.$[T.ri].style.height = '';
					T.tmp.index.$[T.ri].style.overflowY = 'scroll';
				}
			}
		}),'header');
		this.tmp.appendTo(this.be,beText);


		this.tmp.set('toolbar',Temp.ele('div',false,{
			id:'toolbar'
		}),'body');


		this.ai = this.tmp.set('btn-alerts',Temp.ele('div',false,{
			id:'btn-alerts'
		,	class:'btn wrap'
		},{
			'mouseup':function(event){
				alert('Alerts not yet worthy');
			}
		}),'toolbar');
		this.tmp.appendTo(this.ai,document.createTextNode('a'));


		this.wi = this.tmp.set('input-wrap',Temp.ele('div',false,{
			class:'wrap space'
		}),'toolbar');


		this.ii = this.tmp.set('input',Temp.ele('textarea',false,{
			class:'input'
		},{
			'keypress':function(event){
				if (event.which === 13) T.post.callback('http://www.rescreatu.com/tagbox2/getChat.php?chat=1&last='+T.last);
			}
		}),'input-wrap');
		this.tmp.index.$[this.ii].focus();


		this.si = this.tmp.set('btn-submit',Temp.ele('div',false,{
			class:'btn wrap space'
		,	'data-disabled':'false'
		},{
			'mouseup' : function (event) {
				if (this.getAttribute('data-disabled') != 'true') T.post.callback('http://www.rescreatu.com/tagbox2/getChat.php?chat=1&last='+T.last);
			}
		}),'toolbar');
		this.tmp.appendTo(this.si, document.createTextNode('send'));

		var plus = 12; // 10 for margins 2 for wrapper border
		plus += this.tmp.index.$[this.ai].offsetWidth;
		plus += this.tmp.index.$[this.si].offsetWidth;
		plus = this.tmp.index.$[this.ri].offsetWidth-plus;
		this.tmp.index.$[this.wi].style.width = plus+'px';
		this.tmp.index.$[this.ii].style.width = (plus-8)+'px'; // 8 for padding

		return this;
	};

	Room.prototype.keepClean = function () {
		if (data.options.threshold < 1) return;
		var limit = this.last-data.options.threshold;
		if (limit > this.first) for (; this.first < limit; ++this.first) this.tmp.index.$[this.ri].removeChild(this.tmp.index.$[this.ri].firstChild);
		//if (data.options.threshold > 0 && this.msgcount > data.options.threshold) for (; this.msgcount > data.options.threshold; --this.msgcount) this.tmp.index.$[this.ri].removeChild(this.tmp.index.$[this.ri].firstChild);
	};

	Room.prototype.checkScroll = function () {
		var diff = this.tmp.index.$[this.ri].scrollHeight-this.scrollHeight; // difference of room scrollHeight and inital scrollHeight
		return !!(diff<=this.tmp.index.$[this.ri].scrollTop); // true if difference is the same as scrollTop (or greater than just incase), meaning it's scrolled to the bottom
	};

	Room.prototype.setScroll = function () {
		return this.tmp.index.$[this.ri].scrollTop = this.tmp.index.$[this.ri].scrollHeight-this.scrollHeight;
	};

	Room.prototype.addRow = function (usr, mid, text) {
		var row = Temp.ele('div',false,{'data-mid':mid})
		,	msg = Temp.ele('span', row);

/* NEEDS ATTENTION: innerHTML is bad practice and has potential security flaws, but is our best option with the current system */
		msg.innerHTML = text; // it puts a lot a of trust in contents of messages :(

		row.appendChild(usr);
		row.appendChild(document.createTextNode(': '));
		row.appendChild(msg);

		this.tmp.index.$[this.ri].appendChild(row);
		this.last = mid;
		++this.msgcount;
	};

	Room.prototype.sysMessage = function (mid, text) {
		var user = Temp.ele('span',{'color':'#f00','fontWeight':'bold'});
		user.appendChild(document.createTextNode('System message'));
		this.addRow(user, mid, text);
	};

/* following function needs optimization */
	Room.prototype.parse = function (obj,forceScroll) {
		var i, mid, uid, user, scroll, messages = obj.ajax.responseXML.getElementsByTagName('message');
		if (messages.length < 1) return;
		this.first = this.first||messages[0].getAttribute('id');
		scroll = forceScroll||this.checkScroll(); // return true if at bottom of scroll area
		for (i = 0; i < messages.length; ++i) {
			mid = messages[i].getAttribute('id');
			if ((uid = Room.parseUser(messages[i].childNodes[0].textContent)) === false) {
				if (data.playAudio===null) data.playAudio = Audio.test(messages[i].childNodes[1].textContent); // set alerts by only regexp for system message
				this.sysMessage(mid, messages[i].childNodes[1].textContent);
			}
			else {
				if (data.playAudio===null) { // only begin to set sound if not already set
					if (typeof data.usersound[uid] == 'number') data.playAudio = data.usersound[uid]; // set by user id posting
					else if (typeof data.usersound[data.userlist[uid][0].toLowerCase()] == 'number') data.playAudio = data.usersound[data.userlist[uid][0].toLowerCase()]; // set by username posting
					else data.playAudio = Audio.test(messages[i].childNodes[1].textContent); // set by regexp
				};
				this.addRow(Temp.userCaption(uid,data.userlist[uid][0],data.userlist[uid][1]), mid, messages[i].childNodes[1].textContent);
			}
		};
		this.keepClean();
		if (scroll) this.setScroll(); // only scroll to the bottom if were at the bottom
		if (data.playAudio !== null && data.options.audio !== 'false') {
			Audio.play(data.playAudio);
			data.playAudio = null;
		}
	};

/*parsing old html pseudocode style to extract id, username, and color */
	Room.parseUser = function (us) {
		if (/system message/i.test(us)) return false; // return false if username is system message (needs work)
		var	uid = us.substring(49, us.indexOf('" target="_blank"'));
		if (!data.userlist[uid]) { // only if we haven't seen them yet
			var	un = us.substring(us.indexOf('<font color=')+12)
			,	os = un.indexOf('>')
			,	css = un.substring(0,os);
			un = un.substring(++os);
			un = un.substring(0,un.indexOf('<'));
			data.userlist[uid] = [un,(css=='black'?null:'color:'+css+';')]; // saves username color/css in an array under user id
			//console.log(uid,un,css);
		};
		return uid; // returns user id
	};

	function inArray(arr,val) {
		for (var i = 0; i < arr.length; ++i) if (arr[i] === val) return true;
		return false;
	}

	function isArray(arr) {
		return Object.prototype.toString.call(arr) === "[object Array]";
	}
})(window);