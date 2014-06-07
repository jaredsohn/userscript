// ==UserScript==
// @name           Scraps Friends Lite v5.4
// @description    Send Scrap to All Friends
// @include        http://www.orkut.com/Scraps.aspx*
// ==/UserScript==

//--------------------------------------------
// Working on cookies
//--------------------------------------------

unsafeWindow.sf_SC=function(name,value){
GM_setValue(name,value);
};

unsafeWindow.sf_VC=function(name){
return GM_getValue(name)
};

//--------------------------------------------
// open http://www.orkut.com/Scraps.aspx to use the script
//--------------------------------------------

script_ = function scri_(){/* Aqui e o inicio */

document.title = "Scraps Friends Lite v5.4 :: Brought to you by BEAN";
self.location="#";

var sf_show_botao_copiar = 01;

document.body.innerHTML="</span><div id=\"loading\" style=\'text-decoration:blink\'><center>Loading...</center><br></div><div id=\"home\" style=\"display: none\"></div><div id=\"amigos\" style=\"display:none\"></div><iframe name=\"scrapsfriends\" frameborder=\"no\" width=\"0\" height=\"0\"></iframe>"
	var num=0, op=false, stopit=0, qbrs=0, sf_enviook=0, sf_xmlok, stop_cnt=false, sf_conta, sf_sel1="", xmlhttp = getXmlHttpRequest();

	function getXmlHttpRequest() {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	function alteraURL(url){
	if(num>1){if(document.body.innerHTML.indexOf('pno='+num)==-1){stopit++}}
	if(stopit==1){
		document.getElementById("loading").style.textDecoration='none';
		document.getElementById("loading").innerHTML=txta(); setMax( getuid());
		document.getElementById('sf_yes').innerHTML=sf_sel1.replace(/'/gi, '`');
		document.getElementById('sf_no').style.width=document.getElementById('sf_yes').offsetWidth;
		document.getElementById('sf_yes').style.minWidth=document.getElementById('sf_yes').offsetWidth;
		document.getElementById('sf_yes').style.minHeight=document.getElementById('sf_yes').offsetHeight;
		sf_conta = window.setTimeout('sf_updateCont()', 300);
		window.setTimeout("document.getElementById('scrapText').focus();", 1000);
		return false;}
		xmlhttp.open("GET", url, true);
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState==4){
				if(num>1){document.getElementById('amigos').innerHTML+=xmlhttp.responseText;}
if(num==1){
document.getElementById('home').innerHTML=xmlhttp.responseText;

p=0;

ip=document.getElementsByTagName('input')
for(p=0;p<ip.length;p++)
	{
if(ip[p].name=='POST_TOKEN')
{
postt=ip[p].value
sig=ip[p+1].value
break;
}
}
m=0


dl=document.links
for(m=0;m<dl.length;m++)
{
if( dl[m].href.indexOf('Profile.aspx?uid')>-1)
{
	try
	{
	ownuid=dl[m].href;
	ownuid=ownuid.substring(38,ownuid.length)
	break;
	}
	catch(e)
	{}
}
}
document.getElementById('home').innerHTML='';
}
	try
	{
		alteraURL('FriendsList.aspx?uid='+ownuid+'&pno='+num);num++
	}
	catch(e)
	{
	  window.alert(e.message);
	  top.location = "http://www.orkut.com/Home.aspx";
	  return;
	}
			}
		}
		xmlhttp.send(null);
	}
alteraURL('Scrapbook.aspx');num++

function updateMax(){
var max_name=0, vis=0;

var ob1 = document.getElementById('sf_yes');
var ob2 = document.getElementById('sf_no');


if(ob2.options.length > 0 && ! ob2.options[0].value) ob2.removeChild( ob2.options[0]);

for( var i = 0; i < ob1.options.length; i++) if( ob1.options[i].style.display != 'none') vis++;

ob1.title = vis + " Receipts";
ob2.title = ob2.options.length + " Excluded";


for( var i = 0; i < NAME.length; i++){
if(! NAME[i] ) continue;
if(NAME[i].length > 1){
var imax = (NAME[i].indexOf(' ', 2) > 2 ? NAME[i].substring(0, NAME[i].indexOf(' ', 2)).length : NAME[i].length);
if( imax > max_name) max_name = imax;
}
}
setMax(max_name);
}


function notUID(qual){
var naotem = true;
for(var i = UID.length-1; i>=0; i--){
if(UID[i] == qual){ naotem = false; break;}
}
return naotem;
}

function getuid(){
u=0;
nn=0;
var max_name=0;
d=document;
l=d.links;
UID = new Array();
NAME = new Array();
sf_sel1="";
for(u=0;u<=l.length;u++){
try
{
if(l[u] && l[u].href.indexOf('Profile.aspx?uid=')>-1 && l[u].innerHTML.indexOf('<img')==-1 && l[u].href.indexOf(ownuid)==-1)
	{
var sl= l[u].href.replace(/Profile/gi,'Scrapbook')
if( notUID(sl)){
UID[nn] = sl;
NAME[nn] = l[u].innerHTML.replace(/^[\s|\n|\r]+/gi, '');
NAME[nn] = NAME[nn].replace(/[\s|\n|\r]+$/gi, '');
var imax = (NAME[nn].indexOf(' ', 2) > 2 ? NAME[nn].substring(0, NAME[nn].indexOf(' ', 2)).length : NAME[nn].length);
if( imax > max_name) max_name = imax;
nn++;
}
}
}
catch(e){}

}
var tmp;
for(var i=0; i<NAME.length; i++){
for(var j=i+1; j<NAME.length; j++){
if(NAME[i].toUpperCase() > NAME[j].toUpperCase()){
tmp = NAME[i];
NAME[i] = NAME[j];
NAME[j] = tmp;
tmp = UID[i];
UID[i] = UID[j];
UID[j] = tmp;
}
}
}
for(var i=0; i<NAME.length; i++) sf_sel1+="<option value="+i+">"+NAME[i]+"<\/option>\\n";
return max_name;
}

z=0;

function sf_desat( texto, tirarImgs){
// restaura
texto = texto.replace(/\[b\]:\[\/b\]\//gi, ':/');
texto = texto.replace(/\[b\]\.\[\/b\]/gi, '.');
texto = texto.replace(/w\[navy\]w\[\/navy\]w/gi, 'www');
texto = texto.replace(/h\[navy\]t\[\/navy\]t\[navy\]p\[\/navy\]/gi, 'http');
// muda
// transforma links em URLS
texto = sf_soe( texto, "a", true);
texto = texto.replace(/(\r\n)/gi, '\n');
texto = texto.replace(/:\//gi, '[b]:[/b]\/');
texto = texto.replace(/\./gi, '[b].[/b]');
texto = texto.replace(/www/gi, 'w[navy]w[/navy]w');
texto = texto.replace(/http/gi, 'h[navy]t[/navy]t[navy]p[/navy]');
texto = sf_soe( texto, "img", tirarImgs);
texto = texto.replace(/\t/g, ' ');
texto = texto.replace(/\ {2,}/g, ' ');
return texto;
}

function sf_soe(s, tag, tirar){
var a, b, c, d=0, l, m, n, t;
  while( eval( "s.match(/<\\/?"+ tag +"[^>]+>/gi)")){
      d++;
	if(d > 1000){
	   if (confirm('Many Tag ... Want to Quit?')) break;
	}
    m = eval( "s.match(/<\\/?"+ tag +"[^>]+>/gi)");
	  a = s.indexOf(m[0]);
	  b = s.indexOf("</"+tag+">", a + 2);
	  c = b + tag.length + 3;
	  n = m[0].replace(/\[\/?[^\[\]]{1,10}\]/g, '');
	  l = n.match(/(href|src)\s{0,4}=\s{0,4}["'][^'"]+["']/i);
	  l = l[0];
	  if(tirar){
		  l = l.replace(/(href|src)\s{0,4}=\s{0,4}['"]/i, '');
		  l = l.replace(/['"]/g, '');
		  l = l.replace(/:\//gi, '[b]:[/b]\/');
		  l = l.replace(/\./gi, '[b].[/b]');
		  l = l.replace(/www/gi, 'w[navy]w[/navy]w');
		  l = l.replace(/http/gi, 'h[navy]t[/navy]t[navy]p[/navy]');
		  s = s.substring(0,a) + " { " + l  + " } " + s.substring(c > a ? c : a + m[0].length, s.length);
	  //if(!confirm(s)) break;
	  } else {
		  s = s.substring(0,a) + "<~" + tag + " " + l + "~>" + s.substring(a + m[0].length, s.length);	  
	  }
  }
   s = s.replace(/<~/g, '<');
   s = s.replace(/~>/g, '>');
   return s;
}


	  
function Go(){
op = false;
var stx = document.getElementById('scrapText').value;
if(stx.match(/<img/i)){
  op = ! confirm("Attention: Encountered tag of image <img... in text.\n\n"+
  "1- If you are sure that images are hosted on Orkut, continue!\n\n"+
  "OR.... If you are not sure, use cancel to send only addresses of images to prevent failure.\n\n"+
  "Send the way it is (OK) or prefer to send only addresses(Cancelar) ?\n\n" +
  "PS: Make a Test: Select only one friend and send!");
  stx = sf_desat(stx, op);
 } else stx = sf_desat( stx, false);
document.getElementById('scrapText').value = stx;
stop_cnt = true;
if(sf_conta) window.clearTimeout(sf_conta);
document.getElementById('nomes').innerHTML="<b>Scraps sent to:<br></b>";
parar = setInterval("while(z<NAME.length-1 && NAME[z] == null) z++; "+
			"if(stop_it){ clearInterval(parar);} "+
			"else if( z < NAME.length-1 && NAME[z] != null){ "+
				"var stx = document.getElementById(\'scrapText\').value; " +
				"var itopo = \'\\n[silver].[/silver]\\n\'; " +
				"var iquebra = \':\\n\\n\'; " +
				"var ilk = \'<br>[silver].:.[\/silver]\'; " +
				"var iname = (NAME[z].indexOf(\' \', 2) > 2 ? NAME[z].substring(0, NAME[z].indexOf(\' \', 2)): NAME[z]); "+
				"document.getElementById(\'linkscrap\').action=UID[z]; "+
				"var cabecalho = (stx.indexOf(itopo)== 0 ? '' : itopo) + "+
				"(document.getElementById('chPutNome').checked ? iname + iquebra : ''); " +
				"var ocup = cabecalho.length + ilk.length; document.getElementById(\'scrapText\').value = "+
				"cabecalho + (stx.length <= (1024 - ocup) ? stx : stx.substring(0, 1024 - ocup - 3) + \'...\')+"+
				"(stx.indexOf(ilk) == -1 ? ilk : '') ; " +
				
				/*
				  "var debugging=false; if(debugging){ "+
				  "  if( confirm( document.getElementById(\'scrapText\').value.length)) Para();"+
				  "} else 			
				*/
				
				"document.linkscrap.enviar.click(); "+
				"document.getElementById(\'nomes\').innerHTML+='<a href='+UID[z]+' target=_blank>'+NAME[z]+'</a><br>'; "+
				"document.getElementById(\'scrapText\').value = sf_desat(stx, op);"+
				"++z;" +
			"} "+
			"if(z > UID.length-1){stop_it = true; window.clearInterval(parar);} ", 
				document.getElementById('tempo').value);

			document.getElementById('go').innerHTML="<input type=\"button\" Value=\"Stop Sending\" onclick=\"Para()\">"
}

function Para(){
clearInterval(parar); return false;
}

function setMax(omax){
if(!document.getElementById('scrapText') || !document.getElementById('sf_tx_cont'))
{
window.setTimeout('setMax(' + omax + ')', 100);
return;
}

qbrs = document.getElementById('scrapText').value.match(/\n/g) ?
	document.getElementById('scrapText').value.match(/\n/g).length : 0;
document.getElementById('scrapText').setAttribute('max', (document.getElementById('chPutNome').checked ? omax + 54 : 49));
document.getElementById('scrapText').setAttribute('quebras', 0);
document.getElementById('sf_tx_cont').innerHTML = 1024 - (document.getElementById('chPutNome').checked ? (omax + qbrs + 54) : (49 + qbrs));
document.getElementById('chPutNome').setAttribute('onclick',
	"document.getElementById(\'scrapText\').setAttribute(\'max\', ( ! this.checked ? 49 : " + (omax + 54) + "))"
	);
}

function sf_arruma_ta(hob, vob){
var tot = parseInt(vob.getAttribute('max'));
while(hob.value.length > 1024 - tot){
vob.value = vob.value.substring(0, vob.value.length - 1);
hob.value = sf_desat(vob.value, false);
if(hob.value.length <= 1024 - tot){
document.getElementById('sf_tx_cont').innerHTML = 1024 - tot - hob.value.length;
document.getElementById('scrapText').scrollTop = 1000000000;
}
}
}

function sf_updateCont(){
var stx = document.getElementById('scrapText').value;
 if(!stop_cnt){
	stx = sf_desat(stx, false); //desativa os links, pontos, etc.
	document.getElementById('sf_corrigido').value = stx;
	var omax = parseInt(document.getElementById('scrapText').getAttribute('max'));
	qbrs = document.getElementById('scrapText').value.match(/\n/g) ?
		document.getElementById('scrapText').value.match(/\n/g).length : 0;
	document.getElementById('sf_tx_cont').innerHTML = 1024 - omax - qbrs - document.getElementById('sf_corrigido').value.length;
	document.getElementById('scrapText').title = "The text will be neat to " + stx.length + " characters. Maximum "+(1024-omax-qbrs);
	sf_arruma_ta(document.getElementById('sf_corrigido'), document.getElementById('scrapText'));
	window.setTimeout('sf_updateCont()', 300);
 }
}

var sf_groups_values = new Array();
var sf_groups_types = new Array();
sf_groups_types[0] = '';
sf_groups_values[0] = '';

function selectAll(list, state){
var ob = document.getElementById( 'sf_' + (list == 1 ? 'yes' : 'no'));
for(i=0; i<ob.options.length; i++) ob.options[i].selected=state;
}

function sf_loadGroups(){
var n, i=1, s = "";
while( true){
n = '' + sf_VC('sf_group' +i + '.name');
if(n != 'undefined'){
if(n != 'deleted') s += '<option value='+i+'>' + n + '</option>';
sf_groups_types[sf_groups_types.length] = sf_VC('sf_group' +i + '.type');
sf_groups_values[sf_groups_values.length] = sf_VC('sf_group' +i + '.value');
}
else if(n == 'undefined') break;
i++;
}
return s;
}

function sf_saveGroup(){
var n, s = "", ob1, ob2, ogrupo, igrupo=-1, osel, n_ach=false;
ob1 = document.getElementById('sf_yes');
ob2 = document.getElementById('sf_no');
ogrupo = document.getElementById('sf_modgroupname').value;
osel = sf_selgroups.options[sf_selgroups.selectedIndex].innerHTML;
  
if(!ogrupo){
  if( confirm("Using Group: " + osel + "?")){
    ogrupo = osel;
    document.getElementById('sf_modgroupname').value = ogrupo;
  }
  else return;
}
 
for( var i=1;true;i++){
 n = sf_VC('sf_group' +i + '.name');
 if(n == null){ n_ach=true; igrupo=i; break;}
else if( n.toLowerCase() == ogrupo.toLowerCase()){ igrupo=i; break;}
}

if(igrupo == -1){
for( var i=1;true;i++){ 
 n = sf_VC('sf_group' +i + '.name');
 if(n == null || n == 'deleted'){igrupo=i; break;}
 }
}
else 
  if(! n_ach){
 	if(!confirm("Overwrite Group "+ogrupo+" ?")) return;
  }


sf_SC('sf_group' +i + '.name', ogrupo);

if(ob2.options.length > ob1.options.length / 2){
	sf_SC('sf_group' +i + '.type', 1);
	for(var j=0; j<ob1.options.length; j++){
	 if(NAME[j] != null){
		 if(!s)
		 s = UID[j].substring(UID[j].indexOf('uid=') + 4, UID[j].length);
		 else
		 s += "," + UID[j].substring(UID[j].indexOf('uid=') + 4, UID[j].length);
	 	}
	}
	sf_SC('sf_group' +i + '.value', s);
} else {
	sf_SC('sf_group' +i + '.type', 0);
	for(var j=0; j<ob2.options.length; j++){
	var n = ob2.options[j].value;
	 if(NAME[n] == null){
		 if(!s)
		 s = UID[n].substring(UID[n].indexOf('uid=') + 4, UID[n].length);
		 else
		 s += "," + UID[n].substring(UID[n].indexOf('uid=') + 4, UID[n].length);
	 	}
	}
} // ob1 or ob2
	sf_SC('sf_group' +i + '.value', s);
	sf_groups_types[i] = ( (ob2.options.length > ob1.options.length / 2) ? 1 : 0);
	sf_groups_values[i] = s;

	osel = document.getElementById('sf_selgroups');
	n_ach = true;
	for( var i=0; i < osel.options.length; i++){
	  if(osel.options[i].innerHTML.toLowerCase() == ogrupo.toLowerCase()){ n_ach= false; break;}
	}
	
    if(n_ach){
	var op = document.createElement('option');
	 op.setAttribute("value", i);
	 op.innerHTML = document.getElementById('sf_modgroupname').value;
	 osel.appendChild(op);
    }
	window.alert('Except Group ' + sf_VC('sf_group' +i + '.name'));

}


function upTitles(){
var ob1 = document.getElementById('sf_yes');
var ob2 = document.getElementById('sf_no');
ob1.title = ob1.options.length + " Receipts";
ob2.title = ob2.options.length + " Excluded";
}

function cleanFirstNo(){
var ob2 = document.getElementById('sf_no');
if(ob2.options.length > 0 && ! ob2.options[0].value) ob2.removeChild( ob2.options[0]);
}

function sf_applyGroup(n){

if(n < 0) return;

var ob1, ob2;
ob1 = document.getElementById('sf_yes');
ob2 = document.getElementById('sf_no');

if(ob2.options.length > 0 && ! ob2.options[0].value) ob2.removeChild( ob2.options[0]);

selectAll(2, true);
document.getElementById('sf_removeperson').click();
while(ob2.options.length > 0) ob2.removeChild(ob2.options[0]);

if(n == 0){
return;
}

var t = sf_groups_types[n], vs = sf_groups_values[n].split(',');

if(t == 0){
for(var i=0; i<vs.length; i++){
	for(var j=0; j<ob1.options.length; j++){
	 if(UID[j].indexOf('uid=' + vs[i]) > -1){ ob1.options[j].selected = true; break;}
	 	}
	}
}
else{
for(var j=0; j<ob1.options.length; j++){
ob1.options[j].selected = true;
for(var i=0; i<vs.length; i++){
	 if( UID[j].indexOf('uid=' + vs[i]) > -1){ ob1.options[j].selected = false; break;}
	 	}
	}
}
document.getElementById('sf_addperson').click();
}

function sf_delGroup(){
var ob = document.getElementById('sf_selgroups');
var i = ob.options[ob.selectedIndex].value;
if(window.confirm("Delete Group " + sf_VC('sf_group' + i + ".name") + "?"))
{
ob.options[ob.selectedIndex].value = -1;
ob.options[ob.selectedIndex].style.color='red';
ob.value="";
sf_SC('sf_group' + i + '.name', 'deleted');
sf_SC('sf_group' + i + '.value', '');
}
}

function selNext180(){
var inicial, final, ct=-1;
	with(document.getElementById('sf_yes')){
	if(selectedIndex == -1){
		if(confirm("No initial user selected. Selecting the first?"))
		{
			inicial=0;
		}
		else return;
		}

	else inicial = selectedIndex;

	final = inicial + 179;

	for(var i=0; i < options.length; i++){
	if( options[i].style.display != 'none') ct++; else continue;
	options[i].selected = (ct<inicial || ct>final);
	}
}
document.getElementById('sf_addperson').click();
}

function txta(){
return "<center><div align=\'justify\' style=\'background:#FFEECC;margin-top:40px;width:750px;padding:10px\'><h1><font color='blue'>Scraps Friends Lite 5.4</font></h1><b style=\'color:#000090\'>Brought to you by BEAN - Sergio Abreu - Link</b><br><br><br>" +
"<b>Visit http://orkutaddons.blogspot.com/ for instructions or related issues.</b><br><br>"+
"<br><form id=\"linkscrap\" name=\"linkscrap\" method=\"post\" target=\"scrapsfriends\" action=\"\" autocomplete=\"off\">"+
"<input type=\"hidden\" name=\"POST_TOKEN\" value=\""+postt+"\">"+
"<input type=\"hidden\" name=\"signature\" value=\""+sig+"\">"+
"<table cellspacing=0 cellpadding=5 style=\'background:#dddddd;margin-left:-15px;border:1px solid #006600;-moz-border-radius:7px;padding:10px\'><tr><td colspan=4>Select the friends for whom the scrap <font color='red'><b>SHOULD NOT</b></font> be sent and move through the button <span style='border:1px solid #676767'>&nbsp;>>&nbsp;</span><br>To undo, select the list and remove the right with the button <span style='border:1px solid #676767'>&nbsp;<<&nbsp;</span>. You can also use ctrl and shift!<br>"+
"<font color='#0000AA'>FILTER ORKUT: Select the first of the next 180 and click the button!</font><br><table border=0><tr><td>&nbsp;"+
"<input type='button' value='Select All' style='font-size:10px;height:20px' onClick='selectAll(1,true)'>"+
"<input type='button' style='background:white;font-size:10px;height:20px' value='Upcoming 180' onClick='selNext180()'>"+
"<input type='button' style='font-size:10px;height:20px' value='Undo Selection' onClick='selectAll(1,false)'><br>&nbsp;"+
"<select size=7 id='sf_yes' multiple></select>&nbsp;</td><td align='center' valign='middle'>&nbsp;"+
"<input id='sf_addperson' type='button' value='&gt;&gt;' " +
	"onclick='cleanFirstNo(); var ob1=document.getElementById(\"sf_yes\"), ob2=document.getElementById(\"sf_no\"),op;"+
	"document.getElementById(\"sf_savemodgroup\").disabled=false;"+
	"for(var i=0; i<ob1.options.length; i++){"+
		"if(ob1.options[i].selected && ob1.options[i].style.display != \"none\"){"+
			"op=document.createElement(\"option\"); op.value=i; op.style.color=\"red\"; "+
			"op.innerHTML=NAME[i]; ob2.appendChild(op); NAME[i]=null; ob1.options[i].style.display=\"none\"; "+
		"}} updateMax(); ob1.selectedIndex=-1;'>&nbsp;<br><br>"+
"<input id='sf_removeperson' type='button' value='&lt;&lt;' onclick='cleanFirstNo(); "+
"var ob1=document.getElementById(\"sf_yes\"), ob2=document.getElementById(\"sf_no\"), n; "+
"document.getElementById(\"sf_savemodgroup\").disabled=(ob2.options.length == 0); "+
"for(var i=0; i<ob2.options.length; i++){"+
	"if( ob2.options[i] && ob2.options[i].selected){ "+
		"n=ob2.options[i].value; NAME[n]=ob2.options[i].innerHTML; ob1.options[n].style.display=\"\";"+
	"}} for(i=0; i<ob2.options.length; i++){if(ob2.options[i] && ob2.options[i].selected){ob2.removeChild( ob2.options[i--]);}} "+
	"updateMax(); ob2.selectedIndex=-1;'>" +
(sf_show_botao_copiar ? "<br><br><input type='button' onclick='cleanFirstNo(); var ob1=document.getElementById(\"sf_yes\"); document.getElementById(\"scrapText\").value=\"\"; for(i=0; i<ob1.options.length; i++) document.getElementById(\"scrapText\").value += ob1.options[i].innerHTML + \"\\r\\n\";' value='Copy'>" : "") + "</td><td>&nbsp;<input type='button' value='Select All' style='font-size:10px;height:20px' onClick='cleanFirstNo(); selectAll(2,true)'> <input type='button' style='font-size:10px;height:20px' value='Undo Selection' onClick='cleanFirstNof(); selectAll(2,false)'><br>&nbsp;<select size=7 id='sf_no' multiple><option></option></select>&nbsp;</td></tr></table><tr><td rowspan=2><textarea id=\"scrapText\" name=\"scrapText\" " +
"cols=\"60\" rows=\"5\"></textarea></td><td align=right>Rest</td><td><div id='sf_tx_cont' style=\'color:black; width:60px;text-align:center;border:1px solid black;background:white; position:relative;\'>"+ (1024-67) + "</div></td><td align=left>Characters</td></tr><tr><td colspan=3>To <font color=red><b>not</b> add</font> first name uncheck the box:<br><br style=\"font-size:3px\"><input id=\"chPutNome\" type=\"checkbox\"><b style=\"color:blue;text-decoration:blink\">Add first Name</b></td></tr>"+
"<tr><td colspan=4>"+
"<span id=\"go\"><input type=\"button\" Value=\"Send Scraps\" style=\"border:1px solid #AA0000;background:#aaffaa\" onclick=\"stop_it = 0; Go()\"></span>"+
"<input type=\"hidden\" id=\"sf_corrigido\"><input type=\"submit\" id=\"enviar\" name=\"Action.submit\" value=\"Send Scraps\" style=\"display: none\"> &nbsp;"+
"<input type='button' id='sf_savemodgroup' disabled onclick='sf_saveGroup()' value='Save as:'> <input type='text' id='sf_modgroupname'> &nbsp; "+
"Selected Group: <select id='sf_selgroups' onchange='sf_applyGroup(this.options[this.selectedIndex].value)'><option>All</option>"+sf_loadGroups()+"</select> &nbsp; <input type='button' value='Delete Group' onclick='sf_delGroup()'></form></td></tr></table><br style=\"font-size:3px\">"+
"Time interval between successive scraps (in milliseconds): "+
"<input id=\"tempo\" value=\"3000\"><br>"+
"<span id=\"nomes\"></span></div></center>";

}
	
function showFriendsTitle(){
	if( document.getElementById('loading').innerHTML.match(/ter>car/i) ){
		setTimeout('showFriendsTitle()', 100);
	} else {

		var s = document.getElementById('sf_yes');
		s.title = s.options.length + ' Friends';
	}
}

showFriendsTitle();

}/* Aqui e o fim */

//--------------------------------------------
// Insere Script na pagina
//--------------------------------------------
var sub1="1"+script_+"1";
var sub2=sub1.substring(24,sub1.length - 4);

var script = document.createElement('script');
script.innerHTML = sub2
script.id = "id_script"
document.body.insertBefore(script, document.body.firstChild);