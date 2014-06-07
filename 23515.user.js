// ==UserScript==
// @namespace     http://www.challengegames.com/jira
// @name          Add sub-total tool-tip to Estimate column 
// @description   Add sub-total tool-tip to Estimate column in Jira when viewing issues
// @include       http://jira.challengegames.com/*/issueNavigator*
// ==/UserScript==

var cells = document.getElementsByTagName('td');
var sum = 0;
var estimate = 0;
for( i=0; i<cells.length; ++i )
{
  if( cells[i].className == 'nav customfield_10000' )
  {
    estimate = cells[i].innerHTML;
    estimate = parseFloat( cells[i].innerHTML );
    if( !isNaN(estimate) )
    {
      sum = sum + estimate;
      cells[i].innerHTML = '<span style="cursor:pointer" title="' + sum + '">' + estimate + '</span>';
    }
  }
}

//.user.js
