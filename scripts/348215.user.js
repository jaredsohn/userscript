// ==UserScript==
// @name       Hide instructions for media hits
// @version    0.1
// @description  enter something useful
// @match      https://s3.amazonaws.com/mturk_bulk/hits*
// @copyright  2012+, You
// ==/UserScript==

if (document.getElementsByClassName("company-subhead")[0]){
   document.getElementsByClassName("company-subhead")[0].parentNode.innerHTML = "[REDACTED]";
}

var url = document.links[0].href;
if (!document.URL.match(/ASSIGNMENT_ID_NOT_AVAILABLE/))
    OpenInNewTab(url);

function OpenInNewTab(url )
{
  var win=window.open(url, '_blank');
  var interval = setInterval(function() { checkWin(win); }, 50);
}

function checkWin(myWindow)
{
  if (myWindow.closed)
  { 
    console.log("Closed");
    document.getElementById("scorefield1").focus();
    var interval_id = window.setInterval("", 9999); // Get a reference to the last
                                                  // interval +1
    for (var i = 1; i < interval_id; i++)
      window.clearInterval(i);
  }
}