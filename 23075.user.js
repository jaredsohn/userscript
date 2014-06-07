// ==UserScript==
// @name           OkCupid personality awards sorter
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23075.user.js
// @description    Lets you split personality award badges into three groups (as perceived by you): positive, neutral and negative traits.
// @resource icons http://ecmanaut.googlecode.com/svn/trunk/sites/okcupid.com/sortcontrol.png
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/config.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://www.okcupid.com/profile*
// ==/UserScript==

var awards = $X('id("personality_awards")/ul');
var groups = {
  "+": node({ append: awards, tag: <div title="Wanted traits"/> }),
  " ": node({ append: awards, tag: <div title="Indifferent traits"/>}),
  "-": node({ append: awards, tag: <div title="Unwanted traits"/>})
};
node({ after: groups["+"], tag: <hr/> });
node({ after: groups[" "], tag: <hr/> });

// http://cdn.okcimg.com/_img/layout2/profile/personality_icons/ambition.png
$x('.//img[contains(@src,"personality_icons")]', awards).forEach(sort);

function sort(img, n, all) {
  var a = img.parentNode;
  // image path: /_img/layout2/profile/personality_icons/not_introversion.png
  var trait = img.src.match(/([^/]+)\.[^.\/]+$/)[1]; // e g: not_introversion
  var prefs = config.get(trait, " ");
  groups[prefs].appendChild(a.parentNode.removeChild(a));
  if (all)
    node({ prepend: a, title: "Resort this trait", className:"sort-control",
	   id:"resort-"+trait }).addEventListener("click", resort(trait), true);
}

function resort(trait) {
  return function(e) {
    var n = e.target;
    var pos = coordsOf(n);
    var dy = (e.pageY - pos.y) / n.offsetHeight;
    e.preventDefault();
    e.stopPropagation();

    var prefs;
    if (dy < 0.33) prefs = "+";
    if (dy > 0.66) prefs = "-";
    config.set(trait, prefs);
    sort($X('../img', n));
  };
}

function coordsOf( node ) {
  if (typeof node.offsetLeft == "undefined" && node.parentNode)
    return coordsOf(node.parentNode);
  var x = 0, y = 0, w = node.offsetWidth, h = node.offsetHeight;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while ((node = node.offsetParent));
  return { x:x, y:y, w:w, h:h };
}

GM_addStyle(<>
  #personality_awards a.profile-award {"{"}
    position: relative;
    display: block;
    height: 70px;
    width: 70px;
    float: left;
    margin: 1px;
  {"}"}
  #personality_awards hr {"{"}
    border-color: #EEE;
    width: 740px;
    margin: 0;
  {"}"}
  a:hover div.sort-control {"{"}
    visibility: visible;
  {"}"}
  a div.sort-control {"{"}
    visibility: hidden;
    background: url({ GM_getResourceURL("icons") }) no-repeat;
    position: absolute;
    height: 70px;
    width: 12px;
  {"}"}
</>.toXMLString());
