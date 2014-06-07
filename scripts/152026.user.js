// ==UserScript==
// @name           Andaloria Units
// @namespace      Andaloria
// @description    Einheiten immer im Blick
// @include        http://game1.andaloria.de/*
// @exclude        http://game1.andaloria.de/hood/
// @exclude        http://game1.andaloria.de/login.php*
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest  
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @updateURL      http://userscripts.org/scripts/source/152026.meta.js
// @downloadURL    https://userscripts.org/scripts/source/152026.user.js
// @version        1.7
// ==/UserScript==

if (navigator.userAgent.indexOf("Chrome") <= 1){
GM_registerMenuCommand( "------Breite-----" , function(){changeWidthManu()} );
GM_registerMenuCommand( "Manuell anpassen" , function(){changeWidthManu()} );
GM_registerMenuCommand( "Automatische Anpassung" , function(){changeWidthA()} );
GM_registerMenuCommand( "---Transparenz---" , function(){changeWidthManu()} );
GM_registerMenuCommand( "Wert eingeben" , function(){changeWidthOp()} );

fcwidth = GM_getValue('width', 'width:120px');
opacity = GM_getValue('opacity', '0.4');

function changeWidthManu(){
var name = prompt("Breite eingeben", "");
GM_setValue('width', 'width:'+ name +'px');
document.getElementById('fcunits').style.width = name+'px';
document.getElementById('fcunits').style.display = 'block';
}
function changeWidthA(){
GM_setValue('width', '');
document.getElementById('fcunits').style.display = 'table';
}

function changeWidthOp(){
var opac = prompt("Wert eingeben \n  (durchsichtig) 0.0 - 1.0 (sichtbar)", "");
GM_setValue('opacity', opac);
document.getElementById('fcunits').style.opacity = opac;
GM_addStyle("#fcunits:hover { "+fcwidth+"; opacity:1; resize: horizontal; overflow:hidden; white-space: nowrap; border:1px solid #300; position: absolute; top:27px; left:-1px; padding-left: 2px; padding-right: 2px; font-weight:bold; background-image: url('"+ main +"'); background-color: white; display:none; z-Index:1;}");
}

y = GM_getValue('y', '190px');
x = GM_getValue('x', '20px');

hN = GM_getValue('anz', '5');
sV = GM_getValue('sv', '1');

}else{
y = '190px';
x = '20px';
fcwidth = 'width:120px';
opacity = '0.4';
hN = '10';
sV = '1';
}


