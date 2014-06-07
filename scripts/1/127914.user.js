// ==UserScript==
// @name           Cleared Pixiv Artists
// @namespace      http://userscripts.org/scripts/show/127914
// @description    Keeps track of which Pixiv artists' works and image responses you're done looking through and when you last finished them.
// @include        http://danbooru.donmai.us/*
// @include        http://hijiribe.donmai.us/*
// @include        http://sonohara.donmai.us/*
// @include        http://www.donmai.us/*
// @include        http://www.pixiv.net/*
// @grant          GM_setValue
// @grant          GM_getValue
// @version        2014.02.23
// ==/UserScript==

var waitingDays = 300;//Days since a page was cleared before the Random link will include it again (assuming all artists cleared at least once)
var worksWeight = 3;//Number of chances to give each member_illust link of being selected for the random link (response links get 1)

//////////////////////////////////////////////////////////////////////////////////////

if( window == window.top )
	addLinks();

function addLinks()
{
	if( typeof(GM_getValue) != "undefined" && GM_getValue('a', 'b') )
	{
		getList = function(name){ try{ return JSON.parse( GM_getValue(name,"[]") ); }catch(e){ return []; } }
		setList = function(name,list) { GM_setValue(name,JSON.stringify(list)); }
	}
	else if( location.host.indexOf("donmai.us") >= 0 )
	{
		return;//GM is needed to maintain a single list across both Pixiv and Danbooru, so Danbooru is disabled when that isn't available
	}
	else
	{
		//Use local storage instead.
		getList = function(name)
		{
			var value = localStorage.getItem("cleared_pixiv."+name);
			if( value )
				try{ return JSON.parse(value); } catch(e){}
			return [];
		}
		setList = function(name,list) { localStorage.setItem("cleared_pixiv."+name, JSON.stringify(list)); }
	}
	
	//Add random link
	var randomLink;
	if( location.hostname.indexOf("donmai") >= 0 )
	{
		//Danbooru: Add to right end of subnavbar
		randomLink = document.evaluate("//header/nav/menu[not(contains(@class,'main'))]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if( !randomLink )
			return;
		randomLink = randomLink.appendChild( document.createElement("li") ).appendChild( document.createElement("a") );
	}
	else
	{
		//Pixiv: Add to right of whatever
		randomLink = document.getElementsByTagName("header")[0];
		if( !randomLink )
			return;
		randomLink = randomLink.appendChild( document.createElement("a") );
		randomLink.style.cssFloat = "right";
		randomLink.style.margin = "3px";
	}
	randomLink.id = "random_pixiv_link";
	
	setRandomLink();
	
	if( location.href.indexOf("http://www.pixiv.net/member.php?id=") == 0 )
	{
		//Member profile
		addListListener( document.evaluate("//div[@class='worksListOthers']//p/a[contains(@href,'member_illust.php?id=')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, "worksList" );
		addListListener( document.evaluate("//div[@class='worksListOthers']//p/a[contains(@href,'response.php?mode=all&id=')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, "responseList" );
	}
	else if( location.href.indexOf("http://www.pixiv.net/member_illust.php?id=") == 0 )
	{
		//Member's works
		addListListener( document.evaluate("//div/h1/a[contains(@href,'member_illust.php?id=')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, "worksList" );		
	}
	else if( location.href.indexOf("http://www.pixiv.net/response.php?mode=all&id=") == 0 )
	{
		//Image responses
		var header = document.evaluate("//div[@class='search_top_result']/h2", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if( !header )
			addListListener( null, "responseList" );
		else
		{
			var div = document.createElement("div");
			var link = div.appendChild( document.createElement("a") );
			link.textContent = header.textContent;
			link.href = location.href;
			addListListener(link, "responseList");
			header.innerHTML = "";
			header.appendChild(div);
		}
	}
	else if( location.href.indexOf("donmai.us/artist") >= 0 )
	{
		//Danbooru artist
		var links = document.evaluate('//div/ul/li/a[starts-with(@href,"http://www.pixiv.net/member.php?id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for( var i = 0; i < links.snapshotLength; i++ )
			addListListener( links.snapshotItem(i), "worksList" );
	}
}

function setRandomLink()
{
	var randomLink = document.getElementById("random_pixiv_link");
	if( !randomLink )
		return;
	
	var worksList = getList("worksList");
	var responseList = getList("responseList");
	var found = 0, i, pending = [];
	
	var responseWeight = (worksWeight < 0 ? -worksWeight : 1);
	worksWeight = (worksWeight > 0 ? worksWeight : 1);
	
	function addToList(maxDate)
	{
		for( var i = 0; i < worksList.length; i++ )
			if( worksList[i].date < maxDate )
			{
				for( j = 0; j < worksWeight; j++ )
					pending.push( "http://www.pixiv.net/member_illust.php?id="+worksList[i].id );
				found++;
			}
		for( var i = 0; i < responseList.length; i++ )
			if( responseList[i].date < maxDate )
			{
				for( j = 0; j < responseWeight; j++ )
					pending.push( "http://www.pixiv.net/response.php?mode=all&id="+responseList[i].id );
				found++;
			}
	}
	addToList(1);
	
	if( pending.length == 0 && waitingDays > 1 )
		addToList( new Date().getTime() - waitingDays*24*3600*1000 );
	
	if( !found )
	{
		randomLink.textContent = "Random pixiv link";
		randomLink.style.textDecoration = "line-through";
		randomLink.removeAttribute("href");
	}
	else
	{
		randomLink.textContent = "Random pixiv link ("+found+")";
		randomLink.href = ( found < 1 ? "" : pending[Math.floor(Math.random()*pending.length)] );
	}
}

function addListListener(curLink, listName)
{
	var thisList = getList(listName);
	var userID = (curLink ? curLink : location).href.replace(/.*id=(\d+).*/,"$1");
	
	if( /^\d+$/.test(userID) && ( listName == "worksList" || listName == "responseList" ) )
	{
		if( !curLink )
		{
			for( var index = thisList.length - 1; index >= 0; index-- )
				if( thisList[index].id == userID )
				{
					thisList.splice( index, 1 );
					setList(listName,thisList);
					setRandomLink();
					alert("Removed: "+userID+" from "+listName);
				}
			return;
		}
	}
	else return;
	
	curLink.parentNode.appendChild( document.createTextNode(" ") );
	var statusLink = curLink.parentNode.appendChild( document.createElement("a") );// Add / Remove
	statusLink.onclick = "return false;";
	
	var clearLink = curLink.parentNode.appendChild( document.createElement("a") ); // Clear
	clearLink.onclick = "return false;";
	
	var found = false;
	
	for( var i = thisList.length; i-- > 0; )
		if( userID == thisList[i].id )
		{
			if( found )
			{
				//Remove older duplicates that somehow managed to sneak in.
				thisList.splice( i, 1 );
				setList(listName,thisList);
			}
			else
			{
				if( thisList[i].date == 0 )
					clearLink.textContent = "/[Clear]";
				else
				{
					var days = Math.round( (new Date().getTime() - thisList[i].date)/(24*3600*1000) );
					clearLink.textContent = "/[Cleared "+days+" day"+(days != 1 ? "s" : "")+" ago]";
				}
				statusLink.textContent = "[Remove]";
				found = true;
			}
		}
	if( !found )
		statusLink.textContent = "[Add]";

	//Switch between "Add" and "Remove", modifying the list accordingly.
	statusLink.addEventListener("click", function()
	{
		var list = getList(listName);//Reload list in case it is being modified across multiple tabs
		for( var index = list.length - 1; index >= 0 && list[index].id != userID; index-- );
		
		if( !found )
		{
			//Add to list if it isn't there already.
			if( index < 0 )
				list.push( { id: userID, date: 0 } );
			found = true;
			
			statusLink.textContent = "[Remove]";
			clearLink.textContent = "/[Clear]";
		}
		else
		{
			//Remove from list if it's really there
			if( index >= 0 )
				list.splice( index, 1 );
			found = false;
			
			curLink.textContent = curLink.textContent.replace(/ \[.*/g,'');
			statusLink.textContent = "[Add]";
			clearLink.textContent = "";
		}
		setList(listName,list);
		setRandomLink();
	}, true );
	
	//Set link as cleared today
	clearLink.addEventListener("click", function()
	{
		var list = getList(listName);
		for( var index = 0; index < list.length && list[index].id != userID; index++ );
		list[index].id = userID;
		list[index].date = new Date().getTime();
		setList(listName,list);
		
		statusLink.textContent = "[Remove]";
		clearLink.textContent = "/[Cleared 0 days ago]";
		setRandomLink();
	}, true );
}
