// ==UserScript==
// @name        lord_of_glad
// @namespace   s*.gladiatus.fr/*
// @downloadURL    https://userscripts.org/scripts/source/158743.user.js
// @updateURL      http://userscripts.org/scripts/source/158743.meta.js
// @include     http://s*.gladiatus.fr/*
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://code.jquery.com/jquery-latest.js

// @version    9.30
// ==/UserScript==



function get_server(){
		server="s"+document.location.href.split(".gladiatus")[0].split("s")[1];
		return server;
	}

if(!GM_getValue(get_server()+"my_name")){
	// this.$ = this.jQuery = jQuery.noConflict(true);
	// /html/body/div[3]/div/div[4]/div/div[2]/table/tbody/tr/td/div/div
	if(window.location.href.indexOf("mod=overview&sh=")<0){
		window.location.href=get_base()+"mod=overview&sh="+get_sh();
		}
		else{
		GM_setValue(get_server()+"my_name",$('#content>table>tbody>tr:eq(0)>td:eq(0)>div:eq(0)>div:eq(0)').html());
		}
	}
	
	
	
	
	
if(GM_getValue(get_server()+"chargement")=="terminé"){
$(document).ready(function(){

	src = document.getElementsByTagName("body")[0].getElementsByTagName("script")[0].getAttribute("src").split("/")[0];
	GM_setValue(get_server()+"folder",src);
	
	
	
	
	//fonctions diverses
	//attaque,load_dongeon,go_to,get_life,get_stat,update_stat,train_stat,get_next_quest,recup_quest,get_stat,actu_stats
	//{
	
	function attack_X(){
	if(GM_getValue(get_server()+"chargement")=="terminé"){
		X = GM_getValue(get_server()+"mob");
		attack_mob = X.split("(")[1].split(")")[0].split(",");
		location = attack_mob[0];
		mob = attack_mob[1];
		
		if(window.location.href!=get_base()+'mod=location&loc='+location+'&sh='+get_sh()){
			window.location.href=get_base()+'mod=location&loc='+location+'&sh='+get_sh();
		}
		else{
			for(i=0;i < document.getElementsByTagName("button").length;i++){
				if(document.getElementsByTagName("button")[i].getAttribute("onclick")==GM_getValue(get_server()+"mob")){
					document.getElementsByTagName("button")[i].click();
				}
			}
		}
		// auto_click();
		}
	}
	
	function load_dongeon_X(){
		// alert(location.href.split("loc=")[1].split("&")[0]);
		
		if(GM_getValue(get_server()+"chargement")=="terminé"){
		if(window.location.href.indexOf(GM_getValue(get_server()+"dun"))<0){
		// alert(get_base()+GM_getValue(get_server()+"dun")+get_sh());
			
			window.location.href=get_base()+GM_getValue(get_server()+"dun")+get_sh();
			
		}
		else{
		auto_dungeon();
		}
		}
	}


	function go_to(dest){
	if(GM_getValue(get_server()+"chargement")=="terminé"){
		if(dest=='foret'){
			if(window.location.href.indexOf("mod=location&loc=0&sh=")<0){
				window.location.href=get_base()+'mod=location&loc=0&sh='+get_sh();
			}
		
			
		}
		if(dest=='arene'){
			if(window.location.href.indexOf("mod=arena&submod=serverArena&aType=2&sh=")<0){
				window.location.href=get_base()+'mod=arena&submod=serverArena&aType=2&sh='+get_sh();
			}
			
		}
		if(dest=='port'){
		if(window.location.href.indexOf("mod=location&loc=1&sh=")<0){
				window.location.href=get_base()+'mod=location&loc=1&sh='+get_sh();
			}
		}
		if(dest=='monts'){
		if(window.location.href.indexOf("mod=location&loc=2&sh=")<0){
				window.location.href=get_base()+'mod=location&loc=2&sh='+get_sh();
			}
		}
		if(dest=='dungeon'){
			if(window.location.href.indexOf("mod=dungeon&loc=1&dungeon=1&sh=")<0){
				window.location.href=get_base()+'mod=dungeon&loc=1&dungeon=1&sh='+get_sh();
			}
		}
		if(dest=='provinciarum'){
		
			if(window.location.href.indexOf("?mod=arena&submod=serverArena&aType=3&sh=")<0){
			
				window.location.href=get_base()+'mod=arena&submod=serverArena&aType=3&sh='+get_sh();
			}
		}
		if(dest=='quest'){
		
			if(window.location.href.indexOf("?mod=quests&sh=")<0){
			
				window.location.href=get_base()+'mod=quests&sh='+get_sh();
			}
		}
		if(dest=='overview'){
		
			if(window.location.href.indexOf("?mod=overview&sh=")<0){
			
				window.location.href=get_base()+'mod=overview&sh='+get_sh();
			}
		}
		if(dest=='overview2'){
		
			if(window.location.href.indexOf("mod=overview&inv=1&doll=1&sh=")<0){
			
				window.location.href=get_base()+'mod=overview&inv=1&doll=1&sh='+get_sh();
			}
		}
		if(dest=='hide'){
		
			if(window.location.href.indexOf("mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh=")<0){
			
				window.location.href=get_base()+'mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh='+get_sh();
			}
		}
		if(dest=='train'){
		
			if(window.location.href.indexOf("mod=training&sh=")<0){
			
				window.location.href=get_base()+'mod=training&sh='+get_sh();
			}
		}
		}
	}


	function get_life(){
	res = document.getElementById("header_values_hp_bar_fill").getAttribute("style").split(":")[1].split("%")[0];
	return res;
	}
	
	function get_stat_value(){
	this_stat=0;
		for(i=0;i<document.getElementsByTagName("div").length;i++){
			if(document.getElementsByTagName("div")[i].getAttribute("class")=="training_costs"){
				this_stat++;
				that_stat = document.getElementsByTagName("div")[i].innerHTML.split("<img")[0].replace(".","");
				that_stat = parseInt(that_stat,10);
				if(this_stat==1){
				GM_setValue(get_server()+"price_stat_force",that_stat);
				}else if(this_stat==2){
				GM_setValue(get_server()+"price_stat_adresse",that_stat);
				}
				else if(this_stat==3){
				GM_setValue(get_server()+"price_stat_agilite",that_stat);
				}
				else if(this_stat==4){
				GM_setValue(get_server()+"price_stat_constitution",that_stat);
				}
				else if(this_stat==5){
				GM_setValue(get_server()+"price_stat_charisme",that_stat);
				}
				else if(this_stat==6){
				GM_setValue(get_server()+"price_stat_intelligence",that_stat);
				}
				
				
				
				
			}
		
		}
	
	}
	
	function update_stat_value(){
		$(document).ready(function(){
			if(GM_getValue(get_server()+"stat_to_train")!=""){
				// GM_setValue(get_server()+"price_stat_to_train",GM_getValue(get_server()+that_stat));
				// GM_setValue(get_server()+"stat_to_train",this.value);

				that_stat = "price_stat_"+GM_getValue(get_server()+"stat_to_train");
				// alert(GM_getValue(get_server() + that_stat));
				// alert(that_stat);
				GM_setValue(get_server()+"price_stat_to_train",GM_getValue(get_server()+that_stat));
					
				document.getElementById("prix_stat_to_train_aff").innerHTML=GM_getValue(get_server()+"stat_to_train") +" : "+ GM_getValue(get_server()+"price_stat_to_train");

				document.getElementById("td_training").setAttribute("class","button");
				document.getElementById("td_training_aff").setAttribute("class","button");
				
			}
		},true);
	}
	
	function train_stat(){
	this_stat=0;
	if(GM_getValue(get_server()+"stat_to_train")=='force'){the_stat=1;}
	if(GM_getValue(get_server()+"stat_to_train")=='adresse'){the_stat=2;}
	if(GM_getValue(get_server()+"stat_to_train")=='agilite'){the_stat=3;}
	if(GM_getValue(get_server()+"stat_to_train")=='constitution'){the_stat=4;}
	if(GM_getValue(get_server()+"stat_to_train")=='charisme'){the_stat=5;}
	if(GM_getValue(get_server()+"stat_to_train")=='intelligence'){the_stat=6;}
		for(i=0;i<document.getElementsByTagName("div").length;i++){
			if(document.getElementsByTagName("div")[i].getAttribute("class")=="training_link"){
			this_stat++;
				if(this_stat==the_stat){
					document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					get_stat_value();
					update_stat_value();
					window.location.reload();
				}
			
				
				
				
			}
		
		}
	}
	
	
	function get_next_stock(){
		that_time = document.getElementById("bx0").innerHTML;
		tab_time = that_time.split(":");
		if(tab_time.length==3){
			hrs = tab_time[0];
			min = tab_time[1];
			sec = tab_time[2];
			next_date = new Date();
				
				next_date.setHours(parseInt(this_date.getHours(),10)+parseInt(hrs,10));
				next_date.setMinutes(parseInt(this_date.getMinutes(),10)+parseInt(min,10));
				next_date.setSeconds(parseInt(this_date.getSeconds(),10)+parseInt(sec,10));
				test = Date.parse(next_date).toString();
				GM_setValue(get_server()+"next_stock",test);
			// GM_getValue(get_server()+"next_stock");
		}
	}
	
	function get_next_quest(){
	go_to("quest");
	if(parseInt(document.getElementById("quest_header_accepted").innerHTML.split(":")[1].split("/")[0],10)<5){
	
	$(document).ready(function(){
	
	if(document.getElementById("quest_header_accepted").parentNode.getElementsByTagName("span")){
		
			this_span = document.getElementById("quest_header_accepted").parentNode.getElementsByTagName("span")[0];
			if(this_span){
			// this_span = document.getElementById("quest_header_accepted").parentNode.getElementsByTagName("span")[g];
			if(this_span.getAttribute("id")=="ticker1"){
			
				next_date = new Date();
				to_add = this_span.innerHTML;
				next_date.setHours(parseInt(this_date.getHours(),10)+parseInt(to_add.split(":")[0],10));
				next_date.setMinutes(parseInt(this_date.getMinutes(),10)+parseInt(to_add.split(":")[1],10));
				next_date.setSeconds(parseInt(this_date.getSeconds(),10)+parseInt(to_add.split(":")[2],10));
				test = Date.parse(next_date).toString();
				GM_setValue(get_server()+"next_quest",test);
				// alert(next_date);
			}
			else{
			GM_setValue(get_server()+"next_quest",Date.parse(this_date).toString());
			}
			}
		// }
	}
	
	
	
	});
	}
	}
	
	function recup_quest(){
		for(i=0;i<document.getElementsByTagName("div").length;i++){
			if(document.getElementsByTagName("div")[i].getAttribute("class")=="contentboard_slot contentboard_slot_active"){
				// alert("test");   quest_slot_button quest_slot_button_finish
				if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].getAttribute("class")=="quest_slot_button quest_slot_button_finish"){
					for(j=0;j<document.getElementsByTagName("div")[i].getElementsByTagName("div").length;j++){
						if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getAttribute("class")=="quest_slot_reward quest_slot_reward_gold"){
							or_quest = document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0].innerHTML.split("<img")[0]
							alert(or_quest);
						}
						if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getAttribute("class")=="quest_slot_reward quest_slot_reward_honor"){
							
							honneur_quest = document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0].getAttribute("onmouseover").split("Honneur")[0].split("nowrap\\")[1].split(">")[1];
							alert(honneur_quest);
						}
						if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getAttribute("class")=="quest_slot_reward quest_slot_reward_xp"){
							
							xp_quest = document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0].getAttribute("onmouseover").split("Expérience")[0].split("nowrap\\")[1].split(">")[1];
							alert(xp_quest)
						}
					}
				}
			}
		}
	}
	
	function actu_stat(){
	document.getElementById("span_or").innerHTML=GM_getValue(get_server()+"stat_or");
	document.getElementById("span_honneur").innerHTML=GM_getValue(get_server()+"stat_honneur");
	document.getElementById("span_gloire").innerHTML=GM_getValue(get_server()+"stat_gloire");
	document.getElementById("span_combat").innerHTML=GM_getValue(get_server()+"stat_combat");
	document.getElementById("span_victoire").innerHTML=GM_getValue(get_server()+"stat_victoire");
	document.getElementById("span_xp").innerHTML=GM_getValue(get_server()+"stat_xp");
	document.getElementById("span_pillage").innerHTML="<a href="+GM_getValue(get_server()+"lien_gros_pillage")+get_sh()+" title=voir style='color:black'>"+GM_getValue(get_server()+"gros_pillage")+"</a>";
	document.getElementById("span_quest").innerHTML=GM_getValue(get_server()+"nb_quest");
	document.getElementById("percent").innerHTML=(GM_getValue(get_server()+"stat_victoire")/GM_getValue(get_server()+"stat_combat")*100).toFixed(1)+"%";
	document.getElementById("span_date").innerHTML="";
	document.getElementById("span_date").innerHTML=get_horloge_date_stat();


}

	function get_stats(){
	if(window.location.href.indexOf("submod=showCombatReport")!=-1){
	combat_Id = window.location.href.split("reportId=")[1].split("&")[0];
	if(!GM_getValue(get_server()+"combat_"+combat_Id)){
	GM_setValue(get_server()+"stat_combat",parseInt(GM_getValue(get_server()+"stat_combat"),10)+1);
	}
	if(document.getElementById("reportHeader").getAttribute("class")=="reportWin"){
	if(!GM_getValue(get_server()+"combat_"+combat_Id)){
		GM_setValue(get_server()+"combat_"+combat_Id,combat_Id);
		
		if(document.getElementById("reportHeader").getAttribute("class")=="reportWin"){
			if(!$("#content>div:eq(1)>div:eq(1)>div").length){
			// alert("turma ou donjon");
				or_combat = parseInt($("#content>div:eq(2)>div:eq(1)>div>table>tbody>tr>td>p").text().split("pillé:")[1].split("Dont une prime")[0].replace(".",""),10);
				xp_combat = parseInt($("#content>div:eq(2)>div:eq(1)>div>table>tbody>tr>td>p:eq(1)").text().split("a gagné")[1].split("point(s)")[0].replace(".",""),10);
				honneur_combat = 0;
				gloire_combat = parseInt($("#content>div:eq(2)>div:eq(1)>div>table>tbody>tr>td>p:eq(2)").text().split("a reçu")[1].split("gloire")[0].replace(".",""),10);
			}
			else{
				//turma ou expe
				if($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p").text().indexOf("Dont une prime")!=-1){
				// alert("arene");
					or_combat = parseInt($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p").text().split("pillé:")[1].split(GM_getValue(get_server()+"my_name"))[0].replace(".",""),10);
					xp_combat = parseInt($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p:eq(1)").text().split("a gagné")[1].split("point(s)")[0].replace(".",""),10);
					//si il y a gain d honneur
					if($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p:eq(2)").text()){
					honneur_combat = parseInt($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p:eq(2)").text().split("a reçu")[1].split("honneurs")[0].replace(".",""),10);
					}else{
					honneur_combat = 0;
					}
					
					gloire_combat=0;
				}
				else{
					// alert("expe");
					or_combat = parseInt($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p").text().split("a pillé:")[1].split(GM_getValue(get_server()+"my_name"))[0].replace(".",""),10);
					xp_combat = parseInt($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p:eq(1)").text().split("a gagné")[1].split("point(s)")[0].replace(".",""),10);
					honneur_combat = parseInt($("#content>div:eq(1)>div:eq(1)>div>table>tbody>tr>td>p:eq(2)").text().split("a reçu")[1].split("honneurs")[0].replace(".",""),10);
					gloire_combat=0;
				}
			}
			GM_setValue(get_server()+"stat_or",parseInt((parseInt(GM_getValue(get_server()+"stat_or"),10)+parseInt(or_combat,10)),10));
			// alert(GM_getValue(get_server()+"stat_or"));
			GM_setValue(get_server()+"stat_xp",parseInt((parseInt(GM_getValue(get_server()+"stat_xp"),10)+parseInt(xp_combat,10)),10));
			GM_setValue(get_server()+"stat_honneur",parseInt((parseInt(GM_getValue(get_server()+"stat_honneur"),10)+parseInt(honneur_combat,10)),10));
			GM_setValue(get_server()+"stat_gloire",parseInt((parseInt(GM_getValue(get_server()+"stat_gloire"),10)+parseInt(gloire_combat,10)),10));
			GM_setValue(get_server()+"stat_victoire",parseInt(GM_getValue(get_server()+"stat_victoire"),10)+1);
			if(or_combat>GM_getValue(get_server()+"gros_pillage")){
				GM_setValue(get_server()+"gros_pillage",or_combat);
				GM_setValue(get_server()+"lien_gros_pillage",window.location.href.replace(get_sh(),""));
				}
		}
	}
	else{
		
		}
		
		
	}
	else{
		if(!GM_getValue(get_server()+"combat_"+combat_Id)){
		GM_setValue(get_server()+"combat_"+combat_Id,combat_Id);
		window.location.href=get_base()+"mod=quests&sh="+get_sh();
		}
	}



	}
	actu_stat();
	}

	var server ="";

	this_date = new Date();
	//}


	// GM_setValue
	//{
	
	if(!GM_getValue(get_server()+"stat_a_jour")){
	GM_setValue(get_server()+"stat_a_jour",'0');
	}
	if(!GM_getValue(get_server()+"display_stat")){
	GM_setValue(get_server()+"display_stat","inline");
	}
	if(!GM_getValue(get_server()+"turma_quest")){
	GM_setValue(get_server()+"turma_quest","0");
	}
	if(!GM_getValue(get_server()+"arena_quest")){
	GM_setValue(get_server()+"arena_quest","0");
	}
	if(!GM_getValue(get_server()+"enemy_quest")){
	GM_setValue(get_server()+"enemy_quest","0");
	}
	if(!GM_getValue(get_server()+"object_quest")){
	GM_setValue(get_server()+"object_quest","0");
	}
	if(!GM_getValue(get_server()+"secu_stock")){
	GM_setValue(get_server()+"secu_stock",0);
	}
	if(!GM_getValue(get_server()+"action_encours")){
	GM_setValue(get_server()+"action_encours","");
	}
	if(!GM_getValue(get_server()+"display_cachette")){
	GM_setValue(get_server()+"display_cachette","inline");
	}
	if(!GM_getValue(get_server()+"vente_en_cours")){
	GM_setValue(get_server()+"vente_en_cours",0);
	}
	if(!GM_getValue(get_server()+"lien_gros_pillage")){
	GM_setValue(get_server()+"lien_gros_pillage","");
	}
	if(!GM_getValue(get_server()+"display_quest")){
	GM_setValue(get_server()+"display_quest","yes");
	}
	if(!GM_getValue(get_server()+"display_or")){
	GM_setValue(get_server()+"display_or","yes");
	}
	if(!GM_getValue(get_server()+"display_xp")){
	GM_setValue(get_server()+"display_xp","yes");
	}
	if(!GM_getValue(get_server()+"display_vie")){
	GM_setValue(get_server()+"display_vie","yes");
	}
	if(!GM_getValue(get_server()+"display_action")){
	GM_setValue(get_server()+"display_action","yes");
	}
	if(!GM_getValue(get_server()+"stat_victoire")){
	GM_setValue(get_server()+"stat_victoire",0);
	}
	if(!GM_getValue(get_server()+"nb_quest")){
	GM_setValue(get_server()+"nb_quest",0);
	}
	if(!GM_getValue(get_server()+"gros_pillage")){
	GM_setValue(get_server()+"gros_pillage",0);
	}
	if(!GM_getValue(get_server()+"stat_combat")){
	GM_setValue(get_server()+"stat_combat",0);
	}
	if(!GM_getValue(get_server()+"stat_or")){
	GM_setValue(get_server()+"stat_or",0);
	}
	if(!GM_getValue(get_server()+"stat_xp")){
	GM_setValue(get_server()+"stat_xp",0);
	}
	if(!GM_getValue(get_server()+"stat_honneur")){
	GM_setValue(get_server()+"stat_honneur",0);
	}
	if(!GM_getValue(get_server()+"stat_gloire")){
	GM_setValue(get_server()+"stat_gloire",0);
	}
	if(!GM_getValue(get_server()+"date_stat")){
	test = Date.parse(this_date).toString();
	GM_setValue(get_server()+"date_stat",test);
	}
	if(!GM_getValue(get_server()+"next_quest")){		
		GM_setValue(get_server()+"next_quest",Date.parse(this_date).toString());
	}
	if(!GM_getValue(get_server()+"next_stock")){		
		GM_setValue(get_server()+"next_stock",Date.parse(this_date).toString());
	}
	if(!GM_getValue(get_server()+"auto_pex")){
	GM_setValue(get_server()+"auto_pex",0);
	}
	if(!GM_getValue(get_server()+"auto_arene")){
	GM_setValue(get_server()+"auto_arene",0);
	}
	if(!GM_getValue(get_server()+"auto_pro")){
	GM_setValue(get_server()+"auto_pro",0);
	GM_setValue(get_server()+"gladiatus_pro_on_off","off");
	}
	if(!GM_getValue(get_server()+"auto_quest")){
	GM_setValue(get_server()+"auto_quest",0);
	}
	if(!GM_getValue(get_server()+"auto_quest_to_do")){
	GM_setValue(get_server()+"auto_quest_to_do",0);
	}
	if(!GM_getValue(get_server()+"auto_hide")){
	GM_setValue(get_server()+"auto_hide",0);
	}
	if(!GM_getValue(get_server()+"auto_dongeon")){
	GM_setValue(get_server()+"auto_dungeon",0);
	}
	if(!GM_getValue(get_server()+"boss_dungeon")){
	
	GM_setValue(get_server()+"boss_dungeon",'1');
	}
	if(!GM_getValue(get_server()+"region")){
	GM_setValue(get_server()+"region","Italie");
	}
	if(!GM_getValue(get_server()+"affichage_gros")){
	GM_setValue(get_server()+"affichage_gros","0");
	}
	if(!GM_getValue(get_server()+"hp_lvl")){
	GM_setValue(get_server()+"hp_lvl",50);
	}
	if(!GM_getValue(get_server()+"gold_limit_value")){
	GM_setValue(get_server()+"gold_limit_value",10000);
	}
	if(!GM_getValue(get_server()+"gold_limit_low")){
	GM_setValue(get_server()+"gold_limit_low",5000);
	}
	if(!GM_getValue(get_server()+"gold_limit_medium")){
	GM_setValue(get_server()+"gold_limit_medium",10000);
	}

	//}
	
	//récupération de l'horloge de stockage si elle est présente
	if(document.getElementById("bx0")){
		//le temps de restockage est affiché ici
		//calcul de la date du prochain restockage:
		get_next_stock();
		// alert(GM_getValue(get_server()+"next_stock"));
		// alert(hrs.length);
		
	}
	
	//get_time
	//{
	
	function get_time_to_reload(){
	if(GM_getValue(get_server()+"chargement")=="terminé"){
		time_to_reload_pex = '1000000';
		time_to_reload_pro = '1000000';
		time_to_reload_dungeon ='1000000';
		time_to_reload_arena = '1000000';
		time_to_reload_quest = '1000000';
	if(GM_getValue(get_server()+"auto_arene")==1){
	time_to_reload_arena = parseInt(get_time_before_arena())*1000;
	}
	if(GM_getValue(get_server()+"auto_pex")==1){
	time_to_reload_pex = parseInt(get_time_before_pex())*1000;
	}
	if(GM_getValue(get_server()+"auto_dongeon")==1){
	time_to_reload_dungeon = parseInt(get_time_before_dungeon())*1000;
	}
	if(GM_getValue(get_server()+"auto_pro")==1){
	time_to_reload_pro = parseInt(get_time_before_pro())*1000;
	}
	if(GM_getValue(get_server()+"auto_quest")==1){
	time_to_reload_quest = parseInt(get_time_before_quest());
	// alert(time_to_reload_quest);
	}
		
		time_to_reload ='';
		time_to_reload = Math.min(time_to_reload_pex,time_to_reload_pro,time_to_reload_dungeon,time_to_reload_arena,time_to_reload_quest);
		
		
		
		if(time_to_reload==time_to_reload_pro){
		GM_setValue(get_server()+"action_encours","pro");
		GM_setValue(get_server()+"img_action_encours",GM_getValue(get_server()+"folder")+"/img/ui/icon_grouparena.gif");
		
		}
		if(time_to_reload==time_to_reload_arena){
		GM_setValue(get_server()+"action_encours","arena");
		GM_setValue(get_server()+"img_action_encours",GM_getValue(get_server()+"folder")+"/img/ui/icon_arena.gif");
		}
		if(time_to_reload==time_to_reload_dungeon){
		GM_setValue(get_server()+"action_encours","dun");
		GM_setValue(get_server()+"img_action_encours",GM_getValue(get_server()+"folder")+"/img/ui/icon_dungeonpoints.gif");
		}
		if(time_to_reload==time_to_reload_pex){
		GM_setValue(get_server()+"action_encours","pex");
		GM_setValue(get_server()+"img_action_encours",GM_getValue(get_server()+"folder")+"/img/ui/icon_expeditionpoints.gif");
		}
		if(time_to_reload==time_to_reload_quest){
		GM_setValue(get_server()+"action_encours","quest");
		GM_setValue(get_server()+"img_action_encours",GM_getValue(get_server()+"folder")+"/img/powerups/powerup_1.gif");
		}
		
		return time_to_reload;
	}
	}

	function get_time_before_pex(){
		time = document.getElementById("cooldown_bar_text_expedition").innerHTML.split(":");
		res = parseInt(time[0]*3600) + parseInt(time[1]*60) + parseInt(time[2]);
		if(res>0){
		return res;
		}else{
		return 0;
		}
	}

	function get_time_before_arena(){
		time = document.getElementById("cooldown_bar_text_arena").innerHTML.split(":");
		res = parseInt(time[0]*3600) + parseInt(time[1]*60) + parseInt(time[2]);
		if(res>0){
		return res;
		}else{
		return 0;
		}
		

	}

	function get_time_before_pro(){
		time = document.getElementById("cooldown_bar_text_ct").innerHTML.split(":");
		res = parseInt(time[0]*3600) + parseInt(time[1]*60) + parseInt(time[2]);
		if(res>0){
		return res;
		}else{
		return 0;
		}
		

	}

	function get_time_before_dungeon(){
		time = document.getElementById("cooldown_bar_text_dungeon").innerHTML.split(":");
		res = parseInt(time[0]*3600) + parseInt(time[1]*60) + parseInt(time[2]);
		//alert(res);
		if(res>0){
		return res;
		}else{
		return 0;
		}
		

	}

	function get_time_before_quest(){
		res = parseInt(GM_getValue(get_server()+"next_quest")-Date.parse(this_date));
		
		
		if(res>=0){
		return res;
		}else{
		res =0;
		return res;
		}
		
		

	}
	
	//}
	
	//get_base & get_sh & get_server
	//{
	function get_base(){
		base = window.location.toString().split("/")
	 return 'http://'+base[2]+'/game/index.php?';
	}

	function get_sh(){
	if(GM_getValue(get_server()+"chargement")=="terminé"){
		id = window.location.toString().split("sh=");
		// alert(id[1]);
		return id[1];
		}
	}

	
	get_server();
	//}

	
	//get nom_mob & dongeon
	//{
	function get_nom_mob(attak){
	if(GM_getValue(get_server()+"region")=="Italie"){
	if(attak=="attack(0, 1, 0)"){
		return "Rat";
	}
	if(attak=="attack(0, 2, 0)"){
		return "Lynx";
	}
	if(attak=="attack(0, 3, 0)"){
		return "Loup";
	}
	if(attak=="attack(0, 4, 0)"){
		return "Ours (Boss)";
	}
	if(attak=="attack(1, 1, 0)"){
		return "Esclave en Fuite";
	}
	if(attak=="attack(1, 2, 0)"){
		return "Soldat corrompu";
	}
	if(attak=="attack(1, 3, 0)"){
		return "Assassin";
	}
	if(attak=="attack(1, 4, 0)"){
		return "Capitaine (Boss)";
	}
	if(attak=="attack(2, 1, 0)"){
		return "Recrue errante";
	}
	if(attak=="attack(2, 2, 0)"){
		return "Harpie";
	}
	if(attak=="attack(2, 3, 0)"){
		return "Cerbere";
	}
	if(attak=="attack(2, 4, 0)"){
		return "Meduse (Boss)";
	}
	if(attak=="attack(3, 1, 0)"){
		return "Sanglier";
	}
	if(attak=="attack(3, 2, 0)"){
		return "Meute de loups";
	}
	if(attak=="attack(3, 3, 0)"){
		return "Loup-alpha";
	}
	if(attak=="attack(3, 4, 0)"){
		return "Loup-garou(Boss)";
	}
	if(attak=="attack(4, 1, 0)"){
		return "Garde sectaire";
	}
	if(attak=="attack(4, 2, 0)"){
		return "Rat-Garou";
	}
	if(attak=="attack(4, 3, 0)"){
		return "Minotaure";
	}
	if(attak=="attack(4, 4, 0)"){
		return "???(Boss)";
	}
	if(attak=="attack(5, 1, 0)"){
		return "Barbare";
	}
	if(attak=="attack(5, 2, 0)"){
		return "Guerrier Barbare";
	}
	if(attak=="attack(5, 3, 0)"){
		return "Bersek";
	}
	if(attak=="attack(5, 4, 0)"){
		return "???(Boss)";
	}
	if(attak=="attack(6, 1, 0)"){
		return "Soldat renegat";
	}
	if(attak=="attack(6, 2, 0)"){
		return "mercenaire renegat";
	}
	if(attak=="attack(6, 3, 0)"){
		return "assassin perfide";
	}
	if(attak=="attack(6, 4, 0)"){
		return "???(Boss)";
	}

	if(attak=="no"){
		return "désactivé";
	}
	}

	else if(GM_getValue(get_server()+"region")=="Afrique"){
	if(attak=="attack(0, 1, 0)"){
		return "Cobra";
	}
	if(attak=="attack(0, 2, 0)"){
		return "Scorpion géant";
	}
	if(attak=="attack(0, 3, 0)"){
		return "Momie réveillée";
	}
	if(attak=="attack(0, 4, 0)"){
		return "Pretre Seth(Boss)";
	}
	if(attak=="attack(1, 1, 0)"){
		return "Percepteur";
	}
	if(attak=="attack(1, 2, 0)"){
		return "Anthropophage";
	}
	if(attak=="attack(1, 3, 0)"){
		return "Guerrier Tribal";
	}
	if(attak=="attack(1, 4, 0)"){
		return "Chaman osteoman(Boss)";
	}
	if(attak=="attack(2, 1, 0)"){
		return "Loup sanguinaire";
	}
	if(attak=="attack(2, 2, 0)"){
		return "Scarabé Géant";
	}
	if(attak=="attack(2, 3, 0)"){
		return "Danseur de feu";
	}
	if(attak=="attack(2, 4, 0)"){
		return "Démon de feu (Boss)";
	}
	if(attak=="attack(3, 1, 0)"){
		return "Crocodile";
	}
	if(attak=="attack(3, 2, 0)"){
		return "Porteur mort-vivant";
	}
	if(attak=="attack(3, 3, 0)"){
		return "Serpent-aquatique-géant";
	}
	if(attak=="attack(3, 4, 0)"){
		return "Mokélé Mbembé";
	}
	if(attak=="attack(4, 1, 0)"){
		return "Guerrier tribal";
	}
	if(attak=="attack(4, 2, 0)"){
		return "Sorcier Tribal";
	}
	if(attak=="attack(4, 3, 0)"){
		return "Guerrier des esprits";
	}
	if(attak=="attack(4, 4, 0)"){
		return "???(Boss)";
	}
	if(attak=="attack(5, 1, 0)"){
		return "L espion";
	}
	if(attak=="attack(5, 2, 0)"){
		return "Garde de caravane";
	}
	if(attak=="attack(5, 3, 0)"){
		return "Garde d elite";
	}
	if(attak=="attack(5, 4, 0)"){
		return "Marchand d'esclaves(Boss)";
	}
	if(attak=="attack(6, 1, 0)"){
		return "Éléphant";
	}
	if(attak=="attack(6, 2, 0)"){
		return "Guépard";
	}
	if(attak=="attack(6, 3, 0)"){
		return "Lion Démoniaque";
	}
	if(attak=="attack(6, 4, 0)"){
		return "Elephant demoniaque(Boss)";
	}

	if(attak=="no"){
		return "désactivé";
	}
	}

	else if(GM_getValue(get_server()+"region")=="Allemagne"){
	if(attak=="attack(0, 1, 0)"){
		return "Légionnaire ";
	}
	if(attak=="attack(0, 2, 0)"){
		return "Myrmidon ";
	}
	if(attak=="attack(0, 3, 0)"){
		return "Centurion ";
	}
	if(attak=="attack(0, 4, 0)"){
		return "Sansâme (Boss)";
	}
	if(attak=="attack(1, 1, 0)"){
		return "Sanglier géant";
	}
	if(attak=="attack(1, 2, 0)"){
		return "Créature des marais";
	}
	if(attak=="attack(1, 3, 0)"){
		return "Esprit des marais ";
	}
	if(attak=="attack(1, 4, 0)"){
		return "Ours-garou(boss)";
	}
	if(attak=="attack(2, 1, 0)"){
		return "Hun ";
	}
	if(attak=="attack(2, 2, 0)"){
		return "Ancien ";
	}
	if(attak=="attack(2, 3, 0)"){
		return "Affamé ";
	}
	if(attak=="attack(2, 4, 0)"){
		return "L'Abomination (Boss)";
	}
	if(attak=="attack(3, 1, 0)"){
		return "Guerrier squelette";
	}
	if(attak=="attack(3, 2, 0)"){
		return "Berserk squelette";
	}
	if(attak=="attack(3, 3, 0)"){
		return "Liche ";
	}
	if(attak=="attack(3, 4, 0)"){
		return "Prince nécromant(Boss)";
	}
	if(attak=="no"){
		return "désactivé";
	}
	}

	}

	function get_liste_dun_select(){
	if(GM_getValue(get_server()+"region")=="Italie"){
	liste   = "<option value='mod=dungeon&loc=0&sh='>Foret noire</option>";
	liste += "<option value='mod=dungeon&loc=1&sh='>Port des pirates</option>";
	liste += "<option value='mod=dungeon&loc=2&sh='>Monts brumeux</option>";
	liste += "<option value='mod=dungeon&loc=3&sh='>Antre des loups</option>";
	liste += "<option value='mod=dungeon&loc=4&sh='>Ancien temple</option>";
	liste += "<option value='mod=dungeon&loc=5&sh='>Village barbare</option>";
	}

	if(GM_getValue(get_server()+"region")=="Afrique"){
	liste   = "<option value='mod=dungeon&loc=0&sh='>Temple vaudou</option>";
	liste += "<option value='mod=dungeon&loc=1&sh='>Pont</option>";
	liste += "<option value='mod=dungeon&loc=2&sh='>Caverne sanglnte</option>";
	liste += "<option value='mod=dungeon&loc=3&sh='>Port perdu</option>";
	liste += "<option value='mod=dungeon&loc=4&sh='>Tribu Umpokta</option>";
	}

	if(GM_getValue(get_server()+"region")=="Allemagne"){
	liste   = "<option value='mod=dungeon&loc=0&sh='>Temple souterrain</option>";
	liste += "<option value='mod=dungeon&loc=1&sh='>Forêt verte</option>";
	liste += "<option value='mod=dungeon&loc=2&sh='>Village maudit</option>";
	liste += "<option value='mod=dungeon&loc=3&sh='>Colline des morts</option>";
	}
	return liste;

	}

	function get_liste_mob_select(){
	if(GM_getValue(get_server()+"region")=="Italie"){
	liste   = "<option value='attack(0, 1, 0)'>Rat</option>";
	liste += "<option value='attack(0, 2, 0)'>Lynx</option>";
	liste += "<option value='attack(0, 3, 0)'>Loup</option>";
	liste += "<option value='attack(0, 4, 0)'>Ours(boss)</option>";
	liste += "<option value='attack(1, 1, 0)'>Esclave en Fuite</option>";
	liste += "<option value='attack(1, 2, 0)'>Soldat corrompu</option>";
	liste += "<option value='attack(1, 3, 0)'>Assassin</option>";
	liste += "<option value='attack(1, 4, 0)'>Caipitaine(boss)</option>";
	liste += "<option value='attack(2, 1, 0)'>Recrue errante</option>";
	liste += "<option value='attack(2, 2, 0)'>Harpie</option>";
	liste += "<option value='attack(2, 3, 0)'>Cerbere</option>";
	liste += "<option value='attack(2, 4, 0)'>Meduse (boss)</option>";
	liste += "<option value='attack(3, 1, 0)'>Sanglier</option>";
	liste += "<option value='attack(3, 2, 0)'>Meute de loups</option>";
	liste += "<option value='attack(3, 3, 0)'>Loup Alpha</option>";
	liste += "<option value='attack(3, 4, 0)'>Loup-garou(boss)</option>";
	liste += "<option value='attack(4, 1, 0)'>Garde sectaire</option>";
	liste += "<option value='attack(4, 2, 0)'>Rat-Garou</option>";
	liste += "<option value='attack(4, 3, 0)'>Minotaure</option>";
	liste += "<option value='attack(4, 4, 0)'>???(boss)</option>";
	liste += "<option value='attack(5, 1, 0)'>Barbare</option>";
	liste += "<option value='attack(5, 2, 0)'>Guerrier Barbare</option>";
	liste += "<option value='attack(5, 3, 0)'>Bersek</option>";
	liste += "<option value='attack(5, 4, 0)'>???(boss)</option>";
	liste += "<option value='attack(6, 1, 0)'>Soldat Renegat</option>";
	liste += "<option value='attack(6, 2, 0)'>mercenaire Renegat</option>";
	liste += "<option value='attack(6, 3, 0)'>assassin perfide</option>";
	liste += "<option value='attack(6, 4, 0)'>???(boss)</option>";
	return liste;
	}
	if(GM_getValue(get_server()+"region")=="Afrique"){
	liste   = "<option value='attack(0, 1, 0)'>Cobra</option>";
	liste += "<option value='attack(0, 2, 0)'>scorpion géant</option>";
	liste += "<option value='attack(0, 3, 0)'>momie réveillé</option>";
	liste += "<option value='attack(0, 4, 0)'>Pretre seth(boss)</option>";
	liste += "<option value='attack(1, 1, 0)'>Percepteur</option>";
	liste += "<option value='attack(1, 2, 0)'>Anthropophage</option>";
	liste += "<option value='attack(1, 3, 0)'>Guerrier Tribal</option>";
	liste += "<option value='attack(1, 4, 0)'>Chaman osteoman(boss)</option>";
	liste += "<option value='attack(2, 1, 0)'>Loup sanguinaire</option>";
	liste += "<option value='attack(2, 2, 0)'>Scarabé géant</option>";
	liste += "<option value='attack(2, 3, 0)'>Danseur de feu</option>";
	liste += "<option value='attack(2, 4, 0)'>Démon de feu (boss)</option>";
	liste += "<option value='attack(3, 1, 0)'>Crocodile</option>";
	liste += "<option value='attack(3, 2, 0)'>Porteur-mort-vivant</option>";
	liste += "<option value='attack(3, 3, 0)'>Serpent aquatique géant</option>";
	liste += "<option value='attack(3, 4, 0)'>Mokélé-Mbembé (boss)</option>";
	liste += "<option value='attack(4, 1, 0)'>Guerrier tribal</option>";
	liste += "<option value='attack(4, 2, 0)'>Sorcier tribal</option>";
	liste += "<option value='attack(4, 3, 0)'>Guerrier des esprits</option>";
	liste += "<option value='attack(4, 4, 0)'>???(boss)</option>";
	liste += "<option value='attack(5, 1, 0)'>L espion</option>";
	liste += "<option value='attack(5, 2, 0)'>Garde de caravane</option>";
	liste += "<option value='attack(5, 3, 0)'>Garde d elite</option>";
	liste += "<option value='attack(5, 4, 0)'>Marchand d'esclave(boss)</option>";
	liste += "<option value='attack(6, 1, 0)'>Éléphant</option>";
	liste += "<option value='attack(6, 2, 0)'>Guépard</option>";
	liste += "<option value='attack(6, 3, 0)'>Lion Démoniaque</option>";
	liste += "<option value='attack(6, 4, 0)'>2lephant démoniaque(boss)</option>";
	return liste;
	}
	if(GM_getValue(get_server()+"region")=="Allemagne"){
	liste   = "<option value='attack(0, 1, 0)'>Légionaire</option>";
	liste += "<option value='attack(0, 2, 0)'>Myrmidon </option>";
	liste += "<option value='attack(0, 3, 0)'>Centurion </option>";
	liste += "<option value='attack(0, 4, 0)'>Sansâme(boss)</option>";
	liste += "<option value='attack(1, 1, 0)'>Sanglier géant </option>";
	liste += "<option value='attack(1, 2, 0)'>Créature des marais</option>";
	liste += "<option value='attack(1, 3, 0)'>Esprit des marais</option>";
	liste += "<option value='attack(1, 4, 0)'>Ours-garou(boss)</option>";
	liste += "<option value='attack(2, 1, 0)'>Hun </option>";
	liste += "<option value='attack(2, 2, 0)'>Ancien</option>";
	liste += "<option value='attack(2, 3, 0)'>Affamé</option>";
	liste += "<option value='attack(2, 4, 0)'>L'Abomination (boss)</option>";
	liste += "<option value='attack(3, 1, 0)'>Guerrier squelette</option>";
	liste += "<option value='attack(3, 2, 0)'>Berserk squelette</option>";
	liste += "<option value='attack(3, 3, 0)'>Liche</option>";
	liste += "<option value='attack(3, 4, 0)'>Liche(Boss)</option>";
	return liste;
	}
	}

	function get_nom_dun(dun){

	if(GM_getValue(get_server()+"region")=="Italie"){
	if(dun=="mod=dungeon&loc=0&sh="){
		return "Foret noire";
	}
	if(dun=="mod=dungeon&loc=1&sh="){
		return "Port des pirates";
	}
	if(dun=="mod=dungeon&loc=2&sh="){
		return "Monts brumeux";
	}
	if(dun=="mod=dungeon&loc=3&sh="){
		return "L'antre des loups";
	}
	if(dun=="mod=dungeon&loc=4&sh="){
		return "Ancien temple";
	}
	if(dun=="mod=dungeon&loc=5&sh="){
		return "Village barbare";
	}
	if(dun=="no"){
		return "désactivé";
	}

	}
	if(GM_getValue(get_server()+"region")=="Afrique"){
	if(dun=="mod=dungeon&loc=0&sh="){
		return "Temple Vaudou";
	}
	if(dun=="mod=dungeon&loc=1&sh="){
		return "Pont";
	}
	if(dun=="mod=dungeon&loc=2&sh="){
		return "Caverne sanglante";
	}
	if(dun=="mod=dungeon&loc=3&sh="){
		return "Port perdu";
	}
	if(dun=="mod=dungeon&loc=4&sh="){
		return "Tribu umpokta";
	}
	if(dun=="no"){
		return "désactivé";
	}

	}
	if(GM_getValue(get_server()+"region")=="Allemagne"){
	if(dun=="mod=dungeon&loc=0&sh="){
		return "Temple souterrain";
	}
	if(dun=="mod=dungeon&loc=1&sh="){
		return "Forêt verte";
	}
	if(dun=="mod=dungeon&loc=2&sh="){
		return "Village maudit";
	}
	if(dun=="mod=dungeon&loc=3&sh="){
		return "Colline des morts";
	}
	if(dun=="no"){
		return "désactivé";
	}

	}

	}

	//}
	
	//-----------------------------------------------------------------------------------------------
	//global styles + insertion
	//-----------------------------------------------------------------------------------------------
	//{
	
	
	
	
	style_global = "table.tableau_info{";
	style_global += "background-color:rgb(90,30,37);";
	style_global += "border:solid 2px rgb(250,170,80);";
	style_global += "width:230px;";
	style_global += "}";
	style_global += "a.aff_help div{";
	style_global += "display:none;";
	style_global += "}";
	style_global += "a.aff_help:hover div{";
	style_global += "display:block;";
	style_global += "position:absolute;";
	style_global += "font-family:Arial;";
	style_global += "top:5px;";
	style_global += "left:18em;";
	style_global += "width:0px;";
	style_global += "height:0px;";
	style_global += "background-color:rgb(30,30,30);";
	style_global += "z-index:40;";
	style_global += "}";
	style_global += "table.tableau_gestion{";
	style_global += "background-color:rgb(90,30,37);";
	style_global += "border:solid 2px rgb(250,170,80);";
	style_global += "width:216px;";
	style_global += "}";
	style_global += "td.button_title{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/709625degrad60.png') repeat-x top rgb(200,200,200);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Algerian;";
	style_global += "}";
	style_global += "td.button_title_90{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/261669degrad90.png') repeat-x top rgb(200,200,200);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Algerian;";
	style_global += "}";
	style_global += "td.button_title_120{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/374233degrad120.png') repeat-x top rgb(200,200,200);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Algerian;";
	style_global += "}";
	style_global += "td.button_title_200{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/565029degrad200.gif') repeat-x top rgb(200,200,200);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Algerian;";
	style_global += "}";
	style_global += "td.button{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/854552degrad60.png') repeat-x top rgb(140,35,50);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Arial;";
	style_global += "}";
	style_global += "td.button:hover{";
	style_global += "background:url('http://img15.hostingpics.net/pics/709625degrad60.png') repeat-x top rgb(100,35,50);";
	style_global += "cursor:pointer;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_global += "span.button_reset:hover{";
	style_global += "cursor:pointer;";
	style_global += "border:solid 1px black;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_global += "span.button_reset:hover{";
	style_global += "cursor:pointer;";
	style_global += "background-color:red;";
	style_global += "border:solid 1px black;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_global += "span.button{";
	style_global += "cursor:pointer;";
	style_global += "background-color:rgb(168,200,210);";
	style_global += "border:solid 1px black;";
	style_global += "width:20px;";
	style_global += "text-align:center;";
	style_global += "display:block;";
	style_global += "font-family:Arial;";
	style_global += "color:black;";
	style_global += "}";
	style_global += "span.button:hover{";
	style_global += "cursor:pointer;";
	style_global += "background-color:rgb(130,170,180);";
	style_global += "border:solid 1px black;";
	style_global += "width:20px;";
	style_global += "text-align:center;";
	style_global += "display:block;";
	style_global += "font-family:Arial;";
	style_global += "color:black;";
	style_global += "}";
	style_global += "span.button_off{";
	style_global += "cursor:pointer;";
	style_global += "background-color:rgb(240,140,170);";
	style_global += "border:solid 1px black;";
	style_global += "width:20px;";
	style_global += "text-align:center;";
	style_global += "display:block;";
	style_global += "font-family:Arial;";
	style_global += "color:black;";
	style_global += "}";
	style_global += "span.button_off:hover{";
	style_global += "cursor:pointer;";
	style_global += "background-color:rgb(210,110,140);";
	style_global += "border:solid 1px black;";
	style_global += "width:20px;";
	style_global += "text-align:center;";
	style_global += "display:block;";
	style_global += "font-family:Arial;";
	style_global += "color:black;";
	style_global += "}";
	style_global += "td.button_off{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background-color:rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "height:10px;";
	style_global += "font-family:Arial;";
	style_global += "}";
	style_global += "td.button_off_60{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/709625degrad60.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Arial;";
	style_global += "}";
	style_global += "td.button_off_90{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/261669degrad90.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Arial;";
	style_global += "}";
	style_global += "td.button_off_120{";
	style_global += "border:solid 3px rgb(250,170,80);";
	style_global += "background:url('http://img15.hostingpics.net/pics/374233degrad120.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "color:black;";
	style_global += "font-family:Arial;";
	style_global += "}";
	style_global += "td.button_off:hover{";
	style_global += "border:solid 4px rgb(220,220,0);";
	style_global += "background:url('http://img15.hostingpics.net/pics/709625degrad60.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_global += "td.button_off_60:hover{";
	style_global += "border:solid 4px rgb(220,220,0);";
	style_global += "background:url('http://img15.hostingpics.net/pics/709625degrad60.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_global += "td.button_off_90:hover{";
	style_global += "border:solid 4px rgb(220,220,0);";
	style_global += "background:url('http://img15.hostingpics.net/pics/261669degrad90.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_global += "td.button_off_120:hover{";
	style_global += "border:solid 4px rgb(220,220,0);";
	style_global += "background:url('http://img15.hostingpics.net/pics/374233degrad120.png') repeat-x top rgb(80,20,27);";
	style_global += "cursor:pointer;";
	style_global += "font-family:Arial;";
	style_global += "color:rgb(226,192,122);";
	style_global += "}";
	style_fond = document.createElement("style");
	style_fond.setAttribute("type","text/css");
	style_fond.innerHTML=style_global;
	document.getElementsByTagName("head")[0].insertBefore(style_fond,document.getElementsByTagName("head")[0].firstChild);
//}

	//-----------------------------------------------------------------------------------------------
	//div style
	//-----------------------------------------------------------------------------------------------
	//{
	style = "position:absolute;";
	style += "top:50px;left:05px;";
	style += "background-color:rgb(140,48,10);"
	style += "width:0px;height:0px;"
	style += "z-index:20;"
	
	style2 = "position:absolute;";
	style2 += "top:50px;right:320px;";
	style2 += "background-color:rgb(140,48,10);"
	style2 += "width:0px;height:0px;"
	style2 += "z-index:20;"
	
	style3 = "position:absolute;";
	style3 += "top:50px;left:230px;";
	style3 += "background-color:rgb(140,48,10);"
	style3 += "width:0px;height:0px;"
	style3 += "z-index:10;"

	//}

	//vie + xp
	//{
	function get_vie(){
	tab = document.getElementById("header_values_hp_bar").getAttribute("onmouseover").split("<td ");
	// alert(tab[2]);
	vie_temp = tab[2].split("nowrap\\'>");
	vie = vie_temp[1].split("</td>")[0];
	return vie;
	}
	
	function get_xp(){
		tab = document.getElementById("header_values_xp_bar").getAttribute("onmouseover").split("<td ");
// alert(tab[2]);
	xp_temp = tab[2].split("nowrap\\'>");
	xp = xp_temp[1].split("</td>")[0];
	
	return xp;
	}
	
	//}
	
	
	//horloges
	//{
	function update_horloge(){
	$(document).ready(function(){
	
	min = parseInt(document.getElementById("min").innerHTML,10);
	sec = parseInt(document.getElementById("sec").innerHTML,10);
	min_attaque = parseInt(document.getElementById("min_attaque").innerHTML,10);
	sec_attaque = parseInt(document.getElementById("sec_attaque").innerHTML,10);
	hrs_stat = parseInt(document.getElementById("hrs_stat").innerHTML,10);
	min_stat = parseInt(document.getElementById("min_stat").innerHTML,10);
	sec_stat = parseInt(document.getElementById("sec_stat").innerHTML,10);
	hrs_stock = parseInt(document.getElementById("hrs_stock").innerHTML,10);
	min_stock = parseInt(document.getElementById("min_stock").innerHTML,10);
	sec_stock = parseInt(document.getElementById("sec_stock").innerHTML,10);
	
	
	new_sec_stock = parseInt(sec_stock-1,10);
	new_min_stock= min_stock;
	new_hrs_stock = hrs_stock;
	
	
	
	
	new_sec_stat = sec_stat;
	new_min_stat=min_stat;
	new_hrs_stat=hrs_stat;
	new_sec_stat = new_sec_stat+1;
	new_sec=parseInt(sec-1);
	new_sec_attaque=parseInt(sec_attaque-1);
	
	
	
	if(new_sec_stock<0 && (new_min_stock>0 | new_hrs_stock>0)){
		new_sec_stock = 59;
		new_min_stock=parseInt(new_min_stock-1,10);
		if(new_min_stock<0 && new_hrs_stock>0){
		
			new_min_stock=59;
			new_hrs_stock = parseInt(new_hrs_stock-1,10);
		}
	}
	
	if(new_sec_stock<10){
		new_sec_stock="0"+new_sec_stock;
	}
	if(new_min_stock<10){
		new_min_stock="0"+new_min_stock;
	}
	if(new_hrs_stock<10){
		new_hrs_stock="0"+new_hrs_stock;
	}
	
	if(new_sec_stat==60){
		new_sec_stat=0;
		new_min_stat=min_stat+1;
	}
	if(new_min_stat==60){
		new_min_stat=0;
		new_hrs_stat=hrs_stat+1;
	}
	
	if(new_sec_stat<10){
		new_sec_stat="0"+new_sec_stat;
	}
	if(new_min_stat<10){
		new_min_stat="0"+new_min_stat;
	}
	if(new_hrs_stat<10){
		new_hrs_stat="0"+new_hrs_stat;
	}
	
	
	document.getElementById("sec_stock").innerHTML=new_sec_stock;
	document.getElementById("min_stock").innerHTML=new_min_stock;
	document.getElementById("hrs_stock").innerHTML=new_hrs_stock;
	
	document.getElementById("sec_stat").innerHTML=new_sec_stat;
	document.getElementById("min_stat").innerHTML=new_min_stat;
	document.getElementById("hrs_stat").innerHTML=new_hrs_stat;
	
	if(new_sec<0 && min>0){
		new_sec=59;
		new_min = min-1;
	}else{
		new_min=min;
	}
	
	if(new_sec_attaque<0 && min_attaque>0){
		new_sec_attaque=59;
		new_min_attaque = min_attaque-1;
	}else{
		new_min_attaque = min_attaque;
	}
	
		
	if(new_min<0){
		new_min=0;
	}
	if(new_min<10){
		new_min="0"+new_min;
	}
	if(new_min_attaque<0){
		new_min_attaque=0;
	}
	if(new_min_attaque<10){
		new_min_attaque="0"+new_min_attaque;
	}
	
	
	
	if(new_sec>=0 | new_min>0){
	
	if(new_sec<10){
	new_sec = "0"+new_sec;
	}
	document.getElementById("sec").innerHTML=new_sec;
	document.getElementById("min").innerHTML=new_min;
	}
	
	if(new_sec_attaque>=0 | new_min_attaque>0){
	if(new_sec_attaque<10){
	new_sec_attaque ="0"+new_sec_attaque+"";
	}
	document.getElementById("sec_attaque").innerHTML=new_sec_attaque;
	document.getElementById("min_attaque").innerHTML=new_min_attaque;
	}
	
	
	
	clearInterval(timer);
	timer = setInterval(function(){update_horloge()},1000);
	},true);
}

	function get_time_before_stock(tmsp){
	
	dif = (tmsp-Date.parse(this_date))/1000;
	return dif;
	}

	function get_horloge_restockage(tmsp){
	
		dif = (tmsp-Date.parse(this_date))/1000;
		hrs = parseInt(dif/3600);
		min = parseInt((dif-(hrs*3600))/60);
		sec = parseInt(dif-(min*60+hrs*3600));
		
		
		
		if(hrs<=0 && min<=0 && sec <=0){
		res = "<span id=hrs_stock>00</span>:<span id=min_stock>00</span>:<span id=sec_stock>00</span>";
		}
		else{
		if(hrs<10){
		hrs = "0"+hrs;
		}
		if(min<10){
		min = "0"+min;
		}
		if(sec<10){
		sec = "0"+sec;
		}
		res = "<span id=hrs_stock>"+hrs+"</span>:<span id=min_stock>"+min+"</span>:<span id=sec_stock>"+sec+"</span>";
		}
		return res;
	}
	
	function get_horloge_attaque(time){
		time = time/1000;
		min = parseInt(time/60);
		sec = parseInt(time-(min*60));
		if(min<10){
		min = "0"+min;
		}
		if(sec<10){
		sec="0"+sec
		}
		res = "<span id=hrs_attaque>0</span>:<span id='min_attaque'>"+min+"</span>:<span id=sec_attaque>"+sec+"</span>";
		return res;
	}
	
	function get_horloge(tmsp){
		
		dif = (tmsp-Date.parse(this_date))/1000;
		min = parseInt(dif/60);
		sec = parseInt(dif-(min*60));
		
		if(min<=0 && sec <=0){
		res = "<span id=hrs>00</span>:<span id=min>00</span>:<span id=sec>00</span>";
		}
		else{
		if(min<10){
		min = "0"+min;
		}
		if(sec<10){
		sec = "0"+sec;
		}
		res = "<span id=hrs>0</span>:<span id=min>"+min+"</span>:<span id=sec>"+sec+"</span>";
		}
		return res;
	}
	
	function get_horloge_date_stat(){
		this_date = new Date();
		
		time = (parseInt(Date.parse(this_date),10)-parseInt(GM_getValue(get_server()+"date_stat"),10))/1000;
		hrs_stat = parseInt(time/3600);
		min_stat = parseInt((time-(hrs_stat*3600))/60);
		sec_stat = parseInt(time-((hrs_stat*3600)+(min_stat*60)));
		
		if(hrs_stat<10){
		hrs_stat="0"+hrs_stat;
		}
		if(min_stat<10){
		min_stat="0"+min_stat;
		}
		if(sec_stat<10){
		sec_stat="0"+sec_stat;
		}
		
		res = "<span id=hrs_stat>"+hrs_stat+"</span>:<span id=min_stat>"+min_stat+"</span>:<span id=sec_stat>"+sec_stat+"</span>";
		return res;
	}

	var timer = setInterval(function(){update_horloge()},1000);
	//}
	
	
	
	//auto :
	//##################################
	//quest
	//arena
	//provinciarum
	//dungeon
	//heal
	//hide
	//##################################
	//{
	
	
	function auto_train(){
	// alert('nous devons recuperer :'+GM_getValue(get_server()+"price_stat_to_train")+' piece d\'or pour entrainer la stat : '+GM_getValue(get_server()+'stat_to_train')+'\n toute autre action est bloquée');
	or_dispo = (parseInt(document.getElementById("sstat_gold_val").innerHTML.replace(".",""),10));
	or_cachette = GM_getValue(get_server()+"total_inv");
	or_needed = GM_getValue(get_server()+'price_stat_to_train');
	if(or_dispo<or_needed){
		go_to("hide");
		if(window.location.href.indexOf("mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh=")!=-1){
		id_new = get_first_place_shop();
		check_inv();
		// alert(GM_getValue(get_server()+'big_item_inv'));
		if(document.getElementById("action_cachette")){
		document.getElementById("action_cachette").innerHTML="vente jusqu'à : "+or_needed+" pour s'entrainer";
		}else{
		show_cachette_mess();
		document.getElementById("action_cachette").innerHTML="vente jusqu'à : "+or_needed+" pour s'entrainer";
		}
		sell(GM_getValue(get_server()+'big_item_inv'),id_new);
		// alert('id_new = '+id_new);
		}
	}
	else{
		// alert('entrainement possible');
		go_to('train');
		
		if(window.location.href.indexOf("mod=training&sh=")!=-1 && or_dispo>=or_needed){
			setTimeout(function(){train_stat();}, 3000 );
			GM_setValue(get_server()+"stat_a_jour",'0');
			get_stat_value();
			update_stat_value();
			
			
		}
	
	}
	
	// alert(or_needed);
	
	}
	
	
	function train_possible(){
	if((parseInt(document.getElementById("sstat_gold_val").innerHTML.replace(".",""),10)+GM_getValue(get_server()+"total_inv")> GM_getValue(get_server()+"price_stat_to_train"))){
	res = 1;
	}
	else{
	res=0;
	}
	return res;
	}
	
	function auto_quest(){
	if(window.location.href.indexOf("mod=quests&sh=")!=-1){
		quete_a_valider=0;
		// alert("auto_quest");
		//valider les quetes terminées ou relancer les quetes ratées
		
		
		
		
		
		for(i=0;i<document.getElementsByTagName("div").length;i++){
			if(document.getElementsByTagName("div")[i].getAttribute("class")=="contentboard_slot contentboard_slot_active"){
			
			// alert("test");   
			//quest_slot_button quest_slot_button_finish
			if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].getAttribute("class")=="quest_slot_button quest_slot_button_finish"){
					
					quete_a_valider=1;
					for(j=0;j<document.getElementsByTagName("div")[i].getElementsByTagName("div").length;j++){
						//recup or pour stat
						if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getAttribute("class")=="quest_slot_reward quest_slot_reward_gold"){
							or_quest = document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0].innerHTML.split("<img")[0]
							// alert(or_quest);
						}
						//recup honneur stat
						if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getAttribute("class")=="quest_slot_reward quest_slot_reward_honor"){
							honneur_quest = document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0].getAttribute("onmouseover").split("Honneur")[0].split("nowrap\\")[1].split(">")[1];
							// alert(honneur_quest);
						}
						if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getAttribute("class")=="quest_slot_reward quest_slot_reward_xp"){
							//si il y a un gain d xp
							if(document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0]){
							xp_quest = document.getElementsByTagName("div")[i].getElementsByTagName("div")[j].getElementsByTagName("span")[0].getAttribute("onmouseover").split("Expérience")[0].split("nowrap\\")[1].split(">")[1];
							}
							else{
							xp_quest=0;
							}
							// alert(xp_quest)
						}
						
					}
					GM_setValue(get_server()+"stat_honneur",GM_getValue(get_server()+"stat_honneur")+parseInt(honneur_quest.replace(".",""),10));
					GM_setValue(get_server()+"stat_xp",GM_getValue(get_server()+"stat_xp")+parseInt(xp_quest,10));
					GM_setValue(get_server()+"stat_or",GM_getValue(get_server()+"stat_or")+parseInt(or_quest.replace(".",""),10));
					GM_setValue(get_server()+"nb_quest",GM_getValue(get_server()+"nb_quest")+1);
					
					document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					setTimeout(function(){window.location.reload();	}, 5000 );
					break;
					
					
					
				}
				
			}
			else{
			GM_setValue(get_server()+"auto_quest_to_do",0);
			}
		}
		
		if(quete_a_valider==0){
		for(i=0;i<document.getElementsByTagName("div").length;i++){
			if(document.getElementsByTagName("div")[i].getAttribute("class")=="contentboard_slot contentboard_slot_active"){
				if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].getAttribute("class")!="quest_slot_button quest_slot_button_cancel"){
					GM_setValue(get_server()+"auto_quest_to_do",1);
					document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					setTimeout(function(){window.location.reload();	}, 5000 );
					// alert(GM_getValue(get_server()+"auto_quest_to_do"));
					break;
					// }
				}else{
				GM_setValue(get_server()+"auto_quest_to_do",0);
				// alert(GM_getValue(get_server()+"auto_quest_to_do"));
				}
			}
			else{
			GM_setValue(get_server()+"auto_quest_to_do",0);
			}
			
			
		}
		
			
		no_quest=1;
		if(parseInt(document.getElementById("quest_header_accepted").innerHTML.split(":")[1].split("/")[0],10)<5){
		for(i=0;i<document.getElementsByTagName("div").length;i++){
		
			if(document.getElementsByTagName("div")[i].getAttribute("class")=="contentboard_slot contentboard_slot_inactive"){

				if(document.getElementsByTagName("div")[i].innerHTML.indexOf("icon_grouparena_inactive.jpg")!=-1 && GM_getValue(get_server()+"turma_quest")==1){
				no_quest=0;
					if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0]){
					 document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					 window.location.reload();
					 }
					 
				}else if(document.getElementsByTagName("div")[i].innerHTML.indexOf("icon_arena_inactive.jpg")!=-1 && GM_getValue(get_server()+"arena_quest")==1){
				no_quest=0;
					if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0]){
					document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					window.location.reload();
					}
				}
				else if(document.getElementsByTagName("div")[i].innerHTML.indexOf("icon_combat_inactive.jpg")!=-1 && GM_getValue(get_server()+"enemy_quest")==1){
				no_quest=0;
					if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0]){
					document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					window.location.reload();
					}
					}
					//icon_items_inactive.jpg
				else if(document.getElementsByTagName("div")[i].innerHTML.indexOf("icon_items_inactive.jpg")!=-1 && GM_getValue(get_server()+"object_quest")==1){
				no_quest=0;
					if(document.getElementsByTagName("div")[i].getElementsByTagName("a")[0]){
					document.getElementsByTagName("div")[i].getElementsByTagName("a")[0].click();
					window.location.reload();
					}
					
				}
				
				
			}
		}
		if(no_quest==1 && (GM_getValue(get_server()+"turma_quest")==1 | GM_getValue(get_server()+"arena_quest")==1 | GM_getValue(get_server()+"enemy_quest")==1)){
			document.getElementById("quest_footer_reroll").getElementsByTagName("input")[0].click();
		}
		}
		
		
		
		quest_accepted = parseInt(document.getElementById("quest_header_accepted").innerHTML.split(":")[1].split("/")[0],10);
		if((parseInt(GM_getValue(get_server()+"next_quest"),10)<parseInt(Date.parse(this_date),10)) && quest_accepted==5){
				
				next_date = new Date();
				
				next_date.setHours(parseInt(this_date.getHours(),10));
				next_date.setMinutes(parseInt(this_date.getMinutes(),10)+2);
				next_date.setSeconds(parseInt(this_date.getSeconds(),10));
				test = Date.parse(next_date).toString();
				GM_setValue(get_server()+"next_quest",test);
					
				go_to("overview");
				}
		
		
		// get_next_quest();
	}
	setTimeout(function(){go_to("overview");	}, 15000 );
	
	}
	}
	
	function auto_arena(){
		$(document).ready(function(){
			if(GM_getValue(get_server()+"auto_arene")==1){
				if(document.getElementById("errorText").innerHTML.indexOf("Vous ne pouvez provoquer un adversaire")!=-1){
					// alert(document.getElementById("errorText").innerHTML);
				}else{
				low_lvl =200;
				div_ok=0;
					for(i=0;i<document.getElementsByTagName("div").length;i++){
						if(document.getElementsByTagName("div")[i].getAttribute("class")){
							if(document.getElementsByTagName("div")[i].getAttribute("class")=="title2_box" && div_ok==0){
                                if(document.getElementsByTagName("div")[i].parentNode.parentNode.parentNode.getAttribute("id")!="gca_button_bar"){
								div_ok=1;
								div_players = document.getElementsByTagName("div")[i];
								div_index=i;
                               
								for(j=1;j<div_players.getElementsByTagName("tr").length;j++){
                                    
									tr_player = div_players.getElementsByTagName("tr")[j];
									lvl = parseInt(tr_player.getElementsByTagName("td")[1].innerHTML);
									if(lvl < low_lvl){
										low_lvl = lvl;
										low_lvl_index = j;
									}
									
								}
                                }
							}
						}
					}
					
					
					document.getElementsByTagName("div")[div_index].getElementsByTagName("tr")[low_lvl_index].getElementsByTagName("span")[0].click();
					setTimeout(function(){document.getElementsByTagName("form")[0].getElementsByTagName("input")[0].click();}, 20000);
					
				}
			
			}
			
			
		},true);
	
	}
		
	function auto_pro(){
		$(document).ready(function(){
			if(GM_getValue(get_server()+"auto_pro")==1){
				if(document.getElementById("errorText").innerHTML.indexOf("Vous ne pouvez provoquer un adversaire")!=-1){
					// alert(document.getElementById("errorText").innerHTML);
				}else{
				low_lvl =200;
				div_ok=0;
					for(i=0;i<document.getElementsByTagName("div").length;i++){
						if(document.getElementsByTagName("div")[i].getAttribute("class")){
							if(document.getElementsByTagName("div")[i].getAttribute("class")=="title2_box" && div_ok==0){
                                if(document.getElementsByTagName("div")[i].parentNode.parentNode.parentNode.getAttribute("id")!="gca_button_bar"){ //pour la compatibilité crazy addon
								div_ok=1;
								div_players = document.getElementsByTagName("div")[i];
								div_index=i;
                                 
								for(j=1;j<div_players.getElementsByTagName("tr").length;j++){
                                   
									tr_player = div_players.getElementsByTagName("tr")[j];
									lvl = parseInt(tr_player.getElementsByTagName("td")[1].innerHTML);
									if(lvl < low_lvl){
										low_lvl = lvl;
										low_lvl_index = j;
									}
									
								}
								}
							}
						}
					}
					
					
					document.getElementsByTagName("div")[div_index].getElementsByTagName("tr")[low_lvl_index].getElementsByTagName("span")[0].click();
					setTimeout(function(){document.getElementsByTagName("form")[0].getElementsByTagName("input")[0].click();}, 20000);
					
				}
			
			}
			
			
		},true);
	
	}
	
	function auto_dungeon(){


	$(document).ready(function(){

		var target = $('#content>div>div>img[onclick]:eq(0)');
		var target2 = $('#content>div>div>div[onclick]:eq(0)');
		var dngbutton = $('li.pngfix:eq(2)>a');
		if (GM_getValue(get_server()+"auto_dongeon") ==1){
	
			if ($('form>table>tbody>tr>td:eq(1)>input.button1:disabled').length){
			
			
				$('form>table>tbody>tr>td:eq(0)>input.button1').click();
				
				
			}else {
			// alert($('form>table>tbody>tr>td:eq(1)>input.button1').attr("value"));
				$('form>table>tbody>tr>td:eq(1)>input.button1').trigger('click');
				
			}

			if(target.length){
				// alert(target2.text());
				if(target2.text().indexOf("Boss")!=-1){
					if(GM_getValue(get_server()+"boss_dungeon")=='1'){
					setTimeout(function(){target.trigger('click');}, 4000);
					}
					else{
						for(i=0;i<document.getElementsByTagName("input").length;i++){
							if(document.getElementsByTagName("input")[i].getAttribute("value")=="Abandonner le donjon"){
							document.getElementsByTagName("input")[i].click();
							}
						}
					}
					}else{
					setTimeout(function(){target.trigger('click');}, 4000);
					}
			}else if (dngbutton.length){
				setTimeout(function(){window.location.href=dngbutton.attr("href")}, 4000);
			}
			else{
				setTimeout(function(){window.location.reload();}, 4000 );
			}
			// else{window.location.href=get_base()+GM_getValue(get_server()+"dun")+get_sh();}
		}
	});
	setTimeout(function(){auto_click();},5000);
	}

	//auto_heal
	function auto_heal(){

		this.$ = this.jQuery = jQuery.noConflict(true);


		// change line below if you like it to heal at another hp %
		var healBelow = GM_getValue(get_server()+"hp_lvl");

		// alert(GM_getValue(get_server()+"gladiatus_healer_onoff"));
		var getonoff = GM_getValue(get_server()+"gladiatus_healer_onoff");
		

		var hash= window.location.href.replace(/.+sh=/,"");
		var db = [];

		$(document).ready(function(){
		// alert("test");
			if(getonoff == "on"){
				var check = $("#char_leben");
				var hp = parseInt(check.text());
				if (check.length){
					getGealingItems();
					if (hp < healBelow){
						if (db.length){
							eat(db[0],hash);
							// setTimeout(function(){window.location.reload()},1000*3);
						}
					}
					// setTimeout(function(){window.location.reload()},1000*60);
				}
			}
			window.location.href=get_base()+'mod=overview&inv=1&doll=1&sh='+get_sh();
		});

		function getGealingItems(){
			var items = $("#inv").find("div");
			items.each(function(){
				var id = $(this).attr("id");
				var tooltip = $("#tOoLtIp_"+id).text().match(/:.*\s\d+\s.*:\s\+\d+\s./);
				if (tooltip){
					// alert(tooltip.text());
				db.push(id)}
			});
		}

		function eat(ID,HASH){
			var t = new Date(), a = t.getTime();
			$.ajax({
				url: "/game/ajax.php?mod=overview&submod=useItem&item="+ID+"&doll=1&a="+a+"&sh="+HASH,
				type: 'get',
				dataType: 'html',
				async: false,
				success: function(data) {}
			});
			db.shift();
		}


	}
	
	
	function get_valeur(id){
	
		texte = $("#tOoLtIp_"+id).text();
		
		// alert(id);
		if(texte){
		val = texte.split("N.B")[0].split("Prix ")[1].replace(".","");
		}
		if(val){
		return val;
		}
		else{
		return 0;
		}
		
	}
	
	function get_valeur_inv(id){
	
		texte = $("#tOoLtIp_"+id).text();
		
		// alert(id);
		if(texte){
		val = texte.split("N.B")[0].split("Valeur")[texte.split("N.B")[0].split("Valeur").length-1].replace(".","");
		}
		if(val){
		return val;
		}
		else{
		return 0;
		}
		
	}
	
	
	function get_first_place_shop(){
		var items = $("#shop").find("div");
		first_item="";
		items.each(function(){
		// alert("test");
			
			if(!$(this).find("img").length){
				var id = $(this).attr("id");
				var tooltip = $("#tOoLtIp_"+id).text();
				if (tooltip){
					if(first_item==""){first_item=id;}
				}
			}
		});
		return first_item;
	}
	
	
	function get_places_shop(){
		var items = $("#shop").find("div");	
		first_item=[];
		i=0;
		items.each(function(){
		// alert("test");
			
			if(!$(this).find("img").length){
				var id = $(this).attr("id");
				var tooltip = $("#tOoLtIp_"+id).text();
				if (tooltip){
				
					first_item[i]=id;
					i++;
				}
			}
		});
		return first_item;
	
	}
	
	function get_first_place(){
		var items = $("#inv").find("div");
		first_item="";
		items.each(function(){
		// alert("test");
			
			if(!$(this).find("img").length){
				var id = $(this).attr("id");
				var tooltip = $("#tOoLtIp_"+id).text();
				if (tooltip){
					if(first_item==""){first_item=id;}
				}
			}
		});
		return first_item;
	}
	
	function get_first_item(my_gold){
		
		var items = $("#shop").find("div");
		first_item="";
		
		dif=10000000;
		items.each(function(){
		
			
			if($(this).find("img").length){
				
				var id = $(this).attr("id");
				valeur_item = get_valeur(id);
				this_dif = my_gold-valeur_item;
				var tooltip = $("#tOoLtIp_"+id).text();
				if (tooltip){
					if(this_dif< dif && this_dif>=0){
						dif=this_dif;
						first_item=id;
					}
				}
				// var tooltip = $("#tOoLtIp_"+id).text();
				
					// if(first_item==""){first_item=id;}
				// }
			}
		});
		// alert(first_item);
		return first_item;
		
		
	}
	
	function check_shop(){
		GM_setValue(get_server()+"big_item",'');
		GM_setValue(get_server()+"low_item",'');
		GM_setValue(get_server()+"low_item_big",'');
		GM_setValue(get_server()+"low_item_medium",'');
		total_shop=0;
		var items = $("#shop").find("div");
		big_item ="";
		low_item="";
		low_item_big="";
		low_item_medium="";
		valeur_item_medium=GM_getValue(get_server()+"gold_limit_medium");
		valeur_item_big=10000000;
		low_prix=4000000;
		big_prix=0;
		items.each(function(){
		if($(this).find("img").length){
			var id = $(this).attr("id");
			valeur_item = parseInt(get_valeur(id),10);
			total_shop = parseInt(total_shop,10)+parseInt(valeur_item,10);
			if(valeur_item<low_prix){
				low_item=id;
				low_prix=valeur_item;
			}
			if(valeur_item>GM_getValue(get_server()+"gold_limit_medium") && valeur_item<valeur_item_big){
				
				low_item_big=id;
				valeur_item_big=valeur_item;
				
			}
			if(valeur_item<GM_getValue(get_server()+"gold_limit_medium") && valeur_item>GM_getValue(get_server()+"gold_limit_low") & valeur_item_medium>valeur_item){
				
				low_item_medium=id;
				valeur_item_medium=valeur_item;
				
			}
			if(valeur_item>big_prix){
				big_item=id;
				big_prix=valeur_item;
			}
			
		}
		
		});
		
		GM_setValue(get_server()+"total_shop",total_shop);
		GM_setValue(get_server()+"big_item",big_item);
		GM_setValue(get_server()+"low_item",low_item);
		GM_setValue(get_server()+"low_item_big",low_item_big);
		GM_setValue(get_server()+"low_item_medium",low_item_medium);
	}
	
	function check_inv(){
		GM_setValue(get_server()+"big_item_inv",'');
		GM_setValue(get_server()+"low_item_inv",'');
		total_shop=0;
		var items = $("#inv").find("div");
		tab_item=[];
		tab_item["low"]=new Array();
		tab_item["medium"]=new Array();
		inc_tab_low=0;
		inc_tab_medium=0;
		big_item ="";
		low_item="";
		low_prix=4000000;
		big_prix=0;
		low_low_item="";
		valeur_medium_item=GM_getValue(get_server()+"gold_limit_medium");
		valeur_low_item=GM_getValue(get_server()+"gold_limit_low");
		medium_item="";
		total_low=0;
		total_medium=0;
		
		items.each(function(){
		//pour chaque objet de l'inventaire
		if($(this).find("img").length){
			//recup de l'id de l'item
			var id = $(this).attr("id");
			//recup de la valeur de l'item
			valeur_item = parseInt(get_valeur_inv(id),10);
			// incrementation du total de l'inventaire avec la valeur de l'item
			total_shop = parseInt(total_shop,10)+parseInt(valeur_item,10);
			
			//si c'est un low
			if(valeur_item<GM_getValue(get_server()+"gold_limit_low")){
				//increment du total des low
				total_low = parseInt(total_low,10)+parseInt(valeur_item,10);
				//ajout de l'id dans le tableau de low
				tab_item["low"][inc_tab_low]=id;
				//incrementation du tableau de low
				inc_tab_low++;
			}
			//si c'est un medium
			if(valeur_item>GM_getValue(get_server()+"gold_limit_low") && valeur_item<GM_getValue(get_server()+"gold_limit_medium")){
				//incrementation du total des medium
				total_medium = parseInt(total_medium,10)+parseInt(valeur_item,10);
				//ajout de l'id dans le tableau de medium
				tab_item["medium"][inc_tab_medium]=id;
				//incrementation du tableau de medium
				inc_tab_medium++;
			}
			//si l'item est un medium et qu'il est plus petit que le plus petit medium deja rencontré
			if(valeur_item>GM_getValue(get_server()+"gold_limit_low") && valeur_item<GM_getValue(get_server()+"gold_limit_medium") && valeur_item<valeur_medium_item){
				medium_item=id;
				//remplacement du + petit medium par l'actuel
				valeur_medium_item=valeur_item;
			}
			//si l'item est un low et qu'il est plus petit que le plus petit low deja rencontré
			if(valeur_item<GM_getValue(get_server()+"gold_limit_low") && valeur_item<valeur_low_item){
				low_low_item=id;
				//remplacement du + petit low par l'actuel
				valeur_low_item=valeur_item;
			}
			//si l'item est le plus petit rencontré
			if(valeur_item<low_prix){
				//remplacement du plus petit item par l'actuel
				low_item=id;
				low_prix=valeur_item;
			}
			//si l'item est le plus gros rencontré
			if(valeur_item>big_prix){
				//remplacement du plus gros item par l'actuel
				big_item=id;
				big_prix=valeur_item;
			}
			
		}
		
		});
		
		GM_setValue(get_server()+"total_medium",total_medium);
		GM_setValue(get_server()+"total_low",total_low);
		GM_setValue(get_server()+"total_inv",total_shop);
		GM_setValue(get_server()+"big_item_inv",big_item);
		GM_setValue(get_server()+"low_item_inv",low_item);
		
		if(medium_item!=""){
		GM_setValue(get_server()+"medium_item_inv",medium_item);
		}
		else{
		GM_setValue(get_server()+"medium_item_inv","");
		}
		if(low_low_item!=""){
		GM_setValue(get_server()+"low_low_item_inv",low_low_item);
		// alert(low_item);
		}
		else{
		GM_setValue(get_server()+"low_low_item_inv","");
		}
		return tab_item;
	}
	
	
	
	
	
	function sell(ID_old,ID_new){
			var t = new Date(), a = t.getTime();
			// alert("/game/ajax/inventoryswap.php?old="+ID_old+"&new="+ID_new+"&doll=1&shopPage=322&a="+a+"&sh="+get_sh());
			$.ajax({
				url: "/game/ajax/inventoryswap.php?old="+ID_old+"&new="+ID_new+"&doll=1&shopPage=322&a="+a+"&sh="+get_sh(),
				type: 'get',
				dataType: 'html',
				async: false,
				success: function(data) {}
			});
			
			setTimeout(function(){window.location.reload();}, 5000 );
	}
	
	function auto_hide(reload){
		tab_places = get_places_shop();
		
		tab_item = check_inv();
		
		check_shop();
		
		var my_gold = parseInt(document.getElementById("sstat_gold_val").innerHTML.replace(".",""),10);

		

		$(document).ready(function(){
		
			
			//vente en cours = 0  -> pas de vente en cours : processus d achat
			//vente en cours = 1 -> vente des medium pour acheter un gros donc test si il reste des medium sinon remise a 0 de vente en cours pour passer en processus d'achat
			//vente en cours = 2 -> vente des medium + petit pour acheter un gros donc test si il reste des mediums ou des petits sinon remise a 0 de vente en cours pour passer en processus d'achat
			//vente en cours = 3 -> vente des petit pour acheter un medium donc test si il reste des petit sinon remise a 0 de vente en cours pour passer en processus d'achat
			//                      Le but etant de garder les petits et les medium en shop pour pouvoir les acheter en dernier
			
			
			if(GM_getValue(get_server()+"vente_en_cours")==0){
				id_old=0;
				id_new=0;
				id_old = get_first_item(my_gold);
				
				value = get_valeur(id_old);
				id_new = get_first_place();
				// alert(id_new);
				if(my_gold>parseInt(value,10) && id_old!=0 && id_new!=0){
				// alert("test");
				document.getElementById("action_cachette").innerHTML="achat objet";
				buy(id_old,id_new);
				}else{
				if(!GM_getValue(get_server()+"total_shop")==0 && id_new!=""){
				//ajustements
				//si le total des medium de l'inventaire est superieur au prix du plus petit gros du shop, passage en vente des medium. vente =1
					if(((parseInt(GM_getValue(get_server()+"total_medium"),10)+parseInt(my_gold,10))>parseInt(get_valeur(GM_getValue(get_server()+"low_item_big"),10)))&&(GM_getValue(get_server()+"low_item_big")!='')){
						GM_setValue(get_server()+"vente_en_cours",1);
						setTimeout(function(){auto_click();}, 3000 );
					}
					//si le total des medium+ petits de l'inventaire est superieur au prix du plus petit gros du shop, passage en vente des medium+petits. vente =2
					else if(((parseInt(GM_getValue(get_server()+"total_medium"),10)+parseInt(GM_getValue(get_server()+"total_low"),10))+parseInt(my_gold,10))>parseInt(get_valeur(GM_getValue(get_server()+"low_item_big"),10))&&(GM_getValue(get_server()+"low_item_big")!='')){
						
						GM_setValue(get_server()+"vente_en_cours",2);
						setTimeout(function(){auto_click();}, 3000 );
					}
					//si le total des petits de l'inventaire est superieur au prix du plus petit medium du shop, passage en vente des petit. vente =3
					else if((parseInt(GM_getValue(get_server()+"total_low"),10)+parseInt(my_gold,10))>parseInt(get_valeur(GM_getValue(get_server()+"low_item_medium"),10))&&(GM_getValue(get_server()+"low_item_medium")!='')){
						GM_setValue(get_server()+"vente_en_cours",3);
						setTimeout(function(){auto_click();}, 3000 );
					}else{
					
					document.getElementById("div_action_cachette").setAttribute("style","width:85%;height:75px;z-index:100;background-color:rgb(191,240,160);left:1.2em;top:9.7em;position:relative;text-align:center;font-family:comics sans ms;font-weight:bold;color:rgb(10,10,10);")
					document.getElementById("action_cachette").innerHTML="terminé : or caché";
					setTimeout(function(){auto_click();}, reload );
				}
					
				
				
				}
				
				
				else{
					GM_setValue(get_server()+"vente_en_cours",0);
					if(GM_getValue(get_server()+"total_shop")==0){
					
					document.getElementById("action_cachette").innerHTML="terminé : plus aucun objet a acheter";
					}
					else if(id_new==""){
					document.getElementById("action_cachette").innerHTML="terminé : <blink>cachette pleine</blink>";
					}
					
					document.getElementById("td_auto_hide").click();
					auto_click();
				}
				
				}
				
				
				setTimeout(function(){window.location.href=get_base()+"mod=overview&sh="+get_sh()}, 30000 );
				
			}
			else if(GM_getValue(get_server()+"vente_en_cours")==1){		//vente medium
				// GM_setValue(get_server()+"vente_en_cours",0);
				
				
				// alert("vente_medium pour acheter un gros");
				if(!GM_getValue(get_server()+"total_medium")==0){
				document.getElementById("action_cachette").innerHTML="vente_medium pour acheter un gros";
				// alert(GM_getValue(get_server()+"total_medium"));
					id_old=0;
					id_new=0;
					id_old= GM_getValue(get_server()+"medium_item_inv");
					id_new = get_first_place_shop();
					
				
					sell(id_old,id_new);
				
				}else{
				
					GM_setValue(get_server()+"vente_en_cours",0);
					setTimeout(function(){window.location.reload();}, 3000 );
				}
				
				
				
			}
			else if(GM_getValue(get_server()+"vente_en_cours")==2){			//vente medium + petit
				// alert("vente_medium + petits pour acheter un gros");
				document.getElementById("action_cachette").innerHTML="vente_medium + petits pour acheter un gros";
					id_old=0;
					id_new=0;
					if(GM_getValue(get_server()+"medium_item_inv")==""){
						if(!GM_getValue(get_server()+"low_low_item_inv")){
						
							GM_setValue(get_server()+"vente_en_cours",0);
							setTimeout(function(){auto_click();}, 3000 );
						}
						else{
						// alert("ici");
							id_old= GM_getValue(get_server()+"low_item_inv");
						}
					}
					else{
					
						id_old= GM_getValue(get_server()+"medium_item_inv");
					}
					// alert (id_old);
					id_new = get_first_place_shop();
					sell(id_old,id_new);
			}
			else if(GM_getValue(get_server()+"vente_en_cours")==3){
				
				document.getElementById("action_cachette").innerHTML="vente_petit pour acheter un medium";
				if(GM_getValue(get_server()+"low_low_item_inv")!=""){
				id_old=0;
				id_new=0;
				id_old= GM_getValue(get_server()+"low_low_item_inv");
				id_new = get_first_place_shop();
				sell(id_old,id_new);
				}
				else{
				GM_setValue(get_server()+"vente_en_cours",0);
				setTimeout(function(){auto_click();}, 3000 );
				}
			}
			else{
			// alert("ok 2");
			if(GM_getValue(get_server()+"vente_en_cours")==0 && document.getElementById("action_cachette").innerHTML.indexOf("attente")!=-1){
				document.getElementById("action_cachette").innerHTML="terminé 1";
				}
				document.getElementById("action_cachette").innerHTML="oubli dites moi si vous avez ce message";
				setTimeout(function(){auto_click();}, reload );
				
			}
			
			
		},true);
	
		
	
	
	function buy(ID_old,ID_new){
			var t = new Date(), a = t.getTime();
			// alert("/game/ajax/inventoryswap.php?old="+ID_old+"&new="+ID_new+"&doll=1&shopPage=322&a="+a+"&sh="+get_sh());
			$.ajax({
				url: "/game/ajax/inventoryswap.php?old="+ID_old+"&new="+ID_new+"&doll=1&shopPage=322&a="+a+"&sh="+get_sh(),
				type: 'get',
				dataType: 'html',
				async: false,
				success: function(data) {}
			});
			GM_setValue(get_server()+"vente_en_cours",0);
			setTimeout(function(){window.location.reload();}, 3000 );
		}
	
	
	}

	function show_cachette_mess(){
	
	for(i=0;i<document.getElementsByTagName("div").length;i++){
		if(document.getElementsByTagName("div")[i].getAttribute("style")){
			if(document.getElementsByTagName("div")[i].getAttribute("style").indexOf("shop_avatar_1_4.png")!=-1 | document.getElementsByTagName("div")[i].getAttribute("style").indexOf("shop_avatar_0_4.png")!=-1 | document.getElementsByTagName("div")[i].getAttribute("style").indexOf("shop_avatar_2_4.png")!=-1){
				this_i =i;
				// document.getElementsByTagName("div")[i].parentNode.removeChild(document.getElementsByTagName("div")[i].parentNode.getElementsByTagName("div")[0]);
				
				
			}
		}
	}
	action_div = document.createElement("div");
	action_div.setAttribute("id","div_action_cachette");
	action_div.setAttribute("style","width:85%;height:75px;z-index:100;background-color:rgb(250,140,150);left:1.2em;top:9.7em;position:relative;text-align:center;font-family:comics sans ms;font-weight:bold;color:rgb(10,10,10);");
	action_div.innerHTML="<span>Action dans la cachette</span><hr /><span id=action_cachette >attente...</span>";
	document.getElementsByTagName("div")[this_i].insertBefore(action_div,document.getElementsByTagName("div")[this_i].getElementsByTagName("div")[0]);
	
	}
	// shop_avatar_1_4.png
	//}
	
	
	
	//location
	//{
	//si il y a une quete a valider
	if((document.getElementById("mainmenu").getElementsByTagName("a")[1].innerHTML=="Panthéon (1)"|| document.getElementById("mainmenu").getElementsByTagName("a")[1].innerHTML=="Panthéon (2)" || document.getElementById("mainmenu").getElementsByTagName("a")[1].innerHTML=="Panthéon (3)") && GM_getValue(get_server()+"active")==1 && GM_getValue(get_server()+"auto_quest")==1){
	GM_setValue(get_server()+"auto_quest_to_do",1);
	
	}
	
	if(window.location.href.indexOf("mod=quests")>0 ){
	if(parseInt(document.getElementById("quest_header_accepted").innerHTML.split(":")[1].split("/")[0],10)<5){
	get_next_quest();
	}
	}
	
	if(window.location.href.indexOf("mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh=")!=-1 && GM_getValue(get_server()+"auto_hide")==1 && GM_getValue(get_server()+"active")==1 ){
		show_cachette_mess();

	}
	
	if(window.location.href.indexOf("mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh=")!=-1 && GM_getValue(get_server()+"auto_hide")==1 && GM_getValue(get_server()+"active")==1 && (train_possible()==0 | GM_getValue(get_server()+'stat_to_train')=="" | get_time_before_stock(GM_getValue(get_server()+"next_stock"))< GM_getValue(get_server()+"secu_stock")*3600)){

	setTimeout(function(){auto_hide(get_time_to_reload());}, 2000 );
	}

	if(window.location.href.indexOf("mod=quests&sh")!=-1 && GM_getValue(get_server()+"auto_quest")==1 && GM_getValue(get_server()+"active")==1){ 
	setTimeout(function(){auto_quest();	}, 1000 );
	}
	
	if(window.location.href.indexOf("mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh=")!=-1){
		check_shop();
		check_inv();
	}else{
		GM_setValue(get_server()+"vente_en_cours",0);
	}
	
	if(window.location.href.indexOf("mod=training&sh=")!=-1){
		get_stat_value();
		update_stat_value();
		GM_setValue(get_server()+"stat_a_jour",1);
	}
	//}
	

	
	//classement
	//{
	if((window.location.href.indexOf("mod=highscore")!=-1 && !(window.location.href.indexOf("t=")!=-1))|(window.location.href.indexOf("mod=highscore&t=0")!=-1)){
		for(i=0;i<document.getElementById("highscore_table").getElementsByTagName("tr").length;i++){
			
			if(i==0){
			new_cell = document.createElement("td");
			new_cell.innerHTML="<a href=#>RAZ</a>";
			new_cell.setAttribute("id","id_raz");
			// new_cell.setAttribute("class","button");
			document.getElementById("highscore_table").getElementsByTagName("tr")[0].insertBefore(new_cell,document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("th")[3])}
			else{
			//ligne user
			honneur_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.replace(/\./g,"");
			new_cell = document.createElement("td");
			class_td = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getAttribute("class");
			new_cell.setAttribute("class",class_td); 
			//recup nom
			nom_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
			if(nom_user.indexOf("span")!=-1){
				nom_user = nom_user.split("</span>")[0].split(">")[1];
			}
			
			if(!GM_getValue(get_server()+nom_user)){
			
				GM_setValue(get_server()+nom_user,honneur_user);
			}
			
			value = parseInt(honneur_user,10)-parseInt(GM_getValue(get_server()+nom_user),10);
			if(value >= 0){
			new_cell.innerHTML="+"+value;
			}
			else{
			new_cell.innerHTML="-"+value;
			}
			// new_cell.innerHTML=value;
			
			
			
			
			document.getElementById("highscore_table").getElementsByTagName("tr")[i].insertBefore(new_cell,document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[2])
				honneur_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.replace(/\./g,"");
			
			
			
			
			}
		}
		
		document.getElementById("id_raz").addEventListener("click",function(){
			for(i=1;i<document.getElementById("highscore_table").getElementsByTagName("tr").length;i++){
				nom_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
				if(nom_user.indexOf("span")!=-1){
				nom_user = nom_user.split("</span>")[0].split(">")[1];
				}
				honneur_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML.replace(/\./g,"");
				
				
				GM_setValue(get_server()+nom_user,honneur_user);
			}
			
			window.location.reload();
			
			},true)
	
	
		for(i=0;i<document.getElementById("highscore_table").getElementsByTagName("tr").length;i++){
			
			if(i==0){
			new_cell = document.createElement("td");
			new_cell.innerHTML="<a href=#>RAZ</a>";
			new_cell.setAttribute("id","id_raz_atk");
			// new_cell.setAttribute("class","button");
			document.getElementById("highscore_table").getElementsByTagName("tr")[0].insertBefore(new_cell,document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("th")[5])}
			else{
			//ligne user
			atk_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[5].innerHTML.replace(/\./g,"");
			new_cell = document.createElement("td");
			class_td = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getAttribute("class");
			new_cell.setAttribute("class",class_td); 
			//recup nom
			nom_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
			if(nom_user.indexOf("span")!=-1){
				nom_user = nom_user.split("</span>")[0].split(">")[1];
			}
			
			if(!GM_getValue(get_server()+"atk"+nom_user)){
			
				GM_setValue(get_server()+"atk"+nom_user,honneur_user);
			}
			
			value = parseInt(atk_user,10)-parseInt(GM_getValue(get_server()+"atk"+nom_user),10);
			// value =atk_user;
			if(value >= 0){
			new_cell.innerHTML="+"+value;
			}
			else{
			new_cell.innerHTML="-"+value;
			}
			// new_cell.innerHTML=value;
			
			
			
			
				document.getElementById("highscore_table").getElementsByTagName("tr")[i].insertBefore(new_cell,document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[5])
				atk_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[6].innerHTML.replace(/\./g,"");
			
			
			
			
			}
		}
		
		document.getElementById("id_raz_atk").addEventListener("click",function(){
			for(i=1;i<document.getElementById("highscore_table").getElementsByTagName("tr").length;i++){
				nom_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
				if(nom_user.indexOf("span")!=-1){
				nom_user = nom_user.split("</span>")[0].split(">")[1];
				}
				atk_user = document.getElementById("highscore_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[6].innerHTML.replace(/\./g,"");
				
				
				GM_setValue(get_server()+"atk"+nom_user,atk_user);
			}
			
			window.location.reload();
			
			},true)
	
	}

	//}
	
	
	
	//info_bulles
	//{
		//{presentation
		texte_presentation ="<table style='background-color:black;width:250px'>";
		texte_presentation +="<tr>";
		texte_presentation +="<td>";
		texte_presentation +="Bienvenue sur Lord_of_glad";
		texte_presentation +="</td>";
		texte_presentation +="</tr>";
		texte_presentation +="<tr>";
		texte_presentation +="<td>";
		texte_presentation +="<hr />";
		texte_presentation +="Addon regroupant la quasi totalité des actions nécéssaire au jeu Gladiatus:<br/> ";
		texte_presentation +="L'avantage de cet addon vient du peu de joueurs qui le connaissent alors ne le donnez pas à n'importe qui et profitez de l'avantage qu'il vous donne";
		texte_presentation +="<br /><font color=red><blink><b> Attention ne laissez pas tourner cet addon H24 sur votre pc, les admins ne sont pas betes, vous vous ferez bannir de manière définitive</b></blink></font>";
		texte_presentation +="<br/>Faites travailler votre gladiateur la nuit, faites des pauses de 1h par ci par la. Bref faites en sorte que votre gladiateur ai l'air humain.<br/>";
		texte_presentation +="Toutes les attaques seront lancés le plus tot possible et ce, pendant des heures. Il est impossible de jouer plus vite, donc n'abusez pas vous etes assuré d'etre dans les plus gros joueurs du serveur.";
		texte_presentation +="</td>";
		texte_presentation +="</tr>";
		texte_presentation +="</table>";
		//}
		//{stat
		texte_stat ="<table style='background-color:black;width:250px'>";
		texte_stat +="<tr>";
		texte_stat +="<td>";
		texte_stat +="Statistiques";
		texte_stat +="</td>";
		texte_stat +="</tr>";
		texte_stat +="<tr>";
		texte_stat +="<td>";
		texte_stat +="<hr />";
		texte_stat +="Affiche vos statistiques dans le tableau de bord à droite si vous l'activez.";
		texte_stat +="<hr/>";
		texte_stat +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_stat +="</td>";
		texte_stat +="</tr>";
		texte_stat +="</table>";
		//}
		//{cachette
		texte_cachette ="<table style='background-color:black;width:250px'>";
		texte_cachette +="<tr>";
		texte_cachette +="<td>";
		texte_cachette +="Cachette";
		texte_cachette +="</td>";
		texte_cachette +="</tr>";
		texte_cachette +="<tr>";
		texte_cachette +="<td>";
		texte_cachette +="<hr />";
		texte_cachette +="Affiche les infos de la cachette dans le tableau de bord(fenêtre de vente de l'alchimiste).";
		texte_cachette +="<hr/>";
		texte_cachette +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_cachette +="</td>";
		texte_cachette +="</tr>";
		texte_cachette +="</table>";
		//}
		//{reload quetes
		texte_quest ="<table style='background-color:black;width:250px'>";
		texte_quest +="<tr>";
		texte_quest +="<td>";
		texte_quest +="Reload des quetes";
		texte_quest +="</td>";
		texte_quest +="</tr>";
		texte_quest +="<tr>";
		texte_quest +="<td>";
		texte_quest +="<hr />";
		texte_quest +="Affiche l'horloge de la prochaine quete(la seule horlage qui n'est pas visible sur la page principale)";
		texte_quest +="<hr/>";
		texte_quest +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_quest +="</td>";
		texte_quest +="</tr>";
		texte_quest +="</table>";
		//}
		//{or
		texte_or ="<table style='background-color:black;width:250px'>";
		texte_or +="<tr>";
		texte_or +="<td>";
		texte_or +="Or non caché";
		texte_or +="</td>";
		texte_or +="</tr>";
		texte_or +="<tr>";
		texte_or +="<td>";
		texte_or +="<hr />";
		texte_or +="Affiche la quantité d'or non cachée que vous possedez";
		texte_or +="<hr/>";
		texte_or +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_or +="</td>";
		texte_or +="</tr>";
		texte_or +="</table>";
		//}
		//{xp
		texte_xp ="<table style='background-color:black;width:250px'>";
		texte_xp +="<tr>";
		texte_xp +="<td>";
		texte_xp +="Expérience";
		texte_xp +="</td>";
		texte_xp +="</tr>";
		texte_xp +="<tr>";
		texte_xp +="<td>";
		texte_xp +="<hr />";
		texte_xp +="Affiche l'experience acquise et l'expérience nécéssaire pour le prochain lvl";
		texte_xp +="<hr/>";
		texte_xp +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_xp +="</td>";
		texte_xp +="</tr>";
		texte_xp +="</table>";
		//}	
		//{vie
		texte_vie ="<table style='background-color:black;width:250px'>";
		texte_vie +="<tr>";
		texte_vie +="<td>";
		texte_vie +="Points de vie";
		texte_vie +="</td>";
		texte_vie +="</tr>";
		texte_vie +="<tr>";
		texte_vie +="<td>";
		texte_vie +="<hr />";
		texte_vie +="Affiche les points de vie détenus ainsi que les points de vie Max";
		texte_vie +="<hr/>";
		texte_vie +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_vie +="</td>";
		texte_vie +="</tr>";
		texte_vie +="</table>";
		//}
		//{next _act
		texte_next_act ="<table style='background-color:black;width:250px'>";
		texte_next_act +="<tr>";
		texte_next_act +="<td>";
		texte_next_act +="Prochaine action";
		texte_next_act +="</td>";
		texte_next_act +="</tr>";
		texte_next_act +="<tr>";
		texte_next_act +="<td>";
		texte_next_act +="<hr />";
		texte_next_act +="Affiche la prochaine action qui va etre lancée";
		texte_next_act +="<hr/>";
		texte_next_act +="Pour activer ou désactiver le tableau de bord cliquez sur le lien Lord_Of_Glad ci dessus";
		texte_next_act +="</td>";
		texte_next_act +="</tr>";
		texte_next_act +="</table>";
		//}
		//{script
		texte_script ="<table style='background-color:black;width:250px'>";
		texte_script +="<tr>";
		texte_script +="<td>";
		texte_script +="Lancement script";
		texte_script +="</td>";
		texte_script +="</tr>";
		texte_script +="<tr>";
		texte_script +="<td>";
		texte_script +="<hr />";
		texte_script +="active ou désactive le script dans sa totalité";
		
		texte_script +="</td>";
		texte_script +="</tr>";
		texte_script +="</table>";
		//}
		//{auto-hide
		texte_auto_hide ="<table style='background-color:black;width:250px'>";
		texte_auto_hide +="<tr>";
		texte_auto_hide +="<td>";
		texte_auto_hide +="Auto_hide";
		texte_auto_hide +="</td>";
		texte_auto_hide +="</tr>";
		texte_auto_hide +="<tr>";
		texte_auto_hide +="<td>";
		texte_auto_hide +="<hr />";
		texte_auto_hide +="Cache votre or en vendant les objet de la premiere page de l'inventaire dans la fenetre de vente de l'alchimiste";
		texte_auto_hide +="<hr/>";
		texte_auto_hide += "<b>fonctionnement et contraintes :</b><br />auto hide se sert de la <font color=red><b>première</b></font> page de l'inventaire et de la fenêtre de vente de l'alchimiste.";
		texte_auto_hide += "L'or est caché en achetant des objets que vous aurez au préalable vendu chez l'alchimiste.Plus vous aurez d'objets à acheter chez l'alchimiste, plus vous aurez une grande autonomie avec auto hide.";
		texte_auto_hide += "<br />Auto-hide achete d'abord les plus gros objets possible, puis il analyse votre cachette et votre inventaire.";
		texte_auto_hide += "<br />si en vendant les petit objet de votre inventaire il peu acheter un gros objets de la cachette il le fera.";
		texte_auto_hide += "La définition des gros ,moyens et petit objets sera donc importante en fonction des objets que vous droperez";
		texte_auto_hide += "lorsque vous avez besoin d'or, vous pouvez alors revendre vos objets pour disposer de votre or.";
		texte_auto_hide += "<br /><font color=red><b>Contrainte :</b></font> Les objets de la première page sont réservés pour la cachette.";
		texte_auto_hide += "ces objets doivent utiliser <font color=red><b>une&#160seule&#160case</b></font> dans l'inventaire (bague,amulette,amélioration,potion) donc pas d'équipement.";
		texte_auto_hide += "<br />n'oubliez pas de stopper auto-hide pour disposer de votre OR :)";
		texte_auto_hide +="</td>";
		texte_auto_hide +="</tr>";
		texte_auto_hide +="</table>";
		//}
		//{limite de PO
		texte_li_po ="<table style='background-color:black;width:250px'>";
		texte_li_po +="<tr>";
		texte_li_po +="<td>";
		texte_li_po +="Limite de Po";
		texte_li_po +="</td>";
		texte_li_po +="</tr>";
		texte_li_po +="<tr>";
		texte_li_po +="<td>";
		texte_li_po +="<hr />";
		texte_li_po +="Cette valeur indique la limite de Po que vous acceptez de garder sur vous";
		texte_li_po +="<br />Au dessus de cette valeur, auto-hide essaiera systematiquement de cacher votre or, et vous empechera de jouer.";
		texte_li_po +="choisissez une valeur assez basse, mais n'espérez pas cacher la totalité de votre or. une valeur entre 500 et 2000 est deja correcte ";
		texte_li_po +="pour avoir un minimum d'or sur vous tout en continuant a jouer";
		texte_li_po +="</td>";
		texte_li_po +="</tr>";
		texte_li_po +="</table>";
		//}
		//{petit
		texte_petit ="<table style='background-color:black;width:250px'>";
		texte_petit +="<tr>";
		texte_petit +="<td>";
		texte_petit +="petits objets";
		texte_petit +="</td>";
		texte_petit +="</tr>";
		texte_petit +="<tr>";
		texte_petit +="<td>";
		texte_petit +="<hr />";
		texte_petit +="cette valeur défini la valeur haute des petits objets ainsi que la valeur basse des objets moyens de votre cachette:";
		texte_petit +="<br />les petits objets servent a afiner les achat dans la cachette. Ils sont indispensables pour esperer passer sous la limite de Po";
		texte_petit +="<br />les petits objets seront achetés ou vendu selon les besoin de auto-hide";
		texte_petit +="Essayez d'avoir 3 ou 4 petits objets pour que auto hide puisse descendre sous la barre de limite_PO";
		texte_petit +="";
		texte_petit +="</td>";
		texte_petit +="</tr>";
		texte_petit +="</table>";
		//}
		//{moyens
		texte_moyen ="<table style='background-color:black;width:250px'>";
		texte_moyen +="<tr>";
		texte_moyen +="<td>";
		texte_moyen +="Moyens objets (mediums)";
		texte_moyen +="</td>";
		texte_moyen +="</tr>";
		texte_moyen +="<tr>";
		texte_moyen +="<td>";
		texte_moyen +="<hr />";
		texte_moyen +="cette valeur défini la valeur haute des objets moyens ainsi que la valeur basse des gros objets de votre cachette:";
		texte_moyen +="<br />les moyens objets servent a dégrossir le travail de auto hide avant de faire intervenir les petits objets.";
		texte_moyen +="<br />les moyens objets seront achetés ou vendus selon les besoin de auto-hide.";
		texte_moyen +="";
		texte_moyen +="Essayez d'avoir 3 ou 4 objets moyens pour que auto hide puisse descendre sous la barre de limite_PO";
		texte_moyen +="";
		texte_moyen +="</td>";
		texte_moyen +="</tr>";
		texte_moyen +="</table>";
		//}
		//{auto-heal
		texte_heal ="<table style='background-color:black;width:250px'>";
		texte_heal +="<tr>";
		texte_heal +="<td>";
		texte_heal +="Auto-heal";
		texte_heal +="</td>";
		texte_heal +="</tr>";
		texte_heal +="<tr>";
		texte_heal +="<td>";
		texte_heal +="<hr />";
		texte_heal +="lorsque votre vie passe en dessous de la limite que vous choisissez(valeur ci-dessous), auto-heal utilise un des consomables de la <font color=red><b>deuxième</b></font> page de votre inventaire";
		texte_heal +="Vous pouvez donc remplir entièrement cette page de consomable. Votre consomation dependra dans tout les cas des degats que prendra votre gladiateur";
		texte_heal +="</td>";
		texte_heal +="</tr>";
		texte_heal +="</table>";
		//}
		//{auto-Quest
		texte_quest ="<table style='background-color:black;width:250px'>";
		texte_quest +="<tr>";
		texte_quest +="<td>";
		texte_quest +="Auto-quest";
		texte_quest +="</td>";
		texte_quest +="</tr>";
		texte_quest +="<tr>";
		texte_quest +="<td>";
		texte_quest +="<hr />";
		texte_quest +="Comme son nom l'indique, auto-quest va lancer les quetes et les valider automatiquement.";
		texte_quest +="<br />Vous pouvez décider de ne lancer qu'un certain type de quête parmi les 4 paramétrables :";
		texte_quest +="<br /><b><u>turma</u> :</b> Pour les arènes en provinciarum";
		texte_quest +="<br /><b><u>arène</u> :</b> Pour les arènes normales";
		texte_quest +="<br /><b><u>enemy</u> :</b> Tuer X enemis (en moins de : tant de temps)";
		texte_quest +="<br /><b><u>object</u>:</b> Trouver x objets";
		texte_quest +="<br />les quetes d'arènes ne sont a activer que si vous faites des arenes. Sinon les quetes resteront actives et vous allez vous bloquer";
		texte_quest +="</td>";
		texte_quest +="</tr>";
		texte_quest +="</table>";
		//}
		//{auto-arene
		texte_arene ="<table style='background-color:black;width:250px'>";
		texte_arene +="<tr>";
		texte_arene +="<td>";
		texte_arene +="Auto-Arène";
		texte_arene +="</td>";
		texte_arene +="</tr>";
		texte_arene +="<tr>";
		texte_arene +="<td>";
		texte_arene +="<hr />";
		texte_arene +="Comme son nom l'indique, auto-arène lancera vos arènes automatiquement.";
		texte_arene +="<br />Sur les 5 adversaires proposés , le plus petit niveau sera choisi pour adversaire. ";
		texte_arene +="<br />Le système n'est pas infaillible, mais il faut bien choisir un gladiateur.";
		texte_arene +="</td>";
		texte_arene +="</tr>";
		texte_arene +="</table>";
		//}
		//{auto-turma
		texte_turma ="<table style='background-color:black;width:250px'>";
		texte_turma +="<tr>";
		texte_turma +="<td>";
		texte_turma +="Auto-turma";
		texte_turma +="</td>";
		texte_turma +="</tr>";
		texte_turma +="<tr>";
		texte_turma +="<td>";
		texte_turma +="<hr />";
		texte_turma +="Comme son nom l'indique, auto-turma lancera vos arènes turma automatiquement.";
		texte_turma +="<br />Sur les 5 adversaires proposés , le plus petit niveau sera choisi pour adversaire. ";
		texte_turma +="<br />Le système n'est pas infaillible, mais il faut bien choisir un gladiateur.";
		texte_turma +="</td>";
		texte_turma +="</tr>";
		texte_turma +="</table>";
		//}
		//{région
		texte_region ="<table style='background-color:black;width:250px'>";
		texte_region +="<tr>";
		texte_region +="<td>";
		texte_region +="Région";
		texte_region +="</td>";
		texte_region +="</tr>";
		texte_region +="<tr>";
		texte_region +="<td>";
		texte_region +="<hr />";
		texte_region +="le choix de la région n'a pas d'incidence sur le script.";
		texte_region +="<br />La région mettra juste le bon nom des mobs et des dongeons a jour dans les liste ci-dessous.";
		texte_region +="</td>";
		texte_region +="</tr>";
		texte_region +="</table>";
		//}
		//{auto-dongeon
		texte_auto_dun ="<table style='background-color:black;width:250px'>";
		texte_auto_dun +="<tr>";
		texte_auto_dun +="<td>";
		texte_auto_dun +="Auto-dungeon";
		texte_auto_dun +="</td>";
		texte_auto_dun +="</tr>";
		texte_auto_dun +="<tr>";
		texte_auto_dun +="<td>";
		texte_auto_dun +="<hr />";
		texte_auto_dun +="Sélection du donjon que vous voulez faire en boucle.";
		texte_auto_dun +="<br />Lancera le donjon de la région séléctionnée (mode normal si le mode avancé n'est pas encore disponible).";
		texte_auto_dun +="<br />Vous pouvez faire le donjon en entier, ou sans le boss, suivant si vous pouvez battre le boss ou pas.";
		texte_auto_dun +="</td>";
		texte_auto_dun +="</tr>";
		texte_auto_dun +="</table>";
		//}
		//{auto-pex
		texte_auto_pex ="<table style='background-color:black;width:250px'>";
		texte_auto_pex +="<tr>";
		texte_auto_pex +="<td>";
		texte_auto_pex +="Auto-pex";
		texte_auto_pex +="</td>";
		texte_auto_pex +="</tr>";
		texte_auto_pex +="<tr>";
		texte_auto_pex +="<td>";
		texte_auto_pex +="<hr />";
		texte_auto_pex +="Sélection du mob que vous voulez faire en boucle.";
		texte_auto_pex +="<br />Attaque en boucle le mob séléctionné.";
		texte_auto_pex +="</td>";
		texte_auto_pex +="</tr>";
		texte_auto_pex +="</table>";
		//}
		//{auto-train
		texte_auto_train ="<table style='background-color:black;width:250px'>";
		texte_auto_train +="<tr>";
		texte_auto_train +="<td>";
		texte_auto_train +="Auto-Trainning";
		texte_auto_train +="</td>";
		texte_auto_train +="</tr>";
		texte_auto_train +="<tr>";
		texte_auto_train +="<td>";
		texte_auto_train +="<hr />";
		texte_auto_train +="A activer de préférence avec auto-hide.";
		texte_auto_train +="<br />lorsque la quantité d'or de votre cachette + l'or que vous avez sur vous est suffisante pour acheter une stat,";
		texte_auto_train +="<br />auto-train vendra tout dans la cachette et montera votre stat de 1 point.";
		texte_auto_train +="<br />Attention: Auto train ne tient pas compte des heures de restockage. Si votre cachette est restokée juste apres un entrainement,";
		texte_auto_train +="votre cachette sera vide, et votre or ne sera plus caché alors que le script lui continuera de lancer des combats et d'accumuler de l'or...";
		texte_auto_train +="</td>";
		texte_auto_train +="</tr>";
		texte_auto_train +="</table>";
		//}
		//{secu-train
		texte_secu_train ="<table style='background-color:black;width:250px'>";
		texte_secu_train +="<tr>";
		texte_secu_train +="<td>";
		texte_secu_train +="Sécurité auto-train";
		texte_secu_train +="</td>";
		texte_secu_train +="</tr>";
		texte_secu_train +="<tr>";
		texte_secu_train +="<td>";
		texte_secu_train +="<hr />";
		texte_secu_train +="Si auto train est activé il ne tient pas compte de l'horloge de restockage et va vendre dans la cachette des qu'il pourra monter une stat.";
		texte_secu_train +="<br />Lors du restockage,la cachette sera completement vidée, si auto-train ne s'arrete pas , vous n'aurez plus d'objet a acheter dans la cachette et votre inventaire sera peu rempli.";
		texte_secu_train +=" Auto-hide va s'arreter de fonctionner et vous allez vous retrouver avec tout votre or sur vous pret a être pillé :(";
		texte_secu_train +="<br /La sécurité est le temps avant le restockage interdisant le auto-train pour vous permettre d'accumuler des objets avnt le vidage de la cachette<br />";
		texte_secu_train +="Tant que l'horloge est supérieure a la sécurité , l'entrainement se fait. En dessous, auto train ne s'activera plus pour essayer de garder un max d'objet avant le restockage.";
		texte_secu_train +="Auto-train ne reprendra qu'apres le restockage...";
		texte_secu_train +="</td>";
		texte_secu_train +="</tr>";
		texte_secu_train +="</table>";
		//}
	//}
	
	
	//-----------------------------------------------------------------------------------------------
	//tableau
	//-----------------------------------------------------------------------------------------------
	//{
	
		//{ tableau de bord
		tableau = "<p align=center><table class=tableau_gestion>";
		tableau += "<tr >";
		tableau += "<td align=center class=button_title_200 id=affichage_gros>";
		tableau += "<span border align=center class=aff_help > <a href='#' class=aff_help><div>"+texte_presentation+"</div>Lord_of_Glad </a></span><br /><span align=center >";
		tableau += "<font color=black><blink>";
		tableau += "<a target=_blank style='color:black;font-family:arial;font-weight:bold;' href='http://userscripts.org/topics/124039' title='signaler des bugs, obtenir des informations, discuter de lor_of_glad'>Des questions ??</a>";
		tableau += "</blink></font></span></a>";
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		tableau += "<td align=center class=button_title id=affichage_gros>";
		//{#####################################################################
			tableau += "<table>";
			tableau += "<tr>";
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_stat+"</div>";
			if(GM_getValue(get_server()+"display_stat")=="yes"){
			tableau += "<span id=span_display_stat class=button title='stats'>";
			}
			else{
			tableau += "<span id=span_display_stat class=button_off title='stats'>";
			}
			tableau += "1";
			tableau += "</span>";
			tableau += "</td>";
			
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_cachette+"</div>";
			if(GM_getValue(get_server()+"display_cachette")=="yes"){
			tableau += "<span id=span_display_cachette class=button title='cachette'>";
			}
			else{
			tableau += "<span id=span_display_cachette class=button_off title='stats'>";
			}
			tableau += "2";
			tableau += "</span>";
			tableau += "</td>";
			
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_quest+"</div>";
			if(GM_getValue(get_server()+"display_quest")=="yes"){
			tableau += "<span  id=span_display_quest class=button title='prochaine_quete'>";
			}
			else{
			tableau += "<span id=span_display_quest class=button_off title='stats'>";
			}
			
			tableau += "3";
			tableau += "</span>";
			tableau += "</td>";
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_or+"</div>";
			if(GM_getValue(get_server()+"display_or")=="yes"){
			tableau += "<span id=span_display_or class=button title='OR'>";
			}else{
			tableau += "<span id=span_display_or class=button_off title='OR'>";
			}
			tableau += "4";
			tableau += "</span>";
			tableau += "</td>";
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_xp+"</div>";
			if(GM_getValue(get_server()+"display_xp")=="yes"){
			tableau += "<span id=span_display_xp class=button title='XP'>";
			}else{
			tableau += "<span id=span_display_xp class=button_off title='XP'>";
			}
			tableau += "5";
			tableau += "</span>";
			tableau += "</td>";
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_vie+"</div>";
			if(GM_getValue(get_server()+"display_vie")=="yes"){
			tableau += "<span id=span_display_vie class=button title='VIE'>";
			}else{
			tableau += "<span id=span_display_vie class=button_off title='VIE'>";
			}
			tableau += "6";
			tableau += "</span>";
			tableau += "</td>";
			tableau += "<td>";
			tableau += "<a href='#' class=aff_help><div>"+texte_next_act+"</div>";
			if(GM_getValue(get_server()+"display_action")=="yes"){
			tableau += "<span id=span_display_action class=button title='prochaine_action'>";
			}
			else{
			tableau += "<span id=span_display_action class=button_off title='prochaine_action'>";
			}
			tableau += "7";
			tableau += "</span>";
			tableau += "</td>";
			
			tableau += "</tr>";
			tableau += "</table>";
		//}
		//#####################################################################
		
		//{script général
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		if(GM_getValue(get_server()+"active")==1){
		tableau += "<td id=td_active class=button align=center >";
		}else{
		tableau += "<td id=td_active class=button_off align=center >";
		}
		if(GM_getValue(get_server()+"active")==0){
		tableau += "<a href='#' class=aff_help><div>"+texte_script+"</div>";
		tableau += "<span id=text_auto-click>activer le script</span>";
		}
		else{
		tableau += "<a href='#' class=aff_help><div>"+texte_script+"</div>";
		tableau += "<span id=text_auto-click>Désactiver le script</span>";
		}

		tableau += "</td>";
		tableau += "</tr>";
		//}
		
		//{auto_hide
		tableau += "<tr >";
		if(!GM_getValue(get_server()+"auto_hide")||GM_getValue(get_server()+"auto_hide")==0){

		tableau += "<td align=center id=td_auto_hide class='button_off'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_auto_hide+"</div>";
		tableau += "<span id=text_auto-hide>auto hide desactivé</span>";
		}
		else{

		tableau += "<td align=center id=td_auto_hide class='button'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_auto_hide+"</div>";
		tableau += "<span id=text_auto-hide>auto hide activé</span>";
		}

		tableau += "</td>";
		tableau += "</tr>";
		tableau += "</tr>";
		
		
		
		tableau += "<tr>";
		tableau += "<td class=button><table width=100%><tr><td width=33%>";
		tableau += "<a href='#' class=aff_help><div>"+texte_li_po+"</div>";
		tableau += "limite_Po</td><td><input style=width:80px; type=text id=limit_gold_value value="+GM_getValue(get_server()+"gold_limit_value")+"></td>";
		tableau += "<td>Po</td>";
		tableau += "<td><input id=valider_limit_gold type=button value=ok></td>";
		tableau += "</tr></table></td>";
		tableau += "</tr>";
		tableau += "<tr>";
		tableau += "<td class=button><table width=100%><tr><td width=33%>";
		tableau += "<a href='#' class=aff_help><div>"+texte_petit+"</div>";
		tableau += "petit<</td>";
		
		tableau += "<td><input style=width:80px; type=text id=limit_gold_low value="+GM_getValue(get_server()+"gold_limit_low")+"></td>";
		tableau += "<td >Po </td>";
		tableau += "<td><input id=valider_limit_low type=button value=ok></td></tr></table>";
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		tableau += "<td class=button><table width=100%><tr><td width=33%>";
		tableau += "<a href='#' class=aff_help><div>"+texte_moyen+"</div>";
		tableau += "medium<</td>";
		tableau += "<td><input style=width:80px; type=text id=limit_gold_medium value="+GM_getValue(get_server()+"gold_limit_medium")+"></td>";
		tableau += "<td>Po </td>";
		tableau += "<td><input id=valider_limit_medium type=button value=ok></td></tr></table>";
		tableau += "</td>";
		tableau += "</tr>";
		
		//}
	
		//auto-heal
		//{
		tableau += "<tr>";
		
		if(!GM_getValue(get_server()+"auto_heal")||GM_getValue(get_server()+"auto_heal")==0){

		tableau += "<td align=center id=td_auto_heal class='button_off'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_heal+"</div>";
		tableau += "<span id=text_auto-heal>auto Heal desactivé</span>";
		}
		else{
		tableau += "<td align=center id=td_auto_heal class='button'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_heal+"</div>";
		tableau += "<span id=text_auto-heal>auto Heal activé</span>";
		}
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		tableau += "<td class=button>";
		tableau += "<input style=width:100px; type=text id=hp_value value="+GM_getValue(get_server()+"hp_lvl")+">";
		tableau += "%&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160";
		tableau += "<input id=valider_hp type=button value=ok>";
		tableau += "</td>";
		tableau += "</tr>";
		//}

		//auto-quest
		//{
		
		if(GM_getValue(get_server()+"auto_quest")==1){
		tableau += "<td align=center id=td_auto_quest class='button'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_quest+"</div>";
		tableau += "<span id=text_auto-quest>auto-quest activé</span>";
		}
		else{
		tableau += "<td align=center id=td_auto_quest class='button_off'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_quest+"</div>";
		tableau += "<span id=text_auto-quest>auto-quest désactivé</span>";
		}
		tableau += "</td></tr><tr class='button'><td class='button'>";
		tableau += "<table width=100%><tr><td>";
		if(GM_getValue(get_server()+"turma_quest")==1){
		tableau += "<input type=checkbox checked=yes id=turma_quest title='Quêtes de turma'>turma";
		}else{
		tableau += "<input type=checkbox id=turma_quest title='Quêtes de turma'>turma";
		}
		tableau += "</td><td>";
		if(GM_getValue(get_server()+"arena_quest")==1){
		tableau += "<input type=checkbox  checked=yes id=arena_quest title='Quêtes d arène'>arène";
		}else{
		tableau += "<input type=checkbox id=arena_quest title='Quêtes d arène'>arène";
		}
		tableau += "</td></tr><tr><td>";
		if(GM_getValue(get_server()+"enemy_quest")==1){
		tableau += "<input type=checkbox checked=yes id=enemy_quest title='Quêtes enemis'>enemy";
		}
		else{
		tableau += "<input type=checkbox id=enemy_quest title='Quêtes enemis'>enemy";
		}
		tableau += "</td><td>";
		if(GM_getValue(get_server()+"object_quest")==1){
		tableau += "<input type=checkbox checked=yes id=object_quest title='quêtes trouver objets'>object";
		}
		else{
		tableau += "<input type=checkbox id=object_quest title='quêtes trouver objets'>object";
		}
		tableau += "</td></tr></table>";
	

		tableau += "</td>";
		tableau += "</tr>";
		//}
		
		//auto-arène
		//{
		tableau += "<tr>";

		if(!GM_getValue(get_server()+"auto_arene")||GM_getValue(get_server()+"auto_arene")==0){
		tableau += "<td align=center id=td_auto_arene class='button_off'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_arene+"</div>";
		tableau += "<span id=text_auto-arene>auto-arene desactivé</span>";
		}
		else{
		tableau += "<td align=center id=td_auto_arene class='button'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_arene+"</div>";
		tableau += "<span id=text_auto-arene>auto-arene activé</span>";
		}

		tableau += "</td>";
		tableau += "</tr>";
		//}
	
		//auto-turma
		//{
		if(!GM_getValue(get_server()+"auto_pro")||GM_getValue(get_server()+"auto_pro")==0){
		tableau += "<td align=center id=td_auto_pro class='button_off'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_turma+"</div>";
		tableau += "<span id=text_auto-pro>auto-provinciarum desactivé</span>";
		}
		else{
		tableau += "<td align=center id=td_auto_pro class='button'>";
		tableau += "<a href='#' class=aff_help><div>"+texte_turma+"</div>";
		tableau += "<span id=text_auto-pro>auto-provinciarum activé</span>";
		}

		tableau += "</td>";
		tableau += "</tr>";
		//}
	
		//Région
		//{
		tableau += "<tr>";
		
		tableau += "<td class=button align=center>";
		tableau += "<a href='#' class=aff_help><div>"+texte_region+"</div>";
		tableau += "Région : </a><select id=region>";
		tableau += "<option value="+GM_getValue(get_server()+"region")+">"+GM_getValue(get_server()+"region")+"</option>";
		tableau += "<option value=Italie>Italie</option>";
		tableau += "<option value=Afrique>Afrique</option>";
		tableau += "<option value=Allemagne>Allemagne</option>";

		tableau += "</select>";
		tableau += "</td>";
		tableau += "</tr>";
		//}
		
		//auto-dongeon
		//{
		tableau += "<tr>";

		if(GM_getValue(get_server()+"auto_dongeon")==0){
			tableau += "<td id=td_auto_dongeon class=button_off align=center>";
			tableau += "<a href='#' class=aff_help><div>"+texte_auto_dun+"</div>";
			tableau += "<span id=text_auto-dongeon>auto-dongeon desactivé</span></a>";
		}
		else{
			tableau += "<td id=td_auto_dongeon class=button align=center>";
			tableau += "<a href='#' class=aff_help><div>"+texte_auto_dun+"</div>";
			tableau += "<span id=text_auto-dongeon>auto-dongeon activé</span></a>";
		}
		
		tableau += "<select id=auto_dongeon>";
		tableau += "<option value='"+GM_getValue(get_server()+"dun")+"'>"+get_nom_dun(GM_getValue(get_server()+"dun"))+"</option>";
		tableau += "<option value=no>désactiver</option>";
		tableau += get_liste_dun_select();

		tableau += "</select><br />";
		if(GM_getValue(get_server()+"boss_dungeon")=='1'){
		tableau += "<input type=checkbox checked=yes id=boss_dongeon>faire le boss";
		}
		else{
		tableau += "<input type=checkbox  id=boss_dongeon>faire le boss";
		}
		
		// tableau += GM_getValue(get_server()+"boss_dungeon");
		
		
		tableau += "</td>";
		tableau += "</tr>";
		
		
		//}
		
		//auto-pex
		//{
		tableau += "<tr>";
		if(GM_getValue(get_server()+"auto_pex")==0){
			tableau += "<td id=td_auto_pex class=button_off align=center>";
			tableau += "<a href='#' class=aff_help><div>"+texte_auto_pex+"</div>";
			tableau += "<span id=text_auto-pex>auto-pex desactivé</span></a>";
		}
		else{
			tableau += "<td id=td_auto_pex class=button align=center>";
			tableau += "<a href='#' class=aff_help><div>"+texte_auto_pex+"</div>";
			tableau += "<span id=text_auto-pex>auto-pex activé</span></a>";
		}



		tableau += "<select id=auto_mob>";

		tableau += "<option value='"+GM_getValue(get_server()+"mob")+"'>"+get_nom_mob(GM_getValue(get_server()+"mob"))+"</option>";
		tableau += "<option value=no>désactiver</option>";

		tableau += get_liste_mob_select();
		tableau += "</select>";

		tableau += "</td>";
		tableau += "</tr>";
		//}
		
		//auto-train
		//{
		tableau += "<tr>";
		if(GM_getValue(get_server()+"stat_to_train")!=''){
		tableau += "<td class=button align=center id=td_training>";
		}
		else{
		tableau += "<td class=button_off align=center id=td_training>";
		}
		tableau += "<a href='#' class=aff_help><div>"+texte_auto_train+"</div>";
		tableau += "auto-trainning</a>";
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		if(GM_getValue(get_server()+"stat_to_train")!=''){
		tableau += "<td class=button align=center id=td_training_aff>";
		}
		else{
		tableau += "<td class=button_off align=center id=td_training_aff>";
		}
		
		// tableau += "<td class=button id=td_training>";
		//auto train
		//{
		tableau += "<table>";
		tableau += "<tr>";
		tableau += "<td>entrainer&#160: </td>";
		tableau += "<td>";
		tableau += "<select name=stat_to_train id=stat_to_train>";
		if(GM_getValue(get_server()+"stat_to_train")!=''){
		tableau += "<option value='"+GM_getValue(get_server()+"stat_to_train")+"'>"+GM_getValue(get_server()+"stat_to_train")+"</option>";
		}else{
		tableau += "<option value=''>désactivé</option>";
		}
		tableau += "<option value=''>désactivé</option>";
		tableau += "<option value='force'>force</option>";
		tableau += "<option value='adresse'>adresse</option>";
		tableau += "<option value='agilite'>agilité</option>";
		tableau += "<option value='constitution'>constitution</option>";
		tableau += "<option value='charisme'>charisme</option>";
		tableau += "<option value='intelligence'>intelligence</option>";
		tableau += "</select>";
		
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		tableau += "<td colspan=2>";
		tableau += "<a href='#' class=aff_help><div>"+texte_secu_train+"</div>";
		tableau += "horloge de restockage</a>";
		tableau += "</td>";
		tableau += "</tr>";
		//horloge de stockage
		tableau += "<tr>";
		tableau += "<td colspan=2 bgcolor=rgb(0,0,0); align=center>";
		tableau += get_horloge_restockage(GM_getValue(get_server()+"next_stock"));
		tableau += "</td>";
		tableau += "</tr>";
		tableau += "<tr>";
		tableau += "<td colspan=2 bgcolor=rgb(0,0,0); align=center>";
		tableau +=  "<select id=select_secu_stock>";
		if(GM_getValue(get_server()+"secu_stock")==0){
		tableau +=  "<option value=0>pas de sécurité</option>";
		}
		else{
		tableau +=  "<option value="+GM_getValue(get_server()+"secu_stock")+">"+GM_getValue(get_server()+"secu_stock")+"h</option>";
		}
		tableau +=  "<option value=0>pas de sécurité</option>";
		tableau +=  "<option value=1>1h </option>";
		tableau +=  "<option value=2>2h</option>";
		tableau +=  "<option value=3>3h</option>";
		tableau +=  "<option value=4>4h</option>";
		tableau +=  "<option value=5>5h</option>";
		tableau +=  "<option value=6>6h</option>";
		tableau +=  "</select>";
		tableau += "</td>";
		tableau += "</tr>";
		
		tableau += "<tr>";
		tableau += "<td colspan=2 align=center>";
		if(GM_getValue(get_server()+"stat_to_train")!=""){
		tableau += "<span id=prix_stat_to_train_aff align=center>"+GM_getValue(get_server()+"stat_to_train")+" : "+GM_getValue(get_server()+"price_stat_to_train")+"</span>";
		}else{
		tableau += "<span id=prix_stat_to_train_aff align=center></span>";
		}
		
		tableau += "</td>";
		tableau += "</tr>";
		
		
		
		tableau += "</table>";
		
		tableau += "</tr>";
		tableau += "</table>";
		
		//}
	
	//}
	//}
		
	
	//tableau droite
	//{
	// alert();
		if(GM_getValue(get_server()+"affichage_gros")==1){
		tableau_droite = "<p align=center><table id=table_big class=tableau_info>";
		}
		else{
		tableau_droite = "<p align=center><table id=table_big style='display:none;' class=tableau_info>";
		}
		
		tableau_droite += "<tr>";
		tableau_droite += "<td style='width:250px;' align=center class=button_title>";
		tableau_droite += "<p align=center>informations_générale_pour_voir_de_loin</p>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		
		
		//####################################################
		tableau_droite += "<tr id='tr_display_stat_title' style='display:"+GM_getValue(get_server()+"display_stat")+";'>";
		tableau_droite += "<td style='width:100%;' align=center class=button_title>";
		tableau_droite += "<span align=right>mes stats</span>&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160<span id='reset_stat' align=left class=button_reset>reset</span>";
		tableau_droite += "</td></tr>";
		tableau_droite += "<tr id=tr_display_stat style='display:"+GM_getValue(get_server()+"display_stat")+";'><td style='width:250px;' align=center class=button_title_200>";
		tableau_droite += "<table width=100% >";
		tableau_droite += "<tr ><td>";
		tableau_droite += "dernier reset";
		tableau_droite += "</td><td>";
		that_date = new Date();
		
		tableau_droite += "<span id='span_date'>"+get_horloge_date_stat()+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "Quetes éffectuées";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_quest'>"+GM_getValue(get_server()+"nb_quest")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "victoires / total";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_victoire'>"+GM_getValue(get_server()+"stat_victoire")+"</span>/<span id='span_combat'>"+GM_getValue(get_server()+"stat_combat")+"</span> | <span id='percent'>"+(GM_getValue(get_server()+"stat_victoire")/GM_getValue(get_server()+"stat_combat")*100).toFixed(1)+"%</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "xp";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_xp'>"+GM_getValue(get_server()+"stat_xp")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "honneur";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_honneur'>"+GM_getValue(get_server()+"stat_honneur")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "Gloire";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_gloire'>"+GM_getValue(get_server()+"stat_gloire")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "or";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_or'>"+GM_getValue(get_server()+"stat_or")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "Record de gain : ";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_pillage'><a href="+GM_getValue(get_server()+"lien_gros_pillage")+get_sh()+" title=voir style=color:black;>"+GM_getValue(get_server()+"gros_pillage")+"</a></span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "</table>";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		//####################################################
		
		//####################################################
		tableau_droite += "<tr id='tr_display_cachette_title' style='display:"+GM_getValue(get_server()+"display_cachette")+";'>";
		tableau_droite += "<td style='width:100%;' align=center class=button_title>";
		tableau_droite += "<span align=right><a href="+get_base()+"mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh="+get_sh()+" style=color:black;>cachette</a></span>";
		tableau_droite += "</td></tr>";
		tableau_droite += "<tr id=tr_display_cachette style='display:"+GM_getValue(get_server()+"display_cachette")+";'><td style='width:250px;' align=center class=button_title_200>";
		tableau_droite += "<table width=100% >";
		tableau_droite += "<tr ><td>";
		tableau_droite += "Or cachette";
		tableau_droite += "</td><td>";
		that_date = new Date();
		
		tableau_droite += "<span id='span_or_cachette'>"+GM_getValue(get_server()+"total_shop")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr><td>";
		tableau_droite += "Or inventaire";
		tableau_droite += "</td><td>";
		tableau_droite += "<span id='span_quest'>"+GM_getValue(get_server()+"total_inv")+"</span>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		
		tableau_droite += "</table>";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		//####################################################
		
		tableau_droite += "<tr id=tr_display_quest style='display:"+GM_getValue(get_server()+"display_quest")+";'>";
		tableau_droite += "<td align=center class=button_title_200>";
		tableau_droite += "Prochaine quête :<br/> <font size=20>"+get_horloge(parseInt(GM_getValue(get_server()+"next_quest")))+"</font>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr id=tr_display_or style='display:"+GM_getValue(get_server()+"display_or")+";'>";
		tableau_droite += "<td align=center class=button_title_200>";
		tableau_droite += "<font size=20>OR : "+document.getElementById("sstat_gold_val").innerHTML+"</font>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr id=tr_display_xp style='display:"+GM_getValue(get_server()+"display_xp")+";'>";
		tableau_droite += "<td align=center class=button_title_200>";
		tableau_droite += "<font size=20>XP : "+get_xp()+"</font>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr id=tr_display_vie style='display:"+GM_getValue(get_server()+"display_vie")+";'>";
		tableau_droite += "<td align=center class=button_title_200>";
		tableau_droite += "<font size=20>Vie : "+get_vie()+"</font>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "<tr id=tr_display_action style='display:"+GM_getValue(get_server()+"display_action")+";'>";
		tableau_droite += "<td align=center class=button_title_120 >";
		tableau_droite += "prochaine action : ("+GM_getValue(get_server()+"action_encours")+")<hr/><span  id=img_action_en_cours align=left><img style=width:50px;height:50px; src="+GM_getValue(get_server()+"img_action_encours")+"></span><font size=10>"+get_horloge_attaque(get_time_to_reload())+"</font>";
		tableau_droite += "</td>";
		tableau_droite += "</tr>";
		tableau_droite += "</table></p>";
		
		
		
	
	
	
	
	
	//}
	
	//}
	
	
	


	//insertion des deux panneaux
	//{
	div_droite = document.createElement("div");
	div_droite.setAttribute("style",style2);
	div_droite.innerHTML=tableau_droite;
	
	div = document.createElement("div");
	div.setAttribute("style",style);
	div.innerHTML=tableau;
	
	div_help=document.createElement("div");
	div_help.setAttribute("id","div_help");
	div_help.setAttribute("style",style3);
	
	div_help.setAttribute("class","help_hidden");
	
	document.getElementsByTagName("body")[0].insertBefore(div,document.getElementsByTagName("body")[0].firstChild);
	document.getElementsByTagName("body")[0].insertBefore(div_droite,document.getElementsByTagName("body")[0].firstChild);
	document.getElementsByTagName("body")[0].insertBefore(div_help,document.getElementsByTagName("body")[0].firstChild);
	//}
	
	
	
	//{Listener
	
	document.getElementById("turma_quest").addEventListener("click",function(){
		if(GM_getValue(get_server()+"turma_quest")==0){
			GM_setValue(get_server()+"turma_quest",1);
			
		}
		else{
		GM_setValue(get_server()+"turma_quest",0);
		}
		
	},true);
	
	document.getElementById("arena_quest").addEventListener("click",function(){
		if(GM_getValue(get_server()+"arena_quest")==0){
			GM_setValue(get_server()+"arena_quest",1);
			
		}
		else{
		GM_setValue(get_server()+"arena_quest",0);
		}
		
	},true);
	
	document.getElementById("enemy_quest").addEventListener("click",function(){
		if(GM_getValue(get_server()+"enemy_quest")==0){
			GM_setValue(get_server()+"enemy_quest",1);
			
		}
		else{
		GM_setValue(get_server()+"enemy_quest",0);
		}
		
	},true);
	
	document.getElementById("boss_dongeon").addEventListener("click",function(){
	
	if(GM_getValue(get_server()+"boss_dungeon")=='1'){
	
	GM_setValue(get_server()+"boss_dungeon",'0');
	}else{
	GM_setValue(get_server()+"boss_dungeon",'1');
	}
	
	
	},true);
	document.getElementById("object_quest").addEventListener("click",function(){
		if(GM_getValue(get_server()+"object_quest")==0){
			GM_setValue(get_server()+"object_quest",1);
			
		}
		else{
		GM_setValue(get_server()+"object_quest",0);
		}
		
	},true);
	
	document.getElementById("span_display_stat").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_stat")=="yes"){
		GM_setValue(get_server()+"display_stat","none");
		document.getElementById("tr_display_stat").setAttribute("style","display:none;");
		document.getElementById("span_display_stat").setAttribute("class","button_off");
		document.getElementById("tr_display_stat_title").setAttribute("style","display:none;");
		}else{
			GM_setValue(get_server()+"display_stat","yes");
			document.getElementById("tr_display_stat").setAttribute("style","display:yes;");
			document.getElementById("span_display_stat").setAttribute("class","button");
			document.getElementById("tr_display_stat_title").setAttribute("style","display:yes;");
		}
	},true);
	
	document.getElementById("span_display_cachette").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_cachette")=="yes"){
		GM_setValue(get_server()+"display_cachette","none");
		document.getElementById("tr_display_cachette").setAttribute("style","display:none;");
		document.getElementById("span_display_cachette").setAttribute("class","button_off");
		document.getElementById("tr_display_cachette_title").setAttribute("style","display:none;");
		}else{
			GM_setValue(get_server()+"display_cachette","yes");
			document.getElementById("tr_display_cachette").setAttribute("style","display:yes;");
			document.getElementById("span_display_cachette").setAttribute("class","button");
			document.getElementById("tr_display_cachette_title").setAttribute("style","display:yes;");
		}
	},true);
	
	document.getElementById("span_display_or").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_or")=="yes"){
		GM_setValue(get_server()+"display_or","none");
		document.getElementById("span_display_or").setAttribute("class","button_off");
		document.getElementById("tr_display_or").setAttribute("style","display:none;");
		
		}else{
			GM_setValue(get_server()+"display_or","yes");
			document.getElementById("span_display_or").setAttribute("class","button");
			document.getElementById("tr_display_or").setAttribute("style","display:yes;");
			
		}
	},true);
	
	document.getElementById("span_display_xp").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_xp")=="yes"){
		GM_setValue(get_server()+"display_xp","none");
		document.getElementById("span_display_xp").setAttribute("class","button_off");
		document.getElementById("tr_display_xp").setAttribute("style","display:none;");
		
		}else{
			GM_setValue(get_server()+"display_xp","yes");
			document.getElementById("span_display_xp").setAttribute("class","button");
			document.getElementById("tr_display_xp").setAttribute("style","display:yes;");
			
		}
	},true);
	
	document.getElementById("span_display_vie").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_vie")=="yes"){
		GM_setValue(get_server()+"display_vie","none");
		document.getElementById("span_display_vie").setAttribute("class","button_off");
		document.getElementById("tr_display_vie").setAttribute("style","display:none;");
		
		}else{
			GM_setValue(get_server()+"display_vie","yes");
			document.getElementById("span_display_vie").setAttribute("class","button");
			document.getElementById("tr_display_vie").setAttribute("style","display:yes;");
			
		}
	},true);
	
	document.getElementById("span_display_action").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_action")=="yes"){
		GM_setValue(get_server()+"display_action","none");
		document.getElementById("span_display_action").setAttribute("class","button_off");
		document.getElementById("tr_display_action").setAttribute("style","display:none;");
		
		}else{
			GM_setValue(get_server()+"display_action","yes");
			document.getElementById("span_display_action").setAttribute("class","button");
			document.getElementById("tr_display_action").setAttribute("style","display:yes;");
			
		}
	},true);
	
	document.getElementById("span_display_quest").addEventListener("click",function(){
		if(GM_getValue(get_server()+"display_quest")=="yes"){
		GM_setValue(get_server()+"display_quest","none");
		document.getElementById("span_display_quest").setAttribute("class","button_off");
		document.getElementById("tr_display_quest").setAttribute("style","display:none;");
		
		}else{
			GM_setValue(get_server()+"display_quest","yes");
			document.getElementById("span_display_quest").setAttribute("class","button");
			document.getElementById("tr_display_quest").setAttribute("style","display:yes;");
			
		}
	},true);
	
	document.getElementById("text_auto-click").addEventListener("click",function(){
	if(GM_getValue(get_server()+"active")==0){
	GM_setValue(get_server()+"active",1);
	document.getElementById("td_active").setAttribute("class","button");
	document.getElementById("text_auto-click").innerHTML="Désactiver le script";

	auto_click();
	}else{
	document.getElementById("td_active").setAttribute("class","button_off");
	document.getElementById("text_auto-click").innerHTML="activer le script";
	GM_setValue(get_server()+"active",0);
	// document.location.reload();
	}


	},true);

	document.getElementById("reset_stat").addEventListener("click",function(){
		this_date = new Date();
		GM_setValue(get_server()+"stat_victoire",0);
		GM_setValue(get_server()+"stat_combat",0);
		GM_setValue(get_server()+"stat_or",0);
		GM_setValue(get_server()+"stat_xp",0);
		GM_setValue(get_server()+"stat_honneur",0);
		GM_setValue(get_server()+"stat_gloire",0);
		GM_setValue(get_server()+"gros_pillage",0);
		GM_setValue(get_server()+"nb_quest",0);
		test = Date.parse(this_date).toString();
		GM_setValue(get_server()+"date_stat",test);
		actu_stat()
	
	
	},true);

	document.getElementById("select_secu_stock").addEventListener("change",function(){
	GM_setValue(get_server()+"secu_stock",this.value);
	},true);
	
	document.getElementById("region").addEventListener("change",function(){
	GM_setValue(get_server()+"region",this.value);
	document.location.reload();

	},true);
	
	document.getElementById("stat_to_train").addEventListener("change",function(){
	// alert(GM_getValue(get_server()+"price_stat_"+this.value+""));
	
	that_stat = "price_stat_"+this.value;
	
	// alert(GM_getValue(get_server()+that_stat));
	if(this.value!=""){
	GM_setValue(get_server()+"price_stat_to_train",GM_getValue(get_server()+that_stat));
	
	GM_setValue(get_server()+"stat_to_train",this.value);
	document.getElementById("prix_stat_to_train_aff").innerHTML=this.value +" : "+ GM_getValue(get_server()+"price_stat_to_train");
	document.getElementById("td_training").setAttribute("class","button");
	document.getElementById("td_training_aff").setAttribute("class","button");
	auto_click();
	}
	else{
	GM_setValue(get_server()+"price_stat_to_train",'');
	GM_setValue(get_server()+"stat_to_train",'');
	document.getElementById("prix_stat_to_train_aff").innerHTML="";
	document.getElementById("td_training").setAttribute("class","button_off");
	document.getElementById("td_training_aff").setAttribute("class","button_off");
	auto_click();
	}
	// alert(that_stat);

	},true);


	document.getElementById("valider_hp").addEventListener("click",function(){
		GM_setValue(get_server()+"hp_lvl",document.getElementById("hp_value").value);
		document.location.reload();


	},true);
	
	document.getElementById("valider_limit_gold").addEventListener("click",function(){
		GM_setValue(get_server()+"gold_limit_value",document.getElementById("limit_gold_value").value);
		document.location.reload();


	},true);
	
	document.getElementById("valider_limit_medium").addEventListener("click",function(){
		GM_setValue(get_server()+"gold_limit_medium",document.getElementById("limit_gold_medium").value);
		document.location.reload();


	},true);
	
	document.getElementById("valider_limit_low").addEventListener("click",function(){
		GM_setValue(get_server()+"gold_limit_low",document.getElementById("limit_gold_low").value);
		document.location.reload();


	},true);

	//-------------------------------------------------------------------------------
	document.getElementById("td_auto_quest").addEventListener("click",function(){
		if(!GM_getValue(get_server()+"auto_quest")|| GM_getValue(get_server()+"auto_quest")==0){
			document.getElementById("text_auto-quest").innerHTML="auto-quest activé";
			document.getElementById("td_auto_quest").setAttribute("class","button");
			
			GM_setValue(get_server()+"auto_quest",1);
		}
		else{
			document.getElementById("text_auto-quest").innerHTML="auto-quest désactivé";
			document.getElementById("td_auto_quest").setAttribute("class","button_off");
			
			GM_setValue(get_server()+"auto_quest",0);
		}
		auto_click();
	},true);
	//-------------------------------------------------------------------------------
	
	document.getElementById("affichage_gros").addEventListener("click",function(){
		
		if(GM_getValue(get_server()+"affichage_gros")==1){
			GM_setValue(get_server()+"affichage_gros",0);
			document.getElementById("table_big").setAttribute("style","display:none");
		
		}
		else{
			GM_setValue(get_server()+"affichage_gros",1);
			document.getElementById("table_big").setAttribute("style","");
			
		}
	
	},true);
	
	document.getElementById("auto_dongeon").addEventListener("change",function(){
		if(this.value=="no"){
		document.getElementById("text_auto-dongeon").innerHTML="auto-dongeon désactivé";
		document.getElementById("td_auto_dongeon").setAttribute("class","button_off");
		
			GM_setValue(get_server()+"auto_dongeon",0);
			GM_setValue(get_server()+"dun",this.value);
			
		}
		else{
		document.getElementById("text_auto-dongeon").innerHTML="auto-dongeon activé";
		document.getElementById("td_auto_dongeon").setAttribute("class","button");
		
		GM_setValue(get_server()+"auto_dongeon",1);
		GM_setValue(get_server()+"dun",this.value);
		
		
		}
		auto_click();
	},true);


	document.getElementById("td_auto_hide").addEventListener("click",function(){
		if(!GM_getValue(get_server()+"auto_hide")|| GM_getValue(get_server()+"auto_hide")==0){
			document.getElementById("text_auto-hide").innerHTML="auto-hide activé";
			GM_setValue(get_server()+"vente_en_cours",0);
			document.getElementById("td_auto_hide").setAttribute("class","button");
			if(window.location.href.indexOf("mod=inventory&subsub=2&sub=4&inv=0&doll=1&sh=")!=-1){window.location.reload();}
			GM_setValue(get_server()+"auto_hide",1);
		}
		else{
			document.getElementById("text_auto-hide").innerHTML="auto-hide désactivé";
			document.getElementById("td_auto_hide").setAttribute("class","button_off");
			GM_setValue(get_server()+"vente_en_cours",0);
			GM_setValue(get_server()+"auto_hide",0);
		}
		auto_click();
	},true);
	
	
	document.getElementById("td_auto_pro").addEventListener("click",function(){
		if(!GM_getValue(get_server()+"auto_pro")|| GM_getValue(get_server()+"auto_pro")==0){
			document.getElementById("text_auto-pro").innerHTML="auto-provinciarum activé";
			document.getElementById("td_auto_pro").setAttribute("class","button");
			GM_setValue(get_server()+"gladiatus_pro_on_off","on");
			GM_setValue(get_server()+"auto_pro",1);
		}
		else{
			document.getElementById("text_auto-pro").innerHTML="auto-provinciarum désactivé";
			document.getElementById("td_auto_pro").setAttribute("class","button_off");
			GM_setValue(get_server()+"gladiatus_pro_on_off","off");
			GM_setValue(get_server()+"auto_pro",0);
		}
		auto_click();
	},true);

	document.getElementById("td_auto_arene").addEventListener("click",function(){
		if(!GM_getValue(get_server()+"auto_arene")|| GM_getValue(get_server()+"auto_arene")==0){
			document.getElementById("text_auto-arene").innerHTML="auto-arène activé";
			document.getElementById("td_auto_arene").setAttribute("class","button");
			GM_setValue(get_server()+"auto_arene",1);
			
		}
		else{
			document.getElementById("text_auto-arene").innerHTML="auto-arène désactivé";
			document.getElementById("td_auto_arene").setAttribute("class","button_off");
			GM_setValue(get_server()+"auto_arene",0);
			
		}
		auto_click();
	},true);


	document.getElementById("td_auto_heal").addEventListener("click",function(){
		if(!GM_getValue(get_server()+"auto_heal")|| GM_getValue(get_server()+"auto_heal")==0){
			document.getElementById("text_auto-heal").innerHTML="auto-heal activé";
			document.getElementById("td_auto_heal").setAttribute("class","button");
			GM_setValue(get_server()+"gladiatus_healer_onoff","on");
			GM_setValue(get_server()+"auto_heal",1);
		}
		else{
			document.getElementById("text_auto-heal").innerHTML="auto-heal désactivé";
			document.getElementById("td_auto_heal").setAttribute("class","button_off");
			GM_setValue(get_server()+"gladiatus_healer_onoff","off");
			GM_setValue(get_server()+"auto_heal",0);
		}
		auto_click();
	},true);


	document.getElementById("auto_mob").addEventListener("change",function(){
		if(this.value=="no"){
		document.getElementById("text_auto-pex").innerHTML="auto-pex désactivé";
		document.getElementById("td_auto_pex").setAttribute("class","button_off");
			GM_setValue(get_server()+"auto_pex",0);
			GM_setValue(get_server()+"mob",this.value);
		}
		else{
		document.getElementById("text_auto-pex").innerHTML="auto-pex activé";
		document.getElementById("td_auto_pex").setAttribute("class","button");
		GM_setValue(get_server()+"auto_pex",1);
		GM_setValue(get_server()+"mob",this.value);
		}
		auto_click();
	},true);
	//}

