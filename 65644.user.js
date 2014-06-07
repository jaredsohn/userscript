// ==UserScript==
// @name           Pixiv Translation Plus
// @version        20130702
// @description    Pixiv Translation with a handy tag selection interface. Forked from Better Pixiv Translation. (61162)
// @author         Couchy
// @homepage       http://userscripts.org/users/112858
// @id             http://userscripts.org/users/112858
// @namespace      http://userscripts.org/users/112858
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAChtJREFUeNrtmmtwXGUZx3/Pe87uZjfd3Js09G5taUsptMXScmkLA0KHiyPICEUZhUEGvMCHDkVG+QDOoI7KRaijjKClKKPCWARFi8AgLSDXtgiBQEivIbfmtptk95zzPn44u03SC20lTZuY/5dkd+dc3v/7PP/n8j4wilGM4v8ZMpQPe35Xj77TkmFLu8fWzgw7ui1NXT10SQHpzl5wBKxPYSJO0oEJScO4ZJQTihxOGptgbln0c3PKo68NGwLWb0vpM7u6eXmHz4amNL5nQQxoAI4JHy+AKojkPguoDb+3Cirh7wSgMKU0xgVTElw0qZDzpyTlmCPg6W0pffqjbv5Q38WuDj98goDBxRoL1uSeHACKiCFiBBewAr5V/CBHgAqIImrAAFgUAR9Qy9TSKNfOLGH5lPiqeZXxHx81Aja3dF+8fmdm3W/e62BLoweBgmsQo+HmqQUTkHBcimKGwogh4UYociwVhTEqCgyFxmKN0NYT0NwrtPR4pAKlI+vR1qtkPQCDEVATAAYNLASWZKHhmyeWsuKzY74wtyL+xJARsLEh3bKuPl2+5r0UDe0WHEUci0oANgoBjCkwTCh0GJ+IcHKFy8kVMeaUuavmVRUe0o6tfb9NX9zp8UZLmrouS0vaB1EwEQQLKiHJns+MygK+M7eYb51YKkeUgI0N6ZZ1denyh97voqnTC/3ZsYgKGriglgnFEWaXCmeOT3Lu+NiWReMK535aS3vgnVZ9/MMeXm7yaOv2wWgoGWoQFLUKGK6clWTlSUWr5o09uFscFgHvtvUmH6tLdf62pova5gy4JhSt/F0CpTrpsqS6gEs+k+DL00uOiMjet6VNH3q3i9ebe0EVEQm1IS+oHiyeGOe2U4pZPrlIBoWAh2va9cGaFM9tT4fi5IZs71Fw33LGhATXzxnDlTNKj3h4fbM5ffOdb3b8aF1dmowH4giK9r2PFzCjrIAfnlHGJVMPTMJBX/Tt1vQpq7d0vvr7uh7aOn0kEiozCCho/v/egAfPr+bq2cVDmlvc+EKj/rqmi1TWgul7tKiivmVaWYJfLi3hnEn7J8F80s0fre3Q657f/erqzSna0j5Ec7EbE3KADuDQdYY+k7tnSZWsOD5OxFEg1CEBFINEhQ93Z7lxY8cBrz8gAd99pVFXbtjNhh294ASIC9gAtT4uAYigkk9SctCjk87+aul4uWBSEqxBxWJUESyqBiKW/zT1cNGTO/WQCbjiH7v0Z292siMVYFyLwUV9hxPKo1x2fBGeLzn/CYY6mz4gVs0vqZ9bHoZeS25z8pviCn+pT3P/5t36iQS81Zy+/vTHtumjH3aT8UEcsBisVRaME9acU3XP8olx8C3YXFZ2jGBxdWLqiuPHUFzgoP2tMk+ECLe/1nJgC3jj4847Ll/fvHpDQy+ojzGCYkEtp0+IsvaccUULxiZuipjwkpBhc/Tsfj+4ZX65zKuMgWUv1wwjQ2MXrHqlecALuwDP7krpBX9vpSHlIwawUQQPMcKi6gI2fHGyzOp3rz3MqnIMGQEAF05KsLm1l909Nrc34eKNWtQV7tvUua8FfOOZJhrSWQw+qg5R8Qkch5lJeOnSyXJsFNOHhpXzymRSMhJWkv1cQAEcJd2jPPROiw4gYMXMErAB1rggARlrqYwa7l06blg2OeYUR3I5wUD3FCtgLA9/0DPQAm5fWCYzyuMQKI5CIhrh6uMTnDupSIYjAQsr45QVOAPCs0ooDaA8t9PfVwTXnl3yNFaw1iceg89PKxm2ba65FYbSmPQzgHzmqhjXQbNZnt2W0gEELKwqXn7TyUlUouAJW9tSw5aAZROKpTjqhOvW/oItWFVwhFdaevfNA+5eUiXTioUsimMiw7rZGXfznae9wmHOGGo7/P1ngquXjGXpcTGumlksw5oAh74wSL+yXUISWjO2Lw/oj/MmFw3rhedRFjHgSqj8EqB7eowhCS3p7MGrweEMNU5fsSr5Klb7Zcgysglo6slCoKjkapb+lbtCadTdvwuMFHg2v+kGCHKL7/PuyoQZ2QSkPNsvXd9X1qaXFoxcF/hzXbu2ZW2/dWtfRFDAKosq3JFLwL8bs7T0BP18XpD8CZMosZjDsonhsdqIJODVpgw9WTtA9QSDwYIq548vOHhPcLjijx90ak27P/C8QujrYPsO18wqGrkE/Kmui+0pL9cH0H4SYLEYZlcUcPG0vmRvRBGwpqZNn9+RCY+ZTc73c0WQioLnc+u84n07QiMB77T2HPdATSeN6SBM/HSvlm0gLJuY5CuzB84UjBgCfrqpbefGXR6YIDdWkHMBI6ABsZjhztPK6ve+bkQQsHJji659v5cgUEScsOATQY2g1oJnuPe0chaPS0w9ogTYo9Ai//aLDfrzTe1k/Lzp5w9FAsQCvnLbqSVcN6f08M8GDxeuyJD6/IVP7dD7N3WTUcUYMCgiPqJZDA6aVVYtLOP2xZUHfLHBqwUc4Z+7uodk8avf3q3nPdXI9i4fJMBoOB+gopgggnUEDXy+t7iUHywaOzjzAX2hpkOv+msDUuCG5/H9Go6IYYwrnD0xxtdmFHHJtMFtrqypadefvNXF5uYMxglQBMGgueEp0QAVhxLHcteSSr4+6+BzCoNHABqOyOQTkECIReDUqihLjoszvzL2iYMKB8KTH3XrE/WdrKvL0JjOQCQMcUYdEIuqBWMQDNaDMyfFuOv0igdPGRu/5lDuP6gWYMSgBAiCDaUYE1ismlw4EqKOZXJxhOpCh8q4S0nEUBo34XG2FdqyyraUsrW9m9ouxQaK4KGOG4Y2BTW5Gh9BcBECJiTglnll3HBS2WGtafA0wCpnTYqT8jzeawvIBC4ZPGxEQX2wLpgAD6G2PUPtbgFjcsOQ9E2d5BuXklujK6BRwhFDCzigFleEiBHGJ4WrZ5Zw64IKueF/Ee7Ba8Eo184ew+XTi2VTY8+Vf9vZtfaZ7Q61HUoqm8Wz0OsbsppbqMkl6SKhdUg+aTd7Zp0wCr6Gw6LGUmCEWEQoijjMr4jy1elj+NL0Ern100SuwRSpbBD+Pakq/gjwSP779ds79a0Wj9dbPGpbM3RYIetnyQYuQRAQAF5uosOEAQXXKI5xiDpKgYGqeIwFlVHOrI5z6bQi2Q6sG4zQPRRh69yJ+4rfllbvrI/TmWebuzN0BQ7tPQHWUYwqSdelLOpSXmiYUGiKZpXFu94H/gXcPcjvdtR6gieWR57jGDhgH7Ft8VECRgk4Qhrg5qYxdUDhpwN+G9EEfNDRDUZxRMNhrHwF6Ai1nZlhR8Ahb9njdbv1dzXdvN7ay0edFmMErO4hQK0ypTjK/LERrpie5LJpw+OU+ZAs4M2m9M0XPt3EzqYA3HBM1hqbGzhw9nBZ3+JR39jLSw3dvNHYfcf8qsT3R4wF3PjCx7o1FeDmcnYVGXBxvgntW6U6YfjFsuoRMWcwilGMYhQjGv8FaXFeiKL9mrMAAAAASUVORK5CYII=
// @run-at         document-start
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_notification
// @include        http://www.pixiv.net/*
// @include        http://dic.pixiv.net/*
// @include        http://nijie.info/*
// @include        http://www.tinami.com/*
// @include        http://seiga.nicovideo.jp/*
// @exclude        http://www.pixiv.net/msg*
// @noframes
// ==/UserScript==

function setLocalObject(key, value){var str = JSON.stringify(value); if(typeof GM_getValue === "function" && GM_getValue("","?") === "?"){GM_setValue(key, str);} else{localStorage.setItem(key, str);}}
function getLocalObject(key, def){var str = (typeof GM_getValue === "function" && GM_getValue("","?") === "?") ? GM_getValue(key) : localStorage.getItem(key); return str ? (function(){try{return JSON.parse(str);}catch(e){return def;}})() : def;}
function setSessionObject(key, value){sessionStorage.setItem(key, JSON.stringify(value));}
function getSessionObject(key, def){var str = sessionStorage.getItem(key); return str ? (function(){try{return JSON.parse(str);}catch(e){return def;}})() : def;}

function notify(msg, title, icon, callback){
    if(typeof GM_notification === "function")
        GM_notification(msg, title, icon, callback);
    else if(typeof callback === "function" && confirm(msg))
        callback();
    else
        alert(msg);
}

//transition to GM_setValue
if(typeof GM_getValue === "function" && GM_getValue("","?") === "?"){
    if(!GM_getValue("PTP_Settings_110701") && localStorage.getItem("PTP_Settings_110701")){
        GM_setValue("PTP_Settings_110701", localStorage.getItem("PTP_Settings_110701"));
        notify("Settings copied to GM_setValue");
    }
    if(!GM_getValue("PTP_Custom") && localStorage.getItem("PTP_Custom")){
        GM_setValue("PTP_Custom", localStorage.getItem("PTP_Custom"));
        notify("Custom tags copied to GM_setValue");
    }
    if(localStorage.getItem("PTP_Settings_110701") || localStorage.getItem("PTP_Custom"))
        localStorage.clear();
}

function ce(tag, attr){
    var el = document.createElement(tag);
    for(var x in attr)
        el.setAttribute(x, attr[x]);
    el.setAttribute("ptpel", "");
    return el;
}

var searchbar = ce("input");

