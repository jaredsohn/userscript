// ==UserScript==
// @name          Travian: Attack builder
// @description   Attack builder - m4rtini (m4rtini89@gmail.com)
// @include       *travian*a2b.php*
// ==/UserScript==

var targetSplit = "|";
var cordsSplit = ",";

timerIntervalId = 0;

addInfoDiv()


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
  var referenceTime;


function reset() 
{
abort();
nthWave = 1;

waveInterfaceElement.innerHTML = table;
addNewWave();

var newWaveButton = document.getElementById('newWaveButton');
newWaveButton.addEventListener("click", addNewWave, true);

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", reset, true);

}

/////////////////////////////////////////////////
/////////////////Angrep//////////////////////////
/////////////////////////////////////////////////

function attack(WavesSent)
{
if (firstRun)
{
  myimbabutton.innerHTML = "兵力正在调动=)";
  cordN = 1;
  numberOfWaves = nthWave -1;
  wavesSent = 0;
  c = document.getElementById('typeAttack').value;
  cords = document.getElementById('cords').value;
  cord = cords.split(targetSplit);
      spy = false;
      if (c>4)
      {
      spy = c-4;
      c=3;
      }
  if (c>6 || c<2)
  {
  errorMsg("无效的攻击类型!");
  abort()
  return;
  }
  if (!cords)
  {
  errorMsg("未指定攻击目标!")
  abort()
  return;
  }



  for (var num = 0;num<=11;num++) 
  {

  if (num <=10)
  {
  troops[num] = new Array;
   if (!num)
   {
   troop = document.getElementsByName('number');
   }else {
   troop = document.getElementsByName('troop_' + num);
   }
   totTroops[num] = 0;
    for (var x = 0; x < troop.length;x++)
    {
    //alert("x:" +x);
    
    if (!num){totalattacks = totalattacks + parseInt(troop[x].value);}
    totTroops[num] = parseInt(totTroops[num]) + (parseInt(troop[x].value)) * (parseInt(troops[0][x]));
    troops[num][x] = troop[x].value
     }
  }else{
   troops[num] = new Array;
   troops[num+1] = new Array;
        for (var x = 0;x< troop.length; x++)
        {
        troops[11][x] = document.getElementById('gm_kata_' +(x+1) ).value;
        troops[12][x] = document.getElementById('gm_kata2_' +(x+1) ).value;
        }
      }
  }

 check = false;
  for(var x=1;x<=10;x++) //Sjekker om man har nok tropper
  {
  tempX = x;
  if (x==10){tempX++;}
  if (totTroops[x] > getTotalUnit('t'+tempX) ) {errorMsg("没有足够的军队! (军队#" + x+ ")"); abort(); return;}
  if (totTroops[x] > 0) {check = true;}
  }
  if (!check)
  {
  errorMsg("没有安排攻击军队");
  abort();
  return;
  }

  
  totalattacks = totalattacks * cord.length;
  firstRun = false;
  addCount("<b>正在出兵</b>");
  //alert(totalattacks);
}
//alert("wN:" +numberOfWaves);
//alert("wSent:"+wavesSent);
//alert(troops[1][0]);

if (numberOfWaves > wavesSent)
{
//alert("1");


     var targetCord = cord[cordN-1].split(cordsSplit);
	   var xcord = targetCord[0];
	   var ycord = targetCord[1];
	   var url = document.location.href.split('?')[0] + '?' +DID;
     //alert(url); 
	   var postvar = 'b=1&t1='+ troops[1][wavesSent] +'&t4='+ troops[4][wavesSent] +'&t7='+ troops[7][wavesSent] +'&t9='+ troops[9][wavesSent] +'&t2='+ troops[2][wavesSent] +'&t5='+ troops[5][wavesSent] +'&t8='+ troops[8][wavesSent] + '&t10=0' +'&t11='+ troops[10][wavesSent] +'&t3='+ troops[3][wavesSent] +'&t6='+ troops[6][wavesSent] +'&c='+ c +'&dname=&x='+xcord+'&y='+ycord+'&s1=ok';
	   //alert(postvar);
	   post(url, postvar, xcord, ycord, troops[11][wavesSent], troops[12][wavesSent], spy);
	   nThisWave++
	   if (nThisWave >= troops[0][wavesSent]) {wavesSent++; nThisWave = 0;}
	   setTimeout(function(){attack()},200);
}else{
if (cord.length > cordN )
{
cordN++;
nThisWave = 0;
wavesSent = 0;
setTimeout(function(){attack()},200);
}

}
}

