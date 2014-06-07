// ==UserScript==
// @name           wtfbattles2 traintroops
// @author         tg44
// @description    train troops faster and simplier
// @include 	http://users.atw.hu/calmarius/wtfbattles2/*
// @email          tg44@freemail.hu
// @version        1.0.0
// ==/UserScript==


var alaptombocske=["_0spearman","_1archer","_2knight","_3catapult","_4diplomat"];

var lepzendokatonaslista=new Array();
//alert('2');
lepzendokatonaslista.push("10000,100,50,0,20,0");

var falulista=new Array();


var alaptombocske2=['barracks','archeryrange','goldmine','stables','workshop','townhall','wall'];

function gmaddtroops(){var a=new Array();for(var i=0;i<lepzendokatonaslista.length;i++)	{	a=lepzendokatonaslista[i].split(",");	for(var j=1;j<6;j++){	if(a[j]>0)	doTrainUnits(a[0],alaptombocske[j-1],a[j]);	}}}

function gbarHandler(gbar) {
   
 gbar.innerHTML += '<ul>'  ;
var asd=' ';

   asd ='var lepzendokatonaslista=new Array(); var alaptombocske=[\'_0spearman\',\'_1archer\',\'_2knight\',\'_3catapult\',\'_4diplomat\'];';
   for(var i=0;i<lepzendokatonaslista.length;i++)
  asd+='lepzendokatonaslista.push(\''+lepzendokatonaslista[i]+'\');';
  asd+='var a=new Array();for(var i=0;i<lepzendokatonaslista.length;i++)	{	a=lepzendokatonaslista[i].split(\',\');	for(var j=1;j<6;j++){	if(a[j]>0)	doTrainUnits(a[0],alaptombocske[j-1],a[j]);	}}';


 
 gbar.innerHTML += '<li><a href="javascript:{'+asd+'}" id="gmscriptcucc">gyorsképzés</a></li>';


   
   var asd3=new Array();
   for(var l=0;l<alaptombocske2.length;l++)
   {
   asd3[l]=' var alaptombocske2=[\'barracks\',\'archeryrange\',\'goldmine\',\'stables\',\'workshop\',\'townhall\',\'wall\'];';
	for(var i=falulista.length-1;i>=0;i--)
	asd3[l]+='falulista.push(\''+falulista[i]+'\');';
	asd3[l]+='for(var i=falulista.length-1;i>=0;i--)upgradeBuilding(falulista[i],alaptombocske2['+l+']);';
	gbar.innerHTML+='<li><a href="javascript:{'+asd3[l]+'}" id="">'+alaptombocske2[l]+'</a></li>';
	} 
	asd5=''
		
		asd5+='for(var i=0;i<falulista.length;i++){doTrainUnits(falulista[i],\'_0spearman\',\'100\');doTrainUnits(falulista[i],\'_1archer\',\'50\');}';
		gbar.innerHTML+='<li><a href="javascript:{'+asd5+'}" id="">gyorsabbkepzes</a></li>';
	
		asd4='showVillageSummary();var falulista=new Array();for(i=1;i<6000;i++){if (document.getElementById(\'vs\'+i)) {  falulista.push(i);}} alert(\'1\');';
		gbar.innerHTML+='<li><a href="javascript:{'+asd4+'}" id="">falubeolvasas</a></li>';
		gbar.innerHTML+='<li><a href="javascript:{showVillageSummary();superbeolvaso();}" id="">falubeolvasasszuperül</a></li>';
		gbar.innerHTML+='<li><a href="javascript:{csodaepito();}" id="">csodaépítő</a></li>';
		gbar.innerHTML +='</ul>';

  }
  
  function falubeolvas()
  {
  for(i=1;i<6000;i++){
    if ((gbar = document.getElementById('vs'+i))) {
        falulista.push(i);
        
	}
    }
	
	}
  




(function() {

    var gbar;
    
    if ((gbar = document.getElementById('extras'))) {
        gbarHandler (gbar);
    }

})();

