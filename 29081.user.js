// ==UserScript==
// @name           autopoke schulerprofile
// @namespace      jupe.yweb.sk
// @include        http://*.schuelerprofile.de/*
// ==/UserScript==




var tukanie=0;
var t;
var liblock;
var liblock2;
var ulko="null";
var text;
var text2;
var ablock;
var ablock2;
var t2;
var t3;
var t4;
var id_meno2;
var count=0;
var id_meno;
var name;
var names=new Array();
var pokes=new Array();
var hrefs=new Array();
var tab;
 

function process(){
	tukanie=1;
	GM_setValue("tukanie", tukanie);
	set_button();
}

function processoff(){
	tukanie=0;
	GM_setValue("tukanie", tukanie);
	set_button();
}

function ajaxRequest(url, method, param, onSuccess, onFailure){
	//GM_log("request : "+url);
	var xmlHttpRequest = new XMLHttpRequest();

	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
		else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
	};
	xmlHttpRequest.open(method, url, true);

	if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.send(param);
	}

function nothing(){
}

function xxx(){
	//alert('skuska');
}

function set_button(){
	//alert("HLADAM");

	var hcka=document.getElementsByTagName("a");
	for(x=1;x<hcka.length;x++){
	//alert(hcka[x].firstChild.nodeValue);
	if(hcka[x].firstChild.nodeValue!=null)
	if(hcka[x].firstChild.nodeValue.split(" ", 3)[1]=="Anstupser") 

	{
		//alert("ok");

		tukanie=GM_getValue("tukanie", 0);
		

		var divka=hcka[x].parentNode.parentNode;
		if(ulko!="null"){
			if(tukanie==1)ablock.removeEventListener('click',process, false);
			if(tukanie==0)ablock.removeEventListener('click',processoff, false);
			ablock2.removeEventListener('mouseover',createTab, false);
			ablock2.removeEventListener('mouseout',delTab, false);
			ulko.removeChild(liblock);
			ulko.removeChild(liblock2);
		}

		ulko=divka;
		
		
		liblock=document.createElement("li");
		liblock.setAttribute("id", "tukanie");
		ablock=document.createElement("a");

		liblock2=document.createElement("li");
		ablock2=document.createElement("a");
		ablock2.setAttribute("id", "tuknutych");		
		text2=document.createTextNode("poked "+count);


		if(tukanie==0){
			text=document.createTextNode("start poking");
			ablock.addEventListener('click',process, false);
		}
		else{
			text=document.createTextNode("stop poking");
			ablock.addEventListener('click',processoff, false);
		}


		ablock.appendChild(text);
		liblock.appendChild(ablock);
		ulko.appendChild(liblock);

		ablock2.appendChild(text2);
		ablock2.addEventListener('mouseover',createTab, false);
		ablock2.addEventListener('mouseout',delTab, false);
		liblock2.appendChild(ablock2);
		ulko.appendChild(liblock2);
		
	}}
}





function handleServerResponse(httpRequest){
	httpResponse = httpRequest.responseText;	
	if(!httpResponse) {
		GM_log("chyba v prenose");
	}
	else{
//////////////////////////////////////////////////////////////
		var parts=httpResponse.split("http://www.schuelerprofile.de/poke/delete/nickname/",2);
			
		if(parts[1]){	

		var id_meno_pomocna=parts[1].split('">',2);
		name=id_meno_pomocna[0];	
		//alert(name);
		//alert('http://www.schuelerprofile.de/poke/' +  name);
		//ajaxRequest( 'http://www.unister.sk/Poke,delete,ViewHome.htm?'+id_meno2[0],'GET',null,nothing,function(){;});
		ajaxRequest( 'http://www.schuelerprofile.de/poke/'+ name,'GET',null,handleServerResponse2,function(){;});
		}
		else{
		//GM_log("niesy tuknuty");
		}
	}		
}


function handleServerResponse2(httpRequest){

	httpResponse = httpRequest.responseText;
	//GM_log(httpResponse);	
	if(!httpResponse) {
		GM_log("chyba v prenose");
	}
	else{
		var parts=httpResponse.split("wurde angestupst",2);
		
		if(parts[1]){
			//GM_log("tuknute");
			addName();
			//GM_log(names.toString()+" "+pokes.toString());
			document.getElementById("tuknutych").removeChild(text2);
			text2=document.createTextNode("poked "+ count);
			document.getElementById("tuknutych").appendChild(text2);

		}
		else{
			//GM_log("netuknute");
			//ajaxRequest( 'http://www.schuelerprofile.de/poke/delete/nickname/'+ name,'GET',null,nothing,function(){;}); 
		}
	}			
}

