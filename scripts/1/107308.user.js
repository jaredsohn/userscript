// ==UserScript==
// @name           mcmc3
// @namespace      MCMC3
// @include        http://2.pro.tok2.com/%7Ereflection/MCMC/*
// @include        http://2.pro.tok2.com/~reflection/MCMC/*
// ==/UserScript==




//***************************ユーザ設定***************************


// お名前，チーム名，ホームページ，背景色は「"」と「"」の間に入力してください
// ホームページは無ければ入力しなくていいです


//--------------------投稿・投票フォームの設定--------------------

fchk = 0; // 投稿・投票フォーム入力欄を自動入力（0＝しない / 1＝する）
mname = ""; // お名前
mteam = ""; // 所属チーム名
mhmpg = ""; // ホームページ

//----------------------------------------------------------------

//------------------背景色の設定（デフォルト色）------------------

ftclr = "#FF99FF"; // チーム戦背景色１（赤）
etclr = "#66CCFF"; // チーム戦背景色２（青）

//----------------------------------------------------------------


//****************************************************************




function getRnktbln(){
	for(var i=0; i<document.getElementsByTagName("table").length; i++){
		var table=document.getElementsByTagName("table").item(i);
		var tbody=table.getElementsByTagName("tbody").item(0);
		var tr=tbody.getElementsByTagName("tr");
		if(i == 0) {
			var set1 = tr[0].childNodes[0].childNodes[0].childNodes[0];
			set1.innerHTML = '<a href="#set" style="color:#FFFF00;">[順位表]</a>　' + set1.innerHTML;
		}
		if(tr.item(0).getElementsByTagName("td").item(0).innerHTML.match("人が投票した時点での順位")){
			rnktbln=i;
			trcnt=tr.length;
			table.id="set";
			var set2 = tr.item(0).getElementsByTagName("td")[0].childNodes[0].childNodes[1].childNodes[0];
			set2.innerHTML = '<a href="#set" style="color:#FFFF00;">' + set2.innerHTML + '</a>';
		}
	}
}

function getTbl(tbln){
	table=document.getElementsByTagName('table').item(tbln);
	tbody=table.getElementsByTagName('tbody').item(0);
	if(tbln != rnktbln){
	tr=tbody.getElementsByTagName("tr").item(0);
	}
}

function getMuchi(){
	muchi = new Array(4);
	muchi[0] = new Array("集めた瓶はこちらに","ふかし","ポム☆パルフェ","オドロ","２の人","ヤブ医者ボーイ","オーボエＲ");
	muchi[1] = new Array("ガサガサ赤ちゃん","みょくみょく","にゃ","Kagem","HAxAHAxA","深津","カーヴァー");
	muchi[2] = new Array("ジョイナスかくれんぼ","んじょも","かわはぎ","ユンケル","タクス","やきとり","後藤かるひろ");
	muchi[3] = new Array("フェリーやめときな","腰ミノ","住まなくても都","はな","南極宗ペンギン教","温かい図鑑","はだし");
}

function getTVrs(){
	getTbl(0);
	var td=document.getElementsByTagName("td").item(0);
	tvrs = new Array();
	chkd = 0;
	if(td.innerHTML.match("代表戦")){
		chkd = 1;
	}
	for(var i = 0; i < muchi.length; i=i+2){
		if(td.innerHTML.match(muchi[i][0])){
			tvrs[0] = i;
			tvrs[1] = i+1;
		}
	}
}

function getBgClr(){
	bgclr = new Array(1);
	bgclr[0] = new Array(ftclr, etclr);
}

function Format(){
	for(var i = 0; i < 2; i++){
		pt[i] = 0;
		mp[i] = 0;
	}
	rnk = 0;
	maxpoint = 1000;
	drwcnt = 0;
}

function createThead(tbln){
	getTbl(tbln);
	row=table.insertRow(-1);
	row.style.backgroundColor="#FFFFFF";
	head=new Array('MP','点数','チーム名');
	for(var i=0;i<3;i++){
		if(tbln==1 && i==1)continue;
		cell=row.insertCell(-1);
		row.style.borderTop = "solid 2px black";
		cell.align="center";
		if(i==2) {
			cell.colSpan=5;
		}
		b=document.createElement('b');
		ele=document.createElement('font');
		ele.size="-1";
		ele.innerHTML=head[i];
		b.appendChild(ele);
		cell.appendChild(b);
	}
}

function createTbl(tbln){
	getTbl(tbln);
	body=new Array('mp[i]','pt[i]','muchi[tvrs[i]][0]');
		for(var i=0;i<2;i++){
			row=table.insertRow(-1);
			if(i==0){
				row.style.borderTop = "solid 2px black";
			}
			row.style.backgroundColor=bgclr[0][i];
			for(var j=0;j<3;j++){
				if(tbln==1 && j==1)continue;
				cell=row.insertCell(-1);
				cell.align="center";
				if(j==2){
					cell.colSpan=5;
				}
				ele=document.createElement('font');
				ele.size="-1";
				ele.innerHTML=eval(body[j]);
				cell.appendChild(ele);
			}
		}
		row.style.borderBottom = "solid 2px black";
}

function assgnForm(){
	var elmnt = document.getElementsByClassName("IPT");
	elmnt.item(0).value = mname;
	elmnt.item(1).value = mteam;
	elmnt.item(2).value = mhmpg;
}

function getPoint(){
	pt = new Array(2);
	mp = new Array(2);
	Format();
	getTbl(rnktbln);
	var dif = Math.abs(muchi[tvrs[0]].length - muchi[tvrs[1]].length);
	if(dif != 0){
		if(muchi[tvrs[0]].length < muchi[tvrs[1]].length){
			mp[0] += dif;
		} else {
			mp[1] += dif;
		}
	}
	var sum = Math.abs(muchi[tvrs[0]].length + muchi[tvrs[1]].length - 2);
	var chk = 0;
	for(var j = 2; j < trcnt ; j++){
		tr=tbody.getElementsByTagName("tr").item(j);
		name=tr.getElementsByTagName("td").item(5).childNodes[0].innerHTML;
		point=Number(tr.getElementsByTagName("td").item(1).childNodes[0].innerHTML);
		for(var k = 0; k < 2; k++){
			for(var l = 1; l < muchi[tvrs[k]].length; l++){
				if(name.match(muchi[tvrs[k]][l])){
					if(point < maxpoint){
						maxpoint = point;
						rnk += 1 + drwcnt;
						drwcnt = 0;
					} else {
						drwcnt++;
					}
					tr.style.backgroundColor=bgclr[0][k];
					pt[k] += point;
					if(rnk<=sum){
						mp[k] += sum + 1 - rnk;
					} else if(chk == 0) {
						tr.style.borderTop = "double 3px black";
						chk = 1;
					}
				}
			}
		}
	}
	createThead(1);
	createThead(rnktbln);
	createTbl(1);
	createTbl(rnktbln);
}

(function(){
	if(fchk == 1)assgnForm();
	getRnktbln();
	getMuchi();
	getBgClr();
	getTVrs();
	if(chkd == 0)getPoint();
})();
