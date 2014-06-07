// ==UserScript==
// @name		ExtendDMTwitter
// @namespace	http://www.kanasansoft.com/
// @description Edtend DM of Twitter (add DM button on timeline. sort user name in the pull-down menu. add incremental search for user name.)
// @include		http://twitter.com
// @include		https://twitter.com
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// ==/UserScript==

(function(){

	var className	=	"ExtendDMTwitter";
	var paramName	=	"addressee";
	var src			=	"data:image/png,"													+
						"%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%10%02%03"	+
						"%00%00%00o%83g%B5%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%0CPLTE"	+
						"%00-g%CC%CC%CC%FF%FF%FF%99%99%99%18%AAN%E9%00%00%00%01tRNS%00%40"	+
						"%E6%D8f%00%00%00%01bKGD%00%88%05%1DH%00%00%00%09pHYs%00%00%0B%13"	+
						"%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D8%03%0D%10%124%C"	+
						"2%15%B1%F9%00%00%00AIDAT%08%D7c%60%80%00%FE%FF%40%C0%C0%60%1A%0A"	+
						"%04%07%18%AE%82%A8%02%86%5B%ABB%97F%81%A8%A9%2B%B3%80T%D8%D2U%AB"	+
						"%80T(%8CZ6%0B%2C%08U%02%A1%C0%1A%A0%DA%A1%86A%8D%86%00%00%03y-%8"	+
						"8w%F9c%AB%00%00%00%00IEND%AEB%60%82"								;
/*
	var src			=	"data:image/png,"													+
						"%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%10%02%03"	+
						"%00%00%00o%83g%B5%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%0CPLTE"	+
						"%00-g%99%99%99%FF%FF%FF%CC%CC%CC%FA%FE%91S%00%00%00%01tRNS%00%40"	+
						"%E6%D8f%00%00%00%01bKGD%00%88%05%1DH%00%00%00%09pHYs%00%00%0B%13"	+
						"%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D8%03%0D%10%0D%11"	+
						"DKk%20%00%00%00AIDAT%08%D7c%60%80%00%FE%FF%40%C0%C0%60%1A%0A%04%"	+
						"07%18%AE%82%A8%02%86%5B%ABB%97F%81%A8%A9%2B%B3%80T%D8%D2U%AB%80T"	+
						"(%8CZ6%0B%2C%08U%02%A1%C0%1A%A0%DA%A1%86A%8D%86%00%00%03y-%88w%F"	+
						"9c%AB%00%00%00%00IEND%AEB%60%82"									;
*/
/*
	var src			=	"data:image/png,"													+
						"%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%10%02%03"	+
						"%00%00%00o%83g%B5%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE"	+
						"%00%C0%02%FF%FF%FF%99%99%99EmL%A3%00%00%00%01tRNS%00%40%E6%D8f%0"	+
						"0%00%00%3EIDAT%08%D7c%E0Z%05%04%0C%0C%AA%A1%40%D0%C00%15D%25%C0%"	+
						"A8Y%ABB%97F%81%A8%A9%2B%B3%80T%D8%D2U%AB%80T(%8CZ6%0B%2C%08U%02%"	+
						"A1%C0%1APM%81%1A%0D%B1%08%00%97%9A%2B%A8Y%DE%DA%3A%00%00%00%00IE"	+
						"ND%AEB%60%82"														;
*/
/*
	var src			=	"data:image/png,"													+
						"%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%10%08%06"	+
						"%00%00%00%12%ED%8F%26%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00zID"	+
						"AT8%CB%D5T%5B%0E%C0%20%08%AB%86%B3%DA3yZ%F6%B1%99%B8L%F1%FD%B1~!"	+
						"%C1R%1A%C5%A9*%00%80%E4%1D%2C%22%C6%E8%00%00%AA%8A%10%82%EE%C2%C"	+
						"3%85%AD%A49%B9%C7!H%0AH%D6%3C%7B%9DS%5D%2B%DFT%5Ck%98%E7K5b)L%17"	+
						"H~%14ZM%9B%8AKd%BD%F0%0B%EF%D5%14%203%FE%F6L%24%3Dd3%96%F8%91%91"	+
						"%87%F0%BB%9Fwl%09%B9Sk%F3%02%BF%BD%7Bt%3D%AF%E5e%00%00%00%00IEND"	+
						"%AEB%60%82"														;
*/

	var getParameter	=	function(){
		var search		=	location.search.match(/^\??(.*)$/);
		if(!search){return;}
		var parameter	=	RegExp.lastParen;
		var parameters	=	parameter.split("&");
		var datasets	=	{};
		for(var i=0;i<parameters.length;i++){
			var buf=parameters[i].split("=");
			if(buf.length!=2){continue;}
			var key		=	decodeURIComponent(buf[0]);
			var val		=	decodeURIComponent(buf[1]);
			if(!datasets[key]){
				datasets[key]=[];
			}
			datasets[key].push(val);
		}
		return datasets;
	}

	var addDMLink	=	function(){
		var entries	=	document.evaluate(
							"//tr[@class='hentry']",
							document,
							null,
							XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
							null
						);
		for(var i=0;i<entries.snapshotLength;i++){
			var entry=entries.snapshotItem(i);
			var extended	=	document.evaluate(
									"td[2]/span[@class='meta entry-meta']/a[@class='"+className+"']",
									entry,
									null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null
								);
			if(extended.snapshotLength!=0){continue;}
			var userName	=	document.evaluate(
									"td[2]/strong[1]/a[1]/text()",
									entry,
									null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null
								).snapshotItem(0).data;
			var entryMeta	=	document.evaluate(
									"td[2]/span[@class='meta entry-meta']",
									entry,
									null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null
								).snapshotItem(0);
			var url			=	location.protocol				+
								"//"							+
								location.host					+
								"/direct_messages?"				+
								encodeURIComponent(paramName)	+
								"="								+
								encodeURIComponent(userName)	;
			var image		=	document.createElement("img");
			var link		=	document.createElement("a");
			image.setAttribute("src",src);
			link.setAttribute("href",url);
			link.setAttribute("class",className);
			link.appendChild(image);
			entryMeta.appendChild(link);
		}
	}

	var sortPulldownmenu		=	function(){
		var buf=[];
		for(var i=0;i<opts.length;i++){
			buf.push(	{	"text"		:	opts[i].text.toLowerCase()		,
							"opts"		:	opts[i]							,
							"toString"	:	function(){return this.text}	}	);
		}
		buf=buf.sort();
		for(var i=0;i<buf.length;i++){
			slct.appendChild(buf[i].opts);
		}
	}

	var synPulldownToTextbox	=	function(){
		incremental.value=opts[opts.selectedIndex].text
	}

	var synTextboxToPulldown	=	function(){
		var find=incremental.value;
		if(find==""){
			for(var i=0;i<opts.length;i++){
				opts[i].style.display="";
			}
			opts.selectedIndex=0;
		}else{
			var cnt=0;
			for(var i=0;i<opts.length;i++){
				if(opts[i].text.toLowerCase().indexOf(find.toLowerCase())!=-1){
					opts[i].style.display="";
					if(cnt==0||opts[i].text==find){
						cnt=i;
					}
				}else{
					opts[i].style.display="none";
				}
			}
			opts.selectedIndex=cnt;
		}
	}

	var setAddressee			=	function(){
		var param	=	getParameter();
		if(!(paramName in param)){return;}
		incremental.value=param[paramName][0];
		synTextboxToPulldown();
	}

	if(	/^\/home(\/.*)?$/.test(location.pathname)		||
		/^\/replies(\/.*)?$/.test(location.pathname)	){
		addDMLink();
		setInterval(addDMLink,5000);
	}

	if(	/^\/direct_messages(\/.*)?$/.test(location.pathname)	){
		var slct=document.getElementById("user_id");
		if(!slct){return;}
		var opts=slct.options;
		if(!opts){return;}
		sortPulldownmenu();
		var incremental=document.createElement("input");
		incremental.setAttribute("type","text");
		incremental.setAttribute("id","incremental_find");
		incremental.setAttribute("style","width:7em;");
		slct.parentNode.insertBefore(incremental,slct);
		slct.addEventListener("change",synPulldownToTextbox,true);
		var handler=(function(){
			var id;
			return function(){
				clearTimeout(id);
				id=setTimeout(synTextboxToPulldown,100);
			}
		})();
		incremental.addEventListener("change",handler,true);
		incremental.addEventListener("click",handler,true);
		incremental.addEventListener("keyup",handler,true);
		setAddressee();
	}

})();
