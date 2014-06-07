// ==UserScript==
// @name          Tianya
// @namespace  Tiabya@huhuhu
// @description   天涯屏蔽指定用户和只读楼主功能
// @version        0.0.1.8
// @author         huhuhu
// @include        http://*.tianya.cn/*forum/*html*
// @include        http://*.tianya.cn/*Forum/*html*
// @include        http://*.tianya.cn/tianyacity/Content/*html*
// @include        http://*.tianya.cn/tianyacity/content/*html*
// @exclude        http://*.tianya.cn/*/articleslist*
// @exclude        http://*.tianya.cn/*ListUserArticles.asp*
// ==/UserScript==
var namelist;
var chrAuthorName;
var number=0;
var nlist=new Array();
var winheight;
var onlyauthor=false;
var blacklist;
function getAuthor()
{
var f1=document.getElementsByTagName("input")
for(var i=0;i<f1.length;i++){if (f1[i].name=="chrAuthor") {chrAuthorName=f1[i].value;break;}}
}

function set(node){

//	nlist.push(chrAuthorName);
var	f=node.getElementsByTagName('a');            //给每一个项目添加新属性
var	reg=/http:\/\/my.tianya.cn\/(name|\d{5,})/;
var	reg1=/\/browse\//;
var	reg2=/^@/;
	for(var i=0;i<f.length;i++)                    
	{
	//if((reg.test(f[i].href)||reg1.test(f[i].href))&&(!reg2.test(f[i].text)))
	if((reg.test(f[i].href)||reg1.test(f[i].href))&&(f[i].text&&!reg2.test(f[i].text)))
	{
var	p=f[i].parentNode;
	while((p.localName!='TABLE')&&(p.localName!='table')&&(p.localName!='DIV')&&(p.localName!='div')){
	if(p.localName=='html'){break;}
	p=p.parentNode;
	}
//	if(p.localName!='html'){
	if(p.localName!='html'&&(!p.newid)){
var	pnext=p.nextElementSibling;
	if(pnext) pnext.setAttribute("newid",f[i].text);
//	alert(f[i].text);
	if(pnext) p.setAttribute("newid",f[i].text);
	    }
	}}	
	
	
	/////////////////////////////////////////////////////注释楼主项目
	
var	tablelist=node.getElementsByTagName('table');
	for(var i=0;i<tablelist.length;i++)
	{if (tablelist[i].getAttribute('newid')==chrAuthorName) tablelist[i].setAttribute('isauthor',1)
	}
var	divlist=node.getElementsByTagName('div');
	for(var i=0;i<divlist.length;i++)
	{if (divlist[i].getAttribute('newid')==chrAuthorName) divlist[i].setAttribute('isauthor',1);}
		
	node.setAttribute("isset",1);                //注释页面
	if(document.getElementById("firstAuthor")){
	var	authorl=document.getElementsByTagName("table");
	for(var i2=0;i2<authorl.length;i2++){
	if((authorl[i2].id=="firstAuthor")&&(!authorl[i2].newid)){
	//anode=document.getElementById("firstAuthor");      //注释第一个项目
	var anode=authorl[i2];
	var al=anode.getElementsByTagName('a');
	for(var ia=0;ia<al.length;ia++)
	{if(al[ia].hasAttribute("_userinfo")) {name=al[ia].text;}
	 else name=al[0];}
	
	anode.setAttribute("newid",name);
	anode.nextElementSibling.firstElementChild.setAttribute("newid",name);}
	if(anode.getAttribute("newid")==chrAuthorName){anode.setAttribute('isauthor',1);anode.nextElementSibling.firstElementChild.setAttribute('isauthor',1)}}
	}
		////////////////////////////////////////////////////////   获取用户名单
	if (document.getElementById('firstAuthor')){
	var firstuser=document.getElementById('firstAuthor').getAttribute('newid');
	{for(var s=0,has=0;s<nlist.length;s++){if(nlist[s]==firstuser) {has=1;break}}
	if(!has)
	{
	nlist.push(firstuser);has=0}
	}}

	for(var i=0,has=0;i<divlist.length;i++)
	{
	if(divlist[i].getAttribute('newid')) 
	{for(var s=0,has=0;s<nlist.length;s++){if(nlist[s]==divlist[i].getAttribute('newid')) {has=1;break}}
	if(!has)
	{
	nlist.push(divlist[i].getAttribute('newid'));has=0}
	}
	}
	if(!namelist){namelist=nlist;}
	else {namelist.concat(nlist);}
}

