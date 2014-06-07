(function () {
// ==UserScript==
// @name          Skip Ads!!!
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   Skip Unwanted Ads
// @version       1.o
// @updateURL     http://www.myshared4u.blogspot.in

// ===========================================================
// rest : image host :
// ===========================================================
// @match         http://*.imgchili.com/show/*
// @match         http://*.imagearn.com/image.php?id=*
// @match         http://*.imagebam.com/image/*
// @match         http://*.imageswitch.com/*/*
// @match         http://*.imageporter.com/*/*
// @match         http://*.imagetwist.com/*/*
// @match         http://*.cocoimage.com/img.php?*
// @match         http://*.imagehaven.net/img.php?*
// @match         http://*.imagevenue.com/img.php?*
// @match         http://*.turboimagehost.com/p/*
// @match         http://*.pixhost.org/show/*
// @match         http://*.hotimg.com/image/*
// @match         http://*.imagecherry.com/*
// @match         http://*.imagebunk.com/*

// ===========================================================
// adcraft :
// ===========================================================
// @match         https://*.ad.cx/*
// @match         https://*.adcraft.co/*

// ===========================================================
// adfly :
// ===========================================================
// @match         http://*.adf.ly/*
// @match         http://*.9.bb/*
// @match         http://*.u.bb/*
// @match         http://*.j.gs/*
// @match         http://*.q.gs/*

// ===========================================================
// adfocus :
// ===========================================================
// @match         http://*.adfoc.us/*

// ===========================================================
// awsclic :
// ===========================================================
// @match         http://*.awsclic.com/l/*

// ===========================================================
// bybme :
// ===========================================================
// @match         http://*.byb.me/*

// ===========================================================
// gen_winloc :
// ===========================================================
// @match         http://*.1tiny.net/*
// @match         http://*.feedsportal.com/*
// @match         http://*.redir.su/*
// @match         http://*.zpag.es/*

// ===========================================================
// gen_url :
// ===========================================================
// @match         http://*.anonym.to/*

// ===========================================================
// ityim :
// ===========================================================
// @match         http://*.ity.im/*

// ===========================================================
// lienscash :
// ===========================================================
// @match         http://*.lienscash.com/l/*

// ===========================================================
// linkbucks :
// ===========================================================
// @match         http://*.allanalpass.com/*
// @match         http://*.amy.gs/*
// @match         http://*.any.gs/*
// @match         http://*.baberepublic.com/*
// @match         http://*.deb.gs/*
// @match         http://*.drstickyfingers.com/*
// @match         http://*.dyo.gs/*
// @match         http://*.fapoff.com/*
// @match         http://*.filesonthe.net/*
// @match         http://*.galleries.bz/*
// @match         http://*.hornywood.tv/*
// @match         http://*.linkbabes.com/*
// @match         http://*.linkbucks.com/*
// @match         http://*.linkgalleries.net/*
// @match         http://*.linkseer.net/*
// @match         http://*.miniurls.co/*
// @match         http://*.picbucks.com/*
// @match         http://*.picturesetc.net/*
// @match         http://*.placepictures.com/*
// @match         http://*.poontown.net/*
// @match         http://*.qqc.co/*
// @match         http://*.qvvo.com/*
// @match         http://*.realfiles.net/*
// @match         http://*.rqq.co/*
// @match         http://*.seriousdeals.net/*
// @match         http://*.seriousfiles.com/*
// @match         http://*.seriousurls.com/*
// @match         http://*.sexpalace.gs/*
// @match         http://*.seriousfiles.com/*
// @match         http://*.theseblogs.com/*
// @match         http://*.thesefiles.com/*
// @match         http://*.theseforums.com/*
// @match         http://*.thosegalleries.com/*
// @match         http://*.tinybucks.net/*
// @match         http://*.tinylinks.co/*
// @match         http://*.tnabucks.com/*
// @match         http://*.tubeviral.com/*
// @match         http://*.uberpicz.com/*
// @match         http://*.ubervidz.com/*
// @match         http://*.ubucks.net/*
// @match         http://*.ugalleries.net/*
// @match         http://*.ultrafiles.net/*
// @match         http://*.urlbeat.net/*
// @match         http://*.urlpulse.net/*
// @match         http://*.whackyvidz.com/*
// @match         http://*.youfap.me/*
// @match         http://*.yyv.co/*
// @match         http://*.zxxo.net/*
// @match         http://*.zff.co/*

// ===========================================================
// lix_in :
// ===========================================================
// @match         http://*.lix.in/-*

// ===========================================================
// lnk :
// ===========================================================
// @match         http://*.lnk.co/*
// @match         http://*.linkbee.com/*

// ===========================================================
// lnx_lu :
// ===========================================================
// @match         http://*.lnx.lu/*

// ===========================================================
// seomafia :
// ===========================================================
// @match         http://*.seomafia.net/*

// ===========================================================
// _1to4_me :
// ===========================================================
// @match         http://*.1to4.me/*

// ===========================================================
// mirrorcreator :
// ===========================================================
// @match         http://*.mirrorcreator.com/redirect/*
// @match         http://*.upmirror.info/mirrors/*

// ===========================================================
// adcou_ch :
// ===========================================================
// @match         http://*.adcou.ch/*


// ===========================================================
// urlcash :
// ===========================================================
// @match         http://*.bat5.com/*
// @match         http://*.celebclk.com/*
// @match         http://*.eightteen.com/*
// @match         http://*.looble.net/*
// @match         http://*.peekatmygirlfriend.com/*
// @match         http://*.pornyhost.com/*
// @match         http://*.smilinglinks.com/*
// @match         http://*.urlcash.net/*
// @match         http://*.urlcash.org/*
// @match         http://*.xxxs.org/*

// @run-at        document-start
// ==/UserScript==

/*

This is renamed, re bundled versions of our :

- Fly-Ads-Fly (adf.ly / 9.bb / u.bb) auto Redirect (http://userscripts.org/89322)
- ity.im auto Redirect (http://userscripts.org/107588)
- linkbucks auto Redirect (http://userscripts.org/98037)
- adfoc.us auto Redirect (http://userscripts.org/116354)

Most influenced by :
- iHatePaidLinks (http://userscripts.org/105301)
- RedirectionHelper (http://userscripts.org/69797)

*/

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function cleanUrl(s){s = s||""; return s.trim().replace(/[\u0080-\uFFFF]+/g, "").replace(/&amp;/ig, "&");}
function urldecode(str){return unescape(decodeURIComponent(escape(cleanUrl(str))));}
function isUrl(s){return /^(https?):\/\/((([0-9]{1,3}\.){3,}\d+)|([0-9a-z]+)\.([a-z]{2,3}))\/?/ig.test(s.trim());}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 89322,
  script_version : '4.1',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
  script_name : 'Skip Ads By Deep Singh',
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
  const s_Redir = true;
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

function appendJS(tag, str, id, head, link) {
  var doctype, tag = tag.toLowerCase().trim();
  var isJS = false;
  switch(tag) {
    case 'script':
      doctype = 'text/javascript';
      isJS = true;
      break;
    case 'style':
      doctype = 'text/css';
      head = true;
      break;
    default:
      return;
  }

  var target, s_gm = document.createElement(tag);
  if (id) {
    if (document.getElementById(id)) return;
    else s_gm.id = id;
  }

  s_gm.type = doctype;

  if (link) s_gm.src = str;
  else s_gm.textContent = str;

  if (head) target = document.getElementsByTagName('head')[0];
  else if (document.body) target = document.body;

  if (target) target.appendChild(s_gm);
  return s_gm;
}

function getHTML(url, callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(r) {
      callback(r.responseText);
    }
  });
}

