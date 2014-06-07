// ==UserScript==
// @name           Google Bar Returns Beta
// @namespace      http://userscripts.org/users/521514
// @description    Beta
// @grant          GM_getValue
// @grant          GM_setValue
// @version        0.1.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/185049.user.js
// @include        h*://userscripts.org/*
// @run-at         document-start
// ==/UserScript==
//defaults
$(document).ready(function(){
$(".slidingDiv").hide();
var Load = GM_getValue('DefaultScript');
if (Load == undefined){
GM_setValue('DefaultScript', '1')
GM_setValue('URL1Value', 'https://plus.google.com/');
GM_setValue('URL1TextValue', '+You');
GM_setValue('URL2Value', 'https://www.google.com/webhp');
GM_setValue('URL2TextValue', 'Search');
GM_setValue('URL3Value', 'http://www.google.com/imghp');
GM_setValue('URL3TextValue', 'Images');
GM_setValue('URL4Value', 'https://www.google.com/maps');
GM_setValue('URL4TextValue', 'Maps');
GM_setValue('URL5Value', 'https://play.google.com/');
GM_setValue('URL5TextValue', 'Play');
GM_setValue('URL6Value', 'http://www.youtube.com/');
GM_setValue('URL6TextValue', 'YouTube');
GM_setValue('URL7Value', 'https://news.google.com/');
GM_setValue('URL7TextValue', 'News');
GM_setValue('URL8Value', 'https://mail.google.com/');
GM_setValue('URL8TextValue', 'Gmail');
GM_setValue('URL9Value', 'https://drive.google.com/');
GM_setValue('URL9TextValue', 'Drive');
GM_setValue('URL10Value', 'https://www.google.com/calendar');
GM_setValue('URL10TextValue', 'Calendar');
GM_setValue('URL11Value', '');
GM_setValue('URL11TextValue', '');
GM_setValue('URL12Value', '');
GM_setValue('URL12TextValue', '');
GM_setValue('URL13Value', '');
GM_setValue('URL13TextValue', '');
GM_setValue('URL14Value', '');
GM_setValue('URL14TextValue', '');
GM_setValue('URL15Value', '');
GM_setValue('URL15TextValue', '');
GM_setValue('URL16Value', '');
GM_setValue('URL16TextValue', '');
GM_setValue('URL17Value', '');
GM_setValue('URL17TextValue', '');
GM_setValue('URL18Value', '');
GM_setValue('URL18TextValue', '');
GM_setValue('URL19Value', '');
GM_setValue('URL19TextValue', '');
GM_setValue('URL20Value', '');
GM_setValue('URL20TextValue', '');
GM_setValue('BGColor', 'Grey');
GM_setValue('LColor', 'Grey');
GM_setValue('URL1Display', false);
$('#URL1Display').prop('checked', true);
GM_setValue('URL2Display', false);
$('#URL2Display').prop('checked', true);
GM_setValue('URL3Display', false);
$('#URL3Display').prop('checked', true);
GM_setValue('URL4Display', false);
$('#URL4Display').prop('checked', true);
GM_setValue('URL5Display', false);
$('#URL5Display').prop('checked', true);
GM_setValue('URL6Display', false);
$('#URL6Display').prop('checked', true);
GM_setValue('URL7Display', false);
$('#URL7Display').prop('checked', true);
GM_setValue('URL8Display', false);
$('#URL8Display').prop('checked', true);
GM_setValue('URL9Display', false);
$('#URL9Display').prop('checked', true);
GM_setValue('URL10Display', false);
$('#URL10Display').prop('checked', true);
GM_setValue('URL11Display', true);
$('#URL11Display').prop('checked', false);
GM_setValue('URL12Display', true);
$('#URL12Display').prop('checked', false);
GM_setValue('URL13Display', true);
$('#URL13Display').prop('checked', false);
GM_setValue('URL14Display', true);
$('#URL14Display').prop('checked', false);
GM_setValue('URL15Display', true);
$('#URL15Display').prop('checked', false);
GM_setValue('URL16Display', true);
$('#URL16Display').prop('checked', false);
GM_setValue('URL17Display', true);
$('#URL17Display').prop('checked', false);
GM_setValue('URL18Display', true);
$('#URL18Display').prop('checked', false);
GM_setValue('URL19Display', true);
$('#URL19Display').prop('checked', false);
GM_setValue('URL20Display', true);
$('#URL20Display').prop('checked', false);
}
var RemoveBGClass = "BGGrey BGBlack BGBlue BGBrown BGGreen BGOrange BGPink BGPurple BGRed BGWhite BGYellow"

$('html').prepend(
 '<div class="slidingDiv">'
+'<div id="Google_Bar_Settings"> <h1 id="GBO">Google Bar Settings</h1>'
		//sticky bar
+'<h2 id="GBMS">Google Bar Misc. Settings</h2>'
+ '<div id="GoogleBarMiscSettings"><label title="Have the Google Bar always be at the top of the page."><input type="checkbox" id="StickyBar"/>Sticky Bar</label></div>'
		//background color
+'<h2 id="GBCS">Google Bar Colors</h2>'
+'<div id="ColorSettings">'
	+'<div id ="BGSettings"><label title="Change the background color of the Google Bar">Background Color</label><br>'
		+'<input type="radio" id="BGSGrey" name="BackgroundColor" value="Grey">Grey<br>'
		+'<input type="radio" id="BGSBlack" name="BackgroundColor" value="Black">Black<br>'
		+'<input type="radio" id="BGSBlue" name="BackgroundColor" value="Blue">Blue<br>'
		+'<input type="radio" id="BGSGreen" name="BackgroundColor" value="Green">Green<br>'
		+'<input type="radio" id="BGSOrange"  name="BackgroundColor" value="Orange">Orange<br>'
		+'<input type="radio" id="BGSPink"  name="BackgroundColor" value="Pink">Pink<br>'
		+'<input type="radio" id="BGSPurple"  name="BackgroundColor" value="Purple">Purple<br>'
		+'<input type="radio" id="BGSRed"  name="BackgroundColor" value="Red">Red<br>'
		+'<input type="radio" id="BGSWhite"  name="BackgroundColor" value="White">White<br>'
		+'<input type="radio" id="BGSYellow"  name="BackgroundColor" value="Yellow">Yellow<br>'
	+'</div>'
	+'<div id ="LColorSettings"><label title="Change the color of the Google Bar links">Link Color</label><br>'
		+'<input type="radio" id="LCSGrey" name="LinkColor" value="Grey">Grey<br>'
		+'<input type="radio" id="LCSBlack" name="LinkColor" value="Black">Black<br>'
		+'<input type="radio" id="LCSBlue" name="LinkColor" value="Blue">Blue<br>'
		+'<input type="radio" id="LCSGreen" name="LinkColor" value="Green">Green<br>'
		+'<input type="radio" id="LCSOrange" name="LinkColor" value="Orange">Orange<br>'
		+'<input type="radio" id="LCSPink" name="LinkColor" value="Pink">Pink<br>'
		+'<input type="radio" id="LCSPurple" name="LinkColor" value="Purple">Purple<br>'
		+'<input type="radio" id="LCSRed" name="LinkColor" value="Red">Red<br>'
		+'<input type="radio" id="LCSWhite" name="LinkColor" value="White">White<br>'
		+'<input type="radio" id="LCSYellow" name="LinkColor" value="Yellow">Yellow<br>'
	+'</div>'
+'</div>'
		//URL settings
+'<h2 id="GBLS">Google Bar Links</h2>'
+'<div id ="GoogleBarURL">'
+'<h3 id="UrlSettingsInfo"><img src="data:image/png;base64,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"></h3>'
+'<form id="NewTab" action="">'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL1Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL2Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL3Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL4Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL5Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL6Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL7Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL8Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL9Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL10Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL11Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL12Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL13Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL14Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL15Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL16Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL17Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL18Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL19Tab"/></label>'
+'<label title="Check to open this url in a new tab."><input type="checkbox" id="URL20Tab"/></label>'
+'</form>'
+'<form id="URLSettings" action="">'
+'<input type="text" name="barurl1"><input type="text" name="texturl1"><br>'
+'<input type="text" name="barurl2"><input type="text" name="texturl2"><br>'
+'<input type="text" name="barurl3"><input type="text" name="texturl3"><br>'
+'<input type="text" name="barurl4"><input type="text" name="texturl4"><br>'
+'<input type="text" name="barurl5"><input type="text" name="texturl5"><br>'
+'<input type="text" name="barurl6"><input type="text" name="texturl6"><br>'
+'<input type="text" name="barurl7"><input type="text" name="texturl7"><br>'
+'<input type="text" name="barurl8"><input type="text" name="texturl8"><br>'
+'<input type="text" name="barurl9"><input type="text" name="texturl9"><br>'
+'<input type="text" name="barurl10"><input type="text" name="texturl10"><br>'
+'<input type="text" name="barurl11"><input type="text" name="texturl11"><br>'
+'<input type="text" name="barurl12"><input type="text" name="texturl12"><br>'
+'<input type="text" name="barurl13"><input type="text" name="texturl13"><br>'
+'<input type="text" name="barurl14"><input type="text" name="texturl14"><br>'
+'<input type="text" name="barurl15"><input type="text" name="texturl15"><br>'
+'<input type="text" name="barurl16"><input type="text" name="texturl16"><br>'
+'<input type="text" name="barurl17"><input type="text" name="texturl17"><br>'
+'<input type="text" name="barurl18"><input type="text" name="texturl18"><br>'
+'<input type="text" name="barurl19"><input type="text" name="texturl19"><br>'
+'<input type="text" name="barurl20"><input type="text" name="texturl20"><br>'
+'</form>'
+'<form id="ShowUrlSetting">'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL1Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL2Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL3Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL4Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL5Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL6Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL7Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL8Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL9Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL10Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL11Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL12Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL13Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL14Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL15Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL16Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL17Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL18Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL19Display"/></label>'
+'<label title="Check to show this url on the bar."><input type="checkbox" id="URL20Display"/></label>'
+'</form>'
+'</div>'
//close
+'<a href="javascript:void(0)" class="show_hide">Close</a>'
+'<button id="default" type="button">Default Settings</button></div>'
);
 
var style = ''
//options
+'#Google_Bar_Settings{position:fixed;background-color:rgba(255,255,255,1);padding:0px;z-index:2147000000;right:5px!important;margin-top:35px!important;box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);border: 1px solid rgb(172, 172, 172);width:345px!important;}'
+'#Google_Bar_Settings *{margin:1px!important;padding:0px!important;font-family:Arial, Helvetica, sans-serif!important;font-size:12px!important;}'
+'#Google_Bar_Settings h1{color:#fff!important;background-color:#222!important;text-align:center!important;margin:0px!important;height:28px!important;width:100%!important;vertical-align:middle!important;font-size:21px!important;}'
//h2
+'#Google_Bar_Settings h2{color:#333!important;background-color:#ddd!important;text-align:center!important;margin:3px 0px 5px!important;height:15px!important;width:100%!important;vertical-align:middle!important;font-size:12px!important;cursor: pointer!important;}'
+'#Google_Bar_Settings h2:hover{background-color:#bbb!important;}'
//colors
+'#BGSettings,#LColorSettings{width:125px!important;display:inline-block!important;}'
//url 1-20
+'[name = "barurl1"],[name = "barurl2"],[name = "barurl3"],[name = "barurl4"],[name = "barurl5"],[name = "barurl6"],[name = "barurl7"],[name = "barurl8"],[name = "barurl9"],[name = "barurl10"],[name = "barurl11"],[name = "barurl12"],[name = "barurl13"],[name = "barurl14"],[name = "barurl15"],[name = "barurl16"],[name = "barurl17"],[name = "barurl18"],[name = "barurl19"],[name = "barurl20"]{width:200px!important;color:black!important;}'
//text 1 - 20
+'[name = "texturl1"],[name = "texturl2"],[name = "texturl3"],[name = "texturl4"],[name = "texturl5"],[name = "texturl6"],[name = "texturl7"],[name = "texturl8"],[name = "texturl9"],[name = "texturl10"],[name = "texturl11"],[name = "texturl12"],[name = "texturl13"],[name = "texturl14"],[name = "texturl15"],[name = "texturl16"],[name = "texturl17"],[name = "texturl18"],[name = "texturl19"],[name = "texturl20"]{width:100px!important;color:black!important;}'
//url settings
+'#URLSettings{width:auto;}'
+'#ShowUrlSetting,#NewTab{width:14px;}'
+'#URLSettings,#ShowUrlSetting,#NewTab{display:inline-block;}'
+'#ShowUrlSetting input,#NewTab input{margin-top:3px!important;margin-bottom:3px!important;}'
//GearIcon
+'#gearicon{top:4px!important;position:absolute!important;top:7px!important;right:10px!important;opacity:0.35;}'
+'#gearicon:hover{opacity:0.7;}'
//BarCSS
+'#Black_Nav_Bar *{padding:0px!important;margin:-1px!important;}'
+'#Black_Nav_Bar{width:100%;z-index:999999;top:0px;left:0px;height:30px;}'
+'#Black_Nav_Bar a,#Black_Nav_Bar a:visited{font: 13px Arial,sans-serif;position:relative;line-height:30px;font-weight:bold;padding:7px 10px!important;text-decoration:none!important;}'
+'#Black_Nav_Bar .bar{padding:7px 0px!important;display:inline;}'
//fixed
//backgrounds
+'.BGGrey{background-color:#2d2d2d;}'
+'.LBGGrey:hover{background-color:#4b4b4b;}'
+'.BGBlack{background-color:#000;}'
+'.LBGBlack:hover{background-color:#222;}'
+'.BGBlue{background-color:#4584ee;}'
+'.LBGBlue:hover{background-color:#216ceb;}'
+'.BGGreen{background-color:#34960f;}'
+'.LBGGreen:hover{background-color:#3cad11;}'
+'.BGRed{background-color:#ca3b2b;}'
+'.LBGRed:hover{background-color:#d5493a;}'
+'.BGPurple{background-color:#800080;}'
+'.LBGPurple:hover{background-color:#9a009a;}'
+'.BGOrange{background-color:#ff6500;}'
+'.LBGOrange:hover{background-color:#ff741a;}'
+'.BGYellow{background-color:#ffea00;}'
+'.LBGYellow:hover{background-color:#ffee33;}'
+'.BGPink{background-color:#ffc0cb;}'
+'.LBGPink:hover{background-color:#ffa0ab;}'
+'.BGWhite{background-color:#fff;}'
+'.LBGWhite:hover{background-color:#ecf0f8;}'
//link color
+'.LGrey{color:#bbb!important;}'
+'.LGrey:hover{color:#fff!important;}'
+'.LBlack{color:#000!important;}'
+'.LBlack:hover{color:#222!important;}'
+'.LBlue{color:#6c89cc!important;}'
+'.LBlue:hover{color:#437ee5!important;}'
+'.LGreen{color:#9cff8a!important;}'
+'.LGreen:hover{color:#7ccc6e!important;}'
+'.LOrange{color:#f2c834!important;}'
+'.LOrange:hover{color:#e55c00!important;}'
+'.LPink{color:#fce0dc!important;}'
+'.LPink:hover{color:#c9b2af!important;}'
+'.LPurple{color:#d47afe!important;}'
+'.LPurple:hover{color:#c64dff!important;}'
+'.LRed{color:#BA0001!important;}'
+'.LRed:hover{color:#fc4935!important;}'
+'.LWhite{color:#fff!important;}'
+'.LWhite:hover{color:#eee!important;}'
+'.LYellow{color:#f2c933!important;}'
+'.LYellow:hover{color:#bf9f28!important;}'
//userscripts page
+'#top{margin-top:30px!important;}'
;
$('head').append('<style>' + style + '</style>');
// if get url is empty

$(document).ready(function(){
        $(".slidingDiv").hide();
    $('.show_hide').click(function(){
	$(".show_hide").show();
    $(".slidingDiv").slideToggle();
    });
});


$(document).ready(function(){
        $("#GoogleBarURL").hide();
        $("#GBLS").show();
    $('#GBLS').click(function(){
    $("#GoogleBarURL").slideToggle();
    });
});

$(document).ready(function(){
        $("#ColorSettings").hide();
        $("#GBCS").show();
    $('#GBCS').click(function(){
    $("#ColorSettings").slideToggle();
    });
});
$(document).ready(function(){
        $("#GoogleBarMiscSettings").hide();
        $("#GBMS").show();
    $('#GBMS').click(function(){
    $("#GoogleBarMiscSettings").slideToggle();
    });
});

//when option is clicked do...	
$( "#StickyBar" ).click(function() {
if($('#StickyBar').is(':checked')){
GM_setValue('FixedBar', true);
$("#Black_Nav_Bar").addClass('fixed');
$("#Black_Nav_Bar").css("position", "fixed");
}
else {
GM_setValue('FixedBar', false);
$("#Black_Nav_Bar").removeClass('fixed');
$("#Black_Nav_Bar").css("position", "absolute");
}
});
$(document).ready(function(){
if (GM_getValue('FixedBar', true)){
$('#StickyBar').prop('checked', true);
$("#Black_Nav_Bar").css("position", "fixed");}
else{
$("#Black_Nav_Bar").css("position", "absolute");
}
});
//Set bar color on option change
$("input:radio[name=BackgroundColor]").click(function(){
var BarBackgroundColor = $(this).val();
GM_setValue('BGColor', BarBackgroundColor);
if (this.value == "Grey")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGGrey');
$("#Black_Nav_Bar .bar").addClass('LBGGrey');
}
if (this.value == "Black")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGBlack');
$("#Black_Nav_Bar .bar").addClass('LBGBlack');
}
if (this.value == "Blue")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGBlue');
$("#Black_Nav_Bar .bar").addClass('LBGBlue');
}

if (this.value == "Green")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGGreen');
$("#Black_Nav_Bar .bar").addClass('LBGGreen');
}
if (this.value == "Orange")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGOrange');
$("#Black_Nav_Bar .bar").addClass('LBGOrange');
}
if (this.value == "Pink")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGPink');
$("#Black_Nav_Bar .bar").addClass('LBGPink');
}
if (this.value == "Purple")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGPurple');
$("#Black_Nav_Bar .bar").addClass('LBGPurple');
}
if (this.value == "Red")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGRed');
$("#Black_Nav_Bar .bar").addClass('LBGRed');
}

