// ==UserScript==
// @name           Skipp Redirect
// @namespace      http://userscripts.org/scripts/show/56530
// @autor           Edinaruto(skippredirect.vai.la)
// @include        *
// ==/UserScript==

/*
_----=[Mudanças]=----_
[*]1.4.1.8.2:
	* Bug da falta de http:// corrigido;
	* Atualização da lista de links;
_---------------------_

_----=[Historicos de Bugs]=----_
001 - Bug do modulo de atualização---Problema nada data
002 - Bug do modulo principal---Adiciona o HTTP:// no inicio do novourl quando não encontrado
_------------------------------_
*/

/*inicio modulo de atualizacao v0.5*/
vver='1.4.1.8.2';//versão;
linkatualiza="http://userscripts.org/scripts/show/56530";
reg=/userscript/gi;
if(reg.test(location.href)==false){
GM_xmlhttpRequest({
  method: "GET",
  url: linkatualiza,
  onload: function(response) {
  	dados=response.responseText;
	dados1=dados.split('Skipp Redirect ');
	dados2=dados1[2].split('</h1>');
		if(vver<dados2[0]){
			sr_div=document.createElement('div');
			sr_div.setAttribute('style','z-index:9998;background:black;opacity:.6;width:200px;height:45px;position:fixed;bottom:5px;left:15px;border: 1px solid black;-moz-border-radius: 10px;');
			sr_img=document.createElement('img');
			sr_img.setAttribute('src','http://img189.imageshack.us/img189/5307/srlogo.png');
			sr_img.setAttribute('style','z-index:9999;width:30px;height:30px;position:fixed;bottom:20px;left:15px');
			sr_span=document.createElement('span');
			sr_span.setAttribute('style','z-index:9999;width:200px;height:45px;position:fixed;bottom:5px;left:47px');
			sr_div.setAttribute('id','sr_dv');
			sr_span.setAttribute('id','sr_spn');
			sr_img.setAttribute('id','sr_ig');			
			code='javascript:d=document;d.getElementById("sr_dv").style.display="none";d.getElementById("sr_spn").style.display="none";d.getElementById("sr_ig").style.display="none";';
			sr_span.innerHTML='<small><a target="_blank" style="color:white;text-decoration:none;" href="'+linkatualiza+'"><b>Skipp Redirect '+dados2[0]+'</b></a> <a href="#" style="color:white;text-decoration:none;" onclick=\''+code+'\'>[x]</a><a target="_blank" style="color:white;text-decoration:none;" href="'+linkatualiza+'"><br>disponivel</small></a>';
			document.body.appendChild(sr_div);
			document.body.appendChild(sr_img);
			document.body.appendChild(sr_span);
		}
  }
});
}
/*fim modulo de atualizacao v0.4*/

/*inicio estilos da janela*/
redo='-moz-border-radius: 10px;';
cor1='white';
cor2='orange';
sr_style_janela='background:'+cor1+';width:960px;height:auto;border:1px dashed '+cor1+';'+redo;
sr_style_titulo='width:100%;height:20px;background:'+cor2+';color:'+cor1+';font-weight:bold;text-align:center;'+redo;
sr_style_conteudo='width:100%;height:auto;background:'+cor1+';'+redo;
sr_style_tabela='border:1px dashed '+cor2+';color:'+cor2+';'+redo;
div_bg_bgcor='black';//cor do fundo da pagina;
div_trans_int='.9';//transparencia do fundo da pagina;
/*fim estilos da janela*/

d=document;	
urlatual=location.href;
urls=d.getElementsByTagName('a');//pega os links da pagina
function id(id){return d.getElementById(id)}
function urlsub(a,b){return urlatual.substring(a,b)}

