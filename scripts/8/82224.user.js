// ==UserScript==
// @name           Favstar Tally by @paul_shinn
// @description    A script that allows a user to tally the people shown on a favstar.fm page.
//
// @include        http://favstar.fm/*
//
// @version        1.00
//
// @history        1.00 Initial Translation from Bookmarklet
// ==/UserScript==

(function() {
// These are Prototype.js Snares.
var $$ = null;
try{$$ = unsafeWindow.$$;}catch(e){};
if($$===null){return;} // No Prototype? Die quietly.
var $A = null;
try{$A = unsafeWindow.$A;}catch(e){};
if($A===null){return;} // No Prototype.Array? Die quietly.
var $H = null;
try{$H = unsafeWindow.$H;}catch(e){};
if($H===null){return;} // No Prototype.Hash? Die quietly.

var _fn_load_favstars_tally = function() {
  //// BEGIN _fn_load_favstars_tally
  // Can't use new Hash() in greasemonkey... /*fuuuuuuuuuuuuuuuuuuuuuuu.*/
  var _tmp_favstar_tally = $H(new Object());

  $$('div.avatarList a.avatar').map(
      function(e) {
        var lookup = _tmp_favstar_tally.get(e.title);
        if(lookup === undefined)
        {
          var image = e.childElements()[0];
          lookup = {
            instanceName: e.title,
            instanceCount: 1,
            imageUrl: image.src
            };
          _tmp_favstar_tally.set(e.title, lookup);
        }
        else
        {
          lookup.instanceCount = lookup.instanceCount + 1;
        }
      });

  var results = $A(_tmp_favstar_tally.values()).sortBy(function(i){return i.instanceCount;}).reverse(true);

  var output = $$('#favstarTallyResults')[0];
  output.innerHTML = '';
  output.insert("<div class='clear' />");
  $A(results).each(
    function(j){
      output.insert("<div class='tweeter_holder'><a class='square' title='" + j.instanceName + "' href='/users/" + j.instanceName + "'><img src='" + j.imageUrl + "' width='48' height='48' /></a><div class='favouritesCount favs'>" + j.instanceCount + "</div></div>");
    });
  output.insert("<div class='clear' />");
  $$('#favstarTallyResults')[0].show();
  $$('#showFavstarStarTally')[0].innerHTML = "(Refresh)&#160;";
  $$('#toggleFavstarStarTally')[0].show();
  return false;
  //// END _fn_load_favstars_tally
  };
  
var _toggle_first_favstars_tally = false;
var _fn_collapse_first_favstars_tally = function(){
    if(_toggle_first_favstars_tally === true)
    {
      $$('#favstarTallyResults')[0].show();
      _toggle_first_favstars_tally = false;
      $$('#showFavstarStarTally')[0].show();
      $$('#toggleFavstarStarTally')[0].innerHTML = "(Collapse)";
    }
    else    
    {
      $$('#favstarTallyResults')[0].hide();
      _toggle_first_favstars_tally = true;
      $$('#showFavstarStarTally')[0].hide();
      $$('#toggleFavstarStarTally')[0].innerHTML = "(Expand)";
    }
  };

if($$('#favstarTallyResults').length == 0)
{
  if($$('div#nowShowing').length == 0){return;}
  // CSS Hackery - Fix too much headroom, since original context uses a lead-in gap. Fix margins that leak, preventing the header from standing alone. Fix font sizes and colors for links.
  $$('div#nowShowing')[0].insert({after: "<span><div id='FavstarTallyContainer' class='avatarListContainer' style='margin-top: 10px !important; padding-bottom: 0px !important;'><div id='pivotheader' class='avatarListTitleContainer'><h1 id='favstarTallyTitle'>Favstar Tally&#160;</h1><div class='clear' /></div></div><div id='favstarTallyResults' class='top_tweeters_holder' style='padding-top: 4px !important;' /></div><div class='clear' /></span>"});
  // Can't use new Element() in greasemonkey... /*fuuuuuuuuuuuuuuuuuuuuuuu.*/
  $$('#favstarTallyTitle')[0].insert("<a id='showFavstarStarTally' style='font-size: 16px !important; font-weight: normal !important; color: #0000FF !important;'>(Show)&#160;</a>");
  $$('#favstarTallyTitle')[0].insert("<a id='toggleFavstarStarTally' style='font-size: 16px !important; font-weight: normal !important; color: #0000FF !important;'>(Collapse)&#160;</a>");
  $$('#showFavstarStarTally')[0].observe('click', _fn_load_favstars_tally);
  $$('#toggleFavstarStarTally')[0].observe('click', _fn_collapse_first_favstars_tally).hide();
  
  $$('#favstarTallyResults')[0].hide();
}
})();