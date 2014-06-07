// ==UserScript==
// @name           Overview
// @namespace      Overview
// @description    Basic overview Ikariam for V5.0
// @author         kaphook
// @include        http://s666.*.ikariam.*/*
// @include	http://s*.*.ikariam.*/*
// @exclude	http://support.*.ikariam.com/index.php?*

// @version        1.5.mod 1
// ==/UserScript==

////GLOBAL VARIABLES////

//GM_addStyle('#container #facebook_button a{ display: none}');

 
 



var view='';

var id ='';

unsafeWindow.ajax.Responder.wtChangeHTML = unsafeWindow.ajax.Responder.changeHTML;
unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView) {
//GM_log(' in ajaxresponder'+ params);
var id = params[0];  
unsafeWindow.ajax.Responder.wtChangeHTML(params, replaceView);  
setTimeout( function() { testing(id);}, 0);  

}

 
 
 
 
 //Capacity of a ship
var cap = 500;

// list all buildings
var building = new Array("townHall","palace","palaceColony","tavern","museum","academy","workshop","temple","embassy","warehouse","dump","port","branchOffice","wall","safehouse","barracks","shipyard","forester","carpentering","winegrower","vineyard","stonemason","architect","glassblowing","optician","alchemist","fireworker","constructionSite");
var LocalBuilding = new Array();


var townHallSpaces = [0, 60, 96, 142, 200, 262, 332, 410, 492, 580, 672, 768, 870, 976, 1086, 1200, 1320, 1440, 1566, 1696, 1828, 1964, 2102, 2246, 2390, 2540, 2690, 2845, 3003, 3163, 3326, 3492, 3660, 3830, 4004, 4180, 4360, 4540, 4724, 4910, 5098,	5290, 5482, 5678, 5876, 6076, 6278, 6484, 6710];
var MaxInhabitants =[townHallSpaces];

 

//Maximum ships
var Max_ship=10;

//var Max_ship = getVar("Max_ship", 10);

var GLon_off_S = 1;

////END GLOBAL VARIABLES////

var cityNombre = new Array();
var cityRec = new Array();
var islaId = new Array();
var busy=0;
var actionRequest = 0;
var currentcity;
var JSONcitys = new Array; // all citys
var cityId = new Array(); //cityId's
var cityName = new Array();//citynames
var cityRecId = new Array();//cityresourcenumber
var cityRecStr = new Array();//cityresourcestring
var cityCoords = new Array();//citycoords
var islandId = new Array();//islandID of city
var cityaction = new Array();//actionpoints of city
var citypopulation = new Array();//free workforce
var citycitizens = new Array();//total population
var citywood = new Array();//wood in city
var citywine = new Array();//wine in city
var citymarble = new Array();//marble in city
var cityglass = new Array();//glass in city
var citysulfur = new Array();//sulfur in city
var cityReduxUse = new Array(); // wineuse after reduction
var ind_cityId = 0;
var citybuildings;
var servertime;
var completed;
var ErrorString= '';
var JSONcitydata ='';
var ResSeafaring='';  
var ResEco='';
var ResScience='';
var ResArmy='';
var ResSeafaringlevel=0;
var ResEcolevel=0;
var ResSciencelevel=0;
var ResArmylevel=0;


StyleBuilding = 'style="color:blue;font-weight:bold;text-align:center;background-image: url(skin/input/button.png)"'
StyleFinished = 'style="color:green;font-weight:bold;text-align:center;background-image: url(skin/input/button.png)"'



var baseURL = window.location.href.substring(0,window.location.href.indexOf(".php")+4);

var server=location.href;
//GM_log("server "+server);
view  = window.location.href.substring(window.location.href.indexOf(".php")+10,window.location.href.indexOf("&"));
//GM_log("view "+view);

//var  LocalizationStrings = JSON.parse('{"ambrosia":"Ambrosia","gold":"Gold","tradegood":"Trade good","wood":"Building material","wine":"Wine","marble":"Marble","crystal":"Crystal Glass","sulfur":"Sulphur","wood_deposit":"Forest","wine_deposit":"Vines","marble_deposit":"Quarry","crystal_deposit":"Crystal Mine","sulfur_deposit":"Sulphur pit","send_message":"Send Message","citizens":"Citizens","branchOffice":"Trading Post","upkeep":"Upkeep cost per hour","building_time":"Building time","colonize_here":"Would you like to colonise here?","avatar_banned":"This account is banned at the moment!","avatar_vacation":"This player is currently on vacation","avatar_inactive":"This player is currently inactive","avatar_inactive_suffix":"(i)","level":"Level","free_building_space":"Free Building Ground","building_under_construction":"Under construction","yes":"Yes","abort":"Cancel","timeunits":{"short":{"day":"D","hour":"h","minute":"m","second":"s"}},"language":"en","decimalPoint":".","thousandSeperator":",","warnings":{"tolargeText":"Warning! Your text is longer than permitted!"}}');
var resourcetrad = new Array();
resourcetrad[0] = 'wood';
resourcetrad[1] = 'wine';
resourcetrad[2] = 'marble';
resourcetrad[3] = 'crystal';
resourcetrad[4] = 'sulfur';

//var test = a0(unsafeWindow.dataSetForView.relatedCityData.city_120401.name);
//GM_log("test relatedcitydata "+ test);

getcitysdata();

//var Sheight =screen.availHeight-84;
//GM_log(Sheight);


var ocupado = 0;
var name;
var citydata = new Array();
for(i=0;i<12;i++){
citydata[i] = new Array(17)
}

for ( i = 0 ; i<12 ; i++){
	for(j=0 ; j<17 ; j++){
	citydata[i][j]="0";
	}
}

//getcitys() // fill citysarray

//GM_log(citys);
getcitydata() // fill currentcitydata
//GM_log(cityName.length);
for(i=0;i<cityName.length;i++){
var test = GM_getValue(document.location.host+"citybuildings"+cityId[i]);
if(test) {
//  GM_log("test "+ cityName[i]+test);
  JSONcitys[i]=JSON.parse(GM_getValue(document.location.host+"citybuildings"+cityId[i]));
  }else{
//    GM_log(i+' '+cityName[i] +'Error! citydata not found , visit city to get data');
  }
//GM_log("test    "+JSONcitys[i].position[16].name+" "+JSONcitys[i].position[16].level+"  "+JSONcitys[i].population);
}



for (i=0;i<30;i++){
LocalBuilding[i] ='.';
}
//GM_log("localbuildings "+LocalBuilding);

for (i=0; i <cityName.length;i++){ //for all city's
	if(JSONcitys[i]){
	for(j=0;j<17;j++){ //for all building in city
//-----------------------------------------------	
	 for(k=0;k<28;k++){ // for all possoble buildings
		if(JSONcitys[i].position[j].building){
		if(building[k] == JSONcitys[i].position[j].building){  // if building exists...
//GM_log("test    "+JSONcitys[i].position[j].name+" "+JSONcitys[i].position[j].building+"  ");		
		LocalBuilding[k] = JSONcitys[i].position[j].name;  // put the local-name in the array
//GM_log("in loop  localbuildings "+LocalBuilding[k]+"   "+JSONcitys[i].position[j].building);		
		}else{
//		ErrorString= ''
		}
		}
	}	
//-------------------------------------------------------
	}
	}else{
		ErrorString= 'YOU HAVE NOT VISITED ALL CITYS YET!!!'
		}
//GM_log("localbuildings "+LocalBuilding);		
}
GM_log("ErrorString '; "+ErrorString );



//GM_log('baseURL'+" "+baseURL);
actionrequest = a0((document.getElementById("js_ChangeCityActionRequest").value));
//GM_log('actionrequest'+" "+actionrequest);
//var data=baseURL+'?view=tradeAdvisor&oldView=city&cityId=200390&backgroundView=city&currentCityId=200390&actionRequest='+actionrequest+'ajax=1';
//var data=baseURL+'?view=townHall&cityId=659989&position=0&backgroundView=city&currentCityId=659989&actionRequest='+actionrequest+'&backgroundView=city&currentCityId=659989&actionRequest='+actionrequest+'&ajax=1';
//var data=baseURL+'?view=cityMilitary&cityId=659989&backgroundView=city&currentCityId=659989&actionRequest='+actionrequest+'&ajax=1';
//var data=baseURL+'?view=tavern&cityId=120401&position=9&backgroundView=city&currentCityId=120401&actionRequest='+actionrequest+'&ajax=1';
var data=baseURL+'?view=researchAdvisor&oldView=city&cityId=155877&backgroundView=city&currentCityId=155877&actionRequest='+actionrequest+'&backgroundView=city&currentCityId=155877&actionRequest='+actionrequest+'&ajax=1';
//GM_log('data '+ data)

//post(baseURL,data,testdata);


function testdata(text){
GetScienceData(text);
//ErrorString  = " research   "+ResSeafaring+" "+ResEco+" "+ResScience+" "+ResArmy;
}
ErrorString  = ResSeafaring+" "+ResEco+" "+ResScience+" "+ResArmy;
//GM_log("ErrorString '; "+ErrorString );



