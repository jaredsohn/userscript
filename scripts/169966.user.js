
// ==UserScript==
// @name        Youtube 2 MP3
// @namespace   N/A
// @include     www.youtube.com/watch*
// @include     http://*.youtube.com/watch*
// @include     http://youtube.com/watch*
// @include     https://*.youtube.com/watch*
// @include     https://youtube.com/watch*
// @include     www.audiothief.com/*
// @include     http://*.audiothief.com/*
// @include     http://audiothief.com/*
// @include     https://*.audiothief.com/*
// @include     https://audiothief.com/*
v='1.0.1';
// @version     1.0.1
// @grant       none
// ==/UserScript==

if(window.location.href.indexOf("youtube") >= 0) {
if(window.attachEvent) {
    window.attachEvent('onload', replace_headline);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            replace_headline();
        };
        window.onload = newonload;
    } else {
        window.onload = replace_headline;
    }
}
} else if(window.location.href.indexOf("ConversionResult") >= 0) {
dlink=window.location.href;
dlink=dlink.replace("ConversionResult","ConversionSummary");
window.location = dlink;
}

function replace_headline() {
document.getElementById("action-panel-share").innerHTML = document.getElementById("watch-description").innerHTML; //Replaces Share with the About

t0=document.getElementById("watch7-action-buttons").innerHTML;
t0=t0.replace("About","Convert");
t0=t0.replace("Share","About");
document.getElementById("watch7-action-buttons").innerHTML = t0;
txt="";

document.getElementById("watch-description-collapse").innerHTML = "";

b1txt="Convert (Current Window)";
b2txt="Convert (New Winodw/Tab)";


a1txt="AudioThief (Recommended)";
a1link="http://audiothief.com/xx-xx/Video/PluginConvert/?url="+window.location.href;
a1b1="<a class='yt-uix-button yt-uix-button-default' href='"+a1link+"' style='margin-right: 5px; margin-bottom: 0px;'><span class='yt-uix-button-content'>"+b1txt+"</span></a>";
a1b2="<a class='yt-uix-button yt-uix-button-default' href='javascript:void(0);' onClick=\"javascript:var win=window.open('"+a1link+"','_blank');win.focus();\" style='margin-right: 0px; margin-bottom: 0px;'><span class='yt-uix-button-content'>"+b2txt+"</span></a>";
txt+=a1txt+":<br>" + a1b1 + a1b2 +"<br><br>";

a2txt="Video2MP3";
a2link="http://www.video2mp3.net/?x=45&y=44&quality=1&url="+window.location.href;
a2b1="<a class='yt-uix-button yt-uix-button-default' href='"+a2link+"' style='margin-right: 5px; margin-bottom: 0px;'><span class='yt-uix-button-content'>"+b1txt+"</span></a>";
a2b2="<a class='yt-uix-button yt-uix-button-default' href='javascript:void(0);' onClick=\"javascript:var win=window.open('"+a2link+"','_blank');win.focus();\" style='margin-right: 0px; margin-bottom: 0px;'><span class='yt-uix-button-content'>"+b2txt+"</span></a>";
txt+=a2txt+":<br>" + a2b1 + a2b2 +"<br><br>";

txt+="<br><h2>YouTube Converters, Coded By Rrrrobert</h2><br><h3>Version "+v+"</h3>";

i1="audiothief";
txt+="<a id='"+i1+"btn_show' style='display: block;' onclick=\"javascript:document.getElementById('"+i1+"info').style.display = 'block';document.getElementById('"+i1+"btn_hide').style.display = 'block';document.getElementById('"+i1+"btn_show').style.display = 'none';\" >Show AudioThief Information</a>";
txt+="<a id='"+i1+"btn_hide' style='display: none;' onclick=\"javascript:document.getElementById('"+i1+"info').style.display = 'none';document.getElementById('"+i1+"btn_hide').style.display = 'none';document.getElementById('"+i1+"btn_show').style.display = 'block';\" >Hide AudioThief Information</a>";
txt+="<div id='"+i1+"info' style='display: none;'>";
txt+="~Allows Converting to MP3<br>";
txt+="~Allows Changing of MP3 information on site before downloading<br>";
txt+="~MP3s are converted at 192Kb/s+ (High Quality)<br>";
txt+="~This script will auto-navigate through the site to the final download page.<br>";
txt+="~This site will be maintained even if AudioThief.com is updated.";
txt+="</div><br>";

txt+="<a id='video2mp3btn_show' style='display: block;' onclick=\"javascript:document.getElementById('video2mp3info').style.display = 'block';document.getElementById('video2mp3btn_hide').style.display = 'block';document.getElementById('video2mp3btn_show').style.display = 'none';\" >Show Video2MP3 Information</a>";
txt+="<a id='video2mp3btn_hide' style='display: none;' onclick=\"javascript:document.getElementById('video2mp3info').style.display = 'none';document.getElementById('video2mp3btn_hide').style.display = 'none';document.getElementById('video2mp3btn_show').style.display = 'block';\" >Hide Video2MP3 Information</a>";
txt+="<div id='video2mp3info' style='display: none;'>";
txt+="~Allows Converting to MP3<br>";
txt+="~MP3s are converted at 128Kb/s (standard Quality)<br>";
txt+="~This script does not support auto-navigating of this site yet.<br>";
txt+="~This site might be maintained if video2mp3.net is updated.";
txt+="</div><br>";



//http://www.video2mp3.net/?x=45&y=44&url=http%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DOoHGZFyMCHU&quality=1


document.getElementById("watch-description").innerHTML = txt+"<br><br><br>";
}




