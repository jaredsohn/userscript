// ==UserScript==
// @name           TW BB code ++
// @namespace      http://home.deds.nl/~lekensteyn/p/
// @copyright      2009, Lekensteyn (www.tribetool.nl)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        20122009-7
// @description    Verbetert BB-codes: voegt sneltoetsen toe, voegt (extra) knoppen toe.
// @include        http://*.tribalwars.*/forum.php*
// @include        http://*.tribalwars.*/game.php*screen=*
// @include        http://de*.die-staemme.de/forum.php*
// @include        http://de*.die-staemme.de/game.php*screen=*
// ==/UserScript==
// Created: 24042009-1
var settings = {	//standaardinstellingen
	bbsize: false,
	bbimg: false,
	bbcolor: false,
	sig: true,		//true: handtekening ingeschakeld, false: handtekening uitgeschakeld
	smilies: true	//true: smilies automatisch omzetten, false: niet automatisch omzetten
};
if(typeof unsafeWindow == 'undefined'){
	unsafeWindow = window;
}
var lang = {
	'en': {
		bold: 'Bold',
		italics: 'Italics',
		underline: 'Underline',
		strike: 'Strike',
		quote: 'Quote',
		url: 'URL',
		player: 'Player',
		tribe: 'Tribe',
		village: 'Village',
		textsize: 'Font size',
		image: 'Image',
		color: 'Color',
		report_link: 'Report link',
		report_display: 'Display report',
		code: 'Code',
		smilies: 'Smilies',
		spoiler: 'Spoiler',
		unload_message: 'Do you really want to leave this page?\nChanges will *not* be saved.',
		size6: 'Extra small',
		size7: 'Small',
		size9: 'Medium',
		size12: 'Large',
		size20: 'Extra large',
		auto_smilies_short: 'Auto smilies...',
		auto_smilies_long: 'Insert smilies automatically while typing',
		enter_url: 'Enter the URL:',
		report_code: 'Enter the report-code. This code contains only letters and digits, and has a length of 32.\nYou are also able to enter the URL directly.',
		no_sig_error: 'You have still not a signature set.',
		sig_modified: 'The signature has been modified.\nDo you want to save it?',
		sig_reset: 'Do you want to reset your last signature?',
		no_sig_auto: 'You have not set a signature, the auto-complete feature will be disabled...',
		sig_insert: 'Insert signature',
		sig_insert_info: 'Inserts the signature automatically when submitting this page.',
		sig_required: 'You have to set a signature first.',
		change_sig: 'Change signature...'
	},
	'nl': {
		bold: 'Vetgedrukt',
		italics: 'Cursief',
		underline: 'Onderstreept',
		strike: 'Doorgestreept',
		quote: 'Citaat',
		url: 'Adres',
		player: 'Speler',
		tribe: 'Stam',
		village: 'Dorp',
		textsize: 'Tekstgrootte',
		image: 'Afbeelding',
		color: 'Kleur',
		report_link: 'Bericht link',
		report_display: 'Bericht weergeven',
		code: 'Code',
		smilies: 'Smilies',
		spoiler: 'Spoiler',
		unload_message: 'Wil je echt de pagina verlaten?\nWijzigingen worden *niet* opgeslagen.',
		size6: 'Heel klein',
		size7: 'Klein',
		size9: 'Normaal',
		size12: 'Groot',
		size20: 'Reusachtig',
		auto_smilies_short: 'Automatisch smilies...',
		auto_smilies_long: 'Automatisch smilies invoegen tijdens het typen',
		enter_url: 'Geef de URL op:',
		report_code: 'Geef de code op. Deze code bevat enkel letters en cijfers, en is 32 tekens lang.\nJe kunt ook direct de URL opgeven.',
		no_sig_error: 'Je hebt nog geen handtekening ingesteld.',
		sig_modified: 'De handtekening is gewijzigd.\nWil je deze opslaan?',
		sig_reset: 'Wil je de laatste handtekening herstellen?',
		no_sig_auto: 'Je hebt geen handtekening ingesteld, de automatische toevoeging ervan wordt uitgeschakeld...',
		sig_insert: 'Handtekening invoegen',
		sig_insert_info: 'Automatisch de handtekening toevoegen bij het verzenden van de pagina.',
		sig_required: 'Stel eerst een handtekening in.',
		change_sig: 'Handtekening aanpassen...'
	},
	'de': {
		bold: 'Fett',
		italics: 'Kursiv',
		underline: 'Unterstrichen',
		strike: 'Durchgestrichen',
		quote: 'Zitat',
		url: 'Adresse',
		player: 'Spieler',
		tribe: 'Stamm',
		village: 'Dorf',
		textsize: 'Schriftgröße',
		image: 'Bild',
		color: 'Farbe',
		report_link: 'Bericht-link',
		report_display: 'Bericht zeigen',
		code: 'Code',
		smilies: 'Smileys',
		spoiler: 'Spoiler',
		unload_message: 'Möchten Sie wirklich die Seite verlassen?\nÄnderungen werden nicht gespeichert..',
		size6: 'Sehr klein',
		size7: 'Klein',
		size9: 'Normal',
		size12: 'Groß',
		size20: 'Riesig',
		auto_smilies_short: 'Automatische Smileys...',
		auto_smilies_long: 'Automatisch Smileys einfügen während Sie schreibt.',
		enter_url: 'Bitte gebe die URL ein:',
		report_code: 'Geben Sie den Code. Dieser Code enthält nur Buchstaben und Ziffern und ist 32 Zeichen lang sein.\nSie können auch die URL.',
		no_sig_error: 'Sie haben noch keine Signatur eingestellt.',
		sig_modified: 'Die Signatur hat sich geändert.\nMöchten Sie es speichern?',
		sig_reset: 'Möchten Sie die aktuellen Signatur-wiederherstellen?',
		no_sig_auto: 'Sie verfügen nicht über eine Signatur eingerichtet, Auto-Vervollständigen ist ausschaltet...',
		sig_insert: 'Signatur einfügen',
		sig_insert_info: 'Automatisch die Signatur einfügen wenn die Seite gesendet.',
		sig_required: 'Setze Sie zuerst eine Signatur auf.',
		change_sig: 'Signatur ändern...'
	}
};
var slang = location.host.match(/^\D+/);
if(slang in lang) lang = lang[slang];
else lang = lang['en'];
main:
if(1){
var image_base = unsafeWindow.image_base || '/graphic';
var screen = location.search.match(/screen=([^&]+)/);
screen = screen ? screen[1] : '';
var mode = location.search.match(/mode=([^&]+)/);
mode = mode ? mode[1] : '';
var bbf = document.getElementById('message');
if(location.pathname == '/forum.php') settings.bbsize = settings.bbimg = settings.bbcolor = true;
else switch(screen){
	case 'mail':
		settings.bbcolor = true;
		break;
	case 'ally':
		switch(mode){
			case 'overview': bbf = document.getElementById('intern');break;
			case 'intro_igm': bbf = document.getElementsByName('text');bbf=bbf?bbf[0]:null;break;
			case 'properties': bbf = document.getElementById('desc_text');break;
		}
		settings.sig = false;
		break;
	case 'settings':
		if(mode == 'profile') ;
		settings.sig = false;
		break;
	case 'memo':
		settings.bbsize = settings.bbimg = settings.bbcolor = true;
		settings.sig = false;
		break;
	default:
		break main;
}
if(!bbf) break main;
var bbname = bbf.id = bbf.id ? bbf.id : 'message';
var tags = {};
var smilies = {};
var smilieslist = [''];
var smiliesmaxlength = 0;


/* begin tags */
tags['b'] = [66, lang.bold, 0];
tags['i'] = [73, lang.italics, -20];
tags['u'] = [85, lang.underline, -40];
tags['s'] = [83, lang.strike, -60];
tags['quote=Author'] = [81, lang.quote, -140];
tags['url'] = [76, lang.url, -160];
tags['spoiler'] = [null, lang.spoiler, -260];
tags['player'] = [80, lang.player, -80];
tags['ally'] = [84, lang.tribe, -100];
tags['village'] = [68, lang.village, -120];
if(settings['bbsize']) tags[']toggle_visibility("bb_sizes")'] = [null, lang.textsize, -220];
if(settings['bbimg']) tags['img'] = [null, lang.image, -180];
if(settings['bbcolor']) tags[']bb_color_picker_toggle()'] = [null, lang.color, -200];
tags['report'] = [null, lang.report_link, image_base+'/new_report.png'];
tags['report_display'] = [null, lang.report_display, -240];
tags['code'] = [null, lang.code, image_base+'/rename.png'];
var tt_s = 'http://www.tribetool.nl/smilies/';
var tt_gs = 'http://www.freesmileys.org/smileys/smiley-basic/';
var tt_g = 'http://www.tribetool.nl/graphic/';
if(settings['bbimg']) tags[']void lkn_bbSmilies()'] = [null, lang.smilies, tt_s+'smile.gif', {'id': 'lkn_bbsmiliesb'}];
/* end tags, begin smilies */
smilies[':)'] = [tt_gs+'smile.gif'];
smilies[':D'] = [tt_gs+'biggrin.gif'];
smilies[':('] = [tt_gs+'sad.gif'];
smilies[':@'] = [tt_gs+'mad.gif'];
smilies[':p'] = [tt_gs+'tongue.gif'];
smilies[':o'] = [tt_gs+'ohmy.gif'];
smilies[':?'] = [tt_gs+'what.gif'];
smilies[';)'] = [tt_gs+'wink.gif'];
smilies[':rolleyes:'] = [tt_gs+'rolleyes.gif'];
smilies[':cool:'] = [tt_gs+'cool.gif'];
smilies[':eek:'] = [tt_gs+'jawdrop.gif'];
smilies[':lock:'] = [tt_gs+'locked.gif'];

smilies[':boer:'] = [tt_s+'face.png'];
smilies[':speer:'] = [tt_s+'spear.png'];
smilies[':zwaard:'] = [tt_s+'sword.png'];
smilies[':bijl:'] = [tt_s+'axe.png'];
smilies[':boog:'] = [tt_s+'archer.png'];
smilies[':scout:'] = [tt_s+'spy.png'];
smilies[':lc:'] = [tt_s+'light.png'];
smilies[':bbg:'] = [tt_s+'marcher.png'];
smilies[':zc:'] = [tt_s+'heavy.png'];
smilies[':ram:'] = [tt_s+'ram.png'];
smilies[':kata:'] = [tt_s+'catapult.png'];
smilies[':ridder:'] = [tt_s+'knight.png'];
smilies[':edel:'] = [tt_s+'snob.png'];
smilies[':hout:'] = [tt_s+'wood.png'];
smilies[':leem:'] = [tt_s+'stone.png'];
smilies[':ijzer:'] = [tt_s+'iron.png'];
smilies[':gs:'] = [tt_s+'res.png'];

smilies[':blue:'] = [tt_s+'bluedot.png'];
smilies[':green:'] = [tt_s+'greendot.png'];
smilies[':grey:'] = [tt_s+'greydot.png'];
smilies[':red:'] = [tt_s+'reddot.png'];
smilies[':yellow:'] = [tt_s+'yellowdot.png'];
smilies[':brown:'] = [tt_s+'browndot.png'];
smilies[':mail:'] = [tt_s+'mail.png'];
smilies[':report:'] = [tt_s+'report.png'];
/* end smilies*/


window.addEventListener('beforeunload', function(e){
	var E = e.explicitOriginalTarget;
	if(bbf.value != bbf.defaultValue && (!E || !E.tagName || E.tagName.toLowerCase() != 'input')){
		e.returnValue = lang.unload_message;
	}
}, false);
for(var i in smilies){
	smilieslist.push(i);
	if(i.length > smiliesmaxlength) smiliesmaxlength = i.length;
}
smilieslist.push('');
smilieslist = smilieslist.join('`');
var shortcuts = [];
var cb = document.getElementById('bb_sizes');
if(cb) cb = cb.parentNode.childNodes;
var bbhtml = '';
for(var i in tags){
	if(tags[i][0]) shortcuts[tags[i][0]] = i;
	var bg = typeof tags[i][2]=='string'?'url('+tags[i][2]+') center':'url(/graphic/bbcodes/bbcodes.png) '+tags[i][2]+'px 0px';
	if(i.charAt(0) == ']') var href = i.substr(1);
	else var href = "insertBBcode('"+bbname+"', '["+i+"]', '[/"+i.replace(/=.*$/, '')+"]')";
	href = href.replace(/"/g, '&quot;');
	var ex = tags[i][3] ? tags[i][3] : {};
	bbhtml += '<a href="javascript:'+href+';" title="'+tags[i][1]+(tags[i][0]?' (Ctrl + '+String.fromCharCode(tags[i][0])+')':'')+'"><div style="float: left; background:'+bg+' no-repeat; padding-left: 0px; padding-right: 0px; margin-right: 4px; width: 20px; height: 20px;'+(tags[i][0]?'outline: 1px solid blue':'')+'"'+(ex.id?' id="'+ex.id+'"':'')+'></div></a>';
}
if(settings.bbsize){
	bbhtml += '<table id="bb_sizes" style="display: none; clear:both;">\n\
<tr>\n\
<td>\n\
<a href="javascript: insertBBcode(\''+bbname+'\', \'[size=6]\', \'[/size]\');javascript:toggle_visibility(\'bb_sizes\');">&raquo; '+lang.size6+'</a><br />\n\
<a href="javascript: insertBBcode(\''+bbname+'\', \'[size=7]\', \'[/size]\');javascript:toggle_visibility(\'bb_sizes\');">&raquo; '+lang.size7+'</a><br />\n\
<a href="javascript: insertBBcode(\''+bbname+'\', \'[size=9]\', \'[/size]\');javascript:toggle_visibility(\'bb_sizes\');">&raquo; '+lang.size9+'</a><br />\n\
<a href="javascript: insertBBcode(\''+bbname+'\', \'[size=12]\', \'[/size]\');javascript:toggle_visibility(\'bb_sizes\');">&raquo; '+lang.size12+'</a><br />\n\
<a href="javascript: insertBBcode(\''+bbname+'\', \'[size=20]\', \'[/size]\');javascript:toggle_visibility(\'bb_sizes\');">&raquo; '+lang.size20+'</a><br />\n\
</td>\n\
</tr>\n\
</table>';
}
if(settings.bbcolor){
	bbhtml += '<div id="bb_color_picker" style="display: none; clear:both;">\n\
<div id="bb_color_picker_colors">\n\
<div id="bb_color_picker_c0" style="background:#f00"></div><div id="bb_color_picker_c1" style="background:#ff0"></div><div id="bb_color_picker_c2" style="background:#0f0"></div><div id="bb_color_picker_c3" style="background:#0ff"></div><div id="bb_color_picker_c4" style="background:#00f"></div><div id="bb_color_picker_c5" style="background:#f0f"></div><br />\n\
</div>\n\
<div id="bb_color_picker_tones">\n\
<div id="bb_color_picker_10"></div><div id="bb_color_picker_11"></div><div id="bb_color_picker_12"></div><div id="bb_color_picker_13"></div><div id="bb_color_picker_14"></div><div id="bb_color_picker_15"></div><br clear=all />\n\
<div id="bb_color_picker_20"></div><div id="bb_color_picker_21"></div><div id="bb_color_picker_22"></div><div id="bb_color_picker_23"></div><div id="bb_color_picker_24"></div><div id="bb_color_picker_25"></div><br clear=all />\n\
<div id="bb_color_picker_30"></div><div id="bb_color_picker_31"></div><div id="bb_color_picker_32"></div><div id="bb_color_picker_33"></div><div id="bb_color_picker_34"></div><div id="bb_color_picker_35"></div><br clear=all />\n\
<div id="bb_color_picker_40"></div><div id="bb_color_picker_41"></div><div id="bb_color_picker_42"></div><div id="bb_color_picker_43"></div><div id="bb_color_picker_44"></div><div id="bb_color_picker_45"></div><br clear=all />\n\
<div id="bb_color_picker_50"></div><div id="bb_color_picker_51"></div><div id="bb_color_picker_52"></div><div id="bb_color_picker_53"></div><div id="bb_color_picker_54"></div><div id="bb_color_picker_55"></div><br clear=all />\n\
</div>\n\
<div id="bb_color_picker_preview">Tekst</div>\n\
<input type="text" id="bb_color_picker_tx" /><input type="button" value="OK" id="bb_color_picker_ok" onclick="bb_color_picker_toggle(true);"/>\n\
</div>';
}
if(settings['bbimg']){
	bbhtml += '<div id="lkn_bbsmiliesc" style="background-color: #EFE6C9; border: 2px solid #804000; right: 0px; width: 150px; position: absolute; top: 0px; z-index: 101; clear: both; display: none;"><input type="button" onclick="lkn_bbToggleSmiley();" value="'+lang.auto_smilies_short+'" title="'+lang.auto_smilies_long+'" style="display: block; margin-bottom: 3px;" /></div>';
}
var bbdiv = document.createElement('div');
bbdiv.style.position = 'relative';
bbdiv.innerHTML = bbhtml;
var oldbb = document.getElementById('bb_sizes');
if(oldbb) document.getElementById('bb_sizes').parentNode.parentNode.replaceChild(bbdiv, oldbb.parentNode);
else bbf.parentNode.insertBefore(bbdiv, bbf);

unsafeWindow.insertBBcode = function(textareaID, startTag, endTag){
	var input = document.getElementById(textareaID);
	input.focus();
	var start = input.selectionStart;
	var end = input.selectionEnd;
	var sts = input.scrollTop;
	var ste = input.scrollHeight;
	var insText = input.value.substring(start, end);
	switch(startTag){
		case '[url]':
			var url_change = !(insText.match(/^https?:\/\//i) || insText.match(/^[\d\w]\.?([\d\w\-]\.?)*\.\w{2,}/i));
			if(insText != '' && url_change){
				var url_new = prompt(lang.enter_url, insText);
				if(url_new && url_new != insText) startTag = '[url="'+url_new.replace(/"/g, '%22')+'"]';
			}
		break;
		case '[report]':
		case '[report_display]':
			var report_re = /\b([\w\d]{32})\b/;
			var report_text = insText.match(report_re);
			if(!report_text){
				var report_new = prompt(lang.report_code, insText);
				if(!report_new || !(report_text = report_new.match(report_re))) return void 0;
			}
			insText = report_text[1];
			break;
	}
	input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
	var pos;
	if(insText.length == 0){
		pos = start + startTag.length;
	}
	else{
		pos = start + startTag.length + insText.length + endTag.length;
	}
	input.selectionStart = pos;
	input.selectionEnd = pos;
	input.scrollTop = sts + input.scrollHeight - ste;
	return void 1;
}
function createBBFunc(name){
	return function(e){
		function insBB(tag){
			unsafeWindow.insertBBcode(name, '['+tag+']', '[/'+tag.replace(/=.*$/, '')+']');
		}
		if(e.ctrlKey && !e.shiftKey && !e.altKey){
			if(shortcuts[e.keyCode]){
				e.stopPropagation();
				e.preventDefault();
				setTimeout(function(){
					insBB(shortcuts[e.keyCode]);
				}, 1);
			}
		}
		return true;
	}
}
bbf.addEventListener('keydown', createBBFunc(bbname), true);
if(settings.bbimg){
	unsafeWindow.lkn_bbSmilies = function(){
		var sd = document.getElementById('lkn_bbsmiliesc');
		if(sd.childNodes.length == 1){
			var a = document.createElement('a');
			a.style.margin = '3px';
			a.style.cursor = 'pointer';
			var m = document.createElement('img');
			a.appendChild(m);
			for(var i in smilies){
				var l = a.cloneNode(true);
				l.addEventListener('click', function(){
					unsafeWindow.insertBBcode(bbname, '[img]'+this.firstChild.src+'[/img]', '');
					sd.style.display = 'none';
				}, false);
				l.firstChild.alt = l.title = i;
				l.firstChild.src = smilies[i][0];
				sd.appendChild(l);
			}
		}
		sd.style.display = sd.style.display == 'none' ? '' : 'none';
	};
	function smileyFunc(e){
		var ss = bbf.selectionStart;
		if(!e.charCode || ss < 1) return 0;
		var sm = bbf.value.substring(Math.max(0, ss-smiliesmaxlength), ss) + String.fromCharCode(e.charCode);
		sm = sm.match(/[:;][^:]+:?$/);
		if(!sm) return 0;
		sm = sm[0];
		var l;
		if((l=smilies[sm])){
			var end = bbf.selectionEnd;
			var sts = bbf.scrollTop;
			var ste = bbf.scrollHeight;
			var it = '[img]'+l[0]+'[/img]';
			bbf.value = bbf.value.substr(0, ss-sm.length+1) + it + bbf.value.substr(end);
			var pos = ss + it.length - 1;
			bbf.selectionStart = pos;
			bbf.selectionEnd = pos;
			bbf.scrollTop = sts + bbf.scrollHeight - ste;
			e.preventDefault();
		}
		return 1;
	}
	unsafeWindow.lkn_bbToggleSmiley = function(setup){
		if(!setup) settings.smilies = !settings.smilies;
		document.getElementById('lkn_bbsmiliesb').style.backgroundImage = 'url('+(settings.smilies ? tt_s+'smile.gif' : tt_s+'frown.gif')+')';
		bbf[(settings.smilies?'add':'remove')+'EventListener']('keypress', smileyFunc, true);
	};
	unsafeWindow.lkn_bbToggleSmiley(true);
	document.getElementById('lkn_bbsmiliesb').parentNode.addEventListener('contextmenu', function(e){
		if(e.button == 2){
			unsafeWindow.lkn_bbToggleSmiley();
			e.preventDefault();
			e.stopPropagation();
		}
	}, true);
}
if(settings.sig){
	var sig = document.createElement('div');
	var lkn_bbSig = unsafeWindow.lkn_bbSig = function(){
		var sig = lkn_bbSig.getSig();
		if(sig != ''){
			if(bbf.value.lastIndexOf(sig) != bbf.value.length - sig.length) bbf.value += '\n'+sig;
		}
		else alert(lang.no_sig_error);
	};
	function getCookie(n){
		var c = ('; '+document.cookie+'; ').match(new RegExp('; '+n+'=(.+?); ', ''));
		return c ? decodeURIComponent(c[1]) : '';
	}
	function setCookie(n, v){
		var exp = new Date();
		exp.setYear(exp.getFullYear()+1);
		document.cookie = n+'='+encodeURIComponent(v)+'; expires='+exp.toGMTString();
	}
	lkn_bbSig.getSig = function(){
		return getCookie('lkn_bbsig');
	};
	lkn_bbSig.setSig = function(sig){
		setCookie('lkn_bbsig', sig);
	};
	lkn_bbSig.editSig = function(open){
		var e = document.getElementById('lkn_bbSigedit');
		if(e.style.display == 'none'){
			if(open) e.value = lkn_bbSig.getSig();
			e.style.display = 'block';
		}
		else{
			if(lkn_bbSig.getSig() != e.value){
				if(confirm(lang.sig_modified)){
					lkn_bbSig.setSig(e.value);
					e.style.display = 'none';
				}
				else if(confirm(lang.sig_reset)){
					e.value = lkn_bbSig.getSig();
					e.style.display = 'none';
				}
			}
			else e.style.display = 'none';
		}
	};
	lkn_bbSig.auto = function(nw){
		if(typeof nw == 'boolean'){
			setCookie('lkn_bbsa', nw?1:0);
		}
		return getCookie('lkn_bbsa') == 1;
	}
	if(lkn_bbSig.auto() && lkn_bbSig.getSig() == ''){
		lkn_bbSig.auto(false);
		alert(lang.no_sig_auto);
	}
	sig.innerHTML = '<input type="button" onclick="lkn_bbSig();" value="'+lang.sig_insert+'" tabindex="-1" />\n\
<label title="'+lang.sig_insert_info+'"><input type="checkbox" '+(lkn_bbSig.auto()?' checked="checked"':'')+' onclick="if(lkn_bbSig.getSig()==\'\'&&this.checked){alert(\''+lang.sig_required+'\');return false;}else lkn_bbSig.auto(this.checked);" tabindex="-1" /> Auto...</label>\n\
<input type="button" value="'+lang.change_sig+'" onclick="lkn_bbSig.editSig(true);" tabindex="-1" />\n\
<textarea rows="5" cols="55" id="lkn_bbSigedit" onblur="lkn_bbSig.editSig();" style="display:none;" tabindex="-1"></textarea>';
	if(bbf.nextSibling) bbf.parentNode.insertBefore(sig, bbf.nextSibling);
	else bbf.parentNode.appendChild(sig);
	sig = document.getElementById('lkn_bbSigedit');
	sig.addEventListener('keydown', createBBFunc('lkn_bbSigedit'), true);
	bbf.form.addEventListener('submit', function(){
		if(lkn_bbSig.auto()) lkn_bbSig();
	}, true);
}
}