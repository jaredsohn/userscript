// ==UserScript==
// @name           Freedom Wars (Non-Premium Tribal Wars Modification)
// @namespace      Freedom Wars (Non-Premium Tribal Wars Modification)
// @include        http://*.tribalwars.net/game.php*
// ==/UserScript==

// ==SCRIPT MAP==------------------------------------------

// -> [PAGE FILTER]
//
// -> [EXTERNAL SCRIPTS]
//
// -> [VARIABLE SETUP]
//		-> pName		(name of player)						[str]
//		-> pPoints		(points of player)						[int]
//		-> pRank		(rank of player)						[int]	
//		-> pVillages	(villages owned by player)				[int]
//
//		-> vID			(ID of active village)					[int]
//		-> vName		(name of active village)				[str]
//		-> vCoordX		(x coord of active village)				[int]
//		-> vCoordY		(y coord of active village)				[int]
//		-> vContinent	(continent of 	active village)			[str]
//		-> vWarGroup	(war group of active village)			[str]
//
//		-> baseURL		(http://xx00.tribalwars.abc)			[str]
//		-> gameURL		(http://xx00.tribalwars.abc/game.php)	[str]
//		-> screen		(active game screen)					[str]
//		-> mode			(active game screen mode)				[str]
//		-> hash			(session hash)							[str]
//
//		-> search 		(throwaway RegExp variable)				[str]
//		-> language		(current language)						[str]
//		-> world		(current world)							[str]
//
//		-> twInterface											[array]
//
//		-> pMain												[table]
//
//		-> DebugMode	(log errors)							[int]
//
//		-> sWidth		(width of main table in pixels)			[str]
//		-> sWarGroup	(show wargroup?)						[flag]
//
// -> [VARIABLE SETUP]
//
// -> [MAIN SEQUENCE]
//
// -> [USER INFORMATION]
//		-> FW_UserInfo()
//		-> FW_SetupScriptInfo()
//		-> FW_SetupUserInfo()
//		-> FW_RefreshScriptInfo()
//
// -> [VARIABLES]	
//		-> FW_Variables()
//
// -> [INTERFACE]
//		-> FW_interface_AddStyles()
//		-> FW_interface_BuildMenu()
//		-> FW_interface_BuildQuickMenu()
//		-> FW_interface_BuildPlayerBar()
//		-> FW_interface_RenderMenu()
//		-> FW_interface_Clean()
//		-> FW_interface_Render()
//
//	-> [PAGE MODIFICATIONS]
//		-> FW_Screen_Map()
//		-> FW_Screen_Report()
//		-> FW_Screen_Info_Player()
//		-> FW_Screen_Info_Village()
//		-> FW_Screen_Overview_Villages()
//		-> FW_Screen_Settings_Custom()
//		-> FW_Screen_Rally_Point()
//		-> FW_Screen_Favorite_Villages()
//
//		-> FW_Screen_Mist()
//
// -> [GENERAL FUNCTIONS]	
//		-> getContinent(x, y)
//		-> getWarGroup(x, y)
//		-> getParam(name)
//		-> substrsub(str, start, stop)
//		-> addGlobalStyle(css)
//		-> addGlobalJS(js)
//		-> addTableRow(oTable, id, colSpan, text, pos)

// =/SCRIPT MAP==------------------------------------------

//__________________________________________________________________________________________________________________//
// PAGE FILTER
//__________________________________________________________________________________________________________________//

var url = window.location.href;
	
if ( url.indexOf( 'captcha.php' ) == -1 ) {
	var urlRemoved = 0;
	var urlRemove = new Array();

	urlRemove[0]	=	'&intro';
	urlRemove[1]	=	'&popup';

	for ( key in urlRemove ) {
		if ( url.search( urlRemove[key] ) != -1 ) {
			url = url.replace( urlRemove[key], '' );
			
			urlRemoved = 1;
		}
	}

	if ( urlRemoved == 1 ) {
		window.location = url;
	}
}