var body = document;
var text = document.body.innerHTML;


var p,h,n1,n2,n3;

p = document.body;
//p = document.getElementById("worldview");
//p.setAttribute('style','z-index:1;');
//GM_log (p);
h = document.createElement('div');
h.id = "ResourceDealer";
//h.setAttribute('style','z-index:1;position:relative;margin:0px auto 00px;width:1024px;');
h.setAttribute('style','z-index:0;position:relative;top:'+(screen.availHeight-80)+'px;margin:0px auto 00px;width:1024px;');
//h.setAttribute('style','z-index:101;position:relative;top:0px;margin:0px; left:10px; auto 00px;width:100%;');
p.appendChild(h);


p = document.getElementById("ResourceDealer");
h = document.createElement('div');
h.id = "menu_dealer";
//    heading  
h.setAttribute('style','z_index:0;padding:7px 0px 7px 0px; position:relative;width:100%;auto 0px;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:left;');
//h.innerHTML = '<table align="left" width="100%"><tr><td id="cel_menu_1" align="center">Ikariam ResblablaSource Dealer </td><td id="cel_menu_2" align="center" width="18%"></td><td id="cel_menu_3" align="center" width="18%"></td><td id="cel_menu_4" align="center" width="18%"></td><td id="cel_menu_5" align="center" width="18%"></td></tr></table>';
h.innerHTML = '<table align="left" width="100%"><tr><td "GLon" id="GLon_off" align="center" width="10%"></td><td id="cel_menu_1" align="center">Ikariam Overview Basic</td><td id="cel_menu_2" align="center" width="10%"></td><td id="cel_menu_3" align="center" width="10%"></td><td id="cel_menu_4" align="center" width="10%"></td><td id="cel_menu_5" align="center" width="10%"></td><td align="right"></td><td "Ships" id="ships" align="center" width="10%"></td></tr></table>';
p.appendChild(h);


p = document.getElementById("ResourceDealer");
h = document.createElement('div');
h.className = 'table1';
h.id = "resourcedealer5";
h.setAttribute('style','position:relative;clear:both;width:100%;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;text-decoration:none;color:#612d04;font:12px Arial, Helvetica, sans-serif;');
//h.setAttribute('style','position:relative;overflow:hidden;clear:both;width:100%;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;text-decoration:none;color:#612d04;font:12px Arial, Helvetica, sans-serif;text-align:center;');
p.appendChild(h);



p = document.getElementById("ResourceDealer");
h = document.createElement('div');
h.className = 'table2';
h.id = "resourcedealer5-2";
h.setAttribute('style',';position:relative;clear:both;width:100%;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;');
////h.setAttribute('style','position:relative;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;text-decoration:none;width:100%;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:center;');
p.appendChild(h);

p = document.getElementById("ResourceDealer");
h = document.createElement('div');
h.className = 'table2';
h.id = "ArmyTable";
h.setAttribute('style',';position:relative;clear:both;width:100%;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;');
////h.setAttribute('style','position:relative;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;text-decoration:none;width:100%;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:center;');
p.appendChild(h);



p = document.getElementById("ResourceDealer");
h = document.createElement('div');
h.id = "ResourceDealerFooter";
h.setAttribute('style','padding:7px 0px 7px 0px; position:relative;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background-image: url(skin/input/button.png) ;text-decoration:none;width:100%;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:left;');
h.innerHTML = ErrorString+'    1.3  still testing......' 
p.appendChild(h);



p = document.body;
//p = document.getElementById("container");
//p = document.getElementById("worldview");
//p = document.getElementById("worldmap");
h = document.createElement('div');
h.id = "background";
// newdeal  
h.setAttribute('style','z-index:-50;position:relative;overflow:visible;left:-300px;top:590px;height:600px;width:960;background-size:960,600;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdna2/b2fedf824588543937f64ceb67f4d9.jpg) ;');
//h.setAttribute('style','z-index:-1;position:relative;left:282px;top:-110px;width:100%;height:100%;background-size:1920,1200;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdnaf/061a8c84d2d5c470a7d049f9d90cb8.jpg) ;');
h.innerHTML = 'testing' 
p.appendChild(h);



p = document.body;
//p = document.getElementById("container");
//p = document.getElementById("worldview");
//p = document.getElementById("worldmap");
h = document.createElement('div');
h.id = "background";
// newdeal  
h.setAttribute('style','z-index:-50;position:relative;overflow:visible;left:0px;top:-110px;height:1200px;width:1920;background-size:1920,1200;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdnaf/061a8c84d2d5c470a7d049f9d90cb8.jpg) ;');
//h.setAttribute('style','z-index:-1;position:relative;left:282px;top:-110px;width:100%;height:100%;background-size:1920,1200;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdnaf/061a8c84d2d5c470a7d049f9d90cb8.jpg) ;');
h.innerHTML = 'testing' 
//p.appendChild(h);

p = document.body;
//p = document.getElementById("background");
h = document.createElement('div');
h.id = "background2";
h.setAttribute('style','z-index:-1;overflow:visible;position:relative;top:-110px;;height:600px;;width:1920;background-size:1920,600;background-position:center;background-image: url(http://gf2.geo.gfsrv.net/cdn7d/6f875d52eb0d7fad05feca40164375.jpg) ;');
h.innerHTML = ''
//p.appendChild(h);




cargar_dealers();




