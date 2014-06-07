// ==UserScript==
        // @name           Reddit Bar
        // @description    Shows a tool bar when you arrive on scripts from RSS feeds
        // @include        http://www.reddit.com/*comments/*
        // ==/UserScript==
        
        
//if (document.referrer !== document.location.href)
{
	var start = document.location.href.indexOf("comments/") + "comments/".length
	var end = document.location.href.indexOf("/", start);
	var id = "title_t3_"+ document.location.href.substring(start,end);
	targetURL = document.getElementById(id);
	if(targetURL == null)
	{
		var as = document.getElementsByClassName("title");
		for(var i = 0; i < as.length; i++)
		{
			var a = as[i];
			if(typeof(a.innerHTML) !== "undefined" && document.title.indexOf(a.innerHTML) != -1)
			{
				targetURL = a.href;
				break;
			} // end if
		} // end for
	} // end if

	if (document.location.href !== targetURL && targetURL != null){
	
		document.getElementById("sr-header-area").style.display = "none";
		document.getElementsByClassName("side")[0].style.display = "none";
		document.getElementsByClassName("footer")[0].style.display = "none";
		document.getElementsByClassName("preload")[0].style.display = "none";
		document.getElementsByClassName("tabmenu")[0].style.display = "none";

		siteTable = document.getElementById("siteTable").cloneNode(true);
		image = document.getElementById("header-img");

		document.getElementById("header-bottom-left").innerHTML = "";
		document.getElementById("header-bottom-left").appendChild(siteTable);
		targetPage = document.createElement("div");
		targetPage.style.padding = "0px"
		targetPage.style.height = "99%";
		targetPage.style.margin = "0px"
		targetPage.id = "_iFRAME-Target"
		targetPage.innerHTML = "<iframe width = '100%' height = '" + (window.innerHeight - document.getElementById("header").offsetHeight)+ "px ' src = '" + targetURL + "' style = 'border : none'></iframe>"
		document.body.appendChild(targetPage);
		
		document.getElementsByClassName("content")[1].style.display = "none";
		document.getElementsByClassName("comments")[0].href = "#";
		document.getElementsByClassName("comments")[0].target = "_self";
		document.getElementsByClassName("footer-parent")[0].style.paddingTop = "0px"
		
		var pixImages = document.getElementsByTagName("img");
		for (var i = 0; i < pixImages.length; i++){
			if (pixImages[i].src.indexOf("pixel.reddit.com/pixel") !== -1){
				pixImages[i].style.display = "none";
			}
		}
		
		document.getElementsByClassName("comments")[0].addEventListener("click",function(e){
			if (document.getElementById("_iFRAME-Target").style.display !== "none"){
				document.getElementsByClassName("content")[0].style.display = "";
				document.getElementById("_iFRAME-Target").style.display = "none";
			}
			else{
				document.getElementsByClassName("content")[0].style.display = "none";
				document.getElementById("_iFRAME-Target").style.display = "";
			}
			e.returnValue = false;
			e.stopPropagation();
			return false;
		},false);
	}
}