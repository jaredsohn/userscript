// ==UserScript==
// @name		Kancolle Database! Translation
// @namespace	http://zharay.github.io/KancolleDatabaseEN/
// @version		1.01
// @description Translate most of Kancolle Database! Warning: Don't waste all your resources on your daughters.... Okay keep it reasonable.
// @match		http://*.kancolle-db.tk/*
// @match		https://*.kancolle-db.tk/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant		none
// @updateURL	https://github.com/Zharay/KancolleDatabaseEN/raw/master/KancolleDatabase.meta.js
// ==/UserScript==

// Variables for all translations. Default is Jap, Trans. You can add jsQuery scoping and a page to narrow down its usage. 
function T(scope, japanese, english, location){
    if (location) {
        this.scope = scope;
        this.japanese = japanese;
        this.english = english;
		this.location = location;
    } else if (english) {
        this.scope = scope;
        this.english = english;
        this.japanese = japanese;
		this.location ='';
    } else  {
        this.scope = '';
        this.english = japanese;
        this.japanese = scope;
		this.location ='';
	}
}

var translations = [

    new T('データベース艦これ！', 'Database Kancolle!'),

	// If all else fail fixes
	new T('を建造', 'Construction Recipes'),
	new T('を秘書艦として開発', 'developed as secretary'),
	new T('を開発', 'developed with'),
	new T('開発情報', 'Development Information'),
	new T('装備別情報', 'Equipment Specific Info'),
	new T('装備種別情報', 'Equipment Type Info'),
	new T('装備種別', 'Equipment Type'),
	new T('建造情報', 'Construction Info'),
	new T('建造データベースを検索(オープンテスト中)', 'Search Construction Database (Open Beta)'),
	new T('開発データベースを検索(オープンテスト中)', 'Search Development Database (Open Beta)'),
	new T('*:has(*)', 'レシピを検索(入力：レシピ/無視 結果/必須)', 'Search for Recipe (Recipe Req / Ignore Result)', 'search'),
	new T('*:has(*)', '結果を検索(入力：レシピ/必須 結果/無視)', 'Search Results (Recipe Ignored)', 'search'),
	new T('レシピ(同じ数値を入力することで絞込可能)', 'Recipe (Narrow result by inputting same value)'),
	new T('*:has(*)', 'レシピを検索(入力：レシピ/無視 結果/必須 秘書/任意)', 'Search Recipes (Recipe Req / Ignore Result / Req Secretary', 'search'),
	new T('*:has(*)', '結果を検索(入力：レシピ/任意 結果/無視 秘書/必須)', 'Search Results (Recipes Ignored / Any Result / Ignore Secretary', 'search'),
	new T('*:has(*)', '秘書を検索(入力：レシピ/任意 結果/必須 秘書/無視)', 'Search by Secretary (Recipes Ignored / Any Result / Req Secretary', 'search'),
	new T('結果装備（種類）', 'Resulting Equipment'),
	
    // Top Navigation
    new T('トップ', 'Top'),
    new T('艦娘一覧', 'Ship Daughter List'),
    new T('装備一覧', 'Equipment List'),
    new T('建造', 'Construction'),
    new T('開発', 'Development'),
    new T('検索(ベータ)', 'Search (Beta)'),
    new T('削除', 'Delete'),
	
	new T('艦娘', 'Ship Daughter'),
    new T('装備名', 'Equipment Name'),
    new T('装備', 'Equipment'),
	
	// Side Navigation -- Non-Kancolle Stuffs	
	new T('スポンサー', 'Sponsers'),
	new T('直近の更新', 'Most Recent Updates'),
	new T('あなたの投稿', 'Your Posts'),
	new T('広告', 'Advertisement'),
    new T('アクセスカウンタ', 'Access Count'),
	new T('リンク', 'Links'),
	
	// Ship Types / Side Navigation
	new T('航空戦艦', 'Aviation Battleship'),
    new T('戦艦', 'Battleship'),
    new T('正規空母', 'Regular Aircraft Carrier'),
    new T('軽空母', 'Light Aircraft Carrier'),
    new T('水上機母艦', 'Seaplane Tender'),
	new T('航空巡洋艦', 'Aviation Cruiser'),
    new T('重巡洋艦', 'Heavy Cruiser'),
	new T('重雷装巡洋艦', 'Heavy Torpedo Cruiser'),
    new T('軽巡洋艦', 'Light Cruiser'),
    new T('駆逐艦', 'Destroyer'),
    new T('潜水艦', 'Submarine'),
    new T('潜水空母', 'Submarine Carrier'),
    new T('揚陸艦', 'Amphibious Assault'),
		
	// Fixes for Kai moniker
	new T('改良型艦本式タービン', 'Improved Steam Turbine'),
	
	// Ship Daughters
    new T('改二', ' Kai-2'),
    new T('改', ' Kai'),
	
	// Ship Daughters -- BB
    new T('金剛', 'Kongo'),
    new T('比叡', 'Hiei'),
    new T('榛名', 'Haruna'),
    new T('霧島', 'Kirishima'),
    new T('扶桑', 'Fuso'),
    new T('山城', 'Yamashiro'),
    new T('伊勢', 'Ise'),
    new T('日向', 'Hyuuga'),
    new T('長門', 'Nagato'),
    new T('陸奥', 'Mutsu'),
    new T('大和', 'Yamato'),
    new T('武蔵', 'Musashi'),
	
	// Ship Daughters -- CV
    new T('赤城', 'Akagi'),
    new T('加賀', 'Kaga'),
    new T('蒼龍', 'Souryuu'),
    new T('飛龍', 'Hiryuu'),
    new T('翔鶴', 'Shoukaku'),
    new T('山城', 'Yamashiro'),
    new T('瑞鶴', 'Zuikaku'),
    new T('大鳳', 'Taiho'),
	
	// Ship Daughters -- CVL
    new T('鳳翔', 'Houshou'),
    new T('龍驤', 'Ryuujou'),
    new T('飛鷹', 'Souryuu'),
    new T('飛龍', 'Hiyou'),
    new T('隼鷹', 'Junyou'),
    new T('祥鳳', 'Shouhou'),
    new T('瑞鳳', 'Zuihou'),
	
    new T('千歳甲', 'Chitose A'),
    new T('千歳航', 'Chitose'),
    new T('千歳', 'Chitose'),
    new T('千代田甲', 'Chiyoda A'),
    new T('千代田航', 'Chiyoda'),
    new T('千代田', 'Chiyoda'),
    new T('あきつ', 'Akitsu Maru'),
	
	// Ship Daughters -- CA
    new T('古鷹', 'Furutaka'),
    new T('加古', 'Kako'),
    new T('青葉', 'Aoba'),
    new T('衣笠', 'Kinugasa'),
    new T('妙高', 'Myoukou'),
    new T('那智', 'Nachi'),
    new T('足柄', 'Ashigara'),
    new T('羽黒', 'Haguro'),
    new T('高雄', 'Takao'),
    new T('愛宕', 'Atago'),
    new T('摩耶', 'Maya'),
    new T('鳥海', 'Choukai'),
    new T('利根', 'Tone'),
    new T('筑摩', 'Chikuma'),
    new T('最上', 'Mogami'),
    new T('三隈', 'Mikuma'),
    new T('鈴谷', 'Suzuya'),
    new T('熊野', 'Kumano'),
	
	// Ship Daughters -- CL
    new T('天龍', 'Tenryuu'),
    new T('龍田', 'Tatsuta'),
    new T('球磨', 'Kuma'),
    new T('多摩', 'Tama'),
    new T('木曾', 'Kiso'),
    new T('長良', 'Nagara'),
    new T('五十鈴', 'Isuzu'),
    new T('名取', 'Natori'),
    new T('由良', 'Yura'),
    new T('鬼怒', 'Kinu'),
    new T('阿武隈', 'Abukuma'),
    new T('川内', 'Sendai'),
    new T('神通', 'Jintsuu'),
    new T('那珂', 'Naka'),
    new T('大井', 'Ooi'),
    new T('北上', 'Kitakami'),
    new T('夕張', 'Yuubari'),
    new T('阿賀野', 'Agano'),
    new T('能代', 'Noshiro'),
    new T('矢矧', 'Yahagi'),
	
	// Ship Daughters -- DD
    new T('島風', 'Shimakaze'),
    new T('吹雪', 'Fubuki'),
    new T('白雪', 'Shirayuki'),
    new T('初雪', 'Hatsuyuki'),
    new T('深雪', 'Miyuki'),
    new T('叢雲', 'Murakumo'),
    new T('磯波', 'Isonami'),
    new T('綾波', 'Ayanami'),
    new T('敷波', 'Shikinami'),
    new T('睦月', 'Mutsuki'),
    new T('如月', 'Kisaragi'),
    new T('皐月', 'Satsuki'),
    new T('文月', 'Fumizuki'),
    new T('長月', 'Nagatsuki'),
    new T('菊月', 'Kikuzuki'),
    new T('三日月', 'Mikazuki'),
    new T('望月', 'Mochizuki'),
    new T('暁', 'Akatsuki'),
    new T('初春', 'Hatsuharu'),
    new T('子日', 'Nenohi'),
    new T('Верный', 'Verniy'),
    new T('若葉', 'Wakaba'),
    new T('初霜', 'Hatsushimo'),
    new T('白露', 'Shiratsuyu'),
    new T('時雨', 'Shigure'),
    new T('村雨', 'Murasame'),
    new T('夕立', 'Yuudachi'),
    new T('五月雨', 'Samidare'),
    new T('涼風', 'Suzukaze'),
    new T('夕立', 'Yuudachi'),
    new T('時雨', 'Shigure'),
    new T('朝潮', 'Asashio'),
    new T('大潮', 'Ooshio'),
    new T('満潮', 'Michishio'),
    new T('荒潮', 'Arashio'),
    new T('陽炎', 'Kagerou'),
    new T('不知火', 'Shiranui'),
    new T('黒潮', 'Kuroshio'),
    new T('雪風', 'Yukikaze'),
    new T('初風', 'Hatsukaze'),
    new T('舞風', 'Maikaze'),
    new T('秋雲', 'Akigumo'),
    new T('夕雲', 'Yuugumo'),
    new T('巻雲', 'Makigumo'),
    new T('長波', 'Naganami'),
	
	// Ship Daughters -- SS
    new T('伊168', 'I-168'),
    new T('伊58', 'I-58'),
    new T('伊19', 'I-19'),
    new T('伊8', 'I-8'),
    new T('伊401', 'I-401'),
    new T('まるゆ', 'Maruyu'),
		
	// Equipment -- Full Names
    new T('12cm単装砲', '12cm Single Cannon'),
    new T('12.7cm連装砲', '12.7cm Twin Cannon'),
    new T('10cm連装高角砲', '10cm Twin High-Angle Cannon'),
    new T('14cm単装砲', '14cm Single Cannon'),
    new T('20.3cm連装砲', '20.3cm Twin Cannon'),
	new T('35.6cm連装砲', '35.6cm Twin Cannon'),
    new T('41cm連装砲', '41cm Twin Cannon'),
    new T('46cm三連装砲', '46cm Triple Cannon'),
    new T('12.7cm連装高角砲', '12.7cm Twin High-Angle Cannon'),
    new T('15.2cm単装砲', '15.2cm Single Cannon'),
    new T('61cm三連装魚雷', '61cm Triple Torpedo'),
    new T('61cm四連装魚雷', '61cm Quad Torpedo'),
    new T('61cm四連装酸素魚雷', '61cm Quad (Oxygen) Torpedo'),
    new T('九七式艦攻', 'Type 97 Torpedo Bomber'),
    new T('天山', 'Tenzan'),
    new T('流星', 'Ryuusei'),
    new T('九六式艦戦', 'Type 96 Fighter'),
    new T('零式艦戦21型', 'Type 21 Zero Fighter'),
    new T('零式艦戦52型', 'Type 52 Zero Fighte'),
    new T('烈風', 'Reppuu'),
    new T('九九式艦爆', 'Type 99 Dive Bomber'),
    new T('彗星一二型甲', 'Suisei (Comet) Model 12A'),
    new T('彗星', 'Suisei'),
    new T('零式水上偵察機', 'Type 0 Recon Seaplane'),
    new T('瑞雲', 'Zuiun'),
    new T('13号対空電探', 'Type 13 Air RADAR'),
    new T('22号対水上電探', 'Type 22 Surface RADAR'),
    new T('33号対水上電探', 'Type 33 Surface RADAR'),
    new T('21号対空電探', 'Type 21 Air RADAR'),
    new T('32号対水上電探', 'Type 32 Surface RADAR'),
    new T('14号対空電探', 'Type 14 Air RADAR'),
    new T('強化型艦本式缶', 'Enhanced Steam Boiler'),
    new T('三式弾', 'Type 3 Shell'),
    new T('九一式徹甲弾', 'Type 91 Armor-Piercing (AP) Shell'),
    new T('7.7mm機銃', '7.7mm Gun'),
    new T('12.7mm単装機銃', '12.7mm Gun'),
    new T('25mm連装機銃', '25mm Dual Gun'),
    new T('25mm三連装機銃', '25mm Triple Gun'),
    new T('甲標的', 'Type A Ko-hyoteki'),
    new T('応急修理要員', 'Repair Team'),
    new T('応急修理女神', 'Repair Goddess'),
    new T('九四式爆雷投射機', 'Type 94 Depth Charge'),
    new T('三式爆雷投射機', 'Type 3 Depth Charge'),
    new T('九三式水中聴音機', 'Type 93 SONAR'),
    new T('三式水中探信儀', 'Type 3 SONAR'),
    new T('12.7cm単装高角砲', '12.7cm Single High-Angle Cannon'),
    new T('25mm単装機銃', '25mm Single Gun'),
	new T('20.3cm三号連装砲', '20.3cm(no.3) Dual Cannon'),
    new T('12cm30連装噴進砲', '12cm 30-tube Rocket Launcher'),
    new T('彩雲', 'Saiun'),
	new T('紫電', 'Shiden (Violet Lightning)'),
    new T('震電', 'Shiden (Magnificent Lightning)'),
    new T('61cm五連装酸素魚雷', '61cm Quintuple (Oxygen) Torpedo'),
    new T('零式水上観測機', 'Type 0 Observation Seaplane'),
    new T('零戦六二型(爆戦)', 'Type 62 Zero Fighter (Bomber)'),
    new T('二式艦上偵察機', 'Type 2 Recon Plane'),
    new T('試製晴嵐', 'Prototype Seiran'),
    new T('12.7cm連装砲B型', '12.7cm Twin Cannon Type B'),
    new T('Ju87C', 'Ju 87C'),
    new T('15.2cm連装砲', '15.2cm Twin Cannon'),
    new T('8cm高角砲', '8cm High-Angle Cannon'),
    new T('53cm艦首(酸素)魚雷', '53cm Hull-mount (Oxygen) Torpedo'),
    new T('大発動艇', 'Daihatsu-Class Landing Craft'),
    new T('カ号観測機', 'Ka-Gou Artillery-Spotter'),
    new T('三式指揮連絡機(対潜)', 'Type 3 Command Liaison Plane (ASW)'),
    new T('10cm連装高角砲(砲架)', 'Improved 10cm High-angle Cannon'),
    new T('増設バルジ（中型艦）', 'Anti-Torpedo Bulge (Medium)'),
    new T('増設バルジ（大型艦）', 'Anti-Torpedo Bulge (Large)'),
    new T('15.5cm三連装砲(主砲)', '15.5cm Triple Cannon (Main)'),
    new T('15.5cm三連装砲', '15.5cm Triple Cannon (Main)'),
    new T('15.5cm三連装砲(副砲)', '15.5cm Triple Cannon (Secondary)'),
    new T('15.5cm三連装副砲', '15.5cm Triple Cannon (Secondary)'),
	new T('ペンギン', 'Penguin'),
	
	// Equipment -- Types
    new T('失敗', 'Failure'),
    new T('主砲', 'Main Gun'),
    new T('副砲', 'Sub Gun'),
    new T('機銃', 'Machine Gun'),
    new T('魚雷', 'Torpedo'),
    new T('攻撃機', 'Torpedo Bomber'),
    new T('戦闘機', 'Fighter'),
    new T('爆撃機', 'Dive Bomber'),
    new T('偵察機', 'Recon Plane'),
    new T('水上機', 'Seaplane'),
    new T('電探', 'Air Radar'),
    new T('ソナー', 'Sonar'),
    new T('機関', 'Engine'),
    new T('弾薬', 'Ammo'),
    new T('爆雷', 'Depth Charge'),
	
	// Main Page -- Construction / Development
	new T('燃料', 'Fuel'),
	new T('鋼材', 'Steel'),
	new T('ボーキ', 'Bauxite'),
	new T('主な秘書艦種', 'Secretary Ship Type'),
	new T('秘書LV', 'Secretary LV'),
	new T('秘書艦(種)', 'Secretary Ship'),
	new T('秘書艦', 'Secretary Ship'),
	new T('司令LV範囲', 'HQ LV Range'),
	new T('司令LV', 'HQ LV'),
	new T('トリップ', 'Trip'),
	new T('規約', 'Terms'),
	new T('を読了', ' of agreement'),
    new T('投稿数', 'Posts'),
	new T(':input', '投稿', 'Post'),
	new T('選択していません', 'None Selected'),
	new T('ドロップ', 'Drop'),
	
	// Construction/Development
    new T('レシピ一覧', 'List of Recipes'),
	new T('有力レシピ', 'Leading Recipe'),
    new T('レシピ', 'Recipe'),
    new T('キャッシュ情報', 'Cache Info'),
    new T('砲', 'Gun'),
    new T('航空機', 'Aircraft'),
    new T('探信儀', 'Sonar'),
	new T('確率', 'Probability'),
	new T('報告数', 'Report Count'),
	new T('艦別情報', 'Ship-specific Info'),
    new T('艦名', 'Ship Name'),
    new T('艦種別情報', 'Ship Type Info'),
    new T('艦種', 'Ship Type'),
	
	// Search
	new T('基本情報(任意)', 'Basic Info (Optional)'),
	new T('*:has(*)', '最小', 'Min', 'search'),
	new T('*:has(*)', '最大', 'Max', 'search'),
	new T('*:has(*)', '日時', 'Date', 'search'),
	new T('*:has(*)', '年', 'Year', 'search'),
	new T('*:has(*)', '月', 'Month', 'search'),
	new T('*:has(*)', '日', 'Day', 'search'),
	new T('検索タイプ(必須)', 'Search Type (REQUIRED)'),
	new T('結果艦(種)', 'Resulting Ship'),
	new T('結果', 'Result'),
	new T('指定しない', 'Not Specified'),
	new T('秘書', 'Secretary'),
	new T('検索', 'Search'),
	new T(':input', '検索', 'Search', 'search'),
		
	// Ship Daughters -- Single Kanji -- This broke shit if it wasn't at the end.
    new T('潮', 'Ushio'),
    new T('響', 'Hibiki'),
    new T('雷', 'Ikazuchi'),
    new T('電', 'Inzauma'),
    new T('霰', 'Arare'),
    new T('霞', 'Kasumi'),
    new T('朧', 'Oboro'),
    new T('曙', 'Akebono'),
    new T('漣', 'Sazanami'),
	
]

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addExtraCSS(){
}

