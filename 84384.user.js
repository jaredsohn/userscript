// ==UserScript==
// @name Wow Remote Auctioneer
// @description An addition to the World of Warcraft remote Auction House to make it more easier to use.
// @include http://*.wowarmory.com/auctionhouse/*
// @exclude http://*.wowarmory.com/*search.json*
// @version 0.070910
// ==/UserScript==

var checked=0;
var auctions=new Array();
var $=unsafeWindow.$;

var getcookie=unsafeWindow.getcookie2;
var setcookie=unsafeWindow.setcookie;

var WorldZone=null;
var PageUrl=window.location;
if($("eu",PageUrl)){
	WorldZone="eu";
}else{
	WorldZone="us";
}

$(document).ready(
	function(){
			var RecentTab=$("<div></div>");
			RecentTab.addClass("tab");
			RecentTab.append("<a>History</a>");
			RecentTab.mouseover(
				function(e){
					ShowRecentHistory(e,this);
				}
			);
		
			RecentTab.mouseout(function (){
				$("#globalToolTip").hide();
			}); 
		
			$("#tab_create").after(RecentTab);
		}
);

function ShowRecentHistory(e,a){
	var list=ParseJson(getcookie("RecentBoughtList"));
	var content="Recent History:<br />";
	for(var i=0; i< list.length;i++){
		content+="<br />"+list[i]["name"]+": "+MoneyToGold(list[i]["amount"]);
	}
	unsafeWindow.setTipText(content);
	unsafeWindow.setToolTipPosition(a,e); 
}

var OldopenContent = unsafeWindow.Auction.openContent;
unsafeWindow.Auction.openContent = function(){

    OldopenContent();
   	UpdateSearch();
   $("#maxResults").append("<option value='50'>50</option>");
   
    var id;
	$("#browseAuctionsTable > tbody > tr").each(function(index) {
		var row=$(this).attr('id');
		var qnt=$(".ac:first",$(this)).html();
		$('td', $(this)).each(function(column) {
			if($(this).attr("valign")=="middle"){
				var as=$('a', $(this));
				auctions.push(Array(row,as.attr('id'),qnt));
				var APIurl="http://us.auctioneerdb.com/api?realmid="+getcookie("AuctioneerRealm",false)+"&factionid="+getcookie("AuctioneerFaction",false)+"&t="+getcookie("AuctioneerType",false)+"&id="+as.attr('id');
				setTimeout(
					function(){
						GM_xmlhttpRequest({
						  method: "GET",
						  url: APIurl,
						  onload: function(response) {
							var obj = ParseJson(response.responseText);
							if(obj != false){
								UpdateTableUI(obj);
							}
						  }
						});
					}
				,10);
				
			}
		});
	}); 
};

function UpdateSearch(){
	setTimeout(
		function(){
			GM_xmlhttpRequest({
			method: "GET",
			url: "http://us.auctioneerdb.com/js/realmlist.js",
			onload: function(response) {
						var obj = ParseJson(response.responseText);
						if(obj != false){
							UpdateSearchUI(obj);
						}
			 		}
			});
		}
	,0);
}

