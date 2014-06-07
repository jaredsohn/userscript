// ==UserScript==
// @name           Patterico Ignore List
// @description    Gives you the ability to ignore Patterico commenters
// @include        http://patterico.com/20*/*/*/*
// ==/UserScript==
//
// Ripped off from Dan Weber's Volokh Ignore List
// http://userscripts.org/scripts/show/26315

var ignore = GM_getValue("ignored","").split("|");
var allDivs, thisDiv;
var comlist = document.getElementsByTagName ("ol");
allDivs = document.evaluate("//cite",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);

function ignore_factory(name) {
  return function(event) {
    GM_setValue("ignored", GM_getValue("ignored", "First Element In List") + "|" + name);
    window.location.reload();
    event.preventDefault(); }
}

function unignore_factory(name) {
  return function(event) {
    var array = GM_getValue("ignored","").split("|");
    for (key in array)
      if (array[key] == name)
	array.splice(key, 1);
    GM_setValue("ignored", array.join("|"));
    window.location.reload();
    event.preventDefault(); }
}

outer:for (var i = 0; i < allDivs.snapshotLength; i++) {
  thisDiv = allDivs.snapshotItem(i).wrappedJSObject;
  var str = thisDiv.innerHTML;
  var pos1 = str.indexOf(String.fromCharCode(8212));
  if (pos1 == -1)
    continue outer;
  var name = str.slice(11, pos1);
  

  var button;
  button = document.createElement('a');
  button.href = "#";
  
  for (key in ignore) {
    ign = ignore[key];
    if (name == ign) {
      // uncomment this next line to totally hide ignored posts
      //      thisDiv.style.display = 'none';
      button.addEventListener('click', unignore_factory(name), true);
      button.innerHTML = "(Un-ignore.)";
      var ref = thisDiv.parentNode;
      ref = ref.parentNode;
      ref.innerHTML = '<cite>Comment by ' + name + " ignored. </cite>";
      ref = ref.getElementsByTagName ("cite");
      ref[0].appendChild(button);
      continue outer;
    }
  }

  button.addEventListener('click', ignore_factory(name), true);
  button.innerHTML = "(Ignore this user)";
  var separator = document.createTextNode (" | ");
  thisDiv.appendChild(separator);
  thisDiv.appendChild(button);
  //thisDiv.appendChild(button);
}
