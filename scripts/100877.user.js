// ==UserScript==
// @name          The West BBcode (Kolobok)
// @namespace     The West BBcode (Kiwimage)
// @description   BB-Codes werden eingefügt. Orginal von Kolobok, nachbearbeitet von Kiwimage und Sam008 (Germany)
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
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://desmond.imageshack.us/Himg850/scaled.php?server=850&filename=playerd.png&res=gal" alt="Spieler" title="Spieler" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'town\','+random+');"><img src="http://desmond.imageshack.us/Himg41/scaled.php?server=41&filename=townw.png&res=gal" alt="Stadt" title="Stadt" /></a></td>' +
      		    '	<td><a tabindex="12" href="javascript:insertBB(\'fort\','+random+');"><img src="http://desmond.imageshack.us/Himg819/scaled.php?server=819&filename=fortc.png&res=gal" alt="Fort" title="Fort" /></a></td>' +
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://desmond.imageshack.us/Himg845/scaled.php?server=845&filename=48863045.png&res=gal" alt="B" title="Fett" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://desmond.imageshack.us/Himg705/scaled.php?server=705&filename=35224760.png&res=gal" alt="I" title="Kursiv" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://desmond.imageshack.us/Himg27/scaled.php?server=27&filename=56297069.png&res=gal" alt="U" title="Unterstrichen" /></a></td>' +
      		    '	<td><a tabindex="16" href="javascript:insertBB(\'del\','+random+');"><img src="http://img153.imageshack.us/img153/3268/deljc.png" alt="Del" title="Durchgestrichen" /></a></td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://desmond.imageshack.us/Himg850/scaled.php?server=850&filename=quotet.png&res=gal" alt="Zitat" title="Zitat" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://desmond.imageshack.us/Himg62/scaled.php?server=62&filename=urlj.png&res=gal" alt="Link (url)" title="Weblink (URL)" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'img\','+random+');"><img src="http://desmond.imageshack.us/Himg854/scaled.php?server=854&filename=imgdj.png&res=gal" alt="Bild (url)" title="Bild (URL)" /></a></td>' +
		    '	<td><a tabindex="20" href="javascript:insertBB(\'large text\','+random+');"><img src="http://desmond.imageshack.us/Himg34/scaled.php?server=34&filename=biggerk.png&res=gal" alt="Gross (22)" title="Gross (Schriftgrösse 22)" /></a></td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'small_text\','+random+');"><img src="http://desmond.imageshack.us/Himg709/scaled.php?server=709&filename=smallerm.png&res=gal" alt="Klein (10)" title="Klein (Schriftgrösse 10)" /></a></td>' +
		    '	<td><a tabindex="28" href="javascript:insertBB(\'red text\','+random+');"><img src="http://desmond.imageshack.us/Himg190/scaled.php?server=190&filename=redhk.png&res=gal" title="Rot" /></a></td>' +
		    '	<td><a tabindex="29" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://desmond.imageshack.us/Himg231/scaled.php?server=231&filename=yellowp.png&res=gal" title="Gelb" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'green text\','+random+');"><img src="http://desmond.imageshack.us/Himg826/scaled.php?server=826&filename=greendq.png&res=gal" title="Grün" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://desmond.imageshack.us/Himg543/scaled.php?server=543&filename=bluei.png&res=gal" title="Dunkelblau" /></a></td>' +
		    '	<td><a tabindex="33" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://desmond.imageshack.us/Himg217/scaled.php?server=217&filename=violetu.png&res=gal" title="Violett" /></a></td>' +
		    '	<td><a tabindex="50" href="javascript:insertBB(\'Lachender Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_laugh.png" title="Lachender Smiley" /></a></td>' +
		    '	<td><a tabindex="51" href="javascript:insertBB(\'Frecher Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_tongue.png" title="Frecher Smiley" /></a></td>' +
		    '	<td><a tabindex="52" href="javascript:insertBB(\'Ruhiger Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_01.png" title="Ruhiger Smiley" /></a></td>' +
		    '	<td><a tabindex="53" href="javascript:insertBB(\'Erstaunter Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_oo.png" title="Erstaunter Smiley" /></a></td>' +
		    '	<td><a tabindex="54" href="javascript:insertBB(\'Trauriger Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_frown.png" title="Trauriger Smiley" /></a></td>' +		    		    
		    
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
      				case 'quote':
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url=NULL]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'M';
      					break;
				case 'large text':
      					txtinsertBefore = "[size=22]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'R';
      					break;
				case 'small_text':
      					txtinsertBefore = "[size=10]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'Small';
      					break;

      					case 'code':
      					txtinsertBefore = " [b][CODE][/b] [code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'code';
      					break;


				case 'Lachender Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_laugh.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '50';
      					break;
				case 'Frecher Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_tongue.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'Ruhiger Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_01.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '52';
      					break;		
				case 'Erstaunter Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_oo.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '53';
      					break;		
				case 'Trauriger Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_frown.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '54';
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

// Copyright (c) by Kolobok // modified by Kiwimage and Sam008
