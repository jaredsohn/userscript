// ==UserScript==
// @name        Dengeki Poll Translation
// @namespace   AnimeSuki
// @description Translates Japanese Dengeki Poll into English
// @include     http*://toaru-summer.dengeki.com/vote/*
// @grant       none
// @version     1
// ==/UserScript==


///////////////////////////////////////////////////////
// Replace Images
var images = document.getElementsByTagName ("img");
var inputs = document.getElementsByTagName('input');
var all = new Array(images.length + inputs.length);

var index = 0;
for (i = 0; i < images.length; i++)
    all[index++] = images[i];
for (i = 0; i < inputs.length; i++)
    all[index++] = inputs[i];
    
var x=0;
while(x<all.length)
{
  switch(all[x].src)
  {
    case "http://toaru-summer.dengeki.com/vote/images/touhyou_txt01.png":
      all[x].src = "http://i.imgur.com/YmF02Jl.png";
      all[x].alt = "There are now in total";
      break;
    case "http://toaru-summer.dengeki.com/vote/images/touhyou_txt02.png":
      all[x].src = "http://i.imgur.com/yZA61Ih.png";
      all[x].alt = "votes.";
      break;
    case "https://toaru-summer.dengeki.com/vote/images/touhyou_txt01.png":
      all[x].src = "http://i.imgur.com/YmF02Jl.png";
      all[x].alt = "There are now in total";
      break;
    case "https://toaru-summer.dengeki.com/vote/images/touhyou_txt02.png":
      all[x].src = "http://i.imgur.com/yZA61Ih.png";
      all[x].alt = "votes.";
      break;
    case "http://toaru-summer.dengeki.com/vote/images/btn_vote_off.png":
      all[x].src = "http://i.imgur.com/pDLFmZO.png";
      all[x].alt = "Vote";
      break; 
    case "https://toaru-summer.dengeki.com/vote/images/btn_vote_off.png":
      all[x].src = "http://i.imgur.com/pDLFmZO.png";
      all[x].alt = "Vote";
      break;
    case "http://toaru-summer.dengeki.com/vote/images/btn_cancel_off.png":
      all[x].src = "http://i.imgur.com/V5dJKZ8.png";
      all[x].alt = "Cancel";
      break;                
    case "https://toaru-summer.dengeki.com/vote/images/btn_cancel_off.png":
      all[x].src = "http://i.imgur.com/V5dJKZ8.png";
      all[x].alt = "Cancel";
      break;   
    case "http://toaru-summer.dengeki.com/vote/images/btn_top_off.png":
      all[x].src = "http://i.imgur.com/Pr1mcDl.png";
      all[x].alt = "Back to Top";
      break; 
    case "http://toaru-summer.dengeki.com/vote/images/btn_top_on.png":
      all[x].src = "http://i.imgur.com/Pr1mcDl.png";
      all[x].alt = "Back to Top";
      break;
    case "https://toaru-summer.dengeki.com/vote/images/btn_top_off.png":
      all[x].src = "http://i.imgur.com/Pr1mcDl.png";
      all[x].alt = "Back to Top";
      break; 
    case "https://toaru-summer.dengeki.com/vote/images/btn_top_on.png":
      all[x].src = "http://i.imgur.com/Pr1mcDl.png";
      all[x].alt = "Back to Top";
      break;                        
    default:
      break;
  }
  x=x+1;
}

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
//
// Intro page
//-----------------------------------------------------
"投票済みです" : "You have already voted.",
//"注意事項" : "Notes",
"投票の際にはメールアドレスをご登録ください。" : "Please register your e-mail address during voting.",
"投票はお1人1日1回となります。" : "You can vote only once per day.",
"投票期間は、10月10日12時（正午）までとなります。" : "Voting period is up to October 10th, 12:00 (noon).",
"1万票、2万票、5万票突破で公開されるコンテンツは、突破直後ではなく、しばらく経ってから公開されます。" : "After exceeding 10k, 20k, 50k votes, new content will be revealed.",
"10万3000票突破で公開される、はいむらきよたか氏の描き下ろしメッセージカードは、11月下旬公開予定です。" : "Once 103k votes are reached, Message Cards drawn by Haimura will be released in late November.",
//
// Characters
//-----------------------------------------------------

