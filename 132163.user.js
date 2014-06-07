// ==UserScript==
// @name			Facebook Meme Chat Emoticons Bar
// @description	                Adds meme emoticon bar to Facebook chat
// @description	        Visit turbolego.com/L.txt.
// @description	        Report bugs at theztech@connect.to
// @description	        Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Tech, geewid
// @version			2
// @versionnumber	3
// @namespace		http://userscripts.org/scripts/show/132163
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
	

	
	var umad = '[[332913536739261]][[332913540072594]][[332913546739260]][[332913533405928]][[332913543405927]][[332913640072584]]\n' + 
'[[332913633405918]][[332913626739252]][[332913630072585]][[332913636739251]][[332913696739245]][[332913700072578]]\n' +
'[[332913693405912]][[332913686739246]][[332913690072579]][[332913740072574]][[332913750072573]][[332913743405907]]\n' +
'[[332913753405906]][[332913746739240]][[332913846739230]][[332913843405897]][[332913840072564]][[332913850072563]]\n' +
'[[332913853405896]][[332913916739223]][[332913913405890]][[332913920072556]][[332913923405889]][[332913930072555]]\n' +
'[[332913976739217]][[332913973405884]][[332913970072551]][[332913980072550]][[332913983405883]][[332914030072545]]'
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
  var accept = '[[293378587382025]][[293378597382024]][[293378594048691]][[293378600715357]][[293378604048690]][[293378700715347]]\n' +
'[[293378704048680]][[293378710715346]][[293378697382014]][[293378707382013]][[293378770715340]][[293378757382008]]\n' +
'[[293378764048674]][[293378767382007]][[293378760715341]][[293378824048668]][[293378817382002]][[293378820715335]]\n' +
'[[293378810715336]][[293378814048669]][[293378887381995]][[293378890715328]][[293378897381994]][[293378894048661]]\n' +
'[[293378884048662]][[293378974048653]][[293378970715320]][[293378967381987]][[293378977381986]][[293378980715319]]'
  var poker = '[[326361300743816]][[326361304077149]][[326361307410482]][[326361314077148]]\n' +
'[[326361310743815]][[326361397410473]][[326361400743806]][[326361404077139]]\n' +
'[[326361407410472]][[326361410743805]][[326361457410467]][[326361464077133]]\n' +
'[[326361460743800]][[326361454077134]][[326361467410466]][[326361534077126]]\n' +
'[[326361530743793]][[326361540743792]][[326361527410460]][[326361537410459]]\n' +
'[[326361634077116]][[326361637410449]][[326361627410450]][[326361630743783]]'
  var trues = '[[307481015979095]][[307481005979096]][[307481009312429]][[307481012645762]][[307481002645763]]\n' +
'[[307481099312420]][[307481092645754]][[307481095979087]][[307481102645753]][[307481105979086]]\n' +
'[[307481142645749]][[307481149312415]][[307481152645748]][[307481145979082]][[307481155979081]]\n' +
'[[307481212645742]][[307481202645743]][[307481209312409]][[307481205979076]][[307481199312410]]\n' +
'[[307481289312401]][[307481279312402]][[307481282645735]][[307481292645734]][[307481285979068]]'
 var alone = '[[203703696394411]][[203703689727745]][[203703693061078]][[203703699727744]][[203703703061077]][[203703789727735]]\n' +
'[[203703793061068]][[203703783061069]][[203703786394402]][[203703796394401]][[203703863061061]][[203703866394394]]\n' +
'[[203703856394395]][[203703853061062]][[203703859727728]][[203703926394388]][[203703923061055]][[203703919727722]]\n' +
'[[203703916394389]][[203703913061056]][[203704023061045]][[203704009727713]][[203704013061046]][[203704026394378]]\n' +
'[[203704019727712]][[203704106394370]][[203704099727704]][[203704103061037]][[203704096394371]][[203704093061038]]\n' +
'[[203704156394365]][[203704159727698]][[203704169727697]][[203704153061032]][[203704163061031]][[203704226394358]]'
 var mog = '[[230092347088139]][[230092340421473]][[230092343754806]][[230092353754805]][[230092350421472]][[230092453754795]]\n' +
