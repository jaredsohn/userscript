// ==UserScript==
// @name           Travian:extended marketplace
// @namespace      n\a
// @include      http://*.travian*.*
// @exclude      http://*.travian*.*/dorf3*
// @exclude      http://*.travian*.*/logout*
// @exclude      http://*.travian*.*/login*
// ==/UserScript==

GM_registerMenuCommand( "Set marketplace translation", helloSimple );

function helloSimple()
{
word = prompt("Type inn the translated name of the marketplace on your server");
GM_setValue('marketplaceWord', word);
}

document.addEventListener("keydown",hotKeys,true); 


function hotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==0)&&(event.ctrlKey==1))) 
        {
            if(event.keyCode==90)                   //z
            {
                extendedMarketplace();
            }
        }
}

function extendedMarketplace()
{

var marketplaceSearch = GM_getValue('marketplaceWord', 'Marketplace');

massDiv= '<div id="mass">'+
'<table>'+
'<tr>'+
'<td><b>Mass cords</b></td>'+
'</tr>'+
'<tr>'+
'<td>X:<input type="text" size="1" name="mX" id="mX"></td><td>Y:<input type="text" size="1" name="mY" id="mY"></td><td><button id="massCord">submit</button></td>'+
'</tr>'+
'<tr>'+
'<td><b>Mass res ratios</b></td>'+
'</tr>'+
'<tr>'+
'<td>Wood:<input type="text" size="1" name="wr" id="wr"></td><td>Clay<input type="text" size="1" name="cr" id="cr"></td><td>Iron:<input type="text" size="1" name="ir" id="ir"></td><td></td><td>Wheat:<input type="text" size="1" name="whr" id="whr"></td><td><button id=ratios>submit</button></td>'+
'</tr>'+
'<tr>'+
'<td><button id="sendTwice">Send twice toggle</button></td>'+
'</tr>'+
'<tr>'+
'<td><button id="sendAll">Send all</button>'+
'</tr>'+
'<tr>'+
'<td><div id="info"><div></td>'
'</tr>'+
'</table>'+
'</div>';

form = window.open('','','scrollbars=yes,resizable=yes')
div = "<div id=\"formDiv\">Loading..</div>";
form.document.write(div);
formDiv = form.document.getElementById('formDiv');
formDiv.innerHTML = massDiv + '<table id="formTable"></table>';
formTable = form.document.getElementById('formTable');



var cordButton = form.document.getElementById('massCord');
cordButton.addEventListener("click", massCord, true);

var ratioButton = form.document.getElementById('ratios');
ratioButton.addEventListener("click", massRatio, true);

var sendAllButton = form.document.getElementById('sendAll');
sendAllButton.addEventListener("click", sendAll, true);

var sendTwiceButton = form.document.getElementById('sendTwice');
sendTwiceButton.addEventListener("click", sendTwice, true);

marketId = new Array();
marketId['did'] = new Array();
marketId['mId'] = new Array();
list = new Array();
button = new Array();


newDid = getVilLink();
numVil = newDid.length;
vilCount = 0;

for(i=0;i<newDid.length;i++)
{
url = "http://" + document.domain + "/dorf2.php?" + 'newdid=' + newDid[i]; 
//alert(url)
post(url);
}


function getVilLink ()
{
var ex = "//a[contains(@href,'newdid')]";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	var link = new Array();
	for(var i=1; i<=tag.snapshotLength;i++)
	{
	temp = tag.snapshotItem(i-1).href.split("?")[1].split('=');
	link[i-1] = temp[1];
	}
	return link;
}

function getMarketId(doc, url)
{
var ex = ".//area[contains(@title,'"+marketplaceSearch+"')]";
did = url.split('?')[1].split('=');

	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
      
      marketId['did'].push(did[1])
      
      if(tag.snapshotLength > 0)
      {
      marketId['mId'].push(tag.snapshotItem(0).href.split('id=')[1])
      }else{
     marketId['mId'].push('0')
     
      }
}

function post(url) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) {
	        
	pulled = document.createElement('div');
  pulled.innerHTML = responseDetails.responseText; 
  
  getMarketId(pulled, url);
  vilCount++;
  if (numVil <= vilCount)
  {
  saveCookie();
  }

				       }
  		    });
}

