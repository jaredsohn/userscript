// ==UserScript==

// @name           	Series.ly TOP Series y Películas Skins

// @description    	Modifica Series.y para darle un estilo caracteristico de la serie que se mire.

// @creators	   	Marc J. ()
// @creators		Ivan M. (http://series.ly/@IvanBM93)
// @creators		Sergio P. (http://series.ly/@Darks88)
// @creators		Montuno (http://series.ly/@Montuno)
// @creators		MisSeries (http://series.ly/@misseries)

// @namespace      	http://cor.to/LMq

// @include        	*series.ly/*

// @exclude	   		http://series.ly/scripts/player/*
// @exclude	   		http://new.series.ly/scripts/player/*

// @license       	Public Domain

// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// @version        	1.4.1.d

// @history             1.4.1d Cambio de hospedaje de las imágenes. Las antiguas se elimnarán de su servidor y si no se ha actualizado, el script será inservible.
// @history             1.4.1c Añadidos nuevos fondos. Suman 86 series y 10 peliculas.
// @history             1.4.1b Añadidos nuevos fondos. Suman 56 series y 10 peliculas.
// @history             1.4.1b Añadidos nuevos fondos. Suman 56 series y 10 peliculas.
// @history 		1.4.1a Añadidos nuevos fondos. Suman 27 series y 10 peliculas.
// @history 		1.4.1  Añadido aviso de actualización del script.
// @history 		1.4.0  Añadido boton de "Ir arriba" gracias a @misserie.
// @history 		1.3.0  Agregada opacidad al cuerpo de la página para ver la imagen de fondo en su totalidad.
// @history 		1.3.0  Añadido redimensionamiento automatico de la imagen al tamaño de la ventana.
// @history 		1.2.0  Añadidos fondos de peliculas mas puntuadas.

// ==/UserScript==


