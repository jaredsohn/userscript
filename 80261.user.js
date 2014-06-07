// ==UserScript==
// @name           Transformice Tools
// @namespace      http://tmforum.free.fr/tmtools/
// @description    Affiche le jeu Transformice en plein écran.
// @include        http://www.transformice.com/*
// ==/UserScript==

//-------------------------------------------
// Tous droits réservés
// ModoTM42 - modotm42@gmail.com
//-------------------------------------------

// Variables
	var version = '0.14';
	var style = ''
				+'#tmtools_bar { background:#324650; z-index:100; position:absolute; top:0px; left:0px; border-bottom:1px #333333 solid; padding:0; margin:0; font-size:12px; width:100%; color:#4C799A; }'
				+'#tmtools_bar .container { padding:4px; }'
				+'#tmtools_bar .container div { display:inline-block; }'
				+'#tmtools_bar img { margin-bottom:-3px; }'
				+'#tmtools_bar a { color:#4C799A; font-weight:normal; }'
				+'#tmtools_bar a:hover { color:#FFFFFF; text-decoration:none; }'
				+'#tmtools_bar a img { opacity:0.6; }'
				+'#tmtools_bar a:hover img { opacity:1; }'
				+'#tmtools_bar #about { cursor:help; }'

				+'#tmtools_bar #logo { margin-right:20px; }'
				+'#tmtools_bar #logo #resize { margin-left:-10px; margin-bottom:-4px; opacity:0.5; cursor:pointer; }'
				+'#tmtools_bar #logo #resize:hover { opacity:1; }'
				
				+'#tmtools_bar #servers { float:right; }'
				+'#tmtools_bar #servers img { cursor:pointer; }'
				
				+'#tmtools_bar shorts a { margin-right:5px; }'
				
				+'#tmtools_bar #news { text-align:center; padding:0 30px; color:#AAAAAA; }'
				+'#tmtools_bar #news a { color:#DDDDDD; }'
				+'#tmtools_bar #news a:hover { color:#4C799A; }'
				
				+'#tmtools_game object, #tmtools_game embed { z-index;1; position:absolute; top:0px; left:0px; width:100%; height:100%; }'
				
				+'#tmtools_ad { z-index:10; position:absolute; height:115px; width:100%; top:78%; left:0px; background:#324650; border-top:1px #333333 solid; border-bottom:1px #333333 solid; padding:10px 0px; text-align:center; font-size:12px; color:#4C799A; }'
				+'#tmtools_ad #close_ad { cursor:pointer; }'
				+'#tmtools_ad p { margin:0; }'
				+'#tmtools_ad a { color:#4C799A; font-weight:normal; }'
				+'#tmtools_ad a:hover { color:#FFFFFF; text-decoration:none; }'
				+'#tmtools_ad #moved_ad { position:static !important; width:728px; margin: 5px auto; }'
				+'';
	var head = document.getElementsByTagName('head')[0];
	var body = document.getElementsByTagName('body')[0];

// Mise en place balise CSS
	var css = document.createElement('style');
	css.type = 'text/css';
	css.id = 'tmtools_css';
	css.appendChild(document.createTextNode(style));
	head.appendChild(css);
	
// Creation de la topbar
	var topbar = document.createElement('div');
	topbar.id = 'tmtools_bar';
	body.appendChild(topbar);
	
	topbar.innerHTML=	'<div class="container">'
					+		'<div id="servers">'
					+			'<span id="serv_name"></span> '
					+			'<a href="http://www.transformice.com/"><img id="serv_fr" src="http://tmforum.free.fr/tmtools/img/fr.png" /></a> '
					+			'<a href="http://www.transformice.com/en/"><img id="serv_en" src="http://tmforum.free.fr/tmtools/img/uk.png" /></a> '
					+			'<a href="http://www.transformice.com/en2/"><img id="serv_en2" src="http://tmforum.free.fr/tmtools/img/uk.png" /></a> '
					+			'<a href="http://www.transformice.com/ru/"><img id="serv_ru" src="http://tmforum.free.fr/tmtools/img/ru.png" /></a> '
					+		'</div>'
					+		'<div id="logo">'
					+			'<img id="favicon" src="http://tmforum.free.fr/tmtools/img/wait.png" /> '
					+			'<img id="about" src="http://tmforum.free.fr/tmtools/img/title.png" alt="Transformice" />'
					+			'<img id="resize" src="http://tmforum.free.fr/tmtools/img/small.png" alt="< Réduire" />'
					+		'</div>'
					+		'<div id="shorts">'
					+			'<a target="_blank" href="http://tmforum.free.fr"><img src="http://tmforum.free.fr/img/favicon.png" /> Coin des modos</a> '
					+			'<a target="_blank" href="http://www.transformice.niaou.fr"><img src="http://www.transformice.niaou.fr/images/favicon3.png" /> TM Fansite</a> '
				//	+			'<a target="_blank" href="#"><img src="http://www.transformice.niaou.fr/images/favicon2.png" /> Faire un don</a> '
					+		'</div>'
					+		'<div id="news"></div>'
					+	'</div>'