//__________________________________________________________________________________________________________________//
// EXTERNAL SCRIPTS
//__________________________________________________________________________________________________________________//

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('q(1v 1F.6=="S"){1F.S=1F.S;B 6=u(a,c){q(1F==7)v 1p 6(a,c);a=a||1h;q(6.1r(a))v 1p 6(1h)[6.E.39?"39":"36"](a);q(1v a=="21"){B m=/^[^<]*(<(.|\\s)+>)[^>]*$/.2D(a);q(m)a=6.3C([m[1]]);K v 1p 6(c).2i(a)}v 7.5g(a.1l==2L&&a||(a.3h||a.I&&a!=1F&&!a.20&&a[0]!=S&&a[0].20)&&6.40(a)||[a])};q(1v $!="S")6.38$=$;B $=6;6.E=6.8e={3h:"1.1.2",89:u(){v 7.I},I:0,29:u(1R){v 1R==S?6.40(7):7[1R]},2l:u(a){B L=6(a);L.5J=7;v L},5g:u(a){7.I=0;[].1g.11(7,a);v 7},J:u(E,1x){v 6.J(7,E,1x)},2f:u(1a){B 4k=-1;7.J(u(i){q(7==1a)4k=i});v 4k},1D:u(22,P,C){B 1a=22;q(22.1l==3j)q(P==S)v 7.I&&6[C||"1D"](7[0],22)||S;K{1a={};1a[22]=P}v 7.J(u(2f){Q(B G 1z 1a)6.1D(C?7.1u:7,G,6.G(7,1a[G],C,2f,G))})},1n:u(22,P){v 7.1D(22,P,"2V")},2H:u(e){q(1v e=="21")v 7.44().41(1h.8q(e));B t="";6.J(e||7,u(){6.J(7.2J,u(){q(7.20!=8)t+=7.20!=1?7.67:6.E.2H([7])})});v t},2I:u(){B a=6.3C(1A);v 7.J(u(){B b=a[0].3R(V);7.Y.2O(b,7);1Y(b.18)b=b.18;b.4H(7)})},41:u(){v 7.2Y(1A,V,1,u(a){7.4H(a)})},5R:u(){v 7.2Y(1A,V,-1,u(a){7.2O(a,7.18)})},5Q:u(){v 7.2Y(1A,14,1,u(a){7.Y.2O(a,7)})},5L:u(){v 7.2Y(1A,14,-1,u(a){7.Y.2O(a,7.2d)})},4z:u(){v 7.5J||6([])},2i:u(t){v 7.2l(6.2T(7,u(a){v 6.2i(t,a)}),t)},4w:u(4v){v 7.2l(6.2T(7,u(a){B a=a.3R(4v!=S?4v:V);a.$1I=17;v a}))},1y:u(t){v 7.2l(6.1r(t)&&6.2o(7,u(2w,2f){v t.11(2w,[2f])})||6.3v(t,7))},2b:u(t){v 7.2l(t.1l==3j&&6.3v(t,7,V)||6.2o(7,u(a){v(t.1l==2L||t.3h)?6.3i(a,t)<0:a!=t}))},1M:u(t){v 7.2l(6.2h(7.29(),t.1l==3j?6(t).29():t.I!=S&&(!t.1c||t.1c=="7m")?t:[t]))},4f:u(1q){v 1q?6.1y(1q,7).r.I>0:14},19:u(19){v 19==S?(7.I?7[0].P:17):7.1D("P",19)},4d:u(19){v 19==S?(7.I?7[0].2C:17):7.44().41(19)},2Y:u(1x,1O,3p,E){B 4w=7.I>1;B a=6.3C(1x);q(3p<0)a.6X();v 7.J(u(){B 1a=7;q(1O&&6.1c(7,"1O")&&6.1c(a[0],"3u"))1a=7.5e("1V")[0]||7.4H(1h.5d("1V"));6.J(a,u(){E.11(1a,[4w?7.3R(V):7])})})}};6.1w=6.E.1w=u(){B 1U=1A[0],a=1;q(1A.I==1){1U=7;a=0}B G;1Y(G=1A[a++])Q(B i 1z G)1U[i]=G[i];v 1U};6.1w({6G:u(){q(6.38$)$=6.38$;v 6},1r:u(E){v!!E&&1v E!="21"&&!E.1c&&1v E[0]=="S"&&/u/i.1m(E+"")},48:u(D){v D.52&&D.50&&!D.50.4Z},1c:u(D,W){v D.1c&&D.1c.3d()==W.3d()},J:u(1a,E,1x){q(1a.I==S)Q(B i 1z 1a)E.11(1a[i],1x||[i,1a[i]]);K Q(B i=0,6p=1a.I;i<6p;i++)q(E.11(1a[i],1x||[i,1a[i]])===14)3Y;v 1a},G:u(D,P,C,2f,G){q(6.1r(P))P=P.43(D,[2f]);B 6i=/z-?2f|8s-?8p|1b|6c|8j-?25/i;v P&&P.1l==3X&&C=="2V"&&!6i.1m(G)?P+"4R":P},16:{1M:u(D,c){6.J(c.3W(/\\s+/),u(i,O){q(!6.16.35(D.16,O))D.16+=(D.16?" ":"")+O})},2e:u(D,c){D.16=c?6.2o(D.16.3W(/\\s+/),u(O){v!6.16.35(c,O)}).64(" "):""},35:u(t,c){t=t.16||t;c=c.1T(/([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:])/g,"\\\\$1");v t&&1p 4O("(^|\\\\s)"+c+"(\\\\s|$)").1m(t)}},4N:u(e,o,f){Q(B i 1z o){e.1u["1K"+i]=e.1u[i];e.1u[i]=o[i]}f.11(e,[]);Q(B i 1z o)e.1u[i]=e.1u["1K"+i]},1n:u(e,p){q(p=="25"||p=="3P"){B 1K={},3O,3M,d=["88","87","86","83"];6.J(d,u(){1K["82"+7]=0;1K["80"+7+"7Z"]=0});6.4N(e,1K,u(){q(6.1n(e,"1e")!="1X"){3O=e.7Y;3M=e.7X}K{e=6(e.3R(V)).2i(":4C").5N("2S").4z().1n({4A:"1G",3G:"7V",1e:"2E",7S:"0",7R:"0"}).5C(e.Y)[0];B 2X=6.1n(e.Y,"3G");q(2X==""||2X=="4u")e.Y.1u.3G="7O";3O=e.7L;3M=e.7K;q(2X==""||2X=="4u")e.Y.1u.3G="4u";e.Y.3B(e)}});v p=="25"?3O:3M}v 6.2V(e,p)},2V:u(D,G,5z){B L;q(G=="1b"&&6.12.1k)v 6.1D(D.1u,"1b");q(G=="4r"||G=="2A")G=6.12.1k?"3y":"2A";q(!5z&&D.1u[G])L=D.1u[G];K q(1h.3x&&1h.3x.4q){q(G=="2A"||G=="3y")G="4r";G=G.1T(/([A-Z])/g,"-$1").4o();B O=1h.3x.4q(D,17);q(O)L=O.5x(G);K q(G=="1e")L="1X";K 6.4N(D,{1e:"2E"},u(){B c=1h.3x.4q(7,"");L=c&&c.5x(G)||""})}K q(D.4m){B 5t=G.1T(/\\-(\\w)/g,u(m,c){v c.3d()});L=D.4m[G]||D.4m[5t]}v L},3C:u(a){B r=[];6.J(a,u(i,1s){q(!1s)v;q(1s.1l==3X)1s=1s.7r();q(1v 1s=="21"){B s=6.2N(1s),1N=1h.5d("1N"),28=[];B 2I=!s.15("<1t")&&[1,"<3q>","</3q>"]||(!s.15("<7h")||!s.15("<1V")||!s.15("<7g"))&&[1,"<1O>","</1O>"]||!s.15("<3u")&&[2,"<1O><1V>","</1V></1O>"]||(!s.15("<7c")||!s.15("<7a"))&&[3,"<1O><1V><3u>","</3u></1V></1O>"]||[0,"",""];1N.2C=2I[1]+s+2I[2];1Y(2I[0]--)1N=1N.18;q(6.12.1k){q(!s.15("<1O")&&s.15("<1V")<0)28=1N.18&&1N.18.2J;K q(2I[1]=="<1O>"&&s.15("<1V")<0)28=1N.2J;Q(B n=28.I-1;n>=0;--n)q(6.1c(28[n],"1V")&&!28[n].2J.I)28[n].Y.3B(28[n])}1s=[];Q(B i=0,l=1N.2J.I;i<l;i++)1s.1g(1N.2J[i])}q(1s.I===0&&!6.1c(1s,"3k"))v;q(1s[0]==S||6.1c(1s,"3k"))r.1g(1s);K r=6.2h(r,1s)});v r},1D:u(D,W,P){B 2j=6.48(D)?{}:{"Q":"73","72":"16","4r":6.12.1k?"3y":"2A",2A:6.12.1k?"3y":"2A",2C:"2C",16:"16",P:"P",2P:"2P",2S:"2S",70:"6Y",2Q:"2Q"};q(W=="1b"&&6.12.1k&&P!=S){D.6c=1;v D.1y=D.1y.1T(/49\\([^\\)]*\\)/6T,"")+(P==1?"":"49(1b="+P*5r+")")}K q(W=="1b"&&6.12.1k)v D.1y?4g(D.1y.6P(/49\\(1b=(.*)\\)/)[1])/5r:1;q(W=="1b"&&6.12.3r&&P==1)P=0.6M;q(2j[W]){q(P!=S)D[2j[W]]=P;v D[2j[W]]}K q(P==S&&6.12.1k&&6.1c(D,"3k")&&(W=="6L"||W=="6J"))v D.6I(W).67;K q(D.52){q(P!=S)D.6H(W,P);q(6.12.1k&&/5a|3z/.1m(W)&&!6.48(D))v D.31(W,2);v D.31(W)}K{W=W.1T(/-([a-z])/6E,u(z,b){v b.3d()});q(P!=S)D[W]=P;v D[W]}},2N:u(t){v t.1T(/^\\s+|\\s+$/g,"")},40:u(a){B r=[];q(a.1l!=2L)Q(B i=0,2x=a.I;i<2x;i++)r.1g(a[i]);K r=a.3D(0);v r},3i:u(b,a){Q(B i=0,2x=a.I;i<2x;i++)q(a[i]==b)v i;v-1},2h:u(2y,3E){B r=[].3D.43(2y,0);Q(B i=0,54=3E.I;i<54;i++)q(6.3i(3E[i],r)==-1)2y.1g(3E[i]);v 2y},2o:u(1P,E,47){q(1v E=="21")E=1p 4J("a","i","v "+E);B 1f=[];Q(B i=0,2w=1P.I;i<2w;i++)q(!47&&E(1P[i],i)||47&&!E(1P[i],i))1f.1g(1P[i]);v 1f},2T:u(1P,E){q(1v E=="21")E=1p 4J("a","v "+E);B 1f=[],r=[];Q(B i=0,2w=1P.I;i<2w;i++){B 19=E(1P[i],i);q(19!==17&&19!=S){q(19.1l!=2L)19=[19];1f=1f.6y(19)}}B r=1f.I?[1f[0]]:[];5S:Q(B i=1,5V=1f.I;i<5V;i++){Q(B j=0;j<i;j++)q(1f[i]==r[j])4Y 5S;r.1g(1f[i])}v r}});1p u(){B b=6t.6s.4o();6.12={3c:/6o/.1m(b),45:/45/.1m(b),1k:/1k/.1m(b)&&!/45/.1m(b),3r:/3r/.1m(b)&&!/(8y|6o)/.1m(b)};6.8x=!6.12.1k||1h.8w=="8v"};6.J({6h:"a.Y",4V:"6.4V(a)",8t:"6.27(a,2,\'2d\')",8r:"6.27(a,2,\'6m\')",8n:"6.2K(a.Y.18,a)",8m:"6.2K(a.18)"},u(i,n){6.E[i]=u(a){B L=6.2T(7,n);q(a&&1v a=="21")L=6.3v(a,L);v 7.2l(L)}});6.J({5C:"41",8l:"5R",2O:"5Q",8k:"5L"},u(i,n){6.E[i]=u(){B a=1A;v 7.J(u(){Q(B j=0,2x=a.I;j<2x;j++)6(a[j])[n](7)})}});6.J({5N:u(22){6.1D(7,22,"");7.8i(22)},8h:u(c){6.16.1M(7,c)},8g:u(c){6.16.2e(7,c)},8f:u(c){6.16[6.16.35(7,c)?"2e":"1M"](7,c)},2e:u(a){q(!a||6.1y(a,[7]).r.I)7.Y.3B(7)},44:u(){1Y(7.18)7.3B(7.18)}},u(i,n){6.E[i]=u(){v 7.J(n,1A)}});6.J(["6b","6a","69","68"],u(i,n){6.E[n]=u(1R,E){v 7.1y(":"+n+"("+1R+")",E)}});6.J(["25","3P"],u(i,n){6.E[n]=u(h){v h==S?(7.I?6.1n(7[0],n):17):7.1n(n,h.1l==3j?h:h+"4R")}});6.1w({1q:{"":"m[2]==\'*\'||6.1c(a,m[2])","#":"a.31(\'2Z\')==m[2]",":":{6a:"i<m[3]-0",69:"i>m[3]-0",27:"m[3]-0==i",6b:"m[3]-0==i",2y:"i==0",37:"i==r.I-1",66:"i%2==0",65:"i%2","27-3V":"6.27(a.Y.18,m[3],\'2d\',a)==a","2y-3V":"6.27(a.Y.18,1,\'2d\')==a","37-3V":"6.27(a.Y.8d,1,\'6m\')==a","8c-3V":"6.2K(a.Y.18).I==1",6h:"a.18",44:"!a.18",68:"6.E.2H.11([a]).15(m[3])>=0",34:\'a.C!="1G"&&6.1n(a,"1e")!="1X"&&6.1n(a,"4A")!="1G"\',1G:\'a.C=="1G"||6.1n(a,"1e")=="1X"||6.1n(a,"4A")=="1G"\',8b:"!a.2P",2P:"a.2P",2S:"a.2S",2Q:"a.2Q||6.1D(a,\'2Q\')",2H:"a.C==\'2H\'",4C:"a.C==\'4C\'",63:"a.C==\'63\'",4Q:"a.C==\'4Q\'",62:"a.C==\'62\'",4P:"a.C==\'4P\'",61:"a.C==\'61\'",60:"a.C==\'60\'",3S:\'a.C=="3S"||6.1c(a,"3S")\',5Z:"/5Z|3q|8a|3S/i.1m(a.1c)"},".":"6.16.35(a,m[2])","@":{"=":"z==m[4]","!=":"z!=m[4]","^=":"z&&!z.15(m[4])","$=":"z&&z.2M(z.I - m[4].I,m[4].I)==m[4]","*=":"z&&z.15(m[4])>=0","":"z",4M:u(m){v["",m[1],m[3],m[2],m[5]]},5Y:"z=a[m[3]];q(!z||/5a|3z/.1m(m[3]))z=6.1D(a,m[3]);"},"[":"6.2i(m[2],a).I"},5X:[/^\\[ *(@)([a-2g-3Q-]*) *([!*$^=]*) *(\'?"?)(.*?)\\4 *\\]/i,/^(\\[)\\s*(.*?(\\[.*?\\])?[^[]*?)\\s*\\]/,/^(:)([a-2g-3Q-]*)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/i,/^([:.#]*)([a-2g-3Q*-]*)/i],1S:[/^(\\/?\\.\\.)/,"a.Y",/^(>|\\/)/,"6.2K(a.18)",/^(\\+)/,"6.27(a,2,\'2d\')",/^(~)/,u(a){B s=6.2K(a.Y.18);v s.3D(6.3i(a,s)+1)}],3v:u(1q,1P,2b){B 1K,O=[];1Y(1q&&1q!=1K){1K=1q;B f=6.1y(1q,1P,2b);1q=f.t.1T(/^\\s*,\\s*/,"");O=2b?1P=f.r:6.2h(O,f.r)}v O},2i:u(t,1C){q(1v t!="21")v[t];q(1C&&!1C.20)1C=17;1C=1C||1h;q(!t.15("//")){1C=1C.4L;t=t.2M(2,t.I)}K q(!t.15("/")){1C=1C.4L;t=t.2M(1,t.I);q(t.15("/")>=1)t=t.2M(t.15("/"),t.I)}B L=[1C],2a=[],37=17;1Y(t&&37!=t){B r=[];37=t;t=6.2N(t).1T(/^\\/\\//i,"");B 3N=14;B 1H=/^[\\/>]\\s*([a-2g-9*-]+)/i;B m=1H.2D(t);q(m){6.J(L,u(){Q(B c=7.18;c;c=c.2d)q(c.20==1&&(6.1c(c,m[1])||m[1]=="*"))r.1g(c)});L=r;t=t.1T(1H,"");q(t.15(" ")==0)4Y;3N=V}K{Q(B i=0;i<6.1S.I;i+=2){B 1H=6.1S[i];B m=1H.2D(t);q(m){r=L=6.2T(L,6.1r(6.1S[i+1])?6.1S[i+1]:u(a){v 3L(6.1S[i+1])});t=6.2N(t.1T(1H,""));3N=V;3Y}}}q(t&&!3N){q(!t.15(",")){q(L[0]==1C)L.4K();6.2h(2a,L);r=L=[1C];t=" "+t.2M(1,t.I)}K{B 32=/^([a-2g-3Q-]+)(#)([a-2g-9\\\\*38-]*)/i;B m=32.2D(t);q(m){m=[0,m[2],m[3],m[1]]}K{32=/^([#.]?)([a-2g-9\\\\*38-]*)/i;m=32.2D(t)}q(m[1]=="#"&&L[L.I-1].5W){B 2m=L[L.I-1].5W(m[2]);q(6.12.1k&&2m&&2m.2Z!=m[2])2m=6(\'[@2Z="\'+m[2]+\'"]\',L[L.I-1])[0];L=r=2m&&(!m[3]||6.1c(2m,m[3]))?[2m]:[]}K{q(m[1]==".")B 4I=1p 4O("(^|\\\\s)"+m[2]+"(\\\\s|$)");6.J(L,u(){B 3K=m[1]!=""||m[0]==""?"*":m[2];q(6.1c(7,"84")&&3K=="*")3K="30";6.2h(r,m[1]!=""&&L.I!=1?6.4G(7,[],m[1],m[2],4I):7.5e(3K))});q(m[1]=="."&&L.I==1)r=6.2o(r,u(e){v 4I.1m(e.16)});q(m[1]=="#"&&L.I==1){B 5U=r;r=[];6.J(5U,u(){q(7.31("2Z")==m[2]){r=[7];v 14}})}L=r}t=t.1T(32,"")}}q(t){B 19=6.1y(t,r);L=r=19.r;t=6.2N(19.t)}}q(L&&L[0]==1C)L.4K();6.2h(2a,L);v 2a},1y:u(t,r,2b){1Y(t&&/^[a-z[({<*:.#]/i.1m(t)){B p=6.5X,m;6.J(p,u(i,1H){m=1H.2D(t);q(m){t=t.81(m[0].I);q(6.1q[m[1]].4M)m=6.1q[m[1]].4M(m);v 14}});q(m[1]==":"&&m[2]=="2b")r=6.1y(m[3],r,V).r;K q(m[1]=="."){B 1H=1p 4O("(^|\\\\s)"+m[2]+"(\\\\s|$)");r=6.2o(r,u(e){v 1H.1m(e.16||"")},2b)}K{B f=6.1q[m[1]];q(1v f!="21")f=6.1q[m[1]][m[2]];3L("f = u(a,i){"+(6.1q[m[1]].5Y||"")+"v "+f+"}");r=6.2o(r,f,2b)}}v{r:r,t:t}},4G:u(o,r,1S,W,1H){Q(B s=o.18;s;s=s.2d)q(s.20==1){B 1M=V;q(1S==".")1M=s.16&&1H.1m(s.16);K q(1S=="#")1M=s.31("2Z")==W;q(1M)r.1g(s);q(1S=="#"&&r.I)3Y;q(s.18)6.4G(s,r,1S,W,1H)}v r},4V:u(D){B 4F=[];B O=D.Y;1Y(O&&O!=1h){4F.1g(O);O=O.Y}v 4F},27:u(O,1f,3p,D){1f=1f||1;B 1R=0;Q(;O;O=O[3p]){q(O.20==1)1R++;q(1R==1f||1f=="66"&&1R%2==0&&1R>1&&O==D||1f=="65"&&1R%2==1&&O==D)v O}},2K:u(n,D){B r=[];Q(;n;n=n.2d){q(n.20==1&&(!D||n!=D))r.1g(n)}v r}});6.H={1M:u(T,C,1i,F){q(6.12.1k&&T.4E!=S)T=1F;q(F)1i.F=F;q(!1i.2s)1i.2s=7.2s++;q(!T.$1I)T.$1I={};B 2W=T.$1I[C];q(!2W){2W=T.$1I[C]={};q(T["2U"+C])2W[0]=T["2U"+C]}2W[1i.2s]=1i;T["2U"+C]=7.5P;q(!7.1j[C])7.1j[C]=[];7.1j[C].1g(T)},2s:1,1j:{},2e:u(T,C,1i){q(T.$1I){B i,j,k;q(C&&C.C){1i=C.1i;C=C.C}q(C&&T.$1I[C])q(1i)5O T.$1I[C][1i.2s];K Q(i 1z T.$1I[C])5O T.$1I[C][i];K Q(j 1z T.$1I)7.2e(T,j);Q(k 1z T.$1I[C])q(k){k=V;3Y}q(!k)T["2U"+C]=17}},1Q:u(C,F,T){F=6.40(F||[]);q(!T)6.J(7.1j[C]||[],u(){6.H.1Q(C,F,7)});K{B 1i=T["2U"+C],19,E=6.1r(T[C]);q(1i){F.5M(7.2j({C:C,1U:T}));q((19=1i.11(T,F))!==14)7.4B=V}q(E&&19!==14)T[C]();7.4B=14}},5P:u(H){q(1v 6=="S"||6.H.4B)v;H=6.H.2j(H||1F.H||{});B 3H;B c=7.$1I[H.C];B 1x=[].3D.43(1A,1);1x.5M(H);Q(B j 1z c){1x[0].1i=c[j];1x[0].F=c[j].F;q(c[j].11(7,1x)===14){H.2k();H.2B();3H=14}}q(6.12.1k)H.1U=H.2k=H.2B=H.1i=H.F=17;v 3H},2j:u(H){q(!H.1U&&H.5K)H.1U=H.5K;q(H.5I==S&&H.5H!=S){B e=1h.4L,b=1h.4Z;H.5I=H.5H+(e.5G||b.5G);H.7W=H.7U+(e.5F||b.5F)}q(6.12.3c&&H.1U.20==3){B 2R=H;H=6.1w({},2R);H.1U=2R.1U.Y;H.2k=u(){v 2R.2k()};H.2B=u(){v 2R.2B()}}q(!H.2k)H.2k=u(){7.3H=14};q(!H.2B)H.2B=u(){7.7T=V};v H}};6.E.1w({3F:u(C,F,E){v 7.J(u(){6.H.1M(7,C,E||F,F)})},5E:u(C,F,E){v 7.J(u(){6.H.1M(7,C,u(H){6(7).5D(H);v(E||F).11(7,1A)},F)})},5D:u(C,E){v 7.J(u(){6.H.2e(7,C,E)})},1Q:u(C,F){v 7.J(u(){6.H.1Q(C,F,7)})},3I:u(){B a=1A;v 7.5B(u(e){7.4x=7.4x==0?1:0;e.2k();v a[7.4x].11(7,[e])||14})},7Q:u(f,g){u 4X(e){B p=(e.C=="3U"?e.7P:e.7N)||e.7M;1Y(p&&p!=7)2z{p=p.Y}2G(e){p=7};q(p==7)v 14;v(e.C=="3U"?f:g).11(7,[e])}v 7.3U(4X).5A(4X)},39:u(f){q(6.3T)f.11(1h,[6]);K{6.3b.1g(u(){v f.11(7,[6])})}v 7}});6.1w({3T:14,3b:[],39:u(){q(!6.3T){6.3T=V;q(6.3b){6.J(6.3b,u(){7.11(1h)});6.3b=17}q(6.12.3r||6.12.45)1h.7J("7I",6.39,14)}}});1p u(){6.J(("7F,7E,36,7D,7C,4s,5B,7B,"+"7A,7z,7y,3U,5A,7x,3q,"+"4P,7w,7v,7u,2v").3W(","),u(i,o){6.E[o]=u(f){v f?7.3F(o,f):7.1Q(o)}})};q(6.12.1k)6(1F).5E("4s",u(){B 1j=6.H.1j;Q(B C 1z 1j){B 4p=1j[C],i=4p.I;q(i&&C!=\'4s\')7t 6.H.2e(4p[i-1],C);1Y(--i)}});6.E.1w({7s:u(U,1Z,M){7.36(U,1Z,M,1)},36:u(U,1Z,M,1W){q(6.1r(U))v 7.3F("36",U);M=M||u(){};B C="5w";q(1Z)q(6.1r(1Z)){M=1Z;1Z=17}K{1Z=6.30(1Z);C="5v"}B 46=7;6.3f({U:U,C:C,F:1Z,1W:1W,2c:u(2F,10){q(10=="2t"||!1W&&10=="5s")46.1D("2C",2F.3g).4j().J(M,[2F.3g,10,2F]);K M.11(46,[2F.3g,10,2F])}});v 7},7o:u(){v 6.30(7)},4j:u(){v 7.2i("4i").J(u(){q(7.3z)6.5q(7.3z);K 6.4h(7.2H||7.7n||7.2C||"")}).4z()}});q(!1F.3s)3s=u(){v 1p 7l("7j.7i")};6.J("5p,5o,5n,5m,5l,5k".3W(","),u(i,o){6.E[o]=u(f){v 7.3F(o,f)}});6.1w({29:u(U,F,M,C,1W){q(6.1r(F)){M=F;F=17}v 6.3f({U:U,F:F,2t:M,4e:C,1W:1W})},7f:u(U,F,M,C){v 6.29(U,F,M,C,1)},5q:u(U,M){v 6.29(U,17,M,"4i")},7b:u(U,F,M){v 6.29(U,F,M,"5j")},79:u(U,F,M,C){q(6.1r(F)){M=F;F={}}v 6.3f({C:"5v",U:U,F:F,2t:M,4e:C})},78:u(23){6.3o.23=23},77:u(5i){6.1w(6.3o,5i)},3o:{1j:V,C:"5w",23:0,5h:"76/x-75-3k-74",5f:V,3l:V,F:17},3m:{},3f:u(s){s=6.1w({},6.3o,s);q(s.F){q(s.5f&&1v s.F!="21")s.F=6.30(s.F);q(s.C.4o()=="29"){s.U+=((s.U.15("?")>-1)?"&":"?")+s.F;s.F=17}}q(s.1j&&!6.4b++)6.H.1Q("5p");B 4c=14;B N=1p 3s();N.71(s.C,s.U,s.3l);q(s.F)N.3n("6Z-7d",s.5h);q(s.1W)N.3n("7e-4a-6W",6.3m[s.U]||"6V, 6U 6S 7k 4l:4l:4l 6R");N.3n("X-6Q-7p","3s");q(N.7q)N.3n("6O","6N");q(s.5u)s.5u(N);q(s.1j)6.H.1Q("5k",[N,s]);B 3t=u(4n){q(N&&(N.6K==4||4n=="23")){4c=V;q(3w){5c(3w);3w=17}B 10;2z{10=6.5b(N)&&4n!="23"?s.1W&&6.6q(N,s.U)?"5s":"2t":"2v";q(10!="2v"){B 3J;2z{3J=N.4y("59-4a")}2G(e){}q(s.1W&&3J)6.3m[s.U]=3J;B F=6.5y(N,s.4e);q(s.2t)s.2t(F,10);q(s.1j)6.H.1Q("5l",[N,s])}K 6.3A(s,N,10)}2G(e){10="2v";6.3A(s,N,10,e)}q(s.1j)6.H.1Q("5n",[N,s]);q(s.1j&&!--6.4b)6.H.1Q("5o");q(s.2c)s.2c(N,10);q(s.3l)N=17}};B 3w=4E(3t,13);q(s.23>0)58(u(){q(N){N.6F();q(!4c)3t("23")}},s.23);2z{N.7G(s.F)}2G(e){6.3A(s,N,17,e)}q(!s.3l)3t();v N},3A:u(s,N,10,e){q(s.2v)s.2v(N,10,e);q(s.1j)6.H.1Q("5m",[N,s,e])},4b:0,5b:u(r){2z{v!r.10&&7H.6D=="4Q:"||(r.10>=57&&r.10<6C)||r.10==56||6.12.3c&&r.10==S}2G(e){}v 14},6q:u(N,U){2z{B 55=N.4y("59-4a");v N.10==56||55==6.3m[U]||6.12.3c&&N.10==S}2G(e){}v 14},5y:u(r,C){B 4t=r.4y("6B-C");B F=!C&&4t&&4t.15("N")>=0;F=C=="N"||F?r.6A:r.3g;q(C=="4i")6.4h(F);q(C=="5j")3L("F = "+F);q(C=="4d")6("<1N>").4d(F).4j();v F},30:u(a){B s=[];q(a.1l==2L||a.3h)6.J(a,u(){s.1g(2p(7.W)+"="+2p(7.P))});K Q(B j 1z a)q(a[j]&&a[j].1l==2L)6.J(a[j],u(){s.1g(2p(j)+"="+2p(7))});K s.1g(2p(j)+"="+2p(a[j]));v s.64("&")},4h:u(F){q(1F.53)1F.53(F);K q(6.12.3c)1F.58(F,0);K 3L.43(1F,F)}});6.E.1w({1L:u(R,M){B 1G=7.1y(":1G");R?1G.24({25:"1L",3P:"1L",1b:"1L"},R,M):1G.J(u(){7.1u.1e=7.2u?7.2u:"";q(6.1n(7,"1e")=="1X")7.1u.1e="2E"});v 7},1E:u(R,M){B 34=7.1y(":34");R?34.24({25:"1E",3P:"1E",1b:"1E"},R,M):34.J(u(){7.2u=7.2u||6.1n(7,"1e");q(7.2u=="1X")7.2u="2E";7.1u.1e="1X"});v 7},51:6.E.3I,3I:u(E,4D){B 1x=1A;v 6.1r(E)&&6.1r(4D)?7.51(E,4D):7.J(u(){6(7)[6(7).4f(":1G")?"1L":"1E"].11(6(7),1x)})},6z:u(R,M){v 7.24({25:"1L"},R,M)},6x:u(R,M){v 7.24({25:"1E"},R,M)},6w:u(R,M){v 7.J(u(){B 5T=6(7).4f(":1G")?"1L":"1E";6(7).24({25:5T},R,M)})},6v:u(R,M){v 7.24({1b:"1L"},R,M)},6u:u(R,M){v 7.24({1b:"1E"},R,M)},85:u(R,3e,M){v 7.24({1b:3e},R,M)},24:u(G,R,1o,M){v 7.1J(u(){7.2r=6.1w({},G);B 1t=6.R(R,1o,M);Q(B p 1z G){B e=1p 6.33(7,1t,p);q(G[p].1l==3X)e.2q(e.O(),G[p]);K e[G[p]](G)}})},1J:u(C,E){q(!E){E=C;C="33"}v 7.J(u(){q(!7.1J)7.1J={};q(!7.1J[C])7.1J[C]=[];7.1J[C].1g(E);q(7.1J[C].I==1)E.11(7)})}});6.1w({R:u(R,1o,E){B 1t=R&&R.1l==6r?R:{2c:E||!E&&1o||6.1r(R)&&R,26:R,1o:E&&1o||1o&&1o.1l!=4J&&1o};1t.26=(1t.26&&1t.26.1l==3X?1t.26:{8C:8B,8A:57}[1t.26])||8z;1t.1K=1t.2c;1t.2c=u(){6.6n(7,"33");q(6.1r(1t.1K))1t.1K.11(7)};v 1t},1o:{},1J:{},6n:u(D,C){C=C||"33";q(D.1J&&D.1J[C]){D.1J[C].4K();B f=D.1J[C][0];q(f)f.11(D)}},33:u(D,1d,G){B z=7;B y=D.1u;B 4W=6.1n(D,"1e");y.6l="1G";z.a=u(){q(1d.3Z)1d.3Z.11(D,[z.2n]);q(G=="1b")6.1D(y,"1b",z.2n);K q(6k(z.2n))y[G]=6k(z.2n)+"4R";y.1e="2E"};z.6j=u(){v 4g(6.1n(D,G))};z.O=u(){B r=4g(6.2V(D,G));v r&&r>-8u?r:z.6j()};z.2q=u(4S,3e){z.4T=(1p 6g()).6f();z.2n=4S;z.a();z.4U=4E(u(){z.3Z(4S,3e)},13)};z.1L=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();1d.1L=V;z.2q(0,D.1B[G]);q(G!="1b")y[G]="6e"};z.1E=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();1d.1E=V;z.2q(D.1B[G],0)};z.3I=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();q(4W=="1X"){1d.1L=V;q(G!="1b")y[G]="6e";z.2q(0,D.1B[G])}K{1d.1E=V;z.2q(D.1B[G],0)}};z.3Z=u(3a,42){B t=(1p 6g()).6f();q(t>1d.26+z.4T){5c(z.4U);z.4U=17;z.2n=42;z.a();q(D.2r)D.2r[G]=V;B 2a=V;Q(B i 1z D.2r)q(D.2r[i]!==V)2a=14;q(2a){y.6l="";y.1e=4W;q(6.1n(D,"1e")=="1X")y.1e="2E";q(1d.1E)y.1e="1X";q(1d.1E||1d.1L)Q(B p 1z D.2r)q(p=="1b")6.1D(y,p,D.1B[p]);K y[p]=""}q(2a&&6.1r(1d.2c))1d.2c.11(D)}K{B n=t-7.4T;B p=n/1d.26;z.2n=1d.1o&&6.1o[1d.1o]?6.1o[1d.1o](p,n,3a,(42-3a),1d.26):((-6d.8o(p*6d.8D)/2)+0.5)*(42-3a)+3a;z.a()}}}})}',62,536,'||||||jQuery|this|||||||||||||||||||if||||function|return||||||var|type|elem|fn|data|prop|event|length|each|else|ret|callback|xml|cur|value|for|speed|undefined|element|url|true|name||parentNode||status|apply|browser||false|indexOf|className|null|firstChild|val|obj|opacity|nodeName|options|display|result|push|document|handler|global|msie|constructor|test|css|easing|new|expr|isFunction|arg|opt|style|typeof|extend|args|filter|in|arguments|orig|context|attr|hide|window|hidden|re|events|queue|old|show|add|div|table|elems|trigger|num|token|replace|target|tbody|ifModified|none|while|params|nodeType|string|key|timeout|animate|height|duration|nth|tb|get|done|not|complete|nextSibling|remove|index|z0|merge|find|fix|preventDefault|pushStack|oid|now|grep|encodeURIComponent|custom|curAnim|guid|success|oldblock|error|el|al|first|try|cssFloat|stopPropagation|innerHTML|exec|block|res|catch|text|wrap|childNodes|sibling|Array|substr|trim|insertBefore|disabled|selected|originalEvent|checked|map|on|curCSS|handlers|parPos|domManip|id|param|getAttribute|re2|fx|visible|has|load|last|_|ready|firstNum|readyList|safari|toUpperCase|to|ajax|responseText|jquery|inArray|String|form|async|lastModified|setRequestHeader|ajaxSettings|dir|select|mozilla|XMLHttpRequest|onreadystatechange|tr|multiFilter|ival|defaultView|styleFloat|src|handleError|removeChild|clean|slice|second|bind|position|returnValue|toggle|modRes|tag|eval|oWidth|foundToken|oHeight|width|9_|cloneNode|button|isReady|mouseover|child|split|Number|break|step|makeArray|append|lastNum|call|empty|opera|self|inv|isXMLDoc|alpha|Modified|active|requestDone|html|dataType|is|parseFloat|globalEval|script|evalScripts|pos|00|currentStyle|isTimeout|toLowerCase|els|getComputedStyle|float|unload|ct|static|deep|clone|lastToggle|getResponseHeader|end|visibility|triggered|radio|fn2|setInterval|matched|getAll|appendChild|rec|Function|shift|documentElement|_resort|swap|RegExp|submit|file|px|from|startTime|timer|parents|oldDisplay|handleHover|continue|body|ownerDocument|_toggle|tagName|execScript|sl|xmlRes|304|200|setTimeout|Last|href|httpSuccess|clearInterval|createElement|getElementsByTagName|processData|setArray|contentType|settings|json|ajaxSend|ajaxSuccess|ajaxError|ajaxComplete|ajaxStop|ajaxStart|getScript|100|notmodified|newProp|beforeSend|POST|GET|getPropertyValue|httpData|force|mouseout|click|appendTo|unbind|one|scrollTop|scrollLeft|clientX|pageX|prevObject|srcElement|after|unshift|removeAttr|delete|handle|before|prepend|check|state|tmp|rl|getElementById|parse|_prefix|input|reset|image|password|checkbox|join|odd|even|nodeValue|contains|gt|lt|eq|zoom|Math|1px|getTime|Date|parent|exclude|max|parseInt|overflow|previousSibling|dequeue|webkit|ol|httpNotModified|Object|userAgent|navigator|fadeOut|fadeIn|slideToggle|slideUp|concat|slideDown|responseXML|content|300|protocol|ig|abort|noConflict|setAttribute|getAttributeNode|method|readyState|action|9999|close|Connection|match|Requested|GMT|Jan|gi|01|Thu|Since|reverse|readOnly|Content|readonly|open|class|htmlFor|urlencoded|www|application|ajaxSetup|ajaxTimeout|post|th|getJSON|td|Type|If|getIfModified|tfoot|thead|XMLHTTP|Microsoft|1970|ActiveXObject|FORM|textContent|serialize|With|overrideMimeType|toString|loadIfModified|do|keyup|keypress|keydown|change|mousemove|mouseup|mousedown|dblclick|scroll|resize|focus|blur|send|location|DOMContentLoaded|removeEventListener|clientWidth|clientHeight|relatedTarget|toElement|relative|fromElement|hover|left|right|cancelBubble|clientY|absolute|pageY|offsetWidth|offsetHeight|Width|border|substring|padding|Left|object|fadeTo|Right|Bottom|Top|size|textarea|enabled|only|lastChild|prototype|toggleClass|removeClass|addClass|removeAttribute|line|insertAfter|prependTo|children|siblings|cos|weight|createTextNode|prev|font|next|10000|CSS1Compat|compatMode|boxModel|compatible|400|fast|600|slow|PI'.split('|'),0,{}))

