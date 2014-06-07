(function () {
// ==UserScript==
// @name          AdsFight!
// @namespace     http://blog.thrsh.net
// @author        daYOda (THRSH)
// @description   Fight Naughty Ads, Go Fight For Your Right!
// @version       6.8
// @updateURL     https://userscripts.org/scripts/source/89322.meta.js
// Visit us http://ashafizullah.hol.es

// ===========================================================
// rest : image host :
// ===========================================================
// @match         http://*.xlocker.net/*
// @match         http://*.imgchili.com/show/*
// @match         http://*.imgchili.net/show/*
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
// @match         http://*.imgonion.com/*
// @match         http://*.imgbar.net/*
// @match         http://*.pimpandhost.com/*
// @match         http://*.imgdino.com/*
// @match         http://*.imgnip.com/*
// @match         http://*.imgtiger.com/*
// @match         http://*.imgpony.com/*
// @match         http://*.image2you.ru/*/*
// @match         http://*.sexyimg.com/*/*
// @match         http://*.yankoimages.net/*
// @match         http://*.qrrro.com/*
// @match         http://*.comicalpic.net/img-*
// @match         http://*.imgserve.net/img-*
// @match         http://*.imgcloud.co/img-*
// @match         http://*.imgtube.net/img-*
// @match         http://*.imgpay.me/img-*
// @match         http://*.imgboo.me/img-*
// @match         http://*.imgcorn.com/img-*
// @match         http://*.imagecorn.com/img-*
// @match         http://*.imgsavvy.com/img-*
// @match         http://*.imgnext.com/img-*
// @match         http://*.imgrill.com/img-*
// @match         http://*.imgmoney.com/img-*
// @match         http://*.imagedecode.com/img-*
// @match         http://*.imagepicsa.com/img-*
// @match         http://*.imgshawt.com/img-*
// @match         http://*.imagegoofy.com/img-*
// @match         http://*.imgcandy.net/img-*
// @match         http://*.imgplate.com/img-*
// @match         http://*.imageshare.ro/img-*
// @match         http://*.imgnow.org/img-*
// @match         http://*.myhotimage.com/img-*
// @match         http://*.pixup.us/img-*
// @match         http://*.zeljeimage.com/img-*
// @match         http://*.fastpic.ru/view/*
// @match         http://*.imgtab.net/i/view/*
// @match         http://*.imgmade.com/images/*

// ===========================================================
// adcou_ch :
// ===========================================================
// @match         http://*.adcou.ch/*

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
// @match         http://*.ay.gy/*

// @match         https://*.adf.ly/*
// @match         https://*.9.bb/*
// @match         https://*.u.bb/*
// @match         https://*.j.gs/*
// @match         https://*.q.gs/*
// @match         https://*.ay.gy/*

// ===========================================================
// custom adfly
// ===========================================================

// @match         http://*.ad7.biz/*
// @match         http://*.acb.im/*
// @match         http://*.adflytutor.com/*
// @match         http://*.apkmania.co/*
// @match         http://*.apkpro.net/*
// @match         http://*.clacsoft.com/*
// @match         http://*.d0wn.us/*
// @match         http://*.deskanime.net/*
// @match         http://*.evozi.com/*
// @match         http://*.extremefile.com/*
// @match         http://*.facedasgostosas.com/*
// @match         http://*.freealbumdownload.net/*
// @match         http://*.freepremiumnow.com/*
// @match         http://*.gamecopyworld.com/*
// @match         http://*.hamdi.web.id/*
// @match         http://*.idws.im/*
// @match         http://*.isoforest.net/*
// @match         http://*.itsrinaldo.net/*
// @match         http://*.ksn.mx/*
// @match         http://*.marvelavengersfreegifts.com/*
// @match         http://*.marvelavengersrewards.com/*
// @match         http://*.mediasharingcenter.net/*
// @match         http://*.melonescomputer.com/*
// @match         http://*.nggablog.com/*
// @match         http://*.paxii.de/*
// @match         http://*.phpnulledscripts.com/*
// @match         http://*.sazlina.com/*

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
// cfly :
// ===========================================================
// @match         http://*.cf.ly/*

// ===========================================================
// embedupload :
// ===========================================================
// @match         http://*.embedupload.com/?*

// ===========================================================
// gen_winloc :
// ===========================================================
// @match         http://*.1tiny.net/*
// @match         http://*.feedsportal.com/*
// @match         http://*.redir.su/*
// @match         http://*.zpag.es/*
// @match         http://*.p.pw/*

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
// @match         http://*.amateurteensexblog.com/*
// @match         http://*.amy.gs/*
// @match         http://*.any.gs/*
// @match         http://*.baberepublic.com/*
// @match         http://*.deb.gs/*
// @match         http://*.drstickyfingers.com/*
// @match         http://*.dyo.gs/*
// @match         http://*.fapoff.com/*
// @match         http://*.filesonthe.net/*
// @match         http://*.freean.us/*
// @match         http://*.freegaysitepass.com/*
// @match         http://*.galleries.bz/*
// @match         http://*.goneviral.com/*
// @match         http://*.hornywood.tv/*
// @match         http://*.linkbabes.com/*
// @match         http://*.linkbucks.com/*
// @match         http://*.linkgalleries.net/*
// @match         http://*.linkseer.net/*
// @match         http://*.megaline.co/*
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
// mirrorcreator :
// ===========================================================
// @match         http://*.mirrorcreator.com/*
// @match         http://*.upmirror.info/*/*
// @match         http://*.maxmirror.com/*/*


// ===========================================================
// rdlnk :
// ===========================================================
// @match         http://*.rdlnk.co/*

// ===========================================================
// refso :
// ===========================================================
// @match         http://*.ref.so/*

// ===========================================================
// seomafia :
// ===========================================================
// @match         http://*.seomafia.net/*

// ===========================================================
// shst :
// ===========================================================
// @match         http://*.sh.st/*

// ===========================================================
// shr77 :
// ===========================================================
// @match         http://*.shr77.com/*


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

// ===========================================================
// _1to4_me :
// ===========================================================
// @match         http://*.1to4.me/*

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
function isUrl(s){return /^(ftp|https?):\/\/((([0-9]{1,3}\.){3,}\d+)|([0-9a-z\.\-]+)\.([a-z]{2,4}))\/?/ig.test(s.trim());}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 89322,
  script_version : '6.8',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
  script_name : 'AdsFight!',
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
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate.script_id;
  const s_Redir = true;
  el = el ? el : document.body;
  if (el) {
    if (!document.getElementById(s_CheckUpdate)) {
      var s_gm = document.createElement('script'); s_gm.id = s_CheckUpdate; s_gm.type = 'text/javascript';
      s_gm.src = '//usoupdater.herokuapp.com/?id=' + yodUpdate.script_id + '&ver=' + yodUpdate.script_version;
      if (s_Redir) s_gm.src += '&redir=yes';
      el.appendChild(s_gm);
    }
  }
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

function xhr(url, opt) {
  var o = {
    method: opt.method,
    url: url,
    data: opt.data || "",
    onload: function(r) {
      opt.callback(r.responseText);
    }
  };

  if (opt.method.match(/post/i)) {
    o.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest"
    }
  }

  GM_xmlhttpRequest(o);
}

var rgx, par, el, str;
var Extra = {
  init : function () {
    Extra.unload();

    Extra.doc = document.top || document;
    Extra.win = window.top || window;
    Extra.host = Extra.doc.location ? Extra.doc.location.hostname : '';
    Extra.pathname = Extra.doc.location ? Extra.doc.location.pathname : '';
    Extra.protocol = Extra.doc.location ? Extra.doc.location.protocol : '';
    Extra.href = Extra.doc.location ? urldecode(Extra.doc.location.href) : '';
    Extra.head = Extra.doc.head ? urldecode(Extra.doc.head.outerHTML).replace(/\\/g, '') : '';
    Extra.body = Extra.doc.body ? urldecode(Extra.doc.body.outerHTML).replace(/\\/g, '') : '';
    Extra.cdwn = 0;
    Extra.inval = 0;
    Extra.passed = 0;
    Extra.service = null;
    Extra.whitelist = "";

/*

    for (var i in YOD.$W) {
     try {
      var ydoc = YOD.$W[i];
      var jsType = typeof ydoc;
      switch (jsType.toUpperCase()) {
       case "FUNCTION":
          var sydoc = ydoc.toString();
            //Extra.log(sydoc);
            if (sydoc.match(/(open|showModelessDialog)/i))
              YOD.$W[i] = function(){return true;};
            else if (sydoc.match(/(unload)/i)) {
              //Extra.unload();
            }
          }
        }
        catch(err){}
      }

      for (var i in Extra.doc) {
       try {
        var ydoc = Extra.doc[i];
        var jsType = typeof ydoc;
        switch (jsType.toUpperCase()) {
         case "FUNCTION":
         var sydoc = ydoc.toString();
            //Extra.log(sydoc);
            if (sydoc.match(/(open|write|close)/i))
              Extra.doc[i] = function(){return "";};
            break;
          }
        }
        catch(err){}
      }*/
    },

    unload : function() {
      try {
        YOD.$W.onunload = null;
        YOD.$W.onbeforeunload = null;
        if (YOD.$W.jQuery) {
          YOD.$W.jQuery(window).unbind("beforeunload");
          YOD.$W.jQuery(document).unbind("beforeunload");
        }
      }
      catch(err){}
    },

    log : function(str) {
      console.log("Adsfight!: " + str);
    },

    killvars : function(str) {
      str = str.split('|');
      for (var i in str) {
        var v = str[i].trim();
        YOD.$W[v] = null;
      }
    },

    stamp : function() {
      var s = Extra.service.js ? " (Please enable Javascript for this domain)" : "";
      Extra.doc.title = "AdsFight! " + s;
    },

    countDown : function() {
      var title = "AdsFight!";
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
      url = urldecode(regexx(url, /((http|ftp)[^'"]+)/i));
      if (!regexx(url, /^https?/)) {
        url = Extra.protocol + "//" + Extra.host + "/" + url.replace(/^\//, "");
      }

      if (!(isUrl(url))) return;
      Extra.stamp();

      if (url.match(/^(https?:\/\/)?(www\.)?mediafire\.com\//)) url = "http://nullrefer.com/?" + url;
      if (!noredir) {
        var delay = (Extra.cdwn && parseInt(Extra.cdwn)) ? Extra.cdwn : 1;
        if (Extra.cdwn >= 1000) Extra.inval = Extra.win.setInterval(Extra.countDown, 1000);
        if (Extra.cdwn <= 1) {
          Extra.win.location.href = url;
        } else {
          setTimeout(function() {
            Extra.win.location.href = url;
          }, delay);
        }

        return;
      }
    },

    hook : function (c) {
      var t = Extra.doc.head || Extra.doc.body;
      var s = document.createElement('script');
      s.innerHTML = c;
      t.appendChild(s);
    },

    /*
      supposed to be generic: monitor skip button, auto redirect
    */
    terror_btn : function (el, par, callback) {
      var e = par || el;
      e.addEventListener("DOMSubtreeModified",
        function () {
          setTimeout(function() {
            if (isUrl(el.href)) {
              if (callback) return callback.apply(null, [el, par]);
              patt = new RegExp("^(.*\\.)?(" + el.host + "+)$", "i");
              if (!regexx(Extra.host, patt)) return Extra.go(el.href);
            }
          }, 1000);
        }, false);
    },


    /*
      supposed to be generic: iframe replacement
    */
    terror_iframe : function (p) {
      if (el = c1(".//iframe")) {
        p = p || "";
        el.src = "http://userscripts.org/scripts/show/" + yodUpdate.script_id + p;
      }
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
      if (el.tagName) {
        var pattern = new RegExp("(" + Extra.whitelist + ")", "i");
        if (regexx(el.tagName, pattern)) return;
      }
      ev.preventDefault();
      el.parentNode.removeChild(el);
      return false;
    },

    bodyRemover : function () {
      Extra.doc.body.addEventListener("DOMNodeInserted", Extra.doRemove, false);
    },

    services : {
      rest : {
        cookie : "entercook=1;",
        hosts : "",
        css : "\
        html, body {padding: 0 !important; margin: 0 !important;width: auto !important; height: auto !important;}\
        #interContainer, #interVeil, #blanket, #popUpDiv1 {display: none !important;}\
        #yod_p_center {text-align: center !important;z-index: 999 !important;}\
        ",
        fn : function () {
          if ((par = c1(".//div[contains(@id,'continuetoimage')]/form")) && (a = c1(".//input[@type='submit']", par.parentNode))) {
            a.click();
          }
          else if (par = c1(".//form/*[contains(@id,'clickto2')]")) {
            return par.parentNode.submit();
          }
          else if (Extra.host.match(/imgbar/i)) {
            if (a = c1(".//a[contains(@onclick,'pop_click')]")) a.click();
            par = c1(".//center/img[contains(@src,'view/')]");
          }
          else if (Extra.host.match(/pimpandhost/i)) {
            par = c1(".//div[contains(@class,'image')]/img[contains(@src,'pics/')]");
          }
          else if (c1(".//form/input[contains(@name,'abuse')]") && (par = c1(".//img[contains(@src,'allimages/')]"))) {
            par.src = par.src.replace(/\/2_/g, '/');
          }

          else if (par =
              c1(".//form/*[contains(@class,'buttonPro')]")
              || c1(".//form/*[contains(@id,'sub_img')]")
            ) {
            return par.parentNode.submit();
          }

          if (par || (par =
              c1(".//img[contains(@onload,'scale')]")
              || c1(".//*[contains(@onclick,'scale')]")
              || c1(".//img[contains(@src,'imageporter.com/i/')]")
              || c1(".//img[contains(@src,'img.imagearn.com/imags/')][@id='img']")
              || c1(".//*[contains(@onload,'ImgFitWin')]")
              || c1(".//*[contains(@onclick,'adjustImage')]")
              || c1(".//img[contains(@class,'centred')]")
              || c1(".//div[contains(@id,'imageviewer')]/div[contains(@class,'image_wrapper')]/img[contains(@id,'main_image')]")
              || c1(".//a[contains(@href,'bookilsfx')]/img")
              || c1(".//img[contains(@class,'bigimg')]")
              || c1(".//img[contains(@style,'lupa.cur')]")
              || c1(".//a[contains(@class,'colorbox')]/img")
              || c1(".//*[@id='picContainer']/a[contains(@href,'/big/')]")
            )) {
            var p, el = document.createElement('img');
            par = c1(".//img", par) || par;
            el.src = par.src;
            Extra.doc.body.innerHTML = "";
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

      _1to4_me : {
        hosts : "1to4.me",
        fn : function () {
          if (a = c1(".//p[contains(@class,'continue')]/a")) {
            return Extra.go(a.href);
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

      adcou_ch : {
        hosts : "adcou.ch",
        fn : function () {
          if (a = c1(".//div[contains(@id,'SkipAd')]/a")) {
            return Extra.go(a.href);
          }
        }
      },

      adfly : {
        cookie : "PHPSESSID=;adf1=;adf2=;adf3=;adf4=;",
        hosts : "adf.ly | 9.bb | u.bb | j.gs | q.gs | ay.gy | ad7.biz | acb.im | adflytutor.com | apkmania.co | apkpro.net | clacsoft.com | d0wn.us | deskanime.net | evozi.com | extremefile.com | facedasgostosas.com | freealbumdownload.net | freepremiumnow.com | gamecopyworld.com | hamdi.web.id | idws.im | isoforest.net | itsrinaldo.net | ksn.mx | marvelavengersfreegifts.com | marvelavengersrewards.com | mediasharingcenter.net | melonescomputer.com | nggablog.com | paxii.de | phpnulledscripts.com | sazlina.com",
        addon : true,
        vars : "jQuery",

        fn : function () {
          var a, s, c = 0;

          if (
            (rgx = regexx(Extra.href, /int\/.*?(http.*?)$/i)) ||
            (rgx = regexx(Extra.href, /\d+\/((https?\:\/\/)?[0-9a-z\-].+)$/i))
            ) {
              if (!regexx(rgx, /^https?/)) rgx = "http://" + rgx;
              if (isUrl(rgx)) {
                return Extra.go(rgx);
              }
          }

          if (rgx = regexx(Extra.href, /(\/ad)?\/locked(\/|\?)/i)) {
            if (a = c1(".//a", g('continue'))) {
              Extra.cdwn = 5000;
              return Extra.go(a.href);
            }
          }
        }
      },

      adfocus : {
        hosts : "adfoc.us",
        fn : function () {
          if (rgx = regexx(Extra.body, /(\/serve\.?\/?interstitial.*)"/i)) {
            return xhr("http://adfoc.us" + rgx, {
              method: "GET",
              callback: function(r) {
                if (rgx = regexx(urldecode(r), /showSkip.*<a.*href="([^"]+)/i)) {
                  return Extra.go(rgx);
                }
              }
            });
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

      cfly : {
        hosts : "cf.ly",
        fn : function () {
          if (a = c1(".//div[contains(@id,'skipme')]/a")) {
            return Extra.go(a.href);
          }
        }
      },

      embedupload : {
        hosts : "embedupload.com",
        fn : function () {
          if (a = c1(".//div[contains(@class,'categories')]/span/b/a[@target='_blank']")) {
            return Extra.go(a.href);
          }
        }
      },

      gen_winloc : {
        hosts : "1tiny.net | feedsportal.com | redir.su | redir.su | zpag.es",
        fn : function () {
          if (
            (rgx = regexx(Extra.head, /window\.location\s?=\s?"([^"]+)/i))
            || (rgx = regexx(Extra.body, /location(?:\.href|)\s?=\s?\\?'?"?([^\\"']+)/i))
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
          if(typeof YOD.$W.redirect==='function'){if(YOD.$W.parent)return YOD.$W.redirect();}
          if (par = c1(".//frameset[contains(@id,'topandbottom')]")) {
            if (el = c1(".//frame[contains(@id,'main')]", par) || c1(".//frame[contains(@src,'interheader.php')]")) {
              return Extra.go(el.src);
            }
          }
          //return Extra.hook('if(typeof redirect===\'function\'){if(parent)redirect();}');
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
        js : 1,
        hosts : "allanalpass.com | amateurteensexblog.com | amy.gs | any.gs | baberepublic.com | deb.gs | drstickyfingers.com | dyo.gs | fapoff.com | filesonthe.net | freean.us | freegaysitepass.com| galleries.bz | goneviral.com | hornywood.tv | linkbabes.com | linkbucks.com | linkgalleries.net | linkseer.net | megaline.co| miniurls.co | picbucks.com | picturesetc.net | placepictures.com | poontown.net | qqc.co | qvvo.com | realfiles.net | rqq.co | seriousdeals.net | seriousfiles.com | seriousurls.com | sexpalace.gs | theseblogs.com | thesefiles.com | theseforums.com | thosegalleries.com | tinybucks.net | tinylinks.co | tnabucks.com | tubeviral.com | uberpicz.com | ubervidz.com | ubucks.net | ugalleries.net | ultrafiles.net | urlbeat.net | urlpulse.net | whackyvidz.com | youfap.me | yyv.co | zxxo.net | zff.co",
        fn : function () {

          if (rgx = regexx(Extra.pathname, /^\/url\/(.+)$/i)) {
            return Extra.go(rgx);
          }
          else if (rgx = regexx(Extra.href, /(\/(locked|verify)+)$/i)) {
            return Extra.go(Extra.href.replace(rgx, ''));
          }
          else if (rgx = regexx(Extra.body, /\/director\/\?t=([^'"]+)/)) {
            //Extra.terror_iframe("/?t=" + rgx);
          }

          // fallback
          if (el = c1(".//a[contains(@id,'skiplink')]")) {
            Extra.terror_btn(el, false, function(el, par) {
              el.onclick({which: true});
              //el.onclick.apply(this, [{which: true}]);
            });
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

      lnx_lu : {
        hosts : "lnx.lu",
        fn : function () {
          if (el = c1(".//a/img[contains(@src,'skipadbtn')]")) {
            return Extra.go(el.parentNode.href);
          }
        }
      },

      mirrorcreator : {
        hosts : "mirrorcreator.com | upmirror.info | maxmirror.com",
        fn : function () {
          if (
            (a = c1(".//div[@id='redirectlink']//a"))
            || (a = c1(".//div[contains(@id,'download_url')]//a"))
            ) {
            return Extra.go(a.href);
          }
        }
      },

      ppw : {
        hosts : "p.pw",
        fn : function () {
          if (rgx = regexx(Extra.body, /location(?:\.href|)\s?=\s?\\?'?"?([^\\"']+)/ig)) {
            return Extra.go(rgx);
          }
        }
      },

      rdlnk : {
        hosts : "rdlnk.co",
        fn : function () {
          if (a = c1(".//input[@id='urlholder']")) {
            return Extra.go(a.value);
          }
        }
      },

      refso : {
        hosts : "ref.so",
        fn : function () {
          if (a = c1(".//div[@id='btn_open']")) {
            if (a = c1(".//a[contains(@class,'link2')]", a)) {
              return Extra.go(a.href);
            }
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

      shst : {
        hosts : "sh.st",
        fn : function () {
          setTimeout(function() {
            return xhr(YOD.$W.app.options.adSessionNotifier.callbackUrl, {
              method: "POST",
              data: "sessionId=" + YOD.$W.app.options.adSessionNotifier.sessionId + "&browserToken=" + Math.round(new Date().getTime() / 1000),
              callback: function(r) {
                r = JSON.parse(r);
                if (r.status == "ok" && r.destinationUrl) {
                  return Extra.go(r.destinationUrl);
                }
              }
            });
          }, 6000);

          Extra.terror_iframe();

          // fallback
          if ((el = c1(".//a[@id='skip_button']")) && (par = c1(".//div[@class='skip-add-container']"))) {
            Extra.terror_btn(el, par);
          }
        }
      },

      shr77 : {
        hosts : "shr77.com",
        fn : function () {
          this.terror_iframe();

          if (rgx = regexx(Extra.head, /#loading.*?href.*?,.*?"([^"]+)/i)) {
            return Extra.go(rgx);
          }

          if (a = c1(".//a[@id='loading']")) {
            Extra.terror_btn(a);
            return this.go(a.href);
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

function doStuff(init) {
  var fn, css;

  if (init) {
    usoUpdate();
    Extra.init();
  }

  for (i in Extra.services) {
    var doc, service = Extra.services[i], hosts = service.hosts.replace(/\s/g, "") || "";
    if (init && !hosts) continue;
    if (hosts) {
      var pattern = new RegExp("^(.*\\.)?(" + hosts + "+)$", "i");
      doc = regexx(Extra.host, pattern);
    }

    if (!init || doc) {
      Extra.service = service;
      Extra.stamp();
      if (css = service.css) appendJS("style", css, "adsfight_css");
      if (cookie = service.cookie) Extra.setCookies(cookie);
      if (vars = service.vars) Extra.killvars(vars);
      if (service.addon) {
        // get
        var key = "IUhpVG9tbXk=";
        var func = 'if(s=YOD.$W.eu){z=f="";s=s.toString();P=s.indexOf(atob("'+key+'"));if(P!=-1){s=s.substr(0,P);}for(l=0;l<s.length;l++){if((l%2)==0){f+=s.charAt(l);}else{z=s.charAt(l)+z;}}s=f+z;s=atob(s);s=s.substring(2,s.length);if(isUrl(s)){return Extra.go(s);}}';
        var yVoid = new Function("YOD", "Extra", "isUrl", func);
        yVoid(YOD,Extra,isUrl);
      }

      if (fn = service.fn) return fn.apply(Extra);
    }
  }

  doStuff();
}

function doExec() {
  try {
    if (window.chrome && (unsafeWindow == window)) {
      YOD.$W = (function() {
        var el = document.createElement('a');
        el.setAttribute('onclick', 'return window;');
        return el.onclick();
      }());
    } else {
      YOD.$W = unsafeWindow;
    }

    if (typeof YOD.$W === 'undefined') {
      setTimeout(doExec, 200);
    } else {
      if (window.self !== window.top) return;
      document.addEventListener("DOMContentLoaded", doStuff);
    }
  } catch(e) {
    //setTimeout(doExec, 1000);
  }
}

var YOD = {};
//YOD.$Opera = window.opera || null;
doExec();
})();