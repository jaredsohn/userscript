// ==UserScript==
// @name           Ikariam: Local GFX
// @version        0.1.2
// @namespace      Ikariam
// @autor          Fanha Giang (base on the Animated Ikariam [STAND ALONE])
// @email          fanha99@hotmail.com
// @description    Use the gfx files from HDD to speedup the loading progress.
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
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

function getServer()
{
    var host = document.location.hostname.split("."); 
    if (host[1].toLowerCase() == "ikariam" && host[0].toLowerCase() != "board") 
    { 
        return host[0]; 
    }
    else
    {
        return false; 
    }
}

function pageView()
{
    return document.getElementsByTagName("body")[0].id;
}

var server = getServer();

var URL=GM_getValue(server + '_GFX_URL', '');

addCssFile(URL + 'ik_common.css');

var page = pageView();
addCssFile(URL + 'ik_' + page + '.css');

if (page == 'options')
{    

	addAnimStyle('#show_gp_test_button {display:inline;}');
	addAnimStyle('#show_gp_activate_button {display:none;}');

    var tmpURL=GM_getValue(server + '_TMP_GFX_URL', '');
    addCssFile(tmpURL + 'gp_check.css');

    var HTMLtext = '<div class="contentBox01h">' +
                    '<h3 class="header">Graphic pack settings</h3>' +
                    '<p>With a graphic pack you can change the design of Ikariam and shorten the loading time for each site. Many graphic packs can be tested online before you install them on your computer.</p>' +
                    '<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '<th>Standard graphic pack</th>' +
                                '<td><a href="http://www.mediafire.com/file/udvmnvzlj4d/ikariam_standard.zip">download</a></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<th>Example</th>' +
                                '<td><pre>file://d:/ikariam_gfx/skin/</pre></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<th>Path of GFX pack</th>' +
                                '<td><input class="textfield" id="gfx_path" name="gfx_path" size="30" value="' + tmpURL + '" type="text"></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<td style="height: 48px;" id="show_gp_logo" colspan="2"></td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                            '<input id="show_gp_test_button" onclick="testSettings()" value="Test" class="button" type="button">' + 
                            '<input id="show_gp_activate_button" onclick="updateSettings()" value="Activate" class="button" type="button">' + 
                        '</div>' +
                    '</div>' + 
                    '<div class="footer"></div>' +
                '</div>';

    var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
                
    document.getElementById("mainview").insertBefore(settingsDialog, document.getElementById("vacationMode"));

    unsafeWindow.updateSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
		window.setTimeout(GM_setValue, 0, server + '_GFX_URL', newURL);        
		window.setTimeout(GM_setValue, 0, server + '_TMP_GFX_URL', '');        
        return window.location.reload();
    };

    unsafeWindow.testSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
		window.setTimeout(GM_setValue, 0, server + '_TMP_GFX_URL', newURL);        
        return window.location.reload();
    };

}