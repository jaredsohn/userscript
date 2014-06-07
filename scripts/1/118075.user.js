// ==UserScript==
// @name          Ponychan Reply Notifier
// @namespace     Anon.
// @description   Script that plays a sound when you've been replied to on ponychan.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http://www.ponychan.net/*
// @resource      GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript=='

function main() {
	/*
	 *	Some methods to get some dandy functions from the greasemonkey api without greasemonkey.
	 */
	if (typeof GM_deleteValue == 'undefined') {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
			return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_log = function(message) {
			console.log(message);
		}

		GM_registerMenuCommand = function(name, funk) {
			/* TODO */
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
	/*
	 *	End of chrome methods
	 */
	/*
	 *	Variable Declarations
	 */
	var newReplies = 0;
	var lastPostExamined = 0;
	var au = document.getElementById("GMwavaudio");
	var rrn_regexp;
	var rrn_alarm;
	var namefield;
	var tripcode;

	/*	Load settings if present, else use default value.*/
	rrn_alarm = GM_getValue('rrn_alarm_ponychan',true);
	rrn_regexp = GM_getValue('rrn_regexp_ponychan',false);
	namefield = GM_getValue('rrn_namefield_ponychan','Type your pre-tripcode namefield here');
	tripcode = GM_getValue('rrn_tripcode_ponychan','Type your tripcode here (NOT the password!)');

	/*	Create html element for settings	*/
	var dialog = document.createElement('div');
	dialog.innerHTML = '\
	<div>\
	  <label>Play sound<input id="rrn_alarm" type="checkbox" class="rrn_setting"></label><label>Regexp<input id="rrn_regexp" type="checkbox" class="rrn_setting"></label><br>\
	  <span>Name</span> <input id="rrn_namefield" class="rrn_setting"><br>\
	  <span>Tripcode</span> <input id="rrn_tripcode" class="rrn_setting"><br>\
	</div>';
	dialog.id = "rrn_settings";
	GM_addStyle("\
	#rrn_settings { color: inherit; text-align: right; font-size:16px; z-index:1; }\
	#rrn_settings.reply > div:first-child { padding: 10px 10px 0 10px }\
	#rrn_settings.reply > div:last-child { padding: 0 10px 10px 10px }\
	#rrn_settings.reply > div:not(:first-child):not(:last-child) { padding: 0 10px 0 10px }\
	")
		document.body.appendChild(dialog);
	var settings = document.body.getElementsByClassName("rrn_setting");

	settings[0].addEventListener('change', function() { setAlarm() }, true);
	settings[0].checked=rrn_alarm;
	settings[1].addEventListener('change', function() { setRegexp() }, true);
	settings[1].checked=rrn_regexp;
	settings[2].addEventListener('keypress', function(event) { set() }, true);
	settings[2].value=namefield;
	settings[3].addEventListener('keypress', function(event) { set() }, true);
	settings[3].value=tripcode;

	/* Causes tab to start flashing a new reply notice */
	function alertTab(){
	}

	/*	Set methods	*/
	function setRegexp(){
		rrn_regexp = document.getElementById("rrn_regexp").checked;
		GM_setValue('rrn_regexp_ponychan',rrn_regexp);
	}

	function setAlarm(){
		rrn_alarm = document.getElementById("rrn_alarm").checked;
		GM_setValue('rrn_alarm_ponychan',rrn_alarm);
	}

	function set(){
		namefield = document.getElementById("rrn_namefield").value;
		GM_setValue('rrn_namefield_ponychan', namefield);
		tripcode = document.getElementById("rrn_tripcode").value;
		GM_setValue('rrn_tripcode_ponychan', tripcode);
	}

	function repeatInfinitely(){
		/*	Get every table	element (replies are table elements)	*/
		var posts = document.getElementsByTagName("table");
		var alertedonce = 0;
		/*	For every table elements	*/
		for(var a_rrn=0;a_rrn<posts.length;a_rrn++){

			var replyelement = posts[a_rrn].getElementsByClassName("reply");
			if(!replyelement.length)continue; /*	This wasn't a post, skip.	*/

			/*	Skip if we've already checked it	*/
			var postNumber = parseInt(replyelement[0].id.substring(5));

			if(""+postNumber=="NaN")continue;
			if(postNumber<=lastPostExamined)continue;
			lastPostExamined = postNumber;

			/*	Get every a tag in post	*/
			var quotes = posts[a_rrn].getElementsByTagName("a");
			var foundOne = 0;
			/* For every a tag	*/
			for(var b_rrn=0;b_rrn<quotes.length&&!foundOne;b_rrn++){

				/*	Find quoted post if it's a quote	*/
				if(quotes[b_rrn].innerHTML.length<9)continue;
				var quote = quotes[b_rrn].innerHTML.substring(8);
				/*
					If the <a ..>  tag belongs to a quote, the inner html will look like "&gt;&gt;POSTNUMBER"
					And i haven't seen anything that should falsely cause a hit in the following call when
					it's not a quote.
				*/
				var quotedpost = document.getElementById("reply"+quote);

				if(!quotedpost)continue;	/*	post was in another thread or it was not a quote	*/

				/*
				 *	Extract tripcode/name and match exact or regexp.
				 */
				var quotedtripelm = quotedpost.getElementsByClassName("postertrip");
				var quotedtrip = "";
				if(quotedtripelm.length)quotedtrip = ""+quotedtripelm[0].innerHTML;
				var quotednameelm = quotedpost.getElementsByClassName("postername");
				var quotedname = "";
				if(quotednameelm.length)quotedname = ""+quotednameelm[0].innerHTML;

				if(rrn_regexp){
					/*	match by regexp	*/
					if(quotedtrip.match(".*"+tripcode+".*")){
						if(quotedname.match(".*"+namefield+".*"))
						{
							if(rrn_alarm&&!alertedonce)au.play();
							alertedonce=1;
							newReplies++;
							alertTab();
							foundOne=1;
						}
					}
				}
				else{
					/*	match string	*/
					if(quotedtrip.indexOf(tripcode)>=0){
						if(quotedname.indexOf(namefield)>=0){
							if(rrn_alarm&&!alertedonce)au.play();
							alertedonce=1;
							newReplies++;
							alertTab();
							foundOne=1;
						}
					}
				}
			}
		}
		/*
		 *	Check for new posts every half second.
		 *	We can afford this since we're reading
		 *	4chan X/Y/+'s auto-update,
		 *	not refreshing from 4chan.org
		 */
		setTimeout(function(){repeatInfinitely();},500);
	}



	function firstload(){

		/*	let's NOT play a sound for every time you've already been replied if you have to refresh the thread	*/
		var a_rrn = document.getElementsByTagName("table");
		var intern = 0;
		for(var b_rrn=0;b_rrn<a_rrn.length;b_rrn++){
			var c_rrn = a_rrn[b_rrn].getElementsByClassName("reply");
			if(!c_rrn.length)continue;
			var postNumber = parseInt(c_rrn[0].id.substring(5));
			if(postNumber>lastPostExamined)lastPostExamined=postNumber;
		}
		repeatInfinitely();
	}

	firstload();

}/*end of main()*/

var ausrc;
var au;
/*
 *	Strangely, on firefox the sound would stop playing after a while if
 *	ausrc was set directly instead of with GM_getResourceURL(resource). I don't know if
 *	this is a bug with firefox or greasemonkey.
 */
try{
	/*	greasemonkey	*/
	var oggB64 = GM_getResourceURL("GMwavaudio");
	ausrc = 'data:audio/wav;base64,'+oggB64.split('data:application/octet-stream;base64,')[1];
}
catch(e){
	/*	everything else	*/
	ausrc = 'http://gmflowplayer.googlecode.com/files/notify.wav';
}


au = document.createElement('audio');
au.setAttribute('src', ausrc);
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);

main();