'[[230092450421462]][[230092457088128]][[230092447088129]][[230092460421461]][[230092540421453]][[230092547088119]]\n' +
'[[230092550421452]][[230092543754786]][[230092537088120]][[230092623754778]][[230092633754777]][[230092630421444]]'n' +
'[[230092620421445]][[230092627088111]][[230092700421437]][[230092707088103]][[230092693754771]][[230092697088104]]\n' +
'[[230092703754770]][[230092770421430]][[230092780421429]][[230092773754763]][[230092777088096]][[230092783754762]]'
 var all = '[[233177663446274]][[233177666779607]][[233177656779608]][[233177660112941]][[233177670112940]][[233177800112927]][[233177803446260]]\n' +
'[[233177796779594]][[233177793446261]][[233177806779593]][[233177896779584]][[233177906779583]][[233177893446251]][[233177900112917]]\n' +
'[[233177903446250]][[233177970112910]][[233177973446243]][[233177980112909]][[233177976779576]][[233177983446242]][[233178093446231]]\n' +
'[[233178096779564]][[233178090112898]][[233178086779565]][[233178100112897]][[233178180112889]][[233178186779555]][[233178183446222]]\n' +
'[[233178190112888]][[233178176779556]][[233178270112880]][[233178266779547]][[233178263446214]][[233178260112881]][[233178256779548]]'
 var fap = '[[204321616325705]][[204321639659036]][[204321652992368]][[204321669659033]][[204321682992365]][[204321689659031]]\n'+
'[[204321709659029]][[204321716325695]][[204321722992361]][[204321729659027]][[204321739659026]][[204321746325692]]\n'+
'[[204321759659024]][[204321769659023]][[204321786325688]][[204321792992354]][[204321799659020]][[204321812992352]]\n'+
'[[204321829659017]][[204321849659015]][[204321849659015]][[204321876325679]][[204321882992345]][[204321889659011]]\n'+
'[[204321896325677]][[204321906325676]][[204321916325675]][[204321929659007]][[204321939659006]][[204321949659005]]\n'+
'[[204321959659004]][[204321979659002]][[204321996325667]][[204322009658999]][[204322026325664]][[204322036325663]]'
 var yuno = '[[303871966326083]][[303871959659417]][[303871962992750]][[303871972992749]][[303871969659416]][[303872079659405]]\n' +
