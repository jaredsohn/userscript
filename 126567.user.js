// ==UserScript==
// @id             wiki.greasespot.net-ff93037b-f0f3-47c0-bce8-45a29b1df5aa@IKilledBambi
// @name           Show Account Balance
// @version        1.1
// @namespace      IKilledBambi's Scripts
// @author         IKilledBambi
// @description    
// @include        https://www.mturk.com/mturk/dashboard
// @run-at         document-end
// ==/UserScript==

GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.mturk.com/mturk/youraccount",
    onload: function(response) {
    var rE = /\$[0-9].[0-9][0-9]/gi; // RegExp, Three Digits.
    var rE2 = /\$[0-9][0-9].[0-9][0-9]/gi; // RegExp, Four Digits.
    
    var fResp1 = response.responseText.match(rE);   // RegExp Matching 1.
    var fResp2 = response.responseText.match(rE2);  // RegExp Matching 2.


    if( fResp1 !== null )//  If balance has 3 digits use fResp1.  Else, fResp2.
    {
        addBalance(fResp1);
    }
    else
    {
        addBalance(fResp2);
    }  
}});


//
// Insert the Projected Earnings in the dashboard.
// Copied from current_earnings script - Copyright (c) 2008, Mr. Berserk
// 
// Modified to suit
//


//  Copied from Todays Projected Earnings.
//  If current_earnings does what this script does, I apologise.
//  I do not have access to that script itself.
function addBalance(fRespVersion)
{
    var allTds, thisTd;
    allTds = document.getElementsByTagName('td');
    for (var i = 0; i < allTds.length; i++)
    {
       thisTd = allTds[i];
       if ( thisTd.innerHTML.match(/Total Earnings/) && thisTd.className.match(/metrics\-table\-first\-value/) )
       {
          var row = document.createElement('tr');
          row.className = "even";


          var projectedEarningsLink = document.createElement('a');
          projectedEarningsLink.href =  "https://www.mturk.com/mturk/youraccount";
          projectedEarningsLink.innerHTML = "Account Balance";
      

          var cellLeft = document.createElement('td');
          cellLeft.className = "metrics-table-first-value";
          cellLeft.appendChild(projectedEarningsLink);
          row.appendChild(cellLeft);
			 
          var cellRight = document.createElement('td');      
          cellRight.innerHTML = fRespVersion;
          //cellRight.style('font-weight: bold');
          row.appendChild(cellRight);
			 
          thisTd.parentNode.parentNode.insertBefore(row,thisTd.parentNode.nextSibling);
       }
    }
}