document.addEventListener('DOMNodeInserted', function(e) {

    var gbar;
    
    // gbar is what's inserted.
    if (e.target.id == 'extras') {
        gbarHandler (e.target);
        return;
    }
    
    // gbar is a child of other container.
    if ((gbar = e.target.getElementById('extras'))) {
        gbarHandler (gbar);
        return;
    }

}, false);

function goldpositive()
{
var gold=document.getElementById("goldindicator").innerHTML;
if(gold>0) return true;
else return false;
}

contentEval(function superbeolvaso()
{
osszesfalu=new Array;
for(var i=1;i<6000;i++){
    if ((gbar = document.getElementById('vs'+i))) {
        osszesfalu.push(new Array);
			for(var j=0;j<gbar.childNodes.length;j++)
			osszesfalu[osszesfalu.length-1].push(gbar.childNodes[j].innerHTML);
	} 
    }
for(var i=0;i<osszesfalu.lengt;i++)
	osszesfalu[i][2]=osszesfalu[i][2].textContent;
for(var i=0;i<osszesfalu.length;i++)
	{
	var a=osszesfalu[i][2].split(">");
	a=a[1];
	a=a.split("<");
	osszesfalu[i][2]=a[0];
	}
});
contentEval(function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} );
contentEval(
function csodaepito()
{
var kov=-1;
var gold,gold2;

//lándzsás
do{
	var min=120;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/l[0-9]+/))
			if(min>osszesfalu[i][10] && osszesfalu[i][3]>=1){min=osszesfalu[i][10];kov=i;}
		
		}
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	if(osszesfalu[kov][10]>osszesfalu[kov][15]*2.5)
	{
		upgradeBuilding(osszesfalu[kov][0],'townhall');
		osszesfalu[kov][3]--;
	}
	else
	{
		if(osszesfalu[kov][15]<osszesfalu[kov][16]*2)
		{
		upgradeBuilding(osszesfalu[kov][0],'wall');
		osszesfalu[kov][3]--;
		osszesfalu[kov][16]++;
		}
		else
		{
		upgradeBuilding(osszesfalu[kov][0],'barracks');
		osszesfalu[kov][3]--;
		}
	}
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	
//íjász
do{
	kov=-1;
var min=120;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/i[0-9]+/))
			if(min>osszesfalu[i][11] && osszesfalu[i][3]>=1){min=osszesfalu[i][11];kov=i;}
		
		}
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	if(osszesfalu[kov][11]>osszesfalu[kov][15]*2.5)
	{
		upgradeBuilding(osszesfalu[kov][0],'townhall');
		osszesfalu[kov][3]--;
	}
		else
	{
		if(osszesfalu[kov][15]<osszesfalu[kov][16]*2)
		{
		upgradeBuilding(osszesfalu[kov][0],'wall');
		osszesfalu[kov][3]--;
		osszesfalu[kov][16]++;
		}
	else
	{
		upgradeBuilding(osszesfalu[kov][0],'archeryrange');
		osszesfalu[kov][3]--;
	}
	}
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
//kata
do{
	kov=-1;

	var min=120;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/k[0-9]+/))
			if(min>osszesfalu[i][14] && osszesfalu[i][3]>=1){min=osszesfalu[i][14];kov=i;}
		
		}
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	if(osszesfalu[kov][14]>osszesfalu[kov][15]*2.5)
	{
		upgradeBuilding(osszesfalu[kov][0],'townhall');
		osszesfalu[kov][3]--;
	}
		else
	{
		if(osszesfalu[kov][15]<osszesfalu[kov][16]*2)
		{
		upgradeBuilding(osszesfalu[kov][0],'wall');
		osszesfalu[kov][3]--;
		osszesfalu[kov][16]++;
		}
	else
	{
		upgradeBuilding(osszesfalu[kov][0],'workshop');
		osszesfalu[kov][3]--;
	}
	}
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);

	//ló
do{
	kov=-1;

	var min=120;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/g[0-9]+/))
			if(min>osszesfalu[i][13] && osszesfalu[i][3]>=1){min=osszesfalu[i][13];kov=i;}
		
		}
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	if(osszesfalu[kov][13]>osszesfalu[kov][15]*2.5)
	{
		upgradeBuilding(osszesfalu[kov][0],'townhall');
		osszesfalu[kov][3]--;
	}
		else
	{
		if(osszesfalu[kov][15]<osszesfalu[kov][16]*2)
		{
		upgradeBuilding(osszesfalu[kov][0],'wall');
		osszesfalu[kov][3]--;
		osszesfalu[kov][16]++;
		}
	else
	{
		upgradeBuilding(osszesfalu[kov][0],'stables');
		osszesfalu[kov][3]--;
	}
	}
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);

