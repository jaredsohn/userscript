// ==UserScript==
// @name           You Tube Button For 50Songs Radio Deejay
// @version        0.3
// @date       	   2009-11-27
// @namespace      marcoratto
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/57682
// @description    Add button "You Tube" into the 50songs chart of Radio Deejay.
// @include        http://mydeejay.deejay.it/programmi/50songs.php*
// ==/UserScript==

/**
 * Set this true to see more details about the errors encountered.
 * @type {Boolean}
 */
var DEBUG = true;

var SUC_script_num = 57682; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js',
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'You Tube Button For 50Songs Radio Deejay') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	debug("Check for update...");
	updateCheck(false);
} catch(err) {
	debug(err.description);
}


function main()
{
	debug("main():start");
	var allLinks, thisElement;
		  
		  
    allLinks = document.evaluate("/html/body[@id='promo']/div[@id='background']/div[@id='wrapper']/div[@id='house']/div[@id='column_1']/div[@id='classifica']/div[2]/table/tbody/tr/td[4]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisElement = allLinks.snapshotItem(i);
	
	// Sample: "<em>I Gotta Feeling</em><br>Black Eyed Peas"
	var tdValue = thisElement.innerHTML;
	debug("main():" + tdValue);
	
	var emStartPos = tdValue.indexOf("<em>");
	var emEndPos = tdValue.indexOf("</em>");
	var brStartPos = tdValue.indexOf("<br>");
	
	if ((emStartPos != -1) && (emEndPos != -1) && (brStartPos != -1)) {
	    var songTitle = tdValue.substring(emStartPos+4, emEndPos);
	    var songAuthor = tdValue.substring(brStartPos+4, tdValue.length);
	    debug("main():" + songTitle);
	    debug("main():" + songAuthor);
	    
	    // searchVideoOnYouTube(songAuthor, songTitle);
	    
	    var newElement = document.createElement("a");
	    newElement.href="http://www.youtube.com/results?search_query=" + escape (songTitle + "," + songAuthor);
	    newElement.target="_new";
	    
	    // add text to our link
	    // var statusDivContent = document.createTextNode('You Tube');
	    // newElement.appendChild(statusDivContent);
	    var logo = document.createElement('img');
	    logo.src = "data:image/gif;base64,R0lGODlhEAAQAPMAAAABABASDyEjIFNVUv8KD/8tMP9QT/9kZf98fKCin/+trdrU0f/Q0P/i4P3+" +
	    "+wAAACH5BAAAAAAALAAAAAAQABAAAAR20Dkwpb12gQQW/s4ADI4ACNMSfF3pBJzGesJSbxTWmqiZ" +
	    "g0CLokAoGIkFA4LBUEgIDAmR4JgWFAgp1cAtNIaEYUHrIHwVTjSjQa1SCwwE+oBusMlwuoLOULaJ" +
	    "VVFoDlgOdw4HSUYGi0SJBhYIB5MHBpUHklkOEQA7";
	    
	    logo.lowsrc = 'data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAALAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D';
	    logo.alt = 'You Tube';
	    
	    newElement.appendChild(logo);
	    
	    var newColumn = document.createElement("td");
	    newColumn.setAttribute("class", "color_brd_0 color_bgd_1");
	    newColumn.setAttribute("valign", "center");
	    
	    newColumn.appendChild(newElement);

	    thisElement.parentNode.insertBefore(newColumn, thisElement.nextSibling);
	}

    }
    	    
    debug("main():end");
}

function searchVideoOnYouTube(author, song) {
    debug("searchVideoOnYouTube():start");
    
    GM_xmlhttpRequest({
    method: "POST",
    url: "http://www.youtube.com/results?search_query=" + escape (song + "," + author),
    headers: null,
    onload: function(responseDetails) {
      var resultLinks = responseDetails.evaluate("/html/body/div[@id='baseDiv']/div[@id='results-main-content']/div[1]/div/div/div[2]/div[1]/a/@href",
	    document,
	    null,
	  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	  null);
	    
      for (var i = 0; i < resultLinks.snapshotLength; i++) {
    	var elem = resultLinks.snapshotItem(i);
	debug("main():" + elem.href);
      }
    }
});

      debug("searchVideoOnYouTube():end");
    }

// Analyze XmlHttp response
function xmlhttpChange(xmldoc) {
      debug("xmlhttpChange():start");
	
      var resultLinks = dom.evaluate("/html/body/div[@id='baseDiv']/div[@id='results-main-content']/div[1]/div/div/div[2]/div[1]/a/@href",
	    document,
	    null,
	  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	  null);
	    
      for (var i = 0; i < resultLinks.snapshotLength; i++) {
    	var elem = resultLinks.snapshotItem(i);
	debug("main():" + elem.href);
      }
  debug("xmlhttpChange():end");
   }

/**
 * Displays the error message if DEBUG is set to true.
 * Uses GM_log where available or alerts otherwise.
 * @param {String} message The error message to display.
 * @see DEBUG
 * @see ERROR
 */
function debug(message) {
    if (DEBUG) {
        if (typeof GM_log == 'function') {
            GM_log(message); //greasemonkey specific function
        } else {
            alert(message);
	}
    }
    
}

/*
  Attaches script into page body and executes it via an anonymous function call.
    NOTES:
      Script can therefore reference variables on the page, but likewise cannot use Greasemonkey API methods
*/

window.addEventListener("load", main, false);
