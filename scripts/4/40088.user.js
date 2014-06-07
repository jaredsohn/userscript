// ==UserScript==
// @name           attack check
// @namespace      n\a
// @include      http://*.travian.*
// @exclude      http://*.travian.*/dorf3*
// @exclude      http://*.travian.*/logout*
// @exclude      http://*.travian.*/login*
// ==/UserScript==


createMenu()

if(getValue('autoLogin', false))
{
//window.addEventListener("load", loginCheck, true);
}
window.addEventListener("load", underAttackCheck, true);
//window.setInterval(function(){underAttackCheck()}, 10000);
//reloadTime = getValue('reload', 15);
//window.setInterval(function(){reload()},reloadTime*60*1000);


//Global variables
var underAttack = false;
var underAttackInfo = new Array();
var server = findServer()


//Any links and buttons will call the delay function preventing village hoping. 
function freezeclicks()
{
var ex = "//a | //input[@onmousedown] | //area | //button";
search = document.evaluate( ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < search.snapshotLength; i++) 
  {
  thisLink = search.snapshotItem(i);
  thisLink.addEventListener("click", freeze, true);
  thisLink.addEventListener("click", function(){ delay(this);}, true);
  }
}


//Removes the event listener.
function unfreezeclicks()
{
var ex = "//a | //input[@onmousedown] | //area | //button";
search = document.evaluate( ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < search.snapshotLength; i++) 
  {
  thisLink = search.snapshotItem(i);
  thisLink.removeEventListener("click", freeze, true);
  thisLink.removeEventListener("click", function(){ delay(this);}, true);
  }
}

// stops default action
function freeze(event)
{
event.preventDefault();
}

//Cachees the action, returns to the previously active village, perform cached action
function delay(element)
{
//if a check is running set status to aborted so that it can continue on next load.
if (getValue('status','inactive') == 'running')
{
GM_log('aborting');
setValue('status','aborted');
if (underAttack)
{
setValue('underAttack', true);
}


var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

if (tag.snapshotLength)
  {
	temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	lastlink = temp[0];
 	url = "http://" + document.domain + "/dorf1.php?" + lastlink;
 	GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(responseDetails) {
    if(element.tagName == 'INPUT')
    {
    element.removeEventListener("click", freeze, true);
    element.click();
    }else{
    window.location.href = element.href;
    }
    }
  });
 	
  }else{
    if(element.tagName == 'INPUT')
    {
    element.removeEventListener("click", freeze, true);
    element.click();
    }else{
    window.location.href = element.href;
    }
}
}
}


//Create link on the left side for options, check and deactivate.
function createMenu()
{
var ex = "//td[@class='menu']";
search = document.evaluate( ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (search.snapshotLength)
  {
  link = document.createElement('a')
  link.href = '#'
  link.innerHTML = 'TUA-Menu'
  link.addEventListener('click', openMenu, true);
  
  link2 = document.createElement('a')
  link2.href = '#'
  link2.innerHTML = 'TUA-Check'
  link2.addEventListener('click', function (){setValue('status', 'running'); check(0);}, true);
  
  
  menu = search.snapshotItem(0);
  menu.appendChild(document.createElement('HR'));
  menu.appendChild(link2);
  menu.appendChild(link);
  
  }else{
  
  GM_log("Unable to find travian menu");
  }
  
}

//Finds the server youre playing on
function findServer()
{
server = window.location.href.split('http://')[1].split('/')[0]
return server;
}



//Puts all the village id's in a list(except active village)
function getVillageList()
{
var ex = "//a[contains(@href,'newdid')][not(@class='active_vl')]";
	tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var link = new Array();
	if (tag.snapshotLength)
	{
	for(var i=1; i<=tag.snapshotLength;i++)
	 {
	 temp = tag.snapshotItem(i-1).href.split("?");
	 link[i-1] = temp[1];
	 }
	 var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	 tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if (tag.snapshotLength)
    {
	 temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	 link.push(temp[0])
    } 
	}else{link[0] = '';} //One village
	return link;
}

//Deactivate automatic check 
deactivate()
function deactivate()
{
setValue('active', false)
}

//Gives the user a box with some status messages
function showStatus()
{
//L
//A
//T
//E
//R
//:
//-
//)
//LATER :-)
}

//saves a variable
function setValue(name,value)
{
GM_setValue(server+'-'+name, value);
}

//loads a variable
function getValue(name, defaultvalue)
{
return (GM_getValue(server+'-'+name, defaultvalue));
}

//Reloads page so that you won't get logged out
function reload()
{

url = "http://google.com"; //Just to check that you're online, trying to reload offline won't work and will mess up the script.
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

function underAttackCheck()
{
status = getValue('status', 'inactive')
GM_log(status);
if (status == 'aborted')
{
underAttack = getValue('underAttack', false);
setValue('underAttack', false);
//continue from aborted village
setValue('status', 'running'); 
check(getValue('numDone', 0));

}else if (status == 'running')
  {
  //Check is running in other window, relax =)
  return;
  }else if(status == 'inactive')
    {
    //Start check from start if enough time has passed since last check
    min = getValue('min', 3);
    max = getValue('max', 3);
    
    min = parseInt(min);
    max = parseInt(max);
    
    var timer = getValue('check_timer', 0);
    timer = parseInt(timer);
    var now = new Date().getTime();
    var exptime = (timer + (min+Math.floor(Math.random()*max))*60*1000);
    now = "" + now;
    if (exptime < now)
      {
      setValue('status', 'running');
      check(0);
      }
    }else
      {
      //Something weird has happend, just set the value to default. 
      setValue('status', 'inactive');
      GM_log('the status variable have some invalid value, returning it to default.')
      return;
      }



}

villages = getVillageList();
totVillages = villages.length;
//the actual check starting from the num-th village. default = 0
function check(num)
{
if(getValue('status','inactive') != 'running')
{
GM_log('status is not "running"');
return; 
}
freezeclicks()
if (!num){num =0;}
GM_log('num:'+num + 'tot:'+totVillages);
if(num < totVillages)
{
url = "http://" + document.domain + "/dorf1.php?" + villages[num]
GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
    pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    if(checkImg(pulled))
      {
      underAttack = true;
      
      gatherAttackInfo(pulled, num);
      GM_log('under Attack!');
      }
    //GM_log('Number of villages done:' +num);
    setValue('numDone', num);

    num++;
    check(num);
		}
});

}else
  {
  showResults();
  setValue('status', 'inactive');
  unfreezeclicks()
  setValue('numDone', 0);
  now = new Date().getTime();
  now = "" + now;
  setValue('check_timer', now);
  //alert("under attack:"+underAttack);
  
  }


}

