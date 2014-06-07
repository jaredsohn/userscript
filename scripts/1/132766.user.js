// ==UserScript==
// @name           fake3gokushi
// @version        2012.7.23 (for gozensan)
// @namespace      http://userscripts.org/scripts/show/132766
// @description    mixi版 ブラウザ三国志の武将イラストを某ゲームのイラストに置き換えるスクリプトです。色々勝手に使ってます。ごめんなさい。
// @icon           http://5zen.info/hokan/icon.png
// @include        http://*.3gokushi.jp/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/132766.meta.js
// @require        http://sizzlemctwizzle.com/updater.php?id=132766
// @run-at         document-end
// ==/UserScript==
//----更新履歴----
// 2012.05.09	美羽先生の口調修正・アイテムショップの画像変更
// 2012.05.10	ヤバゲー鯖で画像が変わらなかったのを修正（多分他も大丈夫かと・・・）
//		新規開始時のチュートリアルの画像を七乃先生に変更（袁術先生にチュートリアルは無理だ( ﾟдﾟ )ｸﾜｯ!!）
//		№3097/4072/4074 を追加
// 2012.05.21	№1106/2111/4077 を追加
//		画像ファイルを全部 Picasa に移動
// 2012.05.22	クエスト一覧画面の美羽様のセリフ修正
// 2012.05.23	設定ダイアログをデッキ表示画面に追加（メニュー末尾に fake設定 追加）
//		カード番号を指定して置き換える画像を指定できるように追加
//		ついでにクエストの先生も選択できるように追加
// 2012.06.18	イラスト情報を GoogleSpreadsheet から情報取得に変更
//		美羽様の画像を４種類からランダムに表示に修正
// 2012.07.03	プロフへのリンクがおっさん'sになっていたのを修正
// 2012.07.23	カード番号に a b を追加したためちょっと修正

jQuery.noConflict();
j$ = jQuery;

// =================================================================================================================================================================================
// 変数定義
// =================================================================================================================================================================================
var PGNAME = "_fake3gokushi_5zen_v2012.05.23";		//グリモン領域への保存時のPGの名前
var VERSION = "2012.07.23";				// バージョン情報
var HOST = location.hostname;				//アクセスURLホスト

//                                 1 1 1 1 1 1 1 1 1 1
//             0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9
var OPT_BNO = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_GNO = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var OPT_TEACHER = "MU";

var g_MD = "";
var g_MX = 0
var g_MY = 0

// 色設定
var COLOR_FRAME	= "#333333";	// 枠背景色
var COLOR_BASE	= "#654634";	// 拠点リンク色
var COLOR_TITLE	= "#FFCC00";	// 各BOXタイトル背景色
var COLOR_BACK	= "#FFF2BB";	// 各BOX背景色

// 保存データデリミタ
var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var DELIMIT3 = "{=]";
var DELIMIT4 = "|-/";

var d = document;

var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };


