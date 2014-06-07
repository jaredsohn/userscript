// ==UserScript==
// @name          BBcode - Emoticoane / M.T.
// @namespace     mblaky
// @description   Emoticoane pentru Menthor
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
      
      
      // ======== Lugar donde insertar el Texto ========
      
      (function(){

      	if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /intro_igm/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /screen=mail/ )) {
      		CambiaCuadroTexto();
      		//return;
      	}

	if (location.href.match( /screen=memo/ )) {
      		CambiaForo();
      		return;
      	}

	if (location.href.match( /screen=settings/ )) {
      		CambiaForo();
      		return;
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
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Jugador" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Pueblo" /></a></td>' +
      		    '	<td><a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Tribu" /></a></td>' +
		    '   <td>|</td>'+
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://www.khabrein.info/components/com_comment/joscomment/images/ubb_bold.gif" alt="Negrita" width="16" height="16" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://www.khabrein.info/components/com_comment/joscomment/images/ubb_italicize.gif" alt="Cursiva" width="16" height="16"/></a></td>' +
		    '	<td><a tabindex="15" href="javascript:insertBB(\'c\','+random+');"><img src="http://www.khabrein.info/components/com_comment/joscomment/images/ubb_code.gif" alt="Code" width="16" height="16"/></a></td>' +
      		    '	<td><a tabindex="16" href="javascript:insertBB(\'u\','+random+');"><img src="http://www.khabrein.info/components/com_comment/joscomment/images/ubb_underline.gif" alt="Subrayado" width="16" height="16" /></a></td>' +
      		    '	<td>|</td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://www.offthemap.com/images/site/blockquote.jpg" alt="Cita" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://runbut.com/Images/Hyperlink.jpg" alt="URL" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'Xurl\','+random+');"><img src="http://img50.imageshack.us/img50/6742/cuervozi7.png" alt="XURL" /></a></td>' +
      		    '	<td><a tabindex="20" href="javascript:insertBB(\'img\','+random+');"><img src="http://www.zaburi.com/images/icons/image_add.png" alt="Imagen" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'large text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon14.gif" /></a></td>' +
		    '	<td><a tabindex="22" href="javascript:insertBB(\'small text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon13.gif" /></a></td>' +
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
		    '	<td>|</td>' +
      		    "</tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="34" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://torrentsmd.com//pic/smilies/ae.gif" /></a></td>' +
                    '	<td><a tabindex="35" href="javascript:insertBB(\'smily smile\','+random+');"><img src="http://torrentsmd.com//pic/smilies/w00t.gif" /></a></td>' +
                    '	<td><a tabindex="36" href="javascript:insertBB(\'smily idea\','+random+');"><img src="http://torrentsmd.com//pic/smilies/sarcastic.gif" /></a></td>' +
                    '	<td><a tabindex="37" href="javascript:insertBB(\'smily wink\','+random+');"><img src="http://torrentsmd.com//pic/smilies/ras.gif" /></a></td>' +
                    '	<td><a tabindex="38" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://torrentsmd.com//pic/smilies/wub.gif" /></a></td>' +
		    '	<td><a tabindex="39" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://torrentsmd.com//pic/smilies/smile.gif" /></a></td>' +
                    '	<td><a tabindex="40" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://torrentsmd.com//pic/smilies/rofl.gif" /></a></td>' +
                    '	<td><a tabindex="41" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://torrentsmd.com//pic/smilies/whistle2.gif" /></a></td>' +
                    '	<td><a tabindex="42" href="javascript:insertBB(\'smily cry\','+random+');"><img src="http://torrentsmd.com//pic/smilies/wanking.gif" /></a></td>' +
                    '	<td><a tabindex="43" href="javascript:insertBB(\'smily smile2\','+random+');"><img src="http://torrentsmd.com//pic/smilies/thx.gif" /></a></td>' +
		    '	<td><a tabindex="44" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://torrentsmd.com//pic/smilies/tease.gif" /></a></td>' +
		    '	<td><a tabindex="45" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://torrentsmd.com//pic/smilies/smoke.gif" /></a></td>' +
                    '	<td><a tabindex="46" href="javascript:insertBB(\'smily confused\','+random+');"><img src="http://torrentsmd.com//pic/smilies/shrug.gif" /></a></td>' +
		    '	<td><a tabindex="47" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://torrentsmd.com//pic/smilies/slap.gif" /></a></td>' +
		    '	<td><a tabindex="48" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://torrentsmd.com//pic/smilies/secret.gif" /></a></td>' +
		    '	<td><a tabindex="49" href="javascript:insertBB(\'smily redface\','+random+');"><img src="http://torrentsmd.com//pic/smilies/scare.gif" /></a></td>' +
		    '	<td><a tabindex="50" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://torrentsmd.com//pic/smilies/picknose2.gif" /></a></td>' +
		    '	<td><a tabindex="51" href="javascript:insertBB(\'smily neutral\','+random+');"><img src="http://torrentsmd.com//pic/smilies/moldova.gif" /></a></td>' +
		    '	<td>|</td>' +
   		    "   </tr>   " +
		    '	<td>|</td>' +
		    '	<td><a tabindex="52" href="javascript:insertBB(\'enfadado\','+random+');"><img src="http://avatares.miarroba.com/src/1450838/2c8c8416.gif" /></a></td>' +
		    '	<td><a tabindex="53" href="javascript:insertBB(\'risas\','+random+');"><img src="http://avatares.miarroba.com/src/1450838/bb8a41b2.gif" /></a></td>' +
		    '	<td><a tabindex="54" href="javascript:insertBB(\'beso\','+random+');"><img src="http://img122.imageshack.us/img122/9479/besock1.gif" /></a></td>' +
		    '	<td><a tabindex="55" href="javascript:insertBB(\'corazon\','+random+');"><img src="http://img112.imageshack.us/img112/3645/corazonjl0.gif" /></a></td>' +
		    '	<td><a tabindex="56" href="javascript:insertBB(\'hamster\','+random+');"><img src="http://img112.imageshack.us/img112/3021/hamsterhj6.gif" /></a></td>' +
		    '	<td><a tabindex="57" href="javascript:insertBB(\'ara�a\','+random+');"><img src="http://img240.imageshack.us/img240/3405/araaku1.gif" /></a></td>' +
		    '	<td><a tabindex="58" href="javascript:insertBB(\'oveja\','+random+');"><img src="http://img511.imageshack.us/img511/4282/ovejano8.gif" /></a></td>' +
		    '	<td><a tabindex="59" href="javascript:insertBB(\'marihuana\','+random+');"><img src="http://img77.imageshack.us/img77/2666/hojamarihuanata2.png" /></a></td>' +
		    '	<td><a tabindex="60" href="javascript:insertBB(\'cerveza\','+random+');"><img src="http://img77.imageshack.us/img77/8070/cervezapt0.png" /></a></td>' +
		    '	<td><a tabindex="61" href="javascript:insertBB(\'dinero\','+random+');"><img src="http://img384.imageshack.us/img384/9544/sacodineroun2.gif" /></a></td>' +
		    '	<td><a tabindex="62" href="javascript:insertBB(\'paz\','+random+');"><img src="http://img119.imageshack.us/img119/8813/simbolopazpd8.png" /></a></td>' +
		    '	<td><a tabindex="63" href="javascript:insertBB(\'espada\','+random+');"><img src="http://img104.imageshack.us/img104/7513/espadagy6.gif" /></a></td>' +
		    '	<td><a tabindex="64" href="javascript:insertBB(\'caca\','+random+');"><img src="http://img369.imageshack.us/img369/4199/escrementozk5.png" /></a></td>' +
		    '	<td><a tabindex="65" href="javascript:insertBB(\'fumado\','+random+');"><img src="http://img369.imageshack.us/img369/1283/carafumadoxi0.gif" /></a></td>' +
		    '	<td><a tabindex="66" href="javascript:insertBB(\'calavera\','+random+');"><img src="http://img129.imageshack.us/img129/8434/calaverane8.gif" /></a></td>' +
		    '	<td><a tabindex="67" href="javascript:insertBB(\'playmobilsoul\','+random+');"><img src="http://img361.imageshack.us/img361/9100/playmobilsoulot2.png" /></a></td>' +
		    '	<td><a tabindex="68" href="javascript:insertBB(\'playboy\','+random+');"><img src="http://img162.imageshack.us/img162/5818/playboyws4.png" /></a></td>' +
		    '	<td><a tabindex="69" href="javascript:insertBB(\'xD\','+random+');"><img src="http://www.emoticonesanimados.com.ar/img/d3fc8a1e5d60581f9008ace99cfcf60e.gif" /></a></td>' +
		    '	<td>|</td>' +
		    "</tr>   " +
		    '	<td>|</td>' +
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
		    '	<td>|</td>' +
		    "   </table>";
      
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
      					txtinsertBefore = "[quote=Nombre Persona Aqui]";
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
      					txtinsertAfter = "Nombre[/url]";
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
				case 'smily lol':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/ae.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
      					break;
				case 'smily smile':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/w00t.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '2';
      					break;
				case 'smily idea':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/sarcastic.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '3';
      					break;
                                case 'smily wink':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/ras.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '4';
      					break;
				case 'smily evil':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/wub.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '5';
      					break;
				case 'smily twisted':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/smile.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '6';
      					break;
                                case 'smily eek':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/rofl.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '7';
      					break;
				case 'smily surprised':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/whistle2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '8';
      					break;
				case 'smily cry':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/wanking.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '9';
      					break;
				case 'smily smile2':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/thx.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '10';
      					break;
				case 'smily cool':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/tease.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '11';
      					break;
				case 'smily sad':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/smoke.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '12';
      					break;
				case 'smily confused':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/shrug.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '13';
      					break;
				case 'smily rolleyes':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/slap.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '14';
      					break;
				case 'smily briggin':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/secret.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '15';
      					break;
				case 'smily redface':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/scare.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '16';
      					break;
				case 'smily razz':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/picknose2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '17';
      					break;
				case 'smily neutral':
      					txtinsertBefore = "[img]http://torrentsmd.com//pic/smilies/moldova.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'enfadado':
      					txtinsertBefore = "[img]http://avatares.miarroba.com/src/1450838/2c8c8416.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '19';
      					break;
				case 'risas':
      					txtinsertBefore = "[img]http://avatares.miarroba.com/src/1450838/bb8a41b2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '20';
      					break;
				case 'beso':
      					txtinsertBefore = "[img]http://img122.imageshack.us/img122/9479/besock1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '21';
      					break;
				case 'corazon':
      					txtinsertBefore = "[img]http://img112.imageshack.us/img112/3645/corazonjl0.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '22';
      					break;
				case 'hamster':
      					txtinsertBefore = "[img]http://img112.imageshack.us/img112/3021/hamsterhj6.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '23';
					break;
				case 'ara�a':
      					txtinsertBefore = "[img]http://img240.imageshack.us/img240/3405/araaku1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '24';
					break;
				case 'oveja':
      					txtinsertBefore = "[img]http://img511.imageshack.us/img511/4282/ovejano8.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '25';
					break;
				case 'marihuana':
      					txtinsertBefore = "[img]http://img77.imageshack.us/img77/2666/hojamarihuanata2.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '26';
					break;
				case 'cerveza':
      					txtinsertBefore = "[img]http://img77.imageshack.us/img77/8070/cervezapt0.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '27';
					break;
				case 'dinero':
      					txtinsertBefore = "[img]http://img384.imageshack.us/img384/9544/sacodineroun2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '28';
					break;
				case 'paz':
      					txtinsertBefore = "[img]http://img119.imageshack.us/img119/8813/simbolopazpd8.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '29';
					break;
				case 'espada':
      					txtinsertBefore = "[img]http://img104.imageshack.us/img104/7513/espadagy6.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '30'
					break;
				case 'caca':
      					txtinsertBefore = "[img]http://img369.imageshack.us/img369/4199/escrementozk5.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '31'
					break;	
				case 'fumado':
      					txtinsertBefore = "[img]http://img369.imageshack.us/img369/1283/carafumadoxi0.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '32'
					break;
				case 'calavera':
      					txtinsertBefore = "[img]http://img129.imageshack.us/img129/8434/calaverane8.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '33'
					break;
				case 'playmobilsoul':
      					txtinsertBefore = "[img]http://img361.imageshack.us/img361/9100/playmobilsoulot2.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '34'
					break;
				case 'playboy':
      					txtinsertBefore = "[img]http://img162.imageshack.us/img162/5818/playboyws4.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '35'
					break;
				case 'xD':
      					txtinsertBefore = "[img]http://www.emoticonesanimados.com.ar/img/d3fc8a1e5d60581f9008ace99cfcf60e.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '36'
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