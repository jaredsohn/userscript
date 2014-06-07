// ==UserScript==
// @name           Metric intervention
// @namespace      *
// @description    Converting that old French system the Brits are still using to the metric standard of science.
// @include        *
// @exclude        *google.com*
// @exclude        *doubleclick.net*
// @downloadURL   https://userscripts.org/scripts/source/130277.user.js
// @updateURL     https://userscripts.org/scripts/source/130277.meta.js
// ==/UserScript==

function todolist(x){
	
	// To skip a unit "comment out" the line below by putting 2 slashes before it "//" 

	x=convertFeet(x);
	x=convertInch(x);
	x=convertInchFoot(x);
	x=convertYard(x);
	x=convertMile(x);
	x=convertLbs(x);
	x=convertStone(x);
	x=convertGallon(x);

	//not implemented:

	//x=convertPint(x);
	//x=convertOunce(x);
	//x=convertQuart(x);
	//x=convertHectares(x);
	//x=convertAcres(x);
	//x=convertFathoms(x);
	//x=convertFahrenheit(x);
	//x=convertKelvin(x);

	return x;
}

function cleanFormatting(x){

// cheating a bit here...

x = x.replace(/&nbsp;/g, " ");
x = x.replace(/>([0-9])/g,"> $1");
x=" "+x;

// Fractials

if(x.indexOf('/')!=-1){
    z=x.split('/');
    for(nana=0;nana<z.length-1;nana++){
        pointer=z[nana].lastIndexOf(' ');
        pointer++;
        partials=z[nana].substring(pointer);
        if(!isNaN(partials)&&partials!=""){
            if(partials<1000){
                endHTML = z[nana].lastIndexOf('&gt;');
                beginHTML = z[nana].lastIndexOf('&lt;');
                if(beginHTML<=endHTML){
                    otherpointer=z[nana+1].search(/\D/);
                    division=z[nana+1].substring(0,otherpointer);
                    if(!isNaN(division)&&division!=""){
                        if(division<1000){
                            fractalus=(parseFloat(partials)/parseFloat(division));                 
                            if(!isNaN(z[nana].charAt(pointer-2))){
                                fractalus=fractalus.toString(10).substring(1);
                                z[nana]=z[nana].substring(0,pointer-1)+fractalus;
                                z[nana+1]=z[nana+1].substring(otherpointer);
                            } else {
                                z[nana]=z[nana].substring(0,pointer)+" "+fractalus;
                                z[nana+1]=z[nana+1].substring(otherpointer);
                            }
                        } else { z[nana]=z[nana]+"/";}
                    } else { z[nana]=z[nana]+"/";}
                } else { z[nana]=z[nana]+"/";}
            } else { z[nana]=z[nana]+"/";}
        } else { z[nana]=z[nana]+"/";}
    }
    x=z.join('');
}

return x;

}


function metricIntervention() {
	if (top.location == self.location) {
		matches=0;
		timeOutTimer = new Date();
		crashPrevention = timeOutTimer.getTime();
		failsafe=document.body.innerHTML;
		var walker = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
		var node;
		while(node = walker.nextNode()) {
			var s = node.nodeValue;
			var np = node.parentNode;
			if (np.nodeType == 1) {
				if (node.parentNode.nodeName.toLowerCase() == 'script') {
					continue;
				}
				
				if(np.innerHTML){
					timeTimer = new Date();
					runTime = timeTimer.getTime()-crashPrevention;
					
// Change this to have the script time-out faster or slower, default is 1000 ms.
					
					if(runTime>1000){ console.log("consumed more than 1000 ms..... aborting...");break; }

					contentMod=np.innerHTML;
					contentMod=todolist(contentMod);

					if(contentMod!=np.innerHTML){
						np.innerHTML = contentMod;
					}
				}
				
			}
			if(node.nodeValue){
				contentMod=node.nodeValue;
				contentMod=todolist(contentMod);
				node.nodeValue=contentMod;
			}
		}

		// console.log('dom matches : '+matches);
		domMatches=matches;
		matches=0;
		contentMod=todolist(failsafe);
		// console.log('innerHTML matches : '+matches);
		if(matches>domMatches){
		// console.log('document.body.innerHTML produced more results than the tree walker');	
			document.body.innerHTML=contentMod;
		}
		// console.log("total runtime : "+runTime+" ms");
		
	}
}

