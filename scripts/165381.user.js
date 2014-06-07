// ==UserScript==
// @name      Worre's forum enhancer kit beta
// @namespace http://files.worreh.com/
// @include   http://*.leagueoflegends.com/board/
// @include   http://*.leagueoflegends.com/board/*
// @exclude	  *support.leagueoflegends.com/*
// @exclude	  http://leagueoflegends.wikia.com/*
// @version   0.9G006
// @author    Worre
// @homepage  http://worreh.com/
// @copyright 2013+, Worre (http://worreh.com/)
// ==/UserScript==

if(document.getElementById('lol-pvpnet-bar-account') != null) {
function fuckyouJS()
{
var fekStr2 = '#fekmenu{color: rgb(0, 150, 255); display: inline-block;position:relative;left:5px;font-size:15px;width: 33px;}#fekmenu ul ul{display:none;background:url("http://euw.leagueoflegends.com/sites/all/modules/riot/lol_pvpnet_bar/img/pvpnet-sprite-v2.png") repeat-x scroll 0px -123px #111; border-style: solid;border-color: rgb(119, 119, 119);border-width: 0px 2px 2px 2px;border-radius: 0px 0px 5px 5px;height: 85px;width: 95px;position: relative;left: -22px;}#fekmenu ul:hover ul {display: block; background-color: black;}.fekmenuitem{height: 30px;width: 90px;float: left;font-size: 14px;text-align: center; line-height: 15px;position:relative;}.fekmenuitem a {height: 16px;display: inline-block;width: 94px;}.fekmenuitem span	{height:28px;}.fekmenuitem1 {top: 7px;}.fekmenuitem2 {top: 4px;}.fekmenuitem:hover > span a {background-color: rgba(165, 165, 165, 0.35);}#fekmenu ul li p {color: rgb(0, 150, 255);background: rgb(47, 47, 47) url(http://euw.leagueoflegends.com/sites/all/modules/riot/lol_pvpnet_bar/img/pvpnet-sprite-v2.png) 0px -42px repeat-x;padding: 0 10px;line-height: 31px;height: 31px;text-transform: uppercase;display: block;display: inline-block;text-decoration: none;border-left: 1px solid rgb(43, 43, 43);border-right: 1px solid rgb(35, 35, 35);border-right: 1px solid rgba(35, 35, 35, .7);font-size: 11px;}#fekmenu ul:hover li p {background-position:0px -84px;background-color: #424242;color:#fff;text-decoration:none;}#lol-pvpnet-bar-account {position:relative;left:-10px;}';
var newCSSs = fekStr2
var head = document.getElementsByTagName('head')[0];
var cssScript = document.createElement('style');
cssScript.type = 'text/css';
cssScript.innerHTML = newCSSs;
head.appendChild(cssScript);

var fekMenustr = '<ul><li><p>Menu</p></li> <ul> <li class="fekmenuitem1 fekmenuitem"><span><a id="myPosts">My Posts</a></span></li> <li class="fekmenuitem2 fekmenuitem"><span><a id="myThreads">My Threads</a></span></li><li class="fekmenuitem"><span><a id="setButton" href="#" onclick="$(\'#fek_overlay\').css({display : \'block\',});restore_options();$(\'#close\').click(function() { $(\'#fek_overlay\').css({display : \'none\',});});">Settings</a></span></li></ul></ul>';
var fekMenu = fekMenustr
var myPostsmenu = document.createElement('div');
myPostsmenu.innerHTML = fekMenu;
myPostsmenu.id = "fekmenu";
var lolBar = (document.getElementById('lol-pvpnet-bar-account'));
lolBar.insertBefore(myPostsmenu, lolBar.lastChild);
}
fuckyouJS();
}



