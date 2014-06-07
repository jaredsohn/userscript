// ==UserScript==
// @name		MHChat
// @namespace   http://fluidapp.com
// @description Does STILL EVEN MORE magic.
// @include	 *
// @author	  darkcooger, miah
// ==/UserScript==

	var versiontag = 33;
	var vinfo = new Object();
	vinfo[33] = new Array("Fixed total participant count update bug",
						  "Fixed an issue where chat did not correctly rejoin rooms on startup",
						  "Modified AFK time to show hours/minutes when appropriate",
						  "Capitalization is preserved in highlights");
	vinfo[32] = new Array("Added AFK status text",
						  "Fixed a bug that would not allow auto-AFK to be unset manually",
						  "Added change logging",
						  "Modified help to autoscroll",
						  "AFK responses appear in the room that caused them",
						  "Clicking on users in the userlist adds an @-message to that user");
	
	if($("___VERSIONCHECK") != null)
	{
		var vck = $("___VERSIONCHECK");
		if(ChatServer.overrideVersion < versiontag)
		{
			var lnk = "<a href=\"" + vck.getAttribute("ssrc") + "\">" + vck.getAttribute("ssrc") + "</a>";
			var nfo = "<span style=\"text-decoration: underline; cursor: pointer;\" onClick=\"$('__CHANGES').style.display='';\">Click here</span> to see changes.";
			
			var changes = "<div style=\"display: none; text-align: left; background-color: #333;\" id=\"__CHANGES\">==================================================";
			for(var version in vinfo)
			{
				if(version <= ChatServer.overrideVersion)
					continue;

				changes += "<br/>Version r" + version + ":";
				for(var i = 0, j = vinfo[version].length; i < j; i++)
					changes += "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⚫ " + vinfo[version][i];
			}
			changes += "<br/>==================================================</div>";
			ChatServer.currentRoom.chatLog.addAlert("<br/>You are running version " + ChatServer.overrideVersion + " of the script.  Version " + versiontag + " is available from " + lnk + ".  " + nfo + changes + "<br/><br/>");
			if(window.fluid)
			{				
				window.fluid.showGrowlNotification({
					title: "MacHeist Chat", 
					description: "You are running version " + ChatServer.overrideVersion + " of the script.  Version " + versiontag + " is available from " + vck.getAttribute("ssrc") + ".",
					priority: 0, 
					sticky: false,
					identifier: "mhchatj00",
					onclick: window.fluid.activate,
					icon: null
				});
			}
		}
		document.body.removeChild(vck);
		throw(0);
	}
	ChatServer.overrideVersion = versiontag;

	var versionCheckScript = document.createElement("script");
	versionCheckScript.setAttribute("type", "text/javascript");
	versionCheckScript.setAttribute("src", "http://darkcooger.net/mhchat/mhchat.user.js?t=" + (new Date()).getTime());
	versionCheckScript.setAttribute("id", "___VERSIONCHECK");
	versionCheckScript.setAttribute("ssrc", "http://darkcooger.net/mhchat/mhchat.user.js");
	document.body.appendChild(versionCheckScript);

    poorMansAjax = function(page,query) {
        var now = (new Date()).getTime();
        var minutesSinceLastAction = Math.floor((now - __AFKHOLDDOWN) / 60000.0);
        
        if((ChatPrefs.autoafk != 0) && (minutesSinceLastAction >= ChatPrefs.autoafk) && (__AFKTIME == null))
            setAFK("Idle triggred after "+minutesSinceLastAction+" minutes");
            
        var script = document.createElement('script');
        script.src = chatserver+page+'?r='+now+'&'+query;
        document.body.appendChild(script);
        setTimeout(function(){ document.body.removeChild(script) },10000); //clean up old script tags
    }

	imgExpand = function(imgID)
	{	
		var img = $(imgID);	
		var div = $("imgDiv_" + imgID);
		if(div != null)
		{
			img.style.display = 'inline';
			div.parentNode.removeChild(div);
			return;
		}

		div = document.createElement("div");
		div.setAttribute("class", "img");
		div.setAttribute("id", "imgDiv_" + imgID);
		var imgEl = document.createElement("img");
		imgEl.setAttribute("src", img.href);
		div.appendChild(imgEl);
		$(div).addEvent("click", function() { img.style.display = ''; img.parentNode.removeChild(div); });
		img.parentNode.insertBefore(div, img.nextSibling);
		img.style.display = 'none';
	}
	
	linkExpand = function(linkID)
	{
		if(!ChatPrefs.inlineLinks)
			return true;

		var link = $(linkID);
		var container = $("linkDiv_" + linkID);
		if(container != null)
			return false;

		var urlBits = link.href.match(/youtube\.com\/.*v=([^&#]*)/);
		if(urlBits != null)
		{
			container = document.createElement("span");
			container.setAttribute("style", "display: inline-block; position: relative; min-height: 344px; min-width: 425px;");
			container.setAttribute("id", "linkDiv_" + linkID);
			
			var vid = urlBits[1];
			var yt = "<object width=\"425\" height=\"344\"><param name=\"movie\" value=\"http://www.youtube.com/v/" + vid + "&hl=en&fs=1&\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/" + vid + "&hl=en&fs=1&\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed></object>";
			container.innerHTML = yt;
			//container.addEvent("click", function() { link.style.display = ''; link.parentNode.removeChild(container); });
		}
		else
		{
			container = document.createElement("div");
			container.setAttribute("style", "position: relative; width: 100%; max-height: 500px; height: 500px;");
			container.setAttribute("id", "linkDiv_" + linkID);
			
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "linkiframe_" + linkID);
			iframe.setAttribute("src", link.href);
			iframe.setAttribute("style", "width: 100%; max-height: 500px; height: 100%;");
			container.appendChild(iframe);
		}
		
		var close = document.createElement("div");
		close.setAttribute("style", "position: absolute; top: 0; right: -40px; width: 32px; height: 32px; background-image: url(http://darkcooger.net/mhchat/close.png); cursor: pointer;");
		close.addEvent("click", function() { link.style.display = ''; link.parentNode.removeChild(container); });
		container.appendChild(close);
		var open = document.createElement("a");
		open.setAttribute("style", "display: block; position: absolute; top: 32px; right: -40px; width: 32px; height: 32px; background-image: url(http://darkcooger.net/mhchat/open.png); cursor: pointer;");
		open.setAttribute("href", link.href);
		open.setAttribute("target", "_blank");
		open.addEvent("click", function() { link.style.display = ''; link.parentNode.removeChild(container); });
		container.appendChild(open);
		
		link.parentNode.insertBefore(container, link.nextSibling);
		link.style.display = 'none';
		link.parentNode.style.float = "none";
		
		return false;
	}
	
    formatText = function(text) {
        var re;
		var t = (new Date()).getTime();
        
        text = superTextile(text);

		re = new RegExp(/(^|\s)(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\-\.~]*(\?\S+)?)?)?)/g);
		text = text.replace(re, function(match, pre, url, three,four,five,six,seven, offset)
		{
			var id = "link_" + t + "_" + offset;
			return pre + "<a id=\"" + id + "\" href=\"" + url + "\" target=\"_blank\" onClick=\"return linkExpand('" + id + "');\">" + url + "</a>";
		});
        
        re = new RegExp('(^|\\s)(@?)('+my_username.toLowerCase()+')\\b', 'ig');
        text = text.replace(re, '$1<span class="you">$2$3</span>');
        
        if(!ChatPrefs.disableHighlights) {
            for(var i = 0; i<__CUSTOMHIGHLIGHTS.length; i++) {
                temp = __CUSTOMHIGHLIGHTS[i];
                re = new RegExp('(^|\\s)(@?)('+temp.toLowerCase()+')\\b', 'ig');
                text = text.replace(re, '$1<span class="you">$2$3</span>');
            }
        }

        //formatting[] comes from index.php
        for(var i = 0; i<formatting.length; i++) {
            re = new RegExp(formatting[i].s, 'ig');
            text = text.replace(re, formatting[i].r);
        }
        
        /* emoji webcodes http://creation.mb.softbank.jp/web/web_pic_01.html */
        re = new RegExp(/\$([GEFOPQ].)/g);
        text = text.replace(re, function(s) {
            var prefix = emojiPrefixes(s.substr(1,1));
            var item = s.charCodeAt(2)-32;
            var hex = item.toString(16);
            hex = Array(3-hex.length).join('0')+hex;
            return '<img src="http://www.macheist.com/static/common/emoji-20px/'+prefix+hex.toUpperCase()+'.png" title="'+s+'" class="smiley">';
        });
                
        return text;
    }

	superTextile = function(s)
	{
		if(s == null)
			return "";

		var t = (new Date()).getTime();

	 	var Replacements = Array();
		// Images
		if(ChatPrefs.showImages)
			Replacements.push([ /!(https?:\/\/[^!]*)!/g, "<div class=\"img\"><img src=\"$1\" /></div>" ]);
		else
			Replacements.push([ /!(https?:\/\/[^!]*)!/g, function(match, url, offset)
			{
				var id = "img_" + t + "_" + offset;
				return "<a style=\"display: inline;\" id=\"" + id + "\" href=\"" + url + "\" onClick=\"imgExpand('" + id + "'); return false\">" + url + "</a>";
			}]);

		// Named links
		Replacements.push([ /\"([^\"]*)\":(.*?)[,.?!;]?(\s|\<|$)/g, function(match, name, url, after, offset)//"<a href=\"$2\" target=\"blank\">$1</a>$3" ]);
		{
			var id = "link_" + t + "_" + offset;
			return "<a id=\"" + id + "\" href=\"" + url + "\" target=\"_blank\" onClick=\"return linkExpand('" + id + "');\">" + name + "</a>" + after;
		}]);

		Replacements.push([ /([.,;:\s])_([^_]*)_([.,;:\s])/g, "$1<em>$2</em>$3" ]);
		Replacements.push([ /\*([^\*]*)\*/g, "<strong>$1</strong>" ]);
		Replacements.push([ /([.,;:\s])-([^-]*)-([.,;:\s])/g, "$1<del>$2</del>$3" ]);
		Replacements.push([ /([.,;:\s])\+([^\+]*)\+([.,;:\s])/g, "$1<ins>$2</ins>$3" ]);
		Replacements.push([ /\^([^\^]*)\^/g, "<sup>$1</sup>" ]);
		Replacements.push([ /\~([^\~]*)\~/g, "<sub>$1</sub>" ]);
		Replacements.push([ /@([^@]*)@/g, "<code>$1</code>" ]);
		Replacements.push([ /(\$[EFGOPQ])\&amp;/g, "$1&" ]);
		Replacements.push([ /(\$[EFGOPQ])\&lt;/g, "$1<" ]);
		Replacements.push([ /(\$[EFGOPQ])\&gt;/g, "$1>" ]);

		for(var i = 0, count = Replacements.length; i < count; i++)
			s = s.replace(Replacements[i][0], Replacements[i][1]);

		return s;
	}
	
	var _isBlurred = false;
	var _unreadTotal = 0;
	var _joinpartTotal = 0;
	var _unreadMine = 0;
	
	var __IGNOREDUSERS = Array();
	var __STALKEDUSERS = Array();
    var __CUSTOMHIGHLIGHTS = Array();
	var __ADDLINEMSG = Array();
	var __HISTORY = new Object();
	var __OTXT = new Object();
	var __ITXT = new Object();
	
	var __AFKTIME = null;
    var __AFKHOLDDOWN = (new Date()).getTime();
	var __AFKMSG = null;
	var __AFKLAST = null;
    var __VERSIONLAST = null;

	/* * /
	formatting = [{'s': ':)'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Smile.png" class="smiley">'},
                  {'s': '<3'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Heart.png" class="smiley">'},
                  {'s': ';)'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Wink.png" class="smiley">'},
                  {'s': ':('.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Frown.png" class="smiley">'},
                  {'s': ':o'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Gasp.png" class="smiley">'},
                  {'s': ':d'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Laugh.png" class="smiley">'},
                  {'s': '^^'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Grin.png" class="smiley">'},
                  {'s': '8)'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Cool.png" class="smiley">'},
                  {'s': ':p'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Sticking-out-tongue.png" class="smiley">'},
                  {'s': '&lt;3'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Heart.png" class="smiley">'},
                  {'s': ';_;'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Cry.png" class="smiley">'},
                  {'s': ':\'('.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Cry.png" class="smiley">'},
                  {'s': '\\s\\:\\/', 'r': ' <img src="http://www.macheist.com/static/common/smilies-16px/Undecided.png" class="smiley">'},
                  {'s': '\\:\\/\\s', 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Undecided.png" class="smiley">'},
                  {'s': '^\\:\\/$', 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Undecided.png" class="smiley">'},
                  {'s': '\\s\\:\\\\', 'r': ' <img src="http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/Undecided2.png" class="smiley">'},
                  {'s': '\\:\\\\\\s', 'r': '<img src="http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/Undecided2.png" class="smiley">'},
                  {'s': '^\\:\\\\$', 'r': '<img src="http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/Undecided2.png" class="smiley">'},
                  {'s': '^_^'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Grin.png" class="smiley">'},
                  {'s': ':*'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Kiss.png" class="smiley">'},
                  {'s': '\\bxd\\b', 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Crazy.png" class="smiley">'},
                  {'s': ':|'.escapeRegExp(), 'r': '<img src="http://www.macheist.com/static/common/smilies-16px/Ambivalent.png" class="smiley">'},
                  {'s': '\\b_(.*)_\\b', 'r': '<i>$1</i>'},{'s': '(\\s)\\*(.*)\\*(\\s)', 'r': '$1<b>$2</b>$3'},
                  {'s': '(\\s)-\\b(.*)\\b-(\\s)', 'r': '$1<s>$2</s>$3'},
                  {'s': 'javascript:'.escapeRegExp(), 'r': ''}];//*/

	$('entryform').removeEvent('submit', EntryForm.submitField);
	$('entryform').addEvent('submit', function(e)
	{
		e.stop();

		var captured = true;
		var txt = $('entryfield').value.trim();
		
		if(ChatServer.currentRoom.roomid == "sandbox")
		{
			var ts = (new Date()).getTime();
			ChatServer.updateData({'rooms': [{'roomid': 'sandbox', 'events': [{'type': 'chat', 'eventid': ts, 'timestamp': ts, 'text': txt, 'user': {'userid': 1, 'username': my_username, 'avatar': my_avatar, 'userclass': my_userclass }}]}]});
			$('entryfield').value = "";
			return;
		}

		if(txt.substr(0, 8).toLowerCase() == "/ignore ")
		{
			var user = txt.substring(8);
			ignoreUser(user);
		}
		else if(txt.substr(0, 10).toLowerCase() == "/unignore ")
		{
			var user = txt.substring(10);
			unignoreUser(user);
		}
		else if(txt.substr(0, 7).toLowerCase() == "/stalk ")
		{
			var user = txt.substring(7);
			stalkUser(user);
		}
		else if(txt.substr(0, 9).toLowerCase() == "/unstalk ")
		{
			var user = txt.substring(9);
			unstalkUser(user);
		}
		else if(txt.substr(0, 11).toLowerCase() == "/highlight ")
		{
			var term = txt.substring(11);
			addHighlight(term);
		}
		else if(txt.substr(0, 13).toLowerCase() == "/unhighlight ")
		{
			var term = txt.substring(13);
			removeHighlight(term);
		}
        else if(txt.substr(0, 6).toLowerCase() == "/clear")
		{
			ChatServer.currentRoom.chatLog.clear();
		}
        else if(txt.substr(0, 9).toLowerCase() == "/autoafk ")
		{
            term = txt.substring(9);
            autoAFK(term);
		}
		else if(txt.substr(0, 1) == "~")
		{
			var line = new Object();
			line.text = $('entryfield').value;
			line.user = new Object();
			line.user.userclass = my_userclass;
			line.user.avatar = my_avatar;
			line.user.username = my_username;
			line.timestamp = ChatServer.lastUpdateTimestamp + Math.floor((new Date()).getTime()/1000) - ChatServer.lastUpdateTime;
			ChatServer.currentRoom.chatLog.startMessages();
			ChatServer.currentRoom.chatLog.addLineMsg(line);
			ChatServer.currentRoom.chatLog.finishMessages();
		}
		//else if(txt.substr(0,5).toLowerCase() == "/part")
		//{
		//	ChatServer.closeRoom(ChatServer.currentRoom.roomid, null);
		//}
		//else if(txt.substr(0, 5).toLowerCase() == "/main")
		//{
		//	ChatServer.addRoom(new ChatRoom('public'));
		//}
		else if(txt.substr(0,4).toLowerCase() == "/afk")
		{
            setAFK(txt.trim().substr(5));
		}
		else if(txt.substr(0,6).toLowerCase() == "/trout")
		{
			__TROUTMSG = txt.trim().substr(7);
			$('entryfield').value = '/me *slaps '+__TROUTMSG+' around a bit with a large trout*';
			EntryForm.submitField(e);
			captured = false;
		}
		else if(txt.substr(0,5).toLowerCase() == "/slap")
		{
			__TROUTMSG = txt.trim().substr(6);
			$('entryfield').value = '/me *slaps '+__TROUTMSG+' around a bit with a large trout*';
			EntryForm.submitField(e);
			captured = false;
		}
		else if(txt.substr(0,8).toLowerCase() == "/sandbox")
		{
			var room = ChatServer.getRoom("sandbox");
			if(room == null)
			{
				roomnames['sandbox'] = "Sandbox";
				ChatServer.addRoom(new ChatRoom("sandbox"));
			}
			ChatServer.switchToRoom("sandbox");
		}
		else if(txt.substr(0,5).toLowerCase() == "/help" || txt.substr(0,5).toLowerCase() == "/halp" || txt.substr(0,5).toLowerCase() == "/hlep")
		{
			ChatServer.currentRoom.chatLog.startMessages();
			ChatServer.currentRoom.chatLog.addAlert("<code>===========================================================</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>MACHEIST CHAT OVERRIDE SCRIPT HELP</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>/ignore &lt;user&gt; - Ignore the specified user&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>/unignore &lt;user&gt; - Unignore the specified user&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>/stalk &lt;user&gt; - Watch the specified user&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>/unstalk &lt;user&gt; - Unwatch the specified user&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
            ChatServer.currentRoom.chatLog.addAlert("<code>/afk &lt;message&gt; - List as AFK. If you are highlighted,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
            ChatServer.currentRoom.chatLog.addAlert("<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will give &lt;message&gt; as a status.</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>See the menu under the gear for ignore/watching/afk options</code>");
            ChatServer.currentRoom.chatLog.addAlert("<code>/highlight &lt;term&gt; - Add a custom highlight term&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
            ChatServer.currentRoom.chatLog.addAlert("<code>/unhighlight &lt;term&gt; - Removes a custom highlight term&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
            ChatServer.currentRoom.chatLog.addAlert("<code>/autoafk &lt;number&gt; - Auto-AFK after &lt;number&gt; minutes.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>");
            ChatServer.currentRoom.chatLog.addAlert("<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Use /autoafk 0 to disable.</code>");
			ChatServer.currentRoom.chatLog.addAlert("<code>===========================================================</code>");
			ChatServer.currentRoom.chatLog.finishMessages();
		}
		else
		{
			if(__HISTORY[ChatServer.currentRoom.roomid] == undefined)
				__HISTORY[ChatServer.currentRoom.roomid] = Array();
			__HISTORY[ChatServer.currentRoom.roomid].push(txt);
			__ITXT[ChatServer.currentRoom.roomid] = 0;
			__OTXT[ChatServer.currentRoom.roomid] = "";
			
			txt = txt.replace(/([tT][hH][eE]) ([gG][aA][mM][eE])/g, "$1  $2"); // the game
			txt = txt.replace(/([hH][eE])([rR])([mM])/g, "$1*$2*$3"); // herm
			txt = txt.replace(/>:\(/g, "$Gy"); // >:(
			txt = txt.replace(/>:3/g, "$Gp"); // >:3 (tiger)
			txt = txt.replace(/(^|([^0-9]+)):3/g, "$1$Go"); // :3 (cat)
			txt = txt.replace(/<\/3/g, "$GC"); // </3
			txt = txt.replace(/\{cat\}/g, "$Go"); // cat
			txt = txt.replace(/\{tiger\}/g, "$Gp"); // tiger
			txt = txt.replace(/\{fire\}/g, "$E="); // fire
			txt = txt.replace(/\{gun\}/g, "$E3"); // gun
			txt = txt.replace(/\{horse\}/g, "$G:"); // horse
			txt = txt.replace(/\{bear\}/g, "$Gq"); // bear
			txt = txt.replace(/\{whale\}/g, "$Gt"); // whale
			txt = txt.replace(/\{pig\}/g, "$E+"); // pig
			txt = txt.replace(/\{beer\}/g, "$Gg"); // beer
			txt = txt.replace(/\{cake\}/g, "$Gf"); // cake
			txt = txt.replace(/\{bomb\}/g, "$O1"); // bomb
			txt = txt.replace(/\{camel\}/g, "$QP"); // camel
			txt = txt.replace(/\{dog\}/g, "$Gr"); // dog
            txt = txt.replace(/\{firepoop\}/g, "$E=$Gz"); // firepoop
            txt = txt.replace(/\{poop\}/g, "$Gz"); // poop
            
            txt = txt.replace(/\{shot\}/g, "!http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/gunshot.png!"); // pew pew.
            txt = txt.replace(/\{rightshot\}/g, "!http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/right%20gunshot.png!");
			txt = txt.replace(/\{bearshot\}/g, "!http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/bearshot.png!"); // bear shot
			txt = txt.replace(/\{kittyshot\}/g, "!http://dl.getdropbox.com/u/144146/MacHeist%20Emoji/kittyshot.png!"); // kitty shot
            txt = txt.replace(/\{bunnyboil\}/g, "!http://dl.getdropbox.com/u/2404640/Custom%20Emoji/bunnyboil.png!"); // bunny boil
            txt = txt.replace(/\{moneyshot\}/g, "!http://dl.getdropbox.com/u/2404640/Custom%20Emoji/moneyshot.png!"); // money shot
            txt = txt.replace(/\{babytase\}/g, "!http://dl.getdropbox.com/u/2404640/Custom%20Emoji/babytase.png!"); // baby tase
            txt = txt.replace(/\{flamingpoop\}/g, "!http://dl.getdropbox.com/u/1100096/Custom%20Emoji/flamingpoop.png!"); // flaming poop

			$('entryfield').value = '';
			//EntryForm.submitField(e);
			poorMansAjax('post','room=' + ChatServer.currentRoom.roomid + '&text=' + encodeURIComponent(txt));
			/* instant feedback */
			var line = new Object();
			line.text = txt;
			line.user = new Object();
			line.user.userclass = my_userclass;
			line.user.avatar = my_avatar;
			line.user.username = my_username;
			line.timestamp = (new Date()).getTime() / 1000;//ChatServer.lastUpdateTimestamp + Math.floor((new Date()).getTime()/1000) - ChatServer.lastUpdateTime;
			ChatServer.currentRoom.chatLog.startMessages();
			ChatServer.currentRoom.chatLog.addLineMsg(line);
			ChatServer.currentRoom.chatLog.finishMessages();
			
			captured = false;
            __AFKHOLDDOWN = (new Date()).getTime();
		}

		if (__AFKTIME != null && ChatPrefs.autoUnafk && txt.substr(0,4).toLowerCase() != "/afk")
			setAFK();

		if(captured)
			$('entryfield').value = "";
	});

	function ignoreUser(username)
	{
		if(username != null)
		{
			if(!__IGNOREDUSERS.contains(username.toLowerCase()))
			{
				__IGNOREDUSERS.push(username.toLowerCase());
				ChatServer.currentRoom.chatLog.addAlert("Now ignoring " + username);
			}
			else
				ChatServer.currentRoom.chatLog.addAlert("Already ignoring " + username);
		}
		listdata = "";
		printable = "";
		for (var i = 0; i < __IGNOREDUSERS.length; i++)
		{
			listdata += __IGNOREDUSERS[i];
			printable += __IGNOREDUSERS[i];
			if (i != (__IGNOREDUSERS.length - 1))
			{
				listdata += "|";
				printable += ", ";
			}
		}
		Cookie.write('mhchat_ignorelist',listdata,{duration: 90});
		document.getElementById('list_Ignore').innerHTML = "Ignore List: " + printable;
	}

	function unignoreUser(username)
	{
		if(__IGNOREDUSERS.contains(username.toLowerCase()))
		{
			var userIndex = -1;
			var lowerUsername = username.toLowerCase();
			for(var i = 0, len = __IGNOREDUSERS.length; i < len; i++)
			{
				if(__IGNOREDUSERS[i] == lowerUsername)
				{
					userIndex = i;
					break;
				}
			}
			if(i >= 0)
			{
				if(i == __IGNOREDUSERS.length)
					__IGNOREDUSERS = Array();
				else
					__IGNOREDUSERS.remove(userIndex);
			}

			ChatServer.currentRoom.chatLog.addAlert("No longer ignoring " + username);

			listdata = "";
			printable = "";
			for (var i = 0; i < __IGNOREDUSERS.length; i++)
			{
				listdata += __IGNOREDUSERS[i];
				printable += __IGNOREDUSERS[i];
				if (i != (__IGNOREDUSERS.length - 1))
				{
					listdata += "|";
					printable += ", ";
				}
			}
			Cookie.write('mhchat_ignorelist',listdata,{duration: 90});
			if (__IGNOREDUSERS.length == 0)
				printable = "Not Ignoring Anyone";
			document.getElementById('list_Ignore').innerHTML = "Ignore List: " + printable;
		}
		else
			ChatServer.currentRoom.chatLog.addAlert("Not ignoring " + username);
	}

	function stalkUser(username)
	{
		if(username != null)
		{
			if(!__STALKEDUSERS.contains(username.toLowerCase()))
			{
				__STALKEDUSERS.push(username.toLowerCase());
				ChatServer.currentRoom.chatLog.addAlert("Now stalking " + username + ", you creeper you.");
			}
			else
				ChatServer.currentRoom.chatLog.addAlert("Already stalking " + username + ". Obsessing much?");  
		}

		listdata = "";
		printable = "";
		for (var i = 0; i < __STALKEDUSERS.length; i++)
		{
			listdata += __STALKEDUSERS[i];
			printable += __STALKEDUSERS[i];
			if (i != (__STALKEDUSERS.length - 1))
			{
				listdata += "|";
				printable += ", ";
			}
		}
		Cookie.write('mhchat_stalklist',listdata,{duration: 90});
		document.getElementById('list_Stalk').innerHTML = "Stalk List: " + printable;
	}

	function unstalkUser(username)
	{
		if(__STALKEDUSERS.contains(username.toLowerCase()))
		{
			var userIndex = -1;
			var lowerUsername = username.toLowerCase();
			for(var i = 0, len = __STALKEDUSERS.length; i < len; i++)
			{
				if(__STALKEDUSERS[i] == lowerUsername)
				{
					userIndex = i;
					break;
				}
			}
			if(i >= 0)
			{
				if(i == __STALKEDUSERS.length)
					__STALKEDUSERS = Array();
				else
					__STALKEDUSERS.remove(userIndex);
			}

			ChatServer.currentRoom.chatLog.addAlert("No longer stalking " + username + ". Your parents would be so proud of you.");
			listdata = "";
			printable = "";
			for (var i = 0; i < __STALKEDUSERS.length; i++)
			{
				listdata += __STALKEDUSERS[i];
				printable += __STALKEDUSERS[i];
				if (i != (__STALKEDUSERS.length - 1))
				{
					listdata += "|";
					printable += ", ";
				}
			}
			Cookie.write('mhchat_stalklist',listdata,{duration: 90});
			if (__STALKEDUSERS.length == 0)
				printable = "Not Stalking Anyone";
			document.getElementById('list_Stalk').innerHTML = "Stalk List: " + printable;
		}
		else
			ChatServer.currentRoom.chatLog.addAlert("Not stalking " + username);
	}

	function addHighlight(term)
	{
		if(term != null)
		{
			if(!__CUSTOMHIGHLIGHTS.contains(term.toLowerCase()))
			{
				__CUSTOMHIGHLIGHTS.push(term.toLowerCase());
				ChatServer.currentRoom.chatLog.addAlert("The term <strong>" + term + "</strong> will now highlight you");
			}
			else
				ChatServer.currentRoom.chatLog.addAlert("Term already stored.");  
		}

		listdata = "";
		printable = "";
		for (var i = 0; i < __CUSTOMHIGHLIGHTS.length; i++)
		{
			listdata += __CUSTOMHIGHLIGHTS[i];
			printable += __CUSTOMHIGHLIGHTS[i];
			if (i != (__CUSTOMHIGHLIGHTS.length - 1))
			{
				listdata += "|";
				printable += ", ";
			}
		}
		Cookie.write('mhchat_highlightlist',listdata,{duration: 90});
		document.getElementById('list_Highlight').innerHTML = "Highlight List: " + printable;
	}

	function removeHighlight(term)
	{
		if(__CUSTOMHIGHLIGHTS.contains(term.toLowerCase()))
		{
			var termIndex = -1;
			var lowerTerm = term.toLowerCase();
			for(var i = 0, len = __CUSTOMHIGHLIGHTS.length; i < len; i++)
			{
				if(__CUSTOMHIGHLIGHTS[i] == lowerTerm)
				{
					termIndex = i;
					break;
				}
			}
			if(i >= 0)
			{
				if(i == __CUSTOMHIGHLIGHTS.length)
					__CUSTOMHIGHLIGHTS = Array();
				else
					__CUSTOMHIGHLIGHTS.remove(termIndex);
			}

			ChatServer.currentRoom.chatLog.addAlert("The term <strong>" + term + "</strong> will no longer highlight you");
			listdata = "";
			printable = "";
			for (var i = 0; i < __CUSTOMHIGHLIGHTS.length; i++)
			{
				listdata += __CUSTOMHIGHLIGHTS[i];
				printable += __CUSTOMHIGHLIGHTS[i];
				if (i != (__CUSTOMHIGHLIGHTS.length - 1))
				{
					listdata += "|";
					printable += ", ";
				}
			}
			Cookie.write('mhchat_highlightlist',listdata,{duration: 90});
			if (__CUSTOMHIGHLIGHTS.length == 0)
				printable = "No Custom Highlights";
			document.getElementById('list_Highlight').innerHTML = "Highlight List: " + printable;
		}
		else
			ChatServer.currentRoom.chatLog.addAlert("Term is not stored");
	}
    
    function setAFK(message)
    {
        if(__AFKTIME == null)
        {
            __AFKTIME = (new Date()).getTime();
            __AFKLAST = 0;
            __AFKMSG = message;
            var msg = "Now AFK";
            if(__AFKMSG != "")
                msg += ": " + __AFKMSG;
            ChatServer.currentRoom.chatLog.addAlert(msg);

			var afkMsg = document.createElement("div");
			afkMsg.setAttribute("style", "position: absolute; right: 60px; top: 15px; height: 30px; line-height: 30px; color: black;");
			afkMsg.setAttribute("id", "__AFK_MSG");
			afkMsg.appendChild(document.createTextNode(msg));
			$('header').appendChild(afkMsg);
        }
        else
        {
			__AFKHOLDDOWN = (new Date()).getTime();
            __AFKTIME = null;
            ChatServer.currentRoom.chatLog.addAlert("You are no longer AFK");
			$('__AFK_MSG').parentNode.removeChild($('__AFK_MSG'));
        }
    }
    
	function autoAFK(term)
	{
        if (term != null)
        {
            var validchars = "0123456789.";
            var isNumber=true;
            var charat;

            for (i = 0; i < term.length && isNumber == true; i++) 
            { 
                charat = term[i]; 
                if (validchars.indexOf(charat) == -1) 
                    isNumber = false;
            }
            
            if(isNumber)
            {
                ChatPrefs.autoafk = term;
                Cookie.write('mhchat_autoafk',term,{duration: 90});
                if(term == 0)
                    ChatServer.currentRoom.chatLog.addAlert("Auto-AFK disabled");
                else
                    ChatServer.currentRoom.chatLog.addAlert("Auto-AFK set to "+term+" minutes");                
            }
            else
            {
                ChatServer.currentRoom.chatLog.addAlert("You fail. How about a number this time?");
            }
        }
        if(ChatPrefs.autoafk==0)
            var printable = "Not Set";
        else
            var printable = ChatPrefs.autoafk + " minutes";
		document.getElementById('list_AFK').innerHTML = "Auto-AFK: " + printable;
    }

	$('entryfield').addEvent('keydown', historyKeyPress);
	var idx = 0;
	var otxt = "";
	function historyKeyPress(e)
	{
		if(e.shift)
			return;
			
		var h = __HISTORY[ChatServer.currentRoom.roomid];
		if(__ITXT[ChatServer.currentRoom.roomid] == undefined)
			__ITXT[ChatServer.currentRoom.roomid] = 0;
		
		if(e.key == "up")
		{
			if(h != null)
			{
				if(__ITXT[ChatServer.currentRoom.roomid] == 0)
					__OTXT[ChatServer.currentRoom.roomid] = $('entryfield').value;
				__ITXT[ChatServer.currentRoom.roomid]++;
				if(__ITXT[ChatServer.currentRoom.roomid] > h.length)
					__ITXT[ChatServer.currentRoom.roomid] = h.length;
				var i = (h.length - __ITXT[ChatServer.currentRoom.roomid]);
				$('entryfield').value = __HISTORY[ChatServer.currentRoom.roomid][i];
			}
		}
		else if(e.key == "down" && __ITXT[ChatServer.currentRoom.roomid] > 0)
		{
			if(h != null)
			{
				__ITXT[ChatServer.currentRoom.roomid]--;
				if(__ITXT[ChatServer.currentRoom.roomid] < 1)
				{
					__ITXT[ChatServer.currentRoom.roomid] = 0;
					$('entryfield').value = __OTXT[ChatServer.currentRoom.roomid];
				}
				else
				{
					var i = (h.length - __ITXT[ChatServer.currentRoom.roomid]);
					$('entryfield').value = __HISTORY[ChatServer.currentRoom.roomid][i];
				}
			}
		}
		else if(e.key.length == 1)
			__ITXT[ChatServer.currentRoom.roomid] = 0;
	};
	
	ChatServer.switchToRoom = function(roomid)
	{
		if (ChatServer.currentRoom)
		{
			ChatServer.currentRoom.hide();
			ChatServer.currentRoom.tabli.removeClass('selected');
		}

		__ITXT[ChatServer.currentRoom.roomid] = 0;
		__OTXT[ChatServer.currentRoom.roomid] = $('entryfield').value;

		ChatServer.currentRoom = ChatServer.getRoom(roomid);
		ChatServer.currentRoom.show();
		ChatServer.currentRoom.tabli.addClass('selected');
		
		$('entryfield').value = "";
		if(__OTXT[ChatServer.currentRoom.roomid] != undefined)
			$('entryfield').value = __OTXT[ChatServer.currentRoom.roomid];

		$('entryfield').focus();
	}
	
	
	if(window.fluid)
	{
		window.onblur = function()
		{
			_isBlurred = true;
			_unreadTotal = 0;
			_joinpartTotal = 0;
			_unreadMine = 0;
			window.fluid.dockBadge = "";
		};

		window.onfocus = function()
		{
			_isBlurred = false;
			_unreadTotal = 0;
			_joinpartTotal = 0;
			_unreadMine = 0;
			window.fluid.dockBadge = "";
		};
		
		window.onunload = function()
		{
			ChatPrefs.saveRooms();
			var room = ChatServer.currentRoom;
			do
			{
				room = ChatServer.currentRoom;
				room.leave();
				ChatServer.tab();
			} while(ChatServer.currentRoom != room);
		};
	}
		
	//var chatUpdate = ChatServer.updateData;
	ChatServer.updateData = function(response)
	{
		if (response.error != undefined)
		{
			ChatServer.currentRoom.chatLog.addAlert('Failed to get update: '+response.error);
			clearInterval(ChatServer.updateTimeout);
			return;
		}

		if (response.client_control != undefined) {
			if (response.client_control == 'delayed_reload') {
				setTimeout(function() {window.location.reload(true)},10000);
			}
		}
		
		ChatServer.lastUpdateTime = nowUnix();
		ChatServer.currentRoom.chatLog.startMessages(); //only scroll the visible chat room

		for(var r = 0, rlen = response.rooms.length; r < rlen; r++)
		{
			if(response.rooms[r].roomid == undefined)
				continue;

			var room = ChatServer.getRoom(response.rooms[r].roomid);

			for(var e = 0, elen = response.rooms[r].events.length; e < elen; e++)
			{
				var ev = response.rooms[r].events[e];
				if(ev != null && ev.user != null)
				{
					var ignored = (!ChatPrefs.disableIgnore && __IGNOREDUSERS.contains(ev.user.username.toLowerCase()));
					var highlight = (ev.text.toLowerCase().indexOf(my_username.toLowerCase()) >= 0);
					var stalked = __STALKEDUSERS.contains(ev.user.username.toLowerCase());
                    
                    if(!highlight && !ChatPrefs.disableHighlights)
                    {
                        for(var i = 0; i<__CUSTOMHIGHLIGHTS.length; i++) {
                            var temp = __CUSTOMHIGHLIGHTS[i];
                            if (ev.text.toLowerCase().indexOf(temp.toLowerCase()) >= 0)
                                highlight = true;
                        }
                    }

					if(highlight && !ignored && __AFKTIME != null)
					{
						var now = (new Date()).getTime();
						var minutesSinceMsg = (now - __AFKLAST) / 60000.0;
						if(minutesSinceMsg >= 5)
						{
							var afkTime = Math.round((now - __AFKTIME) / 60000.0);
							
							if(afkTime == 1)
								afkTime = "1 minute";
							if(afkTime > 59)
							{
								var hours = Math.floor(afkTime / 60.0);
								var minutes = afkTime - (hours * 60);
								
								afkTime = hours + " hour";
								if(hours > 1)
									afkTime += "s";
								
								if(minutes > 0)
								{
									afkTime += " and " + minutes + " minute";
									if(minutes > 1)
										afkTime += "s";
								}
							}
							else
								afkTime = afkTime + " minutes";
							
							var str = "/me is AFK. Gone for " + afkTime + ".";
							if(__AFKMSG != null && __AFKMSG != "")
								str += " [" + __AFKMSG + "]";
							poorMansAjax('post','room=' + room.roomid + '&text=' + encodeURIComponent(str));

							/* instant feedback */
							var newline = new Object();
							newline.text = str;
							newline.user = new Object();
							newline.user.userclass = my_userclass;
							newline.user.avatar = my_avatar;
							newline.user.username = my_username;
							newline.timestamp = ChatServer.lastUpdateTimestamp + Math.floor((new Date()).getTime()/1000) - ChatServer.lastUpdateTime;
							room.chatLog.startMessages();
							room.chatLog.addLineMsg(newline);
							room.chatLog.finishMessages();
							
							__AFKLAST = now;
						}
					}
					
					if(ignored)
					{
						if(ev.type == 'join')
							room.userList.addUser(ev.user);
						else if(ev.type == 'leave')
							room.userList.delUser(ev.user);							

						ev.type = "donothing";
					}
					else if(ev.type == 'join' && stalked)
					{
						_joinpartTotal++;

						if(ChatPrefs.stalkJoin)
						{
							window.fluid.showGrowlNotification({
								title: "MacHeist Chat", 
								description: ev.user.username + " joined the chat.", 
								priority: 0, 
								sticky: false,
								identifier: "mhchatj" + _joinpartTotal,
								onclick: window.fluid.activate,
								icon: ev.user.avatar
							});
						}
					}
					else if(ev.type == 'leave' && stalked)
					{
						_joinpartTotal++;

						if(ChatPrefs.stalkJoin)
						{
							window.fluid.showGrowlNotification({
								title: "MacHeist Chat", 
								description: ev.user.username + " left the chat.", 
								priority: 0, 
								sticky: false,
								identifier: "mhchatj" + _joinpartTotal,
								onclick: window.fluid.activate,
								icon: ev.user.avatar
							});
						}
					}
                    else if(ev.type == 'chat' && window.fluid && _isBlurred && ev.user.username != my_username)
					{
						_unreadTotal++;
						
						if(ChatPrefs.growlAll || (ChatPrefs.growlHighlight && highlight) || (ChatPrefs.stalkSay && stalked))
						{
							window.fluid.showGrowlNotification({
								title: "MacHeist Chat (" + ev.user.username + ")", 
								description: ev.text, 
								priority: 0, 
								sticky: false,
								identifier: "mhchat" + _unreadTotal,
								onclick: window.fluid.activate,
								icon: ev.user.avatar
							});
						}
						if(highlight) _unreadMine++;

						var dockStr = _unreadTotal;
						if(_unreadMine > 0)
							dockStr += "/" + _unreadMine;

						window.fluid.dockBadge = dockStr;
					}
					
					if (ev.type == 'chat')
					{
						if (ChatServer.prevUpdateTime == 0 || ev.user.userid != my_userid)
						{
							if(!ChatPrefs.minMode)
								room.chatLog.doTimestamp(ev);
							room.chatLog.addLineMsg(ev);
							room.countEvent(ev.text.toLowerCase().indexOf(my_username.toLowerCase()) >= 0);
						}

					}
					else if (ev.type == 'join')
					{
						room.userList.addUser(ev.user);

						if (ChatPrefs.showAlerts)
						{
							if(!ChatPrefs.minMode)
								room.chatLog.doTimestamp(ev);
							room.chatLog.addAlert('<strong>' + htmlspecialchars(ev.user.username) + '</strong> joined the chat');
						}

					}
					else if (ev.type == 'leave')
					{
						room.userList.delUser(ev.user);
						room.userList.updateCount();

						if (ChatPrefs.showAlerts)
						{
							if(!ChatPrefs.minMode)
								room.chatLog.doTimestamp(ev);
							room.chatLog.addAlert('<strong>' + htmlspecialchars(ev.user.username) + '</strong> left the chat');
						}
					}
				}
			}
		}
		
		ChatServer.prevUpdateTime = ChatServer.lastUpdateTime;
		ChatServer.currentRoom.chatLog.finishMessages();
		
		// rate control
		if (response.length==0)
			ChatServer.updateSpeed = ChatServer.updateSpeed + 1000;
		else if (response.length==1)
			ChatServer.updateSpeed = ChatServer.updateSpeed - 1000;
		else if (response.length>2)
			ChatServer.updateSpeed = 1000;
		else if (response.length>1)
			ChatServer.updateSpeed = 3000;
		
		ChatServer.updateSpeed = Math.min(Math.max(ChatServer.updateSpeed,15000),1000);
		clearInterval(ChatServer.updateTimeout);
		ChatServer.updateTimeout = setInterval(ChatServer.triggerUpdate, ChatServer.updateSpeed);

		//chatUpdate(response);
	}

	function getTimestamp(ts)
	{
		var d = new Date(ts * 1000);

		var hour = d.getHours();
		var min = d.getMinutes();
		var stamp = "";
		if(min < 10)
			min = "0" + min;

		if(d.getTimezoneOffset() < -60)
		{
			stamp = " am";
			if(hour > 12)
			{
				hour = hour - 12;
				stamp = " pm";
			}
		}

		return hour + ":" + min + stamp;
	}
	
	function minMessages(line)
	{
		if (line.text.substr(0,4)=='/me ' && line.text.length>4)
		{
			this.addAlert('<i><strong>'+htmlspecialchars(line.user.username)+'</strong> '+htmlspecialchars(line.text.substr(4))+'</i>');
			this.lastName = '';
			return;
		}

		if (line.text.substr(0,1)=='~')
		{
			this.addAlert('<div class="banner">'+htmlspecialchars(line.text.substr(1))+'</div>');
			this.lastName = '';
			return;
		}

		var lineText = "<span style=\"font-size: 0.85em; color: rgb(157,159,162);\">" + getTimestamp(line.timestamp) + "</span> " + formatText(htmlspecialchars(line.text));
		if(line.user.username == this.lastName)
		{
			var className = this.logdiv.lastChild.className.split(' ');
			if(className[0] == "msg")
			{
				this.logdiv.lastChild.firstChild.innerHTML += "<br/>" + lineText;
				return;
			}
		}	

		var linediv = document.createElement('div');
		var uc = line.user.userclass.split(' ');
		linediv.className = 'msg '+uc[0];
		linediv.id = 'line'+line.eventid;

		if (line.text.toLowerCase().indexOf(my_username.toLowerCase())>=0)
			linediv.className += ' hilite';

		var textdiv = document.createElement('div');
		textdiv.className = 'text brd';

		var style = "background-image: none; color: #DDD;";
		textdiv.setAttribute('style', style);
		textdiv.innerHTML = lineText;

		linediv.appendChild(textdiv);

		var avatarimg = document.createElement('img');
		avatarimg.className = 'avatar';
		avatarimg.src = line.user.avatar;
		avatarimg.username = line.user.username;
		avatarimg.addEvent('mouseup', function() {$('entryfield').value = ($('entryfield').value+' @').trim()+line.user.username+' '; $('entryfield').focus();});
		linediv.appendChild(avatarimg);

		var senderdiv = document.createElement('div');
		senderdiv.className = 'sender';
		senderdiv.innerHTML = htmlspecialchars(line.user.username);
		linediv.appendChild(senderdiv);

		this.lastName = line.user.username;
		this.logdiv.appendChild(linediv);

		if (this.isAtBottom)
			linediv.getElements('img.embed').addEvent('load',this.scrollFx.toBottom);
	}
	
	function addPrefItem(id, name)
	{
		var beforeNode = $("btn_clear");
		var dd = beforeNode.parentNode;
		
		var newPrefChk = document.createElement("input");
		newPrefChk.setAttribute("id", id);
		newPrefChk.setAttribute("type", "checkbox");
		newPrefChk.setAttribute("checked", "");
		
		var newPrefLbl = document.createElement("label");
		newPrefLbl.setAttribute("for", id);
		newPrefLbl.appendChild(document.createTextNode(name));
		
		dd.insertBefore(newPrefChk, beforeNode);
		dd.insertBefore(newPrefLbl, beforeNode);
		dd.insertBefore(document.createElement("br"), beforeNode);
	}
	
	var beforeNode = $("btn_clear");
	var dd = beforeNode.parentNode;
	if(window.fluid)
	{
		addPrefItem("chk_growlHighlight", "Growl Highlights");
		addPrefItem("chk_growlAll", "Growl All Messages");
	}
	
	addPrefItem("chk_inlineLink", "Open Links Inline");
	addPrefItem("chk_minMode", "Min Mode");
	
    var listAFK = document.createElement("p");
	listAFK.setAttribute("id", "list_AFK");
	listAFK.appendChild(document.createTextNode("Auto-AFK: Not Set"));
	dd.insertBefore(listAFK, beforeNode);

	addPrefItem("chk_autoUnafk", "Automatically un-AFK on input");

	var listStalk = document.createElement("p");
	listStalk.setAttribute("id", "list_Stalk");
	listStalk.appendChild(document.createTextNode("Stalk List: Not Stalking Anyone"));
	dd.insertBefore(listStalk, beforeNode);

	if(window.fluid)
	{
		addPrefItem("chk_growlStalk", "Growl Stalkees Join/Part");
		addPrefItem("chk_growlSuperStalk", "Growl Stalkees /say");
	}

	var listStalk = document.createElement("p");
	listStalk.setAttribute("id", "list_Ignore");
	listStalk.appendChild(document.createTextNode("Ignore List: Not Ignoring Anyone"));
	dd.insertBefore(listStalk, beforeNode);

	addPrefItem("chk_disableIgnore", "Disable Ignores");
    
	var listStalk = document.createElement("p");
	listStalk.setAttribute("id", "list_Highlight");
	listStalk.appendChild(document.createTextNode("Highlights List: No Custom Highlights"));
	dd.insertBefore(listStalk, beforeNode);

	addPrefItem("chk_disableHighlights", "Disable Highlights");
    
    var updateCooger = document.createElement("a");
	updateCooger.setAttribute("href", "http://darkcooger.net/mhchat/mhchat.user.js");
	updateCooger.setAttribute("target", "_blank");
    updateCooger.setAttribute("style", "color:#656565; font-size:7pt;");
    updateCooger.appendChild(document.createTextNode("Update with darkcooger's script (more release-like)"));
    
    var updateMiah = document.createElement("a");
	updateMiah.setAttribute("href", "http://ferrousmoon.com/mhchat.user.js");
	updateMiah.setAttribute("target", "_blank");
    updateMiah.setAttribute("style", "color:#656565; font-size:7pt;");
    updateMiah.appendChild(document.createTextNode("Update with Miah's script (more beta-ish)"));

    var versioninfo = document.createElement("p");
    versioninfo.appendChild(document.createTextNode("Version r"+ChatServer.overrideVersion));

	dd.insertBefore(updateCooger, beforeNode);
	dd.insertBefore(document.createElement("br"), beforeNode);
	dd.insertBefore(updateMiah, beforeNode);
	dd.insertBefore(document.createElement("br"), beforeNode);
	dd.insertBefore(versioninfo, beforeNode);


	var ChatPrefs = {
		showAlerts: true,
		showImages: true,
		growlHighlight: false,
		growlAll: false,
		inlineLinks: false,
		minMode: false,
		autoUnafk: true,
		disableIgnore: false,
		stalkJoin: true,
		stalkSay: false,
        disableHighlights: false,
        autoafk: 0,
	
		init: function() {
			var cookie = Cookie.read("mhchat_alerts");
			if (cookie != null)
				ChatPrefs.showAlerts = cookie=='true';
			$('chk_alerts').checked = ChatPrefs.showAlerts;

			cookie = Cookie.read("mhchat_images");
			if (cookie != null)
				ChatPrefs.showImages = cookie=='true';
			$('chk_images').checked = ChatPrefs.showImages;

			cookie = Cookie.read("mhchat_inlineLinks");
			if(cookie != null)
				ChatPrefs.inlineLinks = cookie=='true';
			$('chk_inlineLink').checked = ChatPrefs.inlineLinks;

			cookie = Cookie.read("mhchat_minMode");
			if (cookie != null)
				ChatPrefs.minMode = cookie=='true';
			$('chk_minMode').checked = ChatPrefs.minMode;
			if(ChatPrefs.minMode)
			{
				ChatPrefs.minMode = false;
				ChatPrefs.toggleMinMode();
			}

			cookie = Cookie.read("mhchat_autoUnafk");
			if (cookie != null)
				ChatPrefs.autoUnafk = cookie=='true';
			$('chk_autoUnafk').checked = ChatPrefs.autoUnafk;

			cookie = Cookie.read("mhchat_ignoreDisable");
			if (cookie != null)
				ChatPrefs.disableIgnore = cookie=='true';
			$('chk_disableIgnore').checked = ChatPrefs.disableIgnore;

			var cookie = Cookie.read("mhchat_autoafk");
			if (cookie != null)
				ChatPrefs.autoafk = cookie;

			if(window.fluid)
			{
				cookie = Cookie.read("mhchat_growlHighlight");
				if(cookie != null)
					ChatPrefs.growlHighlight = cookie=='true';
				$('chk_growlHighlight').checked = ChatPrefs.growlHighlight;

				cookie = Cookie.read("mhchat_growlAll");
				if(cookie != null)
					ChatPrefs.growlAll = cookie=='true';
				$('chk_growlAll').checked = ChatPrefs.growlAll;

				cookie = Cookie.read("mhchat_stalkjoin");
				if (cookie != null)
					ChatPrefs.stalkJoin = cookie=='true';
				$('chk_growlStalk').checked = ChatPrefs.stalkJoin;

				cookie = Cookie.read("mhchat_stalksay");
				if (cookie != null)
					ChatPrefs.stalkSay = cookie=='true';
				$('chk_growlSuperStalk').checked = ChatPrefs.stalkSay;

				$('chk_growlHighlight').addEvent('change',ChatPrefs.toggleGrowlHighlight);
				$('chk_growlAll').addEvent('change',ChatPrefs.toggleGrowlAll);
				$('chk_growlStalk').addEvent('change',ChatPrefs.toggleStalk);
				$('chk_growlSuperStalk').addEvent('change',ChatPrefs.toggleSuperStalk);
			}
            
            cookie = Cookie.read("mhchat_disableHighlights");
			if (cookie != null)
				ChatPrefs.disableHighlights = cookie=='true';
			$('chk_disableHighlights').checked = ChatPrefs.disableHighlights;

            //$('chk_alerts').addEvent('change',ChatPrefs.toggleAlerts);
			//$('chk_images').addEvent('change',ChatPrefs.toggleImages);
			$('chk_inlineLink').addEvent('change',ChatPrefs.toggleInlineLinks);
			$('chk_minMode').addEvent('change',ChatPrefs.toggleMinMode);
			$('chk_autoUnafk').addEvent('change',ChatPrefs.toggleAutoUnafk);
			$('chk_disableIgnore').addEvent('change',ChatPrefs.toggleIgnore);
			$('chk_disableHighlights').addEvent('change',ChatPrefs.toggleHighlights);

		},

		/*
		toggleAlerts: function() {
			ChatPrefs.showAlerts = !ChatPrefs.showAlerts; 
			Cookie.write('mhchat_alerts',ChatPrefs.showAlerts?'true':'false',{duration: 90});

			if (ChatPrefs.showAlerts) 
				ChatServer.currentRoom.chatLog.addAlert('Join/leave messages will be shown');
			else
				ChatServer.currentRoom.chatLog.addAlert('Join/leave messages will not be shown');
		},

		toggleImages: function() {
			ChatPrefs.showImages = !ChatPrefs.showImages; 
			Cookie.write('mhchat_images',ChatPrefs.showImages?'true':'false',{duration: 90});

			if (ChatPrefs.showImages) 
				ChatServer.currentRoom.chatLog.addAlert('Images will be shown');
			else
				ChatServer.currentRoom.chatLog.addAlert('Images will not be shown');
		},*/

		toggleGrowlHighlight: function()
		{
			ChatPrefs.growlHighlight = !ChatPrefs.growlHighlight;
			Cookie.write('mhchat_growlHighlight',ChatPrefs.growlHighlight?'true':'false',{duration: 90});

			if(!ChatPrefs.growlHighlight)
			{
				ChatPrefs.growlAll = false;
				$('chk_growlAll').checked = false;
			}

			if(ChatPrefs.growlHighlight)
				ChatServer.currentRoom.chatLog.addAlert('Highlight messages will be Growled');
			else
				ChatServer.currentRoom.chatLog.addAlert('Messages will not be Growled');
		},

		toggleGrowlAll: function()
		{
			ChatPrefs.growlAll = !ChatPrefs.growlAll;
			Cookie.write('mhchat_growlAll',ChatPrefs.growlAll?'true':'false',{duration: 90});

			if(ChatPrefs.growlAll)
			{
				ChatPrefs.growlHighlight = true;
				$('chk_growlHighlight').checked = true;
			}

			if(ChatPrefs.growlAll)
				ChatServer.currentRoom.chatLog.addAlert('Messages will be Growled');
			else
				ChatServer.currentRoom.chatLog.addAlert('Messages will not be Growled');
		},
		
		toggleInlineLinks: function()
		{
			ChatPrefs.inlineLinks = !ChatPrefs.inlineLinks;
			Cookie.write('mhchat_inlineLinks',ChatPrefs.inlineLinks?'true':'false',{duration: 90});
			
			if(ChatPrefs.inlineLinks)
				ChatServer.currentRoom.chatLog.addAlert('Links will be opened inline');
			else
				ChatServer.currentRoom.chatLog.addAlert('Links will not be opened inline');
		},
		
		toggleMinMode: function()
		{
			ChatPrefs.minMode = !ChatPrefs.minMode;
			Cookie.write('mhchat_minMode',ChatPrefs.minMode?'true':'false',{duration: 90});
						
			if(ChatPrefs.minMode)
			{
				for(var room in ChatServer.rooms)
				{
					var r = ChatServer.rooms[room];
					__ADDLINEMSG[r.roomid] = r.chatLog.addLineMsg;
					r.chatLog.addLineMsg = minMessages;
				}
				ChatServer.currentRoom.chatLog.addAlert('Switching to min mode');
			}
			else
			{
				for(var room in ChatServer.rooms)
				{
					var r = ChatServer.rooms[room];
					r.chatLog.addLineMsg = __ADDLINEMSG[r.chatLog.roomid];
					__ADDLINEMSG[r.roomid] = null;
				}
				ChatServer.currentRoom.chatLog.addAlert('Switching to normal mode');
			}
		},

		toggleAutoUnafk: function() {
			ChatPrefs.autoUnafk = !ChatPrefs.autoUnafk; 
			Cookie.write('mhchat_autoUnafk',ChatPrefs.autoUnafk?'true':'false',{duration: 90});

			if (ChatPrefs.autoUnafk) 
				ChatServer.currentRoom.chatLog.addAlert('You will automatically un-AFK after posting.');
			else
				ChatServer.currentRoom.chatLog.addAlert('You will not automatically un-AFK after posting.');
		},

		toggleIgnore: function()
		{
			ChatPrefs.disableIgnore = !ChatPrefs.disableIgnore; 
			Cookie.write('mhchat_ignoreDisable',ChatPrefs.disableIgnore?'true':'false',{duration: 90});

			if (ChatPrefs.disableIgnore) 
				ChatServer.currentRoom.chatLog.addAlert('Ignore list is now disabled');
			else
				ChatServer.currentRoom.chatLog.addAlert('Ignore list is now enforced');
		},

		toggleHighlights: function()
		{
			ChatPrefs.disableHighlights = !ChatPrefs.disableHighlights; 
			Cookie.write('mhchat_disableHighlights',ChatPrefs.disableHighlights?'true':'false',{duration: 90});

			if (ChatPrefs.disableHighlights) 
				ChatServer.currentRoom.chatLog.addAlert('Custom highlight are now disabled');
			else
				ChatServer.currentRoom.chatLog.addAlert('Custom highlight are now enforced');
		},
        
        toggleStalk: function()
		{
			ChatPrefs.stalkJoin = !ChatPrefs.stalkJoin; 
			Cookie.write('mhchat_stalkjoin',ChatPrefs.stalkJoin?'true':'false',{duration: 90});

			if (ChatPrefs.stalkJoin) 
				ChatServer.currentRoom.chatLog.addAlert('You will now receive Growl notifications when someone in your stalk list joins or leaves chat');
			else
				ChatServer.currentRoom.chatLog.addAlert('You will no longer receive Growl notifications when someone in your stalk list joins or leaves chat');
		},

		toggleSuperStalk: function()
		{
			ChatPrefs.stalkSay = !ChatPrefs.stalkSay; 
			Cookie.write('mhchat_stalksay',ChatPrefs.stalkSay?'true':'false',{duration: 90});

			if (ChatPrefs.stalkSay) 
				ChatServer.currentRoom.chatLog.addAlert('You will now receive Growl notifications when someone in your stalk list speaks in chat');
			else
				ChatServer.currentRoom.chatLog.addAlert('You will no longer receive Growl notifications when someone in your stalk list speaks in chat');
		},

		joinRooms: function() {
			var cookie = Cookie.read("mhchat_rooms");
			if (cookie == null || cookie=='')
				return;

			var rooms = cookie.split(';');

			for (var i in rooms) {
				var room = rooms[i];
				if (room.length != undefined && room.length>2) {
					ChatServer.addRoom(new ChatRoom(room));
				}
			}
		}, 

		saveRooms: function() {
			var cookieText = "";
			for (var room in ChatServer.rooms) {
				if (room!='public')
					cookieText = cookieText + room + ";";
			}
			Cookie.write('mhchat_rooms',cookieText,{duration: 90});
		}

	};
	
	ChatServer.joinRoom = function(response) {
		if (response.error != undefined) {
			ChatServer.currentRoom.addAlert('Failed to join channel: '+response.error);
			return;
		}

		for (var r = 0; r < response.length; r++) {
			if (response[r].roomid != undefined) {
				var room = ChatServer.getRoom(response[r].roomid);
				var inMin = !(__ADDLINEMSG[room.roomid] == null || __ADDLINEMSG[room.roomid] == undefined);
				if(ChatPrefs.minMode)
				{
					__ADDLINEMSG[room.roomid] = room.chatLog.addLineMsg;
					room.chatLog.addLineMsg = minMessages;
				}
				else if(inMin && !ChatPrefs.minMode)
				{
					room.chatLog.addLineMsg = __ADDLINEMSG[room.chatLog.roomid];
					__ADDLINEMSG[room.roomid] = null;
				}
				room.userList.updateClassCount = updateClassCount;
				room.userList.addUser = userListAddUser;
				room.join(response[r]);
			}
		}
		
		if (!ChatServer.updateTimeout) { //after the first join start updating
			ChatServer.triggerUpdate();	
			ChatServer.updateTimeout = setInterval(ChatServer.triggerUpdate, ChatServer.updateSpeed);	
		}
		
		if (!ChatServer.gotSession) {
			ChatServer.gotSession = true;
			ChatPrefs.joinRooms();
		}
		
		ChatPrefs.saveRooms();
	}
	
	function updateClassCount(userclass)
	{
		if(userclass == undefined || userclass == null || userclass == "" || userclass == "null")
			userclass = "guest";
		var heading = this.userdiv.getElement('.header.'+userclass);
		var headingCount = this.users.filter(user_hasClass, userclass);
		heading.getElement('.count').innerHTML = headingCount.length;
		heading.style.display = headingCount.length==0?'none':'block';
	}
	
	function userListAddUser(user)
	{
		var existingUser = this.users.filter(user_hasId, user.userid);
		if (existingUser.length>0)	//dupe
			return;

		if (user.userclass=='' || user.userclass=='null')
			user.userclass='guest';

		//add to user list
		var newli = document.createElement('li');
		newli.user = user;
		newli.className = 'user '+user.userclass;
		newli.innerHTML = '<img src="'+user.avatar+'" /> '+htmlspecialchars(user.username);
		newli.id = 'user'+user.userid;

		// sort into right subheading
		var iterate = this.userdiv.getElement('.header.'+user.userclass);
		if (iterate)	iterate = iterate.nextSibling;
		else			iterate = $('guestheader').nextSibling;

		while (iterate != null && iterate.user != null && user_cmpName(iterate.user,user)<=0) {
			iterate = iterate.nextSibling;
		}

		if (iterate==undefined || iterate==null || !iterate)
			this.userol.appendChild(newli);
		else if (iterate)
			this.userol.insertBefore(newli, iterate);

		newli = $(newli);
		newli.userList = this;
		newli.addEvent('mouseover',UserPopup.hover_user);
		newli.addEvent('mouseleave',UserPopup.unhover_user);

		user.elem = newli;
		this.users.push(user);

		this.updateClassCount(user.userclass); // update subheading count
		this.updateCount();
		setUserlistClick(user);
	}

	for(var roomID in ChatServer.rooms)
	{
		var room = ChatServer.getRoom(roomID);
		if(room != null && room != undefined)
		{
			room.userList.updateClassCount = updateClassCount;
			for(var userIdx = 0, j = room.userList.users.length; userIdx < j; userIdx++)
			{
				var user = room.userList.users[userIdx];
				if(user.elem != null)
					setUserlistClick(user);
			}
			
			room.userList.addUser = userListAddUser;
		}
	}
	
	function setUserlistClick(user)
	{
		user.elem.addEvent('mouseup', function() { $('entryfield').value = $('entryfield').value.trim() + ' @' + user.username + ' '; $('entryfield').focus(); } );
	}	
	
	Array.prototype.contains = function(obj)
	{
		for(var i = 0, count = this.length; i < count; i++)
			if(this[i] === obj)
				return true;
		return false;
	}

	// Array Remove - By John Resig (MIT Licensed); modified
	Array.prototype.remove = function(index)
	{
		index = index / 1.0;

		var rest = this.slice(index + 1);
		this.length = this.length - (rest.length + 1);
		return this.push.apply(this, rest);
	}
		
	if(window.fluid)
	{
		var cookie = Cookie.read("mhchat_stalklist");
		if(cookie == null) cookie = "";
		cookie = cookie.split("|");
		for (var i = 0; i < cookie.length; i++)
			if(!__STALKEDUSERS.contains((cookie[i]).toLowerCase()))
				if (cookie[i] != "")
					__STALKEDUSERS.push((cookie[i]).toLowerCase());
	}

	var cookie = Cookie.read("mhchat_ignorelist");
	if(cookie == null) cookie = "";
	cookie = cookie.split("|");
	for (var i = 0; i < cookie.length; i++)
		if(!__IGNOREDUSERS.contains((cookie[i]).toLowerCase()))
			if (cookie[i] != "")
				__IGNOREDUSERS.push((cookie[i]).toLowerCase());

	var cookie = Cookie.read("mhchat_highlightlist");
	if(cookie == null) cookie = "";
	cookie = cookie.split("|");
	for (var i = 0; i < cookie.length; i++)
		if(!__CUSTOMHIGHLIGHTS.contains((cookie[i]).toLowerCase()))
			if (cookie[i] != "")
				__CUSTOMHIGHLIGHTS.push((cookie[i]).toLowerCase());

	ignoreUser(null);
	stalkUser(null);
    addHighlight(null);
    autoAFK(null);

	ChatPrefs.init();

	ChatServer.currentRoom.chatLog.addAlert("MacHeist Chat Override Script Loaded");

	var node = document.createElement("link");
	node.setAttribute("type", "text/css");
	node.setAttribute("href", "http://darkcooger.net/mhchat/core.css");
	node.setAttribute("rel", "stylesheet");
	node.setAttribute("media", "screen, projection");
	document.head.appendChild(node);
