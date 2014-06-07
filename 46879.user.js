// ==UserScript==
// @name           Taha
// @namespace      GLB
// @include        http://connect.in.com/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
      //  alert($); // check if the dollar (jquery) function works
	  /*
	  function Func1(){
	 //  $("div [class='FL MR10'] a:first-child").click();
	 alert("SS");
	   }
	  for(i=1;i<1000;i++)
	  {
	  setTimeout("Func1()", 5000);
	  //alert("SS");
	// alert($("a [onclick*='votewiki']").attr("href"));
	 // alert($("div [class='FL MR10']").html());
	
	  }
	  */
	    
  //alert (dataString);return false;
  
  
  for(i=1;i<1000000;i++)
  {
  var dataString = 'autono=0&entityid=270&source_site=WEB18WIKI&vote=up';
  var response = $.ajax({
    type: "POST",
    url: "/profile/Rajinikanth/270",
    data: dataString,
    async: false
  }).responseText;
  

  
  /*
  var sourav = 'autono=0&entityid=801&source_site=WEB18WIKI&vote=up';
  $.ajax({
    type: "POST",
    url: "/profile/Sourav_Ganguly/801",
    data: sourav,
    success: function() {
    }
  });
  //return false;
  */
  }
	  
	  
    }
