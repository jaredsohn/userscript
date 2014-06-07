// ==UserScript==
// @name           Travian Site Update Data
// @namespace      not available.
// @version        5.2.1.2
// @license        Matz Larsson
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @description    To keep track on all of your villages.
// @include        http://*t*.travian.*/*
// @include        http://traviancalc.net84.net/*
// @include        http://traviancalc.clanteam.com/*
// ==/UserScript==

var thisVersion = "5.2.1.2";
var saveDataServer = "http://traviancalc.clanteam.com";

function toInt(value){return parseInt(value);}
function ID(id) { return document.getElementById(id) };
function text(id){return ID(id).innerHTML;}

function getArgument(name){
	var addr = window.location.search;
	if(addr.indexOf(name) == -1)return null;
	else{
		start = addr.indexOf(name)+name.length+1;		// +1 --> '='
		return addr.substring(start, (addr.indexOf("&", start)==-1?addr.length:addr.indexOf("&", start)));
	}
}

function getVillage(){return text("villageNameField");}
function getCoords(){
	source = ID('side_info').getElementsByTagName('ul');
	source = source[0].getElementsByTagName('li');
	for(i = 0; i<source.length; i++){
		if(source[i].getElementsByTagName('a')[0].innerHTML == getVillage()){
			source = source[i].getElementsByTagName('a');
			break;
		}
	}
	s = source[0].title;
	tmp = s.indexOf("nateX\">(")+8;
	x = toInt(s.substring(tmp, s.indexOf("</span>", tmp)));
	tmp = s.indexOf("nateY\">")+7;
	y = toInt(s.substring(tmp, s.indexOf(")</span>", tmp)));
	
	ans = new Array(2);
	ans[0] = x;
	ans[1] = y;
	return ans;
	
}
function getRV(id){return toInt(ID('l'+id).innerHTML);}
function getMax(id){text = ID('l'+id).innerHTML; text = text.substring(text.indexOf("/", -1)+1, text.length);return toInt(text);}
function getProd(id){
	source = ID('production').getElementsByTagName('tr');
	row = source[id];
	cells = row.getElementsByTagName('td');
	return toInt(cells[2].innerHTML);
}

function getAllRV(){
	var rv = new Array(4);
	for(i = 0; i<4; i++){
		rv[i] = new Array(3);
		rv[i][0] = getRV(i+1);
		rv[i][1] = getMax(i+1);
		rv[i][2] = getProd(i+1);
	}
	return rv;
}

function getTroops(){
	var source = ID('troops').getElementsByTagName('tr');
	var troops = new Array(source.length-1);
	for(i = 1; i<source.length; i++){
		cells = source[i].getElementsByTagName('td');
		troops[i-1] = new Array(2);
		if(cells[1]){					//Check if village has soldiers
			troops[i-1][0] = cells[1].innerHTML;
			
			image = cells[0].getElementsByTagName('img');
			if(image[0]){
				if(image[0].className == "unit uhero")troops[i-1][1] = 0;
				else{
					num = (toInt(image[0].className.split(' u')[1])-1);
					if(num<30)troops[i-1][1] = (num%10)+1;
					else troops[i-1][1] = 100;
				}
			}
			else alert("Error When Getting Soldiers");
		}
	}
	if(troops[0][0] == undefined || troops[0][1] == undefined){		//Hittade inga soldater
		troops[0][0] = 0;
		troops[0][1] = 0;
	}
	
	return troops;
}

function getType(){
	source = ID('side_info').getElementsByTagName('img');
	return toInt(source[1].className.split(' nationBig')[1]);
}

function getPlayer(){
	source = ID('side_info').getElementsByTagName('span');
	return source[0].innerHTML;
}

function getServer(){
	var tmp = document.location.hostname;
	tmp = tmp.replace("http://", "");
	server = tmp.substring(0, tmp.indexOf("."));
	return server;
}

