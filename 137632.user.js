// ==UserScript==
// @name           Guerrakhan4 script
// @namespace      *
// @description    Guerrakhan 4.5 script
// @include        http://*.guerrakhan.com/*
// @version        1.00
// ==/UserScript==

function functionMain(e) {
	var b = document.getElementById('firsttime');
	var langArr = new Array();
	
	var lang = document.getElementsByClassName('currentLanguage')[0].childNodes[0].attributes[1].textContent;
	
	if (!lang) lang = 'en_EN';
	
	if (lang == 'lt_LT') {
		langArr['OPTIONS'] = 'Nustatymai';
		langArr['SCOPTIONS'] = 'Skripto opcijos';
		langArr['SAVE'] = 'Išsaugoti';
		langArr['CANCEL'] = 'Atšaukti';
		langArr['MAPDETAILS'] = 'Žemelapio išklotine';
		langArr['SCOPATTACK'] = 'Garsas jei puola';
		langArr['SCOPSHKEYS'] = 'Trumpieji mygtukai';
		langArr['GOLD'] = 'Auksas';
		langArr['IRON'] = 'Geležis';
		langArr['WOOD'] = 'Mediena';
		langArr['FOOD'] = 'Maistas';
		langArr['LIKEGOLD'] = ' Kaip aukso';
		langArr['BARRACKS'] = 'Kareivinės';
		langArr['MARKET'] = 'Turgus';
		langArr['STABLE'] = 'Arklidės';
		langArr['BUILDINGS'] = 'Pastatai';
		langArr['MARCHES'] = 'Žygiai';
		langArr['BLACKSMITH'] = 'Kalvė';
		langArr['ORDER'] = 'Orderis';
		langArr['WORKSHOP'] = 'Dirbtuvės';
		langArr['COORDSLEVEL'] = 'Koord Lygis';
		langArr['KHANNAME'] = 'Riterio vardas';
		langArr['EXPERIENCE'] = 'Patirtis';
		langArr['CLAN'] = 'Klanas';
		langArr['BATTLE'] = 'Mušio';
		langArr['REMAINS'] = 'liekanos';
		langArr['VIPSEARCH'] = 'Detali paieška';
		langArr['FACTOR'] = 'Resursų keitimo santykis';
		langArr['TOWER'] = 'Bokštas';
		langArr['CAPTCHA'] = 'Patikrinimas';
	}
	else { // default portugues
		langArr['OPTIONS'] = 'Opções';
		langArr['SCOPTIONS'] = 'Opções de Script';
		langArr['SAVE'] = 'Salvar';
		langArr['CANCEL'] = 'Cancelar';
		langArr['EXIT'] = 'Sair';
		langArr['AND'] = 'e';
		langArr['MAPDETAILS'] = ' Tabela detalhada do mapa';
		langArr['SCOPATTACK'] = ' som está sendo atacado';
		langArr['SCOPSHKEYS'] = ' teclas de atalho';
		langArr['GOLD'] = 'Ouro';
		langArr['IRON'] = 'Ferro';
		langArr['WOOD'] = 'Madeira';
		langArr['FOOD'] = 'Comida';
		langArr['LIKEGOLD'] = 'Como ouro';
		langArr['BARRACKS'] = 'Quartel';
		langArr['MARKET'] = 'Mercado';
		langArr['STABLE'] = 'Estábulo';
		langArr['BUILDINGS'] = 'Construções';
		langArr['MARCHES'] = 'Marchas';
		langArr['BLACKSMITH'] = 'Ferreiro';
		langArr['ORDER'] = 'Comprar';
		langArr['WORKSHOP'] = 'Workshop';
		langArr['COORDSLEVEL'] = 'Nivel de Cordenadas';
		langArr['KHANNAME'] = 'nome do clã';
		langArr['EXPERIENCE'] = 'Experiência';
		langArr['CLAN'] = 'Clã';
		langArr['BATTLE'] = 'Batalha';
		langArr['REMAINS'] = 'Limpeza';
		langArr['VIPSEARCH'] = 'Busca VIP';
		langArr['FACTOR'] = 'Troca de Recursos';
		langArr['TOWER'] = 'Torre';
		langArr['CAPTCHA'] = 'Captcha';
	}
	
	if (b==null) {
		var RunTime = new Array(1);
		RunTime[0] = new Date().getTime();
		var ot = document.createElement('div');
		ot.setAttribute('id','firsttime');
		document.getElementsByTagName('body')[0].appendChild(ot);
		
		// Adds script options link in the top of the page
		addMoreLinks();
		
		// Adds extra styles
		GM_addStyle(".myfont { padding-left: 4px; color: #CCCCCC !important; font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 11px !important; }");
		GM_addStyle(".mysetmax { padding-top: 4px; padding-left: 10px; font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 12px !important; }");
		GM_addStyle(".boldas { font-weight: bold !important;}");
		// Buildings building time
		if (document.baseURI.indexOf("buildings.php")>-1) {
			getBuildingNeededRes();
			var b = document.getElementsByClassName('queueNumber');
			if (getCookie('autoBuilding0')=='false' && b.length < 2) autoBuilding();
		}
		
		// Auto reload 
		var m = getCookie('autoReloadTime');
		//if (m>10) setTimeout(function(){autoreload();}, Math.random() * m  * 1000 + 10);
		//else setTimeout(function(){autoreload();}, Math.random() * 10000 + 10);
		if (m>10) setTimeout(function(){autoreload();}, m * 1000);
		else setTimeout(function(){autoreload();}, 10000);
		
		if (document.baseURI.indexOf("pohod.php")>-1) {
			if (document.baseURI.indexOf("botcaptcha.php")==-1) {
				marchesInfo();
				optionEnlarger();
				embedFunction(SetAvg);
				addAvgLinks();
			}
		}
	}
	
	//=======================
	// Info marches
	//=======================
	
	function marchesInfo() {
		var v = document.getElementsByClassName('container');
		var n = v[0].getElementsByTagName('a');
		if (n.length>0) {
			for (var i=0;i<n.length;i++) {
				if (n[i].attributes[0].textContent.indexOf('kwDialog(')>-1) {
					var m = n[i].attributes[0].textContent.split(' ');
					var brr = document.createTextNode(m[2]+', '+m[4]+', '+m[6]+', '+m[9]+', '+m[12]);
					n[i].parentNode.appendChild(brr);
					n[i].parentNode.removeChild(n[i]);
					
				}
			}
		}
	}
	
	//=======================
	// Marches option enlarger
	//=======================
	
	function optionEnlarger() {
		var obj = obj = document.getElementById('type');
		obj.setAttribute('size',obj.getElementsByTagName('option').length);
	}
	
	//===================
	// Script options link
	//===================
	
	function addMoreLinks() {
		var v = document.getElementsByClassName('serverTime');
		var a = v[0].attributes[0].textContent;
		var botCTime = a.substr(8,a.indexOf(' ')-8);
		document.getElementById('hotlinksMenu').childNodes[5].innerHTML =  document.getElementById('hotlinksMenu').childNodes[5].innerHTML + 
		"<ul><li><a href=\"javascript:options_window();\"><span>"+langArr['SCOPTIONS']+"</span></a></li>"+
		"<li><a href=\"buildings.php\"><span>"+langArr['BUILDINGS']+"</span></a></li>"+
		"<li><a href=\"pohod.php\"><span>"+langArr['MARCHES']+"</span></a></li>"+
		"<li><a href=\"botcaptcha.php?redir="+document.location.pathname+"\"><span>"+langArr['CAPTCHA']+" "+botCTime+" min</span></a></li>"+
		"<li><a href=\"tower.php\"><span>"+langArr['TOWER']+"</span></a></li>"+
		"<li><a href=\"upgrades.php\"><span>"+langArr['BLACKSMITH']+"</span></a></li></ul>";
	}
	
	//=========================
	// Add extra links in mainnav menu, Script copied from Joe Simmons
	//=========================

	function id(ID) {
		if(ID) { return document.getElementById(ID); }
		else { return false; }
	}

	function addLink(arg1, arg2, arg3, arg4) {
		var n, a;
		if (arg4) n = document.getElementsByName(arg3)[0];
		else n = id(arg3);
		var a = document.createElement('a');
		var br = document.createElement('br');
		a.appendChild(document.createTextNode(arg1));
		a.href = arg2;
		a.setAttribute("class", "mysetmax");
		n.appendChild(document.createTextNode(" "));
		n.parentNode.appendChild(a);
	}
	
	//===================
	// Select part of Army or part of any unit
	//===================

	function SetAvg(arg1) { 
		var unitsToSendTable = document.getElementById("units_to_send"); 
		var n = unitsToSendTable.getElementsByTagName("a"); 
		var aCount = n.length; 
		for (var i = 0; i < aCount; i++) { 
			if (n[i].className=="set_min") { 
				var b = n[i-1].getAttribute("onclick"); 
				vid = (b.split('\'')[3]-(b.split('\'')[3]%arg1))/arg1;	
				oncl = "setMaximum(\'"+b.split('\'')[1]+"\',\'"+vid+"\');";	
				setMaximum(b.split('\'')[1],vid);
			}
		}
	}

	function addAvgLinks() {
		var n, b, oncl, vid;
		n = document.getElementsByTagName("a");
		function createAvgLink(arg1) {
			var a = document.createElement('a');
			a.appendChild(document.createTextNode('1/'+arg1));
			a.href = 'javascript:SetAvg('+arg1+');'; 
			a.setAttribute("class", "mysetmax");
			n[i].parentNode.appendChild(document.createTextNode("/"));
			n[i].parentNode.appendChild(a);
		}
		for(var i=0; i<n.length; i++){
			if(n[i].className=="set_min"){
				b = n[i-1].getAttribute("onclick");
				vid = (b.split('\'')[3]-(b.split('\'')[3]%2))/2;
				oncl = "setMaximum(\'"+b.split('\'')[1]+"\',\'"+vid+"\');";
				var a = document.createElement('a');
				a.appendChild(document.createTextNode("("+vid+")"));
				a.href = 'javascript:void(0);';
				a.setAttribute("class", "mysetmax");
				a.setAttribute("onclick", oncl);
				n[i].parentNode.appendChild(document.createTextNode("/"));
				n[i].parentNode.appendChild(a);
			}
			if(n[i].attributes[0].textContent=="setAll(false);") for (var j=2;j<=6;j++) createAvgLink(j);
		}
	}
	
	//=======================
	// Auto reload
	//=======================
	
	function autoreload() {
		if (getCookie('autoReload')=='true') location.reload();
	}
	
	//===================
	// Auto building
	//===================
	
	function autoBuilding() {
		function build(whichb) {
			var n = document.getElementsByTagName('a');
			for (var i=0;i<n.length;i++) {
				if (n[i].href.indexOf('?tb_id')>-1) {
					var ind = n[i].href.indexOf('='+whichb.toString());
					if (ind>-1) location.href = location.href + '?tb_id=' + whichb;
				}
			}
		}
		if (getCookie('autoBuilding1')=='true') {
			build(getCookie('autoBuildingNumber'));
		}
		if (getCookie('autoBuilding2')=='true') {
			var n = document.getElementsByClassName('buildingLevel');
			var maz = Math.min(Math.min(n[0].innerHTML,n[1].innerHTML),Math.min(n[2].innerHTML,n[3].innerHTML));
			var which = -1;
			if (maz==n[3].innerHTML) which = 4;
			if (maz==n[2].innerHTML) which = 3;
			if (maz==n[1].innerHTML) which = 2;
			if (maz==n[0].innerHTML) which = 1;
			build(which);
		}
	}
	
	//=======================
	// Get buildings needed resources
	//=======================
	
	function getBuildingNeededRes() {
		var ngold = document.getElementsByClassName('neededGold'); 
		var niron = document.getElementsByClassName('neededIron'); 
		var nwood = document.getElementsByClassName('neededWood'); 
		var nfood = document.getElementsByClassName('neededFood'); 
		var gold = document.getElementById('countGold').innerHTML;
		var iron = document.getElementById('countIron').innerHTML;
		var wood = document.getElementById('countWood').innerHTML;
		var food = document.getElementById('countFood').innerHTML;
		if (ngold.length>14) {
			var pp = '<p style=\"color: red; font-size: 0.8em;\">(';
			for (var i=0; i<ngold.length; i++) {
				t_gold = gold - ngold[i].innerHTML;
				t_iron = iron - niron[i].innerHTML;
				t_wood = wood - nwood[i].innerHTML;
				t_food = food - nfood[i].innerHTML;
				if (t_gold<0) ngold[i].innerHTML = ngold[i].innerHTML + pp + t_gold + ')</p>';
				if (t_iron<0) niron[i].innerHTML = niron[i].innerHTML + pp + t_iron + ')</p>';
				if (t_wood<0) nwood[i].innerHTML = nwood[i].innerHTML + pp + t_wood + ')</p>';
				if (t_food<0) nfood[i].innerHTML = nfood[i].innerHTML + pp + t_food + ')</p>';
			}
		}
	}
	
	//====================
	// Draggable menu
	//====================
	
	var divDic = document.createElement('div');
	divDic.setAttribute('id','props');
	divDic.setAttribute('class','props');
	divDic.addEventListener('mousedown', dragHandler, false);
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(divDic);

	var savedTarget=null; 
	var orgCursor=null;   
	var dragOK=false;     
	var dragXoffset=0;    
	var dragYoffset=0;    
   
	vidPaneID = document.getElementById('props'); 	
	vidPaneID.style.top='75px';                     
	vidPaneID.style.left='205px';  
	   
	function moveHandler(e){
		if (e == null) return;
		if ( e.button<=1 && dragOK ){
			savedTarget.style.left = e.clientX - dragXoffset + 'px';
			savedTarget.style.top = e.clientY - dragYoffset + 'px';
			return false;
		}
	}

	function cleanup(e) {
		document.removeEventListener('mousemove',moveHandler,false);
		document.removeEventListener('mouseup',cleanup,false);
		savedTarget.style.cursor=orgCursor;

		dragOK=false; 
		didDrag=true;
	}

	function dragHandler(e){
		var htype='-moz-grabbing';
		if (e == null) return; 
		var target = e.target;
		orgCursor=target.style.cursor;
	  
		if(target.nodeName!='DIV') return;
		if (target.className=="props") {
			savedTarget=target;       
			target.style.cursor=htype;
			dragOK=true;
			dragXoffset = e.clientX-target.offsetLeft;
			dragYoffset = e.clientY-target.offsetTop;
			
			target.style.left = e.clientX - dragXoffset + 'px';
			target.style.right = null;
		
			document.addEventListener('mousemove',moveHandler,false);
			document.addEventListener('mouseup',cleanup,false);
			return false;
		}
    }
	
	//========================
	// Menu window
	//========================

	GM_addStyle(".props { display:block; cursor:move; padding: 20px 0px 20px 0px; position:absolute; color: white; background-color: black; border:2px; border-color:grey; z-index:10000; -moz-border-radius:5px;}");
	GM_addStyle(".tarea {background-color: rgb(82, 82, 82); color: white; font-size:12px;}");
	GM_addStyle("input.buttons {padding: 3px; margin: 2px 0px 10px 10px; font-size:12px;   font-weight:bold;   color:#000000;   border-width:1px;}");

	function goLite(FRM,BTN) {
	   window.document.forms[FRM].elements[BTN].style.color = "#FFFFFF";
	   window.document.forms[FRM].elements[BTN].style.backgroundColor = "#000000";
	}

	function goDim(FRM,BTN) {
	   window.document.forms[FRM].elements[BTN].style.color = "#000000";
	   window.document.forms[FRM].elements[BTN].style.backgroundColor = "";
	}

	embedFunction(goDim);
	embedFunction(goLite);
	embedFunction(options_window);

	function options_window() {
		function closeForm() {
			var rem_menu = document.getElementById("props");
			rem_menu.innerHTML = '';
			var rem_menu = document.getElementById("properties");
			rem_menu.innerHTML = '';
		}
		var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
		closeBtn = document.createElement('img');
		closeBtn.src = sCloseBtn;
		form = document.createElement("form");
		form.setAttribute('name','properties');
		form.setAttribute('id','properties');
		form.setAttribute('style','background-color: rgb(82,82,82); cursor: default;');
		form.appendChild(document.createElement("br"));
		var stilius1 = 'background-color: rgb(82, 82, 82); color: white; margin: 10px;';
		var stilius2 = 'background-color: rgb(82, 82, 82); color: white; margin-left: 10px;';
		
		function createElem(elem,type,name,textnode,style) {
			var input = document.createElement(elem);
			input.setAttribute('type',type);
			input.setAttribute('name',name);
			if (style) {
				input.setAttribute('style',style);
				input.setAttribute('size','3');
			}
			else input.setAttribute('style','margin-left:10px;');
			form.appendChild(input);
			if (textnode) form.appendChild(document.createTextNode(textnode));
			if (name!='autoReload' && textnode!=' Auto build Building Nr.:') form.appendChild(document.createElement("br"));
		}
		
		createElem('input',	'radio',	'autoBuilding',			' Disabled auto building'				);
		createElem('input',	'radio',	'autoBuilding',			' Auto build Building Nr.:'				);
		createElem('input',	'text',		'autoBuildingNumber',	' ', 								stilius2);
		createElem('input',	'radio',	'autoBuilding',		' Auto build Resources Buildings'	);
		createElem('input',	'checkbox',	'autoReload',			' Auto reload: '							);
		createElem('input',	'text',		'autoReloadTime',		' s', 								stilius2);
		
		input = document.createElement("textarea");
		input.setAttribute('style',stilius1);
		input.setAttribute('name','tarea');
		input.setAttribute('cols','42');
		input.setAttribute('rows','10');
		input.value = getCookie('note').replace(/,/g,'\n');
		form.appendChild(document.createElement('br'));
		form.appendChild(input);
		form.appendChild(document.createElement("br"));
		
		input = document.createElement("input");
		input.setAttribute('type','button');
		input.addEventListener("click", 
			function () {
				setCookie('autoBuilding0', document.properties.autoBuilding[0].checked);
				setCookie('autoBuilding1', document.properties.autoBuilding[1].checked);
				setCookie('autoBuilding2', document.properties.autoBuilding[2].checked);
				setCookie('autoReload', document.properties.autoReload.checked);
				setCookie('autoReloadTime', document.properties.autoReloadTime.value);
				setCookie('autoBuildingNumber', document.properties.autoBuildingNumber.value);
				setCookie('note', document.properties.tarea.value.split('\n'));
				closeForm();
			}, 
		0);
		input.setAttribute('name','save1');
		input.setAttribute('class','buttons');
		input.setAttribute('value','Save');
		input.setAttribute('title','Save and Exit');
		input.setAttribute('onMouseOver','goLite(this.form.name,this.name)');
		input.setAttribute('onMouseOut','goDim(this.form.name,this.name)');
		form.appendChild(input);

		input = document.createElement('input');
		input.setAttribute('type','button');
		input.addEventListener('click',	function () {closeForm();}, 0);
		input.setAttribute('value','Cancel');
		input.setAttribute('name','cancel1');
		input.setAttribute('class','buttons');
		input.setAttribute('title','Exit');
		input.setAttribute('onMouseOver','goLite(this.form.name,this.name)');
		input.setAttribute('onMouseOut','goDim(this.form.name,this.name)');
		form.appendChild(input);
		
		var divDic = document.getElementById('props');
		var divTitp = document.createElement('p');
		var divTit = document.createTextNode('Khanwars script options');
		closeBtn.setAttribute('style','float: right; margin: 0px 10px 5px 0px; cursor: pointer;');
		closeBtn.addEventListener("click", function () { closeForm(); }, 0);
		divDic.appendChild(closeBtn);
		divTitp.setAttribute('style','text-align: center; text-weight: bold; cursor: default;');
		divTitp.appendChild(divTit);
		divDic.appendChild(divTitp);
		divDic.appendChild(form);
		
		if (getCookie('autoBuilding0')=='true') document.properties.autoBuilding[0].checked = true;
		if (getCookie('autoBuilding1')=='true') document.properties.autoBuilding[1].checked = true;
		if (getCookie('autoBuilding2')=='true') document.properties.autoBuilding[2].checked = true;
		if (getCookie('autoReload')=='true') document.properties.autoReload.checked = true;
		document.properties.autoBuildingNumber.value = getCookie('autoBuildingNumber');
		document.properties.autoReloadTime.value = getCookie('autoReloadTime');
	}
	
	//========================
	// Embed function in html
	//========================

	function embedFunction(s) {
		document.body.appendChild(document.createElement("script")).innerHTML=s.toString();
	}
	
	//===================
	// Cookies
	//===================

	embedFunction(getCookie);
	embedFunction(setCookie);

	function setCookie(c_name,value) {
		expiry = new Date();
		expiry.setDate(expiry.getDate() + 14);
		document.cookie=c_name+ "=" + escape(value) + ";expires="+expiry.toGMTString();
	}

	function getCookie(c_name) {
		if (document.cookie.length>0)
		{
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1; 
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return "";
	}
	
	//====================
	// Script execute time
	//====================
	
	RunTime[1] = new Date().getTime();
	var timeval="" + (RunTime[1]-RunTime[0]);
	//document.getElementsByClassName('topMenu right')[0].childNodes[1].innerHTML = "<li><a href=\"vip_search.php\"><span>"+langArr['VIPSEARCH']+"</span></a></li>" + document.getElementsByClassName('topMenu right')[0].childNodes[1].innerHTML + "<li><a href=\"botcaptcha.php\"><span>"+timeval+" ms</span></a></li>";
}

if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
} else {
	window.attachEvent('onload', functionMain);
}