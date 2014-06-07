// ==UserScript==
// @name           TSR Extensions
// @author         Vulpes
// @version        2.0
// @description    A compilation of user-created TSR extensions. Go to "Customise your TSR" to enable the individual scripts.
// @include        http://www.thestudentroom.co.uk/
// @include        http://*.thestudentroom.co.uk/
// @include        http://www.thestudentroom.co.uk/*
// @include        http://thestudentroom.co.uk/*
// @exclude        *.thestudentroom.co.uk/modcp*
// @exclude        *.thestudentroom.co.uk/admincp*
// @copyright      2012+, Vulpes
// @namespace      http://www.thestudentroom.co.uk/member.php?u=334116
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @require		   http://meta100.github.com/mColorPicker/javascripts/mColorPicker_min.js
// ==/UserScript==

//////////////////////////////////////////////////////////////////
/////////////////////////// FUNCTIONS ////////////////////////////
//////////////////////////////////////////////////////////////////

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + 365);
var c_value=escape(value) + ((365==null) ? "" : "; expires="+exdate.toUTCString() + "; path=/ ;");
document.cookie=c_name + "=" + c_value;
}

function checkCookie()
{
  
  setCookie("c_fluid",c_fluid);
  setCookie("c_carousel",c_carousel);
  setCookie("c_rank",c_rank);
  
  var bgcolor = document.getElementById('bgcolor_input').value;
  setCookie("c_bgcolor",bgcolor);
  var wgcolor = document.getElementById('wgcolor_input').value;
  setCookie("c_wgcolor",wgcolor);
  
  //alert("Cookies saved." + " c_fluid=" + c_fluid + " c_carousel=" + c_carousel + " c_bgcolor=" + bgcolor + " c_wgcolor=" + wgcolor + " c_rank=" + c_rank);
  document.getElementById("s_notif").innerHTML = '<font size="1"> <br/>Your settings have been saved. You must refresh the page for the changes to take effect.<br/></font>';
  
}

var pageURL = window.location.pathname;

//////////////////////////////////////////////////////////////////
//////////////////////// GENERAL SCRIPTS /////////////////////////
//////////////////////////////////////////////////////////////////

var bg_color = getCookie("c_bgcolor");
var wg_color = getCookie("c_wgcolor");

$('.page').css({"background-color":bg_color});
$('.table-columns').css({"background-color":bg_color});
$('.widget').css({"background-color":wg_color});
$('.forum-category').css({"background-color":wg_color});
$('.minor-box').css({"background-color":wg_color});
$('#inlinemodform').css({"background-color":wg_color});

//////////////////////////////////////////////////////////////////
//////////////////////// HOMEPAGE SCRIPTS ////////////////////////
//////////////////////////////////////////////////////////////////

if (pageURL == "/" || pageURL == "/index.php" ) {
	var c_fluid = getCookie("c_fluid");
	var c_carousel = getCookie("c_carousel");
	
	if (c_fluid == 1) {
		  $('#page_home, #main_menu, .min-width').width('100%');
		  $('#carousel-container').width('960px');
		  $('.pod').width('298px');
		  $('#footer').width('98.5%');
	}
	
	if (c_carousel == 1) {
		  $('#carousel-container').hide();
	}
	
}

//////////////////////////////////////////////////////////////////
/////////////////// MEMBER PROFILE PAGE SCRIPTS //////////////////
//////////////////////////////////////////////////////////////////

function updateUserTitle(userTitle, titleColour) {
	
	oldhtml = $('div#rank').html();
	var newTitle = "<font color='" + titleColour + "'>" + userTitle + "</font>";
	var newhtml = oldhtml.replace(userTitle, newTitle);
	$('#rank').html(newhtml);
	
}

if (pageURL == "/member.php" ) {

	var c_rank = getCookie("c_rank");
	
	if (c_rank == 1) {
	
	$('#rank').css({"font-weight":"bold"});
	
	updateUserTitle("PS Helper","#3BD2FF");
	updateUserTitle("Community Assistant","#4f5bcc");
	updateUserTitle("Forum Assistant","#4f5bcc");
	updateUserTitle("Wiki Support Team","#19B91E");
	updateUserTitle("TSR Moderation Team: Moderator","#8e0890");
	updateUserTitle("TSR Moderation Team: Supermod","#29bbec");
	updateUserTitle("The Student Room Group Staff","#8cb14f");
	updateUserTitle("TSR Community Team", "#D90222");
	
	}
	
}

//////////////////////////////////////////////////////////////////
///////////// NEW TAB IN CUSTOMISATION CONTROL PANEL /////////////
//////////////////////////////////////////////////////////////////
	
