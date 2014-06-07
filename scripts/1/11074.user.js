// ==UserScript==
// @name           CSS Redundancy Gizmo
// @namespace      http://www.workingidea.com/
// @description    Analyzes the use of CSS rules on webpages
// @include        *
// ==/UserScript==
/*
 * jDomQuery 1.1.3.1 is the stripped version of jQuery with only the CSS Selector Engine.
 *
 * graciously taken from
 * jQuery 1.1.3.1 - New Wave Javascript
 *
 * Copyright (c) 2007 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 6=q(a,c){7(2R==u||!u.1T)9 P 6(a,c);9 u.1T(a,c)};6.2e=6.37={1T:q(a,c){a=a||U;7(V a=="W"){9 P 6(c).15(a)}9 u.2H(a.1l==1P&&a||(a.2w||a.x&&a!=2R&&!a.R&&a[0]!=M&&a[0].R)&&6.2d(a)||[a])},2w:"1.1.3.1",1J:q(a){8 b=6(a);b.4b=u;9 b},2H:q(a){u.x=0;[].F.1b(u,a);9 u},1n:q(a,b){9 6.1n(u,a,b)},T:q(c,d,e){8 f=c;7(c.1l==3S)7(d==M)9 u.x&&6[e||"T"](u[0],c)||M;y{f={};f[c]=d}9 u.1n(q(a){v(8 b 1m f)6.T(e?u.K:u,b,6.2t(u,f[b],e,a,b))})},S:q(a,b){9 u.T(a,b,"1z")},15:q(t){8 b=6.2j(u,q(a){9 6.15(t,a)});9 u.1J(/[^+>] [^+>]/.C(t)||t.I("..")>-1?6.2f(b):b)},O:q(t){9 u.1J(6.1L(t)&&6.1O(u,q(a,b){9 t.1b(a,[b])})||6.29(t,u))}};6.1q=6.2e.1q=q(){8 b=1K[0],a=1;7(1K.x==1){b=u;a=0}8 c;1k((c=1K[a++])!=17)v(8 i 1m c)b[i]=c[i];9 b};6.1q({1L:q(a){9!!a&&V a!="W"&&!a.H&&a.1l!=1P&&/q/i.C(a+"")},1I:q(a){9 a.2Q&&a.23&&!a.23.48},H:q(a,b){9 a.H&&a.H.Q()==b.Q()},1n:q(a,b,c){7(a.x==M)v(8 i 1m a)b.1b(a[i],c||[i,a[i]]);y v(8 i=0,2O=a.x;i<2O;i++)7(b.1b(a[i],c||[i,a[i]])===1X)X;9 a},2t:q(a,b,c,d,e){7(6.1L(b))b=b.43(a,[d]);8 f=/z-?3Z|3Y-?3X|14|2G|3U-?1U/i;9 b&&b.1l==3R&&c=="1z"&&!f.C(e)?b+"3P":b},1Q:q(e,o,f){v(8 i 1m o){e.K["2B"+i]=e.K[i];e.K[i]=o[i]}f.1b(e,[]);v(8 i 1m o)e.K[i]=e.K["2B"+i]},S:q(e,p){7(p=="1U"||p=="3J"){8 b={},1H,1A,d=["3F","3D","3A","3y"];6.1n(d,q(){b["3v"+u]=0;b["3u"+u+"3s"]=0});6.1Q(e,b,q(){7(6(e).3p(\':2l\')){1H=e.3m;1A=e.3k}y{e=6(e.3i(11)).15(":1M").3g("1g").3e().S({1R:"10",1v:"38",1i:"2a",36:"0",35:"0"}).33(e.E)[0];8 a=6.S(e.E,"1v")||"1C";7(a=="1C")e.E.K.1v="30";1H=e.2Y;1A=e.2X;7(a=="1C")e.E.K.1v="1C";e.E.2W(e)}});9 p=="1U"?1H:1A}9 6.1z(e,p)},1z:q(a,b,d){8 e;7(b=="14"&&6.L.N){e=6.T(a.K,"14");9 e==""?"1":e}7(b.1s(/1r/i))b=6.Y;7(!d&&a.K[b])e=a.K[b];y 7(U.1w&&U.1w.1V){7(b.1s(/1r/i))b="1r";b=b.J(/([A-Z])/g,"-$1").21();8 f=U.1w.1V(a,17);7(f)e=f.2P(b);y 7(b=="1i")e="20";y 6.1Q(a,{1i:"2a"},q(){8 c=U.1w.1V(u,"");e=c&&c.2P(b)||""})}y 7(a.1Z){8 g=b.J(/\\-(\\w)/g,q(m,c){9 c.Q()});e=a.1Z[b]||a.1Z[g]}9 e},T:q(a,c,d){8 e=6.1I(a)?{}:6.1Y;7(e[c]){7(d!=M)a[e[c]]=d;9 a[e[c]]}y 7(d==M&&6.L.N&&6.H(a,"46")&&(c=="45"||c=="44"))9 a.42(c).41;y 7(a.2Q){7(d!=M)a.40(c,d);7(6.L.N&&/2N|2M/.C(c)&&!6.1I(a))9 a.1G(c,2);9 a.1G(c)}y{7(c=="14"&&6.L.N){7(d!=M){a.2G=1;a.O=(a.O||"").J(/2L\\([^)]*\\)/,"")+(2K(d).2J()=="3W"?"":"2L(14="+d*2I+")")}9 a.O?(2K(a.O.1s(/14=([^)]*)/)[1])/2I).2J():""}c=c.J(/-([a-z])/3V,q(z,b){9 b.Q()});7(d!=M)a[c]=d;9 a[c]}},1E:q(t){9 t.J(/^\\s+|\\s+$/g,"")},2d:q(a){8 r=[];7(V a!="3T")v(8 i=0,2F=a.x;i<2F;i++)r.F(a[i]);y r=a.3Q(0);9 r},1j:q(a,b){v(8 i=0;b[i];i++)a.F(b[i]);9 a},2f:q(a){8 r=[],1S=6.G++;v(8 i=0,2D=a.x;i<2D;i++)7(1S!=a[i].G){a[i].G=1S;r.F(a[i])}9 r},G:0,1O:q(a,b,c){7(V b=="W")b=P 2C("a","i","9 "+b);8 d=[];v(8 i=0,1D=a.x;i<1D;i++)7(!c&&b(a[i],i)||c&&!b(a[i],i))d.F(a[i]);9 d},2j:q(a,b){7(V b=="W")b=P 2C("a","9 "+b);8 c=[];v(8 i=0,1D=a.x;i<1D;i++){8 d=b(a[i],i);7(d!==17&&d!=M){7(d.1l!=1P)d=[d];c=c.3O(d)}}9 c}});P q(){8 b=3M.3L.21();6.L={2A:(b.1s(/.+(?:3K|3I|3H|3G)[\\/: ]([\\d.]+)/)||[])[1],2z:/2x/.C(b),1y:/1y/.C(b),N:/N/.C(b)&&!/1y/.C(b),2v:/2v/.C(b)&&!/(3E|2x)/.C(b)};6.3C=!6.L.N||U.3B=="3z";6.Y=6.L.N?"Y":"2s",6.1Y={"v":"3x","3w":"1u","1r":6.Y,2s:6.Y,Y:6.Y,2q:"2q",1u:"1u",2p:"2p",19:"19",1g:"1g",3r:"3q",1h:"1h",3o:"3n"}};6.1q({1N:{"":"m[2]==\'*\'||6.H(a,m[2])","#":"a.1G(\'1c\')==m[2]",":":{3l:"i<m[3]-0",3j:"i>m[3]-0",1d:"m[3]-0==i",3h:"m[3]-0==i",1f:"i==0",1e:"i==r.x-1",2i:"i%2==0",2h:"i%2","1f-1x":"a.E.2g(\'*\')[0]==a","1e-1x":"6.1d(a.E.2m,1,\'2k\')==a","3f-1x":"!6.1d(a.E.2m,2,\'2k\')",3d:"a.1a",3c:"!a.1a",3b:"(a.3a||a.3t||\'\').I(m[3])>=0",2l:\'"10"!=a.B&&6.S(a,"1i")!="20"&&6.S(a,"1R")!="10"\',10:\'"10"==a.B||6.S(a,"1i")=="20"||6.S(a,"1R")=="10"\',39:"!a.19",19:"a.19",1g:"a.1g",1h:"a.1h||6.T(a,\'1h\')",27:"\'27\'==a.B",1M:"\'1M\'==a.B",2o:"\'2o\'==a.B",2c:"\'2c\'==a.B",2b:"\'2b\'==a.B",2r:"\'2r\'==a.B",2y:"\'2y\'==a.B",2u:"\'2u\'==a.B",1t:\'"1t"==a.B||6.H(a,"1t")\',28:"/28|34|32|1t/i.C(a.H)"},"[":"6.15(m[2],a).x"},2E:[/^\\[ *(@)([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(\\[)\\s*(.*?(\\[.*?\\])?[^[]*?)\\s*\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,P 1B("^([:.#]*)("+(6.1o=6.L.2z&&6.L.2A<"3.0.0"?"\\\\w":"(?:[\\\\w\\31-\\2Z*3N-]|\\\\\\\\.)")+"+)")],29:q(a,b,c){8 d,1F=[];1k(a&&a!=d){d=a;8 f=6.O(a,b,c);a=f.t.J(/^\\s*,\\s*/,"");1F=c?b=f.r:6.1j(1F,f.r)}9 1F},15:q(t,a){7(V t!="W")9[t];7(a&&!a.R)a=17;a=a||U;7(!t.I("//")){a=a.26;t=t.1p(2,t.x)}y 7(!t.I("/")&&!a.23){a=a.26;t=t.1p(1,t.x);7(t.I("/")>=1)t=t.1p(t.I("/"),t.x)}8 b=[a],13=[],1e;1k(t&&1e!=t){8 r=[];1e=t;t=6.1E(t).J(/^\\/\\//,"");8 d=1X;8 e=P 1B("^[/>]\\\\s*("+6.1o+"+)");8 m=e.12(t);7(m){8 f=m[1].Q();v(8 i=0;b[i];i++)v(8 c=b[i].1a;c;c=c.18)7(c.R==1&&(f=="*"||c.H.Q()==f.Q()))r.F(c);b=r;t=t.J(e,"");7(t.I(" ")==0)2V;d=11}y{e=/^((\\/?\\.\\.)|([>\\/+~]))\\s*([a-z]*)/i;7((m=e.12(t))!=17){r=[];8 f=m[4],G=6.G++;m=m[1];v(8 j=0,16=b.x;j<16;j++)7(m.I("..")<0){8 n=m=="~"||m=="+"?b[j].18:b[j].1a;v(;n;n=n.18)7(n.R==1){7(m=="~"&&n.G==G)X;7(!f||n.H.Q()==f.Q()){7(m=="~")n.G=G;r.F(n)}7(m=="+")X}}y r.F(b[j].E);b=r;t=6.1E(t.J(e,""));d=11}}7(t&&!d){7(!t.I(",")){7(a==b[0])b.25();13=6.1j(13,b);r=b=[a];t=" "+t.1p(1,t.x)}y{8 g=P 1B("^("+6.1o+"+)(#)("+6.1o+"+)");8 m=g.12(t);7(m){m=[0,m[2],m[3],m[1]]}y{g=P 1B("^([#.]?)("+6.1o+"*)");m=g.12(t)}m[2]=m[2].J(/\\\\/g,"");8 h=b[b.x-1];7(m[1]=="#"&&h&&h.24){8 k=h.24(m[2]);7((6.L.N||6.L.1y)&&k&&V k.1c=="W"&&k.1c!=m[2])k=6(\'[@1c="\'+m[2]+\'"]\',h)[0];b=r=k&&(!m[3]||6.H(k,m[3]))?[k]:[]}y{v(8 i=0;b[i];i++){8 l=m[1]!=""||m[0]==""?"*":m[2];7(l=="*"&&b[i].H.21()=="2U")l="2T";r=6.1j(r,b[i].2g(l))}7(m[1]==".")r=6.1W(r,m[2]);7(m[1]=="#"){8 o=[];v(8 i=0;r[i];i++)7(r[i].1G("1c")==m[2]){o=[r[i]];X}r=o}b=r}t=t.J(g,"")}}7(t){8 p=6.O(t,r);b=r=p.r;t=6.1E(p.t)}}7(t)b=[];7(b&&a==b[0])b.25();13=6.1j(13,b);9 13},1W:q(r,m,a){m=" "+m+" ";8 b=[];v(8 i=0;r[i];i++){8 c=(" "+r[i].1u+" ").I(m)>=0;7(!a&&c||a&&!c)b.F(r[i])}9 b},O:q(t,r,b){8 d;1k(t&&t!=d){d=t;8 p=6.2E,m;v(8 i=0;p[i];i++){m=p[i].12(t);7(m){t=t.2S(m[0].x);m[2]=m[2].J(/\\\\/g,"");X}}7(!m)X;7(m[1]==":"&&m[2]=="47")r=6.O(m[3],r,11).r;y 7(m[1]==".")r=6.1W(r,m[2],b);y 7(m[1]=="@"){8 e=[],B=m[3];v(8 i=0,16=r.x;i<16;i++){8 a=r[i],z=a[6.1Y[m[2]]||m[2]];7(z==17||/2N|2M/.C(m[2]))z=6.T(a,m[2])||\'\';7((B==""&&!!z||B=="="&&z==m[5]||B=="!="&&z!=m[5]||B=="^="&&z&&!z.I(m[5])||B=="$="&&z.1p(z.x-m[5].x)==m[5]||(B=="*="||B=="~=")&&z.I(m[5])>=0)^b)e.F(a)}r=e}y 7(m[1]==":"&&m[2]=="1d-1x"){8 g=6.G++,e=[],C=/(\\d*)n\\+?(\\d*)/.12(m[3]=="2i"&&"2n"||m[3]=="2h"&&"2n+1"||!/\\D/.C(m[3])&&"n+"+m[3]||m[3]),1f=(C[1]||1)-0,d=C[2]-0;v(8 i=0,16=r.x;i<16;i++){8 h=r[i],E=h.E;7(g!=E.G){8 c=1;v(8 n=E.1a;n;n=n.18)7(n.R==1)n.22=c++;E.G=g}8 j=1X;7(1f==1){7(d==0||h.22==d)j=11}y 7((h.22+d)%1f==0)j=11;7(j^b)e.F(h)}r=e}y{8 f=6.1N[m[1]];7(V f!="W")f=6.1N[m[1]][m[2]];4a("f = q(a,i){9 "+f+"}");r=6.1O(r,f,b)}}9{r:r,t:t}},49:q(a){8 b=[];8 c=a.E;1k(c&&c!=U){b.F(c);c=c.E}9 b},1d:q(a,b,c,d){b=b||1;8 e=0;v(;a;a=a[c])7(a.R==1&&++e==b)X;9 a},4c:q(n,a){8 r=[];v(;n;n=n.18){7(n.R==1&&(!a||n!=a))r.F(n)}9 r}});',62,261,'||||||jDomQuery|if|var|return|||||||||||||||||function||||this|for||length|else|||type|test||parentNode|push|mergeNum|nodeName|indexOf|replace|style|browser|undefined|msie|filter|new|toUpperCase|nodeType|css|attr|document|typeof|string|break|styleFloat||hidden|true|exec|done|opacity|find|rl|null|nextSibling|disabled|firstChild|apply|id|nth|last|first|checked|selected|display|merge|while|constructor|in|each|chars|substr|extend|float|match|button|className|position|defaultView|child|opera|curCSS|oWidth|RegExp|static|el|trim|cur|getAttribute|oHeight|isXMLDoc|pushStack|arguments|isFunction|radio|expr|grep|Array|swap|visibility|num|init|height|getComputedStyle|classFilter|false|props|currentStyle|none|toLowerCase|nodeIndex|ownerDocument|getElementById|shift|documentElement|text|input|multiFilter|block|password|file|makeArray|fn|unique|getElementsByTagName|odd|even|map|previousSibling|visible|lastChild||checkbox|value|innerHTML|submit|cssFloat|prop|reset|mozilla|jquery|webkit|image|safari|version|old|Function|fl|parse|al|zoom|setArray|100|toString|parseFloat|alpha|src|href|ol|getPropertyValue|tagName|window|substring|param|object|continue|removeChild|clientWidth|clientHeight|uFFFF|relative|u0128|textarea|appendTo|select|left|right|prototype|absolute|enabled|textContent|contains|empty|parent|end|only|removeAttr|eq|cloneNode|gt|offsetWidth|lt|offsetHeight|maxLength|maxlength|is|readOnly|readonly|Width|innerText|border|padding|class|htmlFor|Left|CSS1Compat|Right|compatMode|boxModel|Bottom|compatible|Top|ie|ra|it|width|rv|userAgent|navigator|_|concat|px|slice|Number|String|array|line|ig|NaN|weight|font|index|setAttribute|nodeValue|getAttributeNode|call|method|action|form|not|body|parents|eval|prevObject|sibling'.split('|'),0,{}));
var classes = new Array();
var ids = new Array();
var s_ids = new Array();
var styleRules = new Array();
window.csso = function() {
	//console.log("page: "+document.domain);
	if (!document.styleSheets) return;
	var theRules = new Array();
	for(i = 0; i < document.styleSheets.length; i++)
	{
		if (document.styleSheets[i].cssRules)
			styleRules.push(document.styleSheets[i].cssRules);
		else if (document.styleSheets[i].rules)
			styleRules.push(document.styleSheets[i].rules);
	}
	
	if(console)
		consoleWrite = console.log;
	else
		consoleWrite = GM_log;
	
	var total = 0;
	var unused = 0;
	for(k = 0; k < styleRules.length; k++)
	{
		for(n = 0; n < styleRules[k].length; n++)
		{
			if(styleRules[k][n].selectorText.indexOf(":hover") == -1 &&
				styleRules[k][n].selectorText.indexOf(":visited") == -1 &&
			styleRules[k][n].selectorText.indexOf(":active") == -1 &&
			styleRules[k][n].selectorText.indexOf(":link") == -1)
			{
				if(jDomQuery.find(styleRules[k][n].selectorText).length == 0)
				{
					consoleWrite(styleRules[k][n].parentStyleSheet.href+" | "+styleRules[k][n].selectorText);
					unused++;
				}
			}
			total++;
		}
	}
	var finished = "Finished. Total Rules="+total+", Unused="+unused;
	consoleWrite(finished);
	
}
GM_registerMenuCommand("CSS Overlap", csso);
