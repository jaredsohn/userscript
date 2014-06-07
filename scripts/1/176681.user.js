// ==UserScript==
// @name       HackForums Notepad Extreme
// @version    1.0.2
// @description  How does writing make you feel?
// @include     *hackforums.net/*
// @require        http://code.jquery.com/jquery-1.9.1.js
// @require        http://www.richardhsu.me/jquery.ambiance/assets/js/jquery.ambiance.js
// @resource    customCSS http://www.richardhsu.me/jquery.ambiance/assets/css/jquery.ambiance.css
// @copyright  CresentChaos
// @icon           http://img153.imageshack.us/img153/5325/9e0c.png
// ==/UserScript==

var mynotes = GM_getValue("mynotes", "I love you!, do you love me? :*");
var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);


var SUC_script_num = 176681;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for "'+script_name+'."\nWould you like to install it now?')){GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


// Create div
vnotebar = document.createElement("div");
vnotebar.setAttribute("id", "notebar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vnotebar);

// Save
unsafeWindow.savenotes = function() {
	window.setTimeout(GM_setValue, 0, "mynotes", document.getElementById("notes").value);
}

// Clear
unsafeWindow.startnotes = function() {
	if(document.getElementById("notes").value == "I love you!, do you love me? :*")
	{
		document.getElementById("notes").value = "";
    $.ambiance({message: "Thanks you for try me :D! Miauuu....!", 
            title: "Welcome!",
		timeout: 3
}
		);
	}
}

unsafeWindow.clearnotes = function() {
	document.getElementById("notes").value = "";
	window.setTimeout(GM_setValue, 0, "mynotes", document.getElementById("notes").value);
    $.ambiance({message: "Notepad cleaned :)!", 
            title: "Success!",
		 type: "success"
});

}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.left = "-418px")
	{
$( "#notebar" ).animate({ "left": "+=418px" }, "slow" );
document.getElementById("notetab").style.visibility = "hidden";
document.getElementById("notetabalt").style.visibility = "visible";
	}
}

unsafeWindow.hidenotes = function() {
$( "#notebar" ).animate({ "left": "-=418px" }, "slow" );
document.getElementById("notetab").style.visibility = "visible";
document.getElementById("notetabalt").style.visibility = "hidden";
}


// Add styles
GM_addStyle("#notebar { width:410px; position:fixed; left:-418px; height:400px; top:0px; z-index: 50; background: #333333; border:3px #4F3A6B solid;}");

GM_addStyle("#nhead { height:25px; width:410px; position:absolute; left:0px; top:0px; background:url(http://x.hackforums.net/images/blackreign/thead_bg.gif); line-height:23px; font-weight:bold; font-size:12px;} ");

GM_addStyle("#bitButton:hover { color: #888888; text-decoration: none; cursor: pointer; }");

GM_addStyle("#bitButton:active { color: #CCCCCC; text-decoration: underline; cursor: pointer; }");

GM_addStyle("#bitButton { background-color: #531F3E; background-image: -moz-linear-gradient(center top , #825E7E 0%, #460D2C 100%); border: 1px solid #370C23 !important; border-radius: 0 6px 0 6px !important; box-shadow: 0 1px 0 0 #B087AB inset !important; color: #EFEFEF; font-family: arial; font-size: 14px; font-weight: bold; padding: 3px 6px; text-decoration: none; text-shadow: 1px 1px 0 #000000; }");

GM_addStyle("#nfoot { width:410px; height:35px; position:absolute; bottom:0px; left:0px;}");

GM_addStyle("#notes { width:346px; height:318px ; position: absolute; top:31px; left:29px; right:5px; bottom:5px; background: none repeat scroll 0 0 #CCCCCC; border:1px solid #0F5C8E; font-family: Verdana,Arial,Sans-Serif; line-height: 1.4; font-size: 13px; padding:2px; } ");

GM_addStyle("#notetab { background:url(http://img153.imageshack.us/img153/673/i5fh.png); cursor: pointer; width:24px; height:55px; position:absolute; right:-27px; top:0px; z-index:495; } ");

GM_addStyle("#notetab:hover { background:url(http://img202.imageshack.us/img202/2491/gqm7.png); cursor: pointer; width:24px; height:55px; position:absolute; right:-27px; top:0px; z-index:495; }");

GM_addStyle("#notetabalt { background:url(http://img153.imageshack.us/img153/673/i5fh.png); cursor: pointer; width:24px; height:55px; position:absolute; right:-27px; top:0px; z-index:495; } ");

GM_addStyle("#notetabalt:hover { background:url(http://img202.imageshack.us/img202/2491/gqm7.png); cursor: pointer; width:24px; height:55px; position:absolute; right:-27px; top:0px; z-index:495; }");

var nbHTML = '<div id="notetabalt" visibility="hidden" onclick="hidenotes()"></div><div id="notetab" onclick="shownotes()"></div>';
nbHTML += '<div id="nhead"><center><a style="text-shadow:#000 0px 0px 3px;border-bottom:0px #808080 dotted; color: #FFFFFF; background:url(http://imageshack.us/a/img129/1723/1ff5.gif);" href="http://www.hackforums.net/member.php?action=profile&uid=667530">Notepad by CresentChaos</a></center></div>';
nbHTML += '<textarea id="notes" style="resize: none;" name="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"><center><button id="bitButton" onclick="clearnotes()">Clear Notepad</button><br><img style="visibility: hidden" src="http://cresentchaos.altervista.org/online/usersonline.php" /></center></div>';
document.getElementById("notebar").innerHTML = nbHTML;