function setid()
{
var t=document.getElementsByTagName('div');                   //处理新页面
for(var i1=0;i1<t.length;i1++)
{
	if(((t[i1].id=="pContentDiv")&&(!t[i1].getAttribute('isset')))||(t[i1].id=="adsp_content_replybox_frame_1"))
	{

	set(t[i1]);
	}
	
}
}

function only_author()
{	
var	tablelist=document.getElementsByTagName("table");
var	divlist=document.getElementsByTagName("div");
	for(var i=0;i<tablelist.length;i++) {
	if(tablelist[i].getAttribute('newid')&&(!tablelist[i].getAttribute('isauthor'))) tablelist[i].style.display="none";}
	for(var i=0;i<divlist.length;i++) {
	if(divlist[i].getAttribute('newid')&&(!divlist[i].getAttribute('isauthor'))) divlist[i].style.display="none";}
	r_only_author();
	winheight=document.body.offsetHeight;
	onlyauthor=true;
	GM_setValue ("only_mode",1); 
}
function show_all()
{	tablelist=document.getElementsByTagName("table");
	divlist=document.getElementsByTagName("div");
	for(var i=0;i<tablelist.length;i++) {
	if(tablelist[i].getAttribute('newid')) tablelist[i].style.display="block";}
	for(var i=0;i<divlist.length;i++) {
	if(divlist[i].getAttribute('newid')) divlist[i].style.display="block";}
	r_show_all();
	winheight=document.body.offsetHeight;
	onlyauthor=false;
	GM_setValue ("only_mode",0);
}

function hidden_user(name){
var	tablelist=document.getElementsByTagName("table");
var	divlist=document.getElementsByTagName("div");
	for(var i=0;i<tablelist.length;i++) {
	if(tablelist[i].getAttribute('newid')==name) tablelist[i].style.display="none";}
	for(var i=0;i<divlist.length;i++) {
	if(divlist[i].getAttribute('newid')==name) divlist[i].style.display="none";}
	winheight=document.body.offsetHeight;
}
function show_user(name){
var	tablelist=document.getElementsByTagName("table");
var	divlist=document.getElementsByTagName("div");
	for(var i=0;i<tablelist.length;i++) {
	if(tablelist[i].getAttribute('newid')==name) tablelist[i].style.display="block";}
	for(var i=0;i<divlist.length;i++) {
	if(divlist[i].getAttribute('newid')==name) divlist[i].style.display="block";}
	winheight=document.body.offsetHeight;
}
function r_only_author(){
var a_list=document.getElementById("styid").childNodes;
for(var i=1;i<a_list.length;i++){
a_list[i].title="显示此用户";a_list[i].style.color="Silver";}
}
function r_show_all(){
var a_list=document.getElementById("styid").childNodes;
for(var i=0;i<a_list.length;i++){
a_list[i].title="屏蔽此用户";a_list[i].style.color="black";}
}
		


function onclick_1(){                       //显示列表
	if(head_h.title=="隐藏列表"){
	head_h.innerHTML="列表";
	head_h.title="显示列表";
	r();
	}
	else{
	head_h.innerHTML="隐藏";
	head_h.title="隐藏列表";
	j();
	}
	}
function onclick_2(){                   //只看楼主
	if(head_s.title=="显示全部"){
	head_s.innerHTML="楼主";
	head_s.title="只看楼主";
	show_all();
	}
	else{
	head_s.innerHTML="全部";
	head_s.title="显示全部";
	
	only_author();
	}
 
	}
function r() {
	document.getElementById('styid').style.visibility = "hidden";
	document.getElementById('favid').style.visibility = "hidden";
	document.getElementById('styid').style.display = "none";
	document.getElementById('favid').style.display = "none";
		}
function j() {
    document.getElementById('styid').style.visibility = "visible";
	document.getElementById('favid').style.visibility = "visible";
	document.getElementById('styid').style.display = "block";
	document.getElementById('favid').style.display = "block";
	}
/* function r() {
    document.getElementById('styid').style.visibility = "hidden";
	document.getElementById('favid').style.visibility = "hidden";
		}
function j() {
    document.getElementById('styid').style.visibility = "visible";
	document.getElementById('favid').style.visibility = "visible";
	} */
	function addGlobalStyle(css,id) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.id =id; 
	style.innerHTML = css;
	head.appendChild(style);}
	
