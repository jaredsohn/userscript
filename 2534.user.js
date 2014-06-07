// ==UserScript==
// @name			evo+ 1.12p
// @version			1.12p
// @description			Enhances evo game :-)
// @include			http://ev5.neondragon.net/*
// @author			~ravenlord~ (r4v3n10rd@gmail.com) - source 
// @author			HETMAN (kanarinios@gmail.com) - upgrades
// @author			MadFrog (mbfrog@gmail.com) - upgrades
// @author			starkat (jrossetti@gmail.com) - upgrades
// ==/UserScript==
/*
    CHANGE LOG ---- PLEASE READ IT BEFORE UPDATING!!!!
    ===============================================================================
    Date            Version         Description
    -------------------------------------------------------------------------------
    22-Jun-2005     0.10a           Initial Version

    23-Jun-2005     0.11a           Fixed defense calculation formula and changed
                                    defenseboost to 40% for creatures

    23-Jun-2005     0.12a           Fixed fleet times to include anti-gravity unit
                                    of zippy :-), seems accurate now

    24-Jun-2005     0.13a           Made couple more corrections, thanks to 
                                    drokliss of Opusville and WhyteWolf of wolf's 
                                    den
    02-Jul-2005     1.01a           Version jumped to Major :)
                                    Added quick message system 

    04-Jul-2005     1.02            Few fixes. Removed the flickering.

    08-Jul-2005     1.03            Added Ranking, thanks to Khlo

    15-Jul-2005     1.04            Added links to planets from coords, thanks to 
                                    xerektik of plandeltre

    27-Aug-2005     1.06            Added bar with min and max score by Hetman
	
    11-Sep-2005     1.07            Added colour scores at Universe page
	
    27-Sep-2005     1.08            Working with new GUI

    1-Oct-2005      1.09            Maximum production of creautres,defence and scans.

    16-Oct-2005     1.10            Refresh on blur maximum production.

    17-Oct-2005     1.11            Color scores at View Members pages (description as at
									Uni page) & number or potential target from alliance

    31-Dec-2005	    1.11p           First public version running with the new evo UI
									and for FireFox 1.5 only with Greasemonkey 0.6.4

    31-Dec-2005	    1.12p           Made some asthetic modifications


	===============================================================================
*/

var scriptversion = '1.12p';
var scriptversionID = 'evo+ ' + scriptversion;

function evoUnit(unitName, metal, mineral)
{
	this.unitName = unitName;
	this.metal = metal;
	this.mineral = mineral;
	return this;
}

var units = new Array();
units['monkey']           = new evoUnit('Monkey'           ,500    ,250    );
units['sheep']            = new evoUnit('Sheep'            ,3000   ,1500   );
units['horse']            = new evoUnit('Horse'            ,4000   ,2000   );
units['cow']              = new evoUnit('Cow'              ,4500   ,2500   );
units['fox']              = new evoUnit('Fox'              ,10000  ,4000   );
units['hyena']            = new evoUnit('Hyena'            ,11000  ,4500   );
units['wolf']             = new evoUnit('Wolf'             ,12000  ,5000   );
units['python']           = new evoUnit('Python'           ,18000  ,7500   );
units['ostrich']          = new evoUnit('Ostrich'          ,19000  ,8000   );
units['kangaroo']         = new evoUnit('Kangaroo'         ,28000  ,14000  );
units['lynx']             = new evoUnit('Lynx'             ,20000  ,9000   );
units['puma']             = new evoUnit('Puma'             ,20000  ,8000   );
units['lion']             = new evoUnit('Lion'             ,20000  ,9000   );
units['panther']          = new evoUnit('Panther'          ,25000  ,12500  );
units['bear']             = new evoUnit('Bear'             ,30000  ,15000  );
units['cheetah']          = new evoUnit('Cheetah'          ,25000  ,12500  );
units['walrus']           = new evoUnit('Walrus'           ,44000  ,22000  );
units['tiger']            = new evoUnit('Tiger'            ,30000  ,15000  );
units['rhino']            = new evoUnit('Rhino'            ,60000  ,36000  );
units['elephant']         = new evoUnit('Elephant'         ,52000  ,26000  );
units['centaur']          = new evoUnit('Centaur'          ,5000   ,2500   );
units['unicorn']          = new evoUnit('Unicorn'          ,12000  ,6000   );
units['minotaur']         = new evoUnit('Minotaur'         ,50000  ,25000  );
units['gryphon']          = new evoUnit('Gryphon'          ,28000  ,14000  );
units['dragon']           = new evoUnit('Dragon'           ,100000 ,50000  );
units['fire sprite']      = new evoUnit('Fire Sprite'      ,6000   ,3000   );
units['salamander']       = new evoUnit('Salamander'       ,15000  ,7500   );
units['phoenix']          = new evoUnit('Phoenix'          ,36000  ,18000  );
units['wyvern']           = new evoUnit('Wyvern'           ,64000  ,32000  );
units['demon']            = new evoUnit('Demon'            ,140000 ,70000  );
units['dyrad']            = new evoUnit('Dyrad'            ,4000   ,3750   );
units['baskilisk']        = new evoUnit('Baskilisk'        ,12000  ,9000   );
units['medusa']           = new evoUnit('Medusa'           ,30000  ,22500  );
units['cockatrice']       = new evoUnit('Cockatrice'       ,50000  ,37500  );
units['werewolf']         = new evoUnit('Werewolf'         ,100000 ,75000  );
units['avimimus']         = new evoUnit('Avimimus'         ,4000   ,2000   );
units['therizinsaurus']   = new evoUnit('Therizinsaurus'   ,9600   ,4800   );
units['styracosaurus']    = new evoUnit('Styracosaurus'    ,22400  ,11200  );
units['carnotaurus']      = new evoUnit('Carnotaurus'      ,40000  ,20000  );
units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,80000  ,40000  );
units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,6500   ,3250   );
units['mummy']            = new evoUnit('Mummy'            ,16000  ,8000   );
units['sta']              = new evoUnit('Sta'              ,38000  ,19000  );
units['sphinx']           = new evoUnit('Sphinx'           ,70000  ,35000  );
units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,180000 ,90000  );

