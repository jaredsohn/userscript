// ==UserScript==
// @name           iTunes2Apptrackr
// @description    Redirect iTunes links to Apptrackr when possible.
// @include        http://ax.itunes.apple.com/WebObjects/*
// @include        http://itunes.apple.com/*

// ==/UserScript==

function main() { 
	
	function doTheMagic(){
		var iTunesURLID = /Software\?id=\d*/i;
		var iTunesFoundID = iTunesURLID.exec(document.body.innerHTML);
		if (iTunesFoundID != null) {
			var appTrackrID = iTunesFoundID+'';
			var appTrackrURL = "http://apptrackr.org/?act=viewapp&appid="+realAppID+"\" class=\"";
			var realAppTrackrURL = "http://apptrackr.org/?act=viewapp&appid="+realAppID;
					 
			GM_xmlhttpRequest({
				method: "GET",
				url: realAppTrackrURL,
				headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
				data:'',
				onload:function(result) {
				var res = result.responseText;
				var start_pos = res.search("The application you tried to view does not exist");
				if(!(start_pos>-1)){
						

					document.body.innerHTML = document.body.innerHTML.replace("We are unable to find iTunes on your computer.","Please support the developers and buy the app if you like it.");
					document.body.innerHTML = document.body.innerHTML.replace("I have iTunes","Buy the app(iTunes)");
					document.body.innerHTML = document.body.innerHTML.replace("Download iTunes","Try the app(AppTrackr)");
					document.body.innerHTML = document.body.innerHTML.replace(/http:\/\/www\.apple\.com\/itunes\/affiliates\/download\/\?itmsUrl=itms/i,appTrackrURL);
					document.getElementById('userOverridePanel').style.display='block';
					//location.replace(realAppTrackrURL);
				}
				else
					var itmsLinkPattern=/itms:\/\/itunes.apple.com\/WebObjects\/MZStore.woa\/wa\/viewSoftware\?id=\d+/g;
					location.replace(itmsLinkPattern.exec(originalOnload));
							
				}
			});

		}
		else{
				var itmsLinkPattern=/itms:\/\/itunes.apple.com\/WebObjects\/MZStore.woa\/wa\/viewSoftware\?id=\d+/g;
				location.replace(itmsLinkPattern.exec(originalOnload));
		}
	}
	

	var originalOnload = document.body.getAttribute("onload");  
	document.body.setAttribute("onload", "");
	var itmsLinkPattern=/itms:\/\/itunes.apple.com\/WebObjects\/MZStore.woa\/wa\/viewSoftware\?id=\d+/g;
	var intVal=/\d+/g;
	var realAppID = intVal.exec(itmsLinkPattern.exec(originalOnload));

	if(realAppID!=null)
	{
		doTheMagic();
	}
	else
	{
		var itmsLinkPattern2=/itms:\/\/ax.search.itunes.apple.com\/WebObjects\/MZContentLink.woa\/wa\/link\?path=apps%2f(\w+\S)+/g;
		var appName=/apps%2f(\w+\S)+/g;
		var patt=/[&]\S+/g;
		var realAppName = appName.exec(itmsLinkPattern2.exec(originalOnload))+'';
		realAppName = realAppName.substr(7);
		var result2 = patt.exec(realAppName)+'';
		realAppName = realAppName.substr(0,realAppName.length - result2.length);
		location.replace("http://linktoapp.com/"+realAppName);
	}
}



var addr = location.href+'';
if(addr.indexOf("apptrackr.org")>-1)
{
	document.body.innerHTML = document.body.innerHTML.replace("http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=","itms://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=");
}
else
	main();