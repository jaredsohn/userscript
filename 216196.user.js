// ==UserScript==
// @name        init stock
// @namespace   stock
// @version     1
// @include		https://*we06.settrade.com/*
// ==/UserScript==
//$("#dialog").empty().append("Time:<select id='interval'><option value='0'>Once</option><option value='1000'>1 Sec.</option><option value='2000'>2 Sec.</option><option value='3000'>3 Sec.</option></select>");

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
		} catch(e) {
			return;
		}

		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

function getCurrentDate(){
    function ff(s){ return s<10 ? '0'+(s+1):s+1;} 
    var d=(new Date());
    return d.getFullYear()+'-'+ff(d.getMonth())+'-'+ff(d.getSeconds());
}
function setHisStock(symbol,v){
    if(v != undefined){
        v.currentDate = getCurrentDate();
    }
    var his=$.cookie("his");
    if(his == undefined){ $.cookie("his",JSON.stringify({})); }
    his=JSON.parse($.cookie("his"));
    if(his[symbol] == undefined){ his[symbol] = [v]; }
    else{ 
        while(his[symbol].length >= 500){
            his[symbol].shift(); 
        }
        his[symbol].push(v); 
    }
    $.cookie("his",JSON.stringify(his));
}

function getHisStock(symbol){
    var his=$.cookie("his");
    if(his == undefined){ return his; }
    else{
        his=JSON.parse(his);
        return his[symbol];
    }
}
//============================================================================================================



$("body").append("<textarea id='js' style='width:99%;height:100px;'></textarea><button type='button' onClick=\" eval($('#js').val()) \">Run</button>");

