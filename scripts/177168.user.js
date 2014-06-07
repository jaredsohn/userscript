// ==UserScript==
// @name       Game of Thrones Helper
// @description  Some useful functions in GoTA
// @include      *.disruptorbeam.com*
// @include      *apps.facebook.com/gamethrones*
// @grant        none
// @run-at       document-end
// @require      http://userscripts.org/scripts/source/177168.user.js
// @copyright  2013+, DaQ
// @version    0.4
// ==/UserScript==

function findQuests(join)
{
    join = typeof join !== 'undefined' ? join : false;
    
    try
    {
        var chat = $("div #gamechat_alliance");
        if (chat.length == 0) return;
        
        var messages = chat.find("p.pchat");
        if (messages.length == 0) return;
        
        var questPattern=new RegExp("[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]");
        var counter = 0;
        
        for (var i = 0; i < messages.length; i++)
        {
            var element = messages.eq(i).find("strong");
            
            var teststring = element.html();
            while (questPattern.test(teststring) == true)
            {
                var quest = questPattern.exec(teststring);
                             
                if (teststring.match("<a ") != null)
                {
                    var patt1 = new RegExp('<a [^]*">');
                    var first = patt1.exec(teststring);
                    
                    element.html(element.html().replace(teststring, teststring.replace(first, "").replace('</a>', "").replace('<b>', "").replace('</b>', "")));
                }
                
                var newHtml = element.html().replace(quest, "<a style='color:grey;' href=javascript:questJoin('" + quest + "');><b>" + quest + "</b></a>");
                element.html(newHtml);
                
                var stringArray = teststring.split(quest);
                if (stringArray.length < 2) continue;
                teststring = stringArray[1];
                
                if (join) questJoin(quest);
            }
        }
    }
    catch(error)
    {
        alert("error: " + error);
    }
}

function ArrowLeft()
{
    try
    {
        var rookery = $("div #alliance_rookery[style!='display: none;']");
        if (rookery.length >= 0) { return pagePrev('rookery'); } 
    }
    catch(error)
    {
        alert("error: " + error);
    }
}


function ArrowRight()
{
    try
    {
        var rookery = $("div #alliance_rookery[style!='display: none;']");
        if (rookery.length >= 0) { return pageNext('rookery');}
    }
    catch(error)
    {
        alert("error: " + error);
    }
}



$(document).ready(function(){
    
    $(document).unbind();
    
    $(document).bind('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 9786) return findQuests(true); //join all boss quests 
        if(code == 9787) return findQuests(false); //show links to boss quests
        //else alert(code);
    });

});