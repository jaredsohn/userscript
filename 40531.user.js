// ==UserScript==
// @name          Tribal Wars BB-kody
// @description   Script dodá BB-kody
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
// @include       http://sk*.divoke-kmene.sk/*
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
      		    "<tr>    " +
' <td>|</td>' + 
	' <td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://gods-destructions.deg.cz/image/player.png" alt="Jugador" /></a></td>' +
    ' <td><a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="http://gods-destructions.deg.cz/image/village.gif" alt="Pueblo" /></a></td>' +
    ' <td><a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="http://gods-destructions.deg.cz/image/group.png" alt="Tribu" /></a></td>' +
' <td>|</td>'+
    ' <td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://gods-destructions.deg.cz/image/B.png" alt="Negrita" /></a></td>' +
    ' <td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://gods-destructions.deg.cz/image/I.png" alt="Cursiva" /></a></td>' +
	' <td><a tabindex="16" href="javascript:insertBB(\'u\','+random+');"><img src="http://gods-destructions.deg.cz/image/U.png" alt="Subrayado" /></a></td>' +
	' <td><a tabindex="15" href="javascript:insertBB(\'c\','+random+');"><img src="http://gods-destructions.deg.cz/image/C.png" alt="Code" /></a></td>' +
	' <td><a tabindex="15" href="javascript:insertBB(\'r\','+random+');"><img src="http://gods-destructions.deg.cz/image/R.png" alt="report" /></a></td>' +
	' <td><a tabindex="15" href="http://tribalwar-parser.net/cz/" target="_blank"><img src="http://gods-destructions.deg.cz/image/R_go.png" alt="report" /></a></td>' +
	' <td><a tabindex="15" href="http://cz.twstats.com/index.php" target="_blank"><img src="http://gods-destructions.deg.cz/image/dk.png" alt="report" /></a></td>' +
' <td>|</td>' +
    ' <td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://gods-destructions.deg.cz/image/comments.png" alt="Cita" /></a></td>' +
    ' <td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://gods-destructions.deg.cz/image/link.png" alt="URL" /></a></td>' +
    ' <td><a tabindex="19" href="javascript:insertBB(\'Xurl\','+random+');"><img src="http://gods-destructions.deg.cz/image/html.png" alt="XURL" /></a></td>' +
    ' <td><a tabindex="20" href="javascript:insertBB(\'img\','+random+');"><img src="http://gods-destructions.deg.cz/image/photo.png" alt="Imagen" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="21" href="javascript:insertBB(\'large text\','+random+');"><img src="http://gods-destructions.deg.cz/image/zoom_in.png" /></a></td>' +
	' <td><a tabindex="22" href="javascript:insertBB(\'small text\','+random+');"><img src="http://gods-destructions.deg.cz/image/zoom_out.png" /></a></td>' +
' <td>|</td>'+
	' <td><a tabindex="44" href="javascript:insertBB(\'smily 378\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/78/378.gif" /></a></td>' +
	' <td><a tabindex="447" href="javascript:insertBB(\'smily 793\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/93/793.gif" /></a></td>' +
	' <td><a tabindex="447" href="javascript:insertBB(\'smily 447\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/47/447.gif" /></a></td>' +
	' <td><a tabindex="447" href="javascript:insertBB(\'smily 2009\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/9/2009.gif" /></a></td>' +
	' <td><a tabindex="49" href="javascript:insertBB(\'smily 1582\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/82/1582.gif" /></a></td>' +
	' <td><a tabindex="52" href="javascript:insertBB(\'smily 141\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/41/141.gif" /></a></td>' +