//--------------------------A--------------------------
"アーク＝ダニエルス" : "Arc Daniels",
"最大主教(アークビショップ)" : "Archbishop (Laura Stuart)",  
"相園美央(あいぞのみお)" : "Aizono Mio",  
"藍花悦(あいはなえつ)" : "Aihana Etsu",  
"アウレオルス＝イザード" : "Aureolus Izzard",  
"青髪ピアス" : "Aogami Pierce",  
"アガター" : "Agata",  
"一方通行(アクセラレータ)" : "Accelerator",  
"アケミ" : "Akemi",  
"アズミ" : "Azumi",  
"逢辰千余(あたつちよ)" : "Atatsu Chiyo",  
"アックア" : "Acqua of the Back (William Orwell)",  
"アニェーゼ＝サンクティス" : "Agnese Sanctis",  
"天井亜雄(あまいあお)" : "Amai Ao",  
"網目(あみめ)" : "Amime",  
"アリア" : "Aria",  
"アレイスター＝クロウリー" : "Aleister Crowley",  
"泡浮万彬(あわつきまあや)" : "Awatsuki Maaya", 
"アンジェレネ" : "Angelene",
  
//--------------------------I--------------------------
"イーコ" : "Íko",
"誘波(いざなみ)" : "Izanami",  
"諫早(いさはや)" : "Isahaya",  
"イシガキミホ" : "Ishigaki Miho",  
"一澤暁子(いちざわあきこ)" : "Ichizawa Akiko",  
"五和(いつわ)" : "Itsuwa",  
"イネス" : "Ines",  
"イワン" : "Ivan",  
"インデックス" : "Index",
  
//--------------------------U--------------------------   
"ヴァルキリー" : "Valkyrie (Walküre)",  
"ヴィース＝ワインレッド" : "Wies Winered",  
"初春飾利(ういはるかざり)" : "Uiharu Kazari",  
"ウィリアム＝オルウェル" : "William Orwell (Acqua of the Back)",  
"ヴィリアン" : "Villian",  
"ウートガルザロキ" : "Útgarða-Loki",  
"ウェイスランド＝ストライニコフ" : "Weissland Strainikov",  
"ヴェーラ" : "Vera",  
"ウェンゴ" : "Wengo",  
"ヴェント" : "Vento of the Front",  
"ヴォジャノーイ" : "Vodyanoy",  
"ウサミミ" : "Usamimi",  
"牛深(うしぶか)" : "Ushibuka",  
"薄絹休味(うすきぬやすみ)" : "Usukinu Yasumi",  
"海原光貴(うなばらみつき)" : "Unabara Mitsuki",  
"浦上(うらがみ)" : "Uragami",

//--------------------------E--------------------------  
"エイワス" : "Aiwass",  
"エカテリーナ" : "Ekaterina",  
"エーカー＝ルゴーニ" : "Eiker Lugoni",  
"エカリエーリャ＝A＝プロンスカヤ" : "Ekalielya A. Pronskaya",  
"枝先絆理(えださきばんり)" : "Edasaki Banri",  
"エツァリ" : "Etzali",  
"エニーリャ＝G＝アルゴヌスカヤ" : "Enirya G. Algonskaya",  
"エーラソーン" : "Ellasone",  
"エリザード" : "Elizard",  
"エリザリーナ" : "Elizalina",  
//"エリス" : "Ellis Warrior", 
 
//--------------------------O--------------------------   
"近江手裏(おうみしゅり)" : "Oumi Shuri",   
"オーソン" : "Orson",   
"大野雷禅(おおのらいぜん)" : "Ono Raizen",   
"オーレイ＝ブルーシェイク" : "Olay Blueshake",   
"丘原燎多(おかはらりょうた)" : "Okahara Ryouta",   
"オッレルス" : "Ollerus",   
"オティヌス" : "Othinus",   
"親船素甘(おやふねすあま)" : "Oyafune Suama",   
"親船最中(おやふねもなか)" : "Oyafune Monaka",   
"オリアナ＝トムソン" : "Oriana Thomson",   
"オリーブ＝ホリデイ" : "Olive Holiday",   
"オルソラ＝アクィナス" : "Orsola Aquinas",   
"オーレンツ＝トライス" : "Orlentz Trice",  
   