links=new Array();
	links[0]='http://styker.net/get?url=';
	links[1]='http://www.downscompleto.net/protetor/redirect/?url=';
	links[2]='http://linkbr.info/link/?url=';
	links[3]='http://linkprotegido.info/link/?url=';
	links[4]='http://k2downloads.info/link/?url=';
	links[5]='http://ondavideos.com.br/link/?url=';
	links[6]='http://poloven.info/link/?';
	links[7]='http://www.loadbr.info/link/?url=';
	links[8]='http://www.justfilmeseseriados.org/download/?url=';
	links[9]='http://www.linkagratis.info/download/?url=';
	links[10]='http://hitsbrazil.net/pr/?url=';
	links[11]='http://centerportal.com.br/suspended.page/?url=';
	links[12]='http://www.melhoresvideosdanet.com/link/?url=';
	links[13]='http://www.sevendownloads.protetordelink.com/?url=';
	links[14]='http://www.links10.info/filmes/?link=';
	links[15]='http://sbtfilmes.net/link/?url=';
	links[16]='http://redir.stationpop.com/?url=';
	links[17]='http://www.arreganho.com/download/?url=';
	links[18]='http://www.turkodownloads.net/download/?url=';
	links[19]='http://www.ozdownloads.org/Telona/download/?url=';
	links[20]='http://www.camlink.com.br/protetor/?url=';
	links[21]='http://protectlink.us/fb/?url=';
	links[22]='http://protectlink.us/kgf/?url=';
	links[23]='http://www.ohputz.com/dl/?url=';
	links[24]='http://links.soatualizados.com/?url=';
	links[25]='http://www.protetordelink.com/link/?url=';
	links[26]='http://www.seulink.net/download/?url=';
	links[27]='http://naodiga.com/b/?url=';
	links[28]='http://www.degracaemaisgostoso.biz/download/?url=';
	links[29]='http://www.megalinkbr.com/download/?url=';
	links[30]='http://protetordelinks.com.br/cubodown/?url=';
	links[31]='http://direcionando.baixedetudo.net/link/?url=';
	links[32]='http://www.clickgratis.org/sapodownloads/?url=';
	links[33]='http://www.vipdownload.com.br/protetor/?url=';
	links[34]='http://www.projetosbr.com/down/?url=';
	links[35]='http://www.downloadfilmesgratis.org/cubodown/?url=';
	links[36]='http://links.downloadsmais.com/?url=';
	links[37]='http://www.downfilmesgratis.net/goto/';
	links[38]='http://celularjogos.biz/pr/pr/?url=';
	links[39]='http://cdsmp3gratis.net/linkprotetor/?url=';
	links[40]='http://linkprotetor.com/download/?url=';
	links[41]='http://www.baixartudofree.net/protetor/redirect/?url=';
	links[42]='http://tudotemaqui.net/protetor/1.php/?url=';
	links[43]='http://protetordelinks.com.br/ultradownloads/?url=';
	links[44]='http://netosdesalim.info/protetor/?url=';
	links[45]='http://linkprotetor.net/direciona.php?';
	links[46]='http://www.link.ps2downloads.net/links/?url=';
	links[47]='http://baixarjato.com/downloads/link/?url=';
	links[48]='http://meggacelular.com/baixando/?url=';
	links[49]='http://www.baixatudogames.com/download/?url=';
	links[50]='http://www.jordanlenon.com/link/?';
	links[51]='http://www.humordanet.com/2cat=6/index.php?url=';
	links[52]='http://www.baixasoaki.com/?url=';
	links[53]='http://www.downgratis.com/link/?url=';
	links[54]='http://www.elitedosfilmes.com/Down/?url=';
	links[55]='http://www.baixeja.com/download/?link=';
	links[56]='http://protetor-links.com/redirect/?url=';
	links[57]='http://www.daulodes.com/redirec.php?url=';
	links[58]='http://www.protegendo.info/top/framesk.php?url=';
	links[59]='http://protegendo.info/link/?url=';
	links[60]='http://linkproteger.riquezavirtual.net/sl/?url=';
	links[61]='http://riquezavirtual.net/xxx/sl/?url=';
	links[62]='http://www.linkprotector.info/link.php?url=';
	links[63]='http://protelink.com/?';
	links[64]='http://musicasdegraca.com/download/?url=';
	links[65]='http://www.furiagames.org/protetor360/?url=';
	links[66]='http://adulto.telona.org/download/?url=';
	links[67]='http://sdm.protegendolinks.com/link/?url=';
	links[68]='http://filmesdiarios.org/link/download-bfc/?url=';
	links[69]='http://clubedodownload.info/link/?url=';
	links[70]='http://www.silvagames.com/protetor_de_links.php?url=';
	links[71]='http://www.baixandonanet.com/blog/?url=';
	links[72]='http://filmesnovos.org/linkprotetor/?url=';
	links[73]='http://www.redirecionando.info/baixego/?url=';
	links[74]='http://www2.brasildownloads.net/download/?';
	links[75]='http://www.baixandonanet.com/blog2/?url=';
links[75]='http://www.mp3z.com.br/arquivos/?url=';
	
links2=new Array();
	links2[0]='http://www.link-protegido.com/semprefilmes/protetor.php?link=';

