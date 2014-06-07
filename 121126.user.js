// ==UserScript==
// @name           Tag Remove (All)
// @namespace      Tag remove for links of Amazon
// @description    Elimina la variable tag de los vínculos hacia Amazon
// @include        *
// @author         WeSo
// @version        20140504
// ==/UserScript==


// Amazon sites
var sites = Array(
  		"amazon.com",
  		"amazon.es",
  		"amazon.co.uk",
  		"amazon.de",
  		"amazon.it",
  		"amazon.fr",
  		"amazon.ca",
  		"amazon.cn",
  		"amazon.co.jp"
		);
		
		
		
function delTag (text) {
  var tmp = unescape(text);
  tmp = tmp.replace(/&amp;/gi,"&");
  
  // &...&
  var pattern = "&tag=[a-zA-Z0-9.-]*-[0-9]{1,2}&";
  var exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"&");  
  
  // &...
  pattern = "&tag=[a-zA-Z0-9.-]*-[0-9]{1,2}";
  exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"");   
  
  // ?...&
  pattern = "\\?tag=[a-zA-Z0-9.-]*-[0-9]{1,2}&";
  exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"?");    

  // ?...
  pattern = "\\?tag=[a-zA-Z0-9.-]*-[0-9]{1,2}";
  exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"");    
  
  
  return tmp;
}

function clearText (text,site) {
  var tmp = unescape(text);
  tmp = tmp.replace(/&amp;/gi,"&");
  var result;

  // Filtro 1
  var pattern = "http://[w]{0,3}.?"+site+"/(.*)/dp/B([A-Z0-9]{9})/?.*";
  var exp = new RegExp(pattern, "gi");
  if (result = exp.exec(tmp))
    tmp = "http://www."+site+"/dp/B"+result[2]+"/"+result[1]+"/";
  
  // Filtro 2
  pattern = "http://[w]{0,3}.?"+site+"/(.*)/dp/([A-Z0-9]{9,10})/?.*";
  exp = new RegExp(pattern, "gi");
  if (result = exp.exec(tmp))
    tmp = "http://www."+site+"/dp/B"+result[2]+"/"+result[1]+"/";
      
  // Filtro 3
  pattern = "http://[w]{0,3}.?"+site+"/gp/product/([A-Z0-9]{9,10}).*";
  exp = new RegExp(pattern, "gi"); 
  if (result = exp.exec(tmp))
    tmp = "http://www."+site+"/gp/product/"+result[1]+"/";
    
  // Filtro 5 (link.php)
  pattern = "http://[w]{0,3}.?.*?/link\.php\?url\=(.*)";
  exp = new RegExp(pattern, "gi"); 
  if (result = exp.exec(tmp))
    tmp = result[1];

  return tmp;
}


for (var n = 0; n < sites.length; n++) {
	var links = document.evaluate("//a[contains(@href, '"+sites[n]+"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	for (var i = 0; i < links.snapshotLength; i++) 
	{ 
	  var link = links.snapshotItem(i);
	  link.href = clearText(link.href,sites[n]);
	  link.href = delTag(link.href);
	} 
} 