var fekStr = [
"localStorage['wq'] = 'wtf'",
"if ($('#lol-pvpnet-bar-account').length != 0) {",
"\/\/ Get username",
"	var welcomeMsg = $('#lol-pvpnet-bar-account span.welcome_text').text();",
"	var cutdown = welcomeMsg.slice(0, -6);",
"		cutdown = cutdown.substring(cutdown.indexOf(\",\")+2,cutdown.indexOf(\"(\"));",
"	var username = cutdown;",
"\/\/ Get region",
"    var region = window.location.host;",
"    var regionSlice = region.slice(0,-20);",
"$('#myPosts').attr('href', 'http://'+regionSlice+'.leagueoflegends.com/board/search.php?do=process&searchuser='+username+'&exactname=1&showposts=1');",
"$('#myThreads').attr('href', 'http://'+regionSlice+'.leagueoflegends.com/board/search.php?do=process&searchuser='+username+'&exactname=1&starteronly=1&showposts=0');",
"var currentVersion = \"2\";",
"$('#updateButton').click(function() {",
"if (currentVersion == updateVersion) {",
"	alert('Your F.E.K is up-to-date.');",
"}else {",
"var message = \"Update found\\nDo you want to download it now?\";",
"var c = confirm(message);",
"if (c == true) { window.location = \"http:\/\/fek.worreh.com/index.php?p=dl\"};",
"}",
"}",
");",
"}",
"if ($('div.forum_post').length != 0) {",
" ",
"\/\/--- Replace every post's avatar.",
"    $('div.forum_post').each ( function (index) {",
"$('.left_orb').hide();",
"$('.right_orb').hide();",
"$('.photo').css('background', 0);",
"$('.photo').css('height', parseInt(localStorage['fekAvaSize'])+10);",
"$('.post_content').css('min-height', localStorage['fekAvaSize']);",
"		var userName = $('div.avatar big', this). text ();",
"       var userName2 = encodeURI(userName);",
"       var region = window.location.host;",
"	    var regionSlice = region.slice(0,-20);",
"        var postHistory = \"http:\/\/\" +regionSlice+ \".leagueoflegends.com/board/search.php?do=process&searchuser=\"+ userName + \"&exactname=1&showposts=1\";  ",
"        var avatar      = \"http:\/\/videomatic3.diskstation.me/~worreh/avatar/\" +regionSlice+ \"/\" + encodeURI(userName) + \"\";",
"\/\/ creates an avatar",
"        var userIcon    = $('div.avatar img.user_summoner_icon', this);",
"        //--- Replace the old Avatar and give it a link to history.",
"		if ($('div.avatar big font', this).text().length == 0 ) { ",
" if (localStorage.fekAvaState == 'enabled')",
"{",
"	function checkImage(src) {",
"  	var img = new Image();",
"  	img.onload = function() {",
"	// code to set the src on success",
"	userIcon.attr ({ src: 	avatar,});",
"	};",
"	img.onerror = function() {",
"	//do nothing",
"	};",
"	img.src = src; // fires off loading of image",
"	}",
"	checkImage(avatar);",
"		}",
"		else",
"		{",
"			//do nothing",
"		};",
"}",
"					userIcon.attr ({",
"						width:      localStorage['fekAvaSize'],",
"						height:     localStorage['fekAvaSize'],",
"						style:      'position:relative; TOP:0px;border-style: double;border-color: grey; border-width: 4px;border-radius:3px;'",
"					});",
"        userIcon.wrap ('<a href=\"' + postHistory + '\" class=\"link\"></a>');",
"    });",
"}",
"function run() {",
"if (localStorage['fekAvaState2'] === null) {",
"localStorage['fekAvaState2'] = 'enabled';",
"localStorage['fekAvaSize'] = 80;",
"}",
"if (localStorage['YTState'] === null) {",
"localStorage['YTState'] = 'enabled';",
"localStorage['YTSize'] = '560x315';",
"}",
"}",
"if (localStorage['hilite'] === null) {",
"localStorage['hilite'] = 'enabled';",
"}",
"function save_options() {",
"var hilitetoggleState;",
"var YTparsertoggleState;",
"var avatartoggleState;",
"if ($('#avatarOpt').is(':checked')) {",
"avatartoggleState = 'enabled';",
"var avatarsize = $('#avatarsize').val();",
"} else {",
"avatartoggleState = 'disabled';",
"var avatarsize = $('#avatarsize').val();",
"}",
"localStorage['fekAvaState'] = avatartoggleState;",
"localStorage['fekAvaSize'] = avatarsize;",
"if ($('#YTparserOpt').is(':checked')) {",
"YTparsertoggleState = 'enabled';",
"var YTsize = $('#YTsize').val();",
"} else {",
"YTparsertoggleState = 'disabled';",
"}",
"localStorage['YTSize'] = YTsize;",
"localStorage['YTState'] = YTparsertoggleState;",
"if ($('#hiliteOpt').is(':checked')) {",
"hilitetoggleState = 'enabled';",
"} else {",
"hilitetoggleState = 'disabled';",
"}",
"localStorage['hilite'] = hilitetoggleState;",
"var status = document.getElementById('status');",
"status.innerHTML = 'Options Saved.';",
"setTimeout(function () {",
"status.innerHTML = '';",
"}, 750);",
"}",
"$('#fek_overlay').click(function() { $('#fek_overlay').css({display : 'none',});});",
"function restore_options() {",
"var avatar_size = localStorage['fekAvaSize'];",
"var avatarEnabled = localStorage['fekAvaState'];",
"if (avatarEnabled == 'enabled') {",
"$('#avatarOpt').attr('checked', 'checked');",
"$('#avatarsize').val(avatar_size);",
"} else if (avatarEnabled == 'disabled') {",
"removeCheck('avatarOpt');",
"$('#avatarsize').val(avatar_size);",
"} /*avatar end*/",
"var YTsizes = localStorage['YTSize'];",
"var YTparserEnabled = localStorage['YTState'];",
"if (YTparserEnabled == 'enabled') {",
"$('#YTparserOpt').attr('checked', 'checked');",
"$('#YTsize').val(YTsizes);",
"} else if (YTparserEnabled == 'disabled') {",
"removeCheck('YTparserOpt');",
"$('#YTsize').val(YTsizes);",
"} /*YT parse end*/",
"var hiliteEnabled = localStorage['hilite'];",
"if (hiliteEnabled == 'enabled') {",
"$('#hiliteOpt').attr('checked', 'checked');",
"} else if (hiliteEnabled == 'disabled') {",
"removeCheck('hiliteOpt');",
"}",
"}",
"restore_options();",
"function removeCheck(select) {",
"$('#'+select+'').removeAttr('checked');",
"}",
"$('#fek_overlay').click(function() { $('#fek_overlay').css({display : 'none',});});",
"var storage = localStorage;",
"function youtube_toggle (YTwidth,YTheight) {",
"$('a[href*=\"youtube.com%2Fwatch\"]').each(function () { ",
"var YouT = $(this).attr('href');",
"var YouTID = YouT.substring((YouT.indexOf(\"v%3D\") + 4), (YouT.indexOf(\"v%3D\") + 15));",
"$(this).replaceWith('<iframe width=\"'+YTwidth+'\" height=\"'+YTheight+'\" src=\"http://www.youtube.com/embed/'+YouTID+'\" frameborder=\"0\" allowfullscreen></iframe>');",
"});",
"$('a[href*=\"youtu.be\"]').each(function () { ",
"var YouT = $(this).attr('href');",
"var YouTID = YouT.substring((YouT.indexOf(\".be%2F\") + 6), (YouT.indexOf(\".be%2F\") + 17));",
"$(this).replaceWith('<iframe width=\"'+YTwidth+'\" height=\"'+YTheight+'\" src=\"http://www.youtube.com/embed/'+YouTID+'\" frameborder=\"0\" allowfullscreen></iframe>');",
"});",
"}			",
"if (storage['YTState'] == \"enabled\"){",
"var YTsizes = storage['YTSize'];",
"var YTsizeArray = YTsizes.split(\"x\");",
"youtube_toggle(YTsizeArray[0],YTsizeArray[1]);",
"//console.log('youtube online');",
"} //YT parse toggle end",
]
var fekx = fekStr.join("\n");

