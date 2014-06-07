// ==UserScript==
// @name           journaldu geek/gamer/mac/graphic
// @author         86245
// @version        0.02
// @include        http://www.journaldugeek.com/*
// @include        http://www.journaldugamer.com/*
// @include        http://www.journaldumac.com/*
// @include        http://www.journalgraphic.com/*
// ==/UserScript==

//Paramètre réglable par l'utilisateur\\
//ces option sont masque car cela nuit au financement publicitaire du site, ou que lees option activable ne sont pas très utiles.
//mais si vous savez regarder ici, il est probable que vous sachiez également retirer les publicité :)
//rempacer false par true pour activé
var detruirePub=true; //suprime les cadres de pub.
var masqueFormForum=false; // pour aficher le formulaire pour créé un nouveau topic ou répondre au un topic pré éxistant, cliquer sur "Ajouter un nouveau sujet dans ce forum" ou sur "Ecrire une réponse" pour aficher le formulaire.


//enpecher le rechargement de la video
var degRougeOrange='#FF1F1F #FF2F1F #FF3F1F #FF4F1F #FF5F1F transparent transparent transparent transparent#FF6F1F #FF7F1F #FF8F1F #FF9F1F';
var css='object{pointer-events:none;}'+
'object embed{margin:0 auto !important;}'+
'#prevImg{position: fixed;top:0;right:0;display:block;cursor:-moz-zoom-out;}'+
'.gallery-item img{cursor:-moz-zoom-in;}'+
'#prevImg img:hover{opacity:0.8;}'+
'#prevImg:hover{background:black;}'+
'img[class~=pointeRe]{border-color:#4F4F4F !important;cursor:-moz-zoom-out;outline:2px solid black;}'+
'#masqueMiseJour{display:block;z-index:1000;width:100%;height:100%;position:fixed;background:black;opacity:0.9;top:0;left:0;}'+
'#cadreMiseJour{display:block;z-index:1001;width:400px;height:200px;position:fixed;margin-left:36%;background:#D7D7D7;text-align:center;top:'+parseInt(window.innerHeight/2-100)+'px;-moz-border-radius-bottomleft:54px 120px;-moz-border-radius-bottomright:54px 120px;-moz-border-radius-topleft:58px 41px;-moz-border-radius-topright:58px 41px;border:solid;border-width:6px 16px 1px 16px;-moz-border-left-colors:'+degRougeOrange+';-moz-border-top-colors:'+degRougeOrange+';-moz-border-right-colors:'+degRougeOrange+';-moz-border-bottom-colors:'+degRougeOrange+';-moz-background-clip:padding;}'+
'#titeMise{text-align:center;font:2em bolder;margin: 0 0 32px 0;color:#306F7F;}'+
'.floatR{margin:0 15px 15px 0;float:right;}'+
'.floatL{margin:0 0 15px 15px;float:left;}'+
'#cop, #licimg{text-align:center;}'+
'#cop{text-align:center;margin:48px 0 0 0;color:black;}'+
'#ajLoder{-moz-border-radius:30px;-moz-box-shadow:0 0 60px 15px rgba(255, 255, 255, 0.5);background-color:rgba(255, 255, 255, 0.33);position:absolute;height:60px;right:30px;top:30px;z-index:-1;}'+
'.MasqueForumForu{cursor:pointer;}'+
'.MasqueForumForu:hover{color#E88BB9;background-color:#CCCCCC;}'+
'.MasqueForumForu + *{display:none;}';
GM_addStyle(css)

//fonction activable
//pub
if (detruirePub)destroy('div[class$=add],#topic-tags');

//masuqeformulaire forum
if (masqueFormForum&&document.querySelector('[class~=post-form]')){
	document.querySelector('[class~=post-form]').addEventListener("click", function (){this.classList.toggle('MasqueForumForu');}, false);
	document.querySelector('[class~=post-form]').classList.add('MasqueForumForu');
}

//fore la video à s'aficher
var video=document.querySelectorAll('object embed')
for (var i=0;i<video.length;i++)if (video[i].height){
	video[i].height=video[i].height++;
	setTimeout("video[i].height=video[i].height--;",500)
	
}