function replaceAll(str, pattern, replacement){
    while (str.indexOf(pattern) >= 0) {
        str = str.replace(pattern, replacement);
    }
    return str;
}

function applyTranslationToElement(elem, translation){
	if (elem.nodeName == '#text') {
        elem.textContent = replaceAll(elem.textContent, translation.japanese, translation.english);
    } else if (elem.nodeName == 'INPUT' && String(elem.value).indexOf(translation.japanese) >=0) {
		elem.value = replaceAll(String(elem.value), translation.japanese, translation.english);
	} else {
        $(elem).contents().each(function(index, elem){
            applyTranslationToElement(elem, translation)
        })
    }
}

function translate(){
    var cntSimple = 0;
    var cntScoped = 0;
    $('*:not(:has(*))').each(function(index, elem){
        for (var i = 0; i < translations.length; i++){
            var t = translations[i]
            if (!t.scope && elem.textContent.indexOf(t.japanese) >= 0){
                applyTranslationToElement(elem, t);
                cntSimple++;
            }
        }
    });
    for (var i = 0; i < translations.length; i++){
        var t = translations[i];
        if ( (t.scope && !t.location) || (t.scope && t.location && location.pathname.indexOf(t.location) >= 0) ) {		
            $(t.scope).each(function(index, elem){
                if (elem.textContent.indexOf(t.japanese) >= 0 || (elem.nodeName == 'INPUT' && String(elem.value).indexOf(t.japanese) >= 0)) {
					applyTranslationToElement(elem, t);
					cntScoped++;
				}
            });
        }
    }
    console.log('Replaced:', cntSimple, cntScoped);
}

translate();
addExtraCSS();
unsafeWindow.$ = $;
unsafeWindow.translations = translations;
unsafeWindow.translate = translate;