////////////////////////////////////////////////////


function post(url, data, xcord, ycord, kat, kat2, spy) {
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
	
if (!idValue && !aValue && !cValue && !kidValue)
{

errorMsg("(" + xcord +',' + ycord + ") 错误的攻击目标."  );
return;
}


	var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value;
  if (kat != 0){postData = postData + '&kata='+kat;}
  if (kat2 != 0){postData = postData + '&kata2='+kat2; }
  postData = postData + '&s1=ok&attacks=&cords=';
  
if (spy)
{
  
	if (Race == 2 && t3Value > 0)
	{
    var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1=0&t2=0&t3=' +t3Value +'&t4=0&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0&s1=ok&attacks=&cords=&spy=' + spy;
  }
  else if (Race != 2 && t4Value >0)
  {
  var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1=0&t2=0&t3=0&t4='+t4Value+'&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0&s1=ok&attacks=&cords=&spy=' + spy;
  }else{
  errorMsg("没有侦察军队");
  return;
  }
}
	
post2(url, postData);
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
	if (numberattacks >= totalattacks)
	  {
	  urlFinished = "http://" + document.domain + "/build.php?id=39";
    addCount(". <a href=" + urlFinished + ">发兵结束</a>");  //legg inn delay her 
      //resetting the start values
      abort()
	 }else{
   addCount(".");
   }    
  
  }
  });
}

/////////////////////////////////////////////////
/////////////////interface///////////////////////
/////////////////////////////////////////////////





