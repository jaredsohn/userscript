// ==UserScript==
// @name        Compliance Report Slider
// @namespace   http://*
// @include     http://192.168.200.7:8085/*
// @version     9
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource    customCSS http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @grant		GM_addStyle
// @grant  		GM_getResourceText
// @grant  		GM_setValue
// @grant  		GM_getValue
// @grant  		GM_deleteValue
// @grant  		GM_xmlhttpRequest
// ==/UserScript==

var $highlightColor = "#FFFF00"
var $xicon = "url('http://code.jquery.com/ui/1.10.3/themes/le-frog/images/ui-icons_ffffff_256x240.png')"
var $myLoader=['http://www.loadinfo.net/main/download?spinner=142903&disposition=inline'];
var newCSS = GM_getResourceText ("customCSS");

GM_addStyle (newCSS);	
GM_addStyle(".myClass { height: 25px; border: dotted 1px gray; border-radius: 4px;}");
GM_addStyle(".myH { background:"+ $highlightColor +"}");
GM_addStyle("#boxholder { width: 100%;}");
GM_addStyle("#boxdiv { border: dotted 1px gray; width: 85%; margin:auto; margin-bottom: 5px; }");
GM_addStyle(".txt { font-size: 24px; width: 100%; height: 100%}");

GM_addStyle(".editbtn, .editbtn a { background:blue;color:white;cursor:pointer }");
GM_addStyle(".myRed { background: red; color: white; }");

// preloading?

/*
for(i=0; i<=$myLoader.length; i++){
	$('<img/>').src = $myLoader[i];
}
*/


// == THIS IS THE FIRST CARROT!
// == THIS IS THE FIRST CARROT!
// == THIS IS THE FIRST CARROT!

var enhanceAudit = function(){

// == THIS IS THE FIRST CARROT!
// == THIS IS THE FIRST CARROT!
// == THIS IS THE FIRST CARROT!


$("table .dt:contains('Raw Data')").parent().parent().parent().parent().parent().parent().parent().each(function(){
      $("<div id='boxholder'/></div>").insertBefore(this);
});

var $boxdiv = $("<div id='boxdiv'/></div>")
$("#boxholder").append($boxdiv);

// remove the titlebar
$(".titlebar:eq(1)").hide();
$(".menubar:eq(1)").hide();


// is it ups or fedex?

var $isFedEx = false;
var $CarrierName

$("td .label").filter(function(){ return $(this).html() == "Carrier"; }).each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
      $CarrierName = $(this).parent().children("td:eq(1)").text();	

});

if($CarrierName.substring(0,3) == "FDX"){ 
	$isFedEx = true;
}


// WHAT KIND OF DATA TYPE???

var $firstCell = $("table .dt:contains('Raw Data')").find("tr:eq(2)").children("td:first").text();
var $dataType;
if( $firstCell == "BilltoAccountNumber" ){
	$dataType = "BO" // FedEx Billing Online
}
else if( $firstCell == "invoicenum" ){
	$dataType = "PR" // FedEx Prop ... whatever prop is
}
else if( $firstCell == "Dom_Intl" ){
	$dataType = "SD" // FedEx Shipment Detail
}




// EDIT DETAILS BUTTON

var $EditLink = $("#body_hlEdit").attr("href")
var $EditShow = "<table class='padded'><tr><td class='editbtn'><div class='txt'><a class='editbtn'>Edit</a></div></td></tr></table>"

$("#boxdiv").append( $EditShow );

$(".editbtn").click(function(){  
	$("#floater").dialog().html("<center><img src='"+$myLoader+"'></center>").load($EditLink + " .body");
	$(".ui-dialog-titlebar-close").css({"background": $xicon, "background-position": "-79px -127px"});
});


// GET THE TRACKING NUMBER

var $TrackingNumber
var $TrackingLink