//~ var scripts = [
    //~ 'http://jquery.com/src/jquery-latest.pack.js'
//~ ];

//~ for (i in scripts) {
    //~ var script = document.createElement('script');
    //~ script.src = scripts[i];
    //~ document.getElementsByTagName('head')[0].appendChild(script);
//~ }

//~ window.addEventListener('load', function(event) {}, 'false');

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// VARIABLE SETUP
//__________________________________________________________________________________________________________________//

var pName		= '';
var pPoints		= '';
var pRank 		= '';
var pVillages 	= '';

var vID 		= '';
var vName 		= '';
var vCoordX 	= '';
var vCoordY 	= '';
var vContinent 	= '';
var vWarGroup 	= '';

var baseURL 	= getParam( 'GETURL' );
var gameURL 	= baseURL + '/game.php?village=' + vID;
var screen 		= getParam( 'screen' );
var mode 		= getParam( 'mode' );
var hash 		= '';

var search		= new RegExp( '([^0-9][^0-9])([0-9][0-9]*)' );
var language	= baseURL.match( search )[1];
var world		= baseURL.match( search )[2];

var twInterface = new Array();

var pMain 		= '';

var DebugMode	= 0;

var sWidth		= 1024;
var sWarGroup	= 1;

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// MAIN SEQUENCE
//__________________________________________________________________________________________________________________//

try{
	if ( url.indexOf('captcha.php') != -1 ) {
		return 0;
	}
	
	FW_UserInfo();

	FW_Variables();

	FW_interface_AddStyles();
	FW_interface_BuildMenu();
	FW_interface_BuildQuickMenu();
	FW_interface_BuildPlayerBar();

	FW_interface_Clean();
	FW_interface_Render();
	
	if ( screen == 'map' ) { FW_Screen_Map(); }
	if ( screen == 'report' ) { FW_Screen_Report(); }
	if ( screen == 'overview_villages' ) { FW_Screen_Overview_Villages(); }
	if ( screen == 'settings_custom' ) { FW_Screen_Settings_Custom(); }
	if ( screen == 'info_player' ) { FW_Screen_Info_Player(); }
	if ( screen == 'info_village' ) { FW_Screen_Info_Village(); }
	if ( screen == 'place' ) { FW_Screen_Rally_Point(); }
	if ( screen == 'favorite_villages' ) { FW_Screen_Favorite_Villages(); }
	
	FW_Screen_Misc();
} catch(e) {
	if( DebugMode == 1 ) GM_log(e)
}

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// USER INFORMATION
//__________________________________________________________________________________________________________________//

// Method: FW_UserInfo
// Summary: Handles cached user infomation

function FW_UserInfo() {
	var setup = GM_getValue ( 'setup' );
	
	if ( ( typeof setup == 'undefined' ) || ( setup == 0 ) ) {
		FW_SetupScriptInfo();
	}
	
	FW_RefreshScriptInfo();
	
	var userid = GM_getValue ( 'userid' );

	if ( typeof userid == 'undefined' ) {
		FW_SetupUserInfo();
	} else {
		if ( GM_getValue ( 'rank' ) != document.body.childNodes[1].rows[0].cells[0].innerHTML.split ( '(' )[1].split ( ')' )[0].split ( '|' )[0].replace ( '.', '') ) {
			FW_SetupUserInfo();
		}
	}
}

//__________________________________________________________________________________________________________________//

// Method: FW_SetupScriptInfo
// Summary: Sets up (or refreshes) cached user information

function FW_SetupScriptInfo() {
	GM_setValue ( 'sSetup' , 1 );
	GM_setValue ( 'sWidth' , 1024 );
	GM_setValue ( 'sWarGroup' , 1 );
}

//__________________________________________________________________________________________________________________//

// Method: FW_RefreshScriptInfo
// Summary: Refreshes cached script information

function FW_RefreshScriptInfo() {
	sWidth 		= GM_getValue ( 'sWidth' );
	sWarGroup 	= GM_getValue ( 'sWarGroup' );
}

//__________________________________________________________________________________________________________________//

// Method: FW_SetupUserInfo
// Summary: Sets up (or refreshes) cached user information

