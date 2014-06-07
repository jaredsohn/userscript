// ==UserScript==
// @name        Ogame Loots bbcode exporter
// @namespace   benneb
// @description export your loots to board
// @include     http://*.ogame.*/game/index.php?*page=messages*
// @version     1.0.4
// @updateURL      http://userscripts.org/scripts/source/165249.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165249.user.js
// ==/UserScript==

var lootingInj = (function(){

	var totalm = 0;
	var totalc = 0;
	var totald = 0;
	var crStr = "";
	var colorLoot = "#FF9900";
	var commandant = document.getElementById ("officers").getElementsByTagName ("a") [0].className.indexOf (" on") >= 0;
	var serveur = document.getElementsByName('ogame-universe')[0].content;
	var langue = document.getElementsByName('ogame-language')[0].content;
		
	var text = 
	{
		help : "Add loots to export box",
		metal : "Metal",
		cristal : "Crystal",
		deut : "Deut",
		pillage : "Loots" 
	}

	if ( langue == 'fr')	
	{
		text = 
		{
			help : "Ajoute la liste des pillages à la boite d'export",
			metal : "Métal",
			cristal : "Cristal",
			deut : "Deut",
			pillage : "Pillages" 
		}
	}
	
	function Looting()	{
		
		function format(x) {
			if (x==0) {return x;} else {
				var str = x.toString(), n = str.length;

				if (n <4) {return x;} else {
					return ((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.');
				}
			}
		}
	
		var loots = new Array();
		
		var entry = document.getElementsByClassName('entry trigger');
		if( entry.length > 0 )
		{
			
			var iterator = 0;
			for(i=0 ; i< entry.length ; i++)
			{
				var rcid = entry[i].id
				rcid = rcid.substring(2,rcid.length);
				
				$.get('http://'+ serveur +'/game/index.php?page=showmessage&ajax=1&msg_id='+ rcid, function(resp, e, i){
				
					try{
						var respTable = document.createElement('div');
							respTable.innerHTML = resp;
						
						var loot = $(respTable).find('td.summary table td:eq(2)').html().trim().replace(/\./g,'');
						    loot = /(\d+).*?(\d+).*?(\d+)/.exec(loot);
						
						loots[loot[1]+loot[2]+loot[3]] =  new Array( loot[1], loot[2], loot[3] );
							
					 } catch(e) { };
					 
					 iterator++;
					 document.getElementById("refresh").innerHTML = iterator;
			
				});
			}
			function displayTab() 
			{
				if( iterator == entry.length)
				{
					clearInterval(refreshIntervalIddisplayTab);
					
					var planet = document.getElementById('planet');
					var textareastr = "";
					
					for (i in loots)
					{
						totalm += parseInt(loots[i][0]);
						totalc += parseInt(loots[i][1]);
						totald += parseInt(loots[i][2]);
						
						var ligne = ""+text.metal+" : [color="+colorLoot+"][b]"+format(loots[i][0])+"[/b][/color] "+text.cristal+" : [color="+colorLoot+"][b]"+format(loots[i][1])+"[/b][/color] "+text.deut+" : [color="+colorLoot+"][b]"+format(loots[i][2])+"[/b][/color]\n";
						textareastr += ligne;
						crStr += ligne;
					}
					var total = totalm + totalc + totald;
					
					var resume =  "\n\n "+text.metal+" : [color="+colorLoot+"][b]"+format(totalm)+"[/b][/color] "+text.cristal+" : [color="+colorLoot+"][b]"+format(totalc)+"[/b][/color] "+text.deut+" : [color="+colorLoot+"][b]"+format(totald)+"[/b][/color] "+text.pillage+" : [color=#00ff00][b]"+format(total)+"[/b][/color]";
					
					textareastr += resume;
					
					if( document.getElementById('zonecode') )
					{
						var zonecode = document.getElementById('zonecode');
						zonecode.innerHTML = crStr+resume;
					}
					else
					{
						planet.setAttribute("style","margin:0 auto 120px");
						planet.innerHTML = '<textarea  id="zonecode" style="width:100%;z-index:100000;" onClick="javascript:this.select();">'+textareastr+'</textarea>';
					}
					addButton();
				}
			}
			var refreshIntervalIddisplayTab = setInterval(displayTab,1000);
		}
	}
	
	function addButton()  {	
		var reiter = document.getElementsByClassName( commandant ? 'reiter active'  : 'msgNavi aktiv' );
		
		if( reiter.length > 0 )
		{
			if( (reiter[0].id == "5" && commandant) ||  (reiter[0].id == "101" && !commandant))
			{
				clearInterval(refreshIntervalIdaddButton);
				
				var tabs = document.getElementById('planet');
				
				var divbutton =  document.getElementById('refresh') ? document.getElementById('refresh')  : document.createElement('div');
				divbutton.id = "refresh";
				divbutton.innerHTML = "<img src='http://www.projet-alternative.fr/images/upload/141.png' />";
				divbutton.addEventListener("click", Looting, true);
				divbutton.title = text.help;
				
				tabs.appendChild(divbutton);
				
				$('.c-left').remove();
				$('.c-right').remove();
			}
		}
	}
	
	var refreshIntervalIdaddButton = setInterval(addButton,1000);
	
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + lootingInj + ")();";
document.body.appendChild(script);		