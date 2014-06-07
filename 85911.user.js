// ==UserScript==
// @name           BvS BillyCon Success Calculator
// @namespace      Garyzx
// @description    Calculates the probability for each outcome of BillyCon events
// @include        http://www.animecubed.com/billy/bvs/billycon.html
// @include        http://animecubed.com/billy/bvs/billycon.html
// ==/UserScript==

var frac=[1];
for(var n=1; n<10; n++)
	frac[n]=frac[n-1]*n;

function calculate(){
	var base=1;		//Your base number of rolls, default is 1
	var range=10;	//Your range, default is 10, set to 11 if you have IO3
	var strength=0;	//Your strength, default is 0, set to 1 if you have IO3
	
	if(document.getElementById("useflow").checked)
		base++;
	
	var nodes=document.evaluate("//table[@cellpadding='3']/tbody/tr/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var n=0; n<nodes.snapshotLength; n++){
		var td=nodes.snapshotItem(n);
		if(td.wrappedJSObject.oldInnerHTML)
			td.innerHTML=td.wrappedJSObject.oldInnerHTML;
		else
			td.wrappedJSObject.oldInnerHTML=td.innerHTML;
		if(td.innerHTML.indexOf("Difficulty")==-1)
			continue;
		var rolls=base+parseInt(td.innerHTML.match(/Bonuses \(([0-9]+)\)/)[1]);
		if(rolls<0)
			rolls=0;
		var diff=parseInt(td.innerHTML.match(/Difficulty: <[bi<>]+>([0-9]+)/)[1]);
		var p=0;
		if(diff<=range)
			p=(range-diff+strength+1)/range;
		if(p>1)
			p=1;
		var prob=[];
		for(var k=0; k<=rolls; k++)
			prob[k]=Math.pow(p, k)*Math.pow(1-p, rolls-k)*frac[rolls]/(frac[k]*frac[rolls-k]);
		var matches=td.innerHTML.match(/<[bi<>]+>[0-9]+[+]*/g);
		var last=rolls+1;
		for(var i=matches.length-1; i>0; i--){
			var k=parseInt(matches[i].match(/[0-9]+/));
			var total=0;
			for(var j=k; j<last && j<=rolls; j++)
				total+=prob[j];
			last=k;
			td.innerHTML=td.innerHTML.replace(matches[i], matches[i]+" ("+Math.round(total*1000)/10+"%)");
		}
	}	
}

document.getElementById("useflow").addEventListener("click", calculate, true);
calculate();
