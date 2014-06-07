// ==UserScript==
// @name           Cuevana Sources
// @author         Martín Gaitán
// @namespace      http://www.cuevana.com
// @description    Exposes cuevana.tv video and subtitle sources (and replace Cuevana Plugin)
// @include http://www.bayfiles.com/*
// @include http://www.180upload.com/*
// @include http://www.filebox.com/*
// @include http://www.uptobox.com/*
// @include http://www.uploadcore.com/*
// @include http://www.vidbull.com/*
// @include http://www.zalaa.com/*
// @include http://www.cramit.in/*
// @include http://www.cuevana.tv/*
// @require http://code.jquery.com/jquery.min.js
// @require https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==

// <start standard cuevana plugin>

var loc = (window.location.href.match(/cid=/i) && window.location.href.match(/ctipo=/i));
if (window.location.href.match(/^http:\/\/(www\.)?bayfiles\.com/i) && loc) {
    addScript('bayfiles');
} else if (window.location.href.match(/^http:\/\/(www\.)?180upload\.com/i) && loc) {
    addScript('180upload');
} else if (window.location.href.match(/^http:\/\/(www\.)?filebox\.com/i) && loc) {
    addScript('filebox');
} else if (window.location.href.match(/^http:\/\/(www\.)?uptobox\.com/i)) {
    addScript('uptobox');
} else if (window.location.href.match(/^http:\/\/(www\.)?uploadcore\.com/i) && loc) {
    addScript('uploadcore');
} else if (window.location.href.match(/^http:\/\/(www\.)?vidbull\.com/i) && loc) {
    addScript('vidbull');
} else if (window.location.href.match(/^http:\/\/(www\.)?zalaa\.com/i) && loc) {
    addScript('zalaa');
} else if (window.location.href.match(/^http:\/\/(www\.)?cramit\.in/i) && loc) {
    addScript('cramit');
} else if (window.location.href.match(/^http:\/\/(www\.|beta\.)?cuevana\.(com|co|tv|me)/i)) {
    var n = document.createElement('div');
    n.id = 'plugin_ok';
    n.setAttribute('data-version', '5');
    n.setAttribute('data-revision', '0');
    document.body.appendChild(n);
}

function addScript(id) {
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src', 'http://sc.cuevana.tv/player/scripts/5/'+id+'.js');
    document.getElementsByTagName('head')[0].appendChild(s);
}

// <end standard cuevana plugin>

var player = window.location.href.match(/play\/url:(.*)\//);
var final_url = (player !== null) ? decodeURIComponent(player[1]): null;


function getParameterByName( name ){
  // helper function to get URL query parameter

  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );

  if( results === null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


var cid = getParameterByName('id');
var tipo = getParameterByName('tipo');
var cdef = getParameterByName('cdef')

function get_sub_url(){
    if ( tipo === 'serie') {
        var base = 'http://sc.cuevana.tv/files/s/sub/';
    } else {
        var base = 'http://sc.cuevana.tv/files/sub/';
    }
    var hd = (cdef==='720') ? '_720': ''
    return  base + cid + '_ES' + hd + '.srt';
}

unsafeWindow.download = function(){
    // this do all the same than play but set a flag to process_download
    $.cookie("download", true);
    unsafeWindow.play();
}


function process_download(){
    if ($.cookie("download") && final_url !== null){
        $.removeCookie("download");
        window.location.replace(final_url);
    }
}

// manipulate html
$(function (){
    var sub_link = "<a href='" + get_sub_url() + "'>Descargar Subtitulo</a></p>";
    var video_link = "<a href='#' onclick='download();return false;'>Descargar Video</a>";
    $('div.play_contain').append(sub_link + "<br>" + video_link);
    process_download();
});
