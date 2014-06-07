// ==UserScript==
// @name        Kanji Highlighter
// @namespace   japanese
// @description Highlights all kanji on a website using a specific color, depending on the 'level' that it can be found in (optimized for WaniKani users).
// @include     *
// @version     1.4.7
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_setClipboard
// @grant       GM_openInTab
// @downloadURL http://userscripts.org/scripts/source/449147.user.js
// @updateURL   http://userscripts.org/scripts/source/449147.meta.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

// Number of color steps to generate for the unknown Kanji levels
var COLOR_STEPS = 5;

// Colors to use to generate color levels with
var COL_FROM = [255, 255, 128]; // yellow
var COL_TO = [255, 128, 128]; // red

// Special colors
var COL_KNOWN = "#ddffd0";
var COL_CURRENT = "#0ff";//"#aaee90";
var COL_ADDITIONAL = "#d0ffff";// User-added known kanji that have not been learned in one of the levels
var COL_SEEN = "#ffd0ff";// User-added seen kanji
var COL_MISSING = "black"; // Should be dark since the Kanji will be white

// Matches a kanji in a string
var kanjiRegexp = /[\u4e00-\u9faf]/;//\u3400-\u4dbf]/;
// Matches all non-kanji characters
var notKanjiRegexp = /[^\u4e00-\u9faf\u3400-\u4dbf]+/g;

// Main
window.addEventListener("load", function (e) {
    // Register menu items
    GM_registerMenuCommand("Set current level", setKanjiLevel);
    GM_registerMenuCommand("Show kanji statistics", countKanji);
    GM_registerMenuCommand("Re-scan website", rescanWebsite, "r");
    GM_registerMenuCommand("Open info for selected kanji", openKanjiDetails, "o");
    GM_registerMenuCommand("== Kanji from other sources:", function() { alert("Hey! I'm just a caption. Don't click me!"); });
    GM_registerMenuCommand("Set known", function() { setCustomKanji("known"); });
    GM_registerMenuCommand("Add known", function() { addCustomKanji("known"); }, "k");
    GM_registerMenuCommand("Remove known", function() { remCustomKanji("known"); });
    GM_registerMenuCommand("Set seen", function() { setCustomKanji("seen"); });
    GM_registerMenuCommand("Add seen", function() { addCustomKanji("seen"); }, "s");
    GM_registerMenuCommand("Remove seen", function() { remCustomKanji("seen"); });
    GM_registerMenuCommand("== Advanced:", function () { alert("Hey! I'm just a caption. Don't click me!"); });
    GM_registerMenuCommand("Set info website URLs", setInfoURLs);
    GM_registerMenuCommand("Modify level dictionary", setKanjiDict);
    GM_registerMenuCommand("Reset level dictionary", resetKanjiDict);

    // GM_deleteValue("level");
    // GM_deleteValue("dictionary");

    loadSettings();
    rescanWebsite();
}, false);

// Register shortcut for opening the selected kanji on WK
(function(){
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 79 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
        openKanjiDetails();
    }
}, false);
})();

// Register shortcut for 'add additional known kanji'
(function(){
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 75 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
        addCustomKanji("known");
    }
}, false);
})();

// Register shortcut for 'add additional seen kanji'
(function(){
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 83 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
        addCustomKanji("seen");
    }
}, false);
})();

// Register shortcut for 're-scan website'
(function(){
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 82 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
        rescanWebsite();
    }
}, false);
})();

