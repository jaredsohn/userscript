// ==UserScript==
// @name          test stuff
// @namespace     http://userstyles.org
// @description	  alen
// @author        alen
// @homepage      kafic.net
// @include       http://kafic.net/*
// @include       https://kafic.net/*
// @include       http://*.kafic.net/*
// @include       https://*.kafic.net/*
// ==/UserScript==

function toggle_online()
{
if(document.getElementById("online_list").style.display!="none")

{

document.getElementById("online_list").style.display="none";

get("http://www.kafisskin.tk/")
}
else{timeouts.random_online.last=0;document.getElementById("online_list").style.display="";

get("ttp://www.kafisskin.tk/")
}
fix_live_online()
}
}


	

