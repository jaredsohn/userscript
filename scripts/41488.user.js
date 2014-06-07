// ==UserScript==
// @name           amazon_currencyConvertion 
// @namespace      koki-h
// @description    Price Convertion in Amazon item detail page. 
//                 http://userscripts.org/scripts/show/41488
// @include        http://www.amazon.co.jp/*
// @include        http://www.amazon.com/*
// @include        http://www.amazon.co.uk/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.fr/*
// @include        http://www.amazon.ca/*
// @include        http://www.amazon.cn/*
// ==/UserScript==

(function () {
//  function log(message) {
//    if (unsafeWindow && unsafeWindow.console) {
//      unsafeWindow.console.log(message);
//    }
//  }
  function round(num) {
    var lnum = Math.round(num * 100);
    return lnum / 100;
  }
  var currency = {
    "www.amazon.co.jp" : { 
      name  : "jpy",
      sign  : "\uFFE5",
      regex : "\uFFE5 ([\\d\\.]+)",
      tagclass : "priceLarge",
      delim : ",",
    },
    "www.amazon.com" : { 
      name  : "usd",
      sign  : "$",
      regex : "\\$([\\d\\.]+)",
      tagclass : "priceLarge",
      tagclass2 : "price",
    },
    "www.amazon.co.uk" : {
      name  : "gbp",
      sign  : "\u00A3",
      regex : "\u00A3([\\d\\.]+)",
      tagclass : "priceLarge",
    },
    "www.amazon.de" : {
      name  : "eur",
      sign  : "EUR ",
      regex : "EUR ([\\d\\.]+)",
      tagclass : "priceLarge",
    },
    "www.amazon.fr" : {
      name  : "eur",
      sign  : "EUR ",
      regex : "EUR ([\\d\\.]+)",
      tagclass : "priceLarge",
    },
    "www.amazon.ca" : {
      name  : "cad",
      sign  : "CDN$ ",
      regex : "CDN\\$ ([\\d\\.]+)",
      tagclass : "priceLarge",
    },
    "www.amazon.cn" : {
      name  : "cny",
      sign  : "\u00A5",
      regex : " *([\\d\\.]+)",
      tagclass : "OurPrice",
      tagclass2 : "priceLarge",
      delim : ",",
    },
  };
  function createSelectDialog(){
    var d = document; b= document.body;
    var c=d.createElement('table');
    c.innerHTML= 'select currency: '
                  + '<select id="curSelect">'
                  + '<option value="jpy">JPY</option>'
                  + '<option value="eur">EUR</option>'
                  + '<option value="gbp">GBP</option>'
                  + '<option value="usd">USD</option>'
                  + '<option value="cad">CAD</option>'
                  + '<option value="aud">AUD</option>'
                  + '<option value="cny">CNY</option>'
                  + '<option value="mxn">MXN</option>'
                  + '<option value="brl">BRL</option>'
                  + '<option value="thb">THB</option>'
                  + '<option value="krw">KRW</option>'
                  + '</select><br />';

    c.style.background='blue';
    c.style.color='#fff';
    c.style.position='fixed';
    c.style.top='0';
    c.style.right='0';
    c.style.padding = '2px'
    c.style.display = 'none';
    c.style.zIndex = '2';
    b.insertBefore(c,b.firstChild);
    c.show = function (){
      c.style.display = 'block';
      GM_setValue('dialog_visible',true);
    }
    c.hide = function (){
      c.style.display = 'none';
      GM_setValue('dialog_visible',false);
    }
    c.changeLabel = function (opt){
      d.getElementById('curSelect').value = opt;
    }
    c.toggle = function (){
      visible = GM_getValue('dialog_visible');
      if (visible){
        c.show();
      }
    }
    var ok=d.createElement('input');
    ok.type = 'button';
    ok.value = 'change';
    ok.addEventListener('click',
        function(){
          to_cur = d.getElementById('curSelect').value;
          dialog.changeLabel(to_cur);
          GM_setValue('to_cur', to_cur);
          changeCurrency();
        },
        false);
    c.appendChild(ok);
    var cancel=d.createElement('input');
    cancel.type = 'button';
    cancel.value = 'close';
    cancel.addEventListener('click',function(){c.hide();},false);
    c.appendChild(cancel);
    return c;
  }
  function changeCurrency(){
    var changed = document.getElementById('ac2y_changed');
    var apiUrl = "http://xurrency.com/api/" + cur.name + "/"+ to_cur + "/1";
    if (cur.name != to_cur){
      var gSearchRequest = GM_xmlhttpRequest({
        method: "GET",
        url: apiUrl,
        onload: function(res){
            var rate = res.responseText.match(/\"value\":(.*?),/)[1];
            var yenPrice = round(orgPrice * rate);
            var TO_CUR = to_cur.toUpperCase();
            var changed_html = "<span id='ac2y_changed'> (" 
                              + '<!-- <img src="http://xurrency.com/images/flags/' + to_cur + '.png" /> -->' 
                              + TO_CUR + ":" + yenPrice 
                              + " <small>< " + cur.sign + "1=" + TO_CUR + ":"+ rate + " ></small>"
                              +" )</span>";
              if (changed){
                changed.innerHTML = changed_html;
              } else {
                elemPrice.innerHTML += changed_html;
              }
            }
        });
    } else if(changed){
      changed.parentNode.removeChild(changed);
    }
  }
  var to_cur = GM_getValue('to_cur');
  if (!to_cur){
    GM_setValue('to_cur', 'jpy');
    to_cur = 'jpy';
  }
  var dialog = createSelectDialog();
  dialog.toggle();
  dialog.changeLabel(to_cur);
  GM_registerMenuCommand('select currency',dialog.show);
  var site = document.location.host;
  var cur = currency[site];
  var elemPrice = document.getElementsByClassName(cur.tagclass)[0];
  if (!elemPrice && cur.tagclass2){
    elemPrice = document.getElementsByClassName(cur.tagclass2)[0];
  }
  if (elemPrice){
    if (cur.regex != ""){
      var pattern   = new RegExp(cur.regex);
      var orgPrice  = elemPrice.innerHTML;
      if (cur.delim){
        orgPrice = orgPrice.replace(cur.delim, '');
      }
      orgPrice  = orgPrice.match(pattern)[1];
    } else {
      var orgPrice  = elemPrice.innerHTML;
    }
    changeCurrency();
  }
})()

