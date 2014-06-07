// ==UserScript==
// @name           Medias Neo// Traduzido por Ivandro Cardoso.
// @description    Mostra total de Seus cliques e de seu Referido e fornece estatisticas detalhadas Renda.--Mais informacoes-- www.ganhafacil.webs.com-- 
// @include        http://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c
// ==/UserScript==

var MSPD = 86400000;
var Today = new Date();
var Yesterday = new Date()
Yesterday.setDate(Today.getDate() - 1);
var english = true;

function NumDaysSince (tmp) {
	var tmpDate = tmp.split(' ');
	if(tmpDate.length>1) {
		var tt = tmpDate[1].split(":");
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
		var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[1] : ""));
	}
	
	var numDays = Math.floor((Today - Since) / MSPD);

	return numDays;
}

function formatDec(val,sig){
	var r = "";
	var pointIndex = (val+"").indexOf(".");
	if(pointIndex >0){
		if(sig==null){
			sig = 0;
		}
		r = (val+"").substring(0,(pointIndex-(-sig-1)));
	}else{
		r = val;
	}
	return r;
}

function getRefCount(){
	var divs = document.getElementsByTagName("DIV");
	for(var j=0;j<divs.length;j++){
		var numRefs = "";
		if(divs[j].innerHTML.indexOf("You")==0){
			numRefs = divs[j].innerHTML.substring(9,divs[j].innerHTML.length);
			try{
				numRefs = parseInt(numRefs);
			}catch(err){
			}
			return numRefs;
		}else if(divs[j].innerHTML.indexOf("Voc")==0){
			numRefs = divs[j].innerHTML.substring(9,divs[j].innerHTML.length);
			try{
				numRefs = parseInt(numRefs);
			}catch(err){
			}
			return numRefs;
		}
	}
}

function findAccType(){
	var spans = document.getElementsByTagName("span");
	var acc = 0;
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
			if(divClass.indexOf("c-emerald")>0){
				if(acc<2)acc = 2;
			}else if(divClass.indexOf("c-sapphire")>0){
				if(acc<3)acc = 3;
			}else if(divClass.indexOf("c-platinum")>0){
				if(acc<4)acc = 4;
			}else if(divClass.indexOf("c-diamond")>0){
				if(acc<5)acc = 5;
			}else if(divClass.indexOf("c-ultimate")>0){
				if(acc<6)acc = 6;
			}else if(divClass.indexOf("c-pioneer")>0){
				if(acc<1)acc = 7;
			}else if(divClass.indexOf("c-golden")>0){
				if(acc<1)acc = 1;
			}
		}
	}
	return acc;
}

function getAutoPayCost(){
	var statTotalRefs = getRefCount();
	var autoPayCost = 0.0085;
	switch(accType)
	{
	case 0:
		if(statTotalRefs < 501){
			perAutoPayCost = 0.0085;
		}else if(statTotalRefs < 1001){
			perAutoPayCost = 0.009;
		}else if(statTotalRefs < 1251){
			perAutoPayCost = 0.0095;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.01;
		}else {
			perAutoPayCost = 0.0105;
		}
	  break;
	case 1:
		if(statTotalRefs < 501){
			perAutoPayCost = 0.006;
		}else if(statTotalRefs < 751){
			perAutoPayCost = 0.0065;
		}else if(statTotalRefs < 1251){
			perAutoPayCost = 0.007;
		}else if(statTotalRefs < 1501){
			perAutoPayCost = 0.0075;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.008;
		}else{
			perAutoPayCost = 0.008;
		}
	  break;
	case 2:
		if(statTotalRefs < 501){
			perAutoPayCost = 0.006;
		}else if(statTotalRefs < 751){
			perAutoPayCost = 0.0065;
		}else if(statTotalRefs < 1251){
			perAutoPayCost = 0.007;
		}else if(statTotalRefs < 1501){
			perAutoPayCost = 0.0075;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.008;
		}else{
			perAutoPayCost = 0.008;
		}
	  break;
	case 3:
		if(statTotalRefs < 751){
			perAutoPayCost = 0.006;
		}else if(statTotalRefs < 1001){
			perAutoPayCost = 0.0065;
		}else if(statTotalRefs < 1501){
			perAutoPayCost = 0.007;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.0075;
		}else{
			perAutoPayCost = 0.008;
		}
	  break;
	case 4:
		if(statTotalRefs < 501){
			perAutoPayCost = 0.006;
		}else if(statTotalRefs < 751){
			perAutoPayCost = 0.0065;
		}else if(statTotalRefs < 1251){
			perAutoPayCost = 0.007;
		}else if(statTotalRefs < 1501){
			perAutoPayCost = 0.0075;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.008;
		}else{
			perAutoPayCost = 0.008;
		}
	  break;
	case 5:
		if(statTotalRefs < 1001){
			perAutoPayCost = 0.006;
		}else if(statTotalRefs < 1251){
			perAutoPayCost = 0.0065;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.007;
		}else{
			perAutoPayCost = 0.0075;
		}
	  break;
	case 6:
		if(statTotalRefs < 1251){
			perAutoPayCost = 0.006;
		}else if(statTotalRefs < 1501){
			perAutoPayCost = 0.0065;
		}else {
			perAutoPayCost = 0.007;
		}
	  break;
	case 7:
		if(statTotalRefs < 251){
			perAutoPayCost = 0.0075;
		}else if(statTotalRefs < 1001){
			perAutoPayCost = 0.008;
		}else if(statTotalRefs < 1251){
			perAutoPayCost = 0.0085;
		}else if(statTotalRefs < 1751){
			perAutoPayCost = 0.009;
		}else {
			perAutoPayCost = 0.0095;
		}
	break;
	default:
		perAutoPayCost = 0.0085;
	}
	return perAutoPayCost;
}

