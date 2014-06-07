// ==UserScript==
// @name           قرية الدعم ( 2 )
// @namespace      n\a
// @include      http://*.travian*.*
// @exclude      http://*.travian*.*/dorf3*
// @exclude      http://*.travian*.*/logout*
// @exclude      http://*.travian*.*/login*
// ==/UserScript==

function hotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==0)&&(event.ctrlKey==1))) 
        {
            if(event.keyCode==88)                   //z
            {
                openPopup();
            }
        }
}
document.addEventListener("keydown",hotKeys,true);


function openPopup()
{
sel = getVillageDropDown();

hover = '<div id="hoverpopup" style="background-color:white; visibility:hidden; position:absolute; top:100; left:100; padding:1px; border-style: solid; border-width: 1px; ">0</div>';

massDiv = '<fieldset>'+
'<legend><span lang="en-us">paltalk</span> قرية الدعم 2</legend>'+
'<table>'+
'<tr>'+
'<td>Cords:'+sel+'</td>'+
'</tr>'+
'<tr>'+
'<td>X:<input size="2" id="massX" value="-98" name="x"></td>'+
'<td>Y:<input size="2" id="massY" name="y" value="132"></td>'+
'<td><input type="button" id="massCords" value="Submit"></td>'+
'</tr>'+
'<tr>'+
'<td>Ratios:</td>'+
'</tr>'+
'</tr>'+
'<tr>'+
'<td>Wood:<input size="2" id="r_wood" name="w" value="95/25"></td>'+
'<td>Clay:<input size="2" id="r_clay" name="c" value="75/250"></td>'+
'<td>Iron:<input size="2" id="r_iron" name="l" value="40/250"></td>'+
'<td>Wheat:<input size="2" id="r_wheat" name="ww" value="0/250"></td>'+
'<td><input type="button" id="massRatios" value="Submit"></td>'+

'<td><span id="fourth">1/4</span></td>'+
'<td><span id="third">1/3</span></td>'+

'<td>|</td>'+

'<td><img id="leg" src="/img/un/u/1.gif"></td>'+
'<td><img id="pret" src="/img/un/u/2.gif"></td>'+
'<td><img id="imp" src="/img/un/u/3.gif"></td>'+
'<td><img id="el" src="/img/un/u/4.gif"></td>'+
'<td><img id="ei" src="/img/un/u/5.gif"></td>'+
'<td><img id="ec" src="/img/un/u/6.gif"></td>'+
'<td><img id="ram" src="/img/un/u/7.gif"></td>'+
'<td><img id="kat" src="/img/un/u/8.gif"></td>'+
'<td><img id="sen" src="/img/un/u/9.gif"></td>'+
'<td><img id="set" src="/img/un/u/10.gif"></td>'+

'<td>|</td>'+

'<td><img id="clu" src="/img/un/u/11.gif"></td>'+
'<td><img id="spe" src="/img/un/u/12.gif"></td>'+
'<td><img id="axe" src="/img/un/u/13.gif"></td>'+
'<td><img id="sco" src="/img/un/u/14.gif"></td>'+
'<td><img id="pal" src="/img/un/u/15.gif"></td>'+
'<td><img id="tk" src="/img/un/u/16.gif"></td>'+
'<td><img id="ram2" src="/img/un/u/17.gif"></td>'+
'<td><img id="kat2" src="/img/un/u/18.gif"></td>'+
'<td><img id="sen2" src="/img/un/u/19.gif"></td>'+
'<td><img id="set2" src="/img/un/u/20.gif"></td>'+

'<td>|</td>'+

'<td><img id="pha" src="/img/un/u/21.gif"></td>'+
'<td><img id="swo" src="/img/un/u/22.gif"></td>'+
'<td><img id="pat" src="/img/un/u/23.gif"></td>'+
'<td><img id="tt" src="/img/un/u/24.gif"></td>'+
'<td><img id="dru" src="/img/un/u/25.gif"></td>'+
'<td><img id="hae" src="/img/un/u/26.gif"></td>'+
'<td><img id="ram3" src="/img/un/u/27.gif"></td>'+
'<td><img id="kat3" src="/img/un/u/28.gif"></td>'+
'<td><img id="sen3" src="/img/un/u/29.gif"></td>'+
'<td><img id="set3" src="/img/un/u/30.gif"></td>'+

'</tr>'+
'<tr>'+
'<td>Merchants:</td>'+
'</tr>'+
'</tr>'+
'<tr>'+
'<td>Wood:<input size="2" id="m_wood" name="q"></td>'+
'<td>Clay:<input size="2" id="m_clay" name="qq"></td>'+
'<td>Iron:<input size="2" id="m_iron" name="qqq"></td>'+
'<td>Wheat:<input size="2" id="m_wheat" name="qqqq"></td>'+
'<td><input type="button" id="massMerchants" value="Submit"></td>'+
'</tr>'+

'<tr>'+
'<td>Overflow protection<input type="checkbox" id="overflow" checked></td>'+
'</tr>'+
'<tr>'+
'<td><input type="button" id="twiceToggle" value="Send twice toggle"></td>'+
'<td><input type="button" id="sendAll" value="Send all"></td>'+
'<td><input type="button" id="refresh" value="Refresh"></td>'+
'</tr>'+
'</table>'+
'<div id="sendAllCounter"></div>'+
'</fieldset>';

villages = getVillageList()
numVillages = villages.length;


table = '<table id="formTable">';

for(x=0;x<numVillages;x++)
{
table += '<tr><td id="'+villages[x]+'"></td>' 

x++;
  if(villages[x])
  {
  table += '<td id="'+villages[x]+'"></td>';
  }
table += '</tr>';
}
table += '</table>';


form = window.open('','','scrollbars=yes,resizable=yes')
div = "<div id=\"formDiv\">ERROR</div>";
form.document.write(div);
formDiv = form.document.getElementById('formDiv');
formDiv.innerHTML = hover + massDiv + table;

form.document.getElementById('massCords').addEventListener("click", massCords, true);
form.document.getElementById('massRatios').addEventListener("click", massRatios, true);
form.document.getElementById('massMerchants').addEventListener("click", massMerchants, true);
form.document.getElementById('twiceToggle').addEventListener("click", twiceToggle, true);
form.document.getElementById('sendAll').addEventListener("click", sendAll, true);
form.document.getElementById('refresh').addEventListener("click", refresh, true);

form.document.getElementById('fourth').addEventListener("click", function(){predefinedMassRatios(1,1,1,1)}, true);
form.document.getElementById('third').addEventListener("click", function(){predefinedMassRatios(1,1,1,0)}, true);

form.document.getElementById('leg').addEventListener("click", function(){predefinedMassRatios(120,100,180,40)}, true);
form.document.getElementById('pret').addEventListener("click", function(){predefinedMassRatios(100,130,160,70)}, true);
form.document.getElementById('imp').addEventListener("click", function(){predefinedMassRatios(150,160,210,80)}, true);
form.document.getElementById('el').addEventListener("click", function(){predefinedMassRatios(140,160,20,40)}, true);
form.document.getElementById('ei').addEventListener("click", function(){predefinedMassRatios(550,440,320,100)}, true);
form.document.getElementById('ec').addEventListener("click", function(){predefinedMassRatios(550,640,800,180)}, true);
form.document.getElementById('ram').addEventListener("click", function(){predefinedMassRatios(900,360,500,70)}, true);
form.document.getElementById('kat').addEventListener("click", function(){predefinedMassRatios(950,1350,600,90)}, true);
form.document.getElementById('sen').addEventListener("click", function(){predefinedMassRatios(30750,27200,45000,37500)}, true);
form.document.getElementById('set').addEventListener("click", function(){predefinedMassRatios(5800,5300,7200,5500)}, true);
form.document.getElementById('fourth').addEventListener("click", function(){predefinedMassRatios(1,1,1,1)}, true);

form.document.getElementById('clu').addEventListener("click", function(){predefinedMassRatios(95,75,40,40)}, true);
form.document.getElementById('spe').addEventListener("click", function(){predefinedMassRatios(145,70,85,40)}, true);
form.document.getElementById('axe').addEventListener("click", function(){predefinedMassRatios(130,120,170,70)}, true);
form.document.getElementById('sco').addEventListener("click", function(){predefinedMassRatios(160,100,50,50)}, true);
form.document.getElementById('pal').addEventListener("click", function(){predefinedMassRatios(370,270,290,75)}, true);
form.document.getElementById('tk').addEventListener("click", function(){predefinedMassRatios(450,515,480,80)}, true);
form.document.getElementById('ram2').addEventListener("click", function(){predefinedMassRatios(1000,300,350,70)}, true);
form.document.getElementById('kat2').addEventListener("click", function(){predefinedMassRatios(900,1200,600,60)}, true);
form.document.getElementById('sen2').addEventListener("click", function(){predefinedMassRatios(35500,26600,25000,27200)}, true);
form.document.getElementById('set2').addEventListener("click", function(){predefinedMassRatios(7200,5500,5800,6500)}, true);

form.document.getElementById('pha').addEventListener("click", function(){predefinedMassRatios(100,130,55,30)}, true);
form.document.getElementById('swo').addEventListener("click", function(){predefinedMassRatios(140,150,185,60)}, true);
form.document.getElementById('pat').addEventListener("click", function(){predefinedMassRatios(170,150,20,40)}, true);
form.document.getElementById('tt').addEventListener("click", function(){predefinedMassRatios(350,450,230,60)}, true);
form.document.getElementById('dru').addEventListener("click", function(){predefinedMassRatios(360,330,280,120)}, true);
form.document.getElementById('hae').addEventListener("click", function(){predefinedMassRatios(500,620,675,170)}, true);
form.document.getElementById('ram3').addEventListener("click", function(){predefinedMassRatios(950,555,330,75)}, true);
form.document.getElementById('kat3').addEventListener("click", function(){predefinedMassRatios(960,1450,630,90)}, true);
form.document.getElementById('sen3').addEventListener("click", function(){predefinedMassRatios(30750,45400,31000,37500)}, true);
form.document.getElementById('set3').addEventListener("click", function(){predefinedMassRatios(5500,7000,5300,4900)}, true);



for(x=0;x<numVillages;x++)
{

getInfo(villages[x]);
//GM_log(villages[x]);
}

}
			
