// ==UserScript==
// @name            toolbar
// @author          Link 
// @namespace      
// @description    Make's a orkut toolbar in your profile.
// @include        *.orkut.com/*
// @exclude        https://*.orkut.com*
// @exclude        http://*omdt_send=1
// ==/UserScript==

/*
javascript:qq="";for(i=0;i<Lang.length;i=i+2){qq+="L["+i/2+"]=<b>"+Lang[i]+"</b> = "+Lang[i+1]+"<br>"};window.open('','lang').document.write(qq);void(0)
*/

//--------------------------------------------
// Mesma funÃ§Ã£o dos cookies
//--------------------------------------------
unsafeWindow.SC=function(name,value){
GM_setValue(name,value);};
unsafeWindow.VC=function(name){
return GM_getValue(name);};
//--------------------------------------------
// Tradutor by Babelfish http://babelfish.altavista.com/tr
//--------------------------------------------
unsafeWindow.babelf=function(lang,t)
{
var sel=String(window.getSelection());
if(sel==""){sel=prompt(t,'')};
if(sel=="" || !sel){document.getElementById('bf.tjan').innerHTML='';return};
trtext="&trtext="+encodeURIComponent(sel.replace(/\n/g,'\n\n'));
	GM_xmlhttpRequest
	(
{
method: 'POST',
url: 'http://babelfish.altavista.com/tr',
data: 'doit=done&intl=1&tt=urltext&lp='+lang+trtext+'&Action.btnTrTxt',
headers:
{
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
'Content-type': 'application/x-www-form-urlencoded',
},
	onload: function(responseDetails)
	{
	document.getElementById('bf.babel').innerHTML="<b>"+sel.replace(/\n/g,'<br>')+"</b><br><br>"+String(responseDetails.responseText.match(/style\=padding:10px;\>((.|\n)+)\<\/div\>\<\/td\>/)[1]).replace(/\n\n/g,'<br>');
	}
}
	);
}
//--------------------------------------------
// InÃcio
//--------------------------------------------
var sc = function sc(){//////////////* AQUI Ã‰ O COMEÃ‡O *//////////////
//--------------------------------------------
// Idioma
//--------------------------------------------
if(document.cookie.match(/SET=\d+:LNG=79:/))
{
li=1;
}
else
{
li=0;
}
L=[];
Lang="Spreading|DivulgaÃ§Ã£o|Add Signature|Adicionar Assinatura|Edit|Editar|Delete|Deletar|Change to Default|Tornar PadrÃ£o|Close|Fechar|C|P|This post was edited with the|Este post foi editado com a|This signature was already added, do you want add it again?|Essa assinatura ja foi adicionada, deseja adicionar novamente?|Do you really want to delete|Deseja mesmo deletar|Title:|TÃtulo:|Signature:|Assinatura:|Cancel|Cancelar|Bold|Negrito|Italic|ItÃ¡lico|Underline|Sublinhado|Menu Color|Menu Cor|with Title|com TÃtulo|Image|Imagem|Signature , Right Click to Edit|Assinatura , Clique com BotÃ£o Direito para Editar|Search Friends|Buscar Amigos|Search Communities|Buscar Comunidades|Recover Lost Text|Recuperar Texto Perdido|Settings|ConfiguraÃ§Ãµes|Profile|Perfil|Edit Profile|Editar Perfil|Album|Ãlbum|Marks|Listas|Scrapbook|Recados|Testimonials|Depoimentos|Fans|FÃ£s|Messages|Mensagens|Friends|Amigos|Communities|Comunidades|Authors Profile|Perfil do Autor|Oficial Community|Comunidade Oficial|Troca a LÃngua para o PortuguÃªs|Change the language to English|Ctr+Click open in a new tab , Shift+Click open in a new page|Ctr+Clique abre em uma nova aba , Shift+Clique abre em uma nova pÃ¡gina|Loading...|Carregando...|There is not community|NÃ£o hÃ¡ comunidade|Type the address|Digite o endereÃ§o|Type the name of the link|Digite o nome do link|Type the name of your friend|Digite o nome do seu amigo|Type the name of the Community|Digite o nome da comunidade|Nothing was selected, type something that you want translate|Nada foi selecionado, digite algo que queira traduzir|Translation|TraduÃ§Ã£o|Preview|PrÃ© VisualizaÃ§Ã£o|Automatic Signature in the Scraps|Assinatura AutomÃ¡tica nos Scraps|Automatic Signature in the Posts|Assinatura AutomÃ¡tica nos Posts|Color:|Cor:";
Lang=Lang.split('|');
y=0;
for(i=li;i<Lang.length;i=i+2)
{
L[y]=Lang[i];
y++;
}
//--------------------------------------------
// Algumas variaveis e funÃ§Ãµes
//--------------------------------------------
var cima = (window.screen.height - 300)/2; // Pega a altura e largura da tela, e divide por 2 e subtrai o tamanho da popup
var lado = (window.screen.width - 350)/2; // Resultando em... uma pop up centralizada ! =D
var ver="0904"; /* VersÃ£o deste escript 0904 */
var whoid=String(document.cookie.match(/id=\d+/i)).replace(/ID=/,''); // Aqui pega o seu UID, nÃ£o tem nada a ver com roubo de auth por cookies, ok? XD
var sbutton="style=\"text-decoration: none; color: black\""; //estilo dos botÃµes
function txta(num){return document.getElementsByTagName('textarea')[num]}; //simplifica o getElementsByTagName('textarea')
function gebi(id){return document.getElementById(id)}; //simplifica o getElementById()
function bmenu(num){if(!num){num==0};return "<table cellspacing=0 cellpadding="+num+" style=\"border-collapse: collapse;border: 1px solid black;background: "+bcolor+";\"><tr><td>"}; // estrura do menu
function bmenuf(){return "</td></tr></table>"};
	if(VC('bf.cor')==undefined || VC('bf.cor')==""){bcolor="#A1BBE4";}else{bcolor=VC('bf.cor');} // cor geral da barra
function icone(acc,tt,click,mais,img){return "<input "+mais+" type=\"image\" accesskey=\""+acc+"\" title=\""+tt+"\" onclick=\""+click+"\" onblur=\"onunfocus()\" onfocus=\"onunblur()\" src=\"data:image/gif;base64,"+img+"\" height=\"20\" style=\"border:1px solid "+bcolor+"\" onmouseover=\"this.style.border='1px outset "+bcolor+"';this.style.MozBorderRadius = '0.6em';this.style.cursor='default'\" onmousedown=\"this.style.border='1px inset "+bcolor+"'\" onmouseup=\"this.style.border='1px outset "+bcolor+"'\" onmouseout=\"this.style.border='1px solid "+bcolor+"'\">"}
function div(id,l,num){return "<div class=\"profileTitle\" id=\""+id+"\" onmouseout=\"up=0;low()\" onclick=\"closeallmenu("+num+")\" onmouseover=\"up=1;high()\" oncontextmenu=\"setTimeout('closeallmenu("+num+")',0);\" style=\"position:fixed;top:27;left:"+l+";-moz-opacity:1\"></div>"}
sepb64="data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP%2F%2F%2F%2F%2F%2F%2FwAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw%3D%3D"
sep="<img src=\""+sepb64+"\" style=\"width:1; height: 20;\"><img src=\""+sepb64+"\" style=\"width:0; height: 20;border: 1px inset "+bcolor+"\"><img src=\""+sepb64+"\" style=\"width:1; height: 20;\">"
dwl=window.location;dwl=String(dwl).split('/');dwl=dwl[dwl.length-1];dwl=dwl.replace(/\?.+/,"")
//--------------------------------------------
// Assinatura
//--------------------------------------------
sbold2=""; // negrito da assinatura padrao
if(VC('bf.'+whoid)==undefined){SC('bf.'+whoid,'-1')}; // se nÃ£o tiver nada gravado no cookie grava o valor -1
contsainfull=VC('bf.'+whoid); // pega todas as assinaturas do cookie
	//GERA O CONTEUDO DA ASSINATURA
function loadmenuassinatura()
{
namesain=[]; // array dos titulos da assinatura
contsain=[]; // array dos conteudos
contmenusain="";
sainsp=contsainfull.split(','); // da split
		y=0;
	for(i=1;i<sainsp.length;i=i+2) // gera todos os titulos das assinaturas
	{
	namesain[y]=unescape(sainsp[i]);
	y++;
	};
		y=0;
	for(i=2;i<sainsp.length;i=i+2) // gera todos os conteudos das assinaturas
	{
	contsain[y]=unescape(sainsp[i]);
	y++;
	};
	for(i=0;i<contsain.length;i++)
	{
		if(i==sainsp[0]){sbold="<b>"}else{sbold=""};
	contmenusain+="<tr><td width=\"80\"><a href=\"javascript://\" onclick=\"addsaintxt("+i+")\" "+sbutton+"><div>"+sbold+namesain[i]+"</b></div></a></td>"+ // TÃtulo
	"<td><a href=\"javascript://\" onclick=\"editassinatura("+i+")\" title=\""+L[2]+" &#34;"+namesain[i]+"&#34;\" "+sbutton+"><div>[E]</div></a></td>"+ // BotÃ£o Editar
	"<td><a href=\"javascript://\" onclick=\"deleteassinatura("+i+")\" title=\""+L[3]+" &#34;"+namesain[i]+"&#34;\" "+sbutton+"><div>[D]</div></a></td>"+ // BotÃ£o Deletar
	"<td><a href=\"javascript://\" onclick=\"assinaturapadrao("+i+")\" title=\""+L[4]+" &#34;"+namesain[i]+"&#34;\" "+sbutton+"><div>["+L[6]+"]</div></a></td></tr>"; // BotÃ£o Tornar PadrÃ£o
	};
if(contsainfull.substring(0,2)=="-1"){sbold2="<b>"}else{sbold2=""}; // se o n da assinatura padrao for -1 a assinatura serÃ¡ a divulgacao
}
loadmenuassinatura();
	//MONTA O MENU DA ASSINATURA
function menuassinatura()
{
loadmenuassinatura();
gebi('bf.assinatura').innerHTML=bmenu()+
"<div id=\"bf.divassinatura\" style=\"height:"+eval(window.innerHeight-150)+"; overflow-y: auto; overflow-x: hidden;\"><table border=\"0\">"+
"<tr><td width=\"80\"><a href=\"javascript://\" onclick=\"saindivulgacao()\" "+sbutton+"><div>"+sbold2+L[0]+"</b></div></a></td>"+
"<td></td>"+
"<td></td>"+
"<td><a href=\"javascript://\" onclick=\"assinaturapadrao(-1)\" title=\""+L[4]+" &#34;"+L[0]+"&#34;\" "+sbutton+"><div>["+L[6]+"]</div></a></td></tr>"+
contmenusain+
"</table></div>"+
"<a href=\"javascript://\" onclick=\"adicionaassinatura()\" "+sbutton+">["+L[1]+"]</a><br>"+
//"<a href=\"javascript://\" onclick=\"prompt('Copie o texto abaixo e salve em um arquivo .txt',contsainfull)\" "+sbutton+">[Backup]</a><br>"+
//"<a href=\"javascript://\" onclick=\"contsainfull=prompt('Cole o codigo da sua assinatura',contsainfull)\" "+sbutton+">[Backdown]</a><br>"+
"<a href=\"javascript://\" onclick=\"gebi('bf.assinatura').innerHTML=''\" "+sbutton+">["+L[5]+"]</a>"+
"</table>"+
bmenuf();
	//ELIMINA AS "SOBRAS" DO TAMANHO CASO HAJA
	y=0;
	wih=eval(window.innerHeight-150);
	while(y==0)
	{
	gebi('bf.divassinatura').style.height=wih;
	wih=wih-10;
	gebi('bf.divassinatura').scrollTop=1; // verifica se hÃ¡ barra
		if(gebi('bf.divassinatura').scrollTop==1)
		{
		gebi('bf.divassinatura').style.height=wih+20;
		y=1; // PÃ¡ra o while
		};
	};
}
//--------------------------------------------
// Adiciona Assinatura na textarea
//--------------------------------------------
function addsaintxt(n)
{
if(!txta(0)){return;} // se nao tiver uma txtarea nao vai
if(n==-1){saindivulgacao();return;} // se o numero for -1 adicionarÃ¡ a assinatura de divulgacao
	if(txta(0).value.indexOf(contsain[n])>-1) // se a assinatura ja foi adicionada, pedirÃ¡ confirmacao
	{
		if(confirm(L[8])==true)
		{
		txta(0).value+="\n\n"+contsain[n];
		txta(0).focus();txta(0).scrollTop="1000";
		};return;
	}
txta(0).value+="\n\n"+contsain[n];
txta(0).focus();txta(0).scrollTop="1000";
}
	//ASSINATURA DE DIVULGACAO
function saindivulgacao()
{
saind="[b]"+L[7]+" [link=http://www.orkut.com/Community.aspx?][Blue]Barra de FormataÃ§Ã£o[/Blue][/link] [Red]v."+ver+"[/Red] by [link=http://www.orkut.com/Profile.aspx?uid=14120214624826910449][Green]Link[/Green][/link][/b]";
	if(txta(0).value.indexOf(saind)>-1)
	{
		if(confirm(L[8])==true)
		{
		txta(0).value+="\n\n"+saind;
		txta(0).focus();
		txta(0).scrollTop="1000";
		};return;
	}
txta(0).value+="\n\n"+saind;
txta(0).focus();txta(0).scrollTop="1000";
}
//--------------------------------------------
// Adiciona Assinatura no Cookie
//--------------------------------------------
	//ABRE O MENU
function adicionaassinatura()
{
gebi('bf.assinatura').innerHTML=bmenu(2)+
L[10]+"<br>"+ // titulo
"<input id=\"inputsain\" type=\"text\" value=\"\"><br>"+ // input do titulo
L[11]+"<br>"+ // assinatura
"<textarea cols=45 rows=15 id=\"txtsain\"></textarea><br>"+ // textarea do cont. da assinatura
"<a href=\"javascript://\" onclick=\"addassinatura()\" "+sbutton+">[OK]</a> "+ // botÃ£o ok
"<a href=\"javascript://\" onclick=\"gebi('bf.assinatura').innerHTML=''\" "+sbutton+">["+L[12]+"]</a>"+ // botÃ£o cancelar
bmenuf();
}
	//ADICIONA A ASSINATURA NO "COOKIE"
function addassinatura()
{
editsn=escape(gebi('inputsain').value); // da escape no titulo
editsc=escape(gebi('txtsain').value); // da escape no conteudo
contsainfull+=","+editsn+","+editsc; // adiciona a assinatura no fim da variÃ¡vel
SC('bf.'+whoid,contsainfull); // grava no cookie
menuassinatura();
gebi('bf.divassinatura').scrollTop=1000000;
}
//--------------------------------------------
// Edita Assinatura
//--------------------------------------------
	//CRIA O MENU
function editassinatura(n)
{
mast=gebi('bf.divassinatura').scrollTop; // pega onde a barra de rolagem estava
editsn=escape(namesain[n]); 
editsc=escape(contsain[n]);
gebi('bf.assinatura').innerHTML=bmenu(2)+
L[10]+"<br>"+
"<input id=\"inputsain\" type=\"text\" value=\""+namesain[n]+"\"><br>"+
L[11]+"<br>"+
"<textarea cols=45 rows=15 id=\"txtsain\">"+contsain[n]+"</textarea><br>"+
"<a href=\"javascript://\" onclick=\"editsain("+n+")\" "+sbutton+">[OK]</a> "+
"<a href=\"javascript://\" onclick=\"gebi('bf.assinatura').innerHTML=''\" "+sbutton+">["+L[12]+"]</a>"+
bmenuf();
}
	//EDITA E GRAVA "COOKIE"
function editsain(n)
{
var inputsain=escape(gebi('inputsain').value); // pega o nome com escape
var txtsain=escape(gebi('txtsain').value); // pega o conteudo com escape
sainsp=contsainfull.split(','); // da o split
sainsp[n*2+1]=inputsain; //muda o nome
sainsp[n*2+2]=txtsain; // muda o conteudo
contsainfull=sainsp.join(','); // da o join
SC('bf.'+whoid,contsainfull); // grava no cookie
menuassinatura(); // chama o menu
gebi('bf.divassinatura').scrollTop=mast; // joga de volta
}
//--------------------------------------------
// Deleta Assinatura
//--------------------------------------------
function deleteassinatura(n)
{
mast=gebi('bf.divassinatura').scrollTop; // pega onde a barra de rolagem estava
sainsp=contsainfull.split(','); // da o split na assinatura
	if(confirm(L[9]+ ' "'+namesain[n]+'"?')==false){return;}; // pergunta se quer mesmo deletar
	if(n<=sainsp[0]) // caso o n seja menor ou igual ele joga a assinatura padra para a de cima
	{
	sainsp[0]=sainsp[0]-1;
	sainsp.join(',');
	contsainfull=sainsp;
	}
sainsp[n*2+1]="|"; // muda a parte escolhida pra "|"
sainsp[n*2+2]="|"; // pra depois receber o replace
contsainfull=String(sainsp).replace(/\,\|\,\|/gi,''); // da o replace
SC('bf.'+whoid,contsainfull); // grava no cookie
menuassinatura(); // chama o menu
gebi('bf.divassinatura').scrollTop=mast; // joga de volta
}
//--------------------------------------------
// Muda a Assinatura PadrÃ£o
//--------------------------------------------
function assinaturapadrao(n)
{
mast=gebi('bf.divassinatura').scrollTop; // pega onde a barra de rolagem estava
sainsp=contsainfull.split(','); // da split
sainsp[0]=n; // muda o numero para o padrao
contsainfull=sainsp.join(','); // da o join
SC('bf.'+whoid,contsainfull); // guarda no cookie
menuassinatura(); // chama o menu
gebi('bf.divassinatura').scrollTop=mast; // joga de volta
}
//--------------------------------------------
// Adicionar a assinatura padrÃ£o
//--------------------------------------------
function addassinaturapadrao()
{
sainsp=contsainfull.split(','); // pega o no. da assinatura padrao
addsaintxt(sainsp[0]); // chama a funÃ§Ã£o addsaintxt() pra jogar pro txtarea
}
//--------------------------------------------
// FunÃ§Ã£o principal usada em algumas funÃ§Ãµes como Insert(),smilie();
//--------------------------------------------
function mainInsert()
{
txtarea=txta(0); // diz que a var txtarea eh igual ao txt(0)
txtst=txtarea.scrollTop; // pega onde foi deixado
txtsl=txtarea.scrollLeft; // as barras de rolagem
selLength=txtarea.textLength; // tamanho do texto
selStart=txtarea.selectionStart; // comeÃ§o de onde selecionou
selEnd=txtarea.selectionEnd; // fim de onde selecionou
s1=(txtarea.value).substring(0,selStart); // define s1 (antes do que foi selecionado)
s2=(txtarea.value).substring(selStart,selEnd); // define s2 (o que foi selecionado)
s3=(txtarea.value).substring(selEnd,selLength); // define s3 (depois do que foi selecionado)
}
//--------------------------------------------
// Inserir Tags, como: b, i, u, cores
//--------------------------------------------
function Insert(tag)
{
	if(!txta(0)){return;} // se nao tiver uma txtarea nao vai
	mainInsert(); // chama a funÃ§Ã£o principal
txtarea.value = s1+'['+tag+']'+ s2+'[/'+tag+']'+s3;
txtarea.selectionStart=selStart+tag.length+2;			
txtarea.selectionEnd=selStart+tag.length+s2.length+2;
txtarea.focus(); // da focus na textarea
txtarea.scrollTop=txtst; // volta as barras de rolagem
txtarea.scrollLeft=txtsl; // pra posiÃ§Ã£o em que elas estavam antes
}
//--------------------------------------------
// Inserir Link com TÃtulo
//--------------------------------------------
function InsertTLink()
{
	if(!txta(0)){return;} // se nao tiver uma txtarea nao vai
	mainInsert(); // chama a funÃ§Ã£o principal
var url=L[40]; // Digite o endereÃ§o do site
var url_name=L[41]; // Digite o nome do link
var v_url=prompt(url,"http://");
		if(v_url==null){return;}
	if (s2=="") // se nÃ£o for selecionado
	{
	var v_url_name=prompt(url_name, "");
		if(v_url_name==null){return;}
	txtarea.value = s1 + '[link=' +v_url+ ']' + v_url_name + '[/link]' + s3;
	txtarea.selectionStart = selStart+s2.length+14+v_url.length+v_url_name.length;
	txtarea.selectionEnd = selStart+s2.length+14+v_url.length+v_url_name.length;
	txtarea.focus(); // da focus na textarea
	txtarea.scrollTop=txtst; // volta as barras de rolagem
	txtarea.scrollLeft=txtsl; // pra posiÃ§Ã£o em que elas estavam antes
	}		
	else // se for selecionado
	{
	txtarea.value = s1 + '[link=' +v_url+ ']' + s2 + '[/link]' + s3;
	txtarea.selectionStart = selStart+7+v_url.length;
	txtarea.selectionEnd = selStart+s2.length+7+v_url.length;
	txtarea.focus(); // da focus na textarea
	txtarea.scrollTop=txtst; // volta as barras de rolagem
	txtarea.scrollLeft=txtsl; // pra posiÃ§Ã£o em que elas estavam antes
	};
}
//--------------------------------------------
// Inserir Link e Imagem
//--------------------------------------------
function InsertLinkImg(tag){
	if(!txta(0)){return;} // se nao tiver uma txtarea nao vai
	mainInsert(); // chama a funÃ§Ã£o principal
var url=L[40];
	if (s2=="") // se nÃ£o for selecionado
	{
	var v_url=prompt(url,"http://");
		if(v_url==null){return;}
	txtarea.value = s1 + '['+tag+']' + v_url + '[/'+tag+']' + s3;
	txtarea.selectionStart = selStart+(tag.length*2)+s2.length+5+v_url.length;
	txtarea.selectionEnd = selStart+(tag.length*2)+s2.length+5+v_url.length;
	txtarea.focus(); // da focus na textarea
	txtarea.scrollTop=txtst; // volta as barras de rolagem
	txtarea.scrollLeft=txtsl; // pra posiÃ§Ã£o em que elas estavam antes
	} 
	else // se for selecionado
	{
	txtarea.value = s1 + '['+tag+']' + s2 + '[/'+tag+']' + s3;
	txtarea.selectionStart = selStart+tag.length+2;
	txtarea.selectionEnd = selStart+tag.length+s2.length+2;
	txtarea.focus(); // da focus na textarea
	txtarea.scrollTop=txtst; // volta as barras de rolagem
	txtarea.scrollLeft=txtsl; // pra posiÃ§Ã£o em que elas estavam antes
	}
}
//--------------------------------------------
// Opacity
//--------------------------------------------
function Busca(url,url2,desc)
{
var prpt=prompt(desc,"");
	if(prpt!=null)
	{
	window.location="http://www.orkut.com/"+url+prpt+url2;
	}
}
//--------------------------------------------
// Opacity
//--------------------------------------------
var _low;
var _high;
var lowh;
function high()
{
clearTimeout(lowh)
	if(parseFloat(gebi('barraformatacao').style.MozOpacity)==0.1)
	{
	clearTimeout(_high);
	high2();
	}
}
function high2()
{
	if(parseFloat(gebi('barraformatacao').style.MozOpacity)<1 && parseFloat(gebi('barraformatacao').style.MozOpacity)>=0.1)
	{
	gebi('barraformatacao').style.MozOpacity=parseFloat(gebi('barraformatacao').style.MozOpacity)+0.1;
	_low=setTimeout("high2()",20);
	}
}	
function low()
{
	if(parseFloat(gebi('barraformatacao').style.MozOpacity)==1)
	{
	lowh=setTimeout("clearTimeout(_low);low2()",1000);
	}
}
function low2()
{
	if(parseFloat(gebi('barraformatacao').style.MozOpacity)<=1 && parseFloat(gebi('barraformatacao').style.MozOpacity)>0.1)
	{
	gebi('barraformatacao').style.MozOpacity-=0.1;
	_low=setTimeout("low2()",50);
	}
}
window.onscroll=low2;
//--------------------------------------------
// Menu Txtcolor
//--------------------------------------------
function btxt(cor){return "<tr><td width=\"50%\" height=\"17\" bgcolor=\""+cor+"\" onclick=\"Insert('"+cor+"')\" title=\""+cor+"\"></td>"};
function menutxtcolor()
{
gebi('bf.txtcolor').innerHTML="<table style=\"border-collapse: collapse; border: 1px solid black;\" bordercolor=\"black\" cellspacing=0 cellpadding=0 width=55 border=1>"+
btxt('Navy')+btxt('Blue')+btxt('Red')+btxt('Green')+btxt('Purple')+btxt('Fuchsia')+btxt('Violet')+
btxt('Pink')+btxt('Aqua')+btxt('Lime')+btxt('Olive')+btxt('Teal')+
btxt('Gray')+btxt('Silver')+btxt('Yellow')+btxt('Gold')+btxt('Orange')+btxt('Maroon')+
"</td></tr></table>";
}
//--------------------------------------------
// Fecha os menus
//--------------------------------------------
function closeallmenu(x)
{
	if(x!=1)
	{
	//gebi('bf.assinatura').innerHTML="";
	gebi('bf.txtcolor').innerHTML="";
	gebi('bf.orkut').innerHTML="";
	gebi('bf.mcomu').innerHTML="";
	gebi('bf.emo').innerHTML="";
	}
}
//--------------------------------------------
// Quando perde o focus
//--------------------------------------------
up=0;
function onunfocus()
{
	if(up==0)
	{
	//gebi('bf.assinatura').innerHTML="";
	gebi('bf.txtcolor').innerHTML="";
	gebi('bf.orkut').innerHTML="";
	gebi('bf.mcomu').innerHTML="";
	gebi('bf.emo').innerHTML="";
	}
}
function onunblur()
{
up=0;
onunfocus();
}
//--------------------------------------------
// Menu Orkut
//--------------------------------------------
function mainmo(url,url2,name,img)
{
return "<tr title=\""+L[37].replace(/\,/,'|')+"\" style=\"cursor: default;background: "+bcolor+"\" onmouseover=\"window.status='"+name+"';this.style.MozOpacity=0.9;return true\" onmouseout=\"this.style.MozOpacity=1\"><td width=\"142\" height=\"18\"><a href=\"http://www.orkut.com/"+url+".aspx"+url2+"\" style=\"text-decoration: none; color: #000000; cursor: default\"><div><img border=\"0\" src=\"data:image/gif;base64,"+img+"\" align=\"absmiddle\" height=\"19\" width=\"24\"> "+name+"</div></a></td></tr>"
}

function menuorkut()
{
gebi('bf.orkut').innerHTML=""+
"<table bgcolor=\"black\" bordercolor=\"black\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\"><tr><td>"+
"<table width=\"155\" style=\"border-collapse: collapse\" border=\"0\" bordercolor=\"black\" cellspacing=\"0\" cellpadding=\"0\">"+

mainmo('Home','','Home','R0lGODlhGAATAOYAAAAAAN%2F6APr26tbhtgoAIA4AAOj3KOvo%2F%2F%2F%2FwwACEuf0Dtv%2F%2Fw4ADRQARun%2F9uv5APz%2F3wAIAP%2Fw%2FxYAQv%2F%2F%2FxgPAP%2FnAPD%2F2P719v%2F2KQIPGAoAABYABv%2F%2FF%2FX%2F%2FxUAGf%2F68ez3%2F%2Fn%2F9gYAEBUAJvn%2BJhkORgAPAP%2F3%2F%2B7%2FBREABv%2F%2F5v%2F%2F0%2FTw%2FwoHDh0AAOb9AP3%2FKuv68wMECQcAB%2B7%2FABIHA%2F%2F%2FzP%2F%2F9AoGAx8AFvX%2F1Pf6%2F%2F%2F%2B7%2BH%2FAPX%2F6AMAFQsQAP%2F%2FM%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAEMALAAAAAAYABMAAAewgEOCg4SFhoeIiYqLjIUbOoIAJ42EDBkWJEMAAJSRJRsVNZuclCY1Gw4LLgablEEBHyg9Hh4vQhyNHCkJKyIiKCgtET4qixE1BD8SPBIIFDcUIykaiwUtOxQrzcADKxuMEywhIEA2oBQoCDSMGxgeGCM1MNYUPQSMDQIeEBsdCioQAo5gBICCDAoFasRgsILHgYGLGODYIYFBhwcfWlwQQUqRixkAcowa2bGTyZODAgEAOw%3D%3D')+
mainmo('Profile','',L[24],'R0lGODlhGAATAMQAAAAAAKuRJytmtG%2BZ04p0FfLPPJugiUR7xOXAKvXaaYqu4pWMU8mqLleJyjZxv%2FXVU3ej4ZW03H2j1vbdd5%2B74f%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABUALAAAAAAYABMAAAVlYCWOZGmeaKquLAm8QGsC05Q8sSwCSf8UiJwM8CgCGcIWoHBkBJIsAILhDBCg0YD1qhsBDIuFAbsCUBQKyKBBRgEiCsm6cXC0Z%2FIGvS6wR%2FN1DoICAndea4GDhIZeMI4vXZGSJCEAOw%3D%3D')+
mainmo('EditGeneral','',L[25],'R0lGODlhGAATAMQAAAAAAKufZjZxv4mq1oZuRe39DGcJAvXXXs%2B8uO3JOmKQyBEGHKaMI8qpJenanNnVwf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABAALAAAAAAYABMAAAViICSOZGmeaKqubOuiywK0QD2Pi2GwwOEnN0BBcVP1DgmgSEhYpGyAZIMxWxQeTtQR2JgSZszsKZpoQAEOK0I8ngYAg4FCMbB%2BV7b4XCGwso1yAoJ9RTx8gwKFNGcvjY6PjSEAOw%3D%3D')+
mainmo('Album','',L[26],'R0lGODlhGAATALMAAAAAAAmb44y06CkpKfD%2F%2FQ4NMEpKSgcTABcXFxEEDwQCB%2F%2F%2F%2FwAAAAAAAAAAAAAAACH5BAUUAAsALAAAAAAYABMAAARLcMlJq7046827RwMCehRinMYweEDrvu4GCHRtC4BsK4Bi55oZTUEIBAo1YEaIMwaYSgzUCdUlWz%2FrLRtMJBSHQ%2BELOPBI6LR6nY4AADs%3D')+
mainmo('Settings','',L[23],'R0lGODlhGAATAMQAAAARA26nlYcFBod5biY6MvLQpgolQKS3qGYMGq4ZEhMaL2pnXZmZZu%2FK2jAlBaLC2zEQTBArDsAqAZd%2Bj%2FOqsS8bKj02UCUXB8ZSB7agtsq11Iutn6oxCv%2F%2F%2FwAAAAAAACH5BAUUAB0ALAAAAAAYABMAAAVqYCeOZGmeaKqu7FhdVWVULWkMx8YwC1F3hkUjc5gAELWKw7JrTCK%2FyCCjCUwWEgSkBhkMHgODAtMQAGqKwMAhiiQKAmjrRXJwKILLrxSRwA17JBYSFAhygUAccBaIIgR3W40dEWySlpctIQA7')+
mainmo('Marks','',L[27],'R0lGODlhGAATAMQAAAAAAMjKxYWKbCsvIfz89lRWU7e4rwwNDeLi4J2dp0BAPJmZmfP34B0eHGZmZri6u0tNR8PJraqqqIyOh9HV2P%2F%2F%2FzMzM%2Bnq5KChl%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABkALAAAAAAYABMAAAVxYCaOZGmeaKqWwKoCQNW6bBNUVXDQIkzhDoeMlwFIDJFCAVdp8GIDCKECseBmq5jCMGkgqEMXwMLASCoL6xebAhAEFcJhUXkIK7tXjNDAWRQ5bG0MCXVuFQgWTxUXCwZXglkVDIyRYjcwRCyWmp2eIyEAOw%3D%3D')+
mainmo('Scrapbook','',L[28],'R0lGODlhGAATAMQAAAAAAM%2BvV2pRJ%2F%2F%2F%2F0UtEJBxafK4hMqceiMaGlRUV%2Bm7LaqNH0c4Oem0bodrM6uAU%2BKfZfHCj9yvePfMcGRSTeClUf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABYALAAAAAAYABMAAAV9oCWOZGmeJACIqkhRaKrONB1bwKAOet7rNx9vSATGhEQAYrg6FgcJhLCJQg4YM2aQSHEIdjzqSUg5RCSO6fYqaUAMB7WTEZlU3g95FUF4BCIGEQV6YwgCBGUNBl9aRwsBCHwCh4QmBApeDgRZjWMLCgSfDghYNUc1YjeqqiEAOw%3D%3D')+
mainmo('TestimonialView','',L[29],'R0lGODlhGAATAMQAAAAAAMSuYoV0R%2B3Uxtfar66kVv%2FzxI%2BVdP%2F%2F%2F9PIiu%2FguKafgqqWT97m2ZODRfziqfTx0rmob8Wzcffj2P%2FjwZ6Oae3koeHYtP%2F74cq5eujmy%2F%2FntP%2F%2F%2FwAAAAAAAAAAACH5BAUUABwALAAAAAAYABMAAAVgICeOZGmeaKqawLoCSeuigDbIcwk0yIbnHAAFoSEQfi6AAqOwJApIFeCyUEYK0BxgAAFUIhmGIEqbAAwZiWOs1QAehQDDQaZNExIGoH7aGxIHbEBBFXt7gyKHiIuMjTMhADs%3D')+
mainmo('ProfileF','',L[30],'R0lGODlhGAATAMQAADMzM%2FLGEoB5W1JSUo2Njdm3MKaWVkJCQmZiVXV1df%2FMAM2vPZmZmZqNWU9OS%2Ba%2FInNuWr%2BnRzs7O1taUmZmZqWlpbOfT42EXPTHEmdkV1paWv%2F%2F%2FwAAAAAAAAAAAAAAACH5BAUUABsALAAAAAAYABMAAAVx4CaOZGmeaKqS0rCqzOQwLzoYV1KfwFMcu1JMoZjVKIBkskFsKAGZlOYSIFqvisdERXEssNbIgfCSXDBXjAC4AxSuD0CQ4QBDaEeBIgCZvC0uNRIRCwcUBAcNAXIvDIkHFSMOCBN4Kwc6JQmBQZ2eJSEAOw%3D%3D')+
mainmo('Messages','',L[31],'R0lGODlhGAATANUAAAAAAMzMzGB01%2BcAACMdP7q7vHhtaZmZmczM%2FwAA2%2BtoNFZXTx8WAGJn6aajuEVDUfj8%2F4SMnN7d5WM8P6Ke%2F2ZmZkhBSPny%2F0NBRgkGG%2Bzv%2F7SblmJhXebl4E5LaDoyDn6DXz07PNfV4JqWrbKuq%2FLz7XNeSf%2F%2F%2F6Ger09QUuXi919cb6%2Bpw3x3WjIkAY99ZVVSZePo7ExKV6aimUpJRVhYVmVjcMTBvOHe8fX3%2F2s8RHNhSUxLSVxXXf%2F%2F%2FwAAACH5BAUUAD4ALAAAAAAYABMAAAakQJ9wSCwaj8hkEcBsOp%2FPIaBArVqvV4BwCu0%2BC9ptJDA7mc%2Foc%2BsDCvuYNxInfYIM0i%2BXe9sJVOoQEDE5J3doO3tvCyUBKWaBhScKZxsmAAxLNRISD2Yak3eGDQkCiW8VIigZZ3egJxQCOqZvNjgOq2aGZggTs1srKiMEdCcGvlIwGiweaTzHRAAyFyIwJzkSGM9LPQcYIQcW2kYANE5K5%2BjpSEEAOw%3D%3D')+
mainmo('Friends','',L[32],'R0lGODlhGAATAKIAAAAAAMDAwAAA%2F4CAgH507f%2F%2F%2FxAAzv%2F%2F%2FyH5BAUUAAcALAAAAAAYABMAAANAeLrc%2FjDKSRe4uDLMr%2B7d1xUFoB1jIZjiRb4shb1kLM%2FwiQJ0qaMwm2aQ%2BxmOpIBBZyA4jwHCUnOsWge%2FrPaQAAA7')+
"<tr style=\"cursor: default;background: "+bcolor+"\" onmouseover=\"window.status='';this.style.MozOpacity=0.9;return true\" onmouseout=\"this.style.MozOpacity=1\"><td width=\"142\" height=\"18\"><a href=\"javascript://\" onclick=\"mcomu()\" style=\"text-decoration: none; color: #000000; cursor: default\"><div><img border=\"0\" src=\"data:image/gif;base64,R0lGODlhGAATAKIAAAAAAMCAwL59vsSExP%2F%2F%2FwAAAAAAAAAAACH5BAUUAAQALAAAAAAYABMAAANJSLrc%2FjBKQIGMQIRtbwNDGAadpwCBGJYmqg4V5YFvtpGzoAu0iF8xl4oFCaaGQA3nBZu8SDse8CgKzqgr06JX1W6jRG3MS3YkAAA7\" align=\"absmiddle\" height=\"19\" width=\"24\"> "+L[33]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+String.fromCharCode(9654)+"</div></a></td></tr>"+
"</table>"+
"</td></tr></table>"+

"<table heigth=\"1\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td></td></tr></table>"+ // SEPARA

"<table bgcolor=\"black\" bordercolor=\"black\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\"><tr><td>"+
"<table width=\"155\" style=\"border-collapse: collapse\" border=\"0\" bordercolor=\"black\" cellspacing=\"0\" cellpadding=\"0\">"+
mainmo('Profile','?uid=15998896938353128878',L[34],'R0lGODlhGAATAMQAAAAAAKuRJytmtG%2BZ04p0FfLPPJugiUR7xOXAKvXaaYqu4pWMU8mqLleJyjZxv%2FXVU3ej4ZW03H2j1vbdd5%2B74f%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABUALAAAAAAYABMAAAVlYCWOZGmeaKquLAm8QGsC05Q8sSwCSf8UiJwM8CgCGcIWoHBkBJIsAILhDBCg0YD1qhsBDIuFAbsCUBQKyKBBRgEiCsm6cXC0Z%2FIGvS6wR%2FN1DoICAndea4GDhIZeMI4vXZGSJCEAOw%3D%3D')+
mainmo('Community','?cmm=8515367',L[35],'R0lGODlhGAATAKIAAAAAAMCAwL59vsSExP%2F%2F%2FwAAAAAAAAAAACH5BAUUAAQALAAAAAAYABMAAANJSLrc%2FjBKQIGMQIRtbwNDGAadpwCBGJYmqg4V5YFvtpGzoAu0iF8xl4oFCaaGQA3nBZu8SDse8CgKzqgr06JX1W6jRG3MS3YkAAA7')+
"<tr style=\"cursor: default;background: "+bcolor+"\" onmouseover=\"window.status='';this.style.MozOpacity=0.9;return true\" onmouseout=\"this.style.MozOpacity=1\"><td width=\"142\" height=\"18\"><a href=\"javascript://\" onclick=\"window.open('http://geocities.yahoo.com.br/linkjs_img/about.htm?ver='+ver,'bf.orkut','left='+lado+',top='+cima+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=300,height=350')\" style=\"text-decoration: none; color: #000000; cursor: default\"><div><img border=\"0\" src=\"data:image/gif;base64,R0lGODlhGAATALMAAAAAAMC6ALaxANfQAMrEAOXeAN3WAMbAALy2AMzMANnTAP%2F%2F%2FwAAAAAAAAAAAAAAACH5BAUUAAsALAAAAAAYABMAAARacMlJq704680n%2BF9HfUVpGGEHlMV3Jgegsm4Cy9tKA8MAB7iMrvTpEQLA3OlUJBwCiCCGp6h%2BCEeo9AKweZ0HhHjLPZg%2FyLEKmRYLBOQpwP1OiRYg%2B33P73ciADs%3D\" align=\"absmiddle\" height=\"19\" width=\"24\"> About</div></a></td></tr>"+
"</table>"+
"</td></tr></table>";
}
//--------------------------------------------
// Menu Comunidades
//--------------------------------------------
mccont="";
mccontcomp="";
mcmouse="0";
mcbtyes="0";
function mcomu()
{
document.getElementsByTagName('input')[0].focus();
menuorkut()
	if(mccontcomp!=""){setTimeout("gebi('bf.mcomu').innerHTML=mccontcomp;",0);return;};
gebi('bf.mcomu').innerHTML=bmenu()+L[38]+bmenuf();
xml=new XMLHttpRequest(); // rotina xml by Elsio
xml.open("GET","Communities.aspx",true);
xml.onreadystatechange=function()
{
	if(xml.readyState==4)
	{
	var xmlresp=xml.responseText;
	xmlresp=xmlresp.replace(/\n/gi,'<pulalinha>').replace(/.+\<noscript\>(.+)\<\/noscript\>/gi,'$1').replace(/\<pulalinha\>/gi,'\n');
	mcmatch=xmlresp.match(/\<a href="\/Community.aspx.cmm=\d+" \>.+\<\/a\>/gi);
		if(!mcmatch){gebi('bf.mcomu').innerHTML=bmenu()+L[39]+bmenuf();return;}
		sizemenu=mcmatch.length*14
		if(sizemenu>eval(window.innerHeight-100)){sizemenu=eval(window.innerHeight-100);mcbtyes=1}
	//mcmatch=mcmatch.sort();
		for(i=0;i<mcmatch.length;i++)
		{
		mccont+="<tr title=\""+L[37].replace(/\,/,'|')+"\" style=\"cursor: default;background: "+bcolor+"\" onmouseover=\"window.status='';this.style.MozOpacity=0.9;return true\" onmouseout=\"this.style.MozOpacity=1\"><td width=\"142\" height=\"14\">" +mcmatch[i].replace(/\>(.+)\</," style=\"text-decoration: none; color: #000000; cursor: default; font-size:10\"><div> $1</div><") +"</td></tr>";
		}
	mccontcomp+="<table bgcolor=\"black\" bordercolor=\"black\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\">";
	if(mcbtyes==1){mccontcomp+="<tr><td><a style=\"font-size: 9;cursor: default; text-decoration: none; color: black\" onmouseover=\"mcmouse=1;mcup()\" onmouseout=\"mcmouse=0\"><div style=\"background-color: "+bcolor+"\" onmouseover=\"window.status='';this.style.MozOpacity=0.9;return true\" onmouseout=\"this.style.MozOpacity=1\"><center>"+String.fromCharCode(9650)+"</center></div></a>";}
	mccontcomp+="</td></tr><tr><td>"+
	"<div id=\"mcdiv\" style=\"height: "+sizemenu+"; overflow-y: hidden; overflow-x: hidden;\">"+
	"<table width=\"200\" style=\"border-collapse: collapse\" border=\"0\" bordercolor=\"black\" cellspacing=\"0\" cellpadding=\"0\">"+
	mccont+
	"</table>"+
	"</div>";
	if(mcbtyes==1){mccontcomp+="</td><tr><td><a style=\"font-size: 9;cursor: default; text-decoration: none; color: black\" onmouseover=\"mcmouse=1;mcdown()\" onmouseout=\"mcmouse=0\"><div style=\"background-color: "+bcolor+"\" onmouseover=\"window.status='';this.style.MozOpacity=0.9;return true\" onmouseout=\"this.style.MozOpacity=1\"><center>"+String.fromCharCode(9660)+"</center></div></a>";}
	mccontcomp+="</td></tr></table>";
	gebi('bf.mcomu').innerHTML=mccontcomp;
	}
};
xml.send(null);
}
	// FUNÃ‡ÃƒO PARA SUBIR E DESCER O MENU COMUNIDADES
function mcup()
{
document.getElementById('mcdiv').scrollTop-=14;
	if(mcmouse==1){setTimeout("mcup()",50);}
}

function mcdown()
{
document.getElementById('mcdiv').scrollTop+=14;
	if(mcmouse==1){setTimeout("mcdown()",50);}
}
//--------------------------------------------
// Texto Perdido
//--------------------------------------------
function gtxtlost()
{
	if(txta(0) && txta(0).value!="")
	{
	SC('bf.txtlost',escape(txta(0).value))
	};
}

function wtxtlost()
{
if(VC('bf.txtlost')==undefined){return};
var txtlostescape=unescape(VC('bf.txtlost'))
	if(txta(0) && txta(0).value.indexOf(txtlostescape)==-1)	
	{
	txta(0).value=txtlostescape+"\n"+txta(0).value;
	txta(0).focus();
	}
}
window.onunload=gtxtlost
//--------------------------------------------
// Menu Emoticons
//--------------------------------------------
function emo() // <- tem nada a ver com emos aushahsuahs
{
var vemo="";
vemo+=""+
bmenu()+
"<table><tr>"+
imgemo('8)','http://images3.orkut.com/img/i_cool.gif')+
imgemo(':(','http://images3.orkut.com/img/i_sad.gif')+
imgemo(':x','http://images3.orkut.com/img/i_angry.gif')+
"</tr>"+
"<tr>"+
imgemo(':)','http://images3.orkut.com/img/i_smile.gif')+
imgemo(';)','http://images3.orkut.com/img/i_wink.gif')+
imgemo(':D','http://images3.orkut.com/img/i_bigsmile.gif')+
"</tr>"+
"<tr>"+
imgemo(':o','http://images3.orkut.com/img/i_surprise.gif')+
imgemo(':P','http://images3.orkut.com/img/i_funny.gif')+
imgemo('/)','http://images3.orkut.com/img/i_confuse.gif')+
"</tr>";
	if(gebi('fso_atualization')){ // se tiver o fsorkut
	vemo+="<tr>"+
	imgemo('8.8','R0lGODlhEAAQANUAAAAAABMPBRUTCBoaGiUfCyYhCzQyL0MvFUc8ME1AFkpFPGlaNn1iJ0xLSG1VQnhtWXJwbpl7OLx%2FNoBzSYV%2Bc6x%2FTLJ%2FRrWVOL2kPI%2BFcpKMcrOMUqiScLaieMWNOMyWO9CWPdOqPsmSS8ObYtiqRceobMaqd8mxd9euaNaoe%2BucUO%2BxTPCzavLOSPrnS5CQj6%2BfhbiskLKyssq0j8i8ptXJsfrShubRr%2F3luM7Ozufbxvns1uTk5Pnx5fj4%2BAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFFAAAACwAAAAAEAAQAAAGxUCAUKiLwY6z3nCpg9VosejsqRzGaLSaTne7zUpTnfBa2%2FXOux3OxjppnzWIodFL7xQGxsrUKUJePgEIXQg5Mj8MIzMzGT8QMgIGCws%2FMi8DAxEdMBw%2FngIQk54%2FcxccHCkIDy8%2FBBgYBRQQPwkkpywiDgoCIS0uIQ0GByQtpyrHJMQuyy0tK88cJirPIB%2B%2Bv9bNezUlK8Qtvcq9LSY3HTMjJMwS6i4tIieLAF0oviIcG74kJzE3Qz0pPHiwoKGCQBH%2BhAQBACH5BAUUAAAALAIABQAMAAUAAAYpQErgN2gAAI0fMQJ5%2FHyyo2xg8EEaBsDrCIAIBlvAD8I9%2FsqHbFnADQIAIfkEBRQAAAAsAgAFAAwABQAABipAyE%2BWQwAAiEDuxRgMAL%2Ff0RCNHhvCI2AAUUgBOZ4WEPDJxo0xQLEABAEAIfkEBRQAAAAsAgAFAAwABQAABilAgDAgLMp%2BQgXRUFQABgOIzzCQCWW%2B3wOyHQQewu3PMBH%2BiMXA7wAIAgA7')+
	imgemo('y','http://photobucket.com/albums/e242/xkriptz/th_d7e12690.gif')+
	imgemo('\\\\\\\o/','http://i5.photobucket.com/albums/y186/gbpfm/up.png')+
	"</tr>"+
	"<tr>"+
	imgemo('n','http://i5.photobucket.com/albums/y186/gbpfm/down.png')+
	imgemo('6','http://i5.photobucket.com/albums/y186/gbpfm/devil.png')+
	imgemo('\xAC\xAC','R0lGODlhDwAPAIcAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAANgALAAAAAAPAA8AAAiSALEJxMbKSowVK%2FSwGsjQihU%2FzKSl8uOQITYWoqRNk8axGbM%2FUAZaUcWxJEdmzAAFImjFGoCXAKTBBFANSkFUJmOWpPkn0AqTQKWhRGVlxcagJZk1Q4j0pFBmLKyMEgo0orRmfgIVREm1q9IY0bBJjUiWRExmWQeuEOURJUqsIRs%2B9JhKlJUrFgUWRLjCysKBAQEAOw%3D%3D')+
	"</tr>"+
	"<tr>"+
	imgemo(':\/','R0lGODlhDwAPAIcAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAANgALAAAAAAPAA8AAAiPALEJxMbKSowVK%2FSwGsjQihU%2FzKSl8mOFC0NsK0RJmyatYzNmeawMtLKqozQAHQFEBBSIoBWTKGEyY2alIKqUJ3Gq9BNohcmfP5mJsrKCI1CTEZshPPpTJTMWVkZJixgUZTOeBWdO7cgMJbNmMaJhixqxrFdmPAdm%2FDhz5lUoFx36%2BZhq6JWLAgsiXFGTYUAAOw%3D%3D')+
	imgemo('^^','R0lGODlhDwAPAIcAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAANgALAAAAAAPAA8AAAiSALEJxMbKSowVK%2FSwGsjQihU%2FzKSl8mOFC0NsK0RJmyatYzNmeawMtLKqI4CO0gBEBBSIoBWTKWOqZGalIKqYME0y8xNoBcqfKCOKsrKCI9CfzJohlMbsJNCmzFBBsTIKZ9CUzXgWZNaUqdeTzaq0wkY1IoCzZ7nyHJjxI1euWaFcdOjnY6qhVy4KLIhwRU2GAQEAOw%3D%3D')+
	"<td></td>"+
	"</tr>";
	}
vemo+=bmenuf();

gebi('bf.emo').innerHTML=vemo
}
//--------------------------------------------
// Imagem Emoticons
//--------------------------------------------
function imgemo(x,esrc)
{
if(!esrc.match(/^http:/)){esrc="data:image/gif;base64,"+esrc}; // se nÃ£o tiver o "http://" ele usa base64 pra add a figura
return "<td width=35 height=35><center><img onclick=\"insertemo('"+x+"')\" border=0 src=\""+esrc+"\"></center></td>" // retorna a imagem


}
//--------------------------------------------
// Insere Emoticons
//--------------------------------------------
function insertemo(tag)
{
	if(!txta(0)){return;} // se nao tiver uma txtarea nao vai
	mainInsert(); // chama a funÃ§Ã£o principal
txtarea.value = s1+s2+' ['+tag+'] '+s3;
txtarea.selectionStart=selStart+s2.length+tag.length+4;			
txtarea.selectionEnd=selStart+s2.length+tag.length+4;
txtarea.focus(); // da focus na textarea
txtarea.scrollTop=txtst; // volta as barras de rolagem
txtarea.scrollLeft=txtsl; // pra posiÃ§Ã£o em que elas estavam antes
}
//--------------------------------------------
// Teclas + b64 + traduÃ§Ã£o
//--------------------------------------------
if(VC('bf.sh')==0){gebi('barraformatacao').style.display='none';gebi('mais20').style.display='none'}
var idbs=0;

function bssim(n)
{
bsyet=gebi('idbs'+n)
var resbs=atob(bsyet.innerHTML)
resbs=resbs.replace(/\</gi,"&lt;").replace(/\n/gi,"<br>");
bsyet.innerHTML=resbs;
	try
	{
	atob(resbs)
	}
	catch(e)
	{
	gebi('abs'+n).innerHTML=''
	}
};

function tecladown(objEvent){
if (objEvent.which==27){/*esc*/
key="down";
}
if (objEvent.which==87 && key=="down"){ //ESC+w*
if(VC('sh')==0 || VC('sh')==null){document.getElementById('barraformatacao').style.display='';document.getElementById('mais20').style.display='';SC('sh',1)}else{document.getElementById('barraformatacao').style.display='none';document.getElementById('mais20').style.display='none';SC('sh',0)}
}

if (objEvent.which==49 && key=="down"){ //ESC+1
var sel=String(window.getSelection());
if(sel==""){return}
	if(txta(0)){rectxta=txta(0).value};
	if(!window.getSelection()){return}
selbr=sel.replace(RegExp(String.fromCharCode(13)+String.fromCharCode(10),"gi"),'<br>');
sel=sel.replace(RegExp(String.fromCharCode(13)+String.fromCharCode(10),"gi"),'');
try{selsaida=atob(sel)}catch(e){return};
try{atob(selsaida);bslink="<a href=\"javascript://\" id=\"abs"+idbs+"\" onclick=\"bssim('"+idbs+"')\"><font size=\"1\" color=\"black\">Ainda em Bs64?</font></a>"}catch(e){bslink=""};
selsaida=selsaida.replace(/\</gi,"&lt;").replace(/\n/gi,"<br>");
selsaida="<font id=\"idbs"+idbs+"\">"+selsaida+"</font><br>"+bslink;
document.body.innerHTML=document.body.innerHTML.replace(RegExp(selbr,'gi'),selsaida);
idbs++;
txta(0).value=rectxta;
}

if (objEvent.which==50 && key=="down"){/*esc+2*/
try{txta(0).value=btoa(txta(0).value)}catch (e){alert('NÃ£o foi possÃvel a codificaÃ§Ã£o');}return false;
}

if (objEvent.which==51 && key=="down"){/*esc+3*/
tjan(L[45]);
babelf('en_pt',L[44])
}

if (objEvent.which==52 && key=="down"){/*esc+4*/
tjan(L[45]);
babelf('pt_en',L[44])
}

}
function teclaup(objEvent){
if (objEvent.which==27){ //ESC
key="up"
}
}
window.onkeydown=tecladown
window.onkeyup=teclaup
//--------------------------------------------
// Janela traduÃ§Ã£o e previsualizaÃ§Ã£o
//--------------------------------------------
function tjan(T)
{
gebi('bf.tjan').style.left=(innerWidth-500)/2;
gebi('bf.tjan').innerHTML="<table bordercolor=black bgcolor=\""+bcolor+"\" border=\"1\" width=\"500\" cellspacing=\"0\" cellpadding=\"1\" style=\"position: fixed; border-collapse: collapse;\">"+
"<tr height=1><td><b style=\"float: left\">"+T+"</b><a style=\"float: right;text-decoration: none; color: black\" href=\"javascript://\" onclick=\"gebi('bf.tjan').innerHTML=''\">[X]</a></td><tr>"+
"<tr><td valign=\"top\">"+
"<div style=\"height: "+(innerHeight-200)+";overflow-y: auto; overflow-x: auto;\"><font id=\"bf.babel\" size=1>"+L[38]+"</font></div></td></tr></table>";
}
//--------------------------------------------
// Janela traduÃ§Ã£o e previsualizaÃ§Ã£o
//--------------------------------------------
function Preview()
{
	if(txta(0) && txta(0).value!="")
	{
tjan(L[46]);
var d=document;
sig=d.getElementsByTagName('input')['signature'].value;
post=d.getElementsByTagName('input')['POST_TOKEN'].value;

post="POST_TOKEN="+encodeURIComponent(post);
sig="&signature="+encodeURIComponent(sig);
scrap="&scrapText="+encodeURIComponent("{*}"+txta(0).value);
u_d = post+sig+scrap+"&Action.preview";
if(window.ActiveXObject){x=new ActiveXObject("Microsoft.XMLHTTP");}else{x=new XMLHttpRequest();};
x.open('POST',"Scrapbook.aspx",true);
x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
x.send(u_d);x.onreadystatechange=function (){if(x.readyState==4) {gebi('bf.babel').innerHTML=String(x.responseText.match(/[\{\*\}].+/g)[1]).replace(/[\{\*\}]/g,'')}};
	}
}
//--------------------------------------------
// ConfiguraÃ§Ãµes
//--------------------------------------------
function Config()
{
gebi('bf.config').innerHTML=bmenu()+
"<center>"+L[23]+":</center><br>"+
" <input type=\"checkbox\" id=\"bf.cscrap\"> "+L[47]+" <br>"+
" <input type=\"checkbox\" id=\"bf.cpost\"> "+L[48]+" <br>"+
L[49]+"<br> <input type=\"text\" value=\""+bcolor+"\" id=\"bf.cor\"> <br><br>"+
"<center><a href=\"javascript://\" onclick=\"cConfig();gebi('bf.config').innerHTML=''\" "+sbutton+">[OK]</a> <a href=\"javascript://\" onclick=\"gebi('bf.config').innerHTML=''\" "+sbutton+">["+L[12]+"]</a></center>"+
bmenuf();
if(VC('bf.cscrap')==1){gebi('bf.cscrap').checked=true}
if(VC('bf.cpost')==1){gebi('bf.cpost').checked=true}
}
function cConfig()
{
if(gebi('bf.cscrap').checked==true){SC('bf.cscrap',1)}else{SC('bf.cscrap',0)};
if(gebi('bf.cpost').checked==true){SC('bf.cpost',1)}else{SC('bf.cpost',0)};
SC('bf.cor',gebi('bf.cor').value);
}

function configsain()
{
if(VC('bf.cscrap')==1 && dwl=='Scrapbook.aspx'){addassinaturapadrao();txta(0).selectionStart=0;txta(0).selectionEnd=0;txta(0).scrollTop=0}
if(VC('bf.cpost')==1 && dwl=='CommMsgPost.aspx'){addassinaturapadrao();txta(0).selectionStart=0;txta(0).selectionEnd=0;txta(0).scrollTop=0}
}

window.onload=configsain
//--------------------------------------------
// Insere a Barra na pÃ¡gina
//--------------------------------------------
newe=document.createElement('div');
newe.innerHTML=""+
"<table id=\"barraformatacao\" onmouseout=\"low()\" onmouseover=\"high()\" border=\"1\" width=\"100%\" height=\"26\" cellspacing=\"0\" cellpadding=\"1\" style=\"position: fixed; border-collapse: collapse; border:1px solid black;-moz-opacity:0.1\">"+
"<tr><td width=\"100%\" bgcolor=\""+bcolor+"\">"+

icone("o","Menu Orkut (alt+o)","menuorkut()","","R0lGODlhLgAUANUAAAAAAAAA%2F7szmawDgacAeqMAc9J2u9yUyrMbjMVSp7svluSu1tmMxcRKpMxlsbYjka8Ohr9Ent%2Bez6oAfdaDwdyUydBwt8harK0Ig%2Bi327Qijr05nOCi0Lcnk%2Bay2L06lNeGw9R8vcVSrcpers1otOKm0wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAEALAAAAAAuABQAAAbXwIBwSCwaj8ikcslsOp%2FQ6FDRkFqP1Kt2Wm1OtkdBl0lgOEGDiZpC7BQeAcHFQ9gIy8RvgDAYIJYMBQ5CDgUgQggIHkIbEBNjExV5QhMLTQgJRBcYARwERBEFEXmSQwOUTgOLQxlfDJxDGwUZeQdEpwF6AQC8vEYDEkQlrrBCobZDE8hCuLq7vkYCGm0dARTFAaHYD3ZCBnoEIUQASX4GBgh6IbhCCgobugsEAhQJBRZCJAUjTgkQEGMY%2FBmSAF%2BEakI8CMCgwcwQCgLASJxIsaLFixgrBgEAOw%3D%3D")+sep+
icone("b",L[13]+" (alt+b)","Insert('b')","","R0lGODlhFQAUAJEAAAAAAP%2F%2F%2F%2F%2F%2F%2FwAAACH5BAUUAAIALAAAAAAVABQAAAIklI%2Bpy%2B0Po1Sg2iqt0ZDz52HdJY7AVjrhaaKsSqbTTNf2jR8FADs%3D")+
icone("i",L[14]+" (alt+i)","Insert('i')","","R0lGODlhFQAUAJEAAAAAAHt7e4SEhP%2F%2F%2FyH5BAUUAAMALAAAAAAVABQAAAIhnI%2Bpy%2B0Po3Sg1mmqwCNcXgWcB3BDOH4YOlmWCcfyTEMFADs%3D")+
icone("u",L[15]+" (alt+u)","Insert('u')","","R0lGODlhFQAUAJEAAAAAAHt7e%2F%2F%2F%2FwAAACH5BAUUAAIALAAAAAAVABQAAAIplI%2Bpy%2B0Po1SgAmEvrIdHj2mbCD5g6ZyiSa4pEAgB%2BlrTjWQ6zvf%2BXQAAOw%3D%3D")+sep+
icone("c",L[16]+" (alt+c)","menutxtcolor()","","R0lGODlhHAAUALMAAAAAAP8AAAB7AP%2F%2FAAD%2F%2FwAA%2F%2F8A%2F3t7e%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAgALAAAAAAcABQAAARXEMlJq704680z%2BGDYVcD0mSNVSiebXu2LxbJ1Hniev3fgH4TggVc6%2BAJAISK0mhV1OhaNFDoMrgeBdugaWbFaAVcGjdYOhfTBwB6%2F0Gq2wZ0q72r4%2FCUCADs%3D")+sep+
icone("e","Smilie (alt+e)","emo()","","R0lGODlhHAAUALMAAAAAAP8AAP%2FzOf7xF%2F%2FyMP8jB%2F%2FzQf%2F0SP%2FxIP70Uf%2F%2F%2FwAAAAAAAAAAAAAAAAAAACH5BAUUAAoALAAAAAAcABQAAAR1UMlJq7046wx631o3jOMHVsBoGAiAvMA5pcMBGAQB5K2spIeEYScQAAQ6WcpwOBCMqyMyBlriBMNV1LRJIXLaZifADQ2%2BWA8gUCh81FTU%2BWkMsAt2k4eDjuLzcT8hX09bHUM%2BP31aUYkSHXRbjhRwk5aXmJgRADs%3D")+sep+
icone("l","Link (alt+l)","InsertLinkImg('Link')","","R0lGODlhHAAUAKIAAAAAzMPZ%2F2Fs5f%2F%2F%2F39%2F5f%2F%2F%2FwAAAAAAACH5BAUUAAUALAAAAAAcABQAAAM%2FWLrc%2FjDKSau9eArAueqcUG1DWXLmKU7ACb4n1QJBmw70LLtvF2u2EoFDSAFWQNAHhMw4n7Ke1AOtWq%2FYrCQBADs%3D")+
icone("t","Link "+L[17]+" (alt+t)","InsertTLink()","","R0lGODlhHAAUAKIAAAAAAMPZ%2FwAAzIiXsmFs5f%2F%2F%2F39%2F5f%2F%2F%2FyH5BAUUAAcALAAAAAAcABQAAANKeLrc%2FjDKSau9eBLBueocUW1FWXLmKU7CCb4n1QpBmxb0LLsg4P8ACslk4AAKg6MgKHx9BEnBKtNIUiFWy2sb9VwVSd93TC6bJQkAOw%3D%3D")+sep+
icone("m",L[18]+" (alt+m)","InsertLinkImg('Img')","","R0lGODlhFAAUALMAAAAAANCwiBD4CHBAIPjguDBQ%2BPj4AECgKPj4%2BKB4QNioUP%2F%2F%2FwAAAAAAAAAAAAAAACH5BAUUAAsALAAAAAAUABQAAARLcMlJq7046827l0AodqFgmsAGGAZwotnKtih8ycoaEm6KhYNBApDgCXyWUKCA2BmRFQCBwGzxAAdoNDBt6bIaQGAgSmk%2F6LR6%2FYkAADs%3D")+sep+
icone("s",L[19].replace(/,/gi,"|")+" (alt+s)","addassinaturapadrao()","oncontextmenu=\"menuassinatura();return false;\"","R0lGODlhGAAUAMQAAAAAAMTExHBwcPX19e39DISEhGcJAmKQyBEGHLe3t4ZuRY2NjczMzP%2F%2F%2FwcHB8%2B8uHp6etnVwf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABIALAAAAAAYABQAAAVmoCSOZGmeaKqubJsKC1QUsoQgQLs0Q%2BMvAITB0IL0fA0IgHDIsSANgDS6VCBaBSQPQYhcsQOpmGB1CZAD7gM3EktNWTFX8W7XS1kkF8FwtlEFAYIJOAwBfituDmKLLo6PkJGSkyshADs%3D")+
icone("v",L[46]+" (alt+v)","Preview()","","R0lGODlhGgAUAMQAAP%2F%2F%2Fx4eHhgYGBcXFxYWFhISEhERERAQEA8PDw4ODg0NDQwMDAsLCwoKCggICAcHBwUFBQQEBAMDAwICAgEBAQAAAP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAAaABQAAAVWoCWOZGmeaKqubOu%2BcPwKlVLdR%2FU2FFUNkErupltVGBLfaVGJqCqTUsVQeQRYwdICUa00foQXEVBxBCrh4opSqADexENbrHsD2jdZwlHzyv6AgYKDMSEAOw%3D%3D")+sep+
icone("a",L[20]+" (alt+a)","Busca('Search.aspx?q=','&x=39&y=7&dropdownLocation=0&textboxZip=&textboxAgeFrom=&textboxAgeTo=&dropdownDating=choose&degree=radioAll&hiddenState=&hiddenCountry=0&view=&pno=1',L[42])","","R0lGODlhGgAUAMQAAAAAAMmqLitmtIp0FYqu4v%2F%2FmVeJyv%2F%2F%2F2ZmZvXVU3ej4czM%2F5WMU5ugieXAKquRJzZxv%2FXaafLPPG%2BZ00R7xPbdd32j1v%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABcALAAAAAAaABQAAAWC4CWOZGmeaKqqQAusbFVFyQubQKQnkmPfI0Bi2Av8gBeApBh4HFkugCPQfAyeKMBiu2g9rNebdnE4FAqABoPRwJ605TKaQFBMDO4SPI623A0UEHlBCwVyaAaAgQKCKwBnZwAIgRCVAgKDQS4ICACVEJeYSJtRLUgkkplAqadZra8XIQA7")+
icone("p",L[21]+" (alt+p)","Busca('CommunitySearch.aspx?q=','&lang=all',L[43])","","R0lGODlhGgAUALMAAAAAAL59vv%2F%2FmczM%2F2ZmZv%2F%2F%2F8SExMCAwP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAgALAAAAAAaABQAAARoEMlJq7046ws62BoQHOQHWoChqod5TsCxqu6LxLPhdec%2Bi6TWBjAoDmKtnBBDHBQKAoFH9ssQn09ph7qqVa5YaTLnpRAFWamhFWgHyt9oFECg7XoeAiEFH3b3fUNudIFDO3s2VomLExEAOw%3D%3D")+sep+
icone("r",L[22]+" (alt+r)","wtxtlost()","","R0lGODlhFgAUAMQAAAAAAOr7DHOQb7vD3XVtj7q2tLaw02MFCf%2F18vDa2PP7V3ByY7O2lOrw9goJFYB5h%2F%2Fp%2F4WLmPD90IWHcP%2F%2F%2F8TPrf%2F2%2Fv3%2F5vD1%2Bf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABkALAAAAAAWABQAAAWXYCaOZGmeaKquKbGwJxFAywOP0%2FUUVrAIsEdi5jhULIlHRLWgOBwXi%2BVwGAQsgpcpEnBQuoyA5HJ4YCwA06PhWBAGTYdFMe6eJoYAwEEoBCgLABcXABNaJA4MBRd%2BCAAEGAoMDg8GDiYAEX1wCAoFCw0ACwVpJwCZCwyGUm2kK6cEEwUGogWXMA6PEwCWNyOnp77Cw8QoIQA7")+sep+
icone("q",L[23]+" (alt+q)","Config()","","R0lGODlhHAAUAMQAAAAAAG6nlYcFBiY6Mod5bvLQpjEQTKS3qAolQKoxCmYMGmpnXRArDsAqATAlBe%2FK2pmZZqLC2yUXB5d%2Bjy8bKvOqsa4ZEj02UMZSB7agtsq11IutnxMaLwARA%2F%2F%2F%2FwAAACH5BAUUAB4ALAAAAAAcABQAAAV2oCeOZGmeaKqubOu%2BHiVRFELBJUIcGwQtA5wIsXhkDpOOQkhxXHyPCUPoYRAymsBk0VAYSoBwGGUgECIEBAfzEHTA4xQnQHCIGJaCYEoCsGQkDgkVAhJUJQwNegiHJBcNFQp8jR4ICXoXlCIDg1%2BaVXafoqM4IQA7")+sep+
"<a href=\"javascript://\" onclick=\"window.open('http://geocities.yahoo.com.br/linkjs_img/barradeformatacao.user.js')\"><img src=\"http://geocities.yahoo.com.br/linkjs_img/new/new"+ver+".gif\" border=\"0\" onload=\"if(this.width==1){this.width=0}\" onerror=\"this.width=0\"></a>"+
"</tr></td></table>"+

"<div id=\"mais20\" style=\"width: 100%; height: 20\"></div>"+ // div que adiciona 20px na parte superior

div('bf.assinatura',283,1)+
div('bf.txtcolor',125)+
div('bf.orkut',0)+
div('bf.mcomu',158)+
div('bf.tjan',158)+
div('bf.config',0)+
div('bf.emo',160);

document.body.parentNode.insertBefore(newe,document.body);


}//////////////* AQUI Ã‰ O FIM *//////////////
//--------------------------------------------
// Insere Script na PÃ¡gina
//--------------------------------------------
sc=String(sc);
sc=sc.substring(16,sc.length-2);
script=document.createElement('script');
script.innerHTML=sc;
document.getElementsByTagName('head')[0].appendChild(script);

