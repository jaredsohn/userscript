// ==UserScript==
// @name           Another Skipp Redirect
// @description    Burla grande parte dos protetores de links encontrados atualmente.
// @autor          Mananator




	notas = '- Atualização na lista de protetores;';
// ==/UserScript==
/*
//Script testado com:
<i>
- Mozilla Firefox 12.0 + GreaseMonkey 0.9.18;<br>
</i>
*/

if(navigator.userAgent.match('Firefox')!=null){liga=true;}else{liga=false;}//checa se é o Firefox;

//configurações em outros navegadores;
	var sr_listalocal="";
	
	var sr_updateposesqdir1="2%";
	var sr_updateposesqdir2="right";
	var sr_updateposcimbai1="2%";
	var sr_updateposcimbai2="bottom";

	var sr_sty_corbg1="#0047AB";
	var sr_sty_corbg2="#0047AB";
	var sr_sty_corbg3="#318CE7";
	var sr_sty_corfnt1="white";
	var sr_sty_corfnt2="white";
if(liga==true){
//configurações no firefox;
function loadvar(){
	sr_listalocal_local="sr_listalocal";
	
	function carregaListasUsuario(){
		sr_listalocal=GM_getValue(sr_listalocal_local,"");
	}
	carregaListasUsuario();
	sr_site="http://skippredirect.atwebpages.com/";
	
	sr_updateonoff=GM_getValue("sr_updateonoff","Ligada");
	sr_updateem=GM_getValue("sr_updateem",1);
	sr_updateposesqdir1=GM_getValue("sr_updateposesqdir1",sr_updateposesqdir1);
	sr_updateposesqdir2=GM_getValue("sr_updateposesqdir2",sr_updateposesqdir2);
	sr_updateposcimbai1=GM_getValue("sr_updateposcimbai1",sr_updateposcimbai1);
	sr_updateposcimbai2=GM_getValue("sr_updateposcimbai2",sr_updateposcimbai2);

	sr_sty_corbg1=GM_getValue("sr_sty_corbg1",sr_sty_corbg1);
	sr_sty_corbg2=GM_getValue("sr_sty_corbg2",sr_sty_corbg2);
	sr_sty_corbg3=GM_getValue("sr_sty_corbg3",sr_sty_corbg3);
	sr_sty_corfnt1=GM_getValue("sr_sty_corfnt1",sr_sty_corfnt1);
	sr_sty_corfnt2=GM_getValue("sr_sty_corfnt2",sr_sty_corfnt2);
	
	
	if(sr_updateem<1 && vver<='2.8.0046'){
		GM_setValue("sr_updateem",1);//seta atualização para um 1 em versõe abaixo de 0046
	}
	
}
loadvar();
}
//FIM CONFIGURAÇÕES
var resetcss="margin: 0;	padding: 0;	border: 0;	outline: 0;	font-size: 100%;	vertical-align: baseline;	background: transparent;line-height: 1;list-style: none;border-collapse: collapse;	border-spacing: 0;";
d=document;
urlatual=unescape(location.href);
urls=d.getElementsByTagName('a');//pega os links da pagina
function vai(url){
	if(url){
		if(url.match("http://")==null){url="http://"+url;}
			return location.href=url;
	}
}//substituto de location.href;
function del(e) {if(e){return e.parentNode.removeChild(e);}else{return false;}}
function id(n){return d.getElementById(n);}
function tag(n){return d.getElementsByTagName(n);}
function urlsub(a,b){return urlatual.substr(a,b);}
function inverte(i){if(i){return i.match(/[^|]/gi).reverse().join("");}}

if(liga==true){
	var pageTop=unsafeWindow.top;
	var pageSelf=unsafeWindow.self;
}else{
	var pageTop=window.top;
	var pageSelf=window.self;
}

//Inicio do modulo para pegar o link de download
hosts="jumbofiles,crocko,queenshare,fiberupload,uploadboost,letitbit,grupload,uploadstation,y.ahoo,pyramidfiles,yess,filevelocity,jumbofile,lmgtfy,mir,wiki.cyanogenmod,goo,userporn,zpag,wupload,sendspace,bit,filefactory,tusfiles,freakshare,hulkshare,duckload,uploadstore,zippyshare,filebase,filestab,bitshare,usershare,goldfile,vip-file,unibytes,zshare,rapidshare,loadfiles.in,cramit.in,filesonic,furk,freakshare,uploaded,enterupload,megaporn,sharex,fileserve,shareflare,d01.megashares,d02.megashares,mediafire,oron,d03.megashares,x7,d04.megashares,easy-share,superfastfile,d05.megashares,megashares,megaupload,depositfiles,turbobit,4shared,sharingmatrix,extabit,bitroad,letitbit,hotfile,2shared,badongo,uploading,ul".split(",");
ext=".cr,.gl,.ly,.com,.com.br,.net,.to,.xpg.br,.eu,.es,.me,.it".split(",");
function getHost(u){
	u=unescape(u);
	for(a=0;a<hosts.length;a++){
		for(b=0;b<ext.length;b++){
			host=hosts[a]+ext[b];
			if(u.match(host)!=null){
				return "http://"+host+""+u.split(host)[1];
				break;
			}else
			if(inverte(u).match(host)!=null){
				return "http://"+host+""+inverte(u).split(host)[1];
				break;
			}
		}
	}
}
//Fim do modulo para pegar o link de download

//inicio da lista de protetores