//--------------------------KA-------------------------     
"介旅初矢(かいたびはつや)" : "Kaitabi Hatsuya",   
"貝積継敏(かいづみつぐとし)" : "Kaizumi Tsugutoshi",  
"カエル顔の医者" : " Frogface Doctor (Heaven Canceller)",  
"垣根帝督(かきねていとく)" : "Kakine Teitoku",  
"風斬氷華(かざきりひょうか)" : "Kazakiri Hyouka",  
"カテリナ" : "Caterina",  
"鏑木由美(かぶらぎゆみ)" : "Kaburagi Umi",  
"上条詩菜(かみじょうしいな)" : "Kamijou Shiina",  
"上条当麻(かみじょうとうま)" : "Kamijou Touma",  
"上条刀夜(かみじょうとうや)" : "Kamijou Touya",  
"亀山琉太(かめやまりゅうた)" : "Kameyama Ryuuta",  
"神裂火織(かんざきかおり)" : "Kanzaki Kaori", 

//--------------------------KI------------------------- 
"絹旗最愛(きぬはたさいあい)" : "Kinuhata Saiai",   
"木原数多(きはらあまた)" : "Kihara Amata",     
"木原円周(きはらえんしゅう)" : "Kihara Enshuu",     
"木原加群(きはらかぐん)" : "Kihara Kagun",     
"木原幻生(きはらげんせい)" : "Kihara Gensei",     
"木原那由他(きはらなゆた)" : "Kihara Nayuta",     
"木原病理(きはらびょうり)" : "Kihara Byouri",     
"木原唯一(きはらゆいいつ)" : "Kihara Yuiitsu",     
"木原乱数(きはららんすう)" : "Kihara Ransuu",     
"キャーリサ" : "Carissa",     
"木山春生(きやまはるみ)" : "Kiyama Harumi",     
"切斑芽美（きりふめぐみ)" : "Kirifu Megumi",    

//--------------------------KU-------------------------   
"釧路帷子(くしろかたびら)" : "Kushiro Katabira",   
"雲川芹亜(くもかわせりあ)" : "Kumokawa Seria",  
"雲川鞠亜(くもかわまりあ)" : "Kumokawa Maria",  
"工山規範(くやまきはん)" : "Kuyama Kihan",  
"グリッキン" : "Glickin",  
"『グループ』の連絡係" : "The person who gives Group missions",  
"胡桃(くるみ)" : "Kurumi",  
"郭(くるわ)" : "Kuruwa",  
"黒妻綿流(くろづまわたる)" : "Kurozuma Wataru",  
"黒夜海鳥(くろよるうみどり)" : "Kuroyoru Umidori", 

//--------------------------KE-------------------------   
"傾国の女" : "Femme Fatale",  
"ケインズ" : "Caines",  
"ゲコ太" : "Gekota",  

//--------------------------KO------------------------- 
"鴻野江遥希(こうのえはるき)" : "Kounoe Haruki",
"香焼(こうやぎ)" : "Kouyagi",  
"ゴールデンレトリバー（木原脳幹)" : "Golden Retriever - Kihara Noukan",  
"ゴーレム＝エリス" : "Golem Ellis",  
"固法美偉(このりみい)" : "Konori Mii",  
"駒場利徳(こまばりとく)" : "Komaba Ritoku",  
"婚后光子(こんごうみつこ)" : "Kongou Mitsuko", 

//--------------------------SA------------------------- 
"サーシャ＝クロイツェフ" : "Sasha Kreutzev",   
"災誤(さいご)" : "Saigo",  
"才郷良太(さいごうりょうた)" : "Saigou Ryouta",  
"西東颯太(さいとうそうた)" : "Saitou Souta",  
"坂島道端(さかしまみちばた)" : "Sakashima Michibata",  
"佐天涙子(さてんるいこ)" : "Saten Ruiko",  
"サフリー＝オープンデイズ" : "Saflee Opendays",  
"査楽(さらく)" : "Saraku",  
"サローニャ＝A＝イリヴィカ" : "Saronia A. Irivika",  
"山岳揚子(さんがくようこ)" : "Sangaku Youko", 