units['fort']             = new evoUnit('Fort'             ,2000   ,1000);
units['satellite']        = new evoUnit('Satellite'        ,8000   ,4000);
units['nanowire wall']    = new evoUnit('Nanowire wall'    ,12000  ,4500);
units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,8000   ,4000);

units['wave reflector']   = new evoUnit('Wave Reflector'   ,2000   ,2000);

units['biochemical missile']=new evoUnit('Biochemical Missile',10000 ,20000);
units['nanovirus missile']= new evoUnit('Nanovirus Missile',30000   ,15000);
units['bombs']            = new evoUnit('Bombs'            ,11000  ,7000);
units['neural reorganiser bomb']= new evoUnit('Neural Reorganiser Bomb',50000, 32000);
units['poison bombs']     = new evoUnit('Poison Bombs'     ,16000  ,12000);


units['land scan']        = new evoUnit('Land Scan'        ,1000   ,2000   );
units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,1000   ,1000   );
units['sector scan']      = new evoUnit('Sector Scan'      ,2000   ,4000   );
units['creature scan']    = new evoUnit('Creature Scan'    ,3000   ,6000   );
units['r&d scan']         = new evoUnit('R&D Scan'         ,2000   ,3000   );
units['news scan']        = new evoUnit('News Scan'        ,10000  ,20000  );
units['military scan']    = new evoUnit('Military Scan'    ,6000   ,12000  );
units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,13000  ,26000  );
units['overload pulse']   = new evoUnit('Overload Pulse'   ,13000  ,26000  );


function evoFindCreateTable(s)
{
    var tables = document.body.getElementsByTagName('TABLE');
	var tip = 0;
    for(var i=0; i < tables.length; i++) {
        if(tables[i].rows.length == 0 || tables[i].rows[0].cells.length < 4) continue;
        if(tables[i].rows[0].cells[2].innerHTML == "You have") {
			tip = tip + 1;
			if(tip == s) return tables[i];
		}
    }
    return null;
}

function evoFindHelpTable()
{
    var tables = document.body.getElementsByTagName('TABLE');
    for(var i=0; i < tables.length; i++)
    {
        if(tables[i].rows.length == 0 || tables[i].rows[0].cells.length > 1)continue;
        if(tables[i].rows[0].cells[0].innerHTML == "Key")return tables[i];
    }
    return null;
}

