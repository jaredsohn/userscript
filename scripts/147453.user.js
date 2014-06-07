// ==UserScript==
// @name  HF Script - News Watcher
// @namespace  theone
// @version    1.0.7
// @description  HF news watcher
// @include      *hackforums.net*
// @copyright  None
// ==/UserScript==

var link = "fdefaultf";
var check  = 0;
if(getCookie("lastupdate")!="1")
{
	//update
	var p = GetPage("http://www.hackforums.net/archive/index.php/forum-162.html");
	var link2 = p.substr(p.indexOf("<h3>Threads</h3>"), p.indexOf("\">["));
	var link3 = link2.substr(link2.indexOf("<a href=\"http://www.hackforums.net/archive/index.php/thread-"), link2.indexOf(">["));
	var link4 = link3.substr(link3.indexOf("-") + 1, 7);
	link = link4;
	setCookie2("lastupdate", "1");
}

if(window.location.href.toString().indexOf(link) != -1) {
		//update
	var p = GetPage("http://www.hackforums.net/archive/index.php/forum-162.html");
	var link2 = p.substr(p.indexOf("<h3>Threads</h3>"), p.indexOf("\">["));
	var link3 = link2.substr(link2.indexOf("<a href=\"http://www.hackforums.net/archive/index.php/thread-"), link2.indexOf(">["));
	var link4 = link3.substr(link3.indexOf("-") + 1, 7);
	setCookie("news", link4, 30);
	check = 1;
}

if(getCookie("news").toString().indexOf(link) ==-1)
{
	
	if (link == "fdefaultf")
			check = 1;

	if (check == 0)
	{
		var Content = document.getElementsByClassName("navigation")[0];
		theHTML = 			"<div class=\"pm_alert\" id=\"news_notice\">";
		theHTML = theHTML + 	"<div><font color=\"#C0C0C0\">There is a new <strong><a style=\"color: #FFFFFF\" href=\"http://hackforums.net/showthread.php?tid=" + link + "\">HF news topic</a></strong> which you haven't read yet.</font></div>";
		theHTML = theHTML + "</div> ";
		newHTML = theHTML + Content.innerHTML;
		Content.innerHTML = newHTML;
	}
}
//w3
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function setCookie2(c_name,value)
{
var d1 = new Date (),
    d2 = new Date ( d1 );
d2.setMinutes ( d1.getMinutes() + 30 );
var c_value=escape(value) + ("; expires="+d2.toUTCString());
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
//xerotic hf
function GetPage(url) {
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST",url,false);
	xmlhttp.send();
	return xmlhttp.responseText;
}