var accType = 0;
accType = findAccType();

var directRefs = true;
var stats = true;
var self = false;
var sumDirectIncome = 0;
var directIncome = 0;
var directIncome5 = 0;
var directIncome10 = 0;
var sumRentedIncome = 0;
var rentedIncome = 0;
var rentedIncome5 = 0;
var rentedIncome10 = 0;
var recycleCost = 0;
var autopayCost = 0;
var autoPay = 0;
var autoPay5 = 0;
var autoPay10 = 0;
var recyclePay = 0;
var recyclePay5 = 0;
var recyclePay10 = 0;
var directClicksYday = 0;
var rentedClicksYday = 0;
var autoPayCostYday = 0;
var recycleCostYday = 0;
var renewCostYday = 0;
var directClicksTday = 0;
var rentedClicksTday = 0;
var autoPayCostTday = 0;
var recycleCostTday = 0;
var renewCostTday = 0;
var recycledIn15days = 0;
var autopaidIn15days = 0;
var perRecycleCost = 0.08;
var todayClickers = 0;
var ydayClickers = 0;
var otherClickers = 0;
var totalrenewCost = 0;
var left30 = 0;
var left60 = 0;
var left90 = 0;
var left90plus = 0;
var leftAuto = 0;

var refClickMultiplier = 0.005;
var selfClickMultiplier = 0.01;

if(window.location.href.match('ss3=2')){
	directRefs = false;
	stats = false;
}

if(window.location.href.indexOf('s=rs')>0){
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
	english = true;
	if(rows[0].childNodes[1].innerHTML.match('Referido')) english = false;
}

if(directRefs) {
	var col_AVG = 6;
	var col_CLICKS = 5;
	var col_LAST = 4;	
	var col_SINCE = 3;
} else {
	var col_AVG = 8;
	var col_CLICKS = 7;	
	var col_LAST = 6;
	var col_SINCE = 4;	
}

var clickSum = 0;
var grandAVG = 0;
var refCount = 0;
var infoLabel = null;

