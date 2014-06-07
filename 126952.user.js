// ==UserScript==
// @name           Indescribable Retriever
// @namespace      tw.maid.neko
// @description    Grab pixiv artwork and hosting in neko.maid.tw domain
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include        http://www.pixiv.net/member_illust.php?illust_id=*&mode=medium
// @include        http://www.pixiv.com/works/*
// @include        http://seiga.nicovideo.jp/seiga/*
// @include        http://www.tinami.com/view/*
// @description    難以名狀的抓圖器，抓Pixiv/Nico靜畫/Tinami作品的小工具
// @version        1.6
// @grant          GM_xmlhttpRequest
// @copyright      Faryne, 2012, 2013. <http://neko.maid.tw/>
// ==/UserScript==

var default_button_text = "難以名狀的抓圖器：開始抓圖";
var finish_grabbed_text = "抓圖完成";

function parse_id () {
  var out = {site: '', id: ''}, qs, href, q;  
  // 先parse網站
  if (location.host.match('nicovideo.jp') != null) {
    out.site  = 'nico';
    href = location.href.replace(location.search, '');
    qs  = href.split('/');
    out.id = qs[qs.length-1];
  } else if (location.host.match('.pixiv.') != null) {
    out.site  = 'pixiv';
    q = location.search;
    if (q == "") {
      qs  = location.href.split('/');
      out.id = qs[qs.length-1];
    } else {
      var pa = q.match(new RegExp('illust_id=([0-9]*)'));
      if (typeof pa[1] !== 'undefined' && pa[1] !== '') {
        out.id  = pa[1];
      }
    }
  } else if (location.host.match('.tinami.') != null) {
    out.site  = 'tinami';
    href = location.href.replace(location.search, '');
    qs  = href.split('/');
    out.id = qs[qs.length-1];
  }
  
  return out;
}

var render = function (obj) {
  if (typeof obj === 'undefined' || typeof obj.error !== "undefined") {
    alert(obj.error);
    $('#ha2pixiv-grab').removeAttr("disabled").val(default_button_text);
    return false;
  }
  $('#ha2pixiv-grab').val(finish_grabbed_text);
  $('#ha2pixiv-result').html('抓圖完成：<a href="'+obj.preview_url+'" target="_blank">'+obj.preview_url+'</a>').show();
};

GM_xmlhttpRequest({
  method:   "GET",
  url:      "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
  onload:   function(response) {
    eval(response.responseText);
    // render a block
    if ($('#ha2-shortener').length > 0) {
      var html = [
        '<div id="ha2-pixiv">',
          '<input type="button" id="ha2pixiv-grab" value="'+default_button_text+'" />',
          '<div id="ha2pixiv-result" style="display:none;"></div>',
        '</div>'
      ];
      $('#ha2-shortener').append(html.join(""));
    } else {
      var html = [
        '<div id="ha2-shortener">',
        '<div id="ha2-pixiv">',
          '<input type="button" value="'+default_button_text+'" id="ha2pixiv-grab" />',
          '<div id="ha2pixiv-result" style="display:none;"></div>',
        '</div>',
        '</div>'
      ];
      $('body').append(html.join(""));
      var main_css = {
        "-moz-box-sizing":        "content-box",
        "-webkit-box-sizing":     "content-box",
        "box-sizing":             "content-box",
        "background":             "white",
        "-webkit-border-radius":  "0 20px 20px 0",
        "-moz-border-radius":     "0 20px 20px 0",
        "border-radius":          "0 20px 20px 0",
        "border":                 "1px solid rgba(0,0,0,0.2)",
        "padding":                "14px",
        "text-align":             "center",
        "z-index":                99999,
        "position":               "fixed",
        "bottom":                 0,
        "left":                   0,
        "box-shadow":             "0 0 10px #000",
        "font-family":            "arial,sans-serif",
        "font-size":              "12px"
      };
      $('#ha2-shortener').css(main_css);
    }
    
    // event binding
    $('#ha2pixiv-grab').on("click", function(e){  
      $('#ha2pixiv-grab').attr("disabled", "disabled").val("抓圖中");
      var domain = parse_id();
      switch (domain.site) {
        case 'pixiv':
        case 'nico':
        case 'tinami':
          GM_xmlhttpRequest({
            method:   "GET",
            url:      "http://api.neko.maid.tw/retrieve.json?"+$.param({site: domain.site, artwork_id: domain.id, r: Math.random()}),
            onload:   function(response) {
                eval("render("+response.responseText+");");
            }
          });
          break;
        default:
          alert('error');
          break;
      }
      
      e.preventDefault();
    });
  }
});