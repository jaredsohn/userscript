// ==UserScript==
// @name           Popmundo Big Skill Stars
// @namespace      deon.j.evans@gmail.com
// @include        http://www*.popmundo.com/Common/*
// @include        http://www*.popmundo.com/common/*
// @author		   Deon Evans
// @version		   1.0 
// ==/UserScript==


// Shorcut Constants
dls = document.location.search;

//FUNctions
function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, 0, null), result = [];
	switch(got.resultType) {
		case got.STRING_TYPE: return got.stringValue;
		case got.NUMBER_TYPE: return got.numberValue;
		case got.BOOLEAN_TYPE: return got.booleanValue;
		default: while(next = got.iterateNext()) result.push(next);
		return result;
	}
}


function $X(xpath, root) {
	var got = $x(xpath, root);
	return got instanceof Array ? got[0] : got;
}


// Code

if(dls.match(/Skills/) && !dls.match(/MySkills/)){

	xp = '/html/body/table[3]/tbody/tr/td/div[2]/table/tbody'
	node = $X(xp);
	
	if(node){
		len = node.childNodes.length
		index = 3;
		for(i=0;i<len;i++){
			ptr = node.childNodes[i]
			test = ptr.innerHTML;
			if(ptr.innerHTML){
				if(test.match(/Personal/)) index = 2;
				if(ptr.childNodes[index]) {
					star_row = ptr.childNodes[index]
					if(star_row.innerHTML){
						stars = (star_row.innerHTML.split('*').length)-1
						if(stars >= 5){
							for(j=0;j<4;j++) star_row.removeChild(star_row.firstChild)
							star_row.firstChild.setAttribute('height','12')
							star_row.firstChild.setAttribute('width','12')
							
						}
					}
				}
			}
		}
	}
}


if(dls.match(/MySkills/)){

	xp = '/html/body/table[3]/tbody/tr/td/div[2]/form'
	node = $X(xp);
	if(node){
		len = node.childNodes.length
		for(i=0;i<len;i++){
			list = node.childNodes[i];
			if(list.childNodes[0] && list.childNodes[0].childNodes[1]){
				box = list.childNodes[0].childNodes[1]
				len2 = box.childNodes.length
				for(j=0; j<len2; j++){
					row = box.childNodes[j]
					if(row.innerHTML){
						star_row = row.childNodes[3]
						stars = (star_row.innerHTML.split('*').length)-1
						if(stars >= 5){
							for(k=0;k<4;k++) star_row.removeChild(star_row.firstChild)
							star_row.firstChild.setAttribute('height','12')
							star_row.firstChild.setAttribute('width','12')
						}
					}
				}
			}
		}	
	}
}