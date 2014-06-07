// ==UserScript==
// @name        ZombiePandemic zh-TW
// @namespace        edited by bybsm
// @description        ZombiePandemic 中文化 ver 10.1030.1253
// @version        10.1030.1253
// @include        http://www.zombiepandemic.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==

var strings = {
//標準格式"" : "",

//_/_/_/_/_/_/_/
//　登入畫面　_/login.aspx
//_/_/_/_/_/_/_/
	"Log In":"登入",
	"User Name:":"角色名稱:",
	"Password:":"密碼:",
	"Remember me next time.":"記住我",
	"Create User":"建立角色",
	"Password Recovery":"忘記密碼?",
	"User Name Recovery":"忘記角色名稱?",
	"Use your Facebook to login:":"用Facebook登入:",

//_/_/_/_/_/_/_/
//　建立角色　_/CreateUser.aspx
//_/_/_/_/_/_/_/
	"Sign Up for Your New Account":"趕快註冊您的新帳戶",
	"Confirm Password:":"重新輸入密碼:",

//_/_/_/_/_/_/_/
//　角色狀態　_/CharacterDetails.aspx
//_/_/_/_/_/_/_/
//特殊
	"You are currently busy.":"您正在忙碌中",
	"Current activity:":"當前活動:",
	"Time left:":"剩餘時間:",
	"Cancel Activity":"取消活動",
//一般狀態
	"Stamina:":"耐力:",
	"Hit Points:":"生命:",
	"Encumbrance:":"負重:",
	"Next Level:":"經驗值:",
	"Clan:":"隊伍:",
	"Current level:":"角色等級:","Level:":"等級:",
	"Money:":"資金:",
	"Armor:":"裝甲:",
	"Agility:":"敏捷:",
	"Strength:":"力量:",
	"Constitution:":"體質:",
	"Smarts:":"智慧:",
	"Marksmanship:":"遠距射擊:",
	"Close Combat:":"近距肉搏:",
	"Technical:":"技術",
	"Public profile page":"公開的個人資料頁",
//下方選單1
	"Equipment":"裝備",
	"Skills":"技能",
	"Training":"訓練",
	"Active Missions":"任務",
	"Achievements":"成就",
//裝備
	"Your currently equipped items:":"您當前裝備的物品:",
	"Back":"背部",
	"Head":"頭部",
	"Face":"臉部",
	"Torso":"衣服",
	"Hands":"武器",
	"Gloves":"手套",
	"Legs":"褲子",
	"Feet":"鞋子",
	"Choose item to equip":"選擇裝備",
	"No items available":"無可選擇的裝備",
	"Unequip":"卸下裝備",
	"Reload":"重新裝填",
	"Unload":"卸下子彈",
	"Equip Item":"裝備物品","Equip":"裝備",
	"Use":"使用",
//物品選單
	"Weapons":"武器",
	"Ammo":"彈藥",
	"Armor":"裝備",
	"Aid":"藥品",
	"Other":"其他",
//物品詳細
"Action":"動作",
"Picture:":"圖片:",
"Name:":"名稱:",
"Required Level:":"可裝備等級:",
"Shop price:":"商店售價:","Buy:":"買價:",
"Sell Value:":"售出價格:","Sell:":"賣價:",
"Weight:":"重量:",
"Damage:":"傷害:",
"Range:":"射程:",
"Caliber:":"口徑:",
"Currently equipped":"正在裝備",
"Can be used in close combat":"可以在近戰中使用",
"Not usable in close combat":"無法在近戰中使用",
"Skill Modifiers:":"附加能力:",
//技能加點
/*
"Agility":"敏捷:",
"Strength":"力量:",
"Constitution":"體質",
"Smarts":"智慧",
"Marksmanship":"遠距射擊:",
"Close Combat":"近距肉搏:",
"Technical":"技術",
*/

//_/_/_/_/_/_/_/
//　現在位置　_/Location.aspx
//_/_/_/_/_/_/_/
	"Location Info":"位置訊息",
	"Shop":"商店",
	"Scavenge":"找尋物品",
	"Zombies":"殭屍",
	"Missions":"任務","Mission":"任務",
	"Information":"信息",
	"Suburb":"市郊",

//可進行的動作:
	"Available actions:":"可進行的動作:",
	"Tag":"噴漆",
	"Change Weapon":"更換武器",
	"Heal":"治療",
	"Rescue":"救援",
	"Build safehouse":"建立安全庇護所",
	"Use Barricade Item":"使用物品補強",
	"Barricade":"補強防禦工事",
	//"Refresh":"刷新",

//_/_/_/_/_/_/_/
//　戰鬥畫面　_//CombatDetails.aspx
//_/_/_/_/_/_/_/

//開始戰鬥
	"Repeat the attack x times:":"連續攻擊 x 次:",
	"Advance":"前進",
	"Attack Damage:":"攻擊傷害:",
	"Attacks pr. round:":"每回攻擊次數",
	"Speed:":"速度",
	"Distance:":"距離",
//結束戰鬥
	"Combat Summary:":"戰鬥摘要",
	"# attacks":"攻擊次數",
	"# hits":"命中數",
	"% hits":"命中率",
	"Avg. dam.":"平均傷害",
	"Total dam.":"總共傷害",
   
	"Reload and Finish":"重新裝填並完成",
	"Finish":"完成",

	

};//到這裡結束

