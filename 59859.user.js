// ==UserScript==
// @name          Plan B: inline footnotes
// @namespace     http://github.com/johan/
// @description   Lets you click footnotes in Earth Policy Institute's "Plan B" series of books to bring them to your eyes, rather than have you chase down the page to the reference, and back again afterward. Hypertext!
// @include       http://earth-policy.org/index.php?/books/pb*
// @include       http://www.earth-policy.org/index.php?/books/pb*
// ==/UserScript==

$x('//p/text()').filter(is_footnote).forEach(link_footnote);

function is_footnote(node) {
  return /^\s*\d+\.\D/.test(node.nodeValue || "");
}

function link_footnote(text) {
  function inline(e) {
    e.preventDefault(); // don't go there this time -- just inline the footnote
    link.removeEventListener("click", inline, true); // but do, next time

    inject_footnote(no, link);
  }

  var no = text.nodeValue.match(/^\s*(\d+)\.\s*(.*)/), lead;
  if (no) {
    lead = no[2];
    no = parseInt(no[1], 10);
  }
  else
    return;

  var refs = $x('preceding::text()[contains(.,"'+ no +'")]', text), ref, tail;
  while ((ref = refs.pop())) {
    if ((tail = ref.nodeValue.match("^(|.*\\D)"+ no + "\\s*$")))
      break;
  }
  if (tail) {
    tail = tail[1];
  } else
    return; // no link found in prior text

  // content to footnote
  var link = A(no, "n-back", "n", ref.nextSibling, ref.parentNode);
  link.addEventListener("click", inline, true);
  ref.nodeValue = tail;

  var anchor = A(no, "n", "n-back", text); // footnote to content
  text.nodeValue = " " + lead;
}

function inject_footnote(no, at, ibid) {
  var tail = at.lastChild; // "]"
  if (!ibid) at.insertBefore(document.createTextNode("] "), tail);

  var note = $X('id("f'+ no +'n")'), first = true;
  while (note) {
    note = note.nextSibling;
    if ($X('self::br | .//br', note)) break;
    var text = first && note.nodeName == "#text" && note.nodeValue, copy;
    if (text && (text = text.match(/^\s*ibid\.?(.*)/i))) {
      inject_footnote(no - 1, at, "ibidem"); // keep recursing back
      if (ibid) return; // and don't bother continuing when not found

      copy = document.createTextNode(text[1]); // but proceed otherwise -- see
      // http://www.earth-policy.org/index.php?/books/pb4/PB4ch1_ss5#f58n-back
    } else {
      copy = note.cloneNode(true);
    }
    at.insertBefore(copy, tail);
  }
}

function A(text, name, href, before, parent) {
  var span = document.createElement("span");
  span.style.color = "#999";
  span.textContent = "[";

  var a = document.createElement("a");
  a.style.color = "#274980";
  a.textContent = text;
  span.id = 'f' + text + name;
  a.href = '#f' + text + href;
  span.appendChild(a);

  span.appendChild(document.createTextNode("]"));
  (parent || before.parentNode).insertBefore(span, before);

  // focus this one, if we've hotlinked to the anchor
  if (location.hash === "#" + span.id) {
    location.hash = "#";
    location.hash += span.id;
  }

  return span;
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while ((next = got.iterateNext()))
	result.push( next );
      return result;
  }
}
