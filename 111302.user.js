// ==UserScript==
// @name           vPopulus Search
// @namespace      ivicaSR_vpopulus_search
// @description    Dodaje pretragu da bude na svakoj stranici dodjavola
// @include        http://www.vpopulus.net/*
// ==/UserScript==


String.prototype.parseJSON = function () {
     try {
         return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                 this.replace(/"(\\.|[^"\\])*"/g, ''))) &&
             eval('(' + this + ')');
     } catch (e) {
         return false;
     }
 };


var currLoc = location.href;
var url_arr = currLoc.split('/');

var countries = ["Hungary", "Romania", "Serbia", "Croatia", "Poland", "Spain", "Greece", "Denmark", "Republic of Macedonia", "Argentina", "Brazil", "Portugal", "Turkey", "USA", "Sweden", "Germany", "Montenegro"];

var search_box = "<center><div class=\"searchholder\">"+
            "<form accept-charset=\"utf-8\" method=\"post\" action=\"http://www.vpopulus.net/search\">            Search citizen: <input type=\"text\" class=\"searchqin ftxtarea\" name=\"qnam\">"+
            "<input type=\"submit\" class=\"xgrebtn\" value=\"Go!\">"+
            "</form>        </div>"+
"</center>";

document.getElementById('ubertop').innerHTML+=search_box;

var menu_table = document.getElementById('Table_01');
var class_menu = menu_table.getElementsByClassName('menu')[0];
var lis = class_menu.getElementsByTagName('li')[2];
var lisuls = lis.getElementsByTagName('ul')[0].innerHTML+="<li><a href=\"http://www.vpopulus.net/wars/active/0/1\">Wars</a></li>";




var scriptCode = new Array();
scriptCode.push('function pushFighter(side) {'        );
scriptCode.push('    if(fighterQueue[side].length > 0) {'        );
scriptCode.push('        var fighter = fighterQueue[side].shift();'        );
scriptCode.push('        loadedFighters[side].unshift(fighter);'        );
scriptCode.push('        '        );
scriptCode.push('        // creating an element'        );
scriptCode.push('        var efighter = document.createElement(\'div\');'        );
scriptCode.push('		efighter.setAttribute(\'class\',\'battle_fighter b\'+(side ? \'green\' : \'red\'));'        );
scriptCode.push('		efighter.setAttribute(\'id\',\'f\'+fighter.fightId);'        );
scriptCode.push('        efighter.setAttribute(\'style\',\'opacity: 0;\');'        );
scriptCode.push('            var eavatar = document.createElement(\'div\'); efighter.appendChild(eavatar);'        );
scriptCode.push('			eavatar.setAttribute(\'class\',\'avatarholder goleft\');'        );
scriptCode.push('				var eavtImg = document.createElement(\'img\'); eavatar.appendChild(eavtImg);'        );
scriptCode.push('				eavtImg.src = fighter.avatar;'        );
scriptCode.push('				eavtImg.width = 55; eavtImg.height = 55; eavtImg.alt = fighter.name;'        );
scriptCode.push('			var einfo = document.createElement(\'div\'); efighter.appendChild(einfo);'        );
scriptCode.push('			einfo.setAttribute(\'class\',\'infoholder goleft\');'        );
scriptCode.push('				var ename = document.createElement(\'div\'); einfo.appendChild(ename);'        );
scriptCode.push('				ename.setAttribute(\'class\',\'nameholder\');'        );
scriptCode.push('				ename.innerHTML = fighter.name;'        );
scriptCode.push('				var edamage = document.createElement(\'div\'); einfo.appendChild(edamage);'        );
scriptCode.push('				edamage.setAttribute(\'class\',\'damageholder big numbers\');'        );
scriptCode.push('				edamage.innerHTML = (side ? \'+\' : \'-\') + fighter.damage;'        );
scriptCode.push('			var eclearer = document.createElement(\'div\'); efighter.appendChild(eclearer);'        );
scriptCode.push('			eclearer.setAttribute(\'style\',\'clear:both;\');'        );
scriptCode.push('        var efbox = document.getElementById(\'fighters_\'+(side ? \'right\' : \'left\'));'        );
scriptCode.push('        if(loadedFighters[side].length == 1) {'        );
scriptCode.push('            efbox.appendChild(efighter);'        );
scriptCode.push('        } else {'        );
scriptCode.push('            var eoldFirst = efbox.getElementsByTagName(\'div\')[0];'        );
scriptCode.push('            efbox.insertBefore(efighter, eoldFirst);'        );
scriptCode.push('        }'        );
scriptCode.push('        // -------------------'        );
scriptCode.push('        '        );
scriptCode.push('        if(loadedFighters[side].length > 1) {'        );
scriptCode.push('            $j(\'#f\'+loadedFighters[side][1].fightId).removeClass(\'b\'+(side ? \'green\' : \'red\')).addClass(\'bgray\');'        );
scriptCode.push('        }'        );
scriptCode.push('        '        );
scriptCode.push('        //if(loadedFighters[side].length == 100) {'        );
scriptCode.push('        //    var lastFighter = loadedFighters[side].pop();'        );
scriptCode.push('        //    $j(\'#f\'+lastFighter.fightId).animate({"height":"toggle","opacity":"toggle"},\'fast\',\'swing\',function() {'        );
scriptCode.push('		 //		efbox.removeChild(document.getElementById(\'f\'+lastFighter.fightId));'        );
scriptCode.push('		 //	});'        );
scriptCode.push('        //}'        );
scriptCode.push('        '        );
scriptCode.push('		$j(\'#f\'+fighter.fightId).hide().animate({"height":"toggle"}).animate({"opacity":1});'        );
scriptCode.push('    }'        );
scriptCode.push('}'        );

