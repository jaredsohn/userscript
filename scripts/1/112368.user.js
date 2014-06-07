// ==UserScript==
// @name 		Fetcher
// @description Помогает безопасно снять вещи с рынка
// @author 		Macabre2077
// @version 	0.3.2
// @include 	http://*.the-west.*/game.php*
// ==/UserScript==

function init(){
	var start_div = document.createElement('div');	
	start_div.innerHTML = '<div class="main_footnote" onclick="Fetcher.fetch_all()" style="cursor:pointer"><div class="main_footnote_left"></div><div class="main_footnote_right"></div><div style="-moz-user-select: none;">&nbsp;Забрать деньги&nbsp;</div></div>';
	start_div.innerHTML += '<div class="main_footnote" onclick="Fetcher.fetchAll()" style="cursor:pointer"><div class="main_footnote_left"></div><div class="main_footnote_right"></div><div style="-moz-user-select: none;">&nbsp;Забрать товары&nbsp;</div></div>';
	document.getElementById('main_footnotes').appendChild(start_div);
}

function fetch_all(  ){
	var page = prompt("Введи номер страницы",1);
	if(page == "" || page == undefined) return;
	Fetcher.pages = prompt("Сколько страниц",10);
	if(Fetcher.pages == "" || Fetcher.pages == undefined) return;
	if(Fetcher.find_page == 0) return;
	Fetcher.find_page = page-1;
	Fetcher.find_in_progress = true;
	Fetcher.buy_in_progress = false;
	Fetcher.page = 1;
	window.inter_finding = setInterval(function(){
		new Ajax('game.php?window=building_market&mode=fetch_offers',{method:'post',data:{page:(Fetcher.find_page)},onComplete:function(data){
			data=Json.evaluate(data);
			var length_ = data.msg.search_result.length;
			
			if(data.error){new HumanMessage(data.msg); Fetcher.stop_finding(); return;}
			else if(length_ == 0){new HumanMessage("Не найдено товаров!"); Fetcher.stop_finding(); return;} else {
				for(i=0;i<length_;i++){
					if(data.msg.search_result[i].market_town_x == Tasks.cur_work_pos.x && data.msg.search_result[i].market_town_y == Tasks.cur_work_pos.y){
						Fetcher.market_offers.push(data.msg.search_result[i].market_offer_id);
					}
				}
				new HumanMessage("Страница "+Fetcher.page+" из "+Fetcher.pages,{type:"success"});
			}			
			Fetcher.find_page++;
			Fetcher.page++;
			if(Fetcher.page > Fetcher.pages) { Fetcher.stop_finding(); return;}

		}}).request();
	},2000);
	window.inter_buying = setInterval(function(){
		if(Fetcher.find_in_progress == false){
			var buy_l = Fetcher.market_offers.length;
			for(var i in Fetcher.market_offers){
				if(i>0){
					while(Fetcher.buy_in_progress === true){ /* waiting */ }
					setTimeout(function(){
						if(Fetcher.market_offers[0] != undefined){
							new Ajax('game.php?window=building_market&action=fetch&h='+h,{method:'post',data:{market_offer_id:Fetcher.market_offers[0]},onComplete:function(data){}}).request();
							Fetcher.market_offers.shift();
						//	new HumanMessage("Товар "+(i+1)+" из "+buy_l+" забран",{type:"success"});
						} else { Fetcher.stop_buying(); }
					},1250*i);
				}
			}
			Fetcher.stop_buying();
		}
	},2000);
}

function stop( ){
	clearInterval(window.inter);
}

function stop_finding( ){
	clearInterval(window.inter_finding);
	Fetcher.find_in_progress = false;
}

function stop_buying( ){
	clearInterval(window.inter_buying);
	Fetcher.buy_in_progress = false;
}

function fetchAll(){
	var id = prompt("Введи ID города");
	if(id == "" || id == undefined) return;
	Market.getInstance(id).fetchAll();
}

function fetch_all_items( ){
	var page = prompt("Введи номер страницы нумерация с 0");
	if(page == "" || page == undefined) return;
	window.inter = setInterval(function(){
		new Ajax('game.php?window=building_market&mode=fetch_bids',{method:'post',data:{page:page},onComplete:function(data){
			data=Json.evaluate(data);
			var length = data.msg.search_result.length;
			
			if(data.error){new HumanMessage(data.msg);Fetcher.stop();return;}
			else if(length == 0){new HumanMessage("Не найдено товаров!");clearInterval(window.inter);return;} else {
				for(i = 0;i < length;i++){
					Ajax.remoteCall("building_market","fetch",{market_offer_id:data.msg.search_result[i].market_offer_id}); 
				}
			}
		}}).request(); 
	},15000);
}

var Fetcher_script = document.createElement('script');
Fetcher_script.type='text/javascript';
Fetcher_script.text =  'if(window.Fetcher == undefined){\n';
Fetcher_script.text += '  window.Fetcher = new Object();\n';
Fetcher_script.text += '  Fetcher.market_offers = Array();\n';
Fetcher_script.text += '  Fetcher.fetch_all = ' + fetch_all.toString() + '\n';
Fetcher_script.text += '  Fetcher.fetch_all_items = ' + fetch_all_items.toString() + '\n';
Fetcher_script.text += '  Fetcher.fetchAll = ' + fetchAll.toString() + '\n';
Fetcher_script.text += '  Fetcher.init = ' + init.toString() + '\n';
Fetcher_script.text += '  Fetcher.stop = ' + stop.toString() + '\n';
Fetcher_script.text += '  Fetcher.stop_finding = ' + stop_finding.toString() + '\n';
Fetcher_script.text += '  Fetcher.stop_buying = ' + stop_buying.toString() + '\n';
Fetcher_script.text += '  Fetcher.init();\n';
Fetcher_script.text += '}';
document.body.appendChild(Fetcher_script);