var translations = {"katakana":{
    "ア":"a",
    "ァ":"a",
    "カ":"ka",
    "サ":"sa",
    "タ":"ta",
    "ナ":"na",
    "ハ":"ha",
    "マ":"ma",
    "ヤ":"ya",
    "ャ":"ya",
    "ラ":"ra",
    "ワ":"wa",
    "ガ":"ga",
    "ザ":"za",
    "ダ":"da",
    "バ":"ba",
    "パ":"pa",
    "イ":"i",
    "ィ":"i",
    "キ":"ki",
    "シ":"shi",
    "チ":"chi",
    "ニ":"ni",
    "ヒ":"hi",
    "ミ":"mi",
    "リ":"ri",
    "ヰ":"wi",
    "ギ":"gi",
    "ジ":"ji",
    "ヂ":"di",
    "ビ":"bi",
    "ピ":"pi",
    "ウ":"u",
    "ク":"ku",
    "ス":"su",
    "ツ":"tsu",
    "ッ":"",
    "ヌ":"nu",
    "フ":"hu",
    "ム":"mu",
    "ユ":"yu",
    "ュ":"yu",
    "ル":"ru",
    "ン":"n",
    "グ":"gu",
    "ズ":"zu",
    "ヅ":"du",
    "ブ":"bu",
    "プ":"pu",
    "ヴ":"vu",
    "エ":"e",
    "ェ":"e",
    "ケ":"ke",
    "セ":"se",
    "テ":"te",
    "ネ":"ne",
    "ヘ":"he",
    "メ":"me",
    "レ":"re",
    "ヱ":"we",
    "ゲ":"ge",
    "ゼ":"ze",
    "デ":"de",
    "ベ":"be",
    "ペ":"pe",
    "オ":"o",
    "コ":"ko",
    "ソ":"so",
    "ト":"to",
    "ノ":"no",
    "ホ":"ho",
    "モ":"mo",
    "ヨ":"yo",
    "ョ":"yo",
    "ロ":"ro",
    "ヲ":"wo",
    "ゴ":"go",
    "ゾ":"zo",
    "ド":"do",
    "ボ":"bo",
    "ポ":"po"},
                    "hiragana":{
                        "あ":"a",
                        "ぁ":"a",
                        "か":"ka",
                        "さ":"sa",
                        "た":"ta",
                        "な":"na",
                        "は":"ha",
                        "ま":"ma",
                        "や":"ya",
                        "ゃ":"ya",
                        "ら":"ra",
                        "わ":"wa",
                        "が":"ga",
                        "ざ":"za",
                        "だ":"da",
                        "ば":"ba",
                        "ぱ":"pa",
                        "い":"i",
                        "き":"ki",
                        "し":"shi",
                        "ち":"chi",
                        "に":"ni",
                        "ひ":"hi",
                        "み":"mi",
                        "り":"ri",
                        "ゐ":"wi",
                        "ぎ":"gi",
                        "じ":"ji",
                        "ぢ":"di",
                        "び":"bi",
                        "ぴ":"pi",
                        "う":"u",
                        "く":"ku",
                        "す":"su",
                        "つ":"tsu",
                        "っ":"",
                        "ぬ":"nu",
                        "ふ":"hu",
                        "む":"mu",
                        "ゆ":"yu",
                        "ゅ":"yu",
                        "る":"ru",
                        "ん":"n",
                        "ぐ":"gu",
                        "ず":"zu",
                        "づ":"du",
                        "ぶ":"bu",
                        "ぷ":"pu",
                        "え":"e",
                        "ぇ":"e",
                        "け":"ke",
                        "せ":"se",
                        "て":"te",
                        "ね":"ne",
                        "へ":"he",
                        "め":"me",
                        "れ":"re",
                        "ゑ":"we",
                        "げ":"ge",
                        "ぜ":"ze",
                        "で":"de",
                        "べ":"be",
                        "ぺ":"pe",
                        "お":"o",
                        "ぉ":"o",
                        "こ":"ko",
                        "そ":"so",
                        "と":"to",
                        "の":"no",
                        "ほ":"ho",
                        "も":"mo",
                        "よ":"yo",
                        "ょ":"yo",
                        "ろ":"ro",
                        "を":"wo",
                        "ご":"go",
                        "ぞ":"zo",
                        "ど":"do",
                        "ぼ":"bo",
                        "ぽ":"po"},
                    "page":{
                        "ブックマークに追加":"Add to Bookmarks",
                        "お知らせ":"Announcement",
                        "新機能":"New feature",
                        "公式イベント":"Official event"},
                    "tag":{
                        "Series and Characters":{
                            "Series":{
                                "版権":"Copyright",
                                "暁の護衛":"Akatsuki no Goei",
                                "不思議の国のアリス":"Alice in Wonderland",
                                "アルカナハート":"Arcana Heart",
                                "アーマードコア":"Armored Core",
                                "あずまんが大王":"Azumanga Daioh",
                                "化物語":"Bakemonotagari",
                                "バンブーブレード":"Bamboo Blade",
                                "ベイブレード":"Beyblade",
                                "ブラック★ロックシューター":"Black Rock Shooter",
                                "ブレイブルー":"BlazBlue",
                                "ブリーチ":"Bleach",
                                "武装神姫":"Busou Shinki",
                                "中二病でも恋がしたい!":"Chuunibyou demo Koi ga Shitai!",
                                "クラナド":"Clannad",
                                "コードギアス":"Code Geass",
                                "デスノート":"Death Note",
                                "デモンブライド":"Demon Bride",
                                "デジモン":"Digimon",
                                "ディズニー":"Disney",
                                "ドラえもん":"Doraemon",
                                "ドラゴンボール":"DragonBall",
                                "デュラララ!!":"Durarara!!",
                                "エイケン":"Eiken",
                                "エヴァンゲリオン":"Evangelion",
                                "ヱヴァンゲリヲン":"Evangelion",
                                "ハガレン":"FMA",
                                "フリージング":"Freezing",
                                "フレッシュプリキュア":"Fresh Pretty Cure!",
                                "鋼の錬金術師":"Fullmetal Alchemist",
                                "銀魂":"Gintama",
                                "ギルティクラウン":"Guilty Crown",
                                "ガンダム":"Gundam",
                                "SDガンダム":"Gundam SD",
                                "ガンダムX":"Gundam X",
                                "ガンダム00":"Gundam 00",
                                "ガンダムSEED":"Gundam Seed",
                                "グレンラガン":"Gurren Lagann",
                                "這いよれ!ニャル子さん":"Haiyore! Nyaruko-san",
                                "初音ミクAppend":"Hatsune Miku Append",
                                "ハヤテのごとく":"Hayate no Gotoku",
                                "ヘタリア":"Hetalia",
                                "ハイスクールオブザデッド":"Highschool Of The Dead(ハイスクールオブザデッド)",
                                "学園黙示録":"Highschool Of The Dead(学園黙示録)",
                                "ひぐらし":"Higurashi",
                                "ひぐらしのなく頃に":"Higurashi no Naku Koro ni",
                                "ひぐらしのなく頃に解":"Higurashi no Naku Koro ni Kai",
                                "ハンター×ハンター":"HUNTERxHUNTER",
                                "アイマス":"Idolmaster(アイマス)",
                                "アイドルマスター":"Idolmaster(アイドルマスター)",
                                "イナズマイレブン":"Inazuma Eleven",
                                "かんなぎ":"Kannagi",
                                "キミキス":"Kimikiss",
                                "けいおん":"K-ON",
                                "けいおん!":"K-ON!",
                                "けいおん!!":"K-ON!!",
                                "ラストエグザイル":"Last Exile",
                                "リトルバスターズ!":"Little Busters!",
                                "リトルマーメイド":"Little Mermaid",
                                "幸運星":"Lucky Star(幸運星)",
                                "らきすた":"Lucky Star(らきすた)",
                                "らき☆すた":"Lucky☆Star",
                                "リリカルなのは":"Lyrical Nanoha",
                                "マビノギ":"Mabinogi",
                                "マクロス":"Macross",
                                "マクロスF":"Macross F",
                                "マクロスフロンティア":"Macross Frontier",
                                "メイプルストーリー":"Maple Story",
                                "涼宮ハルヒの憂鬱":"The Melancholy of Suzumiya Haruhi",
                                "ミルキィホームズ":"Milky Holmes",
                                "未来日記":"Mirai Nikki",
                                "もえたん":"Moetan",
                                "マブラヴ":"Muv-Luv",
                                "俺の妹がこんなに可愛いわけがない":"My Younger Sister Can't Be This Cute",
                                "ナルト":"Naruto",
                                "ナウシカ":"Nausicaa",
                                "ニードレス":"NEEDLESS",
                                "ワンピース":"One Piece",
                                "パンヤ":"Pangya",
                                "パンティ&ストッキングwithガーターベルト":"Panty & Stocking with Garter Belt",
                                "プリキュア":"Precure",
                                "プリンセスラバー":"Princess Lover",
                                "テニスの王子様":"Prince of Tennis",
                                "ぷよぷよ":"Puyo Puyo",
                                "クイーンズブレイド":"Queen's Blade",
                                "ラグナロクオンライン":"Ragnarok Online",
                                "リボーン":"REBORN",
                                "ロマンスは剣の輝きⅡ":"Romance wa Tsurugi no Kagayaki",
                                "ロザリオとバンパイア":"Rosario to Vampire",
                                "ローゼンメイデン":"Rozen Maiden",
                                "セーラームーン":"Sailor Moon",
                                "生徒会役員共":"Seitokai Yakuindomo",
                                "セキレイ":"Sekirei",
                                "シャーマンキング":"Shaman King",
                                "侵略!イカ娘":"Shinryaku! Ika Musume",
                                "シュタインズゲート":"Stein's Gate",
                                "ソウルイーター":"Soul Eater",
                                "サウスパーク":"South Park",
                                "狼と香辛料":"Spice and Wolf",
                                "ストライクウィッチーズ":"Strike Witches",
                                "サマーウォーズ":"Summer Wars",
                                "スパロボ":"Super Robot Wars",
                                "ソードアート・オンライン":"Sword Art Online",
                                "天元突破グレンラガン":"Tengen Toppa Gurren Lagann",
                                "とある科学の超電磁砲":"Toaru Kagaku no Railgun",
                                "とある魔術の禁書目録":"Toaru Majutsu no Index",
                                "東方":"Touhou",
                                "東方Project":"Touhou Project",
                                "トランスフォーマー":"Transformers",
                                "うみものがたり":"Umi Monogatari",
                                "うみねこのなく頃に":"Umineko no Naku Koro ni",
                                "うたわれるもの":"Utawarerumono",
                                "戦場のヴァルキュリア":"Valkyria Chronicles",
                                "ボーカロイド":"Vocaloid",
                                "ウィッチブレイド":"Witchblade",
                                "やはり俺の青春ラブコメはまちがっている。":"Yahari Ore no Seishun Love Come wa Machigatteiru.",
                                "遊戯王":"Yu-Gi-Oh!",
                                "ゆめにっき":"Yume Nikki",
                                "ゆめにっきガールズ":"Yume Nikki Girls",
                                "ゆめにっきオールスターズ":"Yume Nikki All-Stars",
                                "ゼロの使い魔":"Zero no Tsukaima",
                                "絶対可憐チルドレン":"Zettai Karen Children"},
                            "Characters":{
                                "一方通行":"Accelerator(一方通行)",
                                "アクセラレータ":"Accelerator(アクセラレータ)",
                                "エース":"Ace",
                                "相沢 千鶴":"Aizawa Chizuru",
                                "相沢栄子":"Aizawa Eiko",
                                "相沢たける":"Aizawa Takeru",
                                "秋　穣子":"Aki Minorika",
                                "秋山澪":"Akiyama Mio",
                                "アルフレッド・F・ジョーンズ":"Alfred F. Jones",
                                "希里ありす":"Alice Maresato",
                                "アルフォンス":"Alphonse",
                                "アルフォンス・エルリック":"Alphonse Elric",
                                "天野雪輝":"Amano Yukiteru",
                                "アナーキー・パンティ":"Anarchy Panty",
                                "アナーキー・ストッキング":"Anarchy Stocking",
                                "人造人間[[D]]号":"Android [[D]]",
                                "縁寿":"Ange",
                                "エンジェ・ベアトリーチェ":"Ange Beatrice",
                                "右代宮縁寿":"Ange Ushiromiya",
                                "アントーニョ・ヘルナンデス・カリエド":"Antonio Fernandez Carriedo",
                                "アーニャ・アールストレイム":"Anya Alstreim",
                                "青野月音":"Aono Tsukune",
                                "新垣 あやせ":"Aragaki Ayase",
                                "阿良々木暦":"Araragi Koyomi",
                                "アリエル":"Ariel",
                                "アリン":"Arin",
                                "アルフ":"Arufu",
                                "朝比奈みくる":"Asahina Mikuru",
                                "朝日奈さみだれ":"Asahina Samidare",
                                "朝倉 理香子":"Asakura Rikako",
                                "朝倉涼子":"Asakura Ryoko",
                                "アスモデウス":"Asmodeus",
                                "アスカ":"Asuka",
                                "アスナ":"Asuna",
                                "アーサー・カークランド":"Arthur Kirkland",
                                "アスラン・ザラ":"Athrun Zala",
                                "赤夜萌香":"Ayakashi Moka",
                                "あずさ":"Azusa",
                                "あずにゃん":"Azu-nyan",
                                "バビディ":"Babidi",
                                "戦人":"Battler",
                                "右代宮戦人":"Battler Ushiromiya",
                                "薔薇水晶":"Barasuishou",
                                "ベアト":"Bea",
                                "ベアトリーチェ":"Beatrice",
                                "ベルゼブブ":"Beelzebub",
                                "ベルンカステル":"Bernkastel",
                                "毒島冴子":"Busujima Saeko",
                                "ブウ":"Buu",
                                "カリム・グラシア":"Carim Gracia",
                                "カートマン":"Cartman",
                                "セル":"Cell",
                                "セルジュニア":"Cell Jr.",
                                "シャルロット":"Charlotte",
                                "シャルロットヘイゼルリンク":"Charlotte Hazelrink",
                                "チャオズ":"Chiaotzu",
                                "知恵留美子":"Chie Rumiko",
                                "チチ":"Chi-Chi",
                                "千早":"Chihaya",
                                "クリス":"Chris",
                                "チャック":"Chuck",
                                "クウラ":"Cooler",
                                "デイモン姉妹":"Demon Sisters",
                                "デンデ":"Dende",
                                "ディスク":"Disk",
                                "ディラン・キース":"Dylan Keith",
                                "エドガー・バルチナス":"Edgar Valtinas",
                                "エドワード・エルリック":"Edward Elric",
                                "アイゼルネ・ユングフラウ":"Eiserne Jungfrau",
                                "エリカ":"Erika(エリカ)",
                                "ヱリカ":"Erika(ヱリカ)",
                                "古戸ヱリカ":"Erika Furudo(古戸ヱリカ)",
                                "古戸 ヱリカ":"Erika Furudo(古戸 ヱリカ)",
                                "ユーフェミア":"Euphemia",
                                "エトナ":"Etna",
                                "エヴァ・ベアトリーチェ":"Eva-Beatrice",
                                "魔人ブウ":"Majin Buu",
                                "フェイト":"Fate",
                                "フェイト・テスタロッサ":"Fate Testarossa",
                                "フェザリーヌ・アウグストゥス・アウローラ":"Featherine Augustus Aurora",
                                "フェリシア":"Felicia",
                                "フェリシアーノ・ヴァルガス":"Feliciano Vargas",
                                "フィディオ・アルデナ":"Fidio Aldena",
                                "フロン":"Flonne",
                                "フレン":"Flynn Scifo",
                                "ﾌｫﾛﾄさん":"Foroto San",
                                "フランシス・ボヌフォワ":"Francis Bonnefoy",
                                "フレンダ":"Frenda",
                                "フリーザ":"Frieza",
                                "吹寄制理":"Fukiyose Seiri",
                                "伊吹風子":"Fuko Ibuki",
                                "藤林杏":"Fujibayashi Kyou",
                                "藤林椋":"Fujibayashi Ryou",
                                "古手梨花":"Furude Rika",
                                "双葉理保":"Futaba Riho",
                                "神威がくぽ":"Gakupo Kamui",
                                "ガロード・ラン":"Garrod Ran",
                                "我妻由乃":"Gasai Yuno",
                                "ガートルード":"Gertrude",
                                "ギルベルト・バイルシュミット":"Gilbert Beilschmidt",
                                "悟飯":"Gohan",
                                "五更 瑠璃":"Gokou Ruri (Kuroneko)",
                                "悟空":"Goku",
                                "ゴールドスミス":"Goldsmith",
                                "最長老":"Grand Elder Guru",
                                "八九寺真宵":"Hachikuji Mayoi",
                                "萩原雪歩":"Hagiwara Yukiho",
                                "羽川翼":"Hanekawa Tsubasa",
                                "羽入":"Hanyuu",
                                "原村和":"Haramura Nodoka",
                                "ハルヒ":"Haruhi",
                                "初音":"Hatsune",
                                "初音ミク":"Hatsune Miku",
                                "アンリエッタ":"Henrietta",
                                "姫海棠　はたて":"Himekaidou Hatate",
                                "桂ヒナギク":"Hinagiku Katsura",
                                "平野コータ":"Hirano Kohta",
                                "柊かがみ":"Hiiragi Kagami",
                                "柊つかさ":"Hiiragi Tsukasa",
                                "姫神秋沙":"Himegami Aisa",
                                "平沢唯":"Hirasawa Yui",
                                "ひたぎ":"Hitagi",
                                "氷山キヨテル":"Hiyama Kiyoteru",
                                "本田菊":"Honda Kiku",
                                "ホロ":"Horo",
                                "北条沙都子":"Houjou Satoko",
                                "北条悟史":"Houjou Satoshi",
                                "北条鉄平":"Houjou Teppei",
                                "封獣ぬえ":"Houjuu Nue",
                                "ポケモン人間絵":"Human Pokemon Characters",
                                "イリヤ":"Illya",
                                "イカ娘":"Ika Musume",
                                "入江京介":"Irie Kyousuke",
                                "イヴァン・ブラギンスキ":"Ivan Braginski",
                                "十六夜アキ":"Izayoi Aki",
                                "泉こなた":"Izumi Konata",
                                "ジャネット":"Janet",
                                "ゼシカ":"Jessica",
                                "天草":"Juuza",
                                "天草十三":"Juuza Amakusa",
                                "火焔猫燐":"Kaenbyou Rin",
                                "かがみ":"Kagami",
                                "かがみく":"Kagamiku",
                                "かがみん":"Kagamin",
                                "鏡音リン":"Kagamine Rin",
                                "鏡音レン":"Kagamine Len",
                                "かがこな":"KagamixKonata",
                                "鍵山雛":"Kagiyama Hina",
                                "歌愛ユキ":"Kaai Yuki",
                                "カカロット":"Kakarot(Goku)",
                                "上条当麻":"Kamijou Touma",
                                "金糸雀":"Kanaria",
                                "神原駿河":"Kanbaru Suruga",
                                "神裂火織":"Kanzaki Kaori",
                                "風斬氷華":"Kanzakiri Hyouka",
                                "カレン・シュタットフェルト":"Kallen Stadtfield",
                                "柏木楓":"Kashiwagi Kaede",
                                "川田知子":"Kawada Tomoko",
                                "河城にとり":"Kawashiro Nitori",
                                "風見幽香":"Kazami Yuuka",
                                "風花":"Kazehana",
                                "圭一":"Keiichi",
                                "ケニー":"Kenny",
                                "ケロロ軍曹":"Keroro Gunsou",
                                "魔人ブウ純粋":"Kid Buu",
                                "菊地真":"Kikuchi Makoto",
                                "コルド大王":"King Cold",
                                "絹旗最愛":"Kinuhara Saiai",
                                "キラ・ヤマト":"Kira Yamato",
                                "雪華綺晶":"Kirakishou",
                                "キュルケ":"Kirche Augusta",
                                "霧雨魔理沙":"Kirisame Marisa",
                                "如月千早":"Kisaragi Chihaya",
                                "北白河 ちゆり":"Kitashirakawa Chiyuri",
                                "木山春生":"Kiyama Harumi",
                                "クランクラン":"Klan Klein",
                                "クラン・クラン":"Klan・Klein",
                                "ニーソックス":"Kneesocks",
                                "小神あきら":"Kogami Akira",
                                "朱染心愛":"Kokoa Shuzen",
                                "こまちち":"Komachichi",
                                "古明地こいし":"Komeiji Koishi",
                                "古明地さとり":"Komeiji Satori",
                                "こなた":"Konata",
                                "こなかが":"KonataxKagami",
                                "こなつか":"KonataxTsukasa",
                                "婚后光子":"Kongou Mitsuko",
                                "固法美偉":"Konori Mii",
                                "魂魄妖夢":"Konpaku Youmu",
                                "魂魄妖忌":"Konpaku Youki",
                                "クー":"Kooh",
                                "クリリン":"Krillin",
                                "琴吹紬":"Kotobuki Tsumugi",
                                "一ノ瀬 ことみ":"Kotomi Ichinose",
                                "コトネ":"Kotone",
                                "高坂大介":"Kousaka Daisuke",
                                "高坂桐乃":"Kousaka Kirino",
                                "高坂京介":"Kousaka Kyousuke",
                                "クジャ":"Kuja",
                                "国広一":"Kunihiro Hajime",
                                "クリザ":"Kuriza",
                                "黒谷ヤマメ":"Kurodani Yamame",
                                "黒乃胡夢":"Kurono Kurumu",
                                "来栖加奈子":"Kurusu Kanako",
                                "草野":"Kusano",
                                "クーちゃん":"Kuu-chan",
                                "カイル":"Kyle",
                                "ラムダデルタ":"Lambdadelta",
                                "ラクス・クライン":"Lacus Clyne",
                                "ラハール":"Laharl",
                                "ランチ":"Launch",
                                "レイラ・プリズムリバー":"Layla Prismriver",
                                "ルルーシュ":"Lelouch",
                                "レティ・ホワイトロック":"Letty Whiterock",
                                "リリス":"Lilith",
                                "リリーホワイト":"Lilywhite",
                                "ロロ":"Lolo",
                                "ルイズ":"Louise",
                                "ロヴィーノ・ヴァルガス":"Lovino Vargas",
                                "ルーシア":"Lucia(ルーシア)",
                                "ルチア":"Lucia(ルチア)",
                                "ルシフェル":"Lucifer",
                                "ルートヴィッヒ":"Ludwig",
                                "ルフィ":"Luffy",
                                "ルナチャイルド":"Lunachild",
                                "ルナサ・プリズムリバー":"Lunasa Prismriver",
                                "リリカ・プリズムリバー":"Lyrica Prismriver",
                                "窓付き":"Madotsuki",
                                "前原圭一":"Maebara Keiichi",
                                "槇島沙織":"Makishima Saori",
                                "マモン":"Mammon",
                                "魔璃":"Mari",
                                "マエリベリー・ハーン":"Maribel Han",
                                "鞠川静香":"Marikawa Shizuka",
                                "マリオン・ファウナ":"Marion Phauna",
                                "魔理沙":"Marisa",
                                "マーク・クルーガー":"Mark Kruger",
                                "マーロン":"Marron",
                                "武天老師":"Master Roshi",
                                "鶴仙人":"Master Shen",
                                "松本乱菊":"Matsumoto Rangiku",
                                "マトリョシカ":"Matryoshka",
                                "マックス":"Max",
                                "メカフリーザ":"Mecha Frieza",
                                "メディスン・メランコリー":"Medicine Melancholy",
                                "ミーア・キャンベル":"Meer Campbell",
                                "巡音ルカ":"Megurine Luka",
                                "メルラン・プリズムリバー":"Merlin Prismriver",
                                "星井美希":"Miki Hoshii",
                                "ミックミクかがみ":"Mikkumiku Kagami",
                                "ミク":"Miku",
                                "魅魔":"Mima",
                                "村紗水蜜":"Minamitsu Murasa",
                                "秋穣子":"Aki Minoriko",
                                "魅音":"Mion",
                                "御坂妹":"Misaki Imouto",
                                "御坂美琴":"Misaki Mikoto",
                                "ミスター・ポポ":"Mister Popo",
                                "宮本麗":"Miyamoto Rei",
                                "宮永咲":"Miyanaga Saki",
                                "鷹野三四":"Miyo Takano",
                                "三四":"Miyo",
                                "みゆき":"Miyuki",
                                "水橋 パルスィ":"Mizuhashi Parsee",
                                "母ちゃん":"Mom(母ちゃん)",
                                "お母さん":"Mom(お母さん)",
                                "モノ江":"Monoe",
                                "モノ子":"Monoko",
                                "妹紅":"Mokotan",
                                "もこぱい":"Moko-pai",
                                "モンモランシー":"Montmorency",
                                "森近 霖之助":"Morichika Rinnosuke",
                                "モリガン":"Morrigan",
                                "夢月":"Mugetsu",
                                "結":"Musubi",
                                "ミスティア":"Mystia",
                                "ミスティア・ローレライ":"Mystia Lorelei",
                                "千石撫子":"Nadeshiko Sengoku",
                                "長門有希":"Nagato Yuki",
                                "古河渚":"Nagisa Furukawa",
                                "中野梓":"Nakano Azusa",
                                "ナミ":"Nami",
                                "南原ちずる":"Nanbara Chizuru",
                                "なのは":"Nanoha",
                                "ナッパ":"Nappa",
                                "ナターリヤ・アルロフスカヤ":"Natalya Arlovskaya",
                                "ナズーリン":"Nazurin",
                                "猫村いろは":"Nekomura Iroha",
                                "ねこなた":"Nekonata",
                                "ネーナ":"Nena",
                                "ニコ・ロビン":"Nico Robin",
                                "ニャル子":"Nyaruko",
                                "岡崎朋也":"Okazaki Tomoya",
                                "岡崎夢美":"Okazaki Yumemi",
                                "小野塚小町":"Onozuka Komachi",
                                "大空キク":"Oozora Kiku",
                                "オリアナ＝トムソン":"Oriana Thomson",
                                "折原臨也":"Orihara Izaya",
                                "OS娘":"OS-tan",
                                "忍野忍":"Oshino Shinobu",
                                "オヤシロ":"Oyashiro",
                                "オヤシロさま":"Oyashiro-sama(オヤシロさま)",
                                "オヤシロ様":"Oyashiro-sama(オヤシロ様)",
                                "パチュリー":"Patchouli",
                                "パチュリー・ノーレッジ":"Patchouli Knowledge",
                                "ピーチ":"Peach",
                                "ペーチャ":"Pecha",
                                "ピッコロ":"Piccolo",
                                "ピカチュウ":"Pikachu",
                                "ピピン":"Pipin",
                                "ピクシブたん":"Pixiv-tan",
                                "ポニ子":"Poniko",
                                "プリズムリバー三姉妹":"Prismriver Sisters",
                                "プーアル":"Puar",
                                "亜美誕祭":"Purnima Ami",
                                "ラディッツ":"Raditz",
                                "ライダー":"Raider",
                                "ラズベリル":"Raspberyl",
                                "レイヴン":"Raven",
                                "ラピード":"Repede",
                                "霊夢":"Reimu",
                                "レイマリ":"ReimuxMarisa",
                                "竜宮礼奈":"Reina Ryugu",
                                "鈴仙・優曇華院・イナバ":"Reisen Udongein Inaba",
                                "霊烏路空":"Reiuji Utsuho",
                                "レミリア":"Remilia",
                                "レミリア・スカーレット":"Remilia Scarlet",
                                "レミ咲":"RemiliaxSakuya",
                                "レナ":"Rena",
                                "梨花":"Rika",
                                "リタ":"Rita",
                                "律":"Ritsu",
                                "ロノウェ":"Ronove",
                                "ロゼッタ":"Rosetta",
                                "ロイ・マスタング":"Roy Mustang",
                                "ロザリンド":"Rozaline",
                                "ルーミア":"Rumia",
                                "竜宮レナ":"Ryugu Rena",
                                "西行寺幽々子":"Saigyouji Yuyuko",
                                "セーラーマーキュリー":"Sailor Mercury",
                                "坂上智代":"Sakagami Tomoyo",
                                "咲夜":"Sakuya",
                                "早苗":"Sanae",
                                "さなぱい":"Sanapai",
                                "サンディ":"Sandy",
                                "サリエル":"Sariel",
                                "サーシャ＝クロイツェフ":"Sasha Kreuzhev",
                                "佐天涙子":"Saten Ruiko",
                                "揺歌サユ":"Sayu Yurika",
                                "スキャンティ":"Scanty",
                                "セコムマサダ先生":"Seccom Masada-Sensei",
                                "セルベリア":"Selvaria",
                                "セルベリア・ブレス":"Selvaria Bles",
                                "仙童紫":"Sendo Yukari",
                                "戦場ヶ原":"Senjougahara",
                                "戦場ヶ原ひたぎ":"Senjougahara Hitagi",
                                "射命丸文":"Shameimaru Aya",
                                "上海人形":"Shanghai Doll",
                                "上海":"Shanghai",
                                "シン・アスカ":"Shin Asuka",
                                "神綺":"Shinki",
                                "真紅":"Shinku",
                                "白井黒子":"Shirai Kuroko",
                                "白雪みぞれ":"Shirayuki Mizore",
                                "秋静葉":"Shizuha Aki",
                                "シュマゴラス":"Shumagorath",
                                "シエスタ":"Siesta",
                                "シエスタ姉妹":"Siesta Sisters",
                                "シエスタ45":"Siesta [[D]]",
                                "シグナム":"Signum",
                                "孫悟飯":"Son Gohan",
                                "孫悟空":"Son Goku",
                                "園崎魅音":"Sonozaki Mion",
                                "園崎詩音":"Sonozaki Shion",
                                "蒼星石":"Souseiseki",
                                "スターサファイア":"Star Sapphire",
                                "水銀燈":"Suigintou",
                                "萃香":"Suika",
                                "翠星石":"Suiseiseki",
                                "春原芽衣":"Sunohara Mei",
                                "春原陽平":"Sunohara Youhei",
                                "サニーミルク":"Sunnymilk",
                                "魔人ブウ 悪":"Super Buu",
                                "諏訪子":"Suwako",
                                "涼宮ハルヒ":"Suzumiya Haruhi",
                                "タバサ":"Tabitha",
                                "田井中律":"Tainaka Ritsu",
                                "高城沙耶":"Takagi Saya",
                                "Takanashi Rikka":"Takanashi Rikka",
                                "高良みゆき":"Takara Miyuki",
                                "滝壺理后":"Takitsubo Rikou",
                                "タマ姉":"Tama-nee",
                                "向坂環":"Tamaki Kousaka",
                                "田村麻奈実":"Tamura Manami",
                                "多々良小傘":"Tatara Kogasa",
                                "天子":"Tenshi",
                                "比那名居天子":"Tenshi Hinanai",
                                "テレス・トルーエ":"Teres Torue",
                                "てゐ":"Tewi",
                                "因幡　てゐ":"Tewi Inaba",
                                "ティアナ・ランスター":"Tiana Lanster",
                                "天津飯":"Tienshinhan",
                                "ティエリア":"Tieria",
                                "ティファニア":"Tifania",
                                "橙条瑠妃":"Tojou Ruby",
                                "朱鷺子":"Tokiko",
                                "富竹":"Tomitake",
                                "寅丸星":"Toramaru Shou",
                                "東横桃子":"Touyoko Momoko",
                                "つかさ":"Tsukasa",
                                "月海":"Tsukiumi",
                                "月詠小萌":"Tsukuyomi Konoe",
                                "鶴屋さん":"Tsuruya",
                                "うどんげ":"Udonge",
                                "初春飾利":"Uiharu Kazari",
                                "雲山":"Unzan",
                                "ウリン":"Urin",
                                "宇佐見蓮子":"Usami Renko",
                                "ウソップ":"Usopp",
                                "ベジータ":"Vegeta",
                                "ワルギリア":"Virgilia",
                                "綿月 豊姫":"Watatsuki no Toyohime",
                                "綿月　依姫":"Watatsuki no Yorihime",
                                "ウィンリィ":"Winry",
                                "ウィンリィ・ロックベル":"Winry Rockbell",
                                "リグル・ナイトバグ":"Wriggle Nightbug",
                                "八意永琳":"Yagokoro Eirin(八意永琳)",
                                "永琳":"Yagokoro Eirin(永琳)",
                                "八雲藍":"Yakumo Ran",
                                "八雲紫":"Yakumo Yukari(八雲紫)",
                                "ゆかぱい":"Yakumo Yukari(ゆかぱい)",
                                "四季映姫・ヤマザナドゥ":"Yamaxanadu Shikieiki",
                                "ヤムチャ":"Yamcha",
                                "八坂神奈子":"Yasaka Kanako",
                                "ヨーコ":"Yoko",
                                "四楓院夜一":"Yoruichi Shihouin",
                                "紫":"Yukari",
                                "ゆぎぱい":"Yuugi Hoshiguma(ゆぎぱい)",
                                "星熊勇儀":"Yuugi Hoshiguma(星熊勇儀)",
                                "勇儀":"Yuugi(勇儀)",
                                "星熊":"Yuugi Hoshiguma(星熊)",
                                "妖夢":"Youmu",
                                "夢子":"Yumeko",
                                "幽香":"Yuuka",
                                "幽々子":"Yuyuko",
                                "ゼパル":"Zepar"},
                            "Video Games":{
                                "悪魔城ドラキュラ":"Akumajou Dracula/Castlevania",
                                "ビートマニア":"Beatmania",
                                "カプコン":"Capcom",
                                "チョコボ":"Chocobo",
                                "チュンリー":"Chun Li",
                                "クラウド":"Cloud",
                                "デイジー":"Daisy",
                                "デッドオアアライブ":"Dead Or Alive",
                                "デッドスペース":"Dead Space",
                                "ディスガイア":"Disgaea",
                                "ディシディア":"Dissidia",
                                "ディズィー":"Dizzy",
                                "ドラクエ":"Dragon Quest(ドラクエ)",
                                "ドラゴンクエスト":"Dragon Quest(ドラゴンクエスト)",
                                "ドリームクラブ":"Dream C Club(ドリームクラブ)",
                                "ドリクラ":"Dream C Club(ドリクラ)",
                                "エクスデス":"Exdeath",
                                "ファイナルファンタシー":"Final Fantasy",
                                "ファイナルファンタジー":"Final Fantasy",
                                "ファイナルファンタジー[[D]]":"Final Fantasy [[D]]",
                                "ファイアーエムブレム":"Fire Emblem",
                                "ギルガメッシュ":"Gilgamesh",
                                "ギルティギア":"Guilty Gear",
                                "逆転裁判":"Gyakuten Saiban/Ace Attorney",
                                "アイドルマスターDS":"Idolmaster DS",
                                "カービィ":"Kirby",
                                "コスモス":"KOS-MOS",
                                "レジェンドオブマナ":"Legend Of Mana",
                                "ゼルダの伝説":"Legend of Zelda",
                                "リンク":"Link",
                                "ラブプラス":"Love Plus",
                                "ルイージ":"Luigi",
                                "ルイージマンション":"Luigi's Mansion",
                                "マリオ":"Mario",
                                "メタルスラッグ":"Metal Slug",
                                "メトロイド":"Metroid",
                                "御剣怜侍":"Mitsurugi Reiji/Miles Edgeworth",
                                "モンスターハンター":"Monster Hunter(モンスターハンター)",
                                "モンハン":"Monster Hunter(モンハン)",
                                "成歩堂龍一":"Naruhodou Ryuuichi/Phoenix Wright",
                                "任天堂":"Nintendo",
                                "大神":"Okami",
                                "ペルソナ":"Persona",
                                "ペルソナ4":"Persona 4",
                                "ポケットモンスター":"Pocket Monsters",
                                "ポケモン":"Pokemon",
                                "プレセア":"Presea",
                                "ピーチ姫":"Princess Peach",
                                "プリニー":"Prinny",
                                "リース":"Riesez",
                                "ロックマン":"Rockman/Mega Man",
                                "ルーンファクトリー":"Rune Factory",
                                "ルーンファクトリーフロンティア":"Rune Factory: Frontier",
                                "サムス":"Samus",
                                "聖剣伝説":"Seiken Densetsu/Secret of Mana",
                                "サイレントヒル":"Silent Hill",
                                "スマブラ":"Smash Bros.",
                                "ソウルキャリバー":"Soul Calibur",
                                "スコール":"Squall",
                                "ストリートファイター":"Street Fighter",
                                "幻想水滸伝":"Suikoden",
                                "スーパーマリオ":"Super Mario",
                                "スターフォックス":"Star Fox",
                                "テイルズ":"Tales",
                                "テイルズオブグレイセス":"Tales Of Graces",
                                "テイルズオブレジェンディア":"Tales Of Legendia",
                                "テイルズオブシンフォニア":"Tales Of Symphonia",
                                "テイルズ オブ ジ アビス":"Tales Of The Abyss",
                                "テイルズ オブ ヴェスペリア":"Tales Of Vesperia",
                                "ティファ":"Tifa",
                                "ティファ・アディール":"Tifa Adill",
                                "ウボァ":"Uboa",
                                "ヴァルキリープロファイル":"Valkyrie Profile",
                                "ワルイージ":"Waluigi",
                                "ワリオ":"Wario",
                                "ゼノサーガ":"Xenosaga",
                                "ユーリ":"Yuri",
                                "ユーリ・ローウェル":"Yuri Lowell",
                                "ユフィ":"Yuffie",
                                "ゼルダ":"Zelda",
                                "ゼロ":"Zero",
                                "ゼロスーツサムス":"Zero Suit Samus",
                                "ムジュラの仮面":"Majora's Mask",
                                "時のオカリナ":"Ocarina of Time"},
                            "Touhou":{
                                "アリス":"Alice",
                                "アリス・マーガトロイド":"Alice Margatroid",
                                "幽アリ":"AlicexYuuka",
                                "アリぱい":"Ali-pai",
                                "橙":"Chen",
                                "チルノ":"Cirno",
                                "大妖精":"Daiyousei",
                                "フラン":"Flan",
                                "フランドール":"Flandre",
                                "フランドール・スカーレット":"Flandre Scarlet",
                                "藤原妹紅":"Fujiwara no Mokou",
                                "聖":"Hijiri",
                                "博麗霊夢":"Hakurei Reimu",
                                "稗田阿求":"Hieda no Akyu",
                                "聖白蓮":"Hijiri Byakuren",
                                "紅美鈴":"Hong Meiling",
                                "蓬莱山 輝夜":"Houraisan Kaguya",
                                "茨華仙":"Ibara Kasen",
                                "伊吹萃香":"Ibuki Suika",
                                "雲居一輪":"Ichirin Kumoi",
                                "衣玖":"Iku",
                                "十六夜咲夜":"Izayoi Sakuya",
                                "上白沢慧音":"Kamishirasawa Keine",
                                "カナ・アナベラル":"Kana Anaberal",
                                "キスメ":"Kisume",
                                "小悪魔":"Koakuma",
                                "東風谷早苗":"Kochiya Sanae",
                                "永江衣玖":"Nagae Iku"},
                            "Pokemon":{
                                "フリーザー":"Articuno",
                                "ベイリーフ":"Bayleef",
                                "カメックス":"Blastoise",
                                "バシャーモ":"Blaziken",
                                "フシギダネ":"Bulbasaur",
                                "リザードン":"Charizard",
                                "ヒトカゲ":"Charmander",
                                "リザード":"Charmeleon",
                                "チコリータ":"Chikorita",
                                "ヒコザル":"Chimchar",
                                "ワカシャモ":"Combusken",
                                "アリゲイツ":"Croconaw",
                                "イーブイ":"Eevee",
                                "エンペルト":"Empoleon",
                                "エーフィ":"Espeon",
                                "オーダイル":"Feraligatr",
                                "サーナイト":"Gardevoir",
                                "ハヤシガメ":"Grotle",
                                "グラードン":"Groudon",
                                "ジュプトル":"Grovyle",
                                "ホウオウ":"Ho-oh",
                                "ゴウカザル":"Infernape",
                                "フシギソウ":"Ivysaur",
                                "ジラーチ":"Jirachi",
                                "キルリア":"Kirlia",
                                "カイオーガ":"Kyogre",
                                "ラティアス":"Latias",
                                "ラティオス":"Latios",
                                "ルカリオ":"Lucario",
                                "ルギア":"Lugia",
                                "ヌマクロー":"Marshtomp",
                                "メガニウム":"Meganium",
                                "ミュウツー":"Mewtwo",
                                "ファイヤー":"Moltres",
                                "モウカザル":"Monferno",
                                "ミズゴロウ":"Mudkip",
                                "イワーク":"Onix",
                                "ピチュー":"Pichu",
                                "ピカチュウ":"Pikachu",
                                "ポッチャマ":"Piplup",
                                "ポッタイシ":"Prinplup",
                                "ラルトス":"Ralts",
                                "リオル":"Riolu",
                                "ジュカイン":"Sceptile",
                                "ゼニガメ":"Squirtle",
                                "ハガネール":"Steelix",
                                "ラグラージ":"Swampert",
                                "アチャモ":"Torchic",
                                "ドダイトス":"Torterra",
                                "ワニノコ":"Totodile",
                                "キモリ":"Treecko",
                                "ツタージャ":"Tsutaja",
                                "ナエトル":"Turtwig",
                                "ブラッキー":"Umbreon",
                                "アンノーン":"Unknown",
                                "フシギバナ":"Venusaur",
                                "カメール":"Wartortle",
                                "サンダー":"Zapdos"}},"Objects, Clothing, Environments":{
                                    "Clothing":{
                                        "エプロン":"Apron",
                                        "包帯":"Bandages",
                                        "絆創膏":"Bandaids",
                                        "ビキニ":"Bikini",
                                        "ビキニアーマー":"Bikini Armor",
                                        "黒タイツ":"Black Tights",
                                        "ブレザー":"Blazer",
                                        "目隠し":"Blindfold",
                                        "かぼぱん":"Bloomers(かぼぱん)",
                                        "ブルマー":"Bloomers(ブルマー)",
                                        "ブーツ":"Boots",
                                        "バニー":"Bunny",
                                        "バニースーツ":"Bunny Suit",
                                        "ボディスーツ":"Bodysuit",
                                        "ブルマ":"Bloomers",
                                        "蝶リボン":"Butterfly Ribbon",
                                        "チャイナドレス":"China Dress",
                                        "首輪":"Collar",
                                        "コルセット":"Corset",
                                        "おむつ":"Diaper",
                                        "ディルド":"Dildo",
                                        "ドロワーズ":"Drawers",
                                        "ドレス":"Dress",
                                        "着エロ":"Erotic Clothing",
                                        "エロ衣装":"Erotic Outfit",
                                        "エロ水着":"Erotic Swimsuit",
                                        "眼帯":"Eyepatch",
                                        "網タイツ":"Fishnet Stockings",
                                        "フリル":"Frills",
                                        "ガーダーベルト":"Garter Belt(ガーターベルト)",
                                        "ガーター":"Garter Belt (ガーター)",
                                        "メガネ":"Glasses(メガネ)",
                                        "眼鏡":"Glasses(眼鏡)",
                                        "めがね":"Glasses(めがね)",
                                        "Ｇストリング":"G-String",
                                        "ギター":"Guitar",
                                        "体操着":"Gym Uniform",
                                        "帽子":"Hat",
                                        "ヘアピン":"Hairpin",
                                        "ヘッドフォン":"Headphones(ヘッドフォン)",
                                        "ヘッドホン":"Headphones(ヘッドホン)",
                                        "ハイヒール":"High-Heels",
                                        "ハイレグ":"High-leg Leotard",
                                        "ホットパンツ":"Hot Pants",
                                        "あぐら":"Cross-legged Sit",
                                        "和服":"Japanese Clothes",
                                        "着ぐるみ":"Kigurumi(着ぐるみ)",
                                        "キグルミ":"Kigurumi(キグルミ)",
                                        "着物":"Kimono",
                                        "ニーソックス":"Kneesocks",
                                        "ハイソックス":"Knee-High Socks(ハイソックス)",
                                        "ニーハイソックス":"Knee-High Socks(ニーハイソックス)",
                                        "スパッツ":"Leggings",
                                        "レオタード":"Leotard",
                                        "たくしあげ":"Lifting Skirt",
                                        "ローレグ":"Lowleg Panties",
                                        "ローライズ":"Lowrise",
                                        "マイクロビキニ":"Micro Bikini",
                                        "ミニスカ":"Mini-skirt(ミニスカ)",
                                        "ミニスカート":"Mini-skirt(ミニスカート)",
                                        "楽器":"Musical Instrument",
                                        "裸エプロン":"Naked + Apron",
                                        "裸ニーソ":"Naked + Kneesocks",
                                        "ネクタイ":"Necktie",
                                        "ネグリジェ":"Negligee",
                                        "オーバーオール":"Overalls",
                                        "パジャマ":"Pajamas",
                                        "パンチラ":"Panchira(Panty Shot)",
                                        "パンツ":"Panties(パンツ)",
                                        "ぱんつ":"Panties(ぱんつ)",
                                        "体操服":"Panties(体操服)",
                                        "パンティ":"Panties(パンティ)",
                                        "パンツ下ろし":"Panties Down",
                                        "パンスト":"Pantyhose",
                                        "しまぱん":"Panty Shot",
                                        "パラソル":"Parasol",
                                        "パーカー":"Parka",
                                        "パーティードレス":"Party Dress",
                                        "ピアス":"Piercings",
                                        "パイロットスーツ":"Pilot Suit",
                                        "厚底":"Platform Shoes",
                                        "プリーツスカート":"Pleated Skirt",
                                        "プラグスーツ":"Plug Suit",
                                        "リボン":"Ribbon",
                                        "ラバースーツ":"Rubber Suit",
                                        "セーラー服":"Sailor Fuku",
                                        "サンタ":"Santa",
                                        "マフラー":"Scarf",
                                        "スクール水着":"School Swimsuit(スクール水着)",
                                        "スク水":"School Swimsuit(スク水)",
                                        "ランドセル":"Schoolbag",
                                        "セクシーランジェリー":"Sexy Lingerie",
                                        "ショートパンツ":"Shorts",
                                        "紐パン":"Side-Tie Panties",
                                        "スリングショット":"Slingshot",
                                        "スニーカー":"Sneakers",
                                        "ソックス":"Socks",
                                        "ストッキング":"Stockings",
                                        "ストッキング越しのパンツ":"Stockings Over Panties",
                                        "ペニバン":"Strap-on",
                                        "縞パン":"Striped Panties(縞パン)",
                                        "縞パンツ":"Striped Panties",
                                        "縞々":"Stripes",
                                        "水着":"Swimsuit",
                                        "Tシャツ":"T-shirt",
                                        "タバコ":"Tobacco",
                                        "ニーソ":"Kneesocks",
                                        "タイツ":"Tights",
                                        "下着":"Underwear(下着)",
                                        "制服":"Uniform",
                                        "武器娘":"Weapons",
                                        "ウェディングドレス":"Wedding Dress",
                                        "食い込み":"Wedgie",
                                        "白スク":"White Swimsuit",
                                        "全身タイツ":"Whole-body Tights",
                                        "浴衣":"Yukata"},
                                    "Animals":{
                                        "動物":"Animals",
                                        "イソギンチャク":"Anemone",
                                        "くま":"Bear",
                                        "ちょうちょ":"Butterfly(ちょうちょ)",
                                        "蝶":"Butterfly(蝶)",
                                        "猫":"Cat",
                                        "キマイラ":"Chimera(キマイラ)",
                                        "キメラ":"Chimera(キメラ)",
                                        "うし":"Cow(うし)",
                                        "牛":"Cow(牛)",
                                        "クロコダイル":"Crocodile",
                                        "犬":"Dog",
                                        "魚":"Fish",
                                        "馬":"Horse",
                                        "ライオン":"Lion",
                                        "ネズミ":"Mouse",
                                        "シャチ":"Orca",
                                        "丑":"Ox",
                                        "兎":"Rabbit(兎)",
                                        "うさぎ":"Rabbit(うさぎ)"},
                                    "R-18":{
                                        "アナルビーズ":"Anal Beads",
                                        "媚薬":"Aphrodisiac",
                                        "ボールギャグ":"Ballgag",
                                        "首輪":"Collar",
                                        "コンドーム":"Condom",
                                        "股縄":"Crotch Rope",
                                        "浣腸":"Enema",
                                        "汁":"Fluids",
                                        "猿轡":"Gag",
                                        "オナホ":"Onahole",
                                        "オナホール":"Onahole",
                                        "ピンクローター":"Pink Rotor",
                                        "ローター":"Rotor",
                                        "精液":"Semen",
                                        "機械姦":"Sex Machine",
                                        "奴隷市場":"Slave Market",
                                        "バイブ":"Vibe",
                                        "木馬":"Wooden Horse",
                                        "鼻フック":"Nose Hook"},
                                    "General Tags":{
                                        "6年生":"6th Grade",
                                        "放課後":"After School",
                                        "秋":"Autumn",
                                        "ベンチ":"Bench",
                                        "自転車":"Bicycle",
                                        "血":"Blood",
                                        "青空":"Blue Sky",
                                        "カメラ":"Camera",
                                        "桜":"Cherry Tree",
                                        "雲":"Cloud",
                                        "寒い":"Cold",
                                        "夜":"Evening(夜)",
                                        "夕方":"Evening(夕方)",
                                        "羽根":"Feather",
                                        "花火":"Fireworks",
                                        "花":"Flowers",
                                        "ゲーム":"Game",
                                        "らくがき":"Graffiti",
                                        "大きな食べ物":"Huge Food",
                                        "紫陽花":"Hydrangea",
                                        "ガラスの中":"In Glass",
                                        "浮き輪":"Innertube",
                                        "包丁":"Knife",
                                        "光":"Light",
                                        "鏡":"Mirror",
                                        "ミリタリー":"Military",
                                        "朝焼け":"Morning Glow",
                                        "音楽":"Music",
                                        "夜空":"Night Sky",
                                        "傘":"Parasol",
                                        "プリンセス":"Princess",
                                        "かぼちゃ":"Pumpkin",
                                        "のぼり棒":"Pole",
                                        "雨":"Rain",
                                        "虹":"Rainbow",
                                        "薔薇":"Rose",
                                        "海":"Sea",
                                        "空":"Sky",
                                        "煙":"Smoke",
                                        "雪":"Snow",
                                        "春":"Springtime",
                                        "星空":"Starry Sky",
                                        "街灯":"Streetlight",
                                        "夏":"Summer",
                                        "太陽":"Sun",
                                        "夕焼け":"Sunset",
                                        "剣":"Sword",
                                        "電柱":"Telephone Pole",
                                        "トイレ":"Toilet",
                                        "樹木":"Trees/Shrubs",
                                        "水中":"Underwater",
                                        "公衆便所":"Washroom",
                                        "水":"Water",
                                        "滝":"Waterfall",
                                        "冬":"Winter"},
                                    "Places":{
                                        "廃墟":"Abandoned Building",
                                        "浜辺":"Beach",
                                        "海の家":"Beach Hut",
                                        "橋":"Bridge",
                                        "バス停":"Bus Stop",
                                        "城":"Castle",
                                        "教会":"Church",
                                        "コンビニ":"Convenience Store",
                                        "廊下":"Corridor",
                                        "田舎":"Countryside",
                                        "野原":"Field",
                                        "肉壁":"Fleshy Walls",
                                        "森":"Forest",
                                        "草原":"Grasslands",
                                        "遺跡":"Historic Ruins",
                                        "温泉":"Hot Spring",
                                        "図書館":"Library",
                                        "天の川":"Milky Way",
                                        "川":"River",
                                        "道路":"Road",
                                        "屋上":"Rooftop",
                                        "学校":"School",
                                        "保健室":"School Infirmary",
                                        "神社":"Shrine",
                                        "宇宙":"Space",
                                        "階段":"Stairs",
                                        "街":"Street",
                                        "塔":"Tower",
                                        "都市":"City",
                                        "トンネル":"Tunnel",
                                        "荒野":"Wasteland",
                                        "アメリカ":"America"}},"Traits, Parts, Archetypes":{
                                            "Traits and Archetypes":{
                                                "エイリアン":"Alien",
                                                "欠損":"Amputee",
                                                "アンドロイド":"Android",
                                                "赤ちゃん":"Baby",
                                                "素足":"Bare Feet",
                                                "お姉さん":"Big Sister",
                                                "美少女":"Bishoujo",
                                                "美少年":"Bishounen",
                                                "黒髪":"Black Hair",
                                                "金髪":"Blond Hair",
                                                "碧眼":"Blue Eyes",
                                                "青髪":"Blue Hair",
                                                "頬染め":"Blushing",
                                                "男の子":"Boy(男の子)",
                                                "おとこのこ":"Boy(おとこのこ)",
                                                "少年":"Boy(少年)",
                                                "三つ編み":"Braided Hair",
                                                "洗脳":"Brainwashed",
                                                "つけてない":"Braless",
                                                "乳神様":"Breast Goddess",
                                                "茶髪":"Brown Hair",
                                                "バニーガール":"Bunny Girl",
                                                "尻神様":"Butt Goddess",
                                                "子供":"Child",
                                                "むちむち":"Chubby(むちむち)",
                                                "ぽちゃ":"Chubby(ぽちゃ)",
                                                "ドジッ娘":"Clumsy Girl",
                                                "悪堕ち":"Corrupted",
                                                "肉便器":"Cum Dumpster",
                                                "褐色":"Tan",
                                                "縦ロール":"Drill Hair",
                                                "小学生":"Elementary Schooler",
                                                "女子小学生":"Elementary School Girl",
                                                "放心":"Empty Eyes",
                                                "芸人":"Entertainer",
                                                "エロ":"Ero",
                                                "色白":"Fair-skinned",
                                                "デブ":"Fat/Chubby",
                                                "肥満":"Fat",
                                                "筋肉女":"Muscle Woman",
                                                "痴女":"Female Pervert",
                                                "貧乳":"Flat Chest",
                                                "つるぺた":"Flat and Smooth",
                                                "大平原の小さな胸":"Flat as the Plains",
                                                "そばかす":"Freckles",
                                                "ゲイ":"Gay",
                                                "性転換":"Gender Swap",
                                                "男体化":"Gender Swap(F to M)",
                                                "女体化":"Gender Swap(M to F)",
                                                "幽霊":"Ghost",
                                                "ジャイアンティス":"Gigantic",
                                                "女の子":"Girl(女の子)",
                                                "少女":"Girl(少女)",
                                                "ガールフレンズ":"Girlfriends",
                                                "ゴシック":"Gothic",
                                                "ゴスロリ":"Goth Loli",
                                                "髪":"Hair",
                                                "アホ毛":"Stickup Hair",
                                                "身長差":"Height Difference",
                                                "女戦士":"Heroine",
                                                "女子高生":"High School Girl",
                                                "ホモ":"Homo",
                                                "大女":"Huge Woman",
                                                "発情期":"In Heat",
                                                "かわいい":"Kawaii",
                                                "園児":"Kindergartener",
                                                "司書":"Librarian",
                                                "幼女":"Little Girl",
                                                "妹":"Little Sister",
                                                "ロングヘア":"Long Hair",
                                                "魔法少女":"Magical Girl",
                                                "魔法使い":"Magician",
                                                "メイド":"Maid",
                                                "熟女":"Mature Woman",
                                                "萌え":"Moe",
                                                "筋肉娘":"Muscle Girl",
                                                "裸":"Naked",
                                                "ノーブラ":"No Bra",
                                                "ヌード":"Nude",
                                                "シスター":"Nun",
                                                "ナース":"Nurse",
                                                "苗床":"Nursery",
                                                "オッドアイ":"Odd-Eye",
                                                "ロリ巨乳":"Oppai Loli",
                                                "けしからん乳":"Outrageous Breasts",
                                                "はいてない":"Pantiless",
                                                "ペド":"Pedo",
                                                "変態":"Pervert(変態)",
                                                "んたい":"Pervert(んたい)",
                                                "ピンク髪":"Pink Hair",
                                                "ムチムチ":"Plump(ムチムチ)",
                                                "ぽっちゃり":"Plump(ぽっちゃり)",
                                                "むっちり":"Plump(むっちり)",
                                                "ポニテ":"Ponytail(ポニテ)",
                                                "ポニーテール":"Ponytail(ポニーテール)",
                                                "妊婦":"Pregnant",
                                                "僧侶":"Priest",
                                                "赤目":"Red Eyes",
                                                "赤毛":"Red Hair",
                                                "ラバー":"Rubber",
                                                "半脱ぎ":"Half-Naked",
                                                "パイパン":"Shaved",
                                                "女装っ子":"Shemale",
                                                "体格差":"Short and Tall Pairing",
                                                "看板娘":"Showgirl",
                                                "銀髪":"Silver Hair",
                                                "お姉ちゃん":"Sister",
                                                "巫女":"Shrine Maiden",
                                                "学生":"Student",
                                                "長身":"Tall",
                                                "トールガール":"Tall Girl",
                                                "長身女性":"Tall Woman",
                                                "日焼け":"Tanlines",
                                                "女教師":"Teacher(女教師)",
                                                "教師":"Teacher(教師)",
                                                "先生":"Teacher(先生)",
                                                "小人":"Tiny People",
                                                "男の娘":"Trap",
                                                "ツンデレ":"Tsundere",
                                                "ツインテ":"Twin Tails",
                                                "双子":"Twins",
                                                "包茎":"Uncut",
                                                "処女":"Virgin",
                                                "ウェイトレス":"Waitress",
                                                "ヤンデレ":"Yandere",
                                                "ビッチ":"Bitch"},
                                            "Body Parts":{
                                                "腹筋":"Abdominal Muscles",
                                                "アナル":"Anal",
                                                "獣耳":"Animal Ears(獣耳)",
                                                "付け耳":"Animal Ears(付け耳)",
                                                "ケモ耳":"Animal Ears(ケモ耳)",
                                                "乳輪":"Areola",
                                                "見せてもいい乳輪":"Areola Slip",
                                                "腋":"Armpits",
                                                "腋毛":"Armpit Hair",
                                                "尻":"Ass",
                                                "美脚":"Beautiful Legs",
                                                "おなか":"Belly",
                                                "へそ":"Belly Button",
                                                "膨腹":"Belly Inflation",
                                                "巨乳輪":"Big Areolae",
                                                "巨尻":"Big Ass",
                                                "巨乳":"Big Breasts",
                                                "改造":"Body Deformation",
                                                "肉体改造":"Body Modification(肉体改造)",
                                                "人体改造":"Body Modification(人体改造}",
                                                "膨乳":"Breast Expansion",
                                                "乳":"Breasts",
                                                "おしり":"Butt",
                                                "ねこみみ":"Cat Ears(ねこみみ)",
                                                "ネコ耳":"Cat Ears(ネコ耳)",
                                                "ネコミミ":"Cat Ears(ネコミミ)",
                                                "ネコみみ":"Cat Ears(ネコみみ)",
                                                "子宮口":"Cervix",
                                                "胸":"Chest",
                                                "谷間":"Cleavage",
                                                "クリ":"Clit",
                                                "クリトリス":"Clitoris",
                                                "撫で回したいお腹":"Cute Belly",
                                                "撫で回したい尻":"Cute Butt",
                                                "Dカップ":"D Cup",
                                                "ちんこ":"Dick",
                                                "乳首チンコ":"Dick Nipples",
                                                "犬耳":"Dog Ears",
                                                "八重歯":"Double Tooth",
                                                "エルフ耳":"Elf Ears",
                                                "睫毛":"Eyelash",
                                                "足裏":"Feet",
                                                "おでこ":"Forehead",
                                                "狐耳":"Fox Ears",
                                                "手":"Hand",
                                                "爆尻":"Huge Ass",
                                                "超乳":"Huge Breasts",
                                                "巨乳首":"Big Nipples",
                                                "巨玉":"Big Balls",
                                                "巨クリ":"Big Clit",
                                                "巨根":"Big Penis",
                                                "黒乳首":"Dark Nipples",
                                                "陥没乳首":"Inverted Nipples",
                                                "爆乳":"Large Breasts",
                                                "長乳首":"Long Nipples",
                                                "複乳":"Multiple Breasts",
                                                "複根":"Multiple Penises",
                                                "胸チラ":"Munechira(Nip Slip)",
                                                "筋肉":"Muscles",
                                                "美乳":"Nice Breasts",
                                                "乳首":"Nipples(乳首)",
                                                "ニプレス":"Nipples(ニプレス)",
                                                "おっぱい":"Oppai",
                                                "卵巣":"Ovaries",
                                                "乳首ピアス":"Pierced Nipples",
                                                "妊娠":"Pregnancy",
                                                "孕み":"Impregnated",
                                                "ボテ腹":"Pregnant Belly(ボテ腹)",
                                                "腹ボテ":"Pregnant Belly(腹ボテ)",
                                                "前立腺":"Prostate",
                                                "陰毛":"Pubic Hair",
                                                "パフィーニップル":"Puffy Nipples",
                                                "まんこ":"Pussy",
                                                "あばら":"Ribs",
                                                "横乳":"Sideboob",
                                                "すじ":"Slit",
                                                "ちっぱい":"Small Boobs",
                                                "極上の乳":"Superb Breasts",
                                                "しっぽ":"Tail(しっぽ)",
                                                "尻尾":"Tail(尻尾)",
                                                "太もも":"Thigh(太もも)",
                                                "ふともも":"Thigh(ふともも)",
                                                "ツインテール":"Twintail",
                                                "下乳":"Underboob",
                                                "尿道":"Urethra",
                                                "子宮脱":"Uterine Prolapse",
                                                "子宮":"Uterus",
                                                "生理":"Period",
                                                "イカ腹":"Squid Belly"},
                                            "Creatures and Humanoids":{
                                                "天使":"Angel",
                                                "猫耳":"Cat Girl",
                                                "ケンタウロス":"Centaur",
                                                "牛娘":"Cow Girl",
                                                "クリーチャー":"Creature",
                                                "単眼":"Cyclops",
                                                "魔物":"Demon(魔物)",
                                                "悪魔":"Demon(悪魔)",
                                                "悪魔っ娘":"Demon Girl(悪魔っ娘)",
                                                "悪魔娘":"Demon Girl(悪魔娘)",
                                                "イラコン":"Dragon(イラコン)",
                                                "ドラゴン":"Dragon(ドラゴン)",
                                                "イラコンドラマガ":"Dragon Girl",
                                                "エルフ":"Elf",
                                                "妖精":"Fairy",
                                                "ゴースト":"Ghost",
                                                "巨大":"Giant",
                                                "巨大娘":"Giantess",
                                                "巨大化":"Giants",
                                                "ハーピー":"Harpy",
                                                "ラミア":"Lamia",
                                                "メカ":"Mecha",
                                                "人魚":"Mermaid",
                                                "モンスター":"Monster(モンスター)",
                                                "妖怪":"Monster(妖怪)",
                                                "モンスター娘":"Monster Girl(モンスター娘)",
                                                "人外娘":"Monster Girl(人外娘)",
                                                "人外":"Monster People",
                                                "オナホ妖精":"Onahole Fairy",
                                                "鬼":"Oni",
                                                "鬼っ娘":"Oni Girl",
                                                "オーク":"Orc",
                                                "寄生":"Parasite",
                                                "ポケモン擬人化":"Pokemon Personification",
                                                "ロボット":"Robot",
                                                "スライム":"Slime",
                                                "スライム娘":"Slime Girl",
                                                "魔女っ娘":"Sorceress",
                                                "サキュバス":"Succubus",
                                                "吸血鬼":"Vampire(吸血鬼)",
                                                "ヴァンパイア":"Vampire(ヴァンパイア)",
                                                "魔女":"Witch",
                                                "ゾンビ":"Zombie",
                                                "アルラウネ":"Alraune",
                                                "アラクネ":"Arachne",
                                                "スキュラ":"Scylla"}},"Actions, Positions, Expressions":{
                                                    "Positions":{
                                                        "まんぐり返し":"Ass up",
                                                        "バック":"Back",
                                                        "胸合わせ":"Boob Docking",
                                                        "もっこり":"Bulge",
                                                        "着替え":"Changing Clothes",
                                                        "騎乗位":"Cowgirl",
                                                        "断面図":"Cross-Section",
                                                        "ぶちアングル":"Crotch Angle",
                                                        "電気アンマ":"Denki Anma",
                                                        "後背位":"Doggy Style",
                                                        "エロ蹲踞":"Ero Squat",
                                                        "背後から胸揉み":"Grope From Behind",
                                                        "ハーレム":"Harem",
                                                        "Tバック":"Looking Back",
                                                        "だいしゅきホールド":"Love Hold",
                                                        "ローアングル":"Low Angle",
                                                        "正常位":"Missionary Position",
                                                        "四つん這い":"On All Fours",
                                                        "ハメ撮り視点":"Point of View(Guy)",
                                                        "座り":"Sitting",
                                                        "開脚":"Spread Legs(開脚)",
                                                        "股裂き":"Spread Legs(股裂き)",
                                                        "ストレッチ":"Stretching",
                                                        "舐め回したい穴":"Stretched Legs",
                                                        "貝合わせ":"Tribadism",
                                                        "立ちション":"Urinating Standing Up",
                                                        "テープくぱぁ":"Vagina Taped Open",
                                                        "ぺたん座り":"W Sit",
                                                        "前から見えるお尻":"Frontal Ass View"},
                                                    "Expressions":{
                                                        "アヘ顔":"Ahegao(Fucked Silly)",
                                                        "アヘ舌":"Ahetongue(Fucked Silly)",
                                                        "赤面":"Blushing",
                                                        "瞑目":"Closed Eyes",
                                                        "泣き顔":"Crying",
                                                        "表情":"Facial Expression",
                                                        "ひぎぃ":"Higyi",
                                                        "愛":"Love",
                                                        "ピース":"Peace",
                                                        "振り向き":"Shoulder Look",
                                                        "流し目":"Sidelong Glance",
                                                        "笑顔":"Smile",
                                                        "こっちみんな":"Staring at You",
                                                        "汗":"Sweat",
                                                        "涙":"Tears",
                                                        "平然":"Unimpressed",
                                                        "ウィンク":"Wink",
                                                        "ダブルピース":"Double Peace",
                                                        "目がハート":"Eye Hearts",
                                                        "レイプ目":"Rape Eyes"},
                                                    "Actions":{
                                                        "アクシデント":"Accident",
                                                        "事後":"After",
                                                        "アナル中出し":"Anal Creampie",
                                                        "ぽっかりアナル":"Anal Stretching",
                                                        "セルフフェラ":"Autofellatio",
                                                        "セルフパイズリ":"Autopaizuri",
                                                        "お風呂":"Bathing",
                                                        "ボコォ":"Belly Bulge",
                                                        "獣姦":"Bestiality",
                                                        "出産":"Birth",
                                                        "フェラ":"Blowjob",
                                                        "緊縛":"Bondage(緊縛)",
                                                        "ボンデージ":"Bondage(ボンデージ)",
                                                        "ポロリ":"Bouncing",
                                                        "脳姦":"Brain Rape",
                                                        "乳揉み":"Groping",
                                                        "母乳":"Breast Milk",
                                                        "乳打撃":"Breast Stroke",
                                                        "蟲姦":"Bug Rape",
                                                        "ぶっかけ":"Bukkake",
                                                        "カニバリズム":"Cannibalism",
                                                        "キャットファイト":"Catfight",
                                                        "絶頂":"Climax",
                                                        "登り棒":"Climbing Pole",
                                                        "クリ責め":"Clit Stimulation",
                                                        "着衣パイズリ":"Clothed Paizuri",
                                                        "愛臭漂う服":"Clothes Sniffing",
                                                        "咥えゴム":"Condom in Mouth",
                                                        "コスプレ":"Cosplay",
                                                        "兜合わせ":"Cock on Cock",
                                                        "コントーション":"Contortion",
                                                        "ずらし挿入":"Copulation",
                                                        "角オナ":"Corner Masturbation",
                                                        "中出し":"Creampie",
                                                        "女装少年":"Cross Dressing",
                                                        "女装":"Crossdressing",
                                                        "磔":"Crucifixion",
                                                        "汁に泡":"Cum Bubbles",
                                                        "膣内射精":"Cumming Inside",
                                                        "処女喪失":"Defloration",
                                                        "犬姦":"Dog Rape",
                                                        "涎":"Drooling",
                                                        "産卵":"Egg Laying",
                                                        "射精":"Ejaculation",
                                                        "電気あんま":"Electric Massage",
                                                        "電気責め":"Electrical Torture",
                                                        "排泄":"Excretion",
                                                        "露出":"Exposure",
                                                        "拡張":"Stretching",
                                                        "顔面騎乗":"Facesitting",
                                                        "顔射":"Facial",
                                                        "おなら":"Fart",
                                                        "フェラチオ":"Fellatio",
                                                        "手マン":"Fingering",
                                                        "足コキ":"Footjob",
                                                        "ふた×男":"Futa on Male",
                                                        "輪姦":"Gangbang",
                                                        "パンツに手":"Grabbing Panties",
                                                        "髪コキ":"Hairjob",
                                                        "手コキ":"Handjob",
                                                        "手ブラ":"Hand Bra",
                                                        "首吊り":"Hanging",
                                                        "腕押さえ輪姦":"Holding Arms Gangbang",
                                                        "聖水":"Holy Water",
                                                        "尻コキ":"Hotdogging",
                                                        "催眠":"Hypnosis",
                                                        "妹キャラ":"Imouto Chara",
                                                        "いもうと":"Imouto",
                                                        "孕ませ":"Impregnation",
                                                        "失禁":"Incontinence",
                                                        "注射":"Injection",
                                                        "性交":"Intercourse",
                                                        "キス":"Kiss",
                                                        "射乳":"Lactation",
                                                        "噴乳":"Lactating",
                                                        "自慰":"Masturbation(自慰)",
                                                        "自家発電":"Masturbation(自家発電)",
                                                        "自家発電中":"Masturbating",
                                                        "搾乳":"Milking",
                                                        "異種姦":"Monster Rape",
                                                        "臍姦":"Navel Rape",
                                                        "ニプルファック":"Nipple Fuck",
                                                        "乳首責め":"Nipple Torture",
                                                        "全裸":"Nudity",
                                                        "オナニー":"Onanism",
                                                        "アクメ":"Orgasm",
                                                        "乱交":"Orgy",
                                                        "パイズリ":"Paizuri",
                                                        "はみパン":"Panties Showing Through",
                                                        "おしっこ":"Pee",
                                                        "形くっきりペニス":"Penis Showing Through",
                                                        "うんち":"Poo",
                                                        "うんこ":"Poop",
                                                        "たくし上げ":"Pulling Clothes Up",
                                                        "押し倒し":"Pushed Down",
                                                        "レイプ":"Rape(レイプ)",
                                                        "陵辱":"Rape(陵辱)",
                                                        "拘束":"Restrained",
                                                        "逆アナル":"Reverse Anal",
                                                        "逆レイプ":"Reverse Rape",
                                                        "セルフパイ舐め":"Self Breast Licking",
                                                        "セックス":"Sex",
                                                        "シーツ掴み":"Sheet Grabbing",
                                                        "睡姦":"Sleeping Rape",
                                                        "スパンキング":"Spanking",
                                                        "くぱぁ":"Spread Pussy",
                                                        "アナルくぱぁ":"Spread Anus",
                                                        "潮吹き":"Squirting",
                                                        "汁まみれ":"Stained with Cum",
                                                        "自殺":"Suicide",
                                                        "食ザー":"Swallowing",
                                                        "拷問":"Torture(拷問)",
                                                        "調教":"Torture(調教)",
                                                        "脱衣":"Undressing",
                                                        "尿道責め":"Urethra Torture",
                                                        "放尿":"Urination",
                                                        "尿":"Urine",
                                                        "盗撮":"Voyeur",
                                                        "発情":"Sexually Excited",
                                                        "おもらし":"Wetting",
                                                        "鞭打":"Whip Strokes",
                                                        "三角木馬":"Wooden Triangle Horse",
                                                        "近親相姦":"Incest"}},"General and Other":{
                                                            "Artistry and Styles":{
                                                                "[[D]]Dカスタム少女":"3D Custom Girl",
                                                                "[[D]]コマ":"4 Koma",
                                                                "アナログ":"Analog(Hand-drawn)",
                                                                "GIFアニメ":"Animated GIF",
                                                                "アニメ":"Anime",
                                                                "アニメ塗り":"Anime Coloring",
                                                                "アート":"Art",
                                                                "キャプション芸":"Art Caption",
                                                                "逆光":"Backlit",
                                                                "黒":"Black",
                                                                "白黒":"Black and White",
                                                                "ブルー":"Blue",
                                                                "キャプション":"Caption",
                                                                "キャラクター":"Character",
                                                                "チェック":"Checkered",
                                                                "市松模様":"Checkerboard Pattern",
                                                                "チビ":"Chibi(チビ)",
                                                                "ちび":"Chibi(ちび)",
                                                                "中国":"Chinese",
                                                                "色紙":"Colored Paper",
                                                                "コミケ":"Comiket",
                                                                "コンセプトアート":"Concept Art",
                                                                "創作":"Creation",
                                                                "断面":"Cross Section",
                                                                "抱き枕":"Dakimakura",
                                                                "デフォルメ":"Deformed",
                                                                "同人":"Doujin",
                                                                "一発描き":"Drawing in one shot",
                                                                "ファンアート":"Fan Art",
                                                                "横顔":"Face profile from the side",
                                                                "表紙":"Front Cover",
                                                                "GIF動画":"GIF Image",
                                                                "ハレーション":"Halation",
                                                                "手描き":"Hand-Drawn",
                                                                "高画質":"Hi-Resolution Image",
                                                                "イメレス":"Image Response",
                                                                "和":"Japanese",
                                                                "和風":"Japanese Style",
                                                                "風景":"Landscape",
                                                                "風景画":"Landscape Painting",
                                                                "線画":"Line Drawing",
                                                                "漫画":"Manga",
                                                                "マンガ":"Manga(マンガ)",
                                                                "モノクロ":"Monochrome",
                                                                "塗ってもいいのよ":"Not Colored",
                                                                "オリジナル":"Original",
                                                                "オリキャラ":"OriChara",
                                                                "オリジナルキャラクター":"Original Character",
                                                                "単行本":"Paperback",
                                                                "パロディ":"Parody",
                                                                "ペン画":"Pen Drawing",
                                                                "擬人化":"Personification",
                                                                "絵チャ":"Picture Chat",
                                                                "ピンク":"Pink",
                                                                "ドット絵":"Pixel Art",
                                                                "ドット":"Pixels",
                                                                "似顔絵":"Portrait",
                                                                "練習":"Practice",
                                                                "宣伝":"Promo",
                                                                "ぷに":"Puni",
                                                                "リアル":"Realistic",
                                                                "リクエスト":"Request",
                                                                "リメイク":"Remake",
                                                                "ラフ":"Rough",
                                                                "ラフ画":"Rough Image",
                                                                "サンプル":"Sample",
                                                                "スキャン":"Scan",
                                                                "スカーレット":"Scarlet",
                                                                "背景":"Scenery",
                                                                "シルエット":"Silhouette",
                                                                "落書き":"Sketch(落書き)",
                                                                "ラクガキ":"Sketch(ラクガキ)",
                                                                "スケブ絵":"Sketchbook Drawing",
                                                                "テキスト":"Text",
                                                                "模写":"Tracing",
                                                                "未完成":"Unfinished",
                                                                "動画":"Video",
                                                                "壁紙":"Wallpaper",
                                                                "水彩":"Watercolor",
                                                                "なにこれかわいい":"WTF/Cute",
                                                                "なにそれこわい":"WTF/Scary"},
                                                            "Genre":{
                                                                "大人化":"Age Progression",
                                                                "幼女化":"Age Reduction(幼女化)",
                                                                "子供化":"Age Reduction(子供化)",
                                                                "幼児化":"Age Reduction(幼児化)",
                                                                "獣化":"Animal Transformation",
                                                                "ビアン":"Bian",
                                                                "膨体":"Inflation",
                                                                "肥満化":"Weight Gain",
                                                                "巨乳化":"Breast Expansion",
                                                                "ファンタジー":"Fantasy",
                                                                "ドMホイホイ":"Femdom",
                                                                "フェチ":"Fetish",
                                                                "強制変身":"Forced Transformation",
                                                                "獣人":"Furry",
                                                                "ふた":"Futa",
                                                                "フタナリ":"Futanari(フタナリ)",
                                                                "ふたなり":"Futanari(ふたなり)",
                                                                "グロ":"Guro",
                                                                "膨張":"Inflation",
                                                                "ケモノ":"Kemono",
                                                                "レズ":"Les",
                                                                "ロリ":"Loli",
                                                                "ロリコン":"Lolicon",
                                                                "ロリ化":"Lolification",
                                                                "男女":"Man & Woman",
                                                                "モンスター化":"Monster Transformation(モンスター化)",
                                                                "怪獣化":"Monster Transformation(怪獣化)",
                                                                "石化":"Petrification",
                                                                "ポケモン化":"Pokemon Transformation(ポケモン化)",
                                                                "ポケモンTF":"Pokemon Transformation(ポケモンTF)",
                                                                "入れ替わり":"Random Changes",
                                                                "スカトロ":"Scat",
                                                                "腐":"Shonen Ai",
                                                                "ショタ":"Shota",
                                                                "おねショタ":"Straight Shota",
                                                                "触手":"Tentacles",
                                                                "変身":"Transformation",
                                                                "やおい":"Yaoi",
                                                                "百合":"Yuri",
                                                                "丸呑み":"Vore",
                                                                "妊夫":"Mpreg"},
                                                            "Artists and Authors":{
                                                                "モン娘のいる日常シリーズ":"Daily Life with Monster Girl Series",
                                                                "ゴメス":"Gomez",
                                                                "犬飼。":"Kemono Inukai",
                                                                "リザードマン@マイピク募集中":"Lizardman",
                                                                "三月うなぎ":"Mitsuki Unagi",
                                                                "もりもりぎつね":"Mori-Mori Kitsune",
                                                                "上山徹郎":"Ueyama Tetsuro"},
                                                            "Events":{
                                                                "盆":"Bon Festival",
                                                                "クリスマス":"Christmas",
                                                                "例大祭":"Festival",
                                                                "ハロウィン":"Halloween",
                                                                "正月":"New Year",
                                                                "年賀状":"New Year's Greetings",
                                                                "七夕":"Star Festival",
                                                                "バレンタイン":"Valentine"},
                                                            "Pixiv/Meta/Memes":{
                                                                "ふたば":"Futaba",
                                                                "実装石":"Jissouseki",
                                                                "計画通り":"Just as planned!",
                                                                "俺の嫁":"Mai Waifu",
                                                                "にぱ～☆":"Nipah～☆",
                                                                "異議あり":"Objection!",
                                                                "pixivファンタジア":"Pixiv Fantasia",
                                                                "pixivの森":"Pixiv Forest",
                                                                "レトロゲーム":"Retro Game",
                                                                "シテヤンヨ":"Shiteyanyo",
                                                                "マタタビ":"Silvervine",
                                                                "ｳｯｰｳｯｰｳﾏｳﾏ(ﾟ∀ﾟ)":"U-U-UmaUma(ﾟ∀ﾟ)",
                                                                "ゆっくり":"Yukkuri"},
                                                            "Unsorted":{
                                                                "アリスソフト":"Alice Soft",
                                                                "アメリカン":"American",
                                                                "美しい":"Beautiful",
                                                                "ベッド":"Bed",
                                                                "ケーキ":"Cake",
                                                                "キャリアウーマン":"Career Woman",
                                                                "CDジャケット":"CD Jacket",
                                                                "カリスマ":"Charisma",
                                                                "チーズケーキ":"Cheesecake",
                                                                "チョコレートケーキ":"Chocolate Cake",
                                                                "シュークリーム":"Chou A La Creme",
                                                                "教室":"Classroom",
                                                                "コイントス":"Coin Toss",
                                                                "コミックマーケット":"Comic Market",
                                                                "カーソル":"Cursor",
                                                                "ディーゼルカー":"Diesel Train",
                                                                "恐竜":"Dinosaur",
                                                                "ドロップ":"Drop",
                                                                "フェイスペインティング":"Facepainting",
                                                                "ファッション":"Fashion",
                                                                "食べ物":"Food",
                                                                "フリースペース":"Free Space",
                                                                "ファック":"Fuck",
                                                                "東方グラマラス":"Glamorous Touhou",
                                                                "大食い":"Gluttony",
                                                                "ゲスト":"Guest",
                                                                "Hシーン":"H-Scene",
                                                                "鉈":"Hatchet",
                                                                "ヒーロー":"Hero",
                                                                "歴史":"History",
                                                                "インセプション":"Inception",
                                                                "インデックス":"Index",
                                                                "インターネット":"Internet",
                                                                "ジャスティス":"Justice",
                                                                "ノーレッジ":"Knowledge",
                                                                "ラブホ":"Love Hotel",
                                                                "機械":"Machine",
                                                                "マジシャン":"Magician",
                                                                "マスコット":"Mascot",
                                                                "ミスト":"Mist",
                                                                "怪人":"Mysterious Person",
                                                                "クロスオーバー":"Cross-over",
                                                                "オリジナルヒーロー":"Original Hero",
                                                                "パンティ&ストッキング":"Panty & Stocking",
                                                                "騒霊":"Poltergeist",
                                                                "送電線":"Power Line",
                                                                "プレシア":"Pressure",
                                                                "パンプキン":"Pumpkin",
                                                                "罰ゲーム":"Punishment Game",
                                                                "レッド":"Red",
                                                                "レッドリボン軍":"Red Ribbon Army",
                                                                "黒パン":"Rye Bread",
                                                                "霊剣":"Sacred Sword",
                                                                "サファイア":"Sapphire",
                                                                "ショッカー":"Shocker",
                                                                "ショートカット":"Shortcut",
                                                                "シャワーズ":"Showers",
                                                                "蜘蛛":"Spider",
                                                                "ネタバレ":"Spoiler",
                                                                "星":"Star",
                                                                "スウツ":"Suit",
                                                                "残暑見舞い":"Summer Greeting Card",
                                                                "スイーツ":"Sweets",
                                                                "タイムマシン":"Time Machine",
                                                                "タルト":"Tart",
                                                                "ヴァンパイアハンター":"Vampire Hunter",
                                                                "ボカロ":"Vocal",
                                                                "わんわんお":"Woof Woof",
                                                                "ホワイト":"White",
                                                                "ハラショー":"Wonderful",
                                                                "ワールズエンド・ダンスホール":"World's End Dancehall"}}},"custom":{
                                                                }};