function FW_SetupUserInfo() {
	var vID = document.body.childNodes[1].rows[0].cells[0].innerHTML.match(/village=([\d]+)/)[1];
	
	if ( typeof GM_getValue ( 'favorite_players' ) == 'undefined' ) GM_setValue ( 'favorite_players' , '' );
	if ( typeof GM_getValue ( 'favorite_villages' ) == 'undefined' ) GM_setValue ( 'favorite_villages' , '' );
	
	// Get user ID
	GM_xmlhttpRequest({
		method: 'GET',
		url: baseURL + '/guest.php?screen=info_village&id=' + vID,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
		},
		onload: function(responseDetails) {
			var sStart = '</h2>';
			var sEnd = '</table>';
			
			//~ alert( responseDetails.responseText );
			
			if ( responseDetails.responseText.indexOf(sStart) >= 0 ) {
				var Data = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length + 21);
				Data = Data.substring(0, Data.indexOf(sEnd) - sEnd.length + 7);
				
				var playerInfo = Data.split('</tr>');
				
				for ( key in playerInfo ) {
					if ( playerInfo[key].search( '<tr>' ) != -1 ) {
						playerInfo[key] = playerInfo[key].replace( '<tr>', '' ); 
					}
				}
				
				GM_setValue ( 'userid' , substrsub ( playerInfo[3], 'id=', '">' ) );
			}
		}
	});
	
	// Get player info
	GM_xmlhttpRequest({
		method: 'GET',
		url: baseURL + '/guest.php?screen=info_player&id=' + GM_getValue ( 'userid' ),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
		},
		onload: function(responseDetails) {
			var sStart = '<table class="vis" width="100%">';
			var sEnd = '</table>';
			
			//~ alert( responseDetails.responseText );
			
			if ( responseDetails.responseText.indexOf(sStart) >= 0 ) {
				var Data = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);
				Data = Data.substring(0, Data.indexOf(sEnd) - sEnd.length + 7);
				
				var playerInfo = Data.split('</tr>');
				
				for ( key in playerInfo ) {
					if ( playerInfo[key].search( '<tr>' ) != -1 ) {
						playerInfo[key] = playerInfo[key].replace( '<tr>', '' ); 
					}
				}
				
				GM_setValue ( 'playername' , substrsub ( playerInfo[0], '>', '<' ) );
				
				var points = substrsub ( playerInfo[1], '<td width="80">Points:</td><td>', '</td>' )
				
				if ( points.search( '<span class="grey">.</span>' ) != -1 ) {
					GM_setValue ( 'points' , points.replace ( '<span class="grey">.</span>', '' ) );
				} else {
					GM_setValue ( 'points' , parseInt ( points ) );
				}
				
				var rank = substrsub ( playerInfo[2], '<td>Rank:</td><td>', '</td>' )
				
				if ( rank.search( '<span class="grey">.</span>' ) != -1 ) {
					GM_setValue ( 'rank' , rank.replace ( '<span class="grey">.</span>', '' ) );
				} else {
					GM_setValue ( 'rank' , parseInt ( rank ) );
				}
			}
			
			sStart = '<tr><th width="180">Villages</th><th width="80">Coordinates</th><th>Points</th></tr>';
			sEnd = '</table>';
			
			if ( responseDetails.responseText.indexOf(sStart) >= 0 ) {
				var Data = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);
				Data = Data.substring(0, Data.indexOf(sEnd) - sEnd.length + 7);
				
				var villageInfo = Data.split('</tr>');
				
				for ( key in villageInfo ) {
					if ( villageInfo[key].search( '<tr>' ) != -1 ) {
						villageInfo[key] = villageInfo[key].replace( '<tr>', '' ); 
					}
				}
				
				GM_setValue ( 'villages' , parseInt ( villageInfo.length - 1 ) );
				
				for ( key = 0; key < villageInfo.length - 1; key++ ) {
					GM_setValue ( 'village' + key + 'id', substrsub ( villageInfo[key] , 'id=' , '">' ) );
					GM_setValue ( 'village' + key + 'name', substrsub ( villageInfo[key] , '">' , '</a>' ) );
					var x = substrsub ( villageInfo[key] , '</a></td><td>' , '|' );
					var y = substrsub ( villageInfo[key] , '|' , '</td><td>' );
					GM_setValue ( 'village' + key + 'x', parseInt ( x ) );
					GM_setValue ( 'village' + key + 'y', parseInt ( y ) );
					GM_setValue ( 'village' + key + 'continent', getContinent ( x, y )[0] );
					GM_setValue ( 'village' + key + 'wargroup', getWarGroup ( x, y ) );
				}
			}
		}
	});
}

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// VARIABLES
//__________________________________________________________________________________________________________________//

// Method: FW_Variables
// Summary: Set script variables from user information

function FW_Variables() {
	pName = GM_getValue( 'playername' );
	pRank = GM_getValue( 'rank' );
	pPoints = GM_getValue( 'points' );
	
	vID = parseInt ( document.body.childNodes[1].rows[0].cells[0].innerHTML.match(/village=([\d]+)/)[1] );
	pVillages = GM_getValue( 'villages' );
	
	for ( key = 0; key < pVillages; key++ ) {
		var g_vID = GM_getValue ( 'village' + key + 'id' );
		
		if ( g_vID == vID ) {
			vName = GM_getValue ( 'village' + key + 'name' );
			vCoordX = GM_getValue ( 'village' + key + 'x' );
			vCoordY = GM_getValue ( 'village' + key + 'y' );
			vContinent = GM_getValue ( 'village' + key + 'continent' );
			vWarGroup = GM_getValue ( 'village' + key + 'wargroup' );
		}
	}
	
	search	= new RegExp( /h=(\w+)/ );
	hash 	= document.body.childNodes[1].rows[0].cells[0].innerHTML.match( search )[1];
	
	sWidth 		= GM_getValue ( 'sWidth' );
	sWarGroup 	= GM_getValue ( 'sWarGroup' );
}

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// INTERFACE
//__________________________________________________________________________________________________________________//

// Method: FW_interface_AddStyles
// Summary: Adds CSS styles to page

function FW_interface_AddStyles() {
	var newStyles = '';
	
	newStyles += 'th {';
	newStyles += '	font: bold 11px Verdana, Arial, Helvetica, sans-serif;';
	newStyles += '	color: #9B7F6D;';
	newStyles += '	border-right: 1px solid #DAD2C1;';
	newStyles += '	border-bottom: 1px solid #DAD2C1;';
	newStyles += '	border-top: 1px solid #DAD2C1;';
	newStyles += '	letter-spacing: 1px;';
	newStyles += '	text-align: left;';
	newStyles += '	padding: 6px 6px 6px 12px;';
	newStyles += '	background: #C9C1AC url("http://joshdb.com/k46/GM/bg_header.jpg") repeat-x;';
	newStyles += '}';

	newStyles += 'th.nobg {';
	newStyles += '	border-top: 0;';
	newStyles += '	border-left: 0;';
	newStyles += '	border-right: 1px solid #DAD2C1;';
	newStyles += '	background: none;';
	newStyles += '}';
	
	newStyles += 'th.spec {	';
	newStyles += '	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;';
	newStyles += '	border-left: 1px solid #DAD2C1;';
	newStyles += '	border-top: 0;';
	newStyles += '	background: #fff url("http://joshdb.com/k46/GM/bullet1.gif") no-repeat;';
	newStyles += '}';

	newStyles += 'th.specalt {';
	newStyles += '	border-left: 1px solid #DAD2C1;';
	newStyles += '	border-top: 0;';
	newStyles += '	background: #f5fafa url("http://joshdb.com/k46/GM/bullet2.gif") no-repeat;';
	newStyles += '	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica,';
	newStyles += '	sans-serif;';
	newStyles += '	color: #B4AA9D;';
	newStyles += '}';
	
	newStyles += 'th.label {	';
	newStyles += '	font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;';
	newStyles += '	border-left: 1px solid #DAD2C1;';
	newStyles += '	border-top: 0;';
	newStyles += '	background: #fff url("http://joshdb.com/k46/GM/bullet1.gif") no-repeat;';
	newStyles += '}';

	newStyles += 'th.labeltop {';
	newStyles += '	border-left: 1px solid #DAD2C1;';
	newStyles += '	border-top: 0;';
	newStyles += '	background: #f5fafa url("http://joshdb.com/k46/GM/bullet2.gif") no-repeat;';
	newStyles += '	font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica,';
	newStyles += '	sans-serif;';
	newStyles += '	color: #B4AA9D;';
	newStyles += '}';

	newStyles += 'td.new {';
	newStyles += '	border-right: 1px solid #DAD2C1;';
	newStyles += '	border-bottom: 1px solid #DAD2C1;';
	newStyles += '	background: #fff;';
	newStyles += '	padding: 3px 3px 3px 6px';
	newStyles += '	color: #6D929B;';
	newStyles += '}';

	newStyles += 'td.alt {';
	newStyles += '	background: #F5FAFA;';
	newStyles += '	color: #B4AA9D;';
	newStyles += '}';

	newStyles += 'td.loader {';
	newStyles += '	background: url("http://joshdb.com/k46/GM/loading.gif") no-repeat 6px 6px;';
	newStyles += '}';

	newStyles += 'td.loader_stats {';
	newStyles += '	width: 340px;';
	newStyles += '	width: 130px;';
	newStyles += '	background: url("http://joshdb.com/k46/GM/loading.gif") no-repeat 6px 6px;';
	newStyles += '}';
	
	newStyles += 'table.main {';
	newStyles += '	border-width:2px;';
	newStyles += '	border-style: solid; border-color:#804000;';
	newStyles += '	background-color:#F1EBDD;';
	newStyles += '	width: ' + sWidth;
	newStyles += '}';

	newStyles += 'table.vis td {';
	newStyles += '	font: 11px Verdana, Arial, Helvetica, sans-serif;';
	newStyles += '	padding: 3px 3px 3px 6px;';
	newStyles += '	background-color: #F8F4E8;';
	newStyles += '}';

	newStyles += 'table.vis tr .selected{';
	newStyles += '	background-color: #ffffff;';
	newStyles += '	background: #C9C1AC url("http://joshdb.com/k46/GM/menu_header.jpg") repeat-x;';
	newStyles += '}';

	if ( screen == 'map' ) {
		newStyles += 'table.menu tr td:hover table, table.menu tr td.hover table {visibility: visible;}';
		newStyles += '#mapCoords { width: 742px; height: 532px; }';
		newStyles += '#map{ width: 742px; height: 532px; }';
		newStyles += '.map{ width: 742px; height: 532px; }';
		newStyles += '#topoRect{ width: 68px; height 68px; }';
	}
	
	addGlobalStyle(newStyles);
}

//__________________________________________________________________________________________________________________//

// Method: FW_interface_BuildMenu
// Summary: Builds the menu bar HTML

