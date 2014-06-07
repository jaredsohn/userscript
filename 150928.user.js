// ==UserScript==
// @name           we_lou_tweak
// @description    LOU Player Info Exporter
// @namespace      we_lou_tweak
// @author         weshaw
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.2.2
// @grant		   GM_log
// ==/UserScript==
(function(){

var we_lou_tweak_global = function(){
var we_lou_tweak = function()
{
	var main = {};
	main.o = {
		timers : {
			main_loop : 5000
		},
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
	main.main_loop = function(){
		main.get_members();
	};
	main.init = function(){
		main.add_controls();
		main.loop_timer = setInterval(function(){main.main_loop();},main.o.timers.main_loop);		
		console.log("we_lou_tweak initialized.");
	};
	
	main.loaded = function() {
		try {
			if (typeof qx != 'undefined') {
				main.server = {};
				main.app = qx.core.Init.getApplication(); // application
				main.server_time = webfrontend.data.ServerTime.getInstance().refTime;
				if (main.app && main.server_time) {
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
	main.get_members = function()
	{
		main.members = webfrontend.data.Alliance.getInstance().getMemberData();
		if(main.app.title.member_info_button)
			{ main.app.title.member_info_button._applyLabel("Get Members ("+main.member_info.length+"/"+(main.members.length)+")"); }
	};
	main.csv = function(columns,data){
		var op = '';
		for(i=0;i<columns.length;i++)
			{ op+= ''+((columns[i]+'').replace('"','\"'))+''+(columns.length>(i+1)?'\t':'\n'); }
		for(x=0;x<data.length;x++)
		{
			var d = data[x];
			for(i=0;i<columns.length;i++)
				{ op+='"'+((d[i]+'').replace('"','\"'))+'"'+(columns.length>(i+1)?'\t':'\n'); }
		}
		return op;
	};
	main.member_info = [];
	main.display_member_info = function()
	{
		var res = webfrontend.res.Main.getInstance();
		var dialog = new webfrontend.gui.ConfirmationWidget();
		var mems = [];
		var cities = [];
		var names = [];
		var scores = [];
		var ucities = {};
		var city_types = ['city','castle','palace'];
		var city_locations = ['land','water'];
		for(x=0;x<main.member_info.length;x++)
		{
			var member = main.member_info[x].member;
			var data = main.member_info[x].data;
			names.push(member.n);
			mems.push([member.i, (main.o.title[member.t][(member.f?1:0)]||''), member.n, data.p, data.r, member.c, data.fup.ft, data.fup.ftr, data.fup.ud, data.fup.udr, data.fup.p, data.fup.pr]);
			if(data.c.length>0)
			{
				for(i=0;i<data.c.length;i++)
				{
					if(typeof ucities[member.n] == "undefined")
						{ ucities[member.n] = []; }
					ucities[member.n].push([data.c[i].i,member.n,	(('000'+data.c[i].x).substr(-3))+":"+(('000'+data.c[i].y).substr(-3)), data.c[i].n, data.c[i].p, city_types[data.c[i].s], city_locations[data.c[i].w]]);
				}
			}
		}
		mems.sort(function(a,b) { return parseFloat(b[3]) - parseFloat(a[3]) } );
		names = names.sort();
		for(x=0;x<names.length;x++)
		{
			var cits = ucities[names[x]];
			cits = cits.sort(function(a,b){ return parseFloat(b[4]) - parseFloat(a[4]) });
			for(w=0;w<cits.length;w++)
				{ cities.push(cits[w]); }
		}
		//info
		var mem_h = ["id", "title", "name", "score", "player_rank", "total_cities", "fame_total", "fame_rank", "defeated_total", "defeated_rank", "plunder_total",	"plunder_rank"];
		// cities
		var cities_h = ["id", "owner", "coords", "name", "score", "city_type", "location"];

		var stats = {
			'Player_Stats' : main.csv(mem_h,mems),
			'Player_Cities' : main.csv(cities_h,cities)
		};
		var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
		dialog.dialogBackground._add(bgImg, {
			left: 0,
			top: 0
		});
		// add texts
		var posx = 30;
		var ti = 303;
		var ta = {};
		for(i in stats)
		{
			ta[i] = new qx.ui.form.TextArea(stats[i]).set({allowGrowY: true, allowGrowX: false, tabIndex: ti});
			dialog.dialogBackground._add(ta[i], {left: posx, top: 50, width: 160, height: 45});
			posx += 180;
			ti ++;
		}
		ta['Player_Stats'].selectAllText();
		var okButton = new qx.ui.form.Button("OK");
		okButton.setWidth(120);
		okButton.addListener("click", function(){dialog.disable();}, false);
		
		dialog.dialogBackground._add(okButton, {left: 445, top: 50});
		qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});	
		dialog.show();
		
	};
	main.add_controls = function()
	{
		main.get_members();
		var res = webfrontend.res.Main.getInstance();
		try {
			var container = main.app.title.logoImg.getLayoutParent();
			var menu = new qx.ui.menu.Menu();
			
			var member_info_button = new qx.ui.form.Button("Get Members (0/"+(main.members.length)+")").set({
				marginTop: 2,
				marginLeft: 1190
			});
			member_info_button.setWidth(160);
			member_info_button.setHeight(32);
			container._add(member_info_button, {
				row: 0,
				column: 15
			});
			member_info_button.addListener("click", function (event) {
				main.get_member_info();
			}, this);
			main.app.title.member_info_button = member_info_button;
		} catch (e) {
			console.log("bummer, didn't work. " + e);
		}
	}
	main.get_member_info = function(callback,ct)
	{
		if(typeof ct == "undefined")
		{
			if(main.getting_members === true)
				{ return false; }
			main.getting_members = true;
			ct = 0;
			main.get_members();
			main.member_info = [];
		}
		if(typeof main.members[ct] == "object")
		{
			var m = main.members[ct];
			if(m.i)
			{
				var tm = main.members.length;
				var inst = webfrontend.net.CommandManager.getInstance();
				inst.sendCommand("GetPublicPlayerInfo",{id:m.i},this,function(status,data){
					var l = main.member_info.push({"member":m,"data":data});
					// update button text
					main.app.title.member_info_button._applyLabel("Get Members ("+main.member_info.length+"/"+(main.members.length)+")");
					if(tm==l)
					{
						main.getting_members = false;
						main.display_member_info();
						if(typeof callback == "function"){ callback(main.member_info); }
					}
					else
					{
						ct++;
						setTimeout(function(){
							main.get_member_info(callback,ct);
						},300);
					}
				});
			}
		}
	};
	main.get_palace_contrubutions = function()
	{
		var inst = webfrontend.net.CommandManager.getInstance();
		inst.sendCommand("AllianceResourceStatistic",{},this,function(status,data){
			console.log(status);
			console.log(data);
			
		});
	};
	if (/lordofultima\.com/i.test(document.domain))
		{ window.setTimeout(function(){main.loaded();}, 1000); }
	return main;
};
window.wlt = new we_lou_tweak();
console.log("we_lou_tweak injected.");
};


	
// inject
if (/lordofultima\.com/i.test(document.domain))
{
	var link_css = document.createElement("style");
	link_css.type = "text/css";
	link_css.innerHTML = "* { text-overflow:clip !important;  }";
	document.getElementsByTagName("head")[0].appendChild(link_css);
	
	var we_lou_tweakScript = document.createElement("script");
	txt = we_lou_tweak_global.toString();
	we_lou_tweakScript.innerHTML = "(" + txt + ")();";
	we_lou_tweakScript.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(we_lou_tweakScript);
	
}

})();