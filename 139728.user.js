// ==UserScript==
// @name        Diamond Dynasty Inventory Tracker
// @namespace   baseballsimulator.com/
// @include     https://theshownation.com/diamond_dynasty/card_inventory/me
// @include     https://theshownation.com/diamond_dynasty/card_inventory/me?quality=MLB
// @version     1
// ==/UserScript==

var cardTotal = 0;

var thisURL = document.URL;


var firstName;
var lastName;
var fullName;
var ddCardRepository = '';
var mlbCardRepository = '';

var ddCard;
var ddCards =  document.evaluate("//div[@class='dataTabContainer']/div[@id='e0_data']/ul/li/div[@class='arenaCardName']/text()",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < ddCards.snapshotLength; i++) {

	ddCard = ddCards.snapshotItem(i);

	var i2 = i/2;

	if (i2 == i2.toFixed())//Get first name	
	{
		
		firstName = ddCard.nodeValue;
		lastName = undefined;

	}
	else//Get last name	
	{

		lastName = ddCard.nodeValue;
		fullName = firstName + ' ' + lastName;
		ddCardRepository = ddCardRepository + fullName + ',';

	}
	
}

var ddCardName;
var ddCardName2;
var ddCardNames =  document.evaluate("//div[@class='dataTabContainer']/div[@id='e0_data']/ul/li/div[@class='arenaCardName']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < ddCardNames.snapshotLength; i++) {

	ddCardName = ddCardNames.snapshotItem(i);
	ddCardName2 = ddCardName.innerHTML;
	ddCardName2 = ddCardName2.replace('<br>',' ');


	var colElement = document.createElement("a");
	colElement.setAttribute('name', ddCardName2);


	ddCardName.parentNode.insertBefore(colElement,ddCardName);


}


var ddCardTop;
var ddCardTops =  document.evaluate("//div[@class='dataTabContainer']/div[@id='e0_data']/ul/li",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 4; i < ddCardTops.snapshotLength; i++) {

	ddCardTop = ddCardTops.snapshotItem(i);	

	/*
	var colElement2 = document.createElement("a");
	colElement2.setAttribute('style','color:#0000FF;text-align: center;display: inline;');
	colElement2.setAttribute('href', '#TOP');
	colElement2.innerHTML = "<strong>TOP</strong>";
	*/

	
	var colElement2 = document.createElement("div");
	colElement2.setAttribute('style','text-align:center;');
	colElement2.innerHTML = '<a style="color:#0000FF;" href="#TOP"><strong>TOP</strong></a>';	
	

	if(i % 4 == 0){
	
		ddCardTop.parentNode.insertBefore(colElement2,ddCardTop);	

	}

}


var newDDCards = '';
var newDDCards2 = '';

var retrievedDDCardRepository = GM_getValue('ddCardRepository','');

ddCardRepository = ddCardRepository.substring(0,ddCardRepository.length-1);

if (ddCardRepository != '') {
	
ddCardRepositoryArray = ddCardRepository.split(",");

for (var i = 0; i < ddCardRepositoryArray.length; i++) {

	if(retrievedDDCardRepository.indexOf(ddCardRepositoryArray[i]) == -1){

		newDDCards = newDDCards + "<a href='#" + ddCardRepositoryArray[i] + "'><font color='lime'>" + ddCardRepositoryArray[i] + "</font></a>, ";

	}		

}

newDDCards = newDDCards.substring(0,newDDCards.length-2);

newDDCards2 = '<font color="lime">' + newDDCards + '</font>';

GM_setValue('ddCardRepository',ddCardRepository);

}

var oldDDCards = '';
var oldDDCards2 = '';

var retrievedDDCardRepositoryArray = retrievedDDCardRepository.split(",");

if (retrievedDDCardRepository != '') {
	
for (var i = 0; i < retrievedDDCardRepositoryArray.length; i++) {

	if(ddCardRepository.indexOf(retrievedDDCardRepositoryArray[i]) == -1){

		oldDDCards = oldDDCards + "<font color='red'>" + retrievedDDCardRepositoryArray[i] + "</font>, ";

	}

}

oldDDCards = oldDDCards.substring(0,oldDDCards.length-2);

oldDDCards2 = '<font color="red">' + oldDDCards + '</font>';


}


