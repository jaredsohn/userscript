// ==UserScript==
// @name          25SatangAutoBid
// @namespace     www.dogameok.com
// @description   use for autobid in website http://www.25satang.com
// @version       1.0.3
// @include       http://www.25satang.com/*
// ==/UserScript==

(function() {
  function autoBidTimeLeft(){

		if(document.getElementById("timer")!= null){
			var timeleft = document.getElementById("timer").firstChild.innerHTML; //time 00:00:00						
			
			var hour = parseInt(timeleft.split(":")[0]);
			var minute = parseInt(timeleft.split(":")[1]);
			var second = parseInt(timeleft.split(":")[2]);
			
			if(hour <= 0 && minute <=0 && second <= 5){
				bid();				
				window.clearInterval(intervalID);
			}else{
				
			}
			
		}

  }

  // ---------------------------
  // normal flow
  // ---------------------------

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);

   //autoBidTimeLeft();
   var timeoutID = window.setInterval(function(){autoBidTimeLeft();}, 1000);



	


	
})();