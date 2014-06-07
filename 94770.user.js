// ==UserScript==
// @name           bbs.archlinux.pl.edit
// @namespace      lobotomius.com
// @include        *viewtopic.php*
// @include        *post.php?fid=*
// ==/UserScript==

function sn(xp, ct) {
	if(!ct) ct = document;
	var r = document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	if(r)
		return r.singleNodeValue
		else
			return null;
}

var pending = 0;
var out = [];
var imagesData = [];
var imagesName = [];

function js(_code) {
	return eval(_code)
};

function paste(text, syntax, index, callback) {
	//var dane = 'submit=submit&paste_subdomain=archlinux.pl&paste_name='+user+'&paste_code='+code;
	var dane = 'submit=submit&paste_name='+sn('//input[@name="form_user"]').value+'&paste_format='+syntax+'&paste_code='+text;
	var url = 'http://pastebin.com/api_public.php';

	pending++;

	GM_xmlhttpRequest({
		method: "POST",
		headers: {'Content-type': 'application/x-www-form-urlencoded' },
		data: dane,
		url: url,
		onload: function(response) {
			GM_log(response.responseText);
			(response.responseText.indexOf('ERROR') == 0)
				? callback(false, index, text)
				: callback(true, index, response.responseText);
		},
		onerror: function(response) {
			GM_log(response.responseText);
			callback(false, index, text) }
	});

};

function upload(imageNO, index, callback) {

	pending++;

	GM_xmlhttpRequest({
		method: "POST",
		url: 'http://api.imgur.com/2/upload.json?key=f1a0cad9c4940e504bfe88ad46b5ea3d&type=base64',
		headers: {
			'Content-type': 'multipart/form-data;',
		},
		data: imagesData[imageNO].toString(),
		onload: function(response) {
			callback(true, index, response.responseText);
		},
		onerror: function(response) {
			GM_log(response.responseText);
			callback(false, index, response.responseText);
		}
	});

};

function submit() {
	pending--;
	GM_log('pending: '+pending);
	if(pending == 0) {
		GM_log(out.join(''));
		sn('//textarea[@name="req_message"]').value = out.join('');
		sn('//form').submit();
		out = [];
	};
};

function ondrop(e) {
	e.stopPropagation(); e.preventDefault();

	var files = e.dataTransfer.files;

	for (var i = 0; i < files.length; i++) {

		imagesData.push(btoa(files[i].getAsBinary()));
		imagesName.push(files[i].name);

		sn('//textarea[@name="req_message"]').value += '[upload='+files[i].name+']';
	};
};

function addMessage(message, type) {
	var styl = ikonka = '';

	switch(type) {
		case 'ERROR':
			styl = 'color: #f11';
		break;
		case 'BUSY':
			ikonka = 'http://wstaw.org/m/2011/01/17/busy.gif';
		break;
	};
	sn('//div[@id="messages"]').innerHTML +=
	'<div style="'+styl+'"><img src="'+ikonka+'">  '+message+'</div>';
};