function convertFeet(x){
if(
x.indexOf(' foot')!=-1||
x.indexOf(' Foot')!=-1||
x.indexOf(' Feet')!=-1||
x.indexOf(' feet')!=-1||
x.indexOf('-foot')!=-1||
x.indexOf('-Foot')!=-1||
x.indexOf('-Feet')!=-1||
x.indexOf('-feet')!=-1||
x.indexOf(' ft')!=-1){

x=cleanFormatting(x);

x = x.replace(/Foot/g, "foot");
x = x.replace(/Feet/g, "feet");
x = x.replace(/ 1\/2 foot/g, "15.24 centimeter (0.5 foot)");
x = x.replace(/ 1\/2 feet/g, "15.24 centimeter (0.5 foot)");
x = x.replace(/ 0\.5 foot/g, "15.24 centimeter (0.5 foot)");
x = x.replace(/ 0\.5 feet/g, "15.24 centimeter (0.5 foot)");
x = x.replace(/ 1 foot/g, " 30.48 centimeter (1 foot)");
x = x.replace(/ (O|o)ne foot/g, " 30.48 centimeter (1 foot)");
x = x.replace(/ (T|t)wo foot/g, " 60.96 centimeter (2 foot)");
x = x.replace(/ (T|t)wo feet/g, " 60.96 centimeter (2 foot)");
x = x.replace(/ (T|t)hree foot/g, " 91.44 centimeters (3 foot)");
x = x.replace(/ (T|t)hree feet/g, " 91.44 centimeters (3 foot)");
x = x.replace(/ (F|f)our foot/g, " 1.2192 meter (4 foot)");
x = x.replace(/ (F|f)our feet/g, " 1.2192 meter (4 foot)");
x = x.replace(/ (F|f)ive feet/g, " 1.524 meter (5 foot)");
x = x.replace(/ (F|f)ive foot/g, " 1.524 meter (5 foot)");
x = x.replace(/([0-9])-feet/g, "$1 feet");
x = x.replace(/([0-9])-foot/g, "$1 feet");
x = x.replace(/([0-9]) foot/g, "$1 feet");
x = x.replace(/([0-9]) ft\./g, "$1 feet");
x = x.replace(/([0-9]) ft/g, "$1 feet");
x = x.replace(/ ([0-9]) ([0-9][0-9][0-9]) feet/g, " $1$2 feet");
x = x.replace(/ ([0-9]),([0-9][0-9][0-9]) feet/g, " $1$2 feet");
x = x.replace(/ ([0-9][0-9]) ([0-9][0-9][0-9]) feet/g, " $1$2 feet");
x = x.replace(/ ([0-9][0-9]),([0-9][0-9][0-9]) feet/g, " $1$2 feet");
x = x.replace(/ ([0-9][0-9][0-9]) ([0-9][0-9][0-9]) feet/g, " $1$2 feet");
x = x.replace(/ ([0-9][0-9][0-9]),([0-9][0-9][0-9]) feet/g, " $1$2 feet");

x = x.split(' feet');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>/g,"> ");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+(((bar*0.3048).toString(10)).replace(/(\d+\.\d+?)0000.*/,"$1"));
x[counter]=x[counter]+" meter ("+bar+"&nbsp;feet)";
matches++;
}else{x[counter]=x[counter]+" feet";}
}else{x[counter]=x[counter]+" feet";}
}
x = x.join('');
}
return x;
} 

