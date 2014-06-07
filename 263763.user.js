// Crypteia Light user script
// 30-12-2013
// Copyright (c) 2013, Δαίμων
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, Crypteia script you need Greasemonkey: https://addons.mozilla.org/el/firefox/addon/greasemonkey/
// Then restart Firefox and revisit this script.
//
// To Remove / Disable, go to Greasemonkey icon -> Manage User Scripts,
// select "Crypteia", and click Remove to uninstall script
// select "Crypteia", and click Disable to disable script
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// What Crypteia means?
// Crypteia - Wikipedia: http://en.wikipedia.org/wiki/Crypteia
// Κρυπτεία - Βικιπαίδεια: http://el.wikipedia.org/wiki/Κρυπτεία
//
// ==UserScript==
// @name 			     Crypteia Light
// @version		         0.4
// @description    	     Sound system for Ikariam v0.5x by Δαίμων. ONLY ADVISORS 
// @original_author	     Δαίμων Velo, Corinth
// @icon 		         http://crypteia.cyborgon.com/images/Crypteia(R).png
// @namespace      	     http://crypteia.cyborgon.com/
// @copyright  		     2013+

// @include       	     http://*.ikariam.*/
// @include       	     http://*.ikariam.*/index.php
// @include       	     http://s*.ikariam.*/*
// @exclude              http://board.*.ikariam.*/*
// @exclude		         http://*.ikariam.*/board
// @exclude 	         http://support.ikariam.*/*
// 
// @require         	 https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
//
// @require     	     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     	     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @resource    	     jqUI_CSS  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css
// @resource    	     IconSet1  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_222222_256x240.png
// @resource    	     IconSet2  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_454545_256x240.png
//
// @downloadURL          http://crypteia.cyborgon.com/Crypteia.user.js (needs to be https to work)
// @updateURL            http://crypteia.cyborgon.com/Crypteia.meta.js (needs to be https to work)
// ==/UserScript==

//.....................................................................................
//............................................................................[GLOBALS]
//.....................................................................................
var server = document.domain.split (".")[0];
// scriptDebugOutput: True to send output to console.log false to hide console.log messages
var scriptDebugOutput = false;
// Script name and version
var scriptName    = GM_info.script.name;
var scriptVersion = GM_info.script.version;
// if scriptVersion contains word "beta", displays the word beta! next to Configuration icon version.
if ((scriptVersion.indexOf("beta") >= 0)) {
	// Remove word beta from scriptVersion
	scriptVersion = scriptVersion.replace(' beta','');
	// Add beta! to betaText for showing later on configuration title
	var betaText = "beta!";
} else {
	var betaText = "";
}
// Graphics URL
var GRAPHICS_URL= "http://crypteia.cyborgon.com/images/";

// Sound URL & default Sound variables values// Sound URL & default Sound variables values
var SOUNDS_URL= "http://crypteia.cyborgon.com/sounds/";

//.......................................................................................
//............................................................................[GM CONFIG]
//.......................................................................................
var Crypteia = new GM_configStruct({
	  'id': 'MyConfig', 
	  'fields': {
	  		// SOUND SECTION
			'sndMode': {'label': '', 'type': 'select', 'options': ['Disabled', 'Default', 'War', 'Loud'], 'default': 'Default'},
	  		// Advisors
			'Mayor_SND_vol': {'label': '', 'type': 'int', 'default': 15},
			'Military_SND_vol': {'label': '', 'type': 'int', 'default': 90},
			'Research_SND_vol': {'label': '', 'type': 'int', 'default': 15},
			'Diplomacy_SND_vol': {'label': '', 'type': 'int', 'default': 15}
  	  }
});

// Sounds modes
function SETsndMode( mode ) {
	mode = mode || 'Default';
	rValue = false;
	// Disabled Mode
	if (mode == 'Disabled') {
		// Advisors
		Crypteia.set('Mayor_SND_vol', 0);
		Crypteia.set('Military_SND_vol', 0);
		Crypteia.set('Research_SND_vol', 0);
		Crypteia.set('Diplomacy_SND_vol', 0);
		// save Mode			
		Crypteia.save();
		rValue = true;		
	}
	// Default Mode
	if (mode == 'Default') {
		// Advisors
		Crypteia.set('Mayor_SND_vol', 15);
		Crypteia.set('Military_SND_vol', 90);
		Crypteia.set('Research_SND_vol', 15);
		Crypteia.set('Diplomacy_SND_vol', 15);
		// save Mode			
		Crypteia.save();
		rValue = true;		
	}
	// War Mode
	if (mode == 'War') {
		// Advisors
		Crypteia.set('Mayor_SND_vol', 0);
		Crypteia.set('Military_SND_vol', 90);
		Crypteia.set('Research_SND_vol', 0);
		Crypteia.set('Diplomacy_SND_vol', 15);
		// save Mode			
		Crypteia.save();
		rValue = true;		
	}
	// Loud Mode
	if (mode == 'Loud') {
		// Advisors
		Crypteia.set('Mayor_SND_vol', 30);
		Crypteia.set('Military_SND_vol', 90);
		Crypteia.set('Research_SND_vol', 50);
		Crypteia.set('Diplomacy_SND_vol', 30);
		// save Mode			
		Crypteia.save();
		rValue = true;		
	}
	//alert( "All values set to new mode: "+mode );
	return rValue;
};

// Kill any previous audio left open
$('audio').each(function(){
    this.pause(); 			// Stop playing
    this.currentTime = 0; 	// Reset time
});

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//.......................................................................................
//........................................................................[JQUERY-UI-CSS]
//.......................................................................................
var iconSet1    	= GM_getResourceURL ("IconSet1");
var iconSet2    	= GM_getResourceURL ("IconSet2");
var jqUI_CssSrc 	= GM_getResourceText ("jqUI_CSS");
jqUI_CssSrc     	= jqUI_CssSrc.replace (/url\(images\/ui\-bg_.*00\.png\)/g, "");
jqUI_CssSrc     	= jqUI_CssSrc.replace (/images\/ui-icons_222222_256x240\.png/g, iconSet1);
jqUI_CssSrc     	= jqUI_CssSrc.replace (/images\/ui-icons_454545_256x240\.png/g, iconSet2);

GM_addStyle (jqUI_CssSrc);