var imag=document.querySelectorAll('.gallery-item img'),cible;
if (imag){//on cre en cadre image
	var im=document.createElement('div');
	im.id='prevImg';
	document.body.appendChild(im)
	prevImg=document.querySelector('#prevImg')
	prevImg.addEventListener('click',depoint,false)
}
for (var i=0;i<imag.length;i++){
	imag[i].setAttribute('onClick','return false;')
	imag[i].addEventListener("click", function (){remplaceImg(/(.*)-\d+x\d+\.\w{3,4}$/.exec(this.src)[1],this);}, false);
}
var foremaImg=['.jpg','.JPG','.jpeg','.JPEG','.png','.PNG']
function remplaceImg (srIMag,pointer){
	if (prevImg.getAttribute('im')!=srIMag){
		depoint();
		im=new Image;
		im.src='/wp-content/themes/geek/js/class.popshow/images/ajax-loader.gif';
		im.id='ajLoder';
		prevImg.appendChild(im);
		for(var i=0;i<foremaImg.length;i++){
			im=new Image;
			im.src=srIMag+foremaImg[i];
			im.className="imageDuCoin";
			prevImg.appendChild(im);
		}
		prevImg.setAttribute('im',srIMag);
		pointer.classList.add('pointeRe');
	}
	else depoint();
}

function depoint(){
	if (document.querySelector('.pointeRe')){
		prevImg.innerHTML='';
		prevImg.setAttribute('im','');
		document.querySelector('.pointeRe').classList.remove('pointeRe');
	}
}

if (((new Date().getTime() - GM_getValue('checked', 0) >= 86400000)||GM_getValue('vresPass', false))&&GM_getValue('chexMiseJour', true)){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/70846.meta.js',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
		},
		onload: function(responseDetails) {
			var vertion=/@version\s+(\d+\.\d+)/i.exec(responseDetails.responseText)
			if (parseFloat(vertion[1])>0.02){//vertion du script actuel
				var masqueMiseJour=document.createElement('div');
				masqueMiseJour.id='masqueMiseJour';
				document.body.appendChild(masqueMiseJour)
				var cadreMiseJour=document.createElement('div');
				cadreMiseJour.id='cadreMiseJour';
				cadreMiseJour.innerHTML='<p id="titeMise" class="noSelect">Mise à jour '+vertion[1]+' disponible</p><input type="button" id="instaleNow" value="Installer maintenant" class="floatL"><input type="button" id="pageScript" value="Afficher la page du script" class="floatR"><input type="button" id="instaleLatter" value="Me le rapeller plus tard" class="floatL"><input type="button" id="instaleNever" value="Ne plus jamais me le rapeller" class="floatR"><br/><br/><p id="cop" class="noSelect">Script Journal du geek/gamer/mac/graphic conçu par 86245 sous licence Creative Commons.</p><img id="licimg" alt="licence Creative Commons Paternité-Pas d\'Utilisation Commerciale 2.0 France" src="http://i.creativecommons.org/l/by-nc/2.0/fr/88x31.png">'
				document.body.appendChild(cadreMiseJour)
				document.querySelector('#instaleNow').addEventListener("click", function (){finMiseJour();GM_setValue('vresPass', false);window.location='http://userscripts.org/scripts/source/70846.user.js';}, false);
				document.querySelector('#pageScript').addEventListener("click", function (){finMiseJour();window.open('http://userscripts.org/scripts/show/70846','miseJour');}, false);
				document.querySelector('#instaleLatter').addEventListener("click", function (){finMiseJour();GM_setValue('vresPass', true);}, false);
				document.querySelector('#instaleNever').addEventListener("click", function (){finMiseJour();GM_setValue('chexMiseJour', false);}, false);
			}
			else {
				GM_setValue('vresPass', false)
				GM_setValue('checked', new Date().getTime() + '')
			}
		}
	});
}

function finMiseJour(){
	destroy('#cadreMiseJour,#masqueMiseJour');
}
function destroy (){
	for (var i=0;i<arguments.length;i++){
		var arrayNod=document.querySelectorAll(arguments[i]);
		for (var b=0;b<arrayNod.length;b++){
			if (arrayNod[b].parentNode)arrayNod[b].parentNode.removeChild(arrayNod[b]);
			else arrayNod[b].style.display='none';
		}
	}
		
}
