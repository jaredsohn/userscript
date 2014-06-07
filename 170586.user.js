// ==UserScript==
// @name        YoutubeHistoryStats
// @namespace   YoutubeHistoryStats
// @description Watched History Statistics for Youtube
// @include     http://www.youtube.com/feed/history
// @include     https://www.youtube.com/feed/history
// @version     3.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js
// @require     http://addywaddy.github.io/jquery.tagcloud.js/jquery.tagcloud.0-0-1.js
// @require     http://code.highcharts.com/highcharts.js
// @require     http://html2canvas.hertzen.com/build/html2canvas.js
// @require     http://canvg.googlecode.com/svn/trunk/rgbcolor.js
// @require     http://canvg.googlecode.com/svn/trunk/StackBlur.js
// @require     http://canvg.googlecode.com/svn/trunk/canvg.js
// @downloadURL https://userscripts.org/scripts/source/170586.user.js
// @updateURL   https://userscripts.org/scripts/source/170586.user.js
// ==/UserScript==

var views = [];
var times = [];
var titles = {};
var authors = {};
var authors_time = {};
var words = {};
var history_titles = {};
var history_authors = {};

function dlHistory(rec, paging, cb) {
   var url = "//www.youtube.com/feed_ajax?action_load_personal_feed=1&feed_name=history&paging="+paging;

   $.ajax({
      url:url,
      dataType:'json',
      success:function(data) {
         dlHistoryRec(rec+1, data);
      },
      error:function(a,b,c) {
         if(a.status != 200) {
            showStats();
         } else {
            try {
               // Youtube sometimes sends JSONs with \U chars that trigger errors.
               // Remove them and retry.
               var t = a.responseText;
               t = t.replace(/\\U/g, '');

               var data = JSON.parse(t);
               if(data && data.paging) {
                  dlHistoryRec(rec+1, data);
               } else {
                  showStats();
               }
            } catch(err) {
               console.log(err);
               showStats();
            }
         }
      }
   });
}

function addData(data) {
   if(!data.content_html)
      return;
   var content = $('<span>').html(data.content_html);
   var d = content.find(".feed-item-container");
   $.each(d, function(id, val) {
      var val = $(val);
      var meta = val.find('.yt-lockup-meta-info').find('li');

      var view = $(meta.get(2)).text();
      if(view) { //x,xxx,xxx or x xxx xxx vues 
         view = view.match(/([\d\s,]+)/);
         view = parseInt(view[0].replace(/\s|,/g, ''), 10);
         views.push(view);
      }

      var time = val.find('.video-time').text(); 
      if(time) { //1:29:48 or 0:30
         var m = time.match(/(\d*):?(\d+):(\d+)/);
         time = m[2] + m[1]*60 + (m[0]?m[0]*60*60:0);
         times.push(parseInt(time,10));
      }

      var _title = val.find('.yt-lockup-title').find('a');
      var title = _title.attr('title');
      if(title) {
         if(titles[title]) {
            titles[title]++;
         } else {
            titles[title] = 1;
         }
         var _words = title.match(/(\w+)/g);
         for(var w in _words) {
            var word = _words[w];
            if(word.length < 4)
               continue;
            if(words[word]) {
               words[word]++;
            } else {
               words[word] = 1;
            }
         }
      }

      var _author = val.find('.yt-user-name');
      var author = _author.text();
      if(author) {
         if(authors[author]) {
            authors[author]++;
         } else {
            authors[author] = 1;
         }
         if(authors_time[author]) {
            authors_time[author] += parseInt(time,10);
         } else {
            authors_time[author] = parseInt(time,10);
         }
      }

      if(title && author) {
         history_titles[title] = {
            url:"//www.youtube.com/watch?v="+(_title.attr('href')||''),
         };
         var auth = _author.attr('href');
         history_authors[author] = {
            url:(auth||''),
         };
      }
   });
}

function median(values) {
   values.sort( function(a,b) {return a - b;} );
   var half = Math.floor(values.length/2);
   if(values.length % 2)
      return values[half];
   else
      return (values[half-1] + values[half]) / 2.0;
}

function fisherYates ( myArray ) {
  var i = myArray.length, j, temp;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = myArray[i];
     myArray[i] = myArray[j]; 
     myArray[j] = temp;
   }
}

function topFromHash(hash) {
   var _h = [];
   for(var t in hash) {
      _h.push({t:t,c:hash[t]});
   }
   _h.sort(function(a,b) {
      return b.c - a.c;
   });
   return _h;
}