//--------------------------SHI------------------------ 
"ジーンズ店主" : "Jeans Shop Owner",   
"ジェーン＝エルブス" : "Jane Elves",  
"ジェニー" : "Jenny",  
"シェリー＝クロムウェル" : "Sherry Cromwell",  
"シギン" : "Sigyn",  
"自動人形：男" : "Male Automaton",  
"自動人形：女" : "Female Automaton",  
"シャットアウラ＝セクウェンツィア" : "Shutaura Sequenzia",  
"重福省帆(じゅうふくみほ)" : "Jufuku Miho",  
"城南朝来(じょうなんあさこ)" : "Jounan Asako",  
"ジョージ＝キングダム" : "George Kingdom",  
"食蜂操祈(しょくほうみさき)" : "Shokuhou Misaki",  
"ショチトル" : "Xochitl",  
"白井黒子(しらいくろこ)" : "Shirai Kuroko",  
"シルバークロース＝アルファ" : "Silvercross Alpha",  
"シルビア" : "Silvia",  
"白いカブトムシ" : "White Beetle",
 
//--------------------------SU------------------------- 
"杉谷(すぎたに)" : "Sugitani",  
"杉山枝雄(すぎやまえだお)" : "Sugiyama Edao",  
"ステイル＝マグヌス" : "Stiyl Magnus",  
"ステファニー＝ゴージャスパレス" : "Stephanie Gorgeouspalace",  
"砂皿緻密(すなざらちみつ)" : "Sunazara Chimitsu",  
"スフィンクス" : "Sphynx",  
"スマートヴェリー" : "Smartvery",  
"李(すもも)" : "Sumomo",  
"スラッパール" : "Slappar",  
 
//--------------------------SE------------------------- 
"セアチェル" : "Seachel",  
"セイリエ＝フラットリー" : "Ceillier Flatley",  
"セヴチェ" : "Sevche",  
"セートルア" : "Setrua",  

//--------------------------SO------------------------- 
"削板軍覇(そぎいたぐんは)" : "Sogiita Gunha",  

//--------------------------TA------------------------- 
"大圄(だいご)" : "Daigo",  
"滝壺理后(たきつぼりこう)" : "Takitsubo Rikou",  
"竜神乙姫(たつがみおとひめ)" : "Tatsugami Otohime",  
"建宮斎字(たてみやさいじ)" : "Tatemiya Saiji", 

//--------------------------CHI------------------------
"チャールズ＝コンダー" : "Charles Conder",

//--------------------------TSU------------------------
"ツアーガイドの少女" : "Miss Tour Guide",  
"月詠小萌(つくよみこもえ)" : "Tsukuyomi Komoe",  
"対馬(つしま)" : "Tsushima",  
"土御門舞夏(つちみかどまいか)" : "Tsuchimikado Maika",  
"土御門元春(つちみかどもとはる)" : "Tsuchimikado Motoharu", 
 
//--------------------------TE-------------------------
"ディグルヴ" : "Digurv",  
"ディダロス＝セクウェンツィア" : "Daedalus Sequenzia",  
"テオドシア＝エレクトラ" : "Theodosia Electra",  
"テクパトル" : "Tecpatl",  
"手塩恵未(てしおめぐみ)" : "Teshio Megumi",  
"鉄装綴里(てっそうつづり)" : "Tessou Tsuzuri",  
"鉄網(てつもう)" : "Tetsumou",  
"テッラ" : "Terra of the Left",  
"デニス" : "Dennis",  
"テルノア" : "Terunoa",  
"テレスティーナ＝木原＝ライフライン" : "Therestina Kihara Lifeline", 
 
