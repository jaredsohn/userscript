// ==UserScript==
// @name           Neobux 2+ Versiunea romana
// @namespace      Realizat de uriburu626 si tradus de night! in limba romana. Statisticile sunt realizate de oselamet.
// @description    Calculeaza vârsta referalilor si zilele fara clic. Afiseaza numarul total de clicuri, media clicurilor si ofera statistici detaliate de venituri.
// @include        http://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c
// ==/UserScript==
var MSPD = 86400000;
var Today = new Date();
var Yesterday = new Date()
Yesterday.setDate(Today.getDate() - 1);

function NumDaysSince (tmp) {
	var tmpDate = tmp.split(' ');
	if(tmpDate.length>1) {
		var tt = tmpDate[2].split(":");
	} else {
		var tt = new Array(2);
		tt[0] = "00";
		tt[1] = "00";
	}
	if(tmpDate[0].match("Today") || tmpDate[0].match("Hoje")) {
		var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
	} else if(tmpDate[0].match("Yesterday") || tmpDate[0].match("Ontem")) {
		var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
	} else {
		var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[2] : ""));
	}
	
	var numDays = Math.floor((Today - Since) / MSPD);

	return numDays;
}

function findAccType(){
	var spans = document.getElementsByTagName("span");
	for(var i= 0;i < spans.length;i++){
		if(spans[i].innerHTML.indexOf("[Standard")==1){
			return 0;	
		}
	}
	var divs = document.getElementsByTagName("DIV");
	for(var j=0;j<divs.length;j++){
		var divClass = divs[j].getAttribute("class");
		if(divClass!=null){
			//alert(divClass);
			if(divClass.indexOf("c-golden")>0){
				return 1;
			}else if(divClass.indexOf("c-emerald")>0){
				return 2;
			}else if(divClass.indexOf("c-sapphire")>0){
				return 3;
			}else if(divClass.indexOf("c-Platium")>0){
				return 4;
			}else if(divClass.indexOf("c-diamond")>0){
				return 5;
			}else if(divClass.indexOf("c-ultimate")>0){
				return 6;
			}else if(divClass.indexOf("c-pioneer")>0){
				return 7;
			}
		}
	}
	return 8;
}

var accType = 0;
accType = findAccType();

var directRefs = true;
var stats = true;
var self = false;
var directIncome = 0;
var directIncome5 = 0;
var directIncome10 = 0;
var rentedIncome = 0;
var rentedIncome5 = 0;
var rentedIncome10 = 0;
var autoPay = 0;
var autoPay5 = 0;
var autoPay10 = 0;
var recyclePay = 0;
var recyclePay5 = 0;
var recyclePay10 = 0;

if(window.location.href.match('ss3=2')){
	directRefs = false;
	stats = false;
}

if(window.location.href.indexOf('sp=1')>0){
	directRefs = false;
	stats = true;
}
if(window.location.href.indexOf('u=c&s=i')>0 || window.location.href.match('u=c'+'$')==('u=c')){
	self = true;
}


if(!stats){
	var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
			  	document,
			    	null,
			   	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			   	null).snapshotItem(0);


	var rows = mainTable.getElementsByTagName('tr');
	var english = true;
	if(rows[0].childNodes[1].innerHTML.match('Referido')) english = false;
}

if(directRefs) {
	var col_AVG = 6;
	var col_CLICKS = 5;
	var col_LAST = 4;	
	var col_SINCE = 3;
} else {
	var col_AVG = 6;
	var col_CLICKS = 5;	
	var col_LAST = 4;
	var col_SINCE = 2;	
}

var clickSum = 0;
var grandAVG = 0;
var refCount = 0;