if (this.value == "White")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGWhite');
$("#Black_Nav_Bar .bar").addClass('LBGWhite');
}
if (this.value == "Yellow")
{
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGYellow');
$("#Black_Nav_Bar .bar").addClass('LBGYellow');
}
});
//Set link color on option change
$("input:radio[name=LinkColor]").click(function(){
var LinkColor = this.value
GM_setValue('LColor', LinkColor);
if (this.value == "Grey")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LGrey');
}
if (this.value == "Black")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LBlack');
}
if (this.value == "Blue")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LBlue');
}
if (this.value == "Green")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LGreen');
}
if (this.value == "Orange")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LOrange');
}
if (this.value == "Pink")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LPink');
}
if (this.value == "Purple")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LPurple');
}
if (this.value == "Red")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LRed');
}
if (this.value == "White")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LWhite');
}
if (this.value == "Yellow")
{
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LYellow');
}
});
//Set bar color on page load
$(document).ready(function(){
if (GM_getValue('BGColor') == "Grey")
{
$("#Black_Nav_Bar").addClass('BGGrey');
$("#Black_Nav_Bar .bar").addClass('LBGGrey');
$("#LinkColor").val('Grey');
$("#BGSGrey").prop("checked", true)
}
if (GM_getValue('BGColor') == "Black")
{
$("#Black_Nav_Bar").addClass('BGBlack');
$("#Black_Nav_Bar .bar").addClass('LBGBlack');
$("#LinkColor").val('Black');
$("#BGSBlack").prop("checked", true)
}

if (GM_getValue('BGColor') == "Blue")
{
$("#Black_Nav_Bar").addClass('BGBlue');
$("#Black_Nav_Bar .bar").addClass('LBGBlue');
$("#LinkColor").val('Blue');
$("#BGSBlue").prop("checked", true)
}

if (GM_getValue('BGColor') == "Green")
{
$("#Black_Nav_Bar").addClass('BGGreen');
$("#Black_Nav_Bar .bar").addClass('LBGGreen');
$("#LinkColor").val('Green');
$("#BGSGreen").prop("checked", true)
}

if (GM_getValue('BGColor') == "Orange")
{
$("#Black_Nav_Bar").addClass('BGOrange');
$("#Black_Nav_Bar .bar").addClass('LBGOrange');
$("#LinkColor").val('Orange');
$("#BGSOrange").prop("checked", true)
}

if (GM_getValue('BGColor') == "Pink")
{
$("#Black_Nav_Bar").addClass('BGPink');
$("#Black_Nav_Bar .bar").addClass('LBGPink');
$("#LinkColor").val('Pink');
$("#BGSPink").prop("checked", true)
}

if (GM_getValue('BGColor') == "Purple")
{
$("#Black_Nav_Bar").addClass('BGPurple');
$("#Black_Nav_Bar .bar").addClass('LBGPurple');
$("#LinkColor").val('Purple');
$("#BGSPurple").prop("checked", true)
}

if (GM_getValue('BGColor') == "Red")
{
$("#Black_Nav_Bar").addClass('BGRed');
$("#Black_Nav_Bar .bar").addClass('LBGRed');
$("#LinkColor").val('Red');
$("#BGSRed").prop("checked", true)
}

if (GM_getValue('BGColor') == "White")
{
$("#Black_Nav_Bar").addClass('BGWhite');
$("#Black_Nav_Bar .bar").addClass('LBGWhite');
$("#LinkColor").val('White');
$("#BGSWhite").prop("checked", true)
}

if (GM_getValue('BGColor') == "Yellow")
{
$("#Black_Nav_Bar").addClass('BGYellow');
$("#Black_Nav_Bar .bar").addClass('LBGYellow');
$("#LinkColor").val('Yellow');
$("#BGSYellow").prop("checked", true)
}


});
//set link color on page load
$(document).ready(function(){
if (GM_getValue('LColor') == "Grey")
{
$(".bar a").addClass('LGrey');
$("#LinkColor").val('Grey');
$("#LCSGrey").prop("checked", true)
}
if (GM_getValue('LColor') == "Black")
{
$(".bar a").addClass('LBlack');
$("#LinkColor").val('Black');
$("#LCSBlack").prop("checked", true)
}
if (GM_getValue('LColor') == "Blue")
{
$(".bar a").addClass('LBlue');
$("#LinkColor").val('Blue');
$("#LCSBlue").prop("checked", true)
}
if (GM_getValue('LColor') == "Green")
{
$(".bar a").addClass('LGreen');
$("#LinkColor").val('Green');
$("#LCSGreen").prop("checked", true)
}
if (GM_getValue('LColor') == "Orange")
{
$(".bar a").addClass('LOrange');
$("#LinkColor").val('Orange');
$("#LCSOrange").prop("checked", true)
}
if (GM_getValue('LColor') == "Pink")
{
$(".bar a").addClass('LPink');
$("#LinkColor").val('Pink');
$("#LCSPink").prop("checked", true)
}
if (GM_getValue('LColor') == "Purple")
{
$(".bar a").addClass('LPurple');
$("#LinkColor").val('Purple');
$("#LCSPurple").prop("checked", true)
}
if (GM_getValue('LColor') == "Red")
{
$(".bar a").addClass('LRed');
$("#LinkColor").val('Red');
$("#LCSRed").prop("checked", true)
}
if (GM_getValue('LColor') == "White")
{
$(".bar a").addClass('LWhite');
$("#LinkColor").val('White');
$("#LCSWhite").prop("checked", true)
}
if (GM_getValue('LColor') == "Yellow")
{
$(".bar a").addClass('LYellow');
$("#LinkColor").val('Yellow');
$("#LCSYellow").prop("checked", true)
}
});
//get and save urls
$('[name = "barurl1"]').keyup(function() {
var URL1Value = this.value;
$('#url1').attr("href", URL1Value);
GM_setValue('URL1Value', URL1Value);
});
$('[name = "texturl1"]').keyup(function() {
var URL1TextValue = this.value;
$("#url1").html(URL1TextValue);
GM_setValue('URL1TextValue', URL1TextValue);
});
$('[name = "barurl2"]').keyup(function() {
var URL2Value = this.value;
$('#url2').attr("href", URL2Value);
GM_setValue('URL2Value', URL2Value);
});
$('[name = "texturl2"]').keyup(function() {
var URL2TextValue = this.value;
$("#url2").html(URL2TextValue);
GM_setValue('URL2TextValue', URL2TextValue);
});
$('[name = "barurl3"]').keyup(function() {
var URL3Value = this.value;
$('#url3').attr("href", URL3Value);
GM_setValue('URL3Value', URL3Value);
});
$('[name = "texturl3"]').keyup(function() {
var URL3TextValue = this.value;
$("#url3").html(URL3TextValue);
GM_setValue('URL3TextValue', URL3TextValue);
});
$('[name = "barurl4"]').keyup(function() {
var URL4Value = this.value;
$('#url4').attr("href", URL4Value);
GM_setValue('URL4Value', URL4Value);
});
$('[name = "texturl4"]').keyup(function() {
var URL4TextValue = this.value;
$("#url4").html(URL4TextValue);
GM_setValue('URL4TextValue', URL4TextValue);
});
$('[name = "barurl5"]').keyup(function() {
var URL5Value = this.value;
$('#url5').attr("href", URL5Value);
GM_setValue('URL5Value', URL5Value);
});
$('[name = "texturl5"]').keyup(function() {
var URL5TextValue = this.value;
$("#url5").html(URL5TextValue);
GM_setValue('URL5TextValue', URL5TextValue);
});
$('[name = "barurl6"]').keyup(function() {
var URL6Value = this.value;
$('#url6').attr("href", URL6Value);
GM_setValue('URL6Value', URL6Value);
});
$('[name = "texturl6"]').keyup(function() {
var URL6TextValue = this.value;
$("#url6").html(URL6TextValue);
GM_setValue('URL6TextValue', URL6TextValue);
});
$('[name = "barurl7"]').keyup(function() {
var URL7Value = this.value;
$('#url7').attr("href", URL7Value);
GM_setValue('URL7Value', URL7Value);
});
$('[name = "texturl7"]').keyup(function() {
var URL7TextValue = this.value;
$("#url7").html(URL7TextValue);
GM_setValue('URL7TextValue', URL7TextValue);
});
$('[name = "barurl8"]').keyup(function() {
var URL8Value = this.value;
$('#url8').attr("href", URL8Value);
GM_setValue('URL8Value', URL8Value);
});
$('[name = "texturl8"]').keyup(function() {
var URL8TextValue = this.value;
$("#url8").html(URL8TextValue);
GM_setValue('URL8TextValue', URL8TextValue);
});
$('[name = "barurl9"]').keyup(function() {
var URL9Value = this.value;
$('#url9').attr("href", URL9Value);
GM_setValue('URL9Value', URL9Value);
});
$('[name = "texturl9"]').keyup(function() {
var URL9TextValue = this.value;
$("#url9").html(URL9TextValue);
GM_setValue('URL9TextValue', URL9TextValue);
});
$('[name = "barurl10"]').keyup(function() {
var URL10Value = this.value;
$('#url10').attr("href", URL10Value);
GM_setValue('URL10Value', URL10Value);
});
$('[name = "texturl10"]').keyup(function() {
var URL10TextValue = this.value;
$("#url10").html(URL10TextValue);
GM_setValue('URL10TextValue', URL10TextValue);
});
$('[name = "barurl11"]').keyup(function() {
var URL11Value = this.value;
$('#url11').attr("href", URL11Value);
GM_setValue('URL11Value', URL11Value);
});
$('[name = "texturl11"]').keyup(function() {
var URL11TextValue = this.value;
$("#url11").html(URL11TextValue);
GM_setValue('URL11TextValue', URL11TextValue);
});
$('[name = "barurl12"]').keyup(function() {
var URL12Value = this.value;
$('#url12').attr("href", URL12Value);
GM_setValue('URL12Value', URL12Value);
});
$('[name = "texturl12"]').keyup(function() {
var URL12TextValue = this.value;
$("#url12").html(URL12TextValue);
GM_setValue('URL12TextValue', URL12TextValue);
});
$('[name = "barurl13"]').keyup(function() {
var URL13Value = this.value;
$('#url13').attr("href", URL13Value);
GM_setValue('URL13Value', URL13Value);
});
$('[name = "texturl13"]').keyup(function() {
var URL13TextValue = this.value;
$("#url13").html(URL13TextValue);
GM_setValue('URL13TextValue', URL13TextValue);
});
$('[name = "barurl14"]').keyup(function() {
var URL14Value = this.value;
$('#url14').attr("href", URL14Value);
GM_setValue('URL14Value', URL14Value);
});
$('[name = "texturl14"]').keyup(function() {
var URL14TextValue = this.value;
$("#url14").html(URL14TextValue);
GM_setValue('URL14TextValue', URL14TextValue);
});
$('[name = "barurl15"]').keyup(function() {
var URL15Value = this.value;
$('#url15').attr("href", URL15Value);
GM_setValue('URL15Value', URL15Value);
});
$('[name = "texturl15"]').keyup(function() {
var URL15TextValue = this.value;
$("#url15").html(URL15TextValue);
GM_setValue('URL15TextValue', URL15TextValue);
});
$('[name = "barurl16"]').keyup(function() {
var URL16Value = this.value;
$('#url16').attr("href", URL16Value);
GM_setValue('URL16Value', URL16Value);
});
$('[name = "texturl16"]').keyup(function() {
var URL16TextValue = this.value;
$("#url16").html(URL16TextValue);
GM_setValue('URL16TextValue', URL16TextValue);
});
$('[name = "barurl17"]').keyup(function() {
var URL17Value = this.value;
$('#url17').attr("href", URL17Value);
GM_setValue('URL17Value', URL17Value);
});
$('[name = "texturl17"]').keyup(function() {
var URL17TextValue = this.value;
$("#url17").html(URL17TextValue);
GM_setValue('URL17TextValue', URL17TextValue);
});
$('[name = "barurl18"]').keyup(function() {
var URL18Value = this.value;
$('#url18').attr("href", URL18Value);
GM_setValue('URL18Value', URL18Value);
});
$('[name = "texturl18"]').keyup(function() {
var URL18TextValue = this.value;
$("#url18").html(URL18TextValue);
GM_setValue('URL18TextValue', URL18TextValue);
});
$('[name = "barurl19"]').keyup(function() {
var URL19Value = this.value;
$('#url19').attr("href", URL19Value);
GM_setValue('URL19Value', URL19Value);
});
$('[name = "texturl19"]').keyup(function() {
var URL19TextValue = this.value;
$("#url19").html(URL19TextValue);
GM_setValue('URL19TextValue', URL19TextValue);
});
$('[name = "barurl20"]').keyup(function() {
var URL20Value = this.value;
$('#url20').attr("href", URL20Value);
GM_setValue('URL20Value', URL20Value);
});
$('[name = "texturl20"]').keyup(function() {
var URL20TextValue = this.value;
$("#url20").html(URL20TextValue);
GM_setValue('URL20TextValue', URL20TextValue);
});
$(document).ready(function(){
//url1
var URL1Value = GM_getValue('URL1Value', URL1Value);
$('[name = "barurl1"]').val(URL1Value);
$('#url1').attr("href", URL1Value);
var URL1TextValue = GM_getValue('URL1TextValue', URL1TextValue);
$('[name = "texturl1"]').val(URL1TextValue);
$("#url1").html(URL1TextValue);
//url2
var URL2Value = GM_getValue('URL2Value', URL2Value);
$('[name = "barurl2"]').val(URL2Value);
$('#url2').attr("href", URL2Value);
var URL2TextValue = GM_getValue('URL2TextValue', URL2TextValue);
$('[name = "texturl2"]').val(URL2TextValue);
$("#url2").html(URL2TextValue);
//url3
var URL3Value = GM_getValue('URL3Value', URL3Value);
$('[name = "barurl3"]').val(URL3Value);
$('#url3').attr("href", URL3Value);
var URL3TextValue = GM_getValue('URL3TextValue', URL3TextValue);
$('[name = "texturl3"]').val(URL3TextValue);
$("#url3").html(URL3TextValue);
//url4
var URL4Value = GM_getValue('URL4Value', URL4Value);
$('[name = "barurl4"]').val(URL4Value);
$('#url4').attr("href", URL4Value);
var URL4TextValue = GM_getValue('URL4TextValue', URL4TextValue);
$('[name = "texturl4"]').val(URL4TextValue);
$("#url4").html(URL4TextValue);
//url5
var URL5Value = GM_getValue('URL5Value', URL5Value);
$('[name = "barurl5"]').val(URL5Value);
$('#url5').attr("href", URL5Value);
var URL5TextValue = GM_getValue('URL5TextValue', URL5TextValue);
$('[name = "texturl5"]').val(URL5TextValue);
$("#url5").html(URL5TextValue);
//url6
var URL6Value = GM_getValue('URL6Value', URL6Value);
$('[name = "barurl6"]').val(URL6Value);
$('#url6').attr("href", URL6Value);
var URL6TextValue = GM_getValue('URL6TextValue', URL6TextValue);
$('[name = "texturl6"]').val(URL6TextValue);
$("#url6").html(URL6TextValue);
//url7
var URL7Value = GM_getValue('URL7Value', URL7Value);
$('[name = "barurl7"]').val(URL7Value);
$('#url7').attr("href", URL7Value);
var URL7TextValue = GM_getValue('URL7TextValue', URL7TextValue);
$('[name = "texturl7"]').val(URL7TextValue);
$("#url7").html(URL7TextValue);
//url8
var URL8Value = GM_getValue('URL8Value', URL8Value);
$('[name = "barurl8"]').val(URL8Value);
$('#url8').attr("href", URL8Value);
var URL8TextValue = GM_getValue('URL8TextValue', URL8TextValue);
$('[name = "texturl8"]').val(URL8TextValue);
$("#url8").html(URL8TextValue);
//url9
var URL9Value = GM_getValue('URL9Value', URL9Value);
$('[name = "barurl9"]').val(URL9Value);
$('#url9').attr("href", URL9Value);
var URL9TextValue = GM_getValue('URL9TextValue', URL9TextValue);
$('[name = "texturl9"]').val(URL9TextValue);
$("#url9").html(URL9TextValue);
//url10
var URL10Value = GM_getValue('URL10Value', URL10Value);
$('[name = "barurl10"]').val(URL10Value);
$('#url10').attr("href", URL10Value);
var URL10TextValue = GM_getValue('URL10TextValue', URL10TextValue);
$('[name = "texturl10"]').val(URL10TextValue);
$("#url10").html(URL10TextValue);
//url11
var URL11Value = GM_getValue('URL11Value', URL11Value);
$('[name = "barurl11"]').val(URL11Value);
$('#url11').attr("href", URL11Value);
var URL11TextValue = GM_getValue('URL11TextValue', URL11TextValue);
$('[name = "texturl11"]').val(URL11TextValue);
$("#url11").html(URL11TextValue);
//url12
var URL12Value = GM_getValue('URL12Value', URL12Value);
$('[name = "barurl12"]').val(URL12Value);
$('#url12').attr("href", URL12Value);
var URL12TextValue = GM_getValue('URL12TextValue', URL12TextValue);
$('[name = "texturl12"]').val(URL12TextValue);
$("#url12").html(URL12TextValue);
//url13
var URL13Value = GM_getValue('URL13Value', URL13Value);
$('[name = "barurl13"]').val(URL13Value);
$('#url13').attr("href", URL13Value);
var URL13TextValue = GM_getValue('URL13TextValue', URL13TextValue);
$('[name = "texturl13"]').val(URL13TextValue);
$("#url13").html(URL13TextValue);
//url14
var URL14Value = GM_getValue('URL14Value', URL14Value);
$('[name = "barurl14"]').val(URL14Value);
$('#url14').attr("href", URL14Value);
var URL14TextValue = GM_getValue('URL14TextValue', URL14TextValue);
$('[name = "texturl14"]').val(URL14TextValue);
$("#url14").html(URL14TextValue);
//url15
var URL15Value = GM_getValue('URL15Value', URL15Value);
$('[name = "barurl15"]').val(URL15Value);
$('#url15').attr("href", URL15Value);
var URL15TextValue = GM_getValue('URL15TextValue', URL15TextValue);
$('[name = "texturl15"]').val(URL15TextValue);
$("#url15").html(URL15TextValue);
//url16
var URL16Value = GM_getValue('URL16Value', URL16Value);
$('[name = "barurl16"]').val(URL16Value);
$('#url16').attr("href", URL16Value);
var URL16TextValue = GM_getValue('URL16TextValue', URL16TextValue);
$('[name = "texturl16"]').val(URL16TextValue);
$("#url16").html(URL16TextValue);
//url17
var URL17Value = GM_getValue('URL17Value', URL17Value);
$('[name = "barurl17"]').val(URL17Value);
$('#url17').attr("href", URL17Value);
var URL17TextValue = GM_getValue('URL17TextValue', URL17TextValue);
$('[name = "texturl17"]').val(URL17TextValue);
$("#url17").html(URL17TextValue);
//url18
var URL18Value = GM_getValue('URL18Value', URL18Value);
$('[name = "barurl18"]').val(URL18Value);
$('#url18').attr("href", URL18Value);
var URL18TextValue = GM_getValue('URL18TextValue', URL18TextValue);
$('[name = "texturl18"]').val(URL18TextValue);
$("#url18").html(URL18TextValue);
//url19
var URL19Value = GM_getValue('URL19Value', URL19Value);
$('[name = "barurl19"]').val(URL19Value);
$('#url19').attr("href", URL19Value);
var URL19TextValue = GM_getValue('URL19TextValue', URL19TextValue);
$('[name = "texturl19"]').val(URL19TextValue);
$("#url19").html(URL19TextValue);
//url20
var URL20Value = GM_getValue('URL20Value', URL20Value);
$('[name = "barurl20"]').val(URL20Value);
$('#url20').attr("href", URL20Value);
var URL20TextValue = GM_getValue('URL20TextValue', URL20TextValue);
$('[name = "texturl20"]').val(URL20TextValue);
$("#url20").html(URL20TextValue);
});

