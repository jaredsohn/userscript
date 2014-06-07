// ==UserScript==
// @name           	Ikariam Fast Report
// @version	1
// @author		Sora101
// @namespace     ikariam.fast.report
// @description    Fast way to see battle reports.
// @include     http://*.ikariam.*?view=militaryAdvisorCombatReports*
// ==/UserScript==

var data= new Date();
var gameServer = top.location.host;


var tabella= document.getElementById("troopsOverview");
var elTableRow = tabella.getElementsByTagName("tr");


function creadiv(id,tab,html){
	var newdiv = document.createElement('div');
   newdiv.setAttribute('id', id);
   
   //newdiv.style.visibility="hidden";
   //newdiv.style.display="none";
   newdiv.style.background = "#FFF";
   newdiv.style.border = "1px solid #000";
   newdiv.style.visibility="hidden";
   newdiv.style.display="none";
   //newdiv.setAttribute('onmouseover','alert("aa")');

   
   if (html) {
       newdiv.innerHTML = html;
   } else {
       newdiv.innerHTML = "nothing";
   }
   
   tab.appendChild(newdiv);
}

function aggdati(ele,text){
	var hiddenDiv = document.createElement("div");
    hiddenDiv.style.visibility="hidden";
    hiddenDiv.style.display="none";
    hiddenDiv.innerHTML=text;
    document.body.appendChild(hiddenDiv);
//contentBox01h
	var troopdiv= getElementsByClass(hiddenDiv, "contentBox01h", false);
	
	//alert(troopdiv[0].innerHTML);
	ele.innerHTML=troopdiv[0].innerHTML;
}

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};


function mostranasc(id){
	var ele = document.getElementById(id);
	var atabp= ele.parentNode.getElementsByTagName("a");
	var datis = atabp[0].href.split("?");
	datis=datis[1];
	//alert(datis);
	if(ele.style.visibility=="hidden"){
		ele.style.visibility="visible";
   		ele.style.display="block";
   		request(datis, function(responseDetails) {
                aggdati(ele,responseDetails.responseText);
            });
	}else{
		ele.style.visibility="hidden";
   		ele.style.display="none";
	}
}

/*requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
*/
function request(dati, onload) {
	//alert(dati);
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:dati,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}



function init(){
	for(i=0; i < elTableRow.length-4; i++ ) { 
		var tbr=elTableRow[i];
		elTableCells = elTableRow[i].getElementsByTagName("td");
		alink=elTableCells[3].getElementsByTagName("a");
		
		var ran=Math.random (data.getTime());
		//alink.addEventListener('mouseover', mostranasc, false);
		//elTableCells[3].id="tab"+ran;
		//elTableCells[3].addEventListener('mouseover',function(){ mostranasc(ran); }, true);
		var bot = document.createElement('input');
		tabid='tab'+ran;
		bot.id=ran;
		bot.type='button';
		bot.value=alink[0].text;
		//bot.onClick=mostranasc;
		bot.addEventListener('click',function(){ mostranasc("tab"+this.id); }, false);
		elTableCells[3].appendChild(bot);
		creadiv(tabid,elTableCells[3],"Loading......");
		//mostranasc("tab"+ran);
		//alink[0].text="";
	}
}

function hideshow(id){
	var ele = document.getElementById(id);
	if(ele.style.visibility=="hidden"){
		ele.style.visibility="visible";
   		ele.style.display="block";
	}else{
		ele.style.visibility="hidden";
   		ele.style.display="none";
	}
}


init();