var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);





//dodaje udarce na profilu
if (url_arr[4]=='profile') {
	var org = document.getElementsByClassName('citizen_location')[0].getElementsByTagName('small')[1].innerHTML;
	
	if (org!="Founder") {
		var strength = 0;
		var rankS = 0;
		var rank = 0;
		
		var bio = document.getElementById('bio');
		var career = document.getElementById('career');
		
		var strength_temp = bio.getElementsByClassName('special big')[3];
		strength = strength_temp.innerHTML;
		//alert(strength);
		var rank_temp = career.getElementsByClassName('borderbottom')[3];
		rankS = rank_temp.innerHTML;
		//alert(rankS);
		
		switch(rankS) {
			case "Private":
				rank = 1;
				break;
			case "Corporal":
				rank = 2;
				break;
			case "Sergeant":
				rank = 3;
				break;
			case "Lieutenant":
				rank = 4;
				break;
			case "Captain":
				rank = 5;
				break;
			case "Colonel":
				rank = 6;
				break;
			case "General":
				rank = 7;
				break;
			case "Field Marshal":
				rank = 8;
				break;
			default:
				rank = 1;
				break;
		}
		
		//alert(calcDmg(parseFloat(strength),parseInt(rank),100,0));
		
		bio.innerHTML+='<div class="section_title">Battle Damage</div>';
		
		var tableStart = '<table width="100%" class="citizen_skills"><tbody>';
		var tableEnd = '</tbody></table>';
		var tableHeader = '<tr><td width="14%">well</td><td width="14%">Q0</td><td width="14%">Q1</td><td width="14%">Q2</td><td width="14%">Q3</td><td width="14%">Q4</td><td width="14%">Q5</td><td width="14%"><span id="calc-combine">Combine</span></td></tr>';
		
		var Q0100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,0));
		var Q090 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,0));
		var Q080 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,0));
		var Q070 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,0));
		var Q060 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,0));
		var Q1100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,1));
		var Q190 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,1));
		var Q180 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,1));
		var Q170 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,1));
		var Q160 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,1));
		var Q2100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,2));
		var Q290 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,2));
		var Q280 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,2));
		var Q270 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,2));
		var Q260 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,2));
		var Q3100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,3));
		var Q390 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,3));
		var Q380 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,3));
		var Q370 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,3));
		var Q360 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,3));
		var Q4100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,4));
		var Q490 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,4));
		var Q480 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,4));
		var Q470 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,4));
		var Q460 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,4));
		var Q5100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,5));
		var Q590 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,5));
		var Q580 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,5));
		var Q570 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,5));
		var Q560 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,5));
		
		var Q0 = Q0100+Q090+Q080+Q070+Q060;
		var Q1 = Q1100+Q190+Q180+Q170+Q160;
		var Q2 = Q2100+Q290+Q280+Q270+Q260;
		var Q3 = Q3100+Q390+Q380+Q370+Q360;
		var Q4 = Q4100+Q490+Q480+Q470+Q460;
		var Q5 = Q5100+Q590+Q580+Q570+Q560;
		
		
		//tableBody = '<tr><td width="14%">100</td><td width="14%">Q0</td><td width="14%">Q1</td><td width="14%">Q2</td><td width="14%">Q3</td><td width="14%">Q4</td><td width="14%">Q5</td></tr>';
		var soptions = '<option value="-1">None</option><option value="0">Q0</option><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option>';
		var table100 = '<tr><td width="14%">100</td><td width="14%">'+Q0100+'</td><td width="14%">'+Q1100+'</td><td width="14%">'+Q2100+'</td><td width="14%">'+Q3100+'</td><td width="14%">'+Q4100+'</td><td width="14%">'+Q5100+'</td><td width="14%"><select id="s100">'+soptions+'</select></td></tr>';
		var table90 = '<tr><td width="14%">90</td><td width="14%">'+Q090+'</td><td width="14%">'+Q190+'</td><td width="14%">'+Q290+'</td><td width="14%">'+Q390+'</td><td width="14%">'+Q490+'</td><td width="14%">'+Q590+'</td><td width="14%"><select id="s90">'+soptions+'</select></td></tr>';
		var table80 = '<tr><td width="14%">80</td><td width="14%">'+Q080+'</td><td width="14%">'+Q180+'</td><td width="14%">'+Q280+'</td><td width="14%">'+Q380+'</td><td width="14%">'+Q480+'</td><td width="14%">'+Q580+'</td><td width="14%"><select id="s80">'+soptions+'</select></td></tr>';
		var table70 = '<tr><td width="14%">70</td><td width="14%">'+Q070+'</td><td width="14%">'+Q170+'</td><td width="14%">'+Q270+'</td><td width="14%">'+Q370+'</td><td width="14%">'+Q470+'</td><td width="14%">'+Q570+'</td><td width="14%"><select id="s70">'+soptions+'</select></td></tr>';
		var table60 = '<tr><td width="14%">60</td><td width="14%">'+Q060+'</td><td width="14%">'+Q160+'</td><td width="14%">'+Q260+'</td><td width="14%">'+Q360+'</td><td width="14%">'+Q460+'</td><td width="14%">'+Q560+'</td><td width="14%"><select id="s60">'+soptions+'</select></td></tr>';
		var tableTot = '<tr><td class="special big" width="14%">Total:</td><td class="special big" width="14%">'+Q0+'</td><td class="special big" width="14%">'+Q1+'</td><td class="special big" width="14%">'+Q2+'</td><td class="special big" width="14%">'+Q3+'</td><td class="special big" width="14%">'+Q4+'</td><td class="special big" width="14%">'+Q5+'</td><td class="special big" width="14%" id="combineTotal">0</td></tr>';
		
		
		var table = '';
		table=tableStart+tableHeader+table100+table90+table80+table70+table60+tableTot+tableEnd;
		
		bio.innerHTML+=table;
	}
}



