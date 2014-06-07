// ==UserScript==
// @name			NoDFTroll
// @namespace 	NoDFTroll
// @include 		http://daringfireball.net/*
// ==/UserScript==
function blocktrolls(){
	var trolls=['Grabby','Spooner'];	// Array of strings of usernames to match and block
	var exact=false;				// Apply exact matching and case sensitivity to list of troll usernames? [Default: false]
	var total_block=false;			// Block trolls without toggle link to redisplay their comments? [Default: false]
	var block_refs=false;			// Block @usernames and comments that match troll usernames? [Default: false]

	var name_els=document.getElementById('DFWC').getElementsByTagName('dt');				// Username elements
	var num_blocked=0;																// Blocked comments counter
	for(j=0;j<name_els.length;j++){
		for(k=0;k<trolls.length;k++){
			var test=name_els[j].innerHTML.split(':</a><dd>')[0].split(':<dd>')[0].split('>').pop();	// Username text
			if(block_refs){
				var c=name_els[j].getElementsByClassName('comment')[0].innerHTML;			// Comment text
			}
			if(	(exact && (test==trolls[k] || (block_refs && test.substring(1)==trolls[k]))) ||
				(!exact && test.toLowerCase().search(trolls[k].toLowerCase())!=-1 && (block_refs || test[0]!='@')) ||
				(block_refs && ((exact && c.search(trolls[k])!=-1) || (!exact && c.toLowerCase().search(trolls[k].toLowerCase())!=-1)))
			){
				num_blocked++;														// Increment blocked comments counter
				if(total_block){
					name_els[j].style.display='none';										// Hide username
					name_els[j].getElementsByTagName('dd')[0].style.display='none';			// Hide comment text and date/time
				}else{
					var s1='var c=document.getElementsByClassName(\'comment\')['+j+'].style;';
					var s2='c.display=(c.display!=\'block\')?\'block\':\'none\';return false;';
					var s3='<a href="" onClick="'+s1+s2+'" class="smallprint" style="padding:0.35em 0 0.5em">(Toggle Comment)</a>';
					var a=name_els[j].innerHTML.split(':</a><dd>');
					if(a.length>1){
						name_els[j].innerHTML=a.join(':</a>&nbsp; '+s3+'<dd>');				// Handle optional website case
					}else{
						name_els[j].innerHTML=name_els[j].innerHTML.split(':<dd>').join(':&nbsp; '+s3+'<dd>');
					}
					name_els[j].getElementsByClassName('comment')[0].style.display='none';		// Hide comment text
				}
			}
		}
	}
	var s4='<span class="smallprint" style="font-size:0.75em">('+num_blocked+' Blocked)</span>';
	var n=document.getElementsByClassName('comments')[0];									// Big "Comments" heading element
	n.innerHTML=n.innerHTML.split('<h1>Comments').join('<h1>Comments&nbsp; '+s4);			// Display blocked comments counter
}
// Wait for comments to load before proceeding
var i=setInterval(function(){if(document.getElementById('DFWC').innerHTML.length!=0){clearInterval(i);blocktrolls();}},200);