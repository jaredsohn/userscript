// ==UserScript==
// @name        ThePirateBay with IMDB Ratings 2013
// @namespace   ThePirateBay
// @include     *://thepiratebay.se/browse/207*
// @include     *://thepiratebay.se/browse/202*
// @include     *://thepiratebay.se/browse/201*
// @version     0.2
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function get_calification(title, link){
    GM_xmlhttpRequest({
        method: "GET",
        headers: {
            "Accept" : "application/json, text/javascript, */*; q=0.01",
            "Accept-Language" : "es-ar,es;q=0.8,en-us;q=0.5,en;q=0.3",
            "Accept-Encoding" : "gzip, deflate",
            "Connection" : "keep-alive",
            "X-Requested-With" : "XMLHttpRequest"
        },
        url: "http://www.omdbapi.com/?t=" + escape(title),
        onload: function(data) {
           
            var respuesta = eval("(" + data.responseText + ")");
            if(respuesta.Response=="False" || respuesta.Error== "Movie not found!")
                return;
            link.text=link.text+" rating: (" + respuesta.imdbRating + ") votes: (" + respuesta.imdbVotes + ')';
        }
    });
}

(function() {
    
    if(getCookie("lw")=='d' || getCookie("lw") == null){
        setCookie("lw","s",360);
        location.reload();
    }
    
    var index;
    var title= new String();
    var numeric=new RegExp(/[0-9]/);

    var links=document.evaluate("//tr/td[2]/a", document, null,7, null);
    if(links){
        for (var i = 0; i < links.snapshotLength; i++) {
            var link = links.snapshotItem(i);
            title=link.text;
            index=(title.search(numeric));
            title=(title.substring(0, index));
            title=(title.replace(/\W/g, ' '));
            get_calification(title, link);
            
            
        }
       
    }

})();