protetores="dicasdedicas.com|globo-telaquentefilmes.com|cdsmp3.net|4zip.in|zorrofilmes.com|madteam.co|diretonocelular.com|.itaringa.net|dicasdownload.com|playbackgospel.com|filmeparadownload.com.br|redebaixaki.com|baixardownload.org|downloadsfreefull.com|vipdownload.com.br|hostzi.com|usaimportados.net|seriesparabaixar.com|telona.biz|anticelular.com|filmedownload.tv|baixedetudo.ne|movizxpress.com|btmoviez.com|cinemegavideo.net|downloadilimitado.net|seriadoscompletos.net|downfacil.net|recebernocelular.info|protegelinks.info|cksdownloads.com|baixarfilmesdubladosavi.com|gospelgratis.org|assistirseriesonline.info|linkeasy.org|megafilmesonline.org|baixarmegaupload.biz|onlinemoviesfreee.com|detonadosdejogos.com|webfilesfree.com|mixcelular.org|centralfilmes.info|yesdownloads.org|pqueno.com|assistirfilmesbr.org|celularbr.com|protetor-link.com|comprandodiretodachina.com|jsfilmes.org|protetor-link.blogspot.com|assistirfilmesonline.biz|downloadsgratisbr.com|downloadfilmecompleto.tv|baixarfilmeonline.org|baixai.net|invasaohacking.com|hiperdownloadsgratis.net|downloadfilme.tv|nrworld.com.br|ps2advanced.com|somcristao.com|silvagames.com|assistironlinefilme.com|linkagames.net|baixakigames.net|naviopiratanet.com|comuf.com|deviantart.com|tudofull.com|comediatotal.org|noads.biz|baixemusicas.net|assistafilmesgratis.com|tudodownloads.org|maisseries.com|megavideofilmeshd.net|sapodoido.com.br|comofazisso.net|filmescompletos.org|76.74.252.125|baixemusicas.net|share-films.net|contasbrpremium.com|tudotemaqui.kinghost.net|adf.ly|jgcelular.com|romsup.com|diretodomundo.com|2baksa.net|filmesmegavideo.net|brasildownloads.net|baixarfilmeshdgratis.com|protetordelink.tv|caiunanetoficial.com|baixacompletodownload.com|bbfilmes.tv|series-br.com|baixatudogames.com|dl.dropbox.com|protetordelink.info|baixarfilmes.ws|baixarjogoscompletos.info|down.tiodosfilmes.com|filmeshdtv.com|tvmidia.net|freedownloadbr.net|dinodownloads.com|cdsparabaixar.net|linkspd.com|gratisparabaixar.com|centrodosdownloads.com|download.felipecd.com|juniordosamba.com|jogargratisonline.com|tetadefrango.com|topcine.net|brazil-gospel.com|cinepipocafilmes.com|netau.net|ucash.in|filmesonlinecompletos.net|protectorlink.info|edufernandes.net|protetorcelular.100webspace.net|somniu.net|baixarfilmesdublado.org|baixafilmes.org|baixarfilmesnovos.net|continuar.net|sempredownload.info|go.worldgatas.com|filmesparadownload.biz|downloadbrazil.net|cinedublados.org|facildebaixar.org|xandaodownload.com|grandedown.com|baixacompletodownload.com|baixargamesparapc.com|baixakifilmeseseriados.net|vamola.in|assistirfilmeseseriesonline.com|clubedodownload.info|downmp3.org|blogpixel.com.br|piratasvirtuais.com|zpag.es|linkprotector.info|loucosporsoftwares.com|linksdojunin.com.br|loadbr.info|baixebr.org|downgratis.com|humordanet.com|cadastrodelink.com|protetordelinks.com|medonho.net|quick-downloads.com|oxfilmes.net|telona.biz|pegaki.com|baixafilmegratis.com|download-ak.com|monitordownloads.net|downloadsfilmes.com|superdownsmega.com|downloadsemcontrole.org|hddosdowns.com|baixegames.net|freefilmes.org|reidofilme.com|paginadedownload.info|paginadedownload.info|ptgooldownloads.com|linksave.com.br|reidodownload.net|linksave.com.br|ptgooldownloads.com|hiperdownloadsgratis.net|baixarcdsmp3gratis.net|puxandolegal.com|pagueoaluguel.com.br|linksave.com.br|linksave.com.br|clickfilmeshd.com|downloadrapidao.net|pegaki.com|protetordelinksja.net|linksave.com.br|centralexpert.net|linksave.com.br|linksave.com.br|livrefilmes.com|vinxp.com|semlimitedownload.com.br|filmeseseriadoscompletos.com|downfinal.com|liberandodownloads.com|downsupremo.com|vinxp.com|vinxp.com|grandedown.com.br|agaleradodownload.com|filmeshd.biz|downlivre.info|agaleradodownload.com|agaleradodownload.com|agaleradamusica.com|grandedown.info|downloadseriados.com|downloadsfilmesgratis.com.br|osencostados.net|linksdojunin.com.br|emurama.com|baixargratisbr.net|protetordelinks.com|opdirect.net|zoonadocelular.com|gratiscelular.biz|fazerdownload.net|cdsgospelgratis.org|discografiasgratis.com|protetordelinks.com|gamesmax.net|baixardownloadfilmes.net|download-filmes.org|images-listenmusicgospel.info|downloadsedicas.com.br|chacarasaocarlos.com.br|encurtador.com|baixarfilmesdublados.info|portaldomp3.com|homedownloads.net|portaldocd.com|musicasprabaixar.net|temdetudo.ws|portaldasmusicas.com|topsucessos.com|sevendownloads.org|puxasaco.org|baixarjafilmes.com|gratiscelular.biz|protegelinks.info|cubodown.com|protetordelinks.cont.us|protetorlivre.com|yess.me|filmesonlinedublado.tv|clubwarez.ws|gospelgratis.org|www.protetor.org|verfilmes.net|radioinfinity.com.br|downslivre.com|linkmaximo.com|linkagratis.info|baixardownload.org|encurtador.com|baixarfree.com|baixenitro.net|baixarseries.tv|cliquedowns.com|baixarfilmesdublados.info|baixarjogoscompletos.net|www2.brasildownloads.net|loucosporsoftwares.com|baixakibandas.com|mv-gamesbr.com|vovosalim.com|loucosporsoftwares.com|modemdownloads.net|protegerlinks.net|chacarasaocarlos.com.br|homedownloads.net|simplesdescarga.wh4.org|downgospel.com|topwebgratis.com|baixarmusicasgospelgratis.com|discografiasgratis.com|dados.xp3.biz|maisgospel.com|coletaneagospel.com|elitegospel.net|baixarjato.com|baixarplaybackgospel.com|baixarmusicasgospelgratis.com|downgospel.com|baixarfilmes3gp.com|baixarmusicasgospel.com|topwebgratis.com|topsucessos.com|downloadsdegraca.com|umquetenha.org|baixarcdsmp3.net|topfilmes.com.br|sodublados.org|chacarasaocarlos.com.br|download.downcds.net|radioinfinity.com.br|netosdesalim.info|baixakibandas.com|pagueoaluguel.com.br|paginadedownload.info|brasildowns.com.br|baixarfilmesdublados.info|protetordelinks.com|link.coquimdownload.net|baixaraquigratis.net|downloadsedicas.com.br|coletaneagospel.com|liberadosfree.info|lucrandoagora.com|hitsmp3.net|loucosporsoftwares.org|homedownloads.net|xerox66.com|downloadsgratis.us|radioinfinity.com.br|chacarasaocarlos.com.br|semlimitedownload.com.br|loucosporsoftwares.com|piratasvirtuais.com|loucosporsoftwares.com|baixerapidinho.freehostia.com|portaldomp3.com|megavideoporno.org|netosdesalim.com.br|baixarfilmesdubladosgratis.com|telona.biz|cinefox.org|downloadsgratiscompletos.com|soccerevolution.com.br|baixarcine.com|downlivre.org|downloadfilmeseseries.tv|meulinkprotegido.net|downloadfilmes.net|downloadmusicasmp3.org|vamola.in|medonho.net|cadastrodelink.com|linkeasy.org|netosdesalim.info|filmespoint.net|detonadosdejogos.com|silvagames.com|baixarfilmesonline.tv|samueldesign.com.br|entretendo.net|carrosrebaixados.net.br|uaidowns.com.br|downloadsbaixar.org|filmescompletos.info|baixarfilmesgratis.org|linksbrasil.org|filmeparabaixar.org|downlivre.info|filmesbaixar.org|sitesprontosphp.com.br|dual.dualfilmes.com|baixemp3gratis.net|downfilmesgratis.tv|downloadsbaixar.org|baixaronline.com|casadosfilmex.net|tudofreegyn.com|elitepositiva.com|cdspirados.com|baixardanet.org|uaisodownload.net|protetor.clubedodownload.info|sitesmundo.net|gospeldownloads.us|cdgospelgratis.com|nacaobrasfoot.net|nacaobrasfoot.net|protegendolinks.info|filmesonlinebaixar.org|protetordelink.webcindario.com|paginadedownload.info|topcines.net|baixakifilmes.info|link.coquimdownload.net|g1download.com|musicascompletas.co.cc|humordanet.com|download-ak.com|cdsdegraca.com|softgames.ws|ingressoson.com|stopdowns.net|baixarmp3mp4.com|protectordelinks.com|gemuladosdown.com|downloaddemusicas.org|netosdesalim.info|qjogos.com.br|allcdsmp3.net|sempredownload.info|portalnerd.com.br|filmeparabaixar.org|superdownsmega.paginadedownload.info|musicamp3gratis.org|rpds-download.com|sexodigraca.com|easy-sharee.com|sosertanejo10.com|baixakifilmesgratuitos.net|draiverdownloads.org|baixarpagode.net|baixakibandas.com|drprotetor.com|brasildownloads.net|baixanet.org|protetordelinks.com|humordanet.com|protegelink.net|downloadrapidao.net|afiliou.com.br|deviantart.com|protetordelink.blogspot.com|cdscompletos.org|urlanonimo.com|onlydown.net|afiliou.com.br|sonyfilmes.net|meggacelular.com|download.linksbrasil.org|yesdicas.net|linkprotegido.com|baixarmusicas.org|dicasdowns.net23.net|vamola.in|humordanet.com|filmesrapidao.com|puxandocompleto.com|filmesbaixar.org|topcine.net|baixar.humordanet.com|baixarocd.net|baixaraquigratis.net|baixargratisbr.net|drprotetor.com|baixarfilmesonline.com|soccerevolution.com.br|baixenamoleza.com|redirect.hiperdownload.info|fotosvideosjogos.com|baixanet.org|baixakifilmes.info|freefilmeseseries.com|portalmega.com.br|filmesrmvbgratis.com|superdownloadsfree.net|downfilmes.net|r7filmes.com|musicmp3gratis.com|topwebgratis.com|baixaraquigratis.net|eriksongravacoes.com|protetor-mbdownloads.6te.net|bari.sitedausina.com.br|ftp.marciobgf.com|baixecomrapidez.net|flogyn.com|redirectgames.net|atidownload.com|lunaticosdownloads.com|jogosmusicasvideos.com|melhoresvideosdanet.com|gsfilmes.net|centraldownloads.org|blackwolfdownloads.com|linkando.com.br|superdownloadsfree.net|baixarfilmesweb.com|admdownloads.com|dualfilmes.com|opiradinho.ueuo.com|downs6.orgfree.com|baixaebr.com|bomdownload.com|cadastrodelink.com|baixakifilmesgratuitos.net|allfilmes.org|baixarfilmefacil.com|baixardownloadgratis.com.br|freefilmes.org|filmesgrats.com|lmdownloads.com.br|dublatex.net|cliquedasorte.zymichost.com|filmesdiarios.org|pontosdasnoticias.com|linkprotector.info|reidofilme.com|downloadsgratiscompletos.com|easy-sharee.com|globofilms.net|downfilmegratis.com|sempredublados.xp3.biz|baixarfilme.info|yesfilmes.org|espacopop.com|globofilmes.org|baixarfilmesavi.com|paginadedownload.info|artefilmes.com|musicasdegraca.com|filmescompletos.info|curioosidades.net|protetorlinks.blogspot.com|go.linksbrasil.org|cineprotetor.com|downlivre.org|lukdesign.com.br|link.baixarfilmescompletos.info|linkprotector.info|sotesudas.com|filmesdownloadfree.com|protegendolinks.net|medonho.net|linkbr.info|clickgamesfree.com|jordanlenon.com|cinemaemcasa.us|redezorro.com|downloadsgratis.us|downloadliberado.com|linkstw.com|gratiscelular.biz|linkenterprise.110mb.com|joguenocelular.org|omelhordatelona.com.br|crdownload.net|sempredownload.info|seven.xp3.biz|protetor.gbicds.com|cinebluray.in|wejte.com|ads.tiozao.net|ilhadosjogos.com.br|bari.sitedausina.com.br|espacopop.com|protegelink.com|clubedamusica.net|protegendo.info|viciodowns.org|paginadedownload.info|baixeveloz.org|link-downloading.com|lik.cl|kidfacil.net|cuiabanacopa2014.com.br|protetordelinks.com.br|filmesgay.net|musicasparadownload.net|allcdsmp3.net|allcdsmp3.net|musicasbaixar.org|mega-downs.net|melhoresvideosdanet.com|lucrandoagora.com|baixarcdscompletos.riquezavirtual.net|freemusicagospel.com|tgdclick.blogspot.com|seriescombo.com|ftp.marciobgf.com|downloadsgratiscompletos.com|dualfilmes.com|cubodown.com|protetordelink.net|filmeseseriadosgratis.com|filmeseseriadosgratis.com|musicamp3gratis.org|protetor.facilbaixar.com|filmesnovos.org|clikefilmes.net|adamdesenvolvimento.com.br|dubladao.dominiotemporario.com|puxandolegal.com|speed-share.org|vovosalim.com|iniciardownload.in|puxandocompleto.com|netosdesalim.info|downloadsdegraca.com|filmeparabaixar.com|protegelinks.info|portaldasmusicas.com|uoldownloads.com|kidfacil.net|download.insidehitz.com|downloadsdegraca.com|celularjogos.org|baixarmp3mp4.com|informaxdownloads.com|reidodownload.org|baixemusicas.org|superdownload.us|link.rsxdownload.org|contaspremiadas.com.br|muambeiros.net|downloadsfreewares.com|dicasdowns.net23.net|baixafilmeshd.com|baixaki.mobi|baixecerto.com|usinadodownload.com|archivedown.net|filmesdegraca.org|kidfacil.net|topcines.net|baixetop.net|baixemusicas.org|protetor.downloadcdsgratis.com|baixargratisbr.info|protetor.downfive.com|reidodownload.org|pegaki.com|livreprabaixar.com|universoregistrobrasfoot.com|liberadosfree.info|liberadosfree.info|protetordownloads.info|telona.biz|cachorrolouco.net|linkprotetor.info|nacaobrasfoot.net|universobrasfoot.net|link.mundobrasfoot.info|brasfootextreme.net|jordanlenon.com|factoryfilmes.net|justfilmeseseriados.org|downloadfilmeseseries.tv|multibrasilsurf.co.cc|ps2advanced.net|fontededownloads.org|downloadsmais.com|rsmp3.com|assistirseriesonline.co.cc|intertainer.com.br|cineprotetor.com|clubedodownload.info|filmeslegendados.info|riquezavirtual.net|tudoaquite.dominiotemporario.com|baixarcdsmp3.net|filmesonlinebr.com|linkstw.com|depositodomp3.org|contaspremiadas.com.br|apgfamily.com|portaldomp3.com|planetadownloads.com|rsmp3.com|drprotetor.com|depositodomp3.com|sodublados.org|musicasparabaixar.org|mc-filmes.org|assistir.filmesmegavideo.net|baixafacilgames.com|redezorro.110mb.com|baixegratis.ws|meggacelular.com|protetordelink.net|kidfacil.net|protegendolinks.net|playcelular.net|sempredownload.info|down.tiodosfilmes.com|megagratis.net|seriadosonline.net|protelink.net|opdirect.net|gatafamosa.com|radiogeraltaligado.com|ps2advanced.net|vipseries.org|megadublados.com|downloads-completos.info|playcelular.net|protetorlink.com|baixemp3gratis.com.br|baixafilmes.org|thunder-public.blogspot.com|meggacelular.com|protetor.baixemusicas.net|easy-sharee.com|linkprotector.info|gamesingame.net.br|downloadsapo.com|monitordownloads.net|baixardownload.net|baixeitudo.com|assistir.cinemegavideo.net|downloadsemcontrole.org|insanity.ws|protectorlink.info|baixargratisbr.net|baixarfilmesdegraca.net|baixeaquifilmes.com|superdownsmega.com|melhordocinema.com|riquezavirtual.net|protegendolinks.net|sbtfilmes.net|cubodown.com|download.mus.br|quick-downloads.com|vasiliska.com|depositodomp3.com|linkprotegido.com|cinemaemcasa.us|loucosporsoftwares.org|netosdesalim.com.br|portablebrasil.net|gamerdecelular.org|uptotal.com|tudoaquite.dominiotemporario.com|gamesgerais.com|downcelular.com|protegerlinks.com|baixarfilmesbr.biz|putariatube.net|fire.tiozao.net|israbox.com|carnaporto.net|downmusicasmp3.net|depositodomp3.com|baixaki.mobi|filmesnovos.org|baixedetudogratis.com|baixargratisbr.net|cbdownload.info|elitedosfilmes.com|castordownloads.net|depositodomp3.com|downgratishd.net|sbtfilmes.net|baixarfilmesrmvb.net|meggacelular.com|fire.tiozao.net|linkseguro.110mb.com|guajenetgv.blogspot.com|baixemuito.net|downloadfilmesrmvb.com|protetordelinks.com.br|rsmp3.com|puxae.com|puxae.com|protegelinks.info|soccerevolution.co.cc|uouwww.com|radiogeraltaligado.com|baixerapidinho.freehostia.com|downmusicas.net|radiogeraltaligado.com|downloadfilmesgratis.com|netosdesalim.info|fontededownloads.org|evolutionsurf.net|baixenamoleza.org|evolutionsurf.net|brasildowns.com.br|oneclickmoviez.com|protetordelinksja.net|netosdesalim.info|freetela.com|zepekeno.com|cinefox.org|filmesadvanced.com|linkprotetor.com|kingdownloads.org|depositodomp3.com|zorrofilmes.com|seriesnane.dominiotemporario.com|puxae.com|readygames.com.br|soaquimesmo.info|protegendo.info|filmesdowns.net|topcine.net|downloadsgratis.org|protetor.artesbr.com|protetordelinks.info|sofilmesgratis.info|protetordelinks.info|bestdocs.com.br|protetor.mvdownloads.com|baixebr.org|humordanet.com|celularbr.com|styker.net|downscompleto.net|linkbr.info|linkprotegido.info|k2downloads.info|ondavideos.com.br|poloven.info|justfilmeseseriados.org|linkagratis.info|hitsbrazil.net|centerportal.com.br|melhoresvideosdanet.com|sevendownloads.protetordelink.com|links10.info|sbtfilmes.net|redir.stationpop.com|arreganho.com|turkodownloads.net|ozdownloads.org|camlink.com.br|protectlink.us|protectlink.us|ohputz.com|links.soatualizados.com|jogandonline.com.br|seulink.net|naodiga.com|filmesdublados.net|megalinkbr.com|protetordelinks.com.br|direcionando.baixedetudo.net|clickgratis.org|projetosbr.com|downloadfilmesgratis.org|links.downloadsmais.com|downfilmesgratis.net|celularjogos.biz|cdsmp3gratis.net|linkprotetor.com|baixartudofree.net|silvagames.com|tudotemaqui.net|protetordelinks.com.br|netosdesalim.info|linkprotetor.net|link.ps2downloads.net|baixarjato.com|meggacelular.com|baixatudogames.com|jordanlenon.com|humordanet.com|baixasoaki.com|downgratis.com|elitedosfilmes.com|baixeja.com|protetor-links.com|daulodes.com|protegendo.info|protegendo.info|linkproteger.riquezavirtual.net|riquezavirtual.net|linkprotector.info|protelink.com|musicasdegraca.com|furiagames.org|adulto.telona.org|sdm.protegendolinks.com|filmesdiarios.org|clubedodownload.info|silvagames.com|baixandonanet.com|filmesnovos.org|redirecionando.info|www2.brasildownloads.net|baixandonanet.com|mp3z.com.br|lukdesign.com.br|www5.xpg.com.br|celularbr.com|promocoesdeprodutos.com|links10.info|baixebr.org|brdownloads.com|downloadsemcontrole.com|indica.celularbr.com|musicasparabaixar.org|cbdownload.info|protelink.info|agaleradodownload.info|uouwww.com|kidfacil.net|naviopirata.net|netosdesalim.info|dedoroxo.com|linkprotegido.org|protetordelink.com|superdownloadsfree.net|degracaemaisgostoso.biz|humordanet.com|furiagames360.org|celularbr.com|filmeshd.tv|downloadsedicas.com.br|loucosporsoftwares.org|downloadsmais.com|universobrasfoot.info|universobrasfoot.info|baixardownload.net|registrobrasfoot.net|humornanet.net|protelink.net|linkprotegido.biz|baixeja.com|telaquente.biz|tudotemaqui.net|downloadsedicas.com.br|archivedown.net|telona.org|meulinkprotegido.com|downloadsgratis.org|baixarfilmeseseries.org|filmesrmvbgratis.com|downlivre.org|downloadsfacil.com|down.tiodosfilmes.com|linkmais.us|filmesdiarios.org|elitedosfilmes.com|celularbr.com|castordownloads.org|filmestododia.com|evolutionsurf.net|baixandorapido.com|humornanet.net|downloadsemcontrole.com|protetordownloads.info|linkprotegido.biz|infodigital.org|gargalhada.net|yuncle.com|linkprotegido.biz|agaleradodownload.com|protetordelinks.com|entretenimento.blog.br|filmesparadownloads.com|link-downloading.com|protetordelink.net|readygames.com.br|protetordelink.com|linkbr.info|linkbr.info|downloadsgratis.org|downloadsgratis.us|xerox66.com|flexpowerdownloads.net|protectlink.us|cinefox.net|baixarfilmeseseriesdublados.net|cdscompletos.org|celularbr.com|baixenamoleza.org|pontosdasnoticias.com|protetor.mvdownloads.com";
if(sr_listalocal.length>0){protetores=protetores+"|"+sr_listalocal;}
protetores=protetores.split("|");