function convertInch(x){
if(
x.indexOf(' inch')!=-1||
x.indexOf(' Inch')!=-1||
x.indexOf('-inch')!=-1||
x.indexOf('-Inch')!=-1){
//console.log('converting inch');

x=cleanFormatting(x);

x = x.replace(/([0-9])(-| )(i|I)(nches|nch|NCH|CHES)/g, "$1 inch");
x = x.replace(/an (i|I)nch/g, "2.54 centimeters (1&nbsp;inch)");
x = x.replace(/(O|o)ne (I|i)nch/g, "2.54 centimeters (1&nbsp;inch)");
x = x.replace(/ ([0-9])(,| )([0-9][0-9][0-9]) inch/g, " $1$3 inch");
x = x.replace(/ ([0-9][0-9])(,| )([0-9][0-9][0-9]) inch/g, " $1$3 inch");
x = x.replace(/ ([0-9][0-9][0-9])(,| )([0-9][0-9][0-9]) inch/g, " $1$3 inch");
x = x.split(' inch');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>([0-9])/g,"> $1");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((bar*2.54).toString(10).split('0000')[0]);
x[counter]=x[counter]+" centimeters ("+bar+"&nbsp;inch)";
matches++;
}else{x[counter]=x[counter]+" inch";}
}else{x[counter]=x[counter]+" inch";}
}
x = x.join('');
} 

return x;} 


function convertInchFoot(x){

if(x.search(/[0-9]'[0-9]/)!=-1){

x=cleanFormatting(x);

combine = x.match(/(\t|\s)[0-9]{1,30}(\.[0-9]{1,30})?'[0-9]{1,30}(\.[0-9]{0,30})?"?/g);

if(combine){
for(instanceCounter=0;instanceCounter<combine.length;instanceCounter++){
combineb=combine[instanceCounter].split(' ').join('');
combineb=combineb.split('\t').join('');
combinec=combineb.split('"').join('');
combined=combinec.split("'");
if(!isNaN(combined[0])){
combined=" "+(((combined[0]*30.48)+(combined[1]*2.54))/2.54)+'" '; // feet to centimeter + inch to centimeter
x = x.split(combine[instanceCounter]+'"').join(combined);
x = x.split(combine[instanceCounter]).join(combined);
matches++;
}
}
}
}

x=x.replace(/\u2019/g, "'");
feetregex=/[0-9]*' /;
if(x.search(feetregex)!=-1){

x=cleanFormatting(x);

x=x.replace(/  /g," ");
x=x.replace(/([0-9]{1,30}\.?[0-9]{1,30}?)' (X|x) ([0-9]{1,30}\.?[0-9]{1,30}?)'/g, " $1 feet m x $3 feet m ($1'\&nbsp\;x\&nbsp\;$3') ");
x=x.replace(/([0-9]{1,6})' /g," $1 feet meter ($1') ");
x = x.split(' feet');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>/g,"> ");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((bar*0.3048).toString(10).split('0000')[0]);
x[counter]=x[counter]+" ";
matches++;
}else{x[counter]=x[counter]+" feet";}
}else{x[counter]=x[counter]+" feet";}
}
x = x.join('');

}

inchregex=/[0-9]*" /;
if(x.search(inchregex)!=-1){

x=cleanFormatting(x);

x=x.replace(/(>| )([0-9]{1,30})(\.?[0-9]{1,30})?" (X|x) ([0-9]{1,30})(\.?[0-9]{1,30})?"/g, '$1 $2$3 inch x $5$6 inch ($2$3"\&nbsp\;x\&nbsp\;$5$6") ');
x=x.replace(/(>| )([0-9]{1,6})(\.?[0-9]{1,6})?" /g,'$1 $2$3 inch ($2$3") ');
x = x.split(' inch');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>/g,"> ");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((parseFloat(bar)*2.54).toString(10).split('0000')[0]);
x[counter]=x[counter]+" cm ";
matches++;
}else{x[counter]=x[counter]+" inch";}
}else{x[counter]=x[counter]+" inch";}
}
x = x.join('');
}
return x;} 

