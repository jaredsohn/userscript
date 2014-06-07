// ==UserScript==
// @name           Lojban Lujvo Expander
// @namespace      http://rossogilvie.ath.cx/lojban
// @include        *
// ==/UserScript==

function expandLujvo(lujvo) 
{
	var result = "";
	var noy = lujvo.toString().split('y');  /*no y*/
	var lookup = new Array(); /*all ready to be looked up*/
	var count = 0; 
	for(var i = 0; i < noy.length; i++)
	{
		var rafsi = noy[i];
		while(countLetters(rafsi)>5)
		{
			if(countLetters(rafsi.substring(0,3)) == 3)
			{
				lookup[count] = rafsi.substring(0,3);
				rafsi = rafsi.substring(3);
				count++;
			} else if(countLetters(rafsi.substring(0,4)) == 3)
			{
			lookup[count] = rafsi.substring(0,4);
			rafsi = rafsi.substring(4);
			count++;
			}
			else { break; } 
		} 
		lookup[count] = rafsi.trim(); 
		count++;
	}  
	for(var i = 0; i < lookup.length; i++) 
	{
		var rafsi = lookup[i];
		if(rafsi.length == 5)
		{
			result += rafsi + " ";
		} else if(countLetters(rafsi) == 3)
		{
			result += lookUpGismu(rafsi) + " ";
		} else { result += rafsi + " "; } 
	}  
	return result.substring(0,result.length-1);
}

