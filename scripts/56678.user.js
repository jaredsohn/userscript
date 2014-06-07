// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  It was written using
// Greasemonkey 0.8 and FireFox 3.0.13
// To install Greasemonkey go to http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Spy Missions With Training", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Spy Missions With Training
// @description   Adds the Spy Training input table on the Spy Missions page.
// @include       http://www.mythicwars.com/norron/g_spyMissions.asp*
// @include       http://www.mythicwars.com/norron/g_spyMageOverview.asp?redirect
// ==/UserScript==



  window.setTimeout( function() 
  {
	// Request spy mage overview page to get desired info
	GM_xmlhttpRequest({
	      method: 'GET',
               url: 'http://www.mythicwars.com/norron/g_spyMageOverview.asp',
	      headers: {
	         'User-agent': 'Mozilla/3.0 (compatible) Greasemonkey',
	         'Accept': 'application/atom+xml,application/xml,text/xml',
	      },
	      onload: function(data) {
			var pageHTML = data.responseText;
			//alert(pageHTML);
			if(1)
			{
				// Parse that page to get the spies training table

				var pattern = /<table border="0" cellpadding="4" cellspacing="0">/;
				var startingPlace = pageHTML.search(pattern);
				var string = pageHTML.substr(startingPlace);
				var desiredTable = string.substring(0, string.lastIndexOf('<table border="0" cellpadding="4" cellspacing="0">'));

				// Grab the mages table inorder to get their current release/training status
				// I am not sure if this is necessary but since Nat's methods are probably expecting
				// this data then better safe then sorry.
				var secondTable = string.substr(string.lastIndexOf('<table border="0" cellpadding="4" cellspacing="0">'));
				var mageInputs = secondTable.split('<input');
				
				var reg = new RegExp(/hidden/);

				var inputs = "";
	
				// Only get the hidden input fields and avoid the checkboxes
				for(var i=0;i<mageInputs.length; i++){
					var input = '<input' + mageInputs[i].substring(0, mageInputs[i].indexOf('>')+1);
					var test = reg.test(input);
					if(test){
						inputs+= input;
					}
				}

				// Setup invisible iFrame so that the training can be done without leaving the page
				var iFrame = '<iframe name="IframeSubmission" width="0" height="0"></iframe>'

				// Using custom form element so that it will target the iFrame
				var form = '<form name="spyTrain" action="g_spyMageOverview.asp" method="post" target="IframeSubmission" >';
				var onClickTXT = 'document.getElementsByName(\'spyTrain\')[0].submit(); location.reload();';
				var submitButton = '<input type="button" value="Train/Release Spies" class="button" onClick="'+onClickTXT+'" />';


				// Now that we have the desired HTML we must put it somewhere.
				// Through trial and error decided that the 21st table of the page was a good place
	
				var table = document.getElementsByTagName('table')[21];

				// Create new row and column to place the data into
				var newRow = document.createElement('tr');
				var newCol = document.createElement('td');

				// Now put all the data into place
				newCol.innerHTML = iFrame + form + desiredTable + inputs + submitButton +'</form>'; //'<font color=red>TESTING</font>';
				newCol.setAttribute('colspan', '3');
				newCol.setAttribute('align','center');
				newRow.appendChild(newCol);
				table.appendChild(newRow);
			}
		}
	});
  }, 50);
