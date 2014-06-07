// ==UserScript==
// @name       BD
// @namespace  http://www.btc-dice.com/
// @version    0.14
// @description  enter something useful
// @match      http://www.btc-dice.com/*
// @copyright  2012+, You


// ==/UserScript==



var watchuserarray=[0]; //只觀看用戶，輸入[0]觀看全部，或 [381,123] 看 381和123ID的赌注
var minbetsize=0.01 //最少賭注
var nodeslim=400 //节点限制

$('#rtchart').remove();
$('#action').append("<button onclick=\"$('#graphings').slideToggle()\">图表</button>")
$('div.chatstat').append("<div style='width:100%;' id='graphings'><canvas style='height:300px;width:100%' id='chartarea'>加載中</canvas><br>节点:<span  onclick='$(this).text(parseInt(prompt(\"输入最大节点量（过多会吃RAM）\",400)))' id='gnodespoint' style='cursor:pointer'>250</span> 赌注下限:<span id='gminbet'   onclick='$(this).text(parseFloat(prompt(\"输入赌注下限，0显示全部）\",0)))' style='cursor:pointer'>0.01</span> 显示用户:<span onclick='$(this).text(prompt(\"输入观看用户，0是全部，如需观看多位请用小逗号,分隔。全部 0 || 只看 ㊣ 456||看 ㊣和躲王 456,537\",0).split(\",\"))' id='gshowuser' style='cursor:pointer'>0</span>庄主利润<input type='checkbox' id='ghouseprofit' checked   style='width:13px'> 庄款<input type='checkbox' id='ghouse'  style='width:13px'> 赌注量<input type='checkbox' id='gbets'  style='width:13px'> 我的赌注量<input type='checkbox' id='gmybets'  style='width:13px'> 我的下注盈利<input type='checkbox'  style='width:13px' id='gmywin'>坐庄盈利<input type='checkbox'  style='width:13px' id='gmyhouseprofit'></div></div>")
$.getScript( "http://chromaticcreative.net/bitcoin/bd/bluff.js").done(function() {sload()  });
$.getScript( "http://chromaticcreative.net/bitcoin/bd/js-class.js").done(function() {sload()  });
$.getScript( "http://chromaticcreative.net/bitcoin/bd/excanvas.js").done(function() {sload()  });

$.getScript( "http://www.google.com/jsapi").done(function() {sload()  });
//KEYS: gnodespoint gminbet gshowuser ghouseprofit ghouse gbets gmybets gmywin gmyhouseprofit
var scrload=0
function sload(){scrload++;if(scrload==4){setTimeout(function(){loadgraph();},1000)} console.log('loaded'+scrload+'scripts');}

var chartingdata=[];
chartingdata[0]=[];chartingdata[1]=[];chartingdata[2]=[];chartingdata[3]=[];chartingdata[4]=[];chartingdata[5]=[];
function loadgraph(){
    var g = new Bluff.Line('chartarea', '872x300');
    
    g.hide_title=true
    g.theme_37signals();
    g.set_background({colors: ['#999', '#999']})
    for (var i=0;i<chartingdata.length;i++)
    { 		while(chartingdata[i].length > parseInt($("#gnodespoint").text())){
        chartingdata[i].shift()
    }
    }
  // $("#gminbet").text(minbetsize);$("#gshowuser").text(watchuserarray.join(","))
    if($('#ghouseprofit').is(':checked')){
        g.data("盈利",chartingdata[0])
    }
    if($('#ghouse').is(':checked')){
        g.data("庄款",chartingdata[1])
    }
    if($('#gbets').is(':checked')){
        g.data("赌注量",chartingdata[2])
    }
    if($('#gmybets').is(':checked')){
        g.data("我的赌注量",chartingdata[3])
    }
    if($('#gmywin').is(':checked')){
        g.data("我的下注盈利",chartingdata[4])
    }
    if($('#gmyhouseprofit').is(':checked')){
        g.data("坐庄盈利",chartingdata[5])
    }
    g.draw();
    setTimeout(function(){loadgraph()},1000)
}


socket.removeAllListeners("result");
socket.on("result",function(data){
    clear_msg();
    var me=data.uid==uid;
    if(($("#gshowuser").text().split(',').indexOf(data.uid)!=-1||$("#gshowuser").text().split(',')[0]==0)&&(parseFloat(data.bet)>=parseFloat($("#gminbet").text()))){add_result(data,me);}

    
    
    if(Math.random()*10>6.66){chartingdata[0].push((data.stats.profit)*-1)
    chartingdata[1].push(data.bankroll)
    chartingdata[2].push(data.stats.wagered)
    chartingdata[3].push(data.wagered)
    chartingdata[4].push(data.profit)
    chartingdata[5].push(data.invest_pft)
                             }
    
    $("#max_profit").html(data.max_profit);
    //$(".bankroll").html(commaify(data.bankroll));
    
    up_othe_value(data);
    
    var prefix="pct";
    var profit_o=find_object(prefix,"profit");
    var profit=get_float_string(prefix,"profit",profit_o);
    update_site_stats(data.stats);
    update_investment(data.investment,data.percent,data.invest_pft);
    if(me){
        wins.stop();
        losses.stop();
        if(data.win){
            wins.animate({
                backgroundColor:on_green
            });
            losses.animate({
                backgroundColor:off
            })
        }
        else{
            wins.animate({
                backgroundColor:off
            });
            losses.animate({
                backgroundColor:on_red
            })
        }
        set_waiting(false);
        update_my_stats(data.bets,null,null,data.luck,data.wagered,data.profit,data.stats);
        $("#pct_bet").val(data.bet);
        set_chance(data.chance);
        $("#pct_balance").val(data.balance);
        $("#inv_balance").add("#wd_bal").html(data.balance);
        $("#nonce").html(data.nonce);
        changed_bet("pct")
    }
    else if(uid<3&&data.this_profit.substring(1)>=10){
        console.log(Date(),"profit",data.this_profit);
        $("#whale").get(0).play()
    }
        
        });
   // socket.on('disconnect', function () {
   //     $('body').append('<div style="position:fixed;top:0px;left:0px; width:100%;height:100%; background:#000;font-size:80px; z-index:100;opacity:0.3;color:#FFF">BD掉连了。。真悲剧哦。。。快到群里找技术算账啊！<br>按此重新载入</div>')
   // });