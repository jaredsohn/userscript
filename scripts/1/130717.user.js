// ==UserScript==
// @name           mitx-youtube-links
// @namespace      thomasloch
// @version        0.10
// @description    Extract list of youtube links 
// @include        https://6002x.mitx.mit.edu/courseware/*
// ==/UserScript==

/*

MITx Youtube Link Extractor
---------------------------

Extracts youtube links for an entire lecture sequence to use with
third party video downloading tools like JDownloader.

Usage notes:

1) Navigate to the Courseware section of the website.

2) Select the week in question, and the relevant lecture sequence.

3) If applicable, temporarily disable extensions like Flashblock that prevent
	the video from loading automatically.

4) Go to the Greasemonkey menu
	-> User Script Commands
	-> Extract youtube links

5) Watch the show. When the script is complete, you can copy the links
	out of the browser window and into your youtube video download
	tool of choice.

*/

unsafeWindow.console.log('Extract links loading... ');

var poll_timeout = 20;
var show_markdown_links = false;
var banner_background;
var banner_processing;
var banner_complete;

var video_items = Array();
var video_links = Array();
var counter = poll_timeout;
var interval_handle;
var body = document.getElementsByTagName('body')[0];
var last_link;

function fetch_complete() {

	// compile results
	var banner_contents = '<b><u>Complete!</u></b>';

	banner_contents += '<br><br>Youtube links:<br>';
	unsafeWindow.console.log(video_links);
	for(var x in video_links) {
		var l = video_links[x];
		banner_contents += '<br><a href="' + l.link + '">' + l.link + '</a> - ' + l.desc;
	}

	if(show_markdown_links) {
		var sidebar = document.getElementById('accordion');
		var sequence_title;
		var week_title;
		var items;

		items = sidebar.getElementsByTagName('li');
		for(var s, j = 0; (s = items[j]) != null; j++) {
			if(s.className == 'active') {
				sequence_title = s.getElementsByTagName('p')[0].innerHTML;
				break;
			}
		}

		items = sidebar.getElementsByTagName('h3');
		for(var s, j = 0; (s = items[j]) != null; j++) {
			if(s.className.match('ui-state-active')) {
				week_title = s.getElementsByTagName('a')[0].innerHTML;
				break;
			}
		}

		var title = week_title + ": " + sequence_title;
		
		banner_contents += '<br><br>Markdown links:<textarea style="font-family: monospace; height: 150px; width: 100%;">';
		banner_contents += title + "\n";
		banner_contents += Array(title.length + 1).join("-") + "\n\n";
		for(var x in video_links) {
			var l = video_links[x];
			banner_contents += ' - [' + l.link + '](' + l.link + ') - ' + l.desc + "\n";
		}
		banner_contents += '</textarea>';
	}

	banner_contents += '<br><br>';
	banner_complete.innerHTML = banner_contents;

	// add close button
	var control = document.createElement("input"); // Mute
	control.setAttribute('type', 'button');
	control.onclick = function() {
		banner_background.style.display = 'none';
		banner_processing.style.display = 'none';
		banner_complete.style.display = 'none';
	};
	control.value = 'Close and return to courseware';
	banner_complete.appendChild(control);

	// pop up full screen banner
	banner_processing.style.display = 'none';
	banner_complete.style.display = 'block';

	alert('Complete.');
}

function poll_links() {
	unsafeWindow.console.log('Poll... ' + counter);

	counter--;
	if(counter < 0) {
		clearInterval(interval_handle);
		alert('Something is not working right here! please try again and report a bug if this issue persists. Reload the page to get back to normal courseware.');
		return;
	}

	// find player... we need that one to update anything!
	var pw = document.getElementById('myytplayer');
	if(!pw) return;
	var player = XPCNativeWrapper.unwrap(pw);
	player.pauseVideo();

	var link = player.getVideoUrl();

	if(last_link && (link==last_link)) return;
	last_link = link;
	link = link.replace('&feature=player_embedded', '');
	unsafeWindow.console.log('Link: ' + link);

	var h1 = document.getElementsByTagName('h1');
	var desc = h1[1].innerHTML;

	video_links.push({link: link, desc: desc});

	unsafeWindow.console.log('commencing...');
	var v = video_items.shift();
	unsafeWindow.console.log(v);

	if(!v) {
		unsafeWindow.console.log('Complete (1)');
		clearInterval(interval_handle);
		fetch_complete();
	} else {
		// select next item and schedule polling event
		v.click();
		counter = poll_timeout;
	}
}

function fetch_links() {

	// pop up full screen banner
	banner_background.style.display = 'block';
	banner_processing.style.display = 'block';

	// figure out how many sequence items we have
	video_items = Array();
	var v = document.getElementsByTagName('a');
	for(var e, j = 0; (e = v[j]) != null; j++) {
		if(!e.getAttribute('class')) continue;
		if(e.getAttribute('class').match('seq_video_')) {
			video_items.push(e);
		}
	}

	unsafeWindow.console.log('found videos: ');
	unsafeWindow.console.log(video_items);

	if(!video_items) return;

	// select first item and schedule polling event
	video_items.shift().click();

	video_links = Array();
	counter = poll_timeout;
	last_link = '';
	interval_handle = setInterval(poll_links, 1000);
}


var body = document.getElementsByTagName('body')[0];

// inject some extra CSS classes
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
head.appendChild(style);

style.innerHTML =
	'body {margin:0; padding:0; height:100%;}' +
	'div.ytlinks_banner_background {' +
		'position:absolute; left:0px; top:0px; width:100%; height:100%; ' +
	    'background-color:#2861ae; z-index:3; padding: 100px;' +
		'opacity: .5; display: none;' +
	'}' +
	'div.ytlinks_banner_processing {' + 
		'position:absolute; top:40px; left:40px; width:250px; z-index:4; ' +
		'border: 5px solid red; background-color: white; vertical-align: center;' +
		'margin: 10px; padding: 10px; display: none;' +
		'text-align: center; vertical-align: top; font-size: 200%; font-weight: bold;' +
	'}' +
	'div.ytlinks_banner_complete {' + 
		'position:absolute; top:40px; left:40px; width:40%; max-height: 60%; z-index:4; ' +
		'border: 5px solid green; background-color: white; vertical-align: center;' +
		'margin: 10px; padding: 10px; display: none;' +
		'text-align: left; vertical-align: top; overflow: auto;' +
	'}' +
'';


banner_background = document.createElement("div");
banner_background.setAttribute('class', 'ytlinks_banner_background');
body.appendChild(banner_background);

banner_processing = document.createElement("div");
banner_processing.setAttribute('class', 'ytlinks_banner_processing');
banner_processing.innerHTML = 'Collecting youtube links - please do not touch anything until the process is complete!';
body.appendChild(banner_processing);

banner_complete = document.createElement("div");
banner_complete.setAttribute('class', 'ytlinks_banner_complete');
body.appendChild(banner_complete);


GM_registerMenuCommand("Extract youtube links for lecture sequence", fetch_links);

