scr_meta=<><![CDATA[
// ==UserScript==
    //
    // @name		manga-lib.pl pomocnik
    // @description		Pomocnik dla strony z mangami online manga-lib.pl
    // @author		matrixik
    // Adres skryptu	http://userscripts.org/scripts/show/47466
    // @version		0.3.6
    // Zaktualizowany:	13.07.2009
    //
    // @include		*manga-lib.pl*
    // @exclude		http://forum.manga-lib.pl/*
    //
    // ==/UserScript==
    ]]></>.toString();


// ===== Start =====

// Funkcje pomocnicze
function $Id(element) {
    return document.getElementById(element);
}
function $docTag(element) {
    return document.getElementsByTagName(element);
}
function remove(element) {
    element.parentNode.removeChild(element);
}
function insertAfter(node, after) {
    after.parentNode.insertBefore(node, after.nextSibling);
}

// Styl globalny
GM_addStyle("form.search {position: absolute; right: 0.5em; top: 0.5em;} \
		form.search p {margin: 0px;} \
		form.search p select {width: 100% !important;} \
		select option {padding: 0px 5px;} \
                select { position: relative; top: -1px; height: 22px !important;} \n\
        ");

//Strona z obrazami
if((document.URL).split(",")[1]){
    // Zmiana stylu strony z obrazami np. większe obrazy, brak ograniczenia do 990px
    GM_addStyle("img.img_resize { max-width: 99%;} \
		img {border: 7px solid; \
			-moz-border-bottom-colors: #FFFFFF #EFEFEF #DFDFDF #BFBFBF #9F9F9F #7F7F7F #5F5F5F #3F3F3F #1F1F1F #000000; \
			-moz-border-top-colors: #FFFFFF #EFEFEF #DFDFDF #BFBFBF #9F9F9F #7F7F7F #5F5F5F #3F3F3F #1F1F1F #000000; \
			-moz-border-left-colors: #FFFFFF #EFEFEF #DFDFDF #BFBFBF #9F9F9F #7F7F7F #5F5F5F #3F3F3F #1F1F1F #000000; \
			-moz-border-right-colors: #FFFFFF #EFEFEF #DFDFDF #BFBFBF #9F9F9F #7F7F7F #5F5F5F #3F3F3F #1F1F1F #000000;} \
		#wrap {width: 100%; margin: auto;} \
		#header {background: #000; height: 3em;} \
		#header ul {left: 0.5em; right: 0;} \
		#header li + li + li + li + li {display: none;} /*ukrycie trzech linków z menu*/ \
		#header-logo {height: 0px; position: static;} \
		#logo {display: none;} \
		body {background: #FFF;} \
		ul {padding: 0;} \
            ");

    // Wygląd przycisków
    GM_addStyle("input { margin:0 7px 0 0; \
                            background-color:#f5f5f5; \
                            border:1px solid #dedede; \
                            border-top:1px solid #eee; \
                            border-left:1px solid #eee; \
                            color:#565656 !important; \
                            cursor:pointer;\n\
                            height: 22px !important;} \
		input + input + input { text-indent: -20em; \
			width: 40px; \
			background: #f5f5f5 url(http://matrixik.ovh.org/gm/16zoom.png) no-repeat 50% 75%; } \
		input:hover{background-color:#dff4ff; \
					border:1px solid #c2e1ef; \
					color:#336699;} \
	");

    //Focus na nazwę mangi
    var selekty = $docTag("select");
    var przejdz_do_mangi = document.createElement("p");
    var logo = $Id("logo");
    var forma = logo.nextSibling.nextSibling;
    try {
        forma.insertBefore(przejdz_do_mangi, forma.firstChild);
    } catch (e) {}

    GM_addStyle("input#przejdz {position: absolute; left: -9em; top: -1px;} \n\
                ");
    var manga;
    var manga_link;
    var aktualna_manga = (document.URL).split("/");
    aktualna_manga = (aktualna_manga[aktualna_manga.length-1]).split(",")[0];
    // Szukanie aktualnej mangi
    try {
        for (i = 0; i < selekty[0].length; i++) {
            manga_link = selekty[0].options[i].value;
            manga = (manga_link).split("/");
            manga = (manga[manga.length-1]).split(".")[0];

            if (manga == aktualna_manga) {
                // Focus w liście na aktualną mangę i aktualizacja przycisku przejścia do info
                selekty[0].options[i].defaultSelected = true;
                forma.firstChild.innerHTML= "<p> <input id='przejdz' type='button' class='read_online' value='Przejdź do opisu'" +
                    "onclick='javascript:window.location=\" " + selekty[0].options[i].value + "\";' /> </p>";
                break;
            }
        }
    } catch (e) {}

} // Koniec: Strona z obrazami


// Usuwanie stopki
var stopkaoff = document.body.innerHTML.replace(/<!-- footer starts[\w\D]*footer ends here -->/,'');
document.body.innerHTML = stopkaoff;

// Usuwanie reklam z lewego panelu
var lewypanel = document.body.innerHTML.replace(/<h1>Sponsor[\w\D]*menu_sponsor_box ends here -->/,'');
document.body.innerHTML = lewypanel;

// Usuwa ramkę z informacjami o klawiszach do czytania mang
try{
    elems= $Id("manga_read");
    for(i=elems.childNodes.length;i>= 0;i--){
        try{
            if (elems.childNodes[i].getElementsByTagName("p")){
                remove(elems.childNodes[i]); break;
            }
        }catch(e){
            continue;
        }
    }
}catch(e){}

// Usuwanie <script>, <noscript>, ramek (z reklamami) i przycisków
try{
    elems= $docTag("script");
    for(i=elems.length;i>= 0;i--){
        try{
            remove(elems[i]);
        }catch(e){
            continue;
        }
    }

    elems= $docTag("noscript");
    for(i=elems.length;i>= 0;i--){
        try{
            remove(elems[i]);
        }catch(e){
            continue;
        }
    }

    elems= $docTag("iframe");
    for(i=elems.length;i>= 0;i--){
        try{
            remove(elems[i]);
        }catch(e){
            continue;
        }
    }

}catch(e){}

// End


// /* Skrypt do aktualizacji dzięki http://userscripts.org/scripts/show/38017
aaus_38017={
    i:'47466', // Script id on Userscripts.org
    d:2, // Days to wait between update checks
    n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match("the page you requested doesn't exist")||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();
// */