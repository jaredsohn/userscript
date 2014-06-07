// ==UserScript==
// @name           GMail toggle searchbar area
// @namespace      http://microft.org
// @include        http://mail.google.com/mail*
// @include        https://mail.google.com/mail*
// ==/UserScript==
//
var GM_JQ = document.createElement('script');  
//GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';  
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.1.4.pack.js';  
GM_JQ.type = 'text/javascript';  
document.getElementsByTagName('head')[0].appendChild(GM_JQ);  
// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    window.setTimeout(GM_wait,100); 
  }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

  // search bar area
  //GM_addStyle(".aC .nH .nH .no .nH .nH .no .nn { display: none !important }")

  // GMail logo
  //GM_addStyle(".aC .nH .nH .no .nH .nH .no .nn .a9 { display: none !important }")
  // logo title
  //GM_addStyle(".aC .nH .nH .no .nH .nH .no .nn .ce { display: none !important }")
    
  $('.aC .nH .nH .no .nH .nH .no ').hide();
  //$('.aC .nH .nH .no .nH .nH .no ').slideDown('slow');

  var old = $('.aC .nH .nH .qp #gbar').attr("innerHTML");
  var button = '<span id="toggleSearch" class="showSearch">show search</span>';
  $('.aC .nH .nH .qp #gbar').attr("innerHTML", old + button);

  GM_addStyle("#toggleSearch { font-weight: bold; font-size:120%; color: white; } #toggleSearch:hover { cursor:pointer; }")

  $('#toggleSearch').click( function() {
          if (this.className == 'showSearch'){
            $('.aC .nH .nH .no .nH .nH .no').slideDown('slow');
            this.className = 'hideSearch';
            this.innerHTML = 'hide search';
          }
          else {
            $('.aC .nH .nH .no .nH .nH .no').slideUp('slow');
            this.className = 'showSearch';
            this.innerHTML = 'show search';
          }

    }        
  )

}