//--------------------------TO-------------------------  
"トール" : "Thor",  
"トチトリ" : "Tochtli",  
"等々力(とどろき)" : "Todoroki",  
"トマス＝プラチナバーグ" : "Thomas Platinaburg",  
"ドリー" : "Dolly",
"ドレスの少女" : "Girl in dress", 

//--------------------------NA-------------------------
"騎士団長(ナイトリーダー)" : "Knight Leader",  
"ナンシー" : "Nancy",  

//--------------------------NI-------------------------
"ニコライ＝トルストイ" : "Nikolai Tolstoy",  

//--------------------------NU-------------------------
"布束砥信(ぬのたばしのぶ)" : "Nunotaba Shinobu",  

//--------------------------NO-------------------------
"野母崎(のもざき)" : "Nomozaki",  
"ノリコ" : "Noriko",    

//--------------------------HA-------------------------
"ハーザック＝ローラス" : "Harzak Lolas",  
//"バードウェイ" : "Birdway (Leivinia Birdway)",  
"博士" : "Professor",  
"白桃(はくとう)" : "Hakutou",  
"服部半蔵(はっとりはんぞう)" : "Hattori Hanzou",  
"パトリシア＝バードウェイ" : "Patricia Birdway",  
"馬場芳郎(ばばよしお)" : "Baba Yoshio",  
"浜面仕上(はまづらしあげ)" : "Hamazura Shiage",  
"原谷矢文(はらたにやぶみ)" : "Haratani Yabumi",  
"春上衿衣(はるうええりい)" : "Haruue Erii",  
"バルビナ" : "Balbina",  

//--------------------------HI-------------------------
"ビアージオ＝ブゾーニ" : "Biagio Busoni",  
"ピーター＝ウェイルゴ" : "Peter Wellgo",  
"微細乙愛(びさいおとめ)" : "Bisai Otome",  
"一一一(ひとついはじめ)" : "Hitotsui Hajime",  
"火野神作(ひのじんさく)" : "Hino Jinsaku",  
"ビバリー＝シースルー" : "Beverly Seethrough",  
"姫神秋沙(ひめがみあいさ)" : "Himegami Aisa",  
"ヒューズ＝カザキリ" : "Fuse=KAZAKIRI", 

//--------------------------FU-------------------------
"フィアンマ" : "Fiamma of the Right",  
"不願竜造(ふがんりゅうぞう)" : "Fugan Ryuuzou",  
"吹寄制理(ふきよせせいり)" : "Fukiyose Seiri",  
"扶桑彩愛(ふそうあやめ)" : "Fusou Ayame",  
"二石香車(ふたいしきょうしゃ)" : "Futaishi Kyousha",  
"ブリュンヒルド＝エイクトベル" : "Brunhild Eiktobel",  
"フレイス" : "Fleiss",  
"フレメア＝セイヴェルン" : "Fremea Seivelun",  
"フレンダ＝セイヴェルン" : "Frenda Seivelun",  
"フロイライン＝クロイトゥーネ" : "Fräulein Kreutune",  
"フロリス" : "Floris",  

//--------------------------HE-------------------------
"ベイロープ" : "Bayloupe",  
"冥土帰し(ヘヴンキャンセラー)" : "Heaven Canceller (Frogface Doctor)",  
"ペテロ＝ヨグディス" : "Pietro Yogdis",  
"蛇谷次雄(へびたにつぐお)" : "Hebitani Tsuguo",  

//--------------------------MA-------------------------
"マーク＝スペース" : "Mark Space",  
"マイク" : "Mike",  
"マコちん" : "Mako-chin",  
"超機動少女カナミン(マジカルパワードカナミン)" : "Magical Powered Kanamin",  
"マタイ＝リース" : "Matthai Reese (Pope)",  
"マリアン＝スリンゲナイヤー" : "Marian Slingeneyer",  
"マリーベート＝ブラックボール" : "Mariebeth Blackball",  

