// ==UserScript==
// @name           TMN-BNDExploit
// @namespace   TMN-BNDExploit
// @description  Thanks for all the fish... 9.29.2009
// @include        http://*drugsbooze.aspx*
// ==/UserScript==
  if (document.getElementById('aspnetForm')) {
  //window.location = 'about:robots';
  } else {
  
   TiMeouT = "";
// refresh every 2 min
var delaytime = (Math.round(Math.random() * (10000 - 1900) + 1900));
//    (Max - Min) + min Adjust acordinly.....

var status = document.createElement("div");
status.innerHTML = "<table style='position:absolute;left:0px;top:0px;'><tr><td bgcolor=green><font color=yellow>D:" + delaytime + '</font></td></tr></table>';
document.body.insertBefore(status, document.body.FirstChild);
  
var dev = document.createElement("div");
dev.innerHTML = "<table style='position:absolute;left:0px;top:0px;'><tr><td bgcolor=green><font color=yellow>D:" + delaytime + '</font></td></tr></table>';
document.body.insertBefore(dev, document.body.FirstChild);

anySpan = document.getElementsByTagName('div')[0];
if ( anySpan ) {
switch ( anySpan.innerHTML ) {
	default:
dev.innerHTML = dev.innerHTML + anySpan.innerHTML;
var a = anySpan.innerHTML.split('You have '); 
if (a[1]) {
		var b = a[1].split(' before you are released from prison.');
        var RefreshLeft = ( parseFloat( b[0] ) + 1 );
setTimeout ( "document.location = 'drugsbooze.aspx'", (RefreshLeft *1000));
};
	break
};
};
  
var HREFcmd = location.href.split("/authenticated")[1];
switch ( HREFcmd ) {
  case ( "/drugsbooze.aspx.aspx?stop" ): //Manually stopped.
  TiMeouT = "";
	//window.location = 'about:robots';
  break
  case ( "/user_msg.aspx" ): //banned... reload in five minutes.
     //doTimeOut( 300 );
  break
  case ( undefined ): //Logged out!
	//window.location = 'about:robots';
  break
  case ( "/login.aspx" ): //Logged out!
	//window.location = 'about:robots';
  break
  default:  //Anything we don't trap
    TiMeouT = "";
  break
};


var nodesSnapshotdrugs = document.evaluate("//span[@id='lblDrugsMaxUnits']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=0 ; i < nodesSnapshotdrugs.snapshotLength; i++ )
{
  //alert( "Drugs Max Units: " + nodesSnapshotdrugs.snapshotItem(i).textContent );
	var drugsmax = nodesSnapshotdrugs.snapshotItem(i).textContent;
};
var nodesSnapshotdrugsholding = document.evaluate("//span[@id='lblDrugsTotalUnit']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


for ( var i=0 ; i < nodesSnapshotdrugsholding.snapshotLength; i++ )
{
  //alert( "Drugs Units Held: " + nodesSnapshotdrugsholding.snapshotItem(i).textContent );
	var drugsheld = nodesSnapshotdrugsholding.snapshotItem(i).textContent;
};
var drugsfreecapacity = drugsmax - drugsheld;
var drugsbuyamount = drugsfreecapacity / 10;
//alert( "Drugs Max: " + drugsmax + " Drugs Held: " + drugsheld + " Drugs Free Slots: " + drugsfreecapacity + " Buy Amount: " + drugsbuyamount + "\n " );
var drugssellamount = drugsheld / 10;

//var nodesSnapshotbooze = document.evaluate("//span[@id='lblBoozeMaxUnits']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//for ( var i=0 ; i < nodesSnapshotbooze.snapshotLength; i++ )
//{
//  alert( "Drugs Max Units: " + nodesSnapshotdrugs.snapshotItem(i).textContent );
//	var boozemax = nodesSnapshotbooze.snapshotItem(i).textContent;
//};
//var nodesSnapshotboozeholding = document.evaluate("//span[@id='lblBoozeTotalUnit']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//for ( var i=0 ; i < nodesSnapshotboozeholding.snapshotLength; i++ )
//{
//  alert( "booze Units Held: " + nodesSnapshotboozeholding.snapshotItem(i).textContent );
//	var boozeheld = nodesSnapshotboozeholding.snapshotItem(i).textContent;
//};
//var boozefreecapacity = boozemax - boozeheld;
//var boozebuyamount = boozefreecapacity / 10;
//alert( "boozes Max: " + drugsmax + " booze Held: " + drugsheld + " Drugs Free Slots: " + drugsfreecapacity + " Buy Amount: " + drugsbuyamount + "\n " );
//var boozesellamount = boozeheld / 10;

if (drugsheld <= 0 ) { //& boozeheld <= 0) {
document.getElementById('txtDrugAmount1').value = drugsbuyamount;
document.getElementById('txtDrugAmount2').value = drugsbuyamount;
document.getElementById('txtDrugAmount3').value = drugsbuyamount;
document.getElementById('txtDrugAmount4').value = drugsbuyamount;
document.getElementById('txtDrugAmount5').value = drugsbuyamount;
document.getElementById('txtDrugAmount6').value = drugsbuyamount;
document.getElementById('txtDrugAmount7').value = drugsbuyamount;
document.getElementById('txtDrugAmount8').value = drugsbuyamount;
document.getElementById('txtDrugAmount9').value = drugsbuyamount;
document.getElementById('txtDrugAmount10').value = drugsbuyamount;
document.getElementById('radBuySellDrugs_0').checked = "true";
var TiMeouT = setTimeout ( "document.getElementById('btnBuySellDrug').click()", delaytime);
};

if (drugsheld >= 1 ) { //& boozeheld >= 1) {
document.getElementById('txtDrugAmount1').value = drugssellamount;
document.getElementById('txtDrugAmount2').value = drugssellamount;
document.getElementById('txtDrugAmount3').value = drugssellamount;
document.getElementById('txtDrugAmount4').value = drugssellamount;
document.getElementById('txtDrugAmount5').value = drugssellamount;
document.getElementById('txtDrugAmount6').value = drugssellamount;
document.getElementById('txtDrugAmount7').value = drugssellamount;
document.getElementById('txtDrugAmount8').value = drugssellamount;
document.getElementById('txtDrugAmount9').value = drugssellamount;
document.getElementById('txtDrugAmount10').value = drugssellamount;
document.getElementById('radBuySellDrugs_1').checked = "true";
var TiMeouT = setTimeout ( "document.getElementById('btnBuySellDrug').click()", delaytime);
};

//if (drugsheld >= 1 & boozeheld >= 0) {
//document.getElementById('txtBoozeAmount1').value = boozebuyamount;
//document.getElementById('txtBoozeAmount2').value = boozebuyamount;
//document.getElementById('txtBoozeAmount3').value = boozebuyamount;
//document.getElementById('txtBoozeAmount4').value = boozebuyamount;
//document.getElementById('txtBoozeAmount5').value = boozebuyamount;
//document.getElementById('txtBoozeAmount6').value = boozebuyamount;
//document.getElementById('txtBoozeAmount7').value = boozebuyamount;
//document.getElementById('txtBoozeAmount8').value = boozebuyamount;
//document.getElementById('txtBoozeAmount9').value = boozebuyamount;
//document.getElementById('txtBoozeAmount10').value = boozebuyamount;
//document.getElementById('radBuySellBooze_0').checked = "true";
//var TiMeouT = setTimeout ( "document.getElementById('btnBuySellBooze').click()", delaytime);
//};

//if (drugsheld <= 0 & boozeheld >= 1) {
//document.getElementById('txtBoozeAmount1').value = boozesellamount;
//document.getElementById('txtBoozeAmount2').value = boozesellamount;
//document.getElementById('txtBoozeAmount3').value = boozesellamount;
//document.getElementById('txtBoozeAmount4').value = boozesellamount;
//document.getElementById('txtBoozeAmount5').value = boozesellamount;
//document.getElementById('txtBoozeAmount6').value = boozesellamount;
//document.getElementById('txtBoozeAmount7').value = boozesellamount;
//document.getElementById('txtBoozeAmount8').value = boozesellamount;
//document.getElementById('txtBoozeAmount9').value = boozesellamount;
//document.getElementById('txtBoozeAmount10').value = boozesellamount;
//document.getElementById('radBuySellBooze_1').checked = "true";
//var TiMeouT = setTimeout ( "document.getElementById('btnBuySellBooze').click()", delaytime);
//};
};