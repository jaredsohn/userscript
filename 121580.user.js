// ==UserScript==
// @name           youtube_adv_player
// @namespace      youtube_adv_player
// @description script to see all the youtube videos of the page where you are in a automatic embedded player at bottom of the page. WORKS ON FIREFOX AND CHROME
// @include        http://*
// @include        https://*
// @version      2.001
// @history       1.001 First version
// @history       2.001 Javascript in object to avoid conflicts
// ==/UserScript==

var local_version = new Number(2.001);

function check_version_and_run(){
		try
		{
		var d = new Date();
		var dy = d.getFullYear();
		var dm = d.getMonth() + 1;
		var dd = d.getDate();
		var ys = new String(dy);
		var ms = new String(dm);
		var ds = new String(dd);
		if ( ms.length == 1 ) ms = "0" + ms;
		if ( ds.length == 1 ) ds = "0" + ds;
		ys = parseFloat(ys + ms + ds);

		var upd = GM_getValue("checked_for_new_version", 0);
		if(ys > upd){
		    GM_xmlhttpRequest({
		        method: "GET",
		        url: 'http://docs.google.com/document/pub?id=11tWrahvOk0-dQJpGs67Y19hgCHCa62t3gaaEitKknEY',
		        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		        data:'',
		        onload:function(result) {
			    GM_setValue("checked_for_new_version", ys);		    
		            var res = result.responseText;
		            var start_pos = res.indexOf("*Version");
		            var stop_pos = res.indexOf("*", start_pos + 1);
		            var server_version = new Number(0);
		            server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
			    if (server_version > local_version){
		                alert("There is a new version of Netplayed player. Please install it");
		                location.replace("http://userscripts.org/scripts/source/121580.user.js");
		            }else
			    {
				player_videos_web();
		            }
		       
			 }
		    });
		} else {
		   player_videos_web();
		}
		}catch(error)
		{
		}
	}

try
{
player_videos_web();
}catch(error)
{	
}

function player_videos_web(){
	if (window==window.top) {
	//así solo hace caso a los noframes
	try
	{
		var d = new Date();
		var dy = d.getFullYear();
		var dm = d.getMonth() + 1;
		var dd = d.getDate();
		var ys = new String(dy);
		var ms = new String(dm);
		var ds = new String(dd);
		if ( ms.length == 1 ) ms = "0" + ms;
		if ( ds.length == 1 ) ds = "0" + ds;
		ys = parseFloat(ys + ms + ds);

		var etiquetaVideos=document.createElement("div");

		document.getElementsByTagName("body")[0].appendChild(etiquetaVideos);

		var tagstyle="-moz-border-radius: 5px 5px 5px 5px;background-color: #80C8E5;color: #000000 !important;display: inline;font-size: 12px;font-weight: normal;margin-right: 10px;padding: 2px 6px;text-decoration: none;text-transform: uppercase;white-space: nowrap;";
		var _rand=Math.floor(Math.random()*1001);
		etiquetaVideos.id="netplayed_player";
		
		etiquetaVideos.innerHTML='<div id="titulo_wp_resumen_header_videos" style="display:none"><div id="button_hide_show" style="'+tagstyle+'float:right;margin-left:5px;cursor: pointer; cursor: hand;">Hide it</div><div style="font-weight:bold;font-size:18px;" align="center">Videos list of the page:</div><hr><br></div><div align="center" id="nplDiv_'+_rand+'" style="display:none"><a target="_blank" title="reproductor videos de youtube" href="http://es.netplayed.com">Videos Youtube sin pausas</a></div><div style="margin-bottom:50px;"></div>';
		document.getElementById("button_hide_show").addEventListener("click", setPreference1, false);
		


		//alert('ejecuto');
		/*if (npnv==0)
		{*/
			var domscript = document.createElement('script');
			domscript.src = 'http://static.netplayed.com/js/spec/addNetplayedVideos2_min_v_'+ys+'.js';
			document.getElementsByTagName('head')[0].appendChild(domscript);

			var etiquetaScript=document.createElement("script");

			document.getElementsByTagName("head")[0].appendChild(etiquetaScript);

			var javascript='var oldEvt = window.onload; window.onload = function() { try{ var npl_config = {target_id: "nplDiv_'+_rand+'",language:"es",aspect:"horizontal",autostart:0,player:"normal",blockPlayer:0,limitItems:10,autorefreshforLocal:1,botoneraExportar:1,idsVideos:"",videosWeb:"'+document.location.href+'"};addingIframeNetplayedAdv.addIframeAdv(npl_config);}catch(excepnetpl){};if (oldEvt) oldEvt();}';

			etiquetaScript.text=javascript;
	      //}

		
	}catch(excep_script){}
alert(excep_script);
	}
}

function setPreference1() {
  document.getElementById("netplayed_player").style.display="none";
  //GM_setValue("netplayed_player_not_visible", 1)
}
/*
function setPreference0() {
  GM_setValue("netplayed_player_not_visible", 0);
 
var npl_config = {target_id: "nplDiv_'+_rand+'", language:"es",aspect:"horizontal",autostart:0,player:"normal",blockPlayer:0,limitItems:10,autorefreshforLocal:1,botoneraExportar:1,idsVideos:"", videosWeb:document.location.href};unsafeWindow.addIframe(npl_config);

	
}*/

