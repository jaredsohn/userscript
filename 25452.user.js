// ==UserScript==
// @name           Emotki do forum plemiennego :) 
// @version        beta v1.0
// @description    Trochę emotikonek na plemienne fora :)
// @include        http://pl*.plemiona.pl/*
// @copyright      Copyright (c) 2008, Maciek Filipowicz - Sloik14 :D
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
      		    "<p>    " +
		    '	<a href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Insert player BB code" /></a> ' +
		    '	<a href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Insert village BB code" /></a> ' +
		    '	<a href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Insert tribe BB code" /></a> ' +
		    ' <a href="javascript:insertBB(\'b\','+random+');"><img src="http://www.emotki.homepages.pl/e/e/b.jpg" alt="pogrubienie" /></a> ' +
		    ' <a href="javascript:insertBB(\'i\','+random+');"><img src="http://www.emotki.homepages.pl/e/e/i.jpg" alt="kursywa" /></a> ' +
		    ' <a href="javascript:insertBB(\'u\','+random+');"><img src="http://www.emotki.homepages.pl/e/e/u.jpg" alt="podkreslenie" /></a> ' +
        "</p>    " +
        "<p>    " +
        ' <a href="javascript:insertBB(\'beczy\','+random+');"><img src="http://tnij.org/a2im" alt="beczy" /></a> ' +
        ' <a href="javascript:insertBB(\'wesoly\','+random+');"><img src="http://tnij.org/a2in" alt="wesoly" /></a> ' +
        ' <a href="javascript:insertBB(\'smutny\','+random+');"><img src="http://tnij.org/a2io" alt="smutny" /></a> ' +
        ' <a href="javascript:insertBB(\'rotfl\','+random+');"><img src="http://tnij.org/a2ir" alt="rotfl" /></a> ' +
        ' <a href="javascript:insertBB(\'fuck\','+random+');"><img src="http://tnij.org/a2iw" alt="fuck" /></a> ' +
        ' <a href="javascript:insertBB(\'lol2\','+random+');"><img src="http://tnij.org/a2k3" alt="lol2" /></a> ' +
        ' <a href="javascript:insertBB(\'niee\','+random+');"><img src="http://tnij.org/a2kg" alt="niee" /></a> ' +
        ' <a href="javascript:insertBB(\'zeby\','+random+');"><img src="http://tnij.org/ezeby" alt="zeby" /></a> ' +
        ' <a href="javascript:insertBB(\'pytajnik\','+random+');"><img src="http://tnij.org/a2kz" alt="pytajnik" /></a> ' +
        ' <a href="javascript:insertBB(\'wykrzyknik\','+random+');"><img src="http://tnij.org/a2k1" alt="wykrzyknik" /></a> ' +
        ' <a href="javascript:insertBB(\'oki\','+random+');"><img src="http://tnij.org/a2k2" alt="oki" /></a> ' +
        ' <a href="javascript:insertBB(\'krzywy\','+random+');"><img src="http://tnij.org/a2lz" alt="krzywy" /></a> ' +
        ' <a href="javascript:insertBB(\'strzelec\','+random+');"><img src="http://tnij.org/a2l0" alt="strzelec" /></a> ' +
        ' <a href="javascript:insertBB(\'oczko_krzywy\','+random+');"><img src="http://tnij.org/a2l1" alt="oczko" /></a> ' +
        ' <a href="javascript:insertBB(\'dupa\','+random+');"><img src="http://tnij.org/a2l2" alt="uuuu" /></a> ' +
        ' <a href="javascript:insertBB(\'no_co_ty\','+random+');"><img src="http://tnij.org/a2l4" alt="he??" /></a> ' +
        "</p>    " +
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
				case 'beczy':
					txtinsertBefore = "[img]http://tnij.org/a2im[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'wesoly':
					txtinsertBefore = "[img]http://tnij.org/a2in[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'smutny':
					txtinsertBefore = "[img]http://tnij.org/a2io[/img]";
					txtinsertAfter = " ";
					insertButton = 'A';
					break;
				case 'rotfl':
					txtinsertBefore = "[img]http://tnij.org/a2ir[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'fuck':
					txtinsertBefore = "[img]http://tnij.org/a2iw[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'lol2':
					txtinsertBefore = "[img]http://tnij.org/a2k3[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'niee':
					txtinsertBefore = "[img]http://tnij.org/a2kg[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'zeby':
					txtinsertBefore = "[img]http://tnij.org/ezeby[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'pytajnik':
					txtinsertBefore = "[img]http://tnij.org/a2kz[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'pytajnik':
					txtinsertBefore = "[img]http://tnij.org/a2kz[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'wykrzyknik':
					txtinsertBefore = "[img]http://tnij.org/a2k1[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'oki':
					txtinsertBefore = "[img]http://tnij.org/a2k2[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'krzywy':
					txtinsertBefore = "[img]http://tnij.org/a2lz[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'strzelec':
					txtinsertBefore = "[img]http://tnij.org/a2l0[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'oczko_krzywy':
					txtinsertBefore = "[img]http://tnij.org/a2l1[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'dupa':
					txtinsertBefore = "[img]http://tnij.org/a2l2[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'no_co_ty':
					txtinsertBefore = "[img]http://tnij.org/a2l4[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'dupa':
					txtinsertBefore = "[img]http://tnij.org/a2l2[/img]";
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