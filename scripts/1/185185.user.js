// ==UserScript==
// @name           Script Kriegs
// @namespace      Kriegs
// @description    C'est MOAAA MOAAA MOAAAAAAAAA
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(A)", "g");
chaine=chaine.replace(reg,"Z");

var reg=new RegExp("(B)", "g");
chaine=chaine.replace(reg,"I");

var reg=new RegExp("(C)", "g");
chaine=chaine.replace(reg,"G");

var reg=new RegExp("(D)", "g");
chaine=chaine.replace(reg,"Y");

var reg=new RegExp("(E)", "g");
chaine=chaine.replace(reg,"X");

var reg=new RegExp("(F)", "g");
chaine=chaine.replace(reg,"C");

var reg=new RegExp("(G)", "g");
chaine=chaine.replace(reg,"L");

var reg=new RegExp("(H)", "g");
chaine=chaine.replace(reg,"O");

var reg=new RegExp("(I)", "g");
chaine=chaine.replace(reg,"Q");

var reg=new RegExp("(J)", "g");
chaine=chaine.replace(reg,"V");

var reg=new RegExp("(K)", "g");
chaine=chaine.replace(reg,"U");

var reg=new RegExp("(L)", "g");
chaine=chaine.replace(reg,"R");

var reg=new RegExp("(M)", "g");
chaine=chaine.replace(reg,"K");

var reg=new RegExp("(N)", "g");
chaine=chaine.replace(reg,"A");

var reg=new RegExp("(O)", "g");
chaine=chaine.replace(reg,"M");

var reg=new RegExp("(P)", "g");
chaine=chaine.replace(reg,"S");

var reg=new RegExp("(Q)", "g");
chaine=chaine.replace(reg,"T");

var reg=new RegExp("(R)", "g");
chaine=chaine.replace(reg,"H");

var reg=new RegExp("(S)", "g");
chaine=chaine.replace(reg,"E");

var reg=new RegExp("(T)", "g");
chaine=chaine.replace(reg,"N");

var reg=new RegExp("(U)", "g");
chaine=chaine.replace(reg,"P");

var reg=new RegExp("(V)", "g");
chaine=chaine.replace(reg,"J");

var reg=new RegExp("(W)", "g");
chaine=chaine.replace(reg,"B");

var reg=new RegExp("(X)", "g");
chaine=chaine.replace(reg,"D");

var reg=new RegExp("(Y)", "g");
chaine=chaine.replace(reg,"W");

var reg=new RegExp("(Z)", "g");
chaine=chaine.replace(reg,"F");

var reg=new RegExp("(1)", "g");
chaine=chaine.replace(reg,"¤");

var reg=new RegExp("(2)", "g");
chaine=chaine.replace(reg,"(");

var reg=new RegExp("(3)", "g");
chaine=chaine.replace(reg,"/");

var reg=new RegExp("(4)", "g");
chaine=chaine.replace(reg,"# ");

var reg=new RegExp("(5)", "g");
chaine=chaine.replace(reg,")");

var reg=new RegExp("(6)", "g");
chaine=chaine.replace(reg,"[");

var reg=new RegExp("(7)", "g");
chaine=chaine.replace(reg,"£");

var reg=new RegExp("(8)", "g");
chaine=chaine.replace(reg,"/");

var reg=new RegExp("(9)", "g");
chaine=chaine.replace(reg,"]");

var reg=new RegExp("(0)", "g");
chaine=chaine.replace(reg,"@"); 

document.body.innerHTML=chaine;