if($isFedEx == true){
	if($dataType == "BO"){
		var $TrackingPrefix;
		var $TrackingPostfix;

		$("td .label").filter(function(){ return $(this).html() == "GroundTrackingIDPrefix"; }).each(function(){
			  $(this).parent().children("td:eq(1)").addClass("myH");		
			  $TrackingPrefix = $(this).parent().children("td:eq(1)").text();	
		});
		
		$("td .label").filter(function(){ return $(this).html() == "ExpressorGroundTrackingID"; }).each(function(){
			  $(this).parent().children("td:eq(1)").addClass("myH");		
			  $TrackingPostfix = $(this).parent().children("td:eq(1)").text();	
		});
		
		if(typeof $TrackingPrefix == "undefined") $TrackingPrefix = "";
		$TrackingNumber = "" + $TrackingPrefix + $TrackingPostfix;
	}
	else if($dataType == "PR"){
		var $TrackNum
		var $GroundTrackNum
		
		$("td .label").filter(function(){ return $(this).html() == "tracknum"; }).each(function(){
			  $(this).parent().children("td:eq(1)").addClass("myH");		
			  $TrackNum = $(this).parent().children("td:eq(1)").text();	
		});
		
		$("td .label").filter(function(){ return $(this).html() == "ground_tracknum"; }).each(function(){
			  $(this).parent().children("td:eq(1)").addClass("myH");		
			  $GroundTrackNum = $(this).parent().children("td:eq(1)").text();	
		});
		
		if( $GroundTrackNum == "                    "){ $TrackingNumber = $TrackNum; } // 20 spaces
		else{ $TrackingNumber = $GroundTrackNum ;}
	}
	else if($dataType == "SD"){
		$("td .label").filter(function(){ return $(this).html() == "ShipmentTrackingNumber"; }).each(function(){
			  $(this).parent().children("td:eq(1)").addClass("myH");		
			  $TrackingNumber = $(this).parent().children("td:eq(1)").text();	
		});
	
	}
	
	$TrackingLink = "https://www.fedex.com/fedextrack/?tracknumbers=" + $TrackingNumber;
}
else
{
	$("td .label").filter(function(){ return $(this).html() == "LeadShipmentNumber"; }).each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  $TrackingNumber = $(this).parent().children("td:eq(1)").text();	
		  $TrackingLink = $(this).parent().children("td:eq(1)").children("a").attr("href");
	});
}

var $TrackingShow = "<table class='tracking padded'><tr><td><div class='txt' ><a href='"+$TrackingLink+"' target='new'class='tracking'>Track</a></div></td></tr></table>"
$("#boxdiv").append( $TrackingShow);

if($isFedEx){
	$("#boxdiv .tracking td").css({"background":"#640199"});
	$(".tracking a").css({"color":"white"});
}
else
{
	$("#boxdiv .tracking td").css({"background":"#5a3813"});
	$(".tracking a").css({"color":"#fdb53c"});
}


// SHOW THE DELTA

var $CarrierRate
var $TotalRate

$("td .label:contains('Carrier Rate')").each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
      var $CarrierGrab = $(this).parent().children("td:contains('.')").text();		
	  $CarrierRate = Number($CarrierGrab.replace(/[^0-9\.]+/g,""));
});

$("td .label:contains('Total Rate')").each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
	var $TotalGrab = $(this).parent().children("td:contains('.')").text();		
	$TotalRate = Number($TotalGrab.replace(/[^0-9\.]+/g,""));
});

var $DeltaCalc = Math.round(($TotalRate - $CarrierRate)*100) / 100;
var $DeltaShow = "<table class='delta padded'><tr><td><div class='txt'>Delta:</div></td><td><div class='txt'>" + $DeltaCalc + "</div></td></tr></table>"

$("#boxdiv").append( $DeltaShow);
if( $DeltaCalc < -0.02){
	$("#boxdiv .delta td").css({"background":"red","color":"white"});
} 
else if( $DeltaCalc > 0.02){
	$("#boxdiv .delta td").css({"background":"black","color":"white"});
}
else if( $DeltaCalc > -0.02 && $DeltaCalc < 0.02){
	$("#boxdiv .delta td").css({"background":"gray","color":"white"});
}
else if( $DeltaCalc == 0){
	$("#boxdiv .delta td").css({"background":"green","color":"white"});
} 
else{
	$("#boxdiv .delta td").css({"background":"gray","color":"white"});
}


// GET CHARGE DESCRIPTION

var $ChargeDescription

