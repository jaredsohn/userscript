// ==UserScript==
// @name       JiraTortilla
// @namespace  http://www.zocdoc.com
// @version    0.1
// @description  Some tweaks for jira
// @match	   *://zocdoc.atlassian.net/*
// @copyright  2012+, You

// @require http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

// *://zocdoc.atlassian.net/secure/RapidBoard.jspa?rapidView=117* 

$(
    function(){
        function executeWhenAgilePanelReady(callback){
            var container = document.getElementById('ghx-work');
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var observer = new MutationObserver(function(mutations) {
                console.log('%cJira Tortilla', 'font-size:100px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿
              callback();
            });

            if(container){
                observer.observe(container, {
                    attributes: true,
                    childList: true,
                    characterData: true
                });
            } else{ // TODO improve this, using the MutationObserver in a better way
                setTimeout(callback,600)
            }
        }
        function saveSprintId(){
            if($('#ghx-board-name').length){
                var sprintId = $('.ghx-sprint').data('sprintId');
                if(sprintId){
                    localStorage.setItem('sprintId',sprintId);
                    $("#ghx-controls-sprint dt").html('SPRINT '+sprintId+ ' :');
                    console.log('ScrumId updated to:'+sprintId);
                }
            }
        };
        function attachALinkToTheSprintInputSoYouCanSimplySelectTheCurrentOne(){
            $(document).on('focus','#customfield_10201',function(e){
                if(!$('#currentSprint').length)
                    $(e.target).after('<a id="currentSprint" style="margin-left: 12px;" href="javascript:void(0)">Current</a>');
            });

            $(document).on('click','#currentSprint',function(e){
                $("#customfield_10201").val(localStorage.getItem('sprintId'));
            });
        }



        // MAIN
        executeWhenAgilePanelReady(saveSprintId);
        attachALinkToTheSprintInputSoYouCanSimplySelectTheCurrentOne();
    }
);