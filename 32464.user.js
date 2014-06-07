// ==UserScript==
// @name           Travian: Antifarm\Troop saver
// @namespace      n\a
// @include        http://*.travian*.*/dorf1.php*
// ==/UserScript==

//   ============   DEBUG STATICS AND RELATED FUNCTIONS  ============
// 0 - GM_log ; else NOTHING
var DEBUG_STATE_PRODUCTION = -1;
var DEBUG_STATE_GM_LOG = 1;

var DBG_HIGHEST = 1;
var DBG_HIGH = 2;
var DBG_NORMAL = 3;
var DBG_LOW = 4;
var DBG_LOWEST = 5;

var DEBUG_STATE = DEBUG_STATE_GM_LOG;
var DEBUG_VERBOSITY = DBG_LOWEST;

// Generic debug function with logging level check and timestamp

function debug(verbosity, txt) 
{
 	switch (DEBUG_STATE) 
	{
 		case DEBUG_STATE_GM_LOG: 
			if (verbosity <= DEBUG_VERBOSITY)
			{
				var time = new Date().getTime();
				var days = Math.floor(time/86400000);
				time -= days*86400000;
				var hours = Math.floor(time/3600000);
				time -= hours * 3600000;
				var mins = Math.floor(time/60000);
				time -= mins * 60000; 
				var secs = Math.floor(time/1000);
				GM_log(hours+":"+mins+":"+secs+" "+txt);
			} 
			break;
 		default: 
			break;
 	}
}

// Debug function with highest priority

function dbg(txt)
{
	debug(DBG_HIGHEST, txt); 
}

//   ==========   END DEBUG STATICS AND RELATED FUNCTIONS  ==========

dbg("START: DEBUG_STATE " + DEBUG_STATE + " DEBUG_VERBOSITY " + DEBUG_VERBOSITY);

//   ============   CONFIGURATION FOR TIMERS AND RELOAD   =========== 
var reloadTime = 90*60;
var saveTroopThreshold = 90*60;

//Change these to some valid coordinates for your server
xSave = "-73";
ySave =  "21";

var reload = true;

loginCheck();

setTimeout(function(){autoreload()},reloadTime * 1000); 

checkImg(document);

function getArrivalTime()
{
	debug(DBG_NORMAL,"Entering getArrivalTime()");
	div = document.getElementById('ltbw0');
	if (!div) 
	{
		div = document.getElementById('ltbw1'); 
	}
	rows = div.getElementsByTagName("tr");
  	for (x=0;x<rows.length;x++)
  	{
  		cells = rows[x].getElementsByTagName("td");
    
    		if (cells[0].innerHTML.search('att1') > 0)
    		{
     			arrival = cells[4].getElementsByTagName("span")[0].innerHTML;
     
    		}
  	} 
	hours = parseInt(arrival.split(':')[0]);
	minutes = parseInt(arrival.split(':')[1]);
	seconds = parseInt(arrival.split(':')[2]);

	totSeconds = hours*60*60 + minutes*60 + seconds 
  	if (totSeconds <= saveTroopThreshold)
  	{
  		debug(DBG_NORMAL,"Attack in less than "+saveTroopThreshold+" seconds ("+totSeconds+") -> Saving Troops");
  		reload = false;
  		saveTroops();
  	}
	else
	{
		debug(DBG_NORMAL,"Attack in more than "+saveTroopThreshold+" seconds ("+totSeconds+")");
		if (totSeconds <= reloadTime)
		{ 
			var deltaSeconds = totSeconds - saveTroopThreshold - 1;
			debug(DBG_NORMAL,"Warn: attack will arrive before next autoreload -> Rechecking in "+deltaSeconds+" seconds.");
	  		window.setTimeout(function(){getArrivalTime()},deltaSeconds * 1000);
		}
		else
		{
			debug(DBG_NORMAL, "Nothing to do until next autoreload");
		}
  	}
}

