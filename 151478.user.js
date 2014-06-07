// ==UserScript==
// @name			Google Tool
// @namespace			http://userscripts.org/users/Devon
// @description			Turn search into your slave.
// @version			20121114
// @include			http*://*google.tld/*
// @include			http*://*google.com/*
// @include			http://userscripts.org/scripts/show/151478*
// @exclude			*books.google*
// @exclude			*google*/calendar*
// @exclude			*docs.google*
// @exclude			*drive.google*
// @exclude			*google*/finance*
// @exclude			*groups.google*
// @exclude			*history.google*
// @exclude			*mail.google*
// @exclude			*maps.google*
// @exclude			*news.google*
// @exclude			*plus.google*
// @exclude			*google*/reader*
// @exclude			*google*/shopping*
// @copyright			2012+, Devon Hess
// @license			GPLv3+; http://www.gnu.org/copyleft/gpl.html
// @grant			GM_deleteValue
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_info
// ==/UserScript==
var d=[
'w<gt>Book<gt>b<gt> (doc|docx|odf|pdf|txt) %d%',
'w<gt>Comic<gt>c<gt> (cb7|cba|cbr|cbt|cbz) %d%',
'w<gt>Directory<gt>n<gt> %d%',
'w<gt>Flash<gt>s<gt> filetype:swf',
'w<gt>Hidden<gt>h<gt> site:tor2web.com | site:tor2web.org | site:onion.to inurl:tor2web | inurl:onion.to',
'w<gt>Music<gt>m<gt> (flac|mp3|ogg|wav) %d% -inurl -mp3toss.com -vmp3.eu',
'w<gt>Rom<gt>r<gt> (bin|gb|gba|gcm|iso|n64|nds|nes|rar|smc|smd|v64|z64|zip) rom %d%',
'w<gt>Torrent<gt>t<gt> filetype:torrent',
'w<gt>Video<gt>o<gt> (avi|mkv|mp4|ogm|wmv) %d% -topicalarticles -trimediacentral',
'a<gt>Bing<gt><gt>window.location=\'http://www.bing.com/search?q=\'+%u%;',
'a<gt>Google Music<gt><gt>window.location=\'https://play.google.com/music/listen#\'+%u%+\'_sr\';',
'a<gt>History<gt>h<gt>window.location=\'https://history.google.com/history/find?q=\'+%u%;',
'a<gt>JavaScript<gt>j<gt>if(%q%==\'\'){alert(\'Type JavaScript in the search bar.\');}else{eval(%q%)};%r%;',
'a<gt>Proxy<gt>p<gt>%q%+=\' inurl:"nph-proxy.cgi" start using cgiproxy browsing through this CGI-based proxy\';%s%;',
'a<gt>Translate<gt><gt>window.location=\'http://translate.google.com/?q=\'+%u%;',
'a<gt>Trends<gt><gt>window.location=\'http://www.google.com/trends/explore#q=\'+%u%;',
'a<gt>Webcam<gt><gt>%q%+=\' intitle:"Live View AXIS" | inurl:"control/userimage" | inurl:"viewerframe?mode=motion" -inurl -intitle\';%s%;',
'a<gt>Wikipedia<gt>w<gt>window.location=\'http://en.wikipedia.org/w/index.php?search=\'+%u%;',
'a<gt>Wolfram<gt>a<gt>window.location=\'http://www.wolframalpha.com/input/?i=\'+%u%;',
'a<gt>Yahoo!<gt><gt>window.location=\'http://search.yahoo.com/search?q=\'+%u%;',
's<gt>Anagram 1<gt><gt>Anagram',
's<gt>Anagram 2<gt><gt>Define Anagram',
's<gt>Bacon<gt><gt>Kevin Bacon\'s Bacon Number',
's<gt>Baker\'s Dozen<gt><gt>baker\'s dozen',
's<gt>Barrel Roll<gt><gt>Do a Barrel Roll',
's<gt>Beard<gt><gt>beard-second',
's<gt>Binary<gt><gt>Binary',
's<gt>Blintz<gt><gt>blintz to grams',
's<gt>Blue Moon<gt><gt>once in a blue moon',
's<gt>Chuck<gt><gt>Chuck Norris',
's<gt>Conway<gt><gt>Conway\'s Game of Life',
's<gt>Donkey<gt><gt>Donkeypower',
's<gt>Firkin<gt><gt>firkin',
's<gt>Fortnight<gt><gt>fortnight',
's<gt>Furlong<gt><gt>furlong',
's<gt>Guide<gt><gt>the answer to life the universe and everything',
's<gt>Hella-<gt><gt>hellameters to meters',
's<gt>Hello<gt><gt>Lionel Richie',
's<gt>Hexadecimal<gt><gt>Hexadecimal',
's<gt>Kerning<gt><gt>Kerning',
's<gt>Lonely<gt><gt>loneliest number',
's<gt>Ngogn<gt><gt>ngogn',
's<gt>Octal<gt><gt>Octal',
's<gt>Potrzebie<gt><gt>Potrzebie',
's<gt>Recursion<gt><gt>Recursion',
's<gt>Smoot<gt><gt>smoot to feet',
's<gt>Tilt<gt><gt>Tilt',
's<gt>Unicorn<gt><gt>number of horns on a unicorn',
's<gt>Zerg Rush<gt><gt>Zerg Rush',
'l<gt>Angry<gt><gt>Angry Birds Chrome',
'l<gt>Animals<gt><gt>Google Translate for Animals',
'l<gt>Beatbox<gt><gt>pv zk bschk Google Translate',
'l<gt>CADIE<gt><gt>CADIE',
'l<gt>Capture<gt><gt>Capture the Map',
'l<gt>Chef<gt><gt>Bork! Google',
'l<gt>ChromeLite<gt><gt>ChromeLite',
'l<gt>Chromercise<gt><gt>Chromercise',
'l<gt>Chuck<gt><gt>Find Chuck Norris',
'l<gt>Cloud<gt><gt>Upload and store anything in the cloud with Google Docs',
'l<gt>Comic Sans<gt><gt>Comic Sans for Everyone',
'l<gt>Day<gt><gt>A Google a Day',
'l<gt>Dilbert<gt><gt>Google Dilbert',
'l<gt>Doodles<gt><gt>',
'l<gt>Earth<gt><gt>Google Earth Clock',
'l<gt>Elmer Fudd<gt><gt>Ewmew Fudd Google',
'l<gt>GBlimps<gt><gt>gBlimps',
'l<gt>GDay<gt><gt>Google gDay',
'l<gt>Gizoogle<gt><gt>Gizoogle',
'l<gt>Gmail Time<gt><gt>Gmail Custom Time',
'l<gt>Googlism<gt><gt>Googlism',
'l<gt>Goth<gt><gt>Googoth',
'l<gt>Gravity<gt><gt>Google Gravity',
'l<gt>Green<gt><gt>Google Talk goes green',
'l<gt>Gulp<gt><gt>Google Gulp',
'l<gt>Gwigle<gt><gt>Gwigle',
'l<gt>Hacker<gt><gt>Google Hacker',
'l<gt>Heart<gt><gt>Google "Heart"',
'l<gt>Klingon<gt><gt>Klingon Google',
'l<gt>Lego<gt><gt>Build with Chrome',
'l<gt>Les Paul<gt><gt>Les Paul\'s 96th Birthday Google',
'l<gt>MentalPlex<gt><gt>MentalPlex Google',
'l<gt>Moog<gt><gt>Robert Moog\'s 78th Birthday Google',
'l<gt>Motion 1<gt><gt>Gmail Motion',
'l<gt>Motion 2<gt><gt>Google Docs Motion',
'l<gt>PAC-MAN<gt><gt>30th Anniversary of PAC-MAN Google',
'l<gt>Paper<gt><gt>Gmail Paper',
'l<gt>Pig Latin<gt><gt>Pig Latin Google',
'l<gt>PigeonRank<gt><gt>Google PigeonRank',
'l<gt>Pirate<gt><gt>Google Pirate',
'l<gt>Romance<gt><gt>Google Romance site:http://www.google.com/onceuponatime',
'l<gt>Smell<gt><gt>Google Book Search now smells better',
'l<gt>Space<gt><gt>Google "Space"',
'l<gt>Sphere<gt><gt>Google Sphere',
'l<gt>Store<gt><gt>Google Store',
'l<gt>Teleport<gt><gt>Google 穿越搜索',
'l<gt>TiSP<gt><gt>Google TiSP',
'l<gt>Virgle<gt><gt>Virgle',
'l<gt>Voicemail<gt><gt>Google Voice Standard Voicemail',
'l<gt>Zeitgeist<gt><gt>Google Zeitgeist'
].join('\n');
if (!/http:\/\/userscripts.org\/scripts\/show\/151478/.test(window.location) && document.getElementById('gbqfbw') !== null && document.getElementById('disp') == null) {
    // Create Bases
	var sel = '<select id="pri" onchange="document.getElementById(\'gbqf\').setAttribute(\'onsubmit\',\'document.getElementById(\\\'gbqfq\\\').value+= \\\'\'+this.value+\'\\\';\'+document.getElementById(\'gbqf\').getAttribute(\'onsubmit\').replace(/.*;(.*)?;/,\' $1;\'));document.getElementById(\'gbqfq\').focus();"><option>Web</option></select>';
	sel += '<select id="sec" onchange="eval(this.value);"><option>Action</option></select>'
	sel += '<select id="ter" onchange="document.getElementById(\'gbqfq\').value=this.value;document.getElementById(\'gbqf\').submit();" onfocus="this.firstChild.setAttribute(\'disabled\',\'\')"><option>Special</option></select>';
	sel += '<select id="qua" onchange="document.getElementById(\'gbqfq\').value=this.value;window.location=\'https://google.com/search?btnI&q=\'+this.value;" onfocus="this.firstChild.setAttribute(\'disabled\',\'\')"><option>Lucky</option></select>';
	var disp = '<span id="disp" onmousedown="if(document.getElementById(\'cont\').style.display==\'inline\'){this.style.backgroundPosition=\'-127px -102px\'}else{this.style.backgroundPosition=\'-127px -91px\'}" onmouseout="if(document.getElementById(\'cont\').style.display==\'inline\'){this.style.backgroundPosition=\'-127px -91px\'}else{this.style.backgroundPosition=\'-127px -102px\'}" onclick="if(document.getElementById(\'cont\').style.display==\'inline\'){document.getElementById(\'cont\').style.display=\'none\';this.style.backgroundPosition=\'-127px -102px\';}else{document.getElementById(\'cont\').style.display=\'inline\';this.style.backgroundPosition=\'-127px -91px\';}" style="position: relative;top: 2px;cursor: pointer; width: 10px; height: 10px; background-image: url(https://www.google.com/images/nav_logo114.png); display: inline-block; background-position: -127px -91px; "></span>';
	document.getElementById('gbqfbw').outerHTML += ' '+disp+'<span id="cont" style="display: inline"><br>'+sel+'</span>';
	document.getElementById('fll').innerHTML += '<a href="http://userscripts.org/scripts/show/151478">Tool Settings</a>';
	// Set Selected Settings
	if (typeof GM_deleteValue !== "undefined") {
		if (GM_getValue('show',1)==0) {
			document.getElementById('cont').style.display='none';
			document.getElementById('disp').style.backgroundPosition='-127px -102px';
		}
		if (GM_getValue('style',0)==1) {
			document.getElementById('pri').setAttribute('class','gbqfba');
			document.getElementById('sec').setAttribute('class','gbqfba');
			document.getElementById('ter').setAttribute('class','gbqfba');
			document.getElementById('qua').setAttribute('class','gbqfba');
		}
		if (GM_getValue('pri',1)==0) {
			document.getElementById('pri').style.display="none";
		}
		if (GM_getValue('sec',1)==0) {
			document.getElementById('sec').style.display="none";
		}
		if (GM_getValue('ter',1)==0) {
			document.getElementById('ter').style.display="none";
		}
		if (GM_getValue('qua',1)==0) {
			document.getElementById('qua').style.display="none";
		}
		document.getElementById('disp').addEventListener('click',function(){if(document.getElementById('cont').style.display=='inline'){GM_setValue('show',1)}else{GM_setValue('show',0)}});
	}
	// Create Selectors
	// Search
	function ssel(n, a, s) {
		s = s.replace(/%d%/g, 'intitle:"index of" "last modified" "parent directory" description size -inurl:(htm|html|php)');
		s = s.replace(/"/g, '&quot;');
		document.getElementById('pri').innerHTML += '<option value="' + s + '" accesskey="' + a + '">' + n + '</option>';
	}
	// Action
	function asel(n, a, s) {
		s = s.replace(/"/g, '&quot;');
		s = s.replace(/%f%/g, 'document.getElementById(\'gbqfq\').focus()');
		s = s.replace(/%q%/g, 'document.getElementById(\'gbqfq\').value');
		s = s.replace(/%r%/g, 'this.outerHTML=this.outerHTML');
		s = s.replace(/%s%/g, 'document.getElementById(\'gbqf\').submit()');
		s = s.replace(/%u%/g, 'document.getElementById(\'gbqfq\').value.replace(/#/g,\'%23\').replace(/&/g,\'%26\').replace(/\\+/g,\'%2B\').replace(/\\//g,\'%2F\').replace(/=/g,\'%3D\').replace(/\\?/g,\'%3F\')');
		document.getElementById('sec').innerHTML += '<option value="' + s + '" accesskey="' + a + '">' + n + '</option>';
	}
	// Special
	function esel(n, a, s) {
		s = s.replace(/"/g, '&quot;');
		document.getElementById('ter').innerHTML += '<option value="' + s + '" accesskey="' + a + '">' + n + '</option>';
	}
	//Lucky
	function lsel(n, a, s) {
		s = s.replace(/"/g, '&quot;');
		document.getElementById('qua').innerHTML += '<option value="' + s + '" accesskey="' + a + '">' + n + '</option>';
	}
	var item;
	if (typeof GM_deleteValue !== "undefined") {
		var list=GM_getValue('user',d);
	} else {
		var list=d;
	}
	for (var i=0;i<list.split('\n').length;i++) {
		if (GM_getValue('alpha',0)==1 && typeof GM_deleteValue !== "undefined") {
			item = list.split('\n').sort()[i].split('<gt>');
		} else {
			item = list.split('\n')[i].split('<gt>');
		}
		if (item[0]=='w' && item.length == 4) {
			ssel(item[1],item[2],item[3]);
		} else if (item[0]=='a' && item.length == 4) {
			asel(item[1],item[2],item[3]);
		} else if (item[0]=='s' && item.length == 4) {
			esel(item[1],item[2],item[3]);
		} else if (item[0]=='l' && item.length == 4) {
			lsel(item[1],item[2],item[3]);
		}
	}
} else if (/http:\/\/userscripts.org\/scripts\/show\/151478/.test(window.location) && document.getElementById('optshe') == null) {
	// Settings
	if (typeof GM_deleteValue !== "undefined") {
		document.title = 'Google Tool Settings';
		var opt = '<input id="opt1" type="checkbox" style="width:auto;">Show Tool';
		opt += '<br><input id="opt2" type="checkbox" style="width:auto;">Stylize (May not work)';
		opt += '<br><input id="opt3" type="checkbox" style="width:auto;">Alphabetize';
		opt += '<br><br><input id="opt4" type="checkbox" style="width:auto;">Show Search';
		opt += '<br><input id="opt5" type="checkbox" style="width:auto;">Show Actions';
		opt += '<br><input id="opt6" type="checkbox" style="width:auto;">Show Special';
		opt += '<br><input id="opt7" type="checkbox" style="width:auto;">Show Lucky';
		var save = '<input id="save" style="width:70%" type="button" value="Saved" disabled><input id="reset" style="width:30%" type="button" value="Reset">';
		document.getElementById('script_sidebar').innerHTML = '<fieldset style="background:#EEE;"><legend>Settings:</legend><span id="optshe" onclick="document.getElementById(\'save\').value=\'Save\';document.getElementById(\'save\').removeAttribute(\'disabled\');">'+opt+'</span><br><br>'+save+'</fieldset><p><a href="https://google.com/">back to google</a></p>'+document.getElementById('script_sidebar').innerHTML;
		// Check Version
		if (typeof GM_info !== "undefined") {
			if (parseFloat(document.getElementById('summary').getElementsByTagName('p')[1].innerHTML.replace(/\n<b>Version:<\/b>\n(.*)/,'$1')) == GM_info.script.version) {
				document.getElementById('summary').getElementsByTagName('p')[1].outerHTML = '<p class="notice success"><span><b>Version</b> '+GM_info.script.version+'</span></p>';
			} else if (parseFloat(document.getElementById('summary').getElementsByTagName('p')[1].innerHTML.replace(/\n<b>Version:<\/b>\n(.*)/,'$1')) > GM_info.script.version) {
				document.getElementById('summary').getElementsByTagName('p')[1].outerHTML = '<p class="notice error"><span><b>Version:</b> '+GM_info.script.version+' / <a href="'+document.getElementsByClassName('userjs')[0].href+'">'+document.getElementById('summary').getElementsByTagName('p')[1].innerHTML.replace(/\n<b>Version:<\/b>\n(.*)/,'$1')+'</a></span></p>';
			} else {
				document.getElementById('summary').getElementsByTagName('p')[1].outerHTML = '<p class="notice info"><span><b>Version:</b> '+GM_info.script.version+' / <a href="'+document.getElementsByClassName('userjs')[0].href+'">'+document.getElementById('summary').getElementsByTagName('p')[1].innerHTML.replace(/\n<b>Version:<\/b>\n(.*)/,'$1')+'</a></span></p>';
			}
		}
		// Warning
		//document.getElementById('summary').outerHTML = '<p class="notice attention"><span>TEXT</span></p>'+document.getElementById('summary').outerHTML;
		// Create Preview
		var butsty = '-webkit-box-align: center;-webkit-rtl-ordering: logical;-webkit-user-select: none;background-attachment: scroll;background-clip: border-box;background-color: whiteSmoke;background-image: -webkit-linear-gradient(top, whiteSmoke, #F1F1F1);background-origin: padding-box;border-bottom-color: rgba(0, 0, 0, 0.0976563);border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;border-bottom-style: solid;border-bottom-width: 1px;border-left-color: rgba(0, 0, 0, 0.0976563);border-left-style: solid;border-left-width: 1px;border-right-color: rgba(0, 0, 0, 0.0976563);border-right-style: solid;border-right-width: 1px;border-top-color: rgba(0, 0, 0, 0.0976563);border-top-left-radius: 2px;border-top-right-radius: 2px;border-top-style: solid;border-top-width: 1px;box-sizing: border-box;color: #444;cursor: default;display: inline-block;font-family: Arial;font-size: 11px;font-style: normal;font-variant: normal;font-weight: bold;height: 29px;letter-spacing: normal;line-height: normal;margin-left: 2px;margin-right: 2px;max-width: none;min-width: 54px;padding-bottom: 0px;padding-left: 8px;padding-right: 8px;padding-top: 0px;position: static;text-align: center;text-decoration: none;text-indent: 0px;text-shadow: none;text-transform: none;top: auto;vertical-align: baseline;white-space: pre;word-spacing: 0px;';
		var pr = '<div style="border:1px solid #CCC;"><div style="margin-top:5px;text-align:center;"><img src="http://google.com/images/srpr/logo3w.png"></div><div style="margin-left:auto;margin-right:auto;width:500px;"><input style="width:95%;"> <span id="disp" onmousedown="this.style.backgroundPosition=\'-127px -102px\'" onmouseout="this.style.backgroundPosition=\'-127px -91px\'" style="cursor: pointer; width: 10px; height: 10px; background-image: url(https://www.google.com/images/nav_logo114.png); display: inline-block; background-position: -127px -91px; " onmouseup="this.style.backgroundPosition=\'-127px -91px\'"></span><select id="pri"><option>Web</option></select> <select id="sec"><option>Action</option></select> <select id="ter"><option>Special</option></select> <select id="qua"><option>Lucky</option></select></div><div style="text-align:center"><button style="margin-top: 15px;margin-bottom: 5px;'+butsty+'">Google Search</button><button style="margin-top: 15px;margin-bottom: 5px;'+butsty+'margin-left:10px;">I\'m Feeling Lucky</button></div></div>';
		pr += '<table><tbody><tr><th colspan="5"><span>Defined Selections</span>';
		pr += '<textarea id="export" onmousedown="this.select();" rows="1" style="overflow:hidden;height:1px;background: #333;color: white;font-size: 1em;border: 1px solid #222;max-width:530px;min-width:530px;position:relative;top:3px;margin-left:10px;"></textarea>';
		pr += '<span onmousedown="return false" style="cursor:pointer;margin-left:14px;" onclick="if(document.getElementById(\'define\').style.display==\'\'){document.getElementById(\'define\').style.display=\'none\';this.innerHTML=\'⬒\';}else{document.getElementById(\'define\').style.display=\'\';this.innerHTML=\'⬓\';}">⬒</span>';
		pr += '</th></tr></tbody><tbody id="define" style="display:none;"><tr><th>▾</th><th style="text-align: center;">Name</th><th style="text-align:center;padding: 0px;font-size:16px;font-weight: normal;">⌨</th><th style="text-align: center;">String</th><th style="text-align: center;"><span onmousedown="return false" style="position:relative;top:1px;cursor:pointer;" id="add">✚</span></tr></th></tbody></table>';
		document.getElementById('summary').outerHTML = pr+document.getElementById('summary').outerHTML;
		var list=GM_getValue('user',d);
		var lista=list.split('\n');
		var item;
		var cell;
		// On Export Change
		document.getElementById('export').addEventListener('change', function(){
			if (document.getElementById('export').value == '') {
				lista=['<gt><gt><gt>'];
			} else {
				lista = document.getElementById('export').value.split('\n');
			}
			dlist();
			document.getElementById('save').value = 'Save';
			document.getElementById('save').removeAttribute('disabled');
		});
		// On Export Click
		document.getElementById('export').addEventListener('mousedown', function(){
			document.getElementById('save').value = 'Save';
			document.getElementById('save').removeAttribute('disabled');
		});
		// On ✚ Press
		var t1;
		var t2;
		var t3;
		var t4;
		function plus() {
			document.getElementById('add').addEventListener('click', function(){
				t1 = document.getElementById('select'+(it.length-1)).value;
				t2 = document.getElementById('name'+(it.length-1)).value;
				t3 = document.getElementById('key'+(it.length-1)).value;
				t4 = document.getElementById('string'+(it.length-1)).value;
				cell = '<tr id="row'+it.length+'">';
				cell += '<td style="padding: 1px;"><input id="select'+it.length+'" onclick="this.select();" value="" maxlength="1" style="margin-left:5px;width:13px;border:thin solid lightgrey"></td>';
				cell += '<td style="padding: 1px;"><textarea id="name'+it.length+'" rows="1" style="height:100%;max-width:100px;min-width:100px;" placeholder="Name"></textarea></td>';
				cell += '<td style="padding: 1px;"><input id="key'+it.length+'" onclick="this.select();" value="" maxlength="1" style="margin-left:3px;width:13px;border:thin solid lightgrey"></td>';
				cell += '<td style="padding: 1px;"><textarea id="string'+it.length+'" rows="1" style="height:100%;max-width:490px;min-width:490px;" placeholder="String"></textarea></td>';
				cell += '<td style="padding: 1px;"><span id="up'+it.length+'" style="cursor:pointer;color:#F80;">▲</span>';
				cell += '<span id="down'+it.length+'" style="cursor:pointer;color:#F80;position:relative;bottom:-1px;">▼</span>';
				cell += '<span id="del'+it.length+'" style="cursor:pointer;color:#C00;position:relative;left:1px;bottom:-1px;">✖</span></td>';
				cell += '</tr>';
				document.getElementById('row'+(it.length-1)).outerHTML += cell;
				it.push(it.length);
				// Listen for Events
				for (var i=it.length-2;i<it.length;i++) {
					// On Select Change
					document.getElementById('select'+it[i]).addEventListener('keyup', function(){
						wlist();
					});
					// On Name Change
					document.getElementById('name'+it[i]).addEventListener('keyup', function(){
						wlist();
					});
					// On Key Change
					document.getElementById('key'+it[i]).addEventListener('keyup', function(){
						wlist();
					});
					// On String Change
					document.getElementById('string'+it[i]).addEventListener('keyup', function(){
						wlist();
					});
					// On Up
					document.getElementById('up'+it[i]).addEventListener('click', function(){
						if (this.id.replace('up','')!=='0') {
							swi = document.getElementById(this.id.replace('up','select')).value;
							document.getElementById('select'+this.id.replace('up','')).value = document.getElementById('select'+String(parseInt(this.id.replace('up',''))-1)).value;
							document.getElementById('select'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
							swi = document.getElementById(this.id.replace('up','name')).value;
							document.getElementById('name'+this.id.replace('up','')).value = document.getElementById('name'+String(parseInt(this.id.replace('up',''))-1)).value;
							document.getElementById('name'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
							swi = document.getElementById(this.id.replace('up','key')).value;
							document.getElementById('key'+this.id.replace('up','')).value = document.getElementById('key'+String(parseInt(this.id.replace('up',''))-1)).value;
							document.getElementById('key'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
							swi = document.getElementById(this.id.replace('up','string')).value;
							document.getElementById('string'+this.id.replace('up','')).value = document.getElementById('string'+String(parseInt(this.id.replace('up',''))-1)).value;
							document.getElementById('string'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
							wlist();
						}
					});
					// On Down
					document.getElementById('down'+it[i]).addEventListener('click', function(){
						if (this.id.replace('down','')!=it.length-1) {
							swi = document.getElementById(this.id.replace('down','select')).value;
							document.getElementById('select'+this.id.replace('down','')).value = document.getElementById('select'+String(parseInt(this.id.replace('down',''))+1)).value;
							document.getElementById('select'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
							swi = document.getElementById(this.id.replace('down','name')).value;
							document.getElementById('name'+this.id.replace('down','')).value = document.getElementById('name'+String(parseInt(this.id.replace('down',''))+1)).value;
							document.getElementById('name'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
							swi = document.getElementById(this.id.replace('down','key')).value;
							document.getElementById('key'+this.id.replace('down','')).value = document.getElementById('key'+String(parseInt(this.id.replace('down',''))+1)).value;
							document.getElementById('key'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
							swi = document.getElementById(this.id.replace('down','string')).value;
							document.getElementById('string'+this.id.replace('down','')).value = document.getElementById('string'+String(parseInt(this.id.replace('down',''))+1)).value;
							document.getElementById('string'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
							wlist();
						}
					});
					// On Delete
					document.getElementById('del'+it[i]).addEventListener('click', function(){
						if (it.length!==1) {
							if (parseInt(this.id.replace('del',''))==it.length-1) {
								document.getElementById('row'+this.id.replace('del','')).outerHTML = '';
								it.splice(it.length-1,1);
								wlist();	
							} else {
								for (var i=parseInt(this.id.replace('del',''));i<it.length;i++) {
									document.getElementById('select'+i).value = document.getElementById('select'+(i+1)).value;
									document.getElementById('name'+i).value = document.getElementById('name'+(i+1)).value;
									document.getElementById('key'+i).value = document.getElementById('key'+(i+1)).value;
									document.getElementById('string'+i).value = document.getElementById('string'+(i+1)).value;
									if (i==it.length-2) {
										document.getElementById('row'+(i+1)).outerHTML = '';
										it.splice(it.length-1,1);
										wlist();
									}
								}
							}
						} else {
							lista=['<gt><gt><gt>'];
							dlist();
							document.getElementById('save').value = 'Save';
							document.getElementById('save').removeAttribute('disabled');
						}
					});
				}
				for (var i=it.length;i>0;i=i-1) {
					if (i-1>0) {
						document.getElementById('select'+parseInt(i-1)).value = document.getElementById('select'+parseInt(i-2)).value;
						document.getElementById('name'+parseInt(i-1)).value = document.getElementById('name'+parseInt(i-2)).value;
						document.getElementById('key'+parseInt(i-1)).value = document.getElementById('key'+parseInt(i-2)).value;
						document.getElementById('string'+parseInt(i-1)).value = document.getElementById('string'+parseInt(i-2)).value;
					} else {
						document.getElementById('select0').value = '';
						document.getElementById('name0').value = '';
						document.getElementById('key0').value = '';
						document.getElementById('string0').value = '';
					}
				}
				document.getElementById('select'+(it.length-1)).value = t1;
				document.getElementById('name'+(it.length-1)).value = t2;
				document.getElementById('key'+(it.length-1)).value = t3;
				document.getElementById('string'+(it.length-1)).value = t4;
				wlist();
			});
		}
		// Set Default 'define' and Reset Counter
		var defi = document.getElementById('define').innerHTML;
		var it = [];
		// Write to List
		function wlist() {
			lista = [];
			for (var i=0;i<it.length;i++) {
				lista.push(document.getElementById('select'+i).value+'<gt>'+document.getElementById('name'+i).value+'<gt>'+document.getElementById('key'+i).value+'<gt>'+document.getElementById('string'+i).value);
			}
			document.getElementById('export').value = lista.join('\n');
			document.getElementById('export').scrollTop = 5;
			document.getElementById('save').value = 'Save';
			document.getElementById('save').removeAttribute('disabled');
		}
		var swi;
		// Display List
		function dlist() {
			it = [];
			document.getElementById('define').innerHTML = defi;
			// Create Table
			for (var i=0;i<lista.length;i++) {
				item = lista[i].split('<gt>');
				cell = '<tr id="row'+i+'">';
				cell += '<td style="padding: 1px;"><input id="select'+i+'" onclick="this.select();" value="'+item[0]+'" maxlength="1" style="margin-left:5px;width:13px;border:thin solid lightgrey"></td>';
				cell += '<td style="padding: 1px;"><textarea id="name'+i+'" rows="1" style="height:100%;max-width:100px;min-width:100px;" placeholder="Name">'+item[1]+'</textarea></td>';
				cell += '<td style="padding: 1px;"><input id="key'+i+'" onclick="this.select();" value="'+item[2]+'" maxlength="1" style="margin-left:3px;width:13px;border:thin solid lightgrey"></td>';
				cell += '<td style="padding: 1px;"><textarea id="string'+i+'" rows="1" style="height:100%;max-width:490px;min-width:490px;" placeholder="String">'+item[3]+'</textarea></td>';
				cell += '<td style="padding: 1px;"><span onmousedown="return false"><span id="up'+i+'" style="cursor:pointer;color:#F80;">▲</span>';
				cell += '<span id="down'+i+'" style="cursor:pointer;color:#F80;position:relative;bottom:-1px;">▼</span>';
				cell += '<span id="del'+i+'" style="cursor:pointer;color:#C00;position:relative;left:1px;bottom:-1px;">✖</span>';
				cell += '</span></td></tr>';
				document.getElementById('define').innerHTML += cell;
				it.push(i);
			}
			// Listen for Events
			plus();
			for (var i=0;i<it.length;i++) {
				// On Select Change
				document.getElementById('select'+it[i]).addEventListener('keyup', function(){
					wlist();
				});
				// On Name Change
				document.getElementById('name'+it[i]).addEventListener('keyup', function(){
					wlist();
				});
				// On Key Change
				document.getElementById('key'+it[i]).addEventListener('keyup', function(){
					wlist();
				});
				// On String Change
				document.getElementById('string'+it[i]).addEventListener('keyup', function(){
					wlist();
				});
				// On Up
				document.getElementById('up'+it[i]).addEventListener('click', function(){
					if (this.id.replace('up','')!=='0') {
						swi = document.getElementById(this.id.replace('up','select')).value;
						document.getElementById('select'+this.id.replace('up','')).value = document.getElementById('select'+String(parseInt(this.id.replace('up',''))-1)).value;
						document.getElementById('select'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
						swi = document.getElementById(this.id.replace('up','name')).value;
						document.getElementById('name'+this.id.replace('up','')).value = document.getElementById('name'+String(parseInt(this.id.replace('up',''))-1)).value;
						document.getElementById('name'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
						swi = document.getElementById(this.id.replace('up','key')).value;
						document.getElementById('key'+this.id.replace('up','')).value = document.getElementById('key'+String(parseInt(this.id.replace('up',''))-1)).value;
						document.getElementById('key'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
						swi = document.getElementById(this.id.replace('up','string')).value;
						document.getElementById('string'+this.id.replace('up','')).value = document.getElementById('string'+String(parseInt(this.id.replace('up',''))-1)).value;
						document.getElementById('string'+String(parseInt(this.id.replace('up',''))-1)).value = swi;
						wlist();
					}
				});
				// On Down
				document.getElementById('down'+it[i]).addEventListener('click', function(){
					if (this.id.replace('down','')!=it.length-1) {
						swi = document.getElementById(this.id.replace('down','select')).value;
						document.getElementById('select'+this.id.replace('down','')).value = document.getElementById('select'+String(parseInt(this.id.replace('down',''))+1)).value;
						document.getElementById('select'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
						swi = document.getElementById(this.id.replace('down','name')).value;
						document.getElementById('name'+this.id.replace('down','')).value = document.getElementById('name'+String(parseInt(this.id.replace('down',''))+1)).value;
						document.getElementById('name'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
						swi = document.getElementById(this.id.replace('down','key')).value;
						document.getElementById('key'+this.id.replace('down','')).value = document.getElementById('key'+String(parseInt(this.id.replace('down',''))+1)).value;
						document.getElementById('key'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
						swi = document.getElementById(this.id.replace('down','string')).value;
						document.getElementById('string'+this.id.replace('down','')).value = document.getElementById('string'+String(parseInt(this.id.replace('down',''))+1)).value;
						document.getElementById('string'+String(parseInt(this.id.replace('down',''))+1)).value = swi;
						wlist();
					}
				});
				// On Delete
				document.getElementById('del'+it[i]).addEventListener('click', function(){
					if (it.length!==1) {
						if (parseInt(this.id.replace('del',''))==it.length-1) {
							document.getElementById('row'+this.id.replace('del','')).outerHTML = '';
							it.splice(it.length-1,1);
							wlist();	
						} else {
							for (var i=parseInt(this.id.replace('del',''));i<it.length;i++) {
								document.getElementById('select'+i).value = document.getElementById('select'+(i+1)).value;
								document.getElementById('name'+i).value = document.getElementById('name'+(i+1)).value;
								document.getElementById('key'+i).value = document.getElementById('key'+(i+1)).value;
								document.getElementById('string'+i).value = document.getElementById('string'+(i+1)).value;
								if (i==it.length-2) {
									document.getElementById('row'+(i+1)).outerHTML = '';
									it.splice(it.length-1,1);
									wlist();
								}
							}
						}
					} else {
						lista=['<gt><gt><gt>'];
						dlist();
						document.getElementById('save').value = 'Save';
						document.getElementById('save').removeAttribute('disabled');
					}
				});
			}
			document.getElementById('export').value = lista.join('\n');
			document.getElementById('export').scrollTop = 5;
		}
		dlist();
		// Dynamic Preview		
		function prev() {
			if (document.getElementById('opt2').checked) {
				document.getElementById('pri').setAttribute('style',butsty);
				document.getElementById('sec').setAttribute('style',butsty);
				document.getElementById('ter').setAttribute('style',butsty);
				document.getElementById('qua').setAttribute('style',butsty);
			} else {
				document.getElementById('pri').setAttribute('style','');
				document.getElementById('sec').setAttribute('style','');
				document.getElementById('ter').setAttribute('style','');
				document.getElementById('qua').setAttribute('style','');
			}
			if (document.getElementById('opt4').checked) {
				document.getElementById('pri').style.display = 'inline';
			} else {
				document.getElementById('pri').style.display = 'none';
			}
			if (document.getElementById('opt5').checked) {
				document.getElementById('sec').style.display = 'inline';
			} else {
				document.getElementById('sec').style.display = 'none';
			}
			if (document.getElementById('opt6').checked) {
				document.getElementById('ter').style.display = 'inline';
			} else {
				document.getElementById('ter').style.display = 'none';
			}
			if (document.getElementById('opt7').checked) {
				document.getElementById('qua').style.display = 'inline';
			} else {
				document.getElementById('qua').style.display = 'none';
			}
		}
		document.getElementById('optshe').addEventListener('click',function(){prev()});
		// Show Chosen Settings
		if (GM_getValue('show',1)) {
			document.getElementById('opt1').checked = true;
		}
		if (GM_getValue('style',0)) {
			document.getElementById('opt2').checked = true;
		}
		if (GM_getValue('alpha',0)) {
			document.getElementById('opt3').checked = true;
		}
		if (GM_getValue('pri',1)) {
			document.getElementById('opt4').checked = true;
		}
		if (GM_getValue('sec',1)) {
			document.getElementById('opt5').checked = true;
		}
		if (GM_getValue('ter',1)) {
			document.getElementById('opt6').checked = true;
		}
		if (GM_getValue('qua',1)) {
			document.getElementById('opt7').checked = true;
		}
		prev();
		// Save
		function savopt() {
			if (document.getElementById('opt1').checked) {
				GM_setValue('show',1);
			} else {
				GM_setValue('show',0);
			}
			if (document.getElementById('opt2').checked) {
				GM_setValue('style',1);
			} else {
				GM_setValue('style',0);
			}
			if (document.getElementById('opt3').checked) {
				GM_setValue('alpha',1);
			} else {
				GM_setValue('alpha',0);
			}
			if (document.getElementById('opt4').checked) {
				GM_setValue('pri',1);
			} else {
				GM_setValue('pri',0);
			}
			if (document.getElementById('opt5').checked) {
				GM_setValue('sec',1);
			} else {
				GM_setValue('sec',0);
			}
			if (document.getElementById('opt6').checked) {
				GM_setValue('ter',1);
			} else {
				GM_setValue('ter',0);
			}
			if (document.getElementById('opt7').checked) {
				GM_setValue('qua',1);
			} else {
				GM_setValue('qua',0);
			}
			GM_setValue('user',document.getElementById('export').value);
			document.getElementById('save').value = 'Saved';
			document.getElementById('save').setAttribute('disabled','');
		}
		document.getElementById('save').addEventListener('click',function(){savopt()});
		// Reset
		function resopt() {
			document.getElementById('opt1').checked = true;
			document.getElementById('opt2').checked = false;
			document.getElementById('opt3').checked = false;
			document.getElementById('opt4').checked = true;
			document.getElementById('opt5').checked = true;
			document.getElementById('opt6').checked = true;
			document.getElementById('opt7').checked = true;
			lista = d.split('\n');
			dlist();
			document.getElementById('save').value = 'Save';
			document.getElementById('save').removeAttribute('disabled');
		}
		document.getElementById('reset').addEventListener('click',function(){resopt()});
	} else {
		document.getElementById('summary').outerHTML = '<p class="notice attention"><span>Settings can\'t be set without support for GM_setValue and GM_getValue. [ <a title="Tampermonkey" href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">Chrome</a> | <a title="Greasemonkey" href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/">Firefox</a> | <a title="NinjaKit" href="http://ss-o.net/safari/extension/NinjaKit.safariextz">Safari</a> ]</span></p>';
	}
}