targetLogo = "<img src=data:image/gif,GIF89a%0F%00%0F%00%F7%00%00%00%00%00%FF%FF%FF%CC%00%00%CB%00%00%CA%00%00%C9%00%00%C8%00%00%C7%00%00%CC%01%01%CC%03%03%CB%03%03%C9%03%03%CD%05%05%CB%05%05%CC%06%06%CB%06%06%CE%07%07%CC%08%08%CE%09%09%CB%09%09%CE%0A%0A%CD%0B%0B%CF%0D%0D%CC%0D%0D%CF%0E%0E%CD%0E%0E%CF%11%11%CD%11%11%D0%12%12%CF%13%13%D0%15%15%CF%15%15%D1%17%17%D1%18%18%D1%19%19%CF%19%19%D2%1A%1A%D1%1B%1B%D2%1D%1D%D3%1F%1F%D3%20%20%D3%23%23%D2%24%24%D4))%D4%2B%2B%D4%2C%2C%D6%2F%2F%D5%2F%2F%D500%D611%D622%D744%D777%D888%D788%D8%3B%3B%D8%3D%3D%D9%3F%3F%D9CC%DAEE%DAGG%DBII%DBKK%DCLL%DBMM%DBNN%DDTT%DDWW%DEXX%DF%5B%5B%DF%5C%5C%DF%5E%5E%E0__%E0aa%DF%60%60%E0bb%E1gg%E0hh%E2kk%E1kk%E2ll%E3oo%E3pp%E3rr%E3tt%E4ww%E4xx%E4zz%E5%7C%7C%E5~~%E6%7F%7F%E6%80%80%E6%82%82%E7%84%84%E8%86%86%E7%87%87%E8%88%88%E7%88%88%E8%8A%8A%E7%8B%8B%E9%8F%8F%E9%90%90%EA%93%93%E9%92%92%EA%95%95%EB%97%97%EB%99%99%EB%9A%9A%EC%9B%9B%EC%9D%9D%EC%9E%9E%EB%9D%9D%EB%9E%9E%EC%A0%A0%EC%A3%A3%ED%A4%A4%ED%A9%A9%EF%AB%AB%EF%AD%AD%EF%AF%AF%EF%B1%B1%F0%B3%B3%EF%B2%B2%F0%B4%B4%F1%B9%B9%F1%BB%BB%F2%BD%BD%F1%BD%BD%F2%BF%BF%F2%C0%C0%F4%C4%C4%F3%C3%C3%F3%C5%C5%F4%C7%C7%F4%C8%C8%F5%CA%CA%F5%CD%CD%F5%CF%CF%F6%D1%D1%F6%D2%D2%F7%D5%D5%F8%D8%D8%F7%D7%D7%F7%D8%D8%F8%DA%DA%F8%DC%DC%F8%DE%DE%FA%E1%E1%F9%E1%E1%FA%E3%E3%F9%E2%E2%FA%E4%E4%FA%E5%E5%FA%E7%E7%FB%EA%EA%FA%E9%E9%FC%ED%ED%FB%EC%EC%FC%EF%EF%FB%EE%EE%FC%F0%F0%FD%F3%F3%FD%F4%F4%FE%F6%F6%FE%F8%F8%FD%F7%F7%FE%F9%F9%FE%FB%FB%FF%FD%FD%FF%FE%FE%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%0F%00%0F%00%00%08%81%00%03%08%0C%80%A8%09%0C%185%9A%20%1A%C8%10%86%80%87%10%05%C0%60%18%00%E2%81%845%0E%40%1C%E8P%40%13%8AM%1E%8E%20%F8%F0%23%C5%00!%05%B0%C9%F2P%20%22%87%23%16%06%18%E1%11%C6E%81%1D%5B%06p%F2%D0%A1%C9%88%02%04%A2yxB%22N%01%1A%83%06%F8%F1%90%A5%D2%00%40%24%CA%2C%89H%E3%C4%93!%0F%E4%09%D0%11%08H%91%03%91B%04RT%ECW%A0FObBS%03!%1A%99%02%03%02%00%3B>"


var startIcon = (getRace()*10)+1;

var table = "<fieldset><legend>攻击设置:</legend><table id=\"myTable\"><tr></td>#</td>";

for (var count = startIcon;count<startIcon+9;count++) //icons 
{
    table += "<td><img src=\"/img/un/u/" + count + ".gif\"></td>";
     
}
table += "<td><img src=\"/img/un/u/hero.gif\"></td>";
table += "<td>" + targetLogo + "</td><td>" + targetLogo + "</td>";
table += "</tr></table><button id=newWaveButton>增加攻击</button><button id=\"resetButton\">全部还原</button>&nbsp;&nbsp;&nbsp;<span># - 攻击的波数，发兵结束前勿关闭本页。</span></fieldset>";




var interfaceStart = document.evaluate(  
"//p[input[@name='s1'][@value='ok']]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    
null);
var  waveInterfaceElement = document.createElement("div");
waveInterfaceElement.setAttribute("style","font-size:small;");
waveInterfaceElement.innerHTML = table;
interfaceStart = interfaceStart.snapshotItem(0);


interfaceStart.appendChild(waveInterfaceElement);
addNewWave();

//attack interface 





