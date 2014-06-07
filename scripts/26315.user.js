// ==UserScript==
// @name           Volokh Ignore List
// @description    Gives you the ability to ignore Volokh commenters
// @include        http://*volokh.com/posts/*.shtml*
// ==/UserScript==

var ignore = GM_getValue("ignored","").split("|");
var allDivs, thisDiv;
allDivs = document.evaluate("//div[@class='info']",
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
  var pos = str.lastIndexOf("</div>") + 7;
  var name = str.slice(pos);

  var button;
  button = document.createElement('a');
  button.href = "#";
  
  for (key in ignore) {
    ign = ignore[key];
    if (name == ign) {
      var ref = thisDiv.parentNode;
      // uncomment this next line to totally hide ignored posts
      //      ref.style.display = 'none';
      ref.innerHTML = "Comment by " + name + " ignored. ";
      button.addEventListener('click', unignore_factory(name), true);
      button.innerHTML = "(Un-ignore.)";
      ref.appendChild(button);
      continue outer;
    }
  }
  button.addEventListener('click', ignore_factory(name), true);
  button.innerHTML = " (Ignore this user)";
  thisDiv.appendChild(button);
}