//============================================================================

//_/_/_/_/_/_/_/
//　長字串區　_/
//_/_/_/_/_/_/_/
//說明：
//
var regexps = {};
//============

regexps["(.*)You rummage around the (.*) and find nothing of use"]="$1 你搜尋了附近的$2，沒有任何發現。";
regexps["^(\\d*) yards"] = "$1 碼";
regexps["(.*)You are now at (\\d*) stamina points and feel nearly exhausted. You should find a safe place to rest and rebuild your strength."]="$1 你只剩下$2點耐力，感覺體力幾乎耗盡。你應該找一個安全的地方好好休息。";
//戰鬥畫面
regexps["^(\\d*) yards / turn"] = "$1 碼 / 回合";
regexps["^(\\d*) yards"] = "$1 碼";
regexps["^(\\d*) yards"] = "$1 碼";
regexps["^Attack \\((.*)\\)"] = "攻擊 ($1)";
regexps["^Run \\((.*)\\)"] = "逃跑 ($1)";

//使用物品
regexps["(.*)You consume some (.*) and feel much better."]="$1 你吃了些$2，感覺好多了。";

regexps["(.*)You start Strength Training for (\\d*) hours."]="$1 你開始進行$2小時的力量訓練。";
regexps["(.*)You start Marksmanship Training for (\\d*) hours."]="$1 你開始進行$2小時的遠距射擊訓練。";
//============================================================================

//去除字串左右空白
trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


//關於match()及replace()函數的相關教學
//http://www.w3schools.com/jsref/jsref_obj_regexp.asp
//http://ops01.pixnet.net/blog/post/20990542

//更換regexps字串(最吃速度......想辦法優化orz)
matchRegexps = function(key) {
    if (key===null) {
        return undefined;
    }
   
    for (var reg in regexps) {
        var rrrr = new RegExp(reg);    //var txt=new RegExp(pattern,modifiers);
        var result = key.match(rrrr);

        if (key.match(rrrr)!==null) {
            return key.replace(rrrr,regexps[reg]);    //string.replace(/\要尋找的字/g, '被取代的字');
        }
    }
    return undefined;
};


//翻譯字串("":"",)
translateWithRegexp = function(key) {
    if (strings[key]!==undefined) {
        return strings[key];
    } else {
        var key2 = trim(key);
        if (strings[key2]!==undefined) {
        return strings[key2];
        }
    }
    return matchRegexps(key);
};


//tagName取得列表
var allTrans = {
    "span":"",
    "a":"",
    "h1":"","h2":"","h3":"","h4":"","h5":"",
    "th":"","td":"",
    "p":"",
    "b":"",
    "small":"","big":"",
    "strong":"",
    "div":"",
    "label":"",
    "input":"",
    "li":"",
    "i":"",
    "em":"",
    "option":"",
        };



//整頁翻譯
translateWholePage = function(e) {
  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
     
    if (node.type == "submit" || node.type == "button" )
      {
        //GM_log( node.value );查看錯誤履歷用
        var trans = translateWithRegexp(node.value);
        //GM_log( trans ); 查看錯誤履歷用
        if (trans!==undefined) {
          node.value = trans;
        }
      }
          
     
      else if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}
$(function(e) {translateWholePage(e);});


//更改特定CSS
$("a").css("font-size","12px ");
$("strong").css("font-size","12px ");

//去除GOOGLE廣告
/*
var ads = document.evaluate(
　　'//iframe[contains(@src,"googleads")]',
　　document,
　　null,
　　XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
　　null);

for (i=0; i < ads.snapshotLength; i++)
{
　　var pNode = ads.snapshotItem(i).parentNode;
　　var rNode = ads.snapshotItem(i);
　　pNode.removeChild(rNode);
}
*/

