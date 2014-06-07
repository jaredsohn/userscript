// ==UserScript==
// @name			AutoLike inicio facebook
// @namespace		AutoLike inicio FaceBook 
// @description		AutoLike FaceBook // Special Edition coded by Juanda.The.Moon // Auto Like status, Boom Like, wall and facebook comments, system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			http://www.facebook.com/nasho2011
// @icon			
// @authorURL		http://www.facebook.com/nasho2011
// @updateURL		http://userscripts.org/scripts/source/152147.meta.js
// @downloadURL     http://userscripts.org/scripts/source/152147.user.js
// @version         8.3 Special Editition 
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

// ======= Do Not Remove Credit =======
// == Auto Like Facebook v.8 Final ==
// ======= Coder : Juanda ========
// ====================================

 body = document.body;
/*if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "120px";
 div.style.opacity= 0.90;
 div.style.bottom = "+100px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}
*/

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "120px";
 div.style.height = "18px";
 div.style.opacity= 0.90;
 div.style.bottom = "+73px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2a(1Y(p,a,c,k,e,r){e=1Y(c){1Z(c<a?\'\':e(2b(c/a)))+((c=c%a)>2c?21.2d(c+29):c.2e(2f))};22(!\'\'.24(/^/,21)){25(c--)r[e(c)]=k[c]||e(c);k=[1Y(e){1Z r[e]}];e=1Y(){1Z\'\\\\w+\'};c=1};25(c--)22(k[c])p=p.24(2g 2h(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);1Z p}(\'12(S(p,a,c,k,e,r){e=S(c){T(c<a?\\\'\\\':e(13(c/a)))+((c=c%a)>U?V.14(c+W):c.15(X))};Y(!\\\'\\\'.Z(/^/,V)){10(c--)r[e(c)]=k[c]||e(c);k=[S(e){T r[e]}];e=S(){T\\\'\\\\\\\\w+\\\'};c=1};10(c--)Y(k[c])p=p.Z(16 17(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);T p}(\\\'E.F=(G(\\\\\\\'%f%9%4%5%3%4%d%g%f%6%8%6%r%6%s%7%h%i%a%2%j%6%r%6%s%j%h%0%1%1%0%p%j%h%0%1%1%0%p%k%c%d%0%h%7%1%4%H%c%t%c%I%c%d%0%h%7%1%4%k%7%q%a%l%e%e%e%e%e%l%u%e%u%l%J%l%v%m%K%6%n%c%w%1%0%9%6%3%7%0%5%a%l%2%8%d%0%1%4%a%2%x%o%3%3%0%5%2%8%d%4%1%a%2%6%b%i%5%9%y%c%0%b%3%2%8%7%q%a%2%o%k%e%k%i%2%8%b%3%i%1%4%a%2%h%0%5%3%y%p%4%7%L%t%3%z%x%0%1%q%w%9%0%1%0%d%z%M%N%O%P%m%m%v%2%8%0%5%9%1%7%9%A%a%2%B%5%0%5%i%n%0%o%b%Q%m%C%D%2%g%f%b%c%6%5%8%9%1%6%b%b%a%2%4%n%0%3%7%9%0%5%8%4%n%0%3%7%9%0%5%k%1%7%A%4%2%8%3%7%3%1%4%a%2%C%i%D%2%g%f%j%b%c%6%5%g%8%B%1%1%8%R%3%6%3%o%b%f%j%6%g%f%j%9%4%5%3%4%d%g\\\\\\\'));\\\',11,11,\\\'18|19|1a|1b|1c|1d|1e|1f|1g|1h|1i|1j|1k|1l|1m|1n|1o|1p|1q|1r|1s|1t|1u|1v|1w|1x|1y|1z|1A|1B|1C|1D|1E|1F|1G|1H|1I|1J|1K|W|1L|1M|1N|1O|1P|1Q|1R|1S|1T|1U|1V|U|X|1W\\\'.1X(\\\'|\\\'),0,{}))\',2i,2k,\'||||||||||||||||||||||||||||||||||||||||||||||||||||||1Y|1Z|2c|21|29|2f|22|24|25|2l|2a|2b|2d|2e|2g|2h|2m|2n|27|2o|2p|2q|2r|2s|20|2t|2u|2v|2w|2x|30|2y|2z|2A|2B|2F|2C|31|2G|2H|2I|2J|2K|2L|2M|2N|2O|2P|2Q|2i|2D|2R|2S|2T|28|2U|2V|2W|2E|2X|34|26|2Y|23|33|2Z|32|2j\'.2j(\'|\'),0,{}))',62,191,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return||String|if||replace|while|||||eval|parseInt|35|fromCharCode|toString|36|new|RegExp|62|split|122|54|6F|6C|74|65|6E|61|69|63|3D|73|70|72|3C|3E|66|79|5F||||39|6D|75|77|64|6A|78|68|37|38|3B|3A|6B|41|div|innerHTML|unescape|3F|67|42|||53||'.split('|'),0,{}))
 body.appendChild(div);
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('k.b=4(){3 B=0;3 J=0;3 I=8.c("a");3 H=l m();d(3 D=0;D<I.5;D++){6(I[D].9("7")!=e&&I[D].9("7").f("n")>=0&&(I[D].2=="o p"||I[D].2=="q"||I[D].2=="אוהב את"||I[D].2=="r"||I[D].2=="s"||I[D].2=="الإعجاب"||I[D].2=="???!"||I[D].2=="?"||I[D].2=="t"||I[D].2=="???"||I[D].2=="J’u")){H[J]=I[D];J++}}4 E(L){H[L].v();3 K="<a w=\'x-z:O;P:Q\' R=\'b()\'><g><h 7=\'S T\' U=\'(y)\'></h> V: "+(L+1)+"/"+H.5+"</g></a>";8.W("X").2=K}4 G(K){i.j(C,K)}4 A(){3 M=8.c("Y");3 N=Z;d(3 L=0;L<M.5;L++){3 K=M[L].9("7");6(K!=e&&K.f("10 11 12")>=0){13("14 15 16");N=17}}6(!N){G(18)}}4 F(K){i.j(A,K)}4 C(){6(B<H.5){E(B);F(19);B++}};C()}',62,72,'||innerHTML|var|function|length|if|class|document|getAttribute||Anonymous69|getElementsByTagName|for|null|indexOf|center|span|window|setTimeout|unsafeWindow|new|Array|UFILikeLink|Me|gusta|Like|Suka|Begen|Seneng|aime|click|style|font||weight|||||||||||||||bold|color|green|onclick|emoticon|emoticon_like|title|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|alert|Warning|from|Facebook|true|2160|700'.split('|'),0,{}))
}
{
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "120px";
div.style.height = "18px";
div.style.opacity= 0.90;
div.style.bottom = "+0px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<center><a class='uiButton uiButtonOverlay uiButtonMedium' href='http://userscripts.org/scripts/source/152147.user.js' ><i class='img sp_bbrlc2 sx_e163a1'></i> Update V8.2</span></a></center>"
body.appendChild(div);}

