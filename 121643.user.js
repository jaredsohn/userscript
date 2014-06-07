// ==UserScript==
// @author         BjornRoysland
// @name           eRepublik Analytics
// @namespace      roysland.net
// @description    Analytics tool for eRepublik
// @version        0.0.5
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=121643&days=1&show
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// @require        http://www.bramstein.com/projects/text-overflow/jquery.text-overflow.min.js
// ==/UserScript==

// Extract userID
var userId = $("#large_sidebar .user_section a:eq(0)").attr("href").split("/")[$("#large_sidebar .user_section a:eq(0)").attr("href").split("/").length-1];
var userName = $("#large_sidebar .user_section img:eq(0)").attr("alt");

var validCandidates = new Array("1557086", "5047448", "4253524", "1557086", "2112963", "4782913", "2683382");
var stopVotingCandidates = new Array("2112963");
var ptoCandidates = new Array("1508314", "2237660", "3343255", "1773755");

function ElectionCongressHighlighter()
{
    if (document.location.toString().indexOf('-election-congress-')!=-1)
    {
        
        var isDone = false;
        $("div .entity").each(
                        function() {
                            var candidateLink = $(this).find('a').attr("href");
                            var candidateId = $(this).find('a').attr("href").split("/")[candidateLink.split("/").length-1];
                            var parentTr = $(this).parent().parent();
                            var firstTd = $(parentTr).find("td:first");
                            var votesTd = $(parentTr).find(".special");
                            $(votesTd).attr("align","center");
                            if($.inArray(candidateId,validCandidates) > -1)
                            {
                                if($.inArray(candidateId, stopVotingCandidates) > -1)
                                {
                                    $(votesTd).append('<div style="color:red;font-weight:bold;font-size:9px;">stop voting</div>');
                                    $(votesTd).append('<div style="color:black;font-size:9px;">candidate safe</div>');
                                }
                                
                                $(firstTd).css("background-color","#ABD95A");
                                $(firstTd).css("color","black");
                                $(firstTd).attr("title","Approved by Det Norske Forsvaret");
                                isDone = true;
                            }
                            else if($.inArray(candidateId,ptoCandidates) > -1)
                            {
                                $(firstTd).css("background-color","#ED5450");
                                $(firstTd).css("color","orange");
                                $(firstTd).attr("title","PTO! NOT Approved by Det Norske Forsvaret");
                            }
                            else
                            {
                                //FFEBB2
                                $(firstTd).css("background-color","#FFEBB2");
                                $(firstTd).css("color","black");
                                $(firstTd).attr("title","Neutral candidate");
                            }
                            
                        }
                    );
    }
}

function Main()
{
    if (document.getElementById("large_sidebar"))
    {
        ElectionCongressHighlighter();
    }
}

// Launch script when page is finished loading
/**
 * Launch script when page is finished loading.
 * Enabled for Mozilla and Chrome
 */
$.browser.mozilla ? window.addEventListener("load", Main, !1) : typeof greasyChrome._eraMainStarted == "boolean" && !greasyChrome._eraMainStarted && Main();
