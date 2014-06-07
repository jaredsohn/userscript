// ==UserScript==
// @name           Triburile sMiLEys
// @description    Adauga butoane cu emoticoane, se activeaza cind scri mesaj pe forum
// @include        http://ro*.triburile.ro/forum.php*
// ==/UserScript==

function log() {
	try {
		if(unsafeWindow && unsafeWindow.console){
		   unsafeWindow.console.log(arguments);
		} else if ( GM_log )
			GM_log(arguments);
	} catch(ex) {
		//nu fa nimic		
	}
}

msgElem = document.getElementById("message");
if ( msgElem && msgElem.nodeType==1 && msgElem.nodeName=="TEXTAREA" && /\/forum.php/.test(window.location.href) ) {
	//alert('aaa');
	parentTD = msgElem.parentNode;
	parentTR = parentTD?parentTD.parentNode:null;
	var prevTR = null;
	if ( parentTR ) {
		prevTR = parentTR.previousSibling;
		while ( prevTR && prevTR.nodeName != parentTR.nodeName )
			prevTR = prevTR.previousSibling;
	}
	butDIV = null;
	if ( prevTR ) {
		var i = 0;
		while ( i<prevTR.childNodes.length && !butDIV ) {
			childNode = prevTR.childNodes[i];
			if ( childNode.nodeType==1 && childNode.nodeName == "TD" ) {
				prevTD = childNode;
				var j = 0;
				while ( j<prevTD.childNodes.length && !butDIV ) {
					childNode = prevTD.childNodes[j];
					if ( childNode.nodeType==1 && childNode.nodeName == "DIV" )
						butDIV = childNode;
					j++;
				}
			}
			i++;
		}
	}
	var getUrl = function(index) {
		var ymUrl = "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/";
		return ymUrl + index + ".gif";
	}
	if ( butDIV ) {
		var dictEmoticoane = {
			4:[':D','biggrin'],
			5:[';;)','battingeyelashes'],
			3:[';)','winking'],
			6:['>:D<','bighug'],
			7:[':-/','confused'],
			8:[':x','lovestruck'],
			9:[':">','blushing'],
			10:[':P','tongue'],
			11:[':-*','kiss'],
			12:['=(())','brokenheart'],
			13:[':-O','surprise'],
			14:['X(','angry'],
			15:[':>','smug'],
			16:['B-)','cool'],
			17:[':-S','worried'],
			18:['#:-S','whew!'],
			19:['>:)','devil'],
			20:[':((','crying'],
			2:[':(','sad'],
			21:[':))','laughing'],
			1:[':)','happy'],
			22:[':|','straightface'],
			23:['/:)','raisedeyebrows'],
			24:['=))','rollingonthefloor'],
			25:['O:-)','angel'],
			26:[':-B','nerd'],
			27:['=;','talktothehand'],
			28:['I-)','sleepy'],
			29:['8-|','rollingeyes'],
			30:['L-)','loser'],
			31:[':-&','sick'],
			32:[':-$','don\'ttellanyone'],
			33:['[-(','notalking'],
			34:[':O)','clown'],
			35:['8-}','silly'],
			36:['<:-P','party'],
			37:['(:|','yawn'],
			38:['=P~','drooling'],
			39:[':-?','thinking'],
			40:['#-o','d\'oh'],
			41:['=D>','applause'],
			42:[':-SS','nailbiting'],
			43:['@-)','hypnotized'],
			44:[':^o','liar'],
			45:[':-w','waiting'],
			46:[':-<','sigh'],
			47:['>:P','phbbbbt'],
			48:['<):)','cowboy'],
			49:[':@)','pig'],
			50:['3:-O','cow'],
			51:[':(|)','monkey'],
			52:['~:>','chicken'],
			53:['@};-','rose'],
			54:['%%-','goodluck'],
			55:['**==','flag'],
			56:['(~~)','pumpkin'],
			57:['~O)','coffee'],
			58:['*-:)','idea'],
			59:['8-X','skull'],
			60:['=:)','bug'],
			61:['>-)','alien'],
			62:[':-L','frustrated'],
			63:['[-O<','praying'],
			64:['$-)','moneyeyes'],
			65:[':-"','whistling'],
			66:['b-(','feelingbeatup'],
			67:[':)>-','peacesign'],
			68:['[-X','shameonyou'],
			69:['\:D/','dancing'],
			70:['>:/','bringiton'],
			71:[';))','heehee'],
			72:['o->','hiro'],
			73:['o=>','billy'],
			74:['o-+','april'],
			75:['(%)','yinyang'],
			76:[':-@','chatterbox'],
			77:['^:)^','notworthy'],
			78:[':-j','ohgoon'],
			79:['(*)','star'],
			100:[':)]','onthephone'],
			101:[':-c','callme'],
			102:['~X(','atwits\'end'],
			103:[':-h','wave'],
			104:[':-t','timeout'],
			105:['8->','daydreaming'],
			106:[':-??','Idon\'tknow'],
			107:['%-(','notlistening'],
			108:[':o3','puppydogeyes'],
			109:['X_X','Idon\'twanttosee'],
			110:[':!!','hurryup!'],
			111:['\m/','rockon!'],
			112:[':-q','thumbsdown'],
			113:[':-bd','thumbsup'],
			114:['^#(^','itwasn\'tme'],
			115:[':bz','bee']
		};
		var getEmo=function (index) {
			var emo = dictEmoticoane[index];
			if ( emo && emo.length>0 )
				return emo[0];
			return index;
		}
		var getYFunc = function(type, index) {
			if ( type == "emo" )
				return getEmo(index);
			else if ( type == "url" )
				return getUrl(index);
			else if ( type == "cod" )
				return getUrl(index);
			return "";
		}
		var getBunnyFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
			return "http://www.laymark.com/i/cz/cz" + (index<10?"0":"")+index + ".gif";
			return "";
		}
		var getKittyFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
			return "http://www.laymark.com/i/o/" + (index<10?"0":"")+index + ".gif";
			return "";
		}
		var getMonkeyFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
			return "http://www.laymark.com/i/m/m0" + (index<10?"0":"")+index + ".gif";
			return "";
		}
