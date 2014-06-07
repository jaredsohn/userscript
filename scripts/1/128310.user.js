// ==UserScript==
// @name           HackForums Post/Pm Preset
// @namespace      https://userscripts.org/scripts/show/128310
// @description    Define a preset for your posts' content from the User CP Options.
// @match          *://*.hackforums.net/newreply.php*
// @match          *://*.hackforums.net/usercp.php?action=options*
// @match          *://*.hackforums.net/showthread.php*
// @match          *://*.hackforums.net/private.php?action=send*
// @match          *://*.hackforums.net/newthread.php*
// @author         PyroStorm/Kewlz
// @version        1.0.0
// ==/UserScript==
// The Original script is made by PyroStorm, Mr Kewl just edited it.


var GM_available,localStorage_available,post_setup,preset_config,table;GM_available=typeof GM_getValue!=="undefined"&&GM_getValue!==null;localStorage_available=typeof localStorage!=="undefined"&&localStorage!==null;if(GM_available||localStorage_available){if(window.location.href.indexOf("usercp.php?action=options")===-1){post_setup=function(){var a;if(localStorage_available){a=localStorage.getItem("HF_post_preset");if(a===null){a="";localStorage.setItem("HF_post_preset",a)}}else{a=GM_getValue("HF_post_preset","")}if(window.location.href.indexOf("showthread.php")!==-1){document.getElementById("message").value+=a}else{if(window.location.href.indexOf("processed=1")===-1){document.getElementById("message_new").value+=a}}};if(navigator.userAgent.indexOf("Firefox")!==-1){document.addEventListener("DOMContentLoaded",post_setup,false)}else{post_setup()}}else{preset_config=function(){var a;a=prompt("Enter your post preset:").replace(/\\n/g,"\n");if(localStorage_available){localStorage.setItem("HF_post_preset",a)}else{GM_setValue("HF_post_preset",a)}};table=document.getElementsByClassName("trow2")[1].getElementsByTagName("table")[0];table.innerHTML+='<tr><td colspan="2"><span class="largetext"><a href="##">Configure your post preset.</a></span></td></tr>';table.getElementsByTagName("a")[1].addEventListener("click",preset_config,true)}};