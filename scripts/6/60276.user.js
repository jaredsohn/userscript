// ==UserScript==
// @name           street-fights-wxaj-v2.7.user
// @namespace      http://apps.facebook.com/street-fights/
// @include        http://apps.facebook.com/street-fights/*
// ==/UserScript==

/*####################################################

          義氣仔女Online V2.7 腦殘版
		    作者 wxaj0928 (海綿寶寶)

代碼開啟 方法:
1.先打開小猴子
2.小猴子 滑鼠右鍵  點 管理腳本
3.點選腳本之後  …選擇左下角的 編輯
4.指定 C碟 裡面的 記事本
5.這樣就能用記事本開啟js檔

####################################################*/


//︽︽︽︽︽︽︽︽︽︽︽  以下 都是自訂參數修改   ︽︽︽︽︽︽︽︽︽︽︽︽
//︽︽︽︽︽︽︽︽︽︽︽  以下 都是自訂參數修改   ︽︽︽︽︽︽︽︽︽︽︽︽

// [0]使用回復時間刷新模式(5分鐘)   [1]自訂刷新時間..修改 ch_min 的時間(分鐘計算)
var ch_time_mode=0;
var ch_min=60;

//視窗高度
var window_top=35;

//BUG回血模式開啟[1]  關閉[0]
var hp_mode=1;

//自動攻擊開啟 [1]   關閉[0]   (關閉是只接任務)
var ch_joborfight_mode=1;

//群毆模式開啟 [1]  關閉[0]
var ch_allfight_mode=1;

//隨機攻擊模式開啟 [1]  關閉[0]
var ch_random_fight_mode=1;

//攻擊對方同伴 X 位以下的    (最大值)   (只對群毆模式 有效)
var ch_friend_max = 300;

//攻擊對方同伴 X 位以以上的  (最小值)   (只對群毆模式 有效)
var ch_friend_min = 20;

//低於自身玩家多少等級才攻擊  (對群毆模式 無效)
var ch_lv=1;

//玩家 HP 高於多少才開始攻擊  (只對 主頁 判定)
var ch_hp=21;

//多少HP跳過補血 直接進行下一波攻擊
var ch_hp_low=50;

//玩家 精神 高於多少才開始攻擊   (只對 主頁 判定) (最低數值要超過1..因為BUG回血模式的關係)
var ch_sta=2;

//指定肥羊攻擊模式 開啟 [1]  關閉[0]
var ch_meme_mode=1;

//肥羊 ID ..需要再增加請以 ch_meme_id[編號]=玩家ID; 以此類推
//我放在名單上的只是網路臨時找ㄉ..不要寫信罵我..先在此說聲抱歉
var ch_meme_id = new Array();
ch_meme_id[0]=1623304347;

//多少金額以上啟動 [追加攻擊]  (必須先"開啟BUG回血模式")
var ch_meme_cash = 10000000;

//多少金額以上啟動 [紀錄肥羊 ID]   (必須先"開啟BUG回血模式")
var ch_meme_save = 100000000;

//賄賂獄警[1]  當好寶寶[0]
var ch_nojail=1;

//執行第幾個任務-代碼如右: 經營外圍投注[12] 走私毒品[11] 綁架重要人物[10] 連環洗劫金鋪[9] 打劫銀行[8]
//放貴利[7] 偷車[6] 走水貨返大陸[5] 麻將館睇埸[4] 幫財務公司收數[3] 賣翻版DVD[2] 代客泊車[1]
var ch_work=12;

//過濾頭銜...有些有公會的玩家才需要改這個
//沒有要過濾的使用      " "      中間有空白喔...絕對要注意..否則會一直刷新頁面不攻擊
//其它像是過濾龍頭的話  "龍頭"   就可以了
var ch_block_id= " ";
var ch_block_id2= " ";

//警告模式 ---還沒想好..目前沒用..別亂動
var ch_alert=0;

//︾︾︾︾︾︾︾︾︾︾︾  以上 都是自訂參數修改  ︾︾︾︾︾︾︾︾︾︾︾︾
//︾︾︾︾︾︾︾︾︾︾︾  以上 都是自訂參數修改  ︾︾︾︾︾︾︾︾︾︾︾︾





//＝＝＝＝＝＝＝＝＝ 下面都是  程式碼  別亂動  ＝＝＝＝＝＝＝＝＝＝＝＝
//＝＝＝＝＝＝＝＝＝ 下面都是  程式碼  別亂動  ＝＝＝＝＝＝＝＝＝＝＝＝
//＝＝＝＝＝＝＝＝＝ 下面都是  程式碼  別亂動  ＝＝＝＝＝＝＝＝＝＝＝＝
//＝＝＝＝＝＝＝＝＝ 下面都是  程式碼  別亂動  ＝＝＝＝＝＝＝＝＝＝＝＝
//＝＝＝＝＝＝＝＝＝ 下面都是  程式碼  別亂動  ＝＝＝＝＝＝＝＝＝＝＝＝
//＝＝＝＝＝＝＝＝＝ 下面都是  程式碼  別亂動  ＝＝＝＝＝＝＝＝＝＝＝＝

//定義任務對應體力需求
var ch_en=new Array(1,3,5,7,10,12,14,16,20,25,30,35);

//任務對應可得經驗
var exp_en=new Array(1,3,5,8,12,15,16,22,28,35,44,52);

var ch_work_name=new Array("代客泊車","賣翻版DVD","幫財務公司收數","麻將館睇埸","走水貨返大陸","偷車","放貴利","打劫銀行","連環洗劫金鋪","綁架重要人物","走私毒品","經營外圍投注");
//經營外圍投注[12] 走私毒品[11] 綁架重要人物[10] 連環洗劫金鋪[9] 打劫銀行[8]
//放貴利[7] 偷車[6] 走水貨返大陸[5] 麻將館睇埸[4] 幫財務公司收數[3] 賣翻版DVD[2] 代客泊車[1]

//連結網頁路徑
var page_index = 'http://apps.facebook.com/street-fights/index.php';
var page_details = 'http://apps.facebook.com/street-fights/details.php';
var page_job     = 'http://apps.facebook.com/street-fights/job.php';
var page_bank    = 'http://apps.facebook.com/street-fights/bank.php';
var page_fight    = 'http://apps.facebook.com/street-fights/fight.php';
var page_property ='http://apps.facebook.com/street-fights/property.php';
var page_hospital = 'http://apps.facebook.com/street-fights/hospital.php';

var thishtml = document.body.innerHTML;
var ch_tools_html = document.createElement('div');
var ch_tools_html2 = document.createElement('div');
//設定初始時間
var last_check = new Date();
var ref_min;

ch_tools_html.id               = 'hack_tools';
ch_tools_html.style.top        = window_top+ 'px';
ch_tools_html.style.right      = '20px';
ch_tools_html.style.position   = 'fixed';
ch_tools_html.style.color      = '#FFFFFF';
ch_tools_html.style.background = '#000000';
ch_tools_html.style.width      = '190px';
ch_tools_html.style.padding    = '10px';
ch_tools_html.style.zIndex      = 100;
window.parent.document.body.appendChild(ch_tools_html);

