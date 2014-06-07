// ==UserScript==
// @author	    Lindblum
// @name		Spelling/Grammar Cleanup
// @version	    1.01
// @description Scrub webpages for basic text errors, because it's not the end user who needs spell-check; The Internet needs it. Tested on Chrome. Caveats: Proper names can be affected. Submitting text copied from the page will to other users appear altered. Grammar correction is limited. 
// @include	    *://*
// @icon        http://www.gravatar.com/avatar/16abdd07c774068d6fa80c4155cc5077
// @copyright   2013, Lindblum
// ==/UserScript==

function mainTextReplace(){

	function capitalizeFirstChar(str){
		return str.charAt(0).toUpperCase() + str.substring(1);
	} //capitalizeFirstChar

	function capitalizeFirstCharEveryToken(str){
		var tokens = str.split(" ");
		for(var i=0; i<tokens.length; i++)	tokens[i] = capitalizeFirstChar(tokens[i]);
		return tokens.join(" ");
	} //capitalizeFirstCharEveryToken

	function getNonEmptyTextNodes(){
		var elements = document.querySelectorAll("body,body *");
		var results = [];
		for(var i=0; i<elements.length; i++){
			var children = elements[i].childNodes;
			for(var j=0; j<children.length; j++)
				if(children[j].nodeType==3 && children[j].nodeValue.trim())
					results.push(children[j]);
		}
		return results;
	} //getNonEmptyTextNodes

	function addRep(){
		for(var i=0; i<arguments.length; i++)
			replacements.push(arguments[i]);
	} //addRep

	function performReplacements(str){
		for(var j=0; j<replacements.length; j++){
			if(replacements[j]){
				var split = replacements[j].split(":");
				if(split && split.length==2){

					var after = split[1].trim();
					var afterSplit = after.split(",");
					var befores = split[0].split(",");
					for(var b=0; b<befores.length; b++){
						var before = befores[b].trim();
						var after = afterSplit[parseInt(afterSplit.length*Math.random())];
						var boundary = "\\b";
						var prefixWild = before.indexOf("-")==0, suffixWild = before.lastIndexOf("-")==before.length-1;
						if(prefixWild){
							before = before.substring(1);
							after = after.substring(1);
						}
						if(suffixWild){
							before = before.substring(0,before.length-1);
							after = after.substring(0,after.length-1);
						}
						var Before = capitalizeFirstChar(before), After = capitalizeFirstCharEveryToken(after);
						var BEFORE = before.toUpperCase(), AFTER = after.toUpperCase();
						str = str.replace(new RegExp((prefixWild?"":boundary)+BEFORE+(suffixWild?"":boundary), "g"), (before.length<=4&&after.length>4?After:AFTER));
						str = str.replace(new RegExp((prefixWild?"":boundary)+Before+(suffixWild?"":boundary), "g"), After);
						str = str.replace(new RegExp((prefixWild?"":boundary)+before+(suffixWild?"":boundary), "g"), after);
					} //for
				} //if
			} //if
		} //for
		return str;
	} //performReplacements

	function performAllReplacements(i){
		if(i==null)	i = 0;
		if(i==0){	//Get started
			startTime = new Date().getTime();
			textNodes = getNonEmptyTextNodes();
		}
		if(i>=textNodes.length){ //Finished, start over
			var duration = new Date().getTime()-startTime;
			setTimeout(function(){	performAllReplacements(0);	}, 7500);	//Start over in a while
			return;
		}
		//General case
		var untilTime = new Date().getTime()+150;		//Use time increments for script to be busy
		for(;i<textNodes.length && new Date().getTime()<untilTime; i++){
			try{
				var node = textNodes[i], str = node.nodeValue;
				if(!node.textReplaced && str.indexOf("<")==-1){
					str = performReplacements(str);
					node.nodeValue = str;
					node.textReplaced = true;
				}
			}catch(ex){}
		} //for
		//Iterate
		setTimeout(function(){	performAllReplacements(i);	}, 10);
	} //performAllReplacements

	(function(){
		textNodes = [], replacements = [];

		if(true){	//Spelling:ABCD
			//A
			addRep("a+r+dva+rk-:aardvark-");
			addRep("ac+es+or-:accessor-");
			addRep("ac+[aei]d[ae]nta?l+y:accidentally");
			addRep("ac+om+[aeio]dat-:accommodat-");
			addRep("ac+ount-:account-");
			addRep("ac+rossed:accross");
			addRep("ac+ur[aei]te-:accurate-","ac+ur[aei]cy:accuracy");
			addRep("acheiv-:achiev-");
			addRep("ac+ros+:across");
			addRep("aco?ustic-:acoustic-");
			addRep("ac?quir-:acquir-");
			addRep("ad+ress-:address-");
			addRep("adulte?ry:adultery");
			addRep("[ae]e?sthetic-:aesthetic-");
			addRep("af+irm-:affirm-");
			addRep("af+raid:afraid");
			addRep("ag+reg+at-:aggregat-");
			addRep("ag+res+i-:aggressi-");
			addRep("air ?bou?rne?:airborne");
			addRep("al+ready:already");
			addRep("al+right:all right");
			addRep("ambi[ae]nce:ambiance","ambi[ae]nt:ambient");
			addRep("am+end-:amend-");
			addRep("am[ou]c?k:amok");
			addRep("answ?er-:answer-");
			addRep("ap+[ao]c[ao]l[iy]p[cs]e?:apocalypse","ap+[ao]c[ao]l[iy]ptic:apocalyptic");
			addRep("ap+ar[ae]nt-:apparent-");
			addRep("ap+au?l+ing:appalling");
			addRep("ap+rov-:approv-");
			addRep("arc?tic:arctic");
			addRep("argue?m[ae]nt-:argument-");
			addRep("as+yl[eu]m:asylum");
			addRep("athi?ei?si?t-:atheist-");
			addRep("a[dt]+[aei]tude-:attitude-");
			addRep("au?th[ao]r[aei]t-:authorit-");
			addRep("-av[ae]i?l+[aei]b+-:-availab-");
			addRep("awe?ful+:awful");
			addRep("awe?some?:awesome");
			//B
			addRep("barbe[cq]ue:barbecue");
			addRep("barga?i?n-:bargain-");
			addRep("basica?l+y:basically");
			addRep("be?a?ure?a?u?o?cra-:bureaucra-");
			addRep("bea?utiful+:beautiful");
			addRep("beg+in+ing:beginning");
			addRep("begg[ae]r:beggar");
			addRep("beleif,belife:belief","bele?iv-:believ-");
			addRep("ben[ei]fit-:benefit-");
			addRep("bil+ion-:billion-");
			addRep("blaim:blame","blaims:blames","blaiming:blaming");
			addRep("bore?ing:boring");
			addRep("bounda?ry:boundary");
			addRep("bo?u?rge?ois-:bourgeois-");
			addRep("breif-:brief-");
			addRep("broc+o?l+i:broccoli");
			addRep("b[auf]+oon:buffoon");
			addRep("bu?oy[ae]n-:buoyan-");
			addRep("b[eu]rlesqu?e?:burlesque");
			addRep("bu?i?s+i?ness:business");
			//C
			addRep("cafe:café");
			addRep("cal+[ae]nd[ea]r:calendar");
			addRep("c[ao]m+[ae]r+ad[ae]r+i?e?y?:camaraderie");
			addRep("cand[aei]date-:candidate-");
			addRep("can+[ai]ba?le?-:cannibal-");
			addRep("car+eer:career");
			addRep("car+i?age:carriage");
			addRep("cat+[ae]gory:category");
			addRep("catastr[ao]ph[ye]:catastrophe");
			addRep("cem[ae]t[ae]ry:cemetery");
			addRep("chauf+eu?r:chauffeur");
			addRep("chedd[ae]r:cheddar");
			addRep("cheif:chief");
			addRep("clame:claim");
			addRep("co[mn]f[eo]rt-:comfort-");
			addRep("com+[ae]nt-:comment-");
			addRep("comm[aeo]n:common");
			addRep("com+[ei]t+m[aei]nt-:commitment-");
			addRep("com+[ei]t+ee:committee");
			addRep("conciev-:conceiv-");
			addRep("condemn?:condemn");
			addRep("control+:control");
			addRep("cons?ci[ae]n-:conscien-");
			addRep("cons?cious-:conscious-");
			addRep("congra[dt]+ulat-:congratulat-");
			addRep("conq?u[eo]r-:conquer-");
			addRep("con[cs]en[cs]us:consensus");
			addRep("con[cs]en[cst]ual-:consentual-");
			addRep("consist[ae]n-:consisten-");
			addRep("contr[ao]ver[cs]-:controvers-");
			addRep("corp[eo]r[aei]t-:corporat-");
			addRep("coun[cs][ei]l+[eo]r-:counselor-");
			addRep("counterfe?it-:counterfeit-");
			addRep("-cred[ai]b-,-credib-");
			//D
			addRep("dach?sh?[aou]nd-:dachshund-");
			addRep("deciev-:deceiv-");
			addRep("defen[cs]e-:defense-");	//US
			addRep("def[aei]n[aei]n?t-:definit-");
			addRep("dem+ocrate?:democrat");
			addRep("deod[eo]r[ae]nt:deodorant");
			addRep("-d[ae]p+end[ae]n-:-dependen-");	//US
			addRep("des?cend-:descend-");
			addRep("d[ei]sp[ae]ir-:despair-","desp[ae]r[aei]t-:desperat-");
			addRep("d[ei]spis-:despis-","d[ei]spic+able:despicable");
			addRep("det+er+[aei]nt:deterrent");
			addRep("dif+e?r[aei]n-:differen-");
			addRep("dis[cg]ust-:disgust-");
			addRep("d[ei]vid-:divid-","devision:division");
			addRep("dim[ae]n[st]ion-:dimension-");
			addRep("dis+aster-:disaster-","dis+aste?rous:disastrous");
			addRep("dis+ap+ea?r-:disappear-");
			addRep("dis+ap+oint-:disappoint-");
			addRep("d[ei]scr[ei]m+[aei]n+[aei]t+-:discriminat-");
			addRep("dieing:dying");
			addRep("doll[ae]r?:dollar","doll[ae]r?s:dollars");
		}
		if(true){	//Spelling:EFGH
			//E
			//addRep("e-?mail:e-mail");
			addRep("eachother:each other");
			addRep("exta[cs]y,ecsta[cs]y","extatic:ecstatic");
			addRep("eigh?th:eighth");
			addRep("[aei]l+im[aei]n+at-:eliminat-");
			addRep("embar+[ae]s+-:embarrass-");
			addRep("emp[eo]r+[eo]r:emperor");
			addRep("emp?ty:empty","emp?t[iy]ness:emptiness");
			addRep("environ?m[ae]nt-:environment-");
			addRep("epit+[ao]m[ey]:epitome");
			addRep("[ei]r+ad[ai]cat-:eradicat-");
			addRep("e[sx]pe[ct]i[ae]l+y:especially");
			addRep("e[sx]pres+o:espresso");
			addRep("e[tx] ?c?ete?ra:et cetera");
			addRep("ev[io]l+ut-:evolut-");
			addRep("exh?aust:exhaust");
			addRep("excede,[ae]ccede:exceed");
			addRep("exceding-,[ae]cceding-:exceeding-");
			addRep("exc?el:excel","exc?el+[ae]n-:excellen-");
			addRep("exs?ist-:exist-","existance:existence");
			addRep("experi[ae]nc-:experienc-");
			addRep("exper[aei]m[ae]nt-:experiment-");
			addRep("e?x-?tre+me?:extreme");
			//F
			addRep("fagg[eio]t:faggot");
			addRep("fas?cie?s-:fascis-");
			addRep("famil+i?[ae]r-:familiar-");
			addRep("fah?renheig?h?t:Fahrenheit");
			addRep("-feas[ai]b-:-feasib-");
			addRep("febr?uary:February");
			addRep("fiance+:fiancée");
			addRep("fin+al+y:finally");
			addRep("forieg?n,foreig?n:foreign");
			addRep("fou?re?father-:forefather-");
			addRep("fore?see-:foresee-");
			addRep("fou?rty:forty");
			addRep("freind:friend");
			addRep("frust[eu]?rat-:frustrat-");
			addRep("ful+fil+-:fulfill-");
			//G
			addRep("gaff:gaffe","gaffs:gaffes");
			addRep("genio?us:genius");
			addRep("g[ei]r+af+e?:giraffe","g[ei]r+af+e?s:giraffes");
			addRep("jist:gist");
			addRep("goodbye?:goodbye");
			addRep("govern?m[aei]nt-,govt:government-");
			addRep("gramm[ae]r:grammar");
			addRep("-gre?ate?ful+:-grateful");
			addRep("gu?au?ru?au?ntee-:guarantee-");
			addRep("gaurd-:guard-");
			addRep("gul+[ai]b-:gullib-");
			//H
			addRep("h[ae]r+as+-:harass-");
			addRep("hai?re?-?brained:harebrained");
			addRep("heih?gh?th?:height");
			addRep("he?l+p+:help");
			addRep("helpful+:helpful");
			addRep("hes[aei]tat-:hesitat-");
			addRep("he?u?r[ei]stic-:heuristic-");
			addRep("hig?h?light-:highlight-");
			addRep("hippy-:hippie-");
			addRep("hor+[ai]ble:horrible");
			addRep("h[iy]p+ocrit-:hypocrit-","h[iy]p+ocr[ai][cs]y:hypocrisy");
			addRep("hyp[aeo]r?derm-:hypoderm-");
		}
		if(true){	//Spelling:IJKL
			//I
			addRep("id[eo]i[ao]?t:idiot","id[eo]i[ao]?cy:idiocy");
			addRep("ignor[ae]n-:ignoran-");
			addRep("il+[ei]g[ae]l-:illegal-");
			addRep("in?m+atur-:immatur-");
			addRep("im+ediate?ly:immediately");
			addRep("impe[ae]ch-:impeach-");
			addRep("impl[ei]m+ent-:implement-");
			addRep("incid[ae]nt[a]l+y:incidentally");
			addRep("ind[aei]p[ae]nd[ae]n-:independen-");
			addRep("insp[aei]r-:inspir-");
			addRep("intel+[aei]g[aei]n-:intelligen-");
			addRep("int[ae]n[cs]-:intens-");
			addRep("inte?r[ei]st-:interest-");
			addRep("inter+upt-:interrupt-");
			addRep("ir+egardless:regardless");
			addRep("ir+[aei]s[ei]st[ai]ble:irresistible");
			//J
			addRep("jav[ae]l+in-:javelin-");
			addRep("jea?lo?u[cs]-:jealous-");
			addRep("jeo?p[ae]rd-:jeopard-");
			addRep("julery,jewele?ry:jewelry");
			addRep("judi[ct]i?al:judicial");
			addRep("jud?g?e?m[ae]nt-:judgment-");	//U.S.
			//K
			addRep("k?now?l+[ae]d?ge:knowledge");
			//L
			addRep("labo?rato?r-:laborator-");
			addRep("lea?gu?e:league");
			addRep("lemon ?ai?de?:lemonade");
			addRep("l[ei]git:legit");
			addRep("l[ei]git[ai]m[ai]te-:legitimate-");	//TODO: Debug
			addRep("lense?:lens");
			addRep("leng?h?th?:length");
			addRep("liai?son-:liaison-");
			addRep("lib+e?r[ae]l-:liberal-");
			addRep("libr?[ae]r+y:library");
			addRep("li[cs][ae]n[cs]e-:license-");
			addRep("lite:light");
			addRep("lig?h?te?ning:lightning");
			addRep("liek:like");
			addRep("limou?[sz]ine-:limousine-");
			addRep("li[ae]r-:liar-","lieing:lying");
			addRep("lit+er[ae]l:literal","lit+er[ae]l+y:literally");
			addRep("loath:loathe");
			addRep("lol+[iy]pop:lollipop");
			addRep("l+o+v+e+:love");
		}
		if(true){	//Spelling:MNOP
			//M
			addRep("man+e?uver:maneuver");
			addRep("maint[ae]i?n[ae]nce:maintenance");
			addRep("mal+[ai]ce:malice");
			addRep("mal+[ae]v[aeo]l+[ae]n-:malevolen-");
			addRep("mand[aei]tory:mandatory");
			addRep("mar+i?age:marriage");
			addRep("mast[eu]rbat-:masturbat-");
			addRep("mathe?matics:mathematics");
//			addRep("maths:mathematics");
			addRep("m[ei]di?ei?v[aei]l:medieval");
//			addRep("momento:memento");
			addRep("mil+en+ium:millennium");
			addRep("mil+ion-:million-");
			addRep("mil+ionaire?-:mil+ionaire-");
			addRep("missi?le-:missile-");
			addRep("mis+pell-:misspell-");
			addRep("m[ou]nke?y:monkey","m[ou]nkys,m[ou]nkies:monkeys");
			addRep("moa?tion:motion");
			addRep("mon[ai]t[eo]r-:monitor-");
			addRep("morays:mores");
			addRep("mou?nta?i?n-:mountain-");
			//N
			addRep("naive:naïve","naiv[aei]t[ey]:naïveté");
			addRep("nau?s[ei][au]m:nauseam");
			addRep("nec+es+ar-:necessar-");
			addRep("n[ae]ig?h?b[eo]r-:neighbor-");
			addRep("nine?ty:ninety");
			addRep("nite:night");
			addRep("nooo+:no");
			addRep("noone:no one");
			addRep("notice?able:noticeable");
			addRep("nui?s+[ae]n[cs]e:nuisance");
			//O
			addRep("obedi[ae]n[cs]e:obedience");
			addRep("oc+as+ion-:occasion-");
			addRep("one?ly:only");
			addRep("outrag[ei]?o?us:outrageous");
			addRep("overha[luw]l-:overhaul-");
			//P
			addRep("par+al+el+:parallel");
			addRep("parli?ai?m[aei]nt-:parliament-");
			addRep("partica?le?:particle","partica?le?s:particles");
			addRep("pas+t+ime-:pastime-");
			addRep("pavil+i?on-:pavilion-");
			addRep("pa[iy]e?d:paid");
			addRep("pi?ea?ce?ful+:peaceful");
			addRep("perform[ae]n-:performan-");
			addRep("persist[ae]n-:persisten-");
			addRep("pet+ition:petition");
			addRep("phara?oa?h?:pharaoh","phara?oa?h?s:pharaohs");
			addRep("phen+om+[aei]n+-:phenomen-");
			addRep("peice:piece");
			addRep("pinata:piñata");
			addRep("pit+y:pity");
			addRep("pokemon:pokémon");
			addRep("populus:populace");
			addRep("portugu?ese:Portuguese");
			addRep("-poss[aei]b-:-possib-");
			addRep("pr?er?cip+[aei]t+at-:precipitat-");
			addRep("pref+er[ae]n-:preferen-");
			addRep("pregnan?te?:pregnant");
			addRep("pr?[ae]r+og+[aeio]tive-:prerogative-");
			addRep("pe?r[eio]?scrib-:prescrib-","pe?r[eio]?scrip-:prescrip-");
			addRep("pres[aei]d[ae]nt-:president-");
			addRep("pr[ei]t+y:pretty");
			addRep("priv[aei]l+[aei]d?g-:privileg-");
			addRep("proc+e+dur-:procedur-");
			addRep("prof+es+[eo]r-:professor-");
			addRep("proh[aei]bit-:prohibit-");
			addRep("-prono?unciation:-pronunciation");
			addRep("prop+er-:proper-");
			addRep("prop+[ao]ga-:propaga-");
			addRep("-pr[aeio]p+ortion-:-proportion-");
			addRep("prot[aeo]gey?:protégé");
			addRep("protoc[ao]l+:protocol","protoc[ao]l+s:protocols");
			addRep("publica?l+y:publicly");
		}
		if(true){	//Spelling:QRST
			//Q
			addRep("qu?al+[aei]f-:qualif-");
			//R
			addRep("rab+ies:rabies");
			addRep("ras?ci?e?i?st-:racist-","ras?ci?e?i?sm:racism");
			addRep("real+y:really");
			addRep("reciev-:receiv-");
			addRep("reci?ei?p?t-:receipt-");
			addRep("rec+om+end-:recommend-");
			addRep("r[ei]d[ei]cul-:ridicul-");	//Make wildcard for suffix
			addRep("r[aei]frid?g[ae]rat[eo]r-:refrigerator-","r[aei]frid?g[ae]ration:refrigeration");
			addRep("rel[ae]v[ae]n-:relevan-");
			addRep("religi?on-:religion-","religi?ous:religious");
			addRep("republic[ao]n:republican");
			addRep("res+ervi?oi?r-:reservoir-");
			addRep("res+ist[ae]n-:resistan-");
			addRep("respon[cs][aei]b-:responsib-");
			addRep("resta?u?rau?nt:restaurant");
			addRep("rh?et[eo]ric-:rhetoric-");
			addRep("rh?ythm-:rhythm-");
			addRep("riddens:riddance");
			addRep("roman?ji:romaji");
			addRep("rott[aeo]n:rotten");
			//S
			addRep("sab+[ao]tag-:sabotag-","sab+[ao]t[eo]ure?-:saboteur-");
			addRep("sal+[aei]vat-:salivat-");
			addRep("sandles:sandals");
			addRep("sacr[aei]l[aei]ge:sacrilege","sacr[aei]l[aei]gi?ous:sacrilegious");
			addRep("sal+ary,sal+ery:salary");
			addRep("sanc?t[aei]moa?n[ei]?ous:sanctimonious");
			addRep("sandwh?it?ch-,sammich-:sandwich-");
			addRep("sa[dt]+[aei]l+ite-:satellite-");
			addRep("scandle,scand[ae]l:scandal");
//			addRep("scar+y:scary");	//Usually
			addRep("seige:siege");
			addRep("sc?en[cs]e:sense","sc?en[cs]es:senses");
			addRep("sent[ae]nc-:sentenc-");
			addRep("sep[ae]?rate:separate");
			addRep("sequ[ae]l:sequel");
			addRep("se?a?rge?a?nt:sergeant");
			addRep("sh[aei]n+an+[aei]g+[aei]n-:shenanigan-");
			addRep("shin+ing:shining");
			addRep("sill[iy]ness:silliness");
			addRep("sim[aei]l+[ae]r-:similar-");
			addRep("snuck:sneaked");
			addRep("sooo+:so");
			addRep("soilent:soylent");
			addRep("spa[ct]ial:spatial");
			addRep("spagh?et+i:spaghetti");
			addRep("speach-:speech-");
			addRep("spons[eo]r-:sponsor-");
			addRep("staid:stayed");	//Usually
			addRep("sotp:stop","stop+ing:stopping");
			addRep("strat[ae]g-:strateg-");
			addRep("sub?t+le:subtle");
			addRep("suc+es+:success","suc+es+ful+:successful");
			addRep("super[cs]e+de?:supersede");
			addRep("supposably:supposedly");
			addRep("sup+ress-:suppress-");
			addRep("supr[ae]m[aei][cs]-:supremac-");
			addRep("sur?p+rise:surprise");
			addRep("s[eu]rv[ae]il-:surveil-");
			addRep("suspi[ct]i?ous:suspicious","suspi[ct]ion:suspicion");
			//T
			addRep("tamb[aeo]u?rine-:tambourine-");
			addRep("taste?y:tasty");
			addRep("tat+oo-:tattoo-");
			addRep("tat+ooe?d:tattooed");
			addRep("dat:that");
			addRep("teh:the");
			addRep("tend[ae]ncy:tendency");
			addRep("thanx,thank'?s:thanks");
			addRep("them ?sel[fv]e?s?:themselves");
			addRep("thier:their");
			addRep("theif:thief","theifs,theives:thieves");
			addRep("thresh+old:threshold");
			addRep("thru:through");
			addRep("tol+[ae]r[ae]n-:toleran-");
			addRep("tom+or+ow:tomorrow");
			addRep("tou?ngu?e:tongue");
			addRep("tonite:tonight");
			addRep("trav[aei]sty:travesty");
			addRep("tril+ion-:trillion-");
			addRep("trip+le:triple");
			addRep("true?ly:truly");
			addRep("turbulan-:turbulen-");
			addRep("twelv?f?th:twelfth");
			addRep("t[eiy]r+an+y:tyranny","t[eiy]r+an+[ai]cal:tyrannical");
		}
		if(true){	//Spelling:UVWXYZ
			//U
			addRep("[au]lterior:ulterior");
			addRep("until+:until");
			addRep("use?ing:using");
			//V
			addRep("vac+u+m-:vacuum-");
			addRep("val+ua?ble:valuable");
			addRep("vio?l[ae]n[cs]e:violence","vio?l[ae]nt:violent");
			addRep("vil+ai?n:villain");
			addRep("wa[ \\-]?l+ah?,voila");
			//W
			addRep("war-ior-,warrior-");
			addRep("wen?dn?e?sday,Wednesday");
			addRep("wierd-:weird-");
			addRep("wh?e?a?re?hous-,werehous-");
			addRep("where ?ever:wherever");
			addRep("wh?ether:whether");
			addRep("wh?ich:which");
			addRep("wh?it?chever:whichever");
			addRep("wh?ist?le-:whistle-");
			addRep("w[ou]nderful+:wonderful");
			addRep("worthwh?ile:worthwhile");
			//Y
			addRep("yac?ht-:yacht-");
			addRep("yeah?:yeah");
			addRep("yeild:yield");
			//
			addRep("pse?udo-:pseudo-");
			addRep("-ceing:-cing","-deing:-ding","-keing:-king");
		}
		if(true){	//Plurals
			addRep("babys:babies");
			addRep("bounda?rys,bounda?ries:boundaries");
			addRep("cactuses:cacti");
			addRep("criterias,criterions:criteria");
			addRep("flys:flies");
			addRep("heroe?s:heroes");
			addRep("kni[fv]es:knives");
			addRep("lea[fv]v?s:leaves");
			addRep("m[ou]nke?ys:monkeys","m[ou]nkies:monkeys");
			addRep("partys:parties");
			addRep("phenomenons:phenomena");
			addRep("polychorons:polychora");
			addRep("polyhedrons:polyhedra");
			addRep("potatoe?s:potatoes");
			addRep("remedys:remedies");
			addRep("spys:spies");
			addRep("theorys:theories");
			addRep("tomatoe?s:tomatoes");
			addRep("vertexes:vertices");
			addRep("vortexes:vortices");
		}
		if(true){	//Apostrophe
			addRep("’:'");
			addRep("alway'?s:always");
			addRep("give'?s:gives");
			addRep("say'?s:says");
		}
		if(true){	//Contractions
			addRep("ai'?n'?t:ain't");
			addRep("are'?n'?t:aren't");
			addRep("ca'?n'?t:can't");
			addRep("could'?n'?t:couldn't");
			addRep("does'?n'?t,dose'?n'?t:doesn't");
			addRep("do'?n'?t:don't");
			addRep("has'?n'?t:hasn't");
			addRep("have?'?n'?t:haven't");
			addRep("he'?s:he's","she'?s:she's");
			addRep("i'?m:I'm");
			addRep("innit:isn't it");
			addRep("is'?n'?t:isn't");
			addRep("get'?s:gets");
			addRep("someone'?s:someone's");
			addRep("that'?s:that's");
			addRep("there'?s:there's");
			addRep("they'?re:they're");
			addRep("was'?n'?t:wasn't");
			addRep("were?'?n'?t:weren't");
			addRep("what'?s:what's");
			addRep("who'?s:who's");
			addRep("whose to:who's to");
			addRep("wo'?n'?t:won't");
			addRep("would'?n'?t:wouldn't","could'?n'?t:couldn't","should'?n'?t:shouldn't");
			addRep("you'?re:you're");
		}
		if(true){	//Lets,Let's
			addRep("lets go to:let's go to","lets say:let's say");
			addRep("let's on:lets on","let's in:lets in","let's out:lets out");	//Prepositions
			addRep("let's you:lets you","let's me:lets me","let's us:lets us","let's him:lets him","let's her:lets her");	//Pronouns
			addRep("it let's:it lets","that let's:that lets","this let's:this lets","which let's:which lets");	//Pronouns
		}
		if(true){	//Its,It's
			addRep("its not:it's not","its in:it's in","its for:it's for");	//Prepositions
			addRep("its my:it's my","its your:it's your");	//Pronouns
			addRep("it's own:its own");
			addRep("its called:it's called","its over:it's over");
			addRep("of it's:of its","in it's:in its","with it's:with its","at it's:at its","on it's:on its","to it's:to its");	//Prepositions
			addRep("have it's:have its","has it's:has its","had it's:had its");
			addRep("give it's:give its","gives it's:gives its","gave it's:gave its");
			addRep("taking it's:taking its","took it's:took its");
		}
		if(true){	//There,Their,They're
			addRep("there own:their own","there feelings:their feelings");
			addRep("their are:there are","their were:there were","their is:there is","their was:there was");	//Be
			addRep("their can:there can","their may:there may","their may:there ought");	//Conditional
			addRep("their would:there would","their could:there could","their should:there should");	//Conditional
			addRep("theirs a:there's a","theirs an:there's an","theirs the:there's the");	//Articles
			addRep("to they're:to their","at they're:at their","in they're:in their","out they're:out their","on they're:on their");	//Prepositions (Sometimes there will be better)
		}
		if(true){	//Your,You're
			addRep("your so:you're so","your not:you're not");
//			addRep("your gay:you're gay","your dumb:you're dumb","your stupid:you're stupid");	//Usually
			addRep("your a:you're a","your an:you're an","your the:you're the");	//Articles
			addRep("your to:you're too");
			addRep("your probably:you're probably");
			addRep("your welcome:you're welcome");
			addRep("your my:you're my");	//Posession
			addRep("use you're:use your","do you're:do your");	//Verbs
			addRep("be you're:be your","is you're:is your","was you're:was your","were you're:were your");	//Be
			addRep("in you're:in your");	//Prepositions
			addRep("its your,it'?s you're:it's your");
		}
		if(true){	//Then,Than
			addRep("-er then:-er than");
			addRep("different than,different to:different from");	//Prepositions
			addRep("worse then,worse than:worse than","better then:better than");
			addRep("more then:more than","less then:less than");
		}
		if(true){	//Affect,Effect
			addRep("take affect:take effect","takes affect:take effect");
			addRep("the affect:the effect","the affects:the effects");
			addRep("side affect:side effect","side affects:side effects");
			addRep("effects me:affects me","effects you:affects you","effects us:affects them","effects you:affects them");	//Pronouns
		}
		if(true){	//Who,Whom
			addRep("by who:by whom","to who:to whom");
			addRep("by whoever:by whomever","to whoever:to whomever");
		}
		if(true){	//Phrases
			//Phrases
			addRep("a ?c+ap+el+a:a cappella");
			addRep("all and all:all in all");
			addRep("all of the sudden:all of a sudden");
			addRep("back and fou?rth:back and forth");
			addRep("beckon call:beck and call");
			addRep("begs belief:beggars belief");
			addRep("butt naked:buck naked");
			addRep("canvas the:canvass the");
			addRep("censure out:censor out");
			addRep("could care less:couldn't care less");
			addRep("crap shoot:crap chute");
			addRep("day[ \\-]in[ \\-]age:day and age");
			addRep("doggy[ \\-]dog[ \\-]world:dog-eat-dog world");
			addRep("do'?s and don'?t'?s:dos and don'ts");
			addRep("every since:ever since");
			addRep("goodness'?s? sakes?:goodness' sake");
			addRep("hai?le? and he?ar[dt]y:hale and hardy");
			addRep("hardly never:hardly ever");
			addRep("he?ar[dt]y meal:hearty meal");
			addRep("intensive purposes:intents and purposes");
			addRep("l[ae]i?[sz]+e?z?y[ \\-]fai?re?:laissez-faire");
			addRep("make due:make do");
			addRep("me either:me neither");
			addRep("mute point:moot point","point is mute:point is moot");
			addRep("mother[ \\-]?load:mother lode");
			addRep("never the less:nevertheless","none the less:nonetheless");
			addRep("needles+ to say:needless to say");
			addRep("now[ \\-]a[ \\-]days:nowadays");
			addRep("per ?say:per se");
			addRep("peak my interest:pique my interest","peak your interest:pique your interest");
			addRep("peaks my interest:piques my interest","peaks your interest:piques your interest");
			addRep("peaked my interest:piqued my interest","peaked your interest:piqued your interest");
			addRep("shoe[ \\-]?in:shoo-in");	//Usually
			addRep("so fun:so much fun");	//Usually
			addRep("statut?e of limitation-:statue of limitation-");
			addRep("strike a cord:strike a chord","struck a cord:struck a chord");
			addRep("tenant of:tenet of","tenants of:tenets of");	//Usually
			addRep("wet my appetite:whet my appetite","wet your appetite:whet your appetite");
			addRep("wets my appetite:whets my appetite","wets your appetite:whets your appetite");
			addRep("whet my whistle:wet my whistle","whet your whistle:wet your whistle");
			addRep("whets my whistle:wets my whistle","whets your whistle:wets your whistle");
			addRep("w?hole lot:whole lot","w?hole bunch:whole bunch");
			//Verbs
			addRep("I advise-:I advice-","you advise-:you advice-");	//Pronouns
			addRep("hone in on:home in on");
			addRep("-reing :-ring");
			addRep("-seing :-sing");
			addRep("-ateing :-ating","-iteing :-iting","-oteing :-oting");
			addRep("-ring it's:-ring its");
			addRep("-ting it's:-ting its");
			addRep("I done:I did");
			addRep("I seen:I saw");
//			addRep("I were:I was");
			//Nouns
			addRep("gold bo?ui?lli?on:gold bullion");
			addRep("HIV virus:HIV","HPV virus:HPV");
			addRep("iced? tea:iced tea");
			addRep("perspective client-:prospective client-","perspective cust-:prospective cust-","perspective empl-:prospective empl-");
//			addRep("a looser:a loser","the looser:the loser");	//Usually
			addRep("alot:a lot","allot of:a lot of");
			addRep("baited breath:bated breath");
			addRep("climatic scene:climactic scene");
			addRep("sle?ight of hand:sleight of hand");
			addRep("petty larceny:petit larceny");
			addRep("prostr?ate gland-:prostate gland-","prostr?ate infection:prostate- infection-","prostr?ate cancer-:prostate cancer-");
			addRep("dire straights:dire straits");
			addRep("whack job:wack job");
			//Other
			addRep("an alumni:an alumnus");
			addRep("a proph[aei][cs]y:a prophecy","the proph[aei][cs]y:the prophecy");	//Articles
			addRep("a predominan?te?:a predominant","the predominan?te?:the predominant");	//Articles
//			addRep("-an decent:-an descent","-ani decent:-ani descent");
			addRep("no if:know if");
//			addRep("no that:know that");
			addRep("no whether:know whether");
			addRep("breech of:breach of");
			addRep("lie threw:lie through","lying threw:lying through");
			addRep("away form:away from");
			addRep("closed?[ \\-]minded:close-minded");
			addRep("waist of:waste of","to waist:to waste");
			addRep("accept for:except for");
			addRep("anyways:anyway");
			addRep("seams to:seems to");	//Usually
			addRep("anyway to:any way to");
			addRep("how dose:how does","dose it:does it","dose the:does the");
			addRep("am exited:am excited","is exited:is excited","was exited:was excited");	//Be
			addRep("my breathe:my breath");
			addRep("to breath:to breathe","can breath:can breathe");
			addRep("of co[au]?rse:of course");
			addRep("oppose to:opposed to");	//Usually
			addRep("suppose to:supposed to");	//Usually
//			addRep("use to:used to");
			addRep("would of:would have","could of:could have","should of:should have","must of:must have");
			addRep("of been:have been");
			addRep("wouldn't of:wouldn't have","couldn't of:couldn't have","shouldn't of:shouldn't have","mustn't of:mustn't have");
//			addRep("to much:too much");	//Usually
			addRep("apart of:a part of");
			addRep("it dose:it does");
			addRep("i loose:i lose");
			addRep("will loose:will lose");
			addRep("loose weight:lose weight");
			addRep("loose my:lose my","loose your:lose your");
			addRep("to loose:to lose","loosing:losing","looses:loses");
			addRep("I thing:I think");
			addRep("we was:we were");
		}
		if(true){	//Capitals
			addRep("3d:3D");
			addRep("i:I");
			addRep("dr:Dr","mr:Mr","mrs:Mrs","ms:Ms","jr:Jr","sr:Sr");
			addRep("asap:ASAP");
			addRep("bs:BS");
			addRep("cd:CD");
			addRep("xbox:XBox");
			addRep("playstation:PlayStation");
			addRep("paypal:PayPal");
			addRep("youtube:YouTube");
			addRep("ebay:eBay");
			addRep("iphone:iPhone","ipod:iPod","itouch:iTouch","itunes:iTunes");
			addRep("microsoft:Microsoft");
			addRep("beyonce+:Beyoncé");
			addRep("islam:Islam");
			addRep("judaism:Judaism");
			addRep("christian:Christian","christianity:Christianity");
			addRep("jesus:Jesus");
			addRep("mary:Mary");
			addRep("john:John");
			addRep("paul:Paul");
			addRep("george:George");
			addRep("nba:NBA");
			addRep("nfl:NFL");
			addRep("gta:GTA");
			addRep("hp:HP");
			addRep("ip:IP");
			addRep("iq:IQ");
			addRep("mp3:MP3");
			addRep("mp3s:MP3s");
			addRep("ok:OK");
			addRep("rom:ROM");
			addRep("roms:ROMs");
			addRep("tv:TV");
			addRep("ufo:UFO");
			addRep("ufos:UFOs");
			addRep("usb:USB");
			addRep("english:English");
			addRep("spanish:Spanish");
			addRep("japanese:Japanese");
			addRep("chinese:Chinese");
			addRep("africa:Africa");
			addRep("america:America");
			addRep("asia:Asia");
			addRep("astralia:Australia");
			addRep("australia:Australia");
			addRep("europe:Europe");
			addRep("isreal:Israel");
			addRep("venus:Venus");
			addRep("mars:Mars");
			addRep("ares:Ares");
			addRep("jupiter:Jupiter");
			addRep("zeus:Zeus");
			addRep("saturn:Saturn");
			addRep("uranus:Uranus");
			addRep("neptune:Neptune");
			addRep("pluto:Pluto");
			addRep("hades:Hades");
		}
		if(true){	//A/An
			addRep("a a-:an a-","a e-:an e-","a i-:an i-","a o-:an o-","a u-:an u-");
			addRep("an b-:a b-","an c-:a c-","an d-:a d-","an f-:a f-","an g-:a g-","an h-:a h-");	//H can go either way
			addRep("an j-:a j-","an k-:a k-","an l-:a l-","an m-:a m-","an n-:a n-");
			addRep("an p-:a p-","an q-:a q-","an r-:a r-","an s-:a s-","an t-:a t-");
			addRep("an v-:a v-","an w-:a w-","an x-:a x-","an y-:a y-","an z-:a z-");
			addRep("a herb-:an herb-");
			addRep("a historic-:an historic-");
		}

		document.title = performReplacements(document.title);
		setTimeout(performAllReplacements, 300);
	})();
} //mainTextReplace

//Inject
(function(){
	var script = document.createElement("script");
	script.appendChild(document.createTextNode("("+ mainTextReplace +")();"));
	(document.body || document.head || document.documentElement).appendChild(script);
})();
