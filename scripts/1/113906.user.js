(function () {
// ==UserScript==
// @name           Bandcamp Yo Ben
// @namespace      http://blog.thrsh.net
// @author         daYOda (THRSH)
// @description    Bandcamp.com helper
// @version        2.1
// @updateURL      https://userscripts.org/scripts/source/113906.meta.js
// @match          http://*.bandcamp.com/
// @match          http://*.bandcamp.com/album/*
// @match          http://*.bandcamp.com/track/*
// @match          http://*.bandcamp.com/releases*
// @match          https://*.bandcamp.com/
// @match          https://*.bandcamp.com/album/*
// @match          https://*.bandcamp.com/track/*
// @match          https://*.bandcamp.com/releases*
// @run-at         document-start
// ==/UserScript==

const yodUpdate = {
  script_id : 113906,
  script_version : "2.1",
  script_pipeId : "7015d15962d94b26823e801048aae95d",
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
  const s_CheckUpdate = "YodCheckUpdate" + yodUpdate.script_id;
  const s_Redir = false;
  el = el ? el : document.body;
  if (el) {
    if (!document.getElementById(s_CheckUpdate)) {
      var s_gm = document.createElement("script"); s_gm.id = s_CheckUpdate; s_gm.type = "text/javascript";
      s_gm.src = "//usoupdater.herokuapp.com/?id=" + yodUpdate.script_id + "&ver=" + yodUpdate.script_version;
      if (s_Redir) s_gm.src += "&redir=yes";
      el.appendChild(s_gm);
    }
  }
}

function fixfn(str, no) {
  if (!str) return "";
  if (no = parseInt(no)) str = (no < 10 ? "0" + no : no) + ". " + str;
  return str.replace(/[\/\\\:\*\?"<>\|]+/g, "-").trim();
}

function elExists(s, el) {
  var e = el ? el.find(s) : YODBNDCMP.$(s);
  return e.length ? e : false;
}

function toTA(target, id, val) {
  ta_id = id + "_TA";
  a_id = id + "_A";
  if (!(ta = elExists("#" + ta_id))) {
    YODBNDCMP.$("<a/>", {id: a_id, "class": "TAToggle yoddownExt pseudoLink", html: "#" + id, title: "Toggle " + id})
      .insertBefore(target.next())
      .click(function(){
        YODBNDCMP.$(this).next(".TASwap").toggle();
      });

    YODBNDCMP.$("<textarea/>", {id: ta_id, "class": "TASwap hide"}).insertAfter("#" + a_id).val(val);
    downloadBlob(id);
  }
  YODBNDCMP.$("#" + ta_id).val(val.trim());
}

function toWGET(fn, url) {
  YODBNDCMP.$wGet += "wget -c -O \"" + fn + "\" \"" + url + "\" --no-check-certificate\r\n\r\n";
}

function yodDownload(el, i) {
  el = YODBNDCMP.$(el);

  var target = el;

  if (YODBNDCMP.$is_album) {
    if (!(target = elExists("[class*=play-col]", el))) return;
    if (elExists("*[class*=disabled]", target)) {
      target.attr("colspan", 2);
      return;
    }
  }

  el.addClass("yodparsed");

  var index = i || 0;
  var trax = YODBNDCMP.$TralbumData.trackinfo[index];
  var streamable = parseInt(trax.streaming) || 0;

  if (streamable) {
    var f = Object.keys(trax.file)[0].trim(),
      e = f.match(/^(\w+)\-/i) || "mp3",
      t = trax.title.trim(),
      trx = trax.track_num;

    f = trax.file[f].trim();
    tFix = fixfn(YODBNDCMP.$fn + t + "." + e[1], trx);

    var a = YODBNDCMP.$("<a/>", {
        href: f + "&yod_fn=" + tFix,
        text: YODBNDCMP.$dt,
        "class": "yoddown pseudoLink",
        title: "Download " + t
      });

    if (YODBNDCMP.$is_album) {
      target.removeAttr("colspan");
      YODBNDCMP.$("<td/>", {class: "yoddownAlbum"}).append(a).insertBefore(target);
    } else {
      YODBNDCMP.$("<div/>").append(a).insertBefore(target);
    }

    if (target = elExists("#track_table")) {
      if (!elExists("#yod_sel_ext")) {
        YODBNDCMP.v_yod_bash = getValue("yod_bash") !== "sh" ? "bat" : "sh";

        var sel_ext = YODBNDCMP.$("<select/>", {id: "yod_sel_ext"})
          .append(YODBNDCMP.$("<option/>", {value: "bat", html: ".bat"}))
          .append(YODBNDCMP.$("<option/>", {value: "sh", html: ".sh"}))
          .change(function(){
            YODBNDCMP.v_yod_bash = YODBNDCMP.$(this).val();
            setValue("yod_bash", YODBNDCMP.v_yod_bash);
            document.location.reload();
          });

        sel_ext.find("option[value=\""+ YODBNDCMP.v_yod_bash +"\"]").attr("selected", "selected");

        YODBNDCMP.$("<label/>", {id: "yod_sel_ext_label", "for": "yod_sel_ext", html: "#Download bash ext"})
          .insertAfter(target)
          .append(sel_ext);

        var artwork = false;
        
        if (artwork = elExists("#tralbumArt a img")) {
          YODBNDCMP.v_yod_artwork = getValue("yod_artwork") !== "no" ? "yes" : "no";
          setValue("yod_artwork", YODBNDCMP.v_yod_artwork);
        }

        YODBNDCMP.$("<label/>", {id: "yod_artwork_label", "for": "yod_cb_artwork", html: "#Download artwork"})
          .append(
            YODBNDCMP.$("<input/>", {id: "yod_cb_artwork", type: "checkbox", checked: YODBNDCMP.v_yod_artwork === "yes" ? "checked" : false})
              .change(function(){
                YODBNDCMP.v_yod_artwork = YODBNDCMP.$(this).attr("checked") === "checked" ? "yes" : "no";
                setValue("yod_artwork", YODBNDCMP.v_yod_artwork);
                document.location.reload();
              })
          )
          .insertAfter(sel_ext.parent());
      }

      if (!YODBNDCMP.$Traklists) YODBNDCMP.$Traklists = "#EXTM3U\r\n\r\n";
      YODBNDCMP.$Traklists += "#EXTINF:" + Math.round(trax.duration) + "," + t + "\r\n" + f + "\r\n\r\n";
      toTA(target, "M3U", YODBNDCMP.$Traklists);

      // WGET //
      if (!YODBNDCMP.$wGet) {
        if (YODBNDCMP.v_yod_bash === "sh") YODBNDCMP.$wGet += "#!/bin/bash\r\n\r\n";
        if (artwork && (YODBNDCMP.v_yod_artwork === "yes")) {
          toWGET(fixfn(YODBNDCMP.$fn) + " artwork.jpg", artwork.parent().attr("href"));
        }
      }

      toWGET(tFix, f.replace(/%/gi, "%%"));
      toTA(target, "WGET", YODBNDCMP.$wGet);
    }
  }
}

function downloadBlob(id) {
  var ta = YODBNDCMP.$("#" + id + "_TA"), mime = ext = "";

  if (!ta.length) return;

  YODBNDCMP.$("<br/>").insertAfter(ta);

  switch (id) {
    case "M3U":
      mime = "application/x-mpegurl";
      ext = ".m3u";
      break;
    case "WGET":
      mime = YODBNDCMP.v_yod_bash === "bat" ? "application/x-msdos-program" : "application/x-sh";
      ext = "." + YODBNDCMP.v_yod_bash;
      break;
  }

  var fn =  YODBNDCMP.$("#name-section .trackTitle").text().trim() + ext;

  YODBNDCMP.$("<a/>", {
    id: "yod_dl_" + id,
    href: "#",
    html: "#Download " + id,
    "class": "yoddown yoddownExt pseudoLink",
    "download": fn
  })
  .click(function(){
    window.URL = window.webkitURL || window.URL;

    var bb = new Blob([ta.val()], {type: mime}),
      href = window.URL.createObjectURL(bb);

    YODBNDCMP.$(this).attr({href: href, "data-downloadurl": [mime, fn, href].join(":")});
  })
  .insertBefore(YODBNDCMP.$("#" + id + "_A"));
}

function doStuff() {
  YODBNDCMP.$("<style/>", {text: mycss}).appendTo("head");

  if (!(YODBNDCMP.$TralbumData || YODBNDCMP.$TralbumData.trackinfo.length)) return;
  if (!YODBNDCMP.$EmbedData) return;

  YODBNDCMP.$is_album = YODBNDCMP.$TralbumData.item_type.match(/album/i) ? true : false;
  YODBNDCMP.$fn = YODBNDCMP.$EmbedData.artist.trim() + " - ";
  YODBNDCMP.$fn += YODBNDCMP.$EmbedData.hasOwnProperty("album_title") ? YODBNDCMP.$EmbedData.album_title.trim() + " - " : "";

  if (YODBNDCMP.$is_album) {
    YODBNDCMP.$("tr[class*=track_row_view][rel*=tracknum]").not(".yodparsed").each(function() {
      if (i = parseInt(YODBNDCMP.$(this).attr("rel").replace(/[^0-9]/ig, ""))) {
        yodDownload(this, --i);
      }
    });
  } else {
    if (!(el = elExists("ul[class*=tralbumCommands]"))) return;
    YODBNDCMP.$dt += " Download this Track!";
    yodDownload(el);
  }
}

const mycss = "\
.yoddownAlbum .yoddown {margin-right:5px;}\
.yoddownExt {margin: 20px 10px 0 0;display: inline-block;}\
.TASwap {display: none; min-width: 100%;margin: 20px 0px;min-height: 200px;background: transparent;color: inherit;}\
#yod_sel_ext_label {display: block; margin-top: 15px;}\
#yod_sel_ext, #yod_cb_artwork {margin-left: 10px;}\
";

var YODBNDCMP = {};
YODBNDCMP.$dt = "#";
YODBNDCMP.$wGet = "";

function doExec() {
  usoUpdate();
  try {
    if (window.chrome && (unsafeWindow == window)) {
      YODBNDCMP.$W = (function() {
        var el = document.createElement("p");
        el.setAttribute("onclick", "return window;");
        return el.onclick();
      }());
    } else if (typeof unsafeWindow !== "undefined") {
      YODBNDCMP.$W = unsafeWindow;
    }

    if (typeof YODBNDCMP.$W.jQuery === "undefined") {
      window.setTimeout(doExec, 1000);
    } else {
      YODBNDCMP.$ = YODBNDCMP.$W.jQuery;
      YODBNDCMP.$(document).ready(function() {
        YODBNDCMP.$TralbumData = YODBNDCMP.$W.TralbumData;
        YODBNDCMP.$EmbedData = YODBNDCMP.$W.EmbedData;
        doStuff();
      });
    }
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", doExec, true);
})();