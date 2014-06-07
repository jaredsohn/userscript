// ==UserScript==
// @name           Unpaginate pagination microformated web pages
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23175.user.js
// @description    Unpaginates pages marked-up with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/safewrap.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/getmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/make-iframe.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/bind.js
// @include        http://*
// ==/UserScript==

var craft = true; // false not to expose window.craft()

// console.info("consume %x", location.href);

var mainIndexPath, mainItemsPath, next, last, seen = {};

if (!init()) // if microformat producers have not run yet, retry on load
  addEventListener("load", init, false);

function init() {
  mainIndexPath = getMetainfo("meta", "pagination-container"); // optional
  mainItemsPath = getMetainfo("meta", "items-xpath");
  if (next = getMetainfo("link", "next")) {
    if (mainItemsPath) {
      if (last = getLastItem(mainItemsPath))
        return listen(), true;
      else
        console.log("Unpaginator found no items matching %x", mainItemsPath);
    }
    //else console.warn("Unpaginator found no items-xpath meta tag: aborting.");
  }
  //else console.info("Unpaginator: entountered last page.");
}

function listen() {
  document.addEventListener("scroll", maybeFetch, false);
  //console.info("on");
  maybeFetch();
}

function deafen() {
  document.removeEventListener("scroll", maybeFetch, false);
  //console.warn("off");
}

function getLastItem(xpath) {
  return xpath && $X("("+ xpath +")[last()]");
}

function maybeFetch() {
  //console.info("maybeFetch()");
  if (last && coordsOf(last).y > pageYOffset + innerHeight * 1.5)
    return; // not preload time yet

  deafen(); // only one xhr at a time
  if (!next) { // may happen in the cross-domain case
    var xpath = getMetainfo("meta", "next-xpath");
    var a = xpath && $X(xpath, $X(mainIndexPath) || undefined);
    next = a && a.href;
  }
  if (next && !seen[next]) { // fetch (and reregister the unregistered listener)
    seen[next] = true;
    wget(next, inject, true); // true: should try to run GM scripts on it first
  }
}

function coordsOf(node) {
  if (typeof node.offsetLeft == "undefined" && node.parentNode)
    return coordsOf(node.parentNode);
  var x = 0, y = 0;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while (node = node.offsetParent);
  return { x:x, y:y };
}

function inject(doc, url, xhr) {
  // If there is a pagination container, rewrite current one from the next page
  var mainIndex = $X(mainIndexPath);
  var nextIndex = getMetainfo("meta", "pagination-container", doc) ||
    mainIndexPath; // in the cross-domain case, we may have to guess.
  if (nextIndex && mainIndex)
    if ((nextIndex = $X(nextIndex, doc))) {
      var parent = mainIndex.parentNode;
      var newIndex = document.importNode(nextIndex, true);
      parent.replaceChild(newIndex, mainIndex);
    }

  // append the injected nodes at the end of this page (discounting the index)
  var nextItemsPath = getMetainfo("meta", "items-xpath", doc) || mainItemsPath;
  var nextItems = $x(nextItemsPath, doc);
  var target = last.parentNode;
  //appendTo(nextItems, target, parent == target ? newIndex : null);
  insertAfter(nextItems, last);

  last = getLastItem(mainItemsPath, doc);
  next = getMetainfo("link", "next", doc);
  listen();
}

function insertAfter(nodes, target) {
  var doc = target.ownerDocument;
  var parent = target.parentNode;
  nodes = [].slice.call(nodes);
  while (nodes.length)
    parent.insertBefore(doc.importNode(nodes.pop(), true), target.nextSibling);
}

function appendTo(nodes, target, notafter) {
  nodes = [].slice.call(nodes);
  var doc = target.ownerDocument;
  while (nodes.length)
    target.insertBefore(doc.importNode(nodes.shift(), true), notafter);
}





// { debug | create } related feature craft()

if (craft && !unsafeWindow.craft) unsafeWindow.craft = safeWrap(function() {
  peeker(
    getMetainfo("meta", "items-xpath"),
    getMetainfo("meta", "next-xpath"),
    getMetainfo("meta", "pagination-container")
  );
  var again = arguments.callee;
  unsafeWindow.craft = function() {
    location.href = "javascript:void(document.body.removeChild(" +
      "frames.unpaginator.frameElement))";
    unsafeWindow.craft = again;
  };
});