divisores="?go=|&f=h|?v=|&link=|&url=|?url=|/?|#/|?link=|?url$|?id=|&id=|?go!|?url:=|?rs=|8?|?u=|t/|d1=|s/?|DovL/|1=|1/|2/|3/|4/|5/|6/|7/|8/|9/|0/|ad/|a&|pa/|d/?|g?|o/|r/|out?".split("|");

//fim da lista de protetores



/*inicio modulo de atualizacao v0.8*/
if(liga==true && sr_updateonoff=="Ligada" && pageTop==pageSelf){
function busca_update(domenu){
tempo=new Date();
		hor=tempo.getHours();if(hor<10){hor='0'+hor}
		min=tempo.getMinutes();if(min<10){min='0'+min}
		dia=tempo.getDate();if(dia<10){dia='0'+dia}
		mes=tempo.getMonth()+1;if(mes<10){mes='0'+mes}
		ano=tempo.getFullYear();
		dataatual=ano+''+mes+''+dia+''+hor+''+min;
		
		datacheca=GM_getValue("datacheca","");
	if(dataatual>=datacheca || domenu!=undefined){
	if(sr_updateem>0){datacheca=eval(dataatual.substring(6,8)+"+"+sr_updateem);
			}else{datacheca=dataatual.substring(6,8);}
			datacheca=dataatual.replace(dataatual.substring(6,8),datacheca);
			GM_setValue("datacheca",datacheca);

			lnkupdate="http://userscripts.org/scripts/source/56530";
		function conecta(){
			lnkfonte=lnkupdate+".meta.js";
			lnkdown=lnkupdate+'.user.js';
			GM_xmlhttpRequest({
				method: "GET",url: lnkfonte,
				onerror: function(){if(n>=l.length){n=0;}else{n++;}conecta();},
				onload: function(response) {
					dados=response.responseText;
					dados1=dados.split("vver = '")[1];
					if(dados1==undefined){if(n>=lnkupdate.length){n=0;}else{n++;}conecta();}else{
						dados2=dados1.split("';")[0];dados2=dados2.replace(/ /gi,'');
						if(dados2>vver && location.href==top.location.href){
							jnl_update_css=d.createElement('style');
							jnl_update_css.innerHTML=""+
'								.sr_jnlupdte_fundo, #btFechaupdate, .sr_jnlupdte_conteudo_fundo{'+resetcss+'}'+
'								.sr_jnlupdte_fundo{'+
'									z-index:99999;'+
'									position:fixed;'+
									sr_updateposesqdir2+':'+sr_updateposesqdir1+';'+
									sr_updateposcimbai2+':'+sr_updateposcimbai1+';'+
'									width:150px;'+
'									height:100px;'+
'									background:'+sr_sty_corbg2+';'+
'									color:'+sr_sty_corfnt1+';'+
'									-moz-border-radius:10px;'+
'									border-radius:10px;'+
'									padding-left:10px;'+
'									font-family:"trebuchet ms",Verdana,Arial,Helvetica,sans-serif,serif;'+
'								}'+
'								#btFechaupdte:hover{'+
'									background:red;'+
'								}'+
'								#btFechaupdte{'+
'									width:5px;'+
'									height:15px;'+
'									border:1px solid white;'+
'									background:transparent;'+
'									color:white;'+
'									-moz-border-radius:5px;'+
'									border-radius:5px;'+
'								}'+
'								.sr_jnlupdte_conteudo_fundo{'+
'									background:'+sr_sty_corbg3+';'+
'									color:'+sr_sty_corbg2+';'+
'									width:140px;'+
'									height:65px;'+
'									-moz-border-radius:5px;'+
'									border-radius:5px;'+
'									text-align:center;'+
'									font-size:9pt!important;'+
'									font-family:"trebuchet ms",Verdana,Arial,Helvetica,sans-serif,serif;'+
'								}';
							d.body.appendChild(jnl_update_css);
							jnl_update_div=d.createElement('div');
							jnl_update_div.innerHTML=''+
								'<div class="sr_jnlupdte_fundo" id="sr_jnlupdte_fundo">'+
								'	<div class="sr_jnlupdte_fundo_titulo">'+
								'		<div style="padding-top:3px!important;text-align:left;float:left;font-size:7pt!important;">Skipp Redirect '+vver+'</div><div style="float:right;padding-right:8px;padding-top:2px;"><input type="button" value="x" id="btFechaupdte" onclick="fechajnlupdte(\'sr_jnlupdte_fundo\')"/></div><div style="clear:both"></div>'+
								'	</div>'+
								'	<div class="sr_jnlupdte_conteudo_fundo">'+
								'	v'+dados2+'<br>disponível'+
								'	<br>'+
								'	<input type="button" value="Instalar" onclick="fechajnlupdte(\'sr_jnlupdte_fundo\');location.href=\''+lnkdown+'\'"/><input type="button" value="Notas" id="sr_mostraNotas"/>'+
								'	</div>'+
								'</div>';
								d.body.appendChild(jnl_update_div);								
								function sr_mostraNotas(){
									vartemp=(dados.split("notas = '")[1].split("';")[0]).replace(/\\n/gi,"\n");
									alert("[Notas da Versão "+dados2+"]\n\n"+vartemp);
								}
								id("sr_mostraNotas").addEventListener("click",sr_mostraNotas,false);
				
							
							jnl_update_scr=d.createElement('script');
							jnl_update_scr.innerHTML=''+
								'var d=document;'+
								'function fechajnlupdte(ee){'+
								"var e=d.getElementById(ee);return e.parentNode.removeChild(e);"+
								'}';
							d.body.appendChild(jnl_update_scr);
						}else{
							if(domenu!=undefined){alert("Versão Instalada: "+vver+"\nVersão no Servidor: "+dados2+"\nnenhuma atualização disponivel");}
						}
					}
				}
			});
		}//fim do conecta
	okt=/orkut.com/gi;if(location.href.match(okt)==null){conecta();}//corrige incompatibilidade com orkut;
	}//fim do checa data
	
}
busca_update();
}
/*fim modulo de atualizacao*/

