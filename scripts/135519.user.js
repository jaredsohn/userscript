// ==UserScript==
// @name           DS-Signatur
// @namespace      Jano1
// @description    التوقيع في المنتدى الداخلي للقبيلة
// @version        1.10
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=settings&mode=settings
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&screenmode=view_thread&thread_id=*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&mode=new_thread*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&screenmode=view_thread&action=new_post&h=*&thread_id=*&answer=true*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&mode=new_poll*
// ==/UserScript==

//SCRIPT-API
var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'DS-Signatur im internen Forum', [8.3], 'Jano1', 'jano1_scripts@web.de' );

// uW umgehen (einfügen eines <script>-Objektes):
var uW = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
function addScript(myScript){var script = document.createElement("script");script.type = "application/javascript";script.textContent = myScript;document.body.appendChild(script);}
// Cookie erstellen.
uW.createCookie = function (name,value,days) {if (days) {var date = new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires = "; expires="+date.toGMTString();}else var expires = "";document.cookie = name+"="+value+expires+"; path=/";}
// Cookie auslesen.
function readCookie(name) {var nameEQ = name + "=";var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;}
// Get Variablen aus URL auslesen und abspeichern.
function getUrlVars(){var vars = [], hash;var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');for(var i = 0; i < hashes.length; i++){hash = hashes[i].split('=');vars.push(hash[0]);vars[hash[0]] = hash[1];}return vars;}
// document.getElementsByClassName wird erm?glicht.
document.getElementsByClassName = function(class_name) {var docList = this.all || this.getElementsByTagName('*');var matchArray = new Array();var re = new RegExp("\u0000-\u0020"+class_name+"\u0000-\u0020");for (var i = 0; i < docList.length; i++) {if (re.test(docList[i].className) ) {matchArray[matchArray.length] = docList[i];}}return matchArray;}
// Cookies für Benutzung erstellen:
		var standart_text = 'Signatur im internen Stammesforum? - [i]Unm?glich?[/i]<br />NEIN! Denn hier kannst [b]du[/b] dir auch Eine besorgen:[url=\'http://forum.die-staemme.de/showthread.php?t=154979\'] DS-Forum[/url]<br />Diese ganzen Signaturen nerven? Aber hey, dasselbe Script kann die ja auch verschwinden lassen! Coole Sache :]<br /><br />[b]Es lohnt sich wirklich![/b]';
		if(readCookie('ds_signatur') == null){uW.createCookie('ds_signatur',standart_text,365);}
		if(readCookie('ds_sigverbergen') == null){uW.createCookie('ds_sigverbergen','0',365)};
		if(readCookie('ds_sigzeigen') == null){uW.createCookie('ds_sigzeigen','0',365)};


/*
An dieser Stelle ein hoch auf base64 :] BILDER OHNE FREMDEINBINDUNG! SEGEN! AMEN!
*/		
var images = {
	
	no_image : "data:image/png;base64,R0lGODlhMgAyAJEAAEGAunNzc////wAAACH5BAAAAAAALAAAAAAyADIAAALwhI+py60Co5y02hsN3rxD7YXiB4xmB55qla4uaQXy67VTQNdlHMmz35tBfDgB0GKTFI29ppI5hEonSad0WSRejVrWroK14sJkTjWK3pajYW9M2IZ250J3Dqy7K+vmr9509tcneBJIeGGospQnuIjix9E1BHf0KNKGOZJ445QpsvmE5hkCKpaWpQm5EVfJRap6uFEaC0PLaDuIm3syhseJBHvpG2q34phmRdFyhAknR1mXxVfVi8xU3ZQZt8x8BVStpS2Zon16rdY5lfHFatq7JrdVOxm99/P8Uym9OEvbH/vvUEBCAwUV/OMgocKFCQoAADs=", 
	
	base64 : {
		button_left:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAXCAMAAADJPRQhAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAGBgYGhoaHBwcIiIiQ0NDUFBQU1NTVlZWWVlZdnZ2d3d3eXl5enp6e3t7gEAAgkQFhUgKik8UjlUckFoilF4nkl4olF8olGAqlmItmGYxmmgznGk1n289pHZEo3hJpHhIqX9QqX5RqoBRqoBSq4JTrIJUrINVrYRWrYVXqYRZqoVaq4Zbq4ZcrIZcrYhdrYheuJRsgoKCg4ODhISEhYWFhoaGiYmJioqKjY2Nj4+PkJCQlJSUlpaWl5eXmJiYmZmZnJyco6OjpaWlsLCws7OztLS0ubm5urq6u7u7vb29vr6+v7+/zcWzzsa0z8e108aw0Mi21Miz0sq41My61s6818+92NC+wMDAwcHBw8PDxsbGx8fHyMjIycnJy8vLzMzMzs7O2tLA0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2tra29vb3d3d4NjG4drI5dzK5t3L597L6N/M6+DK6ODO7OHL6uLQ7ubU8enW8urY8+za9O7d9vDe5ubm5+fn6enp7u7u7+/v+PLg+PPl+fbm+fbn+fbo+vjp+/js8PDw+/v7/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA01FS1wAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAHdElNRQfbAhkLKQXbhYm8AAAAGHRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuMzap5+IlAAABXklEQVQoU2P4jwswkCkjK4wNAE0TFNbQ0NTU1NDQUFdXU1VRUVYEA4b/gnJlza0d7e3tbW1trUiAQUmopL2qAgtgkJJpbynHBoAynRCZpgg7Y3NzM3uvRog6kJ5aIN0TbWnqmZyQ4eJoZRHVDZVprikv7/Pmi+wq73E1yYzP9eF174PoqaksL0/kTunPaejyYuLMTOhP54oDy0hXV5SXm1r1lMfHslmzskSl9vc6mIBlpIBayhO4U/sz09kZmTnSU/qzeWLAMpIFBUB7PHgj6pIzTIzSUupj+Nx6wTISSXml5eXdUebWTq5ZWa7ONsbRIAcAZcRDkorLS0tLG73szCwszGzdG4AcIGCQEvMNL4CwUQHQHt+Q/OICECgsLCoqKoYBBgWhgJDQkFAQCAOBcBhg+C8gHxQe7AcC/iAQCAMM/w0FRPQNdLW1tLV19HW0dfR0QaSOjjYohYjyYwMAiWP0I0/Vzw4AAAAASUVORK5CYII=",
	},
	
};

var strings = {
	
	elements : {
		sig:'sig',
		restz:'restz',
		form:'form',
		checksig:'checksig',
		checksig2:'checksig2',
		okornot:'okornot',
		janosavesettings:'janosavesettings',
	},
	
	alerts : {
		al1:'"Bitte maximal "+maxLen+" Zeichen eingeben!"',
	},
	
	cookies : {
		ds_signatur:'ds_signatur',
		ds_sigverbergen:'ds_sigverbergen',
		ds_sigzeigen:'ds_sigzeigen',
	},
	
	HTML : {
		save_settings:'<span id="janosavesettings" style="display:inline"><font color="green"><b> تم الحفظ</b></font></span>',
		br:'<br />',
	},
	
	regex : {
		find_n:/\n/g,
		find_r:/\r/g,
		find_rn:/\r\n/g,
		find_br:/<br \/>/g,
		find_bbcode:/BBCodes.insert\(/g,
		find_first_h2:/<h2>(.+)<\/h2>/,
		hide_sigs:/<br> __________________[^_]/,
	},
};

		
		
//////////////////////////////////////
//Diverse Einstllungen zur Signatur //
//lassen sich hier Bearbeiten:		//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(getUrlVars()['screen'] == 'settings'){

	uW.checkLen = function(){
		maxLen=400;
		var txt = document.getElementById(strings.elements.sig).value;
		if(txt.length>maxLen){
			alert(eval(strings.alerts.al1));
			document.getElementById(strings.elements.sig).value=txt.substring(0,maxLen);
			document.getElementById(strings.elements.restz).innerHTML=0;
		}else{
			document.getElementById(strings.elements.restz).innerHTML=maxLen-txt.length;
		}
		//document.getElementById(strings.elements.janosavesettings).style.display = 'none';
	}

	uW.bitreplace = function (){
		var find = strings.regex.find_n;
		if(window.opera){
			find = strings.regex.find_rn;
		}
		var txt = document.getElementById(strings.elements.sig).value.replace(find,strings.HTML.br);
		txt = txt.replace(/;/g,"&#59");
		if(window.opera){txt = txt.replace(/"/g,"'");}
		var jein = 0; if(document.getElementById(strings.elements.checksig).checked == true){jein = 1;}
		var jein2 = 0; if(document.getElementById(strings.elements.checksig2).checked == true){jein2 = 1;}
		uW.createCookie(strings.cookies.ds_signatur,txt,365);
		uW.createCookie(strings.cookies.ds_sigverbergen,jein,365);
		uW.createCookie(strings.cookies.ds_sigzeigen,jein2,365);
		document.getElementById(strings.elements.okornot).innerHTML = strings.HTML.save_settings;
		uW.checkLen();
	}
	
	uW.make_standart = function(){
		uW.createCookie(strings.cookies.ds_signatur,standart_text,365);
		uW.createCookie(strings.cookies.ds_sigverbergen,'0',365);
		uW.createCookie(strings.cookies.ds_sigzeigen,'0',365);
		document.getElementById('checksig').checked = false;
		document.getElementById('checksig2').checked = false;
		document.getElementById('sig').value = standart_text.replace(strings.regex.find_br,"\n");
		document.getElementById(strings.elements.okornot).innerHTML = strings.HTML.save_settings;
	}
	
	var sigverbergen = ''; if(readCookie(strings.cookies.ds_sigverbergen) == '1'){sigverbergen = 'checked';}
	var sigzeigen = ''; if(readCookie(strings.cookies.ds_sigzeigen) == '1'){sigzeigen = 'checked';}
	document.getElementsByTagName(strings.elements.form)[0].parentNode.innerHTML += '<table class="vis"><tr><th colspan="2">التوقيع:</th></tr><tr><td colspan="2">خيارات التوقيع في منتدى القبيلة<br><br><input '+sigverbergen+' type="checkbox" id="checksig"> اخفاء التوقيع<br><input '+sigzeigen+' type="checkbox" id="checksig2"> اظهار التوقيع</td></tr><tr><td colspan="2"><textarea onkeyup="checkLen()" id="sig" name="personal_text" cols="60" rows="5" value="">'+readCookie("ds_signatur").replace(strings.regex.find_br,"\n")+'</textarea></td></tr><tr><td colspan="2">الحروف المتاح استخدامها: <b><span id="restz"></span></b></td></tr><tr><td><input type="submit" name="send" value="OK" onclick="bitreplace();" />&nbsp;&nbsp;&nbsp;<input type="submit" name="send" value="Standart" onclick="make_standart();" /><span id="okornot"></span></td><td align="right"><a href="http://help.tribalwars.ae/wiki/BB_codes" target="_blank">BB-Codes</a></td></tr></table><td align="right"><a href="http://forum.tribalwars.ae/member.php?u=13919" target="_blank">ElchArrO</a></td></tr></table>';
	document.getElementById(strings.elements.restz).innerHTML = 400-document.getElementById(strings.elements.sig).value.length;
}





//////////////////////////////////////////
//Barbeiten, Zitieren und Editieren von //
//Beitr?gen im Stammesforum:			//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(getUrlVars()['screen'] == 'forum'){
	
	////////////////////////////////////////////////////////////////////
	//Code von DS-JS
	uW.insertBB = function(start_tag,end_tag,force_place_outside){
		var input=document.getElementById('message');input.focus();
		if(typeof document.selection!='undefined'){
			var range=document.selection.createRange(),
			ins_text=range.text;range.text=start_tag+ins_text+end_tag;
			range=document.selection.createRange();
			if(ins_text.length>0||true==force_place_outside){
				range.moveStart('character',start_tag.length+ins_text.length+end_tag.length)
			}else 
				range.move('character',-end_tag.length);range.select()
		}else if(typeof input.selectionStart!='undefined'){
			var start=input.selectionStart,
			end=input.selectionEnd,
			ins_text=input.value.substring(start,end),
			scroll_pos=input.scrollTop;
			input.value=input.value.substr(0,start)+start_tag+ins_text+end_tag+input.value.substr(end);
			var pos;
			if(ins_text.length>0||true===force_place_outside){
				pos=start+start_tag.length+ins_text.length+end_tag.length
			}else 
				pos=start+start_tag.length;input.setSelectionRange(start+start_tag.length,end+start_tag.length);
				input.scrollTop=scroll_pos
		}
			//Editierungsfunktion aufrufen
			if(edit1){uW.editpremessage(1);}else{uW.editpremessage(0);}
		;return false
	}
	if(document.getElementById('bb_bar') != null){
		document.getElementById('bb_bar').innerHTML = document.getElementById('bb_bar').innerHTML.replace(/BBCodes.insert\(/g,'insertBB(');
	}

	// Farben einfügen
	uW.insertColor = function(assign){
		var inp=document.getElementById('bb_color_picker_tx');
		if(assign){
			uW.insertBB('[color='+inp.value+']','[/color]');
			//document.getElementById('bb_sizes').style.display='inline-block';
			//document.getElementById('bb_color_picker').style.display='inline-block';
		}
	}
	if(document.getElementById('bb_color_picker_ok') != null){
		document.getElementById('bb_color_picker_ok').setAttribute('onclick','insertColor(true);return false;');
	}
	//Code von DS-JS ENDE
	////////////////////////////////////////////////////////////////////
	
	
	
	//AusblendeFunktion:
	function HideSigs(){
		var posts = document.getElementsByClassName('text'); var i = 0;
		var b = "<br>";
		var nl = "\n";
		if(window.opera){b = "";nl = "";}
		while(i < posts.length){
			posts[i].innerHTML = posts[i].innerHTML.split(b+nl+"__________________"+b)[0];
			i++;
		}
	}
	addScript(HideSigs);
		
	//Signaturen verbergen Button - hinzufügen
	if(getUrlVars()['thread_id'] != null){
		var target = document.getElementById('forum_box').innerHTML.match(/<h2>(.+)<\/h2>/);
		document.getElementById('forum_box').innerHTML = document.getElementById('forum_box').innerHTML.replace(target[0],target[0]+
		'<a class="thread_button" onclick="HideSigs();document.getElementById(\'janochangenaame\').innerHTML=\'Signaturen ausgeblendet\';this.setAttribute(\'onclick\',\'alert(\\\'Seite neuladen um die Signaturen wieder einzublenden!\\\');\')" style="cursor: pointer;">'+
		'<span style="background:url(\''+images.base64.button_left+'\') no-repeat scroll 0 0 transparent;min-width:10px;padding-left:0t;padding-right:0;width:25px;"></span>'+
		'<span id="janochangenaame" class="thread_answer">Signaturen in diesem Thread ausblenden</span>'+
		'<span class="thread_answer_close"></span>'+
		'</a>');
	}

	//Signaturen in den Threads verbergen
	if(readCookie('ds_sigverbergen') == 1){
		HideSigs();
	}
	
	//Umbruch:
	var normalU = '\n\n__________________\n';
	if(window.opera){
		var normalU = '\r\n\r\n__________________\r\n';
	}
	
	//Hier wird die Signatur dem Text angeh?ngt.
	uW.editpremessage = function (edit){
		var sig;
		if(edit != 1){
			if(readCookie('ds_sigzeigen') == 0 && document.getElementById('show_sig_in_text').checked == true){sig = readCookie('ds_signatur').replace(/<br \/>/g,"\n").replace(/&#59/g,";");}else{sig = null;}
		}else{
			if(sig_text[1] != undefined){sig = sig_text[1];}else{sig = null;}
		}
		
		if(sig != null){
			var reply = document.getElementById('message').value+normalU+sig;
			document.getElementById('sig_message').value = reply;
		}else{
			document.getElementById('sig_message').value = document.getElementById('message').value;
		}
	}
	
	//Text-Areas für kurze Zeit vorm Senden umbenennen:
	uW.changeNames = function(typ){	
		if(typ == 0){
			document.getElementById('message').name = 'sig_message';
			document.getElementById('message').id = 'sig_message';				
			document.getElementById('pre-message').name = 'message';
			document.getElementById('pre-message').id = 'message';
		}
		if(typ == 1){
			document.getElementById('message').name = 'pre-message';
			document.getElementById('message').id = 'pre-message';
			document.getElementById('sig_message').name = 'message';
			document.getElementById('sig_message').id = 'message';
		}
	}
	document.getElementsByName('send')[0].setAttribute('onmouseover','changeNames(1);')
	document.getElementsByName('send')[0].setAttribute('onmouseout','changeNames(0);')
	document.getElementsByName('preview')[0].setAttribute('onmouseover','changeNames(1);')
	document.getElementsByName('preview')[0].setAttribute('onmouseout','changeNames(0);')
	
	//Antworten	
		var edit1 = false;	
 		document.getElementById('message').setAttribute('onkeyup','editpremessage();');
		document.getElementById('message').setAttribute('onclick','editpremessage();');
		document.getElementById('message').setAttribute('onmouseover','editpremessage();');
		document.getElementById('message').setAttribute('onmousout','editpremessage();');
		document.getElementById('message').setAttribute('onchange','editpremessage();');		
		var span = document.createElement('textarea');
		var target_object = document.getElementById('message');
		span.setAttribute('id','sig_message'); span.setAttribute('style','visibility:hidden;position:absolute;'); span.setAttribute('name','sig_message'); span.rows = '10'; span.cols = '50';
		target_object.parentNode.insertBefore(span,target_object);
			var checked_jano = ''; if(readCookie('ds_sigzeigen') == '0'){checked_jano = 'checked';}
		document.getElementById('bb_bar').parentNode.innerHTML += '<span title="Beim Editieren wird deine Signatur nie hinzugefügt oder eine bestehnde ver?ndert!"><input '+checked_jano+' type="checkbox" id="show_sig_in_text"> Signatur anh?ngen. <a href="http://'+window.location.host+'/game.php?village='+getUrlVars()['village']+'&screen=settings&mode=settings" target="_blank"><font size="1">[&raquo;Einstellungen]</font></a></span>';
		uW.editpremessage();
	
	//Zitieren
	if(getUrlVars()['quote_id'] != undefined){
		var text = document.getElementById('message').value.split(normalU);
		var quote = '[/quote]'; if(text.length == 1){quote = '';}
		document.getElementById('message').value = text[0]+quote;
		uW.editpremessage();
	}
	
	//Bearbeiten / Vorschau
	if(getUrlVars()['edit_post_id'] != undefined || getUrlVars()['h'] != undefined){
		document.getElementById('message').setAttribute('onkeyup','editpremessage(1);');
		document.getElementById('message').setAttribute('onclick','editpremessage(1);');
		document.getElementById('message').setAttribute('onmouseover','editpremessage(1);');
		document.getElementById('message').setAttribute('onmousout','editpremessage(1);');
		document.getElementById('message').setAttribute('onchange','editpremessage(1);');		
		var sig_text = document.getElementById('message').value.split(normalU);
		document.getElementById('message').value = sig_text[0];
		uW.editpremessage(1); edit1 = true;
	}
}