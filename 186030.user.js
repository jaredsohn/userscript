// ==UserScript==
// @name            TPB - Black Theme
// @author          Cerberus
// @namespace       http://thepiratebay.pe
// @description     Modified dark design of the website
// @include         http*://thepiratebay.*
// @version         1.0
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    //Function to modify header design
    function modifyHeader()
    {
        $("#header").css({'border-bottom':'1px solid white','border-top':'2px solid #000','margin-bottom':'15px','padding': '20px'} );
    }

    //Function to modify content design between header and footer
    function modifyContent()
    {
        $('body').css({'background': 'repeat scroll 0 0 #000','margin': 'auto','color':'#FFF'});
        $('h2').css({'background':'none repeat scroll 0 0 #000'});
        $('a').css({'color':'#CC0000'});  
       
        //Add rounded corner with shadow effects for the torrent detail content section.
        $("#detailsframe").css({'background':'none repeat scroll 0 0 white','border': '10px 10px 10px 10px','margin-top': '2'});   

        //Add background color and boder for torrent data screenlets in torrent detail page
        $("#detailsouterframe").css({'border-radius':'5px 5px 5px 5px'})
        $('#details').css({'background':'none repeat scroll 0 0 #000'});
        $('#details dl').css({'background' : 'none repeat scroll 0 0 #000','margin':'10px 25px 10px 0px','padding': '10px 5px'});   

        //Modify css for Torrent title section in torrent detail page
        $('#detailsframe #title').css({'background': 'none repeat scroll 0 0 #000','color': '#FFF','font-family':' Arial','font-size': '16px','font-weight': 'bold','padding': '8px 0px 8px 15px'});

        //Modify css of the data container in the content section
        $('.nfo').css({'background': 'none repeat scroll 0 0 #000','border': '1px solid #000'});

        //Change twitter icon in torrent detail page
        $('#social a').html("<img src='http://cdn1.iconfinder.com/data/icons/inside/PNG/128x128/icontexto-inside-twitter.png' width='80px' title='Tweet'/>");

        //Move the twitter link to footer section
        $('#fbanners').append($('#social a'));
        
       //Modify css for comment section
       $('#comments .comment').css({'background': 'repeat scroll 0 0 #000','margin': 'auto','color':'#FFF'});
    
       //Modify css for helper section
       $('#detailsouterframe #delete').css({'background': 'repeat scroll 0 0 #000','margin': 'auto','color':'#FFF'});
    
       //Modify css for Results section
       $('table#searchResult tr').css({'background': 'repeat scroll 0 0 #000','border': 'none'});
       $('thead#tableHead th').css({'background': 'repeat scroll 0 0 #000','border': 'none'});
       $('table#searchResult th, table#searchResult td').css({'background': 'repeat scroll 0 0 #000','border': 'none'});       
    }

    //Function to modify footer design
    function modifyFooter()
    {
        $("#foot").css({'background':'repeat scroll 0 0 #000'});
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

    modifyDesign();  
});