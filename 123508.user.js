// ==UserScript==
// @name           Piratebay New look !!
// @version        1.0
// @author         Prashanth Devaraj
// @namespace      http://userscripts.org/users/santaduda
// @description    Modified design of the website and removed ads
// @include        http://thepiratebay.org/*
// @include        http://thepiratebay.se/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    //Function to modify header design
    function modifyHeader()
    {
        $("#header").css({'border-bottom':'1px solid brown','border-top':'2px solid brown','box-shadow':'0px 2px 20px brown','margin-bottom':'15px','padding': '20px'} );
    }

    //Function to modify content design between header and footer
    function modifyContent()
    {
        $('body').css({'background': 'url("http://i43.tinypic.com/2e1vx3c.jpg") repeat scroll 0 0 transparent','margin': 'auto'});
        $('h2').css({'background':'none repeat scroll 0 0 Peru'});
        $('#main-content').css({'border-radius':'10px 10px 10px 10px','box-shadow':'0 0 5px grey','margin':'0px 10px 10px','overflow':'hidden','padding':'10px','position':'relative','z-index':'90'});

        //Modify submit button css in allthe pages
        $(":submit").css({'background':'url("http://devgrow.com/examples/cssbuttons/button.png") repeat-x scroll center bottom #777777','border':'medium none','border-radius':'5px 5px 5px 5px','color':'#FFFFFF','cursor':'pointer','display':'inline','font-weight':'bold','padding':'5px 10px','text-shadow':'1px 1px #666666'});
        $(":submit").addClass("button");
        $('.button').css({'background-color':'brown'});
        
        //Add rounded corner with shadow effects for the torrent detail content section.
        $("#detailsframe").css({'background':'none repeat scroll 0 0 white','border-radius': '10px 10px 10px 10px','box-shadow': '0px 0px 10px','margin-top': '0'});   

        //Add background color and boder for torrent data screenlets in torrent detail page
        $("#detailsouterframe").css({'border-radius':'5px 5px 5px 5px'})
        $('#details').css({'background':'none repeat scroll 0 0 #FFFFFF'});
        $('#details dl').css({'background' : 'none repeat scroll 0 0 #FDF7B8','border': '1px solid brown','margin':'10px 25px 10px 0px','padding': '10px 5px'});   

        //Modify css for Torrent title section in torrent detail page
        $('#detailsframe #title').css({'background': 'none repeat scroll 0 0 Peru','color': '#FFFFFF','font-family':' Arial','font-size': '16px','font-weight': 'bold','padding': '8px 0px 8px 15px'});

        //Modify css of the data container in the content section
        $('.nfo').css({'background': 'none repeat scroll 0 0 #FDF7B8','border': '1px solid #D2B9A6'});

        //Change twitter icon in torrent detail page
        $('#social a').html("<img src='http://cdn1.iconfinder.com/data/icons/inside/PNG/128x128/icontexto-inside-twitter.png' width='80px' title='Tweet'/>");

        //Move the twitter link to footer section
        $('#fbanners').append($('#social a'));
    
    }

    //Function to modify footer design
    function modifyFooter()
    {
        $("#foot").css({'background':'url("http://i39.tinypic.com/21jdeh1.gif") repeat scroll 0 0 transparent','border': '1px solid brown','box-shadow': '0px 0px 25px brown'});
        $("#foot a").css({'color':'#FFFFFF','font-family':'tahoma','font-size': '12px','text-decoration': 'none'});
        $("#footer").css({'color':'#FFFFFF'});
        $(".rss img").attr("src","http://cdn1.iconfinder.com/data/icons/inside/PNG/128x128/icontexto-inside-rss.png");
        $(".rss img").attr('width','80px');
        $("#kopimi").remove();
    }    
    
    //Dividied the design into three function so that its easy to understand with section has been designed
    function modifyDesign()
    {
        modifyHeader();
        modifyContent();
        modifyFooter()
    }
    
    function removeAds()
    {
$("body").children("a:first").remove();

        $('#sky-left').remove();
        $('#sky-right').remove();
        $('#sky-banner').remove();
        $('iframe').remove();
        $('#social').next().remove(); // Remove piratebay toolbar
        $("div[id*='zedoslider']").remove();
    }

    //Remove annoying ads
    removeAds(); 
    modifyDesign();  
});
