// ==UserScript==
// @name           arcy
// @version        beta v1.1
// @description    emoty
// @include        http://pl*.plemiona.pl/*
// @copyright      Copyright (c) 2008, winkoVic :D
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
      		forum();
      		return;
      	}

      })();

      function forum() {      	
      	forumBB();
      }
      
      function forumBB() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
        "</p>    " +
        "<p>    " +
        ' <a href="javascript:insertBB(\'zdjecie\','+random+');"><img src="http://dodatki.xorg.pl/emotki/1.gif" alt="zdjęcie" /></a> ' +
        ' <a href="javascript:insertBB(\'beczy\','+random+');"><img src="http://dodatki.xorg.pl/emotki/2.gif" alt="beczy" /></a> ' +
        ' <a href="javascript:insertBB(\'niewiem\','+random+');"><img src="http://dodatki.xorg.pl/emotki/3.gif" alt="nie wiem" /></a> ' +
        ' <a href="javascript:insertBB(\'niepatrze\','+random+');"><img src="http://dodatki.xorg.pl/emotki/4.gif" alt="nie patrze" /></a> ' +
        ' <a href="javascript:insertBB(\'buziaczek\','+random+');"><img src="http://dodatki.xorg.pl/emotki/5.gif" alt="buziaczek" /></a> ' +
        ' <a href="javascript:insertBB(\'caluski\','+random+');"><img src="http://dodatki.xorg.pl/emotki/6.gif" alt="całuski" /></a> ' +
        ' <a href="javascript:insertBB(\'cwaniak\','+random+');"><img src="http://dodatki.xorg.pl/emotki/7.gif" alt="cwaniak" /></a> ' +
        ' <a href="javascript:insertBB(\'blee\','+random+');"><img src="http://dodatki.xorg.pl/emotki/8.gif" alt="blee" /></a> ' +
        ' <a href="javascript:insertBB(\'terefere\','+random+');"><img src="http://dodatki.xorg.pl/emotki/9.gif" alt="terefere" /></a> ' +
        ' <a href="javascript:insertBB(\'figlarz\','+random+');"><img src="http://dodatki.xorg.pl/emotki/10.gif" alt="figlarz" /></a> ' +
        ' <a href="javascript:insertBB(\'foch\','+random+');"><img src="http://dodatki.xorg.pl/emotki/11.gif" alt="foch" /></a> ' +
         "<br>    " +
        ' <a href="javascript:insertBB(\'glupek\','+random+');"><img src="http://dodatki.xorg.pl/emotki/12.gif" alt="głupek" /></a> ' +
        ' <a href="javascript:insertBB(\'lol\','+random+');"><img src="http://dodatki.xorg.pl/emotki/13.gif" alt="lol" /></a> ' +
        ' <a href="javascript:insertBB(\'swir\','+random+');"><img src="http://dodatki.xorg.pl/emotki/14.gif" alt="świr" /></a> ' +
        ' <a href="javascript:insertBB(\'jupi\','+random+');"><img src="http://dodatki.xorg.pl/emotki/15.gif" alt="jupi" /></a> ' +
        ' <a href="javascript:insertBB(\'jezyk_prawo\','+random+');"><img src="http://dodatki.xorg.pl/emotki/16.gif" alt="jęzor1" /></a> ' +
        ' <a href="javascript:insertBB(\'jezyk_lewo\','+random+');"><img src="http://dodatki.xorg.pl/emotki/17.gif" alt="jęzor2" /></a> ' +
        ' <a href="javascript:insertBB(\'krzyk\','+random+');"><img src="http://dodatki.xorg.pl/emotki/18.gif" alt="krzyk" /></a> ' +
        ' <a href="javascript:insertBB(\'kotek\','+random+');"><img src="http://dodatki.xorg.pl/emotki/19.gif" alt="kotek" /></a> ' +
        ' <a href="javascript:insertBB(\'olaboga\','+random+');"><img src="http://dodatki.xorg.pl/emotki/20.gif" alt="olaboga" /></a> ' +
        ' <a href="javascript:insertBB(\'usmiech\','+random+');"><img src="http://dodatki.xorg.pl/emotki/21.gif" alt="uśmiech" /></a> ' +
       ' <a href="javascript:insertBB(\'kwiatek\','+random+');"><img src="http://dodatki.xorg.pl/emotki/22.gif" alt="kwiatek" /></a> ' +
       ' <a href="javascript:insertBB(\'cisza\','+random+');"><img src="http://dodatki.xorg.pl/emotki/23.gif" alt="cisza" /></a> ' +
       ' <a href="javascript:insertBB(\'mniam\','+random+');"><img src="http://dodatki.xorg.pl/emotki/24.gif" alt="mniam" /></a> ' +
        "</p>    " +
        ' ver. 1.1 - Emoty dla plemienia ARCY s23. - winkoVic <a href="javascript:insertBB(\'aktualizacja\','+random+');"><img src="http://sylwionek.nazwa.pl/dokumenty/main.jpg" /></a> ' +
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
				case 'village':
					txtinsertBefore = "[village]";
					txtinsertAfter = "[/village]";
					insertButton = 'V';
					break;
				case 'tribe':
					txtinsertBefore = "[ally]";
					txtinsertAfter = "[/ally]";
					insertButton = 'A';
					break;
				case 'b':
					txtinsertBefore = "[b]";
					txtinsertAfter = "[/b]";
					insertButton = 'V';
					break;
				case 'i':
					txtinsertBefore = "[i]";
					txtinsertAfter = "[/i]";
					insertButton = 'V';
					break;
        case 'u':
					txtinsertBefore = "[u]";
					txtinsertAfter = "[/u]";
					insertButton = 'V';
					break;
				case 'zdjecie':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/1.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'beczy':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/2.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'niewiem':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/3.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'A';
					break;
				case 'niepatrze':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/4.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'buziaczek':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/5.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'caluski':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/6.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'cwaniak':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/7.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'blee':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/8.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'terefere':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/9.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'figlarz':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/10.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'foch':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/11.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'glupek':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/12.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'lol':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/13.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'swir':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/14.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jupi':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/15.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jezyk_prawo':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/16.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jezyk_lewo':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/17.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'krzyk':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/18.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'kotek':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/19.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'olaboga':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/20.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'usmiech':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/21.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'kwiatek':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/22.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'cisza':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/23.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'mniam':
					txtinsertBefore = "[img]http://dodatki.xorg.pl/emotki/24.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'aktualizacja':
					txtinsertBefore = "wejdź na -- www.sylwionek.nazwa.pl/dokumenty/arcy.js -- i zainstaluj najnowszą wersje!";
					txtinsertAfter = " ";
					insertButton = 'V';
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