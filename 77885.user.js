// ==UserScript==
// @key value
// @name : Reload the page if there is any change in Ip address of the system
// namespace
// @Description: 
// @include http://*
// @include file://*
// ==/UserScript==

window.setInterval("checkIpChange",2000); // Call the function every 2 seconds

function checkIpChange()
{
		GM_xmlhttpRequest(
		{
		    method: 'GET',
		    url: 'http://localhost/readValue.txt',
		    headers: 
		    {	
		        'User-agent': 'Mozilla/3.5 (compatible) Greasemonkey',
		        'Accept': 'text/plain',
		    },
		    onload: function(responseDetails) //My text file entry would be either '0' or '1' 
		    {
		        alert('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +
	                'Feed data:\n' + responseDetails.responseText);
			change= responseDetails.responseText ;
			if(change==1)
			{
				window.location.reload();
			}
			else
			{
				//Do Nothing
			}
		

		    }
		}
		);
}


