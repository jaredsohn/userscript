// ==UserScript==
// @name           Rent Chart
// @namespace      http://d.hatena.ne.jp/Lhankor_Mhy/
// @description    HOMES家賃相場表をlivedoorの駅所要時間一覧で表示
// @include        http://transit.livedoor.com/nmin_search/*
// ==/UserScript==

( function(){

window.addEventListener(
'load',
function() {
	var menu = document.createElement("div");
	menu.innerHTML = '家賃相場一覧//<span id="type00">全物件</span>||<span id="type11">アパート</span>||<span id="type12">マンション</span>||<span id="type13">一戸建</span>';
	document.getElementById("content").insertBefore(menu, document.getElementById("content").childNodes[2]);
	document.getElementById('type00').addEventListener('click', function(event) {
		rent("");
	}, true);
	document.getElementById('type11').addEventListener('click', function(event) {
		rent("/tk=3/bg=1/");
	}, true);
	document.getElementById('type12').addEventListener('click', function(event) {
		rent("/tk=3/bg=2/");
	}, true);
	document.getElementById('type13').addEventListener('click', function(event) {
		rent("/tk=3/bg=3/");
	}, true);
},
true);

function rent(built_type){
	var a = document.evaluate(
	"//table[@class='information_stations']/tbody/tr/td[1]/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	//alert(a.snapshotLength);
	n = new Array();
	var i_max = a.snapshotLength - 1;
	(function rent_write(i) {
		n[i] = a.snapshotItem(i);
		var g_url = 'http://www.google.co.jp/search?q='+encodeURIComponent(n[i].innerHTML)+'+site%3Ayachin.homes.co.jp%2Fstation_detail';
		GM_xmlhttpRequest({ method: 'GET',
			url: g_url,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var re = responseDetails.responseText;
				var qRegexp= new RegExp('<a href="(http:\/\/yachin.homes.co.jp\/station_detail\/ad11=[0-9]*\/rosen=[0-9]*\/eki=[0-9]*)[^>]*?" class=l[^>]*><b>'+n[i].innerHTML+'<\/b>駅の賃貸');
				var f = re.match(qRegexp);
				//alert(f);
				if (f) {
					n[i].href = RegExp.$1 + built_type;
					GM_xmlhttpRequest({ method: 'GET',
						url: n[i].href,
						headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'application/atom+xml,application/xml,text/xml',
						},
						onload: function(responseDetails) {
							var re2 = responseDetails.responseText;
							var planRegexp= new RegExp('class="yachinTable">.*?<\/tr><tr>(.*?)<\/tr>');
							re2= re2.replace(/\n/g,"");
							re2.match(planRegexp);
							//alert(RegExp.$1);
							
							var chg = RegExp.$1;
							var chg_target = n[i].parentNode.parentNode;
							var chg_html = chg_target.innerHTML;
							chg_html= chg_html.replace(/\n/g,"");
							var chgRegexp= new RegExp('(<td.*分<\/td>)');
							chg_html.match(chgRegexp);
							//prompt("",chg_target);
							chg_target.innerHTML =RegExp.$1+chg;
							
							if (i < i_max) rent_write(i+1);
						}
					});
				}else{
					if (i < i_max) rent_write(i+1);
				}
			}
		});
	})(0)
	
	document.getElementById("nmin_title").innerHTML = "<th>駅</th><th>所要時間</th><th>1R</th><th>1K</th><th>1DK</th><th>1LDK</th><th>2K</th><th>2DK</th><th>2LDK</th><th>3K</th><th>3DK</th><th>3LDK</th><th>4K</th><th>4DK</th>";
	document.getElementById("wrapper").style.width = document.getElementById("content").style.width="900px";

}
})();
