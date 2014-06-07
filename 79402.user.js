// ==UserScript==
// @name           GBGEnhanced - dodatki do GBG pl
// @namespace      Gallendor Battlegrounds
// @description    dodatkowe funkcjonalnosci do GBG pl
// @include        http://bg*.gallendor.pl/*
// @include        http://pl*.gbg.my/*
// @author		   morri
// ==/UserScript==
scriptVersion=0.2;



//  - wyswietlania wartosci nagrody za potwory
//  - filtrowanie i zaznaczanie potworow spelniajacych okreslone kryteria
//  - wyswietlania przyblizonej drogi (bez uwzgledniania portali) do wiosek w profilu gracza
//  - filtr potworow w zakladce portal mysliwego
//  - statystyka walki
//  - filtrowanie tabel przez dwuklik w nagłówku w tabelkach z jednostkami i przedmiotami z ofiary w świątyni


function find(xpath,xpres) {
	var ret = document.evaluate(xpath,document,null,xpres,null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE,
    XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

function elem(tag,content) {
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}
var script = document.createElement('script');
script.innerHTML ="";

script.innerHTML +="function  qInfo1(xCoord, yCoord, uName, sName, cName, areaId, entfernung, isAttackable, zeit, mdef, monster)";
script.innerHTML +="{";
script.innerHTML +="	layerWrite('koord', xCoord + ':' + yCoord);";
script.innerHTML +="    layerWrite('user', uName);";
script.innerHTML +="    layerWrite('sname', sName);";
script.innerHTML +="    layerWrite('area', I18N.wordTable['AREANAME_' + String(areaId)]);";
script.innerHTML +='    cName = cName.replace("<", "&lt;");';
script.innerHTML +='    cName = cName.replace(">", "&gt;");';
script.innerHTML +="    layerWrite('clan', cName + '&nbsp;');";
script.innerHTML +="    layerWrite('entf', entfernung + ' Km');"; //odleglosc
script.innerHTML +="    if(isAttackable) {";
script.innerHTML +="      noobText = \"<span style=\'color: greenyellow; font-weight: bold;\'>\" + I18N.getSpecificString('YES') + \"</span>\";";
script.innerHTML +="    } else {";
script.innerHTML +="      noobText = \"<span style=\'color: tomato; font-weight: bold;\'>\" + I18N.getSpecificString('NO') + \"</span>\";";
script.innerHTML +="    }";
script.innerHTML +="    layerWrite('noob', noobText);";
script.innerHTML +="    layerWrite('zeit', zeit);";//czas
script.innerHTML +="    if(monster != 0) {";
//name of monsters for indexOf, nazwy potworów po których wyszukuje
script.innerHTML +=	"		potwory=new Array(\"ielone\",\"ezdomn\",\"uczni\",\"ochen\",\"amraki\",\"istrz\",\"zydercz\",\"osiarz\",\"odziejski\",\"martwiak\",\"aby\",\"wyrodnial\",\"Troll\",\"zerwon\",\"agiczne\",\"smok\",\"umy\",\"gniewn\",\"zikus\",\"omtash\",\"ampir\",\"demon\",\"odziejasz\",\"adowit\",\"ciwe\",\"strach\",\"ropniak\",\"askiniow\",\"ydren\",\"wykl\",\"miotacz\",\"Omen\",\"Apoka\",\"iewinne\",\"gnom\",\"rozbudzon\",\"rzadkie\",\"kaczki\",\"polityc\");";
script.innerHTML +=	"		var zloto=new Array (50,76,80,90,100,100,5,10,10,100,150,250,300,500,1000,1100,1900,1500,2200,2000,2600,1900,9000,7600,5000,9500,8000,2200,15100,2500,1500,3200,40000,5,10,10,100,200,1000);";
script.innerHTML +="		var nagroda=0;";
script.innerHTML +="		for(var i = 1, z = monster.length; i < z; i += 3) {;";
script.innerHTML +="			for (var j = 0;j<potwory.length;j++){;";
script.innerHTML +="				var kz=monster[i].indexOf(potwory[j]);";
script.innerHTML +="				if (kz>=0){";
script.innerHTML +="					nagroda+=zloto[j]*monster[i+1]";
script.innerHTML +="				};";
script.innerHTML +="			}";
script.innerHTML +="		}";
script.innerHTML +="      monstertext = '<table style=\"width: 190px; margin-top: 5px;\"><tr><td colspan=\"3\" style=\"text-align: left; font-weight: bold; padding-bottom: 5px;\">' + I18N.getSpecificString('MONSTERFIELD_TYPE_' + String(monster[0] % 10)) + (monster[0] >= 10 ? ' ' + I18N.getSpecificString('MONSTERFIELD_CHALLENGE') : '') + '['+nagroda+']'+'</td></tr>';";//tutaj dodane dane o nagrodzie/reward
script.innerHTML +="      var rows = 0;";
script.innerHTML +="      for(var i = 1, len = monster.length; i < len; i += 3) {";
script.innerHTML +="        monstertext += '<tr>';";
script.innerHTML +="        if(i == 1) {";
script.innerHTML +="          monstertext += '<td rowspan=\"' + ((len - 1) / 3) + '\" style=\"width: 40px; text-align: left; vertical-align: top;\"><img src=\"' + useGrafikpfad + '/icons/36x36/' + monsterTypeIcons[monster[0] % 10] + '.gif\" alt=\"\" />';";
script.innerHTML +="          if(monster[0] >= 10) monstertext += ' <img src=\"' + useGrafikpfad + '/icons/36x36/' + monsterTypeIcons[10] + '.gif\" alt=\"\" />';";
script.innerHTML +="          monstertext += '</td>';";
script.innerHTML +="        }";
script.innerHTML +="        monstertext += '<td class=\"tier' + String(monster[i + 2]) + '\" style=\"text-align: left;\">' + (monster[i + 2] > 0 ? '<img src=\"' + useGrafikpfad + '/icons/12x12/tier' + String(monster[i + 2]) + '.gif\" alt=\"\" /> ' : '') +monster[i] + ':</td><td style=\"text-align: left; width: 20px;\">' + monster[i + 1] + '</td></tr>';"; //tutaj okreslana jaka ilosc potworkow monster[i+1]  i co to za 
script.innerHTML +="        rows++;";
script.innerHTML +="      }";
script.innerHTML +="      while(rows++ < 5) monstertext += '<tr><td colspan=\"2\">&nbsp;</td></tr>';";
script.innerHTML +="      monstertext += '</table>';";
script.innerHTML +="    } else {";
script.innerHTML +="      if(mdef == 0) {";
script.innerHTML +="        monstertext = '<strong>' + I18N.getSpecificString('JS_NO_MONSTERS_ON_FIELD') + '</strong>';";
script.innerHTML +="      } else {";
script.innerHTML +="        monstertext = '<strong>' + I18N.getSpecificString('JS_MONSTER_DISPLAY_DEACTIVATED') + '</strong>';";
script.innerHTML +="      }";
script.innerHTML +="    }";
script.innerHTML +="    layerWrite('monster', monstertext);";
script.innerHTML +="  }";
  
document.getElementsByTagName('head')[0].appendChild(script);

function criteria(x) {
	r=x.match(/\([^\(]+\)/);
	ret=r[0].replace(/[\(\)]/g,"");
	return ret;
}

function value(x){
	var monsters_string=x.split(","); //wejsciowa tablica z potworkami przyklad "0,'Gobliny łucznicy',40,0,'Bezgłowne martwiaki',160,0"
	var potwory=new Array("ielone","ezdomn","uczni","ochen","amraki ","istrz","zydercz","osiarz","odziejski"," martwiak","askini","wyrodnial","Troll","zerwon","agiczne","smok","umy","gniewn","zikus","omtash","ampir","demon","odziejasz","adowit","ciwe","strach","ropniak","askiniow","ydren","wykl","miotacz","Omen","Apoka","iewinne","gnom","rozbudzon","rzadkie","kaczki","politycy");
	var zloto=new Array (50,76,80,90,100,100,5,10,10,100,150,250,300,500,1000,1100,1900,1500,2200,2000,2600,1900,9000,7600,5000,9500,8000,2200,15100,2500,1500,3200,40000,5,10,10,100,200,1000); //33 long
	var czy_potwory=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); // 39 puste, zera
		/*
0	Zielone gobliny 
1	Bezdomni Wybrańcy 
2	Gobliny łucznicy
3	Zaczarowane Bochenki 
4	Mamraki 
5	Mistrz Wader 
6	szydercze dynie
7	Kosiarze 
8	złodziejskie gobliny 
9	Bezgłowe martwiaki 
10	żaby Jaskini Echo 
11	Zgniłe Zwyrodnialce 
12	Trolle 
13	Czerwone Gobliny 
14	Magiczne łańcuchy 
15	Młode smoki
16	pająki dżumy 
17	gniewna śliniacz 
18	śmierdzące Dzikusy
19	Homtash
20	Wampiry 
21	płonące demony
22	Złodziejaszki
23	Jadowite koty
24	mściwe orlsy 
25	Latające strachy
26	Pożeracze ropniaków 
27	Jaskiniowi lizusi
28	Hydren 
29	wyklęci kapłani
30	miotacze skał 
31	Zły Omen 
32	Jeźdźcy Apokalipsy 
33
34
35
36
37
38
*/
		var nagroda=0;
		var ilosc_potworow=0;
		for(var i = 1,z = monsters_string.length; i < z; i += 3) { //monsters srings
			for (var j = 0;j<potwory.length;j++){
				var kz=monsters_string[i].indexOf(potwory[j]); //jesli sie zgadza - j jest indeksem w tablicy potwory
				if (kz>=0){
					nagroda+=zloto[j]*monsters_string[i+1];
					czy_potwory[j]=1;
					ilosc_potworow += parseInt(monsters_string[i+1]);
				}
			}
		}
		var wynik=new Array(nagroda,czy_potwory,ilosc_potworow);//
return wynik;
}

//zalozenai idealne, nie uwzglednia portalu
function czasPrzemarszu(polozenie1,polozenie2){ //(x1:y1),(x2:y2)
	var x_y=(polozenie1.match(/\d+:\d+/)+"").split(':'); //string
	var x_y2=(polozenie2.match(/\d+:\d+/)+"").split(':');
	var odl=Math.sqrt((x_y2[0]-x_y[0])*(x_y2[0]-x_y[0])+(x_y2[1]-x_y[1])*(x_y2[1]-x_y[1]));
	var sek = 300*odl,min = 0,godz = 0,czas="";
	min = Math.floor(sek / 60); 
	sek = Math.floor(sek % 60);
	godz = Math.floor(min / 60);
	min = min % 60;
	if(sek < 10) sek = '0' + sek;
	if(min < 10) min = '0' + min;
	czas = godz + ':' + min + ':' + sek;
	return czas;
}
function jakdaleko(){
	if (location.search.indexOf("location=profil") > -1 || location.search.indexOf("location=einheiten") > -1) {
		var targets=find("//a[contains(@href,'x=')]",XPList);
		var vil1=find("//div//a[@id='chSettle2']",XPFirst).textContent;
		for (var i = 0; i < targets.snapshotLength; i++) {
			targets.snapshotItem(i).textContent += "["+czasPrzemarszu(vil1,targets.snapshotItem(i).textContent)+"]";
		}
	}
}

//zaznacz na czerwono wioski do zaatakowania
function markAttackable(arg){
	var isAttackable=arg.split(",");
 if(isAttackable[7]==1 & isAttackable[3]!="'-'") {return true;}
 else return false;
}
function addElements(){
	 // tylko na portalu myśliwych
		var tb = find("//div[@id='dl4MainContent']//table/tbody",XPFirst);
		var arr =new Array(0,10000000,new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)); 
		if(getValues()!=undefined & getValues().length > 2 ) arr=getValues();
		
		var minNagroda = elem('input','');
		minNagroda.setAttribute('id','minN');
		minNagroda.setAttribute('maxlength','8');
		minNagroda.setAttribute('size','8');
		minNagroda.setAttribute('type','text');
		arr[0] ? minNagroda.setAttribute('value',arr[0]) : minNagroda.setAttribute('value',0);;
		var maxNagroda = elem('input','');
		maxNagroda.setAttribute('id','maxN');
		maxNagroda.setAttribute('maxlength','8');
		maxNagroda.setAttribute('size','8');
		maxNagroda.setAttribute('type','text');
		arr[1] ? maxNagroda.setAttribute('value',arr[1]) : maxNagroda.setAttribute('value',10000000);
		var txtNode = document.createTextNode("Zaznacz na minimapie potwory za które nagroda wynosi minimum: ");
		var tr=document.createElement('tr');
		var td=document.createElement('td');
		td.setAttribute('colspan','8');
		td.setAttribute('align','right');
		td.appendChild(txtNode);
		td.appendChild(minNagroda);
		txtNode = document.createTextNode(" maksimum: ");
		td.appendChild(txtNode);
		td.appendChild(maxNagroda);
		txtNode = document.createTextNode(" ");
		td.appendChild(txtNode);
		var button1 = elem('button', 'zapisz');
		button1.setAttribute('id','buttonS');
		td.appendChild(button1);
		var button2 = elem('button', 'wyzeruj');
		button2.setAttribute('id','buttonC');
		td.appendChild(button2);
		tr.appendChild(td);
		tb.insertBefore(tr,tb.childNodes[2]);

		//checkboxy
		var checkbox=document.createElement('input');
		checkbox.setAttribute('type','checkbox');
		td=document.createElement('td');
		for(var i=4;i < tb.rows.length+1;i++){
			checkbox=document.createElement('input');
			checkbox.setAttribute('type','checkbox');
			if(arr[2][i-4]==1)checkbox.setAttribute('checked','checked');
			var id='id'+(i-4);
			checkbox.setAttribute('id',id);
			td=document.createElement('td');
			td.appendChild(checkbox);
			tb.childNodes[i].appendChild(td);

		}
//dodanie listenera do buttonow
		button1.addEventListener('click', function ( e ) {
			var min=find("//input[@id='minN']",XPFirst).value;
			var max=find("//input[@id='maxN']",XPFirst).value;
			var checks=find("//input[@type='checkbox']",XPList); //wszystkie checkboxy
			var checked=new Array();
			for(var i=0;i<checks.snapshotLength;i++){
				if(checks.snapshotItem(i).checked==true) checked[i]=1;
				else checked[i]=0;
			}
			var arr=new Array();
			arr[0]=min;
			arr[1]=max;
			arr[2]=checked;
			saveValues(arr);

		}, false);
		button2.addEventListener('click', function ( e ) {
			var arr=new Array();
			arr=clearValues();
		}, false);	
}

function clearValues(){
	find("//input[@id='minN']",XPFirst).value=0;
	find("//input[@id='maxN']",XPFirst).value=10000000;
	var checks=find("//input[@type='checkbox']",XPList);
	for(var i=0;i<checks.snapshotLength;i++) checks.snapshotItem(i).checked=true;
	
}
function saveValues(arr){
	var srv=location.hostname;
	GM_setValue(srv, uneval(arr));
}

function getValues(){
	var srv=location.hostname;
	var arr = eval(GM_getValue(srv, '[]'));
	return arr;
}

function compare(a,b){
	//a - array z potworkami na polu - val[1], b - array z filtrowanymi potworami arr[2]
	var wynik=true;
	if(b) for ( var i=0;i < a.length; i++) if (a[i]==1 & b[i]==0) wynik=false;
	return wynik;
}

function TSorter(){
	var table = Object;
	var trs = Array;
	var ths = Array;
	var curSortCol = Object;
	var prevSortCol = '3';
	var sortType = Object;

	function get(){}

	function getCell(index){
		return trs[index].cells[curSortCol]; 
	}

	this.init = function(tableName,isS){
		isSummary=isS;
		table = tableName;
		ths = table.getElementsByTagName("th");
		for(var i = 0; i < ths.length ; i++)
		{
			ths[i].addEventListener("click",function(){sort(this);},false);
		}
		return true;
	};
	
	function sort(oTH){
	
		curSortCol = oTH.cellIndex;
		trs=table.rows;
		setGet("number");
		try{
			//var a=getCell(2).textContent.match(/[()\-\.0-9]+/g);
			//var b=parseInt(a[0].replace(/[\.()]/g,"")); //ostatni element
			//setGet("number");
			//alert("A="+a+"\n"+"b="+b);
		}
		catch (e){;}
		if(prevSortCol == curSortCol){
			oTH.className = (oTH.className != 'ascend' ? 'ascend' : 'descend' );
			reverseTable();
		}
		else{
			oTH.className = 'ascend';
			ths[prevSortCol].className = '';
			quicksort(2, trs.length-isSummary); 
			//quicksort(2, trs.length-2); 
			prevSortCol = curSortCol;
		}
		
	}
	
	function setGet(sortType){
		switch(sortType){   
			case "image_number":
				get = function(index){	
					return getCell(index).childNodes[1].nodeValue;
				}
				break;
			case "link":
				get = function(index){
					return  getCell(index).firstChild.firstChild.nodeValue;
				};
				break;
			case "input_text":
				get = function(index){	
					//return getCell(index).firstChild.value;
					return getCell(index).textContent;
				};
				break;
			case "number":
				
				get = function(index){
					var a=getCell(index).textContent.split('/')[0].match(/[()\.\-0-9]+/g);
					//var a=getCell(index).textContent.match(/[()\.\-0-9]+/g);
					//var b=parseInt(a[a.length-1]); //ostatni element
					return parseInt(a[a.length-1].replace(/[()\.]/g,""), 10);
				}
				break;
			default:
				get = function(index){	
					return parseInt(getCell(index).textContent.replace(/\./g,""), 10);
				}
				var r=parseInt(getCell(1).textContent.replace(/\./g,""), 10);
				break;
		};	
	}
	
	function exchange(i, j){
		if(i == j+1) {
			table.tBodies[0].insertBefore(trs[i], trs[j]);
		} else if(j == i+1) {
			table.tBodies[0].insertBefore(trs[j], trs[i]);
		} else {
			var tmpNode = table.tBodies[0].replaceChild(trs[i], trs[j]);
			if(typeof(trs[i]) == "undefined") {
				table.appendChild(tmpNode);
			} else { 
				table.tBodies[0].insertBefore(tmpNode, trs[i]);
			}
		}
	}
	
	function reverseTable(){
	
		for(var i = 0; i<trs.length; i++)
		{
			table.tBodies[0].insertBefore(trs[i], trs[1]);
		}
	}
	
	function quicksort(lo, hi){
		if(hi <= lo+1) return;
		 
		if((hi - lo) == 2) {
			if(get(hi-1) > get(lo)) exchange(hi-1, lo);
			return;
		}
		
		var i = lo + 1;
		var j = hi - 1;
		
		if(get(lo) > get(i)) exchange(i, lo);
		if(get(j) > get(lo)) exchange(lo, j);
		if(get(lo) > get(i)) exchange(i, lo);
		
		var pivot = get(lo);
		
		while(true) {
			j--;
			while(pivot > get(j)) j--;
			i++;
			while(get(i) > pivot) i++;
			if(j <= i) break;
			exchange(i, j);
		}
		exchange(lo, j);
		
		if((j-lo) < (hi-j)) {
			quicksort(lo, j);
			quicksort(j+1, hi);
		} else {
			quicksort(j+1, hi);
			quicksort(lo, j);
		}
	}
}

function tbsort(a) {
	try{
		var x1=find("//table",XPList); 
		var ts= new Array();
		for (var i = 0; i < x1.snapshotLength; i++){
			ts[i]=new TSorter;
			ts[i].init(x1.snapshotItem(i),a);
		}
	}
	catch(e){//alert(e);
	;}
}


function pokaz_obrazenia(){
	var x=find("//div[@class='dl4KBMain']/div[@class='dl4KBLine']",XPList);
	////a[contains(@href,'x=')]
	var agr=find("//div[@class='dl4KBMain']//div[@class='dl4KBLine']/span[starts-with(@class,'a') or starts-with(@class,'d')]",XPList);
	//	var agr=find("//div[@class='dl4KBMain']//div[@class='dl4KBLine']/span[@class='a1 aggressor' or @class='d1' or @class='d2' or @class='d3' or @class='d1 settler' or @class='a3' or @class='a2']",XPList);
	var wynik=[];
	var wyniki=[];
	function wiersz(nazwa1,nazwa2,obrmax,obrmin,obrsr,obrtotal){
		this.nazwa1=nazwa1;
		this.nazwa2=nazwa2;
		this.obrmax=parseInt(obrmax);
		this.obrmin=parseInt(obrmin);
		this.obrsr=parseFloat(obrsr);
		this.obrtotal=parseInt(obrtotal);
	}
	
	for(var i=0,j=0;i<agr.snapshotLength;i=i+2,j++){
		try{
		var obrazenia= x.snapshotItem(j).nextSibling.nextSibling.nodeValue.match(/\d+/);
		var agrKlasa=agr.snapshotItem(i).getAttribute("class").substring(0,2);
		var obrKlasa=agr.snapshotItem(i+1).getAttribute("class").substring(0,2);
		var agresor= agr.snapshotItem(i).textContent;
		
		
		var obronca= agr.snapshotItem(i+1).textContent;
		}
		catch(e){;
		}
		var name='('+agrKlasa+')'+agresor+'/'+'('+obrKlasa+')'+obronca;
		if(wynik[name])
			wynik[name].push(obrazenia);
		else
			wynik[name]=new Array(obrazenia);
		
	}
	//var str="<table></tr><th>nazwa atakujacego</th><th>nazwa broniącego</th><th>obr. max</th><th>obr. min</th><th>obr. srednie</th><th>obr. calkowite</th> "; 
	var str='';
	for(prop in wynik){
		var a=prop.split('/');
		wyniki[wyniki.length]= new wiersz(a[0],a[1],Array.max(wynik[prop]),Array.min(wynik[prop]),Array.avg(wynik[prop]),Array.sum(wynik[prop]));

	}
	wyniki.sort(function ab(a,b){return(b.obrtotal-a.obrtotal)});
	var ozA=0,ooA=0,ozD=0,ooD=0;
	for(var w in wyniki) {
		var v = wyniki[w];
		str+="<tr><td>"+v.nazwa1+"</td><td>"+v.nazwa2+"</td><td>" +v.obrmax+"</td><td>" + v.obrmin +"</td><td>"+v.obrsr+ "</td><td>"+v.obrtotal+"</td></tr>";
		if(v.nazwa1.indexOf('d')==1)ozD+=v.obrtotal;
		if(v.nazwa1.indexOf('a')==1)ozA+=v.obrtotal;
		if(v.nazwa2.indexOf('d')==1)ooD+=v.obrtotal;
		if(v.nazwa2.indexOf('a')==1)ooA+=v.obrtotal;
	}

	var w;
	w = window.open("","","status,height=200,width=300,scrollbars=1,resizable=1,");
	var newContent = "<HTML><HEAD><TITLE>Statystyka</TITLE></HEAD>";
    newContent += "<BODY><H1>Statystyka walki.</H1><p>Calkowite obrazenie:<br /> zadane:Agresor="+ozA+",Obronca="+ozD+"<br />otrzymane:Agresor"+ooA+",Obronca="+ooD+"<table border='5'><tr><th>nazwa atakujacego</th><th>nazwa broniącego</th><th>obr. max</th><th>obr. min</th><th>obr. srednie</th><th>obr. calkowite</th></tr>";
	newContent +=str;
    newContent += "</table></BODY></HTML>";
	w.document.write(newContent);
	w.document.close();

	
	//alert(str+"\n obrazenia zadane"+obrazenia);
}

function statystka_walki(){
	var x=find("//div[@class='dl4KBTitle dl4heading']",XPFirst);
	var button = elem('button', 'statystyka');
	x.appendChild(button);
	button.addEventListener('click', function ( e ) {pokaz_obrazenia()	
		}, false);
}




Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

Array.avg = function(array) {
	var av = 0;
	var cnt = 0;
	var len = array.length;
		for (var i = 0; i < len; i++) {
		var e = +array[i];
		if(!e && array[i] !== 0 && array[i] !== '0') e--;
		if (array[i] == e) {av += e; cnt++;}
		}
	return Math.round(10*av/cnt)/10;
}

Array.sum = function(array) {
  return (! array.length) ? 0 : Array.sum(array.slice(1)) + parseInt(array[0]);
}

function igmSelect(){
	var tb=find("//form[@name='igm_list']//table",XPFirst);
	try{
	for (var i=1;i<tb.rows.length;i++){
		if(tb.rows[i].cells.length > 3)
		tb.rows[i].cells[3].addEventListener('dblclick', function(e){
			 var text=this.parentNode.textContent.match(/\w+/)+"";
			 var tb1=find("//form[@name='igm_list']//table",XPFirst);
			 for (var i=1;i<tb1.rows.length;i++){
			 	 var tmp=tb1.rows[i].textContent.match(/\w+/)+"";
			 	 if(tb1.rows[i].textContent.match(/\w+/)==text){
			 	 	 	 if(tmp=="Polowanie"){
			 	 	 	 	 tb1.rows[i].firstChild.firstChild.checked=true;
			 	 	 	 	 var wartosc=tb1.rows[i].textContent.match(/\d{3,4}\.\d{3}/)+"";
			 	 	 	 	 wartosc=wartosc.replace(".","");
			 	 	 	 	 wartosc=parseInt(wartosc);
			 	 	 	 	 if(wartosc > 800000)
			 	 	 	 	 	 tb1.rows[i].firstChild.firstChild.checked=false;
			 	 	 	 	 }
			 	 	 	 else
			 	 	 	 	 tb1.rows[i].firstChild.firstChild.checked=true;
			 	 	 }
			 	 }
			},false);
	}
	}
	catch(e){};
}

window.addEventListener( 'load', function( e ) {
	jakdaleko();
	if(location.search.indexOf("heal")>-1) tbsort(1);
        if (location.search.indexOf("location=igm") > -1)igmSelect();
	if (location.search.indexOf("hunters") > -1)addElements();
	if (location.search.indexOf("&action=changeunits") > -1 || location.search.indexOf("=tempel&itemlis")>-1 || location.search.indexOf("ausbilden")>-1 || location.search.indexOf("unitchange")>-1 ) tbsort(0);
	if (location.search.indexOf("&fullkb=true") > -1) statystka_walki();
	var x1=find("//div[@onmouseover]/img",XPList); 
	var img,thisLink,c,val,t,mark;
	var arr=getValues();
	for (var i = 0; i < x1.snapshotLength; i++) {
		img = x1.snapshotItem(i);
		thisLink=img.parentNode;
		t=thisLink.getAttribute('onmouseover');
		mark=markAttackable(t);
		c =criteria(t);
		val=value(c);
		t=t.replace("qInfo","qInfo1");
		thisLink.setAttribute("onmouseover","");
		thisLink.setAttribute("onmouseover",t);
		if (val[0]>arr[0]  & val[0]<arr[1] & compare(val[1],arr[2])) //val[1][10] == 1)//& & val[2][10]>300
			img.setAttribute("src","http://pl3.gbg.my/images/pl/gbg/grafikpack-full/icons/12x12/tier1.gif");
			//http://pl3.gbg.my/images/pl/gbg/grafikpack-full/icons/12x12/tier1.gif
		if(mark==true) {
			if(img.getAttribute("src").indexOf('vacation.png')<0) 
			img.setAttribute("src","http://static.gallendor.com/bg/images/pl/grafikpack-full/map/area_legend_war.gif");
		}
	}
},false)