var  attackInterface = document.createElement("div");
attackInterface.setAttribute("style","font-size:small;");
attackInterface.innerHTML = '<fieldset><legend>攻击设置:</legend><table><tr><td><div id=start><table>' +
  '<tr>'+
  '<td>坐标</td>'+
  '<td>'+
  '<input type=\"text\" value=\"' +getCords() +  '\" name=\"cords\" id=\"cords\" />' +
  '</td>'+
  '<td>攻击类型:</td>'+
  '<td>'+
  '<select name=\"typeAttack\" id=\"typeAttack\">' +
  '<option value=\"3\">普通攻击</option>' +
  '<option value=\"2\">增援</option>' +
  '<option value=\"4\">抢夺攻击</option>' +
  '<option value=\"5\">侦察资源/军事</option>' +
  '<option value=\"6\">侦察防御/军事</option>' +
  '</select>' +
  '</td>'+
  '</tr>'+
  '<tr>'+
  '<td colspan=3>用竖线分隔多村,逗号分隔坐标,如0,0|1,1</td>'+
  '<td><button id=\"myimbabutton\">立即出动兵力=)</button></td>'+
  '</tr>'+
  '<tr>'+
  '<td>&nbsp;</td>'+
  '<td><button id=\"arrivalTime\">计算准确到达时间-&gt;</button></td>'+
  '<td align=\"right\">准确到达时间:</td><td><div id=\"arrivalTimeDiv\"></div><td>'+
  '</tr>'+
  '<tr>'+
  '<td>计划</td>'+
  '<td><button id=\"timedArrivalButton\">预设攻击到达时间-&gt;</button></td>'+
  '<td colspan=2><input id=\"timedArrivalInput\" value=\"hh:mm:ss\"></td>'+
  '</tr>'+
  '</table>';

interfaceStart.appendChild(attackInterface);


//angrepsbølge interface 
function addNewWave()
{
newRow = document.createElement('tr');
  col = document.createElement('td');
  col.style.width = '2px';
  input ="<input size=\"1\" maxlengt=\"6\" type=\"text\" name=\"number\" value=\"1\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
  
for (var i=1;i<=9;i++)
  {
  if (i>6)
  {
    col = document.createElement('td');
    col.style.width = '28px';
  input ="<input style=\"width: 90%\" size=\"2\" maxlengt=\"6\" type=\"text\" name=\"troop_" + i + "\" value=\"0\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
  }else{
  col = document.createElement('td');
  col.style.width = '34px';
  input ="<input size=\"2\" maxlengt=\"6\" type=\"text\" name=\"troop_" + i + "\" value=\"0\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
    }
  }
  
  col = document.createElement('td');
  col.style.width = '1px';
  input ="<input style=\"width: 90%\" size=\"1\" maxlengt=\"6\" type=\"text\" name=\"troop_10\" value=\"0\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
  
  col = document.createElement('td');
  select = '<select id="gm_kata_' + nthWave + '" name="gm_kata_' + nthWave + '"><option value="0">+</option></select>'
  col.innerHTML = (select);
  newRow.appendChild(col);
  
  col = document.createElement('td');
  select = '<select id="gm_kata2_' + nthWave + '" name="gm_kata2_' + nthWave + '"><option value="0">+</option></select>'
  col.innerHTML = (select);
  newRow.appendChild(col);

 var myTable = document.getElementById('myTable');
 myTable.tBodies[0].appendChild(newRow);
 
 id = 'gm_kata_' + nthWave;
eval ('sel_' + nthWave + '= document.getElementById(id)');
eval ('sel_' + nthWave + '.addEventListener("click",function (){ popup(sel_' + nthWave + '.id)}, true)');

 id = 'gm_kata2_' + nthWave;
eval ('sel2_' + nthWave + '= document.getElementById(id)');
eval ('sel2_' + nthWave + '.addEventListener("click",function (){ popup(sel2_' + nthWave + '.id)}, true)');





nthWave++;
}

