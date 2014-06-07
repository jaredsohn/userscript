// ==UserScript==
// @name           Mt.Gox extend
// @namespace      blah
// @description    updater etc.
// @include        http*://*mtgox.com/*
// ==/UserScript==

var global_myorders = "";
var global_ticker = "";
var global_depthdata = "";
var global_myorders_old = "";
var global_ticker_old = "";
var global_depthdata_old = "";

var SUC_script_num = 91779; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 60*60*1000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

function sleep(milliSeconds){
	var response;
	var resource = new XMLHttpRequest(); // if IE use resource = new ActiveXObject("Microsoft.XMLHTTP");
	try{
		resource.open('GET', 'http://www.rix2000.se/sleep.php?milliSeconds=' + milliSeconds, false);
		resource.send(null);
		response = resource.responseText; // JavaScript waits for response
	}catch(e){
		alert(e);
	}
	return true;
}

function exchangerate(currency0, currency1){
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://finance.yahoo.com/d/quotes.csv?s="+encodeURIComponent(currency0+currency1+"=X")+"&f=l1",
		onload: function(responseDetails){
			GM_setValue(currency0+currency1,responseDetails.responseText);
		}
	});
	var rate = GM_getValue(currency0+currency1,0);
	return rate;
}

function showlist(){
	var dalinks = document.getElementsByTagName("a");
	for(i=0;i<dalinks.length;i++){
		if(dalinks[i].innerHTML.indexOf("Depth of Market")!=-1){
			alert(dalinks[i].innerHTML);
			simulateClick(dalinks[i]);
			break;
		}
	}
}

function simulateClick(what) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !what.dispatchEvent(evt);
  if(canceled) {
    // A handler called preventDefault
    alert("canceled");
  } else {
    // None of the handlers called preventDefault
    alert("not canceled");
  }
}

function fix_trade_layout(){
	var daforms = document.getElementsByTagName("form");
	var container = document.createElement("div");
	var container_table = document.createElement("table");
	var container_table_tr = document.createElement("tr");
	var container_table_tr_td1 = document.createElement("td");
	var container_table_tr_td2 = document.createElement("td");
	var container_table_tr_td3 = document.createElement("td");

	container_table_tr.appendChild(container_table_tr_td1);
	container_table_tr.appendChild(container_table_tr_td2);
	container_table_tr.appendChild(container_table_tr_td3);
	container_table.appendChild(container_table_tr);
	container.appendChild(container_table);
	daforms[0].parentNode.insertBefore(container,daforms[0]);
	
	container_table_tr_td1.appendChild(daforms[0]);
	container_table_tr_td2.appendChild(daforms[1]);
	
	fix_captions();
	remove_hr_lines();
	fix_order_table();
	fix_css();
	insert_data_frame();
	
setTimeout("window.location.reload()",(120*1000));
}

function extend_account_history_layout(){
	var dascripts = document.getElementsByTagName('script');
	for(i=0;i<dascripts.length;i++){
		if(dascripts[i].innerHTML.indexOf('"iDisplayLength": 30,')!=-1){
			dascripts[i].innerHTML = dascripts[i].innerHTML.replace('"iDisplayLength": 30,','"iDisplayLength": 100,');
		}
	}
}

function extend_history_layout(){
	var datables = document.getElementsByTagName("table");
	for(i=0;i<datables.length;i++){
		if(datables[i].innerHTML.indexOf("Last 48 Hours")!=-1){
			var historylinks = datables[i];
		}
	}
	get_json_data(continue_extend_history_layout);
	
}

function continue_extend_history_layout(){
	
	add_nicer_table(global_depthdata);

	fix_css();

	unsafeWindow.getRecent();

	add_bitcoincharts_graph();

	setTimeout("window.location.reload()",(5*60*1000));
	setTimeout(check4change,(10*1000));
}

function add_bitcoincharts_graph(){
	var btccharts_div_x = 100;
	var btccharts_div_y = 550;
	var btccharts_div = document.createElement("div");
	var btccharts = document.createElement("img");
	var pagewidth = document.body.clientWidth;
	btccharts.setAttribute("src","http://bitcoincharts.com/charts/chart.png?width="+pagewidth+"&m=mtgoxUSD&k=&r=2&i=1-min&c=0&s=&e=&Prev=&Next=&v=1&cv=0&ps=0&l=0&p=0&t=S&b=&a1=&m1=10&a2=&m2=25&x=0&i1=&i2=&i3=&i4=&SubmitButton=Draw&");
	//btccharts.setAttribute("src","https://www.avanza.se/aza/images/nav_avanza_sb.gif");
	btccharts_div.appendChild(btccharts);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(btccharts_div);
}

