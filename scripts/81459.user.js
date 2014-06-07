// ==UserScript==
// @name vn_helper
// @version	0.1
// @description	
// @author		
// @namespace ns
//
// @include	http://www.vnations.net/market.php
// @include	http://vnations.net/market.php
//
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==


$(document).ready(function(){
	$('#shownat_msdd').after('<a>[calc VB]</a>').next().css({float: 'right', cursor: 'pointer'})
		.click(function(){
			getExRate();
	});
});

/* 
unsafeWindow.doMarket = function(){
	//var wx = xmlHttp.wrappedJSObject;
	var ux = unsafeWindow.xmlHttp;
	if (ux.readyState==4){
		document.getElementById("marketplace").innerHTML=" ";
		document.getElementById("marketplace").innerHTML=ux.responseText;
	}
}
*/

function getExRate(){

	var buy_cur = /\$\d*.\d* (...)/.exec($('#marketplace td.tab[valign!=center][align!=center]:eq(0)').text())[1];

	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.vnations.net/exchange.php?buyid=0&buyamt=0&buy_cur='+buy_cur+'&sell_cur=VBX&displaydeal=&',
		onload: function(response) {
			if (!response.responseXML) response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");

			var text = response.responseText;
			var re = /Selling \$(\d*.\d*) ... for \$(\d*.\d*) VBX each/g;
			var r, res = [];
			
			while ((r = re.exec(text)) != null) {
				res[res.length] = {v:r[1]*1, r:r[2]*1};
			}

			rpl(res);
		  }
	});

}


function rpl(exRate){
	var je = $('#marketplace td.tab[valign!=middle][valign!=center][align!=center]');

	je.each(function(){
		var re = /<img.*?> \$(\d*.\d*) (...)<br><img.*?> \$(\d*.\d*) .../.exec(this.innerHTML);
		var i = 0;
		while(exRate && exRate[i] && (re[1] > exRate[i].v)){ i++; }

		var html = '<img title="Money" src="/images/icons/money.png"> $'+ re[1] +' ';
		html +=re[2]+'<br><img title="VBux" src="/images/icons/coins.png">';
		if (exRate && exRate[i]){
			html +='$'+ (re[1]*exRate[i].r).toFixed(3)  +' VBX';
		}else{
			html +='$ -- VBX';
		}
		
		this.innerHTML = html;
	});
}








