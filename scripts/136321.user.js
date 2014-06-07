//update 2012-08-08 支持一号店
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          团购排序
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   允许对团购网站商品按照价格或者销量排序
// @include       http://*ju.taobao.com*
// @include       http://*tuan.360buy.com*
// @include       http://www.yihaodian.com/tuangou/*
// ==/UserScript==


//let's modify some styles... here I fix the width of the title and get rid of "Public/Private" and Playlist creation information, which are on my opinion quite useless.
GM_addStyle(".watch-playlists-drawer .playlist-title { width: auto; } .watch-playlists-drawer .playlist-public-private, .watch-playlists-drawer .created-at { display: none; }");
//here I add some margin to the right. Feel free to modify those styles according to your needs.
GM_addStyle(".watch-playlists-drawer li { float: left; margin-right: 20px; }");

/*** DOCUMENT READY: triggers (buttons) with added calls to this script functions ***/

var  $j;

// Add jQuery

//for yihaodian
if(document.location.host == "www.yihaodian.com"){
    window.onload = new function(){
        $j = unsafeWindow['jQuery'];
        initSortList_yihaodian();
    };
    return;
}

var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  $j = jQuery;
  main();
  /* You put your jQuery code here, which must use the jQuery namespace. See Note. */
}, false);



//taobao
function GM_getTaobaoBuyCount(taobaoItem){
	var buyNumber =  parseInt($j("span.buy-ed strong",item).text());
	//console.info(buyNumber);
	return buyNumber;
}

// All your GM code must be inside this function
function letsJQuery() {
//make sure there is no conflict between jQuery and other libraries
$j = $.noConflict();
//notify that jQuery is running...
  $j('<div>jQuery is running!</div>')
    .css({padding: '10px', background: '#ffc', position: 'absolute',top: '0', width: '100%'})
    .prependTo('body')
    .fadeIn('fast')
    .animate({opacity: 1.0}, 300)
    .fadeOut('fast', function() {
      $(this).remove();
    });
//start custom jQuery scripting.
main();
}

function InitUI (){
//here begins everything
	
	//This is the "Add to" button: it doesn't even have an id, but all this bunch of classes: yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip
	$j("div.return : first").attr("onclick", ";initSortLists();return false;");
	//$("tstart-plugin-myapps").
	//This is the user's profile button, at the top right corner of the website
	//$("#masthead-user-button").attr("onclick", ";initSortHeadLists();return false;");
	
	//alert($);
}

function initSortLists_taobao(){

	var root = $j("ul.clearfix");
	var  products = $j("li",root);
	
	//remove items
	products.each(function(){
	$j(this).remove();
	}
	);
	
	//sort items
	
	products.sort(function(a,b){
	
	var first = parseInt($j("span.buy-ed strong",a).text());
	var second = parseInt($j("span.buy-ed strong",b).text());
	// var first = GM_getTaobaoBuyCount(a);
	// var second = GM_getTaobaoBuyCount(b);
	
	return second  - first;
	}
	);
	
	//add items
	console.info("add item to ....")
	products.each(function(){
	root.append($j(this))
	
	}
	);

}


//360buy
function getBuyCount(item){
return parseInt($j("div.price span:first font",a).text());
}

function initSortLists_360buy(){

	var root = $j("div.pro");
	var  products = $j("div.pro div.product");	
	
	//remove items
	products.each(function(){
	$j(this).remove();
	}
	);
	
	//sort items
	
	products.sort(function(a,b){
	
	var first;
	var second;
	first = parseInt($j("div.price span:first font",a).text());
	second = parseInt($j("div.price span:first font",b).text());
	
	if(second > first){
	return 1;
	}
	else{
	return -1;
	}
	
	}
	);
	
	//add items
	products.each(function(){
	root.append($j(this))
	}
	);

}

//yihaodian
function initSortList_yihaodian(){
    var root = $j("ul.tuan_list.clearfix");
	var products = $j("li",root);
	//remove items
	products.each(function(){
	$j(this).remove();
	}
	);
	
	
	//sort items
	
	products.sort(function(a,b){
	
	var first;
	var second;
	first = parseInt($j("p.buy_info span.fr.buyNum strong",a).text());
	second = parseInt($j("p.buy_info span.fr.buyNum strong",b).text());
	
	if(second > first){
	return 1;
	}
	else{
	return -1;
	}
	
	}
	);
	
	//add items
	products.each(function(){
	root.append($j(this))
	}
	);
	
}

//main
function main(){
var hostName = document.location.host;
if(hostName == "ju.taobao.com")
	{
		//taobao
		console.info("taobao sorting....");
		initSortLists_taobao();
	}
else if(hostName == "tuan.360buy.com")
	{
		//360buy
		console.info("360buy sorting....");
		initSortLists_360buy();
	}
else if(hostName == "yihaodian.com")
    {
        //yihaodian
        console.info("yihaodian sorting...");
        initSortList_yihaodian();
    }
}