' <td>|</td>'+
"</tr>   " +
' <td>|</td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Black\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/01_Black.PNG" /></a></td>' +
	' <td><a tabindex="25" href="javascript:insertBB(\'DarkRed\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/02_DarkRed.PNG" /></a></td>' +	
	' <td><a tabindex="26" href="javascript:insertBB(\'SaddleBrown\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/03_SaddleBrown.PNG" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="27" href="javascript:insertBB(\'IndianRed\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/04_IndianRed.PNG" /></a></td>' +	
	' <td><a tabindex="28" href="javascript:insertBB(\'Chocolate\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/05_Chocolate.PNG" /></a></td>' +
	' <td><a tabindex="29" href="javascript:insertBB(\'Peru\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/06_Peru.PNG" /></a></td>' +
	' <td><a tabindex="30" href="javascript:insertBB(\'DarkGoldenrod\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/07_DarkGoldenrod.PNG" /></a></td>' +
	' <td><a tabindex="31" href="javascript:insertBB(\'BurlyWood\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/08_BurlyWood.PNG" /></a></td>' +
	' <td><a tabindex="32" href="javascript:insertBB(\'Pink\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/09_Pink.PNG" /></a></td>' +
	' <td><a tabindex="33" href="javascript:insertBB(\'Orchid\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/10_Orchid.PNG" /></a></td>' +
' <td>|</td>' +
' <td><a tabindex="24" href="javascript:insertBB(\'MediumOrchid\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/11_MediumOrchid.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Blue\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/12_Blue.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'MediumSlateBlue\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/13_MediumSlateBlue.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'BlueViolet\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/14_BlueViolet.PNG" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Magenta\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/15_Magenta.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'DeepPink\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/16_DeepPink.PNG" /></a></td>' +
' <td>|</td>' +
' <td><a tabindex="52" href="javascript:insertBB(\'smily 1581\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/81/1581.gif" /></a></td>' +
' <td><a tabindex="68" href="javascript:insertBB(\'smily 2772\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/72/2772.gif" /></a></td>' +
' <td><a tabindex="68" href="javascript:insertBB(\'smily 216\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/16/216.gif" /></a></td>' +
' <td><a tabindex="61" href="javascript:insertBB(\'smily 2830\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/30/2830.gif" /></a></td>' +
' <td><a tabindex="52" href="javascript:insertBB(\'smily 1708\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/8/1708.gif" /></a></td>' +
' <td><a tabindex="52" href="javascript:insertBB(\'smily 2994\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/94/2994.gif" /></a></td>' +
' <td>|</td>' +
"</tr>   " +
' <td>|</td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Red\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/17_Red.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'OrangeRed\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/19_OrangeRed.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'LightCorat\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/20_LightCoral.PNG" /></a></td>' +
' <td>|</td>'+
	' <td><a tabindex="24" href="javascript:insertBB(\'DarkOrange\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/21_DarkOrange.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Gold\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/22_Gold.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Yellow\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/23_Yellow.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'MediumSpringGreen\','+random+');"><img src="http://gods-destructions.7u.cz/image/barvy/24_MediumSpringGreen.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Lime\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/25_Lime.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'YellowGreen\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/26_YellowGreen.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'DarkKhaki\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/27_DarkKhaki.PNG" /></a></td>' +
' <td>|</td>'+
	' <td><a tabindex="24" href="javascript:insertBB(\'DerkSeaGreen\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/28_DarkSeaGreen.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Teal\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/29_Teal.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'DarkSlateGray\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/30_DarkSlateGray.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'DeepSkyBlue\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/31_DeepSkyBlue.PNG" /></a></td>' +
' <td>|</td>'+
	' <td><a tabindex="24" href="javascript:insertBB(\'Turquoise\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/32_Turquoise.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Aqua\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/33_Aqua.PNG" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="68" href="javascript:insertBB(\'smily 257\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/57/257.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 2374\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/74/2374.gif" /></a></td>' +
	' <td><a tabindex="64" href="javascript:insertBB(\'smily 2795\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/95/2795.gif" /></a></td>' +
	' <td><a tabindex="64" href="javascript:insertBB(\'doma306\','+random+');"><img src="http://www.smajlici-1.ic.cz/domov/301-350/doma306.gif" /></a></td>' +
	' <td><a tabindex="64" href="javascript:insertBB(\'doma041\','+random+');"><img src="http://www.smajlici-1.ic.cz/domov/001-050/doma041.gif" /></a></td>' +
	' <td><a tabindex="64" href="javascript:insertBB(\'1maly383\','+random+');"><img src="http://www.smajlici-1.ic.cz/male1/351-400/1maly383.gif" /></a></td>' +