if(liga==true){
function sr_jnl_config(){
var sr_jnl_cfg_css=""+
".sr_moduloaddlink_bt{"+
"width:150px;"+
"border:1px solid black;"+
"}"+
".sr_cfg_jnl_fundo fieldset{"+
"border:1px solid black;"+
"}"+
'	.sr_cfg_fundo_pg, .sr_cfg_jnl_conteudo_fundo, .sr_cfg_jnl_fundo{'+resetcss+'}'+
"	.sr_cfg_fundo_pg{"+
"		z-index:99995;"+
"		background:"+sr_sty_corbg1+";"+
"		opacity:.4;"+
"		position:fixed;"+
"		top:0px;"+
"		left:0px;"+
"		width:100%;"+
"		height:100%;"+
"	}"+
"	.sr_cfg_jnl_conteudo_fundo input{font-size:10pt!important;}"+
"	/*.sr_cfg_jnl_conteudo_fundo input:hover{background:"+sr_sty_corbg2+";text-shadow:1px 1px white;}*/"+
"	.sr_cfg_jnl_conteudo_fundo{"+
"		background:"+sr_sty_corbg3+";"+
"		color:"+sr_sty_corfnt2+";"+
"		width:620px;"+
"		height:320px;"+
"		-moz-border-radius:10px;"+
"		border-radius:10px;"+
"		padding-left:10px;"+
"/*border:1px solid white;*/"+
"	}"+
"	.sr_cfg_jnl_fundo{"+
"		z-index:99997;"+
"		position:fixed;"+
"		top:50%;"+
"		left:50%;"+
"		margin:-200px -320px;"+
"		width:640px;"+
"		height:400px;"+
"		background:"+sr_sty_corbg2+";"+
"		color:"+sr_sty_corfnt1+";"+
"		-moz-border-radius:10px;"+
"		border-radius:10px;"+
"		border:0.1mm solid black;"+
"		padding-left:10px;"+
"		font-family:'trebuchet ms',Verdana,Arial,Helvetica,sans-serif,serif!important;"+
"	}"+
"	.sr_cfg_jnl_fundo_titulo{padding-top:10px!important;padding-bottom:10px!important;}"+
"	.sr_cfg_jnl_conteudo{width:100%!important;height:85%!important;}"+
"	.sr_cfg_jnl_conteudo input{-moz-border-radius:10px;border:1px solid "+sr_sty_corbg2+";text-align:center!important;}"+
"	.sr_jnl_menu_item0, .sr_jnl_menu_item1{"+
"		-moz-border-radius:10px 10px 0 0;"+
"		border-radius:10px 10px 0 0;"+
"		width:150px;"+
"		height:20px;"+
"		text-align:center!important;"+
"		/*border:1px solid white;"+
"		border-bottom:0;*/"+
"		float:left;"+
"		margin-left:1px;"+
"		margin-right:1px;"+
"	}"+
"	.sr_cfg_jnl_menu{padding-left:15px;}"+
"	.sr_jnl_menu_item0{background:"+sr_sty_corbg3+";color:black;}"+
"	.sr_jnl_menu_item1{background:transparent;color:white;}"+
"	#btFecha:hover{background:red;}"+
"	#btFecha{"+
"		width:15px!important;"+
"		height:15px!important;"+
"		border:1px solid white;"+
"		background:transparent;"+
"		color:white;"+
"		-moz-border-radius:5px;"+
"		border-radius:5px;"+
"	}"+
"#sr_avsoUpdateEx{"+
"	opacity:.5;"+
"	z-index:99997;"+
"	text-align:center;"+
"	color:"+sr_sty_corfnt1+";"+
"	-moz-border-radius:10px;"+
"	width:150px;"+
"	height:100px;"+
"	background:"+sr_sty_corbg2+";"+
"	position:fixed;"
	+sr_updateposesqdir2+":"+sr_updateposesqdir1+";"
	+sr_updateposcimbai2+":"+sr_updateposcimbai1+
"}";

var mudacorinput="this.style.background=this.value;";
var nObj=d.createElement("style");
	nObj.setAttribute("id","sr_cfg_sty_css");
	nObj.innerHTML=sr_jnl_cfg_css;
	d.body.appendChild(nObj);

nObj=d.createElement("div");
	nObj.setAttribute("class","sr_cfg_fundo_pg");
	nObj.setAttribute("id","sr_cfg_fundo_pg");
	d.body.appendChild(nObj);

nObj=d.createElement("div");
	nObj.setAttribute("id","sr_cfg_doacao_div");
	nObj.setAttribute("style","background:white;width:250px;-moz-border-radius:10px;text-align:center;font-size:9pt;z-index:999999;position:fixed;top:2%;right:2%;");
	nObj.innerHTML="Gostou do SkippRedirect? Então faça uma doação:<br><a  target='_blank'; href='http://skippredirect.xpg.com.br/doacoes.html'><img src='https://p.simg.uol.com.br/out/pagseguro/i/botoes/doacoes/205x30-doar-azul.gif'/></a>";
	d.body.appendChild(nObj);
	
nObj=d.createElement("div");
	nObj.setAttribute("class","sr_cfg_jnl_fundo");
	nObj.setAttribute("id","sr_cfg_jnl_fundo");
	tag("body")[0].appendChild(nObj);
	var menucont=''+
'<div class="sr_cfg_fundo_pg"> </div>'+
'<div class="sr_cfg_jnl_fundo">'+
'	<div class="sr_cfg_jnl_fundo_titulo">'+
'		<div style="text-align:left;width:350px;float:left;">Skipp Redirect '+vver+' ('+vdata+')</div><div style="float:right;width:auto;"><input type="button" value="x" id="btFecha" onclick="fechajnl(\'sr_cfg_doacao_div,sr_cfg_sty_css,sr_cfg_fundo_pg,sr_cfg_jnl_fundo,sr_cfg_jnl_scr_menu,sr_avsoUpdateEx\')"/></div><div style="clear:both"></div>'+
'	</div>'+
'	<div class="sr_cfg_jnl_menu">'+
'		<div class="sr_jnl_menu_item0" id="sr_jnl_menu_item0" onMouseover="t=this.id;sr_menu(t[t.length-1])">Adicionar Protetores</div>'+
'		<div class="sr_jnl_menu_item1" id="sr_jnl_menu_item1" onMouseover="t=this.id;sr_menu(t[t.length-1])">Configurações</div>'+
'		<div class="sr_jnl_menu_item1" id="sr_jnl_menu_item2" onMouseover="t=this.id;sr_menu(t[t.length-1])">Enviar Url</div>'+
'		<div class="sr_jnl_menu_item1" id="sr_jnl_menu_item3" onMouseover="t=this.id;sr_menu(t[t.length-1])">Notas desta Versão</div>'+
'		<div style="clear:both"></div>'+
'	</div>'+


'	<div class="sr_cfg_jnl_conteudo_fundo">'+
'		<div class="sr_cfg_jnl_conteudo" id="sr_jnl_conteudo0">'+
'			<br>'+
'			<div style="text-align:center">'+
'				<fieldset class="sr_moduloaddlink_fieldset" style="width:94%">'+
'					<legend>'+
'						Adicione apenas Protetores do tipo: <b>Comum, Base64 ou Hex</b>'+
'					</legend>'+
'			<div>'+
'				<select size="13" style="width:570px;border:none;" id="sr_moduloaddlink_selectlista">'+
'					<option>Nenhuma Lista Carregada</option>'+
'				</select>'+
'			</div>'+
'		<div><br>'+
'			<div style="float:left;">'+
'			<input type="button" value="Adicionar" id="sr_moduloaddlink_btAdicionar"/>'+
'			<input type="button" value="Editar" id="sr_moduloaddlink_btEditar"/>'+
'			<input type="button" value="Remover" id="sr_moduloaddlink_btRemover"/>'+
'			<input type="button" value="Remover Tudo" id="sr_moduloaddlink_btRemovertudo"/>'+
'			</div><div>Backup: '+
'			<input type="button" value="Importar/Exportar" id="sr_moduloaddlink_btBackupImportarExportar"/>'+
'			</div>'+
'		</div>'+
'				</fieldset>'+
'			</div>'+
'</div>'+

'		<div class="sr_cfg_jnl_conteudo" id="sr_jnl_conteudo1">'+
'			<fieldset style="width:43%;height:100%;float:left;">'+
'				<legend>Estilo:</legend>'+
'				<table>'+
'					<tr>'+
'						<td>Cor do fundo1:</td><td><input type="text" id="sr_sty_corbg1" value="'+sr_sty_corbg1+'" style="text-shadow:1px 1px white;background:'+sr_sty_corbg1+'" onKeyup="'+mudacorinput+'" onclick="this.select()"/></td>'+
'					</tr>'+
'					<tr>'+
'						<td>Cor do fundo2:</td><td><input type="text" id="sr_sty_corbg2" value="'+sr_sty_corbg2+'" style="text-shadow:1px 1px white;background:'+sr_sty_corbg2+'" onKeyup="'+mudacorinput+'" onclick="this.select()"/></td>'+
'					</tr>'+
'					<tr>'+
'						<td>Cor do fundo3:</td><td><input type="text" id="sr_sty_corbg3" value="'+sr_sty_corbg3+'" style="text-shadow:1px 1px white;background:'+sr_sty_corbg3+'" onKeyup="'+mudacorinput+'" onclick="this.select()"/></td>'+
'					</tr>'+
'					<tr>'+
'						<td>Cor do fonte1:</td><td><input type="text" id="sr_sty_corfnt1" value="'+sr_sty_corfnt1+'" style="text-shadow:1px 1px white;background:'+sr_sty_corfnt1+'" onKeyup="'+mudacorinput+'" onclick="this.select()"/></td>'+
'					</tr>'+
'					<tr>'+
'						<td>Cor do fonte2:</td><td><input type="text" id="sr_sty_corfnt2" value="'+sr_sty_corfnt2+'" style="text-shadow:1px 1px white;background:'+sr_sty_corfnt2+'" onKeyup="'+mudacorinput+'" onclick="this.select()"/></td>'+
'					</tr>'+
'					<tr>'+
'						<td>'+
'							<a target="_blank" href="http://en.wikipedia.org/wiki/List_of_colors" style="font-size:8pt;">Guia de Cores</a>'+
'						</td>'+
'					</tr>'+
'				</table>'+				
'			</fieldset>'+
'			<fieldset style="width:48%;height:85%;">'+
'				<legend>Atualização:</legend>'+
'				<table>'+
'					<tr>'+
'						<td>Atualização:</td><td><input id="sr_updateonoff" type="button" value="'+sr_updateonoff+'" onclick="if(this.value==\'Ligada\'){this.value=\'Desligada\'}else{this.value=\'Ligada\'}"/></td>'+
'					</tr>'+
'					<tr>'+
'						<td>Atualizar em:</td><td><input type="text" id="sr_updateem" value="'+sr_updateem+'" onclick="this.select()"/>(dias)</td>'+
'					</tr>'+
'					<tr>'+
'						<td></td><td><input style="font-size:8pt" type="button" value="Buscar por atualizações" id="bt_busca_atu_ago"/></td>'+
'					</tr>'+
'					<tr>'+
'					<td>'+
'					</td>'+
'					<td>'+
'					<p style="font-size:10pt">Posição do aviso de atualização:</p>'+
'					<input type="text" value="'+sr_updateposesqdir1+'" id="sr_updateposesqdir1" size="2"/>'+
'					<select style="border:0" id="sr_updateposesqdir2">';
if(sr_updateposesqdir2=="left"){
	menucont+='<option value="left" selected>Esquerda</option><option value="right">Direita';
}else{
	menucont+='<option value="left">Esquerda</option><option value="right" selected>Direita';
}
menucont+='</option></select><br><input type="text" value="'+sr_updateposcimbai1+'" id="sr_updateposcimbai1" size="2"/><select style="border:0" id="sr_updateposcimbai2" >';
if(sr_updateposcimbai2=="top"){
	menucont+='<option value="top" selected>Topo</option><option value="Bottom">Baixo';
}else{
	menucont+='<option value="top">Topo</option><option value="bottom" selected>Baixo';
}
menucont+='</option></select>'+
'					</td>'+
'					</tr>'+
'				</table>'+
'			</fieldset>'+
'<fieldset style="text-align:right;width:48%;height:7%;">'+
'	<input type="button" id="sr_restaurar" value="Restaurar"/><input type="button" id="sr_salvar" value="Salvar"/>'+
'</fieldset>'+
'		</div>'+


'		<div class="sr_cfg_jnl_conteudo" id="sr_jnl_conteudo2">'+
'			<center><br><br><br><br><br>Devido um problema no servidor, esta função ficará offline por um tempo.<br><BR><BR><div style="display:none;">Encontrou um protetor que não está adicionado?<br>'+
'			Adicionou o protetor mais ele não foi burlado?<br>'+
'			Então me envie o Url do protetor, pelo campo abaixo:<br><br>'+
'			<input type="text" style="width:450px;" id="sr_urlenviasite"/><br>'+
'			<input type="button" value="Enviar" id="sr_urlenviasitebt"/><br>'+
'			PS: Caso eu não responda em 72hs, </div>Peço que me envie o url para o meu email: ECV_Edimilson@hotmail.com</center>'+
'		</div>'+


'		<div class="sr_cfg_jnl_conteudo" id="sr_jnl_conteudo3">'+
'<br><br><br><br>'+
'Atualizações feitas nesta versão:<br>'+
notas.replace(/\n/gi,"<br>")+
'	</div>'+

'	</div>'+
'</div>';
nObj.innerHTML=menucont;

nObj=d.createElement("script");
	nObj.setAttribute("id","sr_jnl_scr_menu");
	d.body.appendChild(nObj);
	nObj.innerHTML=''+
'function id(id){return document.getElementById(id)}'+
'function del(e) {if(e){return e.parentNode.removeChild(e);}}'+
'function sr_menu(n){'+
'	var totalmenus=4;'+
'	for(x=0;x<totalmenus;x++){'+
'		if(x==n){'+
'			id(("sr_jnl_menu_item"+x)).className="sr_jnl_menu_item0";'+
'			id(("sr_jnl_conteudo"+x)).style.display="block";'+
'		}else{'+
'			id(("sr_jnl_menu_item"+x)).className="sr_jnl_menu_item1";'+
'			id(("sr_jnl_conteudo"+x)).style.display="none";'+
'		}'+
'	}'+
'}'+
'function fechajnl(jnls){'+
'var jnls=jnls.split(",");\n'+
'for(x=0;x<jnls.length;x++){'+
'	del(id(jnls[x]));'+
'}'+
'}'+
'sr_menu(0);';







var sr_moduloaddlink_selectLista=id("sr_moduloaddlink_selectlista");
//Inicio da funcao que carrega a lista de links para Adição, Edição ou Remoção;
classe=null;
function sr_carregaLista(lnks){
	classe=lnks;
	if(GM_getValue(lnks,"Nenhuma Url Cadastrada")!=""){
		lnks=GM_getValue(lnks,"Nenhuma Url Cadastrada").split("|").sort();
	}else{
		GM_deleteValue(lnks);
		sr_carregaLista(classe);
	}
	
	sr_moduloaddlink_selectLista.innerHTML="";
	if(lnks.length>0){
		for(x=0;x<lnks.length;x++){
			var sr_nItem=d.createElement("option");
			sr_nItem.innerHTML=lnks[x];
			sr_moduloaddlink_selectLista.appendChild(sr_nItem);
		}
	}else{
		sr_moduloaddlink_selectLista.innerHTML="Nenhuma Url Cadastrada";
	}
}
sr_carregaLista(sr_listalocal_local);
//Fim da funcao que carrega a lista de links para Adição, Edição ou Remoção;

function sr_adicionar(){
	if(sr_moduloaddlink_selectLista[0].innerHTML!="Nenhuma Lista Carregada"){
		if(redirecionador=prompt("Cole o URL do redirecionador:","")){
			if(GM_getValue(classe,"")!=""){
				redirecionador=GM_getValue(classe,"")+"|"+(redirecionador.replace("|","%7C"));
			}else{
				redirecionador=redirecionador.replace("|","%7C")
			}
			GM_setValue(classe, redirecionador);
			sr_carregaLista(classe);
		}
	}else{
		alert("/!\\Erro\n\nVocê deve escolher uma categoria de redirecionador, antes de adicionar um url.");
	}
}

function sr_editar(){
	if(sr_moduloaddlink_selectLista.selectedIndex!=-1){
		var sr_moduloaddlink_selectListaItem=sr_moduloaddlink_selectLista[sr_moduloaddlink_selectLista.selectedIndex];
		if(confirm("Deseja mesmo editar esse redirecionador?")){
			if(redirecionador=prompt("Editando o Redirecionador/Protetor:\n\n"+sr_moduloaddlink_selectListaItem.value,sr_moduloaddlink_selectListaItem.innerHTML)){		
				redirecionador=redirecionador.replace("|","%7C");
				redirecionador=GM_getValue(classe,"").replace(sr_moduloaddlink_selectListaItem.innerHTML,redirecionador);
				GM_setValue(classe, redirecionador);
				sr_carregaLista(classe);
			}
		}
	}else{
		alert("/!\\Erro\n\nVocê deve escolher um redirecionador e/ou categoria, antes de editar.");
	}
}
function sr_remover(){
	if(sr_moduloaddlink_selectLista.selectedIndex!=-1){
		var sr_moduloaddlink_selectListaItem=sr_moduloaddlink_selectLista[sr_moduloaddlink_selectLista.selectedIndex];
		if(confirm("Deseja mesmo apagar o redirecionador:\n"+sr_moduloaddlink_selectListaItem.innerHTML)){
				redirecionador=GM_getValue(classe,"").replace(sr_moduloaddlink_selectListaItem.innerHTML+"|","");
				redirecionador=GM_getValue(classe,"").replace("|"+sr_moduloaddlink_selectListaItem.innerHTML,"");
				GM_setValue(classe, redirecionador);
				if(GM_getValue(classe)!=""){
					sr_carregaLista(classe);
				}else{
				GM_deleteValue(classe);
				sr_carregaLista(classe);
				}
		}
	}else{
		alert("/!\\Erro\n\nVocê deve escolher um redirecionador e/ou categoria, antes de remover.");
	}
}
function sr_removertudo(){
	if(confirm("Tem certeza que deseja apagar todos os urls desta categoria?")){
		GM_deleteValue(classe);
		sr_carregaLista(classe);
	}
}
function sr_backupimportarexportar(){
	if(classe!=null){
		if(bkup=prompt("Copie ou cole os urls no campo abaixo:",GM_getValue(classe,""))){
			if(bkup!=GM_getValue(classe,"")){
				GM_setValue(classe,bkup);
				sr_carregaLista(classe);
			}
		}
	}else{
		alert("/!\\Erro\n\nVocê deve escolher uma categoria, antes de Importar ou Exportar.");
	}
}
id("sr_moduloaddlink_btAdicionar").addEventListener("click",function(){sr_adicionar();},true);
id("sr_moduloaddlink_btEditar").addEventListener("click",function(){sr_editar();},true);
id("sr_moduloaddlink_btRemover").addEventListener("click",function(){sr_remover();},true);
id("sr_moduloaddlink_btRemovertudo").addEventListener("click",function(){sr_removertudo();},true);
id("sr_moduloaddlink_btBackupImportarExportar").addEventListener("click",function(){sr_backupimportarexportar();},true);

function sr_enviaurlsiteF(){
	if(url=id("sr_urlenviasite").value){
		if(url.split(".").length>0 && url.length>5 && url.match("http://")!=null && url.match(" ")==null){
			url=escape(url.replace(/\</gi,"").replace(/\|/gi,"%7C"));
			GM_xmlhttpRequest({
				method: "GET",url: (sr_site+"lista.php?add="+url),
				onload: function(response) {
					alert(response.responseText.split("<body>")[1].split("</body>")[0]);
					location.href=location.href;
				}
			});
		}else{
			alert("Você deve colar o url completo, ou eu não vou poder analiza-lo =P");
		}
	}
}
id("sr_urlenviasitebt").addEventListener("click",function(){sr_enviaurlsiteF();},true);





var avsoUpdateEx=d.createElement("div");
	avsoUpdateEx.setAttribute("id","sr_avsoUpdateEx");
	avsoUpdateEx.innerHTML="<br>Aviso de<br>atualização<br>aqui.";
	tag("body")[0].appendChild(avsoUpdateEx);
function fechajnl(jnls){
			jnls=jnls.split(",");
			for(x=0;x<jnls.length;x++){
				del(id(jnls[x]));

			}
}
chaves="sr_sty_corbg1,sr_sty_corbg2,sr_sty_corbg3,sr_sty_corfnt1,sr_sty_corfnt2,sr_updateonoff,sr_updateem,sr_updateposcimbai1,sr_updateposcimbai2,sr_updateposesqdir1,sr_updateposesqdir2";
	function sr_restaura_cfg(){
		if(confirm("Deseja mesmo Restaurar as configurações?")){
			chaves=chaves.split(",");
			for(x=0;x<chaves.length;x++){
				GM_deleteValue(chaves[x]);
				GM_deleteValue("datacheca");
			}
			alert("Configurações Restauradas!");	
			fechajnl('sr_cfg_sty_css,sr_cfg_fundo_pg,sr_cfg_jnl_fundo,sr_cfg_jnl_scr_menu,sr_avsoUpdateEx');
			loadvar();
			sr_jnl_config();
		}
	}

	function sr_salva_cfg(){
		function id(id){return document.getElementById(id)}
		if(confirm("Deseja mesmo Salvar as configurações?")){
			chaves=chaves.split(",");
			for(x=0;x<chaves.length;x++){
				GM_setValue(chaves[x],id(chaves[x]).value);
			}
				GM_deleteValue("datacheca");
			fechajnl('sr_cfg_sty_css,sr_cfg_fundo_pg,sr_cfg_jnl_fundo,sr_cfg_jnl_scr_menu,sr_avsoUpdateEx');
			loadvar();
			sr_jnl_config();
			if(id("sr_jnlupdte_fundo")){
				fechajnl('sr_jnlupdte_fundo');
				busca_update();
			}
		}
	}
id("sr_restaurar").addEventListener("click",sr_restaura_cfg,false);
id("sr_salvar").addEventListener("click",sr_salva_cfg,false);
function busca_update2(){busca_update("true")}
id("bt_busca_atu_ago").addEventListener("click",busca_update2,false);

}
GM_registerMenuCommand("[SkippRedirect "+vver+"] Configurações", sr_jnl_config);
}