moving = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMCAMAAACz+6aNAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABRUExURYFDQ2IzM286Omg2NmY1NX9CQntAQIdGRnc+Pn1BQYBDQ4RFRYlHR3Q8PGc2Nms4OJRNTXM8PGM0NGQ0NIpISI1JSWo3N4NERG05OXg+Pv///6j3iMgAAAAbdFJOU///////////////////////////////////ACc0CzUAAAB/SURBVHjaYpBCAXxiUgABxABnAYEwMxMvI0AAMcBZUlLMkhycrCwAAQQSgbCkpCQZuHlEpAACCCQCYUkJsYmzC0hJAQQQA5wFBAyiQAIggBhgLEZ+FoglAAHEAGNJSjBBRAACiAHO4hKE0AABxABnwQBAADFIoQOAAMIUAQgwAMegEQelqckZAAAAAElFTkSuQmCC';
main   = 'data:image/png;base64,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';
head   = 'data:image/png;base64,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';
offi   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURff399LS0uTk5DY2NnJycuHh4fX19Xl5ed/f3w8PD6mpqcXFxcvLy2pqamtra+Xl5aCgoIyMjEVFRSwsLIKCgtvb2z09PTo6OmNjY6ioqNDQ0ODg4Ofn59HR0Xx8fM/Pz319ffLy8jExMXBwcKampvDw8KKiopmZmZ6ensbGxtjY2K6uruvr6/n5+ePj49ra2qGhoc7OzhgYGKurqxUVFcrKymFhYdbW1vj4+EJCQn5+fkdHR97e3tPT0wAAAP///7l+HY8AAABAdFJOU////////////////////////////////////////////////////////////////////////////////////wDCe7FEAAABGUlEQVR42mKwxwIAAogBmyBAAEEEFcwNGRlFtTgEIYIAAQRVySBiaWkpZwFVCRBAUEEBSTs7OwEuqCBAAMHM1DGx42SCmQkQQAz2CmCaVchOjB/MsrK3BwggBntpRQ0gk5vPTsIUSKurAqUAAojBXl6ES4aDm43djoWB20ZGW07W3h4ggBjsGcXtjIR4WZTshFn4rI3shG3t7QECCChoaYcMmIGCAAEEVskpbsYrbCfMKyHGCVYJEEBAM9k1OJh4gGYqM/DosaqxSNnbAwQQ0HYGY6CtmkDbeYC0ChvQtQABxGAviOZOIB8ggLD6CCCAkP1uAPM7QADBQomdmZmZRRcqCBBAEEERUVlbW1spfWh4AgQQ1pAHCDAAyhpMVkpUpKAAAAAASUVORK5CYII=';
maro   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABRUExURWYAAIwBAFECAMxqALUAAHsAAFoAAEEBALsAALAAAKkAAE0AAEgBAK4AAHMAAJoAAJsGAKAAAJYAAJY+AOyPAIMAAIcvALpWAOWJAAAAAP///7LU3CYAAAAbdFJOU///////////////////////////////////ACc0CzUAAADrSURBVHjaYpDCAgACiAGbIEAAwQUZpSSBAMIGCCCYICcjO1AEKggQQDBBFkFWJiaYIEAAQQVZeIUYuHmkoPoBAggmyCXKxgOkIaIAAQQRZGERYmBil4KJAgQQVJCLlY0bogckCBBAYEEWTkYGJh4puEqAAAILcgryMSEplAIIIAaw1YxsPGCFzOKSwsxSUgABxABxIzdEs5SImASQBAggBpAtjAw87FBPMIMIgAACCfLzwRRCAUAAMYCsZmNHFQQIIAYpDi5WNIVSAAHEwMLCz8DNjSoIEEAMUgKsbGxogQwQQCAnMaELAgQYAG6sIfs1t9/hAAAAAElFTkSuQmCC';
fly    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABUUExURYiIiP////Hx8dXV1cHBwfz8/NnZ2eXl5cjIyNDQ0M3Nzenp6f7+/qKiouLi4vj4+Lm5ufb29r29vfT09LCwsN7e3uzs7MTExNzc3La2tqmpqf///9x7RCIAAAAcdFJOU////////////////////////////////////wAXsuLXAAAA3klEQVR42mKQxgIAAogBmyBAAGEVBAggrIIAAYQiyMAA4QIEEAOyCCMjI1gcIIAYkEXAACgKEEBQ9VABVn4xCQEGaYAAYoCKCQsyMvIL8zGLCABVAgQQA1iMX1QIaACDlAgv2CqAAGIAq+MDinGwCIizSIJ1AgQQSJCViYNFjJ+HlZ1ZAmIFQAABSUZBUWZ2VkEmkAEQQYAAAgkycwnyMLAJ8YrAHA0QQCBBLk5WflEuEQa4RwACCMhgFWdG6AQDgACCCqIGCEAAgWznRg8qgABiQIQNAgAEENbwBAgwADYdHjN+Y/fRAAAAAElFTkSuQmCC';
fight  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAMAAABi3H5uAAAAXVBMVEUAAEE8NyxMRjtUVlFlWURxZU5xcWuEdVd+gXySgWGZiGiTkomqlG+mno65onm0p4/CrITJq3y3saXNs4PFtpnFwLXsvnHaxZnby6vi0bH62Ifp3sb65ZL/8KwoJR6ekHBxAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVDAoALBuXPogbAAABDUlEQVQoz23R7XaDIAwGYBIInyIbClXacf+XOcDWua05/gg+Juc9wthRKfpnx9b1bEfFtCdnXn0Kxj5H0hpje+E0vTB6r30IA/fUzppLPtTHJLn2MXpn+xavJXI1k2gWQtoU51JrpxTzPmkOACovpBrGexbIeXtAMC+dkwgV5jKR8XF7COC6aa1tkxHOYYXKP7OVIRWq0A0q9gjUstQKQMvNxd22CYltrh7hRe+BoXnc70ufIH5am0WA/tH61Zb2bQjIfpf3t7IYJPau4lYE5ZnMO9uLqNWWoOw/S1s3FFOZ1fTX+txINeXzUk7Lhw39MNN7a2rzfNV1wtOaEl0jm+MvnAqoLjju8qeIRqRvozcQWLBYV7oAAAAASUVORK5CYII=';
expnd  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEVSURBVHja3JMxUsMwEEWfMfbkDpwgM9ByAuigoUjDeaCg5QjQcQ2aFNyALj2WogleaWVMYazBMXGKdGyjHc28r6+/Uta2LYfUEQfWPxA47pssyybTLIoi9SGEbCQAED4/aHRD9I7oHeotUSxBDFpXRDGc3zz+7QAYwSoGFYtKB6uY6Qy24ZPTRQfXJomVZbnbQYJrS/Tdab/h6PcIpJPPFmlvfnkPwPLpGg1u9xQAolhULO+vD6hY5hd3vL3cEr1F/ZrGO/I8n3AgFSqmE6qrH9E1GhyNd0TdDMY5CLEoCoKY7s51hYpl+XyFhnWCv7TeM4WtwNS7AdxEGQlk/Xcuy7KdzWYp5X7N83xgW1VZrVbpJX4PAIsN4idOrdK4AAAAAElFTkSuQmCC';
collps = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAD0SURBVHja3FM7TsQwEH3ZmfGMvUnsnINmb8ARuArH4AJInIaChjPQIqWjTxWFwklkFJJF2o6prNG8zzzb1TRNuKVOuLH+AQEvByL6c5rjOFYbAgB4fb7kptQQa8EaIT6CNcH5BLYOd/ePxyv8AFsB1g5iaX+FPWWxrCyWIBoRQtgn+E1ZrMs9jWCLVxzM4MvDy2bw6/Mdog1E5MDBbPvj7QluUbYE9hHiWrCrjx2IdRBNYE3geWe2CNEG7GqQO8N7f0QQM7AEWwN2DcidQRyuZFCknZXbVZk44MS6IaiW70xEk/d+vaYyrNL2MAzo+359id8DADeeIOgRiTbEAAAAAElFTkSuQmCC';
drag   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABJSURBVHjaYvz//z8DMYDl9uYyLlXfrm+3N5fh1KHq28XIiGwiLsWqvl2MTOgCuExlwqabKIW4FDPh8wBRCtEVMxIbjkwMRALAABonGfww7XIUAAAAAElFTkSuQmCC';
dragb  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACBSURBVHjajNDBCsJADATQmWw9tAh76q2I4tmTf1GwxXP//zdmPCyrCNU2EAjhMYHANv71Hehsg7axp2ILPE6dN+F0bh2pzM0v9LweHfHJWYXjcLBtkATJdTgOjQEgpZJWU7/gcuudc4YkkIQk1K+84XxpXc+QBhCQBEllt/ePrwEAjQ0+vhi9hc4AAAAASUVORK5CYII=';

