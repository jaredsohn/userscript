// ==UserScript==
// @name           Kingdom of Loathing UI smoother
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Puts actions in a constant position in the page (less mouse chasing for the action link), adds KoL wiki links to idem, place and effect names and gives soft green echo eyedrop antidote "undo" links when new effects are acquired.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://kol.coldfront.net/thekolwiki/index.php*
// @include        http://www*.kingdomofloathing.com/*.php
// ==/UserScript==

var kol_wiki = "http://kol.coldfront.net/thekolwiki/index.php/";
var debug = !!this.kol_wiki;
XML.setSettings({
  ignoreProcessingInstructions: false,
  ignoreWhitespace: false,
  ignoreComments: false,
  prettyPrinting: false, prettyIndent: 2
});

function default_handler() {
  $x('//b[../preceding-sibling::td/img[starts-with(@onclick,"eff")]]')
    .forEach(add_uneffect_link);
  $x('//b[../preceding-sibling::td[1]/img]').forEach(link_kol_wiki);
  move_actions_to_bottom();
  var back = $X('(//a)[last()][contains(.,"ack to ")]');
  if (back) {
    var place = /ack to (.*)/.exec(back.textContent)[1];
    node({ after: back, tag: <> [{ make_wiki_link(place, "wiki") }]</> });
  }
}

function add_uneffect_link(b) {
  var name = encodeURIComponent(b.textContent);
  node({ after: b, tag: <> [<a href={"/uneffect.php#"+ name}>undo</a>]</> });
}

function uneffect_handler() {
  var effect = decodeURIComponent(location.hash || "#").slice(1);
  if (effect) {
    var radio = $X('//input[@name="whicheffect"][../following-sibling::td[' +
                   'starts-with(.,"'+ effect +'")]]');
    if (radio) radio.checked = true;
  }
}

// put actions in a constant position in the page, to relieve excessive mousing
function move_actions_to_bottom() {
  var css = <>height: auto; width: 95%; position: fixed; bottom: 6px;
              background: white; text-align: center; margin: 0 auto 0;
              border: 1px solid blue; padding-top: 4px</>.toXMLString();

  var body = document.body;
  var adv = $X('(//p[a[starts-with(@href,"adventure.php")]])[1]');
  var actions = $X('(//input[@type="submit" and contains(@value,"Attack")])[1]/ancestor::table[1]');
  if (actions || adv)
    var ui = node({ append: body, tag: <div style={ css }/> });
  if (adv) { // repeat adventure link
    adv.style.marginTop = "0";
    $x('preceding-sibling::p[.=""]', adv).forEach(rm);
    var kill = $X('(preceding-sibling::*)[1][.="" and name()="p"]');
    $x('following-sibling::*', adv).forEach(function(p) { ui.appendChild(p); });
    ui.insertBefore(adv, ui.firstChild);

    // link the place name to the kol wiki
    var a = $X('a', adv);
    var name = /^.*? \((.*)\)$/.exec(a.textContent);
    if (name) {
      node({ after: a, tag: <> [{ make_wiki_link(name[1], "wiki") }]</> });
    }
  } else if (actions) { // attack button
    ui.appendChild(actions);
    actions.style.margin = "0 auto"; // center it
  }

  if (ui) { // adjust height to the highest seen (to keep constant y position)
    var H = ui.offsetHeight, h = GM_getValue("actions_height", 108);
    if (H > h) GM_setValue("actions_height", h = H);
    ui.style.height = body.style.paddingBottom = h +"px";
  }
}

function link_kol_wiki(b) {
  node({ tag: <b>{ make_wiki_link(b.textContent, '', true) }</b>, replace: b });
}

function make_wiki_link(to, name, stealthy) {
  var slug = to.charAt().toUpperCase() + to.slice(1).replace(/ +/g, "_");
  var link = <a href={ kol_wiki + slug }>{ name || to }</a>;
  if (stealthy)
    link.@style = "text-decoration: none;";
  if (name)
    link.@title = to;
  return link;
}

function rm(tag) {
  tag.parentNode.removeChild(tag);
}

function clean_up_embedded_kol_wiki() {
  var body = document.body;
  $x('table/tbody/tr[4]/td[position()!=2] | *[name() != "TABLE"] | ' +
     'table/tbody/tr[position()!=4]', body).forEach(rm);
  body.style.margin = "0";
}

var dispatch = {
  "/uneffect": uneffect_handler
};

try { switch(window.name) {
  case "mainpane":
    if (!location.href.indexOf(kol_wiki.slice(0,-1))) {
      clean_up_embedded_kol_wiki();
      break;
    }

    if (debug) unsafeWindow.top.m = this;
    var handler = dispatch[location.pathname.replace(/\.php$/, "")];
    if (handler) handler(); // do whatever appropriate for pages on this url
    else default_handler();
    break;

  default: break;
  //case "charpane":
  //  if (debug) unsafeWindow.top.c = this;
  //  //shift_click('//*[@oncontextmenu]', remove_effect);
  //  break;
} } catch(e) {
  debug && prompt('KoL UI @ ' + location.pathname + location.search, e.message);
}
