// ==UserScript==
// @name       POE Character Grabber
// @namespace  http://www.poebuilder.com/
// @version    0.2
// @description  Autograbs your character data
// @match      *://*.poebuilder.com/*
// @copyright  2013, Aaron Aichlmayr
// ==/UserScript==

function injectEvent()
{
    $("#inventory-import-button").click(function(){
        modifyButton();
    })
}
window.onload = injectEvent;

function modifyButton()
{
    if($("#import-character-submit")[0] == undefined)
        return setTimeout(modifyButton, 10);
    $("#import-character-submit").click(function(e){
        fillTxtBox("Please wait, grabbing data", false, false);
        GM_xmlhttpRequest ( {
            method:     "GET",
            url:        "http://www.pathofexile.com/character-window/get-items?character=" + $("#import-character-name").val(),
            onload:     function (response) {
                if(response.status == 200)
                {
                    if(response.responseText.trim()[0] != "<")
                    	fillTxtBox(response.responseText, true, true);
                    else
                    	fillTxtBox("Please login to the POE website and try again", true, false);
                }
            }
        } );
    });
}

function fillTxtBox(txt, over, button)
{
    if($("#copy-character-data")[0] == undefined)
        return setTimeout(function(){fillTxtBox(txt)}, 10);
    if(over || $("#copy-character-data").val() == "")
    	$("#copy-character-data").val(txt)
    if(button)
        $("#copy-character-import").trigger("click")
    if(over)
    	setTimeout(injectEvent, 1000);
}