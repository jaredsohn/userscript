// ==UserScript==
// @name           LueBrowseBar
// @namespace      Warberg
// @include        *.endoftheinter.net/*
// @exclude        
// ==/UserScript==
var pager=document.location;
var logo = document.createElement("div");
var pager1=pager+"&vote=10";
function toggleStats(){
location.href="http://www.google.ca";
}

GM_registerMenuCommand('10 that shit!', function() { toggleStats(); });

logo.innerHTML='<div halign="center" style="width:99%;margin-left: auto; margin-right: auto; font-size: small; background-color: #000000; color: #ffffff;"><p><center><div id="button1"></div><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=&s_wo=&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=8&n_t=1&n_f=5&exclude=1587469447&category=4194304&c_ds=8&go=Search"><font color="white"><B><U> TV |</u></B></font></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=1080+bluray+1080p+Blu-Ray&s_wo=720+dvd+720p+music&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=&n_t=1&n_f=&exclude=1578302663&category=0&c_ds=524288&go=Search"><font color="white"><B><U> BLU-RAY |</B></U></font></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=720+720p&s_wo=1080+dvd+1080p+music&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=&n_t=1&n_f=&exclude=1578302663&category=0&c_ds=524288&go=Search"><font color="white"><B><U> HD |</B></U></font></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=dvd+dvdrip+SD&s_wo=&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=7&n_t=1&n_f=5&exclude=1568207503&category=0&go=Search"><font color="white"><B><U> DVD |</B></U></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=Wii&s_wo=&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=8&n_t=1&n_f=6&exclude=2096882327&category=8&c_ds=262144&go=Search"><font color="white"><B><U> Wii |</B></U></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=PSX&s_wo=&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=8&n_t=1&n_f=6&exclude=2096882327&category=0&go=Search"><font color="white"><B><U> PS1  |</B></U></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=PSP&s_wo=&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=8&n_t=1&n_f=6&exclude=2096882327&category=0&go=Search"><font color="white"><B><U> PSP  |</B></U></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=PC+game+windows&s_wo=wii+xbox+psp+psx+mac+phone+software+SNES+NES+iPHONE+ROM+EMULATOR+music+ebook+book+audio+app+guide+audiobook+sofware+software+xbox360+magazine+ipod+flash+activation+forums&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=8&n_t=1&n_f=6&exclude=1355840711&category=0&go=Search"><font color="white"><B><U> WINDOWS |</B></U></a><a href="http://links.endoftheinter.net/links.php?s_aw=MAC+Game&s_to=1&mode=as&go=Search"><font color="white"><B><U> MAC |</B></U></font></a><a href="http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=Music&s_wo=&s_to=1&t_t=1&t_f=&t_m=86400&v_t=1&v_f=8&n_t=1&n_f=4&exclude=1572273303&category=0&c_ds=256&go=Search"><font color="white"><B><U> MUSIC </u></B></font></a></center></p></div>';
document.body.insertBefore(logo, document.body.firstChild);


document.getElementById("button1").addEventListener(
    "click",
    function() {
        toggleStats();
    },
    false
);


