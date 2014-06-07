// ==UserScript==
// @name       Oracle APEX UI Improvements
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @author     Brett Hamilton
// @description  expands text areas to 95% screen width, adds plugin "tabby" to text areas, adds "Open Fullscreen" above text areas.  Please report any issues.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     https://raw.github.com/alanhogan/Tabby/master/jquery.textarea.js
// @match      https://*dev*/apex/*
// @copyright  2012+, You
// ==/UserScript==




$('head').append('<style type="text/css">#fjp_overlay{position:fixed;top:0; left:0; background-color:#000; width:100%; height:100%; z-index:998; display:none; } #fjp_lightbox{ position:absolute; top:0; left:0; z-index:999; width:100%; text-align:center; display:inline; }</style>');





//$("#SOURCE").find("textarea").fullTextArea();

//$('#SOURCE').find(".rc-buttons").prepend('<a href="#" onclick="return false;" class="open-fullscreen-textarea"><img src="/i/htmldb/icons/pt_css.png" alt="Open Fullscreen"></a>');


$("textarea").each(function(){
    
    $(this).width(function(){
            return $(this).closest(".rc-body").width()*.95;
         });
    
    
    $(this).parent().parent().find("label").after('<div class="RegionQuickLinks" style="display: inline; margin-left:5px;"><a href="#" onclick="return false;" class="open-fullscreen-textarea itemlink">Open Fullscreen</a></div>');
    
    $(this).tabby();
});

$(window).resize(function() {
    $("textarea").each(function(){
        
        $(this).width(function(){
                return $(this).closest(".rc-body").width()*.95;
             });           
    });
});




$(".open-fullscreen-textarea").click(function(e){
    
    e.preventDefault();
 
    
    var posTop = $(window).scrollTop() + 25;
    //var lrg_img = $(this).attr('href');
    
    var textareaIWANT= $(this).parent().parent().find("textarea");
    
    
    $('body').append('<div id="fjp_overlay"></div>')
         .append('<div id="fjp_lightbox"><textarea id="my-textbox">'+ textareaIWANT.val()+'</textarea><br /><a href="#" id="fjp_light_close">Close X</a></div>');
         
    $('#fjp_lightbox').css('top', posTop + 'px');
    
    $('#fjp_overlay').fadeTo(500, 0.75, function(){
        $('#fjp_lightbox').fadeTo(250, 1);
    });
    
    $('body').css("overflow","hidden");  
    
    $('#my-textbox').width($(window).width()*.9).height($(window).height()*.9);
    
    $('#my-textbox').tabby();
    

    
    var close_fullscreen = function(mytextarea){
        
        e.preventDefault();
        
        console.log($("#my-textbox").val());
        
        console.log($(mytextarea).val());
        
        
        $(mytextarea).val(function(index){ 
            var newtext= $("#my-textbox").val(); 
            return newtext;
        });
          
        
        
        $('#fjp_lightbox').fadeTo(100, 0, function(){
            $(this).remove();
            $('#fjp_overlay').fadeTo(250, 0, function(){
                $(this).remove();
            });
            
        });
        
       
        $('#fjp_overlay,  #fjp_light_close').off('click');
        $(document).off('keydown');
        $('body').css("overflow","auto");

    };
    
     $(document).keydown(function(e) {
       
        if (e.keyCode == 27) {
            e.preventDefault();
                 close_fullscreen(textareaIWANT);
             }
    });
    
    $('#fjp_overlay,  #fjp_light_close').on('click',function(e){
            e.preventDefault();
            close_fullscreen(textareaIWANT);
      });

    
  
    
});