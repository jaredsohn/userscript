// ==UserScript==
// @name           Fantrax Enhancer
// @namespace      http://greenlightgo.com/
// @description    Makes Fantrax better
// @match        http://*.fantrax.com/playerProfile.go?*
// ==/UserScript==

function fe_init() {
    opener.name='openerwindow';
    jQuery.extend({
      parseQuerystring: function(){
        var nvpair = {};
        var qs = window.location.search.replace('?', '');
        var pairs = qs.split('&');
        $.each(pairs, function(i, v){
          var pair = v.split('=');
          nvpair[pair[0]] = pair[1];
        });
        return nvpair;
      }
    });
    
    qs = $.parseQuerystring();
    tradeEl = $('.profileStatsTable.fantraxStats').last().children(":last").children(":last").children(":first");
    tradeEl.html(tradeEl.html() + "<a href=\"http://www.fantrax.com/fantasy/trade.go?leagueId=" + qs["leagueId"] + "&type=trade&scorerId=" + qs["pId"] + "\" target=\"openerwindow\"><img src=\"http://img.fantrax.com/icons/trade.png\"></a>");
    $('td[title="Free Agent"]').html("Free Agent <a href=\"http://www.fantrax.com/fantasy/claimDrop.go?leagueId=" + qs["leagueId"] + "&type=claim&scorerId=" + qs["pId"] + "\" target=\"openerwindow\"><img src=\"http://img.fantrax.com/icons/claim.png\"></a>");
    $('td[title="Waiver Wire"]').html("On Waivers <a href=\"http://www.fantrax.com/fantasy/claimDrop.go?leagueId=" + qs["leagueId"] + "&type=claim&scorerId=" + qs["pId"] + "\" target=\"openerwindow\"><img src=\"http://img.fantrax.com/icons/claim.png\"></a>");
}


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(fe_init);
