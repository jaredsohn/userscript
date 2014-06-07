// ==UserScript==
// @name           bro3-DonateStatMeter2
// @version        0.25
// @namespace      http://m21.3gokushi.jp/village.php
// @description    同盟の寄付の合計などの情報を表示。同盟コメント下部に表示します。同盟拠点導入後、同盟新仕様に対応しました。
// @include        http://m21.3gokushi.jp/alliance/info.php?id*
// ==/UserScript==
// ver 0.25 同盟内公開
(function () {

	var maxPers=new Array(20);
	var reqDonate=new Array(20);
	var dispAlert =0; //アラートによる表示オプション

//旧同盟仕様
//	maxPers[0]=20;
//	maxPers[1]=23;
//	maxPers[2]=27;
//	maxPers[3]=33;
//	maxPers[4]=40;
//	maxPers[5]=48;
//	maxPers[6]=57;
//	maxPers[7]=68;
//	maxPers[8]=82;
//	maxPers[9]=100;
//	maxPers[10]=120;
//	maxPers[11]=145;
//	maxPers[12]=170;
//	maxPers[13]=210;
//	maxPers[14]=240;
//	maxPers[15]=300;
//	maxPers[16]=350;
//	maxPers[17]=430;
//	maxPers[18]=510;
//	maxPers[19]=600;

//	reqDonate[0]=0;
//	reqDonate[1]=30000;
//	reqDonate[2]=60000;
//	reqDonate[3]=120000;
//	reqDonate[4]=288000;
//	reqDonate[5]=676800;
//	reqDonate[6]=1556640;
//	reqDonate[7]=3502440;
//	reqDonate[8]=7705370;
//	reqDonate[9]=16566540;
//	reqDonate[10]=34789740;
//	reqDonate[11]=69579970;
//	reqDonate[12]=135679970;
//	reqDonate[13]=257791950;
//	reqDonate[14]=476915100;
//	reqDonate[15]=858447190;
//	reqDonate[16]=1502282570;
//	reqDonate[17]=2553880380;
//	reqDonate[18]=4213902620;
//	reqDonate[19]=6742244200;

	maxPers[0]=20;
	maxPers[1]=43;
	maxPers[2]=47;
	maxPers[3]=53;
	maxPers[4]=60;
	maxPers[5]=68;
	maxPers[6]=77;
	maxPers[7]=88;
	maxPers[8]=102;
	maxPers[9]=120;
	maxPers[10]=140;
	maxPers[11]=165;
	maxPers[12]=190;
	maxPers[13]=230;
	maxPers[14]=260;
	maxPers[15]=320;
	maxPers[16]=370;
	maxPers[17]=450;
	maxPers[18]=530;
	maxPers[19]=600;

	reqDonate[0]=0;
	reqDonate[1]=30000;
	reqDonate[2]=60000;
	reqDonate[3]=120000;
	reqDonate[4]=288000;
	reqDonate[5]=676800;
	reqDonate[6]=1556640;
	reqDonate[7]=3502440;
	reqDonate[8]=7705370;
	reqDonate[9]=16566540;
	reqDonate[10]=34789740;
	reqDonate[11]=69579970;
	reqDonate[12]=135679970;
	reqDonate[13]=257791950;
	reqDonate[14]=476915100;
	reqDonate[15]=858447190;
	reqDonate[16]=1502282570;
	reqDonate[17]=2553880380;
	reqDonate[18]=4213902620;
	reqDonate[19]=6742244200;

	
//	tmpXpath = '/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[2]/td';
	tmpXpath = '/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[3]/td';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	alName=a.snapshotItem(0).textContent;
//	alert(alName);
	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[4]/td';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	alMemNum=a.snapshotItem(0).textContent;
//	alert(alMemNum);
	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[4]/td[2]';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	alLv=a.snapshotItem(0).textContent;
//	alert(alLv);
	
	myD = new Date();
	timeStr=(myD.getYear()+1900)+'-'+(myD.getMonth()+1)+'-'+myD.getDate()+' '+
	myD.getHours()+':'+myD.getMinutes()+':'+myD.getSeconds();
//	alert(timeStr);
	
//	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table[2]/tbody';
	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table[3]/tbody';

	a=document.evaluate(tmpXpath, document, null, 7, null);
	tbody=a.snapshotItem(0);
	var donateAll=0;
	for (var i = 0; i < alMemNum; i++) {
		donateAll+=Number(tbody.rows[i+2].cells[3].firstChild.data);
	}
	
	var roomPers=maxPers[alLv-1]-Number(alMemNum);
	
	var dispStr=timeStr+', '+alName+', '+alMemNum+'人, '+'Lv:'+alLv+', 寄付合計:'+donateAll+'\n'+
	'あと'+roomPers+'人、加入できます\n';
	
	if (alLv==20){
		dispStr=dispStr+'これ以上同盟レベルは上昇できません。';
	}else{
		var finRate=((reqDonate[Number(alLv)]-donateAll)/(reqDonate[Number(alLv)]-reqDonate[Number(alLv)-1])*(-100))+100;
//		alert((reqDonate[Number(alLv)]-donateAll));
//		alert((reqDonate[Number(alLv)]-reqDonate[Number(alLv)-1]));
		dispStr=dispStr+'LvUPに必要な寄付額: '+(reqDonate[alLv]-donateAll)+'\n'+
		'LvUPに必要な１人当たりの寄付額: '+((reqDonate[alLv]-donateAll)/alMemNum).toFixed(1)+'\n'+
		finRate.toFixed(1)+'%終了\n';
		dispStr=dispStr+'Lv'+alLv+' ';
		for (var jj = 0; jj < 10; jj++) {
			if(finRate>jj*10){
			dispStr=dispStr+'■';
			}else{
			dispStr=dispStr+'□';}
		}
		dispStr=dispStr+' Lv'+Number(Number(alLv)+1);

	}
	
	tmpXpath='/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[7]/td';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	
	addHTML='<br><br>----------<br>同盟寄付情報<br>'+
		dispStr.replace(/\n/g,'<br>')+
		'<br>----------';
	a.snapshotItem(0).innerHTML=a.snapshotItem(0).innerHTML+addHTML;

	if(dispAlert){
	alert(dispStr);}
})();
