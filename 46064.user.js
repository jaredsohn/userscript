// ==UserScript==
// @name           super
// @version        tau ah wong gw cuba cuba
// @namespace      manusia lah masa monyet xl....
// @autor          Pt. script ngawur 
// @email          gatau@dihongkong.com
// @description    tau ahhh
// @include        http://s*.travian.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://s*.travian.*/skin/*
// @exclude        http://s*.travian.*/js/*
// @exclude        http://s*.travian.*/index.php?action=newPlayer
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
    if (host[1].toLowerCase() == "travian" && host[0].toLowerCase() != "board") 
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

function hardImageFix()
{
    for ( i = 0 ; i < document.images.length; i++ )
    {
        if ( document.images[i].src.search(document.domain + "/skin/") == 7)
        {   
            st = st + document.images[i].src + "\n";
            document.images[i].src = URL + document.images[i].src.substring(7 + document.domain.length + 6);
        }
    }
}

var st = "";

var server = getServer();

var URL = GM_getValue(server + '_GFX_URL', '');
var IMG_replace = GM_getValue(server + '_GFX_REPLACE', false);

var checktext = (IMG_replace) ? ' checked="checked" ' : ' ';
var disabletext = (URL == '') ? ' disabled ' : ' ';
var page = pageView();

if (URL != '')
{
    addCssFile(URL + 'ik_common.css');
    addCssFile(URL + 'ik_' + page + '.css');
    
    if (IMG_replace) hardImageFix();
    //if (st != "") alert (st);
}  

if (page == 'options')
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

   
    var HTMLtext = '<div class="contentBox01h">' +
                    '<h3 class="header">Graphic pack settings</h3>' +
                    '<p>mempercepat travian dan tidak usah donlot /install lagi bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.</p>' +
                    '<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '<th>Standard graphic pack</th>' +
                                '<td><a href="http://www.mediafire.com/?mzmj2zz21hn">download</a></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<th>Replace the images from <b>&lt;img&gt;</b></th>' +
                                '<td><input id="gp_replace_image" type="checkbox"' + checktext + disabletext + 'onchange="replaceSettings()"></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<th>Example</th>' +
                                '<td><pre>file:///d:/ikariam_gfx/skin/</pre></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<th>Path of GFX pack</th>' +
                                '<td><input class="textfield" id="gfx_path" name="gfx_path" size="30" value="' + URL + '" type="text"></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<td id="show_gp_logo" colspan="2"></td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                            '<input id="show_gp_test_button" onclick="testSettings()" value="Test" class="button" type="button">' + 
                            '<input id="show_gp_activate_button" onclick="activeSettings()" value="Activate" class="button" type="button">' + 
                            '<input id="show_gp_deactivate_button" onclick="deactiveSettings()" value="Deactivate" class="button" type="button">' + 
                        '</div>' +
                    '</div>' + 
                    '<div class="footer"></div>' +
                '</div>';

    var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
                
    document.getElementById("mainview").insertBefore(settingsDialog, document.getElementById("vacationMode"));

    unsafeWindow.activeSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
		window.setTimeout(GM_setValue, 0, server + '_GFX_URL', newURL);
        return window.location.reload();
    };

    unsafeWindow.deactiveSettings = function() {
		window.setTimeout(GM_setValue, 0, server + '_GFX_URL', '');
        return window.location.reload();
    };
    
    unsafeWindow.testSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
        addCssFile(newURL + 'gp_check.css');
    };
    
    unsafeWindow.replaceSettings = function() {
        var IMG_replace = document.getElementById("gp_replace_image").checked;
		window.setTimeout(GM_setValue, 0, server + '_GFX_REPLACE', IMG_replace);
        return window.location.reload();
    }
}