function addDataToServer(num){
	if(num > 0){
		type = getType();
		player = getPlayer();
		village = getVillage();
		rv = getAllRV();
		troops = getTroops();
		server = getServer();
		
		answer = false;
		rvstr = "";for(i = 0;i<rv.length; i++){if(i!=0)rvstr += ","; rvstr += rv[i];}
		trstr = "";for(i = 0;i<troops.length; i++){if(i!=0)trstr += ","; trstr += troops[i];}
		
		//alert(saveDataServer+"/add.php?p="+player+"&t="+type+"&v="+village+"&s="+server+"&rv="+rvstr+"&tr="+trstr);

		start = new Date().getTime();
		$.get(saveDataServer+"/add.php", {p: player, t: type, v: village, s: server, rv: rvstr, tr: trstr}, function(){
			answer = true;
		});
		count = 0;
		while(!answer){
			count++;
			if(count>=60)break;
		}
		//alert(answer+" && time = "+(new Date().getTime()-start)+" ms  [count="+count+"]");
	}
	
	if(num < 0){
		alert("Starting process. This may take a minute.\nNOTE: The script is regularly updated @ userscripts.org! This action may require the latest update.");
		num = 0;
	}
	
	try{
		source = ID('side_info').getElementsByTagName('ul');
		data = source[0].getElementsByTagName('li');
		links = data[num].getElementsByTagName('a');
		link = links[0]+"&znext="+(num+1)+"";
		location.href = link;
	}catch(error){if(num >= data.length)alert("Update Done!");else alert("Error! Updated "+num+"/"+data.length);}
	return;
}

