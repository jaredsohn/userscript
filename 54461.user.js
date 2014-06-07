// ==UserScript==
// @name           Slimeling Minder
// @namespace      http://caigawalker.plus.com/
// @description    Version 0.1 - Ask for confirmation when you give certain items to your Slimeling.
// @include        http://127.0.0.1:*/inventory.php*
// @include        *.kingdomofloathing.com/inventory.php*
// ==/UserScript==

// Change history
// 0.1 - Beta release, expect bugs!

var specials = [];

function toggle_importance(itemid) {
  if(specials[itemid]) {
    specials[itemid] = 0;
  } else {
    specials[itemid] = 1;
  }
  var specials_reverse = new Array();
  for(var i in specials) {
    if(i && specials[i]) {
      specials_reverse.push(i);
    }
  }
  var str = specials_reverse.join(",");
  GM_setValue("specials", str);
}

function evaluate_td(itemid) {
  var td = document.getElementById("i" + itemid);
  var quantity = td.childNodes[2].innerHTML;
  var child = td.childNodes[3].firstChild;
  var iname = td.firstChild.innerHTML;
  do {
    if(child.innerHTML == "[give to slimeling]") {
      if(specials[itemid]) {
        if(quantity == "") {
          child.setAttribute("style", "background-color: #FF9999;");
          var display_name = iname;
          if(iname.indexOf("<b>") == 0) {
            display_name = iname.substring(3, iname.length - 4);
          }
          child.addEventListener("click",
                                 function(e) {
                                   var q = confirm("Are you sure you want to feed your last " + display_name + " to your Slimeling?");
                                   if(!q) {
                                     e.preventDefault();
                                     e.stopPropagation();
                                   }
                                   return q;
                                 },
                                 true);
        } else {
          child.setAttribute("style", "background-color: #99FF99;");
        }
      } else {
        child.setAttribute("style", "");
      }
      break;
    }
  } while(child = child.nextSibling);
  if(iname.indexOf("<b>") == 0) {
    return;
  }
  var nameNode = document.createElement('a');
  nameNode.addEventListener("click",
                            function(e) {
                              toggle_importance(itemid);
                              evaluate_td(itemid);
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            },
                            false);
  nameNode.setAttribute("style", "font-weight: bold; text-decoration: none;");
  nameNode.setAttribute("href", "#");
  var nameNodeText = document.createTextNode(iname);
  nameNode.appendChild(nameNodeText);
  td.replaceChild(nameNode,td.firstChild);
}

function repaint() {
  if(document.body.innerHTML.indexOf("&nbsp;&nbsp;[equipment]&nbsp;&nbsp;") == -1) {
    return;
  }
  var str = GM_getValue("specials", "");
  var saved_specials = str.split(",");
  specials = [];
  for(var i in saved_specials) {
    specials[saved_specials[i]] = 1;
  }
  var tds = document.getElementsByTagName("td");
  for(var t in tds) {
    var td = tds[t];
    if(! /^i\d+$/.test(td.id)) {
      continue;
    }
    if(td.innerHTML.indexOf(">[give to slimeling]<") == -1) {
      continue;
    }
    var iname = td.childNodes[0].innerHTML;
    var itemid = /^i(\d+)$/.exec(td.id)[1];
    evaluate_td(itemid);
  }
}

doEquip_orig = unsafeWindow.doEquip;
unsafeWindow.doEquip = function() {
  doEquip_orig();
  repaint();
}

repaint();