// ==UserScript==
// @name       	Hit Timer
// @namespace 	http://userscripts.org/users/43629
// @version    	0.1
// @description Track the time of the last HIT completed.  This data is stored in the localStorage of the browser.  Hoping that this can be integrated with the MTurk HIT DataBase script soon.  Currently if times are recorded, they will show up on your daily status pages
// @match		https://www.mturk.com/mturk/*
// @match		https://www.mturk.com/mturk/statusdetail*
// @exclude     https://www.mturk.com/mturk/preview*
// @copyright  	2013+, Ben McMath
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

if($('#theTime').length > 0)
{
    console.log("-=-=-= Found a Timer");
        
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
    
    var checker = setInterval(function(){
    	var hitId = getParameterByName('hitId');
        var theTime = document.getElementById('theTime').innerText;
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
if(document.getElementsByClassName('IKnowYou').length > 0 && new RegExp('Status Detail').test(document.getElementsByClassName('IKnowYou')[0].innerText))
{
    setTimeout(loadTimes, 1000);
    
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
}
