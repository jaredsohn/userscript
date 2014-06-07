// ==UserScript==
// @name       ArabEasy
// @namespace  http://arabeasy.net/
// @version    1.59
// @description  Convert/Transliterate/Romanize Arabic sites to ArabEasy with ALT-A  translate some words inline with ALT-C
// @match      http://*/*
// @grant       none
// @copyright  2013 ArabEasy.net Liam Hahne
// 
// ==/UserScript==
var dico = new Array (
["agrap","means"],
["agtmao","meeting"],
["aHtram","respect"],
["anqlab","coup"],
["anqsam","split"],
["anTbaoa","sign"],
["aqtSad","economy"],
["artab","suspect"],
["astmrar","continu'n"],
["astqale","resign'n"],
["astwmar","investmt"],
["astxdam","use"],
["atfaq","agreemt"],
["Acar","pointed out"],
["Agnbie","foreign"],
["AGlqua","stop"],
["Ahmie","importce"],
["Aia","whatever"],
["Ain","where"],
["Akd","confirmed"],
["Amin","secgen"],
["Aqno","convince"],
["Asasi","main"],
["AuDao","conds"],
["Axra","another"],
["AZn","think"],
["Ajme","crisis"],
["oadie","regular"],
["oam","public"],
["ofs","furniture"],
["oagle","urgent"],
["odid","many"],
["olaq","relation"],
["omlie","issue"],
["onf","violence"],
["oql","mind"],
["orbip","arab"],
["oskrie","milit"],
["baltali","therefore"],
["bbian","state't"],
["brif","rural"],
["btkar","false"],
["daxlie","internal"],
["dom","support"],
["diane","religion"],
["dinie","religious"],
["dlil","proof"],
["dmui","blood"],
["dure","session"],
["Dd","against"],
["DHie","victim"],
["Dmir","conscience"],
["Dmn","among"],
["Drbe","strike"],
["Drure","necessity"],
["dulie","internt'l"],
["4rap","view"],
["4xr","latest"],
["Edane","condem'n"],
["EDafie","extra"],
["Enqlab","coup"],
["Eqlimi","regional"],
["Eqnao","convince"],
["Erhab","terrorism"],
["Erhaq","exhaust'n"],
["Esthtara","disrespect"],
["Ecaoe","rumour"],
["Extlf","differ"],
["faYde","point"],
["frise","prey"],
["frSe","opporty"],
["gamoe","league"],
["ghe","side"],
["gic","army"],
["gmaoe","group"],
["gnaje","funeral"],
["gnsie","nat'l"],
["grime","crime"],
["grip","bold"],
["Gda","tomor"],
["Gnie","rich"],
["Grbie","westn"],
["hdf","obj've"],
["hdie","gift"],
["hgre","immig'n"],
["hgum","attack"],
["hkie","story"],
["hqqe","truth"],
["huatf","phone"],
["Haml","pregnt"],
["Hdiw","modern"],
["Hkme","wise"],
["Hti","even"],
["ictrk","participate"],
["infz","do"],
["ira","believes"],
["irkj","focusses"],
["itHml","bears"],
["itm","avoid"],
["kif","how"],
["kaml","continue"],
["karwe","disaster"],
["kfa","enough"],
["kma","as"],
["kza","etc"],
["lEiqaf","to stop"],
["moarDe","oppos'n"],
["mfagae","surprise"],
["mfrud","flat"],
["mgls","council"],
["mgtmo","community"],
["mgjre","massacre"],
["mhne","profession"],
["mHaid","neutral"],
["mHkma","court"],
["mHakma","trial"],
["mHaule","attempt"],
["mHmule","mobile"],
["mHtmle","possible"],
["mlfe","file"],
["mnasb","occasn"],
["mndub","delegn"],
["mnjlq","sliding"],
["mqablat","interview"],
["mrHle","stage"],
["mrtbTe","linked"],
["msap","eve"],
["mstgdat","develop'ts"],
["mstqbal","future"],
["mstql","indep"],
["mstua","level"],
["msvulie","resp"],
["mSadr","source"],
["mSlHe","interest"],
["mcarke","particpn"],
["mtodde","several"],
["mtHdw","speaker"],
["mtcvbe","complicated"],
["mwabe","as"],
["muhbe","skill"],
["muhub","skilled"],
["mghud","effort"],
["mokda","stressed"],
["muqf","situ'n"],
["mvtmr","conf"],
["mxtlfe","differce"],
["mzahre","demo"],
["mzkrat","memoirs"],
["mjur","false"],
["naYb","deputy"],
["ngaH","success"],
["nsbe","as for"],
["nZam","system"],
["njif","bleeding"],
["laHtlal","occupn"],
["qal","was said"],
["qanun","law"],
["qaTo","conclusive"],
["qbil","before"],
["qDie","cause"],
["qrar","decision"],
["qSaS","revenge"],
["qtl","murder"],
["rAi","opinion"],
["rGm","despite"],
["sabq","earlier"],
["saHe","arena"],
["sbb","reason"],
["sbil","way"],
["siasie","polit"],
["slaH","weapon"],
["sle","force"],
["slam","peace"],
["slbi","neg",""],
["Sarux","rocket"],
["Sbr","patience"],
["Sdur","result"],
["Sft","capacity"],
["SHe","truth"],
["SrH","said"],
["rfD","refusal"],
["rYisip","main"],
["cark","part"],
["cbak","window"],
["cgr","tree"],
["ck","doubt"],
["cip","thing"],
["cqe","flat"],
["crke","company"],
["crT","clause"],
["cxSie","personal"],
["tarix","hist"],
["tawir","impact"],
["totbr","one of"],
["tbain","divergence"],
["tdxl","interventn"],
["tfauD","negovn"],
["thdide","threat"],
["tHda","challenge"],
["tHqiq","investign"],
["tqdm","change"],
["tqlidi","conserv'tv"],
["tra","see"],
["triw","wait"],
["tqdmie","liberal"],
["tSuit","poll"],
["tTur","evolution"],
["tuafqi","harmonious"],
["tuqot","expected"],
["waniaen","secondly"],
["wm","them"],
["wure","revoln"],
["tutr","tension"],
["uadi","valley"],
["ufd","deleg'n"],
["ughat","view"],
["uaDH","clear"],
["uaqo","reality"],
["ugd","present"],
["ugud","presence"],
["ujare","ministry"],
["ujir","minister"],
["xargie","external"],
["xaSe","esp"],
["xTe","plan"],
["xTir","serious"],
["xTr","dangerous"],
["xTue","step"],
["zakre","memory"],
["zbH","slaughter"],
["jauie","angle"],
["Zl","shadow"]
    );