( function(){


	LoadSettingBox();		// データのロード
	disp_Options();			// 設定メニューの追加

	if(location.href.indexOf("deck.php") >= 0) {
		GM_xmlhttpRequest( {
			method: "get",
			url: "http://spreadsheets.google.com/feeds/list/0AqsbsmYpZyU5dGYxaU5MNlh5U3czMmc4RkdKZnJyLUE/od6/public/values?alt=json&sq=カード番号=0",
			async:false,
			onload: function(res) {
				// カード番号 0 のタイムスタンプが更新日となる
				var entries = (JSON.parse(res.responseText).feed.entry || []);
				numEntries = entries.length;
				if (numEntries != 0) {
					if (GM_getValue("fake3gokushi_version", "") != entries[0]['gsx$タイムスタンプ'].$t) {
						GM_setValue("fake3gokushi_version",entries[0]['gsx$タイムスタンプ'].$t);
						// 新しいSpreadsheet情報をローカルデータに書き出し
						GM_xmlhttpRequest( {
							method: "get",
							url: "http://spreadsheets.google.com/feeds/list/0AqsbsmYpZyU5dGYxaU5MNlh5U3czMmc4RkdKZnJyLUE/od6/public/values?alt=json&sq=カード番号!=0",
							onload: function(res) {
								GM_setValue("fake3gokushi_illustData",res.responseText);
								// データ更新後に置き換え実行
								modFunc();
							}
						});
					} else {
						// 置き換え実行
						modFunc();
					}
				} else {
					// 更新日が読めなかった場合とりあえず表示
					modFunc();
				}
			}
		});
	} else {
		modFunc();
	}
	// 武将図鑑を置き換え
	if (location.pathname == '/card/busyobook_card.php') {

		var zukan = {
			"劉備" : "真名は桃香（とうか）。蜀漢の君主で、関羽・張飛とは義姉妹。中山靖王劉勝の末裔である証の宝剣「靖王伝家」を携え、世を救うために立ち上がる。限りない優しさと懐の大きさを持つが、極彩色の天然ボケタイプ。",
			"関羽" : "真名は愛紗（あいしゃ）。大陸中にその名を馳せる蜀の武神。理想家で、力の無い人々が平和に暮らせる世の中を作るために日々奮闘している。性格は生真面目で堅物。艶やかな黒髪をなびかせて青龍偃月刀を振るうその姿から「美髪公」の二つ名で呼ばれる。",
			"張飛" : "真名は鈴々（りんりん）。ちびっ子だが自分の背丈より大きな丈八蛇矛を振るう万夫不当の豪傑。戦場以外では、近所の子供と駆け回って遊んだり、虫取りに興じていたりなど、年相応の一面を持つ。",
			"馬超" : "真名は翠（すい）。西涼の太守、馬騰の娘。曹操によって涼州を滅ぼされ一族が離散したため、劉備を頼り蜀軍の一員となる。その槍捌きは白銀の流星と謳われる「西涼の錦馬超」。",
			"黄忠" : "真名は紫苑（しおん）。弓の神・曲張に例えられるほどの腕前を持つ弓の名手。将軍として兵を率いるだけでなく、蜀軍の兵站管理も担当する。未亡人で、亡夫との間に一人娘の璃々がいる。",
			"趙雲" : "真名は星（せい）。文武両道に長けた蜀の武将。関羽・張飛に匹敵するほどの武勇の持ち主で、その槍捌きは「神槍」と称えられる。常に冷静沈着で何事にも動じない精神の持ち主。メンマが大好物。",
			"諸葛亮" : "真名は朱里（しゅり）。「伏竜」と称さられる、蜀軍の主に内政面を担当する軍師。「策、神に勝り、謀ごと、鬼を討つ」とまで言われるほどの策略家。女子校の水鏡女学院で育ったため、男性が少し苦手。慌てると「はわわ」と口走るところから「はわわ軍師」と呼ばれている。",
			"龐統" : "真名は雛里（ひなり）。「鳳雛」と称せられる、蜀軍の主に軍事面を担当する軍師。「不敗の魔女っ子」と呼ばれる戦術の天才。かなり内気でおどおどしており、恥ずかしいと大きな帽子で顔を隠す癖がある。慌てると「あわわ」と口走るところから「あわわ軍師」と呼ばれている。",
			"馬岱" : "真名は蒲公英（たんぽぽ）。馬超の従妹。従姉である馬超を、お姉さまと慕い尊敬している。天性の悪戯好きで、よく魏延をからかっている。なにかにつけて、決め台詞の「ここにいるぞ～！」の声をあげながら登場する。",
			"魏延" : "真名は焔耶（えんや）。五虎将に次ぐ実力を持つ蜀の猛将。当初は敵対していたが、劉備に一目惚れしたことがきっかけで幕下に加わることになる。自らの武勇に自信を持ち、強気な発言をしたり、他人をバカにしたりしているが、実は打たれ弱いタイプ。犬が大の苦手。",
			"厳顔" : "真名は桔梗（ききょう）。無類の酒好きな豪快な武将。黄忠と共に蜀の若い武将の相談役として面倒を見ている。戦が好きで、戦いでは弓が武器なのに率先して前に出るタイプ。",
			"曹操" : "真名は華琳（かりん）。誇り高き魏の王。戦乱の世を、自らの手で再興することに天命を見出している。才気煥発で誇り高く、他者からの妬みを受ける事も多いが、歯牙にも掛けず自らの信念を貫く。美しい者には目が無く、美少女を手篭にするのが趣味。",
			"夏侯惇" : "真名は春蘭（しゅんらん）。曹操の片腕の武人。夏侯淵の双子の姉。身も心も曹操に捧げており、曹操に敵対する者は誰であろうと許さない。激情家で猪突猛進で、天然バカの体育会系。",
			"夏侯淵" : "真名は秋蘭（しゅうらん）。曹操の片腕の武人。夏侯惇の双子の妹。姉と共に身も心も曹操に捧げている。性格は姉とは違い、常に冷静沈着。とかく暴走する姉を、クールに補佐する。",
			"荀彧" : "真名は桂花（けいふぁ）。魏の筆頭軍師。曹操の王としての器、天運、才能に惚れ込み、己の全てを捧げて仕えている。バカな人間が何よりも大嫌いで、夏侯惇の事を野蛮人と蔑んでいる。",
			"許褚" : "真名は季衣（きい）。親友の典韋と共に曹操の親衛隊を務める。小柄な体格から想像できない怪力の持ち主で、巨大な鉄球を軽々と振りまわす。曹操の事は好きだが、それと同じくらいに夏侯惇を慕っている。",
			"典韋" : "真名は流琉（るる）。親友の許緒と共に曹操の親衛隊を務める。許緒と二人でよく食べ歩きをするが、食べるのが大好きな許緒と違って料理を作る方が好き。相方のフォロー役という立場が似てるせいか、夏侯淵を尊敬し憧れている。",
			"張遼" : "真名は霞（しあ）。董卓軍の客将であったが、後に魏の騎兵部隊を率いる将軍となる。武と義を重んじ侠気に満ちた性格で、自らの武技を披露する事の喜びを見出す武将。関羽の戦いぶりに惚れ込み、武器も関羽の青龍偃月刀を模した飛龍偃月刀を使用する。",
			"郭嘉" : "真名は稟（りん）。戦術能力に秀でる魏の軍師。歯に衣着せぬ物言いで、曹操に対しても言葉を選ばず諫言する。妄想癖があり、曹操から掛けられる言葉をエロ的に解釈しては鼻血を噴き出し気絶している。",
			"程昱" : "真名は風（ふう）。政戦両略に長ける魏の軍師。常にのんびりマイペースで、軍議の途中でも居眠りするほど。しかし策を提案する時は一切の感情を交えず、冷酷な献策をする。頭の上のぬいぐるみは「宝譿」という名前の相棒。",
			"楽進" : "真名は凪（なぎ）。魏の武官で元義勇軍の将。肉弾戦を得意とする。武骨で、女の子らしいことに興味が無いふりをしているが、実は憧れがあり、料理や裁縫などを常に練習していたりする。",
			"李典" : "真名は真桜（まおう）。魏の武官で元義勇軍の将。兵器調達官も兼ねている。発明が大好きで、自らの発明品であるドリル付き槍「螺旋槍」を武器に戦う。",
			"于禁" : "真名は沙和（さわ）。魏の武官で元義勇軍の将。新兵の訓練教官も兼ねており、可愛い声で聞くに堪えない罵声を浴びせて新兵をシゴいている。女の子らしい性格で、好きな事はオシャレとショッピング。",
			"孫権" : "真名は蓮華（れんふぁ）。姉・孫策が急逝したために若くして孫呉の王となる。孫策と比べると武勇では及ぶべくもないが、王としての器はむしろ上回ると期待されている。生真面目な性格で、常に呉の王らしくあれと自分に言い聞かせている。",
			"孫策" : "真名は雪蓮（しぇれん）。母・孫堅の遺志を継いだ孫呉の英雄王。普段は陽気で気さくな性格だが、敵対する人間に対しては容赦しない。戦場で血を見るとテンションが上がりすぎて、自分で自分を制御できなくなる性癖を持つ。",
			"孫尚香" : "真名は小蓮（しゃおれん）。孫策・孫権の妹。天真爛漫自由闊達な小悪魔的。好奇心が強く、何でも知りたがる元気娘。ホワイトタイガーの周々とパンダの善々をお供に連れている。",
			"陸遜" : "真名は穏（のん）。呉の副軍師。穏やかな性格で、のんびりした口調だが、実はかなりの切れ者。大の本好きで、素晴らしい書物に出会うと興奮して昂ぶってしまう性癖の持ち主。",
			"周瑜" : "真名は冥琳（めいりん）。孫呉の大軍師で、孫策とは幼なじみの親友同士。文官・武官を束ねる呉の柱石。「理」と「利」から物事を判断するリアリストだが、諧謔を解する能力もあり、以外に茶目っ気があったりもする。",
			"甘寧" : "真名は思春（ししゅん）。孫権の親衛隊長として、常にその傍らに控える忠臣。元は錦帆賊と呼ばれた江賊の頭領だった。寡黙で感情を表に出さないが、孫権の器の大きさに心服しており、孫権を陰から支え守っている。",
			"周泰" : "真名は明命（みんめい）。孫権の親衛隊副長。甘寧と共に孫権を支える忠臣。寡黙でクールな甘寧とは対照的に、はきはきと喋り朗らかな性格。生真面目で、寝食を忘れて職務をこなす。大の猫好き。",
			"呂蒙" : "真名は亞莎（あーしぇ）。呉の軍師見習い。元は呉の下級士官で武闘派だったが、軍師としての才能を見こまれ周瑜・陸遜の弟子となる。他者を威嚇するような鋭い目つきだが、実は目が悪いだけ。好物は胡麻団子。",
			"黄蓋" : "真名は祭（さい）。孫堅の代から孫家に仕える呉の宿将。孫呉の生き字引として、皆に一目置かれる存在。豪毅な性格だが、結構子供っぽく気分屋なところもある。",
			"大喬" : "江東の二喬と謳われる双子の姉妹の姉。大陸中、知らぬものはいないと言われるほどの美少女。孫策の恋人であったが、孫策亡き後はその遺言に従い、妹の小喬と共に周瑜に仕えることとなる。",
			"小喬" : "江東の二喬と謳われる双子の姉妹の妹。大陸中、知らぬものはいないと言われるほどの美少女。周瑜のペット兼メイドとして仕えている。姉の大喬に歪んだ愛情を持っており、姉を苛めることが大好き。",
			"袁紹" : "真名は麗羽（れいは）。河北四州を支配する四世三公の名門・袁家の当主。わがままで見栄っ張りな性格で、行き当たりばったりな思い付きで行動するため、周りの人間は振りまわされている。異常なまでに悪運が強い。",
			"文醜" : "真名は猪々子（いいしぇ）。袁紹軍の双璧の一人。やたらとはりきっては周囲をトラブルに巻き込んでいく。夢は一獲千金のギャンブラータイプ。何も考えていないようで、意外と状況を見て動いている。",
			"顔良" : "真名は斗詩（とし）。袁紹軍の双璧の一人。おっとりとした常識人で、いつも袁紹お嬢様のワガママと、ハリキリ屋である文醜の行き当たりばったりな行動に付き合わされている。",
			"公孫瓚" : "真名は白蓮（ぱいれん）。北方・幽州の弱小領主。賊退治でそこそこ名を上げ「白馬長史」と呼ばれたが、袁紹に領国を滅ぼされる。普通の剣を装備して、普通の鎧を身に纏い、普通の白馬に乗って颯爽と登場する、影の薄い普通の人。",
			"董卓" : "真名は月（ゆえ）。都を占拠し悪逆非道を働く奸賊と噂されるが、実際は陰謀により暴君に仕立て上げられただけで、本人は優しく儚げな少女。依存心が強い性格で、内罰的な一面を持つ。",
			"賈詡" : "真名は詠（えい）。董卓の幼なじみで董卓軍の軍師。冷血・冷徹で謀略に長ける策謀家。董卓のためなら、どんな残酷・卑怯な策も用いる。しかし仕掛ける策略は、いつも裏目に出る不運体質。",
			"呂布" : "真名は恋（れん）。三國無双の強さを誇る最強の武人。無口・無表情で何を考えているのかが分かりにくいキャラクター。だが本当は寂しがり屋で、捨てられた犬や猫を拾ってきては屋敷で飼っている。一番の親友はウェルシュコーギーのセキト。",
			"華雄" : "董卓軍の猛将。意外と部下からは慕われている。",
			"孟獲" : "真名は美以（みい）。未開の地・南蛮を治める大王。領土が増えれば美味しいものが沢山食べられ大勢の人に平伏されるから、という理由で蜀に攻め込もうとしたが、逆に攻められて敗退。七回敗れた後、劉備と仲良しになり仲間となる。",
			"于吉" : "左慈と共に洛陽で暗躍する神仙。傀儡と呼ぶ白装束の者達を操り、数々の武将を唆し歴史の裏で暗躍している。武闘派の左慈とは違い策略を好む性格。柔和な外見を持つが、冷酷な一面がある。",
//			"貂蝉" : "自称踊り子。マッチョな肉体に、ピンクのビキニパンツのみを着用したオカマ。なぜか大陸の様々な情報に詳しい事情通。異様な容姿にそぐわず、性的嗜好以外の点では意外に常識人で面倒見が良い。",
			"張角" : "真名は天和（てんほう）。張三姉妹の長女。妹たちとアイドルユニット「数え役萬☆姉妹(しすたぁず)」として活躍する。ファンの暴走によって黄巾党の首領に祭り上げられるが、本人はいたってのんびり。",
                        "張宝" : "真名は地和（ちーほう）。張三姉妹の次姉にして、天性のアジテーター。大陸一のカリスマアイドルになるためには手段を選ばない上昇志向の強い女の子。胸は姉妹の中で一番小さい。",
                        "張梁" : "真名は人和（れんほう）。張三姉妹の末妹で影の実力者。アイドル活動だけでなくマネージングも担当し、金銭管理やスケジュール調整に優れた能力を見せる。",
			"袁術" : "真名は美羽（みう）名門・袁家の一族で、袁紹の従妹。張勲に甘やかされて育てられたため、ワガママでアホな子になった。好物はハチミツ水。",
			"華佗" : "大陸一の名医。神話の時代に神農大帝が編み出したと言われる究極医術「五斗米道(ゴットヴェイドォー)」の継承者。大陸中の病人や怪我人を治すため、旅を続けている。",
//			"紀霊" : "真名は七乃（ななの）。袁術の側近兼世話役兼傅役。袁術が幼少の頃より仕えており、袁術を甘やかしまくって育てた。溺愛する袁術の為に、さまざまな悪だくみを行う。",
		};

		var cna = document.getElementsByClassName('name'); 
		var des = document.getElementsByClassName('description');
		var nam = document.getElementsByTagName('h3');
		var i;

		// 紹介文を置き換え
		for (i = 0; i < 1; i++) {
			var HimeZukan = zukan[cna[i].innerHTML];
			if (HimeZukan != null) {
				des[i].innerHTML = HimeZukan
			}
		}

		// 原作にあわせて漢字を置き換え
		var names = {
			'龐統 （ほうとう）'       : '鳳統 （ほうとう）',
			'賈詡 （かく）'           : '賈駆 （かく）',
			'許褚 （きょちょ）'       : '許緒 （きょちょ）',
			'公孫瓚 （こうそんさん）' : '公孫賛 （こうそんさん）',
//			'紀霊 （きれい）'         : '張勲 （ちょうくん）'
		};
		for (i = 0; i < 1; i++) {
			var HimeName =  names[nam[i].innerHTML];
			if (HimeName != null) {   
				nam[i].innerHTML = HimeName;
			}
		}

		// (fake3gokushiやfakename3gokushiをさらにカスタマイズしている人向け)カードNo.指定で差し替え
		var sasikae = {
//			"4025" : {kijutsu : "真名は地和（ちーほう）。張三姉妹の次姉にして、天性のアジテーター。大陸一のカリスマアイドルになるためには手段を選ばない上昇志向の強い女の子。胸は姉妹の中で一番小さい。", namae : "張宝（ちょうほう）"},
//			"4052" : {kijutsu : "真名は人和（れんほう）。張三姉妹の末妹で影の実力者。アイドル活動だけでなくマネージングも担当し、金銭管理やスケジュール調整に優れた能力を見せる。", namae : "張梁（ちょうりょう）"},
		};

		var url = location.href;
		var key = 'card_number=';
		var cardno = url.substring(url.lastIndexOf(key) + key.length);

		for (i = 0; i < 1; i++) {
			if (sasikae[cardno] != null) {
				des[i].innerHTML = sasikae[cardno].kijutsu;
				nam[i].innerHTML = sasikae[cardno].namae;
			}
		}
	}

	function modFunc() {

		console.log(new Date());

		var res = GM_getValue("fake3gokushi_illustData","");
		if (res != "") {
			var entries = (JSON.parse(res).feed.entry || []);
			numEntries = entries.length;
			var cardlist = [];
			for (var i=0;i<numEntries;i++){
				cardlist[ entries[i]['gsx$カード番号'].$t ] = ( {"big":entries[i]['gsx$big'].$t, "thumb":entries[i]['gsx$thumb'].$t, "small":entries[i]['gsx$small'].$t } );
			}
	//

			var elements = document.getElementsByClassName('illust');
			for (i = 0; i < elements.length; i++) {
				// 大イラストの置き換え
				if (elements[i].nodeName == 'IMG') {
					var imgname = elements[i].src.substring(elements[i].src.lastIndexOf("/") + 1).substring(0, 4);
					imgname = ChangeImgname(imgname);	// カード番号の置き換え
					if (cardlist[imgname] != undefined && cardlist[imgname] != null) {
						elements[i].src = cardlist[imgname].big;
					}
				}
				// サムネイルの置き換え
				if (elements[i].nodeName == 'TD') {
					var img = elements[i].getElementsByTagName('img')[0];
					var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0, 4);
					imgname = ChangeImgname(imgname);	// カード番号の置き換え
					if (cardlist[imgname] != undefined && cardlist[imgname] != null) {
						img.src = cardlist[imgname].thumb;
					}
				}
				// 出兵時の小イラストの置き換え
				if (elements[i].nodeName == 'DIV') {
					var img = elements[i].getElementsByTagName('img')[0];
					var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0, 4);
					imgname = ChangeImgname(imgname);	// カード番号の置き換え
					if (cardlist[imgname] != undefined && cardlist[imgname] != null) {
						img.src = cardlist[imgname].small;
					}
				}
			}
			// 図鑑のサムネイルの置き換え
			var elements = document.getElementsByClassName('ie6pngfix');
			for (i = 0; i < elements.length; i++) {
				if (elements[i].nodeName == 'IMG') {
					var imgname = elements[i].src.substring(elements[i].src.lastIndexOf("/") + 1).substring(0, 4);
					if (cardlist[imgname] != undefined && cardlist[imgname] != null) {
						elements[i].src = cardlist[imgname].thumb;
					}
				}
			}


			// 小イラストの置き換え
			var minielements = document.getElementsByClassName('illustMini');
			for (i = 0; i < minielements.length; i++) {
				var img = minielements[i].getElementsByTagName('img')[0];
				var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0,4);
				imgname = ChangeImgname(imgname);	// カード番号の置き換え
				if (cardlist[imgname] != undefined && cardlist[imgname] != null) {
	//						img.src = cardlist[imgname].small;
					img.src = cardlist[imgname].small;
				}
			};

			// 最近取得したカードのサムネイルの置き換え
			var elements = document.getElementsByTagName('img');
			for (i = 0; i < elements.length; i++) {
				if (elements[i].nodeName == 'IMG') {
					var imgname = elements[i].src.substring(elements[i].src.lastIndexOf("thumb/") + 6).substring(0, 4);
					imgname = ChangeImgname(imgname);	// カード番号の置き換え
					if (cardlist[imgname] != undefined && cardlist[imgname] != null) {
						elements[i].src = cardlist[imgname].thumb;
					}
				}
			}
		}
	}

	// [Chrome Extension] AutoPatchWork(https://chrome.google.com/extensions/detail/aeolcjbaammbkgaiagooljfdepnjmkfd)を使って
	// 次ページを自動読込した場合も置き換え実行
	addEventListener('AutoPatchWork.pageloaded', function() {
		modFunc();
	}, false);

	// [Chrome/FireFox/Safari Extension] AutoPagerize(http://autopagerize.net/)を使って
	// 次ページを自動読込した場合も置き換え実行
	addEventListener('GM_AutoPagerizeNextPageLoaded', function() {
		modFunc();
	}, false);


	if (location.pathname == "/quest" || location.pathname == "/quest/" || location.pathname == "/quest/index.php") {

		// 美羽先生
		if (OPT_TEACHER == "MU") {

			fukidash = document.evaluate('//p[@id="questB3_fukidashi"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (fukidash.snapshotLength) {
				fukidash.snapshotItem(0).innerHTML = "クエスト名をクリックするとクエストの内容が確認できるのじゃ。";
			}

			// 名札: "諸葛亮先生"を"袁術先生"に変更
			var teacher_name = xpath('//div[@id="questB3_thumb"]/p', document);
			if (teacher_name.snapshotLength) {
				teacher_name.snapshotItem(0).innerHTML = "美羽先生";
			}
			// 画像: "諸葛亮先生"を"袁術先生"に変更
			var teacher_img = xpath('//div[@id="questB3_thumb"]/div/img', document);
			if (teacher_img.snapshotLength) {
				teacher_img.snapshotItem(0).src = 'http://lh4.ggpht.com/-320eujd1Kng/T7pKA97qPXI/AAAAAAAAA4E/EJ7eCc9i2hI/miu_150x150_1.png';
			}
			// 名札: "諸葛亮"を"朱里先生"に変更
			var teacher_name = document.getElementById('teacherName');
			if (teacher_name != null) {
				teacher_name.src = 'http://lh5.ggpht.com/-8uG_QPO1jiw/T7pKAtMUyhI/AAAAAAAAA4A/X4bDnjPUxrc/miu.jpg';
			}
			var random = Math.floor(Math.random() * 5);	// 0～5までの乱数値
			switch (random) {
				case 0:		j$("#tutorial_ttls").css({"background-image":'url("https://lh3.ggpht.com/-K_YjKcPq01I/T9nTR5bWQeI/AAAAAAAAA5k/u1nTwyzR8_0/s579/1001.png")'});break;
				case 1:		j$("#tutorial_ttls").css({"background-image":'url("https://lh6.ggpht.com/-7HOM69NE0Ms/T9nUYQMPzhI/AAAAAAAAA54/LYAQMloxa74/s579/1009.png")'});break;
				case 2:		j$("#tutorial_ttls").css({"background-image":'url("https://lh5.ggpht.com/-nmq_DZnePk8/T9nWVO7j7DI/AAAAAAAAA6Y/75ccXFUTB2g/s579/1013.png")'});break;
				case 3:		j$("#tutorial_ttls").css({"background-image":'url("https://lh6.ggpht.com/-CMfomJ_iMDY/T9nXKAyw8KI/AAAAAAAAA6g/pjGzTrRHEsk/s579/1021.png")'});break;
				case 4:		j$("#tutorial_ttls").css({"background-image":'url("https://lh4.ggpht.com/-EkvbKEdWP3Q/T9nX5fRRhUI/AAAAAAAAA6o/Ax2PIPFkbuw/s579/1030.png")'});break;
			}
			var quest_s = document.evaluate('//div[@class="content"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var replaceTable = [
				["言います。"					, "言うのじゃ。"				],	["油断しないでください。"			, "油断するでないぞ。"				],
				["性能を誇ります。"				, "性能を誇るのじゃ。"				],	["必要になってきます。"				, "必要になってくるぞよ。"			],
				["気を抜かないでください。"			, "気を抜くでないぞ。"				],	["要ります。"					, "必要じゃぞ。"				],
				["クエストがあります。"				, "クエストがあるのじゃ。"			],	["成功を祈ります"				, "成功を祈っておるぞ"				],
				["ご注意ください。"				, "注意するのじゃ。"				],	["見定めて差し上げます。"			, "見定めてやるのじゃ。"			],
				["判断して差し上げます。"			, "判断してやるのじゃ。"			],	["少し難しいです。"				, "少し難しいのじゃ。	"			],
				["いいですか。攻撃ランキングですので、"		, "よいか、攻撃ランキングじゃから、"		],	["同盟の皆としっかり相談してください。"		, "ま、わしは蜂蜜水があればいいんじゃがな。"	],
				["にしてしてください。"				, "にするがよい。"				],	["建てててくれ。"				, "建ててくるのじゃ。"				],
				["相当に手ごわいです"				, "相当に手ごわいのじゃ"			],	["あるのでしたら"				, "建っておるなら"				],
				["分かっていますか"				, "知っておるか"				],	["なってくるでしょうから"			, "なるじゃろうから"				],
				["損はありません"				, "損はないぞ"					],	["書き込みをしてください"			, "書き込みをしてくるが良い"			],
				["悪いです。"					, "悪いのじゃ。"				],	["良いです。"					, "良いのじゃ。"				],
				["よいです。"					, "よいのじゃ。"				],	["です。"					, "じゃ。"					],
				["あなた"					, "おぬし"					],	["あります。"					, "あるぞ。"					],
				["よいので"					, "よいから"					],	["いますか"					, "おるか"					],
				["なります。"					, "なるぞ。"					],	["もらいます。"					, "もらうぞ。"					],
				["お話しします。"				, "話すのじゃ。"				],	["違います。"					, "違うぞ。"					],
				["判断します。"					, "判断してやるぞ。"				],	["思います。"					, "記憶しておるぞ。"				],
				["します。"					, "するぞ。"					],	["ます。"					, "るぞ。"					],
				["きてください。"				, "くるのじゃ。"				],	["いけません。"					, "いかんぞ。"					],
				["なりません。"					, "ならんからの。"				],	["でしょう。"					, "じゃろう。"					],
				["いますか？"					, "おるか？"					],	["どうですか？"					, "どうじゃ？"					],
				["わたし"					, "わらわ"					],	["ください"					, "くれ"					],
				["なりませんが"					, "ならんが"					],	["なりませんので"				, "ならんから"					],
				["なりません"					, "ならんから"					],	["しよう"					, "するのじゃ"					],
				["遅いため"					, "遅いから"					],	["いますが"					, "おるのじゃが"				],
				["あるので"					, "あるから"					],	["いませんか？"					, "おらぬか？"					],
				["できないため"					, "できぬから"					],	["しまいますと"					, "しまうと"					],
				["報酬をお渡しできません。"			, "報酬をわたせんからな。"			],	["ありません。"					, "ないのじゃ。"				],
				["しまいますので"				, "しまうので"					],	["してきてくれ"					, "するのじゃ"					],
				["というわけで、"				, "そういうわけじゃから、"			],	["かまいません。"				, "かまわんぞ。"				],
				["ですね。"					, "じゃな。"					],	["はお渡しできませんので"			, "を渡すことができんから"			],
				["ご注意下さい。"				, "注意するのじゃ。"				],	["でしょうか。"					, "じゃろうか。"				],
				["よいですし"					, "よいし"					],	["してくれ。"					, "するがよい。"				],
				["しましたら"					, "したなら"					],	["使おう"					, "使うのじゃ"					],
				["みましょう。"					, "みるのじゃ。"				],	["から気を付けてくれ。"				, "のじゃ。"					],
				["しれません。 "				, "しれんぞ。"					],	["ありませんか？"				, "ないか？"					],
				["分かりますか？"				, "分かるかの？"				],	["資源のためです！"				, "蜂蜜水のだめじゃ！"				],
				["どうでしょうか？"				, "どうじゃ？"					],	["しましたか？"					, "したかの？"					],
				["ないようでしたら、"				, "ないのなら"					],	["調子はいかがでしょうか？"			, "調子はどうじゃ？"				],
				["はいかがでしょうか？"				, "くるがいいぞ？"				],	["に代表されます"				, "とかの"					],
				["時間がかかりますし"				, "時間がかかるし"				],	["しれません。"					, "しれんな。"					],
				["あげてみませんか？"				, "あげてみんか？"				],	["かもしれませんが、"				, "かもしれんが、"				],
				["できるのですが、"				, "できるんじゃが、"				],	["よいですが、"					, "よいのじゃが、"				],
				["ですが、"					, "なんじゃが、"				],	["なりました。"					, "なったの。"					],
				["建てましょう。"				, "建ててみるがよい。"				],	["広げましょう。"				, "広げるのじゃ。"				],
				["どうですか、"					, "どうじゃ、"					],	["期待できませんが、"				, "期待できぬが、"				],
				["達成できません。"				, "達成できんぞ。"				],	["ですし"					, "じゃし"					],
				["そうですね"					, "そうじゃの"					],	["ですから、"					, "そうじゃの"					],
				["ありますから、"				, "あるじゃろうから、"				],	["いけませんね。"				, "いかんの。"					],
				["ですが・・・"					, "なんじゃがな・・・"				],	["いないようでしたら"				, "いないのじゃったら"				],
				["出せるはずです！"				, "出せるはずじゃ！"				],	["頑張ってきてくれ！"				, "頑張ってくりゃれ！"				],
				["やったことありますか？"			, "やったことがあるか？"			],	["ありますし、"					, "あるから、"					],
				["結んでみませんか？"				, "結んでみんか？"				],	["作りましたか？"				, "作ったかの？"				],
				["問いません"					, "問わぬぞ"					],	["ランク付けされます"				, "ランク付けされ"				],
				["相当に手ごわいです"				, "相当に手ごわいのじゃ"			],	["言いました通り、"				, "言ったと思うが"				],
				["ご存知ですか？"				, "知っておるか？"				],	["見てきましたか？"				, "見てきたか？"				],
				["上昇しますが、"				, "上昇するのじゃが"				],	["建ててみませんか？"				, "建てて見るのじゃ。"				],
				["場合もあります・・・。"			, "場合もあるがの・・・。"			],	["立てらません。"				, "立てられぬのじゃ。"				],
				["敵がいるか、"					, "敵がおるか、"				],	["持っていますと"				, "持っておると"				],
				["できません。"					, "出来ぬのじゃ。"				],	["大分発展してきました。"			, "大分発展してきたの。"			],
				["経験値を得てくれ。"				, "経験値を得てくるのじゃ。"			],	["早速ですが"					, "早速じゃが"					],
				["建ててみてくれ。"				, "建ててみるのじゃ。"				],	["完成したら教えてくれ。"			, "完成したら起こしてくりゃれ。"		],
				["近づいてるころでしょうか？"			, "近づいてくる頃かの。"			],	["聞いた気がするのですが。"			, "七乃が言っておったぞ。"			],
				["お待ちしておりました。"			, "おぬしを待っておったぞ。"			],	["そろそろ来るころかと予想していました。"	, "そろそろ来るころかと予想しておったわ。"	],
				["</font>。"					, "</font>"					],	["失敗することはありませんが、"			, "失敗することはないのじゃが、"		],
				["つ以上のNPC砦を攻略するのじゃ"		, "つ以上のNPC砦を<br>攻略するのじゃ"		],	["つ以上のNPC城を攻略するのじゃ"		, "つ以上のNPC城を<br>攻略するのじゃ"		],
				["00以上にするのじゃ"				, "00以上<br>にするのじゃ"			]
			]
			for (var i=0;i<replaceTable.length;i++){
				var x = 0;
				while (1) {
					x++;
					var flg = quest_s.snapshotItem(0).innerHTML.match(replaceTable[i][0]);
					if(flg) {
						quest_s.snapshotItem(0).innerHTML = quest_s.snapshotItem(0).innerHTML.replace(replaceTable[i][0],replaceTable[i][1]);
					} else {
						break;
					}
					if (x > 10) { break; }		// 無限ループ回避用
				}
			}
		}
		// 朱里先生
		if (OPT_TEACHER == "SR") {
			// 名札: "諸葛亮"を"朱里先生"に変更
			var teacher_name = xpath('//div[@id="questB3_thumb"]/p', document);
			if (teacher_name.snapshotLength) {
				teacher_name.snapshotItem(0).innerHTML = "朱里先生";
			}
			// 画像："諸葛亮"を"朱里先生"に変更
			var teacher_img = xpath('//div[@id="questB3_thumb"]/div/img', document);
			if (teacher_img.snapshotLength) {
				teacher_img.snapshotItem(0).src = 'http://lh3.ggpht.com/-tqpm6iRFM-M/T7pKBDU0zyI/AAAAAAAAA4M/6GJ5ggxmR3k/shuri_150x150_1.png';
			}
			// 名札: "諸葛亮"を"朱里先生"に変更
			var teacher_name = document.getElementById('teacherName');
			if (teacher_name != null) {
				teacher_name.src = 'http://lh4.ggpht.com/-ImiXcVJHcRM/T7pKDEmh4RI/AAAAAAAAA4s/8DAve8kGRIo/shuri.jpg';
			}
			j$("#tutorial_ttls").css({"background-image":'url("http://lh5.ggpht.com/-MmQRPFs8sWM/T7pJ_lYkZEI/AAAAAAAAA30/Qe59-kay3Ds/s579/bg_shuri_1.png")'})
			var replaceTable = [
				["</font>。"				, "</font>"						],
				["建てててください。"		, "建ててください。"			],
				["にしてしてください。"		, "にしてください。"			]
			]
			for (var i=0;i<replaceTable.length;i++){
				var x = 0;
				while (1) {
					x++;
					var flg = quest_s.snapshotItem(0).innerHTML.match(replaceTable[i][0]);
					if(flg) {
						quest_s.snapshotItem(0).innerHTML = quest_s.snapshotItem(0).innerHTML.replace(replaceTable[i][0],replaceTable[i][1]);
					} else {
						break;
					}
					if (x > 10) { break; }		// 無限ループ回避用
				}
			}
		}
	}

	// プロフィール背景画像を差し替え
	GM_addStyle('div#header_bottom #profileBtn a { background-image:url("http://lh3.ggpht.com/_yaaM6-lAuRY/TNfm_YvWZxI/AAAAAAAAAt0/jnHgWqKO96Q/profile.png") !important }');

	if (OPT_TEACHER == "MU") {
		GM_addStyle('div#itemShopWrapper { background-image:url("http://lh3.ggpht.com/-Z7FTkdPC8g0/T7pJ_mH-LhI/AAAAAAAAA3s/vWwb-I_xaa4/s550/itemshop_bg_1.png") !important }');
	}
	if (OPT_TEACHER == "SR") {
		GM_addStyle('div#itemShopWrapper { background-image:url("http://lh3.ggpht.com/-dtyJYXMkMGs/T7pKAClYcEI/AAAAAAAAA38/gd55Z6mQFe0/s550/itemshop_bg_2.png") !important }');
	}

	// チュートリアルを張勲に置き換え
	GM_addStyle('div#tutorial_small   { background:url("http://lh6.ggpht.com/-U64SzGavniE/T7pKB-i4bII/AAAAAAAAA4c/2jo2WVi2em4/s610/tutorial_bgS.png") !important }');
	GM_addStyle('div#tutorial_large   { background:url("http://lh3.ggpht.com/-hFVcbHabQgo/T7pKBgUawpI/AAAAAAAAA4Y/ckrFjevITeE/s760/tutorial_bgL.png") !important }');
	GM_addStyle('div#tutorial_large_2 { background:url("http://lh3.ggpht.com/-hFVcbHabQgo/T7pKBgUawpI/AAAAAAAAA4Y/ckrFjevITeE/s760/tutorial_bgL.png") !important }');

	// 君主作成の画面を張勲にする
	GM_addStyle('div#firstMap { background:url("http://lh3.ggpht.com/-hFVcbHabQgo/T7pKBgUawpI/AAAAAAAAA4Y/ckrFjevITeE/tutorial_bgL.png") !important }');

}) ();

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function ChangeImgname(imgname) {
	for (var i=0;i < 20;i++){
		if (OPT_BNO[i] == imgname) {
			return OPT_GNO[i];
			break;
		}
	}
	return imgname;
}
// 設定追加 ========================================================================================================================================================================
function disp_Options() {
	if (!location.pathname.match(/^\/card/)) return;
//	if (location.pathname.match(/deck\.php/)) return;
	var ul = document.getElementById('statMenu');
	if (!ul) return;
	var cl = document.createElement('a');
	cl.href = 'javascript:void(0);';
	cl.innerHTML = 'fake設定';
	cl.addEventListener("click", function() {
		LoadSettingBox();		// 設定をロード
		closeSettingBox();		// 設定画面を閉じる
		addSettingHtml();		// 設定画面を表示
	}, true);
	var hasLastDocs = document.evaluate('//ul[@id="statMenu"]//li[@class="last"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    hasLastDocs.snapshotItem(0).removeAttribute('class');

	var li = document.createElement('li');
	li.appendChild(cl);
	li.className = 'last';
	ul.appendChild(li);
}

// 設定画面作成 ====================================================================================================================================================================
function addSettingHtml(vId) {
	var popupLeft = GM_getValue(location.hostname + PGNAME + "_popup_left", 10);
	var popupTop  = GM_getValue(location.hostname + PGNAME + "_popup_top", 10);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;

	//表示コンテナ作成
	var SettingContainer = d.createElement("div");
	SettingContainer.id = "fake3gokushiContainer";
	SettingContainer.style.position = "absolute";
	SettingContainer.style.color = COLOR_BASE;
	SettingContainer.style.backgroundColor = COLOR_FRAME;
	SettingContainer.style.opacity= 1.0;
	SettingContainer.style.border = "solid 2px black";
	SettingContainer.style.left = popupLeft + "px";
	SettingContainer.style.top = popupTop + "px";
	SettingContainer.style.fontSize = "10px";
	SettingContainer.style.fontFamily = "ＭＳ ゴシック";
	SettingContainer.style.padding = "2px";
	SettingContainer.style.MozBorderRadius = "4px";
	SettingContainer.style.zIndex = 999;

	SettingContainer.setAttribute('vId', vId);
	d.body.appendChild(SettingContainer);

	$e(SettingContainer, "mousedown", function(event){
		if( event.target != $("fake3gokushiContainer")) {return false;}
		g_MD="fake3gokushiContainer";
		g_MX=event.pageX-parseInt(this.style.left,10);
		g_MY=event.pageY-parseInt(this.style.top,10);
		event.preventDefault();
	});

	$e(d, "mousemove", function(event){
		if(g_MD != "fake3gokushiContainer") return true;
		var SettingContainer = $("fake3gokushiContainer");
		if( !SettingContainer ) return true;
		var popupLeft = event.pageX - g_MX;
		var popupTop = event.pageY - g_MY;
		SettingContainer.style.left = popupLeft + "px";
		SettingContainer.style.top = popupTop + "px";
		//ポップアップ位置を永続保存
		GM_setValue(location.hostname + PGNAME + "_popup_left", popupLeft);
		GM_setValue(location.hostname + PGNAME + "_popup_top", popupTop);
	});

	$e(d, "mouseup", function(event){ g_MD=""; });
	var title = d.createElement("span");
	title.style.color = "#FFFFFF";
	title.style.font = 'bold 120% "ＭＳ ゴシック"';
	title.style.margin = "2px";
	title.innerHTML = "fake3gokushi ";

	var version = d.createElement("span");
	version.style.color = COLOR_TITLE;
	version.style.font = '96% "ＭＳ ゴシック"';
	version.style.margin = "2px";
	version.innerHTML = " Ver." + VERSION;

	var storageLimit = d.createElement("span");
	storageLimit.style.color = "#FFFFFF";
	storageLimit.style.font = '110% "ＭＳ Ｐゴシック"';
	storageLimit.style.margin = "2px";

	SettingContainer.appendChild(title);
	SettingContainer.appendChild(version);

	// ===== 画像変更 =====
	var Graphics_Box = d.createElement("table");
	    Graphics_Box.style.border = "solid 2px black";
	    Graphics_Box.style.margin = "0px 4px 4px 0px";
	    Graphics_Box.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 5;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ 武将画像入替 ■", 0 );
//	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var tr20 = d.createElement("tr");	tr20.style.backgroundColor = COLOR_BACK;		tr20.style.border = "solid 0px black";
	var tr21 = d.createElement("tr");	tr21.style.backgroundColor = COLOR_BACK;		tr21.style.border = "solid 0px black";
	var tr22 = d.createElement("tr");	tr22.style.backgroundColor = COLOR_BACK;		tr22.style.border = "solid 0px black";
	var tr23 = d.createElement("tr");	tr23.style.backgroundColor = COLOR_BACK;		tr23.style.border = "solid 0px black";
	var tr24 = d.createElement("tr");	tr24.style.backgroundColor = COLOR_BACK;		tr24.style.border = "solid 0px black";
	var tr25 = d.createElement("tr");	tr25.style.backgroundColor = COLOR_BACK;		tr25.style.border = "solid 0px black";
	var tr26 = d.createElement("tr");	tr26.style.backgroundColor = COLOR_BACK;		tr26.style.border = "solid 0px black";
	var tr27 = d.createElement("tr");	tr27.style.backgroundColor = COLOR_BACK;		tr27.style.border = "solid 0px black";
	var tr28 = d.createElement("tr");	tr28.style.backgroundColor = COLOR_BACK;		tr28.style.border = "solid 0px black";
	var tr29 = d.createElement("tr");	tr29.style.backgroundColor = COLOR_BACK;		tr29.style.border = "solid 0px black";

	var td201 = d.createElement("td");	td201.style.padding = "2px";		td201.style.verticalAlign = "top";
	var td202 = d.createElement("td");	td202.style.padding = "2px";		td202.style.verticalAlign = "top";
	var td203 = d.createElement("td");	td203.style.padding = "2px";		td203.style.verticalAlign = "top";
	var td204 = d.createElement("td");	td204.style.padding = "2px";		td204.style.verticalAlign = "top";
	var td205 = d.createElement("td");	td205.style.padding = "2px";		td205.style.verticalAlign = "top";

	var td211 = d.createElement("td");	td211.style.padding = "2px";		td211.style.verticalAlign = "top";
	var td212 = d.createElement("td");	td212.style.padding = "2px";		td212.style.verticalAlign = "top";
	var td213 = d.createElement("td");	td213.style.padding = "2px";		td213.style.verticalAlign = "top";
	var td214 = d.createElement("td");	td214.style.padding = "2px";		td214.style.verticalAlign = "top";
	var td215 = d.createElement("td");	td215.style.padding = "2px";		td215.style.verticalAlign = "top";

	var td221 = d.createElement("td");	td221.style.padding = "2px";		td221.style.verticalAlign = "top";
	var td222 = d.createElement("td");	td222.style.padding = "2px";		td222.style.verticalAlign = "top";
	var td223 = d.createElement("td");	td223.style.padding = "2px";		td223.style.verticalAlign = "top";
	var td224 = d.createElement("td");	td224.style.padding = "2px";		td224.style.verticalAlign = "top";
	var td225 = d.createElement("td");	td225.style.padding = "2px";		td225.style.verticalAlign = "top";

	var td231 = d.createElement("td");	td231.style.padding = "2px";		td231.style.verticalAlign = "top";
	var td232 = d.createElement("td");	td232.style.padding = "2px";		td232.style.verticalAlign = "top";
	var td233 = d.createElement("td");	td233.style.padding = "2px";		td233.style.verticalAlign = "top";
	var td234 = d.createElement("td");	td234.style.padding = "2px";		td234.style.verticalAlign = "top";
	var td235 = d.createElement("td");	td235.style.padding = "2px";		td235.style.verticalAlign = "top";

	var td241 = d.createElement("td");	td241.style.padding = "2px";		td241.style.verticalAlign = "top";
	var td242 = d.createElement("td");	td242.style.padding = "2px";		td242.style.verticalAlign = "top";
	var td243 = d.createElement("td");	td243.style.padding = "2px";		td243.style.verticalAlign = "top";
	var td244 = d.createElement("td");	td244.style.padding = "2px";		td244.style.verticalAlign = "top";
	var td245 = d.createElement("td");	td245.style.padding = "2px";		td245.style.verticalAlign = "top";

	var td251 = d.createElement("td");	td251.style.padding = "2px";		td251.style.verticalAlign = "top";
	var td252 = d.createElement("td");	td252.style.padding = "2px";		td252.style.verticalAlign = "top";
	var td253 = d.createElement("td");	td253.style.padding = "2px";		td253.style.verticalAlign = "top";
	var td254 = d.createElement("td");	td254.style.padding = "2px";		td254.style.verticalAlign = "top";
	var td255 = d.createElement("td");	td255.style.padding = "2px";		td255.style.verticalAlign = "top";

	var td261 = d.createElement("td");	td261.style.padding = "2px";		td261.style.verticalAlign = "top";
	var td262 = d.createElement("td");	td262.style.padding = "2px";		td262.style.verticalAlign = "top";
	var td263 = d.createElement("td");	td263.style.padding = "2px";		td263.style.verticalAlign = "top";
	var td264 = d.createElement("td");	td264.style.padding = "2px";		td264.style.verticalAlign = "top";
	var td265 = d.createElement("td");	td265.style.padding = "2px";		td265.style.verticalAlign = "top";

	var td271 = d.createElement("td");	td271.style.padding = "2px";		td271.style.verticalAlign = "top";
	var td272 = d.createElement("td");	td272.style.padding = "2px";		td272.style.verticalAlign = "top";
	var td273 = d.createElement("td");	td273.style.padding = "2px";		td273.style.verticalAlign = "top";
	var td274 = d.createElement("td");	td274.style.padding = "2px";		td274.style.verticalAlign = "top";
	var td275 = d.createElement("td");	td275.style.padding = "2px";		td275.style.verticalAlign = "top";

	var td281 = d.createElement("td");	td281.style.padding = "2px";		td281.style.verticalAlign = "top";
	var td282 = d.createElement("td");	td282.style.padding = "2px";		td282.style.verticalAlign = "top";
	var td283 = d.createElement("td");	td283.style.padding = "2px";		td283.style.verticalAlign = "top";
	var td284 = d.createElement("td");	td284.style.padding = "2px";		td284.style.verticalAlign = "top";
	var td285 = d.createElement("td");	td285.style.padding = "2px";		td285.style.verticalAlign = "top";

	var td291 = d.createElement("td");	td291.style.padding = "2px";		td291.style.verticalAlign = "top";
	var td292 = d.createElement("td");	td292.style.padding = "2px";		td292.style.verticalAlign = "top";
	var td293 = d.createElement("td");	td293.style.padding = "2px";		td293.style.verticalAlign = "top";
	var td294 = d.createElement("td");	td294.style.padding = "2px";		td294.style.verticalAlign = "top";
	var td295 = d.createElement("td");	td295.style.padding = "2px";		td295.style.verticalAlign = "top";

	Graphics_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Graphics_Box.appendChild(tr20);
	Graphics_Box.appendChild(tr21);
	Graphics_Box.appendChild(tr22);
	Graphics_Box.appendChild(tr23);
	Graphics_Box.appendChild(tr24);
	Graphics_Box.appendChild(tr25);
	Graphics_Box.appendChild(tr26);
	Graphics_Box.appendChild(tr27);
	Graphics_Box.appendChild(tr28);
	Graphics_Box.appendChild(tr29);

	tr20.appendChild(td201);	tr21.appendChild(td211);	tr22.appendChild(td221);	tr23.appendChild(td231);	tr24.appendChild(td241);
	tr20.appendChild(td202);	tr21.appendChild(td212);	tr22.appendChild(td222);	tr23.appendChild(td232);	tr24.appendChild(td242);
	tr20.appendChild(td203);	tr21.appendChild(td213);	tr22.appendChild(td223);	tr23.appendChild(td233);	tr24.appendChild(td243);
	tr20.appendChild(td204);	tr21.appendChild(td214);	tr22.appendChild(td224);	tr23.appendChild(td234);	tr24.appendChild(td244);
	tr20.appendChild(td205);	tr21.appendChild(td215);	tr22.appendChild(td225);	tr23.appendChild(td235);	tr24.appendChild(td245);

	tr25.appendChild(td251);	tr26.appendChild(td261);	tr27.appendChild(td271);	tr28.appendChild(td281);	tr29.appendChild(td291);
	tr25.appendChild(td252);	tr26.appendChild(td262);	tr27.appendChild(td272);	tr28.appendChild(td282);	tr29.appendChild(td292);
	tr25.appendChild(td253);	tr26.appendChild(td263);	tr27.appendChild(td273);	tr28.appendChild(td283);	tr29.appendChild(td293);
	tr25.appendChild(td254);	tr26.appendChild(td264);	tr27.appendChild(td274);	tr28.appendChild(td284);	tr29.appendChild(td294);
	tr25.appendChild(td255);	tr26.appendChild(td265);	tr27.appendChild(td275);	tr28.appendChild(td285);	tr29.appendChild(td295);
                                

	 ccreateText(td201, "text", "　武将№ ", "", 0);		ccreateTextBox(td202,"OPT_BNO0", OPT_BNO[0],"","",8,0);	   ccreateText(td203, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td204,"OPT_GNO0", OPT_GNO[0],"","",8,0);	   ccreateText(td205, "text", "に変更する。　", "", 0);
	 ccreateText(td211, "text", "　武将№ ", "", 0);		ccreateTextBox(td212,"OPT_BNO1", OPT_BNO[1],"","",8,0);	   ccreateText(td213, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td214,"OPT_GNO1", OPT_GNO[1],"","",8,0);	   ccreateText(td215, "text", "に変更する。　", "", 0);
	 ccreateText(td221, "text", "　武将№ ", "", 0);		ccreateTextBox(td222,"OPT_BNO2", OPT_BNO[2],"","",8,0);	   ccreateText(td223, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td224,"OPT_GNO2", OPT_GNO[2],"","",8,0);	   ccreateText(td225, "text", "に変更する。　", "", 0);
	 ccreateText(td231, "text", "　武将№ ", "", 0);		ccreateTextBox(td232,"OPT_BNO3", OPT_BNO[3],"","",8,0);	   ccreateText(td233, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td234,"OPT_GNO3", OPT_GNO[3],"","",8,0);	   ccreateText(td235, "text", "に変更する。　", "", 0);
	 ccreateText(td241, "text", "　武将№ ", "", 0);		ccreateTextBox(td242,"OPT_BNO4", OPT_BNO[4],"","",8,0);	   ccreateText(td243, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td244,"OPT_GNO4", OPT_GNO[4],"","",8,0);	   ccreateText(td245, "text", "に変更する。　", "", 0);
	 ccreateText(td251, "text", "　武将№ ", "", 0);		ccreateTextBox(td252,"OPT_BNO5", OPT_BNO[5],"","",8,0);	   ccreateText(td253, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td254,"OPT_GNO5", OPT_GNO[5],"","",8,0);	   ccreateText(td255, "text", "に変更する。　", "", 0);
	 ccreateText(td261, "text", "　武将№ ", "", 0);		ccreateTextBox(td262,"OPT_BNO6", OPT_BNO[6],"","",8,0);	   ccreateText(td263, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td264,"OPT_GNO6", OPT_GNO[6],"","",8,0);	   ccreateText(td265, "text", "に変更する。　", "", 0);
	 ccreateText(td271, "text", "　武将№ ", "", 0);		ccreateTextBox(td272,"OPT_BNO7", OPT_BNO[7],"","",8,0);	   ccreateText(td273, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td274,"OPT_GNO7", OPT_GNO[7],"","",8,0);	   ccreateText(td275, "text", "に変更する。　", "", 0);
	 ccreateText(td281, "text", "　武将№ ", "", 0);		ccreateTextBox(td282,"OPT_BNO8", OPT_BNO[8],"","",8,0);	   ccreateText(td283, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td284,"OPT_GNO8", OPT_GNO[8],"","",8,0);	   ccreateText(td285, "text", "に変更する。　", "", 0);
	 ccreateText(td291, "text", "　武将№ ", "", 0);		ccreateTextBox(td292,"OPT_BNO9", OPT_BNO[9],"","",8,0);	   ccreateText(td293, "text", "の画像を 画像№", "", 0);	ccreateTextBox(td294,"OPT_GNO9", OPT_GNO[9],"","",8,0);	   ccreateText(td295, "text", "に変更する。　", "", 0);

	// ===== その他 =====
	var Other_Box = d.createElement("table");
		Other_Box.style.border = "solid 2px black";
		Other_Box.style.margin = "0px 4px 4px 0px";
		Other_Box.style.width = "100%";
//		Other_Box.style.width = "420px";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 11;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ その他の設定 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";

	var td21 = d.createElement("td");	td21.style.padding = "3px";	ccreateText(td21, "text", " クエストの先生：　", "", 0);	td21.style.verticalAlign = "top";	td21.style.textAlign  = "right";	td21.style.width = "100px";
	var td22 = d.createElement("td");	td22.style.padding = "3px";	td22.appendChild( createRadioBtn ( 'MU', '美羽先生' ) );	td22.style.verticalAlign = "top";	td22.style.textAlign  = "left";	
	var td23 = d.createElement("td");	td23.style.padding = "3px";	td23.appendChild( createRadioBtn ( 'SR', '朱里先生' ) );	td23.style.verticalAlign = "top";	td23.style.textAlign  = "left";	

	Other_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Other_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);

	// 保存・閉じるボタン
	var Operation_Box = d.createElement("table");
		Operation_Box.style.border ="solid 0px gray";
		Operation_Box.style.fontFamily = "ＭＳ ゴシック";

	var tr711 = d.createElement("tr");
	var td711 = d.createElement("td");
		td711.style.padding = "3px";
		td711.style.verticalAlign = "top";

	Operation_Box.appendChild(tr711);
		tr711.appendChild(td711);

	ccreateButton(td711, "保存", "設定内容を保存します", function() {
		SaveSettingBox()
		alert("保存しました");
		closeSettingBox();
	});

	ccreateButton(td711, "閉じる", "設定内容を保存せず閉じます", function() {
		closeSettingBox();
	});

	// == コンテナ設定 ==
	// 上段
	var tbl000 = d.createElement("table");	// 全体
		tbl000.style.border = "solid 0px lime";

	var tr000 = d.createElement("tr");
	var td001 = d.createElement("td");	// 左枠
		td001.style.verticalAlign = "top";
//		td001.style.width = "340px";
		td001.appendChild(Graphics_Box);
		td001.appendChild(Other_Box);

	// 	レイアウト

	SettingContainer.appendChild(tbl000);
		tbl000.appendChild(tr000);
		tr000.appendChild(td001);


	SettingContainer.appendChild(Operation_Box);
}

