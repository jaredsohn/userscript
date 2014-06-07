// ==UserScript==
// @name           Snitch!
// @namespace      xbtc
// @include        http://www.waffles.fm/*
// @include        https://www.waffles.fm/*
// @include        http://waffles.fm/*
// @include        https://waffles.fm/*
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// @include        http*://passthepopcorn.me/*
// @description    Lets you know what you've already downloaded. (Version 0.9.8)
// ==/UserScript==

(function()
{
	
	
	var _protos={
		"waffles.fm":
		{
			siteName:				"Waffles.fm",
			svPrefix:				"wf",
			detailsPage:			"/details.php",
			torrentIdRegexp:		/id=([0-9]+)/,
			torrentLink:			"/details.php?id=",
			userLink:				"/userdetails.php",
			userIdRegexp:			/id=([0-9]+)/,
			snatchPage:				new RegExp("/snatches.php"),
			canShowHelp:			1,
			validateSnatchHref:		function(href,userId)
			{
				if(uploadsAreSnatches&&href.indexOf("/mytorrents.php")>-1) return true;
				return href.indexOf("/snatches.php")>-1 && href.indexOf("id=")==-1;
			},
			validateMarkableLink:	function(link){return (link.href.indexOf("&to")==-1&&link.href.indexOf("&filel")==-1);},
			findNodeForInfoBox:		function()
			{
				var h2s=document.getElementsByTagName("h2");
				for(var i=0;i<h2s.length;i++) if(h2s[i].innerHTML.indexOf("Currently ")>-1) return h2s[i];
				return null;
			},
			checkLinkStatus:		function(link)
			{
				var idMatch=defs.torrentIdRegexp.exec(validLinks[i].href);
				if(!idMatch) return null;
				var id=parseInt(idMatch[1]);
				if(id==currentTorrentId) return null;
				return id;
			},
			calculateKnownSnatches:	function()
			{
				var n=0;
				for(var k in currentSnatches) n++;
				return n;
			}
		},
		"gazelle":
		{
			detailsPage:		"/torrents.php?id",
			groupIdRegexp:		/id=([0-9]+)/,
			torrentIdRegexp:	/torrentid=([0-9]+)/,
			
			torrentLink:		"/torrents.php?id",
			userLink:			"/user.php",
			userIdRegexp:		/id=([0-9]+)/,
			snatchPage:			new RegExp("torrents.php\?.*type=snatched.*"),
			uploadedPage:		new RegExp("torrents.php\?.*type=uploaded.*"),
			whatSwapRegexp:		new RegExp("swapDisplay\\('([^']+)"),
			canShowHelp:		0,
			ignoreIdIsCurrent:	false,
			validateSnatchHref:	function(href,userId)
			{
				var m=defs.userIdRegexp.exec(href);
				if(!(m&&m[1]==userId)) return false;
				if(uploadsAreSnatches&&defs.uploadedPage.exec(href)) return true;
				if(defs.snatchPage.exec(location.href)) return true;
				return false;
			},
			validateMarkableLink: function(link)
			{
				var href=link.href;
				var hashIdx=href.indexOf("#");
				if(href.indexOf("&peers")>-1) return false;
				if(hashIdx==href.length-1||hashIdx<=0) return true;
				return false;
			},
			findNodeForInfoBox:	function()
			{
				var ds=document.getElementsByTagName("div");
				for(var i=0;i<ds.length;i++) if(ds[i].className=="linkbox") return ds[i];
				return null;
			},
			checkLinkStatus:	function(link)
			{
				var gidMatch=defs.groupIdRegexp.exec(link.href);
				if(!gidMatch) return null;
				var gid=parseInt(gidMatch[1]);
				if(snatchMode) currentSnatches[-gid]=1;
				var id;
				var idMatch;
				if(idMatch=defs.whatSwapRegexp.exec(link.getAttribute("onclick")))
				{
					id=parseInt(idMatch[1]);
				}
				else
				{
					idMatch=defs.torrentIdRegexp.exec(link.href);
					if(!idMatch)
					{
						if(currentSnatches[-gid]) return -gid;
						return null;
					}
					id=parseInt(idMatch[1]);
				}
				if(!snatchMode&&!currentSnatches[id]) return null;
				return id;
			},
			calculateKnownSnatches:	function()
			{
				var n=0;
				for(var k in currentSnatches) if(k<0) n++;
				return n;
			}
		}
	};
	var _extend=function(){
		var oo={};
		for(var i=0;i<arguments.length;i++)
		{
			var o=arguments[i];
			if(o) for(var k in o) oo[k]=o[k];
		}
		return oo;
	};
	var _defs={
		"waffles.fm":				function(){return _extend(_protos["waffles.fm"]);},
		"what.cd":					function(){return _extend(_protos["gazelle"],
									{
										siteName:	"What.CD",
										svPrefix:	"wc"
									});},
		"passthepopcorn.org":		function(){return _extend(_protos["gazelle"],
									{
										siteName:	"PassThePopcorn",
										svPrefix:	"ptp"
									});}
	};
	var version="0.9.8";
	function getXY(el)
	{
		var x=0;
		var y=0;
		while(el&&!isNaN(el.offsetLeft)){x+=el.offsetLeft;y+=el.offsetTop;el=el.parentNode;}
		return [x,y];
	}
	
	var validLinks=[];
	var userId=0;
	var userName="?";
	var idRegexp=/id=([0-9]+)/;
	var firstUse=false;
	var helpDiv=null;
	var x;
	var currentTorrentId=null;
	var currentSnatches=null;
	var snatchMode=false;
	var uploadsAreSnatches=false;
	var defs=null;	
	
	var locLower=location.href.toLowerCase();
	for(var k in _defs)
	{
		if(locLower.indexOf(k)>-1)
		{
			defs=_defs[k]();
			break;
		}
	}
	if(!defs)
	{
		GM_registerMenuCommand("Snitch! couldn't find defs for this site...", function(){alert("This means there's something curious going on. Contact the developer, maybe?")});
		return;
	}
	
	var onSnatchPage=null;
	var links=document.getElementsByTagName("a");
	var snatchLink=null;

	if(location.href.indexOf(defs.detailsPage)>-1)
	{
		try { currentTorrentId=parseInt(idRegexp.exec(location.href)[1]); } catch(e) {}
	}

	for(var i=0;i<links.length;i++)
	{
		if(links[i].href.indexOf(defs.torrentLink)>-1)
		{
			validLinks.push(links[i]);
			continue;
		}
		if(!userId&&links[i].href.indexOf(defs.userLink)>-1)
		{
			var m=defs.userIdRegexp.exec(links[i].href);
			if(m)
			{
				userId=parseInt(m[1]);
				userName=links[i].innerHTML;
				if(!GM_getValue(defs.svPrefix+"u"+userId)) firstUse=true;
				uploadsAreSnatches=(GM_getValue(defs.svPrefix+"uis"+userId)=="yes");
				onSnatchPage=defs.validateSnatchHref(location.href, userId);
			}
		}
		if(firstUse&&!snatchLink&&defs.snatchPage.exec(links[i].href))
		{
			snatchLink=links[i];
		}
	}
	var menuCmdPrefix="Snitch! ("+defs.siteName+"): #"+userId+" ("+userName+"): ";
	GM_registerMenuCommand(menuCmdPrefix+"Forget",
		function()
		{
			GM_setValue(defs.svPrefix+"sn"+userId,"");
			if(defs.canShowHelp&&confirm("Re-show the help tooltip too?")) GM_setValue(defs.svPrefix+"u"+userId,"");
			alert("I forgot all about "+userId+" now :("+(uploadsAreSnatches?"\n\nUploads-are-snatches is still on, though.":""));
		}
	);
	GM_registerMenuCommand(menuCmdPrefix+"Set upload handling...",
		function()
		{
			var newValue=confirm("Would you like to handle uploads as snatches?\nThis will mark all of your own uploads as snatches (provided you check your Uploads page).\n\nThis option is currently "+(uploadsAreSnatches?"ON":"OFF")+".\nChoose OK for \"Yes\", Cancel for \"No\".");
			GM_setValue(defs.svPrefix+"uis"+userId,(newValue?"yes":"no"));
			alert("Setting saved. Refresh the page to see changes.");
		}
	);
	
	snatchMode=onSnatchPage=defs.validateSnatchHref(location.href, userId);
	
	if(snatchLink&&!onSnatchPage)
	{
		if(defs.canShowHelp)
		{
			helpDiv=document.createElement("div");
			helpDiv.id="snitchHelpDiv";
			helpDiv.style.background="white";
			helpDiv.style.border="1px solid #000";
			helpDiv.style.padding="2px";
			helpDiv.style.maxWidth="300px";
			helpDiv.style.textAlign="left";
			helpDiv.innerHTML="<b>CAN HAS SNATCHES?</b><br/><br/>Hey "+userName+", this is Snitch! talking. You might want to click <b>My Snatches</b> to make sure I know of all the things you've downloaded and keep track of them.<p/>Don't worry, this popup won't appear once I know what you've been downloading.";
			helpDiv.style.position="absolute";
			var xy=getXY(snatchLink);
			helpDiv.style.left=xy[0]-1;
			helpDiv.style.top=xy[1]+snatchLink.offsetHeight+1;
			document.body.insertBefore(helpDiv,document.body.lastChild);
		}
		snatchLink.style.background="orange";
		snatchLink.style.color="black";
		snatchLink.style.fontWeight="bold";
		snatchLink.style.textDecoration="blink";
	}
	
	if(validLinks.length)
	{
		currentSnatches={};
		if(x=GM_getValue(defs.svPrefix+"sn"+userId)) x.split("|").forEach(function(v){ currentSnatches[parseInt(v,36)]=1; });
		for(var i=0;i<validLinks.length;i++)
		{
			var res=defs.checkLinkStatus(validLinks[i]);
			var validLink=defs.validateMarkableLink(validLinks[i]);
			if(res)
			{
				if(snatchMode) currentSnatches[res]=1;
				if(currentSnatches[res] && validLink)
				{
					validLinks[i].innerHTML+=" <span style=\"color:white;font-weight:bold;background:red\">S</span>"; //  "+res+"
					var parent=validLinks[i].parentNode;
					if(parent.tagName=="td") parent.className+=" snitch-highlight";
				}
			}
		}
		if(snatchMode)
		{
			var out=[];
			var n=0;
			var known=defs.calculateKnownSnatches();
			for(var k in currentSnatches) { out.push(parseInt(k).toString(36)); }
			out=out.sort();
			GM_setValue(defs.svPrefix+"sn"+userId,out.join("|"));
			GM_setValue(defs.svPrefix+"u"+userId,":)");
			var ibn=defs.findNodeForInfoBox();
			if(ibn)
			{
				var infoDiv=document.createElement("div");
				infoDiv.align="center";
				var text=
					"<div style=\"border:1px dotted #999;padding:1em;margin:0.5em 0;"+
					"max-width:480px;font-weight:normal;font-size:8pt/10pt\">"+
					"Snitch! "+version+" <sup>by xbtc</sup> knows of <b>"+known+"</b> snatches.";
				if(uploadsAreSnatches) text+="<br/><b>Your uploads are currently also counted as snatches.</b><br/>";
				text+="<br/>If the \"known\" count above is <i style=\"border-bottom:1px dotted #999\" title=\"For some "+
					"reason, the total count may not be exactly what the tracker says. I don't know why.\">significantly</i> "+
					"lower than your current actual snatch count, just use the page controls to browse your snatches. "+
					"See your Tools - Greasemonkey - User Script Commands menu to reset snatch status.</div>";
				infoDiv.innerHTML=text;
				ibn.parentNode.insertBefore(infoDiv,ibn.nextSibling);
			}
			else
			{
				document.title+=" (Snitch!: "+out.length+")";
			}
			if(x=document.getElementById("snitchHelpDiv")) x.style.display="none";
		}
		delete out;
		delete currentSnatches;
	}
})();
	