' <td>|</td>' +
"</tr>   " +
' <td>|</td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'SlateGray\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/34_SlateGray.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'Silver\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/35_Silver.PNG" /></a></td>' +
	' <td><a tabindex="24" href="javascript:insertBB(\'White\','+random+');"><img src="http://gods-destructions.deg.cz/image/barvy/36_White.PNG" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="34" href="javascript:insertBB(\'smily 1\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/1/1.gif" /></a></td>' +
	' <td><a tabindex="35" href="javascript:insertBB(\'smily 3\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/3/3.gif" /></a></td>' +
	' <td><a tabindex="51" href="javascript:insertBB(\'smily 4\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/4/4.gif" /></a></td>' +
	' <td><a tabindex="36" href="javascript:insertBB(\'smily 12\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/12/12.gif" /></a></td>' +
	' <td><a tabindex="50" href="javascript:insertBB(\'smily 1631\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/31/1631.gif" /></a></td>' +
	' <td><a tabindex="51" href="javascript:insertBB(\'smily 18\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/18/18.gif" /></a></td>' +
	' <td><a tabindex="51" href="javascript:insertBB(\'smily 30\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/30/30.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="52" href="javascript:insertBB(\'smily 43\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/43/43.gif" /></a></td>' +
	' <td><a tabindex="37" href="javascript:insertBB(\'smily 47\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/47/47.gif" /></a></td>' +
	' <td><a tabindex="38" href="javascript:insertBB(\'smily 53\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/53/53.gif" /></a></td>' +
	' <td><a tabindex="39" href="javascript:insertBB(\'smily 70\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/70/70.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="40" href="javascript:insertBB(\'smily 71\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/71/71.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 85\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/85/85.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 4835\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/35/4835.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 2836\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/36/2836.gif" /></a></td>' +
	' <td><a tabindex="68" href="javascript:insertBB(\'smily 4548\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/48/4548.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 2163\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/63/2163.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 2054\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/54/2054.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 2200\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/0/2200.gif" /></a></td>' +
' <td>|</td>' +
"</tr>   " +
' <td>|</td>' +
	' <td><a tabindex="42" href="javascript:insertBB(\'smily 88\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/88/88.gif" /></a></td>' +
	' <td><a tabindex="42" href="javascript:insertBB(\'smily 712\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/12/712.gif" /></a></td>' +
	' <td><a tabindex="42" href="javascript:insertBB(\'smily 74\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/74/74.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="43" href="javascript:insertBB(\'smily 90\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/90/90.gif" /></a></td>' +
	' <td><a tabindex="44" href="javascript:insertBB(\'smily 161\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/61/161.gif" /></a></td>' +
	' <td><a tabindex="45" href="javascript:insertBB(\'smily 349\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/49/349.gif" /></a></td>' +
	' <td><a tabindex="44" href="javascript:insertBB(\'smily 369\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/69/369.gif" /></a></td>' +
	' <td><a tabindex="49" href="javascript:insertBB(\'smily 924\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/24/924.gif" /></a></td>' +
	' <td><a tabindex="46" href="javascript:insertBB(\'smily 467\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/67/467.gif" /></a></td>' +
	' <td><a tabindex="47" href="javascript:insertBB(\'smily 606\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/6/606.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="48" href="javascript:insertBB(\'smily 758\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/58/758.gif" /></a></td>' +
	' <td><a tabindex="52" href="javascript:insertBB(\'smily 465\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/65/465.gif" /></a></td>' +
	' <td><a tabindex="52" href="javascript:insertBB(\'smily 1009\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/9/1009.gif" /></a></td>' +
	' <td><a tabindex="55" href="javascript:insertBB(\'smily 1239\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/39/1239.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="52" href="javascript:insertBB(\'smily 1776\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/76/1776.gif" /></a></td>' +
	' <td><a tabindex="52" href="javascript:insertBB(\'smily 290\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/90/290.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 1556\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/56/1556.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 909\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/9/909.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 338\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/38/338.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 305\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/5/305.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 255\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/55/255.gif" /></a></td>' +
	' <td><a tabindex="41" href="javascript:insertBB(\'smily 814\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/14/814.gif" /></a></td>' +
