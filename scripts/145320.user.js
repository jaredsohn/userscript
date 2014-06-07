// ==UserScript==
// @name			Facebook Special Memes and Emotions By Incaner
// @description	                Adds memes and Emotions bar
// @description	                Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Incaner
// @version			1.1
// @versionnumber	1.1
// ==/UserScript==
//


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
	
    var meme = '[[171108522930776]]'
    var kitty = '[[126138614064758]]'
    var butterfly = '[[126216480723638]]'
    var ugly = '[[348357068525962]]'
    var mad = '[[348367578524911]]'
	var umad = '[[331399223556184]][[286042634779174]][[330023780360758]][[329237617088409]][[204120926342364]][[131297490319188]][[289987304385341]]\n'+
'[[295847560451136]][[278880668827213]][[260560750675461]][[264494386943951]][[208640915887167]][[270643856326606]][[334868623190983]][[263173770411836]]\n'+
'[[265844723474789]][[325742447454304]][[207587629327321]][[294223273948603]][[323449457679402]][[258622847533513]][[242014162533924]][[158386917602797]]\n'+
'[[306019522772134]][[267712979948966]][[301751889864065]][[213122875437139]][[164020277032670]][[158735217564918]][[261124587284685]][[301991303173149]]\n'+
'[[114261558693806]][[113889888730617]][[316407155046042]][[316473595041291]][[346326392049037]][[284570571589911]][[298670736837009]][[186000198162731]]\n'+
'[[219939044752270]][[336155773063546]][[131032267012645]][[155856061183812]][[208532722565686]][[268249169896142]][[204863289602546]][[242397452496887]]\n'+
'[[199766206779497]][[157903644315266]][[212393248843131]]'
   var megusta = '[[10150425979186326]][[10150425979236326]][[10150425979391326]][[10150425979441326]][[10150425979466326]][[10150425979526326]]\n'+
'[[10150425979626326]][[10150425979671326]][[10150425979186326]][[10150425979186326]][[10150425979186326]][[10150425979986326]][[10150425980006326]]\n'+
'[[10150425980066326]][[10150425980101326]][[10150425980231326]][[10150425980436326]][[10150425980451326]][[10150425980506326]][[10150425980561326]]\n'+
'[[10150425980646326]][[10150425980686326]][[10150425980756326]][[10150425980831326]][[10150425980896326]][[10150425981096326]][[10150425981191326]]\n'+
'[[10150425981251326]][[10150425981306326]][[10150425981366326]][[10150425981406326]][[10150425981466326]][[10150425981516326]][[10150425981591326]]\n'+
'[[10150425981651326]][[10150425981796326]][[10150425981816326]][[10150425981876326]][[10150425981906326]][[10150425981966326]][[10150425982006326]]\n'+
'[[10150425979186326]][[10150425982066326]][[10150425982101326]][[10150425982131326]][[10150425982196326]][[10150425982261326]]'
  var jack = '[[204343736323493]][[204343749656825]][[204343762990157]][[204343772990156]][[204343802990153]][[204343809656819]][[204343826323484]]\n'+
'[[204343836323483]][[204343846323482]][[204343862990147]][[204343869656813]][[204343882990145]][[204343892990144]][[204343906323476]]\n'+
'[[204343919656808]][[204343929656807]][[204343939656806]][[204343949656805]][[204343956323471]][[204343976323469]][[204343982990135]]\n'+
'[[204343996323467]][[204344009656799]][[204344022990131]][[204344032990130]][[204344042990129]][[204344049656795]][[204344059656794]]\n'+
'[[204344069656793]][[204344079656792]][[204344089656791]][[204344096323457]][[204344102990123]][[204344109656789]][[204344129656787]]'
  var accept = '[[302111803167367]][[149973285111436]][[225420280866694]][[266125703443078]][[302489199795649]]\n'+
'[[159933744110623]][[306470046064676]][[335781066433134]][[327090507308616]][[209370209147382]]\n'+
'[[222595441151658]][[144479182330180]][[205625146193044]][[215374488545085]][[336008796427561]]\n'+
'[[313179355383436]][[135748553205834]][[250024168398519]][[197779800316568]][[224772264264878]]\n'+
'[[331777086834703]][[240760999329552]][[252187468180373]][[211171525634394]][[293830290654801]]\n'+
'[[223948214347966]][[332345496777020]][[336817752996147]][[327657930592556]][[197459897013106]]\n'+
'[[297685920273004]][[281899328524298]][[224880684253358]][[317833641571276]][[292082704177749]]'
  var poker = '[[258968244165876]][[286666501379430]][[262520713809098]][[159049157536013]][[307904395916212]]\n'+
