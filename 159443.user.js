// ==UserScript==
// @name       CSFD StarNames
// @namespace  thetom
// @version    2.6
// @description  Přidává k interním csfd odkazům na filmy hodnocení přihlášeného uživatele
// @match      http://www.csfd.cz/*
// @exclude    */hodnoceni/*
// @require       http://code.jquery.com/jquery-1.9.1.min.js
// @copyright  2013+, TheTom <hejl.tomas@gmail.com>
// ==/UserScript==

StarNames = {
	
    userLink: undefined,
	
    stars: {},
    storageKey: undefined,
    storageTimeKey: undefined,
    lastUpdate: undefined,
    popupCounter: 0,
    
    exportStars: function(){
        localStorage.setItem( StarNames.storageKey, JSON.stringify( StarNames.stars ) );
        localStorage.setItem( StarNames.storageTimeKey, new Date().getTime() );
    },
    
    importStars: function(){
        if( localStorage[StarNames.storageKey] ){
            StarNames.stars = JSON.parse( localStorage[StarNames.storageKey] );
        }
        if( localStorage[StarNames.storageTimeKey] ){
            StarNames.lastUpdate = localStorage[StarNames.storageTimeKey];
        } else {
            StarNames.lastUpdate = 0;
        }
    },

    run: function(){
        var loggedIn = $("#user-menu").hasClass("logged");
        if(!loggedIn){
            return;
        }
		
        StarNames.userLink = $("#user-menu > a").attr("href");
        StarNames.storageKey = "StarNames"+StarNames.userLink;
        StarNames.storageTimeKey =  StarNames.storageKey+"Time";
        
        StarNames.importStars();
        
        StarNames.findRating();
        
        var now = new Date().getTime();
        if( now - StarNames.lastUpdate > 1000*60*60*24*3 ){ 
            StarNames.refresh();
        } 
        StarNames.paintStars();
        
        StarNames.createRefreshBtn();
    },
    
    createRefreshBtn: function(){
        $("#user-menu").append('<a id="starNamesRefreshBtn" style="position:absolute;top:5px;right:-130px;cursor:pointer">Obnovit StarNames</a>');
        $("#starNamesRefreshBtn").click(StarNames.refresh);
    },
	
    loadPage: function( starListURL ){
        $.ajax({
            type: "GET",
            url: starListURL,
            async: true
        }).done(function(data){
            StarNames.loadPageDone(data);
        });
    },
    
    loadPageDone: function(starListHTML){
        if(!starListHTML){
            return;
        }
        var htmlInline = starListHTML.replace(/(\r\n|\n|\r)/gm,"");
		
        var starTable = htmlInline.match(/\<table\ class\=\"ui-table-list\"\>.*\<\/table\>/)[0];
        $(starTable).find("tbody tr").each(function(){
            var $row = $(this);
            var filmURL = $("a.film",$row).attr("href");
            var $rating = $(".rating",$row);
            var filmRating = 0;
            if( $rating.is("img") ){
                filmRating = $(".rating",$row).attr("alt").length;
            } else if( $rating.text() == "odpad!" ){
                filmRating = 0;
            }
            StarNames.push(filmURL,filmRating);
        });
        var nextPageURL = $(htmlInline).find("a.next").attr("href");
        if(nextPageURL){
            StarNames.loadPage( nextPageURL );
        } else {
            StarNames.finishRefresh();
        }
    },
	
    refresh: function(){
        StarNames.popup("Obnovuji StarNames");
        StarNames.stars = {};
        var starListURL = StarNames.userLink + "hodnoceni";
        StarNames.loadPage( starListURL );
    },
    
    finishRefresh: function(){
        StarNames.exportStars();
        StarNames.paintStars();
        StarNames.popup("Hotovo, hodnocení načteno");
    },
	
    push: function( filmURL, filmRating ) {
        StarNames.stars[filmURL] = filmRating;
    },
    
    paintStars: function(){
        $(".SNRank").remove();
        $("a.film").each(function(){
            StarNames.processLink($(this)); 
        });
    },
    
    processLink: function ( $link ){
        var address = $link.attr("href");
        if(typeof(address)!="string"){
            return;
        }
        var starCount = StarNames.stars[address];
        if(starCount==undefined){
            return; // nehodnoceno
        }
        var html = "<span class='SNRank' style='width:40px;margin:0px 3px 0 0;display:inline-block;text-align:left;text-indent:0'>";
        if(starCount==0){
            html += "odpad";
        } else {
            for(var i=0; i<starCount; i++){
                html += '<img src="http://img.csfd.cz/assets/images/rating/stars/1.gif" class="rating" style="width:8px;margin:0" alt="*">';
            }
        }
        html += "</span>";
        $link.prepend(html);
        
    },
    
    findRating: function(){
        var $ratingSpan = $(".my-rating");
        if(!$ratingSpan.length || $ratingSpan.hasClass("not-found")){
            return;
        }
        var rating = undefined;
        if($ratingSpan.text()=="odpad!"){
            rating = 0;
        } else {
            rating = $ratingSpan.find("img").length;
        }
        var urlMatch = location.href.replace("http://www.csfd.cz","").match(/(\/film\/[^\/]*\/)/);
        if(urlMatch){
            shortURL = urlMatch[1];
        } else {
            return;
        }
        
        StarNames.push( shortURL, rating );
        StarNames.exportStars();
    },
    
    popup: function( htmlContent, timeout ){
        var id = StarNames.popupCounter++;
        if(!timeout){
            timeout = 2;
        }
        if(!htmlContent){
            return;
        }
        var yOffset = 10;
        $("body").append("<div class='SNPopup' id='SNPopup"+id+"' style='border-radius:4px;box-shadow:4px 4px 5px #888;display:none;padding:10px;background:#8D0B0B;color:white;position:absolute;top:"+yOffset+"px;right:10px'>"+htmlContent+"</div>");
        var $me = $("#SNPopup"+id);
        $me.slideDown(100);
        (function(id){
            setTimeout(function(){
                $("#SNPopup"+id).slideUp(100)
                },timeout*1000);
        })(id)
    }
    
}
    
StarNames.run();