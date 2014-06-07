// ==UserScript==
// @name         StackOverflow - Deleted Answer Manager
// @namespace    http://hishills.com
// @version      1.0
// @description  This script allows you to collapse or hide deleted answers on StackOverflow
// @match        http://stackoverflow.com/*
// @copyright    2012, James Hill
// @updateURL    http://userscripts.org/scripts/source/133048.user.js
// ==/UserScript==

function main() {
    var relevantAnswerCount = $("#answers").find(".answer").not(".deleted-answer").length;
    var $deletedAnswers = $("#answers").find(".deleted-answer");
    
    // Modify the page only if deleted answer(s) exist
    if($deletedAnswers.length > 0) {
        /***********************************************************************************************************************************************/
        // Deleted answer content toggle
        /***********************************************************************************************************************************************/
    
        // Add show deleted answer content
        var toggleText;
        if(localStorage.getItem("dam-ShowAnswerContentByDefault") != null) {
            toggleText = localStorage.getItem("dam-ShowAnswerContentByDefault") == "show" ? "hide content" : "show content";
        }
        $(".deleted-answer .post-menu").append('<span class="lsep">|</span><a href="#" class="toggleDeletedAnswerContent">' + toggleText + '</a>');
        
        // Show/Hide content click handler
        $(".toggleDeletedAnswerContent").on("click", function(e) {
            // Cache this
            $this = $(this);
            
            // Toggle visibility
            $this.closest(".deleted-answer").find(".post-text").toggleClass("deletedAnswerContentHidden");
    
            // Toggle text
            var aHtml = $this.html()
            $this.html(aHtml == "show content" ? "hide content" : "show content");
            
            // Prevent default action
            e.preventDefault();
        });
        
        /***********************************************************************************************************************************************/
        // Deleted answer visibility toggle
        /***********************************************************************************************************************************************/
        
        // Change answers sub-header
        var relevantAnswerText = relevantAnswerCount + " Relevant " + ((relevantAnswerCount == 1) ?  "Answer" : "Answers");
        var deletedAnswerText = "<a href='#' id='toggleDeletedAnswerVisibility' title='Toggle deleted answer visibility'>" + $deletedAnswers.length + " Deleted " + (($deletedAnswers.length == 1) ?  "Answer" : "Answers") + "</a>";
        $(".answers-subheader h2").html(relevantAnswerText + ", " + deletedAnswerText);
        
        $("#toggleDeletedAnswerVisibility").on("click", function(e) {
            // Toggle deleted answer visibility
            $deletedAnswers.toggleClass("deleted-hidden").toggle();
            
            // Gray out link
            $(this).toggleClass("deletedAnswerHidden");
            
            // Prevent default action
            e.preventDefault();
        });
        
        /***********************************************************************************************************************************************/
        // Preferences
        /***********************************************************************************************************************************************/
        
        // Insert prefs text
        $("<div id='preferencesText'>&nbsp;&nbsp;&nbsp;<a href='#'>(prefs)</a></div>").insertAfter(".answers-subheader h2");
        
        // Insert prefs div
        $("#preferencesText").append("<div id='preferencesDiv'> \
                                        <b>Deleted Answer Preferences</b><br /><br /> \
                                        By default, <select id='ddlShowAnswersByDefault'><option value='hide' selected='selected'>hide</option><option value='show'>show</option></select> deleted answers. <br /> \
                                        By default, <select id='ddlShowAnswerContentByDefault'><option value='hide'>hide</option><option value='show' selected='selected'>show</option></select> deleted answer content. <br /><br /> \
                                        <input type='button' id='btnSaveDeletedAnswerPreferences' value='Save Preferences'> \
                                      </div>");
        
        $("#preferencesText a").on("click", function(e) {
            $("#preferencesDiv").slideToggle();
            
            // Prevent default action
            e.preventDefault();
        });
        
        $("#btnSaveDeletedAnswerPreferences").on("click", function() {
            // Close prefs div
            $(this).parent().slideToggle();
            
            // Persist prefs using local storage
            localStorage.setItem("dam-ShowAnswersByDefault", $("#ddlShowAnswersByDefault").val());
            localStorage.setItem("dam-ShowAnswerContentByDefault", $("#ddlShowAnswerContentByDefault").val());
        });
        
        /***********************************************************************************************************************************************/
        // Honor Preferences
        /***********************************************************************************************************************************************/
        
        // If prefs exist, honor them
        if(localStorage.getItem("dam-ShowAnswersByDefault") != null &&
           localStorage.getItem("dam-ShowAnswerContentByDefault") != null) {
            // Set drop down values
            $("#ddlShowAnswersByDefault option:selected").removeAttr("selected").parent().find("option[value='" + localStorage.getItem("dam-ShowAnswersByDefault") + "']").attr("selected", "selected");
            $("#ddlShowAnswerContentByDefault option:selected").removeAttr("selected").parent().find("option[value='" + localStorage.getItem("dam-ShowAnswerContentByDefault") + "']").attr("selected", "selected");
            
            // Honor prefs
            if(localStorage.getItem("dam-ShowAnswersByDefault") == "hide")
                $("#toggleDeletedAnswerVisibility").trigger("click");
            
            if(localStorage.getItem("dam-ShowAnswerContentByDefault") == "hide")
                $(".deleted-answer .post-text").addClass("deletedAnswerContentHidden");
        }
    }
}

// Add script element to head of document so that SO's existing jQuery can be used
function addJsScriptBlock (funcToRun) {
    // Create script node
    var scriptNode = document.createElement('script');
    scriptNode.type = "text/javascript";
    scriptNode.textContent = '(' + funcToRun.toString() + ')()';

    // Append script node to head
    var targ = document.getElementsByTagName('head')[0] || document.body || document.documentElement;
    targ.appendChild(scriptNode);
}

// Add style element
function addCssBlock (css) {
    // Create script node
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    
    // Add CSS
    styleNode.appendChild(document.createTextNode(css));

    // Append script node to head
    var targ = document.getElementsByTagName('head')[0] || document.body || document.documentElement;
    targ.appendChild(styleNode);
}

// Add CSS
var css = ".deletedAnswerHidden { color: LightGray !important; } \
            #preferencesText { display:inline-block; margin-top:10px; } \
            #preferencesDiv { display:none; float:left; position:absolute; margin-left:12px; margin-top:15px; border:1px solid Black; padding:5px; background-color:White } \
            .deletedAnswerContentHidden { display:none; }";
addCssBlock(css);

// Add JS
addJsScriptBlock (main);