function janela(){
if(pageTop==pageSelf){
var css=d.createElement('style');
	css.innerHTML=resetcss+""+
'		.sr_skipp_fundo_pg{'+
'		z-index:99998!important;'+
'		background:'+sr_sty_corbg1+'!important;'+
'		opacity:.4!important;'+
'		position:fixed!important;'+
'		top:0px!important;'+
'		left:0px!important;'+
'		width:100%!important;'+
'		height:100%!important;'+
'	}'+
'	.sr_skipp_jnl_fundo{'+
'		z-index:99999!important;'+
'		position:fixed!important;'+
'		top:50%!important;'+
'		left:50%!important;'+
'		margin:-70px -320px!important;'+
'		width:640px!important;'+
'		height:180px!important;'+
'		background:'+sr_sty_corbg2+'!important;'+
'		color:'+sr_sty_corfnt1+'!important;'+
'		-moz-border-radius:10px!important;'+
'		border-radius:10px!important;'+
'		padding-left:10px!important;'+
'		font-family:"trebuchet ms",Verdana,Arial,Helvetica,sans-serif,serif!important;'+
'	}'+
'	.sr_skipp_jnl_fundo_titulo{'+
'		padding-top:10px!important;'+
'		padding-bottom:10px!important;'+
'	}'+
'	.peq{font-size:8pt!important;}'+
'	.sr_skipp_jnl_conteudo_fundo a{'+
'		text-decoration:none!important;'+
'		color:'+sr_sty_corfnt2+'!important;'+
'}'+
'	.sr_skipp_jnl_conteudo_fundo td{'+
'		padding:15px!important;'+
'		padding-top:18px!important;'+
'	}'+
'	.sr_skipp_jnl_conteudo_fundo{'+
'		background:'+sr_sty_corbg3+'!important;'+
'		color:'+sr_sty_corfnt2+'!important;'+
'		width:620px!important;'+
'		height:120px!important;'+
'		-moz-border-radius:10px!important;'+
'		border-radius:10px!important;'+
'		padding-left:10px!important;'+
'		text-align:left!important!important;'+
'		padding:0!important;'+
'		font-size:15px!important;'+
'}'+
'	#btFecha_skipp:hover{'+
'		background:red!important;'+
'	}'+
'	#btFecha_skipp{'+
'		border:1px solid white!important;'+
'		background:transparent!important;'+
'		color:white!important;'+
'		width:20px!important;'+
'		height:20px!important;'+
'		-moz-border-radius:5px!important;'+
'		border-radius:5px!important;'+
'		padding:0!important;'+
'		font-size:12px!important;'+
'	}';
	d.body.appendChild(css);
vartemp=d.createElement('div');
	vartemp.setAttribute('id','sr_jnl');
	if(urlatual.length>55){urlatual2=urlatual.substr(0,55)+"...";}else{urlatual2=urlatual;}
	if(novourl.length>50){novourl2=novourl.substr(0,50)+"...";}else{novourl2=novourl;}
	vartemp.innerHTML=''+
'<div class="sr_skipp_fundo_pg" id="sr_skipp_fundo_pg"> </div>'+
'<div class="sr_skipp_jnl_fundo" id="sr_skipp_jnl_fundo">'+
'	<div class="sr_skipp_jnl_fundo_titulo">'+
'		<div style="text-align:left;width:180px;float:left;">Skipp Redirect '+vver+'</div><div style="float:right;width:auto;"><input type="button" value="x" id="btFecha_skipp" onclick="fechajnlskipp(\'sr_skipp_jnl_fundo,sr_skipp_fundo_pg\')"/></div><div style="clear:both"></div>'+
'	</div>'+
'	<div class="sr_skipp_jnl_conteudo_fundo">'+
'		<table>'+
'			<tr>'+
'				<td>'+
'					Antes: '+
'					<a href="'+urlatual+'" title="'+urlatual+'" onmouseover="this.className=\'peq\'; this.innerHTML=\''+urlatual+'\'" onMouseout="this.className=\'\'; this.innerHTML=\''+urlatual2+'\'">'+urlatual2+'</a>'+
'				</td>'+
'			</tr>'+
'			<tr>'+
'				<td>Depois: '+
'				<a target="_top" href="'+novourl+'" title="'+novourl+'"  onmouseover="this.className=\'peq\'; this.innerHTML=\''+novourl+'\'" onMouseout="this.className=\'\'; this.innerHTML=\''+novourl2+'\'">'+novourl2+'</a><input type="hidden" id="srNovoLink" onclick="location.href=\''+novourl2+'\';"/></td>'+
'			</tr>'+
'		</table>'+
'	</div>'+
'</div>';
	d.body.appendChild(vartemp);
		var nObj=d.createElement("script");
	nObj.setAttribute("id","sr_jnl_scr_menu");
	d.body.appendChild(nObj);
	nObj.innerHTML=''+
'function id(id){return document.getElementById(id)}'+
'function del(e) {if(e){return e.parentNode.removeChild(e);}}'+
'function fechajnlskipp(jnls){'+
'var jnls=jnls.split(",");'+
'for(x=0;x<jnls.length;x++){'+
'	del(id(jnls[x]));'+
'}'+
'}';
}
}