//--------------------------MI-------------------------
"ミーシャ＝クロイツェフ" : "Misha Kreutzev",  
"御坂旅掛(みさかたびがけ)" : "Misaka Tabigake",  
"御坂美琴(みさかみこと)" : "Misaka Mikoto",  
"御坂美鈴(みさかみすず)" : "Misaka Misuzu",  
"ミサカ10032号(御坂妹)" : "Misaka 10032",  
"番外個体(ミサカワースト)" : "Misaka Worst",  
"魅晶由比(みしょうゆい)" : "Mishou Yui",  
"実生好子(みよしよしこ)" : "Mioshi Yoshiko",  
"ミュッセ" : "Musset",  
"投擲の槌(ミョルニル)" : "Mjölnir", 

//--------------------------MU-------------------------
"むーちゃん" : "Muu-chan",  
"麦野沈利(むぎのしずり)" : "Mugino Shizuri",  
"結標淡希(むすじめあわき)" : "Musujime Awaki",  

//--------------------------ME-------------------------
"メアリエ＝スピアヘッド" : "Marye Spearhead",  
"鳴護アリサ(めいごありさ)" : "Meigo Arisa",  

//--------------------------YA-------------------------
"薬味久子(やくみひさこ)" : "Yakumi Hisako",  
"柳迫碧美(やなぎさこあおみ)" : "Yanagisako Aomi",  
"山手(やまて)" : "Yamate",  
"闇咲逢魔(やみさかおうま)" : "Yamisaka Ouma",  

//--------------------------YO-------------------------
"横須賀(よこすか)" : "Yokosuka",  
"芳川桔梗(よしかわききょう)" : "Yoshikawa Kikyou",  
"四葉(よつば)" : "Yotsuba",  
"黄泉川愛穂(よみかわあいほ)" : "Yomikawa Aiho",  

//--------------------------RA-------------------------
"打ち止め（ラストオーダー）" : "Last Order",  
"ランシス" : "Lancis",  

//--------------------------RI-------------------------
"リチャード＝ブレイブ" : "Richard Brave",  
"リドヴィア＝ロレンツェッティ" : "Ridovia Lorenzetti",  
"リメエア" : "Rimea",  
"寮監" : "Tokiwadai Dorm Supervisor",      
"リンディ＝ブルーシェイク" : "Lindy Blueshake",  

//--------------------------RU------------------------- 
"ルチア" : "Lucia",  

//--------------------------RE-------------------------
"レイヴィニア＝バードウェイ" : "Leivinia Birdway (Birdway)",  
"レイチェル" : "Rachel",  
"レッサー" : "Lessar",  
"レディリー＝タングルロード" : "Ladylee Tangleroad",  
"恋査(れんさ)" : "Rensa 28",  

//--------------------------RO-------------------------
"ローズライン＝クラックハルト" : "Roseline Krackhart",  
"ローマ教皇" : "Pope (Matthai Reese)",  
"ローラ＝スチュアート" : "Laura Stuart (Archbishop)",  
"ロッド" : "Rod",  
"ロベルト＝カッツェ" : "Roberto Katze",  

//--------------------------WA-------------------------
"ワシリーサ" : "Vasilisa",  
"ワルキューレ" : "Walküre (Valkyrie)",  
"湾内絹保(わんないきぬほ)" : "Wannai Kinuho", 
//-----------------------------------------------------

//
// Voting
//-----------------------------------------------------
"メールアドレス" : "E-mail address",
//
// Results
//-----------------------------------------------------
"あなたが投票した" : "You have voted for",
"は第" : "who is currently #",
"位です！" : " in ranking!",
"現在の投票結果" : "Current Voting Results",
"注意事項に記載させて頂いたとおり、投票はお1人様1日1回までとなっております。" : "As it was indicated in the guidelines, voting is allowed only once per day.",
 "再度投票する場合は、翌日以降にお願いいたします。" : "If you want to vote again, please come back tomorrow.",
 
// hack, due to stupid matching
"バードウェイ" : "Birdway (Leivinia Birdway)",
"エリス" : "Ellis Warrior", 
"注意事項" : "Notes", 

///////////////////////////////////////////////////////
"":""};



//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons - http://userscripts.org/scripts/review/41369
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

// Function to decide whether a parent tag will have its text replaced or not
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}

// Convert the "words" JSON object to an Array
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}

// Do the replacement
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}