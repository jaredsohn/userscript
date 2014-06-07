// ==UserScript==
// @name           Scorchy Slots
// @description	   Autoplays Scorchy Slots
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/games/slots.phtml*
// ==/UserScript==

var x = 2000 //change the page delay here; 1000 = 1 second
function delay() {

var t1=0; t2=0; t3=0; t4=0;
var g1=0; g2=0; g3=0; g4=0;
var f1=0; f2=0; f3=0; f4=0;
var b1=0; b2=0; b3=0; b4=0;
var p1=0; p2=0; p3=0; p4=0;

/////

if(document.body.innerHTML.indexOf('VASTHOUDEN') != -1){
var treasure1 = document.evaluate('//form/table/tbody/tr[2]/td[1]/img[@src="http://images.neopets.com/games/slots/mappiece_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (treasure1.snapshotLength > 0){t1=t1+1;}

var treasure2 = document.evaluate('//form/table/tbody/tr[2]/td[2]/img[@src="http://images.neopets.com/games/slots/mappiece_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (treasure2.snapshotLength > 0){t2=t2+1;}

var treasure3 = document.evaluate('//form/table/tbody/tr[2]/td[3]/img[@src="http://images.neopets.com/games/slots/mappiece_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (treasure3.snapshotLength > 0){t3=t3+1;}

var treasure4 = document.evaluate('//form/table/tbody/tr[2]/td[4]/img[@src="http://images.neopets.com/games/slots/mappiece_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (treasure4.snapshotLength > 0){t4=t4+1;}

/////

var gold1 = document.evaluate('//form/table/tbody/tr[2]/td[1]/img[@src="http://images.neopets.com/games/slots/baggold_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (gold1.snapshotLength > 0){g1=g1+1;}

var gold2 = document.evaluate('//form/table/tbody/tr[2]/td[2]/img[@src="http://images.neopets.com/games/slots/baggold_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (gold2.snapshotLength > 0){g2=g2+1;}

var gold3 = document.evaluate('//form/table/tbody/tr[2]/td[3]/img[@src="http://images.neopets.com/games/slots/baggold_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (gold3.snapshotLength > 0){g3=g3+1;}

var gold4 = document.evaluate('//form/table/tbody/tr[2]/td[4]/img[@src="http://images.neopets.com/games/slots/baggold_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (gold4.snapshotLength > 0){g4=g4+1;}

///////

var faeries1 = document.evaluate('//form/table/tbody/tr[2]/td[1]/img[@src="http://images.neopets.com/games/slots/faerie_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (faeries1.snapshotLength > 0){f1=f1+1;}

var faeries2 = document.evaluate('//form/table/tbody/tr[2]/td[2]/img[@src="http://images.neopets.com/games/slots/faerie_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (faeries2.snapshotLength > 0){f2=f2+1;}

var faeries3 = document.evaluate('//form/table/tbody/tr[2]/td[3]/img[@src="http://images.neopets.com/games/slots/faerie_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (faeries3.snapshotLength > 0){f3=f3+1;}

var faeries4 = document.evaluate('//form/table/tbody/tr[2]/td[4]/img[@src="http://images.neopets.com/games/slots/faerie_0.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (faeries4.snapshotLength > 0){f4=f4+1;}

///////

var bell1 = document.evaluate('//form/table/tbody/tr[2]/td[1]/img[@src="http://images.neopets.com/games/slots/bell"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (bell1.snapshotLength > 0){b1=b1+1;}

var bell2 = document.evaluate('//form/table/tbody/tr[2]/td[2]/img[@src="http://images.neopets.com/games/slots/bell"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (bell2.snapshotLength > 0){b2=b2+1;}

var bell3 = document.evaluate('//form/table/tbody/tr[2]/td[3]/img[@src="http://images.neopets.com/games/slots/bell"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (bell3.snapshotLength > 0){b3=b3+1;}

var bell4 = document.evaluate('//form/table/tbody/tr[2]/td[4]/img[@src="http://images.neopets.com/games/slots/bell"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (bell4.snapshotLength > 0){b4=b4+1;}

///////

var peach1 = document.evaluate('//form/table/tbody/tr[2]/td[1]/img[@src="http://images.neopets.com/games/slots/peach"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (peach1.snapshotLength > 0){p1=p1+1;}

var peach2 = document.evaluate('//form/table/tbody/tr[2]/td[2]/img[@src="http://images.neopets.com/games/slots/peach"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (peach2.snapshotLength > 0){p2=p2+1;}

var peach3 = document.evaluate('//form/table/tbody/tr[2]/td[3]/img[@src="http://images.neopets.com/games/slots/peach"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (peach3.snapshotLength > 0){p3=p3+1;}

var peach4 = document.evaluate('//form/table/tbody/tr[2]/td[4]/img[@src="http://images.neopets.com/games/slots/peach"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (peach4.snapshotLength > 0){p4=p4+1;}
///////

if(t1+t2+t3+t4>=1 && g1+g2+g3+g4<=1 && f1+f2+f3+f4<=2|| t1+t2+t3+t4>=2 && g1+g2+g3+g4<=2 && f1+f2+f3+f4<=2){	
	if(t1>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold1"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(t2>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(t3>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(t4>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold4"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}}

if(g1+g2+g3+g4>=1 && t1+t2+t3+t4<=0 || g1+g2+g3+g4>=2 && t1+t2+t3+t4<=1){	
	if(g1>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold1"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(g2>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(g3>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(g4>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold4"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}}

if(f1+f2+f3+f4>=3){		
	if(f1>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold1"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(f2>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(f3>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(f4>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold4"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}}

if(b1+b2+b3+b4>=3 && t1+t2+t3+t4<=0 && g1+g2+g3+g4<=0){	
	if(b1>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold1"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(b2>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(b3>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(b4>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold4"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}}

if(p1+p2+p3+p4>=3 && t1+t2+t3+t4<=0 && g1+g2+g3+g4<=0){	
	if(p1>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold1"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(p2>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(p3>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}
	if(p4>0){var button = document.evaluate('//input[@type = "checkbox" and @name = "hold4"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();}}}


if(document.body.innerHTML.indexOf('Klik Hier om te Spelen') != -1){
  var button = document.evaluate('//form[contains(@action,"slots.phtml")]/input[@type = "hidden" and @value = "yes"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if(document.body.innerHTML.indexOf('Opnieuw Spelen') != -1){
  var button = document.evaluate('//form[contains(@action,"process_slots2.phtml")]/input[@type = "hidden" and @name = "_ref_ck"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if(document.body.innerHTML.indexOf('Winst Ophalen') != -1){
  var button = document.evaluate('//input[@type = "hidden" and @value = "true" and @name="collect"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

}window.setTimeout(delay, x)
