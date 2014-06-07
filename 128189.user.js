// ==UserScript==
// @name           Khanwars.ir Local GFX
// @version        1.0
// @namespace      Khanwars.ir

// @description    Use the gfx files from HDD to speedup the loading progress.
// @include        http://*.khanwars.ir/*
// ==/UserScript==

function addCssFile(name) {
    var head, link;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    link = document.createElement('link');
    link.href=name;
    link.rel="stylesheet";
    link.type="text/css";
    media="screen";
    head.appendChild(link);
}

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function isOptionPage()
{
    return (document.location.pathname + document.location.search) == "/options.php?action=account";
}

var server = "Khanwars";

var URL = GM_getValue(server + '_GFX_URL', '');
var showOption = isOptionPage();

if (URL != '')
{
    addCssFile(URL + 'css/css/revolution_rip.css'); 
}  

if (showOption == true)
{
    if (URL == '')
    {
        addAnimStyle('#show_gp_test_button {display:inline;}');
        addAnimStyle('#show_gp_deactivate_button {display:none;}');
    }
    else
    {
        addAnimStyle('#show_gp_test_button {display:none;}');
        addAnimStyle('#show_gp_deactivate_button {display:inline;}');
    }
	addAnimStyle('#show_gp_activate_button {display:none;}');
    
    var HTMLtext = '' +
	    '<h2>GFX pack settings</h2>' +
        // '';
        '<div class="box">' +
            '<div class="textformbox">' +
                'With a graphic pack you can change the design of Khanwars and shorten the loading time for each site. Many graphic packs can be tested online before you install them on your computer.<br /><br />' +
		      	'<div class="row">' +
                    '<div class="left">Standard graphic pack: </div>' +
                    '<div class="right"><a href="http://www.i-mac.ir/dl/khanwars_standard_skin_220.zip">download</a></div>' +
                '</div>' +
		      	'<div class="row">' +
                    '<div class="left">Example: </div>' +
                    '<div class="right">file:///c:/khanwars_gfx/standard_skin/</div>' +
                '</div>' +
		      	'<div class="row">' +
                    '<div class="left">Path of graphic pack: </div>' +
                    '<div class="right"><input size="50" id="gfx_path" name="gfx_path" value="' + URL + '" type="text"></div>' +
                '</div>' +
                '<div class="buttonrow">' +
                	'<center><div id="show_gp_logo"></div></center>' +
                '</div>' +
                '<div class="buttonrow">' +
                    '<input id="show_gp_test_button" onclick="testSettings()" value="Test" class="button" type="button">' +
                    '<input id="show_gp_activate_button" onclick="activeSettings()" value="Activate" class="button" type="button">' +
                    '<input id="show_gp_deactivate_button" onclick="deactiveSettings()" value="Deactivate" class="button" type="button">' +
                '</div>' +
            '</div>' +
        '</div>';

    var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
    document.getElementById("content").appendChild(settingsDialog);
        
    unsafeWindow.activeSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
		window.setTimeout(GM_setValue, 0, server + '_GFX_URL', newURL);
        window.location.replace(window.location);
    };

    unsafeWindow.deactiveSettings = function() {
		window.setTimeout(GM_setValue, 0, server + '_GFX_URL', '');
        window.location.replace(window.location);
    };
    
    unsafeWindow.testSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
        addCssFile(newURL + 'gp_check.css');
    };    
}