function evoUniRun(trick,smin,tmax)
{
	for(var i=2; i < trick.rows.length; i++) {
		var g =trick.rows[i].cells[3].innerHTML;
		var g2 = evoFormatNumber2(g);
		if(g2 < smin ){trick.rows[i].cells[3].innerHTML ='<font color="#CC4411">' +  trick.rows[i].cells[3].innerHTML  + '</font>';};
		if(g2 > tmax ){trick.rows[i].cells[3].innerHTML ='<font color="#0000FF">' +  trick.rows[i].cells[3].innerHTML  + '</font>';};
		if(g2 <= tmax && g2 >= smin ){trick.rows[i].cells[3].innerHTML ='<font color="#00FF00">' +  trick.rows[i].cells[3].innerHTML  + '</font>';};
	}
	
	var git = evoFindHelpTable();
	var d=git.insertRow(1);
	d.className = "lightblue_bg_row2";
	d.innerHTML = '<td>Text colours:</td><td colspan="3" align="center"><font color="#FFFFFF">White</font> name of continent shows that this person is online<BR><font color="#C4C4C4">Gray</font> name of continent shows that this person is offline<BR><font color="#646464">Dark gray</font> name shows that person is offline from more than week</td>';
	git.appendChild(d);
	
	var c=git.insertRow(1);
	c.className = "lightblue_bg_row1";
	c.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Player with that <font color="#CC4411">score</font> can attack you, but you can\'t<BR>Player with that <font color="#00FF00">score</font> can attack you, and you can also attack him<BR>Player with that <font color="#0000FF">score</font> can\'t attack you, but you can :D</td>';
	git.appendChild(c);
}

function evoLayoutChanged()
{
    alert('Oops.. Page layout was not recognized, Neon probably changed the page :(');
}

function evoGetInnerText(str)
{
    return str.replace(evoRegX1,"");
}

function evoFormatNumber(num)
{
	num=String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if(decimalIdx != -1) {
		part1 = num.substring(0,decimalIdx);
		part2 = num.substring(decimalIdx+1,num.length);
	}
	else
		part1 = num;
	
	while(evoRegX2.test(part1))
		part1 = part1.replace(evoRegX2, '$1,$2');

	return part2==""?part1:part1+"."+part2;
}


function evoFormatNumber2(num)
{
	var decimalIdx = num.indexOf(',');
	var part1 = "", part2="";
	while(decimalIdx != -1) {
		part1 = num.substring(0,decimalIdx);
		part2 = num.substring(decimalIdx+1,num.length);
		num=""+part1+part2;
		decimalIdx = num.indexOf(',');
	} 
	return Number(num);
}

var evoRegX1 = /<\/?[^>]+>/gi; /*To strip html to string*/
var evoRegX2 = /(\d+)(\d{3})/g; /*To format a number*/

var metal=0, mineral=0, food=0; //players resources
var metal1=0, mineral1=0, food1=0; //players resources

function evoResources()
{
	var pt1 = document.getElementById("openpanel");
	var st1 = evoGetInnerText(pt1.innerHTML);
	var idx1 = st1.indexOf('Metal:') + 7;
	st1 = st1.substring(idx1,st1.length);
	idx1 = st1.indexOf(' &');
	var strme = st1.substring(0,idx1);
	metal = evoFormatNumber2(strme);
	
	idx1 = st1.indexOf('Mineral') + 9;
	st1 = st1.substring(idx1,st1.length);
	idx1 = st1.indexOf(' &');
	var strmi = st1.substring(0,idx1);
	mineral = evoFormatNumber2(strmi);
	
	idx1 = st1.indexOf('Food') + 6;
	st1 = st1.substring(idx1,st1.length);
	idx1 = st1.indexOf(' &');
	var strf = st1.substring(0,idx1);
	food = evoFormatNumber2(strf);
}

