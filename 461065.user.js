// ==UserScript==
// @name        aside.io
// @namespace   https://www.aside.io
// @include     about:addons
// @include     https://www.aside.io/
// @include     https://www.aside.io/*
// @version     5.0.1
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/461065.user.js
// @updateURL http://userscripts.org/scripts/source/461065.meta.js
// ==/UserScript==


var editor = null;
var $ = unsafeWindow.jQuery;         //this makes jquery available here //console.log($); 
console.log("elf");


$(document).ready(function() {  

    
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 // A) do stuff ONCE after first load
    // tweaks for ACE
    editor = unsafeWindow.editor;    //this makes ace-editor available  //console.log(editor);


    editor.commands.addCommand({
        name: 'duplicateSelection',
        bindKey: {win: 'Ctrl-D',  mac: 'Command-D'},
        exec: function(editor) {
            if(editor.selection.isEmpty()) { editor.selection.selectLine(); }
            editor.duplicateSelection();
        },
        readOnly: false // false if this command should not apply in readOnly mode
    });            


    // other stuff
    $("#d3v-body").css("padding-left","300px");
    $("#d3v-body").css("padding-right","300px");
    $(".d3v-pop-body").css("max-height","600px");
    $(".d3v-pop-body").css("font-size","11px");

    
    
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 // B) do stuff ONCE after first load, but delayed (e.g. to wait for the respose of the callout to sf a little while)   
    window.setTimeout(function() {
        $("body").prepend(''
           +'<style> '
              +'.chosen-container .chosen-results li { line-height: 0px; } '
              +'.chosen-container .chosen-results { max-height: 10000px; } '
                          
           +'</style>'
        ); 

        $('.ace_editor').css('font-size','12px');
        $('.ace_editor').css('font-family','Lucida Sans Typewriter');
        $('.ace_editor').css('font-weight','bold');
        
        
        $("#code_helper_input_chosen").trigger("mousedown");
    },3000);
  



    
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 // C) do stuff EVERY SECOND to fixup things permanently   
    window.setInterval(function() {
        $('.ace_editor').width( (window.innerWidth-300)+'px' ); // NEED to adjust width due to offset for sidebar !!! 
        
        $(".chosen-container").css("font-size","10px");
        $(".chosen-container .chosen-results li").css("line-height","0px");
        
        if( ! $("#code-content").is(":visible") ) return; 
        
        $("#code_helper_input_chosen").css("width","300px");
        $(".chosen-drop").css("left","0px");
        //$(".chosen-container").css("font-size","10px");
        //$(".chosen-container .chosen-results li").css("line-height","0px");
        $(".chosen-container .chosen-results").css("height", document.body.clientHeight - 80 + "px");
        $("#code_helper_input_chosen").addClass("chosen-with-drop");
        $("#code_helper_input_chosen").addClass("chosen-container-active");
        
        $(".chosen-single span").css("font-size","14px");
        $(".chosen-single span").css("font-weight","bold");
        
        //console.log( $(".chosen-single span").html().substring(0, 5) +'<<');
        
        if( $(".chosen-single span").html().substring(0, 5) == "Open " ) {
            document.title = $(".chosen-single span").html().substring(5)+' @ '+orgName;
        }
        
        //console.log('cr-elements: ' + $(".chosen-results").children().length ) ;
        if( $(".chosen-results").children().length == 0 ) {
           editor.focus();
            $("#code_helper_input_chosen").trigger("mouseleave");
            $("#code_helper_input_chosen").trigger("mouseout");
            $("#code_helper_input_chosen").trigger("blur");

            $("#code_helper_input_chosen").trigger("mousedown");
            editor.focus();       
        }
    },1000);
    
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    
});

