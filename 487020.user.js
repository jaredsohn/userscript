// ==UserScript==
// @name           Lepro RatingColorizer
// @author         UnDetected. al-dexter
// @version        2.2
// @description    Добавляем наглядность рейтингам
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function(){
    
    colorizeRating(document.getElementsByClassName("vote_result"));
    colorizeKarma();
    
    function colorizeKarma() {
        var karmaNumberContainer = document.getElementById("js-karma");
        if (karmaNumberContainer) {
            colorize(karmaNumberContainer);
        }
    }
    
    function colorizeRating(e) {
        for (i=0; i < e.length; i++) {
            var ratingNumberContainer = e[i];
            colorize(ratingNumberContainer);
        }
    }
    
    function colorize(numberElement) {
        var number = parseInt(numberElement.innerHTML, 10);
        if (number != 0) {
            numberElement.style.color = (number > 0) ? "#0a0" : "#f00";
        }
    }
})();