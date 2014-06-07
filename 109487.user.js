// ==UserScript==

// @name           netplayed_mp3

// @namespace      netplayed_mp3

// @description script to get all mp3 links from any videos list of Netplayed (www.netplayed.com). Get the mp3s of the currently hits is easy and fast. Works on CHROME and FIREFOX. NOW YOU CAN CONVERT VIDEOS MANUALLY
// @include        http://*.netplayed.com/videos/*

// @include        http://netplayed.com/videos/*

// @include        http://*.netplayed.com/live/videos/*

// @include        http://netplayed.com/live/videos/*

// @match        http://*.netplayed.com/videos/*

// @match        http://netplayed.com/videos/*

// @match        http://*.netplayed.com/live/videos/*

// @match        http://netplayed.com/live/videos/*

// @version      2.003

// @history       2.001 Added versioning
// @history       2.002 Allow using as logged users
// @history       2.003 Add a button for download videos which show error manteinance

// ==/UserScript==

var local_version = new Number(2.003);



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
		        url: 'http://docs.google.com/document/pub?id=14VrOeiYPJ-KwlGNOZjXf6DVhWdmL9JHtR1g_yUdof4w',
		        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		        data:'',
		        onload:function(result) {
			    GM_setValue("checked_for_new_version", ys);		    
		            var res = result.responseText;
		            var start_pos = res.indexOf("*Version");
		            var stop_pos = res.indexOf("*", start_pos + 1);
		            var server_version = new Number(0);
		            server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
			    //alert(server_version);
		            if (server_version > local_version){
		                alert("There is a new version of Netplayed download Mp3. Please install it");
		                location.replace("http://userscripts.org/scripts/source/109487.user.js");
		            }else
			    {
				download_mp3s();
		            }
		       
			 }
		    });
		} else {
		   download_mp3s();
		}
		}catch(error)
		{
			//alert('error'+error);
		}
	}

try
{

check_version_and_run();
}catch(error)
{
	//alert('error'+error);
}

function download_mp3s(){

document.getElementById('view_as_player').innerHTML = '<hr><span class="enlace" onclick="cargaFramesMP3();"><label class="enlace">DOWNLOAD MP3s</label></span>'+document.getElementById('view_as_player').innerHTML ;







var etiquetaScript=document.createElement("script");



document.getElementsByTagName("head")[0].appendChild(etiquetaScript);



var javascript="function cargaFramesMP3(){var listItems = document.getElementById('listado_videos').getElementsByTagName('li');for(var i=0;i < listItems.length; i++) {var arrValue = listItems[i];if (arrValue.getAttribute('processed')==1){}else{arrValue.innerHTML=arrValue.innerHTML+'<br>';arrValue.innerHTML=arrValue.innerHTML+'<div style=\"background-color:#edfff5;border:1px solid;border-color:#56a678;\"><div>If you see below a red message about maintenance.// Si ves abajo un cartel rojo sobre mantenimiento: </div><a target=\"_blank\" href=\"http://www.youtube-mp3.org/#v='+arrValue.getAttribute('id').substring(5)+'\"> Click here to DOWNLOAD IT MANUALLY // Pulsa aquí para bajarlo manualmente</a></div><iframe SCROLLING=\"NO\" width=\"660px\" height=\"240px\" src=\"http://www.youtube-mp3.org/#v='+arrValue.getAttribute('id').substring(5)+'\"></iframe>';arrValue.innerHTML=arrValue.innerHTML+'<br>';arrValue.setAttribute('processed',1);}}};";


etiquetaScript.text=javascript;
}



       



  