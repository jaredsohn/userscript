// ==UserScript==
// @name          Travian: Attack builder
// @description   Attack builder - MøffVersion
// @include       *travian*dorf1.php*
// ==/UserScript==

var targetSplit = "|";
var cordsSplit = ",";

timerIntervalId = 0;

//start variabler 
var DID = getActiveDid();
var timedAttacktimer = false;
cordN = 1;
var nthWave = 1;
firstRun = true;
wavesSent = 0;
nThisWave = 0;
numberattacks = 0;
var totalattacks = 0;
var troops = new Array();
var totTroops = new Array();
var cord;
var Race = getRace();
var delay = 1;
var fillOut = new Array();
var fillOutTemp = new Array();
var code = new Array();
nwave = 0;

var attackurl =  document.location.href.split('?')[0].replace('dorf1','a2b');

  
function getNumber(tekst)
{
 var terug;
 //alert(tekst.indexOf("'")+1+"      "+tekst.lastIndexOf("'"));
 if((tekst.indexOf("=")+1 ) == 0 &&  tekst.lastIndexOf(";") == -1)
 {
  return 0;
 }else
 {
  return tekst.substring(tekst.indexOf("=")+1, tekst.indexOf(";"));
 }
}

function Random(minimum, maximum)
{ 
 if(minimum == null && maximum == null )
 {
  minimum = 1000;
  maximum = 10000;
 }
 return Math.random()*(maximum-minimum+1);
  
};


/////////////////////////////////////////////////
/////////////////Angrep//////////////////////////
/////////////////////////////////////////////////

function attack(Nwave){
  saveList();
  cord = myFarmArea.innerHTML.split("\n");
  c = document.getElementById('typeAttack').value;
  check=false;
 
  if (firstRun){
  
  
  troops = dorf1UnitStats();
  code = troops.split("|");
  var type1 = code[0];
  var type2 = code[1];
  var type3 = code[2];
  var type4 = code[3];
  var type5 = code[4];
  var type6 = code[5];
  var type7 = code[6];
  var type8 = code[7];

  fillOut = myFarmArea.innerHTML.split("\n");
  
   
  for(i=0;i<cord.length;i++){
   fillOut[i] = fillOut[i].split("|");
   fillOut[i][0] = fillOut[i][0].split(",");
   fillOut[i][1] = fillOut[i][1].split(",");
   if(  parseInt(fillOut[i][1][0]) > parseInt(type1) ||
     parseInt(fillOut[i][1][1]) > parseInt(type2) ||
     parseInt(fillOut[i][1][2]) > parseInt(type3) ||
     parseInt(fillOut[i][1][3]) > parseInt(type4) ||
     parseInt(fillOut[i][1][4]) > parseInt(type5) ||
     parseInt(fillOut[i][1][7]) > parseInt(type8))
     
   {
    errorMsg("Not enough troops");
      abort();
   }else{
    check="true";
   }
  }
 if (!check)
  {
  errorMsg("check false");
  abort();
  return;
  }


totalattacks = cord.length;
firstRun = false;
addCount("<b>Starting</b>");
 var xcord;
 var ycord;
 var postvar;
 Nwave=0;
}


nwave=Nwave;
if(nwave<=totalattacks){
        //alert("før fejl");
 //xcord = fillOut[nwave][0][0];
 //ycord = fillOut[nwave][0][1];
 //alert("efter fejl");
 var url = attackurl + '?' +DID;
 postvar = 'b=1&t1='+ fillOut[nwave][1][0] +'&t3='+ fillOut[nwave][1][1] +'&t6='+ fillOut[nwave][1][2] +'&t7='+ fillOut[nwave][1][3] +'&t8='+ fillOut[nwave][1][4] +'&t11='+ fillOut[nwave][1][7]+'&c='+ c +'&dname=&x='+fillOut[nwave][0][0]+'&y='+fillOut[nwave][0][1]+'&s1=ok';
 //alert(nwave+":"+totalattacks+":"+postvar);
 //alert(postvar);
 post(url, postvar, fillOut[nwave][0][0], fillOut[nwave][0][1], fillOut[nwave][1][5], fillOut[nwave][1][6]);
 nwave++;
 
 if(fillOut[nwave][2][0]=="Clean" || fillOut[nwave][2][0]=="Pult1" || fillOut[nwave][2][0]=="Pult2"){
 setTimeout(function(){attack(nwave)},100); 
 }else if(fillOut[nwave][2][0]=="Clean2" || fillOut[nwave][2][0]=="Pult21" || fillOut[nwave][2][0]=="Pult22" ){
 setTimeout(function(){attack(nwave)},100); 
 }else{
 setTimeout(function(){attack(nwave)},Random(400,650));
 }


 
}else{
alert("stopped");
return;
}

}




