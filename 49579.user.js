// ==UserScript==
// @namespace      http://code.google.com/p/ecmanaut/
// @name           Toggle Facebook invited-to/member-of groups visibility
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @description    Makes the Facebook groups page more manageable.
// @include        http://www.facebook.com/groups.php*
// @unwrap
// ==/UserScript==

var toggler = this;
var types = {
  invited: '//div[@class="grouprow"][.//a[.="Reject Invitation"]]',
  member:  '//div[@class="grouprow"][.//a[.="Leave Group"]]'
};
init();

function show(node) { node.style.display = ""; }
function hide(node) { node.style.display = "none"; }

function init() {
  var summary = $X('//div[@class="summary"]'), member, invited;
  [member, invited] = summary.innerHTML.split(/\.\s*/);
  summary.innerHTML = member;
  addToggle(summary, "", "member");
  addToggle(summary, invited, "invited");
}

function toggle(e) {
  var a = e.target;
  var type = a.id.replace("-toggle", "");
  var op = a.textContent;

  $x(types[type]).forEach(toggler[op]);

  var ops = ["hide", "show"];
  a.textContent = ops[1 - ops.indexOf(op)];
}

function addToggle(to, text, type) {
  if (text)
    node({ append: to, text: text });
  node({ append: to, text: " (" });
  var a = node({ append: to, tag: <a id={type + "-toggle"}>hide</a> });
  node({ append: to, text: "). " });
  a.addEventListener("click", toggle, false);
}