if (pageURL == "/profile.php") {

$("div.tabs ul").append('<li class="ui-state-default ui-corner-top"><a href="#tab-custom">User-Created Extensions</a></li>');

var extension_Text = '<div id="tab-custom" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"> \
<div class="no-border"> \
                <h2 id="customise-page">User-Created Extensions</h2> \
                <div class=""> \
                    <p><span class="bold">Below is a collection of user-created scripts to allow you to enhance your TSR even further!</span></p><br/> \
                    <p>Please note that these extensions are <span class="bold">not official TSR scripts</span> and were written by members of the community, not the TSR developers. These scripts may not be compatible with future TSR updates and could cause the site to stop working.</p><br/> \
                    <p>The extensions below use cookies to store your preferences. By continuing to use this extension, you are giving consent to cookies being used. For information on cookies and how you can disable them, visit the <a href="http://www.thestudentroom.co.uk/faq.php?faq=safety_privacy#faq_safety_privacy_staying_safe">TSR Cookies & Online Safety wiki</a>.</p><br/> \
                    <p>For more user-created extensions, <a href="http://www.thestudentroom.co.uk/showthread.php?t=2062836">click here</a>.</p><br/> \
            </div> \
</div> \
';

$("div.tabs").append(extension_Text);

// Fluid Width

if (getCookie("c_fluid") == 0) {
	var c_fluid = 0;
} else {
	var c_fluid = 1;
}

function btnFluid () {
	
	var btnFluid = document.getElementById("btnFluid");

	if (btnFluid.innerHTML == "Enable Extension") {
    	btnFluid.innerHTML = "Disable Extension";
    	c_fluid = 1;
    } else {
	    btnFluid.innerHTML = "Enable Extension";
	    c_fluid = 0;
    }
    
}

	$("div.tabs").append('<div id="tab-custom" class="no-border"><h3 id="customise-page">Fluid Width Layout</h3><p>Expand the TSR Homepage to fit your screen resolution.<br/><br/><img src="http://i1078.photobucket.com/albums/w497/ivulpes/fluid_zps3d6d83a8.gif"  width="800px" /><br/><br/></p></div>');

if (c_fluid == 1) {
	
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:0px"><a href="javascript:void(0)" id="btnFluid">Disable Extension</a></div>');
	
} else {

	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:0px"><a href="javascript:void(0)" id="btnFluid">Enable Extension</a></div>');

}

$("#btnFluid").click (btnFluid);


// Carousel Edit

if (getCookie("c_carousel") == 0) {
	var c_carousel= 0;
} else {
	var c_carousel = 1;
}


function btnCarousel () {

	var btnCarousel = document.getElementById("btnCarousel");

	if (btnCarousel.innerHTML == "Enable Extension") {
    	btnCarousel.innerHTML = "Disable Extension";
    	c_carousel = 1;
    } else {
	    btnCarousel.innerHTML = "Enable Extension";
	    c_carousel = 0;
    }
    
}

	$("div.tabs").append('<div id="tab-custom" class="no-border"><h3 id="customise-page">Hide Carousel</h3><p>This extension will allow you to hide the carousel on the TSR homepage.<br/><br/><img src="http://i1078.photobucket.com/albums/w497/ivulpes/carousel_zpsa2a8b3b2.gif" width="800px"/><br/><br/></p></div>');

if (c_carousel == 1) {

	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:0px"><a href="javascript:void(0)" id="btnCarousel">Disable Extension</a></div>');

} else {

	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:0px"><a href="javascript:void(0)" id="btnCarousel">Enable Extension</a></div>');
	
}	
	$("#btnCarousel").click (btnCarousel);

// User Titles Edit

if (getCookie("c_rank") == 0) {
	var c_rank= 0;
} else {
	var c_rank = 1;
}


function btnRank () {

	var btnRank = document.getElementById("btnRank");

	if (btnRank.innerHTML == "Enable Extension") {
    	btnRank.innerHTML = "Disable Extension";
    	c_rank = 1;
    } else {
	    btnCarousel.innerHTML = "Enable Extension";
	    c_rank = 0;
    }
    
}	

	$("div.tabs").append('<div id="tab-custom" class="no-border"><h3 id="customise-page">Coloured Usertitles</h3><p>This extension will allow usertitles on the member profile page to show up in different colours.</p></div>');
	
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:5px; padding-bottom:10px; padding-left: 10px"><p><b><font color="#3BD2FF">PS Helpers</font><br/><font color="#4f5bcc">Community Assistants</font><br/><font color="#19B91E">Wiki Support Team</font><br/><font color="#8e0890">TSR Moderation Team: Moderator</font><br/><font color="#29bbec">TSR Moderation Team: Supermod</font><br/><font color="#8cb14f">The Student Room Group Staff</font><br/><font color="#D90222">TSR Community Team</font><br/></b></p></div>');

if (c_rank == 1) {

	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:0px"><a href="javascript:void(0)" id="btnRank">Disable Extension</a></div>');

} else {

	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:0px"><a href="javascript:void(0)" id="btnRank">Enable Extension</a></div>');
	
}	
	$("#btnRank").click (btnRank);


// TSR Theme Colours

	$("div.tabs").append('<div id="tab-custom" class="no-border"><h3 id="customise-page">Customise TSR Colour Scheme</h3><p>Personalise TSR even further by setting up your own colour scheme.</p><p><font color="#DB9028"> >> Please note that this extension is still under construction and many more features are to be added soon. You can check out Chrosson' + "'" + 's Colour Wheel script <a href="http://www.thestudentroom.co.uk/showthread.php?t=2078157&page=9&p=39622713#post39622713">here</a></font></p></div>');
	
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:10px; padding-left:10px"><p> - Change Forum Background Colour:    <input type="color" value="' + bg_color + '" data-hex="true" data-text="hidden" style="height:15px;width:15px;" id="bgcolor_input"/></p></div>');
	
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:10px; padding-left:10px"><p> - Change Widget Background Colour:    <input type="color" value="' + wg_color + '" data-hex="true" data-text="hidden" style="height:15px;width:15px;" id="wgcolor_input"/></p></div>');
	
	
	/*
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:5px; padding-left:10px"><p> - Edit Hue  -  [scrollbar goes here]</p></div>');
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:5px; padding-left:10px"><p> - Edit Saturation  -  [scrollbar goes here]</p></div>');
	$("div.tabs").append('<div id="tab-custom" class="no-border" style="padding-top:5px; padding-left:10px"><p> - Edit Lightness  -  [scrollbar goes here]</p></div>');
	*/

// Save Selections

$("div.tabs").append('<br/><br/><div id="tab-custom" class="no-border" style="padding-top:0px"><form name="myform" action=""><input type="button" id="btnCookie" value="Save Settings"/><div id="s_notif"></div></form><br/></div>');

$("#btnCookie").click (checkCookie);

}
