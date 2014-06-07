// ==UserScript==
// @name           Omerta .COM
// @namespace      Addon .COM
// @description    Teste
// @include        http://www.barafranca.com/*
// ==/UserScript==

function sortNumber(a, b)
{
	return b - a;
}

var dlp = document.location.pathname;
var dls = document.location.search;
var lh = location.href;
var ls = location.search;

function getTAG(tag) {
  return document.getElementsByTagName(tag);
}


// ------------- Crime page ------------------
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes') {
	var input=document.getElementsByTagName("input");
	if( GM_getValue('KS') == null) {
		alert("Visit your Status page to update your rank!");
		}
	else if ( GM_getValue('KS') != "100%" && GM_getValue('Gun') == 1 )
	{
		input[6].checked = true;	
	}
	else
	{
		input[5].checked = true;
	}
	
	input[7].focus();
}

//---------------- Car page  -----------------
if(dlp + dls == '/BeO/webroot/index.php?module=Cars')
{
	var td=document.getElementsByTagName("td");
	var input=document.getElementsByTagName("input");
	var option;
	
	var percent = new Array();
	var sorted = new Array();
	percent[0] = 0;
	percent[1] = td[5].innerHTML;
	percent[2] = td[8].innerHTML;
	percent[3] = td[11].innerHTML;
	percent[4] = td[14].innerHTML;
	
	percent[1] = sorted[1] = percent[1].replace(/%/, '');
	percent[2] = sorted[2] = percent[2].replace(/%/, '');
	percent[3] = sorted[3] = percent[3].replace(/%/, '');
	percent[4] = sorted[4] = percent[4].replace(/%/, '');
	
	sorted.sort(sortNumber);
	if(sorted[0] == percent[1])
	{
		option = 1;	
	}
	else if(sorted[0] == percent[2])
	{
		option = 2;
	}
	else if(sorted[0] == percent[3])
	{
		option = 3;
	}
	else
	{
		option = 4;
	}
	
	input[option].checked = true;
	input[5].focus();
}

//---------------- LBF -----------------------------
if(document.location.pathname == '/sysbul.php')
{
	var td=document.getElementsByTagName("td");
	var inputs=document.getElementsByTagName("input");
	
	var array = td[2].innerHTML.split("<br>");
	
	var bulletAmount = array[0].match(/\d+/g);
	var bulletPrice = array[1].match(/\d+/g);
	
	if(bulletPrice < 500)
	{
		if(bulletAmount > 350)
		{
			if(bulletAmount > 400) bulletAmount = 400;
			inputs[2].value = bulletAmount;
			inputs[1].focus();
		}
	}
		
}

if(dlp == '/booze.php' || dlp == '/drugs.php') {
 	var rank = GM_getValue('rank');
  
  var booze = 0;
 	var narc = 0;

  switch(rank) {
    case 'Empty-Suit': booze = 1; narc = 0; break;
    case 'Deliveryboy': booze = 2; narc = 0; break;
    case 'Delivery Girl': booze = 2; narc = 0; break;
    case 'Picciotto': booze = 5; narc = 1; break;
    case 'Shoplifter': booze = 7; narc = 2; break;
    case 'Pickpocket': booze = 10; narc = 4; break;
    case 'Thief': booze = 15; narc = 5; break;
    case 'Associate': booze = 20; narc = 7; break;
    case 'Mobster': booze = 25; narc = 8; break;
    case 'Soldier': booze = 30; narc = 10; break;
    case 'Swindler': booze = 35; narc = 11; break;
    case 'Assassin': booze = 40; narc = 13; break;
    case 'Local Chief': booze = 45; narc = 14; break;
    case 'Chief': booze = 50; narc = 16; break;
    case 'Bruglione': booze = 60; narc = 17; break;
    case 'Capodecina': booze = 70; narc = 20; break;
    case 'Godfather': booze = 70; narc = 20; break;
    case 'First Lady': booze = 70; narc = 20; break;
  }  
   	
	var carrying = 0;
	
	function getUnits(xp){
        var results = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(results.snapshotItem(0).innerHTML[1] != null){
            return (results.snapshotItem(0).innerHTML[0] + results.snapshotItem(0).innerHTML[1])*1;
        }
        return (results.snapshotItem(0).innerHTML[0])*1;
    }

  for(var i=4;i<=10;i++){
    xpath =	'/html/body/center/table/tbody/tr['+i+']/td[3]';
    carrying += getUnits(xpath);
    getTAG('input')[i-4].value=getUnits(xpath);
  }  
  
  if(carrying == 0) {
    getTAG('input')[9].checked = true;
    if(dlp == '/drugs.php') getTAG('input')[3].value = narc;
    if(dlp == '/booze.php') getTAG('input')[6].value = booze;
  }
  else getTAG('input')[8].checked = true;
  getTAG('input')[7].focus();
}

// Information page
if ( dlp == '/information.php') {
	var td =document.getElementsByTagName("td");
	KS = td[62].innerHTML;
	GM_setValue('KS',KS);
	GM_setValue('rank',td[14].innerHTML);
	Weapon = td[77].innerHTML;
	switch(Weapon) {
	case ".45 Colt" : Gun = 1;
	break
	case "Browning HP-35" : Gun = 1;
	break
	case ".357 Magnum" : Gun = 1;
	break
	case "Tommy Gun" : Gun = 1;
	break;
	}
	GM_setValue('Gun',Gun);
}