var mlbCard;
var mlbCards =  document.evaluate("//div[@class='mlbCardInventory']/div[@class='arenaCardName']/text()",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < mlbCards.snapshotLength; i++) {

	mlbCard = mlbCards.snapshotItem(i);

	var i2 = i/2;

	if (i2 == i2.toFixed())//Get first name	
	{
		
		firstName = mlbCard.nodeValue;
		lastName = undefined;

	}
	else//Get last name	
	{

		lastName = mlbCard.nodeValue;
		fullName = firstName + ' ' + lastName;
		mlbCardRepository = mlbCardRepository + fullName + ',';

	}

	
}

var mlbCardName;
var mlbCardName2;
var mlbCardNames =  document.evaluate("//div[@class='mlbCardInventory']/div[@class='arenaCardName']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < mlbCardNames.snapshotLength; i++) {

	mlbCardName = mlbCardNames.snapshotItem(i);
	mlbCardName2 = mlbCardName.innerHTML;
	mlbCardName2 = mlbCardName2.replace('<br>',' ');


	var colElement = document.createElement("a");
	colElement.setAttribute('name', mlbCardName2);

	mlbCardName.parentNode.insertBefore(colElement,mlbCardName);

}


var newMLBCards = '';
var newMLBCards2 = '';


var retrievedMLBCardRepository = GM_getValue('mlbCardRepository','');


mlbCardRepository = mlbCardRepository.substring(0,mlbCardRepository.length-1);

if (mlbCardRepository != '') {

mlbCardRepositoryArray = mlbCardRepository.split(",");

for (var i = 0; i < mlbCardRepositoryArray.length; i++) {

	if(retrievedMLBCardRepository.indexOf(mlbCardRepositoryArray[i]) == -1){

		
		newMLBCards = newMLBCards + "<a href='#" + mlbCardRepositoryArray[i] + "'><font color='lime'>" + mlbCardRepositoryArray[i] + "</font></a>, ";

	}	
}

newMLBCards = newMLBCards.substring(0,newMLBCards.length-2);

newMLBCards2 = '<font color="lime">' + newMLBCards + '</font>';


GM_setValue('mlbCardRepository',mlbCardRepository);

}


var oldMLBCards = '';
var oldMLBCards2 = '';

var retrievedMLBCardRepositoryArray = retrievedMLBCardRepository.split(",");

if (retrievedMLBCardRepository != '') {
	
for (var i = 0; i < retrievedMLBCardRepositoryArray.length; i++) {

	if(mlbCardRepository.indexOf(retrievedMLBCardRepositoryArray[i]) == -1){

		oldMLBCards = oldMLBCards + "<font color='red'>" + retrievedMLBCardRepositoryArray[i] + "</font>, ";

	}

}

oldMLBCards = oldMLBCards.substring(0,oldMLBCards.length-2);

oldMLBCards2 = '<font color="red">' + oldMLBCards + '</font>';


}

/*
var arenaTab;
var arenaTabs =  document.evaluate("//div[@id='arenaTabs']/div[@class='arenaTabContainer']/ul[@class='cardTabs']/li/a/span/text()",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < arenaTabs.snapshotLength; i++) {

	arenaTab = arenaTabs.snapshotItem(i);

	if(i<5){

		var cardCount = arenaTab.nodeValue;
		cardCount = cardCount.substring(cardCount.indexOf('(')+1,cardCount.indexOf(')'));

		cardTotal = cardTotal + parseInt(cardCount);
	}

}
*/

