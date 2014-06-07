// ==UserScript==
// @name       Travian T4+4.2 Marketplace Village Selector
// @namespace  
// @version    0.4
// @description  Adds a list of villages to marketplace
// @include       http://*.travian.*/build.php*
// @copyright  2013+, Mikkel Kragh Hansen (based on Infected89, Guy Fraser and Ankur Saxena)
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
  for (i=1;i<=20;i++) {
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
/*function changeTest()
{
	//$('enterVillageName').value='';
    //document.getElementById('xCoordInput').value='15';
    alert();
}*/
(function() {
    
 // Check if it is the market place
 var searchPage = document.getElementsByClassName('titleInHeader')[0];
 if (1==1) //(searchPage.innerHTML.indexOf("Marketplace") != -1)
 {
//<h1 class="titleInHeader">
	//			Marketplace
   
    
 // array of the village data (populated later)
 var villages = [];
 // get all village names
 var searchNames2 = "//div[@class='name']";   
 var names2 = document.evaluate(searchNames2, document, null, XPathResult.ANY_TYPE, null);

 // Go through each village and add it's details to the villages array
 var thisName = names2.iterateNext();

 while (thisName) {
  villages.push({name:thisName.textContent});
  thisName = names2.iterateNext();
 }

 // reverse villages list so it's in same sequence as what is shown in right sidebar
 villages.reverse();
 // get node to attach the select list to
 var node = document.getElementsByName('y')[0];
 // build the select list
    var sel = "<select id='selectedCity' onchange='$(enterVillageName).value=$(this).options[$(this).selectedIndex].text;'>";
 var i = villages.length;
  if (brally) {
  	 sel += "<option value = '"+(-1*i)+"' onClick='document.snd.x.value=0;document.snd.y.value=0;'>= Egne byer =</option>";
	 for (cnt = 1; cnt<=20; cnt++) {
	 	var rlTarget = GM_getValue('rallyTarget'+cnt, '-');
	 	if (rlTarget!="" && rlTarget!="-") {
	 		var target_array=rlTarget.split("|");
	 		var atttype = target_array[3]-1;
	  		sel += "<option value = '"+(-1*i)+"' onClick='document.getElementsByName(\"c\")[" + atttype + "].checked=true;document.snd.x.value="+target_array[1]+";document.snd.y.value="+target_array[2]+";'>"+target_array[0]+"</option>";
	 	}
	 }
} else {
	 for (cnt = 1; cnt<=20; cnt++) {
	 	var mpTarget = GM_getValue('marketplaceTarget'+cnt, '-');
	 	if (mpTarget!="" && mpTarget!="-") {
	 		var target_array=mpTarget.split("|");
         sel += "<option value = '"+(-1*i)+"'>"+target_array[0]+"</option>"; 
        }
	 }
 }
 while (-1<--i) {
  sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+"</option>";
 }
 sel += "</select>";
 // add the select box to the node
 if (!brally) {
	node.parentNode.parentNode.innerHTML += sel;
 }
 else {
 	node.parentNode.innerHTML += sel;
 }
 }
})();