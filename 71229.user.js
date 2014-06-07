// ==UserScript==
// @name           Full Mod
// @namespace      http://warfacts.wanush.net
// @description    All the mods
// @include        http://*.war-facts.com/*
// @exclude        http://*.war-facts.com
// @exclude        http://*.war-facts.com/index.php
// @exclude        http://*.war-facts.com/index2.php
// ==/UserScript==

// Copyright (c) 2006 Michael Wanush, all rights reserved.
// There is absolutely no warrantee whatsoever. If this script messes up
// your computer the user is responsible, not the writer. You have been
// warned. That said, the script is tested for Grease Monkey 0.6.4 ONLY.

var fm_version = "1.23.25";

// Show Scientists
useShowScientist = true;

// Starlog Mod Options
var useStarlog = true;
var EmpireName = '';
var showExploreTime = false;
var showRegularTime = true;
// End Starlog Mod Options

// Fleet Hider Options
var useFleetHider = true;
// End Fleet Hider Options

// Pager Options
var usePager = true;
// End Pager Options

// Battle Log Options
var useBattleLog = true;
// End Battle Log Options

// Universe Options
var useUniverse = true;
// End Universe Options

// "Other" Colonies Options
var useOtherColony = true;
// End "Other" Colonies Options

// Planet Options
var usePlanet = true;
var useReillan = false;
// End Planet Options

// Blueprints Options
var useBlueprints = true;
var useBlueprintsBuild = true;
// End Blueprints Options

// Fleet Move Options
var useFleetMove = true;
// End Fleet Move Options

// Explorer Helper Options
var useExploreHelp = false;
var ExploreOrder = "Xplo A01,Xplo A03,Xplo A13,Xplo A17,Xplo E,Xplo M,Xplo A";
var NoExplore = "Xplo A03";
// End Explorer Helper Options

// Colony Options
var useColony = true;
var useTokmor = false;
// User editable values. Put yours here!
	// Malls and farm values will be overridden by any configuration
	// done within the browser.
	// Best Mall Efficiency
var gMallEff = 1.00*1.00;
	// Best Farm Efficiency
var gFarmEff = 4.00*1.00;

	// The percentage of workers you want in malls
var gMallWorkerFraction = 2.5 / 100;
  // Percentage of total mall efficiency, divided by best mall efficiency. This will
  // alert you if you should destroy old malls.
var gMallRebuild = 70 / 100;
	// Alert level for happiness, crime, and health - below this percentage there will be an alert
var gAlertLevel = 90 / 100;
  // Alert level for education - below this percentage there will be an alert
var gEduAlertLevel = 40 / 100;
	// Alert for low storage capacity - above this percentage there will be an alert
var gStorageAlert = 90 / 100;
// End Colony Options

// Forum Options
var useForum = true;
// End Forum Options


// DO NOT ALTER THE BELOW! :)
var base = window.location.href;
var instance = base.substring(base.indexOf("//") + 2);
instance = instance.substring(0, instance.indexOf("."));

