// ==UserScript==
// @name        Command and Conquer TA POIs Analyser
// @description Display alliance's POIs scores and next tier requirements.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.3
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/171353.meta.js
// @downloadURL https://userscripts.org/scripts/source/171353.user.js
// ==/UserScript==

(function(){
	var ccta_apa = function(){
		console.log('script started');
		var multiplier = {1:100, 2:90, 3:85, 4:80, 5:76, 6:72, 7:68, 8:64, 9:60, 10:57, 11:54, 12:51, 13:48, 14:45, 15:42, 16:39, 17:36, 18:33, 19:30, 20:28, 21:26, 22:24, 23:22, 24:20, 25:18, 26:16, 27:14, 28:13, 29:12, 30:11, 31:10, 32:9, 33:8, 34:7, 35:6, 36:5, 37:4, 38:3, 39:2, 40:1, 0:0};
		var score = {12:1, 13:3, 14:6, 15:10, 16:15, 17:25, 18:40, 19:65, 20:100, 21:150, 22:250, 23:400, 24:650, 25:1000, 26:1500, 27:2500, 28:4000, 29:6500, 30:10000, 31:15000, 32:25000, 33:40000, 34:65000, 35:100000, 36:150000, 37:250000, 38:400000, 39:650000, 40:1000000, 41:1500000, 42:2500000, 43:4000000, 44:6500000, 45:10000000};
		var bonus = [[1,3,1200,5,1],[4,8,2000,10,2],[9,15,3000,14,3],[16,26,4000,17,4],[27,49,5500,20,5],[50,89,7000,23,6],[90,159,8500,26,7],[160,259,10000,29,8],[260,419,12000,32,9],[420,749,15000,35,10],[750,1299,18000,38,11],[1300,1199,22000,41,12],[2200,3599,26000,44,13],[3600,5699,30000,47,14],[5700,9699,36000,50,15],[9700,16399,45000,53,16],[16400,27999,60000,56,17],[28000,43999,80000,58,18],[44000,67999,105000,60,19],[68000,114999,135000,62,20],[115000,189999,170000,64,21],[190000,329999,215000,66,22],[330000,509999,270000,68,23],[510000,799999,330000,70,24],[800000,1349999,400000,72,25],[1350000,2199999,480000,74,26],[2200000,3599999,580000,76,27],[3600000,5999999,700000,78,28],[6000000,8999999,830000,80,29],[9000000,14999999,1000000,82,30],[15000000,24999999,1200000,84,31],[25000000,41999999,1450000,86,32],[42000000,64999999,1770000,88,33],[65000000,99999999,2200200,90,34],[100000000,164999999,2700000,92,35],[165000000,269999999,3300000,94,36],[270000000,449999999,4000000,96,37],[450000000,900000000,4800000,98,38]];

		var style = {
			"table": {"margin": "5px", "borderTop": "1px solid #333", "borderBottom": "1px solid #333", "fontFamily": "Verdana, Geneva, sans-serif"},
			"graph": {
				"td": {"width": "68px", "verticalAlign": "bottom", "textAlign": "center"},
				"div": {"width": "24px", "margin": "0 auto -1px auto", "border": "3px solid #333", "borderBottom": "none"}
			},
			"icon": {
				"ul": {"listStyleType": "none", "margin": 0, "padding": 0},
				"div": {"padding": "6px", "marginRight": "6px", "display": "inline-block", "border": "1px solid #000"},
				"p": {"display": "inline", "fontSize": "10px", "color": "#555"},
				"li": {"height": "15px", "padding": "2px", "marginLeft": "10px"}
			},
			"cell": {
				"data": {"width": "68px", "textAlign": "center", "color": "#555", "padding": "3px 2px"},
				"header": {"color": "#416d96", "padding": "3px 2px"}
			},
			"rows": {
				"graph": {"borderBottom": "3px solid #333", "height": "200px"},
				"tr": {"fontSize": "11px", "borderBottom": "1px solid #333",  "backgroundColor": "#d6dde1"}
			}      
		};
						
		var range = function(val){
			if(val == 0) return [0,0,0,0];
			var i;
			bonus.map(function(key){
				if(val > key[0] && val < key[1]) i = key;
			});
			return i;
		};
		
		Element.prototype.css = function(arr){
			for(var prop in arr){
				this.style[prop] = arr[prop];
			}
		};
		
		Element.prototype.prop = function(arr){
			for(var prop in arr){
				this[prop] = arr[prop];
			}
		};
			
		Number.prototype.format = function(){
			var f = "", n = this.toString();
			if(n.length < 3) return this;
			for(i = 0; i < n.length; i++){
				(((n.length - i) % 3 === 0) && (i !== 0)) ? f += "," + n[i] : f += n[i];
			}
			return f;
		};
		
		var addRow = function(title, arr, table, selected){
			var row = document.createElement('tr');
			var header = document.createElement('td');
			row.css(style.rows.tr);
			row.onclick = function(){
				var tr = table.getElementsByTagName('tr');
				for (i = 1; i < tr.length; i++){
					tr[i].style.backgroundColor = '#d6dde1';
				}
				this.style.backgroundColor = '#ecf6fc';
			};
			if(selected == 1) row.style.backgroundColor = '#ecf6fc';
			header.css(style.cell.header);
			header.appendChild(document.createTextNode(title));
			row.appendChild(header);
			for(var key in arr){
				var td = document.createElement('td');
				td.css(style.cell.data);
				td.appendChild(document.createTextNode(arr[key]));
				row.appendChild(td);
			}
		   table.appendChild(row); 
		};
		
		var allianceName, ranks, pois, opois;
		var	poisConstructor = function(){
			console.log('getting data');
			var base = this;
			opois.map(function(poi){
				base.tib = {"scr": ranks[0].s, "color": "#8dc186", "range": range(ranks[0].s), "type": 1, "rank": ranks[0].r, "name": "Tyberka"};
				base.crs = {"scr": ranks[1].s, "color": "#5b9dcb", "range": range(ranks[1].s), "type": 1, "rank": ranks[1].r, "name": "Krycha"};
				base.pwr = {"scr": ranks[2].s, "color": "#8cc1c7", "range": range(ranks[2].s), "type": 1, "rank": ranks[2].r, "name": "Energia"};
				base.tun = {"scr": ranks[3].s, "color": "#d7d49c", "range": range(ranks[3].s), "type": 2, "rank": ranks[3].r, "name": "Piechota"};
				base.urn = {"scr": ranks[4].s, "color": "#dbb476", "range": range(ranks[4].s), "type": 2, "rank": ranks[4].r, "name": "Pojazdy"};
				base.air = {"scr": ranks[5].s, "color": "#c47f76", "range": range(ranks[5].s), "type": 2, "rank": ranks[5].r, "name": "Lotnictwo"};
				base.res = {"scr": ranks[6].s, "color": "#928195", "range": range(ranks[6].s), "type": 2, "rank": ranks[6].r, "name": "Obrona"};
			});
		};
		
		var createTable = function(){
			var scoreData = function(){
				var arr = [];
				for(var x in score){
					arr.push([x, score[x]]);
				};
				return arr;
			};
			var multiplierData = function(){
				var arr = [];
				for(var x in multiplier){
					if(x != 0) arr.push([parseInt(x), multiplier[x] + "%"]);
				};
				return arr;
			};
			var bonusData = function(){
				var arr = [];
				bonus.map(function(key){
					arr.push([key[4], key[0], key[2], key[3] + "%"]);
				});
				return arr;
			};
			
			var columns = [["POI Level", "Score"], ["Tier", "Score Required", "Bonus", "Percentage"], ["Rank", "Multiplier"]];
			var rows = [scoreData(), bonusData(), multiplierData()];
			
			var make = function(n){
				var model = new qx.ui.table.model.Simple();
					model.setColumns(columns[n]);
					model.setData(rows[n]);
				var table = new qx.ui.table.Table(model);
					table.setColumnVisibilityButtonVisible(false);
					table.setHeaderCellHeight(25);
					table.setMarginTop(20);
					table.setMinWidth(500);
				var renderer = new qx.ui.table.cellrenderer.Default();
					renderer.setUseAutoAlign(false);
				for (i = 0; i < columns[n].length; i++){
					table.getTableColumnModel().setDataCellRenderer(i, renderer);
				}
				return table;
			};
							
			this.score = make(0);
			this.bonus = make(1);
			this.multiplier = make(2);
		};
		tables = new createTable();
		
		var getData = function(){
			var a = ClientLib.Data.MainData.GetInstance().get_Alliance(),
				p = a.get_OwnedPOIs(),
				n = a.get_Name(),
				r = a.get_POIRankScore();
			if(!a || !p || !n || !r){
				setTimeout(getData, 1000);
				console.log('waiting for data');
				return;
			}else{
				console.log('data accessable')
				ranks = r;
				opois = p;
				allianceName = n;
				pois = new poisConstructor();
			}
		};
		
		var updateGraph = function(){
			console.log('reloading graph');
			var div = document.getElementById('graph');
			if(!div){
				setTimeout(updateGraph, 1000);
				return;
			}
			getData();
			div.innerHTML = "";
			graph('graph');
		};
		
		var setLayout = function(){
			console.log('creating layout');
			var tab = new qx.ui.tabview.Page("Nieciekawe Typy");
				tab.setLayout(new qx.ui.layout.Grow());
				tab.setPadding(10);
				tab.addListener('appear', updateGraph, this);
			
			var label = new qx.ui.basic.Label("Made by zdoom.  Modification by Yanek.").set({
								textColor: "text-value",
								font: "font_size_13",
								padding: 10
							});
							
			var img = new qx.ui.basic.Image('http://imageshack.us/a/img33/6715/pfim.png');
				img.setAlignX("center");
			
			var scrl = new qx.ui.container.Scroll();
			
			var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				cont.setMinHeight(1500);
				cont.setPadding(10);
			
			var gb = new qx.ui.groupbox.GroupBox("Statystyka");
				gb.setLayout(new qx.ui.layout.VBox(10));
				gb.setMarginLeft(2);
		
			
			var lgb = new webfrontend.gui.GroupBoxLarge('Pojeczki');
				lgb.setLayout(new qx.ui.layout.Canvas());
				
			var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				lgbc.setPadding(60,10,40,10);
				
			var widget = new qx.ui.core.Widget();
				widget.setMinWidth(628);
				widget.setMinHeight(335);
				
			var html = new qx.html.Element('div', null, {id: "graph"});
			
			var info = new qx.ui.groupbox.GroupBox("Dodatkowe Informacje");
				info.setLayout(new qx.ui.layout.VBox());
				info.setMarginTop(10);
				
			var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(2,1));
			
			var buttonCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				buttonCont.setMarginTop(10);
				
			var tableCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				tableCont.setMinWidth(500);
				
			grid.add(buttonCont, {row: 1, column: 1});
			grid.add(tableCont, {row: 1, column: 2});
			
			[['Punkty', 'score'], ['Mnoznik', 'multiplier'], ['Prog', 'bonus']].map(function(key){
				var table = tables[key[1]];
					table.setColumnVisibilityButtonVisible(false);
					table.setHeaderCellHeight(25);
					table.setMarginTop(20);
					table.setMinWidth(500);
					
				var button = new qx.ui.form.Button(key[0]);
					button.setWidth(100);
					button.setMargin(10, 10, 0, 10);
					button.addListener('execute', function(){
						tableCont.removeAll();
						tableCont.add(table);
					}, this);
					
				buttonCont.add(button);
			});
			
			tableCont.add(tables.score);
			info.add(grid);
			
			tab.add(scrl);
			scrl.add(cont);
			cont.add(img);
			cont.add(lgb);
			cont.add(label);
			lgb.add(lgbc);
			lgbc.add(gb);
			lgbc.add(info);
			gb.add(widget);
			widget.getContentElement().add(html);
			
			webfrontend.gui.alliance.AllianceOverlay.getInstance().getChildren()[12].getChildren()[0].add(tab);
		};
		
		var graph = function(id){
			console.log('creating graph');
			var table = document.createElement('table'),
				gc = document.createElement('tr'),
				gh = document.createElement('td'),
				ul = document.createElement('ul');
			
			table.prop({"id": "data", "cell-spacing": 0, "cell-padding": 0, "rules": "groups", "width": "100%"});
			table.css(style.table);
			gc.css(style.rows.graph);
			ul.css(style.icon.ul);
			gh.appendChild(ul);
			gc.appendChild(gh);
			table.appendChild(gc);
			
			var score = [], tier = [], nextTier = [], bns = [], nextBns = [], poiRank = [], m = 0;
			
			for(var key in pois){
				var min = pois[key].range[0],
					max = pois[key].range[1],
					rank = (pois[key].rank > 40) ? 0 : pois[key].rank,
					color = pois[key].color,
					name = pois[key].name,
					scr = pois[key].scr,
					td = document.createElement('td'),
					div = document.createElement('div'),
					li = document.createElement('li'),
					icon = document.createElement('div'),
					p = document.createElement('p');
					
					bns[m] = (pois[key].type == 1) ? Math.round(pois[key].range[2] * (1 + multiplier[rank]/100)).format() :
													Math.round(pois[key].range[3] * (1 + multiplier[rank]/100)) + "%";
					poiRank[m] = pois[key].rank + " (" + multiplier[rank] + "%)";
					score[m] = (pois[key].scr).format();
					tier[m] = (max == 0) ? 0 : pois[key].range[4];
					nextTier[m] = (max == 0) ? 1 : (max - scr + 1).format();
					nextBns[m] = (pois[key].type == 1) ? Math.round(bonus[tier[m]][2] * (1 + multiplier[rank]/100)).format() :
													Math.round(bonus[tier[m]][3] * (1 + multiplier[rank]/100)) + "%";
				
				var h = (scr == 0) ? 0 : Math.round((scr - min)/(max - min) * 100);
		
				div.css(style.graph.div);
				div.style.backgroundColor = color;
				div.style.height = h * 2 - 3 + 'px';
				td.css(style.graph.td);
				td.appendChild(div);
				gc.appendChild(td);
				icon.css(style.icon.div);
				icon.style.backgroundColor = color;
				p.appendChild(document.createTextNode(name));
				p.css(style.icon.p);
				li.css(style.icon.li);
				li.appendChild(icon);
				li.appendChild(p);
				ul.appendChild(li);
				m++;
			}
			addRow('Prog', tier, table);
			addRow('Ranking Sojuszu', poiRank, table);		
			addRow('Punkty', score, table);
			addRow('Do nastepnego progu', nextTier, table);
			addRow('Bonus', bns, table, 1);
			addRow('Nastepny prog', nextBns, table);
			document.getElementById(id).appendChild(table);
		}		
		setLayout();
	};

	function ccta_apa_loader(){
		var qx = window["qx"];
		var ClientLib = window["ClientLib"];
		var webfrontend = window["webfrontend"];
		
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(ccta_apa_loader, 10000);
			console.log('retrying....');
			return;
		}
		else {
			ccta_apa();
		}
	}
	
	function ccta_apa_startup(){
		setTimeout(ccta_apa_loader, 10000);
	};
	
	ccta_apa_startup();
})();