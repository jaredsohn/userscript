// ==UserScript==
// @author	    ThePatrollPL
// @name        Google Pony Doodle 1.0.0
// @version     1.0.0
// @description Ponify your favourite search engine!
// @run-at 		document-start
// @include     *google*
// @include		*://www.*.google.*/*
// @include     http*://www.google.tld/*
// @include     http*://www.translate.google*.tld/*
// @exclude     http*://plus.google.com/u/0/_/notifications/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

/*
 === Changelog ===
v1.0.0 - April 2014
	- First public version
*/


(function(){
console.log("%c [GOOGLE PONY DOODLE] is active for URL: '"+window.location.href+"' ", "background: rgba(10,90,256,0.4); font-size: 12px;font-weight:bold;");

function gpdrandom(min, max){
if (min < 0) {return Math.floor(min + Math.random() * (Math.abs(min)+max));}
else{return Math.floor(min + Math.random() * max);}
}

//-------------- LOAD SETTINGS ------------------------------------------------------
function load_settings(){
	// Load variables
	if(typeof(GM_getValue("gpd_background_id")) === "undefined"){GM_setValue("gpd_background_id","")}
	if(typeof(GM_getValue("gpd_background_url")) === "undefined"){GM_setValue("gpd_background_url","")}
	if(typeof(GM_getValue("gpd_logo_id")) === "undefined"){GM_setValue("gpd_logo_id","")}
	if(typeof(GM_getValue("gpd_topnavTextColor")) === "undefined"){GM_setValue("gpd_topnavTextColor","")}
	if(typeof(GM_getValue("gpd_footerColor")) === "undefined"){GM_setValue("gpd_footerColor","")}
	if(typeof(GM_getValue("gpd_footerTransp")) === "undefined"){GM_setValue("gpd_footerTransp","1")}
	if(typeof(GM_getValue("gpd_footerText")) === "undefined"){GM_setValue("gpd_footerText","1")}
	gpd_current_logo = GM_getValue("gpd_logo_id");
	gpd_current_background = GM_getValue("gpd_background_id");
	gpd_current_background_url = GM_getValue("gpd_background_url");
	gpd_topnavTextColor = GM_getValue("gpd_topnavTextColor");
	gpd_footerColor = GM_getValue("gpd_footerColor");
	gpd_footerTransp = GM_getValue("gpd_footerTransp");
	gpd_footerText = GM_getValue("gpd_footerText");
	
	// Add ponyfied style
	$(document).ready(function () {
		gpd_current_logo2 = gpd_current_logo;
		if(gpd_current_logo == "random"){gpd_current_logo2 = gpdrandom(0,logo_big.length)}
		$("#gpd_style1").remove(); $("#gpd_style2").remove(); $("#gpd_style3").remove(); $("#gpd_style4").remove(); $("#gpd_style5").remove();
		
		if(gpd_current_logo != ""){
			$("<style id="+'"gpd_style1"'+">\
			#hplogo *{display:none;}\
			div#hplogo{background:url("+logo_big[gpd_current_logo2]+")!important;background-size: cover!important;height:152px!important;width:390px!important;margin-top:-40px;}\
			#lga{margin-top: 130px!important;}\
			#lga div:nth-child(1){padding-top:0px!important;}\
			#gbq1 span:last-child{background-image:url("+logo_small[gpd_current_logo2]+")!important;background-position: center!important;background-size:cover!important;height: 46px!important; width: 115px!important;}\
			#gbq1 .gb_wa{padding:0!important;margin-left:5px;}\
			</style>").appendTo( "head" );
		}
		if ($('div.fbar').length > 0 && gpd_current_background != "" && typeof(gpd_current_background) != "undefined" && gpd_current_background != "custom") {
			$("<style id="+'"gpd_style2"'+">\
			body{background-image:url("+backgrounds[gpd_current_background]+")!important;background-size:cover!important;}\
			.fbar{background:rgba(256,256,256,0.8)!important;}\
			#cnt{background:rgba(256,256,256,0.89)}\
			</style>").appendTo( "head" );
		}
		else if ($('div.fbar').length > 0 && gpd_current_background == "custom" && typeof(gpd_current_background) != "undefined") {
			$("<style id="+'"gpd_style2"'+">\
			body{background-image:url("+gpd_current_background_url+")!important;background-size:cover!important;}\
			.fbar{background:rgba(256,256,256,0.8)!important;}\
			#cnt{background:rgba(256,256,256,0.89)}\
			</style>").appendTo( "head" );
		}
		setInterval(function(){
		if(gpd_footerColor == ""){$(".fbar").attr("style","background:rgba(256,256,256,"+gpd_footerTransp+")!important");}
		else if(gpd_footerColor == "c1"){$(".fbar").attr("style","background:rgba(0,156,255,"+gpd_footerTransp+")!important;");}
		else if(gpd_footerColor == "c2"){$(".fbar").attr("style","background:rgba(255,116,160,"+gpd_footerTransp+")!important;");}
		else if(gpd_footerColor == "c3"){$(".fbar").attr("style","background:rgba(242, 183, 85, "+gpd_footerTransp+")!important;");}
		else if(gpd_footerColor == "c4"){$(".fbar").attr("style","background:rgba(0,0,0,"+gpd_footerTransp+")!important;");}
		else{$(".fbar").attr("style","background:rgba("+gpd_footerColor+","+gpd_footerTransp+")!important");$("#gpd_footer_custom").val(gpd_footerColor)}
		},200)
		if(gpd_footerText == "white") {
			setTimeout(function(){$("#gpd_button").attr("style","background-color: rgba(256,256,256,0.9);border-radius: 10px;")},200)
			$("<style id="+'"gpd_style5"'+">\
			#fbar .fbar a, #fbar .fbar a:active, #fbar .fbar a:hover, #fbar .fbar a:link, #fbar .fbar a:visited{color:white!important;}\
			</style>").appendTo( "head" );
		}
		else{$("#gpd_button").attr("style","")}
		
		if(gpd_topnavTextColor == "white"){gpd_topnavTextColor2 = 9}
		else{gpd_topnavTextColor2 = 0}
		$("<style id="+'"gpd_style3"'+">\
		a[href="+'"https://plus.google.com/u/0/?tab=wX"'+"]{text-align:center;}\
		#gb a.gb_c, #gb a.gb_c:active, #gb a.gb_c:hover, #gb a.gb_c:link, #gb a.gb_c:visited{color:"+gpd_topnavTextColor+"!important;text-shadow: 0 0 7px rgba(0,0,0,0."+gpd_topnavTextColor2+"),0 0 3px rgba(0,0,0,0."+gpd_topnavTextColor2+"),0 0 1px rgba(0,0,0,0."+gpd_topnavTextColor2+");}\
		div[style="+'"min-width: 165px;"'+"]{background-color:rgba(256,256,256,0."+gpd_topnavTextColor2+")!important;padding:5px;border-radius:20px;}\
		</style>").appendTo( "head" );
		
		$("<style id="+'"gpd_style4"'+">\
		img[src="+'"https://www.google.com/images/loading.gif"'+"]{}\
		</style>").appendTo( "head" );
		setTimeout(function(){if(window.location.href.indexOf("newtab") > -1) {
			$("#gpd_style1").remove(); $("#gpd_style2").remove(); $("#gpd_style3").remove(); $("#gpd_style4").remove();
			if(gpd_current_logo != ""){
			console.log("%c [GPD] Looks like an empty tab(newtab), trying to replace logo if #hplogo exists ", "background: rgba(10,256,00,0.2); font-size: 11px;");
			$("#hplogo").attr("src",logo_big[gpd_current_logo2])
			$("#hplogo").attr("style","height: 152px!important; width: 390px!important;margin-top:80px;")}
		}},100)
	})
}
load_settings();
//----------------------------------------

//-------------- VARIABLES ----------------------------------------------------------
var logo_small = new Array();
logo_small[0] = "http://th07.deviantart.net/fs71/200H/f/2013/110/4/f/fluttershy_google_logo__install_guide___by_thepatrollpl-d62c7kr.png";
logo_small[1] = "http://th09.deviantart.net/fs70/200H/f/2013/111/d/6/applejack_google_logo__install_guide___by_thepatrollpl-d62gui3.png";
logo_small[2] = "http://th07.deviantart.net/fs71/200H/f/2013/114/c/6/rainbow_dash_google_logo__install_guide___by_thepatrollpl-d62tid1.png";
logo_small[3] = "http://th08.deviantart.net/fs70/200H/f/2013/119/0/9/pinkie_pie_google_logo__install_guide___by_thepatrollpl-d63hbxt.png";
logo_small[4] = "http://th08.deviantart.net/fs70/200H/f/2013/122/d/8/twilight_sparkle_google_logo__install_guide___by_thepatrollpl-d63v3d2.png";
logo_small[5] = "http://th04.deviantart.net/fs71/200H/f/2013/123/2/3/rarity_google_logo__install_guide___by_thepatrollpl-d63y4af.png";
logo_small[6] = "http://th05.deviantart.net/fs70/200H/f/2013/127/5/f/derpy_hooves_google_logo__install_guide___by_thepatrollpl-d64gq5z.png";
logo_small[7] = "http://th03.deviantart.net/fs71/200H/f/2013/131/5/a/princess_luna_google_logo__install_guide___by_thepatrollpl-d64xb6j.png";
logo_small[8] = "http://th08.deviantart.net/fs71/200H/f/2013/137/2/6/octavia_google_logo__install_guide___by_thepatrollpl-d65les6.png";
logo_small[9] = "http://th05.deviantart.net/fs70/200H/f/2013/189/c/c/spitfire_google_logo__install_guide___by_thepatrollpl-d6chp2o.png";
logo_small[10] = "http://th09.deviantart.net/fs70/200H/f/2013/189/7/f/simple_rainbow_google_logo__install_guide___by_thepatrollpl-d6ci0lz.png";
logo_small[11] = "http://th06.deviantart.net/fs70/200H/f/2013/250/4/5/princess_cadence_google_logo__install_guide___by_thepatrollpl-d6lcs1d.png";
logo_small[12] = "http://th08.deviantart.net/fs70/200H/f/2013/330/f/f/twilight_s_cane_google_logo__install_guide___by_thepatrollpl-d6vp0ce.png";
logo_small[13] = "http://th05.deviantart.net/fs70/200H/f/2014/111/3/5/maud_pie_google_logo__install_guide___by_thepatrollpl-d7ffy79.png";

var logo_big = new Array();
logo_big[0] = "http://th07.deviantart.net/fs71/PRE/f/2013/110/4/f/fluttershy_google_logo__install_guide___by_thepatrollpl-d62c7kr.png";
logo_big[1] = "http://th09.deviantart.net/fs70/PRE/f/2013/111/d/6/applejack_google_logo__install_guide___by_thepatrollpl-d62gui3.png";
logo_big[2] = "http://th07.deviantart.net/fs71/PRE/f/2013/114/c/6/rainbow_dash_google_logo__install_guide___by_thepatrollpl-d62tid1.png";
logo_big[3] = "http://th08.deviantart.net/fs70/PRE/f/2013/119/0/9/pinkie_pie_google_logo__install_guide___by_thepatrollpl-d63hbxt.png";
logo_big[4] = "http://th08.deviantart.net/fs70/PRE/f/2013/122/d/8/twilight_sparkle_google_logo__install_guide___by_thepatrollpl-d63v3d2.png";
logo_big[5] = "http://th04.deviantart.net/fs71/PRE/f/2013/123/2/3/rarity_google_logo__install_guide___by_thepatrollpl-d63y4af.png";
logo_big[6] = "http://th05.deviantart.net/fs70/PRE/f/2013/127/5/f/derpy_hooves_google_logo__install_guide___by_thepatrollpl-d64gq5z.png";
logo_big[7] = "http://th03.deviantart.net/fs71/PRE/f/2013/131/5/a/princess_luna_google_logo__install_guide___by_thepatrollpl-d64xb6j.png";
logo_big[8] = "http://th08.deviantart.net/fs71/PRE/f/2013/137/2/6/octavia_google_logo__install_guide___by_thepatrollpl-d65les6.png";
logo_big[9] = "http://th05.deviantart.net/fs70/PRE/f/2013/189/c/c/spitfire_google_logo__install_guide___by_thepatrollpl-d6chp2o.png";
logo_big[10] = "http://th09.deviantart.net/fs70/PRE/f/2013/189/7/f/simple_rainbow_google_logo__install_guide___by_thepatrollpl-d6ci0lz.png";
logo_big[11] = "http://th06.deviantart.net/fs70/PRE/f/2013/250/4/5/princess_cadence_google_logo__install_guide___by_thepatrollpl-d6lcs1d.png";
logo_big[12] = "http://th08.deviantart.net/fs70/PRE/f/2013/330/f/f/twilight_s_cane_google_logo__install_guide___by_thepatrollpl-d6vp0ce.png";
logo_big[13] = "http://th05.deviantart.net/fs70/PRE/f/2014/111/3/5/maud_pie_google_logo__install_guide___by_thepatrollpl-d7ffy79.png";

var backgrounds = new Array();
backgrounds[0] = "http://th07.deviantart.net/fs70/PRE/i/2012/142/2/7/group_background__1_by_mlp_vector_collabs-d4z15wp.png";
backgrounds[1] = "http://th08.deviantart.net/fs71/PRE/i/2012/172/5/2/mlp_background__rd__s_house_scene__v1_1_by_rcupcake-d4u2k2r.png";
backgrounds[2] = "http://images3.alphacoders.com/210/210199.jpg";
backgrounds[3] = "http://www.youloveit.ru/uploads/gallery/main/437/my_little_pony_wallpaper14.png";
backgrounds[4] = "http://th09.deviantart.net/fs70/PRE/i/2012/176/3/a/night_in_the_everfree_forest_by_tajarnia-d54paf2.png";
backgrounds[5] = "https://derpicdn.net/img/2013/5/1/313562/large.png";
backgrounds[6] = "http://th04.deviantart.net/fs71/PRE/f/2012/346/a/4/sky_rainbowfalls_by_ambassad0r-d5ntkvc.png";
backgrounds[7] = "http://th02.deviantart.net/fs71/PRE/i/2012/134/6/a/sweet_apple_acres__svg__by_stinkehund-d4zr74f.png";
backgrounds[8] = "http://static4.wikia.nocookie.net/__cb20130212033359/mlp/images/6/65/Crystal_Empire_S3E12.png";
backgrounds[9] = "http://images1.wikia.nocookie.net/__cb20111009165103/mlp/images/8/85/Rock_Farm_rainbow_S1E23.png";
//----------------------------------------

//-------------- PREPEARE MAIN CSS ------------------------------------------------
$("<style>\
#gpd_button{width:33px;height:30px;background-image:url(http://i.imgur.com/KdZTfp5.png); background-size:cover; float:left; margin:6px -15px 0px 6px;}\
#gpd_button:hover{cursor:pointer;opacity:0.7;}\
#gpd_menu{display:none;overflow:hidden;position:absolute; z-index:99999999999999; border: 1px solid #999;box-shadow: 0 2px 10px rgba(0,0,0,0.2);width:494px;min-height:485px;bottom:50px;left:10px;background:rgba(256,256,256,0.8);background-image:url(http://i.imgur.com/mplZaET.png); background-repeat: no-repeat; background-position: right bottom;}\
#gpd_menu hr{width:90%;border: 1px solid rgba(0,0,0,0.12);border-top: 0px;}\
#gpd_topnav{width:100%;height:40px;background-color:#f2f2f2;margin-bottom:5px;}\
.gpd_navbtn{height:40px;width:28%;float:left;line-height:40px;text-align:center;color:#666;}\
.gpd_navbtn:nth-child(1){border-bottom:2px solid #00a753;}\
.gpd_navbtn:nth-child(2){border-bottom:2px solid #0089fa;}\
.gpd_navbtn:nth-child(3){border-bottom:2px solid #ffa900;}\
.gpd_navbtn:nth-child(4){border-bottom:2px solid #ff002b;width:16%!important;opacity:0.7;}\
.gpd_navbtn:hover{background-color:rgba(0,0,0,0.05);cursor:pointer;}\
.gpd_section{height: 405px;}\
.gpd_logo{text-shadow: 0 0 5px rgba(0,0,0,0.7),0 0 3px rgba(0,0,0,0.6);background-color:rgba(256,256,256,0.8);color:#fff;font-size:25px;line-height:65px;text-align:center;width:155px;height:65px;border:1px #bbb solid;float:left;margin:3px 3.5px;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;}\
.gpd_logo:hover{cursor:pointer;outline:3px solid #0089fa;border:1px solid rgba(0,0,0,0);}\
.gpd_btn{min-height:25px;cursor:pointer;color:#fff!important;text-decoration: none!important;background: #357ae8!important;border-color: #2f5bb7!important;border: 1px solid #c6c6c6!important;display: inline-block!important;line-height: 25px!important;padding: 0 13px!important;-webkit-border-radius: 2px!important;border-radius: 2px!important;border-color: #3079ed!important;font-weight: bold!important;margin: 2px 2px 0 2px!important;}\
.gpd_btn:hover{background-color:#3069ed!important;border-color:rgba(0,0,0,0.1)!important;}\
#gpd_custombck_popup{position:absolute;top:200px;left:35px;background:white;padding:5px 10px;border-radius:4px;border: 2px solid #3079ed;width:400px;text-align:center;box-shadow: 0 2px 10px rgba(0,0,0,0.2);}\
#gpd_custombck_popup input{width:95%;margin-top:10px;}\
#gpd_section4{text-align:center;}\
.gpd_botnav{position:absolute;background-color:#f2f2f2;line-height:32px;height:32px;position:absolute;bottom:0px;left:0px;width:100%;text-align:center;}\
.gpd_frame{background-color:rgba(256,256,256,0.5);padding:5px;border:2px solid #356ae8;width:45%;border-radius:5px;text-align:center;margin:2px 5px;float:left;}\
.gpd_frame2{background-color:rgba(256,256,256,0.5);padding:5px;border:2px solid #356ae8;width:95%;border-radius:5px;text-align:center;margin:2px 5px;float:left;}\
.fbar{border-top:none!important;}\
</style>").appendTo( "head" )
//----------------------------------------
$(document).ready(function () {
//-------------- CREATE MENU -----------------------------------------------------
$( '<div id="gpd_button"></div>' ).prependTo( "#fbar" );
$( '<div id="gpd_menu"></div> ' ).prependTo( "#fbar" );
$( '<div id="fb-root"></div>\
<script>(function(d, s, id) {\
  var js, fjs = d.getElementsByTagName(s)[0];\
  if (d.getElementById(id)) return;\
  js = d.createElement(s); js.id = id;\
  js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1&appId=1475714999322167";\
  fjs.parentNode.insertBefore(js, fjs);\
}(document, '+'"script"'+', '+'"facebook-jssdk"'+'));\
</script>' ).prependTo( "body" );
//----------------------------------------

//-------------- PREPARE MENU ----------------------------------------------------
$("#gpd_menu").html('\
<div id="gpd_topnav">\
	<div id="gpd_btn1" class="gpd_navbtn">Logo</div>\
	<div id="gpd_btn2" class="gpd_navbtn">Background</div>\
	<div id="gpd_btn3" class="gpd_navbtn">Other</div>\
	<div id="gpd_btn4" class="gpd_navbtn">About</div>\
</div>\
<div id="gpd_custombck_popup" style="display:none;">\
	Paste an URL to a custom background </br><input id="gpd_custombck_url" type="text" placeholder="ex. http://somepage.com/foo/dir/image.png/"></input></br><a id="gpd_custombck_btn" class="gpd_btn">SET</a><a id="gpd_btnclose" onclick="$('+"'#gpd_custombck_popup'"+').fadeOut(100)" class="gpd_btn">Close</a>\
</div>\
<div id="gpd_section1" class="gpd_section">\
	<div id="gpd_logo_none" class="gpd_logo">None</div>\
	<div id="gpd_logo_random" class="gpd_logo" style="background-image:url(http://i.imgur.com/qn0XHf9.png); background-position:center;background-size:66px 66px!important;">Random</div>\
</div>\
<div id="gpd_section2" class="gpd_section" style="display:none;">\
	<div id="gpd_background_none" class="gpd_logo">None</div>\
	<div id="gpd_background_custom" style="background-image:url(http://i.imgur.com/I1zxZVH.png); background-position:center;background-size:50px 50px!important;" class="gpd_logo">Custom</div>\
</div>\
<div id="gpd_section3" class="gpd_section" style="display:none;">\
	<div class="gpd_frame2">\
		Navbar color <a id="gpd_tnc_default" class="gpd_btn">Default</a><a id="gpd_tnc_white" class="gpd_btn">White</a>\
	</div>\
	<div class="gpd_frame2">\
		Footer color <a id="gpd_footer_default" class="gpd_btn">Default</a><a id="gpd_footer_c1" class="gpd_btn" style="background: rgba(0,156,255,1)!important;">#</a><a id="gpd_footer_c2" class="gpd_btn" style="background: rgba(255, 116, 160, 1)!important;">#</a><a id="gpd_footer_c3" class="gpd_btn" style="background: rgba(242, 183, 85,  1)!important;">#</a><a id="gpd_footer_c4" class="gpd_btn" style="background: rgba(0, 0, 0,  1)!important;">#</a></br>\
		Custom RGB color <input style="height:19px;width:132px;" id="gpd_footer_custom" type="text" placeholder="ex. 153,63,42"></input><a id="gpd_footer_ccustom" class="gpd_btn">Set</a></br>\
		Transparency <a id="gpd_footer_transp1" class="gpd_btn">0%</a><a id="gpd_footer_transp2" class="gpd_btn">20%</a><a id="gpd_footer_transp3" class="gpd_btn">40%</a><a id="gpd_footer_transp4" class="gpd_btn">60%</a><a id="gpd_footer_transp5" class="gpd_btn">80%</a><a id="gpd_footer_transp6" class="gpd_btn">100%</a></br>\
		<hr style="margin:4px auto!important;">Footer text <a id="gpd_footer_text1" class="gpd_btn">Default</a><a id="gpd_footer_text2" class="gpd_btn">White</a>\
	</div>\
	<a id="gpd_reset" class="gpd_btn" style="position:absolute;bottom:20px;left:200px">RESET ALL</a>\
</div>\
<div id="gpd_section4" class="gpd_section" style="display:none;">\
	<h2>Google Pony Doodle</h2>\
	<b>Version</b> 1.0.0</br>\
	Script and logos created by <a style="margin:0;" href="http://www.thepatrollpl.deviantart.com/">Patroll</a>\
	</br></br><hr></br>\
	<div class="gpd_frame2" style="text-align:center;margin-bottom:30px;">\
	<b style="font-size:16px;margin-bottom:8px;">Google Pony Doodle on Facebook!</b></br>\
	<div class="fb-like" data-href="https://www.facebook.com/pages/Google-Pony-Doodle/1386073228325368" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>\
	</div>\
	</br></br>Check out the gallery of the logos and their descriptions for credits\
	</br><a class="gpd_btn" href="http://thepatrollpl.deviantart.com/gallery/43270585">DeviantArt Gallery</a>\
</div>\
')
//----------------------------------------
});
//-------------- LIST LOGOS AND BACKGROUNDS --------------------------------------
$(document).ready(function () {
for(i=0;i<logo_small.length;i++){
	$("#gpd_section1").append('<div id="'+i+'" data-logoid="'+i+'" style="background-image:url('+logo_small[i]+');" class="gpd_logo"></div>')
}
for(i=0;i<backgrounds.length;i++){
    $("#gpd_section2").append('<div id="bck'+i+'" data-backid="'+i+'" style="background-image:url('+backgrounds[i]+');" class="gpd_logo"></div>')
}})
//----------------------------------------

//-------------- ON LOAD ----------------------------------------------------------
$(document).ready(function () {
if($("#fbar").length != 0){console.log("%c [GPD] #Fbar element spotted, script menu should be created ", "background: rgba(10,256,00,0.2); font-size: 11px;");}
else{console.log("%c [GPD] #Fbar element does NOT seem to exist, script menu won't be created ", "background: rgba(250,50,16,0.3); font-size: 11px;");}
if(gpd_current_background != "none"){console.log("%c [GPD] Custom background is set ["+gpd_current_background+"]", "background: rgba(10,256,00,0.2); font-size: 11px;");}
else{console.log("%c [GPD] Custom background is NOT set ", "background: rgba(250,50,16,0.3); font-size: 11px;");}
if(gpd_current_logo != ""){console.log("%c [GPD] Custom logo is set ["+gpd_current_logo+"]["+gpd_current_logo2+"]", "background: rgba(10,256,00,0.2); font-size: 11px;");}
else{console.log("%c [GPD] Custom logo is NOT set ", "background: rgba(250,50,16,0.3); font-size: 11px;");}

$("#gpd_custombck_url").val(gpd_current_background_url)

    //Bind onclicks
    $("#gpd_button").click(function(){$('#gpd_menu').fadeToggle(100);})
    $("#gpd_btnclose").click(function(){$('#gpd_custombck_popup').fadeOut(100);})
    $("#body").click(function(){$('#gpd_menu').fadeOut(100);})
    $("#mngb").click(function(){$('#gpd_menu').fadeOut(100);})
	
    $("#gpd_reset").click(function(){
		GM_setValue("gpd_background_id","")
		GM_setValue("gpd_background_url","")
		GM_setValue("gpd_logo_id","")
		GM_setValue("gpd_topnavTextColor","")
		GM_setValue("gpd_footerColor","")
		GM_setValue("gpd_footerTransp","1")
		GM_setValue("gpd_footerText","1")
		load_settings()
	})
    
    $("#gpd_btn1").click(function(){$('#gpd_section4').hide();$('#gpd_section3').hide();$('#gpd_section2').hide();$('#gpd_section1').fadeIn(150);})
    $("#gpd_btn2").click(function(){$('#gpd_section4').hide();$('#gpd_section3').hide();$('#gpd_section1').hide();$('#gpd_section2').fadeIn(150);})
    $("#gpd_btn3").click(function(){$('#gpd_section4').hide();$('#gpd_section1').hide();$('#gpd_section2').hide();$('#gpd_section3').fadeIn(150);})
    $("#gpd_btn4").click(function(){$('#gpd_section3').hide();$('#gpd_section1').hide();$('#gpd_section2').hide();$('#gpd_section4').fadeIn(150);})
    
	$("#gpd_tnc_default").click(function(){GM_setValue("gpd_topnavTextColor","");load_settings()});
	$("#gpd_tnc_white").click(function(){GM_setValue("gpd_topnavTextColor","white");load_settings()});
	
	$("#gpd_footer_default").click(function(){GM_setValue("gpd_footerColor","");load_settings()});
	$("#gpd_footer_c1").click(function(){GM_setValue("gpd_footerColor","c1");load_settings()});
	$("#gpd_footer_c2").click(function(){GM_setValue("gpd_footerColor","c2");load_settings()});
	$("#gpd_footer_c3").click(function(){GM_setValue("gpd_footerColor","c3");load_settings()});
	$("#gpd_footer_c4").click(function(){GM_setValue("gpd_footerColor","c4");load_settings()});
	$("#gpd_footer_ccustom").click(function(){GM_setValue("gpd_footerColor",$("#gpd_footer_custom").val());load_settings()});
	$("#gpd_footer_transp1").click(function(){GM_setValue("gpd_footerTransp","1");load_settings()});
	$("#gpd_footer_transp2").click(function(){GM_setValue("gpd_footerTransp","0.8");load_settings()});
	$("#gpd_footer_transp3").click(function(){GM_setValue("gpd_footerTransp","0.6");load_settings()});
	$("#gpd_footer_transp4").click(function(){GM_setValue("gpd_footerTransp","0.4");load_settings()});
	$("#gpd_footer_transp5").click(function(){GM_setValue("gpd_footerTransp","0.2");load_settings()});
	$("#gpd_footer_transp6").click(function(){GM_setValue("gpd_footerTransp","0");load_settings()});
	$("#gpd_footer_text1").click(function(){GM_setValue("gpd_footerText","");load_settings()});
	$("#gpd_footer_text2").click(function(){GM_setValue("gpd_footerText","white");load_settings()});
	
	$("#gpd_logo_none").click(function(){GM_setValue("gpd_logo_id","");load_settings()});
	$("#gpd_logo_random").click(function(){GM_setValue("gpd_logo_id","random");load_settings()});
    $("#0").click(function(){GM_setValue("gpd_logo_id","0");load_settings()});
    $("#1").click(function(){GM_setValue("gpd_logo_id","1");load_settings()});
    $("#2").click(function(){GM_setValue("gpd_logo_id","2");load_settings()});
    $("#3").click(function(){GM_setValue("gpd_logo_id","3");load_settings()});
    $("#4").click(function(){GM_setValue("gpd_logo_id","4");load_settings()});
    $("#5").click(function(){GM_setValue("gpd_logo_id","5");load_settings()});
    $("#6").click(function(){GM_setValue("gpd_logo_id","6");load_settings()});
    $("#7").click(function(){GM_setValue("gpd_logo_id","7");load_settings()});
	$("#8").click(function(){GM_setValue("gpd_logo_id","8");load_settings()});
    $("#9").click(function(){GM_setValue("gpd_logo_id","9");load_settings()});
    $("#10").click(function(){GM_setValue("gpd_logo_id","10");load_settings()});
    $("#11").click(function(){GM_setValue("gpd_logo_id","11");load_settings()});
    $("#12").click(function(){GM_setValue("gpd_logo_id","12");load_settings()});
    $("#13").click(function(){GM_setValue("gpd_logo_id","13");load_settings()});
    
    $("#gpd_background_none").click(function(){GM_setValue("gpd_background_id","none");load_settings()});
    $("#gpd_background_custom").click(function(){$('#gpd_custombck_popup').fadeIn(100);});
	$("#gpd_custombck_btn").click(function(){GM_setValue("gpd_background_url",$("#gpd_custombck_url").val());GM_setValue("gpd_background_id","custom");load_settings()});
    $("#bck0").click(function(){GM_setValue("gpd_background_id","0");load_settings()});
    $("#bck1").click(function(){GM_setValue("gpd_background_id","1");load_settings()});
    $("#bck2").click(function(){GM_setValue("gpd_background_id","2");load_settings()});
    $("#bck3").click(function(){GM_setValue("gpd_background_id","3");load_settings()});
    $("#bck4").click(function(){GM_setValue("gpd_background_id","4");load_settings()});
    $("#bck5").click(function(){GM_setValue("gpd_background_id","5");load_settings()});
    $("#bck6").click(function(){GM_setValue("gpd_background_id","6");load_settings()});
    $("#bck7").click(function(){GM_setValue("gpd_background_id","7");load_settings()});
    $("#bck8").click(function(){GM_setValue("gpd_background_id","8");load_settings()});
    $("#bck9").click(function(){GM_setValue("gpd_background_id","9");load_settings()});
})
//----------------------------------------
$(document).ready(function () {
console.log("%c ------------------------------ ", "background: rgba(10,90,256,0.4); font-size: 12px;font-weight:bold;");
});
})(document);

