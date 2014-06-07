// ==UserScript==
// @name           OpenPNE Diaries Grouping
// @namespace      http://tomohiro.github.com
// @description    OpenPNE Diaries Grouping
// @include        http://openpne.example.com/
// @version        0.0.1
// ==/UserScript==
(function() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://' + location.hostname + '?m=pc&a=page_h_diary_list_friend',
        onload: function(responce) {
            var doc = (new DOMParser()).parseFromString(responce.responseText, 'application/xml');
            var datetimes = doc.getElementsByTagName('dt');
            var titles = doc.getElementsByTagName('dd');

            var size = titles.length;
            var diaries = {}; 
            var limit = 0;
            for (var i = 0; i < size; i++) {
                titles[i].textContent.match(/\) \((.+?)\)$/);
                var user = RegExp.$1;
                var month_day = '<span class="date">' + datetimes[i].textContent.match(/..月..日/) + '</span>';

                if (diaries[user] == null) {
                    diaries[user] = month_day + titles[i].innerHTML;
                    limit++;
                }   

                if (limit == 5) {
                    break;
                }   
            }   

            var ul = document.getElementsByClassName('articleList')[0];
            var li = ul.getElementsByTagName('li');

            var i = 0;
            for (var user in diaries) {
                li[i].innerHTML = diaries[user];
                i++;
            }   
       }   
   }); 
})();