//.......................................................................................
//......................................................................[Jquery-UI staff]
//.......................................................................................
$(function() {

   //All sounds enabled  
    $( "#All_SND_Radio" ).buttonset();
   });
  
  $(function() {
	//...ADVISORS
	/////////////////////////////////////////////
	//Mayor
	/////////////////////////////////////////////
    $( "#Mayor_SND_slider" ).slider({
      range: "max",
      min: 0,
      max: 100,
	  slide : function(event, ui) {
            slider.slider("option", "animate", "fast");
        },
      value: Crypteia.get('Mayor_SND_vol'), //set volume default value
      slide: function( event, ui ) {
        $( "#Mayor_SND_vol" ).val( ui.value );
      }
    });
    $( "#Mayor_SND_vol" ).val( $( "#Mayor_SND_slider" ).slider( "value" ) );
    
	/////////////////////////////////////////////
    // Military
	/////////////////////////////////////////////
    $( "#Military_SND_slider" ).slider({
      range: "max",
      min: 0,
      max: 100,
	  slide : function(event, ui) {
            slider.slider("option", "animate", "fast");
        },
      value: Crypteia.get('Military_SND_vol'), //set volume default value,
      slide: function( event, ui ) {
        $( "#Military_SND_vol" ).val( ui.value );
      }
    });
	
	/////////////////////////////////////////////
	// Research
	/////////////////////////////////////////////
    $( "#Research_SND_slider" ).slider({
      range: "max",
      min: 0,
      max: 100,
	  slide : function(event, ui) {
            slider.slider("option", "animate", "fast");
        },
      value: Crypteia.get('Research_SND_vol'), //set volume default value,
      slide: function( event, ui ) {
        $( "#Research_SND_vol" ).val( ui.value );
      }
    });
    $( "#Research_SND_vol" ).val( $( "#Research_SND_slider" ).slider( "value" ) );
    
	/////////////////////////////////////////////
  	// Diplomacy
	/////////////////////////////////////////////
  	$( "#Diplomacy_SND_slider" ).slider({
      range: "max",
      min: 0,
      max: 100,
	  slide : function(event, ui) {
            slider.slider("option", "animate", "fast");
        },
      value: Crypteia.get('Diplomacy_SND_vol'), //set volume default value
      slide: function( event, ui ) {
        $( "#Diplomacy_SND_vol" ).val( ui.value );
      }
    });
    $( "#Diplomacy_SND_vol" ).val( $( "#Diplomacy_SND_slider" ).slider( "value" ) );
	
    /////////////////////////others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    $( "#radio" ).buttonset();
	
	// jquery Dialog
    $( "#dialog-form" ).dialog({ 
      autoOpen: false,
      height: 700,
      width: 640,
	  resizable : false,
      modal: true,
	  open: function(event, ui) {
			// Advisors
			$("#Mayor_SND_vol").val(Crypteia.get('Mayor_SND_vol'));
			$("#Mayor_SND_slider").slider("value", Crypteia.get('Mayor_SND_vol'));			
            $("#Military_SND_vol").val(Crypteia.get('Military_SND_vol'));
			$("#Military_SND_slider").slider("value", Crypteia.get('Military_SND_vol'));
			$("#Research_SND_vol").val(Crypteia.get('Research_SND_vol'));
			$("#Research_SND_slider").slider("value", Crypteia.get('Research_SND_vol'));
			$("#Diplomacy_SND_vol").val(Crypteia.get('Diplomacy_SND_vol'));
			$("#Diplomacy_SND_slider").slider("value", Crypteia.get('Diplomacy_SND_vol'));			 		
      },
      buttons: {		
			"Save changes": function() {
				  var bValid = true;
				  //allFields.removeClass( "ui-state-error" );
				  if ( bValid ) {
						//before dialog close set variables first
						//...Advisors
						Crypteia.set('Mayor_SND_vol',    $("#Mayor_SND_vol").val());
						Crypteia.set('Military_SND_vol', $("#Military_SND_vol").val());
						if (Crypteia.get('Military_SND_vol') > 0) {
							$("#CrypteiaMilitarySoundIMG.MilitarySound").prop('src', GRAPHICS_URL+'MilitarySound-enabled.png');
							$("#CrypteiaMilitarySoundIMG.MilitarySound").prop('title', 'Disable General Sound');
							$("#CrypteiaMilitarySoundIMG.MilitarySound").toggleClass("on")
						} else {
							$("#CrypteiaMilitarySoundIMG.MilitarySound").prop('src', GRAPHICS_URL+'MilitarySound-disabled.png');
							$("#CrypteiaMilitarySoundIMG.MilitarySound").prop('title', 'Enable General Sound');	
							$("#CrypteiaMilitarySoundIMG.MilitarySound").toggleClass("on")
						}
						Crypteia.set('Research_SND_vol', $("#Research_SND_vol").val());
						Crypteia.set('Diplomacy_SND_vol', $("#Diplomacy_SND_vol").val());
													
						// save changes			
						Crypteia.save();
						
						//close dialog
						$( this ).dialog( "close" ); 
						
				  }
			},
			Cancel: function(event, ui) {
            	$(this).dialog('close');
        	} 
	  },
      close: function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });	
	
}); 
    
