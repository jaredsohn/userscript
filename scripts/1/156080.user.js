// ==UserScript==
// @name           Hatena Hotentry Classic
// @namespace      http://khlizard.vanu.jp/
// @description    Style of Hatena hotentry change into classic style.
// @include        http://b.hatena.ne.jp/hotentry*
// @include        http://b.hatena.ne.jp/entrylist*
// @version        1.1.2
// ==/UserScript==

// using jQuery
// thanks for http://www.otchy.net/20110607/use-jquery-on-greasemonkey-for-chrome/
(function (d, func) {
  d.getElementById('main').style.visibility = "hidden";
  
  var h = d.getElementsByTagName('head')[0];
  
  var css1 = d.createElement("link");
  
  /*
  css1.setAttribute("rel", "stylesheet");
  css1.setAttribute("href", "http://dl.dropbox.com/u/48975648/resources/hatenabookmarkclassic.css");
  h.appendChild(css1);
  // */
  
  var s1 = d.createElement("script");
  s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  s1.addEventListener('load', function() {
    var s2 = d.createElement("script");
    s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
    h.appendChild(s2);
  }, false);
  h.appendChild(s1);
})(document, function($) {
  // String.Format thanks for http://neue.cc/2009/09/18_203.html
  var Format = function(template, replacement) {
    if (typeof replacement != "object") {
      replacement = Array.prototype.slice.call(arguments, 1);
    }
    return template.replace(/\{(.+?)\}/g, function(m, c) {
      return (replacement[c] != null) ? replacement[c] : m
    });
  }
  // EscapeHTML
  var EscapeHTML = function(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }
  // /*
  $("head").append('<style type="text/css">\
.entry-vertical-3, .entry-vertical-4 {\
  border-radius: 10px;\
  -webkit-border-radius: 10px;\
  -moz-border-radius: 10px;\
  border: 1px solid #ccc;\
}\
.hhc-entry {\
  border-bottom: 1px dashed #ccc;\
  padding: 0.5em;\
  margin: 0.5em 0;\
  line-height: 1.2;\
}\
.hhc-title {\
  color: #444;\
  font-size: normal;\
  font-weight: bold;\
  text-decoration: none;\
  vertical-align: middle;\
}\
.hhc-title:visited {\
  color: #888;\
}\
.hhc-title:hover {\
  text-decoration: underline;\
}\
.hhc-title img {\
  vertical-align: middle;\
  padding: 0 5px 0 0;\
}\
.hhc-quote {\
  font-size: 70%;\
  color: #888;\
  margin-left: 20px;\
}\
.hhc-meta {\
  font-size: 75%;\
  margin-left: 20px;\
}\
.hhc-users, .hhc-cat, .hhc-date, .hhc-domain, .hhc-tags {\
  margin: 0 0.2em;\
}\
.hhc-users,\
.hhc-users-min {\
  font-weight: bold;\
  color: red;\
  background-color: #ffcbcb;\
  padding: 0 0.2em;\
  border-radius: 2px;\
  -webkit-border-radius: 2px;\
  -moz-border-radius: 2px;\
}\
.hhc-users-min {\
  color: #ff6766;\
  background-color: #ffefef;\
}\
.hhc-cat {\
  color: gray;\
}\
.hhc-date {\
  color: gray;\
}\
.hhc-domain {\
  color: gray;\
}\
.hhc-tags a {\
  background-color: #ddd;\
  color: #666;\
  text-decoration: none;\
  padding: 0 0.2em;\
  border-radius: 2px;\
  -webkit-border-radius: 2px;\
  -moz-border-radius: 2px;\
}\
</style>');
  // */
  $('.entry-vertical-3, .entry-vertical-4').css("background-image", "none");
  
  var $units = $(".entry-unit");
  $units.css("display","block");
  $units.css("width", "auto");
  
  $units.each(function(){
    var $i = $(this);
    var bk_count = $i.attr('data-bookmark-count');
    if (bk_count) {
      var $link =   $i.find('a.entry-link');
      var $cat  =   $i.find('a.category');
      var $domain = $i.find('a.domain');
      
      var rank   = $i.attr('data-entryrank');
      var cat    = $cat.text();
      var caturl = $cat.attr('href');
      var title  = EscapeHTML($link.text());
      var url    = $link.attr('href');
      var bkurl  = $i.find('ul.users a').attr('href');
      var quote  = EscapeHTML($i.find('blockquote').text());
      var date   = $i.find('li.date').text();
      var icon   = $i.find('img.favicon').attr('src');
      var domain = $domain.text();
      var dourl  = $domain.attr("href");
      var tags   = $i.find('li.tag').html();
      
      var cat0 = "";
      if (caturl) {
        cat0 = Format('<a class="hhc-cat" href="{0}">{1}</a>', caturl, cat);
      }
      if (!tags)  tags = "";
      
      var html = Format('<div class="hhc-entry">\
<a class="hhc-title" href="{URL}"><img src="{ICON}">{TITLE}</a>\
<br>\
<span class="hhc-quote">{QUOTE}</span>\
<br>\
<span class="hhc-meta">\
  <a class="{CLASS_USERS}" href="{BKURL}">{USERS} users</a>\
  {CAT}\
  <span class="hhc-date">{DATE}</span>\
  <a href="{DOMAINURL}" class="hhc-domain">{DOMAIN}</a>\
  <span class="hhc-tags">{TAGS}</span>\
</span>\
</div>',
      { 
        USERS: bk_count, CAT: cat0, TITLE: title, URL: url, 
        BKURL: bkurl, DATE: date, ICON: icon, QUOTE: quote.substr(0,79) + '…',
        DOMAIN: domain, DOMAINURL: dourl, TAGS: tags,
        CLASS_USERS: bk_count <= 10 ? 'hhc-users-min' : 'hhc-users',
      });
      
      console.log([rank, cat, caturl, title, url, bkurl, date, icon, domain]);
      console.log(html);
      
      $i.html(html);
    } else {
      $i.remove();
    }
  });
  $("#main").css("visibility", "visible");
});
