// ==UserScript==
// @name		Multi Auction - Bid Logger
// @fullname		Multi Auction - Bid Logger
// @namespace		MultiAuctionLogger
// @include		http://www.beezid.com/*
// @include		http://www.happybidday.com/*
// @include		http://www.quibids.com/*
// @include		http://www.dealdash.com/*
// @homepage		http://userscripts.org/scripts/show/152843
// @updateURL		http://userscripts.org/scripts/source/152843.meta.js
// @downloadURL		http://userscripts.org/scripts/source/152843.user.js
// @require		http://code.jquery.com/jquery-1.8.3.js
// @require		http://code.jquery.com/ui/1.9.2/jquery-ui.js
// @run-at		document-end
// @author		hugo pi
// @grant		GM_addStyle
// @grant		GM_log
// @icon		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFaElEQVR4Xr2XaUxUVxvH//fOvbMAAwOCBLXACAKvIgioIC6v0LSoLGXikrQ1dk2FRgWq9lWMtrFbGq3VfmhMWmttTBc3Yq12EWtBBNFI60Jto1TU4a2ogA7MdmfufXrGXkPkg5EB/E9+cz9Nfud5znNO7mAQIhyunHPol3X5hwAIeMQRvnk1t+rc1hK6sK2EqtfMOdDfRfDwP5pti6bvik9JKTaGD0egKRQcoQCA4VEsQPPh/OzdoxPNluBQE0gMggIRLpcHB5bnbQegGcoFCOvzJ++JM4dbjIEC7J23IDnsuNNph9EUDJ5o7pHKfO/RtflVAITBXoDwv5z078ZEBxSHGDWsYgcklx0dbVa0X72CkKjHMDYrA/FpyYiMHlV8uHL2LgCawVyA3ikpOpckQXLbIUtuOFn1Vy63IfyxGASGRUGBAR4P+w4OxkhztIUNptqJQdqCj47/trT+nK3u9Nk7OH2mHc3N1zE6nondTjhtXZB9Lk0QZBlsME3giCt80GBq0L8oDLmp7cYxu1M+q+UFgyLBbI4JhqwoUGQF4JhfGwCeF0GQcb31Gp7OHpPwVUPLXgCEPuH8GUJGICOUEblqZvqJvJxY8BqRifXQ6gNgMAYzwuDuuYWOqy3ovt0NvV4Er+H257x1cB4Ar38d6O2CxHAwMDEqolynBWcMEtVqCKQQZNmD63+1IixqFKKT4hE+IgI6vTZpbkpk5o7ai18DUAZyD5CPFTPSGgqLpnN3erS4Zr0NRfGAZAlQXLjw6zkEsEE0hJhAQhAUEuHxELpdXh0AfW87/Yu4Ynpa66y8zBEBBhGxIw2oOdFOf7bYOFHUYMRwAxISI6EVCc7bHeB4DrZOG041nD9W+sXxpQM6BYVJsSFrHp94Oc8nD9Dh/60tqD3ZenNz/Zn86kvW0g676+e/bzghcl5Ibie8bgesl1pwtLqhlsnLAbQzXPAj3HPpSXFvzsqi+k3ljGW0t7yQKqal3gSQzRjNMDMyV+dkUPXaJ6nmLQt9u7KI3sjPqAGQzgj3t+vcwgmJ8ffkxz9YRgdXW+j1mek++RRGFEOrMqoka3zt5y9l05elM2l5blptrxwav+TPpibEvZGXyeRlVOeTr7LQuicmUZhBl6vKRfTGyEhli2hcMnV844DlJZPHFWyY+19W9f3ypIjQeb5qVXnfeyKCkawS4W/b+cWTxr2waUEOnfxoOdVt9MmL78oTI0IXAIhh6B5wWQWpDFT+Gh3buJR+XGOh94oyacww0zxVrmdwGILwr0wa93xf+fvFWVT4H/M7AMxDKReWZCXv2/7yHGrcwuQbeuUFSbE+eQIjcKjkmiWZyft2lhbRiXvyyvvkieqE80Mjz1Llmyuolsl/YPKPn5lK+Ymxbw+lnGMIy6akVGWmmwviEuIgSR44uqy4Zr2Jhuau2s9ON5cAsDLsDAVDEGNFdio1fbzSd9TuVv7Jomn0YsbYGgATGKGDXXnf86oDh66Ll6yh4UEeWNt8lXeyyn+vUCvvZigP8e9oj8BxTxEpICL4wnEcAAZ73v2wp0dR9j/xbu9LCccwMcaUZaf8pOF4k03y1H16qrkMwFVGF0PGg6PZuTh3twBYJs1IA3EChKAwkKJA6umE7O6BIrsZLpDiwh/nu+EhpWrh1iPzAci8urdtW+rP5jX9fatsR9OF/siFzQumHbB1eywTslLgcjOpVwPZy8Pd44TLITG8cDm9cNoVOByEmNFadHd7Lb7fARA4VSCqU65jOBk9DO/DzM/62Zk2IoIsK1AUAsAg6m09hz7bAPD8v8913zcGc31OBK/uN+HhEqJey8P6M6iqo4NxhcPAolVvRhH9j4dh/wfgmWNrtN0tjAAAAABJRU5ErkJggg==
// @version		1.2.8
// @licence		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		Multi auction site bid count tracker. beezid.com,dealdash.com,happybidday.com,quibids.com
// ==/UserScript==