function cancelOrder(orderID,type)
{
	unsafeWindow.$.post("/code/cancelOrder.php", { "oid": orderID, "type": type }, onServer , "json" );
}

function get_json_data(callwhenready){
	unsafeWindow.$.get("/code/getOrders.php", { }, setglobalmyorders , "json" );
	unsafeWindow.$.get("/code/ticker.php", { }, setglobalticker , "json" );
	unsafeWindow.$.post("/code/data/getDepth.php", { }, setglobaldepthdata , "json" );

	if(callwhenready){
		wait4json(callwhenready)
	};
}
function wait4json(callwhenready){
	if(global_myorders=="" || global_ticker=="" || global_depthdata==""){
		alert('not done loading data');
		wait4json(callwhenready);
	}else{
		callwhenready();
	}
}

function check4change(){
	get_json_data();
	if(global_myorders_old != global_myorders || global_ticker_old != global_ticker || global_depthdata_old != global_depthdata){
		window.location.reload();
	}
}

function setglobalmyorders(what){
	global_myorders_old = global_myorders;
	if(global_myorders_old=="") global_myorders_old = what;
	global_myorders = what;
}
function setglobalticker(what){
	global_ticker_old = global_ticker;
	if(global_ticker_old=="") global_ticker_old = what;
	global_ticker = what;
}
function setglobaldepthdata(what){
	global_depthdata_old = global_depthdata;
	if(global_depthdata_old=="") global_depthdata_old = what;
	global_depthdata = what;
}

function add_nicer_table(data){

	var bids_div_x = 860;
	var bids_div_y = 70;
	var bids_div_w = 170;
	var bids_div_h = 260;

	var asks_div_x = bids_div_x+bids_div_w+10;
	var asks_div_y = bids_div_y;
	var asks_div_w = bids_div_w;
	var asks_div_h = bids_div_h;

	var test_div_x = bids_div_x;
	var test_div_y = bids_div_y+bids_div_h+15;
	var test_div_w = bids_div_w+asks_div_w+10;
	var test_div_h = 460-bids_div_h;

	
	var bids_div = document.createElement("div");
	var bids_div_textarea = document.createElement("textarea");
	bids_div.setAttribute("style","position:absolute;top:"+bids_div_y+"px;left:"+bids_div_x+"px;font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;");
	bids_div_textarea.setAttribute("style","width:"+bids_div_w+"px;height:"+bids_div_h+"px;");
	bids_div_textarea.setAttribute("id","bids_div_textarea");

	var asks_div = document.createElement("div");
	var asks_div_textarea = document.createElement("textarea");
	asks_div.setAttribute("style","position:absolute;top:"+asks_div_y+"px;left:"+asks_div_x+"px;font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;");
	asks_div_textarea.setAttribute("style","width:"+asks_div_w+"px;height:"+asks_div_h+"px;");

	var test_div = document.createElement("div");
	var test_div_textarea = document.createElement("textarea");
	test_div.setAttribute("style","position:absolute;top:"+test_div_y+"px;left:"+test_div_x+"px;font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;");
	test_div_textarea.setAttribute("style","width:"+test_div_w+"px;height:"+test_div_h+"px;");

	if(data.asks && data.bids){
		var data1=data.asks;
		var data2=data.bids;

		//call calculator function
		add_real_value_calculator(data2);
		
		var txt_bids = "Bids:###\n";
		var txt_asks = "Asks:###\n";

		var teststring = "";

		teststring+=global_myorders.orders.length+" orders:";
		for(i=0;i<global_myorders.orders.length;i++){
			teststring+="\ntype:"+(global_myorders.orders[i].type==1 ? "Selling" : "Buying")+
			"\tstatus:"+(global_myorders.orders[i].status==1 ? "Active" : "Not enough funds")+
			"\nprice:"+global_myorders.orders[i].price;
			if((global_myorders.orders[i].price+'').length<6)
				teststring+="\t";
			teststring+="\tbtc:"+global_myorders.orders[i].amount+
			"\tusd:"+Math.round((global_myorders.orders[i].price*global_myorders.orders[i].amount)*10000)/10000+
			"\t(oid:"+global_myorders.orders[i].oid+")"+
			"\ndate:"+(new Date(global_myorders.orders[i].date*1000))+
			"\n";
		}		
		
		var myorderamounts = new Array();
		for(i=0;i<global_myorders.orders.length;i++){
			myorderamounts[i] = global_myorders.orders[i].amount;
		}

		var total_bids = 0
		for(var n=0; n<data2.length; n++){
			data2[n][0] = new String(data2[n][0]);
			data2[n][1] = new String(data2[n][1]);
			if(data2[n][0].indexOf(".")==-1) data2[n][0]+=".";
			if(data2[n][1].indexOf(".")==-1) data2[n][1]+=".0";
			while(data2[n][0].substring(data2[n][0].indexOf(".")).length<=6) data2[n][0]+="0";
			var newline = data2[n][0]+"\t"+data2[n][1]+"\n";
			total_bids += parseFloat(data2[n][1]);
			txt_bids += newline;
		}

		var total_asks = 0
		for(var n=0; n<data1.length; n++){
			data1[n][0] = new String(data1[n][0]);
			data1[n][1] = new String(data1[n][1]);
			if(data1[n][0].indexOf(".")==-1) data1[n][0]+=".";
			if(data1[n][1].indexOf(".")==-1) data1[n][1]+=".0";
			while(data1[n][0].substring(data1[n][0].indexOf(".")).length<=6) data1[n][0]+="0";	
			var newline = data1[n][0]+"\t"+data1[n][1]+"\n";
			total_asks += parseFloat(data1[n][1]);
			txt_asks += newline;
		}

		txt_bids = txt_bids.replace("###",Math.round(total_bids*1000)/1000+"\n");
		txt_asks = txt_asks.replace("###",Math.round(total_asks*1000)/1000+"\n");
		
		bids_div_textarea.innerHTML = txt_bids;
		asks_div_textarea.innerHTML = txt_asks;
		test_div_textarea.innerHTML = teststring;
	
		var body = document.getElementsByTagName("body")[0];
		bids_div.appendChild(bids_div_textarea);
		body.appendChild(bids_div);
		asks_div.appendChild(asks_div_textarea);
		body.appendChild(asks_div);
		test_div.appendChild(test_div_textarea);
		body.appendChild(test_div);
		
//		bids_div_textarea.scrollTop = 3*bids_div_textarea.clientHeight * (data2.length / bids_div_textarea.innerHTML.split("\n").length);
//		asks_div_textarea.scrollTop = 3*asks_div_textarea.clientHeight * (data2.length / asks_div_textarea.innerHTML.split("\n").length);
	}
}