function FW_interface_BuildMenu() {
	var menu = document.body.childNodes[1].rows[0].cells[0];

	//____________________________________________________//
	// Find out if there is a tribe notification
	//=================================================//
	if ( menu.innerHTML.match('ally_forum.png') ) { 	var tribeNotification = '<img src="graphic/ally_forum.png" title="New post in private forum" alt="" /> '; }
	else { 												var tribeNotification = ''; }

	//_______________________________________________//
	// Find out if there is unread mail
	//=============================================//
	if ( menu.innerHTML.match('new_mail.png') ) { 		var mailNotification = '<img src="graphic/new_mail.png" title="You have unread mail" alt="" /> '; }
	else { 												var mailNotification = ''; }

	//__________________________________________//
	// Find out if there are unread reports
	//========================================//
	if ( menu.innerHTML.match('new_report.png') ) { 	var reportNotification = '<img src="graphic/new_report.png" title="You have new reports" alt="" /> '; }
	else { 												var reportNotification = ''; }

	//_____________________________________//
	// Add menu entries
	//===================================//
		twInterface['menu'] 	= new Array();

		twInterface['menu'][0] 	= new Array();
			twInterface['menu'][0]['name']			= 'Log out';
			twInterface['menu'][0]['url']			= 'game.php?village=' + vID + '&amp;screen=&amp;action=logout&amp;h=' + hash;
			twInterface['menu'][0]['target']		= '_top';
			twInterface['menu'][0]['parent']		= 0;
			
		twInterface['menu'][1] 	= new Array();
			twInterface['menu'][1]['name']			= 'Forum';
			twInterface['menu'][1]['url']			= 'http://forum.tribalwars.net/index.php';
			twInterface['menu'][1]['target']		= '_blank';
			twInterface['menu'][1]['parent']			= 0;
			
		twInterface['menu'][2] 	= new Array();
			twInterface['menu'][2]['name']			= 'Chat';
			twInterface['menu'][2]['url']			= 'chat.php';
			twInterface['menu'][2]['target']		= '_blank';
			twInterface['menu'][2]['parent']		= 0;
			
		twInterface['menu'][3] 	= new Array();
			twInterface['menu'][3]['name']			= 'Help';
			twInterface['menu'][3]['url']			= 'help.php';
			twInterface['menu'][3]['target']		= '_blank';
			twInterface['menu'][3]['parent']		= 1;
			twInterface['menu'][3]['content']		= new Array()
				twInterface['menu'][3]['content'][0] 	= new Array();
				twInterface['menu'][3]['content'][0]['name']			= 'First steps';
				twInterface['menu'][3]['content'][0]['url']				= 'help.php?mode=intro';
				twInterface['menu'][3]['content'][0]['target']			= '_self';
				
				twInterface['menu'][3]['content'][1] 	= new Array();
				twInterface['menu'][3]['content'][1]['name']			= 'Late Start';
				twInterface['menu'][3]['content'][1]['url']				= 'help.php?mode=late_start';
				twInterface['menu'][3]['content'][1]['target']			= '_self';
				
				twInterface['menu'][3]['content'][2] 	= new Array();
				twInterface['menu'][3]['content'][2]['name']			= 'Buildings';
				twInterface['menu'][3]['content'][2]['url']				= 'help.php?mode=buildings';
				twInterface['menu'][3]['content'][2]['target']			= '_self';
				
				twInterface['menu'][3]['content'][3] 	= new Array();
				twInterface['menu'][3]['content'][3]['name']			= 'Units';
				twInterface['menu'][3]['content'][3]['url']				= 'help.php?mode=units';
				twInterface['menu'][3]['content'][3]['target']			= '_self';
				
				twInterface['menu'][3]['content'][4] 	= new Array();
				twInterface['menu'][3]['content'][4]['name']			= 'Battle System';
				twInterface['menu'][3]['content'][4]['url']				= 'help.php?mode=fight';
				twInterface['menu'][3]['content'][4]['target']			= '_self';
				
				twInterface['menu'][3]['content'][5] 	= new Array();
				twInterface['menu'][3]['content'][5]['name']			= 'Points';
				twInterface['menu'][3]['content'][5]['url']				= 'help.php?mode=points';
				twInterface['menu'][3]['content'][5]['target']			= '_self';
				
				twInterface['menu'][3]['content'][6] 	= new Array();
				twInterface['menu'][3]['content'][6]['name']			= 'Map';
				twInterface['menu'][3]['content'][6]['url']				= 'help.php?mode=map';
				twInterface['menu'][3]['content'][6]['target']			= '_self';
				
				twInterface['menu'][3]['content'][7] 	= new Array();
				twInterface['menu'][3]['content'][7]['name']			= 'Reports';
				twInterface['menu'][3]['content'][7]['url']				= 'help.php?mode=reports';
				twInterface['menu'][3]['content'][7]['target']			= '_self';
				
				twInterface['menu'][3]['content'][8] 	= new Array();
				twInterface['menu'][3]['content'][8]['name']			= 'BB-Codes';
				twInterface['menu'][3]['content'][8]['url']				= 'help.php?mode=bb';
				twInterface['menu'][3]['content'][8]['target']			= '_self';
				
				twInterface['menu'][3]['content'][9] 	= new Array();
				twInterface['menu'][3]['content'][9]['name']			= 'External IGM';
				twInterface['menu'][3]['content'][9]['url']				= 'help.php?mode=external_igm';
				twInterface['menu'][3]['content'][9]['target']			= '_self';
				
				twInterface['menu'][3]['content'][10] 	= new Array();
				twInterface['menu'][3]['content'][10]['name']			= 'World Data';
				twInterface['menu'][3]['content'][10]['url']				= 'help.php?mode=map_data';
				twInterface['menu'][3]['content'][10]['target']		= '_self';
				
				twInterface['menu'][3]['content'][11] 	= new Array();
				twInterface['menu'][3]['content'][11]['name']			= 'Tribal Wars banner';
				twInterface['menu'][3]['content'][11]['url']				= 'help.php?mode=banner';
				twInterface['menu'][3]['content'][11]['target']		= '_self';
				
				twInterface['menu'][3]['content'][12] 	= new Array();
				twInterface['menu'][3]['content'][12]['name']			= 'Serverinfo';
				twInterface['menu'][3]['content'][12]['url']				= 'help.php?mode=server_info';
				twInterface['menu'][3]['content'][12]['target']		= '_self';
				
				twInterface['menu'][3]['content'][13] 	= new Array();
				twInterface['menu'][3]['content'][13]['name']			= 'Rules';
				twInterface['menu'][3]['content'][13]['url']				= 'rules.php';
				twInterface['menu'][3]['content'][13]['target']		= '_blank';
				
		twInterface['menu'][4] 	= new Array();
			twInterface['menu'][4]['name']			= 'Settings';
			twInterface['menu'][4]['url']			= 'game.php?village=' + vID + '&amp;screen=settings';
			twInterface['menu'][4]['target']		= '_self';
			twInterface['menu'][4]['parent']		= 1;
			twInterface['menu'][4]['content']		= new Array()
				twInterface['menu'][4]['content'][0] 					= new Array();
				twInterface['menu'][4]['content'][0]['name']			= 'Profile';
				twInterface['menu'][4]['content'][0]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=profile';
				twInterface['menu'][4]['content'][0]['target']			= '_self';
				
				twInterface['menu'][4]['content'][1] 					= new Array();
				twInterface['menu'][4]['content'][1]['name']			= 'Change email address';
				twInterface['menu'][4]['content'][1]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=email';
				twInterface['menu'][4]['content'][1]['target']			= '_self';
				
				twInterface['menu'][4]['content'][2] 					= new Array();
				twInterface['menu'][4]['content'][2]['name']			= 'Settings';
				twInterface['menu'][4]['content'][2]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=settings';
				twInterface['menu'][4]['content'][2]['target']			= '_self';
				
				twInterface['menu'][4]['content'][3] 					= new Array();
				twInterface['menu'][4]['content'][3]['name']			= 'Start over';
				twInterface['menu'][4]['content'][3]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=move';
				twInterface['menu'][4]['content'][3]['target']			= '_self';
				
				twInterface['menu'][4]['content'][4] 					= new Array();
				twInterface['menu'][4]['content'][4]['name']			= 'Delete account';
				twInterface['menu'][4]['content'][4]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=delete';
				twInterface['menu'][4]['content'][4]['target']			= '_self';
				
				twInterface['menu'][4]['content'][5] 					= new Array();
				twInterface['menu'][4]['content'][5]['name']			= 'Share internet connection';
				twInterface['menu'][4]['content'][5]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=share';
				twInterface['menu'][4]['content'][5]['target']			= '_self';
				
				twInterface['menu'][4]['content'][6] 					= new Array();
				twInterface['menu'][4]['content'][6]['name']			= 'Account Sitting';
				twInterface['menu'][4]['content'][6]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=vacation';
				twInterface['menu'][4]['content'][6]['target']			= '_self';
				
				twInterface['menu'][4]['content'][7] 					= new Array();
				twInterface['menu'][4]['content'][7]['name']			= 'Logins';
				twInterface['menu'][4]['content'][7]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=logins';
				twInterface['menu'][4]['content'][7]['target']			= '_self';
				
				twInterface['menu'][4]['content'][8] 					= new Array();
				twInterface['menu'][4]['content'][8]['name']			= 'Change password';
				twInterface['menu'][4]['content'][8]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=change_passwd';
				twInterface['menu'][4]['content'][8]['target']			= '_self';
				
				twInterface['menu'][4]['content'][9] 					= new Array();
				twInterface['menu'][4]['content'][9]['name']			= 'Surveys';
				twInterface['menu'][4]['content'][9]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=poll';
				twInterface['menu'][4]['content'][9]['target']			= '_self';
				
				twInterface['menu'][4]['content'][10] 						= new Array();
				twInterface['menu'][4]['content'][10]['name']				= 'Recruit player';
				twInterface['menu'][4]['content'][10]['url']				= 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=ref';
				twInterface['menu'][4]['content'][10]['target']		= '_self';
				
				twInterface['menu'][4]['content'][11] 						= new Array();
				twInterface['menu'][4]['content'][11]['name']				= 'Freedom Wars Settings';
				twInterface['menu'][4]['content'][11]['url']				= 'game.php?village=' + vID + '&amp;screen=settings_custom';
				twInterface['menu'][4]['content'][11]['target']		= '_self';
			
		twInterface['menu'][5] 	= new Array();
			twInterface['menu'][5]['name']			= 'Premium';
			twInterface['menu'][5]['url']			= 'game.php?village=' + vID + '&amp;screen=premium';
			twInterface['menu'][5]['target']		= '_self';
			twInterface['menu'][5]['parent']		= 1;
			twInterface['menu'][5]['content']		= new Array()
				twInterface['menu'][5]['content'][0] 	= new Array();
				twInterface['menu'][5]['content'][0]['name']			= 'Advantages';
				twInterface['menu'][5]['content'][0]['url']				= 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=help';
				twInterface['menu'][5]['content'][0]['target']			= '_self';
				
				twInterface['menu'][5]['content'][1] 	= new Array();
				twInterface['menu'][5]['content'][1]['name']			= 'Purchase';
				twInterface['menu'][5]['content'][1]['url']				= 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=premium';
				twInterface['menu'][5]['content'][1]['target']			= '_self';
				
				twInterface['menu'][5]['content'][2] 	= new Array();
				twInterface['menu'][5]['content'][2]['name']			= 'Redeem';
				twInterface['menu'][5]['content'][2]['url']				= 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=points';
				twInterface['menu'][5]['content'][2]['target']			= '_self';
				
				twInterface['menu'][5]['content'][3] 	= new Array();
				twInterface['menu'][5]['content'][3]['name']			= 'Log';
				twInterface['menu'][5]['content'][3]['url']				= 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=log';
				twInterface['menu'][5]['content'][3]['target']			= '_self';
			
		twInterface['menu'][6] 	= new Array();
			twInterface['menu'][6]['name']			= 'Ranking </a>(' + pRank + '.|' + pPoints + ' P)<a>';
			twInterface['menu'][6]['url']			= 'game.php?village=' + vID + '&amp;screen=ranking';
			twInterface['menu'][6]['target']		= '_self';
			twInterface['menu'][6]['parent']		= 1;
			twInterface['menu'][6]['content']		= new Array()
				twInterface['menu'][6]['content'][0] 	= new Array();
				twInterface['menu'][6]['content'][0]['name']			= 'Tribes';
				twInterface['menu'][6]['content'][0]['url']				= 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=ally';
				twInterface['menu'][6]['content'][0]['target']			= '_self';
				
				twInterface['menu'][6]['content'][1] 	= new Array();
				twInterface['menu'][6]['content'][1]['name']			= 'Player';
				twInterface['menu'][6]['content'][1]['url']				= 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=player';
				twInterface['menu'][6]['content'][1]['target']			= '_self';
				
				twInterface['menu'][6]['content'][2] 	= new Array();
				twInterface['menu'][6]['content'][2]['name']			= 'Continent Tribes';
				twInterface['menu'][6]['content'][2]['url']				= 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=con_ally';
				twInterface['menu'][6]['content'][2]['target']			= '_self';
				
				twInterface['menu'][6]['content'][3] 	= new Array();
				twInterface['menu'][6]['content'][3]['name']			= 'Continent Players';
				twInterface['menu'][6]['content'][3]['url']				= 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=con_player';
				twInterface['menu'][6]['content'][3]['target']			= '_self';
				
				twInterface['menu'][6]['content'][4] 	= new Array();
				twInterface['menu'][6]['content'][4]['name']			= 'Opponents defeated';
				twInterface['menu'][6]['content'][4]['url']				= 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=kill_player';
				twInterface['menu'][6]['content'][4]['target']			= '_self';
				
		twInterface['menu'][7] 	= new Array();
			twInterface['menu'][7]['name']			= tribeNotification + 'Tribe';
			twInterface['menu'][7]['url']			= 'game.php?village=' + vID + '&amp;screen=ally';
			twInterface['menu'][7]['target']		= '_self';
			twInterface['menu'][7]['parent']		= 1;
			twInterface['menu'][7]['content']		= new Array()
				twInterface['menu'][7]['content'][0] 	= new Array();
				twInterface['menu'][7]['content'][0]['name']			= 'Overview';
				twInterface['menu'][7]['content'][0]['url']				= 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=overview';
				twInterface['menu'][7]['content'][0]['target']			= '_self';
				
				twInterface['menu'][7]['content'][1] 	= new Array();
				twInterface['menu'][7]['content'][1]['name']			= 'Profile';
				twInterface['menu'][7]['content'][1]['url']				= 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=profile';
				twInterface['menu'][7]['content'][1]['target']			= '_self';
				
				twInterface['menu'][7]['content'][2] 	= new Array();
				twInterface['menu'][7]['content'][2]['name']			= 'Members';
				twInterface['menu'][7]['content'][2]['url']				= 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=members';
				twInterface['menu'][7]['content'][2]['target']			= '_self';
				
				twInterface['menu'][7]['content'][3] 	= new Array();
				twInterface['menu'][7]['content'][3]['name']			= 'Diplomacy';
				twInterface['menu'][7]['content'][3]['url']				= 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=contracts';
				twInterface['menu'][7]['content'][3]['target']			= '_self';
				
				twInterface['menu'][7]['content'][4] 	= new Array();
				twInterface['menu'][7]['content'][4]['name']			= 'Tribal Forum';
				twInterface['menu'][7]['content'][4]['url']				= 'game.php?village=' + vID + '&amp;screen=ally&amp;redir_forum';
				twInterface['menu'][7]['content'][4]['target']			= '_blank';
				
				twInterface['menu'][7]['content'][5] 	= new Array();
				twInterface['menu'][7]['content'][5]['name']			= 'External Forum';
				twInterface['menu'][7]['content'][5]['url']				= '';
				twInterface['menu'][7]['content'][5]['target']			= '_blank';
				
		twInterface['menu'][8] 	= new Array();
			twInterface['menu'][8]['name']			= reportNotification + 'Reports';
			twInterface['menu'][8]['url']			= 'game.php?village=' + vID + '&amp;screen=report';
			twInterface['menu'][8]['target']		= '_self';
			twInterface['menu'][8]['parent']		= 1;
			twInterface['menu'][8]['content']		= new Array()
				twInterface['menu'][8]['content'][0] 	= new Array();
				twInterface['menu'][8]['content'][0]['name']			= 'All reports';
				twInterface['menu'][8]['content'][0]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=all';
				twInterface['menu'][8]['content'][0]['target']			= '_self';
				
				twInterface['menu'][8]['content'][1] 	= new Array();
				twInterface['menu'][8]['content'][1]['name']			= 'Attacks';
				twInterface['menu'][8]['content'][1]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=attacks';
				twInterface['menu'][8]['content'][1]['target']			= '_self';
				
				twInterface['menu'][8]['content'][2] 	= new Array();
				twInterface['menu'][8]['content'][2]['name']			= 'Defenses';
				twInterface['menu'][8]['content'][2]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=defenses';
				twInterface['menu'][8]['content'][2]['target']			= '_self';
				
				twInterface['menu'][8]['content'][3] 	= new Array();
				twInterface['menu'][8]['content'][3]['name']			= 'Support';
				twInterface['menu'][8]['content'][3]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=support';
				twInterface['menu'][8]['content'][3]['target']			= '_self';
				
				twInterface['menu'][8]['content'][4] 	= new Array();
				twInterface['menu'][8]['content'][4]['name']			= 'Trade';
				twInterface['menu'][8]['content'][4]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=trade';
				twInterface['menu'][8]['content'][4]['target']			= '_self';
				
				twInterface['menu'][8]['content'][5] 	= new Array();
				twInterface['menu'][8]['content'][5]['name']			= 'Miscellaneous';
				twInterface['menu'][8]['content'][5]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=other';
				twInterface['menu'][8]['content'][5]['target']			= '_self';
				
				twInterface['menu'][8]['content'][6] 	= new Array();
				twInterface['menu'][8]['content'][6]['name']			= 'Forwarded';
				twInterface['menu'][8]['content'][6]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=forwarded';
				twInterface['menu'][8]['content'][6]['target']			= '_self';
				
				twInterface['menu'][8]['content'][7] 	= new Array();
				twInterface['menu'][8]['content'][7]['name']			= 'Filter';
				twInterface['menu'][8]['content'][7]['url']				= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=filter';
				twInterface['menu'][8]['content'][7]['target']			= '_self';
				
				twInterface['menu'][8]['content'][8] 	= new Array();
				twInterface['menu'][8]['content'][8]['name']			= 'Block Sender';
				twInterface['menu'][8]['content'][8]['url']			= 'game.php?village=' + vID + '&amp;screen=report&amp;mode=block';
				twInterface['menu'][8]['content'][8]['target']			= '_self';
				
		twInterface['menu'][9] 	= new Array();
			twInterface['menu'][9]['name']			= mailNotification + 'Mail';
			twInterface['menu'][9]['url']			= 'game.php?village=' + vID + '&amp;screen=mail';
			twInterface['menu'][9]['target']		= '_self';
			twInterface['menu'][9]['parent']		= 1;
			twInterface['menu'][9]['content']		= new Array()
				twInterface['menu'][9]['content'][0] 	= new Array();
				twInterface['menu'][9]['content'][0]['name']			= 'Mail';
				twInterface['menu'][9]['content'][0]['url']				= 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=in';
				twInterface['menu'][9]['content'][0]['target']			= '_self';
				
				twInterface['menu'][9]['content'][1] 	= new Array();
				twInterface['menu'][9]['content'][1]['name']			= 'Circular mail';
				twInterface['menu'][9]['content'][1]['url']				= 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=mass_out';
				twInterface['menu'][9]['content'][1]['target']			= '_self';
				
				twInterface['menu'][9]['content'][2] 	= new Array();
				twInterface['menu'][9]['content'][2]['name']			= 'Write message';
				twInterface['menu'][9]['content'][2]['url']				= 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=new';
				twInterface['menu'][9]['content'][2]['target']			= '_self';
				
				twInterface['menu'][9]['content'][3] 	= new Array();
				twInterface['menu'][9]['content'][3]['name']			= 'Block sender';
				twInterface['menu'][9]['content'][3]['url']				= 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=block';
				twInterface['menu'][9]['content'][3]['target']			= '_self';
				
				twInterface['menu'][9]['content'][4] 	= new Array();
				twInterface['menu'][9]['content'][4]['name']			= 'Address book';
				twInterface['menu'][9]['content'][4]['url']				= 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=address';
				twInterface['menu'][9]['content'][4]['target']			= '_self';
				
		twInterface['menu'][10] 	= new Array();
			twInterface['menu'][10]['name']			= 'Notebook';
			twInterface['menu'][10]['url']			= 'game.php?village=' + vID + '&amp;screen=memo';
			twInterface['menu'][10]['target']		= '_self';
			twInterface['menu'][10]['parent']		= 0;
				
		twInterface['menu'][11] 	= new Array();
			twInterface['menu'][11]['name']			= 'Friends';
			twInterface['menu'][11]['url']			= 'game.php?village=' + vID + '&amp;screen=buddies';
			twInterface['menu'][11]['target']		= '_self';
			twInterface['menu'][11]['parent']		= 0;
}

