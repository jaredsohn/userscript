// ==UserScript==
// @name           Download with Wget
// @namespace      http://userscripts.org/users/14536
// @description    Creates code to download web pages, images and other files using wget
// @include        *
// ==/UserScript==

// Last updated 2009-01-13

function $(id) { return document.getElementById(id); }

function l(id,f) { $(id).addEventListener('click',f,false); }

function v(id,val) { if (val!=null) { $(id).value=val; } return $(id).value; }

function popup() {
	var loc = location.href.toLowerCase();
	if ($('wgetoptions')) { return; }
	var style = '#wgetcontainer { position:absolute; top:10px; left:0; right:0; z-index:10000000; }'+
				'#wgetoptions { width:700px; margin:0 auto; background:#f9f9f9; border:3px double black; padding:10px; font-family:serif; }'+
				'#wgetoptions table { margin:0 auto; }'+
				'#wgetoptions td { vertical-align:top; padding-bottom:10px; border:none; text-align:left; }'+
				'#wgetoptions td, #wgetoptions label { font-size:14px; font-weight:normal; font-family:serif; color:black; }'+
				'#wgetoptions .wgetpreset { font-size:11px; }'+
				'#wgetoptions .wgetpreset span { color:#003399; font-style:italic; cursor:pointer; }'+
				'#wgetoptions input[type=text] { width:500px; }'+
				'#wgetoptions input[type=button], #wgetoptions input[type=submit] { width:150px; }'+
				'#wgetcode { width:100%; height:200px; }'+
				'#wgetshadow { background:black; opacity:0.6; z-index:9999999; top:0; right:0; left:0; bottom:0; position:fixed; }';
	GM_addStyle(style.replace(/;/g,' ! important;'));
	GM_addStyle('.wgetadvanced { display:none; }');
	var shadow = document.createElement('shadow');
	shadow.id = 'wgetshadow';
	var div = document.createElement('div');
	div.id = 'wgetcontainer';
	div.innerHTML = '<div id="wgetoptions"><form onsubmit="return false;"><table>'+
					'<tr><td></td><td></td></tr>'+
					'<tr><td>Source: </td><td><input type="checkbox" id="wgetlinks" ' + (GM_getValue('links',true) ? 'checked="checked" ' : '') + '/><label for="wgetlinks">Links</label> <input type="checkbox" id="wgetimages" ' + (GM_getValue('images',false) ? 'checked="checked" ' : '') + '/><label for="wgetimages">Images</label> <input type="checkbox" id="wgetcss" ' + (GM_getValue('css',false) ? 'checked="checked" ' : '') + '/><label for="wgetcss">CSS</label></td><td style="text-align:right ! important;"><select id="wgetmode"><option>Manual</option><option>Facebook Pictures</option><option>Google Image Search</option><option>MySpace Pictures</option></select></td></tr>'+
					'<tr><td>Extensions Filter: </td><td colspan="2"><input type="text" id="wgetextensions" /><br /><span class="wgetpreset">presets: <span id="wgetextall">All</span> - <span id="wgetextimg">Images</span> - <span id="wgetextav">Audio/Video</span> - <span id="wgetextweb">Web Pages</span></span></td></tr>'+
					'<tr class="wgetadvanced"><td>Regex Filter: </td><td colspan="2"><input type="text" id="wgetregex" /></td></tr>'+
					'<tr class="wgetadvanced"><td>Regex Replace: </td><td colspan="2"><input type="text" id="wgetfind" style="width:248px ! important;" /> <input type="text" id="wgetreplace" style="width:247px ! important;" /></td></tr>'+
					'<tr class="wgetadvanced"><td>User Agent: </td><td colspan="2"><input type="text" id="wgetuseragent" value="' + navigator.userAgent + '" /><br /><span class="wgetpreset">presets: <span id="wgetuadef">Browser Default</span> - <span id="wgetuawget">Wget</span> - <span id="wgetuaffl">Firefox on Linux</span> - <span id="wgetuaie">IE on Windows</span></span></td></tr>'+
					'<tr><td><input type="checkbox" id="wgetadvanced" /><label for="wgetadvanced">Advanced</label></td><td colspan="2" style="text-align:right ! important;"><input type="submit" id="wgetcreate" value="Create Code" /> <input type="button" id="wgetreset" value="Reset" /> <input type="button" id="wgetclose" value="Close" /></td></tr>'+
					'<tr><td colspan="3"><textarea id="wgetcode" onmouseover="this.focus(); this.select();"></textarea></td></tr>'+
					'<tr><td colspan="3" id="status">Ready...</td></tr>'+
					'</table></form>';
	document.body.appendChild(div);
	document.body.appendChild(shadow);
	window.scroll(0,0);
	if (GM_getValue('advanced',false)) { $('wgetadvanced').checked = 'checked'; toggleAdvanced(true); }
	if (loc.indexOf('images.google.')!=-1) { changeMode('Google Image Search'); }
	else if (loc.indexOf('facebook.com')!=-1) { changeMode('Facebook Pictures'); }
	else if (loc.indexOf('myspace.com')!=-1) { changeMode('MySpace Pictures'); }
	l('wgetadvanced',function(e){ GM_setValue('advanced',e.target.checked); toggleAdvanced(e.target.checked); });
	l('wgetlinks',function(e){ GM_setValue('links',e.target.checked); });
	l('wgetimages',function(e){ GM_setValue('images',e.target.checked); });
	l('wgetcss',function(e){ GM_setValue('css',e.target.checked); });
	l('wgetuaffl',function(){ v('wgetuseragent','Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.5) Gecko/2008121622 Firefox/3.0.5'); });
	l('wgetuaie',function(){ v('wgetuseragent','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'); });
	l('wgetuadef',function(){ v('wgetuseragent',navigator.userAgent); });
	l('wgetuawget',function(){ v('wgetuseragent',''); });
	l('wgetextall',function(){ v('wgetextensions',''); });
	l('wgetextimg',function(){ v('wgetextensions','jpg,jpeg,gif,png,bmp,svg'); });
	l('wgetextav',function(){ v('wgetextensions','avi,flv,mp3,mp4,mpg,mpeg,m4a,m4v,ogg,aac,wma,wmv'); });
	l('wgetextweb',function(){ v('wgetextensions','htm,html,php,asp'); });
	l('wgetcreate',function(){ makeCode(); });
	l('wgetreset',function(){ changeFields('','','','',navigator.userAgent,true,false,false); });
	l('wgetclose',function(){ closePopup(); });
	$('wgetmode').addEventListener('change', function(e) { changeMode(e.target.options[e.target.selectedIndex].value); }, false);
}

