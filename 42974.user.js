// ==UserScript==
// @name          Automatically escaping tags
// @namespace      http://www.metafilter.com/user/25038
// @description   Automatically translates less than and greater than characters to their HTML entites in the comment box when entered between code tags.
// @include        http://*.metafilter.com/*
// ==/UserScript==

(function () {

	var doitlabel=null,
		commentbox=document.getElementById('comment'),
		doit=null;

	if (!commentbox) {
		return false;
	}
	
	doit=document.createElement('input');
	doit.type='checkbox';
	doit.id='transformcodetags';
	doit.checked="true";

	doitlabel=document.createElement('label');
	doitlabel.style.fontSize='small';
	doitlabel.appendChild(doit);
	doitlabel.appendChild(document.createTextNode(' Automatically escape < and > inside of <code> tags.'));

	commentbox.parentNode.appendChild(document.createElement('br'));
	commentbox.parentNode.appendChild(doitlabel);
	
	var oldcontent=commentbox.value;
	function checkcontent() {
		//alert('checking content');
		var c = 0, 
			i = 0,
			closetag='/code',
			current_position=commentbox.selectionStart,
			currchar = "",
			newcontent="",
			currentcontent=commentbox.value,
			currenttag="",
			intag=false,
			begintag=false,
			endtag=false,
			code_end=-1;
			code_start=currentcontent.toLowerCase().indexOf('<code>');
		if (doit.checked==false) return false;
		endpoint=currentcontent.length;
		if (currentcontent != oldcontent && code_start >= 0) {
			while ( c < endpoint ) {
				newcontent+=currentcontent.substring(c,code_start+6);
				c = code_start + 6;
				code_end=currentcontent.toLowerCase().indexOf('</code>',c);
				code_end=(code_end==-1)?endpoint:code_end;
				if (code_end > c) {
					for (i=c; i < code_end; i++) {
						currchar=currentcontent.substring(i,i+1);
						begintag=false;
						endtag=false;
						if (currchar=='<') {
							if (intag) {
								endtag=true;
							}
							intag=true;
							begintag=true;
						} else if (currchar=='>') {
							if (intag) {
								endtag=true;
								intag=false;
							}
						} else {
							if (intag) {
								if (!/[A-Za-z0-9\/]/.test(currchar)) {
									endtag=true;
									intag=false;
								}
							}
						}
						if (endtag) {
							newcontent+='&lt;'+currenttag;
							if (current_position >= i) {
								current_position+=3;
							}
							currenttag="";
						}
						if (begintag) {
							currenttag="";
						} else if (intag) {
							currenttag+=currchar;
						} else if (currchar=='>') {
							newcontent+='&gt;';
							if (current_position >= i) {
								current_position+=3;
							}
						} else {
							newcontent+=currchar;
						}
					}
					if (intag) {
						if ((currenttag.length > 0) && closetag.indexOf(currenttag.toLowerCase())!=0) {
							newcontent+='&lt;'+currenttag;
							if (current_position >= i) {
								current_position+=3;
							}
						} else {
							newcontent+='<'+currenttag;
						}
					}
					if (code_end == endpoint) {
						break;
					}
					newcontent+=currentcontent.substring(code_end,code_end+7);
					c = code_end + 7;
					code_start = currentcontent.toLowerCase().indexOf('<code>',c);
					if (code_start == -1) {
						newcontent+=currentcontent.substring(c,endpoint);
						break;
					}
				} else {
					newcontent+=currentcontent.substring(c,endpoint);
					break;
				}
			}
			commentbox.value=newcontent;
			commentbox.selectionStart=current_position;
			commentbox.selectionEnd=current_position;
			oldcontent=commentbox.value;
		}
	}

	commentbox.addEventListener('keyup',checkcontent,true);

})();
	