function cargar_dealers(){
GM_log("in cargas deales!!!!!!!!!!");	
// servertime  = unsafeWindow.dataSetForView.serverTime;  // get the servertime on the last pageupdate !! not for 
var d=new Date();
var CompTime = d.getTime();
CompTime= CompTime/1000;
//GM_log(servertime);
//GM_log(CompTime);
//servertime = CompTime;

//	$("resourcedealer5").innerHTML = '';
a=1;
if (a=1){
		
/////////////////////new table...............................		

	tabla=''	
	document.getElementById("resourcedealer5").innerHTML = '';	
	tabla += '<table border="1" bordercolor="#c69262" width="100%">';

/*	tabla += '<tr height="30"><th>   </th<th><th>Cityname</th><th >Cityhall</th><th >'+building[1]+'</th><th >'+building[2]+'</th><th >'+building[3]+'</th><th >'+building[4]+'</th><th>'+building[5]+'</th><th>'+building[6]+'</th><th>'+building[7]+'</th><th>'+building[8]+'</th><th>'+building[9]+'</th><th>'+building[10]+'</th><th>'+building[11]+'</th><th>'+building[12]+',</th><th>'+building[13]+',</th><th>'+building[14]+',</th><th>'+building[15]+',</th><th>'+building[16]+',</th><th>'+building[17]+',</th><th>'+building[18]+',</th><th>'+building[19]+',</th><th>'+building[20]+',</th><th>'+building[21]+',</th><th>'+building[22]+',</th><th>'+building[23]+</th><th>'+building[24]+',</th><th>'+building[25]+',</th><th>'+building[26]+'</th></tr>';
*/
	LineStyle = 'style="font-weight:bold;background-image: url(skin/input/button.png) "';
//	LineStyle = 'style="color:black;font-weight:bold"'
	
	tabla += '<tr style="max-height:15px;font-weight:bold;background-image: url(skin/input/button.png);"><td>   </td<td><td>Cityname</td>';
	for (i = 0 ; i < 27 ; i++){
	tabla += '<td style="max-height:15px;min-width: 0px; max-width: 30px; overflow: hidden;font-weight:bold;background-image: url(skin/input/button.png)">'+LocalBuilding[i]+'</td>';
	}
	tabla += '</tr>'
	
	

		for (var i = 0; i < cityName.length; i++) {  /// -1 weg
GM_log("cityName[i] "+cityName[i]+" "+cityId[i]);

			// make zebralines
			var rem = i%2;
				if ( rem >0 )  // split odd/even lines
				{LineStyle = 'style= "text-align:left;background: #FDD4A6;font-weight:normal"'}	
				else{LineStyle = 'style="text-align:left;background: #EFC287;font-weight:normal"'}
			if(JSONcitydata){ //worldview
			if(JSONcitydata.id==cityId[i]){
//				GM_log("city match!!!!!!!!");
				// make zebralines
				var rem = i%2;
					if ( rem >0 ){  // split odd/even lines
					LineStyle = 'style="text-align:left;background: #FDD4A6;font-weight:bold"'}	
					else{LineStyle = 'style="text-align:left;background: #EFC287;font-weight:bold"'}
			}
			}

			tabla += '<tr height="20"><td style="background: #eee0c0"><img height="14" src="skin/resources/icon_'+cityRecStr[i]+'.png"/>'+'</td>';
//			LineStyle = 'style="font-weight:bold"'
			tabla += '<td '+ LineStyle +'><a '+LineStyle+'href="/index.php?view=city&cityId='+cityId[i]+'">' +cityName[i]+'</a></td>';
            
			for (build=0; build<27; build++){

			var rem = i%2;
				if ( rem >0 )  // split odd/even lines
				{LineStyle = 'style="text-align:center;font-weight:normal;background: #FDD4A6"'}	
				else{LineStyle = 'style="text-align:center;font-weight:normal;background: #EFC287"'}
			
			var pos=Findbuilding(i,building[build]); //find building position
//GM_log(" building          "+pos+" "+building[build]);
			if (pos == -1){//--------------------------------------
				tabla += '<td '+ LineStyle +">"+"-"+'</td>';

			}else{
			tabla += '<td '+LineStyle+'>';
			if(JSONcitys[i]){

// building is warehouse------------------------
			var Level = parseInt(JSONcitys[i].position[pos].level);
			WCount = 0;
			if(build == 9){//warehouse
				
				var Wlevel=0;
				for(Wpos=3;Wpos<17;Wpos++){
//GM_log("pos   "+cityName[i]+" "+Wpos+" "+ JSONcitys[i].position[Wpos].building);
				if((JSONcitys[i].position[Wpos].building) == building[9] || (JSONcitys[i].position[Wpos].building) == building[9]+' constructionSite'){
				var WCount = WCount +1;
				if(WCount > 1){
				tabla += ' - ';
				}
				if(pos != -1){
				var Level = parseInt(JSONcitys[i].position[Wpos].level);
				if(JSONcitys[i].position[Wpos].completed){//--------------
				LineStyle = StyleBuilding;
				Level=Level+'»'+(parseInt(Level)+1)
				
				if(JSONcitys[i].position[Wpos].completed < CompTime){
				LineStyle = StyleFinished;
				Level = parseInt(Level)+1;
//GM_log("completed smaller.......building completed..");
				}
				}//------------------

				tabla += '<a '+LineStyle+'href="/index.php?view='+JSONcitys[i].position[pos].building+'&cityId='+cityId[i]+'&position='+Wpos+'">'+Level+'</a>';
				}
//GM_log("pos   "+cityName[i]+" "+Wpos+" "+ JSONcitys[i].position[Wpos].building);
//						Wlevel=Wlevel+parseInt(JSONcitys[i].position[Wpos].level);
					}
				}
//GM_log("Wlevel Level  "+Wlevel+" "+Level);				
//			if(Wlevel>Level){	
//			Level = Wlevel;
//			}
			}
			if(build == 11){//tradeport
				
				var Wlevel=0;
				var WCount=0;
				for(Wpos=1;Wpos<3;Wpos++){
//GM_log("pos   "+cityName[i]+" "+pos+" "+ JSONcitys[i].position[Wpos].building+" "+JSONcitys[i].position[Wpos].completed);
				if((JSONcitys[i].position[Wpos].building) == building[11] || (JSONcitys[i].position[Wpos].building) == building[11]+' constructionSite'){
				var WCount = WCount +1;
				if(WCount > 1){
				tabla += ' - ';
				}
				if(pos != -1){
				var Level = parseInt(JSONcitys[i].position[Wpos].level);
//GM_log(JSONcitys[i].position[Wpos].completed+" "+Level);				
				if(JSONcitys[i].position[Wpos].completed){//--------------
				LineStyle = StyleBuilding;
				Level=Level+'»'+(parseInt(Level)+1)
//GM_log(JSONcitys[i].position[Wpos].completed+" "+Level);				
				if(JSONcitys[i].position[Wpos].completed < CompTime){
				LineStyle = StyleFinished;
				Level = parseInt(Level)+1;
//GM_log("completed smaller.......building completed..");
				}
				}//------------------

				tabla += '<a '+LineStyle+'href="/index.php?view='+JSONcitys[i].position[pos].building+'&cityId='+cityId[i]+'&position='+Wpos+'">'+Level+'</a>';
				}
//GM_log("pos   "+cityName[i]+" "+Wpos+" "+ JSONcitys[i].position[Wpos].building);
//						Wlevel=Wlevel+parseInt(JSONcitys[i].position[Wpos].level);
					}
				}
//GM_log("Wlevel Level  "+Wlevel+" "+Level);				
//			if(Wlevel>Level){	
//			Level = Wlevel;
//			}
			}

//---------------------------------------

//				var safeStyle =LineStyle;
//				var Level = parseInt(JSONcitys[i].position[pos].level);

//GM_log("Wlevel Level  "+Wlevel+" "+Level);
				
				if(JSONcitys[i].position[pos].completed){//--------------
				LineStyle = 'style="color:blue;font-weight:bold;text-align:center;background-image: url(skin/input/button.png)"'
				Level=Level+'»'+(parseInt(Level)+1)
				
				if(JSONcitys[i].position[pos].completed < CompTime){
				LineStyle = 'style="color:green;font-weight:bold;text-align:center;background-image: url(skin/input/button.png)"'
				Level = parseInt(Level)+1;
//GM_log("completed smaller.......building completed..");
				}
				}//------------------
				}
				if(pos != -1 && build != 9 && build != 11) {
//GM_log(cityId[i]+" "+JSONcitys[i].position[pos].building);				
				tabla += '<a '+LineStyle+' href="/index.php?view='+JSONcitys[i].position[pos].building+'&cityId='+cityId[i]+'&position='+pos+'">'+Level+'</a>';
//				tabla += '<a href="/index.php?view='+JSONcitys[i].position[pos].building+'&cityId='+cityId[i]+'&position='+pos+'">'+Level+'</a>';
//				LineStyle = 'style="color:black;font-weight:bold"'
				}
			
			}//---------------------------------

			}
		}
		tabla += '</table></p>';
		document.getElementById("resourcedealer5").innerHTML  = tabla;

		
		
//----------------------------------		recources --------------------
	Linestylewarning='style="color:tomato;font-weight:bold;text-align:right;background-image: url(skin/input/button.png)"'

	tabla ='';
	document.getElementById("resourcedealer5-2").innerHTML = '';

	tabla += '<table style="align="center" border="1" bordercolor="#c69262" width="100%">';

	tabla += '<tr font-weight="bold" height="30"><td></td><td>Cityname</td><td align="center"; colspan=3 >'+'<img src="skin/characters/40h/citizen_r.png">'+" "+unsafeWindow.LocalizationStrings.citizens+" "+'<img src="skin/icons/growth_positive.png">'+'</td><td align="center"; colspan=3>'+ '<img src="skin/resources/icon_gold.png">'+" "+unsafeWindow.LocalizationStrings.gold+'</td><td align="center">'+unsafeWindow.LocalizationStrings.wood+'</td><td align="center" >Prod</td><td align="center">'+unsafeWindow.LocalizationStrings.wine+'</td><td align="center">Use</td><td align="center">Prod</td><td align="center">'+unsafeWindow.LocalizationStrings.marble+'</td><td align="center">Prod</td><td align="center">'+unsafeWindow.LocalizationStrings.crystal+'</td><td align="center">Prod</td><td  align="center">'+unsafeWindow.LocalizationStrings.sulfur+'</td><td align="center">Prod</td></tr>';
	

		for (var i = 0; i < cityName.length; i++) {  /// -1 weg
GM_log("cityName[i] "+i+" "+cityName[i]);

		if(!JSONcitys[i]){

		tabla += '<tr><td '+ LineStyle +'>'+(i+1)+'</td><td text-align:left;>'+cityName[i]+'</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
		}else{

			// make zebralines
			var rem = i%2;
			if ( rem >0 )  // split odd/even lines
				{
			LineStyle = 'style="text-align:left;background: #FDD4A6;font-weight:normal"'
			LineStyleN = 'style="text-align:right;background: #FDD4A6;font-weight:normal"'
				//	}
				}	
				else
				{
			LineStyle = 'style="text-align:left;background: #EFC287;font-weight:normal"'
			LineStyleN = 'style="text-align:right;background: #EFC287;font-weight:normal"'
				}

			tabla += '<tr height="20"><td style="background: #eee0c0"><img height="14" src="skin/resources/icon_'+cityRecStr[i]+'.png"/>'+'</td>';

			if(JSONcitydata.name==cityName[i]){
//GM_log("city match!!!!!!!!");
				// make zebralines
				var rem = i%2;
					if ( rem >0 ){  // split odd/even lines , bold for current city
					LineStyle = 'style="text-align:left;background: #FDD4A6;font-weight:bold"'
					LineStyleN = 'style="text-align:right;background: #FDD4A6;font-weight:bold"'
					}	
					else{
					LineStyle = 'style="text-align:left;background: #EFC287;font-weight:bold"'
					LineStyleN = 'style="text-align:right;background: #EFC287;font-weight:bold"'
					}

			}

			var max=(StrToNum(JSONcitys[i].maxstorage));
			max=max*.75;
			var Time = parseInt(CompTime); //time now
			var citytime=parseInt(JSONcitys[i].servertime);
			var time = parseInt((Time-citytime)/3600); //time dif 
			var LineN = LineStyleN;
			var Line = LineStyle;


			tabla += '<td '+ LineStyle +'><a '+ LineStyle +'href="/index.php?view=city&cityId='+cityId[i]+'">'+cityName[i]+'</a></td>';
GM_log(cityName[i]+" "+ cityRecId[i]);
			tabla += '<td '+ LineStyleN +">"+JSONcitys[i].citizens+'</td>';


			if(StrToNum(JSONcitys[i].population) >= (JSONcitys[i].MaxInhabitants)){
				LineStyleN = 'style="color:tomato;text-align:right;background: #EFC287;font-weight:bold"'
//			}else{
			}
			tabla += '<td '+ LineStyleN +">"+JSONcitys[i].population;
			LineStyleN = LineN;
/*//-----------------------------------------maxinhabitants------

*///---------------------------------	
			if(!JSONcitys[i].PopulationGrowth){
			JSONcitys[i].PopulationGrowth = '-';
			}
			if((JSONcitys[i].PopulationGrowth > 0)){
			LineStyleN = 'style="color:green;text-align:right;background: #EFC287;font-weight:bold"'
			}else{
			}
			tabla += '<td '+ LineStyleN +'>'+JSONcitys[i].MaxInhabitants+' : '+JSONcitys[i].PopulationGrowth;
			LineStyleN = LineN;
//			tabla += '<td '+ LineStyleN +">-";
			
			
			if(JSONcitys[i].Bruto){tabla += '<td '+ LineStyleN +'>'+JSONcitys[i].Bruto;
			}else{tabla += '<td '+ LineStyleN +">-";}
			if(JSONcitys[i].ScienceCost){tabla += '<td '+ LineStyleN +'>'+JSONcitys[i].ScienceCost;
			}else{tabla += '<td '+ LineStyleN +">-";}
			if(JSONcitys[i].Netto){tabla += '<td '+ LineStyleN +'>'+JSONcitys[i].Netto;
			}else{tabla += '<td '+ LineStyleN +">-";}

//			tabla += '<td '+ LineStyleN +">"+JSONcitys[i].maxstorage;
  //links dont work correct...need work on that			tabla += '<td '+ LineStyle +'><a href="/index.php?view=resource&type=resource&islandId='+JSONcitys[i].islandId+'">'+JSONcitys[i].wood+'</a></td>';
			normalLine=LineStyleN;
			
//-----------------------------------wood---------------------			
			citywood[i] = StrToNum(JSONcitys[i].wood);			
//GM_log("nax wood    "+max+" "+""+JSONcitys[i].maxstorage+" "+citywood[i]);
			var production = parseInt(StrToNum(JSONcitys[i].woodprod)); 
//total = citywood[i]+production;
//GM_log("citywood[i] "+citywood[i]+" "+production+" "+time);
			production = parseInt(production*time);
//GM_log("citywood[i] "+citywood[i]+" "+production+" "+total);
			if(JSONcitydata.id==cityId[i]){
//GM_log("city match!!!!!!!!");
				tabla += '<td '+ LineStyleN +'>'+a0((document.getElementById("js_GlobalMenu_wood")).firstChild.nodeValue)+'</td>';
			}else{

			citywood[i]= citywood[i]+production;
//GM_log("max citywood  "+max+" "+citywood[i]);			
			if(citywood[i] > max ){
			LineStyleN = Linestylewarning;
			}
			
			tabla += '<td '+ LineStyleN +'>'+formatNum((citywood[i]))+'</td>';
			}
			LineStyleN=normalLine;
			tabla += '<td '+ LineStyleN +">"+((JSONcitys[i].woodprod))+'</td>';

//-----------------------------   wine city   ---------------------------------------------------------------
			citywine[i] = StrToNum(JSONcitys[i].wine);
//GM_log(cityName[i]+" "+" "+citywine[i]+" "+building[20]);
			production=0;
			var Redux =1;  //start at 100%
			var pos = Findbuilding(i,building[20]);  //building 20 is winepress
			if(pos != -1){
			var Redux = (100-((JSONcitys[i].position[pos].level)))/100;
//GM_log(cityName[i]+" "+" "+cityRecId[i]+" "+JSONcitys[i].tradegood);
			}
			if(cityRecId[i] == 1){
			var production = StrToNum(JSONcitys[i].wineprod); 
			if(!production){
			production=0;
			}
			production=parseInt(production*time);
			}
//GM_log("JSONcitys[i].winespending "+JSONcitys[i].winespending);			
			var  HourUse = (JSONcitys[i].winespending);
//GM_log(cityName[i]+" "+" "+HourUse+" "+building[20]);
			var ReduxUse=HourUse*Redux;
			cityReduxUse[i] = ReduxUse;
//GM_log(cityName[i]+" "+" "+ReduxUse+" "+building[20]);			
			var use=parseInt(ReduxUse*time);			
//GM_log(cityName[i]+" "+" "+use+" "+building[20]);
			if((citywine[i]+production-use) > (max) ){     //  75% full
			LineStyle = Linestylewarning;
			}
			var warninguse = ((JSONcitys[i].winespending))*36;

			if((citywine[i]+production-warninguse) < (0) ){     //  empty in 36 hours
			LineStyle =  Linestylewarning;
			}

			if(JSONcitydata.id==cityId[i]){    //////== current city ?  
				tabla += '<td '+ LineStyleN +">"+a0((document.getElementById("js_GlobalMenu_wine")).firstChild.nodeValue)+'</a></td>';
			}else{
			citywine[i]=(citywine[i]-use+production)
//GM_log("wine  "+use+" "+production+" "+citywine[i]);
			tabla += '<td '+ LineStyleN +">"+formatNum(citywine[i])+'</td>';
			}
//GM_log(cityName[i]+" "+citywine[i]+" "+use+" "+production);		
			LineStyleN=normalLine;
			tabla += '<td '+ LineStyleN +">"+parseInt(ReduxUse)+'</td>';

			if(cityRecId[i] == 1){
				tabla += '<td '+ LineStyleN +">"+((JSONcitys[i].wineprod))+'</td>';
				}else{
				tabla += '<td '+ LineStyleN +">"+"-"+'</td>';
				}

//-------------------------------marble--------------

			citymarble[i] = StrToNum(JSONcitys[i].marble);
			production=0;
			if(cityRecId[i] == 2){
//GM_log(" stad recid "+ cityName[i]+" "+ cityRecId[i]);
			var production = StrToNum(JSONcitys[i].marbleprod); 
			if(!production){
			production=0;
			}
			production=parseInt(production*time);
			}
			if((citymarble[i]+production) > (max) ){
			LineStyle =  Linestylewarning;
			}
			if(JSONcitydata.id==cityId[i]){
//GM_log("city match marble!!!!!!!!");
				tabla += '<td '+ LineStyleN +">"+a0((document.getElementById("js_GlobalMenu_marble")).firstChild.nodeValue)+'</a></td>';
			}else{
			citymarble[i] =citymarble[i]+production;
			tabla += '<td '+ LineStyleN +">"+formatNum(citymarble[i])+'</td>';
			}
			LineStyleN=normalLine;

			if(cityRecId[i] == 2){
				tabla += '<td '+ LineStyleN +">"+((JSONcitys[i].marbleprod))+'</td>';
				}else{
				tabla += '<td '+ LineStyleN +">"+"-"+'</td>';
				}

//-------------------crystal-----------------
			cityglass[i] = StrToNum(JSONcitys[i].crystal);
			production=0;
			if(cityRecId[i] == 3){
			var production = StrToNum(JSONcitys[i].crystalprod); 
			if(!production){
			production=0;
			}
			production=parseInt(production*time);
			}
			if((cityglass[i]) > (max) ){
			LineStyle = Linestylewarning;
			}
			if(JSONcitydata.id==cityId[i]){
//GM_log("city match crystal!!!!!!!!");
				tabla += '<td '+ LineStyleN +">"+a0((document.getElementById("js_GlobalMenu_crystal")).firstChild.nodeValue)+'</a></td>';
			}else{
			cityglass[i] = cityglass[i]+production
			tabla += '<td '+ LineStyleN +">"+formatNum(cityglass[i])+'</td>';
			}
			
			LineStyle=normalLine;
			if(cityRecId[i] == 3){
				tabla += '<td '+ LineStyleN +">"+(JSONcitys[i].crystalprod)+'</td>';
				}else{
				tabla += '<td '+ LineStyleN +">"+"-"+'</td>';
				}

//--------------sulfur---------------------------
			citysulfur[i] = StrToNum(JSONcitys[i].sulfur);
			production=0;
			if(cityRecId[i] == 4){
			var production = StrToNum(JSONcitys[i].sulfurprod); 
			if(!production){
			production=0;
			}
			production=parseInt(production*time);
			}
			if((citysulfur[i]+production) > (max) ){
			LineStyle =  Linestylewarning;
			}
			if(JSONcitydata.id==cityId[i]){
//GM_log("city match sulfur!!!!!!!!");
				tabla += '<td '+ LineStyleN +">"+a0((document.getElementById("js_GlobalMenu_sulfur")).firstChild.nodeValue)+'</a></td>';
			}else{
			citysulfur[i] =citysulfur[i]+production
			tabla += '<td '+ LineStyleN +">"+formatNum(citysulfur[i])+'</td>';
			}
			
			LineStyle=normalLine;
			if(cityRecId[i] == 4){
				tabla += '<td '+ LineStyleN +">"+(JSONcitys[i].sulfurprod)+'</td>';
				}else{
				tabla += '<td '+ LineStyleN +">"+"-"+'</td>';
				}
				tabla +='</tr>';
			}
			}


			tabla +='<tr><td></td><td>Totals</td>';			

//---------------------- totals			
// make line with totals...	for colomn col sum var[i]....
//GM_log("  i         ........."+i);-----------------------------------------------------------------------------------------
	                    if(!JSONcitys[i]){// no citys ----------------------------------
//			if(!JSONcitys[i].citizens) //----------------eh..........
			var val=0;
			var sum=0;
			for(i = 0 ; i < cityName.length; i++){
			if(!JSONcitys[i].citizens){
			JSONcitys[i].citizens=0;
			}
			val=(StrToNum(JSONcitys[i].citizens));
//GM_log("citizens "+val);			
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);

	                    var val=0;
			var sum=0;
			for(i = 0 ; i < cityName.length; i++){
			if(!JSONcitys[i].population){
			(JSONcitys[i].population)=0;
			}
			val =(StrToNum(JSONcitys[i].population));
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);

			tabla +='<td align="right">'+ '-+-';
			tabla += '<td></td>';
			tabla += '<td></td>';

	                    var val=0; // netto without cost of army !!!!!!!!!
			var sum=0;
			for(i = 0 ; i < cityName.length; i++){
//			val =(StrToNum(JSONcitys[i].Netto));
			sum = sum+val;
			}
//			tabla +='<td align="right">'+formatNum(sum);


			tabla +='<td align="right">'+ '-+-';
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			val =(StrToNum(JSONcitys[i].wood));
//GM_log("wood "+val);
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			val =(StrToNum(JSONcitys[i].woodprod));
			sum = sum+val;
			}
			var daywood=sum*24;
			tabla +='<td align="right">'+formatNum(sum);
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			val =(StrToNum(JSONcitys[i].wine));
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
//			val =(JSONcitys[i].winespending);
			val = cityReduxUse[i];
			sum = sum+val;
			}
			var daywinespend=parseInt(sum*24);
			tabla +='<td align="right">'+formatNum(parseInt(sum));
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			if(cityRecId[i] == 1){
			val =(StrToNum(JSONcitys[i].wineprod));
			sum = sum+val;
			}
			}
			var daywine=sum*24;
			if(daywine < daywinespend){
			tabla +='<td style="color:tomato;text-align:right">'+formatNum(sum);
			}else{
			tabla +='<td align="right">'+formatNum(sum);
			}

	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			val =(StrToNum(JSONcitys[i].marble));
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			if(cityRecId[i] == 2){
			val =(StrToNum(JSONcitys[i].marbleprod));
			sum = sum+val;
			}
			}
			var daymarble=sum*24;
			tabla +='<td align="right">'+formatNum(sum);

	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			val =(StrToNum(JSONcitys[i].crystal));
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			if(cityRecId[i] == 3){
			val =(StrToNum(JSONcitys[i].crystalprod));
			sum = sum+val;
			}
			}
			var daycrystal=sum*24;
			tabla +='<td align="right">'+formatNum(sum);

	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			val = (StrToNum(JSONcitys[i].sulfur));
			sum = sum+val;
			}
			tabla +='<td align="right">'+formatNum(sum);
			
	                    var val =0;
			var sum =0;
			for(i = 0 ; i < cityName.length; i++){
			if(cityRecId[i] == 4){
			val =(StrToNum(JSONcitys[i].sulfurprod));
			sum = sum+val;
			}
			}
			var daysulfur=sum*24;
			tabla +='<td align="right">'+formatNum(sum);

			tabla += '<tr><td></td><td>Totals/day</td>';
			tabla += '<td></td>';//cityname
			tabla += '<td></td>';//citizens
			tabla += '<td></td>';
			tabla += '<td></td>';
			tabla += '<td></td>';//money
			tabla += '<td></td>';
			tabla += '<td></td>';