//alapfaluk
//városközpont
	do{
	kov=-1;
	var max=0;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(max<osszesfalu[i][15]){max=osszesfalu[i][15];}
		
		}
	
	var min=max;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(min>osszesfalu[i][15] && osszesfalu[i][3]>=1){min=osszesfalu[i][15];kov=i;}
		
		}
	if (min==max) break;
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	upgradeBuilding(osszesfalu[kov][0],'townhall');
	osszesfalu[kov][3]--;
		osszesfalu[kov][15]++;
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	//alert('vk');
//fal
	do{
	kov=-1;
	var max=0;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(max<osszesfalu[i][16]){max=osszesfalu[i][16];}
		
		}
	
	var min=max;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(min>osszesfalu[i][16]  && osszesfalu[i][3]>=1){min=osszesfalu[i][16];kov=i;}
		
		}
	if (min==max) break;
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	upgradeBuilding(osszesfalu[kov][0],'wall');
	osszesfalu[kov][3]--;
		osszesfalu[kov][16]++;
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	//alert('fal');
//barakk
	do{
	kov=-1;
	var max=0;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(max<osszesfalu[i][10]){max=osszesfalu[i][10];}
		
		}
	
	var min=max;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(min>osszesfalu[i][10]  && osszesfalu[i][3]>=1){min=osszesfalu[i][10];kov=i;}
		
		}
	if (min==max) break;
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	upgradeBuilding(osszesfalu[kov][0],'barracks');
	osszesfalu[kov][3]--;
		osszesfalu[kov][10]++;
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	//alert('1');
//lőtér
	do{
	kov=-1;
	var max=0;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(max<osszesfalu[i][11]){max=osszesfalu[i][11];}
		
		}
	
	var min=max;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(min>osszesfalu[i][11]  && osszesfalu[i][3]>=1){min=osszesfalu[i][11];kov=i;}
		
		}
	if (min==max) break;
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	upgradeBuilding(osszesfalu[kov][0],'archeryrange');
	osszesfalu[kov][3]--;
		osszesfalu[kov][11]++;
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	//alert('2');
//work
	do{
	kov=-1;
	var max=0;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(max<osszesfalu[i][14]){max=osszesfalu[i][14];}
		
		}
	
	var min=max;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(min>osszesfalu[i][14]  && osszesfalu[i][3]>=1){min=osszesfalu[i][14];kov=i;}
		
		}
	if (min==max) break;
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	upgradeBuilding(osszesfalu[kov][0],'workshop');
	osszesfalu[kov][3]--;
		osszesfalu[kov][14]++;
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	//alert('3');
//stable
	do{
	kov=-1;
	var max=0;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(max<osszesfalu[i][13]){max=osszesfalu[i][13];}
		
		}
	
	var min=max;
	for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			if(min>osszesfalu[i][13]  && osszesfalu[i][3]>=1){min=osszesfalu[i][13];kov=i;}
		
		}
	if (min==max) break;
	if(kov==-1)break;
	gold=counters['goldindicator'].value;
	upgradeBuilding(osszesfalu[kov][0],'stables');
	osszesfalu[kov][3]--;
	osszesfalu[kov][13]++;
	gold2=counters['goldindicator'].value;
	}while(gold2!=gold);
	//alert('4');
//gold
for(var i=0;i<osszesfalu.length;i++)
		{
		if(osszesfalu[i][2].match(/[^a-z][0-9]+/))
			{
			//alert('match '+i);
			while(osszesfalu[i][3]>=1)
			{
				upgradeBuilding(osszesfalu[i][0],'goldmine');
				osszesfalu[i][3]--;
			}
			}
		
		}
	
});


function contentEval(source) {

  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
 
 
  document.body.appendChild(script);
 // document.body.removeChild(script);
}