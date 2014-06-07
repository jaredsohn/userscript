// ==UserScript==
// @name           Fadilz Script 2nd
// @namespace      http://csmod.uk.to/
// @description    The 2nd For Script UserJS
// @include        http://www.facebook.com/*
// @include		   http://csmod.uk.to/*
// ==/UserScript==
//
//     
//      
//      Copyright 2010 Fadilz <Ayam Kampus Crew>
//      
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//		All rights ReserveD This Script Modiffed By Pedox A.K.A Fadilz On kaskuser 
//		-[PERINGATAN]- JANGAN MENGAKUI KODE INI MILIK ORANG LAIN 
//		JANGAN MODIFIKASI KODE INI SEIZIN OWNER
//		Respect To Owner 
//		Start Begin on code

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
	emoticons[":gg"] = {
		src: "http://www.esc-creation.org/images/smiles4/gg.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":gha"] = {
		src: "http://www.esc-creation.org/images/smiles11/ghamod.gif",
		alt: "csgakmod"
	};
	emoticons[":mimis"] = {
		src: "http://www.esc-creation.org/images/smiles11/what.gif",
		alt: "csgakmod"
	};
	emoticons[":pika"] = {
		src: "http://www.esc-creation.org/images/smiles9/pika.gif",
		alt: "csgakmod"
	};
	emoticons[":ganteng"] = {
		src: "http://www.esc-creation.org/images/smiles12/lebay.gif",
		alt: "csgakmod"
		};
	emoticons[":repost"] = {
		src: "http://www.esc-creation.org/images/smiles1/fd_7.gif",
		alt: "csgakmod"
		};
	emoticons[":hula"] = {
		src: "http://www.esc-creation.org/images/smiles11/hula.gif",
		alt: "csgakmod"
		};
	emoticons[":jus"] = {
		src: "http://www.esc-creation.org/images/smiles6/jus.gif",
		alt: "csgakmod"
		};
	emoticons[":hihi"] = {
		src: "http://www.esc-creation.org/images/smiles2/hihi.gif",
		alt: "csgakmod"
		};
	emoticons[":ngeces"] = {
		src: "http://www.esc-creation.org/images/smiles11/ngeces.gif",
		alt: "csgakmod"
		};
	emoticons[":lirik"] = {
		src: "http://www.esc-creation.org/images/smiles11/lirik.gif",
		alt: "csgakmod"
		};
	emoticons[":mikir"] = {
		src: "http://www.esc-creation.org/images/smiles11/mikir.gif",
		alt: "csgakmod"
		};
		emoticons[":mumet"] = {
		src: "http://www.esc-creation.org/images/single/mumet.gif",
		alt: "csgakmod"
		};
	emoticons[":gaul"] = {
		src: "http://www.esc-creation.org/images/single/gaul.gif",
		alt: "csgakmod"
		};
	emoticons[":loncat"] = {
		src: "http://www.esc-creation.org/images/smiles10/loncat.gif",
		alt: "csgakmod"
		};
	emoticons[":cuek"] = {
		src: "http://www.esc-creation.org/images/smiles10/cuek.gif",
		alt: "csgakmod"
		};
	emoticons[":seram"] = {
		src: "http://www.esc-creation.org/images/smiles10/pengumuman.gif",
		alt: "csgakmod"
		};
	emoticons[":bukan"] = {
		src: "http://www.esc-creation.org/images/smiles10/bukan.gif",
		alt: "csgakmod"
		};
	emoticons[":smoke"] = {
		src: "http://www.esc-creation.org/images/smiles10/smoke.gif",
		alt: "csgakmod"
		};
	emoticons[":pesona"] = {
		src: "http://www.esc-creation.org/images/smiles10/pesona.gif",
		alt: "csgakmod"
		};

	emoticons[":jalan"] = {
		src: "http://www.esc-creation.org/images/smiles10/jalan.gif",
		alt: "csgakmod"
		};
	emoticons[":tidur"] = {
		src: "http://www.esc-creation.org/images/smiles10/tiduran.gif",
		alt: "csgakmod"
		};
	emoticons[":hulahop"] = {
		src: "http://www.esc-creation.org/images/smiles10/hulahop.gif",
		alt: "csgakmod"
		};
	emoticons[":wk"] = {
		src: "http://www.esc-creation.org/images/smiles10/wk.gif",
		alt: "csgakmod"
		};
	emoticons[":goyang"] = {
		src: "http://www.esc-creation.org/images/smiles10/goyang.gif",
		alt: "csgakmod"
		};
	emoticons[":bisik"] = {
		src: "http://www.esc-creation.org/images/smiles9/bisik.gif",
		alt: "csgakmod"
		};
	emoticons[":maju"] = {
		src: "http://www.esc-creation.org/images/smiles9/maju.gif",
		alt: "csgakmod"
		};
	emoticons[":mandi"] = {
		src: "http://www.esc-creation.org/images/smiles9/mandi.gif",
		alt: "csgakmod"
		};
	emoticons[":gergaji"] = {
		src: "http://www.esc-creation.org/images/smiles7/gergaji.gif",
		alt: "csgakmod"
		};
	emoticons[":shy"] = {
		src: "http://www.esc-creation.org/images/smiles7/shy.gif",
		alt: "csgakmod"
		};
	emoticons[":awas"] = {
		src: "http://www.esc-creation.org/images/smiles7/awas.gif",
		alt: "csgakmod"
		};
	emoticons[":call"] = {
		src: "http://www.esc-creation.org/images/smiles7/call.gif",
		alt: "csgakmod"
		};
	emoticons[":periksa"] = {
		src: "http://www.esc-creation.org/images/smiles7/periksa.gif",
		alt: "csgakmod"
		};
	emoticons[":duit"] = {
		src: "http://www.esc-creation.org/images/smiles7/duit.gif",
		alt: "csgakmod"
		};
	emoticons[":foto"] = {
		src: "http://www.esc-creation.org/images/smiles6/jepret.gif",
		alt: "csgakmod"
		};
	emoticons[":gembira"] = {
		src: "http://www.esc-creation.org/images/smiles1/m121.gif",
		alt: "csgakmod"
		};
	emoticons[":pingin"] = {
		src: "http://www.esc-creation.org/images/smiles4/pingin.gif",
		alt: "csgakmod"
		};
	emoticons[":gosip"] = {
		src: "http://www.esc-creation.org/images/smiles4/nyimak.gif",
		alt: "csgakmod"
		};
	emoticons[":no"] = {
		src: "http://www.laymark.com/i/m/m145.gif",
		alt: "csgakmod"
		};
	emoticons[":kpala"] = {
		src: "http://www.laymark.com/i/m/m182.gif",
		alt: "csgakmod"
		};
	emoticons[":angel"] = {
		src: "://www.laymark.com/i/m/m073.gif",
		alt: "csgakmod"
		};
	emoticons[":nyanyi"] = {
		src: "http://www.laymark.com/i/m/m046.gif",
		alt: "csgakmod"
		};
	emoticons[":ih"] = {
		src: "http://www.laymark.com/i/m/m015.gif",
		alt: "csgakmod"
		};
	emoticons[":ejek"] = {
		src: "http://www.laymark.com/i/m/m011.gif",
		alt: "csgakmod"
		};
	emoticons[":fantasi"] = {
		src: "http://www.laymark.com/i/m/m021.gif",
		alt: "csgakmod"
		};
	emoticons[":cinta"] = {
		src: "http://www.laymark.com/i/m/m055.gif",
		alt: "csgakmod"
		};
	emoticons[":maling"] = {
		src: "http://www.laymark.com/i/m/m018.gif",
		alt: "csgakmod"
		};
	emoticons[":flu"] = {
		src: "http://www.laymark.com/i/m/m006.gif",
		alt: "csgakmod"
		};
	emoticons[":latah"] = {
		src: "http://www.laymark.com/i/m/m200.gif",
		alt: "csgakmod"
		};
	emoticons[":nyerah"] = {
		src: "http://www.laymark.com/i/m/m095.gif",
		alt: "csgakmod"
		};
	emoticons[":smangad"] = {
		src: "http://www.laymark.com/i/m/m088.gif",
		alt: "csgakmod"
		};
	emoticons[":aduh"] = {
		src: "http://www.laymark.com/i/m/m199.gif",
		alt: "csgakmod"
		};
	emoticons[":ohh"] = {
		src: "http://www.laymark.com/i/m/m077.gif",
		alt: "csgakmod"
		};
	emoticons[":intip"] = {
		src: "http://www.laymark.com/i/m/m092.gif",
		alt: "csgakmod"
		};
	emoticons[":mohon"] = {
		src: "http://www.laymark.com/i/m/m107.gif",
		alt: "csgakmod"
		};
	emoticons[":pergi"] = {
		src: "http://www.laymark.com/i/m/m084.gif",
		alt: "csgakmod"
		};
	emoticons[":nyoh"] = {
		src: "http://www.laymark.com/i/m/m039.gif",
		alt: "csgakmod"
		};
	emoticons[":lari"] = {
		src: "http://www.laymark.com/i/m/m044.gif",
		alt: "csgakmod"
		};
	emoticons[":uduk"] = {
		src: "http://www.laymark.com/i/m/m122.gif",
		alt: "csgakmod"
		};
	emoticons[":bom"] = {
		src: "http://www.laymark.com/i/m/m191.gif",
		alt: "csgakmod"
		};
	emoticons[":flu"] = {
		src: "http://www.laymark.com/i/m/m006.gif",
		alt: "csgakmod"
		};
	emoticons[":sinau"] = {
		src: "http://www.laymark.com/i/m/m174.gif",
		alt: "csgakmod"
		};
	emoticons[":nesu"] = {
		src: "http://www.laymark.com/i/m/m072.gif",
		alt: "csgakmod"
		};
	emoticons[":sombong"] = {
		src: "http://www.laymark.com/i/m/m171.gif",
		alt: "csgakmod"
		};
	emoticons[":ba"] = {
		src: "http://www.laymark.com/i/m/m032.gif",
		alt: "csgakmod"
		};
	emoticons[":bye"] = {
		src: "http://www.laymark.com/i/o/60.gif",
		alt: "csgakmod"
		};
	emoticons[":turu"] = {
		src: "http://www.laymark.com/i/o/66.gif",
		alt: "csgakmod"
		};
	emoticons[":giring"] = {
		src: "http://www.laymark.com/i/o/44.gif",
		alt: "csgakmod"
		};
	emoticons[":pahlawan"] = {
		src: "http://www.laymark.com/i/o/31.gif",
		alt: "csgakmod"
		};
	emoticons[":nothear"] = {
		src: "http://www.laymark.com/i/o/52.gif",
		alt: "csgakmod"
		};
	emoticons[":dead"] = {
		src: "http://www.laymark.com/i/o/45.gif",
		alt: "csgakmod"
		};
	emoticons[":away"] = {
		src: "http://www.laymark.com/i/o/16.gif",
		alt: "csgakmod"
		};
	emoticons[":suling"] = {
		src: "http://www.laymark.com/i/o/83.gif",
		alt: "csgakmod"
		};
	emoticons[":ultah"] = {
		src: "http://www.laymark.com/i/o/86.gif",
		alt: "csgakmod"
		};
	emoticons[":turu"] = {
		src: "http://www.laymark.com/i/o/66.gif",
		alt: "csgakmod"
		};
	emoticons[":tolong"] = {
		src: "http://www.laymark.com/i/o/14.gif",
		alt: "csgakmod"
		};
	emoticons[":karmer"] = {
		src: "http://www.laymark.com/i/o/37.gif",
		alt: "csgakmod"
		};
	emoticons[":zoro"] = {
		src: "http://www.laymark.com/i/o/107.gif",
		alt: "csgakmod"
		};
	emoticons[":hipnotis"] = {
		src: "http://www.laymark.com/i/o/90.gif",
		alt: "csgakmod"
		};
	emoticons[":hoam"] = {
		src: "http://www.laymark.com/i/o/62.gif",
		alt: "csgakmod"
		};
	emoticons[":mau"] = {
		src: "http://www.laymark.com/i/o/47.gif",
		alt: "csgakmod"
		};
	emoticons[":study"] = {
		src: "http://www.laymark.com/i/o/99.gif",
		alt: "csgakmod"
		};
	emoticons[":ting"] = {
		src: "http://www.laymark.com/i/o/11.gif",
		alt: "csgakmod"
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
