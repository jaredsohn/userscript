// ==UserScript==
// @name        MicroMkv
// @namespace   MicroMkv
// @include     http://micromkv.com/*
// @version     1
// @grant       none
// ==/UserScript==
    var currentPage = 1;

jQuery(document).ready(function(){
    jQuery('#logo-area').remove();
    jQuery("#main-header").remove();
    var $ = jQuery;
    $('.container').css('width','100%');
    $('#left-area').css('width','75%');
    highlight($('#articles-content'));
    downloadBtn($(".rmor"));


    function highlight($posts){
        var favShows = ['Arrow','Brooklyn Nine Nine','Revolution','The Tomorrow People','Once Upon a Time','Sean Saves the World','Trophy Wife','The Goldbergs','Marvel Agents ','How I Met Your Mother','The Blacklist','Mom ','2 Broke Girls','Dracula','Haven','Super Fun Night','Dads','Sleepy Hollow','Hawaii Five-0','Elementary','Lost Girl','Beauty and the Beast','The Simpsons','Atlantis','Grimm','The Legend of Korra','The Big Bang Theory','The Neighbors','Last Man Standing','White Collar','Anger Management','The Millers','Two and a Half Men','Ground Floor','Mike and Molly','Dragons Defenders of Berk','The Crazy Ones'];
        var badShows = ['The Voice'];
        $posts.find('article').each(function(i,d){
            var title = $(this).find('h4 a').html();
            if ((new RegExp( '\\b' + favShows.join('\\b|\\b') + '\\b','i')).test(title)) {
                $(d).css('background-color','#98F5FF');
            }
            
            
        });
    }
    function downloadBtn($posts){
        $posts.each(function(i,d){
        $(d).css('padding','22px 30px');
            $(d).appendTo($(d).closest('article').children("h4"));// move the download button up to the post title
            var url = $(d).attr("href");
            console.log(url);
            var $div = $("<div>");
            $div.load(url + " .bigblue", function(){
                console.log($div.html());
                $(d).html("Download");
                $(d).attr('href' , $div.find("a").attr('href'));
                
            });
        });
    }
    

    var bLoding = false;
    jQuery(window).scroll(function() {
    //console.log("scrooling");
        if($(window).scrollTop() > $(document).height() - $(window).height() - 1000  && bLoding == false) {
            bLoding = true;
            console.log("nextPage");
            var d = $("<div/>");
            currentPage ++
            //var nextPage = $('.current:last').next().attr("href") ;
            var nextPage = 'http://micromkv.com/page/' + currentPage + '/'
            console.log(nextPage);
            d.load( nextPage + " #articles-content" , function (){
                bLoding = false;
                highlight(d);
                downloadBtn(d.find(".rmor"));
                
                //d.css('background','red');
                d.insertBefore(".wp-pagenavi");
                
            });
            
        }
    });
    
    
/*           // ajax call get data from server and append to the div
           
           //alert ("loading");

           
           
                
                
                //d.find("h2:first").hide();
        //$( ":contains(Latest Movies and TV Shows)" ).hide();


    }
});*/
    
});