'[[303872069659406]][[303872072992739]][[303872066326073]][[303872076326072]][[303872129659400]][[303872126326067]]\n' +
'[[303872132992733]][[303872136326066]][[303872139659399]][[303872199659393]][[303872189659394]][[303872196326060]]\n' +
'[[303872192992727]][[303872202992726]][[303872276326052]][[303872272992719]][[303872282992718]][[303872286326051]]\n' +
'[[303872279659385]][[303872356326044]][[303872352992711]][[303872346326045]][[303872342992712]][[303872349659378]]\n' +
'[[303872426326037]][[303872419659371]][[303872422992704]][[303872429659370]][[303872432992703]][[303872469659366]]'
var gtfo = '[[157184441057612]][[157184454390944]][[157184471057609]][[157184491057607]][[157184521057604]]\n' +
'[[157184541057602]][[157184554390934]][[157184584390931]][[157184604390929]][[157184621057594]]\n' +
'[[157184667724256]][[157184697724253]][[157184737724249]][[157184774390912]][[157184804390909]]\n' +
'[[157184851057571]][[157184867724236]][[157184887724234]][[157184914390898]][[157184947724228]]\n' +
'[[157184954390894]][[157184977724225]][[157184987724224]][[157185007724222]][[157185024390887]]'
var yao = '[[190350121060720]][[190350151060717]][[190350224394043]][[190350264394039]][[190350274394038]][[190350321060700]][[190350337727365]]\n'+
'[[190350524394013]][[190350544394011]][[190350651060667]][[190350811060651]][[190350824393983]][[190350837727315]][[190350851060647]]\n'+
'[[190351834393882]][[190351844393881]][[190354824393583]][[190354847726914]][[190354857726913]][[190356574393408]]\n'+
'[[190357747726624]][[190357764393289]][[190357774393288]][[190359411059791]][[190359441059788]][[190359467726452]]\n'+
'[[190365544392511]][[190368041058928]][[190368054392260]][[190368067725592]][[190370207725378]][[190370234392042]]\n'+
'[[190370834391982]][[190370844391981]][[190373951058337]][[190373964391669]][[190373981058334]][[190373987725000]]\n'+
'[[190374151058317]][[190374177724981]][[190374184391647]][[190374207724978]][[190374234391642]][[190374251058307]]\n'+
'[[190374704391595]][[190374731058259]][[190374761058256]][[190374781058254]][[190374787724920]][[190374814391584]]'
var okay = '[[296238963769967]][[296238960436634]][[296238953769968]][[296238950436635]][[296238957103301]]\n' +
'[[296239070436623]][[296239077103289]][[296239073769956]][[296239080436622]][[296239083769955]]\n' +
'[[296239160436614]][[296239163769947]][[296239170436613]][[296239173769946]][[296239167103280]]\n' +
'[[296239240436606]][[296239243769939]][[296239237103273]][[296239247103272]][[296239250436605]]\n' +
'[[296239363769927]][[296239377103259]][[296239367103260]][[296239373769926]][[296239370436593]]\n' +
'[[296239473769916]][[296239463769917]][[296239460436584]][[296239467103250]][[296239470436583]]'
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
var lolface = '[[307295845975253]][[307295885975249]][[307295925975245]][[307295955975242]]\n'+
'[[307295969308574]][[307295975975240]][[307295999308571]][[307296002641904]]\n'+
'[[307296019308569]][[307296035975234]][[307296042641900]][[307296055975232]]\n'+
'[[307296069308564]][[307296082641896]][[307296119308559]][[307296129308558]]'
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
var nbad = '[[334818466541850]][[334818463208517]][[334818473208516]][[334818476541849]][[334818469875183]]\n' +
'[[334818539875176]][[334818543208509]][[334818553208508]][[334818546541842]][[334818549875175]]\n' +
'[[334818599875170]][[334818596541837]][[334818593208504]][[334818603208503]][[334818606541836]]\n' +
'[[334818656541831]][[334818663208497]][[334818659875164]][[334818666541830]][[334818673208496]]\n' +
'[[334818783208485]][[334818776541819]][[334818773208486]][[334818786541818]][[334818779875152]]'
var ayeah = '[[143433285774463]][[143433295774462]][[143433292441129]][[143433299107795]][[143433289107796]][[143433392441119]]\n' +
'[[143433379107787]][[143433389107786]][[143433385774453]][[143433382441120]][[143433432441115]][[143433435774448]]\n' +
'[[143433442441114]][[143433445774447]][[143433449107780]][[143433545774437]][[143433549107770]][[143433552441103]]\n' +
'[[143433555774436]][[143433559107769]][[143433685774423]][[143433682441090]][[143433689107756]][[143433675774424]]\n' +
'[[143433679107757]][[143433745774417]][[143433742441084]][[143433749107750]][[143433755774416]][[143433752441083]]'
var fuu = '[[326029227427692]][[326029234094358]][[326029240761024]][[326029237427691]][[326029230761025]][[326029337427681]]\n' +
'[[326029344094347]][[326029347427680]][[326029350761013]][[326029340761014]][[326029414094340]][[326029407427674]]\n' +
'[[326029410761007]][[326029404094341]][[326029417427673]][[326029457427669]][[326029460761002]][[326029464094335]]\n' +
'[[326029467427668]][[326029470761001]][[326029554094326]][[326029547427660]][[326029544094327]][[326029550760993]]\n' +
'[[326029557427659]][[326029624094319]][[326029610760987]][[326029620760986]][[326029614094320]][[326029617427653]]'
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
var pcguy = '[[345212688836172]][[345212685502839]][[345212692169505]][[345212682169506]][[345212695502838]]\n' +
'[[345212768836164]][[345212772169497]][[345212775502830]][[345212765502831]][[345212778836163]]\n' +
'[[345212825502825]][[345212818836159]][[345212822169492]][[345212828836158]][[345212832169491]]\n' +
'[[345212902169484]][[345212895502818]][[345212905502817]][[345212898836151]][[345212915502816]]\n' +
'[[345212978836143]][[345212988836142]][[345212985502809]][[345212982169476]][[345212992169475]]'
var cute = '[[410811815609181]][[410811822275847]][[410811825609180]][[410811818942514]][[410811812275848]][[410811928942503]]\n' +
'[[410811925609170]][[410811935609169]][[410811932275836]][[410811938942502]][[410812002275829]][[410812015609161]]\n' +
'[[410812005609162]][[410812008942495]][[410812012275828]][[410812102275819]][[410812112275818]][[410812108942485]]\n' +
'[[410812105609152]][[410812115609151]][[410812215609141]][[410812225609140]][[410812212275808]][[410812218942474]]\n' +
'[[410812222275807]][[410812288942467]][[410812295609133]][[410812298942466]][[410812302275799]][[410812292275800]]'
var youdontsay = '[[204338849657315]][[204338862990647]][[204338869657313]][[204338879657312]][[204338889657311]][[204338899657310]]\n' +
'[[204338912990642]][[204338936323973]][[204338946323972]][[204338956323971]][[204338969657303]][[204338986323968]]\n' +
'[[204338992990634]][[204338999657300]][[204339006323966]][[204339022990631]][[204339036323963]][[204339042990629]]\n' +
'[[204339052990628]][[204339072990626]][[204339082990625]][[204339109657289]][[204339122990621]][[204339136323953]]\n' +
'[[204339142990619]][[204339152990618]][[204339162990617]][[204339169657283]][[204339186323948]][[204339196323947]]\n' +
'[[204339209657279]][[204339219657278]][[204339226323944]][[204339242990609]][[204339249657275]][[204339259657274]]'
var notsure = '[[168910103216625]][[168910119883290]][[168910159883286]][[168910193216616]][[168910203216615]]\n' +
'[[168910216549947]][[168910236549945]][[168910253216610]][[168910269883275]][[168910283216607]]\n' +
'[[168910299883272]][[168910346549934]][[168910369883265]][[168910383216597]][[168910396549929]]\n' +
'[[168910426549926]][[168910446549924]][[168910466549922]][[168910476549921]][[168910496549919]]\n' +
'[[168910519883250]][[168910536549915]][[168910549883247]][[168910559883246]][[168910569883245]]'
var trolldad = '[[204351622989371]][[204351652989368]][[204351666322700]][[204351676322699]][[204351696322697]]\n' +
'[[204351716322695]][[204351736322693]][[204351752989358]][[204351769656023]][[204351782989355]]\n' +
'[[204351799656020]][[204351829656017]][[204351842989349]][[204351852989348]][[204351866322680]]\n' +
'[[204351879656012]][[204351886322678]][[204351902989343]][[204351926322674]][[204351939656006]]\n' +
'[[204351962989337]][[204351982989335]][[204351989656001]][[204351996322667]][[204352009655999]]\n' +
'[[204352022989331]][[204352036322663]][[204352042989329]][[204352062989327]][[204352072989326]]\n' +
'[[204352086322658]][[204352106322656]][[204352142989319]][[204352166322650]][[204352176322649]]'
 var v2 = 'This is the second version of meme facebook extension for firefox and chrome. Stay tuned, i will update script by adding new memes and fixing some bugs.\n'+
 'you can find all memes here turbolego.com/L.txt, i also added hotkeys for memes, ctrl+number of meme, please report bugs at theztech@connect.to\n'+