function popup(id)
{
select =  	'<form><select id=\"popup_' + id + '\" size=\"\" \">'+
	'<option value=\"0\">选择车攻目标 =)</option><option value=\"99\">意外情况</option><option value=\"1\">伐木场</option><option value=\"2\">黏土矿</option><option value=\"3\">铁矿场</option><option value=\"4\">农场</option><option value=\"5\">木材厂</option><option value=\"6\">砖块厂</option><option value=\"7\">铸造厂</option><option value=\"8\">磨坊</option><option value=\"9\">面包房</option><option value=\"10\">仓库</option><option value=\"11\">粮仓</option><option value=\"12\">铁匠铺</option><option value=\"13\">军械库</option><option value=\"14\">竞技场</option><option value=\"15\">中心大楼</option><option value=\"16\">集结点</option><option value=\"17\">市场</option><option value=\"18\">大使馆</option><option value=\"19\">兵营</option><option value=\"20\">马厩</option><option value=\"21\">工场</option><option value=\"22\">研发所</option><option value=\"24\">市政厅</option><option value=\"25\">行宫</option><option value=\"26\">皇宫</option>'+
	'<option value=\"28\">交易所</option></option><option value=\"29\">大兵营</option><option value=\"30\">大马厩</option><option value=\"37\">英雄园</option><option value=\"38\">大仓库</option><option value=\"39\">大粮仓</option><option value=\"40\">世界奇迹</option>'+
	'</select></form>';


eval("window" + id + " = window.open('', '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=200,height=20');");
if (!eval("window" + id).document.getElementById('thatDiv'))
{
div = "<div id=\"thatDiv\">加载中..O</div>";
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

var newWaveButton = document.getElementById('newWaveButton');
newWaveButton.addEventListener("click", addNewWave, true);

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", reset, true);

var myimbabutton = document.getElementById('myimbabutton');
myimbabutton.addEventListener("click", attack, true);

var arrivalButton = document.getElementById('arrivalTime');
arrivalButton.addEventListener("click", getArrivalTime, true);

var timedArrivalButton = document.getElementById('timedArrivalButton');
timedArrivalButton.addEventListener("click", setArrivalTimer, true);

//document.addEventListener("keydown", function(){hotKeys(event)},true);
document.addEventListener("keydown",hotKeys,true); 

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
var ex = "//a[contains(@OnClick,'" + t + "')]";
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
errDiv.innerHTML = errDiv.innerHTML +  "<br><b>错误:</b>" + msg;
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
	errorMsg("无法得知正在工作的村庄,只有一个村庄?");
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
thisDiv = document.getElementById('lright1');
if(!thisDiv){
  var tempDiv = document.createElement('div');
  var midDiv = document.getElementById('lmidlc');
  
  tempDiv.setAttribute('id','lright1');
  thisDiv = midDiv.parentNode.appendChild(tempDiv);
}

thisDiv.appendChild(infoDiv);
}
function abort()
{
setTimeout(function(){realAbort()},500);

}

function realAbort ()
{
cordN = 1;
firstRun = true;
wavesSent = 0;
nThisWave = 0;
numberattacks = 0;
totalattacks = 0;
myimbabutton.innerHTML = "立即出动兵力=("
}

function getCheckTroops()
{
  for (var num = 0;num<=11;num++) 
  {

  if (num <=10)
  {
  troops[num] = new Array;
   if (!num)
   {
   troop = document.getElementsByName('number');
   }else {
   troop = document.getElementsByName('troop_' + num);
   }
   totTroops[num] = 0;
    for (var x = 0; x < troop.length;x++)
    {
    //alert("x:" +x);
    
    //if (!num){totalattacks = totalattacks + parseInt(troop[x].value);}
    totTroops[num] = parseInt(totTroops[num]) + (parseInt(troop[x].value)) * (parseInt(troops[0][x]));
    troops[num][x] = troop[x].value
     }
  }else{
   troops[num] = new Array;
   troops[num+1] = new Array;
        for (var x = 0;x< troop.length; x++)
        {
        troops[11][x] = document.getElementById('gm_kata_' +(x+1) ).value;
        troops[12][x] = document.getElementById('gm_kata2_' +(x+1) ).value;
        }
      }
  }
  
   check = false;
  for(var x=1;x<=10;x++) //Sjekker om man har nok tropper
  {
  tempX = x;
  if (x==10){tempX++;}
  if (totTroops[x] > getTotalUnit('t'+tempX) ) {errorMsg("not enough troops! (Troop #" + x+ ")"); abort(); return;}
  if (totTroops[x] > 0) {check = true;}
  }
  if (!check)
  {
  errorMsg("未指定军队！");
  abort();
  return;
  }
}



//Skal implementeres asap
function getArrivalTime(tempWaveNumber, Xcord, Ycord)
{
tempWaveNumber = 0;
getCheckTroops()
  
    cords = document.getElementById('cords').value;
  cord = cords.split(targetSplit);
       var tempTargetCord = cord[0].split(cordsSplit);
	   var Xcord = tempTargetCord[0];
	   var Ycord = tempTargetCord[1];


var tempUrl = document.location.href.split('?')[0] + '?' +DID;
var tempPostvar = 'b=1&t1=' + troops[1][tempWaveNumber] + '&t4=' + troops[4][tempWaveNumber] + '&t7='+ troops[7][tempWaveNumber] +'&t9='+ troops[9][tempWaveNumber] +'&t2='+ troops[2][tempWaveNumber] +'&t5='+ troops[5][tempWaveNumber] +'&t8='+ troops[8][tempWaveNumber] +'&t10='+ troops[11][tempWaveNumber] +'&t3='+ troops[3][tempWaveNumber] +'&t6='+ troops[6][tempWaveNumber] +'&c='+ 3 +'&dname=&x='+Xcord+'&y='+Ycord+'&s1=ok';



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
	document.getElementById('arrivalTimeDiv').innerHTML = tag.snapshotItem(0).innerHTML;
	referenceTime = new Date().getTime();
	tTimes = tag.snapshotItem(0).innerHTML.split(":");
	hours = parseInt(tTimes[0],10);
	minutes = parseInt(tTimes[1],10);
	seconds = parseInt(tTimes[2],10)+1;
	

	clearInterval(timerIntervalId);

	timerIntervalId = setInterval(function(){arrivalCounter()},1000);
  arrivalCounter();
	}else{
  alert("会话已结束，也许是因为你长时间没有访问服务器。");
  }
    }
  });
}