function refresh(pi1)
{
	var tab1 = evoFindCreateTable(pi1);
	metal1=0;
	mineral1=0;
	for(var i=2; i < (tab1.rows.length - 1);i++) {
		iput=(iput=tab1.rows[i].cells[3].getElementsByTagName('INPUT'))?iput[0]:null;
		if(iput.value=='') continue;
		iput1=(iput1=tab1.rows[i].cells[3].getElementsByTagName('SPAN'))?iput1[0]:null;
		var nme=iput1.id.toLowerCase();
		nme = units[nme];
		metal1 = metal1 + (nme.metal * iput.value);
		mineral1= mineral1 + (nme.mineral * iput.value);
		if(metal1>metal || mineral1>mineral) {
			metal1=metal;
			mineral1=mineral;
			iput1.innerHTML='<BR><font color="#ff4400">TOO MUCH!!!</font>' + iput1.innerHTML;
		}
	}

	for(var i=2; i < (tab1.rows.length - 1);i++) {
		iput1=(iput1=tab1.rows[i].cells[3].getElementsByTagName('SPAN'))?iput1[0]:null;
		var nme=iput1.id.toLowerCase();
		nme = units[nme];
		maxme = (metal-metal1) / nme.metal;
		if(maxme<Math.round(maxme))
			maxme=Math.round(maxme-1);
		else
			maxme=Math.round(maxme);
		maxmi = (mineral-mineral1) / nme.mineral;
		if(maxmi<Math.round(maxmi))
			maxmi=Math.round(maxmi-1);
		else
			maxmi=Math.round(maxmi);
		if(maxme>maxmi)
			gif=maxmi;
		else
			gif=maxme;
		if( gif == 0 && iput1.innerHTML.substring(4,9) == '<font' )
			iput1.innerHTML = iput1.innerHTML;
		else
			iput1.innerHTML = '<BR>max: ' + gif;
	}
}

function evoCreate(pi1)
{
	var tab1 = evoFindCreateTable(pi1);
	var str1;
	var unit;
	var idx1;
	var idx2;
	var maxme;
	var maxmi;
	var gif;
	
	if(tab1 == null) return;
	
	for(var i=2; i < (tab1.rows.length - 1);i++) {
		unit = (tab1.rows[i].cells[1].getElementsByTagName('SPAN'))[0].textContent.toLowerCase();
		unit = units[unit];

		maxme = metal / unit.metal;
		if(maxme<Math.round(maxme))
			maxme=Math.round(maxme-1);
		else
			maxme=Math.round(maxme);
		maxmi = mineral / unit.mineral;
		if(maxmi<Math.round(maxmi))
			maxmi=Math.round(maxmi-1);
		else
			maxmi=Math.round(maxmi);
		if(maxme>maxmi)
			gif=maxmi;
		else
			gif=maxme;

		str1 = tab1.rows[i].cells[3].innerHTML;
		var tit=document.createElement('SPAN');
		tit.id = unit.unitName;
		tit.innerHTML = '<BR>max: ' + gif;
		tab1.rows[i].cells[3].appendChild(tit);
		var iput = tab1.rows[i].cells[3].getElementsByTagName('INPUT');
		var iput1 = iput[0];
		var iput1Evt = function(){refresh(pi1);};
		iput1.addEventListener('blur', iput1Evt, false);
	}

	// hook up a confirmation dialog on the form
	var youSure = function(e)
		{
			if(! confirm('Are you sure to produce these items/creatures?'))
				e.preventDefault();
		}
	var daForm = tab1.getElementsByTagName('FORM')[0];
	daForm.addEventListener('submit', youSure, false);
	
	refresh(pi1);
}

