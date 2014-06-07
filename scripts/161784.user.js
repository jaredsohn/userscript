// ==UserScript==
// @name       PNC Total
// @namespace  http://emontellese.com
// @version    0.91
// @description  create a total for PNC credit card value
// @match      https://www.onlinebanking.pnc.com/*
// @copyright  2012+, Eric Montellese
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


// A script for my lovely wife to be able to get an easy total of the bills from the current month.
//
// This is my first script, done quickly.  Suggestions for improvements welcome. Thanks.

// find the sum, given the array of bills
function findsum(bills)
{
  var sum = 0;
  
  for(var i=0; i<bills.length; i++ )
  {
    var value = bills[i].innerHTML;
    var signindex;
    
    //console.log("bill -- " + value);
    
    if ((signindex = value.indexOf("$")) !== -1)
    {
      //console.log(signindex + " -- " + value);
      var absvalue = parseFloat(value.substring(signindex+1).replace(/\,/g,''));
      //console.log(absvalue);
      
      //don't add the payments
      if (signindex !== 1)
      {
        console.log(absvalue);
        sum += absvalue;
      }
    }
  }
  return sum;
}

// find the bills on the page, return as an array of values
function findbills()
{
  var bills = 0;
  
  if (($('div.panelNavigation li.mid').length > 0) || ($('div.panelNavigation li.mid.sel').length > 0))
  {
    return bills;
  }
  
  // get bills if we're in the left tab
  if ($('div.panelNavigation li.left.sel').length > 0)
  {
    bills = document.getElementsByClassName("yui-dt-liner");
  }
  // get bills if we're in the right tab
  else if ($('div.panelNavigation li.right.sel').length > 0)
  {
    bills = $('table.dataTable_List td.alignRight');
  }
  
  return bills;
}

// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Print to screen
function printvalue(sum)
{
  //don't print if there are no bills
  if (sum == 0)
  {
    return;
  }
  var elem = document.createElement("div");
  elem.id = 'myID';
  elem.innerHTML = ' $' + numberWithCommas(sum.toFixed(2));
  document.body.insertBefore(elem,document.body.childNodes[0]);
}

//////////
// MAIN //
//////////



// if the 'view all' link is visible, click it
try {
  document.getElementById("yui-pg1-0-view-all-link").click();
} catch(err){}

// sum the bills and print it
printvalue(findsum(findbills()));

