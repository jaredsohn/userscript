(function () {
// ==UserScript==
// @name          No Advertise Please!
// @namespace     Advertise Gone
// @author        Scaranoe
// @version       2.1
// @run-at        document-start
// ==/UserScript==


function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function cleanUrl(s){s = s||""; return s.trim().replace(/[\u0080-\uFFFF]+/g, "").replace(/&amp;/ig, "&");}
function urldecode(str){return unescape(decodeURIComponent(escape(cleanUrl(str))));}
function isUrl(s){return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 89322,
  script_version : '2.3',
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
    this.doc = document.top || document;
    this.host = this.doc.location.hostname;
    this.href = urldecode(this.doc.location.href);
    this.head = urldecode(this.doc.head.innerHTML).replace(/\\/g, '');
    this.body = urldecode(this.doc.body.innerHTML).replace(/\\/g, '');
  },

  go : function (url, noredir) {
    usoUpdate();
    url = urldecode(url);
    if (!(isUrl(url))) return;
    //prompt("redirect to", url);
    this.doc.title = "AdsFight! : " + url;
    if (!noredir) this.doc.location = url;
  },

  setCookies : function (c) {
    var a, cooks = c.split(";");
    for (a in cooks) {
      if (c = cooks[a].trim()) this.doc.cookie = c + ";";
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
          this.doc.body.innerHTML = "";
          this.doc.body.appendChild(par.cloneNode());
          return this.go(par.src, 1);
        }
      }
    },

    adcraft : {
      hosts : "ad.cx | adcraft.co",
      fn : function () {
        if (rgx = regexx(this.body, /(https\:\/\/adcraft\.co\/go\/[^"]+)/i)) {
          return this.go(rgx);
        }
      }
    },

    adfly : {
      cookie : "PHPSESSID=;",
      hosts : "adf.ly | 9.bb | u.bb | j.gs | q.gs",
      fn : function () {
        var a, s;

        if (
            (rgx = regexx(this.head, /l\.php\?url=([^']+)/)) ||
            (rgx = regexx(this.head, /#skip_button.*href',\s?'([^']+)/)) ||
            (rgx = regexx(this.head, /url\s?=\s?'([^']+)/)) ||
            (g('adfly_bar') && (rgx = regexx(this.head, /self\.location.*?=.*?(http.*?)'/)))
          ) {
            return this.go(rgx);
        }

        if (rgx = regexx(this.href, /\d+\/(http.*?)$/i)) {
          return this.go(rgx);
        }

        if (rgx = regexx(this.href, /\/locked\/[a-z\d\-]+\/?/i)) {
          if (a = c1(".//a", g('continue'))) {
            s = a.href.trim();
            if (!(regexx(s, /^(https?)/))) a.href = this.host + s;
            this.go(a.href);
          }
        }
      }
    },

    adfocus : {
      hosts : "adfoc.us",
      fn : function () {
        if (rgx = regexx(this.body, /src="(\/js\/serve\.interstitial.*)"/i)) {
          return getHTML("http://adfoc.us" + rgx,
            function(r) {
              if (rgx = regexx(urldecode(r), /showSkip.*<a\shref="([^"]+)/i)) {
                return this.go(rgx);
              }
            }
          );
        }
      }
    },

    awsclic : {
      hosts : "awsclic.com",
      fn : function () {
        if (rgx = regexx(this.body, /acceder\.png.*?alt="([^"]+)/i)) {
          return this.go(rgx);
        }
      }
    },

    bybme : {
      hosts : "byb.me",
      fn : function () {
        if (rgx = regexx(this.head, /#skip_button.*?href".*?,.*?"([^"]+)/i)) {
          return this.go(rgx);
        }
      }
    },

    gen_winloc : {
      hosts : "zpag.es",
      fn : function () {
        if (rgx = regexx(this.head, /window\.location\s?=\s?"([^"]+)/i)) {
          return this.go(rgx);
        }
      }
    },

    ityim : {
      hosts : "ity.im",
      fn : function () {
        if (par = c1(".//frameset[contains(@id,'topandbottom')]")) {
          if (el = c1(".//frame[contains(@id,'main')]", par) || c1(".//frame[contains(@src,'interheader.php')]")) {
            return this.go(el.src);
          }
        }

        str = "";
        if (c1(".//input[contains(@name,'MouseX')]") && c1(".//input[contains(@name,'MouseY')]")) {

          if (rgx = regexx(this.body, /krypted=(0x.*?)&/)) {
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

    linkbucks : {
      hosts : "allanalpass.com | amy.gs | any.gs | baberepublic.com | deb.gs | drstickyfingers.com | dyo.gs | fapoff.com | filesonthe.net | galleries.bz | hornywood.tv | linkbabes.com | linkbucks.com | linkgalleries.net | linkseer.net | miniurls.co | picbucks.com | picturesetc.net | placepictures.com | poontown.net | qqc.co | qvvo.com | realfiles.net | rqq.co | seriousdeals.net | seriousfiles.com | seriousurls.com | sexpalace.gs | theseblogs.com | thesefiles.com | theseforums.com | thosegalleries.com | tinybucks.net | tinylinks.co | tnabucks.com | tubeviral.com | uberpicz.com | ubervidz.com | ubucks.net | ugalleries.net | ultrafiles.net | urlbeat.net | urlpulse.net | whackyvidz.com | youfap.me | yyv.co | zxxo.net | zff.co",
      fn : function () {
        if (rgx = this.href.match(/(\/verify\/+)$/i)) {
          return this.go(this.href.replace(rgx[1], ''));
        }
        if (rgx = regexx(this.body, /Lbjs\.TargetUrl\s?=\s?'([^']+)/i)) {
          return this.go(rgx);
        }
      }
    },

    lnk : {
      hosts : "linkbee.com | lnk.co",
      fn : function () {
        if (
            (rgx = regexx(this.body, /id="urlholder"\svalue="([^"]+)/i)) ||
            (rgx = regexx(this.body, /id="dest"\ssrc="([^"]+)/i))
          ) {
            return this.go(rgx);
        }
      }
    },

    urlcash : {
      hosts : "bat5.com | celebclk.com | eightteen.com | looble.net | peekatmygirlfriend.com | pornyhost.com | smilinglinks.com | urlcash.net | urlcash.org | xxxs.org",
      fn : function () {
        if (rgx = regexx(this.body, /linkDestUrl\s?=\s?'([^']+)/i)) {
          return this.go(rgx);
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