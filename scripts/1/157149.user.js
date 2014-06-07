// ==UserScript==
// @name       Bangumi首页动画中文显示
// @namespace  http://weibo.com/zheung
// @version    0.1.14.04.13
// @description  不智能Bangumi首页动画中文显示
// @updateURL https://userscripts.org/scripts/source/157149.meta.js
// @downloadURL https://userscripts.org/scripts/source/157149.user.js
// @match http://bangumi.tv/
// @include http://bangumi.tv/
// @copyright  DanoR
// ==/UserScript==

//替换数据
var words =
{
//14年4月番
	"ぷちます!!‐プチプチ・アイドルマスター‐":"迷你偶像 第二季",
	"犬神さんと猫山さん":"犬神同学和猫山同学",
	"僕らはみんな河合荘":"我们大家的河合庄",
	"ご注文はうさぎですか？":"请问您今天要来点兔子吗？",
	"悪魔のリドル":"恶魔之谜",
	"エスカ&amp;ロジーのアトリエ〜黄昏の空の錬金術士〜":"艾斯卡与罗吉的工作室～黄昏之空的炼金术士～",
	"マンガ家さんとアシスタントさんと":"漫画家和助手",
	"一週間フレンズ。":"一周的朋友。",
	"ノーゲーム・ノーライフ":"NO GAME NO LIFE 游戏人生",
	"彼女がフラグをおられたら":"如果她的旗帜被折断了",
	"マジンボーン":"魔神之骨",
	"極黒のブリュンヒルデ":"极黑的布伦希尔特",
	"龍ヶ嬢七々々の埋蔵金":"龙娘七七七埋藏的宝藏",
	"Selector Infected WIXOSS":"选择感染者WIXOSS",
	"シドニアの騎士":"希德尼娅的骑士",
	"ピンポン THE ANIMATION":"乒乓",
	"棺姫のチャイカ":"棺姬嘉依卡",
	"健全ロボ ダイミダラー":"健全机斗士",
	"ブラック・ブレット":"漆黑的子弹",
	"ドラゴンボール改 魔人ブウ編":"龙珠改 魔人布欧篇",
	"それでも世界は美しい":"尽管如此世界依然美丽",
	"メカクシティアクターズ":"目隐都市的演绎者",
	"星刻の竜騎士":"星刻的龙骑士",
	"ハイキュー!!":"排球少年",
	"風雲維新ダイ☆ショーグン":"风云维新大将军",
	"FAIRY TAIL 新シリーズ":"妖精的尾巴 第二期",
	"ベイビーステップ":"网球优等生",
	"ジョジョの奇妙な冒険 スターダストクルセイダース":"JOJO的奇妙冒险 星尘斗士",
	"魔法科高校の劣等生":"魔法科高校的劣等生",
	"キャプテン・アース":"地球队长",
//14年1月番
	"スペース☆ダンディ":"Space☆Dandy",
	"ウィザード・バリスターズ〜弁魔士セシル":"弁魔士塞西尔",
	"桜Trick":"樱Trick",
//13年10月番
	"弱虫ペダル":"飙速宅男",
	"ゴールデンタイム":"青春纪行",
	"ファイ・ブレイン 〜神のパズル 第3シリーズ":"神之谜题 第三季",
	"となりの関くん":"上课小动作",
//OVA/OAD预留番
	"世界征服～謀略のズヴィズダー～":"世界征服 谋略之星",
	"境界の彼方":"境界的彼方",
	"ストレンジ・プラス":"STRANGE+",
	"中二病でも恋がしたい！戀":"中二病也要谈恋爱！戀",
//长番
	"探検ドリランド -1000年の真宝-":"探险Driland 千年的真宝",
	"ONE PIECE":"海贼王",
	"HUNTER×HUNTER":"全职猎人",
	"NARUTO -ナルト- 疾風伝":"火影忍者 疾风传",
    "BLEACH":"死神",
	"SLAM DUNK":"灌篮高手",
};
//替换代码
if (location.href=="http://bangumi.tv/")
{
	var alla = document.getElementsByTagName("a");
	var allspan = document.getElementsByTagName("span");

	for (i=0;i<alla.length;i++)
		for(var word in words)
	            if(alla[i].innerHTML==word)
 	               alla[i].innerHTML=words[word];

	for (i=0;i<allspan.length;i++)
		for(var word in words)
    	        if(allspan[i].innerHTML==word)
        	        allspan[i].innerHTML=words[word];
}