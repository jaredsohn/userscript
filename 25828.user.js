// ==UserScript==
// @name           Multiple Upload for Muxtape
// @namespace      http://hacks.atrus.org/
// @description    Allow you to upload more than one song at a time; it automates the repeated uploads
// @include        http://muxtape.com/upload
// ==/UserScript==

// don't run in a frame (since we'll be making one later)
if(window.top != window) {
  return;
}

function xpath_1(expr, rel_node, doc) {
  if(!doc) {
    doc = document;
  }
  return doc.evaluate(
    expr,
    rel_node,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
}

function set_stat_txt(fin, txt) {
  fin.stat.firstChild.data = txt;
}

var iframe;
function make_iframe(listener) {
  window.setTimeout(function() {
    if(document.body.firstChild.nodeName.toLowerCase() == "iframe") {
      document.body.removeChild(document.body.firstChild);
    }
    iframe = unsafeWindow.document.createElement("iframe");
    iframe.style.setProperty("height", "1px", "");
    iframe.style.setProperty("width", "1px", "");
    iframe.style.setProperty("position", "absolute", "");
    iframe.style.setProperty("left", "-10px", "");
    iframe.addEvent("load", listener);
    iframe.src = "http://muxtape.com/upload?" + Math.random();
    document.body.insertBefore(iframe, document.body.firstChild);
  }, 500);
}

var cont_div_expr = "/html/body/div[contains(@class,'container')]/div[contains(@class,'content')]";
var cont_div = xpath_1(cont_div_expr, document);

var rem_cnt_span = xpath_1("./strong[contains(@class,'larger')]", cont_div);

// no songs remaining
if(!rem_cnt_span) {
  return;
}

var rem_cnt = parseInt(rem_cnt_span.textContent);
// not worth bothering with if there's only one ;)
if(rem_cnt < 1) {
  return;
}
var orig_form = xpath_1("./form[1]", cont_div);
orig_form.style.setProperty("display", "none", "important");
var orig_fin = xpath_1("./input[@name='file']", orig_form);
var new_form = document.createElement("form");

cont_div.insertBefore(new_form, orig_form);

var fins = []
for(var i = 0; i < rem_cnt; i++) {
  var stat_div = document.createElement("div");
  stat_div.style.setProperty("height", "1.25em", "important");
  stat_div.style.setProperty("margin-bottom", "1em", "important");
  stat_div.appendChild(document.createTextNode(""))
  var new_fin = orig_fin.cloneNode(true);
  new_fin.style.setProperty("display", "block", "important");
  new_fin.style.setProperty("margin-top", "0px", "important");
  new_fin.style.setProperty("margin-bottom", "0px", "important");
  fins.push({inp: new_fin, stat: stat_div});
  new_form.appendChild(new_fin);
  new_form.appendChild(stat_div);
}


var new_but = xpath_1("./input[@type='submit']", orig_form).cloneNode(true);
new_form.appendChild(new_but);
new_form.addEventListener("submit", function(e) {
  e.preventDefault();
  window.setTimeout(do_upload, 1);
}, true);

function do_upload() {
  var to_upload = []
  var upload_not = document.createElement("div");
  upload_not.style.setProperty("font-weight", "bold", "");
  upload_not.style.setProperty("font-size", "1.5em", "");
  upload_not.appendChild(document.createTextNode("Uploading ..."));
  cont_div.insertBefore(upload_not, new_form);
  new_but.value = "UPLOADING ...";
  new_but.disabled = true;
  
  for(var i = 0; i < fins.length; i++) {
    fins[i].disabled = true;
  }
  for(var i = 0; i < fins.length; i++) {
    var txt = "oops"
    if(fins[i].inp.textLength < 1) {
      txt = "nothing to upload ...";
    } else if(!fins[i].inp.value.match(/mp3/i)) {
      txt = "doesn't seem to be an mp3 ...";
    } else {
      txt = "pending ..."
      to_upload.push(fins[i]);
    }
    set_stat_txt(fins[i], txt);
  }
  // so the playlist order is the same as the file list ...
  to_upload.reverse();
  
  var i = 0;
  function uploader() {
    var cdiv = xpath_1(cont_div_expr, iframe.contentDocument, iframe.contentDocument)
    var tc = cdiv.textContent;
    if(tc.match(/Error/)) {
      set_stat_txt(to_upload[i], "an error occurred :(");
      i++;
      iframe.removeEvent("load", uploader);
      make_iframe(uploader);
    } else if(tc.match(/Upload successful/)) {
      set_stat_txt(to_upload[i], "done!");
      i++;
      iframe.removeEvent("load", uploader);
      make_iframe(uploader);
    } else if(tc.match(/songs remaining/)) {
      if(i < to_upload.length) {
        // upload next
        set_stat_txt(to_upload[i], "uploading now ...");
        var cfin = iframe.contentDocument.importNode(to_upload[i].inp, true);
        var ofin = xpath_1("./form/input[@type='file']", cdiv, iframe.contentDocument);
        var cform = ofin.parentNode;
        cform.replaceChild(cfin, ofin);
        cform.submit();
      } else {
        // clean up ...
        upload_not.innerHTML = "Done uploading! <a href='http://muxtape.com/organize'>Organize?</a>" +
          "<a href='http://muxtape.com/organize'>Upload more?</a>";
        new_but.value = "DONE UPLOADING!";
      }
    }
  }
  make_iframe(uploader);
}
