// ==UserScript==
// @name           Facebook MobWars script
// @namespace      http://none.com
// @description    Hitlist Bot
// @include http://apps.facebook.com/mobwars/hitlist/
// @include http://apps.facebook.com/mobwars/hitlist/index.php
// @include http://apps.new.facebook.com/mobwars/hitlist/
// @include http://apps.new.facebook.com/mobwars/hitlist/index.php 
// ==/UserScript==
var maxHitLimit=20000000000;
var minHitLimit=5000000000;
var minDepositLimit=10000000000000;
var MinHealtLimit=.6;
var minStamina=1;
var pauseTime=Math.random()*10;
var reload=true;
var newwindow = '';
var ReportMyWinnings=true
var myName="Anonymous"

function popitup(cash) {
	alert(cash);
}



function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}



//------------------------------------------------------------------------------------//
var thisPage=document.getElementById('app8743457343_content').firstChild.nextSibling.innerHTML
				stats=getElementsByClassName(document , 'div', 'wrap3outer')
				healthVal=document.getElementById('app8743457343_statusMenu').firstChild.innerHTML;
				cash=stats[0].innerHTML.replace('Cash:','')
				cash=cash.replace("Cash:","")
				printableCash=cash
				cash=cash.replace('$','')
				cash=cash.replace(',','')
				cash=cash.replace(',','')
				cash=cash.replace(',','')
				cash=trim(cash)
				health=stats[1].innerHTML.replace('Health: ','').split('/')
				healthVal=health[0]/health[1];
				printableHealth=healthVal*100
				stamina=stats[4].innerHTML.replace('Stamina: ','')
				printableStamina=stamina
				stamina=trim(stamina)
				stamina=stats[1].innerHTML.replace('stamina: ','').split('/')
				staminaVal=stamina[0]

				
				//alert(thisPage.indexOf("The Bank"));
if(thisPage.indexOf("The Bank")>=0){
	
	if(cash >= minDepositLimit ){
			if (ReportMyWinnings==true && myName !=false){
				window.open("http://www.fatherstorm.com/mobwars.php?bank="+cash+"&user="+myName,"_log");
			}
			Array.forEach(document.getElementsByTagName("INPUT"),function(input){
				if (input.value=="Deposit") {
					input.click();
					reload=false;
					}
				}
			);
		}else{
			window.open("http://apps.new.facebook.com/mobwars/hitlist/","_self");
		}
}
if(thisPage=="The Hospital"){
	if(healthVal<=.7){
			Array.forEach(document.getElementsByTagName("input"),function(input){
				input.click();
			}
		);
	}else{
		window.open("http://apps.new.facebook.com/mobwars/hitlist/","_self");
	}
}
if(thisPage=="The Hit List"){
	//alert(cash+healthVal)
				if(stamina<=minStamina){
					//pause
					 setTimeout('document.location.reload(true)',pauseTime*5000); 
				}
				if(cash>=minDepositLimit){
					
					window.open("http://apps.new.facebook.com/mobwars/bank/","_self");
				}
				if(healthVal<=MinHealtLimit){
					window.open("http://apps.new.facebook.com/mobwars/hospital/","_self");
				}
				//thisPage="DIE"
				//document.innerHTML=thisPage;
}
if(thisPage=="The Hit List"){
	document.title="Reload in "+pauseTime.toFixed(0)+" secs. Health:"+(healthVal*100).toFixed(2)+" / Cash: "+cash.replace("Cash:","");
				
 
                
                
                stats[0].innerHTML="Reload:<br/>"+pauseTime.toFixed(0)+" secs.";				
				stats[2].innerHTML=stats[2].innerHTML.replace(":",":<br/>");
				stats[3].innerHTML=stats[3].innerHTML.replace(":",":<br/>");
				stats[4].innerHTML=stats[4].innerHTML.replace(":",":<br/>");
				stats[5].innerHTML=stats[5].innerHTML.replace(":",":<br/>");
				if( healthVal >=MinHealtLimit){
					
					printabeHealth="<strong><font color='green'>Health: <br/>%"+(healthVal*100).toFixed(2)+"</font><br/>"
					printableFight="Fight: <br/><strong>"+(maxHitLimit/1000000).toFixed(0)+"M</strong>";
				stats[1].innerHTML=printableFight;
				}else{
					
					printabeHealth="<font color='red'>"+(healthVal*100).toFixed(2)+"</font><br/><strong>Unable to fight until minimum of %"+(MinHealtLimit*100)+" Health</strong>";
					printableFight="Not Fighting"
					stats[1].innerHTML=printableFight;
			

					//					Timer.start(document.location, "Waiting", 60);
				
				}
				var oNewT = document.createElement("table");
				var oNewD = document.createElement("tr");
				var oNewP = document.createElement("td");
				oNewP.style.border="1px outset silver;"
               oNewP.innerHTML="Cash: <br/>"+printableCash;
 				var oNewP2 = document.createElement("td");
   			oNewP2.style.border="1px solid black;"
               oNewP2.innerHTML="Health: <br/>%"+printableHealth.toFixed(0);
 	              oNewD.appendChild(oNewP);
                oNewD.appendChild(oNewP2);
                oNewT.appendChild(oNewD);
				pNode=stats[0].parentNode.parentNode
                var beforeMe = document.getElementById('content');
                pNode.insertBefore(
                	oNewT,
                	 stats[0].parentNode
                	 );
				//
				//alert(health);
				
				//alert(stats[1].innerHTML);
			//	alert(healthVal); wrap3outer

Array.forEach(document.getElementsByTagName("INPUT"),function(input){
		if (input.value=="attack") {
				checkVal=input.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
				checkVal=checkVal.replace("$","");
				checkVal=checkVal.replace(",","");
				checkVal=checkVal.replace(",","");
				checkVal=checkVal.replace(",","");
				checkVal=checkVal.replace(",","");
				if(checkVal<maxHitLimit && healthVal > MinHealtLimit){
				
				input.click();
				reload=false;
				}
			}
		}
		
	);
if (reload) setTimeout('document.location.reload(true)',pauseTime*1000); 
}