// ==UserScript==
// @name          autokadabra_blacklist
// @description   autokadabra blacklist on all blogs page
// @include       http://autokadabra.ru/clubs/all/
// ==/UserScript==


var blockClub = new Array();
var blockUser = new Array();

//ЧТО БЛОКИРУЕМ?
//blockClub[0]="http://autokadabra.ru/clubs/lada/2105/all/";
//blockClub[1]="http://autokadabra.ru/clubs/freestyle/drifting/all/";
//blockClub[2]="http://autokadabra.ru/clubs/peugeot/206/all/";

//blockUser[0]="http://johnybazooka.autokadabra.ru/";

//для совместимости с opera script
if( location.href.indexOf('autokadabra.ru/clubs/all') != -1 ) {

//получим список всех дивов
allDivs = document.evaluate("//div",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    a=thisDiv.className;
    var blockThis=false;
    
    //проверим, является ли этот див пустым
    if (a.match("post posttype")) {
	
	//получим все вложенные дивы
	nestedDivs=thisDiv.getElementsByTagName('div');
	for (var s=0; s<nestedDivs.length; s++) {
		curDiv=nestedDivs[s];
		
		if (curDiv.className=='head') {
			//в head - ссылка на блог
			l=curDiv.getElementsByTagName('a')[1].href;
			for (var n=0; n<blockClub.length; n++) {
				if (l.indexOf(blockClub[n]) != -1 ) {blockThis=true; }
			}
			
		} //end head
		
		if (curDiv.className=='cellar') {
			//в cellar - ссылка на имя пользователя
			l=curDiv.getElementsByTagName('a')[0].href;
			for (var n=0; n<blockUser.length; n++) {
				if (l.indexOf(blockUser[n]) != -1 ) {blockThis=true; }
			}
		} //end cellar
		
	}
	
	if (blockThis) {thisDiv.style.display='none';}
	
	
	
    }

}
}//end opera compat