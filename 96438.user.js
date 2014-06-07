// ==UserScript==
// @name           Beautify Facebook CR Edit
// @namespace      http://beautify.it
// @description    Makes Facebook a little nicer to look at
// @include        http://www.facebook.com*
// @include        http://facebook.com*
// @include        https://www.facebook.com*
// @include        https://facebook.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


// ==UserScript==
// @name		Userscript Auto-Update Add-in
// @namespace		AutoUpdateAddIn
// @description		Use this code in your script to add weekly update checks and manual update.
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "Beautify Facebook CR Edit";
var source_location = "http://userscripts.org/scripts/source/96438.user.js";
var current_version = "2.0.5";
var latest_version = " ";
var gm_updateparam = "beautify_facebook_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://beautify.it/bfcre_ff.php";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("VF->Force Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================

CheckForUpdate();

// Base Style
style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
style.type = 'text/css';
style.innerHTML = "#myphoto{max-width:670px;}#globalContainer{width:981px !important;margin:0 auto !important;}#bBWrapper{width:981px !important;z-index:13;margin:0 auto !important;}#blueBar{left:auto !important;padding-bottom:2px;visibility:hidden;display:none;}#pageHead{width:981px !important;background:#3B5998 !important;z-index:15;}.ptm{padding-top:4px !important;}#content{padding-top:41px !important;}#rightCol{background:#FFF;margin-top:-10px !important;padding-top:20px !important;}.hasLeftCol #rightCol{padding-right:16px !important;}.hasLeftCol #contentArea{padding-left:20px !important;padding-top:20px !important;margin-top:-10px !important;background:#FFF;}.hasRightCol #contentArea{margin-top:-10px !important;background:#FFF;padding:20px 10px !important;}.hasLeftCol #contentCol{border:none !important;margin-left:182px !important;}#headerArea{padding-left:20px !important;padding-top:20px !important;background:#FFF;margin:-10px 0 0 !important;}.hasRightCol #headerArea{width:493px !important;padding-right:20px !important;}.hasLeftCol .hasRightCol #contentArea{width:503px !important;padding-right:20px !important;}#pageFooter{margin-top:15px !important;background:#FFF;}#contentCurve{display:none !important;border:none !important;}.UIStandardFrame_Content{background:#FFF;margin-left:-6px !important;padding:15px !important;}.profile_two_columns .right_column{width:540px !important;background:#FFF;margin-right:180px;}#pagelet_tab_content{padding-top:15px;padding-left:15px;padding-right:15px;}.profile .right_column{background:#FFF;margin-right:180px !important;}.uiStreamStory,.pvm,.UIIntentionalStory{margin-bottom:5px !important;}.photos_tab{width:751px;background:#FFF;margin-top:-15px;}.uiBoxWhite{background-color:#FFF !important;padding:15px;}.friendBrowserCheckboxFilters{background:#FFF;padding-left:10px;padding-top:15px;padding-bottom:15px;}.friendBrowserCheckboxContent{background:#FFF;padding-right:10px;padding-top:15px;padding-bottom:15px;}.editnotifications .editor_panel .notifications{width:502px !important;margin:0 !important;padding:0 !important;}.notifications #notification_options table td.action_text{width:440px !important;}.notifications #notification_options table{width:480px !important;}.fbPrivacyPage{background:#FFF;padding:15px;}.profilePreviewHeader{background:#FFF !important;margin-bottom:40px !important;padding:10px !important;}.profile_top_wash{margin-top:5px;}.loggedout_menubar{width:664px !important;}#simple_registration_container{padding-bottom:0 !important;}#pageNav input:first-child:hover{background-color:#6C86B9;text-decoration:none;}#pageNav > li:first-child .uiLinkButton input{font-weight:bold important;color:#FFF !important;padding:8px 10px !important;}#pageNav label input:first-child{font-weight:700;}.hasLeftCol .megaphone_box{margin-left:0 !important;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;}#options_menu_updated{color:red !important;}#pagelet_ads,.UIStandardFrame_SidebarAds,.groupProfileHeaderWash{display:none !important;}#pageLogo,.photo_table{margin-left:0 !important;}#leftCol,.profile .left_column{background:#FFF;margin-left:-5px;width:184px;margin-top:5px;}#contentCol,.editor_panel{background:none !important;}.hasLeftCol #mainContainer,#footerContainer{border:none !important;}#all_threads,.thread,.post_editor,#blog_main_column,.sitetourInstantPersonalization{background:#FFF;}";

	$(function () {
			var tabContainers = $('div.tabs > div');
			tabContainers.hide().filter(':first').show();
			
			$('div.tabs ul.tabNavigation a').click(function () {
					tabContainers.hide();
					tabContainers.filter(this.rel).show();
					$('div.tabs ul.tabNavigation a').removeClass('selected');
					$(this).addClass('selected');
					return false;
			}).filter(':first').click();
	});
	
var options_innerHTML= "";
options_innerHTML += "    <style type=\"text/css\" media=\"screen\">";
options_innerHTML += "    <!--";

options_innerHTML += "                UL.tabNavigation {";
options_innerHTML += "                    list-style: none;";
options_innerHTML += "                    margin: 0;";
options_innerHTML += "                    padding: 0;";
options_innerHTML += "                }";
options_innerHTML += "";
options_innerHTML += "                UL.tabNavigation LI {";
options_innerHTML += "                    display: inline;";
options_innerHTML += "                }";
options_innerHTML += "";
options_innerHTML += "                UL.tabNavigation LI A {";
options_innerHTML += "                    padding: 3px 5px;";
options_innerHTML += "                    color: #000;";
options_innerHTML += "                    text-decoration: none;";
options_innerHTML += "     border:2px solid #3B5998;";
options_innerHTML += "                }";
options_innerHTML += "";
options_innerHTML += "                UL.tabNavigation LI A.selected,";
options_innerHTML += "                UL.tabNavigation LI A:hover {";
options_innerHTML += "                    color: #06F;";
options_innerHTML += "                    padding-top: 7px;";
options_innerHTML += "     border:2px solid #3B5998;";
options_innerHTML += "                }";
options_innerHTML += "                ";
options_innerHTML += "                UL.tabNavigation LI A:focus {";
options_innerHTML += "                        outline: 0;";
options_innerHTML += "                }";
options_innerHTML += "";
options_innerHTML += "                div.tabs > div {";
options_innerHTML += "                        padding: 5px;";
options_innerHTML += "                        margin-top: 3px;";
options_innerHTML += "                        border: 2px solid #3B5998;";
options_innerHTML += "                }";
options_innerHTML += "                ";
options_innerHTML += "                div.tabs > div h2 {";
options_innerHTML += "                        margin-top: 0;";
options_innerHTML += "                }";
options_innerHTML += "                ";
options_innerHTML += "                .waste {";
options_innerHTML += "                        min-height: 100%;";
options_innerHTML += "                }";
options_innerHTML += ".hover_demo {";
options_innerHTML += " width:538px;";
options_innerHTML += " height:40px;";
options_innerHTML += " background:#000;";
options_innerHTML += " padding-top:5px;";
options_innerHTML += "}";
options_innerHTML += "#main_demo_test {";
options_innerHTML += " width:350px;";
options_innerHTML += " height:35px;";
options_innerHTML += " background:#FFF;";
options_innerHTML += " margin-left:94px;";
options_innerHTML += " -moz-border-radius:10px;";
options_innerHTML += " -webkit-border-radius: 10px;";
options_innerHTML += " border-radius: 10px;";
options_innerHTML += " text-align:center;";
options_innerHTML += "}";
options_innerHTML += "#menu_demo_test {";
options_innerHTML += " width:350px;";
options_innerHTML += " height:35px;";
options_innerHTML += " background:#FFF;";
options_innerHTML += " margin-left:94px;";
options_innerHTML += " -moz-border-radius:10px;";
options_innerHTML += " -webkit-border-radius: 10px;";
options_innerHTML += " border-radius: 10px;";
options_innerHTML += " text-align:center;";
options_innerHTML += "}";
options_innerHTML += "#left_demo_test {";
options_innerHTML += " width:350px;";
options_innerHTML += " height:35px;";
options_innerHTML += " background:#FFF;";
options_innerHTML += " margin-left:94px;";
options_innerHTML += " -moz-border-radius:10px;";
options_innerHTML += " -webkit-border-radius: 10px;";
options_innerHTML += " border-radius: 10px;";
options_innerHTML += " text-align:center;";
options_innerHTML += "}";
options_innerHTML += "#right_demo_test {";
options_innerHTML += " width:350px;";
options_innerHTML += " height:35px;";
options_innerHTML += " background:#FFF;";
options_innerHTML += " margin-left:94px;";
options_innerHTML += " -moz-border-radius:10px;";
options_innerHTML += " -webkit-border-radius: 10px;";
options_innerHTML += " border-radius: 10px;";
options_innerHTML += " text-align:center;";
options_innerHTML += "}";
options_innerHTML += "#saveNotification {";
options_innerHTML += " background:#FFF;";
options_innerHTML += " width:500px;";
options_innerHTML += " padding:20px;";
options_innerHTML += " position:fixed;";
options_innerHTML += " top:70px;";
options_innerHTML += " left:50%;";
options_innerHTML += " margin-left:-250px;";
options_innerHTML += " display:none;";
options_innerHTML += " border:5px solid green;";
options_innerHTML += " z-index:2000;";
options_innerHTML += "}";
options_innerHTML += "#resetNotification {";
options_innerHTML += " background:#FFF;";
options_innerHTML += " width:500px;";
options_innerHTML += " padding:20px;";
options_innerHTML += " position:fixed;";
options_innerHTML += " top:70px;";
options_innerHTML += " left:50%;";
options_innerHTML += " margin-left:-250px;";
options_innerHTML += " display:none;";
options_innerHTML += " border:5px solid red;";
options_innerHTML += " z-index:2000;";
options_innerHTML += "}";


options_innerHTML += "    -->";
options_innerHTML += "    <\/style>";

options_innerHTML += "    <div class=\"tabs\" style=\"margin-top:60px; background:#FFF; margin-left:25px; margin-right:25px;\">";
options_innerHTML += "        <span id=\"saveNotification\" class=\"ui-widget ui-state-highlight ui-corner-all\" style=\"display:none\">Your options have been saved. <b>Reloading Facebook Tab now.<\/b><\/span>";
options_innerHTML += "        <span id=\"resetNotification\" class=\"ui-widget ui-state-error ui-corner-all\" style=\"display:none\">Resetting to default options.<\/span>";
options_innerHTML += "        <ul class=\"tabNavigation\">";
options_innerHTML += "            <li><a rel=\"#main_settings\">Main Settings<\/a><\/li>";
options_innerHTML += "            <li><a rel=\"#style_settings\">Style Settings<\/a><\/li>";
options_innerHTML += "            <li><a rel=\"#tweaks_enhancements\">Tweaks and Enhancements<\/a><\/li>";
options_innerHTML += "            <li><a rel=\"#version_history\">Version History<\/a><\/li>";
options_innerHTML += "            <li style=\"float:right;\"><input id=\"save_btn\" type=\"button\" name=\"Save\" value=\"Save\" style=\"margin-top:-12px;\"></li>";
options_innerHTML += "            <li style=\"float:right;\"><input id=\"reset_btn\" type=\"button\" name=\"Reset\" value=\"Reset\" style=\"margin-top:-12px;\"></li>";
options_innerHTML += "        <\/ul>";
options_innerHTML += "        <div id=\"main_settings\">";
options_innerHTML += "         <div id=\"main_content\" style=\"float:left; width:500px;\">";
options_innerHTML += "                <div id=\"menu_position\">";
options_innerHTML += "                <fieldset>";
options_innerHTML += "                    <legend>Where do you want the Menu?<\/legend>";
options_innerHTML += "                    <div class=\"option\">";
options_innerHTML += "                        <strong>";
options_innerHTML += "                         <label><input type=\"checkbox\" id=\"optlink_account\" />Place Options Menu in Account Menu<\/label>";
options_innerHTML += "                        <\/strong>";
options_innerHTML += "                    <\/div>";
options_innerHTML += "                    <div class=\"option\">";
options_innerHTML += "                        <strong>";
options_innerHTML += "                         <label><input type=\"checkbox\" id=\"optlink_main\" />Place Options Menu in Main Menu<\/label>";
options_innerHTML += "                        <\/strong>";
options_innerHTML += "                    <\/div>";
options_innerHTML += "                    <div class=\"option\">";
options_innerHTML += "                        <strong>";
options_innerHTML += "                         <label><input type=\"checkbox\" id=\"reload_fb\" checked=\"checked\" />Reload Facebook after saving changes<\/label>";
options_innerHTML += "                        <\/strong>";
options_innerHTML += "                    <\/div>";
options_innerHTML += "                <\/fieldset>";
options_innerHTML += "                <\/div>";
options_innerHTML += "                <div id=\"about_beautify_fb\">";
options_innerHTML += "                <fieldset>";
options_innerHTML += "                    <legend>What is Beautify Facebook?<\/legend>";
options_innerHTML += "                    <p>";
options_innerHTML += "                     Beautify Facebook is an Extension for Chromium Based Browsers like Google Chrome, Iron or RockMelt.";
options_innerHTML += "                    <\/p>";
options_innerHTML += "                    <p>";
options_innerHTML += "                     It's main purpouse is to make Facebook a bit nicer to look at, and somehow customize the Design by changing the Background colour, adding rounded corners, showing chat emote icons, fixing the menus to allways have them where you need them and add transperency so the background image can unfoald all its beauty.";
options_innerHTML += "                    <\/p>";
options_innerHTML += "                    <p>";
options_innerHTML += "                     The original Beautify Facebook was deleted from the Extension Pages, leaving all users stuck with a unfunctional extension. Thats why I took the initiative, and continued the work. Although I am currently loaded with work, I try my best to keep this extension updated and working for all of its users.";
options_innerHTML += "                    <\/p>";
options_innerHTML += "                    <p>";
options_innerHTML += "                     If you have any further Question, or want to submit a feature request, you can do that on the Facebook Page. I hope you enjoy this extension, and stay tuned for future updates.<br /> - Christian";
options_innerHTML += "";
options_innerHTML += "                    <\/p>";
options_innerHTML += "                <\/fieldset>";
options_innerHTML += "                <\/div>";
options_innerHTML += "                <div id=\"donate\">";
options_innerHTML += "                <fieldset>";
options_innerHTML += "                    <legend>Donate to keep Beautify Facebook alive<\/legend>";
options_innerHTML += "                     <div id=\"paypal\" style=\"float: left; padding: 10px; width: 200px; height: 50px; text-align: center;\">";
options_innerHTML += "                            <form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\">";
options_innerHTML += "                                <input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\" />";
options_innerHTML += "                                <input type=\"hidden\" name=\"hosted_button_id\" value=\"9YWPSPUTQMUZY\" />";
options_innerHTML += "                                <input type=\"image\" src=\"https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif\" name=\"submit\" alt=\"PayPal - The safer, easier way to pay online!\" />";
options_innerHTML += "                                <img alt=\"\" border=\"0\" src=\"https://www.paypal.com/de_DE/i/scr/pixel.gif\" width=\"1\" height=\"1\" />";
options_innerHTML += "                            <\/form>";
options_innerHTML += "                     <\/div>";
options_innerHTML += "                        <div id=\"paypal_arrow\" style=\"float: left; padding: 10px; width: 200px; height: 50px; text-align: center;\">";
options_innerHTML += "                         <img src=\"http://beautify.it/gs/icons/left-arrow.gif\" height=\"50px\" style=\"float:left\" alt=\"&lt;&lt;&lt;&lt;&lt;&lt;&lt;\" />";
options_innerHTML += "                            <p>Even the smallest amount will help.<\/p><div class=\"c\"><\/div>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "    <\/fieldset>";
options_innerHTML += "                <\/div>";
options_innerHTML += "            <\/div>";
options_innerHTML += "            <div id=\"facebook_feed\" style=\"float:left; width:405px; margin-left: 19px;\">";
options_innerHTML += "             <iframe src=\"http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FBeautifyFB&amp;width=405&amp;colorscheme=light&amp;connections=14&amp;stream=true&amp;header=false&amp;height=555\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:405px; height:555px;\" allowTransparency=\"true\"><\/iframe>";
options_innerHTML += "            <\/div>";
options_innerHTML += "            <div class=\"c\" style=\"clear:both;\"><\/div>";
options_innerHTML += "        <\/div>";
options_innerHTML += "        ";
options_innerHTML += "        <div id=\"style_settings\">";
options_innerHTML += "         <div class=\"config\" style=\"width: 650px;\">";
options_innerHTML += "             <fieldset>";
options_innerHTML += "                 <legend>Background Options<\/legend>";
options_innerHTML += "                        <table width=\"100%\" border=\"0\">";
options_innerHTML += "                            <tr>";
options_innerHTML += "                                <td><label><input type=\"radio\" name=\"mainBackgroundType\" value=\"0\" />Standard<\/label><\/td>";
options_innerHTML += "                                <td><label><input type=\"radio\" name=\"mainBackgroundType\" value=\"1\" />Gradient<\/label><\/td>";
options_innerHTML += "                                <td><label><input type=\"radio\" name=\"mainBackgroundType\" value=\"2\" />Solid<\/label><\/td>";
options_innerHTML += "                                <td><label><input type=\"radio\" name=\"mainBackgroundType\" value=\"3\" />Image<\/label><\/td>";
options_innerHTML += "                            <\/tr>";
options_innerHTML += "                            <tr>";
options_innerHTML += "                                <td><\/td>";
options_innerHTML += "                                <td><input id=\"mainBackgroundGradientFrom\" class=\"colorwell\" type=\"color\" size=\"7\" maxlength=\"7\" value=\"#\" /><\/td>";
options_innerHTML += "                                <td><input id=\"mainBackgroundSolid\" class=\"colorwell\" type=\"color\" size=\"7\" maxlength=\"7\" value=\"#\" /><\/td>";
options_innerHTML += "                                <td><input id=\"mainBackgroundUrl\" style=\"width:250px;\" type=\"url\" value=\"http://\" /><\/td>";
options_innerHTML += "                            <\/tr>";
options_innerHTML += "                            <tr>";
options_innerHTML += "                                <td><\/td>";
options_innerHTML += "                                <td><input id=\"mainBackgroundGradientTo\" class=\"colorwell\" type=\"color\" size=\"7\" maxlength=\"7\" value=\"#\" /><\/td>";
options_innerHTML += "                                <td><\/td>";
options_innerHTML += "                                <td><label><input type=\"checkbox\" name=\"bgIMGTiled\" id=\"bgIMGTiled\" />Tiled?<\/label><label><input type=\"checkbox\" name=\"bgFirstPage\" id=\"bgFirstPage\" />On Login Page?<\/label><\/td>";
options_innerHTML += "                            <\/tr>";
options_innerHTML += "                        <\/table><br />";
options_innerHTML += "                        <div id=\"image_uploader\" style=\"float:right; width:470px;\">";
options_innerHTML += "                         <iframe width=\"460px;\" height=\"200px\" frameborder=\"0\" id=\"rtmframe\" src=\"http://beautify.it/ext_upload.php\"><\/iframe>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "    <\/fieldset>                    ";
options_innerHTML += "          <fieldset class=\"topspace\">";
options_innerHTML += "                    <legend>Transparency and Position<\/legend>";
options_innerHTML += "                        <div id=\"style_settings_bars\">";
options_innerHTML += "                        <h3><a href=\"#main_content\">Main Content<\/a><\/h3>";
options_innerHTML += "                        <div id=\"main_content_options_container\">";
options_innerHTML += "                            <div id=\"main_content_options\" class=\"options\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Options<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                        <label><input type=\"checkbox\" id=\"transperentMainContent\" />Transparency<\/label><br />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                            <div id=\"main_content_transparency\" class=\"transparency\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Transparency<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                       <label for=\"mainTransparency\">Normal &amp; Hover: (0-100)<\/label>";
options_innerHTML += "                                       <input type=\"text\" id=\"mainTransparency\" style=\"border:0; color:#C03; font-weight:bold;\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"contentAreaTransparencyNormal\" value=\"\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"contentAreaTransparencyHover\" value=\"\" />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "                        <h3><a href=\"#menu_bar\">Menu Bar<\/a><\/h3>";
options_innerHTML += "                        <div id=\"menu_bar_options_container\">";
options_innerHTML += "                            <div id=\"menu_bar_options\" class=\"options\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Options<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                        <label><input id=\"menu_bar_fixed\" type=\"checkbox\" />Fixed Position<\/label>";
options_innerHTML += "                                        <label><input id=\"menu_bar_transparent\" type=\"checkbox\" />Transparency<\/label><br />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                            <div id=\"menu_bar_transparency\" class=\"transparency\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Transparency<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                       <label for=\"menuTransparency\">Normal &amp; Hover: (0-100)<\/label>";
options_innerHTML += "                                       <input type=\"text\" id=\"menuTransparency\" style=\"border:0; color:#C03; font-weight:bold;\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"barTransparencyNormal\" value=\"\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"barTransparencyHover\" value=\"\" />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "                        <h3><a href=\"#left_sidebar\">Left Sidebar<\/a><\/h3>";
options_innerHTML += "                        <div id=\"left_sidebar_options_container\">";
options_innerHTML += "                            <div id=\"left_sidebar_options\" class=\"options\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Options<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                        <label><input id=\"left_sidebar_fixed\" type=\"checkbox\" />Fixed Position<\/label>";
options_innerHTML += "                                        <label><input id=\"left_sidebar_transparent\" type=\"checkbox\" />Transparency<\/label><br />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                            <div id=\"left_sidebar_transparency\" class=\"transparency\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Transparency<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                       <label for=\"leftTransparency\">Normal &amp; Hover: (0-100)<\/label>";
options_innerHTML += "                                       <input type=\"text\" id=\"leftTransparency\" style=\"border:0; color:#C03; font-weight:bold;\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"leftTransparencyNormal\" value=\"\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"leftTransparencyHover\" value=\"\" />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "                        <h3><a href=\"#right_sidebar\">Right Sidebar<\/a><\/h3>";
options_innerHTML += "                        <div id=\"right_sidebar_options_container\">";
options_innerHTML += "                            <div id=\"right_sidebar_options\" class=\"options\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Options<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                        <label><input id=\"right_sidebar_fixed\" type=\"checkbox\" />Fixed Position<\/label>";
options_innerHTML += "                                        <label><input id=\"right_sidebar_transparent\" type=\"checkbox\" />Transparency<\/label><br />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                            <div id=\"right_sidebar_transparency\" class=\"transparency\">";
options_innerHTML += "                            <fieldset>";
options_innerHTML += "                                <legend>Transparency<\/legend>";
options_innerHTML += "                                    <p>";
options_innerHTML += "                                       <label for=\"rightTransparency\">Normal &amp; Hover: (0-100)<\/label>";
options_innerHTML += "                                       <input type=\"text\" id=\"rightTransparency\" style=\"border:0; color:#C03; font-weight:bold;\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"rightTransparencyNormal\" value=\"\" />";
options_innerHTML += "                                       <input type=\"text\" id=\"rightTransparencyHover\" value=\"\" />";
options_innerHTML += "                                    <\/p>";
options_innerHTML += "                            <\/fieldset>";
options_innerHTML += "                            <\/div>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "                <\/fieldset>";
options_innerHTML += "                <div>";
options_innerHTML += "                <fieldset class=\"topspace\">";
options_innerHTML += "                 <legend>Other Options<\/legend>";
options_innerHTML += "                        <div style=\"float:left; width:210px;\">";
options_innerHTML += "                        <fieldset class=\"topspace\">";
options_innerHTML += "                            <legend>Rounded Corners<\/legend>";
options_innerHTML += "                                <label><input type=\"radio\" name=\"rounded_corners\" value=\"0\" />Nothing<\/label><br />";
options_innerHTML += "                                <label><input type=\"radio\" name=\"rounded_corners\" value=\"1\" />Only Container<\/label><br />";
options_innerHTML += "                                <label><input type=\"radio\" name=\"rounded_corners\" value=\"2\" />Container and Messages<\/label><br />";
options_innerHTML += "                                <label><input type=\"radio\" name=\"rounded_corners\" value=\"3\" checked=\"checked\" />Everything Rounded<\/label><br />";
options_innerHTML += "                        <\/fieldset>";
options_innerHTML += "                        <\/div>";
options_innerHTML += "                        <div style=\"float:left; width:210px;\">";
options_innerHTML += "                        <fieldset class=\"topspace\">";
options_innerHTML += "                            <legend>Message Options<\/legend>";
options_innerHTML += "                                <label><input type=\"checkbox\" id=\"message_border\" value=\"0\" />Show Border<\/label><br />";
options_innerHTML += "                                <label><input type=\"checkbox\" id=\"message_shadow\" value=\"1\" />Show Shadow<\/label><br />";
options_innerHTML += "                                <label><input type=\"checkbox\" id=\"message_bg\" value=\"2\" />Dark Background<\/label><br />";
options_innerHTML += "                        <\/fieldset>";
options_innerHTML += "                  <\/div>";
options_innerHTML += "                        <div class=\"c\"><\/div>";
options_innerHTML += "                <\/fieldset>";
options_innerHTML += "                <\/div>";
options_innerHTML += "         <\/div>";
options_innerHTML += "        <\/div>";
options_innerHTML += "        <div id=\"tweaks_enhancements\">";
options_innerHTML += "            <fieldset>";
options_innerHTML += "                <legend>Enhancements<\/legend>";
options_innerHTML += "    <label><input type='checkbox' id='addLogout' />Add Logout to Menu<\/label><br>";
options_innerHTML += "                <label><input type='checkbox' id='keyboardShortcuts' />Keyboard Shortcuts (Shift + h:Home, p:Profile, f:Friends, i:Inbox, s:Edit Account, c:Toggle BuddyList)<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='emoticonBar' />Emoticon Bar in every Chatwindow<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='faviconAlerts' />Update FavIcon on new Requests and Notifications<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='lfdefault' />LiveFeed as Default when clicking on the Facebook Logo<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='roboform' />Roboform User? (Moves the ChatBar up 30px)<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='roboform' onclick=\"window.open('https://chrome.google.com/webstore/detail/nonjdcjchghhkdoolnlbekcfllmednbl', '_blank', ''); return false;\" />Hover Zoom Picture Previews<\/label><\/a>";
options_innerHTML += "            <\/fieldset>";
options_innerHTML += "            <fieldset>";
options_innerHTML += "                <legend>Hide Sidebar Elements<\/legend>";
options_innerHTML += "                <label><input type='checkbox' id='hideReqbox' />Requests<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='hideAdbox' />Advertisments<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='hideEventbox' />Events<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='hidePokebox' />Pokes<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='hideConnectbox' />Connect With Friends<\/label><br />";
options_innerHTML += "                <label><input type='checkbox' id='hideOnlineFriends' />Online Friends (left Sidebar)<\/label><br />";
options_innerHTML += "            <\/fieldset>";
options_innerHTML += "        <\/div>";
options_innerHTML += "        <div id=\"version_history\">";
options_innerHTML += "            <p>";
options_innerHTML += "                <b>2.0.5.4<\/b> <i>(27.12.2010)<\/i><br /><br />";
options_innerHTML += "                + Added option to disable Facebook reload after saving changes<br />";
options_innerHTML += "                + Added option to disable the background on the Login Page<br />";
options_innerHTML += "                + Added option to disable the border around the messages<br />";
options_innerHTML += "                + Added option to disable the message shadow<br />";
options_innerHTML += "                + Added option to disable the darker background of messages<br />";
options_innerHTML += "                * Fixed the hiding of Friendship when \"Hide Ads\" where enabled<br />";
options_innerHTML += "                <br /><br /><br />";
options_innerHTML += "                <b>2.0.5.3<\/b> <i>(24.12.2010)<\/i><br /><br />";
options_innerHTML += "                * Fixed a problem with Game content being cut off<br />";
options_innerHTML += "                <br /><br /><br />";
options_innerHTML += "                <b>2.0.5.2<\/b> <i>(24.12.2010)<\/i><br /><br />";
options_innerHTML += "                + Re-Added Easy Logout<br />";
options_innerHTML += "                + Re-Added Right Sidebar Fixed Position<br />";
options_innerHTML += "                + Re-Designed the complete Options Page<br />";
options_innerHTML += "                + Re-Designed Facebook content<br />";
options_innerHTML += "                + Added Option to allow/disallow Ads in the Options Page<br />";
options_innerHTML += "                + Added ability to enable/disable rounded corners<br />";
options_innerHTML += "                + Supporting New Profile<br />";
options_innerHTML += "                * Fixed FavIcon Alerts<br />";
options_innerHTML += "                * Fixed Facebook Login Page<br />";
options_innerHTML += "                * Fixed Hidden Elements<br />";
options_innerHTML += "                * Fixed problems caused by fixed left sidebar (Friend in the new Profile/Event Page)<br />";
options_innerHTML += "                * Fixed some local storage problems (where your settings are saved)<br />";
options_innerHTML += "                <br /><br /><br />";
options_innerHTML += "                <b>2.0.4.0<\/b> <i>(29.11.2010)<\/i><br /><br />";
options_innerHTML += "                + Small fix to the Top Bar";
options_innerHTML += "                <br /><br /><br />";
options_innerHTML += "                <b>2.0.3.9<\/b> <i>(19.10.2010)<\/i><br /><br />";
options_innerHTML += "                + Fixed Chat Emote Icon Bar<br />";
options_innerHTML += "                + Fixed Facebook Rounder Problems<br />";
options_innerHTML += "                + Fixed Background Tile Option<br />";
options_innerHTML += "                + Added Option to have Live Feed as Default when klicking on the Facebook Logo<br />";
options_innerHTML += "                + Added Option to Move the Chat 30px up (for Roboform Users)<br />";
options_innerHTML += "                + Added a Description for the KeyBoard Shortcuts<br />";
options_innerHTML += "                <br /><br /><br />";
options_innerHTML += "                <b>2.0.3.7<\/b> <i>(11.08.2010)<\/i><br /><br />";
options_innerHTML += "                + Fixed a small bug with the Color-Wheel<br />";
options_innerHTML += "                <br /><br /><br />";
options_innerHTML += "            <\/p>";
options_innerHTML += "        <\/div>";
options_innerHTML += "    <\/div>";
options_innerHTML += "    <div class=\"waste\" style=\"min-height: 1300px;;\"><\/div>";
options_innerHTML += "    <div id=\"update_notification\" title=\"Update Notification\" style=\"display:none;\">";
options_innerHTML += "        <p><span class=\"ui-icon ui-icon-alert\" style=\"float:left; margin:0 7px 20px 0;\"><\/span>";
options_innerHTML += "         You have just Updated to Version 2.0.5.4, this is what is new:<br /><br /><br />+ Option to disable Facebook reload after saving changes<br />+ Option to disable the background on the Login Page<br />+ Option to disable the border around the messages<br />+ Option to disable the message shadow<br />+ Option to disable the darker background of messages";
options_innerHTML += "        <\/p>";
options_innerHTML += "    <\/div>";

	//Create Options Page
        var options_div = document.createElement("div");
        options_div.id = "bfcre_options";
		options_div.style.display = "none";
		options_div.style.position = "absolute";
		options_div.style.top = "0px";
		options_div.style.left = "50%";
		options_div.style.marginLeft = "-498px";
        options_div.style.width = "988px";
        options_div.style.height = "100%";
        options_div.style.background = "#FFFFFF";
		options_div.style.color = "#000000";
		options_div.style.zIndex = "2";
        options_div.innerHTML = options_innerHTML;
        document.body.appendChild(options_div);
	
if (GM_getValue("version") == 2055){
	$('input:radio[name=mainBackgroundType]')[GM_getValue("mainBackgroundType")].checked = true;
	$('input:radio[name=rounded_corners]')[GM_getValue("rounded_corners")].checked = true;
	$('#mainBackgroundGradientFrom').val(GM_getValue("mainBackgroundGradientFrom"));
	$('#mainBackgroundGradientTo').val(GM_getValue("mainBackgroundGradientTo"));
	$('#mainBackgroundSolid').val(GM_getValue("mainBackgroundSolid"));
	$('#mainBackgroundUrl').val(GM_getValue("mainBackgroundUrl"));
	$('#bgIMGTiled').attr('checked', GM_getValue("bgIMGTiled"));
	$('#reload_fb').attr('checked', GM_getValue("reload_fb"));
	$('#bgFirstPage').attr('checked', GM_getValue("bgFirstPage"));
	$('#message_border').attr('checked', GM_getValue("message_border"));
	$('#message_shadow').attr('checked', GM_getValue("message_shadow"));
	$('#message_bg').attr('checked', GM_getValue("message_bg"));
	$('#barTransparencyNormal').val(GM_getValue("barTransparencyNormal"));
	$('#barTransparencyHover').val(GM_getValue("barTransparencyHover"));
	$('#leftTransparencyNormal').val(GM_getValue("leftTransparencyNormal"));
	$('#leftTransparencyHover').val(GM_getValue("leftTransparencyHover"));
	$('#rightTransparencyNormal').val(GM_getValue("rightTransparencyNormal"));
	$('#rightTransparencyHover').val(GM_getValue("rightTransparencyHover"));
	$('#contentAreaTransparencyNormal').val(GM_getValue("contentAreaTransparencyNormal"));
	$('#contentAreaTransparencyHover').val(GM_getValue("contentAreaTransparencyHover"));
	$('#left_sidebar_fixed').attr('checked', GM_getValue("leftColFixed"));
	$('#right_sidebar_fixed').attr('checked', GM_getValue("rightColFixed"));
	$('#menu_bar_fixed').attr('checked', GM_getValue("navBarFixed"));
	$('#addLogout').attr('checked', GM_getValue("addLogout"));
	$('#keyboardShortcuts').attr('checked', GM_getValue("keyboardShortcuts"));
	$('#emoticonBar').attr('checked', GM_getValue("emoticonBar"));
	$('#lfdefault').attr('checked', GM_getValue("lfdefault"));
	$('#roboform').attr('checked', GM_getValue("roboform"));
	$('#faviconAlerts').attr('checked', GM_getValue("faviconAlerts"));
	$('#menu_bar_transparent').attr('checked', GM_getValue("transperentFBBar"));
	$('#left_sidebar_transparent').attr('checked', GM_getValue("transperentLeftBar"));
	$('#right_sidebar_transparent').attr('checked', GM_getValue("transperentRightBar"));
	$('#transperentMainContent').attr('checked', GM_getValue("transperentcontentArea"));
	$('#hideReqbox').attr('checked', GM_getValue("hideReqbox"));
	$('#hideAdbox').attr('checked', GM_getValue("hideAdbox"));
	$('#hideEventbox').attr('checked', GM_getValue("hideEventbox"));
	$('#hidePokebox').attr('checked', GM_getValue("hidePokebox"));
	$('#hideConnectbox').attr('checked', GM_getValue("hideConnectbox"));
	$('#hideOnlineFriends').attr('checked', GM_getValue("hideOnlineFriends"));
	$('#optlink_account').attr('checked', GM_getValue("optlink_account"));
	$('#optlink_main').attr('checked', GM_getValue("optlink_main"));
}
else {
	GM_setValue("version", 2055);
	GM_setValue("mainBackgroundType", 3);
	GM_setValue("rounded_corners", 1);
	GM_setValue("bfcre_ads_radio", 1);
	GM_setValue("mainBackgroundGradientFrom", "FFFFFF");
	GM_setValue("mainBackgroundGradientTo", "EEEEEE");
	GM_setValue("mainBackgroundSolid", "FFFFFF");
	GM_setValue("mainBackgroundUrl", "http://beautify.it/background_2050.jpg");
	GM_setValue("bgIMGTiled", false);
	GM_setValue("reload_fb", true);
	GM_setValue("bgFirstPage", true);
	GM_setValue("message_border", true);
	GM_setValue("message_shadow", true);
	GM_setValue("message_bg", true);
	GM_setValue("barTransparencyNormal", 80);
	GM_setValue("barTransparencyHover", 100);
	GM_setValue("leftTransparencyNormal", 80);
	GM_setValue("leftTransparencyHover", 100);
	GM_setValue("rightTransparencyNormal", 80);
	GM_setValue("rightTransparencyHover", 100);
	GM_setValue("contentAreaTransparencyNormal", 80);
	GM_setValue("contentAreaTransparencyHover", 100);
	GM_setValue("leftColFixed", true);
	GM_setValue("rightColFixed", true);
	GM_setValue("navBarFixed", true);
	GM_setValue("addLogout", true);
	GM_setValue("keyboardShortcuts", true);
	GM_setValue("emoticonBar", true);
	GM_setValue("lfdefault", false);
	GM_setValue("roboform", false);
	GM_setValue("faviconAlerts", true);
	GM_setValue("transperentFBBar", true);
	GM_setValue("transperentLeftBar", true);
	GM_setValue("transperentRightBar", true);
	GM_setValue("transperentcontentArea", false);
	GM_setValue("hideReqbox", false);
	GM_setValue("hideAdbox", false);
	GM_setValue("hideEventbox", false);
	GM_setValue("hidePokebox", false);
	GM_setValue("hideConnectbox", false);
	GM_setValue("hideOnlineFriends", false);
	GM_setValue("optlink_account", true);
	GM_setValue("optlink_main", true);	
}

function delay(prmSec)
{
	prmSec *= 1000;
	
	var eDate = null;
	var eMsec = 0;
	
	var sDate = new Date();
	var sMsec = sDate.getTime();
	
	do {
		eDate = new Date();
		eMsec = eDate.getTime();
		
	} while ((eMsec-sMsec)<prmSec);
}

$('#save_btn').click(function() {
	$('#saveNotification').fadeIn('slow');
	GM_setValue("mainBackgroundType", $('input[name=mainBackgroundType]:checked').val());
	GM_setValue("rounded_corners", $('input[name=rounded_corners]:checked').val());
	GM_setValue("mainBackgroundGradientFrom", $('#mainBackgroundGradientFrom').val());
	GM_setValue("mainBackgroundGradientTo", $('#mainBackgroundGradientTo').val());
	GM_setValue("mainBackgroundSolid", $('#mainBackgroundSolid').val());
	GM_setValue("mainBackgroundUrl", $('#mainBackgroundUrl').val());
	GM_setValue("bgIMGTiled", $('#bgIMGTiled').attr('checked'));
	GM_setValue("reload_fb", $('#reload_fb').attr('checked'));
	GM_setValue("bgFirstPage", $('#bgFirstPage').attr('checked'));
	GM_setValue("message_border", $('#message_border').attr('checked'));
	GM_setValue("message_shadow", $('#message_shadow').attr('checked'));
	GM_setValue("message_bg", $('#message_bg').attr('checked'));
	GM_setValue("barTransparencyNormal", $('#barTransparencyNormal').val());
	GM_setValue("barTransparencyHover", $('#barTransparencyHover').val());
	GM_setValue("leftTransparencyNormal", $('#leftTransparencyNormal').val());
	GM_setValue("leftTransparencyHover", $('#leftTransparencyHover').val());
	GM_setValue("rightTransparencyNormal", $('#rightTransparencyNormal').val());
	GM_setValue("rightTransparencyHover", $('#rightTransparencyHover').val());
	GM_setValue("contentAreaTransparencyNormal", $('#contentAreaTransparencyNormal').val());
	GM_setValue("contentAreaTransparencyHover", $('#contentAreaTransparencyHover').val());
	GM_setValue("leftColFixed", $('#left_sidebar_fixed').attr('checked'));
	GM_setValue("rightColFixed", $('#right_sidebar_fixed').attr('checked'));
	GM_setValue("navBarFixed", $('#menu_bar_fixed').attr('checked'));
	GM_setValue("addLogout", $('#addLogout').attr('checked'));
	GM_setValue("keyboardShortcuts", $('#keyboardShortcuts').attr('checked'));
	GM_setValue("emoticonBar", $('#emoticonBar').attr('checked'));
	GM_setValue("lfdefault", $('#lfdefault').attr('checked'));
	GM_setValue("roboform", $('#roboform').attr('checked'));
	GM_setValue("faviconAlerts", $('#faviconAlerts').attr('checked'));
	GM_setValue("transperentFBBar", $('#menu_bar_transparent').attr('checked'));
	GM_setValue("transperentLeftBar", $('#left_sidebar_transparent').attr('checked'));
	GM_setValue("transperentRightBar", $('#right_sidebar_transparent').attr('checked'));
	GM_setValue("transperentcontentArea", $('#transperentMainContent').attr('checked'));
	GM_setValue("hideReqbox", $('#hideReqbox').attr('checked'));
	GM_setValue("hideAdbox", $('#hideAdbox').attr('checked'));
	GM_setValue("hideEventbox", $('#hideEventbox').attr('checked'));
	GM_setValue("hidePokebox", $('#hidePokebox').attr('checked'));
	GM_setValue("hideConnectbox", $('#hideConnectbox').attr('checked'));
	GM_setValue("hideOnlineFriends", $('#hideOnlineFriends').attr('checked'));
	GM_setValue("optlink_account", $('#optlink_account').attr('checked'));
	GM_setValue("optlink_main", $('#optlink_main').attr('checked'));
	delay(2);
	location.reload();
});
$('#reset_btn').click(function() {
	$('#resetNotification').fadeIn('slow');
	GM_setValue("version", 2055);
	GM_setValue("mainBackgroundType", 3);
	GM_setValue("rounded_corners", 1);
	GM_setValue("bfcre_ads_radio", 1);
	GM_setValue("mainBackgroundGradientFrom", "FFFFFF");
	GM_setValue("mainBackgroundGradientTo", "EEEEEE");
	GM_setValue("mainBackgroundSolid", "FFFFFF");
	GM_setValue("mainBackgroundUrl", "http://beautify.it/background_2050.jpg");
	GM_setValue("bgIMGTiled", false);
	GM_setValue("reload_fb", true);
	GM_setValue("bgFirstPage", true);
	GM_setValue("message_border", true);
	GM_setValue("message_shadow", true);
	GM_setValue("message_bg", true);
	GM_setValue("barTransparencyNormal", 80);
	GM_setValue("barTransparencyHover", 100);
	GM_setValue("leftTransparencyNormal", 80);
	GM_setValue("leftTransparencyHover", 100);
	GM_setValue("rightTransparencyNormal", 80);
	GM_setValue("rightTransparencyHover", 100);
	GM_setValue("contentAreaTransparencyNormal", 80);
	GM_setValue("contentAreaTransparencyHover", 100);
	GM_setValue("leftColFixed", true);
	GM_setValue("rightColFixed", true);
	GM_setValue("navBarFixed", true);
	GM_setValue("addLogout", true);
	GM_setValue("keyboardShortcuts", true);
	GM_setValue("emoticonBar", true);
	GM_setValue("lfdefault", false);
	GM_setValue("roboform", false);
	GM_setValue("faviconAlerts", true);
	GM_setValue("transperentFBBar", true);
	GM_setValue("transperentLeftBar", true);
	GM_setValue("transperentRightBar", true);
	GM_setValue("transperentcontentArea", false);
	GM_setValue("hideReqbox", false);
	GM_setValue("hideAdbox", false);
	GM_setValue("hideEventbox", false);
	GM_setValue("hidePokebox", false);
	GM_setValue("hideConnectbox", false);
	GM_setValue("hideOnlineFriends", false);
	GM_setValue("optlink_account", true);
	GM_setValue("optlink_main", true);
	delay(2);
	location.reload();
});		
	
if($('body').hasClass('fbIndex')){
	if (GM_getValue("rounded_corners") == 1 || GM_getValue("rounded_corners") == 2 || GM_getValue("rounded_corners") == 3) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pageFooter, .loggedout_menubar_container, .WelcomePage_MainSellCenter, .WelcomePage_MainSell {-moz-border-radius:10px; -webkit-border-radius: 10px; border-radius: 10px;}";
	}		
	if (GM_getValue("bgFirstPage")) {
		// Background Type
		if (GM_getValue("mainBackgroundType") == 0) {
				document.body.style.background = '#FFFFFF !important';
		}
		if (GM_getValue("mainBackgroundType") == 1) {
				document.body.style.background = '-webkit-gradient(linear, left top, left bottom, from('+GM_getValue("mainBackgroundGradientFrom")+'), to('+GM_getValue("mainBackgroundGradientTo")+')) fixed !important';
		}
		if (GM_getValue("mainBackgroundType") == 2) {
				document.body.style.background = GM_getValue("mainBackgroundSolid");
		}
		if (GM_getValue("mainBackgroundType") == 3) {
			if (GM_getValue("bgIMGTiled")){
				var bg_space = document.body;
				var bg_div = document.createElement('div');
				bg_div.className = 'bg';
				bg_space.insertBefore(bg_div, bg_space.firstChild);
				style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
				style.type = 'text/css';
				style.innerHTML = ".bg{min-height: 100%; min-width: 1024px; width: 100%; height: auto; position: fixed; top: 0; left: 0; z-index:-10; background-repeat:repeat; background:url(" + GM_getValue("mainBackgroundUrl") + ");}";			
			}
			else {
				var bg_space = document.body;
				var bg_img = document.createElement('img');
				bg_img.src = GM_getValue("mainBackgroundUrl");
				bg_img.className = 'bg';
				bg_space.insertBefore(bg_img, bg_space.firstChild);
				style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
				style.type = 'text/css';
				style.innerHTML = "img.bg{min-height: 100%; min-width: 1000px; width: 100%; height: auto; position: fixed; top: 0; left: 0; z-index:-10;}";
			}
		}
	}		
}
else {
	$('#pageHead').wrap('<div id="PHWrapper"></div>').css({"width":"987px !important","background-color":"#3B5998","height":"41px","margin-left":"-6px !important","z-index":"3"});

	//Add extra Logout to the Menu
	if (GM_getValue("addLogout")) {
		$("#pageNav li#navAccount ul li:last").clone().prependTo("#pageNav");
	}

	//Make Klick on Facebook Logo allways display the Live Feed
	if (GM_getValue("lfdefault")) {
		document.getElementById("pageLogo").firstChild.href = "http://www.facebook.com/?sk=lf";
	}
	//Shorten FB for Roboform
	if (GM_getValue("roboform")) {
		style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		style.type = 'text/css';
		style.innerHTML = ".fbDockWrapper{bottom:30px;}";
	}
	
	//Add Options Link to Account Menu
	if (GM_getValue("optlink_account")) {
		var optionsLi = document.createElement('li');
		var optionsLink = document.createElement('a');
		optionsLink.href = '#bfcre_options';
		optionsLink.textContent = 'Options';
		optionsLink.className = 'dropdown_item';
		optionsLink.id = "account_options";
		optionsLink.className = "options_link"
		optionsLi.appendChild(optionsLink);
		document.getElementById('navAccount').getElementsByTagName('ul')[0].appendChild(optionsLi);
	}

	//Add Options Link to Main Menu
	if (GM_getValue("optlink_main")){
		var option = "";
		var optionid = "";
		if(GM_getValue("version") != 2055 || GM_getValue("version") == null){
			option = "Options (Updated)";
			optionid = "options_menu_updated";
		}
		else {
			option = "Options";
			optionid = "options_menu";
		}
		var konto_var = document.getElementById("navAccount");
		var new_options = document.createElement('li');
		new_options.id = "menu_options";
		new_options.innerHTML = "<a class=\"options_link\" id=\""+optionid+"\">"+option+"</a>";
		konto_var.parentNode.insertBefore(new_options,konto_var);	
	}
	
	$('.options_link').click(function() {
		$('#bfcre_options').toggle('slow', function() {});
	});

	// Semi Tranparency in Header
	if (GM_getValue("transperentFBBar")) {
		style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		style.type = 'text/css';
		style.innerHTML = "#pageHead {opacity: " + GM_getValue("leftTransparencyNormal")/100 + " !important;} #pageHead:hover {opacity: " + GM_getValue("leftTransparencyHover")/100 + " !important;}";
	}
	
	// Semi Tranparency in LeftBar
	if (GM_getValue("transperentLeftBar")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#leftCol{opacity: " + GM_getValue("leftTransparencyNormal")/100 + " !important;} #leftCol:hover {opacity: " + GM_getValue("leftTransparencyHover")/100 + " !important;}";
	}
	
	// Semi Tranparency in RightBar
	if (GM_getValue("transperentRightBar")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#rightCol{opacity: " + GM_getValue("rightTransparencyNormal")/100 + " !important;} #rightCol:hover {opacity: " + GM_getValue("rightTransparencyHover")/100 + " !important;}";
	}

	// Semi Tranparency in Content
	if (GM_getValue("transperentcontentArea")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#contentArea{opacity: " + GM_getValue("contentAreaTransparencyNormal^")/100 + " !important;} #contentArea:hover {opacity: " + GM_getValue("contentAreaTransparencyHover")/100 + " !important;}";
	}
	
	// Fix left column
	if (GM_getValue("leftColFixed")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = ".home #leftCol {position:fixed !important;}";
	}

	// Fix right column
	if (GM_getValue("rightColFixed")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = ".home #rightCol {position:fixed !important; margin-left:540px;}";
	}

	// Fix NavBar
	if (GM_getValue("navBarFixed")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pageHead, #blueBar {position:fixed !important;}";
	}
	else {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pageHead, #blueBar {position:absolute !important;}";
	}

	// Message Border
	if (GM_getValue("message_border")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = ".uiStreamStory, .pvm, .UIIntentionalStory {border-style:dashed !important; border-color:#CCC !important; border-width:1px !important;}";
	}
	
	// Message Shadow
	if (GM_getValue("message_shadow")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = ".uiStreamStory, .pvm, .UIIntentionalStory { -webkit-box-shadow: 2px 2px 2px #cccccc; -moz-box-shadow: 2px 2px 2px #cccccc; box-shadow: 2px 2px 2px #cccccc;}";
	}
	
	// Message Background
	if (GM_getValue("message_bg")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = ".uiStreamStory, .pvm, .UIIntentionalStory {background:#F4F4F4 !important;}";
	}

	// Background Type
	if (GM_getValue("mainBackgroundType") == 0) {
			document.body.style.background = '#FFFFFF !important';
	}
	
	if (GM_getValue("mainBackgroundType") == 1) {
			document.body.style.background = '-webkit-gradient(linear, left top, left bottom, from('+GM_getValue("mainBackgroundGradientFrom")+'), to('+GM_getValue("mainBackgroundGradientTo")+')) fixed !important';
	}
	
	if (GM_getValue("mainBackgroundType") == 2) {
			document.body.style.background = GM_getValue("mainBackgroundSolid");
	}

	if (GM_getValue("mainBackgroundType") == 3) {
		if (GM_getValue("bgIMGTiled")){
			var bg_space = document.body;
			var bg_div = document.createElement('div');
			bg_div.className = 'bg';
			bg_space.insertBefore(bg_div, bg_space.firstChild);
			style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
			style.type = 'text/css';
			style.innerHTML = ".bg{min-height: 100%; min-width: 1024px; width: 100%; height: auto; position: fixed; top: 0; left: 0; z-index:-10; background-repeat:repeat; background:url(" + GM_getValue("mainBackgroundUrl") + ");}";			
		}
		else {
			var bg_space = document.body;
			var bg_img = document.createElement('img');
			bg_img.src = GM_getValue("mainBackgroundUrl");
			bg_img.className = 'bg';
			bg_space.insertBefore(bg_img, bg_space.firstChild);
			style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
			style.type = 'text/css';
			style.innerHTML = "img.bg{min-height: 100%; min-width: 1000px; width: 100%; height: auto; position: fixed; top: 0; left: 0; z-index:-10;}";
		}
	}
	
	if (GM_getValue("hideReqbox")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pagelet_netego_requests {display:none !important}";
	}

	if (GM_getValue("hideAdbox")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pagelet_adbox, #pagelet_ads, #sidebar_ads, #pagelet_netego_ads, #ego_pane {display:none !important}";
	}
	
	if (GM_getValue("hideEventbox")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pagelet_eventbox {display:none !important}";
	}
	
	if (GM_getValue("hidePokebox")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pagelet_netego_pokes {display:none !important}";
	}
	
	if (GM_getValue("hideConnectbox")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pagelet_netego_lower {display:none !important}";
	}

	if (GM_getValue("hideOnlineFriends")) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pagelet_friends_online {display:none !important}";
	}

	// Rounded Options
	if (GM_getValue("rounded_corners") == 1) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pageFooter, #leftCol, .profile .left_column, #rightCol, .hasLeftCol #contentArea, .hasRightCol #contentArea, .fbPrivacyPage, .profilePreviewHeader, .profileVideoContainer, .profile_top_wash, .UIStandardFrame_Content, .uiBoxWhite, .UIGradientWashPage_Container {-moz-border-radius:10px; -webkit-border-radius: 10px; border-radius: 10px;} #blueBar, #pageHead {-moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px; -moz-border-radius-bottomright:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px;} #headerArea, .friendBrowserCheckboxFilters {-moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; border-top-left-radius:10px; -moz-border-radius-topright:10px; -webkit-border-top-right-radius:10px; border-top-right-radius:10px;} .profile .right_column, .photos_tab, #profile_pager_container, .uiMorePager, .profile_two_columns .right_column, #blog_main_column {-webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px;}";
	}

	if (GM_getValue("rounded_corners") == 2) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pageFooter, #leftCol, .profile .left_column, #rightCol, .hasLeftCol #contentArea, .hasRightCol #contentArea, .fbPrivacyPage, .profilePreviewHeader, .profileVideoContainer, .profile_top_wash, .UIStandardFrame_Content, .uiStreamStory, .pvm, .UIIntentionalStory, .uiBoxWhite, .UIGradientWashPage_Container {-moz-border-radius:10px; -webkit-border-radius: 10px; border-radius: 10px;} #blueBar, #pageHead {-moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px; -moz-border-radius-bottomright:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px;} #headerArea, .friendBrowserCheckboxFilters {-moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; border-top-left-radius:10px; -moz-border-radius-topright:10px; -webkit-border-top-right-radius:10px; border-top-right-radius:10px;} .profile .right_column, .photos_tab, #profile_pager_container, .uiMorePager, .profile_two_columns .right_column, #blog_main_column {-webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px;}";
	}

	if (GM_getValue("rounded_corners") == 3) {
		  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		  style.type = 'text/css';
		  style.innerHTML = "#pageFooter, #leftCol, .profile .left_column, #rightCol, .hasLeftCol #contentArea, .hasRightCol #contentArea, .fbPrivacyPage, .profilePreviewHeader, .profileVideoContainer, .profile_top_wash, .UIStandardFrame_Content, .uiStreamStory, .pvm, .UIIntentionalStory, .uiCloseButton, .uiBoxWhite, .img, .loggedout_menubar_container, #profile_pic, .uiProfilePhotoLarge, .uiProfilePhoto, .uiProfilePhotoMedium, .UIProfileImage, .UIProfileImage_LARGE, .fbChatBuddylist a.friend img, .hoverZoomLink, .uiMediaThumbWrap, .UIGradientWashPage_Container {-moz-border-radius:10px; -webkit-border-radius: 10px; border-radius: 10px;} #blueBar, #pageHead {-moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px; -moz-border-radius-bottomright:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px;} #headerArea, .friendBrowserCheckboxFilters {-moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; border-top-left-radius:10px; -moz-border-radius-topright:10px; -webkit-border-top-right-radius:10px; border-top-right-radius:10px;} .profile .right_column, .photos_tab, #profile_pager_container, .uiMorePager, .profile_two_columns .right_column, #all_threads, .thread, .post_editor, #blog_main_column {-webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px;}";
	}

	//Keyboard Shortcuts
	if (GM_getValue("keyboardShortcuts")) {
		window.addEventListener('keypress', function() {
			if (event.shiftKey && !event.target.tagName.match(/text|input|select/i) && event.target.getAttribute('contenteditable') != 'true') {
				switch (String.fromCharCode(event.keyCode).toLowerCase()) {
					case 'h':
						window.location = 'http://www.facebook.com/';
					break;
					case 'p':
						window.location = 'http://www.facebook.com/profile.php';
					break;
					case 'f':
						window.location = 'http://www.facebook.com/friends/?filter=afp';
					break;
					case 'i':
						window.location = 'http://www.facebook.com/inbox';
					break;
					case 's':
						window.location = 'http://www.facebook.com/editaccount.php';
					break;
					case 'c':
						window.location = 'javascript:buddyList.toggleTab()';
					break;
					default:
					break;
				}
			}
		}, false);
	}

	//Add Emoticons
	if (GM_getValue("emoticonBar")) {
		
		var debugMode = false;
		
		var emotsInfo = new Array();
		emotsInfo[0] = ':)';
		emotsInfo[1] = ':(';
		emotsInfo[2] = ':-P';
		emotsInfo[3] = ':D';
		emotsInfo[4] = ':o';
		emotsInfo[5] = ';)';
		emotsInfo[6] = '8)';
		emotsInfo[7] = '8|';
		emotsInfo[8] = '>:O';
		emotsInfo[9] = ':/';
		emotsInfo[10] = ':\'(';
		emotsInfo[11] = '3:)';
		emotsInfo[12] = 'O:)';
		emotsInfo[13] = ':*';
		emotsInfo[14] = '<3';
		emotsInfo[15] = '^_^';
		emotsInfo[16] = ';)';
		emotsInfo[17] = 'o.O';
		emotsInfo[18] = '>:O';
		emotsInfo[19] = ':v';
		emotsInfo[20] = ':3';
		emotsInfo[21] = ':|]';
		emotsInfo[22] = '(^^^)';
		emotsInfo[23] = '<(")';
		emotsInfo[24] = ':putnam:';
		emotsInfo[25] = '*msg*';
		emotsInfo[26] = '_msg_';
		
		var fEmotBarDom = document.createElement('div');
		fEmotBarDom.setAttribute('class','emote_iconbar_class');
		fEmotBarDom.setAttribute('id','emote_iconbar_id');
		fEmotBarDom.setAttribute('style','width:254px; height:38px; border-top:1px solid #93A2C1;');
		
		for(i=0;i<emotsInfo.length;i++) {
			var fEmotsDom = document.createElement('a');
			fEmotsDom.setAttribute('style','cursor: pointer; background: transparent url('+"http://beautify.it/gs/icons/"+i+".png"+') no-repeat; width:16px; height:16px; margin:1px; float:left;');
			fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
			fEmotsDom.setAttribute('class','_FBCT_EXT_emote_img emote_img');
			fEmotsDom.setAttribute('rel',emotsInfo[i]);
			fEmotsDom.setAttribute('value','&nbsp;');
			fEmotBarDom.appendChild(fEmotsDom);
		}
		
		function showAlert(str){
			if (debugMode) alert(str);
		}
		
		function fInsertedNodeHandler(event) {
			try{
				elm = jQuery(event.target);
			if(elm.hasClass('fbDockChatTab')&&
				!jQuery('.emote_iconbar_class',elm).length)	
				fInsertEmotBar(event.target);
			}catch(e){showAlert('fInsertedNodeHandler: ' + e.message)}
		}
		
		document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);
		
		function fInsertEmotBar(fChatWrapper) {
			try{
				showAlert('fChatWrapper = ' + fChatWrapper.className);
				fChatToolBox = fChatWrapper.getElementsByClassName('inputContainer')[0];
				fNewEmotBar = fEmotBarDom.cloneNode(true);
				if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.lastChild);
				else fChatToolBox.appendChild(fNewEmotBar);
				$('a',fNewEmotBar).bind('click',fEmotClickHandler);
				$('._FBCT_EXT_emote_get',fNewEmotBar).bind('click',fEmotClickHandler);
			}catch(e){showAlert('fInsertEmotBar: ' + e.message)}
		}
		
		function fEmotClickHandler(event){
			try{
				elm = event.target;
				showAlert('elm: '+elm);
				var fChatInput = event.target.parentNode.parentNode.getElementsByClassName('input')[0];
				fChatInput.value += ' '+event.target.getAttribute('rel')+' ';
				fChatInput.focus();
			}catch(e){showAlert('fEmotClickHandler: ' + e.message)}
		}
	}

	//Favicon Alerts
	if (GM_getValue("faviconAlerts")) {
		var head = document.getElementsByTagName('head')[0];
		var links = head.getElementsByTagName('link');
		for (var i in links) {
			if (links[i].rel == 'shortcut icon') {
				links[i].type = 'image/png';
				var shortcutLink = links[i];
			}
		}
		function updateFavicon() {
			if (document.getElementById('requestsWrapper').className.indexOf("jewelNew") || document.getElementById('mailWrapper').className.indexOf("jewelNew") || document.getElementById('notificationsWrapper').className.indexOf("jewelNew")) {
				var count = parseInt(document.getElementById('jewelRequestCount').textContent) + parseInt(document.getElementById('jewelInnerUnseenCount').textContent) + parseInt(document.getElementById('jewelNotif').firstChild.firstChild.textContent);
				var canvas = document.createElement('canvas');
				canvas.height = '16';
				canvas.width = '16';
				if (canvas.getContext) {
					var context = canvas.getContext('2d');
					context.fillStyle = '#FEF4AC';
					context.strokeStyle = '#DABC5C';
					context.font = '8px Micro';
					context.textBaseline = 'hanging';
					var base = new Image();
					base.addEventListener(load, function() {
						context.drawImage(base, 0, 0);
						if (count > 0 && count < 10) {
							context.fillRect(9, 2, 7, 9);
							context.strokeRect(9, 2, 7, 9);
							context.fillStyle = '#000000';
							context.fillText(count, 11, 4);
						} else if (count > 9 && count < 100) {
							context.fillRect(5, 2, 11, 9);
							context.strokeRect(5, 2, 11, 9);
							context.fillStyle = '#000000';
							context.fillText(count, 7, 4);
						} else if (count > 99 && count < 1000) {
							context.fillRect(1, 2, 15, 9);
							context.strokeRect(1, 2, 15, 9);
							context.fillStyle = '#000000';
							context.fillText(count, 3, 4);
						} else if (count > 999 && count < 10000) {
							context.fillRect(1, 2, 15, 9);
							context.strokeRect(1, 2, 15, 9);
							context.fillStyle = '#000000';
							context.fillText(Math.floor(count/1000)+'K+', 3, 4);
						} else if (count > 10000) {
							context.fillRect(5, 2, 11, 9);
							context.strokeRect(5, 2, 11, 9);
							context.fillStyle = '#000000';
							context.fillText('#', 7, 4);
						}
						shortcutLink.href = canvas.toDataURL();
					});
					base.src = 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAABILAAASCwAAEAAAABAAAACYWTsAnmJFAKt4YACseWEAtIRtAPTu6wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd3d3d3d3d3dzAAAAAAAAN3FERERGZEQXcUREREZkRBdwAAAABmAAB3AAAAAGYAAHcAAAAAZgAAdwAAAFVmVQB3AAAAZmZmAHcAAAAAZgAAdwAAAABmAAB3AAAAAFZmAHcAAAAAJWYAdwAAAAAAAAB3MAAAAAAAA3d3d3d3d3d3f//wAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAD//wAA';
				}
			} else {
				shortcutLink.type = 'image/x-icon';
				shortcutLink.href = 'http://facebook.com/favicon.ico';
			}
			var frame = document.createElement('iframe');
			frame.display = 'none';
			frame.src = shortcutLink.href;
			document.body.appendChild(frame);
			document.body.removeChild(frame);
			setTimeout(updateFavicon, 5000);
		}
		updateFavicon();
	}
}