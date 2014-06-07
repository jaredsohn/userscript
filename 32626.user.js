// ==UserScript==
// @name          TribalWars BBCodes
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
// @include        http://hu*.klanhaboru.hu/*
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
                    '	<td><a tabindex="34" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif" /></a></td>' +
                    '	<td><a tabindex="35" href="javascript:insertBB(\'smily smile\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/smile.gif" /></a></td>' +
                    '	<td><a tabindex="36" href="javascript:insertBB(\'smily idea\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_idea.gif" /></a></td>' +
                    '	<td><a tabindex="37" href="javascript:insertBB(\'smily wink\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_wink.gif" /></a></td>' +
                    '	<td><a tabindex="38" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif" /></a></td>' +
		    '	<td><a tabindex="39" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif" /></a></td>' +
                    '	<td><a tabindex="40" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif" /></a></td>' +
                    '	<td><a tabindex="41" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif" /></a></td>' +
                    '	<td><a tabindex="42" href="javascript:insertBB(\'smily cry\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cry.gif" /></a></td>' +
                    '	<td><a tabindex="43" href="javascript:insertBB(\'smily smile2\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_smile.gif" /></a></td>' +
		    '	<td><a tabindex="44" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif" /></a></td>' +
		    '	<td><a tabindex="45" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif" /></a></td>' +
                    '	<td><a tabindex="46" href="javascript:insertBB(\'smily confused\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_confused.gif" /></a></td>' +
		    '	<td><a tabindex="47" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif" /></a></td>' +
		    '	<td><a tabindex="48" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif" /></a></td>' +
		    '	<td><a tabindex="49" href="javascript:insertBB(\'smily redface\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_redface.gif" /></a></td>' +
		    '	<td><a tabindex="50" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif" /></a></td>' +
		    '	<td><a tabindex="51" href="javascript:insertBB(\'smily neutral\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_neutral.gif" /></a></td>' +
		    '	<td>|</td>' +
		    "</tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="89" href="javascript:insertBB(\'a\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif" /></a></td>' +
                    '	<td><a tabindex="90" href="javascript:insertBB(\b2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif" /></a></td>' +
		    '	<td><a tabindex="100" href="javascript:insertBB(\'c2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif" /></a></td>' +
		    '	<td><a tabindex="101" href="javascript:insertBB(\'d\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif" /></a></td>' +
		    '	<td><a tabindex="102" href="javascript:insertBB(\'e\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif" /></a></td>' +
		    '	<td><a tabindex="85" href="javascript:insertBB(\'smily hug\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif" /></a></td>' +
                    '	<td><a tabindex="103" href="javascript:insertBB(\'f\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif" /></a></td>' +
		    '	<td><a tabindex="104" href="javascript:insertBB(\'g\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif" /></a></td>' +
		    '   <td><a tabindex="87" href="javascript:insertBB(\'smily broken heart\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif" /></a></td>' +
		    '	<td><a tabindex="105" href="javascript:insertBB(\'h\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif" /></a></td>' +
                    '	<td><a tabindex="106" href="javascript:insertBB(\'i2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif" /></a></td>' +
                    '	<td><a tabindex="107" href="javascript:insertBB(\'j\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif" /></a></td>' +
                    '	<td><a tabindex="108" href="javascript:insertBB(\'k\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif" /></a></td>' +
                    '	<td><a tabindex="109" href="javascript:insertBB(\'l\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif" /></a></td>' +
                    '	<td><a tabindex="110" href="javascript:insertBB(\'m\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif" /></a></td>' +
                    '	<td><a tabindex="111" href="javascript:insertBB(\'n\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif" /></a></td>' +
                    '	<td><a tabindex="112" href="javascript:insertBB(\'o\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif" /></a></td>' +
                    '	<td><a tabindex="113" href="javascript:insertBB(\'p\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif" /></a></td>' +
                    '	<td><a tabindex="114" href="javascript:insertBB(\'q\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif" /></a></td>' +
                    '	<td><a tabindex="115" href="javascript:insertBB(\'r\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif" /></a></td>' +
                    '	<td><a tabindex="116" href="javascript:insertBB(\'s\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif" /></a></td>' +
                    '	<td><a tabindex="117" href="javascript:insertBB(\'t\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif" /></a></td>' +
                    '	<td><a tabindex="118" href="javascript:insertBB(\'u2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif" /></a></td>' +
                    '	<td><a tabindex="119" href="javascript:insertBB(\'v\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif" /></a></td>' +
                    '	<td><a tabindex="120" href="javascript:insertBB(\'w\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif" /></a></td>' +
                    '	<td>|</td>' +
   		    "   </tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="121" href="javascript:insertBB(\'x\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif" /></a></td>' +                    
                    '	<td><a tabindex="122" href="javascript:insertBB(\'y\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif" /></a></td>' +    
                    '	<td><a tabindex="123" href="javascript:insertBB(\'z\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif" /></a></td>' +    
                    '	<td><a tabindex="124" href="javascript:insertBB(\'a2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif" /></a></td>' +        
                    '	<td><a tabindex="88" href="javascript:insertBB(\'smily sick\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif" /></a></td>' +
                    '	<td><a tabindex="125" href="javascript:insertBB(\'b3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif" /></a></td>' +    
                    '	<td><a tabindex="126" href="javascript:insertBB(\'c3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif" /></a></td>' +    
                    '	<td><a tabindex="127" href="javascript:insertBB(\'d2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif" /></a></td>' +    
                    '	<td><a tabindex="128" href="javascript:insertBB(\'e2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif" /></a></td>' +    
                    '	<td><a tabindex="129" href="javascript:insertBB(\'f2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif" /></a></td>' +    
                    '	<td><a tabindex="130" href="javascript:insertBB(\'g2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif" /></a></td>' +    
                    '	<td><a tabindex="131" href="javascript:insertBB(\'h2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif" /></a></td>' +    
                    '	<td><a tabindex="132" href="javascript:insertBB(\'i3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif" /></a></td>' +    
                    '	<td><a tabindex="133" href="javascript:insertBB(\'j2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif" /></a></td>' +    
                    '	<td><a tabindex="134" href="javascript:insertBB(\'k2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif" /></a></td>' +    
                    '	<td><a tabindex="135" href="javascript:insertBB(\'l2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif" /></a></td>' +    
                    '	<td><a tabindex="136" href="javascript:insertBB(\'m2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif" /></a></td>' +    
                    '	<td><a tabindex="137" href="javascript:insertBB(\'n2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif" /></a></td>' +    
                    '	<td><a tabindex="138" href="javascript:insertBB(\'o2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif" /></a></td>' +    
                    '	<td><a tabindex="139" href="javascript:insertBB(\'p2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif" /></a></td>' +    
                    '	<td><a tabindex="140" href="javascript:insertBB(\'q2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif" /></a></td>' +    
                    '	<td><a tabindex="141" href="javascript:insertBB(\'r2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif" /></a></td>' +    
                    '	<td><a tabindex="142" href="javascript:insertBB(\'s2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif" /></a></td>' +    
                    '	<td><a tabindex="143" href="javascript:insertBB(\'t2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif" /></a></td>' +    
                    '	<td><a tabindex="144" href="javascript:insertBB(\'u3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif" /></a></td>' +    
                    '	<td>|</td>' +
   		    "   </tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="86" href="javascript:insertBB(\'smily monkey\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif" /></a></td>' +   
                    '	<td><a tabindex="145" href="javascript:insertBB(\'v2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif" /></a></td>' +    
                    '	<td><a tabindex="146" href="javascript:insertBB(\'w2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif" /></a></td>' +    
                    '	<td><a tabindex="147" href="javascript:insertBB(\'x2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif" /></a></td>' +    
                    '	<td><a tabindex="148" href="javascript:insertBB(\'y2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif" /></a></td>' +    
                    '	<td><a tabindex="149" href="javascript:insertBB(\'z2\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif" /></a></td>' +    
                    '	<td><a tabindex="150" href="javascript:insertBB(\'a3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif" /></a></td>' +    
                    '	<td><a tabindex="151" href="javascript:insertBB(\'b4\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif" /></a></td>' +    
                    '	<td><a tabindex="152" href="javascript:insertBB(\'c4\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif" /></a></td>' +    
                    '	<td><a tabindex="153" href="javascript:insertBB(\'d3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif" /></a></td>' +    
                    '	<td><a tabindex="154" href="javascript:insertBB(\'e3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif" /></a></td>' +    
                    '	<td><a tabindex="155" href="javascript:insertBB(\'f3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif" /></a></td>' +    
                    '	<td><a tabindex="156" href="javascript:insertBB(\'g3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif" /></a></td>' +    
                    '	<td><a tabindex="157" href="javascript:insertBB(\'h3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif" /></a></td>' +    
                    '	<td><a tabindex="158" href="javascript:insertBB(\'i4\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif" /></a></td>' +    
                    '	<td><a tabindex="159" href="javascript:insertBB(\'j3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif" /></a></td>' +    
                    '	<td><a tabindex="160" href="javascript:insertBB(\'k3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif" /></a></td>' +    
                    '	<td><a tabindex="161" href="javascript:insertBB(\'l3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif" /></a></td>' +    
                    '	<td><a tabindex="162" href="javascript:insertBB(\'m3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif" /></a></td>' +    
                    '	<td><a tabindex="163" href="javascript:insertBB(\'n3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif" /></a></td>' +    
                    '	<td><a tabindex="164" href="javascript:insertBB(\'o3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif" /></a></td>' +
                    '	<td><a tabindex="165" href="javascript:insertBB(\'p3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif" /></a></td>' +    
                    '	<td><a tabindex="166" href="javascript:insertBB(\'q3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif" /></a></td>' +    
                    '	<td><a tabindex="167" href="javascript:insertBB(\'r3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif" /></a></td>' +    
                    '	<td>|</td>' +
   		    "   </tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="168" href="javascript:insertBB(\'s3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif" /></a></td>' +    
                    '	<td><a tabindex="169" href="javascript:insertBB(\'t3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif" /></a></td>' +    
                    '	<td><a tabindex="170" href="javascript:insertBB(\'u4\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif" /></a></td>' +   
                    '	<td><a tabindex="171" href="javascript:insertBB(\'v3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif" /></a></td>' +     
                    '	<td><a tabindex="172" href="javascript:insertBB(\'w3\','+random+');"><img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif" /></a></td>' +    
                    '	<td><a tabindex="173" href="javascript:insertBB(\'x3\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/tongue.gif" /></a></td>' +    
                    '	<td><a tabindex="174" href="javascript:insertBB(\'y3\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon6.gif" /></a></td>' +    
		    '	<td><a tabindex="175" href="javascript:insertBB(\'z3\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/mad.gif" /></a></td>' +    
		    '	<td><a tabindex="190" href="javascript:insertBB(\'o4\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/eek.gif" /></a></td>' +    
		    '	<td><a tabindex="176" href="javascript:insertBB(\'a4\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/confused.gif" /></a></td>' +   	
 		    '	<td><a tabindex="177" href="javascript:insertBB(\'b5\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/biggrin.gif" /></a></td>' + 
 		    '	<td><a tabindex="178" href="javascript:insertBB(\'c5\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/rolleyes.gif" /></a></td>' + 
        	    '	<td><a tabindex="179" href="javascript:insertBB(\'d4\','+random+');"><img src="http://forum.klanhaboru.hu/images/smilies/frown.gif" /></a></td>' + 
        	    '	<td><a tabindex="180" href="javascript:insertBB(\'e4\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon12.gif" /></a></td>' + 
        	    '	<td><a tabindex="181" href="javascript:insertBB(\'f4\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon11.gif" /></a></td>' + 
        	    '	<td><a tabindex="182" href="javascript:insertBB(\'g4\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon1.gif" /></a></td>' + 
        	    '	<td><a tabindex="183" href="javascript:insertBB(\'h4\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon2.gif" /></a></td>' + 
        	    '	<td><a tabindex="184" href="javascript:insertBB(\'i5\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon3.gif" /></a></td>' + 
        	    '	<td><a tabindex="185" href="javascript:insertBB(\'j4\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon4.gif" /></a></td>' + 
        	    '	<td><a tabindex="186" href="javascript:insertBB(\'k4\','+random+');"><img src="http://forum.klanhaboru.hu/images/icons/icon5.gif" /></a></td>' + 
        	    '	<td><a tabindex="187" href="javascript:insertBB(\'l4\','+random+');"><img src="http://forum.klanhaboru.hu/staemme/misc/im_msn.gif" /></a></td>' + 
        	    '	<td><a tabindex="188" href="javascript:insertBB(\'m4\','+random+');"><img src="http://forum.klanhaboru.hu/staemme/statusicon/user_online.gif" /></a></td>' + 
              	    '	<td><a tabindex="189" href="javascript:insertBB(\'n4\','+random+');"><img src="http://forum.klanhaboru.hu/staemme/statusicon/user_offline.gif" /></a></td>' + 
              	    '	<td><a tabindex="191" href="javascript:insertBB(\'p4\','+random+');"><img src="http://kepfeltoltes.hu/080824/jkjkhfut_www.kepfeltoltes.hu_.gif" /></a></td>' + 
                    '	<td>|</td>' +
   		    "   </tr>   " +
		    '	<td>|</td>' +
		    '	<td><a tabindex="52" href="javascript:insertBB(\'enfadado\','+random+');"><img src="http://avatares.miarroba.com/src/1450838/2c8c8416.gif" /></a></td>' +
		    '	<td><a tabindex="53" href="javascript:insertBB(\'risas\','+random+');"><img src="http://avatares.miarroba.com/src/1450838/bb8a41b2.gif" /></a></td>' +
		    '	<td><a tabindex="54" href="javascript:insertBB(\'beso\','+random+');"><img src="http://img122.imageshack.us/img122/9479/besock1.gif" /></a></td>' +
		    '	<td><a tabindex="55" href="javascript:insertBB(\'corazon\','+random+');"><img src="http://img112.imageshack.us/img112/3645/corazonjl0.gif" /></a></td>' +
		    '	<td><a tabindex="56" href="javascript:insertBB(\'hamster\','+random+');"><img src="http://img112.imageshack.us/img112/3021/hamsterhj6.gif" /></a></td>' +
		    '	<td><a tabindex="57" href="javascript:insertBB(\'ara?a\','+random+');"><img src="http://img240.imageshack.us/img240/3405/araaku1.gif" /></a></td>' +
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
		    "</tr>   " +
		    '	<td>|</td>' +
		    '	<td><a tabindex="192" href="javascript:insertBB(\'barracks\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/barracks.png" /></a></td>' +
		    '	<td><a tabindex="193" href="javascript:insertBB(\'stable\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/stable.png" /></a></td>' +
		    '	<td><a tabindex="194" href="javascript:insertBB(\'garage\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/garage.png" /></a></td>' +
		    '	<td><a tabindex="195" href="javascript:insertBB(\'snob\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/snob.png" /></a></td>' +
		    '	<td><a tabindex="196" href="javascript:insertBB(\'smith\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/smith.png" /></a></td>' +
		    '	<td><a tabindex="197" href="javascript:insertBB(\'place\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/place.png" /></a></td>' +
		    '	<td><a tabindex="198" href="javascript:insertBB(\'statue\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/statue.png" /></a></td>' +
		    '	<td><a tabindex="199" href="javascript:insertBB(\'market\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/market.png" /></a></td>' +
		    '	<td><a tabindex="200" href="javascript:insertBB(\'wood\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/wood.png" /></a></td>' +
		    '	<td><a tabindex="203" href="javascript:insertBB(\'stone\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/stone.png" /></a></td>' +
		    '	<td><a tabindex="204" href="javascript:insertBB(\'iron\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/iron.png" /></a></td>' +
		    '	<td><a tabindex="205" href="javascript:insertBB(\'farm\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/farm.png" /></a></td>' +
		    '	<td><a tabindex="206" href="javascript:insertBB(\'storage\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/storage.png" /></a></td>' +
		    '	<td><a tabindex="207" href="javascript:insertBB(\'hide\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/hide.png" /></a></td>' +
		    '	<td><a tabindex="208" href="javascript:insertBB(\'wall\','+random+');"><img src="http://hu2.klanhaboru.hu/graphic/buildings/wall.png" /></a></td>' +
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
                                case 'smily hug':
                                        txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif";
                                        txtinsertAfter = "[/img]";
      					insertButton = '62';
                                        break;
				case 'smily monkey':
                                        txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif";
                                        txtinsertAfter = "[/img]";
      					insertButton = '63';
                                        break;
                                case 'smily broken heart':
                                        txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif";
                                        txtinsertAfter = "[/img]";
      					insertButton = '64';
                                        break;
                                case 'smily sick':
                                        txtinsertBefore = "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif";
                                        txtinsertAfter = "[/img]";
      					insertButton = '65';
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
				case 'ara?a':
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
                                case 'a':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '66'
					break;
                                case 'b2':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '67'
					break;
                                case 'c2':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '68'
					break;
				case 'd':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '69'
					break;
				case 'e':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '70'
					break;
				case 'f':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '71'
					break;
				case 'g':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '72'
					break;
				case 'h':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '73'
					break;
				case 'i2':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '74'
					break;
				case 'j':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '75'
					break;
				case 'k':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '76'
					break;
				case 'l':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '77'
					break;
				case 'm':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '78'
					break;
				case 'n':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '79'
					break;
				case 'o':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '80'
					break;
				case 'p':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '81'
					break;
				case 'q':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '82'
					break;
				case 'r':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '83'
					break;
				case 's':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '84'
					break;
				case 't':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '85'
					break;
				case 'u2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '86'
					break;
				case 'v':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '87'
					break;
				case 'w':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '88'
					break;
				case 'x':
      					txtinsertBefore = "[img]http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '89'
					break;
				case 'y':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '90'
					break;
				case 'z':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '91'
					break;
				case 'a2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '92'
					break;
				case 'b3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '93'
					break;
				case 'c3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '94'
					break;
				case 'd2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '95'
					break;
				case 'e2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '96'
					break;
				case 'f2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '96'
					break;
				case 'g2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '97'
					break;
				case 'h2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '98'
					break;
				case 'i3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '99'
					break;
				case 'j2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '100'
					break;
				case 'k2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '101'
					break;
				case 'l2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '96'
					break;
				case 'm2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '102'
					break;
				case 'n2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '103'
					break;
				case 'o2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '104'
					break;
				case 'p2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '105'
					break;
				case 'q2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '106'
					break;
				case 'r2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '107'
					break;
				case 's2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '108'
					break;
				case 't2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '109'
					break;
				case 'u3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '110'
					break;
				case 'v2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '111'
					break;
				case 'w2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '112'
					break;
				case 'x2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '113'
					break;
				case 'y2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '114'
					break;
				case 'z2':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '115'
					break;
				case 'a3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '116'
					break;
				case 'b4':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '117'
					break;
				case 'c4':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '118'
					break;
				case 'd3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '119'
					break;
				case 'e3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '120'
					break;
				case 'f3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '121'
					break;
				case 'g3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '122'
					break;
				case 'h3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '123'
					break;
				case 'i4':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '124'
					break;
				case 'j3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '125'
					break;
				case 'k3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '126'
					break;
				case 'l3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '127'
					break;
				case 'm3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '128'
					break;
				case 'n3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '129'
					break;
				case 'o3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '130'
					break;
				case 'p3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '131'
					break;
				case 'q3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '132'
					break;
				case 'r3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '133'
					break;
				case 's3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '134'
					break;
				case 't3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '135'
					break;
				case 'u4':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '136'
					break;
				case 'v3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '137'
					break;
				case 'w3':
      					txtinsertBefore = "[img]hhttp://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '138'
					break;
                                case 'x3':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/tongue.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '139'
					break;
                                case 'y3':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon6.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '140'
					break;	
                                case 'z3':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/mad.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '141'
					break;	
                                case 'a4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/confused.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '142'
					break;	
                                case 'b5':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/biggrin.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '143'
					break;
                                case 'c5':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/rolleyes.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '144'
					break;	
                                case 'd4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/frown.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '145'
					break;	
                                case 'e4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon12.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '146'
					break;	
                                case 'f4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon11.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '147'
					break;	
                                case 'g4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '148'
					break;	
                                case 'h4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '149'
					break;	
                                case 'i5':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon3.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '150'
					break;	
                                case 'j4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '151'
					break;	
                                case 'k4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/icons/icon5.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '152'
					break;	
                                case 'l4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/staemme/misc/im_msn.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '153'
					break;	
                                case 'm4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/staemme/statusicon/user_online.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '154'
					break;	
                                case 'n4':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/staemme/statusicon/user_offline.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '155'
					break;
                                case 'p4':
      					txtinsertBefore = "[img]http://kepfeltoltes.hu/080824/jkjkhfut_www.kepfeltoltes.hu_.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '156'
					break;
				case 'barracks':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/barracks.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '157';
      					break;
				case 'stable':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/stable.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '158';
      					break;
				case 'garage':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/garage.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '159';
      					break;
				case 'snob':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/snob.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '160';
      					break;
				case 'smith':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/smith.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '161';
      					break;
				case 'place':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/place.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '162';
      					break;
				case 'statue':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/statue.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '163';
      					break;
				case 'market':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/market.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '164';
      					break;
				case 'wood':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/wood.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '165';
      					break;
				case 'stone':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/stone.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '166';
      					break;
				case 'iron':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/iron.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '167';
      					break;
				case 'farm':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/farm.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '168';
      					break;
				case 'storage':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/storage.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '169';
      					break;
				case 'hide':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/hide.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '170';
      					break;
				case 'wall':
      					txtinsertBefore = "[img]http://hu2.klanhaboru.hu/graphic/buildings/wall.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '171';
      					break;					
                                case 'xD':
      					txtinsertBefore = "[img]http://forum.klanhaboru.hu/images/smilies/frown.gif";
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