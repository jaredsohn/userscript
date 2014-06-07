(function () {
// ==UserScript==
// @name           Twitter Shortener Pilot
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    Add top dashboard Twitter (internal t.co) shortener, cool!
// @version        1.5
// @include        http://twitter.com/*
// @match          http://twitter.com/*
// ==/UserScript==

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);}
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling) }
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

var script_id = 90099;
var script_version = '1.5';

const failed = 'failed :(';
const showimg = 'data:image/gif;base64,R0lGODlhEQARANU1AC0tLdLS0sXFxdHR0Y+Pj5GRkdfX18fHxz09PdjY2MLCwmZmZkhISMrKytnZ2ZOTk8/Pz0pKStTU1LKyssnJyVpaWkJCQl9fX8PDw97e3jU1Ndvb22VlZT8/P5SUlNbW1sHBwdra2nBwcIeHh5KSknx8fJ2dnbe3t1BQUImJicDAwEVFRYaGhkRERHFxcXl5eS8vL0NDQ46Oji4uLuLi4ioqKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAARABEAAAaHwJpwSCsah0ik8ZhMLotN5zOqnDZnk+dzMkNqFNqiQtNEQLQQBDViWBoiVGElU8xU4kKYqOgCUGcAgAwyBAw1gF1CCw0OCQEHJR0WLwcBCQ4NCzUSAgUebTQFJkUfDwUCEjUBAgQPG0UpJ0UhJAQCATUXGAMDFCojKBwsIBS8GBdRKzEWLU1BADs=';
const hideimg = 'data:image/gif;base64,R0lGODlhEQARANUyANLS0i0tLcXFxdHR0dfX15GRkY+Pj5OTk9jY2MnJycLCwsPDw0pKSmZmZj09Pd7e3sfHx8/Pz9TU1LKystnZ2VpaWl9fXzU1NUhISMrKyj8/P1BQUIeHh5KSko6Ojp2dnWVlZdra2omJiZSUlIaGhsHBwdvb23l5eS8vL3x8fEJCQnFxcdbW1sDAwHBwcLe3ty4uLuLi4ioqKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAARABEAAAaBQJllMRgkSiTQhtNKFBcWGUBg6IRisZcIazoYBACZRFA4sLCfApYwKggkskaGggBATipNCgJAUDINMoIwATAyGAYeGIWFgo6OAStYLiiPloIVD1gPFZePDARYawyeMg4RoqIRDpcXCqmpChePMBOwsBOGl7eljry9Mr+9wqXEwKVBADs=';
const loading = 'data:image/gif;base64,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';

var tweetshort_cfg = {show: false}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  val = val ? (val.toString() == 'true' ? true : false) : false;
  return val;
}

function usoUpdate(el) {
  el = el ? el : document.body;
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.tk/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

function add_style(css) {
  var chrome = /Chrome/.test(navigator.userAgent);
  if (chrome) css = css.replace(/\-moz\-/ig, '');
  if (typeof GM_addStyle !== 'undefined') {
    return GM_addStyle(css);
  }
  else if (heads = document.getElementsByTagName('head')) {
    var style = document.createElement('style');
    try { style.innerHTML = css; }
    catch(x) { style.innerText = css; }
    style.type = 'text/css';
    style.id = 'yod_twitter_shortener';
    heads[0].appendChild(style);
  }
}

function _get(url, callback, errcall) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: callback,
    onerror: errcall
  });
}

const mycss = "\
#yod_twitter_shortener_wrapper{\
margin: 0;\
padding: 0;\
width: 100%;\
display: block;\
}\
#yod_twitter_shortener_container{\
-moz-box-shadow: rgba(0, 0, 0, 0.496094) 0px 1px 2px;\
-webkit-box-shadow: rgba(0, 0, 0, 0.496094) 0px 1px 2px;\
background: -moz-linear-gradient(top,  #333,  #111);\
background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#333), to(#111));\
border-bottom-left-radius: 4px 4px;\
border-bottom-right-radius: 4px 4px;\
max-width: 70%;\
min-width: 330px;\
padding: 4px 10px;\
color: white;\
display: inline-block;\
}\
#urlshortener_inp{\
-moz-box-shadow: #444 0px 1px 0px;\
-webkit-box-shadow: #444 0px 1px 0px;\
background: #eaeaea;\
border: 1px solid black;\
border-radius: 3px;\
color: #242424;\
padding: 4px 4px 2px;\
width: 240px;\
float: left;\
margin-right: 5px;\
}\
#yod_twitter_shortener_shortthis {\
background: -moz-linear-gradient(top,  #00ADEE,  #0078A5);\
background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#00ADEE), to(#0086b9));\
color: white;\
cursor: pointer;\
float: left;\
font-weight: bold;\
margin: 1px 0;\
padding: 1px 8px;\
border-radius: 2px;\
}\
#yod_twitter_shortener_result {\
cursor: pointer;\
float: left;\
margin: 3px auto;\
font-weight: bold;\
padding-left: 0;\
}\
#yod_twitter_shortener_result span {\
padding-left: 10px;\
}\
#yod_twitter_shortener_result a {\
color: white;\
}\
.yodButToggle {\
padding: 12px 5px 0px;\
width: 17px;\
height: 17px;\
cursor: pointer;\
float: left;\
}\
#yod_twitter_shortener_hidepanel {\
padding: 4px 10px 0px 0px;\
}\
";