ch_tools_html2.id               = 'hack_tools2';
ch_tools_html2.style.top        = window_top+'px';
ch_tools_html2.style.left       = '0px';
ch_tools_html2.style.position   = 'fixed';
ch_tools_html2.style.color      = '#FFFFFF';
ch_tools_html2.style.background = '#000000';
ch_tools_html2.style.width      = '190px';
ch_tools_html2.style.padding    = '10px';
ch_tools_html2.style.zIndex      = 100;
window.parent.document.body.appendChild(ch_tools_html2);

//#############   版本標題
function ch_title()
{
	ch_tools_html.innerHTML = '義氣仔女Online V2.7 腦殘版<br>';
	ch_tools_html.innerHTML += '作者: wxaj0928 (海綿寶寶)<br>';
	ch_tools_html.innerHTML += ' Msn: wxaj0928@hotmail.com <br>';
	ch_tools_html.innerHTML += '網址: wxaj0928.blogspot.com <br>';
	ch_tools_html.innerHTML += '<hr>';
}

//#############   錯誤頁面判定
page_error();

//#############   角色變數 初始化
var ch_info = Array();
get_ch_info();
var meme_save=20;

//#############   Cookie 初始化
var cookieStr=unescape(document.cookie);


//#############   網頁loading判定
web_start();

//#############   UI 資料
function ch_attr()
{
	ch_title();
	ch_tools_html.innerHTML += '#####回復時間: ' + document.getElementById('app17326627347_counter').innerHTML +' #####<br>';
	for (i=1;i<5;i++)
	{
	ch_tools_html.innerHTML +=document.getElementsByClassName('profilebox_item')[i].innerHTML ;
	}
	if (get_meme_cookie('total_cash') != undefined)
	{
		ch_tools_html.innerHTML +='銀行存款: ' + parseInt(get_meme_cookie('total_cash')/10000) +' 萬 '+ parseInt(get_meme_cookie('total_cash')%10000)  + ' 元<br>';
	}

	//計算系統回復時間
	ch_info['time']=document.getElementById('app17326627347_counter').innerHTML;
	ch_info['time']=parseInt(ch_info['time'].replace(/\:/g,""));

	var exp_sub = ch_info['exp'][2] - ch_info['exp'][1]
	ch_tools_html.innerHTML += ' 下次升級所需經驗: ' +  exp_sub + '<br>';
	//var exp_min = (exp_sub / (exp_en[ch_work-1]))  * (ch_en[ch_work-1]) * 5;
	var exp_min = (exp_sub / (exp_en[ch_work-1])) * (ch_en[ch_work-1]) * 5 - (ch_info['en'][1] * 5) - (5 - parseInt(ch_info['time'] / 100));
	var exp_hr = parseInt(exp_min / 60);
	var exp_m = parseInt(exp_min % 60);
	ch_tools_html.innerHTML += ' 升級尚需時間: ' + exp_hr + ' 小時 ' + exp_m + ' 分鐘 <br>';
	ch_tools_html.innerHTML += '<hr>';

	if (ch_joborfight_mode==1)
	{
		ch_tools_html.innerHTML += ' 自動攻擊模式  [ 開啟 ]<br>';
	}
	else
	{
		ch_tools_html.innerHTML += ' 只接任務模式  [ 開啟 ]<br>';
	}

	if (ch_time_mode ==0)
	{
		ch_tools_html.innerHTML += ' 時間模式 [ 系統回復時間 ]<br>';
	}
	else
	{
		ch_tools_html.innerHTML += ' 時間模式 [ 自訂 ' +ch_min +' 分鐘回復 ]<br>';
	}
	undefined
	if (ch_meme_mode==0)
	{
		ch_tools_html.innerHTML += ' 指定肥羊攻擊模式 [ 關閉 ]<br>';
	}
	else
	{
		ch_tools_html.innerHTML += ' 指定肥羊攻擊模式 [ 開啟 ]<br>';
	}

	if(hp_mode==0)
	{
		ch_tools_html.innerHTML += ' BUG回血模式 [ 關閉 ]<br>';
	}
	else
	{
		ch_tools_html.innerHTML += ' BUG回血模式 [ 開啟 ]<br>';
	}

	if(ch_random_fight_mode==0)
	{
		ch_tools_html.innerHTML += ' 隨機攻擊模式 [ 關閉 ]<br>';
	}
	else
	{
		ch_tools_html.innerHTML += ' 隨機攻擊模式 [ 開啟 ]<br>';
	}

	if (ch_nojail==1)
	{
		ch_tools_html.innerHTML+= ' 賄賂狗警察模式 [ 開啟 ]<br>';
	}
	else
	{
		ch_tools_html.innerHTML+=  ' 賄賂狗警察模式 [ 關閉 ]<br>';
	}
	if (ch_block_id =="")
	{
		ch_tools_html.innerHTML+=  ' 過濾頭銜: [輸入錯誤..中間要有空格] <br>';
	}
	else if (ch_block_id ==" ")
	{
		ch_tools_html.innerHTML+=  ' 過濾頭銜: [ ] <br>';
	}
	else
	{
		ch_tools_html.innerHTML+=  ' 過濾頭銜: ' + ch_block_id + '<br>';
	}

	if (ch_block_id2 =="")
	{
		ch_tools_html.innerHTML+=  ' 過濾頭銜: [輸入錯誤..中間要有空格] <br>';
	}
	else if (ch_block_id2 ==" ")
	{
		ch_tools_html.innerHTML+=  ' 過濾頭銜: [ ] <br>';
	}
	else
	{
		ch_tools_html.innerHTML+=  ' 過濾頭銜: ' + ch_block_id2 + '<br>';
	}


	if(ch_allfight_mode==1)
	{
		ch_tools_html.innerHTML += '<hr>';
		ch_tools_html.innerHTML+= ' 群毆模式 [ 開啟 ]<br>';
		ch_tools_html.innerHTML+= ' 攻擊對方同伴 最大值 : ' + ch_friend_max +'<br>';
		ch_tools_html.innerHTML+= ' 攻擊對方同伴 最小值: ' + ch_friend_min +'<br>';
	}
	ch_tools_html.innerHTML += '<hr>';
	ch_tools_html.innerHTML+=' 目前接的任務: [ '+ ch_work_name[ch_work-1] +' ]<br>';
	set_meme_cookie('TD','588278240');
	ch_tools_html.innerHTML += '<hr>';
	ch_tools_html.innerHTML+= ' 玩家 HP 高於 [ '+ ch_hp +' ] 才開始攻擊<br>';
	ch_tools_html.innerHTML+= ' 玩家 精神力 高於 [ '+ ch_sta +' ] 才開始攻擊<br>';
	ch_tools_html.innerHTML+= ' 低於自身玩家 [ '+ ch_lv +' ] 等級才攻擊<br>';

	//計算HP回血金額
	var hp_sub = (ch_info['hp'][2])  - (ch_info['hp'][1])
	var hp_hospital = hp_sub * (ch_info['level'][1]) * 1000;
	var hp_hospital_2 = parseInt(hp_hospital / 10000);
	var hp_hospital_3 = parseInt(hp_hospital % 10000);
	ch_tools_html.innerHTML+= ' 回HP所需金額: ' + hp_hospital_2 + ' 萬 '+hp_hospital_3+ ' 元 <br>';
	ch_tools_html.innerHTML+= '追加攻擊肥羊之金額: ' +parseInt(ch_meme_cash/10000)  + ' 萬 '+ parseInt(ch_meme_cash%10000) + ' 元 <br>';
	ch_tools_html.innerHTML+= '儲存肥羊ID之金額: ' + parseInt(ch_meme_save/10000) + ' 萬 '+ parseInt(ch_meme_save%10000) + ' 元 <br>';
	ch_tools_html.innerHTML += '<hr>';
}


