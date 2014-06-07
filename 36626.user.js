// ==UserScript==
// @name            Tuanlucky (speed.travian.lt edition)
// @namespace   TravianAuto 
// @include        http://*.travian.*php*
// @exclude        http://*.travian.*/logout.php*
// @exclude        http://*.travian.*/chat.php*
// @exclude        http://forum.travian.*
// @exclude        http://*.travian.*/index.php*
// @exclude        http://*.travian.*/manual.php*
// @description	Travian AUTO ATTACK v1.0.3. 
// @description	 Build 002 Quick Raid
// @description	 Build 003 Multi Raid. Date 18.11.2007
// @description	 Build 004 Map scanning. Date 21.11.2007
// @description	 Build 005 Multi Server support. Date 23.11.2007
// @description	 Build 006 Auto Build. Remove check Res - Date 25.11.2007
// @description	 Build 007 Multi Villages support  - Date 27.11.2007
// @description	 Build 008 Multi default troop  - Date 28.11.2007
// @description	 Build 008a fix bug  - Date 29.11.2007
// @description	 Build 008c  message popup - alert on s5 - fix bug build complete leads to stop - fix bug build switch page Date 31.11.2007
// @description	 Build 008d alert message 02-12-2007
// @description	 Build 008e fix bug multi village active. Fix bug 24h 16.12.2007
// @description	 Build 008f add invalid Coordinate list. 17.12.2007
// @description	 Build 009 Alert function. 19.12.2007
// @description	 Build 009a resource list 
// @description	 Build 009c fix bug scan map in new version 27.4.2008
// @description	 Build 009d fix position and English version
// @description  Build 010 fix function getNode(xpath) 23.10.2008
// @version	1.2.1
// ==/UserScript==

  
//================================
// Init var
//for Teuton
//you should change for another troop
var g_troopcapacity 		= [30, 45, 0, 75, 35, 65, 0, 0, 0, 0,0,0,0];
var g_romantroopcapacity 	= [40, 20, 50, 0, 100, 70, 0, 0, 0, 0,0,0,0];
var g_teutontroopcapacity 	= [60, 40, 50, 0, 110, 80, 0, 0, 0, 0,0,0,0];

var g_alertsoundlink = 'http://localhost/travianalert.html';

 if ( navigator.appName == 'Opera' ) {
	eventSource = document;
} else {
	eventSource = window;
}
var SHORTDELAY = 5000; //giay
var LONGDELAY = 3*60*1000; //3 phut