//when option is clicked do...	
$( "#URL1Display" ).click(function() {
if($('#URL1Display').is(':checked')){GM_setValue('URL1Display', false);$("#url1").css("display", "inline");}
else {GM_setValue('URL1Display', true);$("#url1").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL1Display', false)){$("#url1").css("display", "none");}
else{$('#URL1Display').prop('checked', true);$("#url1").css("display", "inline");}
});
//url2 display
$( "#URL2Display" ).click(function() {
if($('#URL2Display').is(':checked')){GM_setValue('URL2Display', false);$("#url2").css("display", "inline");}
else {GM_setValue('URL2Display', true);$("#url2").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL2Display', false)){$("#url2").css("display", "none");}
else{$('#URL2Display').prop('checked', true);$("#url2").css("display", "inline");}
});
//url3 display
$( "#URL3Display" ).click(function() {
if($('#URL3Display').is(':checked')){GM_setValue('URL3Display', false);$("#url3").css("display", "inline");}
else {GM_setValue('URL3Display', true);$("#url3").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL3Display', false)){$("#url3").css("display", "none");}
else{$('#URL3Display').prop('checked', true);$("#url3").css("display", "inline");}
});
//url4 display
$( "#URL4Display" ).click(function() {
if($('#URL4Display').is(':checked')){GM_setValue('URL4Display', false);$("#url4").css("display", "inline");}
else {GM_setValue('URL4Display', true);$("#url4").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL4Display', false)){$("#url4").css("display", "none");}
else{$('#URL4Display').prop('checked', true);$("#url4").css("display", "inline");}
});
//url5 display
$( "#URL5Display" ).click(function() {
if($('#URL5Display').is(':checked')){GM_setValue('URL5Display', false);$("#url5").css("display", "inline");}
else {GM_setValue('URL5Display', true);$("#url5").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL5Display', false)){$("#url5").css("display", "none");}
else{$('#URL5Display').prop('checked', true);$("#url5").css("display", "inline");}
});
//url6 display
$( "#URL6Display" ).click(function() {
if($('#URL6Display').is(':checked')){GM_setValue('URL6Display', false);$("#url6").css("display", "inline");}
else {GM_setValue('URL6Display', true);$("#url6").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL6Display', false)){$("#url6").css("display", "none");}
else{$('#URL6Display').prop('checked', true);$("#url6").css("display", "inline");}
});
//url7 display
$( "#URL7Display" ).click(function() {
if($('#URL7Display').is(':checked')){GM_setValue('URL7Display', false);$("#url7").css("display", "inline");}
else {GM_setValue('URL7Display', true);$("#url7").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL7Display', false)){$("#url7").css("display", "none");}
else{$('#URL7Display').prop('checked', true);$("#url7").css("display", "inline");}
});
//url8 display
$( "#URL8Display" ).click(function() {
if($('#URL8Display').is(':checked')){GM_setValue('URL8Display', false);$("#url8").css("display", "inline");}
else {GM_setValue('URL8Display', true);$("#url8").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL8Display', false)){$("#url8").css("display", "none");}
else{$('#URL8Display').prop('checked', true);$("#url8").css("display", "inline");}
});
//url9 display
$( "#URL9Display" ).click(function() {
if($('#URL9Display').is(':checked')){GM_setValue('URL9Display', false);$("#url9").css("display", "inline");}
else {GM_setValue('URL9Display', true);$("#url9").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL9Display', false)){$("#url9").css("display", "none");}
else{$('#URL9Display').prop('checked', true);$("#url9").css("display", "inline");}
});
//url10 display
$( "#URL10Display" ).click(function() {
if($('#URL10Display').is(':checked')){GM_setValue('URL10Display', false);$("#url10").css("display", "inline");}
else {GM_setValue('URL10Display', true);$("#url10").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL10Display', false)){$("#url10").css("display", "none");}
else{$('#URL10Display').prop('checked', true);$("#url10").css("display", "inline");}
});
//url11 display
$( "#URL11Display" ).click(function() {
if($('#URL11Display').is(':checked')){
GM_setValue('URL11Display', true);
$("#url11").css("display", "inline");
}
else {
GM_setValue('URL11Display', false);
$("#url11").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL11Display', true)){
$("#url11").css("display", "inline");
$('#URL11Display').prop('checked', true);
}
else{
$("#url11").css("display", "none");
$('#URL11Display').prop('checked', false);}
});
//url12 display
$( "#URL12Display" ).click(function() {
if($('#URL12Display').is(':checked')){
GM_setValue('URL12Display', true);
$("#url12").css("display", "inline");
}
else {
GM_setValue('URL12Display', false);
$("#url12").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL12Display', true)){
$("#url12").css("display", "inline");
$('#URL12Display').prop('checked', true);
}
else{
$("#url12").css("display", "none");
$('#URL12Display').prop('checked', false);}
});
//url13 display
$( "#URL13Display" ).click(function() {
if($('#URL13Display').is(':checked')){
GM_setValue('URL13Display', true);
$("#url13").css("display", "inline");
}
else {
GM_setValue('URL13Display', false);
$("#url13").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL13Display', true)){
$("#url13").css("display", "inline");
$('#URL13Display').prop('checked', true);
}
else{
$("#url13").css("display", "none");
$('#URL13Display').prop('checked', false);}
});
//url14 display
$( "#URL14Display" ).click(function() {
if($('#URL14Display').is(':checked')){
GM_setValue('URL14Display', true);
$("#url14").css("display", "inline");
}
else {
GM_setValue('URL14Display', false);
$("#url14").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL14Display', true)){
$("#url14").css("display", "inline");
$('#URL14Display').prop('checked', true);
}
else{
$("#url14").css("display", "none");
$('#URL14Display').prop('checked', false);}
});
//url15 display
$( "#URL15Display" ).click(function() {
if($('#URL15Display').is(':checked')){
GM_setValue('URL15Display', true);
$("#url15").css("display", "inline");
}
else {
GM_setValue('URL15Display', false);
$("#url15").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL15Display', true)){
$("#url15").css("display", "inline");
$('#URL15Display').prop('checked', true);
}
else{
$("#url15").css("display", "none");
$('#URL15Display').prop('checked', false);}
});
//url16 display
$( "#URL16Display" ).click(function() {
if($('#URL16Display').is(':checked')){
GM_setValue('URL16Display', true);
$("#url16").css("display", "inline");
}
else {
GM_setValue('URL16Display', false);
$("#url16").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL16Display', true)){
$("#url16").css("display", "inline");
$('#URL16Display').prop('checked', true);
}
else{
$("#url16").css("display", "none");
$('#URL16Display').prop('checked', false);}
});
//url17 display
$( "#URL17Display" ).click(function() {
if($('#URL17Display').is(':checked')){
GM_setValue('URL17Display', true);
$("#url17").css("display", "inline");
}
else {
GM_setValue('URL17Display', false);
$("#url17").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL17Display', true)){
$("#url17").css("display", "inline");
$('#URL17Display').prop('checked', true);
}
else{
$("#url17").css("display", "none");
$('#URL17Display').prop('checked', false);}
});
//url18 display
$( "#URL18Display" ).click(function() {
if($('#URL18Display').is(':checked')){
GM_setValue('URL18Display', true);
$("#url18").css("display", "inline");
}
else {
GM_setValue('URL18Display', false);
$("#url18").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL18Display', true)){
$("#url18").css("display", "inline");
$('#URL18Display').prop('checked', true);
}
else{
$("#url18").css("display", "none");
$('#URL18Display').prop('checked', false);}
});
//url19 display
$( "#URL19Display" ).click(function() {
if($('#URL19Display').is(':checked')){
GM_setValue('URL19Display', true);
$("#url19").css("display", "inline");
}
else {
GM_setValue('URL19Display', false);
$("#url19").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL19Display', true)){
$("#url19").css("display", "inline");
$('#URL19Display').prop('checked', true);
}
else{
$("#url19").css("display", "none");
$('#URL19Display').prop('checked', false);}
});
//url20 display
$( "#URL20Display" ).click(function() {
if($('#URL20Display').is(':checked')){
GM_setValue('URL20Display', true);
$("#url20").css("display", "inline");
}
else {
GM_setValue('URL20Display', false);
$("#url20").css("display", "none");}
});
$(document).ready(function(){
if (GM_getValue('URL20Display', true)){
$("#url20").css("display", "inline");
$('#URL20Display').prop('checked', true);
}
else{
$("#url20").css("display", "none");
$('#URL20Display').prop('checked', false);}
});

//html for bar
var divBlackBar = '<div id="Black_Nav_Bar">' 
+ '<ul id=GNav>'
+ '<li class="bar"><a id="url1" href=""></a></li>' 
+ '<li class="bar"><a id="url2" href=""></a></li>' 
+ '<li class="bar"><a id="url3" href=""></a></li>' 
+ '<li class="bar"><a id="url4" href=""></a></li>' 
+ '<li class="bar"><a id="url5" href=""></a></li>' 
+ '<li class="bar"><a id="url6" href=""></a></li>' 
+ '<li class="bar"><a id="url7" href=""></a></li>' 
+ '<li class="bar"><a id="url8" href=""></a></li>'
+ '<li class="bar"><a id="url9" href=""></a></li>' 
+ '<li class="bar"><a id="url10" href=""></a></li>' 
+ '<li class="bar"><a id="url11" href=""></a></li>' 
+ '<li class="bar"><a id="url12" href=""></a></li>'
+ '<li class="bar"><a id="url13" href=""></a></li>' 
+ '<li class="bar"><a id="url14" href=""></a></li>' 
+ '<li class="bar"><a id="url15" href=""></a></li>' 
+ '<li class="bar"><a id="url16" href=""></a></li>'
+ '<li class="bar"><a id="url17" href=""></a></li>' 
+ '<li class="bar"><a id="url18" href=""></a></li>' 
+ '<li class="bar"><a id="url19" href=""></a></li>' 
+ '<li class="bar"><a id="url20" href=""></a></li>'
+ '</ul>'
+ ''+GearIcon+''
+'</div>';

$('html').append(divBlackBar);

$("#default").click(function() {
//url1
$('[name = "barurl1"]').val("https://plus.google.com/");
$('#url1').attr("href", "https://plus.google.com/");
$('[name = "texturl1"]').val("+You");
$("#url1").html("+You");
//url2
$('[name = "barurl2"]').val("https://www.google.com/webhp");
$('#url2').attr("href", "https://www.google.com/webhp");
$('[name = "texturl2"]').val("Search");
$("#url2").html("Search");
//url3
$('[name = "barurl3"]').val("http://www.google.com/imghp");
$('#url3').attr("href", "http://www.google.com/imghp");
$('[name = "texturl3"]').val("Images");
$("#url3").html("Images");
//url4
$('[name = "barurl4"]').val("https://www.google.com/maps");
$('#url4').attr("href", "https://www.google.com/maps");
$('[name = "texturl4"]').val("Maps");
$("#url4").html("Maps");
//url5
$('[name = "barurl5"]').val("https://play.google.com/");
$('#url5').attr("href", "https://play.google.com/");
$('[name = "texturl5"]').val("Play");
$("#url5").html("Play");
//url6
$('[name = "barurl6"]').val("http://www.youtube.com/");
$('#url6').attr("href", "http://www.youtube.com/");
$('[name = "texturl6"]').val("YouTube");
$("#url6").html("YouTube");
//url7
$('[name = "barurl7"]').val("https://news.google.com/");
$('#url7').attr("href", "https://news.google.com/");
$('[name = "texturl7"]').val("News");
$("#url7").html("News");
//url8
$('[name = "barurl8"]').val("https://mail.google.com/");
$('#url8').attr("href", "https://mail.google.com/");
$('[name = "texturl8"]').val("Gmail");
$("#url8").html("Gmail");
//url9
$('[name = "barurl9"]').val("https://drive.google.com/");
$('#url9').attr("href", "https://drive.google.com/");
$('[name = "texturl9"]').val("Drive");
$("#url9").html("Drive");
//url10
$('[name = "barurl10"]').val("https://www.google.com/calendar");
$('#url10').attr("href", "https://www.google.com/calendar");
$('[name = "texturl10"]').val("Calendar");
$("#url10").html("Calendar");
//url11
$('[name = "barurl11"]').val("");
$('#url11').attr("href", "");
$('[name = "texturl11"]').val("");
$("#url11").html("");
//url12
$('[name = "barurl12"]').val("");
$('#url12').attr("href", "");
$('[name = "texturl12"]').val("");
$("#url12").html("");
//url13
$('[name = "barurl13"]').val("");
$('#url13').attr("href", "");
$('[name = "texturl13"]').val("");
$("#url13").html("");
//url14
$('[name = "barurl14"]').val("");
$('#url14').attr("href", "");
$('[name = "texturl14"]').val("");
$("#url14").html("");
//url15
$('[name = "barurl15"]').val("");
$('#url15').attr("href", "");
$('[name = "texturl15"]').val("");
$("#url15").html("");
//url16
$('[name = "barurl16"]').val("");
$('#url16').attr("href", "");
$('[name = "texturl16"]').val("");
$("#url16").html("");
//url17
$('[name = "barurl17"]').val("");
$('#url17').attr("href", "");
$('[name = "texturl17"]').val("");
$("#url17").html("");
//url18
$('[name = "barurl18"]').val("");
$('#url18').attr("href", "");
$('[name = "texturl18"]').val("");
$("#url18").html("");
//url19
$('[name = "barurl19"]').val("");
$('#url19').attr("href", "");
$('[name = "texturl19"]').val("");
$("#url19").html("");
//url20
$('[name = "barurl20"]').val("");
$('#url20').attr("href", "");
$('[name = "texturl20"]').val("");
$("#url20").html("");
GM_setValue('DefaultScript', '1')
GM_setValue('URL1Value', 'https://plus.google.com/');
GM_setValue('URL1TextValue', '+You');
GM_setValue('URL2Value', 'https://www.google.com/webhp');
GM_setValue('URL2TextValue', 'Search');
GM_setValue('URL3Value', 'http://www.google.com/imghp');
GM_setValue('URL3TextValue', 'Images');
GM_setValue('URL4Value', 'https://www.google.com/maps');
GM_setValue('URL4TextValue', 'Maps');
GM_setValue('URL5Value', 'https://play.google.com/');
GM_setValue('URL5TextValue', 'Play');
GM_setValue('URL6Value', 'http://www.youtube.com/');
GM_setValue('URL6TextValue', 'YouTube');
GM_setValue('URL7Value', 'https://news.google.com/');
GM_setValue('URL7TextValue', 'News');
GM_setValue('URL8Value', 'https://mail.google.com/');
GM_setValue('URL8TextValue', 'Gmail');
GM_setValue('URL9Value', 'https://drive.google.com/');
GM_setValue('URL9TextValue', 'Drive');
GM_setValue('URL10Value', 'https://www.google.com/calendar');
GM_setValue('URL10TextValue', 'Calendar');
GM_setValue('URL11Value', '');
GM_setValue('URL11TextValue', '');
GM_setValue('URL12Value', '');
GM_setValue('URL12TextValue', '');
GM_setValue('URL13Value', '');
GM_setValue('URL13TextValue', '');
GM_setValue('URL14Value', '');
GM_setValue('URL14TextValue', '');
GM_setValue('URL15Value', '');
GM_setValue('URL15TextValue', '');
GM_setValue('URL16Value', '');
GM_setValue('URL16TextValue', '');
GM_setValue('URL17Value', '');
GM_setValue('URL17TextValue', '');
GM_setValue('URL18Value', '');
GM_setValue('URL18TextValue', '');
GM_setValue('URL19Value', '');
GM_setValue('URL19TextValue', '');
GM_setValue('URL20Value', '');
GM_setValue('URL20TextValue', '');
GM_setValue('BGColor', 'Grey');
GM_setValue('LColor', 'Grey');
GM_setValue('URL1Display', false);
$('#URL1Display').prop('checked', true);
GM_setValue('URL2Display', false);
$('#URL2Display').prop('checked', true);
GM_setValue('URL3Display', false);
$('#URL3Display').prop('checked', true);
GM_setValue('URL4Display', false);
$('#URL4Display').prop('checked', true);
GM_setValue('URL5Display', false);
$('#URL5Display').prop('checked', true);
GM_setValue('URL6Display', false);
$('#URL6Display').prop('checked', true);
GM_setValue('URL7Display', false);
$('#URL7Display').prop('checked', true);
GM_setValue('URL8Display', false);
$('#URL8Display').prop('checked', true);
GM_setValue('URL9Display', false);
$('#URL9Display').prop('checked', true);
GM_setValue('URL10Display', false);
$('#URL10Display').prop('checked', true);
GM_setValue('URL11Display', false);
$('#URL11Display').prop('checked', false);
GM_setValue('URL12Display', false);
$('#URL12Display').prop('checked', false);
GM_setValue('URL13Display', false);
$('#URL13Display').prop('checked', false);
GM_setValue('URL14Display', false);
$('#URL14Display').prop('checked', false);
GM_setValue('URL15Display', false);
$('#URL15Display').prop('checked', false);
GM_setValue('URL16Display', false);
$('#URL16Display').prop('checked', false);
GM_setValue('URL17Display', false);
$('#URL17Display').prop('checked', false);
GM_setValue('URL18Display', false);
$('#URL18Display').prop('checked', false);
GM_setValue('URL19Display', false);
$('#URL19Display').prop('checked', false);
GM_setValue('URL20Display', false);
$('#URL20Display').prop('checked', false);
$(".bar a").removeClass('LGrey LBlack LBlue LBrown LGreen LOrange LPink LPurple LRed LWhite LYellow');
$(".bar a").addClass('LGrey');
$("#Black_Nav_Bar").removeClass(''+RemoveBGClass+'');
$("#Black_Nav_Bar .bar").removeClass('LBGGrey LBGBlack LBGBlue LBGBrown LBGGreen LBGOrange LBGPink LBGPurple LBGRed LBGWhite LBGYellow');
$("#Black_Nav_Bar").addClass('BGGrey');
$("#Black_Nav_Bar .bar").addClass('LBGGrey');
});
});

