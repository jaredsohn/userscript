// ==UserScript==
// @name       Fanfou counter
// @namespace  http://fanfou.com/Singularity
// @version    0.1
// @description  count your daily message posts
// @match      http://fanfou.com/home
// @copyright  Singularity
// ==/UserScript==


(function(){

    var count = jQuery("#user_stats>li:last span:first");
    var clone = jQuery("#user_stats>li:last span:first").clone();
    var label = jQuery("#user_stats>li:last span:last");
    if (window.localStorage.getItem("lastTotalCount") == null) window.localStorage.setItem("lastTotalCount", parseInt(count.text())); 
    if (window.localStorage.getItem("lastCount") == null) window.localStorage.setItem("lastCount", 0); 
    if (window.localStorage.getItem("lastDate") == null) window.localStorage.setItem("lastDate", (new Date).toDateString());
    
    label.text("今日饭量");
    
    var updateCount = function(){
        var lastT = parseInt(window.localStorage.getItem("lastTotalCount"));
        var date = window.localStorage.getItem("lastDate");
        var val = parseInt(count.text()) - lastT;
        if (val > 100) clone.css("color","red"); else clone.css("color","black");
        
        if ((new Date).toDateString() != date){
            clone.text(parseInt(count.text()) - lastT);
            window.localStorage.setItem("lastTotalCount", parseInt(count.text())); 
        }else{
            clone.text(parseInt(count.text()) - lastT);
        }
        
        window.localStorage.setItem("lastDate", (new Date).toDateString());
        count.hide();
        clone.insertAfter(count);
    }
    
    updateCount();   
      
    
    
})();