/*
test = form.document.getElementById('r_clay');
test.addEventListener("mouseover", function(){showHoverPopup(this, 1000)}, true);
test.addEventListener("mouseout", function(){hideHoverPopup()}, true);
*/

function showHoverPopup(hoveritem, info)
{
hover = form.document.getElementById('hoverpopup');
hover.innerHTML = info;
hover.style.top = findPosY(hoveritem) + 25;
hover.style.left = findPosX(hoveritem) + 10;

hover.style.visibility = "Visible";
}

function hideHoverPopup()
{
hover = form.document.getElementById('hoverpopup');
hover.style.visibility = "Hidden";
}

//by by Peter-Paul Koch & Alex Tingle
function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
  }

//by by Peter-Paul Koch & Alex Tingle
  function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }

function getVillageList()
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
	temp = tag.snapshotItem(i-1).href.split("?")[1].split('=')[1].split('&')[0];
	link[i-1] = temp;
	}
	return link;
}

function getVillageName(did)
{
var ex = "//a[contains(@href,'newdid="+did+"')]";
	    tag = document.evaluate( 
  	  ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	var link = new Array();
	return tag.snapshotItem(0).innerHTML
}

function getXYFromActive(doc)
{

var searchNames = ".//a[contains(@href,'newdid')]";
var DidS = document.evaluate(searchNames, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var searchXs = ".//div[@class='cox']";
var Xs = document.evaluate(searchXs, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


var searchYs = ".//div[@class='coy']";

var Ys = document.evaluate(searchYs, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var thisName = "//table[@id='vlist']//td[@class='dot hl']/../td[@class='link']//a";
//var thisName = ".//td[@class='dot hl']//a";



var did = document.evaluate(thisName, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


correctDid = did.snapshotItem(0).href.split("?")[1].split('=')[1];



	for(var i=0; i<DidS.snapshotLength;i++)
	 {
	 testDid = DidS.snapshotItem(i).href.split("?")[1].split('=')[1];
	
  if (correctDid == testDid)
  {

  x =(Xs.snapshotItem(i).innerHTML.split('(')[1])
  y = (Ys.snapshotItem(i).innerHTML.split(')')[0])

  return [x,y];
  }

	 }

}

function getVillageDropDown()
{
// array of the village data (populated later)
 var villages = [];

 // get all village names
 var searchNames = "//a[contains(@href,'newdid')]";
 var names = document.evaluate(searchNames, document, null, XPathResult.ANY_TYPE, null);
 // get their X coords
 var searchXs = "//div[@class='cox']";
 var Xs = document.evaluate(searchXs, document, null, XPathResult.ANY_TYPE, null);

 // get their Y coords
 var searchYs = "//div[@class='coy']";
 var Ys = document.evaluate(searchYs, document, null, XPathResult.ANY_TYPE, null);


 // Go through each village and add it's details to the villages array
 var thisName = names.iterateNext();
 var thisX = Xs.iterateNext();
 var thisY = Ys.iterateNext();

 
 //var alertText = "gooo!\n";
 while (thisName) {
  thisX = thisX.textContent.substr(1); // remove opening (
  thisY = parseInt(thisY.textContent); // remove closing )
  //alertText += thisName.textContent + " @ ("+thisX+","+thisY+")\n"
  villages.push({name:thisName.textContent, x:thisX, y:thisY});
  thisName = names.iterateNext();
  thisX = Xs.iterateNext();
  thisY = Ys.iterateNext();
 }
 //alert(alertText);

 // reverse villages list so it's in same sequence as what is shown in right sidebar
 villages.reverse();

 // get node to attach the select list to
 var node = document.getElementsByName('y')[0];

 // build the select list
 var sel = "<select>";
 var i = villages.length;
 for (cnt = 1; cnt<=5; cnt++) {
 	var mpTarget = GM_getValue('marketplaceTarget'+cnt, '-');
 	if (mpTarget!="" && mpTarget!="-") {
 		var target_array=mpTarget.split("|");
  	sel += "<option value = '"+(-1*i)+"' onClick='document.getElementById(\"massX\").value="+target_array[1]+";document.getElementById(\"massY\").value="+target_array[2]+";'>"+target_array[0]+"</option>"; 			
 	}
 }
 while (-1<--i) {
  // this version with coords in drop-down:
  //sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+" ("+villages[i].x+","+villages[i].y+")</option>";
  // this version without coords in drop-down:
  //sel += "<option value = '"+(-1*i)+"' onClick='form.document.getElementById('massX').value="+target_array[1]+";form.document.getElementById('massY').value="+target_array[2]+";'>"+target_array[0]+"</option>"; 	
  sel += "<option value = '"+i+"' onClick='document.getElementById(\"massX\").value="+villages[i].x+";document.getElementById(\"massY\").value="+villages[i].y+";'>"+villages[i].name+"</option>";
 }
 sel += "</select>";
 return sel;
}

function saveVilageList(list, name)
{
GM_setValue(name, list);
return true;
}

function loadVillageList(name)
{
return GM_getValue(name, 0);
}


function sendResources(newDID, wood, clay, iron, wheat, twice, mId, x, y)
{

rx = 5 + Math.floor(Math.random()*30);
ry = 5 + Math.floor(Math.random()*15);
url = "http://" + document.domain + "/build.php?" +'id='+mId+'&newdid='+newDID;

data = 'id='+mId+'&r1='+wood+'&r2='+clay+'&r3='+iron+'&r4='+wheat+'&dname=&x='+x+'&y='+y+'&s1.x='+rx+'&s1.y='+ry+'&s1=ok';
//GM_log(data);

if (twice){data = 'id='+mId+'&r1='+wood+'&r2='+clay+'&r3='+iron+'&r4='+wheat+'&dname=&x='+x+'&y='+y+'&x2=2&s1.x='+rx+'&s1.y='+ry+'&s1=ok';}
//alert(data);
GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
    {
      
    pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText;
//GM_log(pulled.innerHTML);
    
        
    idValue = getValue(pulled, 'id');
	  aValue = getValue(pulled, 'a');
	  szValue = getValue(pulled, 'sz');
	  kidValue = getValue(pulled, 'kid');
	  cValue = getValue(pulled, 'c');
	  
    /* For some strange reason this won't work anymore, if anyone finds out why let me know. 
    r1Value = getValue(pulled, 'r1');
	  r2Value = getValue(pulled, 'r2');
	  r3Value = getValue(pulled, 'r3');
	  r4Value = getValue(pulled, 'r4');
	  */

	  
	  r1Value = wood;
	  r2Value = clay;
	  r3Value = iron;
	  r4Value = wheat;
	  rx = 5 + Math.floor(Math.random()*30);
  	  ry = 5 + Math.floor(Math.random()*15);
	  
	  url = "http://" + document.domain + "/build.php?" +'newdid='+newDID;  
	  data = 'id='+idValue+'&a='+aValue+'&sz='+szValue+'&kid='+kidValue+'&c='+cValue+'&r1='+r1Value+'&r2='+r2Value+'&r3='+r3Value+'&r4='+r4Value+'&s1.x='+rx+'&s1.y='+ry+'&s1=ok';
    if (twice){data = 	  data = 'id='+idValue+'&a='+aValue+'&sz='+szValue+'&kid='+kidValue+'&c='+cValue+'&r1='+r1Value+'&r2='+r2Value+'&r3='+r3Value+'&r4='+r4Value+'&x2=2&s1.x='+rx+'&s1.y='+ry+'&s1=ok';}
//GM_log(data);
//alert(data);

    GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
      
      	pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText;
        info(newDID, 'Done');
        if(sendall){setTimeout(function(){sendAll()},500)}
        return true;
	        
   }    //end second onload 
  }); //end second xmlhttprequest
   } //end first onload   
  }); //end first xmlhttprequest
} //end function