function e2d(e4x, doc, xmlSettings) {
  e2d.parser = e2d.parser || new DOMParser;
  var xml = <testing xmlns="http://www.w3.org/1999/xhtml"/>;
  xml.tree = e4x;

  if (xmlSettings === undefined) {
    var old = XML.settings();
    XML.setSettings(xmlSettings || {
      ignoreProcessingInstructions:false,
      ignoreWhitespace:false,
      ignoreComments:false,
      prettyPrinting:false, prettyIndent:2
    });
  }
  var dom = e2d.parser.parseFromString(xml.toXMLString(), "text/xml");
  old && XML.setSettings(old);

  var tree = dom.documentElement.firstChild;
  while (tree && tree.nodeType != 1)
    tree = tree.nextSibling;
  return tree ? (doc || document).importNode( tree, true ) : null;
}

function testGlob(input) {
  function glob2re(glob) {
    return "^" + (glob.split("*").map(rquote).join(".*")) + "$";
  }
  //console.log("testGlob(%x)", input);
  var glob = input.value, re, col = "", title = "";
  try {
    re = new RegExp(glob2re(glob), "i");
    if (re.test(location.href))
      col = "#0C0";
  } catch(e) {
    title = e.message;
    col = "#F00";
  }
  input.title = title;
  input.style.borderColor = col;
}

function testXPath(input) {
  //console.log("testXPath(%x)", input);
  input.style.width = "33%";
  var xpath = input.value, col = "", result = [], title = "";
  try {
    var got = document.evaluate(xpath, document, null, 0, null), next;
    switch (got.resultType) {
      case got.STRING_TYPE: result = got.stringValue; col = "#CC0"; break;
      case got.NUMBER_TYPE: result = got.numberValue; col = "#00C"; break;
      case got.BOOLEAN_TYPE:result = got.booleanValue;col = "#C0C"; break;
      default: col = "#0C0";
        while (next = got.iterateNext())
          result.push(next);
    }
    if (typeof result != "object")
      title = typeof result +": "+ result;
  } catch(e) {
    result = undefined;
    title = e.message;
    col = "#F00";
  }
  input.title = title;
  input.style.borderColor = col;
  return result;
}

function showXPath(input, x, oldValue) {
  if (0 && input.value != oldValue) {
    console.warn(oldValue);
    console.info(input.value);
  }
  colorize(input.id, testXPath(input));
}

function scrollToNode(node) {
  var x = node, y = arguments[1];
  if (typeof node == "object") {
    node = coordsOf(node);
    x = node.x;
    y = node.y;
  } else if (arguments.length == 1) {
    y = x;
    x = 0;
  }
  window.scrollTo(x, y);
}

function colorize(id, nodes) {
  function undo() {
    var old = cache[id] || { nodes: [], color: [] };
    old.nodes.forEach(function(node, i) {
      if (old.color[i] !== null)
        node.style.outline = old.color[i];
    });
    delete cache[id];
  }
  //console.info("colorize(%x, %x)", id, nodes ? nodes.length : "-")
  var cache = colorize.cache || {};
  undo();
  if (typeof nodes == "object") {
    var colors = nodes.map(function(node) {
      if (node.nodeType != 1) return null;
      var old = node.style.outline;
      node.style.outline = "3px solid #88F";
      return old;
    });
    cache[id] = { nodes: nodes, color: colors };
  }
  colorize.cache = cache;
};

function hilight(input, direction) {
  function isTag(node) {
    return node.nodeType == 1;
  }
  var items = testXPath(input);
  var count = typeof items == "object" && items.length;
  if (!count) return;

  items = items.filter(isTag);
  //console.log("hilight(%x, %x)", input, direction);
  input.title = count +" node"+ (count==1?"":"s");
  if (count != items.length) {
    count = items.length;
    input.title += " ("+ count +" tag node"+ (count==1?"":"s");
  }
  colorize(input.id, items);

  if (!count) return;

  var n = parseInt(input.rel||"0", 10);
  n = (n + (direction == "up" ? -1 : 1) + count) % count;

  var item = items[n];
  var save = item.style.outline;
  item.style.outline = "3px solid blue";
  setTimeout(function() { item.style.outline = save; }, 5e2);
  scrollToNode(item);

  input.rel = n;
}

function armListener(what, input) {
  //console.log("armListener(%x, %x)", what, input);
  function delegate(onPrintable, onArrow) {
    onPrintable(input, undefined, ""); // initialize test state
    return function(e) {
      var old = e.target.value;
      var key = onArrow && {38: "up", 40: "down"}[e.keyCode];
      var fn = key ? onArrow : onPrintable;
      setTimeout(fn, 10, e.target, key, old);
    };
  }
  if (what == "XPath") { // XPath expression?
    var id = input.id;
    input.addEventListener("blur", function() { colorize(id); }, false );
    input.addEventListener("focus", function() {
      colorize(id, testXPath(input));
    }, false);
    input.addEventListener("keyup", delegate(showXPath, hilight), false);
  } else {
    input.addEventListener("keyup", delegate(testGlob), false);
  }
}

