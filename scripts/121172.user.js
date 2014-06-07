// ==UserScript==
// @name           Travian4 - Search for Farm and Farm Stats
// @namespace      travian4_farm_stats
// @include        http://*.travian.*/*
// @version        0.0.2
// ==/UserScript==
// [VERSION]2[/VERSION]
/* [DETAILS]Fixed Auto-Updater problem! :P[/DETAILS] */
var _script_version=2;
var _script_url='http://userscripts.org/scripts/source/104817.user.js';
var country=window.location.host.toLowerCase().split("travian.")[1];
var $;
var L=new Array();
var Stats={};

L['get_farm_stats']='Get Farm Stats';
L['farm_stats']='Farm Stats:';
L['ally']='Alliance';
L['ally_ranks']='Alliance Ranks';
L['alone_penality']='Alone Penality';
L['new_version']='New Version Avaible!';
L['download']='Download!';
L['overall']='Overall:';
L['farming_possibilities']='There is the %s% of possibilities to farm this player.';
L['player_ranks']='Player Ranks';
L['player_population_rank']='Player Population Rank';
L['player_defender_rank']='Player Defender Rank';
L['player_attacker_rank']='Player Attacker Rank';
L['player_no_ally']='This player have no Ally.';
L['ally_population_rank']='Ally Population Rank';
L['ally_defender_rank']='Ally Defender Rank';
L['ally_attacker_rank']='Ally Attacker Rank';
L['loading_stats']='Loading... %s%';

switch(country){
	default:
	break;
	case 'it':
The ['get_farm_stats'] = 'Statistics Farm';
The ['farm_stats'] = 'Statistics Farm:';
The ['ally'] = 'Alliance';
The ['ally_ranks'] =' Rank of \ 'Alliance';
The ['player_ranks'] = 'Rank Player';
The ['alone_penality'] = 'Penalty Solitude';
The ['new_version'] = 'New version available!';
L ['download'] = 'Download!';
The ['overall'] = 'Summary:';
The ['farming_possibilities'] =' C \ '% s is% chance to make me the player.';
The ['player_population_rank'] = 'Population Rank Player';
The ['player_defender_rank'] = 'Defender Rank Player';
The ['player_attacker_rank'] = 'Rank Player Forward';
The ['player_no_ally'] = 'This player does not have an alliance';
The ['ally_population_rank'] = 'Population Rank \' s Alliance ';
The ['ally_defender_rank'] = 'Rank Defenders \' s Alliance ';
The ['ally_attacker_rank'] = 'Rank Forwards \' s Alliance ';
The ['loading_stats'] =' Loading ... % s% ';
	break;
}

