// ==UserScript==
// @name           Remedy
// @namespace      Remedy
// @include        http://nj08isp004.mhf1.mhf.mhc:9000/*
// ==/UserScript==

//Get Maximum Window Size
//window.onResize = main()

window.addEventListener("resize", function() {main()},true);

try{
	//adjust button tops
	document.getElementsByClassName('btn btn3d arfid300529400 ardbnNewRequest_btn')[0].style.top = (document.getElementsByClassName('btn btn3d arfid300529400 ardbnNewRequest_btn')[0].style.top.replace('px','') - 4) + 'px';
	document.getElementsByClassName('btn btn3d arfid350100052 ardbnRefresh2')[0].style.top = (document.getElementsByClassName('btn btn3d arfid350100052 ardbnRefresh2')[0].style.top.replace('px','') - 4) + 'px';
	//More info adjust left
	document.getElementsByClassName('arfid300036000 ardbnBox_1 bs0 trimBox')[0].style.left = (document.getElementsByClassName('arfid300036000 ardbnBox_1 bs0 trimBox')[0].style.left.replace('px','') - 1) + 'px';
	document.getElementsByClassName('arfid300036100 ardbnBox_2 bs0 trimBox')[0].style.left = (document.getElementsByClassName('arfid300036000 ardbnBox_1 bs0 trimBox')[0].style.left.replace('px','') - 0) + 'px';
	
	//adjust tops for bulletin board
	bulletinTop = 760
	document.getElementsByClassName('arfid350201000 ardbntblBulletinBoard')[0].style.top = bulletinTop + 'px';
	document.getElementsByClassName('btn btn3d arfid350100041 ardbnCreateaNewMessage...')[0].style.top = (bulletinTop - 22) + 'px'
	document.getElementsByClassName('btn btn3d arfid350100051 ardbnRefresh')[0].style.top = (bulletinTop - 22) + 'px'
	document.getElementsByClassName('btn btn3d arfid350100001 ardbncmdBBDetails')[0].style.top = (bulletinTop + 85) + 'px'
	document.getElementsByClassName('btn btn3d arfid350100031 ardbnDeleteMessage')[0].style.top = (bulletinTop + 85) + 'px'
	document.getElementsByClassName('arfid260200001 ardbntxt_BBMsgs trimdiv')[0].style.top = (bulletinTop - 22) + 'px'
	
	//Adjust More info height
	increaseHeight = 220	
	document.getElementsByClassName('arfid300036100 ardbnBox_2 bs0 trimBox')[0].style.height = (parseInt(document.getElementsByClassName('arfid300036100 ardbnBox_2 bs0 trimBox')[0].style.height.replace('px','')) + increaseHeight) + 'px';
	document.getElementsByClassName('btn btn3d arfid300000006 ardbnView_btn')[0].style.top = (parseInt(document.getElementsByClassName('btn btn3d arfid300000006 ardbnView_btn')[0].style.top.replace('px','')) + increaseHeight) + 'px';
	document.getElementsByClassName('df  dfro arfid301136000 ardbnDetailsDiary1')[0].style.height = (parseInt(document.getElementsByClassName('df  dfro arfid301136000 ardbnDetailsDiary1')[0].style.height.replace('px','')) + (increaseHeight / 2)) + 'px';
	document.getElementById('arid301136000').style.height = (parseInt(document.getElementById('arid301136000').style.height.replace('px','')) + (increaseHeight / 2)) + 'px';
	document.getElementById('arid301136100').style.height = (parseInt(document.getElementById('arid301136100').style.height.replace('px','')) + (increaseHeight / 2)) + 'px';
	
	//arid301136000
	
	document.getElementsByClassName('df  dfro arfid301136100 ardbnDetailsDiary2')[0].style.top = (parseInt(document.getElementsByClassName('df  dfro arfid301136100 ardbnDetailsDiary2')[0].style.top.replace('px','')) + (increaseHeight / 2)) + 'px';
	document.getElementsByClassName('df  dfro arfid301136100 ardbnDetailsDiary2')[0].style.height = (parseInt(document.getElementsByClassName('df  dfro arfid301136100 ardbnDetailsDiary2')[0].style.height.replace('px','')) + (increaseHeight / 2)) + 'px';
	
	
} catch(e){
	GM_log(e)
}

