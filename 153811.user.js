// Original by: TheMagicN
// ==UserScript==
// @name          Youtube Fixer
// @namespace     http://www.youtube.com/user/TheMagicn
// @description   Give's you back your homepage with only subscription uploads :)
// @include        *://*.youtube.*/*
// @version        5.6.0
// ==/UserScript==
main();

function main()
{
    GM_setValue("linkchoice", '//www.youtube.com/feed/subscriptions');
    var linkchoice = GM_getValue("linkchoice", '//www.youtube.com/feed/subscriptions');
    var contype = document.location.protocol;
    var currentpage = window.location.href;
    var yturl = contype + '//www.youtube.com/';  
    var ytnewhome = contype + linkchoice;
    
//  choiceChange(ytnewhome, currentpage, contype); // not needed anymore, for now.
    
    startMainAction(currentpage, yturl, ytnewhome, contype);
}

function startMainAction(currentpage, yturl, ytnewhome, contype)
{
    if(!(currentpage == yturl))
    {
        replaceLinks(contype, yturl, ytnewhome);
    }    
    if(currentpage == yturl)
    {
        redirectPage(ytnewhome);
    }
}

function replaceLinks(contype, yturl, ytnewhome)
{
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) 
    { 
        var a = links[i];
        if(a.href==yturl)
        {
            a.href=ytnewhome;
        }
    }
}


function redirectPage(ytnewhome)
{
    window.location.replace(ytnewhome);
}

/**
functions below this are currently unused/outdated.

function choiceChange(ytnewhome, currentpage, contype)
{
    insertChoiceChanger(ytnewhome);
    if(wantChoice(ytnewhome, currentpage))
    {
        setLinkChoice(contype);
    }
}

function insertChoiceChanger(ytnewhome)
{
    var choicechanger = document.createElement('a');
    choicechanger.setAttribute('href', ytnewhome + '?choice=1');
	choicechanger.appendChild(document.createTextNode('Change your youtube homepage.'));
    document.body.appendChild(choicechanger);
}


function wantChoice(ytnewhome, currentpage)
{
    return(currentpage == ytnewhome + "?choice=1");
}


function setLinkChoice(contype) //not used anymore, the my_subscriptions page doesn't exist anymore
{
    var newlinkchoice=prompt("Please decide wich page you want to be redirected to \n\n Type A for www.youtube.com/feed/subscriptions \n\n Type B for www.youtube.com/my_subscriptions");
    if(newlinkchoice=="A" || newlinkchoice=="a")
    {
        GM_setValue("linkchoice", '//www.youtube.com/feed/subscriptions');
    	window.location.replace(contype + '//www.youtube.com/feed/subscriptions');        
    }
    if(newlinkchoice=="B" || newlinkchoice=="b")
    {
        GM_setValue("linkchoice", '//www.youtube.com/my_subscriptions');
    	window.location.replace(contype + '//www.youtube.com/my_subscriptions');       
    }
}
**/