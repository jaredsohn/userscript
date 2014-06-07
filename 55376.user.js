// ==UserScript==
// @name Pennergame meesssages bbc code maker by basti1012 endversion beta fuer shoutbox
// @namespace by basti1012 http://pennerhack.foren-city.de
// @description Fuegt einen bbc code generator ein zum leichten schreiben mit bbc codes
// @include *pennergame.de/gang/
// @exclude *pennergame.de/messages/out*
// @exclude *pennergame.de/messages/
// ==/UserScript==



var smilies = new Array(
'http://forum.die-staemme.de/images/phpbb_smilies/icon_biggrin.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_smile.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_wink.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cool.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_razz.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_eek.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_surprised.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_twisted.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_evil.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_confused.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_neutral.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_sad.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cry.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_mrgreen.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em16.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em17.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em18.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em19.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em1500.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2100.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2200.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2300.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2400.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2900.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3000.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3300.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3400.gif');




  for(var i = 0; i < smilies.length; i++)
    {

   // a.setAttribute('style','vertical-align:middle; ');

			newa = document.createElement('a');
  newa.setAttribute('id','bb_smilies[i]');
			newa.setAttribute('class', 'new_msg_infoscreen');
 			newa.setAttribute('href', 'http://pennerhack.foren-city.de');
 			newa.setAttribute('alt', ''+smilies[i]+'');
			newa.setAttribute('title', 'BBc code aktive http://pennerhack.foren-city.de  Mfg basti1012');
			newa.setAttribute('style', 'margin-right:35px');
    			newimg = newa.appendChild(document.createElement('img'));
			newimg.setAttribute('src', ''+smilies[i]+'');
			newimg.setAttribute('width', '20');
  			newimg.setAttribute('height', '20');
  			newimg.setAttribute('border', '0');
   document.getElementById("infoscreen").insertBefore(newa, document.getElementsByTagName("form")[0]);
				
}



(function(){


	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addBBCode() {' +
		'var tag = arguments[0];' +
		'var value = arguments[1];' +
		'var str1;' +
		'if (value) {' +
			'if (value=="0") return;' +
			'str1 = "[" + tag + "=" + value + "]";' +
		'} else {' +
			'str1 = "[" + tag + "]";' +
		'}' +
		'var str2 = "[/" + tag + "]";' +
		'var message = document.getElementsByName("f_text")[0];' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'var seltext = rng.text;' +
			'rng.text = str1 + seltext + str2;' +
			'rng.collapse(false);' +
			'rng.move("character",-str2.length);' +
			'rng.moveStart("character",-seltext.length);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var seltext = message.value.substring(start,message.selectionEnd);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str1 + seltext + str2 + endtext;' +
			'message.selectionStart = start + str1.length;' +
			'message.selectionEnd = start + str1.length + seltext.length;' +
		'}' +
		'message.focus();' +
	'}';

//var table = document.getElementsByT%agName('form')[0];
//table.parentNode.insertBefore(script,table);
//var td = table.getElementsByTagName('td')[1];


var div = document.getElementsByName('form1')[0];
div.parentNode.insertBefore(script,div);
var td = div.getElementsByTagName('li')[1];





div.innerHTML +="<br><br><select  onchange='addBBCode(this.value)'><option value='0'>Sonstiges</option><option value='i'>Schief</option><option value='u'>unterschtriechen</option><option value='img'>img</option><option value='url'>Url</option><option value='list'>list</option><option value='quote'>quote</option><option value='code'>code</option><option value='b'>Fettschrieft</option><option value='center'>Zentriert</option><option value='ref'>Spendenlink ref</option><option value='marquee'>Laufschrieft</option><option value='youtube'>Youtube</option><option value='youtube_m'>Youtube klein</option></select> "
+"<select onchange='addBBCode(\"font\",this.value)'><option value='0'>Schrieftarten</option><option value=''>Nicht fuer Pennergame</option><option value='arial'>Arial</option><option value='comic sans ms'>Comic</option><option value='courier new'>Courier New</option><option value='tahoma'>Tahoma</option><option value='times new roman'>Times New Roman</option><option value='verdana'>Verdana</option></select> "
+"<select onchange='addBBCode(\"size\",this.value)'><option value='0'>Schrieftgr&ouml;sen</option><option value='7'>tiny</option><option value='10'>small</option><option value='12'>normal</option><option value='16'>big</option><option value='20'>huge</option><option value=''> </option><option value=''>---Ab hier Pennergame groessen ---</option><option value=''></option><option value='big'>Big</option><option value='small'>Small</option></select> "
+"<select onchange='addBBCode(\"color\",this.value)'><option value='0'>Schrieft farben</option><option value='black' style='color:black'>black</option><option value='silver' style='color:silver'>silver</option><option value='gray' style='color:gray'>gray</option><option value='maroon' style='color:maroon'>maroon</option><option value='brown' style='color:brown'>brown</option><option value='red' style='color:red'>red</option><option value='orange' style='color:orange'>orange</option><option value='yellow' style='color:yellow'>yellow</option><option value='lime' style='color:lime'>lime</option><option value='green' style='color:green'>green</option><option value='olive' style='color:olive'>olive</option><option value='teal' style='color:teal'>teal</option><option value='aqua' style='color:aqua'>aqua</option><option value='blue' style='color:blue'>blue</option><option value='navy' style='color:navy'>navy</option><option value='purple' style='color:purple'>purple</option><option value='fuchsia' style='color:fuchsia'>fuchsia</option><option value='pink' style='color:pink'>pink</option><option value='white' style='color:white'>white</option></select> "
+"<select onchange='addBBCode(this.value)'><option value='0'>Seltene Codes</option><option value='0'></option><option value='pre'>pre</option><option value='left'>left</option><option value='right'>right</option><option value='email'>email</option><option value='ftp'>ftp</option><option value='move'>move</option><option value='sup'>sup</option><option value='sub'>sub</option><option value='sevenload'>sevenload</option><option value='myvideo'>myvideo</option><option value='clipfish'>clipfish</option><option value='blink'>blink</option><option value='warning'>warning</option></select>";




})();

// Copyright by basti1012 nicht alle bbc codes sind fuer pennergame geeignet einfach mal testen