function saveCookie()
{
var data = '';
if (marketId['mId'].length == marketId['did'].length)
{
  for(x=0;x<marketId['mId'].length;x++)
  {
  data += marketId['did'][x] + '-' +  marketId['mId'][x];
  if (x != marketId['did'].length-1){data += '|';}
  }
}
GM_setValue('marketId', data);
main();
}

function main()
{
temp = GM_getValue('marketId')
temp = temp.split('|')


list['did'] = new Array();
list['mId']= new Array();
for (x=0;x<temp.length;x++)
{
a = temp[x].split('-');
list['did'][x] = a[0];
list['mId'][x] = a[1];

}
//alert(list['mId'].length);
  for(x=0;x<list['mId'].length;x++)
    {
      if (list['mId'][x] != 0)
      {
      url = "http://" + document.domain + "/build.php?" + "id=" + list['mId'][x] + '&newdid=' + list['did'][x];
      //alert(url);
      post2(url, list['mId'][x]);
      }
  }

}

function post2(url, mId) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) {
	    
	pulled = document.createElement('div');
  pulled.innerHTML = responseDetails.responseText; 
  
  getInfo(pulled, mId);
  

  
				       }
  		    });
}

function getInfo(doc, mId)
{

temp = '';
resource = new Array();
for(x=4;x>=1;x--)
{
var ex = ".//td[@id='l" + x +"']";
	res = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	
    	if(res.snapshotLength > 0)
        {
      resource[x] =(res.snapshotItem(0).innerHTML.split('/')[0]);
      }else{
     //alert("unable to fetch resources");
      }
      
  }
  
var ex = ".//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	activeVil = tag.snapshotItem(0).innerHTML
	activeDid = tag.snapshotItem(0).href.split("?")[1].split('=')[1].split('&')[0];
	//alert(activeVil);
	//alert(activeDid);
	
	var ex = ".//script";
		tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	
    	//alert(tag.snapshotLength);
    	for(x=0;x<tag.snapshotLength;x++)
    	{
      if(tag.snapshotItem(x).innerHTML.search('haendler')>0)
        {
          temp = tag.snapshotItem(x).innerHTML.split('\n');
          numMerchants = temp[2].split('=')[1].replace(';','');
          carryCap = temp[3].split('=')[1].replace(';','');
          
        }
      }
    
      printForm(activeVil, activeDid, resource[4], resource[3], resource[2], resource[1], numMerchants, carryCap, mId);
    	
}

function printForm(aVil, aDid, wood, clay, iron, wheat, nMerc, cCap, mId)
{
//alert("1");
element = document.createElement('div');

value = nMerc * cCap;

wValue = Math.floor(value *100/460);
cValue = Math.floor(value *130/460);
iValue = Math.floor(value *160/460);
whValue =  Math.floor(value *70/460);

if(wValue>wood){wValue=wood}
if(cValue>clay){cValue=clay}
if(iValue>iron){iValue=iron}
if(whValue>wheat){whValue=wheat}

element.innerHTML = '<tr><td><form id="' + aDid + '" name="' + aDid + '">'+
'<table><tr>'+
'<td>' + aVil + '</td>'+
'<td># Merc:<b>' + nMerc + '</b> Carry cap: <b>'+cCap+'</b></td>'+
'</tr>'+
'<tr>'+
'<td>Wood:(' + wood + ')</td>'+
'<td><input type="text" name="Wood" value="'+wValue+'" id="Wood"></td>'+
'</tr><tr>'+
'<td>Clay:(' + clay + ')</td>'+
'<td><input type="text" name="Clay" value="'+cValue+'" id="Clay"></td>'+
'</tr><tr>'+
'<td>Iron:(' + iron + ')</td>'+
'<td><input type="text" name="Iron" value="'+iValue+'" id="Iron"></td>'+
'</tr><tr>'+
'<td>Wheat:(' + wheat + ')</td>'+
'<td><input type="text" name="Wheat" value="'+whValue+'" id="Wheat"></td>'+
'</tr><tr>'+
'<td>X:<input type="text" size="1" name="x" id="x"></td>'+
'<td>Y:<input type="text" size="1" name="y" id="y"></td>'+
'</tr><tr>'+
'<td>Go twice:<input name="twice" type="checkbox"> </td>'+
'</tr><tr>'+
'<td><input type="button" value="Send" name=send id="button_' + aDid +'"></td>'+
'</tr></table>'+
'<input type="hidden" name="nMerc" id="nMerc" value="'+nMerc+'">'+
'<input type="hidden" name="cCap" id="cCap" value="'+cCap+'">'+
'<input type="hidden" name="mWood" id="mWood" value="'+wood+'">'+
'<input type="hidden" name="mClay" id="mClay" value="'+clay+'">'+
'<input type="hidden" name="mIron" id="mIron" value="'+iron+'">'+
'<input type="hidden" name="mWheat" id="mWheat" value="'+wheat+'">'+
'<input type="hidden" name="mId" id="mId" value="'+mId+'">'+
'</form></td></tr>';
//alert(tempForm);
formTable.appendChild(element);
form.document.getElementById('button_' + aDid).addEventListener("click", send, true); 

}

