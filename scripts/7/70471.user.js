// ==UserScript==
// @name           Anti Redirectores
// @namespace      Juampi_Mix
// @description    Elimina redirectores de paginas, dejando solo el enlace original
// @Version        1.65
// @include        http://*
// @uso:script     70471
// @history 1.65   Agregado deviantart.com
// @svc:version    [1.65]
// ==/UserScript==
/// Anti Anonym.to
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anonym.to/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 18));
	}
}
/// Anti deviantart.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.deviantart.com/users/outgoing?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 41));
	}
}
/// Anti www.Anonym.to
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.anonym.to/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));
	}
}
/// Anti Linksz.info
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://linksz.info/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 20));
	}
}
/// Anti Anonymz
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anonymz.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 20));
	}
	if (linkx.href.indexOf("http://www.anonymz.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 24));
	}
}
/// Anti Argcompo.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.argcompo.com/general/o.com/anony?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 44));
	}
}
/// Anti Club N Series
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.clubnseries.com/redirect-to/?redirect=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 49));
	}
}
/// Anti El Rincon Del Symbian (ERDS)
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.elrincondelsymbian.com/Foro/ext.php?ref=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 51));
	}
}
/// Anti Lik.cl
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://lik.cl/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 15));
	}
	
}
/// Anti Vagos Wamba
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://links.wamba.com/noref.php?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 37));
	}
	
}
/// Anti Argentina Warez
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://links.argentinawarez.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 33));
	}
}
/// Anti NoLink.in
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://nolink.in/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 18));
	}
}
/// Anti Antronio.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.antronio.com/gogogo.php?ref=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 39));
	}
	
}
/// Anti PuntoJuegos.net
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.puntojuegos.net/salida/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 35));
	}
	
}
/// Anti Gsmspain.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.gsmspain.com/externo.php?gsmurl=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 43));
	}
}
/// Anti YoReparo.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.yoreparo.com/nav/?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 33));
	}
	
}
/// Anti URLAnonimo.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.urlanonimo.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 27));
	}
	
}
/// Anti Anonim.Skynetmod.info
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anonym.skynetmod.info/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 30));
	}
	
}
/// Anti ThePhoneClub.es
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.thephoneclub.es/vbulletin/externalredirect.php?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 62));
	}
	
}
/// Anti Anon.Pirataweb.net
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://anon.pirataweb.net/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 27));
	}
	
}
/// Anti Ocultame.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://ocultarme.com/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 22));
	}
	
}
/// Anti Bajaton.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://bajaton.com/index.php?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 33));
	}
	
}
/// Anti Amo.el-baul.net
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://amo.el-baul.net/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 24));
	}
	
}
/// Anti shortlink.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.shortlink.com.ar/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 29));
	}
	
}
/// Anti ycorp.me
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://ycorp.me/get?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 24));
	}
}
/// Anti Linkstw.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.linkstw.com/sh/?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 31));
	}
}
/// Anti Superdownload.us
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.superdownload.us/link/?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 38));
	}
}
/// Anti Protelink.info
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.protelink.info/link/?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 36));
	}
}
/// Anti OneClikMoviez.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://oneclickmoviez.com/downloads/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 37));
	}
}
/// Anti oneclickseriez.com
// Busca “http://oneclickseriez.com/downloads/?&rdquo; y lo elimina, Dejando solamente la url real
for (var i = 0; i < document.links.length; i++) {
        linkx = document.links[i];  
        if (linkx.href.indexOf("http://oneclickseriez.com/downloads/?") != -1) {  
               linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 37));  
}  

}
/// Anti Oculta.net
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://oculta.net/?") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 19));
	}
}
/// Anti bar.portalnet.cl (Portalnet.cl)
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.bar.portalnet.cl/rw.php?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 39));
	}
}
/// Anti Triplete.com
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.tipete.com/ext?url=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 30));
	}
	
};