var iLeftBox = document.evaluate("//div[@class='leftbox']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var leftBox = iLeftBox.iterateNext();

var iRightBox = document.evaluate("//div[@class='rightbox']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var rightBox = iRightBox.iterateNext();
if (rightBox) {
	rightBox.style.marginTop = "220px";
}

var iTopBox = document.evaluate("//div[@class='topbox']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var topBox = iTopBox.iterateNext();

var iCenterBox = document.evaluate("//div[@class='centerbox']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var centerBox = iCenterBox.iterateNext();
if (centerBox) {
  centerBox.style.marginTop = "205px";
}

function timediff(textt, start, end)
{
	var ret = document.createElement('span');
	var ttime, sh, sn, sd, sm, sy, eh, en, ed, em, ey;
	sh = start.replace(/^(\d+):.*$/,"$1");
	sn = start.replace(/^.*:(\d+).*$/,"$1");
	sm = start.replace(/^.*\s(\d+)-.*$/,"$1");
	sd = start.replace(/^.*-(\d+)-.*$/,"$1");
	sy = start.replace(/^.*-(\d+)$/,"$1");
	var sdate = new Date(sy, sm, sd, sh, sn);
	sdate = sdate.getTime();
	eh = end.replace(/^(\d+):.*$/,"$1");
	en = end.replace(/^.*:(\d+).*$/,"$1");
	em = end.replace(/^.*\s(\d+)-.*$/,"$1");
	ed = end.replace(/^.*-(\d+)-.*$/,"$1");
	ey = end.replace(/^.*-(\d+)$/,"$1");
	var edate = new Date(ey, em, ed, eh, en);
	edate = edate.getTime();
	var diff = (sdate - edate) / 1000 / 60;
	sd = Math.floor(diff / (24 * 60));
	diff = diff - sd * 24 * 60;
	sh = Math.floor(diff / 60);
	sm = diff - sh * 60;

	ttime = " " + sd + " days, " + sh + " hours, " + sm + " minutes";
	var n = document.createElement('u');
	n.appendChild(document.createTextNode(textt));
	ret.appendChild(n);
	ret.appendChild(document.createTextNode(ttime));
	return ret;
}

window.fullmod_onResearchLoad = function(e) {
	var iScientist = document.evaluate("//b[text()[contains(.,'Scientists available')]]/parent::*/parent::*/parent::*", centerBox, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var scientist = iScientist.iterateNext();
	var start = false;
	var insertThing = new Array();
	var insertPlace = new Array();
	var insertLinks = new Array();
	for (var i = 0; i < scientist.rows.length - 1; i++)
	{
		if (!start && scientist.rows[i].cells[0].innerHTML.indexOf('Scientists available') != -1)
		{
			start = true;
		}
		else if (start)
		{
			insertLinks.push(scientist.rows[i].cells[0].innerHTML.replace(/^.*scrollext\('(.*)'\).*$/g,"$1"));
			insertPlace.push(scientist.rows[i+1]);
			var nrow = document.createElement('tr');
			var ncol = document.createElement('td');
			ncol.setAttribute("colspan", "2");
			nrow.appendChild(ncol);
			insertThing.push(nrow);
		}
	}
	while (insertThing.length != 0)
	{
		var Thing = insertThing.pop();
		var Place = insertPlace.pop();
		var lnk   = insertLinks.pop();
		function getSciInfo(theLink, thePlace, theThing)
		{
		  GM_xmlhttpRequest({
        method:"GET",
        url:'http://' + instance + '.war-facts.com' + theLink,
        onload:getSciLoaded
      });
      function getSciLoaded(resp)
			{
				var page = resp.responseText;
				var output = document.createElement('span');
				page = page.substring(page.indexOf('Gender:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode(page.substring(0, page.indexOf('<')) + ", "));

				page = page.substring(page.indexOf('Current Salary:')+15);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("Salary: " + page.substring(0, page.indexOf('<')) + ", "));

				page = page.substring(page.indexOf('Ingenuity:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("Ingen: " + page.substring(0, page.indexOf('<'))));
				output.appendChild(document.createElement('br'));

				page = page.substring(page.indexOf('Agriculture:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("AGR: " + page.substring(0, page.indexOf('<')) + " "));

				page = page.substring(page.indexOf('Mining:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("MIN: " + page.substring(0, page.indexOf('<')) + " "));

				page = page.substring(page.indexOf('Processing:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("PRC: " + page.substring(0, page.indexOf('<'))+ " "));

				page = page.substring(page.indexOf('Production:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("PRD: " + page.substring(0, page.indexOf('<')) + " "));

				page = page.substring(page.indexOf('Physics:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("PHY: " + page.substring(0, page.indexOf('<'))));
				output.appendChild(document.createElement('br'));

				page = page.substring(page.indexOf('Chemics:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("CHE: " + page.substring(0, page.indexOf('<')) + " "));

				page = page.substring(page.indexOf('Medical:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("MED: " + page.substring(0, page.indexOf('<'))+ " "));

				page = page.substring(page.indexOf('Weapons:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("WEA: " + page.substring(0, page.indexOf('<')) + " "));

				page = page.substring(page.indexOf('Drives:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("DRI: " + page.substring(0, page.indexOf('<'))+ " "));

				page = page.substring(page.indexOf('Construction:')+7);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				page = page.substring(page.indexOf('>')+1);
				output.appendChild(document.createTextNode("CON: " + page.substring(0, page.indexOf('<'))));

				theThing.childNodes[0].appendChild(output);
				thePlace.parentNode.insertBefore(theThing, thePlace);
			}
		}
		getSciInfo(lnk, Place, Thing);
	}
}

window.fullmod_onStarlogLoad = function(e) {
	if (centerBox)
	{
		var imidBox = centerBox.getElementsByTagName('table');
		if (imidBox) {
			for (var row = 0; row < imidBox.length; row++)
			{
				var midBox = imidBox[row];
				var col1 = midBox.rows[0].cells[0];
				var col2 = midBox.rows[0].cells[1];
				var advisor = col1.childNodes[0];
				var empire  = col1.childNodes[2];

				if (advisor && advisor.tagName == "B")
				{
					var msgFrom = advisor.getElementsByTagName('font')[0];
					if (!msgFrom) msgFrom = advisor;
					var msg = msgFrom.innerHTML;
					if (msg == "Science Advisor" && col2.innerHTML.indexOf('Your research project #') != -1)
					{
						var starttime = col1.getElementsByTagName('font')[1].childNodes[0].nodeValue;
						var endtime = col2.getElementsByTagName('span')[0].childNodes[0].nodeValue;
						var insertafter = col2.childNodes[0];

						var nnode = col2.firstChild;
						nnode.appendChild(document.createElement('br'));
						nnode.appendChild(timediff('Total Time:',starttime, endtime));

						//alert(col2.childNodes[0].childNodes[2]);
						col2.insertBefore(nnode, col2.childNodes[1]);
					}
					if (msg == "Exploration Staff")
					{
						if (col2.innerHTML.indexOf('FAILED') != -1)
						{
							// Replace FAIL with red
							col2.replaceChild(document.createTextNode(" has "), col2.childNodes[1]);
							var newElement = document.createElement("font");
							newElement.setAttribute("color", "red");
							newElement.appendChild(document.createTextNode("FAILED"));
							col2.appendChild(newElement);
							col2.appendChild(document.createTextNode(" to explore anything."));
						}
						if (!showExploreTime)
						{
							if (col1.childNodes[4].childNodes[0].childNodes[0].tagName == "B") {
								col1.childNodes[0].innerHTML += " *";
							}
							col1.removeChild(col1.childNodes[4]);
							col1.removeChild(col1.childNodes[3]);
						}
					} else if (!showRegularTime) {
						col1.removeChild(col1.childNodes[4]);
						col1.removeChild(col1.childNodes[3]);
					}
					if (EmpireName == empire.innerHTML)
					{
						col1.removeChild(col1.childNodes[2]);
						col1.removeChild(col1.childNodes[1]);
					}
				}
			}
		}
	}
}

window.fullmod_onFleetsLoad = function(e) {
	var iFleets = document.evaluate("//a[@href='javascript:listfleetsall();']/parent::*/parent::*/parent::*/parent::*", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var fleets = iFleets.iterateNext();
	fh_toggle = function() {
		var mod = this;
		var fleettype = mod.previousSibling.previousSibling.href.replace(/javascript:listfleets\(\'(.*)\'\)/,"$1").replace(/ /,"");
		var stat = 1 - GM_getValue(instance + fleettype, 1);
		toggleFleetValue(fleettype);
		if (stat == 1)
			mod.innerHTML = 'Close';
		else
			mod.innerHTML = 'Open';
		press(fleettype);
	}
	if (fleets)
	{
		for (var row = 0; row < fleets.rows.length; row++)
		{
			var fleettype = fleets.rows[row].cells[0].getElementsByTagName('b')[0];
			if (fleettype)
			{
				if (!fleets.rows[row].cells[0].getElementsByTagName('b')[0].childNodes[0].tagName) {
					fleettype = fleettype.innerHTML.replace(/\s/g,"");
					var stat = GM_getValue(instance + fleettype, 1);
					if (stat == 0) press(fleettype);
					var lnk = document.createElement('a');
					//lnk.setAttribute("onclick", "fh_toggle('" + fleettype + "', " + row + ");return false;");
					lnk.addEventListener('click', fh_toggle, false);
					lnk.setAttribute("href", "#");
					if (stat == 1)
						lnk.appendChild(document.createTextNode('Close'));
					else
						lnk.appendChild(document.createTextNode('Open'));
					fleets.rows[row].cells[0].appendChild(document.createTextNode(" "));
					fleets.rows[row].cells[0].appendChild(lnk);
				}
			}
		}
	}
	function toggleFleetValue(ft)
	{
		var val = GM_getValue(instance + ft, 1);
		GM_setValue(instance + ft, 1 - val);
	}

	function press(ftype)
	{
		try {
			unsafeWindow.listfleets(ftype);
		} catch (ex) {
		}
	}
}

var addedPager = false;

window.fullmod_onPagerLoad = function(e) {
	var pager = 'http://' + instance + '.war-facts.com/extras/pager.php';
	var radio = 'http://radio.war-facts.com:8000/';
	var pagertime = 45;
	var radiotime = 5 * 60;
	var attempt = 0;

	setTimeout(getPagerMessage, 100);

	function getPagerMessage()
	{
		var app, txt, myCell0, myCell1, myCell2, myCell3, myCell4;
		var iExtInfo = document.evaluate("//table[@id='mgametab']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var ext = iExtInfo.iterateNext();
		var toptable = ext.rows[0].cells[1].getElementsByTagName('table')[0];
		if (ext) ext = ext.rows[0].cells[1].getElementsByTagName('table')[1];
		if (ext && toptable.rows.length != 2)
	  {
	  	addedPager = true;
	  	var nRow = document.createElement('tr');

	  	myCell0 = document.createElement('td');
	  	myCell0.setAttribute("colspan","1");
	    myCell0.setAttribute("align","center");
	    myCell0.setAttribute("class","strong");
	    txt = document.createTextNode("working...");
	    myCell0.appendChild(txt);

	  	myCell1 = document.createElement('td');
	  	myCell1.setAttribute("colspan","1");
	    myCell1.setAttribute("align","center");
	    myCell1.setAttribute("class","strong");
	    txt = document.createTextNode("working...");
	    myCell1.appendChild(txt);

	    myCell2 = document.createElement('td');
      myCell2.setAttribute("align","center");
      myCell2.setAttribute("colspan", "1");
      myCell2.setAttribute("class","strong");
      txt = document.createTextNode("working...");
      myCell2.appendChild(txt);
      toptable.rows[0].insertBefore(myCell2, myCell1.nextSibling);

      myCell3 = document.createElement("td");
      myCell3.setAttribute("align","center");
      myCell3.setAttribute("colspan", "1");
      myCell3.setAttribute("class","strong");
      txt = document.createTextNode("working...");
      myCell3.appendChild(txt);

      myCell4 = document.createElement("td");
      myCell4.setAttribute("align","center");
      myCell4.setAttribute("colspan", "1");
      myCell4.setAttribute("class","strong");
      txt = document.createTextNode("- - - - - - -");
      myCell4.appendChild(txt);

      nRow.appendChild(myCell0);
      nRow.appendChild(myCell1);
      nRow.appendChild(myCell2);
      nRow.appendChild(myCell3);
      nRow.appendChild(myCell4);

      toptable.rows[0].parentNode.appendChild(nRow);
	  } else {
	  	myCell0 = toptable.rows[1].cells[0];
	  	myCell1 = toptable.rows[1].cells[1];
	  	myCell2 = toptable.rows[1].cells[2];
	  	myCell3 = toptable.rows[1].cells[3];
	  	myCell4 = toptable.rows[1].cells[4];
	  }

    var pop = ext.rows[1].cells[0].innerHTML;
    pop = pop.substr(pop.indexOf(":")+1);
    pop = pop.replace(/,/g,"");
    pop = parseInt(pop,10);
    var popg = ext.rows[1].cells[0].innerHTML;
    popg = popg.substr(popg.indexOf("(")+1);
    popg = popg.substr(0, popg.indexOf(")")).replace(/,/g,"");;
    if (popg.substr(0,1) == "+")
    {
      popg = parseInt(popg.substr(1));
    } else {
      popg = -parseInt(popg.substr(1));
    }
    app = document.createElement("span");
    app.setAttribute("style", "font-size: 80%;");
    var str = document.createElement("strong");
    var pgp = Math.ceil(popg / pop * 1000000) / 10000;
    str.appendChild(document.createTextNode("Pop Growth: " + pgp + "%"));
    app.appendChild(str);
    while (myCell3.firstChild) myCell3.removeChild(myCell3.firstChild);
    myCell3.appendChild(app);


    var income = ext.rows[1].cells[1].innerHTML;
    income = income.substr(income.indexOf(":")+1);
    income = parseInt(income.replace(/,/g,""),10);
    app = document.createElement("span");
    app.setAttribute("style", "font-size: 80%;");
    str = document.createElement("strong");
    pgp = Math.ceil(income / pop * 1000) / 1000;
    str.appendChild(document.createTextNode("Income / Person: " + pgp + " cr"));
    app.appendChild(str);
    while (myCell2.firstChild) myCell2.removeChild(myCell2.firstChild);
    myCell2.appendChild(app);

    var lastCheck = GM_getValue(instance + "lastPagerCheck", "20000101010101");
    var lastY = lastCheck.substr(0, 4);
    var lastT = lastCheck.substr(4, 2);
    var lastD = lastCheck.substr(6, 2);
    var lastH = lastCheck.substr(8, 2);
    var lastM = lastCheck.substr(10,2);
    var lastS = lastCheck.substr(12,2);

	  var lastDate = new Date(lastY, lastT, lastD, lastH, lastM, lastS);
	  lastDate.setTime(lastDate.getTime() + 1000 * pagertime);
	  var nowDate = new Date();

    if (lastDate.getTime() < nowDate.getTime() || base.indexOf('starlog.php') != -1)
    {
    	if (attempt == 0)
    	{
    		attempt++;
	      GM_xmlhttpRequest({
	        method:"GET",
	        url:pager,
	        onload:getPagerMessageLoaded
	      });
	    }
    } else {
    	var mpt = GM_getValue(instance + "lastPagerTicks", 0);
    	if (mpt == 0)
    		mpt = "In Progress...";
    	else
    		mpt = "Next Economy Tick: " + mpt + " hours";
    	displayPagerMsg(mpt, GM_getValue(instance + "lastPagerNum", 0));
    }
    function displayPagerMsg(msg, num)
		{
			msg = msg.replace(/next Economy/i,"");
			app = document.createElement("span");
		  app.setAttribute("style", "font-size: 80%;");
		  str = document.createElement("strong");
		  str.appendChild(document.createTextNode("Messages: " + num)); // + " / " + msg));
		  app.appendChild(str);
		  while (myCell0.firstChild) myCell0.removeChild(myCell0.firstChild);
		  myCell0.appendChild(app, myCell0.firstChild);

		  app = document.createElement("span");
		  app.setAttribute("style", "font-size: 80%;");
		  str = document.createElement("strong");
		  str.appendChild(document.createTextNode(msg));
		  app.appendChild(str);
		  while (myCell1.firstChild) myCell1.removeChild(myCell1.firstChild);
		  myCell1.appendChild(app, myCell1.firstChild);
		}
		function getPagerMessageLoaded(response)
		{
			var nowDate = new Date();
		  var nowY = nowDate.getYear() + 1900;
		  nowY = nowY.toString();
		  var nowT = nowDate.getMonth().toString();
		  var nowD = nowDate.getDate().toString();
		  var nowH = nowDate.getHours().toString();
		  var nowM = nowDate.getMinutes().toString();
		  var nowS = nowDate.getSeconds().toString();
		  while (nowY.length < 4) nowY = "0" + nowY;
		  while (nowT.length < 2) nowT = "0" + nowT;
		  while (nowD.length < 2) nowD = "0" + nowD;
		  while (nowH.length < 2) nowH = "0" + nowH;
		  while (nowM.length < 2) nowM = "0" + nowM;
		  while (nowS.length < 2) nowS = "0" + nowS;
		  GM_setValue(instance + "lastPagerCheck", nowY + nowT + nowD + nowH + nowM + nowS);
			var resp = response.responseText;

	    var tick = resp.substr(resp.indexOf("Next"));
      var lpt = 0;
      tick = tick.substr(0,tick.indexOf("<"));
      lpt = parseInt(tick.substr(tick.indexOf(": ")+1),10);
      if (!lpt)
      {
        lpt = 0;
        tick = "In Progress.....";
      }
      GM_setValue(instance + "lastPagerTicks", lpt);
      var msg = resp.substr(resp.indexOf("new messag") - 15);
	    msg = msg.substr(msg.indexOf(">")+1);
	    msg = parseInt(msg,10);
	    if (!msg) {
	      msg = 0;
	    }
	    GM_setValue(instance + "lastPagerNum", msg);
	    displayPagerMsg(tick, msg);
	    attempt = 0;
		}

	  var lastRadio = GM_getValue("lastRadioCheck", "20000101010101");
    var lastRY = lastRadio.substr(0, 4);
    var lastRT = lastRadio.substr(4, 2);
    var lastRD = lastRadio.substr(6, 2);
    var lastRH = lastRadio.substr(8, 2);
    var lastRM = lastRadio.substr(10,2);
    var lastRS = lastRadio.substr(12,2);

		lastDate = new Date(lastRY, lastRT, lastRD, lastRH, lastRM, lastRS);
		lastDate.setTime(lastDate.getTime() + 1000 * radiotime);
		if (lastDate.getTime() < nowDate.getTime())
		{
			GM_xmlhttpRequest({
        method:"GET",
        url:radio,
        onload:getRadioMessageLoaded
      });
		} else {
			setRadio(GM_getValue("wfradio", 0));
		}
		function setRadio(val)
		{
			var ext = toptable.rows[0].cells[3].childNodes[0].childNodes[10];
			ext.removeChild(ext.childNodes[0]);
			var rad = document.createElement("font");
			if (val == 1) rad.setAttribute("class", "warn");
			rad.appendChild(document.createTextNode("Radio"));
			ext.appendChild(rad);
		}
		function getRadioMessageLoaded(response)
		{
			var nowDate = new Date();
		  var nowY = nowDate.getYear() + 1900;
		  nowY = nowY.toString();
		  var nowT = nowDate.getMonth().toString();
		  var nowD = nowDate.getDate().toString();
		  var nowH = nowDate.getHours().toString();
		  var nowM = nowDate.getMinutes().toString();
		  var nowS = nowDate.getSeconds().toString();
		  while (nowY.length < 4) nowY = "0" + nowY;
		  while (nowT.length < 2) nowT = "0" + nowT;
		  while (nowD.length < 2) nowD = "0" + nowD;
		  while (nowH.length < 2) nowH = "0" + nowH;
		  while (nowM.length < 2) nowM = "0" + nowM;
		  while (nowS.length < 2) nowS = "0" + nowS;
		  GM_setValue("lastRadioCheck", nowY + nowT + nowD + nowH + nowM + nowS);
			var resp = response.responseText;
			resp = resp.substr(resp.indexOf("newscontent")+13);
			resp = resp.substr(0, resp.indexOf("</div>")).replace(/^\s+|\s+$/g,'');
			if (resp != "&nbsp;") {
				setRadio(1);
				GM_setValue("wfradio", 1);
			} else {
				setRadio(0);
				GM_setValue("wfradio", 0);
			}
		}

	  setTimeout(getPagerMessage, 15000);
	}
}

window.fullmod_onBattleLoad = function(e) {
	// Get the base battle-log table
	var tblNode = centerBox;
	var thisNode = tblNode.getElementsByTagName('table')[0];
	if (thisNode)
	{
		// Get the href attribute to grab battle number
		var linkNode = document.evaluate("//@href[contains(.,'battle=')]", thisNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var linkText = linkNode.iterateNext();
		if (linkText)
		{
			// Get battle number
			var battleNum = linkText.nodeValue.replace(/^.*battle=(\d+).*$/m,"$1");

			// Create 'Previous' link and add it to table
			var newlink = document.createElement("a");
			battleNum--;
			if (battleNum < 0) battleNum = 0;
			newlink.setAttribute("href", "/battle_history.php?battle=" + battleNum);
			newlink.appendChild(document.createTextNode("< < < Prev "));
			thisNode.rows[0].cells[0].insertBefore(newlink, thisNode.rows[0].cells[0].childNodes[0]);

			// Create 'Next' link and add it to table
			battleNum+=2;
			newlink = document.createElement("a");
			newlink.setAttribute("href", "/battle_history.php?battle=" + battleNum);
			newlink.appendChild(document.createTextNode(" Next > > >"));
			thisNode.rows[0].cells[0].appendChild(newlink);
		}
	}
}

window.fullmod_onUniverseLoad = function(e) {
	var tblNode = document.evaluate("//td[@class='head']/strong/text()[contains(.,'Universe Statistics')]/parent::*/parent::*/parent::*/parent::*/parent::*", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var thisNode = tblNode.iterateNext();
	if ( thisNode )
	{
		var univpop = thisNode.rows[6].cells[3].childNodes[0].nodeValue.replace(/,/g,"");
		var tblTopNode = document.evaluate("//table[@id='mgametab']/tbody/tr/td/table[2]/tbody/tr[2]/td/strong", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var thisTopNode = tblTopNode.iterateNext();
		if (thisTopNode)
		{
			var totalpop = thisTopNode.childNodes[0].nodeValue.replace(/Total Population:/,"").replace(/,/g,"");
			var pct = Math.round(totalpop * 10000000/univpop ) / 100000;
			var newText = document.createTextNode("Percent of colonists:");
			thisNode.rows[10].cells[2].appendChild(document.createTextNode("Percent of colonists:"));
			var newdiv = document.createElement('div');
			newdiv.setAttribute("align", "right");
			newdiv.appendChild(document.createTextNode(pct + "%"));
			thisNode.rows[10].cells[3].appendChild(newdiv);
		}
	}
}

window.fullmod_onOtherColonyLoad = function(e) {
	var mod = centerBox.getElementsByTagName('table')[1];
	var cnum = 1;
	var land = 0;
  for (var i = 0; i < mod.rows.length-2; i+=5)
  {
    mod.rows[i].cells[0].insertBefore(document.createTextNode(cnum + " "), mod.rows[i].cells[0].childNodes[0]);
    if (mod.rows[i+2].cells[0].innerHTML.indexOf("Capital") != -1) i++;
    land += parseInt(mod.rows[i+3].cells[0].innerHTML.replace(/,/g,""));
    cnum++;
  }
  var nrow = document.createElement('tr');
  var ncol = document.createElement('td');
  ncol.setAttribute('class', 'head');
  var nb = document.createElement('strong');
  nb.appendChild(document.createTextNode('Landmass to take:'));
  ncol.appendChild(nb);
  nrow.appendChild(ncol);

  ncol = document.createElement('td');
  ncol.setAttribute('class', 'head');
  ncol.appendChild(document.createTextNode(land.toLocaleString() + " kmï¿½"));
  nrow.appendChild(ncol);

  mod.childNodes[1].appendChild(nrow);
}

window.fullmod_onPlanetLoad = function(e) {
	var tblNode = document.evaluate("//table[2]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var mod = tblNode.iterateNext();
	var tst = instance == "www2" ? false : true;
	if (mod)
	{
	//if (tst) gravc = 4; else gravc = 4;
		var gravc = tst ? 4 : 3;
		var grav = parseFloat(mod.rows[gravc].cells[3].childNodes[0].nodeValue);
		if (grav < 11)
		{
			mod.rows[gravc].cells[3].style.background = "green";
			mod.rows[gravc].cells[3].style.color = "black";
		}
		else if (grav < 14)
		{
			mod.rows[gravc].cells[3].style.background = "yellow";
			mod.rows[gravc].cells[3].style.color = "black";
		}
		else if (grav < 18)
		{
			mod.rows[gravc].cells[3].style.background = "orange";
			mod.rows[gravc].cells[3].style.color = "black";
		}
		else if (grav > 25)
		{
			mod.rows[gravc].cells[3].style.background = "red";
			mod.rows[gravc].cells[3].style.color = "black";
		}
		gravc++;
		var hab	= parseFloat(mod.rows[gravc].cells[3].childNodes[0].nodeValue);
		if (!hab) hab = 0;
		while (mod.rows[gravc].cells[3].firstChild) mod.rows[gravc].cells[3].removeChild(mod.rows[gravc].cells[3].firstChild);
		var div = document.createElement('div');
		div.setAttribute("class", "outer");
		var div2 = document.createElement('div');
		div2.setAttribute("style", "width: " + parseInt(hab) + "%;");
		div2.setAttribute("class", "inner");
		div.appendChild(div2);
		div2 = document.createElement('div');
		div2.setAttribute("class", "percent");
		div2.appendChild(document.createTextNode(hab + "%"));
		div.appendChild(div2);
		mod.rows[gravc].cells[3].appendChild(div);
		gravc += 7;
		mod.rows[gravc].cells[2].childNodes[0].nodeValue = "*Max Hab:";
		mod.rows[gravc].cells[2].setAttribute("class", "head");
		mod.rows[gravc].cells[3].setAttribute("class", "strong");
		hab = Math.round( (100 - 8/3 * (Math.abs(10.0 - grav))) * 100 ) / 100;
		if (hab < 0) hab = 0;
		var div = document.createElement('div');
		div.setAttribute("class", "outer");
		var div2 = document.createElement('div');
		div2.setAttribute("style", "width: " + parseInt(hab) + "%;");
		div2.setAttribute("class", "inner");
		div.appendChild(div2);
		div2 = document.createElement('div');
		div2.setAttribute("class", "percent");
		div2.appendChild(document.createTextNode(hab + "%"));
		div.appendChild(div2);
		while (mod.rows[gravc].cells[3].firstChild) mod.rows[gravc].cells[3].removeChild(mod.rows[gravc].cells[3].firstChild);
		mod.rows[gravc].cells[3].appendChild(div);
		gravc -= 5;
		for (var i = gravc; i < mod.rows.length; i++)
		{
			for (var j = 1; j < 5; j+=2)
			{
				var nods = mod.rows[i].cells[j].firstChild.getElementsByTagName('div');
				for (var k = 0; k < nods.length; k++)
				{
					if (nods[k].getAttribute('class') == "percent")
					{
						if (nods[k].firstChild.nodeValue == "0%")
						{
							//mod.rows[i].cells[j-1].setAttribute("class", "warn");
							nods[k].setAttribute("style", "color: red;");
						}
					}
				}
			}
		}
	}
}

window.fullmod_onKnownUniverseLoad = function(e) {
	var mod = centerBox.getElementsByTagName('table')[3];
	if (mod.rows[0].cells[0] && mod.rows[0].cells[0].childNodes[0].nodeValue != 'Please select a view!') {
		/*if (useReillan)
		{
			var debug = 0;
			for (var i = 0; i < mod.rows.length; i++)
			{
				var isSystem = mod.rows[i].getElementsByTagName('table').length == 0 ? true : false;
				if (isSystem) {

				}
			}
		} else {
		*/
			var maxOre = 0;
			var maxOreRow = 0;
			var maxOreRow2 = 0;

			for (var i = 1; i < mod.rows.length; i+=2)
			{
				var systemMod = mod.rows[i].cells[0].childNodes[0];

				if (instance != "www4") {

					for (var j = 0; j < systemMod.rows.length; j+=3)
					{
						if (systemMod.rows[j].cells[1].firstChild.nodeName == "A")
						{
							for (var c = 0; c < 3; c++)
							{
								systemMod.rows[j].cells[c].style.backgroundColor = "green";
								systemMod.rows[j].cells[c].style.color = "black";
							}
						}
						var grav = parseFloat(systemMod.rows[j+1].cells[2].childNodes[0].childNodes[0].nodeValue.replace(/Gravity: /,""));
						if (grav < 11)
						{
							systemMod.rows[j+1].cells[2].style.backgroundColor = "#68F40B";
							systemMod.rows[j+1].cells[2].style.color = "black";
						}
						else if (grav < 14)
						{
							systemMod.rows[j+1].cells[2].style.backgroundColor = "yellow";
							systemMod.rows[j+1].cells[2].style.color = "black";
						}
						else if (grav < 18)
						{
							systemMod.rows[j+1].cells[2].style.backgroundColor = "orange";
							systemMod.rows[j+1].cells[2].style.color = "black";
						}
						else if (grav > 25)
						{
							systemMod.rows[j+1].cells[2].style.backgroundColor = "red";
							systemMod.rows[j+1].cells[2].style.color = "black";
						}

						// Test habitability
						var hab = parseFloat(systemMod.rows[j+1].cells[4].childNodes[0].childNodes[0].nodeValue.replace(/Habitability: /,""));
						if (!hab) hab = 0;
						if (hab >= 75)
						{
							systemMod.rows[j+1].cells[4].style.background = "#68F40B";
							systemMod.rows[j+1].cells[4].style.color = "black";
						}
						else if (hab >= 50)
						{
							systemMod.rows[j+1].cells[4].style.background = "yellow";
							systemMod.rows[j+1].cells[4].style.color = "black";
						}
						else if (hab >= 25)
						{
							systemMod.rows[j+1].cells[4].style.background = "orange";
							systemMod.rows[j+1].cells[4].style.color = "black";
						}
						else if (hab == 0)
						{
							systemMod.rows[j+1].cells[4].style.background = "red";
							systemMod.rows[j+1].cells[4].style.color = "black";
						}

						// Test ores
						var hasallores = true;
						var allores = 0;
						for (y = 0; y < 11; y++)
						{
							var ores = parseInt(systemMod.rows[j+2].cells[y].childNodes[0].childNodes[2].nodeValue, 10);
							if (ores == 0) hasallores = false;
							allores += ores;
							if (ores == 100)
							{
								systemMod.rows[j+2].cells[y].style.background = "#ED57F9";
								systemMod.rows[j+2].cells[y].style.color = "black";
							}
							else if (ores >= 75)
							{
								systemMod.rows[j+2].cells[y].style.background = "#68F40B";
								systemMod.rows[j+2].cells[y].style.color = "black";
							}
							else if (ores >= 50)
							{
								systemMod.rows[j+2].cells[y].style.background = "yellow";
								systemMod.rows[j+2].cells[y].style.color = "black";
							}
							else if (ores >= 25)
							{
								systemMod.rows[j+2].cells[y].style.background = "orange";
								systemMod.rows[j+2].cells[y].style.color = "black";
							}
							else if (ores != 0)
							{
								systemMod.rows[j+2].cells[y].style.background = "red";
								systemMod.rows[j+2].cells[y].style.color = "black";
							}
						}
						var nnode = document.createElement('font');
						nnode.style.fontSize = "80%";
						nnode.appendChild(document.createTextNode(" Tot: " + allores));
						systemMod.rows[j+1].cells[0].appendChild(document.createElement("br"));
						systemMod.rows[j+1].cells[0].appendChild(nnode);
						if (hasallores) {
							systemMod.rows[j+1].cells[0].style.background = "green";
							systemMod.rows[j+1].cells[0].style.color = "white";
						}
						if (maxOre < allores) {
							maxOre = allores;
							maxOreRow = i;
							maxOreRow2 = j;
						}
					}

				} else {

					for (var j = 0; j < systemMod.rows.length; j+=2)
					{
						// If there is a colony
						if (systemMod.rows[j+1].cells[0].childNodes.length > 0)
						{
							systemMod.rows[j+1].cells[0].style.background = "green";
							systemMod.rows[j+1].cells[0].style.color = "black";
						}
						// Test gravity
						var grav = parseFloat(systemMod.rows[j].cells[3].childNodes[0].childNodes[0].nodeValue.replace(/Gravity: /,""));
						if (grav < 11)
						{
							systemMod.rows[j].cells[3].style.background = "#68F40B";
							systemMod.rows[j].cells[3].style.color = "black";
						}
						else if (grav < 14)
						{
							systemMod.rows[j].cells[3].style.background = "yellow";
							systemMod.rows[j].cells[3].style.color = "black";
						}
						else if (grav < 18)
						{
							systemMod.rows[j].cells[3].style.background = "orange";
							systemMod.rows[j].cells[3].style.color = "black";
						}
						else if (grav > 25)
						{
							systemMod.rows[j].cells[3].style.background = "red";
							systemMod.rows[j].cells[3].style.color = "black";
						}
						// Test habitability
						var hab = parseFloat(systemMod.rows[j].cells[5].childNodes[0].childNodes[0].nodeValue.replace(/Habitability: /,""));
						if (!hab) hab = 0;
						if (hab >= 75)
						{
							systemMod.rows[j].cells[5].style.background = "#68F40B";
							systemMod.rows[j].cells[5].style.color = "black";
						}
						else if (hab >= 50)
						{
							systemMod.rows[j].cells[5].style.background = "yellow";
							systemMod.rows[j].cells[5].style.color = "black";
						}
						else if (hab >= 25)
						{
							systemMod.rows[j].cells[5].style.background = "orange";
							systemMod.rows[j].cells[5].style.color = "black";
						}
						else if (hab == 0)
						{
							systemMod.rows[j].cells[5].style.background = "red";
							systemMod.rows[j].cells[5].style.color = "black";
							systemMod.rows[j].cells[5].childNodes[0].childNodes[0].nodeValue += "NONE";
						}
						// Test ores
						var hasallores = true;
						var allores = 0;
						for (y = 1; y < 12; y++)
						{
							var ores = parseInt(systemMod.rows[j+1].cells[y].childNodes[0].childNodes[2].nodeValue, 10);
							if (ores == 0) hasallores = false;
							allores += ores;
							if (ores >= 75)
							{
								systemMod.rows[j+1].cells[y].style.background = "#68F40B";
								systemMod.rows[j+1].cells[y].style.color = "black";
							}
							else if (ores >= 50)
							{
								systemMod.rows[j+1].cells[y].style.background = "yellow";
								systemMod.rows[j+1].cells[y].style.color = "black";
							}
							else if (ores >= 25)
							{
								systemMod.rows[j+1].cells[y].style.background = "orange";
								systemMod.rows[j+1].cells[y].style.color = "black";
							}
							else if (ores == 0)
							{
								systemMod.rows[j+1].cells[y].style.background = "red";
								systemMod.rows[j+1].cells[y].style.color = "black";
							}
						}
						var nnode = document.createElement('font');
						nnode.style.fontSize = "80%";
						nnode.appendChild(document.createTextNode(" Tot: " + allores));
						systemMod.rows[j+1].cells[0].appendChild(nnode);
						if (hasallores) {
							systemMod.rows[j+1].cells[0].style.background = "green";
							systemMod.rows[j+1].cells[0].style.color = "white";
						}
						if (maxOre < allores) {
							maxOre = allores;
							maxOreRow = i;
							maxOreRow2 = j;
						}
					}

				}
		}
		mod.rows[maxOreRow].cells[0].childNodes[0].rows[maxOreRow2].cells[0].style.background="blue";
	}
}

window.fullmod_onFleetNavLoad = function(e) {
	var transNode = document.evaluate("//b[text()='In Transit']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var mod = transNode.iterateNext();

	// If we are 'in transit'
	if (mod)
	{
		// Find the proper table from which to grab time left
		var tblNode = document.evaluate("//text()[contains(.,'Mission Objective')]/parent::*/parent::*/parent::*/parent::*/parent::*", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var tblmod = tblNode.iterateNext();
		if (tblmod)
		{
			// Get time left
			var timeLeft = parseInt(tblmod.rows[0].cells[3].childNodes[0].childNodes[0].nodeValue.	replace(/Time left:/i, "").replace(/,/g,""), 10);
			var allTime = " (Now)";
			// If we need to figure the time..
			if (timeLeft > 0)
			{
				// Get the current time and add timeleft. Remove GMT info and year
				var now = new Date();
				now = new Date(now.getTime() + timeLeft * 60 * 1000);
				var ndt = now.toString().substring(0, now.toString().indexOf("GMT")-4);
				var nYear = now.getYear() + 1900;
				var regx = new RegExp(nYear.toString());
				ndt = ndt.replace(regx, "");
				allTime = " (" + ndt + ")";
			}
			mod.appendChild(document.createTextNode(allTime));
		}
	}

	// Add Transport button
	var tblNode = document.evaluate("//input[@value='Launch!']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	mod = tblNode.iterateNext();
	if (mod)
	{
		var newBtn = document.createElement("input");
		newBtn.type = "submit";
		newBtn.value = "Transport!";
		newBtn.setAttribute("class", "warn");
		newBtn.setAttribute("name", "verify");
		newBtn.setAttribute("onclick","javascript:document.forms['form2'].mtype.selectedIndex=6;");
		mod.parentNode.appendChild(document.createTextNode(' '));
		mod.parentNode.appendChild(newBtn);
	}

	// Highlight View Colonies
	tblNode = document.evaluate("//a[contains(@href,'/list_colonies.php') and not(@class='greyed')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	mod = tblNode.iterateNext();
	if (mod)
	{
		mod.style.color = 'rgb(205,0,0)';
		mod.style.fontWeight = 'bold';
	}
}

window.fullmod_onForumLoad = function(e) {
	var lastReadH = GM_getValue(instance + "hour", 1);
  var lastReadM = GM_getValue(instance + "min", 1);
  var lastReadS = GM_getValue(instance + "sec", 1);
  var lastReadT = GM_getValue(instance + "mth", 1);
  var lastReadD = GM_getValue(instance + "day", 1);
  var lastReadY = GM_getValue(instance + "year", 2000);

  var lastRead = new Date(lastReadY, lastReadT, lastReadD, lastReadH, lastReadM, lastReadS);
  var latestRead = lastRead;

  var doc = centerBox.getElementsByTagName('table')[0];

  for (var row = 1; row < doc.rows.length; row ++)
  {
  	if (doc.rows[row].cells[0].attributes.length == 1)
  	{
  		var cell = doc.rows[row].cells[1];
		  var lr = checkOut(lastRead, cell);
		  if (lr > latestRead) latestRead = lr;
  	}
  }

  //latestRead = new Date(2000, 1, 1, 1, 1, 1);

	//alert(latestRead);

  GM_setValue(instance + "hour",latestRead.getHours());
  GM_setValue(instance + "min" ,latestRead.getMinutes());
  GM_setValue(instance + "sec" ,latestRead.getSeconds());
  GM_setValue(instance + "mth" ,latestRead.getMonth());
  GM_setValue(instance + "day" ,latestRead.getDate());
  GM_setValue(instance + "year",latestRead.getFullYear());

  function checkOut(lastR, cell)
  {
    var txt = cell.innerHTML;
    var time = txt.substr(txt.indexOf(">")+1);
    var time = time.substr(0, time.indexOf("<"));

    var lastReadH = parseInt(time.substr(0, 2),10);
    var lastReadM = parseInt(time.substr(3, 2),10);
    var lastReadS = parseInt(time.substr(6, 2),10);

    if (time.substr(9,1) == "p" && lastReadH != 12) lastReadH += 12;
    if (time.substr(9,1) == "a" && lastReadH == 12) lastReadH -= 12;

    var lastReadT = parseInt(time.substr(12,2),10)-1;
    var lastReadD = parseInt(time.substr(15,2),10);
    var lastReadY = parseInt(time.substr(18,4),10);

    var thisPost = new Date(lastReadY, lastReadT, lastReadD, lastReadH, lastReadM, lastReadS);
    cell = cell.getElementsByTagName('font')[0];
    if (thisPost > lastR) cell.style.color = "red";
    return new Date(lastReadY, lastReadT, lastReadD, lastReadH, lastReadM, lastReadS);
  }
}

window.fullmod_onBlueprintLoad = function(e) {
	var tst = centerBox.getElementsByTagName('table');
	var processing = "";
	for (var j = 0; j < tst.length; j++) {
	  if (tst[j].parentNode.nodeName == "FORM") {
	    var i = 0;
	    doc = tst[j];
	    while (i < doc.rows.length)
    	{
    	  if (doc.rows[i].cells[1].innerHTML == "&nbsp;")
    		{
    			i++;
    			processing = doc.rows[i].cells[1].childNodes[0].childNodes[0].innerHTML;
    		} else {
    			doProcessing(processing, doc.rows[i]);
    		}
    		i++;
    	}
    }
  }

	// Add upper options - stolen for the most part
	unsafeWindow.GM_wfbp_hideNamed = function(node)
	{
		var xpath;
		xpath = "//a[contains(text(), 'Archived Blueprints')]/../following-sibling::div";
		if(node.value.indexOf('Hide')!=-1)
			node.value = 'Show Unnamed';
		else
			node.value = 'Hide Unnamed';
		var ds = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var dNode;
		var nl = [];

		while(dNode = ds.iterateNext())
		{
			nl.push(dNode);
		}

		if (node.value == 'Show Unnamed')
		{
			node.value = 'Show Unnamed (' + nl.length + ')';
		}

		for(n in nl)
		{
			dNode = nl[n];
			if(dNode.style.display == '') {
				dNode.style.display = 'none';
			} else {
				dNode.style.display = '';
			}
		}
	}

	unsafeWindow.GM_wfbp_toggleBoxes = function()
	{
		var xpath;
		xpath = "//input[@value = 'Name']/following::input[position()<4 and @type='checkbox' and starts-with(@name,'delete')]";

		var ds = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var dNode;
		var nl = []

		while(dNode = ds.iterateNext())
		{
			nl.push(dNode);
		}

		for(n in nl) {	nl[n].checked = !nl[n].checked;	}
	}

	var cs = document.evaluate("//a[contains(text(),'Archived Blueprints')]/..", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var cNode = cs.iterateNext();

	var cs = document.evaluate("//a[contains(text(), 'Archived Blueprints')]/../.. | //a[contains(text(), 'Archived Blueprints')]/../following-sibling::*[2]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var aNode = cs.iterateNext();
	var bNode = cs.iterateNext();

	var par = document.createElement("p");
	var but = document.createElement("input");
	but.type = "button";
	but.value = "Hide Unnamed";
	but.setAttribute("onclick","GM_wfbp_hideNamed(this)");

	par.appendChild(but);
	var hnibut = but;

	aNode.insertBefore(par, bNode);

	// In progress -- toggleBoxes is not working...
	cNode.appendChild(document.createElement("br"));
	but = document.createElement("input");
	but.type = "button";
	but.value = "Toggle Delete Unnamed";
	but.setAttribute("onclick","GM_wfbp_toggleBoxes()");

	cNode.appendChild(but);
	cNode.appendChild(document.createElement("br"));

	unsafeWindow.GM_wfbp_hideNamed(hnibut);
}

window.doProcessing = function(processing, node) {
  var bp = node.cells[1].getElementsByTagName('table')[0];

	// Look for NR
	var ores = node.cells[2].getElementsByTagName('table')[0];
	var orec = 0;
	//var numores = 11;
	//if (instance == "test") numores = 8
	for (var i = 1; i < ores.rows.length-1; i++)
	{
		var orenum = ores.rows[i].cells[1].childNodes[0];
		while (orenum.nodeName != "#text") orenum = orenum.childNodes[0];
		orec += parseInt(orenum.nodeValue.replace(/,/g,""),10);
	}
	if (orec == 0) ores.style.backgroundColor = '#717100';

	switch (processing) {

		case "Empire Administration":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);

			var ntr = document.createElement('tr');
			var ntd1 = document.createElement('td');
			var ntd2 = document.createElement('td');
			ntd1.innerHTML = "Corruption:";
			ntd2.innerHTML = Math.ceil(workers * effic * 0.05 * 100) / 100;
			ntd2.innerHTML += "%";
			ntr.appendChild(ntd1);
			ntr.appendChild(ntd2);
			bp.appendChild(ntr);

			addANode(node, "Upkeep", workers * effic * 1000);
			addCosts(node, workers * effic * 0.05, "Cost / % Corruption");
			break;

		case "Mall":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);

			var ntr = document.createElement('tr');
			var ntd1 = document.createElement('td');
			var ntd2 = document.createElement('td');
			ntd1.innerHTML = "People Served:";
			ntd2.innerHTML = Math.ceil(workers * effic * 40 / 100);
			ntr.appendChild(ntd1);
			ntr.appendChild(ntd2);
			bp.appendChild(ntr);
			addCosts(node, workers * effic / 100, "Cost / Eff Worker");
			break;

		case "Entertainment Facility":
		case "Hospital":
		case "Police Station":
		case "School":
		case "Copper Mine":
		case "Diamond Mine":
		case "Drilling Rig":
		case "Farm":
		case "Gold Mine":
		case "Iron Mine":
		case "Platinum Mine":
		case "Silver Mine":
		case "Titanium Mine":
		case "Uranium Mine":
		case "Well":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, workers * effic / 100, "Cost / Eff Worker");
			break;
    case "Research Facility":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			//var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, workers, "Cost / Worker");
			break;
		case "Terraformer":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, workers * effic / 100, "Cost / Eff Worker");
			break;

		case "Battleship Hull":
		case "Bomber Hull":
		case "Corvette Hull":
		case "Destroyer Hull":
		case "Troop Transport":
			var cannons = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, cannons, "Cost / Cannon");
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Layout / Cannon", Math.ceil(layout / cannons*100)/100);
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Carrier Hull":
			var fighter = parseInt(bp.rows[3].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, fighter, "Cost / Fighter");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Colony Ship Hull":
		case "Genesis Hull":
			var colonist = parseInt(bp.rows[5].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, colonist, "Cost / Colonist");
			var eng   = parseFloat(bp.rows[9].cells[1].innerHTML.replace(/,/g,""));
			var mass  = parseFloat(bp.rows[10].cells[1].innerHTML.replace(/,/g,""));
			var layout = parseFloat(bp.rows[8].cells[1].innerHTML.replace(/,/g,""));
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Command Frigate Hull":
		case "High Stability Sphere Hull":
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, layout/1000, "Cost / 1k Layout");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Crimson Gunboat":
			var cannons = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, cannons, "Cost / Cannon");
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Layout / Cannon", Math.ceil(layout / cannons*100)/100);
			var guns = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, guns, "Cost / Gun");
			addANode(node, "Layout / Gun", Math.ceil(layout / guns * 100)/100);
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Crimson Cruiser":
		case "Fighter Hull":
			var guns = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, guns, "Cost / Gun");
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Layout / Gun", Math.ceil(layout / guns * 100)/100);
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Space Station Hull":
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, layout/1000, "Cost / 1k Layout");
			var transp = parseInt(bp.rows[4].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, transp/1000, "Cost / 1k Transport");
			break;
		case "Transport Hull":
			var transp = parseInt(bp.rows[4].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, transp/1000, "Cost / 1k Transport");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;

		case "Cannon":
		case "Gun Battery":
		case "Single Barrel Gun":
			var damage = parseFloat(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var rate = bp.rows[1].cells[1].innerHTML.replace(/,/g,"");
			var rate1 = parseInt(rate, 10);
			var rate2 = parseInt(rate.substr(rate.indexOf('.')+1), 10);
			rate = rate1 + rate2 / 100;
			var mass = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Dmg / 1000kg", Math.ceil(damage * rate / mass * 100*1000) / 100);
			addCosts(node, Math.ceil(damage * rate / mass * 100*1000) / 100, "Cost / Dmg");
			break;

		case "Anti Matter Drive":
		case "Capital Ship Drive":
		case "Small Vessel Drive":
			var power = parseFloat(bp.rows[0].cells[1].innerHTML.replace(/,/g,""));
			var eff   = parseFloat(bp.rows[1].cells[1].innerHTML.replace(/,/g,""));
			var mass  = parseFloat(bp.rows[2].cells[1].innerHTML.replace(/,/g,""));
			addANode(node, "Power / Mass", Math.ceil(power / mass * 1000));
			addANode(node, "Eff / Mass", Math.ceil(eff / mass * 1000));
			break;

		case "Armor Plating":
			var armor = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var stab   = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			var mass  = parseInt(bp.rows[3].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Armor / Mass", Math.ceil(armor * stab * 1000 / 100 / mass ));
			addCosts(node, armor * stab / 100, "Cost / Armor");
			break;
		case "Energy Shield":
			var shield = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			var stab   = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			var mass  = parseInt(bp.rows[3].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Shield / Mass", Math.ceil(shield * stab * 1000 / 100 / mass * 1000) / 1000);
			addCosts(node, shield * stab / 100, "Cost / Shield");
			break;

		case "AA Battery":
		case "Guided Missile Launcher":
			var damage = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var rate = bp.rows[1].cells[1].innerHTML.replace(/,/g,"");
			var rate1 = parseInt(rate, 10);
			var rate2 = parseInt(rate.substr(rate.indexOf('.')+1), 10);
			rate = rate1 + rate2 / 100;
			var mass = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Damage", Math.ceil(damage * rate * 100) / 100);
			addCosts(node, Math.ceil(damage * rate * 100) / 100, "Cost / Dmg");
			break;
	}
}

window.addANode = function(node, tag, val) {
	var bp = node.cells[1].getElementsByTagName('table')[0];
	var nval = "";
	val = val.toString();
	if (Number(val) != Number.NaN)
	{
		if (val.indexOf(".") != -1)
		{
			nval = val.substr(val.indexOf("."));
			val = val.substr(0, val.indexOf("."));
		}
		while (val.length > 0)
		{
			nval = val.length < 3 ? val + nval : val.substr(val.length-3) + nval;
			val = val.substr(0, val.length-3);
			if (val.length > 0) nval = "," + nval;
		}
	} else {
		nval = val;
	}
	ntr = document.createElement('tr');
	ntd1 = document.createElement('td');
	ntd2 = document.createElement('td');
	ntd1.appendChild(document.createTextNode(tag));
	ntd2.appendChild(document.createTextNode(nval));
	ntr.appendChild(ntd1);
	ntr.appendChild(ntd2);
	bp.appendChild(ntr);
}

window.addCosts = function(node, workers, tag) {
	var bp = node.cells[1].getElementsByTagName('table')[0];
	var cost = node.cells[2].getElementsByTagName('table')[0].rows[0].cells[1].childNodes[0];
	while (cost.nodeName != "#text") cost = cost.childNodes[0];
	cost = parseInt(cost.nodeValue.replace(/,/g,""),10);
	cost = Math.ceil(cost / workers) + "";
	var ncost = "";
	if (cost.indexOf(".") != -1)
	{
		ncost = cost.substr(cost.indexOf("."));
		cost = cost.substr(0, cost.indexOf(".") - 1);
	}
	while (cost.length > 0)
	{
		ncost = cost.length < 3 ? cost + ncost : cost.substr(cost.length-3) + ncost;
		cost = cost.substr(0, cost.length-3);
		if (cost.length > 0) ncost = "," + ncost;
	}
	ntr = document.createElement('tr');
	ntd1 = document.createElement('td');
	ntd2 = document.createElement('td');
	ntd1.appendChild(document.createTextNode(tag));
	ntd2.appendChild(document.createTextNode(ncost + " cr"));
	ntr.appendChild(ntd1);
	ntr.appendChild(ntd2);
	bp.appendChild(ntr);
}

window.fullmod_onBuildFacilityLoad = function(e) {
	var doc = centerBox.getElementsByTagName('table')[0];
	var mod = centerBox;
	var part = mod.getElementsByTagName('p')[0];
	if (part.innerHTML.indexOf('acknowledged') != -1) part = mod.getElementsByTagName('p')[1];
	// Grab Planet ID
	var pid = part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*colony=(\d+).*$/m,"$1"); //
	var i = 1;
	var processing = "";
	while (i < doc.rows.length)
	{
		if (doc.rows[i].cells[1].childNodes[0].nodeName == "B")
		{
			processing = doc.rows[i].cells[1].childNodes[0].childNodes[0].innerHTML;
		} else {
			var orelist = doc.rows[i].cells[2].childNodes[0];
			for (var ore = 1; ore < orelist.rows.length - 1; ore++)
			{
				var mine = orelist.rows[ore].cells[0].innerHTML;
				var newlink = document.createElement('a');
				var theurl = "http://" + instance + ".war-facts.com/build_facility.php?type=1&colony=" + pid + "&subtype=" + ore;
				newlink.setAttribute("href", theurl);
				newlink.appendChild(document.createTextNode(mine));
				orelist.rows[ore].cells[0].replaceChild(newlink, orelist.rows[ore].cells[0].firstChild);
			}
			doProcessing(processing, doc.rows[i]);
		}
		i++;
	}
}

window.GM_wfcm_replaceCommas = function(s) {
	return parseInt(s.replace(/,/g,"").replace(/%/g,""),10);
}

var thisPID = -1;

WF_wfcm_setMall = function()
{
	var cm = gMallEff;
	if (confirm("Malls currently set to " + cm + " effective workers. Change?"))
	{
		var meff;
		var mwrk;
		if (mwrk = parseInt(prompt("Enter number of mall workers"),10))
		{
			if (meff = parseInt(prompt("Enter mall efficiency in percent"), 10))
			{
				if (confirm("Set Malls to " + mwrk + " workers at " + meff + "% efficiency and reload?"))
				{
					GM_wfcm_setMallData(mwrk * meff / 100);
					window.location.reload(true);
				}
			}
		}
	}
};
WF_wfcm_setFarm = function()
{
	var cm = gFarmEff;
	if (confirm("Farms currently set to " + cm + " effective workers. Change?"))
	{
		var meff;
		var mwrk;
		if (mwrk = parseInt(prompt("Enter number of farm workers"),10))
		{
			if (meff = parseInt(prompt("Enter farm efficiency in percent"), 10))
			{
				if (confirm("Set Farms to " + mwrk + " workers at " + meff + "% efficiency and reload?"))
				{
					GM_wfcm_setFarmData(mwrk * meff / 100);
					window.location.reload(true);
				}
			}
		}
	}
}
WF_wfcm_clearFert = function()
{
	var pid = thisPID;
	var tFert = GM_wfcm_getFertData(pid);
	if (tFert == -1) {
		tFert = "nothing";
	} else {
		tFert = tFert + "%";
	}
	if (confirm("Do you really want to clear the saved fertilization data for this planet?\n(Currently set to " + tFert + ")"))
	{
		GM_wfcm_clearFertData(pid);
		window.location.reload(true);
	}
}


window.fullmod_onViewColonyLoad = function(e) {
	var gTemp;
	/*
	if (gTemp = GM_getValue(instance + 'mall')) {
		gMallEff = parseFloat(gTemp);		
	} else {
		gMallEff = 1;
	}
	if (gTemp = GM_getValue(instance + 'farm')) {
		gFarmEff = parseFloat(gTemp);
	} else  {
		gFarmEff = 1;
	}
	*/
	// Get to the middle table
	var mod = centerBox;

	// Get to the top text area
	var part = mod.getElementsByTagName('p')[0];
	// Grab Planet ID
	var pid = part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*planet=(\d+)'\).*$/m,"$1"); //'
	thisPID = pid;	
	part = part.nextSibling;
	part = part.nextSibling;

	// Stop and grab colony ID and planet ID for later
	var col = part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*colony=(\d+)">.*$/m,"$1"); //"

	// Continue
	var toptext = part.childNodes[0].innerHTML;
	toptext = toptext + "| <a href=\"/build_facility.php?colony=" + col + "&type=1\">Resources</a> ";
	toptext = toptext + "| <a href=\"/build_facility.php?colony=" + col + "&type=3\">Institutions</a> ";
	toptext = toptext + "| <a href=\"/build_facility.php?colony=" + col + "&type=8\">Defenses</a> ";
	toptext = toptext + "| <a href=\"/demolish_building.php?colony=" + col + "&type=8\">Demolish</a>";
  part.childNodes[0].innerHTML = toptext;

  // Move on to the table
	mod = mod.getElementsByTagName('form')[0];
	var mainTable = mod.getElementsByTagName('table')[0];
	var topMainTableEnd = mainTable.rows[13];

	// Grab data from the table
	part = mainTable.rows[3].cells[1];
	var pop = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	var popg = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*\((.*)\).*$/m,"$1"));
	part = mainTable.rows[3].cells[3];
	var size = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	var sizeg = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*\(.*([\+-][,\d]+).*<.*km.*$/m,"$1"));
	part = mainTable.rows[14].cells[1];
	if (instance == "test") part = mainTable.rows[15].cells[1];
	var usedStorage = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	var storage = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*\/\s([,\d]+)\s.*$/m,"$1"));
	part = mainTable.rows[11].cells[3];
	if (instance == "test") part = mainTable.rows[12].cells[3];
	var income = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	part = mainTable.rows[11].cells[1];
	if (instance == "test") part = mainTable.rows[12].cells[1];
	var flwages = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*value=\"(\d+)\".*$/m,"$1"));
	if (usedStorage / storage > gStorageAlert)
	{
		part = mainTable.rows[14].cells[0];
		if (instance == "test") part = mainTable.rows[15].cells[0];
		part.innerHTML = "<font color=\"red\">" + part.innerHTML + "</font>";
	}
	part = mainTable.rows[15].cells[3];
	if (instance == "test") part = mainTable.rows[21].cells[1];
	var food = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	var popt = pop;
	// Do calculations
	var toBuy = 0;
	var toDem = "";
	percent = 0;
	var ppm = Math.round(pop / size * 100) / 100;
	var ppmg= Math.round(popg / sizeg * 100) / 100;

  toBuy = Math.ceil(popt * gMallWorkerFraction / gMallEff);

	var ppm = Math.round(pop / size * 100) / 100;
	var ppmg= Math.round(popg / sizeg * 100) / 100;

	if (instance != "test") {
		mainTable.rows[7].cells[2].innerHTML = 'Growth:';
  	mainTable.rows[7].cells[3].innerHTML = Math.round(popg / sizeg * 1000) / 1000;
  }


	unsafeWindow.GM_wfcm_checkMalls = function(colny)
	{
		var oldout = mainTable.rows[2].cells[0];
		var mallarea = document.getElementById('malls');
		while (mallarea.firstChild) {
  		mallarea.removeChild(mallarea.firstChild);
		}
		var tempo = document.createTextNode('**Please Wait**');
		mallarea.appendChild(tempo);
		req = new XMLHttpRequest();
    req.open("GET", "http://" + instance + ".war-facts.com/extras/colony_buildings.php?colony=" + colny, true);
    req.send(null);
    req.onreadystatechange = function()
    {
    	if (req.readyState == 4) {
		  	if (req.status == 200) {
					page = req.responseText;
					page = page.substring(page.indexOf("<b>Mall</u></b>"));
					page = page.substring(0, page.indexOf("</table>"));
					page = page.substring(page.indexOf("<td>")+4);
					page = page.substring(page.indexOf("<td>")+4);
					var mwork = parseInt(GM_wfcm_replaceCommas(page));
					page = page.substring(page.indexOf("<td>")+4);
					page = page.substring(page.indexOf("<td>")+4);
					var meff = parseInt(GM_wfcm_replaceCommas(page));
					page = page.substring(page.indexOf('Buildings')+9);
					page = page.substring(page.indexOf("<td>")+4);
					var bldgs = parseInt(GM_wfcm_replaceCommas(page));
					if (isNaN(mwork)) mwork = 0;
					if (isNaN(meff)) meff = 0;
					if (isNaN(bldgs)) bldgs = 0;

					percent = Math.round(mwork * meff / 100.0 / popt * 1000000) / 10000;
					toBuy = Math.ceil((popt * (gMallWorkerFraction - percent/100)) / gMallEff);
					if (toBuy < 0) toBuy = 0;

					while (mallarea.firstChild) {
  					mallarea.removeChild(mallarea.firstChild);
					}
					var toDem = document.createTextNode('');
					var origEff = meff/100 * mwork / bldgs;
					if (origEff < gMallRebuild * gMallEff) {
						toDem = document.createElement('a');
						toDem.setAttribute("href", "http://" + instance + ".war-facts.com/demolish_building.php?colony=" + col + "&type=8");
						toDem.appendChild(document.createTextNode('DEM'));
					}
					var tempa = document.createElement('a');

					tempa.setAttribute("href", "http://" + instance + ".war-facts.com/build_facility.php?colony=" + col + "&type=3&subtype=8");
					var malltemp = percent + '%';
					if (toBuy == 0)
						malltemp += ' Perfect';
					else
						malltemp += ' Buy ' + toBuy;
					tempa.appendChild(document.createTextNode(malltemp));
					var pnode = mallarea.parentNode;
					pnode.replaceChild(tempa, mallarea);
					pnode.insertBefore(toDem, tempa.nextSibling);
				} else {
					while (mallarea.firstChild) {
  					mallarea.removeChild(mallarea.firstChild);
					}
					tempo = document.createTextNode('Failed!');
					mallarea.appendChild(tempo);
				}
			}
    }
	}

	// Write Output
	var nnrow = document.createElement('tr');
	var nncol = document.createElement('td');
	nncol.setAttribute("class", "strong");
	nncol.appendChild(document.createTextNode('Malls:'));
	nnrow.appendChild(nncol);

	nncol = document.createElement('td');
	nncol.setAttribute("class", "strong");
	var nnode = document.createElement('a');
	nnode.setAttribute("href", "javascript:GM_wfcm_checkMalls(" + col + ")");
	nnode.setAttribute("id", "malls");
	nnode.appendChild(document.createTextNode(toBuy + " total needed"));
	nncol.appendChild(nnode);
	nnrow.appendChild(nncol);

	// Do Farms
	farms = "Good";
	if (food * 10 < pop)
	{
		farms = "(*retrieving*)";
	}

	nncol = document.createElement('td');
	nncol.setAttribute("class", "strong");
	nncol.appendChild(document.createTextNode('Farms:'));
	nnrow.appendChild(nncol);

	nncol = document.createElement('td');
	nncol.setAttribute("class", "strong");
	nnode = document.createElement('a');
	nnode.setAttribute("href", "build_facility.php?colony=" + col + "&type=1&subtype=11");
	nnode.appendChild(document.createTextNode(farms));
	nncol.appendChild(nnode);
	nnrow.appendChild(nncol);

	// Add income calculation and configuration
	newLine = document.createElement("tr");
	newCols = document.createElement("td");
	var newFont = document.createElement("font");
	newFont.setAttribute("color", "#B3C0B3");
	newFont.appendChild(document.createTextNode('Colony Mod'));
	newCols.appendChild(newFont);
	newCols.setAttribute("align","center");
	newCols.setAttribute("colspan","1");
	newCols.setAttribute("class","head");
	newLine.appendChild(newCols);

	var incpop = Math.ceil(income / pop * 100) / 100;
	newCols = document.createElement("td");
	newCols.appendChild(document.createTextNode('Income/Pop: ' + incpop));
	newCols.setAttribute("align","center");
	newCols.setAttribute("colspan","1");
	newCols.setAttribute("class","head");
	newLine.appendChild(newCols);

	var aa = document.createElement("a");
	aa.setAttribute("href", "#");
	//aa.setAttribute("href", "javascript:WF_wfcm_setMall(" + gMallEff + ");");
	aa.addEventListener('click', WF_wfcm_setMall, true);
	aa.appendChild(document.createTextNode('Set Mall'));
	newCols = document.createElement("td");
	newCols.appendChild(aa);
	newCols.setAttribute("align","center");
	newCols.setAttribute("colspan","1");
	newCols.setAttribute("class","head");
	newLine.appendChild(newCols);
	var aa = document.createElement("a");
	aa.setAttribute("href", "#");
	//aa.setAttribute("href", "javascript:WF_wfcm_setFarm(" + gFarmEff + ");");
	aa.addEventListener('click', WF_wfcm_setFarm, true);
	aa.appendChild(document.createTextNode('Set Farm'));
	newCols = document.createElement("td");
	newCols.appendChild(aa);
	newCols.appendChild(document.createTextNode(" / "));
	aa = document.createElement("a");
	aa.setAttribute("href", "#");
	//aa.setAttribute("href", "javascript:WF_wfcm_clearFert(" + pid + ");");
	aa.addEventListener('click', WF_wfcm_clearFert, true);
	aa.appendChild(document.createTextNode('Clear Fert'));
	newCols.appendChild(aa);
	newCols.setAttribute("align","center");
	newCols.setAttribute("colspan","1");
	newCols.setAttribute("class","head");
	newLine.appendChild(newCols);
	mainTable.childNodes[1].insertBefore(newLine, topMainTableEnd);
	mainTable.childNodes[1].insertBefore(nnrow, topMainTableEnd);

	// add links to buildings
	for (rw = 3; rw < 22; rw++)
	{
		for (cl = 0; cl < 4; cl+=2)
		{
			if (mainTable.rows[rw].cells[cl])
			{
				var ore = mainTable.rows[rw].cells[cl].innerHTML;
				var nore = document.createElement('a');
				var doIt = true;
				switch (ore)
				{
					case "Water:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=10');
						break;
					case "Food:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=11');
						break;
					case "Iron:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=1');
						break;
					case "Copper:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=2');
						break;
					case "Silver:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=3');
						break;
					case "Gold:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=5');
						break;
					case "Platinum:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=7');
						break;
					case "Diamonds:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=8');
						break;
					case "Titanium:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=4');
						break;
					case "Uranium:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=6');
						break;
					case "Oil:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=1&subtype=9');
						break;
					case "Happiness:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=3&subtype=1');
						break;
					case "Education:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=3&subtype=2');
						break;
					case "Sick People:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=3&subtype=3');
						break;
					case "Crime:":
						nore.setAttribute('href', 'build_facility.php?colony=' + col + '&type=3&subtype=4');
						break;
					default:
						doIt = false;
						break;
				}
				if (doIt)
				{
					mainTable.rows[rw].cells[cl].innerHTML = "";
					nore.appendChild(document.createTextNode(ore));
					mainTable.rows[rw].cells[cl].appendChild(nore);
				}
			}
		}
	}

	if (food * 10 < pop)
	{
		var fert = GM_getValue(instance + 'planet' + pid, -1);
		if (fert == -1)
		{
			GM_setValue(instance + 'lookupPlanet', pid);
			GM_setValue(instance + 'lookupPop', pop);
			GM_setValue(instance + 'lookupFood', food);
			setTimeout(getFertilization, 10);
		} else {
			var temp = (pop/10 - food);
			var fpct = gFarmEff * Math.sqrt(fert);
			var need = Math.ceil(temp / fpct * 10) / 10;
			var repl = centerBox.getElementsByTagName('form')[0].getElementsByTagName('table')[0];
			repl.innerHTML = repl.innerHTML.replace(/\(\*retrieving\*\)/m,need + " needed");
		}
	}
}

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments, 1)));
  };
}

function GM_wfcm_setMallData(mdat) {
	GM_setValue(instance + 'mall',String(mdat));
}
function GM_wfcm_setFarmData(fdat) {
	GM_setValue(instance + 'farm',String(fdat));
}
function GM_wfcm_clearFertData(pid) {
	GM_setValue(instance + 'planet' + pid, -1);
}
function GM_wfcm_getFertData(pid) {
	return GM_getValue(instance + 'planet' + pid, -1);
}

function getFertilizationLoaded(response) {
	var resp = response.responseText;

	resp = resp.substr(resp.indexOf('Fertilization'));
	resp = resp.substr(resp.indexOf('percent')+3);
	resp = resp.substr(resp.indexOf('>')+1);
	var fert = parseInt(resp.substr(0, resp.indexOf('%')),10);
	var pop  = GM_getValue(instance + 'lookupPop');
	var food = GM_getValue(instance + 'lookupFood');
	var pid  = GM_getValue(instance + 'lookupPlanet');

	GM_setValue(instance + "planet" + pid, fert);
	var temp = (pop/10 - food);
	var fpct = gFarmEff * Math.sqrt(fert);
	var need = Math.ceil(temp / fpct * 10) / 10;
	var repl = centerBox.getElementsByTagName('form')[0].getElementsByTagName('table')[0];
	//var repl = document.body.childNodes[3].rows[0].cells[1].getElementsByTagName('form')[0].getElementsByTagName('table')[0];
	repl.innerHTML = repl.innerHTML.replace(/\(\*retrieving\*\)/m,need + " needed");
}

function getFertilizationFailed(response) {
}

function getFertilization() {
	GM_xmlhttpRequest({
    method:"GET",
    url:"http://" + instance + ".war-facts.com/extras/view_planet.php?planet=" + GM_getValue(instance + 'lookupPlanet'),
    onload:getFertilizationLoaded,
    onerror:getFertilizationFailed
  });
}

window.fullmod_onEHNavLoad = function(e) {
	var isExplorer = document.evaluate("//text()[contains(.,'Classification: Explorer') or contains(.,'Classification: Sentry') or contains(.,'Classification: Probe Rush') or contains(.,'Classification: Outcast Explorer')]", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;

	var formIter = document.evaluate("//form[@name='form2']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var formNode = formIter.iterateNext();

	var localLocs, llSelect, locIndex;
	if (formNode)
	{
		localLocs = document.evaluate("//select[@name='tworld2']", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		llSelect = localLocs.iterateNext();
	} else {
		formNode = document; // suppress error messages due to bad code structuring
	}
	locIndex = 1;
	var tFleetNo = document.evaluate("//input[@name='fleet']", formNode, null, XPathResult.ANY_TYPE, null);
	var temp = tFleetNo.iterateNext();
	var fleetNo;
	if (temp) fleetNo = temp['value'];
	if(llSelect) {
		var curPos = document.evaluate("//td[(child::text() = 'Fleet Position:')]/following-sibling::node()[position()=2]/child::node()", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

		while( cNode = curPos.iterateNext() )
		{
			if(cNode.textContent.match(/^\s+$/)) continue;

			for(i = 0; i < llSelect.options.length; i++) {
				if(cNode.textContent.indexOf(llSelect.options[i].text)==0) {
					locIndex = i;
					break;
				}
			}
			break;
		}
	}

	var curCoord = document.evaluate("//td[(child::text() = 'Fleet Coordinates:')]/following-sibling::node()/a[contains(text(),'global')]", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var cNode = curCoord.iterateNext();
	var newHref;
	if (cNode) {
		//GM_log("coord '"+cNode.href+"' "+cNode.textContent+" name:"+cNode.nodeName+" value:"+cNode.nodeValue);
		var z = Number(cNode.href.match("z=(-?[0-9]+)")[1]);

		/* Extra z-offset */
		newHref = cNode.href.replace(z, z + 6000);
		//GM_log(newHref);

		var ws1 = document.createTextNode(" ");

		var newA = document.createElement("a");
		newA.setAttribute("href", newHref);
		var aText = document.createTextNode("^^^");
		newA.appendChild(aText);

		var parent = cNode.parentNode;
		var after = cNode.nextSibling;

		parent.insertBefore(ws1, after);
		parent.insertBefore(newA, after);
	}

	if(llSelect && isExplorer) {
		var nextBtn = document.createElement("input");
		nextBtn.setAttribute("type","button");
		if(locIndex < llSelect.options.length - 1) {
			nextBtn.setAttribute("value","Next");
			//alert(fleetNo);
			if (locIndex == 1 && (fleetNo))
			{
				nextBtn.setAttribute("onclick","this.previousSibling.selectedIndex = "+(locIndex+1)+"; scrollext('/extras/scan.php?fleet="+fleetNo+"'); document.forms['form2'].submit();");
			} else {
				nextBtn.setAttribute("onclick","this.previousSibling.selectedIndex = "+(locIndex+1)+"; document.forms['form2'].submit();");
			}
		} else {
			nextBtn.setAttribute("value","Done");
			nextBtn.setAttribute("class","warn");
			nextBtn.setAttribute("onclick",newHref.replace("^javascript:",""));
		}
		llSelect.parentNode.appendChild(nextBtn);
	}
	window.fullmod_onEHLogLoad(null);
}

window.fullmod_onEHLogLoad = function(e) {
/*
	unsafeWindow.GM_wfscout_open = function(e) {

    var replaced = false;
		var xpath = "//span[@id='Explorermen' or @id='OutcastExplorermen']/table/tbody/tr//td/a[contains(@href,'fleet_navigation') and not(contains(@style,'color'))]";
		var findExp = ExploreOrder.split(',');
		var expl = 0;
		while (!replaced && expl < findExp.length) {
		  var xpath2 = xpath + "/text()[contains(.,'" + findExp[expl] + "')]/parent::*";
		  //alert(xpath2);
  		var probes = document.evaluate(xpath2, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  		probe = probes.iterateNext();
  		if (probe)
  		{
  			location.replace(probe);
  			replaced = true;
  		}
  		expl++;
  	}
		if (!replaced) location.replace('starlog.php');
	}

	var exp = document.evaluate("//a[contains(@href,\"listfleets('Explorer')\") or contains(@href,\"listfleets('OutcastExplorer')\") or contains(@href,\"listfleets('Sentry')\")]/..", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var tdNode = exp.iterateNext();

	var newA = document.createElement("input");
	newA.setAttribute("onclick", "GM_wfscout_open(); return false;");
	newA.value = ">>>";
	newA.type = "button";

	tdNode.appendChild(document.createTextNode(" "));
	tdNode.appendChild(newA);
*/
}

window.fullmod_onViewColonyExtendedLoad = function(e) {
	var mod = document.evaluate("//strong/text()[contains(.,'Buildings')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var imod = mod.iterateNext();
	if (imod)
	{
		var tbl = imod.parentNode.parentNode.parentNode.parentNode.parentNode;
		var workcountcell = tbl.rows[1].cells[1];

		var i;
		var meffwork;
		var allworkers = 0;
		for (i = 3; i < tbl.rows.length; i++)
		{
			var bnamecell = tbl.rows[i].cells[0];
			var binfocell = tbl.rows[i].cells[1].getElementsByTagName('table')[0];
			if (bnamecell.childNodes[0].innerHTML != 'AA Battery' && bnamecell.childNodes[0].innerHTML != 'Guided Missile Launcher')
			{
				var workers = GM_wfcm_replaceCommas(binfocell.rows[0].cells[1].innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
				var effic = GM_wfcm_replaceCommas(binfocell.rows[1].cells[1].innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
				var effwork = workers * effic / 100;
				allworkers += workers;
				if (bnamecell.childNodes[0].innerHTML == 'Mall')
				{
					meffwork = effwork;
				}
				var nrow = document.createElement("tr");
				var ncol1 = document.createElement("td");
				var ncol2 = document.createElement("td");
				var lbl = document.createTextNode("Effective Workers:");
				ncol1.appendChild(lbl);
				lbl = document.createTextNode(effwork);
				ncol2.appendChild(lbl);
				nrow.appendChild(ncol1);
				nrow.appendChild(ncol2);
				//alert(binfocell.childNodes[0].innerHTML);
				binfocell.getElementsByTagName('tbody')[0].appendChild(nrow);
			}
		}
		if (isNaN(meffwork)) meffwork = 0;
		var workcount = document.createTextNode(allworkers);
		workcountcell.appendChild(workcount);
		var nrow = document.createElement("tr");
		var ncol1 = document.createElement("td");
		var ncol2 = document.createElement("td");
		ncol1.setAttribute('class', 'strong');
		ncol2.setAttribute('class', 'strong');
		var lbl = document.createTextNode("Effective Mall Workers:");
		var lblb = document.createElement('strong');
		lblb.appendChild(lbl);
		ncol1.appendChild(lblb);
		lbl = document.createTextNode(meffwork + ' (Covers ' + meffwork / gMallWorkerFraction + ' pop)');
		ncol2.appendChild(lbl);
		nrow.appendChild(ncol1);
		nrow.appendChild(ncol2);
		tbl.getElementsByTagName('tbody')[0].insertBefore(nrow, tbl.getElementsByTagName('tbody')[0].rows[1]);
	}
}

/*window.fullmod_onScienceLoad = function(e) {
	unsafeWindow.callNowTime();
	var gameTime = document.getElementById('gametime').innerHTML;
	var sciTbl = centerBox.getElementsByTagName('table')[1];
	for (var i = 1; i < sciTbl.rows.length; i++)
	{
		var starttime = sciTbl.rows[i].cells[0].childNodes[6].innerHTML;
		var insertafter = sciTbl.rows[i].cells[0].childNodes[7];
		var nnode = document.createElement('span');
		nnode.appendChild(timediff('Elapsed:', gameTime,starttime));
		sciTbl.rows[i].cells[0].insertBefore(document.createElement('br'), insertafter);
		sciTbl.rows[i].cells[0].insertBefore(nnode, insertafter);
	}
}*/

window.fullmod_onColonyBuild = function(e) {
	var mod = centerBox;
	var part = mod.getElementsByTagName('p')[0];
	if (part.innerHTML.indexOf('acknowledged') != -1) part = mod.getElementsByTagName('p')[1];
	// Grab Planet ID
	var pid = part.innerHTML.replace(/[\r\n]/g,"").replace(/^.*planet=(\d+)'\).*$/m,"$1"); //'
	var doc = centerBox.getElementsByTagName('table')[0];
	if (doc.rows[1])
	{
		var newplace = doc.rows[1].cells[2];
		var otype = doc.rows[1].cells[1].firstChild.firstChild.innerHTML;
		switch (otype)
		{
			case 'Copper Mine':
				otype = 'Copper:';
				break;
			case 'Diamond Mine':
				otype = 'Carbon:';
				break;
			case 'Drilling Rig':
				otype = 'Oil:';
				break;
			case 'Farm':
				otype = 'Fertilization:';
				break;
			case 'Gold Mine':
				otype = 'Gold:';
				break;
			case 'Iron Mine':
				otype = 'Iron:';
				break;
			case 'Platinum Mine':
				otype = 'Platinum:';
				break;
			case 'Silver Mine':
				otype = 'Silver:';
				break;
			case 'Titanium Mine':
				otype = 'Titanium:';
				break;
			case 'Uranium Mine':
				otype = 'Uranium:';
				break;
			case 'Well':
				otype = 'Water:';
				break;
			default:
				otype = '';
				break;
		}
		if (otype != '')
		{
			while (newplace.firstChild) newplace.removeChild(newplace.firstChild);
			newplace.appendChild(document.createTextNode("/ Getting planet info \\"));
			var round = 0;
			var done = false;
			function moveInfo()
			{
				if (!done)
				{
					var np;
					switch (round)
					{
						case 0:
							np = "- Getting planet info -";
							break;
						case 1:
							np = "\\ Getting planet info /";
							break;
						case 2:
							np = "| Getting planet info |";
							break;
						case 3:
							np = "/ Getting planet info \\";
							break;
					}
					round++; round %= 4;
					while (newplace.firstChild) newplace.removeChild(newplace.firstChild);
					newplace.appendChild(document.createTextNode(np));
					if (!done) setTimeout(moveInfo, 50);
				}
			}
			function getPlanetInfo()
			{
				GM_xmlhttpRequest({
		        method:"GET",
		        url:'http://' + instance + '.war-facts.com/extras/view_planet.php?planet=' + pid,
		        onload:getPlanetLoaded,
		        onerror:getPlanetFail
		    });
		    function getPlanetFail(resp)
		    {
		    	done = true;
		    	while (newplace.firstChild) newplace.removeChild(newplace.firstChild);
		    	newplace.appendChild(document.createTextNode('Failed!'));
		    }
		    function getPlanetLoaded(resp)
		    {
		    	done = true;
		    	resp = resp.responseText;
		    	resp = resp.substr(resp.indexOf(otype));
		    	resp = resp.substr(resp.indexOf('percent')+3);
		    	resp = window.GM_wfcm_replaceCommas(resp.substr(resp.indexOf('>')+1));
		    	while (newplace.firstChild) newplace.removeChild(newplace.firstChild);
		    	var nnn;
		    	if (resp == "0")
					{
		    		nnn = document.createElement('font');
		    		nnn2 = document.createElement('b');
		    		nnn.setAttribute("color", "red");
		    		nnn2.appendChild(document.createTextNode(otype + ' ' + resp + '%'));
		    		nnn.appendChild(nnn2);
		    	} else {
		    		nnn = document.createTextNode(otype + ' ' + resp + '%');
		    	}
		    	newplace.appendChild(nnn);
		    }
			}
			setTimeout(moveInfo, 10);
			setTimeout(getPlanetInfo, 100);
		}
	}
}

function addLink(txt, ref)
{
	var lnk = document.createElement('a');
	lnk.href = ref;
	lnk.target = "_new";
	lnk.appendChild(document.createTextNode(txt));
	return lnk;
}

window.fullmod_onColonyOverview = function(e) {
	if (document.body.innerHTML.indexOf("Set Local Laws for all Colonies") != -1)
	{
	  var mod = centerBox.getElementsByTagName("table")[0];
	  var alertcount = 0;
	  var insBef = mod.rows[2];
	  var showAlerts = new Array();

	  for (var i = 3; i < mod.rows.length - 1; i++)
	  {
	  	var colnum = mod.rows[i].cells[0].firstChild.firstChild.href;
			colnum = colnum.substr(colnum.indexOf('=')+1);

	  	var nrow = document.createElement('tr');
	  	var ncol = document.createElement('td');
	  	ncol.appendChild(addLink(mod.rows[i].cells[0].firstChild.firstChild.firstChild.nodeValue,"/view_colony.php?colony=" + colnum));
	  	ncol.setAttribute("class", "head");
	  	ncol.setAttribute("align", "right");
	  	nrow.appendChild(ncol);
	  	ncol = document.createElement('td');
	  	ncol.setAttribute("colspan", "2");
	  	ncol.setAttribute("class", "head");
	  	nrow.appendChild(ncol);
	  	ncol = nrow.cells[1];

			var initAlert = alertcount;

	  	var mod2= mod.rows[i].cells[1];
	    var tbl = mod2.getElementsByTagName("table")[0];

	    var part = tbl.rows[1].cells[1];
	    var pop = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));

	    part = tbl.rows[3].cells[1];
	    var edu = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	    if (edu / pop < gEduAlertLevel) {
	    	alertcount++;
	    	part.style.backgroundColor = "red";
	    	part.style.color = "black";
	    	ncol.appendChild(addLink("Education", "/build_facility.php?colony=" + colnum + "&type=3&subtype=2"));
	    	ncol.appendChild(document.createTextNode(" "));
			}
	    part = tbl.rows[2].cells[1];
	    var hap = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	    if (hap / pop < gAlertLevel)  {
	    	alertcount++;
	    	part.style.backgroundColor = "red";
	    	part.style.color = "black";
	    	if (ncol.childNodes.length > 0) ncol.appendChild(document.createTextNode(" / "));
	    	ncol.appendChild(addLink("Happiness", "/build_facility.php?colony=" + colnum + "&type=3&subtype=1"));
	    }

	    part = tbl.rows[4].cells[1];
	    var hea = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	    if (hea / pop > 1-gAlertLevel)  {
	    	alertcount++;
	    	part.style.backgroundColor = "red";
	    	part.style.color = "black";
	    	if (ncol.childNodes.length > 0) ncol.appendChild(document.createTextNode(" / "));
	    	ncol.appendChild(addLink("Health", "/build_facility.php?colony=" + colnum + "&type=3&subtype=3"));
	    }

	    part = tbl.rows[5].cells[1];
	    var cri = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	    if (cri / pop > 1-gAlertLevel)  {
	    	alertcount++;
	    	part.style.backgroundColor = "red";
	    	part.style.color = "black";
	    	if (ncol.childNodes.length > 0) ncol.appendChild(document.createTextNode(" / "));
	    	ncol.appendChild(addLink("Crime", "/build_facility.php?colony=" + colnum + "&type=3&subtype=4"));
	    }

      tbl = mod.rows[i].cells[2].getElementsByTagName("table")[0];
      part = tbl.rows[0].cells[1];
      var stou = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
      var stot = GM_wfcm_replaceCommas(part.innerHTML.substr(part.innerHTML.indexOf("/") + 2).replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
      if (stou / stot > gStorageAlert) {
	    	alertcount++;
	    	part.style.backgroundColor = "red";
	    	part.style.color = "black";
	    	if (ncol.childNodes.length > 0) ncol.appendChild(document.createTextNode(" / "));
	    	ncol.appendChild(addLink("Storage", "/buy_storage.php?colony=" + colnum));
	    }

	    part = tbl.rows[1].cells[3];
	    var food = GM_wfcm_replaceCommas(part.innerHTML.replace(/[\r\n]/g,"").replace(/^([,\d]+)\s.*$/m,"$1"));
	    if (food * 10 < pop) {
	    	alertcount++;
	    	part.style.backgroundColor = "red";
	    	part.style.color = "black";
	    	if (ncol.childNodes.length > 0) ncol.appendChild(document.createTextNode(" / "));
	    	ncol.appendChild(addLink("Farms", "/build_facility.php?colony=" + colnum + "&type=1&subtype=11"));
	    }

	    if (initAlert < alertcount)
	    {
	    	showAlerts.push(nrow);
	    }
	  }
	  var nn1 = document.createElement("font");
	  var nn2 = document.createElement("font");
	  if (alertcount == 0)
	  {
	  	nn1.setAttribute("color", "#00FF00");
	  	nn1.appendChild(document.createTextNode("All is well!"));
	  	mod.rows[0].cells[0].appendChild(nn1);
	  	mod.rows[0].cells[0].setAttribute("align","right");
	  	nn2.setAttribute("color", "#00FF00");
	  	nn2.appendChild(document.createTextNode("No alerts!"));
	  	mod.rows[1].cells[0].appendChild(nn2);
	  	mod.rows[1].cells[0].setAttribute("align","right");
	  } else {
	  	for (var i = 0; i < showAlerts.length; i++)
	  	{
	  		mod.childNodes[1].insertBefore(showAlerts[i], insBef);
	  	}
	  	nn1.setAttribute("class", "warn");
	  	nn1.appendChild(document.createTextNode("Alert!"));
	  	mod.rows[0].cells[0].setAttribute("align","right");
	  	mod.rows[0].cells[0].appendChild(nn1);
	  	nn2.setAttribute("class", "warn");
	  	nn2.appendChild(document.createTextNode(alertcount + " alerts."));
	  	mod.rows[1].cells[0].setAttribute("align","right");
	  	mod.rows[1].cells[0].appendChild(nn2);
	  }
	} else if (document.body.innerHTML.indexOf("Empire Administration Buildings") != -1) {
		var mod = centerBox.getElementsByTagName("table")[0];
	  if (mod)
	  {
	  	var pop = mod.innerHTML.substr(mod.innerHTML.indexOf('Total Population: ')+18);
	  	pop = parseFloat(pop.replace(/,/g,""));

	  	var income = mod.innerHTML.substr(mod.innerHTML.indexOf('Income: ')+8);
	  	income = parseFloat(income.replace(/,/g,""));

	  	var gross = Math.ceil(income / pop * 10000) / 10000;

	  	var nrow = document.createElement('tr');
	  	var ncol = document.createElement('td');
	  	ncol.setAttribute("class", "strong");
	  	ncol.appendChild(document.createTextNode("Gross Income: " + gross + " cr per person"));
	  	nrow.appendChild(ncol);
	  	mod.firstChild.appendChild(nrow);
	  }
	}
}

window.fullmod_onDetailsLoad = function(e) {
	var nBox = topBox.getElementsByTagName('table')[0].rows[0].cells[1].getElementsByTagName('table')[1];
	var row = document.createElement('tr');
	var col = document.createElement('td');
	col.setAttribute("colspan", 2);
	col.setAttribute("align", "center");
	col.setAttribute("class", "head");
	var anch = document.createElement('a');
	anch.setAttribute("href", "javascript:toggleConfigNode();");
	anch.appendChild(document.createTextNode("Click here for Ogini's Full Mod settings."));
	col.appendChild(anch);
	row.appendChild(col);
	col = document.createElement('td');
	col.setAttribute("align", "center");
	col.setAttribute("class", "head");
	anch = document.createElement('a');
	var otherserv = 'war';
	if (instance == otherserv) {
		otherserv = 'www';
	}
	anch.setAttribute("href", "http://" + otherserv + ".war-facts.com/starlog.php");
	anch.appendChild(document.createTextNode("To the " + otherserv + " server"));
	col.appendChild(anch);
	row.appendChild(col);
	//nBox.childNodes[1].appendChild(row);
	nBox.childNodes[1].insertBefore(row, nBox.rows[2]);

	var configText = '<div id="oginiConfig" style="visibility:hidden; background-color: blue;">Where will this be</div>';
	var configNode = document.createElement('div');
	configNode.setAttribute("id", "oginiConfig");
	configNode.style.width = "430px";
	configNode.style.height = "330px";
	configNode.setAttribute("class", "statbar");
	//configNode.style.border = "2px solid blue";
	configNode.style.backgroundColor = "black";
	configNode.style.position = "absolute";
	configNode.style.visibility = "hidden";
	configNode.style.top = "220";
	configNode.style.left = "200";
	configNode.style.zIndex = "100";
	//configNode.style.fontSize = "smaller";

	var configForm = document.createElement('form');
	configForm.setAttribute("name", "oginiConfigForm");
	var configtable = document.createElement('table');
	configtable.setAttribute("width","100%");
	var ctrow = document.createElement('tr');
	var ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	var ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "fhcb");
	if (useFleetHider) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Fleet Hider"));
	ctrow.appendChild(ctcol);


	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgcb");
	ctinp.setAttribute("value", "1");
	if (usePager) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Pager"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgbl");
	ctinp.setAttribute("value", "1");
	if (useBattleLog) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Battle Log"));
	ctrow.appendChild(ctcol);
	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pguv");
	ctinp.setAttribute("value", "1");
	if (useUniverse) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Universe"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgoc");
	ctinp.setAttribute("value", "1");
	if (useOtherColony) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use 'Other' Colony"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgpl");
	ctinp.setAttribute("value", "1");
	if (usePlanet) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Planet"));
	ctrow.appendChild(ctcol);
	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgfm");
	ctinp.setAttribute("value", "1");
	if (useFleetMove) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Fleet Move"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgfr");
	ctinp.setAttribute("value", "1");
	if (useForum) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Forum"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgbp");
	ctinp.setAttribute("value", "1");
	if (useBlueprints) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Blueprints"));
	ctrow.appendChild(ctcol);
	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctcol.setAttribute("colspan", "2");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgbb");
	ctinp.setAttribute("value", "1");
	if (useBlueprintsBuild) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Blueprints (on Build page)"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("colspan", "1");
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "uss");
	ctinp.setAttribute("value", "1");
	if (useShowScientist) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Scientist"));
	ctrow.appendChild(ctcol);

	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctcol.setAttribute("colspan", "1");
	ctcol.appendChild(document.createTextNode("Colony Mod:"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("colspan", "1");
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgco");
	ctinp.setAttribute("value", "1");
	if (useColony) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Colony mod"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("colspan", "1");
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "tokmor");
	ctinp.setAttribute("value", "1");
	if (useTokmor) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Allow Tokmor"));
	ctrow.appendChild(ctcol);

	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "meff");
	ctinp.setAttribute("value", gMallEff);
	ctinp.setAttribute("size", "5");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Mall EffWrk."));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "feff");
	ctinp.setAttribute("value", gFarmEff);
	ctinp.setAttribute("size", "5");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Farm EffWrk."));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "mpct");
	ctinp.setAttribute("value", gMallWorkerFraction * 100);
	ctinp.setAttribute("size", "5");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Mall Pct."));
	ctrow.appendChild(ctcol);

	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "mreb");
	ctinp.setAttribute("value", gMallRebuild * 100);
	ctinp.setAttribute("size", "5");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Mall Rebuild"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "alrt");
	ctinp.setAttribute("value", gAlertLevel * 100);
	ctinp.setAttribute("size", "5");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Alert"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "edualrt");
	ctinp.setAttribute("value", gEduAlertLevel * 100);
	ctinp.setAttribute("size", "5");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Edu Alert"));
	ctrow.appendChild(ctcol);

	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "storagealrt");
	ctinp.setAttribute("value", gStorageAlert * 100);
	ctinp.setAttribute("size", "5");
	ctinp.setAttribute("colspan", "3");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Store Alrt"));
	ctrow.appendChild(ctcol);

/*
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctcol.setAttribute("colspan", "2");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "reil");
	ctinp.setAttribute("value", "1");
	if (useReillan) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Reillan's Known Universe"));
	ctrow.appendChild(ctcol);
*/

	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctcol.setAttribute("colspan", "1");
	ctcol.appendChild(document.createTextNode("Starlog Mod:"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("colspan", "2");
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "text");
	ctinp.setAttribute("name", "empname");
	ctinp.setAttribute("value", EmpireName);
	ctinp.setAttribute("size", "25");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode(" Empire Name"));
	ctrow.appendChild(ctcol);
	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "pgst");
	ctinp.setAttribute("value", "1");
	if (useStarlog) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Use Starlog"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "sexp");
	ctinp.setAttribute("value", "1");
	if (showExploreTime) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Explore Time"));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "checkbox");
	ctinp.setAttribute("name", "sreg");
	ctinp.setAttribute("value", "1");
	if (showRegularTime) ctinp.setAttribute("checked", "true");
	ctcol.appendChild(ctinp);
	ctcol.appendChild(document.createTextNode("Reg. Time"));
	ctrow.appendChild(ctcol);
	configtable.appendChild(ctrow);

	ctrow = document.createElement('tr');
	ctcol = document.createElement('td');
	ctcol.style.fontSize = "smaller";
	ctcol.style.color = "red";
	ctcol.setAttribute("valign", "bottom");
	ctcol.appendChild(document.createTextNode('v' + fm_version));
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "strong");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "button");
	ctinp.setAttribute("value", "Save");
	//ctinp.setAttribute("onclick", "javascript:saveConfigNode();");
	ctinp.addEventListener('click', saveConfigNode, true);
	ctcol.appendChild(ctinp);
	ctrow.appendChild(ctcol);

	ctcol = document.createElement('td');
	ctcol.setAttribute("class", "head");
	ctinp = document.createElement('input');
	ctinp.setAttribute("type", "button");
	ctinp.setAttribute("value", "Cancel");
	ctinp.setAttribute("onclick", "javascript:toggleConfigNode();");
	ctcol.appendChild(ctinp);
	ctrow.appendChild(ctcol);
	configtable.appendChild(ctrow);

	configForm.appendChild(configtable);
	configNode.appendChild(configForm);

	document.body.appendChild(configNode);
}

saveConfigNode = function(e) {
	var orig;
	var iElem = document.evaluate("//input[@name='pgco']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var elem = iElem.iterateNext();
	useColony = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='tokmor']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useTokmor = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='sexp']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	showExploreTime = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='sreg']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	showRegularTime = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='meff']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	try {
		gMallEff = parseFloat(elem.value);
		gMallEff = gMallEff.toString();
	} catch (ex) {
		alert("Invalid mall efficiency: " + elem.value + " - must be a number");
		return;
	}

	iElem = document.evaluate("//input[@name='feff']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	try {
		gFarmEff = parseFloat(elem.value);
		gFarmEff = gFarmEff.toString();
	} catch (ex) {
		alert("Invalid farm efficiency: " + elem.value + " - must be a number");
		return;
	}

	iElem = document.evaluate("//input[@name='mpct']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	orig = gMallWorkerFraction;
	try {
		gMallWorkerFraction = parseFloat(elem.value) / 100;
		gMallWorkerFraction = gMallWorkerFraction.toString();
	} catch (ex) {
		alert("Invalid mall percentge: " + elem.value + " - must be a number");
		return;
	}
	if (elem.value > 100 || elem.value < 0) {
		alert("Invalid mall worker percent: " + elem.value + " - must be between 0 and 100");
		gMallWorkerFraction = orig;
		return;
	}


	iElem = document.evaluate("//input[@name='mreb']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	orig = gMallRebuild;
	try {
		gMallRebuild = parseFloat(elem.value) / 100;
		gMallRebuild = gMallRebuild.toString();
	} catch (ex) {
		alert("Invalid mall percentge: " + elem.value + " - must be a number");
		return;
	}
	if (elem.value > 100 || elem.value < 0) {
		alert("Invalid mall rebuild percent: " + elem.value + " - must be between 0 and 100");
		gMallRebuild = orig;
		return;
	}

	iElem = document.evaluate("//input[@name='alrt']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	orig = gAlertLevel;
	try {
		gAlertLevel = parseFloat(elem.value) / 100;
		gAlertLevel = gAlertLevel.toString();
	} catch (ex) {
		alert("Invalid mall percentge: " + elem.value + " - must be a number");
		return;
	}
	if (elem.value > 100 || elem.value < 0) {
		alert("Invalid alert percent: " + elem.value + " - must be between 0 and 100");
		gAlertLevel = orig;
		return;
	}

	iElem = document.evaluate("//input[@name='edualrt']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	orig = gEduAlertLevel;
	try {
		gEduAlertLevel = parseFloat(elem.value) / 100;
		gEduAlertLevel = gEduAlertLevel.toString();
	} catch (ex) {
		alert("Invalid education alert percentge: " + elem.value + " - must be a number");
		return;
	}
	if (elem.value > 100 || elem.value < 0) {
		alert("Invalid alert percent: " + elem.value + " - must be between 0 and 100");
		gEduAlertLevel = orig;
		return;
	}

	iElem = document.evaluate("//input[@name='storagealrt']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	orig = gStorageAlert;
	try {
		gStorageAlert = parseFloat(elem.value) / 100;
		gStorageAlert = gStorageAlert.toString();
	} catch (ex) {
		alert("Invalid education alert percentge: " + elem.value + " - must be a number");
		return;
	}
	if (elem.value > 100 || elem.value < 0) {
		alert("Invalid storage alert percent: " + elem.value + " - must be between 0 and 100");
		gStorageAlert = orig;
		return;
	}

	iElem = document.evaluate("//input[@name='pgst']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useStarlog = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='fhcb']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useFleetHider = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgcb']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	usePager = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgbl']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useBattleLog = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pguv']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useUniverse = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgoc']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useOtherColony = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgpl']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	usePlanet = elem.checked ? 1 : 0;

/*
	iElem = document.evaluate("//input[@name='reil']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useReillan = elem.checked ? 1 : 0;
*/

	iElem = document.evaluate("//input[@name='pgbp']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useBlueprints = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgbb']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useBlueprintsBuild = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='uss']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useShowScientist = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgfm']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useFleetMove = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='pgfr']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	useForum = elem.checked ? 1 : 0;

	iElem = document.evaluate("//input[@name='empname']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	elem = iElem.iterateNext();
	EmpireName = elem.value;
	saveSettings();
	unsafeWindow.toggleConfigNode();
	window.location.reload(true);
}

unsafeWindow.toggleConfigNode = function(e) {
	var icn = document.evaluate("//div[@id='oginiConfig']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var cn = icn.iterateNext();
	if (cn) {
		if (cn.style.visibility == "hidden")
			cn.style.visibility = "visible";
		else
			cn.style.visibility = "hidden";
	}
}

window.saveSettings = function(e) {
	GM_setValue(instance + 'mall', gMallEff);
	GM_setValue(instance + 'farm', gFarmEff);
	GM_setValue('mallworkerfraction', gMallWorkerFraction);
	GM_setValue('mallrebuild', gMallRebuild);
	GM_setValue('alertlevel', gAlertLevel);
	GM_setValue('edualertlevel', gEduAlertLevel);
	GM_setValue('storagealert', gStorageAlert);
	GM_setValue('starlog', useStarlog);
	GM_setValue('fleethider', useFleetHider);
	GM_setValue('pager', usePager);
	GM_setValue('battle', useBattleLog);
	GM_setValue('universe', useUniverse);
	GM_setValue('othercolony', useOtherColony);
	GM_setValue('planet', usePlanet);
	GM_setValue('reillan', useReillan);
	GM_setValue('blueprints', useBlueprints);
	GM_setValue('blueprintsbuild', useBlueprintsBuild);
	GM_setValue('fleetmove', useFleetMove);
	GM_setValue('forum', useForum);
	GM_setValue(instance + 'empname', EmpireName);
	GM_setValue('showexploretime', showExploreTime);
	GM_setValue('showregtime', showRegularTime);
	GM_setValue('colonymod', useColony);
	GM_setValue('tokmor', useTokmor);
	GM_setValue('explorehelp', useExploreHelp);
	GM_setValue('showscientist', useShowScientist);
}

window.loadSettings = function(e) {
	var isNV = false;
	try
	{
		var nv = topBox.getElementsByTagName('table')[2].rows[0].cells[0];
		if (nv) {
			nv = nv.firstChild.innerHTML;
			if (nv.indexOf("NetViper") != -1) isNV = true;
		}
	} catch (ex) {}

	var gTemp;
	if (GM_getValue(instance + 'mall') != undefined) {
		gTemp = GM_getValue(instance + 'mall');
		gMallEff = parseFloat(gTemp);
	}
	if (GM_getValue(instance + 'farm') != undefined) {
		gTemp = GM_getValue(instance + 'farm');
		gFarmEff = parseFloat(gTemp);
	}
	if (GM_getValue('mallworkerfraction') != undefined) {
		gTemp = GM_getValue('mallworkerfraction');
		gMallWorkerFraction = parseFloat(gTemp);
	}
	if (GM_getValue('mallrebuild') != undefined) {
		gTemp = GM_getValue('mallrebuild');
		gMallRebuild = parseFloat(gTemp);
	}
	if (GM_getValue('alertlevel') != undefined) {
		gTemp = GM_getValue('alertlevel');
		gAlertLevel = parseFloat(gTemp);
	}
	if (GM_getValue('edualertlevel') != undefined) {
		gTemp = GM_getValue('edualertlevel');
		gEduAlertLevel = parseFloat(gTemp);
	}
	if (GM_getValue('storagealert') != undefined) {
		gTemp = GM_getValue('storagealert');
		gStorageAlert = parseFloat(gTemp);
	}
	if (GM_getValue('explorehelp') != undefined) {
		gTemp = GM_getValue('explorehelp');
		useExploreHelp = gTemp;
	}
	if (GM_getValue('starlog') != undefined) {
		gTemp = GM_getValue('starlog');
		useStarlog = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('showscientist') != undefined) {
		gTemp = GM_getValue('showscientist');
		useShowScientist = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('fleethider') != undefined) {
		gTemp = GM_getValue('fleethider');
		useFleetHider = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('pager') != undefined) {
		gTemp = GM_getValue('pager');
		usePager = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('battle') != undefined) {
		gTemp = GM_getValue('battle');
		useBattleLog = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('universe') != undefined) {
		gTemp = GM_getValue('universe');
		useUniverse = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('othercolony') != undefined) {
		gTemp = GM_getValue('othercolony');
		useOtherColony = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('planet') != undefined) {
		gTemp = GM_getValue('planet');
		usePlanet = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('reillan') != undefined) {
		gTemp = GM_getValue('reillan');
		useReillan = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('blueprints') != undefined) {
		gTemp = GM_getValue('blueprints');
		useBlueprints = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('blueprintsbuild') != undefined) {
		gTemp = GM_getValue('blueprintsbuild');
		useBlueprintsBuild = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('fleetmove') != undefined) {
		gTemp = GM_getValue('fleetmove');
		useFleetMove = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('forum') != undefined) {
		gTemp = GM_getValue('forum');
		useForum = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue(instance + 'empname') != undefined) {
		gTemp = GM_getValue(instance + 'empname');
		EmpireName = gTemp;
	}
	if (GM_getValue('showexploretime') != undefined) {
		gTemp = GM_getValue('showexploretime');
		showExploreTime = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('showregtime') != undefined) {
		gTemp = GM_getValue('showregtime');
		showRegularTime = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('colonymod') != undefined) {
		gTemp = GM_getValue('colonymod');
		useColony = parseInt(gTemp) == 0 ? false : true;
	}
	if (GM_getValue('tokmor') != undefined) {
		gTemp = GM_getValue('tokmor');
		useTokmor = parseInt(gTemp) == 0 ? false : true;
	}
	if (isNV) {
		useStarlog = false;
		useFleetHider = false;
		usePager = false;
		useBattleLog = false;
		useUniverse = false;
		useOtherColony = false;
		usePlanet = false;
		useFleetMove = false;
		useForum = false;
		useBlueprints = false;
		useBlueprintsBuild = false;
		useColony = false;
	}
}


loadSettings();

if(useStarlog && base.indexOf('starlog.php') != -1) {
	window.addEventListener("load", window.fullmod_onStarlogLoad, false);
}
if(useFleetHider && base.indexOf("/extras/" == -1)) {
	window.addEventListener("load", window.fullmod_onFleetsLoad, false);
}
if(usePager && base.indexOf("/extras/") == -1 && base.indexOf("/gfx/") == -1) {
	window.addEventListener("load", window.fullmod_onPagerLoad, false);
}
if (base.indexOf("/extras/") == -1 && base.indexOf("/gfx/") == -1) {
	window.addEventListener("load", window.fullmod_onDetailsLoad, false);
}
if (useBattleLog && base.indexOf('battle_history.php') != -1) {
	window.addEventListener("load", window.fullmod_onBattleLoad, false);
}
if (useUniverse && base.indexOf('overview.php') != -1) {
	window.addEventListener("load", window.fullmod_onUniverseLoad, false);
}
if (useOtherColony && base.indexOf('list_colonies.php') != -1) {
	window.addEventListener("load", window.fullmod_onOtherColonyLoad, false);
}
if (usePlanet && ( base.indexOf('extras/view_planet.php') != -1 || base.indexOf('com/view_planet.php') != -1)) {
	window.addEventListener("load", window.fullmod_onPlanetLoad, false);
}
if (usePlanet && (base.indexOf('known_universe.php') != -1 || base.indexOf('intelligence.php') != -1 )) {
	window.addEventListener("load", window.fullmod_onKnownUniverseLoad, false);
}
if (useFleetMove && base.indexOf('fleet_navigation.php') != -1) {
	window.addEventListener("load", window.fullmod_onFleetNavLoad, false);
}
if (useForum && base.indexOf('forum.php') != -1) {
	window.addEventListener("load", window.fullmod_onForumLoad, false);
}
if (useBlueprints && base.indexOf('blueprints.php') != -1) {
	window.addEventListener("load", window.fullmod_onBlueprintLoad, false);
}
if (useBlueprintsBuild && base.indexOf('build_facility.php') != -1) {
	window.addEventListener("load", window.fullmod_onBuildFacilityLoad, false);
}
if (useColony && base.indexOf('build_facility.php') != -1) {
	window.addEventListener("load", window.fullmod_onColonyBuild, false);
}
if (useColony && base.indexOf('colony_buildings.php') != -1) {
	window.addEventListener("load", window.fullmod_onViewColonyExtendedLoad, false);
}
if (useColony && base.indexOf('view_colony.php') != -1) {
	window.addEventListener("load", window.fullmod_onViewColonyLoad, false);
}
if (useColony && !useTokmor && base.indexOf('overview.php') != -1) {
	window.addEventListener("load", window.fullmod_onColonyOverview, false);
}
if (useExploreHelp && base.indexOf("/extras/") == -1 && base.indexOf("/gfx/") == -1 && base.indexOf('fleet_navigation') != -1) {
	window.addEventListener("load", window.fullmod_onEHNavLoad, false);
} else if (useExploreHelp && base.indexOf("/extras/") == -1 && base.indexOf("/gfx/") == -1) {
	window.addEventListener("load", window.fullmod_onEHLogLoad, false);
}
/*
if (useColony && base.indexOf('/science.php') != -1) {
	window.addEventListener("load", window.fullmod_onScienceLoad, false);
}
*/
if (useShowScientist && base.indexOf('/research.php?colony=') != -1) {
	window.addEventListener("load", window.fullmod_onResearchLoad, false);
}