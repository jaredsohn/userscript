// ==UserScript==
// @name           TW Towns
// @namespace
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

	var saloons	=	{
		init:function() {
			this.lang					=	new Array();
			this.lang['v_towns']		=	'Miasta -V-';
			this.lang['sp_towns']		=	'Miasta _SP_';
			this.lang['ld_towns']		=	'Miasta Light District';
			this.lang['albion_towns']	=	'Miasta Albionu';

			this.saloons		=	new Array();

			//My towns
			this.saloons['v_towns']			=	new Array();
			this.saloons['v_towns'][13]		=	'-V- Rio Grande II';
			this.saloons['v_towns'][118]	=	'-V- Rio Grande II';
			this.saloons['v_towns'][101]	=	'-V- Rio Grande LT';
			this.saloons['v_towns'][241]	=	'-V- Wall Hall';
			this.saloons['v_towns'][1435]	=	'-V- Wall Hall II';
			this.saloons['v_towns'][474]	=	'-V- CROATOAN';
			this.saloons['v_towns'][1006]	=	'-V- CROATOAN II-WAWA';
			this.saloons['v_towns'][27]		=	'-V- Rise of Legends';

			//_SP_ Towns
			this.saloons['sp_towns']		=	new Array();
			this.saloons['sp_towns'][23]	=	'_SP_Algarve';
			this.saloons['sp_towns'][1541]	=	'_SP_Algarve II';
			this.saloons['sp_towns'][153]	=	'_SP_Algarve III';
			this.saloons['sp_towns'][97]	=	'_SP_BEDE BRAŁ CIE';
			this.saloons['sp_towns'][36]	=	'_SP_GHOST TOWN';
			this.saloons['sp_towns'][4294]	=	'_SP_GHOST TOWN II';
			this.saloons['sp_towns'][2512]	=	'_SP_GHOST TOWN III';
			this.saloons['sp_towns'][1252]	=	'_SP_GHOST TOWN IV';
			this.saloons['sp_towns'][65]	=	'_SP_Haven City';
			this.saloons['sp_towns'][450]	=	'akademia HAVEN CITY';
			this.saloons['sp_towns'][149]	=	'_SP_Hundelstone';
			this.saloons['sp_towns'][882]	=	'_SP_Hundelwood';
			this.saloons['sp_towns'][2691]	=	'Kol BEDE BRAŁ CIE';
			this.saloons['sp_towns'][3420]	=	'_SP_W AUCIE';
			this.saloons['sp_towns'][2859]	=	'_SP_Warren Buffet';
			this.saloons['sp_towns'][806]	=	'_SP_Warren Buffet II';
			this.saloons['sp_towns'][6693]	=	'Warren Buffet III';
			this.saloons['sp_towns'][7258]	=	'_SP_Warren Buffet IV';

			//Light District Towns
			this.saloons['ld_towns']		=	new Array();
			this.saloons['ld_towns'][12]	=	'Red Light District';
			this.saloons['ld_towns'][267]	=	'White Light District';
			this.saloons['ld_towns'][126]	=	'Gold Light District';
			this.saloons['ld_towns'][249]	=	'Black Light District';

			//Albion Towns
			this.saloons['albion_towns']		=	new Array();
			this.saloons['albion_towns'][266]	=	'Albion Town';
			this.saloons['albion_towns'][3429]	=	'Albion City';
			this.saloons['albion_towns'][6816]	=	'Albion Village';
			this.saloons['albion_towns'][6058]	=	'Albion Camp';
			this.saloons['albion_towns'][3148]	=	'Hardron';
			this.saloons['albion_towns'][2067]	=	'0 Orgrod';
			this.saloons['albion_towns'][4407]	=	'Zigura';
			this.saloons['albion_towns'][1428]	=	'Arkansas';

			this.add_text('<style type="text/css">#a_div_cnt {position: fixed; top: 10px; bottom: 10px;left: 0; right: 0; z-index: 999;margin: 0 auto; display: none; background: #eee; border: 1px solid #ccc; border-radius: 5px; -moz-border-radius: 5px; width: 1000px;}</style>',1);

			var a_cnt	 =	'<div id="a_div_cnt" style=""><table><thead><tr>\r\n';
			for (var group in this.saloons)
			{
				a_cnt	+=	'<td><h3>' + this.lang[group] + '</h3></td>';
			}

			a_cnt	+=	'</tr></thead>';

			for (var group in this.saloons)
			{
				a_cnt	+=	'<td style="width: 250px; vertical-align: top;">';
				for (var saloon in this.saloons[group])
				{
					a_cnt	+=	'<a href="javascript:AjaxWindow.show(\'building_saloon\',{town_id:' + saloon + '},' + saloon + '); document.getElementById(\'a_div_cnt\').style.display	=	\'none\'; void 0;">' + this.saloons[group][saloon] + '</a><br />\r\n';
				}
				a_cnt	+=	'</td>';
			}
			a_cnt		+='</table><br /><a style="position: absolute; top: 97%;" href="javascript:document.getElementById(\'a_div_cnt\').style.display	=	\'none\'; void 0;">Zamknij</a></div>';
			this.add_text(a_cnt,0);
			this.e	=	document.getElementById('a_div_cnt');
			this.init_done	=	true;
			return true;
		},

		open:function() {
			this.e.style.display	=	'block';
			return true;
		},

		close:function() {
			this.e.style.display	=	'none';
			return true;
		},

		go:function(saloon) {
			this.close();
			AjaxWindow.show('building_saloon',{'town_id':saloon},saloon);
			return true;
		},

		add_text:function(text,in_head) {
			document.body.innerHTML	=	text + document.body.innerHTML;
		},

		repair:function()
		{
			WMap.initialize(10, 10);
			WMinimap.initialize();
			return true;
		}
	};

	saloons.init();
	window.onload	=	setTimeout('WMap.initialize(10, 10);WMinimap.initialize();',0);