function toggleAdvanced(bool) {
	var adv = document.evaluate("//tr[contains(@class,'wgetadvanced')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
	for (var i=0; i<adv.snapshotLength; i++) { adv.snapshotItem(i).style.display = bool ? 'table-row' : 'none'; }
}

function changeFields(ext,regex,find,replace,ua,links,images,css) {
	v('wgetextensions',ext);
	v('wgetregex',regex);
	v('wgetfind',find);
	v('wgetreplace',replace);
	v('wgetuseragent',ua);
	if (links!=null) { $('wgetlinks').checked = links ? 'checked' : ''; }
	if (images!=null) { $('wgetimages').checked = images ? 'checked' : ''; }
	if (css!=null) { $('wgetcss').checked = css ? 'checked' : ''; }
}

function changeMode(mode) {
	$('wgetmode').value = mode;
	GM_setValue('mode',mode);
	click('wgetuadef');
	if (mode=='Manual') { changeFields('','','','',null,true,false,false); }
	if (mode=='Facebook Pictures') { changeFields('jpg','photos.*\\d\\/[st]\\d','\\/[st]','/n',null,false,true,false); }
	if (mode=='Google Image Search') { changeFields('','imgurl=','^.*imgurl=([^&]+).*$','$1',null,true,false,false); }
	if (mode=='MySpace Pictures') { changeFields('jpg','images.*(\\/[am]_|_m\\.)','(\\/|_)[am](_|\\.)','$1l$2',null,false,true,false); }
}

function closePopup() {
	$('wgetcontainer').parentNode.removeChild($('wgetcontainer'));
	$('wgetshadow').parentNode.removeChild($('wgetshadow'));
}

function click(id) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent( 'click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null );
	$(id).dispatchEvent(evt);
}

function makeCode() {
	var code = 'wget';
	if (v('wgetuseragent')!='') { code = code + ' -U "' + v('wgetuseragent').replace(/"/g,'\"') + '"'; }
	var count = 0;
	var ext=null, regex=null;
	if (v('wgetextensions')!='') { ext = new RegExp('\\.(' + v('wgetextensions').replace(/,/g,'|') + ')(\\?.*)?$', 'i'); }
	if (v('wgetregex')!='') { regex = new RegExp(v('wgetregex'), 'i'); }
	var doReplace = v('wgetfind')!='' && v('wgetreplace')!='';
	var find = doReplace ? new RegExp(v('wgetfind')) : null;
	var replace = doReplace ? v('wgetreplace') : null;
	
	function addURL(url) {
		if ((ext==null || ext.test(url)) && (regex==null || regex.test(url))) {
			if (doReplace) { url = url.replace(find,replace); }
			if (code.indexOf(url)==-1) {
				code = code + ' ' + url;
				count++;
			}
		}
	}
	
	if ($('wgetlinks').checked) {
		var elms = document.getElementsByTagName('a');
		for (var i=0; i<elms.length; i++) { addURL(elms[i].href); }
	}
	if ($('wgetimages').checked) {
		var elms = document.getElementsByTagName('img');
		for (var i=0; i<elms.length; i++) { addURL(elms[i].src); }
	}
	if ($('wgetcss').checked) {
		function checkCSS(elms) {
			for (var i=0; i<elms.length; i++) {
				buf = document.defaultView.getComputedStyle(elms[i],null).getPropertyValue('background-image');
				if (buf!='none') { addURL(buf.match(/url\((.+)\)/)[1]); }
			}	
		}
		checkCSS(document.getElementsByTagName('body'));
		checkCSS(document.getElementsByTagName('div'));
		checkCSS(document.getElementsByTagName('span'));
		checkCSS(document.getElementsByTagName('table'));
		checkCSS(document.getElementsByTagName('tbody'));
		checkCSS(document.getElementsByTagName('tr'));
		checkCSS(document.getElementsByTagName('tr'));
		checkCSS(document.getElementsByTagName('p'));
	}
	$('status').innerHTML = count==0 ? 'No matches found' : count + ' matches found';
	$('wgetcode').innerHTML = code;
}

window.addEventListener('keydown', function(e) {
	if (e.keyCode==68 && e.shiftKey && e.ctrlKey) { popup(); }
	if (e.keyCode==27 && $('wgetoptions')) { closePopup(); e.preventDefault(); }
}, false);

GM_registerMenuCommand('Download with Wget', popup);