'[[225447050864310]][[209926462425564]][[138411019605305]][[221670374577056]][[154671737968862]]\n'+
'[[138007062977844]][[291747794194724]][[122952454488304]][[337561022923016]][[288878907831075]]\n'+
'[[240630206008013]][[264223330304357]][[319462458078703]][[239286912807413]][[288721814513254]]\n'+
'[[265575850170635]][[345354905481875]][[209004679185391]][[259785247417432]][[159480014157666]]\n'+
'[[267428346644787]][[239034746168540]][[350046018344350]][[209260572491236]][[198316980259626]]\n'+
'[[310959705610393]][[214054278676095]][[200638253359905]][[334455703231303]][[158066514298630]]'
  var trues = '[[159403400834378]][[297487363621407]][[220961894649526]][[135921843188987]][[281219301903813]][[199562043466774]]\n'+
'[[295738517127851]][[155658844536513]][[209549519130890]][[142176999226854]][[246689415397308]][[199562043466774]]\n'+
'[[238766052862259]][[307299595976209]][[217652968315422]][[189042331191521]][[286721874712929]][[344476392245488]]\n'+
'[[208520335900424]][[280378908678680]][[289772571069549]][[271456079578545]][[316530365035101]][[288356997877538]]\n'+
'[[291702580880362]][[165637363538400]][[150244831751625]][[241130952627573]][[120930761357725]][[325867137432308]]\n'+
'[[154842501286195]][[286053358112869]][[149316288510313]][[250243511707871]][[291635414215481]][[344254632266885]]\n'+
'[[276412539074685]][[131586963624296]][[333374550025341]][[327570193933422]][[199699430120687]][[136021593179546]]'
 var alone = '[[222233554520712]][[155093667926316]][[159374644168797]]\n'+
'[[265556180170509]][[272006802857159]][[144596118984229]][[198806320212294]][[155432547893166]]\n'+
'[[239088996160999]][[293626150673074]][[203611766392684]][[214124502002999]][[268692779851733]]\n'+
'[[181312795299893]][[269771269745545]][[189131527848966]][[121039688013447]][[347460675267390]]\n'+
'[[116007985184523]][[267703239958069]][[209491689137152]][[335109106501612]][[286053824778978]]\n'+
'[[140147629431094]][[286265654759471]][[208524709231940]][[135568263223992]][[265887476807116]]'
 var mog = '[[159403400834378]][[301770873198029]][[124123621037582]][[165443303555885]][[225009720907841]][[159403400834378]]\n'+
'[[143280719116554]][[325784210773649]][[240857172651089]][[326582487367063]][[243056889098166]][[159403400834378]]\n'+
'[[100126866775028]][[344748918884490]][[198318970262933]][[264742153562246]][[156223974480296]][[199239846833770]]\n'+
'[[337718332906919]][[159071504197585]][[159142267522981]][[285550151496203]][[217302108349366]][[243642895706612]]\n'+
'[[159403400834378]][[297037847004108]][[273779062680713]][[206014099486621]][[329969420355991]][[222842284460715]]'
 var all = '[[159403400834378]][[335337556476356]][[226573210753581]][[213372122078493]][[245211842214707]][[260878743976480]]\n'+
'[[289233677790219]][[348654161814774]][[222705881138252]][[292141994165379]][[133154316800330]][[346337608726421]]\n'+
'[[100381450083206]][[313838608648951]][[166103506823935]][[314007935297068]][[139489826163004]][[269859583071892]]\n'+
'[[219146461499411]][[160313270740550]][[205765899512340]][[113268378788379]][[187383804691038]][[160834734023850]]'
 var fap = '[[204321616325705]][[204321639659036]][[204321652992368]][[204321669659033]][[204321682992365]][[204321689659031]]\n'+
'[[204321709659029]][[204321716325695]][[204321722992361]][[204321729659027]][[204321739659026]][[204321746325692]]\n'+
'[[204321759659024]][[204321769659023]][[204321786325688]][[204321792992354]][[204321799659020]][[204321812992352]]\n'+
'[[204321829659017]][[204321849659015]][[204321849659015]][[204321876325679]][[204321882992345]][[204321889659011]]\n'+
'[[204321896325677]][[204321906325676]][[204321916325675]][[204321929659007]][[204321939659006]][[204321949659005]]\n'+
'[[204321959659004]][[204321979659002]][[204321996325667]][[204322009658999]][[204322026325664]][[204322036325663]]'
 var yuno = '[[258484657551122]][[258484677551120]][[258484700884451]][[258484714217783]][[258484744217780]]\n'+