function getValue(doc, name)
{
var ex = ".//input[@name='" + name + "']";
//alert("lolz");
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

function getInfo(DID)
{

url = "http://" + document.domain + "/build.php?" +'gid=17&newdid='+DID;

  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) {       
	  
    pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText;
    
    temp = getMerchantInfo(pulled)


    if(temp != false)
    {

    numMerchants = temp[0];
    carrycap = temp[1];

    
    res = getResourceInfo(pulled);

    if(res != false)
    {

    wood = res[0]
    clay = res[1];
    iron = res[2];
    wheat = res[3];
    
    max = getResourceInfoMax(pulled);

    coords = getXYFromActive(pulled);



    mId = getValue(pulled, 'id')





    printForm(numMerchants,carrycap,wood,clay,iron,wheat,DID, mId,max,coords);
    
    }else{
    return false;
    }
    
    }else{
    return false;
    }
    
    
    


				       }
  		    });
}
function getMerchantInfo(doc)
{
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
	  
          return [numMerchants, carryCap];
          
          
        }
      }
      return false;

}

function getResourceInfo(doc)
{

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
     return false;
      }
      
  }
  return resource.reverse();

}
function getResourceInfoMax(doc)
{

resource = new Array();
for(x=2;x>=1;x--)
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
      resource[x] =(res.snapshotItem(0).innerHTML.split('/')[1]);

      }else{
     return false;
      }
      
  }
  return resource.reverse();

}