document.getElementById('s100').addEventListener('change', function(){
		combineVal();
	}, true);
document.getElementById('s90').addEventListener('change', function(){
		combineVal();
	}, true);
document.getElementById('s80').addEventListener('change', function(){
		combineVal();
	}, true);
document.getElementById('s70').addEventListener('change', function(){
		combineVal();
	}, true);
document.getElementById('s60').addEventListener('change', function(){
		combineVal();
	}, true);

function combineVal() {
	var s100 = document.getElementById('s100').value;
	var s90 = document.getElementById('s90').value;
	var s80 = document.getElementById('s80').value;
	var s70 = document.getElementById('s70').value;
	var s60 = document.getElementById('s60').value;
	var Qs100 = 0;
	var Qs90 = 0;
	var Qs80 = 0;
	var Qs70 = 0;
	var Qs60 = 0;
	if (s100!=-1) {
		Qs100 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),100,s100));
	}
	if (s90!=-1) {
		Qs90 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),90,s90));
	}
	if (s80!=-1) {
		Qs80 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),80,s80));
	}
	if (s70!=-1) {
		Qs70 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),70,s70));
	}
	if (s60!=-1) {
		Qs60 = Math.ceil(calcDmg(parseFloat(strength),parseInt(rank),60,s60));
	}
	document.getElementById('combineTotal').innerHTML = parseInt(Qs100)+parseInt(Qs90)+parseInt(Qs80)+parseInt(Qs70)+parseInt(Qs60);
	//alert(Qs100);
}

