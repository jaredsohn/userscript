// ==UserScript==
// @name           OkCupid profile quickmatch feature
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Adds a QuickMatch pane on OkCupid profile pages
// @include        http://www.okcupid.com/profile?*
// ==/UserScript==

var imagehost = unsafeWindow.IMAGEPATH;
var data = extractCallArgs("rememberUser", ["myID","theirID","name","thumb"]);
if (data.name == unsafeWindow.SCREENNAME) return;
var q = document.createElement("div"); q.id = "qm2TopBar";
var b = document.createElement("div"); b.id = "qm2ClipBot";
b.style.background = "transparent url("+ imagehost +
  "_img/layout2/matches/quickmatch/clip_quickmatch_bot.png) " +
  "no-repeat scroll 0 -4px";
b.style.margin = q.style.margin = "-4px 0 0 0";

set("quickMatched", false);
set("quickOnLoad", toggleQuickMatch);

function quickMatch() {
  set("quickMatched", true);
}

function set(what, to) {
  location.href = "javascript:void("+ what +"="+ to +");";
}

function toggleQuickMatch() {
  if (quickMatched) {
    var t = document.getElementById("qm2TopBar");
    var b = document.getElementById("qm2ClipBot");
    t.style.display = b.style.display =
      t.style.display == "none" ? "" : "none";
  }
}

var i = document.createElement("iframe");
i.setAttribute("onload", "quickOnLoad()");
i.style.display = "none";
i.id = i.name = "qmFrame";

var p = document.getElementById("tabs"); // "profileUserBox" for above pics
var P = p.parentNode;
P.insertBefore(i, p);
P.insertBefore(q, p);
P.insertBefore(b, p);

q.innerHTML = <>
  <form name="quickmatchform" action="/quickmatch" method="post"
        target="qmFrame" style="margin:0px; padding:0px;">
    <input type="hidden" name="obUid" value={data.theirID}/>
    <input type="hidden" name="sn" value={data.name}/>
    <input type="hidden" name="bootstrapped" value=""/>
    <input type="hidden" name="submittype" id="qmSubmitType" value=""/>
    <input type="hidden" name="thumb" value={data.thumb}/>
    <h1>QuickMatch!</h1>
    <div id="qm2TopBarRight">Are you interested?
      <input type="button" onclick="submitQM(1);" id="qm2TopBarButtonYes"
             class="qm2TopBarButton" name="vote" value="Yes"/>
      <input type="button" onclick="submitQM(2);" id="qm2TopBarButtonNo"
             class="qm2TopBarButton" name="vote" value="No"/>
    </div>
    <div class="clear"></div>
  </form>
</>.toXMLString();

var y = document.getElementById("qm2TopBarButtonYes");
var n = document.getElementById("qm2TopBarButtonNo");
y.addEventListener("click", quickMatch, true);
n.addEventListener("click", quickMatch, true);

function extractCallArgs(fn, argNames) {
  function extract() {
    var data = {};
    for (var i = 0; i<argNames.length; i++)
      data[argNames[i]] = arguments[i];
    return data;
  }
  var script = $X('//script[contains(.,"'+ fn +'(")]');
  var call = script.textContent.match(new RegExp( fn+"\\((.*?)\\)" ))[0];
  return eval(fn +"= extract; "+ call);
}

function $X( xpath, root ) {
  var got = $x(xpath, root);
  return got instanceof Array ? got[0] : got;
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root, type ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, type, null), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push(next);
      return result;
  }
}