function UpdateSearchUI(obj){
	var RealmDiv=$("<div></div>");
	var RealmSel=$("<select></select>");
	var sel;
	for (var portal in obj) {
		var pdata = obj[portal];
		RealmSel.append("<option disabled=\"1\" class=\"portal\">"+portal+" Realms:</option>");
		for (var realmid in pdata) {
			var realm = pdata[realmid];
			if (realmid == getcookie("AuctioneerRealm",false)) sel = " selected=\"1\""; else sel = "";
			RealmSel.append("<option value=\""+realmid+"\""+sel+">"+realm+" - "+portal+"</option>");
		}
	}

	RealmSel.change(function() {
  		setcookie("AuctioneerRealm",RealmSel.val());
	});

	RealmDiv.append(RealmSel);
	
	var Factions=new Array(
			Array("","Any"),
			Array("a","Alliance"),
			Array("h","Horde"),
			Array("n","Neutral")
	);
	var FactionSel=$("<select></select>");
	for (var j=0;j<Factions.length;j++) {
		if (Factions[j][0] == getcookie("AuctioneerFaction",false)) sel = " selected=\"1\""; else sel = "";
		FactionSel.append("<option value=\""+Factions[j][0]+"\""+sel+">"+Factions[j][1]+"</option>");
	}
	FactionSel.change(function() {
  		setcookie("AuctioneerFaction",FactionSel.val());
	});
	RealmDiv.append(FactionSel);




	var Type=new Array(
			Array("","Sold / Buyout"),
			Array("m","Start"),
			Array("b","Buyout"),
			Array("s","Sold")
	);
	var TypeSel=$("<select></select>");
	for (var h=0;h<Type.length;h++) {
		if (Type[h][0] == getcookie("AuctioneerType",false)) sel = " selected=\"1\""; else sel = "";
		TypeSel.append("<option value=\""+Type[h][0]+"\""+sel+">"+Type[h][1]+"</option>");
	}
	TypeSel.change(function() {
  		setcookie("AuctioneerType",TypeSel.val());
	});
	RealmDiv.append(TypeSel);

	
	$("#auctionSearch .searchRow").append("<br>");
	$("#auctionSearch .searchRow").append(RealmDiv);
}

function UpdateTableUI(obj){
	var j;
	for(j=0;j<auctions.length;j++){
		if(parseInt(auctions[j][1])==parseInt(obj.id)){
			var trc=$("#"+auctions[j][0]);
			var td=$("td",trc);
			var buy=GoldToMoney($(".buyCol",td));
			var bid=GoldToMoney($(".bidCol",td));
			var TotVal=parseInt(obj.statistics.median)*auctions[j][2];

			var BidBuyPct=Math.floor((bid*100)/buy);
			var BuyValPct=Math.floor((buy*100)/TotVal);
			var BidValPct=Math.floor((bid*100)/TotVal);
									
			if(BidBuyPct < 20 && bid < 200000 ){
				$(".moneyCol",td).css("background-color","#B1FFAD");
			}
									
			if(BuyValPct < 40 && (TotVal - buy) > 50000){
				$(".moneyCol",td).css("background-color","#ADBCFF");
			}
									
			if(BidValPct < 20 && bid < 200000 && TotVal > 30000){
				$(".moneyCol",td).css("background-color","#E9FC68");
			}
			$("td:last",trc).html($("td:last",trc).html()+"<br>"+BuyValPct+"% "+BidValPct+"% "+BidBuyPct+"%");
			$(".moneyCol",td).html($(".moneyCol",td).html()+"<div class='moneyCol'>"+MoneyToGold(parseInt(obj.statistics.median)*auctions[j][2])+"</div>");
			auctions[j][1]=0;
		}
	}
}

var OldopenContent = unsafeWindow.AuctionCreate.loadSimilar;
unsafeWindow.AuctionCreate.loadSimilar = function(sort, reversed, reload){

	if (!unsafeWindow.AuctionCreate.current)
		return;

	if (!sort)
		sort = $('#sort_money .sortLink:eq(0)').attr('rel');
		
	var searchQuery = getcookie('armory.ah.lastSimilar');
	
	if (!reload && !searchQuery) {
		var parts = searchQuery.split('|');
		unsafeWindow.AuctionSearch.queryString.reverse = reversed = parts[0];
		unsafeWindow.AuctionSearch.queryString.sort = sort = parts[1];
	} else {
		if(!reversed) {
			if (unsafeWindow.AuctionSearch.currentSort && unsafeWindow.AuctionSearch.currentSort == unsafeWindow.AuctionSearch.queryString.sort)
				reversed = (unsafeWindow.AuctionSearch.queryString.reverse == 'true') ? 'false' : 'true';
			else
				reversed = unsafeWindow.AuctionSearch.queryString.reverse;
			

			unsafeWindow.AuctionSearch.queryString.sort = sort;
			unsafeWindow.AuctionSearch.queryString.reverse = reversed;
		}	
		
		var query = {
			sort: sort,
			start: 0,
			end: 10,
			fmt: 'xml',
			xsl: '/_layout/auction/similar.xsl',
			id: unsafeWindow.AuctionCreate.current.id,
			n: unsafeWindow.AuctionCreate.current.name,
			reverse: reversed,
			excludeNoBuyout: true
		};
		
		var query2=unsafeWindow.Auction.appendQuery(query);
		var url="http://"+WorldZone+".wowarmory.com/auctionhouse/search.json?";
		
		var longquery="";
		for(var k in query2){
			longquery = longquery + "&"+k+"="+query2[k];
		}
		url=url+longquery;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function(response) {
							$("#similarAuctions").html(response.responseText);
							$('#similarAuctions').fadeIn();
				 		}
				});
			}
		,0);
		setcookie('armory.ah.lastSimilar', unsafeWindow.AuctionSearch.queryString.reverse +'|'+ unsafeWindow.AuctionSearch.queryString.sort, true);
	}
}

