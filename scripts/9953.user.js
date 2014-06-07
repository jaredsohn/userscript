// ==UserScript==
// @name           Scraps Friends Lite
// @author         Link (Portuguese version) | Bean (English Version Translation)
// @description    Scrap All/Selected Friends
// @include        http://www.orkut.com/sa
// @include        http://www.orkut.com/orkutaddons
// @include        http://www.orkut.com/orkutplus*
// ==/UserScript==


//--------------------------------------------
// Mesma função dos cookies
//--------------------------------------------

 unsafeWindow.sf_SC=function(name,value){
 GM_setValue(name,value);
 };

 unsafeWindow.sf_VC=function(name){
 return GM_getValue(name)
 };

//--------------------------------------------
// Access http://www.orkut.com/sa to send scraps
//--------------------------------------------

script_ = function scri_(){/* Aqui e o inicio */

document.title = "Scraps Friends Lite :: Author: Link Translator: Bean";

var sf_show_botao_copiar = 01;

document.body.innerHTML="</span><div id=\"loading\" style=\'text-decoration:blink\'><center>Loading...Please Wait</center><br></div><div id=\"home\" style=\"display: none\"></div><div id=\"amigos\" style=\"display:none\"></div><iframe name=\"scrapsfriends\" frameborder=\"no\" width=\"0\" height=\"0\"></iframe>"
	var num=0, stopit=0, sf_conta, sf_sel1="", xmlhttp = getXmlHttpRequest();

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
		sf_conta = window.setInterval('sf_updateCont()', 300);
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
 var max_name=0;
 for( var i = 0; i < NAME.length; i++){
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

function sf_desat( texto){
 texto = texto.replace(/:\//gi, '&#58;\/');
 texto = texto.replace(/www\./gi, 'www&#46;');
 return texto;
}

function Go(){

var stx = sf_desat(document.getElementById('scrapText').value);
document.getElementById('scrapText').value = stx; // desativa os links.

var qtq = parseInt(document.getElementById('scrapText').getAttribute('quebras'));

if(sf_conta) window.clearInterval(sf_conta);
document.getElementById('nomes').innerHTML="<BR><b>Scraps Sent to:<br></b>";
parar=setInterval("while(z<NAME.length-1 && NAME[z] == null) z++; if(NAME[z] != null){ var stx = document.getElementById(\'scrapText\').value; " +
			"var itopo = \'\\n[silver].[/silver]\\n\'; " +
			"var iquebra = \':\\n\\n\'; " +
			"var ilk = \'\\n[silver].:.[\/silver]\'; " +
			"var iname = (NAME[z].indexOf(\' \', 2) > 2 ? NAME[z].substring(0, NAME[z].indexOf(\' \', 2)): NAME[z]); "+
			"var ocup =" + qtq + " + itopo.length + 2 + iname.length + iquebra.length + 2 + ilk.length + 1; "+
			"document.getElementById(\'linkscrap\').action=UID[z]; "+
			"document.getElementById(\'scrapText\').value = itopo + (document.getElementById('checkbox1').checked ? iname + iquebra : '') + (stx.length <= (1024 - ocup) ? stx : stx.substring(0, 1024 - ocup - 3) + \'...\') + ilk; "+
			"var teste=false; if(teste){ if(confirm(document.getElementById(\'scrapText\').value)) Para();} else document.linkscrap.enviar.click(); document.getElementById(\'nomes\').innerHTML+='<a href='+UID[z]+' target=_blank>'+NAME[z]+'</a><br>'; document.getElementById(\'scrapText\').value = sf_desat(stx);} if(z>=UID.length-1){window.clearInterval(parar)}; z++;", document.getElementById('tempo').value);

			document.getElementById('go').innerHTML="<input type=\"button\" Value=\"Stop Sending\" onclick=\"Para()\">"
}

function Para(){
clearInterval(parar);return false;
}

function setMax(omax){
  if(!document.getElementById('scrapText') || !document.getElementById('sf_tx_cont'))
  {
    window.setTimeout('setMax(' + omax + ')', 100);
    return;
  }
  document.getElementById('scrapText').setAttribute('max', omax + 51);
  document.getElementById('scrapText').setAttribute('quebras', 0);
  document.getElementById('sf_tx_cont').innerHTML = 1024 - omax - 51;
  document.getElementById('checkbox1').setAttribute('onclick',
	"document.getElementById(\'scrapText\').setAttribute(\'max\', ( ! this.checked ? 46 : " + (omax + 51) + "))"
	);
}

function sf_arruma_ta(hob, vob){
var tot = parseInt(vob.getAttribute('quebras')) + parseInt(vob.getAttribute('max'));
 while(hob.value.length > 1024 - tot){
  vob.value = vob.value.substring(0, vob.value.length - 1);
  hob.value = sf_desat(vob.value);
  if(hob.value.length <= 1024 - tot){
   document.getElementById('sf_tx_cont').innerHTML = 1024 - tot - hob.value.length;
   document.getElementById('scrapText').scrollTop = 1000000000;
  }
 }
}

function sf_updateCont(){
 var qtq = 0;
 var stx = document.getElementById('scrapText').value;
 if(stx.match(/:\//gi) != null || stx.match(/www\./gi) != null){
 stx = sf_desat(stx);
 document.getElementById('sf_corrigido').value = stx; //desativa os links
 }
 for(var i=0; i<stx.length; i++){ if(stx.charAt(i) == '\n') qtq++;}
 document.getElementById('scrapText').setAttribute('quebras', qtq);
 var omax = parseInt(document.getElementById('scrapText').getAttribute('max')) +
   		parseInt(document.getElementById('scrapText').getAttribute('quebras')) ;
 document.getElementById('sf_tx_cont').innerHTML = 1024 - omax - document.getElementById('sf_corrigido').textLength;
 sf_arruma_ta(document.getElementById('sf_corrigido'), document.getElementById('scrapText'));
}

var sf_groups_values = new Array();
var sf_groups_types = new Array();
sf_groups_types[0] = '';
sf_groups_values[0] = '';

function selectAll(list, state){
 var ob;
 if(list == 1){
  ob = document.getElementById('sf_yes');
  for(i=0; i<ob.options.length; i++) ob.options[i].selected=state;
 }
 else if(list == 2){
  ob = document.getElementById('sf_no');
  for(i=0; i<ob.options.length; i++) ob.options[i].selected=state;
 }
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
var n, s = "", ob1, ob2;
ob1 = document.getElementById('sf_yes');
ob2 = document.getElementById('sf_no');
for( var i=1;true;i++){
 n = '' + sf_VC('sf_group' +i + '.name');
 if( n == 'undefined' || n == 'deleted'){

 sf_SC('sf_group' +i + '.name', document.getElementById('sf_modgroupname').value);

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
	var op = document.createElement('option');
	op.setAttribute("value", i);
	op.innerHTML = document.getElementById('sf_modgroupname').value;
	document.getElementById('sf_selgroups').appendChild(op);
	window.alert('Salvo grupo ' + sf_VC('sf_group' +i + '.name'));
	break;
  } // deleted
 } // for
}

function sf_applyGroup(n){

 if(n < 0) return;

 var ob1, ob2;
 ob1 = document.getElementById('sf_yes');
 ob2 = document.getElementById('sf_no');

 for(var j=0; j<ob2.options.length; j++) ob2.options[j].selected = true;
 document.getElementById('sf_removeperson').click();
 while(document.getElementById('sf_no').options.length > 0)
	document.getElementById('sf_no').removeChild(document.getElementById('sf_no').options[document.getElementById('sf_no').options.length -1]);

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
 if(window.confirm("Do You Really Want to Delete " + sf_VC('sf_group' + i + ".name") + "?"))
{
  ob.options[ob.selectedIndex].value = -1;
  ob.options[ob.selectedIndex].style.color='red';
  ob.value="";
  sf_SC('sf_group' + i + '.name', 'deleted');
  sf_SC('sf_group' + i + '.value', '');
}
}

function txta(){
 var s = "<center><div align=\'justify\' style=\'margin-top:-30px;width:750px;padding:10px\'><h1><font color='blue'>ScrapsFriends Lite 4.4</font></h1><b style=\'color:#000090\'>Brought to You By</b> <b style=\'color:red\'><a href=\"http://www.orkutaddons.blogspot.com\" target=\"_blank\">Bean</a></b> <b style=\'color:#000090\'>in association with <a href=\"http://www.orkutplus.blogspot.com\" target=\"_blank\">Orkut Plus!</a></b><br><br><b style=\'color:red\'>Orkut Plus!</b> :<b style=\'color:#000090\'> Best Orkut Hacks, Scripts, Softwares!</b><br>"+
"<br><form id=\"linkscrap\" name=\"linkscrap\" method=\"post\" target=\"scrapsfriends\" action=\"\" autocomplete=\"off\">"+
"<input type=\"hidden\" name=\"POST_TOKEN\" value=\""+postt+"\">"+
"<input type=\"hidden\" name=\"signature\" value=\""+sig+"\">"+
"<table cellspacing=0 cellpadding=5 style=\'background:#dddddd;border:1px solid #006600;-moz-border-radius:7px;padding:10px\'><tr><td colspan=4>Remove the friends to whom you <font color='red'><b>DO NOT</b></font> want to send the scrap using the button <span style='border:1px solid #676767'>&nbsp;>>&nbsp;</span><br>To undo, selects in the right list and add with the button<span style='border:1px solid #676767'>&nbsp;<<&nbsp;</span>. If your friendlist doesn't load into the left box, check whether you are logged into orkut or not and refresh this page again. You can use Shift or Ctrl buttons while selecting. Try increasing the timer at the bottom if you experience any problems.<br><br><table border=0><tr><td>&nbsp;<input type='button' value='Select All' style='font-size:10px;height:20px' onClick='selectAll(1,true)'> <input type='button' style='font-size:10px;height:20px' value='Undo Select' onClick='selectAll(1,false)'><br>&nbsp;<select size=7 id='sf_yes' multiple></select>&nbsp;</td><td align='center' valign='middle'>&nbsp;<input id='sf_addperson' type='button' value='>>' onclick='var ob1=document.getElementById(\"sf_yes\"), ob2=document.getElementById(\"sf_no\"), op; document.getElementById(\"sf_savemodgroup\").disabled=false; for(var i=0; i<ob1.options.length; i++){if(ob1.options[i].selected && ob1.options[i].style.display != \"none\"){op=document.createElement(\"option\"); op.value=i; op.style.color=\"red\"; op.innerHTML=NAME[i]; ob2.appendChild(op);NAME[i]=null; ob1.options[i].style.display=\"none\"; }} updateMax(); ob1.selectedIndex=-1;'>&nbsp;<br><br><input id='sf_removeperson' type='button' value='<<' onclick='var ob1=document.getElementById(\"sf_yes\"), ob2=document.getElementById(\"sf_no\"), n; document.getElementById(\"sf_savemodgroup\").disabled=(ob2.options.length == 0); for(var i=0; i<ob2.options.length; i++){if(ob2.options[i].selected){n=ob2.options[i].value; NAME[n]=ob2.options[i].innerHTML; ob1.options[n].style.display=\"\";}} for(var i=0; i<ob2.options.length; i++){ if(ob2.options[i].selected){ ob2.removeChild( ob2.options[i]);}} updateMax(); ob2.selectedIndex=-1;'>" +
(sf_show_botao_copiar ? "<br><br><input type='button' onclick='var ob1=document.getElementById(\"sf_yes\"); document.getElementById(\"scrapText\").value=\"\"; for(i=0; i<ob1.options.length; i++) document.getElementById(\"scrapText\").value += ob1.options[i].innerHTML + \"\\r\\n\";' value='Copy List'>" : "") + "</td><td>&nbsp;<input type='button' value='Select All' style='font-size:10px;height:20px' onClick='selectAll(2,true)'> <input type='button' style='font-size:10px;height:20px' value='Undo Select' onClick='selectAll(2,false)'><br>&nbsp;<select size=7 id='sf_no' multiple></select>&nbsp;</td></tr></table><tr><td rowspan=2><textarea id=\"scrapText\" name=\"scrapText\" " +
"cols=\"60\" rows=\"5\"></textarea></td><tr><td colspan=3>To <font color=red><b>NOT add </b></font>first name before scrap, please uncheck the below box<br><br style=\"font-size:3px\"><input id=\"checkbox1\" type=\"checkbox\" checked ><b style=\"color:blue;text-decoration:blink\">Add First Name Before Scrap Text</b></td></tr>"+
"<tr><td colspan=4>"+
"<span id=\"go\"><input type=\"button\" Value=\"Start Sending\" style=\"border:1px solid #AA0000;background:#aaffaa\" onclick=\"Go()\"></span>"+
"<input type=\"hidden\" id=\"sf_corrigido\"><input type=\"submit\" id=\"enviar\" name=\"Action.submit\" value=\"Enviar Scraps\" style=\"display: none\"> &nbsp;"+
"<input type='button' id='sf_savemodgroup' disabled onclick='sf_saveGroup()' value='Save Group As:'> <input type='text' id='sf_modgroupname'> &nbsp; "+
"To use the Group: <select id='sf_selgroups' onchange='sf_applyGroup(this.options[this.selectedIndex].value)'><option>All</option>"+sf_loadGroups()+"</select> &nbsp; <input type='button' value='Delete This Group' onclick='sf_delGroup()'></form></td></tr></table><br style=\"font-size:3px\">"+
"Time Interval (in miliseconds): "+
"<input id=\"tempo\" value=\"2000\"><br>"+
"<span id=\"nomes\"></span></div></center>"
 return s;
}

window.addEventListener('load', function(){var s=document.getElementById('sf_yes'); s.title=s.options.length + ' amigos'}, false);

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