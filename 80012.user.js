// ==UserScript==
// @name           [BFSU] Ikariam comptoir toutes les offres
// @namespace      Ikariam BFSU
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support.ikariam.*
// ==/UserScript==

var IkariamTradingPost = function ()
{
	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }

	if (!mywindow.BFSU_started)
	{
		var url = 'http://userscripts.org/scripts/show/80007';
		alert ('Vous devez installer le script [BFSU] BlackFantome Script Utilities\n'
				+ 'Ce script est disponible à cette adresse: ' + url + '\n'
				+ 'Une fois ceci fait, placez le script au dessus de celui-ci dans la liste');
		return;
	}

	var $ = mywindow.$;
	var Cookies = mywindow.Cookies;
	var DateTime = mywindow.DateTime;
	var Options = mywindow.Options;
	var Tools = mywindow.Tools;
	var version = '1.0.0';
	
	var Actions =
	{
		activate: function ()
		{
			var input_elts = $('div h4:contains("Comptoir")').eq(0).parent().find ('input');
			Tools.setValue ('TradingShow', input_elts.eq (0).attr ('checked'));
			Tools.setValue ('TradingWood', input_elts.eq (1).attr ('checked'));
			Tools.setValue ('TradingWine', input_elts.eq (2).attr ('checked'));
			Tools.setValue ('TradingMarble', input_elts.eq (3).attr ('checked'));
			Tools.setValue ('TradingCrystal', input_elts.eq (4).attr ('checked'));
			Tools.setValue ('TradingSulphur', input_elts.eq (5).attr ('checked'));
			Tools.setValue ('TradingMin', input_elts.eq (6).val ());
			Tools.setValue ('TradingMax', input_elts.eq (7).val ());
			Tools.setValue ('TradingMinSold', input_elts.eq (8).val ());
			Tools.setValue ('TradingMaxSold', input_elts.eq (9).val ());
		}
	}
	
	var PageTrading =
	{
		id: undefined,
		minCost: 0,
		maxCost: 0,
		position: undefined,
		view: 'branchOffice',
		type: 444,
		range: 1,
		addFind: function (array, text)
		{
			if (!array || array[0] < this.minCost || array[0] >= this.maxCost)
				return;
			var tr = $('<tr></tr>').attr ({'cost':array[0], 'distance':array[1]});

			var content = $(text).find ('td').eq (4).text ();
			var nb = content.substr (0, content.indexOf (' ') + 1);
			var txt = content.substr (content.indexOf (' ') + 1);

			tr	.append ($('<td></td>')
					.text ($(text).find ('td').eq (0).text ())
				)
				.append ($('<td></td>')
					.text ($(text).find ('td').eq (1).text ())
				)
				.append ($('<td></td>')
					.text ($(text).find ('td').eq (2).text ())
				)
				.append ($('<td></td>')
					.append ($('<img />')
						.attr ({
							'src': $(text).find ('img').eq (0).attr ('src'),
							'alt': $(text).find ('img').eq (0).attr ('alt'),
							'title': $(text).find ('img').eq (0).attr ('title')
						})
					)
				)
				.append ($('<td></td>')
					.html (nb + '<img src="skin/resources/icon_gold.gif" />' + txt)
				)
				.append ($('<td></td>')
					.text ($(text).find ('td').eq (5).text ())
				)
				.append ($('<td></td>')
					.append ($('<a></a>')
						.attr ({'href': $(text).find ('a').eq (0).attr ('href')})
						.append ($('<img />')
							.attr ({'src':'skin/layout/icon-kiste.gif'})
						)
					)
				)
			;

			var elt;
			var elts = $('#show_trading_offer').find ('tr');
			for (var i = 1; i < elts.size (); i++)
			{
				elt = elts.eq (i);
				if (elt.attr('cost') > array[0])
					break;
				if (elt.attr ('cost') == array[0])
				{
					if (elt.attr ('distance') > array [1])
						break;
				}
			}
			if (!elt)
				$('#show_trading_offer').append (tr);
			else
				elt.before (tr);
		},
		addOffer: function (array, text)
		{
			if (!array || array[0] < this.minCost || array[0] >= this.maxCost)
				return;
			var tr = $('<tr></tr>').attr ({'cost':array[0], 'distance':array[1]});

			var content = $(text).find ('td').eq (3).text ();
			var nb = content.substr (0, content.indexOf (' ') + 1);
			var txt = content.substr (content.indexOf (' ') + 1);

			tr	.append ($('<td></td>')
					.text ($(text).find ('td').eq (0).text ())
				)
				.append ($('<td></td>')
					.text ($(text).find ('td').eq (1).text ())
				)
				.append ($('<td></td>')
					.append ($('<img />')
						.attr ({
							'src': $(text).find ('img').eq (0).attr ('src'),
							'alt': $(text).find ('img').eq (0).attr ('alt'),
							'title': $(text).find ('img').eq (0).attr ('title')
						})
					)
				)
				.append ($('<td></td>')
					.html (nb + '<img src="skin/resources/icon_gold.gif" />' + txt)
				)
				.append ($('<td></td>')
					.text ($(text).find ('td').eq (4).text ())
				)
				.append ($('<td></td>')
					.append ($('<a></a>')
						.attr ({'href': $(text).find ('a').eq (0).attr ('href')})
						.append ($('<img />')
							.attr ({'src':'skin/layout/icon-kiste.gif'})
						)
					)
				)
			;

			var elts = $('#show_trading_offer').find ('tr');
			var elt;
			for (var i = 1; i < elts.size (); i++)
			{
				elt = elts.eq (i);
				if (elt.attr('cost') < array[0])
				{
					elt = (i == 1) ? undefined : elts.eq (i - 1);
					break;
				}
				if (elt.attr ('cost') == array[0])
				{
					if (elt.attr ('distance') > array [1])
					{
						elt = (i == 1) ? undefined : elts.eq (i - 1);
						break;
					}
				}
			}
			if (!elt)
				$('#show_trading_offer').append (tr);
			else
				elt.after (tr);
		},
		addStyle: function ()
		{
			var elts = $('#show_trading_offer').find ('tr');
			for (var i = 1; i < elts.size (); i++)
			{
				if (i % 2 == 1)
					elts.eq (i).addClass ('alt');
				else 
					elts.eq (i).attr ({'class':''});
			}
		},
		createContainer: function ()
		{
			for (var i = this.minCost; i < this.maxCost; i++)
			{
				var content = $('<tbody></tbody>')
					.attr ({'id':'trades_' + i});
				$('td[colspan="6"][class="paginator"]').parent ().parent ().append (content);
			}
		},
		getOfferInfo: function (jquery)
		{
			var size = jquery.find ('td').size ();
			if (size == 7) // offer
			{
				var infos = new Array ();
				infos.push (parseInt (jquery.find ('td').eq (4).text ()));
				infos.push (parseInt (jquery.find ('td').eq (5).text ()));
				return infos;
			}
			else if(size == 6) // sold
			{
				var infos = new Array ();
				infos.push (parseInt (jquery.find ('td').eq (3).text ()));
				infos.push (parseInt (jquery.find ('td').eq (4).text ()));
				return infos;
			}
		},
		launch: function ()
		{
			var show_bois = Tools.getValue ('TradingWood');
			var show_vin = Tools.getValue ('TradingWine');
			var show_marbre = Tools.getValue ('TradingMarble');
			var show_cristal = Tools.getValue ('TradingCrystal');
			var show_soufre = Tools.getValue ('TradingSulphur');
			
			if (!Tools.getValue ('TradingShow')
				|| (!show_bois && !show_vin && !show_marbre && !show_cristal && !show_soufre))
				return;
			
			this.id = $('input[name=id]').val ();
			this.position = $('input[name=position]').val ();
			this.type = $('input[type="radio"][name="type"]:checked').val ();
			this.range = $('select[name="range"] option:selected').val ();
			
			if (this.type == 444)
			{
				this.minCost = Tools.getValue ('TradingMin');
				this.maxCost = Tools.getValue ('TradingMax');
			}
			else
			{
				this.minCost = Tools.getValue ('TradingMinSold');
				this.maxCost = Tools.getValue ('TradingMaxSold');
			}
			GM_log (this.minCost + ' - ' + this.maxCost);
			$('td[colspan="6"][class="paginator"]').parent ().parent ().attr ({'id':'show_trading_offer'});
			this.removeData ();
			this.createContainer ();
			if (show_bois)
				this.requestResource ('resource');
			if (show_vin)
				this.requestResource (1);
			if (show_marbre)
				this.requestResource (2);
			if (show_cristal)
				this.requestResource (3);
			if (show_soufre)
				this.requestResource (4);
		},
		removeData: function ()
		{
			var tr_elts = $('td[colspan="6"][class="paginator"]').parent ().parent ().find ('tr');
			for (var i = 1; i < tr_elts.size (); i++)
			{
				tr_elts.eq (i).remove ();
			}
		},
		requestResource: function (resourceType)
		{
			if (this.id == undefined || this.position == undefined)
				return;
			GM_xmlhttpRequest({
				method:'POST',
				url: 'http://' + Options.server + '/index.php',
				data:'id=' + this.id
						+ '&position=' + this.position
						+ '&view=branchOffice&type=' + this.type
						+ '&searchResource=' + resourceType
						+ '&range=' + this.range,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type': 'application/x-www-form-urlencoded',
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Referer': 'http://' + Options.server + '/index.php', 
					'Cookie': document.cookie
				},
				onload:PageTrading.showResult
			});
		},
		showResult: function (responseDetails)
		{
			var response = Tools.formatXML (responseDetails.responseText);
			response = response.substr (response.indexOf ('Résultats'));
			response = response.substr (response.indexOf ('<table'));
			response = response.substr (0, response.indexOf ('</table>'));
			response = response.substr (0, response.lastIndexOf ('</td>'));
			response += '</table>';
			GM_log (response);
			response = new DOMParser().parseFromString(response, "text/xml");
			response = $(response);
			if (PageTrading.type == 444)
			{
				response.find('tr').each (function ()
				{
					var infos = PageTrading.getOfferInfo ($(this));
					PageTrading.addFind (infos, $(this));
				})
			}
			else
			{
				response.find('tr').each (function ()
				{
					var infos = PageTrading.getOfferInfo ($(this));
					PageTrading.addOffer (infos, $(this));
				})
			}
			PageTrading.addStyle ();
		}
	}
	
	var Trading =
	{
		addOption: function ()
		{
			Options.addModule ('Comptoir', Tools.getValue ('TradingShow'), Actions.activate);
			Options.addOption ('Comptoir', 'check_afficher bois', Tools.getValue ('TradingWood'), Actions.activate);
			Options.addOption ('Comptoir', 'check_afficher vin', Tools.getValue ('TradingWine'), Actions.activate);
			Options.addOption ('Comptoir', 'check_afficher marbre', Tools.getValue ('TradingMarble'), Actions.activate);
			Options.addOption ('Comptoir', 'check_afficher cristal', Tools.getValue ('TradingCrystal'), Actions.activate);
			Options.addOption ('Comptoir', 'check_afficher soufre', Tools.getValue ('TradingSulphur'), Actions.activate);
			Options.addOption ('Comptoir', 'txt_cout minimum', Tools.getValue ('TradingMin'), Actions.activate);
			Options.addOption ('Comptoir', 'txt_cout maximum', Tools.getValue ('TradingMax'), Actions.activate);
			Options.addOption ('Comptoir', 'txt_cout minimum offre', Tools.getValue ('TradingMinSold'), Actions.activate);
			Options.addOption ('Comptoir', 'txt_cout maximum offre', Tools.getValue ('TradingMaxSold'), Actions.activate);
		},
		addCookie: function ()
		{
			Cookies.addCookie ('TradingShow', true);
			Cookies.addCookie ('TradingWood', true);
			Cookies.addCookie ('TradingWine', true);
			Cookies.addCookie ('TradingMarble', true);
			Cookies.addCookie ('TradingCrystal', true);
			Cookies.addCookie ('TradingSulphur', true);
			Cookies.addCookie ('TradingMin', 0);
			Cookies.addCookie ('TradingMax', 99);
			Cookies.addCookie ('TradingMinSold', 0);
			Cookies.addCookie ('TradingMaxSold', 99);
		},
	}
	
	Trading.addCookie ();
	Trading.addOption ();
	if (Tools.isCurrentPage('branchOffice'))
		PageTrading.launch ();
}

if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
	document.location.href = 'javascript:('+IkariamTradingPost+')();void(0);';
else
	IkariamTradingPost();