// ==UserScript==
// @name           Travian: Hero Status HUN
// @version        1.2.hungarian
// @autor          MeXaon - Fordító: szomorce
// @description    A Hero Status 1.2 magyar változata. Kiírja a hősök házában, mennyi XP-d van, mennyi a következő szint, és mennyi kell még.
// @email          huntoxic@gmail.com
// @namespace      Travian
// @include        http://*.travian*
// @exclude        http://forum.travian*
// @exclude        http://www.travian*
// ==/UserScript==

var ScriptName='Travian: Hero Status Magyar/Hungarian';
var ScriptAutor='MeXaon fordította szomorce';
var ScriptVersion='1.2.Hun';

var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}

function main(){
	var ntable=-1;
	var taverna=find('//table[@class="tbg"]/tbody',XPList);
	for(var i=0;i<taverna.snapshotLength;i++){
		ttd=taverna.snapshotItem(i).getElementsByTagName("td");
		if(ttd[4]==undefined)return;
		if(ttd[4].textContent=='(+)'){
			ntable=i;
			i=1000;
		}
	}
	if(ntable!=-1){
		ttd=taverna.snapshotItem(ntable).getElementsByTagName("td");
		level=parseInt(ttd[0].textContent.match(/\s(\d+)\s\(/).pop());
		percent=parseInt(ttd[28].textContent.match(/(\d+)\%/).pop());
		an=100*(level);
		an1=100*(level+1)
		sn=0.5*an*(level+1);
		sn1=0.5*an1*(level+2);
		unitpercent=an1*percent/100;
		kills=sn+unitpercent;
		nextkills=sn1-kills;
		elem=document.createElement('div');
		elem.innerHTML='Jelenlegi='+kills+'<br>Szintlépés='+sn1+'<br>Szükséges még='+nextkills;
		ttd[27].appendChild(elem);
	}
}

main();

function id(id){
	return document.getElementById(id);
};
function getsetting(value, defaultvalue){
	var set=GM_getValue('setting','');
	if(set=='') return defaultvalue;
	set=set.split(',');
	var iset=set.indexOf(value);
	if(iset<0){
		return defaultvalue;
	}else{
		return set[iset+1];
	};
};

function setsetting(value,value2){
	var set=GM_getValue('setting','');
	var iset=set.indexOf(value);
	if(iset<0||set==''){
		set=set+value+','+value2+',';
	}else{
		set=set.split(',');
		iset=set.indexOf(value);
		set[iset+1]=value2;
		set=set.join(',');
	};
	GM_setValue('setting',set);
};

//*************** Show Version script **********************
function verhideshow(){
	if(id('MeXaon_ver_pm').innerHTML=='-'){
		id('MeXaon_ver_tbody').style.display='none';
		id('MeXaon_ver_c').style.display='none';
		id('MeXaon_ver_table').style.width='10px';
		id('MeXaon_ver_pm').innerHTML='+';
		setsetting('MeXaon_ver','+');
	}else{
		id('MeXaon_ver_tbody').style.display='';
		id('MeXaon_ver_c').style.display='';
		id('MeXaon_ver_table').style.width='300px';
		id('MeXaon_ver_pm').innerHTML='-';
		setsetting('MeXaon_ver','-');
	}
};
var findver=find('//mywindow[@id="MeXaon_ver"]/table/tbody',XPFirst);
if(!findver){
var content='<table id="MeXaon_ver_table" class="tbg" style="position:absolute;top:80px;left:680px;z-index:150;width:300px;cellspacing:1;cellspacing;1">'+
						'<thead><tr class="rbg"><td colspan="3"><span id="MeXaon_ver_pm" style="float:left;cursor:pointer">-</span><span id="MeXaon_ver_c">Scripts Version</span></td></tr></thead>'+
						'<tbody id="MeXaon_ver_tbody"></tbody>'+
						'</table>';
var ver=document.createElement('mywindow');
ver.id='MeXaon_ver';
ver.innerHTML=content;
document.body.appendChild(ver);
id('MeXaon_ver_pm').addEventListener('click',verhideshow,false);
if(getsetting('MeXaon_ver','-')!=id('MeXaon_ver_pm').innerHTML) verhideshow();
}
var findver=find('//mywindow[@id="MeXaon_ver"]/table/tbody',XPFirst);
var tr=document.createElement('tr');
var td1=document.createElement('td');
if(ScriptLink!=''){
	content='<a href='+ScriptLink+' title="Go to http://userscripts.org" target="_blank">'+ScriptName+'</a>';
} else content=ScriptName;
td1.innerHTML=content;
td2=document.createElement('td');
td2.innerHTML=ScriptVersion;
tr.appendChild(td1);
tr.appendChild(td2);
findver.appendChild(tr);
// ************** End Show version script ******************