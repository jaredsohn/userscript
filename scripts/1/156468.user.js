// ==UserScript==
// @name           alliance_info_exporter
// @description    LOU Alliance Member Exporter
// @namespace      alliance_info_exporter
// @author         weshaw
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.00
// @grant		   GM_log
// ==/UserScript==
(function(){

var alliance_info_exporter_global = function(){
var alliance_info_exporter = function()
{
	var main = {};
	main.version = '1.00';
	main.aix = {};
	main.stored = {};
	main.o = {
		server : false,
		timers : {
			main_loop : 5000, // 5 seconds
			cache_time : 1800 // 30 min
		},
		gender : ['male','female'],
		city_type : ['city','castle','palace'],
		city_location : ['land','water'],
		crown : ['None','Gold','Silver','Bronze'],
		title : [
			['Noob','Noob'],
			['Sir','Maid'],
			['Knight','Dame'],
			['Baron','Baroness'],
			['Viscount','Viscountess'],
			['Earl','Countess'],
			['Marquess','Marchioness'],
			['Prince','Princess'],
			['Duke','Duchess'],
			['King','Queen'],
			['Emperor','Empress']
		]
	};
	main.updates = {};
	main.main_loop = function(){
		main.updates.members = main.alliance.getMemberData();
		if(main.aix.ui)
		{
			main.aix.update_ui();
		}
	};
	main.save_options = function()
	{
		localStorage.setItem("aix_options",qx.lang.Json.stringify(main.stored));
	};
	main.init = function()
	{
		// get saved options
		main.stored = {server:false};
		var ls = localStorage.getItem("aix_options");
		
		if(ls)
			{ main.stored = qx.lang.Json.parse(ls); }
		if(typeof main.stored == "object")
			{ main.o = $.extend(main.o,main.stored); }
			
		/* js_server script */
		if(typeof js_server!="function")var js_server=function(o){this.o=$.extend({uri:false,method:"POST",type:"json"},o);this.option=function(key,val){if(typeof key=="object")this.o=$.extend(this.o,key);else if(typeof val!="undefined")this.o[key]=val;else return this.o[key];return this};this.send=function(data,callback){if(!this.o.uri){ return false; }if(typeof data=="function"){callback=data;data={}} if(typeof data != "object"){data = {};} return $.ajax({crossDomain:true,type:this.o.method,url:this.o.uri,data:main.extend_data(data),dataType:this.o.type,success:function(json){if(typeof callback=="function")callback(json)}})}};
		main.ajax = new js_server({uri:main.o.server});
 		main.world = {
			id : main.server.getId(),
			name : main.server.getName()
		};
		main.world.number = parseInt(main.world.name.replace(/World\s+([0-9]+)\s+.*/gi,'$1'),10);
		main.loop_timer = setInterval(function(){main.main_loop();},main.o.timers.main_loop);
		
		main.browser = main.get_browser_version();

		main.top_alliances = [];
		main.get_alliances(function(a){
			main.top_alliances = a;
		});
		
		btn = new qx.ui.form.Button("aiX");
		btn.set({width: 35, appearance: "button-text-small", toolTipText: "Alliance Info Exporter"});
		btn.addListener("click", main.aix.show_ui, this);
		main.app.serverBar.add(btn, {top: 2, left: 3});
		console.log("alliance_info_exporter initialized.");
	};
	main.get_browser_version = function()
	{
	    var N= navigator.appName, ua= navigator.userAgent, tem;
	    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	    return {'type':M[0],'version':M[1]};
	};
	main.aix.build_ui = function()
	{
		main.aix.update_ui = function()
		{
			if(main.aix.tabfields && main.aix.tabfields[0].title)
				{ main.aix.tabfields[0].title.setValue(main.alliance.getName()+" - members: "+main.updates.members.length+"/100"); }
		}
		main.aix.updatebuttons = function()
		{
			if(!main.aix.ui) { return false; }
			var tab = main.aix.ui.getTab();
			var sel = main.aix.get_selection(tab.index);
			var id = sel.selected_alliance || false;
			var type = sel.select_export_data || false;
			// disable buttons
			main.aix.export_show.setEnabled(false);
			main.aix.export_csv.setEnabled(false);
			main.aix.send_to_server.setEnabled(false);
			main.aix.clearcache.setEnabled(false);
			var do_filters = true;
			if(!main.aix.is_loading && id && type)
			{
				var t = main.aix.tabfields[index];
				main.aix.export_show.setEnabled(true);
				main.aix.export_csv.setEnabled(true);
				main.aix.clearcache.setEnabled(true);
				if(main.aix.can_server)
					{ main.aix.send_to_server.setEnabled(true); }
				if(type == "city" || type == "member")
					{ main.aix.filters_on(true); do_filters = false; }
			}
			if(do_filters)
				{ main.aix.filters_on(false); }
		};
		main.aix.last_continent = "";
		main.aix.filters_on = function(bool,index)
		{
			if(typeof index == "undefined")
			{
				var tab = main.aix.ui.getTab();
				index = tab.index;
			}
			if(!main.aix.tabfields[index] || !main.aix.tabfields[index].filters)
				{ return false; }
			bool = (bool ? true:false);
			var f = main.aix.tabfields[index].filters;
			f.continent.setEnabled(bool);
			f.city_type.palace.setEnabled(bool);
			f.city_type.castle.setEnabled(bool);
			f.city_type.city.setEnabled(bool);
			f.coords.x.setEnabled(bool);
			f.coords.y.setEnabled(bool);
			f.coords.dist.setEnabled(bool);
			// populate continents field
			if(bool)
			{
				main.aix.last_continent = f.continent.getSelection()[0].getModel();
				f.continent.removeAll();
				f.continent.add(new qx.ui.form.ListItem("Show All Continents", null, ""));
				var sel = main.aix.get_selection(index);
				var id = sel.selected_alliance || false;
				var type = sel.select_export_data || false;
				if(id!==false && main.aix.saveddata[id] && main.aix.saveddata[id]['city'])
				{
					var conts = {};
					var ca = [];
					var d = main.aix.saveddata[id]['city'].data;
					var member = false;
					for(var i = 0; i<d.length; i++)
					{
						cities = d[i].cities;
						for(var x = 0; x<cities.length; x++)
						{
							cont = main.aix.coord_to_cont(cities[x].coords);
							if(!conts[cont])
								{ ca.push(cont); }
							conts[cont] = true;
						}
					}
					ca.sort();
					for(i=0;i<ca.length;i++)
						{ f.continent.add(new qx.ui.form.ListItem(ca[i], null, ca[i])); }
					if(conts[main.aix.last_continent])
						{ f.continent.setModelSelection([main.aix.last_continent]); }
					conts = null;
				}
			}
		};
		main.aix.fixcoords = function(coords)
		{
			coords = coords.replace(/[^0-9\:]+/gi,'').split(":");
			return (('000'+coords[0]).substr(-3))+":"+(('000'+coords[1]).substr(-3));
		};
		main.aix.coord_to_cont = function(coords)
		{
			var cont = main.aix.fixcoords(coords).split(":");
			return "C"+cont[1].substr(0,1) + cont[0].substr(0,1);
		};
		main.aix.getdata = function(button,callback)
		{
			var tab = main.aix.ui.getTab();
			var sel = main.aix.get_selection(tab.index);
			var id = sel.selected_alliance || false;
			var type = sel.select_export_data || false;
			res = '';
			if(typeof main.aix.actions[type] == "function")
			{
				main.aix.is_loading = true;
				main.aix.set_loading(tab.index,"Loading...");
				main.aix.setdata(tab.index,"Loading Please Wait..");
				main.aix.actions[type](id,function(json,filtered){
					main.aix.is_loading = false;
					main.aix.updatebuttons();
					main.aix.clearcache.setEnabled(true);
					if(json)
					{
						data = main.aix.format_data(button,json);
						main.aix.setdata(tab.index,data);
						main.aix.set_loading(tab.index,"Complete!",1000);
						if(button == "send_to_server" && main.aix.can_server)
						{							
							if(!main.aix.get_saved(id,type).sent)
							{
								// get alliance info about data
								main.get_alliance(id,function(a){
									
									// send to server
									req = main.ajax.send({
										alliance : {
											id : a.id,
											name : a.name,
											members : a.members,
											score : a.total_score										
										},
										data_type:type,
										data:json
									});					
									if(req){
										req.success(function(x){
											main.aix.set_loading(tab.index,"Data sent to server!",1000);
											main.aix.get_saved(id,type).sent = true;
											
										});
									}
								});
							}
							else
								{ main.aix.set_loading(tab.index,"This data has already been sent.",2000); }
						}
						if(typeof callback == "function")
							{ callback(json); }
					}
				},
				// progress
				function(percent){
					main.aix.set_loading(tab.index,main.aix.percent_loaded(percent));
				});
			}
			main.aix.updatebuttons();
		};
		main.aix.setdata = function(index,value)
		{
			value = value || '';
			if(main.aix.tabfields[index] && main.aix.tabfields[index].data)
				{ main.aix.tabfields[index].data.setValue(value); }
			return (main.aix.tabfields[index] && main.aix.tabfields[index].data);
		};
		main.aix.clear_cache = function()
		{
			main.aix.saveddata = {};
			var tab = main.aix.ui.getTab();
			main.aix.set_loading(tab.index,"Cache Cleared.",1000);
			main.aix.clearcache.setEnabled(false);
		};
		main.aix.format_data = function(type,json)
		{
			data = '';
			switch(type)
			{
				case "export_show" :
					data = main.data.make_text(json);
				break;
				case "export_csv" :
					data = main.data.make_csv(json);
				break;
				case "send_to_server" :
					data = main.data.make_json_string(json);
				break;
			}
			return data;
		};
		main.aix.lastsave = false;
		main.aix.saveddata = {};
		main.aix.get_saved = function(id,type)
		{
			if(!main.aix.saveddata[id] || !main.aix.saveddata[id][type])
				{ return false; }
			return main.aix.saveddata[id][type];
		};
		main.aix.set_saved = function(id,type,data)
		{
			var ts = main.get_time();
			if(!main.aix.saveddata[id])
				{ main.aix.saveddata[id] = {}; }
			main.aix.saveddata[id][type] = { t: ts, data : data, sent : false };
			if(type == "city")		{ main.aix.saveddata[id]["member"] = { t: ts, data : data, sent : false }; }
			if(type == "member")	{ main.aix.saveddata[id]["city"] = { t: ts, data : data, sent : false }; }
			return main.aix.saveddata[id][type];
		};
		main.aix.actions = {
			// alliance member data
			member : function(id,callback,progress)
			{
				old_data = main.aix.get_saved(id,"member");
				data = false;
				
				if(old_data && main.time_past(old_data.t)<=main.o.timers.cache_time)
					{ data = old_data.data; }
				var submit = function(json)
				{
					var cities = main.aix.filter_cities(json);
					var cs = {};
					for(var i = 0; i<cities.length; i++)
						{ cs[cities[i].owner_id] = true; }
					var members = [];
					for(var i = 0; i<json.length; i++)
						{ if(cs[json[i].info.id]){ members.push(json[i].info);} }
					callback(members);
				};
				if(!data)
				{
					main.get_alliance_members(id,true,function(json){
						if(json)
						{
							main.aix.set_saved(id,"member",json);
							submit(json);
						}
					},function(percent){ progress(percent); });
				}
				else
					{ submit(data); }
			},
			// alliance city data
			city : function(id,callback,progress)
			{
				old_data = main.aix.get_saved(id,"city");
				data = false;
				if(old_data && main.time_past(old_data.t)<=main.o.timers.cache_time)
					{ data = old_data.data; }
				var submit = function(json)
				{
					var cities = main.aix.filter_cities(json);
					callback(cities);
				};
				if(!data)
				{
					main.get_alliance_members(id,true,function(json){
						if(json)
						{
							main.aix.set_saved(id,"city",json);
							submit(json);
						}
					},function(percent){ progress(percent); });
				}
				else
					{ submit(data); }
					
				
			},
			// palace supporters
			support : function(id,callback)
			{
				old_data = main.aix.get_saved(id,"support");
				data = false;
				if(old_data && main.time_past(old_data.t)<=main.o.timers.cache_time)
					{ data = old_data.data; }
				if(!data)
				{
					main.get_supporters(function(json){
						if(json)
						{
							main.aix.set_saved(id,"support",json);
							callback(json);
						}
					});
				}
				else
					{ callback(data); }
			}
		};
		main.aix.get_selection = function(index)
		{
			if(typeof index == "undefined") { index = main.aix.ui.getTab().index; } 
			if(typeof main.aix.tabfields[index] != "object")
				{ return false; }
			var fields = main.aix.tabfields[index];
			var sel = {};
			var f = ["selected_alliance","select_export_data"];
			for(var i = 0; i<f.length; i++)
				{ if(fields[f[i]]){ sel[f[i]] = fields[f[i]].getSelection()[0].getModel(); } }
			if(typeof sel.selected_alliance == "undefined")
				{ sel.selected_alliance = main.alliance.getId(); }
			sel.selected_alliance = parseInt(sel.selected_alliance,10);
			return sel;
		};
		main.aix.get_filter = function(index)
		{
			if(typeof index == "undefined") { index = main.aix.ui.getTab().index; } 
			if(typeof main.aix.tabfields[index] != "object" || !main.aix.tabfields[index].filters)
				{ return false; }
			var fields = main.aix.tabfields[index].filters;
			var f = {
				continent : fields.continent.getSelection()[0].getModel() || false,
				coords : {
					x: fields.coords.x.getValue() || false,
					y: fields.coords.y.getValue() || false,
					dist: parseInt(fields.coords.dist.getValue(),10) || false
				},
				city_type : {
					palace : fields.city_type.palace.getValue() || false,
					castle : fields.city_type.castle.getValue() || false,
					city : fields.city_type.city.getValue() || false
				}
			};
			if(f.coords.x && f.coords.y)
			{
				f.coords.string = main.aix.fixcoords((f.coords.x.replace(/[^0-9]+/gi,''))+":"+(f.coords.y.replace(/[^0-9]+/gi,'')));
				var c = f.coords.string.split(":");
				f.coords.x = parseInt(c[0],10);
				f.coords.y = parseInt(c[1],10);
				f.cont = "C"+(c[1].substr(0,1))+(c[0].substr(0,1));
			}
			return f;
		};
		main.aix.filter_cities = function(json,index)
		{
			var f = main.aix.get_filter(index);
			var cities = [];
			for(var i = 0; i<json.length; i++)
			{
				if(typeof json[i].cities != "undefined")
				{
					var c = json[i].cities;
					for(var x = 0; x<c.length; x++)
					{
						keep = true;
						// types
						if(!f.city_type[c[x].city_type])
							{ keep = false; }
						if(keep)
						{
							if(f.continent && f.continent != main.aix.coord_to_cont(c[x].coords))
								{ keep = false; }
							else if(f.coords.x && f.coords.y && f.coords.dist)
							{
								var coords = main.aix.fixcoords(c[x].coords).split(":");
								var cx = parseInt(coords[0],10);
								var cy = parseInt(coords[1],10);
								keep = (
									f.coords.x+f.coords.dist >= cx && f.coords.x-f.coords.dist <= cx &&
									f.coords.y+f.coords.dist >= cy && f.coords.y-f.coords.dist <= cy
								);
							}
							// add
							if(keep)
								{ cities.push(c[x]); }
						}
					}
				}
			}
			return cities;
		};
		main.aix.set_loading_timer = false;
		main.aix.set_loading = function(index,text,clear)
		{
			clearTimeout(main.aix.set_loading_timer);
			if(!text)  { text = ""; }
			if(!clear) { clear = false; }
			var t = main.aix.tabfields[index];
			if(t.alliance_loading)
			{
				t.alliance_loading.setValue("Results: "+text);
				if(clear)
				{
					clear = parseInt(clear,10);
					main.aix.set_loading_timer = setTimeout(function(){t.alliance_loading.setValue("Results:");},(clear<1000?1000:clear));
				}
			}
		};
		main.aix.percent = function(current,total)
			{ var p = Math.round((current/total)*100); return p>100?100:(p||0); }
		main.aix.percent_loaded = function(p)
		{
			steps = 2;
			loaded = (new Array( Math.round(p/steps)+1 ).join('#'));
			space = (new Array( Math.round((100-p)/steps)+1 ).join('–'));
			var pt = p+'%';
			var lt = '|'+loaded+space+'|';
			var text = lt.substr(0, Math.floor((lt.length/2) - Math.floor((pt.length+(p<10?0:4))/2)))+' '+pt+' '+lt.substr(-Math.floor((lt.length/2) - Math.floor(pt.length/2)));
			return text;
		}
		main.aix.is_loading = false;
		main.aix.can_server = false;
		main.aix.test_api = function()
		{
			if(main.aix.stored && main.aix.stored.server)
			{
				main.aix.server_resp.setValue("Not Connected.");
				main.aix.can_server = false;
				var val = main.aix.stored.server.getValue();
				if((val+'').substr(0,4)!="http")
					{ val = false; }
				req = false;
				if(val)
				{
					message = "Connected!";
					req = main.ajax.option({uri:val}).send({data_type:"connection_test"});					
					if(req){
						req.success(function(x){
							if(typeof x == "object" && typeof x.message == "string")
								{ message = x.message; }
							main.stored.server = val;
							main.save_options();
							main.aix.server_resp.setValue(message);
							main.aix.can_server = true;
						});
					}
				}
			}
		};
		// ! MianUI class
		qx.Class.define("ai_export.aix.mainui", {
			extend: webfrontend.gui.OverlayWidget,
			construct: function() {
				main.aix.tabfields = [];
				webfrontend.gui.OverlayWidget.call(this);
				this.clientArea.setLayout(new qx.ui.layout.Canvas());
				this.setTitle("Alliance Info Exporter - "+main.version);
				this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
				this.tabPages = [
					{name:"My Alliance", page:null, vbox:null},
					{name:"Other Alliances", page:null, vbox:null},
					{name:"Options", page:null, vbox:null}
				];
				for (i=0; i<this.tabPages.length; i++) {
					page = new qx.ui.tabview.Page(this.tabPages[i].name);
					page.setLayout(new qx.ui.layout.Canvas());
					vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					scroll = new qx.ui.container.Scroll(vbox);
					page.add(scroll, {top: 0, left: 0, right: 0, bottom: 0});
					this.tabPages[i].vbox = vbox;
					this.tabPages[i].page = page;
					main.aix.tabfields[i] = {};
				}				
				// filter elements
				var filter_results = function(index)
				{
					main.aix.tabfields[index].filters = {};
					// filter continent
					main.aix.tabfields[index].filters.continent = main.aix.create_field.select({title:"Show Continent",options:{"":"Show All Continents"},size:{width: 250,height: 28}});
					main.aix.tabfields[index].filters.continent.set({toolTipText:"Will be populated after data is cached."});
					// filter city type
					main.aix.tabfields[index].filters.city_type = {
						palace : new qx.ui.form.CheckBox("Palaces"),
						castle : new qx.ui.form.CheckBox("Castles"),
						city : new qx.ui.form.CheckBox("Cities")
					};
					// filter from coords
					main.aix.tabfields[index].filters.coords = {
						x		: new qx.ui.form.TextField(''),
						y		: new qx.ui.form.TextField(''),
						dist 	: new qx.ui.form.TextField('10')
					};
					var b = [];
					main.aix.tabfields[index].filters.container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					var ft = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					ft.add(new qx.ui.basic.Label("Filter Results:"));
					ft.set({marginBottom:3});
					main.aix.tabfields[index].filters.container.add(ft);
					var v = [];
					
					v[0] = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					// select continant
					b[0] = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					b[0].add(new qx.ui.basic.Label("Show Continent"));
					b[0].add(main.aix.tabfields[index].filters.continent);
					v[0].add(b[0]);
					
					// or
					b[1] = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					b[1].add(new qx.ui.basic.Label("or"));
					b[1].set({marginLeft:15,marginRight:15});
					v[0].add(b[1]);
					
					// distance
					b[2] = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					b[2].add(new qx.ui.basic.Label("Distance from Coords:"));
					
					b[3] = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					main.aix.tabfields[index].filters.coords.dist.set({width:40})
					b[3].add(main.aix.tabfields[index].filters.coords.dist);
					b[3].add(new qx.ui.core.Spacer(5));
					b[3].add(new qx.ui.basic.Label("squares from:"));
					b[3].add(new qx.ui.core.Spacer(5));
					main.aix.tabfields[index].filters.coords.x.set({width:40})
					b[3].add(main.aix.tabfields[index].filters.coords.x);
					b[3].add(new qx.ui.basic.Label(":"));
					main.aix.tabfields[index].filters.coords.y.set({width:40})
					b[3].add(main.aix.tabfields[index].filters.coords.y);
					b[2].add(b[3]);
					v[0].add(b[2]);
					// add to container
					main.aix.tabfields[index].filters.container.add(v[0]);
					
					// show types
					v[1] = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					var t = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					t.add(new qx.ui.basic.Label("Show City Types:"));
					t.set({marginTop:10});
					v[1].add(t);
					
					b[5] = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					b[5].add(new qx.ui.core.Spacer(15));
					main.aix.tabfields[index].filters.city_type.palace.setValue(true);
					b[5].add(main.aix.tabfields[index].filters.city_type.palace);
					b[5].add(new qx.ui.core.Spacer(10));
					main.aix.tabfields[index].filters.city_type.castle.setValue(true);
					b[5].add(main.aix.tabfields[index].filters.city_type.castle);
					b[5].add(new qx.ui.core.Spacer(10));
					main.aix.tabfields[index].filters.city_type.city.setValue(true);
					b[5].add(main.aix.tabfields[index].filters.city_type.city);
					v[1].add(b[5]);
					main.aix.tabfields[index].filters.container.add(v[1]);
					main.aix.filters_on(false,index);
					return main.aix.tabfields[index].filters.container;
				};

				
				// !----- Page 1
				main.aix.tabfields[0].title = new qx.ui.basic.Label(main.alliance.getName());
				this.tabPages[0].vbox.add(main.aix.tabfields[0].title);
				main.aix.tabfields[0].select_export_data = main.aix.create_field.select({options : {
						""			: "Select One",
						"city"		: "Members Cities",
						"member"	: "Member Data",
						"support"	: "Palace Supporters"
					},
					change : function(val,label)
					{
						main.aix.updatebuttons();
					}
				});
				main.aix.tabfields[0].select_export_data.set({marginBottom:5});
				this.tabPages[0].vbox.add(main.aix.tabfields[0].select_export_data);
				// add filters
				this.tabPages[0].vbox.add(filter_results(0));
				
				main.aix.tabfields[0].alliance_loading = new qx.ui.basic.Label("Results:");
				main.aix.tabfields[0].alliance_loading.set({marginTop:10,marginBottom:3});
				this.tabPages[0].vbox.add(main.aix.tabfields[0].alliance_loading);
				main.aix.tabfields[0].data = new qx.ui.form.TextArea('').set({allowGrowY: true,allowGrowX: true,height:200});
				this.tabPages[0].vbox.add(main.aix.tabfields[0].data);
				

				// !----- Page 2
				main.aix.tabfields[1].title = new qx.ui.basic.Label("Gather Intel On:");
				this.tabPages[1].vbox.add(main.aix.tabfields[1].title);
				var opts = {"":"Select an Alliance"};
				for(i=0;i<main.top_alliances.length;i++)
					{ opts[main.top_alliances[i].id] = main.top_alliances[i].name; }
				var cols = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				main.aix.tabfields[1].selected_alliance = main.aix.create_field.select({title:"Gather Alliance Data",options:opts,
					change:function(val,label)
					{
						main.aix.updatebuttons();
					}
				});
				main.aix.tabfields[1].selected_alliance.set({width:250,marginRight:5});
				cols.add(main.aix.tabfields[1].selected_alliance);
				main.aix.tabfields[1].select_export_data = main.aix.create_field.select({options : {
						""			: "Select One",
						"city"		: "Members Cities",
						"member"	: "Member Data"
					},
					change : function(val,label)
					{
						main.aix.updatebuttons();
					}
				});
				main.aix.tabfields[1].select_export_data.set({width:250,marginLeft:5});
				cols.add(main.aix.tabfields[1].select_export_data);
				this.tabPages[1].vbox.add(cols);
				// add filters
				this.tabPages[1].vbox.add(filter_results(1));
				
				main.aix.tabfields[1].alliance_loading = new qx.ui.basic.Label("Results:");
				main.aix.tabfields[1].alliance_loading.set({marginTop:10,marginBottom:3});
				this.tabPages[1].vbox.add(main.aix.tabfields[1].alliance_loading);
				main.aix.tabfields[1].data = new qx.ui.form.TextArea('').set({allowGrowY: true,allowGrowX: true,height:200});
				this.tabPages[1].vbox.add(main.aix.tabfields[1].data);
				
				// !----- Page 3
				main.aix.stored = {};
				main.aix.tabfields[2].title = new qx.ui.basic.Label("Export Server URL");
				
				this.tabPages[2].vbox.add(main.aix.tabfields[2].title);
				
				main.aix.stored.server = new qx.ui.form.TextField((main.stored.server?main.stored.server:''));
				main.aix.stored.server.addListener("changeValue", function(){ main.aix.test_api(); });
				this.tabPages[2].vbox.add(main.aix.stored.server);
				main.aix.server_resp = new qx.ui.basic.Label("Not Connected.");
				this.tabPages[2].vbox.add(main.aix.server_resp);

				// !----- Save Button
				main.aix.buttonarea = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				
				// human readable button
				main.aix.export_show = new qx.ui.form.Button("Show Data").set({width: 100});
				main.aix.export_show.addListener("click", function(){
					main.aix.getdata("export_show");
				}, this);
				main.aix.export_show.setEnabled(false);
				main.aix.buttonarea.add(main.aix.export_show);
				
				// csv button
				main.aix.export_csv = new qx.ui.form.Button("Export CSV").set({width: 100, marginLeft: 15});
				main.aix.export_csv.addListener("click", function(){
					main.aix.getdata("export_csv");
				}, this);
				main.aix.export_csv.setEnabled(false);
				main.aix.buttonarea.add(main.aix.export_csv);

				// server button
				main.aix.send_to_server = new qx.ui.form.Button("Send To Server").set({width: 110, marginLeft: 15});
				main.aix.send_to_server.addListener("click", function(){
					main.aix.getdata("send_to_server",function(json){
						
					});
				}, this);
				main.aix.send_to_server.setEnabled(false);
				main.aix.buttonarea.add(main.aix.send_to_server);
				
				// clear cache button
				main.aix.clearcache = new qx.ui.form.Button("Clear Cache").set({width: 90, marginLeft: 70});
				main.aix.clearcache.addListener("click", function(){
					main.aix.clear_cache();
				}, this);
				main.aix.clearcache.setEnabled(false);
				main.aix.buttonarea.add(main.aix.clearcache);

				
				// ----- Add pages to tabview
				for (i=0; i<this.tabPages.length; i++) {
					this.tabNames[i] = this.tabPages[i].name;
					this.tabView.add(this.tabPages[i].page);
				}
				this.tabView.addListener("changeSelection", function(e){
					main.aix.updatebuttons();
				});
				
				this.clientArea.add(this.tabView, {top: 0, right: 3, bottom: 30, left: 3});
				this.clientArea.add(main.aix.buttonarea, {right: 3, bottom: 3, left: 3});
				
				main.aix.updatebuttons();
			},
			members: {
				tabView: null,
				tabPages: null,
				tabNames: [],
				clientArea:null,
				getTab : function(){
					var r = {index:false,name:false,label:false};
					var l = this.tabView.getSelection()[0].getLabel();
					for(var i = 0; i<this.tabNames.length; i++)
						{ if(l==this.tabNames[i]) { r={index:i,name:(this.tabNames[i].toLowerCase().replace(/[^a-z0-9_]+/i,' ').replace(/\s+/i,'')),label:this.tabNames[i]}; break; } }
					return r;
				}
			}
		});
		main.aix.create_field = {
			select : function(options)
			{
				var o = $.extend({
					title : false,
					size : {width: 120,height: 28},
					options : {"" : "Select One"},
					change : false
				},options);
				var field = new qx.ui.form.SelectBox().set(o.size);
				
				for(key in o.options)
					{ field.add(new qx.ui.form.ListItem(o.options[key], null, key)); }
				if(typeof o.change == "function")
					{ field.addListener("changeSelection", function(e){ o.change(this.getSelection()[0].getModel(),this.getSelection()[0].getLabel(),this,e);	}, field); }
				return field;
			}
		};
		// !make window
		main.aix.ui = new main.aix.mainui();
		setTimeout(function(){
			main.aix.test_api();
		}, 2000)
	};
	main.aix.show_ui = function(){
		if(!main.aix.ui)
			{ main.aix.build_ui(); }
		 main.app.switchOverlay(main.aix.ui);
	};
	main.get_time = function() { return Math.round((new Date()).getTime() / 1000); };
	main.time_past = function(last_time) { return (Math.round((new Date()).getTime() / 1000) - last_time); };
	main.data = {
		make_text : function(obj)
		{
			if(obj.length==0) { return ''; }
			var columns = [];
			for(i in obj[0]) { columns.push(i); }
			var op = columns.join("\t");
			op += "\n---------------";
			for(i=0;i<obj.length;i++) { op += "\n"; for(x in obj[i]) {op += obj[i][x]+"\t";} }
			return op;
		},
		make_csv : function(obj)
		{
			if(obj.length==0) { return ''; }
			var columns = [];
			for(i in obj[0]) { columns.push('"'+(i.replace('"','\"'))+'"'); }
			var op = columns.join("\t");
			for(i=0;i<obj.length;i++) { op += "\n"; for(x in obj[i]) {op += '"'+(obj[i][x]+'').replace('"','\"')+'"'+"\t";} }
			return op;
		},
		make_json_string : function(obj)
		{
			if(obj.length==0) { return '{}'; }
			return qx.lang.Json.stringify(obj);
		}	
	};
	main.extend_data = function(data)
	{
		data.sender = {
			world: main.world,
			alliance : {
				id	: main.alliance.getId(),
				name: main.alliance.getName()
			},
			player : {
				id	: main.player.getId(),
				name: main.player.getName()
			},
			browser : main.browser,
			aix_version : main.version
		};
		return data;
	};
	main.get_alliances = function(callback,continent,total)
	{
		if(!total) { total = 100; }
		if(!continent) { continent = -1; }
		main.request("AllianceGetRange",{"start":0,"end":(total-1),"continent":continent,"sort":0,"ascending":true,"type":0},function(status,data){
			if(status && typeof callback == "function")
			{
				var a = [];
				for(var i = 0; i<data.length; i++)
					{ a.push({
						id:data[i].i,
						name:data[i].n,
						rank:data[i].r,
						score:data[i].p,
						average:data[i].a,
						members:data[i].m,
						cities:data[i].c,
						won:data[i].w
					}); }
				callback(a);
			}
		});
	};
	main.get_alliance = function(id,callback)
	{
		main.request("GetPublicAllianceInfo",{"id":id},function(status,data){
			if(status && typeof callback == "function")
			{
				callback({
					id:data.i,
					abbr:data.a,
					name:data.n,
					desc:data.d,
					rank:data.r,
					fame_total:data.ft,
					fame_total_rank:data.ftr,
					units_defeated:data.ud,
					units_defeated_rank:data.udr,
					members:data.mc,
					total_score:data.ms,
					average_score: Math.floor(data.ms/data.mc),
					highest_member_title:main.o.title[data.h][0]
				});				
			}
		});
	};
	main.get_alliance_members = function(id,extra,callback,progress)
	{
		if(typeof extra == "function")
			{ callback = extra; extra = false; }
		extra = (extra?true:false);
		main.request("GetPublicAllianceMemberList",{"id":id},function(status,data){
			if(status && typeof callback == "function")
			{
				var a = [];
				for(var i = 0; i<data.length; i++)
				{
					a.push({
						id:parseInt(data[i].i),
						name:data[i].n,
						score:parseInt(data[i].p),
						rank:parseInt(data[i].r),
						total_cities:parseInt(data[i].c),
						crown:main.o.crown[data[i].l]
					});
				}
				a.sort(function(a,b) { return b.score - a.score } );

				if(extra)
				{
					var member_data = [];
					var member_count = a.length;
					var current_index = 0;
					var timeout = false;
					var get_member = function(){
						clearTimeout(timeout);
						var ind = current_index;
						if(!a[ind])
						{
							callback(member_data);
							return false;
						}
						main.get_member(a[ind].id,function(data,cities){
							if(typeof progress == "function")
								{ progress(main.aix.percent(ind,member_count)); }
							member_data.push({
								info	: $.extend(a[ind],data),
								cities	: cities
							});
							setTimeout(function(){ get_member(); },100);
						});
						current_index++;
						timeout = setTimeout(function(){
							get_member();
						},5000);
					};
					get_member();
				}
				else
					{ callback(a); }
			}
		});
	};
	main.get_member = function(id,callback)
	{
		var cities = [];
		var data = {};
		main.request("GetPublicPlayerInfo",{"id":id},function(status,json){
			if(status && typeof callback == "function")
			{

				data = {
					id:parseInt(json.i),
					alliance_id:json.a,
					gender:main.o.gender[json.f],
					title:main.o.title[json.t][(json.f?1:0)],
					name:json.n,
					score: parseInt(json.p),
					rank:parseInt(json.r),
					total_cities:parseInt(json.c.length),
					fame_total: parseInt(json.fup.ft),
					fame_rank: parseInt(json.fup.ftr),
					defeated_total: parseInt(json.fup.ud),
					defeated_rank: parseInt(json.fup.udr),
					plunder_total: parseInt(json.fup.p),
					plunder_rank: parseInt(json.fup.pr)
				};
				if(json.c)
				{
					for(var i = 0; i<json.c.length; i++)
					{
						var c = json.c[i];
						cities.push({
							id: parseInt(c.i),
							owner_id: parseInt(json.i),
							owner: json.n,
							coords: "'"+(('000'+c.x).substr(-3))+":"+(('000'+c.y).substr(-3)),
							name: c.n,
							score:  parseInt(c.p),
							city_type: main.o.city_type[c.s],
							location: main.o.city_location[c.w]
						});
					}
					cities.sort(function(a,b){return b.score - a.score;});
				}
				callback(data,cities);
			}
			else
				{ callback(status); }
		});
	};
	main.get_city = function(id,callback){
		main.request("GetPublicCityInfo",{"id":id},function(status,data){if(status){callback(data);}});
	};
	main.get_report = function(id,callback){
		main.request("GetReport",{"id":id},function(status,data){if(status){callback(data);}});
	};
	main.city_reports = function(id,callback,limit)
	{
		if(!limit){ limit = 20; }
		var rep = [];
		var list = [];
		var index = 0;
		var reports = function()
		{
			if(list[index])
			{
				var id = list[index].i;
				main.get_report(id,function(data){
					rep.push(data);
					if(rep.length==list.length)
						{ callback(rep); }
					else
						{ setTimeout(function(){reports()},100); }
				});
				index++;
			}
		};
		main.get_city(id,function(city){
			var req = {
				"sPlayerName":city.pn,
				"city":id,
				"start":0,"end":(limit-1),"sort":0,"ascending":false,"mask":200703
			};
			main.request("ReportGetHeader",req,function(status,data){
				if(data && data.length>0)
				{
					list = data;
					reports();
				}
			});
		});
	};
	main.get_supporters = function(callback)
	{
		main.request("AllianceResourceStatisticCount",{},function(status,count){
			main.request("AllianceResourceStatistic",{"sortColumnIndex":-1,"ascending":true,"start":0,"end":(count>0 ? count-1:99)},function(status,data){
				var supporters = [];
				if(status && data.length>0)
				{
					for(i=0;i<data.length;i++)
						{ supporters.push({alliance_id:data[i].ai,alliance:data[i].an,player_id:data[i].pi,name:data[i].pn,amount:data[i].r,rank:data[i].ra}); }
				}
				callback(supporters);
			});
		});
	};
	main.get_city_contributors = function(id,callback)
	{
		var contrib = {};
		var restype = ['wood','stone','iron','food'];
		main.city_reports(id,function(d){
			for(i=0;i<d.length;i++)
			{
				var data = d[i];
				var info = {
					time : data.h.d,
					from : data.a[0],
					to : data.a[1],
					res : {wood:0,stone:0,iron:0,food:0}
				};
				if(!contrib[info.from.pn]) { contrib[info.from.pn] = {wood:0,stone:0,iron:0,food:0}; }
				for(x=0;x<data.r.length;x++)
					{ contrib[info.from.pn][restype[data.r[x].t-1]] += parseInt(data.r[x].v,10); }
			}
			callback(contrib);
/*
			var op = '';
			for(n in contrib)
			{
				op += n +": \n";
				op += "wood: "+contrib[n].wood +"\n";
				op += "stone: "+contrib[n].stone +"\n";
				op += "iron: "+contrib[n].iron +"\n";
				op += "food: "+contrib[n].food +"\n";
				op += "\n";
			}
			alert(op);
*/
		});
	};

	main.request = function(type,data,callback)
	{
		if(typeof data == "function")
			{ callback = data; data = {}; }
		var req = webfrontend.net.CommandManager.getInstance();
		req.sendCommand(type,data,this,function(status,data){
			if(typeof callback == "function")
				{ callback(status,data); }
		});
	};
	main.loaded = function() {
		try {
			if (typeof qx != 'undefined') {
				main.app = qx.core.Init.getApplication(); // application
				main.server_time = webfrontend.data.ServerTime.getInstance().refTime;
				main.server = webfrontend.data.Server.getInstance();
				main.alliance = webfrontend.data.Alliance.getInstance();
				main.player = webfrontend.data.Player.getInstance();
				if (main.app && main.server_time && main.server && main.alliance && main.player) {
					main.init();
				} else
					window.setTimeout(function(){main.loaded();}, 1000);
			} else {
				window.setTimeout(function(){main.loaded();}, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		{ window.setTimeout(function(){main.loaded();}, 1000); }
	return main;
};
window.ai_export = new alliance_info_exporter();
console.log("alliance_info_exporter injected.");
};


	
// inject
if (/lordofultima\.com/i.test(document.domain))
{
	var link_css = document.createElement("style");
	link_css.type = "text/css";
	link_css.innerHTML = "* { text-overflow:clip !important;  }";
	document.getElementsByTagName("head")[0].appendChild(link_css);

	var jquery_script = document.createElement("script");
	jquery_script.src = "http://code.jquery.com/jquery.min.js";
	jquery_script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(jquery_script);

	var scripttag = document.createElement("script");
	txt = alliance_info_exporter_global.toString();
	scripttag.innerHTML = "(" + txt + ")();";
	scripttag.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(scripttag);
	
}

})();