function send()
{
did = this.id.split('_')[1]
thisForm = form.document.getElementById(did);


wood = parseInt(thisForm.elements[0].value);
clay = parseInt(thisForm.elements[1].value);
iron = parseInt(thisForm.elements[2].value);
wheat = parseInt(thisForm.elements[3].value);
x = parseInt(thisForm.elements[4].value);
y = parseInt(thisForm.elements[5].value);
twice = thisForm.elements[6].checked;
nMerc = parseInt(thisForm.elements[8].value);
cCap = parseInt(thisForm.elements[9].value);
mWood = parseInt(thisForm.elements[10].value);
mClay = parseInt(thisForm.elements[11].value);
mIron = parseInt(thisForm.elements[12].value);
mWheat = parseInt(thisForm.elements[13].value);
mId = parseInt(thisForm.elements[14].value);

tot = wood + clay + iron + wheat;
maxTot = nMerc * cCap;

  if (wood <= mWood && clay <= mClay && iron <= mIron && wheat <= mWheat && tot <= maxTot)
  {
  prepSendRes(wood,clay,iron,wheat,did,mId,x,y,twice);
  }else{
  error = 'Some error:\n' + 'res: sent\available\n' + wood + '-' + mWood +'\n'+ clay + '-' + mClay +'\n'+ iron + '-' + mIron +'\n'+ wheat + '-' + mWheat +'\n'+ tot + '-' + maxTot;
  
  }

}

function prepSendRes(wo,c,i,wh,did,mId,x,y,twice)
{
/*if (wo > 0 || c > 0 || i > 0 || wh > 0)
{
*/
url = "http://" + document.domain + "/build.php?" +'id='+mId+'&newdid='+did;
  //alert(url)
  data = 'id='+mId+'&r1='+wo+'&r2='+c+'&r3='+i+'&r4='+wh+'&x='+x+'&y='+y;
  if (twice)
  {
  data = 'id='+mId+'&r1='+wo+'&r2='+c+'&r3='+i+'&r4='+wh+'&x='+x+'&y='+y+'&x2=1';
  }
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
      
      	pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText;
        
        	idValue = getValue(pulled, 'id');
	        aValue = getValue(pulled, 'a');
	        szValue = getValue(pulled, 'sz');
	        kidValue = getValue(pulled, 'kid');
	        r1Value = getValue(pulled, 'r1');
	        r2Value = getValue(pulled, 'r2');
	        r3Value = getValue(pulled, 'r3');
	        r4Value = getValue(pulled, 'r4');
	        sendRes(idValue,aValue,szValue,kidValue,r1Value,r2Value,r3Value,r4Value,did,twice);
	        
	        
   }    
  
  
  });
  /*
}else{
      if (sendall)
      {
      alert("starting next sendall");
      sendAll();
      }
    
  }
  */
}