function checkImg(doc)
{
	debug(DBG_NORMAL,"Entering checkImg()");
	var ex = "//img[contains(@src,'att1')]";
	tag = document.evaluate(ex,
    				doc,
    				null,
    				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);
	if (tag.snapshotLength) 
	{ 
		debug(DBG_NORMAL,"Incoming attack on village " + getActiveVillage() + " -> Checking");
		getArrivalTime();
	}	
}

function saveTroops()
{
	debug(DBG_NORMAL,"Entering saveTroops()");
	url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
	debug(DBG_NORMAL,"About to call: "+url);
  	GM_xmlhttpRequest({method: "GET",
    			   url: url,
    			   onload: function(responseDetails) 
    			   {
	  			pulled = document.createElement('div');
    				pulled.innerHTML = responseDetails.responseText; 
    				prepSave(pulled);
    			   }
  		    	 });
}

function prepSave(pulled) 
{
	debug(DBG_NORMAL,"Entering prepSave()");
	t1 = getTotalUnit(pulled,'t1')
	t2 = getTotalUnit(pulled,'t2')
	t3 = getTotalUnit(pulled,'t3')
	t4 = getTotalUnit(pulled,'t4')
	t5 = getTotalUnit(pulled,'t5')
	t6 = getTotalUnit(pulled,'t6')
	t7 = getTotalUnit(pulled,'t7')
	t8 = getTotalUnit(pulled,'t8')
	t9 = getTotalUnit(pulled,'t9')
	t10 = getTotalUnit(pulled,'t10')
	t11 = getTotalUnit(pulled,'t11')

	debug(DBG_NORMAL,"T1 = "+t1+"T2 = "+t2+"T3 = "+t3+"T4 = "+t4+"T5 = "+t5+"T6 = "+t6+"T7 = "+t7+"T8 = "+t8+
			 "T9 = "+t9+"T10 = "+t10+"T11 = "+t11);

	if (t1 < 1 && t2 < 1 && t3 < 1 && t4 < 1 && t5 < 1 && t6 < 1 && 
	    t7 < 1 && t8 < 1 && t9 < 1 && t10 < 1 && t11 < 1)
	{
		debug(DBG_NORMAL,"Nothing to save");
		return;
	}

	url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
	data = 'b=1&t1='+t1+'&t4='+t4+'&t7='+t7+'&t9='+t9+'&t2='+t2+'&t5='+t5+'&t8='+t8+'&t10='+t10+'&t11='+t11+'&t3='+t3+'&t6='+t6+'&c=2&dname=&x='+xSave+'&y='+ySave+'&s1=ok';

	debug(DBG_NORMAL,url + data);

	return;

    	GM_xmlhttpRequest({method: "POST",
    			   url: url,
    			   headers:{'Content-type':'application/x-www-form-urlencoded'},
    			   data:encodeURI(data),
    			   onload: function(responseDetails) 
    			   {
	  			pulled = document.createElement('div');
    				pulled.innerHTML = responseDetails.responseText;
    				finishSave(pulled);

    			   }
  		    	 });
}

function finishSave(pulled)
{
	debug(DBG_NORMAL,"Entering finishSave()");
	idValue = getValue(pulled, 'id');
	aValue = getValue(pulled, 'a');
	cValue = getValue(pulled, 'c');
	kidValue = getValue(pulled, 'kid');
	t1Value = getValue(pulled, 't1');
	t2Value = getValue(pulled, 't2');
	t3Value = getValue(pulled, 't3');
	t4Value = getValue(pulled, 't4');
	t5Value = getValue(pulled, 't5');
	t6Value = getValue(pulled, 't6');
	t7Value = getValue(pulled, 't7');
	t8Value = getValue(pulled, 't8');
	t9Value = getValue(pulled, 't9');
	t10Value = getValue(pulled, 't10');
	t11Value = getValue(pulled, 't11');
	url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
  	data = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value+'&s1=ok&attacks=&cords=';
  	debug(DBG_NORMAL,url + data);
    	GM_xmlhttpRequest({method: "POST",
    			   url: url,
    			   headers:{'Content-type':'application/x-www-form-urlencoded'},
    			   data:encodeURI(data),
    			   onload: function(responseDetails) 
    			   {
    			   	debug(DBG_NORMAL,"Troops sent away");
	  			pulled = document.createElement('div');
    				pulled.innerHTML = responseDetails.responseText; 
    				window.setTimeout(function(){retreat()},16000);
    				debug(DBG_NORMAL,"Troops will be retreated in 16 seconds");
    			   }
  		    	 });
  
}