$("td .label").filter(function(){ return $(this).html() == "ChargeDescription"; }).each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
      $ChargeDescription = $(this).parent().children("td:eq(1)").text();		
});


// UPS Shipping Charge Warning

if($isFedEx == false){
	if($ChargeDescription.substring(0,26) == "Shipping Charge Correction" || $ChargeDescription.substring(0,30) == "GSR Shipping Charge Correction"){
		$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Shipping Charge Correction:</div></td><td class='myRed'><div class='txt'>Warning!</div></td></tr></table>");
	}
}


// ASD Charge Warning

if($isFedEx == false){
	if($TrackingNumber.substring(0,1) == "K"){
		$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>ASD Charge:</div></td><td class='myRed'><div class='txt'>Warning!</div></td></tr></table>");
	}
}


// ASD Charge Warning 2

var $ChargeCategory

$("td .label").filter(function(){ return $(this).html() == "ChargeCategoryDetailCode"; }).each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
      $ChargeCategory = $(this).parent().children("td:eq(1)").text();		
});

if($isFedEx == false){
	if($ChargeCategory == "ASD"){
		$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>ASD Charge:</div></td><td class='myRed'><div class='txt'>Warning!</div></td></tr></table>");
	}
}


// BUNDLE WARNING

var $BundleNumber


if($dataType=="BO"){

	$("td .label").filter(function(){ return $(this).html() == "BundleNumber"; }).each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  $BundleNumber = $(this).parent().children("td:eq(1)").text();		
	});

}
else{

	$("td .label").filter(function(){ return $(this).html() == "bundle"; }).each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  $BundleNumber = $(this).parent().children("td:eq(1)").text();		
	});

}

if($isFedEx == true){
	if(typeof $BundleNumber == "undefined" || $BundleNumber == "" || $BundleNumber == "0000000"){
		// do nothing
	}
	else{
		$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Bundle:</div></td><td class='myRed'><div class='txt'>Warning!</div></td></tr></table>");
	}
}

// CALL TAG WARNING - PROP ONLY FOR NOW?


if($dataType=="PR"){
	$("td .label:contains('misc')").each(function(){
		 $(this).parent().children("td:eq(1)").addClass("myH");	
		 $MiscGrab = $(this).parent().children("td:eq(1)").text();	
		 if( $MiscGrab == "CALL TAG"){
			$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Call Tag:</div></td><td class='myRed'><div class='txt'>Warning!</div></td></tr></table>");			
		 }
	});
}


// SHOW DECLARED VALUE ADVANCED CALC

var $DeclareAccRate
var $DeclareIncRate

$("#body_GridView2 td:contains('Declared Value')").each(function(){
     $(this).parent().children("td:eq(5)").addClass("myH");	
     $DeclareAccRate = $(this).parent().children("td:eq(5)").text();	
	  
     $(this).parent().children("td:eq(7)").addClass("myH");	
     $DeclareIncRate = $(this).parent().children("td:eq(7)").text();	 
});

var $DeclareDelta = Math.round( ($DeclareIncRate - $DeclareAccRate) *100) / 100;
var $DeclareDeltaDelta = $DeclareDelta - $DeltaCalc;


// testing right now not sure if want to keep
// i guess it is helpful to see if it is contributing to other problems...
//if($DeclareDeltaDelta > -.02 && $DeclareDeltaDelta < .02){
if($DeclareDelta> 0){
	$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Declared Value Delta:</div></td><td class='myRed'><div class='txt'>"+$DeclareDelta+"</div></td></tr></table>");
}


// SHOW OVERSIZE PACKAGE VALUE ADVANCED CALC

var $OversizeAccRate
var $OversizeIncRate

$("#body_GridView2 td:contains('Oversize Package')").each(function(){
     $(this).parent().children("td:eq(5)").addClass("myH");	
     $OversizeAccRate = $(this).parent().children("td:eq(5)").text();	
	  
     $(this).parent().children("td:eq(7)").addClass("myH");	
     $OversizeIncRate = $(this).parent().children("td:eq(7)").text();	 
});

var $OversizeDelta = Math.round( ($OversizeIncRate - $OversizeAccRate) *100) / 100;
var $OversizeDeltaDelta = $OversizeDelta - $DeltaCalc;