function onclick_user(e){
///////////////////////////////////////
	if(e.ctrlKey){onclick_addblacklist(e)}
///////////////////////////////////////
	if(e.target.style.color=='black'){hidden_user(e.target.text);e.target.style.color="Silver";e.target.title="显示此用户";}
	else 
		{show_user(e.target.text);e.target.style.color="black";e.target.title="屏蔽此用户";}
		}
function onclick_addblacklist(e){
	var name=e.target.text;
	var blacklist=new Array();
	if(GM_getValue('blist')){
	blacklist=JSON.parse(GM_getValue('blist'));
	}
	if(blacklist.length==0){blacklist.push(name);GM_setValue("blist",JSON.stringify(blacklist));alert("该用户已加入黑名单！");return;}
	else{
	for(var i=0;i<blacklist.length;i++){
	if(blacklist[i]==name) break;
	}
	if (i==blacklist.length){blacklist.push(name);GM_setValue("blist",JSON.stringify(blacklist));alert("该用户已加入黑名单！")}
	}
}
function onclick_addfav() {
	var update=0;	
	var favlist=new Array();
	var link=document.baseURI;
	var title=document.getElementById('adsp_content_title_banner_left').nextElementSibling.textContent;
//	var node={"title":title,"link":link}
	var scroll_Y=document.documentElement.scrollTop;
	var node={"title":title,"link":link,"scroll_Y":scroll_Y}
	
	function add_favlist(node){
var	fr = document.createElement("tr");
var    f = document.createElement("a");		

	f.href=node.link;

	f.appendChild(document.createTextNode(node.title));
	f.style.color="blue";
var	fa = document.createElement("td");
var	text=document.createTextNode("删除");
	fa.appendChild(text);
	fa.addEventListener("click",onclick_del,false);
	fr.appendChild(f);
	fr.appendChild(fa);
    head_favlist.appendChild(fr);}
		
	if(GM_getValue("fav")){
	favlist=JSON.parse(GM_getValue('fav'));
	}		
		
	if (favlist.length==0){favlist.push(node);GM_setValue("fav",JSON.stringify(favlist));add_favlist(node);alert("加入书签");return;}
	else{
	for(var i=0;i<favlist.length;i++){
//	alert('favlist[i].title: '+favlist[i].title+'  title:'+title+' favlist[i].scroll_Y: '+favlist[i].scroll_Y+' scroll_Y:  '+scroll_Y+' favlist[i].link: '+favlist[i].link+' link: '+link);
	if(favlist[i].title==title){
	if((favlist[i].scroll_Y!=scroll_Y)||(favlist[i].link!=link)){
	favlist[i].scroll_Y=scroll_Y;
	favlist[i].link=link;
	update=1;
	} 
	else {break;}
	}
	}
//	alert('update:= '+update+'   i:='+i+'     favlist.length'+favlist.length);
	if(i==favlist.length){
	if(!update){favlist.push(node);GM_setValue("fav",JSON.stringify(favlist));add_favlist(node);alert("加入书签");}
	else{GM_setValue("fav",JSON.stringify(favlist));alert("更新书签");}
	}
//	else{favlist.push(node);GM_setValue("fav",JSON.stringify(favlist));add_favlist(node);alert("加入书签");}
	return;
	}
}
	
function onclick_del(e) {
var favlist=new Array();
if(GM_getValue("fav")) favlist=JSON.parse(GM_getValue('fav'));
var fr=e.target.parentNode;fr.parentNode.removeChild(fr);
var link=e.target.previousElementSibling.href;
for(var i=0;i<favlist.length;i++){
if(favlist[i].link==link){favlist.splice(i,1);GM_setValue("fav",JSON.stringify(favlist));break}}
}
function check_blacklist(){
	var blacklist=new Array();
	if(GM_getValue('blist')){
	blacklist=JSON.parse(GM_getValue('blist'));
	}
	if (blacklist.length==0){return;}
	else{
		for(var i=0;i<blacklist.length;i++){
		for(var n=0;n<namelist.length;n++){
		if(blacklist[i]==namelist[n]){hidden_user(blacklist[i])}
		}
		}
		}
	
}

