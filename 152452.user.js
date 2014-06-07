// ==UserScript==
// @name       TM_Player_List_showAsi&Routine
// @author     XpQ
// @include    http://trophymanager.com/players/
// @include    http://trophymanager.com/players/*/true*
// ==/UserScript==
//##################################################### Style List #####################################################

alert("Suck my banana!");
alert("ouch...!!!..Oh!!..ohhhohh");
alert("Yeah baby, you so skillful");

var styleList = document.createElement("style");
styleList.type="text/css";
styleList.innerHTML = (<><![CDATA[
    .column1_d {width: 1050px;}
    div.main_center {width: 1050px;}
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(styleList);
//##################################################### Script List #####################################################
var script = document.createElement('script'); 
script.type = "text/javascript";
script.innerHTML = (<><![CDATA[

function construct_tr(ply_ar, count, mode) {
	var myRow = myTable.insertRow(-1);
	var training_count=0;
	headers_ar["routine"] = {"header":"經","title":"經驗值","style":"border","width":"30px"};
	function construct_cell(assoc) {
		var myCell = myRow.insertCell(-1);
		if (assoc != undefined) {
			var assocs_to_star = ["str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","han","one","ref","ari","jum","com","kic","thr"];
			if (headers_ar[assoc]["style"]) {
				myCell.className = headers_ar[assoc]["style"];
			}
			if (assoc == "name") {
				var tmp = "<div class='name'>";
				tmp += " "+get_player_link({"player":{"id":ply_ar["id"],"name":ply_ar["name"]},"auto_tooltip":true,"class":"normal"});
				if(ply_ar["status"]) tmp += " "+ply_ar["status"];
				if (ply_ar["retire"] == true) {
					tmp += "<img src='/pics/icons/retire.gif' title='This player is retiring after this season' />";
				}
				if (ply_ar["banned_club"])
				{
					tmp += " <img src='/pics/icons/lg_ina.gif' title='Club Banned' />";
				}
				if(ply_ar["country"] != SESSION["country"] && this_page != "shortlist" && this_page != "nt_shortlist")
				{
					tmp += " "+get_flag(ply_ar["country"]);
				}
				if(ply_ar["reserve_team"]){
					tmp += ' <span class="b_team_icon">B</span>';
				}
				tmp +="</div>";
				myCell.innerHTML = tmp;
				$(myCell).addClass("text_fade");
				if (ply_ar['txt'] != "") {
					var tmp = $(" <img src='/pics/icons/transfer_speechbubble.gif' style='cursor:pointer;margin-bottom: 2px;' onclick='player_note("+ply_ar['id']+")'/>").tooltip(global_content[450]+"<br />"+ply_ar['txt']);
				} else {
					var tmp = " <img src='/pics/icons/transfer_speechbubble_empty.gif' style='cursor:pointer;margin-bottom: 2px;' onclick='player_note("+ply_ar['id']+")'/>";
				}
				$(myCell).find(".name").prepend(tmp);
			} else if (assoc == "country") {
				$(myCell).html(get_flag(ply_ar["nat"]));
			} else if (assoc == "fp") {
				myCell.innerHTML = "<div class='position'>"+retColorPos(ply_ar["fp"])+"</div>";
			}  else if (assoc == "scout") {
				var url = get_player_link({"player":{"id":ply_ar["id"],"name":ply_ar["name"]},"only_url":true});
				$(myCell).html(make_button("<img src='/pics/binoc.png' />", "href:"+url+"#scout","small_button"));
			} else if (assoc == "rec") {
				$(myCell).addClass("align_center").html("<div class='rec'>"+rec_format(ply_ar["rec"])+"</div>");
			} else if (assocs_to_star.indexOf(assoc) >= 0) {
				if (ply_ar[assoc] == 20) {
					myCell.innerHTML = "<img src='/pics/star.png' />";
				} else if (ply_ar[assoc] == 19) {
					myCell.innerHTML = "<img src='/pics/star_silver.png' />";
				} else if (ply_ar[assoc] == 0 && !show_training) {
					myCell.style.color = "#AAAAAA";
					myCell.innerHTML = "-";
				} else if (ply_ar[assoc] < 6 && !show_training) {
					myCell.style.color = "#AAAAAA";
					myCell.innerHTML = ply_ar[assoc];
				} else {
					myCell.innerHTML = ply_ar[assoc];
				}
				$(myCell).html("<div class='skill'>"+$(myCell).html()+"</div>").addClass("skill");
				if(show_training)
				{
					var $skill = $(myCell).find(".skill").addClass("training subtle");
					if(arrows[ply_ar.id])
					{
						var t = arrows[ply_ar.id].raise[training_count];
						if(t == 2) $skill.addClass("one_up").removeClass("subtle");
						else if(t == 1) $skill.addClass("part_up").removeClass("subtle");
						else if(t == -1) $skill.addClass("part_down").removeClass("subtle");
						else if(t == -2) $skill.addClass("one_down").removeClass("subtle");
						training_count++;
					}
				}
			} else if (assoc == "asi" || assoc == "routine") {
				myCell.innerHTML = "<div class='wage'>"+addCommas(ply_ar[assoc])+"</div>";
			} else if (assoc == "rat") {
				myCell.innerHTML = ply_ar[assoc].toFixed(2);
			} else if (assoc == "no") {
				$(myCell).addClass("minishirt small").html("<span class='faux_link normal' onclick='pop_player_number("+ply_ar["id"]+","+ply_ar["no"]+",\'"+ply_ar["js_name"]+"\',"+(ply_ar["reserve_team"]?1:0)+")'>"+ply_ar[assoc]+"</span>");
			} else if (assoc == "timeleft"){
				ply_ar["timeleft_string"] = ply_ar["timeleft_string"] || "";
				$(myCell).html("<div class='time_left'>"+ply_ar["timeleft_string"].replace("d",global_content["days_abbr"]).replace("h",global_content["hours_abbr"]).replace("m",global_content["minutes_abbr"])+"</div>").attr("sort",ply_ar["timeleft"]);
			}  else if (assoc == "delete"){
				$(myCell).html(make_button("<img src='/pics/icons/recyclebin.gif' style='position:relative;top: 2px;'>","remove_short_list_player("+ply_ar["id"]+",remove_player_from_list)","small_button"));
			} else if (assoc == "bid"){
				if(ply_ar["bid"] == 0)
				{
					$(myCell).html(make_button("<img src='/pics/auction_hammer_small.png' style='position:relative;top: 2px;'>","pop_transfer_bid('"+number_format(ply_ar["next_bid"])+"',"+isPro+",'"+ply_ar["id"]+"','"+ply_ar["name_js"]+"')","small_button"));
				}
				else if(ply_ar["bid"] == 1)
				{ // green
					$(myCell).html('<img src="/pics/icons/button_green.gif">');
				}
				else if(ply_ar["bid"] == 2)
				{ // yellow
					$(myCell).html('<img src="/pics/icons/button_yellow.gif">');
				}
				else if(ply_ar["bid"] == 3)
				{ // red
					$(myCell).html('<img src="/pics/small_red_x.png">');
				}
			}
			else if(assoc== "bteam"){
				if(SESSION["b_team"] > 0)
				{
					if(ply_ar["reserve_team"])
					{
						$(myCell).html(make_button("<img src='/pics/icons/squad_up.png' style='position: relative; top: -2px;' tooltip='"+pagecontent[114]+"'/>","promote_player("+ply_ar["id"]+")","small_button"));
					}
					else
					{
						$(myCell).html(make_button("<img src='/pics/icons/squad_down.png' style='position: relative; top: -2px;' tooltip='"+pagecontent[115]+"'/>","demote_player("+ply_ar["id"]+")","small_button"));
					}
				}
			}
			else if(assoc=="ti")
			{
				if(arrows[ply_ar.id])
				{
					$(myCell).html(arrows[ply_ar.id].ti);
				}
				else $(myCell).html("-");
			}
			else if(assoc=="ti_dif")
			{
				if(arrows[ply_ar.id])
				{
					$(myCell).html(arrows[ply_ar.id].ti_shift);
				}
				else $(myCell).html("-");
			} 
			else if(assoc=="age")
			{
				if(true) myCell.innerHTML = ply_ar[assoc];
				else myCell.innerHTML = ply_ar[assoc].split(".")[0];
			}
		} else {
			myCell.innerHTML = "-";
		}
	}
	for (var i=0; i<ths.length; i++) {
		if (mode) {
			construct_cell(gk_ths[i]);
		} else {
			construct_cell(ths[i]);
		}
	}
} 
function makeTable() {
	if(this_page == "shortlist")
	{
		if (location.hash == "#skill" && isPro) {
			ths = ["name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","rec"];
			gk_ths = ["name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"rec"];
			$("filter_10").src = "pics/sort_btn_selected.gif";
		} else {
			if(players_settings["show_asi"])
			{
				ths = ["name","age","country","fp","rec","routine","routine","timeleft","curbid","bid","scout","delete"];
				gk_ths = ["name","age","country","fp","rec","routine","routine","timeleft","curbid","bid","scout","delete"];
			}
			else
			{
				ths = ["name","age","country","fp","rec","routine","timeleft","curbid","bid","scout","delete"];
				gk_ths = ["name","age","country","fp","rec","routine","timeleft","curbid","bid","scout","delete"];
			}
		}
	}
	else if(this_page == "players" || this_page == "nt_players")
	{
		if(this_page=="players" && show_training)
		{
			ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","ti","ti_dif"];
			gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"ti","ti_dif"];
		}
		else
		{
			ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","asi","rec","routine","bteam"];
			gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"asi","rec","routine","bteam"];
		}
	}
	else if(this_page == "nt_shortlist")
	{
		ths = ["name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","rec"];
		gk_ths = ["name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"rec"];
	}
	myTable = document.createElement('table');
	myTable.className = "hover zebra";
	construct_th();
	var z=0;
	var player_count = 0;
	for (i=0; i<players_ar.length; i++) {
		if (players_ar[i]["fp"] != "GK" && add_me(players_ar[i]) && filter_squads()) {
			construct_tr(players_ar[i], z);
			z++;
			player_count++;
		}
	}
	if (z == 0) {
		var myRow = myTable.insertRow(-1);
		var myCell = myRow.insertCell(-1);
		myCell.colSpan = 24;
//		myCell.innerHTML = other_header;
		$(myCell).addClass("bold").css("padding","10px");
	}
	if (filters_ar[1] == 1) {
		var myRow = myTable.insertRow(-1);
		var myCell = myRow.insertCell(-1);
		myCell.className = "splitter";
		myCell.colSpan = "50";
		myCell.innerHTML = gk_header;
		construct_th(true);
		z=0;
		for (i=0; i<players_ar.length; i++) {
			if (players_ar[i]["fp"] == "GK" && filter_squads()) {
				if (!(players_ar[i]["age"] < age_min || players_ar[i]["age"] > age_max)) {
					construct_tr(players_ar[i], z, true);
					z++;
					player_count++;
				}
			}
		}
	}
	var $player_count = $("#player_count");
	if($player_count.length ==0) $player_count = $("<span/>").attr("id","player_count").addClass("float_right").prependTo("#filters");
	$player_count.text(pc_replace(pagecontent[116],{"[number]":player_count}));
	$e("sq").innerHTML = "";
	$e("sq").appendChild(myTable);
	activate_player_links($(myTable).find("[player_link]"));
	init_tooltip_by_elems($(myTable).find("[tooltip]"))
	zebra();
}
]]></>).toString();                    
document.getElementsByTagName('head')[0].appendChild(script);