//.......................................................................................
//........................................................................[CONFIGURATION]
//.......................................................................................
//Configuration CSS
addGlobalStyle(
    '** Crypteia CSS Document 2013-12-13 - Copyright (c) 2013 ***\\'+    
	'input.text { margin-bottom:12px; width:95%; padding: .4em; }'+
	'fieldset { padding:0; border:0; margin-top:25px; }'+
	'h1 { font-size: 1.2em; margin: .6em 0; }'+
	'.ui-dialog .ui-state-error { padding: .3em; }'+
	'.validateTips { border: 1px solid transparent; padding: 0.3em; }'+
	'.ui-dialog {background-image: url(\''+GRAPHICS_URL+'cnfg_dialog_bg.png\') !important;background-repeat: repeat;background: transparent;}'+
	'.ui-widget-overlay {'+
		'opacity: 0.1 !important;'+ // Must change both of these, as IE only sees the second one
  		'filter: Alpha(Opacity=50) !important;'+
  		'background-color: rgb(50, 50, 50) !important;}'+ // This will make it darker 
    '.ui-dialog .ui-dialog-titlebar{font-size: 14px; color:#000; background-color:#FC0;height: 28px;}'+
    '.ui-widget-content{border:none;}'+	
	'.ui-slider-horizontal {'+
	'	background: #5e9ae2;'+ /* Old browsers */
	'	background: -moz-linear-gradient(left, #FFFF80 0%, #E60000 100%) !important;'+ /* FireFox 3.6+ */
	'	background: -webkit-gradient(linear, left top, right top, color-stop(0%,#FFFF80), color-stop(100%,#E60000));'+ /* Chrome, Safari 4+ */
	'	background: -webkit-linear-gradient(left, #FFFF80 0%,#E60000 100%);'+ /* Chrome 10+, Safari 5.1+ */
	'	background: -o-linear-gradient(left, #FFFF80 0%,#E60000 100%);'+ /* Opera 11.10+ */
	'	background: -ms-linear-gradient(left, #FFFF80 0%,#E60000 100%);'+ /* IE 10+ */
	'	background: linear-gradient(left, #FFFF80 0%,#E60000 100%);'+ /* W3C */
	'	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=’#FFFF80’, endColorstr=’#E60000′,GradientType=1 );} '+/* IE 6-9 */
	'.ui-button .ui-button-text {line-height: 1.0;}'+
	'.ui-slider.ui-widget-content  { border: 1px solid #959595 !important; background-color: #fff;}'+
	'#cnfg_CrypteiaSectionHeader {color:#FFC266; width:93%; height:24px; line-height:24px; border:2px solid #000; padding:3px 20px;'+
	'	 background-color: #101000; opacity: 0.9; margin-left:auto; margin-right:auto;}'+	
	'#cnfg_CrypteiaSubSectionHeader {color:#FFF; width:530px; height:9px; line-height:9px; border:2px solid #000; padding:10px 30px;'+
	'	 border-radius:10px;background-color: #272727; opacity: 0.7; margin-left:auto; margin-right:auto;}'+
	'#cnfg_CrypteiaSubSectionElement {width: 98%; height: 42px; text-align: justify; -ms-text-justify: distribute-all-lines; text-justify: distribute-all-lines; position: absolute;}'+
	'.cnfg_CrypteiaSubSectionElementTitle {width: 40%; height: 24px; margin-left: 1%; position: absolute;}'+
	'.cnfg_CrypteiaSubSectionElementValue {width: 15%; height: 24px; position: absolute; left:30%; margin-right: 0px;}'+
	'.cnfg_CrypteiaSubSectionElementAction {width: 40%; height: 14px; margin-right: 1%; margin-top: 0.75%; position: absolute; left:44%; }'+
	'.cnfg_CrypteiaSubSectionElementInputStyle {background-color:transparent; color:red; width: 30px; border:none; }'+
	'.cnfg_CrypteiaSubSectionElementXtra {width: 7.50%; height: 24px; margin-right: 20px; margin-top:-8px; float: right;}'+
	'.cnfg_CrypteiaSubSectionElementLoopStyle {}'+
	'.cnfg_CrypteiaSubSectionElementLoopImgStyle {width: 17px; height: 19px; margin-top: 4px;}'+
	'.stretch {width: 100%;display: inline-block;font-size: 0; line-height: 0;}'+
	//
	'.CrypteiaMilitarySoundIcon {width: 20px; height: 20px; top: 60px; left: 10px; cursor:pointer; background-color: #FFFFFF;'+
	'	border:1px solid #666666; position: absolute; -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; z-index: 999;}'+
	'.MilitarySound {cursor: pointer;position: absolute; top: 0px; left: 0px; width: 20px; height: 20px;}'+
	'#cnfg_CrypteiaMessenger {font-size: 10px; color: red; left: 10px; bottom: 6px; position: absolute;}'+
	'#cnfg_CrypteiaSpacer {width:100%; height:30px; }'	
);