//inicio do decodeHex por http://ostermiller.org/calc/encode.html //
var hexv = {"00":0,"01":1,"02":2,"03":3,"04":4,"05":5,"06":6,"07":7,"08":8,"09":9,"0A":10,"0B":11,"0C":12,"0D":13,"0E":14,"0F":15,"10":16,"11":17,"12":18,"13":19,"14":20,"15":21,"16":22,"17":23,"18":24,"19":25,"1A":26,"1B":27,"1C":28,"1D":29,"1E":30,"1F":31,  "20":32,"21":33,"22":34,"23":35,"24":36,"25":37,"26":38,"27":39,"28":40,"29":41,"2A":42,"2B":43,"2C":44,"2D":45,"2E":46,"2F":47,  "30":48,"31":49,"32":50,"33":51,"34":52,"35":53,"36":54,"37":55,"38":56,"39":57,"3A":58,"3B":59,"3C":60,"3D":61,"3E":62,"3F":63,  "40":64,"41":65,"42":66,"43":67,"44":68,"45":69,"46":70,"47":71,"48":72,"49":73,"4A":74,"4B":75,"4C":76,"4D":77,"4E":78,"4F":79,  "50":80,"51":81,"52":82,"53":83,"54":84,"55":85,"56":86,"57":87,"58":88,"59":89,"5A":90,"5B":91,"5C":92,"5D":93,"5E":94,"5F":95,  "60":96,"61":97,"62":98,"63":99,"64":100,"65":101,"66":102,"67":103,"68":104,"69":105,"6A":106,"6B":107,"6C":108,"6D":109,"6E":110,"6F":111,  "70":112,"71":113,"72":114,"73":115,"74":116,"75":117,"76":118,"77":119,"78":120,"79":121,"7A":122,"7B":123,"7C":124,"7D":125,"7E":126,"7F":127,  "80":128,"81":129,"82":130,"83":131,"84":132,"85":133,"86":134,"87":135,"88":136,"89":137,"8A":138,"8B":139,"8C":140,"8D":141,"8E":142,"8F":143,  "90":144,"91":145,"92":146,"93":147,"94":148,"95":149,"96":150,"97":151,"98":152,"99":153,"9A":154,"9B":155,"9C":156,"9D":157,"9E":158,"9F":159,  "A0":160,"A1":161,"A2":162,"A3":163,"A4":164,"A5":165,"A6":166,"A7":167,"A8":168,"A9":169,"AA":170,"AB":171,"AC":172,"AD":173,"AE":174,"AF":175,  "B0":176,"B1":177,"B2":178,"B3":179,"B4":180,"B5":181,"B6":182,"B7":183,"B8":184,"B9":185,"BA":186,"BB":187,"BC":188,"BD":189,"BE":190,"BF":191,"C0":192,"C1":193,"C2":194,"C3":195,"C4":196,"C5":197,"C6":198,"C7":199,"C8":200,"C9":201,"CA":202,"CB":203,"CC":204,"CD":205,"CE":206,"CF":207,"D0":208,"D1":209,"D2":210,"D3":211,"D4":212,"D5":213,"D6":214,"D7":215,"D8":216,"D9":217,"DA":218,"DB":219,"DC":220,"DD":221,"DE":222,"DF":223,"E0":224,"E1":225,"E2":226,"E3":227,"E4":228,"E5":229,"E6":230,"E7":231,"E8":232,"E9":233,"EA":234,"EB":235,"EC":236,"ED":237,"EE":238,"EF":239,"F0":240,"F1":241,"F2":242,"F3":243,"F4":244,"F5":245,"F6":246,"F7":247,"F8":248,"F9":249,"FA":250,"FB":251,"FC":252,"FD":253,"FE":254,"FF":255};
function decodeHex(str){if(str){str = str.toUpperCase().replace(new RegExp("s/[^0-9A-Z]//g"));var result = "";var nextchar = "";for (var i=0; i<str.length; i++){nextchar += str.charAt(i);if (nextchar.length == 2){result += ntos(hexv[nextchar]);nextchar = "";}}return result;}}

function decodeFromHex(str){var r="";var e=str.length;var s;while(e>=1){s=e-3;r=String.fromCharCode("0x"+str.substring(s,e))+r;e=s;}return r;}
//fim do decodeHex por http://ostermiller.org/calc/encode.html //

