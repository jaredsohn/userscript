// ==UserScript==
// @name         k_AdminPanelTester
// @namespace    http://kirito.hol.es/
// @version      1.0.1
// @description  Test Style or Javascript for Admin, Search class or ID
// @copyright    2014+, K.
// @include      http://www.devs.cf/*
// @icon         http://i.imgur.com/feGaJgI.png
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
$(function(){
$('body').after('<style>#fa_developer {position:fixed;background:#8FD534;border:1px solid #6FB514;font-size:10px;font-family:Verdana,Arial,Helvetica,sans-serif;font-weight:bold;color:#fff;right:0;bottom:0;padding:5px;z-index:100;} #fa_developer:hover {background:#7FC524;} #fa_developer:active {background:#9FE544 !important;}</style><a id="fa_developer" href="#fa_dev">DEVMODE</a>');
        $('#fa_developer').click(function(){
            setTimeout(function() { location.reload(); },500);
        });
        if (document.location.href.indexOf('#fa_dev') > -1) {
       /* Links must return false to receive data */
        $('a').click(function() { return false; });
        /* Dev Panel Style */
        $('head').append('<style type="text/css">#fa_developer {display:none;} .dev_button, .dev_navbar, .dev_popup_option {-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;} body {margin-bottom:200px;}.dev_tab {border-right:1px solid #6FB514;color:#FFF;background:#8FD534;font-weight:bold;display:inline-block;padding:8px 3px;cursor:pointer;}.dev_tab:hover {background:#7FC524 !important;}.dev_tab:active {background:#9FE544 !important;}.dev_navbar {background:#8FD534;height:30px;}.dev_result {font-weight:bold;padding-left:10px;}.dev_result:hover {border-bottom:1px solid #ccc;}.dev_result:nth-child(even), .dev_result:nth-child(even) a {color:#00A5CD !important;}.dev_result:nth-child(odd), .dev_result:nth-child(odd) a {color:#86B125 !important;background:#EFEFEF;}#fa_dev {color:rgb(69, 69, 69);font-family:Verdana,Arial,Helvetica,sans-serif;font-size:10px;z-index:30000;background:#F7F7F7 url(http://i56.servimg.com/u/f56/18/45/41/65/spiral10.png) no-repeat;border:4px solid #CCC;position:fixed;top:74%;left:0;right:0;bottom:0;}.fa_h2 {color:#00A5CD;padding:10px 0 0 30px;margin:0;background:url(http://i56.servimg.com/u/f56/18/45/41/65/puce11.png) no-repeat 0.25% 30%;height:40px;}.result_container {overflow-y:auto;height:60%;}#classtab {background:#9FE544;}#dev_stylesheet { padding-left:15px;font-family:monospace;font-size:12px; }.dev_popup {background:#F7F7F7 url(http://i56.servimg.com/u/f56/18/45/41/65/spiral10.png) no-repeat 0% 0%;border:4px solid #CCC;z-index:30002;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:12px;}.dev_filter {opacity:0.2;filter:alpha(opacity=20);background:#000;position:fixed;top:0;left:0;right:0;bottom:0;z-index:30001;}.dev_popup_option {padding:2px;text-align:center;cursor:pointer;}.dev_popup_option:hover {background:#CCC;border-right:1px solid #AAA;border-bottom:1px solid #AAA;}.dev_popup_option:active {background:#FF8;}.dev_headtitle {color:#FFF;font-weight:bold;text-align:center;background:#8FD534;padding:3px 0;}.dev_button {color:#fff;font-weight:bold;background:#8FD534;padding:3px;margin:3px;display:inline-block;cursor:pointer;}.dev_button:hover {background:#7FC524;}.dev_button:active {background:#9FE544;}.dev_textarea { height:65%;width:95%;font-family:monospace;font-size:12px !important; }.dev_text {margin:0 3px;margin-top:5%;}.dev_choice {position:absolute;bottom:20px;left:0;right:0;text-align:center;}.dev_help_text {height:75%;overflow-y:auto;padding:3px;word-wrap:break-word;}</style>');
        /* Dev Panel Addition */
        $('body').after('<div id="fa_dev"><h2 class="fa_h2">Developer Mode</h2><div class="dev_navbar"><span id="classtab" class="dev_tab" title="View class name results">Class</span><span id="idtab" class="dev_tab" title="View ID results">ID</span><span id="srctab" class="dev_tab" title="View embedded image results">Source</span><span id="clear_results" class="dev_tab" title="Clear all results">Clear Results</span><span id="styletab" class="dev_tab" title="View the forum stylesheet">Stylesheet</span><span id="CSStab" class="dev_tab" title="Write CSS styles for previewing">CSS Editor</span><span id="JStab" class="dev_tab" title="Write JavaScript codes for previewing">JavaScript Editor</span><span id="exit_dev" class="dev_tab" style="float:right;" title="Exit developer mode">Exit</span><span id="resize_dev" class="dev_tab" style="float:right;" title="Resize the developer panel">Resize</span><span id="about_dev" class="dev_tab" style="float:right;" title="About Write">About</span></div><div class="result_container" id="class_results"></div><div class="result_container" id="id_results" style="display:none;"></div><div class="result_container" id="src_results" style="display:none;"></div><div class="result_container" id="style_result" style="display:none;"></div><div class="result_container" id="CSS_editor" style="display:none;"><div><span id="sendstyle" class="dev_button" title="Preview your CSS code">Preview Style</span><span id="clearstyle" class="dev_button" title="Undo your CSS code">Clear Style</span><span id="curly_brace" class="dev_button" title="Add curly brackets">Add Brackets</span><span id="CSS_help" class="dev_button" title="Click here for information">Help</span></div><textarea id="CSS_scratchsheet" class="dev_textarea" style="resize:none;"></textarea><style id="editor_stylesheet" type="text/css"></style></div><div class="result_container" id="JS_editor" style="display:none;"><div><span id="executescript" class="dev_button" title="Execute your JavaScript code">Execute</span><span id="newFunction" class="dev_button" title="Add a new function">New Function</span><span id="JS_help" class="dev_button" title="Click here for information">Help</span></div><textarea id="JS_scratchsheet" class="dev_textarea" style="resize:none;"></textarea></div></div>');
        /* Class Tab */
        $('body *').click(function() {
            var Classresult = $(this).attr('class').replace('.undefined','').replace(/ /g,'.');
            $('#class_results').prepend('<div class="dev_result">.'+Classresult+'</div>'); 
        });
        $('#classtab').click(function(){
            $('#classtab').css('background','#9FE544');
            $('#idtab, #srctab, #CSStab, #styletab, #JStab').css('background','#8FD534');
            $('#class_results').css('display','block');
            $('#id_results, #src_results, #CSS_editor, #style_result, #JS_editor').css('display','none');
        });
        /* ID Tab */
        $('body *').click(function() {
            var IDresult = $(this).attr('id').replace('#undefined','');
            $('#id_results').prepend('<div class="dev_result">#'+IDresult+'</div>'); 
        });
        $('#idtab').click(function(){
            $('#classtab, #srctab, #CSStab, #styletab, #JStab').css('background','#8FD534');
            $('#idtab').css('background','#9FE544');
            $('#class_results, #src_results, #CSS_editor, #style_result, #JS_editor').css('display','none');
            $('#id_results').css('display','block');
        });
        /* CSS Editor Tab */
        $('#sendstyle').click(function () {
            var CSSval = $('#CSS_scratchsheet').val();        
            $('#editor_stylesheet').text('').prepend(''+CSSval+'');
        });
        $('#clearstyle').click(function () { $('#editor_stylesheet').text(''); });
        $('#curly_brace').click(function() {
            $('#CSS_scratchsheet').val($('#CSS_scratchsheet').val()+'{  }'); 
        });
        $('#CSS_help').click(function() {
            $('body').after('<div class="dev_filter"></div><div class="dev_popup" style="position:fixed;top:30%;left:35%;right:35%;bottom:40%;"><div class="dev_headtitle">CSS Editor Help</div><div class="dev_help_text">The CSS editor is for editing the style of the webpage. You can use selectors from the class and ID tabs to style a clicked element.<br/><br/>To preview a style change after you have written your code, click the <b>Preview Style button</b> and it will submit your CSS to the editor stylesheet. To undo the style simply click the <b>Clear Style button</b> to undo your changes. ( this will undo any submitted codes )<br/><br/>The <b>Add Brackets button</b> is for quickly adding brackets to the textarea to write your CSS properties between.<br/></br>If you\'re new, here is an example of a CSS code, putting the following into the textarea and clicking the preview button should change the textarea background color. Give it a try :<br/><br/> <span style="background:skyblue">#CSS_scratchsheet {<br/>background:skyblue;<br/>}</span><br/><br/>When you want to return the textarea background color to normal, click the clear style button.<br/><br/>Remember that you do not have to click clear style every time you write a new code, clicking preview will update the stylesheet with the most recent codes.</div><div id="close_help" class="dev_popup_option" style="position:absolute;left:0;right:0;bottom:0;">Close</div></div>');
             $('#close_help').click(function(){  
             $('.dev_filter, .dev_popup').remove();
             });
             });
        $('#CSStab').click(function(){
            $('#classtab, #idtab, #srctab, #styletab, #JStab').css('background','#8FD534');
            $('#CSStab').css('background','#9FE544');
            $('#class_results, #id_results, #src_results, #style_result, #JS_editor').css('display','none');
            $('#CSS_editor').css('display','block');
        });
        /* JavaScript Editor Tab */
        $('#executescript').click(function () {
            var JSval = $('#JS_scratchsheet').val();
            $('#editor_scripts').remove();
            $('#JS_editor').append('<script id="editor_scripts" type="text/javascript">'+JSval+'</script>');
        });
        $('#newFunction').click(function() {
        $('#JS_scratchsheet').val($('#JS_scratchsheet').val()+'$(function () {\n\n});'); 
        });
        $('#JS_help').click(function() {
            $('body').after('<div class="dev_filter"></div><div class="dev_popup" style="position:fixed;top:30%;left:35%;right:35%;bottom:40%;"><div class="dev_headtitle">JavaScript Editor Help</div><div class="dev_help_text">The JavaScript editor is for writing and testing your scripts.<br/><br/>When you have written your script you can run it by clicking the <b>Execute button</b>. This will submit the script to the page and display its changes.<br/><br/>The <b>New Function button</b> adds an empty $ function to the textarea for you to write in.<br/><br/>If you\'re new, here is an example of a $ code, putting the following into the textarea and clicking the execute button should change the textarea background color. Give it a try :<br/><br/><span style="background:skyblue">$(function () {<br/>$(\'#JS_scratchsheet\').css(\'background\',\'skyblue\');<br/>});</span><br/><br/>Currently you cannot undo changes made by your scripts however, you can update them without any problems.</div><div id="close_help" class="dev_popup_option" style="position:absolute;left:0;right:0;bottom:0;">Close</div></div>');
             $('#close_help').click(function(){  
             $('.dev_filter, .dev_popup').remove();
             });
             });
        $('#JStab').click(function(){
            $('#classtab, #idtab, #srctab, #styletab, #CSStab').css('background','#8FD534');
            $('#JStab').css('background','#9FE544');
            $('#class_results, #id_results, #src_results, #style_result, #CSS_editor').css('display','none');
            $('#JS_editor').css('display','block');
        });
        /* SRC Tab */
        $('img').mousedown(function() {
            var SRCresult = $(this).attr('src');
            $('#src_results').prepend('<div class="dev_result"><a href="'+SRCresult+'" target="_blank">'+SRCresult+'</a></div>'); 
        });
        $('#srctab').click(function(){
            $('#classtab, #idtab, #CSStab, #styletab').css('background','#8FD534');
            $('#srctab').css('background','#9FE544');
            $('#class_results, #id_results, #CSS_editor, #style_result').css('display','none');
            $('#src_results').css('display','block');
        });
        /* Stylesheet Tab */
        $(function() { 
            $('#style_result').prepend('<div id="dev_stylesheet"></div>');
            $('#style_result #dev_stylesheet').load('/0-ltr.css');
                /* Fire stylesheet style on click */
                $('#styletab').one('click', function() {
                    $('#dev_stylesheet').html(function(index, devStyle) { return devStyle.replace(/}/g, '<br />}<br />').replace(/{/g, ' {<br />').replace(/;/g, ';<br />').replace(/#([A-f0-9]{6}|[A-f0-9]{3})/g, ' <font color="#221199">#$1</font>').replace(/!important/g, '&nbsp;<font color="#770088">!important</font>').replace(/([A-z0-9-]*):/g,'<font color="#000000">$1</font>:').replace(/:([A-z0-9-.,% ]*)/g,':<font color="#116644">$1</font>').replace(/"([A-z0-9.,'"+=-_:;() ]*)"/g,'<font color="#AA1111">"$1"</font>'); }); 
                });
        });
        $('#styletab').click(function(){
            $('#classtab, #idtab, #srctab, #CSStab, #JStab').css('background','#8FD534');
            $('#styletab').css('background','#9FE544');
            $('#class_results, #id_results, #src_results, #CSS_editor, #JS_editor').css('display','none');
            $('#style_result').css('display','block');
        });
        /* Clear Results */
        $('#clear_results').click(function(){ 
            $('body').after('<div class="dev_filter"></div><div class="dev_popup" style="position:fixed;top:35%;left:40%;right:40%;bottom:45%;"><div class="dev_headtitle">Clear Results</div><div class="dev_text">Do you wish to clear all results ?</div><div class="dev_choice"><span id="dev_yes" class="dev_button">Yes</span><span id="dev_no" class="dev_button">No</span></div></div>');
             $('#dev_yes').click(function(){  
             $('.dev_filter, .dev_popup, .dev_result').remove();
             });
             $('#dev_no').click(function(){ $('.dev_filter, .dev_popup').remove(); });
        });
        /* Resize Devmode Popup */
        $('#resize_dev').click(function() {
            $('body').after('<div class="dev_filter"></div><div class="dev_popup" style="position:fixed;top:30%;left:42%;right:42%;bottom:40%;"><div class="dev_headtitle">Panel Resize Options</div><div id="dev_dockbottom" class="dev_popup_option" title="Dock the panel to the bottom of the screen, this is default">Dock to bottom</div><div id="dev_docktop" class="dev_popup_option" title="Dock the panel to the top of the screen">Dock to top</div><div id="dev_cuberight" class="dev_popup_option" title="Dock the panel to the right in a cube">Cube right</div><div id="dev_cubeleft" class="dev_popup_option" title="Dock the panel to the left in a cube">Cube left</div><div id="dev_fullscreen" class="dev_popup_option" title="Allow the panel to take up the entire screen for a better look">Full screen</div><div id="close_resize" class="dev_popup_option" style="position:absolute;left:0;right:0;bottom:0;">Close</div></div>');
            /* Close Resize Popup */
            $('#close_resize').click(function() { $('.dev_filter, .dev_popup').remove(); });
        });
            /*About Tab*/
            $('#about_dev').click(function() {
                $('body').after('<div class="dev_filter"></div><div class="dev_popup" style="position:fixed;top:30%;left:42%;right:42%;bottom:40%;"><div class="dev_headtitle">About DEV Mode</div><div style="padding:5px;">K. Chôm chỉa trên mạng địa được cái code này hay hay viết thành UserScript để mọi người xài! Tiện cho việc Test code! Đỡ phải F5 :v</div><div id="close_about" class="dev_popup_option" style="position:absolute;left:0;right:0;bottom:0;">Close</div></div>');
            /* Close About Popup */
            $('#close_about').click(function() { $('.dev_filter, .dev_popup').remove(); });
        });
        /* Exit Devmode */
        $('#exit_dev').click(function(){ 
            $('body').after('<div class="dev_filter"></div><div class="dev_popup" style="position:fixed;top:35%;left:40%;right:40%;bottom:45%;"><div class="dev_headtitle">Exit Devmode</div><div class="dev_text">Do you wish to exit developer mode ?</div><div class="dev_choice"><span id="dev_yes" class="dev_button">Yes</span><span id="dev_no" class="dev_button">No</span></div></div>');
             $('#dev_yes').click(function(){  
             var ExitDEV =  location.href.replace('#fa_dev','');
             location.href = ExitDEV;
             $('.dev_filter, .dev_popup').remove();
             });
             $('#dev_no').click(function(){ $('.dev_filter, .dev_popup').remove(); });
        });
}
});