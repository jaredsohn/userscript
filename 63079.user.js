// ==UserScript==
// @name          DS aus Berichten farmen
// @include       http://de*.die-staemme.de/game.php?*screen=report*view=*
// @include       http://de*.die-staemme.de/game.php?*view=*screen=report*
// @include       http://de*.die-staemme.de/game.php?*screen=place*
// @include       http://de*.die-staemme.de/game.php?*try=confirm*
// @include       http://*.staemme.*/game.php?*screen=report*view=*
// @include       http://*.staemme.*/game.php?*view=*screen=report*
// @include       http://*.staemme.*/game.php?*screen=place*
// @include       http://*.staemme.*/game.php?*try=confirm*
// ==/UserScript==

// ds.spying2Form.user.js

// {$ dsScript $}
// version = 3.0
// authors = (c) C1B1SE, pinjam
// clients =  opera,firefox
// areas = .de
// worlds = only:xy-coords
// premium = works
// description[de] = Rechnet in Berichten aus wie viele Einheiten zum Leerfarmen des gesamten Speichers benötigt werden
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.spying2Form_0.png
// {$ /dsScript $}


// PA-Check:
if(document.getElementsByClassName("menu nowrap quickbar")[0])
{

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Standardeinheit:
var show = 'light';
var show2 = 'nospy';
var show3 = 'same';
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// einheit: spear/sword/axe/archer/light/marcher/heavy | späher: spy/nospy/threespy | dorf: aktuell/same
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

var units = eval({
  'spear':[25,'graphic/unit/unit_spear.png','Speertr'+unescape('%E4')+'ger',18],
  'sword':[15,'graphic/unit/unit_sword.png','Schwertk'+unescape('%E4')+'mpfer',22],
  'axe':[10,'graphic/unit/unit_axe.png','Axtk'+unescape('%E4')+'mpfer',18],
  'archer':[10,'graphic/unit/unit_archer.png','Bogensch'+unescape('%FC')+'tze',18],
  'light':[80,'graphic/unit/unit_light.png','Leichte Kavallerie',10],
  'marcher':[50,'graphic/unit/unit_marcher.png','Berittener Bogensch'+unescape('%FC')+'tze',10],
  'heavy':[50,'graphic/unit/unit_heavy.png','Schwere Kavallerie',11]
  });
  
var respic = eval({
    'holz':['graphic/holz.png'],
    'lehm':['graphic/lehm.png'],
	'eisen':['graphic/eisen.png'],
	'res':['graphic/res.png'],
  });

var unitpic = eval({
	'spear':['graphic/unit_big/spear.png'],
	'spear_grey':['graphic/unit_big/spear_grey.png'],
	'sword':['graphic/unit_big/sword.png'],
	'sword_grey':['graphic/unit_big/sword_grey.png'],
	'axe':['graphic/unit_big/axe.png'],
	'axe_grey':['graphic/unit_big/axe_grey.png'],
	'archer':['graphic/unit_big/archer.png'],
	'archer_grey':['graphic/unit_big/archer_grey.png'],
	'spy':['graphic/unit_big/spy.png'],
	'spy_grey':['graphic/unit_big/spy_grey.png'],
	'light':['graphic/unit_big/light.png'],
	'light_grey':['graphic/unit_big/light_grey.png'],
	'marcher':['graphic/unit_big/marcher.png'],
	'marcher_grey':['graphic/unit_big/marcher_grey.png'],
	'heavy':['graphic/unit_big/heavy.png'],
	'heavy_grey':['graphic/unit_big/heavy_grey.png'],
  });  
  
var spy = eval({
  'nospy':['ohne Spy'],
  'spy':['mit 1 Spy'],
  'threespy':['mit 3 Spy'],
  });

var dorf = eval({
  'same':['aus selbem Dorf'],
  'aktuell':['aus aktuellem Dorf'],
  });
  
var building = new Array( 
 { name:'Holzfäller', level:0 },
 { name:'Lehmgrube', level:0 },
 { name:'Eisenmine', level:0 },
 { name:'Speicher', level:0 },
 { name:'Wall', level:0 },
 { name:'Versteck', level:0 }
);
  
  
  
var gamespeeds = [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1.6,1,1,1,1,1,1,1,1,1.6,1,1,1,1.6,1,1,1,1,1,1,1,1,1,1.6,1,1.6,1,1.6,1,1.6,1,1,1,1,1,1,1,1.6,1,1]; // bis Welt 56
var unitspeeds = [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.625,1,1,1,1,1,1,1,1,0.625,1,1,1,0.625,1,1,1,1,1,1,1,1,1,0.625,1,0.625,1,0.625,1,0.625,1,1,1,1,1,1,1,0.625,1,1]; // bis Welt 56

var welt = parseInt(location.host.match( /^[a-z]+(\d+)\./ )[1]);
var speed = gamespeeds[welt]*unitspeeds[welt];

if(document.location.href.indexOf('screen=report') != -1 && findByInner(document,'Spionage')[0])
  {
  var opera = window.opera?true:false;
  var spying = findByInner(document,'Spionage');
  var table = getNextElement(spying[0],'table');
  var ct = document.location.href.split('village')[1].split('&')[0].substr(1);
  if (opera) {
		  var dorf0x = document.getElementsByClassName("no_hover")[0].nextSibling.nextSibling.innerText.substring(1,4);
		  var dorf0y = document.getElementsByClassName("no_hover")[0].nextSibling.nextSibling.innerText.substring(5,8);
  }
  else {
		var dorf0x = document.getElementsByClassName("no_hover")[0].nextSibling.nextSibling.nextSibling.innerHTML.substring(19,22);
		var dorf0y = document.getElementsByClassName("no_hover")[0].nextSibling.nextSibling.nextSibling.innerHTML.substring(23,26);

  }

  
    building[0]["level"] = getLevelOfBuilding("Holzfäller");
	building[1]["level"] = getLevelOfBuilding("Lehmgrube");
	building[2]["level"] = getLevelOfBuilding("Eisenmine");
	building[3]["level"] = getLevelOfBuilding("Speicher");
	building[4]["level"] = getLevelOfBuilding("Wall");
	building[5]["level"] = getLevelOfBuilding("Versteck");
  
  
  
  k = 0;
  x = 0;
  while(x==0) {
		if(document.getElementsByTagName("a")[k].getAttribute("href").indexOf("command") != -1) 
			k++;
		else
			if(document.getElementsByTagName("a")[k].getAttribute("href").indexOf("screen=info_village") != -1) 
				x=1;
			else k++;
  } 
  
  if(opera) {
		var dorf1x = document.getElementsByTagName("a")[k].innerText.substr(document.getElementsByTagName("a")[k].innerText.indexOf("(")+1,3);
		var dorf1y = document.getElementsByTagName("a")[k].innerText.substr(document.getElementsByTagName("a")[k].innerText.indexOf("(")+5,3);
  }
  else {
	    var dorf1x = document.getElementsByTagName("a")[k].innerHTML.substr(document.getElementsByTagName("a")[k].innerHTML.indexOf("(")+1,3);
		var dorf1y = document.getElementsByTagName("a")[k].innerHTML.substr(document.getElementsByTagName("a")[k].innerHTML.indexOf("(")+5,3);

  }
  
  
  if(x==1) {
	y = document.getElementsByTagName("a")[k].href; 
	selbesdorf = y.substring(y.indexOf("id=")+3);
  }
  zieldorf = 'Ziel:';
  zieldorfanz = 0;
  var village = findByInner(table.parentNode,zieldorf)[zieldorfanz].nextSibling.firstChild.innerHTML.match(/(\(\d{1,3}\|\d{1,3}\))/g)[0].split('|');
  village[0] = village[0].substr(1);
  village[1] = village[1].substr(0,village[1].length - 1);
  
  var entfernung0 = (Math.sqrt((village[0]-dorf0x)*(village[0]-dorf0x)+(village[1]-dorf0y)*(village[1]-dorf0y)));
  var entfernung1 = (Math.sqrt((village[0]-dorf1x)*(village[0]-dorf1x)+(village[1]-dorf1y)*(village[1]-dorf1y)));
  // is spying report:
  if(table)
    {
    var res1 = grabText(table.getElementsByTagName('tr')[0].firstChild.nextSibling,1).split(' ');
    res = parseInt(res1[0]) + parseInt(res1[1]) + parseInt(res1[2]);
    requiredUs(show,show2,show3);
    };
	

	
	
	
  }
else
  {
  //var parameter = document.location.href.split('=').pop().split(',');
  if(document.location.href.indexOf('insertU') != -1)
  {
	  var parameter = document.location.href.split('insertU=')[1].split("&")[0].split(","); 
	  findByAttr(document,'name',parameter[4])[0].value = Math.min(findByAttr(document,'name',parameter[4])[0].getAttribute("maxUnits"),parameter[0]);
	  findByAttr(document,'name','spy')[0].value = parameter[3];
	  findByAttr(document,'name','x')[0].value = parameter[1];
	  findByAttr(document,'name','y')[0].value = parameter[2];
	  
	  //document.forms[0].attack.click();
  }
  document.addEventListener('keyup', xKeyWasPressed, false);


  
  
  }
  
}

	function xKeyWasPressed(e) {
		var key = e.keyCode;
		var thechar = String.fromCharCode(key);
		switch (thechar){			
			case "X":
			{
				if(document.location.href.indexOf('screen=place') != -1 && document.location.href.indexOf('try=confirm') == -1)
				{
					document.getElementsByName("attack")[0].click();
					break;
				};
				if(document.location.href.indexOf('try=confirm') != -1)
				{
					document.getElementsByName("submit")[0].click();
				}
			};
			case "Y":
			{
				if(document.location.href.indexOf('screen=place') != -1 && document.location.href.indexOf('try=confirm') == -1)
				{
					document.getElementsByName("support")[0].click();
				}
			}
		}
	};


  function requiredUs(u,s,d)
    {
	
	
	var entf = entfernung0;
	if (d=="same") entf = entfernung1;
    var laufzeit = entf*units[u][3];
	
	
	var tab,time;
	for (var i=1;i<3;i++){
		tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr['+2*i+']/td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if (tab.snapshotItem(0).innerHTML == "Gesendet"){
			time = tab.snapshotItem(1).innerHTML.match( /(\d{2}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/);
			break;
		}
	}
    time = new Date(2000+parseInt(time[3],10), parseInt(time[2],10)-1, parseInt(time[1],10), parseInt(time[4],10), parseInt(time[5],10), 0);

    var Jetzt = new Date();
	var Tag = Jetzt.getDate();
	var Monat = Jetzt.getMonth() + 1;
	var Jahr = Jetzt.getYear();
	var Stunden = Jetzt.getHours();
	var Minuten = Jetzt.getMinutes();
	var elapsed = new Date()
	elapsed = (Jetzt-time)/3600000;
	
	var alltime = elapsed+laufzeit/60;
	
	var holzlev = getCurrentLevel(building[0]["level"],res1[0],alltime);
	var lehmlev = getCurrentLevel(building[1]["level"],res1[1],alltime);
	var eisenlev = getCurrentLevel(building[2]["level"],res1[2],alltime);
	res = holzlev + lehmlev + eisenlev;
	var walks = Math.ceil(res / units[u][0] + 1);
	var verlust = 0;
	if (building[4]["level"]>walks/6) {verlust=1};
	walks = walks + verlust;

	
    var img = new Image();
    with(img) {
      src = units[u][1];
      alt = ''; };
	  
	var imgh = new Image();
    with(imgh) {
      src = respic['holz'][0];
      alt = ''; };
	  
	var imgl = new Image();
    with(imgl) {
      src = respic['lehm'][0];
      alt = ''; };
	  
	var imge = new Image();
    with(imge) {
      src = respic['eisen'][0];
      alt = ''; };
	  
	var imgg = new Image();
    with(imgg) {
      src = respic['res'][0];
      alt = ''; };

	var imgatt1 = new Image();
    with(imgatt1) {
      src = unitpic[u][0];
      alt = ''; };
	var imgatt2 = new Image();
    with(imgatt2) {
      src = unitpic[u][0];
      alt = ''; };
	var imgatt3 = new Image();
    with(imgatt3) {
      src = unitpic[u][0];
      alt = ''; };
	var imgatt4 = new Image();
	with(imgatt4) {
      src = units[u][1];
      alt = ''; };
	
	var imgspy = new Image();
    with(imgspy) {
      if (s == "nospy") {src = unitpic['spy_grey'][0];} else {src = unitpic['spy'][0];}
      alt = ''; };
	
	  
    var span = document.createElement('span');
    with(span) {
	  appendChild(document.createElement('br'));
      //appendChild(document.createTextNode('Ankunft-Res.: '));
      appendChild(imgh);
	  appendChild(document.createTextNode(holzlev));
	  appendChild(document.createTextNode(' '));
      appendChild(imgl);
	  appendChild(document.createTextNode((lehmlev)));
      appendChild(document.createTextNode(' '));
	  appendChild(imge);
	  appendChild(document.createTextNode(eisenlev));
      appendChild(document.createTextNode(' || '));
	  appendChild(imgg);
	  appendChild(document.createTextNode(getStorageSize()));
	  appendChild(document.createElement('br'));
	  appendChild(document.createElement('br'));
	  appendChild(document.createTextNode('Gesamtrohstoffe bei Ankunft:  '));
	  appendChild(document.createTextNode(res));
      appendChild(document.createElement('br'));
	  appendChild(document.createElement('br'));
	  appendChild(document.createTextNode('Mindestens ' + walks + ' '));
      appendChild(img);
      appendChild(document.createTextNode(' werden ben'+unescape('%F6')+'tigt.'));
	  appendChild(document.createElement('br'));
      }

    var select = document.createElement('select');
    select.setAttribute('size',1);

    select.setAttribute('style','vertical-align:middle; ');
    select.addEventListener('change',function() {requiredUs(select.options[select.selectedIndex].value,select2.options[select2.selectedIndex].value,select3.options[select3.selectedIndex].value)},false);

    for(var attr in units)
      {
      var option = document.createElement('option');
      option.setAttribute('value',attr);
      if(attr == u)
        option.setAttribute('selected','selected');

      option.appendChild(document.createTextNode(units[attr][2]));
        

      select.appendChild(option);
      }


    var select2 = document.createElement('select');
    select2.setAttribute('size',1);
    select2.setAttribute('style','vertical-align:middle; ');
    select2.addEventListener('change',function() {requiredUs(select.options[select.selectedIndex].value,select2.options[select2.selectedIndex].value,select3.options[select3.selectedIndex].value)},false);

    for(var attr2 in spy)
      {
      var option = document.createElement('option');
      option.setAttribute('value',attr2);
      if(attr2 == s)
        option.setAttribute('selected','selected');

        {
        option.appendChild(document.createTextNode(spy[attr2][0]));
        }

      select2.appendChild(option);
      }


    var select3 = document.createElement('select');
    select3.setAttribute('size',1);
    select3.setAttribute('style','vertical-align:middle; ');
    select3.addEventListener('change',function() {requiredUs(select.options[select.selectedIndex].value,select2.options[select2.selectedIndex].value,select3.options[select3.selectedIndex].value)},false);

    for(var attr3 in dorf)
      {
      var option = document.createElement('option');
      option.setAttribute('value',attr3);
      if(attr3 == d)
        option.setAttribute('selected','selected');

        {
        option.appendChild(document.createTextNode(dorf[attr3][0]));
        }

      select3.appendChild(option);
      }
  
	var dorfid = ct;
	if (d == 'same') {dorfid = selbesdorf;};

	var spys = '0';
	if (s == 'spy') {spys='1'};
	if (s == 'threespy') {spys='3'};

	var tt = '';
	if (document.location.href.indexOf('game.php?t=') != -1)
	{
	tt = 't=' + document.location.href.substring(document.location.href.indexOf('game.php?t=')+11,document.location.href.indexOf('&village=')) + '&';
	}
	if (document.location.href.indexOf('&t=') != -1)
	{
	tt = 't=' + document.location.href.split('&t=')[1].split('&')[0];
	}
  
  
    var a = document.createElement('a');
    a.setAttribute('href','game.php?'+tt+'village='+dorfid+'&screen=place&mode=command&insertU='+walks+','+village[0]+','+village[1]+','+spys+','+u);
	a.appendChild(imgatt1);
	a.appendChild(imgatt2);
	a.appendChild(imgatt3);
    a.appendChild(imgspy);
	
	var a2 = document.createElement('a');
    a2.setAttribute('href','game.php?'+tt+'village='+dorfid+'&screen=place&mode=command&insertU='+walks+','+village[0]+','+village[1]+','+spys+','+u);
	a2.appendChild(document.createTextNode('Es werden mindestens ' + walks + ' '));
    a2.appendChild(imgatt4);
    a2.appendChild(document.createTextNode(' zum Leerfarmen ben'+unescape('%F6')+'tigt.'));



  
    var close = new Image();
    with(close) {
      src = 'http://www.c1b1.de/close.png';
      alt = 'Close';
      title = 'Close';
      addEventListener('click',function() {document.getElementById('farm_script_table').parentNode.removeChild(document.getElementById('farm_script_table')); },false);
      }

    var ta = document.createElement('table');
    ta.setAttribute('id','farm_script_table');
    ta.setAttribute('style','border: 1px solid #DED3B9');
    ta.setAttribute('width','100%');

    var th = document.createElement('th');
    th.setAttribute('style','white-space:nowrap; vertical-align:middle; ');
    th.appendChild(document.createTextNode('Farmen:'));
    th.appendChild(close);

    var td = document.createElement('td');
	td.setAttribute('style', 'white-space:nowrap; text-align:center; ');
    td.setAttribute('colspan',3);
	td.appendChild(select);td.appendChild(select2);td.appendChild(select3);
	td.appendChild(document.createElement('br'));
    td.appendChild(span);
    
    td.appendChild(document.createElement('br'));
    td.appendChild(a);
    td.appendChild(document.createElement('br'));


    var tr = document.createElement('tr');
    tr.appendChild(th);
    tr.appendChild(td);
    ta.appendChild(tr);
	
	var tshort = document.createElement('table');
    tshort.setAttribute('style','border: 1px solid #DED3B9');
	tshort.setAttribute('id','farm_script_shortcut');
    tshort.setAttribute('width','100%');
	var tsdata = document.createElement('td');
	tsdata.setAttribute('style', 'white-space:nowrap; text-align:center; ');
    tsdata.setAttribute('colspan',4);
	tsdata.appendChild(a2);
	var tsrow = document.createElement('tr');
	tsrow.appendChild(tsdata);
	tshort.appendChild(tsrow);
	
	if(document.getElementById('farm_script_shortcut'))
      {
      document.getElementById('farm_script_shortcut').parentNode.replaceChild(tshort,document.getElementById('farm_script_shortcut'));
      }
    else
      {
		document.getElementsByTagName('h3')[0].parentNode.insertBefore(tshort,document.getElementsByTagName('h3')[0]);
	  }

    if(document.getElementById('farm_script_table'))
      {
      document.getElementById('farm_script_table').parentNode.replaceChild(ta,document.getElementById('farm_script_table'));
      }
    else
      {
      table.parentNode.insertBefore(ta,table.nextSibling);
      table.parentNode.insertBefore(document.createElement('br'),table.nextSibling);
      }
	  
	  
    //*****************************************************Mit X Link betätigen**********************************************************************************
	
	
					document.addEventListener('keyup', aKeyWasPressed, false);

					// handler
					function aKeyWasPressed(e) {
						var key = e.keyCode;
						var thechar = String.fromCharCode(key);
						//GM_log("Taste " + thechar + " wurde gedrückt!");
						switch (thechar){			
							case "X":
								send_away();
						}
					};

					function send_away(e) {
						document.location.href=a.href;						
					};

	
	//*****************************************************Mit X Link betätigen**********************************************************************************
	
	
	
	
	}

function getNextElement(obj,tname) {
    tname = tname.toLowerCase();
    obj = obj.nextSibling;
    while(true)
      {
      if(!obj)
        return false;
      if(!obj.tagName)
        obj = obj.nextSibling;
      else if(obj.tagName.toLowerCase() == tname)
        return obj;
      else
        obj = obj.nextSibling;
      }
    return list; }


function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }

function findByAttr(obj,attr,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i][attr] == value)
        {
        list[a] = obj.getElementsByTagName('*')[i];
        a++;
        }
      }
    list['length'] = a;
    return list;
    }

function grabText ( node , maxDepth )
  {
  if ( 3 == node . nodeType )
    {
    return node . nodeValue ;
    }
  else if( ( 1 == node . nodeType ) && ( 0 < maxDepth ))
    {
    var result = '' ;
    for(var i = 0 ;i < node . childNodes . length ;i ++)
      {
      result += grabText(node . childNodes [ i ] , maxDepth - 1) ;
      }
    return result ;
    }
  return '';
  }
  
function getStorageSize()
{
  return Math.round(1000*Math.pow(1.2294934,building[3]["level"]-1))-Math.round(150*Math.pow(1.3335,building[5]["level"]-1)); 
}

function getMining(level)
{
  return ((level == 0 ? 5 : Math.round(30 * Math.pow(1.163118,(level-1)))) * speed);
}

function getCurrentLevel(mineLevel,lvl,time)
{
  var prod = getMining(mineLevel);
  var max = getStorageSize(building[3]["level"]);
  return Math.min(max, Math.floor(time * prod + Math.abs(lvl)));
}

  
  
function getTableWithClassName(className, idx)
{
  tabs = document.getElementsByTagName("table");
  count = 0;
   for( ti = 0; ti < tabs.length; ti++ )
  {
    if( tabs[ti].className==className )
    {
      if( count == idx )
        return tabs[ti];
      count++;
    }
  }
}

