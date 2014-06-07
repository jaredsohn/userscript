// ==UserScript==
// @name           mixi 6 years diary
// @namespace      http://aeg.jugem.jp
// @include        http://mixi.jp/
// @include        http://mixi.jp/view_diary.pl?id=*
// @include        http://mixi.jp/home.pl*
// @require        http://code.jquery.com/jquery-1.7.min.js

// ==/UserScript==
// Version 1.6

(function() {


   var pastYears = 6;
   var lastDiaryNum = 5;

    var t = new Array(2);

   function update_diary_list(id, year, month, day) {
      function on_list_diary(response) {
         var s = "";
         var pattern = new RegExp(
               "<dt>(<input name=\"diary_id\"[^>]+>)?<a href=\"(view_diary\\.pl\\?id=\\d+&owner_id=\\d+)[^>]*>([^<]*)<\/a>",
               "ig");
//         var pattern = new RegExp("<dt>(<input name=\"diary_id\"[^>]+>)?<a href=\"(view_diary\\.pl\\?id=(\\d+)&owner_id=\\d+)[^>]*>([^<]*)<\/a><span><a[^>]+>[^<]+</a></span><img[^<]+</dt>\n<dd>([^>]+)</dd>\n</dl>\n</div>\n.*\n<p>[^<]+</p>\n<div[^>]+>\n<ul>\n<li><a[^>]+>[^<]+</a></li>\n<li><a[^>]+>\u30b3\u30e1\u30f3\u30c8\uff08(\\d+)\uff09", "ig");

         var m;
         var c=0;
//         while (m = pattern.exec(response.responseText)) {
           while ((m = pattern.exec(response.responseText)) && (c++ < lastDiaryNum)) {
            s += '<li><a href="' + m[2] + '">' + m[3] + '</a>\n';
//               s += '<li><a href="'+ m[2] + '">' + m[4] +'('+ m[6] +')'+'</a>\n';
           }
         if (s != "") {
            s = "<ul>\n" + s + "</ul>\n";
         }
         t[year].innerHTML = s;
         return;
      }
      GM_xmlhttpRequest({
         method : "GET",
         url : "http://mixi.jp/list_diary.pl?id=" + id + "&year=" + year
               + "&month=" + month + "&day=" + day,
         onload : on_list_diary
      });
      return;
   }

   function update_diary_list_home(id, year, month, day) {
      var cache_key = "cache" + (n_year - year);
      var cache_str_key = cache_key + "_str";
      var today = year + "/" + month + "/" + day;
      var cache_date = GM_getValue(cache_key);

      function on_list_diary(response) {
         var s = "";
         var pattern = new RegExp(
               "<dt>(<input name=\"diary_id\"[^>]+>)?<a href=\"(view_diary\\.pl\\?id=\\d+&owner_id=\\d+)[^>]*>([^<]*)<\/a>",
               "ig");
         var m;
         while (m = pattern.exec(response.responseText)) {
            s += '<li><a href="' + m[2] + '">' + m[3] + '</a>\n';
         }
         if (s != "") {
            s = "<ul>\n" + s + "</ul>\n";
         }
         t[year].innerHTML = s;
         GM_setValue(cache_key, (year == n_year)? false :today);
         GM_setValue(cache_str_key, s);
         return;
      }

       var urlstr = "http://mixi.jp/list_diary.pl";
       if (year != n_year) {
          urlstr = "http://mixi.jp/list_diary.pl?id="+id+"&year="+year+"&month="+month+"&day="+day;
      }
      if (cache_date == undefined) {
         GM_xmlhttpRequest({
            method : "GET",
            url : urlstr,
            onload : on_list_diary
         });
      } else if (cache_date == today) {
         var s = GM_getValue(cache_str_key);
         if (s != undefined) {
            t[year].innerHTML = s;
         } else {
            GM_xmlhttpRequest({
               method : "GET",
               url : "http://mixi.jp/list_diary.pl?id=" + id + "&year=" + year
                     + "&month=" + month + "&day=" + day,
               onload : on_list_diary
            });
         }
      } else {
         GM_xmlhttpRequest({
            method : "GET",
            url : "http://mixi.jp/list_diary.pl?id=" + id + "&year=" + year
                  + "&month=" + month + "&day=" + day,
            onload : on_list_diary
         });
      }
      return;
   }

   function ViewDiary() {
      var oid = "";
      if (url.match(/view_diary.pl\?id=.*\&owner_id=(\d+)/)) {
         oid = RegExp.$1;
      } else {
          return;
      }

      var date = $('div.listDiaryTitle dl dd:first').text();

      var m = date.match(/(\d+)\u5E74\s*(\d+)\u6708\s*(\d+)\u65e5/);
      var year = RegExp.$1;
      var month = RegExp.$2;
      var day = RegExp.$3;

      GM_log(year + "/" + month + "/" + day);

      var div = $('div.viewDiaryBox')[0];
      var diary_box = document.createElement("div");
      var str = "";
      diary_box.className = "diaryBox";

      str = '<table><tbody valign="top"><tr><th style="width: 250px;">'
            + (year - 2)
            + '\u5E74\u306E\u65E5\u8A18</th><th style="width: 250px;">'
            + (year - 1) + '\u5E74\u306E\u65E5\u8A18</th></tr>';
      str += '<tr><td id="'
            + 'div'
            + (year - 2)
            + 'diary"><font color="gray">Loading\u2026</font></td><td id="'
            + 'div'
            + (year - 1)
            + 'diary"><font color="gray">Loading\u2026</font></td></tr></tbody></table>';
      diary_box.innerHTML = str;

      div.insertBefore(diary_box, div.firstChild);
      t[year - 2] = $('#div' + (year - 2) + 'diary')[0];
      t[year - 1] = $('#div' + (year - 1) + 'diary')[0];

      update_diary_list(oid, year - 2, month, day);
      update_diary_list(oid, year - 1, month, day);

   }

   function Home() {

     // var div = $('div.myCommentHistory')
      var div =$('#myArea div div.contents:first')
       var href = $('.personalNavigation .personalNaviHome .profile a').attr(
            'href');
      if (href.match(/show_profile\.pl\?.*id=(\d+)/)) {
         oid = RegExp.$1;
      } else {
         return;
      }

      var s = '<table><tbody style="background-color: white;" valign="top">';
      for ( var i = 1; i < pastYears; i++) {
         s += '<tr><td >' + (n_year - i)
               + '\u5E74\u306E\u3042\u306A\u305F\uFF1A';
         s += '<tr><td id="' + 'div' + (n_year - i)
               + 'diary"><font color="gray">Loading\u2026</font>';
      }
      s += '</tbody></table>';
      s += '<div align="right">by <a href="http://userscripts.org/scripts/show/38520">10年連続mixi日記</a></div>';

      var element = document.createElement('div');
      element.style.cssText = 'padding:2px 0 4px; border-right:1px solid #d0d0d0; border-left:1px solid #d0d0d0;background:#ffffff;';
      element.id = "div6yearsdiary";
      element.className = "myUpdate";
      element.innerHTML = s;
      div.append(element);

      for ( var i = 1; i < pastYears; i++) {
         t[n_year - i] = $('#div' + (n_year - i) + 'diary')[0];
         update_diary_list_home(oid, n_year - i, n_month, n_day);
      }
   }

   var url = document.location.href;

   var d = new Date();
   var n_month = d.getMonth() + 1;
   var n_day = d.getDate();
   var n_year = d.getFullYear();

   if (url.match(/(\.jp\/home\.pl.*|\.jp\/?$)/)) {
      Home();
   } else {
      ViewDiary();
   }

})();