function loadSettings() {
    // First time running the script
    if (GM_getValue("level") === undefined) {
        alert("Since this is the first time that you're using the kanji highlighter script, " +
            "please adjust the following options to your needs.");
        setKanjiLevel();
    }

    // Load the dictionary - Wanikani's by default
    var dictionary;
    var dictValue = GM_getValue("dictionary");
    if (dictValue === undefined) {
        dictionary = getWKKanjiLevels();
        GM_setValue("dictionary", JSON.stringify(dictionary));
    } else {
        dictionary = JSON.parse(dictValue);
    }
    unsafeWindow.dictionary = dictionary;

    // Legacy support
    if (old = GM_getValue("additionalKanji")) {
        GM_setValue("knownKanji", old);
        GM_deleteValue("additionalKanji");
    }

    // Store global values
    unsafeWindow.levelCount = GM_getValue("levelCount", 50); // TODO: Allow changing
    unsafeWindow.levelThreshold = GM_getValue("level", 1);
    unsafeWindow.knownKanji = GM_getValue("knownKanji", "");
    unsafeWindow.seenKanji = GM_getValue("seenKanji", "");
    unsafeWindow.infoPage = GM_getValue("infoPage", "https://www.wanikani.com/kanji/$K");
    unsafeWindow.infoFallback = GM_getValue("infoPage", "http://beta.jisho.org/search/$K #kanji");

    // Build linear map
    unsafeWindow.kanjiMap = buildKanjiMap();

    // Generate CSS classes
    css = ".wk_K { background-color: " + COL_KNOWN + "; color: black; } ";
    css += ".wk_X { background-color: " + COL_MISSING + "; color: white  } ";
    css += ".wk_A { background-color: " + COL_ADDITIONAL + "; color: black  } ";
    css += ".wk_S { background-color: " + COL_SEEN + "; color: black } ";
    css += ".wk_C { background-color: " + COL_CURRENT + "; color: black } ";
    // Now generate a rainbow for the unknown levels
    for (i = 0; i < COLOR_STEPS; ++i) {
        ii = i * 1.0 / (COLOR_STEPS - 1);
        r = COL_FROM[0] * (1 - ii) + COL_TO[0] * ii;
        g = COL_FROM[1] * (1 - ii) + COL_TO[1] * ii;
        b = COL_FROM[2] * (1 - ii) + COL_TO[2] * ii;

        bgCol = 'rgb(' + Math.floor(r) + ',' + Math.floor(g) + ', ' + Math.floor(b) + ')';
        css += ".wk_" + i + " { color: black; background-color: " + bgCol + " } ";
    }
    GM_addStyle(css);
}

/* 
 * Specifies the URLs to use when opening kanji detail pages.
 */
function setInfoURLs() {
    var infoPage, infoFallback;
    if (infoPage = window.prompt("Enter the URL to use when opening a kanji detail page " 
        + "($K will be replaced with the kanji).", unsafeWindow.infoPage)) {
        unsafeWindow.infoPage = infoPage;

        if (infoPage = window.prompt("Enter the URL to use as a fallback for unavailable kanji "
            + "($K will be replaced with the kanji).", unsafeWindow.infoFallback)) {
            unsafeWindow.infoFallback = infoFallback;
        }
    }
}

/*
 * Counts all the kanji and displays them in a popup.
 */
function countKanji() {
    currentLevel = unsafeWindow.levelThreshold;
    kanjiMap = buildKanjiMap();
    var known = 0, unknown = 0, additional = 0, formallyknown = 0;
    for (var kanji in kanjiMap) {
        level = kanjiMap[kanji];
        if (level <= currentLevel)
            known++;
        else
            unknown++;
        if (level == -1)
            additional++;
        else if (level <= currentLevel)
            formallyknown++;
    }
    alert((formallyknown + unknown) + " kanji can be found in the levels. There are " + additional +
        " additionally known kanji. The number of known kanji combined is " + known + ".");
}

/*
 * Prompts a dialog that allows the user to change his current threshold level
 */
function setKanjiLevel() {
    var level = window.prompt("Please enter the highest kanji level that should be marked as 'known'.", GM_getValue("level", 1));
    if (level !== null) {
        level = Math.max(1, Math.min(50, parseInt(level, 10)));
        GM_setValue("level", level);
    }
}

/*
 * Prompts a dialog that allows the user to edit the raw kanji dictionary
 */
