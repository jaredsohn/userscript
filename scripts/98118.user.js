// ==UserScript==
// @name           CS2 Planet Buttons
// @namespace      userscripts.org
// @description    Directly change to other planetary markets without going to sector view
// @include        http://*.chosenspace.com/index.php?go=prices&planet=yes*
// @include        http://*.chosenspace.com/index.php?go=planet_terminal*
// @include        http://*.chosenspace.com/index.php?go=planet_recruit*
// @include        http://*.chosenspace.com/index.php?go=planet_trade*
// @include        http://*.chosenspace.com/index.php?go=planet_info*
// @include        http://*.chosenspace.com/index.php?go=board*&planet_id=*
// @exclude        http://*.chosenspace.com/index.php?go=board*&planet_id=0*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
function clgif(width,height){
	var newGif=document.createElement('img');
	newGif.src='images/clear.gif';
	newGif.height=height;
	newGif.width=width;
	newGif.border=0;
	return newGif;
}
function button(width,value,onclick){
	var newButton=document.createElement('input');
	newButton.type='button';
	newButton.style.width=width+'px';
	newButton.value=value;
	if(onclick!=''){
		newButton.setAttribute('onclick',onclick);
		newButton.className='forms_btn';
	}
	else {
		newButton.setAttribute('disabled','disabled');
		newButton.className='forms_btn_off';
	}
	return newButton;
}
var pid,pinfo,pboard,ptrade,pterminal,precruit,pbounties,allTags,thisTag;
allTags=document.evaluate("//a[following::text()[contains(.,' - ')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisTag=allTags.snapshotItem(0);
if(!thisTag){
	allTags=document.evaluate("//a[following::text()[contains(.,' :: ')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	thisTag=allTags.snapshotItem(0);
}
if(thisTag){
	var clueless=thisTag.textContent;
	var tst=/System/;
	if(tst.test(clueless)){
		allTags=document.evaluate("//a[preceding::text()[contains(.,' - ')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		thisTag=allTags.snapshotItem(1);
		clueless=thisTag.textContent;
	}
	var planet={"Mantia":"1","Lax":"2","Serio":"3","Rakus":"4","Wahur":"5","Vobis":"9","Cerea":"10","Kaas":"11","Mertis":"12","Prema":"13","Taris":"14","Trennok":"17","Durrok":"20","Fariss":"21","Saren":"22","Velos":"23","Zeta":"26","Brax":"27","Tanis":"28","Aeten":"29","Soror":"30","Freya":"35","Aruk":"36","Jakar":"37","Ventani":"38","Ares":"39","Exillis":"44","Primus":"45","Mirnok":"46","Aquila":"47","Kryos":"48","Omnis":"49","Gratia":"52","Capek":"53","Ezra":"54","Jahib":"55","Netrea":"56","Trellum":"57","Lapsus":"62","Teag":"63","Beslan":"64","Arcas":"65","Cetus":"66","Lutra":"67","Vega":"73","Satus":"74","Tapek":"75","Kallos":"76","Zaran":"78","Vaku":"80","Ramura":"81","Lyra":"82","Equis":"83","Magus":"85","Cenix":"87","Remus":"89","Sigma":"90","Birnax":"91","Aeger":"93","Pallidus":"94","Darnak":"95","Volan":"96","Rumino":"97","Takar":"101","Arium":"102","Adari":"103","Uran":"104","Verdus":"105","Gennok":"112","Vorax":"113","Prolix":"114","Zohar":"115","Qualis":"116","Rhinaxi":"119","Antar":"120","Acrus":"121","Ceti":"122","Nakara":"123","Raxis":"126","Zethus":"127","Ferox":"128","Inibi":"129","Dahir":"132","Xenox":"134"}
	pid=planet[clueless];
}
if(!thisTag||!pid){
	var test=location.href.split("&planet_id=");
	if(test[1]){
		pid=test[1].split("&")[0];
	}
}
var planetid={"1":"Mantia","2":"Lax","3":"Serio","4":"Rakus","5":"Wahur","9":"Vobis","10":"Cerea","11":"Kaas","12":"Mertis","13":"Prema","14":"Taris","17":"Trennok","20":"Durrok","21":"Fariss","22":"Saren","23":"Velos","26":"Zeta","27":"Brax","28":"Tanis","29":"Aeten","30":"Soror","35":"Freya","36":"Aruk","37":"Jakar","38":"Ventani","39":"Ares","44":"Exillis","45":"Primus","46":"Mirnok","47":"Aquila","48":"Kryos","49":"Omnis","52":"Gratia","53":"Capek","54":"Ezra","55":"Jahib","56":"Netrea","57":"Trellum","62":"Lapsus","63":"Teag","64":"Beslan","65":"Arcas","66":"Cetus","67":"Lutra","73":"Vega","74":"Satus","75":"Tapek","76":"Kallos","78":"Zaran","80":"Vaku","81":"Ramura","82":"Lyra","83":"Equis","85":"Magus","87":"Cenix","89":"Remus","90":"Sigma","91":"Birnax","93":"Aeger","94":"Pallidus","95":"Darnak","96":"Volan","97":"Rumino","101":"Takar","102":"Arium","103":"Adari","104":"Uran","105":"Verdus","112":"Gennok","113":"Vorax","114":"Prolix","115":"Zohar","116":"Qualis","119":"Rhinaxi","120":"Antar","121":"Acrus","122":"Ceti","123":"Nakara","126":"Raxis","127":"Zethus","128":"Ferox","129":"Inibi","132":"Dahir","134":"Xenox"}
if(pid&&planetid[pid]){
	pboard=button(85,'Planet Board','location.href=\'index.php?go=board&other_id=0&faction_id=0&planet_id='+pid+'\';');
	pinfo=button(85,'Planet Info','location.href=\'index.php?go=planet_info&planet_id='+pid+'\';');
	ptrade=button(85,'Trading Post','location.href=\'index.php?go=planet_trade&planet_id='+pid+'\';');
	pterminal=button(85,'Terminal','location.href=\'index.php?go=planet_terminal&planet_id='+pid+'\';');
	precruit=button(85,'Recruiting','location.href=\'index.php?go=planet_recruit&planet_id='+pid+'\';');
	pprice=button(85,'Prices','location.href=\'index.php?go=prices&planet=yes&planet_id='+pid+'\';');
	phold=button(85,'-','');
}else{
	pboard=button(85,'Planet Board','');
	pinfo=button(85,'Planet Info','');
	ptrade=button(85,'Trading Post','');
	pterminal=button(85,'Terminal','');
	precruit=button(85,'Recruiting','');
	pprice=button(85,'Prices','');
	phold=button(85,'-','');
}
allTags=document.evaluate("//form[contains(@action,'prices')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisTag=allTags.snapshotItem(0);
if(thisTag){
	thisTag.setAttribute('action',"index.php?go=prices&planet=yes&planet_id="+pid);
}
allTags=document.evaluate("//td[@colspan='2' and @width='627' and @height='100%']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisTag=allTags.snapshotItem(0);
var newButtonRow=thisTag.firstChild;
newButtonRow.parentNode.insertBefore(ptrade, newButtonRow);
newButtonRow.parentNode.insertBefore(clgif(5,1), newButtonRow);
newButtonRow.parentNode.insertBefore(pterminal, newButtonRow);
newButtonRow.parentNode.insertBefore(clgif(5,1), newButtonRow);
newButtonRow.parentNode.insertBefore(precruit, newButtonRow);
newButtonRow.parentNode.insertBefore(clgif(5,1), newButtonRow);
newButtonRow.parentNode.insertBefore(pinfo, newButtonRow);
newButtonRow.parentNode.insertBefore(clgif(5,1), newButtonRow);
newButtonRow.parentNode.insertBefore(pboard, newButtonRow);
newButtonRow.parentNode.insertBefore(clgif(5,1), newButtonRow);
newButtonRow.parentNode.insertBefore(phold, newButtonRow);
newButtonRow.parentNode.insertBefore(clgif(5,1), newButtonRow);
newButtonRow.parentNode.insertBefore(pprice, newButtonRow);