if(typeof $OversizeAccRate != "undefined"){

$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Oversized Package Delta:</div></td><td class='myRed'><div class='txt'>"+$OversizeDelta+"</div></td></tr></table>");
}


// SHOW ADDITIONAL HANDLING ADVANCED CALC --- FEDEX

var $HandleAccRate
var $HandleIncRate

$("#body_GridView2 td:contains('Additional Handling')").each(function(){
     $(this).parent().children("td:eq(5)").addClass("myH");	
     $HandleAccRate = $(this).parent().children("td:eq(5)").text();	
	  
     $(this).parent().children("td:eq(7)").addClass("myH");	
     $HandleIncRate = $(this).parent().children("td:eq(7)").text();	 
});

var $HandleDelta = Math.round( ($HandleIncRate - $HandleAccRate) *100) / 100;
var $HandleDeltaDelta = $HandleDelta - $DeltaCalc;


if($HandleDeltaDelta > -.02 && $HandleDeltaDelta < .02){
	$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Additional Handling Delta:</div></td><td class='myRed'><div class='txt'>"+$HandleDelta+"</div></td></tr></table>");
}


// SHOW DELIVERY AREA SURCHARGE ADVANCED CALC --- FEDEX

var $DasAccRate
var $DasIncRate

$("#body_GridView2 td:contains('Delivery Area')").each(function(){
     $(this).parent().children("td:eq(5)").addClass("myH");	
     $DasAccRate = $(this).parent().children("td:eq(5)").text();	
	  
     $(this).parent().children("td:eq(7)").addClass("myH");	
     $DasIncRate = $(this).parent().children("td:eq(7)").text();	 
});

var $DasDelta = Math.round( ($DasIncRate - $DasAccRate) *100) / 100;
var $DasDeltaDelta = $DasDelta - $DeltaCalc;

if($DasDeltaDelta > -.1 && $DasDeltaDelta < .1 ){
	if($DeltaCalc < -.03 || $DeltaCalc > .03){
		$("#boxdiv").append("<table class='padded'><tr><td class='myRed'><div class='txt'>Delivery Area Delta:</div></td><td class='myRed'><div class='txt'>"+$DasDelta+"</div></td></tr></table>");
	}
}


// LINE BREAK OK!!!!!
$("#boxdiv").append( "<BR>");


// SHOW THE BASE CALCULATION

var $IncentiveAmount;
var $NetAmount;
var $BaseRate;
var $BaseCalc;

// this is same fedex or ups
	$("td .label:contains('Base Rate')").each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  var $BaseGrab = $(this).parent().children("td:eq(1)").text();		
		  $BaseRate = Number($BaseGrab.replace(/[^0-9\.]+/g,""));
	});


if($isFedEx == true){
	if($dataType=="BO"){
		$("td .label").filter(function(){ return $(this).html() == "TransportationChargeAmount"; }).each(function(){
			 $(this).parent().children("td:eq(1)").addClass("myH");		
			  var $ABaseGrab = $(this).parent().children("td:eq(1)").text();		
			  $BaseCalc = Number($ABaseGrab.replace(/[^0-9\.]+/g,""));	  
		})
	}
	else if($dataType=="PR"){
		$("td .label:contains('feedesc')").each(function(){
			if( $(this).parent().children("td:eq(1)").text() == "FREIGHT CHARGE"){
				var nextline = $(this).parent().index() + 1
				$(this).parent().parent().children("tr:eq("+ nextline +")").children("td:eq(1)").addClass("myH");
				var $ABaseGrab = $(this).parent().parent().children("tr:eq("+ nextline +")").children("td:eq(1)").text();
				$BaseCalc = Number($ABaseGrab.replace(/[^0-9\.]+/g,""));
			}
			 
			  
		});
	}
	else if($dataType=="SD"){
		$("td .label").filter(function(){ return $(this).html() == "ShipmentFreightChargeAmount"; }).each(function(){
			 $(this).parent().children("td:eq(1)").addClass("myH");		
			  var $ABaseGrab = $(this).parent().children("td:eq(1)").text();		
			  $BaseCalc = Number($ABaseGrab.replace(/[^0-9\.]+/g,""));	  
		})
	}
	
	$("td .label").filter(function(){ return $(this).html() == "Carrier Incentive:"; }).each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  var $IncentiveGrab = $(this).parent().children("td:eq(1)").text();		
		  $IncentiveAmount = Math.abs(Number($IncentiveGrab.replace(/[^0-9\.]+/g,"")));
	});
	
	
}
else
{

	$("td .label").filter(function(){ return $(this).html() == "IncentiveAmount"; }).each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  var $IncentiveGrab = $(this).parent().children("td:eq(1)").text();		
		  $IncentiveAmount = Number($IncentiveGrab.replace(/[^0-9\.]+/g,""));
	});

	$("td .label").filter(function(){ return $(this).html() == "NetAmount"; }).each(function(){
		  $(this).parent().children("td:eq(1)").addClass("myH");		
		  var $NetAmountGrab = $(this).parent().children("td:eq(1)").text();		
		  $NetAmount = Number($NetAmountGrab.replace(/[^0-9\.]+/g,""));
	});

	console.log( "( "+$NetAmount+ " + "+$IncentiveAmount+") * 100) / 100");
	$BaseCalc = Math.round( ($NetAmount + $IncentiveAmount) *100) / 100;
	console.log( $BaseCalc );

}