d=document;
var vartemp;
urlatual=location.href;
urls=d.getElementsByTagName('a');
if(navigator.userAgent.match('Mozilla')!=null){liga=true;}else{liga=false;}
tempo=new Date();
		hor=tempo.getHours();if(hor<10){hor='0'+hor}
		min=tempo.getMinutes();if(min<10){min='0'+min}
		dia=tempo.getDate();if(dia<10){dia='0'+dia}
		mes=tempo.getMonth()+1;if(mes<10){mes='0'+mes}
		ano=tempo.getFullYear();
		dataatual=ano+''+mes+''+dia+''+hor+''+min;

function del(e) {if(e){return e.parentNode.removeChild(e);}}
function id(id){return d.getElementById(id)}
function urlsub(a,b){return urlatual.substring(a,b)}

links='http://www.humordanet.com/cadastre-se/?url=|http://www.celularbr.com/filmeja/?|http://styker.net/get?url=|http://www.downscompleto.net/protetor/redirect/?url=|http://linkbr.info/link/?url=|http://linkprotegido.info/link/?url=|http://k2downloads.info/link/?url=|http://ondavideos.com.br/link/?url=|http://poloven.info/link/?|http://www.loadbr.info/link/?url=|http://www.justfilmeseseriados.org/download/?url=|http://www.linkagratis.info/download/?url=|http://hitsbrazil.net/pr/?url=|http://centerportal.com.br/suspended.page/?url=|http://www.melhoresvideosdanet.com/link/?url=|http://www.sevendownloads.protetordelink.com/?url=|http://www.links10.info/filmes/?link=|http://sbtfilmes.net/link/?url=|http://redir.stationpop.com/?url=|http://www.arreganho.com/download/?url=|http://www.turkodownloads.net/download/?url=|http://www.ozdownloads.org/Telona/download/?url=|http://www.camlink.com.br/protetor/?url=|http://protectlink.us/fb/?url=|http://protectlink.us/kgf/?url=|http://www.ohputz.com/dl/?url=|http://links.soatualizados.com/?url=|http://www.jogandonline.com.br/Protetor/?|http://www.seulink.net/download/?url=|http://naodiga.com/b/?url=|http://filmesdublados.net/protetor/?url=|http://www.megalinkbr.com/download/?url=|http://protetordelinks.com.br/cubodown/?url=|http://direcionando.baixedetudo.net/link/?url=|http://www.clickgratis.org/sapodownloads/?url=|http://www.vipdownload.com.br/protetor/?url=|http://www.projetosbr.com/down/?url=|http://www.downloadfilmesgratis.org/cubodown/?url=|http://links.downloadsmais.com/?url=|http://www.downfilmesgratis.net/goto/|http://celularjogos.biz/pr/pr/?url=|http://cdsmp3gratis.net/linkprotetor/?url=|http://linkprotetor.com/download/?url=|http://www.baixartudofree.net/protetor/redirect/?url=|http://tudotemaqui.net/protetor/1.php/?url=|http://protetordelinks.com.br/ultradownloads/?url=|http://netosdesalim.info/protetor/?url=|http://linkprotetor.net/direciona.php?|http://www.link.ps2downloads.net/links/?url=|http://baixarjato.com/downloads/link/?url=|http://meggacelular.com/baixando/?url=|http://www.baixatudogames.com/download/?url=|http://www.jordanlenon.com/link/?|http://www.humordanet.com/2cat=6/index.php?url=|http://www.baixasoaki.com/?url=|http://www.downgratis.com/link/?url=|http://www.elitedosfilmes.com/Down/?url=|http://www.baixeja.com/download/?link=|http://protetor-links.com/redirect/?url=|http://www.daulodes.com/redirec.php?url=|http://www.protegendo.info/top/framesk.php?url=|http://protegendo.info/link/?url=|http://linkproteger.riquezavirtual.net/sl/?url=|http://riquezavirtual.net/xxx/sl/?url=|http://www.linkprotector.info/link.php?url=|http://protelink.com/?|http://musicasdegraca.com/download/?url=|http://www.furiagames.org/protetor360/?url=|http://adulto.telona.org/download/?url=|http://sdm.protegendolinks.com/link/?url=|http://filmesdiarios.org/link/download-bfc/?url=|http://clubedodownload.info/link/?url=|http://www.silvagames.com/protetor_de_links.php?url=|http://www.baixandonanet.com/blog/?url=|http://filmesnovos.org/linkprotetor/?url=|http://www.redirecionando.info/baixego/?url=|http://www2.brasildownloads.net/download/?|http://www.baixandonanet.com/blog2/?url=|http://www.mp3z.com.br/arquivos/?url=|http://lukdesign.com.br/host_arquivos/protetor_de_link/protect.php/?url=|http://www5.xpg.com.br/media.php?u=|http://www.celularbr.com/erotico/?|http://www.promocoesdeprodutos.com/xerox/url.php?link=|http://www.links10.info/sotrembaum/?link=|http://baixebr.org/download/?|http://www.brdownloads.com/programation/?|http://www.downloadsemcontrole.com/go/download/?url=|http://indica.celularbr.com/?|http://www.musicasparabaixar.org/link/?url=|http://www.cbdownload.info/links/?url=|http://www.protelink.info/link/?url=|http://www.agaleradodownload.info/link/?|http://uouwww.com/protetor/index2.php?url=|http://kidfacil.net/downsbrasil.php?url=|http://naviopirata.net/download/cm/link/?url=|http://netosdesalim.info/hgHGYTfhIUOhuiGGYkjhiohoGHIYFGhjnhoiuhnUGVYTFVbnojinbuGBVYITFbGUhdhaoshduaisGYHjhsdahsuidhas/?url=|http://www.dedoroxo.com/goto/|http://www.linkprotegido.org/?url=|http://www.protetordelink.com/link/?url=|http://www.superdownloadsfree.net/Protetor/link.php?url=|http://www.degracaemaisgostoso.biz/download/?url=|http://www.humordanet.com/Core-Downloads/?url=|http://furiagames360.org/protetor/?url=|http://www.celularbr.com/seven/?|http://www.filmeshd.tv/fire/pr/?link=|http://downloadsedicas.com.br/protetor2/?url=|http://www.loucosporsoftwares.org/protetor/protectlinks2/tpl/?url=|http://www.downloadsmais.com/link/?url=|http://www.universobrasfoot.info/link/?link=|http://www.universobrasfoot.info/mundobrasfoot/?link=|http://baixardownload.net/kayan/?url=|http://www.registrobrasfoot.net/link/?link=|http://www.humornanet.net/xCore-Downloads/?url=|http://www.protelink.net/download/?url=|http://www.linkprotegido.biz/download/?link=|http://www.baixeja.com/download/?url=|http://www.telaquente.biz/tq/?link=|http://tudotemaqui.net/protetor/f.php/?url=|http://downloadsedicas.com.br/link/?url=|http://archivedown.net/amigos/?url=|http://telona.org/baixar/aHR0cDovL3RyYWNrLm96b25pb24uY29tL2FmZl9jP29mZmVyX2lkPTIxJmFmZl9pZD0xMjcaHR0cDovL3RyYWNrLm96b25pb24uY29tL2FmZl9jP29mZmVyX2lkPTIxJmFmZl9pZD0xMjc/?url=|http://www.meulinkprotegido.com/g1filmes/?url=|http://www.downloadsgratis.org/protetor/?url=|http://www.baixarfilmeseseries.org/download/?url=|http://www.filmesrmvbgratis.com/download/?url=|http://www.downlivre.org/download/?link=|http://www.downloadsfacil.com/2add5ce/?url=|http://down.tiodosfilmes.com/protect.php/?url=|http://linkmais.us/br/download/?url=|http://www.promocoesdeprodutos.com/cyber/index.php?link=|http://filmesdiarios.org/link/download-bfc/protetor/?url=|http://www.elitedosfilmes.com/Down/Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-baixar-Cadastre-para-/?url=|http://www.celularbr.com/tuga/?|http://castordownloads.org/protetor/?url=|http://filmestododia.com/protetor/?url=|http://www.evolutionsurf.net/download/?url=|http://www.baixandorapido.com/dois/?url=|http://www.humornanet.net/protetor/?url=|http://www.downloadsemcontrole.com/go/download/?E3%/02%rbC3%|http://www.protetordownloads.info/download/?url=|http://linkprotegido.biz/baixar/?link=|http://www.infodigital.org/download/?url=|http://www.gargalhada.net/link/?url=|http://www.yuncle.com/protetor/yoopdownloads/aHR0cDovL3NoYXJleC54cGcuY29tLmJyL2ZpbGVzLzcxNDQwMDQyMTkvQ09MUEdIOTEucmFyLmh0bWw01download.asp?url=|http://linkprotegido.biz/baixar/?link=|http://www.agaleradodownload.com/download/d/?|http://www.protetordelinks.com/links/?go!aHR0cDovL3d3dy5tZWdhdXBsb2FkLmNvbS8/ZD1MNENIR1NPQw=|http://www.entretenimento.blog.br/|http://www.filmesparadownloads.com|http://link-downloading.com/protetor|http://link-downloading.com/protetor/?url=|http://www.protetordelink.net/baixarseriados/links.php?url=|http://readygames.com.br/arquivos/protetor.php?url=|http://www.baixarfilmesdublados.info/download1/?go!aHR0cDovL3d3dy5tZWdhdXBsb2FkLmNvbS8/ZD1OOUdVQjFISg=|http://www.protetordelink.com/|http://www.nixlove.com/protetor/en/aHR0cDovL3d3dy5tZWdhdXBsb2FkLmNvbS8/ZD0zMkZHM0pKUg|http://linkbr.info/link/?url=|http://linkbr.info/link/|http://www.downloadsgratis.org/protetor/?url=|http://www.downloadsgratis.us/protetor/?url=|http://www.xerox66.com/cadastre-se_abaixo_para_ajudar_o_site_/pm.php?url=aHR0cDovL3d3dy5tZWdhdXBsb2FkLmNvbS8/ZD1DRlkxOUlKQw=|http://flexpowerdownloads.net/download/?|http://protectlink.us/fb/?link=|http://cinefox.net/download/?url=|http://www.baixarfilmeseseriesdublados.net/download/?url=|http://www.baixarfilmesdublados.info/download1/|http://www.cdscompletos.org/protetor/|http://www.link-protegido.com/host/?link=|http://www.celularbr.com/filmesquentes/|http://www.baixenamoleza.org/download/|http://www.pontosdasnoticias.com/2cat=20/|http://protetor.mvdownloads.com/ptc/sfd?dl=|http://riquezavirtual.net/download/ads/link?url=';
links=links.split('|');
function janela(){
var vartemp=d.createElement('div');
	vartemp.setAttribute('style','top:0px;left:0px;width:100%;height:100%;background:'+fundo3+';opacity:.5;position:fixed;z-index:99998');
	vartemp.setAttribute('id','sr_jnl_bg');
	d.body.appendChild(vartemp);
	radius='border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;';
	vartemp=d.createElement('div');
	vartemp.setAttribute('style','top:50%;left:50%;margin:-50px -320px;width:640px;height:100px;background:'+fundo2+';color:'+cor2+';border:1px dashed '+cor2+';'+radius+'position:fixed;z-index:99999')
	vartemp.setAttribute('id','sr_jnl');
	vartemp.innerHTML=''+
'	<div style="border:1px dashed '+cor2+';'+radius+'">'+
'	<div>'+
'		<div style="'+radius+'border-bottom:1px dashed '+cor1+';background:'+fundo1+';color:'+cor1+';width:98%;float:left;text-align:center;">Skipp Redirect '+vver+'</div><div style="background:red;color:white;'+radius+'" onMouseover="this.style.opacity=\'.4\';" onMouseout="this.style.opacity=\'1\';" onclick="'+
'e=document.getElementById(\'sr_jnl_bg\');e.parentNode.removeChild(e);'+
'e=document.getElementById(\'sr_jnl\');e.parentNode.removeChild(e);'+
'">X</div>'+
'	</div>'+
'	<div>'+
'		<div style="padding:5px 5px;border:1px solid '+fundo1+';'+radius+'background:'+fundo1+';color:'+cor1+';float:left;"> Link Antes </div>'+
'		<div style="padding:5px 5px;border:1px solid '+fundo1+';'+radius+'background:'+fundo2+';color:'+cor2+';text-align:center;">'+urlatual+'</div><br>'+
'		<div style="padding:5px 5px;border:1px solid '+fundo1+';'+radius+'background:'+fundo1+';color:'+cor1+';float:left;"> Link Depois </div>'+
'		<div style="padding:5px 5px;border:1px solid '+fundo1+';'+radius+'background:'+fundo2+';color:'+cor2+';text-align:center;">'+novourl+'</div>'+
'	</div>'+
'</div>';
	
	d.body.appendChild(vartemp);
	
}


