// ==UserScript==
// @name           Nikuno HANAMASA
// @namespace      http://ikenie.com/
// @include        *
// @version        0.8
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// ==/UserScript==

(function()
{
  function hanamasa(doc) {
      var logo = $X("//img[contains(@src,'http://assets1.twitter.com/images/twitter_logo_s.png')]", doc);
    if (logo != "") {
      logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }

    var ad = $X("//div[@id='side_ad_base']", doc);
    if (ad != "") {
      ad[0].innerHTML = '<a href="http://www.hanamasa.co.jp/ad/index.html"><img src="http://w.ikenie.com/hanamasa/hanamasa_ad.gif" /></a>';
    }
    
    var yahoo_logo = $X('//div[@id="masthead"]/h1/a/img', doc);
    if (yahoo_logo != "") {
      yahoo_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var favo_logo = $X("id('logo')", doc);
    if (favo_logo != "") {
      favo_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var mixi_logo = $X("id('pagetop')/a/img", doc);
    if (mixi_logo != "") {
      mixi_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var hatena_logo = $X("id('searchmain')/img", doc);
    if (hatena_logo != "") {
      hatena_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var ufj_logo = $X("/html/body/table[1]/tbody/tr/td[2]/table[1]/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/a/img", doc);
    if (ufj_logo != "") {
      ufj_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var jimin_logo = $X("/html/body/form/table[1]/tbody/tr[1]/td/table/tbody/tr[2]/td[1]/img", doc);
    if (jimin_logo != "") {
      jimin_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var minshu_logo = $X("/html/body/table[1]/tbody/tr[2]/td[1]/img", doc);
    if (minshu_logo != "") {
      minshu_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var wedata_logo = $X("id('title')/a", doc);
    if (wedata_logo != "") {
      wedata_logo[0].innerHTML = "<img src='http://w.ikenie.com/hanamasa/hanamasa.png' />";
    }
    
    var clubt_logo = $X("id('menu_left')/img[1]", doc);
    if (clubt_logo != "") {
      clubt_logo[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    }
    
    var clubt_logo2 = $X("id('header')/table/tbody/tr/td[1]/a/img", doc);
    if (clubt_logo2 != "") {
      clubt_logo2[0].src = 'http://w.ikenie.com/hanamasa/hanamasa.png';
    } 
    
    var clubt_top = $X("/html/body/font", doc);
    if (clubt_top != "") {
      clubt_top[0].innerHTML = "<img src='http://w.ikenie.com/hanamasa/hanamasa.png' />";
    }


  }

  hanamasa(document);

  setTimeout(function() {
    if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
      window.AutoPagerize.addDocumentFilter(hanamasa);
    }
  }, 0);


})();
