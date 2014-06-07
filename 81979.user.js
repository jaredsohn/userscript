// ==UserScript==
// @name           Palette 1.2
// @namespace    palette_ff
// @description    Userscript for quick text formatting
// @include        http://www.ex.ua/*
// ==/UserScript==
var boxDragging=0, hueDragging=0, idragbox, postfocus=0, bsP=1;

var paletteStr='<div id="palette_body" style="width:370px;height:256px;border:solid 1px #ddd;background:url(http://i.piccy.info/i5/36/75/207536/backgr.png) transparent;padding:18px 15px;display:none;position:absolute;"><div id="colorbox" style="height:254px;width:254px;background:url(http://i.piccy.info/i5/56/75/207556/colorbox.png) no-repeat #f00;border:solid 1px #ddd;overflow:hidden;display:inline-block;"><div id="box_pointer" style="width:10px;height:10px;background:url(http://i.piccy.info/i5/54/75/207554/boxpointer.png) no-repeat transparent;margin:0px;"></div></div><div id="hue" style="height:256px;width:30px;display:inline-block;background:url(http://i.piccy.info/i5/57/75/207557/hue.png) no-repeat center;overflow:hidden;margin-left:10px;"><div id="hue_slider" style="width:30px;height:5px;background:url(http://i.piccy.info/i5/60/75/207560/hueslider.png);margin-top:-2px;"></div></div><div style="height:256px;width:50px;display:inline-block;vertical-align:top;margin-left:10px;"><div id="preview" style="width:50px;height:30px;background:transparent;border:solid 1px #bbb;border-bottom:none;"></div><div id="preview_ws" style="width:50px;height:30px;background:transparent;border:solid 1px #bbb;border-top:none;"></div></div></div><div id="html_prev_slider" style="display:none;position:absolute;top:0;left:0;width:175px;height:8px;border:solid 1px #aaa;background:#efefef;padding:1px;"><div style="height:8px;width:175px;background:#ddd;text-align:center;font-size:6px;line-height:6px;cursor:s-resize;" onmouseover="this.style.background=\'#ccc\'" onmouseout="this.style.background=\'#ddd\'" onmousedown="startDragResize()"><div style="background:#fff;border:solid 1px #a0a0a0;width:4px;height:4px;display:inline-block;margin:0 2px;"></div><div style="background:#fff;border:solid 1px #a0a0a0;width:4px;height:4px;display:inline-block;margin:0 2px;"></div><div style="background:#fff;border:solid 1px #a0a0a0;width:4px;height:4px;display:inline-block;margin:0 2px;"></div></div></div><br id="colordummy" style="display:none" />';
if (document.addEventListener) 
{
    document.addEventListener("DOMContentLoaded", init, false);
}
var elemPad, cleft, ctop, elemPadFirst, used=0, viewstr, loc, cookieDur, cook, prevCurHeight='296px', resize=0, postScrol=0;

function fitElement(elemPad, elemPadFirst)
{
	cleft=elemPad.offsetLeft;
	ctop=elemPad.offsetTop;
	while(elemPad=elemPad.offsetParent)
	{
		cleft+=elemPad.offsetLeft;
		ctop+=elemPad.offsetTop;
	}
	elemPadFirst.style.left=(cleft+25+window.scrollX)+'px';
	elemPadFirst.style.top=(ctop)+'px';
}

