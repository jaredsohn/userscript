// ==UserScript==
// @name           blalba
// @namespace      Hola
// @include        *.facebook.com/*
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

	
	emotsInfo =   ["0","1","2","3","4","5","6","7", "8", "9", "10", "11", "12"];
	spemotsInfo = ["0","1","2","3","4","5","6","7", "8", "9", "10", "11", "12"];


	
        emotsInfo [0] = " [[334230636605501]] [[335080033169115]] [[314686231886107]] \n [[179637912133385]] [[345951442087087]] [[208631755887293]] \n [[297872013591588]] [[317089564978607]] [[341555305870236]]";
        spemotsInfo [0] ="http://profile.ak.fbcdn.net/hprofile-ak-snc4/372797_312080468826419_735069164_n.jpg";

        emotsInfo [1] = " [[159403400834378]] [[301770873198029]] [[124123621037582]] [[165443303555885]] [[225009720907841]] [[159403400834378]] \n [[143280719116554]] [[325784210773649]] [[240857172651089]] [[326582487367063]] [[243056889098166]] [[159403400834378]] \n [[100126866775028]] [[344748918884490]] [[198318970262933]] [[264742153562246]] [[156223974480296]] [[199239846833770]] \n [[337718332906919]] [[159071504197585]] [[159142267522981]] [[285550151496203]] [[217302108349366]] [[243642895706612]] \n [[159403400834378]] [[297037847004108]] [[273779062680713]] [[206014099486621]] [[329969420355991]] [[222842284460715]]";
        spemotsInfo [1] ="http://t1.gstatic.com/images?q=tbn:ANd9GcQiH6HjOgQ5BH1buNUq6df4o0mGtbvUWjOARoicMKHwq61qDzrGJFfMW28";

        emotsInfo [2]= " [[302111803167367]] [[149973285111436]] [[225420280866694]] [[266125703443078]] [[302489199795649]] \n [[159933744110623]] [[306470046064676]] [[335781066433134]] [[327090507308616]] [[209370209147382]] \n [[222595441151658]] [[144479182330180]] [[205625146193044]] [[215374488545085]] [[336008796427561]] \n [[313179355383436]] [[135748553205834]] [[250024168398519]] [[197779800316568]] [[224772264264878]] \n [[331777086834703]] [[240760999329552]] [[252187468180373]] [[211171525634394]] [[293830290654801]] \n [[223948214347966]] [[332345496777020]] [[336817752996147]] [[327657930592556]] [[197459897013106]] \n [[297685920273004]] [[281899328524298]] [[224880684253358]] [[317833641571276]] [[292082704177749]]";
        spemotsInfo [2]= "http://r26.imgfast.net/users/2614/24/85/96/smiles/3607726417.gif";

        emotsInfo [3]= " [[179756028790264]] [[131478976968398]] [[314076808615174]] [[206240339463055]] [[159403400834378]] \n [[200992799990165]] [[196243973803636]] [[270956806292431]] [[346811212001437]] [[328107453874590]] \n [[196721100420672]] [[317586898261340]] [[298140226892101]] [[214914048591653]] [[350101681673756]] \n [[123765061073750]] [[245710415498757]] [[243298355738272]] [[138812572897166]] [[149419131833071]] \n [[158310927607841]] [[310752072297702]] [[316528255036793]] [[335475163146590]] [[221503331260136]] \n [[241781875890038]] [[218268384920510]] [[189509191144351]] [[302618756443499]] [[182961465135557]] \n [[206151719471944]] [[223223751088260]] [[158685720904140]] [[249080145157161]] [[310957895604838]]";
        spemotsInfo [3]= "http://es6.beruby.com/uploads/es/forums/users/0015/6765/yao-ming-meme_thumb.jpg?1311237042";

        emotsInfo [4]= " [[222233554520712]] [[155093667926316]] [[159374644168797]] \n [[265556180170509]] [[272006802857159]] [[144596118984229]] [[198806320212294]] [[155432547893166]] \n [[239088996160999]] [[293626150673074]] [[203611766392684]] [[214124502002999]] [[268692779851733]] \n [[181312795299893]] [[269771269745545]] [[189131527848966]] [[121039688013447]] [[347460675267390]] \n [[116007985184523]] [[267703239958069]] [[209491689137152]] [[335109106501612]] [[286053824778978]] \n [[140147629431094]] [[286265654759471]] [[208524709231940]] [[135568263223992]] [[265887476807116]]";
        spemotsInfo [4]= "http://foro.ethernityzone.cl/public/style_emoticons/default/foreveralone.png";


        emotsInfo [5]= " [[159403400834378]] [[297487363621407]] [[220961894649526]] [[135921843188987]] [[281219301903813]] [[199562043466774]] \n [[295738517127851]] [[155658844536513]] [[209549519130890]] [[142176999226854]] [[246689415397308]] [[199562043466774]] \n [[238766052862259]] [[307299595976209]] [[217652968315422]] [[189042331191521]] [[286721874712929]] [[344476392245488]] \n [[208520335900424]] [[280378908678680]] [[289772571069549]] [[271456079578545]] [[316530365035101]] [[288356997877538]] \n [[291702580880362]] [[165637363538400]] [[150244831751625]] [[241130952627573]] [[120930761357725]] [[325867137432308]] \n [[154842501286195]] [[286053358112869]] [[149316288510313]] [[250243511707871]] [[291635414215481]] [[344254632266885]] \n [[276412539074685]] [[131586963624296]] [[333374550025341]] [[327570193933422]] [[199699430120687]] [[136021593179546]]";
        spemotsInfo [5]= "http://a3.twimg.com/profile_images/1535056767/funny-date-girl-guy-true-story-meme_normal.jpg";


        emotsInfo [6]= " [[265434590178748]] [[164991926934921]] [[209695692449988]] [[250490361685507]] [[278968458819422]] [[349625665051383]] [[205760419511603]] \n [[312189672135533]] [[299788346731384]] [[268532783202434]] [[266669970059695]] [[204170799672068]] [[187204144709527]] [[331078983588306]] \n [[149240955184679]] [[206407216112871]] [[240669959335314]] [[180619528702085]] [[347768705240557]] [[186661331430535]] [[218646048216424]] \n [[344875905539434]] [[328111047214223]] [[323186421038846]] [[157802940990663]] [[159535350818164]] [[296581710385765]] [[271261609598535]]";
        spemotsInfo [6]= "http://fs02.androidpit.info/aico/x55/2063955-1303424193797.png";



        emotsInfo [7]= " [[258968244165876]] [[286666501379430]] [[262520713809098]] [[159049157536013]] [[307904395916212]] \n [[225447050864310]] [[209926462425564]] [[138411019605305]] [[221670374577056]] [[154671737968862]] \n [[138007062977844]] [[291747794194724]] [[122952454488304]] [[337561022923016]] [[288878907831075]] \n [[240630206008013]] [[264223330304357]] [[319462458078703]] [[239286912807413]] [[288721814513254]] \n [[265575850170635]] [[345354905481875]] [[209004679185391]] [[259785247417432]] [[159480014157666]] \n [[267428346644787]] [[239034746168540]] [[350046018344350]] [[209260572491236]] [[198316980259626]] \n [[310959705610393]] [[214054278676095]] [[200638253359905]] [[334455703231303]] [[158066514298630]]";
        spemotsInfo [7]= "http://a3.twimg.com/profile_images/1188527401/PokerFace_normal.png";

        emotsInfo [8]= "[[10150425979186326]] [[10150425979236326]] [[10150425979391326]] [[10150425979441326]] [[10150425979466326]] [[10150425979526326]]\n[[10150425979626326]] [[10150425979671326]] [[10150425979186326]] [[10150425979186326]] [[10150425979186326]] [[10150425979986326]] [[10150425980006326]]\n[[10150425980066326]] [[10150425980101326]] [[10150425980231326]] [[10150425980436326]] [[10150425980451326]] [[10150425980506326]] [[10150425980561326]]\n[[10150425980646326]] [[10150425980686326]] [[10150425980756326]] [[10150425980831326]] [[10150425980896326]] [[10150425981096326]] [[10150425981191326]]\n[[10150425981251326]] [[10150425981306326]] [[10150425981366326]] [[10150425981406326]] [[10150425981466326]] [[10150425981516326]] [[10150425981591326]]\n[[10150425981651326]] [[10150425981796326]] [[10150425981816326]] [[10150425981876326]] [[10150425981906326]] [[10150425981966326]] [[10150425982006326]]\nM E [[10150425982066326]] [[10150425982101326]] [[10150425982131326]] [[10150425982196326]] [[10150425982261326]]";

        spemotsInfo [8]= "http://r27.imgfast.net/users/2713/22/49/80/smiles/2247619421.jpg";


        emotsInfo [9]= "[[331399223556184]] [[286042634779174]] [[330023780360758]] [[329237617088409]] [[204120926342364]] [[131297490319188]] [[289987304385341]] \n[[295847560451136]] [[278880668827213]] [[260560750675461]] [[264494386943951]] [[208640915887167]] [[270643856326606]] [[334868623190983]] [[263173770411836]] \n[[265844723474789]] [[325742447454304]] [[207587629327321]] [[294223273948603]] [[323449457679402]] [[258622847533513]] [[242014162533924]] [[158386917602797]] \n[[306019522772134]] [[267712979948966]] [[301751889864065]] [[213122875437139]] [[164020277032670]] [[158735217564918]] [[261124587284685]] [[301991303173149]] \n[[114261558693806]] [[113889888730617]] [[316407155046042]] [[316473595041291]] [[346326392049037]] [[284570571589911]] [[298670736837009]] [[186000198162731]] \n[[219939044752270]] [[336155773063546]] [[131032267012645]] [[155856061183812]] [[208532722565686]] [[268249169896142]] [[204863289602546]] [[242397452496887]] \n[[199766206779497]] [[157903644315266]] [[212393248843131]]";

        spemotsInfo [9]= "http://cdn3.sbnation.com/profile_images/186786/trollface_tiny.jpg";

        emotsInfo [10]= "[[159403400834378]] [[350711854942596]] [[181587845273907]] [[158684234236177]] [[351037108247221]] [[200627473361428]]\n[[319903324706941]] [[296000840437382]] [[120826078035368]] [[197216497039069]] [[160081354096525]] [[293380127365491]]\n[[268119093246586]] [[304021742976441]] [[241231115950237]] [[319494974748104]] [[346830568677550]] [[206278946125685]]\n[[165619636871866]] [[327492260603305]] [[212797055468932]] [[331257773559487]] [[219749661438887]] [[298440666864927]]\n";
        spemotsInfo [10]= "http://a2.twimg.com/profile_images/1710758198/Jackie_chan_meme_normal.PNG";

        emotsInfo [11]= "[[159403400834378]] [[257154657685145]] [[132680356847163]] [[290978820948428]] [[334282083267353]] [[198103506950448]] [[210308395722038]]\n[[309975965709366]] [[182868988477905]] [[165741460192459]] [[247622781973379]] [[327617393928947]] [[206584556097316]] [[250789351653750]]\n[[200790820011838]] [[141243869321548]] [[352183231465619]] [[328771830475687]] [[189210541175816]] [[312252498807676]] [[166541650114498]]\n[[208576439231087]] [[205464099541525]] [[241532012586537]] [[328888967128873]] [[245107852224475]] [[145834102193476]] [[186739154755647]]\n[[199838353440893]] [[267276669999507]] [[319332414755054]] [[352534161430714]] [[326839384007613]] [[219389444806813]] [[124982690951818]]\n[[296444440391057]] [[327760950581864]] [[198689786891893]] [[100673290052775]] [[281174871929559]] [[344704255543758]] [[319037018119558]]";
        spemotsInfo [11]= "http://profile.ak.fbcdn.net/hprofile-ak-snc4/41799_321453369178_999_q.jpg";

emotsInfo [12]= "[[197044707054358]] [[318089008211177]] [[206998156055259]] [[101429913310710]] [[150168275092616]]\n[[225080704233783]] [[200644710027535]] [[331864406824363]] [[200459143377911]] [[243235082416386]]\n[[270929596294965]] [[289697937749187]] [[254445704621293]] [[188294871266818]] [[272892776100252]]\n[[138673459579566]] [[303531203022792]] [[219027644842995]] [[160108910762718]] [[348620545163408]]\n[[327177273968753]] [[208595885893580]] [[166675963433866]] [[309991529024218]] [[349449301735291]]\n[[340681072610110]] [[187715964658609]] [[350144085001881]] [[215862811828336]] [[267669143288385]]\n[[159403400834378]] [[240644532673967]] [[140126312766140]] [[265086290221071]] [[201325993290983]]";
spemotsInfo [12]= "http://redlinesp.org/newrlsp/Smileys/smilies/meme_12.png";


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
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 5px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);


	
	for(i=0;i<emotsInfo.length;i+=1) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('width','25px');
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