//__________________________________________________________________________________________________________________//

// Method: FW_interface_BuildQuickMenu
// Summary: Builds the quick bar HTML

function FW_interface_BuildQuickMenu() {
	twInterface['quickBar'] = '';

	twInterface['quickBar'] += '	<table id="quickbar" class="menu nowrap" align="center">';
	twInterface['quickBar'] += '		<tr>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=main" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/main.png" alt="Village Headquarters" />Village Headquarters';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=barracks" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/barracks.png" alt="Barracks" />Barracks';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=stable" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/stable.png" alt="Stable" />Stable';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=garage" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/garage.png" alt="Workshop" />Workshop';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=snob" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/snob.png" alt="Academy" />Academy';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=smith" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/smith.png" alt="Smithy" />Smithy';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=place" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/place.png" alt="Rally point" />Rally point';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '			<td>';
	twInterface['quickBar'] += '				<a href="game.php?village=' + vID + '&amp;screen=market" >';
	twInterface['quickBar'] += '					<img src="graphic/buildings/market.png" alt="Market" />Market';
	twInterface['quickBar'] += '				</a>';
	twInterface['quickBar'] += '			</td>';
	twInterface['quickBar'] += '		</tr>';
	twInterface['quickBar'] += '	</table>';
}

//__________________________________________________________________________________________________________________//

// Method: FW_interface_BuildPlayerBar
// Summary: Builds the player bar HTML

function FW_interface_BuildPlayerBar() {
	twInterface['playerBar'] = '';

	twInterface['playerBar'] += '<table align="center" width="' + sWidth + '" cellspacing="0" style="padding:0px;margin-bottom:4px">';
	twInterface['playerBar'] += '	<tr>';
	twInterface['playerBar'] += '		<td>';
	twInterface['playerBar'] += '			<table class="menu nowrap" align="left">';
	twInterface['playerBar'] += '				<tr id="menu_row2">';
	twInterface['playerBar'] += '					<td>';
	twInterface['playerBar'] += '						<a href="game.php?village=' + vID + '&amp;screen=overview_villages" accesskey="s">';
	twInterface['playerBar'] += '							Overview';
	twInterface['playerBar'] += '						</a><br />';
	twInterface['playerBar'] += '						<table class="menu nowrap">';
	twInterface['playerBar'] += '							<tr id="menu_row">';
	twInterface['playerBar'] += '								<table cellspacing="0" width="120">';
	twInterface['playerBar'] += '									<tr>';
	twInterface['playerBar'] += '										<td>';
	twInterface['playerBar'] += '											<a href="game.php?village=' + vID + '&amp;screen=overview_villages&mode=troops">';
	twInterface['playerBar'] += '												Troops';
	twInterface['playerBar'] += '											</a>';
	twInterface['playerBar'] += '										</td>';
	twInterface['playerBar'] += '									</tr>'
	twInterface['playerBar'] += '									<tr>';
	twInterface['playerBar'] += '										<td>';
	twInterface['playerBar'] += '											<a href="game.php?village=' + vID + '&amp;screen=overview_villages&mode=resources">';
	twInterface['playerBar'] += '												Resources';
	twInterface['playerBar'] += '											</a>';
	twInterface['playerBar'] += '										</td>';
	twInterface['playerBar'] += '									</tr>'
	twInterface['playerBar'] += '							</tr>';
	twInterface['playerBar'] += '						</table>';
	twInterface['playerBar'] += '					</td>';
	twInterface['playerBar'] += '					<td>';
	twInterface['playerBar'] += '						<a href="game.php?village=' + vID + '&amp;screen=map">';
	twInterface['playerBar'] += '							Map';
	twInterface['playerBar'] += '						</a>';
	twInterface['playerBar'] += '					</td>';
	twInterface['playerBar'] += '					<td>';
	twInterface['playerBar'] += '						<img src="graphic/villages.png"><br />';
	twInterface['playerBar'] += '						<table class="menu nowrap">';
	twInterface['playerBar'] += '							<tr id="menu_row">';
	twInterface['playerBar'] += '								<table cellspacing="0" width="120">';
	
	for ( key = 0; key < pVillages; key++ ) {
		var a_vID = GM_getValue ( 'village' + key + 'id' );
		var a_vName = GM_getValue ( 'village' + key + 'name' );
		
		if ( screen.indexOf('info') > -1 ) {
			twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '&id=' + aID + '">' + a_vName + '</a></td></tr>'
		} else {
			twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '">' + a_vName + '</a></td></tr>'
		}
	}
	
	twInterface['playerBar'] += '							</tr>';
	twInterface['playerBar'] += '						</table>';
	twInterface['playerBar'] += '					</td>';
	twInterface['playerBar'] += '					<td>';

	var twVillageActive = 0;
	var larrow = '<img src="graphic/links2.png">';
	var rarrow = '<img src="graphic/rechts2.png">';
	
	for ( key = 0; key < pVillages; key++ ) {
		var a_vID = GM_getValue ( 'village' + key + 'id' );
		var a_vName = GM_getValue ( 'village' + key + 'name' );
		
		var aID = getParam('id');
		
		if ( twVillageActive == 1 ) {
			if ( vName != a_vName ) {
				if ( key <= pVillages ) {
					if ( screen.indexOf('info') > -1 ) {
						rarrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '&id=' + aID + '"><img src="graphic/rechts.png"></a>';
					} else {
						rarrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '"><img src="graphic/rechts.png"></a>';
					}
				} else {
					rarrow = '<img src="graphic/rechts2.png">';
				}
				
				twVillageActive = 2;
			}
		}
			
		if ( vName == a_vName ) {
			if ( key == 0 ) {
				larrow = '<img src="graphic/links2.png">';
			}
			
			twVillageActive = 1;
		}
		
		if ( twVillageActive == 0 ) {
			if ( screen.indexOf('info') > -1 ) {
				larrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '&id=' + aID + '"><img src="graphic/links.png"></a>';
			} else {
				larrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '"><img src="graphic/links.png"></a>';
			}
		}
	}
	
	twInterface['playerBar'] += '						' + larrow + ' ' + rarrow;
	twInterface['playerBar'] += '					</td>';
	twInterface['playerBar'] += '					<td>';
	twInterface['playerBar'] += '						<a href="game.php?village=' + vID + '&amp;screen=overview">';
	twInterface['playerBar'] += '							' + vName;
	twInterface['playerBar'] += '						</a>';
	twInterface['playerBar'] += '						<b>';
	twInterface['playerBar'] += '							(' + vCoordX + '|' + vCoordY + ') K' + vContinent;
	twInterface['playerBar'] += '						</b>';
	twInterface['playerBar'] += '					</td>';
	
	if ( sWarGroup ) {
		twInterface['playerBar'] += '					<td>';
		twInterface['playerBar'] += '						War Group <strong>';
		twInterface['playerBar'] += '							' + vWarGroup;
		twInterface['playerBar'] += '						</strong>';
		twInterface['playerBar'] += '					</td>';
	}
	
	twInterface['playerBar'] += '				</tr>';
	twInterface['playerBar'] += '			</table>';
	twInterface['playerBar'] += '		</td>';
	twInterface['playerBar'] += '		<td align="right">';
	twInterface['playerBar'] += '			<table cellspacing="0">';
	twInterface['playerBar'] += '				<tr>';
	twInterface['playerBar'] += '					<td>';
	twInterface['playerBar'] += '						<table class="box" cellspacing="0">';
	twInterface['playerBar'] += '							<tr>';
	twInterface['playerBar'] += '								<td>';
	twInterface['playerBar'] += '									<a href="game.php?village=' + vID + '&amp;screen=wood">';
	twInterface['playerBar'] += '										<img src="graphic/holz.png" title="Wood" alt="" />';
	twInterface['playerBar'] += '									</a>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td>';
	twInterface['playerBar'] += '									<span id="wood" title="3600">';
	twInterface['playerBar'] += '										0';
	twInterface['playerBar'] += '									</span>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td>';
	twInterface['playerBar'] += '									<a href="game.php?village=' + vID + '&amp;screen=stone">';
	twInterface['playerBar'] += '										<img src="graphic/lehm.png" title="Clay" alt="" />';
	twInterface['playerBar'] += '									</a>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td>';
	twInterface['playerBar'] += '									<span id="stone" title="3600">';
	twInterface['playerBar'] += '										0';
	twInterface['playerBar'] += '									</span>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td>';
	twInterface['playerBar'] += '									<a href="game.php?village=' + vID + '&amp;screen=iron">';
	twInterface['playerBar'] += '										<img src="graphic/eisen.png" title="Iron" alt="" />';
	twInterface['playerBar'] += '									</a>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td>';
	twInterface['playerBar'] += '									<span id="iron" title="3600">';
	twInterface['playerBar'] += '										0';
	twInterface['playerBar'] += '									</span>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td style="border-left: dotted 1px;">';
	twInterface['playerBar'] += '									<a href="game.php?village=' + vID + '&amp;screen=storage">';
	twInterface['playerBar'] += '										<img src="graphic/res.png" title="Storage capacity" alt="" />';
	twInterface['playerBar'] += '									</a>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td id="storage">';
	twInterface['playerBar'] += '									' + document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].cells[0].childNodes[0].rows[0].cells[7].innerHTML;
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '							</tr>';
	twInterface['playerBar'] += '						</table>';
	twInterface['playerBar'] += '					<td>';
	twInterface['playerBar'] += '						<table class="box" cellspacing="0">';
	twInterface['playerBar'] += '							<tr>';
	twInterface['playerBar'] += '								<td width="18" height="20" align="center">';
	twInterface['playerBar'] += '									<a href="game.php?village=' + vID + '&amp;screen=farm">';
	twInterface['playerBar'] += '										<img src="graphic/face.png" title="Villagers" alt="" />';
	twInterface['playerBar'] += '									</a>';
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '								<td align="center">';
	twInterface['playerBar'] += '									' + document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].cells[1].childNodes[0].rows[0].cells[1].innerHTML;
	twInterface['playerBar'] += '								</td>';
	twInterface['playerBar'] += '							</tr>';
	twInterface['playerBar'] += '						</table>';
	
	if ( document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].innerHTML.match( 'graphic/unit/att.png' ) ) {
			var playerBar = document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].cells[2].childNodes[0].rows[0].cells[0].innerHTML;
			
			twInterface['playerBar'] += '					<td>';
			twInterface['playerBar'] += '						<table class="box" cellspacing="0">';
			twInterface['playerBar'] += '							<tr>';
			twInterface['playerBar'] += '								<td width="28" height="22" align="right">';
			twInterface['playerBar'] += '									' + playerBar.substr ( 0 , playerBar.indexOf ( '"">' ) );
			twInterface['playerBar'] += '								</td>';
			twInterface['playerBar'] += '								<td width="28" align="left">';
			twInterface['playerBar'] += '									<a href="' + gameURL + vID + '&screen=overview_villages&mode=troops">';
			twInterface['playerBar'] += '										' + playerBar.substr ( playerBar.indexOf ( '"">' ) + 3 , playerBar.length );
			twInterface['playerBar'] += '									</a>';
			twInterface['playerBar'] += '								</td>';
			twInterface['playerBar'] += '							</tr>';
			twInterface['playerBar'] += '						</table>';
			twInterface['playerBar'] += '					</td>';
	}
	
	twInterface['playerBar'] += '					</td>';
	twInterface['playerBar'] += '				</tr>';
	twInterface['playerBar'] += '			</table>';
	twInterface['playerBar'] += '		</td>';
	twInterface['playerBar'] += '	</tr>';
	twInterface['playerBar'] += '</table>';
}
//__________________________________________________________________________________________________________________//

// Method: FW_interface_RenderMenu
// Summary: Returns an HTML-formatted version of the menu

function FW_interface_RenderMenu() {
	var menuHTML = '';
	menuHTML += '<table class="menu nowrap" align="center" width="' + sWidth + '"><tr id="menu_row">'
	
	for (key in twInterface['menu']) {
		menuHTML += '<td><a href="' + twInterface['menu'][key]['url'] + '" target="' + twInterface['menu'][key]['target'] + '">' + twInterface['menu'][key]['name'] + '</a>';
		
		if ( twInterface['menu'][key]['parent'] == 1 ) {
			menuHTML += '<br /><table cellspacing="0" width="120">';
			
			for (ikey in twInterface['menu'][key]['content']) {
				menuHTML += '<tr><td><a href="' + twInterface['menu'][key]['content'][ikey]['url'] + '" target="' + twInterface['menu'][key]['content'][ikey]['target'] + '">' + twInterface['menu'][key]['content'][ikey]['name'] + '</a></td></tr>';
			}
			
			menuHTML += '</table></td>';
		} else {
			menuHTML += '</td>';
		}
	}
	
	menuHTML += '</tr></table>'
	
	return menuHTML;
}

//__________________________________________________________________________________________________________________//

// Method: FW_interface_Clean
// Summary: Cleans the page of old interface parts

function FW_interface_Clean() {
	// Summary: Strip page of old header
	for (i=0; i<7; i++) {							// Clear first 7 nodes, the first 7 being header content
		document.body.childNodes[i].innerHTML = '';
	}

	// Summary: Clear all <hr> elements on the page
	var hrs = document.getElementsByTagName('hr');
	for( var i = 0; i < hrs.length; i++ ) { hrs[i].parentNode.removeChild(hrs[i]); }

	// Summary: Clear all <br> elements on the page
	var brs = document.getElementsByTagName('br');
	for( var i = 0; i < brs.length; i++ ) { brs[i].parentNode.removeChild(brs[i]); }
}

//__________________________________________________________________________________________________________________//

// Method: FW_interface_Render
// Summary: Adds new interface parts to page