if(!stats){
	for(var i=1; i<rows.length; i++) {
		
		if(rows[i].childNodes.length < 7) {
			if(rows[i].childNodes.length==1 && rows[i].childNodes[0].innerHTML=='&nbsp;'){
				rows[i].childNodes[0].innerHTML = "<font style='font-size:10px;color:#FFFFFF;font-weight:bold;'>&nbsp;|&nbsp;&nbsp; Total Clicks : "+clickSum+"&nbsp;&nbsp;|&nbsp;&nbsp; Total Click Avg. : "+(grandAVG/refCount)+"&nbsp;|</font>";	
			}
			continue;	
		}
		
		var tmpDate = rows[i].childNodes[col_SINCE].innerHTML.replace('&nbsp;','');
		var numDays = Math.max(1,NumDaysSince(tmpDate));
		rows[i].childNodes[col_SINCE].innerHTML = "" + tmpDate + "<font style='font-size:9px;color:#777777'> (" + numDays + ")</font>";
		
		if((rows[i].childNodes[col_AVG].innerHTML.indexOf("-.---"))<0){
			grandAVG = grandAVG - (-(rows[i].childNodes[col_AVG].innerHTML.replace('&nbsp;','')));
			clickSum = clickSum - (-(rows[i].childNodes[col_CLICKS].innerHTML.replace('&nbsp;','')));
			refCount++;
		}
		
		var tmpDateLastClick = rows[i].childNodes[col_LAST].innerHTML.replace('&nbsp;','');
		
		if(tmpDateLastClick.match('No clicks') || tmpDateLastClick.match('Sem cliques')) {
			var inactiveDays = numDays;
		} else {
			var inactiveDays = NumDaysSince(tmpDateLastClick);
		}
		rows[i].childNodes[col_LAST].innerHTML = "" + tmpDateLastClick + "<font style='font-size:9px;color:#777777'> (" + inactiveDays + ")</font>";
	}
	//alert(clickSum+"    "+(grandAVG/refCount));
}else{
	var embeds = document.getElementsByTagName("embed");
	var statCount = 0;
	for(var i = 0;i < 6 && i <embeds.length ;i++){
		if(self){
			showAvgStats(embeds[i],i);
		}else{
			if(i!=1 && i!=3){
				showAvgStats(embeds[i],statCount);
				statCount ++;
			}
		}
	}
	var netRentedIncome = rentedIncome-(autoPay+recyclePay);
	var netRentedIncome5 = rentedIncome5-(autoPay5+recyclePay5);
	var netRentedIncome10 = rentedIncome10-(autoPay10+recyclePay10);
	if(!self){
		//alert(netRentedIncome-(-directIncome));
		var masterTable = document.getElementById(embeds[0].id+"Div").parentNode.parentNode.parentNode;
		var newRow = document.createElement("TR");
		newRow.style.height = "15px";
		var newCol = document.createElement("TD");
		newCol.colSpan = 2;
		newCol.style.backgroundColor = "#c1f5c1";
		newCol.style.fontFamily = "verdana";
		newCol.style.fontWeight = "bold";
		newCol.style.height = "20px";
		newCol.style.fontSize = "9px";
		newCol.style.border = "1px solid #aaaaaa";
		newCol.style.backgroundImage = "url('http://img199.imageshack.us/img199/9953/graybg.png')";
		newCol.style.textAlign = "left";
		newRow.appendChild(newCol);
		newCol.innerHTML = "<font style='font-size:9px;color:#ffffff'>&nbsp; Castig net zilnic : &nbsp;(15)&nbsp; $"+ 
		(((netRentedIncome-(-directIncome))+"").substring(0,6))+" &nbsp;(10) &nbsp;$"+
		(((netRentedIncome10-(-directIncome10))+"").substring(0,6))+" &nbsp;(5) &nbsp;$"+
		(((netRentedIncome5-(-directIncome5))+"").substring(0,6))+"</font>";
		masterTable.appendChild(newRow);
		addDonation(masterTable);
	}
}

function addDonation(master){
	var donMsg = "Support the Neobux 2+ Script Development!";
    var donCode = "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='5484592'><input type='image' src='http://www.neobux.com/imagens/estrela_16.gif' border='0' name='submit' title='"+donMsg+"'><img alt='' border='0' src='https://www.paypal.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>";
	var newRow = document.createElement("TR");
		var newCol = document.createElement("TD");
		newCol.colSpan = 2;
		newCol.style.textAlign = "center";
		newRow.appendChild(newCol);
		newCol.innerHTML = donCode;
		master.appendChild(newRow);
}

