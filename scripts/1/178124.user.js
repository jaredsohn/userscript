// ==UserScript==
// @name        BBCode Toolbar
// @namespace   vnsharing
// @include     http://vnsharing.net/forum/*
// @description A small tool for VNS bbcoders.
// @version     1
// ==/UserScript==

// creat style
var bbStyle=document.createElement('style');
bbStyle.type='text/css';
bbStyle.innerHTML=GM_getValue('customCSS');
document.getElementsByTagName('head')[0].appendChild(bbStyle);
// creat Toolbar
var bbToolbar=document.createElement('div');
document.getElementById('vB_Editor_001_controls').appendChild(bbToolbar);
bbToolbar.id='bbToolbar';
// creat edit button
var btnEdit=document.createElement('input');
bbToolbar.appendChild(btnEdit);
btnEdit.type='button';
btnEdit.value='Configuration';
btnEdit.className='bbButton';
btnEdit.id='btnEdit';
btnEdit.onclick=dataEditorToggle;
// edit GM value
var dataEditor=document.createElement('div');
dataEditor.id='dataEditor';
document.body.appendChild(dataEditor);
dataEditor.style.display='none';
dataEditor.innerHTML='<div><input id="eclose" value="Close" type="button" class="button"><input id="esave" value="Save" type="button" class="button"><input id="edefault" value="Default settings" type="button" class="button"><textarea id="dataValue" placeholder="Insert bbcode templates here"></textarea><textarea id="customCSS" placeholder="Insert custom CSS here"></textarea></div>';
document.getElementById('eclose').onclick=dataEditorToggle;
document.getElementById('esave').onclick=dataEditorSave;
document.getElementById('edefault').onclick=dataEditorDefault;
function dataEditorToggle(){
document.getElementById('dataValue').value=GM_getValue('templates','');
document.getElementById('customCSS').value=GM_getValue('customCSS','');
dataEditor.style.display=(dataEditor.style.display!='none'?'none':'block');
}
function dataEditorSave(){
GM_setValue('templates',document.getElementById('dataValue').value);
GM_setValue('customCSS',document.getElementById('customCSS').value);
bbStyle.innerHTML=GM_getValue('customCSS');
}
function dataEditorDefault(){
var defaultTemplates='s~[s]~[/s]~0~.\ncolor~[color=#]~[/color]~8~FF0000.\njustify~[justify]~[/justify]~0~.\ntable3~[table3]\n{|\n|~\n|}\n[/table3]~0~.\nbox~[box=|transparent|||]~[/box]~5~transparent.\nmargin~[margin=]~[/margin]~8~970.\nnoparse~[noparse]~[/noparse]~0~.\nclear~[clear]~[/clear]~0~.\nlimit~[limit=]~[/limit]~7~400.\nlimitr~[limitr=]~[/limitr]~8~400.\nanchor~[anchor=#]~[/anchor]~9~moc_1.\nmoc~[moc=]~[/moc]~5~moc_1.\nfont2~[font2=]~[/font2]~7~id|vf-fashion_i&s=25.\nbgcolor2~[bgcolor2=#]~[/bgcolor2]~11~58AD17|800|2.\nszimg~[szimg=]~[/szimg]~7~640|480.\ntip~[tip=link|~|tentip]\nnoi dung tip\n[/tip]~0~';
var defaultCustomCSS='/*\n\nFOR ADVANCED USERS ONLY!!\n\n*/\n\n#vB_Editor_QR{width:640px;margin:auto}\n#vB_Editor_QR+fieldset{margin:3px auto!important}\n.panel>div{width:auto!important;max-width:none!important}\n.panel>div>table{margin:auto}\n.panel>div>fieldset{width:600px;margin:auto}\ndiv.panel>div>div.smallfont{width:680px;margin:auto;float:none!important}\ndiv.panel>div>table.fieldset{width:680px}\n#vB_Editor_001_smiliebox{display:none}\n#vB_Editor_001_textarea{min-width:640px}\n#bbToolbar{padding:0 3px;position:relative;width:640px;}\n#btnEdit{position:absolute;left:340px;top:-50px;width:180px}\n#btnCheck{position:absolute;left:530px;top:-50px}\n#dataEditor{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.3);display:none}\n#dataEditor>div{background:#ECF0F1;padding:3px 8px 0px;width:800px;margin:70px auto;max-height:700px;overflow:auto}\n#dataValue{height:400px;max-height:450px;width:100%;box-sizing:border-box;-moz-box-sizing:border-box;margin-bottom:8px;resize:vertical;font-family:courier;font-size:14px}\n#customCSS{height:100px;max-height:450px;width:100%;box-sizing:border-box;-moz-box-sizing:border-box;resize:vertical; margin-bottom:8px;font-family:courier;font-size:14px}\n#esave,#eclose{float:right}\n#esave:active{background:navy}\n.bbButton{width:70px;background:#9C9C9C;float:left;color:white;font-size:14px;padding:0.2em;cursor:pointer;margin:3px;border:0}\ninput::-moz-focus-inner{border:0}\n.bbButton:hover{background:linear-gradient(to bottom,#a5cc52 5%,#b8e356 100%);color:#444}\n.bbButton:active{position:relative;top:1px}\n#btnPreview{float:right;margin-right:10px}\n#btnPreview:active{background:navy}';
GM_setValue('templates',defaultTemplates);
GM_setValue('customCSS',defaultCustomCSS);
bbStyle.innerHTML=defaultCustomCSS;
dataEditor.style.display='none';
}
// creat bbButton
var textarea=document.getElementById('vB_Editor_001_textarea');
var allBBcode=GM_getValue('templates').trim().split('\.\n');
for(i=0;i<allBBcode.length;i++){allBBcode[i]=allBBcode[i].split('~')}
for(i=0;i<allBBcode.length;i++){allBBcode[i]=new creatButton(allBBcode[i][0],allBBcode[i][1],allBBcode[i][2],Number(allBBcode[i][3]),allBBcode[i][4])}
for(i=0;i<allBBcode.length;i++){
	var creat=document.createElement('input');
	bbToolbar.appendChild(creat);
	creat.type='button';
	creat.value=allBBcode[i].name;
	creat.className='bbButton';
	creat.onclick=allBBcode[i].func.bind(allBBcode[i]);
}
function insert(str,pos,str2){
	str=str.substr(0,pos)+str2+str.substr(pos);
	return str;
}
function creatButton(name,prefix,suffix,inputStyle,defaultStyle){
	this.name=name;
	this.prefix=prefix;
	this.suffix=suffix;
	this.inputStyle=inputStyle;
	this.defaultStyle=defaultStyle;
	this.func=function(){		
		var bbcode=textarea.value;		
		var start=textarea.selectionStart;
		var end=textarea.selectionEnd;
		var x=defaultStyle;
		if(inputStyle!==0){x=prompt('Nhập giá trị mong muốn:',defaultStyle);if(x===null)return};
		bbcode=insert(bbcode,end,suffix);
		bbcode=insert(bbcode,start,insert(prefix,inputStyle,x));
		textarea.value=bbcode;
		textarea.selectionStart=start;
		textarea.selectionEnd=end+prefix.length+x.length+suffix.length;
		textarea.focus();
	}	
}

