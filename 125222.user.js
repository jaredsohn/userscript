// ==UserScript==
// @name Suppress redundant entries in Wikipedia's history page
// @description  Merge repetitive edit entries by the same author, and highlight large edits (in size).
// @include http://*.wikipedia.org/w/index.php?*action=history*
// @include http://*.wiktionary.org/w/index.php?*action=history*
// @include http://*.wikibooks.org/w/index.php?*action=history*
// @include http://*.wikiquote.org/w/index.php?*action=history*
// @include http://*.wikinews.org/w/index.php?*action=history*
// @include http://*.wikimedia.org/w/index.php?*action=history*
// @include http://*.mediawiki.org/w/index.php?*action=history*
// @include http://*.wikiversity.org/w/index.php?*action=history*
// @include http://*.wikia.com/index.php?*action=history*
// @include http://ansaikuropedia.org/index.php?*action=history*
// @include http://*.uncyclopedia.info//index.php?*action=history*
// ==/UserScript==

// Configuration
/* Specify the number of the latest versions which should't be omited/collapsed. */
var latest_count = 10;

/* set "true" if you want not to omit the revision flagged "minoredit".*/
var display_minoredit = false;


// xpath shortcut
var $x = function (xpath, target) {
  var target = target || document;
  var result =  document.evaluate(xpath, target, null, XPathResult.ANY_TYPE, null);
  var item, retval = [];
  switch (result.resultType) {
    case XPathResult.BOOLEAN_TYPE : return result.booleanValue;
    case XPathResult.NUMBER_TYPE :  return result.numberValue;
    case XPathResult.STRING_TYPE : return result.stringValue;
    default:
      while (item = result.iterateNext()) {
        retval.push(item);
      }
  }
  return retval;
}

// Here uses loop rather than recursion, since it's doubtful that
// proper recursion optimization be applied by the Javascript engine.
Array.prototype.fold = function (kons, seed) {
  var i = 0, length = this.length, retval = seed;
  for (i=0; i < length; i++) {
    retval = kons(this[i], retval);}
  return retval;}