////////////////////////////////////////////////////




function post(url, data, xcord, ycord,kat, kat2) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
      {
 pulled = document.createElement('div');
   pulled.innerHTML = responseDetails.responseText; 
 
 idValue = getValue(pulled, 'id');
 aValue = getValue(pulled, 'a');
 cValue = getValue(pulled, 'c');
 kidValue = getValue(pulled, 'kid');
 t1Value = getValue(pulled, 't1');
 t3Value = getValue(pulled, 't3');
 t6Value = getValue(pulled, 't6');
 t7Value = getValue(pulled, 't7');
 t8Value = getValue(pulled, 't8');
 t11Value = getValue(pulled, 't11');
 
if (!idValue && !aValue && !cValue && !kidValue)
{
alert('id:'+idValue + 'a:'+ aValue + 'c'+ cValue + 'kid'+ kidValue);
errorMsg("(" + xcord +',' + ycord + ") Probably bad cords."  );
return;
}


var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t3='+t3Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t11='+t11Value;
if (kat != 0){postData = postData + '&kata='+kat;}
if (kat2 != 0){postData = postData + '&kata2='+kat2; } 
postData = postData + '&s1=ok&attacks=&cords=';
  
post2(url, postData);
//setTimeout(function(){alert(Random(1000,2000));},Random(1000,2000));
    }
  });
}

function post2(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
 
 numberattacks++;
 
 //alert();
 if (numberattacks < totalattacks)
 {
   addCount(".");
 }else{


        urlFinished = "http://" + document.domain + "/build.php?id=39";
     addCount(". <a href=" + urlFinished + ">Done</a>");  //legg inn delay her 
      //resetting the start values
      //pausecomp(Random(500,1500));
      abort();
      //setTimeout(window.location.reload(),1000); 
  
  
   //alert(numberattacks);
   }    
  
  }
  });
}



/////////////////////////////////////////////////
/////////////////interface///////////////////////
/////////////////////////////////////////////////

//addInfoDiv()