Stats={
	ally_id:false,
	ally_name:false,
	player_id:false,
	player_name:false,
	player_population_rank:1,
	player_defender_rank:1,
	player_attacker_rank:1,
	ally_population_rank:1,
	ally_defender_rank:1,
	ally_attacker_rank:1,
	server_players:1,
	stats_status:0,
	stats_total:5,
	delayNextRetrive:function(){
		if(Stats.stats_status<Stats.stats_total){
			Stats.stats_status++;
			setTimeout(function(){Stats.retriveStats();},100);
		}
	},
	nextRetrive:function(){
		if(Stats.stats_status<Stats.stats_total){
			Stats.stats_status++;
			Stats.retriveStats();
		}
	},
	retriveStats:function(){
		var c=Stats.stats_status/Stats.stats_total*100;
		$('.farm_stats').html('<i>'+L['loading_stats'].replace('%s',Math.floor(c))+'</i>');
		switch(this.stats_status){
			case 0:
				$.post("http://"+window.location.host+"/statistiken.php?id=1",{'name':Stats.player_name,'rank':'',submit:'OK'},function(response){
					Stats.player_population_rank=parseInt($(response.split('class="hl"')[1].split('</tr>')[0]).html(),10);
					try{
						Stats.server_players=parseInt(response.split('class="paginator"')[1].split('</div>')[0].split('" class="last"')[0].split('class="next"')[1].split('href="')[1].split('page=')[1],10)*20;
						if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
					}catch(err){
						$.get("http://"+window.location.host+"/statistiken.php?id=1&page=1",function(response){
							Stats.server_players=parseInt(response.split('class="paginator"')[1].split('</div>')[0].split('" class="last"')[0].split('class="next"')[1].split('href="')[1].split('page=')[1],10)*20;
							if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
						});
					}
				},"html");
			break;
			case 1:
				$.post("http://"+window.location.host+"/statistiken.php?id=32",{'name':Stats.player_name,'rank':'',submit:'OK'},function(response){
					Stats.player_defender_rank=parseInt($(response.split('class="hl"')[1].split('</tr>')[0]).html(),10);
					if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
				},"html");
			break;
			case 2:
				$.post("http://"+window.location.host+"/statistiken.php?id=31",{'name':Stats.player_name,'rank':'',submit:'OK'},function(response){
					Stats.player_attacker_rank=parseInt($(response.split('class="hl"')[1].split('</tr>')[0]).html(),10);
					if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
				},"html");
			break;
			case 3:
				if(Stats.ally_id != false){
					$.post("http://"+window.location.host+"/statistiken.php?id=4",{'name':Stats.ally_name,'rank':'',submit:'OK'},function(response){
						Stats.ally_population_rank=parseInt($(response.split('class="hl"')[1].split('</tr>')[0]).html(),10);
						try{
							Stats.server_allys=parseInt(response.split('class="paginator"')[1].split('</div>')[0].split('" class="last"')[0].split('class="next"')[1].split('href="')[1].split('page=')[1],10)*20;
							if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
						}catch(err){
							$.get("http://"+window.location.host+"/statistiken.php?id=4&page=1",function(response){
								Stats.server_allys=parseInt(response.split('class="paginator"')[1].split('</div>')[0].split('" class="last"')[0].split('class="next"')[1].split('href="')[1].split('page=')[1],10)*20;
								if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
							});	
						}
					},"html");
				}else{
					if(Stats.stats_status<Stats.stats_total){Stats.nextRetrive();}
				}
			break;
			case 4:
				if(Stats.ally_id != false){
					$.post("http://"+window.location.host+"/statistiken.php?id=42",{'name':Stats.ally_name,'rank':'',submit:'OK'},function(response){
						Stats.ally_defender_rank=parseInt($(response.split('class="hl"')[1].split('</tr>')[0]).html(),10);
						if(Stats.stats_status<Stats.stats_total){Stats.delayNextRetrive();}
					},"html");
				}else{
					if(Stats.stats_status<Stats.stats_total){Stats.nextRetrive();}
				}
			break;
			case 5:
				if(Stats.ally_id != false){
					$.post("http://"+window.location.host+"/statistiken.php?id=41",{'name':Stats.ally_name,'rank':'',submit:'OK'},function(response){
						Stats.ally_attacker_rank=parseInt($(response.split('class="hl"')[1].split('</tr>')[0]).html(),10);
						Stats.render();
					},"html");
				}else{
					Stats.render();
				}
			break;
		}
	},
	getStats:function(){
		Stats.stats_status=0;
		Stats.retriveStats();
	},
	render: function(){
		var ranks=new Array();
		ranks['player_population']=Math.floor(Stats.player_population_rank / Stats.server_players * 100);
		ranks['player_defender']=Math.floor(Stats.player_defender_rank / Stats.server_players * 100);
		ranks['player_attacker']=Math.floor(Stats.player_attacker_rank / Stats.server_players * 100);
		if(Stats.ally_id != false){
			ranks['ally_population']=Math.floor(Stats.ally_population_rank / Stats.server_allys * 100);
			ranks['ally_defender']=Math.floor(Stats.ally_defender_rank / Stats.server_allys * 100);
			ranks['ally_attacker']=Math.floor(Stats.ally_attacker_rank / Stats.server_allys * 100);
		}else{
			ranks['alone_penality']=200;
		}
		var html='<table class="transparent" cellspacing="1" cellpadding="1"><tbody>';
		html+='<tr><th colspan="2"><b>'+L['player_ranks']+'</b></th></tr>';
		html+='<tr><th><img class="r4" title="'+L['player_population_rank']+'" alt="" src="img/x.gif"></th><td>'+Stats.player_population_rank+' ('+ranks['player_population']+'%)</td></tr>';
		html+='<tr><th><img class="iReport iReport4" title="'+L['player_defender_rank']+'" alt="" src="img/x.gif"></th><td>'+Stats.player_defender_rank+' ('+ranks['player_defender']+'%)</td></tr>';
		html+='<tr><th><img class="iReport iReport3" title="'+L['player_attacker_rank']+'" alt="" src="img/x.gif"></th><td>'+Stats.player_attacker_rank+' ('+ranks['player_attacker']+'%)</td></tr>';
		html+='<tr><th colspan="2"><b>'+L['ally_ranks']+'</b></th></tr>';
		if(Stats.ally_id != false){
			html+='<tr><th><img class="r4" title="'+L['ally_population_rank']+'" alt="" src="img/x.gif"></th><td>'+Stats.ally_population_rank+' ('+ranks['ally_population']+'%)</td></tr>';
			html+='<tr><th><img class="iReport iReport4" title="'+L['ally_defender_rank']+'" alt="" src="img/x.gif"></th><td>'+Stats.ally_defender_rank+' ('+ranks['ally_defender']+'%)</td></tr>';
			html+='<tr><th><img class="iReport iReport3" title="'+L['ally_attacker_rank']+'" alt="" src="img/x.gif"></th><td>'+Stats.ally_attacker_rank+' ('+ranks['ally_attacker']+'%)</td></tr>';
		}else{
			html+='<tr><th colspan="2"><i>'+L['player_no_ally']+'</i></th></tr>';
			html+='<tr><th><b>!</b></th><td>'+L['alone_penality']+' ('+ranks['alone_penality']+'%)</td></tr>';
		}
		var ranks_n=0;
		for(var i in ranks){
			ranks_n++;
		}
		var overall=0;
		for(var i in ranks){
			overall+=ranks[i];
		}
		var op=Math.floor(overall/ranks_n);
		html+='<tr><th colspan="2"><b>'+L['overall']+'</b></th></tr>';
		html+='<tr><th colspan="2"><i>'+L['farming_possibilities'].replace('%s',op)+'</i></th></tr>';
		html+='</tbody></table>';
		$('.farm_stats').html(html);
	},
	getLastVersion: function(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: _script_url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload:function(req){
				var v=req.responseText.split('[VERSION]')[1];
				v=v.split('[/VERSION]')[0];
				if(parseInt(v)>_script_version){
					var det=req.responseText.split('[DETAILS]')[1];
					det=det.split('[/DETAILS]')[0];
					$("#map_details").append('<p style="font-weight:bold;color:#FF0000;">'+L['new_version']+' <a href="'+_script_url+'">'+L['download']+'</a></p><p style="font-weight:bold;color:#FF0000;">'+det+'</p>');
				}
			}
		});
	}
};

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		main();
	}
}

// All your GM code must be inside this function
function main() {
	if($("#content").hasClass("positionDetails")){
		
		$("#village_info a").each(function(){
			if($(this).attr('href').match(/aid=/ig)){
				Stats.ally_id=$(this).attr('href').split('=')[1];
				Stats.ally_name=$(this).html();
			}
			if($(this).attr('href').match(/uid=/ig)){
				Stats.player_id=$(this).attr('href').split('=')[1];
				Stats.player_name=$(this).html();
			}
		});

		if(Stats.player_id != false){
			$('<div class="option"><a class="a arrow">'+L['get_farm_stats']+'</a></div>').appendTo("#tileDetails .options").click(Stats.getStats);
		}
		$('<div class="get_farms_stats"><div class="farm_stats"></div></div>').appendTo('#map_details');
		Stats.getLastVersion();
	}
}