GM_addStyle("#fcunits { "+fcwidth+"; opacity:"+opacity+"; resize: horizontal; overflow:hidden; white-space: nowrap; border:1px solid #300; position: absolute; top:27px; left:-1px; padding-left: 2px; padding-right: 2px; font-weight:bold; background-image: url('"+ main +"'); background-color: white; z-Index:1;}");
GM_addStyle("#fcunits:hover { "+fcwidth+"; opacity:1; resize: horizontal; overflow:hidden; white-space: nowrap; border:1px solid #300; position: absolute; top:27px; left:-1px; padding-left: 2px; padding-right: 2px; font-weight:bold; background-image: url('"+ main +"'); background-color: white; z-Index:1;}");
GM_addStyle("#fcunits2 {  position: absolute; top:"+y+"; left:"+x+"; padding:2px 10px 0px 10px; display:block; z-Index:1;}");
GM_addStyle("#fcunits2:hover {  position: absolute; top:"+y+"; left:"+x+"; padding:2px 10px 0px 10px; display:block; z-Index:5;}");
GM_addStyle("#unithead { padding-right:15px; margin-top:-5px; border:1px solid #300; margin-left:-13px; color:#ddd; align:center; font-weight:bold; background-image: url('"+ head +"'); background-color: white; display:block;}");
GM_addStyle("#unitheadC { margin-top:-5px; margin-left:-13px; border:1px solid #300; color:#ddd; align:center; font-weight:bold; background-image: url('"+ head +"'); background-color: white; display:block;}");
GM_addStyle(".unda { border-bottom:1px solid #888; }");
GM_addStyle(".infchng { cursor: pointer;font-weight:bold;font-size:11px;color:#436472;background-image:none !important; background-color:transparent !important; border:none !important;}");
GM_addStyle("#opn { background-image: url('"+ expnd +"'); border: none; background-color: transparent; background-repeat:no-repeat; width:16px; margin-left:-8px; }");
GM_addStyle("#cls { background-image: url('"+ collps +"'); border: none; background-color: transparent; background-repeat:no-repeat; width:16px; margin-left:-8px; }");
GM_addStyle("#drag { background-image: url('"+ drag +"'); border: none; background-color: transparent; background-repeat:no-repeat; width:16px;margin-top: -3px; margin-left:-16px; }");