// Diese Funktion ermittelt in einem Spy-Bericht, in dem die Gebaeude gesehen wurden die Stufe eines Gebaeudes
// Sollte es ein anderer Bericht sein, wird false zurueckgegeben (Achtung! wenn das gesuchte Gebaeude im Verteidigerdorf noch nicht gebaut ist, wird ebenfalls false zurueckgegeben)
// Welches Gebaeudelevel ermittelt werden soll, wird ueber den parameter bestimmt - dieser muss den exakten (gross/kleinschreibung!) deutschen gebaeudenamen enthalten (bsp:  "Schmiede")
// getestet mit opera 10.10 und ff 3.5.0

function getLevelOfBuilding(name) {
	function _evaluate(path, context) {
		if(!context) {
			var context = document;
		}
		
		var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var	nodes = [];
		for(var x = 0; x < XPath.snapshotLength; x++) {
			nodes.push(XPath.snapshotItem(x));
		}
		
		return nodes;
	}
	
	try {
		var cell = _evaluate('//th[contains(.,"ude:")]/following::td')[0];
		var reg = new RegExp(name + " <B>\\(Stufe (\\d+)\\)<\\/B>", "i");
		var level = cell.innerHTML.match(reg)[1];
		
		return level;
	} catch(e) {
		return false;
	}
}