translations.custom = getLocalObject("PTP_Custom", {});

var settings = getLocalObject("PTP_Settings_110701",
                              {
                                  translate_text_nodes: true,
                                  translate_value_nodes: true,
                                  translate_title_nodes: false,
                                  translate_page_titles: true,
                                  translate_pages: true,
                                  translate_tags: true,
                                  transliterate_katakana: false,
                                  transliterate_hiragana: false,
                                  quick_translate_enabled: true,
                                  hide_ads: true,
                                  visible_highlighting: true
                              });

var tempsettings = getSessionObject("PTP_Settings_110701",
                                    {
                                        menu_up: false,
                                        last_tab: "ptp_options_tab",
                                        last_cat: "",
                                        last_subcat: "",
                                        last_tag_action: "ptp_tags_searchbar",
                                    });


/*JSON FUNCTIONS*/
function mergeJSON(obj1, obj2){
    var newobj = {};
    for(var z in obj1)
        newobj[z] = obj1[z];
    for(var z in obj2)
        newobj[z] = obj2[z];
    return newobj;
}

function sortJSONByValue(obj){
    var newobj = {};
    var temp = [];
    for(var key in obj)
        temp.push(obj[key]);
    temp.sort();
    for(var i = 0; i < temp.length; i++)
        for(var key in obj)
            if(obj[key] == temp[i]){
                newobj[key] = temp[i];
                break;
            }
            return newobj;
}

