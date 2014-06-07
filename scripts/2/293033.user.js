// ==UserScript==
// @name       	Hit Timer Fixed
// @namespace 	http://userscripts.org/users/43629
// @version    	0.1
// @description This is an edited version of Hit Timer 0.1 that fixes the compatibility issues with Firefox and adds support for auto-accepted HITs. Tested and working in Firefox 26 and Chrome 32.
// @match	https://www.mturk.com/mturk/accept*
// @match	https://www.mturk.com/mturk/previewandaccept*
// @match	https://www.mturk.com/mturk/statusdetail*
// @match       https://www.mturk.com/mturk/submit*
// @copyright  	2013+, Ben McMath, Jasmine Branch
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant       none
// ==/UserScript==



if($('#theTime').length > 0)
{
    console.log("-=-=-= Found a Timer");
    
        var checker = setInterval(function(){
    	var hitId = document.getElementsByName("hitId")[1].value;
        var theTime = document.getElementById('theTime').textContent;
        if(typeof(Storage)!=="undefined")
        {
        	// Yes! localStorage and sessionStorage support!
	        localStorage.setItem('hitTimer.' + hitId, theTime);
        }
        else
        {
    	    // Sorry! No web storage support..
            console.log("-=-=-= Your browser doesn't support local storage, and therefore we can not track the timing of hits");
            clearInterval(checker);
        }
    }, 1000);
}

// see if we are on the status page
if(document.getElementsByClassName('IKnowYou').length > 0)
{
    setTimeout(loadTimes, 1000);    
}

function loadTimes()
{
	addHeaderColumn();

	var requesterColumns = document.getElementsByClassName('statusdetailRequesterColumnValue');
	
	for (var i = requesterColumns.length - 1; i >= 0; i--) {
			var linkElement = null;
            for(var j = requesterColumns[i].children.length -1; j >= 0; j--)
            {
                if(requesterColumns[i].children[j].tagName = "A")
                {
                    linkElement = requesterColumns[i].children[j];
                    break;
                }
            }
            
            if(typeof linkElement != 'undefined')
            {
                var hitId = linkElement.href.match(/[A-Z0-9]{30}/);
                var timeTaken = getTime(hitId);
                
                addTimeTaken(requesterColumns[i], timeTaken);
            }
	}
}
    
function addHeaderColumn()
{
	var header = document.getElementsByClassName('grayHead');
	var timeColumn = document.createElement('th');
	var timeTitle = document.createTextNode('Estimated Time Taken');
	timeColumn.appendChild(timeTitle);
	header[0].appendChild(timeColumn);
}
    
function getTime(hitId)
{
    var timeTaken = localStorage.getItem('hitTimer.' + hitId);
    return (timeTaken == null) ? '' : timeTaken;
}
    
function addTimeTaken(element, timeTaken)
{
	var timeColumn = document.createElement('td');
	timeColumn.appendChild(document.createTextNode(timeTaken));
	element.parentNode.appendChild(timeColumn);
}