location.href.search(/http:\/\/(.*)\//);
var server = RegExp.$1;
var randomLink=['karte.php', 'statistiken.php', 'berichte.php', 'nachrichten.php', 'a2b.php'];

////////////////////////////////////////////////
//Functions Lib
////////////////////////////////////////////////
 function format(maxtime){
	var hrs = Math.floor(maxtime/3600);
	var min = Math.floor(maxtime/60) % 60;
	var sec = maxtime % 60;
	var t = hrs + ":";
	if(min < 10){t += "0";}
	t += min + ":";
	if(sec < 10){t += "0";}
	t += sec;
	return t;
}

function t_format1(myElement) {p = myElement.split(":");stunden = p[0];minuten =  p[1];sekunden = p[2];sek = stunden*3600+minuten*60+sekunden*1;return sek;}
function addGlobalStyle(css) {    var head, style;    head = document.getElementsByTagName('head')[0];    if (!head) { return; }    style = document.createElement('style');    style.type = 'text/css';    style.innerHTML = css;    head.appendChild(style);}
function t_format2(s) { if(s > -1)  { stunden = Math.floor(s/3600); minuten = Math.floor(s/60) % 60;    sekunden = s % 60; t = stunden + ":"; if(minuten < 10){t += "0";} t += minuten + ":"; if(sekunden < 10){t += "0";} t += sekunden; }else{t = "0:00:0?";}return t;}
function elem(tag,content) { var ret = document.createElement(tag);  ret.innerHTML = content;  return ret;}
function div(content)      { return elem("div",content);}

function get(id)      { return document.getElementById(id); }
function getn(id, frm)      { if (typeof frm.elements[id] != 'undefined')  return frm.elements[id];}
function find(xpath,xpres) {
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE, XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPUList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

function trim(s) { return s.replace(/^\s*(.*?)\s*$/,'$1');}
function pad2(n) { return n<10?"0"+n:n;}

function createCookie(name, value, days){
		if (typeof GM_setValue == "undefined"){
			if (days){
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		}else GM_setValue(name, value);
	}

function readCookie(name){
		if (typeof GM_getValue == 'undefined'){
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}else return GM_getValue(name, null);
	}

function eraseCookie(name){ createCookie(name, "", -1); }

function myai(n,d){var p,i,x;
if(!d)d=document;
if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;
n=n.substring(0,p);
}if(!(x=d[n])&&d.all)x=d.all[n];
for(i=0;
!x&&i<d.forms.length;
i++)x=d.forms[i][n];
for(i=0;
!x&&d.layers&&i<d.layers.length;
i++)x=ai(n,d.layers[i].document);
return x;
}
function mybtm0(){var i,x,a=document.ax;
for(i=0;a&&i<a.length&&(x=a[i])&&x.at;i++)x.src=x.at;
}
function mybtm1(){var i,j=0,x,a=mybtm1.arguments;
document.ax=new Array;
for(i=0;i<(a.length-2);i+=3)
	if((x=myai(a[i]))!=null){document.ax[j++]=x;
	if(!x.at)x.at=x.src;
	x.src=a[i+2];
}}

function OpenRandomPage()
{
	var linkran = Math.floor(Math.random()*(randomLink.length-1));
	location.href= 'http://'+server+ '/'+ randomLink[linkran];
}

function getNode(xpath)
      {
      	return find(xpath, XPFirst);
      }

function delay(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 

function getCurrentTime()
{
    //lay so giay hien tai
	var today=new Date()
	var d=today.getDay();
	var h=today.getHours()
	var m=today.getMinutes()
	var s=today.getSeconds()
	return (parseInt(d)*3600*24)+parseInt(h)*3600+parseInt(m)*60+parseInt(s);
	//return parseInt(h)*3600+parseInt(m)*60+parseInt(s);

}

function xhr(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
	return xmlhttp.responseText;
}
//===========================================
//Game Functions


var g_reconnect = readCookie('g_reconnect');
if (g_reconnect == null) g_reconnect = 0;
if (g_reconnect == 1) 
{
//bi vang ra ngoai ???? login dzo lai lien...
	var vv = find("//img[@src='img/en/t1/login.gif']", XPList);
	if (window.location.href.match(/login\.php/) || vv.snapshotLength > 0 )
	{

			mybtm1('s1','','img/en/b/l3.gif',1);
			mybtm1('s1','','img/en/b/l2.gif',1);
			mybtm0();
			createCookie('heheautologin' , 1, 365);
			document.forms[0].submit();
	}
	// Auto login - avoid submit multi page with Reload every page
	var vv = readCookie('heheautologin');
	if (vv != null && v == 1 && window.location.href.match(/dorf1\.php/))
	{
		location.href = 'http://'+server+'/karte.php';
		createCookie('heheautologin' , 0, 365);
	}
}


function switchPhase(currenttype)
{
	var lolo = 0;
	if (currenttype == 'troop')
	{
		
		var chkactive = readCookie(username+'chkactive');
		if (chkactive == null) chkactive = 0;
		
		if (chkactive == false)
		{
			g_whichphase = 'build';
			if (g_buildactive == false)
				switchPhase(g_whichphase);
			else
			createCookie(villagekey+'whichphase', g_whichphase, 365);
		}
		else
		{
			//da den gio check chua??
			var vv = getCurrentTime();
			var lasttimecheck = readCookie(username+'atkchecklasttime');
			if (lasttimecheck == null) lasttimecheck = vv;
	
			if ((parseInt(lasttimecheck)-vv) <= 0 || (parseInt(lasttimecheck)-vv) > 1000)
			{
				//createCookie(username+'inatkcheck', 1, 365);
				checkvillagesatk();
				createCookie(username+'atkchecklasttime', (vv+(60*10)), 10);  //10 phut nua moi check tiep
				//OpenRandomPage();
			}
			else //chua den gio...
			{
				g_whichphase = 'build';
				if (g_buildactive == false)
					switchPhase(g_whichphase);
				else
				createCookie(villagekey+'whichphase', g_whichphase, 365);
			}
		}
	} 
	else //if (currenttype == 'build')
	{
		if (getNumVillage()==1)
			g_whichphase = 'troop';
		else
		{
			var allowswitch = readCookie(username+'automulti');
			if (allowswitch == 1)
			{
				//sang lang ke ben
				
				var rr = getNextVillage();
				//alert('a='+rr);
				if (rr != '')
				{
					var ii = rr.split('@');
					g_whichphase = 'troop';
					createCookie(villagekey+'whichphase', g_whichphase, 365);
					location.href = trim(ii[1]);
					lolo = 1;
					return;
				}
			}
		}
		if (lolo == 0)
		{
			g_whichphase = 'troop';
			createCookie(villagekey+'whichphase', g_whichphase, 365);
		}
	} 
	//if ((g_buildactive == true || g_atkactive == true) && (lolo == 0))
	//	OpenRandomPage();
	if (g_whichphase == 'build')
	{
		OpenRandomPage();
	}
}



function getNextVillage()
{
	var sVillageName = '';	
	var xpathResult = find("id('lright1')/table/tbody/tr/td/a[contains(@href, 'newdid=')]", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	var listv = '';
	var avli = '';
	var kkk = getNode('//a[@class="active_vl"]');
	if (kkk != null)	
		avli = trim(kkk.innerHTML);
	else 
	return '';

	var flink = '';
	var fname = '';
	var fnext = 0;
	var active =0;
	for (var i=0;i<xpathResult.snapshotLength;i++)
	{
		if (fname == '')
			fname = trim(xpathResult.snapshotItem(i).innerHTML);
		if (flink == '')
			flink = trim(xpathResult.snapshotItem(i).href);
		
		//check lang nay co activ e ko?
		active = readCookie(username+xpathResult.snapshotItem(i).innerHTML+'active');
		if (active == null || active == 0) continue;
		
		if (fnext == 1)
			return xpathResult.snapshotItem(i).innerHTML+'@'+xpathResult.snapshotItem(i).href;
		
		if (xpathResult.snapshotItem(i).innerHTML == avli)
			fnext = 1;
		
	} 
	if (fnext == 1)
	{
		active = readCookie(username+fname+'active');
		if (active == null || active == 0) return '';
		
		return fname+'@'+flink;
	}
		
	if (fnext == 0) //what the hell
		return '';
}

function getNumVillage()
{
	var xpathResult = find("id('lright1')/table/tbody/tr/td/a[contains(@href, 'newdid=')]", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	var count = 0;
	for (var i=0;i<xpathResult.snapshotLength;i++)
	{
		count++;
	} 
	if (count == 0)
		return 1;
	else
		return count;
}

//Create an building order entry
function UpdateExecuteTimeOut()
{
	
	if ((g_atkactive == true ) )
	{
		var astep = 0;
	
		var vv = getCurrentTime();
		if (g_atkactive)
		{
			var tt = g_attacktimeout - vv;
			
			if (tt <0) tt = 0;
			var xx = get('attacktimeout');
			astep = readCookie(villagekey+'attackstep');
				if (astep == null) astep = 0;
			xx.innerHTML = 'Next execute in '+ format(tt)+ ' - Next Step is: ' + astep;
		}
		
		
		//tu dong refresh page.. ngan ngua login expire
		if ((vv%300)==0 && (astep == 0 || g_atkactive == false) && tt > 300 )
			OpenRandomPage();
		
		setTimeout(function() { UpdateExecuteTimeOut(); }, 500);
		
	}
}

function CreateAttackOrder()
{
	//check input is empty or not
		var trooplist = trim(get('trooplist').value);
		var attackinfo = trim(get('attackinfo').value);
		var villagelist = trim(get('villist').value);
					
	if (trooplist == '' || attackinfo == '')
		alert('Chua nhap du lieu kia ba...');
	else
	{
		//save to cookie
		createCookie(villagekey+'trooplist', trooplist, 365);
		createCookie(villagekey+'attackinfo', attackinfo, 365);
		createCookie(villagekey+'attackstep', 0, 365);
		createCookie(villagekey+'villagelist', villagelist, 365);
		createCookie(villagekey+'currentvillage' , 0, 365);
		clearTimeout(g_attackHandle);
		var tt = attackinfo.split(' ');
		var timeout = 5000;
		if (tt[2] != null && tt[2] != '' && parseInt(tt[2]) > 0)
		{
			alert('NOTICE: The auto will run after ' + tt[2] + ' second ');
			timeout = parseInt(tt[2])*1000;
		}
		
		if (tt[3] != null && tt[3] != '')
		{
			alert('NOTICE: Start from vilage number ' + tt[3] );
			createCookie(villagekey+'currentvillage' , parseInt(tt[3]), 365);
		}
		
		if (tt[4] != null && tt[4] != '' && parseInt(tt[4]) == 1)
		{
			alert('NOTICE: Perform scan map function ' + tt[4] );
			createCookie(villagekey+'usescanmap' , 1, 365);
		}
		else
			createCookie(villagekey+'usescanmap' , 0, 365);
		
		//if (timeout > (6*60*1000)) timeout = 5000;
		
		g_attackHandle = setTimeout(function() { ExecuteAttackOrder(); }, timeout);
		DeactiveAttackOrder();
		// add a zero in front of numbers<10
		var vv =getCurrentTime() +  Math.floor(timeout/1000);
		createCookie(villagekey+'attackTimeout', vv, 265);
		
		alert('Data has been stored. Click Execute to run.');
	}
	
}

function DeactiveAttackOrder()
{
	g_atkactive = false;
	createCookie(villagekey+'g_atkactive', g_atkactive, 365);
	var v = get('attacklnkid');
	if (v)
		v.innerHTML = 'Execute';
}

function ExecuteAttackOrder()
{

	var scanmap = readCookie(villagekey + 'usescanmap');
	if (scanmap == null) scanmap == 0;
	
	if (scanmap == 1)
	nexttimeout = 3000;
	else
	nexttimeout = SHORTDELAY;
	//do not attack if we are evacuating troop
	var openrandom = 0;
	var switchphase = 0;
	
	var phaseok = 0;
	
	if (g_whichphase == 'troop')
		phaseok = 1;
	else
	{
		var v = get('atkstatus');
		v.innerHTML = 'System is busy. - Phase '+ g_whichphase;
	}

		
	if (g_atkactive && phaseok)
	{
		var list = readCookie(villagekey+'trooplist');
		var attackinfo = readCookie(villagekey+'attackinfo');
		var villagelist = readCookie(villagekey+'villagelist');
		if (villagelist == null) villagelist = '';
		var currentvillage = parseInt(readCookie(villagekey+'currentvillage'));
		
		//phan tich trong danh sach lang .. co troop list ko?
		//tach du lieu cua mot lang
		var v = villagelist.split("\n");
					
		if (currentvillage < v.length)
		{
			var pp = trim(v[currentvillage]).split('@');
			if (pp.length >= 3)
				list = trim(pp[1]); //troop list
		}
		var tt = attackinfo.split(' ');
		m_trooptype = parseInt(tt[1]);
		if (list != null && attackinfo != null)
		{
			//alert('Now attack list= ' + attackinfo);
			//location.href='http://'+server+'/dorf2.php';
			var step = readCookie(villagekey+'attackstep');
			if (step == null) step = 0;
			
			switch (step)
			{
				//step 0 - open send troop page
				case 0:
					var v = get('atkstatus');
					v.innerHTML = 'Step 1 - Open Troop Page';
					createCookie(villagekey+'attackstep', (step+1), 365);
					location.href= 'http://'+server+'/a2b.php';
					break;
				case 1:
					//check is correct a2b page.
					var t = get('lmid2');
					if (t != null)
					{
						var v = get('atkstatus');
						v.innerHTML = 'Step 2 - Fill table content and submit';
						createCookie(villagekey+'lastattackreport', v.innerHTML,365);
						xx = t.innerHTML.substring(t.innerHTML.indexOf('<h1')+4, t.innerHTML.indexOf('</h1>'));
						//Send troops
						if (xx.indexOf('Siųsti karius') == -1)
						{
							//DeactiveAttackOrder();
							createCookie(villagekey+'attackstep', 0, 365);
							createCookie(villagekey+'lastattackreport', 'Wrong send troop page', 365);
							OpenRandomPage();
							break;
						}
					}
					//fill value
					 //build list troop u have..
					var trooplist=null;
					var tbls = find("//td[@class='f8']", XPList);
	
					var s1 = '';
					var tbl=   [0,0,0,0,0,0,0,0,0,0,0];
					var temp = [0,4,8,1,5,9,2,6,3,7,10];
					for(var j=0;j<tbls.snapshotLength;++j) 
					{
						var tb = tbls.snapshotItem(j);
						if (tb != null)
						{
							yy = tb.innerHTML;
							formid = yy.substring(yy.indexOf('document.snd.t')+14, yy.indexOf('.value'));
							valueid = yy.substring(yy.indexOf('false;">(')+9, yy.indexOf(')<'));
							if (formid != '' && valueid != '')
								tbl[parseInt(formid)-1] = parseInt(valueid);
						}
					}
					
					//if the no troop.. back to page 1...
					hastroop = 0;
					for (i=0;i<10;i++)
					{
						if (tbl[i]>0)
							hastroop= 1;
					}
					
					if (hastroop == 0)
					{
						createCookie(villagekey+'attackstep', 0, 365);
						var v = get('atkstatus');
						v.innerHTML = 'Step 2 - No Troop - wait for ' + (LONGDELAY/1000);
						createCookie(villagekey+'lastattackreport', v.innerHTML,365);
						nexttimeout = LONGDELAY;
					
						switchphase = 1;
						break;
					}
					
					//so sanh gia tri xuat quan voi so luong quan dang co
					
					
					//check troop type
					var troopcapacity = null;
					if (m_trooptype == 3) //gau
						troopcapacity = g_troopcapacity;
					if (m_trooptype == 2) //roman
						troopcapacity = g_romantroopcapacity;						
					if (m_trooptype == 1) //teuton
						troopcapacity = g_teutontroopcapacity;
					

					
					//kiem tra xem, trong danh sach co nhieu loai danh sach troop
					var mtt = list.split('|');
					var breakcase = 0;
					for (pp=0;pp<mtt.length;pp++)
					{
						var tt = trim(mtt[pp]).split(' ');
						if (tt.length>1)
						{
							var troopcapa = 0;
							var numtroop = 0;
							var lesstroop = 0;
							for (var i=0;i<tt.length;i+=2)
							{
								var troopindex = parseInt(tt[i])-1;
								var troopinput = find("//input[@name='t"+(troopindex+1)+"']", XPList);
								var troopi = troopinput.snapshotItem(0);	
								if (troopi)
								{
									//if (tbl[troopindex] < parseInt(tt[i+1]) || parseInt(tt[i+1]) == -1)
									if (parseInt(tt[i+1]) == -1)
										troopi.value = tbl[troopindex];
									else if (tbl[troopindex] < parseInt(tt[i+1]))
									{
										lesstroop = 1;
										break;
									}
									else
										troopi.value = parseInt(tt[i+1]);
									numtroop += troopi.value;
									troopcapa += troopcapacity[troopindex]*troopi.value;
								}
							}
						
						
							var mintr = 2;
							if (scanmap == 1)
								mintr = 1;
						
							if ((numtroop < mintr || lesstroop == 1) && (pp == (mtt.length-1)))
							{
								//alert("NOT ENOUGH TROOP, Please check your troop list again");
								createCookie(villagekey+'attackstep', 0, 365);
								var v = get('atkstatus');
								v.innerHTML = 'Step 2 - Not Enough Troop - wait for ' + (LONGDELAY/1000) ;
								createCookie(villagekey+'lastattackreport', v.innerHTML,365);
								nexttimeout = LONGDELAY;
								switchphase = 1;
								breakcase = 1;
								break;
							}
							else
							if ((numtroop < mintr || lesstroop == 1))
								continue;
							else
								break;
						}
						else
						{
								v.innerHTML = 'Step 2 - Invalid default troop list - Stop auto.';
								DeactiveAttackOrder();
								createCookie(villagekey+'lastattackreport', v.innerHTML,365);
								switchphase = 1;
								breakcase = 1;
								return;
						}
					
					}
					if (breakcase == 1) break;
					
					createCookie(villagekey+'troopcapacity', troopcapa, 365);
					
					//set coordinate
					var x = 0;
					var y = 0;
					//get how many village
					var v = villagelist.split("\n");
					var anotherattacktype = -1;
						
						if (currentvillage >= v.length)
						{
							currentvillage = 0;
							createCookie(villagekey+'currentvillage' , 0, 365);
						}
						
						var cc = trim(v[currentvillage]).split(' ');
						x = parseInt(cc[0]);
						y = parseInt(cc[1]);
						
						//xem co set loai attack type khac ko?
						var cc2 = trim(v[currentvillage]).split('#');
						if (cc2.length >=  2)
							anotherattacktype = 1; //normal attack
						
						if (cc[0].length==0)
						{
							currentvillage++;
							createCookie(villagekey+'currentvillage' , currentvillage, 365);
							break
						}
						
						createCookie(villagekey+'lastcoordinate', x+' '+y, 10);
					//set attack type
					var tt = attackinfo.split(' ');
					var controlf = find("//input[@name='c']", XPList);
					var ttype = parseInt(tt[0]);
					if (anotherattacktype != -1)
						ttype = anotherattacktype;
					for (var i=0;i<controlf.snapshotLength;i++)
					{
					
						var atttype = controlf.snapshotItem(i);
						if (ttype == i)
							atttype.checked = true;
						else
							atttype.checked = false;
					}
					
					var controlf = find("//input[@name='x']", XPList);
					var elementf = controlf.snapshotItem(0);
					elementf.value = x;
					
					var controlf = find("//input[@name='y']", XPList);
					var elementf = controlf.snapshotItem(0);
					elementf.value = y;
						
					createCookie(villagekey+'attackstep', (step+1), 365);
					var v = get('atkstatus');
					v.innerHTML = 'Step 2 - Complete filled';
					

					break;
				case 2:
					//just submit form
					//everything alreadight.. let go to next page
					createCookie(villagekey+'attackstep', (step+1), 365);
					var v = get('atkstatus');
					v.innerHTML = 'Step 3 - Submit page';
					createCookie(villagekey+'lastattackreport', v.innerHTML,365);
					//check is correct a2b page.
					var t = get('lmid2');
					if (t != null)
					{
						xx = t.innerHTML.substring(t.innerHTML.indexOf('<h1')+4, t.innerHTML.indexOf('</h1>'));
						if (xx.indexOf('Siųsti karius') == -1)
						{
							//DeactiveAttackOrder();
							createCookie(villagekey+'attackstep', 0, 365);
							createCookie(villagekey+'lastattackreport', 'Wrong send troop page', 365);
							OpenRandomPage();
							break;
						}
					}
					mybtm1('s1','','img/en/b/ok3.gif',1);
					mybtm1('s1','','img/en/b/ok2.gif',1);
					mybtm0();
					document.forms[0].submit();
					break;
				case 3:
					//just submit form
					//everything alreadight.. let go to next page
					
					var v = get('atkstatus');
					v.innerHTML = 'Step 4 - Lauch Troop';
					createCookie(villagekey+'lastattackreport', v.innerHTML,365);
					//check is correct a2b page.
					var t = get('lmid2');
					if (t != null)
					{
					    //co phai dang van o trang troop page??
						xx = t.innerHTML.substring(t.innerHTML.indexOf('<h1')+4, t.innerHTML.indexOf('</h1>'));
						if (xx.indexOf('Siųsti karius') != -1)
						{
							var vv = getNode("//div[@class='f10 e b']");
							//co rerror. Toi lang khac....
							if (vv != null)
							{
								createCookie(villagekey+'currentvillage', (parseInt(g_currentvillage)+1), 365);	
								createCookie(villagekey+'attackstep', 0, 365);
								//new player
								
								if (vv.innerHTML.indexOf('Beginner') != -1)
								{
									var x = getNode("//input[@name='x']");;
									var y = getNode("//input[@name='y']");;
									if (x != null && y != null && x.value != '' && y.value != '')
										createCookie(server+x.value+'a'+y.value+'protect', vv.innerHTML.substring(28, 48), 10);
								}
								else
								//invalid village
								{
									var x = getNode("//input[@name='x']");
									var y = getNode("//input[@name='y']");
									var lll = readCookie(villagekey+'invalidcoord');
									var ppp = readCookie(villagekey+'lastcoordinate');
									if (lll == null) lll = '';
									if (ppp != '')
									{
										var ppp = '<Br>'+ppp;
										if (lll.indexOf(ppp) == -1)
											lll = lll + ppp;
									}
														
									createCookie(villagekey+'invalidcoord', lll,4);
								}
								
								createCookie(villagekey+'lastattackreport', 'Send troop error - may be village still in protect or wrong address',365);
								if (trim(g_villagelist) == '')
									DeactiveAttackOrder();
								if (scanmap != 1)
								OpenRandomPage();
								break;
							}
						}
						else
						{
							xx = t.innerHTML.substring(t.innerHTML.indexOf('<h1')+4, t.innerHTML.indexOf('</h1>'));
							if (xx.indexOf('Reinfor') == -1 && xx.indexOf('Ataka') == -1 && xx.indexOf('Reidas') == -1)
							{
								createCookie(villagekey+'attackstep', 0, 365);
								createCookie(villagekey+'lastattackreport', 'Wrong lauch troop page',365);
								OpenRandomPage();
								break;
							}
						}
					}
					//clear protection mark
					var x = getNode("//input[@name='x']");
					var y = getNode("//input[@name='y']");
					if (x != null && y != null && x.value != '' && y.value != '')
					{
						var pp= readCookie(server+x.value+'a'+y.value+'protect');
						if (pp == null)
							createCookie(server+x.value+'a'+y.value+'protect', 'Passed', 10);
					}
					
					createCookie(villagekey+'attackstep', 4, 365);
					
					var vv = find("//td[@width='50%']", XPList);
					var tim = 0;
					for (i=0;i<vv.snapshotLength;i++)
					{
						var tt = vv.snapshotItem(i);
						if (tt !=null && tt.innerHTML.indexOf('po') == 0)
						{
							tim = t_format1(tt.innerHTML.substring(tt.innerHTML.indexOf('in')+3, tt.innerHTML.indexOf('hrs')));
						}
					}
					
					v.innerHTML = 'Step 4 - Everything already - Lauch Troop - Troop will return in '+ t_format2(tim*2+30) + ' seconds';
					createCookie(villagekey+'lastattackreport', v.innerHTML,365);
					//get time to travel to that village
					
					if (tim>0)
						createCookie(villagekey+'atkwaittimeout', (tim*2+40), 365);
					else
						createCookie(villagekey+'atkwaittimeout', 0, 365);
					
					if (scanmap != 1)
					{
						mybtm1('s1','','img/en/b/ok3.gif',1);
						mybtm1('s1','','img/en/b/ok2.gif',1);
						mybtm0();
						document.forms[0].submit();
					}
					else
					{
						v.innerHTML = 'Step 4 - Scan map: This village now recorded';
						createCookie(villagekey+'lastattackreport', v.innerHTML,365);
					}
					break;
				case 4:
					//set wait time...
					var v = get('atkstatus');
						v.innerHTML = 'Step 5 - Go to next village';
						createCookie(villagekey+'lastattackreport', v.innerHTML,365);
						createCookie(villagekey+'attackstep', 0, 365);
						createCookie(villagekey+'currentvillage', (parseInt(g_currentvillage)+1), 365);
					
					break;
			}
		}		
	}
	clearTimeout(g_attackHandle);
	if (nexttimeout > (6*60*1000) || nexttimeout <= 0 ) nexttimeout = 5000;
	g_attackHandle = setTimeout(function() { ExecuteAttackOrder(); }, nexttimeout);
	
	// add a zero in front of numbers<10
	var vv = getCurrentTime() +  Math.floor(nexttimeout/1000);
	createCookie(villagekey+'attackTimeout', vv, 265);

	if (switchphase)
		switchPhase(g_whichphase);	
	else
	if (openrandom)
		OpenRandomPage();
}

function toggleForm()
{
	var v=document.getElementById('formtroop'); 
	var s = "";
	if (v!= null && v.style.visibility=='visible') 
	{
		v.style.visibility = 'hidden'; 
		v.style.position = "absolute";
		s = " position: absolute";
	}
	else 
	{
	v.style.visibility = 'visible';
	v.style.position = "";
	}

	createCookie('formtroop', ' style="visibility: '+v.style.visibility+ ';'+ s+';"', 365);
}



///////////////////////////////////////////////////////////
// SCAN MAP
///////////////////////////////////////////////////////////
function ScanMap()
{ 
	var divcontent = get('scanmapcontent');
	if (divcontent != null)
	{
	var content='<table class="tbg" style="font-size:11px;" cellpadding="2" cellspacing="1"><tr class="rbg"><Td>Village Name</td><td>Username</td><td>Alliance</td><td width="40">Pop</td><td width="40">Coord</td><td width="100" nowrap>Grow rate</td><td>Protectday</td><td>Farmlist</td></tr>';
	
	//build content
	var tbls = find("//area", XPList);
	var today=new Date();
	var d=parseInt(today.getDay());
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	
	for (i2 = 0;i2<7;i2++)
	for (i=0;i<7;i++)
	{
		var v = unsafeWindow.m_c.ad[i2][i];
		//ko phai empty node..
		if (v.dname != null )
		{
			
			//map('5ludak8`s village','5ludak8','12','','142','17')"
			var vname = v.dname;
			var vlink = v.href;
			var valliance = v.ally;
			var uname = v.name;
			var pop = v.ew;
			var x = v.x;
			var y = v.y;
			
			//laythong tin lang
			var vinfo = readCookie(server+x+'a'+y+'day1');
			var status = '<b>Unknown</b>';
			var daygrow = '';
			var vinfo2 = null;
			var vinfo3 = null;
			
			if (vinfo != null)
			{
				//lay thong tin ngay hom qua va hom truoc
				vinfo2 = readCookie(server+x+'a'+y+'day2');
				if (vinfo2 != null)
					vinfo3 = readCookie(server+x+'a'+y+'day3');
			}
			
			//phan tich du lieu...
			if (vinfo3 != null)
				daygrow = vinfo3;
			if (vinfo2 != null)
				daygrow += ' '+vinfo2;
			if (vinfo != null)
				daygrow += ' '+vinfo;
			daygrow += ' '+pop;
			
			var protectday = readCookie(server+x+'a'+y+'protect');
			if (protectday !=null)
				status = protectday;
			
			var ccurentday = readCookie(server+x+'a'+y+'daymark');
			//record all these to cookie
			if (ccurentday == null)
				createCookie(server+x+'a'+y+'daymark', d, 7);
			else
				//qua ngay moi.. doi thong tin cu
				if (parseInt(ccurentday) != d)
				{
					if (vinfo2 != null)
						createCookie(server+x+'a'+y+'day3', vinfo2, 7);
					if (vinfo != null)
						createCookie(server+x+'a'+y+'day2', vinfo, 7);
					createCookie(server+x+'a'+y+'day1', pop, 7);

					createCookie(server+x+'a'+y+'daymark', d, 7);
				}
			
			//co' trong danh sach farm????
			var vlist = readCookie(villagekey+'villagelist');
			var found = 0;
			if (vlist != null)
			{
				var varray = vlist.split("\n");
				
				for (k=0;k<varray.length;k++)
				{
					var coord = varray[k].split(' ');
					if (parseInt(coord[0]) == x && parseInt(coord[1]) == y)
					{
						found = 1;
						break;
					}
				}
			}
			var inlist = 'yes';
			if (found == 0)
				inlist='<a href="#" onclick="var uu=document.getElementById(\'villist\'); uu.value += \'\\n'+x+' '+y+' '+uname+'\'; this.innerHTML = \'Added\'; return false;">Add</a>';
			
			if (vname != '')
				content += '<tr><td class="s7"><a href="'+vlink+'">'+vname+'</a></td><td class="s7">'+uname+ '</td><Td>'+valliance+ '</td><td>'+pop+'</td><td>'+ x+':'+y+'</td><td nowrap>'+daygrow+'</td><td>'+status+'</td><td>'+inlist+'</td></tr>';
		}
		
	}
	content += '</table>';
	divcontent.innerHTML = content;
	}
}
// End game functions
//=====================================================
 
 //===============================================
 //Code
 //------------------------------------------------------------------------
if (1) //chi la code folder cho gon
{
var username = '';
var vv = find('//a[@href]', XPList);
for (i=0;i<vv.snapshotLength; i++)
{
	var vvv = vv.snapshotItem(i);
	if (vvv != null && vvv.href.indexOf('chatname')!=-1)
		username = vvv.href.substring(vvv.href.indexOf('|')+1,vvv.href.length);
}
 

 //xac dinh ten lang
 var villagename = '';
 
 if (location.href.indexOf('dorf1') != -1)
 {
	var t = get('lmid2');
	if (t != null)
	{
		var vv = find('//h1', XPList);
		//villagename = t.innerHTML.substring(t.innerHTML.indexOf('<h1')+4, t.innerHTML.indexOf('</h1>'));
		if (vv != null && vv.snapshotLength > 0)
		{
			var xx = vv.snapshotItem(0);
			villagename = xx.innerHTML;
		}
		createCookie(username+'vkey', villagename,365);
	}
}
else
	villagename = readCookie(username+'vkey');
	
var kkk = getNode('//a[@class="active_vl"]');
if (kkk != null)	
	villagename = kkk.innerHTML;
	
var villagekey = villagename.substring(0, villagename.indexOf(' '));	
if (villagekey == '') villagekey = villagename;


villagekey = username+villagekey;


var buildlist = readCookie(villagekey+'buildlist');
if (buildlist == null) buildlist='';

var g_atkactive = readCookie(villagekey+'g_atkactive');
if (g_atkactive == null) g_atkactive = false;

var g_trooplist = readCookie(villagekey+'trooplist');
if (g_trooplist == null) g_trooplist = '';

var g_attackinfo = readCookie(villagekey+'attackinfo');
if (g_attackinfo == null) g_attackinfo = '';

var g_villagelist = readCookie(villagekey+'villagelist');
if (g_villagelist == null) g_villagelist = '';

var g_currentvillage = readCookie(villagekey+'currentvillage');
if (g_currentvillage == null) g_currentvillage = 0;

var g_attacktimeout = readCookie(villagekey+'attackTimeout');
if (g_attacktimeout == null) g_attacktimeout = 0;

var g_toggleForm = readCookie('formtroop');
if (g_toggleForm== null) g_toggleForm = '';

var g_whichphase = readCookie(villagekey+'whichphase');
if (g_whichphase == null) g_whichphase = 'troop';

var g_automulti = readCookie(username+'automulti');
if (g_automulti == null) g_automulti = 0;

if (g_atkactive == false && g_whichphase == 'troop')
	g_whichphase='build';


//get last timeout setting

// add a zero in front of numbers<10
var vv = getCurrentTime();
vv = g_attacktimeout - vv;
if (vv <=0) vv=10000; 
else if (vv > (6*60*1000)) vv = 5000; //fix bug 23:59'
else vv = vv*1000;
var g_attackHandle = setTimeout(function() { ExecuteAttackOrder(); }, vv); //10 giay check 1 lan 
setTimeout(function() { UpdateExecuteTimeOut(); }, 500);

//=====================================================
//Add scan map link
if (window.location.href.match(/karte\.php/))
{
	var mapcontent = getNode("//div[@class='map_insert_xy']");
	if (mapcontent != null)
	{
		var s = "Scan map";
			var statlink4 = elem('a', s);
			statlink4.href = "javascript:void(0);";
			statlink4.addEventListener("click", function(){ ScanMap(); return false; }, 0);
			mapcontent.appendChild(statlink4);
		var d = div('<div id="scanmapcontent" style="position:relative;left:-100px"></div>');
		mapcontent.appendChild(d);
	}
}
} // 1
//=====================================================
 //---------- Right content  -----------------
	
   //var rightcontent = document.getElementById('ce');
   var rightcontentm = div('<div style="position:absolute; top:0px; left: 1000px; top: 100px; width:800px;" id="ce1"><table><tr><td><div id="rightcontent"></div></td><td><div id="rightcontent2"></div</td></tr></table></div>');
   document.body.appendChild(rightcontentm);
   var rightcontent = document.getElementById('rightcontent');
   var rce = document.getElementById('lright1');
   if (rce == null)
     rce = document.getElementById('ce');
   var rrr = div('<table><tr><td><div id="holding"></div></tr><Table>');
   rightcontent.appendChild(document.createElement("br"));
   rightcontent.appendChild(rrr);
   var holding = document.getElementById('holding');
   if(rightcontent != null) 
	{ 
		dcontent = '<table style="border:1px solid  #cccccc;width:300px"><Tr><Td><b>AUTO SEND TROOP</b></td><tr>'+
			'<tr><td><hr></div><div id="attacktimeout"></div><div id="atkstatus"></div><hr><div id="divtrooplink2"></div><Br><i>Current Village index:</i>'+g_currentvillage+'<br></td><hr></tr></table>';
		var br = document.createElement("br");
		var vvvvvv = div(dcontent);
		holding.appendChild(vvvvvv);
		
		//Create resource Infor mation
		dcontent = '<b>VillageName: '+villagename+' <span style="font-size:9px">VillageKey:'+villagekey+'</b></span><br><table style="border:0px solid;font-size:9px"><tr><td>Wood</td><td>Clay</td><td>Icon</td><td>Crop</td></tr>'
					+ '<tr><td id="aa1"></td><td id="aa2"></td><td id="aa3"></td><td id="aa4"></td></tr>'
					+ '</table><Br>Auto Reconnect is:  '+ g_reconnect+' <div id="autologin"></div>';
					
		var res = div(dcontent);	 
		//Crease list of sequence link
		//create troop dispacth
		dcontent = '<table style="border:1px solid  #cccccc;width:300px"><tr><td><b>AUTO SEND TROOP</td></tr>'+
		'</table><div id="divtrooplink"></div><div id="toggleForm"></div><div id="formtroop" '+g_toggleForm+'><table>'+
							'<tr><Td >Troop List:<br><input type="text" id="trooplist" value="'+g_trooplist+'" style="width:200px"></td></tr>'+
							'<tr><Td >Attack Infor:<br><input type="text" id="attackinfo" value="'+g_attackinfo+'"  style="width:200px;"></td></tr>'+
							'<tr><td >Village List: <Br><textarea id="villist" style="width:300px;height: 300px">'+ g_villagelist+'</textarea>'+
							'</td></tr>'+
							'<tr><td><div id="vidu"></div><a href="#" onclick="var vd = document.getElementById(\'vidu\'); if (vd.innerHTML==\'\') vd.innerHTML= \'<b>First field:</b> 1 20 4 -1<br>Means: send 20 phalax (if u r gaul) and send all TT<br><b>Second field</b>: There are five param. Only two first are compelled<Br><b>Param 1:Attack style:</b>0=ReâˆšÂ¨nor, 1=Normal,2=Raid.<br><b>Param 2.Your troop type:</b> 1=Teuton,2=Roman,3=Gaul<Br><b>Param 3. Num second delay before execute command.</b> 0 mean no delay.<Br><b>Param 4:</b>Start attack from which village in the list.<Br><b>Param 5:</b>Use scan map function(1) or no (empty)<br><b>An example:</b>2 1 60 13<br>mean: Raid (2) and playing Teuton (1), wait for 60 then start auto and attack the 13th village in the list.<Br><b>The third field: Village list: </b>There are two format: 1. Use the troop list in Field 2. <Br>2. Use customized troop only for this village.<Br>With first format: only need two param: x y. With the second format need 3 param: x y trooplist. The trooplist used this format: 123 123 @1 20 4 -1@langthangx. Means: Attach the village at 123 123 with 20 phalax and TT.\'; else vd.innerHTML=\'\'; return false;">Click to see guide</a></td></tr>'+
							'</table></div><div id="ce2"></div>';
		var formAttackList = div(dcontent);
		
		//add to right content
		rightcontent.appendChild(res);
		rightcontent.appendChild(formAttackList);
		//add links
		//attack troop link
		var statlink = elem('a', "Update&Reset &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    ");
		statlink.href = "javascript:void(0);";

		statlink.addEventListener("click", function(){ CreateAttackOrder(); return false; }, 0);
		var t = get('divtrooplink');
		t.appendChild(statlink);
		
		var t = get('divtrooplink2');
		var s = "Execute";
		if (g_atkactive)
			s = "Stop execute";
		statlink = elem('a', s);
		statlink.href = "javascript:void(0);";
		statlink.id = 'attacklnkid';
		statlink.addEventListener("click", function(){ g_atkactive = !g_atkactive; if (g_atkactive) { statlink.innerHTML = "Stop Execute"; createCookie(username+villagename+'active',1, 365); } else statlink.innerHTML="Execute"; createCookie(villagekey+'g_atkactive', g_atkactive, 365);  return false; }, 0);
		t.appendChild(statlink);
				
		//Aotu login link
		var t = get('autologin');
		
		
		var s = "Start Auto Reconnect";
		if (g_reconnect)
			s = "Stop Auto Reconnect";
		var statlink3 = elem('a', s);
		statlink3.href = "javascript:void(0);";
		statlink3.addEventListener("click", function(){ g_reconnect = !g_reconnect; if (g_reconnect) statlink3.innerHTML = "Stop Auto Reconnect"; else statlink3.innerHTML="Start Auto Reconnect"; createCookie('g_reconnect', g_reconnect, 265); return false; }, 0);
		t.appendChild(statlink3);
		
	if (getNumVillage() > 1)	
	{
		var s = "<Br>Stop Auto Multi Village" + ' '+g_automulti;
		if (g_automulti)
			s = "<Br>Running Auto On Multi Village"+ ' ' +g_automulti;
		var statlink9 = elem('a', s);
		statlink9.href = "javascript:void(0);";
		statlink9.addEventListener("click", function(){ g_automulti = !g_automulti; if (g_automulti) statlink9.innerHTML = "<Br>Æ’Ãªang auto nhiÂ·ÂªÃ…u lâˆšâ€ ng"; else statlink9.innerHTML="<Br>Stop Auto Multi Village"; createCookie(username+'automulti', g_automulti, 265); return false; }, 0);
		t.appendChild(statlink9);
	}
		
		var s = "<Br>Toggle Troop Form";
		var t = get('toggleForm');
		var statlink4 = elem('a', s);
		statlink4.href = "javascript:void(0);";
		statlink4.addEventListener("click", function(){ toggleForm(); return false; }, 0);
		t.appendChild(statlink4);
		
   }
//=====================================================
//Production && map check
//=====================================================

var g_lastatkreport = readCookie(villagekey+'lastattackreport');
if (g_lastatkreport != null)
{
	var v = get('atkstatus');
	v.innerHTML = g_lastatkreport;
}
//----------------------------------------------------------
// Lay so luong resource income
//createCookie(username+'villageres', '',1);
var rtd = [], prod = [], store = [], storeMax = [], secFull = [];
// find production, stored amount
var ress = ''; 
for(var i=0;i<4;++i) 
{
  rtd[i]   = get("l"+(i+1));
  if(!rtd[i]) break;
  
  prod[i]  = parseInt(rtd[i].title);
  store[i] = parseInt(rtd[i].textContent.match(/\-?(\d+)\//));
  storeMax[i] = parseInt(rtd[i].textContent.replace(/(\d+)\//,""));  
  if(prod[i] > 0) 
  {
    secFull[i] = (3600*(storeMax[i]-store[i])/prod[i]);
    var fullStr = t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3);
	if(store[i]==storeMax[i]) fullStr = "<b>" + fullStr + "</b>";
  }
  else 
  if(prod[i] < 0) 
  {
    secFull[i] = (3600*-store[i]/prod[i]);
    var fullStr = "<b>" +  t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3) + "</b>";
	if(secFull[i] < 8*3600) fullStr = "<span style='color:red'>" + fullStr + "</span>";
  } 
  else 
    var fullStr = "??";
	
  var insCell = get("aa"+(4-i));
  var t = document.createTextNode("(" +  (prod[i]<0?"":"+") + prod[i] + "," + fullStr +  ")");
  insCell.appendChild(t);
  ress = '<td style="width:50px;text-align:right"><B>' + store[i] + '</b></td><td style="width:50px">/' + storeMax[i] +'</td>'+ ress;
}
//createCookie(username+'villageres', '',1);
var vv = readCookie(username+'villageres');
if (vv == null) vv='';
var vvv = vv.split('<table');
var vx = '';
if (vvv.length == 0 || vv.indexOf(villagename) == -1)
	vx += '<table width="500px"><tr><td width="200px">'+villagename+':</td>'+ress+'</tr></table>';
var m = 0;
for (i=0;i<vvv.length;i++)
{
	if (vvv[i].indexOf(villagename) != -1)
	{
		if (m == 0)
		{
			vx += '<table width="500"><tr><td width="200px">'+villagename+':</td>'+ress+'</tr></table>';
			m = 1;
		}
	}
	else 
	 vx += '<table'+ vvv[i];
	 
	 
	
}

createCookie(username+'villageres', vx,1);
//createCookie(username+'villageres', '',1);

//vv = readCookie(villagekey+'troopcapacity')
//if (vv == null) vv = 0;
//document.title = "title" + vv+ server.substring(0, server.indexOf('.'));

//////////////////////////////////////////////////////
//check Protection...
//////////////////////////////////////////////////////
var vv = getNode("//div[@class='f10 e b']");
var t = get('lmid2');
					
if (vv != null && t != null)
{
	if (vv.innerHTML.indexOf('Beginner') != -1)
	{
		var x = getNode("//input[@name='x']");
		var y = getNode("//input[@name='y']");
		if (x != null && y != null && x.value != '' && y.value != '')
			createCookie(server+x.value+'a'+y.value+'protect', vv.innerHTML.substring(28, 48), 10);
	}
}

//mark unprotect
if (t != null && t.innerHTML.indexOf('Arrival') != -1)
{
	var x = t.innerHTML.substring(t.innerHTML.indexOf('(')+1, t.innerHTML.indexOf('|'));
	var y = t.innerHTML.substring(t.innerHTML.indexOf('|')+1, t.innerHTML.indexOf(')'));
	
	if (x != '' && y != '')
	{
		var pp = readCookie(server+x+'a'+y+'protect');
		if (pp == null )
			createCookie(server+x+'a'+y+'protect', 'Passed', 10);
		else if (pp.indexOf('Passed') == -1)
			createCookie(server+x+'a'+y+'protect', pp+'<br>Passed', 10);
	}
}

//////////////////////////////////////////////////////
// Get troop type


//////////////////////////////////////////////////////

// End code
/////////////////////////////////////////////////
//---------------------------------------------------------------------
// AUTO BUILD FUNCTIONS
//---------------------------------------------------------------------
////////////////////////////////////////////////

function addBuildItem()
{
	var vv=get("buildselect");
	var bb=get("tbuildlist"); 
	if (vv != null && c_buildinglist[parseInt(vv.value)].indexOf('Fill build res') != -1)
	{
		bb.value = '(0)\n(1)\n(2)\n(3)\n(4)\n(5)\n(6)\n(7)\n(8)\n(9)\n(10)\n(11)\n(12)\n(13)\n(14)\n(15)\n(16)\n(17)\njump 0';	
	}
	else	if (vv != null && c_buildinglist[parseInt(vv.value)].indexOf('Warehouse and Granary') != -1)
	{
		bb.value = '(23) #Warehouse\n(24) #Granary\njump 0';
	}
	else
	if (vv != null)
		bb.value += '('+vv.value+') #'+ c_buildinglist[parseInt(vv.value)]+ "\n";
}

function deactiveBuild()
{

	g_buildactive = false;
	createCookie(villagekey+'g_buildactive', g_buildactive, 365);
	var v = get('buildid');
	if (v)
		v.innerHTML = 'Execute';	
}


function updateBuildList()
{
	var vva = get("tbuildlist");
	if (vva.value.length > 0)
		createCookie(villagekey+"buildlist", vva.value, 364);
	else
	{
		alert(' Data not yet entered!!!');
		return;
	}
		
	createCookie(villagekey+'buildstep', 0, 365);	
	 createCookie(villagekey+"buildindex", 0 , 365);
	 createCookie(villagekey+'buildtimeout', 0, 365);
	deactiveBuild();
	alert("Ok. Data has been stored. Please click Execute to run");
}

function displayBuildStatus(content)
{
	var nn = get("buildstatus");
	if (nn != null)
	{
		if (content == '')
			content = readCookie(villagekey + "buildstatus");
		if (content == null) content = '';	
		nn.innerHTML = content ;
		createCookie(villagekey + "buildstatus", content, 365);
	}
}

function executeBuild()
{
	var currentindex = readCookie(villagekey+"buildindex");
	var buildlist = readCookie(villagekey+"buildlist");
	if (currentindex == null) currentindex = 0;
	var switchphase = 0;
	if (buildlist != null && trim(buildlist).length > 0)
	{
		var alist = trim(buildlist).split("\n");
			
		if (g_buildactive && alist.length > 0)
		{
			//kiem tra co' bi gioi han thoi gian?
			var vv =readCookie(villagekey+'buildtimeout');
			if (vv == null) vv = 0;
			var t = getCurrentTime();
			if (t < vv)
			{
				//chua den gio...
				t = (vv-t)*1000;
				if (t > (6*60*1000) || t <= 0) t = 5000; //fix bug 23:59
				setTimeout(function() { executeBuild(); }, t);
				displayBuildStatus("Not this time. Plese wait for " + (t/1000) + " second");
				return;
			}
			
			timewait = 5000; //mac nhien cho 5 giay
			//send troop is active
			
			if (g_whichphase !='build')
			{
				setTimeout(function() { executeBuild(); }, timewait);
				displayBuildStatus("System is busy. Not Autobuild turn yet. Phase="+g_whichphase);
				return;
			}
			
			if (currentindex >= alist.length) //da xay xong???
			{
				//deactiveBuild();
				displayBuildStatus("All build completed!");
				switchPhase(g_whichphase);
				return;
			}
			
			var blist = trim(alist[currentindex]);
			if (blist == '') //da xay xong???
			{
				//deactiveBuild();
				displayBuildStatus("All build completed!");
				switchPhase(g_whichphase);
				return;
			}
			
			//jump?
			
			if (alist[currentindex].indexOf('jump') != -1)
			{
				var nindex = alist[currentindex].split(' ');
				var nnn = parseInt(nindex[1]);
				if (nnn<0)
					currentindex = alist.length + nnn;
				else
					currentindex  = nnn;
				if (currentindex<0) currentindex = 0;
				setTimeout(function() { executeBuild(); }, 5000);
				createCookie(villagekey+"buildindex", currentindex, 365);
				displayBuildStatus("Jump to line :"+currentindex);
				return;
			}
			
			
			var step = readCookie(villagekey+"buildstep");
			if (step == null) step = 0;
			
			//xay cai gi day...
			var bid = parseInt(blist.substring(blist.indexOf('(')+1, blist.indexOf(')')));
			
			//building custom id
			if (bid ==  56)
				bid = parseInt(blist.substring(blist.indexOf('[')+1, blist.indexOf(']')));
			var custombuild = 0;
			if (blist.indexOf('Custom') != -1)
				custombuild = 1;
				
			displayBuildStatus("Building ID=" + bid+". Name: "+ c_buildinglist[bid] + ' Step:'+step);
			//xay resource...
			switch (step)
			{
				case 0: //goto build page
					if (bid <18 ) 
					{
						bid += 1;
						//di chuyen toi trang xay resource..
						location.href="http://"+server+"/build.php?id="+bid;
						createCookie(villagekey+'buildstep', 2, 365);
					}else
					if (custombuild)
					{
						location.href="http://"+server+"/build.php?id="+bid;
						createCookie(villagekey+'buildstep', 2, 365);
					}
					else
					{
						location.href="http://"+server+"/dorf2.php";
						createCookie(villagekey+'buildstep', step+1, 365);
					}
						
				break;
				case 1:
					//dung trang???
					if (!window.location.href.match(/dorf2\.php/))
					{
						displayBuildStatus("Wrong page - backto step0");
						createCookie(villagekey+'buildstep', 0, 365);
						break;
					}
					var cc = 'Step 1 - In progress';
					var bname = c_buildinglist[bid];
					if (bid>=53)
					{
						var ss = trim(bname).split(' ');
						bname = ss[0];
					}
					
									
					// Tim thu building do' co' ton tai hay chua?
						
					var vv = find('//area[@href]', XPList);
					var targetsite = 0;
					var found = 0;
					var targetlink ='';
				
					for (i=0;i<vv.snapshotLength;i++)
					{
						var kk = vv.snapshotItem(i);
						if (kk.title != null && kk.title.indexOf(bname) != -1) //da xay dung
						{
							found = 1;
							targetsite = kk.href.substring(kk.href.indexOf('id=')+3, kk.href.length);
							targetlink = kk.href;
							cc = '<Br>Building found: ' + kk.title+' Target site:'+targetsite+
							'<br>Target link:'+targetlink;
							break;
						}
						else if (kk.title != null && kk.title.indexOf('Building site')==0)
						{
							targetsite = kk.href.substring(kk.href.indexOf('id=')+3, kk.href.length);
							targetlink = kk.href;
						}
					}
					
					if (found == 0 && bid > 53) 
					{
						cc += '<br>Can not build troop. The barrack not built yet';
						cc += '<br>Skip this construction.. Move on next command';
						displayBuildStatus(cc);
						createCookie(villagekey+'buildstep', 0, 365);
						createCookie(villagekey+"buildindex", currentindex+1, 365);
						break;
					}
					
					if (found == 0 && targetsite > 0)
						cc = "<br>Build in new site: "+targetsite+'<br>Target link:'+targetlink;
					
					displayBuildStatus(cc);
					createCookie(villagekey+'buildstep', step+1, 365);
					createCookie(villagekey+'buildlocation', targetsite,365);
					if (targetlink != '')
						location.href= targetlink;
					break;
				case 2:
					
						//kiem tra co dung trang???
						var tt= get('lmid2');
						if (tt != null)
						{
							if (bid<18)
							{
								if (tt.innerHTML.indexOf('Wood') == -1 && 
								tt.innerHTML.indexOf('Clay') == -1 && 
								tt.innerHTML.indexOf('Iron') == -1 && 
								tt.innerHTML.indexOf('Crop') == -1  )
								{
									displayBuildStatus('Wrong page - go back step 1');
									createCookie(villagekey+'buildstep', 0, 365);
									break;
								}
							}
							else if (bid <=53)
							{
								if (!window.location.href.match(/build\.php/))
								{
									displayBuildStatus('Wrong page - go back step 1');
									createCookie(villagekey+'buildstep', 0, 365);
									break;
								}
							}
							else if (custombuild == 0)
							{
								var ss = trim(c_buildinglist[bid]).split(' ');
								bname = ss[0];
								if (tt.innerHTML.indexOf(bname) == -1)
								{
									displayBuildStatus('Wrong page - go back step 1');
									createCookie(villagekey+'buildstep', 0, 365);
									break;
								}
							}
						}
						//kiem tra current res..
						var cc = "Build ID: "+bid+"<Br>Res has " + store[3] + ' ' +  store[2] + ' ' + store[1] + ' ' + store[0] + ' Step:'+step;
						
						/////////////////////////////////////////////////
						//xay nha...
						if (bid <=52)
						{
						
						//kiem tra cost res..
						var found = 0;
						var foundlink = '';
						var vv=find('//table[@class="f10"]', XPList);
						var need = [999999999,999999999,999999999,999999999];
						var buildlocation = readCookie(villagekey+'buildlocation');
						if (buildlocation == null) buildlocation = 0;
						if (vv!= null && vv.snapshotLength > 0)
						{
							for (i=0;i<vv.snapshotLength;i++)
							{
								var kk = vv.snapshotItem(i);
								for (jj=0;jj<kk.rows.length;jj++)
									for (mm=0;mm<kk.rows[jj].cells.length;mm++)
									if (kk.rows[jj].cells[mm].innerHTML.indexOf('res') != -1)
									{
										
										oo = kk.rows[jj].cells[mm].innerHTML.split('>');
									if (oo.length > 4)
									{
										need[0] = parseInt(trim(oo[1].substring(0, oo[1].indexOf('|')-1)));
										need[1] = parseInt(trim(oo[2].substring(0, oo[2].indexOf('|')-1)));
										need[2] = parseInt(trim(oo[3].substring(0, oo[3].indexOf('|')-1)));
										need[3] = parseInt(trim(oo[4].substring(0, oo[4].indexOf('|')-1)));
										
														
										//kiem tra co dung building id
										var nextnode = vv.snapshotItem(i).nextSibling;
										while (nextnode != null)
										{
											if (nextnode.nodeName == 'A' || nextnode.nodeName == 'SPAN')
												break;
											nextnode = nextnode.nextSibling;
										}
										
									if (nextnode != null && nextnode.nodeName == 'A')
									{
										if (bid <18) //upgrade res..
										{
											var aid = bid+1;
											if (nextnode.href.indexOf('a='+aid)!=-1)
											{
												//chinh no...
												cc += '<Br>Upgrade Res field: '+c_buildinglist[bid] + '<br>Res cost: '+ need[0] +' '+ need[1] + ' '+ 
														' '+need[2] +' '+ need[3];
												jj = 9999999;
												mm = 9999999;
												found = 1;
												foundlink = nextnode.href;
												break;
											}
											else
											{
												//thu cac node tiep theo
											}
										}
										else if (custombuild==0)//xay dung cac cong trinh..
										{
											//new building...
											var aid = bid-18+5;
											if (nextnode.href.indexOf('id=') !=-1 && nextnode.href.indexOf('a='+aid) != -1 && nextnode.innerHTML.indexOf('Construct') != -1)
											{
												cc += '<Br>New building: '+c_buildinglist[bid] + '<br>Res cost: '+ need[0] +' '+ need[1] + ' '+ ' '+need[2] +' '+ need[3];
												jj = 9999999;
												mm = 9999999;
												i = 9999999;
												found = 1;
												foundlink = nextnode.href;
												break;
												
												
											}
											//upupgrade
											else
											if (nextnode.href.indexOf('a='+buildlocation)!=-1 && nextnode.innerHTML.indexOf('Upgrade') != -1)
											{
												cc += '<Br>Upgrade building: '+c_buildinglist[bid] + '<br>Res cost: '+ need[0] +' '+ need[1] + ' '+ ' '+need[2] +' '+ need[3];
												jj = 9999999;
												mm = 9999999;
												i = 9999999;
												found = 1;
												foundlink = nextnode.href;
												break;
												
											}
										}
										else (custombuild && nextnode.innerHTML.indexOf('Upgrade') != -1)
										{
											cc += '<Br>Upgrade building: '+bid + '<br>Res cost: '+ need[0] +' '+ need[1] + ' '+ ' '+need[2] +' '+ need[3];
												jj = 9999999;
												mm = 9999999;
												i = 9999999;
												found = 1;
												foundlink = nextnode.href;
												break;
										}
									}
									} //oo
							}
							
						}
						
						//check is enough 
						if (found == 1 && foundlink != '' && need[0] <= store[3] && 	need[1] <= store[2] && 	need[2] <= store[1] && need[3] <= store[0])
						{
							cc+='<Br>Ok..buildthui. <br>Link Build:'+foundlink;
							createCookie(villagekey+'buildstep', step+1, 365);
							//real build
							location.href=foundlink;
						}
						else
						{
							cc +='<Br>Not enough resource or wrong building or not availabe.<Br>Wait fo ' + (LONGDELAY/1000) + ' and Go back to step 0';
							//tro lai step 0
							createCookie(villagekey+'buildstep', 0, 365);
							createCookie(villagekey+'buildtimeout', (getCurrentTime()+(LONGDELAY/1000)), 365);
							switchphase = 1;
							//switchPhase(g_whichphase);
							//if (g_atkactive)
							//{
								//g_whichphase = 'troop';
								//createCookie(villagekey+'whichphase', g_whichphase, 365);
							//}
						}
						displayBuildStatus(cc);
					}
					} //if bid<53
					else
					////////////////////////////////////////////////////
					// Xay linh
					{
						//troop list...
						var blist = alist[currentindex].split('#');
						var tlist = blist[0].split(')');
						if (blist.length<2 || tlist.length <2) //invalid data
						{
							cc+="<br>Data is invalid. Skip this line";
							displayBuildStatus(cc);
							createCookie(villagekey+'buildstep', 0, 365);
							createCookie(villagekey+"buildindex", currentindex+1, 365);
							break;
						}
						
						//tach danh sach linh
						var troop = trim(tlist[1]).split(' ');
						var submitbtn = 0;
						for (i=0;i<troop.length;i+=2)
						{
							//trooptype
							var trooptype = parseInt(troop[i]);
							var troopnum = parseInt(troop[i+1]);
							//co du quan va res de xay?
							var node = getNode("//input[@name='t"+trooptype+"']");
							if (node != null)
							{
								//found...
								//xem co the xay dc bao nhieu linh?
								var canbuild = 0;
								var nn = find('//a[@href]', XPList);
								for (kk=0;kk<nn.snapshotLength;kk++)
								{
									var ii = nn.snapshotItem(kk);
									var bo = null;
									if (ii.getAttributeNode('onclick') != null)
										bo = ii.getAttributeNode('onclick').nodeValue.toString();
									if (ii.innerHTML.indexOf('(') == 0 && ii.innerHTML.indexOf(')') == (ii.innerHTML.length - 1) && bo != null && bo.indexOf('t'+trooptype+'.value') != -1)
									{
										
										var avail = parseInt(trim(bo.substring(bo.indexOf('.value')+7,bo.length)));
										cc+="<br>Click found - Troop type "+trooptype+": <br><b>Request: " + troopnum+' '+ ' Available:' + avail+'</b>';
									if (avail > 0)
									{
										if (troopnum == -1) //xay tat ca linh..
										{
											node.value = avail;
											cc+='<br>Data has been filled';
											submitbtn = 1;
										}
										else if (troopnum <= avail) //ok
										{
											node.value = troopnum;
											cc+='<br>Data has been filled';
											submitbtn = 1;
										}
										else if (troopnum > avail) //chua du res...
										{
										//tro lai step 0
											createCookie(villagekey+'buildstep', 0, 365);
											createCookie(villagekey+'buildtimeout', (getCurrentTime()+(LONGDELAY/1000)), 365);
											//switchPhase(g_whichphase);
											switchphase = 1;
											//if (g_atkactive)
											//{
												//g_whichphase = 'troop';
												//createCookie(villagekey+'whichphase', g_whichphase, 365);
											//}
											cc += '<br>A. Not enough res to build. Wait for 5 min.<br>Turn back to step 0';
											i=999999;
											submitbtn = 0;
											break;
										}										
									}
									else if (troopnum != -1)//ko available
									{
										createCookie(villagekey+'buildstep', 0, 365);
										createCookie(villagekey+'buildtimeout', (getCurrentTime()+(LONGDELAY/1000)), 365);
										switchphase = 1;
										//switchPhase(g_whichphase);
										//if (g_atkactive)
										//{
											//g_whichphase = 'troop';
											//createCookie(villagekey+'whichphase', g_whichphase, 365);
										//}
										cc += '<br>B.  Not enough res to build. Wait for 5 min.<br>Turn back to step 0';
										i=999999;
										submitbtn = 0;
										break;
									}	
										
									} //if ii
								}
							}
							else
							{
								cc+='<br>Not researched this troop yet. index='+trooptype;
								cc+="<br>Data is invalid. Skip this command";
								displayBuildStatus(cc);
								createCookie(villagekey+'buildstep', 0, 365);
								createCookie(villagekey+"buildindex", currentindex+1, 365);
								submitbtn = 0;
								break;
							}
							
						}
						displayBuildStatus(cc);
						if (submitbtn == 1)
						{
							mybtm1('s1','','img/en/b/b2.gif',1);
							mybtm1('s1','','img/en/b/b3.gif',1);
							mybtm0();
							document.forms[0].submit();
						}
						createCookie(villagekey+'buildstep', step+1, 365);
					}
					
					break;
				case 3: //da build xong...
						//go to next village
						displayBuildStatus("SUCCESS:Building... <Br>return step 0 va move on next building");
						createCookie(villagekey+'buildstep', 0, 365);
						createCookie(villagekey+"buildindex", currentindex+1, 365);
					break;
			}
			
			//recall in next 5 giay
			var g_buildHandle = setTimeout(function() { executeBuild(); }, timewait); //10 giay check 1 lan 
			if (switchphase)
			{
				//alert('Swichphase = '+ g_whichphase);
				switchPhase(g_whichphase);
				
			}
		} //g_buildactie
	}
	else
		deactiveBuild();
}
///////////////////////////////////
// Constant and var
var c_buildinglist = 
			['Wood id.1', 'Crop id.2', 'Wood id.3', 'Iron id.4', 'Clay id.5', 'Clay id.6', 'Iron id.7',
				'Crop id.8', 'Crop id.9', 'Iron id.10', 'Iron id.11' , 'Crop id.12', 'Crop id.13',
				'Wood id.14', 'Crop id.15', 'Clay id.16', 'Wood id.17', 'Clay id.18',
				'Sawmill', 'Brickyard', 'Iron Foundry', 'Grain Mill', 'Bakery', 'Warehouse', 'Granary', 
				'Blacksmith', 'Armoury', 'Tournament Square', 'Main Building', 'Rally Point',
				'Marketplace', 'Embassy', 'Barracks', 'Stable', 'Workshop', 'Academy', 'Cranny', 'Town Hall',
				'Residence', 'Palace', 'Treasury', 'Trade Office', 'Great Barracks', 'Great Stable', 'City Wall',
				'Earth Wall', 'Palisade', 'Stonemason', 'Brewery', 'Trapper', 'Hero\'s Mansion', 'Great Warehouse',
				'Great Granary', 'Wonder of the World', 'Barracks (Build Troops)', 'Stable (Build Troops)', 'Custom Building', 'Fill build res', 'Warehouse and Granary']; //54 , 55
var g_buildactive = readCookie(villagekey+ 'g_buildactive');
if (g_buildactive == null) g_buildactive = 0;

if (g_buildactive == false && g_whichphase == 'build')
	g_whichphase = 'troop';

var g_buildlist = readCookie(villagekey+"buildlist");
if (g_buildlist == null) g_buildlist = '';

var g_buildtimeout = readCookie(villagekey+"buildtimeout");
if (g_buildtimeout == null) g_buildtimeout = 0;

var g_buildindex = readCookie(villagekey + "buildindex");
if (g_buildindex == null) g_buildindex= 0;

// add a zero in front of numbers<10
//var vv = getCurrentTime();
//vv = g_buildtimeout - vv;
//if (vv <=0) vv=5000; 
//else vv = vv*1000;
var g_buildHandle = setTimeout(function() { executeBuild(); }, 5000); //10 giay check 1 lan 



////////////////////////////////////////////
// Content
 var rightcontent = document.getElementById('rightcontent2');
   if(rightcontent != null) 
   {
		var dv2 = '<table><tr><td><B>AUTO BUILD</b></td>'+
		'<tr><td><hr><div id="buildstatus"></div><Br>Building Number : '+g_buildindex+'<hr></td></tr>'+
			'<tr><td><div id="buildlink2"></div><hr></td></tr></table>';
		var dv2e = div(dv2);
		var br = document.createElement("br");
		holding.appendChild(br);
		holding.appendChild(dv2e);
		
		var dbuildcontent = '<table><tr><td><B>AUTO BUILD</b></td>'+
			'<tr><td><div id="buildlink"></div><hr></td></tr>'+
			'<tr><td>Build Sequence:</td></tr>'+
			'<tr><td><textarea name="tbuildlist" id="tbuildlist" style="width:300px;height:200px">'+g_buildlist+'</textarea></td></tr>'+
			'<tr><td>Choose building to add to list<br><select id="buildselect">';
			
		for (i=0;i<c_buildinglist.length;i++)
		{
			dbuildcontent += '<option value="'+i+'">'+c_buildinglist[i]+'</option>';
		}

		dbuildcontent += '</select><div id="buildlink1"></div></td></tr>';
		dbuildcontent += '</table>';
		var d = div(dbuildcontent);
		rightcontent.appendChild(d);
   
		var s = "Update&Reset&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var t = get('buildlink');
		var statlink1 = elem('a', s);
		statlink1.href = "javascript:void(0);";
		statlink1.addEventListener("click", function(){ updateBuildList(); return false; }, 0);
		t.appendChild(statlink1);
		
		var t = get('buildlink2');
		var s = "Execute";
		if (g_buildactive)
			s = "Stop execute";
		var statlinka = elem('a', s);
		statlinka.href = "javascript:void(0);";
		statlinka.id = 'buildid';
		statlinka.addEventListener("click", function(){ g_buildactive = !g_buildactive; if (g_buildactive) {statlinka.innerHTML = "Stop Execute"; createCookie(username+villagename+'active',1, 365); } else statlinka.innerHTML="Execute"; createCookie(villagekey+'g_buildactive', g_buildactive, 365);  return false; }, 0);
		t.appendChild(statlinka);
		
		var s = "<Br>Add this item";
		var t = get('buildlink1');
		var statlink4 = elem('a', s);
		statlink4.href = "javascript:void(0);";
		statlink4.addEventListener("click", function(){ addBuildItem(); return false; }, 0);
		t.appendChild(statlink4);

	}
	
	displayBuildStatus("Next execute in 5 seconds");

if (g_atkactive == true || g_buildactive == true)
	createCookie(username+villagename+'active',1, 365);
else if (g_atkactive == false && g_buildactive == false)
	createCookie(username+villagename+'active',0, 365);
	
///////////////////////////////////////////////////////////	
//. SHOW HIDE AUTO

function showhideAuto()
{
	var tt = readCookie('hideauto');
	if (tt == null)
		tt = 0;
	var v=document.getElementById('rightcontent'); 
	var s = "";
	if (v!= null && tt == 1) 
	{
		v.style.visibility = 'hidden'; 
	}
	else 
	{
		v.style.visibility = 'visible';
	}
	
}

	
/////////////////////////////////////////////////
// MESSAGE REPORT POPUP LINK
//


if (window.location.href.match(/(be|nach)richte\.php/))
{
 var w = window.innerWidth;;
 var h = window.innerHeight;

 var popW = 700, popH = 600;

 var leftPos = (w-popW)/2, topPos = (h-popH)/2;

 for (var i = 0; i < document.links.length; i++) {
     var a = document.links[i];   
     if (a.href.search(/(be|nach)richte[n]?[.]php[?]id=/i) != -1) {
        // a.setAttribute("onclick", "window.open('" + a.href + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");       
		a.setAttribute('target' ,'_blank');
     }
 }
} 

///////////////////////////////////////////////////////
// ATTACK CHECKING - ALERT
// http://speed.travian.com/dorf1.php


//0-------------------------------------
function showcheckmsg(content)
{
	var vv = get('checkatk');
	if (vv!= null)	
		vv.innerHTML += content;
}

function playAlertSound()
{
		var mpegdiv = document.createElement("div");
		var mpegobject = document.createElement("object");
		mpegobject.type = "audio/mpeg";
		mpegobject.data = "http://localhost/b.mp3";
		mpegobject.width = 200;
		mpegobject.height = 20;
		var mpegsrcparam = document.createElement("param");
		mpegsrcparam.name = "src";
		mpegsrcparam.value = "http://localhost/b.mp3";
		mpegdiv.appendChild(mpegobject);
		mpegobject.appendChild(mpegsrcparam);
		document.body.appendChild(mpegdiv);
}

function resetattackcheck()
{
	checkindex = parseInt(readCookie(username+'checkvindex'));
	maxnum = parseInt(readCookie(username + 'checkvmax'));
	for (i=0;i<maxnum;i++)
	{
		createCookie(username+'checkvcount'+i, 0 , 10);
	}
	createCookie(username+'atkchecklasttime', getCurrentTime(), 10);
}
function checkvillage()
{
	checkindex = parseInt(readCookie(username+'checkvindex'));
	maxnum = parseInt(readCookie(username + 'checkvmax'));
	inatkcheck = readCookie(username + 'inatkcheck');
	chkactive = readCookie(username + 'chkactive');
	
	if (maxnum == null) return;
	if (inatkcheck == null) return;
	if (chkactive == null) return;
	
	
	//alert('here ' + chkactive + '.' + inatkcheck+'.'+checkindex+'.'+maxnum);
	
	if (!chkactive) return;
	
	if (inatkcheck != 2) return;
	
	if (checkindex < maxnum)
	{
		var vlink = readCookie(username+'checkvlink'+checkindex);
		var vname = readCookie(username+'checkvname'+checkindex);
		var vcount = readCookie(username+'checkvcount'+checkindex);
		if (vcount == null) vcount = 0;
		vcount = parseInt(vcount);
		showcheckmsg('<br><b>Checking:</b>'+vname);
		//send a xml request
		//check atk value
		var currentdocument = xhr(vlink);
	
		if (currentdocument.length>0 && currentdocument.indexOf("att1.gif") != -1) 
		{
			
			currentdocument = currentdocument.substring(currentdocument.indexOf("att1.gif"), currentdocument.length);
			var tt = currentdocument;
			currentdocument = currentdocument.substring(0, currentdocument.indexOf("</b>"));
			
			currentdocument = currentdocument.substring(currentdocument.lastIndexOf(" ")+1);
			var atkcount = parseInt(currentdocument);
			tt = tt.substring(tt.indexOf('time'), tt.length);
			tt = tt.substring(7, tt.indexOf('</span>'));
			var atktime = tt;
			var ss = '';
			if (vcount == 0)
			{
				ss = '<br><b>BAODONG: ON</b>';
				if (readCookie(username+'alertpopup') == 1)
					alert('Co tan cong !');
				if (readCookie(username+'alertsound') == 1)
					//playAlertSound();
					window.open(g_alertsoundlink, 'win1');
					
			}
			else
				ss = '<Br>Da bao dong';
			createCookie(username+'checkvcount'+checkindex, atkcount, 10);
			showcheckmsg('<br><span style="color:#FF0000;">Co tan cong: ' + atkcount+ ' Thoigian= ' + atktime+ss+'</span>');
			
		}
		else
			createCookie(username+'checkvcount'+checkindex, 0, 10);
		
		checkindex++;
		createCookie(username+'checkvindex', checkindex, 10);
	}
	
	//check xong het rui.. tat check phase
	if (checkindex >= maxnum)
	{
		createCookie(username+'inatkcheck', 0, 365);
		var rlink = readCookie(username+'checkvreturnlink');
		var currentdocument = xhr(rlink);
		showcheckmsg('<Br><span style="color:#0000ff">--Check xong goi--</span>');
		
		g_whichphase = 'build';
		if (g_buildactive == false)
			switchPhase(g_whichphase);
		else
		{
			createCookie(villagekey+'whichphase', g_whichphase, 365);
			OpenRandomPage();
		}
			
	}
}

function checkvillagesatk()
{
	//lay id link cua tung lang
	var xpathResult = find("id('lright1')/table/tbody/tr/td/a[contains(@href, 'newdid=')]", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	if (xpathResult.snapshotLength > 0)
	{
	
	createCookie(username+'inatkcheck', 2, 365);
	
	//tro ve lai lang active
		var kkk = getNode('//a[@class="active_vl"]');
		var activevil = '';
		if (kkk != null)
			var activevil = kkk.innerHTML;
			
		createCookie(username+'checkvindex', 0, 10);	
		createCookie(username+'checkvmax', xpathResult.snapshotLength,10);
	for (var i=0;i<xpathResult.snapshotLength;i++)
	{
		var item = xpathResult.snapshotItem(i);
		var newid = item.href.substring( item.href.indexOf("newdid"),  item.href.length);
		var vilname = item.innerHTML;
		
		if (newid.indexOf("&") != -1) {
			var newid = newid.substring(0, newid.indexOf("&"));
			}
			
		var valink = item.href.substr(0, item.href.lastIndexOf("/"))+"/dorf1.php?"+newid;
		//g_chkvillagelink[i] = valink;
		createCookie(username+'checkvlink'+i, valink,10);
		createCookie(username+'checkvname'+i, vilname,10);
		createCookie(username+'checkvatkcount'+i, 0,10);
		
		if (vilname == activevil)
		{
			createCookie(username+'checkvreturn', i,10);
			createCookie(username+'checkvreturnlink', valink,10);
		}
		//g_chkvillagename[i] = vilname;
		//g_chkatkcount[i] = 0;
		setTimeout(function () { checkvillage(); }, i*10000); //3 giay 1 lang
		//thiet lap tro lai lang active
		//if (vilname == activevil)
		//	setTimeout(function () { location.href = g_chkreturn; }, (xpathResult.snapshotLength)*1000); //3 giay 1 lang
	}
	
	}
	else //chi co 1 lang
	{
		
	}
}


var g_chkvillagelink = new Array();
var g_chkvillagename = new Array();
var g_chkatkcount = new Array();
var g_chkreturn = '';
var g_checkindex = readCookie(username+'checkvindex');
if (g_checkindex == null) g_checkindex = 0;

var g_inatkcheck =readCookie(username+'inatkcheck');
if (g_inatkcheck == null) g_inatkcheck = 0;

var g_chkactive = readCookie(username+'chkactive');
if (g_chkactive == null) g_chkactive = 0;

//if (g_whichphase == 'atkcheck') switchPhase(g_whichphase);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if (g_inatkcheck == 1)
	checkvillagesatk();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var g_atkchecknext = readCookie(username+'atkchecklasttime');
if (g_atkchecknext == null) g_atkchecknext = 0;

var vv =getCurrentTime();
var stime = parseInt(g_atkchecknext)-vv;
if (stime >1000)
 readCookie(username+'atkchecklasttime', getCurrentTime()+100, 4);
 
stime = stime + ' giay';

if (g_chkactive==0) stime = '';
//--------------------------------
// Add left content
	var folder = div('-----------------<Br><B>Under Attack Alerter:</b><Br><div id="alertholder" style="border-style:1px solid #000000"><div>');
	if (g_chkactive)
		s = "Alert Active: ON";
	else
		s = "Alert Active: OFF";
	var linkb = elem('a', s);
	linkb.href = "javascript:void(0);";
	linkb.addEventListener("click", function(){ g_chkactive = !g_chkactive; if (g_chkactive) { linkb.innerHTML = "Alert Active: ON"; } else { linkb.innerHTML="Alert Active: OFF";  createCookie(username+'inatkcheck', 0, 365); } createCookie(username+'chkactive', g_chkactive, 365); resetattackcheck(); return false; }, 0);
	folder.appendChild(linkb);
	
	//alert pop up
	var g_alertpopup = readCookie(username+'alertpopup');
	if (g_alertpopup == null) g_alertpopup = 0;
	if (g_alertpopup == 1)
		s = "<Br>Using Popup: ON";
	else
		s = "<br>Using Popup: OFF";
	var linkb1 = elem('a', s);
	linkb1.href = "javascript:void(0);";
	linkb1.addEventListener("click", function(){ g_alertpopup = !g_alertpopup; if (g_alertpopup) { linkb1.innerHTML = "<Br>Using Popup: ON";  createCookie(username+'alertsound', 0, 365); linkb2.innerHTML="<Br>Using Sound: OFF";  } else { linkb1.innerHTML="<Br>Using Popup: OFF";  } createCookie(username+'alertpopup', g_alertpopup, 365); return false; }, 0);
	folder.appendChild(linkb1);
	//alert windows
	var g_alertsound = readCookie(username+'alertsound');
	if (g_alertsound == null) g_alertsound = 0;
	if (g_alertsound == 1)
		s = "<Br>Using Sound: ON";
	else
		s = "<br>Using Sound: OFF";
	var linkb2 = elem('a', s);
	linkb2.href = "javascript:void(0);";
	linkb2.addEventListener("click", function(){ g_alertsound = !g_alertsound; if (g_alertsound) { linkb2.innerHTML = "<Br>Using Sound: ON"; createCookie(username+'alertpopup', 0, 365); linkb1.innerHTML="<Br>Using Popup: OFF"; } else { linkb2.innerHTML="<Br>Using Sound: OFF";  } createCookie(username+'alertsound', g_alertsound, 365); return false; }, 0);
	folder.appendChild(linkb2);
	
	//test sound
	s = "<br>Test sound";
	var linkb3 = elem('a', s);
	linkb3.href = "javascript:void(0);";
	linkb3.addEventListener("click", function(){ window.open(g_alertsoundlink , 'win1'); return false; }, 0);
	folder.appendChild(linkb3);
	
	var d = '<div id="checkatk">Alert status '+ stime + '</div><Br>--------------';
	var f = div(d);
	folder.appendChild(f);
	leftcontent.appendChild(folder);
	
//--------------------------------------------
//Display Invalid Coordinate
var lll = readCookie(villagekey+'invalidcoord');
if (lll != null && lll != '')
{

	
	// Clear un list Invalid Coordinalte
	var vv = lll.split('<Br>');
	var vv2 = '';
	if (vv.length > 0)
		for (i=0;i<vv.length;i++)
			if (trim(vv[i]).length > 0 && g_villagelist.indexOf(vv[i]) != -1)
				vv2 = vv2 + '<Br>' + vv[i];
	if (trim(vv2).length > 0)
	{
	var d1 = '<div id="invalidcoord">Invalid Coord<br>'+vv2+'</div>';
	//createCookie(villagekey+'invalidcoord', vv2, 7);
	
	var f1 = div(d1);
	leftcontent.appendChild(f1);
	}
	
}

///////////////////////////////////////////////////////
// all check box
function checkAll(d) {
	for(i=1;i<11;i++) {
		try {
		 var n = "n"+i;
		 find("//input[@name='"+n+"']",XPFirst).checked=d.checked?true:false;		
		}catch(ex){}
	}	
}

function readAll()
{
	var vv = find('//td[@class="s7"]', XPList);
	for (i=0;i<vv.snapshotLength;i++)
	{
		var k= vv.snapshotItem(i);
		if ( k.innerHTML.indexOf('(new)') != -1 && k.innerHTML.indexOf('href="berichte.php') != -1
			&& k.innerHTML.indexOf('attacks') != -1)
		{
			var h = k.innerHTML.substring(k.innerHTML.indexOf('href="')+6, k.innerHTML.indexOf('">'));
			window.open('http://'+server+'/'+h);
//			delay(500);
		}
	}
	
}

 var boxSubmit = find("//input[@name='del']|//input[@name='delmsg']",XPFirst);
 if (boxSubmit) {
 	var newBox = elem('input','');
 	newBox.type='checkbox';
 	newBox.addEventListener("click", function(){checkAll(this);}, 0);
 	var insertedElement = boxSubmit.parentNode.insertBefore(newBox, boxSubmit)
	
	var newBox1 = elem('button','Read Attack Msg');
 	newBox1.addEventListener("click", function(){readAll();}, 0);
 	var insertedElement1 = boxSubmit.parentNode.insertBefore(newBox1, boxSubmit)
 }
	
////////////////////////////////////////////////////////////////////////////////////////
//  village resouce list
var vv = document.getElementById('lmid2');
if (vv != null && vv.innerHTML.indexOf('Marketplace level') != -1 && vv.innerHTML.indexOf('At the marketplace you can') != -1)
{

	var vvv =readCookie(username+'villageres');
	
	if (vvv == null) vvv = 'No data';
	
	vvv =vvv.replace('__', '');

	var d='<div id="marketlay" style="position:absolute; top: 300px; left:100px; background-color: #FFFFFF; border:2px dotted #000000; width:500px; font-size:10px;">'+vvv+'</div>';
	var fff = div(d);
	var linkb4 = elem('a', '<br>== Hide ===');
	linkb4.href = "javascript:void(0);";
	linkb4.addEventListener("click", function(){ var v=get('marketlay'); v.style.visibility='hidden'; return false; }, 0);
	vv.appendChild(fff);
	var f2 = get('marketlay');
	f2.appendChild(linkb4);
}


///////////////////////////////////////////////////////////////////
// BOUNTRY COUNTER
	
	var t = new Array(0, 
40, 20, 50,  0, 100, 70, 0, 0, 0, 3000, 
60, 40, 50,  0, 110, 80, 0, 0, 0, 3000,  
30, 45,  0, 75,  35, 65, 0, 0, 0, 3000 
);

	
	function elem(tag,content) {
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}

function getUnits() {
	ret = new Array(11);
	unitline = new Array(11);
	//get relevant lines: 0 = troops sent, 1 = casualties or prisoners, 2 = prisoners (iffy)
	unitline[0] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[3]/td/text()", XPOList);
	unitline[1] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[4]/td/text()", XPOList);
	unitline[2] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[5]/td/text()", XPOList);

	var len = unitline[0].snapshotLength-1;
	if (unitline[1].snapshotLength > 5){
		if (unitline[2].snapshotLength > 5){
			for (i=1; i<=len; i++) ret[i-1] = parseInt(unitline[0].snapshotItem(i).nodeValue) - (parseInt(unitline[1].snapshotItem(i).nodeValue) + parseInt(unitline[2].snapshotItem(i).nodeValue));
			} else for (i=1; i<=len; i++) ret[i-1] = parseInt(unitline[0].snapshotItem(i).nodeValue) - parseInt(unitline[1].snapshotItem(i).nodeValue);
	}
//alert (ret);
	return ret;
}

function getBags() {
	ret = new Array(11);
	unitline = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[2]/td/img/@src", XPOList);
	var len = unitline.snapshotLength-1;
	for (i=0; i<=len; i++){
		current = unitline.snapshotItem(i);
		ret[i] =t[(current.nodeValue).substring((current.nodeValue).lastIndexOf("/")+1,(current.nodeValue).length-4)];
	}
//alert (ret);
	return ret;
}

function pBty() {
	var ret = 0;
	var units = getUnits();
	var bags = getBags();
	var len = units.length;
	for (i=0; i<len-1; i++) {ret += bags[i] * units[i];}
	return ret;
}

function totalBty() {
	var total = 0;
	bty = find("//tr[@class='cbg1']/td[@class='s7']/text()", XPOList);
	if (bty.snapshotLength > 0){
		for (i=0; i<=3; i++ ){
			total += parseInt(bty.snapshotItem(i).nodeValue);
		}
	}
	return total;
}


window.addEventListener( 'load', function( e ) {
	btyrow = find("//tr[@class='cbg1']/td[@class='s7']/text()", XPOList);
	//filter out reports we don't care about
	if ( btyrow.snapshotLength === 0 || btyrow.snapshotLength === 2 ) return;
	//save first node for later abuse
	var content = totalBty().toString() + "/" + pBty().toString();
//alert(content);
	var firstNode = btyrow.snapshotItem(0);
	var pNode = firstNode.parentNode;
	//do we have a hero ?
	var colspan = find ("//table/tbody/tr[4]/td/table[1]/tbody/tr[1]/td[2]/@colspan",XPOList);
	colspan.snapshotItem(0).nodeValue == "10" ? pNode.setAttribute("colspan", "7") : pNode.setAttribute("colspan", "8");
	//create box
	var tpd = elem ("td", content);
	tpd.className = "s7";
	tpd.setAttribute("colspan", "3");
	//attach it to DOM
	pNode.parentNode.appendChild(tpd);
},false);