function FW_interface_Render() {
	var data = document.createElement("div");
	data.innerHTML = FW_interface_RenderMenu() + '<br />' +  twInterface['quickBar'] + '<hr width="' + sWidth + '" />' + twInterface['playerBar'];
	
	document.body.insertBefore( data , document.body.childNodes[1] );
	
	pMain = document.body.childNodes[7];
	pMain.width = sWidth;
}

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// PAGE MODIFICATIONS
//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Map
// Summary: Alters the map screen
function FW_Screen_Map() {
	pMain.rows[0].cells[0].childNodes[1].innerHTML += '<form></form>';
	
	var mapX = (parseInt(document.forms[2].elements[0].value)-7);
	var mapY = (parseInt(document.forms[2].elements[1].value)-7);

	var oMap = document.getElementById('map');
	oMap.style.width="800px";
	oMap.style.height="570px";
	oMap.style.background = 'url("http://joshdb.com/k46/GM/loading.gif") no-repeat 50% 50%';
	oMap.innerHTML = '';

	var tRect = document.getElementById('topoRect');
	tRect.style.width = '68px';
	tRect.style.height = '68px';
	
	var tRectTop = tRect.style.top;
	tRectTop = tRectTop.substring(0, tRectTop.length - 2);
	tRectTop = parseInt(tRectTop) - 19;
	
	var tRectLeft = tRect.style.left;
	tRectLeft = tRectLeft.substring(0, tRectLeft.length - 2);
	tRectLeft = parseInt(tRectLeft) - 18;
	
	tRect.style.top = tRectTop + "px";
	tRect.style.left = tRectLeft + "px";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: baseURL + '/game.php?village=' + vID + '&screen=map&xml&start_x=' + mapX + '&start_y=' + mapY + '&size_x=15&size_y=15',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
		},
		onload: function(responseDetails) {
			oMap.innerHTML = responseDetails.responseText;
		}
	});
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Report
// Summary: Alters a report screen
function FW_Screen_Report() {
	if ( getParam ( 'view' ) != '' ) {
		// Long, messy code cometh...
		
		//__________________________________________________________________________________________________________//
		// ADD SURVIVING ATTACKER UNITS
		//__________________________________________________________________________________________________________//
		
		var Attacker = pMain.rows[0].cells[0].childNodes[3].rows[0].cells[1].childNodes[0].rows[0].cells[0].childNodes[1].rows[2].cells[0].childNodes[10].rows[2].cells[0].childNodes[1];
		var AttackerQuantity 	= new Array();
		var AttackerLosses 		= new Array();
		var AttackerSurviving 	= new Array();
		
		var Surviving = '';
		Surviving += '<tr class="center"><td>Surviving:</td>';
		
		for ( unit = 0; unit <= 11; unit++ ) {
			AttackerQuantity[unit] 	= Attacker.rows[1].cells[unit + 1].innerHTML;
			AttackerLosses[unit] 	= Attacker.rows[2].cells[unit + 1].innerHTML;
			AttackerSurviving[unit] = parseInt ( AttackerQuantity[unit] ) - parseInt ( AttackerLosses[unit] );
			
			if ( AttackerSurviving[unit] == 0 ) {
				Surviving += '<td class="hidden">' + AttackerSurviving[unit] + '</td>';
			} else {
				Surviving += '<td>' + AttackerSurviving[unit] + '</td>';
			}
		}
		
		Surviving += '</tr>';
		
		Attacker.innerHTML += Surviving;
		
		//__________________________________________________________________________________________________________//
		// ADD SURVIVING DEFENDER UNITS
		//__________________________________________________________________________________________________________//
		
		var Defender = pMain.rows[0].cells[0].childNodes[3].rows[0].cells[1].childNodes[0].rows[0].cells[0].childNodes[1].rows[2].cells[0].childNodes[13].rows[2].cells[0].childNodes[1];
		var DefenderQuantity 	= new Array();
		var DefenderLosses 		= new Array();
		var DefenderSurviving 	= new Array();
		
		var Surviving = '';
		Surviving += '<tr class="center"><td>Surviving:</td>';
		
		for ( unit = 0; unit <= 11; unit++ ) {
			DefenderQuantity[unit] 	= Defender.rows[1].cells[unit + 1].innerHTML;
			DefenderLosses[unit] 	= Defender.rows[2].cells[unit + 1].innerHTML;
			DefenderSurviving[unit] = parseInt ( DefenderQuantity[unit] ) - parseInt ( DefenderLosses[unit] );
			
			if ( DefenderSurviving[unit] == 0 ) {
				Surviving += '<td class="hidden">' + DefenderSurviving[unit] + '</td>';
			} else {
				Surviving += '<td>' + DefenderSurviving[unit] + '</td>';
			}
		}
		
		Surviving += '</tr>';
		
		Defender.innerHTML += Surviving;
	}
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Info_Player
// Summary: Alters the player info screen
function FW_Screen_Info_Player() {
	// Add player info
	var a_pID = getParam('id');
	var a_pName = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[0].cells[0].innerHTML;
	var a_pPoints = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[1].cells[1].innerHTML;
	var a_pTribe = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[3].cells[1].innerHTML;
	
	if ( a_pTribe == '' ) {
		var a_pTribeID = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[3].cells[1].innerHTML.match(/id=([\d]+)"/)[1];
	}
	
	var a_pMail = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[4].cells[0].innerHTML;
	var a_pVillages = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[3];
	
	var data = '';

	data += '<table id="mytable" cellspacing="0" width=500>';
	data += '	<tr>';
	data += '		<th scope="col" colspan="2" abbr="' + a_pName + '">' + a_pName + '</th>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="labeltop">Points</th>';
	data += '		<td>';
	data += '			' + a_pPoints;
	data += '		</td>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="label">Ranking Chart</th>';
	data += '		<td class="loader_stats" align="center">';
	data += '			<img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + a_pID + '&s=tw' + world + '">';
	data += '		</td>';
	data += '	</tr>';
	
	if ( a_pTribe == '' ) {
		data += '	<tr>';
		data += '		<th scope="row" class="label">Tribal Ranking Chart<br>' + a_pTribe + '</th>';
		data += '		<td class="loader_stats" align="center">';
		data += '			<img src="http://l.jon-dawson.co.uk/image.php?type=tribegraph&id=' + a_pTribeID + '&s=tw' + world + '">';
		data += '		</td>';
		data += '	</tr>';
	}
	
	data += '	<tr>';
	data += '		<th scope="row" class="label" colspan="2">' + a_pMail + '</th>';
	data += '	</tr>';
	data += '</table>';
	
	data += '<br><br><br>';
	
	pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].childNodes[1].innerHTML = data;
	var data = '';
	
	data += '<table id="mytable" cellspacing="0" width=500>';
	data += '	<tr>';
	data += '		<th scope="row" abbr="Villages" class="nobg">Villages</th>';
	data += '		<th scope="col" abbr="Coordinates">Coordinates</th>';
	
	if ( sWarGroup ) data += '		<th scope="col" abbr="War Group">War Group</th>';
	
	data += '		<th scope="col" abbr="Points">Points</th>';
	data += '	</tr>';
	
	for ( key = 1; key < a_pVillages.rows.length; key++ ) {
		var a_vCoords = a_pVillages.rows[key].cells[1].innerHTML.split ( '|' );
		var a_vCoordX = a_vCoords[0];
		var a_vCoordY = a_vCoords[1];
		
		data += '	<tr>';
		data += '		<th scope="row" class="label">' + a_pVillages.rows[key].cells[0].innerHTML + '</th>';
		data += '		<td align="center">';
		data += '			<strong>(' + a_vCoordX + '|' + a_vCoordY + ') K' + getContinent ( a_vCoordX , a_vCoordY )[0] + '</strong>';
		data += '		</td>';
		if ( sWarGroup ) {
			data += '		<td align="center">';
			data += '			War Group ' + getWarGroup ( a_vCoordX , a_vCoordY );
			data += '		</td>';
		}
		data += '		<td align="center">';
		data += '			' + a_pVillages.rows[key].cells[2].innerHTML;
		data += '		</td>';
		data += '	</tr>';
	}
	
	data += '</table>';
	
	a_pVillages.innerHTML = data;
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Info_Village
// Summary: Alters the village info screen
function FW_Screen_Info_Village() {
	var a_vName = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].innerHTML;
	var a_vPoints = pMain.rows[0].cells[0].childNodes[2].rows[2].cells[1].innerHTML;
	var a_vCoords = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[1].innerHTML.split ( '|' );
	var a_vCoordX = a_vCoords[0];
	var a_vCoordY = a_vCoords[1];
	
	var a_pID = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[1].innerHTML.match(/screen=info_player&amp;id=([\d]+)/)[1];
	var a_pName = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[1].innerHTML;
	var a_pTribe = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[1].innerHTML;
	
	if ( a_pTribe != '<a href=""></a>' ) {
		var a_pTribeID = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[1].innerHTML.match(/id=([\d]+)"/)[1];
	}
	
	var data = '';

	data += '<table id="mytable" cellspacing="0">';
	data += '	<tr>';
	data += '		<th scope="col" colspan="2" abbr="' + a_vName + '">' + a_vName + '</th>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="labeltop">Coordinates</th>';
	data += '		<td>';
	data += '			<strong>(' + a_vCoordX + '|' + a_vCoordY + ') K' + getContinent ( a_vCoordX , a_vCoordY )[0] + '</strong>';
	
	if ( sWarGroup ) data += ' War Group ' + getWarGroup ( a_vCoordX , a_vCoordY );
	
	data += '		</td>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="label">Points</th>';
	data += '		<td>';
	data += '			' + a_vPoints;
	data += '		</td>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="label">Village Owner</th>';
	data += '		<td>';
	data += '			' + a_pName;
	data += '		</td>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="label">Village Owner Stats</th>';
	data += '		<td class="loader_stats">';
	data += '			<img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + a_pID + '&s=tw' + world + '">';
	data += '		</td>';
	data += '	</tr>';
	
	if ( a_pTribe != '<a href=""></a>' ) {
		data += '	<tr>';
		data += '		<th scope="row" class="label">Owning Tribe Stats<br>' + a_pTribe + '</th>';
		data += '		<td class="loader_stats">';
		data += '			<img src="http://l.jon-dawson.co.uk/image.php?type=tribegraph&id=' + a_pTribeID + '&s=tw' + world + '">';
		data += '		</td>';
		data += '	</tr>';
	}
	
	data += '	<tr>';
	data += '		<th scope="row" class="label" colspan="2">' + pMain.rows[0].cells[0].childNodes[2].rows[5].cells[0].innerHTML + '</th>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="label" colspan="2">' + pMain.rows[0].cells[0].childNodes[2].rows[6].cells[0].innerHTML + '</th>';
	data += '	</tr>';
	
	if ( pMain.rows[0].cells[0].childNodes[2].rows.length > 8 ) {
		data += '	<tr>';
		data += '		<th scope="row" class="label" colspan="2">' + pMain.rows[0].cells[0].childNodes[2].rows[7].cells[0].innerHTML + '</th>';
		data += '	</tr>';
	}
	
	data += '	<tr>';
	data += '		<th scope="row" class="label" colspan="2">';
	data += '			<a id="favorite" href="#">';
	
	if ( GM_getValue ( 'favorite_villages' ).search ( a_vName ) != -1 ) {
		data += '				» Remove village from favorites';
	} else {
		data += '				» Add village to favorites';
	}
	
	data += '			</a>';
	data += '		</th>';
	data += '	</tr>';
	
	data += '</table>';

	document.addEventListener('click', function(event) {
	
		if ( event.target.id == 'favorite' ) {
			$( '#' + event.target.id ).fadeOut('slow', function(){
			
				if ( GM_getValue ( 'favorite_villages' ).search ( a_vName ) != -1 ) {
					var string = GM_getValue ( 'favorite_villages' );
					
					string = string.replace ( a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' , '' );
				
					GM_setValue ( 'favorite_villages' , string )
					$( '#' + event.target.id ).html( "» Add village to favorites" ).fadeIn('slow');
				} else {
					GM_setValue ( 'favorite_villages' , GM_getValue ( 'favorite_villages' ) + a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' )
					$( '#' + event.target.id ).html( "» Remove village from favorites" ).fadeIn('slow');
				}
			
			});
		}
		
	}, true);
	
	pMain.rows[0].cells[0].childNodes[2].innerHTML = data;
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Overview_Villages
// Summary: Alters the villages overview screen
function FW_Screen_Overview_Villages() {
	if ( mode == 'troops' ) {
		var table = pMain.rows[0].cells[0].childNodes[0];
		var data = '';
		var attacks = 0;
		
		// Handle incoming attacks first
		for ( key = 1; key < table.rows.length; key++ ) {
		
			if ( table.rows[key].cells[0].innerHTML.indexOf('graphic/command/attack.png') != -1 ) {
				var a_vID = table.rows[key].cells[0].innerHTML.match(/village=([\d]+)/)[1];
				var a_vName = '';
				var a_vCoordX = '';
				var a_vCoordY = '';
				var a_vContinent = '';
				var a_vWarGroup = '';
				
				for ( ikey = 0; ikey < pVillages; ikey++ ) {
					var a_ivID = GM_getValue ( 'village' + ikey + 'id' );
					
					if ( a_vID == a_ivID ) {
						a_vName = GM_getValue ( 'village' + ikey + 'name' );
						a_vCoordX = GM_getValue ( 'village' + ikey + 'x' );
						a_vCoordY = GM_getValue ( 'village' + ikey+ 'y' );
						a_vContinent = GM_getValue ( 'village' + ikey + 'continent' );
						a_vWarGroup = GM_getValue ( 'village' + ikey + 'wargroup' );
					}
				}
				
				if ( attacks == 0 ) {
					data += '<table id="mytable" cellspacing="0">';
					data += '	<tr>';
					data += '		<th scope="col" abbr="Incoming Attack" class="nobg">Incoming Attack<br>Target</th>';
					data += '		<th scope="col" abbr="Origin">Origin</th>';
					data += '		<th scope="col" abbr="Arrival at">Arrival at</th>';
					data += '		<th scope="col" abbr="Arrival in">Arrival in</th>';
					data += '	</tr>';
					data += '	<tr>';
				}
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: baseURL + '/game.php?village=' + a_vID + '&screen=place',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/html',
					},
					onload: function(responseDetails) {
						var sStart = '<th width="250">Incoming troops</th>';
						var sEnd = '</table>';
						
						var attackdata = '';
						
						var tabledata = responseDetails.responseText;
						
						if ( tabledata.indexOf( sStart ) != -1 ) {
							var tabledata = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);
							tabledata = tabledata.substring(0, tabledata.indexOf(sEnd) + sEnd.length);
							//~ // tabledata = tabledata.split('</tr>');
					
							var limit = tabledata.split('graphic/command/attack.png');
							
							for ( key = 1; key < limit.length + 1; key++ ) {
								attackdata += '	<tr>';
								attackdata += '		<th scope="row" class="spec">';
								attackdata += '			<a href="game.php?village=' + a_vID + '&amp;screen=overview&amp;">' + a_vName + '</a> <strong>(' + a_vCoordX + '|' + a_vCoordY + ')</strong>';
								if ( sWarGroup ) attackdata += ' War Group ' + a_vWarGroup;
								attackdata += '		</th>';
								
								attackdata += '		<td align="center">';
								attackdata += '			<a href="' + substrsub ( tabledata , '<a href="', '</a>' ) + '</a>';
								attackdata += '		</td>';
								
								attackdata += '		<td align="center">';
								attackdata += '			today at ' + substrsub ( tabledata , 'today at ', '</td>' );
								attackdata += '		</td>';
								
								attackdata += '		<td align="center">';
								attackdata += '			<span class="timer">' + substrsub ( tabledata , '<span class="timer">', '</span>' ) + '</span>';
								attackdata += '		</td>';
								attackdata += '	</tr>';
							}
						}
						
						attackdata = GM_getValue ( 'FW_temp' ) + attackdata;
						GM_setValue ( 'FW_temp' , attackdata );
					}
				});
				
				if ( attacks == 0 ) {
					attacks = 1;
				}
			}
		}
		
		//~ // Now handle friendly troop movements
		//~ for ( key = 1; key < limit; key++ ) {
			//~ var movements = 0;
			//~ data.rows[key].cells[0].innerHTML
			
			//~ if ( screen.indexOf('info') > -1 ) {
				//~ twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '&id=' + aID + '">' + a_vName + '</a></td></tr>'
			//~ } else {
				//~ twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '">' + a_vName + '</a></td></tr>'
			//~ }
		//~ }
		
		pMain.rows[0].cells[0].childNodes[0].innerHTML += data + GM_getValue ( 'FW_temp' ) + '</table>';
	}
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Settings_Custom
// Summary: Alters the custom settings screen
function FW_Screen_Settings_Custom() {
	var data = '';
	
	if ( getParam( 'job' ) == 'done' ) data += '<strong>Operation completed</strong>';
	data += '<br><br>';
	
	document.addEventListener('click', function(event) {
		if ( event.target.id == 'Submit' ) {
			GM_setValue( 'sWidth' , document.getElementById('width_input').value )
			GM_setValue( 'sWarGroup' , document.getElementById('wargroup_input').checked )
		
			window.location = gameURL +  vID + '&screen=settings_custom&job=done';
		}
	}, true);
	
	data += '<table id="mytable" cellspacing="0">';
	data += '	<tr>';
	data += '		<th scope="col" abbr="Configurations" class="nobg">Configurations</th>';
	data += '		<th scope="col" abbr="Setting">Setting</th>';
	data += '		<th scope="col" abbr="Summary">Summary</th>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="spec">Show War Group</th>';
	data += '		<td align="center">';
	
	if ( sWarGroup ) {
		data += '		<input type="checkbox" id="wargroup_input" checked />';
	} else {
		data += '		<input type="checkbox" id="wargroup_input" />';
	}
	
	data += '		</td>';
	data += '		<td>';
	data += "			Show current village's War Group on pages";
	data += '		</td>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<th scope="row" class="spec">Screen Width</th>';
	data += '		<td align="center">';
	data += '			<input type="text" size="2" id="width_input" value="' + sWidth +'" />';
	data += '		</td>';
	data += '		<td>';
	data += "			Width (in pixels) the width of the screen should be";
	data += '		</td>';
	data += '	</tr>';
	data += '	<tr>';
	data += '		<td align="center">';
	data += '			<br><br><input type="submit" value="Submit" id="Submit">';
	data += '		</td>';
	data += '	</tr>';
	data += '</table>';

	pMain.innerHTML = data + pMain.innerHTML;
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Rally_Point
// Summary: Alters the rally point screen
function FW_Screen_Rally_Point() {
	var data = '';
	
	//~ pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[1].innerHTML += 'test';
	
	pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].id = 'mytable';
	
	var a_vCoordX = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].rows[0].cells[0].innerHTML.match(/name="x" value="([\d]+)/)[1];
	var a_vCoordY = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].rows[0].cells[0].innerHTML.match(/name="y" value="([\d]+)/)[1];
	
	data += '<th scope="row" class="labeltop">';
	data += '	X: <input type="text" name="x" value="' + a_vCoordX + '" size="5" />';
	data += '</th>';
	data += '<th scope="row" class="labeltop">';
	data += '	Y: <input type="text" name="y" value="' + a_vCoordY + '" size="5" />';
	data += '</th>';
	
	if ( typeof GM_getValue ( 'favorite_villages' ) != 'undefined' ) {
		data += '<th scope="row" class="nobg">';

		data += '			<table class="menu" align="left" style="border: 0px;">';
		data += '				<tr id="menu_row2">';
		data += '					<td>';
		data += '						<a href="game.php?village=' + vID + '&amp;screen=favorite_villages">';
		data += '							Favorite villages';
		data += '						</a><br />';
		data += '						<table class="menu nowrap">';
		data += '							<tr id="menu_row">';
		data += '								<table cellspacing="0" width="120"style="border: 0px;">';
		
		var favorite = GM_getValue ( 'favorite_villages' ).split ( ';' )
		
		for ( key = 0; key < favorite.length - 1; key++ ) {
			var f_vName = favorite[key].split ( '(' )[0];
			var f_vCoordX = favorite[key].split ( '(' )[1].split ( '|' )[0];
			var f_vCoordY = favorite[key].split ( '(' )[1].split ( '|' )[1].split ( ')' )[0];
			
			data += '<tr>';
			data += '	<td style="border: 0px;">';
			data += '		<a href="javascript:insertNumber(document.forms[0].x, 000); javascript:insertNumber(document.forms[0].y, 000); javascript:insertNumber(document.forms[0].x, ' + f_vCoordX + '); javascript:insertNumber(document.forms[0].y, ' + f_vCoordY + ');">';
			data += f_vName;
			data += '		</a>';
			data += '	</td>';
			data += '</tr>';
		}
		
		data += '							</tr>';
		data += '						</table>';
		data += '					</td>';
		data += '				</tr>';
		data += '			</table>';

		data += '</th>';
	}
	
	data += '<th scope="row" class="label">';
	data += '	<input class="attack" name="attack" type="submit" value="Attack" style="font-size: 10pt;" /> ';
	data += '	<input class="support" name="support" type="submit" value="Support" style="font-size: 10pt;" />';
	data += '</th>';
	
	pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].rows[0].innerHTML = data;
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Favorite_Villages
// Summary: Alters the favorite villages screen
function FW_Screen_Favorite_Villages() {
	var favorite = GM_getValue ( 'favorite_villages' ).split ( ';' )
	
	if ( mode == 'remove' ) {
		for ( key = 0; key < favorite.length - 1; key++ ) {
			if ( key == getParam ( 'id' ) ) {
				GM_setValue ( 'favorite_villages' , GM_getValue ( 'favorite_villages' ).replace ( favorite[key] + ';' , '' ) );
			}
		}
		
		var favorite = GM_getValue ( 'favorite_villages' ).split ( ';' )
	}

	var data = '<h2>Favorite Villages</h2>';
	
	data += '<table id="mytable" cellspacing="0">';
	data += '	<tr>';
	data += '		<th scope="col" abbr="Setting">Name</th>';
	data += '		<th scope="col" abbr="Summary">Coordinates</th>';
	data += '	</tr>';
	
	for ( key = 0; key < favorite.length - 1; key++ ) {
		var f_vName = favorite[key].split ( '(' )[0];
		var f_vCoordX = favorite[key].split ( '(' )[1].split ( '|' )[0];
		var f_vCoordY = favorite[key].split ( '(' )[1].split ( '|' )[1].split ( ')' )[0];
		
		data += '<tr>';
		data += '	<th scope="row" class="spec">';
		data += f_vName;
		data += '	</th>';
		data += '	<td><strong>(' + f_vCoordX + '|' + f_vCoordY + ') K' + getContinent ( f_vCoordX , f_vCoordY )[0] + '</td>';
		data += '	<td><a href="' + gameURL + vID + '&screen=favorite_villages&mode=remove&id=' + key + '"> » Remove</a></td>';
		data += '</tr>';
	}
	
	document.addEventListener('click', function(event) {
	
		if ( event.target.id == 'favorite' ) {
			$( '#' + event.target.id ).fadeOut('slow', function(){
			
				if ( GM_getValue ( 'favorite_villages' ).search ( a_vName ) != -1 ) {
					var string = GM_getValue ( 'favorite_villages' );
					
					string = string.replace ( a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' , '' );
				
					GM_setValue ( 'favorite_villages' , string )
					$( '#' + event.target.id ).html( "» Add village to favorites" ).fadeIn('slow');
				} else {
					GM_setValue ( 'favorite_villages' , GM_getValue ( 'favorite_villages' ) + a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' )
					$( '#' + event.target.id ).html( "» Remove village from favorites" ).fadeIn('slow');
				}
			
			});
		}
		
	}, true);
	
	data += '</table>';
	
	pMain.rows[0].cells[0].innerHTML = data;
}

//__________________________________________________________________________________________________________________//

// Method: FW_Screen_Misc
// Summary: Alters any screen not explicitly called for
function FW_Screen_Misc() {
	var data = '';

	//_____________________________________//
	// Edit village overview page
	//===================================//
	if ( screen == 'overview' ) {
		pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[0].cells[0].width = "490";
		
		// Add daily resource production
		var Wood = pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[1].cells[1];
		var rawAmount = Wood.innerHTML.split(" per Hour"); rawAmount = rawAmount[0].split("<strong>"); rawAmount = rawAmount[1].split("</strong>"); 
		Wood.innerHTML = Wood.innerHTML + '<br><small><strong>' + parseInt(rawAmount[0])*24 + '</strong> per Day</small>';

		var Clay = pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[2].cells[1];
		var rawAmount = Clay.innerHTML.split(" per Hour"); rawAmount = rawAmount[0].split("<strong>"); rawAmount = rawAmount[1].split("</strong>"); 
		Clay.innerHTML = Clay.innerHTML + '<br><small><strong>' + parseInt(rawAmount[0])*24 + '</strong> per Day</small>';

		var Iron = pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[3].cells[1];
		var rawAmount = Iron.innerHTML.split(" per Hour"); rawAmount = rawAmount[0].split("<strong>"); rawAmount = rawAmount[1].split("</strong>"); 
		Iron.innerHTML = Iron.innerHTML + '<br><small><strong>' + parseInt(rawAmount[0])*24 + '</strong> per Day</small>';
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: baseURL + '/game.php?village=' + vID + '&screen=market',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html',
			},
			onload: function(responseDetails) {
				var sStart = '</table><h3>Incoming transports</h3>';
				var sEnd = '</table>';
				
				if ( Transports.indexOf(sStart) < 0 ) {
					var Transports = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);
					Transports = Transports.substring(0, Transports.indexOf(sEnd) + sEnd.length);
					//~ // Transports = Transports.split('</tr>');
					
					pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].innerHTML += Transports;
				}
			}
		});
	}
	
	//_____________________________________//
	// Edit incoming attack screen
	//===================================//
	if ( screen == 'info_command' ) {
		// Aesthetics
		var x = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0];
		x.innerHTML = "<div style='height: 16px; background-image: url(http://joshdb.com/k46/GM/info_player_row_top.png); background-repeat: no-repeat;'><div style='position: relative; left: 96px; top: 1px;'>" + x.innerHTML;
		
		pMain.rows[0].cells[0].childNodes[2].rows[1].cells[0].innerHTML = '';
		pMain.rows[0].cells[0].childNodes[2].rows[3].cells[0].innerHTML = '';
		
		var x = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[1];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 144px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_attacker_stats.png); background-repeat: no-repeat;'>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[1];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 144px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_defender_stats.png); background-repeat: no-repeat;'>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[2].cells[0];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_village.png); background-repeat: no-repeat;'>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[0];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_village.png); background-repeat: no-repeat;'>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[5].cells[0];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/travel_time.png); background-repeat: no-repeat;'>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[6].cells[0];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_at.png); background-repeat: no-repeat;'>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[7];
		x.innerHTML = "<td colspan='2'><div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_in.png); background-repeat: no-repeat;'></td><td>" + pMain.rows[0].cells[0].childNodes[2].rows[7].cells[1].innerHTML + "</td>";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[8].cells[0];
		x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_row.png); background-repeat: no-repeat;'><div style='position: relative; left: 90px; top: 1px;'>" + x.innerHTML + "";
		var x = pMain.rows[0].cells[0].childNodes[2].rows[9].cells[0];
		x.innerHTML = "<div style='height: 16px; width: 200px; background-image: url(http://joshdb.com/k46/GM/incoming_row.png); background-repeat: no-repeat;'><div style='position: relative; left: 90px; top: 1px;'>" + x.innerHTML + "";
		
		// Get attacking player id
		var aID = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[2].innerHTML.match(/screen=info_player&amp;id=([\d]+)/);
		
		// Add attacking player stats
		var aStats = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[2];
		aStats.innerHTML = '<div style="background: #DED3B9; height: 144px;">' + aStats.innerHTML + '<br><img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + aID + '&s=tw' + world + '">'
		
		// Add attacking village war group
		var aVwG = pMain.rows[0].cells[0].childNodes[2].rows[2].cells[1];
		var aCoords = aVwG.innerHTML.split("(");
		aCoords = aCoords[1].split(")");
		aCoords = aCoords[0].split("|");
		aCoords = new Array(aCoords[0], aCoords[1]);
		
		if ( sWarGroup ) {
			var aWargroup = getWarGroup( aCoords[0] , aCoords[1] );
			aVwG.innerHTML = aVwG.innerHTML + ' War Group <strong>' + aWargroup  + '</strong>';
		}
		
		// Get defending player id
		var dID = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[2].innerHTML.match(/screen=info_player&amp;id=([\d]+)/);
		
		// Add defending player stats
		var dStats = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[2];
		dStats.innerHTML = '<div style="background: #DED3B9; height: 144px;">' + dStats.innerHTML + '<br><img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + dID + '&s=tw' + world + '">'
		
		if ( sWarGroup ) {
			// Add attacking village war group
			var dVwG = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[1];
			var dCoords = dVwG.innerHTML.split("(");
			dCoords = dCoords[1].split(")");
			dCoords = dCoords[0].split("|");
			dCoords = new Array(dCoords[0], dCoords[1]);
			var dWargroup = getWarGroup( dCoords[0] , dCoords[1] );
			dVwG.innerHTML = dVwG.innerHTML + ' War Group <strong>' + dWargroup  + '</strong>';
		}
	}
}