var rgx, par, el, str;
var Extra = {
  init : function () {
    Extra.doc = document.top || document;
    Extra.win = window.top || window;
    Extra.host = Extra.doc.location ? Extra.doc.location.hostname : '';
    Extra.pathname = Extra.doc.location ? Extra.doc.location.pathname : '';
    Extra.protocol = Extra.doc.location ? Extra.doc.location.protocol : '';
    Extra.href = Extra.doc.location ? urldecode(Extra.doc.location.href) : '';
    Extra.head = Extra.doc.head ? urldecode(Extra.doc.head.innerHTML).replace(/\\/g, '') : '';
    Extra.body = Extra.doc.body ? urldecode(Extra.doc.body.innerHTML).replace(/\\/g, '') : '';
    Extra.cdwn = 0;
    Extra.inval = 0;
    Extra.passed = 0;
  },

  stamp : function() {
    Extra.doc.title = "Skip Ads!!!";
  },

  countDown : function() {
    var title = "Skip Ads!!!";
    Extra.cdwn -= 1000;
    if (Extra.cdwn >= 1000) title += " Wait " + (Extra.cdwn / 1000) + "\"";
    else { Extra.win.clearInterval(Extra.inval);/* Extra.win.stop();*/ }
    Extra.doc.title = title;
  },

  efall : function (str, o) {
    if (!o) {
      if (s = c1(".//script[contains(text(),'"+str+"')]")) {
        o = s.innerHTML;
      }
    }
    if (o) {
      eval(o);
      return Extra.go(eval(str));
    }
  },

  go : function (url, noredir) {
    url = urldecode(url);
    if (!regexx(url, /^https?/)) {
      url = Extra.protocol + "//" + Extra.host + "/" + url.replace(/^\//, "");
    }
    if (!(isUrl(url))) return;
    Extra.stamp();
    if (url.match(/^(https?:\/\/)?(www\.)?mediafire\.com\//)) url = "http://nullrefer.com/?" + url;
    if (!noredir) {
      var delay = (Extra.cdwn && parseInt(Extra.cdwn)) ? Extra.cdwn : 1;
      if (Extra.cdwn >= 1000) Extra.inval = Extra.win.setInterval(Extra.countDown, 1000);
      return setTimeout(function() {
        Extra.win.location.href = url;
      }, delay);
    }
  },

  hook : function (c) {
    var t = Extra.doc.head || Extra.doc.body;
    var s = document.createElement('script');
    s.innerHTML = c;
    t.appendChild(s);
  },

  setCookies : function (c) {
    var a, b, cooks = c.split(";");
    for (a in cooks) {
      c = cooks[a];
      if (c = c.trim()) Extra.doc.cookie = c + ";";
    }
  },

  doRemove : function (ev) {
    var el = ev.target;
    ev.preventDefault();
    el.parentNode.removeChild(el);
    return false;
  },

  bodyRemover : function () {
    Extra.doc.body.addEventListener("DOMNodeInserted", Extra.doRemove, false);
  },

  services : {/*
    dummy : {
      hosts : [""],
      fn : function () {
      }
    },*/

    rest : {
      cookie : "entercook=1;",// | cocoimage.com
      hosts : "imgchili.com | imagearn.com | imagebam.com | imageswitch.com | imageporter.com | imagetwist.com | cocoimage.com | imagehaven.net | imagevenue.com | turboimagehost.com | pixhost.org | hotimg.com | imagecherry.com | imagebunk.com",
      css : "\
          #interContainer, #interVeil, #blanket, #popUpDiv1 {display: none !important;}\
          #yod_p_center {text-align: center !important;z-index: 999 !important;}\
        ",
      fn : function () {
        if (par = (c1(".//img[contains(@onload,'scale')]")
          || c1(".//img[contains(@onclick,'scale')]")
          || c1(".//img[contains(@src,'imageporter.com/i/')]")
          || c1(".//img[contains(@src,'img.imagearn.com/imags/')][@id='img']")
          || c1(".//img[contains(@onload,'ImgFitWin')]")
          || c1(".//img[contains(@onclick,'adjustImage')]")
        )) {
          var p, el = document.createElement('img');
          el.src = par.src;
          Extra.doc.body.innerHTML = "";
          //Extra.doc.body.appendChild(par.cloneNode());
          p = document.createElement('p'); p.id = "yod_p_center";
          p.appendChild(el);
          Extra.doc.body.appendChild(p);
          Extra.bodyRemover();
          return Extra.go(par.src, 1);
        }
        if (par = c1(".//div/a[@class='subButton']")) {
          return Extra.go(par.href);
        }
      }
    },

    gen_url : {
      hosts : "anonym.to",
      fn : function () {
        if (rgx = regexx(Extra.href, /\/\?(.+)$/i)) {
          return Extra.go(rgx);
        }
      }
    },

    adcraft : {
      hosts : "ad.cx | adcraft.co",
      fn : function () {
        if (rgx = regexx(Extra.body, /(https\:\/\/adcraft\.co\/go\/[^"]+)/i)) {
          return Extra.go(rgx);
        }
      }
    },

    adfly : {
      cookie : "PHPSESSID=;adf1=;adf2=;adf3=;adf4=;",
      hosts : "adf.ly | 9.bb | u.bb | j.gs | q.gs",
      fn : function () {

        var a, s, c = 0;

        if (a = g('skip_button')) {
          if (isOpera) Extra.doc.addEventListener("DOMAttrModified", function () {
            if (!Extra.passed && isUrl(a.href)) return Extra.go(a.href);
          }, false);
          else Extra.doc.addEventListener("DOMSubtreeModified", function () {
            if (!Extra.passed && isUrl(a.href)) return Extra.go(a.href);
          }, false);
        }

        if (
          (rgx = regexx(Extra.href, /int\/.*?(http.*?)$/i)) ||
          (rgx = regexx(Extra.href, /\d+\/((https?\:\/\/)?[0-9a-z\-].+)$/i))
        ) {
          if (!regexx(rgx, /^https?/)) rgx = "http://" + rgx;
          if (isUrl(rgx)) return Extra.go(rgx);
        }

        if (
            (rgx = regexx(Extra.head, /l\.php\?url=([^']+)/)) ||
            (rgx = regexx(Extra.head, /#skip_button.*href',\s?'([^']+)/)) ||
            (rgx = regexx(Extra.head, /url\s?=\s?'([^']+)/)) ||
            (g('adfly_bar') && (rgx = regexx(Extra.head, /self\.location.*?=.*?(http.*?)'/)))
          ) {
          var pattern = new RegExp("(" + Extra.host + "/)?go/", "i");
          if (regexx(rgx, pattern)) Extra.cdwn = 8000; Extra.passed = 1;
          return Extra.go(rgx, false);
        }

        if (rgx = regexx(Extra.href, /\/locked\/([a-z0-9\-\_]+)\/?/i)) {
          if (a = c1(".//a", g('continue'))) {
            return Extra.go(a.href);
          }
        }
      }
    },

    adfocus : {
      hosts : "adfoc.us",
      fn : function () {
        if (rgx = regexx(Extra.body, /(\/serve\.?\/?interstitial.*)"/i)) {
          return getHTML("http://adfoc.us" + rgx,
            function(r) {
              if (rgx = regexx(urldecode(r), /showSkip.*<a.*href="([^"]+)/i)) {
                return Extra.go(rgx);
              }
            }
          );
        } /*else if (rgx = regexx(Extra.body, /(http\:\/\/adfoc\.us\/serve\/click\/.[^'"]+)/i)) {
          return Extra.go(rgx);
        }*/ else {
          return Extra.efall('click_url');
        }
      }
    },

    awsclic : {
      hosts : "awsclic.com",
      fn : function () {
        if (rgx = regexx(Extra.body, /acceder\.png.*?alt="([^"]+)/i)) {
          return Extra.go(rgx);
        }
      }
    },

    bybme : {
      hosts : "byb.me",
      fn : function () {
        if (rgx = regexx(Extra.head, /#skip_button.*?href".*?,.*?"([^"]+)/i)) {
          return Extra.go(rgx);
        }
      }
    },

    gen_winloc : {
      hosts : "1tiny.net | feedsportal.com | redir.su | redir.su | zpag.es",
      fn : function () {
        if (
          (rgx = regexx(Extra.head, /window\.location\s?=\s?"([^"]+)/i))
          || (rgx = regexx(Extra.body, /location(?:\.href|)\s?=\s?'([^']+)/i, 1))
          //|| (rgx = regexx(Extra.body, /var\slink\s?=\s?'([^']+)/i))
          || (rgx = regexx(Extra.body, /href="([^"]+).*redirected/i))
        ) {
          return Extra.go(rgx);
        }
      }
    },

    ityim : {
      hosts : "ity.im",
      fn : function () {
        if (par = c1(".//frameset[contains(@id,'topandbottom')]")) {
          if (el = c1(".//frame[contains(@id,'main')]", par) || c1(".//frame[contains(@src,'interheader.php')]")) {
            return Extra.go(el.src);
          }
        }
        return Extra.hook('if(typeof redirect===\'function\'){if(parent)redirect();}');
      }
    },

    lnx_lu : {
      hosts : "lnx.lu",
      fn : function () {
        if (el = c1(".//a/img[contains(@src,'skipadbtn')]")) {
          return Extra.go(el.parentNode.href);
        }
      }
    },

    lienscash : {
      hosts : "lienscash.com",
      fn : function () {
        if (el = c1(".//span/a[@class='redirect']")) {
          return Extra.go(el.href);
        }
      }
    },

    linkbucks : {
      hosts : "allanalpass.com | amy.gs | any.gs | baberepublic.com | deb.gs | drstickyfingers.com | dyo.gs | fapoff.com | filesonthe.net | galleries.bz | hornywood.tv | linkbabes.com | linkbucks.com | linkgalleries.net | linkseer.net | miniurls.co | picbucks.com | picturesetc.net | placepictures.com | poontown.net | qqc.co | qvvo.com | realfiles.net | rqq.co | seriousdeals.net | seriousfiles.com | seriousurls.com | sexpalace.gs | theseblogs.com | thesefiles.com | theseforums.com | thosegalleries.com | tinybucks.net | tinylinks.co | tnabucks.com | tubeviral.com | uberpicz.com | ubervidz.com | ubucks.net | ugalleries.net | ultrafiles.net | urlbeat.net | urlpulse.net | whackyvidz.com | youfap.me | yyv.co | zxxo.net | zff.co",
      fn : function () {
        Extra.hook('Lbjs.IsClick=1;');
        if (rgx = regexx(Extra.href, /(\/verify\/+)$/i)) {
          return Extra.go(Extra.href.replace(rgx, ''));
        }
        if (rgx = regexx(Extra.body, /Lbjs\.TargetUrl\s?=\s?'([^']+)/i)) {
          return Extra.go(rgx);
        }
      }
    },

    lix_in : {
      hosts : "lix.in",
      fn : function () {
        if ((par = c1(".//form/input[@name='tiny']")) && (a = c1(".//input[@type='submit']", par.parentNode))) {
          a.click();
        } else if (a = c1(".//iframe[@name='ifram']")) {
          return Extra.go(a.src);
        }
      }
    },

    lnk : {
      hosts : "linkbee.com | lnk.co",
      fn : function () {
        if (
            (rgx = regexx(Extra.body, /id="urlholder"\svalue="([^"]+)/i)) ||
            (rgx = regexx(Extra.body, /id="dest"\ssrc="([^"]+)/i))
          ) {
            return Extra.go(rgx);
        }
      }
    },

    seomafia : {
      hosts : "seomafia.net",
      fn : function () {
        if (a = c1(".//a[contains(@title,'Click to proceed')]")) {
          return Extra.go(a.href);
        }
      }
    },

    adcou_ch : {
      hosts : "adcou.ch",
      fn : function () {
        if (a = c1(".//div[contains(@id,'SkipAd')]/a")) {
          return Extra.go(a.href);
        }
      }
    },

    _1to4_me : {
      hosts : "1to4.me",
      fn : function () {
        if (a = c1(".//p[contains(@class,'continue')]/a")) {
          return Extra.go(a.href);
        }
      }
    },

    mirrorcreator : {
      hosts : "mirrorcreator.com | upmirror.info",
      fn : function () {
        if (
          (a = c1(".//div[@id='redirectlink']/a"))
          || (a = c1(".//div[contains(@id,'download_url')]/a"))
        ) {
          return Extra.go(a.href);
        }
      }
    },

    urlcash : {
      hosts : "bat5.com | celebclk.com | eightteen.com | looble.net | peekatmygirlfriend.com | pornyhost.com | smilinglinks.com | urlcash.net | urlcash.org | xxxs.org",
      fn : function () {
        if (rgx = regexx(Extra.body, /linkDestUrl\s?=\s?'([^']+)/i)) {
          return Extra.go(rgx);
        }
      }
    },
  }
}

function doExec() {
  var fn, css;
  for (i in Extra.services) {
    var doc, service = Extra.services[i];
    var hosts = service.hosts.replace(/\s/g, "") || "";
    if (!hosts) continue;
    var pattern = new RegExp(".?(" + hosts + "+)$", "i");
    if (doc = regexx(Extra.host, pattern)) {
      Extra.stamp();
      if (fn = service.fn) fn.apply(Extra);
      if (css = service.css) appendJS("style", css, "adsfight_css");
      if (cookie = service.cookie) Extra.setCookies(cookie);
      return;
    }
  }
}

function doStuff() {
  Extra.init();
  if (Extra.win.self !== Extra.win.top) return;
  usoUpdate();
  doExec();
  //setTimeout(doExec, 5000); // 5" re fire!
}

function yodStart() {
  if (isOpera) {
    return doStuff();
  }
  document.addEventListener("DOMContentLoaded", doStuff, true);
}

//if (self !== top) return;
var isOpera = regexx(navigator.userAgent, /opera/i);
yodStart();
})();


