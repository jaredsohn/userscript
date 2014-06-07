// ==UserScript==
// @name           Find ore deals
// @namespace      http://xenyl.com/ssw
// @description    gets the best ore deals from the sector map. You must have an upgraded sector map (degree 10) for this to work.
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map*
// @include        http://secretsocietywars.com/index.php?p=space&a=sector_map*
// ==/UserScript==

var pageSource = document.body.innerHTML;
var match;
var lines = pageSource.split("\n");
var result = document.createElement('div');
var high = [];
var low = [];
var high2 = [];
var low2 = [];
var asteroids = [];
var matches = 0;
var linecount = lines.length;
var next_i;

for(i=0; i<linecount; i++){
	//next_i=0;
	if(i < 340 ) {
		continue;
	}
	//if(i >= 6000) break;
	if(match = lines[i].match(/Trader.*?Trading Port #([0-9]+)<.*?<b>Buying:<\/b>(.*?)<br><b>Selling:<\/b>(.*?)</)){
		//alert(match[0]);
		port = match[1];
		buying = match[2].split(', ');
		selling = match[3].split(', ');
		//if(parseInt(port) < 100) continue;
		//alert('scanning buying... ' +buying);
		for(j=0;j<buying.length;j++){
			if(buyinfo = buying[j].match(/^ *([^ ]*) Ore \((.*?) SB\)/)){
				ore = buyinfo[1];
				buy_price = parseInt(buyinfo[2]);
				if(!high[ore]){ 
					high[ore] = [port, buy_price];
				} else if (high[ore][1] < buy_price){
					high2[ore] = high[ore];
					high[ore] = [port, buy_price];
				} else if (high[ore][1] == buy_price) {
					high[ore][0] = high[ore][0] + ',' + port;
				} else if (high2[ore]){
					if(high2[ore][1] < buy_price) {
						high2[ore] = [port, buy_price];
					} else if (high2[ore] == buy_price){
						high2[ore][0] = high2[ore][0] + ',' + port;
					}
				}
			}
		}
		//alert('scanning selling ...' +selling);
		for(j=0;j<selling.length;j++){
			if(sellinfo = selling[j].match(/^ *([^ ]*) Ore \((.*?) SB\)/)){
				ore = sellinfo[1];
				sell_price = parseInt(sellinfo[2]);
				
				//GM_log('port ' + port + ', ore is ' + ore + ' sell_price is ' + sell_price);
				if(!low[ore]){ 				
					low[ore] = [port, sell_price];
				} else if (low[ore][1] > sell_price){
					low2[ore] = low[ore];
					low[ore] = [port, sell_price];
				} else if (low[ore][1] == sell_price) {
					low[ore][0] = low[ore][0] + ',' + port;
				} else if (low2[ore]){
					if(low2[ore][1] > sell_price) {
						low2[ore] = [port, sell_price];
					} else if (low2[ore][1] == sell_price){
						low2[ore][0] = low2[ore][0] + ',' + port;
					}
				}
			}
		}
		//alert('done scanning selling');
		//if(port == 249) break;
	//	next_i = i+3;
	}
	if(match = lines[i].match(/There is an asteroid in this sector:<\/b><br>(.*?) Ore</)){
		
		//alert(match[0]);
		ore = match[1];
		sector_match = lines[i].match(/#([0-9]+)/);
		//alert(sector_match);
		sector = sector_match[1];
		if(!asteroids[ore]){
			asteroids[ore]=sector;
		} else {
			asteroids[ore] = asteroids[ore]+','+sector;
		}
		//next_i = i+3;
	}	
	//if(next_i) i=next_i;
}


var ore_table = "<table  align=center border=1 bgcolor=#eaeaea><tr><td>ore</td><td>lowest sell</td><td>2nd lowest sell</td><td>high buy</td><td>2nd high buy</td><td>profit/trade (best)</td><td>asteroid</td></tr>";


for (var ore in low){
	if(!high2[ore]) high2[ore] = high[ore];
	if(!low2[ore]) low2[ore] = '&nbsp;';
	ore_table += "<tr><td>" + ore + "</td>";
	ore_table += "<td>" + low[ore][1] + " in <b>" + low[ore][0] + "</b></td>";
	ore_table += "<td>" + low2[ore][1] + " in <b>" + low2[ore][0] + "</b></td>";
	ore_table += "<td>" + high[ore][1] + " in <b>" + high[ore][0] + "</b></td>";
	ore_table += "<td>" + high2[ore][1] + " in <b>" + high2[ore][0] + "</b></td>";
	ore_table += "<td>" + (high[ore][1] - low[ore][1]) + "</td>";
	ore_table += "<td>" + (asteroids[ore] ? asteroids[ore] : '&nbsp;') +"</td></tr>";
	//ore_table += "<tr><td>" + ore + "</td><td>" + low2[ore][0] + "</td><td>" + low2[ore][1] + "</td><td>" + high2[ore][0] + "</td><td>" + high2[ore][1] + "</td><td>"+(high2[ore][1] - low2[ore][1])+"</td></tr>";
	
}
ore_table += "</table>";

var asteroid_table = "<table align=center border=1 bgcolor=#eaeaea><tr><td>Asteroid</td><td>Sector</td></tr>";
for(var ore in asteroids){
	asteroid_table += "<tr><td>"+ore+"</td><td>"+asteroids[ore]+"</td></tr>";
}
asteroid_table += "</table>";

//popup goodness?
popup_script = "var tradeswin = window.open('', 'tradeswin', 'height=400,width=490,dependant=1,resizable=1,scrollbars=1');tradeswin.document.title='SSW Ore Deals';tradeswin.document.body.innerHTML = '" + ore_table + "'";
document.getElementsByName('pnselect')[0].innerHTML += '<option value="" onClick="'+popup_script+'">Show Ore Table</option>';

document.body.innerHTML += ore_table;

//alert(match);



