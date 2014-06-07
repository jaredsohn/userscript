// ==UserScript==
// @name          Tribal Wars Skipe Smiles
// @namespace     Anonymous User
// @description   Tribal Wars Skipe Smiles
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://lt*.ds.ignames.net/*
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
      		CambiaCuadroTexto();
      		//return;
      	}
      })();

      function CambiaForo() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
        "<p>    " +
		"<tr>	" +
        ' <td><a href="javascript:insertBB(\'1\','+random+');"><img src="http://images25.fotosik.pl/225/a1948941ae2859a3.gif" alt="1" title="1"/></a></td> ' +
        ' <td><a href="javascript:insertBB(\'2\','+random+');"><img src="http://images24.fotosik.pl/227/a7f3dc5fc127c565.gif" alt="2" title="2"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'3\','+random+');"><img src="http://images29.fotosik.pl/226/a2bd63149a596cd9.gif" alt="3" title="3"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'4\','+random+');"><img src="http://images28.fotosik.pl/226/1188444192e17223.gif" alt="4" title="4"/></a></td> ' +
        ' <td><a href="javascript:insertBB(\'5\','+random+');"><img src="http://images25.fotosik.pl/225/5bd4dd54594fa350.gif" alt="5" title="5"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'6\','+random+');"><img src="http://images33.fotosik.pl/279/4bd71b8d5b1ff79f.gif" alt="6" title="6"/></a></td> ' +
        ' <td><a href="javascript:insertBB(\'7\','+random+');"><img src="http://images31.fotosik.pl/278/09d064a60635a165.gif" alt="7" title="7"/></a></td> ' +
        ' <td><a href="javascript:insertBB(\'8\','+random+');"><img src="http://images33.fotosik.pl/279/3d22aac6fd7cdd2a.gif" alt="8" title="8"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'9\','+random+');"><img src="http://images33.fotosik.pl/279/48c290a73c1cabe2.gif" alt="9" title="9"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'10\','+random+');"><img src="http://images24.fotosik.pl/227/132c324e6a1db0c3.gif" alt="10" title="10"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'11\','+random+');"><img src="http://images29.fotosik.pl/226/c1848d113b62b841.gif" alt="11" title="11"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'12\','+random+');"><img src="http://images30.fotosik.pl/226/7a28f7102c525944.gif" alt="12" title="12"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'13\','+random+');"><img src="http://images25.fotosik.pl/225/7b06810b33d9e869.gif" alt="13" title="13"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'14\','+random+');"><img src="http://images31.fotosik.pl/278/614793261648ad9a.gif" alt="14" title="14"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'15\','+random+');"><img src="http://images31.fotosik.pl/278/d950b2b0d681a935.gif" alt="15" title="15"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'16\','+random+');"><img src="http://images23.fotosik.pl/227/53a5e32f12623395.gif" alt="16" title="16"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'17\','+random+');"><img src="http://images24.fotosik.pl/228/72ae986a9ae54c76.gif" alt="17" title="17"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'18\','+random+');"><img src="http://images29.fotosik.pl/226/00de8c4577f76a5f.gif" alt="18" title="18"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'19\','+random+');"><img src="http://images26.fotosik.pl/226/4a2754783cba3b7d.gif" alt="19" title="19"/></a></td> ' +
        '<td> <a href="javascript:insertBB(\'20\','+random+');"><img src="http://images33.fotosik.pl/282/a73c5b08b72dda03.gif" alt="20" title="20"/></a></td> ' +
        "</tr>	" +
	' <td><a tabindex="70" href="javascript:insertBB(\'unit spear\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spear.png" /></a></td>' +
	' <td><a tabindex="71" href="javascript:insertBB(\'unit sword\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_sword.png" /></a></td>' +
	' <td><a tabindex="72" href="javascript:insertBB(\'unit axe\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_axe.png" /></a></td>' +
	' <td><a tabindex="73" href="javascript:insertBB(\'unit archer\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_archer.png" /></a></td>' +
	' <td><a tabindex="74" href="javascript:insertBB(\'unit scout\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spy.png" /></a></td>' +
	' <td><a tabindex="75" href="javascript:insertBB(\'unit lcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_light.png" /></a></td>' +
	' <td><a tabindex="76" href="javascript:insertBB(\'unit hcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_heavy.png" /></a></td>' +
	' <td><a tabindex="77" href="javascript:insertBB(\'unit marcher\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_marcher.png" /></a></td>' +
	' <td><a tabindex="78" href="javascript:insertBB(\'unit ram\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_ram.png" /></a></td>' +
	' <td><a tabindex="79" href="javascript:insertBB(\'unit catapult\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_catapult.png" /></a></td>' +
	' <td><a tabindex="82" href="javascript:insertBB(\'madera\','+random+');"><img src="http://tribalwars.es/graphic/holz.png" /></a></td>' +
	' <td><a tabindex="83" href="javascript:insertBB(\'barro\','+random+');"><img src="http://tribalwars.es/graphic/lehm.png" /></a></td>' +
	' <td><a tabindex="84" href="javascript:insertBB(\'hierro\','+random+');"><img src="http://tribalwars.es/graphic/eisen.png" /></a></td>' +
	' <td><a tabindex="80" href="javascript:insertBB(\'unit paladin\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_knight.png" /></a></td>' +
	' <td><a tabindex="81" href="javascript:insertBB(\'unit noble\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_snob.png" /></a></td>' +
	
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
      				case 'bialy':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
    				case 'srebrny':
      					txtinsertBefore = "[color=silver]";
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
      				case 'jzielony':
      					txtinsertBefore = "[color=lime]";
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
      				case 'blekitny':
      					txtinsertBefore = "[color=deepskyblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'niebieski':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'purpurowy':
      					txtinsertBefore = "[color=purple]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'fioletowy':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'brazowy':
      					txtinsertBefore = "[color=brown]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      			       case 'czarny':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
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
      				case 'normalny':
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
      					txtinsertBefore = "[village]" ;
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
      				case 's':
      					txtinsertBefore = "[s]";
      					txtinsertAfter = "[/s]";
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
      					insertButton = 'c';
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
                                case '1':
					txtinsertBefore = "[img]http://images25.fotosik.pl/225/a1948941ae2859a3.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '2':
					txtinsertBefore = "[img]http://images24.fotosik.pl/227/a7f3dc5fc127c565.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '3':
					txtinsertBefore = "[img]http://images29.fotosik.pl/226/a2bd63149a596cd9.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'A';
					break;
				case '4':
					txtinsertBefore = "[img]http://images28.fotosik.pl/226/1188444192e17223.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '5':
					txtinsertBefore = "[img]http://images25.fotosik.pl/225/5bd4dd54594fa350.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '6':
					txtinsertBefore = "[img]http://images33.fotosik.pl/279/4bd71b8d5b1ff79f.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '7':
					txtinsertBefore = "[img]http://images31.fotosik.pl/278/09d064a60635a165.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '8':
					txtinsertBefore = "[img]http://images33.fotosik.pl/279/3d22aac6fd7cdd2a.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '9':
					txtinsertBefore = "[img]http://images33.fotosik.pl/279/48c290a73c1cabe2.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '10':
					txtinsertBefore = "[img]http://images24.fotosik.pl/227/132c324e6a1db0c3.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '11':
					txtinsertBefore = "[img]http://images29.fotosik.pl/226/c1848d113b62b841.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '12':
					txtinsertBefore = "[img]http://images30.fotosik.pl/226/7a28f7102c525944.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '13':
					txtinsertBefore = "[img]http://images25.fotosik.pl/225/7b06810b33d9e869.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '14':
					txtinsertBefore = "[img]http://images31.fotosik.pl/278/614793261648ad9a.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '15':
					txtinsertBefore = "[img]http://images31.fotosik.pl/278/d950b2b0d681a935.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '16':
					txtinsertBefore = "[img]http://images23.fotosik.pl/227/53a5e32f12623395.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '17':
					txtinsertBefore = "[img]http://images24.fotosik.pl/228/72ae986a9ae54c76.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '18':
					txtinsertBefore = "[img]http://images29.fotosik.pl/226/00de8c4577f76a5f.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '19':
					txtinsertBefore = "[img]http://images26.fotosik.pl/226/4a2754783cba3b7d.gif[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '20':
					txtinsertBefore = "[img]http://images33.fotosik.pl/282/a73c5b08b72dda03.gif[/img]";
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
      		    '	<a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://www.openidea.pl/images/textile-editor/bold.png" alt="Pogrubienie" title="Pogrubienie"/></a>' +
      		    '	<a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://www.openidea.pl/images/textile-editor/italic.png" alt="Kursywa" title="Kursywa"/></a>' +
      		    '	<a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://images34.fotosik.pl/279/baaaf133c85bb1fc.png" alt="Podkreslenie" title="Podkreslenie" /></a>' +
      		    '	<a tabindex="16" href="javascript:insertBB(\'s\','+random+');"><img src="http://www.openidea.pl/images/textile-editor/strikethrough.png" alt="Przekreslenie" title="Przekreslenie" /></a>' +
      		    '	|' +
      		    '	<a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://images33.fotosik.pl/285/8c9522b2b8ff3cf0.png" alt="Cytat" title="Cytat" /></a>' +
      		    '	<a tabindex="18" href="javascript:insertBB(\'code\','+random+');"><img src="http://images32.fotosik.pl/291/fb30c806b957b3f6.gif" alt="Kod" title="Kod" /></a>' +
      		    '	<a tabindex="19" href="javascript:insertBB(\'url\','+random+');"><img src="http://www.openidea.pl/images/textile-editor/world_link.png" alt="URL" title="URL"/></a>' +

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

function CambiaCuadroMail() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
      		    "<p>    " +
      		   
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
      				case 'domyslny':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'bialy':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'srebrny':
      					txtinsertBefore = "[color=silver]";
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
      				case 'jzielony':
      					txtinsertBefore = "[color=lime]";
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
      				case 'blekitny':
      					txtinsertBefore = "[color=deepskyblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'niebieski':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'purpurowy':
      					txtinsertBefore = "[color=purple]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'fioletowy':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'brazowy':
      					txtinsertBefore = "[color=brown]";
      					txtinsertAfter = "[/color]";
      					insertButton = 'A';
      					break;
      				case 'czarny':
      					txtinsertBefore = "[color=black]";
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
      				case 'normalny':
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
      				case 's':
      					txtinsertBefore = "[s]";
      					txtinsertAfter = "[/s]";
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
      					insertButton = 'c';
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