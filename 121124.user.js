// ==UserScript==
// @id             zpovednice autovypln
// @name           zpovednice autovypln
// @version        1.0
// @namespace      daemonicky
// @author         daemonicky
// @description    
// @include        http://*zpovednice.cz/vlastnizp.php*
// @include        http://zpovednice.cz/vlastnizp.php*
// @include        http://www.zpovednice.cz/vlastnizp.php*
// @include        http://zpovednice.cz/souhlas.php*
// @include        http://*zpovednice.cz/souhlas.php*
// @include        http://www.zpovednice.cz/souhlas.php*
// @run-at         document-end
// ==/UserScript==

jmeno = "jmeno";
nazev = "nazev";
vek = 1;
email= "a@b.c";
text_zpovedi = "text zpovedi";
kategorie = 1;  // zpovedi, viz:
// 1,2,3,4
//1 .... Klasické zpovědi
//2 .... Náměty k diskuzím na obecná témata
//3 .... Autorská tvorba, básničky, povídky
//4 .... Otázky, vzkazy, dotazy a pozvánky

// ======================================================

if(document.URL == 'http://zpovednice.cz/souhlas.php') {
	//alert('memento');
	A=document.getElementsByName("B1"); // nefunguje !!!
	B=document.getElementsByTagName("input"); for(i=0;i<B.length;++i)if(B[i].name=="B1") A = B[i];
	A.onclick = function(){
		GM_setValue("prave_dal_opravit", true);
		x=document.getElementsByTagName("input");
		function get(_name) { for(i=0;i<x.length;i++) if(x[i].name==_name) return x[i].value;}
		GM_setValue("jmeno" ,get("jmeno"));
		GM_setValue("nazev" ,get("znacka"));
		GM_setValue("vek" ,get("vek"));
		GM_setValue("text_zpovedi" ,get("zpoved"));
		//GM_setValue("kategorie", 
		GM_setValue("email" ,get("Email"));
	};
} else {
	if(GM_getValue("prave_dal_opravit",false)) {
		GM_setValue("prave_dal_opravit",false);

		jmeno = GM_getValue("jmeno" ,jmeno);
		nazev = GM_getValue("nazev" ,nazev);
		znacka = GM_getValue("znacka" ,jmeno);
		vek = GM_getValue("vek" ,vek);
		text_zpovedi = GM_getValue("text_zpovedi" ,text_zpovedi);
		email = GM_getValue("email" ,email);
	}
	//alert('1');
	x=document.getElementsByTagName("input");
	for(i=0;i<x.length;++i){if(x[i].name=="jmeno")x[i].value=jmeno;}
	for(i=0;i<x.length;++i){if(x[i].name=="znacka")x[i].value=nazev;}

	o = document.getElementsByTagName("option");if(o&&o.length>kategorie) o[kategorie].selected="jasne ze jo";

	for(i=0;i<x.length;++i){if(x[i].name=="vek")x[i].value=vek;}

	//alert('2');
	q = document.getElementsByTagName("textarea"); if(q && q.length >= 1) q[0].value=text_zpovedi;
	//alert('3');

	for(i=0;i<x.length;++i){if(x[i].name=="Email")x[i].value=email;}
	for(i=0;i<x.length;i++){if(x[i].name=="pravidla")x[i].checked="jojo";}
	//alert('4');
}

