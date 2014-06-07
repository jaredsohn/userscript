// ==UserScript==
	// @name           MegaUpload_Player
	// @fullname       MegaUpload Player
	// @author         http://userscripts.org/users/102504
	// @namespace      http://userscripts.org/scripts/show/55064
	// @description    Player Divx pour MegaUpload
	// @version        1.6.1
	// @date           13/10/2009
	// @source         http://userscripts.org/scripts/show/55064
	// @identifier     http://userscripts.org/scripts/source/55064.user.js
	// @include        http://*megaupload.com/
	// @include        http://*megaupload.com/?
	// @include        http://*megaupload.com/?d=*
	// @include        http://*megaporn.com/
	// @include        http://*megaporn.com/?
	// @include        http://*megaporn.com/?d=*
// ==/UserScript==


if (window.parent!=window)
{
	window.open(window.location.href, '_top', '');
	exit;
}

//if (document.getElementById('downloadlink') != null && document.getElementById('captchafield') == undefined)
{
	//****************************************************************
	//		C h e c k   u p d a t e
	//****************************************************************
	var MUP_id = 55064;
	var MUP_today = new Date();
	MUP_today_YYYYMMDD = parseInt(MUP_today.getFullYear()*10000+MUP_today.getMonth()*100+MUP_today.getDate());

	var MUP_new_check = 1;
	if (!GM_getValue('MUP_FreqUpdate'))	GM_setValue('MUP_FreqUpdate', 1);
	if (!GM_getValue('MUP_Version'))	GM_setValue('MUP_Version', 0);
	if (!GM_getValue('MUP_DateUpdate'))	GM_setValue('MUP_DateUpdate', MUP_today_YYYYMMDD);
	MUP_new_check = parseInt(GM_getValue('MUP_DateUpdate'))+parseInt(GM_getValue('MUP_FreqUpdate'));
	if (MUP_today_YYYYMMDD > GM_getValue('MUP_DateUpdate') && MUP_today_YYYYMMDD >= MUP_new_check)
	{
		var erreur_later = false;
		if(!GM_getValue('MUP_DateLater'))
			erreur_later = true;
		if (erreur_later || GM_getValue('MUP_DateLater')<=MUP_today_YYYYMMDD)	check_MUP_version();
	}


	var MUP_downloadlink = false;
	var Counter_MUP = 0;
	var MUP_url_movie = '';
	var extension = '';
	//if (document.getElementById('downloadcounter')) document.getElementById('downloadcounter').style.display = 'none';
	if (document.getElementById('downloadlink'))
	{
		MUP_downloadlink = true;
		Counter_MUP = parseInt(document.getElementById('countdown').innerHTML);
		//document.getElementById('downloadlink').style.display = 'block';
		document.getElementById('downloadlink').firstChild.removeAttribute('onclick');
		MUP_url_movie = document.getElementById('downloadlink').firstChild.href;
		var nb_balise_img_dlink = document.getElementById('downloadlink').parentNode.parentNode.getElementsByTagName('img').length;
		for (i=0; i<nb_balise_img_dlink ; i++)
		{
			if (document.getElementById('downloadlink').parentNode.parentNode.getElementsByTagName('img')[i].src.match('premium'))
			{
				MUP_url_movie_premium = document.getElementById('downloadlink').parentNode.parentNode.getElementsByTagName('img')[i].parentNode.href;
				if (!MUP_url_movie_premium.match('c=premium')) MUP_url_movie = MUP_url_movie_premium;
				break;
			}
		}
		extension = MUP_url_movie.substr(MUP_url_movie.lastIndexOf('.') + 1).toLowerCase();
	}
	if (document.getElementById('tabs'))	document.getElementById('tabs').innerHTML = '';


	//****************************************************************
	//		V i d e o   a n d   L o a d i n g  ? ? ?
	//****************************************************************
	var MUP_stream = false;
	var MUP_load = false;
	if (extension!='' &&  (extension == 'avi' || extension == 'divx' || extension == 'mp4'))
	{
		MUP_stream = true;
	    if (GM_getValue('MUP_autoload')!='false')	MUP_load = true;
	}

	//****************************************************************
	//		C S S
	//****************************************************************
	document.getElementsByTagName('head')[0].appendChild(getCSS());

	//****************************************************************
	//		B o d y   o r i g i n a l
	//****************************************************************
	var body_ori = document.getElementsByTagName('body')[0].innerHTML;

	//****************************************************************
	//		V a r i a b l e s
	//****************************************************************
	var timeout;
	if (!GM_getValue('MUP_bg_actif'))			GM_setValue('MUP_bg_actif','false');
	if (!GM_getValue('MUP_TabImg'))				GM_setValue('MUP_TabImg','0');
	MUP_TabImg			= GM_getValue('MUP_TabImg').split(';');
	var RandomData_Img	= Math.floor(Math.random()*MUP_TabImg.length);
	if (RandomData_Img==0) RandomData_Img = 1;
	var Prev_img_Divx	= '';
	if (GM_getValue('MUP_bg_actif')=='true' && MUP_TabImg.length>1)
		Prev_img_Divx = unescape(MUP_TabImg[RandomData_Img]);

	var nb_balise_a = document.getElementsByTagName('a').length;
	var nb_balise_font = document.getElementsByTagName('font').length;

	var megavideo_url = '';
	var megavideo_fic = '';

	var MUP_taille_fic = '';
	var MUP_name_fic = decodeURIComponent(MUP_url_movie.substring(MUP_url_movie.lastIndexOf('/')+1,MUP_url_movie.length));

	var MUP_diff_H = 140;

	//****************************************************************
	//		C o u l e u r s
	//****************************************************************
	var MUP_color_bg_dft	= '#0F0F0F';
	var MUP_color_text_dft	= '#FD6400';
	var MUP_color_href_dft	= '#40E0D0';
	var MUP_color_hover_dft	= '#FF00FF';

	if (!GM_getValue('MUP_color_bg'))		GM_setValue('MUP_color_bg',MUP_color_bg_dft);
	if (!GM_getValue('MUP_color_text'))		GM_setValue('MUP_color_text',MUP_color_text_dft);
	if (!GM_getValue('MUP_color_href'))		GM_setValue('MUP_color_href',MUP_color_href_dft);
	if (!GM_getValue('MUP_color_hover'))	GM_setValue('MUP_color_hover',MUP_color_hover_dft);

	//****************************************************************
	//		T a i l l e   f i c h i e r
	//****************************************************************
	if (MUP_stream)
	{
		//MUP_taille_fic = document.getElementsByTagName('font')[5].innerHTML;
		for (i=0; i<nb_balise_font ; i++)
		{
			if (document.getElementsByTagName('font')[i].innerHTML=='Taille du Fichier:')
			{
				MUP_taille_fic = document.getElementsByTagName('font')[i+1].innerHTML;
				break;
			}
		}
	}

	//****************************************************************
	//		L i e n   M V
	//****************************************************************
	if (MUP_downloadlink)
	{
		for (i=0; i<nb_balise_a ; i++)
		{
			if (document.getElementsByTagName('a')[i].href.match('http://www.megavideo.com/'))
			{
				megavideo_url = document.getElementsByTagName('a')[i].href;
				break;
			}
		}
	}
	//****************************************************************
	//		L a n g u a g e
	//****************************************************************
	if (!GM_getValue('MUP_lng') || GM_getValue('MUP_lng')=='auto')	var MUP_LANG = navigator.language;
	else															var MUP_LANG = GM_getValue('MUP_lng');
	if (MUP_LANG!='fr' && MUP_LANG!='en')							MUP_LANG = 'en';

	switch ( MUP_LANG )
	{
		case 'fr':
		MUP_LNG =
		{
			name:				'MegaUpload Player',
			othermovie:			'Charger une autre vidéo',
			wait_thx:			'Merci de patientez',
			wait_sec:			'secondes',
			error_l1:			'Erreur lors du chargement du Divx Web Player.<br />',
			error_l2:			'Essayer de ',
			error_l3:			'recharger',
			error_l4:			' la page.',
			error_alert:		'Ne fonctionne pas.',
			link_mv_01:			'Limité',
			link_mv_02:			'Illimité',
			link_mu_01:			'Streaming',
			link_mu_02:			'Original',
			link_mu_dl:			'Télécharger',
			frame_01:			'Allocine',
			frame_02:			'IMDb',
			frame_03:			'Film',
			option_setDefaut:	'Clic remet la valeur par défaut.',
			opt_title:			'Options',
			option_autoplay:	'Lecture Automatique',
			option_autoplay_pb:	'Si problème...décochez.',
			MUP_format_auto:	'Format player',
			MUP_format_auto_T:	'Seulement en mode Auto ou Hauteur*format',
			option_lng:			'Langue',
			option_bg:			'Couleur Bg',
			option_txt:			'Couleur Texte',
			option_href:		'Couleur Href',
			option_hover:		'Couleur Hover',
			option_width:		'Largeur Player',
			option_height:		'Hauteur Player',
			option_update:		'Vérifier màj',
			option_autoload:    'Basculer automatiquement si c\'est une vidéo',
			option_day:			'jour',
			option_days:		'jours',
			option_save:		'Sauver',
			option_close:		'Fermer',
			option_cancel:		'Annuler',
			option_bg_title_01: 'Image'+(MUP_TabImg.length>2?'s':''),
			option_bg_see:		'Prévisualiser',
			option_bg_hide:		'Cacher',
			option_bg_noneImg:	'Pas d&rsquo;images',
			option_bg_title_02: 'Url',
			option_error_url:	'Veuillez renseigner une url correcte: http://...',
			option_error_find:	'Non trouvé',
			option_bg_add:		'Ajouter',
			option_bg_del:		'Supprimer',
			option_bg_delAll:	'Supprimer tout',
			option_mess_delAll:	'Supprimer toutes les images ?',
			title_update_new:	'Nouvelle version de',
			verify_update:		'Vérifier Màj',
			verify_noresult:	'Pas de nouvelle version de MUP',
			update_button:		'Mettre à jour',
			later_button:		'Plus tard',
			donate_title:		'Si vous trouvez MegaUpload Player utile, vous pouvez faire un don libre.',
			donate_01:			'Vous aimez «MUP» ?',
			donate_02:			'Faites un don libre !!!',
			donate_src_button:	'https://www.paypal.com/fr_FR/FR/i/btn/btn_donate_SM.gif'
		};
		break;
		case 'en':
		MUP_LNG =
		{
			name:				'MegaUpload Player',
			othermovie:			'Load a new video',
			wait_thx:			'Please Wait',
			wait_sec:			'seconds',
			error_l1:			'Error during loading of Divx Web Player.<br />',
			error_l2:			'Try to ',
			error_l3:			'reload',
			error_l4:			' page.',
			error_alert:		'Do not function.',
			link_mv_01:			'Limited',
			link_mv_02:			'Unlimited',
			link_mu_01:			'Streaming',
			link_mu_02:			'Original',
			link_mu_dl:			'Download',
			frame_01:			'Allocine',
			frame_02:			'IMDb',
			frame_03:			'Movie',
			option_setDefaut:	'Clic set to default.',
			opt_title:			'Options',
			option_autoplay:	'Autoplay',
			option_autoplay_pb:	'If problem...uncheck.',
			MUP_format_auto:	'Player size',
			MUP_format_auto_T:	'Only in Auto mode or Height*size',
			option_lng:			'Language',
			option_bg:			'Bg Color',
			option_txt:			'Text Color',
			option_href:		'Href Color',
			option_hover:		'Hover Color',
			option_width:		'Width Player',
			option_height:		'Height Player',
			option_update:		'Check update',
			option_autoload:    'Switch directly if it\'s a movie',
			option_day:			'day',
			option_days:		'days',
			option_save:		'Save',
			option_close:		'Close',
			option_cancel:		'Cancel',
			option_bg_title_01:	'Picture'+(MUP_TabImg.length>2?'s':''),
			option_bg_see:		'Preview',
			option_bg_hide:		'Hide',
			option_bg_noneImg:	'No pictures',
			option_bg_title_02:	'Url',
			option_error_url:	'Please inform a correct URL: http://...',
			option_error_find:	'Not found',
			option_bg_add:		'Add',
			option_bg_del:		'Delete',
			option_bg_delAll:	'Delete all',
			option_mess_delAll:	'Delete all pictures ?',
			title_update_new:	'New version of',
			verify_update:		'Verify Update',
			verify_noresult:	'No new version of MUP',
			update_button:		'Update',
			later_button:		'Later',
			donate_title:		'If you find MegaUpload Player useful, you can make a free donation.',
			donate_01:			'You like «MUP» ?',
			donate_02:			'Make a free donation !!!',
			donate_src_button:	'https://www.paypal.com/en_US/i/btn/x-click-but21.gif'
		};
	}

	//****************************************************************
	//		A j o u t   d u   M e n u
	//****************************************************************
	GM_registerMenuCommand( 'MU Player: '+MUP_LNG.opt_title+'' , options_MUP);
	GM_registerMenuCommand( 'MU Player: '+MUP_LNG.option_bg_title_01+'' , options_bg_MUP);
	GM_registerMenuCommand( 'MU Player: '+MUP_LNG.verify_update+'' , ForceCheck_MUP_version);

	//****************************************************************
	//		R é g l a g e   t a i l l e s
	//****************************************************************
	var MUP_Height_dft = Math.floor(window.innerHeight) - MUP_diff_H;

	if (!GM_getValue('MUP_ratio'))				GM_setValue('MUP_ratio','1.60');
	if (GM_getValue('MUP_ratio')=='1.78')		var MUP_ratio = 16/9;
	else if (GM_getValue('MUP_ratio')=='1.60')	var MUP_ratio = 16/10;
	else if (GM_getValue('MUP_ratio')=='1.33')	var MUP_ratio = 4/3;

	if (!GM_getValue('MUP_Height'))				GM_setValue('MUP_Height','Auto');
	if (GM_getValue('MUP_Height')=='Auto')		var MUP_Height = MUP_Height_dft;
	else										var MUP_Height = GM_getValue('MUP_Height')


	if (MUP_Height<250) MUP_Height	= 250;
	var MUP_Width_dft = Math.floor(MUP_Height*MUP_ratio);

	if (!GM_getValue('MUP_Width'))				GM_setValue('MUP_Width','Auto');
	if (GM_getValue('MUP_Width')=='Auto')		var MUP_Width = MUP_Width_dft;
	else										var MUP_Width = GM_getValue('MUP_Width')

	//****************************************************************
	//		L i e n   v e r s   M V   s ' i l   e x i s t e
	//****************************************************************
	if (megavideo_url != '')
	{
		megavideo_fic = '<div style="color:'+GM_getValue('MUP_color_text')+';font-variant:small-caps;text-align:center;margin:auto;float:left;width:33%">';
			megavideo_fic += '<a style="color:'+GM_getValue('MUP_color_href')+';" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" href="'+megavideo_url+'" target="_blank" style="font-size:12px; color:#000000;">'+MUP_LNG.link_mv_01+'</a>';
			megavideo_fic += '<br /><img style="vertical-align:center;width:150px;height:20px" src="http://wwwstatic.megavideo.com/mvgui/mv_logo.gif" alt="" /><br />';
			megavideo_fic += '<a style="color:'+GM_getValue('MUP_color_href')+';" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" href="#" onclick="alert(\''+MUP_LNG.error_alert+'\');" style="font-size:12px; color:#000000;">'+MUP_LNG.link_mv_02+'</a>';
		megavideo_fic += '</div>';
	}

	//****************************************************************
	//		C h o i x   d e   l a   f r a m e
	//****************************************************************
	var Choix_view = '';
	Choix_view += '<span id="view_choice" style="color:'+GM_getValue('MUP_color_href')+';font-variant:small-caps;font-weight:bold;">';
		Choix_view += '<span style="cursor:pointer;float:left;width:33%;" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="document.getElementById(\'lecteur_divx\').style.visibility=\'hidden\';document.getElementById(\'frame_allocine\').style.display=\'block\';document.getElementById(\'frame_imdb\').style.display=\'none\'; document.getElementById(\'lecteur_divx\').style.marginBottom=\'-'+MUP_Height+'px\';document.getElementById(\'Movie_load\').style.display=\'none\';">'+MUP_LNG.frame_01+'</span>';
		Choix_view += '<span style="cursor:pointer;float:left;width:33%;" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="document.getElementById(\'lecteur_divx\').style.visibility=\'hidden\';document.getElementById(\'frame_allocine\').style.display=\'none\'; document.getElementById(\'frame_imdb\').style.display=\'block\';document.getElementById(\'lecteur_divx\').style.marginBottom=\'-'+MUP_Height+'px\';document.getElementById(\'Movie_load\').style.display=\'none\';">'+MUP_LNG.frame_02+'</span>';
		Choix_view += '<span style="cursor:pointer;float:left;width:33%;" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="document.getElementById(\'frame_allocine\').style.display=\'none\';document.getElementById(\'frame_imdb\').style.display=\'none\';document.getElementById(\'lecteur_divx\').style.visibility=\'visible\';document.getElementById(\'lecteur_divx\').style.marginBottom=\'0px\';">'+MUP_LNG.frame_03+'</span>';
	Choix_view += '</span><br style="clear:both" />';

	//****************************************************************
	//		F o o t e r   M U
	//****************************************************************
	var megaupload_footer = '';
	megaupload_footer = '<div style="z-index:10000000;color:'+GM_getValue('MUP_color_text')+';background-color:'+GM_getValue('MUP_color_bg')+';font-variant:small-caps;text-align:center;width:'+(MUP_Width-20)+'px;min-width:650px;margin:auto;border:4px groove;padding:5px">';
		megaupload_footer += megavideo_fic;
		megaupload_footer += '<div id="donate" style="height:48px;float:left;width:'+(megavideo_url!=''?'33%':'50%')+';">';
//			megaupload_footer += '<a style="color:'+GM_getValue('MUP_color_href')+'" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=discussions%40hotmail%2efr&lc=FR&item_name=MUP%20userscripts&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted" title="'+MUP_LNG.donate_title+'" target="_blank">';
			megaupload_footer += '<form style="color:'+GM_getValue('MUP_color_href')+'" title="'+MUP_LNG.donate_title+'" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post">';
				megaupload_footer += '<input type="hidden" name="cmd" value="_s-xclick" />';
//				megaupload_footer += MUP_LNG.donate_01+'<br />';
				megaupload_footer += '<br />';
				megaupload_footer += '<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHPwYJKoZIhvcNAQcEoIIHMDCCBywCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYCT8hqjjO0t/XSh1dfEal3k4YXQR8E5iJA86tu0x4ggAb0+ieOOvscvkpDWAPZU+8aZ+IDIXez1ISQ+SE1JffPW8tk+IOnRM+zZOud2nqEnxWFh4u8HmgVAkL9/THoBXouOKdbWYt9+VW/TXKnAT4MnwYo/P4+ZzAfPls2y1/eWlTELMAkGBSsOAwIaBQAwgbwGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIE1xsOs1g6m6AgZh6TSl/8qk4sgtiD6HsB3dDEbjXpwWC7fwyXM4E6czMdfIhFZuJhg61BddNMyREvQctml5fbD8F0l0KmE3KbF2zIe0nA3KCPx5PTGY9gN3QFnLIFF/M4Pu8XpOvtIsWqQ7NBWRJSP5Nl5+W38rSz8/5X2ZTQCcpNYdgjuHJVG6lwhnoqKQesmhu4Pxh/5JQJycSRKQU6JlOLKCCA4cwggODMIIC7KADAgECAgEAMA0GCSqGSIb3DQEBBQUAMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTAeFw0wNDAyMTMxMDEzMTVaFw0zNTAyMTMxMDEzMTVaMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwUdO3fxEzEtcnI7ZKZL412XvZPugoni7i7D7prCe0AtaHTc97CYgm7NsAtJyxNLixmhLV8pyIEaiHXWAh8fPKW+R017+EmXrr9EaquPmsVvTywAAE1PMNOKqo2kl4Gxiz9zZqIajOm1fZGWcGS0f5JQ2kBqNbvbg2/Za+GJ/qwUCAwEAAaOB7jCB6zAdBgNVHQ4EFgQUlp98u8ZvF71ZP1LXChvsENZklGswgbsGA1UdIwSBszCBsIAUlp98u8ZvF71ZP1LXChvsENZklGuhgZSkgZEwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAgV86VpqAWuXvX6Oro4qJ1tYVIT5DgWpE692Ag422H7yRIr/9j/iKG4Thia/Oflx4TdL+IFJBAyPK9v6zZNZtBgPBynXb048hsP16l2vi0k5Q2JKiPDsEfBhGI+HnxLXEaUWAcVfCsQFvd2A1sxRr67ip5y2wwBelUecP3AjJ+YcxggGaMIIBlgIBATCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTA5MTAwNzIzNDMwOFowIwYJKoZIhvcNAQkEMRYEFFzDrJ9go8Ug0zzAwNwxNNg/rQ/MMA0GCSqGSIb3DQEBAQUABIGAZQ8peylksoz3JUOkt8VEZ0DXSY9ADsETHVWFlq2tDtiM0sFPYBqCh9Pp7Tlkl46ANj5zR9oL74So1JWaIz2s0+pCqSzwVh/T4kuxM1wDDh1zSA87q7/XJDh5bBPDQVNvPFvZVfvvUND5ghgbo77TDMVw1WlXiBdkvsOMsYzqZGc=-----END PKCS7-----">';
//				megaupload_footer += '<br /><img style="border:none;max-width:150px;height:20px" src="'+MUP_LNG.donate_src_button+'" alt="PayPal !" /><br />';
				megaupload_footer += '<input style="border:none;color:'+GM_getValue('MUP_color_text')+';max-width:150px;height:20px;" type="image" name="submit" src="'+MUP_LNG.donate_src_button+'" alt="PayPal!" />';
				megaupload_footer += '<br />';
//				megaupload_footer += '<br />'+MUP_LNG.donate_02;
			megaupload_footer += '</form>';
//			megaupload_footer += '</a>';
		megaupload_footer += '</div>';
		megaupload_footer += '<div id="img_MU" style="float:left;width:'+(megavideo_url!=''?'33%':'50%')+';">';
			megaupload_footer += '<span style="color:'+GM_getValue('MUP_color_href')+';cursor:pointer;" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="document.getElementById(\'old_body\').style.display=\'none\';document.getElementById(\'new_body\').style.display=\'block\';">'+MUP_LNG.link_mu_01+'</span>';
			megaupload_footer += '<br /><img style="vertical-align:center;width:150px;height:20px" src="http://wwwstatic.megaupload.com/gui2/logo.gif" alt="" /><br />';
			megaupload_footer += '<span style="color:'+GM_getValue('MUP_color_href')+';cursor:pointer;" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="document.getElementById(\'new_body\').style.display=\'none\';document.getElementById(\'old_body\').style.display=\'block\';">'+MUP_LNG.link_mu_02+'</span>';
		megaupload_footer += '</div>';
		megaupload_footer += '<br style="clear:both" />';
	megaupload_footer += '</div>';

	//****************************************************************
	//		C o n s t r u c t i o n   d u   n o u v e a u   b o d y
	//****************************************************************
	if (!GM_getValue('MUP_autoplay'))	GM_setValue('MUP_autoplay','false');

	var new_body_page = '';
	var MUP_MUP = '<div style="width: 100%; height: 466px;"> <div style="float: left; border: 2px solid #000; line-height: normal; background-color: #fff;"> <div style="width: 6.23em; height: 7.7em; font-family: Verdana; font-size: 60px; overflow: hidden;"> <div style="margin-top: -0.7em"> <div style="position: absolute; padding-left: 1.56em; padding-top: 0.37em;"> <div style="font-size: 2.57em; font-weight: bold; color: #000;">o</div> </div> <div style="position: absolute; padding-left: 1.62em; padding-top: 0.53em;"> <div style="font-size: 2.38em; font-weight: bold; color: #fff;">o</div> </div> <div style="position: absolute; padding-left: 1.2em; padding-top: 0.67em;"> <div style="font-size: 2.48em; color: #000;">o</div> </div> <div style="position: absolute; padding-left: 1.29em; padding-top: 0.85em;"> <div style="font-size: 2.23em; color: #fff;">o</div> </div> <div style="position: absolute; padding-left: 1.57em; padding-top: 2.03em;">  <div style="width: 0.32em; height: 0.52em; background-color: #fff;"></div> </div> <div style="position: absolute; padding-left: 1.52em; padding-top: 1.56em;">  <div style="font-size: 0.8em; font-style: italic; color: #000;">(</div> </div> <div style="color: #000;"> <div style="position: absolute; padding-left: 1.07em; padding-top: 0.62em;"> <div style="font-size: 4.57em;">O</div> </div> <div style="position: absolute; padding-left: 1.05em; padding-top: 1.15em;"> <div style="font-size: 3.53em;">O</div> </div> <div style="position: absolute; padding-left: 1.12em; padding-top: 0.74em;"> <div style="font-size: 4.63em;">O</div> </div> <div style="position: absolute; padding-left: 1.08em; padding-top: 3.64em;"> <div style="font-size: 1.77em; font-weight: bold; font-style: italic;"> \</div> </div> <div style="position: absolute; padding-left: 1.17em; padding-top: 4.8em;"> <div style="font-size: 3.29em; font-weight: bold; font-style: italic;">L</div> </div> <div style="position: absolute; padding-left: 3.14em; padding-top: 5.21em;"> <div style="font-size: 3.01em; font-weight: bold; font-style: italic; height: 0.96em; overflow: hidden;">(</div> </div> <div style="position: absolute; padding-left: 4.13em; padding-top: 3.23em;"> <div style="font-size: 0.7em; font-weight: bold;">O</div> </div> <div style="position: absolute; padding-left: 1.37em; padding-top: 5.08em;"> <div style="font-size: 0.97em; font-weight: bold;">O</div> </div> </div> <div style="color: #FED90E"> <div style="position: absolute; padding-left: 1.15em; padding-top: 0.76em;"> <div style="font-size: 4.37em;">O</div> </div> <div style="position: absolute; padding-left: 1.14em; padding-top: 1.26em;"> <div style="font-size: 3.37em;">O</div> </div> <div style="position: absolute; padding-left: 1.2em; padding-top: 0.87em;"> <div style="font-size: 4.42em;">O</div> </div> <div style="position: absolute; padding-left: 1.15em; padding-top: 3.61em;"> <div style="font-size: 1.7em; font-weight: bold; font-style: italic;"> \</div> </div> <div style="position: absolute; padding-left: 1.24em; padding-top: 4.93em;"> <div style="font-size: 3.18em; font-weight: bold; font-style: italic;">L</div> </div> <div style="position: absolute; padding-left: 3.03em; padding-top: 5.05em;"> <div style="font-size: 3.2em; font-weight: bold; font-style: italic; height: 0.96em; overflow: hidden;">(</div> </div> <div style="position: absolute; padding-left: 4.18em; padding-top: 3.34em;"> <div style="font-size: 0.55em; font-weight: bold;">O</div> </div> </div> <div style="position: absolute; padding-left: 1.84em; padding-top: 2.37em;"> <div style="width: 1.92em; height: 5.76em; background-color: #FED90E;"> </div> </div> <div style="position: absolute; padding-left: 3.70em; padding-top: 2.73em;"> <div style="width: .30em; height: 1.56em; background-color: #FED90E;"></div> </div> <div style="position: absolute; padding-left: 4.36em; padding-top: 3.51em; "> <div style="width: .16em; height: .34em; background-color: #FED90E;"></div> </div> <div style="position: absolute; padding-left: 1.62em; padding-top: 5.47em;"> <div style="font-size: 10px"> <div style="width: 2.6em; height: 3.0em; background-color: #FED90E;"></div> </div> </div> <div style="color: #000;"> <div style="position: absolute; padding-left: 1.23em; padding-top: 4.57em;"> <div style="font-size: 0.67em;">|</div> </div> <div style="position: absolute; padding-left: 1.23em; padding-top: 4.37em;"> <div style="font-size: 0.67em;">|</div> </div> <div style="position: absolute; padding-left: 1.34em; padding-top: 4.37em;"> <div style="font-size: 0.67em;"> \</div> </div> <div style="position: absolute; padding-left: 1.4em; padding-top: 4.53em;"> <div style="font-size: 0.67em;">\</div> </div> <div style="position: absolute; padding-left: 1.55em; padding-top: 4.49em;"> <div style="font-size: 0.67em;">|</div> </div> <div style="position: absolute; padding-left: 1.55em; padding-top: 4.19em;"> <div style="font-size: 0.67em;">|</div> </div> <div style="position: absolute; padding-left: 1.66em; padding-top: 4.19em;"> <div style="font-size: 0.67em;"> \</div> </div> <div style="position: absolute; padding-left: 1.76em; padding-top: 4.45em;"> <div style="font-size: 0.67em;">\</div> </div> <div style="position: absolute; padding-left: 1.27em; padding-top: 2.54em;"> <div style="font-size: 0.42em; font-weight: bold; font-style: italic;">\</div> </div> <div style="position: absolute; padding-left: 1.51em; padding-top: 2.18em;"> <div style="font-size: 0.42em; font-weight: bold; font-style: italic;">\</div> </div> <div style="position: absolute; padding-left: 2.31em; padding-top: 5.32em;"> <div style="font-size: 1.47em; font-weight: bold; font-style: italic;">(</div> </div> <div style="position: absolute; padding-left: 2.29em; padding-top: 5.69em;"> <div style="font-size: 1.11em; font-weight: bold;">(</div> </div> <div style="position: absolute; padding-left: 2.92em; padding-top: 4.72em;"> <div style="font-size: 2.4em; font-weight: bold;">8</div> </div> <div style="position: absolute; padding-left: 2.43em; padding-top: 3.96em;"> <div style="font-size: 3.13em; font-weight: bold; font-style: italic;">o</div> </div> <div style="position: absolute; padding-left: 2.31em; padding-top: 4.05em;"> <div style="font-size: 3.13em; font-weight: bold; font-style: italic;">o</div> </div> <div style="position: absolute; padding-left: 2.33em; padding-top: 4.37em;"> <div style="font-size: 3.06em; font-weight: bold;">o</div> </div> </div> <div style="color: #CDB26F"> <div style="position: absolute; padding-left: 2.39em; padding-top: 5.36em;"> <div style="font-size: 1.38em; font-weight: bold; font-style: italic;">(</div> </div> <div style="position: absolute; padding-left: 2.37em; padding-top: 5.75em;"> <div style="font-size: 1.04em; font-weight: bold;">(</div> </div> <div style="position: absolute; padding-left: 2.95em; padding-top: 4.82em;"> <div style="font-size: 2.25em; font-weight: bold;">8</div> </div> <div style="position: absolute; padding-left: 2.49em; padding-top: 4.15em;"> <div style="font-size: 2.93em; font-weight: bold; font-style: italic;">o</div> </div> <div style="position: absolute; padding-left: 2.39em; padding-top: 4.22em;"> <div style="font-size: 2.93em; font-weight: bold; font-style: italic;">o</div> </div> <div style="position: absolute; padding-left: 2.4em; padding-top: 4.5em;"> <div style="font-size: 2.87em; font-weight: bold;">o</div> </div> </div> <div style="position: absolute; padding-left: 2.98em; padding-top: 6.09em;"> <div style="width: .76em; height: 1em; background-color: #CDB26F;"></div> </div> <div style="color: #000"> <div style="position: absolute; padding-left: 3.69em; padding-top: 4.28em;"> <div style="font-size: 2.2em;">o</div> </div> <div style="position: absolute; padding-left: 4.62em; padding-top: 5.42em;"> <div style="font-size: 1.01em;">)</div> </div> <div style="position: absolute; padding-left: 4.78em; padding-top: 5.72em;"> <div style="font-size: 0.72em;">)</div> </div> <div style="position: absolute; padding-left: 4.53em; padding-top: 5.65em;"> <div style="font-size: 0.94em;"> b</div> </div> <div style="position: absolute; padding-left: 4em; padding-top: 5.09em;"> <div style="font-size: 1.59em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.33em; padding-top: 4.79em;"> <div style="font-size: 1.95em; font-weight: bold;">O</div> </div> <div style="position: absolute; padding-left: 3.15em; padding-top: 4.3em;"> <div style="font-size: 2.42em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.01em; padding-top: 4.46em;"> <div style="font-size: 2.23em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.88em; padding-top: 4.43em;"> <div style="font-size: 2.23em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.81em; padding-top: 4.71em;"> <div style="font-size: 1.9em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.69em; padding-top: 4.74em;"> <div style="font-size: 1.97em; font-weight: bold;">o</div> </div> </div> <div style="color: #CDB26F"> <div style="position: absolute; padding-left: 3.7em; padding-top: 4.4em;"> <div style="font-size: 2.06em;">o</div> </div> <div style="position: absolute; padding-left: 4.57em; padding-top: 5.44em;"> <div style="font-size: 0.95em;">)</div> </div> <div style="position: absolute; padding-left: 4.49em; padding-top: 5.66em;"> <div style="font-size: 0.88em;">b</div> </div> <div style="position: absolute; padding-left: 4.01em; padding-top: 5.14em;"> <div style="font-size: 1.48em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.37em; padding-top: 4.84em;"> <div style="font-size: 1.83em; font-weight: bold;">O</div> </div> <div style="position: absolute; padding-left: 3.21em; padding-top: 4.38em;"> <div style="font-size: 2.27em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.07em; padding-top: 4.54em;"> <div style="font-size: 2.09em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.95em; padding-top: 4.53em;"> <div style="font-size: 2.08em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.88em; padding-top: 4.78em;"> <div style="font-size: 1.78em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.71em; padding-top: 4.79em;"> <div style="font-size: 1.85em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.87em; padding-top: 4.59em;"> <div style="font-size: 1.93em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.09em; padding-top: 4.55em;"> <div style="font-size: 1.93em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.73em; padding-top: 5.03em;"> <div style="font-size: 1.44em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 2.59em; padding-top: 5.77em;"> <div style="font-size: 0.82em; font-weight: bold;">o</div> </div> <div style="position: absolute; padding-left: 3.04em; padding-top: 6.4em;"> <div style="font-size: 0.16em; font-weight: bold; font-style: italic; color: #000;">/</div> </div> <div style="position: absolute; padding-left: 3.03em; padding-top: 6.4em;"> <div style="font-size: 0.16em; font-weight: bold; font-style: italic; color: #000;">/</div> </div> <div style="position: absolute; padding-left: 3.02em; padding-top: 6.4em;"> <div style="font-size: 0.16em; font-weight: bold; font-style: italic; color: #000;">/</div> </div> </div> <div style="position: absolute; padding-left: 3.24em; padding-top: 2.49em;"> <div style="font-size: 2.76em; font-weight: bold; color: #000;"> &bull;</div> </div> <div style="position: absolute; padding-left: 3.34em; padding-top: 2.68em;"> <div style="font-size: 2.49em; font-weight: bold; color: #fff;">&bull;</div> </div> <div style="position: absolute; padding-left: 4.2em; padding-top: 4.26em;">  <div style="font-size: 0.28em; font-weight: bold; color: #000;">&bull;</div> </div> <div style="position: absolute; padding-left: 3.9em; padding-top: 4.05em; "> <div style="font-size: 1.47em; font-weight: bold; color: #000;">&bull;</div> </div> <div style="position: absolute; padding-left: 3.99em; padding-top: 4.23em;"> <div style="font-size: 1.2em; font-weight: bold; color: #FED90E;">&bull;</div> </div> <div style="position: absolute; padding-left: 3.66em; padding-top: 4.7em;"> <div style="font-size: 10px"> <div style="width: 4.6em; height: 3.88em; background-color: #FED90E;"></div> </div> </div> <div style="position: absolute; padding-left: 3.68em; padding-top: 3.36em;"> <div style="font-size: 1.2em; color: #000;">_</div></div><div style="position: absolute; padding-left: 3.68em; padding-top: 4.03em;"><div style="font-size: 1.2em; color: #000;">_</div></div><div style="position: absolute; padding-left: 3.64em; padding-top: 4.03em;"><div style="font-size: 1.2em; color: #000;">_</div></div><div style="position: absolute; padding-left: 1.96em; padding-top: 2.33em;"><div style="font-size: 3.04em; font-weight: bold; color: #000;">&bull;</div></div><div style="position: absolute; padding-left: 2.06em; padding-top: 2.5em;"><div style="font-size: 2.77em; font-weight: bold; color: #fff;">&bull;</div></div><div style="position: absolute; padding-left: 2.67em; padding-top: 4.23em;"><div style="font-size: 0.28em; font-weight: bold; color: #000;">&bull;</div></div><div style="position: absolute; padding-left: 1.46em; padding-top: 5.18em;"><div style="font-size: 0.66em; color: #000;">C</div></div><div style="position: absolute; padding-left: 1.47em; padding-top: 5.4em;"><div style="font-size: 0.66em; color: #000;">C</div></div><div style="position: absolute; padding-left: 1.62em; padding-top: 5.53em;"><div style="font-size: 10px"> <div style="width: 2.2em; height: 2.2em; background-color: #FED90E;"></div></div></div><div style="position: absolute; padding-left: 1.45em; padding-top: 5.19em;"><div style="font-size: 0.8em; font-weight: bold; color: #FED90E;">O</div></div><div style="position: absolute; padding-left: 1.58em; padding-top: 5.47em;"><div style="font-size: 0.25em; font-weight: bold; font-style: italic; color: #000;">(</div></div><div style="position: absolute; padding-left: 1.62em;  padding-top: 5.46em;"><div style="font-size: 0.25em; font-weight: bold; font-style: italic; color: #000;">-</div></div></div></div></div></div><div style="text-align:center;margin:20px auto;cursor:pointer;width:375px;height:20px;color:'+GM_getValue('MUP_color_href')+';" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="parent.document.location.href=\'http://www.romancortes.com/blog/homer-css/\'">Roman Cortes</div>';
	new_body_page = '<div id="gen_body" style="background-color:'+GM_getValue('MUP_color_bg')+';padding-top:15px;padding-bottom:'+(window.innerHeight/3)+'px;">';
		new_body_page += '<div id="old_body" style="display:'+(MUP_load?'none':'block')+';background-color:#FFF;width:100%;'+(MUP_downloadlink?'height:'+(MUP_Height+50)+'px;':'')+'min-height:550px;margin:auto;text-align:center;">'+body_ori+'</div>';
		new_body_page += '<div id="new_body" style="display:'+(MUP_load?'block':'none')+';">';
			new_body_page += '<div id="url_dl" style="font-size:16px; font-weight:bold;margin-bottom:8px">';
				new_body_page += '<a id="url_link" style="color:'+GM_getValue('MUP_color_href')+';" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" href="'+MUP_url_movie+'" title="'+MUP_LNG.link_mu_dl+' '+MUP_name_fic+'">'+MUP_name_fic+'</a>';
				new_body_page += '<span id="url_size" style="color:'+GM_getValue('MUP_color_text')+';font-size:smaller;margin-left:25px">'+MUP_taille_fic+'</span>';
				new_body_page += '<span id="url_plus" style="color:'+GM_getValue('MUP_color_href')+';margin-left:25px;" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;">&nbsp;</span>';
			new_body_page += '</div>';
			new_body_page += '<div style="color:'+GM_getValue('MUP_color_text')+';text-align:center;width:'+(MUP_Width-10)+'px;min-width:660px;margin:auto;border:4px groove;padding:0px">';
				new_body_page += Choix_view;
			new_body_page += '</div>';
			new_body_page += '<div id="frame_allocine" style="margin:auto;width:1050px;display:none"><iframe style="width:100%;height:'+MUP_Height+'px;border:none" src="http://www.allocine.fr/film/"></iframe></div>';
			new_body_page += '<div id="frame_imdb" style="margin:auto;width:1050px;display:none"><iframe style="width:100%;height:'+MUP_Height+'px;border:none" src="http://www.imdb.com/"></iframe></div>';
			new_body_page += '<div id="Movie_load" style="margin:auto;width:630px;height:'+(MUP_Height/2)+'px;display:'+(MUP_stream?'none':'block')+';text-align:center;padding-top:'+(MUP_Height/2)+'">';
				new_body_page += '<input id="Movie_url" type="text" size="100" value="" />';
			new_body_page += '</div>';
			new_body_page += '<div id="Div_Counter_MUP" style="margin:auto;width:630px;height:'+(MUP_Height/2)+'px;display:'+(MUP_stream?'block':'none')+';text-align:center;padding-top:'+(MUP_Height/2)+';font-size:24px;font-weight:bold;">';
				new_body_page += MUP_LNG.wait_thx+' <span id="Time_Counter_MUP">'+Counter_MUP+'</span> '+MUP_LNG.wait_sec;
			new_body_page += '</div>';
			new_body_page += '<object id="lecteur_divx" style="display:none;margin:auto;width:'+MUP_Width+'px;height:'+MUP_Height+'px" onmouseover="document.getElementById(\'MUP_MUP\').style.visibility=\'visible\'" type="video/divx" '+(MUP_stream?'data="'+MUP_url_movie+'"':'')+' codebase="http://download.divx.com/player/DivXBrowserPlugin.cab">';
			if (MUP_stream)
			{
				new_body_page += '<param name="src" value="'+MUP_url_movie+'" />';
			}
			new_body_page += '<param name="minVersion" value="1.3.0" />';
			if (Prev_img_Divx!='') new_body_page += '<param id="previewImage" name="previewImage" value="'+Prev_img_Divx+'" />';
			// for use Stagevu_gold ==> Download from http://stagevu.com/forum/viewtopic.php?id=940 and rename to Stagevu_gold.wps
			new_body_page += '<param name="custommode" value="Stagevu_gold" />';
			new_body_page += '<param name="autoPlay" value="'+GM_getValue('MUP_autoplay')+'" />';
			new_body_page += '<param name="AutoStart" value="'+GM_getValue('MUP_autoplay')+'" />';
			new_body_page += '<param name="wmode" value="transparent" />';
			new_body_page += '<param name="loop" value="false" />';
			new_body_page += '<div style="padding-top:50px">'+MUP_LNG.error_l1+MUP_LNG.error_l2+'<span style="color:'+GM_getValue('MUP_color_href')+';cursor:pointer" onmouseover="this.style.color=\''+GM_getValue('MUP_color_hover')+'\';return true;" onmouseout="this.style.color=\''+GM_getValue('MUP_color_href')+'\';return true;" onclick="location.reload();">'+MUP_LNG.error_l3+'</span>'+MUP_LNG.error_l4+'</div>';
			new_body_page += '</object>';

		new_body_page += '</div>';
		new_body_page += megaupload_footer;
		//new_body_page += '<div style="text-align:center;color:'+GM_getValue('MUP_color_bg')+'" ondblclick="window.open(\''+Prev_img_Divx+'\',\'Image_test\')">'+Prev_img_Divx+'</div>';
	new_body_page += '</div>';

	if (!document.getElementById('captchafield'))
	{
		Load_Stream();
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reprise code toggle autostart - Megaupload auto-fill captcha - http://userscripts.org/scripts/show/38736
/*
		function toggle_autostart(e)
		{
			if (GM_getValue('autostart', false))
			{
				GM_setValue('autostart', false);
				e.target.firstChild.nodeValue = 'Toggle auto-start (currently off)';
			}
			else
			{
				GM_setValue('autostart', true);
				e.target.firstChild.nodeValue = 'Toggle auto-start (currently on)';
				window.location.href = document.getElementById('downloadlink').firstChild.href;
			}
		}

		if (GM_getValue('autostart', false))
			var text = document.createTextNode('Toggle auto-start (currently on)');
		else
			var text = document.createTextNode('Toggle auto-start (currently off)');

		var link = document.createElement('a');
		link.appendChild(text);
		link.setAttribute('href', '#');
		link.style.color = '#FFF';
		link.style.fontSize = '10px';
		link.style.textDecoration = 'none';

		link.addEventListener('click', toggle_autostart, false);

		var span = document.getElementById('img_MU');
		span.appendChild(document.createElement('br'));
		span.appendChild(link);

		if (GM_getValue('autostart', false))
			window.location.href = document.getElementById('downloadlink').firstChild.href;
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
}


//****************************************************************
//		L e s   f o n c t i o n s   n é c e s s a i r e s
//****************************************************************

function Load_Stream()
{
	document.getElementsByTagName('body')[0].innerHTML = new_body_page;
	document.getElementById('url_plus').appendChild(createElement('span', {style:"cursor:pointer", title:""+MUP_LNG.othermovie+""} ,'click Load_Movie false','&gt;&gt;&gt;'));
	document.getElementById('Movie_load').appendChild(createElement('input', {type:"button", value:" "+MUP_LNG.othermovie+" "} ,'click Load_Movie false'));
	document.getElementById('Movie_load').appendChild(createElement('input', {type:"reset", value:" "+MUP_LNG.option_cancel+" "} ,'click Load_Movie false'));
	document.getElementById('gen_body').appendChild(createElement('div', {id:"MUP_MUP", style:"text-align:center;margin:150px auto 0px auto;width:375px;visibility:hidden;", onmouseover:"this.style.visibility=\"visible\""},'',MUP_MUP));
	countdown_MUP();
}

function countdown_MUP()
{
	if (Counter_MUP > 0)
	{
		Counter_MUP--;
		if(Counter_MUP == 0)
		{
			document.getElementById('lecteur_divx').style.display = 'block';
			document.getElementById('Div_Counter_MUP').style.display = 'none';
		}
		if(Counter_MUP > 0)
		{
			document.getElementById("Time_Counter_MUP").innerHTML = Counter_MUP;
			setTimeout(countdown_MUP,1000);
		}
	}
}

//****************************************************************
//		N e w   M o v i e
//****************************************************************
function Load_Movie()
{
	if (document.getElementById('frame_allocine').style.display=='block' || document.getElementById('frame_imdb').style.display=='block')
	{
		document.getElementById('lecteur_divx').style.display='block';
	}
	document.getElementById('frame_allocine').style.display='none';
	document.getElementById('frame_imdb').style.display='none';
	if(document.getElementById('lecteur_divx').style.visibility=='hidden')
		document.getElementById('lecteur_divx').style.marginBottom='0px';
	if(document.getElementById('lecteur_divx').style.display=='block')
	{
		document.getElementById('lecteur_divx').style.display='none';
		document.getElementById('Movie_load').style.display='block';
	}
	else
	{
	    if(Counter_MUP==0)
	    {
			if (timeout) clearTimeout(timeout);
			if (this.type!='button' || (document.getElementById('Movie_url').value!='' && document.getElementById('Movie_url').value.substring(0,7)=='http://'))
			{
				document.getElementById('Movie_load').style.display='none';
				document.getElementById('lecteur_divx').style.visibility='visible';
				document.getElementById('lecteur_divx').style.display='block';
				if (this.type=='button')
				{
					var MUP_url_movie_new	= document.getElementById('Movie_url').value;
					var MUP_name_fic_new    = decodeURIComponent(MUP_url_movie_new.substring(MUP_url_movie_new.lastIndexOf('/')+1,MUP_url_movie_new.length));
					document.getElementById('url_link').href		= MUP_url_movie_new;
					document.getElementById('url_link').title		= MUP_LNG.link_mu_dl+' '+MUP_name_fic_new;
					document.getElementById('url_link').innerHTML	= MUP_name_fic_new;
					document.getElementById('Movie_url').value		= '';
					document.getElementById('url_size').innerHTML	= '';
					timeout = setTimeout('document.getElementById(\'lecteur_divx\').Open(\''+MUP_url_movie_new+'\')', 3000);
				}
			}
			else
				alert(MUP_LNG.option_error_url);
		}
	}
}

//****************************************************************
//		D i v   o p t i o n   0 1
//****************************************************************
function options_MUP()
{
	if(document.getElementById('div_MUP_options'))	return;

	document.getElementById('view_choice').style.visibility='hidden';
	document.getElementById('frame_allocine').style.display='none';
	document.getElementById('frame_imdb').style.display='none';
	if(document.getElementById('lecteur_divx').style.visibility=='hidden')
		document.getElementById('lecteur_divx').style.marginBottom='0px';
	if(document.getElementById('lecteur_divx').style.display=='none')
	{
		document.getElementById('lecteur_divx').style.display='block';
		document.getElementById('Movie_load').style.display='none';
	}
	document.getElementById('lecteur_divx').style.visibility='hidden';

	var html_MUP_options = '<input id="MUP_input_color" type="hidden" value="" />\n';
	var MUP_label_plus = 'title="'+MUP_LNG.option_setDefaut+'" style="cursor:help"'
	html_MUP_options += '<div style="font-weight:bold;text-align:center;color:#000;margin:auto;">'+MUP_LNG.opt_title+' '+MUP_LNG.name+'</div>\n';
		html_MUP_options += '<hr />\n';

		html_MUP_options += '<div class="MUP_option_cols">\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label for="MUP_lng_choice">'+MUP_LNG.option_lng+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<select id="MUP_lng_choice">\n';
					html_MUP_options += '<option value="auto" '+(GM_getValue('MUP_lng')=='auto'?'selected="selected"':'')+'>Auto</option>\n';
					html_MUP_options += '<option value="fr" '+(GM_getValue('MUP_lng')=='fr'?'selected="selected"':'')+'>Français</option>\n';
					html_MUP_options += '<option value="en" '+(GM_getValue('MUP_lng')=='en'?'selected="selected"':'')+'>English</option>\n';
				html_MUP_options += '</select>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label '+MUP_label_plus+' for="MUP_BGC" onclick="document.getElementById(\'MUP_BGC\').value=\''+MUP_color_bg_dft+'\';document.getElementById(\'MUP_BGC_button\').style.backgroundColor=\''+MUP_color_bg_dft+'\'">'+MUP_LNG.option_bg+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div id="MUP_color_BGC" class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_BGC" size="6" maxlength="7" type="texte" value="'+GM_getValue('MUP_color_bg')+'" onkeyup="document.getElementById(\'MUP_BGC_button\').style.backgroundColor=this.value" />\n';
				html_MUP_options += '<button id="MUP_BGC_button" onclick="document.getElementById(\'MUP_input_color\').value=\'MUP_BGC\';document.getElementById(\'MUP_div_colors\').style.display=\'block\';" class="MUP_color_button" style="background-color:'+GM_getValue('MUP_color_bg')+'"></button>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label '+MUP_label_plus+' for="MUP_TC" onclick="document.getElementById(\'MUP_TC\').value=\''+MUP_color_text_dft+'\';document.getElementById(\'MUP_TC_button\').style.backgroundColor=\''+MUP_color_text_dft+'\'">'+MUP_LNG.option_txt+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_TC" size="6" maxlength="7" type="texte" value="'+GM_getValue('MUP_color_text')+'" onkeyup="document.getElementById(\'MUP_TC_button\').style.backgroundColor=this.value" />\n';
				html_MUP_options += '<button id="MUP_TC_button" onclick="document.getElementById(\'MUP_input_color\').value=\'MUP_TC\';document.getElementById(\'MUP_div_colors\').style.display=\'block\';" class="MUP_color_button" style="background-color:'+GM_getValue('MUP_color_text')+'"></button>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label '+MUP_label_plus+' for="MUP_HrC" onclick="document.getElementById(\'MUP_HrC\').value=\''+MUP_color_href_dft+'\';document.getElementById(\'MUP_HrC_button\').style.backgroundColor=\''+MUP_color_href_dft+'\'">'+MUP_LNG.option_href+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_HrC" size="6" maxlength="7" type="texte" value="'+GM_getValue('MUP_color_href')+'" onkeyup="document.getElementById(\'MUP_HrC_button\').style.backgroundColor=this.value" />\n';
				html_MUP_options += '<button id="MUP_HrC_button" onclick="document.getElementById(\'MUP_input_color\').value=\'MUP_HrC\';document.getElementById(\'MUP_div_colors\').style.display=\'block\';" class="MUP_color_button" style="background-color:'+GM_getValue('MUP_color_href')+'"></button>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label '+MUP_label_plus+' for="MUP_HoC" onclick="document.getElementById(\'MUP_HoC\').value=\''+MUP_color_hover_dft+'\';document.getElementById(\'MUP_HoC_button\').style.backgroundColor=\''+MUP_color_hover_dft+'\'">'+MUP_LNG.option_hover+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_HoC" size="6" maxlength="7" type="texte" value="'+GM_getValue('MUP_color_hover')+'" onkeyup="document.getElementById(\'MUP_HoC_button\').style.backgroundColor=this.value" />\n';
				html_MUP_options += '<button id="MUP_HoC_button" onclick="document.getElementById(\'MUP_input_color\').value=\'MUP_HoC\';document.getElementById(\'MUP_div_colors\').style.display=\'block\';" class="MUP_color_button" style="background-color:'+GM_getValue('MUP_color_hover')+'"></button>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

		html_MUP_options += '</div>\n';
		html_MUP_options += '<div class="MUP_option_cols">\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label '+MUP_label_plus+' for="MUP_W" onclick="document.getElementById(\'MUP_W\').value=\'Auto\'">'+MUP_LNG.option_width+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_W" size="8" maxlength="4" type="texte" value="'+GM_getValue('MUP_Width')+'" />\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label '+MUP_label_plus+' for="MUP_H" onclick="document.getElementById(\'MUP_H\').value=\'Auto\'">'+MUP_LNG.option_height+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_H" size="8" maxlength="4" type="texte" value="'+GM_getValue('MUP_Height')+'" />\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label for="MUP_format" title="'+MUP_LNG.MUP_format_auto_T+'" style="cursor:help">'+MUP_LNG.MUP_format_auto+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input name="MUP_format" type="radio" '+(GM_getValue('MUP_ratio')=='1.78'?'checked="checked"':'')+'" value="1.78" /><sup>16</sup>/<sub>9</sub>\n';
				html_MUP_options += '<input name="MUP_format" type="radio" '+(GM_getValue('MUP_ratio')=='1.60'?'checked="checked"':'')+'" value="1.60" /><sup>16</sup>/<sub>10</sub>\n';
				html_MUP_options += '<input name="MUP_format" type="radio" '+(GM_getValue('MUP_ratio')=='1.33'?'checked="checked"':'')+'" value="1.33" /><sup>4</sup>/<sub>3</sub>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label for="MUP_AP" title="'+MUP_LNG.option_autoplay_pb+'" style="cursor:help">'+MUP_LNG.option_autoplay+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<input id="MUP_AP" type="checkbox" '+(GM_getValue('MUP_autoplay')=='true'?'checked="checked"':'')+'" />\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

			html_MUP_options += '<div class="MUP_option_texte">\n';
				html_MUP_options += '<label for="MUP_UP_choice" style="cursor:help">'+MUP_LNG.option_update+':</label>\n';
			html_MUP_options += '</div>\n';
			html_MUP_options += '<div class="MUP_option_valeur">\n';
				html_MUP_options += '<select id="MUP_UP_choice">\n';
				for (var d=1 ; d<8 ; d++)
					html_MUP_options += '<option value="'+d+'" '+(d==GM_getValue('MUP_FreqUpdate') ? 'selected="selected"':'')+'>'+d+' '+(d>1?MUP_LNG.option_days:MUP_LNG.option_day)+'</option>\n';
				html_MUP_options += '</select>\n';
			html_MUP_options += '</div>\n';

			html_MUP_options += '<br style="clear:both;"/>\n';

		html_MUP_options += '</div>\n';
		html_MUP_options += '<br style="clear:both;" />\n';

		html_MUP_options += '<hr />\n';

		html_MUP_options += '<div style="text-align:center">\n';
			html_MUP_options += '<label for="MUP_load">'+MUP_LNG.option_autoload+':</label>\n';
			html_MUP_options += '<input id="MUP_load" type="checkbox" '+(GM_getValue('MUP_autoload')!='false'?'checked="checked"':'')+'" />\n';
		html_MUP_options += '</div>\n';

		html_MUP_options += '<hr />\n';

	html_MUP_options += '</div>\n';

	//****************************************************************
	//		D i v   c o u l e u r s
	//****************************************************************
	var MUP_hexacolor = '0369CF';
	var MUP_count = MUP_hexacolor.length;
	var MUP_web_colors = '<div id="MUP_div_colors" style="display:none;text-align:center">\n';
	MUP_web_colors += '<div style="float:right;font-weight:bold;cursor:pointer" onclick="document.getElementById(\'MUP_div_colors\').style.display=\'none\'" >X</div>\n';
	MUP_web_colors += '<table style="border:none;margin:auto;padding:0px" cellspacing="0">\n';
	for (var MUP_red=0; MUP_red<MUP_count; MUP_red++)
	{
		MUP_web_colors += ' <tr>\n';
		for (MUP_green=0; MUP_green<MUP_count; MUP_green++)
		{
			for (var MUP_blue=0; MUP_blue<MUP_count; MUP_blue++)
			{
				var MUP_string = MUP_hexacolor[MUP_red] + MUP_hexacolor[MUP_green] + MUP_hexacolor[MUP_blue];
				var MUP_color = '#' + MUP_hexacolor[MUP_red] + MUP_hexacolor[MUP_red] + MUP_hexacolor[MUP_green] + MUP_hexacolor[MUP_green] + MUP_hexacolor[MUP_blue] + MUP_hexacolor[MUP_blue];
				var MUP_colorvalue = '' + MUP_hexacolor[MUP_red] + MUP_hexacolor[MUP_red] + MUP_hexacolor[MUP_green] + MUP_hexacolor[MUP_green] + MUP_hexacolor[MUP_blue] + MUP_hexacolor[MUP_blue];
				MUP_web_colors += ' <td style="padding:0px; height:12px; width:12px; font-size:2px; line-height:12px;" >';
				MUP_web_colors += '<button value="' + MUP_color + '" title="' + MUP_color + '" onclick="document.getElementById(document.getElementById(\'MUP_input_color\').value+\'_button\').style.backgroundColor=this.value;document.getElementById(document.getElementById(\'MUP_input_color\').value).value=this.value;document.getElementById(\'MUP_div_colors\').style.display=\'none\';" style="cursor:pointer;border:none;padding:0px; height:11px; width:11px; line-height:11px; background-color:' + MUP_color + '"></button>';
				MUP_web_colors += '</td>\n';
			}
		}
		MUP_web_colors += '</tr>\n';
	}
	MUP_web_colors += '</table>\n';
	MUP_web_colors += '<hr /></div>';

	html_MUP_options += MUP_web_colors;

	base_MUP_options = createElement('div', {id:"div_MUP_options"},'',html_MUP_options);
	document.body.appendChild(base_MUP_options);

	base_MUP_options.appendChild(createElement('div',{id:"div_MUP_options_OK", style:"text-align:center"}));
	// save "button"
	document.getElementById('div_MUP_options_OK').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.option_save+"", class:"MUP_button"}, 'click save_options_MUP false'));
	// close "button"
	document.getElementById('div_MUP_options_OK').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('div_MUP_options_OK').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.option_cancel+"", class:"MUP_button"}, 'click close_options_MUP false'));
}
function save_options_MUP(evt)
{
	if (document.getElementById('MUP_lng_choice').value != '')	GM_setValue('MUP_lng',document.getElementById('MUP_lng_choice').value);
	if (document.getElementById('MUP_BGC').value != '')			GM_setValue('MUP_color_bg',document.getElementById('MUP_BGC').value);
	if (document.getElementById('MUP_TC').value != '')			GM_setValue('MUP_color_text',document.getElementById('MUP_TC').value);
	if (document.getElementById('MUP_HrC').value != '')			GM_setValue('MUP_color_href',document.getElementById('MUP_HrC').value);
	if (document.getElementById('MUP_HoC').value != '')			GM_setValue('MUP_color_hover',document.getElementById('MUP_HoC').value);
	if (document.getElementById('MUP_W').value == 'Auto')		GM_setValue('MUP_Width','Auto');
	else														GM_setValue('MUP_Width',document.getElementById('MUP_W').value);
	if (document.getElementById('MUP_H').value == 'Auto')		GM_setValue('MUP_Height','Auto');
	else														GM_setValue('MUP_Height',document.getElementById('MUP_H').value);
	for (var i=0 ; i < document.getElementsByName('MUP_format').length ; i++)
	{
		if (document.getElementsByName('MUP_format')[i].checked)
		{
			GM_setValue('MUP_ratio',document.getElementsByName('MUP_format')[i].value);
			break;
		}
	}
	if (document.getElementById('MUP_AP').checked)		GM_setValue('MUP_autoplay','true');
	else												{try {GM_deleteValue('MUP_autoplay');} catch(Err){};}
	GM_setValue('MUP_FreqUpdate',document.getElementById('MUP_UP_choice').value);
	if (document.getElementById('MUP_load').checked)	{try {GM_deleteValue('MUP_autoload');} catch(Err){};}
	else												GM_setValue('MUP_autoload','false');
	close_options_MUP();
	document.location.reload(false);
}
function close_options_MUP(evt)
{
	base_MUP_options.parentNode.removeChild(base_MUP_options);
	if(!document.getElementById('div_MUP_options_bg'))
	{
		if(document.getElementById('lecteur_divx'))
			document.getElementById('lecteur_divx').style.visibility='visible';
		if(document.getElementById('view_choice'))
			document.getElementById('view_choice').style.visibility='visible';
	}
}

//****************************************************************
//		D i v   o p t i o n   0 2
//****************************************************************
function options_bg_MUP(evt)
{
	if(document.getElementById('div_MUP_options_bg'))	return;

	document.getElementById('view_choice').style.visibility='hidden';
	document.getElementById('frame_allocine').style.display='none';
	document.getElementById('frame_imdb').style.display='none';
	if(document.getElementById('lecteur_divx').style.visibility=='hidden')
		document.getElementById('lecteur_divx').style.marginBottom='0px';
	if(document.getElementById('lecteur_divx').style.display=='none')
	{
		document.getElementById('lecteur_divx').style.display='block';
		document.getElementById('Movie_load').style.display='none';
	}
	document.getElementById('lecteur_divx').style.visibility='hidden';

	var MUP_width_options_bg = window.innerWidth - 200;
	var MUP_nbImg_options_bg = Math.floor(MUP_width_options_bg/80);

	MUP_options_TabImg = GM_getValue('MUP_TabImg').split(';');
	var html_MUP_options_bg = '';
	html_MUP_options_bg += '<div id="MUP_div_check_bg" style="font-weight:bold;text-align:center;color:#000;margin:auto;">';
		html_MUP_options_bg += MUP_LNG.option_bg_title_01+' ';
		if (MUP_options_TabImg.length>1)	html_MUP_options_bg += '('+MUP_options_TabImg[0]+') ';
		html_MUP_options_bg += MUP_LNG.name+' ';
	html_MUP_options_bg += '</div>\n';

	html_MUP_options_bg += '<div id="MUP_preview_img" style="text-align:center;display:none;">\n';
		html_MUP_options_bg += '<hr />\n';
		if (MUP_options_TabImg.length>1)
		{
			html_MUP_options_bg += '<div style="overflow:auto;'+(Math.ceil((MUP_options_TabImg.length-1)/7)>3?'height:150px;':'')+'">\n';
				for (var i=MUP_options_TabImg.length-1; i > 0; i--)
				{
					html_MUP_options_bg += '<img onclick="document.getElementById(\'MUP_url_bg\').value=this.src" style="height:50px;max-width:80px;vertical-align:middle;cursor:pointer;" src="'+unescape(MUP_options_TabImg[i])+'" alt="'+MUP_LNG.option_error_find+'" title="'+(i<10?'0'+i:i)+' : '+unescape(MUP_options_TabImg[i])+'" />';
				}
			html_MUP_options_bg += '</div>\n';
		}
		else
		{
				html_MUP_options_bg += MUP_LNG.option_bg_noneImg;
		}
	html_MUP_options_bg += '</div>\n';
	html_MUP_options_bg += '<hr />\n';
	html_MUP_options_bg += '<div style="text-align:center;color:#000;margin:auto;">\n';
		html_MUP_options_bg += '<span style="font-weight:bold;cursor:pointer;" title="'+MUP_LNG.option_bg_see+' '+MUP_LNG.option_bg_title_02+'" onclick="if(document.getElementById(\'MUP_url_bg\').value.match(\'http://\')) window.open(document.getElementById(\'MUP_url_bg\').value, \'Preview\', \'fullscreen,scrollbars=yes\')">'+MUP_LNG.option_bg_title_02+':</span> <input id="MUP_url_bg" size="80" type="texte" />\n';
		html_MUP_options_bg += '<span style="font-weight:bold;cursor:pointer;font-size:18px" onclick="document.getElementById(\'MUP_url_bg\').value=\'\'">&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span>\n';
	html_MUP_options_bg += '</div>\n';
	html_MUP_options_bg += '<hr />\n';

	base_MUP_options_bg = createElement('div', {id:"div_MUP_options_bg"},'',html_MUP_options_bg);
	document.body.appendChild(base_MUP_options_bg);

	// Check "checkbox"
	if (GM_getValue('MUP_bg_actif')=='true')
	{
		document.getElementById('MUP_div_check_bg').appendChild(createElement('input',{id:"MUP_check_bg", type:"checkbox", checked:"checked"}, 'click save_options_bg_MUP false'));
		document.getElementById('MUP_div_check_bg').appendChild(createElement('span',{id:"MUP_check_valid", style:"font-style:italic"}, '', ' On'));
	}
	else
	{
		document.getElementById('MUP_div_check_bg').appendChild(createElement('input',{id:"MUP_check_bg", type:"checkbox"}, 'click save_options_bg_MUP false'));
		document.getElementById('MUP_div_check_bg').appendChild(createElement('span',{id:"MUP_check_valid", style:"font-style:italic"}, '', ' Off'));
	}

	document.getElementById('MUP_div_check_bg').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('MUP_div_check_bg').appendChild(createElement('input',{id:"MUP_preview_button", type:"button", value:""+MUP_LNG.option_bg_see+"", class:"MUP_button"}, 'click seeImg_options_bg_MUP false'));
	document.getElementById('MUP_div_check_bg').appendChild(createElement('input',{id:"MUP_del_all_button", type:"button", value:""+MUP_LNG.option_bg_delAll+"", class:"MUP_button"}, 'click delAll_options_bg_MUP false'));
	document.getElementById('MUP_div_check_bg').appendChild(createElement('br',{style:"clear:both"}));

	base_MUP_options_bg.appendChild(createElement('div',{id:"div_MUP_options_bg_OK", style:"text-align:center"}));

	// Add "button"
	document.getElementById('div_MUP_options_bg_OK').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.option_bg_add+"", class:"MUP_button"}, 'click add_options_bg_MUP false'));

	// Del "button"
	document.getElementById('div_MUP_options_bg_OK').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('div_MUP_options_bg_OK').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.option_bg_del+"", class:"MUP_button"}, 'click del_options_bg_MUP false'));

	// close "button"
	document.getElementById('div_MUP_options_bg_OK').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('div_MUP_options_bg_OK').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.option_close+"", class:"MUP_button"}, 'click close_options_bg_MUP false'));
}
function seeImg_options_bg_MUP(evt)
{
	if (document.getElementById('MUP_preview_img').style.display=='none')
	{
		document.getElementById('MUP_preview_img').style.display = 'block';
		document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_hide;
	}
	else
	{
		document.getElementById('MUP_preview_img').style.display = 'none';
		document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_see;
	}
}
function add_options_bg_MUP(evt)
{
	if (document.getElementById('MUP_url_bg').value=='' || document.getElementById('MUP_url_bg').value.substring(0,7)!='http://')
	{
		alert(MUP_LNG.option_error_url);
	}
	else
	{
		MUP_TabImg_info = GM_getValue('MUP_TabImg').split(';');
		MUP_TabImg_info[0] = (parseInt(MUP_TabImg_info.length)-1)+1;
		MUP_TabImg_info.splice(MUP_TabImg_info.length,1,escape(document.getElementById('MUP_url_bg').value));
		GM_setValue('MUP_TabImg', MUP_TabImg_info.join(';'));
		var test_display = document.getElementById('MUP_preview_img').style.display;
		close_options_bg_MUP();
		options_bg_MUP();
		document.getElementById('MUP_preview_img').style.display = test_display;
		if (test_display=='block')	document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_hide;
		else						document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_see;
	}
}
function delAll_options_bg_MUP(evt)
{

	document.getElementById('MUP_preview_img').style.display = 'block';
	document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_hide;
	if (GM_getValue('MUP_TabImg')!=0 && confirm(MUP_LNG.option_mess_delAll))
	{
		GM_setValue('MUP_TabImg','0');
		close_options_bg_MUP();
		options_bg_MUP();
	}
}
function del_options_bg_MUP(evt)
{
	if (document.getElementById('MUP_url_bg').value=='' || document.getElementById('MUP_url_bg').value.substring(0,7)!='http://')
	{
		alert(MUP_LNG.option_error_url);
	}
	else
	{
		MUP_TabImg_info = GM_getValue('MUP_TabImg').split(';');
		for(var i=1; i<MUP_TabImg_info.length; i++)
		{
			if(MUP_TabImg_info[i]==escape(document.getElementById('MUP_url_bg').value))
			{
				var MUP_find_img = true;
				MUP_TabImg_info[0] = (parseInt(MUP_TabImg_info.length)-1)-1;
				MUP_TabImg_info.splice(i,1);
				GM_setValue('MUP_TabImg', MUP_TabImg_info.join(';'));
				break;
			}
		}
		if (MUP_find_img)
		{
			var test_display = document.getElementById('MUP_preview_img').style.display;
			close_options_bg_MUP();
			options_bg_MUP();
			document.getElementById('MUP_preview_img').style.display = test_display;
			if (test_display=='block')	document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_hide;
			else						document.getElementById('MUP_preview_button').value = MUP_LNG.option_bg_see;
		}
		else alert ('/!\\  '+MUP_LNG.option_error_find+'  /!\\\n\n'+document.getElementById('MUP_url_bg').value);
	}
}
function save_options_bg_MUP(evt)
{
	if (document.getElementById('MUP_check_bg').checked)
	{
		GM_setValue('MUP_bg_actif','true');
		document.getElementById('MUP_check_valid').innerHTML=' On';
	}
	else
	{
		GM_setValue('MUP_bg_actif','false');
		document.getElementById('MUP_check_valid').innerHTML=' Off';
	}
}
function close_options_bg_MUP(evt)
{
	base_MUP_options_bg.parentNode.removeChild(base_MUP_options_bg);
	if(!document.getElementById('div_MUP_options'))
	{
		if(document.getElementById('lecteur_divx'))
			document.getElementById('lecteur_divx').style.visibility='visible';
		if(document.getElementById('view_choice'))
			document.getElementById('view_choice').style.visibility='visible';
	}
}


//****************************************************************
//	functions by Userscripts Updater - http://userscripts.org/scripts/show/26062
//****************************************************************
function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	}

	if(html)
		node.innerHTML = html;

	return node;
}
function getCSS()
{
	var html_css = '';
	html_css += '#new_body {color:'+GM_getValue('MUP_color_text')+'; width:100%; margin:auto; text-align:center; display:block;}';
	html_css += '#div_MUP_options {font-variant:small-caps;position:fixed; margin:auto; width:600px; bottom:10px; left:'+(((window.innerWidth-600)/2)-26)+'px; z-index:1000; background-color:#FFCC66; padding:5px 8px 5px 8px; -moz-border-radius:5px; font-size:small;}';
	html_css += '#div_MUP_update {text-align:center;font-variant:small-caps;position:fixed; margin:auto; width:600px; top:2px; left:'+(((window.innerWidth-600)/2)-26)+'px; z-index:10000000000; background-color:#FFCC66; padding:5px 8px 5px 8px; -moz-border-radius:5px; font-size:small;}';
	html_css += '#div_MUP_options_bg {font-variant:small-caps;position:fixed; margin:auto; width:600px; top:50px; left:'+(((window.innerWidth-600)/2)-26)+'px; z-index:1100; background-color:#FFCC66; padding:5px 8px 5px 8px; -moz-border-radius:5px; font-size:small;}';
	html_css += 'div.MUP_option_cols {float: left; width:50%;}';
	html_css += 'div.MUP_option_texte {float: left; width:150px; height:25px;}';
	html_css += 'div.MUP_option_valeur {float: left; width:150px; height:25px;}';
	html_css += 'button.MUP_color_button {width:21px; height:21px; vertical-align:middle; margin:-1px 0px 0px 3px; border:1px solid #FFF; margin-bottom:3px; cursor:pointer}';
	html_css += 'input.MUP_button {width:100px; height:25px; background-color:#FFF; color:#000; font-size:11px; font-variant:small-caps; -moz-border-radius:10px;}';
	html_css += 'input.MUP_button:hover {font-weight:bold; background-color:#000; color:FFCC66;}';
	html_css += '#MUP_preview_button {width:110px; float:right;}';
	html_css += '#MUP_del_all_button {width:110px; float:left;}';

	var css = createElement('style',{type:"text/css"},null,html_css);
	return css;
}

//****************************************************************
//		U p d a t e
//****************************************************************

function check_MUP_version(evt)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+MUP_id+'.meta.js',
		onload: function(responseDetails)
		{
			try
			{
				MUP_currentVersion = parseInt(responseDetails.responseText.match(/\@uso\:version\s+(\d+)/)[1]);
				if(GM_getValue('MUP_Version') == 0) GM_setValue('MUP_Version', MUP_currentVersion);
				if (GM_getValue('MUP_Version') < MUP_currentVersion)
				{
					new_MUP_version();
				}
				else if(evt=='menu')
				{
					alert (MUP_LNG.verify_noresult);
				}
				else
				{
					GM_setValue('MUP_DateUpdate', MUP_today_YYYYMMDD);
					try {GM_deleteValue('MUP_DateLater');} catch(Err){};
				}
			}
			catch(Err) {}
		}
	});
}
function ForceCheck_MUP_version(evt)
{
	check_MUP_version('menu');
}
function new_MUP_version(evt)
{
	if(document.getElementById('div_MUP_update'))	return;
	html_MUP_update = MUP_LNG.title_update_new+' '+MUP_LNG.name+':<div style="float:right;font-weight:bold;cursor:pointer" onclick="this.parentNode.parentNode.removeChild(document.getElementById(\'div_MUP_update\'))">X</div>\n';

	base_MUP_update = createElement('div', {id:"div_MUP_update"},'',html_MUP_update);
	document.body.appendChild(base_MUP_update);
	// update "button"
	document.getElementById('div_MUP_update').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('div_MUP_update').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.update_button+"", class:"MUP_button"}, 'click update_MUP false'));
	// later "button"
	document.getElementById('div_MUP_update').appendChild(createElement('span','','','&nbsp;&nbsp;&nbsp;'));
	document.getElementById('div_MUP_update').appendChild(createElement('input', {type:"button", value:""+MUP_LNG.later_button+"", class:"MUP_button"}, 'click update_later_MUP false'));
}
function update_MUP()
{
	base_MUP_update.parentNode.removeChild(base_MUP_update);
	GM_setValue('MUP_Version', MUP_currentVersion);
	GM_setValue('MUP_DateUpdate', MUP_today_YYYYMMDD);
	try {GM_deleteValue('MUP_DateLater');} catch(Err){};
	GM_openInTab('http://userscripts.org/scripts/source/'+MUP_id+'.user.js');
}
function update_later_MUP()
{
	GM_setValue('MUP_DateLater', MUP_today_YYYYMMDD+1);
	base_MUP_update.parentNode.removeChild(base_MUP_update);
}