function getName(response,meno){
	var response2=response.split("http://www.unister.sk/Poke,deleteAll,ViewHome.htm",2);
	var meno2=meno.split('&amp;answerPoke=1',2);
	var response3=response2[1].split('http://www.unister.sk/Profile,profileMemberTo,ViewHome,1.htm?'+ meno2[0] +'">',2);
	var meno3=response3[1].split('</a>',1);
	return meno3[0];
}

function addName(){
	count++;
	for(i=0;i<names.length;i++){
		if(names[i]==name){
			pokes[i]=pokes[i]+1;
			return;
		}
	}
	names.push(name);
	pokes.push(1);
	hrefs.push("http://www.schuelerprofile.de/profile/"+ name);
	return;	
}

function createTab(){
		
		var br=new Array(names.length);
		var br2=new Array(names.length);
		var meno_a=new Array(names.length);
		var count_div=new Array(names.length);
		var meno_text=new Array(names.length);
		var count_text=new Array(names.length);
		if(document.getElementById('tab'))
			document.getElementById('tab').parentNode.removeChild(tab);
		tab=document.createElement("div");
		
		tab.setAttribute("id", "tab");
		tab.setAttribute("style", "top: 40px; left: 265px;  width: 171px; position: absolute;  color:#FFF; background:#FFFFFF; display:block; border:1px solid #2283c7; padding:10px 10px; z-index:100; ");
		tab.addEventListener('mouseover',function() {clearTimeout(t4);}, false);
		tab.addEventListener('mouseout',delTab, false);
		for(i=0;i<names.length;i++){
			meno_a[i]=document.createElement("a");
			meno_a[i].setAttribute("style", " position: absolute; left: 5px; width: 80%; ");
			meno_a[i].setAttribute("href",hrefs[i]);
			meno_text[i]=document.createTextNode(names[i]);
			meno_a[i].appendChild(meno_text[i]);
			count_div[i]=document.createElement("div");
			count_div[i].setAttribute("style", " position: absolute;   right: 5px;   width: 17%;   text-align: right;  color:black; solid #000000; ");
			count_text[i]=document.createTextNode(pokes[i]);
			count_div[i].appendChild(count_text[i]);
			br[i]=document.createElement("br");
			br2[i]=document.createElement("br");
			tab.appendChild(meno_a[i]);
			tab.appendChild(count_div[i]);
			tab.appendChild(br[i]);
			tab.appendChild(br2[i]);
		}
		document.getElementById('cntIn').appendChild(tab);
		
	
}

function delTab(){
	t4=setTimeout(function(){document.getElementById('tab').parentNode.removeChild(tab);},2000);
}

function pocitadlo(){
	
	restart=GM_getValue("restart",true);
	if (restart){
		GM_setValue("restart", false);
		alert("Counter won't be restarted.");
	}
	else {
		GM_setValue("restart", true);
		alert("Counter will be restarted.");

	}
	
}


function htmlentities(s){
    // Convert all applicable characters to HTML entities
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_htmlentities/
    // +       version: 801.1018
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'

    var div = document.createElement('div');
    var text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}

function log(){
	GM_log(tukanie)
}

function pokus(){
	if (tukanie==1){
		//GM_log(tukanie);
		//hlavna_funkcia();

		ajaxRequest('http://www.schuelerprofile.de/poke/continue','GET',null,handleServerResponse,function(){;});
	}
}

function unister_onLoad(){

	GM_registerMenuCommand("Restart of counter ON/OFF", pocitadlo);

	if(GM_getValue("restart",true)){
		GM_setValue("count",0);
		GM_setValue("names","");
		GM_setValue("pokes","");
		GM_setValue("hrefs","");

	}else{
		count=GM_getValue("count",0);
		names2=GM_getValue("names","")
		if(names2!="")
			names=names2.split(",");

		hrefs2=GM_getValue("hrefs","");

		if(hrefs2!="")
			hrefs=hrefs2.split("xxx");
		GM_log("removes "+hrefs.pop());
		pokes2=GM_getValue("pokes","");

		if(pokes2!=""){
			pokes3=pokes2.split(",");
		pokes=new Array(names.length);
		for(i=0;i<pokes3.length;i++){
			pokes[i]=parseInt(pokes3[i]);
		}}
	
	}
	set_button();
	t=window.setInterval(pokus,8000);
	
	return;
}

function unister_unLoad(){
	
	clearInterval(t);
	clearInterval(t2);
	clearInterval(t3);
	GM_setValue("count",count);
	GM_setValue("names",names.toString());
	GM_setValue("pokes",pokes.toString());
	href="";
	for(i=0;i<hrefs.length;i++){
	href=href+hrefs[i]+"xxx";
	}
	
	GM_setValue("hrefs",href);
	
		
	return;
}




window.addEventListener( 'load', unister_onLoad, false);
window.addEventListener( 'unload', unister_unLoad, false);