for(x=0;x<links.length;x++){
		if(urlsub(0,links[x].length)==links[x]){
			novourl=urlatual.replace(links[x],'');novourl=unescape(novourl);
			if(novourl.substring(0,7)!='http://'){
				novourl=novourl.match(/[^|]/gi).reverse().join("");
			}
			var reg=/http\:\/\//;
			if(reg.test(novourl)==false){novourl='http://'+novourl;}
			janela();
			location.href=novourl;
		}
}

function beforeredirect(){
for(x=0;x<urls.length;x++){
	for(y=0;y<links.length;y++){
		if(urls[x].href.substring(0,links[y].length)==links[y]){
			novourl=urls[x].href.replace(links[y],'');novourl=unescape(novourl);
			if(novourl.substring(0,7)!='http://' && novourl!=''){
				novourl=novourl.match(/[^|]/gi).reverse().join("");
			}
			urls[x].href=novourl;
		}
	}
}
}
beforeredirect();

vartemp='http://adf.ly';
if(urlsub(0,vartemp.length)==vartemp){
	novourl=document.getElementsByTagName('script')[1].innerHTML.split("var target_url = '");
	novourl=novourl[1].split("';")[0];
	location.href=novourl;
}
vartemp='http://www.pqueno.com/?';
if(urlsub(0,vartemp.length)==vartemp){
	novourl=id('box_shared_page_download_button').href;
	location.href=novourl;

}

