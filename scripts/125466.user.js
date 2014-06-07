// ==UserScript==
// @name           pinnacle
// @namespace      cz.betting
// @description    for better importing graded results
// https://*.pinnaclesports.com/*GradedWagers*
// ==/UserScript==

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

  var pinnacleSportsModifier = {
  
    moveResults: function(){
      
      var results = $("[id^=pitcher]>td:first-child");
      results.each(function(){
	
	var lastTdOnRow =$(this).parent().prev().children("td:last-child");
	$(this).insertAfter(lastTdOnRow);
      });

    
      var togglers = $("[id^=p_toggle]");
      togglers.remove();
    },
    
    removeLineInTd : function(){
      
        var brs = $(".linesTbl tr>td>br");
	brs.replaceWith("; ");
    },
    
    changeToValues : function(){
      
        var numberTd = $("[class^=linesAlt]>td[align]");
	numberTd.each(function(){
	
	  var number = $(this).text().trim();
	  var numberWithComma = number.replace(".", ",");
	  $(this).text(numberWithComma);
	});
    
    
    },
    
    addMyBet: function(){
      
      var match = $(".linesTbl tr>td:nth-child(5)");
      match.each(function(i){
	
	if(i == 0){
	  $("<td>my bet</td>").insertAfter($(this));
	}
	else{
	  
	  var myBetIndex = $(this).html().indexOf("<u>");
	  var dividerIndex = $(this).html().indexOf(" vs ");
	  var myBet = myBetIndex<dividerIndex?1:2;
	  var myBetHtmlText = "<td>" + myBet + "</td>";
	  $(myBetHtmlText).insertAfter($(this));
	}
      });
    }
  
  };
  
  pinnacleSportsModifier.moveResults();
  pinnacleSportsModifier.removeLineInTd();
  pinnacleSportsModifier.changeToValues();
  pinnacleSportsModifier.addMyBet();
}