//			tabla += '<td></td>';// storage
			tabla += '<td align="right">'+formatNum(daywood)+'</td><td>'
			tabla += '</td><td align="right">'+formatNum(daywinespend)+'</td>'
			tabla += '<td align="right">'+formatNum(daywine)+'</td>'
			tabla += '<td></td><td align="right">'+formatNum(daymarble)+'</td>'
			tabla += '<td></td><td align="right">'+formatNum(daycrystal)+'</td><td></td>'
			tabla += '<td align="right">'+formatNum(daysulfur)+'</td></tr>'
			}
			//-------------------------------------------------------------------------------
		tabla += '</table><p>';
	
		document.getElementById("resourcedealer5-2").innerHTML  = tabla;

// -------------------------------armytable---------------		

	tabla ='';
	document.getElementById("ArmyTable").innerHTML = '';
	tabla += '<table border="1" bordercolor="#c69262" width="100%">';

	LineStyle = 'style="max-height:20px;min-width: 20px; max-width: 30px; overflow: hidden;font-weight:bold;background-image: url(skin/input/button.png)"';
	
	tabla += '<tr style="max-height:20px;font-weight:bold;background-image: url(skin/input/button.png);"><td>   </td<td><td>Cityname</td>';

	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army1Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army2Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army3Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army4Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army5Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army6Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army7Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army8Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army9Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army10Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army11Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army12Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army13Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Army14Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy1Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy2Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy3Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy4Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy5Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy6Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy7Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy8Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy9Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy10Name+'</td>';
	tabla += '<td '+LineStyle+'">'+JSONcitys[0].Navy11Name+'</td>';
	tabla += '</tr>';
	for (var i = 0; i < cityName.length; i++) {  
				var rem = i%2;
					if ( rem >0 ){  // split odd/even lines , bold for current city
					LineStyle = 'style=" height:25px;text-align:left;background: #FDD4A6;font-weight:normal"'
					LineStyleN = 'style="text-align:right;background: #FDD4A6;font-weight:normal"'
					}	
					else{
					LineStyle = 'style=" height:25px;text-align:left;background: #EFC287;font-weight:normal"'
					LineStyleN = 'style="text-align:right;background: #EFC287;font-weight:normal"'
					}

		
		
		
		
		tabla += '<tr><td '+ LineStyle +'>'+(i+1)+'</td><td '+ LineStyle +'><a '+ LineStyle +'href="/index.php?view=city&cityId='+cityId[i]+'">'+cityName[i]+'</a></td>';;
		if(JSONcitys[i].Army1count){
		if(JSONcitys[i].Army1count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army1count+'</td>';
		}
		if(JSONcitys[i].Army2count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army2count+'</td>';
		}
		if(JSONcitys[i].Army3count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army3count+'</td>';
		}
		if(JSONcitys[i].Army4count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army4count+'</td>';
		}
		if(JSONcitys[i].Army5count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army5count+'</td>';
		}
		if(JSONcitys[i].Army6count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army6count+'</td>';
		}
		if(JSONcitys[i].Army7count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army7count+'</td>';
		}
		if(JSONcitys[i].Army8count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army8count+'</td>';
		}
		if(JSONcitys[i].Army9count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army9count+'</td>';
		}
		if(JSONcitys[i].Army10count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army10count+'</td>';
		}
		if(JSONcitys[i].Army11count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army11count+'</td>';
		}
		if(JSONcitys[i].Army12count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army12count+'</td>';
		}
		if(JSONcitys[i].Army13count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army13count+'</td>';
		}
		if(JSONcitys[i].Army14count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Army14count+'</td>';
		}
		if(JSONcitys[i].Navy1count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy1count+'</td>';
		}
		if(JSONcitys[i].Navy2count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy2count+'</td>';
		}
		if(JSONcitys[i].Navy3count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy3count+'</td>';
		}
		if(JSONcitys[i].Navy4count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy4count+'</td>';
		}
		if(JSONcitys[i].Navy5count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy5count+'</td>';
		}
		if(JSONcitys[i].Navy6count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy6count+'</td>';
		}
		if(JSONcitys[i].Navy7count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy7count+'</td>';
		}
		if(JSONcitys[i].Navy8count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy8count+'</td>';
		}
		if(JSONcitys[i].Navy9count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy9count+'</td>';
		}
		if(JSONcitys[i].Navy10count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy10count+'</td>';
		}
		if(JSONcitys[i].Navy11count == 0){
		tabla += '<td '+ LineStyleN +'>-</td>';
		}else{
		tabla +='<td '+ LineStyleN +'>'+JSONcitys[i].Navy11count+'</td>';
		}
		}else{
		tabla += '<td> No Data </td>';
		}
		tabla +='</tr>';
		}
		document.getElementById("ArmyTable").innerHTML  = tabla;

		}else{
		document.getElementById("dealers").innerHTML  = "No Data to display";
	}
	
	
	
	
	
