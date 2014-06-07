// ==UserScript==
// @name       Hacker News Never Ending Scroll
// @namespace  http://hacker.news.never.ending.scroll/
// @version    0.1.2
// @description Adds never ending scroll to the Hacker News page
// @match      http://news.ycombinator.com
// @copyright  2012+, Jorgen Horstink
// ==/UserScript==

(function() {
  var a, load, Step;

  Step = function () {
    var steps, run;
    
    steps = Array.prototype.slice.call(arguments);
    run = function () {
      var fn;
      
      (fn = steps.shift()) && fn.apply(run, arguments);
    };
    
    run();
  };

  load = function (url, callback) {
    var script;
      
    script = document.createElement('script');
    script.src = url;
    
    script.onreadystatechange = function () {
      if (this.readyState === 'complete') {
        callback();
      }
    };
    
    script.onload = callback;
      
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  a = function() {
    Step(
      function () { load('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', this); },
      //function () { load('http://localhost:3000/hackernewsfilter/filter.js', this); } 
      function () {
        var fetch;
        
        function more() {
          var tr;
          
          fetch = $('a[rel="nofollow"]').filter(function () { return $(this).text() === 'More'; });
          
          tr = fetch.closest('tr');
          tr.prev().remove();
          tr.remove();
        }

        more();

        $(window).scroll(function(){
          if ($(window).scrollTop() == $(document).height() - $(window).height()){
            $.get(fetch.attr('href'), function (data) {

              var $trs = $('<div>').html(data).find('a[id^="up_"]').closest('table').find('tr');
              $table.append($trs);
              
              more();
            });
          }
        });
      }
    );
  };
  
  if (/Firefox/.test(navigator.userAgent)) {
    setTimeout(a, 0);
  } else {
    a();
  }
}());​