function calculateTime(){
	unit = [];
	unit[1] = [40, 35, 50, 120, 100, 180, 40, 1, 6, 40];    // Legionnaire
	unit[2] = [30, 65, 35, 100, 130, 160, 70, 1, 5, 20];    // Praetorian
	unit[3] = [70, 40, 25, 150, 160, 210, 80, 1, 7, 50];    // Imperian
	unit[4] = [0, 20, 10, 140, 160, 20, 40, 2, 16, 0];  // Equites Legati
	unit[5] = [120, 65, 50, 550, 440, 320, 100, 3, 14, 100];    // Equites Imperatoris
	unit[6] = [180, 80, 105, 550, 640, 800, 180, 4, 10, 70];    // Equites Caesaris
	unit[7] = [60, 30, 75, 900, 360, 500, 70, 3, 4, 0]; // Battering Ram
	unit[8] = [75, 60, 10, 950, 1350, 600, 90, 6, 3, 0];    // Fire catapult
	unit[9] = [50, 40, 30, 30750, 27200, 45000, 37500, 4, 4, 0];    // Senator
	unit[10] = [0, 80, 80, 5800, 5300, 7200, 5500, 1, 5, 1600]; // Settler
	unit[11] = [40, 20, 5, 95, 75, 40, 40, 1, 7, 60];   // Clubswinger
	unit[12] = [10, 35, 60, 145, 70, 85, 40, 1, 7, 40]; // Spearfighter
	unit[13] = [60, 30, 30, 130, 120, 170, 70, 1, 6, 50];   // Axefighter
	unit[14] = [0, 10, 5, 160, 100, 50, 50, 1, 9, 0];   // Scout
	unit[15] = [55, 100, 40, 370, 270, 290, 75, 2, 10, 110];    // Paladin
	unit[16] = [150, 50, 75, 450, 515, 480, 80, 3, 9, 80];  // Teuton Knight
	unit[17] = [65, 30, 80, 1000, 300, 350, 70, 3, 4, 0];   // Ram
	unit[18] = [50, 60, 10, 900, 1200, 600, 60, 6, 3, 0];   // Catapult
	unit[19] = [40, 60, 40, 35500, 26600, 25000, 27200, 4, 4, 0];   // Chief
	unit[20] = [10, 80, 80, 7200, 5500, 5800, 6500, 1, 5, 1600];    // Settler
	unit[21] = [15, 40, 50, 100, 130, 55, 30, 1, 7, 30];    // Phalanx
	unit[22] = [65, 35, 20, 140, 150, 185, 60, 1, 6, 45];   // Swordfighter
	unit[23] = [0, 20, 10, 170, 150, 20, 40, 2, 17, 0]; // Pathfinder
	unit[24] = [90, 25, 40, 350, 450, 230, 60, 2, 19, 75];  // Theutates Thunder
	unit[25] = [45, 115, 55, 360, 330, 280, 120, 2, 16, 35];    // Druidrider
	unit[26] = [140, 50, 165, 500, 620, 675, 170, 3, 13, 65];   // Haeduan
	unit[27] = [50, 30, 105, 950, 555, 330, 75, 3, 4, 0];   // Ram
	unit[28] = [70, 45, 10, 960, 1450, 630, 90, 6, 3, 0];   // Trebuchet
	unit[29] = [40, 50, 50, 30750, 45400, 31000, 37500, 4, 5, 0];   // Chieftain
	unit[30] = [0, 80, 80, 5500, 7000, 5300, 4900, 1, 5, 1600];		//Settler
			
	distance = Math.sqrt(Math.pow(Math.abs(toInt(getArgument("y2"))-toInt(getArgument("y1"))), 2)+Math.pow(Math.abs(toInt(getArgument("x2"))-toInt(getArgument("x1"))), 2));		//Pythagoras
	speed = unit[(getType()-1)*10+toInt(getArgument("slowest"))][8];
	
	source = ID('village_map').getElementsByTagName('img');
	extra = 1;
	for(i = 0; i<source.length; i++){
		if(source[i].className.indexOf('g14') != -1){
			s = source[i].title;start = 0;
			for(j = 0; j<3; j++)start = s.indexOf(" ", start)+1;
			extra += toInt(s.substring(start, s.indexOf("</span>", start)))/10;
			break;
		}
	}
	
	if(distance > 20)time = (20/speed)+((distance-20)/(speed*extra));
	else time = (distance/speed);
	
	hour = Math.floor(time); time = (time-hour)*60;
	min = Math.floor(time); time = (time-min)*60;
	sec = Math.round(time);
	alert("Time = "+fixDigit(hour)+":"+fixDigit(min)+":"+fixDigit(sec)+(extra != 1 && distance>20?"     [with "+(extra*100)+"% extra speed]":"    [No extra speed gained]"));
}

function fixDigit(dig){
	if(dig < 10)return "0"+dig;
	else return dig;
}


function cookie_exists( check_name ){
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;

	for ( i = 0; i < a_all_cookies.length; i++ ){
		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if ( cookie_name == check_name ){
			return true;
		}
	}
	if ( !b_cookie_found ){
		return false;
	}
}

function setUpButtons(){
	var div = document.createElement("div");
	var style = div.style;
	style.position = "absolute";
	style.top = "14%";
	style.left = "15%";
	style.zIndex = "500";

	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'Update Server [All]');
	button.setAttribute('onClick', 'location.href="dorf1.php?zbutt=true";');
	div.appendChild(button);
	var button3 = document.createElement('input');
	button3.setAttribute('type', 'button');
	button3.setAttribute('value', 'Update Server ['+getVillage()+']');
	button3.setAttribute('onClick', 'location.href="dorf1.php?zreport=true";');
	div.appendChild(document.createElement("br"));
	div.appendChild(button3);
	var button2 = document.createElement('input');
	button2.setAttribute('type', 'button');
	button2.setAttribute('value', 'Display Data');
	button2.setAttribute('onClick', 'window.open('+saveDataServer+'"/", "_newtab")');
	div.appendChild(document.createElement("br"));
	div.appendChild(button2);
	document.body.appendChild(div);
}