function printForm(numMerchants,carrycap,wood,clay,iron,wheat,DID, mId,max,coords)
{


td = form.document.getElementById(DID);

td.innerHTML = '<fieldset id="fieldset_'+DID+'" style="border-color:green; color:green;">'+
'<legend>'+getVillageName(DID)+'<input type="checkbox" name="active" id="active_'+DID+'" value="'+DID+'" checked></legend>'+
'<table>'+
'<tr>'+
'<td>Carry capacity:'+carrycap+' </td>'+
'<td>Number of merchants: '+numMerchants+'</td>'+
'</tr>'+
'<tr>'+
'<td>Wood:<input size="6" name="wood" id="wood_'+DID+'"></td>'+
'<td>Clay:<input size="6" name="clay" id="clay_'+DID+'"></td>'+
'<td>Iron:<input size="6" name="iron" id="iron_'+DID+'"></td>'+
'<td>Wheat:<input size="6" name="wheat" id="wheat_'+DID+'"></td>'+
'</tr>'+
'<tr>'+
'<td>X:<input size="1" name="Xs" id="x_'+DID+'"></td>'+
'<td>Y:<input size="1" name="Ys" id="y_'+DID+'"></td>'+
'</tr>'+
'<tr>'+
'<td>Twice<input type="checkbox" name="twice" id="twice_'+DID+'"></td>'+
'</tr>'+
'<tr>'+
'<td><input type="button" name="send" id="send_'+DID+'" value="Send"></td>'+
'</tr>'+
'<tr>'+
'<td><div id="info_'+DID+'">Ready</div></td>'+
'</tr>'+
'</table>'+
'<input type="hidden" name="numMerchants" id="numMerchants_'+DID+'" value="'+numMerchants+'">'+
'<input type="hidden" name="carryCap" id="carryCap_'+DID+'" value="'+carrycap+'">'+
'<input type="hidden" name="Mwood" id="Mwood_'+DID+'" value="'+wood+'">'+
'<input type="hidden" name="Mclay" id="Mclay_'+DID+'" value="'+clay+'">'+
'<input type="hidden" name="Miron" id="Miron_'+DID+'" value="'+iron+'">'+
'<input type="hidden" name="Mwheat" id="Mwheat_'+DID+'" value="'+wheat+'">'+
'<input type="hidden" name="maxR" id="maxR_'+DID+'" value="'+max[0]+'">'+
'<input type="hidden" name="maxW" id="maxW_'+DID+'" value="'+max[1]+'">'+
'<input type="hidden" name="coords" id="'+coords[0] +'|'+ coords[1]+'" value="'+DID+'">'+
'<input type="hidden" id="mId_'+DID+'" value="'+mId+'">'+
'</fieldset>';

form.document.getElementById('wood_'+DID).addEventListener("mouseover", function(){showHoverPopup(this, 'Max: '+wood)}, true);
form.document.getElementById('wood_'+DID).addEventListener("mouseout", function(){hideHoverPopup()}, true);

form.document.getElementById('clay_'+DID).addEventListener("mouseover", function(){showHoverPopup(this, 'Max: '+clay)}, true);
form.document.getElementById('clay_'+DID).addEventListener("mouseout", function(){hideHoverPopup()}, true);

form.document.getElementById('iron_'+DID).addEventListener("mouseover", function(){showHoverPopup(this, 'Max: '+iron)}, true);
form.document.getElementById('iron_'+DID).addEventListener("mouseout", function(){hideHoverPopup()}, true);

form.document.getElementById('wheat_'+DID).addEventListener("mouseover", function(){showHoverPopup(this, 'Max: '+wheat)}, true);
form.document.getElementById('wheat_'+DID).addEventListener("mouseout", function(){hideHoverPopup()}, true);

form.document.getElementById('active_'+DID).addEventListener("click", function(){changeActiveStyle(this.value)}, true);

form.document.getElementById('send_'+DID).addEventListener("click", function(){send(DID)}, true);


}

