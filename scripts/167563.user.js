// ==UserScript==
// @name       OGame Message Enhancer
// @namespace  http://userscripts.org/scripts/show/167563
// @version    0.6
// @description  Display's the messages content beneath the subject
// @copyright  2012+, YamiNoSensei
// @license LGPL
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

if (navigator.userAgent.search('Firefox/') > -1) { 
    this.$ = this.jQuery = jQuery.noConflict(true);
}

$(document).ready(function() {
    OGameMessageEnhancer();
});


var nDOMNodeInsertedTimeoutID  = -1;
$(document).bind("DOMNodeInserted",function() {
    window.clearTimeout(nDOMNodeInsertedTimeoutID);
    nDOMNodeInsertedTimeoutID = window.setTimeout(OGameMessageEnhancer,250);
});


function OGameMessageEnhancer() {
    if ($("#messageContent .entry")[0] ) {
        var bUpdated = false;
		$("#messageContent .entry").each(function() {
            var oCurEntry = $(this);
            if (!oCurEntry.hasClass('ogame-message-enhancer-processed')) {
                $(".from, .check, .date, .actions",oCurEntry).css('vertical-align','top');
                $(".subject",oCurEntry).append('<p class="ogame-message-enhancer-body" style="font-weight:normal"><img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAC02Q4SEhEFIUmxvcoSEhGJlaldbYlFXXiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" style="float:left;margin-right:10px;"/><strong>Laden...</strong></p>');
                $("p.ogame-message-enhancer-body", oCurEntry).load($(".subject a.overlay", oCurEntry).attr("href") + " .note",null,function(responseText, textStatus, XMLHttpRequest){
                    if ($(".note div",$(this))[1]) {
                        $(".note div:gt(1)",$(this)).remove();
                    }
                });
                //Neue Nachricht Klasse entfernen (Sie ist ja quasi gelesen)
                $(this).removeClass('new');
                $(this).addClass('ogame-message-enhancer-processed');
				bUpdated = true;
            }
        });
		if (bUpdated) {
            //Briefumschlag update
            $("#message-wrapper div:eq(0)").empty().load("/index.php?page=overview #message-wrapper div:eq(0)",function data() {
                $(this).replaceWith(data);
            });
		}
    }
	else {
    	window.clearTimeout(nDOMNodeInsertedTimeoutID);
    }
}