// ==UserScript==
// @name                DILib
// @namespace           http://draxlonsoft.org/DILib
// @description            base library for Dungeon Inquisitor interface modifications

// @include             http://www.dungeoninquisitor.com/*
// @exclude             http://www.dungeoninquisitor.com

// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_addStyle

// ==/UserScript==

/*
<!--==Notes==-->
<h3>DILib theory</h3>

<li>Register functions as
	<li>Initializer - to be run first, before any page modifications, to scrape data, or initialize vars</li>
	<li>Handler - to be run next, with a list of nodes matching your selection criteria</li>
	<li>Finalizer - to be run last, usually to modify the page...</li>
</li>
<!--==/Notes==-->
*/

var initializers;
var handlers;
var finalizers;

function LocationMatches(locreg)
{
        if(window.location.href.match(locreg) != null)
            return 1;

        return 0;
}

function AddHandler(func, locreg, sel)
{

        if(LocationMatches(locreg))
        {
			console.log("Location " + window.location.href + " matches " + locreg + " adding handler");
            var newhandler = new Object();

            newhandler.function = func;
            newhandler.regex = locreg;
            newhandler.selection = sel;

            handlers[handlers.length] = newhandler;
        }
		else
			console.log("Location " + window.location.href + " does not match " + locreg);
}

function AddInitializer(func, locreg)
{
        if(LocationMatches(locreg))
        {
			console.log("Location " + window.location.href + " matches " + locreg + " adding initializer");
            var newhandler = new Object();

                newhandler.function = func;
                newhandler.regex = locreg;

                initializers[initializers.length] = newhandler;
        }
}

function AddFinalizer(func, locreg)
{
    if(LocationMatches(locreg))
    {
		console.log("Location " + window.location.href + " matches " + locreg + " adding finalizer");
        var newhandler = new Object();

        newhandler.function = func;
        newhandler.regex = locreg;

        finalizers[finalizers.length] = newhandler;
    }
}