function init()
{
	if(String(window.location).split('/')[3]=='edit')
	{
		document.body.innerHTML+=paletteStr;
		if(document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].innerHTML.length>100)
		{
			loc=document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		}
		else
		{
			loc=document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1];
			loc.innerHTML='';
			loc.parentNode.firstChild.innerHTML=unescape('%u0438%u043D%u0441%u0442%u0440%u0443%u043C%u0435%u043D%u0442%u044B%3A');
		}
		loc.innerHTML+=' <input type="button" value="b" onclick="fontb()"> <input type="button" value="i" onclick="fonti()"> <input type="button" value="s" onclick="fonts()"> <input type="button" value="u" onclick="fontu()"> <input type="button" value="q" onclick="fontq()">  <input type="button" value="sup" onclick="fontsup()"> <input type="button" value="sub" onclick="fontsub()"> <input type="button" value="pre" onclick="fontpre()"> <input type="button" value="color" onclick="fontcol()"> <input type="text" name="textcolor" style="width:117px;"><div align="middle" style="width:21px;height:21px;display:inline-block;background:url(http://i.piccy.info/i5/37/18/201837/col.jpg) no-repeat transparent;vertical-align:top;margin:2px 4px;" id="palette_tog" onclick="paletteToggle()" onmouseover="palHov(this)" onmouseout="palBlur(this)"></div><br /><input type="button" value="des:b" onclick="desB()"> <input type="button" value="des:u" onclick="desU()"> <input type="button" value="des:i" onclick="desI()"> <input type="button" value="'+unescape('%u2022')+'ul" onclick="ul()"> <input type="button" value="1.ol" onclick="ol()"> <input type="button" value=">cl" onclick="cl()"> <select name="lstyleopt"><option>+</option><option>></option><option>*</option><option>'+unescape('%23')+'</option><option>'+unescape('%u2192')+'</option><option>'+unescape('%u25AC')+'</option><option>'+unescape('%u25BA')+'</option><option>'+unescape('%u25CB')+'</option><option>'+unescape('%u2022')+'</option><option>'+unescape('%u2660')+'</option><option>'+unescape('%u2663')+'</option><option>'+unescape('%u2666')+'</option><option>'+unescape('%u263A')+'</option><option>'+unescape('%u263B')+'</option><option>'+unescape('%u2665')+'</option></select> <input type="button" value="cls" onclick="clsFormatting()"> <input type="button" value="link" onclick="alink()">  <input type="text" name="textlink" style="width:176px;"><br /><input type="button" value="gradient" onclick="paintGradient()"> <input style="width:12px;height:21px;" id="delgrad" type="button" value="-" onclick="delall()"><div id="grad_samples" style="height:11px;padding:4px;border:solid 1px #aaa;display:inline-block;vertical-align:top;margin-top:1px;line-height:11px;"></div><input style="width:12px;height:21px;" id="addgrad" type="button" value="+" onclick="gSamAdd()"> <input type="button" value="<" onclick="undo()"> <input type="button" value=">" onclick="redo()"> <input type="button" value="<<" onclick="restoreOrig()"> <input type="button" value="code" onclick="code()">';
		loc.style.lineHeight='25px';

		fitElement(document.getElementById('palette_tog'), document.getElementById('palette_body'));



		for(i=0;i<document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].getElementsByTagName('INPUT').length;i++)
		{
			if(document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].getElementsByTagName('INPUT')[i].type=='button')
			{
				document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].getElementsByTagName('INPUT')[i].style.background='url(http://i.piccy.info/i5/83/86/248683/btn.png) #FFF no-repeat right';
				document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].getElementsByTagName('INPUT')[i].style.border='solid 1px #aaa';
				document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[8].childNodes[1].getElementsByTagName('INPUT')[i].style.fontWeight='bold';
			}
		}
		document.getElementById('addgrad').style.borderLeft='none';
		document.getElementById('delgrad').style.borderRight='none';

		//1.1
		document.getElementsByName('edit')[0].childNodes[3].childNodes[1].childNodes[2].lastChild.attributes[1].value=3;
		viewstr=document.getElementsByName('edit')[0].childNodes[3].childNodes[1].innerHTML.split('<tr>')[0]+document.getElementsByName('edit')[0].childNodes[3].childNodes[1].innerHTML.split('<tr>')[1]+document.getElementsByName('edit')[0].childNodes[3].childNodes[1].innerHTML.split('<tr>')[2]+'<TD align="right"><a onclick="prevVisTog()" href="#"><u>'+unescape('%u043F%u0440%u0435%u0432%u044C%u044E%3A')+'</u></a></TD><TD style=""><div id="html_prev" style="width:600px;overflow:hidden;height:17px;padding:2px;word-wrap:break-word;border:solid 1px #A0A0A0;"><i>'+unescape('%20%u041A%u043B%u0438%u043A%u043D%u0438%u0442%u0435%2C%20%u0447%u0442%u043E%u0431%u044B%20%u0440%u0430%u0437%u0432%u0435%u0440%u043D%u0443%u0442%u044C')+'</i></div></TD></TR>';
		for(i=3;i<document.getElementsByName('edit')[0].childNodes[3].childNodes[1].innerHTML.split('<tr>').length;i++)
		{
			viewstr+=document.getElementsByName('edit')[0].childNodes[3].childNodes[1].innerHTML.split('<tr>')[i];
		}
		document.getElementsByName('edit')[0].childNodes[3].childNodes[1].innerHTML=viewstr;
		if(!document.getElementsByName('public')[0])
		{
			document.getElementsByName('edit')[0].innerHTML+='<input type=hidden'+unescape('%20name%3D')+'public value=-1>';
		}

		window.addEventListener('mouseup',unsafeWindow.clearInters,false);
		document.getElementById('colorbox').addEventListener('mousedown',unsafeWindow.startDragbp,false);
		document.getElementById('hue').addEventListener('mousedown',unsafeWindow.startDraghue,false);
		window.addEventListener('mousemove',unsafeWindow.dragbp,false);
		document.getElementById('preview_ws').addEventListener('click',unsafeWindow.writeSafe,false);

		document.getElementsByName('post')[0].addEventListener('keyup', unsafeWindow.refreshPrev, false);
		document.getElementsByName('post')[0].addEventListener('change', unsafeWindow.refreshPrev, false);		
		
		document.getElementsByName('textcolor')[0].addEventListener('change', unsafeWindow.rgbChange, false);		
		document.getElementsByName('textcolor')[0].addEventListener('keyup', unsafeWindow.rgbChange, false);
		
		//1.2
		if(readCook('ph'))
		{
			cook=readCook('ph');
			if(parseInt(cook.split('=')[0])>0)
			{
				prevCurHeight=cook.split('=')[0]+'px';
				unsafeWindow.prevVisTog();
			}
		}
		if(readCook('gs'))
		{
			cook1=readCook('gs');
			if(cook1!='none')
			{
				for(i=0;i<cook1.split('*').length-1;i++)
				{
					createGradSample(cook1.split('*')[i].substr(0,7));
				}
				gradLoading=1;
			}
			else{gradLoading=1;}
		}
		else{gradLoading=1;}
		origMsg=document.getElementsByName('post')[0].value;
		undoArray.push(origMsg);
		unsafeWindow.htmlSliderPos();
	}
}

