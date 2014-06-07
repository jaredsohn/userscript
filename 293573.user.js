// ==UserScript==
// @name        Cookie Clicker Number Formatter
// @namespace   http://userscripts.org/users/423875
// @description Formats cookie clicker numbers in your choice of 5 different formats (more coming).
// @include     http://orteil.dashnet.org/cookieclicker/*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @version     1.1
// @grant       none
// ==/UserScript==

var number_names = ("m b tr quadr quint sext sept oct non dec undec duodec " +
  "tredec quattuordec quinquadec sedec septendec octodec novendec vigint " +
  "unvigint duovigint tresvigint quattuorvigint quinquavigint sesvigint " +
  "septemvigint octovigint novemvigint trigint untrigint duotrigint " +
  "trestrigint quatteortrigint quinquatrigint sestrigint septentrigint " +
  "octotrigint noventrigint quadragint").split(" ");

var cm_names = ("K M B T Qa Qi Sx Sp Oc No Dc").split(" ");

var get10power = function(num) {
  //because javascript can't do log correctly.
  return Math.floor(num).toString().length - 1;
}

var get10_xpower = function(num, mul) {
  return Math.floor(get10power(num)/mul)*mul
}

var formatnum = function(num, manlen, pow, suffix) {
  return (Math.floor(num / Math.pow(10, pow - manlen)) / Math.pow(10, manlen)) + suffix;
}

var expnotation = function(num, manlen, pow) {
  return formatnum(num, manlen, pow, pow != 0 ? "x10^" + pow : "");
}

// define the number formats, and allow for others to be added
window.numberformats = window.numberformats || {};
window.numberformats.commify = function(num, manlen) {
  var manpow = Math.pow(10, manlen);
  return (Math.round(num*manpow)/manpow).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
window.numberformats.scientific = function(num, manlen) {
  return expnotation(num, manlen, get10power(num));
};
window.numberformats.engineering = function(num, manlen) {
  return expnotation(num, manlen, get10_xpower(num, 3));
};
window.numberformats.short = function(num, manlen) {
  var pow = get10_xpower(num, 3);
  return formatnum(num, manlen, pow, pow == 0 ? "" : " " + 
    (pow == 3 ? "thousand" : number_names[(pow / 3) - 2] + "illion"));
};
window.numberformats["Cookie Monster"] = function(num, manlen) {
  var pow = get10_xpower(num, 3);
  return formatnum(num, manlen, pow, pow == 0 ? "" : " " +
    cm_names[(pow / 3) - 1]);
};

window.Beautify2 = function(num, manlen, format) {
  return numberformats[format == null ? localStorage.numberformat : format]
    (num, manlen == null ? parseInt(localStorage.fraclen.replace(/\D+/, '')) : manlen);
}

// make all numbers obey the decimal length
window.Beautify = function(num, manlen, format) {
  return Beautify2(num, null, format);
}

// initialize options with default values.
localStorage.numberformat = localStorage.numberformat || "commify";
localStorage.fraclen = localStorage.fraclen == null ? 2 : localStorage.fraclen;

var oldinit = Game.Init;
Game.Init = function() { oldinit();
//cross-browser jQuery loader junk.
//NOTE: the following code is executed in it's own context, separate of above code.
  (function(d){if("function"!==typeof jQuery){var c=document,e=c.getElementsByTagName("head")[0]||c.body||c.documentElement,b=c.createElement("script");b.src="http://code.jquery.com/jquery-2.1.0.min.js";b.addEventListener("load",function(){var b=c.createElement("script");b.textContent="("+d.toString()+")(jQuery.noConflict(true));";e.appendChild(b)},!1);e.appendChild(b)}else d(jQuery)})(function($) {
    console.log("foo");
    $(function() { 
    
      var updatecosts = function() {
        window.Game.RefreshBuildings();
        window.Game.upgradesToRebuild = 1;
        window.Game.UpdateMenu();
      }
      
      var oldupdatemenu = Game.UpdateMenu;
      Game.UpdateMenu = function() {
        oldupdatemenu();
        if (Game.onMenu == "prefs") {
          var i = 0, c = Game.cookies, lastdiv = $("#menu .subsection div:last");
          $('<div class="title">Number Format</div>')
          .add($('<div class="listing">')
          .append($('<input type="number" min="0" step="1" size="2" value="' + localStorage.fraclen + '">')
          .change(function() {
            localStorage.fraclen = this.value; updatecosts();
          })).append($('<a class="option">▲</a>').click(function() {
            localStorage.fraclen++; updatecosts();
          })).append($('<a class="option">▼</a>').click(function() {
            localStorage.fraclen--; updatecosts();
          })).append("<label>Digits after decimal point.</label>")).insertBefore(lastdiv);
          $.map(numberformats, function(val, key) {
            return $('<div class="listing"><label>' + key[0].toUpperCase() + key.slice(1) + " (" + Beautify2(c, null, key) + ")</label></div>")
            .prepend($('<a class="option">' + (localStorage.numberformat == key ? "☑" : "☐") + "</a>")
            .click(function() {
              localStorage.numberformat = key; updatecosts();
            })).insertBefore(lastdiv);
          });
        }
      };
      
      updatecosts();
    });
  });
}