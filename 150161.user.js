(function () {
// ==UserScript==
// @name           Flickr Flasher
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Flickr Photo in Direct
// @version        1.0
// @include        http://www.flickr.com/photos/*/sets/*
// @match          http://www.flickr.com/photos/*/sets/*
// ==/UserScript==

const yodUpdate = {
  script_id : 106836,
  script_version : '1.0',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(itm.value.items[0].content);}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      s_gm.src = sSrc;
      el.appendChild(s_gm);
    }
  }
  else setValue(s_CheckUpdate, md);
}

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}

var yodoption = '<label><b>Flickr Flasher default to :</b> <select name="selopt" id="selopt">\
  <option value="sq">Square</option>\
  <option value="t">Thumbnail</option>\
  <option value="s">Small</option>\
  <option value="m">Medium 500</option>\
  <option value="z">Medium 640</option>\
  <option value="b">Large</option>\
  <option value="o">Original</option>\
</select></label>\
';

function saveOpt(el) {
  val = el.srcElement.value;
  setValue("flickrflasher", val);
  document.location.reload();
}
function getOpt() {
  val = getValue("flickrflasher");
  val = val ? val : "z";
  return val;
}

if ((setThumbs = g('setThumbs')) && (main = g('main')) && (ViewSet = g('ViewSet'))) {
  // yod Flickr Flasher Option
  Option = document.createElement('div');
  Option.innerHTML = yodoption;
  Option.className = "yodopt";
  Option.setAttribute("style", "max-width:252px;padding:0 0 10px 2px;");
  //ViewSet.appendChild(Option);
  main.insertBefore(Option, ViewSet);

  if (Option = g('selopt')) {
    if (valOpt = getOpt()) {
      for (i=0; i<Option.options.length; i++) {
        if (Option.options[i].value == valOpt) {
          Option.options[i].selected = true;
        }
      }
    }
    Option.addEventListener("change", saveOpt, false);

    // image thumbnails
    var thumbs = c2(".//a/img[contains(@class,'pc_img')]", setThumbs);
    for (i=0; i<thumbs.length; i++) {
      //thumbs[i].parentNode.title = "Photos: " + i;
      src = thumbs[i].src;
      link = thumbs[i].parentNode;
      link.href = src.replace(/(_s+)\./ig, "_" + valOpt + ".");
      link.target = "_blank";
    }
  }
}
usoUpdate();
})();