function sortJSONByKey(obj){
    var newobj = {};
    var temp = [];
    for(var key in obj){temp.push(key);}
    temp.sort();
    for(var i = 0; i < temp.length; i++)
        for(var key in obj)
            if(key == temp[i]){
                newobj[key] = obj[key];
                delete obj[key];
                break;
            }
            return newobj;
}

function reverseJSON(obj){
    var newobj = {};
    for(var key in obj)
        newobj[obj[key]] = key;
    return newobj;    
}

function getNestedProperties(obj){
    var newobj = {};
    var current;
    for(var x in obj){
        current = obj[x];
        if(typeof current === "object"){
            var subproperties = getNestedProperties(current);
            for(var y in subproperties)
                newobj[y] = subproperties[y];
        }
        else if(obj.hasOwnProperty(x))
            newobj[x] = current;
            }
    return newobj;
}   

var compiledTranslations = {};
var compiledTransliterations = {};

if(settings.translate_tags)
    compiledTranslations = mergeJSON(getNestedProperties(translations.tag), translations.custom);
if(settings.translate_pages)
    compiledTranslations = mergeJSON(translations.page, compiledTranslations);
if(settings.transliterate_katakana)
    compiledTransliterations = mergeJSON(translations.katakana, compiledTransliterations);
if(settings.transliterate_hiragana)
    compiledTransliterations = mergeJSON(translations.hiragana, compiledTransliterations);