function changeActiveStyle(DID)
{
fieldset = form.document.getElementById('fieldset_'+DID);
  if (fieldset.style.color == 'green')
  {
  info(DID, "Disabled")
  fieldset.style.color = 'red';
  fieldset.style.borderColor = 'red';
  }else{
  info(DID, "Ready")
  fieldset.style.color = 'green';
  fieldset.style.borderColor = 'green';
  } 
}


function send(DID)
{
info(DID, 'Processing')

X = parseInt(form.document.getElementById('x_'+DID).value,10)
Y = parseInt(form.document.getElementById('y_'+DID).value,10)

wood = parseInt(form.document.getElementById('wood_'+DID).value,10)
clay = parseInt(form.document.getElementById('clay_'+DID).value,10)
iron = parseInt(form.document.getElementById('iron_'+DID).value,10)
wheat = parseInt(form.document.getElementById('wheat_'+DID).value,10)

twice = form.document.getElementById('twice_'+DID).checked

Mwood = parseInt(form.document.getElementById('Mwood_'+DID).value,10)
Mclay = parseInt(form.document.getElementById('Mclay_'+DID).value,10)
Miron = parseInt(form.document.getElementById('Miron_'+DID).value,10)
Mwheat = parseInt(form.document.getElementById('Mwheat_'+DID).value,10)

mId = parseInt(form.document.getElementById('mId_'+DID).value,10)


numMerchants = form.document.getElementById('numMerchants_'+DID).value
carryCap = form.document.getElementById('carryCap_'+DID).value

if(form.document.getElementById(X+'|'+Y))
{
  if(DID == form.document.getElementById(X+'|'+Y).value)
  {
  info(DID, "Error: Can't send to yourself.")
  if(sendall){setTimeout(function(){sendAll()},50)} 
  return;
  }
}

if(IsNumeric(X) && IsNumeric(Y) && IsNumeric(wood) && IsNumeric(clay) && IsNumeric(iron) && IsNumeric(wheat))
{
  if((wood+clay+iron+wheat) > (numMerchants*carryCap))
  {
  info(DID, "Error: Not enough capacity")
  if(sendall){setTimeout(function(){sendAll()},50)}
  return;
  }
  
  overflowCheck = form.document.getElementById('overflow').checked
  if (overflowCheck)
  {
  if(form.document.getElementById(X+'|'+Y))
    {
    
    if(twice)
    {
    wood = wood*2;
    clay = clay*2;
    iron = iron*2;
    wheat = wheat*2;
    }
  
    rDid = form.document.getElementById(X+'|'+Y).value;
  
    //Capacity of the warehouse and granary
    warehouseC = parseInt(form.document.getElementById('maxR_'+rDid).value,10)
    GranaryC = parseInt(form.document.getElementById('maxW_'+rDid).value,10)
    //Amount stored in the village
    rWood = parseInt(form.document.getElementById('Mwood_'+rDid).value,10)
    rClay = parseInt(form.document.getElementById('Mclay_'+rDid).value,10)
    rIron = parseInt(form.document.getElementById('Miron_'+rDid).value,10)
    rWheat = parseInt(form.document.getElementById('Mwheat_'+rDid).value,10)
    //Amount that can be received before overflow
    rWoodC = warehouseC - rWood;
    rClayC = warehouseC - rClay;
    rIronC = warehouseC - rIron;
    rWheatC = GranaryC - rWheat;
    //If the amount to send is to big set it to the max the town can receive
    if(wood>rWoodC){wood = rWoodC}
    if(clay>rClayC){clay = rClayC}
    if(iron>rIronC){iron = rIronC}
    if(wheat>rWheatC){wheat = rWheatC}
    //Add to the amount stored in the village
    form.document.getElementById('Mwood_'+rDid).value = rWood + wood;
    form.document.getElementById('Mclay_'+rDid).value = rClay + clay;
    form.document.getElementById('Miron_'+rDid).value = rIron +iron;
    form.document.getElementById('Mwheat_'+rDid).value = rWheat + wheat;
    
    if(twice)
    {
    wood = wood/2;
    clay = clay/2;
    iron = iron/2;
    wheat = wheat/2;
    }
    
    }else{
    //Unable to do overflow check
    }
  
  }

  
  if(wood < 1 && clay < 1 && iron < 1 && wheat < 1 )
  {
  info(DID, "Error: No resource input")
  if(sendall){setTimeout(function(){sendAll()},50)}
  return;
  }
  
  info(DID, "Sending");
  
  sendResources(DID, wood, clay, iron, wheat, twice, mId, X, Y);


}else{
info(DID, "Error: som(e) values are not numeric")
if(sendall){setTimeout(function(){sendAll()},50)}
}




//msg = "X:"+X+"Y:"+Y+"Wood:"+wood+"Clay:"+clay+"Iron:"+iron+"Wheat:"+wheat+"Twice:"+twice+"Mwood:"+Mwood+"Mclay:"+Mclay+"Miron:"+Miron+"Mwheat:"+Mwheat+"numMerchants:"+numMerchants+"carryCap:"+carryCap;
//alert(msg);

}