//*************************************************************************************
		var getparFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
                        return "http://i784.photobucket.com/albums/yy128/mister-no/script/par/" + (index<10?"0":"")+index + ".gif";
			return "";
		}
		var getsigFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
                        return "http://i784.photobucket.com/albums/yy128/mister-no/script/sig/" + (index<10?"0":"")+index + ".gif";
			return "";
		}
		var getbatFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
                        return "http://i784.photobucket.com/albums/yy128/mister-no/script/bat/" + (index<10?"0":"")+index + ".gif";
			return "";
		}
		var getallFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
                        return "http://i784.photobucket.com/albums/yy128/mister-no/script/all/" + (index<10?"0":"")+index + ".gif";
			return "";
		}
		var getl0vFunc = function(type, index) {
			if ( type == "url" || type=="cod" )
                        return "http://i784.photobucket.com/albums/yy128/mister-no/script/lov/" + (index<10?"0":"")+index + ".gif";
			return "";
		}
//*************************************************************************************
		var adaugaButonEmoticoane = function (nume, id, index_start, index_sfarsit, nr_coloane, index_buton, poz_left, width, zIndex, getFunc, arePreview, areCadru, areMesaj) {
			var addHTML = "";
			addHTML += '<div style="position:relative;display:inline;margin:0;padding:0;">';
			addHTML += '	<a title="'+nume+'" href="#" onclick="var s=document.getElementById(\'smileys'+id+'\'); var d=s.style.display; s.style.display=(d==\'\'?\'none\':\'\');return false;"> ';
			addHTML += '		<img src="'+getFunc("url", index_buton)+'" '+(areCadru?'style="border:1px solid #d9cfb0;" ':'')+'border=0 width="'+width+'px" height="18px">';
			addHTML += '	</a> ';
			addHTML += '    <div id="smileys'+id+'" style="display:none;position:absolute;left:'+poz_left+'px;top:29px;z-index:'+zIndex+'"><table style="border:2px solid #804000;background-color: #F8F4E8;" cellspacing=2>'
			addHTML += '        <tbody>';
			
			addHTML += '            <tr>';
			var i;
			var imgIndex=1;
			var max_linie = nr_coloane;
			for( i=index_start; i<=index_sfarsit; i++) {
				addHTML += '                <td align=center style="position:relative;"';
				if ( arePreview )
					addHTML += ' onmouseover="var div=document.getElementById(\'tooltip'+id+'\');div.childNodes[0].src=\''+getFunc("url", i)+'\';div.style.display=\'\';return false;" onmouseout="document.getElementById(\'tooltip'+id+'\').style.display=\'none\';return false;"';
				addHTML += '><img title=\''+getFunc("emo", i)+'\' src="'+getFunc("url", i)+'" border="1" href="#" height="18px" onclick="javascript: document.getElementById(\'smileys'+id+'\').style.display=\'none\';cod=\''+getFunc("cod",i)+'\';'+(areMesaj?'mesaj = escape(document.getElementById(\'text_'+id+'\').value.replace(\'#\',\'\')||\'Heloo!!!\');cod=cod.replace(\'??text??\',mesaj);':'')+'cod=\' [img]\'+cod+\'[/img] ... \';insertBBcode(\'message\', cod, \'\');return false;">';
				addHTML += '				</td>';
				if ( (i-index_start+1)%max_linie == 0 ) {
					addHTML += '			</tr>';
					if ( i< index_sfarsit )
						addHTML += '            <tr>';
				}
			}
			i--;
			var rest = (max_linie-((i-index_start+1)%max_linie))%max_linie;
			if ( rest > 0 ) {
				if ( rest > 1 )
					addHTML += '				<td colspan="'+rest+'">&nbsp;</td>';
				else
					addHTML += '				<td>&nbsp;</td>';
				addHTML += '			</tr>';
			}
			if ( areMesaj ) {
				addHTML += '            <tr>';
				addHTML += '				<td style="border-top: 1px solid black;padding-top:2px;" colspan="'+max_linie+'">mesaj: <input type=text style="border: 1px solid black;width:80px;" id="text_'+id+'"></td>';
				addHTML += '			</tr>';
			}
			addHTML += '		</tbody>';
			addHTML += '	</table></div>';
			if ( arePreview )
				addHTML += '    <div id="tooltip'+id+'" style="display:none;position:absolute;bottom:25px;left:'+(width+1)+'px;z-index:'+(zIndex+100)+';border:1px solid #804000;background-color: #F8F4E8;"><img src=""></div>';
			addHTML += '</div>';
			return addHTML;
		}
		   try {
			butDIV.innerHTML+=adaugaButonEmoticoane('sMILEy Bunny',	 'Bunny',	  1,  53,	9,   45,	-340, 18, 103, getBunnyFunc,  true, true, false);
			butDIV.innerHTML+=adaugaButonEmoticoane('sMILEy Kitty',	   'Kitty',	  1,  108,	12,    1,	-300, 18, 103, getKittyFunc,  true, true, false);
			butDIV.innerHTML+=adaugaButonEmoticoane('sMILEy Monkey',    'Monkey',   1,   99,	11,  53,	-390, 18, 100, getMonkeyFunc, true, true, false);

			butDIV.innerHTML+=adaugaButonEmoticoane('SmileY Gramada',   'Gramada',  12,  67,  7,    5,   -333, 18, 100, getallFunc,  true, false, false);
			butDIV.innerHTML+=adaugaButonEmoticoane('SmileY bataie',           'bataie',   11,  34,  3,  10,   -99, 18, 100, getbatFunc, true, false, false);

			butDIV.innerHTML+=adaugaButonEmoticoane('SmileY Party',            'Party',    61,  84,  3,  60,   -85, 18, 100, getparFunc, true, false, false);
			butDIV.innerHTML+=adaugaButonEmoticoane('SmileY l0v',                      'l0v',  13,  26,  2,  1,   -78, 18, 100, getl0vFunc,  true, false, false);

			butDIV.innerHTML+=adaugaButonEmoticoane('SmileY Topic',	    'Topic',   46,   93,    6,  45,  -220, 18, 100, getsigFunc, true, true, false);
			butDIV.innerHTML+=adaugaButonEmoticoane('sMILEy YaHoo 1',   'YaHoo 1',	    1,    79,  10,   1,   -333, 18, 101, getYFunc,   false, false, false);
			butDIV.innerHTML+=adaugaButonEmoticoane('sMILEy YaHoo 2',   'YaHoo 2', 100,  115,    2,   2,   -66, 18, 102, getYFunc,   false, false, false);
		        } catch(ex) {
			log("[smileys] error: "+ex.message);
		}
	}
	//cauta butonul de submit
	var nextTR = null;
	if ( parentTR ) {
		nextTR = parentTR.nextSibling;
		while ( nextTR && nextTR.nodeName != parentTR.nodeName )
			nextTR = nextTR.nextSibling;
	}
	butSubmit = null;
	if ( nextTR ) {
		var i = 0;
		while ( i<nextTR.childNodes.length && !butSubmit ) {
			childNode = nextTR.childNodes[i];
			if ( childNode.nodeType==1 && childNode.nodeName == "TD" ) {
				nextTD = childNode;
				var j = 0;
				while ( j<nextTD.childNodes.length && !butSubmit ) {
					childNode = nextTD.childNodes[j];
					if ( childNode.nodeType==1 && childNode.nodeName == "INPUT" )
						butSubmit = childNode;
					j++;
				}
			}
			i++;
		}
	}
	if ( butSubmit ) {
		butSubmit.addEventListener('click', function(event) {
			// event.target is the element that was clicked
			
			//parseaza mesajul si inlocuieste semnele din dictionar cu echivalentul lor in poze
			try {
				var mesajElem = document.getElementById("message");
				var text = mesajElem.value;
				for( index in dictEmoticoane) {
					text = text.replace(new RegExp(dictEmoticoane[index][0],"g"),"###"+index+"###");
				}
				for( index in dictEmoticoane) {
					text = text.replace(new RegExp("###"+index+"###","g"),"[img]"+getUrl(index)+"[/img]");
				}
				mesajElem.value = text;
			} catch(ex) {
				log("[smileys] error: "+ex.message);
			}
			// if you want to prevent the default click action
			// (such as following a link), use these two commands:
			//event.stopPropagation();
			//event.preventDefault();
		}, true);
	}
}