// ==UserScript==
// @name           OMMangaKeeper
// @namespace      One Manga List Updater
// @description    Helps you remeber the manga your reading
// @include        http://onemanga.com/Tubutas/MyManga/
// @include        http://onemanga.com/*
// @include        http://onemanga.com/*/*/*/
// @include        http://beta.onemanga.com/*
// @include        http://beta.onemanga.com/*/*/*/
//@author          Tubutas
// ==/UserScript=='
var MAIN_BREAK="retr234ehrgeA#";
var SUB_BREAK="retr353hr3g!eA#";
if(document.location.href=="http://www.onemanga.com/Tubutas/MyManga/"){
	document.title="My Manga | One Manga"
	var wrapper=getElementsByClass('wrapper')[0];
	var text="						\
	<h1>My Manga</h1>				\
	<table class=ch-table>			\
		<tbody>						\
			<tr>					\
				<th>Manga</th>		\
				<th>Chapter</th>	\
				<th>Page</th>		\
				<th>Delete</th>		\
			</tr>					\
	";
	var Mangas=GM_getValue("Mangas","");
	Mangas=Mangas.split(MAIN_BREAK);
	var alt=1;
	for(var i=0;i<Mangas.length;i++){
		if(Mangas[i][1]===null)break;
		var Manga=Mangas[i].split(SUB_BREAK);
		alt=Math.abs(alt-1);
		text+="<tr class=bg0"+(alt+1)+"><td><a target=blank href='http://www.onemanga.com/"+Manga[0]+"/"+Manga[1]+"/"+Manga[2]+"/'>"+Manga[0]+"</td><td>"+Manga[1]+"</td><td>"+Manga[2]+"</td>";
		text+="<td><a class='00"+i+"'>[x]</a></tr></td>";
	}
	text+="							\
		</tbody>					\
	</table>						\
	";
	wrapper.innerHTML=text;
	wrapper.addEventListener("click",handleClick,false);
}else if(document.getElementById('adv-search')){
	var adv_search=document.getElementById('adv-search');
	adv_search.innerHTML="<a href='http://www.onemanga.com/Tubutas/MyManga/'><b>My Manga</b></a> - "+adv_search.innerHTML;
}else{
	var base="http://www.onemanga.com/";
	var url=document.location.href;
	var Manga=[];
	Manga[0]=url.substring(base.length,url.indexOf('/',base.length));
	Manga[1]=url.substring(base.length+Manga[0].length+1,url.indexOf('/',base.length+Manga[0].length+1));
	Manga[2]=url.substring(base.length+Manga[0].length+Manga[1].length+2,url.length-1);
	if(!parseInt(Manga[1])||!parseInt(Manga[2]))return
	var Mangas=GM_getValue("Mangas","");
	var Mangas=Mangas.split(MAIN_BREAK);
	var BREAK=0;
	for(var i=0;i<Mangas.length;i++){
		var _Manga=Mangas[i].split(SUB_BREAK);
		if(_Manga[0]==Manga[0]){
			if(parseInt(_Manga[1])>=parseInt(Manga[1])&&parseInt(_Manga[2])>=parseInt(Manga[2]))return;
			else{
				Mangas[i]=Manga.join(SUB_BREAK);
				BREAK=1;
				break;
			}
		}
			
	}
	if(!BREAK){
		Mangas[Mangas.length]=Manga.join(SUB_BREAK);
	}
	Mangas=Mangas.join(MAIN_BREAK);
	GM_setValue("Mangas",Mangas);
}
function handleClick(event){
	if(parseInt(event.target.className)>=0)remove(parseInt(event.target.className));
}
function remove(a){
	if(!confirm("Are you sure you want to delete this entry?"))return
	var Mangas=GM_getValue("Mangas","");
	Mangas=Mangas.split(MAIN_BREAK);
	Mangas.splice(a,1);
	Mangas=Mangas.join(MAIN_BREAK);
	GM_setValue("Mangas",Mangas);
	window.location.reload();
}
function getElementsByClass(searchClass,node,tag) {
	var classElements = [];
	if (node == null)node = document;
	if (tag == null)tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}