function fix_captions(){
	var dalegends = document.getElementsByTagName("legend");
	for(i=0;i<dalegends.length;i++){
		if(dalegends[i].innerHTML.indexOf("Buy Bitcoins")!=-1) dalegends[i].innerHTML = "Buy Bitcoins (add bid order)";
		if(dalegends[i].innerHTML.indexOf("Sell Bitcoins")!=-1) dalegends[i].innerHTML = "Sell Bitcoins (add ask order)";
	}
}

function remove_hr_lines(){
	var dahrs = document.getElementsByTagName("hr");
	for(i=0;i<dahrs.length;i++){
		dahrs[i].parentNode.removeChild(dahrs[i]);
	}
	dahrs = document.getElementsByTagName("HR");
	for(i=0;i<dahrs.length;i++){
		dahrs[i].parentNode.removeChild(dahrs[i]);
	}
}

function fix_order_table(){
	var daordertable = document.getElementById("orders");
	daordertable.width="";
}

function insert_data_frame(){
	var dataframe_div = document.createElement("div");
	var dataframe = document.createElement("iframe");
	dataframe.setAttribute("src",location.href+"history");
	dataframe_div.appendChild(dataframe);
	document.getElementsByTagName("body")[0].appendChild(dataframe_div);
}

function fix_css(){
	var newstyle=".btcx_table { /* clear: both; */ border-collapse: collapse; border-spacing: 0; border: 1px solid #ff0088; background: #fafafa; margin: 1px 0; }";
	newstyle += ".btcx_table td, th { padding: .25em 1em; border: 1px solid #ff0088; vertical-align: middle; text-align: left; font-weight: normal; color: #666; font-size: 0.6em; }";
	newstyle += ".top_row_logo { font-size: 12px; line-height: 18px;}";
	newstyle += ".top_row_left { font-size: 12px; line-height: 18px;}";
	newstyle += ".header { padding-bottom: 40px;}";
	newstyle += ".banner { margin-top: 0px;}";
	//newstyle += ".undermenu { font-size: 7px;}";
	newstyle += "fieldset { margin: 0 0 0 0; padding:0 0 0 0;}";

	var titlebox_data=document.getElementsByTagName("legend")[0];
	if(titlebox_data.innerHTML.indexOf("Data")!=-1){
		titlebox_data.parentNode.removeChild(titlebox_data);
	}

	var head=document.getElementsByTagName("head")[0];
	var el=window.document.createElement('link');
	el.rel='stylesheet';
	el.type='text/css';
	el.href='data:text/css;charset=utf-8,'+escape(newstyle);
	head.appendChild(el);
}

