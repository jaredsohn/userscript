// ==UserScript==
// @name         twitter friend name helper
// @description  Show list of friend names when you type "@" or "D".
// @version      0.2.2
// @date         2008-11-21
// @include      http://twitter.com/home*
// ==/UserScript==
// Changes
// 0.1.0 2007-04-15
// 0.1.1 2007-04-17 Code optimized.
// 0.2.0 2008-08-15 Retain compatibility with firefox3.(unsafeWindow is no longer available)
// 0.2.1 2008-08-19 Fixed bug where cursor key doesn't work.
// 0.2.2 2008-11-21 Oops, Scriptaculous had no longer existed on Twitter server..

// define css
GM_addStyle(<><![CDATA[
	div.friend_list {
		margin: 0; padding: 0; max-height: 20em; overflow-y: scroll;
		background: #fff;
	}
	div.friend_list ul {
		margin: 0; padding: 0; text-align: left;
	}
	div.friend_list ul li {
		padding: 0.4em; font-size: 1.2em; color: #000;
		border: 1px solid #999; border-style: none solid solid solid; 
	}
	div.friend_list ul li.selected {
		background: #ffc;
	}
]]></>);


(function(){
	var gm_script = function() {
		// functions ---------------------------
		function addScriptRef(url) {
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = url;
			document.getElementsByTagName("head")[0].appendChild(s);
		}

		function waitForLoadLibs() {
			// libs loaded?
			if( typeof Prototype != 'undefined' 
					&& typeof Effect != 'undefined' 
					&& typeof Autocompleter != 'undefined')
			{
				// call api 
				new Ajax.Request(
					'/statuses/friends.json?lite=true',
					{ asynchronous:true, onSuccess: onLoadFriends });
			} else {
				setTimeout( waitForLoadLibs, 100 );
			}
		}

		function onLoadFriends(transport) {
			// extract names from response
			var friends = eval( transport.responseText );
			friends = friends.sort(function(a,b){return (a.screen_name == b.screen_name) ? 0 : (a.screen_name < b.screen_name) ? -1 : 1;})
			var names = [];
			for( var i = 0; i < friends.length; i++ ) {
				names.push( "@" + friends[i].screen_name + " " );
				names.push( "D " + friends[i].screen_name + " " );
			}

			// override KEY_UP handler
			Autocompleter.Base.prototype.markPrevious = function() {
				if(this.index > 0) this.index--
				else this.index = this.entryCount-1;
				//this.getEntry(this.index).scrollIntoView(true);
				this.getEntry(this.index).scrollIntoView(false);
			};

			// prepare auto-complete list containers
			var list = document.createElement("div");
			list.id = "friend_list";
			list.style.display = "none";
			list.className = "friend_list";
			document.body.appendChild( list );

			// instantiate Autocompleter
			new Autocompleter.Local('status', 'friend_list', names, {});
		}
		// add ref to script.aculo.us-controls-lib
		addScriptRef("http://script.aculo.us/prototype.js");
		addScriptRef("http://script.aculo.us/effects.js");
		addScriptRef("http://script.aculo.us/controls.js");
		
		// and wait asynchronously
		waitForLoadLibs();
	};
	
	// append gm_script as a script element.
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = gm_script.toSource() + '();';
	document.getElementsByTagName('head')[0].appendChild(script);
})();
