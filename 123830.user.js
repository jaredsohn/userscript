(function () {
// ==UserScript==
// @name          Get past adf.ly links!
// @description   Chrome/firefox only. Dunno who made the orignal, but I give credit to them!
// @version       2.6

// ===========================================================
// rest : image host :
// ===========================================================
// @match         http://*.imgchili.com/show/*
// @match         http://*.imagearn.com/image.php?id=*
// @match         http://*.imageswitch.com/*/*
// @match         http://*.imageporter.com/*/*
// @match         http://*.imagetwist.com/*/*
// @match         http://*.cocoimage.com/img.php?*
// @match         http://*.imagehaven.net/img.php?*
// @match         http://*.imagevenue.com/img.php?*
// @match         http://*.turboimagehost.com/p/*
// @match         http://*.pixhost.org/show/*

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
// @match         http://*.adfoc.us/serve/?id=*

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
// @match         http://*.zpag.es/*
// @match         http://*.feedsportal.com/*

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
// @match         http://lix.in/-*

// ===========================================================
// lnk :
// ===========================================================
// @match         http://*.lnk.co/*
// @match         http://*.linkbee.com/*

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
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 89322,
  script_version : '2.6',
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
    Extra.host = Extra.doc.location.hostname;
    Extra.href = urldecode(Extra.doc.location.href);
    Extra.head = urldecode(Extra.doc.head.innerHTML).replace(/\\/g, '');
    Extra.body = urldecode(Extra.doc.body.innerHTML).replace(/\\/g, '');
  },

  go : function (url, noredir) {
    usoUpdate();
    url = urldecode(url);
    if (!(isUrl(url))) return;
    //prompt("redirect to", url);
    Extra.doc.title = "AdsFight! : " + url;
    if (!noredir) Extra.doc.location = url;
  },

  setCookies : function (c) {
    var a, cooks = c.split(";");
    for (a in cooks) {
      if (c = cooks[a].trim()) Extra.doc.cookie = c + ";";
    }
  },

  services : {/*
    dummy : {
      hosts : [""],
      fn : function () {
      }
    },*/

    rest : {
      cookie : "entercook=1;",// | cocoimage.com
      hosts : "",
      css : "\
          * {background: #fff none !important;}\
          #interContainer, #interVeil,\
          #blanket, #popUpDiv1\
          {display: none! important;}\
        ",
      fn : function () {
        if (par = c1(".//img[contains(@onload,'scale')]")
          //|| c1(".//img[contains(@onload,'ImgFitWin')]")
          || c1(".//img[contains(@src,'imageporter.com/i/')]")
          || c1(".//img[contains(@src,'img.imagearn.com/imags/')][@id='img']")
        ) {
          Extra.doc.body.innerHTML = "";
          Extra.doc.body.appendChild(par.cloneNode());
          return Extra.go(par.src, 1);
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
      cookie : "PHPSESSID=;",
      hosts : "adf.ly | 9.bb | u.bb | j.gs | q.gs",
      fn : function () {
        var a, s;

        if (
            (rgx = regexx(Extra.head, /l\.php\?url=([^']+)/)) ||
            (rgx = regexx(Extra.head, /#skip_button.*href',\s?'([^']+)/)) ||
            (rgx = regexx(Extra.head, /url\s?=\s?'([^']+)/)) ||
            (g('adfly_bar') && (rgx = regexx(Extra.head, /self\.location.*?=.*?(http.*?)'/)))
          ) {
            return Extra.go(rgx);
        }

        if (rgx = regexx(Extra.href, /\d+\/(http.*?)$/i)) {
          return Extra.go(rgx);
        }

        if (rgx = regexx(Extra.href, /\/locked\/[a-z\d\-]+\/?/i)) {
          if (a = c1(".//a", g('continue'))) {
            s = a.href.trim();
            //if (!(regexx(s, /^(https?)/))) a.href = Extra.host + s;
            if (regexx(s, /^\//)) a.href = Extra.host + s;
            Extra.go(a.href);
          }
        }
      }
    },

    adfocus : {
      hosts : "adfoc.us",
      fn : function () {
        if (rgx = regexx(Extra.body, /src="(\/js\/serve\.interstitial.*)"/i)) {
          return getHTML("http://adfoc.us" + rgx,
            function(r) {
              if (rgx = regexx(urldecode(r), /showSkip.*<a\shref="([^"]+)/i)) {
                return Extra.go(rgx);
              }
            }
          );
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
      hosts : "zpag.es | feedsportal.com",
      fn : function () {
        if (
          (rgx = regexx(Extra.head, /window\.location\s?=\s?"([^"]+)/i))
          || (rgx = regexx(Extra.body, /location\.href\s?=\s?'([^']+)/i))
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

        s = "";
        if (c1(".//input[contains(@name,'MouseX')]") && c1(".//input[contains(@name,'MouseY')]")) {

          if (rgx = regexx(Extra.body, /krypted=(0x.*?)&/)) {
            var h = rgx;
            rgx = 'ksnslmtmk0v4Pdviusajqu';
            s += 'if(typeof exitAlert===\'function\')window.removeEventListener(\'beforeunload\',exitAlert,false);\
            if(parent.aredir)parent.aredir=true;if(top.aredir)top.aredir=true;\
            fdec=typeof des===\'function\'?\'des\':\'descrypt\';\
            h=eval(fdec+"(\''+rgx+'\',hexToString(\''+h+'\'),0,0)");\
            /*alert(h);*/top.window.location=\'http://ity.im/0_0_0_\'+h;';
          }
        }

        s += 'if(typeof redirect===\'function\'){if(parent)redirect();}';
        appendJS("script", s);
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

function doExec(rest) {
  var fn, css;
  for (i in Extra.services) {
    var doc, hosts = Extra.services[i].hosts.replace(/\s/g, "") || "";
    if (!rest && !hosts) continue;
    if (hosts) {
      var pattern = new RegExp(".?(" + hosts + "+)$", "i");
      doc = regexx(Extra.host, pattern);
    }
    if (rest || doc) {
      if (fn = Extra.services[i].fn) fn.apply(Extra);
      if (css = Extra.services[i].css) appendJS("style", css, "adsfight_css");
      if (cookie = Extra.services[i].cookie) Extra.setCookies(cookie);
      return;
    }
  }
  doExec(true);
}

function doStuff() {
  Extra.init();
  doExec();
  setTimeout(doExec, 5000); // 5" re fire!
}

//alert("called");
document.addEventListener("DOMContentLoaded", doStuff, true);
})();