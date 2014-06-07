// ==UserScript==
// @name           ttc++
// @namespace      lintabá
// @description    Tétova TeveClub++
// @include        http://teveclub.hu/*.pet*
// ==/UserScript==
function init(){
	//default beállítások
	opt=new Array();
	opt['KAJASZINT'] = GM_getValue('KAJASZINT','5');//ha 5 üres akkor etess
	opt['REKLAM']    = GM_getValue('REKLAM',true);
	opt['EGYSZAM']   = GM_getValue('EGYSZAM',false);
	opt['TANIT']     = GM_getValue('TANIT',false);
	opt['LOGOUT']    = GM_getValue('LOGOUT',false);
	opt['MSG']       = GM_getValue('MSG',false);
	opt['EGYSZAM_MIN']       = GM_getValue('EGYSZAM_MIN',400);
	opt['EGYSZAM_MAX']       = GM_getValue('EGYSZAM_MAX',800);
	
	lng=new Array();//nyelvi rész, befejezetlen
	lng["on"]="bekapcsolva";
	lng["off"]="kikapcsolva";
	lng["ask"]="ok=igen\nmégsem=nem";
	lng["eteto"]="Ha ennyi hiányzik az etetőjéből akkor etesd meg!";
	lng["prompt"]="(Írj be egy számot vagy katt a mégsem-re)";
	
	//gm_menu bejegyzése
	GM_registerMenuCommand("AutoKaja:"+(opt['KAJASZINT'] ==false?"kikapcsolva":opt['KAJASZINT']),function(){
		mire=prompt(lng["eteto"]+"\n"+lng["prompt"],(GM_getValue("KAJASZINT",5)==false?"ne etesd!":
		GM_getValue("KAJASZINT",5)));if(mire==Math.floor(mire*1) && mire>0 && mire<7)GM_setValue("KAJASZINT",mire);
		else GM_setValue("KAJASZINT",false);});
	GM_registerMenuCommand("ReklámTörlő:"+(opt['REKLAM'] ==false?lng["off"]:lng["on"]),function(){GM_setValue("REKLAM", confirm("Ugye nem akarsz reklámot?\n"+ lng["ask"]))});
	GM_registerMenuCommand("AutoEgyszám:"+(opt['EGYSZAM']==false?lng["off"]:lng["on"]),function(){GM_setValue("EGYSZAM",confirm("Egyszámozzak minden nap?\n"+  lng["ask"]))});
	GM_registerMenuCommand("AutoTanit:"  +(opt['TANIT']  ==false?lng["off"]:lng["on"]),function(){GM_setValue("TANIT",  confirm("Tanítsalak minden nap?\n"+    lng["ask"]))});
	GM_registerMenuCommand("AutoLogout:" +(opt['LOGOUT'] ==false?lng["off"]:lng["on"]),function(){GM_setValue("LOGOUT", confirm("Kilépjek ha minden kész?\n"+  lng["ask"]))});
	GM_registerMenuCommand("AutoLevél:"  +(opt['MSG']    ==false?lng["off"]:lng["on"]),function(){GM_setValue("MSG",    confirm("Levelek autómata olvasása?\n"+lng["ask"]))});
	GM_registerMenuCommand("EgyszámTipp:"+opt['EGYSZAM_MIN']+","+opt["EGYSZAM_MAX"],function(){min=prompt("Véletlenszám-minimum:",GM_getValue('EGYSZAM_MIN',400));if(min==false || min<2 || min>99999 || Math.floor(min*1)!=min)return false;max=prompt("Véletlenszám-maximum:",GM_getValue('EGYSZAM_MAX',800));if(max==false || max<2 || max>99999 || Math.floor(max*1)!=max || max<min)return false;GM_setValue("EGYSZAM_MIN",min);GM_setValue("EGYSZAM_MAX",max);});
	//használt fügvények bejegyzése
	function $(t){
		return document.getElementById(t);
	}
	function getElementsByClassName(className, tag, elm){
		var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var tag = tag || "*";
		var elm = elm || document;
		var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var returnElements = [];
		var current;
		var length = elements.length;
		for(var i=0; i<length; i++){
			current = elements[i];
			if(testClass.test(current.className)){
				returnElements.push(current);
			}
		}
		return returnElements;
	}
	function random(min,max){
		return(Math.round(Math.random() * (max-min)) + min);
	}
	
	//reklámszűrő
	if(opt['REKLAM']){
		banners=[document.body.childNodes[0].childNodes[9].rows[0].cells[3].childNodes[1],
				 (document.forms[3]?document.forms[3].parentNode.parentNode.childNodes[15]:null),
				 $('popi')];//szűrendő területek
		t=document.body.childNodes[0].childNodes[9].rows[0].cells[1].childNodes[0]
		for(i=20;i<40;i++){
			s=t.childNodes[i].localName;
			if(s=="SCRIPT" || s=="NOSCRIPT" || s=="IMG" || s=="BR" || s=="DIV" || s=="IFRAME" || s=="center")//szűrendő elemek
				banners[banners.length]=t.childNodes[i];
		}
		for(i=0;i<banners.length-1;i++){
			if(banners[i]==null){continue;}
			r=banners[i].parentNode.removeChild(banners[i])//elem törlése
		}
	}
	//KAJAFIGYELŐ
	if(opt['KAJASZINT']!=false){
		for(i=0;i<document.forms.length;i++){//megkeressük a form-ot
			t=document.forms[i];
			if(t.name=="etet"){//ha megvan
				max=Math.max(t.elements[0].length,t.elements[1].length);
				if(max>opt['KAJASZINT']){//és nincs elég kajája
					t.elements[0].value=t.elements[0].length;
					t.elements[0].selectedIndex=t.elements[0].length-1;//etetjük max-al
					t.elements[1].value=t.elements[1].length;
					t.elements[1].selectedIndex=t.elements[1].length-1;//itatjuk max-al
					t.elements[2].type="hidden"//a submit gombot is küldjük vele
					t.submit();//etet
					return;//futás vége
				}
			}
		}
	}
	var tanit,egyszam=false;
	if((opt['EGYSZAM'] || opt['TANIT']) && location.href.search(/myteve/)!=-1){//megnézzük hogy etetés vagy itatás kell-e
		elems=document.getElementsByTagName("span");
		for(i=0;i<elems.length;i++){
			if(elems[i].title.length<1){continue;}
			egyszam=egyszam || elems[i].title.search(/tippeltél/)!=-1;//egyszám piros
			tanit=tanit || elems[i].title.search(/tanítottad/)!=-1;//tanít piros
			
		}
		if(opt['EGYSZAM'] && egyszam){
			location.href="egyszam.pet";//ha lehet akkor egyszám
			return;
		}
		if(opt['TANIT'] && tanit){
			location.href="tanit.pet";//egyébként tanít
			return;
		}
	}
	if(opt['EGYSZAM'] && location.href.search(/egyszam/)!=-1){//egyszámnál
		if(document.getElementsByTagName("input")[1].value==""){//ha még nem tippeltünk
			tipp=random(opt['EGYSZAM_MIN'],opt['EGYSZAM_MAX']);//keressünk egy számot
			document.getElementsByTagName("input")[1].value=tipp;//állítsuk be
			document.getElementsByTagName("input")[2].type="hidden";//gomb küldése
			document.getElementsByTagName("form")[1].submit();//mehet
			return;
		}else{//különben(ha már egyszámoztunk)
			location.href="myteve.pet";//vissza a tevémhez
		}
	}
	if(opt['TANIT'] && location.href.search(/tanit/)!=-1){//tanításnál
		form=document.getElementsByTagName("form")[1];
		if(form.name=="tanitb" && form.getElementsByTagName("input")[1].type=="submit" 
				&& form.getElementsByTagName("input")[1].value=="Tanulj teve!"){//ha még nem tanult
			form.getElementsByTagName("input")[1].type="hidden";//gomb küldése
			form.submit();//mehet
			return;
		}//a megtanulva opciót még nem sikerűlt megnézni
	}
	if(opt['MSG'] && location.href.search(/myteve/)!=-1 && document.getElementsByName("menu2")[0] 
			&& document.getElementsByName("menu2")[0].src.search(/mail/!=-1)){//levélnéző
		location.href="inbox.pet"
	}
	if(opt['MSG'] && location.href.search(/inbox/)!=-1){//fejlesztés alatt
		/*messages=getElementsByClassName("postatd")[0].parentNode.parentNode.parentNode
		for(i=1;i<messages.rows.length;i++){
			ico=messages.rows[i].cells[0].firstChild.getElementsByTagName("img")[0]
		}*/
	}
	if(opt['LOGOUT'] && location.href.search(/myteve/)!=-1){
		location.href="logout.pet";//ha kész vagy kiléptet
	}
}
addEventListener("load",init,false);