function translateTree(root, translationObject, transliterationObject){
    function translateNodes(nodes, to, tlo){
        function hasProperty(o){
            var ret = false;
            for(var x in o)
                if(o.hasOwnProperty(x)){
                    ret = true;
                    break;
                }
                return ret;
        }
        var node = null;
        var text, trans = "";
        var haveto = hasProperty(to);
        var havetlo = hasProperty(tlo);
        if(haveto || havetlo){
            for(var i = 0, l = nodes.snapshotLength; i < l; i++){
                node = nodes.snapshotItem(i);
                if(!(text = node.nodeValue.replace(/^\s*/, "").replace(/\s*$/, "")))
                    continue;
                if(haveto && !(trans = to[text]) && /\d+/.test(text)){
                    var tn, sn = [];
                    var numtext = text; //create copy of text to do number replacement on
                    while(tn = numtext.match(/\d+/)){
                        sn.push(tn[0]);
                        numtext = numtext.replace(/\d+/, "[[D]]");
                    }
                    if(trans = to[numtext])
                        while(sn.length)
                            trans = trans.replace(/\[\[D\]\]/, sn.shift());
                }
                if(havetlo && !trans){
                    trans = "";
                    for(var ki = 0, kl = text.length; ki < kl; ki++){
                        var kana = text.charAt(ki);
                        var tl = tlo[kana];
                        if(tl)
                            trans += tl;
                        else
                            trans += kana;
                    }
                }
                if(trans)
                    node.nodeValue = trans;
            }
        }
    }
    
    if(settings.translate_text_nodes)
        translateNodes(document.evaluate('.//text()[not(ancestor::*[@ptpel] or ancestor::script or ancestor::style) and normalize-space(.)!=""]', root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), translationObject, transliterationObject);
    if(settings.translate_value_nodes)
        translateNodes(document.evaluate('.//@value[not(ancestor::*[@ptpel] or ancestor::input[@id="suggest-input" or @class="query" or @id="form2" or @id="search_keyword" or @id="bar_search"]) and normalize-space(.)!=""]', root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), translationObject, transliterationObject);
    if(settings.translate_title_nodes)
        translateNodes(document.evaluate('.//@title[not(ancestor::*[@ptpel]) and normalize-space(.)!=""]', root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), translationObject, transliterationObject);
}