function showAvgStats(embed,index){
	var statDiv = document.getElementById(embed.id+"Div");
	var setSum = 0;
	var setSum10days = 0;
	var setSum5days = 0;
	var statFlashVars = embed.getAttribute("flashvars");
	var alterIndex = statFlashVars.indexOf("<set");
	var setXML = statFlashVars.substring(alterIndex,statFlashVars.length);
	
	alterIndex = setXML.indexOf("<styles>");
	setXML = setXML.substring(0,alterIndex);
	setXML = setXML.replace(/\/>/g,">_</set>");
	setXML = "<data>"+setXML+"</data>";
	
	var parser = new DOMParser();
	var doc = parser.parseFromString(setXML,"text/xml");
	var docRoot = doc.childNodes[0];
	
	if(docRoot.tagName == "data"){
		var sets = docRoot.getElementsByTagName("set");
		for(var i= 0;i < sets.length;i++){
			if(i<15 && i>9){
				setSum5days = setSum5days + parseInt(sets[i].getAttribute("value")*100)/100;
			}
			if(i<15 && i>4){
				setSum10days = setSum10days + parseInt(sets[i].getAttribute("value")*100)/100;
			}
			setSum = setSum + parseInt(sets[i].getAttribute("value")*100)/100;
		}
		if(index <2){
			var avgLabel = document.createElement("DIV");
			avgLabel.style.width = "318px";
			avgLabel.style.height = "14px";
			avgLabel.style.fontFamily = "verdana";
			avgLabel.style.fontWeight = "bold";
			avgLabel.style.fontSize = "9px";
			avgLabel.style.color = "#555555";
			avgLabel.style.textAlign = "left";
			avgLabel.style.borderLeft = "1px solid #aaaaaa";
			avgLabel.style.borderRight = "1px solid #aaaaaa";
			avgLabel.style.borderBottom = "1px solid #aaaaaa";
			avgLabel.style.backgroundColor = "#ffdd00";
			avgLabel.style.backgroundImage = "url('http://img200.imageshack.us/img200/5423/yellowbg.png')";
			avgLabel.style.top = statDiv.style.height;
			statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
			avgLabel.style.color = "#444444";
			avgLabel.innerHTML = "&nbsp;Media :&nbsp; (15) &nbsp;" + (((setSum / 15)+"").substring(0,5))+"  &nbsp;(10) &nbsp;"+(((setSum10days / 10)+"").substring(0,5))+"  &nbsp;(5) &nbsp;"+(((setSum5days / 5)+"").substring(0,5))+"&nbsp;";
			statDiv.appendChild(avgLabel);
		}
		
		var dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");
		dailyEarnLabel.style.width = "318px";
		dailyEarnLabel.style.height = "14px";
		dailyEarnLabel.style.fontFamily = "verdana";
		dailyEarnLabel.style.fontWeight = "bold";
		dailyEarnLabel.style.fontSize = "9px";
		dailyEarnLabel.style.textAlign = "left";
		dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";
		dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";
		dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";
		dailyEarnLabel.style.backgroundColor = "#8899aa";		//"#7fac21";
		dailyEarnLabel.style.backgroundImage = "url('http://img51.imageshack.us/img51/3718/greenbgv.png')";
		dailyEarnLabel.style.top = statDiv.style.height;
		statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
		dailyEarnLabel.style.color = "#444444";
		var earnStr = "";
		
		var refClickMultiplier = 0.005;
		var selfClickMultiplier = 0.01;
		
		if(!self){
			if(index < 2){
				switch(accType)
				{
				case 0:
					refClickMultiplier = 0.005;
				  break;
				case 1:
					refClickMultiplier = 0.01;
				  break;
				default:
					refClickMultiplier = 0.01;
				}
				earnStr = " &nbsp;Castiguri zilnice(M) : (15) $" + ((((setSum / 15)*refClickMultiplier)+"").substring(0,5))+
				" &nbsp;(10) &nbsp;$"+((((setSum10days / 10)*refClickMultiplier)+"").substring(0,5))+
				" &nbsp;(5) &nbsp;$"+((((setSum5days / 5)*refClickMultiplier)+"").substring(0,5));
				if(index==0){					//direct
					directIncome = (setSum / 15)*refClickMultiplier;
					directIncome5 = (setSum5days / 5)*refClickMultiplier;
					directIncome10 = (setSum10days / 10)*refClickMultiplier;
				}else{							//rented
					rentedIncome = (setSum / 15)*refClickMultiplier;
					rentedIncome5 = (setSum5days / 5)*refClickMultiplier;
					rentedIncome10 = (setSum10days / 10)*refClickMultiplier;
				}
			}else{
				dailyEarnLabel.style.backgroundImage = "url('http://img268.imageshack.us/img268/1234/redbg.png')";
				earnStr = " &nbsp;Plati zilnice(M) : (15) $" + (((setSum / 15)+"").substring(0,5))+
				" &nbsp;(10) &nbsp;$"+(((setSum10days / 10)+"").substring(0,5))+
				" &nbsp;(5) &nbsp;$"+(((setSum5days / 5)+"").substring(0,5));
				if(index==2){			//recycle
					switch(accType)
					{
					case 0:
						perRecycleCost = 0.08;
					  break;
					case 1:
						perRecycleCost = 0.08;
					  break;
					case 2:
						perRecycleCost = 0.07;
					  break;
					case 3:
						perRecycleCost = 0.08;
					  break;
					case 4:
						perRecycleCost = 0.07;
					  break;
					case 5:
						perRecycleCost = 0.08;
					  break;
					case 6:
						perRecycleCost = 0.05;
					  break;
					case 7:
						perRecycleCost = 0.08;
					break;
					default:
						perRecycleCost = 0.08;
					}
					var avgLabel = document.createElement("DIV");
					avgLabel.style.width = "318px";
					avgLabel.style.height = "14px";
					avgLabel.style.fontFamily = "verdana";
					avgLabel.style.fontWeight = "bold";
					avgLabel.style.fontSize = "9px";
					avgLabel.style.color = "#555555";
					avgLabel.style.textAlign = "left";
					avgLabel.style.borderLeft = "1px solid #aaaaaa";
					avgLabel.style.borderRight = "1px solid #aaaaaa";
					avgLabel.style.borderBottom = "1px solid #aaaaaa";
					avgLabel.style.backgroundColor = "#ffdd00";
					avgLabel.style.backgroundImage = "url('http://img200.imageshack.us/img200/5423/yellowbg.png')";
					avgLabel.style.top = statDiv.style.height;
					statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
					avgLabel.style.color = "#444444";
					avgLabel.innerHTML = "&nbsp;Referali reciclati in ultimele 15 zile : "+ (setSum/perRecycleCost);
					statDiv.appendChild(avgLabel);
					recyclePay = setSum / 15;
					recyclePay10 = setSum10days/ 10;
					recyclePay5 = setSum5days / 5;
				}else{					//autopay
					autoPay = setSum / 15;
					autoPay5 = setSum5days / 5;
					autoPay10 = setSum10days / 10;
				}
			}
		}else {
			switch(accType)
			{
			case 0:
				selfClickMultiplier = 0.01;
			  break;
			case 1:
				selfClickMultiplier = 0.01;
			  break;
			case 2:
				selfClickMultiplier = 0.012;
			  break;
			case 3:
				selfClickMultiplier = 0.012;
			  break;
			case 4:
				selfClickMultiplier = 0.015;
			  break;
			case 5:
				selfClickMultiplier = 0.015;
			  break;
			case 6:
				selfClickMultiplier = 0.02;
			  break;
			case 7:
				selfClickMultiplier = 0.01;
			break;
			default:
				selfClickMultiplier = 0.01;
			}			
			earnStr = " &nbsp;Castiguri zilnice(M) : (15) $" + ((((setSum / 15)*selfClickMultiplier)+"").substring(0,5))+
			" &nbsp;(10) &nbsp;$"+((((setSum10days / 10)*selfClickMultiplier)+"").substring(0,5))+
			" &nbsp;(5) &nbsp;$"+((((setSum5days / 5)*selfClickMultiplier)+"").substring(0,5));
		}
		dailyEarnLabel.innerHTML = earnStr;
		statDiv.appendChild(dailyEarnLabel);
	}
}