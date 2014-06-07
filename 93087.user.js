// ==UserScript==
// @name          Travian MarketPlace and Rally point auto-helper +
// @namespace     http://userscripts.org/scripts/show/28218
// @description   Adds a list of villages to market and rally screens.
// @include       http://s*.travian.*/build.php*
// @include       http://s*.travian.*/a2b.php*
// @author        percyf4 , based on msimic + Guy Fraser and original by Ankur Saxena
// ==/UserScript==
GM_registerMenuCommand( "Set additional marketplace targets", MPTSetup );

 var brally=window.location.href.match(/a2b/);
 
function mpTarget(i)
{
	word = prompt("Set marketplace target " + i + " (format: Villagename|Xcoord|Ycoord)\nPress Cancel to delete the old village.",GM_getValue('marketplaceTarget'+i, ''));
	if (word==null) {
	  GM_setValue('marketplaceTarget' + i, "");
	  return false;
	}
	GM_setValue('marketplaceTarget' + i, word);
	return true;
}

function rlTarget(i)
{
	word = prompt("Set rally target " + i + " (format: Villagename|Xcoord|Ycoord|type)\ntype can be 1 (reinforcement), 2 (attack), 3 (raid)\nPress Cancel to delete the old village.",GM_getValue('rallyTarget'+i, ''));
	if (word==null) {
	  GM_setValue('rallyTarget' + i, "");
	  return false;
	}
	GM_setValue('rallyTarget' + i, word);
	return true;
}

document.addEventListener("keydown",MPhotKeys,true); 

function MPTSetup() {
	var i = 0;
  for (i=1;i<=5;i++) {
  	 if (!brally) {
  	 	if (mpTarget(i)!=true) break;
  	 } else {
  	 	if (rlTarget(i)!=true) break;
  	 }
  }
}

function MPhotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==0)&&(event.ctrlKey==1))) 
        {
            if(event.keyCode==77)                   //m
            {
							MPTSetup();
            }
        }
}

(function() {

 // array of the village data (populated later)
 var villages = [];

 // get all village names
 var searchNames = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[1]/a";
 var names = document.evaluate(searchNames, document, null, XPathResult.ANY_TYPE, null);

 // get their X coords
 var searchXs = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[2]/table/tbody/tr/td[1]";
 var Xs = document.evaluate(searchXs, document, null, XPathResult.ANY_TYPE, null);

 // get their Y coords
 var searchYs = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[2]/table/tbody/tr/td[3]";
 var Ys = document.evaluate(searchYs, document, null, XPathResult.ANY_TYPE, null);

 // Go through each village and add it's details to the villages array
 var thisName = names.iterateNext();
 var thisX = Xs.iterateNext();
 var thisY = Ys.iterateNext();
 //var alertText = "gooo!\n";
 while (thisName) {
  thisX = thisX.textContent.substr(1); // remove opening (
  thisY = parseInt(thisY.textContent); // remove closing )
  //alertText += thisName.textContent + " @ ("+thisX+","+thisY+")\n"
  villages.push({name:thisName.textContent, x:thisX, y:thisY});
  thisName = names.iterateNext();
  thisX = Xs.iterateNext();
  thisY = Ys.iterateNext();
 }
 //alert(alertText);

 // reverse villages list so it's in same sequence as what is shown in right sidebar
 villages.reverse();

 // get node to attach the select list to
 var node = document.getElementsByName('y')[0];

 // build the select list
 var sel = "<select>";
 var i = villages.length;
  if (brally) {
  	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=0;document.snd.y.value=0;'>- Custom rally targets -</option>"; 		
	 for (cnt = 1; cnt<=5; cnt++) {
	 	var rlTarget = GM_getValue('rallyTarget'+cnt, '-');
	 	if (rlTarget!="" && rlTarget!="-") {
	 		var target_array=rlTarget.split("|");
	 		var atttype = target_array[3]-1;
	  		sel += "<option value = '"+(-1*i)+"' onClick='document.getElementsByName(\"c\")[" + atttype + "].checked=true;document.snd.x.value="+target_array[1]+";document.snd.y.value="+target_array[2]+";'>"+target_array[0]+"</option>"; 			
	 	}
	 }
	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=-170;document.snd.y.value=-111;'>------+++ Main 【10】 +++------</option>"; 		  	
  } else {
  	sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=-142;document.snd.y.value=-109;'>------【02】※ホーチミン------</option>"; 	
	 for (cnt = 1; cnt<=5; cnt++) {
	 	var mpTarget = GM_getValue('marketplaceTarget'+cnt, '-');
	 	if (mpTarget!="" && mpTarget!="-") {
	 		var target_array=mpTarget.split("|");
	  	sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value="+target_array[1]+";document.snd.y.value="+target_array[2]+";'>"+target_array[0]+"</option>"; 			
	 	}
	 }
	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=-170;document.snd.y.value=-111;'>------+++ Main 【10】 +++------</option>"; 		 
 }
 while (-1<--i) {
  // this version with coords in drop-down:
  //sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+" ("+villages[i].x+","+villages[i].y+")</option>";
  // this version without coords in drop-down:
  sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+"</option>";
 }
 sel += "</select>";

 // add the select box to the node
 if (!brally) {
	node.parentNode.innerHTML += sel;

 }
 else {
 	node.parentNode.innerHTML += sel;
	
 }
})();