function translateDocTitle(translationObject, transliterationObject){
    var title = document.title;
    var tt = title.match(/「(.*?)」/);
    if(tt){
        var temp = document.createElement("div");
        var tr = "";
        if(/\s/.test(tt[1])){
            tt = tt[1].split(" ");
            for(var i = 0; i < tt.length; i++){
                temp.appendChild(document.createTextNode(" "));
                temp.appendChild(document.createTextNode(tt[i]));
            }
            temp.removeChild(temp.firstChild);
        }
        else
            temp.appendChild(document.createTextNode(tt[1]));
        
        translateTree(temp, translationObject, transliterationObject);
        title = title.replace(title.match(/「(.*?)」/)[1], temp.innerHTML);
    }
    document.title = title;
}

//CREATE UI ELEMENTS//
var fragment = document.createDocumentFragment();
var ptp_menu = ce("div", {"id": "ptp_menu", "style": "width: 100%; height: 160px; position:fixed; bottom: -165px; overflow: hidden; background-color: white; display: none; z-index: 9999;"});    
/*var shadow = null;
var csr = undefined;
if(ptp_menu.webkitCreateShadowRoot)
{
    shadow = ptp_menu.webkitCreateShadowRoot();
    fragment = shadow;
}
   
else if (window.WebKitShadowRoot){
    shadow = new WebKitShadowRoot(ptp_menu);
    fragment = shadow;
}*/
ptp_menu.innerHTML = ""
+"<table id='ptp_tabs' class='tv'>"
+    "<tr>"
+        "<td style='width: 19%;'><div id='ptp_options_tab' class='tv_tab'>Options</div></td>"
+        "<td style='width: 19%;'><div id='ptp_tags_tab' class='tv_tab'>Tags</div></td>"
+        "<td style='width: 19%;'><div id='ptp_custom_tab' class='tv_tab'>Custom Translations</div></td> "
+        "<td style='width: 19%;' white-space: nowrap;><div id='ptp_google_tab' class='tv_tab'>Google Translation</div></td>"
+        "<th style='width: 3%;'><div id='ptp_menu_close' class='tv_tab'>⨯</div></th></tr></table>"