function topToList(array, limit, hash, time) {
   var ret = "<ul style='padding-left:30px'>";
   for(var i = 0; i < limit && i < array.length; i++) {
      ret += "<li style='margin:5px'><a href='"+hash[array[i].t].url+"'>"+array[i].t+"</a> (";
      if(time) {
         ret += formatTime(array[i].c)+" total video length)</li>";
      } else {
         ret += array[i].c+" vues)</li>";
      }
   }
   ret += "</ul>";
   return ret;
}

function addTitle(title) {
   $("#metaGW").append('<br/><br/><div style="height:60px;"><span class="feed-author-bubble yt-uix-sessionlink rec" data-sessionlink="ei=Ine3UaHqDpOnhgHYw4CwCw&ved=CAQQoR4&feature=g-high-rec"><span class="feed-item-author rec" style="margin-top:4px!important"><img class="system-icon rec" alt="" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"></span></span><span style="font-size:15pt;padding-left:5px;top:10px;position:relative">'+title+'</span></div>');
}

function addSeparators(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

function toKM(n) {
   if(n >= 1000000)
      return Math.floor(n/1000000)+'M';
   if(n >= 1000)
      return Math.floor(n/1000)+'K';
   return n;
}

function showViewStats(views, n) {
   var s_views = 0;
   var bellow;
   var total_add = 0;
   if(n == 0) {
     bellow = [
         [1,0], [2,0], [3,0], [4,0], [5,0], [10,0],
         [20,0], [50,0], [100,0], [1000,0], [10000,0]
     ];
   } else {
     bellow = [
         [10,0], [100,0], [1000,0], [10000,0], [30000,0], [50000,0],
         [100000,0], [200000,0], [300000,0], [1000000,0], [5000000000,0]
     ];
   }
   for(var i = 0; i < views.length; i++) {
      s_views += views[i];
      for(var j = 0; j < bellow.length; j++) {
          if(views[i] <= bellow[j][0] && (j == 0 || views[i] > bellow[j-1][0])) {
            bellow[j][1]++;
            total_add++;
          }
      }
   }
   for(var j = bellow.length - 1; j >= 0; j--) {
      var prev = j>0?(bellow[j-1][0]+1):1;
      if(prev == bellow[j][0]) {
         bellow[j][0] = ''+toKM(bellow[j][0]);
      } else {
         bellow[j][0] = toKM(prev)+'-'+toKM(bellow[j][0]);
      }
   }
   $("#metaGW").append(
         "<ul style='padding-left:30px'>"
         +"<li style='margin:5px'>Total view count of videos: "+addSeparators(s_views)+"</li>"
         +"<li style='margin:5px'>Average view count: "+addSeparators(Math.floor(100*s_views/views.length)/100)+"</li>"
         +"<li style='margin:5px'>Median view count: "+addSeparators(median(views))+"</li>"
         +"</ul><br/><div id='chartviewcontainer"+n+"'></div>");
    if(total_add > 0) {
      $('#chartviewcontainer'+n).highcharts({
         chart: {
             plotBackgroundColor: null,
             plotBorderWidth: null,
             plotShadow: false
         },
         title: {
             text: 'Number of views per video'
         },
         tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1
         },
         plotOptions: {
             pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 dataLabels: {
                     enabled: true,
                     color: '#000000',
                     connectorColor: '#000000',
                     formatter: function() {
                         return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
                     }
                 }
             }
         },
         series: [{
             type: 'pie',
             name: 'Percentage of videos',
             data: bellow
         }]
     });
   }
}

function svgToPng(div, cb) {
    var height = div.innerHeight();
   var width = div.innerWidth();
   $("#loadGW").append('<canvas id="c_canvg" width="'+width+'px" height="'+height+'px" style="display:none"></canvas>');
   canvg('c_canvg', div.find('.highcharts-container').html(), { renderCallback: function () {
       var img = $('#c_canvg')[0].toDataURL("image/png");
       div.find('.highcharts-container').css('display', 'none');
       div.append('<img src="'+img+'" style="height:'+height+'px;width:'+width+'px" />');
       $('#c_canvg').remove();
       cb();
   }});
}

function formatTime(s_time) {
   s_time = parseInt(s_time, 10);
   var hours   = Math.floor(s_time / 3600);
   var minutes = Math.floor((s_time - (hours * 3600)) / 60);
   var seconds = s_time - (hours * 3600) - (minutes * 60);

   if (hours   < 10) {hours   = "0"+hours;}
   if (minutes < 10) {minutes = "0"+minutes;}
   if (seconds < 10) {seconds = "0"+seconds;}
   var time    = hours+':'+minutes+':'+seconds;
   return time;
}

