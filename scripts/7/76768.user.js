// just test version :)

// ==UserScript==
// @name           pinnaclesports timezone converter (to EST)
// @description    convert PST times to EST
// @namespace      pinnaclesports.com
// @include        https://*.pinnaclesports.com/*
// @include        http://*.pinnaclesports.com/*
// ==/UserScript==

var allDivs, thisDiv;

allDivs = document.evaluate(
    "//tr[@class='AlternatingData1']/td[1][contains(.,':')] | //tr[@class='AlternatingData2']/td[1][contains(.,':')] | //tr[@class='AD1']/td[1][contains(.,':')] | //tr[@class='AD2']/td[1][contains(.,':')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
function zeroPad(num,count)
{
  var numZeropad = num + '';
  while(numZeropad.length < count) 
  {
    numZeropad = "0" + numZeropad;
  }
  return numZeropad;
}    
    
for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);

    var txt = thisDiv.innerHTML;
    var split1 = txt.split(":");
    var hours = parseInt(split1[0],10);
    
    var split2 = split1[1].split(" ");
    var minutes = parseInt(split2[0],10);
    var ampm = split2[1]
    
    var addText = '';
    
    if (ampm == 'PM')
    {
      hours += 12;
    }
    
    if ((hours + 3) > 23)
    {
      var zbytok = 24 - (hours + 3);
      hours = zbytok - 3;
      addText = ' <b>(noc)</b>';
    }
    
    thisDiv.innerHTML = Math.abs(hours + 3) + ':' + zeroPad(minutes,2) + addText;
}