// ==UserScript==
// @name           TomatoFlix
// @namespace      @jamespgilbert
// @include        http://movies.netflix.com/*
// ==/UserScript==

unsafeWindow.nodeInsertedHandler = function(event) {
    if(event.target.className == "bobContent")
    {
        if(!document.getElementById("rottentomatoes_content"))
        {
            rtomc = document.createElement("div");
            rtomc.id="rottentomatoes_content";
            rtomc.innerHTML = "<img src='http://theclearingband.com/tests/loadinfo.gif' /> Loading...";
            rtomc.style.padding="5px";
            
            event.target.getElementsByClassName("bobMovieRatings")[0].appendChild(rtomc);
        }

        var title = event.target.getElementsByClassName("title")[0].innerHTML;
        
        var gurl = "http://api.search.live.net/xml.aspx?Appid=63CCB3A7DB3B28A74F64D519042710546AF019BA&query=site:http://www.rottentomatoes.com%20"+title+"&sources=web&web.count=1"
        
        GM_xmlhttpRequest({
          method: "GET",
          url: gurl,
          onerror: onError,
          onload: procResponse
        });
    }
}

document.addEventListener("DOMNodeInserted", unsafeWindow.nodeInsertedHandler, false);

function procResponse(response) {
    if (!response.responseXML) {
        response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    }
        
    var rurl = response.responseXML.getElementsByTagName("web:Url")[0].textContent;
    rurl = "http://theclearingband.com/tests/getMovieInfo.php?url=" + rurl;
    
    GM_xmlhttpRequest({
      method: "GET",
      url: rurl,
      onerror: onError,
      onload: procRatings
    });
}

function procRatings(response)
{
    if (!response.responseXML) {
        response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    }
    var critics = parseInt(response.responseXML.getElementsByTagName("critics")[0].textContent);    
    var audience = parseInt(response.responseXML.getElementsByTagName("audience")[0].textContent);    
    var consensus = response.responseXML.getElementsByTagName("consensus")[0].textContent;
    var results = "<div>";
    if(critics < 60)
        results += "<img src='http://theclearingband.com/tests/rotten.png' style='margin-right:4px' />";
    else
        results += "<img src='http://theclearingband.com/tests/fresh.png' style='margin-right:4px'/>";
    results += "<strong style='font-size:16px'>" + critics + "%</strong>";
    results + "</div>";
    results += "<div><strong>consensus:</strong><br/>" + consensus + "</div>";
    
    document.getElementById("rottentomatoes_content").innerHTML = results;
}

function onError(e) {
	  alert("Error " + e.target.status + " occurred while receiving the document.");
	}
