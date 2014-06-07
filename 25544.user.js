// ==UserScript==
// @name           Kongregate Profile Badges
// @description    Kongregate Profile Badges
// @include        http://www.kongregate.com/accounts/*/badges
// @include        http://kongregate.com/accounts/*/badges
// @include        http://www.kongregate.com/accounts/*/badges#
// @include        http://kongregate.com/accounts/*/badges#
// ==/UserScript==

var info,badges,ubadges,storeU; //information for side, completed badges, uncompleted badges, storage for removal
var funCall;			//last function call

function init()
{
	var side = document.getElementById("sidebar");

	//first badge completed (0 becomes dazwillmenu, once menu is added)
	info = side.getElementsByTagName("div")[0];

	side.style.position = "fixed";
	side.style.float    = "right";

	var ad = document.getElementById("ad_container");

	if(ad != null)
	{
		side.appendChild(ad); 	//affix ad to right panel
	}

	getBadges();   //get badge array
	linkOptions(); //add menu
	completion();  //initialize modified view of this mode

	storeU = ubadges.slice(); //store copy
}

function linkOptions()
{
	var side = document.getElementById("sidebar");

	if (document.getElementById("dazwillmenu") == null)
	{
		var mainDiv = document.createElement("div");

		mainDiv.setAttribute("id","dazwillmenu");
		mainDiv.style.height  = "100px";  //5 or 6 links
		mainDiv.style.display = "block";

		if(ubadges.length != 0) //true if on your own profile and you have unachieved badges
		{
			attachLnk(mainDiv,"Add/Remove Unachieved Badges" ,removeUnachieved );
		}

		attachLnk(mainDiv,"Sort By Completion" 		,completion );
		attachLnk(mainDiv,"Sort By Difficulty" 		,difficulty );
		attachLnk(mainDiv,"Sort By Badge Name" 		,badgeName  );
		attachLnk(mainDiv,"Sort By Game Name"  		,gameName   );
		attachLnk(mainDiv,"Sort By Developer Name"  	,devName    );

		side.insertBefore(mainDiv,side.firstChild);
	}
}

function attachLnk(mainDiv,name,func)
{
	var item = createLnk(name);
	item.addEventListener("click",func,true); //capture phase executes before bubbling phase
	mainDiv.appendChild(item);
	return item;
}

function createLnk(txt)
{
	var lnk = document.createElement('a');
	lnk.setAttribute("href","#");

	lnk.innerHTML	   = txt;
	lnk.style.margin   = "0 5px;";
	lnk.style.fontSize = "1.3em";
	lnk.style.display  = "block";

	return lnk;
}

function getBadges()
{
	//Achieved Badges
	var mainDiv = document.getElementById("mybadges").getElementsByTagName("div")[1];
	badges = new Array();

	var link = mainDiv.getElementsByTagName("a");

	for(var j=0;j<link.length;j++)
	{
		subBadge(badges,link[j]);
	}
	
	//Unachieved Badges
	ubadges = new Array();
	mainDiv = document.getElementById("morebadges");

	if(mainDiv) //Unachieved badges will not be available on other user's pages
	{
		mainDiv = mainDiv.getElementsByTagName("div")[1];
		link    = mainDiv.getElementsByTagName("a");

		for(var j=0;j<link.length;j++)
		{
			subBadge(ubadges,link[j]);
		}
	}
}

function subBadge(badgeList,link)
{
	var image = link.getElementsByTagName("img")[0];
	var mous  = image.getAttribute("onmouseover");

	image.removeAttribute("onmouseover");

	mous = mous.slice(mous.indexOf(".view_badgeinfo', '")+19,-2);

	image.setAttribute("target",mous);
	image.addEventListener("mouseover",function(){ listener(this); },true);

	badgeList.push(link);
}

function difficulty()
{
	funCall = difficulty;

	var tags = new Array();
	tags[0]  = "Easy";
	tags[1]  = "Medium";
	tags[2]  = "Hard";
	tags[3]  = "Impossible";

	var addition = "Unachieved - "

	if(ubadges.length != 0)
	{
		tags[4]  = addition + "Easy";
		tags[5]  = addition + "Medium";
		tags[6]  = addition + "Hard";
		tags[7]  = addition + "Impossible";
	}

	addLabels(tags);
	
	//	      badge[]	tags[]	len	tag addition
	subDifficulty(badges,	tags,	4,	""		); //no addition for completed
	subDifficulty(ubadges,	tags, 	4,	addition	); //Unachieved addition
}