var $BaseShow = "<table class='base' ><tr class='padded' align='center' valign='bottom'><td rowspan='2'><div class='txt'>Base:</div></td><td>Actual</td><td>RADAR</td><td rowspan='2'><div id='basecomment'></div></td></tr><tr class='padded'  align='center'><td><div class='txt'>" + $BaseCalc + "</div></td><td><div id='baserate' class='txt'>" + $BaseRate + "</div></td></tr></table>"
$("#boxdiv").append( $BaseShow);

var $BaseComment

if($BaseCalc == $BaseRate){
	$BaseComment = "Match!"
	$(".base td").css({"background":"green","color":"white"});
}
else if($BaseCalc < $BaseRate){
	$BaseComment = "Base Rate<br>Too HIGH!"
	$(".base td").css({"background":"gray","color":"white"});
	$("#baserate").parent().css({"background":"red","color":"white"});	
}
else if($BaseCalc > $BaseRate){
	$BaseComment = "Base Rate<br>Too LOW!"
	$(".base td").css({"background":"gray","color":"white"});
	$("#baserate").parent().css({"background":"red","color":"white"});	
}

$("#basecomment").append($BaseComment);


// GET THE RATES
var $ServiceRate
var $TierRate

$("td .label").filter(function(){ return $(this).html() == "Service Rate"; }).each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
      $ServiceGrab = $(this).parent().children("td:eq(1)").text();	
	$ServiceRate = Number($ServiceGrab.replace(/[^0-9\.]+/g,""));	  
});

$("td .label").filter(function(){ return $(this).html() == "Tier Rate"; }).each(function(){
      $(this).parent().children("td:eq(1)").addClass("myH");		
      $TierGrab = $(this).parent().children("td:eq(1)").text();	
	$TierRate = Number($TierGrab.replace(/[^0-9\.]+/g,""));	  
});


var $RateCalc = Math.round( ( $IncentiveAmount / $BaseCalc) *1000)/10;
var $RadarRate = Math.round( ( $ServiceRate + $TierRate ) *100) / 100;

var $RoundCalc = Math.round( $RateCalc );
if( $RoundCalc == $RadarRate ){ 
	$RateCalc = $RoundCalc;
};


var $RateShow = "<table class='rate' ><tr class='padded' align='center' valign='bottom'><td rowspan='2'><div class='txt'>Rate:</div></td><td>Actual</td><td>RADAR</td><td rowspan='2'><div id='ratecomment'></div></td></tr><tr class='padded'  align='center'><td><div class='txt'>" + $RateCalc + "%</div></td><td><div id='radarrate' class='txt'>" + $RadarRate + "%</div></td></tr></table>"

$("#boxdiv").append( $RateShow);

var $RateComment

