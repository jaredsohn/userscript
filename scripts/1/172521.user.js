// ==UserScript==
// @name       KC Questionnaire Auto-Answer Button
// @namespace  http://kuali.org/
// @version    0.1
// @description  Adds a link to questionnaires containing Yes/No questions that will automatically answer all as yes or as no.
// @match      http://*/kc-*
// @copyright  2013+, Douglas Pace
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    jQuery(document).ready(function() {
        if (jQuery('div.questionnaireContent').find('input.QanswerYesNo, input.QanswerYesNoNa').length > 0) {
            console.log('test');
            var style = document.createElement("style");
            style.textContent = ".userscript-button {-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;	box-shadow:inset 0px 1px 0px 0px #ffffff;	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) );	background:-moz-linear-gradient( center top, #ededed 5%, #dfdfdf 100% );	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#dfdfdf');	background-color:#ededed;	border:1px solid #dcdcdc;	display:inline-block;	color:#6b2c2c;	font-family:Arial;	font-size:8px;	font-weight:bold; padding:2px 6px;	text-decoration:none;}.userscript-button:hover {	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #dfdfdf), color-stop(1, #ededed) );	background:-moz-linear-gradient( center top, #dfdfdf 5%, #ededed 100% );	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#dfdfdf', endColorstr='#ededed');	background-color:#dfdfdf;}.userscript-button:active {	position:relative;	top:1px;}";
            document.body.appendChild(style);
        }
        jQuery('div.questionnaireContent').each(function() {
            if (jQuery(this).find('input.QanswerYesNo, input.QanswerYesNoNa').length > 0) {
                var allYes = jQuery('<a href="#" class="userscript-button">All Yes</a>').click(function() {
                    jQuery(this).parents('h3').first().siblings('div.questionnaireContent').find('input.QanswerYesNo[value="Y"], input.QanswerYesNoNa[value="Y"]').prop("checked", true);
                    return false;
                });
                var allNo = jQuery('<a href="#" class="userscript-button">All No</a>').click(function() {
                    jQuery(this).parents('h3').first().siblings('div.questionnaireContent').find('input.QanswerYesNo[value="N"], input.QanswerYesNoNa[value="N"]').prop("checked", true);
                    return false;
                });                
                jQuery(this).siblings('h3').find('span.subhead-right').append(allYes);
                jQuery(this).siblings('h3').find('span.subhead-right').append(allNo);
            }
	    });
    });
}
addJQuery(main);
