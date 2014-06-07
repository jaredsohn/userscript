// ==UserScript==
// @name           Royal RP
// @namespace      BvS
// @description    Tabulates RP.
// @include        http://*animecubed.com/billy/bvs/village.html
// ==/UserScript==

var basic = new Array();
basic.push("Medicinal");
basic.push("Precious");
//basic.push("Brilliant");

var advanced = new Array();
advanced.push("Solid");
//advanced.push("Unmelting");

var basic_rp = 15;
var advanced_rp = 40;

function arrayContains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

window.addEventListener('load', function () {
  var labelElements = document.getElementsByTagName("label");
  
  var rp_totals = new Object;
  
  for(var i in labelElements) {
    var label = labelElements[i];
    var sub = label.childNodes[1].textContent;
    var msg = label.childNodes[2].textContent.substring(1);
    if(msg == "RP AWARDS DONE")
    {
      break; //We must be done milling.
    }
    if(sub.indexOf("Contracts") == -1)
    {
      continue; //This isn't a contract message, so this isn't interesting.
    }
    else
    {
      var c = msg.indexOf(" milled");
      if(c == -1)
      {
        break; //Someone didn't mill contracts!
      }
      var target = msg.substring(0,c);
      
      var rp = 0;
      
      var words = msg.substring(c).split(" ");
      for(var i in words)
      {
        var word = words[i];
        
        if(arrayContains(basic, word)) {
          rp += words[i-1] * basic_rp;
        }
        else if(arrayContains(advanced, word)) {
          rp += words[i-1] * advanced_rp;
        }
      }
      
      if(rp_totals[target])
      {
        rp_totals[target] += rp;
      }
      else
      {
        rp_totals[target] = rp;
      }
    }
  }
  
  var d = document.getElementById("annul");
  
  var s = "";
  
  for(var name in rp_totals)
  {
    if(rp_totals[name] > 0)
    {
      s += name + ": " + rp_totals[name] + "<br />";
    }
  }
  
  if(s != "")
  {
    d.innerHTML = "RP totals since last RP AWARDS DONE: <br/>" + s + "<br />" + d.innerHTML;
  }
}, true);