// ==UserScript==
// @name           InvG
// @description    Inventory
// ==/UserScript==

/*
	$Id: inventorygroup.js,v 1.39 2012-02-16 07:03:21 martin Exp $
	
	(c) Spockholm Mafia Tools
	Modifications are welcome, if you let us know about them.
	Thanks @Enrique Medina for FHEL1-4 and the grouping
	Thanks @OfficerJake for Vegas, Italy, Bk, Cuba & Moscow
*/
javascript:(function (){
	var rev=/,v (\d+\.\d+)\s201/.exec("$Id: inventorygroup.js,v 1.39 2012-02-16 07:03:21 martin Exp $")[1],
	version='Inventory Group v'+rev+' - By <a href="http://www.spockholm.com/mafia/experimental.php">Spockholm Mafia Tools</a>',
	debug = false,
	spocklet = "invgroup",
	items = {},
	showhidden = false;
	groups = [];
	groups.push({"name":"FHEL1","items":['1805','1806','1807','1808','1809','1810', '1811', '1812', '1813', '1814', '1815', '1816'],"group":"FHEL","type":"hidden"});
	groups.push({"name":"FHEL2","items":['2095','2096','2097','2098'],"group":"FHEL","type":"hidden"});
	groups.push({"name":"FHEL3","items":['2656','2655','2657','2654'],"group":"FHEL","type":"hidden"});
	groups.push({"name":"FHEL4","items":['2667','2668','2669','2670'],"group":"FHEL","type":"hidden"});
	groups.push({"name":"FHEL5","items":['2703','2704','2705','2706','7036','7037'],"group":"FHEL"});
	groups.push({"name":"FHEL6","items":['1996','1997','1998','1999'],"group":"FHEL"});
	groups.push({"name":"FHEL7","items":['5280','5285','5287','5293','2968','2969','2970','2971'],"group":"FHEL"});
	groups.push({"name":"FHEL8","items":['16001','16002','16003','16004'],"group":"FHEL"});
	groups.push({"name":"FHEL9","items":['16091','16092','16093','16094'],"group":"FHEL"});

	groups.push({"name":"Vegas","items":['2159','2013','2076','2172','2168','2169','2066','2166'],"type":"hidden"});
	groups.push({"name":"Vegas (2ND)","items":['2170','2164','2073','2074','2075','2071','2069','2165','2070','2160','2171','2161','2015','2167'],"type":"hidden"});
	groups.push({"name":"Italy","items":['5349','5351','5345','5339','5348','5337','5350','5330'],"type":"hidden"});
	groups.push({"name":"Italy (2ND)","items":['5324','1059','5344','5326','1068','1053','1046','5329','5335','1058','1069','1045','5336','1054','5340','5341','1047','1044'],"type":"hidden"});	
	groups.push({"name":"Bangkok","items":['1550','1503','1548','1547','1545','1546','1542','1543','1520','1526'],"type":"hidden"});
	groups.push({"name":"Moscow","items":['1022','1019','1003','1014','1026','1028','1029','1008','1017'],"type":"hidden"});
	groups.push({"name":"Cuba","items":['183','182','205','200','198','201','261','267'],"type":"hidden"});
	
	groups.push({"name":"Fight Club","items":['1120','1121','1122','1123','1124','1125','1126','1127']});
	groups.push({"name":"Operations","items":['5621','5622','5623','5624','5625','5626','5627','5628','5997','5998','5999','6000','6001']});
	groups.push({"name":"Brazil Ruby","items":['7105','7106','7107','7108','7109','7110','7111']});
	groups.push({"name":"Warlord (Tier 1)","items":['261','491','528','675','1506','1547','1705','1706','1707','1708','1709','1710','1711','1712','1713','1714'],"type":"hidden"});
	groups.push({"name":"Warlord (Tier 2)","items":['1760','1761','1762','1763','1766','1767','1768','1770','1773','1777'],"type":"hidden"});
	groups.push({"name":"Warlord (Tier 3)","items":['1764','1765','1769','1771','1772','1774','1775','1776','1778','1779'],"type":"hidden"});
	groups.push({"name":"Warlord (Tier 4)","items":['2710','2711','2712','2713','2714','2715','2716','2717','2718','2719'],"type":"hidden"});
    groups.push({"name":"Warlord (Tier 5)","items":['2720','2721','2722','2723','2724','2725','2726','2727','2728','2729'],"type":"hidden"});
    groups.push({"name":"Warlord (Tier 6)","items":['8231','8232','8233','8234','8235','8236','8237','8238','8239','8240'],"type":"hidden"});
    groups.push({"name":"Warlord (Tier 7)","items":['8241','8242','8243','8244','8245','8246','8247','8248','8249','8250'],"type":""});
    groups.push({"name":"Warlord (Tier 8)","items":['8251','8252','8253','8254','8255','8256','8257','8258','8259','8260'],"type":""});
	groups.push({"name":"Warlord (Tier 9)","items":['16123','16124','16125','16126','16127','16128','16129','16130','16131','16132'],"type":""});
	groups.push({"name":"Warlord (Tier 10)","items":['16133','16134','16135','16136','16137','16138','16139','16140','16141','16142'],"type":""});
	groups.push({"name":"Warlord (Tier 11)","items":['16143','16144','16145','16146','16147','16148','16149','16150','16151','16152'],"type":""});
	groups.push({"name":"Warlord (Tier 12)","items":['16279','16280','16281','16282','16283','16284','16285','16286','16287','16288'],"type":""});
	groups.push({"name":"Warlord (Tier 13)","items":['16289','16290','16291','16292','16293','16294','16295','16296','16297','16298'],"type":""});
	groups.push({"name":"Warlord (Tier 14)","items":['16299','16300','16301','16302','16303','16304','16305','16306','16307','16308'],"type":""});
    groups.push({"name":"Epic Boss fight","items":['5420','5421','5422','5423','5424','5425','5426','5427','5428','5429','5430','5431','5432','5433','5434','5435','5436','5437','5438','5439','JEFF','5440','5416','5417','5418','5419','SILVERIO','8069','8065','8066','8067','8068','CLYDE AXWORTHY','11209','11206','11207','11208','11210','JIMMY LECHON','2368','2364','2365','2366','2367','DR. SARAH SWIFT','12104','12100','12101','12102','12103','THE ICE QUEEN','12109','12105','12106','12107','12108']}); 
    groups.push({"name":"Smuggler's Haven ","items":['8027','8028','8029','8030']});
    groups.push({"name":"New Cuba Loot ","items":['1322','1323','1324','1325','1326','1327','1328','1329','1330','1331','1332','1333','1334','1335']});
    groups.push({"name":"El Dorado","items":['Mission','8064','2498','2459','128','2422','2485','2278','Loot','5681','5682','5683','5684']});
    groups.push({"name":"Leticia Colombia ","items":['5700','5701','5702','5703','5704','5705','5706','5707','5708','8188']});
    groups.push({"name":"Henchmen","items":['2936','2937','2938','2939','2940','2941','2942','2943','2936',]});
    groups.push({"name":"Chicago 1-3","items":['11019','11020','11021','11022','11023','11024','11025','11026','11027','11028','11029','11030','11031','11032','11033','11034','11035','11036','11037','11038','11039','11040','11041','11042','11043','11044','11045','11046','11047']});
    groups.push({"name":"Chicago Warehouse","items":['11056','11057','11058','11059','11060','11061','11062','11063','11064','11065']});
	groups.push({"name":"Chicago other","items":['11048','11049','11050','11051','11052','11053','11054','11055','3229','3212','3245']});
	groups.push({"name":"Zombie Invasion","items":['2972','2973','2974','2975','2976','2977','2978','2979']});
	groups.push({"name":"Chicago 4-6","items":['3204','3205','3221','3222','3238','3239']});
	groups.push({"name":"City of Traverse","items":['5710','5711','5712','5713','5709']});
	groups.push({"name":"Snake Island","items":['8319','8320','8321','8322','8323','8324','8325','8326','8327']});
	groups.push({"name":"Save Don's Dinner","items":['15000','15001','15002','15003','15004','15005']});
	//groups.push({"name":"Family Battle Rewards","items":['15000','15001','15002','15003','15004','15005']});
	
	
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	//<unframe>
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Christopher(?) for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
	}
	//</unframe>

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	var cb = User.id;
	var params = {
		'ajax': 1, 
		'liteload': 1, 
		'sf_xw_user_id': User.id,
		'sf_xw_sig': local_xw_sig,
		'cb': cb,
		'xw_client_id': 8,
		'skip_req_frame': 1
	};

	$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />');
	$('#popup_fodder').append("<div id='"+spocklet+"_content'>Please wait, loading inventory database...</div>");
	$('#'+spocklet+'_content').dialog({ title: version, close: function(){ $('#'+spocklet+'_content').remove(); }, width: 750, position: ['center',100]});
	
	$.ajax({
		type: "POST",
		url: http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=inventory&xw_action=view&xw_city=&from_controller=inventory',
		data: params,
		success: function (response) {
			$('#spocktext').html('Page is now loaded, parsing the content...');
			var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
			var WorstItems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
			for (x in ZyngaItems) {
				ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
				items[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}
			}
			$("#"+spocklet+"_content").html('');
			$('#'+spocklet+'_content').append('<div id="'+spocklet+'_tabs" style="margin-bottom: 10px;"></div>\n');
			$('#'+spocklet+'_content').append('<div><a href="http://www.spockholm.com/mafia/donate.php?InventoryGroup" style="text-decoraton:underline;">Support Team Spockholm</a>. <a href="#" id="'+spocklet+'_showall">Show hidden groups</a></div>');
			var output = '';
			var fragment = 1;
			output += '<ul>\n';
			for (var x=0;x<groups.length;x++) {
				output += '<li'+(groups[x].type=='hidden'?' class="'+spocklet+'_hiddentab" style="display:none;"':'')+'><a href="#fragment-'+fragment+'"><span>'+groups[x].name+'</span></a></li>\n';
				fragment++;
			}
			output += '</ul>\n';
			fragment = 1;
			for (var x=0;x<groups.length;x++) {
				var count=0, att=0, def=0, list="";
				var Group = groups[x];
				output += '<div id="fragment-'+fragment+'">';
				fragment++;
				//$("#"+spocklet+"_content").append('<p><strong>'+Group.name+'</strong></p>');
				for(var y=0;y<Group.items.length;y++) {
					if(parseInt(Group.items[y])>0) {
						var Item = items[Group.items[y]];
						if (Item){
							count += Item.quantity;
							var attplus=0,defplus=0;
							if (WorstItems[Item.type]) {
								att += Item.equipped_offense*(Item.attack-WorstItems[Item.type].att);
								def += Item.equipped_defense*(Item.defense-WorstItems[Item.type].def);
								attplus=((Item.attack -WorstItems[Item.type].att)>0?' (+'+(Item.attack -WorstItems[Item.type].att)+')':'');
								defplus=((Item.defense-WorstItems[Item.type].def)>0?' (+'+(Item.defense-WorstItems[Item.type].def)+')':'');
							}
							var type; 
							switch(Item.type)
							{
								case 1:
								type="Weapon";
								break;
								case 2:
								type="Armor";
								break;
								case 3:
								type="Vehicle";
								break;
								case 8:
								type="Animal";
								break;
								case 13:
								type="Henchmen";
								break;
								default:
								type="Unknown";
							}
							list += '<tr><td><span class="'+(Item.quantity==0?'bad':'')+'">'+Item.name+'</span></td><td><span>'+type+'</span></td><td><span class="attack">'+Item.attack+attplus+'</span></td><td><span class="defense">'+Item.defense+defplus+'</span></td><td>&times;'+Item.quantity+'</td><td>(<span style="color:#FF9121;">'+Item.equipped_offense+'</span>/<span style="color:#609AD1;">'+Item.equipped_defense+'</span>)</td></tr>';
						}
					} else {
						list+='<tr><td colspan=4><b>'+Group.items[y]+'</b></td></tr>';
					}
				}
				output += 'Attack Gained:+'+att+'<br />Defense Gained:+'+def+'<br />Total: '+count+'<br /><table><th>Name</th><th>Type</th><th>Attack</th><th>Defense</th><th>Have</th><th>Using</th>'+list+'</table>';
				output += '</div>\n';
			}
			//output += '</div>\n'
			$('#'+spocklet+'_tabs').append(output);
			$('#'+spocklet+'_tabs').tabs();
			$('#'+spocklet+'_showall').click(function(){
				if(showhidden) {
					$(this).html('Show hidden groups');
					$('.'+spocklet+'_hiddentab').hide();
				} else {
					$(this).html('Hide hidden groups');
					$('.'+spocklet+'_hiddentab').show();
				}
				showhidden=!showhidden;
				return false;
			});
		}
	});
	
	//testing to add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0)
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
	var pageTracker = _gat._getTracker("UA-8435065-3");
	pageTracker._trackPageview();
	pageTracker._trackPageview("/script/InventoryGroup"); 
	} catch(err) {}
	//end analytics
}())