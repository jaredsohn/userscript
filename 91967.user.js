// ==UserScript==
// @name CALootCollectorUltra	
// @author DM
// @version 0.8
// @include http://apps.facebook.com/castle_age/battle_monster.php*
// ==/UserScript==

var collectButton = false;

window.addEventListener('DOMNodeInserted', function(e) {

	//closes "be selfish" box
	if(e.target.id == "app46755028429_single_popup_content_feedback")
	{
	clickElementFound('//div[@id="app46755028429_single_popup_content_feedback"]//div[@class="imgButton"]/img');
	}

	//closes loot box
	if(hasClass(e.target,'results'))
	{
	clickElementFound('//div[@class="results"]/div/a');
	}
	
	//starts functions when page wasnt opened in new tab
    if(e.target.id == 'app46755028429_battle_monster')
		{
		znajdzCollect();
		sprawdzCzas(); 
		sprawdzZycie();
		
		}

	
}, false);


window.addEventListener('DOMContentLoaded', function(e) {
	znajdzCollect();
	if(window.location.href == "http://apps.facebook.com/castle_age/battle_monster.php"){
	if(confirm('do you want to open all fights and collect loot?'))
    engageAll();  //on monster list page
	}sprawdzCzas();
	sprawdzZycie();
		
}, false);


function sprawdzCzas() {
   try{
    var spanek = document.getElementById("app46755028429_monsterTicker");
	if(spanek!=null){
    var pozostalyCzas = spanek.innerText;
    var pozostalyCzas2 = pozostalyCzas.substring(0, (pozostalyCzas.indexOf(":")));

    var pozostalyCzas3 = roundNumber((pozostalyCzas2 / timeToKill * 100), 2);
	czasPotwora = pozostalyCzas3;
	
	}
	else{czasPotwora=0;}
	}
	catch(e)
	{
	czasPotwora = 0;
	
	}
	
	
	
 
};

var zyciePotwora;
var czasPotwora;


function sprawdzZycie() {
	if(czasPotwora == 0){
		document.title = "v" + document.title;
		var hreff = window.location.href;
		if((collectButton == false) && (hreff.indexOf("http://apps.facebook.com/castle_age/battle_monster.php?")!=-1))
		{
		window.close();}
		return;
		}


	
};




function znajdzCollect(){
if(submitFormFound('//div[@title="Collect Reward"]/form')){
collectButton = true;}
}

function engageAll() {

	var buttons = xpath(document,'//div[@class="imgButton"]/a/img');
	var buttonsParent = xpath(document,'//div[@class="imgButton"]/a/img/..');
	for (var i = 0; i < buttons.snapshotLength; i++) {
		var btn = buttons.snapshotItem(i);
		var btnp = buttonsParent.snapshotItem(i);
		
		if(btn.getAttribute('alt')=="engage")
		{

		
	
		window.open(btnp.getAttribute("href")).blur();
		}
	 }
}

function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

function xpath(elem, query) {
    return elem.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function clickElementFound(xpathexpression){

var elements = xpath(document,xpathexpression);
if(elements.snapshotLength>0){
var button = elements.snapshotItem(0);

eventFire(button,'click');

return true;}
else
{return false;}
}

function submitFormFound(xpathexpression){
var elementsF = xpath(document,xpathexpression);
if(elementsF.snapshotLength>0){
var formToSubmit = elementsF.snapshotItem(0);

formToSubmit.submit();
//eventFire(formToSubmit,'submit');

return true;}
else
{return false;}


}

function hasClass (obj, className) {
    if (typeof obj == 'undefined' || obj==null || !RegExp) { return false; }
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
    if (typeof(obj)=="string") {
      return re.test(obj);
    }
    else if (typeof(obj)=="object" && obj.className) {
      return re.test(obj.className);
    }
    return false;
  }