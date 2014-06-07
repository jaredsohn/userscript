// ==UserScript==
// @name			Easy Youtube Downloader
// @author			denzjhoena - denzjhoena@live.it
// @update                      20110430 - 12.44 PM
// @description		        A simple script for download youtube video with auto-name, scan available quality and disable autoplay. This is a update from Cutedevil.
// @include			http://www.youtube.com/watch?*
// @include			http://www.youtube-nocookie.com/watch?*
// ==/UserScript==

// Disable Autoplay
with(document.getElementById('movie_player')){
setAttribute("flashvars","autoplay=0&"+getAttribute("flashvars"));
src+="#";}

// Download Link
link = document.getElementById("watch-video-extra");
title = document.getElementsByName("title")[0].getAttribute("content");
style = 'class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip active" style="text-decoration: none;"><font color="blue"><b>';

link.innerHTML+='<b><font color="red">DOWNLOAD</font> :</b>'
link.innerHTML+=' <a href="'+document.body.innerHTML.split(",5|")[1].split('",')[0].replace(/\\/g, "").replace(/u0026/g, "&")+'&title='+title+' (240p)" title="Low Quality (fmt=5)" '+style+'FLV 240p (LQ)</b></font></a>'
link.innerHTML+=' <a href="'+document.body.innerHTML.split("18|")[1].split(",5")[0].replace(/\\/g, "").replace(/u0026/g, "&")+'&title='+title+' (360p)" title="Standard Definition (fmt=18)" '+style+'MP4 360p (SD)</b></font></a>'
link.innerHTML+=' <a href="'+document.body.innerHTML.split("34|")[1].split(",18")[0].replace(/\\/g, "").replace(/u0026/g, "&")+'&title='+title+' (360p)" title="Standard Quality (fmt=34)" '+style+'FLV 360p</b></font></a>'
link.innerHTML+=' <a href="'+document.body.innerHTML.split("35|")[1].split(",34")[0].replace(/\\/g, "").replace(/u0026/g, "&")+'&title='+title+' (480p)" title="High Quality (fmt=35)" '+style+'FLV 480p (HQ)</b></font></a>'
link.innerHTML+=' <a href="'+document.body.innerHTML.split("22|")[1].split(",35")[0].replace(/\\/g, "").replace(/u0026/g, "&")+'&title='+title+' (720p)" title="High Definition (fmt=22)" '+style+'MP4 720p (HD)</b></font></a>'
link.innerHTML+=' <a href="'+document.body.innerHTML.split("37|")[1].split(",22")[0].replace(/\\/g, "").replace(/u0026/g, "&")+'&title='+title+' (1080p)" title="High Definition (fmt=37)" '+style+'MP4 1080p (HD)</b></font></a>'