var cnfgLogo = document.createElement('img');
cnfgLogo.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAhEAYAAACejMeZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAGodJREFUeNqMeWtclNXa%2FvU888wwDDAMRxEQR1REJEJEQiRUIiNCRSVlk6cQT0TmgYxtZki8qERIpGwPRHiIkJDQkBDZhEhIiIiICIgIiDCchmFgDsw886z%2FB2v3f0%2B%2Fd99frt9vfVnXta573Wute1HYh38v2D%2FQ9A9Mfgm8BPokfRKY3zW%2FaX4TMD9n%2FuD8QWmXSZ1JrkluRP4L9Nn12S17OCCVXZBdcGscrR4tGC0wj1EXqLJV2dBN1k16TXqNToz7jc8an9WUpQwYLxovKvqA5ANAbhzsAUAD8h0hhPxv5HgZbXlteW15Et%2Fx0PHQ8dARnxbLFssWS0BcKi4VlwLzG%2BY3zG8A8OOvMV0A1bQtfFosQF3yHwYAqnD1WYta5iBPmP1m5EE6inbG7v8s9M%2FgK%2FnufHda5Fo9p2hOUcoN57IZ6hlqfbcoVdgr7P2T4v%2BNlPVL5B1%2BicaVvKVUqGoOdQwAdgQ%2FfvD4weMHQDtpJ%2B0E6O3v7e%2FtB9o3tm9s32jjuT5s%2Fcr1offe%2FdA6lo2tP%2FfPqLio7VErt8ZdOXHlxJUTkmL1%2B993A9jAGAlErgB1VlBuEgJgWJAM8IIwTJkKZvG0aDGUG20iptBhIZIBuOLCH0pzAMBOTNaw5Wx56Sut5W12bXavLv%2Bva%2B%2B41DrFsnw8yMVjbtqMHhOpuFFSQoNs16sV9t2HYd9i%2ByRc5Uo19S8fKZyUU%2F76NL0t20CJdf6GSlIsaqU9AOA05i2e%2B%2BrcV5d6%2FHD98q3Lt%2F728Pqp66eunwImqieqJ6ottjwzfSZ6JnJYqxVq7bX%2BZs38RH4HX7bwt6JNRVFF0Tte9D1aGJgxO%2F5rRrRuzv31HNnied3kPumhNjELGodfXCJlD9O67Xo9UNL4Zmuw4jSpQAEwBgBLAUCgpL0B4M5RkkvsiJ00mSmhDlDuI9KY5SHiJXmqzM17Dy7Zb%2BMU4uHn5y%2FaYFaOQ6qbN38BlOH9qu50QFgp%2BMVzEyC6bvX9sz1wrOX%2BObXLDUj3OuU8LgTuMPej5S0AUypaaa8G7AsdvBy8Ipr%2Btnf9kvVLzA5ou3VWOqvQL1NjUmNSY1w2GV00umh08fa0dx%2B9%2B%2BTdgSvTR8ZHNCPaOeFZfll%2BWX4fLjM4Gc4bnBZsYXgB5rZeegRSyvF5z1mi66s3mxjOxSbjoHGhppY0nDrYWDxWQhT%2FsqwdAHIf000AIE2eGSQJN6u9s7zivcqtRQZ3pb38VZfAeVYhyACU%2BwBgYLfVCFAtSj3PMsBDiQyvrQPOjd%2Fnj0YCbttm9pv3AfZq8zNTEoHDbevPWEcDQ8Nv64elQPmDu57OcUB1Qa8nmze5jvZGPda8ky9oEIwIRj5%2B81z7ufZz7X010gpphbSi%2F%2BBq8WrxanHep%2B6rp160dUDSwuRgv3fKXJ46VTuVOeXRWjrs7W3Pk78jyv1DRwwXy4iW221Q6y%2BRrtsuw2JtDlEw0Uw2swcwDjO%2BYBwtXi7ZaS4Uc2t9JL2CFD59YeedvfefeEcvKrOXv%2BrSWWAm%2F1eJ69LHjLVAC5jH2MdDyyvUZQDQksJO5n4qtNpZWpm6E9Dl6Q4J8sGZTwrqzALBeXy9%2FcTdOoAuNBEsXwd207b9%2FNESYGqRcOfkoFF%2BUEQQF1Tdu2dBuxfnxaW8mbs%2Fd3%2Fu%2Fh1tMx%2FOfDjz4ZDDn768EjPb39YRdtJpUmNpf7%2FjzM%2BcNzo7kEwYvuppuzyF8q79vXjeMRvsnN4lnTV9DzBt0MlpWgLAFPJNmTXAx9Yfx8TJiha8Xv56zuvZXz7p%2ByLnqm9G5jxCnk0BCCFXHxol7Sd%2FxTy9ye2LhBCi%2BJCvI2Tg6ecnAUIKflieDxCS%2FPO7B6ZZE%2FLV5jhmTQshMptDayiGkPsf%2FD3FT03IsVtRynfdCRmZee6xWSshF37Pvhzt%2Fr8XvQdvPXjrwVtLC%2FNs8mzybFYV7qrZVbmr5LDnKu9Vs1YJK04Vz%2Fx54Of9G8MoQgb%2FXrSYhyqnqtTGaiL%2Frapm4NERsufcZJFlfS658MmSAzs%2B%2Fvbz8jGnMW58nYtqNXP3m1u%2FbqPsOrfM7Mx89shMVn%2BhNcP2AKlbveWzHOio4ulF818FuGiDoOIqQALMpAFtAK%2BrP%2BDKbYCNu%2BNzuRdoj%2B2QAcBPJf1Tlp2E4PW6GZfFEeCm%2BbKtozJwBe5dn2rywAh9hR78GqD9%2BsQFfgPodfcCR%2Fi%2BwHeLch8ZFA83rLy69cbuufwSWYUsu3%2FluX%2FserLreszqr9b%2F1%2BJZ%2F039J%2FXLvPaDPHpOLt%2BghdX7C2ckmtBZR0b2CtdWUsnxufH74oMufyr%2FTf7a6D1CVrSvOLuiYlNe%2F4wqh2PvSGq1109%2B4p2kHyVkwW6AEDL36EOAEMO3j34yqyPEcF312ftZhLAaQor2EkLIb%2FNfsyRkcl7mKwAhg7xzy6aWEZL62Qf7FogJCWoKWvpGJiFh7DIvv9D%2F7uBnrVG9%2FjJCRjd%2BlAoQor6fcsbs9JjZR3U71NvE%2Bx3bnrcdbV9FSERQxPKIwIeaBcULihdce7BjX%2FG%2Bwn2XPuP07%2BieTk4a1TAIpTooW3CUjAqi%2FHCJJ6W30ZUQdyzusO%2Fg6K%2B%2FcPwi4YvbwIBy0G3Ac8CPUVh7WNJcDfI7pmic1EcREspMjRYXoGVLx7t9YGnYhb12FGADOEdZNEAVg31oA2CYlI8tBrRqkzJXP9B2U9%2F%2FuN0HAu4L7td%2BJUDdoHyoHKBh45kfg9dBF%2FteaPpbh0Gbl%2FYfHQkCvLaaTDSZgtUkTbQgEHTf4D3H8Z1iZYCTQ%2F7AnrcDqlbeSrt1BLC0sJxucWU0JMMowyjD%2BM0htVptUJNJminmOwsEAI0LdD0vkmuk4uk0XiRprOQ%2FiJeHOCpt621bbRNmhuQP%2F7jhctqGDyZ3Th7UBNxwEmQpw%2ByqAaOc4BMOK8E8d7f5hM4B85P4qrNqHxhAX%2BQzCIapor3fqQTD%2BYPZ6wkG%2BfOUbweDoTItM8yGwXBCTsgJAXGvuFIcDOyKjUxeFAxu1%2BjJB7%2FYg86Z%2FOec8ihAl2L5Q3sgABlJU5qCMVk6fT2lBD1WOlNKuwGzq4RJd7eb1KYcTx09%2Fvj8pVHpqJciyuASM%2FDB3pixyeZVR1Z9tGorMLqniT3jCtDwpwV0JHW26NbtuYM8G7cP139o2P0i%2F%2FHTvA6vpzWp%2Bxfl%2B8Yv8rzCrkhcqVsxeKjZXvNG2%2FrRLy7faqiLmPShuF0PYjUvWODi5jjybRCYnzJev%2Bf9DRhyTBH%2FVACGHwmYOIHR1bTi%2BXYwoiBDWGsS6B9fnLm1fh3glm69zioB%2BM31pvJRO%2BhJ564u03owsrSypaJkMN9%2BfuQ9o31gHvgPrBMvB8NVM9kkHUzpwadSWk6yZJlM67KMwaTXEn3yff22bBTqhMPCrJZ1G3%2Fd8Hzjme9tZlY4F89yFCQYqkgEbQ3QAFVFJ1Gho36KDWN%2BTu1j9qN5CsmDibEyZYgyvajjxLMToyf6%2BzXsNT1jCPpinmqDKk2D3YV7u09fbTXlDyp7zTsEfUDS9BPdMelgP%2F7s9yRVFdgj7yeeyjjz8gY%2BKAAr8FOnj%2BwG%2B0yqlEqzwN7sLjF5MQzWwdmxwroHrKjCM2hRE9iF3qEBYaZgw2YHSjwjwMpsJ0VaLdgXzf2VdoFgS0KbTWALfGpzOZCVUdFdntNWLOGtPLD7vY%2F27p5d%2FbS69HZWddoHb3jUuVd6lDNVx6njF48%2FCaThBms0AAxA%2B%2FDlVJTHqZl%2BFp8%2FzJGtlCUM3Jx9b0nSkriAxKEgxxzHEMdtIr%2Fej3pP9b7xV9VzOeszyz0Lcdqyu1H31oC94XCvpfsa2GHZ7CzPeOCu%2FwNa2wDIr4x7PL4MaDOnxywIBsqbStff8AWMT6gHFf6AEYyi%2BJsAFRTyiTBg2nyfS05CgGTOSuBSgAiF30V9HLDQUyrubQV%2Bcr16GPWg8fLEpTuHOp93mgPhHeFseNli5%2Bh7277bFnDjza7GruauClVav59M1Ff8%2FKpPj2OBvQucGUToDql7iaTEquL3RpGt7xsTb%2FqH2Ae%2BM5k%2BeXryNDA0d3jj0FVwSoHyjBLI%2FENvbIBm9vJJO6OUzcYp%2Fzj%2BGGF39jU81qiAXyzCpEIbwLKaTVa%2FAdQ35WwvuAm0VakOjY0BExFDnIUtMH2JQxWVCoA30jvuBiwLVC%2FvzwJi5nq%2B%2F8AFsIySRI7bAUC3s0AKKD3vztDGALZOUzqxEzQAOwAYtB10GTQFhuKH5g%2FHAVOsp%2FhPcVxeNuY6lq4IBqrPV49Xfr9vZuzq1T%2F97Ry2M2ynllPFkc6m%2BhbTtlc2Bjt2ShfMuom7yj1jq8cSgdFo%2Bc%2FycdBKvvKnsR2QAgCkgFF%2BR2u1PVVjYmt9LOQeYGbnaCkNBTyKLV14tYAgzCp9Whcwpzd4p8spwHfLldbSy8DTJrO1zoPAraoHC7sOAsIBYZ3RacDhvOuGqXVAj0%2BbUCUFaG7ozngNIGS77%2BgaALq%2B24W2BMwS157nAODnlyvfn9mfJjsMKJ8pbyunAN0xXT5dqYD%2Bb%2BwK%2FUPgsXer9knney60nHaiIo%2BV0sJns89subo%2Blz3AprENn632vuht5fUEsOud6jblANAc2uzTHI8qbaA2YDIIoX%2BmtFmw2Mv0IADwCg0tQOPJsq%2BvTAHenlz09nozIMntw7UHLYA77JVj5QSoL%2B7p6OeANm3v8xEO6N02Eq%2FJAO7tfHpsKAMYXKK0nJABJKfrij4aEBbSNQAgFAiD4AuIwo12klzAXCkeRvpfW2vQadB9wBYYkgw5DylRN%2FYP5c%2FKjwGzN8wWm80HrGOtS6xjlrxDWVJ9WIli2tDJOZGcEMLmsLX67cKDTy92Hu%2FYBujT9OXsdmCgYiBvoBxNqjCVjyrsr4lE3vxww3YAGCuxkwMtbXdDR2hgSKu3BIAw5fr1IZ3A7ehb21qygYP69A9Ky4HKE4093VWANl%2FrqgkBbLebJRj1AeI24UFRGGC1HMWMGOA3qhQAYIhR9YEGDJ28OJIOmIbyLtAVAARgALBj8jFG0QX0%2Bb7wfOGHes6HizPIwDoKnaLtQwDzCfME84NWSaTSIDUkE08ahShFvaZvRDdSLF8DpAwfT0stB1ozHju3ugFslKGAtYVMW6It0db8%2Fw9dg0AjBUiKIIgsBUsCx6IUhYBNtigFHMCGG7uYvApERO54e9UosOj0XIVdDCB9YhslLgWsCyy6zDYBA%2FVyN4UQEDQY0ngsIKxhao1WAvBSpwCAwVsrBgAI0QMG4FlTCeQ0QOmghi0S1CI1NBJA0TtmN1qEzsGWwaShIKhjluz6InYuUN9Qn1s%2Fy4jVq%2FWJbBXJoJndPCHte3YaXOAMO1ncn3qoeqqZqgPb%2F37%2FCtlm1Op0uh7dBFjQoAFwXKOBFqSA0wYPy7rvgJWkTugG88GalNnY2x0D%2BxV13OHiENh215bSkSqwoW9HHY8Ugh19XZM8mQv2ufVA6VgfWH2Axk03CyzvgrBHsAcsbWksZ2zBklbtMAAWGVwQasBiOe1BlYGlymwEAkewKKE2gMPpScdJ0aQr2BfmL8z6rNDHFXOlhkL0jFkr4sZ6wKrcVUp1Os8VofRKXgQ8af3Yc5MrX97zp1qpPCro8IN%2FtbD2GeLZWDCKdkXjaCuqWTnbyQIMOHAAaKpSEmV%2FGrS2q18o%2FAGMPGXw5GgYmFl2LnL7ADAzT9v0majBtG%2BpG7q7HszjwzXP6%2BVg6HRdpKYKjKPUpsFMAsbBWtRKV4ExSTU%2FYNEHxlgu%2Bc44EAx0tBgAw4RSNbAFQ1fTieQgGCZTUknXgaFrKAl0hGXl%2BkbWHsxw2LDX8AGSYLhmqDBcguMfMhhswRr4D%2FvT1bxM3hZE02BJENeKQ1%2BtPVy22SP7LPJxErtL%2B7g8Qz6XBUxkjZ%2BdKEeIYbthpeHYXxmtTxKBnwUYNog6pkeB0VQaWiddwZglWbSYFIJZtXfZV56pYEKGI%2FXrxsBMW%2BrxeHY9GLZVrzakgumge71HU8H0F8gPjNuC0bdSLsJyMAJ3M4WJKRjE0WsAMCrQPhgEwykNZfACQ4kM9XQegDL4QAKajTJ4sqcBRd5ooqKFVLOB7ErWG5I%2FeRrtFCQxirTz%2FFq%2BgEnDHobiOzis1WPN7bs%2Fff8fbaQhQbR78ZrrK9yKkqrSOmu%2FV6oOqbxVl9YVUrlUPtXwl2DL8Klv85sB%2BUn6eu8NsDOmD8dww4DkwsRu1R7A5prTT7a5wHSFd8KqLEAKbyzOAN7Z7j5odRNINTtjUfoD0DbR6vysGSDbGWd9IMA3tfrSqB0Y2sJ%2BCABjIlINBSAOZSogASQd0m7BHjAGPjdVlUplkyruGikHxr3G7cdX0lHCQGGIKBBAGkRY987j27fy7sRbljqTCq7eEAZ75g%2F%2B%2B0TxQgG%2FmvMyszfrNaaR2nOqx%2Bu5%2F9ZGsxpxtGmBZL5JoEmNiWOA%2FTKn6Zywk%2BlcvDRkqwfH1LXEaKpf3AJrIfK%2FPzULmKzX7tbnAJ1x3QefLwWsqmuzT3wCcOnqNN2XgC5J266WA%2FMzXBztNgD3Sx9%2BatMHCD43%2BdRCCRDO%2FJDKEhiqhQ0AjFryyvmegFG1XbYegCC8STXqCG7Zw0U%2FGCeOxd4Pbk0QRJqHKe3H7calyOlT9AXKFFvf%2BF1TcOLwyZuR1FI6DlHGtYZI1t9wSRXL%2B0OwJI%2B6Oqfahnogmmdx0vTvML%2BX0fBdm4muW%2FSb6LGo7VLvJz2jf3%2Bea1r7mf0HOSC%2BfqZFq25tzOc5jiSM%2FqYpBfPIr3Pf5GYwzIQN38EejObMQPCAJZgXeLKomwbz5Isn%2Fi%2BSwDRvbjOWxYEZWj26U%2FsOGPF54%2FX0UTAOoS6fLxgAM2NYKlGHg1HeelH2sBiM8hWDgVOAIbsk%2B2kODFtsav6hCrzooKNbfzkg3Ofs4Gg0%2BBvQ9Pxq0a2uz79e%2FtzBZHBK6dGd50%2BN3flusDlqYbj89WKzUGMp34k6r8n80%2BFWZedEkqaVqrqcWYCq7fzKb9oCTN3d5vZEwWdiIObsQq2z%2F5w1HQvFIlP3FWtnwpsrM2TIZkOrM5X3PlICvEGtcjIQMA4waTL2BRRlqkv8RIDXzMvjTgJOx%2Bz%2BaTEMSNxIKykEkAsNOOB370HPwTigfvPTXaMbgLXpsV%2B6fAQMVRQtAIDmOKHIsROI8P9IFZgJWOfO3mfV%2FZJ0YReEKokuQNMH9PMmb%2Bjaj3ynmDAPwdkj2NYeInLw2vW16VsiY3Hn6WqzZos9kmaA%2Bc%2BNEO6Pdrte1nNKNDHu4dspnB7zXrTvQmNja%2Bn2I5sBKp5q5qcCxNoQniaFsFV4K7E0FOj6dcg1cDsw56iJfJwDrNqnyO1cgDsf3ct5mAIUJf%2Be32UL2NtZbTfRAZqpk%2FvZAqBKdm9PRzIgOe0wwcmA6U9Selx4wK7nJ9YCwPtVsf4%2BlkDs1Nm3mZyX7E5UvkT33YAqUTZvzBeQvM42aDoAUZHNhHXURO0bVODmVUm9gXM%2FWH51nxweHVurEtIi%2Fo0flqvUpTNJM7589GJbLzXkQAh5Rp6pTxDCfqNe0TiVEOXmCZv3ioim4NE5w64Wookre2vCq4lozvPjtoRuJ5qjP%2BzoCcklGpzESZwkGr4QzWgmGstN1ARSiMa6z2gWv4kQrMEarCGEVtAKWkGIc76kafpZom%2B%2F2rhsdgbREEKIX%2FhLLDjyEr%2FmE%2F0B2dbTvpGEfOL2buarvoOq79ceu%2FMuM0tu5Gfka%2BQHIAMZyADu8q98fVAOUP%2FmzxL6vng8O%2FfNC9%2Fcz7iV%2BM%2FFG2PFzCzFhpvA4rplm35tAyhHWjR1BtAe8lgx%2FxrwoqrBs3oLgB51%2BGA%2FcHJR1tTCS0ChpC6%2FIxrAIAYxCMAUpjAF5kQ72qICiJqxtScQgHsR71srN8BdtC3sphSwsBbZkxIgvzf5iAsLhGj3LBixBArcz%2FpJaWBz%2FHs%2Bh94PIC7%2Fsdjsb5tv04oSRYciAZiMmIycjADum1%2Bb8znz31Ia6JhbMZByE7vvXajxufcmLNcvPNR9GUioPXYt9ccbm8ZmJrkrfE0e%2FWJnO2cfLi09Xrfpx8Yq4zmHXKyXRq7aaiVwKZkb8JrdZIIL5na95mZSq9IOh%2F0mFKkTHs0VuTwB%2FH1uDdw4jHRt%2F8j0%2BmB50MzTsz4gRU3pwUxgiLVo4KR4pcOaV5KmrPmUfPT0cY%2BLVHXqRrJrjKXEL3x%2Bg12JgOnrqXN6xBmCu3BXLk%2FskczNtq12cf5qSeDqiHtxBbeHAVxD%2Ff%2FgWCQVT30GUISoyL0hWBu40e19Mgwri0frXzhi1kVt%2BuXsZ9A9uty47lEGehy3eWe%2F4Q7sWL7t6%2BU3ADU30PFoFfAwoSFSvo4uopzoYCbVIqH%2Blaa592v1nhOHtGKDTszO2zpv5yzJVHZasP3PVjLiOvWgebUwXt3C32O2RZA5Wj2Rom%2FmBY9UjuyWB7LevOyJLWPJan%2FBJuNIswwjucklhGkYxlUYrm2fVEwoBZB0Tu8wteSKu5oe3Bw822OqXzne0xet3WfbN%2BUrwVmA9eTm8MIAayfbX61tgdnHvFt8hwC5q7x4QgIwqti%2B5o5ATBhO6rzU1wBqOb2Gfxgd4kTLBsspgAVn42a9BxDbmecL3QBdvGbN%2BF5gwn88iOMDyrrR812mXBgJoi34BSP47UBNWtsFNHbFPY81%2BCvhY7XgQ9fiXhilGG4MsYCisD9T1wcsTn%2FLdAcfuO161bvCDi73%2BoouFuwBIg983p74QHPMKfK18pWrxoDy%2Fuy6rUgmplyPbhKgdjsUOs0Dfkoddr5YDVQuuxpbDWDNKpe9PseA%2Fk2yX0ZCAF2qtkATCJBIYk%2BqASqGakQrQPdmt1RWz4BQ1tDZef8uwJZpw8Z8AaqF6qJYAB7YTbUAUKABlQBJQiYlAng0%2FzSTBfCDjTyMIgCja8b1xvaA9THb05YNwNSDUz15BYDI0%2BSYSA3Q4YJsfirAxfKrebMACGl3qhDQnB3zGckG5K%2B8iBhuAfSZqthx5z%2FOimiA1BlC9LYAYrh8NvrluLYQMN5klEInAibxInejbMCQTOJgDfC8eEFMJUC78gKZKoA6i0qqAiAlyMJp4P8NAELgrqjzSH%2FyAAAAAElFTkSuQmCC";