//inicio da calculadora de Base64 por http://ostermiller.org/calc/encode.html//
var END_OF_INPUT = -1;var base64Chars = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/');
var reverseBase64Chars = new Array();for (var i=0; i < base64Chars.length; i++){reverseBase64Chars[base64Chars[i]] = i;}
var base64Str;var base64Count;function setBase64Str(str){base64Str = str;base64Count = 0;}
function readBase64(){if (!base64Str) return END_OF_INPUT;if (base64Count >= base64Str.length) return END_OF_INPUT;var c = base64Str.charCodeAt(base64Count) & 0xff;base64Count++;return c;}
function readReverseBase64(){ if (!base64Str) return END_OF_INPUT;while (true){ if (base64Count >= base64Str.length) return END_OF_INPUT;var nextCharacter = base64Str.charAt(base64Count);base64Count++;if (reverseBase64Chars[nextCharacter]){return reverseBase64Chars[nextCharacter];}if (nextCharacter == 'A') return 0;}return END_OF_INPUT;}
function ntos(n){if(n){n=n.toString(16);if (n.length == 1) n="0"+n;n="%"+n;return unescape(n);}}
function decodeBase64(str){setBase64Str(str);var result = "";var inBuffer = new Array(4);var done = false;while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT){
inBuffer[2] = readReverseBase64();inBuffer[3] = readReverseBase64();result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));if (inBuffer[2] != END_OF_INPUT){result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));if (inBuffer[3] != END_OF_INPUT){result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));} else {done = true;}} else {done = true;}}return result;}
//inicio da calculadora de Base64 por http://ostermiller.org/calc/encode.html//

function decode(i){
if(i){
	var i=i.replace("6hnyh35yd3","").replace(".url","").replace("ABC123CBA","").replace("=lru?","").replace("?url=","");
	
	var url=[i, inverte(i), decodeBase64(decodeHex(i)), decodeHex(i), decodeHex(decodeBase64(decodeHex(i))),  decodeHex(inverte(i)), decodeBase64(decodeBase64(i)), decodeBase64(i), decodeBase64(inverte(i))];
	
	for(x=0;x<url.length;x++){
		if(novourl=getHost(url[x])){
			return novourl;
			break;
		}
	}	
}
}

//Inicio do Modulo Principal
function moduloPrincipal(){
for(x=0;x<protetores.length;x++){	
	if(escape(urlatual).match(escape(protetores[x]))!=null){
		for(y=0;y<divisores.length;y++){
			var divisor=new RegExp(escape(divisores[y]));
			if(escape(urlatual).match(divisor)!=null){
				var url=urlatual.split(divisores[y]);
				if(url.length>1){
					novourl="";
					for(zz=1;zz<url.length;zz++){
						if(zz<url.length-1){
							novourl+=url[zz]+divisores[y];
						}else{
							novourl+=url[zz];
						}
					}					
				}else{
					novourl=url[1];
				}
				if(novourl=decode(novourl)){
					janela();
					vai(novourl);					
				}
				break;
			}
		}
		break;
	}
}
}
//Fim do Modulo Principal

//inicio do modulo para lnk.co e semelhantes
function moduloLnkco(){
var lnks="tinylinks.co|lnk.co|linkbucks.com|allanalpass.com|baberepublic.com|blahetc.com|linkgalleries.net|linkseer.net|picturesetc.net|qvvo.com|realfiles.net|seriousfiles.com|seriousurls.com|thesefiles.com|thatsprime.com|thesegalleries.com|thosegalleries.com|tinybucks.net|uberpicz.com|ubervidz.com|ubucks.net|urlpulse.net|viraldatabase.com|youfap.com|zxxo.net".split("|");
for(x=0;x<lnks.length;x++){
	if(urlatual.match(escape(lnks[x]))!=null){
		if(id("urlholder")){
			novourl=id("urlholder").value;
		}else{
			var scr=tag("script");
			for(y=0;y<scr.length;y++){
				var scr2=scr[y].innerHTML;
				if(scr2.match("TargetUrl = '")!=null){
					novourl=scr2.split("TargetUrl = '")[1].split("';")[0];
					break;
				}
			}
		}
		janela();
		vai(novourl);
		break;
	}
}
}
//fim do modulo para lnk.co e semelhantes

/*inicio modulo para redirecionadores com link dentro de elementos com id LINK*/
vartemp='http://www.pqueno.com|http://download.musicas.us/|http://www.protetorlink.com/|http://www.cpdownloads.net|http://download.musicasfree.net/|http://downloadosfilmes.com/down|http://osfilmes.com/arquivo/protetor.php?url=|http://www.promocoesdeprodutos.com/url/index.php?link=|http://ycorp.me|http://www.protetorlink.com/|http://www.serverextremo.com/link/count/|http://downloadsedicas.com.br/gamesmax/?|http://baixarcdsmp3.net/links/?|http://www.promocoesdeprodutos.com/cyber/index.php?link=|http://cinemaemcasa.us/link|http://www.protetorlink.com/'.split("|");
for(x=0;x<vartemp.length;x++){
	if(urlsub(0,vartemp[x].length)==vartemp[x]){
		if(id('link')){
			novourl=id('link').getElementsByTagName('a')[0].href;
			novourl2=novourl.split("www.")[2];if(novourl2!=undefined){novourl=novourl2}
			
			if(novourl==(urlatual+"#")){
				novourl=id('link').getElementsByTagName('a')[0];
				if((novourl2=novourl.getAttribute("onMousedown")).match("location") ||
				   (novourl2=novourl.getAttribute("onClick")).match("location")){
						novourl=novourl2.split("'")[1].split("'")[0]}
				}
			if(novourl.substr(0,7)!="http://"){novourl='http://'+novourl;}
			janela();
			top.location.href=novourl;
		}
		break;
	}
}

vartemp=new Array();
	vartemp[0]="http://baixarcdsmp3.net/links/?down";
	vartemp[1]="/gamesmax/?down";
for(x=0;x<vartemp.length;x++){
	if(urlatual.indexOf(vartemp[x])!=-1){
		vartemp=d.getElementsByTagName('frame')[1];
		if(vartemp){
			novourl=vartemp.src;
			janela();
			vai(novourl);
		}
		break;
	}
}
/*fim modulo para redirecionadores com link dentro de elementos com id LINK*/

//inicio do modulo para link-protegido.com
function moduloLinkProtegidoDotCom(){
	if(escape(urlatual).match(escape('http://www.link-protegido.com/'))!=null){
		if(escape(urlatual).match(escape('?link='))!=null){
			novourl="";
			janela();
			location.href="javascript:"+
				'function skipp(){if(d=document.getElementById("lnk")){location.href=d.value;}else{$.ajax({type: "GET",url: "trocas.php",data: "link="+$("#pdifr").val()+"&login="+$("#login").val()+"&senha="+$("#senha").val(),success: function(dados){location.href=dados;}});}};setTimeout("skipp()",2000);'+
				'void(0);';
		}
	}
}
//fim do modulo para link-protegido.com

//inicio do modulo para adf.ly
function moduloAdfly(){
	if(escape(urlatual).match(escape("http://adf.ly"))!=null){
		for(x=0;x<tag("script").length;x++){
			if(novourl=tag("script")[x].innerHTML.split("var url = '")[1]){
				novourl=novourl.split("';")[0];
				break;
			}
		}
		
		if(novourl){
			janela();vai(novourl);
		}
	}
}
//fim do modulo para adf.ly

function moduloLinkproteger(){
	if(escape(urlatual).match(escape("http://www.linkproteger.com/?"))!=null){
		novourl=id("divDLStart").getElementsByTagName("a")[0].href;
		janela();
		vai(novourl);
	}
}


//inicio do modulo para TelecineGratis
function moduloTelecineGratis(){
	if(escape(urlatual).match(escape("http://www.telecinegratis.com/filmes/protetor/"))!=null){
		location.href="javascript:timer=true;verify();void(0);";
		novourl="Redirecionando...";
		janela();
	}
}
//fim do modulo para TelecineGratis

//inicio do modulo para http://www.vinxp.com/download/webfiles/?t=
	if(escape(urlatual).match(escape("http://www.vinxp.com/download"))!=null){
		novourl="Redirecionando...";
		janela();
		location.href="javascript:location.href=_TOKNF;void(0);";
	}
//fim do modulo para http://www.vinxp.com/download/webfiles/?t=

//Inicio do modulo para http://www.nixlove.com/protetor/en/
	if(escape(urlatual).match(escape("http://www.nixlove.com/protetor"))!=null || escape(urlatual).match(escape("http://www.cdsdownload.org/protetor/"))!=null){
		novourl="Redirecionando...";
		janela();
		location.href="javascript:si=setInterval("+
		"function(){"+
		"	if(_0xe7b9){"+
		"		novourl=base64_decode(_0xe7b9[16]).replace('http:/','');"+
		"		if(novourl.match('http://')==null){novourl='http://'+novourl;};"+
		"		location.href=novourl;"+
		"		clearInterval(si);"+
		"	};"+
		"},1000);void(0);";
	}
//Fim do modulo para http://www.nixlove.com/protetor/en/

/*inicio do modulo para linkproteger.com v0.1*/
vartemp='http://www.linkproteger.com/?';
if(urlsub(0,vartemp.length)==vartemp){
	novourl=urls[1].href;
	janela();
	vai(novourl);
}
/*fim do modulo para linkproteger.com*/

/*inicio do modulo para linkpago.com v0.2*/
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
	janela();
}
/*fim do modulo para linkpago.com*/

/*inicio do modulo para filmeseserieshd.com v0.1*/
vartemp='http://filmeseserieshd.com/fs/protetor.php?link=';
if(urlsub(0,vartemp.length)==vartemp){
	novourl=id('mg').value;
	janela();
	vai(novourl);
}

/*fim do modulo para filmeseserieshd.com*/

/* inicio do modulo para protelink.info v0.1 */
vartemp='http://protelink.info';
if(urlsub(0,vartemp.length)==vartemp){
	novourl=d.getElementsByTagName('iframe')[0].src.replace(vartemp+'/link/?url=','');
	janela();
	vai(novourl);
}

if(urlsub(0,vartemp.length)==vartemp){
	novourl=tag("frame")[1].src;
	janela();
	vai(novourl);
}

/* fim do modulo para protelink.info */

/* inicio do modulo para cad.canalmailbrasil.com.br */
vartemp='http://cad.canalmailbrasil.com.br';
if(urlsub(0,vartemp.length)==vartemp){
	var dd=d.getElementsByTagName('div')
	for(x=0;x<dd.length;x++){
		if(dd[x].className=='downloaddireto'){
			novourl=dd[x].getElementsByTagName('a')[0];
			janela();
			vai(novourl);
			break;
		}
	}
}
// fim do modulo para cad.canalmailbrasil.com.br

/*inicio do modulo para http://www.link-protegido.com/semprefilmesv2/?link=*/
vartemp='http://www.link-protegido.com/semprefilmesv2/?link=';
if(urlsub(0,vartemp.length)==vartemp){
location.href='javascript:function vai(){$.ajax({type: "GET",url: "trocas.php",data: "link="+$("#pdifr").val()+"&login="+$("#login").val()+"&senha="+$("#senha").val(),success: function(dados){location.href=dados;}});clearInterval(si);};si=setInterval("vai()",500);void(0); ';
}
//
/*fim do modulo para http://www.link-protegido.com/semprefilmesv2/?link=*/