'[[258484767551111]][[258484804217774]][[258484827551105]][[258484844217770]][[258484857551102]]\n'+
'[[258484877551100]][[258484890884432]][[258484917551096]][[258484940884427]][[258484980884423]]\n'+
'[[258485007551087]][[258485037551084]][[258485060884415]][[258485104217744]][[258485144217740]]\n'+
'[[258485167551071]][[258485180884403]][[258485194217735]][[258485204217734]][[258485230884398]]'
var gtfo = '[[259771957421166]][[259771970754498]][[259771987421163]][[259772000754495]][[259772010754494]]\n'+
'[[259772017421160]][[259772037421158]][[259772054087823]][[259772070754488]][[259772090754486]]\n'+
'[[259772127421149]][[259772140754481]][[259772154087813]][[259772164087812]][[259772170754478]]\n'+
'[[259772187421143]][[259772197421142]][[259772214087807]][[259772220754473]][[259772230754472]]\n'+
'[[259772247421137]][[259772257421136]][[259772270754468]][[259772284087800]][[259772297421132]]'
var yao = '[[190350121060720]][[190350151060717]][[190350224394043]][[190350264394039]][[190350274394038]][[190350321060700]][[190350337727365]]\n'+
'[[190350524394013]][[190350544394011]][[190350651060667]][[190350811060651]][[190350824393983]][[190350837727315]][[190350851060647]]\n'+
'[[190351834393882]][[190351844393881]][[190354824393583]][[190354847726914]][[190354857726913]][[190356574393408]]\n'+
'[[190357747726624]][[190357764393289]][[190357774393288]][[190359411059791]][[190359441059788]][[190359467726452]]\n'+
'[[190365544392511]][[190368041058928]][[190368054392260]][[190368067725592]][[190370207725378]][[190370234392042]]\n'+
'[[190370834391982]][[190370844391981]][[190373951058337]][[190373964391669]][[190373981058334]][[190373987725000]]\n'+
'[[190374151058317]][[190374177724981]][[190374184391647]][[190374207724978]][[190374234391642]][[190374251058307]]\n'+
'[[190374704391595]][[190374731058259]][[190374761058256]][[190374781058254]][[190374787724920]][[190374814391584]]'
var no = '[[272107609513061]][[272107626179726]][[272107646179724]][[272107652846390]]\n'+
'[[272107682846387]][[272107706179718]][[272107716179717]][[272107726179716]]\n'+
'[[272107736179715]][[272107752846380]][[272107769513045]][[272107782846377]]\n'+
'[[272107796179709]][[272107809513041]][[272107826179706]][[272107832846372]]\n'+
'[[272107852846370]][[272107866179702]][[272107882846367]][[272107892846366]]'
var dbumtss = '[[272168252840330]][[272168266173662]][[272168279506994]][[272168289506993]]\n'+
'[[272168306173658]][[272168316173657]][[272168336173655]][[272168349506987]]\n'+
'[[272168359506986]][[272168369506985]][[272168379506984]][[272168386173650]]\n'+
'[[272168396173649]][[272168406173648]][[272168429506979]][[272168436173645]]'
var ilied = '[[272154016175087]][[272154026175086]][[272154039508418]][[272154062841749]][[272154082841747]]\n'+
'[[272154092841746]][[272154102841745]][[272154122841743]][[272154132841742]][[272154149508407]]\n'+
'[[272154162841739]][[272154176175071]][[272154196175069]][[272154222841733]][[272154242841731]]\n'+
'[[272154252841730]][[272154272841728]][[272154286175060]][[272154296175059]][[272154306175058]]\n'+
'[[272154312841724]][[272154329508389]][[272154346175054]][[272154372841718]][[272154386175050]]'
var fuckyou = '[[291245247589152]][[291245257589151]][[291245274255816]][[291245314255812]]\n'+
'[[291245350922475]][[291245370922473]][[291245404255803]][[291245440922466]]\n'+
'[[291245480922462]][[291245500922460]][[291245537589123]][[291245550922455]]\n'+
'[[291245580922452]][[291245587589118]][[291245597589117]][[291245607589116]][[291245620922448]]\n'+
'[[291245644255779]][[291245660922444]][[291245670922443]][[291245697589107]][[291245720922438]]'
var kiddinme = '[[247748265295055]][[247748738628341]][[247748758628339]][[247748771961671]][[247748795295002]][[247748808628334]][[247748841961664]]\n'+
'[[247748861961662]][[247748868628328]][[247748898628325]][[247748931961655]][[247748938628321]][[247748955294986]][[247748975294984]]\n'+
'[[247748981961650]][[247749001961648]][[247749018628313]][[247749035294978]][[247749048628310]][[247749101961638]][[247749128628302]]\n'+
'[[247749148628300]][[247749181961630]][[247749205294961]][[247749241961624]][[247749278628287]][[247749315294950]][[247749331961615]]\n'+
'[[247749351961613]][[247749371961611]][[247749388628276]][[247749401961608]][[247749651961583]][[247749688628246]][[247749718628243]]\n'+
'[[247749748628240]][[247749781961570]][[247749815294900]][[247749845294897]][[247749878628227]][[247749911961557]][[247749935294888]]\n'+
'[[247749951961553]][[247749968628218]][[247749991961549]][[247750005294881]][[247750038628211]][[247750068628208]][[247750081961540]]'
var cguy = '[[293997730635447]][[293997767302110]][[293997777302109]][[293997787302108]][[293997790635441]]\n' +
'[[293997800635440]][[293997810635439]][[293997820635438]][[293997837302103]][[293997863968767]]\n' +
'[[293997870635433]][[293997897302097]][[293997913968762]][[293997943968759]][[293997960635424]]\n' +
'[[293997973968756]][[293998003968753]][[293998027302084]][[293998043968749]][[293998113968742]]\n' +
'[[293998137302073]][[293998150635405]][[293998163968737]][[293998197302067]][[293998213968732]]'
var fucky = '[[247756668627548]][[247756691960879]][[247756705294211]][[247756735294208]][[247756755294206]][[247756768627538]][[247756788627536]]\n' +
'[[247756798627535]][[247756821960866]][[247756835294198]][[247756851960863]][[247756865294195]][[247756885294193]][[247756898627525]]\n' +
'[[247756921960856]][[247756931960855]][[247756951960853]][[247756968627518]][[247756981960850]][[247756991960849]][[247757005294181]]\n' +
'[[247757011960847]][[247757021960846]][[247757035294178]][[247757048627510]][[247757071960841]][[247757088627506]][[247757101960838]]\n' +
'[[247757121960836]][[247757138627501]][[247757145294167]][[247757161960832]][[247757178627497]][[247757205294161]][[247757218627493]]\n' +
'[[247757245294157]][[247757261960822]][[247757281960820]][[247757298627485]][[247757315294150]][[247757328627482]][[247757338627481]]\n' +
'[[247757355294146]][[247757381960810]][[247757395294142]][[247757405294141]][[247757411960807]][[247757421960806]][[247757448627470]]'
var hardcore = '[[204956799595520]][[204956816262185]][[204956829595517]][[204956846262182]][[204956856262181]]\n' +
'[[204956872928846]][[204956889595511]][[204956906262176]][[204956919595508]][[204956929595507]]\n' +
'[[204956946262172]][[204956969595503]][[204956986262168]][[204956999595500]][[204957009595499]]\n' +
'[[204957056262161]][[204957076262159]][[204957092928824]][[204957102928823]][[204957172928816]]'
var wtf = '[[144040165708723]][[144040179042055]][[144040199042053]][[144040215708718]][[144040229042050]][[144040239042049]][[144040255708714]]\n' +
'[[144040272375379]][[144040302375376]][[144040312375375]][[144040332375373]][[144040342375372]][[144040355708704]][[144040385708701]]\n' +
'[[144040399042033]][[144040409042032]][[144040435708696]][[144040459042027]][[144040475708692]][[144040485708691]][[144040512375355]]\n' +
'[[144040532375353]][[144040545708685]][[144040552375351]][[144040569042016]][[144040592375347]][[144040619042011]][[144040635708676]]\n' +
'[[144040652375341]][[144040672375339]][[144040715708668]][[144040722375334]][[144040745708665]][[144040755708664]][[144040785708661]]'
var youdontsay = '[[204338849657315]][[204338862990647]][[204338869657313]][[204338879657312]][[204338889657311]][[204338899657310]]\n' +
'[[204338912990642]][[204338936323973]][[204338946323972]][[204338956323971]][[204338969657303]][[204338986323968]]\n' +
'[[204338992990634]][[204338999657300]][[204339006323966]][[204339022990631]][[204339036323963]][[204339042990629]]\n' +
'[[204339052990628]][[204339072990626]][[204339082990625]][[204339109657289]][[204339122990621]][[204339136323953]]\n' +
'[[204339142990619]][[204339152990618]][[204339162990617]][[204339169657283]][[204339186323948]][[204339196323947]]\n' +
'[[204339209657279]][[204339219657278]][[204339226323944]][[204339242990609]][[204339249657275]][[204339259657274]]'
var trolldad = '[[204351622989371]][[204351652989368]][[204351666322700]][[204351676322699]][[204351696322697]]\n' +
'[[204351716322695]][[204351736322693]][[204351752989358]][[204351769656023]][[204351782989355]]\n' +
'[[204351799656020]][[204351829656017]][[204351842989349]][[204351852989348]][[204351866322680]]\n' +
'[[204351879656012]][[204351886322678]][[204351902989343]][[204351926322674]][[204351939656006]]\n' +
'[[204351962989337]][[204351982989335]][[204351989656001]][[204351996322667]][[204352009655999]]\n' +
'[[204352022989331]][[204352036322663]][[204352042989329]][[204352062989327]][[204352072989326]]\n' +
'[[204352086322658]][[204352106322656]][[204352142989319]][[204352166322650]][[204352166322650]]'
	spemotsInfo = [meme, 'https://graph.facebook.com/171108522930776/picture',mad, 'https://graph.facebook.com/348367578524911/picture',ugly, 'https://graph.facebook.com/348357068525962/picture',butterfly, 'https://graph.facebook.com/126216480723638/picture',kitty, 'https://graph.facebook.com/126138614064758/picture', megusta, 'http://butteredtoast.org/F7U12Addon/images/megusta.png', jack, 'http://i0.kym-cdn.com/photos/images/list/000/185/168/misc-jackie-chan-l.png', fap, 'http://i0.kym-cdn.com/entries/icons/tiny/000/005/939/Fap%20Guy%20Meme.png',  yao , 'http://t1.gstatic.com/images?q=tbn:ANd9GcQwUdKzke2i1LBj_IYWYujKpDKzQRJWzye8lQAptGDgrbrmXPtozb7JpIw', no , 'http://img205.imageshack.us/img205/8443/81cebb2014cb46efb1b9869.png', dbumtss,'http://img696.imageshack.us/img696/3426/cae1296481aa4430889bd77.png',ilied,'http://img688.imageshack.us/img688/6753/350b6af2bb314911b6deeb8.png', fuckyou,'http://img189.imageshack.us/img189/5334/8dee47fbba564d468d70b02.png',kiddinme,'http://img26.imageshack.us/img26/6636/074e086bf37e41368316977.png', cguy, 'http://img337.imageshack.us/img337/310/892d3e552a094e5eadf8454.png', fucky, 'http://lh4.ggpht.com/_EdWrfJxxD_I/TJsgE-uVppI/AAAAAAAAEsY/Bl7LRZlXgCc/fuckyea.png', hardcore, 'http://img525.imageshack.us/img525/930/7b3671b83915492cb04e167.png', wtf, 'http://img862.imageshack.us/img862/4417/8a942223273b4ad797eef1f.png', youdontsay, 'http://img197.imageshack.us/img197/1096/4cb92a5e68c74d03ab5d6d6.png', trolldad, 'http://img840.imageshack.us/img840/3401/6e8d74a62af34a78bcc3ae2.png'];                                                                            
    spemotsTitle = ['MeMe', ' ','Mad Smile', ' ','Ugly Smile', ' ','Butterfly', ' ','kitty wearing headphones', ' ','MeGusta', ' ','Jackie Chan', ' ', 'Fap', ' ','Bitch Please',' ','No',' ','Ba Dum Tsss',' ','I Lied',' ','Fuck You',' ','Are you kidding me', ' ', 'Careal Guy', ' ', 'Whyyyy', ' ', 'Obama not bad', ' ', 'awwww yeaahhh', ' ', 'fuuuuuuu', ' ', 'Fuckyeah', ' ', 'so hardcore', ' ', 'That scared guy', ' ', 'you don\'t say', ' ', 'trolldad', ' '];
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
shortcut.add('Ctrl+1',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = umad; });
shortcut.add('Ctrl+2',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = megusta; });
shortcut.add('Ctrl+3',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = jack; });
shortcut.add('Ctrl+4',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = accept; });
shortcut.add('Ctrl+5',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = poker; });
shortcut.add('Ctrl+6',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = trues; });
shortcut.add('Ctrl+7',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = alone; });
shortcut.add('Ctrl+8',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = mog; });
shortcut.add('Ctrl+9',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = all; });
shortcut.add('Ctrl+0',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = fap; });