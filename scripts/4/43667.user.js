// ==UserScript==
// @name           OkCupid activity type toggles on root page
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Adds little checkboxes to all the activity types on the OkCupid home page for insta-filtering the view as you prefer it.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://www.okcupid.com/home*
// ==/UserScript==

GM_addStyle(<><![CDATA[
#activity_filters input[type="checkbox"] {
  position: absolute;
  margin: 6px 0 0 7px;
}
]]></>.toXMLString());

var hidden = eval(GM_getValue("hidden", '({})')); // config values (0||1)
var check = {}; // all checkboxes, also indexed on types
var types = $x('id("activity_filters")/*[starts-with(@id,"opt_")]/a').map(hack);
filter_view();

function hack(a, nth) {
  var type = a.parentNode.id.replace(/^opt_/, "");
  var input = check[type] = node({ before:a, tag: <input type="checkbox"/> });
  input.addEventListener("click", toggle, true);
  if (nth)
    a.style.backgroundPosition = "66% 50%";
  else
    a.style.paddingLeft = "10px";
  input.checked = !hidden[type];
  input.title = a.title;
  return type;
}

function filter_view() {
  function filter(node) {
    var span = $X('.//*[starts-with(@class,"activity_type ")]', node);
    var type = span && span.className.split(" ")[1];
    //console.info("%x: %s %x", type && !hidden[type], type, node);
    if (type)
      node.style.display = hidden[type] ? "none" : "";
  }
  var all = $x('id("activity_wrapper")/*[contains(@class,"event_item")]');
  all.forEach(filter);
  GM_setValue("hidden", hidden.toSource());
}

function is_hidden(a) {
  return hidden[a] || 0;
}

function is(something) {
  return function(test) {
    return test === something;
  };
}

function toggle(e) {
  var type = $X('ancestor::*[@id][1]', e.target).id.replace(/^opt_/, "");
  var to = hidden[type] = 1 - (hidden[type] || 0);
  //console.log("clicked %x: now %x", type, to);
  if ("all" == type) types.slice(1).forEach(function(other) {
    check[other].checked = !to;
    hidden[other] = to;
  }); else if (types.slice(1).map(is_hidden).every(is(to))) { // all (un)checked
    check.all.checked = !to;
    hidden.all = to;
  } else { // some checked, others not
    check.all.checked = false;
    hidden.all = 1;
  }
  filter_view();
}
