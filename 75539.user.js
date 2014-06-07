// Taggable for Greasemonkey
// version 1.00
// 2008-04-02 first release
// Copyright (c) 2010, Narendra Rocherolle, Nick Wilder
//
// ==UserScript==
// @name          Taggable
// @namespace     http://taggable.com
// @description   Tag your Facebook friends anywhere on the Web
// @include       *
// @exclude       http://*taggable.com/*
// @exclude       http://*facebook.com/*
// ==/UserScript==


// make sure we have a body
var gsServer = 'http://taggable.com';
var gsVersion = '1.00';
var tInsertPoint;
if(document.getElementsByTagName("body")[0])
{
        tRun();
}

function tRun()
{
        if (window.location != window.parent.location)  //don't run on frames or iframes
                return;
        
        tCurrentUrl = document.location.href;
        if(tCurrentUrl.indexOf('about:blank') != -1)
                return;
        tEmbedFunction(tShowOnPage);
        
        tInsertPoint = document.getElementsByTagName("body")[0];
        var tNav = document.createElement("div");
        var tImgButton = '<img src="'+tGetButton()+'" />';
        tNav.innerHTML = '<div id="tOpen" style="z-index: 999; height: 24px !important; padding: 0px; position: fixed; bottom: 0px; left: 0px; background-color: transparent;"><span title="Tag someone on this page!" style="cursor: pointer;" id="tButton">'+tImgButton+'</span><span id="tOnPage"></span></div>';

        tInsertPoint.appendChild(tNav);
        document.getElementById('tButton').addEventListener('click',tOpenTagSomeoneWindow,true);

        var ptTop_JSON = document.createElement("script");
        ptTop_JSON.type="text/javascript";
        ptTop_JSON.src=gsServer+"/buttonDetails.php?showNames=true&displayStyle=text&action=getPeopleStringHtml&format=json&callback=tShowOnPage&client=greasemonkey&version="+gsVersion+"&url="+escape(tCurrentUrl);
        document.getElementsByTagName("head")[0].appendChild(ptTop_JSON);
        
}

function tOpenTagSomeoneWindow(url)
{
        tCurrentUrl = document.location.href.replace('http://','');
	w=window.open(gsServer+'/url/'+escape(tCurrentUrl), 'taggable',
		'width=800,height=500,status=1,toolbar=0,menubar=0,location=1,scrollbars=1,resizable=1');
	w.focus();
}

function tShowOnPage(pResults)
{
        var tString = pResults.results;
        document.getElementById('tOnPage').innerHTML = tString;      
}

function tEmbedFunction(s)
{
	var tScriptObject = document.createElement('script');
	tScriptObject.type = "text/javascript";
	document.body.appendChild(tScriptObject).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function tGetButton()
{
        return 'data:image/png;base64,' +
		'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';
        
        
}

