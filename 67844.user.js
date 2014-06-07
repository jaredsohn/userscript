// ==UserScript==
// @name          The West BBcode (DK)
// @namespace     Http://www.dead-wood.siden.dkx.dk
// @description   De beste BBcoder til by forumet.
// @include       http://*.the-west.*/*
// ==/UserScript==
      
      // ======== Variables globales del juego ========
      
      // http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png - fort
      // http://i064.radikal.ru/0909/ce/7988d649bac4.png  -del
      
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

      	if (location.href.match( /messages/ )) {
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
		    '	<td> </td>' + 
		    '	<td> </td>' + 
                    '	<td><a tabindex="10" href="javascript:insertBB(\'b\','+random+');"><img src="http://yad.wz.cz/ext/t-w/b.png" alt="Fed tekst" title="Fed skrift" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'i\','+random+');"><img src="http://yad.wz.cz/ext/t-w/i.png" alt="SkrÃ¥skrift" title="SkrÃ¥skrift" /></a></td>' +
      		    '	<td><a tabindex="12" href="javascript:insertBB(\'u\','+random+');"><img src="http://yad.wz.cz/ext/t-w/u.png" alt="Understreg tekst" title="Understreget" /></a></td>' +
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'del\','+random+');"><img src="http://i513.photobucket.com/albums/t333/tyrazz/ssss-2.jpg" alt="Streg igennem tekst" title="Streg over" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'player\','+random+');"><img src="http://yad.wz.cz/ext/t-w/player.png" alt="Spiller" title="Spiller" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'town\','+random+');"><img src="http://yad.wz.cz/ext/t-w/city.png" alt="By" title="By" /></a></td>' +
      		    '	<td><a tabindex="16" href="javascript:insertBB(\'fort\','+random+');"><img src="http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png" alt="Fort" title="fort" /></a></td>' 
      		    '   <td><a tabindex="25"
                    '	<td> </td>' +
		    '	<td><a tabindex="17" href="javascript:insertBB(\'white text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/white.png" title="Hvid" /></a></td>' +
		    '	<td><a tabindex="18" href="javascript:insertBB(\'black text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/black.png" title="Sort" /></a></td>' +	
		    '	<td><a tabindex="19" href="javascript:insertBB(\'red text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/red.png" title="RÃ¸d" /></a></td>' +	
		    '	<td><a tabindex="20" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/yellow.png" title="Gul" /></a></td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'green text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/green.png" title="GrÃ¸n" /></a></td>' +
		    '	<td><a tabindex="22" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/blue.png" title="BlÃ¥" /></a></td>' +
      		    '	<td></td>' +
                    "</tr>   " +
		    '	<td></td>' +
                    '	<td><a tabindex="23" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif" /></a></td>' +
                    '	<td><a tabindex="24" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif" /></a></td>' +
		    '	<td><a tabindex="25" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif" /></a></td>' +
                    '	<td><a tabindex="26" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif" /></a></td>' +
                    '	<td><a tabindex="27" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif" /></a></td>' +
		    '	<td><a tabindex="28" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif" /></a></td>' +
		    '	<td><a tabindex="29" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif" /></a></td>' +
		    '	<td><a tabindex="31" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif" /></a></td>' +
		
		    '	<td> </td> ' +
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
      					
      					
      					
      				case 'town':
      					txtinsertBefore = "[town]";
      					txtinsertAfter = "[/town]";
      					insertButton = 'A';
      					break;
 				case 'fort':
      					txtinsertBefore = "[fort]";
      					txtinsertAfter = "[/fort]";
      					insertButton = 'F';
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
      				case 'del':
      					txtinsertBefore = "[del]";
      					txtinsertAfter = "[/del]";
      					insertButton = 'del';
      					break;
				case 'smily lol':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
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
				case 'smily razz':
      					txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '17';
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
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '37';
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