//................................................[Add Logo configuration Button to game]
$('#GF_toolbar').css('height', '30px','margin-left', '-40px','line-height', '15px','width', '103%');
$("#GF_toolbar ul").prepend('<li class="CrypteiaConfigurationBtn"><input id="showConfiguration" name="showConfiguration" type="image" value="" src="'+cnfgLogo.src+'" style="display:block; position: relative; float: left; z-index: 99; margin-left: -30px; padding-right: 6px;" title="Crypteia Configuration">&nbsp;<font color="#cc0000"><b>'+betaText+'</b></font></li>');

$('#showConfiguration').on({
    'mouseover' : function() {
      	$(this).attr('src',GRAPHICS_URL+'Crypteia(R)_30X33_Active.png');
    },
    'mouseout' : function() {
  		$(this).attr('src',GRAPHICS_URL+'Crypteia(R)_30X33.png');
    },
	click : function() {
  		$( "#dialog-form" ).dialog( "open" );
    }
  });

//.............................................................[Add military sound icon]
// Case we starting with sound enabled - user must see enabled icon
if (Crypteia.get('Military_SND_vol') > 0) {
	$("#advMilitary").prepend('<div class="CrypteiaMilitarySoundIcon">'+
	'	<img src="'+GRAPHICS_URL+'MilitarySound-enabled.png" class="MilitarySound" id="CrypteiaMilitarySoundIMG" title="General Sound Enabled">'+
	'</div>');	
	// on enabled icon click
	$("#CrypteiaMilitarySoundIMG.MilitarySound").click(function() {
		if ($(this).attr("class") != "MilitarySound") {
		  this.src = this.src.replace("-disabled","-enabled");
		  $(this).prop('title', 'General Sound Enabled');
		  // change military volume
		  Crypteia.set('Military_SND_vol', 90);
		  if (($('#js_GlobalMenu_military').filter('.normalalert').length) > 0) {
				Sound(Milytary_SND, Crypteia.get('Military_SND_vol'), false);
		  }
		  // save changes			
		  Crypteia.save();	
		} else {
		  this.src = this.src.replace("-enabled","-disabled");
		  $(this).prop('title', 'General Sound Disabled');
		  // change military volume
		  Crypteia.set('Military_SND_vol', 0);
		  // save changes			
		  Crypteia.save();	
		  $('js_GlobalMenu_military_audio').each(function(){
				Sound(Milytary_SND, 0);
			}); 
		}
		$(this).toggleClass("on");
	});
} else {
	// Case we starting with sound disabled - user must see enabled icon
	$("#advMilitary").prepend('<div class="CrypteiaMilitarySoundIcon">'+
	'	<img src="'+GRAPHICS_URL+'MilitarySound-disabled.png" class="MilitarySound" id="CrypteiaMilitarySoundIMG" title="General Sound Disabled">'+
	'</div>');
	// on disabled icon click
	$("#CrypteiaMilitarySoundIMG.MilitarySound").click(function() {
		if ($(this).attr("class") == "MilitarySound") {
		  this.src = this.src.replace("-disabled","-enabled");
		  $(this).prop('title', 'General Sound Enabled');
		  // change military volume
		  Crypteia.set('Military_SND_vol', 90);
		  if (($('#js_GlobalMenu_military').filter('.normalalert').length) > 0) {
				Sound(Milytary_SND, Crypteia.get('Military_SND_vol'), false);
		  }
		  // save changes			
		  Crypteia.save();
		} else {
		 this.src = this.src.replace("-enabled","-disabled");
		  $(this).prop('title', 'General Sound Disabled');
		  // change military volume
		  Crypteia.set('Military_SND_vol', 0);
		  // save changes			
		  Crypteia.save();	
		  
		  $('js_GlobalMenu_military_audio').each(function(){
				Sound(Milytary_SND, 0);
			}); 
		}
		$(this).toggleClass("on");
    });
}

