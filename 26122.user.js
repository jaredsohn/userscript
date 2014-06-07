// ==UserScript==
// @name           Travian: Hero Status
// @version        0.0.2
// @autor          minbas
// @email          m5roy@confecti.ro
// @description    Hero Status v0.0.27 is a combined script. the script aded a aditional info on the Hero page and the buildings on the building page.
// @namespace      Travian
// @include        http://*.travian*
// @exclude        http://forum.travian*
// @exclude        http://www.travian*
// ==/UserScript==

var ScriptName='Travian: Hero Status';
var ScriptAutor='minbas';
var ScriptVersion='0.0.2';
var ScriptLink='';

var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch (lang) {
	case '.ae':
		langfile = ['??????', '??????', '?????'];
		break;
	case '.cn':
		langfile = ['??', '??', '??'];
		break;
	case '.com.br':
	case '.pt':
		langfile = ['Atual', 'Proximo', 'Necessario'];
		break;
	case '.de':
		langfile = ['Strom', 'Nächstes', 'Bedürfnis'];
		break;
	case '.bg':
		langfile = ['???????', '???????', '?????'];
		break;
	case '.com.tr':
		langfile = ['Simdiki', 'Sonraki', 'Gereken'];
		break;
	case '.fr':
		langfile = ['Courant', 'Suivant', 'Besoin'];
		break;
	case '.hu':
		langfile = ['Jelenlegi', 'Szintlépés', 'Kell még'];
		break;
	case '.nl':
		langfile = ['Huidig', 'Volgend', 'Nodig'];
		break;
	case '.no':
		langfile = ['Akkurat nå', 'Neste', 'Behøver'];
		break;
	case '.ro':
		langfile = ['Curent', 'Urmator', 'Necesar'];
		break;
	case '.ru':
		langfile = ['??????', '?????????', '?????'];
		break;
	case ".pl":
		langfile = ['Aktualne', 'Wymagane', 'Brakuje'];
		break;
	case '.se':
		langfile = ['Just nu', 'Nästa', 'Behöver'];
		break;
	case '.sk':
		langfile = ['Máš', 'Další', 'Potrebuješ'];
		break;
	case ".hk":
	case '.tw':
		langfile = ['??', '??', '??'];
		break;
	default:
		langfile = ['Current', 'Next', 'Need'];
	}

var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}