function calcDmg(str, rnk, well, q) {
	var rank_mul = 1 + rank/5;
	var wellness_mul = 1+ (well-25)/100;
	var Q = 0.5;
	if (q==0) {
		Q = 0.5;
	} else {
		Q = 1 + q/5;
	}
	return (Q*rank_mul*wellness_mul*str*2);
}



//dodaje dugme sa donacijama

if (url_arr[4]=='profile') {
	var id = url_arr[5];
	addDonationsButon(id);
}
function addDonationsButon(myID) {
	var org = document.getElementsByClassName('citizen_location')[0].getElementsByTagName('small')[1].innerHTML;
	
	if (org!="Founder") {
		document.getElementsByClassName('citizen_actions')[0].getElementsByTagName('ul')[0].innerHTML+='<li><a style="width: 130px ! important;" class="sbtn" href="http://www.vpopulus.net/citizen/donate/list/'+myID+'">All donations</a></li>';
	} else {
		document.getElementsByClassName('citizen_actions')[0].getElementsByTagName('ul')[0].innerHTML+='<li><a style="width: 142px ! important;" class="sbtn" href="http://www.vpopulus.net/citizen/donate/list/'+myID+'">All donations</a></li>';
	}
}

//na stranici sa donacijama pravi link do profila od imena i dodaje dugmad Donate i Send message
if (url_arr[5]=='list') {
	var id = url_arr[6];
	makeLink(id);
	addCitizenActions(id);
}

function addCitizenActions(myID) {
	
	var temp =  '<div class="citizen_actions">'+
				'<ul class="nostyle">'+
				'<li><a style="width: 130px ! important;" class="sbtn" href="http://www.vpopulus.net/citizen/donate/'+myID+'">Donate</a></li>'+
				'<li><a style="width: 130px ! important;" class="sbtn" href="http://www.vpopulus.net/messages/compose/'+myID+'">Send message</a></li>'+
				'</div>';
	document.getElementsByClassName('citizen_profile')[0].getElementsByClassName('goleft')[0].innerHTML += temp;
}

function makeLink(myID) {
	var temp = document.getElementsByClassName('citizen_overview')[0].getElementsByClassName('nameholder')[0];
	temp.innerHTML = '<a href="http://www.vpopulus.net/citizen/profile/'+myID+'" >'+temp.innerHTML+'</a>';
}


//dodaje dugme za preseljenje na stranici zemlje
if (url_arr[3]=='country') {
	var thisCountry = url_arr[4];
	var thisID = getCountryId(thisCountry);
	if (thisID>1) {
		//alert(thisID);
		GM_xmlhttpRequest({
			method: "GET",
	        url: "http://www.vpopulus.net/utils/region_list_move/"+thisID,
			onload:function(responseDetails){
				resp = responseDetails.responseText.parseJSON();
				//alert(resp["region-count"]);
				var regionOptions = "";
				for (var i=0;i<resp["region-count"];i++) {
					var regio = resp["regions"][i];
					//alert(regio.name);
					regionOptions+='<option value="'+regio.id+'">'+regio.name+'</option>';
					
				}
				var population = document.getElementById('population');
				var newElement = document.createElement('div');
				newElement.innerHTML = addCountryMove(thisID, regionOptions);
				//alert(newElement.innerHTML);
				population.parentNode.insertBefore(newElement, population.nextSibling);
			}
		});
	}
	
}

function getCountryId(country) {
	for (var i=0;i<countries.length;i++) {
		if (country==countries[i]) return (i+2);
	}
	return 1;
}


function addCountryMove(countryID, regOpt) {
	var mover = '<div class="section" id="move">'+
'		<div class="section_title">Change residence</div>'+
'		<div class="section_content">'+
'			<form accept-charset="utf-8" method="post" action="http://www.vpopulus.net/change-residence">				<div class="location_select">'+
'					<div class="locsel_cr">'+
'						<div class="locsel_country">'+
'						<input type="hidden" name="move_country" value="'+countryID+'" />'+
'						</div>'+
'						<div class="locsel_region">'+
'							<select style="" id="move_select_region" name="move_region"><option selected="selected" value="0">- Select a region -</option>'+regOpt+'</select>'+
'							<div style="display: none;" id="locsel_loading">Loading...</div>'+
'						</div>'+
'					</div>'+
'					<div style="clear: both;"></div>'+
'				</div>'+
'				<input type="submit" class="xgrebtn" id="move_button" value="Move" name="move">'+
'			</form>		</div>'+
'		</div>';
	return mover;
}





