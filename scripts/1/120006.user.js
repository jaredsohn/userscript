// ==UserScript==
// @name          prospects
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
 

$('body').prepend('<div id="circles"><div id="1" style="cursor:pointer;"> <img src="https://github.com/drecodeam/test/raw/master/1.png" width="40px"></img></div><div id="2" style="cursor:pointer;"><img src="https://github.com/drecodeam/test/raw/master/2.png" width="40px"></img><form id="other" style="visibility:hidden;opacity:0;left:100px;top:0px;position:absolute;"><input type="text" id="s_text"><input type="submit" value="Submit" id="s_submit"/></form><div id="google" style="visibility:hidden;opacity:0;"><img src="https://github.com/drecodeam/test/raw/master/google.png" width="40px"></img></div><div id="wiki" style="visibility:hidden;opacity:0;"><img src="https://github.com/drecodeam/test/raw/master/wiki.png" width="40px"></img></div><div id="map" style="visibility:hidden;opacity:0;"><img src="https://github.com/drecodeam/test/raw/master/map.png" width="40px"></img></div><div id="youtube" style="visibility:hidden;opacity:0;"><img src="https://github.com/drecodeam/test/raw/master/youtube.png" width="40px"></img></div></div><div id="3"><img src="https://github.com/drecodeam/test/raw/master/3.png" width="40px"></img></div><div id="4"><img src="https://github.com/drecodeam/test/raw/master/4.png" width="40px"></img></div><div id="5"><img src="https://github.com/drecodeam/test/raw/master/5.png" width="40px"></img></div><div id="6"><img src="https://github.com/drecodeam/test/raw/master/6.png" width="40px"></img></div></div>');
$("#1,#2,#3,#4,#5,#6").css({'display':'block','visibility':'hidden','z-index':'99','top':'-100px','left':'-100px','position':'fixed','cursor':'pointer','height':'auto','width':'auto'}); 

$('#2').hover(function(){
    
    $('#map').css({'visibility':'visible','position':'absolute','top':'-60px','left':'50px'});
    $('#youtube').css({'visibility':'visible','position':'absolute','top':'-20px','left':'50px'});
    $('#wiki').css({'visibility':'visible','position':'absolute','top':'20px','left':'50px'});
    $('#google').css({'visibility':'visible','position':'absolute','top':'60px','left':'50px'});

    $('#map,#youtube,#wiki,#google').animate({opacity:1},100);
    
    
    },function(){
        
        });



 
$('#2').click(function(event){
        $("#1,#2,#3,#4,#5,#6").css("visibility","visible","opacity","1");

    var url=window.getSelection().toString();
        if(!url.match(/^http:/))
            {
               $("#s_text").val(url);

    
            }
            
$('#other').css("visibility","visible");
$('#other').animate({opacity:1},100);
           
});

$('#1').click(function(event){
window.history.back();
});

$('#5').click(function(event){
window.history.back();
var twitter_share_url='http://twitter.com/share?url='+escape(document.URL)+'&text='+escape(document.title+" - ");
            window.open(twitter_share_url);

});

$('#s_submit').click(function(event){
var url='http://www.google.com/search?q=';
var search_term=$("#s_text").val();
            window.open(url+search_term);

});

$('#youtube').click(function(){
    var url='http://www.google.com/search?q=';
var search_term=$("#s_text").val();
            window.open(url+search_term);

    });
$('#map').click(function(){
    var url='http://www.google.com/search?q=';
var search_term=$("#s_text").val();
            window.open(url+search_term);

    });
$('#wiki').click(function(){
    var url='http://www.google.com/search?q=';
var search_term=$("#s_text").val();
            window.open(url+search_term);

    });

$('#google').click(function(){
    var url='http://www.google.com/search?q=';
var search_term=$("#s_text").val();
            window.open(url+search_term);

    });

$('#6').click(function(event){
    var active = document.activeElement
            console.log(active);
            active=active.toString();
    if(active.match(/^http:/))
    {
        
            window.open(active);

    }
    else{
    var url=window.getSelection().toString();
        if(!url.match(/^http:/))
            {
                url='http://www.google.com/search?q='+url;
                    window.open(url);
    
            }
        else
            {     
                window.open(url);
            }
    }
    

});

var flag=0;

$('body').click(function(event)
{    
    $("#1,#2,#3,#4,#5,#6,#youtube,#google,#wiki,#map,#other").css("visibility","hidden","opacity","0");
});

$('#circles').click(function(event){
     event.stopPropagation();
 });


$(window.document).click(function(event)
    {
        if (event.metaKey)
        
        {
            flag=1;
            var active = document.activeElement
            console.log(active);
                $("#1,#2,#3,#4,#5,#6").css({top:event.pageY,left:event.pageX,position:'fixed',opacity:0,visibility:'visible'});
                $("#1").animate({left:event.pageX-50,position:'absolute',opacity:1},600);
                $("#2").animate({left:event.pageX+50,position:'absolute',opacity:1},600);
                $("#3").animate({top:event.pageY-43.25,left:event.pageX+25,position:'fixed',opacity:1},600);
                $("#4").animate({top:event.pageY+43.25,left:event.pageX+25,position:'fixed',opacity:1},600);
                $("#5").animate({top:event.pageY-43.25,left:event.pageX-25,position:'fixed',opacity:1},600);
                $("#6").animate({top:event.pageY+43.25,left:event.pageX-25,position:'fixed',opacity:1},600);

                if($(this).attr('src'))
                    {
                        var url=$(this).attr('src');
                        console.log(url);
                       window.open(url)     
                    }
            event.preventDefault();
        }

    
    });

