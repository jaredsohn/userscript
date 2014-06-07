(function () {
// ==UserScript==
// @name           Flickr Flasher
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Flickr Photo in Direct
// @version        1.1
// @updateURL      https://userscripts.org/scripts/source/106836.meta.js
// @match          http://*.flickr.com/photos/*/sets/*
// @run-at         document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 106836,
  script_version : '1.1',
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
  const s_Redir = false;
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      if (s_Redir) sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
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
  valOpt = this.value;
  setValue("flickrflasher", valOpt);
  //document.location.reload();
  doExec();
}
function getOpt() {
  val = getValue("flickrflasher");
  val = val ? val : "z";
  return val;
}

function doExec() {
  if ((setThumbs = g('setThumbs')) && (main = g('main')) && (ViewSet = g('ViewSet'))) {

    if (!g('yodopt')) {
      usoUpdate();

      // yod Flickr Flasher Option
      var Option = document.createElement('div');
      Option.innerHTML = yodoption;
      Option.id = "yodopt";
      Option.setAttribute("style", "max-width:252px;padding:0 0 10px 2px;");
      //ViewSet.appendChild(Option);
      main.insertBefore(Option, ViewSet);

      if (Option = g('selopt')) {
        if (valOpt) {
          for (i=0; i<Option.options.length; i++) {
            if (Option.options[i].value == valOpt) {
              Option.options[i].selected = true;
            }
          }
        }
        Option.addEventListener("change", saveOpt, false);
      }
    }

    if (g('yodopt')) {
      // image thumbnails
      var thumbs = c2(".//a/img[contains(@class,'pc_img')]", setThumbs);
      for (i=0; i<thumbs.length; i++) {
        //thumbs[i].parentNode.title = "Photos: " + i;
        src = thumbs[i].src;
        link = thumbs[i].parentNode;
        link.href = src.replace(/(_sq|_t|_s|_m|_z|_b|_o)\./ig, "_" + valOpt + ".");
        link.target = "_blank";
      }
    }
  }
}

var valOpt = getOpt();
document.addEventListener("DOMContentLoaded", doExec, true);
})();