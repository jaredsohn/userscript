// ==UserScript==
// @name           Quibids Dashboard 
// @description    A helpful script to expand the bidding history of the people
// @namespace      QuibidsDashBoard 
// @include        http://www.quibids.com/auctions/*
// @version        0.1
// ==/UserScript==


//function main() {

// InnerText
var regExp = /<\/?[^>]+>/gi;
function ReplaceTags(xStr) {
 xStr = xStr.replace(regExp,"");
 return xStr;
}

alert("Quibids Expanded History is enabled.");
var TotalArray = new Array();
var LastWinner = 'moo';
var desc = document.getElementById('auction-id-prod-view');

// First remove all children nodes of product details
if (desc.hasChildNodes()) {
  while (desc.childNodes.length >= 1 ) {
    desc.removeChild(desc.firstChild );       
  } 
}

// Define a table which is added to the product image panel
var TableDiv   = document.createElement('div');
TableDiv.setAttribute('style', 'position:absolute; height:500px; width: 400px; overflow:auto;');
desc.appendChild(TableDiv);

var DataTable  = document.createElement('table');
DataTable.setAttribute('id','atable');
DataTable.setAttribute('style', 'width:350px; border:1px; tr{ border-bottom:1px}; align: center;');
var myTHead = DataTable.createTHead();
var newrow = myTHead.insertRow(0); //add new row to end of table
var newcell1 = newrow.insertCell(0); //insert new cell to row
var newcell2 = newrow.insertCell(1); //insert new cell to row
newcell1.innerHTML = "<b><font size=+1>User</font></b>";
newcell2.innerHTML = "<b><font size=+1>$ invested so far</font></b>";
TableDiv.appendChild(DataTable);

// Current winner panel
var classname = 'ending-bidder';
var node = document.getElementsByTagName("body")[0];
var a = [];
var re = new RegExp('\\b' + classname + '\\b');
var els = node.getElementsByTagName("*");
for(var i=0,j=els.length; i<j; i++) {
if(re.test(els[i].className))a.push(els[i]);
}
var winnerDiv = a[0];

// Price Div
var classname1 = 'last-price';
var node1 = document.getElementsByTagName("body")[0];
var a1 = [];
var re1 = new RegExp('\\b' + classname1 + '\\b');
var els1 = node1.getElementsByTagName("*");
for(var i1=0,j1=els1.length; i1<j1; i1++) {
if(re1.test(els1[i1].className))a1.push(els1[i1]);
}
var priceDiv = a1[0];

// Clock Timer
var clock = document.getElementById("clockImage");

// Auction ID
var auctionIDDiv = document.getElementById("auction-id-ttl-span");
var auctionID = auctionIDDiv.innerHTML;

// Auction Desc
var auctionDescDiv = document.getElementById("auction-id-descr");
var auctionDesc = ReplaceTags(auctionDescDiv.innerHTML);

// How much time is the clock held
var oldTime = new Date();

function elapsed (){
  var newTime = new Date();
  var sec = Math.round((newTime.getTime() - oldTime.getTime()) / 1000);
  oldTime = new Date();
  return sec;
}


unsafeWindow.$('body').ajaxSuccess (function(e, xhr, settings, data) {
				      
  if ((settings.url.indexOf("u2.php") != -1) || 
      (settings.url.indexOf("u.php") != -1)){

    var winnerName = winnerDiv.innerHTML;
    var price      = ReplaceTags(priceDiv.innerHTML);

    // Winner might be the same person even if this function is fired
    if (LastWinner != winnerName) {
      LastWinner = winnerName;

      if (!TotalArray[winnerName]) {
        TotalArray[winnerName] = 0.6000000000; // Each bid costs 60c
      } else {
        TotalArray[winnerName] += 0.600000000;
      }

//      var newrow = DataTable.insertRow(0); //add new row to end of table
//      var newcell1 = newrow.insertCell(0); //insert new cell to row
//      var newcell2 = newrow.insertCell(1); //insert new cell to row
//      var newcell3 = newrow.insertCell(2); //insert new cell to row
//      var newcell4 = newrow.insertCell(3); //insert new cell to row
//      var newcell5 = newrow.insertCell(4); //insert new cell to row
//      var newcell6 = newrow.insertCell(5); //insert new cell to row
//      var newcell7 = newrow.insertCell(6); //insert new cell to row
//

      // Add a row to the table
//      newcell1.innerHTML = auctionID;
//      newcell2.innerHTML = winnerName;
//      newcell3.innerHTML = price;
//      newcell4.innerHTML = TotalArray[winnerName].toFixed(2);
//      newcell5.innerHTML = clock.className;
//      newcell6.innerHTML = auctionDesc;
//      newcell7.innerHTML = elapsed(); 

        var newrow = DataTable.insertRow(1); //add new row to end of table
        var newcell1 = newrow.insertCell(0); //insert new cell to row
        var newcell2 = newrow.insertCell(1); //insert new cell to row
        newcell1.innerHTML = winnerName;
        newcell2.innerHTML = TotalArray[winnerName].toFixed(2);

    }
  }
}
);


