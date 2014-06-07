// ==UserScript==
// @name           Chibi-Cyber Emoticon For Social Network
// @namespace      Chibi-Cyber Emoticon
// @description    Emoticon Chibi-cyber emoticon untuk jejaring sosial ( Facebook & Google+ )
// @include        http://*.facebook.com/*
// @include        https://twitter.com/*
// @version        1.5
// @author         [C³]Tapuy
// ==/UserScript==


String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	
	var emoticons = [];
		emoticons[":cintaindonesia"] = {
		src: "http://www.jasaadsense.com/wp-content/plugins/kaskus-emoticons/emoticons/I-Luv-Indonesia.gif",
		alt: ":cintaindonesia"
	};	
		emoticons[":maho"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/maho.gif",
		alt: ":maho"
	};	
	emoticons[":santai"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/santai.gif",
		alt: ":santai"
	};	
	emoticons[":akhirnya"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/akhirnya.gif",
		alt: ":akhirnya"
	};
	emoticons[":oek"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/dj.gif",
		alt: ":oek"
	};
	emoticons[":ooo"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/death.gif",
		alt: ":ooo"
	};	
	emoticons[":tinju"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/tinju.gif",
		alt: ":tinju"
	};
	emoticons[":sakit"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/meriang.gif",
		alt: ":sakit"
	};	
	emoticons[":siul"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/bersiul.gif",
		alt: ":siul"
	};
	emoticons[":sombong"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/sombong.gif",
		alt: ":sombong"
	};	
	emoticons[":mesum"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/mesum.gif",
		alt: ":mesum"
	};
	emoticons[":senang"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/senang.gif",
		alt: "senang"
	};	
	emoticons[":perimaho"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/perimaho.gif",
		alt: ":perimaho"
	};	
	emoticons[":tolong"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/tolong.gif",
		alt: ":tolong"
	};	
	emoticons[":yaelah"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/tidur.gif",
		alt: ":yaelah"
	};	
	emoticons[":wtf"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/what-the.gif",
		alt: ":wtf"
	};	
	emoticons[":inidia"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/bigsmile.gif",
		alt: ":inidia"
	};	
	emoticons[":cuek"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/cuek.gif",
		alt: ":cuek"
	};	
	emoticons[":hantu"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/hantu.gif",
		alt: ":hantu"
	};	
	emoticons[":keringat"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/keringat.gif",
		alt: ":keringat"
	};	
	emoticons[":gg"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/gg.gif",
		alt: ":gg"
	};	
	emoticons[":tidak"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/tidaakk.gif",
		alt: ":tidak"
	};	
	emoticons[":frustasi"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/frustasi.gif",
		alt: ":frustasi"
	};	
	emoticons[":kamsia"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/kamsia.gif",
		alt: ":kamsia"
	};	
	emoticons[":malu"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/malu.gif",
		alt: ":malu"
	};	
	emoticons[":ehm"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ehm.gif",
		alt: ":ehm"
	};	
	emoticons[":think"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/berpikir.gif",
		alt: ":think"
	};
	emoticons[":berisik"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/berisik.gif",
		alt: ":berisik"
	};	
	emoticons[":catwoman"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/catwoman.gif",
		alt: ":catwoman"
	};	
	emoticons[":love"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/love.gif",
		alt: ":love"
	};	
	emoticons[":sekarat"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/sekarat.gif",
		alt: ":sekarat"
	};	
	emoticons[":tkp"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/tkp.gif",
		alt: ":tkp"
	};	
	emoticons[":bonyok"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/bonyok2.gif",
		alt: ":bonyok"
	};	
	emoticons[":ganteng"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ganteng.gif",
		alt: ":ganteng"
	};	
	emoticons[":lala"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/lalala.gif",
		alt: ":lala"
	};		
	emoticons[":watados"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/watados.gif",
		alt: ":watados"
	};		
	emoticons[":sarjana"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/sarjana.gif",
		alt: ":sarjana"
	};	
	emoticons[":mandi"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/mandi.gif",
		alt: ":mandi"
	};	
	emoticons[":peri"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/peri.gif",
		alt: ":peri"
	};	
	emoticons[":garing"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/garing.gif",
		alt: ":garing"
	};		
	emoticons[":brucelee"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/brucelee.gif",
		alt: ":brucelee"
	};	
	emoticons[":miskin"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/miskin.gif",
		alt: ":miskin"
	};	
	emoticons[":what:"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/what.gif",
		alt: ":what:"
	};	
	emoticons[":mabok"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/mabok.gif",
		alt: ":mabok"
	};		
	emoticons[":kiss"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/kiss.gif",
		alt: ":kiss"
	};		
	emoticons[":wow"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/wow.gif",
		alt: ":wow"
	};
	emoticons[":zzz"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/zzz.gif",
		alt: ":zzz"
	};		
	emoticons[":hero"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/pendekar.gif",
		alt: ":hero"
	};	
	emoticons[":panas"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/panas.gif",
		alt: ":panas"
	};	
	emoticons[":jiah"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/jah.gif",
		alt: ":jiah"
	};	
	emoticons[":piktor"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/piktor.gif",
		alt: ":piktor"
	};	
	emoticons[":boss"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/boss.gif",
		alt: ":boss"
	};	
	emoticons[":ampun"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ampun.gif",
		alt: ":ampun"
	};		
	emoticons[":tolong2"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/tolong2.gif",
		alt: ":tolong2"
	};	
	emoticons[":culas"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/culas.gif",
		alt: ":culas"
	};	
	emoticons[":warning"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/warning.gif",
		alt: ":warning"
	};	
	emoticons[":sokpinter"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/sokpinter.gif",
		alt: ":sokpinter"
	};		
	emoticons[":senangbgt"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/senangbgt.gif",
		alt: ":senangbgt"
	};	
	emoticons[":capek"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/capek.gif",
		alt: ":capek"
	};	
	emoticons[":dead"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/dead.gif",
		alt: ":dead"
	};
	emoticons[":ribet"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ribet.gif",
		alt: ":ribet"
	};
	emoticons[":pasrah"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/pasrah.gif",
		alt: ":pasrah"
	};
	emoticons[":belajar"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/belajar.gif",
		alt: ":belajar"
	};
	emoticons[":muntah"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/muntah.gif",
		alt: ":muntah"
	};
	emoticons[":suram"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/suram.gif",
		alt: ":suram"
	};
	emoticons[":muntah"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/muntah.gif",
		alt: ":muntah"
	};
	emoticons[":semanget"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/semanget.gif",
		alt: ":semanget"
	};
	emoticons[":mewek"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/mewek.gif",
		alt: ":mewek"
	};
	emoticons[":prustasi"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/prustasi.gif",
		alt: ":prustasi"
	};
	emoticons[":hore"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/hore.gif",
		alt: ":hore"
	};
	emoticons[":asik"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/asik.gif",
		alt: ":asik"
	};
	emoticons[":aso"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/aso.gif",
		alt: ":aso"
	};
	emoticons[":maling"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/maling.gif",
		alt: ":maling"
	};
	emoticons[":mantap"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/top.gif",
		alt: ":mantap"
	};
	emoticons[":stress"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/stress.gif",
		alt: ":stress"
	};
	emoticons[":sabar"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/sabar.gif",
		alt: ":sabar"
	};
	emoticons[":ngakak"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ngakak.gif",
		alt: ":ngakak"
	};
	emoticons[":what"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/whats.gif",
		alt: ":what"
	};
	emoticons[":hi"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/hi.gif",
		alt: ":hi"
	};
	emoticons[":awas"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/awas.gif",
		alt: ":awas"
	};
	emoticons[":huh"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/suram2.gif",
		alt: ":huh"
	};
	emoticons[":modsini"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/modsini.gif",
		alt: ":modsini"
	};
	emoticons[":mana"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/give.gif",
		alt: ":mana"
	};
	emoticons[":redcard"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/redcard.gif",
		alt: ":redcard"
	};
	emoticons[":bingung"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/bingungs.gif",
		alt: ":bingung"
	};
	emoticons[":takuts"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/takuts.gif",
		alt: ":takuts"
	};
	emoticons[":wawa"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/wawa.gif",
		alt: ":wawa"
	};
	emoticons[";wawa"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/Wawa.gif",
		alt: ";wawa"
	};
	emoticons[":ngopi"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ngopi.gif",
		alt: ":ngopi"
	};
	emoticons[":repost"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/repost.gif",
		alt: ":repost"
	};
	emoticons[":lol"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/lol.gif",
		alt: ":lol"
	};		
	emoticons[":hammers"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/hammers.gif",
		alt: ":hammers"
	};	
	emoticons[":aduh"] = {
		src: "http://chibi-cyber.com/images/smilies/N3/groan.png",
		alt: ":aduh"
	};		
	emoticons[":ooh"] = {
		src: "http://chibi-cyber.com/images/smilies/N3/tense.png",
		alt: ":ooh"
	};	
	emoticons[":(("] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/nangis.gif",
		alt: ":(("
	};	
	emoticons[":ngacir"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ngacir.gif",
		alt: ":ngacir"
	};
	emoticons[":hadir"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/Absen.gif",
		alt: ":hadir"
	};
	emoticons[":kabor"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/ngacirhilang.gif",
		alt: ":kabor"
	};	
	emoticons[":goal"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/goal.gif",
		alt: ":goal"
	};	
	emoticons[":spa"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/spa.gif",
		alt: ":spa"
	};
	emoticons[":)"] = {
		src: "http://chibi-cyber.com/images/smilies/N3/grin.png",
		alt: ":)"
	};
	emoticons[":nohope"] = {
		src: "http://chibi-cyber.com/images/smilies/DC_smiles/q11.gif",
		alt: ":nohope"
	};
	emoticons["C3"] = {
		src: "http://chibi-cyber.com/images/dark/forest/on.gif",
		alt: "C3"
	};
	emoticons[":peterjepimars"] = {
		src: "http://i1142.photobucket.com/albums/n615/tapuy/Icon-Peter-1.gif",
		alt: ":peterjepimars"
	};
	emoticons[":joget"] = {
		src: "http://bennythegreat.files.wordpress.com/2012/04/iwak-peyek.gif",
		alt: ":joget"
	};