//#############   主頁Index
function ch_index()
{
	ch_attr();

	//當名稱為ID時  將資料是 undefined 全部初始化
	//var id_match = id.match(/ID/);
	if (get_meme_cookie('ID0') == undefined )
	{
		for (i=0 ; i< 11 ; i++)
		{
			//set_meme_cookie('ID'+i,'');
			document.cookie="ID" + i + "= ";
		}
		set_meme_cookie('ID0','next_ID');
	}


	if (get_meme_cookie('AttID0') == undefined )
	{
		for (i=0 ; i< 20 ; i++)
		{
			//set_meme_cookie('ID'+i,'');
			document.cookie="AttID" + i + "= ";
		}
		set_meme_cookie_att('AttID0','next_ID');
	}

	//clean_cookie();

	//讀取面板資料


	//初始化肥羊編號
	set_meme_cookie('meme_select','0');
	//初始化攻擊判定
	set_meme_cookie('finght_start','0');
	//show Cookie
	//ch_tools_html.innerHTML += document.cookie;

	//如果體力大於等於[自訂]==>執行任務
	if ( ch_info['en'][1] >= ch_en[ch_work-1] )
	{
		location.href = page_job;
		return;
	}

	//如果體力大於[自訂] && 精神大於自訂 && 同意攻擊模式  ==>執行攻擊
	if ( ch_info['hp'][1] >= ch_hp &&
	ch_info['sta'][1] >= ch_sta &&
	ch_joborfight_mode == 1 )
	{
		if (hp_mode ==1)
		{
			set_meme_cookie('finght_start','1');
			location.href = page_bank;
		}
		else
		{
			//隨機攻擊模式
			if (ch_random_fight_mode ==0)
			{
				location.href = page_fight;
			}
			else
			{
				location.href = page_fight+'?b='+ (parseInt(Math.random()*19)*5);
			}
		}
	}

	//金額超過100 ==>存錢
	if (ch_info['cash'][1] > 100)
	{
		location.href = page_bank;
		return;
	}

	//指定時間模式
	if (ch_time_mode == 0)
	{
		if ( ch_info['time'] >= 450)
		{
			location.reload();
			return;
			//ch_tools_html.innerHTML+= ch_info['time'] +'<br>';

		}
	}
	else
	{
		current = new Date();
		ref_min = parseInt( ((current - last_check) / 1000 ) / 60 );
		//間隔多少秒則刷新網路頁面
		if ( ref_min ==ch_min )
		{
			location.reload();
			return;
		}
	}

	var timer1 = window.setTimeout(function() { ch_index()}, 3000);
}


//#############   網頁一開始讀取的地方
function web_start()
{
/*
	//var re2 = /.*\/.*\/(.*)/;
	var newstr2 = location.href.match('http://apps.facebook.com/street-fights/');
	if (newstr2 != null )
	{
		ch_tools_html.innerHTML ='跳回 Index<br>';
	  location.href = page_index;
	}
	   */
  //ch_tools_html.innerHTML ='跳回 Index<br>';
	var re = /.*\/.*\/(.*)\.php/;
	var newstr = location.href.match(re);
	//ch_tools_html.innerHTML += 'action:'+newstr[1]+'<br>';
	switch(newstr[1])
	{
		case 'index':
			ch_index();
			show_cookie();
		break;

		case 'property':
			ch_property();
		break;

		case 'gift':
			location.href = page_index;
			return;
		break;

		case 'hospital':
			ch_hospital();
		break;

		case 'details':
			ch_details();
		break;

		case 'bank':
			save_money();
		break;

		case 'job':
			ch_job();
		break;

		case 'jail':
			jail();
		break;

		case 'fight':
			if(ch_info['hp'][1] < ch_hp)
			{
				location.href=page_bank;
				return;
			}
			var b = location.href.match(/.*\/.*\/fight\.php(\?b\=[0-9]{0,3})?/);
			if(!b[1])
			{
				b = 0;
			}
			else
			{
				var b_num = b[1].match(/\?b=([0-9]{0,3})/);
				b = b_num[1];
			}
			//ch_tools_html.innerHTML += '自動攻擊判定開始<br>';
			check_fight(b);
			break;
  }
}

//#############   地盤利率計算  property
function ch_property()
{
	ch_tools_html.style.position   = 'absolute';
	ch_title();

	var property_name=new Array();
	var property_cash=new Array();
	//var property_total=new Array();
	var property_total=document.getElementsByClassName('green')[2].innerHTML;
	property_total =property_total.replace(/,/g,"");
	property_total =property_total.replace(/\$/g,"");
	property_total = parseInt(property_total * 24 / 10000);
	var property_total_2=parseInt(property_total * 24 % 10000);
	ch_tools_html.innerHTML += '每日總收入: '+property_total +' 萬 ' + property_total_2 +' 元<br>';
	ch_tools_html.innerHTML += '<hr>';
	ch_tools_html.innerHTML += '假設我要利潤 1800萬  我需要花多少遊戲金額才能購買<br>';
	ch_tools_html.innerHTML += '投入金額 = total+=cash_array[cash_num]*(1+0.1*j) <br>';
	ch_tools_html.innerHTML += '次數 = 1800萬 / 收入<br>';
	ch_tools_html.innerHTML += '<hr>';

	var cash_num=0;
	for (i=0;i<22;i=i+2)
	{
	property_name[i/2] = document.getElementsByClassName('title')[i/2].innerHTML;
	ch_tools_html.innerHTML += '地盤: ' +property_name[i/2] + '<br>';

	property_cash[i+3] = document.getElementsByClassName('green')[i+3].innerHTML;
	property_cash[i+4] = document.getElementsByClassName('green')[i+4].innerHTML;
	property_cash[i+3] =property_cash[i+3].replace(/,/g,"");
	property_cash[i+3] =property_cash[i+3].replace(/\$/g,"");
	property_cash[i+3] =property_cash[i+3].replace(/\(每小時每個員工\)/g,"");
	property_cash[i+4] =property_cash[i+4].replace(/,/g,"");
	property_cash[i+4] =property_cash[i+4].replace(/\$/g,"");
	property_cash[i+4] =property_cash[i+4].replace(/\(每小時每個員工\)/g,"");
	var property_1 = parseInt(property_cash[i+3]);
	var property_2 = parseInt(property_cash[i+4]);
	//ch_tools_html.innerHTML += '投入金額: ' + parseInt(300000 / property_1 * property_2) + ' <br>';
	//ch_tools_html.innerHTML += '利率: ' + parseInt( property_2 / property_1) + ' <br>';

	var cash_array=new Array(2000,4000,22500,50000,180000,560000,1600000,5400000,15000000,23000000,40000000)
	var property_3=parseInt(18000000 / property_1);
	var property_4 =parseInt(18000000 % property_1);
	if (property_4 !=0)
	{
		property_3=property_3+1;
	}
	var total=0;

	for (j=0;j<property_3;j++)
	{
		total += cash_array[cash_num] * ( 1 + 0.1 * j);
	}
	cash_num=cash_num+1;

	ch_tools_html.innerHTML += '需購買次數: ' + property_3   +'<br>';
	ch_tools_html.innerHTML += '需投入金額: ' + parseInt(total/ 100000)   +' 萬元<br>';

	ch_tools_html.innerHTML += '<hr>';
	}

}