if(!stats){
	for(var i=1; i<rows.length; i++) {
		
		if(rows[i].childNodes.length < 7) {
			if(rows[i].childNodes.length==1 && rows[i].childNodes[0].innerHTML=='&nbsp;'){
				rows[i].childNodes[0].style.backgroundImage = "url('http://img199.imageshack.us/img199/9953/graybg.png')";
				rows[i].childNodes[0].style.height= "25px";
				rows[i].childNodes[0].innerHTML = "<font style='font-size:10px;color:#FFFFFF;font-weight:bold;'>&nbsp;|&nbsp;&nbsp; Total Clicks : "+clickSum+
				"&nbsp;&nbsp;|&nbsp;&nbsp; Total Click Avg. : "+formatDec((grandAVG/refCount),3)+
				"&nbsp;| &nbsp;Clicked Today : " + todayClickers+
				"&nbsp;| &nbsp;Clicked Yesterday : " + ydayClickers+
				"&nbsp;| &nbsp;Others : " + otherClickers+
				"</font>";	
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
		rows[i].childNodes[col_LAST].innerHTML = "" + tmpDateLastClick + "<font style='font-size:9px;color:#777777'> [" + inactiveDays + "]</font>";
		if(inactiveDays==0){
			todayClickers++;
		}else if (inactiveDays==1){
			ydayClickers++;
		}else{
			otherClickers++;
		}
	}
	//alert(clickSum+"    "+(grandAVG/refCount));
}else{
	var embeds = document.getElementsByTagName("embed");
	var statCount = 0;
	for(var i = 0;i < 9 && i <embeds.length ;i++){
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
		newCol.innerHTML = "<font style='font-size:9px;color:#ffffff'>&nbsp; Lucro Liquido Diario &nbsp;(15)&nbsp; $"+ 
		formatDec(((netRentedIncome-(-directIncome))+""),3)+" &nbsp;(10) &nbsp;$"+
		formatDec(((netRentedIncome10-(-directIncome10))+""),3)+" &nbsp;(5) &nbsp;$"+
		formatDec(((netRentedIncome5-(-directIncome5))+""),3)+"</font>";
		masterTable.appendChild(newRow);
		//addDonation(masterTable);
		var allTRs = document.getElementsByTagName("TR");
		for(var i = 0;i< allTRs.length;i++){
			if(allTRs[i].childNodes[0].getAttribute("class") =="cx-3 cx-tg1 cxw"){
				for(var j = 0;j<3;j++){
					allTRs[i].removeChild(allTRs[i].childNodes[0]);
				}
				infoLabel = document.createElement("TD");
				infoLabel.colSpan = 3;
				infoLabel.style.verticalAlign = "top";
				infoLabel.style.paddingTop = "15px";
				infoLabel.style.paddingLeft = "4px";
				infoLabel.style.height = "500px";
				infoLabel.style.backgroundImage = "url('http://img14.imageshack.us/img14/6311/statbgn.png')";
				infoLabel.innerHTML = "<font style='font-size:10px;color:#444444'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Statistics Summary</b><br/>"+
				"<font style='font-size:9px;'><br></br>"+
				"<font style='font-size:9px;color:#aaaaaa'>"+
				"<br><b>[ Hoje ]</b></br></font>"+
				"<br><b> - Lucro : </b>$"+formatDec(((((rentedClicksTday-(-directClicksTday))*refClickMultiplier)-(recycleCostTday-(-autoPayCostTday)-(-renewCostTday)))),3)+"</br>"+
				"<br><font style='font-size:9px;color:#aaaaaa'><br/><b>[ Ontem ]</b></br></font>"+
				"<br><b> - Clicks dos Alugados : </b>"+rentedClicksYday+"</br>"+
				"<br><b> - Clicks dos Diretos : </b>"+directClicksYday+"</br>"+
				"<br><b> - Total de Clicks : </b>"+formatDec(((rentedClicksYday-(-directClicksYday))/getRefCount()),3)+"</br>"+
				"<br><b> - Custo da Reciclagem : </b>$"+recycleCostYday+"</br>"+
				"<br><b> - Custo do AutoPay : </b>$"+autoPayCostYday+"</br>"+
				"<br><b> - Custo ao Renovar : </b>$"+renewCostYday+"</br>"+
				"<br><b> - Lucro : </b>$"+formatDec(((((rentedClicksYday-(-directClicksYday))*refClickMultiplier)-(recycleCostYday-(-autoPayCostYday)-(-renewCostYday)))),3)+"</br>"+
				"<br/>"+
				"<font style='font-size:9px;color:#aaaaaa'><br><b>[ Ultimos 15 Dias ]</b></br></font>"+
				"<br><b> - Custo da Reciclagem : </b>$"+formatDec(recycleCost,3)+
				"<br><b> - Custos do AutoPay : </b>$"+formatDec(autopayCost,3)+
				"<br><b> - Custo ao Renovar : </b>$"+formatDec(totalrenewCost,3)+
				"<br><b> - Reciclagem : </b>"+formatDec((recycledIn15days),0)+		//" &nbsp;["+perRecycleCost+"]</br>"+
				"<br><b> - Autopay : </b>"+formatDec((autopaidIn15days),0)+		//" &nbsp;["+getAutoPayCost()+"]</br>"+
				"<br><b> - Lucro : </b>$"+formatDec(((sumRentedIncome-(-sumDirectIncome))-(recycleCost-(-autopayCost)-(-totalrenewCost))),3)+"</br>"+
				"<p/>";
				allTRs[i].appendChild(infoLabel);
				addDonation(infoLabel);
			}
		}
	}
}

var to = null;
function addDonation(master){
	var donMsg = "Donate for Neobux 2+";
	var donCode = "<form action='http://www.ganhafacil.webs.com/' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='encrypted' value='-----BEGIN PKCS7-----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-----END PKCS7-----'><input type='image' id='_x_est' src='http://img39.imageshack.us/img39/9104/paypalicon.gif' border='0' name='submit'><script>new Tip('donationbtn', '"+donMsg+"',{style:'darkgrey',width:'auto',stem:'bottomMiddle',delay:'0',hook:{tip:'bottomMiddle',target:'topMiddle'}});</script><img alt='' border='0' src='https://www.paypal.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>";
	var donDiv = document.createElement("DIV");
	donDiv.style.textAlign = "center";
	donDiv.innerHTML = donCode;
	master.appendChild(donDiv);
}

function showAvgStats(embed,index){
	var statDiv = document.getElementById(embed.id+"Div");
	var setSum = 0;
	var setSum10days = 0;
	var setSum5days = 0;
	var statFlashVars = embed.getAttribute("flashvars");
	var alterIndex = statFlashVars.indexOf("<set");
	var setXML = statFlashVars.substring(alterIndex,statFlashVars.length);

	if(index==6){
		var xmlTmp = "";
		while(setXML.indexOf("<vLine")>-1){
			var vline = setXML.indexOf("<vLine");
			xmlTmp = xmlTmp + setXML.substring(0,vline);
			setXML = setXML.substring(vline,setXML.length);
			var setIndex = setXML.indexOf("<set");
			setXML = setXML.substring(setIndex,setXML.length);
		}
		setXML = xmlTmp + setXML;
	}
	if(statFlashVars.indexOf("<trendLines>")>-1){
		alterIndex = setXML.indexOf("<trendLines>");
	}else{
		alterIndex = setXML.indexOf("<styles>");
	}
	
	setXML = setXML.substring(0,alterIndex);
	setXML = setXML.replace(/\/>/g,">_</set>");
	setXML = "<data>"+setXML+"</data>";

	var parser = new DOMParser();
	var doc = parser.parseFromString(setXML,"text/xml");
	var docRoot = doc.childNodes[0];
	if(docRoot.tagName == "data"){
		var sets = docRoot.getElementsByTagName("set");
		for(var i= 0;i < sets.length;i++){
			if(index ==6){
				var refs = + parseInt(sets[i].getAttribute("value")*1000)/1000;
				if(i<20){
					leftAuto = leftAuto + refs;
				}else if(i<30){
					left30 = left30 + refs;
				}else if(i<60){
					left60 = left60 + refs;
				}else if(i<90){
					left90 = left90 + refs;
				}else{
					left90plus++;
				}
			}else{
				if(i<15 && i>9){
					setSum5days = setSum5days + parseInt(sets[i].getAttribute("value")*1000)/1000;
				}
				if(i<15 && i>4){
					setSum10days = setSum10days + parseInt(sets[i].getAttribute("value")*1000)/1000;
					if(i==13){
						switch(index){
						case 0:
							directClicksYday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 1:
							rentedClicksYday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 2:
							recycleCostYday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 3:
							autoPayCostYday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 4:
							renewCostYday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						}
					}else if (i==14){
						switch(index){
						case 0:
							directClicksTday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 1:
							rentedClicksTday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 2:
							recycleCostTday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 3:
							autoPayCostTday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						case 4:
							renewCostTday = parseInt(sets[i].getAttribute("value")*1000)/1000;
						break;
						}
					}
				}
			setSum = setSum + parseInt(sets[i].getAttribute("value")*1000)/1000;
			}
		}
		if(index==4){
			totalrenewCost = setSum;
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
		
		if(index <2){
			avgLabel.innerHTML = "&nbsp;Medias :&nbsp; (15) &nbsp;" + formatDec((setSum / 15),3)+"  &nbsp;(10) &nbsp;"+formatDec((setSum10days / 10),3)+"  &nbsp;(5) &nbsp;"+formatDec((setSum5days / 5),3)+"&nbsp;";
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
				earnStr = " &nbsp;Rendimento Diario : (15) $" + formatDec(((setSum / 15)*refClickMultiplier),3)+
				" &nbsp;(10) &nbsp;$"+formatDec(((setSum10days / 10)*refClickMultiplier),3)+
				" &nbsp;(5) &nbsp;$"+formatDec(((setSum5days / 5)*refClickMultiplier),3);
				if(index==0){					//direct
					sumDirectIncome = setSum*refClickMultiplier;
					directIncome = (setSum / 15)*refClickMultiplier;
					directIncome5 = (setSum5days / 5)*refClickMultiplier;
					directIncome10 = (setSum10days / 10)*refClickMultiplier;
				}else{							//rented
					sumRentedIncome = setSum*refClickMultiplier;
					rentedIncome = (setSum / 15)*refClickMultiplier;
					rentedIncome5 = (setSum5days / 5)*refClickMultiplier;
					rentedIncome10 = (setSum10days / 10)*refClickMultiplier;
				}
			}else{
				
				if(index<5){
					earnStr = " &nbsp;Custo Diario : (15) $" + + formatDec((setSum / 15),3)+
					" &nbsp;(10) &nbsp;$"+formatDec((setSum10days / 10),3)+
					" &nbsp;(5) &nbsp;$"+formatDec((setSum5days / 5),3);
					dailyEarnLabel.style.backgroundImage = "url('http://img268.imageshack.us/img268/1234/redbg.png')";
				}else{
					dailyEarnLabel.style.backgroundImage = "url('http://img199.imageshack.us/img199/9953/graybg.png')"
					dailyEarnLabel.style.color = "#eeeeee";
					if(index ==5 ){
						earnStr = " &nbsp;Media de Transferencia Diaria : (15) $" + + formatDec((setSum / 15),3)+
						" &nbsp;(10) &nbsp;$"+formatDec((setSum10days / 10),3)+
						" &nbsp;(5) &nbsp;$"+formatDec((setSum5days / 5),3);
					}
					else if(index==6){
						dailyEarnLabel.style.width="658px";
						dailyEarnLabel.style.height="15px";
						earnStr =" &nbsp;Referrals to be Renewed : (0-20) "+leftAuto+" (20-30) "+left30+" (30-60) "+left60+" (60-90) "+left90;
					}
				}
				
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
					recycledIn15days = (setSum/perRecycleCost);
					recycleCost = setSum;
					avgLabel.innerHTML = "&nbsp;Reciclagem Nos Ultimos 15 Dias : "+ formatDec((setSum/perRecycleCost));
					statDiv.appendChild(avgLabel);
					recyclePay = setSum / 15;
					recyclePay10 = setSum10days/ 10;
					recyclePay5 = setSum5days / 5;
				}else if(index == 3){					//autopay
					var perAutoPayCost = 0.0085;
					perAutoPayCost = getAutoPayCost();
					autopayCost = setSum;
					autopaidIn15days = (setSum/perAutoPayCost);
					avgLabel.innerHTML = "&nbsp;AutoPay Nos Ultimos 15 Dias : "+ formatDec((setSum/perAutoPayCost));
					statDiv.appendChild(avgLabel);
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
			earnStr = " &nbsp;Resultados Diarios  : (15) $" + formatDec(((setSum / 15)*selfClickMultiplier),3)+
			" &nbsp;(10) &nbsp;$"+formatDec(((setSum10days / 10)*selfClickMultiplier),3)+
			" &nbsp;(5) &nbsp;$"+formatDec(((setSum5days / 5)*selfClickMultiplier),3);
		}
			dailyEarnLabel.innerHTML = earnStr;
			statDiv.appendChild(dailyEarnLabel);
	}
}