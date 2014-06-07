// ==UserScript==
// @name        百度貼吧繁體字
// @namespace   http://userscripts.org/scripts/show/150073
// @description 這個用戶腳本可以讓你在百度貼吧正常發表繁體中文文字，避免被強制（有時甚至錯誤地）轉換為簡體；同時支援發表任何Unicode擴展字元。Post Traditional Chinese and any Unicode characters in Baidu Tieba
// @include     http://tieba.baidu.com/f*
// @include     http://tieba.baidu.com.cn/f*
// @include     http://tieba.baidu.cn/f*
// @include     http://tieba.baidu.com/p*
// @include     http://tieba.baidu.com.cn/p*
// @include     http://tieba.baidu.cn/p*
// @updateURL   https://userscripts.org/scripts/source/150073.meta.js
// @downloadURL https://userscripts.org/scripts/source/150073.user.js
// @version     4.8
// @author      tomchen1989 <tomchen1989[AT]yahoo.com.cn>
// @license     MIT/Expat License
// ==/UserScript==

//Oppa Gangnam Style!!!

(function () {

//characters in CJK Unified Ideographs original set (4E00-9FFF) that are forced to be converted to simplified Chinese characters; plus characters in all plane 0 CJK blocks that are improperly converted to other characters
var reg = /[丟並亂亙亞伕佇佈佔佪併來侖侚侶侷俁係俠俵倀倆倉個們倖倣倫偉偪側偵偺偽傈傑傖傘備傚傢傭傯傳傴債傷傾僂僅僉僊僑僕僞僣僥僨僱價儀儂億儅儈儉儐儔儕儘償優儲儷儸儺儻儼兇兌兒兗內兩冊冑冪凅凈凍凜凱別刪剄則剉剋剎剛剝剮剴創剷劃劄劇劉劊劌劍劑勁動務勛勝勞勢勣勦勱勳勵勸勻匋匭匯匱區卄協卬卹卻厙厠厭厲厴參叡叢吳吶呂咷咼員唄唸問啓啗啞啟啣喚喪喫喬單喲嗆嗇嗎嗚嗩嗶嘆嘍嘔嘖嘗嘜嘩嘮嘯嘰嘵嘸噁噓噠噥噦噯噲噴噸噹嚀嚇嚌嚐嚕嚙嚥嚦嚨嚮嚳嚴嚶囀囁囂囅囈囉囌囑囓囪圇國圍園圓圖團坵埜埡執埼堅堊堝堯報場堿塊塋塏塒塗塚塢塤塵塹墊墑墜墫墮墳墻墾壇壎壓壘壙壚壞壟壢壩壯壺壽夠夢夾奐奧奩奪奬奮妝妳姍姦姪娛婁婦婬婭媧媮媯媼媽媿嫋嫗嫵嫻嬀嬈嬋嬌嬙嬝嬡嬤嬪嬭嬰嬸孃孌孫學孿宮寢實寧審寫寬寵寶將專尋對導尷屆屍屜屝屢層屨屬岡峴島峽崍崑崗崙崠崢崳嵐嵒嶁嶄嶇嶗嶠嶧嶸嶺嶼嶽巋巒巔巖巰巹帥師帳帶幀幃幗幘幟幣幫幬幵幹幾庂庫廁廂廄廈廚廝廟廠廡廢廣廩廬廱廳弒弔弳張強彆彈彊彌彎彙彥彫彿後徑從徠復徬徹忷恆恟恥悅悵悶悽惇惡惱惲惷惻愛愜愨愴愷愾慄慇態慍慘慚慟慣慤慪慫慮慳慶慼慾憂憊憐憑憒憚憤憫憮憲憶懃懇應懌懍懞懟懣懨懲懶懷懸懺懼懾戀戇戔戧戩戰戲戶扺抴拋挌挶挾捨捫捲掃掄掙掛採揀揚換揮揹搆損搖搗搟搥搯搶搾摀摃摑摜摟摯摳摶摻撈撐撓撚撟撢撣撥撦撫撲撳撻撾撿擁擄擇擊擋擔據擠擣擬擯擰擱擲擴擷擺擻擼擾攄攆攏攔攖攙攛攜攝攢攣攤攪攬攷敗敘敵數斂斃斕斬斷旂旛昇時晉晝暈暉暢暫暱曄曆曇曉曖曠曬書會朢朧朮杇東枴柵柺栒桮桿梔條梟梱棄棖棗棟棧棲椏楄楊楓楙楨業極榐榦榪榮榿槃構槍槓槤槧槨槳樁樂樅樑樓標樞樣樸樹樺橈橋機橢橦橫檁檉檔檜檢檣檯檳檷檸檻櫂櫃櫐櫓櫚櫛櫝櫞櫟櫥櫧櫨櫪櫫櫬櫳櫸櫺櫻欄權欏欒欖欞欸欽歎歐歟歡歲歷歸歿殀殘殞殤殫殭殮殯殲殺殻殼殽毀毆毌毿氈氌氣氫氬氳汆汍汎汙決沍沒沖況泝洟洩洶浬浹涇涼淒淚淥淨淪淵淶淺渙減渦測渾湊湞湣湧湯溈準溝溫溼滄滅滌滎滬滯滲滷滸滾滿漁漚漢漣漬漲漵漸漿潁潑潔潙潛潤潯潰潷潿澀澂澆澇澗澠澤澩澮澱濁濃濕濘濛濟濤濫濬濰濱濺濼濾瀁瀅瀆瀉瀋瀏瀕瀘瀝瀟瀠瀦瀧瀨瀰瀲瀾灃灄灑灕灘灝灣灤灩災為烏烴無煉煒煖煙煢煥煩煬熒熗熱熾燁燄燈燉燒燙燜營燦燬燭燴燻燼燾爍爐爛爭爲爺爾牆牘牠牽犖犢犧狀狹狽猙猶猻獃獄獅獎獨獪獫獰獲獵獷獸獺獻獼玀玅玆玨珮現琺琿瑋瑣瑤瑩瑪瑯璉璣璦環璽瓊瓏瓔瓖瓚甌甕產産甦甪畝畢畫畬異當疇疊疿痙痠痲痳痺痾瘉瘋瘍瘓瘞瘡瘧瘺療癆癇癉癒癘癟癡癢癤癥癩癬癭癮癰癱癲發皁皚皰皸皺盃盜盞盡監盤盧盪眾睏睜睞睪瞇瞞瞭瞼矇矓矚矯砲硃硤硨硯硷碩碭確碼磚磣磧磯磽礎礙礡礦礪礫礬礱祂祇祐祕祼祿禍禎禦禪禮禰禱禿稅稈稟稨種稱穀穌積穎穡穢穨穩穫窩窪窮窯窶窺竄竅竇竈竊竪競笻筆筍筧筴箄箇箋箏箠節範築篋篤篩篲篳簀簍簞簡簣簫簷簽簾籃籌籜籟籠籤籥籩籪籬籮籲粧粵糝糞糧糰糲糴糶糾紀紂約紅紆紇紈紉紋納紐紓純紕紗紙級紛紜紡紮細紱紲紳紹紺紼紿絀終絃組絆絎結絕絛絞絡絢給絨統絲絳絶絹綁綃綆綈綉綏綑經綜綞綠綢綣綫綬維綰綱網綳綴綵綸綹綺綻綽綾綿緄緇緊緋緑緒緗緘緙線緝緞締緡緣緦編緩緬緯緱緲練緶緹緻縈縉縊縋縐縑縚縛縝縞縟縣縧縫縭縮縯縱縲縳縴縵縶縷縹總績繃繅繆繈繒織繕繙繚繞繡繢繩繪繫繭繯繰繳繹繼繽繾纈纊續纍纏纓纔纖纘纜缽缾罈罌罎罦罰罵罷羅羆羈羋羥羨義羶習翹耑耡耤耬聖聞聯聰聲聳聵聶職聹聽聾肅肐胇胊脅脈脛脣脩脫脹腎腡腦腫腳腸膃膆膚膠膩膽膾膿臉臍臏臕臘臙臚臟臠臥臨臺與興舉舊舋舖艙艣艤艦艫艱艷芻苧苺茍茲荅荊荳莊莖莢莧菫華菴萇萊萬萵萹葉葒葦葯葷蒐蒔蒞蒼蓀蓆蓋蓮蓯蓴蓽蔆蔔蔞蔣蔥蔦蔭蕁蕆蕎蕓蕕蕘蕢蕩蕪蕭蕷薈薊薌薑薔薙薟薦薩薺藍藎藚藝藥藪藴藶藷藹藺蘄蘆蘇蘊蘋蘗蘚蘞蘢蘭蘺蘿處虛虜號虧虯蛺蛻蜆蜺蝕蝟蝦蝨蝸螄螞螢螻蟄蟈蟣蟬蟯蟲蟶蟺蟻蠅蠆蠍蠐蠑蠔蠟蠣蠱蠶蠷蠻衃衆衊衒術衚衛衝衹袞袪裊補裝裡製複褎褲褳褸褻襇襉襖襝襠襤襪襬襯襲覈見規覓視覘覡覦親覬覯覲覷覺覽覿觀觝觴觶觸訂訃計訊訌討訐訓訕訖託記訛訝訟訢訣訥訪設許訴訶診註証詁詆詎詐詒詔評詘詛詞詠詡詢詣試詩詫詬詭詮詰話該詳詵詶詻詼詿誄誅誆誇誌認誑誒誕誘誚語誠誡誣誤誥誦誨說説誰課誶誹誼調諂諄談諉請諍諏諑諒論諗諛諜諞諠諢諤諦諧諫諭諮諱諳諶諷諸諺諼諾謀謁謂謄謅謊謎謐謔謖謗謙謚講謝謠謡謨謫謬謳謹謼謾譁譆證譎譏譔譖識譙譚譜譟譫譭譯議譴護譽譾讀變讎讒讓讕讖讚讜讞谿豈豎豐豔豬貍貓貝貞負財貢貧貨販貪貫責貯貰貲貳貴貶買貸貺費貼貽貿賀賁賂賃賄賅資賈賊賑賒賓賕賙賚賜賞賠賡賢賣賤賦賧質賬賭賴賺賻購賽賾贄贅贈贊贋贍贏贐贓贖贗贛贜趕趙趨趲跡踐踫踰踴蹌蹕蹟蹠蹣蹤蹧蹺躉躊躋躍躑躒躓躕躚躡躥躦躪軀車軋軌軍軒軔軛軟軫軸軹軺軻軼軾較輅輇載輊輒輓輔輕輛輜輝輞輟輥輦輩輪輯輳輸輻輾輿轂轄轅轆轉轍轎轔轟轡轢轤辦辭辮辯農迴迺逕這連週進遊運過達違遙遜遞遠適遲遷選遺遼邁還邇邊邏邐郟郵鄆鄉鄒鄔鄖鄧鄭鄰鄲鄴鄶鄺酈醃醆醖醜醞醫醬醱釀釁釃釅釆釋釐釓釔釕釗釘釙針釣釤釦釧釩釬釵釷釹鈀鈁鈄鈉鈍鈎鈐鈑鈔鈕鈞鈣鈥鈦鈧鈮鈰鈳鈴鈷鈸鈹鈺鈽鈾鈿鉀鉅鉆鉈鉉鉋鉍鉑鉗鉚鉛鉞鉢鉤鉦鉬鉭鉸鉺鉻鉿銀銃銅銑銓銖銘銚銜銠銣銥銦銨銩銪銫銬銲銳銷銹銻銼鋁鋃鋅鋇鋌鋏鋒鋝鋟鋤鋦鋨鋪鋭鋮鋯鋰鋱鋸鋼錁錄錆錈錐錒錕錘錙錚錛錟錠錢錦錨錫錮錯録錳錶錸鍆鍇鍋鍍鍔鍘鍛鍤鍥鍬鍰鍵鍶鍺鍼鍾鎂鎊鎌鎖鎗鎘鎢鎣鎦鎧鎩鎪鎬鎮鎰鎳鎵鎸鏃鏇鏈鏌鏍鏑鏗鏘鏜鏝鏞鏟鏡鏢鏤鏨鏵鏷鏹鏽鐃鐉鐋鐐鐒鐓鐔鐘鐙鐠鐨鐫鐮鐲鐳鐵鐶鐸鐺鐿鑄鑊鑌鑑鑒鑠鑣鑤鑪鑭鑰鑲鑵鑷鑼鑽鑾鑿長門閂閃閆閉開閌閎閏閑閒間閔閘閡閣閤閥閨閩閫閬閭閱閲閶閹閻閼閽閾閿闃闆闇闈闊闋闌闐闔闕闖關闞闡闢闥陏陘陝陞陣陰陳陸陽隄隉隊階隕際隤隨險隱隴隸隻雋雖雙雛雜雞離難雲電霤霧霽靂靄靈靚靜靦靨鞏鞦韃韆韉韋韌韓韙韜韞韻響頁頂頃項順頇須頊頌頎頏預頑頒頓頗領頜頡頤頦頭頰頷頸頹頻頽顆題額顎顏顓顔願顙顛類顢顥顧顫顯顰顱顳顴風颮颯颱颳颶颼飄飆飛飢飩飪飫飭飯飲飴飼飽飾餃餅餈餉養餌餑餒餓餔餘餚餛餞餡館餬餱餳餼餽餾餿饃饅饈饉饋饌饑饒饗饜饞饟馬馭馮馱馳馴駁駐駑駒駔駕駘駙駛駝駟駡駢駭駮駱駿騁騃騅騍騎騏騖騙騣騫騭騮騰騶騷騸騾驀驁驂驃驄驅驊驍驏驕驗驚驛驟驢驤驥驪骯髏髒體髕髖髮鬆鬍鬚鬢鬥鬧鬨鬩鬮鬱魎魘魚魯魴魷鮐鮑鮒鮚鮝鮞鮪鮫鮭鮮鯀鯁鯇鯉鯊鯔鯖鯗鯛鯡鯢鯤鯧鯨鯪鯫鯰鯽鰈鰉鰍鰐鰒鰓鰣鰥鰨鰩鰭鰱鰲鰳鰷鰹鰻鰾鱈鱉鱒鱔鱖鱗鱘鱟鱧鱭鱷鱸鱺鳥鳧鳩鳬鳳鳴鳶鴆鴇鴈鴉鴕鴛鴝鴟鴣鴦鴨鴯鴰鴻鴿鵂鵑鵒鵓鵜鵝鵠鵡鵪鵬鵯鵰鵲鶇鶉鶘鶚鶩鶯鶴鶻鶼鶿鷂鷄鷓鷗鷙鷚鷥鷦鷯鷰鷲鷳鷴鷸鷹鷺鸕鸚鸛鸝鸞鹵鹹鹺鹼鹽麗麥麩麯麵黃黌點黨黲黴黷黽黿鼇鼉鼴齊齋齏齒齔齙齜齟齠齡齣齦齧齪齬齲齶齷龍龐龔龕龜⺁⺄⺈⺋⺌⺗⺧⺪⺮⺳⺶⺷⺻⻊〝〞〾兀︰︱︳㑇㑳㖞㘎㘚㤘㥮㧏㧐㧟㩳㭎㱮㳠䁖䅟䌷䎬䎱䏝䓖䙌䙡䜣䜩䝼䞍䥇䥺䥽䦂䦃䦅䦆䦛䦟䦶䦷䱷䲟䲠䲡䲢䲣䴓䴔䴕䴖䴗䴘䴙䶮\u2FF0-\u2FFF\u3220-\u3229\uFE35-\uFE44]/g;

function getUnsafeWindow() {
	if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
		return this.unsafeWindow;
	} else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
		var node = document.createElement("div");
		node.setAttribute("onclick", "return window;");
		return node.onclick();
	} else {//Opera, IE7Pro, etc.
		return window;
	}
}
var myWindow = getUnsafeWindow();