function first(){
getAuthor();
nlist.push(chrAuthorName);
var css="#styid{z-index:1001;width:200px;display:block;visibility:hidden;display:none;background:#fff;padding:0px 0 0px 0px;text-align:left;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;box-shadow:2px 2px 3px #777;-moz-box-shadow:2px 2px 3px #777;-webkit-box-shadow:2px 2px 3px #777;}#styid a{display:block;float:left;margin:0;width:170px;border:none;padding:8px 0 8px 6px;background:#fff;color:black;text-decoration:none;font:normal normal normal 14px/100% Microsoft Yahei;letter-spacing:normal;word-spacing:normal;cursor:pointer}#styid a:hover{background:#a0a0a0;color:white;border:none;text-decoration:none;font:normal normal normal 12px/100% Microsoft Yahei;letter-spacing:normal;word-spacing:normal;}#favid td{cursor: pointer;color:blue}";
var cssfav=css.replace(/#styid/ig,"#favid");
	cssfav=cssfav.replace(/visibility:hidden;/,"");
	addGlobalStyle(css,"styleid");
	addGlobalStyle(cssfav,"favstyid");
	w=document.createElement("div");
	head = document.createElement("tr");
	mh="position: fixed; visibility: visible; left: 10px; top: 0pt;";
	w.setAttribute('style',mh);
	document.getElementsByTagName("body")[0].appendChild(w);
	w.appendChild(head);
	m_1="display: block; float: left; color: black; letter-spacing: normal; cursor: pointer; font: 12px/100% Microsoft Yahei; padding: 1px; width: 35px;color:blue";
	
	head_h = document.createElement("div");
	head_h.setAttribute('style',m_1);
	head_h.innerHTML="列表";
	head_h.title="显示列表";
	head_h.addEventListener("click", onclick_1,false);
	head.appendChild(head_h);
	head.appendChild(head_h);
	head_s=document.createElement("div");
	head_s.setAttribute('style',m_1);
	head_s.innerHTML="楼主";
	head_s.title="只看楼主";
	head_s.addEventListener("click", onclick_2,false);
	head.appendChild(head_s);
/////////////////////////////////////////////////
	var favlist=new Array();
	if(GM_getValue("fav")) favlist=JSON.parse(GM_getValue('fav'));	
	head_fav = document.createElement("div");
	head_fav.setAttribute('style',m_1);
	head_fav.title="添加收藏";
	head_fav.innerHTML="&#9829";
	head_fav.addEventListener("click",onclick_addfav,false);
	head.appendChild(head_fav);
	head_favlist= document.createElement("div");
	head_favlist.setAttribute("id", "favid");
	m_fav="position: fixed; right: 15px; top: 10pt;visibility:hidden;";
	head_favlist.setAttribute('style',m_fav);
	fr = document.createElement("tr");
	fr.appendChild(document.createTextNode("书签"))
	head_favlist.appendChild(fr);
	document.getElementsByTagName("body")[0].appendChild(head_favlist);
	if(favlist){
	for (var o =0; o <favlist.length; o++) {
		fr = document.createElement("tr");
        f = document.createElement("a");		
		f.href=favlist[o].link;
		f.appendChild(document.createTextNode(favlist[o].title));
		f.style.color="black";
		fa = document.createElement("td");
		text=document.createTextNode("删除");
		fa.appendChild(text);
		fa.addEventListener("click",onclick_del,false);
		fr.appendChild(f);
		fr.appendChild(fa);
        head_favlist.appendChild(fr);}}
/////////////////////////////////////////////////	
	b = document.createElement("tr");
	b.setAttribute("id", "styid");
	w.appendChild(b);
	getAuthor();
	}
function addpage(){
	setid();
	if (namelist.length>24){b.style.overflow = "scroll";b.style.height = "650px"}
	for (var o = number; o < namelist.length; o++) {
        e = document.createElement("a");
		e.appendChild(document.createTextNode(namelist[o]));
		e.title="屏蔽此用户";
		e.style.color="black";
		e.addEventListener("click",onclick_user,true);
        b.appendChild(e);}
		number=namelist.length;
		if (onlyauthor) {only_author()}
		
}
function test(){
if(winheight==document.body.offsetHeight){return}
window.removeEventListener('scroll', test,false);
addpage();
winheight=document.body.offsetHeight;
window.addEventListener('scroll', test,false);
}

function rdo(){
	if(GM_getValue("fav")){
	var mark=JSON.parse(GM_getValue('fav'));
	for(var i=0;i<mark.length;i++){if (document.URL==mark[i].link){window.scrollTo(0,mark[i].scroll_Y);break;}}}
	winheight=document.body.offsetHeight;
	first();
	addpage();
	if(GM_getValue("only_mode")){onclick_2();}
	check_blacklist();
	window.addEventListener('scroll', test,false)
	}
rdo();