// ==UserScript==
// @name           valv.se - extras
// @namespace      http://userscripts.org/scripts/show/104392
// @description    Visar förpackningar, kostnad, lagerstatus osv från systembolagets sida
// @include        http://valv.se/*
// @include        http://www.valv.se/*
// @version        20120515
// ==/UserScript==



/*	Alla valv-sidor		*/
	GM_addStyle("a:link,a:visited{color:#153E7E}");

	var sCity=capitalize(GM_getValue("gmCity","Halmstad"));
	var iBolagMin=parseInt(GM_getValue("gmBolagMin",5));
	var bShowErrors=GM_getValue("gmShowErrors",true);

	function setCity(){
		var sCity=GM_getValue("gmCity","Halmstad");
		GM_setValue("gmCity",prompt("Stad där du vill visa lagerstatus",sCity)||sCity);
		reload();
	}

	function setBolagMin(){
		GM_setValue("gmBolagMin",prompt("Antal systembolag för att visa samtliga en vara finns på",iBolagMin)||iBolagMin);
		reload();
	}

	GM_registerMenuCommand("valv.se - Stad där du vill visa lagerstatus",setCity);
	GM_registerMenuCommand("valv.se - Antal systembolag för att visa samtliga en vara finns på",setBolagMin);
	
	// global variablar då de används av flera funktioner
	var sBolagetID, elemSB, aContainers, aToolTip, timerAjaxTimeout, iAjaxReturned;
	
/*	Ajax-sökning		*/
	prepareAjaxSearch();
	
/*	Bara produktsidor	*/
if(document.location.href.search("valv.se/explore/")!=-1){
	prepareProductPage();
}


	
function prepareAjaxSearch(){
	addAjaxSearch();
	addAjaxTable();
	addAjaxStyle();
	document.getElementById("query").value="Sök...";
}

function addAjaxSearch(){
	var sInputQuery=document.getElementById("query");
	sInputQuery.addEventListener("keyup",function(e){if(checkKeys(e.keyCode))checkAjaxTimeout(this.value)},false);
	sInputQuery.addEventListener("focus",function(e){if(this.value=='Sök...')this.value=''},false);
	sInputQuery.setAttribute("autocomplete","off");
}

function addAjaxTable(){
	var elemNew=document.createElement("div");
	elemNew.setAttribute("id","search-box-ajax");
	var elemInsert=document.getElementById("search-box");
	elemInsert.parentNode.insertBefore(elemNew,elemInsert.nextSibling);
}