if($RateCalc == $RadarRate){
	$RateComment = "Match!"
	$(".rate td").css({"background":"green","color":"white"});
}
else if($RateCalc < $RadarRate){
	$RateComment = "Rate<br>Too HIGH!"
	$(".rate td").css({"background":"gray","color":"white"});
	$("#radarrate").parent().css({"background":"red","color":"white"});	
}
else if($RateCalc > $RadarRate){
	$RateComment = "Rate<br>Too LOW!"
	$(".rate td").css({"background":"gray","color":"white"});
	$("#radarrate").parent().css({"background":"red","color":"white"});	
}

$("#ratecomment").append($RateComment);


// FORMAT ALL THE CELLS

$(".padded td").css("padding","5px");
$("#boxdiv").children("table").css("display","inline-block");


// == THIS IS THE LAST CARROT!
// == THIS IS THE LAST CARROT!
// == THIS IS THE LAST CARROT!


}

// == THIS IS THE LAST CARROT!
// == THIS IS THE LAST CARROT!
// == THIS IS THE LAST CARROT!


/*
==================================================================================================
												END ENHANCEMENT
==================================================================================================
*/









var $currentdown;
var $holddown;
var $toggledown = false;

var $calcID =  $("#Form1").attr("action").split("=")[1].split("&")[0] ;


// ADD FLOATERS

$("body").append("<div id='floater' title='Edit Shipping Details'>Edit Shipping Details</div>");
$("body").append("<div id='floater2' title='Tracking Results'>Tracking Results</div>");


// find out if there is only one page
var $pageToggle

if( $("#body_GridView1 tr:last-of-type").css("background-color") == "rgb(102, 102, 102)" ){
	$pageToggle = ", :last-of-type"
}
else{
	$pageToggle = ""
}


// Compliance Report
$("#body_GridView1 tr").not(':first'+$pageToggle).click(
  function () {

 
	// check if this is the current row and initiate hide
	var $olddown = $currentdown;
	$currentdown = $(this).index();
	if($olddown == $currentdown && $toggledown == true){ // same row, hide the slideout
		$("#slideholder").animate({height: "0px"}, 250, function() {
			$(".slideout").remove();
		});
		$toggledown = false;
	}
	else {  // it is a new row

		$currentdown = $(this).index();
		// the index is increased by one because the old flyout is still visible
		if($holddown < $currentdown && $toggledown == true) $currentdown = $currentdown - 1;

		var $DetailLink = $(this).children("td:eq(0)").children("a").attr("href") ;
		$DetailLink = $DetailLink + "&CalculationID="+$calcID;
		
		$newold = $holddown+1;
		
		var flyOut = function() {
		
			$("#floater").dialog().dialog("close"); // seriously? this is what works?
			$("#body_GridView1 tr:eq("+$currentdown+")").after("<tr class='slideout'><td colspan='18'><div id='slideholder'><div id='slideloader'></div></div></td></tr>");
			$("#slideholder").css({"height":"0px", "overflow-y":"scroll","border":"solid 1px #e3eaeb"});
			$("#slideloader").append("<center><img src='"+ $myLoader[ Math.floor((Math.random()*$myLoader.length)) ] +"'></center>");
			$("#slideholder").animate({height: "26px"}, 100);
					
			var $loader;
			$("#slideloader").load( $DetailLink + " .bodytable>table", function() {
				enhanceAudit();
				$("#slideholder").animate({height: "120px"}, 150);
			});
		};
		
		if($toggledown == true) {
		$("#slideholder").animate({height: "0px"}, 250, function() {	
				$("#body_GridView1 tr:eq("+$newold+")").remove();
				flyOut();
			});
		}
		else
		{
				flyOut();
		}
		
		$toggledown = true;
		$holddown = $currentdown;
	}
}).css("cursor","pointer");
 
 // remove the click event from the comment field
 $("#body_GridView1 tr").not(':first, :last-of-type').children("td:last-of-type").click(function( event ) {
	event.stopPropagation();
});
// and the error field
 $("#body_GridView1 tr").not(':first, :last-of-type').children("td:eq(16)").click(function( event ) {
	event.stopPropagation();
});
// and the details button
 $("#body_GridView1 tr").not(':first, :last-of-type').children("td:first").click(function( event ) {
	event.stopPropagation();
});