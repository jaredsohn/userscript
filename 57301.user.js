// ==UserScript==
// @name           Lazy Theme Switcher for SU
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Lazy Theme Switcher for SU
// @include        http://*.stumbleupon.com/*
// ==/UserScript==


var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVDjLY/j//z8DJZiBagb8y8/+D8NgsVXF/+EYyP9wNf0/DA9SAygOgwuvN/2HYRA/4EzufxgG8RM2vP4Pw4PUAIrDIKJqw38YBvFvzr77H4bBaso3/ofjwWnAwGcmcjEAc0v+JGPFQvwAAAAASUVORK5CYII=";

var stylepreview;
var $ = window.wrappedJSObject.$;
var stumbler = window.wrappedJSObject.stumbler;
var data;
var currentTheme = 0;
var formDiv;
var loadDiv;
var Settings = new Object();
var url;
var mode = "blog";

var themes = new Array(22);
themes[0] = ["light blue", "rgb(187, 217, 238)"];
themes[1] = ["dark grey", "rgb(68, 68, 68)"];
themes[2] = ["red", "rgb(221, 0, 0)"];
themes[3] = ["blue", "rgb(0, 0, 221)"];
themes[4] = ["green", "rgb(0, 136, 0)"];
themes[5] = ["dark yellow", "rgb(136, 136, 0)"];
themes[6] = ["purple", "rgb(221, 0, 221)"];
themes[7] = ["teal", "rgb(0, 136, 136)"];
themes[8] = ["navy", "rgb(0, 0, 102)"];
themes[9] = ["orange", "rgb(221, 136, 0)"];
themes[10] = ["black", "rgb(0, 0, 0)"];
themes[11] = ["grey", "rgb(119, 119, 119)"];
themes[12] = ["lighter grey", "rgb(170, 170, 170)"];
themes[13] = ["lightest grey", "rgb(204, 204, 204)"];
themes[14] = ["dark red", "rgb(136, 0, 0)"];
themes[15] = ["dark purple", "rgb(102, 0, 102)"];
themes[16] = ["dark green", "rgb(0, 68, 0)"];
themes[17] = ["dark teal", "rgb(0, 68, 68)"];
themes[18] = ["brown", "rgb(136, 68, 0)"];
themes[19] = ["sakura", "rgb(253, 139, 186)"];
themes[20] = ["carbon", "rgb(23, 23, 23)"];
themes[21] = ["1 column", "rgb(23, 23, 23)"];

if (stumbler && $('#blogContent').length > 0) init();

function init() {
      
      
    url = 'http://' + stumbler + '.stumbleupon.com/prefs/settings/';

    formDiv = $('<div id="formDiv" style="display:none; !important" />');

    loadDiv = $('<div id="loadDiv" style="display:none;position:fixed;z-index:10;right;0px;left:0px;top:0px;bottom:0px;width:100%;height:100%;background:rgba(0,0,0,0.6);text-align:center;" ></div>');
    $(document.body).append(loadDiv);

    css = '.selector_button{float: left; width:12px;height:12px;border:1px solid;margin:2px; padding:0px;} .selector_button:hover:not{-moz-box-shadow: 0px 0px 0px 0px transparent;} '
    css += ".selector_button:active{border: 1px solid white;}"
    css += "#selector_icon,#selector_menu,#theme_label{float:none;display: inline;}"
    css += "#selector{display:inline-block;vertical-align:top;width:400px;float:right;}"
    GM_addStyle(css)

    data = "prefs=1&ftoken=" + $('#postToBlogForm').attr('ftoken').value + "&action=SavePrefs";

    currentTheme = getCurrentTheme();
    createSelector();
}

function getCurrentTheme() {
    if (  $('#stylepreview').length > 1 ) {
        href = $('#stylepreview').attr('href');
        num = href.match(/com\/css\/(\d{1,2})\_0908/)[1];
    }
    else {
 
        $('head', document).append('<link id="stylepreview" rel="stylesheet" type="text/css" />');
         num = 0; 
    }
 
    return parseInt(num);
}

function createSelector() {
    $('#wrapper td.nopadding h1').append('<div id="selector" style=""></div>');

    $('#selector').append('<button type="button" style="border:0px solid; background: transparent;display:inline;float:right;" id="selector_icon" ></button><div id="selector_menu" style="display:none;"></div>');

    $("#selector_icon").append('<img src="' + icon + '" />').bind('click', function (e) {
        $('#selector_menu').toggle('slow');
    });

    for (i = 0; i < themes.length; i++) {
        button = $('<button type="button" class="selector_button" ></button>').attr('value', i).css({
            backgroundColor: themes[i][1]
        }).attr('title', themes[i][0])

        button[0].addEventListener('click', setTheme, false);

        $('#selector_menu').append(button);

    }
    $('#selector_menu').append('<div class="clear" />')

}

function previewTheme(e) {

    if ($('#stylepreview2').length < 1) $('head', document).append('<link id="stylepreview2" rel="stylesheet" type="text/css" />');

    if (e.data == 0) {
        $('#stylepreview , #stylepreview2').attr('disabled', true);
    }
    else $('#stylepreview2').attr('href', 'http://www.stumbleupon.com/css/' + e.data + '_0908.css?v=2?v=1.0.26').attr('disabled', false);

}

function resetTheme(e) {
    $('#stylepreview').attr('disabled', false);
    $('#stylepreview2').attr('disabled', true);
}

function setTheme(e) {

    num = e.target.value

    //showLoader
    if (stumbler) {
        Settings.theme = num;

        loadDiv.show();
        snatchFormData(stumbler);
    }

}

function snatchFormData(stumbler) {

    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {

            "Accept": "text/html"
        },
        onload: function (response) {
            txt = response.responseText.replace(/\n/g, '');
            var m = txt.match(/id\=\"prefsForm1(.+)select name\=\"languages\[\]\"/);
            formDiv.append('<form ' + m[0] + '</form>');

            //grab Data
            dpv = $('#prefsForm1 input[name="default_profile_view"]', formDiv);

            if (dpv[0].checked) Settings.default_profile_view = 1;
            else

            Settings.default_profile_view = 0;

            Settings.herefor = new Array();
            here = $('#prefsForm1 input[name="herefor[]"]', formDiv);
            for (var i = 0; i < here.length; i++)
            if (here[i].checked == true) Settings.herefor.push(here[i].value);

            tpf = $('#prefsForm1 input[name="thumbnail_prefs_favorites"]', formDiv);

            Settings.thumbnail_prefs_favorites = tpf[0].checked;

            vbv = $('#prefsForm1 input[name="view_blog_videos"]', formDiv);
            if (vbv[0].checked == true) Settings.view_blog_videos = 1;
            else Settings.view_blog_videos = 0;
            postATheme();

        }
    });
}

function postATheme() {

    data += "&default_profile_view=" + Settings.default_profile_view;

    for (i = 0; i < Settings.herefor.length; i++)
    data += "&herefor[]=" + Settings.herefor[i];

    if (Settings.thumbnail_prefs_favorites) data += "&thumbnail_prefs_favorites=1"

    if (Settings.view_blog_videos) data += "&view_blog_videos=1"

    data += "&theme=" + Settings.theme;

    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: encodeURI(data),

        onload: function (xhr) {

            $('#stylepreview').attr('href', 'http://www.stumbleupon.com/css/' + Settings.theme + '_0908.css?v=2?v=1.0.26').attr('disabled', false);
            $('#stylepreview2').attr('disabled', true);
            loadDiv.hide();

        }
    });
}