document.getElementById("ResourceDealerFooter").innerHTML = ErrorString;		
}





function num_to_func(num){
	switch(num){
		case "0": return "T"; break;
		case "1": return "S"; break;
		case "2": return "d"; break;
	}  
}


p = document.getElementById("cel_menu_3");
h = document.createElement('a');
h.setAttribute('class','button');
h.id = "b_s_h_deals";
if(getVar("s_h_deals")==0){
	h.innerHTML = 'Show Buildings';
	document.getElementById("resourcedealer5").style.display="none";
}else{
	h.innerHTML = 'Hide Buildings';
	document.getElementById("resourcedealer5").style.display="inline";
}
h.addEventListener("click",function(){f_s_h_deals();},false);
p.appendChild(h);

function f_s_h_deals(){
	if(getVar("s_h_deals")==1){
		setVar("s_h_deals",0);
		document.getElementById("b_s_h_deals").innerHTML = 'Show Buildings';
		document.getElementById("resourcedealer5").style.display="none";
	}else{
		setVar("s_h_deals",1);
		document.getElementById("b_s_h_deals").innerHTML = 'Hide Buildings';
		document.getElementById("resourcedealer5").style.display="inline";
	}
}

p = document.getElementById("cel_menu_4");
h = document.createElement('a');
h.setAttribute('class','button');
h.id = "b_s_h_inform";
if(getVar("s_h_inform")==0){
	h.innerHTML = 'Show Resources';
	document.getElementById("resourcedealer5-2").style.display="none";
}else{
	h.innerHTML = 'Hide Resources';
	document.getElementById("resourcedealer5-2").style.display="inline";
}
h.addEventListener("click",function(){f_s_h_inform();},false);
p.appendChild(h);

