// ==UserScript==
// @name           Innoport
// @namespace      https://www.innoport.com
// @include        https://www.innoport.com/*
// ==/UserScript==

var finalstring = "";
var resultString = "";
var failCount = 0;


setTimeout(function() { document.location.reload(); } , 60000);

// remove various background styles
var spans = document.getElementsByTagName('a');
for (i=0; i<spans.length; i++)
{
	//alert(spans[i].innerHTML.substring(0,5));
	if (spans[i].innerHTML == "Completed") {
		findStatus(spans[i].href, spans[i], spans[i].parentNode);
	}
}


function findStatus ( urlString, obj, parent ) {
	
			var resultString;
			
			GM_xmlhttpRequest({
			method: 'GET',
			url: urlString,
			headers: null,
			onload: function(responseDetails) {
				
				var xpath = new RegExp("Success[^ful]");
				response = responseDetails.responseText;
				c = response.match(xpath);
				
				if (c != null && c.length > 0) {
					resultString = "Success";
				}
				else {
					resultString = "Failed";
					parent.bgColor = "red";					
				}
								
				obj.innerHTML += " - " + resultString;
				obj.style.color = "000000";

			}
			});


}	


function sleep(milliSeconds){
    var startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}