' <td>|</td>' +
"   </tr>   " +
' <td>|</td>' +
	' <td><a tabindex="54" href="javascript:insertBB(\'smily 2433\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/33/2433.gif" /></a></td>' +
	' <td><a tabindex="54" href="javascript:insertBB(\'smily 1196\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/96/1196.gif" /></a></td>' +
	' <td><a tabindex="60" href="javascript:insertBB(\'smily 1067\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/67/1067.gif" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="53" href="javascript:insertBB(\'smily 3757\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/57/3757.gif" /></a></td>' +
	' <td><a tabindex="56" href="javascript:insertBB(\'smily 837\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/37/837.gif" /></a></td>' +
	' <td><a tabindex="57" href="javascript:insertBB(\'smily 41\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/41/41.gif" /></a></td>' +
	' <td><a tabindex="58" href="javascript:insertBB(\'smily 261\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/61/261.gif" /></a></td>' +
	' <td><a tabindex="59" href="javascript:insertBB(\'smily 268\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/68/268.gif" /></a></td>' +
	' <td><a tabindex="62" href="javascript:insertBB(\'info\','+random+');"><img src="http://gods-destructions.deg.cz/image/info.png" /></a></td>' +
	' <td><a tabindex="63" href="javascript:insertBB(\'alert\','+random+');"><img src="http://gods-destructions.deg.cz/image/alert.png" /></a></td>' +
' <td>|</td>' +	
		' <td><a tabindex="68" href="javascript:insertBB(\'green\','+random+');"><img src="http://cs1.divokekmeny.cz/graphic/stat/green.png" /></a></td>' +
	' <td><a tabindex="68" href="javascript:insertBB(\'yellow\','+random+');"><img src="http://cs1.divokekmeny.cz/graphic/stat/yellow.png" /></a></td>' +
	' <td><a tabindex="68" href="javascript:insertBB(\'red\','+random+');"><img src="http://cs1.divokekmeny.cz/graphic/stat/red.png" /></a></td>' +
	' <td><a tabindex="68" href="javascript:insertBB(\'blue\','+random+');"><img src="http://sk2.divoke-kmene.sk/graphic/dots/blue.png" /></a></td>' +
' <td>|</td>' +	
	' <td><a tabindex="66" href="javascript:insertBB(\'smily 1249\','+random+');"><img src="http://img.xchat.centrum.cz/images/x4/sm/49/1249.gif" /></a></td>' +
	' <td><a tabindex="67" href="javascript:insertBB(\'playmobilsoul\','+random+');"><img src="http://img361.imageshack.us/img361/9100/playmobilsoulot2.png" /></a></td>' +
' <td>|</td>' +
"</tr>   " +
' <td>|</td>' +
	' <td><a tabindex="70" href="javascript:insertBB(\'unit spear\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spear.png" /></a></td>' +
	' <td><a tabindex="71" href="javascript:insertBB(\'unit sword\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_sword.png" /></a></td>' +
	' <td><a tabindex="72" href="javascript:insertBB(\'unit axe\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_axe.png" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="73" href="javascript:insertBB(\'unit archer\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_archer.png" /></a></td>' +
	' <td><a tabindex="74" href="javascript:insertBB(\'unit scout\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spy.png" /></a></td>' +
	' <td><a tabindex="75" href="javascript:insertBB(\'unit lcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_light.png" /></a></td>' +
	' <td><a tabindex="76" href="javascript:insertBB(\'unit hcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_heavy.png" /></a></td>' +
	' <td><a tabindex="77" href="javascript:insertBB(\'unit marcher\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_marcher.png" /></a></td>' +
	' <td><a tabindex="78" href="javascript:insertBB(\'unit ram\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_ram.png" /></a></td>' +
	' <td><a tabindex="79" href="javascript:insertBB(\'unit catapult\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_catapult.png" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="82" href="javascript:insertBB(\'madera\','+random+');"><img src="http://sk4.divoke-kmene.sk/graphic/holz.png?1" /></a></td>' +
	' <td><a tabindex="83" href="javascript:insertBB(\'barro\','+random+');"><img src="http://sk4.divoke-kmene.sk/graphic/lehm.png?1" /></a></td>' +
	' <td><a tabindex="84" href="javascript:insertBB(\'hierro\','+random+');"><img src="http://sk4.divoke-kmene.sk/graphic/eisen.png?1" /></a></td>' +
	' <td><a tabindex="80" href="javascript:insertBB(\'unit paladin\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_knight.png" /></a></td>' +
