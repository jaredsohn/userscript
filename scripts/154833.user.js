// ==UserScript==
// @name       Grooveshark themer
// @namespace  http://a32.virtualnezahorie.sk
// @version    0.1
// @description  enter something useful
// @match      http://*.grooveshark.com/*
// @copyright  2012+, SkrabakL
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
function a(){
    if(jQuery('#theme-wall *')[0] == undefined){
        setTimeout( function(){ a(); }, 200);   
    }
    else{
        jQuery.each(jQuery('#theme-wall *'), function(){
            
            jQuery(this).css('background','none'); // remove shits that are there
            
        });
        jQuery('#theme-wall').css('background','none');
        setTimeout(function(){a(); }, 200);
    }
}
jQuery(document).ready(function(){
    
    a();
    
    var dialog = '\
<div id="theme-dialog">\
<form>\
<fieldset>\
<p> Do some magic here </p>\
<label for="URL">\
<input type="text" name="URL" id="URL" placeholder="URL"/>\
</label>\
<label for="repeat">\
<select name="repeat" id="repeat">\
<option value="no-repeat">Don\'t repeat</option>\
<option value="">Repeat vertically and horizonatally</option>\
<option value="repeat-x">Repeat horizontally</option>\
<option value="repeat-y">Repeat vertically</option>\
</select>\
</label>\
<label for="center">\
<select name="center" id="center">\
<option value="50% 0%">Middle top</option>\
<option value="50% 50%">Middle center</option>\
<option value="0 0">Top left</option>\
<option value="100% 100%">Bottom right</option>\
</select>\
</label>\
<label for="bgColor">\
<select name="bgColor" id="bgColor">\
<option value="transparent">Transparent</option>\
<option value="other">Other...</option>\
</select>\
</label>\
<input type="text" id="other" name="other" placeholder="color"/>\
<input type="submit"/>\
</fieldset>\
</form>\
</div>';
    
    
    jQuery('body').append(dialog);
    
    jQuery('#theme-dialog').css({position:'absolute',zIndex:9999,width:200,minHeight:100,background:'rgba(175,175,175,0.25)',left:'50%',top:'50%',marginLeft:'-100px',marginTop:'-50px', textAlign:'center',padding:20,'border-radius':'1em'});    
    jQuery('#theme-dialog form').submit(function(){
        
        jQuery('#theme-dialog').css('display','none');
        
        var bgColor = jQuery('#theme-dialog #bgColor').val();
        
        if( bgColor == 'other'){
            bgColor = jQuery('#theme-dialog #other').val();   
        }
        
        
        var bg = 'url('+jQuery('#theme-dialog #URL').val()+') '+jQuery('#theme-dialog #center').val()+' '+bgColor+' '+jQuery('#theme-dialog #repeat').val();

        jQuery('#page-wrapper').css('background',bg);
        return false;
    });
});