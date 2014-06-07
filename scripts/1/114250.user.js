(function () {
// ==UserScript==
// @name           Mediafired
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Mediafire.com direct link (downloader)
// @version        1.2
// @match          http://*.mediafire.com/?*
// @match          http://mediafire.com/?*
// @run-at         document-start
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 114250,
  script_version : '1.2',
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

const prefix = "yod_mf_";
const pass_key = prefix + "pass";
var pass_val = getValue(pass_key);
var autodl_val = boolVal(getValue(prefix + "autodl"));

function boolVal(v) {
  v = v ? (v.toString() == 'true' ? true : false) : false;
  return v;
}

function checkpass() {
  var f_pwd = c1(".//div[contains(@class,'password_download_link')]");
  if (f_pwd && (f_pwd.style.display !== 'none')) {
    return true;
  }
  return false;
}

function setpass() {
  var a = g('yod_mf_share_link');
  if (!a) return false;
  var span = g('yod_mf_last_pwd');
  if (pass_inp = g('downloadp')) {
    var pass_val = "";
    a.href = unescape(a.href).replace(/\|.*$/ig, "");
    if (pass_val = pass_inp.value.trim()) {
      a.href += "|" + pass_val;
    }
    setValue(pass_key, pass_val);
    span.textContent = pass_val;
  }
  return false;
}

function togoNow(url, goNow) {
  if (goNow && autodl_val)
    window.open(url, "_blank");
}

function setAutodl() {
  setValue(prefix + "autodl", this.checked);
  document.location.reload();
}

function addCS(str, css, link, id) {
  if (g(id)) return;
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement(css ? "style" : "script");
    if (id) node.id = id;
    node.type = css ? "text/css" : "text/javascript";
    if (link) node.src = str;
    else node.appendChild(document.createTextNode(str));
    heads[0].appendChild(node);
  }
}

function toShare(target, url, pass) {
  if (!target.parentNode) return;

  const mycss = "\
#yodBox {text-align: center; padding: 10px; margin: 15px auto; background-color: #E7F4FF; border: solid 2px #95CCFB; color: #333;}\
#yodBox > div {clear:both;}\
#yodBox hr {background-color: #CAD6F2; height: 1px; border: 0; width: 100%;}\
#yodBox input, #yodBox label {cursor: pointer;font-size: 11px;}\
#yodShare_p {text-align:center;font-size: 16px; font-weight: bold; color: #505050;}\
#yod_mf_last_pwd {color: #ff07c2;}\
#yod_mf_footer {font-size: x-small; font-style: italic;}\
";

  addCS(mycss, 1, false, "yod_CSS");

  if (pass) pass = pass.toString().trim();
  var is_pwd = checkpass();
  if (is_pwd && pass)  url += "|" + pass;
  var div = document.createElement("div");
  div.id = "yodBox";

  var p = document.createElement("p");
  p.id = "yodShare_p";
  var a = document.createElement("a");
  a.href = url;
  a.id = "yod_mf_share_link";
  a.textContent = "Share MF direct link";
  p.appendChild(a);
  p.innerHTML = '-[ ' + p.innerHTML + ' ]- ';

  div.appendChild(p);

  var div2 = document.createElement("div");
  var s_is_pwd = is_pwd ? "" : " display: none;";
  var cb, span = document.createElement("span");
  span.textContent = pass;
  span.setAttribute("style", s_is_pwd);
  span.id = "yod_mf_last_pwd";
  div2.appendChild(span);
  div2.innerHTML = '<span style="' + s_is_pwd + '">Last Password:</span> ' + div2.innerHTML;
  div2.innerHTML += '<hr />\
  <div><label><input id="yod_mf_autodl" name="yod_mf_autodl" type="checkbox">Auto DL (new window)</label></div>\
  <hr />\
  <div id="yod_mf_footer"><span style="">Script Update ; \
  <a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank">\
  MEDIAFIRED (' + yodUpdate['script_version'] + ')</a> - \
  <a href="http://mf.thrsh.tk/" target="_blank">\
  Official Web\
  </a></span></div>';

  div.appendChild(div2);

  target.parentNode.insertBefore(div, target.nextElementSibling);

  if (cb = g('yod_mf_autodl')) {
    cb.checked = autodl_val;
    cb.addEventListener("click", setAutodl, false);
  }
}

function doExec() {
  usoUpdate();

  var target, goNow = 0;

  if (!(target = c1(".//div[contains(@class,'download_file_title')]"))) return;

  var domain = 'http://mf.thrsh.tk/';
  const param = "link";

  var pass_inp, url = domain + "?" + param + "=" + document.location.search.toString().replace(/^\?/, "");

  toShare(target, url, pass_val);

  if (checkpass()) {
    if (pass_inp = g('downloadp')) {
      pass_inp.addEventListener("input", setpass, false);
      if (pass_val) pass_inp.value = pass_val;
    }
    //goNow++;
  }
  else {
    if (!(g('recaptcha_switch_img'))) goNow++;
  }

  togoNow(url, goNow);
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();