function setKanjiDict() {
    var kanjiDict = "";
    GM_setClipboard(JSON.stringify(unsafeWindow.dictionary, null, 4));
    alert("The dictionary has been copied into your clipboard. You should modify it using a text editor. "+
        "Once you're done, paste it into the text field in the next dialog.");

    // Try until proper JSON was specified
    while (true) {
        kanjiDict = window.prompt("Paste the new dictionary here.", kanjiDict);

        // Abort if nothing entiered
        if (kanjiDict === null)
            break;

        try {
            dict = JSON.parse(kanjiDict);
            if (dict instanceof Object) {
                // Find highest level
                var levelCount = Object.keys(dict).length;

                // Update & finish
                GM_setValue("levelCount", levelCount);
                GM_setValue("dictionary", kanjiDict);
                alert("Dictionary updated successfully - " + levelCount + " levels detected.");
                return;
            } else
                alert("The specified JSON is not a dictionary!");
        } catch (e) {
            if (e instanceof SyntaxError)
                alert("Error while parsing: " + e.message);
            else
                alert("Error: " + e.message);
        }
    }
}

/*
 * Opens a kanji detail website for every kanji in the selected phrase.
 * Uses a fallback website for kanji that are not within the levels
 * Defaults: WaniKani + beta.jisho.org as fallback.
 */
function openKanjiDetails() {
    var kanjiMap = unsafeWindow.kanjiMap;
    var kanji = getKanjiInString(getSelection().toString());
    var infoPage = unsafeWindow.infoPage;
    var infoFallback = unsafeWindow.infoFallback;

    for (var i = 0; i < kanji.length; ++i) {
        if (kanjiMap[kanji[i]] >= 1)
            GM_openInTab(infoPage.replace("$K", kanji[i]));
        else
            GM_openInTab(infoFallback.replace("$K", kanji[i]));
    }
}

/*
 * Opens a dialog to confirm that the dictionary should be reset to its default value
 */
function resetKanjiDict() {
    if (confirm("Do you really want to reset the dictionary?"))
    {
        GM_setValue("dictionary", JSON.stringify(getWKKanjiLevels()));
        GM_setValue("levelCount", 50);
    }
}

/*
 * Prompts a dialog that allows the user to change his set of additional known/seen kanji from other sources
 */
function setCustomKanji(mode) {
    var kanji = window.prompt("Please enter a list of kanji that should always be regarded as '" + mode + "'. " +
        "You may insert an entire text - all non-kanji characters will automatically be removed.", GM_getValue(mode + "Kanji", ""));
    if (kanji !== null) {
        kanji =getKanjiInString(kanji);
        GM_setValue(mode + "Kanji", kanji);
    }
}

/*
 * Prompts a dialog that allows the user to add new manually known/seen kanji
 */
function addCustomKanji(mode) {
    var kanji = window.prompt("Please enter the kanji that you want to add as '" + mode + "'. " +
        "You may insert an entire text - all non-kanji characters will automatically be removed.",
        getKanjiInString(window.getSelection().toString()));
    if (kanji !== null) {
        kanji =getKanjiInString(GM_getValue(mode + "Kanji", "") + kanji);
        GM_setValue(mode + "Kanji", kanji);
    }
}

/*
 * Prompts a dialog that allows the user to remove manually known/seen kanji
 */
function remCustomKanji(mode) {
    var kanji = window.prompt("Please enter the kanji that you want to remove from the '" + mode + "' list. " +
        "You may insert an entire text - all non-kanji characters will automatically be removed.",
        getKanjiInString(window.getSelection().toString()));
    if (kanji !== null) {
        filter = new RegExp("[" + kanji + "]");
        kanji = getKanjiInString(GM_getValue(mode + "Kanji", "").replace(filter, ""));
        GM_setValue(mode + "Kanji", kanji);
    }
}

/*
 * 
 */
var scannedBefore = false;
function rescanWebsite() {
    // ':not([class^=wk_])' will filter out already highlighted kanji for when we want to update dynamically loaded content
    if (!scannedBefore) {
        highlightKanji("body *:not(noscript):not(script):not(style):not([class^=wk_])");
        scannedBefore = true;
    } else {
        highlightKanji("body *:not(noscript):not(script):not(style)");
    }
}

/*
 * Highlights all the Kanji within selector's elements
 */