'Download newest version here http://userscripts.org/scripts/show/122827'
	spemotsInfo = [umad, 'http://www.rev6.com/forum/images/smilies/trollface.gif', megusta, 'http://butteredtoast.org/F7U12Addon/images/megusta.png', jack, 'http://i0.kym-cdn.com/photos/images/list/000/185/168/misc-jackie-chan-l.png', accept, 'http://www4.slikomat.com/11/0110/r5w-accept.png', poker, 'http://i3.kym-cdn.com/entries/icons/tiny/000/003/193/1279052383758.jpg', trues, 'http://www4.slikomat.com/11/0110/yin-true.png', alone, 'http://i3.kym-cdn.com/entries/icons/tiny/000/003/619/Untitled-1.jpg', mog, 'http://www4.slikomat.com/11/0110/39v-mog.png', all, 'http://www4.slikomat.com/11/0110/n1u-all.png', fap, 'http://i0.kym-cdn.com/entries/icons/tiny/000/005/939/Fap%20Guy%20Meme.png',  yuno, 'http://cache.ohinternet.com/images/squares/Y-u-no-exploitable.png/25_25_Y-u-no-exploitable.png', gtfo, 'http://img818.imageshack.us/img818/2967/752050ba7b28435ebae43df.png', yao , 'http://t1.gstatic.com/images?q=tbn:ANd9GcQwUdKzke2i1LBj_IYWYujKpDKzQRJWzye8lQAptGDgrbrmXPtozb7JpIw', okay , 'http://cache.ohinternet.com/images/squares/Okay_guy.jpg/25_25_Okay_guy.jpg', no , 'http://img205.imageshack.us/img205/8443/81cebb2014cb46efb1b9869.png', dbumtss,'http://img696.imageshack.us/img696/3426/cae1296481aa4430889bd77.png',ilied,'http://img688.imageshack.us/img688/6753/350b6af2bb314911b6deeb8.png', lolface,'http://butteredtoast.org/F7U12Addon/images/lol.png',fuckyou,'http://img189.imageshack.us/img189/5334/8dee47fbba564d468d70b02.png',kiddinme,'http://img26.imageshack.us/img26/6636/074e086bf37e41368316977.png', cguy, 'http://img337.imageshack.us/img337/310/892d3e552a094e5eadf8454.png', nbad, 'http://img404.imageshack.us/img404/9899/48a6944aeb2247f282862d9.png', ayeah, 'http://img845.imageshack.us/img845/3280/57d8ea2aef40409484e820c.png', fuu, 'http://www.itsmods.com/forum/images/smilies/fuu.png', fucky, 'http://lh4.ggpht.com/_EdWrfJxxD_I/TJsgE-uVppI/AAAAAAAAEsY/Bl7LRZlXgCc/fuckyea.png', hardcore, 'http://img525.imageshack.us/img525/930/7b3671b83915492cb04e167.png', wtf, 'http://img862.imageshack.us/img862/4417/8a942223273b4ad797eef1f.png', pcguy, 'http://s4e068d5684a49.img.gostorego.com/802754/cdn/media/s4/e0/68/d5/68/4a/49/catalog/product/cache/1/thumbnail/48x/9df78eab33525d08d6e5fb8d27136e95/p/i/picture_1740.jpg', cute, 'http://img80.imageshack.us/img80/3964/a08f11e050f34458a9f2f67.png', youdontsay, 'http://img197.imageshack.us/img197/1096/4cb92a5e68c74d03ab5d6d6.png', notsure, 'http://img269.imageshack.us/img269/802/f7b731e60f2e495ea1f5c1c.png', trolldad, 'http://img840.imageshack.us/img840/3401/6e8d74a62af34a78bcc3ae2.png', v2, 'http://www4.slikomat.com/11/0113/jo8-Untitl.png'];                                                                            
    spemotsTitle = ['YouMad', ' ', 'MeGusta', ' ','Jackie Chan', ' ','Challenge Accepted', ' ', 'Poker Face', ' ','True Story', ' ','Forever Alone', ' ','Mother of God', ' ','X all the Y', ' ','Fap', ' ','Y U NO', ' ','GTFO',' ','Bitch Please',' ','Okay',' ','No',' ','Ba Dum Tsss',' ','I Lied',' ','LOL',' ','Fuck You',' ','Are you kidding me', ' ', 'Careal Guy', ' ', 'Obama not bad', ' ', 'awwww yeaahhh', ' ', 'fuuuuuuu', ' ', 'Fuckyeah', ' ', 'so hardcore', ' ', 'That scared guy', ' ', 'guy wtf', ' ', 'rainbow guy', ' ', 'you don\'t say', ' ', 'not sure if', ' ', 'trolldad', ' ', 'v2'];
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