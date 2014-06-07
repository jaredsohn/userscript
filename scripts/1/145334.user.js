// ==UserScript==
// @name           Kraland v6 Customizer 1.2
// @namespace      Kralandv6CustomizerByMaesGrowdy
// @description    Ajoute un menu style v5 à gauche, retire le caroussel de la page d'accueil, place les évènements avant les débats sur la page d'accueil, réorganise le forum style v5
// @include        http://www.kraland.org/main.php
// @include        http://www.kraland.org/main.php?p=*    
// ==/UserScript==

function $(id){
	return document.getElementById(id);
}

function $Class(classname, node){
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function $Alt(alt, node){
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + alt + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].alt))a.push(els[i]);
	return a;
}

function $Name(tagname, node){
	if(!node) node = document.getElementsByTagName('body')[0];
	return document.getElementsByTagName(tagname);
}

/*
 * Function hideSliders
 *   Cache le slider de la page principale
 */
function hideSliders(){
	if($Class('slides').length == 0)
		return;
	$Class('slides')[0].style.display = 'none';
	$('slide1c').parentNode.style.display = 'none';
	$Class('slides2')[0].style.marginTop = '-10px';
}

/*
 * Function addMenu
 *   Créé et affiche un menu
 */

function addMenu(){
	var bgArray = new Array();
		bgArray[0] = 'http://www.kramages.org/css/0/newsbox.gif';
		bgArray[1] = 'http://www.kramages.org/css/1/boxnews.gif';
		bgArray[2] = 'http://www.kramages.org/css/2/boxnews.gif';
		bgArray[3] = 'http://www.kramages.org/css/3/boxnews.gif';
		bgArray[4] = 'http://www.kramages.org/css/4/boxnews.gif';
	var lnkColor = new Array();
		lnkColor[0] = 'rgb(185, 40, 45)';
		lnkColor[1] = 'rgb(119, 17, 17)';
		lnkColor[2] = 'rgb(119, 17, 17)';
		lnkColor[3] = 'rgb(119, 17, 17)';
		lnkColor[4] = 'rgb(119, 17, 17)';
	var menu = document.createElement('div');
	menu.className = 'right-newsbox';
		var bg = document.createElement('div');
		bg.className = 'right-newsbox-img';
		bg.style.background = 'url(' + bgArray[$Name('link')[0].href.substr(-10, 1)] + ')';
			var bgHead = document.createElement('div');
			bgHead.className = 'right-box-header';
			bgHead.innerHTML = 'MENU';
		bg.appendChild(bgHead);
			var cont = document.createElement('div');
			cont.className = 'right-box-content';
				var lnk = document.createElement('a');
				lnk.href = 'http://www.kraland.org/main.php?p=1';
				lnk.style.background = 'url(http://www.kramages.org/5/msg_up.gif) no-repeat 0px 2px';
				lnk.style.paddingLeft = '14px';
				lnk.style.display = 'inline-block';
				lnk.style.marginTop = '4px';
				lnk.style.color = lnkColor[$Name('link')[0].href.substr(-10, 1)];
				lnk.innerHTML = 'Accueil';
				cont.appendChild(lnk);
				lnk = null;
				cont.appendChild(document.createElement('br'));
				// Jouer
				var jouer = document.createElement('div');
				jouer.className = 'right-box-title';
				jouer.style.textAlign = 'center';
				jouer.style.marginTop = '6px';
				jouer.style.background = '#E8E0C0';
				jouer.innerHTML = 'Jouer';
				cont.appendChild(jouer);
				var jouerLnk = new Array(new Array('Actions', '2_2'), new Array('Matériel', '2_1'), new Array('Profil détaillé', '2_3'), new Array('Employés', '2_4'), new Array('Batiments', '2_5'));
				for(i = 0; i < jouerLnk.length; i++){
					var lnk = document.createElement('a');
					lnk.href = 'http://www.kraland.org/main.php?p=' + jouerLnk[i][1];
					lnk.style.background = 'url(http://www.kramages.org/5/msg_up.gif) no-repeat 0px 2px';
					lnk.style.paddingLeft = '14px';
					lnk.style.color = lnkColor[$Name('link')[0].href.substr(-10, 1)];
					lnk.innerHTML = jouerLnk[i][0];
					cont.appendChild(lnk);
					lnk = null;
					cont.appendChild(document.createElement('br'));
				}
				// Cybermonde
				var cybm = document.createElement('div');
				cybm.className = 'right-box-title';
				cybm.style.textAlign = 'center';
				cybm.style.marginTop = '7px';
				cybm.style.background = '#E8E0C0';
				cybm.innerHTML = 'Cybermonde';
				cont.appendChild(cybm);
				var cybmLnk = new Array(new Array('Évènements', '4_4'), new Array('Citoyens', '4_1'), new Array('Empires', '4_2_7'), new Array('Organisations', '4_3_6'));
				for(i = 0; i < cybmLnk.length; i++){
					var lnk = document.createElement('a');
					lnk.href = 'http://www.kraland.org/main.php?p=' + cybmLnk[i][1];
					lnk.style.background = 'url(http://www.kramages.org/5/msg_up.gif) no-repeat 0px 2px';
					lnk.style.paddingLeft = '14px';
					lnk.style.color = lnkColor[$Name('link')[0].href.substr(-10, 1)];
					lnk.innerHTML = cybmLnk[i][0];
					cont.appendChild(lnk);
					lnk = null;
					cont.appendChild(document.createElement('br'));
				}
				// Forum

				var KmStr = 'Kramails';
				var KmSrc = $Alt('kramail')[0].src;
				if(KmSrc.substr(-5, 1) == '0')
					KmStr += ' <strong>(9+)</strong>';
				else if(!isNaN(KmSrc.substr(-5, 1)))
					KmStr += ' <strong>(' + KmSrc.substr(-5, 1) + ')</strong>';

				var forum = document.createElement('div');
				forum.className = 'right-box-title';
				forum.style.textAlign = 'center';
				forum.style.marginTop = '7px';
				forum.style.background = '#E8E0C0';
				forum.innerHTML = 'Forum & Kramails';
				cont.appendChild(forum);
				var forumLnk = new Array(new Array('Forum', '5'), new Array(KmStr, '8_1'));
				for(i = 0; i < forumLnk.length; i++){
					var lnk = document.createElement('a');
					lnk.href = 'http://www.kraland.org/main.php?p=' + forumLnk[i][1];
					lnk.style.background = 'url(http://www.kramages.org/5/msg_up.gif) no-repeat 0px 2px';
					lnk.style.paddingLeft = '14px';
					lnk.style.color = lnkColor[$Name('link')[0].href.substr(-10, 1)];
					lnk.innerHTML = forumLnk[i][0];
					cont.appendChild(lnk);
					lnk = null;
					cont.appendChild(document.createElement('br'));
				}
		bg.appendChild(cont);
	menu.appendChild(bg);
	
	if($('left').firstChild && /^http\:\/\/www\.kraland.org\/main\.php(\?p=(1|3[_0-9]*|4[_0-9]*|5[_0-9]*|6[_0-9]*|8[_0-9]*).*)?$/gi.test(document.location))
		$('left').insertBefore(menu, $('left').firstChild);
	else if(/^http\:\/\/www\.kraland.org\/main\.php\?p=2[_0-9]*/gi.test(document.location))
		{
			$('div-min-height').style.height = '600px';
			if($('div-min-height').style.height.substr(0, -2) <= 300)
				$('div-min-height-bottom').style.height = '300px';
			$('left').insertBefore(menu, $('left').firstChild);
		}
	else if($('left').firstChild)
		$('left').insertBefore(menu, $('left').firstChild.nextNode);
	else
		$('left').appendChild(menu);
}

