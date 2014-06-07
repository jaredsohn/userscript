// ==UserScript==
// @name          Travian under-attack check TR Surekli Kontrol
// @description   Travian under-attack check TR Surekli Kontrol
// @include      http://*.travian.*
// @exclude      http://*.travian.*/dorf3*
// @exclude      http://*.travian.*/logout*
// @exclude      http://*.travian.*/login*
// ==/UserScript==

//set this to false to make it not freeze the screen when running a check, village hop more probable then 
var freezeWhenCheck = true;
var soundUrl = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
var attacked = false;
var villageName = "";
villageNameA = "";
arrivalTime =  "";
fullInfo = "";


//Allow you to run a external script\page when you are under attack. feks you could call your own email script.  
var externalUrl = "";
var externalPostData = "";
var runEveryTime = true;


function post(url) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) {
	        
	
	pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText; 


	if(checkImg(pulled))
	{
	//alert("Under attack!"); 
	attacked = true;
	
	getAttackInfo(pulled)

	infobar.innerHTML ='<span style="color:#FF0000"><b>' + villageNameA + ' Saldiri altinda!</b>' + "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false></span>";
	}
	if (tot == ant)
	{ant++; last(); }else{ant++;}

				       }
  		    });
}

function last()
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
	lastlink = temp[0];

 	url = "http://" + document.domain + "/dorf1.php?" + lastlink;
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
			{
	        
	
	pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText;
 
	FreezeScreen('', false);
	if(checkImg(pulled))
	{
	attacked = true;
	//alert("Under attack!");
  getAttackInfo(pulled)
  
	infobar.innerHTML ='<span style="color:#FF0000"><b>' + villageNameA + ' Saldiri altinda!</b>' + "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false></span>";
	}else{
		if (!attacked){
			     infobar.innerHTML ='<span style="color:#00CC00"><b>Su an bir saldiri bulunamadi.Sanslisin =)</b></span>';
				
			     }
	     }
			}
  		    });
  }else if(!attacked){ 
        FreezeScreen('', false);
        infobar.innerHTML ='<span style="color:#00CC00"><b>Su an bir saldiri bulunamadi.Sanslisin =)</b></span>';
        }else{
        FreezeScreen('', false);
	infobar.innerHTML ='<span style="color:#FF0000"><b>' + villageNameA + ' Saldiri altinda!</b>' + "<embed src='"+soundUrl+"' hidden=true autostart=true loop=false></span>";
              }
external(externalUrl,externalPostData,attacked);
}


function getVilLink ()
{
var ex = "//a[contains(@href,'newdid')][not(@class='active_vl')]";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	var link = new Array();
	if (tag.snapshotLength)
	{
	for(var i=1; i<=tag.snapshotLength;i++)
	 {
	 temp = tag.snapshotItem(i-1).href.split("?");
	 link[i-1] = temp[1];


	 }
	}
	link.sort(function() {return 0.5 - Math.random()});
	return link;
	
}



function checkImg(doc)
{

	var ex = ".//img[contains(@src,'att1')]";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) 
    { 
    return true;
    }else{
    	var ex = ".//img[contains(@src,'att3')]";
	    tag = document.evaluate( 
  	  ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	if (tag.snapshotLength)
    	{
      return true;
      }else{
      return false;
      }
    }
}

function addDiv(){
var div = document.createElement("div");
div.innerHTML = '<div align="center" id="FreezePane" class="FreezePaneOff">'+
   '<div id="InnerFreezePane" class="InnerFreezePane">Test </div>'+
'</div>';
document.body.insertBefore(div, document.body.firstChild);
}




function FreezeScreen(msg, state) {
	
      scroll(0,0);
      var outerPane = document.getElementById('FreezePane');
      var innerPane = document.getElementById('InnerFreezePane');
	if (state){
      if (outerPane) outerPane.className = 'FreezePaneOn';
      if (innerPane) innerPane.innerHTML = msg + '<button id=\"closeFreeze\" >x</button>';
	var button = document.getElementById('closeFreeze');
	button.addEventListener("click", function(){ FreezeScreen( '', false)}, true);
	}else{
	if (outerPane) outerPane.className = 'FreezePaneOff';
        if (innerPane) innerPane.innerHTML = '';
		
		}
   }

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