function add_real_value_calculator(data2){
	//calculate how much bitcoin you'd get if you sold right now

	var calc_div_x = 860;
	var calc_div_y = 570;
	var calc_form_w = 320;
	var calc_form_h = 100;

	var calc_div = newdiv(calc_div_x, calc_div_y);
	var calc_div_form = document.createElement("form");
	calc_div_form.setAttribute("style","width:"+calc_form_w+"px;height:"+calc_form_h+"px;");
	
	var bidstring = "";
	for(var n=0; n<data2.length; n++){
		var newline = "";
		data2[n][0] = new String(data2[n][0]);
		data2[n][1] = new String(data2[n][1]);
		if(data2[n][0].indexOf(".")==-1) data2[n][0]+=".";
		if(data2[n][1].indexOf(".")==-1) data2[n][1]+=".0";
		while(data2[n][0].substring(data2[n][0].indexOf(".")).length<=6) data2[n][0]+="0";
		newline += data2[n][0]+":"+data2[n][1]+",";
		bidstring += newline;
	}
	
	var calcscript = document.createElement("script");
	calcscript.setAttribute("language","javascript");
	var show_bidstring_in_alert_for_debug = false;
	var USDSEK = parseFloat(exchangerate("USD","SEK"));
	calcscript.innerHTML+="function calcit_sell(amount){var bidstring='"+bidstring+"';var show_bidstring_in_alert_for_debug="+show_bidstring_in_alert_for_debug+";var USDSEK='"+USDSEK+"';var bidarr=bidstring.split(',');var profit=0;var btcpile=amount;for(i=0;btcpile>0&&i<bidarr.length;i++){if(btcpile<parseFloat(bidarr[i].split(':')[1])){profit+=btcpile*parseFloat(bidarr[i].split(':')[0]);btcpile=0;}else{profit+=parseFloat(bidarr[i].split(':')[1])*parseFloat(bidarr[i].split(':')[0]);btcpile-=parseFloat(bidarr[i].split(':')[1]);}}alert((show_bidstring_in_alert_for_debug?('bidstring:'+bidstring+'\\n'):'')+'BTC:'+amount+' = USD:'+(Math.round(profit*100)/100)+' = SEK:'+(Math.round(profit*USDSEK*100)/100)+' (USDBTC='+(Math.round(10000*profit/amount)/10000)+', USDSEK='+(Math.round(USDSEK*10000)/10000)+')');}";
	calcscript.innerHTML+="function calcit_buy(amount){var bidstring='"+bidstring+"';var show_bidstring_in_alert_for_debug="+show_bidstring_in_alert_for_debug+";var USDSEK='"+USDSEK+"';var bidarr=bidstring.split(',');var profit=0;var btcpile=amount;for(i=0;btcpile>0&&i<bidarr.length;i++){if(btcpile<parseFloat(bidarr[i].split(':')[1])){profit+=btcpile*parseFloat(bidarr[i].split(':')[0]);btcpile=0;}else{profit+=parseFloat(bidarr[i].split(':')[1])*parseFloat(bidarr[i].split(':')[0]);btcpile-=parseFloat(bidarr[i].split(':')[1]);}}alert((show_bidstring_in_alert_for_debug?('bidstring:'+bidstring+'\\n'):'')+'BTC:'+amount+' = USD:'+(Math.round(profit*100)/100)+' = SEK:'+(Math.round(profit*USDSEK*100)/100)+' (USDBTC='+(Math.round(10000*profit/amount)/10000)+', USDSEK='+(Math.round(USDSEK*10000)/10000)+')');}";
	calc_div_form.innerHTML = "<input type='text' style='width:50px' value='' onchange='javascript:calcit_sell(this.value);'/>btc 2 sell";
	calc_div_form.innerHTML = "<input type='text' style='width:50px' value='' onchange='javascript:calcit_buy(this.value);'/>btc 2 buy";
	var body = document.getElementsByTagName("body")[0];
	calc_div.appendChild(calc_div_form);
	body.appendChild(calcscript);
//	body.appendChild(calc_div);
}

function newdiv(x,y){
	var dadiv = document.createElement("div");
	dadiv.setAttribute("style","position:absolute;top:"+y+"px;left:"+x+"px;font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;");
	document.getElementsByTagName("body")[0].appendChild(dadiv);
	return dadiv;
}

if(document.documentElement.innerHTML.indexOf("You can make a lower offer but it wont be filled until someone accepts it.")!=-1){
	fix_trade_layout();
}
if(document.documentElement.innerHTML.indexOf("Last 48 Hours")!=-1){
	extend_history_layout();
}
if(document.documentElement.innerHTML.indexOf("<legend>Account History</legend>")!=-1){
	extend_account_history_layout();
}
if(document.documentElement.innerHTML.indexOf("Loadavg too high due to ddos")!=-1){
	setTimeout("window.location.reload()",(0.5*60*1000));
}