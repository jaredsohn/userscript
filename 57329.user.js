// ==UserScript==
// @name          The West BBcode
// @namespace     YaD
// @description   Best bb codes for the forum and mail.
// @include       http://*.the-west.*/*
// @include       http://zz1w1.tw.innogames.net/game.php*
// @include       http://*.tw.ignames.net/game.php*
// ==/UserScript==
      
      // ======== Variables globales del juego ========
      
      var TW_Use_Cache  = true;
      var TW_Image_Base = "/graphic/";
      var TW_World      = null;
      var TWT_World     = null;
      var TW_Domain     = null;
      var TW_DotWhat    = null;
      var TW_Hash       = null;
      var TW_Screen     = null;
      var TW_Mode       = null;
      var TW_Is_Premium = false;
      var TW_Quickbar   = null;
      var TW_Village_Id = null;
      var TW_Player_Id  = null;
      var TW_Villages   = null;
      var TW_Lang       = null;
      var TW_Mpt        = null;
      var TW_Is_Opera   = window.opera ? true : false;
      
      
      // ======== Hagamos los cambios ========
      
      (function(){

      	if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /screen=mail/ )) {
      		CambiaCuadroTexto();
      		//return;
      	}

      })();

      function CambiaForo() {
      	
      	var adframes = $$("iframe");
      	for (i = 0; i < adframes.length; i++) {
      		adframes[i].src = 'about:blank';
      	}
      	var posts = $$("div");
      	for (i = 0; i < posts.length; i++) {
      		if (posts[i].innerHTML.match(/<iframe/,"gi") != null) {
      			posts[i].style.display = "none";
      		}
      	}
      	
      	CambiaCuadroTexto();
      }
      
      function CambiaCuadroTexto() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
      		    "<tr>    " +
		    '	<td>|</td>' + 
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://yad.wz.cz/ext/t-w/player.png" alt="Hráč" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'city\','+random+');"><img src="http://yad.wz.cz/ext/t-w/city.png" alt="Mesto" /></a></td>' +
		    '   <td>|</td>'+
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://yad.wz.cz/ext/t-w/b.png" alt="Tučne" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://yad.wz.cz/ext/t-w/i.png" alt="Kurzivá" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://yad.wz.cz/ext/t-w/u.png" alt="Podčiarknuté" /></a></td>' +
      		    '	<td>|</td>' +
      		    '	<td><a tabindex="16" href="javascript:insertBB(\'quote\','+random+');"><img src="http://www.offthemap.com/images/site/blockquote.jpg" alt="Cita" /></a></td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'url\','+random+');"><img src="http://yad.wz.cz/ext/t-w/url.png" alt="URL" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'img\','+random+');"><img src="http://yad.wz.cz/ext/t-w/img.png" alt="Imagen" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="19" href="javascript:insertBB(\'large text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon14.gif" /></a></td>' +
		    '	<td><a tabindex="20" href="javascript:insertBB(\'small text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon13.gif" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'white text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/white.png" /></a></td>' +
		    '	<td><a tabindex="22" href="javascript:insertBB(\'black text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/black.png" /></a></td>' +	
		    '	<td><a tabindex="23" href="javascript:insertBB(\'red text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/red.png" /></a></td>' +	
		    '	<td><a tabindex="24" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/yellow.png" /></a></td>' +
		    '	<td><a tabindex="25" href="javascript:insertBB(\'green text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/green.png" /></a></td>' +
		    '	<td><a tabindex="26" href="javascript:insertBB(\'cyan text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/cyan.png" /></a></td>' +
		    '	<td><a tabindex="27" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/blue.png" /></a></td>' +
		    '	<td><a tabindex="28" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/violet.png" /></a></td>' +
		    '	<td>|</td>' +
      		    "</tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="29" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif" /></a></td>' +
                    '	<td><a tabindex="30" href="javascript:insertBB(\'smily smile\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/smile.gif" /></a></td>' +
                    '	<td><a tabindex="31" href="javascript:insertBB(\'smily idea\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_idea.gif" /></a></td>' +
                    '	<td><a tabindex="32" href="javascript:insertBB(\'smily wink\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_wink.gif" /></a></td>' +
                    '	<td><a tabindex="33" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif" /></a></td>' +
		    '	<td><a tabindex="34" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif" /></a></td>' +
                    '	<td><a tabindex="35" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif" /></a></td>' +
                    '	<td><a tabindex="36" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif" /></a></td>' +
                    '	<td><a tabindex="37" href="javascript:insertBB(\'smily cry\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cry.gif" /></a></td>' +
                    '	<td><a tabindex="38" href="javascript:insertBB(\'smily smile2\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_smile.gif" /></a></td>' +
		    '	<td><a tabindex="39" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif" /></a></td>' +
		    '	<td><a tabindex="40" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif" /></a></td>' +
                    '	<td><a tabindex="41" href="javascript:insertBB(\'smily confused\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_confused.gif" /></a></td>' +
		    '	<td><a tabindex="42" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif" /></a></td>' +
		    '	<td><a tabindex="43" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif" /></a></td>' +
		    '	<td><a tabindex="44" href="javascript:insertBB(\'smily redface\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_redface.gif" /></a></td>' +
		    '	<td><a tabindex="45" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif" /></a></td>' +
		    '	<td><a tabindex="46" href="javascript:insertBB(\'smily neutral\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_neutral.gif" /></a></td>' +
		    '	<td>|</td>' +
		    "</tr>   " +
      		    "</table>";
      
      	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");
      	
      	NuevaFuncionTW("insertBB", function(insertType, ident){
      
      			txt = document.getElementById("txt_"+ident);
      
      			var start = txt.selectionStart;
      			var end   = txt.selectionEnd;
      			var txtlength = 0;
      			var insertButton = '';
      			var txtinsertBefore = '';
      			var txtinsertAfter = '';
      			var selection = '';
      			var selectionBefore = '';
      			var selectionAfter = '';
      
      			switch (insertType) {
      				case 'player':
      					txtinsertBefore = "[player]";
      					txtinsertAfter = "[/player]";
      					insertButton = 'P';
      					break;
      				case 'tribe':
      					txtinsertBefore = "[town]";
      					txtinsertAfter = "[/town]";
      					insertButton = 'A';
      					break;
      				case 'b':
      					txtinsertBefore = "[b]";
      					txtinsertAfter = "[/b]";
      					insertButton = 'B';
      					break;
      				case 'i':
      					txtinsertBefore = "[i]";
      					txtinsertAfter = "[/i]";
      					insertButton = 'I';
      					break;
      				case 'u':
      					txtinsertBefore = "[u]";
      					txtinsertAfter = "[/u]";
      					insertButton = 'U';
      					break;
      				case 'quote':
      					txtinsertBefore = "[quote=Citácia]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'M';
      					break;
				case 'large text':
      					txtinsertBefore = "[size=20]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'R';
      					break;
				case 'small text':
      					txtinsertBefore = "[size=7.5]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'S';
      					break;
				case 'smily lol':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
      					break;
				case 'smily smile':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/smile.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '2';
      					break;
				case 'smily idea':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_idea.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '3';
      					break;
                                case 'smily wink':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_wink.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '4';
      					break;
				case 'smily evil':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '5';
      					break;
				case 'smily twisted':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '6';
      					break;
                                case 'smily eek':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '7';
      					break;
				case 'smily surprised':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '8';
      					break;
				case 'smily cry':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cry.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '9';
      					break;
				case 'smily smile2':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_smile.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '10';
      					break;
				case 'smily cool':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '11';
      					break;
				case 'smily sad':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '12';
      					break;
				case 'smily confused':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_confused.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '13';
      					break;
				case 'smily rolleyes':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '14';
      					break;
				case 'smily briggin':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '15';
      					break;
				case 'smily redface':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_redface.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '16';
      					break;
				case 'smily razz':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '17';
      					break;
				case 'smily neutral':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_neutral.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'black text':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '31';
      					break;
				case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '32';
      					break;
				case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '33';
      					break;
				case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '34';
      					break;
				case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '35';
      					break;
				case 'cyan text':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = '36';
      					break;
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '37';
      					break;
				case 'violet text':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '38';
      					break;
      			}
      
      			if (start == end) {
      					txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
      				} else {
      					txtlength = txt.value.length;
      					selection = txt.value.substr(start, (end - start));
      					selectionBefore = txt.value.substr(0, start);
      					selectionAfter = txt.value.substr(end, txtlength);
      
      					if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
      						selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
      					}
      
      					txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;
      					
      				}
      		});
      
      	
      }  
      
      
      // ======== Funciones necesarias ========
      
      // Atajos DOM
      function $(elm_id){
      	return document.getElementById(elm_id);
      }
      
      function $$(tag_name){
      	return document.getElementsByTagName(tag_name);
      }  
      
      function NuevaFuncionTW(func, new_func){
      
    	if(typeof unsafeWindow == "object"){
      		unsafeWindow[func] = new_func;
      	}else if(TW_Is_Opera){
      		window[func] = new_func;
      		/*
      		window.opera.defineMagicFunction(
      			func,
      			function(oRealFunc, oThis, oParam1, oParam2){
      				return oParam1.getElementById('oParam2').style;
      			}
      		);
      		*/
      	}
      }