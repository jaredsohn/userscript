// ==UserScript==
// @name          Plemiona BB-Codes Beta 0.9
// @description   Skrypt Dodaje BB-Codes Nad Wiadomosci Prywatne Oraz Na Forum, Dodane sa emotikony ale z powodow Powodow natury technicznej musialy zostac skrojone z PW dla ulatwienia obslugi(PW nie Odczytuja Emotek)...
// @include       http://ro*.triburile.ro/*
// @include       http://en*.tribalwars.net/*
// @include       http://en*.ds.ignames.net/*
// @include       http://nl*.tribalwars.nl/*
// @include       http://cs*.divokekmeny.cz/*
// @include       http://sv*.tribalwars.se/*
// @include       http://s*.tribalwars.es/*
// @include       http://s*.tribalwars.fr/*
// @include       http://s*.tribalwars.it/*
// @include       http://pl*.plemiona.pl/*
// @include	  http://en*.ds.ignames.net/*
// ==/UserScript==
      
      // ======== Zmienne Globalne ========
      
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
      
      
      // ======== Rozwiniecie ========
      
      (function(){

      	if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /screen=mail/ )) {
      		CambiaCuadroMail();
      		//return;
      	}

      	if (location.href.match( /screen=memo/ )) {
      		CambiaForo();
      		//return;
      	}

      	if (location.href.match( /screen=settings/ )) {
      		CambiaCuadroTexto();
      		//return;
      	}
      	if (location.href.match( /screen=ally/ )) {
      		CambiaCuadroMail();
      		//return;
      	}
      })();

      function CambiaForo() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
      		    "<p>    " +
      		    '	<a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Gracz" title="Gracz"/></a>' +
      		    '	<a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Wioska" title="Wioska"/></a>' +
      		    '	<a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Plemie" title="Plemie"/></a>' +
		    '          |'+
      		    '	<a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://tnij.org/a60d" alt="Pogrubienie" title="Pogrubienie"/></a>' +
      		    '	<a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://tnij.org/a60e" alt="Kursywa" title="Kursywa"/></a>' +
      		    '	<a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://tnij.org/a60f" alt="Podkreslenie" title="Podkreslenie" /></a>' +
      		    '	|' +
      		    '	<a tabindex="16" href="javascript:insertBB(\'quote\','+random+');"><img src="http://tnij.org/a60g" alt="Cytat" title="Cytat" /></a>' +
      		    '	<a tabindex="17" href="javascript:insertBB(\'url\','+random+');"><img src="http://tnij.org/a60l" alt="URL" title="URL"/></a>' +
                    '	<a tabindex="18" href="javascript:insertBB(\'img\','+random+');"><img src="http://tnij.org/a60h" alt="Obraz" title="Obraz"/></a>' +
                    '	<a tabindex="19" href="javascript:insertBB(\'code\','+random+');"><img src="http://tnij.org/codee" alt="Code" title="Code"/></a>' +
     		    '	|' +
                    '	<select>'+
                    '	<option onclick="javascript:insertBB(\'bmaly\','+random+');">Malutki</option>'+
                    '	<option onclick="javascript:insertBB(\'maly\','+random+');">Maly</option>'+
                    '	<option onclick="javascript:insertBB(\'normal\','+random+');" selected="selected">Normal</option>'+
                    '	<option onclick="javascript:insertBB(\'duzy\','+random+');">Duzy</option>'+
                    '	<option onclick="javascript:insertBB(\'bduzy\','+random+');">Olbrzymi</option>'+
                    '</select>'+
                    '<select>'+
                    '<option onclick="javascript:insertBB(\'czarny\','+random+');" style="color: black; background-color: #FAFAFA" value="black">Standard</option>'+
                    '<option onclick="javascript:insertBB(\'bialy\','+random+');" style="color: white; background-color: #FAFAFA" value="white"  >Bialy</option>'+
                    '<option onclick="javascript:insertBB(\'zolty\','+random+');" style="color: yellow; background-color: #FAFAFA" value="yellow"  >Zolty</option>'+
                    '<option onclick="javascript:insertBB(\'pomaranczowy\','+random+');" style="color: orange; background-color: #FAFAFA" value="orange"  >Pomaranczowy</option>'+
                    '<option onclick="javascript:insertBB(\'czerwony\','+random+');" style="color: red; background-color: #FAFAFA" value="red"  >Czerwony</option>'+
                    '<option onclick="javascript:insertBB(\'indygo\','+random+');" style="color: indigo; background-color: #FAFAFA" value="indigo"  >Indygo</option>'+
                    '<option onclick="javascript:insertBB(\'fioletowy\','+random+');" style="color: violet; background-color: #FAFAFA" value="violet"  >Fioletowy</option>'+
                    '<option onclick="javascript:insertBB(\'niebieski\','+random+');" style="color: blue; background-color: #FAFAFA" value="blue"  >Niebieski</option>'+
                    '<option onclick="javascript:insertBB(\'cniebieski\','+random+');" style="color: darkblue; background-color: #FAFAFA" value="darkblue"  >Ciemno niebieski</option>'+
                    '<option onclick="javascript:insertBB(\'cyan\','+random+');" style="color: cyan; background-color: #FAFAFA" value="cyan"  >Cyan</option>'+
                    '<option onclick="javascript:insertBB(\'zielony\','+random+');" style="color: green; background-color: #FAFAFA" value="green"  >Zielony</option>'+
                    '<option onclick="javascript:insertBB(\'oliwkowy\','+random+');" style="color: olive; background-color: #FAFAFA" value="olive"  >Oliwkowy</option>'+
                    '<option onclick="javascript:insertBB(\'brazowy\','+random+');" style="color: brown; background-color: #FAFAFA" value="brown"  >Brazowy</option>'+
                    '</select>'+
        "</p>    " +
        "<p>    " +
        ' <a href="javascript:insertBB(\'beczy\','+random+');"><img src="http://tnij.org/becz" alt="Beczy" title="Beczy"/></a> ' +
        ' <a href="javascript:insertBB(\'oczko\','+random+');"><img src="http://tnij.org/happ" alt="Oczko" title="Oczko"/></a> ' +
        ' <a href="javascript:insertBB(\'smutny\','+random+');"><img src="http://tnij.org/smut" alt="Smutny" title="Smutny"/></a> ' +
        ' <a href="javascript:insertBB(\'rotfl\','+random+');"><img src="http://tnij.org/rotf" alt="Rotfl" title="Rotfl"/></a> ' +
        ' <a href="javascript:insertBB(\'fuck\','+random+');"><img src="http://tnij.org/kcuf" alt="Fuck" title="Fuck"/></a> ' +
        ' <a href="javascript:insertBB(\'lol\','+random+');"><img src="http://tnij.org/a601" alt="LoL" title="LoL"/></a> ' +
        ' <a href="javascript:insertBB(\'niee\','+random+');"><img src="http://tnij.org/nieee" alt="Niee" title="Niee"/></a> ' +
        ' <a href="javascript:insertBB(\'taak\','+random+');"><img src="http://tnij.org/a613" alt="Taak" title="Taak"/></a> ' +
        ' <a href="javascript:insertBB(\'usmiech\','+random+');"><img src="http://tnij.org/a61r" alt="Usmiech" title="Usmiech"/></a> ' +
        ' <a href="javascript:insertBB(\'eeee\','+random+');"><img src="http://tnij.org/a60w" alt="Eeee" title="Eeee"/></a> ' +
        ' <a href="javascript:insertBB(\'yyyy\','+random+');"><img src="http://tnij.org/a61a" alt="Yyyy" title="Yyyy"/></a> ' +
        ' <a href="javascript:insertBB(\'jezyk\','+random+');"><img src="http://tnij.org/a604" alt="Jezyk" title="Jezyk"/></a> ' +
        ' <a href="javascript:insertBB(\'jezyk2\','+random+');"><img src="http://tnij.org/a61j" alt="Jezyk2" title="Jezyk2"/></a> ' +
        ' <a href="javascript:insertBB(\'ok\','+random+');"><img src="http://tnij.org/a6z7" alt="Ok" title="Ok"/></a> ' +
        ' <a href="javascript:insertBB(\'uuuu\','+random+');"><img src="http://tnij.org/a60b" alt="Uuuu" title="Uuuu"/></a> ' +
        ' <a href="javascript:insertBB(\'kwadrat\','+random+');"><img src="http://tnij.org/a60u" alt=":]" title=":]"/></a> ' +
        ' <a href="javascript:insertBB(\'he\','+random+');"><img src="http://tnij.org/a603" alt=":>" title=":>"/></a> ' +
        ' <a href="javascript:insertBB(\'figielek\','+random+');"><img src="http://tnij.org/a606" alt="Figielek" title="Figielek"/></a> ' +
        ' <a href="javascript:insertBB(\'wysmiewacz\','+random+');"><img src="http://tnij.org/a607" alt="Wysmiewacz" title="Wysmiewacz"/></a> ' +
        ' <a href="javascript:insertBB(\'glupek\','+random+');"><img src="http://tnij.org/a608" alt="Glupek" title="Glupek"/></a> ' +
        ' <a href="javascript:insertBB(\'swir\','+random+');"><img src="http://tnij.org/a61k" alt="Swir" title="Swir"/></a> ' +
        ' <a href="javascript:insertBB(\'???\','+random+');"><img src="http://tnij.org/a6z5" alt="???" title="???"/></a> ' +
        ' <a href="javascript:insertBB(\'!!!\','+random+');"><img src="http://tnij.org/a6z6" alt="!!!" title="!!!"/></a> ' +
        "</p>    " +
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
      				case 'czarny':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'bialy':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'zolty':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'pomaranczowy':
      					txtinsertBefore = "[color=orange]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'czerwony':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'indygo':
      					txtinsertBefore = "[color=indigo]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'fioletowy':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'niebieski':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'cniebieski':
      					txtinsertBefore = "[color=darkblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'cyan':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'zielony':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'oliwkowy':
      					txtinsertBefore = "[color=olive]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'brazowy':
      					txtinsertBefore = "[color=brown]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'bmaly':
      					txtinsertBefore = "[size=7]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'maly':
      					txtinsertBefore = "[size=9]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'normal':
      					txtinsertBefore = "[size=12]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'duzy':
      					txtinsertBefore = "[size=18]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'bduzy':
      					txtinsertBefore = "[size=24]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
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
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'code':
      					txtinsertBefore = "[code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'C';
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
                                case 'beczy':
					txtinsertBefore = "[img]http://tnij.org/becz[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'oczko':
					txtinsertBefore = "[img]http://tnij.org/happ[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'smutny':
					txtinsertBefore = "[img]http://tnij.org/smut[/img]";
					txtinsertAfter = " ";
					insertButton = 'A';
					break;
				case 'rotfl':
					txtinsertBefore = "[img]http://tnij.org/rotf[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'fuck':
					txtinsertBefore = "[img]http://tnij.org/kcuf[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'lol':
					txtinsertBefore = "[img]http://tnij.org/a601[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'niee':
					txtinsertBefore = "[img]http://tnij.org/nieee[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'taak':
					txtinsertBefore = "[img]http://tnij.org/a613[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'usmiech':
					txtinsertBefore = "[img]http://tnij.org/a61r[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '???':
					txtinsertBefore = "[img]http://tnij.org/a6z5[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '!!!':
					txtinsertBefore = "[img]http://tnij.org/a6z6[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'glupek':
					txtinsertBefore = "[img]http://tnij.org/a608[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'ok':
					txtinsertBefore = "[img]http://tnij.org/a6z7[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'eeee':
					txtinsertBefore = "[img]http://tnij.org/a60w[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'yyyy':
					txtinsertBefore = "[img]http://tnij.org/a61a[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jezyk':
					txtinsertBefore = "[img]http://tnij.org/a604[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jezyk2':
					txtinsertBefore = "[img]http://tnij.org/a61j[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'kwadrat':
					txtinsertBefore = "[img]http://tnij.org/a60u[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'swir':
					txtinsertBefore = "[img]http://tnij.org/a61k[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'wysmiewacz':
					txtinsertBefore = "[img]http://tnij.org/a607[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'uuuu':
					txtinsertBefore = "[img]http://tnij.org/a60b[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'figielek':
					txtinsertBefore = "[img]http://tnij.org/a606[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'he':
					txtinsertBefore = "[img]http://tnij.org/a603[/img]";
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