function setUpTimeDialog(coords){
	var dForm = document.createElement('form');
	dForm.action = "dorf2.php";
	dForm.method = "GET";
	document.body.appendChild(dForm);
	
	var dTab = document.createElement('table');
	var st = dTab.style;
	st.position = "absolute";
	if(ID('qge') != undefined)st.top = "60%";
	else st.top = "40%";
	st.left = "13%";
	st.width = "10%";
	st.zIndex = "500";
	dForm.appendChild(dTab);
	
	dtTr = document.createElement('tr');
	dTab.appendChild(dtTr);
	dtTd = document.createElement('td');
	dtTd.colSpan = "4";
	dtTd.style.textAlign = "center";
	dtTd.style.fontWeight = "bold";
	dtTd.innerHTML = "From";
	dtTr.appendChild(dtTd);
	
	dtTr = document.createElement('tr');
	dTab.appendChild(dtTr);
	dtTd = document.createElement('td');
	dtTd.innerHTML = "&nbsp&nbspX:&nbsp&nbsp";
	dtTr.appendChild(dtTd);
	dtTd = document.createElement('td');
		var dtInp = document.createElement('input');
		dtInp.setAttribute('type', 'text');
		dtInp.setAttribute('name', 'x1');
		dtInp.setAttribute('size', '3');
		dtInp.setAttribute('maxlength', '3');
		dtInp.setAttribute('value', coords[0]);
		dtTd.appendChild(dtInp);
	dtTr.appendChild(dtTd);
	dtTd = document.createElement('td');
	dtTd.innerHTML = "&nbsp&nbspY:&nbsp&nbsp";
	dtTr.appendChild(dtTd);
	dtTd = document.createElement('td');
		dtInp = document.createElement('input');
		dtInp.setAttribute('type', 'text');
		dtInp.setAttribute('name', 'y1');
		dtInp.setAttribute('size', '3');
		dtInp.setAttribute('maxlength', '3');
		dtInp.setAttribute('value', coords[1]);
		dtTd.appendChild(dtInp);
	dtTr.appendChild(dtTd);
		
	dtTr = document.createElement('tr');
	dTab.appendChild(dtTr);
	dtTd = document.createElement('td');
	dtTd.colSpan = "4";
	dtTd.style.textAlign = "center";
	dtTd.style.fontWeight = "bold";
	dtTd.innerHTML = "To";
	dtTr.appendChild(dtTd);
	
	dtTr = document.createElement('tr');
	dTab.appendChild(dtTr);
	dtTd = document.createElement('td');
	dtTd.innerHTML = "&nbsp&nbspX:&nbsp&nbsp";
	dtTr.appendChild(dtTd);
	dtTd = document.createElement('td');
		var dtInp = document.createElement('input');
		dtInp.setAttribute('type', 'text');
		dtInp.setAttribute('name', 'x2');
		dtInp.setAttribute('size', '3');
		dtInp.setAttribute('maxlength', '3');
		dtInp.setAttribute('value', '');
		dtTd.appendChild(dtInp);
	dtTr.appendChild(dtTd);
	dtTd = document.createElement('td');
	dtTd.innerHTML = "&nbsp&nbspY:&nbsp&nbsp";
	dtTr.appendChild(dtTd);
	dtTd = document.createElement('td');
		dtInp = document.createElement('input');
		dtInp.setAttribute('type', 'text');
		dtInp.setAttribute('name', 'y2');
		dtInp.setAttribute('size', '3');
		dtInp.setAttribute('maxlength', '3');
		dtInp.setAttribute('value', '');
		dtTd.appendChild(dtInp);
	dtTr.appendChild(dtTd);
	
	dtTr = document.createElement('tr');
	dTab.appendChild(dtTr);
	dtTd = document.createElement('td');
	dtTd.colSpan = "4";
	dtTd.style.textAlign = "center";
		dselect = document.createElement('select');
		dselect.setAttribute('name', 'slowest');
		dselect.style.textAlign = "center";
		dtTd.appendChild(dselect);
			op = document.createElement('option');
			op.setAttribute('value', 0);
			op.style.height = "20px";
			op.style.fontWeight = "bold";
			op.innerHTML = "Slowest unit";
			op.disabled = true;
			dselect.appendChild(op);
			
			stam = "Ga"; if(getType() == 1)stam = "Ro";else if(getType() == 2)stam = "Ge";
			for(i = 1; i<=10; i++){
				op = document.createElement('option');
				op.setAttribute('value', i);
				op.style.backgroundImage = 'url('+saveDataServer+'/imgs/soldiers/'+stam+'/'+i+'.png)';
				op.style.backgroundRepeat = "no-repeat";
				op.style.height = "20px";
				op.style.verticalAlign = "middle";
				op.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspType "+i;
				dselect.appendChild(op);
			}
	dtTr.appendChild(dtTd);
		
	dtTr = document.createElement('tr');
	dTab.appendChild(dtTr);
	dtTd = document.createElement('td');
	dtTd.colSpan = "4";
	dtTd.style.textAlign = "center";
		var dbutton = document.createElement('input');
		dbutton.setAttribute('type', 'submit');
		dbutton.setAttribute('value', 'Calculate!');
		dtTd.appendChild(dbutton);
	dtTr.appendChild(dtTd);
}


