// ==UserScript==
// @name           SMD - Selected Music Downloader
// @description    download and pre-listen to your music via zippyshare and hulkshare just by selecting text(the title and/or artist) and pressing 9
// @author         chiefwrigley
// @version        2.6
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://0061276.netsolhost.com/tony/javascript/urlEncode.js
// ==/UserScript==

i=0;
x=1;
pong="";

$(document).ready(function() {
			$("body").append('<style type="text/css">a.dllink_song, a.dllink_song:active{color:black;} a.dllink_song:hover{color:grey;}</style><div style="position:fixed;z-index:10;bottom:0;right:0;background-color:white;color:black;margin:5px;display:none;padding:5px;border:1px solid grey;" id="replaceme"><a href="javascript:void(0);" id="addpreview"  class="dllink_song">[+] Add preview to all</a> | <a href="javascript:void(0);" id="hideview" class="dllink_song">[-] Hide this box</a></div><div style="position:fixed;z-index:10;bottom:0;right:0;background-color:white;color:black;margin-right:5px;display:none;padding:5px;border:1px solid grey;" id="showme"> <a href="#" id="showMe">^</a> </div>');
	
	function getZippyshare(page, url)
	{
		for (i=0; i < page.getElementsByTagName("script").length; i++)
		{
			if (page.getElementsByTagName("script")[i].innerHTML.indexOf("document.getElementById('dlbutton').href ") > -1)
			{
				eval(page.getElementsByTagName("script")[i].innerHTML.replace("document.getElementById('dlbutton').href ", 'var fulllink'));
			}	
		}
		
		var pong = url.substr(0, url.indexOf(".com/")+4) + fulllink;
		
		if (pong.indexOf('.mp3')>-1) 
		{
			return pong;
		}
	}
	
	function getHulkshare(page)
	{
		elements = page.getElementsByTagName("meta");
		for (i = 0; i < elements.length; i++)
		{
			if (elements[i].getAttribute("property") == "og:audio")
				return elements[i].getAttribute("content");
		}
	}
	
	function addpreview(){
					(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://img404.imageshack.us/img404/7740/audiouq4.swf?audioUrl="+escape(page_links[i].href)
			var width = 320
			var height = 27
			code_str = ""
			code_str += "<br><object type=\"application/x-shockwave-flash\"\n"
			code_str += "data=\""+url+"\" \n"
			code_str += "width=\""+width+"\" height=\""+height+"\">\n"
			code_str += "<param name=\"movie\" \n"
			code_str += "value=\""+url+"\" />\n"
			code_str += "<param name=\"wmode\" \n"
			code_str +=	"value=\"transparent\" />\n"
			code_str += "</object>\n"
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
		}
	}

})();

}



function hideview(){
$("#replaceme").fadeOut("fast");
$("#showme").fadeIn("fast");
}

function toggleview(){
$("#replaceme").fadeIn("fast");
$("#showme").fadeOut("fast");
}
	
window.searchsong = function(){
if(document.getSelection()!=""){
$("#replaceme").fadeIn("fast");
	//title = document.title;
	song = document.getSelection(); //title.substring(0, title.indexOf(" - YouTube"));
	websiteFilter = "site:hulkshare.com | site:zippyshare.com";
	visitUrl = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=AIzaSyDauMjVszjTDWypXonfB8MMMOn4cDKp59I&rsz=large&safe=active&q=" + websiteFilter + " " + song;
	currentRequest = "";
	itemCount = 0;
	//menu = addMenu();
	requestNumber = 5;

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: visitUrl,
		headers:
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain',
		},
		onload: function(responseDetails)
		{
				res=responseDetails.responseText;
				data = JSON.parse(res);
				results = data.responseData.results;
				requestNumber = (results.length >= requestNumber) ? requestNumber : results.length;
				for (i = 0; i < requestNumber; i++)
				{
					currentRequest = data.responseData.results[i].unescapedUrl;
					GM_xmlhttpRequest(
					{
						method: 'GET',
						url: currentRequest,
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'text/plain',
						},
						onload: function(responseDetails)
						{
							var holder = document.createElement('div');
							var finalUrl = responseDetails.finalUrl;
							holder.innerHTML = responseDetails.responseText;
							tit = holder.getElementsByTagName("title")[0].innerHTML;
							href = "";
							
							if (tit.toLowerCase().indexOf(".mp3") != -1)
							{
							
								if (tit.toLowerCase().indexOf("hulk share") > -1)
								{
									tit = "<b>Hulkshare</b> " + tit.substring(0, tit.indexOf(" - Hulk Share -"));
									href = getHulkshare(holder);
								}
								else if (tit.toLowerCase().indexOf("zippy") > -1)
								{
									tit = "<b>Zippyshare</b> " + tit.substring("Zippyshare.com - ".length);
									href = getZippyshare(holder, finalUrl);
								}
									if (href != ""){
										//addItem(menu, tit, href);
										
										$("#replaceme").prepend('<small><a href="'+href+'" style="text-decoration:none;" class="dllink_song">'+tit+'</a></small> <a href="#" class="addpreview">[+]</a><br><span class="prev_song"  style="display:none;"><object type="application/x-shockwave-flash" data="http://img404.imageshack.us/img404/7740/audiouq4.swf?audioUrl='+href+'" width="320" height="27"><param name="movie" value="http://img404.imageshack.us/img404/7740/audiouq4.swf?audioUrl='+href+'" /><param name="wmode" value="transparent" /></object><br></span>');
										itemCount++;
										}
							}
						}
					});
				}
				//Synchronous request does not work so this dirty fix:
			//setTimeout(function () {if (itemCount == 0) addItem(menu, "No files found!", "#");}, 3000);
			$("#replaceme").prepend('<hr>');
			
			setTimeout(function () {if (itemCount == 0){$("#replaceme").prepend('<small>No files found!</small><br>');}}, 3000);
			
		}
	});
	}
}

$(".addpreview").live("click", function(){
  $(this).nextAll("span:first").toggle();
});

$('#addpreview').click(function(){
addpreview();
})

$('#hideview').click(function(){
hideview();
})

$('#showMe').click(function(){
toggleview();
})



	$(document).bind('keydown', function(evt) {
		switch(evt.which) {
			case 105:searchsong();break;
	}
	
	
	});
	
	});