// ==UserScript==
// @name        GreenPageResults
// @namespace   http://userscripts.org/users/novagenesis
// @include     http://trac/cgi-bin/trac_data.cgi?*
// @grant       GM_addStyle
// @version     1
// ==/UserScript==
//

//ID 	Date Due 	Priority 	Owner 	Summary 	Reporter 	Q.A. 	Date Opened 	Milestone 	Version
/*
  var COLS = {
  ID: 1,
  DATE_DUE: 2,
  PRIORITY: 3,
  OWNER: 4,
  SUMMARY: 5,
  REPORTER: 6,
  QA: 7,
  DATE_OPENED: 8,
  MILESTONE: 9,
  VERSION: 10
};
*/

GM_addStyle(
    "body { color: black; background-color: #dddddd; } \
     h1 { color: black; } ");
GM_addStyle(
     "table { width: 1400px; } \
     thead tr td { color: black; } \
     tbody tr td { padding: 1px 6px; border: 1px solid black; } \
     tbody tr td:nth-child(1) { width: 24px; }                  \
     tbody tr td:nth-child(2) { width: 68px; }                  \
     tbody tr td:nth-child(3) { width: 80px; }                  \
     tbody tr td:nth-child(4) { width: 190px; }                 \
     tbody tr td:nth-child(5) { max-width: 275px; width: 275px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 85%;  }                 \
     tbody tr td:nth-child(6) { width: 200px; }                 \
     tbody tr td:nth-child(7) { width: 138px; }                 \
     tbody tr td:nth-child(8) { width: 68px; }                  \
     tbody tr td:nth-child(9) { width: 150px; max-width:150px; overflow: hidden; text-overflow: ellipsis: white-space: nowrap }                 \
     tbody tr td:nth-child(10) { width: 40px; }                 "
);
GM_addStyle(
".muted { color: #666; }"
);

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



// the guts of this userscript
function main() {

  idleTime = 0;
  $(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(function() { 
      idleTime = idleTime + 1;
      if (idleTime > 120) { // 2 minutes
        window.location.reload();
      } 
    }
    , 1000); // 1 second

    //Zero the idle timer on mouse movement.
    $(this).scroll(function (e) {
      idleTime = 0;
    });
    $(this).mousedown(function (e) {
      idleTime = 0;
    });
    $(this).keypress(function (e) {
      idleTime = 0;
    });
  });












  $('table').removeAttr('cellpadding');
  $('table').removeAttr('cellspacing');
  
  //result-style
  $('table tbody tr').each(function(i,e) {
    var notmine = ["Move to Prod","Sent To QA","In Production","In Demo","In Staging"];
    var qa = $(e).children('td:nth-child(7)').text();
    if($.inArray(qa,notmine)+1) {
      //Just grey everything
      $(e).addClass('muted');
    }
  });

  var addTitle = function(d) {
    var dt = $(d).text();
    d.attr('title',dt);
  }

  //all table row magic
  $('table thead tr').each(function(i,e) {
    $(e).children('td:nth-child(7)').text("Status");
    $(e).children('td:nth-child(8)').text("Opened");
  });
  $('table tbody tr').each(function(i,e) {
    addTitle($(e).children('td:nth-child(4)'));
    addTitle($(e).children('td:nth-child(5)'));
    addTitle($(e).children('td:nth-child(6)'));
    addTitle($(e).children('td:nth-child(9)'));
  });
  
  //Hide muted by default
  $('h1').first().after('<div><a id="toggle-muted" href="#">Show Muted</a></div>');

  //Rollup mute

  $('table').each(function(i,t) {
    if($(t).children('tbody').children('tr').not('.muted').length===0 ) {
      //double-negative; all muted
      $(t).addClass('muted');
    }
  });

  var muted_hidden = 0;
  var toggleMuted = function() {
    if(muted_hidden) { 
      muted_hidden = 0;
      $('.muted').show();
      $('table.muted').prev().show();
      $('a#toggle-muted').text("Hide Muted");      
    } 
    else {
      muted_hidden = 1;
      $('.muted').hide();
      $('table.muted').prev().hide();
      $('a#toggle-muted').text("Show Muted");
    }
  };

  $('a#toggle-muted').click(function() {
    toggleMuted();
  });
  toggleMuted();

}

// load jQuery and execute the main function
addJQuery(main);
