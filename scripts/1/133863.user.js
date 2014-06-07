// ==UserScript==
// @name        tipsport
// @namespace   cz.betting
// @description Zobrazení otevřených sázek
// @include     http://api.jquery.com/load/
// @version     1
// ==/UserScript==

// v preferences dát do include pages : https://www.tipsport.cz/ViewUsersTicketsPrePopulateAction.do
var $;

// Add jQuery library
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');

            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;

            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

//users code - main function
function letsJQuery(){

  removeSMSColumn();
  removeDecimalDigits();
  arrangeColumnsWidth();
  addTicketDescription();

}

function addTicketDescription(){
  var $references = $(".icoTicketWebtip");

  $references.each(function(index) {

    var $ticket = $(this);
    var allAttributes = $ticket.attr("onclick");
    var referenceAttributes = allAttributes.match(/\(.*\)/)[0];
    referenceAttributes = referenceAttributes.replace(/\'/g, "");
    var ticketUrlAttributes = referenceAttributes.substring(1, referenceAttributes.length-1).split(",");
    $(this).removeClass();

    var host = "https://www.tipsport.cz";
    var servlet = ticketUrlAttributes[0].trim();
    var idu = "idu=" + ticketUrlAttributes[1].trim();
    var idb = "idb=" + ticketUrlAttributes[2].trim();
    var hash = "hash=" + ticketUrlAttributes[3].trim();

    var ticketUrl  = host + servlet + "?" + idu + "&" + idb + "&" + hash;
    $.ajax({
	url: ticketUrl,
	success: function(data) {

	  var $eventName = $(data).find(".colEventName>strong");
	  var allEventNames = "<table id='results' border='1' color='white' align='left'>";
	  $eventName.each(function(i){
	    allEventNames += "<tr id='event_" + index + "_" + i + "'><td class='eventName' align='left'>" + $(this).text() + "</td><td class='eventPrediction' align='left'></td><td class='eventOdd' align='left'></td>";
	  });

	  $ticket.replaceWith("<a href=" + ticketUrl +" target='_blank'>" + allEventNames + "</a>");

	  var $eventPrediction = $(data).find(".colEventName>.tOpportunityName:last-child");
	  $eventPrediction.each(function(i){
	    $("#event_" + index + "_" + i + ">.eventPrediction").text($(this).text());
	  });
	  
	  var $eventPrediction = $(data).find(".colOdd");
	  $eventPrediction.each(function(i){
	    $("#event_" + index + "_" + i + ">.eventOdd").text($(this).text());
	  });
	  
	  var $eventPrediction = $(data).find(".colState");
	  $eventPrediction.each(function(i){
	    
	    var state = $(this).text();
	    var result = "<b> ?</b>";
	    var color = "white";
	    if(state.indexOf("výhra")>-1){
	      result = "<b style='font-weight:800'> &#8746;</b>";
	      var color = "green";
	    } else if (state.indexOf("prohra")>-1){
	      result = "<b> x</b>";
	      var color = "red";
	    }
	    $("#event_" + index + "_" + i + ">.eventOdd").append(result);
	    $("#event_" + index + "_" + i + ">.eventOdd").css("color", color);
	    $("#event_" + index + "_" + i + ">.eventOdd").css("font-weight", "bold");
	    
	  });
	  
	  var $eventPrediction = $(data).find(".colFirst:contains('Celkový kurz')+td");
	  $("#event_" + index + "_0>.eventOdd").after("<td class='totalOdd' align='left' style='font-weight:bold'></td>");
	  $("#event_" + index + "_0>.totalOdd").text($eventPrediction.text());
	  var eventsInAkoCount = $("tr[id^='event_" + index + "']").size();
	  $("#event_" + index + "_0>.totalOdd").attr("rowspan", eventsInAkoCount);
	  
	},
	async: false
    });

  });

}

function removeSMSColumn(){

  $("TH:contains('SMS')").remove();
  $(".colSms").remove();
}

function removeDecimalDigits(){

  var $moneyCell = $("TD.colMoney");

  $moneyCell.each(function(){

      var money = $(this).text();
      if(money.length > 0){


	money = money.substring(0, money.indexOf(","));
	if(money.length>0){
	  money += " Kč";
	}
	$(this).text(money);
      }
  });
}

function arrangeColumnsWidth(){

  $("TH").width("10%");
  $("TH:contains('Tiket')").width("50%");
  $(".colMoney").removeClass();
  $("TH:empty").remove();
  $(".rowTicket>TD:nth-child(5n)").remove();
}