/*
 * Function reverseMain
 *   Inverse les évènements récents et les débats forum sur la page d'accueil
 */

function reverseMain(){
	if($Class('slides').length == 0)
		return;
	
	$Class('bx-left')[1].style.display = 'none';
	var recent = document.createElement('div');
	recent.className = 'bx-left';
	recent.innerHTML = $Class('bx-left')[1].innerHTML;
	$('central-text').appendChild(recent);
}

function blink(id, step){
	if(step){
		$(id).style.display = 'hidden';
		setTimeout('blink('+id+', 1)', 500);
	}
	else{
		$(id).style.display = 'visible';
		setTimeout('blink('+id+', 0)', 500);
	}
}

/*
 * Function reverseForum
 *   Change l'ordre des catégories du forum pour un style v5-like.
 */

function reverseForum(){
	if(!/^http\:\/\/www\.kraland.org\/main\.php\?p=5$/gi.test(document.location))
		return;
	
	$Class('forum-c1')[3].style.display = 'none';
	var site = document.createElement('tr');
	site.className = 'forum-c3';
		var siteHeader = document.createElement('th');
		siteHeader.colSpan = '4';
		siteHeader.innerHTML = 'Site & Annonces';
	site.appendChild(siteHeader);
	$Class('forum-c1')[0].parentNode.insertBefore(site, $Class('forum-c1')[0].parentNode.childNodes[1]);
	var siteContent = document.createElement('tr');
	siteContent.className = 'forum-c1';
	siteContent.innerHTML = $Class('forum-c1')[3].innerHTML;
	$Class('forum-c1')[0].parentNode.insertBefore(siteContent, $Class('forum-c1')[0].parentNode.childNodes[2]);
	var provincial = document.createElement('tr');
	provincial.className = 'forum-c3';
		var provincialHeader = document.createElement('th');
		provincialHeader.colSpan = '4';
		provincialHeader.innerHTML = 'Forum Provincial (RP)';
	provincial.appendChild(provincialHeader);

	$Class('forum-c1')[0].parentNode.insertBefore(provincial, $Class('forum-c1')[3]);
	//$Class('forum-c1')[3].style.display = 'none';
	$Class('forum-c2')[2].className = 'forum-c1';
	$Class('forum-c1')[6].className = 'forum-c2';
	$Class('forum-c2')[3].className = 'forum-c1';
}

/*
 * Function startScript
 *   Lance le script
 */

function startScript(){
	hideSliders();
	addMenu();
	reverseMain();
	reverseForum();
}


// Lance le script une fois le DOM chargé
	startScript();