function sendRes(id,a,sz,kid,r1,r2,r3,r4,did,twice)
{
url = "http://" + document.domain + "/build.php?" +'newdid='+did;  
//alert(url)
data = 'id='+id+'&a='+a+'&sz='+sz+'&kid='+kid+'&r1='+r1+'&r2='+r2+'&r3='+r3+'&r4='+r4;
if (twice)
{
data = 'id='+id+'&a='+a+'&sz='+sz+'&kid='+kid+'&r1='+r1+'&r2='+r2+'&r3='+r3+'&r4='+r4+'&x2=1';
}
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
      
      	pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText;
        if (sendall)
        {
        //alert("starting next sendall");
        sendAll();
        }else{
        info("Sent", true);
        }
	        
   }    
  
  
  });
}

function getValue(doc, name)
{
var ex = ".//input[@name='" + name + "']";
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

function massCord()
{
mX = form.document.getElementById('mX').value;
mY = form.document.getElementById('mY').value; 



x = form.document.getElementsByName('x');
y = form.document.getElementsByName('y');
  for(var i =0;i<x.length;i++)
  {
  x[i].value=mX;
  y[i].value=mY;
  }

}

function massRatio()
{
wRatio = parseFloat(eval(form.document.getElementById('wr').value));
cRatio = parseFloat(eval(form.document.getElementById('cr').value));
iRatio = parseFloat(eval(form.document.getElementById('ir').value));
whRatio = parseFloat(eval(form.document.getElementById('whr').value));

if(isNaN(wRatio)){ wRatio="0";}
if(isNaN(cRatio)){ cRatio="0";}
if(isNaN(iRatio)){ iRatio="0";}
if(isNaN(whRatio)){ whRatio="0";}


wMax = form.document.getElementsByName('mWood');
cMax = form.document.getElementsByName('mClay');
iMax = form.document.getElementsByName('mIron');
whMax = form.document.getElementsByName('mWheat');


wfield = form.document.getElementsByName('Wood');
cfield = form.document.getElementsByName('Clay');
ifield = form.document.getElementsByName('Iron');
whfield = form.document.getElementsByName('Wheat');


nmerchants = form.document.getElementsByName('nMerc');
thisCCap = form.document.getElementsByName('cCap');
  for(var i=0;i<wfield.length;i++)
  {
  tot = nmerchants[i].value * thisCCap[i].value;
  if (Math.floor(wRatio * tot) < wMax[i].value) {wfield[i].value = Math.floor(wRatio * tot);}else{wfield[i].value = wMax[i].value }
  if (Math.floor(cRatio * tot) < cMax[i].value) {cfield[i].value = Math.floor(cRatio * tot);}else{cfield[i].value = cMax[i].value }
  if (Math.floor(iRatio * tot) < iMax[i].value) {ifield[i].value = Math.floor(iRatio * tot);}else{ifield[i].value = iMax[i].value }
  if (Math.floor(whRatio * tot) < whMax[i].value) {whfield[i].value = Math.floor(whRatio * tot);}else{whfield[i].value = whMax[i].value }
  }


}

var sendloopcount = 0;
sendall = false;
function sendAll()
{
//alert("starting to send");
sendall = true;
button = form.document.getElementsByName('send');

if (sendloopcount<button.length)
{
info("Sending:" + (sendloopcount+1) +' of '+ button.length, false);
button[sendloopcount].click();
sendloopcount++;
}else{
info("Done sending "+ button.length+ " shipsments", false);}
}

function sendTwice ()
{
checkBoxes = form.document.getElementsByName('twice');
  for (x=0;x<checkBoxes.length;x++)
  {
  if (checkBoxes[x].checked){checkBoxes[x].checked = false}else{ checkBoxes[x].checked = true}
  }
}

function info(msg, add)
{
infoDiv = form.document.getElementById('info');
if (add)
{
infoDiv.innerHTML = infoDiv.innerHTML + "<p>" + msg +"</p>";
}else{
infoDiv.innerHTML = "<p>" + msg +"</p>";
}
 
}
}