var head = document.getElementsByTagName('head')[0];
var fekScript = document.createElement('script');
fekScript.type = 'text/javascript';
fekScript.innerHTML = fekx;
head.appendChild(fekScript);



////////////////////// Highlighterscript ///////////////////////////////


var highStr = [
"if (localStorage['hilite'] == 'enabled') {",
"if ($('#lol-pvpnet-bar-account').length != 0) {",
"var welcomeMsg = $('#lol-pvpnet-bar-account span.welcome_text').text();",
"var cutdown = welcomeMsg.slice(welcomeMsg.indexOf(\",\")+2,welcomeMsg.indexOf(\"(\"));",
"cutdown = cutdown.trim();",
"var userName = cutdown;",
"$(\"td.author:contains('\"+cutdown+\"')\").parent().css({",
"    \"background-color\": \"#989998\",",
" \"background-image\": null",
"} );",
"};",
"};",
]
var highx = highStr.join("\n");

var head = document.getElementsByTagName('head')[0];
var highScript = document.createElement('script');
highScript.type = 'text/javascript';
highScript.innerHTML = highx;
head.appendChild(highScript);

if (location.pathname == '/board/newreply.php' || location.pathname == '/board/editpost.php')
{
document.getElementById('setButton').href = 'javascript:alert("Settings page is disabled on edit and post pages due to a bug.\\n\\nChange page if you want to manage settings.")';
}
else
{
var fekSettings = '<div id="settings" style="line-height: 20px;width: 205px;height: 200px;background: white;margin: 0 auto;position: relative;top: 20%;border-radius: 10px;padding: 10px;border: solid 2px rgb(162, 150, 88);"><h1 style="font-size: 17px;">Settings<div id="close" style="position:relative;left: 120px;background: transparent url(http://na.leagueoflegends.com/sites/default/files/lol_global_elements/img/lol-header-sprite.png) -485px -203px no-repeat;width: 20px;height: 20px;display: inline-block;"></div></h1><h4>Avatar system settings:</h4><div id="avatar_container"><div id="avatar_settings"><input class="ext-option" type="checkbox" id="avatarOpt"><label for="avatarOpt">  Enable Avatar system.</label><br><p>Avatar size:<select id="avatarsize" width="" size="1"><option value="80">80x80</option><option value="100">100x100</option><option value="120">120x120</option></select></p></div></div><hr><h4>YouTube settings</h4><div id="YT_settings"><input class="ext-option" type="checkbox" id="YTparserOpt"><label for="YTparserOpt">  Enable YouTube link parsing</label><p>YouTube player size: <select id="YTsize" width="" size="1"><option value="560x315">560 x 315</option><option value="640x360">640 x 360</option><option value="843x480">843 x 480</option></select></p></div><hr><h4>Higlighter settings:</h4><div id="hilite"><input class="ext-option" type="checkbox" id="hiliteOpt"><label for="hiliteOpt">  Enable thread highlighting.</label></div><a href="#" onclick="save_options();" id="save" class="savebutton">Save</a><div style="display: inline-block;position: relative;left: 20px;" id="status"></div></div>';
var fekSetmenu = document.createElement('div');
fekSetmenu.innerHTML = fekSettings;
fekSetmenu.id = "fek_overlay";
fekSetmenu.setAttribute("style", "display:none;position: fixed;top: 0px;width: 100%;height: 100%;background: rgba(200,200,200,0.6);z-index: 999;");
var bodyr = document.getElementById('mainBodyContainer');
bodyr.appendChild(fekSetmenu);
}