function opn(){


var unts = '';

function checkUnit(){

var unitURL = "http://game1.andaloria.de/Unit.php";

	GM_xmlhttpRequest({
		method:"GET",
		url:unitURL,
                onload:function(content){

jack = content.responseText;
     jack = jack.split('type="checkbox"');
     jacks = jack.length - 2;
     if (jacks>hN){
       jacks = hN;
     }

if ( navigator.userAgent.indexOf("Chrome") !=-1 ) {
jacks = jack.length - 2;
}

for (var i = 1; i <= jacks; i++) {

     fjack = jack[i].split('>');

    if (fjack[3].match('Marodeur')){
     // koordinaten
     cordj = fjack[11].split('<');
     cordx = cordj[0].split(':');

     maro = '<img src="'+ maro +'">';

     // bewegung
    if (fjack[14].match('moving')){
     move = '<img src="'+ moving +'" onmousemove="showText(event,\''+ fjack[18] +'\')" onmouseout="hideText()">';
    }else{
     move = '';
    }
     // kampf
    if (fjack[14].match('fight')){
     fsight = '<img src="'+ fight +'">';
    }else{
     fsight = '';
    }


unts += " <table><tr><td class='unda'>"+fsight+move+maro+"<a href='http://game1.andaloria.de/Map.php?_x="+ cordx[0] +"&_y="+ cordx[1] +"' onmousemove=\"showText(event,'"+ cordx[0]+":"+ cordx[1] +"')\" onmouseout=\"hideText()\">"+ fjack[5] +"</a></td></tr></table> ";

    }
    
// FLug


    if (fjack[3].match('Fliegend')){
    
fly    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABUUExURYiIiP////Hx8dXV1cHBwfz8/NnZ2eXl5cjIyNDQ0M3Nzenp6f7+/qKiouLi4vj4+Lm5ufb29r29vfT09LCwsN7e3uzs7MTExNzc3La2tqmpqf///9x7RCIAAAAcdFJOU////////////////////////////////////wAXsuLXAAAA3klEQVR42mKQxgIAAogBmyBAAGEVBAggrIIAAYQiyMAA4QIEEAOyCCMjI1gcIIAYkEXAACgKEEBQ9VABVn4xCQEGaYAAYoCKCQsyMvIL8zGLCABVAgQQA1iMX1QIaACDlAgv2CqAAGIAq+MDinGwCIizSIJ1AgQQSJCViYNFjJ+HlZ1ZAmIFQAABSUZBUWZ2VkEmkAEQQYAAAgkycwnyMLAJ8YrAHA0QQCBBLk5WflEuEQa4RwACCMhgFWdG6AQDgACCCqIGCEAAgWznRg8qgABiQIQNAgAEENbwBAgwADYdHjN+Y/fRAAAAAElFTkSuQmCC';
     // koordinaten
     cordj = fjack[11].split('<');
     cordx = cordj[0].split(':');

     fly = '<img src="'+ fly +'">';

     // bewegung
    if (fjack[14].match('moving')){
     move = '<img src="'+ moving +'" onmousemove="showText(event,\''+ fjack[18] +'\')" onmouseout="hideText()">';
    }else{
     move = '';
    }

     // kampf
    if (fjack[14].match('fight')){
     fsight = '<img src="'+ fight +'">';
    }else{
     fsight = '';
    }

unts += " <table><tr><td class='unda'>"+fsight+move+fly+"<a href='http://game1.andaloria.de/Map.php?_x="+ cordx[0] +"&_y="+ cordx[1] +"' onmousemove=\"showText(event,'"+ cordx[0]+":"+ cordx[1] +"')\" onmouseout=\"hideText()\">"+ fjack[5] +"</a></td></tr></table> ";

    }
    
// Offizier

    if (fjack[3].match('Offizier')){

offi   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURff399LS0uTk5DY2NnJycuHh4fX19Xl5ed/f3w8PD6mpqcXFxcvLy2pqamtra+Xl5aCgoIyMjEVFRSwsLIKCgtvb2z09PTo6OmNjY6ioqNDQ0ODg4Ofn59HR0Xx8fM/Pz319ffLy8jExMXBwcKampvDw8KKiopmZmZ6ensbGxtjY2K6uruvr6/n5+ePj49ra2qGhoc7OzhgYGKurqxUVFcrKymFhYdbW1vj4+EJCQn5+fkdHR97e3tPT0wAAAP///7l+HY8AAABAdFJOU////////////////////////////////////////////////////////////////////////////////////wDCe7FEAAABGUlEQVR42mKwxwIAAogBmyBAAEEEFcwNGRlFtTgEIYIAAQRVySBiaWkpZwFVCRBAUEEBSTs7OwEuqCBAAMHM1DGx42SCmQkQQAz2CmCaVchOjB/MsrK3BwggBntpRQ0gk5vPTsIUSKurAqUAAojBXl6ES4aDm43djoWB20ZGW07W3h4ggBjsGcXtjIR4WZTshFn4rI3shG3t7QECCChoaYcMmIGCAAEEVskpbsYrbCfMKyHGCVYJEEBAM9k1OJh4gGYqM/DosaqxSNnbAwQQ0HYGY6CtmkDbeYC0ChvQtQABxGAviOZOIB8ggLD6CCCAkP1uAPM7QADBQomdmZmZRRcqCBBAEEERUVlbW1spfWh4AgQQ1pAHCDAAyhpMVkpUpKAAAAAASUVORK5CYII=';    

     // koordinaten
     cordj = fjack[11].split('<');
     cordx = cordj[0].split(':');

     offi = '<img src="'+ offi +'">';

 
    if (fjack[4].match('Marodeur')){
     // koordinaten
     cordj = fjack[12].split('<');
     cordx = cordj[0].split(':');

     maro = '<img src="'+ maro +'">';
     fjack[5] = fjack[6];
    }else{
      maro = '';
    }

     // bewegung
    if (fjack[14].match('moving')){
     move = '<img src="'+ moving +'" onmousemove=\"showText(event,\''+ fjack[18] +'\')\" onmouseout=\"hideText()\">';
    }else if (fjack[15].match('moving')){
     move = '<img src="'+ moving +'" onmousemove=\"showText(event,\''+ fjack[19] +'\')\" onmouseout=\"hideText()\">';
    }else{
     move = '';
    }
    
     // kampf
    if (fjack[14].match('fight')){
     fsight = '<img src="'+ fight +'">';
    }else{
     fsight = '';
    }

unts += " <table><tr><td class='unda'>"+fsight+move+offi+maro+"<a href='http://game1.andaloria.de/Map.php?_x="+ cordx[0] +"&_y="+ cordx[1] +"' onmousemove=\"showText(event,'"+ cordx[0]+":"+ cordx[1] +"')\" onmouseout=\"hideText()\">"+ fjack[5] +"</a></td></tr></table> ";

    }else{
   
// Standart Einheit

     // bewegung
    if (fjack[13].match('moving')){
     move = '<img src="'+ moving +'" onmousemove=\"showText(event,\''+ fjack[17] +'\')\" onmouseout=\"hideText()\">';
    }else{
     move = '';
    }


     // kampf
    if (fjack[13].match('fight')){
     fsight = '<img src="'+ fight +'">';
    }else{
     fsight = '';
    }

     // koordinaten
     cordj = fjack[10].split('<');
     cordx = cordj[0].split(':');

unts += " <table><tr><td class='unda'>"+fsight+move+"<a href='http://game1.andaloria.de/Map.php?_x="+ cordx[0] +"&_y="+ cordx[1] +"' onmousemove=\"showText(event,'"+ cordx[0]+":"+ cordx[1] +"')\" onmouseout=\"hideText()\">"+ fjack[4] +"</a></td></tr></table> ";

    }

unts += "</table>";
unts += "</div>";

}
divunit = document.createElement('div');
divunit.id = 'fcunits';
divunit.style.display = 'block';
divunit.innerHTML = unts;
divpunit.appendChild(divunit);

 
     }})
     }
checkUnit();

if (navigator.userAgent.indexOf("Chrome") <= 1){
GM_setValue('sv', '1');
}

clsbtn();
}


    
if (navigator.userAgent.indexOf("Chrome") <= 1){
function infh1(){
  document.getElementById('unithead').innerHTML = "<form action''><input type='text' id='infh2' value=\"" + hN + "\" size='1' maxlength='2'><input type='button' id='infhb2' value='ok'></form>";
  document.getElementById('infh2').select();
  document.getElementById('infhb2').addEventListener('click', function(event) {infh2(document.getElementById('infh2').value)},false);
}
function infh2(hN){
  GM_setValue('anz', hN);
  document.getElementById('unithead').innerHTML = "<form action''><input type='button' class='infchng' id='infhb1' value=\"" + hN + "\"></form>Truppen</td></tr>";
  document.getElementById('infhb1').addEventListener('click', function(event) {infh1()},false);
}
}





