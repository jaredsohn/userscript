// ==UserScript==
// @name           Yahoo! Mail Konversation
// @namespace      http://userscripts.org/users/34766
// @description    View conversations and other related mails in the message header section when a mail is opened
// @include        http://*mail.yahoo.com/*
// ==/UserScript==

var dbg = false;

window.addEventListener('load', function()
{
	display();
}, true);

function getElementsByClass(searchClass,node,tag)
{
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++)
	{
		if ( pattern.test(els[i].className) )
		{
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function display()
{
	// creating new DOM element
	var rdiv = document.createElement('div');
	rdiv.setAttribute('id', 'ykmail');
	rdiv.setAttribute('style', 'font-family: verdana; font-size: 11px; font-style: normal; font-weight: 401; color: #7F7F7F; margin-top: 10px;');

	var head = getElementsByClass('msgheader', document, 'div')[0];
	if (head)
	{
		head.appendChild(rdiv);
		
		var str = document.getElementById('message_view_subject').textContent;
		if (dbg) console.log(str);
		
		// other mails related to this message need to be specified here
		if ((pos = str.search(/Re:/)) != -1)
		{
			str = str.substring(0, pos) + str.substring(pos+3);
			if (dbg) console.log(str);
		}
		if ((pos = str.search(/Fw:/)) != -1)
		{
			str = str.substring(0, pos) + str.substring(pos+3);
			if (dbg) console.log(str);
		}
		if ((pos = str.search(/Fwd:/)) != -1)
		{
			str = str.substring(0, pos) + str.substring(pos+4);
			if (dbg) console.log(str);
		}
		if (dbg) console.log(str);
		
		var segments = document.location.href.split('/');
		if (dbg) console.log(segments);
		_url = segments[0] + segments[1] + segments[2];
		
		var xhr =
		{
			method: 'GET',
			
			// the _url(farms) part of the whole url changes from user to user; the rest remains the same. If you find this to be not true then please mail me(karunasagark@yahoo.co.in) with the URL (the one which is responsible for searching mails)
			url: _url + '/y5/s/search?s="' + encodeURIComponent(str) + '"&stype=basic&view=message&nsrch=1&searchbutton=Search+Mail',
			
			onload: function(response){
				if (dbg) console.log('ykmail: response received\n' + response.responseText);
				
				// how can we build a DOM tree for the HTML received?
			
				var x = response.responseText.toString().split('<td class="subject"><p>');
				var xx = response.responseText.toString().split('<td class="fromname"><p title=');
				var xxx = response.responseText.toString().split('<td class="date"><p>');
				
				var max = Math.max(xxx.length, Math.max(x.length, xx.length));
				var innerhtml = '<hr><span style="font-size: 12px;"><b>Conversations/Related mails (' + (max-1).toString() + ')</b></span><br><br><div id="conv">';
				
				for (var i = 1; i < max; i++)
				{
					if (x[i])
					{
						var y = x[i].indexOf('</p>', 1);
						var subj = x[i].substring(0, y);
					}
					if (xx[i])
					{
						var yy = xx[i].indexOf('"', 1);
						var title = xx[i].substring(1, yy);
					}
					if (xxx[i])
					{
						var yyyy = xxx[i].indexOf('</p>');
						var dstamp = xxx[i].substring(0, yyyy);
					}
					
					innerhtml += 'Sender: ' + title + '<br>Subject: ' + subj + '<br>Date: ' + dstamp + '<br><br>';
				}
				innerhtml += '</div>';
				
				rdiv.innerHTML = innerhtml;
			}
		};
		
		GM_xmlhttpRequest(xhr);
	}
}

