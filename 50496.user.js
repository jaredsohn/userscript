// ==UserScript==
// @name           recruiter progress
// @namespace      http://dnathe4th.porfusion.com/blog/
// @description    determines recruiter progress
// @include        http://z6.invisionfree.com/TDO1/index.php?
// @exclude    http://z6.invisionfree.com/TDO1/index.php?showtopic=*
// ==/UserScript==

GM_xmlhttpRequest({
method: 'GET',
url: "http://z6.invisionfree.com/TDO1/index.php?showtopic=3284&st=100000000",
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
},
onload: function(responseDetails) {
// convert string to XML object
resp = responseDetails.responseText;
resp = resp.substring(resp.indexOf("<a name='last'"));

box = document.createElement("span");
box.innerHTML = resp;
xmlobject = box;
last_recruiter = xmlobject.getElementsByTagName("td")[3].getElementsByTagName("div")[0].innerHTML.replace(/\s+$/,"");
//alert(last_recruiter);
//alert(last_recruiter.substr(last_recruiter.length - 1));
//alert(last_recruiter.split("br").length);
//alert(last_recruiter.length - last_recruiter.lastIndexOf("<br"));
//alert((last_recruiter.split("br").length > 3));
if(last_recruiter.indexOf("<br") != -1 && (last_recruiter.length - last_recruiter.lastIndexOf("<br") > 6 || last_recruiter.split("br").length > 3) && last_recruiter.substr(last_recruiter.length -1 , last_recruiter.length) != ":")
{
var conf = confirm("No one is recruiting!\n\nGo to recruiting thread?");
if(conf){location.href="http://z6.invisionfree.com/TDO1/index.php?showtopic=3284&st=100000000#last";}
}

}
});