unsafeWindow.code=function()
{
	if(document.getElementsByName('post')[0].selectionStart!=document.getElementsByName('post')[0].selectionEnd)
	{
		lirange=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionStart, document.getElementsByName('post')[0].selectionEnd);
		lirange=lirange.replace(/\</g, '&lt;');
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=document.getElementsByName('post')[0].value.substring(0, document.getElementsByName('post')[0].selectionStart)+lirange+document.getElementsByName('post')[0].value.substr(document.getElementsByName('post')[0].selectionEnd);
		setTimeout('panPost()', 20);
		refreshPrev();
		rememberActions();
	}
}
var origMsg, undoArray=new Array(), undoCounter=1;
unsafeWindow.restoreOrig=function()
{
	if(undoArray.length>=11)
	{
		undoArray.splice(0, undoArray.length-11);
	}
	if(undoCounter!=undoArray.length-1)
	{
		undoArray.splice(undoCounter, 12)
	}
	undoArray.push(origMsg);
	undoCounter=undoArray.length-1;
	postScrol=document.getElementsByName('post')[0].scrollTop;
	document.getElementsByName('post')[0].value=origMsg;
		setTimeout('panPost()', 20);
	refreshPrev();
}
function rememberActions()
{
	if(undoArray.length>=12)
	{
		undoArray.splice(0, undoArray.length-12);
	}
	undoArray.splice(undoCounter+1, 12)
	undoArray.push(document.getElementsByName('post')[0].value);
	undoCounter=undoArray.length-1;
}
unsafeWindow.undo=function()
{
	if(undoCounter>0){
	undoCounter--;
		postScrol=document.getElementsByName('post')[0].scrollTop;
	document.getElementsByName('post')[0].value=undoArray[undoCounter];
		setTimeout('panPost()', 20);
	refreshPrev();
	}
}
unsafeWindow.redo=function()
{
	if(undoCounter<undoArray.length-1){
		undoCounter++;
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=undoArray[undoCounter];
		setTimeout('panPost()', 20);
		refreshPrev();
	}
}

unsafeWindow.gSamAdd=function(){if(document.getElementsByName('textcolor')[0].value){createGradSample(document.getElementsByName('textcolor')[0].value);}}
unsafeWindow.delall=function(){
	document.getElementById('grad_samples').innerHTML='';
	if(gradLoading){
	rememberGradients();
	}
}

var gradCut, gradColorAr, gradParts, gradPartsPainted, curPaint, gradReady, localGradCounter=0;
unsafeWindow.paintGradient=function()
{
	if(document.getElementsByName('post')[0].selectionStart!=document.getElementsByName('post')[0].selectionEnd&&document.getElementById('grad_samples').childNodes.length>1)
	{
		dastring=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionStart, document.getElementsByName('post')[0].selectionEnd);
		gradReady='';
		for(iAu=0;iAu<dastring.length;iAu++)
		{
			if(dastring.length>=document.getElementById('grad_samples').childNodes.length&&dastring.split('\n')[iAu])
			{
				gradReady+=paintGradientString(dastring.split('\n')[iAu])+'\n';
			}
		}
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=document.getElementsByName('post')[0].value.substring(0, document.getElementsByName('post')[0].selectionStart)+gradReady+document.getElementsByName('post')[0].value.substr(document.getElementsByName('post')[0].selectionEnd);
		setTimeout('panPost()', 20);
		refreshPrev();
		rememberActions();
		
	}
}