function CambiaCuadroTexto() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
      		    "<p>    " +
      		    '	<a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Gracz" title="Gracz"/></a>' +
      		    '	<a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Wioska" title="Wioska"/></a>' +
      		    '	<a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Plemie" title="Plemie"/></a>' +
		    '          |'+
      		    '	<a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://tnij.org/a60d" alt="Pogrubienie" title="Pogrubienie"/></a>' +
      		    '	<a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://tnij.org/a60e" alt="Kursywa" title="Kursywa"/></a>' +
      		    '	<a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://tnij.org/a60f" alt="Podkreslenie" title="Podkreslenie" /></a>' +
      		    '	|' +
      		    '	<a tabindex="16" href="javascript:insertBB(\'quote\','+random+');"><img src="http://tnij.org/a60g" alt="Cytat" title="Cytat" /></a>' +
      		    '	<a tabindex="17" href="javascript:insertBB(\'url\','+random+');"><img src="http://tnij.org/a60l" alt="URL" title="URL"/></a>' +
                    '	<a tabindex="18" href="javascript:insertBB(\'img\','+random+');"><img src="http://tnij.org/a60h" alt="Obraz" title="Obraz"/></a>' +
                    '	<a tabindex="19" href="javascript:insertBB(\'code\','+random+');"><img src="http://tnij.org/codee" alt="Code" title="Code"/></a>' +
                    '	<select>'+
                    '	<option onclick="javascript:insertBB(\'bmaly\','+random+');">Malutki</option>'+
                    '	<option onclick="javascript:insertBB(\'maly\','+random+');">Maly</option>'+
                    '	<option onclick="javascript:insertBB(\'normal\','+random+');" selected="selected">Normal</option>'+
                    '	<option onclick="javascript:insertBB(\'duzy\','+random+');">Duzy</option>'+
                    '	<option onclick="javascript:insertBB(\'bduzy\','+random+');">Olbrzymi</option>'+
                    '</select>'+
                    '<select>'+
                    '<option onclick="javascript:insertBB(\'czarny\','+random+');" style="color: black; background-color: #FAFAFA" value="black">Standard</option>'+
                    '<option onclick="javascript:insertBB(\'bialy\','+random+');" style="color: white; background-color: #FAFAFA" value="white"  >Bialy</option>'+
                    '<option onclick="javascript:insertBB(\'zolty\','+random+');" style="color: yellow; background-color: #FAFAFA" value="yellow"  >Zolty</option>'+
                    '<option onclick="javascript:insertBB(\'pomaranczowy\','+random+');" style="color: orange; background-color: #FAFAFA" value="orange"  >Pomaranczowy</option>'+
                    '<option onclick="javascript:insertBB(\'czerwony\','+random+');" style="color: red; background-color: #FAFAFA" value="red"  >Czerwony</option>'+
                    '<option onclick="javascript:insertBB(\'indygo\','+random+');" style="color: indigo; background-color: #FAFAFA" value="indigo"  >Indygo</option>'+
                    '<option onclick="javascript:insertBB(\'fioletowy\','+random+');" style="color: violet; background-color: #FAFAFA" value="violet"  >Fioletowy</option>'+
                    '<option onclick="javascript:insertBB(\'niebieski\','+random+');" style="color: blue; background-color: #FAFAFA" value="blue"  >Niebieski</option>'+
                    '<option onclick="javascript:insertBB(\'cniebieski\','+random+');" style="color: darkblue; background-color: #FAFAFA" value="darkblue"  >Ciemno niebieski</option>'+
                    '<option onclick="javascript:insertBB(\'cyan\','+random+');" style="color: cyan; background-color: #FAFAFA" value="cyan"  >Cyan</option>'+
                    '<option onclick="javascript:insertBB(\'zielony\','+random+');" style="color: green; background-color: #FAFAFA" value="green"  >Zielony</option>'+
                    '<option onclick="javascript:insertBB(\'oliwkowy\','+random+');" style="color: olive; background-color: #FAFAFA" value="olive"  >Oliwkowy</option>'+
                    '<option onclick="javascript:insertBB(\'brazowy\','+random+');" style="color: brown; background-color: #FAFAFA" value="brown"  >Brazowy</option>'+
                    '</select>'+
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
      				case 'code':
      					txtinsertBefore = "[code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'C';
      					break;
      				case 'czarny':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'bialy':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'zolty':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'pomaranczowy':
      					txtinsertBefore = "[color=orange]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'czerwony':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'indygo':
      					txtinsertBefore = "[color=indigo]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'fioletowy':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'niebieski':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'cniebieski':
      					txtinsertBefore = "[color=darkblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'cyan':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'zielony':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'oliwkowy':
      					txtinsertBefore = "[color=olive]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'brazowy':
      					txtinsertBefore = "[color=brown]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'bmaly':
      					txtinsertBefore = "[size=7]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'maly':
      					txtinsertBefore = "[size=9]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'normal':
      					txtinsertBefore = "[size=12]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'duzy':
      					txtinsertBefore = "[size=18]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
      				case 'bduzy':
      					txtinsertBefore = "[size=24]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'A';
      					break;
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
      					txtinsertBefore = "[quote]";
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
      			}

      		});
      
      	
      }  