var arenaTab;
var arenaTabs =  document.evaluate("//div[@id='cardInventory']",document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
arenaTab = arenaTabs.snapshotItem(0);
cardCount = arenaTab.innerHTML;
cardTotal = cardCount;

var retrievedCardTotal = GM_getValue('cardTotal',0);

GM_setValue('cardTotal',cardTotal);

//cardTotal = 60;

difference = cardTotal - retrievedCardTotal;



if(difference > 0){

	differenceText = '<font color="lime"> *' + difference + ' Cards Added' + '*</font>';

}
else if(difference < 0){

	difference = Math.abs(difference);
	differenceText = '<font color="red"> *' + difference + ' Cards Removed' + '*</font>' ;

}
else
{

	differenceText = '';

}

var cardTotalLocation = document.evaluate("//div[@class='arenaTabContainer']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

cardTotalLocation = cardTotalLocation.snapshotItem(0);

var myTest = document.createElement('div');

var delimiter;
var dash;

if(newDDCards != '' && newMLBCards != ''){

	delimiter = '<font color="lime">' + '|' + '</font>';
	

}
else
{

	delimiter = '';
	

}

if(newDDCards != '' || newMLBCards != ''){

	dash = '<font color="lime">' + ' - ' + '</font>';

}
else
{

	dash = ' ';

}

var delimiter2;
var dash2;


if(oldDDCards != '' && oldMLBCards != ''){

	delimiter2 = '<font color="red">' + '|' + '</font>';
	

}
else
{

	delimiter2 = ' ';
	

}

if(oldDDCards != '' || oldMLBCards != ''){

	dash2 = '<font color="red">' + ' - ' + '</font>';

}
else
{

	dash2 = ' ';

}

if (thisURL == 'https://theshownation.com/diamond_dynasty/card_inventory/me?quality=MLB'){

	myTest.innerHTML='<center><strong>Total Cards: ' + cardTotal + ' ' + differenceText + dash + newMLBCards2 + delimiter2 + oldMLBCards2 + '</strong><br><a href=' + 'https://theshownation.com/diamond_dynasty/card_inventory/me?quality=MLB' + '><font color="blue"><strong>Refresh Page</strong></font></a></center>';

	}
else
{

	myTest.innerHTML='<center><strong>Total Cards: ' + cardTotal + ' ' + differenceText + dash + newDDCards2 + delimiter + newMLBCards2 + delimiter2 + oldDDCards2 + delimiter2 + oldMLBCards2 + '</strong><br><a href=' + 'https://theshownation.com/diamond_dynasty/card_inventory/me' + '><font color="blue"><strong>Refresh Page</strong></font></a></center>';

}

myTest.setAttribute('id',  'loginUsername');
myTest.setAttribute('style',  'color:white;');


cardTotalLocation.parentNode.insertBefore(myTest,cardTotalLocation.nextSibling);


//Stamp not currently being used for anything
stamp = 'data:image/gif,GIF89ad%00d%00%F7%00%00%00%00%00%80%00%00%00%80%00%80%80%00%00%00%80%80%00%80%00%80%80%80%80%80%C0%C0%C0%FF%00%00%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF!%F9%04%01%00%00%10%00%2C%00%00%00%00d%00d%00%00%08%FF%00%FF%09%1CH%B0%A0%C1%83%08%13*%5C%C8%B0aB%14%10%23J%9CH%B1%A2%C5%8B%183j%DCXQ%20G%8BL%3E%8A%1CI%12EH%8A%1EKF%3C%A9%B2%A5%CB%8B)!%B2%E48%F3b%CD%90Lr2%81%B3%B3\'%CE%925e%AE%1C*4%A6%CA%A06w%C2%A1%84%0B%17S%5C%DC%A06eJ%89%12%CF%97%1F%8D%92D*4%E7%D2%A6Q%B9%89mJ%B6l%D8%B1%B8%AEb%A5%C8R%EB%D6%8B_%A5%3A%B5%FA%B3%AEI%A5U%C1%3A%CD%B9%B6%E3%3F%89%5Cm%9A%9C%B8%F4%17Z%BA5%E1%A4%8D%18%F7%17O%26y)%DDY%AAv%B0%D0%CB%963%B3%0C%E9%B6%25%9C%AFQ%9D%3E%5EZ%951T8%A6%9D%9E%06%ACx*%EA%BE(%3A%7F%3C%C9%04%ACX%C4%AD%CF%E2B%A1X%EC%EB%A1p%A2N%CCi%F5)_%91He%CF%AE-%95%D2L%A8%94d6%C5%19%FC%F7JJ%DC%AC%03%86l%F53V%A3%81%D9%12%FF%1F%FB9%F1%B8%E2%B7%19s%8B.%B3w%F6%F0x%BD%23%DDLt%B0%F2%8C%90%9B%9Bd%3A%5Cjh%AB2e%A7%9Es%B3Q%A6%DDH%F7%81%14%9CT%BF%AD%26%11t%01%B2%B7%20_M%3D%26%92bU%1D%B7Q%5B%7F!%B7%60T%CEI%B8%1Ea%02%A2%C0%14j%C1%85%E5%1CTh!G%95%86Yu%88%99%82b%BD%C7%C48%23%D6Vb%80%EB%E1%B8%9BI%9FM%86%E2gplB%20M%DCeX%1F%7DE%C9%B8!Y%B4a%87KH%AD1%96%9Fhw%3D%86%97O0~%F4%D5%81%19%25%B8%92%7B%CF%DD%16%12t)F7%9A%5Ea%B1%D8%E6%5C%5D%82%C4%D8%89%F3%F9%B5%E1%87U'+
'%A9%25%2578%D5%08%E0NlNU%9C%81%A4%91%05%E0%85%D3%C5%08XE%80%DE%86%DD8%D3a%F7(DLy%F5%8B%9B%7B%E9%94%D9vLA%3Ae%6031%97Vx%11%89i%22tg%FA%07%15d%23B%14%D7z%16z%FFHVe%F8A%B9QJ%C7%25%C6%A0t%D0%9DV%1Bj%3B%E5%19%EBp%5E%1AJS%85%B7%3A%C9%A8~%2B!%FB%9BWq%BE%04%E8%5EO%D2j%91%40L%5E%17%D5%81Ll%3B%E7%B0%1A%D5%89%19q%15%FE%A4%20%B5%81%DDW%DB%91l%B5%9Ag%B4%B0%ED%07%2B~tb%84%2B%5B%94a%A4%D3%8B%A4%F6%C5%EAb%18%B5%C6.J%CAJDd%B8%B3%F6%0B%1B%A0%03W%94%A7%BDN%B2D%9A%86A%E9%F8%DE%C2%F5-%CA0%982%ED%B4%E9D%9D%E5%C7%B1DL%AD%A7p%BC2I%AA0Wn%FDKjo%0D%A3%8C_%BE%FARK0%5BSe%D4%9B%B52%D3%94%91%A4%D7%16%DC%E9%C8%BCIur%CF%01cw%15d%E3p%AC%15%AB1%93%EC-%D2o%1D%C7%E2k%89%DA%09%98T57E5r%CC-U%22%8B9A%05%93%B2O%11m%EB%D7w%1A%D7%DBI%15%06%C7%9E%D6%FB%EDj%91b%E7%D1F%F4%C2%3D5%FF%EB%1C_yE%94%16Ug%0Bn%ECER%3E%7B%B4g%92Z%C7%DF%98%EC~%95n%87%3A%A2%0A%12Y%DB%F5%2C1%9A%DEQ%EATD\'n%0D0%DDz%8D%BC%F3%D7%9Fa%09m%7B%ECq%17%EC%AA%24%CE%7D%B3I%FE-%ADY%E2%19%BF%14%17%A4%00.5%1C%81%CCaG%1Ea%B8%8C%C3%B2%8C%86%06%96%B3%BF%1E%8B%1C%3A%A5%0D%1F9%AB%D8SN%F4%FC%ECWV%CF%E8R%15%1FE%17o%5E%ED%88%E1%E6%22%8A%C8%A7%F5%AD%CE~%AA%CD%82%1DE%AB%C7%80%95%C6%2B%60QQ%E95%F4%DAU%A9um%BC%13%DB%15%A3w%11%CFU%E46%B7%83%3DH%7B(%40%96t%CE%17%B69!%B0o%A4s%10H%E0U%91%D4%E5%E8)s%93%9Fz6%E7%B8%23%01-e%A3%0B%13%E5p%C7%96%2Cm%E43yQ%A0%7B~%14%9CP%F9%CEUfc%8C%9E%84%B3(FQ%E9%241%01%14%D1%E0%03%AC%AA%BCKt%DE%FA%D5%D6%FFd%975%13u%CEDQ%A3%88%B0pH9%14%CA%CE%7F%20%A9%1F%0A%0C%F3%C4%94%AD%07V%EBb%C9%1D%C4%C2%12J%9C%C79%18%82%A2%BE0%F4%BD%98%F0%84g%13%DC%0C%EC%14%C31%A5U%072%DA)%E2%95%82%D5%12%A5%F0%06%22%B8%D2%C9%CB%CA%96%BEnU%2F%3F%7C1%97%D2%8C%98%40%04%F2%26%7D%26%0C%CF%0B%19E%15%B5%E4p%23%403%0E%AFNB%24%BA%3CK~J1%24s6D%184B%24yx%2C%D8%EF~3%A1B%FE%E8F%DA%7B%DD%F7%22%B2%89%C5%5C%E9%17C%04%15o*%13%2C%DA%FC%0ER%1C%02%20%0CK%A4%23%9C%20k%5D%D7%F9%94%12y)%A5%95%0DFS%24K%A2)%1DY0%B9%99%A6D%1F%94%5B%D9*s%3D%A9%FDh%3F%CA%ECX%EERV%C5f%0D%8E%89%0E%9B%9B%A8%22%04B%9E%3C%CEU%88%0Cd%11%E3%F5%B9%CB%9D%11%9Cl%F9%05%25%17%24%CF%5E%A23%3BELQ%B0.%B5%FF%1B%3B%22%07%3F%B4%DBD%EE%046%B7%90Q%AC5%A8%19%A4%E70%E7%CD7e%13%2B%D5%81%0BX~%D3%99%F2%B0.l%CE4%9C%14%17%E8%1A%B6%7D2%89%CC%99ZlD%A9%BF%04b%CD%9C%D7%A4%DD%FDd%B88%DD%ED%05L%95C%60%C8%B8%08%3D_%A6%CEq%B8%F4%A8M%AA%F3A%83E%A5i%12%91%0Dv(y%BF%90Z%C7%9F%3A%B5%C8KC3%93%DE%18R%A8%E9%B3%99%1FS%FA%B1%A4%1A%0C%60)B%60%9A%40%26J%93l%94f%B4k)%DB%00%E9M%ED%95L%3B%B2%99%82B%ABr%07%ABn%A5%3AK%D9%04%0AkT%24%A3q%15q%ED%84%9F%18%DDZ%91%A5%D6%E8Mv%0BjW%0F%09%D2Q%F1%F5n%AE%94%92%0F%7D%C8T%F5%E9RA%0F%D5)w%8E%A9P%CF%EDH%B0%E1%B2I%A5%0E%7BU%E7%5C%AA8%B0%2B%DAF%EFz7O%A6%C6%B4_%03%A4%C5%DE%24%AF%10b%16%24%AB%94%A8%C9%F8%CA*-%FF%85%D4O%DDB%24i%15%B4%A1z%25%15jb%FB%D3%1C%9F%02%B1%CC%EA%0BH%0FC%DA%E6%D6%D3%CA%B3%88%B3QD3%D5%C9%D6%15Y%97%A4M%7F%8A%1D%13%FB%E8%26%18R%F1%C5%A9%A8%05%CA%1Cu%E4S%01%E9%91T%A6%02k%05%A1y%9A%BD%5D(%BB*E%9F-%93%15%AE%E0i6%A7Nu%CCM%0AT%15%10%95FG%E2%94%A2%B9D%C8%11%81%C9%F6s%D3Z%CF%DF%5CD%15%C4x%EBt%0D%1C0%81%7B%BB%3C%E2)8G%C1%FA%0F%18%7Dr%17h%99%B3%C1%BF)%A6%89n%13D%0A%3Avf%22%05%1D%0D%81%E5%CA%24%15JPT%99Kw%C'+
'0%D8N%DA%B1w%B6%10%E4%88%A9%B45%3AV%5D%B6%A7Yz1%A4%1C*W%0B%89%A5%AD%25%A3)%F8%A8T%A4%EE%95p%C7%3C~%8D%1Fe%E7%C7.%FE%B1\'D%E2%B0%D8%7CCX%A31%F4%5B%24%81r0K%23%BC%99%08oi%B0%93%D2%AC%B6%86%C5%3EM-%FD%B7%AD%EBNI%C4%0C%B9J%1D%D1%C6%CD%C9%A8k%B0%B4%12%DD%9EJv%8A%F1%E5%A1%C2%3CX%FC%FC%8BV%C5%CC%8Dp%F8%17%AD%98Rb%13T%1A-m%14%B8%D7%19%8D%D4%25%DCQ%20%9C%B5%05%AC%D0T%18rd%1A1%95\'%E6%12%3A32%88%9B%0D%D0b%16%B4%D8%8C%AC%86p%AE%CA%90Xw%EB%92%B8%08%D3%A7%2C%BC%2C%BE%40KU%AFX%F4%3B%85.%E1%FF%F4X%B2G%1FgA%9F%DCVN%EE%60%9E%B1%0C%ECK%C0%9A%0D%00M%FD%D8%04%23%E68O%F14U%81%04%A3B%CD%BA%B8(%F35X~%88%13%A5%DCYcqY%E5%B7%B9%DB%B3%D45\'C%16*w%B9%23%23%9Auk%84%DAUM%CA%AB%8A%A7*%A7x%CA%3F%88%A9%E3cC%E9%D6%7D%15*O%3E%24%12%B8%BE%86o%7Fq6h%0F%8Fx%E1%A4mi%89%FF%F3%C9%C1%B6%B8%5B%1D%C2%F1%8E%7B%FC%E3%20%0F%B9%C8GNr%8F%07%04%00%3B';
