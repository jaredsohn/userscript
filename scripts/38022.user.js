// ==UserScript==
// @name           Gladiatus
// @namespace      www.vSir.idv.tw
// @description    customize for Gladiatus
// @include        http://s4.gladiatus.tw/game/index.php?mod=*
// ==/UserScript==
var current_url=window.location.href;
var debug_area, txt_msg, myscript="";
var current_mod;
var now=new Date();
var counter=document.createElement("input");
counter.setAttribute("type","hidden");
counter.value=1800;
document.body.appendChild(counter);

txt_msg=document.createElement("SPAN");
txt_msg.setAttribute("id","txt_msg");

init_debug_msg_area();
current_mod=now_mod();

switch(current_mod){
	case "overview":
		//概況處理
		debugout("概況");
		process_overview();
		break;
	case "messages":
		//訊息處理
		debugout("訊息夾");
		break;
	case "packages":
		//訊息處理
		debugout("包包");
		break;
	case "report":
		//訊息處理
		debugout("戰鬥報告");
		break;
	case "ally":
		//公會處理
		debugout("公會");
		break;
	case "highscore":
		//排行榜處理
		debugout("排行榜");
		process_highscore();
		break;
	case "map":
		//大街地圖處理
		debugout("地圖");
		break;
	case "work":
		//馬廄處理
		debugout("馬廄");
		break;
	case "arena":
		//競技場處理
		debugout("競技場");
		break;
	case "player":
		//競技場處理
		debugout("玩家");
		break;
	case "tavern":
		//酒館理處
		debugout("酒館");
		break;
	case "training":
		//訓練處理
		debugout("訓練");
		break;
	case "inventory":
		//大街處理(武器、盔甲、雜貨、鍊金)
		debugout("街上");
		break;
	case "premium":
		//寶石商人處理
		debugout("寶石商人");
		break;
	case "auction":
		//拍賣處理
		debugout("拍賣");
		process_auction();
		break;
	case "market":
		//市場處理
		process_market();
		break;
	case "location":
		//探險處理
		debugout("探險");
		break;
	case "quest":
		//探險處理
		debugout("調查");
		break;
	case "underground":
		debugout("遺世者");
		break;
	case "http://s4.gladiatus.tw/game/index.php?mod=":
		debugout("登入");
		break;
	default:
		debugout(current_mod);
		window.setTimeout(function() { window.location.replace(current_url); }, 1000);
		return;
}
//debugout(document.cookie);
////////Final jobs///////////////////////////////////
	addGlobalStyle("input.button2 { width: 50px; ! important");	
	var scriptobj=document.createElement("script");
	scriptobj.innerHTML=myscript;
	document.body.appendChild(scriptobj);
/////////////////////////////////////////////////////
function countdown(){
	var nowval=counter.value;
	nowval=nowval-1;
	debugout("start time: " + now + "<br>" + nowval);
	counter.value=nowval;
}

function functest(){
	debugout(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
}

function process_overview(){
	var box=document.getElementById("charstats");
	var btn_dbg=create_debug_button();
	box.insertBefore(btn_dbg,box.firstChild);
	var myscript=document.createElement("script");
	myscript.setAttribute("language","javascript");
	document.body.appendChild(myscript);
}

function process_highscore(){
	window.setInterval(countdown,1000);
}

function process_auction(){
	var howlong=document.getElementsByTagName("b")[0].innerHTML;
	debugout(howlong.search("長"));
	if(howlong=="非常短"){
		debugout(now);
		window.setInterval(countdown,1000);
	}else if(howlong=="短"){	
		debugout(howlong + " : " + now);
		window.setTimeout(function() { window.location.replace(current_url); }, 1000);
	}else if(howlong.search("長")>-1){
		debugout(howlong + " : " + now);
		window.setTimeout(function() { window.location.replace(current_url); }, 600000);
	}else if(howlong=="中等"){
		debugout(howlong + " : " + now);
		window.setTimeout(function() { window.location.replace(current_url); }, 600000);
	}else{
	}
}
function process_market(){
	var form_filter=document.getElementById("market_filter").getElementsByTagName("form")[0].getElementsByTagName("select")[0].value;
	var box=document.getElementById("market_filter");
	var objlist=document.createElement("div");
	//var objlist=document.createElement("textarea");
	objlist.setAttribute("id","objlist");
	objlist.setAttribute("rows","20");
	objlist.setAttribute("cols","100");
	objlist.setAttribute("style","x:0px; y:100px; visible:hidden; ");
	document.body.appendChild(objlist);

	switch(form_filter){
		case "0":
			process_market_all();
			return;
		case "7":
			//消耗品處理
			process_market_food();
			//debugout(txt_msg.innerHTML + " -> " + "消耗品");
		default:
			return;
	}
}

function process_market_all(){
	return;
}

function process_market_food(){
	var market_table=document.getElementById("market_table").getElementsByTagName("table")[0];
	var rows=market_table.getElementsByTagName("tr");
	var cols,col;
	var money,blood,ratio;
	//表頭加新行
	cols=rows[0].getElementsByTagName("th");
	col=document.createElement("th");
	col.innerHTML="比例";
	rows[0].insertBefore(col, cols[1]);
	col=document.createElement("th");
	col.innerHTML="DEBUG";
	//rows[0].appendChild(col);
	//==================
	var btn,objID;
	myscript+="var objlist=document.getElementById('objlist'); var item_to_add=''; ";
	for(var i=1;i<rows.length;i++){
		cols=rows[i].getElementsByTagName("td");
		money=cols[2].childNodes[0].nodeValue;
		col=document.createElement("td");
		ratio=money.replace(/\./g,"")/2;
		col.innerHTML=ratio;
		rows[i].insertBefore(col,cols[1]);
		col=document.createElement("td");
		btn=document.createElement("input");
		btn.setAttribute("type","button");
		btn.setAttribute("class","button3");
		objID=rows[i].getElementsByTagName("div")[0].getAttribute("id");
		//add_custom_script("objlist.innerHTML=(objlist.innHTML + 'dd.elements." + objID + ".tooltip;');");
		myscript+="item_to_add+=dd.elements." + objID + ".tooltip; ";
		btn.value=objID
		btn.setAttribute("onclick","alert(dd.elements." + objID + ".tooltip);");
		//col.appendChild(btn);
		rows[i].appendChild(col);
	}
	myscript+="objlist.innerHTML=item_to_add; ";
	//myscript+="alert(objlist.innerHTML);";
}

function create_debug_button(){
	var btn=document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Run debug");
	btn.setAttribute("class","button3");
	return btn;
}
function now_mod(){
	var sindex=current_url.indexOf("mod")+4;
	var eindex=current_url.indexOf("&");
	var mod=current_url.substring(sindex,eindex);
	return mod;
}
function init_debug_msg_area(){
	debug_area=document.createElement("DIV");
	debug_area.style.backgroundColor="#FFFF9E";
	debug_area.appendChild(txt_msg);
	//debug_area.align="left";
	txt_msg.width="100%";
	document.body.insertBefore(debug_area, document.body.firstChild);
}

function debugout(debug_str){
	txt_msg.innerHTML=debug_str;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
