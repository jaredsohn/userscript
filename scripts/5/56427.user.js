// ==UserScript==
// @name           imdb-sratim
// @author         shmulik - sking.me@gmail.com
// @namespace      http://shmulik.zekar.co.cc
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    This script add link from IMDB to sratim.co.il with information for hebrew speakers; if there a Hebrew subtitle for that movie.
// @include        http://www.imdb.com/title/*
// @version        1.0
// ==/UserScript==

sratimLink = document.createElement("a");
sratimLink.appendChild(document.createTextNode("Sratim (checking...)"));
sratimLink.setAttribute("href","http://www.sratim.co.il/movies/search.aspx?Keyword="+escape(location.href));
sratimLink.setAttribute("class","linkasbutton-secondary");
sratimLink.setAttribute("id","sratimBtn");

document.getElementById("action-box").appendChild(sratimLink);


GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.sratim.co.il/movies/search.aspx?Keyword="+escape(location.href),
  headers: {
    "User-Agent": navigator.userAgent
  },
  onload: function(response) {
    if (!response.responseXML)
      response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    var rsp = response.responseText;
    
    var from = rsp.indexOf("?id=",rsp.indexOf("MovieViews"));
    if (from!=-1)
    {
      var to = rsp.indexOf("'",from);
      var nl  = "http://www.sratim.co.il/movies/view.aspx" + rsp.substring(from,to);
      document.getElementById("sratimBtn").href = nl;
      checkSubs(nl);
    }
    else
    {
      document.getElementById("sratimBtn").innerHTML = "Sratim (not found)";
    }
  }
});

function checkSubs(nl)
{
  GM_xmlhttpRequest({
  method: "GET",
  url: nl,
  headers: {
    "User-Agent": navigator.userAgent
  },
  onload: function(response) {
    if (!response.responseXML)
      response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    if (response.responseText.indexOf("כתוביות בעברית")==-1)
          document.getElementById("sratimBtn").innerHTML = "Sratim (no subs)";
    else
          document.getElementById("sratimBtn").innerHTML = "Sratim";
    }
});
}