' <td>|</td>' +
	' <td><a tabindex="81" href="javascript:insertBB(\'unit noble\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_snob.png" /></a></td>' +
' <td>|</td>' +
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
					case 'r':
      					txtinsertBefore = "[report]";
      					txtinsertAfter = "[/report]";
      					insertButton = 'r';
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
						
				case 'smily 1':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/1/1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 3':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/3/3.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 12':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/12/12.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 47':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/47/47.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 53':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/53/53.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 70':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/70/70.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 71':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/71/71.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 85':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/85/85.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 88':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/88/88.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 90':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/90/90.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 161':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/61/161.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 349':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/49/349.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 467':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/67/467.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 606':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/6/606.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 758':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/58/758.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 924':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/24/924.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 1631':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/31/1631.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 18':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/18/18.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 4':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/4/4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 74':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/74/74.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 43':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/43/43.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 30':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/30/30.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 141':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/41/141.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 369':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/69/369.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 447':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/47/447.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 2009':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/9/2009.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 1582':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/82/1582.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 378':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/78/378.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 1009':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/9/1009.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 465':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/65/465.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 1581':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/81/1581.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 1708':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/8/1708.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 1776':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/76/1776.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 2994':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/94/2994.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'green':
      					txtinsertBefore = "[img]http://cs1.divokekmeny.cz/graphic/stat/green.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'yellow':
      					txtinsertBefore = "[img]http://cs1.divokekmeny.cz/graphic/stat/yellow.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'red':
      					txtinsertBefore = "[img]http://cs1.divokekmeny.cz/graphic/stat/red.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'blue':
      					txtinsertBefore = "[img]http://sk2.divoke-kmene.sk/graphic/dots/blue.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 4548':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/48/4548.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 290':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/90/290.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 2830':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/30/2830.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 2772':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/72/2772.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 712':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/12/712.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 257':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/57/257.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'smily 216':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/16/216.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
						
						
															
				case 'enfadado':
      					txtinsertBefore = "[img]http://avatares.miarroba.com/src/1450838/2c8c8416.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '19';
      					break;
				case 'smily 3757':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/57/3757.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '20';
      					break;
				case 'smily 1196':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/96/1196.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '21';
      					break;
				case 'smily 1239':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/39/1239.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '22';
      					break;
				case 'smily 837':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/37/837.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '23';
					break;
				case 'smily 41':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/41/41.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '24';
					break;
				case 'smily 261':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/61/261.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '25';
					break;
				case 'smily 268':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/68/268.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '26';
					break;
				case 'smily 1067':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/67/1067.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '27';
					break;
				case 'smily 2433':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/33/2433.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '27';
					break;
				case 'smily 793':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/93/793.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '27';
					break;
					
				case 'dinero':
      					txtinsertBefore = "[img]http://img384.imageshack.us/img384/9544/sacodineroun2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '28';
					break;
				case 'info':
      					txtinsertBefore = "[img]http://www.gods-destructions.deg.cz/image/info.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '29';
					break;
				case 'alert':
      					txtinsertBefore = "[img]http://www.gods-destructions.deg.cz/image/alert.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '30'
					break;
				case 'smily 2795':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/95/2795.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '31'
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
				case 'doma041':
      					txtinsertBefore = "[img]http://www.smajlici-1.ic.cz/domov/001-050/doma041.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'doma306':
      					txtinsertBefore = "[img]http://www.smajlici-1.ic.cz/domov/301-350/doma306.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case '1maly383':
      					txtinsertBefore = "[img]http://www.smajlici-1.ic.cz/male1/351-400/1maly383.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
						
						
						
				case 'smily 4835':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/35/4835.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 2836':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/36/2836.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 2374':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/74/2374.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 2163':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/63/2163.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 2200':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/0/2200.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 2054':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/54/2054.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 1556':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/56/1556.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 1249':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/49/1249.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 909':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/9/909.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 814':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/14/814.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 338':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/38/338.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 305':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/5/305.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'smily 255':
      					txtinsertBefore = "[img]http://img.xchat.centrum.cz/images/x4/sm/55/255.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
						
						
						
						
						
						
				case 'Black':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '52';
      					break;
				case 'DarkRed':
      					txtinsertBefore = "[color=darkred]";
      					txtinsertAfter = "[/color]";
      					insertButton = '53';
      					break;
				case 'SaddleBrown':
      					txtinsertBefore = "[color=saddlebrown]";
      					txtinsertAfter = "[/color]";
      					insertButton = '54';
      					break;
				case 'IndianRed':
      					txtinsertBefore = "[color=indianred]";
      					txtinsertAfter = "[/color]";
      					insertButton = '55';
      					break;
				case 'Chocolate':
      					txtinsertBefore = "[color=chocolate]";
      					txtinsertAfter = "[/color]";
      					insertButton = '56';
      					break;
				case 'Peru':
      					txtinsertBefore = "[color=peru]";
      					txtinsertAfter = "[/color]";
      					insertButton = '57';
      					break;
				case 'DarkGoldenrod':
      					txtinsertBefore = "[color=darkgoldenrod]";
      					txtinsertAfter = "[/color]";
      					insertButton = '58';
      					break;
				case 'BurlyWood':
      					txtinsertBefore = "[color=burlywood]";
      					txtinsertAfter = "[/color]";
      					insertButton = '59';
      					break;
				case 'Pink':
      					txtinsertBefore = "[color=pink]";
      					txtinsertAfter = "[/color]";
      					insertButton = '60';
      					break;
				case 'Orchid':
      					txtinsertBefore = "[color=orchid]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'MediumOrchid':
      					txtinsertBefore = "[color=mediumorchid]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Blue':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'MediumSlateBlue':
      					txtinsertBefore = "[color=mediumslateblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'BlueViolet':
      					txtinsertBefore = "[color=blueviolet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Magenta':
      					txtinsertBefore = "[color=magenta]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'DeepPink':
      					txtinsertBefore = "[color=deeppink]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Red':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'OrangeRed':
      					txtinsertBefore = "[color=orangered]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'LightCoral':
      					txtinsertBefore = "[color=lightcoral]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'DarkOrange':
      					txtinsertBefore = "[color=darkorange]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Gold':
      					txtinsertBefore = "[color=gold]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Yellow':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'MediumSpringGreen':
      					txtinsertBefore = "[color=mediumspringgreen]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Lime':
      					txtinsertBefore = "[color=lime]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'YellowGreen':
      					txtinsertBefore = "[color=yellowgreen]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'DarkKhaki':
      					txtinsertBefore = "[color=darkkhaki]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'DarkSeaGreen':
      					txtinsertBefore = "[color=darkseagreen]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Teal':
      					txtinsertBefore = "[color=teal]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'DarkSlateGray':
      					txtinsertBefore = "[color=darkslategray]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'DeepSkyBlue':
      					txtinsertBefore = "[color=deepskyblue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Turquoise':
      					txtinsertBefore = "[color=turquoise]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Aqua':
      					txtinsertBefore = "[color=aqua]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'SlateGray':
      					txtinsertBefore = "[color=slategray]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'Silver':
      					txtinsertBefore = "[color=silver]";
      					txtinsertAfter = "[/color]";
      					insertButton = '61';
      					break;
				case 'White':
      					txtinsertBefore = "[color=white]";
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