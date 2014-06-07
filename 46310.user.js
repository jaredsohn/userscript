// ==UserScript==
// @name           IP Lookup
// @author         JanJan
// @namespace      http://userscripts.org/scripts/show/46310
// @include        *
// @description    Replaces all IP addresses with domain name if available. This may be useful when reading long SNORT reports. The report has to be placed in <html>, <body>, and <pre> tags before.
// ==/UserScript==

// removes all javascript and css code
function removejscssfile(text){
	text = text.replace(/<script\b[^>]*>(.*?)<\/script>/gi,"");
	text = text.replace(/<link[A-Z0-9\b]*[^>]*\/>/gi,"");
	return text;
}

// Extracs and returns the domain name of the result page of ip-lookup.net
function parseResult(result) {
	//alternative approach because DOMParser did not work out (probably ip-lookup is not HTML standard conform)
	var div = document.createElement("div");
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(div);
	div.style.visibility="hidden";
	div.innerHTML = result;
	
	var x = div.getElementsByTagName("th"); //get all "th"
	for (i=0;i<x.length;i++)
	{
		if( x[i].innerHTML.match("Host") ) { //If the right row is found get the first and second link in the parent row, glue both together, and return them.
			if(x[i].parentNode.getElementsByTagName("a")[0]!=null && x[i].parentNode.getElementsByTagName("a")[1]!=null) { //this could be null for some reason unknown to me
				var url1 = x[i].parentNode.getElementsByTagName("a")[0].innerHTML;
				var url2 = x[i].parentNode.getElementsByTagName("a")[1].innerHTML;
				body.removeChild(div);
				return(url1+url2);
			}
		}
	}
	return(false);
}

//retrieves and returns the domain name from ip-lookup.net corresponding to the provided argument
function ipLookup(ip){
	// Using Greasemonkey method which allows cross site requests. The following lines are copied from wiki.greasespot.net
	var res = GM_xmlhttpRequest({
		method:"GET",
		url:"http://ip-lookup.net/index.php?"+ip,
		headers:{
			"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
			"Accept":"text/xml"
		},
		onload:function(response) {
			if (response.readyState == 4) {
				var pattern = new RegExp(ip,"g");
				response.responseText = removejscssfile(response.responseText);
				var url = parseResult(response.responseText)
				if(url!=false) { // in case some IP addresses are not resolveable or the page is down.
					document.body.innerHTML = document.body.innerHTML.replace(pattern,url);
				}
			}
		}
	});
}

// retrieve all IP addresses in current HTML document
var IPs = document.body.innerHTML.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g);

//This script is called multiple times for an unknown reason. In those cases no IP adresses could be extraced so that the following check prevents several runs.
if(typeof IPs != "object" || IPs == null){return false;}; //trivial validation

//call ipLookup() only once for each IP address, so remove redundant IP addresses before
var taken=[];
for(var i=0; i<IPs.length; i++){
	if(taken[IPs[i]]){continue;};
	taken[IPs[i]]=true;
	ipLookup(IPs[i]);
}