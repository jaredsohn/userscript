// ==UserScript==
// @name           Beldar Ignore List
// @description    Gives you the ability to ignore Beldar commenters
// @include        http://beldar.blogs.com/beldarblog/*/*/*.html*
// ==/UserScript==

var ignore = GM_getValue("ignored","").split("|");
var allDivs, thisDiv;
allDivs = document.evaluate("//div[not(@*)]",
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
  var pos1 = str.indexOf("</font>") + 8;
  var pos2 = str.indexOf(" made the following");
  var name = str.slice(pos1, pos2);
  

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
      thisDiv.innerHTML = '<p class="posted">Comment by ' + name + " ignored. </p>";
      var posted = thisDiv.getElementsByTagName ("p");
      posted[0].appendChild(button);
      //thisDiv.appendChild(button);
      continue outer;
    }
  }
  button.addEventListener('click', ignore_factory(name), true);
  button.innerHTML = "(Ignore this user)";
  var separator = document.createTextNode (" | ");
  var posted = thisDiv.getElementsByTagName ("p");
  posted[0].appendChild(separator);
  posted[0].appendChild(button);
  //thisDiv.appendChild(button);
}
