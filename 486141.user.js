// ==UserScript==
// @name Backpack.tf prices on Tf2outpost
// @author kléni
// @include http://*.tf2outpost.com/*
// @require http://code.jquery.com/jquery-2.1.0.min.js
// @updateURL http://userscripts.org/scripts/source/486141.meta.js
// @grant GM_xmlhttpRequest
// @version 1.1
// ==/UserScript==

var checkReady = function(check, callback)
{
	var c = check();
	if (c)
		callback();
	else
		window.setTimeout(function() { checkReady(check, callback); }, 100);
};
var zemnmodal =
{
	//this script loads earlier than outpost scripts, had to add it
	a: $('<div class="zemnmodal" />'),
	c: $('<div class="zemncontent" />'),
	make: function(b)
	{
		if (!$("body > .zemnmodal").length)
		{
			this.a.append(this.c);
			$("body").append(this.a);
			this.a.click(function(e)
			{
				if (e.target == this)
					zemnmodal.unmake();
			});
		}
		this.c.html(b).css("margin-top", 120 + $(window).scrollTop());
		this.a.height($(document).height()).stop(true).fadeIn(200);
	},
	unmake: function()
	{
		this.a.stop(true).fadeOut(200);
	}
};
var update = function()
{
	if (localStorage.apikey === undefined)
	{
		zemnmodal.make('Get an API key from backpack.tf! <a id="keylink" href="http://backpack.tf/api/register/" target="_blank">Click here</a>, and copy the key!<br />You can type anything in the URL and reason fields, eg. "http://tf2outpost.com", and "price script".');
		$("#keylink").click(function()
		{
			$(this).parent().html('Paste the key here:<br /><input id="keyinput" type="text" style="width: 170px; padding: 13px; border: 0px; background-color: #1C1A17;" />');
			$("#keyinput").focus().keyup(function()
			{
				if (this.value.length == 24)
				{
					localStorage.apikey = this.value;
					zemnmodal.unmake();
					process();
				}
			});
		});
	}
	else
		process();
};
var process = function()
{
	//something went wrong... wait 5 minutes
	var exists = false;
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length && !exists; i++)
	{
		var c = ca[i].trim();
		if (c.indexOf("wait=") == 0)
			exists = true;
	}
	if (exists)
		return;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://backpack.tf/api/IGetPrices/v4/?format=json&key="+localStorage.apikey,
		onload: function(e)
		{
			try
			{
				var data = JSON.parse(e.responseText);
				if (data.message)
					throw data.message;
				if (!data && !data.response.success)
					return;
				var n = {},
					ref = data.response.items["Refined Metal"]["prices"][6]["Tradable"]["Craftable"][0],
					key = data.response.items["Mann Co. Supply Crate Key"]["prices"][6]["Tradable"]["Craftable"][0],
					bud = data.response.items["Earbuds"]["prices"][6]["Tradable"]["Craftable"][0],
					m = ref.value_high ? ((ref.value+ref.value_high)/2) : ref.value,
					k = key.value_high ? ((key.value+key.value_high)/2) : key.value,
					b = bud.value_high ? ((bud.value+bud.value_high)/2) : bud.value,
					utk = m*k,
					utb = m*k*b,
					date = data.response.current_time,
					names = {
						metal: 1,
						keys: 2,
						earbuds: 3,
						usd: 4
					},
					parts = {};
				$.each(data.response.items, function(name)
				{
					var item = this;
					$.each(item.defindex, function()
					{
						var x = this;
						//crates, we don't need 3 defindexs for them
						if (x == 5041 || x == 5045)
							return;
						if (name.indexOf("Strange Part: ") != -1)
							parts[name.replace("Strange Part: ", "").replace(/[\s-.']/g, "").replace("\u00dc", "U")] = x;
						if (!n[x])
							n[x] = {};
						n[x].name = name;
						$.each(item.prices, function(quality)
						{
							var quality = parseInt(quality);
							if (name.indexOf("Australium") != -1 && name != "Australium Gold")
								quality *= -1;
							if (!n[x][quality])
								n[x][quality] = {};
							$.each(this, function(tradable)
							{
								var tradable = tradable == "Tradable" ? 1 : 0;
								if (!n[x][quality][tradable])
									n[x][quality][tradable] = {};
								$.each(this, function(craftable)
								{
									var craftable = craftable == "Craftable" ? 1 : 0;
									if (!n[x][quality][tradable][craftable])
										n[x][quality][tradable][craftable] = {};
									$.each(this, function(index)
									{
										var index = parseInt(index);
										var type = this.currency,
											l = this.value,
											h = this.value_high;
										//converting USD values to keys/buds, so we won't need it later
										if (quality == 5 && type == "usd")
										{
											if (l < utb)
											{
												l = Math.round(l/utk);
												if (h)
													h = Math.round(h/utk);
												type = "keys";
											}
											else
											{
												l = (l/utb).toFixed(1);
												l = l.substr(-1) == "0" ? l.substr(0, l.length-2) : l;
												if (h)
												{
													h = (h/utb).toFixed(1);
													h = h.substr(-1) == "0" ? h.substr(0, h.length-2) : h;
												}
												type = "earbuds";
											}
										}
										var d = [names[type], date-this.last_update, this.difference, l];
										if (h)
											d.push(h);
										n[x][quality][tradable][craftable][index] = d;
									});
								});
							});
						});
					});
				});
				var isdata = localStorage.data === undefined;
				localStorage.data = JSON.stringify(n);
				localStorage.parts = JSON.stringify(parts);
				localStorage.lastupdate = date;
				if (isdata)
					location.reload();
			}
			catch(error)
			{
				var html = "Couldn't update the prices, because:<br />"+error;
				zemnmodal.make(html);
				console.info(e);
				if (error == "API key does not exist.")
				{
					//getting a new key
					localStorage.removeItem("apikey");
					setTimeout(function()
					{
						zemnmodal.unmake();
						update();
					}, 2000);
				}
				else
				{
					var d = new Date();
					d.setTime(d.getTime()+5*60*1000);
					document.cookie = "wait=1; expires="+d.toGMTString();
				}
			}
		}
	});
};
var getprice = function(defindex, quality, trade, craft, index, output, round)
{
	var obj = p[defindex][quality][trade][craft][index],
		low = parseFloat(obj[3]),
		high = parseFloat(obj[4] ? obj[4] : obj[3]),
		k = obj[0],
		type = ["ref", "key", "bud", "USD"][k-1];
	if (round)
	{
		low = parseFloat(((low+high)/2).toFixed(2));
		high = low;
	}
	if (output)
	{
		var r = getprice(5002, 6, 1, 1, 0, false, true),
			k = getprice(5021, 6, 1, 1, 0, false, true),
			b = getprice(143, 6, 1, 1, 0, false, true);
		if (output == "USD")
		{
			switch (type)
			{
				case "ref" : return low*r[0];
				case "key" : return low*r[0]*k[0];
				case "bud" : return low*r[0]*k[0]*b[0];
				default: return low;
			}
		}
	}
	return [low, high, type, obj[1], obj[2]];
};
var round = function(value, date, diff, name, input, output)
{
	var r = getprice(5002, 6, 1, 1, 0, false, true)[0],
		k = getprice(5021, 6, 1, 1, 0, false, true)[0],
		b = getprice(143, 6, 1, 1, 0, false, true)[0],
		type = "";
	if (output)
		return [value, value, "USD", date];
	else if (value < r*k || (value == r*k && input == 1))
	{
		value /= r;
		type = "ref";
	}
	else if (value < r*k*b || (value == r*k*b && input == 2))
	{
		value /= r*k;
		type = "key";
	}
	else
	{
		value /= r*k*b;
		type = "bud";
	}
	return [parseFloat(value.toFixed(2)), parseFloat(value.toFixed(2)), type, date, diff, name];
};
var pricetext = function(obj, unusual)
{
	var low = obj[0],
		high = obj[1],
		type = obj[2],
		now = Math.round((new Date()).getTime()/1000),
		last = parseInt(localStorage.lastupdate),
		date = obj[3]+now-last,
		o = "";
	if ((type == "bud" || type == "key") && ((high == low && low != 1) || (high != low && (low != 1 || high != 1))))
		type += "s";
	if (date > (60*60*24*30.5*3) && unusual && localStorage.warn === undefined)
		o = " <span class='label'>(updated "+(date/60/60/24/30.5).toFixed(1)+" months ago)</span>";
	return low+(high != low ? " - "+high : "")+" "+type+o;
};
var p = JSON.parse(localStorage.data || "[]");
$(function()
{
	//only in the main window, otherwise it would run 4 times (other scripts)
	if (window.top != window.self)
		return;
	if (localStorage.data === undefined)
		return update();
	//new version
	if (p[5021].name === undefined)
	{
		localStorage.removeItem("data");
		return update();
	}
	if (localStorage.lastupdate !== undefined && parseInt(localStorage.lastupdate) < ((new Date()).getTime()/1000)-(60*60*24*(parseFloat(localStorage.update) || 1)))
		update();
	checkReady(function()
	{
		//for invertories and new trade page
		return !(($("body#backpack").length || $("body#new").length) && !$("#p1").length);
	},
	function()
	{
		$("#main_nav").append('<li><a href="#" id="script_settings"><span class="icon_settings"></span>Prices</a></li>');
		var style = '<style>';
		style += '.icon_tick.checkbox { color: #504A46; margin-right: 6px; cursor: pointer; }';
		style += '.icon_tick.checkbox.checked { color: #52BB0C; }';
		style += '.zemnmodal .input { margin: 0px 2px; padding: 0px 3px; border: 2px solid #2A2725; background: #1C1A17; }';
		style += '.zemnmodal .button { padding: 5px; min-width: inherit; }';
		style += 'input.d { width: 17px; }';
		style += '.fa-green { color: #44CC44; }';
		style += '.fa-red { color: #CC4444; }';
		style += '.fa-white { color: #BEBEBE; }';
		style += '.fa { position: absolute; top: 4px; left: 4px; font-size: 16px; }';
		style += '</style>';
		$("head").append(style);
		$("head").append('<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">');
		if (localStorage.links === undefined)
		{
			if (/(user|backpack)/.test(location.href))
				$(".navigation_bar .left").append('<li><a href="http://backpack.tf/profiles/'+$(".user_info").html().split("</span> ")[1]+'" target="_blank">BP.TF Profile</a></li>');
			$(".item_summary").click(function()
			{
				checkReady(function()
				{
					//waiting for the AJAX response
					return $("#item_summary").length && $(".links").length;
				},
				function()
				{
					if (!$(".links .bptf").length)
					{
						var i = $("#item_summary .item");
						if (!i.attr("data-hash"))
							return;
						var id = i.attr("data-hash").split(",");
						if (id[0] != 440)
							return;
						var is_unusual = i.hasClass("it_440_5") && id[1] != 266 && id[1] != 267;
						if (id[1] == 5021 && id[2] == 9)
							id[1] = 5081;
						if (id[1] == 5041 || id[1] == 5045)
							id[1] = 5022;
						if (!p[id[1]])
							return;
						var craft = i.hasClass("uncraftable") ? "Non-Craftable" : "Craftable",
							trade = i.hasClass("untradable") ? "Non-Tradable" : "Tradable",
							name = i.attr("data-name");
						if (name.indexOf("Australium") != -1 && name != "Australium Gold")
							id[2] *= -1;
						var s = 0;
						if (is_unusual)
						{
							var bg = i.css("background-image");
							if (bg == "none")
								return;
							s = parseInt(bg.split("effects/")[1].split(".png")[0]);
						}
						if (i.find(".series_no").length)
							s = parseInt(i.find(".series_no").html().substr(1));
						if (name == "Self-Made Mann Co. Supply Crate Key" || ((id[1] == 294 || id[1] == 160) && i.css("background-image") != "none"))
							s = 4;
						var quality = "";
						switch (id[2])
						{
							case "0": quality = "Normal"; break;
							case "1": quality = "Genuine"; break;
							case "3": quality = "Vintage"; break;
							case "5": quality = "Unusual"; break;
							case "6": quality = "Unique"; break;
							case "9": quality = "Self-Made"; break;
							case "11": case "-11": quality = "Strange"; break;
							case "13": quality = "Haunted"; break;
							case "14": quality = "Collector's"; break;
						}
						var link = "http://backpack.tf/stats/"+quality+"/"+p[id[1]].name+"/"+craft+"/"+trade+(s == 0 ? "" : "/"+s);
						$(".links").append('<li><a href="'+link+'" target="_blank"><span class="icon_trades"></span> Stats on BP.TF</a></li>');
					}
				});
			});
		}
		$("#script_settings").click(function()
		{
			var html = '';
			html += '<a href="http://userscripts.org/scripts/show/486141" target="_blank">Userscripts.org page</a><br />';
			html += '<a href="http://forums.backpack.tf/index.php?/topic/10248-script-for-tf2outpostcom/" target="_blank">Suggestions, bug reports</a><br /><br />';
			html += '<button class="button" type="button" id="update">Update prices now</button><br /><br />';
			html += 'Your backpack.tf API key: <input type="text" class="input" value="'+localStorage.apikey+'" /> <a href="http://backpack.tf/api/register/" target="_blank" id="changekey">Change</a><br />';
			html += 'Update prices automatically on every <input type="text" class="input d" data-name="update" value="'+(parseFloat(localStorage.update) || 1)+'" /> days<br />';
			html += '<span data-name="show" class="checkbox icon_tick'+(localStorage.show !== undefined ? ' checked' : '')+'"></span>Show the price of items on their icon, included';
			html += '<input class="input d" type="text" data-name="ppaint" value="'+(parseFloat(localStorage.ppaint) || 50)+'" />% of paint, and ';
			html += '<input class="input d" type="text" data-name="pparts" value="'+(parseFloat(localStorage.pparts) || 80)+'" />% of strange parts<br />';
			html += '<span data-name="tooltip" class="n checkbox icon_tick'+(localStorage.tooltip === undefined ? ' checked' : '')+'"></span>Show prices on the tooltip of items<br />';
			html += '<span data-name="changes" class="checkbox icon_tick'+(localStorage.changes !== undefined ? ' checked' : '')+'"></span>Show changes in the last <input data-name="days" type="text" class="input d" value="'+(parseFloat(localStorage.days) || 3)+'" /> days<br />';
			html += '<span data-name="warn" class="n checkbox icon_tick'+(localStorage.warn === undefined ? ' checked' : '')+'"></span>Show a warning if an unusual hat was updated more than 3 months<br />';
			html += '<span data-name="aust" class="n checkbox icon_tick'+(localStorage.aust === undefined ? ' checked' : '')+'"></span>Replace images of australium weapons to the images that backpack.tf uses<br />';
			html += '<span data-name="label" class="checkbox icon_tick'+(localStorage.label !== undefined ? ' checked' : '')+'"></span>Remove crate #, craft #, medal #, quantity, and equipped labels from the box of items<br />';
			html += '<span data-name="label" class="n checkbox icon_tick'+(localStorage.links === undefined ? ' checked' : '')+'"></span>Add links to the user\'s backpack.tf profile and the stats page of items<br />';
			html += '<br /><button class="button" type="button" id="save">Save</button>';
			zemnmodal.make(html);
			$("#update").click(function()
			{
				$(this).attr("disabled", "true");
				localStorage.removeItem("data");
				update();
			});
			$("#changekey").click(function()
			{
				$(this).prev().val("");
			});
			$("#save").click(function()
			{
				location.reload();
			});
			$(".zemnmodal .checkbox").click(function()
			{
				$(this).toggleClass("checked");
				var checked = $(this).hasClass("checked");
				if ($(this).hasClass("n"))
					checked = !checked;
				localStorage[checked ? "setItem" : "removeItem"]($(this).attr("data-name"), "1");
			});
			$(".zemnmodal input[data-name][type='text']").keyup(function()
			{
				var v = Math.min(100, Math.max(0, parseInt(this.value)));
				if (isNaN(v))
					return;
				localStorage.setItem($(this).attr("data-name"), v);
			});
		});
		var label = localStorage.label !== undefined,
			tooltip = localStorage.tooltip === undefined,
			ppaint = parseFloat(localStorage.ppaint)/100 || 0.5,
			pparts = parseFloat(localStorage.pparts)/100 || 0.8;
		$(".item").each(function()
		{
			var i = $(this);
			if (!i.attr("data-hash"))
				return;
			var id = i.attr("data-hash").split(",");
			if (id[0] != 440)
				return;
			if (label)
				i.find(".equipped, .series_no, .quantity, .medal_no, .craft_no").hide();
			var na = [],
				a = (i.attr("data-attributes") || "").split("<br>"),
				total = 0,
				is_unusual = i.hasClass("it_440_5");
			//HHHH and Haunted Metal Scrap aren't unusual hats
			if (id[1] == 266 && id[1] == 267)
				is_unusual = false;
			var paints = {
				IndubitablyGreen: 5027,
				ZepheniahsGreed: 5028,
				NobleHattersViolet: 5029,
				ColorNo216190216: 5030,
				ADeepCommitmenttoPurple: 5031,
				MannCoOrange: 5032,
				Muskelmannbraun: 5033,
				PeculiarlyDrabTincture: 5034,
				RadiganConagherBrown: 5035,
				YeOldeRusticColour: 5036,
				AustraliumGold: 5037,
				AgedMoustacheGrey: 5038,
				AnExtraordinaryAbundanceofTinge: 5039,
				ADistinctiveLackofHue: 5040,
				TeamSpirit: 5046,
				PinkasHell: 5051,
				AColorSimilartoSlate: 5052,
				DrablyOlive: 5053,
				TheBitterTasteofDefeatandLime: 5054,
				TheColorofaGentlemannsBusinessPants: 5055,
				DarkSalmonInjustice: 5056,
				AMannsMint: 5076,
				AfterEight: 5077,
				OperatorsOveralls: 5060,
				WaterloggedLabCoat: 5061,
				BalaclavasAreForever: 5062,
				AnAirofDebonair: 5063,
				TheValueofTeamwork: 5064,
				CreamSpirit: 5065
			},
			spells = {
				BruisedPurpleFootprints: 8919,
				ChromaticCorruption: 8902,
				CorpseGrayFootprints: 8916,
				DemomansCadaverousCroak: 8910,
				DieJob: 8901,
				EngineerssGravellyGrowl: 8908,
				Exorcism: 8921,
				GangreenFootprints: 8915,
				GourdGrenades: 8923,
				HeadlessHorseshoes: 8920,
				HeavysBottomlessBass: 8909,
				MedicsBloodcurdlingBellow: 8913,
				PutrescentPigmentation: 8900,
				PyrosMuffledMoan: 8911,
				RottenOrangeFootprints: 8918,
				ScoutsSpectralSnarl: 8906,
				SentryQuadPumpkins: 8924,
				SinisterStaining: 8904,
				SnipersDeepDownunderDrawl: 8907,
				SoldiersBoomingBark: 8905,
				SpectralFlame: 8925,
				SpectralSpectrum: 8903,
				SpysCreepyCroon: 8912,
				SquashRockets: 8922,
				TeamSpiritFootprints: 8914,
				ViolentVioletFootprints: 8917
			},
			//some cases outpost uses custom names
			parts = $.extend(JSON.parse(localStorage.parts), {
				AirborneEnemyKills: 6012,
				KillsUnderAFullMoon: 6015,
				Dominations: 6016,
				Revenges: 6018,
				SappersRemoved: 6025,
				KillsWhileLowHealth: 6032,
				DefendersKilled: 6035,
				KillsWhileInvulnUberCharged: 6037,
				KillsWhileUbercharged: 6037,
				TauntKills: 6051,
				SubmergedEnemyKills: 6036,
				BurningPlayerKills: 6053,
				KillsDuringHalloween: 6033
			});
			for (var x = 0; x < a.length; x++)
			{
				var attr = $("<span>"+a[x]+"</span>").text();
				attr = [attr.substr(0, attr.indexOf(":")), attr.substr(attr.indexOf(":")+2, attr.length-1)];
				if (attr[0] && attr[1])
				{
					if (attr[0] == "Painted")
					{
						//painted paint? grr
						if (i.attr("data-name") == attr[1])
							i.find(".paint, .paint_secondary").remove();
						else
						{
							var n = attr[1].replace(/[\s-.']/g, "");
							if (paints[n] && p[paints[n]])
							{
								if (!is_unusual)
									total += getprice(paints[n], 6, 1, 1, 0, "USD", true)*ppaint;
								na.push("<span class='label'>Painted:</span> "+attr[1]+(tooltip ? " <span class='label'>("+pricetext(getprice(paints[n], 6, 1, 1, 0))+")</span>" : ''));
							}
						}
					}
					else if (attr[0] == "Real Name")
					{
						var cn = i.attr("data-name");
						i.data("name", attr[1]).attr("data-name", attr[1]);
						na.push("<span class='label'>Custom Name:</span> "+cn.substr(1, cn.length-2)+(tooltip ? " <span class='label'>("+pricetext(getprice(2093, 6, 1, 1, 0))+")</span>" : ''));
					}
					else if (attr[0] == "Custom Desc")
						na.push("<span class='label'>Custom Description:</span> "+attr[1].substr(1, attr[1].length-2)+(tooltip ? " <span class='label'>("+pricetext(getprice(5044, 6, 1, 1, 0))+")</span>" : ''));
					else if (attr[0] == "Halloween Spell")
					{
						var n = attr[1].replace(/[\s-\.']/g, "");
						if (n != "Unknown" && spells[n] && p[spells[n]])
							na.push("<span class='label'>Halloween Spell:</span> "+attr[1]+(tooltip ? " <span class='label'>("+pricetext(getprice(spells[n], 6, 1, 1, 0))+")</span>" : ''));
					}
					else if (attr[0] != "Australium")
					{
						var n = attr[0].replace(/[\s-.']/g, "").replace("\u00dc", "U");
						if (parts[n])
						{
							if (!is_unusual)
								total += getprice(parts[n], 6, 1, 1, 0, "USD", true)*pparts;
							na.push("<span class='label'>"+attr[0]+":</span> "+attr[1]+(tooltip ? " <span class='label'>("+pricetext(getprice(parts[n], 6, 1, 1, 0))+")</span>" : ''));
						}
						else
							na.push(a[x]);
					}
				}
			}
			if (na.length)
			{
				var itemattr = "<br>"+na.join("<br>");
				i.data("attributes", itemattr).attr("data-attributes", itemattr);
			}
			else if (i.attr("data-attributes"))
				i.removeData("attributes").removeAttr("data-attributes");
			//Unique Mann Co. Supply Crate Key doesn't have self-made price, but every other kind of key have... This is very logical. :D
			if (id[1] == 5021 && id[2] == 9)
				id[1] = 5081;
			//crates
			if (id[1] == 5041 || id[1] == 5045)
				id[1] = 5022;
			if (!p[id[1]])
				return;
			var craft = i.hasClass("uncraftable") ? 0 : 1,
				trade = i.hasClass("untradable") ? 0 : 1,
				name = i.attr("data-name");
			if (name.indexOf("Australium") != -1 && name != "Australium Gold")
			{
				id[2] *= -1;
				if (localStorage.aust === undefined)
				{
					var imgs = {
						"Ambassador": "http://backpack.tf/images/440/backpack/weapons/c_models/c_ambassador/parts/c_ambassador_opt_gold.png",
						"Axtinguisher": "http://backpack.tf/images/440/backpack/weapons/c_models/c_axtinguisher/c_axtinguisher_pyro_gold.png",
						"Black Box": "http://backpack.tf/images/440/backpack/weapons/c_models/c_blackbox/c_blackbox_gold.png",
						"Blutsauger": "http://backpack.tf/images/440/backpack/weapons/c_models/c_leechgun/c_leechgun_gold.png",
						"Eyelander": "http://backpack.tf/images/440/backpack/weapons/c_models/c_claymore/c_claymore_gold.png",
						"Flame Thrower": "http://backpack.tf/images/440/backpack/weapons/c_models/c_flamethrower/c_flamethrower_gold.png",
						"Force-A-Nature": "http://backpack.tf/images/440/backpack/weapons/c_models/c_double_barrel_gold.png",
						"Frontier Justice": "http://backpack.tf/images/440/backpack/weapons/c_models/c_frontierjustice/c_frontierjustice_gold.png",
						"Grenade Launcher": "http://backpack.tf/images/440/backpack/weapons/w_models/w_grenadelauncher_gold.png",
						"Knife": "http://backpack.tf/images/440/backpack/weapons/w_models/w_knife_gold.png",
						"Medi Gun": "http://backpack.tf/images/440/backpack/weapons/c_models/c_medigun/c_medigun_gold.png",
						"Minigun": "http://backpack.tf/images/440/backpack/weapons/w_models/w_minigun_gold.png",
						"Rocket Launcher": "http://backpack.tf/images/440/backpack/weapons/w_models/w_rocketlauncher_gold.png",
						"Scattergun": "http://backpack.tf/images/440/backpack/weapons/c_models/c_scattergun_gold.png",
						"SMG": "http://backpack.tf/images/440/backpack/weapons/w_models/w_smg_gold.png",
						"Sniper Rifle": "http://backpack.tf/images/440/backpack/weapons/w_models/w_sniperrifle_gold.png",
						"Stickybomb Launcher": "http://backpack.tf/images/440/backpack/weapons/w_models/w_stickybomb_launcher_gold.png",
						"Tomislav": "http://backpack.tf/images/440/backpack/weapons/c_models/c_tomislav/c_tomislav_gold.png",
						"Wrench": "http://backpack.tf/images/440/backpack/weapons/w_models/w_wrench_gold_large.png"
					};
					name = name.substr(name.indexOf("Australium")+11, name.length-1);
					i.find("img").attr("src", imgs[name]);
				}
			}
			if (!p[id[1]][id[2]])
				return;
			if (!p[id[1]][id[2]][trade])
				return;
			if (!p[id[1]][id[2]][trade][craft])
				return;
			var s = 0;
			if (is_unusual)
			{
				var bg = i.css("background-image");
				if (bg == "none")
					return;
				s = parseInt(bg.split("effects/")[1].split(".png")[0]);
			}
			if (i.find(".series_no").length)
				s = parseInt(i.find(".series_no").html().substr(1));
			//items with Community Sparkle
			if (name == "Self-Made Mann Co. Supply Crate Key" || ((id[1] == 294 || id[1] == 160) && i.css("background-image") != "none"))
				s = 4;
			if (!p[id[1]][id[2]][trade][craft][s])
				return;
			var itemattr = (i.attr("data-attributes") || "")+(tooltip ? "<br><span class='label'>Suggested value:</span> "+pricetext(getprice(id[1], id[2], trade, craft, s), is_unusual)+"</span>" : '');
			i.data("attributes", itemattr).attr("data-attributes", itemattr);
			if (localStorage.show !== undefined)
			{
				total += getprice(id[1], id[2], trade, craft, s, "USD", true);
				var item = p[id[1]][id[2]][trade][craft][s],
					a = i.find("a.item_summary");
				if (a.find("> *").eq(1).length)
					a.find("> *").eq(1).before('<div class="equipped">'+pricetext(round(total, item[1], item[2], item[0], name == "Refined Metal"))+'</div>');
				else
					a.append('<div class="equipped">'+pricetext(round(total, item[1], item[2], item[0], name == "Refined Metal"))+'</div>');
			}
			if (localStorage.changes !== undefined)
			{
				var obj = getprice(id[1], id[2], trade, craft, s),
					now = Math.round((new Date()).getTime()/1000),
					last = parseInt(localStorage.lastupdate),
					date = obj[3]+now-last;
				if (obj[4] == 0)
					var cn = "fa-white fa-certificate";
				else if (obj[4] < 0)
					var cn = "fa-red fa-arrow-down";
				else
					var cn = "fa-green fa-arrow-up";
				if (date < 60*60*24*(parseFloat(localStorage.days) || 3))
					i.find("a.item_summary").append('<div class="fa '+cn+'"></div>');
			}
		});
	});
});