function showStats() {
   $('#loadGW').empty();
   $('#loadGW').html('<center><button id="watch-history-save-button" class=" yt-uix-button yt-uix-button-default" role="button" onclick=";return false;" type="button"><span class="yt-uix-button-content">Download as png</span></button></center><br/>');

   var rendering = 0;
   var cimg = null;
   $('#watch-history-save-button').click(function(){
       if(rendering)
         return;
       rendering = 1;
       if(cimg == null) {
           var win = window.open(cimg);
           $('#watch-history-save-button').find('span').text('Please wait');
           svgToPng($('#chartviewcontainer0'), function() { 
               svgToPng($('#chartviewcontainer1'), function() {
                   html2canvas($('#metaGW'), {
                       onrendered: function (canvas) {
                           cimg = canvas.toDataURL("image/png");
                           win.location = cimg;
                           rendering = 0;
                           for(var i = 0; i < 2; i++) {
                               $('#chartviewcontainer'+i+' img').remove();
                               $('#chartviewcontainer'+i).find('.highcharts-container').css('display', 'block');
                           }
                           $('#watch-history-save-button').find('span').text('Download as png (click again if nothing happened)');
                       }
                   });
               });
           });
       } else {
           window.open(cimg);
       }
   });

   $("#metaGW").append("<center><div>Stats on "+views.length+" videos!</div></center>");

   /* Time */
   addTitle("Time stats");
   var s_time = 0;
   for(var i = 0; i < views.length; i++) {
      s_time += times[i];
   }
   $("#metaGW").append(
         "<ul style='padding-left:30px'>"
         +"<li style='margin:5px'>Total length of videos: "+formatTime(s_time)+"</li>"
         +"<li style='margin:5px'>Average length of videos: "+addSeparators(Math.floor(s_time/times.length))+"s</li>"
         +"<li style='margin:5px'>Median length of videos: "+addSeparators(median(times))+"s</li>"
         +"</ul>");

   /* Top videos */
   addTitle("Most seen videos");
   $("#metaGW").append(topToList(topFromHash(titles), 5, history_titles));
   $("#metaGW").append('<br/>');
   var user_views = [];
   for(var t in titles) {
      user_views.push(titles[t]);
   }
   showViewStats(user_views, 0);

   /* Top channels */
   addTitle("Most seen channels (by views)");
   $("#metaGW").append(topToList(topFromHash(authors), 5, history_authors));

   addTitle("Most seen channels (by total video length)");
   $("#metaGW").append(topToList(topFromHash(authors_time), 5, history_authors, 1));
    
   /* Global view stats */
   addTitle("Global view stats");
   showViewStats(views, 1);

   /* Word cloud */
   addTitle("Word cloud");
   var _words = topFromHash(words);
   _words = _words.slice(0,49);
   fisherYates(_words);
   $("#metaGW").append("<div id='wordcloud' style='padding:0px 30px 30px'></div>");
   var wordclouda = "";
   for(var i = 0; i < _words.length; i++) {
      wordclouda += "<span rel='"+_words[i].c+"'>"+_words[i].t+"</span> ";
   }
   $('#wordcloud').append(wordclouda);
   $.fn.tagcloud.defaults = {
     size: {start: 14, end: 22, unit: 'pt'},
     color: {start: '#cde', end: '#f52'}
   };

   $('#wordcloud span').tagcloud();
}

function dlHistoryRec(rec, data) {
   $('#loadGW').empty().html('<center>Loading metadata... ('+views.length+' videos analyzed)</center>');

   addData(data);
   if(rec < 300)
      dlHistory(rec, data.paging, dlHistoryRec);
   else
      showStats();
};


var GW_dl = $('<div id="mainstats" class="feed-header clearfix" style="padding-bottom:5px">').html('<center><button id="watch-history-stats-button" class=" yt-uix-button yt-uix-button-default" role="button" onclick=";return false;" type="button"><span class="yt-uix-button-content">Show statistics</span></button></center>');
$(".branded-page-v2-primary-col-header-container").append(GW_dl);
GW_dl.find('button').click(function() {
   $('#mainstats').empty().append('<div id="loadGW"></div><div id="metaGW"></div><div id="contentGW"></div>');
   dlHistoryRec(0, {paging:0});
});