function retreat ()
{
	debug(DBG_NORMAL,"Entering retreat()");
	url = "http://" + document.domain + "/build.php?id=39&" + getActiveVillage();
  	GM_xmlhttpRequest({method: "GET",
    			   url: url,
    			   onload: function(responseDetails) 
    			   {
	  			pulled = document.createElement('div');
    				pulled.innerHTML = responseDetails.responseText; 
    				finishRetreat(pulled);
    			   }
  		    	 });
}

function finishRetreat(code)
{
	debug(DBG_NORMAL,"Entering finishRetreat()");
	var ex = ".//img[contains(@src,'del.gif')]/..";
	tag = document.evaluate(ex,
    				code,
    				null,
    				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);
    	
    	if(tag.snapshotLength)
    	{
      		url = "" + tag.snapshotItem(0)
      		GM_xmlhttpRequest({method: "GET",
    				   url: url,
    				   onload: function(responseDetails) 
    				   {
    					debug(DBG_NORMAL,"Troops retreated");
	  				pulled = document.createElement('div');
    					pulled.innerHTML = responseDetails.responseText; 
    					debug(DBG_NORMAL,"saved");
    				   }
  		    		 });
      	}
}

function getTotalUnit(doc,t)
{
	debug(DBG_NORMAL,"Entering getTotalUnit()");
	var ex = ".//a[contains(@OnClick,'" + t + "')][@href='#']";
	result = document.evaluate(ex,
    				   doc,
    				   null,
    				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				   null);
	if (result.snapshotLength)
	{
		thisResult = result.snapshotItem(0).innerHTML;
		return ((thisResult.substring(1,thisResult.length-1)))
	}
	else
	{
      		return 0;
      	}

}

function getValue(doc, name)
{
	debug(DBG_NORMAL,"Entering getValue()");
	var ex = ".//input[@type='hidden'][@name='" + name + "']";
	tag = document.evaluate(ex,
    				doc,
    				null,
    				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);
	if (tag.snapshotLength)
  	{
		aTag = tag.snapshotItem(0);
		return(aTag.value);
	}
	else
	{
  		return 0;
  	}
}

function getActiveVillage()
{
	debug(DBG_NORMAL,"Entering getActiveVillage()");
	var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate(ex,
    				document,
    				null,
    				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    				null);

  	if (tag.snapshotLength)
  	{
		temp = tag.snapshotItem(0).href.split("?")[1].split('&');
		return temp[0];
  	}
	else
	{
  	return 0;	
	}
}

function loginCheck()
{
	debug(DBG_NORMAL,"Entering loginCheck()");
	if (document.getElementsByName('login'))
	{
		var ex = ".//input[@value='login']";
		tag = document.evaluate(ex,
    					document,
    					null,
    					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    					null);

		var ex = ".//input[@type='password' and contains(@value, '*')]";
		tag2 = document.evaluate(ex,
    					 document,
    					 null,
    					 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    					 null);

    		if(tag.snapshotLength && tag2.snapshotLength)
    		{
    			loginButton = tag.snapshotItem(0);
    			loginButton.click();
    		}
	}
}

function autoreload()
{
	debug(DBG_NORMAL,"Entering autoreload()");
	if (reload)
	{
		url = "http://google.com";
  		GM_xmlhttpRequest({method: "GET",
    				   url: url,
    				   onload: function(responseDetails) 
    				   {
	  				pulled = document.createElement('div');
    					pulled.innerHTML = responseDetails.responseText; 
        // this reloading method avoids the browser asking whether to submit form again
    					if (location.href.indexOf('#') > 0) 
					{
        					location.href = location.href.substring(0, location.href.length - 1);  
        // remove trailing '#' or reload won't work   
    					}
    					else 
					{
        					location.href = location.href;
    					}
    				   }	
  		    		 });
	}
}