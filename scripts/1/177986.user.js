// ==UserScript==
// @name 4chan [s4s] colored text
// @description For funposting on [s4s]
// @include *//boards.4chan.org/s4s/*
// @updateURL http://userscripts.org/scripts/source/177986.user.js
// ==/UserScript==
postmass=document.getElementsByClassName('postContainer')
postmes=document.getElementsByClassName('postMessage')
for(i=0;i<postmes.length;i++){
if(postmass[i].getElementsByClassName('name')[0].innerHTML.toLowerCase()=='kek'){
	postmes[i].setAttribute('class',postmes[i].getAttribute('class')+' papyrus')
}
postmessy=postmes[i].innerHTML.replace('<span class="fortune"','<br><span class="fortune"')
checkora=postmessy.split('<br>')
for(j=0;j<checkora.length;j++){
	temp=checkora[j].replace('\n','')
	if(temp.length-temp.lastIndexOf('&lt;')==4&&temp.indexOf('&lt;')!=-1){
		checkora[j]='<span style="color:orange">'+checkora[j]+'</span>'
	}
	if(temp.length-temp.lastIndexOf('&gt;')==4&&temp.indexOf('&gt;')!=-1){
		checkora[j]='<span style="color:pink">'+checkora[j]+'</span>'
	}
	if(temp.indexOf('&lt;')==0){
		checkora[j]='<span style="color:red">'+checkora[j]+'</span>'
	}
	if(temp.length-temp.lastIndexOf(')')==1&&temp.indexOf(')')!=-1&&temp.indexOf('(')==0){
		checkora[j]='<span style="color:red;font-weight:bold">'+checkora[j]+'</span>'
	}
	if(temp.length-temp.lastIndexOf(' ]')==2&&temp.indexOf(' ]')!=-1&&temp.indexOf('[ ')==0){
		checkora[j]='<span style="color:blue;font-family:monospace;font-weight:bold">'+checkora[j]+'</span>'
	}
	if(temp.length-temp.lastIndexOf(' }')==2&&temp.indexOf(' }')!=-1&&temp.indexOf('{ ')==0){
		checkora[j]='<span style="color:purple;font-family:monospace;font-weight:bold">'+checkora[j]+'</span>'
	}
	if(temp.indexOf('[spoiler]')+1&&temp.indexOf('[/spoiler]')&&(temp.indexOf('[spoiler]')<temp.indexOf('[/spoiler]'))){
		checkora[j]=checkora[j].replace('[spoiler]','<span class="spoiler">')
		checkora[j]=checkora[j].replace('[/spoiler]','</span>')
	}
}
checkorb=checkora.join('<br>').replace('<br><span class="fortune"','<span class="fortune"')
postmes[i].innerHTML=checkorb
}
document.head.appendChild(newcss=document.createElement('style'))
newcss.innerHTML='@font-face{font-family:Papyrus;src:local(Papyrus),url(\'http://www.stben.net/fonts/papyrus.woff\') format(\'woff\')}.papyrus{font-family:Papyrus!important}'