main();
function main(){

iMaxHeight = document.documentElement.clientWidth - 200;
iMaxWidth = document.documentElement.clientWidth - 20 - 135;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('td.BaseTableCell, td.BaseTableCellOdd {padding:1px 0 1px 0px ! important; } .TableHdr{width: ' + (iMaxWidth - 2) + ' !important; .BaseTableOuter{width:' + (iMaxWidth) + 'px !important;}');
//document.getElementsById('FormContainer').style.height = '100%';

try {
	//Top portion where the tickets are listed
	document.getElementsByClassName('arfid260000000 ardbnSupportRequests')[0].style.width = iMaxWidth + 'px';
	document.getElementsByClassName('TableInner')[1].style.width = (iMaxWidth - 2) + 'px';
	//document.getElementsByClassName('BaseTableOuter')[0].style.width = (iMaxWidth - 2) + 'px';
	//document.getElementsByClassName('BaseTableOuter')[1].style.width = (iMaxWidth - 2) + 'px';
	//document.getElementsByClassName('BaseTableInner')[0].style.width = (iMaxWidth - 2) + 'px';
	//document.getElementsByClassName('BaseTableInner')[1].style.width = (iMaxWidth - 2) + 'px';
	
	//BaseTableOuter
	
	//document.getElementsByClassName('arfid260000000 ardbnSupportRequests')[0].style.height = 400 + 'px';

	//Create Refresh buttons
	document.getElementsByClassName('btn btn3d arfid300529400 ardbnNewRequest_btn')[0].style.left = (iMaxWidth - 20) + 'px'
	document.getElementsByClassName('btn btn3d arfid350100052 ardbnRefresh2')[0].style.left = (iMaxWidth + 61) + 'px'
	
	//The More information section
	//Top Window
	document.getElementsByClassName('arfid300036000 ardbnBox_1 bs0 trimBox')[0].style.width = (iMaxWidth - 2) + 'px';
	//Bottom Window
	document.getElementsByClassName('arfid300036100 ardbnBox_2 bs0 trimBox')[0].style.width = (iMaxWidth - 2) + 'px';
	
	//The more information section buttons
	document.getElementsByClassName('btn btn3d diary')[0].style.left = (iMaxWidth - 300) + 'px'
	document.getElementsByClassName('btn btn3d diary')[1].style.left = (iMaxWidth - 300) + 'px'

	//Description and Work log
	document.getElementsByClassName('df  dfro arfid301136000 ardbnDetailsDiary1')[0].style.width = (iMaxWidth - 310) + 'px'
	document.getElementById('arid301136000').style.width = (iMaxWidth - 365) + 'px'

	document.getElementsByClassName('df  dfro arfid301136100 ardbnDetailsDiary2')[0].style.width = (iMaxWidth - 310) + 'px'
	document.getElementById('arid301136100').style.width = (iMaxWidth - 365) + 'px'

	//Bulletin Board
	document.getElementsByClassName('arfid350201000 ardbntblBulletinBoard')[0].style.width = iMaxWidth + 'px';
	document.getElementsByClassName('TableInner')[2].style.width = (iMaxWidth - 2) + 'px';
	//Create Refresh buttons
	document.getElementsByClassName('btn btn3d arfid350100041 ardbnCreateaNewMessage...')[0].style.left = (iMaxWidth - 20) + 'px'
	document.getElementsByClassName('btn btn3d arfid350100051 ardbnRefresh')[0].style.left = (iMaxWidth + 61) + 'px'
	
} catch(e){
	GM_log(e)
}

try {
	//Style fix for other parts
	document.getElementsByClassName('btn btn3d arfid536870905 ardbnbtn_New_Request')[0].style.top = '612px'
	document.getElementsByClassName('btn btn3d arfid536870905 ardbnbtn_New_Request')[0].style.left = (document.getElementsByClassName('btn btn3d arfid536870905 ardbnbtn_New_Request')[0].style.left.replace('px','') - 20) + 'px';
}catch(e){
	GM_log(e)
}
}