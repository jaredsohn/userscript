// ==UserScript==
// @name          Seen it!
// @namespace     http://someplace.cool
// @description   checks to see if you have a movie in one of your IMDB lists - on imdb
// @include       http://www.imdb.com/title/*
// ==/UserScript==
//*/
var xhr = new XMLHttpRequest();

function make_post_request(http_request, url, parameters){
	http_request.open('POST', url, false);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-length", parameters.length);
	http_request.setRequestHeader("Connection", "close");
	http_request.send(parameters);
}
/*
xhr.open("GET", "http://www.imdb.com/mymovies/list",  false); 
xhr.send(null);
var docList = xhr.responseText;

var re = new RegExp("<link[^>]*list.l=(\\d+)[^>]*>");
var result = docList.match(re);

if(result){
	//alert(result)
	var listNum = result[1];
}else{
	alert("error, no result!");
}
//alert(listNum);

var poststr = "l=" + listNum + 
    "&p_num=all&p_numtxt=10&p_show=&p_link=titlepage"+
    "&p_show=note&p_show=imdbvote&p_s=title&p_p=none&action=Save+settings";

make_post_request(xhr, "http://www.imdb.com/mymovies/list", poststr);
*/

var links = document.getElementsByTagName("link");
var i = 0;
var re = new RegExp("http://www.imdb.com/title/(tt[0-9]+)/");
var link;
for(i=0; i<links.length; i++ )
{
	link = links[i];
	result = link.href.match(re);
	if(result){
		link = result[1];
		//alert(link);
		break;
	}
}

xhr.open("GET", "http://www.imdb.com/mymovies/list",  false); 
xhr.send(null);
docList = xhr.responseText;

re = new RegExp("<td [^>]*>[^<]*<a href=\"/title/"+link+"/\">[^<]*</a>[^\\[]*\\[<a [^>]*>([^<]+)</a>\\]</td>");
result = docList.match(re);
//alert(result);
if (result) {
    var x=document.getElementById("pagecontent");
	var headers = x.getElementsByTagName("h1");
    //x.innerHTML = "(Seen) "+x.innerHTML;
    var note = result[1];
    
    //x.childNodes[1].innerHTML = "["+note+"] "+ x.childNodes[1].innerHTML;
    //x.childNodes[1].style.color = "green";
	headers[0].innerHTML = "["+note+"] "+ headers[0].innerHTML;
    headers[0].style.color = "green";
} else {
    //alert("No match");
}