var emotxt = [];
var yemo = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!yemo[c]) 
			yemo[c] = [];
		
		yemo[c].push({
			emoticon: emo,
			src: emoticons[emo].src
		});
	}
	
function f(o1, o2){
	if (o1.emoticon.isPrefixOf(o2.emoticon)) 
		return 1;
	
	if (o1.emoticon > o2.emoticon) 
		return 1;
	
	if (o1.emoticon < o2.emoticon) 
		return -1;
	
	return 0;
}
var i;	
for (i = 0; i < yemo.length; i++) 
	if (yemo[i]) 
		yemo[i].sort(f);
	
function replaceTextNode(textNode, sortedEmoticonSet)
{
	var content = textNode.textContent;
	var currentStopPosition;
	var i, j;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	currentStopPosition = i = 0;
	while (i < content.length) {
		firstChar = content.charCodeAt(i);
		if (sortedEmoticonSet[firstChar]) 
			for (j = 0; j < sortedEmoticonSet[firstChar].length; j++) 
				if (sortedEmoticonSet[firstChar][j].emoticon.length && sortedEmoticonSet[firstChar][j].emoticon.isPrefixOf(content, i)) {
					if (currentStopPosition < i) 
						htmls.push(document.createTextNode(content.substr(currentStopPosition, i - currentStopPosition)))
					
					img = document.createElement('img');
					img.src = sortedEmoticonSet[firstChar][j].src;
					img.title = sortedEmoticonSet[firstChar][j].emoticon;
					htmls.push(img);
					
					
					i += sortedEmoticonSet[firstChar][j].emoticon.length;
					currentStopPosition = i;
					found = true;
					break;
				}
		
		if (found) {
			found = false;
			continue;
		}
		i++;
	}
	
	if(currentStopPosition>0&&currentStopPosition<content.length-1)
		htmls.push(document.createTextNode(content.substr(currentStopPosition)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element, emos){
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode, emos);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}