// ======================
var btnCheck=document.createElement('input');
bbToolbar.appendChild(btnCheck);
btnCheck.type='button';
btnCheck.value='Check';
btnCheck.className='bbButton';
btnCheck.id='btnCheck';
btnCheck.onclick=check;
function highlight(start,end){
	textarea.selectionStart=start;
	textarea.selectionEnd=end;
	textarea.focus();
}
function check(){

var library=[
// Highly frequently used	
	["[b]","[/b]"],
	["[color=","[/color]"],
	["[size=","[/size]"],
	["[left]","[/left]"],
	["[right]","[/right]"],
	["[center]","[/center]"],
	["[img]","[/img]"],
	["[limit=","[/limit]"],
	["[limitr=","[/limitr]"],
	["[margin=","[/margin]"],
	["[font2=","[/font2]"],
	["[url2","[/url2]"],
	["[url","[/url]"],
	["[tablestyle]","[/tablestyle]"],
	["[table3","[/table3]"],
	["[table2","[/table2]"],
	["[table","[/table]"],
	["[box=","[/box]"],
	["[quote","[/quote]"],
	["[justify]","[/justify]"],
	["[spoil=","[/spoil]"],
// Frequently used
	["[bgcolor2=","[/bgcolor2]"],
	["[bgcolor=","[/bgcolor]"],
	["[bgimg=","[/bgimg]"],		
	["[i]","[/i]"],
	["[font=","[/font]"],
	["[indent]","[/indent]"],
	["[anchor","[/anchor]"],
	["[clear]","[/clear]"],
	["[hover=","[/hover]"],
	["[imgleft]","[/imgleft]"],
	["[imgright]","[/imgright]"],
	["[moc=","[/moc]"],
	["[s]","[/s]"],
	["[szimg=","[/szimg]"],
	["[tabs]","[/tabs]"],
	["[tab=","[/tab]"],
	["[noparse]","[/noparse]"],
// Sometime	
	["[php]","[/php]"],
	["[youtube]","[/youtube]"],
	["[height=","[/height]"],
	["[list","[/list]"],
	["[u]","[/u]"],
	["[fade=","[/fade]"],
	["[flash]","[/flash]"],
	["[szyoutube","[/szyoutube]"],
	["[szflash=","[/szflash]"],
	["[space=","[/space]"],
	["[spacer=","[/spacer]"],
	["[rotate=","[/rotate]"],
	["[skew=","[/skew]"],
// Rarely
	["[td]","[/td]"],
	["[td2=","[/td2]"],
	["[tr]","[/tr]"],
	["[tr2=","[/tr2]"],
	["[highlight]","[/highlight]"],
	["[code]","[/code]"],
	["[html]","[/html]"],
	["[dice]","[/dice]"],
	["[media]","[/media]"],
	["[imgproxy]","[/imgproxy]"],
	["[issuu]","[/issuu]"],
	["[latex]","[/latex]"],
	["[minus]","[/minus]"]
	];
/*	
// Should be deprecated
	["[email","[/email]"],
	["[thread2=","[/thread2]"],
	["[thread","[/thread]"],
	["[post","[/post]"],
	["[attach]","[/attach]"],
	["[blog]","[/blog]"],
	["[fwt=","[/fwt]"],
	["[kine]","[/kine]"],
	["[maxup]","[/maxup]"],
	["[nico]","[/nico]"],
	["[rutube]","[/rutube]"],
	["[sapo]","[/sapo]"],
	["[tamtay]","[/tamtay]"],
	["[veoh]","[/veoh]"],
	["[viddler]","[/viddler]"],
	["[videobam]","[/videobam]"],
	["[vimeo]","[/vimeo]"]
	];	
*/

	var input=document.getElementById('vB_Editor_001_textarea').value.toLowerCase();
	var stream=[];
	input=input.replace(/\r?\n/gi,' ');
	input=input.replace(/\[noparse\].*?\[\/noparse\]/g,function(match){return new Array(match.length+1).join('♥');});
	input=input.replace(/\[php\].*?\[\/php\]/g,function(match){return new Array(match.length+1).join('♥');});
	for(i=0;i<input.length;i++){				
		if(input[i]!='[')continue;
		for(j=0;j<library.length;j++){
			var str1=library[j][0], str1Length=str1.length;
			var str2=input.substr(i,str1Length);
			if(str1==str2){
				stream.push([j,i]);
				break;	
				}					
			var str3=library[j][1], str3Length=str3.length;
			var str4=input.substr(i,str3Length);
			if(str3==str4){
				if(stream.length==0){
					highlight(i,i+str3Length);
					alert("Thừa đóng "+str3.toUpperCase());
					return;						
				}
				else if(j==stream[stream.length-1][0]){
					stream.splice(stream.length-1,1);
					break;	
				}	
				else{
					var checkpoint=1+input.indexOf("]",stream[stream.length-1][1]);
					highlight(checkpoint,i);
					var current="";	
					for(k=0;k<stream.length;k++){
						current=current.concat(library[stream[k][0]][1]+"\n").replace("/","").replace("]","").replace("[","- ").toUpperCase();
					}
					alert("Đang chờ đóng "+library[stream[stream.length-1][0]][1].toUpperCase()+" nhưng lại gặp "+str3.toUpperCase()+"\n\nCác code chưa được đóng là:\n"+current);
					return;	
				}						
			}					
		}
	}
	if(stream.length!=0){
		var lastStream=stream[stream.length-1];
		highlight(lastStream[1],lastStream[1]+library[lastStream[0]][0].length);
		var current2="";	
		for(k=0;k<stream.length;k++){
			current2=current2.concat(library[stream[k][0]][0]+"\n").replace("/","").replace("]","").replace("[","- ").toUpperCase();
		}
		alert("Các code sau vẫn chưa được đóng:\n"+current2);
		return;	
	}
	alert('Đã xong!');
}

