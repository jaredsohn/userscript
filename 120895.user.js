// ==UserScript==
// @id             zpovednice oprav odkazy, bez jQuery
// @name           zpovednice oprav odkaz, bez jQuery
// @version        1.0
// @namespace      daemonicky
// @author         daemonicky
// @description    
// @include        http://zpovednice.cz/detail.php?statusik=*
// @include        http://www.zpovednice.cz/detail.php?statusik=*
// @include        http://*zpovednice.cz/detail.php?statusik=*
// @include        http://*zpovednice.cz/profil.php?kdo=*
// @run-at         document-end
// ==/UserScript==


debug = 1;
test0_nahrad_mezery_ci_bile_znaky = 1; // 0 mezery, 1 bile znaky
heuristika_regularniho_vyrazu=2;
heuristika_na_konci_neni_tecka=1;
heuristika_na_konci_neni_carka=1;
//heuristika1_vylepseny_regularni_vyraz=1;
//heuristika2_vylepseny_regularni_vyraz=1;

if (0) { //nefunguje protoze cele texty jsou obalene v conftextu
    y = document.getElementsByClassName("conftext");
    for(i=0;i<y.length-1;++i){
        x = y[i].innerHTML;
        yy = []; for(j=0;j<x.length;j++) if(' ' != x[j]) yy+=x[j]; // 0 == j%2) yy+=x[j];
        y[i].innerHTML = '<a href="'+yy+'">'+yy+'</a>';
    }
}


