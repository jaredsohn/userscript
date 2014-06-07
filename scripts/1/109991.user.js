// ==UserScript==
// @name          4Chan X Reply Notifier
// @namespace     Madsbuvi
// @version       0.1
// @description   Script that plays a sound when you've been replied to on 4chan.
// @license       MIT; http://en.wikipedia.org/wiki/MIT_license
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// @resource      GMwavaudio https://raw.github.com/madsbuvi/4chanreplynotifier/master/notify.wav
// ==/UserScript=='


function main() {
	/*
	 *	One or more libraries copied from the internet, because some browsers won't accept @require inclusions.
	 */
	 
	/*
	 *  jQuery
	 */

	/*
	 * @name jQuery.titleAlert
	 * @projectDescription Show alert message in the browser title bar
	 * @author Jonatan Heyman | http://heyman.info
	 * @version 0.7.0
	 * @license MIT License
	 *
	 * @id jQuery.titleAlert
	 * @param {String} text The text that should be flashed in the browser title
	 * @param {Object} settings Optional set of settings.
	 *	 @option {Number} interval The flashing interval in milliseconds (default: 500).
	 *	 @option {Number} originalTitleInterval Time in milliseconds that the original title is diplayed for. If null the time is the same as interval (default: null).
	 *	 @option {Number} duration The total lenght of the flashing before it is automatically stopped. Zero means infinite (default: 0).
	 *	 @option {Boolean} stopOnFocus If true, the flashing will stop when the window gets focus (default: true).
	 *   @option {Boolean} stopOnMouseMove If true, the flashing will stop when the browser window recieves a mousemove event. (default:false).
	 *	 @option {Boolean} requireBlur Experimental. If true, the call will be ignored unless the window is out of focus (default: false).
	 *                                 Known issues: Firefox doesn't recognize tab switching as blur, and there are some minor IE problems as well.
	 *
	 * @example $.titleAlert("Hello World!", {requireBlur:true, stopOnFocus:true, duration:10000, interval:500});
	 * @desc Flash title bar with text "Hello World!", if the window doesn't have focus, for 10 seconds or until window gets focused, with an interval of 500ms
	 *
	 * Rita: minor edits to $.titleAlert() and $.titleAlert.stop();
	 */
	;(function($){


		$.titleAlert = function(text, settings) {
			// check if it currently flashing something, if so reset it
			// Rita: added a small hack to keep this from resetting newReplies
			if ($.titleAlert._running){
				var temp = newReplies;
				$.titleAlert.stop();
				newReplies = temp;
			}

			// override default settings with specified settings
			$.titleAlert._settings = settings = $.extend( {}, $.titleAlert.defaults, settings);

			// if it's required that the window doesn't have focus, and it has, just return
			if (settings.requireBlur && $.titleAlert.hasFocus)
				return;

			// originalTitleInterval defaults to interval if not set
			settings.originalTitleInterval = settings.originalTitleInterval || settings.interval;

			$.titleAlert._running = true;
			$.titleAlert._initialText = document.title;
			document.title = text;
			var showingAlertTitle = true;
			var switchTitle = function() {
				// WTF! Sometimes Internet Explorer 6 calls the interval function an extra time!
								//>2011
								//>Internet Explorer
								//>2011
								//>Internet Explorer 6
								//Umexcusemewtfareyoudoing.fullHD.mkv
				if (!$.titleAlert._running)
					return;

				showingAlertTitle = !showingAlertTitle;
				document.title = (showingAlertTitle ? text : $.titleAlert._initialText);
				$.titleAlert._intervalToken = setTimeout(switchTitle, (showingAlertTitle ? settings.interval : settings.originalTitleInterval));
			}
			$.titleAlert._intervalToken = setTimeout(switchTitle, settings.interval);

			if (settings.stopOnMouseMove) {
				$(document).mousemove(function(event) {
					$(this).unbind(event);
					$.titleAlert.stop();
				});
			}

			// check if a duration is specified
			if (settings.duration > 0) {
				$.titleAlert._timeoutToken = setTimeout(function() {
					$.titleAlert.stop();
				}, settings.duration);
			}
		};

		// default settings
		$.titleAlert.defaults = {
			interval: 500,
			originalTitleInterval: null,
			duration:0,
			stopOnFocus: true,
			requireBlur: false,
			stopOnMouseMove: false
		};

		// stop current title flash
		// Rita: added newReplies = 0 to reset new replies count together with the alert.
		$.titleAlert.stop = function() {
			newReplies = 0;
			clearTimeout($.titleAlert._intervalToken);
			clearTimeout($.titleAlert._timeoutToken);
			document.title = $.titleAlert._initialText;

			$.titleAlert._timeoutToken = null;
			$.titleAlert._intervalToken = null;
			$.titleAlert._initialText = null;
			$.titleAlert._running = false;
			$.titleAlert._settings = null;
		}

		$.titleAlert.hasFocus = true;
		$.titleAlert._running = false;
		$.titleAlert._intervalToken = null;
		$.titleAlert._timeoutToken = null;
		$.titleAlert._initialText = null;
		$.titleAlert._settings = null;


		$.titleAlert._focus = function () {
			$.titleAlert.hasFocus = true;

			if ($.titleAlert._running && $.titleAlert._settings.stopOnFocus) {
				var initialText = $.titleAlert._initialText;
				$.titleAlert.stop();

				// ugly hack because of a bug in Chrome which causes a change of document.title immediately after tab switch
				// to have no effect on the browser title
				setTimeout(function() {
					if ($.titleAlert._running)
						return;
					document.title = ".";
					document.title = initialText;
				}, 1000);
			}
		};
		$.titleAlert._blur = function () {
			$.titleAlert.hasFocus = false;
		};

		// bind focus and blur event handlers
		$(window).bind("focus", $.titleAlert._focus);
		$(window).bind("blur", $.titleAlert._blur);
	})(jQuery);



	/*
	 *	End of libraries copied from the internet.
	 */
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
    var mapSize = 100;
    var map = new Array(mapSize);
    var set = [];
	var newReplies = 0;
	var lastPostExamined = 0;
	var au = document.getElementById("GMwavaudio");
	var rrn_alarm;
	var $jq = jQuery.noConflict();

	/*
	 *  use map as an array of linked lists to serve as an extremely simple hashmap implementation
	 */
    function insert(postID){
        if(get(postID)!=null)return;
        var ID = parseInt(""+postID);
        //linked list structure
        var newNode = {
            next: null,
            ID: ID
        };
        
        //extremely simple hash
        var hash = ID%mapSize;
        
        //find last node and insert
        var node = map[hash];
        if(node == null){
            map[hash] = newNode;
        }
        else{
            while(node.next!=null)node=node.next;
            node.next = newNode;
        }
    }
    function get(postID){
        var ID = parseInt(""+postID);
        
        //extremely simple hash
        var hash = ID%mapSize;
        
        //iterate over nodes and compare
        var node = map[hash];
        while(node!=null){
            if(node.ID == ID)return node;
            node = node.next;
        }
        return null;
    }
    function persist(postID){
        set = JSON.parse(localStorage['rrn_posts']);
        if(set.length<500)set[set.length]=postID;
        else{
            for(var i=0;i<499;i++)set[i]=set[i+1];
            set[499]=postID;
        }
        localStorage['rrn_posts']=JSON.stringify(set)
    }
    
    /*
     *  Load all persisted posts
     */
    if(localStorage['rrn_posts']==undefined)localStorage['rrn_posts']=JSON.stringify(set);
    set = JSON.parse(localStorage['rrn_posts']);
    for(var i = 0; i<set.length; i++)insert(set[i]);

	/*	Load settings if present, else use default value.*/
	rrn_alarm = GM_getValue('rrn_alarm',true);

	/*	Create html element for settings	*/
	var dialog = document.createElement('div');
	dialog.innerHTML = '\
	<div>\
	  <label>Play sound<input id="rrn_alarm" type="checkbox" class="rrn_setting"></label><br>\
	</div>';
	dialog.id = "rrn_settings";
	GM_addStyle("\
	#rrn_settings { color: inherit; text-align: right; font-size:16px; z-index:1; }\
	#rrn_settings.reply > div:first-child { padding: 10px 10px 0 10px }\
	#rrn_settings.reply > div:last-child { padding: 0 10px 10px 10px }\
	#rrn_settings.reply > div:not(:first-child):not(:last-child) { padding: 0 10px 0 10px }\
	")
	document.body.appendChild(dialog);
	var settings = document.getElementsByClassName("rrn_setting");
	settings[0].addEventListener('change', function() { setAlarm() }, true);
	settings[0].checked=rrn_alarm;

	/* Causes tab to start flashing a new reply notice */
	function alertTab(){
		jQuery.titleAlert("New replies! ("+newReplies+")", {
			requireBlur:false,
			stopOnFocus:true,
			stopOnMouseMove:true,
			duration:0,
			interval:700
		});
	}


	function setAlarm(){
		rrn_alarm = document.getElementById("rrn_alarm").checked;
		GM_setValue('rrn_alarm',rrn_alarm);
	}
	
	function navi(e){
	    insert(e.originalEvent.detail.postID);
	    persist(e.originalEvent.detail.postID);
	}
	
	function heyListen(){
        $jq("#qr")
        			.off("QRPostSuccessful.namesync", navi)
        			.on("QRPostSuccessful.namesync", navi);
	}
	
	if ($jq("#qr").length) heyListen();
    document.body.addEventListener('DOMNodeInserted', function(e) {
    		if (e.target.nodeName=='DIV') {
    			if (e.target.id == "qr")
    				heyListen();
    		}
    	}, true);

	function repeatInfinitely(){
        set = JSON.parse(localStorage['rrn_posts']);
        for(var i = 0; i<set.length; i++)insert(set[i]);
		var posts = document.getElementsByClassName("postMessage");
		var alertedonce = 0;
		for(var a=0;a<posts.length;a++){
			var replyelement = posts[a];

			/*	Skip if we've already checked it or it's a post 4chanX inlined	*/
			var postNumber = parseInt(replyelement.id.substring(1));
			if(""+postNumber=="NaN")continue; /* shouldn't happen */
			if(postNumber<=lastPostExamined)continue;
			if(postNumber>1000000000)continue; /* ugly hack to prevent a bug with Mayhem's 4chan x */
			lastPostExamined = postNumber;
			/*	Get every quote in post	*/
			var quotes = replyelement.getElementsByClassName("quotelink");

			/* For every quote	*/
			for(var b=0;b<quotes.length;b++){
				/*	See if quoted post number is you */
				var breakpoint = quotes[b].innerHTML.lastIndexOf('&');
				var quote = quotes[b].innerHTML.substring(8,breakpoint>8?breakpoint:quotes[b].innerHTML.length);
				if(get(quote)!=null){
    				if(rrn_alarm&&!alertedonce)au.play();
    				alertedonce=1;
    				newReplies++;
    				alertTab();
    				break;
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
		var a = document.getElementsByClassName("postMessage");
		//alert(a.length);
		var intern = 0;
		for(var b=0;b<a.length;b++){
			var c = a[b];
			var postNumber = parseInt(c.id.substring(1));
			if(postNumber>1000000000)continue;/* ugly hack to prevent a bug with Mayhem's 4chan x */
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
	ausrc = 'https://raw.github.com/madsbuvi/4chanreplynotifier/master/notify.wav';
}

au = document.createElement('audio');
au.setAttribute('src', ausrc);
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);

/* 	The following code is required because not all browsers can @require and we want jquery	*/
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
addJQuery(main);
