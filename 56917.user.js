// ==UserScript==
// @name           Topic préféré
// @namespace      JVC
// @include        http://www.jeuxvideo.com/forums/*
// @copyright	   All rights are not reserved
// @version 	   1.0
// ==/UserScript==


$ = unsafeWindow.$;

var topics = new Array();

var bide = (window.sessionStorage)? window.sessionStorage : false;
if(bide && bide.getItem('topic_pref')){
	GM_setValue('forum_pref', bide.getItem('topic_pref'));
	bide.removeItem('topic_pref');
}

function extractLien(lien){
	lien = lien.replace(/^http:\/\/www\.jeuxvideo\.com\/forums\/1-([\d-]+)-1-0-1-0.*$/,'$1');
	return lien;
}

function extractSujet(sujet){
	sujet = sujet.replace(/^Sujet : «(.+)»$/, '$1');
	sujet = $.trim(sujet);
	return sujet;
}

function createLien(lien, sujet){
	var li = document.createElement('li');
	var aL = document.createElement('a');
	var aS = document.createElement('a');
	$(aL).attr('href', 'http://www.jeuxvideo.com/forums/1-'+lien+'-1-0-1-0-0.htm')
		 .html(sujet);
	$(aS).attr({
		href: '#',
		title: 'Supprimer le topic « '+sujet+' » de la liste!'})
		.addClass('sup_pref');
	aS.addEventListener('click', function(){
			$(this.parentNode).remove();
			refreshList(lien);
		}, false);
	$(li).append(aL)
		 .append(aS);
		return li;
}

function refreshList(lien){
	lol.nb--;
	if(!lol.nb)
		$('#topic_pre').hide();
	var s = '', x = 0;
	for(var i in topics)
		if(lien == topics[i].lien)
			delete topics[i];
		else{
			s += 'topics['+x+'] = new Lien("'+topics[i].lien+'", unescape("'+escape(topics[i].sujet)+'"));';
			x++;
		}
	GM_setValue('forum_pref', s);
}

function verifLien(lien){
	for(var i = 0; i < topics.length; i++)
		if(topics[i].lien == lien)
			return true
	return false;
}

/*********************************************************************************************************/
function Lien(lien, sujet){
	this.lien = lien;
	this.sujet = sujet;
	this.topic = '';
}
/********************************************************************************************************/
function Topic(){
	if(GM_getValue('forum_pref'))
		eval(GM_getValue('forum_pref'));
	this.nb = topics.length;
	if(this.nb)
		this.init();
}

Topic.prototype.init = function(){
	$('#pub_carre1').before('<div class="bloc3" id="topic_pre"><h3 class="titre_bloc">'
	+'<span id="bloc_forums_img">Mes Topics Préférés</span>'
	+'</h3>'
	+'<div class="bloc_inner">'
	+'<ul id="liste_topic_pref" class="liste_liens"></ul></div></div>');
}

Topic.prototype.show = function(){
	for(var i = 0; i < topics.length; i++)	
		$('#liste_topic_pref').append(createLien(topics[i].lien, topics[i].sujet));	
	return this;
}

Topic.prototype.btAdd = function(){
	var bt = document.createElement('a');
	var bb = this;
	var img = document.createElement('img');
	$(img).attr({
		src: Image,
		alt: 'TP',
		style: 'top: 2px; right: 15px;'		
	});
	$(bt).attr({
		href: '#',
		title: 'Ajouter ce topic à mes topics préférés'
	})
	.append(img);
	bt.addEventListener('click', function(){
		var lien = document.location.toString();
		var sujet = document.getElementsByClassName('sujet')[0];
		sujet = extractSujet($(sujet).text());
		lien = extractLien(lien);
		if(!verifLien(lien)){
			if(!bb.nb)
				bb.init();
			bb.nb++;
			GM_setValue('forum_pref', GM_getValue('forum_pref', '')+' topics['+topics.length+'] = new Lien("'+lien+'", unescape("'+escape(sujet)+'"));');
			$('#liste_topic_pref').append(createLien(lien, sujet));
			topics[topics.length] = new Lien(lien, sujet);
		}
	}, false);
	$('#coeur_ajouter').before(bt);
	return this;
}

Topic.prototype.dragAndDrop = function(){
	var s = '';
	$('#liste_topic_pref').sortable({
		update: function(){
			var lis = document.evaluate('//ul[@id="liste_topic_pref"]/li', document, null, 7, null);
			var tmp = new Array();
			for(i = 0; i < lis.snapshotLength; i++)
				tmp[i] = new Lien(extractLien(lis.snapshotItem(i).getElementsByTagName('a')[0].href.toString()), extractSujet(lis.snapshotItem(i).textContent));
			for(var i = 0; i < tmp.length; i++){
				s += 'topics['+i+'] = new Lien("'+tmp[i].lien+'", unescape("'+escape(tmp[i].sujet)+'"));';
				}
			bide.setItem('topic_pref', s);
		}
	});	
}
/******************************************************************************************************************/		
var Image = 'data:image/gif;base64,R0lGODlhDgARAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/'
+'/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
+'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBm'
+'AABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/'
+'MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNm'
+'ZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/'
+'mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZm'
+'zGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb/'
+'/5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZ'
+'AJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwA'
+'M8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZ'
+'ZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8A'
+'mf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+Z'
+'zP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///yH5BAEAABAALAAAAAAOABEA'
+'AAg0ACEIHEiwoMGDCBMS/KdQ4L+HCh9KRCixosGKGAtitLhwI0SC1DxSo/gx4USTHBuqXIkwIAA7';

lol = new Topic();

lol.show()
	.dragAndDrop();
	
if(window.location.href.match(/http:\/\/www\.jeuxvideo\.com\/forums\/1-.*/))
	lol.btAdd();

GM_addStyle('#liste_topic_pref li:hover { background: url(http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif) no-repeat #F5F5F5; cursor: move; }'
+'#liste_topic_pref li:hover a.sup_pref {'
+'background: transparent url(http://image.jeuxvideo.com/css_img/defaut/bt_forum_supp_pref.png) no-repeat scroll right top;'
+'display: inline;'
+'height: 10px;'
+'float: right;'
+'width: 10px;}'
+'#liste_topic_pref li:hover a.sup_pref:hover{'
+'background-position: right bottom;}');