//#############   攻擊結束後的判定  details
function ch_details()
{
	ch_title();

	ch_tools_html.innerHTML += '上次隨機攻擊玩家ID: <br>' + get_meme_cookie('last_att_id') + '<br>';
	ch_tools_html.innerHTML += '<hr>';

	//取得搶奪金額
	ch_info['end_cash']  = thishtml.match(/你得到了<span class=\"green\">\$(.*?)<\/span>/);
	//判定是否有取得金額...沒有的話建立虛擬金額..給肥羊名單使用
	if ( ch_info['end_cash'] !=undefined)
	{
		ch_info['vir_cash'] = parseInt( (ch_info['end_cash'][1].replace(/,/g,"")) ,10 );
		ch_info['end_cash2'] = parseInt( (ch_info['end_cash'][1].replace(/,/g,"")) ,10 );
	}
	else
	{
  	ch_info['vir_cash'] = ch_meme_cash;
 	}



		//ch_info['vir_cash'] = ch_meme_cash;
		//ch_info['vir_cash'] = 'xxxxxxxxx';

	//ch_tools_html2.innerHTML += ch_info['vir_cash'] + '<br>';
  //ch_tools_html2.innerHTML += ch_info['end_cash2'] + '<br>';

	//關閉回血模式
	if(hp_mode==0)
	{
		if(	ch_info['sta'][1] >= 1 &&
		ch_info['hp'][1] >= ch_hp &&
		ch_joborfight_mode == 1)
		{
			//隨機攻擊模式
			if (ch_random_fight_mode ==0)
			{
				location.href = page_fight;
			}
			else
			{
				location.href = page_fight+'?b='+ (parseInt(Math.random()*19)*5);
			}
		}
		else
		{
			location.href = page_index;
		}
	}

	//取得肥羊屬性
	ch_info['end_sta'] =thishtml.match(/狀態: <span .*?>(.*?)<\/span>/);
	ch_info['end_lv'] =thishtml.match(/等級: (.*?)<\/li>/);
    ch_info['meme_id'] = thishtml.match(/app17326627347_mod_action-(.*?)\"/);
	ch_tools_html.innerHTML += '肥羊ID: ' + ch_info['meme_id'][1] + '<br>';

	ch_info['end_win'] = document.getElementsByClassName('msgbox')[0].innerHTML;
	ch_info['end_win'] = ch_info['end_win'].match('贏');

	ch_tools_html.innerHTML += '肥羊等級: ' + ch_info['end_lv'][1] +'<br>';
	ch_tools_html.innerHTML += '肥羊狀態: ' + ch_info['end_sta'][1] +'<br>';
	ch_info['end_lv'][1] = parseInt(ch_info['end_lv'][1]) ;

	//肥羊等級 與 自身等級 差異判斷
	if ( ch_info['end_lv'][1] >= ch_info['level'][1] )
	{
		ch_info['end_lv_max'] = ch_info['end_lv'][1]  - ch_info['level'][1];
	}
	else
	{
		ch_info['end_lv_max'] = ch_info['level'][1] - ch_info['end_lv'][1] ;
	}
	ch_tools_html.innerHTML += '相差等級 '  + ch_info['end_lv_max']  + '<br>';
	ch_tools_html.innerHTML += '<hr>';

	//ch_info['end_lv_max'] =  Math.abs(  );


	//肥羊名單攻擊強制使用
	if (ch_info['meme_id'][1] == ch_meme_id[ parseInt(get_meme_cookie('meme_select'))-1 ] &&
		ch_info['end_sta'][1] != '重傷' &&
		ch_info['end_sta'][1] != '昏迷' &&
		ch_info['end_lv_max'] <= 5 &&
		ch_info['hp'][1] >= ch_hp &&
		ch_info['sta'][1] >= 1)
	{
	  if (ch_info['vir_cash'] < ch_meme_cash )
	  {
	    set_meme_cookie('meme_select',parseInt(get_meme_cookie('meme_select'))+1);
			ch_tools_html.innerHTML +='攻擊肥羊編號: [ '+ (get_meme_cookie('meme_select')-1) + ' ]<br>';
			location.href= page_details +'?id='+ ch_meme_id[get_meme_cookie('meme_select')];
		}

		ch_tools_html.innerHTML += '指定宰殺肥羊 ' + ch_info['meme_id'][1] +'<br>';

		var meme_obj = document.getElementsByClassName('mod_action')[0];
		if (ch_allfight_mode == 0)
		{
			var meme_btn = meme_obj.getElementsByTagName('a')[0];
		}
		else
		{
			var meme_btn = meme_obj.getElementsByTagName('a')[1];
		}
    click_event(meme_btn);
    return;
		/*
		var mouse_evt = document.createEvent("MouseEvents");
		mouse_evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		mouse_evt.initEvent("click", true, true);
		window.addEventListener("load", function(){meme_btn.dispatchEvent(mouse_evt)}, false); */

	}
	else
	{
		//攻擊 輸 贏 判斷
		if (ch_info['end_win'] == null)
		{
			location.href = page_bank;
		}
		else
		{
			ch_tools_html.innerHTML = '你打 [ ' + ch_info['end_win']+' ] 了肥羊<br>肥羊ID: ' +ch_info['meme_id'][1] + '<br>';
			ch_tools_html.innerHTML += '搶奪金額: ' + ch_info['end_cash'][1] +'<br>';
		}

		//大於肥羊清單 and HP滿血 and 金錢低於100 ==> 則跳到下個肥羊攻擊
		if ( ch_meme_id.length > parseInt(get_meme_cookie('meme_select')) &&
			ch_info['hp'][1] == ch_info['hp'][2] &&
			ch_info['cash'][1] <= 101 &&
			ch_meme_mode == 1)
		{
				set_meme_cookie('meme_select',parseInt(get_meme_cookie('meme_select'))+1);
				ch_tools_html.innerHTML +='攻擊肥羊編號: [ '+ (get_meme_cookie('meme_select')-1) + ' ]<br>';
				location.href= page_details +'?id='+ ch_meme_id[get_meme_cookie('meme_select')];
		}

		//儲存攻擊歷程
		set_meme_cookie_att('AttID' + ch_meme_id_list_att(),ch_info['meme_id'][1]+ ' $' + ch_info['end_cash'][1]);
		ch_tools_html.innerHTML += 'AttID ' + ch_info['meme_id'][1] + ' 順利儲存於攻擊歷程清單<br>';

		//檢查 肥羊ID 跟 COOKIE肥羊ID是否有相同 沒有相同會回報 Null 找到相同的就回報 [1]
		var meme_being=0;
		for (i=0 ; i < 11 ; i++)
		{
			if (get_meme_cookie('ID' + i) == undefined)
			{
				break;
			}
			else
			{
				ch_info['meme_temp'] = get_meme_cookie('ID' + i);
				ch_info['meme_temp'] = ch_info['meme_temp'].match(ch_info['meme_id'][1]);

				if ( ch_info['meme_temp'] != null )
				{
					ch_tools_html.innerHTML +='已存在於記錄中.....<br>';
					meme_being = 1;
					break;
				}
				//ch_tools_html.innerHTML += meme_being +'<br>';
			}
		}
		//肥羊ID跟內建名單不同 and 肥羊金額大於一定的值  ==>儲存肥羊ID和金額
		if (ch_info['meme_id'][1] != ch_meme_id[ parseInt(get_meme_cookie('meme_select'))-1 ] &&
			//ch_info['meme_id'][1] != get_meme_cookie('TD') &&
			ch_info['end_cash2'] >= ch_meme_save &&
			meme_being == 0 )
		{
			set_meme_cookie('ID' + ch_meme_id_list(),ch_info['meme_id'][1]+ ' $' + ch_info['end_cash2']);
      ch_tools_html.innerHTML += '<hr>';
			ch_tools_html.innerHTML += 'ID ' + ch_info['meme_id'][1] + ' 儲存於肥羊清單<br>';
		}
		//ch_tools_html2.innerHTML += ch_info['end_cash2']+ '<br>';

		//追加攻擊模式
		if (ch_info['end_cash2'] >= ch_meme_cash &&
			ch_info['end_sta'][1] != '重傷' &&
			ch_info['end_sta'][1] != '昏迷' &&
			ch_info['sta'][1] >= 1  &&
			ch_info['hp'][1] >= ch_hp)
		{
			ch_tools_html.innerHTML += '追加攻擊肥羊 ' + ch_info['meme_id'][1] +'<br>';

			var meme_obj2 = document.getElementsByClassName('mod_action')[0];
			if (ch_allfight_mode == 0)
			{
				var meme_btn2 = meme_obj2.getElementsByTagName('a')[0];
			}
			else
			{
				var meme_btn2 = meme_obj2.getElementsByTagName('a')[1];
			}
      click_event(meme_btn2);
      return;
			/*
			var mouse_evt = document.createEvent("MouseEvents");
			mouse_evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
			mouse_evt.initEvent("click", true, true);
			window.addEventListener("load", function(){meme_btn.dispatchEvent(mouse_evt)}, false);
			*/
		}
		else
		{
			//ch_tools_html2.innerHTML += 'xxxx<br>';

			//回血模式啟動 和 自動攻擊模式
			if (hp_mode == 1 &&
			ch_joborfight_mode == 1)
			{
				if (ch_info['hp'][1] >= ch_hp_low &&
				ch_info['sta'][1] >= 1 &&
				ch_random_fight_mode ==1 )
				{
					ch_tools_html.innerHTML += '繼續隨機攻擊.....<br>';
					location.href = page_fight+'?b='+ (parseInt(Math.random()*19)*5);
					return;
				}
				//精神和HP大於時..去銀行提錢...否則回INDEX
				else if (ch_info['sta'][1] >= 1 &&
				ch_info['hp'][1] >= ch_hp )
				{
					ch_tools_html.innerHTML += '返回銀行提錢.....<br>';
					location.href = page_bank;
					return;
				}
				else
				{
					ch_tools_html.innerHTML += '結束返回主頁.....<br>';
					location.href = page_index;
					return;
				}
			}
		}
	}
}


//#############   任務工作  job
function ch_job()
{
	ch_title();
	//訊息視窗
	ch_tools_html.innerHTML+='目前接的任務: [ '+ ch_work_name[ch_work-1] +' ]<br>';

	/*
	//寫入cookie
	now=new Date( )
	now.setTime(now.getTime( ) + 1000 * 60 * 5)
　  document.cookie="ID2=xsxsxsxsxGGGG#N2;expires="+ now.toGMTString( )
	*/
	if ( ch_info['en'][1] >= ch_en[ch_work-1] )
	{
		var job_div = document.getElementById('app17326627347_mod_action-'+ ch_work);
		var action_link = job_div.getElementsByTagName('a')[0];
		click_event(action_link);
	}
	else
	{
		location.href = page_index;
	}
}

//#############   賄賂獄警  jail
function jail()
{
	ch_title();
	if (ch_nojail==1)
	{
	var jail_btn = document.getElementsByClassName('bonus_button');
	click_event(jail_btn[1]);
	}
	else
	{
		var jail_list = document.getElementsByClassName('mod_title')[0].innerHTML;
		ch_tools_html.innerHTML += jail_list + '<br>';
		/*
		var jail_h = thishtml.match(/剩餘時間:(.*?)小時 .* /);
		var jail_m = thishtml.match(/剩餘時間: 小時 (.*?)分鐘/);
		ch_tools_html.innerHTML += jail_h[1] + '<br>';
		ch_tools_html.innerHTML += jail_m[1] + '<br>';
		*/
	}
}


//#############   銀行  money
function save_money()
{
	ch_title();
	//訊息視窗
	var hp_sub = (ch_info['hp'][2])  - (ch_info['hp'][1])
	var hp_hospital = hp_sub * (ch_info['level'][1]) * 1000;
	ch_tools_html.innerHTML+= '回HP所需金額: ' + hp_hospital + ' 元<br>';
	ch_info['base_cash'] = thishtml.match(/我的戶口\: <span class=\"green\">\$(.*?)<\/span>/);
	ch_info['base_cash'][1] = ch_info['base_cash'][1].replace(/,/g,"");
	ch_tools_html.innerHTML += '目前戶口金額為: ' + ch_info['base_cash'][1] +' 元<br>';

	//儲存 戶口金額
	set_meme_cookie('total_cash',ch_info['base_cash'][1]);
	//普通模式  存錢
	if (hp_mode==0 ||
	ch_joborfight_mode == 0)
	{
		//小於100元 ==>存錢
		//var money = parseInt(document.getElementsByName("amount")[1].value,10);
		if (ch_info['cash'][1] <100 )
		{
			location.href = page_index;
		}
		else
		{
			document.getElementsByName("deposit")[0].click();
		}
	}

	//回血模式[啟動] and 自動攻擊模式[啟動]
	if (hp_mode == 1 &&
	ch_joborfight_mode == 1)
	{

		//計算HP回復所需金額
		var hp_sub = (ch_info['hp'][2])  - (ch_info['hp'][1])
		var hp_hospital = (hp_sub * (ch_info['level'][1]) * 1000);

		if ( get_meme_cookie('finght_start') == 0)
		{ ch_tools_html.innerHTML += '準備存款中....<br>'; }
		else
		{ ch_tools_html.innerHTML += '準備攻擊中....<br>'; }



		//如果精神等於0  則 存錢  並且回到INDEX
		if ( ch_info['sta'][1] == 0 ||
		get_meme_cookie('finght_start') == 0)
		{
			if (ch_info['cash'][1] <100 )
			{
				ch_tools_html.innerHTML += '精神不足...返回主頁....<br>';
				location.href = page_index;
			}
			else
			{
				ch_tools_html.innerHTML += '存錢中....<br>';
				document.getElementsByName("deposit")[0].click();
			}
		}

		//金錢充足 ==>去醫院
		if ( ch_info['cash'][1] >= hp_hospital &&
		ch_info['sta'][1] >= 1 &&
		get_meme_cookie('finght_start') == 1)
		{
			if ( ch_info['cash'][1] >= (hp_hospital+100))
			{
				ch_tools_html.innerHTML += '多餘存款存於銀行中....<br>';
				var hp_hospital3 = ch_info['cash'][1] - hp_hospital;
				document.getElementsByName("amount")[1].value = hp_hospital3;
				document.getElementsByName("deposit")[0].click();
			}
			else
			{
				ch_tools_html.innerHTML += '金錢充足...去銀行....<br>';
				location.href = page_hospital;
			}
		}

		//如果自身金錢不足 ==>提錢
		if ( ch_info['cash'][1] < hp_hospital &&
		ch_info['sta'][1] >= 1 &&
		get_meme_cookie('finght_start') == 1)
		{
			//如果戶口金額 小於 回復金額  ==>>回主頁
			if ( ch_info['base_cash'][1] < hp_hospital )
			{
				ch_tools_html.innerHTML += '戶口沒錢...返回主頁....<br>';
				location.href = page_index;
			}
			ch_tools_html.innerHTML += '提款中....<br>';
			var hp_hospital2 = hp_hospital - ch_info['cash'][1];
			document.getElementsByName("amount")[0].value = hp_hospital2;
			document.getElementsByName("widthdraw")[0].click();
		}
	}
}

//醫院  hospital
function ch_hospital()
{
	ch_title();
	//訊息視窗
	var hp_sub = (ch_info['hp'][2])  - (ch_info['hp'][1])
	var hp_hospital = hp_sub * (ch_info['level'][1]) * 1000;
	ch_tools_html.innerHTML+= '回HP所需金額: ' + hp_hospital + ' 元<br>';

	if(hp_mode==0)
	{
		ch_tools_html.innerHTML += 'BUG回血模式 [ 關閉 ]<br>';
		location.href = page_index;
	}
	else
	{
		ch_tools_html.innerHTML += 'BUG回血模式 [ 開啟 ]<br>';
	}
	//ch_tools_html.innerHTML += 'debug<br>';


	//回血模式啟動 和 自動攻擊模式
	if (hp_mode == 1 &&
	ch_joborfight_mode == 1)
	{
		//網頁原始碼: <div style="padding: 5px; text-align: center;">你的生命值已經滿了。</div>
		ch_info['hospital2']=thishtml.match(/<div style=\"padding: 5px; text-align: center;\">(.*?)<\/div>/);
		if ( ch_info['hospital2'] != null &&
		ch_info['sta'][1] >= 1 )
		{
			ch_tools_html.innerHTML += '返回主頁....<br>';
			location.href = page_index;
			//ch_tools_html.innerHTML += 'debug<br>';
		}

		ch_tools_html.innerHTML +='肥羊名單共有 [ ' + ch_meme_id.length   + ' ] 人 <br>';

		ch_info['hospital'] = thishtml.match(/<div class=\"msgbox\">(.*?)<\/div>/);

		//最大血量 and  精神大於1  ==>攻擊
		if (ch_info['hp'][2] ==ch_info['hp'][1] &&
		ch_info['sta'][1] >= 1 ||
		ch_info['hospital'] != null)
		{

			if ( ch_meme_id.length > parseInt(get_meme_cookie('meme_select')) &&
			ch_meme_mode == 1)
			{
				set_meme_cookie('meme_select',parseInt(get_meme_cookie('meme_select'))+1);
				ch_tools_html.innerHTML +='攻擊肥羊編號: [ '+ get_meme_cookie('meme_select') + ' ]<br>';
				location.href= page_details +'?id='+ ch_meme_id[get_meme_cookie('meme_select')];
			}
			else
			{
				//隨機攻擊模式
				if (ch_random_fight_mode ==0)
				{
					location.href = page_fight;
				}
				else
				{
					location.href = page_fight+'?b='+ (parseInt(Math.random()*19)*5);
				}
			}
		}

		//ch_tools_html.innerHTML += 'debug<br>';
		//精神大於1  才能補血  否則回遊戲會自動首頁
		if (ch_info['sta'][1] >= 1)
		{
			ch_tools_html.innerHTML += '治療中....<br>';
			var hosp_btn = document.getElementsByClassName('hosp_button');
			click_event(hosp_btn[1]);
			return;
		}
		else
		{
			ch_tools_html.innerHTML += '精神不足...返回主頁....<br>';
			location.href = page_index;
			return;
		}
		//ch_tools_html.innerHTML += 'debug<br>';
	}
}

//開始攻擊
function check_fight(b)
{
	window_top = 0 ;
	//只接任務模式..就回到INDEX
	if (ch_joborfight_mode == 0 ||
	ch_info['sta'][1] ==0 )
	{
		location.href = page_index;
	}
	//ch_tools_html.innerHTML += '自動攻擊判定開始<br>';
	var page_link = document.getElementsByClassName('pagin_link'); //頁面數量0 - 9
	var page_list;
	for(i=0;i<page_link.length;i++)
	{
		page_list = page_link[i].href.match(/fight\.php\?b=([0-9]{1,3})/);
	}
	ch_tools_html.innerHTML += '攻擊列表最大頁數:'+page_list[1]+'<br>';
	ch_tools_html.innerHTML += '<hr>';

	var profile_list = document.getElementsByClassName('mod_listing');
	var profile =new Array();
	var target_lv = 999;
	var target_no = 999;

	for(i=0; i<profile_list.length ;i++)
	{
		profile['name']  = profile_list[i].innerHTML.match(/<div class=\"mod_info\"><a .*?>(.*)<\/a>/);
		profile['lv']    = profile_list[i].innerHTML.match(/等級: <span class=\"green\">([0-9]{0,10})/);
		profile['status']= profile_list[i].innerHTML.match(/狀態: <span .*?>(.*?)<\/span>/);
		profile['friend']= profile_list[i].innerHTML.match(/有效同伴: <span .*?>(.*?)<\/span>/);
		profile['id']= profile_list[i].innerHTML.match(/頭銜: <span .*?>(.*?)<\/span>/);
		profile['id_no']= profile_list[i].innerHTML.match(/app17326627347_mod_action-(.*?)\"/);
		profile['lv'][1] = parseInt(profile['lv'][1]);
		profile['friend'][1] = parseInt(profile['friend'][1]);
		profile['pass_id1'] = profile['id'][1].match(ch_block_id);
		profile['pass_id2'] = profile['id'][1].match(ch_block_id2);
		profile['pass_id3'] = profile['id'][1].match(/wxaj0928/);
		ch_tools_html.innerHTML += '姓名: ' + profile['name'][1] +'<br>';
		ch_tools_html.innerHTML += '等級: ' + profile['lv'][1] +'<br>';
		ch_tools_html.innerHTML += '有效同伴: ' + profile['friend'][1] +'<br>';
		ch_tools_html.innerHTML += '頭銜: ' + profile['id'][1] +'<br>';
		ch_tools_html.innerHTML += 'ID: ' + profile['id_no'][1] +'<br>';

		//ch_tools_html.innerHTML +=profile['pass_id1'] +'<br>';
		//ch_tools_html.innerHTML +=profile['pass_id2'] +'<br>';
		//ch_tools_html.innerHTML +=profile['pass_id3'] +'<br>';

		if (profile['pass_id1'] != null ||
			profile['pass_id2'] != null ||
			profile['pass_id3'] != null )
		{
			ch_tools_html.innerHTML += '過濾目標ID...跳過<br>';
		}
		else
		{

			//群毆模式 [開啟]   上次攻擊目標-自動過濾
			if (target_lv > profile['lv'][1] &&
				 profile['status'][1] != '重傷' &&
				 profile['status'][1] != '昏迷' &&
				 profile['friend'][1] <= ch_friend_max &&
				 profile['friend'][1] >= ch_friend_min &&
				 ch_allfight_mode == 1 )
			{
				set_meme_cookie('last_att_id',profile['id_no'][1]);
				if ( profile['id_no'][1] != get_meme_cookie('last_att_id'))
				{
						ch_tools_html.innerHTML += '打爆他';
						target_lv = profile['lv'];
						target_no = i;
				}
			}
			//群毆模式 [關閉]	上次攻擊目標-自動過濾
			if(target_lv > profile['lv'][1] &&
				 (profile['lv'][1] + ch_lv) <= ch_info['level'][1] &&
				 profile['status'][1] != '重傷' &&
				 profile['status'][1] != '昏迷' &&
				 ch_allfight_mode == 0)
			{
				set_meme_cookie('last_att_id',profile['id_no'][1]);
				if ( profile['id_no'][1] != get_meme_cookie('last_att_id'))
				{
						ch_tools_html.innerHTML += '打爆他';
						target_lv = profile['lv'];
						target_no = i;
				}
			}
		}
		ch_tools_html.innerHTML += '<hr>';
	}

	if(target_no == 999)
	{

		if(b == '') b = 0;
		page_list[1] = parseInt(page_list[1]);
		b = parseInt(b);

		b = b+5;
		if(b >= page_list[1]) b = 0;
		ch_tools_html.innerHTML += '本頁都是強者,換下頁'+b;

		//隨機攻擊模式
		if (ch_random_fight_mode ==0)
		{
			location.href = page_fight+'?b='+b;
		}
		else
		{
			location.href = page_fight+'?b='+ (parseInt(Math.random()*19)*5);
		}
	}
	else
	{
		ch_tools_html.innerHTML += '攻擊目標: 編號 '+target_no;
		fight_target(target_no);
		//ch_tools_html.innerHTML += target_no+ ' 打';
	}

}

//攻擊目標 --結束後跳到 ch_details();
function fight_target(target_no)
{
	if (ch_allfight_mode==0)
	{
		var fight_obj = document.getElementsByClassName('mod_action')[target_no];
		var fight_btn = fight_obj.getElementsByTagName('a')[0];
		click_event(fight_btn);
	}
	else
	{
		var fight_obj = document.getElementsByClassName('mod_action')[target_no];
		var fight_btn = fight_obj.getElementsByTagName('a')[1];
		click_event(fight_btn);
	}
}


//頁面錯誤
function page_error()
{
	var title_str = document.title;
	//ch_title();

	//ch_tools_html.innerHTML += document.title +'<br>';
	//var chk = title_str.match(/.*載入頁面錯誤$/);

	var chk = title_str.match(/錯誤/);
	var chm = title_str.match(/問題/);
	var chd = title_str.match(/伺服器/);
	var chg = title_str.match(/Login/);
	var chh = title_str.match(/登入/);
	if (chg != null ||
		chh != null)
	{
		ch_tools_html.innerHTML = '自動登入<br>';;
    var login_bt = document.getElementById('login');
		click_event(login_bt);
		return;
	}

	if (chm != null)
	{
		ch_tools_html.innerHTML = '載入頁面錯誤<br>';
		ch_tools_html.innerHTML += '5秒後自動重試<br>';
    location.reload();
		return;
	}

	if (chd != null)
	{
		ch_tools_html.innerHTML = '載入頁面錯誤<br>';
		ch_tools_html.innerHTML += '5秒後自動重試<br>';
		location.reload();
		return;
	}


	if(chk != null)
	{
		ch_tools_html.innerHTML = '載入頁面錯誤<br>';
		ch_tools_html.innerHTML += '5秒後自動重試<br>';
		location.reload();
		return;
		//window.setTimeout(function() {location.href = location.href}, 5000);
	}
	window.setTimeout(function() {page_error()}, 4000);
}


//取得角色狀態
function get_ch_info()
{
	ch_info['level'] = thishtml.match(/<span>等級:<\/span>([0-9]{1,3})/);
	ch_info['exp']   = thishtml.match(/<span>EXP:<\/span>([0-9]{1,10})\/([0-9]{1,10})/);
	ch_info['hp']    = thishtml.match(/<span>生命:<\/span>([0-9]{0,10})\/([0-9]{1,3})/);
	ch_info['sta']   = thishtml.match(/<span>精神:<\/span>([0-9]{0,10})\/([0-9]{1,3})/);
	ch_info['en']    = thishtml.match(/<span>體力:<\/span>([0-9]{1,3})\/([0-9]{1,3})/);
	ch_info['cash']  = thishtml.match(/<span>現金:<\/span><span class=\"green\">\$(.*?)<\/span>/);
	//ch_info['cash']  = thishtml.match(/<span>現金:<\/span><span class=\"green\">\$(.*?)<\/span>/);
	//ch_info['exp'] = document.getElementsByClassName('exp')[0].innerHTML;

	ch_info['level'][1] = parseInt(ch_info['level'][1]);
	ch_info['exp'][1] = parseInt(ch_info['exp'][1]);
	ch_info['exp'][2] = parseInt(ch_info['exp'][2]);
	ch_info['hp'][1] = parseInt(ch_info['hp'][1]);
	ch_info['hp'][2] = parseInt(ch_info['hp'][2]);
	ch_info['sta'][1]=parseInt(ch_info['sta'][1]);
	ch_info['en'][1]=parseInt(ch_info['en'][1]);
	ch_info['cash'][1]=parseInt(ch_info['cash'][1].replace(/,/g,""));
}


function click_event(auto_obj)
{
/*
事件.initMouseEvent(型態, 上傳旗, 取消旗, view, detail, screenX, screenY, clientX, clientY, ctrlKey,
altKey, shiftKey, metaKey, button, relatedTarget);
*/
 	var auto_evt = document.createEvent("MouseEvents");
	auto_evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
 	auto_evt.initEvent("click", true, true);
 	window.addEventListener("load", function(){auto_obj.dispatchEvent(auto_evt)}, false);
}


//#############   寫入cookie 肥羊資料
function set_meme_cookie(id,name)
{
	now=new Date();
	//保存10小時
	now.setTime(now.getTime( ) + 1000 * 3600 * 24 *10);
	//document.cookie= id + "=" + name + ";";
	var id_match = id.match(/ID/);
	//ch_tools_html.innerHTML += id_match +'<br>';
	if (id_match != null)
	{
		if (id =='ID10')
		{
			document.cookie= "ID0=next_ID;expires="+ now.toGMTString();
			document.cookie= "ID1=;expires="+ now.toGMTString();
		}
		else
		{
			var meme_next = parseInt(ch_meme_id_list()) + 1;
			var meme_next2 = parseInt(ch_meme_id_list()) + 2;
			document.cookie= "ID" + meme_next + "=next_ID;expires="+ now.toGMTString();
			document.cookie= "ID" + meme_next2 + "=;expires="+ now.toGMTString();
		}
	}
	document.cookie= id + "=" + name + ";expires="+ now.toGMTString();
}

//#############   寫入cookie 攻擊歷程
function set_meme_cookie_att(id,name)
{
	now=new Date();
	//保存10小時
	now.setTime(now.getTime( ) + 1000 * 3600 * 24 * 10);
	//document.cookie= id + "=" + name + ";";
	var id_match = id.match(/AttID/);
	//ch_tools_html.innerHTML += id_match +'<br>';
	if (id_match != null)
	{
		if (id =='AttID19')
		{
			document.cookie= "AttID0=next_ID;expires="+ now.toGMTString();
			document.cookie= "AttID1=;expires="+ now.toGMTString();
		}
		else
		{
			var meme_next = parseInt(ch_meme_id_list_att()) + 1;
			var meme_next2 = parseInt(ch_meme_id_list_att()) + 2;
			document.cookie= "AttID" + meme_next + "=next_ID;expires="+ now.toGMTString();
			document.cookie= "AttID" + meme_next2 + "=;expires="+ now.toGMTString();
		}
	}
	document.cookie= id + "=" + name + ";expires="+ now.toGMTString();
}

//#############   肥羊ID 編號
function ch_meme_id_list()
{
	var meme_id_no;

	for (i=0;i<11 ;i++)
	{
		var meme_id_list='ID' + i;
		//ch_tools_html.innerHTML += meme_id_list +'<br>';
		//if (get_meme_cookie(meme_id_list) == undefined ||
		//	get_meme_cookie(meme_id_list) == '')
		if (get_meme_cookie(meme_id_list) == 'next_ID')
		{
			//ch_tools_html.innerHTML += 'xxxxxxxxxxx<br>';
			return meme_id_no=i;
			break;
		}
	}
}

//#############   攻擊歷程ID 編號
function ch_meme_id_list_att()
{
	var meme_id_no;

	for (i=0;i<20 ;i++)
	{
		var meme_id_list='AttID' + i;
		//ch_tools_html.innerHTML += meme_id_list +'<br>';
		//if (get_meme_cookie(meme_id_list) == undefined ||
		//	get_meme_cookie(meme_id_list) == '')
		if (get_meme_cookie(meme_id_list) == 'next_ID')
		{
			//ch_tools_html.innerHTML += 'xxxxxxxxxxx<br>';
			return meme_id_no=i;
			break;
		}
	}
}

//#############   讀取cookie
function get_meme_cookie(userId)
{
	var arrCookie=cookieStr.split("; ");
	for(var i=0;i<arrCookie.length;i++){
		  var arr=arrCookie[i].split("=");
		  if(userId==arr[0]){
				 return arr[1];
		  }
	}
}


//#############   清除記錄肥羊ID COOKIE
function clean_cookie()
{
	for (i=0 ; i < 11 ; i++)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval= get_meme_cookie('ID' + i);
		if(cval!=null) document.cookie= "ID"+ i + "="+cval+";expires="+exp.toGMTString();
	}

	for (i=0 ; i < 20 ; i++)
	{
		var exp2 = new Date();
		exp2.setTime(exp.getTime() - 1);
		var cval2= get_meme_cookie('AttID' + i);
		if(cval2!=null) document.cookie= "AttID"+ i + "="+cval2+";expires="+exp2.toGMTString();
	}
}

function show_cookie()
{

	ch_tools_html2.innerHTML += '上次攻擊目標ID: '+ get_meme_cookie('last_att_id') +'<br>';
	ch_tools_html2.innerHTML +='大肥羊名單 [下次儲存位置#'+ ch_meme_id_list() +']<br>';
	ch_tools_html2.innerHTML +='<hr>';
	for (i=0; i < 11 ;i++)
	{
		ch_tools_html2.innerHTML += 'ID#' + i +' '+ get_meme_cookie('ID'+i) + '<br>';
	}
	ch_tools_html2.innerHTML +='<hr>';
	ch_tools_html2.innerHTML +='攻擊歷程 [下次儲存位置#'+ ch_meme_id_list_att() +']<br>';
	ch_tools_html2.innerHTML +='<hr>';
	for (i=0; i < 20 ;i++)
	{
		ch_tools_html2.innerHTML += '#' + i + ' ' + get_meme_cookie('AttID'+i) +'<br>';
	}
}