function addAjaxStyle(){
	GM_addStyle((<><![CDATA[
		#search-ajax-results				{background:white;position:absolute;margin-top:-10px;padding:10px;-webkit-border-radius:7px;-moz-border-radius:7px;box-shadow:0 0 20px #888;}
		#search-ajax-results .result		{width:200px;height:30px;padding:5px;border-left:1px solid #f4f4f4;border-right:1px solid #f4f4f4}
		#search-ajax-results .result.hover	{
			height:60px;cursor:pointer;
			background-image:-moz-linear-gradient(white,#f4f4f4 1px,#eaeaea);
			background-image:-webkit-linear-gradient(white,#f4f4f4 1px,#eaeaea);
			border:1px solid #bfbfbf;
			-webkit-border-radius:6px;
			-moz-border-radius:6px;
			}
		#search-ajax-results .result img		{height:30px}
		#search-ajax-results .result.hover img	{height:60px}
		#search-ajax-results .image					{float:left;text-align:center;width:30px}
		#search-ajax-results .title					{font-size:11px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		#search-ajax-results .result.hover .title	{font-size:11px}
		#search-ajax-results .description				{font-size:9px;color:gray;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		#search-ajax-results .result.hover .description	{font-size:10px;white-space:normal;text-overflow:ellipsis}
	]]></>).toString());
}

function checkKeys(sInput){
	switch(sInput){
		case 40:
			ajaxMove(1);
			break;
		case 38:
			ajaxMove(-1);
			break;
		case 13:
			ajaxEnter();
			break;
		default:
			return true;
	}

}

function checkAjaxTimeout(sInput){
	clearTimeout(timerAjaxTimeout);
	timerAjaxTimeout=setTimeout(function(e){searchValv(sInput)},300);
}

function searchValv(sInput){
	document.getElementById("search-box-ajax").innerHTML=parseValvXML(getValvXML(sInput));
}

function getValvXML(sInput){
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","http://valv.se/api/kaka/products/search?q="+sInput+"&page=1&pageSize=10",false);
	xmlhttp.send();
	return xmlhttp.responseXML; 
}

function highlight(sText,sSearch){
	var rPattern = new RegExp("(.*)(" + sSearch + ")(.*)","gi");
	var sReplace = "$1<span style=\"background:rgba(255,201,143,0.6)\">$2</span>$3";
	return sText.replace(rPattern,sReplace);
}

function parseValvXML(sInput){
	var sQuery=sInput.getElementsByTagName("query")[0].childNodes[0].nodeValue;
	var xml=sInput.getElementsByTagName("products");
	if(xml.length>0){
        var xml=sInput.getElementsByTagName("product");
		iAjaxReturned=xml.length-1;	// -1 då den inte börjar på 0
		var s="<div id=search-ajax-results>";
		for(i=0;i<xml.length;i++){
			s+="<div id=\"ajax-result-"+i+"\" class=\"result\" onmouseout=\"this.setAttribute('class','result')\" onmouseover=\"this.setAttribute('class','result hover')\" onclick=\"window.location='http://"+document.location.hostname+"/explore/"+xml[i].getElementsByTagName("category")[0].getElementsByTagName("path")[0].childNodes[0].nodeValue+"/"+xml[i].getElementsByTagName("sanitized-title")[0].childNodes[0].nodeValue+"'\"><div class=image>";
			var image=xml[i].getElementsByTagName("product-image")[0].getElementsByTagName("uuid");
			if(image.length){
				s+="<img src=\"http://"+document.location.hostname+"/product/image/"+image[0].childNodes[0].nodeValue+"/1\">";
			}else{
				s+="<img src=\"http://christianarvidsson.se/icons/valv/"+xml[i].getElementsByTagName("product-image")[0].getElementsByTagName("fallback")[0].childNodes[0].nodeValue.replace("_","-")+"-small.png\">";
			}
			s+="</div><div class=title>"+highlight(xml[i].getElementsByTagName("title")[0].childNodes[0].nodeValue,sQuery)+"</div>";
			var description=xml[i].getElementsByTagName("description");
			if(description.length){
				s+="<div class=description>"+highlight(description[0].childNodes[0].nodeValue,sQuery)+"</div></div>";
			}else{
				s+="<div class=description></div></div>";
			}
		}
		s+="</div>";
		return s;
	}
}

function ajaxMove(iInput){
	var i=-1;
	if(isAjaxHover())i=parseInt(document.getElementsByClassName("result hover")[0].getAttribute("id").replace("ajax-result-",""));
	if((i<iAjaxReturned)||(iInput<0)){	// gå inte nedanför sista posten eller gå alltid uppåt
		ajaxSelect(i+iInput);
	}
}

function ajaxSelect(sInput){
	ajaxRemoveHover();
	var s=sInput;
	if(s.length=1)s="ajax-result-"+s;
	document.getElementById(s).setAttribute("class","result hover");
}

function ajaxRemoveHover(){
	if(isAjaxHover()){
		var aHover=document.getElementsByClassName("result hover");
		for(i=0;i<aHover.length;i++){
			aHover[i].setAttribute("class","result");
		}
	}
}

function ajaxEnter(){
	eval(document.getElementsByClassName("result hover")[0].getAttribute("onclick"));
}

function isAjaxHover(){
	if(document.getElementsByClassName("result hover").length>0)return true;
}

function prepareProductPage(){
	sBolagetID=document.evaluate("//a[contains(@href,'http://systembolaget.se/')]",document,null,9,null).singleNodeValue.innerHTML;
	if(!isNaN(sBolagetID)){
		elemSB=document.evaluate("//em[.='Systembolaget']",document,null,9,null).singleNodeValue.parentNode;
		aContainers=new Array();
		aToolTip=new Array();

		getBolagetInfo();
	}
}

function trim(inputS){return inputS.replace(/^\s+|\s+$/g,"");}
function isDate(inputS){return (!isNaN(new Date (inputS).getYear()));}
function cleanString(inputS){return inputS.replace(/[^a-zA-Z0-9]+/g,"");}
function error(inputS){if(bShowErrors)alert(inputS);}
function capitalize(inputS){return inputS.substr(0,1).toUpperCase()+inputS.substr(1).toLowerCase();}
function reload(){window.location.reload();}

var tooltip=function(){
	var id='tt';
	var top=5;
	var left=10;
	var maxw=300;
	var speed=10;
	var timer=20;
	var endalpha=100;
	var alpha=0;
	var tt,h;
	var ie=document.all ? true : false;
	return{
		show:function(v,w){
			if(tt==null){
				tt=document.createElement('div');
				tt.setAttribute('id',id);
				tt.style.position='absolute';
				document.body.appendChild(tt);
				tt.style.opacity=0;
				tt.style.filter='alpha(opacity=0)';
				window.addEventListener('mousemove',this.pos,false);
				this.pos;

			}
			tt.style.display='block';
			tt.style.borderRadius='7px';
			tt.style.boxShadow='0 0 20px #888';
			tt.style.padding='10px';
			tt.style.backgroundColor='#fff';
			tt.innerHTML=v;
			tt.style.width=w ? w + 'px' : 'auto';
			if(!w && ie){
				tt.style.width=tt.offsetWidth;
			}
			if(tt.offsetWidth > maxw){tt.style.width=maxw + 'px'}
			h=parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer=setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u=ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l=ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			if((u-document.body.scrollTop)>document.body.clientHeight-tt.offsetHeight){
				tt.style.top=document.body.clientHeight+document.body.scrollTop-tt.offsetHeight+'px';
			}else{
				tt.style.top=u+'px';
			}
			tt.style.left=(l-tt.offsetWidth-left) + 'px';
		},
		fade:function(d){
			var a=alpha;
			if((a !=endalpha && d==1) || (a !=0 && d==-1)){
				var i=speed;
				if(endalpha-a < speed && d==1){
					i=endalpha-a;
				}else if(alpha < speed && d==-1){
					i=a;
				}
				alpha=a + (i * d);
				tt.style.opacity=alpha * .01;
				tt.style.filter='alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d==-1){tt.style.display='none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer=setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

function getBolagetInfo(){
	setLoadingStatus(true);
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.systembolaget.se/Sok-dryck/Dryck/?varuNr="+sBolagetID,
		onload: function(x){

			setLoadingStatus(false);
			var s=x.responseText;

			if(checkResponseOK(s)){

				parseBolagetPrice(s);
				checkBolagetOrderStock(s);
				checkBolagetOutOfOrder(s);
				checkBolagetSellAsPack(s);

			}
		}
	});
}

function getBolagetStock(){
	setLoadingStatus(true);
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.systembolaget.se/Ajax.aspx?sortfield=Default&sortdirection=Ascending&hitsoffset=0&page=1&varuNr="+sBolagetID+"&searchview=All&groupfiltersheader=Default&action=modaldialog&actiontype=butikdryck",
		onload: function(x){

			setLoadingStatus(false);
			var s=x.responseText;
/*
			fungerande kod för att spara ner förpackningsnamn till array, tyvärr innehåller inte ajaxen det fullständiga förpackningsnamnet så jag sparar ner de i parseBolagetPrice istället (och förutsätter att de är i samma ordning)
			s=s.substring(s.search("</legend>"));
			s=s.substring(0,s.search("</tr>"));
			while(s.search("rightalign")!=-1){
				s=s.substring(s.search("rightalign")+12);
				aContainers.push(trim(s.substring(0,s.search("</th>"))).replace("&nbsp;"," "));	// spara förpackningen sist i arrayen
			}
*/
			if(checkBolagetTotalWithItem(s)<=iBolagMin)sCity="*";
			parseBolagetStock(s);

		}
	});
}

function setLoadingStatus(inputB){
	if(inputB){
		elemSB.firstChild.innerHTML="Systembolaget <img src=http://christianarvidsson.se/icons/ajaxload_16x16.png>";
	}else{
		elemSB.firstChild.innerHTML="Systembolaget";
	}
}

function checkResponseOK(inputS){
	if(inputS.search("Ett tekniskt fel gör att vi inte kan visa produkten just nu.")!=-1){
		error("Produkten har ett felaktigt varunummer");
	}else{
		return true;
	}
}

function checkBolagetLocalDemand(inputS){
	if(inputS.search("Denna beställningsvara har lokal efterfrågan")!=-1){
		return true;
	}
}

function checkBolagetSellAsPack(inputS){
	if(inputS.search("säljs endast i helt kolli om")!=-1){
		var s=inputS.substring(inputS.search("säljs endast i helt kolli om"));
		s=s.substring(0,s.search("</p>"));
		s=trim(s.replace(".",""));											// tar bort sista punkten men förutsätter inte att den alltid finns där
		addItem("Priser","","("+s+")");
	}
}

function checkBolagetTotalWithItem(inputS){
	if(inputS.search("butiker som har varan:")!=-1){
		var s="B"+inputS.substring(inputS.search("utiker som har varan:"));
		s=s.substring(0,s.search("<br />"));
		var i=s.substring(s.search(":")+1);
		if(i<=iBolagMin)s=s+" (visar alla)";
		elemSB.innerHTML=elemSB.innerHTML+"<br>"+s;
		return i;
	}
}

function checkBolagetOutOfOrder(inputS){
	if(inputS.search("Varan är tillfälligt slut hos leverantör.")!=-1){
		elemSB.innerHTML=elemSB.innerHTML+"<br><font color=red>Varan är tillfälligt slut hos leverantören.</font>";
	}
}

function checkBolagetOrderStock(inputS){
	var s;
	var bGetStock=false;
	if(inputS.search("Beställningssortiment")!=-1){
		s="beställnings";
		if(checkBolagetLocalDemand(inputS))bGetStock=true;
	}else{
		s="ordinarie ";
		bGetStock=true;
	}
	elemSB.innerHTML=elemSB.innerHTML.replace("Denna produkt finns på Systembolaget med följande varunummer","Ingår i "+s+"sortimentet");
	if(bGetStock)getBolagetStock();
}

function parseBolagetPrice(inputS){
	var sToolTip,scontainer,sPriceLiter,sPrice,sSaleStart;
	while(inputS.search("beverageListImage")!=-1){
		inputS=inputS.substring(inputS.search("beverageListImage")+17);

		if(inputS.toLowerCase().search("bild_saknas.gif")==-1){				// spara bilden om den existerar
			inputS=inputS.substring(inputS.search("href")+6);
			sToolTip="http://www.systembolaget.se"+trim(inputS.substring(0,inputS.search("\"")));
		}else{
			sToolTip="";
		}

		inputS=inputS.substring(inputS.search("Förpackning"));
		inputS=inputS.substring(inputS.search("attributevalue")+16);
		aContainers.push(trim(inputS.substring(0,inputS.search("</td>"))));	// spara förpackning i den globala arrayen så jag kan använda de för lagorsaldo senare

		inputS=inputS.substring(inputS.search("Kr/lit"));
		inputS=inputS.substring(inputS.search("attributevalue")+16);
		sPriceLiter=trim(inputS.substring(0,inputS.search("</td>")));		// spara literpris
		sPriceLiter=sPriceLiter.substring(1,sPriceLiter.length-1);			// ta bort paranteser runt literpriset

		inputS=inputS.substring(inputS.search("Pris"));
		inputS=inputS.substring(inputS.search("<strong>")+8);
		sPrice=trim(inputS.substring(0,inputS.search("</strong>")));		// spara pris

		if(inputS.search("Säljstart")!=-1){									// om säljstart-värde existerar
			inputS=inputS.substring(inputS.search("Säljstart"));
			inputS=inputS.substring(inputS.search("attributevalue")+16);
			sSaleStart=trim(inputS.substring(0,inputS.search("</td>")));	// spara säljstart
			var sDate=sSaleStart;
			if(sDate.search(" ")!=-1){sDate=sDate.substring(0,sDate.indexOf(" "));}	// ta bort klockslaget om det finns
			if(isDate(sDate))sSaleStart="<tr><td style=\"font-size:11px;text-align:center\"\">Säljstart "+sSaleStart+"<br>("+getDagarSedan(sDate)+")</td></tr>";
		}else{
			sSaleStart="";
		}

		if(sToolTip.length>0){
			sToolTip="<tr><td><img width=150 height=300 src=\""+sToolTip+"\"></td></tr>";
		}
		sToolTip="<table><tr><td style=\"text-align:center\"><b>"+aContainers[aContainers.length-1]+"</b><br>"+sPrice+" <span style=\"font-size:11px\">("+sPriceLiter+" kr/liter)</td></tr>"+sToolTip+sSaleStart+"</table>";
		aToolTip.push(sToolTip);											// spara tooltip till globala arrayen för att nyttjas när den parsar lagersaldo

		addItem("Priser",sToolTip,"<a href=\"http://www.systembolaget.se/Sok-dryck/Dryck/?varuNr="+sBolagetID+"\">"+aContainers[aContainers.length-1]+"</a><span style=\"float:right\"> "+sPrice+"</span>");
	}
}

function parseBolagetStock(inputS){
	var sStore,sCount,sCityT,iContainer,sAmounts;
	var s="<strong>";
	if(sCity!="*")s=s+sCity;

	inputS=inputS.substring(inputS.search("<fieldset"));
	inputS=inputS.substring(0,inputS.search("</div>"));
	if(inputS.search("Dina senaste val av butik")!=-1)inputS=inputS.substring(inputS.search("fieldset class=\"store\""));	// skippa favoritaffär om de finns med (cookie, verkar bara dyka upp efter beställningar på bolaget)

	while(inputS.search(s)!=-1){

		inputS=inputS.substring(inputS.search(s)+8);
		sCityT=trim(inputS.substring(0,inputS.search("</strong>")));		// spara stad

		inputS=inputS.substring(inputS.search("storeLocation")+15);
		sStore=trim(inputS.substring(0,inputS.search("</span>")));			// spara bolag

		if(sCity=="*"){
			sStore=sCityT+", "+sStore;										// lägg till "Stad, " som prefix om den ska visa alla bolag
		}else{
			sStore="Lagersaldo - "+sStore;									// lägg till "Lagersaldo - " som prefix om den bara visar en stad
		}

		iContainer=0;
		sAmounts=inputS.substring(0,inputS.search("</tr>"));				// spara mängderna i separat sträng och loopa igenom samtliga förpackningar

		while(sAmounts.search("amount")!=-1){

			sAmounts=sAmounts.substring(sAmounts.search("amount")+8);
			sCount=trim(sAmounts.substring(0,sAmounts.search("</td>")));	// spara antal

			addItem(sStore,aToolTip[iContainer],"<a href=\"http://www.systembolaget.se/Sok-dryck/Dryck/?varuNr="+sBolagetID+"\">"+aContainers[iContainer]+"</a><span style=\"float:right\">"+sCount+"</span>");
			iContainer++;
		}
	}
}

function getDagarSedan(inputS){
	if(isDate(inputS)){
		var dateStart=new Date(inputS);
		var dateEnd=new Date();
		var iDays=Math.floor((dateEnd-dateStart)/1000/60/60/24);
		switch(iDays){
			case-1:
				sDays="imorgon";
				break;
			case 0:
				sDays="idag";
				break;
			case 1:
				sDays="igår";
				break;
			default:
				if(iDays>1){
					sDays=iDays+" dagar sedan";
				}else{
					sDays="om "+iDays+" dagar";
					sDays=sDays.replace("-","")
				}
		}
		return sDays;
	}
}

function addEntry(inputS){
	var elemNew=document.createElement("div");
	elemNew.setAttribute("class","entry");
	elemNew.innerHTML="<em>"+inputS+"</em><div id=\"container\"><ul id=\"list_"+cleanString(inputS)+"\"></ul></div>";
	elemSB.parentNode.insertBefore(elemNew,elemSB.nextSibling);
}

function addItem(inputSName,inputStooltip,inputSText){
	if(document.getElementById("list_"+cleanString(inputSName))==null)addEntry(inputSName);		// existerar inte div/em med namnet så skapa den
	var elemList=document.getElementById("list_"+cleanString(inputSName));
	var elemNew=document.createElement("li");
	if(inputStooltip.length>0){
		elemNew.addEventListener("mouseover",function(e){tooltip.show(inputStooltip)},false);
		elemNew.addEventListener("mouseout",function(e){tooltip.hide()},false);
		}
	elemNew.innerHTML=inputSText;
	elemList.appendChild(elemNew);
}