var vartemp='http://linkbee.com/';
if(urlsub(0,vartemp.length)==vartemp){
var lnkbee2=d.getElementsByTagName('iframe')[1];
if(id("urlholder")){
	novourl=id("urlholder").value;
}
else if(lnkbee2){
	novourl=lnkbee2.src;
}
janela();
location.href=novourl;
}
if(urlatual.match('.linkbucks.com/')!=null){
novourl=urls[1].href;
location.href=novourl;
}

vartemp='http://www.linkproteger.com/?';
if(urlsub(0,vartemp.length)==vartemp){
novourl=urls[2].href;
location.href=novourl;
}

vartemp='http://www.linkpago.com/load.php?'
if(urlsub(0,vartemp.length)==vartemp){
location.href="javascript:var tempo=0;";
var aaa=document.createElement('script');
aaa.innerHTML="function teste(){"+
"location.href=document.getElementById('download').getElementsByTagName('a')[0].href;"+
"}"+
"setTimeout('teste()',1000);";
document.body.appendChild(aaa);
novourl=vartemp;
}

vartemp='http://cad.canalmailbrasil.com.br';
if(urlsub(0,vartemp.length)==vartemp){
	var dd=d.getElementsByTagName('div')
	for(x=0;x<dd.length;x++){
		if(dd[x].className=='downloaddireto'){
			novourl=dd[x].getElementsByTagName('a')[0];
			location.href=novourl;
			break;
		}
	}
}
vartemp='http://lix.in/';
if(urlsub(0,vartemp.length)==vartemp){
	var dd=d.getElementsByTagName('form')[0];
	var cpt=d.getElementsByName('capt')[0];
	if(!cpt){
		if(dd){
			dd.submit();
			novourl=vartemp
		}
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Actualizador ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var SVC = {
	currentVersion: "1.65", 
	scriptName: "Anti Redirectores", 
	scriptNum: 70471, 

	currentDate: null, userRequestCheck: null, timer: null,
	
	init: function () {
		SVC.currentDate = new Date();
		var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

		
		if (!GM_getValue("latest")) GM_setValue("latest", cv );
		if (!GM_getValue("notified")) GM_setValue("notified", false);
		if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
		
		
		if (GM_getValue("latest") < cv) {
			GM_setValue("latest", cv);
			GM_setValue("notified", false);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
		}
	},
	verify: function () {
		SVC.userRequestCheck = false;
		var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
		

		if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();
			

		if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
	},
	getInfo: function () {	
		var uso = 'http://userscripts.org';
		function retrieve(url, re, count) {
			SVC.xhr.get(url, function (status, text) {
				window.clearTimeout(SVC.timer);
				if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
				if (status == 200) {
					if (re.test(text)) var uv = re.exec(text)[1];
					if (uv) SVC.compare(uv);
					if (!uv && count == 1) {
						retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					} else if (!uv && SVC.userRequestCheck) {
						SVC.manualErrorMsg();
					}
				}
			});
			SVC.timer = setTimeout(function () { 
				if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
				if (count == 2) SVC.manualErrorMsg();
			}, 2000);
		};
		retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
	},
	xhr: {
		get: function (url, process) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function (res) { process(res.status, res.responseText); },
			});
		},
	},
	compare: function (version) {
			
						var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));
			
			if (updatedVersionInt <= GM_getValue("latest")) {
				if (SVC.userRequestCheck) alert('Comprobacion Automatica Finalizada!\n\n\nUsted esta utilizando la version mas reciente del script \n\n~ ' + SVC.scriptName + ' ~ Version  instalada ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Comprobacion Automatica Finalizada!\n\n\nEl Script ~ ' + SVC.scriptName + ' ~ Actualizo su codigo a la version ' + version + '  \n\nSu version actualmente instalada es ' + SVC.currentVersion + '.\nQuieres Instalar esta nueva version? \n\n  ');
				
				if (reply) self.location.href= ("http://userscripts.org/scripts/source/" + SVC.scriptNum+'.user.js');
				
			} else {
			
				var reply = confirm('Atencion!!! Novedades sobre el Script \n\n ~ ' + SVC.scriptName + ' ~ \n\nEste Script actualizo su codigo a la version ' + version + ' \n\nSu version actualmente instalada es ' + SVC.currentVersion + '.\nQuieres Instalar esta nueva version? \n\n  ');
				
				if (reply) self.location.href= ("http://userscripts.org/scripts/source/" + SVC.scriptNum+'.user.js');
			
			}
		},
	versionInfo: {
		autoChecking: function () {
			SVC.init();
			SVC.verify();
		},
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.getInfo();
		},
	},
	manualErrorMsg: function () {
		var reply = confirm('Alerta!\n\n\nLa busqueda de actualizacion para ~ ' + SVC.scriptName + ' ~ no tubo Exito .\n\nIntentelo nuevamente mas tarde,  o visite ahora la pagina del script para comprobar si hay actualizaciones disponibles. /nPara su informacion, la version actualmente instalada es ' + SVC.currentVersion + '. \n\nQuieres visitar ahora la pagina del Script para comprobar alguna actualizacion?\n\n  ');
		if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
	},
};

GM_registerMenuCommand("Anti Redirectores (Buscar Actualizacion)", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();