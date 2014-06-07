// ==UserScript==
// @name           ticker
// @namespace      smk
// @description    adds yahoo finance ticker
// @include        http://*
// ==/UserScript==

let flashvars=[
	['textLoading','Loading ...'],
	['fetchOnStart','true'],
	['updateInterval','0'],
	['readyCallback','YAHOO.Finance.Ticker.swfCallback'],
	['isPaused','0'],
	['speed','2'],
	//edit the line below to customize the ticker, descriptor is everything before the question mark
	['symbols','CWGIX,BXC,GOOGLE?GOOG']
];
let options={
	'updateInterval':15*60*1000
};

function addTicker(){
	/**
	adds or updates the ticker
	*/
	if(top!=self) return;
	let ticker=document.getElementById('yahooFinanceTickerGreasemonkey');
	if(ticker){
		//update
		ticker.innerHTML=ticker.innerHTML;
	}else{
		let ticker=document.createElement('div');
		ticker.style.backgroundColor="black";
		//enable scrolling
		let symbols,symbolsIndex;
		for(let i=0;i<flashvars.length;i++) if(flashvars[i][0]=='symbols'){symbolsIndex=i; break;}
		if(symbolsIndex>0 && (symbols=flashvars[symbolsIndex][1]) && symbols.length>0){
			for(let times=30/symbols.replace(/,.*?\?/,',').length,i=0;i<times;i++) symbols+=','+flashvars[symbolsIndex][1];
			flashvars[symbolsIndex][1]=escape(symbols);
		}
		let flashvarsStr='';
		for(let i=0;i<flashvars.length;i++){
			flashvarsStr+=flashvars[i][0]+'='+flashvars[i][1]+((i!=flashvars.length-1)?'&':'');
		}
		ticker.id='yahooFinanceTickerGreasemonkey';
		ticker.innerHTML=
			'<embed type="application/x-shockwave-flash" src="http://us.js2.yimg.com/us.yimg.com/i/us/fi/swf/financeticker_1.12.swf"'+
			'allowscriptaccess="always" '+
			'flashvars="'+flashvarsStr+'"'+
			' width="100%" height="20px">';
		document.body.appendChild(ticker);
	}
}

function main(){
	addTicker();
	if(options.updateInterval && options.updateInterval){
		window.setTimeout(addTicker,options.updateInterval.toString());
	}
}

main();
