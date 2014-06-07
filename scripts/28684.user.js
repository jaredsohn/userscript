// ==UserScript==
// @name           doubleTopic
// @namespace      zarg/kds/doubleTopic
// @include        http://club.pchome.net/forum_1_15*______.html
// @include        http://club.pchome.net/forum_1_15.html
// @description    v1.1 by zarg
// ==/UserScript==



var d=document.getElementById('nowpage').value

var links 

links = document.evaluate(
    "//div[@class='pager']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
if(location.href=='http://club.pchome.net/forum_1_15.html'||location.href=='http://club.pchome.net/forum_1_15_1______.html'){
    
	links.snapshotItem(1).href='forum_1_15_'+(parseInt(d,10)+2).toString()+'______.html'
    
}
  
else if(location.href=='http://club.pchome.net/forum_1_15_2______.html'){

  links.snapshotItem(1).href='forum_1_15_'+(parseInt(d,10)-1).toString()+'______.html'
  links.snapshotItem(2).href='forum_1_15_'+(parseInt(d,10)+2).toString()+'______.html'  	
  	
}
  
else{
  	
  links.snapshotItem(1).href='forum_1_15_'+(parseInt(d,10)-2).toString()+'______.html'
  links.snapshotItem(2).href='forum_1_15_'+(parseInt(d,10)+2).toString()+'______.html'
  	 	
}
  
  
  
GM_xmlhttpRequest({
method: 'GET',
url: 'http://club.pchome.net/forum_1_15_'+(parseInt(d,10)+1).toString()+'______.html',
overrideMimeType:'text/plain;charset=gb2312',
onload: function(responseDetails) {

	var c =responseDetails.responseText.match(/<ul\sclass=\"list_item\">(\n|.)*\n<\/ul>(?=\s\n<\/form>)/g)
	var logo
	
	logo = document.createElement("div");
	var b=document.getElementsByTagName('ul')[61]
	logo.innerHTML = c
	b.parentNode.insertBefore(logo, b.nextSibling);

}
});