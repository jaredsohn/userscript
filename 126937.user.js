// ==UserScript==
// @name           ha2.shortener
// @namespace      tw.ha2.shortener
// @include        *
// @author         Faryne
// @copyright      2012, Faryne <http://ha2.tw/>
// @description    任意縮網址，使用 ha2.tw 所提供的泛用API
// @version        0.0.6
// @updateURL      http://userscripts.org/scripts/source/126937.meta.js
// ==/UserScript==


if (window.parent.location.href == window.self.location.href && !document.getElementById("ha2-shortener")) {
var recorded  = GM_getValue("recorded", false);
var ver       = "0.0.6";
var _gaq      = _gaq || [];
_gaq.push(['ha2._setAccount', 'UA-96598-3']);
_gaq.push(['ha2._trackPageview', '/shortener/plugin/'+ver]);


GM_xmlhttpRequest({
  method:   "GET",
  url:      "http://www.google-analytics.com/ga.js",
  onload:   function(out) {
    eval(out.responseText);
  }
});

var domains = ["maid.tw","faryne.at","goo.gl","0w0.cc","is.gd"],options=[];
GM_xmlhttpRequest({
  method:   "GET",
  url:      "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",
  onload:   function(response) {
    
    eval(response.responseText);
    
    function render_html () {
      for (var i in domains) {
        options.push('<option value="'+domains[i]+'">'+domains[i]+'</option>');
      }
      var html = [
        '<div id="ha2-shortener">',
        '<div id="ha2-shortener-tools" style="text-align:right;"><a href="#" id="ha2-shortener-close">隱藏</a></div>',
        '<p><label>要使用哪個網域縮網址</label>',
        '<select style="font-family:arial,sans-serif" id="ha2-domain">'+options.join("")+'</select>',
        '<input type="button" value="縮網址" id="ha2-dosbn" /></p>',
        '<div id="ha2-result" style="display:none;overflow-x:auto;"></div>',
        '</div>',
      ];
      $("body").append(html.join(""));
      // event binding
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
        "bottom":                 "10px",
        "left":                   0,
        "box-shadow":             "0 0 10px #000",
        "font-family":            "arial,sans-serif",
        "font-size":              "12px",
        "width":                  "200px",
        "height":                 "80px"
      };
      
      $('#ha2-shortener').css(main_css);
      $('#ha2-dosbn').live("click", function(e){
        $(this).attr('disabled', 'disabled').val("縮網址中");
        _gaq.push(['ha2._trackEvent', 'pluginshorten', "1"]);
        GM_xmlhttpRequest({
          method:   "GET",
          url:      'http://ha2.tw/rest/short_url/shorten.json?url='+encodeURIComponent(location.href)+'&domain='+$('#ha2-domain').val(),
          onload:   function(output) {
            var o = $.parseJSON(output.responseText);
            var result_html = '<strong>Shorten Reslt: <a target="_blank" href="'+o.shortUrl+'">'+o.shortUrl+'</a></strong>';
            $("#ha2-result").html(result_html).show();
            $('#ha2-dosbn').val("縮完了喔～");
          }
        });
        e.preventDefault();
      });
      $('#ha2-shortener-close').live("click", function(e) {
        if ($(this).html() == "隱藏") {
          $('#ha2-shortener').css({'width':'25px',height:'10px'});
          $('#ha2-shortener').children().each(function(){
            if ($(this).attr('id') == 'ha2-shortener-tools') {
              return;
            }
            $(this).hide();
          });
          $(this).html("顯示");
        } else {
          $('#ha2-shortener').css({'width':'200px',height:'80px'});
          $('#ha2-shortener').children().each(function(){
            $(this).show();
          });
          $(this).html("隱藏");
        }
        e.preventDefault();
      });
    }

    
    render_html();
  }
});

}