function drawResult(str) {
  var res, sClass = 'normal';
  if (res = g('yod_twitter_shortener_result')) {
    if (!str) {
      str = '<img src="' + loading + '" border="0" />';
      sClass = 'loading';
    } else {
      if (isUrl(str))
        str = '<a href="' + str + '" target="_blank">' + str + '</a>';
      else sClass = 'failed';
    }
    res.innerHTML = '<span class="' + sClass + '">' + str + '</span>';
  }
}

function short_this() {
  var urlshort, res, sUrl;
  if (urlshort = g('urlshortener_inp')) {
    urlshort = urlshort.value;
    if (isUrl(urlshort)) {
      drawResult();
      _get('http://twitter.com/share?url=' + urlshort, function (response) {
        if (!(res = response.responseText)) return drawResult(failed);
        if (sUrl = regexx(res, />(?:\s|)(http:\/\/[^\s]+)<\/textarea/i)) {
          drawResult(sUrl.trim());
        } else drawResult(failed);
      }, function (response) {
        drawResult(failed);
      });
    } else {
      drawResult(failed);
    }
  }
}

function toggleShow() {
  var sClass, res, fail, obj = g('yod_twitter_shortener_wrapper');
  if(obj) {
    if (obj.style.display == 'none') {
      sClass = 'block';
      tweetshort_cfg['show'] = true;
    } else {
      sClass = 'none';
      tweetshort_cfg['show'] = false;
      res = g('yod_twitter_shortener_result');
      if (fail = res.getElementsByClassName('failed')) {
        if (fail.length) res.innerHTML = '';
      }
    }
    setValue('yod_showshortener', tweetshort_cfg['show']);
    obj.style.display = sClass;
  }
}

if ((logged = g('new-tweet')) && (logo = g('logo'))) {
  if (topstuff = g('top-stuff')) {
    var divwrap, div, button;
    add_style(mycss);
    divwrap = document.createElement('div');
    divwrap.id = 'yod_twitter_shortener_wrapper';
    div = document.createElement('div');
    div.id = 'yod_twitter_shortener_toolbar';
    div.className = 'yodButToggle';
    div.innerHTML = '<img src="' + showimg + '" title="Show/Hide Shortener Panel" />';
    div.addEventListener('click', toggleShow, false);
    insertAfter(div, logo);
    div = document.createElement('div');
    div.id = 'yod_twitter_shortener_container';
    button = document.createElement('div');
    button.innerHTML = '<img src="' + hideimg + '" title="Show/Hide Shortener Panel" />';
    button.id = 'yod_twitter_shortener_hidepanel';
    button.className = 'yodButToggle';
    div.appendChild(button);
    div.innerHTML += '<input value="" placeholder="your long url.." name="urlshortener" id="urlshortener_inp" type="text">';
    button = document.createElement('div');
    button.innerHTML = 'short';
    button.id = 'yod_twitter_shortener_shortthis';
    div.appendChild(button);
    div.innerHTML += '<div id="yod_twitter_shortener_result"></div>';
    divwrap.appendChild(div);
    topstuff.appendChild(divwrap);
    if (button = g('yod_twitter_shortener_shortthis')) {
      button.addEventListener('click', short_this, false);
      g('yod_twitter_shortener_hidepanel').addEventListener('click', toggleShow, false);
      tweetshort_cfg['show'] = getValue('yod_showshortener');
      if (!tweetshort_cfg['show']) {
        tweetshort_cfg['show'] = false;
        s(g('yod_twitter_shortener_wrapper'), 'display: none;');
      }
      setValue('yod_showshortener', tweetshort_cfg['show']);
    }
    s(logged.parentNode, 'width: auto !important; display: inline-table !important;');
  }
}
usoUpdate();
})();