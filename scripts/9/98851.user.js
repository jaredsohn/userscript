// ==UserScript==
// @name           CS2 Outpost Descriptor Alt
// @namespace      userscripts.org
// @description    adds the outpost types on hover in the maps top description field.
// @include        http://*.chosenspace.com/view/*
// ==/UserScript==
function xpath(query){
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var check=xpath("//img[contains(@src,'images/current')]");
var mapCurrentSec=check.snapshotItem(0);
if(mapCurrentSec){
	var seccheck=document.getElementById('bg').firstChild.src.split('images/')[1].substring(0,6);
	if(seccheck=='system'||seccheck=='galaxy'){
		/* Do nothing */
	}else{
		var scripttags=document.getElementsByTagName("script");
		check=xpath("//img[contains(@src,'images/sector/') and not (contains(@src,'/bg/'))]");
		var planet,thisTag,source,source_check,style,horizon,verticanum,itempos;
		var scanning=false;
		function description(ito,itp,add){
			var main=scripttags[ito].nextSibling.firstChild;
			var originalAttribute=main.getAttribute("onmouseover");
			var split=originalAttribute.split(')');
			if(split[2]!=null){
				main.setAttribute('onmouseover',"document.g"+itp+".src='images/over.gif',ONMOUSEOVER=changetext(content["+itp+"]+' - "+add+" - {Error D1}'),ONMOUSEOVER=window.status=''; return true;");
			}else{
				main.setAttribute('onmouseover',split[0]+"+' - "+add+"')"+split[1]);
			}
			return true;
		}
		/* Limit the description bar to one line only to avoid map hopping */
		document.getElementById("descriptions").setAttribute("style","overflow: hidden; max-width: 406; max-height: 14;");
		for(var q=0;q<check.snapshotLength;q++){
			thisTag=check.snapshotItem(q);
			source=thisTag.src.split('view/images/')[1];
			source_check=source.substring(7,11);
			if(source_check=='plan'){
				planet=true;
				continue;
			}
			style=thisTag.parentNode.getAttribute('style').split('position: absolute;').join('').split('px;');
			horizon=(style[0].split('top: ').join(''))*1;
			verticanum=(style[1].split('left: ').join('').split('px;').join(''))*1;
			if((horizon-2)!=0){
				horizon=((horizon-2)/21);
			}else{
				horizon=0;
			}
			if((verticanum-2)!=0){
				verticanum=((verticanum-2)/21)+1;
			}else{
				verticanum=1;
			}
			itempos=(horizon*20)+verticanum;
			if(planet){
				if(192<=itempos&&itempos<=209){
					itempos_off=itempos+1;
				}else if(itempos>=212){
					itempos_off=itempos-1;
				}else{
					itempos_off=itempos+2;
				}
			}else{
				itempos_off=itempos+2;
			}
			if(source_check=='scan'){
				scanning=true;
				source+="";
				source=source.replace(/\D/g,'');
				Bcol: switch(source){
					case'1':
						description(itempos_off,itempos,"900-3,810 iW");
						break Bcol;
					case'2':
						description(itempos_off,itempos,"3,810-6,720 iW");
						break Bcol;
					case'3':
						description(itempos_off,itempos,"6,720-9,630 iW");
						break Bcol;
					case'4':
						description(itempos_off,itempos,"9,630-12,540 iW");
						break Bcol;
					case'5':
						description(itempos_off,itempos,"12,540-15,450 iW");
						break Bcol;
					case'6':
						description(itempos_off,itempos,"15,450-18,360 iW");
						break Bcol;
					case'7':
						description(itempos_off,itempos,"18,360-21,270 iW");
						break Bcol;
					case'8':
						description(itempos_off,itempos,"21,270-24,180 iW");
						break Bcol;
					case'9':
						description(itempos_off,itempos,"24,180-27,090 iW");
						break Bcol;
					case'10':
						description(itempos_off,itempos,"27,090+ iW");
						break Bcol;
					default:
						description(itempos_off,itempos,"{Error IsaWatts}");
						break Bcol;
				}
			}
			else if(source_check=='aste'){
				if(scanning){
					break;
				}
				var regge=/\d\d*./;
				source=regge.exec(source);
				source+="";
				Bcol: switch(source){
					case'1a':
						description(itempos_off,itempos,"Iridium: Tiny");
						break Bcol;
					case'1b':
						description(itempos_off,itempos,"Iridium: Small");
						break Bcol;
					case'1c':
						description(itempos_off,itempos,"Iridium: Medium");
						break Bcol;
					case'1d':
						description(itempos_off,itempos,"Iridium: Large");
						break Bcol;
					case'1e':
						description(itempos_off,itempos,"Iridium: Mega");
						break Bcol;
					case'3a':
						description(itempos_off,itempos,"Tetrium: Tiny");
						break Bcol;
					case'3b':
						description(itempos_off,itempos,"Tetrium: Small");
						break Bcol;
					case'3c':
						description(itempos_off,itempos,"Tetrium: Medium");
						break Bcol;
					case'3d':
						description(itempos_off,itempos,"Tetrium: Large");
						break Bcol;
					case'3e':
						description(itempos_off,itempos,"Tetrium: Mega");
						break Bcol;
					case'5a':
						description(itempos_off,itempos,"Zirconium: Tiny");
						break Bcol;
					case'5b':
						description(itempos_off,itempos,"Zirconium: Small");
						break Bcol;
					case'5c':
						description(itempos_off,itempos,"Zirconium: Medium");
						break Bcol;
					case'5d':
						description(itempos_off,itempos,"Zirconium: Large");
						break Bcol;
					case'5e':
						description(itempos_off,itempos,"Zirconium: Mega");
						break Bcol;
					case'7a':
						description(itempos_off,itempos,"Quadrium: Tiny");
						break Bcol;
					case'7b':
						description(itempos_off,itempos,"Quadrium: Small");
						break Bcol;
					case'7c':
						description(itempos_off,itempos,"Quadrium: Medium");
						break Bcol;
					case'7d':
						description(itempos_off,itempos,"Quadrium: Large");
						break Bcol;
					case'7e':
						description(itempos_off,itempos,"Quadrium: Mega");
						break Bcol;
					case'9a':
						description(itempos_off,itempos,"Gold: Tiny");
						break Bcol;
					case'9b':
						description(itempos_off,itempos,"Gold: Small");
						break Bcol;
					case'9c':
						description(itempos_off,itempos,"Gold: Medium");
						break Bcol;
					case'9d':
						description(itempos_off,itempos,"Gold: Large");
						break Bcol;
					case'9e':
						description(itempos_off,itempos,"Gold: Mega");
						break Bcol;
					case'11a':
						description(itempos_off,itempos,"Fullerite: Tiny");
						break Bcol;
					case'11b':
						description(itempos_off,itempos,"Fullerite: Small");
						break Bcol;
					case'11c':
						description(itempos_off,itempos,"Fullerite: Medium");
						break Bcol;
					case'11d':
						description(itempos_off,itempos,"Fullerite: Large");
						break Bcol;
					case'11e':
						description(itempos_off,itempos,"Fullerite: Mega");
						break Bcol;
					default:
						description(itempos_off,itempos,"{Error Asteroid}");
						break Bcol;
				}
			}
			else if(source_check=='outp'){
				if(scanning){
					break;
				}
				source+="";
				source=source.replace(/\D/g,'');
				Bcol: switch(source){
					case'1':
						description(itempos_off,itempos,"Dry Dock");
						break Bcol;
					case'2':
						description(itempos_off,itempos,"Shipyard");
						break Bcol;
					case'3':
						description(itempos_off,itempos,"Space Dock");
						break Bcol;
					case'4':
						description(itempos_off,itempos,"Ref: Iridium");
						break Bcol;
					case'5':
						description(itempos_off,itempos,"Ref: Tetrium");
						break Bcol;
					case'6':
						description(itempos_off,itempos,"Ref: Zirconium");
						break Bcol;
					case'7':
						description(itempos_off,itempos,"Ref: Quadrium");
						break Bcol;
					case'8':
						description(itempos_off,itempos,"Ref: Gold");
						break Bcol;
					case'9':
						description(itempos_off,itempos,"Ref: Fullerite");
						break Bcol;
					case'10':
						description(itempos_off,itempos,"Starbase");
						break Bcol;
					case'11':
						description(itempos_off,itempos,"Scrapyard");
						break Bcol;
					case'12':
						description(itempos_off,itempos,"Manu: Components");
						break Bcol;
					case'13':
						description(itempos_off,itempos,"Manu: Parts");
						break Bcol;
					case'14':
						description(itempos_off,itempos,"Manu: Navigation");
						break Bcol;
					case'15':
						description(itempos_off,itempos,"Manu: Targeting");
						break Bcol;
					case'16':
						description(itempos_off,itempos,"Manu: Scanner");
						break Bcol;
					case'17':
						description(itempos_off,itempos,"Manu: Jump Drive");
						break Bcol;
					case'18':
						description(itempos_off,itempos,"Manu: Shield Gen");
						break Bcol;
					case'19':
						description(itempos_off,itempos,"Manu: Reactor");
						break Bcol;
					case'20':
						description(itempos_off,itempos,"Manu: Engine");
						break Bcol;
					case'21':
						description(itempos_off,itempos,"Manu: Units");
						break Bcol;
					case'22':
						description(itempos_off,itempos,"Manu: Plating");
						break Bcol;
					case'23':
						description(itempos_off,itempos,"Manu: Weapons");
						break Bcol;
					case'24':
						description(itempos_off,itempos,"Manu: External");
						break Bcol;
					case'25':
						description(itempos_off,itempos,"Space Hub");
						break Bcol;
					default:
						description(itempos_off,itempos,"{Error Outpost}");
						break Bcol;
				}
			}
		}
	}
}