function dec2hexNCR(num) {
	return "&#x" + num.toString(16).toUpperCase() + ";";
}

function hex2decNCR(hexStr) {
	return "&#" + parseInt(hexStr, 16) + ";";
}

function conv(str) {
	return str
		.replace(reg, function(cha) {
			return dec2hexNCR(cha.charCodeAt(0));//convert to hex NCRs
		})
		.replace(/[\uD800-\uDB7F][\uDC00-\uDFFF]/g, function(cha) {//plane 1-14 (10000-EFFFF)
			return dec2hexNCR(((cha.charCodeAt(0) - 0xD800) << 10) + cha.charCodeAt(1) + 0x2400);//0x2400 = - 0xDC00 + 0x10000. thanks 山人通用
		})
		.replace(/&#x([0-9A-E]{0,1}8964|8964[0-9A-F]);/g, function(cha, hex) {//characters in plane 1-14, whose code points are blacklisted
			return hex2decNCR(hex);//convert hex NCRs to dec NCRs to bypass the blacklist
		});
}

//modify normal post method
(function cycle() {
	if (myWindow.rich_postor && myWindow.rich_postor._editor) {
		var tempFunc = myWindow.rich_postor._editor.getHtml;
		myWindow.rich_postor._editor.getHtml = function() {
			return conv(tempFunc.call(myWindow.rich_postor._editor));
		}
	} else {
		setTimeout(cycle, 50);
	}
})();

//modify lzl method
(function cycle2() {
	if (myWindow.SimplePostor && myWindow.SimplePostor.prototype._getHtml) {
		var tempFunc = myWindow.SimplePostor.prototype._getHtml;
		myWindow.SimplePostor.prototype._getHtml = function() {
			return conv(tempFunc.call(this));
		}
	} else {
		setTimeout(cycle2, 50);
	}
})();

})();