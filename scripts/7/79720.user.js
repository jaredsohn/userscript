// ==UserScript==
// @name          SQR-view
// @namespace     http://www.ex.ua/*
// @description   Additional buttons in multi object view
// @include       http://www.ex.ua/view/*
// @include       http://www.ex.ua/search?s=*
// @author		   fatalfury aka .bs
// @version		   0.2.2
// ==/UserScript==

var debug = false;
if(!debug || console == 'undefined'){
console = new Object();
console.log = function(){}
}

var lang = {rem: '[rem]',ed: '[ed]',ad2: '[ad2]'},
	selectors = ['include_0','include_1','list'],
	square_list;

for(var s in selectors){
	square_list = document.getElementsByClassName(selectors[s]);
	if(square_list.length != 0) break;
}
if(square_list[0]){
var rows = square_list[0].childNodes[1].getElementsByTagName('tr'),cells;
for(var i=0;i<rows.length;i++){
	cells = rows[i].childNodes;
	for(var j=0;j<cells.length;j++){
		console.log(cells[j].childNodes);
		var cn = cells[j].childNodes[0],link;		
		if(cn &&  typeof cn.href == 'string')
		try{
			link = cn.href;
			var ad2 = link.replace(/view/i,'add_link')
			var rem = ad2.replace(/\?.+/i,'?link_id=4');
			if(rem === ad2){rem = ad2+'?link_id=4'};
			var ed = link.replace(/view/i,'edit').replace(/\?.+/i,'');
			console.log(ed);
			var ws = '<div class="r_button_small">',we = '</div>',targ = cells[j].childNodes[cells[j].childNodes.length-1];
			if(typeof document.getElementsByTagName('body')[0].classList == 'object' && targ.classList.contains('r_button_small'))ws = we ='';
			var tmp = targ.innerHTML;
			targ.innerHTML=tmp+ws+'<a href="'+rem+'">'+lang['rem']+'</a><a href="'+ed+'">'+lang['ed']+'</a><a href="'+ad2+'">'+lang['ad2']+'</a>'+we;
			}catch(e){console.log(e);}
	}
}
}