function checkImg(doc)
{
var ex = ".//img[contains(@src,'att1')]";
tag = document.evaluate(ex,doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (tag.snapshotLength) 
{ 
return true;  //Normal attack
}else
  {
  var ex = ".//img[contains(@src,'att3')]";
	tag = document.evaluate(ex,doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if (tag.snapshotLength)
    {
    return true; //oasis under attack
    }else
      {
      return false;
      }
  }
}
var underAttackInfo = new Array();

function gatherAttackInfo(doc, vNum)
{
 
underAttackInfo[vNum] = new Array();

underAttackInfo[vNum]['underAttack'] = true;

underAttackInfo[vNum]['numAttacks'] = getNumberofAttacks(doc);
underAttackInfo[vNum]['timeNextAttack'] = getTimeofNextAttack(doc);

}

var infobar = document.createElement("div");
thisDiv = document.getElementById('lmid1');
thisDiv.appendChild(infobar);

function playSoundAlarm()
{
soundUrl = getValue('souldUrl', 'http://simplythebest.net/sounds/WAV/WAV_files/cartoon_WAV_files/bunny_troubles.wav')
infobar.innerHTML = "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false>";
}

function getNumberofAttacks(doc)
{

ex =".//div[@id='ltbw1']/table/tbody/tr/td[2]/b"
num = document.evaluate(ex,doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (num.snapshotLength)
  {
   
  return(num.snapshotItem(0).innerHTML.split('»')[1]);
  }else{
  return 0
  }
}

function getTimeofNextAttack(doc)
{
ex =".//span[@id='timer1']"
time = document.evaluate(ex,doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (time.snapshotLength)
  {
  return(time.snapshotItem(0).innerHTML);
  }else{
  return 0
  }

}

function showResults()
{
i= 0;
while (i < totVillages)
{
if (underAttackInfo[i])
  {
  newdid = villages[i]
  ex ="//a[contains(@href,'"+newdid+"')]/../.."
  tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if (tag.snapshotLength)
    {
    //alert(tag.snapshotItem(0).innerHTML);
    tag.snapshotItem(0).innerHTML += '<td>'+underAttackInfo[i]['numAttacks']+';</td><td>'+underAttackInfo[i]['timeNextAttack']+'</td>'
    }else{
    alert("error in xpath");
    }

  
  }
  i++;
}
if(underAttack && getValue('alarm',true))
{
playSoundAlarm();
}

}

var infobar = document.createElement("div");
thisDiv = document.getElementById('lmid1');
thisDiv.appendChild(infobar);

//open menu
function openMenu()
{
this.addEventListener('click', closeMenu, true);
this.removeEventListener('click', openMenu, true);

table = document.createElement('table');

row = document.createElement('tr');
row2 = document.createElement('tr');

header = document.createElement('td')
header.innerHTML = 'Menu';
header.colspan = '4';
row.appendChild(header)

col = document.createElement('td')
col.innerHTML = 'Min:'
col2 = document.createElement('td')

inputMin = document.createElement('input')
inputMin.name = 'min'
inputMin.value = getValue('min', 3)
row2.appendChild(col)
row2.appendChild(col2)
col2.appendChild(inputMin);

inputMax = document.createElement('input')
inputMax.name = 'max'
inputMax.value = getValue('max', 3)

col3 = document.createElement('td')
col3.innerHTML = 'Max:'
col4 = document.createElement('td')
col4.appendChild(inputMax);
row2.appendChild(col3)
row2.appendChild(col4)




table.appendChild(row);
table.appendChild(row2);

infobar.appendChild(table);


}

function closeMenu()
{
this.removeEventListener('click', closeMenu, true);
this.addEventListener('click', openMenu, true);


infobar.innerHTML = "";
}