//................................................................[Configuration Dialog]
$(document.body).load(function () {$( "#dialog-form" ).dialog( "open" );});
// if beta version add beta image
if (betaText != "") {
	var addBetaImage = '<img id="betaImage" style="position: absolute; top: 0px; left: 0px;" src="'+GRAPHICS_URL+'beta.png" width="90" height="100" alt="beta version">';
} else {var addBetaImage = "";}


//Configuration dialog html
$('body').prepend('<div id="dialog-form" title="'+scriptName+' '+scriptVersion+' - Configuration" style="display: none;">'+ 
  	'<img id="crypteia_logo" src="'+GRAPHICS_URL+'Crypteia(R).png" width="90" height="100" alt="Crypteia Logo" style="position: relative;">'+
    ''+addBetaImage+'<img src="'+GRAPHICS_URL+'Crypteia_Text.png" width="360" height="92" alt="Crypteia script" style="margin-left:70px;"/>'+ 
    /*'<p class="validateTips"><hr style="width:100%; color:red; margin-left:-3px;"></p>'+*/
	'<form>'+
    	'<fieldset>'+
		    // SOUND SECTION
			'<div id="cnfg_CrypteiaSectionHeader"><b>SOUND SECTION</b></div>'+
			'<br>'+ 
			'<div id="cnfg_CrypteiaSubSectionElement">'+
			'	<div class="cnfg_CrypteiaSubSectionElementTitle" style="width: 40%;"><label for="name">Current Sound Mode </label></div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementAction" style="margin-top:-8px;">'+
			'   	<div id="sndMode">'+
			'			<select id="sndMode_combobox">'+
			'				<option value="Disabled">Disabled (<font style="font-style:italic;">All Sounds in 0%</font>)</option>'+
			'				<option value="Default">Default (Low Sounds in 15%)</option>'+
			'				<option value="War">War (Only General & loop mode ON)</option>'+
			'				<option value="Loud">Loud (Sounds in 50%)</option>'+
			'			  </select>'+
		    '		</div>'+
			'	</div>'+
			'	<span class="stretch"></span>'+
			'	<div id="cnfg_CrypteiaMessenger"><b>WARNING:</b> <i>Changing current Sound mode, page will be automaticaly reloaded, for changes to take effect !!</i> </div>'+
			'</div>'+	
			'<br>'+
			'<div id="cnfg_CrypteiaSpacer">&nbsp;</div>'+
			//Advisors			
			'<div id="cnfg_CrypteiaSubSectionHeader"><b>Advisors Sounds</b> <font style="font-size:12px;">(0 to disable a sound)</font></div>'+
			'<br>'+			
			//........Mayor
			'<div id="cnfg_CrypteiaSubSectionElement">'+
			'	<div class="cnfg_CrypteiaSubSectionElementTitle">Mayor</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementValue">'+
			'		<label for="Mayor_SND_vol" style="font-size: 11px;">Volume:</label>'+
			'		<input type="text" id="Mayor_SND_vol" class="cnfg_CrypteiaSubSectionElementInputStyle" Disabled >'+
			'	</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementAction"><div id="Mayor_SND_slider" ></div></div>'+
			'	<span class="stretch"></span>'+
			'</div>'+
			'<div id="cnfg_CrypteiaSpacer">&nbsp;</div>'+
			//........Military
			'<div id="cnfg_CrypteiaSubSectionElement">'+
			'	<div class="cnfg_CrypteiaSubSectionElementTitle">Military</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementValue">'+
			'		<label for="Military_SND_vol" style="font-size: 11px;">Volume:</label>'+
			'		<input type="text" id="Military_SND_vol" class="cnfg_CrypteiaSubSectionElementInputStyle" Disabled >'+
			'	</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementAction"><div id="Military_SND_slider"></div></div>'+
			'	<span class="stretch"></span>'+
			'</div>'+
			'<div id="cnfg_CrypteiaSpacer">&nbsp;</div>'+
			//........Research
			'<div id="cnfg_CrypteiaSubSectionElement">'+
			'	<div class="cnfg_CrypteiaSubSectionElementTitle">Research</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementValue">'+
			'		<label for="Research_SND_vol" style="font-size: 11px;">Volume:</label>'+
			'		<input type="text" id="Research_SND_vol" class="cnfg_CrypteiaSubSectionElementInputStyle" Disabled >'+
			'	</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementAction"><div id="Research_SND_slider" ></div></div>'+
			'	<span class="stretch"></span>'+
			'</div>'+
			'<div id="cnfg_CrypteiaSpacer">&nbsp;</div>'+
			//........Diplomacy
			'<div id="cnfg_CrypteiaSubSectionElement">'+
			'	<div class="cnfg_CrypteiaSubSectionElementTitle">Diplomacy</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementValue">'+
			'		<label for="Diplomacy_SND_vol" style="font-size: 11px;">Volume:</label>'+
			'		<input type="text" id="Diplomacy_SND_vol" class="cnfg_CrypteiaSubSectionElementInputStyle" Disabled >'+
			'	</div>'+
			'	<div class="cnfg_CrypteiaSubSectionElementAction"><div id="Diplomacy_SND_slider" ></div></div>'+
			'	<span class="stretch"></span>'+
			'</div>'+
			'<div id="cnfg_CrypteiaSpacer">&nbsp;</div>'+
			'<br>'+	
        '</fieldset>'+
    '</form>'+
'</div>');