function janela(){//cria a janela
linkantes=location.href;
linkdepois=novourl;
jnl='<style>'+
'.sr-janela{'+sr_style_janela+'}'+
'.sr-titulo{'+sr_style_titulo+'}'+
'.sr-conteudo{'+sr_style_conteudo+'}'+
'.sr-tabela{'+sr_style_tabela+'}'+
'</style>'+
'<div class="sr-janela">'+
'	<div class="sr-titulo">Skipp Redirect '+vver+'</div>'+
'	<div class="sr-conteudo">'+
'		<table width="100%" class="sr-tabela">'+
'		<tr>'+
'		<td width="10%" class="sr-tabela"> Link Antes:</td><td width="90%" class="sr-tabela"> '+linkantes+'</td>'+
'		</tr>'+
'		<tr>'+
'		<td width="10%" class="sr-tabela"> Link Depois:</td><td width="90%" class="sr-tabela"> '+linkdepois+'</td>'+
'		</tr>'+
'		<tr>'+
'		<td width="10%" class="sr-tabela"> Versão:</td><td width="90%" class="sr-tabela"> '+vver+'</td>'+
'		</tr>'+
'		</table>'+
'	</div>'+
'</div>';
var srdivfundo=d.createElement('div');
d.body.appendChild(srdivfundo);
srdivfundo.setAttribute("id","srdivfundo");
srdivfundo.setAttribute("style","position:fixed;top:0px;left:0px;background:"+div_bg_bgcor+";opacity:"+div_trans_int+";width:100%;height:100%;z-index:9998");
var srdivfundo2=d.createElement('div');
d.body.appendChild(srdivfundo2);
srdivfundo2.setAttribute("style","position:fixed;left:2%;top:40%;width:100%;height:auto;z-index:9999");
srdivfundo2.innerHTML=jnl;
}//termina a função de criar a janela;

/*inicio modulo principal v0.3*/
for(x=0;x<links.length;x++){
		if(links[x]==urlsub(0,links[x].length)){
			novourl=urlatual.replace(links[x],'');
			janela();
			reg=/http\:\/\//;
			if(reg.test(novourl)==false){novourl='http://'+novourl;}//corrige o bug 002
			location.href=novourl;
		}
}
/*fim modulo principal v0.3*/

/*inicio modulo para www.pqueno.com v0.1*/
if('http://www.pqueno.com/?'==urlsub(0,'http://www.pqueno.com/?'.length)){
	novourl=id('box_shared_page_download_button').href;
	janela();
	location.href=novourl;
}
/*fim modulo para www.pqueno.com v0.1*/

/*inicio do modulo para www.link-protegido.com v0.1*/
for(x=0;x<links2.length;x++){
		if(links2[x]==urlsub(0,links2[x].length)){
			n='';
			p=urlsub(links2[x].length,urlatual.length);
			for(x=p.length;x>0;x--){
				n+=p[x-1];
			}
		novourl=n.substring(n.length-15,n.length)+n.substring(0,n.length-15)		
		janela();
		location.href=novourl;
		}
}
/*fim do modulo para www.link-protegido.com v0.1*/

/*inicio do modulo para linkbee.com v0.2*/
if(urlsub(0,'http://linkbee.com/'.length)=='http://linkbee.com/'){
novourl=id("urlholder").value;
janela();
location.href=novourl;
}
/*fim do modulo para linkbee.com v0.2*/

/*inicio do modulo para linkbucks.com v0.1*/
if(urlsub(urlatual.length-15,urlatual.length)=='.linkbucks.com/'){
novourl=urls[1].href;
janela();
location.href=novourl;
}
/*fim do modulo para linkbucks.com v0.1*/

/*inicio do modulo para linkproteger.com v0.1*/
if(urlsub(0,'http://www.linkproteger.com/?'.length)=='http://www.linkproteger.com/?'){
novourl=urls[1].href;
janela();
location.href=novourl;
}
/*fim do modulo para linkproteger.com v0.1*/

/*inicio do modulo para linkpago.com v0.1*/
//encontrado por Romulo PS
if(urlsub(0,'http://www.linkpago.com/load.php?i='.length)=='http://www.linkpago.com/load.php?i='){
function linkpago(){
location.href="javascript:var tempo=0;";
aaa=document.createElement('script');
aaa.innerHTML="function teste(){"+
"location.href=document.getElementById('download').getElementsByTagName('a')[0].href;"+
"}"+
"setTimeout('teste()',1000);";
document.body.appendChild(aaa);
}
janela();
linkpago();
}
/*fim do modulo para linkpago.com v0.1*/

/*inicio do modulo BeforeRedirect v0.1*/
for(x=0;x<urls.length;x++){
	for(y=0;y<links.length;y++){
		if(urls[x].href.substring(0,links[y].length)==links[y]){
			novourl=urls[x].href.replace(links[y],'');
			urls[x].href=novourl;
		}
	}
}
/*fim do modulo BeforeRedirect v0.1*/