// =================================================================================================================//
//__________________________________________________________________________________________________________________//
// GENERAL FUNCTIONS
//__________________________________________________________________________________________________________________//

// Method: getContinent
// Summary: Returns the continent a pair of coordinates falls in
// Params: int, int
// Returns: Array; [0] str, [1] int, [2] int
function getContinent( xCoord, yCoord ) {
	for (var x = 0; x <= 9; x++){
	   if ( xCoord >= ( ( x*100 ) - 1 ) ) { var conY = x; }
	}
	for (var y = 0; y <= 9; y++){
	   if ( yCoord >= ( ( y*100 ) - 1 ) ) { var conX = y; }
	}

	return new Array(conX + '' + conY, conX, conY);
}

//__________________________________________________________________________________________________________________//

// Method: getWarGroup
// Summary: Returns the War Group a pair of coordinates falls in
// Params: int, int
// Returns: str
function getWarGroup( xCoord, yCoord ) {
	var tContinent = getContinent( xCoord, yCoord );

	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) { return 'A1' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) { return 'A2' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) { return 'A3' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) { return 'A4' };
		
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) { return 'B1' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) { return 'B2' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) { return 'B3' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) { return 'B4' };
		
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) { return 'C1' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) { return 'C2' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) { return 'C3' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) { return 'C4' };
		
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) { return 'D1' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) { return 'D2' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) { return 'D3' };
	if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) { return 'D4' };
	
	return 'XX';
}

//__________________________________________________________________________________________________________________//

// Method: getParam
// Summary: Returns a parameter of the URL
// Params: str
// Returns: str
function getParam(name) {
	if (name == 'GETURL') {
		var regexS = "(.*)/(.*)";
		var regex = new RegExp( regexS );
		var tmpURL = window.location.href;
		var results = regex.exec( tmpURL );
	} else {
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp( regexS );
		var tmpURL = window.location.href;
		var results = regex.exec( tmpURL );
	}
	if( results == null )
		return "";
	else
		return results[1];
}
//__________________________________________________________________________________________________________________//

// Method: substrsub
// Summary: Returns the the string between two others
// Params: str, start, stop

function substrsub( str, start, stop ) { 
	return str.substring ( str.indexOf ( start ) + start.length, str.indexOf ( stop , str.indexOf ( start ) + start.length ) );
}
//__________________________________________________________________________________________________________________//

// Method: addGlobalStyle
// Summary: Adds global CSS styles to the page
// Params: css
function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
}
//__________________________________________________________________________________________________________________//

// Method: addGlobalJS
// Summary: Adds global JS to the page
// Params: JS
function addGlobalJS(js) {
		var head, jscript;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		jscript = document.createElement('script');
		jscript.type = 'text/javascript';
		jscript.innerHTML = js;
		head.appendChild(jscript);
}
//__________________________________________________________________________________________________________________//

// Method: addTableRow
// Summary: Adds rows to a table
// Params: table, str, str, str, int
function addTableRow(oTable, id, colSpan, text, pos) {
	if (pos == null)
		pos = oTable.rows.length;
		
	var row = oTable.insertRow(pos);
	var newCell = row.insertCell(0);
	newCell.id = id;
	newCell.colSpan = colSpan;
	var textNode = document.createTextNode('');
	newCell.appendChild(textNode);
	document.getElementById(id).innerHTML = text;
}

//__________________________________________________________________________________________________________________//

// Method: IsNumeric
// Summary: Checks if a number is numeric
// Params: str
function IsNumeric(sText) {
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}

//*/