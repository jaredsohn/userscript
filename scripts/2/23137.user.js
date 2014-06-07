// ==UserScript==
// @name          OkCupid comment quoter
// @namespace     http://code.google.com/p/ecmanaut/
// @description   Lets you double click journal comments to quote them and reference its author. (Double-click as many as you like; they will all line up in the textfield after one another. Just trim it down and edit to your satisfaction before posting.)
// @include       http://www.okcupid.com/journal*
// ==/UserScript==

document.addEventListener("dblclick", quote, false)

function quote(e) {
  var target = e.target;
  target = $X('ancestor-or-self::div[@class="journalCommentText"]', target);
  console.log(target);
  if (!target) return;

  var quoted = target.innerHTML;
  quoted = quoted.replace(/\s+/gm, " ");
  quoted = trimws(quoted.split(/<\/?p>/g).map(trimws).join("\n"));
  quoted = quoted.replace(/\n+/, "\n\n");

  var author = $X('following::p[@class="info"]/a', target).textContent;
  click($X('following::a[starts-with(@href,"javascript:") and ' +
                        '.="Add a Comment"]', target));
  var node = $X('following::textarea[@class="addform_ta"]', target);

  var text = node.value;
  if (text) text += "\n\n";
  text += '<b>'+ author +'</b>: <i>'+ quoted +'</i>';
  node.value = text;

  node.focus();
}

function trimws(s) {
  return s.replace(/^\s*|\s*$/g, "");
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,
                       1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
  if (node.nodeName.match(/^a(rea)?$/i) && node.href) {
    var win = node.target && getFrame(node.target) || window;
    if (!node.href.match(/^#/))
      win.location.href = node.href;
    else if (node.getAttribute("onclick")) {
      var js = node.getAttribute("onclick");
      if (!js.match(/^javascript:/i))
        js = "javascript:" + js;
      win.location.href = js;
    }
    if (win != window)
      win.focus();
  }
}

function getFrame(name, frame) {
  if (!frame)
    frame = top;
  if (frame.name == name)
    return frame;
  for (var i = 0; i < frame.frames.length; i++) try {
    var yes = getFrame(name, frame.frames[i]);
    if (yes) return yes;
  } catch(e) {}
}

function $X( xpath, root, match, nr ) {
  var got = $x( xpath, root, match, nr );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate(xpath, root||doc, null, 0, null), next, result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}
