// ==UserScript==
// @name           SeriesForum Post Preset
// @namespace      http://codeinstitution.net/SFPostPrest
// @description    Define a preset for your posts' content from the User CP Options.
// @match          *://*.seriesforum.net/newreply.php*
// @match          *://*.seriesforum.net/usercp.php?action=options*
// @match          *://*.seriesforum.net/thread*
// @match          *://*.seriesforum.net/newthread.php*
// @author         King of Hearts (Saad T)
// @version        1.0
// ==/UserScript==
var GM_available,localStorage_available,post_setup,preset_config,table;
GM_available=typeof GM_getValue!=="undefined"&&GM_getValue!==null;
localStorage_available=typeof localStorage!=="undefined"&&localStorage!==null;
if(GM_available||localStorage_available){
	if(window.location.href.indexOf("usercp.php?action=options")===-1){
		post_setup=function(){
			var a;
			if(localStorage_available){
				a=localStorage.getItem("SF_post_preset");
				if(a===null){
					a="";
					localStorage.setItem("SF_post_preset",a)
				}
			}else{
				a=GM_getValue("SF_post_preset","")
			}
			if(window.location.href.indexOf("newreply.php")!==-1 ||window.location.href.indexOf("/thread")!==-1 ||window.location.href.indexOf("/newthread.php")!==-1 ){
				document.getElementById("message").value+=a
			}else{
				if(window.location.href.indexOf("newthread.php")!==-1){
					document.getElementById("message_new").value+=a
				}else if(window.location.href.indexOf("processed=1")===-1){
					document.getElementById("message_new").value+=a
				}
				
			}
		};
		if(navigator.userAgent.indexOf("Firefox")!==-1){
			document.addEventListener("DOMContentLoaded",post_setup,false)
		}else{
			post_setup()
		}
	}else{
		preset_config=function(){
			var a;
			a=prompt("Enter your post preset:").replace(/\\n/g,"\n");
			if(localStorage_available){
				localStorage.setItem("SF_post_preset",a)
			}else{
				GM_setValue("SF_post_preset",a)
			}
		};
		table=document.getElementsByClassName("trow2")[1].getElementsByTagName("table")[0];table.innerHTML+='<tr><td colspan="2"><span class="smalltext"><a href="###">Change Your Post Preset.</a></span></td></tr>';
		table.getElementsByTagName("a")[0].addEventListener("click",preset_config,true)

	}
};