/* Aviso de actualización del script */
var SUC_script_num = 110211; // ID del Script

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 2 <= (new Date().getTime()))) // Una hora, 3600. Ahora se cimprueba cada 2 segundos
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version != local_version)
							{
								if(confirm('Hay una nueva versión del script "'+script_name+'."\n¿Quieres actualizar ahora?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No hay nuevas versiones del script "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('Ocurrió un error cuando se estaba actualizando:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}
/* Fin aviso de actualización del script */


/* No borrar la linea de abajo */

var url=document.location.href;
 


	/* SERIES */

		/* 1 Doctor Who */
			if(url.indexOf('serie-3E4WZUCVR7')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px #c88e2b; opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-PXcHQpTiL6E/Tko34r5KLnI/AAAAAAAAAgM/OCYXM7W2JSc/s1024/dr%252520who.png);background-attachment: fixed;background-size: 100% 100%, auto;} h4 {color: #000088}";} 
		/* 2 How I Meet Your Mother */
			else if(url.indexOf('serie-5HHY9YEFN7')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-ptQte1jUBEQ/Tko3h5yMlMI/AAAAAAAAAgI/jXIlagv5qPI/s1024/fondo%252520himym.png);background-attachment: fixed;background-size: 100% 100%, auto}";}
		/* 3 Dexter */
			else if(url.indexOf('serie-NWX9ZF3XCT')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px red;opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-s4V78te2dmk/Tko8KcBEKuI/AAAAAAAAAhs/TSbp-91i_9I/s1024/fondo_dexter.png);background-attachment: fixed;background-size: 100% 100%, auto;} h4 {color: red}";}
		/* 4 Fringe */
			else if(url.indexOf('serie-2EF4F6T6CZ')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-1PLp5FSEHWg/Tko95xmrj8I/AAAAAAAAAiQ/pzrSvBG6Bg4/s1024/fondo_fringe2.png);background-attachment:fixed;background-size: 100% 100%, auto;}";}
		/* 5 Game of Thrones */
			else if(url.indexOf('serie-USXVARC592')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/--mtioJvZUQs/Tko_NLGMLfI/AAAAAAAAAis/4cOadFMpWsQ/s1024/fondo_got.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 6 The Big Bang Thepry */
			else if(url.indexOf('serie-2V675K5Y2R')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-WvC8pAlGxcs/TkpE30WWd8I/AAAAAAAAAkQ/t9C7m2_xL-g/s1024/fondo_tbbt.jpg);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 7 The Walking Dead */
			else if(url.indexOf('serie-NU7FNW7ERR')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px black;opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-YU_wNjE2Ugg/Tko4Ak7P1gI/AAAAAAAAAgQ/8JudfF6l11g/s1024/fondo%252520twd.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 8 La que se avecina */
			else if(url.indexOf('serie-S3X34ER3K6')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px darkblue;opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-1M3yinbRpVs/TkpHPBTizwI/AAAAAAAAAlE/5nFb9xkbSBk/s1024/lqsa_azul.png);background-attachment:fixed;background-size: 100% 100%, auto;} h4 {color: darkblue}";}
		/* 9 True Blood */
			else if(url.indexOf('serie-W5AEY6EYVE')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px black;opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-Sgrx84sEdno/TkpGdRGgCEI/AAAAAAAAAkw/5hDbj30axL4/s1024/fondo_true_blood.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 10 Pretty Little Liars */
			else if(url.indexOf('serie-59K54YE435')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-wR6Q5rPTYPY/TkpDiOFkPOI/AAAAAAAAAj4/xUHF2lt1zMk/s1024/fondo_pll.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 11 Lost */
			else if(url.indexOf('serie-VY9PPTV6KH')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-nPkOcgJ4D48/TkpAPdIMUKI/AAAAAAAAAjI/qj_eIZ-jNYQ/s1024/fondo_lost.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 12 Friends */
			else if(url.indexOf('serie-NDRZ6A6XS7')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-kWJWfws85lU/Tko9iTb98VI/AAAAAAAAAiM/NOxJHngtbUI/s1024/fondo_friends.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 13 Goship Girl */
			else if(url.indexOf('serie-YERHC7H69X')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-d2AuQNFAU9k/Tko-v8AACiI/AAAAAAAAAik/q6WIyLfEmlc/s1024/fondo_goship_girl.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 14 Futurama */
			else if(url.indexOf('serie-VKSK4UKFSZ')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-roCsTh9gqCA/Tko-XZX3uMI/AAAAAAAAAic/-E8eXNiazO0/s1024/fondo_futurama.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 15 Breaking Bad */
			else if(url.indexOf('serie-7HV4DXUHE5')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-iFg9Izb6wm0/Tko6j2kPpSI/AAAAAAAAAhA/O6CfvzueeIU/s1024/fondo_bb.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 16 Anatomia de Grey */
			else if(url.indexOf('serie-3ZHZR2PDYW')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-AovQDm_EkGU/Tko5WOXqXEI/AAAAAAAAAgs/Fl2R1lMQwE0/s1024/fondo_anatomia.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 17 Eureka */
			else if(url.indexOf('serie-TWHVY7TTHK')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-9tht0m19ZuA/Tko9TJC-ncI/AAAAAAAAAiI/GIJRUcI2dHo/s1024/fondo_eureka.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 18 Galactik Football */
			else if(url.indexOf('serie-V9STRCSVXD')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-BHunum7HpqI/Tko-LZPGXwI/AAAAAAAAAiY/bK6ecvVwsJk/s1024/fondo_gfootball.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 19 Haven */
			else if(url.indexOf('serie-44NZ62NUHS')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-vFPPFI6IHpU/Tko-5oZWr-I/AAAAAAAAAio/b4Qp2snrvCw/s1024/fondo_haven.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 20 Los Simpson */
			else if(url.indexOf('serie-CUE2CNKTN6')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-dpNW1ueXCqU/TkpFjdJ6nUI/AAAAAAAAAkY/VqMcZQLYtSE/s720/fondo_simpson.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 21 The IT Crowd (Los informáticos) */
			else if(url.indexOf('serie-TVDFKXCD5Y')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px orange;opacity: 0.8}  #main {background-image: url(https://lh6.googleusercontent.com/-6yK2QY4j-Ao/TkpFzAZLHhI/AAAAAAAAAkg/NkRK0ypD1EM/s720/fondo_theitcrowd.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 22 Torchwood */
			else if(url.indexOf('serie-WKTA6UFZCA')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-6zqh4ThuA7g/TkpHCaUjmLI/AAAAAAAAAk4/LMiNMQooVxE/s720/fondo_torchwood.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 23 Spartacus */
			else if(url.indexOf('serie-XEPUFTTCVV')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-iIduZFmpWw4/TkpWqafXsrI/AAAAAAAAAl4/rg0pz66aJc8/s720/spartacus.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 24 Me Llamo Earl */
			else if(url.indexOf('serie-H4WTXU7X2Y')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-e-GqIXeFBjg/TkpWAtbJbSI/AAAAAAAAAls/Dq7tv30yGqk/s720/me%252520llamo%252520earl.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 25 One Piece */
			else if(url.indexOf('serie-Z5YSSKFTH2')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-cNEN-k0iPQQ/TkpV7xNuD1I/AAAAAAAAAlo/iYyzUnBYu3I/s720/one%252520piece.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 26 El Mentalista */
			else if(url.indexOf('serie-2UKNFVA4XZ')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-weF6p3jofHc/TkpU0F6VdII/AAAAAAAAAlU/yKTJb2v0Czg/s720/el%252520mentalista.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 27 Alphas */
			else if(url.indexOf('serie-2SDTZSDSWF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-vpWHU4qx_W0/Tko4wuxJNLI/AAAAAAAAAgg/Q4i_9_k2jLE/s720/fondo_alphas.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 28 Avatar, la Leyenda de Aang */
			else if(url.indexOf('serie-X25297XY4T')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-CHBdTJRqw1k/Tko5tRsRzpI/AAAAAAAAAgw/8W3kPw1xxrQ/s720/fondo_avatarllda.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 29 Camelot */
			else if(url.indexOf('serie-W2DAFHN4PT')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-x-LbUmgDOX0/Tko7V32JaTI/AAAAAAAAAhU/K2RUcI1feWU/s720/fondo_camelot.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 30 Chuck */
			else if(url.indexOf('serie-KZY3PNNX5X')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-6FmbtJiP8Vc/Tko7hr8k1JI/AAAAAAAAAhY/EWGckjlBdSk/s720/fondo_chuck.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 31 Death Note */
			else if(url.indexOf('serie-SHVW6RE2PF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-LJsvsJIZQU4/Tko7kSmeJCI/AAAAAAAAAhc/2VPL6ONwS3s/s720/fondo_deathnote.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 32 Falling Skies */
			else if(url.indexOf('serie-CXKYPAEDA4')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-biKqU05AKKA/Tko9L7zKiGI/AAAAAAAAAiA/bTFKOrOjK4c/s720/fondo_fallings.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 33 FlashForward */
			else if(url.indexOf('serie-C494VKAKV2')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-D5LXM6Z8YBY/Tko9SFdU7MI/AAAAAAAAAiE/k_cGYHmKfHE/s720/fondo_flashforward.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 34 Glee */
			else if(url.indexOf('serie-6A9772YCZ3')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-tjCaD-vsjVU/Tko-H3Sh3RI/AAAAAAAAAiU/kQxJZznD2L4/s720/fondo_glee.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 35 Hellcats */
			else if(url.indexOf('serie-ZP2ZDTWZDF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-t21EZg6ZC04/Tko_Pm5OVmI/AAAAAAAAAiw/xyOJrMP7fYU/s720/fondo_hellcats.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 36 Hisghschool of the Dead */
			else if(url.indexOf('serie-2RY2WC3XPU')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-ekmrPait2yU/Tko_sLfCdtI/AAAAAAAAAi8/juq5SMxSR2c/s720/fondo_hotd.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 37 Mentes Criminales */
			else if(url.indexOf('serie-2E445S9234')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-oXfs5AHp6ow/TkpAu2xgHrI/AAAAAAAAAjQ/0AfgSzZ5RkY/s720/fondo_mentesc.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 38 Mentes Criminales: SB */
			else if(url.indexOf('serie-ET3NSH4DVF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-GrCJQztF3UI/TkpBFdKGgsI/AAAAAAAAAjU/du31fHMyarw/s720/fondo_mentescsb.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 39 Modern Family */
			else if(url.indexOf('serie-YFWCHNFDAH')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-EE1iQQUtAVU/TkpBwRCbnZI/AAAAAAAAAjc/eZ9w27x6cAE/s720/fondo_modernf.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 40 No Ordinary Family */
			else if(url.indexOf('serie-2479TDRKTW')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-k-_Hnzd9Xkg/TkpBXnyqOWI/AAAAAAAAAjY/6D7_2QjucHE/s720/fondo_nofamily.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 41 Pesadillas */
			else if(url.indexOf('serie-XV3H4PNRKK')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-tDFwMbmWC1Q/TkpCjaeXFqI/AAAAAAAAAjo/Ln9O7O6LHC4/s720/fondo_pesadillas.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 42 Psych */
			else if(url.indexOf('serie-D52PK3PY7N')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-bPGJCRJAsqA/TkpC8cxgvZI/AAAAAAAAAj0/knWqZcmxIHY/s720/fondo_psych.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 43 Raising Hope */
			else if(url.indexOf('serie-27SCDFCHR4')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-pzJM5xwdhWo/TkpDwE1XOLI/AAAAAAAAAj8/rnTMEm3_CmA/s720/fondo_raisinghope.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 44 Scrubs */
			else if(url.indexOf('serie-UENYPHK223')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-LVPTT_IELwQ/TkpEowyEx1I/AAAAAAAAAkI/7mdjiD5N6_A/s720/fondo_scrubs.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 45 The Cape */
			else if(url.indexOf('serie-CVYK367HFP')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-tmvGwLulqCw/TkpFhtHTyDI/AAAAAAAAAkU/U4R0QWBOUOY/s720/fondo_thecape.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 46 The Event */
			else if(url.indexOf('serie-TY994W6PUA')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-MDkVtumoO7Y/TkpF4PE6l7I/AAAAAAAAAkk/yq9gOwHIR2w/s720/fondo_theevent.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 47 The Killing */
			else if(url.indexOf('serie-6NZ97F3PKP')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-9ja8oV1Z3RU/TkpGREMfqqI/AAAAAAAAAks/n1CFDIVkMWQ/s720/fondo_thekilling.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 48 The Sarah Jane Adventures */
			else if(url.indexOf('serie-9PX3FENEPR')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-bRNYs_koHyA/TkpEa7kIvFI/AAAAAAAAAkE/uaAN7m1cr-I/s720/fondo_sarajane.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 49 V (2009) */
			else if(url.indexOf('serie-TWY6ZED5PK')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-eyNRASzhigQ/TkpHJ77YdKI/AAAAAAAAAlA/KFl7d4yheBg/s720/fondo_v2009.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 50 Aguila Roja */
			else if(url.indexOf('serie-YYW4ESA7H9')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-vsczHiaMUao/TkpVXWJgrvI/AAAAAAAAAlc/jHXZKmBFyNo/s720/aguila%252520roja.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 51 Top Gear */
			else if(url.indexOf('serie-EFS5TW7CT5')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-YM1B8uVEG-Q/TkpWof9qj4I/AAAAAAAAAl0/i00ONtMUsHc/s720/top%252520gear.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 52 Misfits */
			else if(url.indexOf('serie-2ANW7YX462')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-ZHQx7bdPCcg/TkpV6Jxt5CI/AAAAAAAAAlk/peOp6TSYzag/s720/misfits.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 53 Skins */
			else if(url.indexOf('serie-ZPHYH29ANP')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-e-UrALV1CwE/TkpWvWFl0PI/AAAAAAAAAl8/3YPFskufV48/s720/skins.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 54 Phineas & Ferb */
			else if(url.indexOf('serie-FUVU2KUDHS')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-zc9-N40Myr4/TkpWNZkLsRI/AAAAAAAAAlw/bVhzr-neHSU/s720/phineas%252520y%252520ferb.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 55 Heroes */
			else if(url.indexOf('serie-ZET9P7VZPA')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-9zVewg1sus8/TkpVj6vUI3I/AAAAAAAAAlg/MJp98t12s_Q/s720/heroes.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 56 Entre fantasmas */
			else if(url.indexOf('serie-TAV6PSHCTV')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-tvmhMEbyafg/TkpVS5nHT6I/AAAAAAAAAlY/rsBk5ZqP3dU/s720/entre%252520fantasmas.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 57 Alias */
			else if(url.indexOf('serie-64UEZE29FH')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-ZCThU7YFDIY/Tko4EkyAd6I/AAAAAAAAAgU/3rZAgIUiyD0/s720/fondo_alias.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 58 Almacén 13 */
			else if(url.indexOf('serie-9FTT5393RK')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-BG99Xvbj38I/Tko4uT6lXlI/AAAAAAAAAgc/dN6LbsMRCRE/s720/fondo_almacen13.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 59 Bones */
			else if(url.indexOf('serie-WVDEEH3Y7V')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-CtvMffSngbE/Tko6uMGlOTI/AAAAAAAAAhE/ewy9CcE6CNc/s720/fondo_bones.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 60 Californication */
			else if(url.indexOf('serie-4N4SHCVN93')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-ZYQqkkqWT0o/Tko6_fyNs7I/AAAAAAAAAhI/OfAoidQIhwI/s720/fondo_californication.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 61 Caso Abierto */
			else if(url.indexOf('serie-K3DPUY3VD3')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-LFYabFJdSKE/Tko7rWkTMiI/AAAAAAAAAhg/AxN-El1fYso/s720/fondo_casoabierto.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 62 Castle */
			else if(url.indexOf('serie-VNNPFKPKRT')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-dCrSZoQ7Pdk/Tko7RXYctTI/AAAAAAAAAhQ/2zSBTVo-mRM/s720/fondo_castle.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 63 Dos Hombre y Medio */
			else if(url.indexOf('serie-XS599TH746')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-l0M4Ggt2Kro/Tko73LuzLTI/AAAAAAAAAhk/_bzCTdN0mjE/s720/fondo_dhym.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 64 El Internado */
			else if(url.indexOf('serie-RWS4US6ATF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-XCCl2l3Qm9E/Tko8sFztIOI/AAAAAAAAAhw/ucj2FQRZgF4/s720/fondo_elinternado.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 65 Expediente X */
			else if(url.indexOf('serie-TZU49CVKXV')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-I0MHBHoUTJ4/Tko84opELqI/AAAAAAAAAh8/ATb-7HFghuY/s720/fondo_expedientex.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 66 Malcom in the Middle */
			else if(url.indexOf('serie-9R272UUTPK')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-nr_eA_8mi0I/TkpAVfPXzCI/AAAAAAAAAjM/De8jumZkKec/s720/fondo_malcom.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 67 Numb3rs */
			else if(url.indexOf('serie-72AEXXWXNZ')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/--iogj5amga0/TkpCE9328-I/AAAAAAAAAjg/JAGLjMbKhM8/s720/fondo_numb3rs.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 68 Sobrenatural */
			else if(url.indexOf('serie-U2KXWPSHHF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-Sop1k6N27EM/TkpFs5W19jI/AAAAAAAAAkc/te74Ynicfro/s720/fondo_sobrenatural.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 69 Stargate Atlantis */
			else if(url.indexOf('serie-K4R73TA22X')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-olbaWUj7Alw/Tko58psEfWI/AAAAAAAAAg0/lnt_bNI9EFQ/s720/fondo_atlantis.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 70 Stargate SG1 */
			else if(url.indexOf('serie-5X2KTPWTED')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-q2b8c7gdktQ/TkpEwdd4wUI/AAAAAAAAAkM/zTSTZttehlM/s720/fondo_sg1.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 71 Stargate Universe */
			else if(url.indexOf('serie-3PVHEZ237D')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-hcjTYEg0Cb0/TkpHH_RaCDI/AAAAAAAAAk8/n53x6OgbhrQ/s720/fondo_universe.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 72 The Listener */
			else if(url.indexOf('serie-9NVH223HC2')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-becn8aCrd-4/TkpGIvgho2I/AAAAAAAAAko/whEACM0AlCg/s720/fondo_thelistener.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 73 The Office */
			else if(url.indexOf('serie-U729ARK49V')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-7OwHvvzkpTw/TkpGfbzhj_I/AAAAAAAAAk0/dp0-WSLhP8k/s720/fondo_theoffice.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 74 Detective Conan */
			else if(url.indexOf('serie-HF6VUZY9E2')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-piACjwNiujg/Tko78eN44eI/AAAAAAAAAho/aB24G-cgmhw/s720/fondo_detectiveconan.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 75 Diez razones para odiarte*/
			else if(url.indexOf('serie-PTZUCSP5DF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-dNhO-450_Pk/Tko8smzP1wI/AAAAAAAAAh4/_H-w4PrDQ8A/s720/fondo_diezrazones.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 76 Episodes */
			else if(url.indexOf('serie-9R7X43W554')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-JVl3c3NlJeE/Tkfz9YFuyjI/AAAAAAAAAes/1Y9Ob8Z47Yo/s720/fondo_episodes.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 77 Hawaii 5.0 */
			else if(url.indexOf('serie-PVAX3KEEY4')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-u-Haf3VE8xw/Tko_Wf2pZ-I/AAAAAAAAAi0/S96k5aFqjmU/s720/fondo_hawaii.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 78 Parks and Recreation */
			else if(url.indexOf('serie-AVHH2HNEVC')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-B_3ks_iXWKs/Tkfz_sPB3TI/AAAAAAAAAew/5EKDvUVFydg/s720/fondo_parks.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 79 Kiss x Sis */
			else if(url.indexOf('serie-KZ42S5WY4F')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-zNCyoP1nwR4/TkfzuVGZ-mI/AAAAAAAAAeo/8sC1aJgD520/s1024/fondo_kissxsis.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 80 Kore wa zombie desu ka */
			else if(url.indexOf('serie-6XTTXN4XRC')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-XcVGkmDnFFQ/Tkfzppf_0jI/AAAAAAAAAek/shiVwWMPxGs/s1024/fondo_korewa.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 81 Scooby-Doo ¿Dónde estás? */
			else if(url.indexOf('serie-5A35Y6NU3H')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-mkdXbbGKDno/Tkoxk_qiEbI/AAAAAAAAAf0/F1Ue5cZkd-Y/s720/fondo_scoobydoo.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 82 Prince of Tennis */
			else if(url.indexOf('serie-DXNHWYD3RF')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-f_JDWaad558/Tkoxkdib1kI/AAAAAAAAAfw/KZh4Eu4fwzc/s720/fondo_princeoftennis.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 83 Los Quien */
			else if(url.indexOf('serie-EVAAHC6F3S')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-SKMI0w-D0CI/Tkoxdqo9EMI/AAAAAAAAAfo/ddiy3-oP7k4/s720/fondo_losquien.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 84 Punta Escarlata */
			else if(url.indexOf('serie-XAKXKCR375')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-Ws7EuvDQa2w/Tkoxd4duFaI/AAAAAAAAAfs/IBja87Arbo4/s720/fondo_pescarlata.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 85 House */
			else if(url.indexOf('serie-S3PV5C9REH')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-obFi4T9sA4o/Tko_WoCmkYI/AAAAAAAAAi4/mIPbl1pIYqs/s720/fondo_house.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 86 Crónicas Vampíricas */
			else if(url.indexOf('serie-PNWF9KUPAZ')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-6olz6LP22UA/TkpUyu52ZSI/AAAAAAAAAlM/LJ2AG7aOJgA/s720/cronicas%252520vampiricas.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 87 Naruto */
			else if(url.indexOf('serie-R9VUFKART2')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-HIbeVYHM3ww/TkunXncZPNI/AAAAAAAAAnE/pYISf2kvpwQ/s1024/fondo_naruto.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 88 Bleach */
			else if(url.indexOf('serie-TCSTEANWWE')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-ixQoA_fMHjY/TkunZh1iKQI/AAAAAAAAAnI/sopjYSm0s6U/s1024/fondo_bleach.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 89 Naruto: Shippuden */
			else if(url.indexOf('serie-VHA7VYH6V6')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-mcnIrJj1hwI/TkunSq0OvXI/AAAAAAAAAnA/k42koL-HllE/s1024/fondo_narutos.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* Fondo global 
			else if(fondoglobal == 1){var style="#page_content {opacity: 0.8} #main {background-image: url("+postsX+");background-attachment:fixed;background-size: 100% 100%, auto}";}*/




	/* PELÍCULAS */


		/* 1 Pulp Fiction */
			else if(url.indexOf('peli-ASUY9K36WX')!=-1){var style="#page_content {-moz-box-shadow: 0 0 20px #c75f00; opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-DaYeXh6uKJQ/TkpC6h29xAI/AAAAAAAAAjw/w04XdbeN7KU/s720/fondo_pulp_fiction.png);background-attachment: fixed;background-size: 100% 100%, auto;} h4 {color: #c75f00}";}
		/* 2 Avatar */
			else if(url.indexOf('peli-2VFHFUDFYW')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-nSzY_bo2Isc/Tko6E0BbFDI/AAAAAAAAAg8/tywclkaM7F8/s720/fondo_avatar.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 3 Origen */
			else if(url.indexOf('peli-AKKPKNZRX9')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-iAfSF6eC4N0/TkpCSrqFe6I/AAAAAAAAAjk/ca1r2rjBxc4/s720/fondo_origen.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 4 Amelie */
			else if(url.indexOf('peli-RXPHVAVUH3')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-hRv8fvZu8Do/Tko5MPazLKI/AAAAAAAAAgo/OpR27A6TexE/s720/fondo_amelie.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 5 Big Fish */
			else if(url.indexOf('peli-CKRD6PHYDR')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh5.googleusercontent.com/-SZDuMiJm8G8/Tko7APtaSuI/AAAAAAAAAhM/Z1i1cr-0GGU/s720/fondo_big_fish.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 6 300 */
			else if(url.indexOf('peli-7SXP7VPEZN')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh3.googleusercontent.com/-NZSN4NeiJ-I/Tko4FHrIHHI/AAAAAAAAAgY/F5uG5l1JO-A/s720/fondo_300.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 7 Batman Begins 2: El caballero oscuro */
			else if(url.indexOf('peli-TNWNF5HFDK')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-r3sKpnMXbDc/Tko5_DfZpjI/AAAAAAAAAg4/RlM_DOutGuM/s720/fondo_batman2.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 8 El gran Lebowsky */
			else if(url.indexOf('peli-3HNNR9CDVT')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-hWj1uanQKg4/Tko-cRxsf5I/AAAAAAAAAig/kJRazvPc9-w/s720/fondo_gran_lebowski.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 9 Alicia en el País de las Maravillas */
			else if(url.indexOf('peli-UXD59T47UC')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh4.googleusercontent.com/-uySXF6Djo3s/Tko5GHEZeBI/AAAAAAAAAgk/Dfqu-F_Yut0/s720/fondo_alicia.png);background-attachment:fixed;background-size: 100% 100%, auto}";}
		/* 10 Resacón 2: ¡Ahora en Tailandia! */
			else if(url.indexOf('peli-C2TEZUAD4Z')!=-1){var style="#page_content {opacity: 0.8} #main {background-image: url(https://lh6.googleusercontent.com/-F_9DZc9IN58/TkpDzTgirmI/AAAAAAAAAkA/qwkPZmdzyQo/s720/fondo_resacon2.png);background-attachment:fixed;background-size: 100% 100%, auto}";}



/* No eliminar de aqui... */

var head=document.getElementsByTagName("HEAD")[0];
 
var el=window.document.createElement('link');
 
el.rel='stylesheet';
 
el.type='text/css';
 
el.href='data:text/css;charset=utf-8,'+escape(style);
 
head.appendChild(el);

/* ... hasta aqui. */