function CambiaCuadroMail() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
      		    "<p>    " +
      		    '	<a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Gracz" title="Gracz"/></a>' +
      		    '	<a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Wioska" title="Wioska"/></a>' +
      		    '	<a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Plemie" title="Plemie"/></a>' +
		    '          |'+
      		    '	<a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://tnij.org/a60d" alt="Pogrubienie" title="Pogrubienie"/></a>' +
      		    '	<a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://tnij.org/a60e" alt="Kursywa" title="Kursywa"/></a>' +
      		    '	<a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://tnij.org/a60f" alt="Podkreslenie" title="Podkreslenie" /></a>' +
      		    '	|' +
      		    '	<a tabindex="16" href="javascript:insertBB(\'quote\','+random+');"><img src="http://tnij.org/a60g" alt="Cytat" title="Cytat" /></a>' +
      		    '	<a tabindex="17" href="javascript:insertBB(\'url\','+random+');"><img src="http://tnij.org/a60l" alt="URL" title="URL"/></a>' +
                    '	<a tabindex="18" href="javascript:insertBB(\'code\','+random+');"><img src="http://tnij.org/codee" alt="Code" title="Code"/></a>  ' +
      		    '	|' +
                    '<select>'+
                    '<option onclick="javascript:insertBB(\'czarny\','+random+');" style="color: black; background-color: #FAFAFA" value="black">Standard</option>'+
                    '<option onclick="javascript:insertBB(\'bialy\','+random+');" style="color: white; background-color: #FAFAFA" value="white"  >Bialy</option>'+
                    '<option onclick="javascript:insertBB(\'zolty\','+random+');" style="color: yellow; background-color: #FAFAFA" value="yellow"  >Zolty</option>'+
                    '<option onclick="javascript:insertBB(\'pomaranczowy\','+random+');" style="color: orange; background-color: #FAFAFA" value="orange"  >Pomaranczowy</option>'+
                    '<option onclick="javascript:insertBB(\'czerwony\','+random+');" style="color: red; background-color: #FAFAFA" value="red"  >Czerwony</option>'+
                    '<option onclick="javascript:insertBB(\'indygo\','+random+');" style="color: indigo; background-color: #FAFAFA" value="indigo"  >Indygo</option>'+
                    '<option onclick="javascript:insertBB(\'fioletowy\','+random+');" style="color: violet; background-color: #FAFAFA" value="violet"  >Fioletowy</option>'+
                    '<option onclick="javascript:insertBB(\'niebieski\','+random+');" style="color: blue; background-color: #FAFAFA" value="blue"  >Niebieski</option>'+
                    '<option onclick="javascript:insertBB(\'cniebieski\','+random+');" style="color: darkblue; background-color: #FAFAFA" value="darkblue"  >Ciemno niebieski</option>'+
                    '<option onclick="javascript:insertBB(\'cyan\','+random+');" style="color: cyan; background-color: #FAFAFA" value="cyan"  >Cyan</option>'+
                    '<option onclick="javascript:insertBB(\'zielony\','+random+');" style="color: green; background-color: #FAFAFA" value="green"  >Zielony</option>'+
                    '<option onclick="javascript:insertBB(\'oliwkowy\','+random+');" style="color: olive; background-color: #FAFAFA" value="olive"  >Oliwkowy</option>'+
                    '<option onclick="javascript:insertBB(\'brazowy\','+random+');" style="color: brown; background-color: #FAFAFA" value="brown"  >Brazowy</option>'+
                    '</select>'+
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
      				case 'code':
      					txtinsertBefore = "[code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'C';
      					break;
      				case 'czarny':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'bialy':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'zolty':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'pomaranczowy':
      					txtinsertBefore = "[color=orange]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'czerwony':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'indygo':
      					txtinsertBefore = "[color=indigo]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'fioletowy':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'niebieski':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'cniebieski':
      					txtinsertBefore = "[color=darkblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'cyan':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'zielony':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'oliwkowy':
      					txtinsertBefore = "[color=olive]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'brazowy':
      					txtinsertBefore = "[color=brown]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
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
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
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
      
      
      // ======== Funkcje ========
      
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