// セーブ ==========================================================================================================================================================================
function SaveSettingBox(){

	strSave = "";
	for (i = 0; i < 20; i++){
		try {
			strSave += cgetTextBoxValue($("OPT_BNO" + i))   + DELIMIT2;
		} catch(e) {
			strSave += "0" + DELIMIT2;
		}
	}
	for (i = 0; i < 20; i++){
		try {
			strSave += cgetTextBoxValue($("OPT_GNO" + i))   + DELIMIT2;
		} catch(e) {
			strSave += "0" + DELIMIT2;
		}
	}

	strSave += OPT_TEACHER + DELIMIT2;

	GM_setValue(HOST+PGNAME, strSave);
}

// ロード ==========================================================================================================================================================================
function LoadSettingBox(){
	var src = GM_getValue(HOST+PGNAME, "");
	if (src == "") {
		OPT_TEACHER = "MU";
		return;
	}
	var Temp = src.split(DELIMIT2);
	for (i = 0; i < 20; i++){
		OPT_BNO[i]  = (Temp[i].trim());
	}
	for (i = 20; i < 40; i++){
		OPT_GNO[i-20]  = (Temp[i].trim());
	}
	OPT_TEACHER = Temp[40];
}

// 設定画面クローズ ================================================================================================================================================================
function closeSettingBox() {
	deleteSettingHtml();
	deleteSettingFrameHtml();
}