function convertYard(x){

if(
x.indexOf(' yard')!=-1||
x.indexOf(' Yard')!=-1||
x.indexOf('-yard')!=-1||
x.indexOf('-Yard')!=-1){

x=cleanFormatting(x);

x = x.replace(/(>| )([0-9]*)(-| )(y|Y)(ards|ard|ARDS|ARD)/g, " $2 yard");
x = x.replace(/a (y|Y)ard/g, "91.44 centimeter (1&nbsp;yard)");
x = x.replace(/(O|o)ne (y|Y)ard/g, "91.44 centimeter (1&nbsp;yard)");
x = x.replace(/ ([0-9]) ([0-9][0-9][0-9]) yard/g, " $1$2 yard");
x = x.replace(/ ([0-9]),([0-9][0-9][0-9]) yard/g, " $1$2 yard");
x = x.replace(/ ([0-9][0-9]) ([0-9][0-9][0-9]) yard/g, " $1$2 yard");
x = x.replace(/ ([0-9][0-9]),([0-9][0-9][0-9]) yard/g, " $1$2 yard");
x = x.replace(/ ([0-9][0-9][0-9]) ([0-9][0-9][0-9]) yard/g, " $1$2 yard");
x = x.replace(/ ([0-9][0-9][0-9]),([0-9][0-9][0-9]) yard/g, " $1$2 yard");
x = x.split(' yard');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>([0-9])/g,"> $1");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((bar*0.9144).toString(10).split('0000')[0]);
x[counter]=x[counter]+" meter ("+bar+"&nbsp;yard) ";
matches++;
}else{x[counter]=x[counter]+" yard";}
}else{x[counter]=x[counter]+" yard";}
}
x = x.join('');
}
return x;} 

function convertMile(x){

if(
x.indexOf(' mile')!=-1||
x.indexOf(' Mile')!=-1||
x.indexOf('-mile')!=-1||
x.indexOf('-Mile')!=-1){

x=cleanFormatting(x);

x = x.replace(/([0-9])(-| )(m|M)(iles|ILEs|ile|ILE)/g, "$1 mile");

x = x.replace(/a (m|M)ile/g, "1.609344 kilometer (1&nbsp;mile)");
x = x.replace(/(O|o)ne (m|M)iles/g, "1.609344 kilometer (1&nbsp;mile)");
x = x.replace(/(O|o)ne (m|M)ile/g, "1.609344 kilometer (1&nbsp;mile)");

x = x.replace(/ ([0-9]) ([0-9][0-9][0-9]) mile/g, " $1$2 mile");
x = x.replace(/ ([0-9]),([0-9][0-9][0-9]) mile/g, " $1$2 mile");
x = x.replace(/ ([0-9][0-9]) ([0-9][0-9][0-9]) mile/g, " $1$2 mile");
x = x.replace(/ ([0-9][0-9]),([0-9][0-9][0-9]) mile/g, " $1$2 mile");
x = x.replace(/ ([0-9][0-9][0-9]) ([0-9][0-9][0-9]) mile/g, " $1$2 mile");
x = x.replace(/ ([0-9][0-9][0-9]),([0-9][0-9][0-9]) mile/g, " $1$2 mile");

x = x.split(' mile');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>([0-9])/g,"> $1");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+(" "+(bar*1.609344).toString(10).split('0000')[0]);
x[counter]=x[counter]+" kilometer ("+bar+"&nbsp;mile)";
matches++;
}else{x[counter]=x[counter]+" mile";}
}else{x[counter]=" mile";}
}
x = x.join('');
}
return x;} 

function convertLbs(x){
if(
x.indexOf(' Lbs')!=-1||
x.indexOf(' lbs')!=-1||
x.indexOf('-Lbs')!=-1||
x.indexOf('-lbs')!=-1||
x.indexOf('ound')!=-1){

x=cleanFormatting(x);

x = x.replace(/([0-9])(-| |)(l|L)(bs\.|bs|BS\.|BS|b\.|b)/g, "$1 lbs");
x = x.replace(/([0-9])(-| |)(P|p)ound weight/g, "$1 lbs  heavy");
x = x.replace(/([0-9])(-| |)(P|p)ounds?/g, "$1 lbs  heavy");
x = x.replace(/a (l|L)bs/g, "453.59237 gram (1&nbsp;lbs)");
x = x.replace(/(O|o)ne (l|L)bs/g, "453.59237 gram (1&nbsp;lbs)");
x = x.replace(/(O|o)ne (l|L)bs/g, "453.59237 gram (1&nbsp;lbs)");
x = x.replace(/ ([0-9])(,| )([0-9][0-9][0-9]) lbs/g, " $1$3 lbs");
x = x.replace(/ ([0-9][0-9])(,| )([0-9][0-9][0-9]) lbs/g, " $1$3 lbs");
x = x.replace(/ ([0-9][0-9][0-9])(,| )([0-9][0-9][0-9]) lbs/g, " $1$3 lbs");
x = x.replace(/ weighing ([0-9]*),([0-9]*) (P|p)ounds/g, " weighting $1$2 lbs");
x = x.split(' lbs');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>([0-9])/g,"> $1");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((bar*0.45359237).toString(10).split('0000')[0]);
x[counter]=x[counter]+" killogram ("+bar+"&nbsp;lbs)";
matches++;
}else{x[counter]=x[counter]+" lbs";}
}else{x[counter]=" lbs";}
}
x = x.join('');
}
return x;} 