function f_s_h_inform(){
	if(getVar("s_h_inform")==1){
		setVar("s_h_inform",0);
		document.getElementById("b_s_h_inform").innerHTML = 'Show Resources';
		document.getElementById("resourcedealer5-2").style.display="none";
	}else{
		setVar("s_h_inform",1);
		document.getElementById("b_s_h_inform").innerHTML = 'Hide Resources';
		document.getElementById("resourcedealer5-2").style.display="inline";
	}
}

//   spare button............
p = document.getElementById("cel_menu_5");
h = document.createElement('a');
h.setAttribute('class','button');
h.id = "b_s_h_Army";
if(getVar("s_h_Army")==0){
	h.innerHTML = 'Show Army';
	document.getElementById("ArmyTable").style.display="none";
}else{
	h.innerHTML = 'Hide Army';
	document.getElementById("ArmyTable").style.display="inline";
}
h.addEventListener("click",function(){f_s_h_Army();},false);
p.appendChild(h);

function f_s_h_Army(){
	if(getVar("s_h_Army")==1){
		setVar("s_h_Army",0);
		document.getElementById("b_s_h_Army").innerHTML = 'Show Army';
		document.getElementById("ArmyTable").style.display="none";
	}else{
		setVar("s_h_Army",1);
		document.getElementById("b_s_h_Army").innerHTML = 'Hide Army';
		document.getElementById("ArmyTable").style.display="inline";
	}
}



var momentoActual = new Date();
var m_ant = parseInt(momentoActual/(1000*60));


//function $(id){
//	return document.getElementById(id);
//}


function StrToNum(str){
//GM_log("str in "+str);
if(!str){
	return 0;
	}else{
//	if(str>1000){
	str = str.replace('.','');
	str = str.replace(',','');
	str = str.replace(',','');
	if (str.indexOf('k',0) > 0)	{
		str = str.replace("k","");
//GM_log("str  out "+str);
		return parseInt(str) * 1000;
		}
		return parseInt(str);
	}
}

function formatNum(a){  // format back to M,hhh.rrr
//return a;
//GM_log(a+"  "+r);
var m=parseInt(a/1000000);
var r=a-(m*1000000);
var h=parseInt(r/1000);
r=r-(h*1000);
//GM_log(h+"  "+r);
if(h>0){
if(r<10){r='0'+r}
if(r<100){r='0'+r}
}
//GM_log("m-h-r "+m+"  "+h+" "+r);
if(m == 0){
	if(h < 1){
	return r
	}

return h+unsafeWindow.LocalizationStrings.thousandSeperator+r;
}
	var H = parseInt(h)
	if(H<10){h='0'+h}
//GM_log(h);
	if(H<100){h='0'+h}
//GM_log(h);
	return m+unsafeWindow.LocalizationStrings.thousandSeperator+h+unsafeWindow.LocalizationStrings.thousandSeperator+r;
//		return h+unsafeWindow.LocalizationStrings.thousandSeperator+r	

}




function a0(str){
	var out = str.toString();
	if (out.length==1) {
		return "0"+out;
	}else{
		return str;
	}
}

function Fecha(time){
	var momentoActual = new Date();
	momentoActual.setTime(time);
	var y = momentoActual.getFullYear();
	var n = momentoActual.getMonth()+1;
	var d = momentoActual.getDate();
	var h = momentoActual.getHours();
	var m = momentoActual.getMinutes();
	return a0(d)+"/"+a0(n)+"/"+a0(y)+" "+a0(h)+":"+a0(m);
}