targetLogo = "<img src=data:image/gif,GIF89a%0F%00%0F%00%F7%00%00%00%00%00%FF%FF%FF%CC%00%00%CB%00%00%CA%00%00%C9%00%00%C8%00%00%C7%00%00%CC%01%01%CC%03%03%CB%03%03%C9%03%03%CD%05%05%CB%05%05%CC%06%06%CB%06%06%CE%07%07%CC%08%08%CE%09%09%CB%09%09%CE%0A%0A%CD%0B%0B%CF%0D%0D%CC%0D%0D%CF%0E%0E%CD%0E%0E%CF%11%11%CD%11%11%D0%12%12%CF%13%13%D0%15%15%CF%15%15%D1%17%17%D1%18%18%D1%19%19%CF%19%19%D2%1A%1A%D1%1B%1B%D2%1D%1D%D3%1F%1F%D3%20%20%D3%23%23%D2%24%24%D4))%D4%2B%2B%D4%2C%2C%D6%2F%2F%D5%2F%2F%D500%D611%D622%D744%D777%D888%D788%D8%3B%3B%D8%3D%3D%D9%3F%3F%D9CC%DAEE%DAGG%DBII%DBKK%DCLL%DBMM%DBNN%DDTT%DDWW%DEXX%DF%5B%5B%DF%5C%5C%DF%5E%5E%E0__%E0aa%DF%60%60%E0bb%E1gg%E0hh%E2kk%E1kk%E2ll%E3oo%E3pp%E3rr%E3tt%E4ww%E4xx%E4zz%E5%7C%7C%E5~~%E6%7F%7F%E6%80%80%E6%82%82%E7%84%84%E8%86%86%E7%87%87%E8%88%88%E7%88%88%E8%8A%8A%E7%8B%8B%E9%8F%8F%E9%90%90%EA%93%93%E9%92%92%EA%95%95%EB%97%97%EB%99%99%EB%9A%9A%EC%9B%9B%EC%9D%9D%EC%9E%9E%EB%9D%9D%EB%9E%9E%EC%A0%A0%EC%A3%A3%ED%A4%A4%ED%A9%A9%EF%AB%AB%EF%AD%AD%EF%AF%AF%EF%B1%B1%F0%B3%B3%EF%B2%B2%F0%B4%B4%F1%B9%B9%F1%BB%BB%F2%BD%BD%F1%BD%BD%F2%BF%BF%F2%C0%C0%F4%C4%C4%F3%C3%C3%F3%C5%C5%F4%C7%C7%F4%C8%C8%F5%CA%CA%F5%CD%CD%F5%CF%CF%F6%D1%D1%F6%D2%D2%F7%D5%D5%F8%D8%D8%F7%D7%D7%F7%D8%D8%F8%DA%DA%F8%DC%DC%F8%DE%DE%FA%E1%E1%F9%E1%E1%FA%E3%E3%F9%E2%E2%FA%E4%E4%FA%E5%E5%FA%E7%E7%FB%EA%EA%FA%E9%E9%FC%ED%ED%FB%EC%EC%FC%EF%EF%FB%EE%EE%FC%F0%F0%FD%F3%F3%FD%F4%F4%FE%F6%F6%FE%F8%F8%FD%F7%F7%FE%F9%F9%FE%FB%FB%FF%FD%FD%FF%FE%FE%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%0F%00%0F%00%00%08%81%00%03%08%0C%80%A8%09%0C%185%9A%20%1A%C8%10%86%80%87%10%05%C0%60%18%00%E2%81%845%0E%40%1C%E8P%40%13%8AM%1E%8E%20%F8%F0%23%C5%00!%05%B0%C9%F2P%20%22%87%23%16%06%18%E1%11%C6E%81%1D%5B%06p%F2%D0%A1%C9%88%02%04%A2yxB%22N%01%1A%83%06%F8%F1%90%A5%D2%00%40%24%CA%2C%89H%E3%C4%93!%0F%E4%09%D0%11%08H%91%03%91B%04RT%ECW%A0FObBS%03!%1A%99%02%03%02%00%3B>"


var startIcon = (getRace()*10)+1;

var table = "<fieldset><legend>Wave setup:</legend><table id=\"myTable\"><tr></td>#*</td>";

for (var count = startIcon;count<startIcon+9;count++) //icons 
{
    table += "<td><img src=\"/img/un/u/" + count + ".gif\"></td>";
     
}
table += "<td><img src=\"/img/un/u/hero.gif\"></td>";
table += "<td>" + targetLogo + "</td><td>" + targetLogo + "</td>";
table += "</tr></table><button id=newWaveButton>Add new wave</button><button id=\"resetButton\">Reset</button></fieldset>";




//var interfaceStart = document.evaluate(  
//"//p[input[@name='s1'][@value='ok']]",
//    document,
//    null,
//    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    //null);
  var lright1DIV = document.createElement('div');
  var lmidlcDIV = document.getElementById('lplz1');
  
  lright1DIV.setAttribute('id','lright1');
 // rightSidebar = lmidlcDIV.parentNode.appendChild(lmidlcDIV);

rightSidebar = lmidlcDIV.parentNode.appendChild(lright1DIV);


//var  waveInterfaceElement = document.createElement("div");
//waveInterfaceElement.innerHTML = table;
//interfaceStart = interfaceStart.snapshotItem(0);


//interfaceStart.appendChild(waveInterfaceElement);
//addNewWave();

//attack interface 



var tekst = document.URL;
 
 tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
 tekst = tekst+getOwn();

