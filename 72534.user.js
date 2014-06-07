// ==UserScript==
// @name              Show Pitchfork Ratings for Albums
// @version           1.08
// @namespace         http://pitchfork.com/
// @include           http://www.pitchforkmedia.com/*
// @include           http://pitchforkmedia.com/*
// @include           http://www.pitchfork.com/*
// @include           http://pitchfork.com/*
// @require           http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @description       This is now a fairly heavily modified version of http://userscripts.org/scripts/show/49052 updated so it gets albums and retries when an album rating is not available
// ==/UserScript==

debugmode = false;

var GM_log = (unsafeWindow.console && debugmode === true) ? unsafeWindow.console.log : function(){};

var styles = 'span.rating {font-size: 12pt; background:white; position:absolute; display:block;width:30px; height:15px; padding:5px 0 10px 5px; top:0px;z-index:2; font-weight:bold;}.orange{color:orange} .green{color:green}.red{color:red}',
    initloc = window.location.href,
    firstrun = true;

var loccheck = setInterval(checkLoc, 300);

function getLinks(mylinks, counter){
    mylinks = mylinks || '';
    counter = counter || 0;
    GM_xmlhttpRequest({
      method: 'GET',
      url: location.protocol + '//' + location.host + mylinks,
      onload: function(data){
        try {
          GM_log(data);
          var rating = $(data.responseText).find("span.score").html();
          rating = (rating.indexOf( "." ) > -1 ) ? rating : (rating + ".0");
          GM_log(rating);
          if (isNaN(rating)){
            if (counter < 5){
              setTimeout(getLinks(mylinks, counter+1), 2000);
              return;
            }
            else {
              rating = '?';
            }
          }
          if (rating > 5.0 && rating <= 6.9){
            spanclass = "orange";  
          } 
          else if (rating  > 6.9 ){
            spanclass = "green";
          } 
          else {
            spanclass = "red";
          }
          $('a[href="'+mylinks+'"]').append('<span class="rating '+ spanclass +'">' + rating + '</span>');
        }

        catch (e) {
          GM_log(e);
        }
      }
    });
}

function checkLoc() {
  if (loc = window.location.href) {
    // Only do something if the location has changed and it is an album review listing
    if ((firstrun || loc != initloc) && window.location.href.match(/\/reviews\/albums\//)) {
      GM_addStyle(styles);
      GM_log("Location: " + loc + '\n' + "Initial loc: " + initloc + '\n' + "First run: " + firstrun);
      firstrun = false;
      setTimeout(function(){
          var review_lists = $(".object-grid");
          $(".object-grid a[href*='reviews/albums']").each(function(){
            myhref = $(this).attr('href');
            getLinks(myhref);
          });
      }, 1000);
    }
  }
  initloc = window.location.href;
}