function getVar(varname, vardefault) {
  var res = GM_getValue(document.location.host+varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

function setVar(varname, varvalue) {
  GM_setValue(document.location.host+varname, varvalue);
}


function Findbuilding(index,name){// find buildinglvl for building(name) for city(index)  
for (i = 0 ; i<17 ; i++){
//GM_log(i +"  "+name);
//GM_log("name        "+JSONcitys[index].position[i].building);
if(JSONcitys[index]){	
	if((JSONcitys[index].position[i].building == name) || (JSONcitys[index].position[i].building == (name + ' constructionSite')) )
	{
//	GM_log("name        "+JSONcitys[index].position[i].building);
	return i;	
	}
	}
	}
return -1;  //building not found	
}

PT();   /////the big timerloop for dynamic-updating
function PT(){
	FechaActual();
	GM_log ("Update   now!!!!!  "+FechaActual());    
	cargar_dealers();
	setTimeout(PT,60*1000); 	
}
function FechaActual(){
	var momentoActual = new Date();
	var y = momentoActual.getFullYear();
	var n = momentoActual.getMonth()+1;
	var d = momentoActual.getDate();
	var h = momentoActual.getHours();
	var m = momentoActual.getMinutes();
	return a0(d)+"/"+a0(n)+"/"+a0(y)+" "+a0(h)+":"+a0(m);
}



function getcitydata(){  // get all data from currentcity
GM_log("In getcitydata");
	text=document.body.innerHTML; //first get data from page  and make it JSON
	var ini1 =  text.indexOf('updateBackgroundData"',0); // get citydatastring
	var ini2 =  text.indexOf('"updateTemplateData',ini1);     // find end
	var citystring = "{"+(text.substring(ini1+23,ini2-3))+""; // make substring of data
	//GM_log("citystring "+citystring);
	ErrorString = "Worldview , No data for city's availible  ";
	if(citystring.length > 5){
	ErrorString = 'In city';

	JSONcitydata = JSON.parse(citystring);  // make data JSON data
//GM_log("cityName.lenght "+cityName.length);

	if (view == "city"){
	for(i=0;i<cityName.length;i++){  //find current city
//GM_log(JSONcitydata.name);
//GM_log(i+"cityname!!!!!!!! "+cityName[i]);
//GM_log("view "+view);

	if(JSONcitydata.id == cityId[i]){
GM_log("city match!!!!!!!!"+i+' '+cityName[i]+' '+cityId[i]);

		var test = GM_getValue(document.location.host+"citybuildings"+cityId[i]);
		if(test) {
//GM_log("test "+ cityName[i]+test);
			JSONcitys[i]=JSON.parse(GM_getValue(document.location.host+"citybuildings"+cityId[i]));
		}else{
		JSONcitys[i] = JSONcitydata;
//GM_log(i+' '+cityName[i] +'Error! citydata not found , visit city to get data');
		}

// data from string
	JSONcitys[i].name=JSONcitydata.name;
	JSONcitys[i].id=JSONcitydata.id;
	JSONcitys[i].phase=JSONcitydata.phase;
	JSONcitys[i].ownerId=JSONcitydata.ownerId;
	JSONcitys[i].ownerName=JSONcitydata.ownerName;
	JSONcitys[i].islandId=JSONcitydata.islandId;
	JSONcitys[i].islandName=JSONcitydata.islandName;
	JSONcitys[i].islandXCoord=JSONcitydata.islandXCoord;
	JSONcitys[i].islandYCoord=JSONcitydata.islandYCoord;
	JSONcitys[i].buildingSpeedupActive=JSONcitydata.buildingSpeedupActive;
	JSONcitys[i].underConstruction=JSONcitydata.underConstruction;
	JSONcitys[i].endUpgradeTime=JSONcitydata.endUpgradeTime;
	JSONcitys[i].startUpgradeTime=JSONcitydata.startUpgradeTime;
	JSONcitys[i].speedupState=JSONcitydata.speedupState;
	JSONcitys[i].position=JSONcitydata.position;

// data from screen
	JSONcitys[i].maxstorage=((document.getElementById("js_GlobalMenu_max_wood")).firstChild.nodeValue); //   max storage
	JSONcitys[i].servertime=(unsafeWindow.dataSetForView.serverTime)+'"'; //time of the update
	JSONcitys[i].action=((document.getElementById("js_GlobalMenu_maxActionPoints")).firstChild.nodeValue);
	JSONcitys[i].citizens=((document.getElementById("js_GlobalMenu_citizens")).firstChild.nodeValue);
	JSONcitys[i].population=((document.getElementById("js_GlobalMenu_population")).firstChild.nodeValue);//total in current city
	JSONcitys[i].wood=((document.getElementById("js_GlobalMenu_wood")).firstChild.nodeValue);//wood in current city
	JSONcitys[i].woodprod=((document.getElementById("js_GlobalMenu_resourceProduction")).firstChild.nodeValue);//wood in current city
	JSONcitys[i].wine=((document.getElementById("js_GlobalMenu_wine")).firstChild.nodeValue);//wine in current city
	JSONcitys[i].wineprod=((document.getElementById("js_GlobalMenu_production_wine")).firstChild.nodeValue);//wine in current city
	JSONcitys[i].marble=((document.getElementById("js_GlobalMenu_marble")).firstChild.nodeValue);//marble in current city
	JSONcitys[i].marbleprod=((document.getElementById("js_GlobalMenu_production_marble")).firstChild.nodeValue);//marble in current city
	JSONcitys[i].crystal=((document.getElementById("js_GlobalMenu_crystal")).firstChild.nodeValue);//cristal in current city
	JSONcitys[i].crystalprod=((document.getElementById("js_GlobalMenu_production_crystal")).firstChild.nodeValue);//cristal in current city
	JSONcitys[i].sulfur=((document.getElementById("js_GlobalMenu_sulfur")).firstChild.nodeValue);//sulfur in current city
	JSONcitys[i].sulfurprod=((document.getElementById("js_GlobalMenu_production_sulfur")).firstChild.nodeValue);//sulfur in current city

	JSONcitys[i].tradegood=((document.getElementById("js_GlobalMenu_production_container_marble")).firstChild.nodeValue);//cristal in current city
	JSONcitys[i].winespending=(unsafeWindow.dataSetForView.wineSpendings);
ErrorString = "updating city "+JSONcitys[i];	
var myJSONText = JSON.stringify(JSONcitys[i]);  //convert back to string for storage
GM_log("myJSONText "+myJSONText);	
	
	var JSONcity = JSON.parse(myJSONText); // convert to JSON for use in program , If program fails here there is an error in the string
	setVar("citybuildings"+JSONcitys[i].id,myJSONText); // store the data for the current city
	}else{
//		var levelsdata=(levelsdata+","+citydata[i][j]);

	}
	var levelsdata=(levelsdata+")");
}
}

servertime  = unsafeWindow.dataSetForView.serverTime;  // get the servertime 
GM_log("out getcitydata");  // finished gathering data for current city
}
}




function getcitysdata(){ // get all city's and rec,coords,id,relations
GM_log("In getcitysdata !!!!!!!!!!!!!!!!!!!!!!!!!");

JSONcitydata = (unsafeWindow.dataSetForView.relatedCityData.selectedCity); // current cityId
	ind_cityId = 0;   //make array's for easy use
	for (var key in unsafeWindow.dataSetForView.relatedCityData){     // list all keys and fill array
//GM_log(unsafeWindow.dataSetForView.relatedCityData[key].relationship);	
	if ( unsafeWindow.dataSetForView.relatedCityData[key].relationship == 'ownCity'){

		if(unsafeWindow.dataSetForView.relatedCityData[key].tradegood){

		cityId[ind_cityId] = unsafeWindow.dataSetForView.relatedCityData[key].id;
		cityCoords[ind_cityId] = unsafeWindow.dataSetForView.relatedCityData[key].coords;
//var test = a0(unsafeWindow.dataSetForView.relatedCityData.city_+citys[key].id.name);
//GM_log("test relatedcitydata "+citys[key]name+" " +test);
		cityName[ind_cityId] = unsafeWindow.dataSetForView.relatedCityData[key].name;
//GM_log("test relatedcitydata "+key+" "+ cityName[ind_cityId]+" " +test);
		cityRecId[ind_cityId] = unsafeWindow.dataSetForView.relatedCityData[key].tradegood;
		cityRecStr[ind_cityId]=resourcetrad[(unsafeWindow.dataSetForView.relatedCityData[key].tradegood)].toLowerCase();// all icons are lowercase

		if (cityRecStr[ind_cityId]=="crystal glass")
			{
			cityRecStr[ind_cityId] = "glass";  // make 'glass' for the icon;  "server"/skin/resources/icon_glass.gif
			}
		if (cityRecStr[ind_cityId]=="sulphur")
			{
			cityRecStr[ind_cityId] = "sulfur";  // make 'sulfur' for the icon;  "server"/skin/resources/icon_sulfur.gif
			}

		}
		ind_cityId++;
		}
	}

	
//	// do testrun on data......Dump all to console
//for (i=0;i<ind_cityId;i++){	
//GM_log("i  "+cityId[i] +" "+cityName[i]+" "+cityCoords[i]+" "+cityRecId[i]+" "+cityRecStr[i]);	
//}

GM_log("out getcitys");
}


/*   unused ----------------------------------------------------------------------------
function get(url, cb) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { cb(xhr.responseText) }
    })
}

function post(url, data, cb) {
    GM_xmlhttpRequest({
        method: "POST",
        url: data,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { cb(xhr.responseText); }
    });
}
------------------------------------------------------------------------------------------*/ 



 
 function testing(view) {

 GM_log("in testing: view "+view);
 
 
if (view == 'finances') {   
//GM_log("in testing: view "+view);
    var element=document.getElementById("finances");  

banner =  (element.childNodes[1].childNodes[1].childNodes[0].childNodes[0]); //check for add_banner above table
b=0;
if(banner){  // if banner all nodes are shifted 2 up
b=1;
}    
//GM_log("Banner = "+b+" - "+banner);    
for(i=0;i<cityName.length;i++){    
var test = GM_getValue(document.location.host+"citybuildings"+cityId[i]);
if(test) {
//  GM_log("test in finances "+ cityName[i]+test);
	JSONcitys[i]=JSON.parse(GM_getValue(document.location.host+"citybuildings"+cityId[i]));


	j=i*2;
//GM_log("testing finances city name "+element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[1].firstChild.nodeValue);
	           JSONcitys[i].Bruto  = (element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[3].innerHTML);
//GM_log("testing finances city brutoincome "+element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[3].innerHTML)+" - "+JSONcitys[i].Bruto;
	      JSONcitys[i].ScienceCost = (element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[5].childNodes[0].innerHTML);
//GM_log("testing finances city sciencecost "+element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[5].childNodes[0].innerHTML);
           	  JSONcitys[i].Netto = (element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[7].innerHTML);
//GM_log("testing finances citynetto income "+element.childNodes[1].childNodes[1].childNodes[7+b].childNodes[1].childNodes[j+2].childNodes[7].innerHTML);
	var myJSONText = JSON.stringify(JSONcitys[i]);  //convert back to string for storage
	var JSONcity = JSON.parse(myJSONText); // convert to JSON for use in program , If program fails here there is an error in the string
//	GM_log("myJSONText storing in finances "+myJSONText);
	setVar("citybuildings"+cityId[i],myJSONText); // store the data for the city
	}else{
//	GM_log(i+' '+cityName[i] +'Error! citydata not found , visit city to get data');
	}
}

}


if (view == 'townHall') {   
    var element=document.getElementById("townHall");  
//for(i=0;i<cityName.length;i++){   
cityhall=(document.getElementById("renameCity").childNodes[1].childNodes[3].childNodes[5].value);
GM_log("cityhall "+cityhall)

//if(cityhall == cityName[i]){//find the city
GM_log(cityhall);
	JSONcitys[i]=JSON.parse(GM_getValue(document.location.host+"citybuildings"+cityhall)); //get the citydata
	GM_log("testing TownHall js_TownHallPopulationGrowthValue"+document.getElementById("js_TownHallPopulationGrowthValue").firstChild.nodeValue);
	JSONcitys[i].PopulationGrowth=(document.getElementById("js_TownHallPopulationGrowthValue").firstChild.nodeValue); //add the data
	JSONcitys[i].MaxInhabitants=(document.getElementById("js_TownHallMaxInhabitants").firstChild.nodeValue); //add the data
	GM_log("testing TownHall-TownHallMaxInhabitants "+document.getElementById("js_TownHallMaxInhabitants").firstChild.nodeValue);
	var myJSONText = JSON.stringify(JSONcitys[i]);  //convert back to string for storage
	var JSONcity = JSON.parse(myJSONText); // convert to JSON for use in program , If program fails here there is an error in the string
	setVar("citybuildings"+JSONcitydata.id,myJSONText); // store the data for the city
ErrorString = "updating population "+cityName[i];
//	}
//}
}  

if (view == 'cityMilitary'){
//GM_log("in testing: view "+view);
    var element=document.getElementById("tabUnits");  

banner =  (element.childNodes[1].childNodes[1].childNodes[0].childNodes[0]); //check for add_banner above table
b=0;
if(banner){  // if banner all nodes are shifted 2 up
b=2;
}    

cityId = (unsafeWindow.dataSetForView.relatedCityData.selectedCity);  // current city 
//GM_log("JSONcitydata "+cityId);
for (var key in unsafeWindow.dataSetForView.relatedCityData){
 if(key == cityId){
var currentCity = unsafeWindow.dataSetForView.relatedCityData[key].name;

}
var citystring =(cityId.substring(5));
GM_log("currentCity "+currentCity+" "+citystring);
}
var test = GM_getValue(document.location.host+"citybuildings"+citystring);
if(test) {
//GM_log("test "+ cityName[i]+test);
	JSONcitydata=JSON.parse(GM_getValue(document.location.host+"citybuildings"+citystring));
}




JSONcitydata.Army1Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[1].title);
JSONcitydata.Army1count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[1].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army2Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[3].title);
JSONcitydata.Army2count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[3].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army3Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[5].title);
JSONcitydata.Army3count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[5].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army4Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[7].title);
JSONcitydata.Army4count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[7].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army5Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[9].title);
JSONcitydata.Army5count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[9].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army6Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[11].title);
JSONcitydata.Army6count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[11].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army7Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[13].title);
JSONcitydata.Army7count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[13].firstChild.nodeValue);
//GM_log(name+" "+count);
//------------------