var hours = 0;
var minutes = 0;
var seconds = 0;
function arrivalCounter()
{
diffTime = Math.round((new Date().getTime() - referenceTime)/1000);
if (diffTime >= 1)
{
// count = document.getElementById('arrivalTimeDiv').innerHTML.split(':');
// hours = parseInt(count[0],10);
// minutes = parseInt(count[1],10);
 seconds = seconds + diffTime;
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

// seconds = seconds.toString(); 
// minutes = minutes.toString(); 
// hours = hours.toString(); 
// seconds = seconds.replace(/\b(\d)\b/g, '0$1');
// minutes = minutes.replace(/\b(\d)\b/g, '0$1');
// hours = hours.replace(/\b(\d)\b/g, '0$1');
  
if (timedAttacktimer)
{

//  tTimer = timedAttacktimer.split(':');
//  if (tTimer.length == 3)
//    {
//    tSeconds = tTimer[2]
//    tMinutes = tTimer[1]
//    tHours = tTimer[0]

    //errorMsg(tSeconds + ":" + tMinutes + ':' + tHours);

    if (tHours == hours && tMinutes == minutes && tSeconds == seconds)
      {
      myimbabutton.click();
      timedAttacktimer = false;
    }
//  }
}
document.getElementById('arrivalTimeDiv').innerHTML = hours + ":" + minutes + ":" + seconds;  
referenceTime = new Date().getTime();
}
}

var tSeconds = 0;
var tMinutes = 0;
var tHours = 0;
function setArrivalTimer()
{
getArrivalTime();
timedAttacktimer = document.getElementById('timedArrivalInput').value;
tTimer = timedAttacktimer.split(":");
if (tTimer.length==3){
    tSeconds = parseInt(tTimer[2],10);
    tMinutes = parseInt(tTimer[1],10);
    tHours = parseInt(tTimer[0],10);
}else{
    alert("ERROR!!!!");
}
addCount("预定到达时间:" + timedAttacktimer+"<br />");
 
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