function subDifficulty(badgeList,tags,len,add) //len is always 4 for now, but incase of future changes
{
	for(var i=0;i<badgeList.length;i++)
	{
		var image = badgeList[i].getElementsByTagName("img")[0];
		var tar   = image.getAttribute("target");
		var type  = document.getElementById(tar).getElementsByTagName("dd")[1].innerHTML;
		var badge = null;

		tar = image.getAttribute("title").indexOf("(completed)") > 0;

		for(var j=0;j<len;j++)
		{
			if (type.indexOf(tags[j].toLowerCase()) > 0)
			{
				badge = document.getElementById(add + tags[j]);
			}
		}

		if(badge == null)
			return;

		badge = badge.getElementsByTagName("dl")[0];

		var elem  = document.createElement("dt");
		elem.appendChild(badgeList[i]);
		
		if(!tar)
		{
			badge.insertBefore(elem,badge.firstChild);
		}
		else
		{
			badge.insertBefore(elem,badge.lastChild);
		}
	}
}


//sorts by completion (default)
function completion()
{
	funCall = completion;
	
	var tags = new Array();
	tags[0]  = "Earned Badges";

	if(ubadges.length != 0)			//if there are unachieved badges, or on another profile
		tags[1]  = "Unachieved Badges"

	addLabels(tags);

	sortDisplayName(badges, tags[0]);	
	sortDisplayName(ubadges,tags[1]);
}

//displays a sorted list
function sortDisplayName(badgeList,tag)
{
	var elem = document.getElementById(tag).getElementsByTagName("dl")[0];

	for(var i=0;i<badgeList.length;i++)
	{
		var addBadge = document.createElement("dt");
		addBadge.appendChild(badgeList[i]);
		elem.appendChild(addBadge,elem.lastChild);
	}
}

function badgeName()
{
	funCall = badgeName;

	var tags = new Array();
	tags[0]  = "Earned Badges - Badge Name";

	if(ubadges.length != 0)
	{
		tags[1] = "Unachieved Badges - Badge Name";
	}

	addLabels(tags);

	var badgeSet = badges.slice(); //copy of badges array
	badgeSet.sort(badgeNameSort);
	sortDisplayName(badgeSet,tags[0]);

	badgeSet = ubadges.slice();    //copy of ubadges array
	badgeSet.sort(badgeNameSort);
	sortDisplayName(badgeSet,tags[1]);	
}

//used to sort a list based on name
function badgeNameSort(badgeNameOne,badgeNameTwo)
{
	//reduce calls
	badgeNameOne = badgeNameOne.getElementsByTagName("img")[0].getAttribute('title');
	badgeNameTwo = badgeNameTwo.getElementsByTagName("img")[0].getAttribute('title');

	badgeNameOne = badgeNameOne.toLowerCase(); //based on letters, not case of letters
	badgeNameTwo = badgeNameTwo.toLowerCase();

	if(badgeNameOne < badgeNameTwo)
	{
		return -1;
	}
	if (badgeNameOne > badgeNameTwo)
	{
		return 1;
	}
	return 0;
}

function gameName()
{
	funCall = gameName;
	
	var tags = new Array();
	tags[0]  = "Earned Badges - Game Name";

	if(ubadges.length != 0)
	{
		tags[1] = "Unachieved Badges - Game Name";
	}

	addLabels(tags);

	var badgeSet = badges.slice(); //copy of badges array

	badgeSet.sort(gameNameSort);
	sortDisplayName(badgeSet,tags[0]);

	badgeSet = ubadges.slice();    //copy of ubadges array

	badgeSet.sort(gameNameSort);
	sortDisplayName(badgeSet,tags[1]);
}

function gameNameSort(nameOne,nameTwo)
{
	nameOne = (nameOne.href).split("/");	nameOne = nameOne[nameOne.length-1]; //last for game name
	nameTwo = (nameTwo.href).split("/");	nameTwo = nameTwo[nameTwo.length-1];

	nameOne = nameOne.toLowerCase(); //based on letters, not case of letters
	nameTwo = nameTwo.toLowerCase();

	if(nameOne < nameTwo)
	{
		return -1;
	}
	if (nameOne > nameTwo)
	{
		return 1;
	}
	return 0;
}