var punts = "";
punts += "<div width='100%' height='100%' style='cellspacing='0px' cellpadding='0px'> ";
punts += "<table width='130%'>";
if ( navigator.userAgent.indexOf("Chrome") !=-1 ) {
punts += "<tr><td id='unitheadC' align='center'>Truppen</td></tr>";
}else{
punts += "<tr><td id='unithead' align='center'><form action''><input type='button' id='opn'><input type='button' class='infchng' id='infhb1' value='" + hN + "'></form>Truppen</td><td><div id='drag'>&nbsp;</div></td></tr>";
}
punts += "</table>";
punts += "</div>";
divpunit = document.createElement('div');
divpunit.id = 'fcunits2';
divpunit.style.display = "block";
divpunit.innerHTML = punts;
document.body.appendChild(divpunit);

if (navigator.userAgent.indexOf("Chrome") <= 1){
document.getElementById('infhb1').addEventListener('click', function(event) {infh1()},false);
document.getElementById('opn').addEventListener('click', function(event) {opn()},false);


function opn2(){
document.getElementById('fcunits').style.display = "block";
document.getElementById('unithead').innerHTML = "<form action''><input type='button' id='cls'><input type='button' class='infchng' id='infhb1' value='" + hN + "'></form>Truppen</td></tr>";

document.getElementById('cls').addEventListener('click', function(event) {cls()},false);
document.getElementById('infhb1').addEventListener('click', function(event) {infh1()},false);
GM_setValue('sv', '1');
}

function cls(){
document.getElementById('fcunits').style.display = "none";
document.getElementById('unithead').innerHTML = "<form action''><input type='button' id='opn'><input type='button' class='infchng' id='infhb1' value='" + hN + "'></form>Truppen</td></tr>";

document.getElementById('opn').addEventListener('click', function(event) {opn2()},false);
document.getElementById('infhb1').addEventListener('click', function(event) {infh1()},false);
GM_setValue('sv', '0');
}


function clsbtn(){
document.getElementById('unithead').innerHTML = "<form action''><input type='button' id='cls'><input type='button' class='infchng' id='infhb1' value='" + hN + "'></form>Truppen</td></tr>";
document.getElementById('cls').addEventListener('click', function(event) {cls()},false);
document.getElementById('infhb1').addEventListener('click', function(event) {infh1()},false);
}
if (sV==1){
 opn();
 clsbtn();
}
}


