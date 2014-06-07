// ==UserScript==
// @name           Gym Page Addition
// @namespace      http://www.courtrivals.com/maingame.php
// @description    Add premium expiration and season date
// @include        http://www.courtrivals.com/maingame.php
// ==/UserScript==

// Season Date: <p class="loginBottomText" align="center"><img src="images/seasonHistogram.php" height="20" width="150" border="0"  /></p>


window.setTimeout( function() 
{
	var premium_expiration; 
	
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.courtrivals.com/settings.php', // find the premium expiration date
	    headers: {
	       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	       'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(premium) 
		{
			var data = premium.responseText;
			
			var premium_re = /F1E7C5.>(.*\d)&nbsp/;			
			var settings_page_lines = data.split('Expires :');
			
			
			
			// ==============================================================================
			//  Find the premium expiration date	
			// ==============================================================================	
			var interesting_lines = settings_page_lines[1].split('<\/td>');		
			var OK = premium_re.exec(interesting_lines[1]);			
			
			if(OK[1])
			{
				premium_expiration = OK[1];
			}
			
			// ==============================================================================
			//  Put the season date and premium expiration date just under the training table	
			// ==============================================================================	
			var main = document.getElementById('trainingTable');
			if (main) {
			    newElement = document.createElement('p');
				//newElement.innerHTML = '<p class="loginBottomText" align="center"><img src="images/seasonHistogram.php" height="20" width="150" border="0"  /></p>';
				newElement.innerHTML = '<p class="loginBottomText" align="center"><img src="images/seasonHistogram.php" height="20" width="150" border="0"  /></p>';
				if(premium_expiration)
				{
					newElement.innerHTML += '<strong><center>Premium Expires:</strong> ' + premium_expiration + '</center>';
				}
			    main.parentNode.insertBefore(newElement, main);
			}
			
			// ==============================================================================
			//  Remove a <p> to make things look prettier		
			// ==============================================================================	
			allTextareas = document.getElementsByTagName('p');
			allTextareas[3].innerHTML = '';			
		}
	});


	function getElementsByClassName(classname, par)
	{
		var a=[];   
		var re = new RegExp('\\b' + classname + '\\b');

		var els = par.getElementsByTagName("*");
	 
		for(var i=0,j=els.length; i<j; i++) 
		{       
			if(re.test(els[i].className))
			{	
				//alert('Found an element ' + els[i].innerHTML);
				a.push(els[i].innerHTML);
			}
		}
		return a;
	};


}, 100);
