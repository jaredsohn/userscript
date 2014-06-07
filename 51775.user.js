// ==UserScript==
// @name           auto starter for IMAGESHACK DRIVE
// @namespace      whatever
// @include        http://*.imageshack.us/tor/?action=run&torrentmeta_id=*&mod=start
// ==/UserScript==


function ajaxRequest(url, method, param, onSuccess, onFailure){
	GM_log("request : "+url);
	var xmlHttpRequest = new XMLHttpRequest();

	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
		else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
	};
	xmlHttpRequest.open(method, url, true);

	if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.send(param);
	}
	function call(){
	 ajaxRequest(document.URL,"GET",null,handle,function(){GM_log("connection problem"); setTimeout(call, 1000);} );
	}
	
	function handle(httpRequest)
{
	httpResponse = httpRequest.responseText;	


	if(!httpResponse)
        {
		GM_log("connection problem");
	}
	else
    if(httpResponse.match("Shared download pool limit for free accounts has reached it's limit. Please try again later.")){
        setTimeout(call, 1000);
    }else
      alert ("torrent is running :)");
      GM_log(httpResponse);    
}

setTimeout(call, 2000);