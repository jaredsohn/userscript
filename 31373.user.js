// ==UserScript==
// @name          TribalWars BBCodes
// @version       2.0a
// @namespace     mblaky
// @description   Easy accest BBCodes for TribalWars
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://no*.tribalwars.no/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// ==/UserScript==
      
      // ======== Variabile predefinite - NU MODIFICA ========
      
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
	  var yemote_http   = "http://www.murangura.com/smiles/6/";
	  var bbcodes_http  = "http://blaky.dap.ro/uploads/system-images/";
      
      
      // ======== Unde se insereaza textul ========
      
      (function(){

      	if (location.href.match( /forum\.php/ )) { func_iframe();return;	}
      	if (location.href.match( /intro_igm/ )) {func_iframe();return;}
      	if (location.href.match( /screen=mail/ )) {func_addExtra();}
		if (location.href.match( /screen=memo/ )) {func_iframe();return;}
		if (location.href.match( /screen=settings/ )) {func_iframe();return;}
      })();

      function func_iframe() {
      	
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
      	
      	func_addExtra();
      }
      
      function func_addExtra() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table width='480' border='0'><tr><td align='center'>"
		+ "<table class='bbcodearea'> " +
      		    "<tr>    " +
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="' + bbcodes_http + 'bold.gif" alt="Bold" width="16" height="16" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="' + bbcodes_http + 'italicize.gif" alt="Italic" width="16" height="16"/></a></td>' +
		    '	<td><a tabindex="15" href="javascript:insertBB(\'c\','+random+');"><img src="' + bbcodes_http + 'code.gif" alt="Code" width="16" height="16"/></a></td>' +
      		    '	<td><a tabindex="16" href="javascript:insertBB(\'u\','+random+');"><img src="' + bbcodes_http + 'underline.gif" alt="Underline" width="16" height="16" /></a></td>' +
      		    '	<td>|</td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="' + bbcodes_http + 'quote.gif" alt="Quote" width="16" height="16" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="' + bbcodes_http + 'url.gif" alt="URL" width="16" height="16" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'Xurl\','+random+');"><img src="http://img50.imageshack.us/img50/6742/cuervozi7.png" alt="XURL" /></a></td>' +
      		    '	<td><a tabindex="20" href="javascript:insertBB(\'img\','+random+');"><img src="' + bbcodes_http + 'image.gif" alt="Image" width="16" height="16" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'large text\','+random+');"><img src="' + bbcodes_http + 'yes.png" alt="Large text"/></a></td>' +
		    '	<td><a tabindex="22" href="javascript:insertBB(\'small text\','+random+');"><img src="' + bbcodes_http + 'no.png" alt="Small text"/></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="23" href="javascript:insertBB(\'white text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/White.gif" /></a></td>' +
		    '	<td><a tabindex="24" href="javascript:insertBB(\'black text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/Black.gif" /></a></td>' +
		    '	<td><a tabindex="25" href="javascript:insertBB(\'brown text\','+random+');"><img src="http://img522.imageshack.us/img522/2029/brownlt9.jpg" /></a></td>' +	
		    '	<td><a tabindex="26" href="javascript:insertBB(\'red text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/red.jpg" /></a></td>' +
		    '	<td><a tabindex="27" href="javascript:insertBB(\'orange text\','+random+');"><img src="http://img301.imageshack.us/img301/9283/orangeuv4.jpg" /></a></td>' +	
		    '	<td><a tabindex="28" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/yellow.jpg" /></a></td>' +
		    '	<td><a tabindex="29" href="javascript:insertBB(\'green text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/green.jpg" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'cyan text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/cyan.jpg" /></a></td>' +
		    '	<td><a tabindex="31" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/blue.jpg" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://i211.photobucket.com/albums/bb9/RakizzteanEmpire/violet.jpg" /></a></td>' +
		    '	<td><a tabindex="33" href="javascript:insertBB(\'pink text\','+random+');"><img src="http://img265.imageshack.us/img265/2923/pinkuk4.jpg" /></a></td>' +
			"</tr></table><table class='bbcodearea'><tr>" +
			'	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Player" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Village" /></a></td>' +
      		    '	<td><a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Tribe" /></a></td>' +
		    '   <td>|</td>'+
		    '	<td><a tabindex="70" href="javascript:insertBB(\'unit spear\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spear.png" /></a></td>' +
		    '	<td><a tabindex="71" href="javascript:insertBB(\'unit sword\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_sword.png" /></a></td>' +
		    '	<td><a tabindex="72" href="javascript:insertBB(\'unit axe\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_axe.png" /></a></td>' +
		    '	<td><a tabindex="73" href="javascript:insertBB(\'unit archer\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_archer.png" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="74" href="javascript:insertBB(\'unit scout\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spy.png" /></a></td>' +
		    '	<td><a tabindex="75" href="javascript:insertBB(\'unit lcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_light.png" /></a></td>' +
		    '	<td><a tabindex="76" href="javascript:insertBB(\'unit hcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_heavy.png" /></a></td>' +
		    '	<td><a tabindex="77" href="javascript:insertBB(\'unit marcher\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_marcher.png" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="78" href="javascript:insertBB(\'unit ram\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_ram.png" /></a></td>' +
		    '	<td><a tabindex="79" href="javascript:insertBB(\'unit catapult\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_catapult.png" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="80" href="javascript:insertBB(\'unit paladin\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_knight.png" /></a></td>' +
		    '	<td><a tabindex="81" href="javascript:insertBB(\'unit noble\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_snob.png" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="82" href="javascript:insertBB(\'madera\','+random+');"><img src="http://tribalwars.es/graphic/holz.png" /></a></td>' +
		    '	<td><a tabindex="83" href="javascript:insertBB(\'barro\','+random+');"><img src="http://tribalwars.es/graphic/lehm.png" /></a></td>' +
		    '	<td><a tabindex="84" href="javascript:insertBB(\'hierro\','+random+');"><img src="http://tribalwars.es/graphic/eisen.png" /></a></td>' +
   		    "</tr></table> " + '<img src="' + yemote_http + '1.gif" onClick="emoticon(\'1.gif\','+random+')">'
			+ '<img src="' + yemote_http + '2.gif" onClick="emoticon(\'2.gif\','+random+')">'
			+ '<img src="' + yemote_http + '3.gif" onClick="emoticon(\'3.gif\','+random+')">'
			+ '<img src="' + yemote_http + '4.gif" onClick="emoticon(\'4.gif\','+random+')">'
			+ '<img src="' + yemote_http + '106.gif" onClick="emoticon(\'106.gif\','+random+')">'
			+ '<img src="' + yemote_http + '5.gif" onClick="emoticon(\'5.gif\','+random+')">'	
			+ '<img src="' + yemote_http + '6.gif" onClick="emoticon(\'6.gif\','+random+')">'
			+ '<img src="' + yemote_http + '7.gif" onClick="emoticon(\'7.gif\','+random+')">'
			+ '<img src="' + yemote_http + '8.gif" onClick="emoticon(\'8.gif\','+random+')">'

			+ '<img src="' + yemote_http + '9.gif" onClick="emoticon(\'9.gif\','+random+')">'
			+ '<img src="' + yemote_http + '10.gif" onClick="emoticon(\'10.gif\','+random+')">'
		+ '<img src="' + yemote_http + '11.gif" onClick="emoticon(\'11.gif\','+random+')">'	
		+ '<img src="' + yemote_http + '12.gif" onClick="emoticon(\'12.gif\','+random+')">'	+ '<img src="' + yemote_http + '13.gif" onClick="emoticon(\'13.gif\','+random+')">'
		+ '<img src="' + yemote_http + '14.gif" onClick="emoticon(\'14.gif\','+random+')">'	
		+ '<img src="' + yemote_http + '15.gif" onClick="emoticon(\'15.gif\','+random+')">'
		+ '<img src="' + yemote_http + '16.gif" onClick="emoticon(\'16.gif\','+random+')">'
		+ '<img src="' + yemote_http + '17.gif" onClick="emoticon(\'17.gif\','+random+')"><br>'
		+ '<img src="' + yemote_http + '18.gif" onClick="emoticon(\'18.gif\','+random+')">'	
		+ '<img src="' + yemote_http + '19.gif" onClick="emoticon(\'19.gif\','+random+')">'

		+ '<img src="' + yemote_http + '20.gif" onClick="emoticon(\'20.gif\','+random+')">'
		+ '<img src="' + yemote_http + '43.gif" onClick="emoticon(\'43.gif\','+random+')">'
		+ '<img src="' + yemote_http + '21.gif" onClick="emoticon(\'21.gif\','+random+')">'
		+ '<img src="' + yemote_http + '22.gif" onClick="emoticon(\'22.gif\','+random+')">'
		+ '<img src="' + yemote_http + '23.gif" onClick="emoticon(\'23.gif\','+random+')">'
		+ '<img src="' + yemote_http + '24.gif" onClick="emoticon(\'24.gif\','+random+')">'
		+ '<img src="' + yemote_http + '25.gif" onClick="emoticon(\'25.gif\','+random+')">'		+ '<img src="' + yemote_http + '26.gif" onClick="emoticon(\'26.gif\','+random+')">'	
		+ '<img src="' + yemote_http + '27.gif" onClick="emoticon(\'27.gif\','+random+')">'
		+ '<img src="' + yemote_http + '28.gif" onClick="emoticon(\'28.gif\','+random+')">'

		+ '<img src="' + yemote_http + '102.gif" onClick="emoticon(\'102.gif\','+random+')">'
		+ '<img src="' + yemote_http + '29.gif" onClick="emoticon(\'29.gif\','+random+')">'
		+ '<img src="' + yemote_http + '30.gif" onClick="emoticon(\'30.gif\','+random+')">'
		+ '<img src="' + yemote_http + '31.gif" onClick="emoticon(\'31.gif\','+random+')">'
		+ '<img src="' + yemote_http + '32.gif" onClick="emoticon(\'32.gif\','+random+')">'
		+ '<img src="' + yemote_http + '33.gif" onClick="emoticon(\'33.gif\','+random+')">'
		+ '<img src="' + yemote_http + '34.gif" onClick="emoticon(\'34.gif\','+random+')">'
		+ '<img src="' + yemote_http + '35.gif" onClick="emoticon(\'35.gif\','+random+')">'	
		+ '<img src="' + yemote_http + '36.gif" onClick="emoticon(\'36.gif\','+random+')">'		+ '<img src="' + yemote_http + '38.gif" onClick="emoticon(\'38.gif\','+random+')">'

		+ '<img src="' + yemote_http + '39.gif" onClick="emoticon(\'39.gif\','+random+')">'
		+ '<img src="' + yemote_http + '40.gif" onClick="emoticon(\'40.gif\','+random+')">'
		+ '<img src="' + yemote_http + '103.gif" onClick="emoticon(\'103.gif\','+random+')">'
		+ '<img src="' + yemote_http + '105.gif" onClick="emoticon(\'105.gif\','+random+')">'
		+ '<img src="' + yemote_http + '41.gif" onClick="emoticon(\'41.gif\','+random+')">'
		+ '<img src="' + yemote_http + '42.gif" onClick="emoticon(\'42.gif\','+random+')">'
		+ '<img src="' + yemote_http + '44.gif" onClick="emoticon(\'44.gif\','+random+')">'
		+ '<img src="' + yemote_http + '45.gif" onClick="emoticon(\'45.gif\','+random+')"><br>'
		+ '<img src="' + yemote_http + '46.gif" onClick="emoticon(\'46.gif\','+random+')">'

		+ '<img src="' + yemote_http + '47.gif" onClick="emoticon(\'47.gif\','+random+')">'
		+ '<img src="' + yemote_http + '48.gif" onClick="emoticon(\'48.gif\','+random+')">'
		+ '<img src="' + yemote_http + '100.gif" onClick="emoticon(\'100.gif\','+random+')">'		+ '<img src="' + yemote_http + '101.gif" onClick="emoticon(\'101.gif\','+random+')">'
		+ '<img src="' + yemote_http + '37.gif" onClick="emoticon(\'37.gif\','+random+')">'
		+ '<img src="' + yemote_http + '109.gif" onClick="emoticon(\'109.gif\','+random+')">'
			+ '<img src="' + yemote_http + '107.gif" onClick="emoticon(\'107.gif\','+random+')">'
		+ '<img src="' + yemote_http + '110.gif" onClick="emoticon(\'110.gif\','+random+')">'
		+ '<img src="' + yemote_http + '111.gif" onClick="emoticon(\'111.gif\','+random+')">'

		+ '<img src="' + yemote_http + '112.gif" onClick="emoticon(\'112.gif\','+random+')">'
		+ '<img src="' + yemote_http + '113.gif" onClick="emoticon(\'113.gif\','+random+')">'
		+ '<img src="' + yemote_http + '114.gif" onClick="emoticon(\'114.gif\','+random+')"><br>'
		+ "</td></tr></table>";
      
	  	var temp_rand = random;
      	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+temp_rand+"\" ");
      	
		document.getElementById("txt_"+temp_rand).cols = 57;
		document.getElementById("txt_"+temp_rand).rows = 7;
		
	NuevaFuncionTW("emoticon", function(id, ident) {
		var emote='[img]' + yemote_http + id+'[/img]';
		var txt = document.getElementById("txt_"+ident);
		var start = txt.selectionStart;
      	var end   = txt.selectionEnd;
		
		if (start == end) {
      					txt.value = txt.value.substr(0, start) + txt.value.substr(end, txt.value.length) + emote; 
      				} else {
      					txtlength = txt.value.length;
      					selection = txt.value.substr(start, (end - start));
      					selectionBefore = txt.value.substr(0, start);
      					selectionAfter = txt.value.substr(end, txtlength);
      
      					txt.value = selectionBefore + selection + emote + selectionAfter;
      					
      				}
		
	});
		
		
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
      				case 'c':
      					txtinsertBefore = "[code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'c';
      					break;
      				case 'u':
      					txtinsertBefore = "[u]";
      					txtinsertAfter = "[/u]";
      					insertButton = 'U';
      					break;
      				case 'quote':
      					txtinsertBefore = "[quote=Numele persoanei]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
      					break;
      				case 'Xurl':
      					txtinsertBefore = "[url=Link]";
      					txtinsertAfter = "Nume[/url]";
      					insertButton = 'X';
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
				case 'unit spear':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_spear.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '37';
      					break;
				case 'unit sword':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_sword.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '38';
      					break;
				case 'unit axe':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_axe.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '39';
      					break;
				case 'unit archer':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_archer.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '40';
      					break;
				case 'unit noble':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_snob.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '41';
      					break;
				case 'unit scout':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_spy.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '42';
      					break;
				case 'unit lcav':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_light.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '43';
      					break;
				case 'unit hcav':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_heavy.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '44';
      					break;
				case 'unit marcher':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_marcher.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '45';
      					break;
				case 'unit paladin':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_knight.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '46';
      					break;
				case 'unit ram':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_ram.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '47';
      					break;
				case 'unit catapult':
      					txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_catapult.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '48';
      					break;
				case 'madera':
      					txtinsertBefore = "[img]http://tribalwars.es/graphic/holz.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '49';
      					break;
				case 'barro':
      					txtinsertBefore = "[img]http://tribalwars.es/graphic/lehm.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '50';
      					break;
				case 'hierro':
      					txtinsertBefore = "[img]http://tribalwars.es/graphic/eisen.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'black text':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '52';
      					break;
				case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '53';
      					break;
				case 'brown text':
      					txtinsertBefore = "[color=brown]";
      					txtinsertAfter = "[/color]";
      					insertButton = '54';
      					break;
				case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '55';
      					break;
				case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '56';
      					break;
				case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '57';
      					break;
				case 'cyan text':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = '58';
      					break;
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '59';
      					break;
				case 'violet text':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '60';
      					break;
				case 'pink text':
      					txtinsertBefore = "[color=pink]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'orange text':
      					txtinsertBefore = "[color=orange]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
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