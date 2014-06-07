// ==UserScript==
// @name       VK no dirty SEO
// @namespace  n/a
// @version    0.1.016
// @description  enter something useful
// @match      https://vk.com/feed
// @match      http://vk.com/feed
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @copyright  2013+, Gheljenor
// ==/UserScript==

var stopWords = [
    "подписывайся", "подпишись", "присоединяйтесь к нам", "быть подписчиком", 
    "паблик", "паблику", "паблике", "паблика",
    "заходи в группу",
    "продолжение в группе",
    "узнай подробности",
    "участие в конкурсе",
    "онлайн-курс", "онлайн-курсы", "онлайн обучение", "акция", "мастер-класс", "мастер класс", "вебинар", "вебинары",
    "отвечайте в комментариях и голосуйте", "поделиться этой записью",
    "открыть полностью", "показать полностью", "читать полностью",
    "читать далее..", "читать продолжение..",
    "смотрите результаты теста", "посмотреть полностью", "прoдoлжeние истoрии в источнике",
    "разыгрываем",
    "методика увеличения члена",
    "ios"
];

String.prototype.antiTranslit = (function(){
    
    var noTranslit = {
        '0': "о", "o": "о",
        "e": "е", 
        "a": "а",
        "h": "н",
        "p": "р",
        "c": "с",
        "t": "т",
        "y": "у",
        "r": "г",
        "x": "х",
        "4": "ч",
        "b": "в",
        "n": "п",
        "m": "м",
        "6": "б",
        "k": "к"
    };
    var fnReplace = function(a){ return noTranslit[a] || a; };
    var reg = new Regexp("["+Object.keys(noTranslit).join()+"]", "gi");
    
    return function(a){ return a.replace(reg, fnReplace); };
})();


jQuery.noConflict();
(function( $ ) {
    var matchArray = function(str, arr){
        for (var k = 0, l = arr.length; k < l; k++) if (~str.search(arr[k])) return true;
            return false;
    };
    
    var removeAds = function(rows){
        var toKill = [];
        
        $(rows).each(function(){
            var $this = $(this);
            var fulltext = $this.clone().find(".wall_post_more").remove().end().text().toLowerCase().antiTranslit();
            if (matchArray(fulltext,stopWords)) {
                toKill.push($this.find(".post").attr("id"));
            }
        });
        
        setTimeout(function(){
            for (var k = 0, l = toKill.length; k < l; k++) {
                $("div#"+toKill[k]+" .post_delete_button").click();
                console.warn(" -------------------------------- " + toKill[k]);
            }
        }, 30);
        
        return toKill;
    };
    
    removeAds("#feed_wall .feed_row");
    
    var vkAjax = ajax.post;
    var feedUrl = /al_feed\.php/i;
    ajax.post = function(){
        if (feedUrl.test(arguments[0]) && arguments[2] && arguments[2].onDone){
            var oldDone = arguments[2].onDone;
            arguments[2].onDone = function(options, rows, updates_timestamp){
                removeAds(rows);                
                return oldDone.apply(this, arguments);
            }
        }       
        
        return vkAjax.apply(this, arguments);
    };
    
    var vkHTML = Wall.getNewPostHTML;
    Wall.getNewPostHTML = function(){
        var html = vkHTML.apply(this, arguments);
        removeAds("<div>"+html+"</div>");
        return html;
    };
    
})(jQuery);