// Nettoyage
	function removeNode(id) {
		return document.getElementById(id).parentNode.removeChild(document.getElementById(id));
	}
	removeNode('header');
	removeNode('hautmenu');
	removeNode('hautmenu2');
	var flash = removeNode('MiniJeux');
	var googlead = removeNode('google_ads_frame1');
	removeNode('global');

// Réorganisation
	var game = document.createElement('div');
	game.id = 'tmtools_game';
	body.appendChild(game);
	game.appendChild(flash);
	var pub = document.createElement('div');
	pub.id = 'tmtools_ad';
	body.appendChild(pub);
	pub.appendChild(googlead);
	googlead.id="moved_ad";
	var pub_p = document.createElement('p');
	pub_p.innerHTML = 'Cette publicité, rémunérée au clic, sert à financer les serveurs du jeu. (Attendez <span id="time">20</span> sec ou cliquez sur <a id="close_ad">Masquer</a>)';
	pub.appendChild(pub_p);

// Event listeners
	document.getElementById('serv_fr').addEventListener('mouseover', function() { document.getElementById('serv_name').innerHTML = 'Serveur FR'; }, true);
	document.getElementById('serv_fr').addEventListener('mouseout', function() { document.getElementById('serv_name').innerHTML = ''; }, true);
	document.getElementById('serv_en').addEventListener('mouseover', function() { document.getElementById('serv_name').innerHTML = 'Serveur EN'; }, true);
	document.getElementById('serv_en').addEventListener('mouseout', function() { document.getElementById('serv_name').innerHTML = ''; }, true);					
	document.getElementById('serv_en2').addEventListener('mouseover', function() { document.getElementById('serv_name').innerHTML = 'Serveur EN2'; }, true);
	document.getElementById('serv_en2').addEventListener('mouseout', function() { document.getElementById('serv_name').innerHTML = ''; }, true);
	document.getElementById('serv_ru').addEventListener('mouseover', function() { document.getElementById('serv_name').innerHTML = 'Serveur RU'; }, true);
	document.getElementById('serv_ru').addEventListener('mouseout', function() { document.getElementById('serv_name').innerHTML = ''; }, true);					
	document.getElementById('about').addEventListener('mouseover', function() { document.getElementById('news').innerHTML = 'Transformice Tools version '+version+' par ModoTM42'; }, true);
	document.getElementById('about').addEventListener('mouseout', function() { document.getElementById('news').innerHTML = ''; }, true);					
	document.getElementById('close_ad').addEventListener('click', function() { document.getElementById('tmtools_ad').style.display='none'; }, true);
	setInterval(function() { var t = document.getElementById('time'); if(t.innerHTML<=0) { document.getElementById('tmtools_ad').style.display='none'; } else { t.innerHTML = t.innerHTML*1-1; } }, 1000);
	document.getElementById('resize').addEventListener('click', function() { 
		if(this.src=='http://tmforum.free.fr/tmtools/img/big.png') {
			this.src='http://tmforum.free.fr/tmtools/img/small.png'; 
			document.getElementById('logo').style.marginRight='20px'; 
			document.getElementById('shorts').style.display='inline-block'; 
			document.getElementById('servers').style.display='inline-block'; 
			document.getElementById('news').style.display='inline-block'; 
			document.getElementById('tmtools_bar').style.width='100%';
			document.getElementById('tmtools_bar').style.borderRight='none';
		} else {
			this.src='http://tmforum.free.fr/tmtools/img/big.png'; 
			document.getElementById('logo').style.marginRight='0px'; 
			document.getElementById('shorts').style.display='none'; 
			document.getElementById('servers').style.display='none'; 
			document.getElementById('news').style.display='none'; 
			document.getElementById('tmtools_bar').style.width='155px';
			document.getElementById('tmtools_bar').style.borderRight='1px #333333 solid';
		}
	}, true);
	
// Récupération News
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://tmforum.free.fr/request.php?a=get_news&v="+version+"&no-cache="+Math.random(),
		onload: 
			function(e) {
				if (e.status == 200) {
					document.getElementById('favicon').src='http://www.transformice.com/favicon.png';
					document.getElementById('news').innerHTML=e.responseText;
				}
			}
	});