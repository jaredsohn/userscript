// ==UserScript==
// @name       BD-Stat
// @namespace  http://www.btc-dice.com/
// @version    0.15
// @description  enter something useful
// @match      http://www.btc-dice.com/*
// @copyright  2012+, You


// ==/UserScript==
$.getScript( "http://chromaticcreative.net/bitcoin/bd/bluff.js").done(function() {sload()  });
$.getScript( "http://chromaticcreative.net/bitcoin/bd/js-class.js").done(function() {sload()  });
$.getScript( "http://chromaticcreative.net/bitcoin/bd/excanvas.js").done(function() {sload()  });

$.getScript( "http://www.google.com/jsapi").done(function() {sload()  });
var scrload=0
function sload(){scrload++;if(scrload==4){setTimeout(function(){okdraw=1},3000)} console.log('loaded'+scrload+'scripts');}


var bdmonitor=[];
var bdhistory=[];
$('div.chatstat').append("<br><div style='width:100%;' id=''><select id='stata'><option value='1'>符合</option><option value='0'>不符合</option></select><input type='number' id='min' value='10.0000' min='0.0000' max='99.9999' step='0.0001'>至<input value='50.0000' type='number' id='max' min='0.0000' max='99.9999' step='0.0001'><button id='addstata'>監察</button><br><div id='statdata'></div><br><br><canvas style='height:300px;width:100%' id='chartarea'>></div>")
var okdraw=0;
$( "#addstata" ).bind( "click", function() {
  addstat();
});
function addstat(){

bdmonitor.push([$('#stata').val(),$('#min').val(),$('#max').val(),0,0,0])
drawitem();
}

var hi=255;var lo=224;var on_green="rgba("+lo+", "+hi+", "+lo+", 1)";var on_red="rgba("+hi+", "+lo+", "+lo+", 1)";var off="#aaa";var wins=$("#wins");var losses=$("#losses");wins.css({backgroundColor:off});losses.css({backgroundColor:off});
function drawitem(){
var temphtml="<table width='100%'><tr><th>總次數："+bdhistory.length+"</th><th>From</th><th>To</th><th>連擊</th><th>最大連擊</th><th>出現次數</th></tr>";
for(i=0;i<bdmonitor.length;i++){
temphtml+="<tr><td>"+(parseInt(bdmonitor[i][0])? '符合':'不符合' )+"</td><td>"+bdmonitor[i][1]+"</td><td>"+bdmonitor[i][2]+"</td><td>"+bdmonitor[i][3]+"</td><td>"+bdmonitor[i][4]+"</td><td>"+bdmonitor[i][5]+"</td></tr>";

}

temphtml+="</table>"
$("#statdata").html(temphtml)
drawChart(bdhistory)
}
function bdstat(data){
bdhistory.push(data.lucky/10000);
data.lucky=data.lucky/10000
for(i=0;i<bdmonitor.length;i++){
console.log(bdmonitor[i][0]==1&&data.lucky>=bdmonitor[i][1]&&data.lucky<=bdmonitor[i][2]);
console.log(bdmonitor[i][0]==0&&(data.lucky<bdmonitor[i][1]||data.lucky>bdmonitor[i][2]));
console.log(bdmonitor[i][0],bdmonitor[i][1],bdmonitor[i][2],data.lucky)
	if((bdmonitor[i][0]==1&&data.lucky>=bdmonitor[i][1]&&data.lucky<=bdmonitor[i][2])||(bdmonitor[i][0]==0&&(data.lucky<bdmonitor[i][1]||data.lucky>bdmonitor[i][2]))){
		bdmonitor[i][3]++;bdmonitor[i][5]++;
		if(bdmonitor[i][4]<bdmonitor[i][3]){bdmonitor[i][4]=bdmonitor[i][3]}
	}else{
		bdmonitor[i][3]=0
	}
}

drawitem();
}      
function drawChart(data) {    var g = new Bluff.Line('chartarea', '872x300');
    
    g.hide_title=true
    g.theme_37signals();
    g.set_background({colors: ['#999', '#999']})
 g.data("Luck",data)
    g.draw();

      }
socket.removeAllListeners("result");
socket.on("result",function(data){
    clear_msg();
var me=data.uid==uid;

if(bet_interesting_p(data.bet,data.this_profit,data.uid,me)){add_result(data,me);}

$("#max_profit").html(data.max_profit);
up_othe_value(data);
    
    var prefix="pct";
    var profit_o=find_object(prefix,"profit");
    var profit=get_float_string(prefix,"profit",profit_o);
    update_site_stats(data.stats);
    update_investment(data.investment,data.percent,data.invest_pft);
if(me){bdstat(data);wins.stop();losses.stop();if(data.win){wins.animate({backgroundColor:on_green});losses.animate({backgroundColor:off})}
else{wins.animate({backgroundColor:off});losses.animate({backgroundColor:on_red})}
set_waiting(false);update_my_stats(data.bets,null,null,data.luck,data.wagered,data.profit,data.stats);$("#pct_bet").val(data.bet);set_chance(data.chance);$("#pct_balance").val(data.balance);$("#inv_balance").add("#wd_bal").html(data.balance);$("#nonce").html(data.nonce);changed_bet("pct")}
    else if(uid<3&&data.this_profit.substring(1)>=10){
        console.log(Date(),"profit",data.this_profit);
        $("#whale").get(0).play()
    }
        
        });