if (navigator.userAgent.indexOf("Chrome") != -1){
 opn();
}


if (navigator.userAgent.indexOf("Chrome") <= 1){
window.DragObject = function (o_move, o_drag) {

	// private Variabeln
    var obj;            // Dieses Objekt empfaengt den Event
    var move;           // Dieses Objekt wird bewegt
    var start_pos = []; // Die Startposition des Elements
	var restore_pos;
   // var zIndex;
    
	// private Funktionen
    //var Index = function(z) { move.style.zIndex = z; };

    this.ini = function(o_move, o_drag) {
		if(!o_move) return alert('kein Objekt');
		move = o_move;
		//zIndex = move.style.zIndex || 0;

		obj = o_drag && o_drag.nodeType == 1 ? o_drag : o_move;
		obj.style.cursor = 'move';
		
		// Event aktivieren
		var self = this;
		obj.onmousedown = function(e) { dragObject = self; drag_start(e); };
	};
	this.obj = function() { return move;};

    this.ondrop = function() {return true;};
    this.ondrag = function() {return true;};
	this.onstart = function() {return true;};
    
	this.getPos = function() {
		return [move.offsetTop, move.offsetLeft, move.offsetHeight, move.offsetWidth];
	};
    
	this.setPos = function(t, l) {
		if(typeof t != 'undefined' && t != null) move.style.top = t + 'px';
		if(typeof l != 'undefined' && l != null) move.style.left = l + 'px';

	};
	
	this.start = function(e) {
		restore_pos = this.getPos();
		start_pos = this.getPos();
		
		var evt_pos = getEvtPos(e);
		
		start_pos[0] -= evt_pos[0];
		start_pos[1] -= evt_pos[1];
		
	//	Index(999);
		this.onstart(e);
	};
	
	this.move = function(e) {
		
		var evt_pos = getEvtPos(e);
		var new_top = evt_pos[0] + start_pos[0];
		var new_left = evt_pos[1] + start_pos[1];
		if(this.ondrag(e, new_top, new_left) != false) this.setPos(new_top, new_left); this.setSave(new_top, new_left);
    };
    this.end  = function (e) { 
	//	Index(zIndex);
		if(false == this.ondrop(e)) this.setPos( restore_pos[0], restore_pos[1]);
	        
};
    this.setSave = function(new_top, new_left) {
                        GM_setValue('y', new_top+'px');
                        GM_setValue('x', new_left+'px');
	
    };
    if(o_move) this.ini(o_move, o_drag);
	
} // <-- DragObjekt



var dragObject = null;

function drag_start(e) {
	if( !dragObject ) return true;

	dragObject.start(e);
	document.onmouseup   = function (e) {
		document.onmouseup = document.onmousemove = null;
		dragObject.end(e);
		dragObject = null;
		return false;
	};
	document.onmousemove = function(e) {
		if(!dragObject) return end_drag(e);
		dragObject.move( e );
		return false;
	};
	if(e && e.preventDefault) e.preventDefault()
	return false;
}
/*
 * Hilfsfunktion:
 *
 * getEvtPos(e)
 * ermittelt die Position des Events
 * */
function getEvtPos(e)
{
    if(!e) e = window.event;
    var t = e.pageY ? e.pageY : e.clientY + window.document.body.scrollTop;
    var l = e.pageX ? e.pageX : e.clientX + window.document.body.scrollLeft;
    return [t, l];
}  
// Ende und Aufruf der anonymen Funktion



new DragObject( document.getElementById('fcunits2'), document.getElementById('drag')  );
 }