function r(){ $('.refreshQuoteBtn:eq(0)').click(); setTimeout(r,eval('Math.random()*3333')); }
function int(p){ return parseInt(p,10); }
function float(p){ return parseFloat(parseFloat(p,10).toFixed(2),10); }
var msgBalance="เหลือจากการทำรายการ";




 /***
 * @module Core
 * @namespace Stock
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Stock": {
		 "autoBuySell":autoBuySell
		,"buyOrSell":buyOrSell//buyOrSell("B","IEC",100000,'0.03','limit',"999111");
		,"cancelOrder":cancelOrder
		,"calcAutoAndStopLoss":calcAutoAndStopLoss
		,"calcPriceAtoAtc":calcPriceAtoAtc
		,"getQuotes":getQuotes
        ,"getOrderStatus":getOrderStatus
        ,"getPortfolio":getPortfolio//console.info( getPortfolio('6670492') );
		,"getPriceStep":getPriceStep
        ,"getTotalQty":getTotalQty//console.log( getTotalQty('6670492','IEC','ATO','S','Q') );
		,"help":help
    }
  });


	//console.info( calcPriceAtoAtc("TRUE") );
	//console.info( getPortfolio('6670492') );
	//autoCencelOrder('IEC','B','0.03','999111');
	//buyOrSell("B","IEC",100000,'0.03','limit',"999111");
	//console.log( getTotalQty('6670492','IEC','ATO','S','Q') );
	//autoBuySell('6670492','999111','TRUE',100,'ATO',100,'ATO');
	//autoCencelOrder("IEC","S","999111");


    //-----------------------------------------------------------------------
	$(".selected").css('background-image','url()');
    $(".lastUpdate").css("background-color","#D9DBDC");
	$('#header,.lastUpdate').remove()

    function int(p){ return parseInt(p,10); }
    function float(p){ return parseFloat(parseFloat(p,10).toFixed(2),10); }
    function getQuotes(symbol){
        var url='https://we06.settrade.com/webrealtime/data/fastquote.jsp';
        var key=null;
        var results={};
        $.ajax({
            type:'POST'
            ,dataType:'json'
            ,async:false
            ,url:url
            ,data:{symbol:symbol,key:key}
            ,success:function(json){
                results=json;
            }
        });
        return results;
    }
    //console.info( getQuotes('IEC') );
    
    //ช่วงราคาที่จะเปลี่ยนแปลงในแต่ละช่อง
    function getPriceStep(p){
        p=float(p);
        var step=0;
        if(p<2){ step=0.01; }
        else if(p>=2 && p<5){ step=0.02; }
        else if(p>=5 && p<10){ step=0.05; }
        else if(p>=10 && p<25){ step=0.1; }
        else if(p>=25 && p<100){ step=0.25; }
        else if(p>=100 && p<200){ step=0.5; }
        else if(p>=200 && p<400){ step=1; }
        else if(p>=400){ step=2; }
        step=float(step);
        console.debug("getPriceStep:"+p+":"+step);
        return step;
    }

    function getPortfolio(accNo,symbol){
        var url='https://we06.settrade.com/daytradeflex/streamingSeos.jsp';
        var results=[];
        $.ajax({
            type:"POST"
            ,dataType:'text'
            ,async:false
            ,url:url
            ,data:{NewMode:'Pull',Service:'Portfolio',txtAccountNo:accNo,txtAccountType:'CASH_BALANCE'}
            ,success:function(text){
                var a=text.split(/\^/ig);
                for(var i=5;i<a.length;i++){
                    var b=a[i].split(/\|/ig);
                    var sInfo={};
                    sInfo.symbol=b[0];
                    sInfo.MP=b[2];
                    sInfo.amtPrice=float(b[3]);
                    sInfo.mktVal=float(b[4]);
                    sInfo.unrealizedPL=float(b[5]);
                    sInfo.pUnrealizedPL=float(b[6]);
                    sInfo.realizedPL=float(b[7]);
                    sInfo.startVol=int(b[8]);
                    sInfo.actVol=int(b[9]);
                    sInfo.availVol=int(b[10]);
                    sInfo.avgCost=float(b[11]);
                    sInfo.x2='';//12
                    sInfo.x3=null;//13
                    sInfo.x4=float(b[14]);
                    sInfo.x5=float(b[15]);
                    sInfo.x6='';//16
        	        results[results.length]=sInfo;
                }
            }
        });

		if(symbol){
			for(var i=0;i<results.length;i++){
				if(results[i].symbol==symbol){
					return results[i];
					break;
				}
			}
		}
        return results;
    }
    //console.info( getPortfolio('6670492') );
    
    function getOrderStatus(accNo){
        var url='https://we06.settrade.com/daytradeflex/streamingSeos.jsp';
        var results=[];
        $.ajax({
            type:"POST"
            ,dataType:'text'
            ,async:false
            ,url:url
            ,data:{NewMode:'Pull',Service:'OrderStatus',txtAccountNo:accNo,txtAccountType:'CASH_BALANCE'}
            ,success:function(text){
                var a=text.split(/\^/ig);
                for(var i=5;i<a.length;i++){
                    var b=a[i].split(/\|/ig);
                    var sInfo={};
                    sInfo.orderId=b[0];
                    sInfo.symbol=b[2];
                    sInfo.time=b[3];
                    sInfo.bs=b[4];
                    sInfo.orderPrice=b[5];
                    sInfo.orderVolume=b[6];
                    sInfo.orderMatched=b[7];
                    sInfo.orderBalance=b[8];
                    sInfo.orderCancelled=b[9];
                    sInfo.orderStatus=b[10];
                    sInfo.x11=b[11];
                    sInfo.x12=b[12];
                    sInfo.x13=b[13];
                    sInfo.dmy=b[14];
                    sInfo.x15=b[15];
                    sInfo.x16=b[16];
                    sInfo.x17=b[17];
                    sInfo.x18=b[18];
                    sInfo.x19=b[19];
                    sInfo.x20=b[20];
                    var dmy=sInfo.dmy.split(/\-/ig);
                    sInfo.actionTime=dmy[2]+'-'+dmy[1]+'-'+dmy[0]+' '+sInfo.time;
        	        results[results.length]=sInfo;
                }
            }
        });
        return results;    
    }
    //getOrderStatus('6670492');
    
    function getTotalQty(accNo,symbolSrc,priceSrc,bsSrc,statusSrc){
        var tot=0;
        symbolSrc=symbolSrc.toUpperCase();
        priceSrc=(''+priceSrc).toUpperCase();
        bsSrc=bsSrc.toUpperCase();
        statusSrc=statusSrc.toUpperCase();
        var order=getOrderStatus(accNo);
        for(var i=0;i<order.length;i++){
            var o=order[i];
			//console.debug(o);
            if(symbolSrc==o.symbol.toUpperCase()
            && ((priceSrc=='') || (priceSrc!='' && priceSrc==o.orderPrice.toUpperCase()))
            && bsSrc==o.bs.toUpperCase()
            && ((statusSrc=='') || (statusSrc!='' && statusSrc==o.orderStatus.toUpperCase()[0]))
            ){
                tot+=int(o.orderVolume);
            }
        }
        console.info("getTotalQty(***,"+symbolSrc+","+priceSrc+","+bsSrc+","+statusSrc+"):"+tot);
        return tot;
    }
    //getTotalQty('6670492','IEC','ATO','B','C');
    
    function buyOrSell(accNo,pin,bs,symbol,totalQty,price,priceType){
    	console.info("buyOrSell("+accNo+",***," + bs + "," + symbol + "," + totalQty + "," + price + "," + priceType + ")");
		var ret={};
    	bs=(''+bs).toUpperCase();
    	symbol=symbol.toUpperCase();
    	priceType=(''+priceType).toUpperCase();
    
        var ajax=$.ajax({
            type:'POST'
            ,dataType:'text/html'
            ,async:false
            ,url:"https://we06.settrade.com/daytradeflex/streamingSeos.jsp"
            ,data:{Service:"PlaceOrder"
    		    ,txtAccountNo:accNo
    		    ,txtBorS:bs
    		    ,txtClientType:"I"
    		    ,txtCondition:"DAY"
    		    ,txtPIN_new:pin
    		    ,txtPrice:price
    		    ,txtPriceType:priceType.toLowerCase()
    		    ,txtPublishVol:""
    		    ,txtQty:totalQty
    		    ,txtSymbol:symbol
    		    ,txtTerminalType:"jsp"
    		    ,type:"place"
    		}
        });
        
        //ทำรายการถูกต้อง
        //StreamingResponse~1~Streaming^PlaceOrder^T^1^00057^Request Submitted^76621770~StreamingResponse~1~�
        
        //ป้อนราคาไม่อยู่ในช่วงที่กำหนด
        //StreamingResponse~1~Streaming^PlaceOrder^F^1^00072^Error : Price should between 0.03 to 0.05~StreamingResponse~1~�
        
        ret.status=ajax.status;
        ret.readyState=ajax.readyState;
        ret.statusText=ajax.statusText;
        ret.responseText=ajax.responseText;
        if(ajax.status==200){
            var t=ajax.responseText.split(/\^/ig);
            //ret.msgStart=t[0];
            ret.service=t[1];
            ret.tf=t[2];
            ret.code=t[4];
            ret.msg=t[5];
            if(ret.tf=="T"){
                ret.orderId=t[6].substr(0,8);
            }
        }
        return ret;
    }
    //var ret=buyOrSell("6670492","999111","S","IEC",100,0.05,"atoatc");
    //console.log(ret);
        
    function cancelOrder(accNo,pin,symbol,bs,orderNo,price){
        var ret={};
        var a=orderNo.split(/\,/ig);
        var b=symbol.split(/\,/ig);
        var list={};
        list.extOrderNo='';
        list.symbol='';
        list.orderNo='';
    	symbol=symbol.toUpperCase();
    	bs=bs.toUpperCase();
    	price=(''+price).toUpperCase();
        if(orderNo && symbol && a.length==b.length){
            //สามารถใส่หลาย id ได้โดยใช้ , คั่น
            //ระบุ symbol และ id ให้สอดคล้องกันเสมอ
            for(var i=0;i<a.length;i++){
                list.extOrderNo+=(list.extOrderNo=='' ? '':',')+"0";
                list.orderNo+=(list.orderNo=='' ? '':',')+a[i];
                list.symbol+=(list.symbol=='' ? '':',')+b[i];
            }
        }
        else if(symbol || bs){//ถ้าไม่ระบุ id มาให้ดูจาก symbol
            var order=getOrderStatus(accNo);
            //console.log(order);
            for(var i=0;i<order.length;i++){
                var o=order[i];
                if(symbol 
                && o.symbol==symbol 
                && (o.orderStatus[0]=='P' || o.orderStatus[0]=='Q')
                && (bs=='' || (bs!='' && (bs==o.bs)))
                && (price=='' 
                    || (price!='' 
                        && (price==o.orderPrice 
                            || ((price=='ATC' || price=='ATOATC') && o.orderPrice=='ATC' && o.time>="16:30:00" && o.time<="17:00:00")
                            || ((price=='ATO' || price=='ATOATC') && o.orderPrice=='ATO' && ((o.time>="05:00:00" && o.time<="10:00:00") || (o.time>="14:25:00" && o.time<="14:30:00")))
                        )
                    )
                )
                ){
                    list.extOrderNo+=(list.extOrderNo=='' ? '':',')+"0";
                    list.symbol+=(list.symbol=='' ? '':',')+o.symbol;
                    list.orderNo+=(list.orderNo=='' ? '':',')+o.orderId;
                }
            }
        }
        var ajax={};
        if(list.extOrderNo && list.symbol && list.orderNo){
            ajax=$.ajax({
                type:'POST'
                ,dataType:'text/html'
                ,async:false
                ,url:"https://we06.settrade.com/daytradeflex/streamingSeos.jsp"
                ,data:{Service:"PlaceOrder"
        		    ,txtAccountNo:accNo
        		    ,extOrderNo:list.extOrderNo//Ex1:0,Ex2:0,0
        		    ,txtCancelSymbol:list.symbol//Ex1:IEC,Ex2:IEC,IEC
        		    ,txtOrderNo:list.orderNo//Ex1:76621760:76621761,76621760
        		    ,txtPIN_new:pin
        		    ,type:"cancel"
        		}
            });    
            //ทำรายการถูกต้อง
            //StreamingResponse~1~Streaming^PlaceOrder^T^1^00055^Cancel Order Submitted^0~StreamingResponse~1~�
                
            ret.status=ajax.status;
            ret.readyState=ajax.readyState;
            ret.statusText=ajax.statusText;
            ret.responseText=ajax.responseText;
            if(ajax.status==200){
                var t=ajax.responseText.split(/\^/ig);
                //ret.msgStart=t[0];
                ret.service=t[1];
                ret.tf=t[2];
                ret.code=t[4];
                ret.msg=t[5];
            }
        }
        return ret;
    }
    
    //var ret=buyOrSell("6670492","999111","S","IEC",100,0.05,"limit");
    //console.log(ret);
    //var ret=cancelOrder('6670492','999111','IEC','S','','');
    //console.log(ret);

    function calcAutoAndStopLoss(accNo,pin,symbol,percentBuyStep,percentSellStep,SLP,interval,debug){
        console.debug("calcAutoAndStopLoss("+accNo+",***,"+symbol+","+percentBuyStep+","+percentSellStep+","+SLP+");");
        symbol=symbol.toUpperCase();
        //---------------------------------------------------------
		try{ 
			$('.symbol').find('input[type=text]:eq(0)').val(symbol);
			$('.refreshQuoteBtn:eq(0)').click(); 
		}catch(e){}
        var d=new Date();
        var ct=(d.getHours()<10 ? '0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10 ? '0'+d.getMinutes():d.getMinutes())+':'+(d.getSeconds()<10 ? '0'+d.getSeconds():d.getSeconds());
		//console.info(ct);
        if( (ct>="09:57:00" && ct<="12:30:00") 
        || (ct>="14:25:00" && ct<="16:30:00")
        ){
            var p=getPortfolio(accNo);
			if(debug){ console.info(p); }
            for(var i=0;i<p.length;i++){ 
                var o=p[i];
                if(symbol==o.symbol){
					var comp=o.MP<SLP && o.availVol;
					var avgCostPrice=(o.avgCost * o.availVol);
					var avgMarketPrice=(o.MP * o.availVol);
					var fee=(avgCostPrice*0.002)+(avgMarketPrice*0.002);
					fee=fee+(fee*0.07);
					var tCost=(avgCostPrice+fee).toFixed(2);
					var profit=(avgMarketPrice-tCost).toFixed(2);
					var profitPercent=(profit/tCost).toFixed(2);

                    if(comp){
                        console.info("Stop loss !! sell all price");
                        var ret=buyOrSell(accNo,pin,"S",symbol,o.availVol,SLP,"mp");
                        console.info( ret );
                    }
                    else if(o.availVol){
						if(!eval(interval)){
							var t=parseInt(Math.random()*1000*60*2,10);
						}
						else{
							var t=eval(interval);
							window.stock={};
							window.stock[symbol]={};
							window.stock[symbol].interval=interval;
						}
                        setTimeout(function(){ 
                            calcAutoAndStopLoss(accNo,pin,symbol,percentBuyStep,percentSellStep,SLP,window.stock[symbol].interval);
                        },t);
                    }
					$('#refreshQuoteBtn').click();
					console.info(ct+"["+symbol+"]:[avgCost:"+o.avgCost+",tCost:"+tCost+"]:[P:"+profit+","+(profitPercent*100).toFixed(2)+" %]:[MP:"+o.MP+"]"+(comp ? '<':'>=')+"[SLP:"+SLP+"] && [o.availVol:"+o.availVol+"]["+"Intv:"+(t/1000).toFixed(2)+" Sec.]");
                }
            }
        }
        else if( (ct>="16:30:00") ){//ไม่ต้องทำแล้วถ้าปิดตลาด
            console.info("ปิดตลาดแล้ว !!!");
            return;
        }
        else{//พักเที่ยงให้เชคเวลาทุกๆ 5 นาที
            console.info("พักเที่ยงอยู่ !!");
            var t=1000*60*5;
            setTimeout(function(){ 
                calcAutoAndStopLoss(accNo,pin,symbol,percentBuyStep,percentSellStep,SLP);
            },t);
        }    
    }
    //calcAutoAndStopLoss('6670492','999111','TRUE',3,1,8.45);


	function help(fn){
		console.info("Stock.calcAutoAndStopLoss(accNo,pin,symbol,0,0,SLP,interval);");
		console.info("Stock.calcAutoAndStopLoss('6670492','999111','BKD',0,0,4.2,1500);");
		console.info("Stock.calcAutoAndStopLoss('6670492','999111','BKD',0,0,4.2,1500);");
		console.info("Stock.calcAutoAndStopLoss('6670492','999111','TRUE',0,0,8.40);");

		console.info("Stock.buyOrSell(accNo,pin,buyORsell,symbol,qty,price,limitORmp);");
		console.info("Stock.buyOrSell('6670492','999111','B','WINNER',1000,'5.2','limit');");
		console.info("Stock.buyOrSell('6670492','999111','B','IEC',1000,'0.03','limit');");

		console.info("Stock.cancelOrder('6670492','999111','IEC','S','','0.05');");
		console.info("Stock.calcPriceAtoAtc('TRUE')");
		console.info("Stock.getQuotes('IEC')");
		console.info("Stock.getPortfolio('6670492')");
		console.info("Stock.getTotalQty('6670492','IEC','ATO','S','Q')");
		
		console.info("Stock.autoBuySell('6670492','999111','GJS',100000,0.05,0,0.06,'atoatc',0.05);");
		console.info("Stock.autoBuySell('6670492','999111','N-PARK',100000,0.05,0,0.06,'atoatc',0.05);");
		console.info("Stock.autoBuySell('6670492','999111','IEC',100000,0.02,0,0.04,'atoatc',0.02);");
		console.info("Stock.autoBuySell('6670492','999111','WAT',100000,0.06,0,0.07,'atoatc',0.07);");
		
		console.info("Stock.autoBuySell('6670492','999111','IEC',100,0.03,100,0.04,'atoatc',cost,'test system,false=test with real data');");
		console.info("Stock.autoBuySell('6670492','999111','N-PARK',50000,0.06,50000,0.07,'atoatc',cost,'test system,false=test with real data');");
		console.info("Stock.autoBuySell('6670492','999111','ANAN',100,2.5,100,2.8,'atoatc',cost,'test system,false=test with real data');");
		console.info("Stock.autoBuySell('6670492','999111','N-PARK',100,0.06,100,0.07,'atoatc',cost,'test system,false=test with real data');");
		console.info("Stock.autoBuySell('6670492','999111','CPF',100,24.9,100,27,'atoatc',cost,'test system,false=test with real data');");
	}	
	
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function autoBuySell(accNo,pin,symbol,qtyBuy,priceBuy,qtySell,priceSell,priceType,costPrice,test){
		symbol=symbol.toUpperCase();
		priceType=priceType.toLowerCase();
		//var d=new Date();
		//var ct=d.toLocaleTimeString();
		//(ct>="09:57:00" && ct<="1:30:00") 
		//(ct>="14:25:00" && ct<="16:30:00")
		var  ex1={"sector":"ICT","last":0.03,"type":"stock","d5":"0.04 / 0.03","close":0.04,"open":0.04,"bo":["0.03","0.04",0,0.05,0,0,0,0,0,0],"mktstatus":"Closed","ticker":["16:39:56","B",64479200,0.03,"16:28:23","B",499000,0.04,"16:28:07","B",3000,0.04,"16:27:54","B",100000,0.04,"16:27:37","B",27500,0.04,"16:27:26","B",1000000,0.04,"16:27:13","B",2000000,0.04,"16:26:53","B",20000,0.04,"16:26:29","B",6800,0.04,"16:24:55","B",960500,0.04],"avg":0.04,"settleDecimal":2,"symbol":"IEC","mkt":"equity","open2":0.04,"chg":-0.010000000000000002,"pbuy":"84.60","pe":"0.00","eps":"-0.00","pchg":-25.000000000000004,"priceDecimal":2,"pbv":"4.89","floor":0.02,"bsp":[0.05,0.04,0.03],"openopendata":0,"language":"th","low":0.03,"avgbuy":"0.04","val":33.405335,"industryname":"Technology","dy":"0.00","ceil":0.04,"bsv":[4,5600,0,0,5600,6.556005201253555E-4,653,658188700,119797500,164,7.779862E8,91.08002810184801,1,64479200,11707700,10,7.61869E7,8.919316297631866],"par":"0.10","vol":854178700,"sectorbarBuy":76.77015396014747,"name":"INTERNATIONAL ENGINEERING","marketbarBuy":63.34671351414505,"psell":"15.40","avgsell":"0.04","symbolbarBuy":84.6044861572877,"openopen":"Close","mktlabel":"SET","sStatus":"","sectorname":"Information & Communication Technology","bov":[3191583500,70098100,0,4046473400,0,0,0,0,0,0],"cur":"(Baht)","high":0.05,"spread":0.01};
		var  ex2={"bo":["ATO","ATO",0.05,0.03,0.04,0.04,0.03,0.05,0,0],"bov":[2376500,5744000,360500,20000000,164720400,18900000,3401989800,5077799600,0,0],"mktstatus":"Pre-Open","open":0.04};
		var  ex3={"bo":["ATC","ATC",30.25,29,30,29.25,29.75,29.5,29.5,29.75],"bov":[18500,20500,500,100,500,537100,1041000,822100,266000,712500],"mktstatus":"Pre-Close","open":30};//Fail
		var  ex4={"bo":["ATC","ATC",0.04,0.03,0.03,0.04,0.02,0,0,0],"bov":[24123500,28842600,14513000,14800000,1452152500,4041806700,2422385500,0,0,0],"mktstatus":"Pre-Close","close":0.04};
		var  ex5={"bo":["ATC","ATC",0.04,0.03,0.03,0.04,0,0.05,0,0],"bov":[31603300,49981800,16170600,3970000,1543757600,3492214700,0,1483955500,0,0],"mktstatus":"Pre-Close","close":0.03};
		var  ex6={"bo":["ATO","ATO",0.04,0.02,0.03,0.03,0.02,0.04,0,0],"bov":[18597200,55135200,44523000,8100000,1678643800,8277700,2129375800,3413753000,0,0],"mktstatus":"Pre-Open","open":0.04};
		var  ex7={"bo":["ATC","ATC",0.05,0.03,0.04,0.04,0.03,0.05,0,0],"bov":[50208100,63535200,820100	,14750800	,42016700	,306289500	,2622343600,4052325700,0,0],"mktstatus":"Pre-Close","close":0.04};
		var  ex8={"bo":["ATC","ATC",0.05,0.03,0.04,0.04,0.03,0.05,0,0],"bov":[60520400,57648900,7662100	,401000		,722331700	,16756000	,2870695900,5263409600,0,0],"mktstatus":"Pre-Close","close":0.04};
		var  ex9={"bo":["ATC","ATC",0.05,0.03,0.04,0.04,0.03,0.05,0,0],"bov":[10227100,12550000,610000	,1750200		,50170100	,34890000	,2716930400,4720727700,0,0],"mktstatus":"Pre-Close","close":0.04};
		var ex10={"bo":["ATO","ATO",0.05,0.03,0.04,0.04,0.03,0.05,0,0],"bov":[2376500,5744000,360500	,20000000		,164720400	,18900000	,3401989800,5077799600,0,0],"mktstatus":"Pre-Open","open":0.04};
		var ex11={"bo":["ATC","ATC",0.04,0.03,0.03,0.04,0,0.05,0,0],"bov":[22555200,31997200,7283900	,5482000		,1103705300	,3577558100	,0,1009426900,0,0],"mktstatus":"Pre-Close","close":0.03};
		var ex12={"bo":["ATC","ATC",0.35,0.30,0.34,0.32,0.33,0.33,0.32,0.34],"bov":[569400,3109900,1600000	,50000		,1170000	,260000	,530000,565000,110000,232000],"mktstatus":"Pre-Close","close":0.33};
		var ex13={"bo":["ATO","ATO",0.07,0.06,0.06,0.07,0.05,0.08,0,0.09],"bov":[46199000,34346000,4003900,14380100,1704851500,2168785800,1810759900,1312753100,0,721246900],"mktstatus":"Pre-Open","open":0.06};//Fail
		var ex14={"bo":["ATO","ATO",0.07,0.05,0.06,0.06,0.05,0.07,0,0.08],"bov":[52815000,71111700,82500000,2000000,172226200,34991600,1678962200,1901505600,0,1292351100],"mktstatus":"Pre-Open","open":0.06};//Fail
		var ex15={"bo":["ATO","ATO",0.06,0.05,0.05,0.06,0,0.07,0,0],"bov":[2578300,3156000,3712700,350000,3057939200,301433800,0,1987856600,0,0],"mktstatus":"Pre-Open","open":0.06};
		var ex16={"bo":["ATO","ATO",0.06,0.04,0.05,0.05,0.04,0.06,0,0],"bov":[24642000,16299000,5100,100000,3337940500,1000500,502893400,535969000,0,0],"mktstatus":"Pre-Open","open":0.05};//Fail
		var ex17={"bo":["ATO","ATO",0.04,0.03,0.03,0.04,0,0.05,0,0],"bov":[20061000,101360100,23032000,27500000,2257826800,3204074700,0,1319633400,0,0],"mktstatus":"Pre-Open","open":0.03};
		var ex18={"bo":["ATC","ATC",0.04,0.03,0.03,0.04,0,0.05,0,0],"bov":[44541500,59953200,17561300,2725100,2043107000,3360110200,0,1350820600,0,0],"mktstatus":"Pre-Open","open":0.03};//Fail
		
		var ex19={"bo":["ATO","ATO",0.04,0.03,0.03,0.04,0.02,0,0,0],"bov":[37956200,46224600,9668200,1340000,2133015300,3316117600,1542880100,0,0,0],"mktstatus":"Pre-Open","open":0.03,"amount":0};
		var ex19={"bo":["ATO","ATO",0.04,0.03,0.03,0.04,0.02,0,0,0],"bov":[37956200,46224600,9668200,1340000,2133015300,3316117600,1542880100,0,0,0],"mktstatus":"Pre-Open","open":0.03,"amount":0};
		var ex20={"bo":["ATC","ATC",0.04,0.03,0.03,0.04,0.02,0,0,0],"bov":[34672000,53372200,7412900,25358500,1479130700,3381482200,1848139100,0,0,0],"mktstatus":"Pre-Close","close":0.03,"amount":79130700};
		var ex21={"bo":["ATC","ATC",0.04,0.02,0.03,0.03,0.02,0.04,0,0],"bov":[13421200,29387900,6111600,200000,1177173000,8950000,1853939400,3196776600,0,0],"mktstatus":"Pre-Close","close":0.03,"amount":38537900};		
		var ex22={"bo":["ATO","ATO",0.04,0.02,0.03,0.03,0.02,0.04,0,0],"bov":[20561000,23044000,17746500,100,1500762400,57010000,1502326800,3201310000,0,0],"mktstatus":"Pre-Open","open":0.03,"amount":29795100};
		var ex23={"bo":["ATC","ATC",0.04,0.03,0.03,0.04,0.02,0,0,0],"bov":[47157400,22158900,2615800,27825000,1259888200,3211754000,1454678800,0,0,0],"mktstatus":"Pre-Close","close":0.03,"amount":49983900};
		var ex24={"bo":["ATC","ATC",0.06,0.05,0.05,0.06,0.04,0,0,0],"bov":[22664700,19875200,9330400,4600000,2471985200,200375000,189973400,0,0,0],"mktstatus":"Pre-Close","close":0.06,"amount":31995100};//N-PARK ราคาถูกแต่จำนวนผิด
		var ex25={"bo":["ATC","ATC",0.33,0.31,0.32,0.32,0.31,0.33,0.30,0.34],"bov":[97500,515000,30000,115000,883800,250000,14993600,2804200,11601000,2485900],"mktstatus":"Pre-Close","close":0.32,action:"buy","amount":880000};//TWZ
		var ex26={"bo":["ATO","ATO",0.06,0.05,0.05,0.06,0.04,0,0,0],"bov":[19572900,14622000,6078400,2000000,2502879600,632998400,509908300,0,0,0],"mktstatus":"Pre-Open","open":0.06,action:"buy","amount":25651300};//N-PARK ถูกต้องเป๊ะ
		
		var sample=test ? eval(test):null;
		console.debug("--------------------------------");
		console.debug("autoBuySell("+accNo+",***," + symbol + "," + qtyBuy + "," + priceBuy + "," + qtySell + "," + priceSell + ","+priceType+")");
		var atoAtc=calcPriceAtoAtc(symbol,sample);
		console.info(atoAtc);
		console.info("[costPrice:"+costPrice+" "+(costPrice>atoAtc.atoatcPrice ? '>':'<=')+" "+atoAtc.atoatcPrice+":atoatcPrice]");

		var BS=atoAtc.buy ? 'S':'B';//หากเกิดสัญญาณให้ซื้อถ้ามีควรที่จะขาย
		if(costPrice>atoAtc.atoatcPrice){ BS='B'; }else{ BS='S'; }//ถ้าต้นทุน > ato/atc ให้ซื้อถัวเฉลี่ยแทนนอกนั้นขาย
		var BSI=BS=='B' ? 'S':'B';
		var preTime=(priceType=='atoatc' || priceType=='ato' || priceType=='atc') && (atoAtc.stock.mktstatus.indexOf('Pre')!=-1);
		var preCode=atoAtc.stock.mktstatus=='Pre-Open1' || atoAtc.stock.mktstatus=='Pre-Open2' ? 'ATO':'ATC';
		
		
		if(preTime){
			console.info("Should "+BS);
			if(test || test===false){ console.info("Test AOT/ATC only");return; }
			
			if(BS=='S'){//Should Sell
				var ret=Stock.cancelOrder(accNo,pin,symbol,BSI,'',preCode);
				var totalCountQtySell=Stock.getTotalQty(accNo,symbol,preCode,'S','Q');
				console.debug("totalCountQtySell:"+totalCountQtySell);
				if(totalCountQtySell<=qtySell){
					if((qtySell-totalCountQtySell)>0){
						console.info("Sell !!");//Sell
						Stock.buyOrSell(accNo,pin,BS,symbol,qtySell-totalCountQtySell,0,'atoatc');
					}
					else{
						console.error("Over stock "+symbol+" for sell !!");
					}
				}
			}
			else if(BS=='B'){//Should Buy
				var ret=Stock.cancelOrder(accNo,pin,symbol,BSI,'',preCode);
				var totalCountQtyBuy=Stock.getTotalQty(accNo,symbol,preCode,'B','Q');
				console.debug("totalCountQtyBuy:"+totalCountQtyBuy);
				if(totalCountQtyBuy<qtyBuy){
					if((qtyBuy-totalCountQtyBuy)>0){
						console.info("Buy !!");
						Stock.buyOrSell(accNo,pin,BS,symbol,qtyBuy-totalCountQtyBuy,0,'atoatc');
					}
					else{
						console.info("Full QTY Buy "+symbol+":"+qtyBuy);
					}
				}
			}
		
			var t=parseInt(Math.random()*500,10)+500;//not over 1.5 sec.
			var time=$('#interval').length ? int($("#interval").find(":selected").val()):t;
			if(time!=0){
				setTimeout(" Stock.autoBuySell('"+accNo+"','" + pin + "','" + symbol + "'," + qtyBuy + ",'" + priceBuy + "'," + qtySell + ",'" + priceSell + "','"+priceType+"',"+costPrice+"); ",time);
			}
		}
		else{
		   console.debug("This market "+atoAtc.stock.mktstatus);
		}
	}
	//autoBuySell('6670492','999111','IEC',100,0.04,100,0.05,'atoatc');

	function calcPriceType2(atoAtc,b){
		atoAtc.stock.flag=[0,0,0,0,0,0,0,0,0,0];
		console.debug("calcPriceType(atoAtc,b):START");
		for(var k=0;k<10;k+=2){
			var bv=int(b.bov[k]);
			var ov=int(b.bov[k+1]);
			var bp=float(b.bo[k]);
			var op=float(b.bo[k+1]);
			
			if(k==0){
				//step 0
				var balanceVol=ov - bv;//Offer - Bid = balance
				if(bv < ov){
					atoAtc.buy=false;
					atoAtc.sell=true;
					console.info("Sell signal");
					console.debug("("+k+") Offer "+(k==0 ? 'volume:'+ov:'balance:'+balanceVol)+" Sell for bid volume:"+bv+" at price:"+bp+", Offer balance:"+balanceVol);
					console.debug("Bid volume:"+bv+" Buy with fully volume as last matching price");
					$(".volOffer:eq(0)").css('background-color','red');
				}
				else if(bv > ov){
					atoAtc.buy=true;
					atoAtc.sell=false;
					console.info("Buy signal");
					console.debug("("+k+") Bid "+(k==0 ? 'volume:'+ov:'balance:'+balanceVol)+" Buy for offer volume:"+bv+" at price:"+bp+", Bid balance:"+balanceVol);
					console.debug("Offer volume:"+ov+" Sell with fully volume as last matching price");
					$(".volBid:eq(0)").css('background-color','green');
				}
				else{
					console.info("Not sure !!!!!");
					atoAtc.buy=false;
					atoAtc.sell=false;
				}
				atoAtc.stock.flag[0]=1;
				atoAtc.stock.flag[1]=1;
			}
			else if(0 < balanceVol){
				atoAtc.stock.flag[k]=1;
				//step 1 try to sell until offer volume is = 0
				console.debug("0 < ["+balanceVol+":balanceVol],Buy < Sell");
				tmp = (balanceVol - bv);
				console.debug("("+k+") Offer "+(k==0 ? 'volume:'+ov:'balance:'+balanceVol)+" Sell for bid volume:"+bv+" at price:"+bp+", "+(tmp < 0 ? "Bid balance:"+(tmp*-1):"Offer balance:"+tmp));
				console.debug((tmp < 0 ? "Bid volume:":"Offer volume:")+(tmp < 0 ? tmp*-1:tmp)+" with fully volume as last matching price");
				balanceVol = balanceVol - bv;
				//alert(k/2);
				$(".volBid:eq("+k/2+")").css('background-color',balanceVol > 0 ? '#FF6600':'green');
			}
			else if(0 > balanceVol){
				//step 2 bid mode
				console.debug("0 > ["+balanceVol+":balanceVol], Buy > Sell");
				var bx=float(b.bo[k-2]);
				var j=0;
				var i=0;
				for(i=1;atoAtc.stock.flag[i]==1;i+=2){}//find next offer
				for(;i<10;i+=2){
					atoAtc.stock.flag[i]=1;
					j++;
					//alert(j);
					$(".volOffer:eq("+j+")").css('background-color','#99FF66');
					var balanceVolR=(balanceVol*-1);
					balanceVol=(balanceVolR-int(b.bov[i]))*-1;
					if(balanceVol==0){
						console.debug("["+balanceVol+":balanceVol]==0");
					}
					else if(0 < balanceVol){
						//step 4 offer mode
						console.debug("0 < ["+balanceVol+":balanceVol]");
						var m=0;
						for(m=0;atoAtc.stock.flag[m]==1;m+=2){}//find next bid
						for(;m<10;m+=2){
							atoAtc.stock.flag[m]=1;
							$(".volBid:eq("+m/2+")").css('background-color',balanceVol > 0 ? '#FF6600':'green');
							//alert("atoAtc.stock.bov["+m+"]="+atoAtc.stock.bov[m]+",atoAtc.stock.bo["+m+"]="+atoAtc.stock.bo[m]+",balanceVol:"+balanceVol);
							balanceVol=balanceVol - int(b.bov[m]);
							console.debug("balanceVol:"+balanceVol);
							if(0 > balanceVol){
								//bid mode
							}
							else if(0 < balanceVol){
								//offer mode
							}
							else{

							}
							break;
						}
						break;
					}
					else if(0 > balanceVol){
						//step 3 bid mode
						console.debug("0 > ["+balanceVol+":balanceVol]");
						console.debug("("+k+") Bid:"+bx+" with volume:"+balanceVolR+", Buy offer:"+float(b.bo[i])+" with volume:"+int(b.bov[i])+", Bid balance:"+(balanceVol*-1));
						by=float(b.bo[i]);
					}
				}
				break;
			}
			else if(bv == balanceVol){//balanceVol = 0
				console.debug("["+balanceVol+":balanceVol] == 0");				
			}
		}
		console.debug("calcPriceType(atoAtc,b):END");
	}

	function calcPriceType(atoAtc,b){
		console.debug("calcPriceType(atoAtc,b):START");
		console.info("(3) ในกรณีที่ราคาตาม (2) มีมากกว่าหนึ่งราคา ให้ใช้ราคา ดังต่อไปนี้");
		if(atoAtc.bidVol>atoAtc.offerVol){
			atoAtc.buy=true;
			atoAtc.sell=false;
			console.info("Maximum Executable Volume & Minimum Imbalance");
			console.info("ATO/ATC เป็น Bid : ระบบการซื้อขายจะเทียบ ระหว่าง Bid สูงสุด+1 tick และ Offer สูงสุด และเลือกราคาที่สูงกว่า");
			console.info("Buy signal");
			for(var i=2;i<b.bo.length;i+=2){
				if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
					var p=float(b.bo[i]);
					var stepPrice=Stock.getPriceStep(p);
					atoAtc.maxBid=float(p+stepPrice);//Bid สูงสุด+1 tick
					console.debug("MaxBid:"+p);
					console.debug("Bid สูงสุด+1 tick:"+atoAtc.maxBid);
					break;
				}
			}
			
			for(var i=9;i>0;i-=2){
				if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
					atoAtc.maxOffer=float(b.bo[i]);
					console.debug("MaxOffer:"+atoAtc.maxOffer);
					break;
				}
			}
			
			//เลือกราคาที่สูงกว่า
			atoAtc.atoatcPrice=atoAtc.maxBid>atoAtc.maxOffer ? atoAtc.maxBid:atoAtc.maxOffer;
		}
		else if(atoAtc.bidVol==atoAtc.offerVol){
			atoAtc.buy=true;
			atoAtc.sell=false;
			console.info("3.1 หากมีจำนวนเสนอซื้อรวมมากกว่าจำนวนเสนอขายรวม (Positive Imbalance) ทุกระดับราคาให้ใช้ราคาตาม (2) ที่สูงที่สุด");
			//------------------------------- Bid
			var maxBidIndex=0;
			var maxBidValue=0;
			var maxBidPrice=0;
			var maxOfferIndex=0;
			var maxOfferValue=0;
			var maxOfferPrice=0;
			for(var i=2;i<9;i+=2){
				var vB0=float(b.bov[i]);
				var vO=float(b.bov[i+1]);
				var pB=float(b.bo[i]);
				var pO=float(b.bo[i+1]);
				if(vB0>maxBidValue){
					maxBidIndex=i;
					maxBidValue=vB0;
					maxBidPrice=pB;
				}
				if(vO>maxOfferValue){
					maxOfferIndex=i;
					maxOfferValue=vO;
					maxOfferPrice=pO;
				}
			}

			
			//-------------------------------
			console.debug("[BidVal:"+maxBidValue+",BidPrice:"+maxBidPrice+"],[OfferVal:"+maxOfferValue+",OfferPrice:"+maxOfferPrice+"]");
			if(maxBidValue>maxOfferValue){
				atoAtc.buy=true;
				atoAtc.sell=false;
				console.info("ใช้ราคาฝั่ง Bid");
				var pB=float(b.bov[maxBidIndex]);
				var pO=float(b.bov[maxBidIndex+1]);
				var maxBid=0;
				var maxOffer=0;
				for(var i=2;i<b.bo.length;i+=2){
					if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
						var p=float(b.bo[i]);
						var stepPrice=Stock.getPriceStep(p);
						maxBid=float(p+stepPrice);//Bid สูงสุด+1 tick
						console.debug("MaxBid:"+p);
						console.debug("Bid สูงสุด+1 tick:"+maxBid);
						break;
					}
				}

				for(var i=9;i>0;i-=2){
					if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
						maxOffer=float(b.bo[i]);
						console.debug("MaxOffer:"+maxOffer);
						break;
					}
				}
				console.info("MaxBid:"+maxBid+",MaxOffer:"+maxOffer);
				atoAtc.atoatcPrice=maxBid;
			}
			else if(maxBidValue<maxOfferValue){
				console.info("3.2 หากมีจำนวนเสนอขายรวมมากกว่าจำนวนเสนอซื้อรวม (Negative Imbalance) ทุกระดับราคาให้ใช้ราคาตาม (2) ที่ต่ำที่สุด");
				atoAtc.buy=false;
				atoAtc.sell=true;
				console.info("ใช้ราคาฝั่ง Offer");
				var pB=float(b.bov[maxOfferIndex]);
				var pO=float(b.bov[maxOfferIndex+1]);
				
				var minBid=0;
				var minOffer=0;
				for(var i=8;i>0;i-=2){
					if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
						var p=float(b.bo[i]);
						minBid=float(p);
						console.debug("MinBid:"+p);
						break;
					}
				}

				for(var i=3;i<b.bo.length;i+=2){
					if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
						minOffer=float(b.bo[i]);
						var stepPrice=Stock.getPriceStep(minOffer);
						console.debug("MinOffer:"+minOffer);
						minOffer=float(minOffer-stepPrice);
						console.debug("Min Offer-1 tick:"+minOffer);
						break;
					}
				}
				console.info("MinBid:"+minBid+",MinOffer:"+minOffer);
				atoAtc.atoatcPrice=minOffer;
			}
			else{
				atoAtc.buy=false;
				atoAtc.sell=false;
				console.error("ไม่เข้าเงื่อนไข");
				atoAtc.atoatcPrice=0;
			}
		}
		else if(atoAtc.bidVol<atoAtc.offerVol){
			atoAtc.buy=false;
			atoAtc.sell=true;
			console.info("3.2 หากมีจำนวนเสนอขายรวมมากกว่าจำนวนเสนอซื้อรวม (Negative Imbalance) ทุกระดับราคาให้ใช้ราคาตาม (2) ที่ต่ำที่สุด");
			console.info("Sell signal (ATO/ATC เป็น Offer : ระบบการซื้อขายจะเทียบ ระหว่าง Offer ต่ำสุด-1 tick และ Bid ต่ำสุด และเลือกราคาที่ต่ำกว่า)");
			for(var i=8;i>0;i-=2){
				if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
					atoAtc.minBid=float(b.bo[i]);
					console.debug("MinBid:"+atoAtc.minBid);
					break;
				}
			}
			
			for(var i=3;i<9;i+=2){
				if(b.bov[i]>0){//ดูว่ามี vol เสนอเข้ามาหรือไม่
					var stepPrice=Stock.getPriceStep(b.bo[i]);
					atoAtc.minOffer=(float(b.bo[i])-stepPrice);//Bid สูงสุด-1 tick
					atoAtc.minOffer=float(atoAtc.minOffer);
					console.debug("Bid สูงสุด-1 tick:{"+float(b.bo[i])+"-"+stepPrice+"}:"+atoAtc.minOffer);
					console.debug("MinOffer:"+atoAtc.minOffer);
					break;
				}
			}
			
			//เลือกราคาที่ต่ำกว่า
			atoAtc.atoatcPrice=atoAtc.minBid<atoAtc.minOffer ? atoAtc.minBid:atoAtc.minOffer;
		}
		console.debug("calcPriceType(atoAtc,b):END");
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	function calcPriceAtoAtc(symbol,sample){		
		console.info("----------------------------- ATO/ATC Calculator:START");
		var b={};
		if(sample){ 
			b=sample;
			//use sample data
			try{
				for(var i=0;i<5;i++){
					$('.volBid:eq('+i+')').text(b.bov[i*2]);
					$('.volOffer:eq('+i+')').text(b.bov[((i*2)+1)]);
				
					$('.bid:eq('+i+')').text(b.bo[i*2]);
					$('.offer:eq('+i+')').text(b.bo[((i*2)+1)]);    
				}
				$('.time,.side,.volume,.price').empty();
			}catch(e){}
		}else{ b=Stock.getQuotes(symbol); }
		
		setHisStock(symbol,b);
		
		var atoAtc={};
		atoAtc.stock=b;
		atoAtc.totalEffect=0;
		var pchg=b.pchg;//% change

		var vB0=int(b.bov[0]);
		var pB0=float(b.bo[0]);

		var vS1=int(b.bov[1]);
		var pS1=float(b.bo[1]);
		
		var vB2=int(b.bov[2]);
		var pB2=float(b.bo[2]);

		var vS3=int(b.bov[3]);
		var pS3=float(b.bo[3]);

		var vB4=int(b.bov[4]);
		var pB4=float(b.bo[4]);

		var vS5=int(b.bov[5]);
		var pS5=float(b.bo[5]);

		var vB6=int(b.bov[6]);
		var pB6=float(b.bo[6]);

		var vS7=int(b.bov[7]);
		var pS7=float(b.bo[7]);

		var vB8=int(b.bov[8]);
		var pB8=float(b.bo[8]);

		var vS9=int(b.bov[9]);
		var pS9=float(b.bo[9]);

		
		//====================================================== 2014-01-02
		var path="";
		var balance=0;
		function setRoutingPath(path,newPath){
			path+=","+newPath;
			return path;
		}

		function switchSellToBuy(
			atoAtc,path,balance,pSrcName,info
			,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
			,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
		){
			//---------------------------------------------------------
			if(eval(pSrcName) >= pS3 && balance > 0){
				//-----------
				setInfo(info[0]);
				console.info(setRoutingPath(path,"pS3"));
				setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pS3',pS3);
				atoAtc.atoatcPrice=pS3;
				atoAtc.buy=false;atoAtc.sell=true;
				
				if(balance >= vS3){
					atoAtc.totalEffect+=vS3;
					balance=int(balance-vS3);
					console.info(msgBalance+"("+balance+") >= vS3("+vS3+")");
					setTotalEffect(atoAtc.totalEffect);
					
					//---------------------------------------------------------
					if(eval(pSrcName) >= pS5 && balance > 0){
						//-----------
						setInfo(info[1]);
						console.info(setRoutingPath(path,"pS5"));
						setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pS5',pS5);
						atoAtc.atoatcPrice=pS5;
						atoAtc.buy=false;atoAtc.sell=true;
						
						if(balance >= vS5){
							atoAtc.totalEffect+=vS5;
							balance=int(balance-vS5);
							console.info(msgBalance+"("+balance+") >= vS5("+vS5+")");
							setTotalEffect(atoAtc.totalEffect);
							
							//---------------------------------------------------------
							if(eval(pSrcName) >= pS7 && balance > 0){
								//-----------
								setInfo(info[2]);
								console.info(setRoutingPath(path,"pS7"));
								setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pS7',pS7);
								atoAtc.atoatcPrice=pS7;
								atoAtc.buy=false;atoAtc.sell=true;
								
								if(balance >= vS7){
									atoAtc.totalEffect+=vS7;
									balance=int(balance-vS7);
									console.info(msgBalance+"("+balance+") >= vS7("+vS7+")");
									setTotalEffect(atoAtc.totalEffect);
									
									//---------------------------------------------------------
									if(eval(pSrcName) >= pS9 && balance > 0){
										//-----------
										setInfo(info[3]);
										console.info(setRoutingPath(path,"pS9"));
										setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pS9',pS9);
										atoAtc.atoatcPrice=pS9;
										atoAtc.buy=false;atoAtc.sell=true;
										
										if(balance >= vS9){
											atoAtc.totalEffect+=vS9;
											balance=int(balance-vS9);
											console.info(msgBalance+"("+balance+") >= vS9("+vS9+")");
											setTotalEffect(atoAtc.totalEffect);
											
											setInfo("=========================================================");
										}
										else{
											atoAtc.totalEffect+=balance;
											balance=0;
											setTotalEffect(atoAtc.totalEffect);
											setInfo("=========================================================");
										}
									}
									else{
										setInfo("("+pSrcName+"("+eval(pSrcName)+") < pS9("+pS9+")) || balance("+balance+") <= 0");
										setInfo("=========================================================");
									}
									//---------------------------------------------------------
								}
								else{
									atoAtc.totalEffect+=balance;
									balance=0;
									setTotalEffect(atoAtc.totalEffect);
									setInfo("=========================================================");
								}
							}
							else{
								setInfo("("+pSrcName+"("+eval(pSrcName)+") < pS7("+pS7+")) || balance("+balance+") <= 0");
								setTotalEffect(atoAtc.totalEffect);
								setInfo("=========================================================");
							}
							//---------------------------------------------------------
						}
						else{
							atoAtc.totalEffect+=balance;
							balance=0;
							setTotalEffect(atoAtc.totalEffect);
							setInfo("=========================================================");
						}
					}
					else{
						setInfo("("+pSrcName+"("+eval(pSrcName)+") < pS5("+pS5+")) || balance("+balance+") <= 0");
						setTotalEffect(atoAtc.totalEffect);
						setInfo("=========================================================");
					}
					//---------------------------------------------------------
				}
				else{
					atoAtc.totalEffect+=balance;
					balance=0;
					setTotalEffect(atoAtc.totalEffect);
					setInfo("=========================================================");
				}
			}
			else{
				setInfo("("+pSrcName+"("+eval(pSrcName)+") < pS3("+pS3+")) || balance("+balance+") <= 0");
				setInfo("=========================================================");
			}
			//---------------------------------------------------------
			atoAtc.balance=balance;
			return atoAtc;
		}
		
		function switchBuyToSell(
			atoAtc,path,balance,pSrcName,info
			,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
			,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
		){
			//---------------------------------------------------------
			if(eval(pSrcName) <= pB2 && balance > 0){
				//-----------
				setInfo(info[0]);
				console.info(setRoutingPath(path,"pB2"));
				setMsgBlance(atoAtc,pSrcName,eval(pSrcName),"<=",'pB2',pB2);
				atoAtc.atoatcPrice=pB2;
				atoAtc.buy=true;atoAtc.sell=false;
				
				if(balance >= vB2){
					atoAtc.totalEffect+=vB2;
					balance=int(balance-vB2);
					setInfo(msgBalance+"("+balance+") >= vB2("+vB2+")");
					setTotalEffect(atoAtc.totalEffect);
					
					//---------------------------------------------------------
					if(eval(pSrcName) <= pB4 && balance > 0){
						//-----------
						setInfo(info[1]);
						setInfo(setRoutingPath(path,"pB4"));
						setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pB4',pB4);
						atoAtc.atoatcPrice=pB4;
						atoAtc.buy=true;atoAtc.sell=false;
						
						if(balance >= vB4){
							atoAtc.totalEffect+=vB4;
							balance=int(balance-vB4);
							setInfo(msgBalance+"("+balance+") >= vB4("+vB4+")");
							setTotalEffect(atoAtc.totalEffect);
							
							//---------------------------------------------------------
							if(eval(pSrcName) <= pB6 && balance > 0){
								//-----------
								setInfo(info[2]);
								setInfo(setRoutingPath(path,"pB6"));
								setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pB6',pB6);
								atoAtc.atoatcPrice=pB6;
								atoAtc.buy=true;atoAtc.sell=false;
								
								if(balance >= vB6){
									atoAtc.totalEffect+=vB6;
									balance=int(balance-vB6);
									setInfo(msgBalance+"("+balance+") >= vB6("+vB6+")");
									setTotalEffect(atoAtc.totalEffect);
									
									//---------------------------------------------------------
									if(eval(pSrcName) <= pB8 && balance > 0){
										//-----------
										setInfo(info[3]);
										setInfo(setRoutingPath(path,"pB8"));
										setMsgBlance(atoAtc,pSrcName,eval(pSrcName),">=",'pB8',pB8);
										atoAtc.atoatcPrice=pB8;
										atoAtc.buy=true;atoAtc.sell=false;
										
										if(balance >= vB8){
											atoAtc.totalEffect+=vB8;
											balance=int(balance-vB8);
											setInfo(msgBalance+"("+balance+") >= vB8("+vB8+")");
											setTotalEffect(atoAtc.totalEffect);
											
											setInfo("=========================================================");
										}
										else{
											atoAtc.totalEffect+=balance;
											balance=0;
											setTotalEffect(atoAtc.totalEffect);
											setInfo("=========================================================");
										}
									}
									else{
										setInfo("("+pSrcName+"("+eval(pSrcName)+") < pB8("+pB8+")) || balance("+balance+") <= 0");
										setInfo("=========================================================");
									}
									//---------------------------------------------------------
								}
								else{
									atoAtc.totalEffect+=balance;
									balance=0;
									setTotalEffect(atoAtc.totalEffect);
									setInfo("=========================================================");
								}
							}
							else{
								setInfo("("+pSrcName+"("+eval(pSrcName)+") < pB6("+pB6+")) || balance("+balance+") <= 0");
								setTotalEffect(atoAtc.totalEffect);
								setInfo("=========================================================");
							}
							//---------------------------------------------------------
						}
						else{
							atoAtc.totalEffect+=balance;
							balance=0;
							setTotalEffect(atoAtc.totalEffect);
							setInfo("=========================================================");
						}
					}
					else{
						setInfo("("+pSrcName+"("+eval(pSrcName)+") < pB4("+pB4+")) || balance("+balance+") <= 0");
						setTotalEffect(atoAtc.totalEffect);
						setInfo("=========================================================");
					}
					//---------------------------------------------------------
				}
				else{
					atoAtc.totalEffect+=balance;
					balance=0;
					setTotalEffect(atoAtc.totalEffect);
					setInfo("=========================================================");
				}
			}
			else{
				setInfo("("+pSrcName+"("+eval(pSrcName)+") > pB2("+pB2+")) || balance("+balance+") <= 0");
				setInfo("=========================================================");
			}
			//---------------------------------------------------------
			atoAtc.balance=balance;
			return atoAtc;
		}
		//====================================================== 2014-01-02
		
		
		
		//----------------------------------------------------------------
		if(
			(
			   (b.mktstatus=='Open1') 
			|| (b.mktstatus=='Open2')
			|| (b.mktstatus=='Off Hour')
			|| (b.mktstatus=='Closed')
			|| (b.mktstatus=='Pre-Open')
			|| (b.mktstatus=='Pre-Open1')
			|| (b.mktstatus=='Intermission')
			|| (b.mktstatus=='Pre-Open2')
			|| (b.mktstatus=='Pre-close')
			|| (b.mktstatus=='Pre-Close')
			) 
			&& 1
		){
			setInfo("Market "+b.mktstatus);
			setInfo("------------------------------ START ทดสอบการคำนวณราคา ATO/ATC");
			var labelTotalBuySell="รวมยอด";
			
			//#############################################################################################
			if(vB0 == vS1){
				atoAtc.atoatcPrice=0;
				atoAtc.totalEffect=0;
				setInfo("Not complete for this case");
			}
			else if(vB0 < vS1){//Sell
				//-----------
				setInfo("SELL !!");
				setInfo("1A");
				atoAtc.buy=false;
				atoAtc.sell=true;
				setInfo(setRoutingPath(path,"vS1,vB0"));
				setMsgBlance(atoAtc,'vB0',vB0,"<",'vS1',vS1);
				balance=int(vS1-vB0);
				atoAtc.totalEffect+=vB0;
				setMsgBlance(atoAtc,'vS1',vS1,"-",'vB0',vB0,'='+balance);
				setTotalEffect(atoAtc.totalEffect);
				//---------------------------------------------------------
				if(vB2 <= balance){
					//-----------
					setInfo("1G");
					setInfo(setRoutingPath(path,"vB2"));
					setMsgBlance(atoAtc,'vB2',vB2,"<=",'vS1',balance);
					if(pB2 != 0){ atoAtc.atoatcPrice=pB2; }
					atoAtc.buy=true;atoAtc.sell=false;
					
					atoAtc.totalEffect+=vB2;
					balance=int(balance-vB2);
					setMsgBlance(atoAtc,'vS1',vS1,"-",'vB2',vB2,'='+balance);
					setTotalEffect(atoAtc.totalEffect);
					//---------------------------------------------------------
					if(vB4 <= balance){
						//-----------
						setInfo("1L");
						setInfo(setRoutingPath(path,"vB4"));
						setMsgBlance(atoAtc,'vB4',vB4,"<=",'vS1',balance);
						if(pB4 != 0){ atoAtc.atoatcPrice=pB4; }
						atoAtc.buy=true;atoAtc.sell=false;
						
						atoAtc.totalEffect+=vB4;
						balance=int(balance-vB4);
						setMsgBlance(atoAtc,'vS1',vS1,"-",'vB4',vB4,'='+balance);
						setTotalEffect(atoAtc.totalEffect);
						//---------------------------------------------------------
						if(vB6 <= balance){
							//-----------
							setInfo("1Q");
							setInfo(setRoutingPath(path,"vB6"));
							setMsgBlance(atoAtc,'vB6',vB6,"<=",'vS1',balance);
							if(pB6 != 0){ atoAtc.atoatcPrice=pB6; }
							atoAtc.buy=true;atoAtc.sell=false;
							
							atoAtc.totalEffect+=vB6;
							balance=int(balance-vB6);
							setMsgBlance(atoAtc,'vS1',vS1,"-",'vB6',vB6,'='+balance);
							setTotalEffect(atoAtc.totalEffect);
							//---------------------------------------------------------
							if(vB8 <= balance){
								//-----------
								setInfo("1Q--Last");
								setInfo(setRoutingPath(path,"vB8"));
								setMsgBlance(atoAtc,'vB8',vB8,"<=",'vS1',balance);
								if(pB8 != 0){ atoAtc.atoatcPrice=pB8; }
								atoAtc.buy=true;atoAtc.sell=false;
								
								atoAtc.totalEffect+=vB8;
								balance=int(balance-vB8);
								setMsgBlance(atoAtc,'vS1',vS1,"-",'vB8',vB8,'='+balance);
								setTotalEffect(atoAtc.totalEffect);
								setInfo("This the last -------------------");
							}
							else{//(vB8 > balance)
								//-----------
								atoAtc=switchSellToBuy(
									atoAtc,path,balance,'pB8',['1R','1S','1T','1U']
									,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
									,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
								);
							}
							//---------------------------------------------------------
						}
						else{//(vB6 > balance)
							//-----------
							atoAtc=switchSellToBuy(
								atoAtc,path,balance,'pB6',['1M','1N','1O','1P']
								,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
								,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
							);
						}
						//---------------------------------------------------------
					}
					else{//(vB4 > balance)
						//-----------
						setInfo("1H");
						setInfo(setRoutingPath(path,"vB4"));
						setMsgBlance(atoAtc,'vB4',vB4,">",'vS1',balance);
						if(pB4 != 0){ atoAtc.atoatcPrice=pB4; }
						atoAtc.buy=true;atoAtc.sell=false;
						
						atoAtc.totalEffect+=balance;
						setMsgBlance(atoAtc,'vB4',vB4,"-",'balance(vS1)',balance,'='+(vB4-balance));
						balance=int(vB4-balance);
						setTotalEffect(atoAtc.totalEffect);
						
						atoAtc=switchSellToBuy(
							atoAtc,path,balance,'pB4',['1H','1I','1J','1K']
							,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
							,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
						);
					}
					//---------------------------------------------------------
				}
				else{//(vB2 > balance)
					//-----------
					setInfo("1B");
					setInfo(setRoutingPath(path,"vB2"));
					setMsgBlance(atoAtc,'vB2',vB2,">",'vS1',balance);
					if(pB2 != 0){ atoAtc.atoatcPrice=pB2; }
					atoAtc.buy=true;atoAtc.sell=false;
					
					atoAtc.totalEffect+=balance;
					setMsgBlance(atoAtc,'vB2',vB2,"-",'balance(vS1)',balance,'='+(vB2-balance));
					balance=int(vB2-balance);
					setTotalEffect(atoAtc.totalEffect);
					
					atoAtc=switchSellToBuy(
						atoAtc,path,balance,'pB2',['1C','1D','1E','1F']
						,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
						,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
					);
				}
				//---------------------------------------------------------
			}
			else{//Buy
				//-----------
				setInfo("BUY :)");
				setInfo("2A");
				atoAtc.buy=true;
				atoAtc.sell=false;
				setInfo(setRoutingPath(path,"vB0,vS1"));
				setMsgBlance(atoAtc,'vB0',vB0,">",'vS1',vS1);
				balance=int(vB0-vS1);
				atoAtc.totalEffect+=vS1;
				setMsgBlance(atoAtc,'vB0',vB0,"-",'vS1',vS1,'='+balance);
				setTotalEffect(atoAtc.totalEffect);
				//---------------------------------------------------------
				if(balance >= vS3){
					//-----------
					setInfo("2G");
					setInfo(setRoutingPath(path,"vS3"));
					setMsgBlance(atoAtc,'vB0',balance,">=",'vS3',vS3);
					if(pS3 != 0){ atoAtc.atoatcPrice=pS3; }
					atoAtc.buy=false;atoAtc.sell=true;
					
					atoAtc.totalEffect+=vS3;
					balance=int(balance-vS3);
					setMsgBlance(atoAtc,'vB0',vB0,"-",'vS3',vS3,'='+balance);
					setTotalEffect(atoAtc.totalEffect);
					//---------------------------------------------------------
					if(balance >= vS5){
						//-----------
						setInfo("2L");
						setInfo(setRoutingPath(path,"vS5"));
						setMsgBlance(atoAtc,'vB0',balance,">=",'vS5',vS5);
						if(pS5 != 0){ atoAtc.atoatcPrice=pS5; }
						atoAtc.buy=false;atoAtc.sell=true;
						
						atoAtc.totalEffect+=vS5;
						balance=int(balance-vS5);
						setMsgBlance(atoAtc,'vB0',vB0,"-",'vS5',vS5,'='+balance);
						setTotalEffect(atoAtc.totalEffect);
						//---------------------------------------------------------
						if(balance >= vS7){
							//-----------
							setInfo("2Q");
							setInfo(setRoutingPath(path,"vS7"));
							setMsgBlance(atoAtc,'vB0',balance,">=",'vS7',vS7);
							if(pS7 != 0){ atoAtc.atoatcPrice=pS7; }
							atoAtc.buy=false;atoAtc.sell=true;
							
							atoAtc.totalEffect+=vS7;
							balance=int(balance-vS7);
							setMsgBlance(atoAtc,'vB0',vB0,"-",'vS7',vS7,'='+balance);
							setTotalEffect(atoAtc.totalEffect);
							//---------------------------------------------------------
							if(balance >= vS9){
								//-----------
								setInfo("2Q--Last");
								setInfo(setRoutingPath(path,"vS9"));
								setMsgBlance(atoAtc,'vB0',balance,">=",'vS9',vS9);
								if(pS9 != 0){ atoAtc.atoatcPrice=pS9; }
								atoAtc.buy=false;atoAtc.sell=true;
								
								atoAtc.totalEffect+=vS9;
								balance=int(balance-vS9);
								setMsgBlance(atoAtc,'vB0',vB0,"-",'vS9',vS9,'='+balance);
								setTotalEffect(atoAtc.totalEffect);
								setInfo("This the last -------------------");
							}
							else{//(balance < vS9)
								//-----------
								atoAtc=switchBuyToSell(
									atoAtc,path,balance,'pS9',['2R','2S','2T','2U']
									,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
									,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
								);
							}
							//---------------------------------------------------------
						}
						else{//(balance < vS7)
							//-----------
							atoAtc=switchBuyToSell(
								atoAtc,path,balance,'pS7',['2M','2N','2O','2P']
								,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
								,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
							);
						}
						//---------------------------------------------------------
					}
					else{//(balance < vS5)
						//-----------
						setInfo("2H");
						setInfo(setRoutingPath(path,"vS5"));
						setMsgBlance(atoAtc,'vB0',balance,"<",'vS5',vS5);
						if(pS5 != 0){ atoAtc.atoatcPrice=pS5; }
						atoAtc.buy=false;atoAtc.sell=true;
						
						atoAtc.totalEffect+=balance;
						setMsgBlance(atoAtc,'vS5',vS5,"-",'balance(vB0)',balance,'='+(vS5-balance));
						balance=int(vS5-balance);
						setTotalEffect(atoAtc.totalEffect);
						
						atoAtc=switchBuyToSell(
							atoAtc,path,balance,'pS5',['2H','2I','2J','2K']
							,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
							,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
						);
					}
					//---------------------------------------------------------
				}
				else{//(balance < vS3)
					//-----------
					setInfo("2B");
					setInfo(setRoutingPath(path,"vS3"));
					setMsgBlance(atoAtc,'vS3',vS3,">",'vS1',balance);
					if(pS3 != 0){ atoAtc.atoatcPrice=pS3; }
					atoAtc.buy=false;atoAtc.sell=true;
					
					atoAtc.totalEffect+=balance;
					setMsgBlance(atoAtc,'vS3',vS3,"-",'balance(vS1)',balance,'='+(vS3-balance));
					balance=int(vS3-balance);
					setTotalEffect(atoAtc.totalEffect);
					
					atoAtc=switchBuyToSell(
						atoAtc,path,balance,'pS3',['2C','2D','2E','2F']
						,pB0,pB2,pB4,pB6,pB8,pS1,pS3,pS5,pS7,pS9
						,vB0,vB2,vB4,vB6,vB8,vS1,vS3,vS5,vS7,vS9
					);
				}
				//---------------------------------------------------------
			}
			//#############################################################################################			
			
			setInfo("------------------------------ END ทดสอบการคำนวณราคา ATO/ATC");
		}
		else if(b.mktstatus=='Closed'){
			setInfo("Market "+b.mktstatus);
		}
		setInfo("----------------------------- ATO/ATC Calculator:END");		

		function setInfo(s){
			console.info(s);
		}
		function setTotalEffect(s){
			console.log("จำนวนซื้อขายสะสม:"+s);
		}
		function setMsgBlance(atoAtc,bN,b,op,sN,s,last){
			console.log("เหลือจากการทำรายการ "+bN+"("+b+") "+op+" "+sN+"("+s+") "+(last ? last:''));
		}		
		function setMsgBlanceFromAtoAtc(atoAtc,bN,b,vN,v,balance){
			console.log("ยังเหลือจากการขาย "+bN+"("+b+") < ATO/ATC "+vN+"("+balance+")");
		}
		function setMsgBlanceAtPrice(atoAtc,bN,b,vN,v,balance){
			console.log("จำนวนคงเหลือสามารถขายต่อที่ระดับราคา "+bN+"("+b+") จำนวน "+vN+"("+v+") เหลือจำนวน ATO/ATC vS1("+balance+") ");
		}
		function setMsgSellAllAtoAtc(atoAtc,v,bN,b,vN,v,balance){
			console.log("ขายได้หมดทั้งจำนวน ATO/ATC:"+v+" เหลือ "+bN+"("+b+") จำนวน "+vN+"("+(v-balance)+")");
			console.log(vN+"("+v+") > balance("+balance+")");
		}
		function setMsgSwitchToBuySide(atoAtc,bN,b,vN,v){
			console.log("สลับมาทำการซื้อกลับจากจำนวนที่เหลือของ "+vN+"("+v+") โดยใช้ราคาของ "+bN+"("+b+") ในการตัดสินการซื้อในครั้งต่อไป");
		}
		function setEndOfBuySell(atoAtc,xN,x){
			console.log(xN+"("+x+"):ไม่เกิดการซื้อขายต่อ ให้ใช้เป็นราคา ATO/ATC:"+atoAtc.atoatcPrice);
			console.log(labelTotalBuySell+":"+atoAtc.totalEffect);
		}
		function setMsgBuyMinimumNotOverPrice(atoAtc,bN,b,op,sN,s,p){
			console.log(bN+"("+b+") "+op+" "+sN+"("+s+")");							
			console.log("ซื้อราคาที่ถูกที่สุดที่ซื้อได้โดยราคาไม่เกิน:"+p);
		}		
		function setLastMsgCantBuy(atoAtc,bN,b,op,sN,s){
			console.info(bN+"("+b+") "+op+" "+sN+"("+s+")");
			console.info("จบการซื้อเนื่องจาก "+bN+"("+b+") ไม่สามารถซื้อ  "+sN+"("+s+") ได้");
			console.info(labelTotalBuySell+":"+atoAtc.totalEffect);
		}
		
		
		return atoAtc;
	}
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	var symbolObj=$('[name=symbol]:eq(0)');
	var s=$("<select name='symbolOpt' id='symbolOpt' style='width:100%'></select>");
	s.append("<option value=''></option>");
	s.append("<option value='IEC'>IEC</option>");
	s.append("<option value='WAT'>WAT</option>");
	s.append("<option value='GJS'>GJS</option>");
	s.append("<option value='N-PARK'>N-PARK</option>");

	s.append("<option value='TRUE'>TRUE</option>");
	s.append("<option value='DTAC'>DTAC</option>");
	s.append("<option value='ADVANC'>ADVANC</option>");
	s.append("<option value='INTUCH'>INTUCH</option>");
	
	s.append("<option value='AQUA-W2'>AQUA-W2</option>");
	s.append("<option value='PF-W3'>PF-W3</option>");
	s.append("<option value='TRUBB-W1'>TRUBB-W1</option>");
	s.append("<option value='FOCUS-W1'>FOCUS-W1</option>");
	s.append("<option value='ROJNA-W3'>ROJNA-W3</option>");
	//s.append("<option value='THAI01C1403A'>THAI01C1403A</option>");
	s.append("<option value='TYM-W1'>TYM-W1</option>");
	//s.append("<option value='CK28C1403A'>CK28C1403A</option>");
	s.change(function(e){
		symbolObj.val($(this).find('option:selected').val());
		$('.refreshQuoteBtn:eq(0)').click();
	});
	
	s.insertBefore(symbolObj);
	
	var tb=$("<table border='0' cellpadding='0' cellspacing='0'></table>").attr('id','tbSymbol');
	var tr=$("<tr></tr>");
	var td=$("<td></td>");
	tb.append(
		tr.clone()
			.append(td.clone().html('Symbol'))
			.append(td.clone())
			.append(td.clone().html('QTY'))
			.append(td.clone().html('Price'))
	)
	.append(
		tr.clone()
			.append(td.clone().append(s))
			.append(td.clone().text('B'))
			.append(td.clone().append("<input type='text' style='width:50px' name='bQty' id='bQty'>"))
			.append(td.clone().append("<input type='text' style='width:50px' name='bPrice' id='bPrice'>"))
	)
	.append(
		tr.clone()
			.append(td.clone().append(symbolObj.clone().css('width','80')))
			.append(td.clone().text('S'))
			.append(td.clone().append("<input type='text' style='width:50px' name='sQty' id='sQty'>"))
			.append(td.clone().append("<input type='text' style='width:50px' name='sPrice' id='sPrice'>"))
	)
	.append(
		tr.clone()
			.append(td.clone())
			.append(td.clone().text('C'))
			.append(td.clone().append("<input type='text' style='width:50px' name='cCost' id='cCost'>"))
	)
	.append(
		tr.clone()
			.append(td.clone())
			.append(td.clone().text('E'))
			.append(td.clone().append("<input type='text' style='width:50px' name='etc' id='etc'>"))
	)
	//.insertBefore(symbolObj);
	//$('[name=symbol]:eq(1)').remove();
})(jQuery);




























//var d=new Date();function d2(s){ return s.length==1 ? '0'+s:s;} var hhmmss=d2(d.getHours())+''+d2(d.getMinutes())+''+d2(d.getSeconds());hhmmss