//inicio do modulo para download.vipdownload.com.br & downloadfilmes.biz
vartemp='http://download.vipdownload.com.br|http://downloadfilmes.biz|http://protetor.newmizty.com'.split("|");
http://protetor.newmizty.com/musicas/linkdiscover.php?cod=1390
for(x=0;x<vartemp.length;x++){
if(urlsub(0,vartemp[x].length)==vartemp[x]){
	if(tag("script")[1]){
		if(!(novourl=tag("script")[1].innerHTML.split('trocaBotao(')[1])){
			novourl=tag("script")[2].innerHTML.split('trocaBotao(')[1];
		}
		novourl=novourl.split(',')[0];
		novourl=vartemp[x]+'/linkdiscover.php?cod='+novourl;
		janela();
		vai(novourl);
	}
	if(urlatual.substr(0,(vartemp[x]+"/linkdiscover.php?cod=").length)==(vartemp[x]+"/linkdiscover.php?cod=")){
		novourl=d.body.innerHTML;
		if(novourl.substr(0,7)!="http://"){novourl="http://"+novourl;}
		janela();
		vai(novourl);
	}
}
}
//fim do modulo para download.vipdownload.com.br & downloadfilmes.biz

//Inicio do modulo para lix.in
vartemp='http://lix.in/';
if(urlsub(0,vartemp.length)==vartemp){
	dd=d.getElementsByTagName('form')[0];
	var cpt=d.getElementsByName('capt')[0];
	if(!cpt){
		if(dd){
			dd.submit();
			novourl=vartemp
			janela();
		}
	}
}
//fim do modulo para lix.in/

//inicio do modulo para http://www.baixarjogodscompletos.infor
vartemp=new Array();
	vartemp[0]="http://www.baixarjogoscompletos.info/protetor/en/?url=";
	vartemp[1]="http://www.programasdanet.info/protetor/en/?url=";
for(x=0;x<vartemp.length;x++){	
	if(urlsub(0,vartemp[x].length)==vartemp[x]){
		location.href="javascript:heynow()";
	}
}
//fim do modulo para http://www.baixarjogodscompletos.infor

//inicio modulo para oprotetor.com //
vartemp=new Array();
vartemp[0]="oprotetor.com";
if(urlatual.split(".")[1]){
if(urlatual.split(".")[1].split("/")[0]=="oprotetor"){
	novourl=decodeBase64(urlatual.split("=")[1]);
	if(novourl.substr(0,"http://".length)!="http://"){novourl=decodeBase64(novourl);}
	janela();
vai(novourl);
}
}
//fim do modulo para oprotetor.com//

//inicio modulo para rsprotect.com//
vartemp="http://www.rsprotect.com/";
if(urlsub(0,vartemp.length)==vartemp){
	novourl=document.getElementsByTagName("form")[0].action;
	janela();
	vai(novourl);
}
//fim  modulo para rsprotect.com//

//inicio do modulo para *.co.cc/files/
vartemp="http://wmbuploading.co.cc/files/|http://mediaflyfile.co.cc/files/|http://www.centrodedownload.com|http://rapidmblink.co.cc/files/|http://easymbfile.co.cc/files/|http://uploadingserv.co.cc/files/|http://bestmaker.co.cc/files/|http://factoryfile.co.cc/?|http://fastfiledb.co.cc/?|http://megafastfile.co.cc/?|http://smoothfile.co.cc/?|http://hotfilemaker.co.cc/files/|http://megambserv.co.cc/files/|http://indexmakers.co.cc/?|http://indextrader.co.cc/?|http://mediadbfile.co.cc/?|http://fileshields.co.cc/?|http://bulletfile.co.cc/?|http://megamblink.co.cc/files/|http://ppsharing.co.cc/files/|http://hotmblink.co.cc/files/|http://filembfonies.co.cc/files/|http://mediambfile.co.cc/files/|http://easymbfile.co.cc/files/|http://fileforex.co.cc/files/|http://mediafastfile.co.cc/?|http://fastfileserv.co.cc/?".split("|");

for(x=0;x<vartemp.length;x++){
	if(urlsub(0,vartemp[x].length)==vartemp[x]){
		n="";		
		for(y=0;y<urls.length;y++){
			if(getHost(urls[y].href)!=undefined){
				novourl=getHost(urls[y].href);
				janela();
				vai(novourl);
				break;
			}
		}
		break;
	}
}
//fim do modulo para http://megamblink.co.cc/files/
//inicio do modulo para http://furiagames360.org/protetor/?
function moduloFuriagame360(){
	if(escape(urlatual).match(escape("http://furiagames360.org/"))!=null){
		novourl=urlatual.split("1=")[1];
		novourl=decodeHex(decodeBase64(decodeHex(novourl)));
		janela();
		vai(novourl);
	}
}
//fim do modulo para http://furiagames360.org/protetor/?

if(escape(urlatual).match(escape("http://zpag.es/"))!=null){
	if(urlatual.match("cap")!=null){location.href=urlatual.replace("cap/","");}
		for(x=0;x<tag("script").length;x++){
			if(novourl=tag("script")[x].innerHTML.split('window.location = "http://')[1]){
				novourl=novourl.split('";')[0];
				break;
			}
		}
		janela();
		vai(novourl);
}

if(escape(urlatual).match(escape("listenmusicgospel.com"))!=null){
	novourl=urlatual.split("?u=")[1];
	novourl=decodeBase64(decodeBase64(decodeBase64(novourl)));
	janela();
	vai(novourl);
}


if(escape(urlatual).match(escape("reidodownload.net"))!=null || escape(urlatual).match(escape("pegaki.com"))!=null){
	novourl=urlatual.split("?id=")[1];
	novourl=decodeBase64(decodeBase64(novourl));
	janela();
	vai(novourl);
}

if(escape(urlatual).match(escape("http://www.assistirfilmesonline.net/pub-"))!=null){
	for(x=0;x<urls.length;x++){
		if(urls[x].href.match("filme-")!=null && urls[x].className=="menuu"){
		novourl=urls[x].href;
		janela();
		vai(novourl);
		break;
		}
	}
}

if(escape(urlatual).match(escape("http://www.sitesmundo.net/down/link/index1.php?location="))!=null){
	novourl=location.href.replace("index1.php?location=","index2.php?link=");
	janela();
	vai(novourl);
}

if(escape(urlatual).match(escape("protetor.downloadcdsgratis.com"))!=null){
	novourl=unsafeWindow.pg();
	janela();
	vai(novourl);
}

if(escape(urlatual).match(escape("sitesmundo.net/down/rb/index2.php?url="))!=null || escape(urlatual).match(escape("mundodownload.com.br/protetor/index2.php?url="))!=null){
	novourl=location.href.replace("index2.php?url=","index3.php?link=");
	janela();
	vai(novourl);
}
//http://www.sitesmundo.net/baixar/linkBV/index1.php?location=
if(escape(urlatual).match(escape("sitesmundo.net/baixar/linkBV/index1.php?location="))!=null ||
escape(urlatual).match(escape("teladesucesso.net/Download/index1.php?location="))!=null || escape(urlatual).match(escape("coberturabrasfoot.net/baixar/protetor/index1.php?location="))!=null || escape(urlatual).match(escape("sitesmundo.net/baixar/linkNB/index1.php?location="))!=null || escape(urlatual).match(escape("sitesmundo.net/baixar/link2/index1.php?location="))!=null || escape(urlatual).match(escape("sitesmundo.net/down/link2/index1.php?location="))!=null || escape(urlatual).match(escape("coberturabf.net/down/link/index1.php?location="))!=null || escape(urlatual).match(escape("nacaobrasfoot.net/down/link/index1.php?location="))!=null){
	novourl=location.href.replace("index1.php?location=","index2.php?link=");
	janela();
	vai(novourl);
}

if(escape(urlatual).match(escape("maxanimes.com.br/download.php?id="))!=null){
	novourl=urls[urls.length-1].href;
	janela();
	vai(novourl);
}

if(escape(urlatual).match(escape("protetorlink.com"))!=null){
	for(x=0;x<urls.length;x++){
		if(novourl=getHost(urls[x])){
			vai(novourl);
			janela();
			break;
		}
	}
}

if(escape(urlatual).match(escape("mega-ps3.com/download/"))!=null){
	for(x=0;x<urls.length;x++){
		if(novourl=getHost(urls[x].href)){
			janela();
			vai(novourl);
			break;
		}
	}
}


if(escape(urlatual).match(escape("lockurl.org"))!=null){
	for(x=0;x<tag("script").length;x++){
		if(scr=tag("script")[x].innerHTML.split("getElementById('linkk0').href=\"")[1]){
			novourl=scr.split('";')[0];
			janela();
			vai(novourl);
			break;
		}
	}
}

if(escape(urlatual).match(escape("nov.io"))!=null){
	for(x=0;x<tag("script").length;x++){
		if(scr=tag("script")[x].innerHTML.split("top.location.href = '")[1]){
			novourl=scr.split("';")[0];
			janela();
			vai(novourl);
			break;
		}
	}
}


if(urlatual.match("da.feedsportal.com")!=null){
//script original Remove Feedsportal Ads(http://userscripts.org/scripts/review/59289)
(function(){
    links = document.evaluate("//div[@align='right']/p/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (links.snapshotLength > 0) {
        element = links.snapshotItem(0);
        window.location.href = element;
    }    
})();
}


if(urlatual.match("emurama.com")!=null){
	metas=tag("meta");
	for(x=0;x<metas.length;x++){
		if(novourl=metas[x].getAttribute("content").split("url=")[1]){
			novourl=novourl.split("\"")[0];
			janela();
			vai(novourl);
		}
	}
}

 if(urlatual.match("diretonocelular.com/b/")!=null){
	for(x=1;x<urls.length;x++){
		if(novourl=getHost(urls[x])){
			janela();
			vai(novourl);
			break;
		}
	}
}

vartemp="ilhadosjogos.com.br|romsparagba.com|romsup.com".split("|");
for(x=0;x<vartemp.length;x++){
	if(escape(urlatual).match(escape(vartemp[x]))!=null){
		if(novourl=urlatual.split("/?")[1]){
			novourl=decodeBase64(decodeBase64(novourl).split("li|")[1]);
			janela();
			vai(novourl);			
		}
		break;
	}
}

if(urlatual.match("anonym.to")!=null){
	if(novourl=getHost(decode(urlatual.split("/?")[1]))){
		janela();
		vai(novourl);
	}
}

if(urlatual.match("geleiafilmes.com")!=null){
	for(x=0;x<tag("script").length;x++){
		if(novourl=tag("script")[x].innerHTML.split('window.location.href="')[1]){
			novourl=novourl.split('"')[0];
			janela();
			vai(novourl);
			break;
		}
	}
}

if(urlatual.match("downloadnocelular.com")!=null){
	for(x=0;x<tag("a").length;x++){
		if(novourl=getHost(tag("a")[x].href)){
			janela();
			vai(novourl);
			break;
		}
	}
}

if(urlatual.match("lienscash.com")!=null){
	if(novourl=d.body.innerHTML.split('<a class="redirect" href="')[1].split('"')[0]){
		janela();
		vai(novourl);
	}
}

/*Inicia modulos do skippRedirect*/
moduloPrincipal();//modulo principal para burlar a maioria dos protetores
moduloLnkco();//modulo para lnk.co e semelhantes
moduloLinkProtegidoDotCom();//modulo para link-protegido.com
moduloAdfly();//modulo para adf.ly
moduloLinkproteger();
moduloTelecineGratis();
moduloFuriagame360();