// modelovy priklad
// =================
// http://zpovednice.cz/detail.php?statusik=144349
// =================
//
// Takto to vyzeralo na tej party , stiahnite si video :
// <br>
// <a title="http://freevideo.cz/gallery.php?url=ht" target="_blank" href="http://freevideo.cz
// /gallery.php?url=ht">http://freevideo.cz/gallery.php?url=ht </a>
// tp%3A%2F%2Fwww.sleepandfuck.com%2Fsleep_ 1a_21kl%2Findex33ap.html
// <br>
//
function xform(t) {
	    // [21:24:25.470] "si video :  <br> <a href=http://freevideo.cz/gallery.php?url=ht tar=http://freevideo.cz/gallery.php?url=ht>http://freevideo.cz/gallery.php?url=ht_ </a>tp%3A%2F%2Fwww.sleepandfuck.com%2Fsleep_ 1a_21kl%2Findex33ap.html <br>"
	    // vezmu url
	    // /<a[^<]+<\/a>/gi.exec(t)
	    // [21:28:18.777] ["<a href=http://freevideo.cz/gallery.php?url=ht tar=http://freevideo.cz/gallery.php?url=ht>http://freevideo.cz/gallery.php?url=ht_ </a>"]
	    // ... a = /<a[^<]+<\/a>/gi.exec(t);
	    //
	    // at

		    // http://zpovednice.cz/detail.php?statusik=144349, http://freevideo.cz/gallery.php?url=http%3A%2F%2Fwww.sleepandfuck.com%2Fsleep_1a_21kl%2Findex33ap.html

	    t = t;
	    ata = [t.search("<a"), t.search("http")]
	    at = Math.min.apply(Math, ata);
	    if (at == -1) at = Math.max.apply(Math, ata);
	    //alert(ata);
	    if (at != -1) {
		    u = []
		    if (ata[0] == at) { // <a
			    // FAIL:
			    //
			    // alert("<a ... "+t.substr(at));
			    // |<a ....    |</a>
			    // A = t.substr(at);
			    // at2 = A.search("</a>");
			    // B = A.substr(0, A.search("</a>"));
			    // C = B.substr(B.search(">")+1);
			    // url0 = C;
			    // urlprefix = t.substring(0, at);
			    // urlsufix = A.substring(at2+4);
			    // iii = at;
			    //
			    // WIN:
			    u[0]=t.substring(0,at);//urlprefix;
			    u0_complement = t.substring(at);
			    iii = u0_complement.search("</a>");
			    u[1]=u0_complement.substring(u0_complement.search(">")+1, iii);
			    u[2]=u0_complement.substring(iii+4);
		    } else {
			    u[0]=t.substring(0,at);
			    u0_complement = t.substring(at);
			    iii = u0_complement.search(/\s/);
			    u[1] =u0_complement.substring(0,iii);
			    u[2] =u0_complement.substring(iii)
		    }
		    //alert(t);
		    //alert(u[0]);
		    //alert(u[1]);
		    //alert(u[2]);
		    //


		    // url0, endurl0
		    // remove all from at up to endurl0
		    
		    // find rest of url
		    // url1, endurl1
		    // remove up to endurl1

		    // catenate url0,url1

		    // create link

		    // HEURISTIKA1
		    // v prostred MUSI byt jeden z techto znaku . / = % ~
		    //
		    //

		    //if (heuristika_regularniho_vyrazu==0 || heuristika_regularniho_vyrazu < 0)
		    r = /(\s*\w*[.\/?=%~]+[\w.\/?=%~]*)*/gi;
		    if (heuristika_regularniho_vyrazu==1)
			    r = /(\s*\w*[.\/?=_;&+\-%~]+[\w.\/?=_;&+\-%~]*)*/gi;
		    if (heuristika_regularniho_vyrazu==2 || heuristika_regularniho_vyrazu > 2)
			    r = /(\s*\w*[.\/?:=_;&+\-%~]+[\w.\/?:=_;&+\-%~]*)*/gi;
		    qqq =r.exec(u[2]);
		    //alert(u[2] + "--->>>" + qqq[0]);

		    // TODO:HEURISTIKA2
		    // tato stranka se timto neda zvladnout
		    // http://zpovednice.cz/detail.php?statusik=558664&kateg=1&nove=0&orderbyide 
		    // blabla.jpg
		    // .j pg
		    // .jp g
		    // .jpg
		    //alert(qqq[0]);
		    Q = qqq[0];
		    if (test0_nahrad_mezery_ci_bile_znaky) { // toto by mohlo byt vice spravne, nahrazeni bilych znaku
			    url = u[1].replace(/[\s]/gi,"")+Q.replace(/[\s]/gi,""); 
		    } else { url = u[1].replace(" ","")+Q.replace(" ",""); }// nahrazeni mezer
		    //
		    // odkazy jsou nekdy ve formatu vhodnem pro vkladani (... http://freakzappeal.com/hewitt%E2%80%99s = http://freakzappeal.com/hewitt's )
		    // http://www.w3schools.com/jsref/jsref_unescape.asp
		    url_with_ending_messed = url;
		    if (heuristika_na_konci_neni_tecka && url.length >= 1 && url[url.length-1] == '.') { url=url.substring(0,url.length-1); }
		    if (heuristika_na_konci_neni_carka && url.length >= 1 && url[url.length-1] == ',') { url=url.substring(0,url.length-1); }
		    url_dec = decodeURI(url);
		    url2 = '<a href='+url_dec+'>'+url_with_ending_messed+'</a>';

		    if (debug==1)
			    y = u[0]+"---"+url2+"---"+ xform(u[2].substring(qqq[0].length));
		    else
			    y = u[0]+url2+ xform(u[2].substring(qqq[0].length));

		    return y;
	    } else { // @1
		    return t; // @2
	    }
}
function c_f(list) {for(i=0;i<list.length;++i) { if (/http:/gi.test(list[i].innerHTML)) { list[i].innerHTML=xform(list[i].innerHTML); } } }// } @4 // ) @5 // } @6
function c_g(list) {for(i=0;i<list.length;++i) { y = document.getElementsByClassName(list[i]); c_f(y);}}
y = document.getElementsByClassName("absoltext"); c_f(y);//for (i=0;i<y.length-1;++i) { if (/http:/gi.test(y[i].innerHTML)) { t = y[i].innerHTML; y[i].innerHTML = xform(t); } }
y = document.getElementsByClassName("guesttext"); c_f(y);
y = document.getElementsByClassName("guesttext"); c_f(y);
y = document.getElementsByClassName("conftext"); c_f(y);
// } @3

// obcas je zkomoleny v odkazu
// ten odstranim
// a odstranim i 

 //   y2 = /http:\/\/[\w.\/?=%~]+(\s+\w*[.\/?=%~]+[\w.\/?=%~]*)*/gmi.exec(document.body.innerHTML);
 //   for(i=0;i<y.length;++i) alert(y[i]);
