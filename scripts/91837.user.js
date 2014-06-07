// ==UserScript==
// @name           sc2replay download button in replay listing
// @namespace      troynt+sc2replayed@gmail.com
// @include        http://www.sc2replayed.com/*
// ==/UserScript==

var icons = {
  download: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%25%08%06%00%00%00%7B%C8x%5E%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%85IDATx%DA%EC%931K%C3P%10%C7%EF%95l%16%9B%2CnBt5%82%99%C4NI'G%BB%14%3B%C5%8F%10%D0%C5%C9%04%1C%05%C9%07%10%B3%88%08%82vSA%D2%B5K%DBAp%93%80%E0%E0%12%15%9D%CF%DC%B3%09%EF%B55%04%E9%E8%1F%5Er9.%EF%DD%EF%EE%1D%20%22dkie%0D%3B%2F%88%FB'W(%FAiU%40%D0%DC%BC%FA%F3%AE%A90%AE%0A%94%94B%8F%D5%BA%8DF%DD%82F%CB%E1%CE%85E%1D%DA%7B%3E%92%7D~t%C0%E8%CD%B6w%3D%EC%DD%5C%C3%E1e%04%D5%B1%23%EF%2FB%E8%DDv(w%80%B3%C7%04%8D%0D%0B%09%84l%82%11%81h%23%FA%A6%9Dr%C2Fk%87%3B%8F%EF%06%98%82%E5~%F2)%F2Q%A7l%D90%F1%F59%86%CF%F7%84M%C0%88zz%18%B0i%D4%95%ACv%BF%A9Z%D38%3D%E3%89%96P%E9%82K%FD%CCJAk%7DsK%EA7C%E1d%EAPf%7F%7D%BCI%60R%E0Lr%FC%0F%2C%1F%A8i%1A%FA%BE%8F%CDf%13%0B%7BmY%16%F5%17%A3(*%9E%EB%D9%5D3%D7uq%9A%92%24A%F1h%8C%E3%18%C20%9C%D8%C4%B6m%18%0E%87%04%86%D0%EF%F7%F9_%AA%AA%E2%C8%E6r%1C'%F7sC%24%CC%82G%A9%88%D4%F2%5C%A79%F1%1Bm%9A%E6%DF%A9%19%91%05APX%15%CF%F3%F8%CC%94%1A%1A%85%A23%A50TSn%8B~%C6%98%3C%85i-Q%D7unw%BB%5D%0A%CE%C7%F5%5B%80%01%00%D9JO3%CB8m.%00%00%00%00IEND%AEB%60%82"
}

var css = '';
css += '.tnt-download { background:url("'+ icons['download'] +'") no-repeat 0 0; }';
css += ".tnt-download:hover { background-position:0 -24px; }";
css += '.tnt-download a { background:none !important; }';
css += '.tnt-download-all { z-index:99; position:relative; display:block; float:right; margin-top:-15px; margin-right:-11px; padding:2px 5px 2px 20px; border:1px solid #126178; background:#021921 url("'+ icons['download'] +'") no-repeat 5px 5px; }'
css += '.tnt-download-all:hover { background-position:5px -19px; }';
GM_addStyle(css);

var console = { log:function(){}}
if( unsafeWindow.console ) {
  console = unsafeWindow.console;
}

function run( $ ) {
  function download_replay( url ) {
    window.setTimeout(function(){
      GM_xmlhttpRequest({
        method: 'POST',
        'url': url + '/download',
        headers: {
          'Accept': 'application/atom+xml,application/xml,text/xml'
        },
        onload: function(resp) {
          if( resp.finalUrl ) {
            $('body').append('<iframe style="visibility:hidden;" src="' + resp.finalUrl + '" />');
          }
        }
      });
    },0)
  }

  $.fn.process_replays = function() {
    return this.each(function(){
      var $t = $(this);
      var $download_link = $('<a href="#">Download</a>');
      $download_link.click(function(){
        var url = $t.find('.title a:first').attr('href').replace('/&',''); // get link, remove trailing slash if there is one.
        download_replay(url);
        return false;
      });
      $t.find('ul.group').append('<li class="tnt-download" />')
      $t.find('.tnt-download').append($download_link);
    });
  }
  
  var $download_all_link = $('<a class="tnt-download-all" href="#">DL All</a>');
  $download_all_link.click(function(){
    $('.starcraft2replay .title').each(function(){
      var $t = $(this);
      download_replay($t.find('a:first').attr('href'));
    });
    return false;
  });
  $('.listing-starcraft2replay').before($download_all_link);
  
  $('#content .starcraft2replay').process_replays();
  $('#content').bind('DOMNodeInserted', function(e) {
    var $target = $(e.target);
    if( $target.hasClass('search-results') ) {
      $target.find('.starcraft2replay').process_replays();
      $('.listing-starcraft2replay').each(function(){
        var $t = $(this);
        if( $t.prev('.tnt-download-all').length == 0 && $t.children('li') > 1 ) {
          $('.listing-starcraft2replay').before($download_all_link);
        }
      })
    }
  });

}

function get_$(callback) {
  if( typeof unsafeWindow.jQuery != 'undefined' ) {
    callback(unsafeWindow.jQuery);
    return;
  }
  window.setTimeout(this(callback), 500);
}

get_$(run);//get the money (jQuery) and run!