/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                     SOUND SYSTEM                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////

// ...........................................................................[Sound modes selection]
$("#sndMode_combobox").change(function() {
  //alert( "NEW sndMode will set to: "+$("#sndMode_combobox").find('option:selected').val() );
  // does current mode changed?
  if ($("#sndMode_combobox").find('option:selected').val() != Crypteia.get('sndMode')) {
	  // if successed changed sound Mode
	  if (SETsndMode($("#sndMode_combobox").find('option:selected').val())) {
		  // change current Mode to New sound Mode
		  Crypteia.set('sndMode', $("#sndMode_combobox").find('option:selected').val());
		  Crypteia.save();
		  
		  //reload current page for changes to take effect
          //alert( "NEW sndMode SET to: "+$("#sndMode_combobox").find('option:selected').val() );
		  location.reload();
	  }
  }
});
$("#sndMode_combobox").val(Crypteia.get('sndMode'));

// ........................................................................................[Advisors]
var advisor = [
	{ id: 'js_GlobalMenu_cities'},	
	{ id: 'js_GlobalMenu_military'},
	{ id: 'js_GlobalMenu_research',},
	{ id: 'js_GlobalMenu_diplomacy',}
];

// Advisors	
var Mayor_SND	 			= {id: "CrypteiaMayorSound", url: SOUNDS_URL+"mayor_alert.ogg"};
var Milytary_SND 			= {id: "CrypteiaMilitarySound", url: SOUNDS_URL+"military_alert-(war-horn).ogg"};
	var Military_SND_active = {id: "CrypteiaMilitaryActiveSound", url: SOUNDS_URL+"military_active.ogg"};