function deleteSettingHtml() {
	var elem = d.getElementById("fake3gokushiContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("fake3gokushiContainer"));
}

function deleteSettingFrameHtml() {
	var elem = d.getElementById("fake3gokushiContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("fake3gokushiContainer"));
}

// =================================================================================================================================================================================
// 汎用ルーチン
// =================================================================================================================================================================================
// テキストボックス
function ccreateTextBox(container, id, def, text, title, size, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "1px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	dv.style.paddingBottom = "1.5px";
	var tb = d.createElement("input");
	tb.type = "text";
	tb.id = id;
	tb.value = def;
	tb.size = size;
	tb.style.verticalAlign = "middle";
	tb.style.textAlign = "right";
	tb.style.paddingRight = "3px";

	var tx = d.createTextNode(text);
	tx.title = title;
	
	dv.appendChild(tx);
	dv.appendChild(tb);
	container.appendChild(dv);
	return tb;
}

// ラジオボタン作成
function createRadioBtn ( value, txt ) {
    var radioLabel = document.createElement('label');
    radioLabel.style.display = 'inline-block';
    radioLabel.style.margin = '0 5px 0 0';
    radioLabel.style.padding = '0px';
    radioLabel.addEventListener ( 'click', function(){ OPT_TEACHER = value; }, true );
    var radioLabelText = document.createTextNode(" " + txt);
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'Teacher';
    radioButton.value = value;
	radioButton.style.verticalAlign = "top";
//    radioButton.style.margin = '0 2px 0 0';
    if ( OPT_TEACHER == value ) radioButton.checked = true;
    radioLabel.appendChild( radioButton );
    radioLabel.appendChild( radioLabelText );
    return radioLabel;
}

function ccreateButton(container, text, title, func, width)
{
	var btn = d.createElement("input");
	btn.style.padding = "0px";
	btn.type = "button";
	btn.value = text;
	if (width == undefined) {
		btn.style.width = "54px";
	} else {
		btn.style.width = width + "px";
	}
	btn.style.height = "22px";
	btn.style.verticalAlign = "middle";
	btn.title = title;
	container.appendChild(d.createTextNode(" "));
	container.appendChild(btn);
	container.appendChild(d.createTextNode(" "));
	$e(btn, "click", func);
	return btn;
}

// テキスト
function ccreateText(container, id, text, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "1px";
	dv.style.paddingLeft= left + "px";
	dv.style.paddingBottom = "3px";

	var lb = d.createElement("label");
	lb.htmlFor = id;
	lb.style.verticalAlign = "middle";
	var tx = d.createTextNode(text);
	tx.fontsize = "10px";
	lb.appendChild( tx );

	dv.appendChild(lb);
	container.appendChild(dv);
}


// テキストボックスからテキストの取得
function cgetTextBoxValue(id)
{
	var c = id;
	if( !c ) return "";
	return c.value;
}

