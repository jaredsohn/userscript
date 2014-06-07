// ==UserScript==
// @name           	Free Download Manager
// @namespace      	FDM_Server
// @include        	http://yourfdmlinkhere.com
// @author			Paul Chen (Kaiyoti)
// ==/UserScript==

	addlinks = function(links, max){
		if(links[counter].indexOf("http://")!=-1)
		{
			$.get("adddownload.req", { URL : links[counter] },
				function(data){
					document.getElementById('multilinks').value = document.getElementById('multilinks').value.replace(links[counter] + "\n", "");
					if(counter < max){
						counter++;
						addlinks(links, max);
					}
					else{
						document.getElementById('multilinks').value = "Links added... Please refresh to see changes...";
					}
				}
			);
		}
		else if(counter < max){
			counter++;
			addlinks(links, max);				
		}
	}
	
	refreshlinks = function(){
		var domwrap = document.createElement('div');
		var source;
		var target;
		$.get(document.location.href, function(data){
			domwrap.innerHTML = data;
			source = domwrap.getElementsByTagName('table')[0];
			target = document.getElementsByTagName('table')[0];
			target.parentNode.replaceChild(source, target);
		});

	}
	
	unsafeWindow.refresh = refreshlinks;

	var counter = 0;
	var tx = document.createElement('span');
	tx.innerHTML = "<br/><hr width='100%' size='2'>Add new batch...<br/>";
	tx.setAttribute("style", "font-size: 14px; font-weight: bold;font-family: Verdana,Arial,Helvetica,sans-serif");
	var ta = document.createElement('textarea');
	ta.innerHTML = "\n\n\n\n\n\n\t\t\t\t\t\LOADING JQUERY...";
	ta.setAttribute('id', 'multilinks');
	ta.setAttribute('disabled', 'disabled');
	ta.setAttribute('style', 'width:800px; height: 200px');
	var sn = document.createElement('input');
	sn.setAttribute('type', 'button');
	sn.setAttribute('value', 'Add Links!');
	sn.setAttribute('disabled', 'disabled');
	sn.setAttribute('onClick', 'process()');
	
	var rf = document.createElement('input');
	rf.setAttribute('type', 'button');
	rf.setAttribute('value', 'Refresh');
	rf.setAttribute('disabled', 'disabled');
	rf.setAttribute('onClick', 'refresh()');	
	
	/* 	Taken out due to unclosed br tags.
		document.getElementsByTagName('p')[0].appendChild(document.createElement('br'));
		document.getElementsByTagName('p')[0].appendChild(rf);
	*/

	document.getElementById('form1').appendChild(document.createElement('br'));
	document.getElementById('form1').appendChild(tx);
	document.getElementById('form1').appendChild(ta);
	document.getElementById('form1').appendChild(document.createElement('br'));
	document.getElementById('form1').appendChild(sn);
	
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
		ta.removeAttribute("disabled");
		sn.removeAttribute("disabled");
		rf.removeAttribute("disabled");
		ta.innerHTML = "";
		unsafeWindow.process = function(){
			var links = $('#multilinks').val();
			links = links.split('\n');
			var count = links.length;
			counter = 0;
			
			addlinks(links, count - 1);
		}
    }