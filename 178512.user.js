// ==UserScript==
// @name		JustDice Keyboard Customization
// @namespace   none
// @author      vongesell@gmail.com
// @version     0.2
// @include     https://just-dice.com/*
// @grant       none
// ==/UserScript==
 
/* 
  Many thanks to Gray for the Margingale bot used as a bases.
**/

$('<script>').attr({
	src: 'http://d3js.org/d3.v3.min.js',
	charset: 'UTF-8'
}).appendTo(document.body);


$(function() {
	var markup = ' \
<div class="userkeys"> \
  <fieldset> \
    <div class="row"> \
      <p class="llabel">1</p><input id="key_1" value="0.0001" /> \
      <p class="rlabel">BTC bet</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">2</p><input id="key_2" value="1.0" /> \
      <p class="rlabel">BTC</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">3</p><input id="key_3" value="2.5" /> \
      <p class="rlabel">BTC</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">4</p><input id="key_4" value="5.0" /> \
      <p class="rlabel">BTC</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">5</p><input id="key_5" value="10.0" /> \
      <p class="rlabel">BTC</p> \
    </div> \
  </fieldset> \
  <fieldset> \
    <div class="row"> \
      <p class="llabel">6</p><input id="key_6" value="45.9" /> \
      <p class="rlabel">% chance</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">7</p><input id="key_7" value="50.0" /> \
      <p class="rlabel">%</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">8</p><input id="key_8" value="40.0" /> \
      <p class="rlabel">%</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">9</p><input id="key_9" value="75.0" /> \
      <p class="rlabel">%</p> \
    </div> \
    <div class="row"> \
      <p class="llabel">0</p><input id="key_10" value="99.0" /> \
      <p class="rlabel">%</p> \
    </div> \
  </fieldset> \
</div> \
  <div class="clear"></div>vongesell@gmail.com <p>Keys 1-5 modify the bet to value of input box<br>6-0 modify chance. \
';
	$panelWrapper = $('<div>').attr('id','userkeys').css({display: 'none'}).insertAfter('#faq'),
	$panel = $('<div>').addClass('panel').append(markup).appendTo($panelWrapper);
    var where = $(".userkeys input").add(document);

    function userkey_change_chance(key) {
    	set_chance($('#key_'+key).val());
    }
    function userkey_change_bet(key) {
	    $("#pct_bet").val($('#key_'+key).val());
    }
    function userkey_bind(key, binding) {
        where.bind("keypress", key, function () {
            if (!global_bindings_enabled()) return;
            binding(key);
            return false
        })
    }
    var userkeybindings = {
        1: userkey_change_bet,
        2: userkey_change_bet,
        3: userkey_change_bet,
        4: userkey_change_bet,
        5: userkey_change_bet,
        6: userkey_change_chance,
        7: userkey_change_chance,
        8: userkey_change_chance,
        9: userkey_change_chance,
        0: userkey_change_chance
    };
    for (var key in userkeybindings) userkey_bind(key, userkeybindings[key]);

	// Lastly add the tab
	$('<li>').append($('<a>').text('Keys').attr('href','#userkeys')).appendTo('.tabs');

});