var  attackInterface = document.createElement("div");
attackInterface.innerHTML = '<fieldset><legend>Angriffsetup:</legend><table><tr><td><div id=start>' +
 
  '<table><tr><td>Angriffstyp:</td></tr>'+
  '<tr><td>'+
  'Status:</td><td>' +
  '<div id=\"count\"></div>' +
  '<div id=\"err\"></div>' +
  '</td></tr><td>'+
  '<button id=\"myFarmabutton\" >Angriffe starten</button>' +
  '</td><td>' +
  '<div id=\"arrivalTimeDiv\"></div>'+
  '</td></tr><tr><td>' +
  '<button id=\"arrivalTime\">Suche Ankunftszeit</button>'+
  '</td><td>' +
  '<input id=\"timedArrivalInput\" value=\"hh:mm:ss"><button id=\"setTimeButton\">Starte Timer</button>' + 
  '</td></tr>' +
  '<tr><td colspan=\"2\">' +
  'Angriffstyp:<select name=\"typeAttack\" id=\"typeAttack\">' +
  '<option value=\"3\">Normaler Angriff</option>' +
  '<option value=\"4\">Raubzug</option>' +
  '</select>' +
  '</td></tr>' +
  '<tr><td  colspan=\"2\">' +
  'X,Y|Keulis,Axtis,Teuts,Rammen,Katas,Ziel1,Ziel2,Held|Name' +
  '</tr>' +
  '<tr><td  colspan=\"2\">' +
  '<textarea id=\"Coordlist\" style=\"top:0px;left:850px;width:400px;height:100px;\"></textarea></td>' +
  '</tr>' +
  '</table>' 
   
  

rightSidebar.appendChild(attackInterface);


//angrepsbølge interface 


function popup(id)
{
select =   '<form><select id=\"popup_' + id + '\" size=\"\" \">'+
 '<option value=\"0\">Select a target =)</option><option value=\"99\">Random</option><option value=\"1\">Woodcutter</option><option value=\"2\">Clay Pit</option><option value=\"3\">Iron Mine</option><option value=\"4\">Wheat Field</option><option value=\"5\">Sawmill</option><option value=\"6\">Brickworks</option><option value=\"7\">Iron Foundry</option><option value=\"8\">Flour Mill</option><option value=\"9\">Bakery</option><option value=\"10\">Warehouse</option><option value=\"11\">Granary</option><option value=\"12\">Blacksmith</option><option value=\"13\">Armory</option><option value=\"14\">Tournament Square</option><option value=\"15\">Main Building</option><option value=\"16\">Rally Point</option><option value=\"17\">Marketplace</option><option value=\"18\">Embassy</option><option value=\"19\">Barracks</option><option value=\"20\">Stable</option><option value=\"21\">Siege Workshop</option><option value=\"22\">Academy</option><option value=\"24\">Town Hall</option><option value=\"25\">Residence</option><option value=\"26\">Palace</option>'+
 '<option value=\"28\">Trade Office</option></option><option value=\"29\">Great Barracks</option><option value=\"30\">Great Stable</option><option value=\"37\">Hero\'s Mansion</option><option value="38">Great Warehouse</option><option value="39">Great Granary</option><option value="40">Wonder of the World</option>'+
 '</select></form>';


eval("window" + id + " = window.open('', '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=200,height=20');");
if (!eval("window" + id).document.getElementById('thatDiv'))
{
div = "<div id=\"thatDiv\">Loading..O</div>";
eval("window" + id).document.write(div);
}
thatDiv = eval("window" + id).document.getElementById('thatDiv');
thatDiv.innerHTML = select;

if (window.focus) {eval("window" + id).focus()}

element = eval("window" + id).document.forms[0].elements[0];
element.addEventListener("change", function() { test(id) }, true);

function test(id){
field = document.getElementById(id);
field.innerHTML = "<option value=\"" + element.options[element.selectedIndex].value + "\">" + element.options[element.selectedIndex].value + "</option>";
eval ("window" +id + ".close()");
}

}

/////////////////////////////////////////////////
/////////////////Events//////////////////////////
/////////////////////////////////////////////////

function saveList(){
myFarmArea.innerHTML = myFarmArea.value; 
}

var myFarmArea = document.getElementById('Coordlist');

var myimbabutton = document.getElementById('myFarmabutton');
myimbabutton.addEventListener("click", attack, true);

//var SaveButton = document.getElementById('SaveB');
//SaveButton.addEventListener("click", saveList, true);

var arrivalButton = document.getElementById('arrivalTime');
arrivalButton.addEventListener("click", getArrivalTime, true);

var timedArrivalButton = document.getElementById('setTimeButton');
timedArrivalButton.addEventListener("click", setArrivalTimer, true);


//document.addEventListener("keydown", function(){hotKeys(event)},true);
//document.addEventListener("keydown",hotKeys,true); 

/////////////////////////////////////////////////
/////////////////misc////////////////////////////
/////////////////////////////////////////////////