function countLetters(word) 
{
	if(word.length == 4 && word.charAt(2) == '\'')
		{ return 3; } 
	return word.length; 
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");}

function lookUpGismu(rafsi)
{
	gis = {"ba'a":"barna","ba'e":"balre","ba'i":"banli","ba'o":"banro","ba'u":"bacru","bab":"zbabu","bac":"bancu","bad":"bandu","baf":"bakfu","bag":"bargu","bai":"bapli","baj":"bajra","bak":"bakni","bal":"banli","bam":"jbama","ban":"bangu","bap":"bapli","bar":"bartu","bas":"basti","bat":"batci","bau":"bangu","bav":"balvi","bax":"banxa","baz":"banzu","be'a":"bersa","be'e":"bende","be'i":"benji","be'o":"bemro","be'u":"betfu","beb":"bebna","bed":"bende","bef":"betfu","beg":"bengo","bei":"bevri","bej":"benji","bem":"bemro","ben":"besna","ber":"berti","bes":"bersa","bet":"betri","bev":"bevri","bi'a":"bilma","bi'e":"brife","bi'i":"jbini","bi'o":"binxo","bi'u":"bitmu","bic":"bifce","bid":"bindo","bif":"brife","big":"bilga","bij":"briju","bik":"bikla","bil":"bilni","bim":"bitmu","bin":"jbini","bir":"birka","bis":"bisli","bit":"birti","biv":"bi","bix":"binxo","biz":"bi'i","bla":"blanu","ble":"ruble","bli":"bliku","blo":"bloti","blu":"ciblu","bo'a":"boxna","bo'e":"brode","bo'i":"botpi","bo'o":"boxfo","bo'u":"bongu","bof":"boxfo","bog":"bongu","boi":"bolci","bol":"bolci","bon":"boxna","bor":"bo","bot":"botpi","bra":"barda","bre":"bredi","bri":"bridi","bro":"xebro","bru":"burcu","bu'a":"bruna","bu'e":"bunre","bu'i":"bu","bu'o":"budjo","bu'u":"bukpu","bud":"bunda","buj":"budjo","buk":"bukpu","bul":"bu'a","bum":"bumru","bun":"bruna","bur":"bunre","bus":"bu","ca'a":"cabra","ca'e":"catke","ca'i":"catni","ca'o":"canko","ca'u":"canlu","cab":"cabna","cac":"tcaci","cad":"cando","caf":"cafne","cag":"cange","cai":"carmi","caj":"canja","cak":"calku","cal":"canlu","cam":"carmi","can":"canre","cap":"ckape","car":"carna","cas":"ckasu","cat":"cartu","cau":"claxu","cav":"carvi","cax":"caxno","caz":"ca'a","ce'a":"cecla","ce'i":"cteki","ce'o":"ce'o","ce'u":"cecmu","cec":"ce","ced":"cerda","cei":"cevni","cek":"creka","cel":"cecla","cem":"cecmu","cen":"centi","cer":"cerni","ces":"censa","cev":"cevni","cez":"ce'i","cfa":"cfari","cfi":"cfila","cfu":"ricfu","ci'a":"ciska","ci'e":"ciste","ci'i":"cinri","ci'o":"citno","ci'u":"ckilu","cib":"ci","cic":"cilce","cid":"cidni","cif":"cifnu","cig":"cigla","cij":"cinje","cik":"cikna","cil":"cilta","cim":"cilmo","cin":"cinse","cip":"cipra","cir":"citri","cis":"crisa","cit":"citno","civ":"civla","ciz":"cizra","cka":"ckana","cke":"ckeji","cki":"ciksi","cko":"cokcu","cku":"cukta","cla":"clani","cli":"cilre","clu":"culno","cma":"cmalu","cme":"cmene","cmi":"cmima","cmo":"cmoni","cmu":"jicmu","cna":"canpa","cne":"cenba","cni":"cinmo","cno":"condi","cnu":"macnu","co'a":"co'a","co'e":"co'e","co'i":"cmoni","co'u":"co'u","coi":"condi","col":"co","com":"co'e","con":"condi","cor":"cortu","cpa":"cpacu","cpe":"cpedu","cpi":"cipni","cpu":"lacpu","cra":"crane","cre":"certu","cri":"cirko","cro":"cortu","cru":"curmi","cta":"catlu","cte":"nicte","cti":"citka","cto":"xecto","ctu":"ctuca","cu'a":"cuxna","cu'e":"ckule","cu'i":"cumki","cu'o":"cunso","cu'u":"cuntu","cuc":"cutci","cuk":"cukla","cul":"cumla","cum":"cumki","cun":"cunso","cup":"clupa","cur":"curnu","cus":"cusku","cut":"cutne","cuv":"curve","cux":"cuxna","da'a":"damba","da'e":"danre","da'i":"darxi","da'o":"darno","da'u":"danlu","dab":"damba","dac":"dacru","dad":"dandu","daf":"danfu","dag":"dargu","dai":"dacti","daj":"dadjo","dak":"dakfu","dal":"danlu","dam":"danmo","dan":"danti","dap":"dapma","dar":"darno","das":"dasni","dat":"drata","dau":"darlu","dav":"da","dax":"darxi","daz":"da'a","de'a":"denpa","de'i":"denci","de'o":"delno","de'u":"dertu","deb":"dembi","dec":"decti","deg":"degji","dei":"djedi","dej":"dejni","dek":"dekto","del":"delno","dem":"denmi","den":"denci","dep":"denpa","der":"dertu","des":"desku","det":"detri","di'a":"jdima","di'e":"dirce","di'i":"jdini","di'o":"dinko","di'u":"dinju","dib":"dirba","dic":"dikca","dig":"dirgo","dij":"dinju","dik":"dikni","dil":"dilnu","dim":"dimna","din":"jdini","dir":"dicra","diz":"dizlo","dja":"cidja","dje":"djedi","dji":"djica","djo":"sadjo","dju":"sidju","do'i":"donri","do'o":"dotco","doi":"do","don":"do","dor":"donri","dot":"dotco","dra":"drani","dre":"derxi","dri":"badri","dro":"cidro","dru":"drudi","du'a":"dunda","du'e":"dukse","du'i":"dunli","du'o":"du","du'u":"dunku","dub":"du","dud":"dunda","dug":"dugri","duj":"dunja","duk":"dunku","dul":"jduli","dum":"du'u","dun":"dunli","dur":"dunra","dus":"dukse","dut":"dukti","dza":"da","dze":"dzena","dzi":"dizlo","dzu":"cadzu","fa'a":"farna","fa'e":"fatne","fa'i":"facki","fa'o":"fanmo","fa'u":"farlu","fac":"fatci","fad":"fadni","fag":"fagri","fai":"fatri","fak":"facki","fal":"farlu","fam":"fanmo","fan":"falnu","fap":"fapro","far":"farna","fas":"fraso","fat":"fatne","fau":"fasnu","fav":"farvi","fax":"fraxu","faz":"fanza","fe'a":"fenra","fe'i":"fetsi","fe'o":"fenso","fe'u":"fengu","feb":"febvi","fed":"fendi","feg":"fengu","fei":"fepni","fek":"fenki","fem":"femti","fen":"fenso","fep":"fepni","fer":"fenra","fes":"festi","fet":"fetsi","fi'a":"cfika","fi'e":"finpe","fi'i":"finti","fi'o":"friko","fi'u":"cfipu","fic":"frica","fig":"figre","fik":"cfika","fil":"frili","fin":"finti","fip":"finpe","fir":"flira","fis":"filso","fit":"friti","fla":"flalu","fle":"flecu","fli":"fliba","flo":"foldi","flu":"fulta","fo'a":"fo'a","fo'e":"fo'e","fo'i":"fo'i","fo'o":"fonmo","foi":"foldi","fom":"fonmo","fon":"fonxa","fra":"frati","fre":"ferti","fri":"lifri","fro":"forca","fru":"frumu","fu'a":"funca","fu'e":"fuzme","fu'i":"fukpi","fuk":"fukpi","ful":"fulta","fun":"funca","fur":"fusra","fuz":"fuzme","ga'a":"grana","ga'e":"ganse","ga'i":"galfi","ga'o":"ganlo","ga'u":"galtu","gac":"gapci","gad":"gadri","gaf":"galfi","gai":"gacri","gal":"galtu","gan":"ganra","gap":"gapru","gar":"garna","gas":"ganse","gat":"gasta","gau":"gasnu","gax":"ganxo","gaz":"ganzu","ge'a":"gerna","ge'o":"gento","ge'u":"gerku","gei":"gleki","gej":"genja","gek":"gleki","gen":"gerna","ger":"gerku","get":"gento","gex":"genxu","gi'a":"gidva","gi'e":"zgike","gi'o":"gigdo","gi'u":"gismu","gic":"glico","gid":"gidva","gig":"gigdo","gik":"ginka","gim":"gismu","gin":"jgina","gir":"girzu","git":"jgita","gla":"glare","gle":"gletu","gli":"glico","glu":"gluta","goc":"gocti","got":"gotro","gra":"grake","gre":"pagre","gri":"girzu","gru":"gurni","gu'a":"gunka","gu'e":"gugde","gu'i":"gusni","gu'o":"gunro","gub":"gubni","guc":"gutci","gud":"gundi","gug":"gugde","guk":"guska","gum":"gunma","gun":"gunka","gur":"gunro","gus":"gusni","gut":"gunta","guz":"guzme","ja'a":"jatna","ja'e":"jalge","ja'i":"jadni","ja'o":"jarco","ja'u":"jgalu","jab":"janbe","jac":"djacu","jad":"jadni","jaf":"jamfu","jag":"jalge","jai":"jgari","jaj":"jmaji","jak":"jarki","jal":"janli","jam":"jamna","jan":"janco","jap":"jaspu","jar":"jdari","jas":"jansu","jat":"janta","jau":"djacu","jav":"ja","jba":"jbari","jbe":"jbena","jbi":"jibni","jbo":"lojbo","jbu":"jubme","jda":"lijda","jde":"kajde","jdi":"jdice","jdu":"jduli","je'a":"jecta","je'e":"jetce","je'i":"jersi","je'o":"jegvo","je'u":"jetnu","jec":"jecta","jed":"jendu","jef":"jeftu","jeg":"jegvo","jei":"jenmi","jel":"jelca","jem":"jenmi","jen":"jenca","jer":"jbera","jes":"jesni","jet":"jetnu","jev":"je","jex":"jerxo","jez":"jei","jga":"jganu","jge":"jgena","jgi":"jgira","ji'a":"jinga","ji'e":"jmive","ji'i":"jinvi","ji'o":"jipno","ji'u":"jvinu","jib":"jibri","jic":"jimca","jif":"jitfa","jig":"jinga","jij":"jijnu","jik":"jikca","jil":"jilka","jim":"jinme","jin":"djine","jip":"jipno","jir":"jinru","jis":"jinsa","jit":"jimte","jiv":"jinvi","jiz":"jinzi","jma":"jamfu","jme":"jemna","jmi":"jimpe","jo'e":"jorne","jo'o":"jordo","jo'u":"jo'u","joi":"joi","jol":"joi","jom":"jo'e","jon":"jorne","jor":"jordo","jov":"jo","ju'a":"jufra","ju'e":"julne","ju'i":"jundi","ju'o":"djuno","jub":"jubme","jud":"jundi","juf":"jufra","jug":"jungo","juk":"jukni","jul":"junla","jum":"jurme","jun":"djuno","jup":"jukpa","jur":"junri","jus":"jursa","jut":"jutsi","juv":"ju","jux":"juxre","jva":"javni","jve":"je","jvi":"jivna","jvo":"lujvo","ka'a":"katna","ka'e":"kakne","ka'i":"krati","ka'o":"kanro","ka'u":"kantu","kab":"karbi","kac":"kancu","kad":"kandi","kaf":"ckafi","kag":"kagni","kai":"ckaji","kaj":"kanji","kak":"klaku","kal":"kanla","kam":"ka","kan":"kansa","kap":"skapi","kar":"kalri","kas":"kalsa","kat":"kalte","kau":"kampu","kav":"kavbu","kax":"kanxe","ke'a":"kevna","ke'e":"ke'e","ke'i":"kecti","ke'o":"kelvo","ke'u":"krefu","kec":"kecti","kei":"kelci","kej":"ckeji","kel":"kelci","kem":"ke","ken":"kenra","kep":"ke'e","ker":"kerlo","kes":"kensa","ket":"ketco","kev":"kevna","kez":"kei","ki'a":"krixa","ki'e":"kicne","ki'i":"ckini","ki'o":"kilto","ki'u":"krinu","kic":"kicne","kij":"kijno","kik":"ckiku","kil":"kinli","kin":"skina","kir":"ckire","kis":"kisto","kit":"kliti","kix":"krixa","kla":"klama","kle":"klesi","kli":"klina","klo":"diklo","klu":"kulnu","ko'a":"kojna","ko'e":"kolme","ko'i":"kobli","ko'o":"skoto","ko'u":"konju","kob":"kobli","koi":"korbi","koj":"kojna","kok":"korka","kol":"kolme","kom":"komcu","kon":"konju","kor":"korbi","kos":"kosta","kot":"skoto","kra":"krasi","kre":"kerfa","kri":"krici","kro":"korcu","kru":"kruvi","ku'a":"kumfa","ku'e":"kuspe","ku'i":"kurji","ku'o":"skuro","ku'u":"ckunu","kub":"kubli","kuc":"kruca","kuf":"kufra","kuj":"kurji","kuk":"kukte","kul":"ckule","kum":"kumfa","kun":"kunra","kup":"kuspe","kur":"kurfa","kus":"kusru","kut":"kunti","kuz":"ku'a","la'a":"lasna","la'e":"lakne","la'i":"lamji","la'o":"latmo","la'u":"lalxu","lab":"blabi","lac":"lacri","lad":"ladru","laf":"lafti","lag":"vlagi","lai":"klani","laj":"klaji","lak":"lakse","lal":"lanli","lam":"lamji","lan":"lanme","lap":"lacpu","lar":"larcu","las":"slasi","lat":"mlatu","lau":"cladu","lax":"lanxe","laz":"lanzu","le'a":"lebna","le'i":"pleji","le'o":"lenjo","le'u":"lerfu","leb":"lebna","lec":"lerci","led":"mledi","lei":"klesi","lej":"pleji","lek":"lenku","lem":"le'e","len":"lenjo","ler":"lerfu","let":"gletu","li'a":"cliva","li'e":"lidne","li'i":"linji","li'o":"linto","li'u":"litru","lib":"libjo","lic":"litce","lid":"lindi","lif":"lifri","lig":"sligu","lij":"linji","lik":"litki","lil":"livla","lim":"limna","lin":"linsi","lir":"clira","lis":"lisri","lit":"clite","liv":"cliva","lix":"plixa","liz":"li'i","lo'i":"bloti","lo'o":"slovo","lo'u":"lorxu","lob":"lojbo","loi":"loldi","loj":"logji","lol":"loldi","lom":"lo'e","lor":"lorxu","lot":"bloti","lov":"slovo","lu'a":"pluta","lu'e":"klupe","lu'i":"lumci","lu'o":"lubno","lub":"lunbe","luj":"pluja","lum":"lumci","lun":"mluni","lup":"klupe","lur":"lunra","lus":"lunsa","lut":"pluta","luv":"lujvo","luz":"kluza","ma'a":"cmana","ma'e":"marce","ma'i":"masti","ma'o":"cmavo","ma'u":"makcu","mab":"mabru","mac":"manci","mad":"marde","maf":"makfa","mag":"margu","mai":"marji","maj":"marji","mak":"maksi","mal":"mabla","mam":"mamta","man":"manku","map":"mapku","mar":"manri","mas":"malsi","mat":"mapti","mau":"zmadu","mav":"mavji","max":"marxa","me'a":"mleca","me'e":"cmene","me'i":"mensi","me'o":"mekso","me'u":"mentu","meb":"mebri","mec":"mleca","meg":"megdo","mei":"mei","mej":"meljo","mek":"mekso","mel":"melbi","mem":"mei","men":"menli","mer":"merko","mes":"mensi","met":"mentu","mex":"mexno","mi'a":"cmila","mi'e":"minde","mi'i":"minji","mi'o":"misno","mi'u":"mintu","mib":"mi","mic":"mikce","mid":"minde","mif":"mifra","mij":"midju","mik":"mikri","mil":"milti","mim":"cmima","min":"jmina","mip":"mipri","mir":"minra","mis":"misno","mit":"mintu","miv":"jmive","mix":"mixre","mla":"mlana","mle":"melbi","mli":"milxe","mlo":"molki","mlu":"simlu","mo'a":"morna","mo'i":"morji","mo'o":"molro","mo'u":"moklu","mob":"mo'a","moc":"mokca","moi":"moi","moj":"morji","mol":"moklu","mom":"moi","mon":"morna","mor":"morko","mos":"mosra","mov":"mo'i","mra":"marbi","mre":"merli","mri":"mrilu","mro":"morsi","mru":"mruli","mu'a":"murta","mu'e":"munje","mu'i":"mukti","mu'o":"mulno","mu'u":"muvdu","muc":"smuci","mud":"mudri","muf":"mu'e","muj":"munje","muk":"mukti","mul":"mulno","mum":"mu","mun":"smuni","mup":"mupli","mur":"murta","mus":"muslo","mut":"mucti","muv":"muvdu","muz":"muzga","na'a":"nanca","na'e":"natfe","na'i":"nalci","na'o":"cnano","na'u":"namcu","nab":"nanba","nac":"namcu","nad":"nandu","naf":"natfe","nag":"narge","nai":"natmi","naj":"narju","nak":"nakni","nal":"na'e","nam":"nabmi","nan":"snanu","nar":"na","nat":"natmi","nau":"nanmu","nav":"nanvi","nax":"naxle","naz":"nazbi","ne'i":"nenri","ne'o":"cnebo","ne'u":"cnemu","neb":"cnebo","nei":"nelci","nel":"nelci","nem":"cnemu","nen":"nejni","ner":"nenri","ni'a":"cnita","ni'e":"nilce","ni'i":"nibli","ni'o":"cnino","ni'u":"ninmu","nib":"nibli","nic":"cnici","nid":"snidu","nik":"nikle","nil":"ni","nim":"ninmu","nin":"cnino","nip":"snipa","nir":"nirna","nis":"cnisa","nit":"cnita","niv":"nivji","nix":"nixli","no'e":"no'e","no'i":"nobli","noi":"notci","nol":"nobli","non":"no","nor":"no'e","not":"notci","nu'a":"snura","nu'e":"nupre","nu'i":"nutli","nu'o":"nu'o","nuj":"snuji","nuk":"nukni","nul":"nutli","num":"nurma","nun":"nu","nup":"nupre","nur":"snura","nut":"snuti","nuz":"nuzba","pa'a":"pacna","pa'e":"prane","pa'i":"prami","pa'o":"panlo","pa'u":"patfu","pab":"parbi","pac":"palci","pad":"pandi","paf":"patfu","pag":"pagbu","pai":"pajni","paj":"spaji","pak":"palku","pal":"prali","pam":"prami","pan":"panci","pap":"panpi","par":"cpare","pas":"pastu","pat":"pante","pau":"pagbu","pav":"pa","pax":"patxu","paz":"panzi","pe'a":"preja","pe'i":"penmi","pe'o":"pendo","pe'u":"pencu","peb":"penbi","pec":"pencu","ped":"pendo","pei":"pensi","pej":"preja","pel":"pelxu","pem":"pemci","pen":"penmi","per":"perli","pes":"pensi","pet":"petso","pev":"pe'a","pex":"pesxu","pez":"pezli","pi'a":"pilka","pi'e":"plipe","pi'i":"pilji","pi'o":"pipno","pi'u":"pimlu","pib":"plibu","pic":"picti","pid":"pindi","pif":"pinfu","pij":"prije","pik":"pinka","pil":"pilka","pim":"pimlu","pin":"pinta","pip":"plipe","pir":"pixra","pis":"pinsi","pit":"plita","piv":"pi'u","pix":"pinxe","piz":"pi","pla":"platu","ple":"pelji","pli":"pilno","plo":"polje","plu":"daplu","po'a":"spoja","po'e":"ponse","po'i":"porpi","po'o":"ponjo","po'u":"spofu","pof":"spofu","poi":"porsi","poj":"spoja","pol":"polno","pon":"ponjo","pop":"porpi","por":"porsi","pos":"ponse","pot":"porto","pra":"cupra","pre":"prenu","pri":"prina","pro":"fapro","pru":"purci","pu'a":"pluka","pu'e":"pulce","pu'i":"punji","pu'o":"purmo","pu'u":"sputu","puc":"pulce","pud":"purdi","puj":"punji","puk":"pluka","pul":"punli","pum":"purmo","pun":"pruni","pur":"purci","pus":"pu'i","put":"sputu","puv":"pu'u","ra'a":"srana","ra'e":"ralte","ra'i":"ranji","ra'o":"radno","ra'u":"raktu","rab":"xrabo","rac":"ralci","rad":"randa","raf":"rafsi","rag":"rango","rai":"traji","raj":"sraji","rak":"sraku","ral":"ralju","ram":"ranmi","ran":"ranti","rap":"rapli","rar":"rarna","ras":"grasu","rat":"ratni","rau":"gradu","rav":"ragve","rax":"ranxi","raz":"brazo","re'a":"remna","re'e":"trene","re'i":"renvi","re'o":"renro","re'u":"rectu","reb":"rebla","rec":"rectu","red":"bredi","ref":"krefu","rei":"preti","rej":"vreji","rek":"greku","rel":"re","rem":"remna","ren":"trene","rep":"crepu","rer":"renro","res":"respa","ret":"preti","rev":"renvi","ri'a":"rinka","ri'e":"rirxe","ri'i":"ritli","ri'o":"crino","ri'u":"rinju","rib":"cribe","ric":"tricu","rid":"crida","rif":"ricfu","rig":"rigni","rij":"rijno","rik":"rinka","ril":"rilti","rim":"rimni","rin":"krinu","rip":"cripu","rir":"rirni","ris":"rismi","rit":"brito","riv":"rivbi","rix":"trixe","ro'a":"prosa","ro'i":"rokci","ro'o":"ropno","ro'u":"rotsu","rod":"broda","rog":"romge","roi":"roi","rok":"rokci","rol":"ro","rom":"roi","ron":"ropno","ror":"rorci","ros":"prosa","rot":"rotsu","roz":"rozgu","ru'a":"sruma","ru'e":"pruce","ru'i":"pruxi","ru'o":"rusko","ru'u":"rupnu","rub":"ruble","ruc":"pruce","rud":"drudi","ruf":"rufsu","ruj":"kruji","ruk":"rusko","rul":"xrula","rum":"runme","run":"rutni","rup":"rupnu","rur":"sruri","rus":"grusi","rut":"grute","ruv":"kruvi","rux":"pruxi","sa'a":"sanga","sa'e":"satre","sa'i":"sanli","sa'o":"salpo","sa'u":"sarcu","sab":"sabji","sac":"stace","sad":"snada","sag":"sanga","sai":"sanmi","saj":"sanji","sak":"sakci","sal":"sakli","sam":"skami","san":"spano","sap":"sampu","sar":"slari","sas":"srasu","sat":"sakta","sau":"slabu","sav":"savru","sax":"sarxe","saz":"sazri","se'a":"setca","se'i":"sevzi","se'u":"selfu","seb":"steba","sec":"senci","sed":"stedu","sef":"selfu","sei":"sepli","sel":"se","sen":"senpi","sep":"sepli","ser":"serti","set":"senta","sev":"senva","sez":"sevzi","sfa":"sfasa","sfe":"sefta","sfo":"sfofa","sfu":"sufti","si'a":"sinma","si'e":"snime","si'i":"sicni","si'o":"sidbo","si'u":"simxu","sib":"sidbo","sic":"stici","sid":"stidi","sig":"sigja","sij":"skiji","sik":"silka","sil":"siclu","sim":"simxu","sin":"tsina","sip":"sipna","sir":"sirji","sis":"sisku","sit":"sitna","siv":"sivni","six":"sirxo","siz":"si'o","ska":"skari","ske":"saske","ski":"skicu","sko":"skori","sku":"cusku","sla":"salci","sle":"selci","sli":"slilu","slo":"solji","slu":"sluji","sma":"smaji","sme":"semto","smi":"simsa","smo":"smoka","smu":"smuni","sna":"sance","sne":"senva","sni":"sinxa","sno":"masno","snu":"casnu","so'a":"sovda","so'e":"sobde","so'i":"so'i","so'o":"sombo","sob":"sobde","soc":"sorcu","sod":"sodva","sof":"softo","sog":"sorgu","soi":"sonci","soj":"so'a","sol":"solri","som":"sombo","son":"sonci","sop":"so'e","sor":"so'i","sos":"so'o","sot":"so'u","sov":"sovda","soz":"so","spa":"spati","spe":"speni","spi":"spisa","spo":"daspo","spu":"spuda","sra":"sarji","sre":"srera","sri":"dasri","sro":"sorcu","sru":"sruri","sta":"stali","ste":"liste","sti":"sisti","sto":"stodi","stu":"stuzi","su'a":"stura","su'e":"su'e","su'i":"sumti","su'o":"su'o","su'u":"sfubu","sub":"sfubu","suc":"sucta","sud":"sudga","sug":"sunga","suj":"sumji","suk":"suksa","sul":"sunla","sum":"sumti","sun":"stuna","sup":"su'e","sur":"surla","sut":"sutra","suv":"su'u","suz":"su'o","ta'a":"tavla","ta'e":"tanxe","ta'i":"tatpi","ta'o":"tanbo","ta'u":"taxfu","tab":"tabno","tac":"tance","tad":"tadni","taf":"taxfu","tag":"tagji","tai":"tarmi","taj":"tamji","tak":"staku","tal":"talsa","tam":"tarmi","tan":"tsani","tap":"stapa","tar":"tarci","tas":"tansi","tat":"tatru","tau":"tanru","tav":"tavla","tax":"tanxe","taz":"ta","tca":"tcadu","tce":"mutce","tci":"tutci","tco":"ketco","tcu":"nitcu","te'a":"terpa","te'i":"steci","te'o":"stero","te'u":"tengu","teb":"ctebi","tec":"steci","ted":"terdi","tef":"tenfa","teg":"tengu","tei":"temci","tek":"cteki","tel":"stela","tem":"temci","ten":"tcena","tep":"terpa","ter":"te","tet":"terto","ti'a":"tcima","ti'e":"trixe","ti'i":"stidi","ti'o":"ctino","ti'u":"tixnu","tib":"tinbe","tic":"tcica","tid":"tcidu","tif":"ti","tig":"tigni","tij":"tilju","tik":"stika","til":"tcila","tim":"tcima","tin":"tirna","tip":"tikpa","tir":"tirse","tis":"tisna","tit":"titla","tiv":"tivni","tix":"tixnu","tiz":"stizu","to'a":"tonga","to'e":"to'e","to'i":"torni","to'u":"tordu","toc":"troci","tod":"toldi","tog":"tonga","toi":"troci","tok":"toknu","tol":"to'e","ton":"torni","tor":"tordu","tra":"tarti","tre":"mitre","tri":"trina","tro":"jitro","tru":"turni","tsa":"tsali","tse":"zutse","tsi":"tsiju","tsu":"rotsu","tu'a":"tumla","tu'e":"tuple","tu'i":"tugni","tu'o":"tunlo","tu'u":"tubnu","tub":"tunba","tuf":"tu","tug":"tugni","tuj":"tujli","tuk":"tunka","tul":"tunlo","tum":"tumla","tun":"tunta","tup":"tuple","tur":"stura","tut":"tutra","tuz":"stuzi","va'i":"vamji","va'u":"vasxu","vab":"vanbi","vac":"vanci","vai":"vajni","vaj":"vajni","val":"valsi","vam":"vamji","van":"vanju","var":"vacri","vas":"vasru","vat":"vamtu","vau":"vasru","vax":"vasxu","vaz":"va","ve'a":"verba","ve'e":"ve'e","ve'u":"vecnu","vef":"venfu","vei":"vreji","vel":"ve","ven":"vecnu","ver":"verba","ves":"vensa","vi'a":"viska","vi'e":"vitke","vi'i":"vikmi","vi'o":"vitno","vi'u":"vimcu","vib":"vibna","vic":"vimcu","vid":"vindu","vif":"vifne","vij":"vinji","vik":"viknu","vil":"vlile","vim":"vikmi","vin":"jvinu","vip":"vipsi","vir":"vidru","vis":"viska","vit":"vitci","viz":"vi","vla":"valsi","vle":"zivle","vli":"vlipa","vo'a":"voksa","voi":"vofli","vok":"voksa","vol":"vofli","von":"vo","vor":"vorme","vra":"vraga","vre":"vreta","vri":"virnu","vro":"vorme","vru":"savru","vu'e":"vrude","vu'i":"vrusi","vu'o":"vukro","vud":"vrude","vur":"vukro","vus":"vrusi","vuz":"vu","xa'a":"xatra","xa'e":"xance","xa'i":"xarci","xa'o":"xampo","xa'u":"xabju","xab":"xadba","xac":"xarci","xad":"xadni","xag":"xamgu","xai":"xrani","xaj":"xarju","xak":"xaksu","xal":"xalka","xam":"xajmi","xan":"xance","xap":"xampo","xar":"xanri","xas":"xamsi","xat":"xatsi","xau":"xamgu","xav":"xa","xaz":"xazdo","xe'a":"xedja","xe'i":"xekri","xe'o":"xendo","xe'u":"xenru","xeb":"xebro","xed":"xendo","xei":"xebni","xej":"xedja","xek":"xekri","xel":"xe","xen":"xebni","xer":"xenru","xes":"xelso","xet":"xecto","xex":"xexso","xi'a":"xirma","xi'o":"xriso","xi'u":"xislu","xil":"xislu","xim":"xinmo","xin":"xindo","xip":"xispo","xir":"xirma","xis":"xriso","xla":"xlali","xle":"naxle","xli":"nixli","xlu":"xlura","xoi":"xotli","xol":"xotli","xra":"pixra","xre":"mixre","xri":"maxri","xru":"xruti","xu'a":"xusra","xu'e":"xunre","xu'i":"xukmi","xu'o":"xurdo","xub":"xruba","xuk":"xruki","xul":"xutla","xum":"xukmi","xun":"xunre","xur":"xurdo","xus":"xusra","za'a":"zabna","za'i":"zasti","za'o":"za'o","za'u":"zargu","zac":"zarci","zag":"zargu","zai":"zarci","zaj":"zajba","zal":"zalvi","zan":"zabna","zar":"zanru","zas":"zasni","zat":"zasti","zau":"zanru","zaz":"za'i","zba":"zbasu","zbe":"zbepi","zbi":"nazbi","zda":"zdani","zdi":"zdile","zdo":"xazdo","ze'a":"zenba","ze'e":"ze'e","ze'o":"ze'o","zei":"zekri","zel":"ze","zen":"zenba","zep":"zepti","zer":"zekri","zet":"zetro","zev":"ze'o","zga":"zgana","zgi":"zgike","zgu":"rozgu","zi'e":"zifre","zi'i":"zinki","zi'o":"dzipo","zi'u":"zirpu","zif":"zifre","zin":"zinki","zip":"dzipo","zir":"zirpu","ziv":"zivle","zma":"zmadu","zme":"guzme","zmi":"zmiku","zmu":"zumri","zo'a":"zo'a","zo'i":"zo'i","zon":"zo'a","zor":"zo'i","zu'e":"zukte","zu'i":"zunti","zug":"zungi","zuk":"zukte","zul":"zunle","zum":"zu'o","zun":"zunti","zut":"zutse","zva":"zvati"};
	result = gis[rafsi];
	if(typeof(result) == 'undefined')
		{return "";} 
		else { return result; }
}

//provides to make visible TransBox only on mouse up with the ctrl key pressed
window.addEventListener('mouseup', function(mouseEvent) {
	var boxLeft = window.TransBox.offsetLeft;
	var boxRight = boxLeft + window.TransBox.offsetWidth;
	var boxTop = window.TransBox.offsetTop;
	var boxBottom = boxTop + window.TransBox.offsetHeight;

	if (window.TransBox.style.display == "inline"
			&& (mouseEvent.pageX < boxLeft
					|| mouseEvent.pageX > boxRight
					|| mouseEvent.pageY < boxTop
					|| mouseEvent.pageY > boxBottom)) {
		window.TransBox.stopCapture();
	} 
	else if(window.getSelection() != '' && mouseEvent.ctrlKey)
	{
		window.TransBox.psychicalWavesCapture(mouseEvent, window.getSelection());
	}
}, true);

//create TransBox object and box instance. make it unvisible on start
function engageTransBox() {
	//set global css
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { alert('Page has no head. Lojban Lujvo Expander Failed.'); }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "span.gmTransBox {margin: 1px; border: 1px dotted gray; padding: 0px 5px 0px 5px;}";
	head.appendChild(style);

	var TransBox = document.createElement("div");
	TransBox.id = "gmTransBox";
	
	/* --- TransBox style properties --- */
	TransBox.style.border = "1px solid black";
	TransBox.style.display = "none";
	TransBox.style.position = "absolute";
	TransBox.style.backgroundColor = "white";
	TransBox.style.padding = "2px";
	TransBox.style.font = "verdana";
	TransBox.style.fontSize = "14px";
	TransBox.style.color = "black";
	TransBox.style.textAlign = "left";
	TransBox.style.zIndex = "100";

	//translated text span
	var babelTextSpan = document.createElement("span");

	//put html objects into TransBox box
	TransBox.appendChild(babelTextSpan);

	//set objects into TransBox instance
	TransBox.babelTextSpan = babelTextSpan;

	window.TransBox = TransBox;
	document.body.insertBefore(window.TransBox, document.body.firstChild);

	//hides the TransBox box
	TransBox.stopCapture = function() {
		this.style.display = "none";
	}

	//capture selected text and show the TransBox box near the pointer
	TransBox.psychicalWavesCapture = function(mouseEvent, selectedText) {
		if (this.style.display == "none") {
			this.style.display = "inline";
			this.style.left = (mouseEvent.pageX - 20).toString(10) + 'px';
			this.style.top  = (mouseEvent.pageY - 5).toString(10) + 'px';
			this.babelTextSpan.innerHTML = expandLujvo(selectedText);
		}
	}
}

engageTransBox();