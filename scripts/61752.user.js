// ==UserScript==
// @name           lilbuff
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/return-lost.php*
// ==/UserScript==

function rfs(k){
	var x='bra'+k;
	var y=document.getElementById(x).value;
	parseData(y,tt[k]);
	if(k>0)rfs(k-1);}

function sfs(){
	rfs(17);}

function parseResults(msg, num) {
	var oldNum = GM_getValue('usednum', 0);
	if (oldNum<1)
		GM_setValue('usemsg', msg);
	GM_setValue('usednum', num+oldNum);}

function parseData(a,b) {
	var num = a;
	var item = b;
	var pwd = document.getElementsByName('pwd')[0].value;
	var target = document.getElementsByName('bufftarget')[0].value;
	var data = encodeURI("pwd="+pwd+"&which="+item+"&bufftarget="+target);
	GM_setValue('usednum',0);
	returnItems(data, num);}

function returnItems(data, num) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.twilightheroes.com/return-lost.php?'+data,
		onload: function(responseDetails) {
				GM_log('returned 1 item:'+data);
				parseResults(responseDetails.responseText, 1);
				if (--num > 0)
					returnItems(data, num);},});
	return num;}

var inputs = document.getElementsByTagName('input');
var datum = document.getElementsByTagName('form');
var hormel = datum[0];
var spam = '<input type="button" id="spammer" value="Go">';
var advTable = document.createElement("table");
var advRow = document.createElement("tr");
var advCell = document.createElement("td");
var t='371;372;373;374;375;376;377;872;870;874;1009;1010;1011;1012;1013;1014;1015;1016';
var tt=t.split(';');
var bra=t.split(';');
for(var x=0;x<18;x++){
	bra[x]='bra'+x;
	GM_setValue(bra[x],0);
	GM_log(bra[x]);}	
advCell.innerHTML= 	'Spam Computer <br> Return: <br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[0]+
			'" value="'+
			GM_getValue(bra[0],1)+
			'">lost keys;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[1]+
			'" value="'+
			GM_getValue(bra[1],1)+
			'">lost souls;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[2]+
			'" value="'+
			GM_getValue(bra[2],1)+
			'">lost socks;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[3]+
			'" value="'+
			GM_getValue(bra[3],1)+
			'">lost remotes;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[4]+
			'" value="'+
			GM_getValue(bra[4],1)+
			'">lost phones;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[5]+
			'" value="'+
			GM_getValue(bra[5],1)+
			'">lost toys; and<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[6]+
			'" value="'+
			GM_getValue(bra[6],1)+
			'">lost wallets.<br>Send:<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[7]+
			'" value="'+
			GM_getValue(bra[7],1)+
			'">white elephants;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[8]+
			'" value="'+
			GM_getValue(bra[8],1)+
			'">razzberries; and<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[9]+
			'" value="'+
			GM_getValue(bra[9],1)+
			'">plaudits bars.<br>Gift:<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[10]+
			'" value="'+
			GM_getValue(bra[10],1)+
			'">candy canes;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[11]+
			'" value="'+
			GM_getValue(bra[11],1)+
			'">gumdrops;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[12]+
			'" value="'+
			GM_getValue(bra[12],1)+
			'">fruitcakes;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[13]+
			'" value="'+
			GM_getValue(bra[13],1)+
			'">holiday wreaths;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[14]+
			'" value="'+
			GM_getValue(bra[14],1)+
			'">roast beasts;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[15]+
			'" value="'+
			GM_getValue(bra[15],1)+
			'">eggnog;<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[16]+
			'" value="'+
			GM_getValue(bra[16],1)+
			'">gingerbread men; and<br>'+
			'<input type="text" maxlength="3" style="width:22px" id="'+
			bra[17]+
			'" value="'+
			GM_getValue(bra[17],1)+
			'">toy soldiers.<br>'+
			spam;
advRow.insertBefore(advCell,null);
advTable.insertBefore(advRow,null);
hormel.parentNode.insertBefore(advTable, hormel);
document.getElementById("spammer").addEventListener(
						"click", 
						sfs,
						true);