function highlightKanji(selector) {
    // Retrieve global variables
    kanjiMap = unsafeWindow.kanjiMap;
    levelThreshold = unsafeWindow.levelThreshold;
    levelCount = unsafeWindow.levelCount;

    $(selector).forEachText(function (str) {
        var output = "";
        var previousClass = "";
        for (var i = 0; i < str.length; ++i) {
            var chr = str[i];

            // Not a kanji, just keep it the same
            if (kanjiRegexp.test(chr)) {
                var level = kanjiMap[chr];

                // Assume that Kanji is known
                var className = "K";

                // Self-learned kanji
                if (level == -1)
                    className = "A";
                else if (level == -2)
                    className = "S";
                // Not in WaniKani, highlight as missing
                else if (isNaN(level))
                    className = "X";
                // Kanji on the *current* level
                //else if (level == levelThreshold)
                //    className = "C";
                // Kanji that will be in one of the upper levels
                else if (level > levelThreshold) {
                    var classIndex = (level - levelThreshold) / (levelCount - levelThreshold);
                    classIndex *= (COLOR_STEPS - 1);
                    className = Math.round(classIndex);
                }

                // NOTE to self: !== is needed because 0 == ""

                // Level changed from previous char, 
                if (className !== previousClass) {
                    if (previousClass !== "")
                        output += "</span>";

                    output += '<span class="wk_' + className + '">'; /*'" title="Level: ' + (level > 0 ? level : "None") + ' ">';*/
                }

                previousClass = className;
                output += chr;
                continue;
            }

            if (previousClass !== "")
                output += "</span>";
            previousClass = "";

            // Default: Write the character with no modifications
            output += chr;
        }

        // Close last opened span tag
        if (previousClass !== "")
            output += "</span>";

        return output;
    });
}

/*
 * Returns a string containing all kanji of the input string
 */
function getKanjiInString(str) {
    // Remove all non-kanji characters
    str = str.replace(notKanjiRegexp, "");
    // Remove duplicates
    str = str.split("").filter(function (x, n, s) {
        return s.indexOf(x) == n;
    }).sort().join("");
    return str;
}

/* 
 * Converts and returns a one-dimensional Kanji->Level map of the specified Level->Kanji dictionary.
 */
function buildKanjiMap(dict, additional) {
    var map = {};
    var dict = unsafeWindow.dictionary;
    var customKnown = unsafeWindow.knownKanji;
    var customSeen = unsafeWindow.seenKanji;

    // If the  dictionary is an array, indices (keys) are 0-based
    var offset = (dict instanceof Array) ? 1 : 0;

    for (var level in dict) {
        var kanjiList = dict[level];
        for (var i = 0; i < kanjiList.length; ++i) {
            map[kanjiList[i]] = parseInt(level) + offset;
        }
    }

    // Insert / update specified additional kanji
    for (var i = 0; i < customKnown.length; ++i) {
        // Only use the 'additional' tag for kanji that have not been in one of the levels yet!
        // ... and kanji that are not in the dictionary at all, of course!
        if (map[customKnown[i]] > unsafeWindow.levelThreshold
         || map[customKnown[i]] === undefined)
            map[customKnown[i]] = -1;
    }
    for (var i = 0; i < customSeen.length; ++i) {
        // Do the same for seen as for known
        if (map[customSeen[i]] > unsafeWindow.levelThreshold
         || map[customSeen[i]] === undefined)
            map[customSeen[i]] = -2;
    }

    return map;
}

/*
 * Returns all WK Kanji categorized by their respective levels. This is the default dictionary that is used by the script.
 */