function IsNumeric(strString)
   //  check for valid numeric strings	
   {
   var strValidChars = "0123456789-";
   var strChar;
   var blnResult = true;

   if (strString.length == 0) return false;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
   return blnResult;
   }

function info(DID, msg)
{
form.document.getElementById('info_'+DID).innerHTML = msg;
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

function massCords()
{
X = form.document.getElementById('massX').value;
Y = form.document.getElementById('massY').value;

Xs = form.document.getElementsByName('Xs');
Ys = form.document.getElementsByName('Ys');

for(i=0;i<Xs.length;i++)
  {
  Xs[i].value = X;
  Ys[i].value = Y;
  }


}

function massRatios()
{
r_wood = parseFloat(eval(form.document.getElementById('r_wood').value));
r_clay = parseFloat(eval(form.document.getElementById('r_clay').value));
r_iron = parseFloat(eval(form.document.getElementById('r_iron').value));
r_wheat = parseFloat(eval(form.document.getElementById('r_wheat').value));

if(isNaN(r_wood)){ r_wood="0";}
if(isNaN(r_clay)){ r_clay="0";}
if(isNaN(r_iron)){ r_iron="0";}
if(isNaN(r_wheat)){ r_wheat="0";}

wMax = form.document.getElementsByName('Mwood');
cMax = form.document.getElementsByName('Mclay');
iMax = form.document.getElementsByName('Miron');
whMax = form.document.getElementsByName('Mwheat');

nmerchants = form.document.getElementsByName('numMerchants');
thisCCap = form.document.getElementsByName('carryCap');

wood = form.document.getElementsByName('wood');
clay = form.document.getElementsByName('clay');
iron = form.document.getElementsByName('iron');
wheat = form.document.getElementsByName('wheat');

for(i=0;i<wood.length;i++)
  {
  tot = nmerchants[i].value * thisCCap[i].value;
  if (Math.floor(r_wood * tot) < wMax[i].value) {wood[i].value = Math.floor(r_wood * tot);}else{wood[i].value = wMax[i].value }
  if (Math.floor(r_clay * tot) < cMax[i].value) {clay[i].value = Math.floor(r_clay * tot);}else{clay[i].value = cMax[i].value }
  if (Math.floor(r_iron * tot) < iMax[i].value) {iron[i].value = Math.floor(r_iron * tot);}else{iron[i].value = iMax[i].value }
  if (Math.floor(r_wheat * tot) < whMax[i].value) {wheat[i].value = Math.floor(r_wheat * tot);}else{wheat[i].value = whMax[i].value }
  }



}

function massMerchants()
{

m_wood = parseInt(form.document.getElementById('m_wood').value,10);
m_clay = parseInt(form.document.getElementById('m_clay').value,10);
m_iron = parseInt(form.document.getElementById('m_iron').value,10);
m_wheat = parseInt(form.document.getElementById('m_wheat').value,10);

if(isNaN(m_wood)){ m_wood="0";}
if(isNaN(m_clay)){ m_clay="0";}
if(isNaN(m_iron)){ m_iron="0";}
if(isNaN(m_wheat)){ m_wheat="0";}


wood = form.document.getElementsByName('wood');
clay = form.document.getElementsByName('clay');
iron = form.document.getElementsByName('iron');
wheat = form.document.getElementsByName('wheat');

thisCCap = form.document.getElementsByName('carryCap');
nmerchants = form.document.getElementsByName('numMerchants');

for(i=0;i<wood.length;i++)
  {
  wood[i].value = (m_wood * thisCCap[i].value);
  clay[i].value = (m_clay * thisCCap[i].value);
  iron[i].value = (m_iron * thisCCap[i].value);
  wheat[i].value = (m_wheat * thisCCap[i].value);
  
  
  }


}
function twiceToggle()
{
checkBoxes = form.document.getElementsByName('twice');
  for (x=0;x<checkBoxes.length;x++)
  {
  if (checkBoxes[x].checked){checkBoxes[x].checked = false}else{ checkBoxes[x].checked = true}
  }

}

var sendloopcount = 0;

sendall = false;
function sendAll()
{
sendall = true;

sendAllCounter = form.document.getElementById('sendAllCounter');
button = form.document.getElementsByName('send');
active = form.document.getElementsByName('active');



if (sendloopcount<button.length)
  {
  sendAllCounter.innerHTML = "Processing:" + (sendloopcount+1) +' of '+ button.length;
  
  if(active[sendloopcount].checked)
    {
    button[sendloopcount].click();
    sendloopcount++;
    return;
    }else{
      sendloopcount++;
      setTimeout(function(){sendAll()},50)
      return;
      }

  }else{
    sendAllCounter.innerHTML = "Done processed "+ button.length+ " shipments";
    sendall = false;
    sendloopcount = 0;
    return;
    }
}

function refresh()
{
villages = getVillageList()
numVillages = villages.length;

//Remove old info
for(x=0;x<numVillages;x++)
{
td = form.document.getElementById(villages[x]);
td.innerHTML = '';
}
//Get new info
for(x=0;x<numVillages;x++)
{
getInfo(villages[x]);
}

}

GM_registerMenuCommand( "Set additional marketplace targets", MPTSetup );

function mpTarget(i)
{
	word = prompt("Set marketplace target " + i + " (format: Villagename|Xcoord|Ycoord)\nPress Cancel to delete the old village.",GM_getValue('marketplaceTarget'+i, ''));
	if (word==null) {
	  GM_setValue('marketplaceTarget' + i, "");
	  return false;
	}
	GM_setValue('marketplaceTarget' + i, word);
	return true;
}

document.addEventListener("keydown",MPhotKeys,true); 

function MPTSetup() {
	var i = 0;
  for (i=1;i<=5;i++) {
  	 if (mpTarget(i)!=true) break;
  }
}

function MPhotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==0)&&(event.ctrlKey==1))) 
        {
            if(event.keyCode==77)                   //m
            {
							MPTSetup();
            }
        }
}

function predefinedMassRatios(w,c,i,wh)
{
tot = w+c+i+wh;

form.document.getElementById('r_wood').value = w + '/' + tot;
form.document.getElementById('r_clay').value = c + '/' + tot;
form.document.getElementById('r_iron').value = i + '/' + tot;
form.document.getElementById('r_wheat').value = wh  + '/' + tot;
}