var Research_SND 			= {id: "CrypteiaResearchSound", url: SOUNDS_URL+'research_alert.ogg'};
var Diplomacy_SND 			= {id: "CrypteiaDiplomacySound", url: SOUNDS_URL+'diplomacy_alert.ogg'};
		
for (var i = 0; i < advisor.length; i++) {
	//...Mayor
	if ((i == 0) && (Crypteia.get('Mayor_SND_vol') > 0)) {		
		if (Crypteia.get('Mayor_SND_vol') > 0) {		
			if (($('#js_GlobalMenu_cities').filter('.normalactive').length) > 0) {
				Sound(Mayor_SND, Crypteia.get('Mayor_SND_vol'));
			}
		}
	} 
	//...Military
	else if ((i == 1) && (Crypteia.get('Military_SND_vol') > 0)) {
		// Flag for playng Active sound once
		var militaryCanPlayActiveSound = true;		
		//interval check for military alert
		militaryTimer = setInterval((function() { 
			// Active
			if (($('#js_GlobalMenu_military').filter('.normalactive').length) > 0) {
				if (militaryCanPlayActiveSound) {
					Sound(Military_SND_active, Crypteia.get('Military_SND_vol'));
					militaryCanPlayActiveSound = false;
				}
			}
			// Alert
			if (($('#js_GlobalMenu_military').filter('.normalalert').length) > 0) {
				Sound(Milytary_SND, Crypteia.get('Military_SND_vol'), false);
			} else if (($('#js_GlobalMenu_military').filter('.normal').length) > 0) {
				Sound(Milytary_SND, Crypteia.get('Military_SND_vol'));				
			}			
		}), 1000);
	}  
	//...Research
	else if ((i == 2) && (Crypteia.get('Research_SND_vol') > 0)) {
		if (Crypteia.get('Research_SND_vol') > 0) {		
			if (($('#js_GlobalMenu_research').filter('.normalactive').length) > 0) {
				Sound(Research_SND, Crypteia.get('Research_SND_vol'));
			}
		}
	} 
	//...Diplomacy
	else if ((i == 3) && (Crypteia.get('Diplomacy_SND_vol') > 0)) {
		if (Crypteia.get('Diplomacy_SND_vol') > 0) {		
			if (($('#js_GlobalMenu_diplomacy').filter('.normalactive').length) > 0) {
				Sound(Diplomacy_SND, Crypteia.get('Diplomacy_SND_vol'));
			}
		}
	}	
}

// .................................................................................[Sound Functions]
function checkClass(e, classe) {
	return (e.getAttribute('class').indexOf(classe) != -1);
}


function Sound(snd, sndVolume, sndLoop ) {
	sndLoop = sndLoop || false;	
	sndVolume = sndVolume / 100;
	//Check if sndVolume > 0 then play sound
	if (sndVolume > 0) {
		if (sndLoop) {var loop = 'loop';} else {var loop = '';}	
		if ($('#'+snd.id).length == 0) {
			$('<audio '+loop+' id ="'+snd.id+'" name="'+snd.id+'" src="'+snd.url+'" type="audio/ogg"></audio>').appendTo('body');
		}
		//alert(' id: '+snd.id+'\n url: '+snd.url+ '\n volume: '+sndVolume+ '\n loop: '+loop);	
		$('#'+snd.id)[0].volume = sndVolume; 
		$('#'+snd.id)[0].play();
		//console.log('######################################## '+snd.id+' starts playing ##################################');
	} else if (sndVolume == 0) {
		// does audio exists?
		if ($('#'+snd.id).length > 0){					  
			//Check if sndVolume = 0 then stop sound
			$('#'+snd.id)[0].pause();
			$('#'+snd.id)[0].currentTime = 0;
		}
	}
} // end of sound function 

////////////////////////////////// End of SOUND SYSTEM \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