var gradLoading=0;
function rememberGradients()
{
	if(document.getElementById('grad_samples').childNodes.length)
	{
		var grads='';
		for(i=0;i<document.getElementById('grad_samples').childNodes.length;i++)
		{
			grads+='#'+toHex(parseInt(document.getElementById('grad_samples').childNodes[i].style.backgroundColor.substring(4, document.getElementById('grad_samples').childNodes[i].style.backgroundColor.length-2).split(',')[0]))+toHex(parseInt(document.getElementById('grad_samples').childNodes[i].style.backgroundColor.substring(4, document.getElementById('grad_samples').childNodes[i].style.backgroundColor.length-2).split(',')[1]))+toHex(parseInt(document.getElementById('grad_samples').childNodes[i].style.backgroundColor.substring(4, document.getElementById('grad_samples').childNodes[i].style.backgroundColor.length-1).split(',')[2]))+'*';
		}
		writeCook('gs', grads);
	}
	else
	{
		writeCook('gs', 'none');	
	}
}
function createGradSample(colval)
{
	document.getElementById('grad_samples').innerHTML+='<div style="background-color:'+colval+';width:9px;height:9px;display:inline-block;border:solid 1px #000;margin:0 1px;" id="sample'+localGradCounter+'" onclick="deleteGradSample(\'sample'+localGradCounter+'\')"></div>';
	localGradCounter++;
	if(gradLoading){
	rememberGradients();
	}
}
unsafeWindow.deleteGradSample=function(id)
{
	eval('document.getElementById("'+id+'").parentNode.removeChild(document.getElementById("'+id+'"))');
	if(gradLoading){rememberGradients();}
}
function paintGradientString(gradCut)
{
	gradColorAr=new Array();
	for(i=0;i<document.getElementById('grad_samples').childNodes.length;i++)
	{
		gradColorAr.push('#'+toHex(parseInt(document.getElementById('grad_samples').childNodes[i].style.backgroundColor.substring(4, document.getElementById('grad_samples').childNodes[i].style.backgroundColor.length-2).split(',')[0]))+toHex(parseInt(document.getElementById('grad_samples').childNodes[i].style.backgroundColor.substring(4, document.getElementById('grad_samples').childNodes[i].style.backgroundColor.length-2).split(',')[1]))+toHex(parseInt(document.getElementById('grad_samples').childNodes[i].style.backgroundColor.substring(4, document.getElementById('grad_samples').childNodes[i].style.backgroundColor.length-1).split(',')[2])));
	}
	gradParts=new Array();
	for(i=0;i<gradColorAr.length-2;i++)
	{
		gradParts.push(gradCut.substr(i*Math.floor(gradCut.length/(gradColorAr.length-1)), Math.floor(gradCut.length/(gradColorAr.length-1))));
	}
	gradParts.push(gradCut.substr(i*Math.floor(gradCut.length/(gradColorAr.length-1))));
	gradPartsPainted='';
	for(iPr=0;iPr<gradParts.length;iPr++)
	{
		curPaint='';
		for(i=0;i<gradParts[iPr].length;i++)
		{
			curPaint+='<font color=#'+(toHex(Math.floor(parseInt(HexToR(gradColorAr[iPr])-((parseInt(HexToR(gradColorAr[iPr]))-parseInt(HexToR(gradColorAr[iPr+1])))/(gradParts[iPr].length-1)*i)))))+(toHex(Math.floor(parseInt(HexToG(gradColorAr[iPr])-((parseInt(HexToG(gradColorAr[iPr]))-parseInt(HexToG(gradColorAr[iPr+1])))/(gradParts[iPr].length-1)*i)))))+(toHex(Math.floor(parseInt(HexToB(gradColorAr[iPr])-((parseInt(HexToB(gradColorAr[iPr]))-parseInt(HexToB(gradColorAr[iPr+1])))/(gradParts[iPr].length-1)*i)))))+'>'+gradParts[iPr].substr(i, 1)+'</font>';
		}
		gradPartsPainted+=curPaint;
	}
	return gradPartsPainted;
}

