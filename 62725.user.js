// ==UserScript==
// @name           Ikariam: Local Graphic
// @version        1.0.2
// @namespace      Ikariam
// @autor          Oby86 (based on the Local GFX (Fanha Giang))
// @email          oby@inbox.lv
// @description    This script use the graphic files from HDD to speed up ikariam browsing.
// @include        http://s*.ikariam.*/*
// @include        http://s*.ikariam.co.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

function addCssFile(name) {
   
    var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", name)
  
if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
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

function pageView()
{
    return document.getElementsByTagName("body")[0].id;
}

function hardImageFix(path)
{
    for ( i = 0 ; i < document.images.length; i++ )
    {
        if ( document.images[i].src.search(document.domain + "/skin/") == 7)
        {   
            st = st + document.images[i].src + "\n";
            document.images[i].src = path + document.images[i].src.substring(7 + document.domain.length + 6);
        }
    }
}

var st = "";

var server = "Ikariam";

var URL = GM_getValue(server + '_GFX_URL', '');
var IMG_replace = GM_getValue(server + '_GFX_REPLACE', false);

var checktext = (IMG_replace) ? ' checked="checked" ' : ' ';
var disabletext = (URL == '') ? ' disabled ' : ' ';
var page = pageView();

if ( URL != '' )
{
    var RTL = '';
    var links = document.getElementsByTagName('link');
    for ( i = 0; i < links.length; i++ )
    {
        if ( links[i].href.search(document.domain + "/skin/") == 7 && links[i].href.search("_rtl_") != -1 )
        {
            RTL = 'rtl/';
            break;
        }
    }
    
    if ( RTL != '' )
    {
        addCssFile(URL + 'ik_rtl_common.css');
        addCssFile(URL + 'ik_rtl_' + page + '.css');
    }
    else
    {
        addCssFile(URL + 'ik_common.css');
        addCssFile(URL + 'ik_' + page + '.css');
    }
    
    if (IMG_replace) hardImageFix(URL + RTL);
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
                    '<p>With a graphic pack you can change the design of Ikariam and shorten the loading time for each site. Many graphic packs can be tested online before you install them on your computer.</p>' +
                    '<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '<th>Standard graphic pack</th>' +
                                '<td><a href="http://www.mediafire.com/?gtzhmzj4nzj">download</a></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<th>Replace the images from <b>&lt;img&gt;</b></th>' +
                                '<td><input id="gp_replace_image" type="checkbox"' + checktext + disabletext + 'onchange="replaceSettings()"></td>' +
                            '</tr>' +
                            '<tr><td></td><td></td></tr>' +
                            '<tr>' +
                                '<th>Example</th>' +
                                '<td><pre>file:///d:/ikariam_gfx/standard_skin/</pre></td>' +
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
    
    unsafeWindow.replaceSettings = function() {
        var IMG_replace = document.getElementById("gp_replace_image").checked;
		window.setTimeout(GM_setValue, 0, server + '_GFX_REPLACE', IMG_replace);
        window.location.replace(window.location);
    }
}
