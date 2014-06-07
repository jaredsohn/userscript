// ==UserScript==
// @name Facebook memes with alphabets
// @namespace A R J U N
// @version           2.5
// @versionnumber		2.5
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:

    var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow, gettheurl;

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

    storage = 'none';

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

    function UpdateCheck() {}
    
    function handleUpdateResponse(r) {}
    
/* END */

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

    
    emotsInfo = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53" ,"54" ,"55" ,"56" ,"57" ,"58" ,"59" ,"60" ,"61","62" ,"63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85"   ];
    spemotsInfo = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","32","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51" ,"52","53" ,"54" ,"55" ,"56" ,"57" ,"58" ,"59" ,"60","61","62" ,"63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85"  ];


    emotsInfo [0] = " [[334230636605501]][[335080033169115]][[314686231886107]] \n [[179637912133385]][[345951442087087]][[208631755887293]] \n [[297872013591588]][[317089564978607]][[341555305870236]]";
    spemotsInfo [0] ="http://profile.ak.fbcdn.net/hprofile-ak-snc4/372797_312080468826419_735069164_n.jpg";

    emotsInfo [1] = " [[292600504129552]][[292600500796219]][[292600507462885]][[292600510796218]][[292600514129551]] \n [[292600587462877]][[292600594129543]][[292600597462876]][[292600590796210]][[292600600796209]] \n [[292600657462870]][[292600654129537]][[292600667462869]][[292600660796203]][[292600664129536]] \n [[292600730796196]][[292600734129529]][[292600727462863]][[292600724129530]][[292600737462862]] \n [[292600797462856]][[292600800796189]][[292600804129522]][[292600807462855]][[292600794129523]]";
    spemotsInfo [1] ="http://img837.imageshack.us/img837/2017/2ff407c87e3140cf99f6947.png";

    emotsInfo [2] = "[[312920342087912]][[312920352087911]][[312920348754578]][[312920345421245]][[312920338754579]] \n [[312920425421237]][[312920428754570]][[312920438754569]][[312920435421236]][[312920432087903]] \n [[312920478754565]][[312920485421231]][[312920482087898]][[312920475421232]][[312920488754564]] \n [[312920538754559]][[312920545421225]][[312920548754558]][[312920542087892]][[312920552087891]] \n [[312920622087884]][[312920628754550]][[312920615421218]][[312920625421217]][[312920618754551]]";
    spemotsInfo [2] = "http://img688.imageshack.us/img688/3194/d4526c8f16d64848bcde33f.png";

    emotsInfo [3] = " [[347488208608209]][[347488198608210]][[347488195274877]][[347488205274876]][[347488201941543]][[347488301941533]][[347488295274867]][[347488291941534]] \n [[347488298608200]][[347488308608199]][[347488358608194]][[347488351941528]][[347488355274861]][[347488348608195]][[347488361941527]][[347488415274855]] \n [[347488428608187]][[347488418608188]][[347488425274854]][[347488421941521]][[347488498608180]][[347488491941514]][[347488501941513]][[347488495274847]] \n [[347488488608181]][[347488551941508]][[347488555274841]][[347488548608175]][[347488561941507]][[347488558608174]][[347488618608168]][[347488608608169]] \n [[347488615274835]][[347488605274836]][[347488611941502]][[347488658608164]][[347488661941497]][[347488668608163]][[347488665274830]][[347488671941496]]";
    spemotsInfo [3] = "http://img846.imageshack.us/img846/6930/74801f5218544c9eb84c929.png";

    emotsInfo [4] = "[[126229327389020]]";
    spemotsInfo [4] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc3/27977_126229327389020_123901794288440_321639_6066831_n.jpg";

    emotsInfo [5] = " [[351816474842460]][[351816478175793]][[351816481509126]][[351816484842459]][[351816471509127]] \n [[351816568175784]][[351816578175783]][[351816571509117]][[351816564842451]][[351816574842450]] \n [[351816644842443]][[351816638175777]][[351816634842444]][[351816641509110]][[351816648175776]] \n [[351816704842437]][[351816701509104]][[351816711509103]][[351816708175770]][[351816714842436]] \n [[351816798175761]][[351816801509094]][[351816808175760]][[351816804842427]][[351816794842428]]";
    spemotsInfo [5] = "http://img197.imageshack.us/img197/4210/bd46726ce78b43bdbfd9399.png";
    
	emotsInfo [6] = "[[196920740401785]] ";
	spemotsInfo [6] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373192_196920740401785_1284312742_n.jpg";
	
	emotsInfo [7] = "[[113544575430999]] ";
	spemotsInfo [7] ="http://profile.ak.fbcdn.net/hprofile-ak-ash2/373622_113544575430999_300212597_n.jpg";
	
	emotsInfo [8] = "[[294715893904555]] ";
	spemotsInfo [8] ="http://profile.ak.fbcdn.net/hprofile-ak-ash2/372969_294715893904555_1901647256_n.jpg";
	
	emotsInfo [9] = "[[294660140569858]] ";
	spemotsInfo [9] ="http://profile.ak.fbcdn.net/hprofile-ak-snc4/373587_294660140569858_478025726_n.jpg";
	
	emotsInfo [10] = "[[328415510520892]] ";
	spemotsInfo [10] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373622_328415510520892_917440000_n.jpg";
	
	emotsInfo [11] = "[[270221906368791]] ";
	spemotsInfo [11] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373607_270221906368791_57033006_n.jpg";
	
	emotsInfo [12] = "[[212614922155016]] ";
	spemotsInfo [12] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373509_212614922155016_1290783757_n.jpg";
	
	emotsInfo [13] = "[[205633882856736]] ";
	spemotsInfo [13] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/372800_205633882856736_1832257183_n.jpg";
	
	emotsInfo [14] = "[[256255337773105]] ";
	spemotsInfo [14] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/373603_256255337773105_431775381_n.jpg";
	
	emotsInfo [15] = "[[288138264570038]] ";
	spemotsInfo [15] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373659_288138264570038_1461934681_n.jpg";
	
	emotsInfo [16] = "[[296999947008863]] ";
	spemotsInfo [16] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/261109_296999947008863_640224354_n.jpg";
	
	emotsInfo [17] = "[[216672855078917]] ";
	spemotsInfo [17] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372968_216672855078917_1393843742_n.jpg";
	
	emotsInfo [18] = "[[278786215503631]] ";
	spemotsInfo [18] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/261085_278786215503631_207327985_n.jpg";
	
	emotsInfo [19] = "[[241341589270741]] ";
	spemotsInfo [19] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373643_241341589270741_369533067_n.jpg";
	
	emotsInfo [20] = "[[312524205448755]] ";
	spemotsInfo [20] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372896_312524205448755_1686406526_n.jpg";
	
	emotsInfo [21] = "[[200138403410055]] ";
	spemotsInfo [21] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/211171_200138403410055_1437352794_n.jpg";
	
	emotsInfo [22] = "[[165410113558613]] ";
	spemotsInfo [22] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/372913_165410113558613_547442504_n.jpg";
	
	emotsInfo [23] = "[[203403609746433]] ";
	spemotsInfo [23] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373398_203403609746433_363584857_n.jpg";
	
	emotsInfo [24] = "[[334427926570136]] ";
	spemotsInfo [24] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373018_334427926570136_990451047_n.jpg";
	
	emotsInfo [25] = "[[250632158335643]] ";
	spemotsInfo [25] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/276592_250632158335643_990630424_n.jpg";
	
	emotsInfo [26] = "[[285985351447161]] ";
	spemotsInfo [26] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373472_285985351447161_209955544_n.jpg";
	
	emotsInfo [27] = "[[343627398996642]] ";
	spemotsInfo [27] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373587_343627398996642_107902818_n.jpg";
	
	emotsInfo [28] = "[[315740851791114]] ";
	spemotsInfo [28] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373581_315740851791114_1376177167_n.jpg";
	
	emotsInfo [29] = "[[136342506479536]] ";
	spemotsInfo [29] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/373241_136342506479536_831783111_n.jpg";
	
	emotsInfo [30] = "[[224173507657194]] ";
	spemotsInfo [30] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372917_224173507657194_1836514892_q.jpg";
			
	emotsInfo [31] = "[[317710424919150]]";
	spemotsInfo [31] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372774_317710424919150_1511641330_n.jpg";
	
	emotsInfo [32] = "[[275464492508068]]";
	spemotsInfo [32] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372797_275464492508068_414637240_n.jpg";
	
	emotsInfo [33] = "[[318567668176829]]";
	spemotsInfo [33] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373598_318567668176829_315889333_n.jpg";
	
	emotsInfo [34] = "[[149637181814078]]";
	spemotsInfo [34] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373606_149637181814078_1722683693_n.jpg";
	
	emotsInfo [35] = "[[302316189806057]]";
	spemotsInfo [35] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/187850_302316189806057_82059892_n.jpg";
	
	emotsInfo [36] = "[[211602638927179]]";
	spemotsInfo [36] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372790_211602638927179_296784916_n.jpg";
	
	emotsInfo [37] = "[[344494642228198]]";
	spemotsInfo [37] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372791_344494642228198_1596134722_n.jpg";
	
	emotsInfo [38] = "[[272310552824369]]";
	spemotsInfo [38] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/276935_272310552824369_1466212531_n.jpg";
	
	emotsInfo [39] = "[[187710267993564]]";
	spemotsInfo [39] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373006_187710267993564_1663432713_n.jpg";
	
	emotsInfo [40] = "[[160358377399813]]";
	spemotsInfo [40] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373212_160358377399813_1362623455_n.jpg";
	
	emotsInfo [41] = "[[334607356563153]]";
	spemotsInfo [41] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373016_334607356563153_1938678793_n.jpg";

    emotsInfo [42] = "[[DislikeOfficial]]";
    spemotsInfo [42] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/211060_200780349956036_3187230_q.jpg";
    
    emotsInfo [43] = '[[372486149444331]][[372486146110998]][[372486159444330]][[372486152777664]][[372486156110997]] \n [[372486239444322]][[372486246110988]][[372486232777656]][[372486242777655]][[372486236110989]] \n [[372486299444316]][[372486289444317]][[372486296110983]][[372486292777650]][[372486302777649]] \n [[372486362777643]][[372486356110977]][[372486369444309]][[372486366110976]][[372486359444310]] \n [[372486459444300]][[372486446110968]][[372486449444301]][[372486456110967]][[372486452777634]]';
    spemotsInfo [43] = "http://img20.imageshack.us/img20/9996/a7c5efe2ee5d46f6bdbceb5.png";

    emotsInfo [44] = '[[180601488705317]]';
    spemotsInfo [44] = "http://profile.ak.fbcdn.net/hprofile-ak-ash2/373727_180601488705317_940102820_q.jpg";
    
    emotsInfo [45] = "[[293955833972970]][[293955850639635]][[293955873972966]][[293955920639628]][[293956017306285]] \n [[293956043972949]][[293956060639614]][[293956087306278]][[293956100639610]][[293956107306276]] \n [[293956117306275]][[293956127306274]][[293956147306272]][[293956220639598]][[293956283972925]] \n [[293956303972923]][[293956327306254]][[293956350639585]][[293956370639583]][[293956450639575]] \n [[293956570639563]][[293956620639558]][[293956677306219]][[293956710639549]][[293956767306210]] ";
    spemotsInfo [45] = "http://img27.imageshack.us/img27/3370/29fc2444349e4d8aab6ef87.png";
    
    emotsInfo [46] = '[[223460144356119]] ';
    spemotsInfo [46] = "http://profile.ak.fbcdn.net/static-ak/rsrc.php/v1/y6/r/_xS7LcbxKS4.gif";
    
    emotsInfo [47] = '[[126125527399400]] ';
    spemotsInfo [47] = "http://a3.sphotos.ak.fbcdn.net/hphotos-ak-snc3/31397_126125527399400_123901794288440_321210_6541100_n.jpg";
    
    emotsInfo [48] = '[[322320127785919]][[322320147785917]][[322320194452579]][[322320211119244]][[322320224452576]] \n [[322320254452573]][[322320274452571]][[322320307785901]][[322320317785900]][[322320337785898]] \n [[322320451119220]][[322320491119216]][[322320511119214]][[322320534452545]][[322320541119211]] \n [[322320557785876]][[322320597785872]][[322320624452536]][[322320661119199]][[322320837785848]]';
    spemotsInfo [48] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/372940_157680577671754_5868083_q.jpg";
    
    emotsInfo [49] = '[[136446926442912]]';
    spemotsInfo [49] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/187792_136446926442912_7080514_q.jpg";
    
    emotsInfo [50] = '[[2231777543]]';
    spemotsInfo [50] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/276597_2231777543_1770070650_q.jpg";
    
    emotsInfo [51] = '[[347918598565170]][[347918588565171]][[347918595231837]][[347918591898504]][[347918585231838]][[347918698565160]] \n [[347918691898494]][[347918695231827]][[347918685231828]][[347918688565161]][[347918738565156]][[347918751898488]] \n [[347918741898489]][[347918748565155]][[347918745231822]][[347918838565146]][[347918848565145]][[347918845231812]] \n [[347918851898478]][[347918841898479]][[347918958565134]][[347918945231802]][[347918955231801]][[347918951898468]] \n [[347918948565135]][[347919001898463]][[347919005231796]][[347918998565130]][[347919008565129]][[347918995231797]] \n [[347919108565119]][[347919101898453]][[347919105231786]][[347919095231787]][[347919098565120]][[347919181898445]]';
    spemotsInfo [51] = "http://img26.imageshack.us/img26/8969/051375a1faf043b8a2fff6d.png";
    
    emotsInfo [52] = '[[127868980561350]]';
    spemotsInfo [52] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc3/31432_127868980561350_119193198095595_360800_5065376_n.jpg";
    
    emotsInfo [53] = '[[126132024065417]]';
    spemotsInfo [53] = "http://a8.sphotos.ak.fbcdn.net/hphotos-ak-snc3/28667_126132024065417_123901794288440_321235_2277856_n.jpg";
    
    emotsInfo [54] = '[[124211087695334]]';
    spemotsInfo [54] = "http://a4.sphotos.ak.fbcdn.net/hphotos-ak-snc7/394939_124211087695334_124192127697230_116276_135434839_n.jpg";
    
    emotsInfo [55] = '[[110780922298250]]';
    spemotsInfo [55] = "http://a8.sphotos.ak.fbcdn.net/hphotos-ak-ash2/30302_110780922298250_107569439286065_69153_3663372_n.jpg";
    
    emotsInfo [56] = '[[126230590722227]]';
    spemotsInfo [56] = "http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash2/27977_126230590722227_123901794288440_321650_3054586_n.jpg";
    
    emotsInfo [57] = '[[127878643893717]]';
    spemotsInfo [57] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc3/31432_127878643893717_119193198095595_360823_4683334_n.jpg";
    
    emotsInfo [58] = '[[126216480723638]]';
    spemotsInfo [58] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc3/27977_126216480723638_123901794288440_321574_5710742_n.jpg";
    
    emotsInfo [59] = '[[126278884050731]]';
    spemotsInfo [59] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc3/27977_126278884050731_123901794288440_321794_4991909_n.jpg";
    
    emotsInfo [60] = '[[398503874236]]';
    spemotsInfo [60] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash2/29413_398503874236_252876759236_3929110_4658101_n.jpg";
    
    emotsInfo [61] = '[[126232017388751]]';
    spemotsInfo [61] = "http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash2/27977_126232017388751_123901794288440_321660_4174679_n.jpg";
    
    emotsInfo [62] = '[[126226964055923]]';
    spemotsInfo [62] = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash2/27977_126226964055923_123901794288440_321626_2072352_n.jpg";
    
    emotsInfo [63] = '[[127697590578489]]';
    spemotsInfo [63] = "http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash2/31432_127697590578489_119193198095595_360071_6092752_n.jpg";
    
    emotsInfo [64] = '[[126220920723194]]';
    spemotsInfo [64] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/27977_126220920723194_123901794288440_321588_5280905_n.jpg";
    
    emotsInfo [65] = '[[126236287388324]]';
    spemotsInfo [65] = "http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash2/27977_126236287388324_123901794288440_321681_7075191_n.jpg";
    
    emotsInfo [66] = '[[245911092151422]] [[245911088818089]][[245911082151423]][[245911078818090]][[245911085484756]][[245911195484745]] \n [[245911188818079]][[245911192151412]][[245911202151411]][[245911198818078]][[245911268818071]][[245911282151403]] \n [[245911275484737]][[245911272151404]][[245911278818070]][[245911345484730]][[245911332151398]][[245911342151397]] \n [[245911335484731]][[245911338818064]][[245911412151390]][[245911398818058]][[245911408818057]][[245911402151391]] \n [[245911395484725]][[245911458818052]][[245911472151384]][[245911465484718]][[245911468818051]][[245911478818050]]';
    spemotsInfo [66] = "http://img811.imageshack.us/img811/7486/d1e18165941b4b91bc7612f.png";
     
    emotsInfo [67] = '[[368752229817723]] [[368752236484389]][[368752239817722]][[368752233151056]] \n [[368752226484390]][[368752323151047]][[368752329817713]][[368752326484380]] \n [[368752333151046]][[368752336484379]][[368752383151041]][[368752386484374]] \n [[368752389817707]][[368752393151040]][[368752396484373]][[368752453151034]] \n [[368752459817700]][[368752456484367]][[368752463151033]][[368752449817701]] \n [[368752553151024]][[368752556484357]][[368752563151023]][[368752559817690]]';
    spemotsInfo [67] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/373455_221832151226580_1765735627_q.jpg";
	
    emotsInfo [68] = '[[love.org]]';
    spemotsInfo [68] = "http://profile.ak.fbcdn.net/hprofile-ak-snc4/41815_108075051517_8135_q.jpg";
    
    emotsInfo [69] = '[[145257255592066]][[145257245592067]][[145257242258734]] \n [[145257248925400]][[145257252258733]][[145257348925390]] \n [[145257342258724]][[145257338925391]][[145257345592057]]';
    spemotsInfo [69] = "http://img717.imageshack.us/img717/1892/21b59ca6afab4d5980105ca.png";
   
    emotsInfo [70] = '[[348367578524911]]';
    spemotsInfo [70] = "http://a6.sphotos.ak.fbcdn.net/hphotos-ak-ash4/407341_348367578524911_348353038526365_1354380_703338135_n.jpg";
   
    emotsInfo [71] = ' [[357847504241529]][[357847507574862]][[357847514241528]][[357847500908196]][[357847510908195]][[357847600908186]] \n [[357847604241519]][[357847597574853]][[357847610908185]][[357847607574852]][[357847667574846]][[357847670908179]] \n [[357847674241512]][[357847680908178]][[357847677574845]][[357847737574839]][[357847747574838]][[357847744241505]] \n [[357847740908172]][[357847750908171]][[357847830908163]][[357847824241497]][[357847827574830]][[357847834241496]] \n [[357847837574829]][[357847897574823]][[357847894241490]][[357847890908157]][[357847900908156]][[357847907574822]]';
    spemotsInfo [71] = "http://img685.imageshack.us/img685/7347/e8c1a0f7bf1f4b3eb89125d.png";
   
    emotsInfo [72] = '[[302707326432479]][[302707343099144]][[302707349765810]][[302707356432476]][[302707359765809]] \n [[302707366432475]][[302707369765808]][[302707379765807]][[302707386432473]][[302707396432472]] \n [[302707403099138]][[302707413099137]][[302707419765803]][[302707436432468]][[302707443099134]]';
    spemotsInfo [72] = "http://img836.imageshack.us/img836/3624/35c550bf4846496a85d3ab8.png";
   
    emotsInfo [73] = '[[372525769440369]][[372525762773703]][[372525766107036]][[372525772773702]] \n [[372525776107035]][[372525942773685]][[372525952773684]][[372525956107017]] \n [[372525949440351]][[372525946107018]][[372526062773673]][[372526059440340]] \n [[372526066107006]][[372526056107007]][[372526069440339]][[372526166106996]]';
    spemotsInfo [73] = "http://img825.imageshack.us/img825/3247/b4ee4b10afeb43de931d396.png";
   
    emotsInfo [74] = '[[216975671729863]][[216975665063197]][[216975675063196]][[216975668396530]][[216975661729864]] \n [[216975748396522]][[216975761729854]][[216975751729855]][[216975755063188]][[216975758396521]] \n [[216975818396515]][[216975825063181]][[216975811729849]][[216975821729848]][[216975815063182]] \n [[216975881729842]][[216975885063175]][[216975875063176]][[216975871729843]][[216975878396509]] \n [[216975965063167]][[216975958396501]][[216975955063168]][[216975968396500]][[216975961729834]] \n [[216976025063161]][[216976021729828]][[216976028396494]][[216976031729827]][[216976041729826]]';
    spemotsInfo [74] = "http://img851.imageshack.us/img851/7509/8159dd4f8d944293ad84cca.png";
   
    emotsInfo [75] = '[[290817047641231]][[290817034307899]][[290817040974565]][[290817044307898]][[290817037641232]][[290817124307890]] \n [[290817127641223]][[290817137641222]][[290817134307889]][[290817120974557]][[290817224307880]][[290817214307881]] \n [[290817220974547]][[290817217641214]][[290817227641213]][[290817294307873]][[290817290974540]][[290817287641207]] \n [[290817284307874]][[290817297641206]][[290817404307862]][[290817400974529]][[290817407641195]][[290817394307863]] \n [[290817397641196]][[290817457641190]][[290817464307856]][[290817470974522]][[290817460974523]][[290817467641189]]';
    spemotsInfo [75] = "http://img822.imageshack.us/img822/1157/0e84f5cec9b443e18c1f6f6.png";
   
    emotsInfo [76] = '[[347930481897315]][[347930488563981]][[347930485230648]][[347930475230649]][[347930478563982]] \n [[347930571897306]][[347930568563973]][[347930565230640]][[347930575230639]][[347930578563972]] \n [[347930635230633]][[347930641897299]][[347930648563965]][[347930645230632]][[347930638563966]] \n [[347930698563960]][[347930708563959]][[347930701897293]][[347930705230626]][[347930711897292]] \n [[347930778563952]][[347930788563951]][[347930791897284]][[347930785230618]][[347930795230617]]';
    spemotsInfo [76] = "http://img192.imageshack.us/img192/1651/a336eeabc98a404a98e08fa.png";
   
    emotsInfo [77] = '[[218415861584455]][[218415864917788]][[218415858251122]][[218415854917789]][[218415851584456]] \n [[218415971584444]][[218415974917777]][[218415964917778]][[218415968251111]][[218415978251110]] \n [[218416064917768]][[218416061584435]][[218416068251101]][[218416058251102]][[218416054917769]] \n [[218416131584428]][[218416124917762]][[218416128251095]][[218416134917761]][[218416141584427]] \n [[218416214917753]][[218416208251087]][[218416218251086]][[218416221584419]][[218416211584420]]';
    spemotsInfo [77] = "http://img20.imageshack.us/img20/509/05d43b33cac945ed90f8ffc.png";
   
    emotsInfo [78] = ' [[290186664375197]][[290186671041863]][[290186661041864]][[290186667708530]] \n [[290186657708531]][[290186751041855]][[290186747708522]][[290186757708521]] \n [[290186761041854]][[290186754375188]][[290186831041847]][[290186814375182]] ';
    spemotsInfo [78] = "http://img829.imageshack.us/img829/2542/55944dc96dea418a9563c78.png";
   
    emotsInfo [79] = ' [[352847978072643]][[352847974739310]][[352847971405977]][[352847984739309]][[352847981405976]] \n [[352848138072627]][[352848148072626]][[352848144739293]][[352848141405960]][[352848151405959]] \n [[352848204739287]][[352848214739286]][[352848211405953]][[352848208072620]][[352848218072619]] \n [[352848298072611]][[352848301405944]][[352848291405945]][[352848294739278]][[352848288072612]]';
    spemotsInfo [79] = "http://i44.tinypic.com/2jfdl51.png";
       
    emotsInfo [80] = ' [[146290572155401]][[146290578822067]][[146290575488734]][[146290585488733]][[146290582155400]] \n [[146290672155391]][[146290678822057]][[146290682155390]][[146290675488724]][[146290685488723]] \n [[146290732155385]][[146290738822051]][[146290742155384]][[146290745488717]][[146290748822050]] \n [[146290808822044]][[146290815488710]][[146290802155378]][[146290812155377]][[146290805488711]]';
    spemotsInfo [80] = "http://i40.tinypic.com/3145euu.png";
   
    emotsInfo [81] = ' [[352850008072440]][[352850018072439]][[352850004739107]][[352850011405773]][[352850014739106]] \n [[352850088072432]][[352850101405764]][[352850098072431]][[352850091405765]][[352850094739098]] \n [[352850161405758]][[352850168072424]][[352850164739091]][[352850158072425]][[352850171405757]] \n [[352850228072418]][[352850224739085]][[352850221405752]][[352850218072419]][[352850214739086]]';
    spemotsInfo [81] = "http://i44.tinypic.com/2w71mo4.png";
       
    emotsInfo [82] = ' [[352851794738928]][[352851788072262]][[352851784738929]][[352851781405596]][[352851791405595]] \n [[352851894738918]][[352851891405585]][[352851904738917]][[352851898072251]][[352851901405584]] \n [[352851978072243]][[352851971405577]][[352851974738910]][[352851968072244]][[352851981405576]] \n [[352852054738902]][[352852068072234]][[352852064738901]][[352852058072235]][[352852061405568]]';
    spemotsInfo [82] = "http://i43.tinypic.com/15hye8g.png";
       
    emotsInfo [83] = ' [[352883018069139]][[352883014735806]][[352883008069140]][[352883021402472]][[352883011402473]] \n [[352883131402461]][[352883128069128]][[352883124735795]][[352883118069129]][[352883121402462]] \n [[352883194735788]][[352883191402455]][[352883188069122]][[352883184735789]][[352883198069121]] \n [[352883248069116]][[352883254735782]][[352883258069115]][[352883261402448]][[352883251402449]] \n [[352883381402436]][[352883388069102]][[352883384735769]][[352883394735768]][[352883391402435]]';
    spemotsInfo [83] = "http://i39.tinypic.com/2ln9taq.png";
       
    emotsInfo [84] = ':v ';
    spemotsInfo [84] = "http://static.ak.fbcdn.net/images/blank.gif";
       
    emotsInfo [85] = ':P ';
    spemotsInfo [85] = "http://static.ak.fbcdn.net/images/blank.gif";
   
    

    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
        styleTag = document.createElement('style');
        styleTag.type = 'text/css';
        styleTag.innerHTML =
            '.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
            '.chatstylesbut {width: 15px; height:15px; background-image: url("http://images1.cuantocabron.com/images/iconos_memes.jpg"); cursor: pointer; border-color: rgb(153, 153, 153) rgb(153, 153, 153) rgb(136, 136, 136); border-style: solid; border-width: 1px; }'+
            '.chat_arrow { background-image: url("http://images9.cuantocabron.com/images/iconos_memes.jpg"); background-position: 0 -48px; height: 5px; width: 9px; }';
        headTag.appendChild(styleTag);
    }
    
    ArrowStyleUp = 'cursor: pointer; position: absolute; right: 5px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
    ArrowStyleDown = 'cursor: pointer; position: absolute; right: 5px; '
    
    fEmotBarDom = document.createElement('div');
    fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
    
    fEmotsListDom = document.createElement('div');
    fEmotsListDom.setAttribute('name','EmotsList');
    fEmotBarDom.appendChild(fEmotsListDom);


    
    for(i=0;i<emotsInfo.length;i+=1) {
        var fEmotsDom = document.createElement('img');
        fEmotsDom.setAttribute('alt',emotsInfo[i]);
        fEmotsDom.setAttribute('width','50px');
        fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');
        fEmotsDom.setAttribute('src',spemotsInfo[i]);
        fEmotsDom.setAttribute('class','emote_img');
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
        if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout uiToggleFlyout')[0])
            fInsertEmotBar(event.target);
    }

    function fInsertEmotBar(fChatWrapper) {
        fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutInner')[0]
        fNewEmotBar = fEmotBarDom.cloneNode(true);
        setVisibility(fNewEmotBar);
        for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

        fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
        fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
        
        fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
        if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[0]);
var chatElement = document.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout uiToggleFlyout');
var cELenth = chatElement.length;
for(var i = 0; i<cELenth; i++){
chatElement[i].setAttribute('style','height:550px;');
}
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