function convertStone(x){
if(
x.indexOf('Stone')!=-1||
x.indexOf('stone')!=-1){

x=cleanFormatting(x);

x = x.replace(/([0-9])(-| |)(s|S)tone/g, "$1 stone");
x = x.replace(/([0-9]) (s|S)t\.? /g, "$1 stone");
x = x.replace(/ a (S|s)tone/g, " 6.35 killogram (1&nbsp;stone)");
x = x.replace(/(O|o)ne (s|S)tone/g, "6.35 killogram (1&nbsp;stone)");
x = x.replace(/ ([0-9])(,| )([0-9][0-9][0-9]) stone/g, " $1$3 stone");
x = x.replace(/ ([0-9][0-9])(,| )([0-9][0-9][0-9]) stone/g, " $1$3 stone");
x = x.replace(/ ([0-9][0-9][0-9])(,| )([0-9][0-9][0-9]) stone/g, " $1$3 stone");
x = x.split(' stone');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>([0-9])/g,"> $1");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((bar*6.35029318).toString(10).split('0000')[0]);
x[counter]=x[counter]+" killogram ("+bar+"&nbsp;stone)";
matches++;
}else{x[counter]=x[counter]+" stone";}
}else{x[counter]=" stone";}
}
x = x.join('');
}
return x;} 



function convertGallon(x){
if(
x.indexOf('Gallon')!=-1||
x.indexOf('gallon')!=-1){

x=cleanFormatting(x);
x = x.replace(/([0-9])(-| |)(g|G)allons?/g, "$1 gallon");
x = x.replace(/([0-9]) ?(g|G)al\.? /g, "$1 gallon");
x = x.replace(/ a (G|g)allon/g, " 3.78541178 liter (1&nbsp;gallon)");
x = x.replace(/(O|o)ne (G|g)allon/g, "3.78541178 liter (1&nbsp;gallon)");
x = x.replace(/ ([0-9])(,| )([0-9][0-9][0-9]) gallon/g, " $1$3 gallon");
x = x.replace(/ ([0-9][0-9])(,| )([0-9][0-9][0-9]) gallon/g, " $1$3 gallon");
x = x.replace(/ ([0-9][0-9][0-9])(,| )([0-9][0-9][0-9]) gallon/g, " $1$3 gallon");
x = x.split(' gallon');
for(counter=0;counter<x.length-1;counter++){
if(x[counter]){
x[counter] = x[counter].replace(/>([0-9])/g,"> $1");
endHTML = x[counter].lastIndexOf('&gt;');
beginHTML = x[counter].lastIndexOf('&lt;');
foo = x[counter].lastIndexOf(' ');
bar = x[counter].substring(foo+1);
if(!isNaN(bar)&&beginHTML<=endHTML&&bar!=""){
x[counter]=x[counter].substring(0,foo);
x[counter]=x[counter]+" "+((bar*3.78541178).toString(10).split('0000')[0]);
x[counter]=x[counter]+" liter ("+bar+"&nbsp;gallon)";
matches++;
}else{x[counter]=x[counter]+" gallon";}
}else{x[counter]=" gallon";}
}
x = x.join('');
}
return x;}

metricIntervention();