var removeChildren = function (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

var make_item = function (node) {
  var tmp;
  var item_comment = $x(".//span[@class='comment']", node)[0];
  var comment = item_comment ? [item_comment] : [];
  var retval = {
    count: 1,
    merge: function (previous_item) {
      this.count++;
      this.minoredit = this.minoredit && previous_item.minoredit;
      this.comment = this.comment.concat(previous_item.comment);
      this.original = this.original.concat(previous_item.original);
      this.previous_version = previous_item.previous_version;
      this.undo = previous_item.undo;
      },
    histlinks: $x(".//span[contains(@class, 'mw-history-histlinks')]", node)[0],
    radio_oldid: $x(".//input[(@name='oldid')]", node)[0],
    radio_diff: $x(".//input[(@name='diff')]", node)[0],
    version : $x("string(.//input[@name='oldid']/@value)", node),
    previous_version :  (tmp = $x("string(.//span[contains(@class, 'mw-history-histlinks')]/a[2]/@href)", node)) && tmp.match("oldid=([0-9]+)")[1],
    undo: $x(".//span[contains(@class, 'mw-history-undo')]", node)[0],
    user : $x("string(.//span[contains(@class, 'history-user')]/a[contains(@class, 'mw-userlink')]/text())", node),
    user_link : $x(".//span[contains(@class, 'history-user')]/a[contains(@class, 'mw-userlink')]", node)[0],
    user_tool_links : $x(".//span[@class='mw-usertoollinks']", node)[0],
    bytes: $x("string(.//span[@class='history-size']/text())", node),
    bytes_diff: $x("string(.//span[(@class='mw-plusminus-pos') or (@class='mw-plusminux-neg')]/text())", node),
    date_link : $x("a|span[@class='flaggedrevs-color-1']/a", node)[0],
    minoredit: $x("boolean(.//*[@class='minoredit'])", node),
    comment: comment,
    original: [node]
 };
  return retval;}

var history_template = function (i) {
  var retval = document.createElement("li");
  var original_items = document.createElement("ul");
  if (i) {
    var histlinks = i.histlinks.cloneNode();
    var previous_diff_link = $x("a", histlinks)[1];
    if (previous_diff_link) {
      previous_diff_link.setAttribute("href", histlinks.children[1].getAttribute("href").replace(/oldid=[0-9]*/, "oldid=".concat(i.previous_version)));
    }
    retval.appendChild(histlinks);
    i.radio_oldid.style.visibility = "visible";
    retval.appendChild(i.radio_oldid.cloneNode());
    i.radio_diff.style.visibility = "visible";
    retval.appendChild(i.radio_diff.cloneNode());
    var wrapper = document.createElement((i.bytes_diff && Math.abs(i.bytes_diff) > 4000) ? "strong" : "span");
    if (i.bytes_diff && Math.abs(i.bytes_diff) < 100) {
      wrapper.setAttribute("class", "mw-gmscript-history-small-edit");
      wrapper.setAttribute("style", "font-size: 75%;"); }
    wrapper.appendChild(i.date_link.cloneNode());
    var size =
      (!i.bytes_diff)       ? false :
      (i.bytes_diff > 500)  ? ["strong", "pos"] :
      (i.bytes_diff > 0)    ? ["span", "pos"] :
      (i.bytes_diff > -500) ? ["span", "neg"] :
      ["strong", "neg"];
    if (size) {
      var diffbytes = document.createElement(size[0]);
      diffbytes.setAttribute("class", "mw-plusminus-".concat(size[1]));
      diffbytes.setAttribute("style", "margin-left: 4px");
      diffbytes.appendChild(document.createTextNode("".concat ("(", (size[1] == "pos") ? "+" : "", i.bytes_diff, ")")));
      wrapper.appendChild(diffbytes);}
    wrapper.appendChild(document.createTextNode(" "));
    wrapper.appendChild(i.user_link.cloneNode());
    wrapper.appendChild(document.createTextNode(" "));
    if (i.count > 1) {
      xnum = document.createElement("a");
      xnum.setAttribute("class", "mw-gmscript-history-edits");
      xnum.setAttribute("href", "javascript:");
      xnum.appendChild(document.createTextNode("".concat("(x", i.count, ")")));
      xnum.addEventListener("click", function() { toggle_expand(original_items);} , false);
      wrapper.appendChild(xnum);
      wrapper.appendChild(document.createTextNode(" ")); } wrapper.appendChild(i.user_tool_links.cloneNode());
    wrapper.appendChild(document.createTextNode(i.bytes));
    var comments_element = document.createElement("span");
    i.comment.forEach(function (x) {
      comments_element.appendChild(x.cloneNode());});
    wrapper.appendChild(comments_element);
    retval.appendChild(wrapper);
    retval.appendChild(document.createTextNode(" - "));
    if (i.undo) { retval.appendChild(i.undo.cloneNode()); }
    original_items.setAttribute("class", "mw-gmscript-history-original");
    original_items.setAttribute("style", "display:none;");
    i.original.forEach (function (x) { original_items.appendChild(x);});
    retval.appendChild(original_items);
  }
  return retval;
};

var toggle_expand = function (elem) {
  elem.style.display = (elem.style.display == "block") ? "none" : "block";
}

var history = $x("//ul[@id='pagehistory']/li");
var current_item = false;
var is_latest = !($x("boolean(//a[@class='mw-firstlink'])")) && latest_count; 

var bytes_to_integer = function (bytes) {
 return (bytes.match(/-?([0-9,]+)/)) ?
   bytes.match(/-?([0-9,.]+)/)[0].replace(/[,.]/g,"") :
   /* empty */
   0;
};

var current_item = false;
var last_item = false;

var output_list = history.fold (
  function (item, list) {
    var new_item = make_item(item);
    if (!is_latest && (new_item.user == current_item.user)) {
      current_item.merge(new_item);
      last_item = new_item;}
    else {
      if (current_item && ((display_minoredit || !current_item.minoredit) || is_latest)) {
        if (is_latest) { is_latest--;}
        current_item.bytes_diff = bytes_to_integer(current_item.bytes) - bytes_to_integer(new_item.bytes);
        list.push(current_item);}
      current_item = new_item;}
   return list},
   []);
current_item.bytes_diff = last_item.bytes_diff &&
  bytes_to_integer(current_item.bytes) - (bytes_to_integer(last_item.bytes) -  bytes_to_integer(last_item.bytes_diff));

output_list.push(current_item);

var container = ($x("//ul[@id='pagehistory']")[0]);
removeChildren(container);

output_list.forEach (
  function (item) {
    container.appendChild (history_template(item));});