function getWKKanjiLevels() {
    return [
        /* 1:*/ "七二三山女大入九人八上一川力口下十工",
        /* 2:*/ "千丁才右水火白玉立小手目又四夕日月正子了出六刀天犬王左石五田土円文丸木中本",
        /* 3:*/ "牛公切少太戸止外矢母万父久広生分友用方北半市台引古今心午毛兄元内冬",
        /* 4:*/ "花竹他氷皮皿休主糸耳町虫不仕車赤百村見気名写貝礼申去字央男号世年打平代早足先",
        /* 5:*/ "図肉学交同行西体声走谷雨空金音青林回作近池里社会光売毎何麦角自弟米形来色当多考羽草言",
        /* 6:*/ "姉有亡化安両血明店知歩死南科茶活海全地羊前長星次京東室国曲食妹夜州後直点思画首向",
        /* 7:*/ "札未由辺失必家弱末校紙教理魚鳥船雪黄週欠風通黒夏民高付記氏強組時以",
        /* 8:*/ "対君投役研買馬絵楽話雲数所住電合反間答番決医局身助朝場者道支究森",
        /* 9:*/ "乗仮負県待重表物新予使勝泳具部持送度談服美和返定界発客事受始実相屋要苦",
        /*10:*/ "農終鳴親集酒速読業頭院飲顔聞習調最転路運鉄葉漢進横語落算歌配起開線軽病",
        /*11:*/ "意位神洋成争味伝指初低良好育便放競注拾仲特努共波老労秒追令功働別利命岸昔戦級",
        /*12:*/ "員階章短都第倍深温庭祭動息根流商島登童悲植期歯勉寒旅消陽暑球着族湯泉悪港野",
        /*13:*/ "練駅願暗詩銀館士標課然賞鏡謝映問様想橋億熱養緑疑皆像殺料器輪情福題整感選宿",
        /*14:*/ "例協季固周求技格能私骨卒囲望約基術参的残雰材妥希束折頑念松完芸性",
        /*15:*/ "寺飯列秋帰岩昼区計建坂司泣猫軍英築信変仏式法毒昨晩夫単晴勇丈紀浅春",
        /*16:*/ "冒遠保阪真守急箱荷典府喜笑辞取弁留証面係門浴険冗品専危政園曜存書幸関治",
        /*17:*/ "兵説恋幻鼻席塩結無果干梅非渉是識官因底愛覚警側虚常細敗署栄薬堂察原",
        /*18:*/ "煙訓報弓汽喫等句験僧胸洗達可脳類種忘禁枚静借禅焼座祈告試許",
        /*19:*/ "加笛史易連比順減節若財布閥舌宙混暴団履忙得徒困善冊続宇絡歴乱容詞改昆",
        /*20:*/ "飛震災在産嫌経妻圧夢倒裕穴議被尻害尾論罪難機個厚確防犯妨余臭械率",
        /*21:*/ "資判権設評任批検際敵企増責挙制務件総岡断認解税義審済委査素省条派",
        /*22:*/ "応各脱誕提坊置案勢統営値態過援策吸藤領観価宮寝賀副域姿罰費状示",
        /*23:*/ "裁収贅停準職師革導律鬼看割施崎護規秀宅幹呼張現沢俳城乳優則演備",
        /*24:*/ "供違質株製額狭届腰肩庁型載触管差視量象境武述環展祝輸燃販担腕層",
        /*25:*/ "替肥模居含与渡限票況影捕景抜掛逮訟属鮮補慣絞捜隠豊満構効候輩巻訴響",
        /*26:*/ "接占振討針徴怪獣突再障鉛筆較河菓刺励激故貯往創印造復独汗豚郵従授我",
        /*27:*/ "貸訪誘退迫途段痛胃眠迷極靴症給健端招就濃織郎昇締惑悩睡屈康暇怒腹",
        /*28:*/ "浜潔衆巨微婦凍児奇麗移妙逆稚博撃録清修隊券益精程憲並傘絶幼綺攻処庫冷",
        /*29:*/ "積杯監欧乾雄韓閣僚怖烈猛略娘宗寄江促催宴臣督診詰恐街板添索請緊航壊",
        /*30:*/ "盗騒懐遊浮系版預適貧翌延越符婚旗押渇魅快照覧更飾漏枕撮詳乏背購",
        /*31:*/ "救探粉棒融既菜編華普豪鑑除幾尋廊倉孫径泥嘆驚帯散貨陸脈均富徳偵巣掃似離墓",
        /*32:*/ "興複秘迎志卵眼序衛賛飼密績銭込祖雑党暖厳欲染机恩永液捨訳酸桜汚採傷",
        /*33:*/ "装異筋皇窓簡誌否垂宝拡灰宣忠納盛砂肺著蔵諸蒸裏賃操敬糖閉漠暮尊熟",
        /*34:*/ "沿拝粋聖磁射歓劇豆枝爪貴奴隷芋縮紅幕純推承損刻揮誤丼降薦臓縦腐源吐勤",
        /*35:*/ "汁酢舎銅酔破滞亀彼炎介厄紹講互剣寿杉鍋払湖醤測油恥彫噌為遅熊己獄",
        /*36:*/ "継牙甘舞般鹿超廃債献療姓貿遺及維縄津伎伸奈幅頼沖摘核踏旧盟将依換諾",
        /*37:*/ "償募執戻抗湾遣聴臨塁陣旬兆契刑香崩患抵爆弾闘恵跳昭漁跡削掲狙葬抱",
        /*38:*/ "致齢奏刊伴却慮称賄択描緒緩賂贈需避繰奥懸房盤託妊娠扱逃宜傾還併抑",
        /*39:*/ "雇岐仙奪拒鋼甲埼群充勧御譲銃項圏免埋祉謙邦渋壁斐棋片躍稲鈴枠隆控阜慎",
        /*40:*/ "排敷薄雅隣顧頻柱唱吹駆孝褒兼俊巡堀戒携衝敏鋭獲透誉殿剤駐殖茂繁犠",
        /*41:*/ "蜜徹瀬包措撤至墟蜂蛍虎酎郷艦仁炭拳潜鉱衣偽侵棄拠伺樹遜儀誠畑",
        /*42:*/ "括荒堅喪綱斎揚到克床哲暫揺握掘弧泊枢析網糾範焦潟滑袋芝肝紛柄軸挑双",
        /*43:*/ "裂露即垣珍封籍貢朗誰威沈滋摩柔岳刷牧距趣旨撲擦懲炉滅泰琴沼斉慰筒潮襲懇",
        /*44:*/ "謎芽嵐吉俺朱桃髪梨涙僕丘雷匹斗竜缶笠娯寸姫縁侍忍刃翼塔叫棚粒釣叱砲辛",
        /*45:*/ "卓磨湿翔塊凶狩鐘肌澄菌硬陰稼溝滝狂賭裸塾眺呪曇井舟矛疲暦嬢也脚魂嫁頃霊",
        /*46:*/ "鳩棟墨寮魔鈍穏泡碁吾帝幽零寧斬猿歳椅鍵瞳瞬錬癖租黙鍛綿阻菊穂俵庄誇架涼盆孔",
        /*47:*/ "芯欺巾爽佐瞭粘砕哀尺柳霧詐伊炊憎帽婆如墜塀扉扇憩恨幣崖掌挿畳滴胴箸虹唇粧",
        /*48:*/ "蛇辱闇悔憶溶輝耐踊賢咲脇遂殴塗班培盾麻脅彩尽蓄騎隙畜飢霜貼鉢帳穫斜灯迅蚊餓",
        /*49:*/ "陛俗駒桑悟抽拓誓紫剛礎鶴壇珠概征劣淡煮覆勘奨衰隔潤妃謀浸尼唯刈陶拘",
        /*50:*/ "漂簿墳壮奮仰銘搬把淀伯堤訂巧堰彰廷邪鰐峰亭疫晶洞涯后翻偶軌諮漫蟹鬱唐駄"
    ];
};

/*
 * BASED ON (SLIGHT MODIFICATIONS)
 * jQuery replaceText - v1.1 - 11/21/2009
 * http://benalman.com/projects/jquery-replacetext-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($) {
    $.fn.forEachText = function (callback) {
        return this.each(function () {
            var f = this.firstChild,
                g, e, d = [];
            if (f) {
                do {
                    if (f.nodeType === 3) {
                        g = f.nodeValue;
                        e = callback(g);
                        if (e !== g) {
                            if (/</.test(e)) {
                                $(f).before(e);
                                d.push(f)
                            } else {
                                f.nodeValue = e
                            }
                        }
                    }
                } while (f = f.nextSibling)
            }
            d.length && $(d).remove()
        })
    }
})(jQuery);