unsafeWindow.startDragResize=function()
{
	detectCoord(document.getElementById('html_prev'));
	resize=1;
}
unsafeWindow.htmlSliderPos=function()
{
	detectCoord(document.getElementById('html_prev'));
	document.getElementById('html_prev_slider').style.left=Math.floor(cleft+(parseInt(document.getElementById('html_prev').offsetWidth)/2)-89)+'px';
	document.getElementById('html_prev_slider').style.top=Math.floor(ctop+(parseInt(document.getElementById('html_prev').offsetHeight))+2)+'px';
}
function writeCook(name, value)
{
	cookieDur=new Date();
	cookieDur.setFullYear(cookieDur.getFullYear()+1);
	document.cookie=name+'='+value+'; expires='+cookieDur.toUTCString()+';';
}
var cookAr;
function readCook(name)
{
	cookAr=document.cookie.split(';');
	var curCook='';
	for(i=0;i<cookAr.length;i++)
	{
		curCook=cookAr[i].split('=')[0];
		if(curCook.substr(0, 1)==' ')
		{
			curCook=curCook.substr(1);
		}
		if(curCook==name)
		{
			return cookAr[i].split('=')[1];
			break;
		}
	}
}
unsafeWindow.writeSafe=function()
{
	document.getElementsByName('textcolor')[0].value='#'+String(toHex(r)).substring(0, 1).toUpperCase()+String(toHex(r)).substring(0, 1).toUpperCase()+String(toHex(g)).substring(0, 1).toUpperCase()+String(toHex(g)).substring(0, 1).toUpperCase()+String(toHex(b)).substring(0, 1).toUpperCase()+String(toHex(b)).substring(0, 1).toUpperCase();
}
unsafeWindow.clearInters=function()
{
	boxDragging=0;
	hueDragging=0;
	resize=0;
}
unsafeWindow.startDragbp=function(event)
{
	document.getElementById('palette_body').focus();
	detectCoord(document.getElementById('box_pointer').parentNode);
	boxDragging=1;
	unsafeWindow.dragbp(event);
}
unsafeWindow.startDraghue=function(event)
{
	detectCoord(document.getElementById('hue_slider').parentNode);
	hueDragging=1;
	unsafeWindow.dragbp(event);
}
var cel, cleft, ctop;
function detectCoord(elem)
{
	cel=elem;
	cleft=cel.offsetLeft; 
	ctop=cel.offsetTop;
	while(cel=cel.offsetParent)
	{
		cleft+=parseInt(cel.offsetLeft);
		ctop+=parseInt(cel.offsetTop);
	}
}
unsafeWindow.dragbp=function(event)
{
	if(boxDragging)
	{
		if(event.clientY+window.scrollY>ctop&&event.clientY+window.scrollY<ctop+256)
		{
			document.getElementById('box_pointer').style.marginTop=(event.clientY-ctop+window.scrollY)-5+'px';
		}
		else if(event.clientY+window.scrollY<=ctop)
		{
			document.getElementById('box_pointer').style.marginTop='-5px';
		}
		else
		{
			document.getElementById('box_pointer').style.marginTop='250px';
		}
		if(event.clientX+window.scrollX>cleft&&event.clientX+window.scrollX<cleft+256)
		{
			document.getElementById('box_pointer').style.marginLeft=(event.clientX-cleft+window.scrollX)-5+'px';
		}
		else if(event.clientX+window.scrollX<=cleft)
		{
			document.getElementById('box_pointer').style.marginLeft='-5px';
		}
		else
		{
			document.getElementById('box_pointer').style.marginLeft='250px';
		}
		paintPrevs();
	}
	else if(hueDragging)
	{
		if(event.clientY+window.scrollY>ctop&&event.clientY+window.scrollY<ctop+256)
		{
			huecor=event.clientY-ctop+window.scrollY;
			document.getElementById('hue_slider').style.marginTop=(huecor-2)+'px';
		}
		else if(event.clientY+window.scrollY<=ctop)
		{
			huecor=0
			document.getElementById('hue_slider').style.marginTop='-2px';
		}
		else
		{
			huecor=255
			document.getElementById('hue_slider').style.marginTop='253px';
		}
		
		if(huecor<42)
		{
			ro=255;
			go=0;
			bo=Math.round(255*(huecor/42));
		}
		else if(huecor>=42&&huecor<85)
		{
			ro=Math.round(255*((42-(huecor-42))/42));
			bo=255;
			go=0;
		}
		else if(huecor>=85&&huecor<121)
		{
			ro=0;
			bo=255;
			go=Math.round(255*((huecor-85)/42));
		}
		else if(huecor>=121&&huecor<172)
		{
			ro=0;
			bo=Math.round(255*((42-(huecor-121))/42));
			go=255;
		}
		else if(huecor>=172&&huecor<215)
		{
			ro=Math.round(255*((huecor-172)/42));
			bo=0;
			go=255;
		}
		else if(huecor>=215&&huecor<255)
		{
			ro=255;
			bo=0;
			go=Math.round(255*((42-(huecor-215))/42));
		}
		else if(huecor=255)
		{
			ro=255;
			go=0;
			bo=0;
		}
		document.getElementById('colorbox').style.backgroundColor='#'+toHex(ro)+toHex(go)+toHex(bo);
		paintPrevs();
	}
	else if(resize)
	{
		if(event.clientY+window.scrollY-5>ctop+65)
		{
			document.getElementById('html_prev_slider').style.top=event.clientY+window.scrollY-4+'px';
			document.getElementById('html_prev').style.height=event.clientY+window.scrollY-12-ctop+'px';
			writeCook('ph', event.clientY+window.scrollY-7-ctop);
		}
		else
		{
			document.getElementById('html_prev_slider').style.top=ctop+65+'px'
			document.getElementById('html_prev').style.height='57px';
			writeCook('ph', 57);
		}
	}
}
function paintPrevs()
{
	getcolor(parseInt(document.getElementById('box_pointer').style.marginLeft)+5, parseInt(document.getElementById('box_pointer').style.marginTop)+5);
	document.getElementById('preview').style.background=document.getElementById('palette_body').style.backgroundColor='#'+toHex(r)+toHex(g)+toHex(b);
	document.getElementById('preview_ws').style.background='#'+toHex(r).substr(0, 1)+toHex(g).substr(0, 1)+toHex(b).substr(0, 1);
	if(bsP)
	{
		document.getElementsByName('textcolor')[0].value='#'+toHex(r)+toHex(g)+toHex(b);
	}
}
var huecor=0;

var r=0, g=0, b=0, ro=255, go=0, bo=0;
function getcolor(x, y)
{
	r=Math.round(ro+((255-ro)*((255-x)/255)));
	g=Math.round(go+((255-go)*((255-x)/255)));
	b=Math.round(bo+((255-bo)*((255-x)/255)));
	
	r=Math.round(r*((255-y)/255));
	g=Math.round(g*((255-y)/255));
	b=Math.round(b*((255-y)/255));
}