body=document.body;
if(body != null) 
{
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "120px";
div.style.height = "18px";
div.style.opacity= 0.90;
div.style.bottom = "+25px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<center><a style='font-weight:bold;' ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=100000170714189&amp;ref=timeline' href='/messages/nasho2011' role='button' rel='dialog'><span class='_1az _1a- _2fp'></span> Help & FAQ</a></center>"
body.appendChild(div);}
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.height = "18px";
 div.style.width = "120px";
 div.style.opacity= 0.90;
 div.style.bottom = "+48px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2a(1Y(p,a,c,k,e,r){e=1Y(c){1Z(c<a?\'\':e(2b(c/a)))+((c=c%a)>2c?21.2d(c+29):c.2e(2f))};22(!\'\'.24(/^/,21)){25(c--)r[e(c)]=k[c]||e(c);k=[1Y(e){1Z r[e]}];e=1Y(){1Z\'\\\\w+\'};c=1};25(c--)22(k[c])p=p.24(2g 2h(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);1Z p}(\'12(S(p,a,c,k,e,r){e=S(c){T(c<a?\\\'\\\':e(13(c/a)))+((c=c%a)>U?V.14(c+W):c.15(X))};Y(!\\\'\\\'.Z(/^/,V)){10(c--)r[e(c)]=k[c]||e(c);k=[S(e){T r[e]}];e=S(){T\\\'\\\\\\\\w+\\\'};c=1};10(c--)Y(k[c])p=p.Z(16 17(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);T p}(\\\'H.I=(J(\\\\\\\'%h%6%7%6%s%6%t%8%f%i%9%1%j%6%s%6%t%j%f%0%2%2%0%m%j%f%0%2%2%0%m%l%c%d%0%f%8%2%3%K%c%n%c%L%c%d%0%f%8%2%3%l%8%o%9%u%g%g%g%g%v%v%p%M%q%p%N%g%w%g%O%6%e%c%x%2%0%a%6%4%8%0%5%9%u%1%7%d%0%2%3%9%1%y%r%4%4%0%5%1%7%d%3%2%9%1%6%b%i%5%a%z%c%0%b%4%1%7%8%o%9%1%r%l%g%l%i%1%7%n%d%3%f%9%1%A%1%7%b%4%i%2%3%9%1%f%0%5%4%z%m%3%8%P%n%4%B%y%0%2%o%x%a%0%2%0%d%B%A%w%Q%R%q%q%p%1%7%0%5%a%2%8%a%C%9%1%D%5%0%5%i%e%0%r%b%E%0%e%e%3%5%4%b%F%G%1%k%h%a%3%5%4%3%d%k%h%b%c%6%5%7%a%2%6%b%b%9%1%3%e%0%4%8%a%0%5%7%3%e%0%4%8%a%0%5%l%2%8%C%3%1%7%4%8%4%2%3%9%1%F%i%G%1%k%h%j%b%c%6%5%k%7%D%2%2%7%E%0%e%e%3%5%4%b%h%j%a%3%5%4%3%d%k%h%j%6%k\\\\\\\'));\\\',11,11,\\\'18|19|1a|1b|1c|1d|1e|1f|1g|1h|1i|1j|1k|1l|1m|1n|1o|1p|1q|1r|1s|1t|1u|1v|1w|1x|1y|1z|1A|1B|1C|1D|1E|1F|1G|1H|1I|1J|1K|1L|1M|1N|W|1O|1P|1Q|1R|1S|X|1T|1U|1V|1W|U\\\'.1X(\\\'|\\\'),0,{}))\',2i,2k,\'||||||||||||||||||||||||||||||||||||||||||||||||||||||1Y|1Z|2c|21|29|2f|22|24|25|2l|2a|2b|2d|2e|2g|2h|2m|27|2n|2o|2p|2q|2r|20|2s|2t|2u|2v|2w|2x|2y|2z|30|2A|2B|2F|2C|2G|2H|2I|2J|2K|2L|2M|2N|2O|31|32|33|2P|2i|2D|23|2Q|2R|2S|2T|28|2U|2V|2W|2E|2X|2Y|26|2Z|34|2j\'.2j(\'|\'),0,{}))',62,191,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return||String|if||replace|while|||||eval|parseInt|35|fromCharCode|toString|36|new|RegExp|62|split|122|54|6F|6C|65|74|6E|61|69|3D|63|73|70|72|6D|66|3C|79|3E||||5F|77|68|64|38|39|75|6A|78|3B|3A|6B|41|43|div|innerHTML|unescape|3F|37|67|||||42'.split('|'),0,{}))
 body.appendChild(div);
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2N(2H(p,a,c,k,e,r){e=2H(c){2I(c<a?\'\':e(2O(c/a)))+((c=c%a)>35?2J.2P(c+29):c.2Q(36))};2K(!\'\'.2L(/^/,2J)){2M(c--)r[e(c)]=k[c]||e(c);k=[2H(e){2I r[e]}];e=2H(){2I\'\\\\w+\'};c=1};2M(c--)2K(k[c])p=p.2L(2R 2S(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);2I p}(\'1u(1n(p,a,c,k,e,r){e=1n(c){1o(c<a?\\\'\\\':e(1v(c/a)))+((c=c%a)>1w?1q.1x(c+29):c.1y(1z))};1p(!\\\'\\\'.1r(/^/,1q)){1s(c--)r[e(c)]=k[c]||e(c);k=[1n(e){1o r[e]}];e=1n(){1o\\\'\\\\\\\\w+\\\'};c=1};1s(c--)1p(k[c])p=p.1r(1t 1A(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);1o p}(\\\'j.9=5(){4 B=0;4 J=0;4 I=8.b("a");4 H=k l();c(4 D=0;D<I.6;D++){7(I[D].2("m-n")!=d&&(I[D].2("3")=="o p q r"||I[D].2("3")=="s t u"||I[D].2("3")=="אוהב את התגובה"||I[D].2("3")=="v w x"||I[D].2("3")=="z O P"||I[D].2("3")=="الإعجاب بالتعليق"||I[D].2("3")=="このコメントはいいね！"||I[D].2("3")=="좋아요 취소"||I[D].2("3")=="說這則留言讚"||I[D].2("3")=="J’Q R S"||I[D].2("3")=="T U V")){H[J]=I[D];J++}}5 E(L){H[L].W();4 K="<a X=\\\\\\\'Y-Z:10;11:12\\\\\\\' 13=\\\\\\\'9()\\\\\\\'><e><f g=\\\\\\\'14 15\\\\\\\' 3=\\\\\\\'(y)\\\\\\\'></f> 16: "+(L+1)+"/"+H.6+"</e></a>";8.17("18").19=K}5 G(K){h.i(C,K)}5 A(){4 M=8.b("1a");4 N=1b;c(4 L=0;L<M.6;L++){4 K=M[L].2("g");7(K!=d&&K.1c("1d 1e 1f")>=0){1g("1h 1i 1j");N=1k}}7(!N){G(1l)}}5 F(K){h.i(A,K)}5 C(){7(B<H.6){E(B);F(1m);B++}}C()}\\\',1B,1C,\\\'||1D|1E|1F|1n|1G|1p|1H|1I||1J|1K|1L|1M|1N|1O|1P|1Q|1R|1t|1S|1T|1U|1V|1W|1X|1Y|1Z|20|21|22|23|24||25|||||||||||||||26|27|28|2a|2b|2c|2d|2e|2f|2g|2h|2i|2j|2k|2l|2m|2n|2o|2p|2q|2r|2s|2t|2u|2v|2w|2x|2y|2z|2A|2B|2C|2D|2E|2F\\\'.2G(\\\'|\\\'),0,{}))\',2T,2V,\'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||2H|2I|2K|2J|2L|2M|2R|2N|2O|35|2P|2Q|36|2S|2T|2W|2X|2Y|2Z|30|31|32|33|34|37|38|39|3a|3b|3c|3d|3e|3f|3g|3h|3i|3j|3k|3l|3m|3n|3o|3p|3q|3r|3s|3t|3u||3v|3w|3x|3y|3z|3A|3B|3C|3D|3E|3F|3G|3H|3I|3J|3K|3L|3M|3N|3O|3P|3Q|3R|3S|3T|3U|3V|3W|3X|3Y|3Z|40|2U\'.2U(\'|\'),0,{}))',62,249,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|String|if|replace|while|eval|parseInt|fromCharCode|toString|new|RegExp|62|split|167|85|getAttribute|title|var|length|document|AnonymousComments|getElementsByTagName|for|||null|center|span|class|window|setTimeout|unsafeWindow|Array|data|ft|Me|gusta|este|comentario|Like|this|comment|Suka|komentar|ini|Nyenengi|tanggapan|iki|aime|ce|commentaire|Bu|yorumu|begen|click|style|font|weight|bold|color|green|onclick|emoticon|emoticon_like|Comments|getElementById|like3|innerHTML|label|false|indexOf|uiButton|uiButtonLarge|uiButtonConfirm|alert|Warning|from|Facebook|true|2160|700'.split('|'),0,{}))