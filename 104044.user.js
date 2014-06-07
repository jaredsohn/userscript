// ==UserScript==
// @name           livechat calculator
// @namespace      org.eroim.essime
// @include        http://www.sakuralive.com/jp/viewers/preview.shtml?*
// ==/UserScript==

(function() {
		
	String.prototype.replaceAll = function (org, dest)
	{
		return this.split(org).join(dest);  
	}
	
	Array.prototype.has = function(value)
	{
		var i;
		
		for (var i = 0, loopCnt = this.length; i < loopCnt; i++)
		{
			if (this[i] === value)
			{
				return true;
			}
		}

		return false;
	};
		
		
	var data = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPcAAAAAAFdXVyz/IaioqP///yz/IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAUALAAAAAAQABAA'+
    'AAhoAAsIFAigoMGBCAsUJMCwYcGEABpKdDgw4sSLAAgSGDDgIkcCGSMOKNix4UgAHRcatMhwJciI'+
    'LlUafNnS4kKaIBVOBBBgJ8GSLYFuzPjzIsOREFk6JAqRQE+nORP+RDkSqVSFKw8ODAgAOw==';
	
	var badPerformer = new Array("a0zis023","aaAKOoo","aaAOoo","aaaAYAKAaaa","aaRANNAaa","aaYUMAaa","aaSYURIaa","AcrevaA","AGEMAN2","ai0834","Aikadesu","airi33","aIrI9","AIRIKO","airin502","aine69aine","AK0502","AK05O2","AKARl","AKIchan22","ako88","akov66v","ALANx","AmAmAmAmAm","AMI1209","AMIandXXX","AmixAmi","amk57","AMMam","AMIKAwow","Amyuu","an1919","ANA5","anan19","anANNAna","AngelxHime","ANJUxxx","anv66vd","anzu777","AOIwow","arisa0608","ArisaGG","arisaGO","arisaxGxx","arisu013","asami005","AS0C0","ASAMIinran","ASAMIwow","ASAMIxxkm","ASARIdeYUKARI","ASARItoYUKARI","asuka1asuka","Atomic1919AYA","AxMIDORI","ayaaki0807","AYAKAX","Ayaxchan","AYAYAYAYAYA","ayuna24","AYUxxkm","BB3300","bbbayaddd","BLONDE4U","BxOBAMA","CHACOooo","cafexLATE","cARINAc","cccMIKAccc","ccCOCOACLICKcc","ccKANAcc","cCHIROc","cccRENAccc","CHAK0　CHIIA","Chiina","chiSEXhiromi","CHIAKIv66v","CHUooLIP","cRUKAc","cxMAHIROxc","cxRUKAxc","ddayanebb","ddAMIAMIdd","dddayaddd","ddNANAbb","ddxyukariddx","dildo_show","DOKINchanx","DivaDiva","DOLLxMOMO","DOLOLI","DX3103","dxdools","dxFUUKAxb","dxkakodx","DXmaki","dxMYUUxb","dxNANA","dxNESTAdx","EMIooO","emiri0207","Eriiiiin1919","ero893AKANEE","EMIRIsuki","ERINAaaa","ERUTAN","FakeXXX2601","flowerHimeno","FUMIKAxxx","JESICA","Guccyan","GOGOarisaGOGO","H30000yen","H980EN","HAMUTAROxRIBON","harukav66v","HARUKIccc","HARUNAxuu","HARUwow","hhHARUhh","hina930","HINAaaa","HIRO33chan","HITOMIxxu","HIYOKA","HIYORI0612","HoneyxSayaka","Hosino33","humikanoe","HvREINAvH","HxhuukaxA","ICIGOxsoda","IIemityII","IIHINANOII","iiMIYUii","iiRINii","iiYUINAii","iMARINAi","IORIss","IOxOI","ireteruAIAI","iroka","ixkaguraxi","jiyuran","junDXmika","junv66vd","JURIwow","JYENY","kana1107","KANAKOxxx","KANAxDX","kanon123","KAOEU","KAORUHIME","KARENdxkm","karinchan12","kathryn","KAWAxYUI","keikeikokei","kiraracom","KITTYandMIMIY","KORING","kosse2JK","kumiko555","kNaNak","kuoochan","kurumi","Kuu1","kyouko9575","LarahSune","lhanakol","liil","llNA0ll","llRYOKAll","llssMIKUssll","llYURAsanll","lllreikolll","LOVECOCOoo","loveMOEvol","loveusa","LUCAxH","lvREIKAvl","lvReinavl","lxxmisatoxxl","maaityan8118","madokav66vd","maho04","MaKiSa","MAKItoNANA","mamaremon","ManamixxxCafe","March7th","maria129","mayaSmayaM","mayumayu0618","MEGUwow","MELONDOUGHNUT","MeRay","MEIRI","Michaelxx","mikakichi2002","MiLiMiLi","mina81","MIIxTAA","MIIU","MIUoMIU","MILKxMAMA","MIRIMO3","MIZUHOxoxo","mFUJISANm","michiko22","michuna","miina1","mikimiki69","milk792","MILKiss","misatin201","MARIxxMO","MariNxSKY213","mery1105","miu86","miyabi0207","miyuv66v","mizukichan","mNAGIm","mnyukikomn","moco96","MOCOx2","MOMIJIx","MOMOCHUx","momoko7","momopan","momov66v","morinokumasana","mREIm","MUMUxchan","mutukixdayo","MUUxchan","naMIKIan","nanacochan77","nANZUn","NAMI12","NANA162","Nanamiii","NANAMIoooo","NANAMIwow","natukichan19","NetPet","nnREINAnn","nmyukikomn","NOAoo0","NOAooooo","NORIKO84","nono17","O7O2","o7oNANAMIo7o","O9O4","O9O6","O9O8","oAngelhearTo","oFUUchan","oJEWELo","oKOKONAo","OichigO","OIRNdx","oMAIMIo","OMiyukiO","OmoRUNAomO","oNANAEo","oNAxNAo","ooAIxKAoo","ooAKINAooo","ooAMEoo","o0ChiH0o","ooCHIoo","oofukuoo","ooKANAoo1","OoKUROMICHANoO","OoMANGOoO","oonoaooxx","OOyuumiOO","OOO89","oooooamiooooo","OooERUooO","OOOdesu","oooKORIN","oooKORINooo","oooooKORIN","oooKUMIooo","oooNANAoooo","OoOoOoOoO","oooSORAooo","ooSHOUoo","ooRUNAoo","ooxMIKAMIKAxoo","OoxMEGUxoO","ooYUoZUoo","oRISKo","oRURIo","OSANEcom","OSUSUMEGIRL","otomodati72","ovoMAIovo","ovxAIxvo","OwOmoeOwO","oxAYAKAxo","oxNANAxo","oxRINAox","oxxREixxo","oxxWAKANAxxo","oYUINAo","oYUKINAo","oYUuKAo","PARUtan","peachHIME7","PINKxxSALON","POKOxTIN","POLCHIO","PONPONppp","Potoooooooos","prettyMaYu","paoiq","qChopperp","qoqAKANEpop","QoRIKAoQ","qoYUKINAop","qqazumipp","qqHINATApp","QQmarikaQQ","qqPRINCESSpp", "qqsorapp","qqqMIKIppp","qqqRURIppp","Question000","qwwNANAEwwp","qxRIKOxp","Raku520","RAN0805","raraRIOrara","REIxxchan","RedRibonR","Reina0312","reiv66v","ren19ren","Renchandaisuki","rico1","Rico77","Rico7855","Rin2828","ringodango777","RINAHIMEDESU","rinv66v","rizurinn","RRiri","rro","rubymarine19","RURIooooo","ruu22","ry0uww","RYOooooooo","ryoukov66vd","S2rihoS2","S2risaS2","S2RuiRuiS2","S2pUxUqS2","s2xAIxs2","S2yuunaS2","s81392004","sak1ppe","SAKIpuu","sakurakospring","SALAx","SAxxRA","SAYAKA109","SayakaxHoney","SEKAxCHU","sexAYUsex","sexyRYOUKA","shiho1122","shinov66vd","shiuba1102","SHIZUKUuuu","SIINA0630","SionChan","simamuRARA","SisterPrinces","sMAKORINs","sMANAMIs","snowAMU","soreikeONANI","soRISAos","qqqqRISApppp","ssakanexx","ssMOMOmm","ssRINAss","ssVANILLAss","sssMIYOsss","sssRENAsss","ssRYOuKOs","STEADYooo","suzuxnyan","sumire82xx","suzuTOchisa","sweetGUCCI","sweetYUME","sxNANAxs","sxxxronxxxs","syouchan27","TAKANEKIKU","TEL09039650XXX","tikatika123","TINxxTIN","ToLovexRu","TORAX3","touko12","TSUxGUxMI","TTayaTT","ttya","uEMIRYu","UloveAI","uuuREIuuu","uuuRIKAuuu","VANIRAvv","vCreAv","vCOCOv","VenusStyleYui","voAIxAIov","voARISAov","voERIov","vvHADUKIvv","vvKANAchanvv","vvvKANAvvv","vvvNANAMIvvv","vvvREIKOvvv","vxRIKOxv","vxvREIvxv","vyoumev","w7nana7w","wAIwAIw","wakabaxkaori","WAKAmmRYO","wakana1919","wCOLONw","wenwenwen","withAKI","wmizukiw","woKAYOwo","woMOEwo","wowAKINAwow","wowAOIwow","wowEMIwow","wowMIKUwow","wToMoMiw","wwaichanww","wwAMINAww","wwAYACHANww","wwrikaww","wwSARAww","wwwKAORIwww","wwwyuawww","wxHARU123xw","wYwUwIw","wwwwwRUIwwwww","xAIRIxAIRIx","xdiggy163x","xixannaxix","xixICHIGOxix","xixruuxix","ｘLeNax","xLIONx","xMIAAx","xMILK19MILKx","xNaxrux","xnontanx7","xcoronax","xooRIONoox","XooxMEGUxooX","xooxmihoxoox","xooyurikaoox","xoRUNAox","xoxhimexox","xoxRYOuKOxox","xoxoYUKIoxox","xPEACHPITx","XsSExNAaX","xtommyx","xvcRenkaxcv","xvxMAMIxvx","xx0707xx","xx2Che","xxAm7xx","xxBISCUITxx","xxgreenxx","xxJuna","xxkuraraxx","xxlianxx","xxmakoxx","xxmalilinxx","xmeixx","xxBunnyxx","xxoRIRAoxx","xxMIRAIww","xxMIxKIxx","xxmiyuki88xx","xxmkimikomxx","xxmxMIYUxmxx","xxmxYUMExmxx","xxREIKAxx1","xxRIHOxx","xxriri56xx","XxRr","xxryouxx1","xxxCherry","xxxChiixxx","xxxmarimoxxx","xxxpeachixxx","xxxyuri1xxx","xxxYURIKA","xxxxkyonx2xxxx","xxxrenkaxxx","xxxxSenaxxxx","xxxxxRIONxxxxx","xxXXYxx","xxzzAIRIzzxx","xyhimexy","xYUKARICHANx","YAEdxkm","YoUoY","YURIKAoo","YURIwow","YxxU","YUKAxxxxx","Yukinax3","Yukitan","YURIpink","YUUKAx0721","YUUNAnanodesu","yuuYUUKI","yuzu77","ZhaoYun","ziRINAiz","zxNONxz","zxzMAKIzxz","zzAIRAzz","zzRINAzzy","ZzzHANAzzZ","zzXXYzz","lisa1201");
	
	var log = new Logger(true);
	
	// 3size
	var path = "/html/body/div/div/div/div[5]/table/tbody/tr[3]/td[2]/text()";
	var size3 = x(path, '3size');
	
	var add  = "/html/body/div/div/div/div[5]/table/tbody/tr[3]/td[2]";
	var add_container = x(add, 'add container');
	
	// age
	var age  = "/html/body/div/div/div/div[5]/table/tbody/tr[2]/td[2]/text()";
	var age_container = x(age, 'age container');
	
	// farvorite view
	var fav = '//*[@id="favorite"]';
	var fav_con = x(fav, "fav");
		
	//log.debug(size3.length);
		
	var B = 0;
	var  W = 0;
	var H = 0;
	for(i=0;i<size3.length;i++)
	{
		if(i>0)
		{
			str = size3[i].textContent.replace(/\n/g,'')
									.replace(/\r/g,'')
									.replace(/ /g,'')
									.replace(/cm/g,'')
									.replace(/\//g,'')
									.replace(/\:/g,'');
			if(i==1)
			{
				B = str;
			}
			else if(i==2)
			{
				W = str;
			}
			else if(i==3)
			{
				H = str;
			}
			//log.debug(str);
		}
	}
		
	var diff = B - W - 8 ;
	//log.debug("["+B+"]");
	//log.debug("["+W+"]");
	//log.debug("["+H+"]");
		
	//log.debug(diff);
	var CUP = "AAA";
		
	if(7<=diff && diff<10)
	{
		CUP="AA";
	}
	else if(10<=diff && diff<12)
	{
		CUP="A";
	}
	else if(12<=diff && diff<15)
	{
		CUP="B";
	}
	else if(15<=diff && diff<17)
	{
		CUP="C";
	}
	else if(17<=diff && diff<20)
	{
		CUP="D";
	}
	else if(20<=diff && diff<22)
	{
		CUP="E";
	}
	else if(22<=diff && diff<25)
	{
		CUP="F";
	}
	else if(25<=diff)
	{
		CUP="G";
	}
		
		
	var child = add_container[0].childNodes;
	for(i=0;i<child.length;i++)
	{
		add_container[0].removeChild(child[i]);
	}
	add_container[0].appendChild(cT(B+"cm/"+W+"cm/"+H+"cm"));
	add_container[0].appendChild(cE("BR",{}));
		
		
	var GOOD="SKN";
	if(W>=79)
	{
		GOOD = "GIGA";
	}
	else if(W>=64)
	{
		GOOD = "MEGA";
	}
	else if(W>=59)
	{
		GOOD = "GEN";
	}
	else if(W>=54)
	{
		GOOD = "SLM";
	}
		
		
	// [&nbsp;&nbsp;&nbsp;&nbsp;年齢 - 23]]
	var age_text = age_container[1].textContent.replace(' ','');
		
	var how_young = "teen?";
	if(age_text>30)
	{
		how_young = "old";
	}
	else if(age_text>27)
	{
		how_young = "older";
	}
	else if(age_text>=20)
	{
		how_young ="yourng";
	}
		
	add_container[0].appendChild(cT(" [ "));
	add_container[0].appendChild(cT(how_young));
	add_container[0].appendChild(cT(" : "));
	add_container[0].appendChild(cT(GOOD));
	add_container[0].appendChild(cT(" : "));
	add_container[0].appendChild(cT(CUP));
	add_container[0].appendChild(cT(" ] "));
	add_container[0].setAttribute('style', 'padding-left:1em');
		
	fav_con[0].setAttribute('src','preview_favorites.shtml?true');
	var pa_fav = fav_con[0].parentNode;
	pa_fav.appendChild(cE('iframe', {src:'preview_favorites.shtml?false', width:'820', height:'87', scrolling:'no', frameborder:'0', marginwidth:'0', marginheight:'0'}));
	
	
	// bad Performer check
	
	var badpf = '//td[@class="profile_top"]';
	var badpf2 = '//div[@class="profile_top"]';
	var name_container = x(badpf, 'name_container');
	if(name_container.length<1){
		name_container = x(badpf2, 'name_container');
	}
	
	var name = name_container[0].textContent.replaceAll(/[^a-z0-9]/gi,'');
	
	log.debug("["+name+"]");
	
	//alert(badPerformer.has(name));
	
	var skull = cE('img');
	skull.src = data;
	
	if(badPerformer.has(name))
	{
		name_container[0].appendChild(skull);
	}
  
  
  
  // -------------------- library --------------------
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}
	
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL."+nodesArray.length);
			return null;
		}else{
			return nodesArray;
		}
	}
	
	function Logger(isDebug){
		this.isDebug = isDebug?isDebug:false;
		this.debug = function(text){
			if(this.isDebug) console.log(text);
		}
		this.warn = function(text) {
			if (this.isDebug)console.warn(text);
		}
		this.error = function(text) {
			if (this.isDebug)console.error(text);
		}
		this.fatal = function(text) {
			if (this.isDebug)console.fatal(text);
		}
		this.ast = function(expr, msg) {
			console.group('assert ' + parseInt(Math.random() * 10000));
			console.log(msg);
			console.assert(expr);
			console.groupEnd();
		}
		this.info = function(text) {
			if (this.isDebug) console.info(text);
		}
		this.group = function(text) {
			if (this.isDebug)console.group(text);
		}
		this.groupEnd = function(text) {console.groupEnd();}
		this.dir = function(text){
			if(this.isDebug) console.dir(text);
		}
		this.dirxml = function(text){
			if(this.isDebug) console.dirxml(text);
		}
		this.dummy = function() {}
	}
})();