function devName()
{
	funCall = devName;

	var tags = new Array();
	tags[0]  = "Earned Badges - Developer Name";

	if(ubadges.length != 0)
	{
		tags[1] = "Unachieved Badges - Developer Name";
	}

	addLabels(tags);

	var badgeSet = badges.slice(); //copy of badges array

	badgeSet.sort(devNameSort);
	sortDisplayName(badgeSet,tags[0]);

	badgeSet = ubadges.slice();    //copy of ubadges array

	badgeSet.sort(devNameSort);
	sortDisplayName(badgeSet,tags[1]);
}

function devNameSort(nameOne,nameTwo)
{
	nameOne = (nameOne.href).split("/");	nameOne = nameOne[nameOne.length-2]; //2nd last for dev
	nameTwo = (nameTwo.href).split("/");	nameTwo = nameTwo[nameTwo.length-2];

	nameOne = nameOne.toLowerCase(); //based on letters, not case of letters
	nameTwo = nameTwo.toLowerCase();

	if(nameOne < nameTwo)
	{
		return -1;
	}
	if (nameOne > nameTwo)
	{
		return 1;
	}
	return 0;
}


//Add all tags labels
function addLabels(tags)
{
	badgeDivision();

	for(var i=0;i<tags.length;i++)
	{
		division(tags[i]);
	}
}

//Add a div for tag labels
function badgeDivision()
{
	var a = document.getElementsByTagName("div");
	var c = new Array();

	for(var i=0;i<a.length;i++)
	{
		if(a[i].getAttribute("class") == "badge_wrapper")
		{
			c.push(a[i]);
		}
	}
	for(var i=0;i<c.length;i++)
	{
		c[i].parentNode.removeChild(c[i]);
	}
}

//Text Width
function getTextWidth(txt)
{
	var id = "KongLabelTxt";

	var spanwidth = document.createElement("span");			//create span element
	spanwidth.setAttribute("type","hidden"); 			//invisible
	spanwidth.setAttribute("id",id);
	spanwidth.setAttribute("class","badge_type");			//font information
	spanwidth.innerHTML = txt;
	document.getElementById("sidebar").appendChild(spanwidth); 	//insert temp span
	
	//get width
	var wid = spanwidth.offsetWidth; 				//get text width
	
	spanwidth.parentNode.removeChild(spanwidth); //delete temp span
	return wid;
}

//create a single tags
function division(name)
{
	var elem = document.getElementById(name);
	if (elem == null)
	{
		elem = document.createElement("div");
		elem.setAttribute("id",name);
		elem.setAttribute("class","badge_wrapper");

		var divider = document.createElement("div");
		var wid     = getTextWidth(name)*1.4+5; //width of text + 5 pixel padding
		
		if(wid < 55)	  //accuracy correction for < 5 letters
			wid = 55; //minimum width

		divider.setAttribute("class","morebadges_heading");
		divider.style.background = "#A31919 url(/images/presentation/redarrow_right.gif) no-repeat scroll "+wid+"px 0px;";
		divider.style.height     = "27px;"; //static size

		wid = wid + 10; //increase size for arrow placement

		divider.style.width = wid+"px;";
		divider.innerHTML = '<span class="badge_type">'+name+'</span>';

		elem.appendChild(divider);

		divider = document.createElement("div");

		divider.setAttribute("class","badges_list");
		divider.innerHTML='<dl class="badge"></dl><br style="clear:both;" />';

		elem.appendChild(divider);

		var divider = document.getElementById("main");

		divider.appendChild(elem);
	}
}

function listener(badgeStats) //no more null special case
{
	info.style.display = "none";						//current info removed
	info = document.getElementById(badgeStats.getAttribute("target"));	//get new info
	info.style.display = "block";						//make new info visisble
}


function removeUnachieved()
{
	if(ubadges.length == 0)
	{
		ubadges = storeU.slice(); //copy (works even if none available)
	}
	else
	{
		ubadges = new Array(); 	  //clear unachieved
	}
	
	//Update current view
	funCall();
}


init();