function setBanner(){
	bdiv = document.createElement("div");
	s = bdiv.style;
	s.position = "absolute";
	s.top = "50%";
	s.right = "5%";
	s.zIndex = "1000";
	s.background = "#fff";
	s.padding = "2px";
	document.body.appendChild(bdiv);
	
	link = document.createElement("a");
	link.setAttribute("href", "http://www.000webhost.com/");
	link.setAttribute("onClick", "this.href='http://www.000webhost.com/613858.html'");
	link.setAttribute("target", "_blank");
	bdiv.appendChild(link);
	
	image = document.createElement("img");
	image.setAttribute("src", "http://www.000webhost.com/images/banners/120x60/banner3.gif");
	image.setAttribute("alt", "Web Hosting");
	image.setAttribute("width", "120");
	image.setAttribute("height", "60");
	image.setAttribute("border", "0");
	link.appendChild(image);
	
	bdiv.appendChild(document.createElement("br"));
	
	close = document.createElement("div");
	close.setAttribute("onClick", "this.parentNode.style.display = 'none';this.parentNode.style.visibility = 'hidden';today = new Date();today.setTime(today.getTime());edate = new Date(today.getTime()+86400000).toGMTString();s = 'hideBanner=true;expires='+edate;document.cookie = s;");
	close.setAttribute("onMouseOver", "this.style.cursor = 'pointer';");
	close.style.textAlign = "center";
	close.innerHTML = "Close";
	bdiv.appendChild(close);
}
	
/* ------------------------------------------- END OF FUNCTIONS ------------------------------------- */

if(window.location.hostname.indexOf("travian.") != -1){
	if(!cookie_exists('hideBanner'))setBanner();

	setUpButtons();
	var wls = window.location.search;
	if(wls.indexOf("zbutt") != -1){
		addDataToServer(-1);
	}else if(wls.indexOf('znext') != -1){
		addDataToServer(toInt(wls.substring(wls.indexOf('znext')+6, wls.length)));
	}else if(wls.indexOf('zreport') != -1){
		addDataToServer(100);
	}
	
	s = window.location.href;
	if(s.indexOf("dorf2.php") != -1){
		coords = getCoords();
		setUpTimeDialog(coords);
		
		if(wls.indexOf("x1") != -1 && wls.indexOf("y2") != -1){
			calculateTime();
		}
	}
}
else{
	vers = text('version');
	if(typeof thisVersion === 'undefined'){thisVersion = 0;}
	
	if(thisVersion == vers){
		ID('verInfo').innerHTML = "You have the latest version of the script!";
		setTimeout(function(){ID('verInfo').style.display = "none";}, 5000);
	}
}