function main(){

//document.write('<div id="lmid1"><div id="lmid2"><h1><b>Reºedinþa eroului Nivel 3</b></h1><p class="f10">In reºedinþa eroului poti instrui un erou ºi începand cu nivelul 10 poþi anexa campuri de resurse (oaze) din vecinatatea satului tau.</p><p><table cellspacing="1" cellpadding="2" class="tbg"><tr class="rbg"><td colspan="5"><a href="build.php?id=33&rename"><span class="c0">minbas</span></a> Nivel 32 <span class="t">(Scutier)</span></td></tr><tr><td class="s7">Atac:</td><td width="75" class="s7">880</td><td class="s7" width="205"><img src="img/un/a/c3.gif" width="47" height="10" border="0" alt=""></td><td>(<a href="build.php?id=33&lvl=1&a=1">+</a>)</td>><td width="25">23</td></tr><tr><td class="s7">Aparare:</td><td class="s7">5310/6230</td><td class="s7"><img src="img/un/a/c3.gif" width="199" height="10" border="0" alt=""></td><td>(<a href="build.php?id=33&lvl=2&a=1">+</a>)</td><td>99</td></tr><tr><td class="s7">Bonus atac:</td><td class="s7">2%</td><td class="s7"><img src="img/un/a/c3.gif" width="21" height="10" border="0" alt=""></td><td><span class="c">(<b>+</b>)</span></td><td>10</td></tr><tr><td class="s7">Bonus aparare:</td><td class="s7">4%</td><td class="s7"><img src="img/un/a/c3.gif" width="41" height="10" border="0" alt=""></td><td><span class="c">(<b>+</b>)</span></td><td>20</td></tr><tr><td class="s7">Regenerare:</td><td class="s7">195/Zi</td><td class="s7"><img src="img/un/a/c3.gif" width="27" height="10" border="0" alt=""></td><td><span class="c">(<b>+</b>)</span></td><td>13</td></tr><tr class="s7"><td colspan="5"></td></tr><tr><td class="s7" title="la urmatorul nivel">Experienta:</td><td class="s7">67%</td><td class="s7"><img src="img/un/a/c3.gif" width="134" height="10" border="0" alt=""></td><td></td><td><span class="c3 b">1000</span></td></tr></table></div></div>');

//document.write('<table cellspacing="1" cellpadding="2" class="tbg"><tr class="rbg"><td colspan="5">'

// building image
	nume = new Array(40);
	nume[5] = 'Fabrica de cherestea'
	nume[6] = 'Fabrica de caramida'
	nume[7] = 'Topitorie'
	nume[8] = 'Moara'
	nume[9] = 'Brutarie'
	nume[10] = 'Hambar'
	nume[11] = 'Granar'
	nume[12] = 'Fierarie'
	nume[13] = 'Armurerie'
	nume[14] = 'Arena'
	nume[15] = 'Primarie'
	nume[16] = 'Adunare'
	nume[17] = 'Targ'
	nume[18] = 'Ambasada'
	nume[19] = 'Cazarma'
	nume[20] = 'Grajd'
	nume[21] = 'Atelier'
	nume[22] = 'Academie'
	nume[23] = 'Beci'
	nume[24] = 'Casa de cultura'
	nume[25] = 'Vila'
	nume[26] = 'Palat'
	nume[27] = 'Trezorerie'
	nume[28] = 'Oficiu de comert'
	nume[29] = 'Cazarma extinsa'
	nume[30] = 'Grajd extins'
	nume[34] = 'Arhitect'
	nume[35] = 'Berarie'
	nume[36] = 'Temnita'
	nume[37] = 'Resedinta eroului'
	nume[38] = 'Hambar Extins'
	nume[39] = 'Granar extins'
	nume[40] = 'Minunea lumii'

	var x=document.getElementsByTagName('a');
	for (var i=0;i<x.length;i++){
		var atr=x[i].getAttribute("href");
		var build=atr.indexOf('a=');
		var tippag=atr.indexOf('&id=');
		if (tippag>0)
		{
			if (build>0){
				var imaB=atr.substring(build+2,14);
				var numele = nume[imaB];
				imagBuilding=document.createElement('div');
				imagBuilding.innerHTML='<img src="http://speed.travian.ro/img/un/g/g'+imaB+'.gif" alt="Cladire" title='+numele+' />';
				x[i].appendChild(imagBuilding);		 
			}
		}
	}

	transformPageHeroMansion_addHeroLevelInfo();

	var ntable=-1;
	var taverna=find('//table[@class="tbg"]/tbody',XPList);
	for(var i=0;i<taverna.snapshotLength;i++){
		ttd=taverna.snapshotItem(i).getElementsByTagName("td");
		if(ttd[4]==undefined)return;
		if(ttd[4].textContent=='(+)'){
			ntable=i;
			i=1000;
		}
	for(var i=0;i<taverna.snapshotLength;i++){
		ttr=taverna.snapshotItem(i).getElementsByTagName("tr");
		}
	}

	if(ntable!=-1){
		ttd=taverna.snapshotItem(ntable).getElementsByTagName("td");
		level=parseInt(ttd[0].textContent.match(/\s(\d+)\s\(/).pop());
		percent=parseInt(ttd[28].textContent.match(/(\d+)\%/).pop());
		punctdisp=parseInt(ttd[31].textContent);
		an=100*(level);
		an1=100*(level+1)
		sn=0.5*an*(level+1);
		sn1=0.5*an1*(level+2);
		unitpercent=an1*percent/100;
		kills=sn+unitpercent;
		nextkills=sn1-kills;

////////////////////////////////////////////////////////////////////////////////////////////
/*proceseaza datele si le pregateste pentru inserare in ceace priveste atributiile eroului*/
////////////////////////////////////////////////////////////////////////////////////////////

		elem=document.createElement('div');
		elem.innerHTML=langfile[0]+'='+kills+'<br>'+langfile[1]+'='+sn1+'<br>'+langfile[2]+'='+nextkills;

///////////////////////////////////////////////////////////////////////////////////////////
/*introducere de date cu privire la numarul de puncte de experienta ce pot fi distribuite*/
///////////////////////////////////////////////////////////////////////////////////////////

		pd = document.createElement('div');
		pd.innerHTML ='<td><span class="c3 b">100</span></td>';

		newMenu1 = document.createElement('div');
		newMenu1.innerHTML ='<a href="dorf3.php">Perspectiva</a>';
		newMenu2 = document.createElement('div');
		newMenu2.innerHTML ='<a href="dorf3.php?s=2">Resurse</a>';
		newMenu3 = document.createElement('div');
		newMenu3.innerHTML ='<a href="dorf3.php?s=3">Hambar</a>';
		newMenu4 = document.createElement('div');
		newMenu4.innerHTML ='<a href="dorf3.php?s=4">Puncte de cultura</a>';
		newMenu5 = document.createElement('div');
		newMenu5.innerHTML ='<a href="dorf3.php?s=5">Trupe</a>';

		sat1 = document.createElement('div')
//		sat2.innerHTML = '<a href="dorf1.php?newdid=160183">Sullust</a></br><a href="dorf1.php?newdid=85672">Kashyyyk</a></br><a href="dorf1.php?newdid=151983">Natari</a>'	

// 		sat1.innerHTML = document.URL;
		
		sat1.innerHTML = '<img src="http://speed.travian.ro/img/un/g/g37.gif" alt="Resedinta erou" />';

/////////////////////////////////////////////////////////////
/*activarea butoanelor + pentru cele 5 atribute ale eroului*/
/////////////////////////////////////////////////////////////

		level1= document.createElement('div')
		level1a= document.createElement('div')
		level2= document.createElement('div')
		level3= document.createElement('div')
		level4= document.createElement('div')
		level5= document.createElement('div')
		level1.innerHTML='<td>(<a href="build.php?id=33&lvl=1&a=1">+</a>)</td><br><td>(<a href="build.php?id=33&lvl=1&a=-1">-</a>)</td>'
		level1a.innerHTML='<td>(<a href="build.php?id=33&lvl=1&a=1">-</a>)</td>'
		level2.innerHTML='<td>(<a href="build.php?id=33&lvl=2&a=1">+</a>)</td>'
		level3.innerHTML='<td>(<a href="build.php?id=33&lvl=3&a=1">+</a>)</td>'
		level4.innerHTML='<td>(<a href="build.php?id=33&lvl=4&a=1">+</a>)</td>'
		level5.innerHTML='<td>(<a href="build.php?id=33&lvl=5&a=1">+</a>)</td>'

//////////////////////////////////////////
/*scrierea in pagina a datelor realizate*/
//////////////////////////////////////////

		ttd[27].appendChild(elem);
//		ttd[30].appendChild(pd);
		ttd[4].appendChild(level1);
		ttd[9].appendChild(level2);
		ttd[14].appendChild(level3);
		ttd[19].appendChild(level4);
		ttd[24].appendChild(level5);
		ttd[0].appendChild(sat1);
//		ttd[31].write('<td><span class="c3 b">100</span></td>');
	}
}

/* transformPageHeroMansion_addHeroLevelInfo */

function transformPageHeroMansion_addHeroLevelInfo() {

// retrieve local information
	var heroTable = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]/../../../..').snapshotItem(0);
	var heroTableRows = heroTable.rows;
	var heroLevel = parseInt(/\d+/.exec(heroTableRows[0].cells[0].textContent));
	var heroLevelPercent = parseInt(/\d+/.exec(heroTableRows[heroTableRows.length - 1].cells[1].textContent));
	var thisLevelExp = (heroLevel + 1) * 100;
	var currLevelExp = ((thisLevelExp) / 2) * heroLevel;
	var nextLevelExp = currLevelExp + thisLevelExp;
	var expGainedInThisLevel = (heroLevel+1) * heroLevelPercent;
	var expToLevelUp = (heroLevel+1) * (100 - heroLevelPercent);
	var levelTxt = heroTableRows[0].cells[0].childNodes[1].textContent;

	levelTxt = levelTxt.substr(0, levelTxt.indexOf(1, " "));

// create extra info on the page
	var separatorRow = createElemAppendAndSetInner('tr', heroTable, '<td colspan="0" />');
	var extendedHeroRow = createElementAppend('tr', heroTable);
	var extendedHeroCell = createElementAppend('td', extendedHeroRow);

	extendedHeroCell.colSpan = 0;

	var extendedHeroTable = createElementAppend('table', extendedHeroCell);

	extendedHeroTable.style.width = "100%";
	extendedHeroTable.className = "tbg";
	extendedHeroTable.border = 0;
	extendedHeroTable.cellSpacing = 1;

	var row1 = createElementAppend('tr', extendedHeroTable);
	var r1c1 = createElemAppendAndSetInner('td', row1, levelTxt + " " + heroLevel);
	var r1c2 = createElemAppendAndSetInner('td', row1, heroLevelPercent + "%");
	var r1c3 = createElemAppendAndSetInner('td', row1, (100 - heroLevelPercent) + "%");
	var r1c4 = createElemAppendAndSetInner('td', row1, levelTxt + " " + (heroLevel + 1));
	var row2 = createElementAppend('tr', extendedHeroTable);
	var r2c1 = createElementAppend('td', row2);		r2c1.width = "20%";
	var r2c2 = createElementAppend('td', row2);		r2c2.colSpan = 2;

	createHorizontalGraphicBar(r2c2, 8, heroLevelPercent, "green", "yellow");

	var r2c3 = createElementAppend('td', row2);		r2c3.width = "20%";
	var row3 = createElementAppend('tr', extendedHeroTable);
	var r3c1 = createElemAppendAndSetInner('td', row3, currLevelExp);
	var r3c2 = createElemAppendAndSetInner('td', row3, expGainedInThisLevel);
	var r3c3 = createElemAppendAndSetInner('td', row3, expToLevelUp);
	var r3c4 = createElemAppendAndSetInner('td', row3, nextLevelExp);

	r3c2.title = "" + currLevelExp + " + " + expGainedInThisLevel + " = " + (currLevelExp+expGainedInThisLevel);
}