+"<table id='ptp_options' style='width: 100%; height: 95%; float: left; opacity: 1;'>"
+    "<tr>"
+        "<td style='width: 25%; vertical-align: top;'>"
+            "<div class='section'>"
+                "<b class='section_head'>Translator</b><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Translate most text like links and other isolated strings.' style='cursor: help;'>Text Nodes</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Translate a few things like button and textbox text.' style='cursor: help;'>Value Nodes</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Translate mouseover popups like this one. (Slow)' style='cursor: help;'>Title Nodes</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Translate page titles for easier bookmarking.' style='cursor: help;'>Page Titles</span></span></div></td>"
+        "<td style='width: 25%; vertical-align: top;'>"
+            "<div class='section'>"
+                "<b class='section_head'>Translations</b><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Include translations for main pixiv pages.' style='cursor: help;'>Pages</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Include default and user-defined translations for tags.' style='cursor: help;'>Tags</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='If a node has no defined translation, convert any katakana in it to romaji.' style='cursor: help;'>Katakana</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='If a node has no defined translation, convert any hiragana in it to romaji.' style='cursor: help;'>Hiragana</span></span></div></td>"
+        "<td style='width: 25%; vertical-align: top;'>"
+            "<div class='section'>"
+                "<b class='section_head'>Misc/CSS Fixes</b><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Highlight text and press Alt+Z or Alt+X to quickly translate to/from English/Japanese.' style='cursor: help;'>Quick Translate</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Hide ads and bypass jump pages on external links.' style='cursor: help;'>Hide Ads</span></span><br/>"
+                "<span>"
+                    "<input type='checkbox'>"
+                    "<span title='Change highlighting to white text on blue background.' style='cursor: help;'>Visible Highlighting</span></span></div></td>"
+         "<td style='width: 25%; vertical-align: top;'>"
+             "<div class='section'>"
+                 "<b class='section_head'>Tasks</b><br/>"
+                 "<table>"
+                     "<tr>"
+                         "<td>Settings</td>"
+                         "<td><input id='ptp_save' type='button' value='Save'></td>"
+                     "<tr>"
+                         "<td>Custom</td>"
+                         "<td><input id='ptp_export' type='button' value='Export'></td></tr>"
+                       "<tr>"
+                         "<td colspan='2'><input id='ptp_import' type='file'></td></tr></table></div></td></tr></table>"

+"<table id='ptp_tags' style='height: 95%; width: 100%; opacity: 1; display: none;'>"
+    "<tr>"
+        "<td style='width: 20%; vertical-align: top;'>"
+            "<div  class='section'>"
+                "<b class='section_head'>Categories</b><br/>"
+                "<div id='ptp_tags_cats' style='height: 100%; width: 100%; white-space: nowrap; overflow: auto; overflow-x: hidden;'></div></div></td>"
+        "<td style='width: 20%; vertical-align: top;'>"
+            "<div  class='section'>"
+                "<b class='section_head'>Subcategories</b><br/>"
+                "<div id='ptp_tags_subcats' style='height: 100%; width: 100%; white-space: nowrap; overflow: auto; overflow-x: hidden;'></div></div></td>"
+        "<td style='width: 20%; vertical-align: top;'>"
+            "<div  class='section'>"
+                "<b class='section_head'>Tags</b><br/>"
+                "<div id='ptp_tags_taglist' style='height: 100%; width: 100%; white-space: nowrap; overflow: auto; overflow-x: hidden;'></div></div></td>"
+        "<td style='width: 20%; vertical-align: top;'>"
+            "<div  class='section'>"
+                "<b class='section_head'>Tag Actions</b><br/>"
+                "<div>"
+                    "<form id='ptp_tags_actions'>"
+                        "<input id='ptp_tags_searchbar' name='ptp_tag_action' value='ptp_tags_searchbar' type='radio'> Add to search bar<br/>"
+                        "<input id='ptp_tags_newtab' name='ptp_tag_action' value='ptp_tags_newtab' type='radio'> Search in new tab<br/>"
+                        "<input id='ptp_tags_pixpedia' name='ptp_tag_action' value='ptp_tags_pixpedia' type='radio'> Pixiv Encyclopedia<br/>"
+                        "<input id='ptp_tags_pixpedia_google' name='ptp_tag_action' value='ptp_tags_pixpedia_google' type='radio'> Pixiv Encyclopedia (Google)<br/></form></div></div></td></tr></table>"

+"<table id='ptp_custom' border='1' style='width: 100%; height: 100%; float: left; overflow-x: hidden; overflow-y: auto; opacity: 1; display: none;'>"
+        "<tr>"
+            "<td style='width: 10%; height: 10%; padding-bottom: 5px;'><input id='ptp_custom_add' style='width: 100%;' type='button' value='Add'></td>"
+            "<td style='width: 40%; height: 10%; padding-bottom: 5px;'><input id='ptp_custom_en' placeholder='English' style='width: 97.5%;'></td>"
+            "<td style='width: 40%; height: 10%; padding-bottom: 5px;'><input id='ptp_custom_ja' placeholder='Japanese' style='width: 97.5%;'></td></tr>"
+        "<tr>"
+            "<td style='width: 100%; height: 100%; vertical-align: top;' colspan='3'>"
+                "<div style='width: 100%; height: 95px; overflow-y: auto; overflow-x: hidden;'>"
+                    "<table id='ptp_custom_list' style='width: 100%;' border='1'></table></div></td></tr></table>"


+"<table id='ptp_google' style='width: 100%; height: 100%; table-layout: fixed; float: left; opacity: 1; display: none;'>"
+        "<tr style='width: 100%; text-align: center;'>"
+            "<td style='width: 45%; vertical-align: top;'>"
+                "<div style='width:100%; height: 117px;'>"
+                    "<div id='ptp_google_en' style='width: 100%; height: 100%; word-wrap: break-word; overflow: auto;' contenteditable='true'></div></div></td>"
+            "<td style='width: 10%; text-align: center; vertical-align: top;'>"
+                "<input id='ptp_google_en2ja' type='button' value='E → J' style='width: 100%;'><br/>"
+                "<input id='ptp_google_addcustom' type='button' value='C' style='width: 100%; position: relative; top: 23.5px;'><br/>"
+                "<input id='ptp_google_ja2en' type='button' value='E ← J' style='width: 100%; position: relative; top: 47px;'></td>"
+            "<td style='width: 45%; vertical-align: top;'>"
+                "<div style='width:100%; height: 117px;'>"
+                    "<div id='ptp_google_ja' style='width: 100%; height: 100%; word-wrap: break-word; overflow: auto;'contenteditable='true'></div></div></td>";

var ptp_menu_open = ce("div", {"class": "tv_tab", "style": "width: 3.5%; position: fixed; right: 0px; bottom: 0px; background-color:rgba(94, 158, 206, 0.5); z-index:9002;"});
ptp_menu_open.textContent = "PTP";

var ptp_auto_container = ce("div", {"style": "position: absolute; z-index: 9999999;"});
var ptp_auto = ce("table", {"style": "width: 100%; background-color: rgb(255, 255, 255); font-size: 11px; border: 1px solid rgb(183, 183, 183); overflow-x: hidden; display: none;"});
ptp_auto_container.appendChild(ptp_auto);

fragment.appendChild(ptp_menu);
fragment.appendChild(ptp_menu_open);

function _(id){return fragment.querySelector("#" + id);}
var ptp_menu_close = _("ptp_menu_close");
var ptp_options_tab = _("ptp_options_tab");
var ptp_options = _("ptp_options");
var ptp_save = _("ptp_save");
var ptp_export = _("ptp_export");
var ptp_import = _("ptp_import");

var ptp_custom_tab = _("ptp_custom_tab");
var ptp_custom = _("ptp_custom");
var ptp_custom_add = _("ptp_custom_add");
var ptp_custom_en = _("ptp_custom_en");
var ptp_custom_ja = _("ptp_custom_ja");
var ptp_custom_list = _("ptp_custom_list");

var ptp_google_tab = _("ptp_google_tab");
var ptp_google = _("ptp_google");
var ptp_google_ja2en = _("ptp_google_ja2en");
var ptp_google_en2ja = _("ptp_google_en2ja");
var ptp_google_addcustom = _("ptp_google_addcustom");
var ptp_google_ja = _("ptp_google_ja");
var ptp_google_en = _("ptp_google_en");

var ptp_tags_tab = _("ptp_tags_tab");
var ptp_tags = _("ptp_tags");
var ptp_tags_cats = _("ptp_tags_cats");
var ptp_tags_subcats = _("ptp_tags_subcats");
var ptp_tags_taglist = _("ptp_tags_taglist");
var ptp_tags_actions = _("ptp_tags_actions");

//PAGE FORMATTING//    
var ptp_css = ""
+    "a.PTPa{display: block; cursor: pointer; width: 100%; padding-left: 3px;}"
+    "a.PTPa:hover{background-color: rgb(204, 238, 255);}"
+    "td.PTPtd{padding-top: 2px; padding-bottom: 2px; padding-left: 3px; padding-right: 3px;}"
+    ".unit-rating{z-index: 0;}"

+".tv {"
+"  padding: 0px;"
+"  float: none;"
+"  width: 99.5%;"
+"  margin-top: -1px"
+"}"

+".tv_tabs {"
+"  margin-bottom: -2px;"
+"  float: left;"
+"  background-color:#d0d9d9;"
+"}"

+".tv_selected {"
+"  background-color:#ffffff !important;"
+"  border-bottom-style: none !important;"
+"}"

+".tv_tab {"
+"  white-space: nowrap;"
+"  overflow: hidden;"
+"  background-color:#efefef;"
+"  cursor:pointer;"
+"  width: 98%;"
+"  text-align: center;"
+"  vertical-align: middle;"
+"  float: left;"
+"  padding: 3px;"
+"  margin-right: 1px;"
+"  margin-bottom: -1px;"
+"  border-radius: 3px 3px 0px 0px;"
+"  border: 2px black solid;"
+"}"

+".tv_contents {"
+"  min-height: 400px;"
+"  border-radius: 0px 3px 3px 3px;"
+"  border: 1px black solid;"
+"  background-color:#efefef;"
+"}"

+".section {"
+"  vertical-align: top;"
+"  width: 85%;"
+"  height: 100px;"
+"  float: left;"
+"  display: block;"
+"  border-radius: 3px 3px 3px 3px;"
+"  border: 1px black solid;"
+"  padding: 0px 10px 15px 10px;"
+"  margin: 10px;"
+"}"

+".section_td {"
+"  float: left;"
+"  width: 730;"
+"}"

+".section_head {"
+"  padding: 3px;"
+"  display: inline;"
+"  position:relative;"
+"  top: -8px;"
+"  left: -2px;"
+"  background-color:#ffffff;"
+"}";

