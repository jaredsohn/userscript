// ==UserScript==
// @name       Ingress Passcode Submitter
// @version    20130902.2
// @description  Lets you submit passcodes on Intel Map. 
// @include     http://www.ingress.com/intel*
// @include     https://www.ingress.com/intel*
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant		GM_setValue
// @grant		GM_getResourceText
// @grant		GM_info
// jQuery:
// @require		https://userscripts.org/scripts/source/138310.user.js
// @run-at		document-start
// @copyright  2013+, Umer Salman
// ==/UserScript==

// Input 41
function ld() {
}
ld.prototype.Wd = function(a) {
  var b = a.result;
  document.getElementById("redeem_results").style.display = "inline";
  document.getElementById("redeem_error").innerHTML = b ? "" : md(a);
  var a = b ? b.apAward : 0, c = b ? b.xmAward : 0, b = nb((b ? b.inventoryAward : []) || [], function(a) {
    var b = a[2], c, d;
    "modResource" in b ? d = b.modResource : "resourceWithLevels" in b ? d = b.resourceWithLevels : "resource" in b && (d = b.resource);
    "resourceType" in d && (c = d.resourceType);
    "flipCard" in b && c && (c += ":" + b.flipCard.flipCardType);
    c && c in hd ? (b = {}, "stats" in d && (b = d.stats), a = new gd(a[0], c, b)) : a = l;
    return a;
  }), d = jd(kd(b));
  a > 0 && b.push("" + a + " AP");
  c > 0 && b.push("" + c + " XM");
  d.length > 0 && b.push(d);
  a = document.getElementById("redeemed_rewards");
  b.length > 0 ? (a.innerHTML = 'Passcode confirmed. Gained:<br /><span class="color_cyan">' + b.join("<br />") + "</span>", _gaq.push(["_trackEvent", "Action", "Passcode accepted"])) : a.innerHTML = "";
};
function md(a) {
  return a.respStatus == 429 ? "Passcode circuitry too hot. Wait for cool down to enter another passcode." : (a = a.error) ? a == "INVALID_PASSCODE" ? "The passcode entered was invalid." : a == "ALREADY_REDEEMED_BY_PLAYER" ? "You have already used the passcode entered." : a == "ALREADY_REDEEMED" ? "The passcode entered was already redeemed." : a == "INVENTORY_FULL" ? "Error redeeming passcode. Inventory limit reached." : "The passcode entered cannot be redeemed." : "";
}
ld.prototype.qc = function(a) {
  kc(this.kc, "show_box", a);
};
ld.prototype.Qe = function() {
  lc(this.kc, "show_box");
};
function Re(a) {
  a = Ue(a);
  if(a === 0) {
    return 1;
  }else {
    for(var b = 0;b < 7;b++) {
      if(a < Oe[b]) {
        return b + 1;
      }
    }
    return 8;
  }
w("redeem", function() {
  var a = document.getElementById("passcode"), b = a.value;
  wf(xf.f());
  if(!/^[\s\xa0]*$/.test(b)) {
    var c = xf.f();
    document.getElementById("redeem_results");
    document.getElementById("redeem_error").innerHTML = "";
    document.getElementById("redeemed_rewards").innerHTML = "";
    c = u(c.jc.Wd, c.jc);
    R.f().M.na("dashboard.redeemReward", {passcode:b}, c, i, c);
  }
  a.value = "";
  _gaq.push(["_trackEvent", "Action", "Passcode attempt"]);
});
w("initialize", function(a) {
  var b = xf.f();
  a || ri(u(b.Ge, b));
  ui(b, a);
  b.Eb = v();
});
w("stop", function(a) {
  a.stopPropagation();
});
function ti() {
  F(Cc(document.getElementById("header")), function(a) {
    hc(a, "show_box");
  });
  F(Cc(document.getElementById("nav")), function(a) {
    hc(a, "show_box");
  });
}
w("sbox", function(a) {
  var b = a.currentTarget;
  E(ec(b), "show_box") >= 0 || (ti(), a.stopPropagation(), fc(b, "show_box")); });

}

$(function(){
	$("#header").append("<button id=pass value=a>Enter Passcodes</button>");
	$("#pass").click(function() {$("#enterpass").toggle();});
	$("body").append("<div class=closeable_window id=enterpass style='display:none;'><input id=passcode></input><div id=redeem_results>wh</div><div id=redeem_error></div><div id=redeemed_rewards></div></div>");
  });