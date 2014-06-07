// ==UserScript==
// @name           Amazon Lowest Price Checker
// @namespace      http://gigi-net.net
// @include        http://www.amazon.co.jp/*
// ==/UserScript==
(function(){
//価格を3ケタ区切りにする関数
function SetPrice(price){
　var num = new String(price).replace(/,/g, "");
　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
　return num;
}


//価格を数値に変換
function ConvertPrice(price){
	var result="";
	for(var i =0;i<6;i++){
		price = price.replace(/\D+/,"")
		result =price;
	}
	return parseInt(result);
}

//APIURL定義
var api_url ="http://api.kakaku.com/Ver1.1/ItemSearch.aspx";

//商品ページかどうか判定
	a = document.getElementById("buyboxTable");
	if(a ==null){
	var flag =0;
	}else{
	var flag =1;
	}


if(flag ==1){
//ロード中メッセージ表示
var title =document.getElementsByTagName("h1");
var check_lowest =document.createElement("div");
check_lowest.innerHTML ="<img src='http://img.f.hatena.ne.jp/images/fotolife/g/gigi-net/20090421/20090421143419.gif?1240292104' style='vertical-align:middle'>価格.comから最低価格を読み込んでいます。";
title[0].parentNode.appendChild(check_lowest);

//製品型番を取得
var kataban ="";
try{
	var dom_kataban =document.getElementById("productDetailsDiv").childNodes[0];
	for(var i=0;i<dom_kataban.childNodes.length;i++){
		if(dom_kataban.childNodes[i].innerHTML.indexOf("メーカー型番") !=-1){
			kataban = dom_kataban.childNodes[i].innerHTML;
		}
	}
}catch(e){
	var kataban ="";
}
if(kataban !=""){
	kataban =kataban.replace(/<.*>/,"");
}else{
	check_lowest.innerHTML ="<b>Error:</b>商品の型番が取得できませんでした。";
	title[0].parentNode.appendChild(check_lowest);
}
//価格comAPIを用いて型番から最安値を取得
xml_url =api_url +"?Keyword="+encodeURIComponent(kataban)+"&CategoryGroup=ALL&SortOrder=pricerank&HitNum=5";

//Amazon.comの価格を取得
var ap =0;
try{
var amazon_price = document.getElementById("buyboxPriceBlock");
amazon_price = amazon_price.getElementsByTagName("table")[0];
amazon_price = amazon_price.getElementsByTagName("tbody")[0]
amazon_price = amazon_price.getElementsByTagName("tr");
	var table = amazon_price[0].getElementsByTagName("td");
		if(table[0].getElementsByTagName("b")[1].getAttribute("class") =="price"){
		ap = table[0].getElementsByTagName("b")[1].innerHTML;
		}else if(table[0].getElementsByTagName("span")[0].getAttribute("class") =="price"){
		ap = table[0].getElementsByTagName("span")[0].innerHTML;
		}
}catch(e){
try{
var ap =0;
var amazon_price = document.getElementById("priceBlock");
amazon_price = amazon_price.getElementsByTagName("table")[0];
amazon_price = amazon_price.getElementsByTagName("tbody")[0]
amazon_price = amazon_price.getElementsByTagName("tr");
for(var i=0;i<amazon_price.length;i++){
	var table = amazon_price[i].getElementsByTagName("td");
	if(table[0].innerHTML.indexOf("価格") == 0){
		if(table[1].getElementsByTagName("b")[0].getAttribute("class") =="priceLarge"){
		ap = table[1].getElementsByTagName("b")[0].innerHTML;
		}else if(table[1].getElementsByTagName("span")[0].getAttribute("class") =="priceLarge"){
		ap = table[1].getElementsByTagName("span")[0].innerHTML;
		}
	}
	}
}catch(e){
	var ap =0;
	}
}
ap = ConvertPrice(ap);


//価格表示関数
function ShowPrice(x){
	var parser = new DOMParser();
	var xml = parser.parseFromString( x.responseText, "text/xml" );
	if(xml.childNodes[0].childNodes[0].textContent =="ItemNotFound"){
		check_lowest.innerHTML="<b>Error:</b>価格.comで該当商品が見つかりませんでした。";
	}else{
		var dom_price = xml.getElementsByTagName("ProductInfo")[0].getElementsByTagName("Item")[0].getElementsByTagName("LowestPrice");
		var pageurl = xml.getElementsByTagName("ProductInfo")[0].getElementsByTagName("Item")[0].getElementsByTagName("ItemPageUrl");
		price = dom_price[0].textContent;
		var sa =ap-price;
		check_lowest.innerHTML ="<b>最低価格：<span class='priceLarge'> &yen;  "+SetPrice(price)+"</span></b>";
		if(sa>0&&ap!=0&&sa<100000){
		check_lowest.innerHTML += " <font size=3>  Amazonより<span class='priceLarge'> &yen; "+SetPrice(sa)+"</span>安く買えます。</font>";
		}
		check_lowest.innerHTML +="<font size=3><a target='_blank' href="+pageurl[0].textContent+">価格.comを見る</a></font>";
		check_lowest.style.fontSize ="18px";
	}
	title[0].parentNode.appendChild(check_lowest);
}

//APIからXMLを読み込んで表示する。
if(kataban !=""){
	GM_xmlhttpRequest({
	  method:"GET", 
	  url:xml_url,
	  onload:ShowPrice
	});
};

//著作表示
var powered =document.createElement("div");
powered.innerHTML +=" <center>powered by <a href ='http://kakaku.com/'>価格.com</a></center>";
document.body.appendChild(powered);
}

})();