function zamien(a) {
	var r = t = [];
	var i = j = 0;

	pending++;

	function searchFor(tag, index) {
		var j = index;
		var k = true;
		while((j < a.length) && k) { if(a[j] == tag) k=false; j++ };
		return j;

	};

	while(i < a.length) {
		if(a[i][0] == '[') {
			t = a[i].slice(1, a[i].length-1).split('=');
			switch(t[0]) {
				case 'w':
					out.push('[url=http://wiki.archlinux.pl/Specjalna:Szukaj/'+t[1]+']'+t[1]+'[/url]');
					i++;
				break;
				case 'W':
					out.push('[url=http://wiki.archlinux.pl/'+t[1]+']'+t[1]+'[/url]');
					i++;
				break;
				case 'aur':
					out.push('[url=http://aur.archlinux.org/packages.php?K='+t[1]+']'+t[1]+'[/url]');
					i++;
				break;
				case 'p':
					out.push('[url=http://www.archlinux.org/packages/?q='+t[1]+']'+t[1]+'[/url]');
					i++;
				break;
				case 'off':
					j = searchFor('[/off]', i);
					out.push(a.slice(i+1, j-1).join(''));
					i = j;
				break;
				case 'js':
					j = searchFor('[/js]', i);
					out.push(js(a.slice(i+1, j-1).join('')));
					i = j;
				break;
				case 'paste':
					j = searchFor('[/paste]', i);
					var d = a.slice(i+1, j-1).join('');
					var syntax = 'text';
					out.push('');

					if(t[1])
						if(t[1].match(/abap|actionscript|actionscript3|ada|apache|applescript|apt_sources|asm|asp|autoit|avisynth|bash|basic4gl|bibtex|blitzbasic|bnf|boo|bf|c|c_mac|cill|csharp|cpp|caddcl|cadlisp|cfdg|klonec|klonecpp|cmake|cobol|cfm|css|d|dcs|delphi|dff|div|dos|dot|eiffel|email|erlang|fo|fortran|freebasic|gml|genero|gettext|groovy|haskell|hq9plus|html4strict|idl|ini|inno|intercal|io|java|java5|javascript|kixtart|latex|lsl2|lisp|locobasic|lolcode|lotusformulas|lotusscript|lscript|lua|m68k|make|matlab|matlab|mirc|modula3|mpasm|mxml|mysql|text|nsis|oberon2|objc|ocaml-brief|ocaml|glsl|oobas|oracle11|oracle8|pascal|pawn|per|perl|php|php-brief|pic16|pixelbender|plsql|povray|powershell|progress|prolog|properties|providex|python|qbasic|rails|rebol|reg|robots|ruby|gnuplot|sas|scala|scheme|scilab|sdlbasic|smalltalk|smarty|sql|tsql|tcl|tcl|teraterm|thinbasic|typoscript|unreal|vbnet|verilog|vhdl|vim|visualprolog|vb|visualfoxpro|whitespace|whois|winbatch|xml|xorg_conf|xpp|z80/i))
						var syntax = t[1];

					paste(d, syntax, out.length-1, function(ok, index, result){
						if(ok) {
							out[index] = '[url='+result+']'+result+'[/url]';
						} else
							out[index] = '[code]'+result+'[/code]';
						submit();
					});
					i = j;
				break;
				case 'upload':
					out.push('');
					var nr = -1;
					for(j=0; j <= imagesName.length; j++) if(imagesName[j] == t[1]) nr = j;
					if(nr > -1) {
						upload(nr, out.length-1, function(ok, index, result){
							if(ok) {
								var json = eval('('+result+')');
								if(json.upload)
									out[index] = '[url='+json.upload.links.original+'][img]'+
										json.upload.links.large_thumbnail+'[/img][/url]';
							};
							submit();
						});
					} else addMessage(t[1]+' nie istnieje', 'ERROR');
					i++;
				break;
				default:
					out.push(a[i]);
					i++;
				break;

			};
		} else {
			out.push(a[i]);
			i++;
		};
	};

	submit();
	return r;
}

var box = document.createElement('div');
box.setAttribute('style',
		'background: none repeat scroll 0 0 #000; visibility: hidden; opacity: 0.3;\
		position: fixed; top: 0; left: 0; height: 100%; width: 100%; padding: 1px; z-index: 999;');
box.setAttribute('id', 'overlay');
sn('//div[@id="brdmain"]').appendChild(box);

var box = document.createElement('div');
box.setAttribute('id', 'messages');
sn('//div[@class="infldset txtarea"]').appendChild(box);
sn('//form').removeAttribute('onsubmit');
sn('//body').addEventListener('dragenter', function(e){
	sn('//div[@id="overlay"]').style.visibility="visible"; e.stopPropagation(); e.preventDefault()}, false);
sn('//div[@id="brdmain"]').addEventListener('dragover', function(e){ e.stopPropagation(); e.preventDefault()}, false);
sn('//div[@id="overlay"]').addEventListener('dragleave', function(e) { this.style.visibility="hidden" }, false);
sn('//div[@id="overlay"]').addEventListener('drop', ondrop, false);
sn('//input[@name="submit"]').setAttribute('type', 'button');
sn('//input[@name="submit"]').addEventListener('click', function() {
	if(sn('//textarea[@name="req_message"]').value.length < 1) { return false }
		else {
			var c = sn('//textarea[@name="req_message"]').value.match(/\[[^\]]*\]|[^\[]*/g);
			GM_log(c);
			addMessage('Wysyłanie', 'BUSY');
			sn('//input[@name="submit"]').disabled = true;
			zamien(c);
		};
}, false);


// EOF