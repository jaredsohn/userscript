// ==UserScript==
// @name           Capture Source
// @namespace      com.net.x6tencial
// @description    capture source
// @include http://*?cid=*&ctipo=*&cdef=*
// @exclude http://*cuevana.tv*
// ==/UserScript==

//http://www.zalaa.com/1n3co7p9c33j/Snow.White.and.the.Huntsman.2012.EXTENDED.BDRip-AMIABLE.mp4.htm?cid=4658&ctipo=pelicula&cdef=360
//?cid=3766&ctipo=pelicula&cdef=360
if ( window.location.href.match(/^.*cid=[0-9]*&ctipo=.*&cdef=[0-9]*/)) {		
		
		//alert("Page Matches filter");
		addScript();	
} 


function addScript()
{
	
	var href =window.location.href;
	var split =href.split("?");
	var dwlink = split[0];
	var ctipo =split[1].split("&")[1].substring(6);
	var id =split[1].split("&")[0].substring(4);
	
	var cdef = split[1].split("&")[2].substring(5);
	
	var rtipo = "";
	
	
	if(ctipo=="serie")
	{
		rtipo = "s/";
	}
	
	
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://x6tencial.net/rokuvana/ipad/cuevana.php?dw="+dwlink+"&t="+ctipo+"&id="+id+"&name="+dwlink,  
		onload: function(response)
		{		
			//alert(response.responseText);
		}
	});
	
	
	if(cdef=="360")
	{
		cdef = "";		
	}else
	{
		cdef=  "_"+cdef;			
	}
	
	var srt = "http://sc.cuevana.tv/files/"+rtipo+"sub/"+id+"_ES"+cdef+".srt"
	alert(srt);
	
	GM_xmlhttpRequest({
		method: "GET",
		url: srt,
		overrideMimeType:"text/html; charset=ISO-8859-1",		
		onload: function(response) 
		{
				//GETS SUBS
				//var sub =response.responseText.split('\n');
				//alert(sub[6]);
				var srt_info=response.responseText;
				var srtrepo = "http://x6tencial.net/rokuvana/srt/"+ctipo+"/savesrt.php";
				//alert(srtrepo);
				GM_xmlhttpRequest({
				  method: "POST",
				  url: srtrepo,
				  data: "id="+id+"&srt="+srt_info,
				  headers: {"Content-Type": "application/x-www-form-urlencoded"},
				  onload: function(response) {
					// Inject responseXML into existing Object (only appropriate for XML content).
					//srt commited to server
					
					//alert("sub saved on server "+response.responseText);
				  }
				});
	
		}
	});
	
	alert("added to rokuvania");
	
	
}