function toHex(N)
{
	if (N==null) return "00";
	N=parseInt(N);
	if (N==0 || isNaN(N)) return "00";
	N=Math.max(0,N);
	N=Math.min(N,255);
	N=Math.round(N);
	return "0123456789ABCDEF".charAt((N-N%16)/16)+"0123456789ABCDEF".charAt(N%16);
}

var formtext=document.getElementsByName('post')[0];
function insertTags(text1,text2,j)
{

postScrol=document.getElementsByName('post')[0].scrollTop;
var formtext=document.getElementsByName('post')[0];
oldj=j;
if(j==0){text=text1;j=1}else{text=text2;j=0}
if(document.selection)
 {
 formtext.focus();
 sel=document.selection.createRange();
 if(sel.text.length>0){sel.text=text1+sel.text+text2;return oldj}else{sel.text=text;return j}
 formtext.focus();
 }
 else if(formtext.selectionStart || formtext.selectionStart=="0")
 {
 var startPos=formtext.selectionStart;
 var endPos=formtext.selectionEnd;
 var chaineTxt=formtext.value;
 if(startPos!=endPos)
 {
 	formtext.value=chaineTxt.substring(0,startPos)+text1+chaineTxt.substring(startPos,endPos)+text2+chaineTxt.substring(endPos,chaineTxt.length);formtext.focus();
	setTimeout('panPost()', 20);
 	refreshPrev();
	rememberActions();
 	return oldj;
 }
 else
 {
 	formtext.value=chaineTxt.substring(0,startPos)+text+chaineTxt.substring(endPos,chaineTxt.length);formtext.focus();
	setTimeout('panPost()', 20);
 	refreshPrev();
	rememberActions();
 	return j;
 }
} 
else	
{
	formtext.value+=text;
	setTimeout('panPost()', 20);
 	refreshPrev();
	rememberActions();
	return j;
}
	
}
function InsertNoDuobleBB(text)
{
none=insertTags(text,'',0);
}
var b=0, i=0, s=0, su=0, sb=0, pr=0, u=0, co=0, q=0, lnk=0;
var frm=document.getElementsByName('post')[0];
unsafeWindow.fontb=function(){	b=insertTags('<b>','</b>',b)}
unsafeWindow.fonti=function(){i=insertTags('<i>','</i>',i)}
unsafeWindow.fontsup=function(){su=insertTags('<sup>','</sup>',su)}
unsafeWindow.fontsub=function(){sb=insertTags('<sub>','</sub>',sb)}
unsafeWindow.fontpre=function(){pr=insertTags('<pre>','</pre>',pr)}
unsafeWindow.fonts=function(){s=insertTags('<s>','</s>',s)}
unsafeWindow.fontu=function(){u=insertTags('<u>','</u>',u)}
unsafeWindow.fontq=function(){q=insertTags('<q>','</q>',q)}
unsafeWindow.fontcol=function(){co=insertTags('<font color='+document.getElementsByName('textcolor')[0].value+'>','</font>',co)}
unsafeWindow.alink=function(){lnk=insertTags('<a href="'+document.getElementsByName('textlink')[0].value+'">','</a>',lnk)}