var styles =   '.FreezePaneOff'+
   '{'+
    'visibility: hidden;'+
    'display: none;'+
    'position: absolute;'+
    'top: -100px;'+
    'left: -100px;'+
   '}'+

   '.FreezePaneOn'+
   '{'+
    '  position: absolute;'+
    '  top: 0px;'+
    '  left: 0px;'+
    '  visibility: visible;'+
    '  display: block;'+
    '  width: 100%;'+
    '  height: 100%;'+
    '  background-color: #666;'+
    '  z-index: 999;'+
    '  filter:alpha(opacity=85);'+
    '  -moz-opacity:0.85;'+
    '  padding-top: 20%;'+
   '}'+

   '.InnerFreezePane'+
   '{'+
    '  text-align: center;'+
    ' width: 66%;'+
    '  background-color: #171;'+
    '  color: White;'+
    '  font-size: large;'+
    '  border: dashed 2px #111;'+
    '  padding: 9px;'+
   '}';


var ant = 1;
var tot;



function underAttackCheck ()
{


var timer = GM_getValue('check_timer', 0);
timer = parseInt(timer);
var now = new Date().getTime();

var exptime = (timer + (3+Math.floor(Math.random()*3))*60*1000);
now = "" + now;


if (exptime < now)
{
villageName = "";
villageNameA = "";
arrivalTime =  "";
fullInfo = "";

infobar.innerHTML = '<span style="color:#FFCC000"><b>Saldirilar kontrol ediliyor: <br> Bu islem internet hiziniza gore 5-10 sn. surebilir.</b></span>';
GM_setValue('check_timer', now);


var msg = '<b>Saldirilar kontrol ediliyor: <br> u islem internet hiziniza gore 5-10 sn. surebilir.</b>';
if (freezeWhenCheck){FreezeScreen(msg, true);}


params = getVilLink();
tot = params.length;
ant = 1;
if (tot == 0) 
{
params[0] = ""; //assuming only 1 village
tot = 1;
}


for(var i=1; i<=params.length;i++)
	{
	url = "http://" + document.domain + "/dorf1.php?" + params[i-1];
	post(url);
	
	}
}
}

function getActiveVillage(doc, a)
{
var ex = ".//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	if (tag.snapshotLength)
    	{
    	if(a)
    	{
      return '<a href="'+tag.snapshotItem(0)+'">'+tag.snapshotItem(0).innerHTML+"</a>";
      }else{
      return tag.snapshotItem(0).innerHTML;
      }
	     
	    }else{
      return "";
      }
	
}

function getArrivalTime(doc)
{
var ex = ".//div[@id='ltbw0' or @id='ltbw1']";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	if (tag.snapshotLength)
    	{
      div = tag.snapshotItem(0);
      rows = div.getElementsByTagName("tr");
  for (x=0;x<rows.length;x++)
  {
  cells = rows[x].getElementsByTagName("td");
    
    if (cells[0].innerHTML.search('att1') > 0)
    {
     arrival = cells[4].getElementsByTagName("span")[0].innerHTML;
     return(arrival);
    }
  } 
      }
    	
}

function external(url,postData,underAttack)
{
  //alert(villageName)
  //alert(villageNameA)
  //alert(arrivalTime)
  //alert(fullInfo)
flag = GM_getValue('underAttackFlag', false);

if (flag && !underAttack) {GM_setValue('underAttackFlag', false);}

if (!flag && underAttack)
{
GM_setValue('underAttackFlag', true);
    GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(postData),
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    }
  		    });
}else if(runEveryTime && underAttack)
{
    GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(postData),
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText;
    }
  		    });
}

}
function reload()
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

function getAttackInfo(code)
{
	if (villageName.length > 0)
	{
	
  villageName = villageName + ', ' + getActiveVillage(code, false);
  villageNameA = villageName + ', ' + getActiveVillage(code, true);
  arrivalTime = arrivalTime + ', ' + getArrivalTime(code);
  fullInfo = fullInfo + ', ' + getActiveVillage(code, false) + '-' + getArrivalTime(code);
  }else{
  villageName = getActiveVillage(code, false);
  villageNameA = getActiveVillage(code, true);
  arrivalTime = getArrivalTime(code);
  fullInfo = getActiveVillage(code, false) + '-' + getArrivalTime(code);
  }
  
}

var infobar = document.createElement("div");
thisDiv = document.getElementById('lmid1');
thisDiv.appendChild(infobar);

addGlobalStyle(styles);
addDiv()

window.addEventListener("load", underAttackCheck, true);
window.setInterval(function(){underAttackCheck()}, 10000);

window.setInterval(function(){reload()},15*60*1000);
