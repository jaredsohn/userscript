// ==UserScript==
// @name           Travian: Antifarm\Troop saver - Original
// @namespace      n\a
// @include        http://*.travian*.*/dorf1.php*
// ==/UserScript==

// =)

//Change these to some valid coordinates for your server
xSave = "-36";
ySave =  "52";

var reload = true;

loginCheck();
setTimeout(function(){autoreload()},900000); 
checkImg(document)
function getArrivalTime()
{

div = document.getElementById('ltbw0');
if (!div) {div = document.getElementById('ltbw1'); }
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
  if (totSeconds < 30)
  {
  GM_log(">30 seconds");
  reload = false;
  saveTroops();
  }else{
  window.setTimeout(function(){getArrivalTime()},1000);
  }

}


function checkImg(doc)
{

	var ex = "//img[contains(@src,'att1')]";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) { getArrivalTime();}
}



//saveTroops();



function saveTroops(){
GM_log("Preparing to send away");
url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
  GM_xmlhttpRequest({
    method: "GET",
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

if (t1 < 1 && t2 < 1 && t3 < 1 && t4 < 1 && t5 < 1 && t6 < 1 && t7 < 1 && t8 < 1 && t9 < 1 && t10 < 1 && t11 < 1)
{
return;
}

url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();
data = 'b=1&t1='+t1+'&t4='+t4+'&t7='+t7+'&t9='+t9+'&t2='+t2+'&t5='+t5+'&t8='+t8+'&t10='+t10+'&t11='+t11+'&t3='+t3+'&t6='+t6+'&c=2&dname=&x='+xSave+'&y='+ySave+'&s1=ok';

GM_log(url + data);

    GM_xmlhttpRequest({
    method: "POST",
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
  GM_log(url + data);
    GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
    {
    GM_log("Troops sent away");
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    window.setTimeout(function(){retreat()},16000);
    GM_log("Troops will be retreated in 16 seconds");
    }
  		    });
  
}

function retreat ()
{
GM_log("Preparing to retreat troops");
url = "http://" + document.domain + "/build.php?id=39&" + getActiveVillage();
  GM_xmlhttpRequest({
    method: "GET",
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
GM_log('yey');
	var ex = ".//img[contains(@src,'del.gif')]/..[contains(@href,'t=')]";
	tag = document.evaluate( 
  	ex,
    	code,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	
    	if(tag.snapshotLength)
    	{
      url = "" + tag.snapshotItem(0)
      t = parseInt(url.split('t=')[1]);
      for(var i=1; i<=tag.snapshotLength;i++)
	   {
	   temp = "" + tag.snapshotItem(i);	   GM_log(temp);
	   thisT = parseInt(temp.split('t=')[1]);
	   if (thisT > t)
	   {
     url = temp;
     }
	 
	 }
      GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
    GM_log("Troops retreated");
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    
    GM_log("saved");
    }
  		    });
  		    
      }


}

function getTotalUnit(doc,t)
{
var ex = ".//a[contains(@OnClick,'" + t + "')][@href='#']";
	result = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (result.snapshotLength)
{
thisResult = result.snapshotItem(0).innerHTML;
return ((thisResult.substring(1,thisResult.length-1)))
}else{
      return 0;
      }

}

function getValue(doc, name)
{
var ex = ".//input[@type='hidden'][@name='" + name + "']";
tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength)
  {
	aTag = tag.snapshotItem(0);
	return(aTag.value);
	}else{
  return 0;
  }

}
function getActiveVillage()
{
var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

  if (tag.snapshotLength)
  {
	temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	return temp[0];
  }else{
  return 0	
}
}
loginCheck();
function loginCheck()
{
if (document.getElementsByName('login'))
{
var ex = ".//input[@value='login']";
tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

var ex = ".//input[@type='password' and contains(@value, '*')]";
tag2 = document.evaluate( 
  	ex,
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
if (reload)
{
url = "http://google.com";
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
        // this reloading method avoids the browser asking whether to submit form again
    if (location.href.indexOf('#') > 0) {
        location.href = location.href.substring(0, location.href.length - 1);  // remove trailing '#' or reload won't work   
    }
    else {
        location.href = location.href;
    }
    }
  		    });
}

}