// ==UserScript==
// @name           Add StarCraft 2 Battle.net Forum Columns
// @namespace      Battle.net
// @description    Adds last post and number of views column to SC2 Battle.net 
//                 Forums (Works for US region and English only)
// @include        http://*.battle.net/sc2/*/forum/*
// ==/UserScript==

//strings (for locale support)
var STRING_lastReplyLocalized = 'Last Reply';
var STRING_viewsLocalized = 'Views';

//substring 
var STRING_lastPostBySplit = 'Last Post by';
var STRING_viewsSplit = ' Views';
var STRING_noRepliesSplit = '0 Replies';

localizeStrings(getRegion(), getLanguage());

try {    
    var posts = document.getElementById("posts");
    
    for(var x = 0; x < posts.children.length; x++) {
        
        var row = posts.children[x];
        
        //last reply cell
        var lastReplyCell = document.createElement("td");
        lastReplyCell.style.paddingLeft = "20px";
        
        //number of views cell
        var viewsCell = document.createElement("td");
        viewsCell.style.textAlign = "right";
                
        //header
        if (row.className == "post-th") {
            lastReplyCell.innerHTML = STRING_lastReplyLocalized;
            viewsCell.innerHTML = STRING_viewsLocalized;
        } else {            
            viewsCell.style.color = "#0D53AD";
            
            var threadInfo = row.innerHTML;            
            threadInfo = threadInfo.split("<div class=\"tt_info\">")[1];
                        
            //parse last person who replied
            var lastReplyText = threadInfo;
            
            if (lastReplyText.indexOf(STRING_noRepliesSplit) != -1) {
                lastReplyText = "--";
            } else {
                lastReplyText = lastReplyText.substring(lastReplyText.indexOf(STRING_lastPostBySplit) + STRING_lastPostBySplit.length, lastReplyText.indexOf("("));
            }             
            
            //parse number of views
            var numViewsText = threadInfo;
            
            numViewsText = numViewsText.substring(0, numViewsText.indexOf(STRING_viewsSplit) + STRING_viewsSplit.length);
            numViewsText = numViewsText.replace(/[^\d]/g, '');
            numViewsText = (numViewsText == '') ? 0 : numViewsText;
            
            console.log(numViewsText)
            
            lastReplyCell.innerHTML = lastReplyText;        
            viewsCell.innerHTML = numViewsText;
        }
        
        row.appendChild(viewsCell);
        row.appendChild(lastReplyCell);
        
    }
} catch (e) { }


function getRegion() {
    var urlHost = location.host;
    return urlHost.split(".")[0];
}

function getLanguage() {
    var urlPathname = location.pathname;
    return urlPathname.substr(5, 2);
}

function localizeStrings(region, language) {
    switch(language) {
        case "en":
            STRING_lastReplyLocalized = 'Last Reply';
            STRING_viewsLocalized     = 'Views';            
            STRING_lastPostBySplit    = 'Last Post by ';
            STRING_viewsSplit         = ' Views';
            STRING_noRepliesSplit     = '0 Replies';
            break;
        case "es":
            STRING_lastReplyLocalized = 'Mensaje Más';
            STRING_viewsLocalized     = 'Vistas';            
            STRING_lastPostBySplit    = 'Mensaje más reciente por';
            STRING_viewsSplit         = ' Vistas';
            STRING_noRepliesSplit     = '0 Respuestas';
            break;
        case "pt":
            STRING_lastReplyLocalized = 'Última Postagem';
            STRING_viewsLocalized     = 'Visualizações';            
            STRING_lastPostBySplit    = 'Última postagem por';
            STRING_viewsSplit         = ' Visualizações';
            STRING_noRepliesSplit     = '0 Respostas';
            break;
    }
}