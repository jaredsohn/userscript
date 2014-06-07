// ==UserScript==
// @name           IDC Anti-Troll Filter
// @namespace     
// @description   Dreamt up by MercWithMouth, expertly re-designed 'n coded by Quantenemy w. lion's share of credit going to him.  Allows you to place a CHAT-IGNORE on obnoxious users in FWZ IDC chat.
// @include        http://forumwarz.com/idc
// @include        http://*.forumwarz.com/idc
// ==/UserScript==

// Note more information available at http://userscripts.org/users/83206 along with other script downloads

$ = unsafeWindow["window"].$;
Element = unsafeWindow["window"].Element;
Talk = unsafeWindow["window"].Talk;

Talk.ignoreList = new Array();

Talk.render_said = function (e) {
  // Check if we should highlight the row
  var highlight = false
  if (e.said_by)
  {
    for (x in Talk.ignoreList) {
      if (e.said_by == Talk.ignoreList[x]) {
	$("ignoreCount").innerHTML = parseInt($("ignoreCount").innerHTML) + 1;;
	return null;
      }
    }
    if (e.what.toLowerCase().indexOf(Talk.your_name) >= 0)
      highlight = true

  } 
  
  var klass = e.said_by ? 'said' : 'server'
  if (highlight)
    klass += " idc_highlight"
  // Note if 'class' isn't a string safari will barf. Reserved words and all that.
  var eSaid = Element('div', {'class': klass, 'id' : 'said_' + e.txn})
  eSaid.insert(Element('div', {'class': 'date'}).update(e.said_on))
  if (e.said_by) {
  
    var col = null
    if (e.name_color != null)
      col = this.pretty[parseInt(e.name_color)]
    else
      col = Talk.hash_col(e.said_by)

    var the_link = Element('a', {'class': 'by', 'style': 'color: ' + col, 'href' : '#'})
    the_link.onclick = function (e2) {
      Talk.insert_name(e.said_by)
      return false
    }
    eSaid.insert(the_link.update(e.said_by + ": "))
  }
  eSaid.insert(Element('span', {'class': 'words'}).update(e.what))  
  
  return eSaid  
}

function addToIgnore() {
  var username = prompt("Ignore user");
  for (x in Talk.ignoreList) {
    if (Talk.ignoreList[x] == username) return;
  }
  Talk.ignoreList.push(username);
}

function removeFromIgnore() {
  var username = prompt("Unignore user");
  for (x in Talk.ignoreList) {
    if (Talk.ignoreList[x] == username) {
      Talk.ignoreList.splice(x, 1);
      return;
    }
  }
}

var ignoreLink = Element("a", {href: "#", "onclick": "return false"}).update("Add to ignore");
ignoreLink.addEventListener("click", addToIgnore, true);
var unignoreLink = Element("a", {href: "#", "onclick": "return false", "style": "margin-left: 1em" }).update("Remove from ignore");
unignoreLink.addEventListener("click", removeFromIgnore, true);
var ignoreText = Element("span", {"style": "margin-left: 1em" }).update("Lines ignored:");
var ignoreCount = Element("span", {"id": "ignoreCount", "style" : "margin-left: 1em"}).update("0");
var filterPanel = Element("p", {"id": "filter"});
filterPanel.insert(ignoreLink);
filterPanel.insert(unignoreLink);
filterPanel.insert(ignoreText);
filterPanel.insert(ignoreCount);
var talkPanel = $("talk");
talkPanel.parentNode.insertBefore(filterPanel, talkPanel);