/**
* createHorizontalGraphicBar
* @param {HTMLNode} parentNode Node that will be the parent of the table that has the bar.
* @param {int} tableHeight Height of the table in pixels.
* @param {int} percent Percentage that the bar must represent.
* @param {HTMLColor} barColor Background color of the bar.
* @param {HTMLColor} complementColor Background color of the rest of the bar.
*/
function createHorizontalGraphicBar(parentNode, tableHeight, percent, barColor, complementColor) {

	var table = document.createElement('table');
	var row = createElementAppend('tr', table);
	var cell1 = createElementAppend('td', row);
	var cell2 = createElementAppend('td', row);

	table.cellSpacing = 0;
	table.border = 0;
	table.style.height = tableHeight + "px";
	table.style.width = "100%";

	cell1.style.width = percent + "%";
	cell2.style.width = (100 - percent) + "%";
	cell1.style.backgroundColor = barColor;
	cell2.style.backgroundColor = complementColor;

	parentNode.appendChild(table);
}

/** Is the page of Hero's Mansion */
function isThisPageHeroMansionPage() {
	if (isThisPageAnyBuildingPage()) {
		var heroNameSpan = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]');
		return (heroNameSpan.snapshotLength == 1);
	}
	return false;
}

function createElementAppend(newElementTag, parentElement) {
	var newElement = document.createElement(newElementTag);
	parentElement.appendChild(newElement);
	return newElement;
}

function createElemAppendAndSetInner(newElementTag, parentElement, innerHTM) {
	var newElement = createElementAppend(newElementTag, parentElement);
	newElement.innerHTML = innerHTM;
	return newElement;
}

/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {Node} context Node from where to search.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

main();

GM_registerMenuCommand(ScriptName +' v' + ScriptVersion, function(){ alert('Your version ' + ScriptName + ' is v' + ScriptVersion)});