if(settings.hide_ads){
    ptp_css += ""
   // +    "iframe{display: none !important}"
    +    ".ads_area{display: none !important}"
    +    ".popular-introduction{display: none !important}"
    +    ".require-premium{display: none !important}"
    +    ".user-ad-container{display: none !important}"
    +    ".ad-footer{display: none !important}";
    
    document.addEventListener('DOMContentLoaded', function(){
        var extlinks = document.evaluate("//a[@target='_blank']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < extlinks.snapshotLength; i++){
            var extlink = extlinks.snapshotItem(i);
            var exthref = extlink.getAttribute("href");
            if(exthref && /jump\.php\?/i.test(exthref))        
                extlink.setAttribute("href", decodeURIComponent(exthref.replace(/^\//, "").replace(/^jump\.php\?/i, "")));
        }
    }, false);
}

if(settings.visible_highlighting){
    ptp_css += ""
    +    "*::-moz-selection{background: #0000FF !important; color: #FFFFFF !important;}"
    +    "*::selection{background: #0000FF !important; color: #FFFFFF !important;}";
}

var newstyle = ce("style", {"type": "text/css"});
newstyle.appendChild(document.createTextNode(ptp_css));

//UI FUNCTIONS//
//MENU/GENERAL//
function show(el){el.style.display = "";}
function hide(el){el.style.display = "none";}

function animateBottom(el, bottom, jump, delay, callback){
    var sbottom = parseInt(el.style.bottom);
    if(sbottom !== NaN && sbottom !== bottom){
        if(Math.abs(sbottom - bottom) <= jump){
            if(callback)
                callback();
            return;
        }
        else if(sbottom < bottom)
            el.style.bottom = (sbottom + jump) + "px";
            else if(sbottom > bottom)
                el.style.bottom = (sbottom - jump) + "px";
            }

    var nextcall = function(){animateBottom(el, bottom, jump, delay, callback);};
    if(window.requestAnimationFrame)
        window.requestAnimationFrame(nextcall);
    else if(window.mozRequestAnimationFrame)
        window.mozRequestAnimationFrame(nextcall);
    else if(window.webkitRequestAnimationFrame)
        window.webkitRequestAnimationFrame(nextcall);
    else
        setTimeout(nextcall, delay);
}

function handleTagClick(e){
    e.preventDefault();
    var jap = e.target.getAttribute("title");
    switch(tempsettings.last_tag_action){
        case "ptp_tags_searchbar":{
            if(!searchbar.value)
                searchbar.value = jap;
            else
                searchbar.value += " " + jap;
            searchbar.focus();
        } break;
        case "ptp_tags_newtab":{window.open("http://www.pixiv.net/search.php?word="  + jap + "&s_mode=s_tag");} break;
        case "ptp_tags_pixpedia":{window.open("http://dic.pixiv.net/a/"  + jap);} break;
        case "ptp_tags_pixpedia_google":{window.open("http://translate.google.com/translate?hl=en&sl=ja&tl=en&u=" + encodeURIComponent("http://dic.pixiv.net/a/" + jap));} break;
    }
}

function toggleMenu(){
    if(!tempsettings.menu_up){
        animateBottom(ptp_menu, 0, 10, 1, function(){return true});
        animateBottom(ptp_menu_open, -30, 2, 1, function(){hide(ptp_menu_open);});
        tempsettings.menu_up = true;
        show(ptp_menu);
    }
    
    else{
        animateBottom(ptp_menu, -170, 10, 1, function(){hide(ptp_menu);});
        animateBottom(ptp_menu_open, 0, 2, 1, function(){return(true)});
        tempsettings.menu_up = false;
        show(ptp_menu_open);
    }
    
    setSessionObject("PTP_Settings_110701", tempsettings);
}

function tabSwitch(target){
    var tabs = [ptp_options_tab, ptp_tags_tab, ptp_custom_tab, ptp_google_tab];
    var tables = [ptp_options, ptp_tags, ptp_custom, ptp_google];
    
    for(var i = 0; i < tabs.length; i++){
        var tab = tabs[i];
        var table = tables[i];
        if(tab == target){
            tab.setAttribute("class", "tv_tab tv_selected");
            show(table);
        }
        else{
            tab.setAttribute("class", "tv_tab");
            hide(table);
        }
    }
    tempsettings.last_tab = target.getAttribute("id");
    setSessionObject("PTP_Settings_110701", tempsettings);
}

//OPTIONS//
function saveSettings(){
    var inputs = ptp_options.getElementsByTagName("input");
    var i = 0;
    for(var setting in settings){
        if(inputs[i].getAttribute("type") == "checkbox")
            settings[setting] = inputs[i].checked;
        i++;
    };  
    setLocalObject("PTP_Settings_110701", settings);
    if(JSON.stringify(getLocalObject("PTP_Settings_110701")) === JSON.stringify(settings))
        notify("Settings updated successfully!");
    else
        notify("Failed to save settings. Please use a userscript extension that supports GM_setValue or check your browser's localStorage permissions.");
}

function exportCustom(){
var downloadLink = ce("a", {"style":"display:none;"});
downloadLink.setAttribute("download", "ptp_custom_translations.txt");
downloadLink.setAttribute("href", window.URL.createObjectURL(new Blob([JSON.stringify(translations.custom)],{type:"text/plain"}))); 
document.body.appendChild(downloadLink);
downloadLink.click();
downloadLink.parentNode.removeChild(downloadLink);
}

function importCustom(e){
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e){
        try{
            translations.custom = mergeJSON(JSON.parse(e.target.result), translations.custom);
            setLocalObject("PTP_Custom", translations.custom);
            makeCustomRows();
            notify("Translations imported successfully!");
        }
        catch(err){notify("Error importing translations: " + err.message);}
    };
    reader.readAsText(file);
}

//TAG LIST//
function listCats(){
    ptp_tags_cats.innerHTML = "";
    ptp_tags_subcats.innerHTML = "";
    ptp_tags_taglist.innerHTML = "";
    for(var category in translations.tag){
        var a = ce("a", {"class": "PTPa", "cat": category});
        a.innerHTML = category;
        a.addEventListener("click", function(e){listSubcats(e.target.getAttribute("cat"));}, false);
        ptp_tags_cats.appendChild(a);
    }
}

function listSubcats(category){
    ptp_tags_subcats.innerHTML = "";
    ptp_tags_taglist.innerHTML = "";
    var catcache = translations.tag[category];
    for(var subcategory in catcache){    
        var a = ce("a", {"class": "PTPa", "cat": category, "sub": subcategory});
        a.innerHTML = subcategory;
        a.addEventListener("click", function(e){listTags(e.target.getAttribute("cat"), e.target.getAttribute("sub"));}, false);
        ptp_tags_subcats.appendChild(a);
    }
    tempsettings.last_cat = category;
    setSessionObject("PTP_Settings_110701", tempsettings);
}

function listTags(category, subcategory){
    ptp_tags_taglist.innerHTML = "";
    var subcache = translations.tag[category][subcategory];
    for(var tag in subcache){
        var a = ce("a", {"class": "PTPa", "title": tag});
        a.innerHTML = subcache[tag];
        a.addEventListener("click", function(e){handleTagClick(e)}, false);
        ptp_tags_taglist.appendChild(a);
    }
    tempsettings.last_subcat = subcategory;
    setSessionObject("PTP_Settings_110701", tempsettings);
}

function changeAction(){
    var actions = document.getElementsByName("ptp_tag_action");
    for(var i = 0; i < actions.length; i++)
        if(actions[i].checked){
            tempsettings.last_tag_action = actions[i].value;
            setSessionObject("PTP_Settings_110701", tempsettings);
        }
        }

//CUSTOM translations//
function addCustom(eng, jap){
    translations.custom[jap] = eng;
    compiledTranslations[jap] = eng;
    setLocalObject("PTP_Custom", translations.custom);
    ptp_custom_ja.value = "";
    ptp_custom_en.value = "";
    makeCustomRows();
    var tempTrans = {};
    tempTrans[jap] = eng;
    translateTree(document.body, tempTrans, compiledTransliterations);
    if(settings.translate_page_titles)
        translateDocTitle(tempTrans, compiledTransliterations);
}

function delCustom(jap){
    var eng = translations.custom[jap];
    delete translations.custom[jap];
    delete compiledTranslations[jap];
    setLocalObject("PTP_Custom", translations.custom);    
    makeCustomRows();
    var tempTrans = {};
    tempTrans[eng] = jap;
    translateTree(document.body, tempTrans, compiledTransliterations);
}

function integrateCustom(){
    var choosePath = function(o, path){
        var msg = "";
        var choices = [];
        var choice = null;
        for(var x in o)
            if(typeof o[x] === "object"){
                msg += choices.length + " : " + x + "\n";
                choices.push(x);
            }
            if(choices.length > 0)
                choice = choices[parseInt(prompt(msg, ""))];
        return (choice !== null && choices.length > 0) ? choosePath(o[choice], (function(){path.push(choice); return path;}())) : path;
    };
    
    var path = [];
    var target = null;
    var temp = null;
    for(var jap in translations.custom){
        document.body.innerHTML = translations.custom[jap] + " / " + jap;
        target = translations;
        path = choosePath(translations, []);
        for(var i = 0; i < path.length; i++){
            temp = target[path[i]];
            if(temp)
                target = temp;
        }
        if(confirm("Add " + translations.custom[jap] + " / " + jap + " to\n\n" + path)){
            target[jap] = translations.custom[jap];
            target = sortJSONByValue(target);
        }
    }
    translations.custom = {};
    document.body.innerHTML = "var translations = " + JSON.stringify(translations).replace(/((",)|(:{)|("},))/gi, "$1<br\/>") + ";";
}
//window.addEventListener("DOMContentLoaded", function(){integrateCustom();}, false);

function makeCustomRows(){
    while(ptp_custom_list.firstChild)
        ptp_custom_list.removeChild(ptp_custom_list.firstChild);
    
    translations.custom = sortJSONByValue(translations.custom);
    
    for(var jap in translations.custom){
        var ncr = ce("tr");
        var ncd = ce("td", {"style": "width: 10%"});
        var ncdb = ce("input", {"type": "button", "value": "Delete", "style": "width: 100%", "jap": jap});
        ncdb.addEventListener("click", function(e){delCustom(e.target.getAttribute("jap"));}, false);
        ncd.appendChild(ncdb);
        ncr.appendChild(ncd);
        
        var nce = ce("td", {"style": "width: 40%", "onmouseover": "this.style.background='rgb(204, 238, 255)';", "onmouseout": "this.style.background='';"});
        var nca = ce("a", {"class": "PTPa", "title": jap, "href": "http://www.pixiv.net/tags.php?tag=" + jap});
        nca.appendChild(document.createTextNode(translations.custom[jap]));
        nca.addEventListener("click", function(e){handleTagClick(e);}, false);
        nce.appendChild(nca);
        ncr.appendChild(nce);
        
        var ncj = ce("td", {"style": "width: 40%"});
        ncj.appendChild(document.createTextNode(jap));
        ncr.appendChild(ncj);
        
        ptp_custom_list.appendChild(ncr);
    }
}

window.addEventListener("storage", function(e){
    if(e.key === "PTP_Custom"){
        translations.custom = getLocalObject("PTP_Custom", translations.custom);
        if(document.getElementById("ptp_custom"))
            makeCustomRows();
        translateTree(document.body, translations.custom, compiledTransliterations);
        if(settings.translate_page_titles)
            translateDocTitle(translations.custom, compiledTransliterations);
    }
}, false);

//GOOGLE TRANSLATE//
function requestTranslation(input, from, to, el){
    GM_xmlhttpRequest({
        method: "post",
        url: "http://translate.google.com/translate_a/t",
        data: "client=p&text=" + encodeURIComponent(input) + "&sl=" + from + "&tl=" + to,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        onload: function(response){
            var data = JSON.parse(response.responseText) || {sentences: []};
            var sentence = null;
            el.innerHTML = "";
            for(var i = 0; i < data.sentences.length; i++){
                sentence = ce("a", {title: data.sentences[i].orig + (data.sentences[i].src_translit ? "\n\n" + data.sentences[i].src_translit : data.sentences[i].translit ? "\n\n" + data.sentences[i].translit : "")});
                sentence.textContent = data.sentences[i].trans;
                el.appendChild(sentence);
            }
        }
    });
}

function quickTrans(e){
    if(e.altKey && (e.keyCode == 90 || e.keyCode == 88)){
        var text = window.getSelection().toString();
        if(text){
            if(!tempsettings.menu_up)
                toggleMenu();
            tabSwitch(ptp_google_tab);
            if(e.keyCode == 90){
                ptp_google_ja.innerHTML = text;
                ptp_google_ja2en.click();
            }
            else if(e.keyCode == 88){
                ptp_google_en.innerHTML = text;
                ptp_google_en2ja.click();
            }
                }
    }
}

function autoComplete()
{
    var query = searchbar.value.replace(/[^a-zA-Z 0-9 \- \+ \. \! \? \" \']+/gi, "").replace(/^\s*/gi, "");
    
    if(query){
        var tagquery = new RegExp("^" + query, "i");
        var query = new RegExp(query, "i");
        var tags = translations.tag;
        for(var category in tags){
            var np = ce("p", {"style": "font-size: 11px; font-weight: bold; text-align: center; cursor: default;"});
            np.appendChild(document.createTextNode(category));
            ptp_auto.appendChild(np);
            var catcache = tags[category];
            for(var subcategory in catcache){
                var subcache = catcache[subcategory];
                for(var jap in subcache){
                    if(tagquery.test(subcache[jap])){
                        var nsa = ce("a", {"class": "PTPa", "title": jap, "href": "http://www.pixiv.net/tags.php?tag=" + jap});
                        nsa.addEventListener("click", function(e){searchbar.value = searchbar.value.replace(query, ""); handleTagClick(e);}, false);
                        nsa.appendChild(document.createTextNode(subcache[jap]));
                        ptp_auto.appendChild(nsa);
                    }
                }
            }
        }    
        var cnp = ce("p", {"style": "font-size: 11px; font-weight: bold; text-align: center; cursor: default;"});
        cnp.appendChild(document.createTextNode("Custom"));
        ptp_auto.appendChild(cnp);
        
        for(var cjap in translations.custom){
            if(tagquery.test(translations.custom[cjap])){
                var cnsa = ce("a", {"class": "PTPa", "title": cjap, "href": "http://www.pixiv.net/tags.php?tag=" + cjap});
                cnsa.addEventListener("click", function(e){searchbar.value = searchbar.value.replace(query, ""); handleTagClick(e);}, false);
                cnsa.appendChild(document.createTextNode(translations.custom[cjap]));
                ptp_auto.appendChild(cnsa);
            }
        }    
        for(var i = 0; i < 6; i++){
            var headers = ptp_auto.getElementsByTagName("p");
            for(var j = 0; j < headers.length; j++){
                if(headers[j].nextSibling == headers[j + 1])
                    ptp_auto.removeChild(headers[j]);
            }
        }
    }
}

function onExists(getTargetFunc, callbackFunc){
    var mo = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new mo(function(mutations){
        if(getTargetFunc()){
            observer.disconnect();
            callbackFunc();
        }
    });
    observer.observe(document, {subtree: true, childList: true, attributes: true});
}

onExists(function(){return document.head;}, function(){
    document.head.appendChild(newstyle);
});

onExists(function(){return document.title;}, function(){
    if(settings.translate_page_titles)
        translateDocTitle(compiledTranslations, compiledTransliterations);
});


document.addEventListener("DOMContentLoaded", function(){
    translateTree(document.body, compiledTranslations, compiledTransliterations);
    searchbar = document.getElementById("suggest-input") || //pixiv.net
        (function(){var x = null;if(x = document.getElementsByClassName("query"))return x[0];}()) || //dic.pixiv.net
            document.getElementById("form2") || //nijie.info
            document.getElementById("search_keyword") || //tinami.com
            document.getElementById("bar_search") || // seiga.nicovideo.jp
            ce("input");
    if(searchbar.parentNode){
        function findPos(obj){    
            var curleft = 0, curtop = 0;
            if(obj.offsetParent){
                curleft = obj.offsetLeft;
                curtop = obj.offsetTop;
                while (obj = obj.offsetParent){
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                }
            }
            return [curleft,curtop];
        }
        var pos = findPos(searchbar);
        ptp_auto_container.style.left = (pos[0] - ptp_auto_container.clientWidth) + "px";
        ptp_auto_container.style.top = (pos[1] - ptp_auto_container.clientHeight + searchbar.clientHeight) + "px";
        ptp_auto_container.style.width = (searchbar.clientWidth) + "px";
        document.body.appendChild(ptp_auto_container);
        searchbar.addEventListener("keyup", function(){if(searchbar.value){ptp_auto.innerHTML = ""; autoComplete(); show(ptp_auto);} else hide(ptp_auto);}, false);
        searchbar.addEventListener("blur", function(){document.body.addEventListener("click", function(){hide(ptp_auto); document.body.removeEventListener("click", arguments.callee, false);}, false);}, false);
        searchbar.addEventListener("focus", function(){show(ptp_auto);}, false);
    }
    ptp_menu_open.addEventListener("click", function(){toggleMenu();}, false);
    ptp_menu_close.addEventListener("click", function(){toggleMenu();}, false);
    for(var i = 0, ptp_tabs = _("ptp_tabs").getElementsByTagName("td"); i < ptp_tabs.length; i++){ptp_tabs[i].addEventListener("click", function(e){tabSwitch(e.target)}, false);}
    ptp_save.addEventListener("click", function(){saveSettings();}, false);
    ptp_export.addEventListener("click", function(){exportCustom();}, false);
    ptp_import.addEventListener("change", function(e){importCustom(e);}, false);
    ptp_tags_actions.addEventListener("click", function(){changeAction();}, false);
    ptp_custom_add.addEventListener("click", function(){addCustom(ptp_custom_en.value, ptp_custom_ja.value);}, false);
    ptp_google_ja2en.addEventListener("click", function(){requestTranslation(ptp_google_ja.textContent, "ja", "en", ptp_google_en);}, false);
    ptp_google_en2ja.addEventListener("click", function(){requestTranslation(ptp_google_en.textContent, "en", "ja", ptp_google_ja);}, false);
    ptp_google_addcustom.addEventListener("click", function(){addCustom(ptp_google_en.textContent, ptp_google_ja.textContent); tabSwitch(ptp_custom_tab);}, false);
    if(settings.quick_translate_enabled){document.addEventListener("keydown", function(e){quickTrans(e);}, false);}
    
    //RESTORE MENU STATE// 
    tabSwitch(_(tempsettings.last_tab));
    var inputs = ptp_options.getElementsByTagName("input");
    
    var i = 0;
    for(var setting in settings){
        if(inputs[i].getAttribute("type") == "checkbox")
            inputs[i].checked = settings[setting];
        i++;
    }
    makeCustomRows();
    listCats();
    if(tempsettings.last_cat){
        listSubcats(tempsettings.last_cat);
        if(translations.tag[tempsettings.last_cat][tempsettings.last_subcat])
            listTags(tempsettings.last_cat, tempsettings.last_subcat);
    }
    
    _(tempsettings.last_tag_action).setAttribute("checked", "true");
    
    document.body.appendChild(fragment);
    
    if(tempsettings.menu_up){
        tempsettings.menu_up = false;
        toggleMenu();
    }

    var mo = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new mo(function(mutations){
        observer.disconnect();
        mutations.forEach(function(mutation){
            if(mutation.addedNodes)
                for(var i = 0; i < mutation.addedNodes.length; i++)
                    translateTree(mutation.addedNodes[i], compiledTranslations, compiledTransliterations);
        });
        observer.observe(document.body, {subtree: true, childList: true});
    });
    observer.observe(document.body, {subtree: true, childList: true});
}, false);