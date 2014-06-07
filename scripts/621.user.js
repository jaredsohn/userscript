// ==UserScript==
// @name          Yay Extensions
// @namespace     http://c3o.org
// @description	  Adds ignore user functionality, download link for embedded MP3s and theme dropdown in preferences
// @include       http://*.yayhooray.com/*
// ==/UserScript==

(function() {

	var blocking = 1;

	//== read cookie with ignored users ==
	ignored = new Array();
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		while (ca[i].charAt(0)==' ') { ca[i] = ca[i].substring(1,ca[i].length); }
		if (ca[i].indexOf('ignoringoff=') == 0) { blocking = 0 }
		if (ca[i].indexOf('ignoredusers=') == 0) { ignored = ca[i].substring(13,ca[i].length).split('|'); }
	}


	//== en/disable blocking ==
	if(blocking == 1) {
		if(document.title.indexOf("'s Profile") == -1) {
			document.styleSheets[1].insertRule('.blocked { display:none }', document.styleSheets[1].cssRules.length);
		} else { 
			document.body.innerHTML += '<style>.blocked { display:none }</style>';
		}
	}


	GM_registerMenuCommand('Toggle blocking', toggleblocking);

	var togglelink = document.createElement('a');
	togglelink.href = 'javascript:void(0)';
	togglelink.id = 'toggleblockinglink';
	var currstatus = (blocking==1) ? 'ON' : 'OFF';
	togglelink.appendChild(document.createTextNode('Blocking is '+currstatus+' '));
	togglelink.onclick = toggleblocking;
	document.getElementById('headnav').insertBefore(togglelink, document.getElementById('headnav').firstChild);

	function toggleblocking() {
		blocking =       (blocking==1) ?  0      : 1;
		var newdisplay = (blocking==1) ? 'none' : 'block';
		var newstatus =  (blocking==1) ? 'ON'   : 'OFF';
		var expires = 	 (blocking==1) ? 'Thu, 9 Aug 2001 20:47:11 UTC' : 'Thu, 9 Aug 2012 20:47:11 UTC';
		document.body.innerHTML += '<style>.blocked { display:'+newdisplay+' }</style>';
		document.getElementById('toggleblockinglink').innerHTML = 'Blocking is '+newstatus+' ';
		document.getElementById('toggleblockinglink').onclick = toggleblocking;
		document.cookie = "ignoringoff=1; expires="+expires+"; path=/; domain=.yayhooray.com";
	}


	//== add unignore menu items ==
	for(var i=1; i<ignored.length; i++) {
		eval('GM_registerMenuCommand("Unignore "+ignored[i], function() { whotounignore = "'+ignored[i]+'"; for(var i=0; i<ca.length; i++) { while (ca[i].charAt(0)==" ") { ca[i] = ca[i].substring(1,ca[i].length); } if (ca[i].indexOf("ignoredusers=") == 0) { newignored = ca[i].substring(13,ca[i].length).replace("|"+whotounignore, ""); } } document.cookie = "ignoredusers="+newignored+"; expires=Thu, 9 Aug 2012 20:47:11 UTC; path=/; domain=.yayhooray.com"; document.location.reload(); });');
	}
	if(document.location.href.indexOf('/managebuddies') > -1) {
		var thepage = document.getElementById('managebuddiespage');
		thepage.insertBefore(document.createElement('hr'), thepage.firstChild);
		for(var i=1; i<ignored.length; i++) {
			unignorelink = document.createElement('a');
			unignorelink.href='#';
			unignorelink.whotounignore = ignored[i];
			unignorelink.onclick = function() {
				for(var j=0; j<ca.length; j++) {
					while (ca[j].charAt(0)==" ") { ca[j] = ca[j].substring(1,ca[j].length); }
					if (ca[j].indexOf("ignoredusers=") == 0) { newignored = ca[j].substring(13,ca[j].length).replace("|"+this.whotounignore, ""); }
				}
				document.cookie = "ignoredusers="+newignored+"; expires=Thu, 9 Aug 2012 20:47:11 UTC; path=/; domain=.yayhooray.com";
				this.parentNode.removeChild(this);
				return false;
			}
			unignorelink.style.marginLeft='1em';
			unignorelink.appendChild(document.createTextNode(ignored[i]));
			thepage.insertBefore(unignorelink, thepage.firstChild);
		}
		thepage.insertBefore(document.createTextNode('UNIGNORE: '), thepage.firstChild);
	}

	//find buddies
	var buddies = new Array();
	if(document.location.href.indexOf('/threads') > -1) {
		var selects = document.getElementsByTagName('select');
		for(var i=0;i<selects.length;i++) {
			if(selects[i].getAttribute('name') == 'tstartedby') {
				var buddyoptions = selects[i].childNodes;
				for(var j=1;j<buddyoptions.length;j++) {
					if(buddyoptions[j].nodeType==1) {
						buddies[buddies.length] = buddyoptions[j].value.toLowerCase().replace(/[ _]/g, '-');
					}
				}	
				break;
			}
		}
	}

	var selectedPMs = 0;
	var currentcat = '';

	if(document.location.href.indexOf('/thread/') > -1 && document.getElementById('threadcat')) {
		currentcat = document.getElementById('threadcat').firstChild.innerHTML.toLowerCase();
	}

	var divs = document.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++) {

		//== ignore threads ==
		if(divs[i].className.indexOf('thread ') > -1) {			
			var children = divs[i].childNodes;
			for(var j=0;j<children.length;j++) {
				if(children[j].className=='threadtitlecat') {	//assign cat class
					divs[i].className += ' '+children[j].childNodes[1].firstChild.innerHTML.toLowerCase();
				}
				if(children[j].className=='threadstartedby') {
					var author = children[j].getElementsByTagName('a')[0].innerHTML.toLowerCase().replace(/[ _]/g, '-');
					divs[i].className += ' u_'+author;
					for(var l=1; l<ignored.length; l++) {
						if(author == ignored[l]) { divs[i].className += ' blocked'; break; } //divs[i].style.display='none'; 
					}
					for(var l=0; l<buddies.length; l++) {
						if(author == buddies[l]) { divs[i].className += ' buddy'; break; }
					}
					break;
				}
			}
		}

		//== restore titles ==
		if(divs[i].className == 'threadtitle') {			
			var threadtitle = divs[i].firstChild.firstChild.nodeValue;
			if(threadtitle.length == 47 && threadtitle.substr(44, 3) == '...') {
				var threadhref = divs[i].firstChild.href.split('/')[5];
				var numofspecialchars = 44 - threadtitle.substr(0, 44).replace(/[^ 'A-Za-z0-9-]/g, '').length;
				threadtitle = threadtitle.substr(0, 44) + threadhref.substring(44-numofspecialchars, threadhref.length).replace(/-/g, ' ');
				divs[i].firstChild.replaceChild(document.createTextNode(threadtitle), divs[i].firstChild.firstChild);
			}
		}
		//== de-menarded ==
		//if(divs[i].className == 'post') {	
		//	divs[i].innerHTML = divs[i].innerHTML.replace(/menarded/g, 'pwned');
		//}


		//== ignore posts ==
		if(divs[i].className.indexOf('postcontainer') > -1) {	
			if(divs[i].childNodes[2].nodeType==1) { //view post page
				var authorraw = divs[i].childNodes[2].className.split(' ');	
			} else { //preview page
				var authorraw = divs[i].childNodes[1].className.split(' ');	
			}
			var author = authorraw[authorraw.length-1].toLowerCase();
			divs[i].className += ' '+author;
			if(currentcat != '') {
				divs[i].className += ' '+currentcat;
				divs[i].nextSibling.nextSibling.className += ' '+currentcat;
			}
			for(var l=1; l<ignored.length; l++) {
				if(author.replace('u_', '') == ignored[l]) {
					// divs[i].nextSibling.nextSibling.style.display='none'; divs[i].style.display='none';
					divs[i].nextSibling.nextSibling.className += ' blocked';
					divs[i].className += ' blocked';
					break;
				}
			}
		}

		//== ignore blog comments ==
		if(divs[i].className == 'blogcommentuser') {
			var author = divs[i].firstChild.nextSibling.innerHTML.toLowerCase().replace(/[ _]/g, '-');
			divs[i].parentNode.className += ' u_'+author;
			for(var l=1; l<ignored.length; l++) {
				if(author == ignored[l]) {
					//divs[i].parentNode.style.display='none';
					divs[i].parentNode.className += ' blocked';
					break;	
				}
			}		
		}

		//== ignore PMs ==
		if(document.location.href.indexOf('/messages')==-1 && divs[i].id == 'messageslabel') {
			if(divs[i].innerHTML.indexOf('<a') > -1 && document.getElementsByTagName('iframe').length==0) {
				var newiframe = document.createElement('iframe');
				newiframe.src='http://www.yayhooray.com/messages?greasemonkey';	
				newiframe.id='greasemonkeyiframe';
				newiframe.width = '1'; newiframe.height = '1';
				document.body.appendChild(newiframe);
			}
		}
		if(divs[i].className == 'fromline') {
			var author = divs[i].firstChild.innerHTML.toLowerCase().replace(/[ _]/g, '-');
			divs[i].parentNode.className += ' u_'+author;
			for(var l=1; l<ignored.length; l++) {
				if(author == ignored[l]) {
					if(divs[i].parentNode.className.indexOf('unread') > -1) { //mark read
						divs[i].parentNode.childNodes[1].firstChild.click(); selectedPMs++;	
					}
					divs[i].parentNode.style.display='none';
				}
			}		
		}

		//== remove 'last posted by' ==
		if(divs[i].className.indexOf('threadlastname') > -1) {	
			var author = divs[i].firstChild.innerHTML.toLowerCase().replace(/[ _]/g, '-');
			for(var l=1; l<ignored.length; l++) {
				if(author == ignored[l]) { divs[i].firstChild.removeAttribute('href'); divs[i].firstChild.innerHTML = 'somebody'; }
			}			
		}

		//== add 'ignore user' link ==
		if(divs[i].className.indexOf('useroptionblock') > -1) {
			var authorraw = divs[i].childNodes[1].firstChild.href;
			var author = authorraw.substr(7, authorraw.indexOf('.yay') - 7);
			var ignorelink = document.createElement('a');
			ignorelink.whotoignore = author;
			ignorelink.appendChild(document.createTextNode('Block all posts'));
			ignorelink.href= 'javascript:void(0);';
			ignorelink.onclick = function() {
				var oldignoredusers = '';
				var ca = document.cookie.split(';');
				for(var i=0; i<ca.length; i++) {
					while (ca[i].charAt(0)==' ') { ca[i] = ca[i].substring(1,ca[i].length); }
					if (ca[i].indexOf('ignoredusers=') == 0) { oldignoredusers = ca[i].substring(13,ca[i].length); }
				}
				if(oldignoredusers.indexOf('|'+this.whotoignore) == -1) {	//not already ignored
					newignoredusers = oldignoredusers+'|'+this.whotoignore;
					document.cookie = 'ignoredusers='+newignoredusers+'; expires=Thu, 9 Aug 2001 20:47:11 UTC; path=/; domain=www.yayhooray.com';
					document.cookie = 'ignoredusers='+newignoredusers+'; expires=Thu, 9 Aug 2012 20:47:11 UTC; path=/; domain=.yayhooray.com';
					var newrule = '.u_'+this.whotoignore+', .u_'+this.whotoignore+' + .postseperator { display:none !important }';
					document.styleSheets[1].insertRule(newrule,0);
				}
				eval('GM_registerMenuCommand("Unignore "+this.whotoignore, function() { whotounignore = "'+this.whotoignore+'"; for(var i=0; i<ca.length; i++) { while (ca[i].charAt(0)==" ") { ca[i] = ca[i].substring(1,ca[i].length); } if (ca[i].indexOf("ignoredusers=") == 0) { newignored = ca[i].substring(13,ca[i].length).replace("|"+whotounignore, ""); } } document.cookie = "ignoredusers="+newignored+"; expires=Thu, 9 Aug 2012 20:47:11 UTC; path=/; domain=.yayhooray.com"; document.location.reload(); });');
			}
			divs[i].insertBefore(ignorelink, divs[i].childNodes[5]);
		}

		if(divs[i].className == 'pinkiebuttons') {

			//== insert pinkies at cursor pos, not end ==
			pinkies = divs[i].getElementsByTagName('a');
			for(var j=0; j<pinkies.length; j++) {
				pinkies[j].onclick = function() {
					var ascii = this.href.substr(22, this.href.length-24);
					var caretback = 0;
					if(ascii.indexOf('=""') > -1) { caretback = ascii.length - ascii.indexOf('=""') - 2; }
					var myField = this.parentNode.nextSibling;
					var k = 0; while(myField.nodeName != 'TEXTAREA' && k < 10) { myField = myField.nextSibling; k++; }
					var selstart = myField.selectionStart; var selend = myField.selectionEnd;
					if(ascii.indexOf('<a') == 0) { 
						if(myField.value.substr(selend-1, 1) == ' ') { var linktext = myField.value.substring(selstart, selend-1); var addspace=' '; } else { var linktext = myField.value.substring(selstart, selend); var addspace='';}
						myField.value = myField.value.substring(0, selstart) + ascii.replace('</a>', '') + linktext + '</a>' + addspace + myField.value.substring(selend, myField.value.length);
					} else {
						myField.value = myField.value.substring(0, selstart) + ascii + myField.value.substring(selend, myField.value.length);
					}
					myField.focus(); myField.setSelectionRange(selstart+ascii.length-caretback, selstart+ascii.length-caretback);
					return false;
				}
			}

			//== quote feature ==
			var quotelink = document.createElement('a');
			quotelink.href='javascript:void(0)';
			quotelink.appendChild(document.createTextNode('quote'));
			quotelink.onclick = function() {
				var myField = this.parentNode.nextSibling;
				var k = 0; while(myField.nodeName != 'TEXTAREA' && k < 10) { myField = myField.nextSibling; k++; }

				var selstart = myField.selectionStart; var selend = myField.selectionEnd;

				if (window.getSelection() != '') {

					var sel = window.getSelection();
					var parnode = sel.getRangeAt(0).commonAncestorContainer.parentNode; var x = 0;
					while((parnode.nodeType != 1 || !parnode.className || parnode.className.indexOf('postcontainer') == -1) && x < 10) {
						if(parnode.parentNode) { parnode = parnode.parentNode; } else { x = 10; } x++;
					}
					if(x < 10) {	// quoting a post (found author)
						var anchor = parnode.firstChild.getAttribute('name');
						if(anchor == 'end') { anchor = parnode.childNodes[2].id; }
						var author = parnode.childNodes[2].childNodes[1].firstChild.innerHTML;		
						var toinsert = '<blockquote style="font-style:italic">'+author+': '+sel+'</blockquote>\n';
					} else {		// quoting random text from the page
						var toinsert = '<blockquote style="font-style:italic">'+sel+'</blockquote>\n';
					}

				} else if(selend > 0) { // wrapping textarea sel in quotes

					if(myField.value.substr(selend-1, 1) == ' ') { var selwithinarea = myField.value.substring(selstart, selend-1); var addspace=' '; } else { var selwithinarea = myField.value.substring(selstart, selend); var addspace='';}
					var toinsert = '<blockquote style="font-style:italic">' + selwithinarea + '</blockquote>' + addspace;

				} else { // nothing selected
					var toinsert = '<blockquote style="font-style:italic"></blockquote>';
				}			

				myField.value = myField.value.substring(0, selstart) + toinsert + myField.value.substring(selend, myField.value.length);
				myField.focus(); myField.setSelectionRange(selstart+toinsert.length, selstart+toinsert.length);

			}
			divs[i].appendChild(quotelink);
		}

		//== fix "view threads started by" ==
		if(divs[i].className == 'viewthreads') {
			var authorraw = divs[i].firstChild.innerHTML;
			var author = authorraw.substring(authorraw.indexOf('by ')+3, authorraw.length);
			if(author.toLowerCase() != author) {
				divs[i].firstChild.href = '/search?onlyuser='+author+'&exec=1&q=&qt=any&bn=5&intitle=1&startmonth=0&startday=0&startyear=0&endmonth=0&endday=0&endyear=0&cat1=1&1subcat1=183&1subcat2=5&1subcat3=6&1subcat4=7&1subcat5=8&1subcat6=9&1subcat7=10&1subcat8=11&1subcat9=12&1subcat10=2392&1subcat11=2393&totalsubcat1=11&cat2=2&2subcat1=13&2subcat2=14&2subcat3=15&2subcat4=16&2subcat5=17&totalsubcat2=5&cat3=3&3subcat1=18&3subcat2=19&3subcat3=20&3subcat4=21&totalsubcat3=4&cat4=4&4subcat1=22&4subcat2=23&4subcat3=24&4subcat4=25&4subcat5=26&totalsubcat4=5&totalcat=4';
			}
		}

	}

	if(selectedPMs > 0) { //mark ignored new PMs as read
		if(window.parent) { window.parent.greasemonkeyIgnoredNewPM(selectedPMs); }
		withSelected('mark_read');
	} 

	//== kill <embed> autostarts ==
	embedstokill = new Array();
	var embeds = document.getElementsByTagName('embed');
	for(var i=0;i<embeds.length;i++) {
		if((embeds[i].getAttribute('autostart') && embeds[i].getAttribute('autostart').toLowerCase() == 'true' || embeds[i].getAttribute('autostart') == '1') || (embeds[i].getAttribute('autoplay') && embeds[i].getAttribute('autoplay').toLowerCase() == 'true' || embeds[i].getAttribute('autoplay') == '1')) {
			var embedlink = document.createElement('a');
			embedlink.href = embeds[i].getAttribute('src');
			embedlink.appendChild(document.createTextNode('Removed autostarting media file'));
			embeds[i].parentNode.insertBefore(embedlink, embeds[i]);
			embedstokill[embedstokill.length] = embeds[i];
		}
	}
	for(var i=0;i<embedstokill.length;i++) {
		embedstokill[i].parentNode.removeChild(embedstokill[i]);
	}


	//== add mp3 download link ==
	var params = document.getElementsByTagName('param');
	for(var i=0;i<params.length;i++) {
		if(params[i].getAttribute('value').indexOf('/swf/mp3') == 0) {
			var mp3link = document.createElement('a');	
			var mp3linkraw = params[i].getAttribute('value');
			mp3link.href = mp3linkraw.substr(21, mp3linkraw.indexOf('&') - 21);
			var mp3image = document.createElement('img');
			mp3image.src = 'http://c3o.org/misc/yay/extensions/mp3download.gif';
			mp3link.appendChild(mp3image);	//document.createTextNode('link')
			var objtag = params[i].parentNode;
			if(objtag.nextSibling.nodeType == 1) {
				objtag.parentNode.insertBefore(mp3link, objtag.nextSibling);		
			} else {
				objtag.parentNode.appendChild(mp3link);
			}
		}
	}
	

	//== theme dropdown ==
	themes = new Array(
		new Array('Graphite (spiral)', 'http://pixilate.com/yh/graphite.css'), 
		new Array('Charamel (spiral)', 'http://pixilate.com/yh/charamel.css'), 
		new Array('Pixel (spiral)', 'http://pixilate.com/yh/pixel.css'), 
		new Array('Bellagio (Ken)', 'http://yay.kenwallacedesign.com/jba_yh.global.Ken_01.css'), 
		new Array('Dreamhooray (Down10)', 'http://www.down10.com/temp/yh/css/jba/dreamhooray.css'), 
		new Array('Gleaming Sterility (Down10)', 'http://www.down10.com/temp/yh/css/jba/gleaming.css'), 
		new Array('Pink+Beige (ruddyseal)', 'http://sam.ruddyseal.com/yayhooray/ruddyseal.css'), 
		new Array('Tabs Liquid (c3o)', 'http://c3o.org/misc/yay/styles/tabs-liquid.css'),
		new Array('Colors Liquid (c3o)', 'http://c3o.org/misc/yay/styles/colors-liquid.css')
	);

	if(document.location.href.indexOf('/themes') > -1) {
		var area = document.getElementsByTagName('textarea')[0];
		var themedropdown = document.createElement('select');
		themedropdown.appendChild(document.createElement('option'));
		for(var i=0;i<themes.length;i++) {
			var thisoption = document.createElement('option');
			thisoption.value = themes[i][1];
			thisoption.appendChild(document.createTextNode(themes[i][0]));
			themedropdown.appendChild(thisoption);
		}
		themedropdown.onchange = function() {
			if(area.value.indexOf('@import') > -1) {
				area.value = area.value.replace(/@import.*;/, '');
			}
			if(this.options[this.selectedIndex].value != '') {
				area.value = '@import "'+this.options[this.selectedIndex].value+'";\n' + area.value;
				document.getElementsByTagName('input')[0].click();
			}
		}
		var prefleft = document.getElementById('prefleft');
		prefleft.insertBefore(themedropdown, prefleft.firstChild)
		prefleft.childNodes[2].appendChild(document.createElement('br'));
		prefleft.childNodes[2].appendChild(document.createTextNode('To completely remove somebody\'s posts and threads they start, use: .u_their-name { display:none }'));
	}


	//if(window.location.hash.substring(1) == 'end' && document.getElementById('newposttext')) {
	//	document.getElementById('newposttext').focus();
	//}

	

	//== replace yaylite thread links with yh links ==
	if(document.location.href.indexOf('thread/') > -1) {
		var s = 'yhlite.com/thread.php?id=';	
		var r = 'yayhooray.com/thread/';
		for(var i=0;i<document.links.length;i++) {
			document.links[i].href = document.links[i].href.replace(s, r);	
		}
	}


	//document.title += ' - x';

})();


function greasemonkeyIgnoredNewPM(num) {
	if(document.getElementById('messagesnum')) {
		var currnumber = parseInt(document.getElementById('messagesnum').innerHTML);
		if(currnumber-num == 0) {
			document.getElementById('messageslabel').innerHTML = 'NO NEW MESSAGES';
		} else {
			document.getElementById('messagesnum').innerHTML = currnumber-num;
		}
	}
}