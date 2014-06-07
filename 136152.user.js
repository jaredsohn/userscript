// ==UserScript==
// @name         amazon parallel import cheker
// @namespace    http://www.yasui-kamo.com/
// @description  supports the parallel imports of amazon.com. is available at amazon.co.jp.
// @include      http://www.amazon.co.jp/*
// @include      https://www.amazon.co.jp/*
// ==/UserScript==

var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var beforeASIN = "none";
var call = 0;

//check forward
function checkForward()
{
	var url = "http://www.yasui-kamo.com/forward/?asin=" + document.getElementById('ASIN').value;
	window.open(url, url);
}

//check SellerList
function checkShipRate()
{
	var url = "http://www.yasui-kamo.com/shiprate/?asin=" + document.getElementById('ASIN').value;
	window.open(url, url);
}

//check data area
function checkDataArea()
{
	if(document.getElementById("parallelimport") == null && call == 1)
	{
		//create check delivery of link
		var linkObj = document.createElement('div');
		linkObj.id = "parallelimport";
		linkObj.style.padding = "10px";
		linkObj.style.fontSize = "0.8em";
		var obj = document.getElementById("btAsinTitle");
		obj.appendChild(linkObj);

		//check delivery
		var obj1 = document.createElement('span');
		obj1.id = "parallelimportworkarea";
		linkObj.appendChild(obj1);

		//how to buy
		document.getElementById("parallelimportworkarea").innerHTML = "<span id='amazonusa'></span><span id='transRate'></span><span id='shiprate'></span>";
		document.getElementById("amazonusa").innerHTML = "<a style=\"padding-right:10px; font-size:0.8em;\" href=\"http://www.amazon.com/dp/"+ document.getElementById('ASIN').value +"/\" title=\"Amazon.comの商品ページを表示します。\">Amazon.com</a>";
		document.getElementById("transRate").innerHTML = "<a id='transRate2' style=\"padding-right:10px; font-size:0.8em;\" href=\"javascript:void(0);\" title=\"転送サービスを使った場合の送料を確認します。\">転送料金を確認</a>";
		document.getElementById("shiprate").innerHTML = "<span id='sellerList' style=\"padding-right:10px; font-size:0.8em;\"><a href=\"javascript:void(0);\" title=\"日本へ配送可能か送料はいくらかチェックできます。\">配送・送料を確認</a></span>";

		document.getElementById("transRate2").addEventListener("click", checkForward, false);
		document.getElementById("sellerList").addEventListener("click", checkShipRate, false);
	}
}

function changeASIN()
{
	if(document.getElementById("parallelimport") != null && call == 1)
	{
		var curASIN = document.getElementById('ASIN').value;
		if(curASIN != beforeASIN && beforeASIN != "none")
		{
			checkAmazonUSA();
		}
	}
}

function checkSellerInfo()
{
	checkDataArea();
	changeASIN();

	setTimeout(checkSellerInfo, 1000);
}

function checkAmazonUSA()
{
	document.getElementById("parallelimport").innerHTML = "<img src=\"http://www.yasui-kamo.com/img/ajax-loader.gif\"> Loading...";

	beforeASIN = document.getElementById('ASIN').value;
	var url = "http://www.amazon.com/dp/" + document.getElementById('ASIN').value;
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		onload : checkProductData
	});
}

function checkProductData(val)
{
	var data = val.responseText;

	//商品データが存在するかチェック
	document.getElementById("parallelimport").innerHTML = "";
	if(data.indexOf("id=\"ASIN\"") == -1)
	{
		document.getElementById("parallelimport").innerHTML = "商品は見つかりませんでした。";
		call = 1;
		return;
	}

	var linkObj = document.getElementById("parallelimport");

	//check delivery
	var obj1 = document.createElement('span');
	obj1.id = "parallelimportworkarea";
	linkObj.appendChild(obj1);

	//how to buy
	document.getElementById("parallelimportworkarea").innerHTML = "<span id='amazonusa'></span><span id='transRate'></span><span id='shiprate'></span>";
	document.getElementById("amazonusa").innerHTML = "<a style=\"padding-right:10px; font-size:0.8em;\" href=\"http://www.amazon.com/dp/"+ document.getElementById('ASIN').value +"/\" title=\"Amazon.comの商品ページを表示します。\">Amazon.com</a>";
	document.getElementById("transRate").innerHTML = "<a id='transRate2' style=\"padding-right:10px; font-size:0.8em;\" href=\"javascript:void(0);\" title=\"転送サービスを使った場合の送料を確認します。\">転送料金を確認</a>";
	document.getElementById("shiprate").innerHTML = "<span id='sellerList' style=\"padding-right:10px; font-size:0.8em;\"><a href=\"javascript:void(0);\" title=\"日本へ配送可能か送料はいくらかチェックできます。\">配送・送料を確認</a></span>";

	document.getElementById("transRate2").addEventListener("click", checkForward, false);
	document.getElementById("sellerList").addEventListener("click", checkShipRate, false);

	call = 1;
}

//main
(function(){
	//check delivery
	if(document.getElementById('ASIN'))
	{
		//create check delivery of link
		var linkObj = document.createElement('div');
		linkObj.id = "parallelimport";
		linkObj.style.padding = "10px";
		linkObj.style.fontSize = "0.8em";
		var titleobj = document.getElementById("btAsinTitle");
		titleobj.appendChild(linkObj);

		checkAmazonUSA();
		checkSellerInfo();
	}
}
)();
