// ==UserScript==
// @name         RvB Quote and Code Buttons
// @namespace    http://www.petersonnealdesign.com
// @description  Adds 'quote' and 'code' buttons to the Roosterteeth comment/journal box.
// @include      http://*.roosterteeth.com/*
// ==/UserScript==
/**/
var codePref="ON";
var toGrab;
var werd="quote";
theScript='function dumfunc(){\n\
	r=0;\n\
	for(r=0;r<document.forms.length;r++){\n\
		u=document.forms[r];\n\
		if(u.name=="post"){\n\
			t=0;\n\
			for(t=0;r<u.elements.length;t++){\n\
				if(u.elements[t].type=="textarea"){\n\
					return u.elements[t];\n\
				}\n\
			}\n\
		}\n\
	}\n\
}\n\
function quoteFuncs(werd){\n\
	var txtarea=dumfunc();\n\
	if (toGrab!="") {\n\
		if(txtarea.value!=""){\n\
			txtarea.value+="\\n";\n\
		}\n\
		txtarea.value+="["+werd+"]"+toGrab+"[/"+werd+"]";\n\
		return;\n\
	} else if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0)) {\n\
		var selLength = txtarea.textLength;\n\
		var selStart = txtarea.selectionStart;\n\
		var selEnd = txtarea.selectionEnd;\n\
		if (selEnd == 1 || selEnd == 2){\n\
			selEnd = selLength;\n\
		}\n\
		var s1=(txtarea.value).substring(0,selStart);\n\
		var s2 = (txtarea.value).substring(selStart, selEnd);\n\
		var s3 = (txtarea.value).substring(selEnd, selLength);\n\
		txtarea.value = s1 + "["+werd+"]" + s2 + "[/"+werd+"]" + s3;\n\
		return;\n\
	}\n\
	if (document.getElementById(werd+"Button").value==werd+"*") {\n\
		txtarea.value += "[/"+werd+"]";\n\
		document.getElementById(werd+"Button").value = werd;\n\
		return;\n\
	} else {\n\
		txtarea.value += "["+werd+"]";\n\
		document.getElementById(werd+"Button").value = werd+"*";\n\
		return;\n\
	}\n\
	storeCaret(txtarea);\n\
	txtarea.focus();\n\
}\n\
function breakCode(){\n\
	var txtarea=dumfunc();\n\
	var splitter=/\\s?\\[\\/?code\\]/gm;\n\
	var pieces=new Array();\n\
	pieces=txtarea.value.split(splitter);\n\
	for(var i in pieces){\n\
		if(i%2==0){\n\
			k=i*1+1;\n\
			if(k!=pieces.length){\n\
				pieces[i]+="[code]";\n\
			}\n\
		} else {\n\
			var cp=new Array();\n\
			cp=pieces[i].split(/(\\n)/gm);\n\
			for(var j in cp){\n\
				if(cp[j].length>65){\n\
					cp[j]=cp[j].replace(/(.{1,65})\\s/gm,"$1\\n	");\n\
				}\n\
				k=j*1+1;\n\
				if(cp[k]=="\\n"){\n\
					cp.splice(k,1);\n\
				}\n\
			}\n\
			pieces[i]=cp.join(" -\\\\n\\n");\n\
			pieces[i]+=" -\\\\n[/code]";\n\
		}\n\
	}\n\
	txtarea.value=pieces.join("");\n\
}\n\
function getText(){\n\
	return window.getSelection().valueOf();\n\
}'; // End theString. Multiline strings FTW!
cr=document.body;
crs=document.createElement('script');
crs.setAttribute('type','text/javascript');
crs.innerHTML=theScript;
cr.appendChild(crs);
bBox=false;
function makeButton(elm){
	elm.setAttribute('type','button');
	elm.setAttribute('class','button');
	elm.setAttribute('onmouseover','toGrab=getText();');
	elm.setAttribute('onclick','dumfunc().focus();');
}
qBut=document.createElement('input');
qBut.setAttribute('value','quote');
qBut.setAttribute('name','addbbcodeQ');
qBut.setAttribute('id','quoteButton');
qBut.setAttribute('style','width: auto; padding-left: 5px; padding-right: 5px; margin-left: .5em; margin-right: .5em;');
qBut.setAttribute('onmousedown',"quoteFuncs('quote');");
makeButton(qBut);
coBut=document.createElement('input');
coBut.setAttribute('value','code');
coBut.setAttribute('style','width: auto; padding-left: 5px; padding-right: 5px; margin-right: .5em;');
coBut.setAttribute('name','addbbcodeC');
coBut.setAttribute('id','codeButton');
coBut.setAttribute('onmousedown',"quoteFuncs('code');");
makeButton(coBut);
for(m=0;m<document.forms.length;m++){
	f=document.forms[m];
	if(f.name=="post"){
		n=0;
		for(n=0;n<f.elements.length;n++){
			if(f.elements[n].type=="button" && f.elements[n].value=="b"){
				bBox=f.elements[n].parentNode;
				if(bBox.childNodes[17]){
					bBox.insertBefore(qBut,bBox.childNodes[17]);
				} else {
					bBox.appendChild(qBut);
				}
				bBox.insertBefore(coBut,qBut);
				break;
			}
		}
	}
}
if(codePref=="ON"){
	if(document.forms[2]){
		document.forms[2][26].setAttribute('onmousedown','breakCode();');
		document.forms[2][25].setAttribute('onmousedown','breakCode();');
	} else if(document.forms[0][28]){
		document.forms[0][28].setAttribute('onmousedown','breakCode();');
		document.forms[0][27].setAttribute('onmousedown','breakCode();');
	} else if(document.forms[0][26]){
		document.forms[0][26].setAttribute('onmousedown','breakCode();');
		document.forms[0][25].setAttribute('onmousedown','breakCode();');
	}
}