function boo(rank, totalPlayers, score)
{
	var smin = 0;
	var smax = 0;
	var tmin = 0;
	var tmax = 0;
	var sscore = 0;

	sscore = evoFormatNumber2(score);

	smin= sscore * 0.35;
	if(smin>Math.round(smin))
		smin=Math.round(smin+1);
	else
		smin=Math.round(smin);
	var smin2 = evoFormatNumber(smin);
	smin2 = String(smin2);
	tmax=sscore / 0.35;
	if(tmax<Math.round(tmax))
		tmax=Math.round(tmax-1);
	else
		tmax=Math.round(tmax);
	var tmax2 = evoFormatNumber(tmax);
	tmax2 = String(tmax2);
	if(location.href.toLowerCase() == 'http://ev5.neondragon.net/alliances') {
		var node = document.evaluate("//text()[contains(.,'Alliance Name')]", document, null, 6, null);
		if(node != null)node = node.snapshotItem(0);
		if(node == null)alert('brak');
		var tab = node.parentNode.parentNode.parentNode;
		for(var i=2; i < tab.rows.length;i++) {
			var str = evoGetInnerText(tab.rows[i].cells[3].innerHTML);
			tab.rows[i].cells[3].innerHTML='<td style="text-align: center;">'+ evoFormatNumber(str) + '</td>';
		}
	} else if(location.href.toLowerCase().substring(0,44) == 'http://ev5.neondragon.net/alliances/members/') {
		var node = document.evaluate("//text()[contains(.,'Ruler of Continent Name')]", document, null, 6, null);
		var nbr = 0;
		var sums1 = 0;
		if(node != null)node = node.snapshotItem(0);
		if(node == null)alert('brak');
		var tab = node.parentNode.parentNode.parentNode;
		//alert(tab.rows[0].cells.length);
		for(var i=1; i < tab.rows.length;i++) {
			var str = tab.rows[i].cells[2].innerHTML;
			var g2 =  evoFormatNumber2(str);
			sums1 = sums1 + g2;
			if(g2 < smin ){tab.rows[i].cells[2].innerHTML ='<font color="#CC4411">' + str + '</font>';};
			if(g2 > tmax ){tab.rows[i].cells[2].innerHTML ='<font color="#0000FF">' +  str + '</font>';nbr=nbr+1;};
			if(g2 <= tmax && g2 >= smin ){tab.rows[i].cells[2].innerHTML ='<font color="#00FF00">' +  str  + '</font>';nbr=nbr+1;};
		}
		var g3=evoFormatNumber(sums1);
		tab.rows[0].cells[2].innerHTML = tab.rows[0].cells[2].innerHTML +'<font color="#00FF00"> '+ g3 + '</font><BR>Targets for me: <font color="#00FF00">' + nbr + '</font>';
	}

	var trick = document.getElementById('cont_list');
	if( trick != null ) {
		// let's add some color ;)
		evoUniRun(trick,smin,tmax);
	}

	if(rank == null && totalPlayers == null ) return;

	var content = document.getElementById('content');
	var maintd;
	if( content != null ) {
		maintd = content.parentNode;
	} else {
		return;
	}

	var c = document.createElement('DIV');
	c.style.textAlign="right";
	c.style.marginRight="5px";
	c.style.marginTop="3px";
	c.style.marginBottom="3px";

//	c.appendChild(document.createTextNode('Rank: '));
	var span2 = document.createElement('SPAN');
	span2.className ='t_normal b';
	span2.innerHTML = "<font size=-3 color=grey>Rank: </font></font size=-3>" + rank + "/" + totalPlayers + "</font>&nbsp;|&nbsp;";
	c.appendChild(span2);
//	c.appendChild(document.createTextNode('Min. TargetScore: '));
	var span3 = document.createElement('SPAN');
	span3.className ='t_normal b';
	span3.innerHTML = "<font size=-3 color=grey>Min Target Score: </font></font size=-3>" + smin2 + "</font>&nbsp;|&nbsp;";
	c.appendChild(span3);
//	c.appendChild(document.createTextNode('Max. AttackerScore: '));
	var span4 = document.createElement('SPAN');
	span4.className ='t_normal b';
	span4.innerHTML = "<font size=-3 color=grey>Max Attacker Score: </font></font size=-3>" + tmax2; // + "&nbsp;|&nbsp;";
	c.appendChild(span4);
	maintd.insertBefore(c, content);

	var span5 = document.createElement('DIV');
	span5.style.color = "#6A9C01";
//	span5.style.color = "#E01F22"; <- NOD red color... not nice for the eyes
	span5.style.fontSize = "8pt"; span5.style.fontWeight = "bold";
	span5.style.paddingLeft = "3px"; span5.style.paddingTop = "3px";
	span5.style.position = "absolute";
	span5.innerHTML = scriptversionID;
	var ui = document.getElementById('userinfo');
	ui.parentNode.insertBefore(span5, ui);
}

(function () {
	evoResources();
    var totalPlayers = null;
    var rank = null;
    var score = '';
	var match;

	var panelinfo = document.evaluate("//div[@id='panelinfo']/table/tbody/tr/td[2]/p", document, null, 6, null);
	if( panelinfo = panelinfo.snapshotItem(0) ) {
		if( match = /Current\s+Ranking:\s+([,0-9]+)\s+of\s+([,0-9]+)/.exec(panelinfo.textContent) ) {
			rank = match[1]; //.split(",").join("");
			totalPlayers = match[2]; //.split(",").join("");
		}
	}

	nodes = document.evaluate("//p[@id='openpanel']/strong[5]", document, null, 6, null);
    if( node = nodes.snapshotItem(0) ) score = node.textContent;

	var loc = location.href.toLowerCase();
    if( loc == 'http://ev5.neondragon.net/create' ) {
        evoCreate(1); 
		evoCreate(2);
		evoCreate(3);
    } else if( loc == 'http://ev5.neondragon.net/scans' ) {
		evoCreate(1);
	}

    boo(rank, totalPlayers, score);	
})();

