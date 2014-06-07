// ==UserScript==
// @name           oplcolor
// @namespace      tag:barryfriedman@emax.ca,2009-04-27:oplcolor.
// @include        http://catalogue.biblioottawalibrary.ca/checkedout
// @description    Sort/color Ottawa Public Library info
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
      var starthere = $("span.value.coming_due");
      myToday   =  new Date();
      myTodayms =  myToday.valueOf();
      $(starthere).each(function () {
                          var myelem =    $(this);       
                          var mytext =    myelem.text();                    
                          var myDueDate = Date.parse(mytext);
                          var myDays    = Math.floor((myDueDate - myTodayms)/86400000);
                          //                         debugger;
                          var myFlag    = "#00BF13";
                          if ( myDays < 3 ) myFlag = "#FF4B4B";
                          else if (myDays < 6 ) myFlag = "#FFF36F";
                          myelem.css("color",myFlag);
                        });
    }