unsafeWindow.palHov=function(el){el.style.backgroundImage='url(http://i.piccy.info/i5/22/20/202022/col_hover.jpg)';}
unsafeWindow.palBlur=function(el){el.style.backgroundImage='url(http://i.piccy.info/i5/37/18/201837/col.jpg)';}
unsafeWindow.paletteToggle=function()
{
	if(document.getElementById('palette_body').style.display=='none')
	{				
		fitElement(document.getElementById('palette_tog'), document.getElementById('palette_body'));
		document.getElementById('palette_body').style.display='block';
	}
	else
	{
		document.getElementById('palette_body').style.display='none';
	}
}
var ddrange, ddstr, licomb, lirange;
unsafeWindow.desB=function(){dualdot('b');}
unsafeWindow.desU=function(){dualdot('u');}
unsafeWindow.desI=function(){dualdot('i');}
function dualdot(tag)
{
	if(document.getElementsByName('post')[0].selectionStart!=document.getElementsByName('post')[0].selectionEnd)
	{
		ddrange=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionStart, document.getElementsByName('post')[0].selectionEnd);
		ddstr=document.getElementsByName('post')[0].value.substring(0, document.getElementsByName('post')[0].selectionStart);
		for(i=0;i<ddrange.split('\n').length;i++)
		{
			if(ddrange.split('\n')[i].split(':').length>=2)
			{
				ddstr+='<'+tag+'>'+ddrange.split('\n')[i].split(':')[0]+'</'+tag+'>'+ddrange.split('\n')[i].substring(ddrange.split('\n')[i].split(':')[0].length, ddrange.split('\n')[i].length);
			}
			else
			{
				ddstr+=ddrange.split('\n')[i];
			}
			if(i<ddrange.split('\n').length-1)
			{
				ddstr+='\n';
			}
		}
		ddstr+=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionEnd, document.getElementsByName('post')[0].value.length);
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=ddstr;
		setTimeout('panPost()', 20);
		refreshPrev();
		rememberActions();
	}
}
unsafeWindow.ul=function(){lists('ul');}
unsafeWindow.ol=function(){lists('ol');}
function lists(lstyle)
{
	if(document.getElementsByName('post')[0].selectionStart!=document.getElementsByName('post')[0].selectionEnd)
	{	
		lirange=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionStart, document.getElementsByName('post')[0].selectionEnd);
		licomb=document.getElementsByName('post')[0].value.substring(0, document.getElementsByName('post')[0].selectionStart)+'<'+lstyle+'>\n';
		for(i=0;i<lirange.split('\n').length-1;i++)
		{
			licomb+='<li>'+lirange.split('\n')[i].substr(0, lirange.split('\n')[i].length)+'</li>\n';
		}
		licomb+='<li>'+lirange.split('\n')[i]+'</li>\n';
		licomb+='</'+lstyle+'>'+document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionEnd, document.getElementsByName('post')[0].value.length);
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=licomb;
		setTimeout('panPost()', 20);
		refreshPrev();
		rememberActions();
	}
}
unsafeWindow.cl=function(){customlist(document.getElementsByName('lstyleopt')[0].value);}
function customlist(sign)
{
	if(document.getElementsByName('post')[0].selectionStart!=document.getElementsByName('post')[0].selectionEnd)
	{
		lirange=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionStart, document.getElementsByName('post')[0].selectionEnd);
		licomb=document.getElementsByName('post')[0].value.substring(0, document.getElementsByName('post')[0].selectionStart);
		for(i=0;i<lirange.split('\n').length;i++)
		{
			licomb+=sign+lirange.split('\n')[i]+'\n';
		}
		licomb+=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionEnd, document.getElementsByName('post')[0].value.length);		
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=licomb;
		setTimeout('panPost()', 20);
		refreshPrev();
		rememberActions();
	}
}
unsafeWindow.clsFormatting=function()
{
	if(document.getElementsByName('post')[0].selectionStart!=document.getElementsByName('post')[0].selectionEnd)
	{
		lirange=document.getElementsByName('post')[0].value.substring(document.getElementsByName('post')[0].selectionStart, document.getElementsByName('post')[0].selectionEnd);
		postScrol=document.getElementsByName('post')[0].scrollTop;
		document.getElementsByName('post')[0].value=document.getElementsByName('post')[0].value.substr(0, document.getElementsByName('post')[0].selectionStart)+lirange.replace(/(<\/*\w+>)|(<\/*\w+\s\w+\=((\"?\#\w+\"?)|(\"[\W\w]+\"))\>)/g, '').replace(/\&lt\;/g, '<')+document.getElementsByName('post')[0].value.substr(document.getElementsByName('post')[0].selectionEnd);
		setTimeout('panPost()', 20);
		refreshPrev();
		rememberActions();
	}
}
var toPreviewStr, prevEnd;
unsafeWindow.refreshPrev=function()
{
	if(document.getElementById('html_prev').style.overflow!='hidden')
	{
		toPreviewStr=document.getElementsByName('post')[0].value.replace(/(\<font color=\W?)(\#?\w+)/g, '<font onclick="eyedrop(\'$2\')" style="cursor:help;" color=$2');
		prevEnd='';
		for(i=0;i<toPreviewStr.split('\n').length;i++)
		{
			prevEnd+=toPreviewStr.split('\n')[i]+'<br />';
		}
		document.getElementById('html_prev').innerHTML=prevEnd;
	}
}
function refreshPrev()
{
	if(document.getElementById('html_prev').style.overflow!='hidden')
	{
		toPreviewStr=document.getElementsByName('post')[0].value.replace(/(\<font color\=\"?)(\W?\w+)/g, '<font onclick="eyedrop(\'$2\')" style="cursor:help;" color="$2"');
		prevEnd='';
		for(i=0;i<toPreviewStr.split('\n').length;i++)
		{
			prevEnd+=toPreviewStr.split('\n')[i]+'<br />';
		}
		document.getElementById('html_prev').innerHTML=prevEnd;
	}
}
unsafeWindow.eyedrop=function(color)
{
	document.getElementsByName('textcolor')[0].value=color;
	unsafeWindow.rgbChange();
}
unsafeWindow.prevVisTog=function()
{
	if(document.getElementById('html_prev').style.overflow=='hidden')
	{
		document.getElementById('html_prev').style.overflow='auto';
		document.getElementById('html_prev').style.height=prevCurHeight;
		document.getElementById('html_prev_slider').style.display='block';
		unsafeWindow.htmlSliderPos();
		refreshPrev();
		writeCook('ph', parseInt(prevCurHeight));
	}
	else
	{
		document.getElementById('html_prev').style.overflow='hidden';
		document.getElementById('html_prev').style.height='17px';
		document.getElementById('html_prev_slider').style.display='none';
		document.getElementById('html_prev').innerHTML='<i>'+unescape('%20%u041A%u043B%u0438%u043A%u043D%u0438%u0442%u0435%2C%20%u0447%u0442%u043E%u0431%u044B%20%u0440%u0430%u0437%u0432%u0435%u0440%u043D%u0443%u0442%u044C')+'</i>';
		writeCook('ph', 0);
	}
	fitElement(document.getElementById('palette_tog'), document.getElementById('palette_body'));
}
unsafeWindow.panPost=function()
{
	document.getElementsByName('post')[0].scrollTop=postScrol;
}
function HexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function HexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function HexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


unsafeWindow.rgbChange=function() {

if(document.getElementsByName('textcolor')[0].value.substr(0, 1)!='#')
{
	document.getElementById('colordummy').style.backgroundColor=document.getElementsByName('textcolor')[0].value;
	var cs = window.getComputedStyle(document.getElementById('colordummy'), "");
	var RGB = new RGBobject(cs.getPropertyValue('background-color').split(',')[0].substr(4), cs.getPropertyValue('background-color').split(',')[1], cs.getPropertyValue('background-color').split(',')[2].substring(0, cs.getPropertyValue('background-color').split(',')[2].length-1));
}
else if(document.getElementsByName('textcolor')[0].value.length==7)
{
	var RGB = new RGBobject(HexToR(document.getElementsByName('textcolor')[0].value), HexToG(document.getElementsByName('textcolor')[0].value), HexToB(document.getElementsByName('textcolor')[0].value));
}

	var HSV = new HSVobject(0, 0, 0);
	RGB2HSV (RGB, HSV);
	huecor=254-Math.floor(HSV.h);
	
	if(huecor<42){
			ro=255;
			go=0;
			bo=Math.round(255*(huecor/42));
		}
		else if(huecor>=42&&huecor<85)
		{
			ro=Math.round(255*((42-(huecor-42))/42));
			bo=255;
			go=0;
		}
		else if(huecor>=85&&huecor<121)
		{
			ro=0;
			bo=255;
			go=Math.round(255*((huecor-85)/42));
		}
		else if(huecor>=121&&huecor<172)
		{
			ro=0;
			bo=Math.round(255*((42-(huecor-121))/42));
			go=255;
		}
		else if(huecor>=172&&huecor<215)
		{
			ro=Math.round(255*((huecor-172)/42));
			bo=0;
			go=255;
		}
		else if(huecor>=215&&huecor<255)
		{
			ro=255;
			bo=0;
			go=Math.round(255*((42-(huecor-215))/42));
		}
		else if(huecor>=255)
		{
			ro=255;
			go=0;
			bo=0;
		}
	
	document.getElementById('hue_slider').style.marginTop=(254-Math.floor(HSV.h))+'px';
	document.getElementById('box_pointer').style.marginTop=(250-Math.round(HSV.v))+'px';
	document.getElementById('box_pointer').style.marginLeft=Math.round(HSV.s)-5+'px';
	document.getElementById('colorbox').style.backgroundColor='#'+toHex(ro)+toHex(go)+toHex(bo);
	bsP=0;
	paintPrevs();
	bsP=1;
}
function HSVobject (hue, saturation, value) {
	// Object definition.
	this.h = hue; this.s = saturation; this.v = value;
	this.validate = function () {
		if (this.h <= 0) {this.h = 0;}
		if (this.s <= 0) {this.s = 0;}
		if (this.v <= 0) {this.v = 0;}
		if (this.h > 360) {this.h = 360;}
		if (this.s > 100) {this.s = 100;}
		if (this.v > 100) {this.v = 100;}
	};
}

function RGBobject (red, green, blue) {
	// Object definition.
	this.r = red; this.g = green; this.b = blue;
	this.validate = function () {
		if (this.r <= 0) {this.r = 0;}
		if (this.g <= 0) {this.g = 0;}
		if (this.b <= 0) {this.b = 0;}
		if (this.r > 255) {this.r = 255;}
		if (this.g > 255) {this.g = 255;}
		if (this.b > 255) {this.b = 255;}
	};
}
function RGB2HSV (RGB, HSV) {
	r = RGB.r / 255; g = RGB.g / 255; b = RGB.b / 255; // Scale to unity.

	var minVal = Math.min(r, g, b);
	var maxVal = Math.max(r, g, b);
	var delta = maxVal - minVal;

	HSV.v = maxVal;

	if (delta == 0) {
		HSV.h = 0;
		HSV.s = 0;
	} else {
		HSV.s = delta / maxVal;
		var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
		var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
		var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

		if (r == maxVal) {HSV.h = del_B - del_G;}
		else if (g == maxVal) {HSV.h = (1 / 3) + del_R - del_B;}
		else if (b == maxVal) {HSV.h = (2 / 3) + del_G - del_R;}
		
		if (HSV.h < 0) {HSV.h += 1;}
		if (HSV.h > 1) {HSV.h -= 1;}
	}
	HSV.h *= 255;
	HSV.s *= 255;
	HSV.v *= 255;
}