function DILib_Main()
{
    var nodelist;
	var x;

    initializers = new Array();
    handlers = new Array();
    finalizers = new Array();

    DILib_AddInitializers();
    DILib_AddHandlers();
    DILib_AddFinalizers();

    for(x=0; x<initializers.length; x++)
    {
        try
        {
        initializers[x].function();
        }
        catch (e) { console.log(e); }
    }

    for(x=0; x<handlers.length; x++)
    {
		console.log("Calling handler " + x + " of " + handlers.length + " using query " + handlers[x].selection);
        try
        {
            nodelist = document.evaluate(handlers[x].selection,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

            if(nodelist != null)
                handlers[x].function(nodelist);
        }
        catch (e) { console.log(e); }

    }

	console.log("Calling finalizers");
    for(x=0; x<finalizers.length; x++)
    {
        try
        {
            finalizers[x].function();
        }
        catch (e) { console.log(e); }
    }
}


DILib_Main();
// End base code

// Handler hook-in
function DILib_AddInitializers()  // Add Initializers here, with a regex matching locations to run them
{
	//AddInitializer(fleetSummaryInitializer, new RegExp("(map\.aspx.loc=.[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})|(base.aspx.base=[0-9]+($|&order))"));
	AddInitializer(loyaltySoulCostInitializer, new RegExp("(dungeon_info\.php.type=creatures)"));
}

function DILib_AddFinalizers()  // Add Finalizers here, with a regex matching locations to run them
{
	AddFinalizer(ChainPullFinalizer, new RegExp("(player.php)"));
	AddFinalizer(OverrideLayout, new RegExp("(index.php)"));
	AddFinalizer(EnlargeChat, new RegExp("(chat.php)"));
	AddFinalizer(loyaltySoulCostFinalizer, new RegExp("(dungeon_info\.php.type=creatures)"));
	//AddFinalizer(ReviveAllFinalizer, new RegExp("(dungeon_info\.php.type=creatures)"));
	AddFinalizer(OverrideLayoutForNewUI, new RegExp("(main.php)"));
	AddFinalizer(HandleChatLinksForOldUI, new RegExp("(chatbord.php)"));
}

function DILib_AddHandlers()  // Add Handlers here, with a regex matching locations to run them, and a document.evaluate expression
{
	// href uses embedded quotes.. build the string seperate.
	var evalQuery = '//span/a[starts-with(@href,"javascript:loadPage(' + "'inquisit.php" + '") and font[contains(text(),"New")]]';
	AddHandler(addRansomButton,new RegExp("(dungeon_info\.php.type=prisoners)"),evalQuery);
	evalQuery = '//span/a[starts-with(@href,"javascript:loadPage(' + "'dungeon_info.php?type=item" + '") and not(contains(text(),"Gold Bag"))]';
	AddHandler(addDestroyButton,new RegExp("(dungeon_info\.php.type=storage)"),evalQuery);
	evalQuery = '//span/a[starts-with(@href,"javascript:loadPage(' + "'dungeon_info.php?type=item" + '") and contains(text(),"Gold Bag")]';
	AddHandler(makeGoldBagsEpic,new RegExp("(dungeon_info\.php.type=storage)"),evalQuery);
	AddHandler(loyaltySoulCostCalc, new RegExp("(dungeon_info\.php.type=creatures)"),'//td[contains(text(),"Loyalty")]');
}
// End Handler hook-in


// Global Vars
var loyaltyToGain;
var loyaltySoulCost;

// Custom Handlers
function EnlargeChat()
{
	console.log("In EnlargeChat");

	document.getElementById("chatframe").style.height=(document.body.clientHeight-63)+"px";
	document.getElementById("chatframe").setAttribute("id","fixedchatframe");   // Change the ID or his resize script is gonna screw it up again...
}

function OverrideLayoutForNewUI()
{
	console.log("Overriding layout for new UI");

	window.setTimeout(realOverrideLayout,500);
}

function realOverrideLayout()
{
	console.log("in realOverrideLayout for new UI");

	//GM_addStyle(".scroll-chat {height: 142px; margin-left: 9px; margin-top: -3px; overflow-x: hidden; overflow-y: auto; width: 276px; word-break: break-all;}");
	GM_addStyle(".rightContent {height: 850px;width: 290px;}");
	GM_addStyle(".scroll-chat {height: 162px; margin-left: 9px; margin-top: -3px; overflow-x: hidden; overflow-y: auto; width: 740px; word-break: break-all;}");
//	GM_addStyle(".chatArea {background: url('file://E|/right-down.png') no-repeat scroll 0 0 transparent;height: 397px;margin-left: 3px;width: 303px;}");
	GM_addStyle(".chatArea {background: url('file://C|/DIImages/right-down.png') no-repeat scroll 0 0 transparent;height: 220px;margin-left: 3px;width: 750px;left: 26px;position: absolute;top: 790px}");
	GM_addStyle("div#chat_list {width:740px !important;height:157px !important}");

	GM_addStyle("div#mainContent {margin-top: 75px}");
	GM_addStyle(".mainArea {background: url('file://C|/DIImages/left.png') no-repeat scroll 0 75px transparent;float: left;height: 803px;left: 28px;position: absolute;top: 55px;width: 648px;}");
	GM_addStyle(".mainButtonArea {height: 79px;margin-left: -26px;margin-top: 0px;position: absolute;width: 690px;z-index: 100;}");		// margin-top: 718px
	GM_addStyle(".jspContainer {height: 700px !important;}");
	GM_addStyle(".scroll-pane {height: 700px !important;margin-left: 10px;margin-top: 11px;overflow: auto;width: 627px;}");
	GM_addStyle(".mainbody {color: #808060;font-family: 'Century Gothic';font-size: 12px;margin: 0;overflow: hidden;padding: 0;background: url('file://C|/DIImages/background.jpg') no-repeat scroll 0 0 #101000;background-size:1000px 1100px}");

	GM_addStyle(".rightContentTop {background: url('file://C|/DIImages/right-up.png') no-repeat scroll 0 0 transparent;height:650px;}");
	GM_addStyle(".scroll-left {height: 638px}");

	GM_addStyle(".rightMiddleRight {margin-top: 5px} ");
	GM_addStyle(".rightMiddleLeft {margin-top: 5px} ");

	GM_addStyle(".head {background: url('images/head.png') no-repeat scroll 0 0 transparent;background-size: 196px 202px;height: 202px;left: 782px;position: absolute;top: 852px;width: 196px;}");

	GM_addStyle(".bannerArea {height: 100px;left: 125px;position: absolute;top: 1075px;width: 750px;}");
//	node = document.evaluate("//div[@id='chat_list']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//	if(node != null) node.style.height = "337px";
}


function OverrideLayout()
{
	console.log("Overriding layout");

	// Sizing is in the first two/only two tables in the body...
	// body/table/tbody/tr    2 tds  width 75% and 25%
	// body/table/tbody/tr/td/table/tbody 2 trs  height 80% and 25%

    var node = document.evaluate("//td[@width='75%']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node != null)
		node.width="65%";
	else
		console.log("Unable to find td with width 75%");


	node = document.evaluate("//tr[@height='80%']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node != null)
	{
		console.log("Found " + node + " with height 80%, setting height to 60%");
		node.setAttribute("name","mainrow");
		node.setAttribute("height","60%");
	}
	else
		console.log("Unable to find tr with height 80%");

	node = document.evaluate("//iframe[@id='bottom']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	console.log("Found iframe with id==bottom, firstChild is " + node.firstChild);
}

function ChainPullFinalizer()
{
	// Add a checkbox for chain pulling, and persist state to a gm var.  When checked, click set trap button on page load.
	// optionally add a count and decrement

	// Table with class 'menu0' contains the 'button' for set trap
	// lets stick the checkbox in a new row in the parent table
	// ../../../../appendchild(new table with width=100%)

	//console.log("Running ChainPullFinalizer");
    var trapTable = document.evaluate("//table[@class='menu0']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	var chainpullactive = parseInt(GM_getValue("chainPull",0));
	var chainpullcount = parseInt(GM_getValue("chainCount",5));

	if(chainpullcount == 0)
		chainpullactive = 0;

	if(chainpullactive == 0)
		chainpullcount = 5;

	if(trapTable == null)
	{
		console.log("Trap table not found.");
		return;
	}

	var chaintable = document.createElement("DIV");
	chaintable.setAttribute("id","chaintable");
	//console.log("Inserting "+ chaintable + " under " + trapTable.parentNode);
	trapTable.parentNode.appendChild(chaintable);

	chaintable.innerHTML="<table width='100%'><tr><td><input type='checkbox' id='chaincheck' value='1' "+(chainpullactive==0?"":"checked ")+"/>Chain pull "+chainpullcount+" humans</td></tr></table>";
	chaintable.firstChild.firstChild.firstChild.firstChild.addEventListener('click', checkChanged, true);

	if(chainpullactive == 1)
	{
		//console.log("Chainpull is active");
	 	if(document.evaluate("//a/font[contains(text(),'Set Trap')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null)
			executeChainPull();
		else
			console.log("Chainpull is active, no 'Set Trap' found");
	}
}

function ReviveAllFinalizer()
{
	var revivealllink = document.evaluate("//a/b[contains(text(),'Revive All')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	console.log("In ReviveAllFinalizer with revivealllink = " + revivealllink);

	if(revivealllink != null)
		revivealllink.click();
}

function executeChainPull()
{
	// decrement count, call loadPage
	var chainpullcount = parseInt(GM_getValue("chainCount"));
	if(chainpullcount > 0)
		GM_setValue("chainCount",chainpullcount-1);

	//console.log("Calling loadpage");
 	var loada = document.evaluate("//a/font[contains(text(),'Set Trap')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(loada != null)
		loada.click();
}

function checkChanged()
{
	// if it just got cleared, clear all gm_vars
	if(document.getElementById('chaincheck').checked == 0)
	{
		GM_deleteValue("chainPull");
		GM_deleteValue("chainCount");
	}

	// if it just got set, set all gm_vars, then check if set trap is available and call executeChainPull
	else
	{
		GM_setValue("chainPull",1);
		GM_setValue("chainCount",5);
	 	if(document.evaluate("//a/font[contains(text(),'Set Trap')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null)
			executeChainPull();
	}
}

function makeGoldBagsEpic(nodeList)
{
	console.log("In makeGoldBagsEpic with nodeList containing " + nodeList.snapshotLength + " nodes");
	var tmp;
	var bagNode;

	for(x=0; x<nodeList.snapshotLength; x++)
	{
		nodeList.snapshotItem(x).innerHTML = "<font class='hero'>"+ nodeList.snapshotItem(x).innerHTML +"</font>";
	}
	//javascript:loadPage('dungeon_info.php?type=destroy_item&entity_id=2318293','')
}


function addDestroyButton(nodeList)
{
	console.log("In addDestroyButton with nodeList containing " + nodeList.snapshotLength + " nodes");
	var tmpNode;
	var entityID;
	var regexs;
	var entityRegex = new RegExp(".+dungeon_info.php.type=item&entity_id=(.+)',");

	for(x=0; x<nodeList.snapshotLength; x++)
	{
		regexs = nodeList.snapshotItem(x).href.match(entityRegex);

		if(regexs == null)
		{
			console.log("Matching " + nodeList.snapshotItem(x).href + " against regex " + entityRegex + " returned null");
			continue;
		}

		entityID = regexs[1];

		tmpNode = document.createElement("A");
		tmpNode.setAttribute('href',"javascript:loadPage('dungeon_info.php?type=destroy_item&entity_id=" + entityID + "','left');" );
		tmpNode.innerHTML = "<font color='red'>&nbsp;x</font>";

		nodeList.snapshotItem(x).parentNode.appendChild(tmpNode);
	}
	//javascript:loadPage('dungeon_info.php?type=destroy_item&entity_id=2318293','')
}

function addRansomButton(nodeList)
{
	console.log("In addRansomButton with nodeList containing " + nodeList.snapshotLength + " nodes");
	var tmpNode;
	var prisonerName;
	var prisonerID;
	var regexs;
	var prisonerRegex = new RegExp(".+inquisit.php.bot=(.+)&entity_id=(.+)',");

	for(x=0; x<nodeList.snapshotLength; x++)
	{

		regexs = nodeList.snapshotItem(x).href.match(prisonerRegex);

		if(regexs == null)
		{
			console.log("Matching " + nodeList.snapshotItem(x).href + " against regex " + prisonerRegex + " returned null");
			continue;
		}

		prisonerName = regexs[1];
		prisonerID = regexs[2];

		tmpNode = document.createElement("A");
		tmpNode.setAttribute('href',"javascript:loadPage('inquisit.php?bot=" + prisonerName + "&entity_id=" + prisonerID + "&cmd=ransom','left');" );
		tmpNode.innerHTML = "<font color='red'>&nbsp;$</font>";

		nodeList.snapshotItem(x).parentNode.appendChild(tmpNode);
	}
	//span/a[starts-with(@href,"javascript:loadPage('inquisit.php")]                       javascript:loadPage('inquisit.php?bot=Clytie&entity_id=3596451','left');"]
	//javascript:loadPage('inquisit.php?bot=Mwanajuma&entity_id=3521352&cmd=ransom','')
}


function loyaltySoulCostInitializer()
{
	loyaltyToGain = 0;
	loyaltySoulCost = 0;
}

function loyaltySoulCostFinalizer()
{
	var msg;

	console.log("In loyaltySoulCostFinalizer, loyaltyToGain = " + loyaltyToGain + ", loyaltySoulCost = " + loyaltySoulCost);

	if(loyaltySoulCost > 0)
		msg = "<font color='red'>" + loyaltyToGain + " loyalty can be gained by levying at least " + loyaltySoulCost + " soul.</font>";
	else
		msg = "<font color='green'>No loyalty can be gained via levying.</font>";

    var topDiv = document.evaluate("//div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var loyaltyMessage = document.createElement("SPAN");
	loyaltyMessage.innerHTML = msg;

	//creatureTable.parentNode.insertBefore(creatureTable,loyaltyMessage);
	console.log("Inserting message: " + msg);
	topDiv.insertBefore(loyaltyMessage,topDiv.firstChild);
}

function loyaltySoulCostCalc(nodeList)
{
	var x;

	// We have the loyalty TD in the creature summary, grab the next TD's innertext and see if it's < 80
	for(x=0; x<nodeList.snapshotLength; x++)
	{
		var tmp = parseInt(nodeList.snapshotItem(x).parentNode.childNodes[1].firstChild.nodeValue);
		var lvl = parseInt(nodeList.snapshotItem(x).parentNode.parentNode.firstChild.childNodes[1].firstChild.nodeValue);
		var topTable = nodeList.snapshotItem(x).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var creatureName = topTable.firstChild.firstChild.firstChild.firstChild.innerHTML;

		console.log('Checking creature ' + creatureName + ' Loyalty: ' + tmp + ', Level: ' + lvl);

		if(tmp == 100)
		{
			colorCodeLoyaltyLevel(creatureName,'green');
		}
		else if(tmp >= 80)
		{
			colorCodeLoyaltyLevel(creatureName,'yellow');
		}
		else
		{
			if(colorCodeLoyaltyLevel(creatureName,'orange'))
			{
				loyaltyToGain += 100-tmp;

				var upkeep = getUpkeep(creatureName,lvl);

				console.log(creatureName +"'s upkeep is " + upkeep);
				loyaltySoulCost += (100-tmp)*(upkeep/12);  // soulcost is based on upkeep/12
			}
		}
	}
}

function getUpkeep(creature, lvl)  // We should have the creature type and name
{
	var creatureType = creature.substring(0,creature.lastIndexOf(" "));

	switch(creatureType)
	{
		case "Imp":	return 10;
		case "Skeleton Soldier": return 20;
		case "Skeleton Archer":	return 30;
		case "Corpse Soldier": return 100;
		case "Corpse Archer": return 200;
		case "Bird Woman": return 1000;
		case "Dark Priest": return 400;
		case "Dark Priestess": return 600;
		case "Dark Sorcerer": return 600;
		case "Dark Sorceress": return 400;
		case "Dark Knight": return 400;
		case "Mistress": return 500;
		case "Dark Lord":
			return lvl *1000;
	}

	return 12;
}

function colorCodeLoyaltyLevel(creatureName,color)
{

	var evalQuery = "//span/a[contains(text(),'"+creatureName+"')]";
	var node = document.evaluate(evalQuery, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(node == null)  // Either away, or dead...  how do we want to display them?
	{
		return false;
		evalQuery = "//span/a/font[contains(text(),'"+creatureName+"')]";
		node = document.evaluate(evalQuery, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

	node.innerHTML = "<font color='" + color + "'>"+node.innerHTML+"</font>";
	return true;
}

function HandleChatLinksForOldUI()
{
	console.log("In HandleChatLinksForOldUI");

	window.setTimeout(realFixChatLinksForOldUI,500);
}

function realFixChatLinksForOldUI()
{
	console.log("In realFixChatLinksForOldUI");
	var oldMessages;
	var newMessages;
	var chatWindow = document.getElementById("chatwindow");

	if(chatWindow != null)
	{
		oldMessages = chatWindow.innerHTML;
		if(oldMessages != null && oldMessages != "")
		{
			newMessages = oldUIChatStr(oldMessages);

			if(newMessages != "")
			{
				//console.log("Chat link detected, would fix to");
				//console.log(newMessages);
				chatWindow.innerHTML = newMessages;
			}
		}
	}

	window.setTimeout(realFixChatLinksForOldUI,1500);
}

function oldUIChatStr(msg)
{
	var chatstr = '';

	var msg_text = msg;
	var reg1=new RegExp("(\\[report#)([0-9]+)#([a-zA-Z0-9]+)\\]","g");
	msg_text=msg_text.replace(reg1,"<a href=\"javascript:window.top.frames[0].loadPage('log.php?type=&log_id=$2&code=$3','left')\"><font color=orange>[Report#$2]</font></a>");

	var reg2=new RegExp("(\\[prisoner#)([0-9]+)#([a-zA-Z ]+)#([a-zA-Z ]+)\\]","g");
	msg_text=msg_text.replace(reg2,"<a href=\"javascript:window.top.frames[0].loadPage('inquisit.php?bot=$4&entity_id=$2','left')\")><font color=orange>[$3 $4]</font></a>");

	var reg3=new RegExp("(\\[item#)([0-9]+)#([a-zA-Z ]+)\\]","g");
	msg_text=msg_text.replace(reg3,"<a href=\"javascript:window.top.frames[0].loadPage('dungeon_info.php?type=item&entity_id=$2','left')\"><font color=orange>[$3]</font></a>");

	if(msg_text != msg)
		return msg_text;

	return "";
}