// ==UserScript==
// @name        GitHub commit timestamps
// @namespace   http://rasmuswriedtlarsen.com
// @version     0.3
// @description Displays absolute time for commits (if less than 18 hours ago)
// @match       https://github.com/*
// @copyright   2014, Rasmus Wriedt Larsen
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/sugar/1.3.9/sugar.min.js
// ==/UserScript==

var msPrHour = 60 * 60 * 1000;

counter = 0

var updateTimes = function(event) {
    //console.log(counter++)
    
    $("time.js-relative-date").each( function () { 
        var commitTime = new Date ($(this).attr("datetime"));
        var diff = (Date.now() - commitTime);
        
        newTitle = commitTime.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}")
        
        if ( diff < 18 * msPrHour)
        {
            var formattedTime = commitTime.format("{HH}:{mm}")
            
            $(this).html(formattedTime);
            $(this).removeClass("js-relative-date");
        }
        
        $(this).attr("title", newTitle)
    });
};

// setInterval( function(){$('time').change();}, 5 * 1000 );

// $('time').change();

function init()
{
  // Make sure this is really an HTML page, as Chrome runs these scripts on just about everything
  if (!(document.documentElement instanceof HTMLElement))
    return;

  updateTimes(null);
  // TODO: very hacky solution to updating when page reloads ...
  document.addEventListener("DOMNodeInserted", updateTimes, true);
}

// In Chrome 18 the document might not be initialized yet
if (document.documentElement)
  init();
else
  window.setTimeout(init, 0);