var OldchooseItem = unsafeWindow.AuctionCreate.chooseItem;
unsafeWindow.AuctionCreate.chooseItem = function(data, row){
	if($("#DefaultPriceSelect").html() == null){
	
		var Undertr=$("<tr></tr>");
		Undertr.attr("id","DefaultPriceSelect");
		var UndertdDesc=$("<td></td>");
		UndertdDesc.append("<b>Default Price</b>");
		Undertr.append(UndertdDesc);
		
		var UndertdRadio=$("<td></td>");
		var Type=new Array(
			Array("","Vendor"),
			Array("low","Median Low"),
			Array("under","Undercut")
		);
		var TypeSel=$("<select></select>");
		for (var h=0;h<Type.length;h++) {
			if (Type[h][0] == getcookie("AuctioneerUndercutDefault",false)) sel = " selected=\"1\""; else sel = "";
			TypeSel.append("<option value=\""+Type[h][0]+"\""+sel+">"+Type[h][1]+"</option>");
		}
		TypeSel.change(function() {
	  		setcookie("AuctioneerUndercutDefault",TypeSel.val());
	  		if(getcookie("AuctioneerUndercutDefault",false)=="low"){
	  			UpdateLowPrice();
	  		}else if(getcookie("AuctioneerUndercutDefault",false)=="under"){
	  			UpdateUndercutPrice();
	  		}
		});
		UndertdRadio.append(TypeSel);
		Undertr.append(UndertdRadio);
		$($('#createAuctionForm > table > tbody tr')[4]).after(Undertr);
	}
	OldchooseItem(data, row);
	if(getcookie("AuctioneerUndercutDefault",false)=="low"){
		UpdateLowPrice();
	}else if(getcookie("AuctioneerUndercutDefault",false)=="under"){
	  	UpdateUndercutPrice();
	 }
}


var OldupdateQuantityLeft = unsafeWindow.AuctionCreate.updateQuantityLeft;
unsafeWindow.AuctionCreate.updateQuantityLeft = function(){
	OldupdateQuantityLeft();
	if(getcookie("AuctioneerUndercutDefault",false)=="low"){
		UpdateLowPrice();
	}else if(getcookie("AuctioneerUndercutDefault",false)=="under"){
		 	UpdateUndercutPrice();
	}
}
var OldswapPerType = unsafeWindow.AuctionCreate.swapPerType;
unsafeWindow.AuctionCreate.swapPerType = function(){
	if(getcookie("AuctioneerUndercutDefault",false)=="low"){
		UpdateLowPrice();
	}else if(getcookie("AuctioneerUndercutDefault",false)=="under"){
		UpdateUndercutPrice();
	}
	OldswapPerType();
}

