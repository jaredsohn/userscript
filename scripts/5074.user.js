// ==UserScript==
// @name           Zelderex Addons
// @namespace      http://www.defhoboz.biz/zelderexaddons.user.js
// @description    Zelderex Script
// @include        http://*.zelderex.com/*
// ==/UserScript==
p=document.location.href;

// Get rid of web page usability restrictions (those are sooo 1996)
if (p.match(/world[0-9]\.zelderex\.com/)) {
  window.addEventListener("load",function(){
    unsafeWindow.document.onmouseover=null;
    unsafeWindow.document.oncontextmenu=null;
    unsafeWindow.document.onmouseout=null;
    unsafeWindow.document.onkeydown=null;
  },true);
}

// Training center mods
if (p.match('training_center')) {
  window.addEventListener("load",function(){
    // Xpath to the top and bottom table
    var TrainTopTable="html/body/div/table/tbody/tr/td/div/center/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/form[1]/div/table/tbody/tr/td[2]/table[1]/tbody/tr/td/table/tbody/"
    var TrainBottomTable="/html/body/div/table/tbody/tr/td/div/center/table/tbody/tr[4]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/form[1]/div/table/tbody/tr/td[2]/table[2]/tbody/tr/td/table/tbody/"
    
    // Change colspan to look nice
    document.evaluate(TrainTopTable+"tr[1]/td", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).setAttribute("colspan","7");
    document.evaluate(TrainBottomTable+"tr[1]/td", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).setAttribute("colspan","7");    
    
    // Add cost header
    var header1 = document.evaluate(TrainTopTable+"tr[2]", document, null,
  			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  	var header2 = document.evaluate(TrainBottomTable+"tr[2]", document, null,
  			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    var costcol=document.createElement('td')
    costcol.innerHTML="<b>Cost</b>"
    costcol.setAttribute("class","row1");
    header1.appendChild(costcol)
    var costcol=document.createElement('td')
    costcol.innerHTML="<b>Cost</b>"
    costcol.setAttribute("class","row1");
    header2.appendChild(costcol)
    
    // Add input boxes for each column on top table
    for(var i=3;i<9;i++)
    {
      var row = document.evaluate(TrainTopTable+"tr["+i+"]", document, null,
  			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  		var amt = document.evaluate("td[6]/p/input",row,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  		amt.addEventListener("change",function(){
  		  var price = this.parentNode.parentNode.previousSibling.previousSibling.firstChild.innerHTML.replace("$","")
  		  this.parentNode.parentNode.nextSibling.nextSibling.firstChild.value=this.value*price
      },true);
  		///td[6]/p/input
  		var lastcol = document.createElement('td')
  		lastcol.innerHTML = "<input id='cost"+i+"' type=text style='background-color:#323234;width:60px' disabled>"
  		lastcol.setAttribute("class","row1");
  		//row
  		row.appendChild(lastcol)
    }
    
    // Add input boxes for each column on bottom table
    for(var i=3;i<6;i++)
    {
      var row = document.evaluate(TrainBottomTable+"tr["+i+"]", document, null,
  			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  		var amt = document.evaluate("td[6]/p/input",row,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  		amt.addEventListener("change",function(){
  		  var price = this.parentNode.parentNode.previousSibling.previousSibling.firstChild.innerHTML.replace("$","")
  		  this.parentNode.parentNode.nextSibling.nextSibling.firstChild.value=this.value*price
      },true);
  		///td[6]/p/input
  		var lastcol = document.createElement('td')
  		lastcol.innerHTML = "<input id='cost"+i+"' type=text style='background-color:#323234;width:60px' disabled>"
  		lastcol.setAttribute("class","row1");
  		//row
  		row.appendChild(lastcol)
    }
    
    // Redefine umax to work (why isn't this calculated by JS on the fly?)
    unsafeWindow.document.umax = function(a,b){
      unsafeWindow.document.training.elements[a*2].value = b;
      var price = unsafeWindow.document.training.elements[a*2].parentNode.parentNode.previousSibling.previousSibling.firstChild.innerHTML.replace("$","")
  		unsafeWindow.document.training.elements[a*2].parentNode.parentNode.nextSibling.nextSibling.firstChild.value=unsafeWindow.document.training.elements[a*2].value*price
    }
  },true)
}
