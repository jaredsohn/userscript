(function () {
// ==UserScript==
// @name           IMFb (IMDB to Facebook Adv Share)
// @namespace      http://blog.krakenstein.net
// @author         daYOda (Krakenstein)
// @description    Take advanced IMDB to Facebook infos sharing (incl. rating, people, genre, etc)
// @version        1.5
// @updateURL      https://userscripts.org/scripts/source/97273.meta.js
// @match          http://www.imdb.com/title/tt*/*
// @match          http://www.imdb.com/media/rm*/*
// @run-at         document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 97273,
  script_version : '1.5',
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
      //sSrc += '&redir=yes';
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
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function urldecode(str){return unescape(decodeURIComponent(escape(str)));}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(urldecode(s));}
function st(s){return s.replace(/(<([^>]+)>)/gi,"")}

var main, overview, el, target, tpl, html;
var redirect_uri = "http://www.facebook.com/", feed = redirect_uri + "dialog/feed?", app_id = "115109575169727";
var picture, name, link, caption, description, category, ratings, info, people, more, message, trailers;

function remAttr(el, attrs) {
  var i = 0; do {
    el.removeAttribute(attrs[i++]);
  } while (i < attrs.length);
}

function ytrim(s) {
  var str = '';
  if (!(str = st(s.toString()).replace(/[\u0080-\uFFFF]+/g, '').trim())) return str;
  var lines = str.replace(/^\s+|\s+$/g, '').split(/\s*\n\s*/);
  str = lines.join(' ').replace(/[\s]{2,}/, ' ');
  return str.replace(/"/g, '\'');
}

function toDefault(txt, def, nq) {
  if (!txt) txt = def;
  var json = txt.match(/^\s?\{.*\}\s?$/);
  if (!json && !nq) txt = "\"" + txt + "\"";
  return txt;
}

function doExec() {
if ((main = g('wrapper')) && (overview = g('overview-top')) && (target = g("overview-bottom"))) { // FB Sharer
  // image thumbnails
  if (el = c1(".//td[contains(@id,'img_primary')]/a/img", main)) {
    if (isUrl(url= ytrim(el.src))) picture = url;
  } else if (el = c1(".//meta[contains(@property,'og:image')]")) {
    if (isUrl(url= ytrim(el.getAttribute('content')))) picture = url;
  } else return;

  if (!isUrl(picture)) return;

  // movie title
  if (el = c1(".//meta[contains(@name,'title')]"))
    name = ytrim(el.getAttribute('content'));
  name = toDefault(name, 'no title', 1).replace(/\s\((\d+){4}\).*$/, "");

  // link to this page
  link = ytrim(document.location.toString());

  // eq to link
  caption = link;

  // summary
  if (el = c1(".//p[2]", overview))
    description = ytrim(el.innerHTML.replace(/(<a\s.*?href.*?)$/gm, ''));
  description = toDefault(description, 'no description', 1);

  // people ; director, writer, act
  if (el = c1(".//meta[contains(@name,'description')]"))
    people = ytrim(el.getAttribute('content'));
  people = toDefault(people, '-');

  // duration, genres, premiere
  if (el = c1(".//div[contains(@class,'infobar')]", overview))
    info = ytrim(el.textContent.replace(/[^\d\w\-\|]+/gi, ' '));
  info = toDefault(info, 'no infos');

  // photo, video, & reviews
  if (el = c1(".//div[contains(@class,'see-more')]")) {
    more = ytrim(el.textContent.replace(/[^\d\w\-\|]+/gi, ' '));
  }
  more = toDefault(more, '-');

  // ratings
  if (el = c1(".//span[contains(@itemprop,'ratingValue')]", overview)) {
    ratings = ytrim(el.textContent)/* + "/10"*/;
    if (el = c1(".//span[contains(@itemprop,'ratingCount')]", overview)) {
      ratings += " (" + ytrim(el.textContent) + " votes)";
    }
  }
  ratings = toDefault(ratings, '-');

  // predefine message
  //message = ytrim("");

  // trailers
  if (el = c1(".//a", target))
    if (isUrl(url= ytrim(el.href))) trailers = '{"text": "Watch trailers","href": "' + url + '"}';
  trailers = toDefault(trailers, "no trailers");

  // flag :)
  by = '{"text": "IMFb (USO v' + yodUpdate["script_version"] + ')","href": "http://userscripts.org/scripts/show/' + yodUpdate["script_id"] + '"}';

  properties = '{"Info": ' + info + ',"People":' + people + ',"More":' + more + ',"Trailers": ' + trailers + ',"Ratings":' + ratings + ',"By": ' + by + '}';

  var html = '<div style="clear:both;"><ul style=" list-style: none; display: inline; padding: 0;">';

  tpl = feed  +
    //"to=&" +
    "app_id=" + app_id +
    "&properties=" + escape(properties) +
    "&link=" + link +
    "&picture=" + picture +
    "&caption=" + caption +
    "&description=" + escape(description) +
    //"&message=" + message +
    "&redirect_uri=" + redirect_uri;

  //style = 'float:right!important;';
  style = 'display: inline-block; margin-right: 5px; padding: 0;';

  html += '<li style="' + style + '"><a target="_blank" href="' + tpl + '" title="ADVANCED Share to Facebook" class="btn large primary title-trailer">IMFb<!-- (v' + yodUpdate['script_version'] + ') --></a></li>';

  html += '<li style="' + style + '"><a target="_blank" href="http://subscene.com/filmsearch.aspx?q=' + escape(name) + '" title="Subtitle - Subscene" class="btn large primary title-trailer">Subscene</a></li>';

  html += '<li style="' + style + '"><a target="_blank" href="http://www.podnapisi.net/en/ppodnapisi/search?sK=' + escape(name) + '" title="Subtitle - Podnapisi" class="btn large primary title-trailer">Podnapisi</a></li>';

  name += ' trailer';

  html += '<li style="' + style + '"><a target="_blank" href="https://www.youtube.com/results?q=' + escape(name) + '" title="Trailer - Youtube" class="btn large primary title-trailer">Youtube</a></li>';

  html += '</ul>';

  target.innerHTML += html;
} else { // Image direct link
  var imgwrap, target, box;
  if (imgwrap = g('primary-img')) {
    if (imgwrap.src && (target = g('controls-bottom'))) {
      box = document.createElement("div");
      box.setAttribute('style', 'text-align:center; margin: 20px 0 10px;');
      box.innerHTML = '<span style="font-size: 15px!important; font-weight: bold;">\
        -[ <a href="' + imgwrap.src + '" target="_blank">Download Image</a> ]-</span><br />\
        <small>more scripts ; <a href="http://blog.krakenstein.net" target="_blank">krakenstein</a></small>';
      target.parentNode.insertBefore(box, target);
    }
    remAttr(imgwrap, ["onmousedown", "onmousemove", "oncontextmenu"]);
  }
}
usoUpdate();
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();