function getRace()
{
var ex = "//img[contains(@src,'1.gif')][@class='unit']";
 result = document.evaluate( 
   ex,
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
if (result.snapshotLength)
  {
  src = result.snapshotItem(0).src;
  if (src.match("/21.gif")){
  return 2; //gaul 
  }else if(src.match("/11.gif")){
    return 1; //teutons 
      }else if(src.match("/1.gif")){
        return 0; //Romans
          }
  } 
}

function getTotalUnit(t)
{
var ex = "//a[contains(@OnClick,'" + t + "')][@href='#']";
 result = document.evaluate( 
   ex,
     document,
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


function errorMsg (msg)
{
errDiv = document.getElementById('err');
errDiv.innerHTML = errDiv.innerHTML +  "<br><b>ERROR:</b>" + msg;
}


function getActiveDid()
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
 errorMsg("Unable to get active village.");
  return "";
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






function addCount(msg)
{
countDiv = document.getElementById('count');
countDiv.innerHTML = countDiv.innerHTML + msg;
}



function getCords()
{
var tempX = document.getElementsByName('x');
var tempY = document.getElementsByName('y');
if (tempX.length)
{
  if (tempX[0].value.length && tempY[0].value.length)
  {
  return tempX[0].value + "," + tempY[0].value;
  }else{
  return '';
  }
  }
  return;
}


function addInfoDiv()
{
var infoDiv = document.createElement("div");
infoDiv.innerHTML = "<div><div id=\"err\"></div><br><br><div id=\"count\"></div></div>" 
thisDiv = document.getElementById('lplz1');
thisDiv.appendChild(infoDiv);
}

function setArrivalTimer()
{
getArrivalTime();
timedAttacktimer = document.getElementById('timedArrivalInput').value;
addCount("Timed arrival set at:" + timedAttacktimer); 
}

function abort()
{
setTimeout(function(){realAbort()},500);
}

function realAbort ()
{
firstRun = true;
nwave = 0;
wavesSent = 0;
numberattacks = 0;
totalattacks = 0;
myimbabutton.innerHTML = "Whoop some ass =)"
}

function getCheckTroops()
{
  saveList()
  check=false;
  cord = myFarmArea.innerHTML.split("\n");
 
  troops = dorf1UnitStats();
  code = troops.split("|");
  var type1 = code[0];
  var type2 = code[1];
  var type3 = code[2];
  var type4 = code[3];
  var type5 = code[4];
  var type6 = code[5];
  var type7 = code[6];
  var type8 = code[7];

  fillOutTemp = myFarmArea.innerHTML.split("\n");
  
   
  for(i=0;i<cord.length;i++){
   fillOutTemp[i] = fillOutTemp[i].split("|");
   fillOutTemp[i][0] = fillOutTemp[i][0].split(",");
   fillOutTemp[i][1] = fillOutTemp[i][1].split(",");
   if(  parseInt(fillOutTemp[i][1][0]) > parseInt(type1) ||
     parseInt(fillOutTemp[i][1][1]) > parseInt(type2) ||
     parseInt(fillOutTemp[i][1][2]) > parseInt(type3) ||
     parseInt(fillOutTemp[i][1][3]) > parseInt(type4) ||
     parseInt(fillOutTemp[i][1][4]) > parseInt(type5) ||
     parseInt(fillOutTemp[i][1][7]) > parseInt(type8))
     
   {
    errorMsg("Not enough troops");
      abort();
   }else{
    check="true";
   }
  }
  if (!check)
  {
  errorMsg("check false");
  abort();
  return;
  }
}


function getArrivalTime(tempWaveNumber)
{
getCheckTroops()
c = document.getElementById('typeAttack').value;
var tempUrl = attackurl + '?' +DID;
var tempPostvar = 'b=1&t1='+ fillOutTemp[0][1][0] +'&t3='+ fillOutTemp[0][1][1] +'&t6='+ fillOutTemp[0][1][2] +'&t7='+ fillOutTemp[0][1][3] +'&t8='+ fillOutTemp[0][1][4] +'&t11='+ fillOutTemp[0][1][7]+'&c='+ c +'&dname=&x='+fillOutTemp[0][0][0]+'&y='+fillOutTemp[0][0][1]+'&s1=ok';


  GM_xmlhttpRequest({
    method: "POST",
    url: tempUrl,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(tempPostvar),
    onload: function(responseDetails) 
      {
 pulled = document.createElement('div');
  pulled.innerHTML = responseDetails.responseText;

  var ex = ".//span[@id='tp2']";
tag = document.evaluate( 
   ex,
     pulled,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
if (tag.snapshotLength)
  {
 document.getElementById('arrivalTimeDiv').innerHTML = 'Arrive at:' + tag.snapshotItem(0).innerHTML;
 referenceTime = new Date().getTime();
 clearInterval(timerIntervalId);
 timerIntervalId = setInterval(function(){arrivalCounter()},1000);
    arrivalCounter();
 }else{
  alert("error");
  }
    }
  });
}

function arrivalCounter()
{
diffTime = Math.round((new Date().getTime() - referenceTime)/1000);
if (diffTime >= 1)
{
 count = document.getElementById('arrivalTimeDiv').innerHTML.split(':');
 hours = count[1];
 minutes = count[2];
 seconds = count[3];
seconds = parseInt(seconds,10) + parseInt(diffTime,10);
 if (seconds >= 60)
 {
 minutes++;
 seconds = seconds - 60;
 }
 if (minutes >= 60)
 {
 hours++
 minutes = minutes - 60;
 }
 if (hours >= 24)
 {
 hours = 0;
 }

 seconds = seconds.toString(); 
 minutes = minutes.toString(); 
 hours = hours.toString(); 
 seconds = seconds.replace(/\b(\d)\b/g, '0$1');
 minutes = minutes.replace(/\b(\d)\b/g, '0$1');
 hours = hours.replace(/\b(\d)\b/g, '0$1');
  
if (timedAttacktimer)
{

  tTimer = timedAttacktimer.split(':');
  if (tTimer.length == 3)
    {
    tSeconds = tTimer[2]
    tMinutes = tTimer[1]
    tHours = tTimer[0]

    //errorMsg(tSeconds + ":" + tMinutes + ':' + tHours);

    if (tHours == hours && tMinutes == minutes && tSeconds == seconds)
      {
      myimbabutton.click();
      timedAttacktimer = false;
    }
  }
}
document.getElementById('arrivalTimeDiv').innerHTML = 'Arrival time:' + hours + ":" + minutes + ":" + seconds;  
referenceTime = new Date().getTime();
}
}

function hotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==1)&&(event.ctrlKey==0)))  //If Shift & Alt keys are pressed but Ctrl isn't
        {
            if(event.keyCode==74)                   //If j key was pressed
            {
                alert("test");
            }
        }
    
//keynum = event.which
//keychar = String.fromCharCode(keynum)
//alert(keychar);
}