JSONcitydata.Army8Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[1].title);
JSONcitydata.Army8count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[1].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army9Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[3].title);
JSONcitydata.Army9count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[3].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army10Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[5].title);
JSONcitydata.Army10count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[5].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army11Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[7].title);
JSONcitydata.Army11count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[7].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army12Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[9].title);
JSONcitydata.Army12count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[9].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army13Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[11].title);
JSONcitydata.Army13count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[11].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Army14Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[13].title);
JSONcitydata.Army14count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[13].firstChild.nodeValue);
//GM_log(name+" "+count);

//-----------------------------ships

    var element=document.getElementById("tabShips");  

JSONcitydata.Navy1Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[1].title);
JSONcitydata.Navy1count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[1].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy2Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[3].title);
JSONcitydata.Navy2count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[3].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy3Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[5].title);
JSONcitydata.Navy3count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[5].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy4Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[7].title);
JSONcitydata.Navy4count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[7].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy5Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[9].title);
JSONcitydata.Navy5count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[9].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy6Name = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[11].title);
JSONcitydata.Navy6count = (element.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[2].childNodes[11].firstChild.nodeValue);
//GM_log(name+" "+count);
//------------------

JSONcitydata.Navy7Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[1].title);
JSONcitydata.Navy7count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[1].firstChild.nodeValue);
//GM_log(name+" "+count);


JSONcitydata.Navy8Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[3].title);
JSONcitydata.Navy8count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[3].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy9Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[5].title);
JSONcitydata.Navy9count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[5].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy10Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[7].title);
JSONcitydata.Navy10count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[7].firstChild.nodeValue);
//GM_log(name+" "+count);

JSONcitydata.Navy11Name = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].childNodes[9].title);
JSONcitydata.Navy11count = (element.childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[2].childNodes[9].firstChild.nodeValue);
//GM_log(name+" "+count);



var myJSONText = JSON.stringify(JSONcitydata);  //convert back to string for storage
var JSONcity = JSON.parse(myJSONText); // convert to JSON for use in program , If program fails here there is an error in the string
GM_log("myJSONText "+myJSONText);
setVar("citybuildings"+citystring,myJSONText); // store the data for the city




}



cargar_dealers(); // update display
}



/*--------------------------------

function DoFinances(){
    var element=document.getElementById("finances");  

for(i=0;i<cityName.length;i++){    
var test = GM_getValue(document.location.host+"citybuildings"+cityName[i]);
if(test) {
  GM_log("test "+ cityName[i]+test);
	JSONcitys[i]=JSON.parse(GM_getValue(document.location.host+"citybuildings"+cityName[i]));


	j=i*2;
	GM_log("testing finances city name "+element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[1].innerHTML);
	JSONcity[i].Bruto  = (element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[1].innerHTML);
	GM_log("testing finances city brutoincome "+element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[3].innerHTML);
	JSONcity[i].ScienceCost = (element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[5].childNodes[0].innerHTML);
	GM_log("testing finances city sciencecost "+element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[5].childNodes[0].innerHTML);
	JSONcity[i].Netto = (element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[7].innerHTML);
	GM_log("testing finances citynetto income "+element.childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[j+2].childNodes[7].innerHTML);
	var myJSONText = JSON.stringify(JSONcity[i]);  //convert back to string for storage
	var JSONcity = JSON.parse(myJSONText); // convert to JSON for use in program , If program fails here there is an error in the string
	GM_log("myJSONText "+myJSONText);
	setVar("citybuildings"+cityName[i],myJSONText); // store the data for the city

	}else{
	GM_log(i+' '+cityName[i] +'Error! citydata not found , visit city to get data');
	}
}
GM_log("testing finances total income "+element.childNodes[1].childNodes[1].childNodes[20].childNodes[1].childNodes[6].childNodes[7].innerHTML);
}


[Scriptish] Overview/Overview: myJSONText {"name":"Polis","id":"6178","phase":2,"ownerId":"2515","ownerName":"giap","islandId":"74","islandName":"Shaymios","islandXCoord":"44","islandYCoord":"47","buildingSpeedupActive":1,"lockedPosition":[13,"Om hier te kunnen bouwen, moet je bureaucratie onderzoeken"],"position":[{"name":"Stadhuis","level":"5","isBusy":false,"building":"townHall"},{"name":"Handelshaven","level":"1","isBusy":false,"building":"port"},{"name":"Scheepswerf","level":"1","isBusy":false,"building":"shipyard"},{"name":"Academie","level":"5","isBusy":false,"building":"academy constructionSite","completed":"1340890172","countdownText":"33m 1s","buildingimg":"constructionSite"},{"building":"buildingGround land"},{"building":"buildingGround land"},{"name":"Taverne","level":"6","isBusy":false,"building":"tavern"},{"name":"Houthakkersloge","level":"4","isBusy":false,"building":"forester"},{"name":"Glasblazer","level":"2","isBusy":false,"building":"glassblowing"},{"building":"buildingGround land"},{"building":"buildingGround land"},{"name":"Werkplaats","level":"1","isBusy":false,"building":"workshop"},{"name":"Opslagplaats","level":"5","isBusy":false,"building":"warehouse"},{"building":"buildingGround land"},{"name":"Stadsmuur","level":"2","isBusy":false,"building":"wall"},{"name":"Gouverneurswoning","level":"1","isBusy":false,"building":"palaceColony"},{"name":"Timmerman","level":"5","isBusy":false,"building":"carpentering"}],"beachboys":"visible","spiesInside":null,"maxstorage":"41,500","servertime":"1340888191\"","action":"4","citizens":"85","population":"233","wood":"3,087","woodprod":"108","wine":"1,750","marble":"234","crystal":"1,028","sulfur":"0","tradegood":"Uurproductie Marmer:\n                ","winespending":0,"PopulationGrowth":"0.42 ","MaxInhabitants":"382","Bruto":"255","ScienceCost":"-168","Netto":"87","Army1Name":"Hopliet","Army1count":"0       ","Army2Name":"Stoomreus","Army2count":"-       ","Army3Name":"Speerwerper","Army3count":"6       ","Army4Name":"Zwaardvechter","Army4count":"0       ","Army5Name":"Steenslingeraar","Army5count":"0       ","Army6Name":"Boogschutter","Army6count":"-       ","Army7Name":"Zwavel schutters","Army7count":"-       ","Army8Name":"Ram","Army8count":"0       ","Army9Name":"Katapult","Army9count":"-       ","Army10Name":"Mortier","Army10count":"-       ","Army11Name":"Gyrocopter","Army11count":"-       ","Army12Name":"Bombardier","Army12count":"-       ","Army13Name":"Kok","Army13count":"-       ","Army14Name":"Dokter","Army14count":"-       ","Navy1Name":"Vuurschip","Navy1count":" -    ","Navy2Name":"Stoomram","Navy2count":" -    ","Navy3Name":"Ramschip","Navy3count":" 1    ","Navy4Name":"Katapult schip","Navy4count":" -    ","Navy5Name":"Ballista schip","Navy5count":" 0    ","Navy6Name":"Mortier schip","Navy6count":" -    ","Navy7Name":"Rakettenschip","Navy7count":" -    ","Navy8Name":"Onderzeeër","Navy8count":" -    ","Navy9Name":"Schoepenradsnelheidsschip","Navy9count":" -    ","Navy10Name":"Ballonendrager","Navy10count":" -    ","Navy11Name":"Tender","Navy11count":" -    ","wineprod":"0","marbleprod":"0","crystalprod":"20","sulfurprod":"0"}



*/
