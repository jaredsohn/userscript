// ==UserScript==
// @name         Animes-BG Link Grabber
// @namespace    ....
// @include      *
// @grant        none
// @author       dripper (with special thanks to Moon4u)
// @description  Takes the forum links, and write them at the bottom of the page, ready to be pasted in the Catalogue topic.
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main() {
    $("<style rel='stylesheet' type='text/css'> .url-grabber { display: none; position: fixed; bottom: 0; right: 0; background: #000; padding: 5px; } .url-grabber span { display: block; font: 16px/30px arial, sans-serif; color:#fff; cursor: pointer; } .url-grabber span:hover { color:red; } .url-grabber span.remove { display: none; } </style>").appendTo("head");
    $('<div class="url-grabber"><span class="remove">Remove URLs</span><span class="full-get">Full URL Grabber</span><span class="get">URL Grabber</span></div><div class="url-grabber-links"></div>').appendTo("body");

   $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
           $('.url-grabber').fadeIn();
       }else{
          $('.url-grabber').fadeOut();
       }
    });

   function asc_sort(a, b){
      if ($(a).text() > $(b).text()) return 1;
      if ($(a).text() == $(b).text()) return 0;
      if ($(a).text() < $(b).text()) return -1;
    }

    $('span.get').click(function(){
      $(this).parent().children().hide();
      $('span.remove').show();
      $title = $(".topictitle").sort(asc_sort);
      $title.each(function(e){
        var text = '[url=' + location.protocol + '//' + location.host + $(this).attr('href').replace('.','') + ']' + $(this).text().replace('Link: ','').replace('[Eng]', '').replace('[H-Game]', '').replace('[H-game]','') + "[/url]<br/>";
        $('.url-grabber-links').append(text);
      })
    })
    $('span.remove').on('click', function(){
      $(this).parent().children().show();
      $('.url-grabber-links').empty();
      $(this).hide();
    })

    $('span.full-get').click(function(){
      $(this).parent().children().hide();
      $('span.remove').show();
      var pagesNumber = $('.tbspace:eq(0) .gensmall').find("a:last").prev().text();
      var counter = 0;
      var a = new Array();
      function push_a(new_e) {
        for (var i = 0; i<a.length; i++) { 
          if ($(a[i]).text() == $(new_e).text()) {
            return;
          }
        }
        a.push(new_e);
      }
      for ( counter; counter < pagesNumber; counter++ ){
        var getPage = counter*50;
        function ajaxFunc() {
          if (counter == 0) {
             return $.get(location.href, function(data){})
          }else{
           return $.get(location.href + '&start='+getPage, function(data){})
          }
        };
        var promise = ajaxFunc();
        if (counter == pagesNumber -1) { 
          promise.success(function (data) {
            $(data).find('.topictitle').each(function(i,e) { push_a(e);});
            sort_and_print();
          });
        } else {
          promise.success(function (data) {
            $(data).find('.topictitle').each(function(i,e) { push_a(e);});
          });
        }
      }
      function sort_and_print() {
        a = a.sort(asc_sort)
        for (var i =0; i<a.length;i++){
          $('.url-grabber-links').append( '[url=' + location.protocol + '//' + location.host + $(a[i]).attr('href').replace('.','') + ']' + $(a[i]).text().replace('Link: ','').replace('Link:','')+'[/url]<br/>')
        }
      }
    })
    


}


addJQuery(main);