//##########################################################################
	
function auto_click(){

	if(GM_getValue(get_server()+"stat_a_jour")==0){
	go_to("train");
	get_stat_value();
	update_stat_value();
	GM_setValue(get_server()+"stat_a_jour",1);
	
	}
	//recup du temps avant premiere action
	reload = get_time_to_reload();
	//si l'inventaire est visible (peu importe la page en cours) on récupère la valeur de l'inventaire(or de la cachette)
	if($('#inv').length){
			if(document.getElementById("inventory_nav").getElementsByTagName("img")[0].getAttribute("src").indexOf("tab_1_aktive.gif")!=-1){
		check_inv();
		// alert(res["low"][0]);
		// alert(res["medium"].length);
		}
		}
	
	//affichage simple d'une image pour le tableau de droite
	document.getElementById("img_action_en_cours").innerHTML="<img style=width:50px;height:50px; src="+GM_getValue(get_server()+"img_action_encours")+">";
	
	// en premier si entrainement impossible ou que auto-train est désactivé ou que le temps de restockage est trop court : cours normal
	if(train_possible()==0 | GM_getValue(get_server()+'stat_to_train')=="" | get_time_before_stock(GM_getValue(get_server()+"next_stock"))< GM_getValue(get_server()+"secu_stock")*3600){
		//si il n'y a pas de vente en cours pour auto_hide lancement auto_click en mode normal
		if(GM_getValue(get_server()+"vente_en_cours")==0){
		
		
		//recup des stats
		get_stats();
		
		this_date = new Date();
		//si le script est actif :
			if(GM_getValue(get_server()+"active")==1){
				
				
				// alert(get_time_before_quest());
				// alert(get_time_to_reload());
				
				//verif du niveau de vie
				if(parseInt(get_life()) < parseInt(GM_getValue(get_server()+"hp_lvl")) && GM_getValue(get_server()+"auto_heal")==1){
						go_to("overview2");
						auto_heal();
					}		
				
				//lancement auto_quest
				if((GM_getValue(get_server()+"auto_quest")==1 &&  get_time_before_quest()<1000) | GM_getValue(get_server()+"auto_quest_to_do")==1){
				
					go_to("quest");
					auto_quest();
				}
				
				//lancement expedition
				else if(get_time_before_pex()==0 && GM_getValue(get_server()+"auto_pex")==1){
				
					attack_X();
					
				}
				//lancement donjons
				else if(get_time_before_dungeon() == 0 && GM_getValue(get_server()+"auto_dongeon")==1){
				load_dongeon_X();
					
				}
				//lancement arene
				else if(get_time_before_arena() == 0 && GM_getValue(get_server()+"auto_arene")==1){
				
					go_to("arene");
					setTimeout(function(){auto_arena();}, 3000 );
					
				}
				//lancement provinciarum
				else if(get_time_before_pro() == 0 && GM_getValue(get_server()+"auto_pro")==1){
				
					go_to("provinciarum");
					setTimeout(function(){auto_pro();}, 3000 );
				}
				//lancement auto hide
				else if(GM_getValue(get_server()+"auto_hide")==1 && (parseInt(document.getElementById("sstat_gold_val").innerHTML.replace(".",""),10)>GM_getValue(get_server()+"gold_limit_value"))){
				
				go_to("hide");
				
				// setTimeout(function(){auto_hide(reload);}, 3000 );
				
				}
				//et enfin si aucune action requise attente du reload pour relancer auto_click
				else{
				reload = get_time_to_reload();
				setTimeout(function(){auto_click();}, reload );
			
				}
			
			
		}
		
		}else{
		auto_hide(reload);
		}
		}
		//si entrainement possible et que auto-train est activé et que l'on est pas dans la période de sécurité lancement auto_train
		else{
		// alert((parseInt(document.getElementById("sstat_gold_val").innerHTML)));
			auto_train();
		}
	
}
	
	
	
	
	
	if(GM_getValue(get_server()+"active")==1){auto_click();}
	
	
	
	},true);

	}


	function test(text){
		
		init = text.split("n")[0];
		temp = init.split("b")[1];
		
		if(text.charAt(4)==window.location.href.charAt(13) && text.charAt(1)==window.location.href.charAt(13) && text.length==6){
		GM_setValue(get_server()+"chargement","en_cours");
		// alert("test");
		}
		else{
		// alert("test");
		GM_setValue(get_server()+"chargement","terminé");
		}
		// alert(text.length);
	}
	
	
	
test(GM_getValue(get_server()+"my_name"));
	