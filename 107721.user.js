// ==UserScript==
// @name           Turntable Enhance
// @namespace      com.10ninetysix
// @include        http://turntable.fm/*
// @include        https://turntable.fm/*
// @exclude        http://turntable.fm/lobby
// @exclude        https://turntable.fm/lobby
// @description    Live view of 'Awesomes' and 'Lames' while you're listening to music.
// @author         CMurda (Hink)
// @version        0.2
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source)
    source = '(' + source + ')();'
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
}

contentEval("eval(function(p,a,c,k,e,r){e=function(c){return(c\x3Ca?\'\':e(parseInt(c\x2Fa)))+((c=c%a)\x3E35?String.fromCharCode(c+29):c.toString(36))};if(!\'\'.replace(\x2F^\x2F,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return\'\\\\w+\'};c=1};while(c--)if(k[c])p=p.replace(new RegExp(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);return p}(\'6 q(a,b,d,e){i c=\"P\";a==\"X\"\&\&(c=\"10\");$(\"3.O:h\").z(\\\'\x3C3 Y=\"y\" o=\"F:G;H-K:L;M-N:#\\\'+c+\\\';l-v:Q;l-V:W;\"\x3E\x3C8\x3E\\\'+b+\"\x3C\x2F8\x3E\x3C\x2F3\x3E\");4[7].11.12.13+=1c;$(\"3.s 8\").1g();$(\"3.s:D\").z(\\\'\x3C8 o=\"l-v:E;\"\x3E\x3C1j \x2F\x3E\\\'+d+\" + \x2F \"+e+\" -\x3C\x2F8\x3E\")}6 C(a,b){$2=$(\"3.I:h \x3E 3.2:h 3.J:h\");p=$2.5().w(0,$2.5().r(\"(\")-1)==\"\"?$2.5():$2.5().w(0,$2.5().r(\"(\")-1);$2.5(p+\" ( \"+a+\" + \x2F \"+b+\" - )\")}6 t(a){i b;R(a.S){T\"U\":b=4[7].u[a.j.9.x[0][0]].Z,f=a.j.9.f,g=a.j.9.g,b!=m 0\&\&q(a.j.9.x[0][1],b,f,g),C(f,g)}}6 k(){14.15(\"16 17 18 19...\");1a(i a 1b 4)4.A(a)\&\&4[a]!=m 0\&\&4[a].A(\"u\")\&\&(7=a);7==m 0?B(k,1e):4.1f(\"y\",t)}6 n(){1h 4==\"1i\"?k():B(n,1d)}i 7;n();\',62,82,\'||song|div|turntable|html|function|womp|span|metadata||||||upvotes|downvotes|first|var|room|initWomp|font|void|checkWomp|style|scoredata|wompInsertVoteNotification|indexOf|point_display|wompMessageListener|users|size|substring|votelog|message|append|hasOwnProperty|setTimeout|wompUdpateSongLogWithTotalVotes|visible|11px|padding|2px|text|songlog|score|align|center|background|color|messages|90B540|9px|switch|command|case|update_votes|weight|bold|down|class|name|D04141|nodes|chatLog|scrollTop|console|log|Trying|to|initialize|Womp|for|in|9001|100|3E3|addEventListener|remove|typeof|object|br\'.split(\'|\'),0,{}))")