function rquote(s) {
  return s.replace(/([\/()\x5B\x5D{}|*+-.,^$?\\])/g, "\\$1");
}

function peeker(items, next, panel) {
  function gotFrame(i, w, d) {
    //console.log("Got frame %x", i);
    w.save = makeScript;
    d.body.style.overflow = "hidden";
    d.body.style.margin = "0 4px 4px 4px";
    i.height = "50";
    i.style.width = "100%";
    i.style.position = "fixed";
    i.style.bottom = i.style.left = i.style.right = "0";
    iframe = i; win = w; doc = d; if (token) render();
  }
  function gotToken(t) {
    //console.log("Got token %x", t);
    token = t; if (doc) render();
  }
  function makeScript() {
    //console.log("makeScript()");
    var name = $X('id("paginate-what")', doc).value;
    var namespace = "http://code.google.com/p/ecmanaut/";
    var includes = [$X('id("paginate-url")', doc).value];
    code.value = <>// ==UserScript==
// @name           Unpaginate {name} (microformat producer)
// @namespace      {namespace}
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up {name} with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
{includes.map(function(url){return "// @include        "+ url;}).join("\n")}
// ==/UserScript==

unpaginate('{$X('id("paginate-items")', doc).value}',
           '{$X('id("paginate-next")', doc).value}',
           '{$X('id("paginate-panel")', doc).value}');
</>.toXMLString().replace(/&([^;]+);/g, function unentity(m) {
  var all = { amp:"&", lt:"<", gt:">" };
  var name = m[1];
  if (all[name]) return all[name];
  var no = /^#(\d+)$/.match(name);
  return String.fromCharCode(no[1]);
}).replace(/[\x80-\uFFFF]/g, function(c) {
  c = c.charCodeAt().toString(16);
  switch (c.length) {
    case 2: return "\\x"+ c;
    case 3: c = "0" + c; // fall-through:
    case 4: return "\\x"+ c;
  }
});
    var oldHeight = doc.height;
    code = $X('id("code")', doc);
    save = $X('id("save")', doc);
    save.style.display = "block";
    iframe.height = parseInt(iframe.height) + doc.height - oldHeight;
  }
  function render() {
    //console.log("Rendering!");
    var page = <div>
      {getSaveForm(token)}
      {edit}
    </div>;
    doc.body.appendChild(e2d(page, doc));
    doc.body.innerHTML = doc.body.innerHTML;
    setTimeout(rendered, 10);
  }
  function rendered() {
    $x('//input[@class="xpath"]', doc).forEach(bind(armListener,{},"XPath"));
    $x('//input[@class="glob"]',  doc).forEach(bind(armListener,{},"glob"));
    code = $X('id("code")', doc);
    save = $X('id("save")', doc);
    save.style.display = "none";
    save.style.marginBottom = "4px";
  }
  var iframe, doc, win, code, token, save;

  var url = location.href.replace(/[#?].*/, "") + "*";
  var edit = <form id="edit" onsubmit="return false;">
    <input type="text" id="paginate-what" style="width: 200px;"/>
    <input type="text" id="paginate-url" class="glob" value={url}
           style={"width: "+ (innerWidth-300+16) +"px;"}/>
    <input type="button" value="Save" onclick="save()"/>
    <br style="clear: both;"/>
    <input type="text" id="paginate-items" class="xpath" value={items||""}/>
    <input type="text" id="paginate-next"  class="xpath" value={next ||""}/>
    <input type="text" id="paginate-panel" class="xpath" value={panel||""}/>
  </form>;
  makeFrame(gotFrame, "unpaginator");
  wget$X("http://userscripts.org/scripts/new", gotToken,
         'string(//form//input[@name="authenticity_token"]/@value)');
}

function getSaveForm(token) {
  return <form id="save" method="post" enctype="multipart/form-data"
               action="http://userscripts.org/scripts/create" target="_top">
    <input type="hidden" name="authenticity_token" value={token}/>
    <input type="file" name="file[src]" style="display: none;"/>
    <input type="hidden" name="which_source" value="on"/>
    <textarea id="code" style="width:100%;" rows="15" name="script[src]"/>
    <div style="display: none;">
      <input type="text" size="60" name="script[location]" maxlength="255"/>
      <input type="text" size="30" name="script[homepage]"/>
    </div>
    <input type="submit" value="Create" name="commit"/>
  </form>;
}