var to_arabeasy = new Array (
// @copyright  2013 ArabEasy.net Liam Hahne
	["\u06d4", "."],
	["\u064e", "a)"],
	["\u064f", "u)"],
	["\u0650", "i)"],
	["\u064b", "N"],
	["\u064c", ""],
	["\u064d", ""],
	["\u0651", "-"],
	["\u0652", ""],
	["ـ", ""],
	["؟", "?"],
	["؛", ";"],
	["،", ","],
	["آ", "4"],
	["ا", "a"],
	["ب", "b"],
	["ت", "t"],
	["ث", "w"],
	["ج", "g"],
	["ح", "H"],
	["خ", "x"],
	["د", "d"],
	["ذ", "z"],
	["ر", "r"],
	["ز", "j"],
	["س", "s"],
	["ش", "c"],
	["ص", "S"],
	["ض", "D"],
	["ط", "T"],
	["ظ", "Z"],
	["ع", "o"],
	["غ", "G"],
	["ف", "f"],
	["ق", "q"],
	["ك", "k"],
	["ل", "l"],
	["م", "m"],
	["ن", "n"],
	["ه", "h"],
	["و", "u"],
	["ي", "i"],
	["ة", "e"],
	["ى", "y"],
	["أ", "A"],
    ["ؤ", "v"],
	["إ", "E"],
	["ئ", "Y"],
	["ء", "p"]
);

function arabeasy(str, kC) {
	//store the orignal and altered html strings
	var altered_s = str;	
	var orig_s = str;	
	if(orig_s && altered_s){

        for(var x in to_arabeasy)    
			altered_s = altered_s.replace(new RegExp(to_arabeasy[x][0], "gm"), to_arabeasy[x][1]);
			
        if (kC == 67) for (var x in dico)
            altered_s= altered_s.replace(new RegExp(dico[x][0], "gm"), dico[x][0]+":"+dico[x][1]);
        
		//return the arabeasy version	
        if (document.URL.indexOf("alarabiya.net")>-1)
        return altered_s;
        else if (document.URL.indexOf("ahram.org.eg")>-1)
            // for ahram.eg stripping &rlm  \u200e is lrm for quirky bold first paragraph 
        return (orig_s+altered_s).replace(/\u200f/g,'');
            else return orig_s+altered_s;
	}		
}

function LoopTextNodesA(node, kC)
    {
        if (node.nodeType == 3)
        {          
          node.data= arabeasy(node.data, kC);  // textnode
        }
        else if (node.hasChildNodes())
        {
                for (var i = 0;i < node.childNodes.length;i++)
                {
                        LoopTextNodesA(node.childNodes[i], kC);
                }
        }
    }
     
// listen for ALT-A 

document.addEventListener('keydown', function(event) {
	if(event.altKey && event.keyCode ==65) { 
        LoopTextNodesA (document, event.keyCode);       		
	}
// listen for ALT-C  with some translations
	else if(event.altKey && event.keyCode ==67) { 
        LoopTextNodesA (document, event.keyCode);       		
	}
}, true);




