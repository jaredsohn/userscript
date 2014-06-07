// ==UserScript==
// @name           Post Preview for Ashun's Shacknews Chatty
// @namespace      http://phpcontrol.co.uk/greasemonkey/
// @description    Preview your posts before posting.
// @include        http://shacknews.com/*
// @include        http://*.shacknews.com/*
// ==/UserScript==
/*
	Author - Pieman
	
	@TODO
		- Continual improvement of parsing system.

	REVISIONS
	
	17-02-08
		- Initial Release.
	
	18-02-08
		- Added @include for subdomains
		- Create secondary script (-right) for right bias buttoners.
		- Code tag and urls now parse correctly.
		- Overflow set to auto.
	
	20-02-08 : dodob
		- Old i[italics]i tag support
		- Click on Preview Area to switch to Source view
	2008-03-06 : dodob
		- New *[bold]* tag support
		- Carriage returns now visible in Preview Area through CSS style hack.

*/

(function() {

	var previewStatus = 0;
	
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }

	function processSource(oldbs) {
		var benchmarkTimer = null;
		var scriptStartTime = getTime();
		
		var bs;
		bs = oldbs.replace(/&/g,"&amp;");
		bs = bs.replace(/</g,"&lt;");
		bs = bs.replace(/>/g,"&gt;");
		bs = bs.replace(/r{/g, '<span class="jt_red">');
		bs = bs.replace(/g{/g, '<span class="jt_green">');
		bs = bs.replace(/b{/g, '<span class="jt_blue">');
		bs = bs.replace(/y{/g, '<span class="jt_yellow">');
		bs = bs.replace(/e\[/g, '<span class="jt_olive">');
		bs = bs.replace(/l\[/g, '<span class="jt_lime">');
		bs = bs.replace(/n\[/g, '<span class="jt_orange">');
		bs = bs.replace(/p\[/g, '<span class="jt_pink">');
		bs = bs.replace(/q\[/g, '<span class="jt_quote">');
		bs = bs.replace(/s\[/g, '<span class="jt_sample">');
		bs = bs.replace(/-\[/g, '<span class="jt_strike">');
		bs = bs.replace(/}r|}g|}b|}y|\]e|\]l|\]n|\]p|\]q|\]s|\]-|\]o/g, "</span>");
		bs = bs.replace(/i\[/g, "<i>");
		bs = bs.replace(/\]i/g, "</i>");
		bs = bs.replace(/\/\[/g, "<i>");
		bs = bs.replace(/\]\//g, "</i>");
		bs = bs.replace(/b\[/g, "<b>");
		bs = bs.replace(/\]b/g, "</b>");
		bs = bs.replace(/\*\[/g, "<b>");
		bs = bs.replace(/\]\*/g, "</b>");
		bs = bs.replace(/_\[/g, "<u>");
		bs = bs.replace(/\]_/g, "</u>");
		bs = bs.replace(/o\[/g, '<span class="jt_spoiler" onclick="return doSpoiler( event );">');
		bs = bs.replace(/\/{{/g, '<pre class="jt_code">');
		bs = bs.replace(/}}\//g, "</pre>");
		bs = bs.replace(/\r\n/g,"<br>");
		bs = bs.replace(/\n/g,"<br>");
		bs = bs.replace(/\r/g,"<br>");
		bs = url2hyperlink(bs);

		GM_log();

		GM_log((getTime() - scriptStartTime) + 'ms');

		return bs;
	}
	
	function url2hyperlink(oldbs) {
		var bs;
		bs = oldbs.replace(/(https?:\/\/[^ |^<]+)/g, '<a href="$1" style=\"color:#AEAE9B;text-decoration:underline\" onmouseover=\"this.style.color=\'#FFF\';\" onmouseout=\"this.style.color=\'#AEAE9B\';\" target=\"_blank\">$1 </a>'); 
		return bs;
	}
	
	function viewPreview() {
		previewStatus = 1;
		document.getElementById('frm_body').style.display = 'none';
		document.getElementById('previewArea').style.display = 'block';
		document.getElementById('previewArea').innerHTML = processSource(document.getElementById('frm_body').value);
	}
	
	function viewSource() {
		previewStatus = 0;
		document.getElementById('frm_body').style.display = 'block';
		document.getElementById('previewArea').style.display = 'none';
	}
	
	function togglePreview(event) {
		if(event.target.id == 'previewButton') {
			if(previewStatus == 0) {
				event.stopPropagation();
	    		event.preventDefault();
				viewPreview();
			}
			else if (previewStatus == 1) {
				event.stopPropagation();
	    		event.preventDefault();
				viewSource();
			}
			else {
				alert('failboat has arrived.');
			}
			event.stopPropagation();
	    	event.preventDefault();
		}
		else if (event.target.id == 'previewArea') {
			if (previewStatus == 1) {
				event.stopPropagation();
				event.preventDefault();
				viewSource();
				document.getElementById('frm_body').focus();
			}
			event.stopPropagation();
	    	event.preventDefault();
		}
	}
	
	function insertPreviewButton() {
		var postButton = document.getElementById('frm_submit');
		if (postButton) {
			    var previewButton = document.createElement('button');
				previewButton.setAttribute('id','previewButton');
			    postButton.parentNode.insertBefore(previewButton, postButton);
				previewButton.innerHTML = "Preview";
			}
	}
	
	function createPreviewArea() {
		var previewArea, main;
		previewArea = document.createElement('div');
		previewArea.id = 'previewArea';
		previewArea.style.display = 'none';
		previewArea.style.padding = '0px 0px 0px 5px';
		previewArea.style.borderColor = '#A19D97';
		previewArea.style.borderWidth = 1+'px';
		previewArea.style.margin = 0+'px';
		previewArea.style.borderStyle = 'solid';
		previewArea.style.backgroundColor = '#000';
		previewArea.style.height = 203+'px';
		previewArea.style.width = 571+'px';
		previewArea.style.fontsize = 16+'px';
		previewArea.style.lineheight = 'normal';
		previewArea.style.overflow = 'auto';
		main = document.getElementById('frm_body');
		if (main) {
		    main.parentNode.insertBefore(previewArea, main);
		}
	}
	insertPreviewButton();
	createPreviewArea();
	window.addEventListener('click', togglePreview, true);

	GM_addStyle(<><![CDATA[
		#previewArea .jt_code br {
			display: block;
		}
	]]></>);
})();