function UpdateLowPrice(){
	var query = {
			sort: "unitbuyout",
			start: 0,
			end: 5,
			fmt: 'json',
			id: unsafeWindow.AuctionCreate.current.id,
			n: unsafeWindow.AuctionCreate.current.name,
			reverse: false,
			excludeNoBuyout: true
		};
		
		var query2=unsafeWindow.Auction.appendQuery(query);
		var url="http://"+WorldZone+".wowarmory.com/auctionhouse/search.json?";
		
		var longquery="";
		for(var k in query2){
			longquery = longquery + "&"+k+"="+query2[k];
		}
		url=url+longquery;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function(response) {
							var obj = ParseJson(response.responseText);
							if(obj != false){
								var median=0;
								for(var j=0;j<5;j++){
									median +=parseInt(obj["auctionSearch"]["auctions"][j]["ppuBuy"]);
								}
								median=Math.floor(median/5);
								
								var multip=1;
								if($("#pricePer").val()=="perStack")
									multip=parseInt($("#quantity").val());
									
								var Ammount=MoneyToArr(median*multip);
								
								
								$("#buyGold").val(Ammount[0]);
								$("#buySilver").val(Ammount[1]);
								$("#buyCopper").val(Ammount[2]);
								
								$("#startGold").val(Ammount[0]-Math.floor((15/100)*Ammount[0]));
								$("#startSilver").val(Ammount[1]-Math.floor((15/100)*Ammount[1]));
								$("#startCopper").val(Ammount[2]-Math.floor((15/100)*Ammount[2]));
							}
						}
				});
			}
		,0);
}

function UpdateUndercutPrice(){
var query = {
			sort: "unitbuyout",
			start: 0,
			end: 1,
			fmt: 'json',
			id: unsafeWindow.AuctionCreate.current.id,
			n: unsafeWindow.AuctionCreate.current.name,
			reverse: false,
			excludeNoBuyout: true
		};
		
		var query2=unsafeWindow.Auction.appendQuery(query);
		var url="http://"+WorldZone+".wowarmory.com/auctionhouse/search.json?";
		
		var longquery="";
		for(var k in query2){
			longquery = longquery + "&"+k+"="+query2[k];
		}
		url=url+longquery;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function(response) {
							var obj = eval('('+response.responseText+')');
							var obj = ParseJson(response.responseText);
							if(obj != false){
								var median=parseInt(obj["auctionSearch"]["auctions"][0]["ppuBuy"]);
								
								var multip=1;
								if($("#pricePer").val()=="perStack")
									multip=parseInt($("#quantity").val());
									
								var Ammount=MoneyToArr(median*multip);
								
								$("#buyGold").val(Ammount[0]-Math.floor((15/100)*Ammount[0]));
								$("#buySilver").val(Ammount[1]-Math.floor((15/100)*Ammount[1]));
								$("#buyCopper").val(Ammount[2]-Math.floor((15/100)*Ammount[2]));
								
								$("#startGold").val(Ammount[0]-Math.floor((25/100)*Ammount[0]));
								$("#startSilver").val(Ammount[1]-Math.floor((25/100)*Ammount[1]));
								$("#startCopper").val(Ammount[2]-Math.floor((25/100)*Ammount[2]));
							}
						}
				});
			}
		,0);
}

var OldupdateDeposit = unsafeWindow.AuctionCreate.updateDeposit;
unsafeWindow.AuctionCreate.updateDeposit = function(updateStarting){
	var id = unsafeWindow.AuctionCreate.current.id;
	var dur = $('#createAuctionForm input[type="radio"]:checked').val();
	var qty = $('#quantity').val();
	var stacks = $('#noOfStacks').val();

	if (!qty || isNaN(qty))
		qty = 1;

	if (!stacks || isNaN(stacks))
		stacks = 1;
		
	updateStarting = updateStarting !== false; 
	var url="http://"+WorldZone+".wowarmory.com/auctionhouse/deposit.json?id="+id+"&duration="+dur+"&quan="+qty+"&stacks="+stacks+"&sk="+getcookie('auction_sk', false);
	setTimeout(
			function(){
				GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function(response) {
							var obj = ParseJson(response.responseText);
							if(obj != false){
								var deposit = MoneyToArr(obj["totalDeposit"]);
								$('#depositAmount .copperCoin').html(deposit[2].toString());
								$('#depositAmount .silverCoin').html(deposit[1].toString());
								$('#depositAmount .goldCoin').html(deposit[0].toString());
								unsafeWindow.AuctionCreate.last_id = unsafeWindow.AuctionCreate.current.id; 
								unsafeWindow.AuctionCreate.ticket = obj["ticket"]; 
							}
						}
				});
			}
		,0);	
}