(function () {

	/*
		changed:
			beezid definitions
			slight code adjustment as beezid uses more ajax now and timing was off!
	*/

	var pageLoad={
		main:true,
	}

	var inactiveTime=2; //in minutes

	GM_addStyle('\
	.maltabs{\
		position:relative;\
		min-height:360px;\
		clear:both;\
		margin:25px 0;\
		max-height:400px;\
		width:445px;\
		left:0px;\
		height:10px;}\
	.odd {\
		background-color:#f8f8f8;}\
	.even {\
		background-color:#d8d8d8;}\
	.maltabwrap{\
		line-height:normal;\
		ccursor:pointer;\
		font-family:Arial,sans-serif;\
		position:absolute;\
		left:44px;\
		top:180px;\
		z-index:100000;\
		border:3px solid rgb(191, 191, 191);\
		box-shadow: 0px 1px 6px 0px rgb(215, 215, 215);\
		border-radius:10px;\
		color:black;\
		background-color:#e8e8e8;}\
	.tdpadding{\
		padding-left:2px;}\
	.loalinks{\
		font-size:12px;\
		line-height:normal;\
		padding:4px;\
		background-color:#E8E8E8;\
		position:fixed;\
		left:10px;\
		top:10px;\
		z-index:100!Important;\
		border-radius:5px;\
		border:2px solid rgb(191,191,191);\
		font-weight:400;\
		font-family:Arial,sans-serif!important;\
		text-align:left!important;}\
	.loalinks a{\
		margin-top:2px;\
		color:blue!important;\
		font-size:12px;\
		font-family:Arial,sans-serif!important;\
		font-weight:800!important;}\
	.loalinks a:hover{\
		font-size:12px;\
		font-family:Arial,sans-serif!important;\
		color:#A000C0!important;\
		text-decoration:underline;!important;\
		cursor:pointer;}\
	.loalinks span{\
		font-size:12px;\
		color:white!important;\
		background-color:green;\
		padding:1px 3px 1px 3px;\
		font-weight:bold;}\
	#tab-wrap tr td	{\
		text-align:left!important;\
		padding:0px 0px 0px 5px!important;\
		}\
	#tab-wrap{\
		font-family:Arial,sans-serif;\
		line-height:default;}\
	.debug{\
		cursor:default;\
		display:block;\
		width:424px;\
		height:327px;\
		overflow:auto;\
		font-size:12px;\
		line-height:14px;}\
	.btimer{\
		padding-left:0px;\
		font-size:28px;\
		font-weight:bold;\
		text-align:center;}\
	.btimer p {\
		background-color:white!important}\
	.trheader{\
		font-weight:bold;\
		background-color:green;\
		color:white;}\
	.maltab {\
		float:left}\
	.maltab label {\
		border-top-left-radius:5px;\
		border-top-right-radius:5px;\
		background:#eee;\
		padding:10px!important;\
		border:1px solid #ccc;\
		margin-left:1px;\
		margin-right:1px;\
		left:1px;\
		cursor:pointer;\
		line-height:normal!important;\
		font-weight:bold;\
		float:none;\
		font-weight:400;}\
	.maltab [type=radio] {\
		display:none;}\
	.maltab div{\
		top:27px;}\
	.ncontent {\
		position:absolute;\
		text-align:left;\
		top:27px;\
		left:0;\
		background:white;\
		right:0;\
		bottom:0;\
		padding:5px;\
		border-bottom:1px solid black;\
		border-top:0px!important;\
		z-index:1px;\
		overflow:auto;}\
	[type=radio]:checked ~ label {\
		background:white;\
		border-bottom:1px solid white;\
		z-index:2}\
	[type=radio]:checked ~ label ~.ncontent {\
		z-index:1}\
	[type=radio]:checked ~ label ~.ncontent >* {\
		opacity:1;\
		-webkit-transform:translateX(0);\
		-moz-transform:translateX(0);\
		-ms-transform:translateX(0);\
		-o-transform:translateX(0);}\
	.moredata {\
		font-size:13px!important;\
		line-height:normal!important;\
		}\
	.moredata table a {\
		color:blue;\
		font-weight:bold;\
		padding:0 5px;}\
	.moredata table a:hover{\
		text-decoration:underline;\
		padding:0 5px;}\
	.inactive{\
		color:rgba(138,138,138,.95);}\
	.trstyle{\
		font-size:14px;}\
	.cl{\
		display:none!important;}\
	.nstuff{\
		width:439px;\
		min-height:25px;\
		max-height:130px;\
		font-size:12px;\
		padding:2px;\
		border:0px solid black;\
		position:relative;\
		top:-24px;\
		clear:both;}\
	#nstuff span {\
		color:green;\
		padding:2px;\
		font-weight:bold;}\
	.histlabel{\
		margin-left:5px!important;}\
	.dshadow{\
		-moz-transform:scale(1.0075);\
		zoom:1.0075;	\
		box-shadow:0 0 14px rgb(0,0,0);\
		-moz-box-shadow:0 0 4px rgb(0,0,0);}\
	div#nabout{\
		text-align:left!important}\
	div#tmpDebug , div#nstuff{\
		text-align:left!important}\
	.ndumpta{\
		width:432px!important;\
		white-space:nowrap!important;\
		overflow:auto!important;\
		height:322px!important;\
		border:0;}\
	#ndump textarea {\
		resize:none;\
		font-family:Arial,sans-serif!important;\
		font-weight:400!important;\
		font-size:13px!important;\
		color:black!important;\
		border:1px solid black;\
		border-radius:0px!important;\
		padding:0px;\
		background-color:white!important;\
		white-space:nowrap!important;\
		overflow:hidden!important;\
		padding:normal;}\
	#nabout a{\
		color:blue!important;\
		text-decoration:none!important;\
		font-weight:bold!important;\
	}\
	#nabout a:link{\
		color:blue!important;\
		text-decoration:none!important;\
		font-weight:bold!important;\
	}\
	#nabout a:hover{\
		color:blue!important;\
		text-decoration:underline!important;\
		font-weight:bold!important;}');

	var hold=0;

	var happybidday={
		moddedJSON:'',
		previousJSON:'',
		curl:document.location.href.toString(),
		saveData:3,
		offsetDelay:1,
		auction_ID:-1,
		delay:250,
		historyElement:'div#product-information > div.product-box.auction-item > div.product-content',
		offsetLeft:460,
		timer:'p.currentvalue',
		url:'http://www.happybidday.com/viewproduct.php?aid=',
		notsoldpriceElement:'div.product-content > ul > li:eq(1) > em',
		soldpriceElement:'p.bidprice > strong > span:gt(0)',
		popUp:function(){
			if(this.curl.toString().indexOf('we-miss-you.php')!=-1){
				var urlParms=this.curl.toString().split('=');
				document.location=(decodeURIComponent(urlParms[1]));
				return(true);
			}
			return(false);
		},
		issold:function(){
			var elem=$('div.auction-item > p.currentvalue > strong > span');
			if(elem.length!=0){
				if($('div.auction-item > p.currentvalue > strong > span').html().toLowerCase().indexOf('sold')!=-1) return(true);
			}
			return(false)
		},
		isready:function(){
			var elem=$(auction.notsoldpriceElement).html().replace('$','').replace('.','');

			try{
				if(!$.isNumeric(elem)) return(false);
			}catch(e){}

			var isactive=$('div.product-content');
			var issold=$('div.product-content');
			if(issold.length==0 && isactive.length==0){
				return(false)
			}else{
				return(true);
			}
		},
		getAID:function(){

			if(this.auction_ID!=-1) return(this.auction_ID);
			var elem=$('span#history_auctionid')
			if(elem.length!=0) this.auction_ID=elem[0].innerHTML;
			if(!$.isNumeric(this.auction_ID)) this.auction_ID=-1;
			return(this.auction_ID);
		},
		getAuctionTitle:function(){
			if($('div#product-details > h1').length!=0){
				return($('div#product-details > h1').html());
			}else{
				return(document.title);
			}
		},
		getCurrentBidders:function(){
			HistoryDetail=[];
			$('div#tab_history.tab-content > table > tbody > tr').each(function(){
				var h=new Object();
				h.id=0; 
				h.amount=this.children[0].innerHTML.replace('$','');
				h.name=this.children[1].innerHTML.replace(/ /gm,'').replace(/(\r\n|\n|\r)/gm,'');
				if($.isNumeric(h.amount)) HistoryDetail.push(h)
			});
			procFreeze();
		}
	}

	var beezid={
		bid_id:0,
		moddedJSON:'',
		previousJSON:'',
		previousHTML:'',
		curl:document.location.href.toString(),
		saveData:3, 
		offsetDelay:1, 
		auction_ID:-1,
		delay:100,
		historyElement:'div.adetails_center',
		offsetLeft:450,
		offsetTop:0,
		timer:'div.adetails_tmr',
		url:'http://www.beezid.com/auctions/',
		notsoldpriceElement:'div.adetails_cprice',
		soldpriceElement:'div.adetails_cprice',
		popUp:function(){
			var tmp=$('#null_buttons').outerHTML();
			try{
				if($.isNumeric(tmp)) return(true);
			}catch(e){}
			return(false);
		},
		issold:function(){
			if($('div.btn_bid_auction_details_sold').length==0) return(false);
			return(true)
		},
		isready:function(){
			var isactive=$('div[class*=btn_bid_auction_details_normal]')
			var issold=$('div[class*=btn_bid_auction_details_sold]')
			var bff=$('div[class*=btn_bid_auction_details_normal_bff]')
			if(issold.length==0 && isactive.length==0){
				if(bff.length==0){
					return(false)
					}else{
					return(true);
					}
			}else{
				return(true);
			}
		},
		getAID:function(){
		if (this.auction_ID!=-1) return (this.auction_ID);
			try {
				var aid=$("p:contains('Auction ID')")[0].innerHTML;
				aid=aid.substring(aid.indexOf(':')+1).toString().trim();
				this.auction_ID=aid;
				if(!$.isNumeric(this.auction_ID)) this.auction_ID=-1;
				if(this.auction_ID<=0) return(0);
				if(auction.curl.indexOf(aid)==-1) {
					
					document.location.href=document.location.href+'#auction-'+this.auction_ID;
					setTimeout(function(){
						window.location.reload(true);
					},250)
					return(false)
				}
				this.timer='div#timer_'+this.auction_ID.toString()+'.adetails_tmr';
				return (this.auction_ID)
			}catch(e) {
				return (-1)
			}
		},
		getAuctionTitle:function(){
			if($('div.auction_details_big_title > h1').length!=0){
				return($('div.auction_details_big_title > h1').html());
			}else{
				return(document.title);
			}
		},
		getCurrentBidders:function() {
			
			HistoryDetail=[];
			$('div.bidding_history_column_holder').each(function(){
				var h=new Object();
				h.id=0;
				h.id=this.children[0].id.replace('bidder_','');
				h.amount=this.children[0].innerHTML.replace('$','');
				h.name=this.children[1].outerHTML.replace(/<[^>]+>/igm,'');
				if($.isNumeric(h.amount)) HistoryDetail.push(h);
			})
				
			procFreeze();
		}
	}

	var quibids={
		moddedJSON:'',
		previousJSON:'',
		curl:document.location.href.toString(),
		saveData:3, 
		offsetDelay:1.25,
		auction_ID:-1,
		delay:250,
		historyElement:'div.module.auction-right',
		hhistoryElement:'div.module.ap-bidding-section',
		offsetLeft:460,
		timer:'p.time.large-timer2',
		url:'http://www.quibids.com/en/auction-',
		notsoldpriceElement:'div.content > p.large-price > span.price',
		soldpriceElement:'p.won_price.large-price',
		popUp:function(){
			var elem=$('div#popupModal')
			if(elem.length!=0){
				if(elem[0].style.display!='none'){
					return(true)
				}else{
					return(false);
				}
			}else{
				return(false);
			}
		},
		issold:function(){
			var elem=$('#end-time-disclaim')[0];
			if(elem){return(true);}else{return(false);}
		},
		isready:function(){
			if(this.issold()){
				var isold=$(this.soldpriceElement);
				if(isold.html()=='--.--') return(false);
				return(true);
			}else{
				var isactive=$(this.notsoldpriceElement);
				if(isactive.html()=='--.--') return(false)
				return(true);
			}
			return(false)
		},
		getAID:function(){
			if(this.auction_ID!=-1) return(this.auction_ID);
			try{
			var aid=$('span:contains("Auction #A")')[0].innerHTML
			aid=aid.replace('Auction #A','');
			this.auction_ID=aid;
			if(!$.isNumeric(this.auction_ID)) this.auction_ID=-1;
			return(this.auction_ID);
			}catch(e){return(-1)}
		},
		getAuctionTitle:function(){
			if($('div#auction-title > h1#product_title').length!=0){
				return($('div#auction-title > h1#product_title').html());
			}else{
				return(document.title);
			}
		},
		getCurrentBidders:function() {
			HistoryDetail=[];
			$('#bid-history > tbody > tr').each(function(){
					var h=new Object();
					h.id=0; 
					h.amount=this.children[2].innerHTML.replace('$','');
					h.name=this.children[1].innerHTML.replace(/ /gm,'').replace(/(\r\n|\n|\r)/gm,'');
					if($.isNumeric(h.amount)) HistoryDetail.push(h);
			});
			procFreeze();
		}
	}

	var dealdash={
		auctionTime:10,
		moddedJSON:'',
		previousJSON:'',
		curl:document.location.href.toString(),
		saveData:3,
		offsetDelay:1,
		auction_ID:-1,
		delay:250,
		historyElement:'ul#previousBids',
		offsetLeft:-450, 
		offsetTop:0,
		timer:'p#time',
		url:'http://www.dealdash.com/battle.php?auction_id=',
		notsoldpriceElement:'span#productPage_bidInfo_current_price',
		soldpriceElement:'span#productPage_bidInfo_current_price',
		popUp:function(){
			if($('div#colorbox').length!=0){
				if($('div#colorbox')[0].style.display!='none') return true;
			}
			return false;
		},
		issold:function(){
			if($('img#itemSold').length==0) return(false);
			return(true)
		},
		isready:function(){
			
			var isactive=$('span#productPage_bidInfo_current_price');
			var issold=$('span#productPage_bidInfo_current_price');
			if(issold.length==0 && isactive.length==0){
				return(false);
			}else{
				return(true);
			}
		},
		getAID:function(){
			if(this.auction_ID!=-1) return(this.auction_ID);
			var elem=$('div#auctionid')
			if(elem.length!=0){
				this.auction_ID=elem[0].getAttribute('data-id');
			}else{
				this.auction_ID=-1;
			}
			if(!$.isNumeric(this.auction_ID)) this.auction_ID=-1;
			return(this.auction_ID);
		},
		getAuctionTitle:function(){
			if($('div.productDescription > h1').length!=0){
				return($('div.productDescription > h1').html());
			}else{
				return(document.title);
			}
		},
		getCurrentBidders:function() {
			HistoryDetail=[];
			var element=$('ul#previousBids')[0]
			if(element){
				var echild=element.getElementsByTagName('li');
				if(echild){
					for(var i=0;i<echild.length-1;i++){//=4){
						var h=new Object();
						h.id=0;
						h.amount=parseFloat(echild[i].innerHTML.replace('$',''));
						h.name=$(echild[i]).children(0).html()
						if($.isNumeric(h.amount)) HistoryDetail.push(h);
					}
				}
			}
			procFreeze();
		}
	}

	var auction=null;

	if(document.location.href.toString().indexOf('happybidday.com')!=-1) {
		GM_addStyle('.maltab div{top:26px;}');
		auction=happybidday;
		auction.popUp();
	}

	if(document.location.href.toString().indexOf('beezid.com')!=-1) {
		GM_addStyle('.maltab div{top:26px;}');
		auction=beezid;
	}

	if(document.location.href.toString().indexOf('quibids.com')!=-1) {
		auction=quibids;
	}

	if(document.location.href.toString().indexOf('dealdash.com')!=-1) {
		GM_addStyle('.maltab label {margin-top:-11px!important}');
		auction=dealdash;
	}

	if(auction==null) return;

	//below is the GLOBAL code for all sites as long as its defined above.
	function procFreeze(){

		var tmpJSON=JSON.stringify(HistoryDetail);
		if(tmpJSON!=auction.previousJSON) {
			auction.previousJSON=tmpJSON;
			if(HistoryDetail.length!=0){
				if(HistoryDetail[0].id!=0) auction.moddedJSON=tmpJSON;
			}
		}


		if(FullAuctionDetail.length<2) {
			auction.moddedJSON=auction.previousJSON;
			return;
		}

		if(FullAuctionDetail[0].amt!=FullAuctionDetail[1].amt){
			auction.moddedJSON=auction.previousJSON;
			return;
		}
		if(HistoryDetail[0].id!=0) return;

		var found=false;

		var lbh=JSON.stringify(LastBidHistory);
		var hd=JSON.stringify(HistoryDetail)

		var lastName=LastBidHistory[0].name;
		for(var i=1;i<HistoryDetail.length;i++){
			if(lastName==HistoryDetail[i].name){
				HistoryDetail=HistoryDetail.splice(0,i);
				tmpBids=JSON.stringify(HistoryDetail);
				LastBidHistory=JSON.parse(tmpBids);
				auction.moddedJSON=tmpBids;
				found=true;
				break;
			}
		}

		if(found==false){
			var hd=JSON.stringify(HistoryDetail);
			LastBidHistory=JSON.parse(hd);
			auction.moddedJSON=hd;
		}
	}

    var debug={
        append: function (data) {
			try{
			var cd=$('div[name*=debug]').html();
			$('div[name*=debug]').html(data+'<br><br>'+cd);
			
			//var cd=$('#tmpDebug').html();
			//$('#tmpDebug').html(data+'\n\n'+cd);
			}catch(e){}
        },
        log: function (data) {
			try{
				$('div[name*=debug]').html(data);
				
				//$('#tmpDebug').html(data)
			}catch(e){}
        }
    }

	var localVersions={
		cv:'1.2.8',
		lsv:'1.0.2'
	}


    var siteBidCounts=0;
    var FullAuctionDetail=[];
    var FullBidStats=[];
	var HistoryDetail=[];
	var LastBidHistory=[];
	var h=new Object();
	h.name='none';h.amount=0;h.id=0;LastBidHistory.push(h);

    var ls='';
	var CHKSITE_Timeout=0;
    var MAINLOOP_Timeout=0;
	var LOA_Timeout=0;
    var STLS_Timeout=0;
	var previous_result='none';
	var T_Timeout=0;
	var IGNORE_SAVE=false;
	var gcount=0;
	var BID_PRICE_COUNT_DIFFERANCE=0;

	function reload(){
		clearInterval(MAINLOOP_Timeout);
		clearInterval(LOA_Timeout);
		clearInterval(STLS_Timeout);
		saveToLocalStorage(true);
		document.location.reload();
	}


	$(window).unload(function() {
		clearInterval(MAINLOOP_Timeout);
		clearInterval(LOA_Timeout);
		clearInterval(STLS_Timeout);
		saveToLocalStorage();
	});

    $(document).ready(function () {
		doodls();
		listOfAuctions();
		CHKSITE_Timeout=setInterval(checkSite,200)
    })
	
	function checkSite(){
	
		if(auction.isready()){
			clearInterval(CHKSITE_Timeout);
			initCode();
		}
		
		hold++;
		if(hold>=30){
			clearInterval(CHKSITE_Timeout);
		}
	}
	
	function initCode(){
		

		ls=lzw_decode(localStorage.getItem('bid_grabber_'+auction.getAID()));

		if(ls=='null'){
			ls=localStorage.getItem('bid_grabber_'+auction.getAID())
		}

        if (ls!=null) {

			try{

				FullAuctionDetail=JSON.parse(ls);
				BID_PRICE_COUNT_DIFFERANCE=FullAuctionDetail.bpcd;
				FullAuctionDetail=FullAuctionDetail.bids;
				LastBidHistory=[];
				var h=new Object();
				h.name=FullAuctionDetail[0].user;
				h.amount=FullAuctionDetail[0].amt;
				h.id=FullAuctionDetail[0].id;
				LastBidHistory.push(h);

			}catch(e){
               debug.append(e.lineNumber+' '+e);
            }
        }

		
		if ((auction.getAID()!=-1) && (auction.getAID()!=undefined)) {
			
			setTimeout(saveit,5000);
			STLS_Timeout=setInterval(saveit,auction.saveData*60000)
			T_Timeout=setInterval(timerLoop,50);
            add_display();
			
			MAINLOOP_Timeout=setInterval(mainLoop, auction.delay);
			//$('#ndump').parent().removeClass('cl').addClass('maltab')

			$("#tab-wrap").draggable({
				cursor: 'move',
				cancel: 'div div,table',
				opacity: 1,
				drag: function () {
					$(this).addClass('dshadow')
				},
				stop: function () {
					$(this).removeClass('dshadow');
				}
			})


			$(auction.timer).on('DOMSubtreeModified DOMNodeInserted DOMNodeRemoved', function(event){
					$('div[name*=btimer]').html($(this).outerHTML());
					clearInterval(T_Timeout);
			});

        }

		if(auction.issold()==false) if ($("#tab-wrap").is(':hidden')) $("#tab-wrap").show();
		listOfAuctions();

		LOA_Timeout=setInterval(listOfAuctions,30000);	
	}

	function timerLoop(){
		$('div[name*=btimer]').html($(auction.timer).outerHTML());
	}

	function saveit(){
		if(auction.getAID()==-1) {
			return;
		}
		saveToLocalStorage();
	}

	function mainLoop() {
		var u='';
        var outPut='';

		if(auction.popUp()==true){
			reload();
			return;
		}

		if(!auction.isready()){
			return;
		}

		if(!auction.issold()){

			auction.getCurrentBidders();
			if(previous_result==auction.previousJSON){
				return;
			}
		}else{

		}

		previous_result=auction.previousJSON;
		
		if(auction.moddedJSON.length<4) auction.moddedJSON=auction.previousJSON;
        try {
            BidDataDetail=null;
            BidDataDetail=JSON.parse(auction.moddedJSON);
			
			
			siteBidCounts=$(auction.notsoldpriceElement).html();

			if(siteBidCounts==undefined) {
				siteBidCounts=0;
			}else{
				if(siteBidCounts=='---') {
					siteBidCounts=0;
				}else{
					siteBidCounts=siteBidCounts.replace('$','').replace('.','');
				}
			}
			
			
			for (var i=BidDataDetail.length-1;i>-1;i--) {
				u ='$'+parseFloat(BidDataDetail[i].amount).toFixed(2)+' - '+BidDataDetail[i].name+' - '+BidDataDetail[i].id+'<br>'+u;
			}

			for (var i=BidDataDetail.length-1;i>-1;i--) {
				var itemIndex=UserExists(FullAuctionDetail, BidDataDetail[i].name);

				if (itemIndex==-1) {
					var BidDetail=new Object();
					BidDetail.amt=parseFloat(BidDataDetail[i].amount).toFixed(2);
					BidDetail.user=BidDataDetail[i].name;
					BidDetail.time=clock();
					BidDetail.bid_count=1;
					BidDetail.bid_id=BidDataDetail[i].id;
					FullAuctionDetail.splice(0,0,BidDetail);
					outPut+='<b>Added: $'+parseFloat(BidDetail.amt).toFixed(2)+' '+BidDetail.user+' '+BidDetail.bid_count+' - '+BidDetail.bid_id+'</b><br>'

				} else {

					itemIndex=itemIndex-1;
					if((BidDataDetail[i].id!=0)){
						if (parseFloat(BidDataDetail[i].id) > parseFloat(FullAuctionDetail[itemIndex].bid_id)) {
							var tBidDetail=FullAuctionDetail[itemIndex];
							FullAuctionDetail.splice(itemIndex,1);
							tBidDetail.bid_count=tBidDetail.bid_count+1;
							tBidDetail.amt=BidDataDetail[i].amount;
							tBidDetail.bid_id=BidDataDetail[i].id;
							tBidDetail.time=clock();
							FullAuctionDetail.splice(0,0,tBidDetail)
							outPut='  <b>Updated: $'+parseFloat(tBidDetail.amt).toFixed(2)+' - '+tBidDetail.user+' - '+tBidDetail.bid_count+' - '+tBidDetail.bid_id+'</b><br>'+outPut;
						}
					}else{

						if(FullAuctionDetail.length>1){
							if (parseFloat(FullAuctionDetail[0].amt)==parseFloat(FullAuctionDetail[1].amt)) {
									var tBidDetail=FullAuctionDetail[itemIndex];
									FullAuctionDetail.splice(itemIndex,1);
									tBidDetail.bid_count=tBidDetail.bid_count+1;
									tBidDetail.amt=BidDataDetail[i].amount;
									tBidDetail.bid_id=BidDataDetail[i].id;
									tBidDetail.time=clock();
									FullAuctionDetail.splice(0,0,tBidDetail)
									outPut='<b>Updated: $'+parseFloat(tBidDetail.amt).toFixed(2)+' - '+tBidDetail.user+' - '+tBidDetail.bid_count+' - '+tBidDetail.bid_id+'</b><br>'+outPut;
							}else{
								if (parseFloat(BidDataDetail[i].amount) > parseFloat(FullAuctionDetail[itemIndex].amt)) {
									var tBidDetail=FullAuctionDetail[itemIndex];
									FullAuctionDetail.splice(itemIndex,1);
									tBidDetail.bid_count=tBidDetail.bid_count+1;
									tBidDetail.amt=BidDataDetail[i].amount;
									tBidDetail.bid_id=BidDataDetail[i].id;
									tBidDetail.time=clock();
									FullAuctionDetail.splice(0,0,tBidDetail)
									outPut='<b>Updated: $'+parseFloat(tBidDetail.amt).toFixed(2)+' - '+tBidDetail.user+' - '+tBidDetail.bid_count+'</b><br>'+outPut;
								}
							}
						}
					}
				}
			}

            showList();

            if (outPut.length>0) {
                debug.log(outPut+'<br><b>History Table:</b><br>'+u);
            }
			outPut='';u='';

        }catch(e) {
			debug.append(e.lineNumber+' '+e)
		}
		
        if (auction.issold()) {
			
			clearInterval(MAINLOOP_Timeout);
			clearInterval(T_Timeout);
			clearInterval(LOA_Timeout);
			clearInterval(STLS_Timeout);

			$(auction.timer).off();

			if(FullAuctionDetail.length!=0) {
				ls=JSON.stringify(FullAuctionDetail);
			}else{
				$('div#tab-wrap').remove();
				return;
			}
			
			$('#ndump').parent().removeClass('cl').addClass('maltab')
			CSVDump();
			showList();
			listOfAuctions();
			FullAuctionDetail=[];
            $('div[name*="btimer"]').html('<strong><span style="color:#E80000;">SOLD</span></strong>');

            if ((ls==null) || (ls=='[]')) {
                $("#tab-wrap").hide();
            }else{
				if ($("#tab-wrap").is(':hidden')) $("#tab-wrap").show();
			}
			
			debug.log('Auction Ended');
			
			return;

        }
    }

	function showList() {
		if(FullAuctionDetail.length==0) return;
        var leader='';
        var bid_total=0;
        var outPut='';
        var sold=auction.issold();
		var table=document.createElement('table');
		table.width='100%';
		table.cellPadding=0;
		table.cellSpacing=0;
		table.id='moredata_table';
		table.style.cssText='cursor:default';
		var tr=document.createElement('tr');
		var lpcnt=0;

		tr.className='trheader';

		cTC(tr,'Amount');
		cTC(tr,'User');
		cTC(tr,'Bids','tdpadding');
		cTC(tr,'Time');
		table.appendChild(tr);
		var curr_time=clock();
        for (var iStart=0;iStart<FullAuctionDetail.length;iStart++) {
            var BidItem=FullAuctionDetail[iStart];

			if(FullAuctionDetail.length>18){
				if(!auction.issold()){
					if (curr_time > (parseFloat(BidItem.time)+parseFloat(inactiveTime*60000))) {
						break;
					}
				}
			}

			var tr=document.createElement('tr');
			tr.setAttribute('rel',BidItem.user);
			tr.className='trstyle';

			cTC(tr,'$'+parseFloat(BidItem.amt).toFixed(2));
			cTC(tr,BidItem.user);
			cTC(tr,BidItem.bid_count,'tdpadding');
			cTC(tr,ctime(BidItem.time));
			cTC(tr,BidItem.time,'cl');

			tr.className='trstyle';
			if(pageLoad.main==true){
				table.appendChild(tr);
			}else{
				$($('#current_leader')[0]).id='';
				$('tr[rel*="'+BidItem.user+'"]').remove();
				$($('#moredata_table tr')[iStart]).after(tr)
			}
        }

		siteBidCounts=FullAuctionDetail[0].amt.toString().replace('$','').replace('.','');
		bid_total=0;

		for(var ii=0;ii<FullAuctionDetail.length;ii++){
			var BidItem=FullAuctionDetail[ii];
			bid_total=parseInt(bid_total)+parseInt(BidItem.bid_count);
		}

		if(auction.issold()){
			siteBidCounts=$(auction.soldpriceElement).html()
			siteBidCounts=siteBidCounts.replace('$','').replace('.','');
			if(!$.isNumeric(siteBidCounts)) siteBidCounts=0;
		}

		if(auction==happybidday){
			siteBidCounts=siteBidCounts-100;
		}

		if(bid_total>siteBidCounts) siteBidCounts=bid_total;

		if(pageLoad.main==true){
			$('div[name*="moredata"]').empty();
			$('div[name*="moredata"]').append([table]);
		}

		colorRows('#moredata_table');
		inactiveCount=inactiveRows('#moredata_table');

		var inactiveCount=0;

		if(FullAuctionDetail.length>18){
			inactiveCount=FullAuctionDetail.length- parseInt($('#moredata_table > tr:gt(0)').length)
			$('.delete_me').remove();
		}else{
			inactiveCount=inactiveRows('#moredata_table');
		}

		if((BID_PRICE_COUNT_DIFFERANCE==0) || (!$.isNumeric(BID_PRICE_COUNT_DIFFERANCE))){
			BID_PRICE_COUNT_DIFFERANCE=siteBidCounts-bid_total;
		}

		if(FullAuctionDetail.length>1){
			if(FullAuctionDetail[0].amt==FullAuctionDetail[1].amt){
				siteBidCounts=parseInt(bid_total)+parseInt(BID_PRICE_COUNT_DIFFERANCE);
			}
		}

		var at10c=parseFloat(siteBidCounts*.10).toFixed(2);
		var bidcount=FullAuctionDetail[0].bid_count
		var ucost=parseFloat(bidcount*.10).toFixed(2);
		var cprice=FullAuctionDetail[0].amt;

		outPut='<table cellPadding="0" cellSpacing="0" id="tguess">\
					<tr><td colspan=3>Bid counts tracked - '+bid_total+' of&nbsp;&nbsp;'+parseFloat(siteBidCounts)+'</td></tr>\
					<tr>\
						<td><b>Site earnings:</b></td>\
						<td></td>\
						<td><b>Highest Bidder&#39;s (<span>'+FullAuctionDetail[0].user+'</span>) cost.</b></td>\
					</tr>\
					<tr>\
						<td><span>'+formatCurrency(at10c)+'</span> @ 0.10&#162; per bid.</td><td></td><td>'+bidcount+' x .10 = $'+parseFloat(ucost).toFixed(2)+' + $'+cprice+' = '+formatCurrency((parseFloat(ucost)+parseFloat(cprice)).toFixed(2))+'</td>\
					</tr>\
					<tr>\
						<td><span>'+formatCurrency(at10c*2)+'</span> @ 0.20&#162; per bid.</td><td></td><td>'+bidcount+' x .20 = $'+parseFloat(ucost*2).toFixed(2)+' + $'+cprice+' = '+formatCurrency((parseFloat(ucost*2)+parseFloat(cprice)).toFixed(2))+'</td>\
					</tr>\
					<tr>\
						<td><span>'+formatCurrency(at10c*4)+'</span> @ 0.40&#162; per bid.</td><td></td><td>'+bidcount+' x .40 = $'+parseFloat(ucost*4).toFixed(2)+' + $'+cprice+' = '+formatCurrency((parseFloat(ucost*4)+parseFloat(cprice)).toFixed(2))+'</td>\
					</tr>\
					<tr>\
						<td><span>'+formatCurrency(at10c*6)+'</span> @ 0.60&#162; per bid.</td><td></td><td>'+bidcount+' x .60 = $'+parseFloat(ucost*6).toFixed(2)+' + $'+cprice+' = '+formatCurrency((parseFloat(ucost*6)+parseFloat(cprice)).toFixed(2))+'</td>\
					</tr>\
				</table>'

		$('#nstuff').html(outPut);

		if(!auction.issold()){
			$('#tguess').append('<tr><td colspan=2><br><b>Active:'+(FullAuctionDetail.length-inactiveCount)+'<br>InActive: '+inactiveCount+'</b></td>')
		}else{
			$('#tguess').append('<tr><td colspan=2><br><b>Logged Bidder\'s: '+(FullAuctionDetail.length)+'</b></td>')
		}

		$('#moredata_table > tr:eq(1) > td:lt(4)').effect("highlight", {color: '#FF0000'}, 150);

		if(FullAuctionDetail.length!=0) $('div#tab-wrap').removeClass('cl');

		pageLoad.main=false;
		a=null;td=null;tr=null;table=null;
    }

	function add_display() {
		$('body').append('<div id="tab-wrap" class="maltabwrap cl">\
				  <div class="maltabs">\
					<div class="maltab">\
					  <input checked="checked" id="tab-1" name="tab-group-1" type="radio">\
					  <label for="tab-1" class="histlabel">History</label>\
					  <div class="ncontent moredata" name="mdparent">\
						<div class="btimer" name="btimer"></div>\
						<div name="moredata">\
							<table width="100%" cellspacing="0" cellpadding="0" id="moredata_table" style="cursor: default;">\
								<tr class="trheader"><td>Amount</td><td>User</td><td class="tdpadding">Bids</td><td>Time</td></tr>\
							</table>\
						</div>\
					  </div>\
					</div>\
					<div class="maltab">\
					  <input id="tab-2" name="tab-group-1" type="radio">\
					  <label for="tab-2">Log</label>\
					  <div class="ncontent" name="debug">\
						Started ...\
					  </div>\
					</div>\
					<div class="cl">\
					  <input id="tab-4" name="tab-group-1" type="radio">\
					  <label for="tab-4">CSV Dump</label>\
					  <div class="ncontent" name="ndump" id="ndump">\
						<textarea id="ndumpta" class="ndumpta" wrap="off">Clicking in here will toggle viewing and refreshing.</textarea>\
					  </div>\
					</div>\
					<div class="maltab">\
					  <input id="tab-3" name="tab-group-1" type="radio">\
					  <label for="tab-3">About</label>\
					  <div class="ncontent" name="nabout" id="nabout">\
						<p>About</p>\
					  </div>\
					</div>\
				  </div>\
				  <div id="nstuff" class="nstuff"></div>\
				</div>')

		$('#tab-wrap').hide();

        $('#nabout').html('<a target="_blank" href="http://userscripts.org/topics/119195">Change Log</a>\
							<br>\
							<b>Version:</b><span id="lv"></span>\
							<br><br>\
							In order to count as correctly as possible, you need to watch the auction, leaving the page will result in missed bid counts.\
							<br><br>\
							This can not catch all of the bids!<br>\
							There are instances where more that 10 bids are placed and only the last 10 make it back to your browser.<br><br>\
							<b>Page refreshes</b> can also cause loss of bids not being counted if the amount of bids placed durring the refresh are greater than the amount shown in the history of the site.\
							<br><br>\
							<p><b>All calculations are a \'guess!\'</b></p>\
							The option to delete the locally saved data will become avaliable when the auction is over.\
							<br>');

		$('#nabout > span#lv').html('&nbsp;'+localVersions.cv);
		setTimeout(function(){
			try{
				var offset = $(auction.historyElement).offset()
				$("#tab-wrap").css({'left':offset.left-auction.offsetLeft,'top':offset.top})
			}catch(e){}
		},auction.offsetDelay*500)

    }

    function UserExists(Auction, bUser) {
        var uExists=-1;
		try{
        if (Auction.length > 0) {
            for (var aucCount=Auction.length-1;aucCount>-1;aucCount--) {
                if (Auction[aucCount].user.toString().toLowerCase()==bUser.toLowerCase()) {
                    uExists=(aucCount+1);
                    break;
                }
            }
        }
		}catch(e){return(uExists)};
        return (uExists)
    }

    function clock() {
        return (Date.now())
    }

	function saveToLocalStorage(){
		if(IGNORE_SAVE==true) return;
		var aid=auction.getAID().toString().trim();
		
		if(!$.isNumeric(aid)) return;
        if(aid.toString().length<5) return;
		var bids='"bids":'+JSON.stringify(FullAuctionDetail);
		var stats='"stats":'+JSON.stringify(FullBidStats);
		var title=auction.getAuctionTitle();
		var href=document.location.href.toString();
		title=title.replace(/'/g,'').replace(/"/g,'').replace(/\<br\>/g,' : ').replace(/<(?:.|\n)*?>/gm, '').replace('&amp;','&');
		var jstring=lzw_encode('{'+bids+','+stats+',"bpcd":"'+BID_PRICE_COUNT_DIFFERANCE+'","version":"'+localVersions.lsv+'","url":"'+href+'","date":"'+clock()+'","auc_title":"'+ title +'"}');
		
		if(arguments[0]==true) localStorage.setItem('bid_grabber_'+aid,jstring);
		if(auction.issold()==false) localStorage.setItem('bid_grabber_'+aid,jstring);
	}

	function colorRows(elemid){
		var bgcolor=0;
		$(elemid+' > tr:gt(0)').each(function() {
			var x=bgcolor%2;
			bgcolor++;
			if (x==1) {
				$(this).addClass('odd').removeClass('even');
			} else {
				$(this).addClass('even').removeClass('odd');
			}
		});
	}

	function cTC(){
		var td=document.createElement('td')
		td.innerHTML=arguments[1];
		if(arguments[2]!=undefined)	td.className=arguments[2];
		arguments[0].appendChild(td);
	}

	function inactiveRows(elemid){
		var curr_time=clock();
		var inactiveCount=0;
		$(elemid+' > tr:gt(0)').each(function() {
			var bt=this.children[4].innerHTML;
			if (curr_time > (parseFloat(bt)+parseFloat(inactiveTime*60000))) {
				$(this).removeClass('inactive').addClass('inactive').removeClass('delete_me').addClass('delete_me');
				inactiveCount++;
			}
		});

		if(auction.issold()){
			$(elemid+' > tr:gt(0)').each(function() {
				$(this).removeClass('inactive').removeClass('delete_me');
				inactiveCount=0;
			});
		} 

		return(inactiveCount)
	}
    function ctime(d) {
        if (d==0) return ('Not Set');
        var time=new Date(d);
        var hr=time.getHours();
        var min=time.getMinutes();
        var sec=time.getSeconds();
        var mon=time.getMonth()+1;
        var day=time.getDate();
        var msec=time.getMilliseconds();
        var ampm=' PM ';
        if (hr < 12) {
            ampm=' AM ';
        }
        if (hr > 12) {
            hr -=12;
        }
        if (hr==0) {
            hr=12;
        }
        if (hr < 10) {
            hr=' '+hr;
        }
        if (min < 10) {
            min='0'+min;
        }
        if (sec < 10) {
            sec='0'+sec;
        }
        var ct=mon+'/'+day+' '+hr+':'+min+':'+sec+ampm;
        if (ct.indexOf('NaN')!=-1) ct=d;
        return (ct)
    }

    function idebug(d) {
		var e=document.getElementById('ddebug');

		if(!e){
			e=document.createElement('textarea');
			e.id='ddebug';
			e.style.cssText='position:fixed;top:5px;right:5px;border:1px solid black;';
			document.body.appendChild(e);
		}
		$('#ddebug').html(d).css('display', 'block')
    }

	function outerHTML(node){
    
		return node.outerHTML || (
      function(n){
          var div=document.createElement('div'), h;
          div.appendChild(n.cloneNode(true));
          h=div.innerHTML;
          div=null;
          return h;
      })(node);
	}

    (function ($) {
        $.fn.outerHTML=function () {
            return $(this).clone().wrap('<div></div>').parent().html();
        }
    })(jQuery);

	function doodls(){
		var dc_time=Date.now();
		var ll=localStorage.length;

		var t=[];
		for (var i=ll;i>-1;i--){
			var id=localStorage.key(i);
			if(id!==null){
				if(id.indexOf('bid_grabber_')==0){

					var lls=lzw_decode(localStorage.getItem(id));
					if(lls==null){
						lls=(localStorage.getItem(id));
					}

					try{
						t=JSON.parse(lls);
						if(t.url==document.location.href.toString()){
							if(t.version.toString()!=lsv.toString()) {
								if(id.indexOf('bid_grabber_')==0) {
									ls=null;
									localStorage.removeItem(id);
								}
							}
						}
					}catch(e){};

					try{
						if(parseFloat(dc_time)>(parseFloat(t.date)+432000000)) {
							if(id.indexOf('bid_grabber_')==0) {
								ls=null;
								localStorage.removeItem(id);
								}
						}
					}catch(e){};

				}
			}
		}
	}
    
	function listOfAuctions() {

		var aucExists=false;
        var br=document.createElement('br');
        var div=document.createElement('div');
        var ll=localStorage.length;
		var l_id=0;
		var sold=auction.issold();
		div.className='loalinks';
        div.id='a_links';
        var s=document.createElement('span');
        s.innerHTML='List of Auctions';
		s.id='s_links';

        div.appendChild(s);
		div.appendChild(document.createElement('br'));
        for (var i=0; i < ll; i++) {
            var id=localStorage.key(i);

			if(id.indexOf('bid_grabber_')==0){
				l_id++;
				id=id.replace('bid_grabber_','');

				if(id==auction.getAID()) aucExists=true;

				var title='';

				var id=localStorage.key(i).replace('bid_grabber_','');
				try{
					var ls=lzw_decode(localStorage.getItem(localStorage.key(i)));
					if(ls==null){
						ls=localStorage.getItem(localStorage.key(i));
					}
					ls=JSON.parse(ls);
					title=ls.auc_title;
				}catch(e){}

				var a=document.createElement('a');

				if(ls.url==undefined){
					a.href=auction.url+id;
				}else{
					a.href=ls.url;
				}

				a.className='context-menu';
				a.id=id;

				if (parseInt(id)==parseInt(auction.getAID())) {
					a.innerHTML='Viewing';
					a.title=title;
					if (sold==true) {
						a.className='';
						a.innerHTML='Has&nbsp;Ended,&nbsp;Delete?';
						a.addEventListener('click', function (e) {
							e.preventDefault();
							e.stopPropagation();
							localStorage.removeItem('bid_grabber_'+auction.getAID());

							$('div#tab-wrap').fadeOut('slow',function(){
								$(this).remove();
							});
							listOfAuctions();
							return(false);
						}, false);

						a.title='Click to delete localStorage data!'
					}
					a.target='_self'
				} else {
					a.title=title+'\nHold CTRL to open in new tab';
					a.target='_self';
					a.innerHTML=id;
				}

				a.id=auction.getAID();
				div.appendChild(a)
				div.appendChild(document.createElement('br'));
			}
        }

        if (document.getElementById('a_links')) {
            document.getElementById('a_links').parentNode.removeChild(document.getElementById('a_links'))
        }
        if (l_id!=0) {
			$('body').append(div);
		}
	}

    function detailprice(a, b) {
        if (parseFloat(a.amount) > parseFloat(b.amount)) {
            return (-1);
        }
        if (parseFloat(a.amount) < parseFloat(b.amount)) {
            return (1);
        }
        return 0;
    }

    function price(a, b) {
        if (parseFloat(a.amt) > parseFloat(b.amt)) {
            return (-1);
        }
        if (parseFloat(a.amt) < parseFloat(b.amt)) {
            return (1);
        }
        return 0;
    }

    function usersort(a, b) {
        if ((a.user) < (b.user)) {
            return (-1);
        }
        if ((a.user) > (b.user)) {
            return (1);
        }
        return 0;
    }

	function lzw_encode(s) {
		return(s);
		var dict = {};
		var data = (s + "").split("");
		var out = [];
		var currChar;
		var phrase = data[0];
		var code = 256;
		for (var i=1; i<data.length; i++) {
			currChar=data[i];
			if (dict[phrase + currChar] != null) {
				phrase += currChar;
			}
			else {
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				dict[phrase + currChar] = code;
				code++;
				phrase=currChar;
			}
		}
		out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
		for (var i=0; i<out.length; i++) {
			out[i] = String.fromCharCode(out[i]);
		}
		return out.join("");
	}


	function lzw_decode(s) {
		return(s);
		var dict = {};
		var data = (s + "").split("");
		var currChar = data[0];
		var oldPhrase = currChar;
		var out = [currChar];
		var code = 256;
		var phrase;
		for (var i=1; i<data.length; i++) {
			var currCode = data[i].charCodeAt(0);
			if (currCode < 256) {
				phrase = data[i];
			}
			else {
			   phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
			}
			out.push(phrase);
			currChar = phrase.charAt(0);
			dict[code] = oldPhrase + currChar;
			code++;
			oldPhrase = phrase;
		}
		if(out.length==4) return(null);
		return out.join("");
	}

	function formatCurrency(num) {
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num)) num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10) cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + '$' + num + '.' + cents);
	}

	function rm(s){
		localStorage.removeItem('bid_grabber_'+s)
	}

	function CSVDump(){

		$('#ndumpta').empty();
		var dumpStr='';
		dumpStr+='"Amount","User","Bids","Time","Auction Url"\n'
		for(var i=0;i<FullAuctionDetail.length;i++){
			dumpStr+=parseFloat(FullAuctionDetail[i].amt).toFixed(2)+',';
			dumpStr+=FullAuctionDetail[i].user+',';
			dumpStr+=FullAuctionDetail[i].bid_count+',';
			dumpStr+='"'+ctime(FullAuctionDetail[i].time).replace(/  /gm,' ')+'",';
			dumpStr+='"'+document.location.href.toString()+'"\n';
		}
		$('#ndumpta').append(dumpStr);dumpStr='';

	}

} )();