function typeFromUId(uId)
{
switch(uId){
 case 11:
 return 1;
 break;
 case 12:
 return 2;
 break;
 case 13:
 return 3;
 break;
 case 14:
 return 4;
 break;
 case 15:
 return 5;
 break;
 case 16:
 return 6;
 break;
 case 17:
 return 7;
 break;
 case 18:
 return 8;
 break;
 case 19:
 return 9;
 break;
 case 20:
 return 10;
 }
}

function dorf1UnitStats() {
        // Get the div element containing the units
        var uDiv = document.getElementById("ltrm")
        
        // Get all rows containing units
        var uRows = uDiv.getElementsByTagName("TR");
        
        // Return if there are no units
        var nRows = uRows.length;
        if (nRows < 1) return;
        
        // Will contain unit objects ie. {id: 17; count: 225}
        var aUnits = new Array();
        
        // Iterate through the rows
        var t1=0;
        var t2=0; 
        var t3=0; 
        var t4=0; 
        var t5=0; 
        var t6=0; 
        var t7=0; 
        var t8=0; 
        var t9=0; 
        var t10=0; 
        var t11=0;        
        for (var i = 0; i < nRows; i++) {
            // Get the columns in the row
            var columns = uRows[i].getElementsByTagName("TD");
            
            // Extract the unit type from the gif used in the first column
            var innerHTML = String(columns[0].innerHTML);
            
            var uID = parseInt(innerHTML.match(/(\d*).gif/)[1]);
            
            // Dont add defensive units and scouts units (Only modifyied for teutons.. !)
            var oDontCount = {"4": true, "7": true, "8": true, "9": true, "10": true, "12": true, "14": true, "15": true, "19": true, "20": true,"23": true, "27": true, "28": true, "29": true, "30": true,};
           
            // The hero's picture is called hero.gif, which is not a number. Since we can't calculate the heroes stats we just ignore her
            if (oDontCount[uID]) continue;
            
            // Extract the number of units of the current type from the second column
            innerHTML = String(columns[1].innerHTML);
            var nUnits = parseInt(innerHTML.match(/\d+/)[0]);
            
            // Create a new unit object containing the id of the unit and the unit count
            if(parseInt(typeFromUId(uID))==1){
             t1=nUnits;
            }else if(parseInt(typeFromUId(uID))==3){
             t2=nUnits;
            }else if(parseInt(typeFromUId(uID))==6){
             t3=nUnits;
            }else if(parseInt(typeFromUId(uID))==7){
             t4=nUnits;
            }else if(parseInt(typeFromUId(uID))==8){
             t5=nUnits;
            }else if(uID="hero"){
             t8=nUnits;
            }
            //aUnits.push({t: typeFromUId(uID), count: nUnits});
        }
           //alert(aUnits[2].t + 'df' + aUnits[2].count);
           var tstring = t1+'|'+t2+'|'+t3+'|'+t4+'|'+t5+'|'+t8;
        //alert(tstring);
           return tstring;
        // Get to total stats
        /*var aTotalStats = calculateUnitStats(aUnits);
        
        var prevDiv = document.getElementById("lrpr");
        var targetDiv = document.createElement("DIV");
        targetDiv.style.cssFloat = "left";
        targetDiv.style.left = "49px";
        targetDiv.style.top = "0px";
        targetDiv.style.width = prevDiv.offsetWidth + "px";
        targetDiv.style.paddingTop = "10px";
        targetDiv.style.paddingBottom = "10px";
        targetDiv.style.position = "relative";
        
        
        var table = document.createElement("TABLE");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("cellpadding", "0");
        var tBody = document.createElement("TBODY");
        table.appendChild(tBody);
        
        // Icons for attach, defensive vs. infantry and defense vs. cavalry
        var aIcons = new Array({src: "att_all.gif", alt: "AngrebsvÃ¦rdi"}, {src: "def_i.gif", alt: "Forsvar mod infantri"}, {src: "def_c.gif", alt: "Forsvar mod kavalleri"});
        
        //Create rows for title, icons and stats
        var titleRow = document.createElement("TR");
        var titleColumn = document.createElement("TD");
        titleColumn.setAttribute("colspan", "3");
        titleColumn.innerHTML = "<b>Samlet militÃ¦r styrke</b>";
        titleRow.appendChild(titleColumn);
        
        var iconRow = document.createElement("TR");
        iconRow.setAttribute("align", "center");
        var statRow = document.createElement("TR");
        statRow.setAttribute("align", "center");
        
        // Insert the rows in the table body
        tBody.appendChild(titleRow);
        tBody.appendChild(iconRow);
        tBody.appendChild(statRow);
        
        for (var i = 0; i < aIcons.length; i++) {
            // Create a row to hold icon and stat
            //var row = document.createElement("TR");
                
            // Create the icon and stat column
            var tdIcon = document.createElement("TD");
            var tdStat = document.createElement("TD");
            
            // Create the icon
            // Create an image element
            var icon = document.createElement('IMG');
            
            // Set the source attribute
            icon.setAttribute("src", img("a/" + aIcons[i].src, false));
            
            // Set the alt attribute
            icon.setAttribute('alt', aIcons[i].alt);
            
            // Insert the icon
            tdIcon.appendChild(icon);
            
            // Insert the icon column
            iconRow.appendChild(tdIcon);

            // Set the stat
            tdStat.innerHTML = aTotalStats[i];
            
            // Insert the stat column
            statRow.appendChild(tdStat);
        }
     
        targetDiv.appendChild(table);
        insertAfter(prevDiv, targetDiv);
        */
    }
    
    function getOwn()
 {
 var code = document.getElementById('lright1').innerHTML;

 code = code.substring(code.indexOf("class=\"active_vl\"")+1);
 //alert (code.substr(code.indexOf(">("),code.indexOf("center dlist2")));
 var x = code.substring(code.indexOf(">(")+2, code.indexOf("center dlist2")-17);
 var y = code.substring(code.indexOf("left dlist3")+13, code.indexOf(")"));;
 //alert (x+"|"+y);
 return (x+y);
 };