unsafeWindow.jQuery.fn.stripTags = function() { return this.replaceWith( this.html().replace(/<\/?[^>]+>/gi, '') ); };

var OldBuyout = unsafeWindow.Auction.buyout;
unsafeWindow.Auction.buyout = function(id, button, amount){
	var maindiv=$("");
	var ItemName=$("#auction_"+id+" > td:first > a",maindiv);
	var ItemId=$("#auction_"+id+" > td:first > div > a").attr('id');
	OldBuyout(id, button, amount);
	UpdateRecentList(ItemId,ItemName.html(),"B",amount);
}

var OldBid = unsafeWindow.Auction.bid;
unsafeWindow.Auction.bid = function(id, button){
	var amount =GoldToMoney($("#auction_"+id+" .bidCol"));
	var maindiv=$("");
	var ItemName=$("#auction_"+id+" > td:first > a",maindiv);
	var ItemId=$("#auction_"+id+" > td:first > div > a").attr('id');
	OldBid(id, button, amount);
	UpdateRecentList(ItemId,ItemName.html(),"b",amount);
}

function UpdateRecentList(id,ItemName,type,amount){
	var list=DeformatHistoryCookie(ParseJson(getcookie("RecentBoughtList")));
	
	list.unshift("{\"id\":\""+id+"\",\"name\":\""+ItemName+"\",\"type\":\""+type+"\",\"amount\":\""+amount+"\"}");
	if(list.length>=50){
		list[list.length]=null;
	}
	var cookiestr="";
	for(var i=0;i<list.length;i++){
		if(list[i] != null){
			if(i>0){
				cookiestr+=",";
			}
			cookiestr+=list[i];
		}
	}
	cookiestr='['+cookiestr+']';
	setcookie("RecentBoughtList",cookiestr);
}

if(ParseJson(getcookie("RecentBoughtList")) == null){
	setcookie("RecentBoughtList","{}");
}


function DeformatHistoryCookie(obj){
	var list=new Array();
	for(var j=0;j<obj.length;j++){
		var tmpobj=obj[j];
		list.push("{\"id\":\""+tmpobj.id+"\",\"name\":\""+tmpobj.name+"\",\"type\":\""+tmpobj.type+"\",\"amount\":\""+tmpobj.amount+"\"}");
	}
	return list;
}

function ParseJson(str){
	if(str != "")
		return eval('('+str+')');
	else 
		return false;
}

function MoneyToGold(amount) {
	 var gold = Math.floor(amount / 10000);
	 var silver = Math.floor((amount - (gold * 10000)) / 100);
	 var copper = Math.floor((amount - (gold * 10000)) - (silver * 100));
	
	 if (!silver) silver = '0';
	 if (!copper) copper = '0';
	 if (!gold) gold = '0';

	 return "<span class=\"goldCoin\">"+gold+"</span><span class=\"silverCoin\">"+silver+"</span><span class=\"copperCoin\">"+copper+"</span>";
}

function MoneyToArr(amount) {
	 var gold = Math.floor(amount / 10000);
	 var silver = Math.floor((amount - (gold * 10000)) / 100);
	 var copper = Math.floor((amount - (gold * 10000)) - (silver * 100));
	
	 if (!silver) silver = '0';
	 if (!copper) copper = '0';
	 if (!gold) gold = '0';

	 return Array(gold,silver,copper);
}

function GoldToMoney(amount) {
	 var gold = Math.floor(parseInt(Math.floor($(".goldCoin",amount).text())));
	 var silver = Math.floor(parseInt(Math.floor($(".silverCoin",amount).text())));
	 var copper = Math.floor(parseInt(Math.floor($(".copperCoin",amount).text())));
	 return gold*10000+silver*100+copper;
}

function GoldToArr(amount) {
	 var gold = Math.floor(parseInt(Math.floor($(".goldCoin",amount).text())));
	 var silver = Math.floor(parseInt(Math.floor($(".silverCoin",amount).text())));
	 var copper = Math.floor(parseInt(Math.floor($(".copperCoin",amount).text())));
	 var te=new Array(gold,silver,copper);
	 return gold*10000+silver*100+copper;
}