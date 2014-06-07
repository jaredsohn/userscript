// ==UserScript==
// @name       imdbToDouban
// @namespace  Jiahui Hu
// @version    1.0
// @description  add a link to douban movie on imdb page
// @match     http://www.imdb.com/title/*
// @copyright  2014+, You
// ==/UserScript==

function getIMdbName()
{
    var url=document.URL;
    var imdbID=url.match(/tt\d+/);
    
    console.log(imdbID);
    return imdbID;
    
}

var movieID=getIMdbName();

getDoubanURL(movieID);
function getDoubanURL(imdbID)
{
    
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.douban.com/v2/movie/search?q='+imdbID,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            var myJSON=JSON.parse(responseDetails.responseText);
            GM_log(responseDetails.responseText);
            var doubanID=myJSON.subjects[0].alt;
            
            var div = document.getElementsByClassName("star-box-rating-widget")[0];
            
            var link = document.createElement("a");
            var icon =  document.createElement("img");
            link.appendChild(icon);
            link.href = doubanID;
            icon.src="http://ww1.sinaimg.cn/large/68f20f9egw1eehfv0u05rj200f00f0py.jpg";
            
            div.insertBefore(link,div.firstChild);
            
        }
    });
    
}
