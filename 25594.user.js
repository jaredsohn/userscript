{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset238{\*\fname Arial;}Arial CE;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           TriburileHack\par
// @namespace      Triburile Hack (Non-Premium Triburile Modification)\par
// @include        http://ro*.tribalwars.ro/*\par
// ==/UserScript==\par
\par
// ==SCRIPT MAP==------------------------------------------\par
\par
// -> [PAGE FILTER]\par
//\par
// -> [EXTERNAL SCRIPTS]\par
//\par
// -> [VARIABLE SETUP]\par
//\tab\tab -> pName\tab\tab (name of player)\tab\tab\tab\tab\tab\tab [str]\par
//\tab\tab -> pPoints\tab\tab (points of player)\tab\tab\tab\tab\tab\tab [int]\par
//\tab\tab -> pRank\tab\tab (rank of player)\tab\tab\tab\tab\tab\tab [int]\tab\par
//\tab\tab -> pVillages\tab (villages owned by player)\tab\tab\tab\tab [int]\par
//\par
//\tab\tab -> vID\tab\tab\tab (ID of active village)\tab\tab\tab\tab\tab [int]\par
//\tab\tab -> vName\tab\tab (name of active village)\tab\tab\tab\tab [str]\par
//\tab\tab -> vCoordX\tab\tab (x coord of active village)\tab\tab\tab\tab [int]\par
//\tab\tab -> vCoordY\tab\tab (y coord of active village)\tab\tab\tab\tab [int]\par
//\tab\tab -> vContinent\tab (continent of \tab active village)\tab\tab\tab [str]\par
//\tab\tab -> vWarGroup\tab (war group of active village)\tab\tab\tab [str]\par
//\par
//\tab\tab -> baseURL\tab\tab (http://xx00.tribalwars.abc)\tab\tab\tab [str]\par
//\tab\tab -> gameURL\tab\tab (http://xx00.tribalwars.abc/game.php)\tab [str]\par
//\tab\tab -> screen\tab\tab (active game screen)\tab\tab\tab\tab\tab [str]\par
//\tab\tab -> mode\tab\tab\tab (active game screen mode)\tab\tab\tab\tab [str]\par
//\tab\tab -> hash\tab\tab\tab (session hash)\tab\tab\tab\tab\tab\tab\tab [str]\par
//\par
//\tab\tab -> search \tab\tab (throwaway RegExp variable)\tab\tab\tab\tab [str]\par
//\tab\tab -> language\tab\tab (current language)\tab\tab\tab\tab\tab\tab [str]\par
//\tab\tab -> world\tab\tab (current world)\tab\tab\tab\tab\tab\tab\tab [str]\par
//\par
//\tab\tab -> twInterface\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab [array]\par
//\par
//\tab\tab -> pMain\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab [table]\par
//\par
//\tab\tab -> DebugMode\tab (log errors)\tab\tab\tab\tab\tab\tab\tab [int]\par
//\par
//\tab\tab -> sWidth\tab\tab (width of main table in pixels)\tab\tab\tab [str]\par
//\tab\tab -> sWarGroup\tab (show wargroup?)\tab\tab\tab\tab\tab\tab [flag]\par
//\par
// -> [VARIABLE SETUP]\par
//\par
// -> [MAIN SEQUENCE]\par
//\par
// -> [USER INFORMATION]\par
//\tab\tab -> FW_UserInfo()\par
//\tab\tab -> FW_SetupScriptInfo()\par
//\tab\tab -> FW_SetupUserInfo()\par
//\tab\tab -> FW_RefreshScriptInfo()\par
//\par
// -> [VARIABLES]\tab\par
//\tab\tab -> FW_Variables()\par
//\par
// -> [INTERFACE]\par
//\tab\tab -> FW_interface_AddStyles()\par
//\tab\tab -> FW_interface_BuildMenu()\par
//\tab\tab -> FW_interface_BuildQuickMenu()\par
//\tab\tab -> FW_interface_BuildPlayerBar()\par
//\tab\tab -> FW_interface_RenderMenu()\par
//\tab\tab -> FW_interface_Clean()\par
//\tab\tab -> FW_interface_Render()\par
//\par
//\tab -> [PAGE MODIFICATIONS]\par
//\tab\tab -> FW_Screen_Map()\par
//\tab\tab -> FW_Screen_Report()\par
//\tab\tab -> FW_Screen_Info_Player()\par
//\tab\tab -> FW_Screen_Info_Village()\par
//\tab\tab -> FW_Screen_Overview_Villages()\par
//\tab\tab -> FW_Screen_Settings_Custom()\par
//\tab\tab -> FW_Screen_Rally_Point()\par
//\tab\tab -> FW_Screen_Favorite_Villages()\par
//\par
//\tab\tab -> FW_Screen_Mist()\par
//\par
// -> [GENERAL FUNCTIONS]\tab\par
//\tab\tab -> getContinent(x, y)\par
//\tab\tab -> getWarGroup(x, y)\par
//\tab\tab -> getParam(name)\par
//\tab\tab -> substrsub(str, start, stop)\par
//\tab\tab -> addGlobalStyle(css)\par
//\tab\tab -> addGlobalJS(js)\par
//\tab\tab -> addTableRow(oTable, id, colSpan, text, pos)\par
\par
// =/SCRIPT MAP==------------------------------------------\par
\par
//__________________________________________________________________________________________________________________//\par
// PAGE FILTER\par
//__________________________________________________________________________________________________________________//\par
\par
var url = window.location.href;\par
\tab\par
if ( url.indexOf( 'captcha.php' ) == -1 ) \{\par
\tab var urlRemoved = 0;\par
\tab var urlRemove = new Array();\par
\par
\tab urlRemove[0]\tab =\tab '&intro';\par
\tab urlRemove[1]\tab =\tab '&popup';\par
\par
\tab for ( key in urlRemove ) \{\par
\tab\tab if ( url.search( urlRemove[key] ) != -1 ) \{\par
\tab\tab\tab url = url.replace( urlRemove[key], '' );\par
\tab\tab\tab\par
\tab\tab\tab urlRemoved = 1;\par
\tab\tab\}\par
\tab\}\par
\par
\tab if ( urlRemoved == 1 ) \{\par
\tab\tab window.location = url;\par
\tab\}\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
// EXTERNAL SCRIPTS\par
//__________________________________________________________________________________________________________________//\par
\par
eval(function(p,a,c,k,e,r)\{e=function(c)\{return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))\};if(!''.replace(/^/,String))\{while(c--)r[e(c)]=k[c]||e(c);k=[function(e)\{return r[e]\}];e=function()\{return'\\\\w+'\};c=1\};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p\}('q(1v 1F.6=="S")\{1F.S=1F.S;B 6=u(a,c)\{q(1F==7)v 1p 6(a,c);a=a||1h;q(6.1r(a))v 1p 6(1h)[6.E.39?"39":"36"](a);q(1v a=="21")\{B m=/^[^<]*(<(.|\\\\s)+>)[^>]*$/.2D(a);q(m)a=6.3C([m[1]]);K v 1p 6(c).2i(a)\}v 7.5g(a.1l==2L&&a||(a.3h||a.I&&a!=1F&&!a.20&&a[0]!=S&&a[0].20)&&6.40(a)||[a])\};q(1v $!="S")6.38$=$;B $=6;6.E=6.8e=\{3h:"1.1.2",89:u()\{v 7.I\},I:0,29:u(1R)\{v 1R==S?6.40(7):7[1R]\},2l:u(a)\{B L=6(a);L.5J=7;v L\},5g:u(a)\{7.I=0;[].1g.11(7,a);v 7\},J:u(E,1x)\{v 6.J(7,E,1x)\},2f:u(1a)\{B 4k=-1;7.J(u(i)\{q(7==1a)4k=i\});v 4k\},1D:u(22,P,C)\{B 1a=22;q(22.1l==3j)q(P==S)v 7.I&&6[C||"1D"](7[0],22)||S;K\{1a=\{\};1a[22]=P\}v 7.J(u(2f)\{Q(B G 1z 1a)6.1D(C?7.1u:7,G,6.G(7,1a[G],C,2f,G))\})\},1n:u(22,P)\{v 7.1D(22,P,"2V")\},2H:u(e)\{q(1v e=="21")v 7.44().41(1h.8q(e));B t="";6.J(e||7,u()\{6.J(7.2J,u()\{q(7.20!=8)t+=7.20!=1?7.67:6.E.2H([7])\})\});v t\},2I:u()\{B a=6.3C(1A);v 7.J(u()\{B b=a[0].3R(V);7.Y.2O(b,7);1Y(b.18)b=b.18;b.4H(7)\})\},41:u()\{v 7.2Y(1A,V,1,u(a)\{7.4H(a)\})\},5R:u()\{v 7.2Y(1A,V,-1,u(a)\{7.2O(a,7.18)\})\},5Q:u()\{v 7.2Y(1A,14,1,u(a)\{7.Y.2O(a,7)\})\},5L:u()\{v 7.2Y(1A,14,-1,u(a)\{7.Y.2O(a,7.2d)\})\},4z:u()\{v 7.5J||6([])\},2i:u(t)\{v 7.2l(6.2T(7,u(a)\{v 6.2i(t,a)\}),t)\},4w:u(4v)\{v 7.2l(6.2T(7,u(a)\{B a=a.3R(4v!=S?4v:V);a.$1I=17;v a\}))\},1y:u(t)\{v 7.2l(6.1r(t)&&6.2o(7,u(2w,2f)\{v t.11(2w,[2f])\})||6.3v(t,7))\},2b:u(t)\{v 7.2l(t.1l==3j&&6.3v(t,7,V)||6.2o(7,u(a)\{v(t.1l==2L||t.3h)?6.3i(a,t)<0:a!=t\}))\},1M:u(t)\{v 7.2l(6.2h(7.29(),t.1l==3j?6(t).29():t.I!=S&&(!t.1c||t.1c=="7m")?t:[t]))\},4f:u(1q)\{v 1q?6.1y(1q,7).r.I>0:14\},19:u(19)\{v 19==S?(7.I?7[0].P:17):7.1D("P",19)\},4d:u(19)\{v 19==S?(7.I?7[0].2C:17):7.44().41(19)\},2Y:u(1x,1O,3p,E)\{B 4w=7.I>1;B a=6.3C(1x);q(3p<0)a.6X();v 7.J(u()\{B 1a=7;q(1O&&6.1c(7,"1O")&&6.1c(a[0],"3u"))1a=7.5e("1V")[0]||7.4H(1h.5d("1V"));6.J(a,u()\{E.11(1a,[4w?7.3R(V):7])\})\})\}\};6.1w=6.E.1w=u()\{B 1U=1A[0],a=1;q(1A.I==1)\{1U=7;a=0\}B G;1Y(G=1A[a++])Q(B i 1z G)1U[i]=G[i];v 1U\};6.1w(\{6G:u()\{q(6.38$)$=6.38$;v 6\},1r:u(E)\{v!!E&&1v E!="21"&&!E.1c&&1v E[0]=="S"&&/u/i.1m(E+"")\},48:u(D)\{v D.52&&D.50&&!D.50.4Z\},1c:u(D,W)\{v D.1c&&D.1c.3d()==W.3d()\},J:u(1a,E,1x)\{q(1a.I==S)Q(B i 1z 1a)E.11(1a[i],1x||[i,1a[i]]);K Q(B i=0,6p=1a.I;i<6p;i++)q(E.11(1a[i],1x||[i,1a[i]])===14)3Y;v 1a\},G:u(D,P,C,2f,G)\{q(6.1r(P))P=P.43(D,[2f]);B 6i=/z-?2f|8s-?8p|1b|6c|8j-?25/i;v P&&P.1l==3X&&C=="2V"&&!6i.1m(G)?P+"4R":P\},16:\{1M:u(D,c)\{6.J(c.3W(/\\\\s+/),u(i,O)\{q(!6.16.35(D.16,O))D.16+=(D.16?" ":"")+O\})\},2e:u(D,c)\{D.16=c?6.2o(D.16.3W(/\\\\s+/),u(O)\{v!6.16.35(c,O)\}).64(" "):""\},35:u(t,c)\{t=t.16||t;c=c.1T(/([\\\\.\\\\\\\\\\\\+\\\\*\\\\?\\\\[\\\\^\\\\]\\\\$\\\\(\\\\)\\\\\{\\\\\}\\\\=\\\\!\\\\<\\\\>\\\\|\\\\:])/g,"\\\\\\\\$1");v t&&1p 4O("(^|\\\\\\\\s)"+c+"(\\\\\\\\s|$)").1m(t)\}\},4N:u(e,o,f)\{Q(B i 1z o)\{e.1u["1K"+i]=e.1u[i];e.1u[i]=o[i]\}f.11(e,[]);Q(B i 1z o)e.1u[i]=e.1u["1K"+i]\},1n:u(e,p)\{q(p=="25"||p=="3P")\{B 1K=\{\},3O,3M,d=["88","87","86","83"];6.J(d,u()\{1K["82"+7]=0;1K["80"+7+"7Z"]=0\});6.4N(e,1K,u()\{q(6.1n(e,"1e")!="1X")\{3O=e.7Y;3M=e.7X\}K\{e=6(e.3R(V)).2i(":4C").5N("2S").4z().1n(\{4A:"1G",3G:"7V",1e:"2E",7S:"0",7R:"0"\}).5C(e.Y)[0];B 2X=6.1n(e.Y,"3G");q(2X==""||2X=="4u")e.Y.1u.3G="7O";3O=e.7L;3M=e.7K;q(2X==""||2X=="4u")e.Y.1u.3G="4u";e.Y.3B(e)\}\});v p=="25"?3O:3M\}v 6.2V(e,p)\},2V:u(D,G,5z)\{B L;q(G=="1b"&&6.12.1k)v 6.1D(D.1u,"1b");q(G=="4r"||G=="2A")G=6.12.1k?"3y":"2A";q(!5z&&D.1u[G])L=D.1u[G];K q(1h.3x&&1h.3x.4q)\{q(G=="2A"||G=="3y")G="4r";G=G.1T(/([A-Z])/g,"-$1").4o();B O=1h.3x.4q(D,17);q(O)L=O.5x(G);K q(G=="1e")L="1X";K 6.4N(D,\{1e:"2E"\},u()\{B c=1h.3x.4q(7,"");L=c&&c.5x(G)||""\})\}K q(D.4m)\{B 5t=G.1T(/\\\\-(\\\\w)/g,u(m,c)\{v c.3d()\});L=D.4m[G]||D.4m[5t]\}v L\},3C:u(a)\{B r=[];6.J(a,u(i,1s)\{q(!1s)v;q(1s.1l==3X)1s=1s.7r();q(1v 1s=="21")\{B s=6.2N(1s),1N=1h.5d("1N"),28=[];B 2I=!s.15("<1t")&&[1,"<3q>","</3q>"]||(!s.15("<7h")||!s.15("<1V")||!s.15("<7g"))&&[1,"<1O>","</1O>"]||!s.15("<3u")&&[2,"<1O><1V>","</1V></1O>"]||(!s.15("<7c")||!s.15("<7a"))&&[3,"<1O><1V><3u>","</3u></1V></1O>"]||[0,"",""];1N.2C=2I[1]+s+2I[2];1Y(2I[0]--)1N=1N.18;q(6.12.1k)\{q(!s.15("<1O")&&s.15("<1V")<0)28=1N.18&&1N.18.2J;K q(2I[1]=="<1O>"&&s.15("<1V")<0)28=1N.2J;Q(B n=28.I-1;n>=0;--n)q(6.1c(28[n],"1V")&&!28[n].2J.I)28[n].Y.3B(28[n])\}1s=[];Q(B i=0,l=1N.2J.I;i<l;i++)1s.1g(1N.2J[i])\}q(1s.I===0&&!6.1c(1s,"3k"))v;q(1s[0]==S||6.1c(1s,"3k"))r.1g(1s);K r=6.2h(r,1s)\});v r\},1D:u(D,W,P)\{B 2j=6.48(D)?\{\}:\{"Q":"73","72":"16","4r":6.12.1k?"3y":"2A",2A:6.12.1k?"3y":"2A",2C:"2C",16:"16",P:"P",2P:"2P",2S:"2S",70:"6Y",2Q:"2Q"\};q(W=="1b"&&6.12.1k&&P!=S)\{D.6c=1;v D.1y=D.1y.1T(/49\\\\([^\\\\)]*\\\\)/6T,"")+(P==1?"":"49(1b="+P*5r+")")\}K q(W=="1b"&&6.12.1k)v D.1y?4g(D.1y.6P(/49\\\\(1b=(.*)\\\\)/)[1])/5r:1;q(W=="1b"&&6.12.3r&&P==1)P=0.6M;q(2j[W])\{q(P!=S)D[2j[W]]=P;v D[2j[W]]\}K q(P==S&&6.12.1k&&6.1c(D,"3k")&&(W=="6L"||W=="6J"))v D.6I(W).67;K q(D.52)\{q(P!=S)D.6H(W,P);q(6.12.1k&&/5a|3z/.1m(W)&&!6.48(D))v D.31(W,2);v D.31(W)\}K\{W=W.1T(/-([a-z])/6E,u(z,b)\{v b.3d()\});q(P!=S)D[W]=P;v D[W]\}\},2N:u(t)\{v t.1T(/^\\\\s+|\\\\s+$/g,"")\},40:u(a)\{B r=[];q(a.1l!=2L)Q(B i=0,2x=a.I;i<2x;i++)r.1g(a[i]);K r=a.3D(0);v r\},3i:u(b,a)\{Q(B i=0,2x=a.I;i<2x;i++)q(a[i]==b)v i;v-1\},2h:u(2y,3E)\{B r=[].3D.43(2y,0);Q(B i=0,54=3E.I;i<54;i++)q(6.3i(3E[i],r)==-1)2y.1g(3E[i]);v 2y\},2o:u(1P,E,47)\{q(1v E=="21")E=1p 4J("a","i","v "+E);B 1f=[];Q(B i=0,2w=1P.I;i<2w;i++)q(!47&&E(1P[i],i)||47&&!E(1P[i],i))1f.1g(1P[i]);v 1f\},2T:u(1P,E)\{q(1v E=="21")E=1p 4J("a","v "+E);B 1f=[],r=[];Q(B i=0,2w=1P.I;i<2w;i++)\{B 19=E(1P[i],i);q(19!==17&&19!=S)\{q(19.1l!=2L)19=[19];1f=1f.6y(19)\}\}B r=1f.I?[1f[0]]:[];5S:Q(B i=1,5V=1f.I;i<5V;i++)\{Q(B j=0;j<i;j++)q(1f[i]==r[j])4Y 5S;r.1g(1f[i])\}v r\}\});1p u()\{B b=6t.6s.4o();6.12=\{3c:/6o/.1m(b),45:/45/.1m(b),1k:/1k/.1m(b)&&!/45/.1m(b),3r:/3r/.1m(b)&&!/(8y|6o)/.1m(b)\};6.8x=!6.12.1k||1h.8w=="8v"\};6.J(\{6h:"a.Y",4V:"6.4V(a)",8t:"6.27(a,2,\\'2d\\')",8r:"6.27(a,2,\\'6m\\')",8n:"6.2K(a.Y.18,a)",8m:"6.2K(a.18)"\},u(i,n)\{6.E[i]=u(a)\{B L=6.2T(7,n);q(a&&1v a=="21")L=6.3v(a,L);v 7.2l(L)\}\});6.J(\{5C:"41",8l:"5R",2O:"5Q",8k:"5L"\},u(i,n)\{6.E[i]=u()\{B a=1A;v 7.J(u()\{Q(B j=0,2x=a.I;j<2x;j++)6(a[j])[n](7)\})\}\});6.J(\{5N:u(22)\{6.1D(7,22,"");7.8i(22)\},8h:u(c)\{6.16.1M(7,c)\},8g:u(c)\{6.16.2e(7,c)\},8f:u(c)\{6.16[6.16.35(7,c)?"2e":"1M"](7,c)\},2e:u(a)\{q(!a||6.1y(a,[7]).r.I)7.Y.3B(7)\},44:u()\{1Y(7.18)7.3B(7.18)\}\},u(i,n)\{6.E[i]=u()\{v 7.J(n,1A)\}\});6.J(["6b","6a","69","68"],u(i,n)\{6.E[n]=u(1R,E)\{v 7.1y(":"+n+"("+1R+")",E)\}\});6.J(["25","3P"],u(i,n)\{6.E[n]=u(h)\{v h==S?(7.I?6.1n(7[0],n):17):7.1n(n,h.1l==3j?h:h+"4R")\}\});6.1w(\{1q:\{"":"m[2]==\\'*\\'||6.1c(a,m[2])","#":"a.31(\\'2Z\\')==m[2]",":":\{6a:"i<m[3]-0",69:"i>m[3]-0",27:"m[3]-0==i",6b:"m[3]-0==i",2y:"i==0",37:"i==r.I-1",66:"i%2==0",65:"i%2","27-3V":"6.27(a.Y.18,m[3],\\'2d\\',a)==a","2y-3V":"6.27(a.Y.18,1,\\'2d\\')==a","37-3V":"6.27(a.Y.8d,1,\\'6m\\')==a","8c-3V":"6.2K(a.Y.18).I==1",6h:"a.18",44:"!a.18",68:"6.E.2H.11([a]).15(m[3])>=0",34:\\'a.C!="1G"&&6.1n(a,"1e")!="1X"&&6.1n(a,"4A")!="1G"\\',1G:\\'a.C=="1G"||6.1n(a,"1e")=="1X"||6.1n(a,"4A")=="1G"\\',8b:"!a.2P",2P:"a.2P",2S:"a.2S",2Q:"a.2Q||6.1D(a,\\'2Q\\')",2H:"a.C==\\'2H\\'",4C:"a.C==\\'4C\\'",63:"a.C==\\'63\\'",4Q:"a.C==\\'4Q\\'",62:"a.C==\\'62\\'",4P:"a.C==\\'4P\\'",61:"a.C==\\'61\\'",60:"a.C==\\'60\\'",3S:\\'a.C=="3S"||6.1c(a,"3S")\\',5Z:"/5Z|3q|8a|3S/i.1m(a.1c)"\},".":"6.16.35(a,m[2])","@":\{"=":"z==m[4]","!=":"z!=m[4]","^=":"z&&!z.15(m[4])","$=":"z&&z.2M(z.I - m[4].I,m[4].I)==m[4]","*=":"z&&z.15(m[4])>=0","":"z",4M:u(m)\{v["",m[1],m[3],m[2],m[5]]\},5Y:"z=a[m[3]];q(!z||/5a|3z/.1m(m[3]))z=6.1D(a,m[3]);"\},"[":"6.2i(m[2],a).I"\},5X:[/^\\\\[ *(@)([a-2g-3Q-]*) *([!*$^=]*) *(\\'?"?)(.*?)\\\\4 *\\\\]/i,/^(\\\\[)\\\\s*(.*?(\\\\[.*?\\\\])?[^[]*?)\\\\s*\\\\]/,/^(:)([a-2g-3Q-]*)\\\\("?\\'?(.*?(\\\\(.*?\\\\))?[^(]*?)"?\\'?\\\\)/i,/^([:.#]*)([a-2g-3Q*-]*)/i],1S:[/^(\\\\/?\\\\.\\\\.)/,"a.Y",/^(>|\\\\/)/,"6.2K(a.18)",/^(\\\\+)/,"6.27(a,2,\\'2d\\')",/^(~)/,u(a)\{B s=6.2K(a.Y.18);v s.3D(6.3i(a,s)+1)\}],3v:u(1q,1P,2b)\{B 1K,O=[];1Y(1q&&1q!=1K)\{1K=1q;B f=6.1y(1q,1P,2b);1q=f.t.1T(/^\\\\s*,\\\\s*/,"");O=2b?1P=f.r:6.2h(O,f.r)\}v O\},2i:u(t,1C)\{q(1v t!="21")v[t];q(1C&&!1C.20)1C=17;1C=1C||1h;q(!t.15("//"))\{1C=1C.4L;t=t.2M(2,t.I)\}K q(!t.15("/"))\{1C=1C.4L;t=t.2M(1,t.I);q(t.15("/")>=1)t=t.2M(t.15("/"),t.I)\}B L=[1C],2a=[],37=17;1Y(t&&37!=t)\{B r=[];37=t;t=6.2N(t).1T(/^\\\\/\\\\//i,"");B 3N=14;B 1H=/^[\\\\/>]\\\\s*([a-2g-9*-]+)/i;B m=1H.2D(t);q(m)\{6.J(L,u()\{Q(B c=7.18;c;c=c.2d)q(c.20==1&&(6.1c(c,m[1])||m[1]=="*"))r.1g(c)\});L=r;t=t.1T(1H,"");q(t.15(" ")==0)4Y;3N=V\}K\{Q(B i=0;i<6.1S.I;i+=2)\{B 1H=6.1S[i];B m=1H.2D(t);q(m)\{r=L=6.2T(L,6.1r(6.1S[i+1])?6.1S[i+1]:u(a)\{v 3L(6.1S[i+1])\});t=6.2N(t.1T(1H,""));3N=V;3Y\}\}\}q(t&&!3N)\{q(!t.15(","))\{q(L[0]==1C)L.4K();6.2h(2a,L);r=L=[1C];t=" "+t.2M(1,t.I)\}K\{B 32=/^([a-2g-3Q-]+)(#)([a-2g-9\\\\\\\\*38-]*)/i;B m=32.2D(t);q(m)\{m=[0,m[2],m[3],m[1]]\}K\{32=/^([#.]?)([a-2g-9\\\\\\\\*38-]*)/i;m=32.2D(t)\}q(m[1]=="#"&&L[L.I-1].5W)\{B 2m=L[L.I-1].5W(m[2]);q(6.12.1k&&2m&&2m.2Z!=m[2])2m=6(\\'[@2Z="\\'+m[2]+\\'"]\\',L[L.I-1])[0];L=r=2m&&(!m[3]||6.1c(2m,m[3]))?[2m]:[]\}K\{q(m[1]==".")B 4I=1p 4O("(^|\\\\\\\\s)"+m[2]+"(\\\\\\\\s|$)");6.J(L,u()\{B 3K=m[1]!=""||m[0]==""?"*":m[2];q(6.1c(7,"84")&&3K=="*")3K="30";6.2h(r,m[1]!=""&&L.I!=1?6.4G(7,[],m[1],m[2],4I):7.5e(3K))\});q(m[1]=="."&&L.I==1)r=6.2o(r,u(e)\{v 4I.1m(e.16)\});q(m[1]=="#"&&L.I==1)\{B 5U=r;r=[];6.J(5U,u()\{q(7.31("2Z")==m[2])\{r=[7];v 14\}\})\}L=r\}t=t.1T(32,"")\}\}q(t)\{B 19=6.1y(t,r);L=r=19.r;t=6.2N(19.t)\}\}q(L&&L[0]==1C)L.4K();6.2h(2a,L);v 2a\},1y:u(t,r,2b)\{1Y(t&&/^[a-z[(\{<*:.#]/i.1m(t))\{B p=6.5X,m;6.J(p,u(i,1H)\{m=1H.2D(t);q(m)\{t=t.81(m[0].I);q(6.1q[m[1]].4M)m=6.1q[m[1]].4M(m);v 14\}\});q(m[1]==":"&&m[2]=="2b")r=6.1y(m[3],r,V).r;K q(m[1]==".")\{B 1H=1p 4O("(^|\\\\\\\\s)"+m[2]+"(\\\\\\\\s|$)");r=6.2o(r,u(e)\{v 1H.1m(e.16||"")\},2b)\}K\{B f=6.1q[m[1]];q(1v f!="21")f=6.1q[m[1]][m[2]];3L("f = u(a,i)\{"+(6.1q[m[1]].5Y||"")+"v "+f+"\}");r=6.2o(r,f,2b)\}\}v\{r:r,t:t\}\},4G:u(o,r,1S,W,1H)\{Q(B s=o.18;s;s=s.2d)q(s.20==1)\{B 1M=V;q(1S==".")1M=s.16&&1H.1m(s.16);K q(1S=="#")1M=s.31("2Z")==W;q(1M)r.1g(s);q(1S=="#"&&r.I)3Y;q(s.18)6.4G(s,r,1S,W,1H)\}v r\},4V:u(D)\{B 4F=[];B O=D.Y;1Y(O&&O!=1h)\{4F.1g(O);O=O.Y\}v 4F\},27:u(O,1f,3p,D)\{1f=1f||1;B 1R=0;Q(;O;O=O[3p])\{q(O.20==1)1R++;q(1R==1f||1f=="66"&&1R%2==0&&1R>1&&O==D||1f=="65"&&1R%2==1&&O==D)v O\}\},2K:u(n,D)\{B r=[];Q(;n;n=n.2d)\{q(n.20==1&&(!D||n!=D))r.1g(n)\}v r\}\});6.H=\{1M:u(T,C,1i,F)\{q(6.12.1k&&T.4E!=S)T=1F;q(F)1i.F=F;q(!1i.2s)1i.2s=7.2s++;q(!T.$1I)T.$1I=\{\};B 2W=T.$1I[C];q(!2W)\{2W=T.$1I[C]=\{\};q(T["2U"+C])2W[0]=T["2U"+C]\}2W[1i.2s]=1i;T["2U"+C]=7.5P;q(!7.1j[C])7.1j[C]=[];7.1j[C].1g(T)\},2s:1,1j:\{\},2e:u(T,C,1i)\{q(T.$1I)\{B i,j,k;q(C&&C.C)\{1i=C.1i;C=C.C\}q(C&&T.$1I[C])q(1i)5O T.$1I[C][1i.2s];K Q(i 1z T.$1I[C])5O T.$1I[C][i];K Q(j 1z T.$1I)7.2e(T,j);Q(k 1z T.$1I[C])q(k)\{k=V;3Y\}q(!k)T["2U"+C]=17\}\},1Q:u(C,F,T)\{F=6.40(F||[]);q(!T)6.J(7.1j[C]||[],u()\{6.H.1Q(C,F,7)\});K\{B 1i=T["2U"+C],19,E=6.1r(T[C]);q(1i)\{F.5M(7.2j(\{C:C,1U:T\}));q((19=1i.11(T,F))!==14)7.4B=V\}q(E&&19!==14)T[C]();7.4B=14\}\},5P:u(H)\{q(1v 6=="S"||6.H.4B)v;H=6.H.2j(H||1F.H||\{\});B 3H;B c=7.$1I[H.C];B 1x=[].3D.43(1A,1);1x.5M(H);Q(B j 1z c)\{1x[0].1i=c[j];1x[0].F=c[j].F;q(c[j].11(7,1x)===14)\{H.2k();H.2B();3H=14\}\}q(6.12.1k)H.1U=H.2k=H.2B=H.1i=H.F=17;v 3H\},2j:u(H)\{q(!H.1U&&H.5K)H.1U=H.5K;q(H.5I==S&&H.5H!=S)\{B e=1h.4L,b=1h.4Z;H.5I=H.5H+(e.5G||b.5G);H.7W=H.7U+(e.5F||b.5F)\}q(6.12.3c&&H.1U.20==3)\{B 2R=H;H=6.1w(\{\},2R);H.1U=2R.1U.Y;H.2k=u()\{v 2R.2k()\};H.2B=u()\{v 2R.2B()\}\}q(!H.2k)H.2k=u()\{7.3H=14\};q(!H.2B)H.2B=u()\{7.7T=V\};v H\}\};6.E.1w(\{3F:u(C,F,E)\{v 7.J(u()\{6.H.1M(7,C,E||F,F)\})\},5E:u(C,F,E)\{v 7.J(u()\{6.H.1M(7,C,u(H)\{6(7).5D(H);v(E||F).11(7,1A)\},F)\})\},5D:u(C,E)\{v 7.J(u()\{6.H.2e(7,C,E)\})\},1Q:u(C,F)\{v 7.J(u()\{6.H.1Q(C,F,7)\})\},3I:u()\{B a=1A;v 7.5B(u(e)\{7.4x=7.4x==0?1:0;e.2k();v a[7.4x].11(7,[e])||14\})\},7Q:u(f,g)\{u 4X(e)\{B p=(e.C=="3U"?e.7P:e.7N)||e.7M;1Y(p&&p!=7)2z\{p=p.Y\}2G(e)\{p=7\};q(p==7)v 14;v(e.C=="3U"?f:g).11(7,[e])\}v 7.3U(4X).5A(4X)\},39:u(f)\{q(6.3T)f.11(1h,[6]);K\{6.3b.1g(u()\{v f.11(7,[6])\})\}v 7\}\});6.1w(\{3T:14,3b:[],39:u()\{q(!6.3T)\{6.3T=V;q(6.3b)\{6.J(6.3b,u()\{7.11(1h)\});6.3b=17\}q(6.12.3r||6.12.45)1h.7J("7I",6.39,14)\}\}\});1p u()\{6.J(("7F,7E,36,7D,7C,4s,5B,7B,"+"7A,7z,7y,3U,5A,7x,3q,"+"4P,7w,7v,7u,2v").3W(","),u(i,o)\{6.E[o]=u(f)\{v f?7.3F(o,f):7.1Q(o)\}\})\};q(6.12.1k)6(1F).5E("4s",u()\{B 1j=6.H.1j;Q(B C 1z 1j)\{B 4p=1j[C],i=4p.I;q(i&&C!=\\'4s\\')7t 6.H.2e(4p[i-1],C);1Y(--i)\}\});6.E.1w(\{7s:u(U,1Z,M)\{7.36(U,1Z,M,1)\},36:u(U,1Z,M,1W)\{q(6.1r(U))v 7.3F("36",U);M=M||u()\{\};B C="5w";q(1Z)q(6.1r(1Z))\{M=1Z;1Z=17\}K\{1Z=6.30(1Z);C="5v"\}B 46=7;6.3f(\{U:U,C:C,F:1Z,1W:1W,2c:u(2F,10)\{q(10=="2t"||!1W&&10=="5s")46.1D("2C",2F.3g).4j().J(M,[2F.3g,10,2F]);K M.11(46,[2F.3g,10,2F])\}\});v 7\},7o:u()\{v 6.30(7)\},4j:u()\{v 7.2i("4i").J(u()\{q(7.3z)6.5q(7.3z);K 6.4h(7.2H||7.7n||7.2C||"")\}).4z()\}\});q(!1F.3s)3s=u()\{v 1p 7l("7j.7i")\};6.J("5p,5o,5n,5m,5l,5k".3W(","),u(i,o)\{6.E[o]=u(f)\{v 7.3F(o,f)\}\});6.1w(\{29:u(U,F,M,C,1W)\{q(6.1r(F))\{M=F;F=17\}v 6.3f(\{U:U,F:F,2t:M,4e:C,1W:1W\})\},7f:u(U,F,M,C)\{v 6.29(U,F,M,C,1)\},5q:u(U,M)\{v 6.29(U,17,M,"4i")\},7b:u(U,F,M)\{v 6.29(U,F,M,"5j")\},79:u(U,F,M,C)\{q(6.1r(F))\{M=F;F=\{\}\}v 6.3f(\{C:"5v",U:U,F:F,2t:M,4e:C\})\},78:u(23)\{6.3o.23=23\},77:u(5i)\{6.1w(6.3o,5i)\},3o:\{1j:V,C:"5w",23:0,5h:"76/x-75-3k-74",5f:V,3l:V,F:17\},3m:\{\},3f:u(s)\{s=6.1w(\{\},6.3o,s);q(s.F)\{q(s.5f&&1v s.F!="21")s.F=6.30(s.F);q(s.C.4o()=="29")\{s.U+=((s.U.15("?")>-1)?"&":"?")+s.F;s.F=17\}\}q(s.1j&&!6.4b++)6.H.1Q("5p");B 4c=14;B N=1p 3s();N.71(s.C,s.U,s.3l);q(s.F)N.3n("6Z-7d",s.5h);q(s.1W)N.3n("7e-4a-6W",6.3m[s.U]||"6V, 6U 6S 7k 4l:4l:4l 6R");N.3n("X-6Q-7p","3s");q(N.7q)N.3n("6O","6N");q(s.5u)s.5u(N);q(s.1j)6.H.1Q("5k",[N,s]);B 3t=u(4n)\{q(N&&(N.6K==4||4n=="23"))\{4c=V;q(3w)\{5c(3w);3w=17\}B 10;2z\{10=6.5b(N)&&4n!="23"?s.1W&&6.6q(N,s.U)?"5s":"2t":"2v";q(10!="2v")\{B 3J;2z\{3J=N.4y("59-4a")\}2G(e)\{\}q(s.1W&&3J)6.3m[s.U]=3J;B F=6.5y(N,s.4e);q(s.2t)s.2t(F,10);q(s.1j)6.H.1Q("5l",[N,s])\}K 6.3A(s,N,10)\}2G(e)\{10="2v";6.3A(s,N,10,e)\}q(s.1j)6.H.1Q("5n",[N,s]);q(s.1j&&!--6.4b)6.H.1Q("5o");q(s.2c)s.2c(N,10);q(s.3l)N=17\}\};B 3w=4E(3t,13);q(s.23>0)58(u()\{q(N)\{N.6F();q(!4c)3t("23")\}\},s.23);2z\{N.7G(s.F)\}2G(e)\{6.3A(s,N,17,e)\}q(!s.3l)3t();v N\},3A:u(s,N,10,e)\{q(s.2v)s.2v(N,10,e);q(s.1j)6.H.1Q("5m",[N,s,e])\},4b:0,5b:u(r)\{2z\{v!r.10&&7H.6D=="4Q:"||(r.10>=57&&r.10<6C)||r.10==56||6.12.3c&&r.10==S\}2G(e)\{\}v 14\},6q:u(N,U)\{2z\{B 55=N.4y("59-4a");v N.10==56||55==6.3m[U]||6.12.3c&&N.10==S\}2G(e)\{\}v 14\},5y:u(r,C)\{B 4t=r.4y("6B-C");B F=!C&&4t&&4t.15("N")>=0;F=C=="N"||F?r.6A:r.3g;q(C=="4i")6.4h(F);q(C=="5j")3L("F = "+F);q(C=="4d")6("<1N>").4d(F).4j();v F\},30:u(a)\{B s=[];q(a.1l==2L||a.3h)6.J(a,u()\{s.1g(2p(7.W)+"="+2p(7.P))\});K Q(B j 1z a)q(a[j]&&a[j].1l==2L)6.J(a[j],u()\{s.1g(2p(j)+"="+2p(7))\});K s.1g(2p(j)+"="+2p(a[j]));v s.64("&")\},4h:u(F)\{q(1F.53)1F.53(F);K q(6.12.3c)1F.58(F,0);K 3L.43(1F,F)\}\});6.E.1w(\{1L:u(R,M)\{B 1G=7.1y(":1G");R?1G.24(\{25:"1L",3P:"1L",1b:"1L"\},R,M):1G.J(u()\{7.1u.1e=7.2u?7.2u:"";q(6.1n(7,"1e")=="1X")7.1u.1e="2E"\});v 7\},1E:u(R,M)\{B 34=7.1y(":34");R?34.24(\{25:"1E",3P:"1E",1b:"1E"\},R,M):34.J(u()\{7.2u=7.2u||6.1n(7,"1e");q(7.2u=="1X")7.2u="2E";7.1u.1e="1X"\});v 7\},51:6.E.3I,3I:u(E,4D)\{B 1x=1A;v 6.1r(E)&&6.1r(4D)?7.51(E,4D):7.J(u()\{6(7)[6(7).4f(":1G")?"1L":"1E"].11(6(7),1x)\})\},6z:u(R,M)\{v 7.24(\{25:"1L"\},R,M)\},6x:u(R,M)\{v 7.24(\{25:"1E"\},R,M)\},6w:u(R,M)\{v 7.J(u()\{B 5T=6(7).4f(":1G")?"1L":"1E";6(7).24(\{25:5T\},R,M)\})\},6v:u(R,M)\{v 7.24(\{1b:"1L"\},R,M)\},6u:u(R,M)\{v 7.24(\{1b:"1E"\},R,M)\},85:u(R,3e,M)\{v 7.24(\{1b:3e\},R,M)\},24:u(G,R,1o,M)\{v 7.1J(u()\{7.2r=6.1w(\{\},G);B 1t=6.R(R,1o,M);Q(B p 1z G)\{B e=1p 6.33(7,1t,p);q(G[p].1l==3X)e.2q(e.O(),G[p]);K e[G[p]](G)\}\})\},1J:u(C,E)\{q(!E)\{E=C;C="33"\}v 7.J(u()\{q(!7.1J)7.1J=\{\};q(!7.1J[C])7.1J[C]=[];7.1J[C].1g(E);q(7.1J[C].I==1)E.11(7)\})\}\});6.1w(\{R:u(R,1o,E)\{B 1t=R&&R.1l==6r?R:\{2c:E||!E&&1o||6.1r(R)&&R,26:R,1o:E&&1o||1o&&1o.1l!=4J&&1o\};1t.26=(1t.26&&1t.26.1l==3X?1t.26:\{8C:8B,8A:57\}[1t.26])||8z;1t.1K=1t.2c;1t.2c=u()\{6.6n(7,"33");q(6.1r(1t.1K))1t.1K.11(7)\};v 1t\},1o:\{\},1J:\{\},6n:u(D,C)\{C=C||"33";q(D.1J&&D.1J[C])\{D.1J[C].4K();B f=D.1J[C][0];q(f)f.11(D)\}\},33:u(D,1d,G)\{B z=7;B y=D.1u;B 4W=6.1n(D,"1e");y.6l="1G";z.a=u()\{q(1d.3Z)1d.3Z.11(D,[z.2n]);q(G=="1b")6.1D(y,"1b",z.2n);K q(6k(z.2n))y[G]=6k(z.2n)+"4R";y.1e="2E"\};z.6j=u()\{v 4g(6.1n(D,G))\};z.O=u()\{B r=4g(6.2V(D,G));v r&&r>-8u?r:z.6j()\};z.2q=u(4S,3e)\{z.4T=(1p 6g()).6f();z.2n=4S;z.a();z.4U=4E(u()\{z.3Z(4S,3e)\},13)\};z.1L=u()\{q(!D.1B)D.1B=\{\};D.1B[G]=7.O();1d.1L=V;z.2q(0,D.1B[G]);q(G!="1b")y[G]="6e"\};z.1E=u()\{q(!D.1B)D.1B=\{\};D.1B[G]=7.O();1d.1E=V;z.2q(D.1B[G],0)\};z.3I=u()\{q(!D.1B)D.1B=\{\};D.1B[G]=7.O();q(4W=="1X")\{1d.1L=V;q(G!="1b")y[G]="6e";z.2q(0,D.1B[G])\}K\{1d.1E=V;z.2q(D.1B[G],0)\}\};z.3Z=u(3a,42)\{B t=(1p 6g()).6f();q(t>1d.26+z.4T)\{5c(z.4U);z.4U=17;z.2n=42;z.a();q(D.2r)D.2r[G]=V;B 2a=V;Q(B i 1z D.2r)q(D.2r[i]!==V)2a=14;q(2a)\{y.6l="";y.1e=4W;q(6.1n(D,"1e")=="1X")y.1e="2E";q(1d.1E)y.1e="1X";q(1d.1E||1d.1L)Q(B p 1z D.2r)q(p=="1b")6.1D(y,p,D.1B[p]);K y[p]=""\}q(2a&&6.1r(1d.2c))1d.2c.11(D)\}K\{B n=t-7.4T;B p=n/1d.26;z.2n=1d.1o&&6.1o[1d.1o]?6.1o[1d.1o](p,n,3a,(42-3a),1d.26):((-6d.8o(p*6d.8D)/2)+0.5)*(42-3a)+3a;z.a()\}\}\}\})\}',62,536,'||||||jQuery|this|||||||||||||||||||if||||function|return||||||var|type|elem|fn|data|prop|event|length|each|else|ret|callback|xml|cur|value|for|speed|undefined|element|url|true|name||parentNode||status|apply|browser||false|indexOf|className|null|firstChild|val|obj|opacity|nodeName|options|display|result|push|document|handler|global|msie|constructor|test|css|easing|new|expr|isFunction|arg|opt|style|typeof|extend|args|filter|in|arguments|orig|context|attr|hide|window|hidden|re|events|queue|old|show|add|div|table|elems|trigger|num|token|replace|target|tbody|ifModified|none|while|params|nodeType|string|key|timeout|animate|height|duration|nth|tb|get|done|not|complete|nextSibling|remove|index|z0|merge|find|fix|preventDefault|pushStack|oid|now|grep|encodeURIComponent|custom|curAnim|guid|success|oldblock|error|el|al|first|try|cssFloat|stopPropagation|innerHTML|exec|block|res|catch|text|wrap|childNodes|sibling|Array|substr|trim|insertBefore|disabled|selected|originalEvent|checked|map|on|curCSS|handlers|parPos|domManip|id|param|getAttribute|re2|fx|visible|has|load|last|_|ready|firstNum|readyList|safari|toUpperCase|to|ajax|responseText|jquery|inArray|String|form|async|lastModified|setRequestHeader|ajaxSettings|dir|select|mozilla|XMLHttpRequest|onreadystatechange|tr|multiFilter|ival|defaultView|styleFloat|src|handleError|removeChild|clean|slice|second|bind|position|returnValue|toggle|modRes|tag|eval|oWidth|foundToken|oHeight|width|9_|cloneNode|button|isReady|mouseover|child|split|Number|break|step|makeArray|append|lastNum|call|empty|opera|self|inv|isXMLDoc|alpha|Modified|active|requestDone|html|dataType|is|parseFloat|globalEval|script|evalScripts|pos|00|currentStyle|isTimeout|toLowerCase|els|getComputedStyle|float|unload|ct|static|deep|clone|lastToggle|getResponseHeader|end|visibility|triggered|radio|fn2|setInterval|matched|getAll|appendChild|rec|Function|shift|documentElement|_resort|swap|RegExp|submit|file|px|from|startTime|timer|parents|oldDisplay|handleHover|continue|body|ownerDocument|_toggle|tagName|execScript|sl|xmlRes|304|200|setTimeout|Last|href|httpSuccess|clearInterval|createElement|getElementsByTagName|processData|setArray|contentType|settings|json|ajaxSend|ajaxSuccess|ajaxError|ajaxComplete|ajaxStop|ajaxStart|getScript|100|notmodified|newProp|beforeSend|POST|GET|getPropertyValue|httpData|force|mouseout|click|appendTo|unbind|one|scrollTop|scrollLeft|clientX|pageX|prevObject|srcElement|after|unshift|removeAttr|delete|handle|before|prepend|check|state|tmp|rl|getElementById|parse|_prefix|input|reset|image|password|checkbox|join|odd|even|nodeValue|contains|gt|lt|eq|zoom|Math|1px|getTime|Date|parent|exclude|max|parseInt|overflow|previousSibling|dequeue|webkit|ol|httpNotModified|Object|userAgent|navigator|fadeOut|fadeIn|slideToggle|slideUp|concat|slideDown|responseXML|content|300|protocol|ig|abort|noConflict|setAttribute|getAttributeNode|method|readyState|action|9999|close|Connection|match|Requested|GMT|Jan|gi|01|Thu|Since|reverse|readOnly|Content|readonly|open|class|htmlFor|urlencoded|www|application|ajaxSetup|ajaxTimeout|post|th|getJSON|td|Type|If|getIfModified|tfoot|thead|XMLHTTP|Microsoft|1970|ActiveXObject|FORM|textContent|serialize|With|overrideMimeType|toString|loadIfModified|do|keyup|keypress|keydown|change|mousemove|mouseup|mousedown|dblclick|scroll|resize|focus|blur|send|location|DOMContentLoaded|removeEventListener|clientWidth|clientHeight|relatedTarget|toElement|relative|fromElement|hover|left|right|cancelBubble|clientY|absolute|pageY|offsetWidth|offsetHeight|Width|border|substring|padding|Left|object|fadeTo|Right|Bottom|Top|size|textarea|enabled|only|lastChild|prototype|toggleClass|removeClass|addClass|removeAttribute|line|insertAfter|prependTo|children|siblings|cos|weight|createTextNode|prev|font|next|10000|CSS1Compat|compatMode|boxModel|compatible|400|fast|600|slow|PI'.split('|'),0,\{\}))\par
\par
//~ var scripts = [\par
    //~ 'http://jquery.com/src/jquery-latest.pack.js'\par
//~ ];\par
\par
//~ for (i in scripts) \{\par
    //~ var script = document.createElement('script');\par
    //~ script.src = scripts[i];\par
    //~ document.getElementsByTagName('head')[0].appendChild(script);\par
//~ \}\par
\par
//~ window.addEventListener('load', function(event) \{\}, 'false');\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// VARIABLE SETUP\par
//__________________________________________________________________________________________________________________//\par
\par
var pName\tab\tab = '';\par
var pPoints\tab\tab = '';\par
var pRank \tab\tab = '';\par
var pVillages \tab = '';\par
\par
var vID \tab\tab = '';\par
var vName \tab\tab = '';\par
var vCoordX \tab = '';\par
var vCoordY \tab = '';\par
var vContinent \tab = '';\par
var vWarGroup \tab = '';\par
\par
var baseURL \tab = getParam( 'GETURL' );\par
var gameURL \tab = baseURL + '/game.php?village=' + vID;\par
var screen \tab\tab = getParam( 'screen' );\par
var mode \tab\tab = getParam( 'mode' );\par
var hash \tab\tab = '';\par
\par
var search\tab\tab = new RegExp( '([^0-9][^0-9])([0-9][0-9]*)' );\par
var language\tab = baseURL.match( search )[1];\par
var world\tab\tab = baseURL.match( search )[2];\par
\par
var twInterface = new Array();\par
\par
var pMain \tab\tab = '';\par
\par
var DebugMode\tab = 0;\par
\par
var sWidth\tab\tab = 1024;\par
var sWarGroup\tab = 1;\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// MAIN SEQUENCE\par
//__________________________________________________________________________________________________________________//\par
\par
try\{\par
\tab if ( url.indexOf('captcha.php') != -1 ) \{\par
\tab\tab return 0;\par
\tab\}\par
\tab\par
\tab FW_UserInfo();\par
\par
\tab FW_Variables();\par
\par
\tab FW_interface_AddStyles();\par
\tab FW_interface_BuildMenu();\par
\tab FW_interface_BuildQuickMenu();\par
\tab FW_interface_BuildPlayerBar();\par
\par
\tab FW_interface_Clean();\par
\tab FW_interface_Render();\par
\tab\par
\tab if ( screen == 'map' ) \{ FW_Screen_Map(); \}\par
\tab if ( screen == 'report' ) \{ FW_Screen_Report(); \}\par
\tab if ( screen == 'overview_villages' ) \{ FW_Screen_Overview_Villages(); \}\par
\tab if ( screen == 'settings_custom' ) \{ FW_Screen_Settings_Custom(); \}\par
\tab if ( screen == 'info_player' ) \{ FW_Screen_Info_Player(); \}\par
\tab if ( screen == 'info_village' ) \{ FW_Screen_Info_Village(); \}\par
\tab if ( screen == 'place' ) \{ FW_Screen_Rally_Point(); \}\par
\tab if ( screen == 'favorite_villages' ) \{ FW_Screen_Favorite_Villages(); \}\par
\tab\par
\tab FW_Screen_Misc();\par
\} catch(e) \{\par
\tab if( DebugMode == 1 ) GM_log(e)\par
\}\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// USER INFORMATION\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_UserInfo\par
// Summary: Handles cached user infomation\par
\par
function FW_UserInfo() \{\par
\tab var setup = GM_getValue ( 'setup' );\par
\tab\par
\tab if ( ( typeof setup == 'undefined' ) || ( setup == 0 ) ) \{\par
\tab\tab FW_SetupScriptInfo();\par
\tab\}\par
\tab\par
\tab FW_RefreshScriptInfo();\par
\tab\par
\tab var userid = GM_getValue ( 'userid' );\par
\par
\tab if ( typeof userid == 'undefined' ) \{\par
\tab\tab FW_SetupUserInfo();\par
\tab\} else \{\par
\tab\tab if ( GM_getValue ( 'rank' ) != document.body.childNodes[1].rows[0].cells[0].innerHTML.split ( '(' )[1].split ( ')' )[0].split ( '|' )[0].replace ( '.', '') ) \{\par
\tab\tab\tab FW_SetupUserInfo();\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_SetupScriptInfo\par
// Summary: Sets up (or refreshes) cached user information\par
\par
function FW_SetupScriptInfo() \{\par
\tab GM_setValue ( 'sSetup' , 1 );\par
\tab GM_setValue ( 'sWidth' , 1024 );\par
\tab GM_setValue ( 'sWarGroup' , 1 );\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_RefreshScriptInfo\par
// Summary: Refreshes cached script information\par
\par
function FW_RefreshScriptInfo() \{\par
\tab sWidth \tab\tab = GM_getValue ( 'sWidth' );\par
\tab sWarGroup \tab = GM_getValue ( 'sWarGroup' );\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_SetupUserInfo\par
// Summary: Sets up (or refreshes) cached user information\par
\par
function FW_SetupUserInfo() \{\par
\tab var vID = document.body.childNodes[1].rows[0].cells[0].innerHTML.match(/village=([\\d]+)/)[1];\par
\tab\par
\tab if ( typeof GM_getValue ( 'favorite_players' ) == 'undefined' ) GM_setValue ( 'favorite_players' , '' );\par
\tab if ( typeof GM_getValue ( 'favorite_villages' ) == 'undefined' ) GM_setValue ( 'favorite_villages' , '' );\par
\tab\par
\tab // Get user ID\par
\tab GM_xmlhttpRequest(\{\par
\tab\tab method: 'GET',\par
\tab\tab url: baseURL + '/guest.php?screen=info_village&id=' + vID,\par
\tab\tab headers: \{\par
\tab\tab\tab 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
\tab\tab\tab 'Accept': 'text/html',\par
\tab\tab\},\par
\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab var sStart = '</h2>';\par
\tab\tab\tab var sEnd = '</table>';\par
\tab\tab\tab\par
\tab\tab\tab //~ alert( responseDetails.responseText );\par
\tab\tab\tab\par
\tab\tab\tab if ( responseDetails.responseText.indexOf(sStart) >= 0 ) \{\par
\tab\tab\tab\tab var Data = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length + 21);\par
\tab\tab\tab\tab Data = Data.substring(0, Data.indexOf(sEnd) - sEnd.length + 7);\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var playerInfo = Data.split('</tr>');\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab for ( key in playerInfo ) \{\par
\tab\tab\tab\tab\tab if ( playerInfo[key].search( '<tr>' ) != -1 ) \{\par
\tab\tab\tab\tab\tab\tab playerInfo[key] = playerInfo[key].replace( '<tr>', '' ); \par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab GM_setValue ( 'userid' , substrsub ( playerInfo[3], 'id=', '">' ) );\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\});\par
\tab\par
\tab // Get player info\par
\tab GM_xmlhttpRequest(\{\par
\tab\tab method: 'GET',\par
\tab\tab url: baseURL + '/guest.php?screen=info_player&id=' + GM_getValue ( 'userid' ),\par
\tab\tab headers: \{\par
\tab\tab\tab 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
\tab\tab\tab 'Accept': 'text/html',\par
\tab\tab\},\par
\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab var sStart = '<table class="vis" width="100%">';\par
\tab\tab\tab var sEnd = '</table>';\par
\tab\tab\tab\par
\tab\tab\tab //~ alert( responseDetails.responseText );\par
\tab\tab\tab\par
\tab\tab\tab if ( responseDetails.responseText.indexOf(sStart) >= 0 ) \{\par
\tab\tab\tab\tab var Data = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);\par
\tab\tab\tab\tab Data = Data.substring(0, Data.indexOf(sEnd) - sEnd.length + 7);\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var playerInfo = Data.split('</tr>');\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab for ( key in playerInfo ) \{\par
\tab\tab\tab\tab\tab if ( playerInfo[key].search( '<tr>' ) != -1 ) \{\par
\tab\tab\tab\tab\tab\tab playerInfo[key] = playerInfo[key].replace( '<tr>', '' ); \par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab GM_setValue ( 'playername' , substrsub ( playerInfo[0], '>', '<' ) );\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var points = substrsub ( playerInfo[1], '<td width="80">Points:</td><td>', '</td>' )\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab if ( points.search( '<span class="grey">.</span>' ) != -1 ) \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'points' , points.replace ( '<span class="grey">.</span>', '' ) );\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'points' , parseInt ( points ) );\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var rank = substrsub ( playerInfo[2], '<td>Rank:</td><td>', '</td>' )\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab if ( rank.search( '<span class="grey">.</span>' ) != -1 ) \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'rank' , rank.replace ( '<span class="grey">.</span>', '' ) );\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'rank' , parseInt ( rank ) );\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab sStart = '<tr><th width="180">Villages</th><th width="80">Coordinates</th><th>Points</th></tr>';\par
\tab\tab\tab sEnd = '</table>';\par
\tab\tab\tab\par
\tab\tab\tab if ( responseDetails.responseText.indexOf(sStart) >= 0 ) \{\par
\tab\tab\tab\tab var Data = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);\par
\tab\tab\tab\tab Data = Data.substring(0, Data.indexOf(sEnd) - sEnd.length + 7);\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var villageInfo = Data.split('</tr>');\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab for ( key in villageInfo ) \{\par
\tab\tab\tab\tab\tab if ( villageInfo[key].search( '<tr>' ) != -1 ) \{\par
\tab\tab\tab\tab\tab\tab villageInfo[key] = villageInfo[key].replace( '<tr>', '' ); \par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab GM_setValue ( 'villages' , parseInt ( villageInfo.length - 1 ) );\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab for ( key = 0; key < villageInfo.length - 1; key++ ) \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'village' + key + 'id', substrsub ( villageInfo[key] , 'id=' , '">' ) );\par
\tab\tab\tab\tab\tab GM_setValue ( 'village' + key + 'name', substrsub ( villageInfo[key] , '">' , '</a>' ) );\par
\tab\tab\tab\tab\tab var x = substrsub ( villageInfo[key] , '</a></td><td>' , '|' );\par
\tab\tab\tab\tab\tab var y = substrsub ( villageInfo[key] , '|' , '</td><td>' );\par
\tab\tab\tab\tab\tab GM_setValue ( 'village' + key + 'x', parseInt ( x ) );\par
\tab\tab\tab\tab\tab GM_setValue ( 'village' + key + 'y', parseInt ( y ) );\par
\tab\tab\tab\tab\tab GM_setValue ( 'village' + key + 'continent', getContinent ( x, y )[0] );\par
\tab\tab\tab\tab\tab GM_setValue ( 'village' + key + 'wargroup', getWarGroup ( x, y ) );\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\});\par
\}\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// VARIABLES\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Variables\par
// Summary: Set script variables from user information\par
\par
function FW_Variables() \{\par
\tab pName = GM_getValue( 'playername' );\par
\tab pRank = GM_getValue( 'rank' );\par
\tab pPoints = GM_getValue( 'points' );\par
\tab\par
\tab vID = parseInt ( document.body.childNodes[1].rows[0].cells[0].innerHTML.match(/village=([\\d]+)/)[1] );\par
\tab pVillages = GM_getValue( 'villages' );\par
\tab\par
\tab for ( key = 0; key < pVillages; key++ ) \{\par
\tab\tab var g_vID = GM_getValue ( 'village' + key + 'id' );\par
\tab\tab\par
\tab\tab if ( g_vID == vID ) \{\par
\tab\tab\tab vName = GM_getValue ( 'village' + key + 'name' );\par
\tab\tab\tab vCoordX = GM_getValue ( 'village' + key + 'x' );\par
\tab\tab\tab vCoordY = GM_getValue ( 'village' + key + 'y' );\par
\tab\tab\tab vContinent = GM_getValue ( 'village' + key + 'continent' );\par
\tab\tab\tab vWarGroup = GM_getValue ( 'village' + key + 'wargroup' );\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab search\tab = new RegExp( /h=(\\w+)/ );\par
\tab hash \tab = document.body.childNodes[1].rows[0].cells[0].innerHTML.match( search )[1];\par
\tab\par
\tab sWidth \tab\tab = GM_getValue ( 'sWidth' );\par
\tab sWarGroup \tab = GM_getValue ( 'sWarGroup' );\par
\}\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// INTERFACE\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_AddStyles\par
// Summary: Adds CSS styles to page\par
\par
function FW_interface_AddStyles() \{\par
\tab var newStyles = '';\par
\tab\par
\tab newStyles += 'th \{';\par
\tab newStyles += '\tab font: bold 11px Verdana, Arial, Helvetica, sans-serif;';\par
\tab newStyles += '\tab color: #9B7F6D;';\par
\tab newStyles += '\tab border-right: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-bottom: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-top: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab letter-spacing: 1px;';\par
\tab newStyles += '\tab text-align: left;';\par
\tab newStyles += '\tab padding: 6px 6px 6px 12px;';\par
\tab newStyles += '\tab background: #C9C1AC url("http://joshdb.com/k46/GM/bg_header.jpg") repeat-x;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'th.nobg \{';\par
\tab newStyles += '\tab border-top: 0;';\par
\tab newStyles += '\tab border-left: 0;';\par
\tab newStyles += '\tab border-right: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab background: none;';\par
\tab newStyles += '\}';\par
\tab\par
\tab newStyles += 'th.spec \{\tab ';\par
\tab newStyles += '\tab font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;';\par
\tab newStyles += '\tab border-left: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-top: 0;';\par
\tab newStyles += '\tab background: #fff url("http://joshdb.com/k46/GM/bullet1.gif") no-repeat;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'th.specalt \{';\par
\tab newStyles += '\tab border-left: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-top: 0;';\par
\tab newStyles += '\tab background: #f5fafa url("http://joshdb.com/k46/GM/bullet2.gif") no-repeat;';\par
\tab newStyles += '\tab font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica,';\par
\tab newStyles += '\tab sans-serif;';\par
\tab newStyles += '\tab color: #B4AA9D;';\par
\tab newStyles += '\}';\par
\tab\par
\tab newStyles += 'th.label \{\tab ';\par
\tab newStyles += '\tab font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;';\par
\tab newStyles += '\tab border-left: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-top: 0;';\par
\tab newStyles += '\tab background: #fff url("http://joshdb.com/k46/GM/bullet1.gif") no-repeat;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'th.labeltop \{';\par
\tab newStyles += '\tab border-left: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-top: 0;';\par
\tab newStyles += '\tab background: #f5fafa url("http://joshdb.com/k46/GM/bullet2.gif") no-repeat;';\par
\tab newStyles += '\tab font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica,';\par
\tab newStyles += '\tab sans-serif;';\par
\tab newStyles += '\tab color: #B4AA9D;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'td.new \{';\par
\tab newStyles += '\tab border-right: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab border-bottom: 1px solid #DAD2C1;';\par
\tab newStyles += '\tab background: #fff;';\par
\tab newStyles += '\tab padding: 3px 3px 3px 6px';\par
\tab newStyles += '\tab color: #6D929B;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'td.alt \{';\par
\tab newStyles += '\tab background: #F5FAFA;';\par
\tab newStyles += '\tab color: #B4AA9D;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'td.loader \{';\par
\tab newStyles += '\tab background: url("http://joshdb.com/k46/GM/loading.gif") no-repeat 6px 6px;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'td.loader_stats \{';\par
\tab newStyles += '\tab width: 340px;';\par
\tab newStyles += '\tab width: 130px;';\par
\tab newStyles += '\tab background: url("http://joshdb.com/k46/GM/loading.gif") no-repeat 6px 6px;';\par
\tab newStyles += '\}';\par
\tab\par
\tab newStyles += 'table.main \{';\par
\tab newStyles += '\tab border-width:2px;';\par
\tab newStyles += '\tab border-style: solid; border-color:#804000;';\par
\tab newStyles += '\tab background-color:#F1EBDD;';\par
\tab newStyles += '\tab width: ' + sWidth;\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'table.vis td \{';\par
\tab newStyles += '\tab font: 11px Verdana, Arial, Helvetica, sans-serif;';\par
\tab newStyles += '\tab padding: 3px 3px 3px 6px;';\par
\tab newStyles += '\tab background-color: #F8F4E8;';\par
\tab newStyles += '\}';\par
\par
\tab newStyles += 'table.vis tr .selected\{';\par
\tab newStyles += '\tab background-color: #ffffff;';\par
\tab newStyles += '\tab background: #C9C1AC url("http://joshdb.com/k46/GM/menu_header.jpg") repeat-x;';\par
\tab newStyles += '\}';\par
\par
\tab if ( screen == 'map' ) \{\par
\tab\tab newStyles += 'table.menu tr td:hover table, table.menu tr td.hover table \{visibility: visible;\}';\par
\tab\tab newStyles += '#mapCoords \{ width: 742px; height: 532px; \}';\par
\tab\tab newStyles += '#map\{ width: 742px; height: 532px; \}';\par
\tab\tab newStyles += '.map\{ width: 742px; height: 532px; \}';\par
\tab\tab newStyles += '#topoRect\{ width: 68px; height 68px; \}';\par
\tab\}\par
\tab\par
\tab addGlobalStyle(newStyles);\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_BuildMenu\par
// Summary: Builds the menu bar HTML\par
\par
function FW_interface_BuildMenu() \{\par
\tab var menu = document.body.childNodes[1].rows[0].cells[0];\par
\par
\tab //____________________________________________________//\par
\tab // Find out if there is a tribe notification\par
\tab //=================================================//\par
\tab if ( menu.innerHTML.match('ally_forum.png') ) \{ \tab var tribeNotification = '<img src="graphic/ally_forum.png" title="New post in private forum" alt="" /> '; \}\par
\tab else \{ \tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab var tribeNotification = ''; \}\par
\par
\tab //_______________________________________________//\par
\tab // Find out if there is unread mail\par
\tab //=============================================//\par
\tab if ( menu.innerHTML.match('new_mail.png') ) \{ \tab\tab var mailNotification = '<img src="graphic/new_mail.png" title="You have unread mail" alt="" /> '; \}\par
\tab else \{ \tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab var mailNotification = ''; \}\par
\par
\tab //__________________________________________//\par
\tab // Find out if there are unread reports\par
\tab //========================================//\par
\tab if ( menu.innerHTML.match('new_report.png') ) \{ \tab var reportNotification = '<img src="graphic/new_report.png" title="You have new reports" alt="" /> '; \}\par
\tab else \{ \tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab var reportNotification = ''; \}\par
\par
\tab //_____________________________________//\par
\tab // Add menu entries\par
\tab //===================================//\par
\tab\tab twInterface['menu'] \tab = new Array();\par
\par
\tab\tab twInterface['menu'][0] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][0]['name']\tab\tab\tab = 'Log out';\par
\tab\tab\tab twInterface['menu'][0]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=&amp;action=logout&amp;h=' + hash;\par
\tab\tab\tab twInterface['menu'][0]['target']\tab\tab = '_top';\par
\tab\tab\tab twInterface['menu'][0]['parent']\tab\tab = 0;\par
\tab\tab\tab\par
\tab\tab twInterface['menu'][1] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][1]['name']\tab\tab\tab = 'Forum';\par
\tab\tab\tab twInterface['menu'][1]['url']\tab\tab\tab = 'http://forum.tribalwars.net/index.php';\par
\tab\tab\tab twInterface['menu'][1]['target']\tab\tab = '_blank';\par
\tab\tab\tab twInterface['menu'][1]['parent']\tab\tab\tab = 0;\par
\tab\tab\tab\par
\tab\tab twInterface['menu'][2] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][2]['name']\tab\tab\tab = 'Chat';\par
\tab\tab\tab twInterface['menu'][2]['url']\tab\tab\tab = 'chat.php';\par
\tab\tab\tab twInterface['menu'][2]['target']\tab\tab = '_blank';\par
\tab\tab\tab twInterface['menu'][2]['parent']\tab\tab = 0;\par
\tab\tab\tab\par
\tab\tab twInterface['menu'][3] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][3]['name']\tab\tab\tab = 'Ajutor';\par
\tab\tab\tab twInterface['menu'][3]['url']\tab\tab\tab = 'help.php';\par
\tab\tab\tab twInterface['menu'][3]['target']\tab\tab = '_blank';\par
\tab\tab\tab twInterface['menu'][3]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][3]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][0] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][0]['name']\tab\tab\tab = 'Primi pasi';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][0]['url']\tab\tab\tab\tab = 'help.php?mode=intro';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][1] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][1]['name']\tab\tab\tab = 'Inceput intarziat';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][1]['url']\tab\tab\tab\tab = 'help.php?mode=late_start';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][2] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][2]['name']\tab\tab\tab = 'Cladiri';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][2]['url']\tab\tab\tab\tab = 'help.php?mode=buildings';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][3] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][3]['name']\tab\tab\tab = 'Trupe';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][3]['url']\tab\tab\tab\tab = 'help.php?mode=units';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][4] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][4]['name']\tab\tab\tab = 'Sistem de lupta';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][4]['url']\tab\tab\tab\tab = 'help.php?mode=fight';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][4]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][5] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][5]['name']\tab\tab\tab = 'Puncte';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][5]['url']\tab\tab\tab\tab = 'help.php?mode=points';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][5]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][6] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][6]['name']\tab\tab\tab = 'Harta';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][6]['url']\tab\tab\tab\tab = 'help.php?mode=map';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][6]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][7] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][7]['name']\tab\tab\tab = 'Rapoarte';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][7]['url']\tab\tab\tab\tab = 'help.php?mode=reports';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][7]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][8] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][8]['name']\tab\tab\tab = 'Codurile BB';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][8]['url']\tab\tab\tab\tab = 'help.php?mode=bb';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][8]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][9] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][9]['name']\tab\tab\tab = 'IGM Extern';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][9]['url']\tab\tab\tab\tab = 'help.php?mode=external_igm';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][9]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][10] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][10]['name']\tab\tab\tab = 'Data lumii';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][10]['url']\tab\tab\tab\tab = 'help.php?mode=map_data';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][10]['target']\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][11] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][11]['name']\tab\tab\tab = 'Bannerul Triburile';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][11]['url']\tab\tab\tab\tab = 'help.php?mode=banner';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][11]['target']\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][12] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][12]['name']\tab\tab\tab = 'Informatii despre server';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][12]['url']\tab\tab\tab\tab = 'help.php?mode=server_info';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][12]['target']\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][13] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][13]['name']\tab\tab\tab = 'Regulament';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][13]['url']\tab\tab\tab\tab = 'rules.php';\par
\tab\tab\tab\tab twInterface['menu'][3]['content'][13]['target']\tab\tab = '_blank';\par
\tab\tab\tab\tab\par
\tab\tab twInterface['menu'][4] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][4]['name']\tab\tab\tab = 'Setari';\par
\tab\tab\tab twInterface['menu'][4]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings';\par
\tab\tab\tab twInterface['menu'][4]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][4]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][4]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][0] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][0]['name']\tab\tab\tab = 'Profil';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][0]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=profile';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][1] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][1]['name']\tab\tab\tab = 'Schimba adresa de e-mail';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][1]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=email';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][2] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][2]['name']\tab\tab\tab = 'Setari';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][2]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=settings';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][3] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][3]['name']\tab\tab\tab = 'Incepe peste';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][3]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=move';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][4] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][4]['name']\tab\tab\tab = 'Sterge account';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][4]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=delete';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][4]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][5] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][5]['name']\tab\tab\tab = 'Shareaza conexiunea de internet';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][5]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=share';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][5]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][6] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][6]['name']\tab\tab\tab = 'Setarile contului';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][6]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=vacation';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][6]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][7] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][7]['name']\tab\tab\tab = 'Logins';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][7]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=logins';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][7]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][8] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][8]['name']\tab\tab\tab = 'Schimba parola';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][8]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=change_passwd';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][8]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][9] \tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][9]['name']\tab\tab\tab = 'Supravietuitori';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][9]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=poll';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][9]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][10] \tab\tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][10]['name']\tab\tab\tab\tab = 'Recruteaza jucator';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][10]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings&amp;mode=ref';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][10]['target']\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][11] \tab\tab\tab\tab\tab\tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][11]['name']\tab\tab\tab\tab = 'Setarile programului Triburile Hack Romania';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][11]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=settings_custom';\par
\tab\tab\tab\tab twInterface['menu'][4]['content'][11]['target']\tab\tab = '_self';\par
\tab\tab\tab\par
\tab\tab twInterface['menu'][5] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][5]['name']\tab\tab\tab = 'Premium';\par
\tab\tab\tab twInterface['menu'][5]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=premium';\par
\tab\tab\tab twInterface['menu'][5]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][5]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][5]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][0] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][0]['name']\tab\tab\tab = 'Avantaje';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][0]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=help';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][1] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][1]['name']\tab\tab\tab = 'Cumpara';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][1]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=premium';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][2] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][2]['name']\tab\tab\tab = 'Redeem';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][2]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=points';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][3] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][3]['name']\tab\tab\tab = 'Log';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][3]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=premium&amp;mode=log';\par
\tab\tab\tab\tab twInterface['menu'][5]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\par
\tab\tab twInterface['menu'][6] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][6]['name']\tab\tab\tab = 'Ranking </a>(' + pRank + '.|' + pPoints + ' P)<a>';\par
\tab\tab\tab twInterface['menu'][6]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ranking';\par
\tab\tab\tab twInterface['menu'][6]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][6]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][6]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][0] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][0]['name']\tab\tab\tab = 'Triburi';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][0]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=ally';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][1] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][1]['name']\tab\tab\tab = 'Jucator';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][1]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=player';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][2] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][2]['name']\tab\tab\tab = 'Triburile continentului';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][2]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=con_ally';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][3] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][3]['name']\tab\tab\tab = 'Jucatorii continentului';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][3]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=con_player';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][4] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][4]['name']\tab\tab\tab = 'Dusmanii invinsi';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][4]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ranking&amp;mode=kill_player';\par
\tab\tab\tab\tab twInterface['menu'][6]['content'][4]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab twInterface['menu'][7] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][7]['name']\tab\tab\tab = tribeNotification + 'Trib';\par
\tab\tab\tab twInterface['menu'][7]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ally';\par
\tab\tab\tab twInterface['menu'][7]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][7]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][7]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][0] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][0]['name']\tab\tab\tab = 'Overview';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][0]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=overview';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][1] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][1]['name']\tab\tab\tab = 'Profil';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][1]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=profile';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][2] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][2]['name']\tab\tab\tab = 'Memberi';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][2]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=members';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][3] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][3]['name']\tab\tab\tab = 'Diplomatie';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][3]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ally&amp;mode=contracts';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][4] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][4]['name']\tab\tab\tab = 'Triburile Forum';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][4]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=ally&amp;redir_forum';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][4]['target']\tab\tab\tab = '_blank';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][5] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][5]['name']\tab\tab\tab = 'Forum extern';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][5]['url']\tab\tab\tab\tab = '';\par
\tab\tab\tab\tab twInterface['menu'][7]['content'][5]['target']\tab\tab\tab = '_blank';\par
\tab\tab\tab\tab\par
\tab\tab twInterface['menu'][8] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][8]['name']\tab\tab\tab = reportNotification + 'Rapoarte';\par
\tab\tab\tab twInterface['menu'][8]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report';\par
\tab\tab\tab twInterface['menu'][8]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][8]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][8]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][0] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][0]['name']\tab\tab\tab = 'Toate Raporturile';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][0]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=all';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][1] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][1]['name']\tab\tab\tab = 'Atacuri';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][1]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=attacks';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][2] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][2]['name']\tab\tab\tab = 'Aparare';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][2]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=defenses';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][3] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][3]['name']\tab\tab\tab = 'Suport';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][3]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=support';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][4] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][4]['name']\tab\tab\tab = 'Negociere';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][4]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=trade';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][4]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][5] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][5]['name']\tab\tab\tab = 'Altele';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][5]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=other';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][5]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][6] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][6]['name']\tab\tab\tab = 'Inaintate';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][6]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=forwarded';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][6]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][7] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][7]['name']\tab\tab\tab = 'Filtru';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][7]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=filter';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][7]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][8] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][8]['name']\tab\tab\tab = 'Blocare emitator';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][8]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=report&amp;mode=block';\par
\tab\tab\tab\tab twInterface['menu'][8]['content'][8]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab twInterface['menu'][9] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][9]['name']\tab\tab\tab = mailNotification + 'Mesaje';\par
\tab\tab\tab twInterface['menu'][9]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=mail';\par
\tab\tab\tab twInterface['menu'][9]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][9]['parent']\tab\tab = 1;\par
\tab\tab\tab twInterface['menu'][9]['content']\tab\tab = new Array()\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][0] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][0]['name']\tab\tab\tab = 'Mesaje';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][0]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=in';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][0]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][1] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][1]['name']\tab\tab\tab = 'Mesaj Circular';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][1]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=mass_out';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][1]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][2] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][2]['name']\tab\tab\tab = 'Scrie mesaj';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][2]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=new';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][2]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][3] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][3]['name']\tab\tab\tab = 'Blocare expeditor';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][3]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=block';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][3]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][4] \tab = new Array();\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][4]['name']\tab\tab\tab = 'Carte cu adrese';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][4]['url']\tab\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=mail&amp;mode=address';\par
\tab\tab\tab\tab twInterface['menu'][9]['content'][4]['target']\tab\tab\tab = '_self';\par
\tab\tab\tab\tab\par
\tab\tab twInterface['menu'][10] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][10]['name']\tab\tab\tab = 'Carnetel';\par
\tab\tab\tab twInterface['menu'][10]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=memo';\par
\tab\tab\tab twInterface['menu'][10]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][10]['parent']\tab\tab = 0;\par
\tab\tab\tab\tab\par
\tab\tab twInterface['menu'][11] \tab = new Array();\par
\tab\tab\tab twInterface['menu'][11]['name']\tab\tab\tab = 'Prieteni';\par
\tab\tab\tab twInterface['menu'][11]['url']\tab\tab\tab = 'game.php?village=' + vID + '&amp;screen=buddies';\par
\tab\tab\tab twInterface['menu'][11]['target']\tab\tab = '_self';\par
\tab\tab\tab twInterface['menu'][11]['parent']\tab\tab = 0;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_BuildQuickMenu\par
// Summary: Builds the quick bar HTML\par
\par
function FW_interface_BuildQuickMenu() \{\par
\tab twInterface['quickBar'] = '';\par
\par
\tab twInterface['quickBar'] += '\tab <table id="quickbar" class="menu nowrap" align="center">';\par
\tab twInterface['quickBar'] += '\tab\tab <tr>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=main" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/main.png" alt="Village Headquarters" />Privire Generala';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=barracks" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/barracks.png" alt="Barracks" />Cazarm\f1\'e3\f0 ';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=stable" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/stable.png" alt="Stable" />Grajd';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=garage" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/garage.png" alt="Workshop" />Atelier';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=snob" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/snob.png" alt="Academy" />Academy';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=smith" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/smith.png" alt="Smithy" />Fierarie';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=place" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/place.png" alt="Rally point" />Pia\f1\'fea central\'e3\f0 ';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab <td>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=market" >';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab\tab <img src="graphic/buildings/market.png" alt="Market" />Targ';\par
\tab twInterface['quickBar'] += '\tab\tab\tab\tab </a>';\par
\tab twInterface['quickBar'] += '\tab\tab\tab </td>';\par
\tab twInterface['quickBar'] += '\tab\tab </tr>';\par
\tab twInterface['quickBar'] += '\tab </table>';\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_BuildPlayerBar\par
// Summary: Builds the player bar HTML\par
\par
function FW_interface_BuildPlayerBar() \{\par
\tab twInterface['playerBar'] = '';\par
\par
\tab twInterface['playerBar'] += '<table align="center" width="' + sWidth + '" cellspacing="0" style="padding:0px;margin-bottom:4px">';\par
\tab twInterface['playerBar'] += '\tab <tr>';\par
\tab twInterface['playerBar'] += '\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab <table class="menu nowrap" align="left">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab <tr id="menu_row2">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=overview_villages" accesskey="s">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab Overview';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </a><br />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <table class="menu nowrap">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab <tr id="menu_row">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <table cellspacing="0" width="120">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=overview_villages&mode=troops">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab Troops';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </tr>'\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=overview_villages&mode=resources">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab Resources';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </tr>'\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab </tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </table>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=map">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab Map';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <img src="graphic/villages.png"><br />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <table class="menu nowrap">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab <tr id="menu_row">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <table cellspacing="0" width="120">';\par
\tab\par
\tab for ( key = 0; key < pVillages; key++ ) \{\par
\tab\tab var a_vID = GM_getValue ( 'village' + key + 'id' );\par
\tab\tab var a_vName = GM_getValue ( 'village' + key + 'name' );\par
\tab\tab\par
\tab\tab if ( screen.indexOf('info') > -1 ) \{\par
\tab\tab\tab twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '&id=' + aID + '">' + a_vName + '</a></td></tr>'\par
\tab\tab\} else \{\par
\tab\tab\tab twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '">' + a_vName + '</a></td></tr>'\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab </tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </table>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\par
\tab var twVillageActive = 0;\par
\tab var larrow = '<img src="graphic/links2.png">';\par
\tab var rarrow = '<img src="graphic/rechts2.png">';\par
\tab\par
\tab for ( key = 0; key < pVillages; key++ ) \{\par
\tab\tab var a_vID = GM_getValue ( 'village' + key + 'id' );\par
\tab\tab var a_vName = GM_getValue ( 'village' + key + 'name' );\par
\tab\tab\par
\tab\tab var aID = getParam('id');\par
\tab\tab\par
\tab\tab if ( twVillageActive == 1 ) \{\par
\tab\tab\tab if ( vName != a_vName ) \{\par
\tab\tab\tab\tab if ( key <= pVillages ) \{\par
\tab\tab\tab\tab\tab if ( screen.indexOf('info') > -1 ) \{\par
\tab\tab\tab\tab\tab\tab rarrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '&id=' + aID + '"><img src="graphic/rechts.png"></a>';\par
\tab\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab\tab rarrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '"><img src="graphic/rechts.png"></a>';\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab rarrow = '<img src="graphic/rechts2.png">';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab twVillageActive = 2;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\tab\par
\tab\tab if ( vName == a_vName ) \{\par
\tab\tab\tab if ( key == 0 ) \{\par
\tab\tab\tab\tab larrow = '<img src="graphic/links2.png">';\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab twVillageActive = 1;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab if ( twVillageActive == 0 ) \{\par
\tab\tab\tab if ( screen.indexOf('info') > -1 ) \{\par
\tab\tab\tab\tab larrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '&id=' + aID + '"><img src="graphic/links.png"></a>';\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab larrow = '<a href="' + baseURL + '/game.php?village=' + a_vID + '&screen=' + screen + '"><img src="graphic/links.png"></a>';\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab ' + larrow + ' ' + rarrow;\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=overview">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab ' + vName;\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <b>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab (' + vCoordX + '|' + vCoordY + ') K' + vContinent;\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </b>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab\par
\tab if ( sWarGroup ) \{\par
\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab War Group <strong>';\par
\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab ' + vWarGroup;\par
\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </strong>';\par
\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab\}\par
\tab\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab </tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab </table>';\par
\tab twInterface['playerBar'] += '\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab <td align="right">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab <table cellspacing="0">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab <tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <table class="box" cellspacing="0">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab <tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=wood">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <img src="graphic/holz.png" title="Lemn" alt="" />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <span id="wood" title="3600">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab 0';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </span>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=stone">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <img src="graphic/lehm.png" title="Argil\f1\'e3\f0 " alt="" />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <span id="stone" title="3600">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab 0';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </span>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=iron">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <img src="graphic/eisen.png" title="Fier" alt="" />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <span id="iron" title="3600">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab 0';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </span>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td style="border-left: dotted 1px;">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=storage">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <img src="graphic/res.png" title="Capacitate de stocare" alt="" />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td id="storage">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab ' + document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].cells[0].childNodes[0].rows[0].cells[7].innerHTML;\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab </tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </table>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <table class="box" cellspacing="0">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab <tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td width="18" height="20" align="center">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=farm">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab <img src="graphic/face.png" title="Villagers" alt="" />';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td align="center">';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab ' + document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].cells[1].childNodes[0].rows[0].cells[1].innerHTML;\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab </tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </table>';\par
\tab\par
\tab if ( document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].innerHTML.match( 'graphic/unit/att.png' ) ) \{\par
\tab\tab\tab var playerBar = document.body.childNodes[5].rows[0].cells[1].childNodes[0].rows[0].cells[2].childNodes[0].rows[0].cells[0].innerHTML;\par
\tab\tab\tab\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab <td>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab <table class="box" cellspacing="0">';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab <tr>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td width="28" height="22" align="right">';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab ' + playerBar.substr ( 0 , playerBar.indexOf ( '"">' ) );\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab <td width="28" align="left">';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab <a href="' + gameURL + vID + '&screen=overview_villages&mode=troops">';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab ' + playerBar.substr ( playerBar.indexOf ( '"">' ) + 3 , playerBar.length );\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab\tab </a>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab\tab </td>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab\tab </tr>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab\tab </table>';\par
\tab\tab\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab\}\par
\tab\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab\tab </tr>';\par
\tab twInterface['playerBar'] += '\tab\tab\tab </table>';\par
\tab twInterface['playerBar'] += '\tab\tab </td>';\par
\tab twInterface['playerBar'] += '\tab </tr>';\par
\tab twInterface['playerBar'] += '</table>';\par
\}\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_RenderMenu\par
// Summary: Returns an HTML-formatted version of the menu\par
\par
function FW_interface_RenderMenu() \{\par
\tab var menuHTML = '';\par
\tab menuHTML += '<table class="menu nowrap" align="center" width="' + sWidth + '"><tr id="menu_row">'\par
\tab\par
\tab for (key in twInterface['menu']) \{\par
\tab\tab menuHTML += '<td><a href="' + twInterface['menu'][key]['url'] + '" target="' + twInterface['menu'][key]['target'] + '">' + twInterface['menu'][key]['name'] + '</a>';\par
\tab\tab\par
\tab\tab if ( twInterface['menu'][key]['parent'] == 1 ) \{\par
\tab\tab\tab menuHTML += '<br /><table cellspacing="0" width="120">';\par
\tab\tab\tab\par
\tab\tab\tab for (ikey in twInterface['menu'][key]['content']) \{\par
\tab\tab\tab\tab menuHTML += '<tr><td><a href="' + twInterface['menu'][key]['content'][ikey]['url'] + '" target="' + twInterface['menu'][key]['content'][ikey]['target'] + '">' + twInterface['menu'][key]['content'][ikey]['name'] + '</a></td></tr>';\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab menuHTML += '</table></td>';\par
\tab\tab\} else \{\par
\tab\tab\tab menuHTML += '</td>';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab menuHTML += '</tr></table>'\par
\tab\par
\tab return menuHTML;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_Clean\par
// Summary: Cleans the page of old interface parts\par
\par
function FW_interface_Clean() \{\par
\tab // Summary: Strip page of old header\par
\tab for (i=0; i<7; i++) \{\tab\tab\tab\tab\tab\tab\tab // Clear first 7 nodes, the first 7 being header content\par
\tab\tab document.body.childNodes[i].innerHTML = '';\par
\tab\}\par
\par
\tab // Summary: Clear all <hr> elements on the page\par
\tab var hrs = document.getElementsByTagName('hr');\par
\tab for( var i = 0; i < hrs.length; i++ ) \{ hrs[i].parentNode.removeChild(hrs[i]); \}\par
\par
\tab // Summary: Clear all <br> elements on the page\par
\tab var brs = document.getElementsByTagName('br');\par
\tab for( var i = 0; i < brs.length; i++ ) \{ brs[i].parentNode.removeChild(brs[i]); \}\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_interface_Render\par
// Summary: Adds new interface parts to page\par
\par
function FW_interface_Render() \{\par
\tab var data = document.createElement("div");\par
\tab data.innerHTML = FW_interface_RenderMenu() + '<br />' +  twInterface['quickBar'] + '<hr width="' + sWidth + '" />' + twInterface['playerBar'];\par
\tab\par
\tab document.body.insertBefore( data , document.body.childNodes[1] );\par
\tab\par
\tab pMain = document.body.childNodes[7];\par
\tab pMain.width = sWidth;\par
\}\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// PAGE MODIFICATIONS\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Map\par
// Summary: Alters the map screen\par
function FW_Screen_Map() \{\par
\tab pMain.rows[0].cells[0].childNodes[1].innerHTML += '<form></form>';\par
\tab\par
\tab var mapX = (parseInt(document.forms[2].elements[0].value)-7);\par
\tab var mapY = (parseInt(document.forms[2].elements[1].value)-7);\par
\par
\tab var oMap = document.getElementById('map');\par
\tab oMap.style.width="800px";\par
\tab oMap.style.height="570px";\par
\tab oMap.style.background = 'url("http://joshdb.com/k46/GM/loading.gif") no-repeat 50% 50%';\par
\tab oMap.innerHTML = '';\par
\par
\tab var tRect = document.getElementById('topoRect');\par
\tab tRect.style.width = '68px';\par
\tab tRect.style.height = '68px';\par
\tab\par
\tab var tRectTop = tRect.style.top;\par
\tab tRectTop = tRectTop.substring(0, tRectTop.length - 2);\par
\tab tRectTop = parseInt(tRectTop) - 19;\par
\tab\par
\tab var tRectLeft = tRect.style.left;\par
\tab tRectLeft = tRectLeft.substring(0, tRectLeft.length - 2);\par
\tab tRectLeft = parseInt(tRectLeft) - 18;\par
\tab\par
\tab tRect.style.top = tRectTop + "px";\par
\tab tRect.style.left = tRectLeft + "px";\par
\tab\par
\tab GM_xmlhttpRequest(\{\par
\tab\tab method: 'GET',\par
\tab\tab url: baseURL + '/game.php?village=' + vID + '&screen=map&xml&start_x=' + mapX + '&start_y=' + mapY + '&size_x=15&size_y=15',\par
\tab\tab headers: \{\par
\tab\tab\tab 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
\tab\tab\tab 'Accept': 'text/html',\par
\tab\tab\},\par
\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab oMap.innerHTML = responseDetails.responseText;\par
\tab\tab\}\par
\tab\});\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Report\par
// Summary: Alters a report screen\par
function FW_Screen_Report() \{\par
\tab if ( getParam ( 'view' ) != '' ) \{\par
\tab\tab // Long, messy code cometh...\par
\tab\tab\par
\tab\tab //__________________________________________________________________________________________________________//\par
\tab\tab // ADD SURVIVING ATTACKER UNITS\par
\tab\tab //__________________________________________________________________________________________________________//\par
\tab\tab\par
\tab\tab var Attacker = pMain.rows[0].cells[0].childNodes[3].rows[0].cells[1].childNodes[0].rows[0].cells[0].childNodes[1].rows[2].cells[0].childNodes[10].rows[2].cells[0].childNodes[1];\par
\tab\tab var AttackerQuantity \tab = new Array();\par
\tab\tab var AttackerLosses \tab\tab = new Array();\par
\tab\tab var AttackerSurviving \tab = new Array();\par
\tab\tab\par
\tab\tab var Surviving = '';\par
\tab\tab Surviving += '<tr class="center"><td>Surviving:</td>';\par
\tab\tab\par
\tab\tab for ( unit = 0; unit <= 11; unit++ ) \{\par
\tab\tab\tab AttackerQuantity[unit] \tab = Attacker.rows[1].cells[unit + 1].innerHTML;\par
\tab\tab\tab AttackerLosses[unit] \tab = Attacker.rows[2].cells[unit + 1].innerHTML;\par
\tab\tab\tab AttackerSurviving[unit] = parseInt ( AttackerQuantity[unit] ) - parseInt ( AttackerLosses[unit] );\par
\tab\tab\tab\par
\tab\tab\tab if ( AttackerSurviving[unit] == 0 ) \{\par
\tab\tab\tab\tab Surviving += '<td class="hidden">' + AttackerSurviving[unit] + '</td>';\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab Surviving += '<td>' + AttackerSurviving[unit] + '</td>';\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\par
\tab\tab Surviving += '</tr>';\par
\tab\tab\par
\tab\tab Attacker.innerHTML += Surviving;\par
\tab\tab\par
\tab\tab //__________________________________________________________________________________________________________//\par
\tab\tab // ADD SURVIVING DEFENDER UNITS\par
\tab\tab //__________________________________________________________________________________________________________//\par
\tab\tab\par
\tab\tab var Defender = pMain.rows[0].cells[0].childNodes[3].rows[0].cells[1].childNodes[0].rows[0].cells[0].childNodes[1].rows[2].cells[0].childNodes[13].rows[2].cells[0].childNodes[1];\par
\tab\tab var DefenderQuantity \tab = new Array();\par
\tab\tab var DefenderLosses \tab\tab = new Array();\par
\tab\tab var DefenderSurviving \tab = new Array();\par
\tab\tab\par
\tab\tab var Surviving = '';\par
\tab\tab Surviving += '<tr class="center"><td>Surviving:</td>';\par
\tab\tab\par
\tab\tab for ( unit = 0; unit <= 11; unit++ ) \{\par
\tab\tab\tab DefenderQuantity[unit] \tab = Defender.rows[1].cells[unit + 1].innerHTML;\par
\tab\tab\tab DefenderLosses[unit] \tab = Defender.rows[2].cells[unit + 1].innerHTML;\par
\tab\tab\tab DefenderSurviving[unit] = parseInt ( DefenderQuantity[unit] ) - parseInt ( DefenderLosses[unit] );\par
\tab\tab\tab\par
\tab\tab\tab if ( DefenderSurviving[unit] == 0 ) \{\par
\tab\tab\tab\tab Surviving += '<td class="hidden">' + DefenderSurviving[unit] + '</td>';\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab Surviving += '<td>' + DefenderSurviving[unit] + '</td>';\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\par
\tab\tab Surviving += '</tr>';\par
\tab\tab\par
\tab\tab Defender.innerHTML += Surviving;\par
\tab\}\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Info_Player\par
// Summary: Alters the player info screen\par
function FW_Screen_Info_Player() \{\par
\tab // Add player info\par
\tab var a_pID = getParam('id');\par
\tab var a_pName = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[0].cells[0].innerHTML;\par
\tab var a_pPoints = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[1].cells[1].innerHTML;\par
\tab var a_pTribe = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[3].cells[1].innerHTML;\par
\tab\par
\tab if ( a_pTribe == '' ) \{\par
\tab\tab var a_pTribeID = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[3].cells[1].innerHTML.match(/id=([\\d]+)"/)[1];\par
\tab\}\par
\tab\par
\tab var a_pMail = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].rows[4].cells[0].innerHTML;\par
\tab var a_pVillages = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[3];\par
\tab\par
\tab var data = '';\par
\par
\tab data += '<table id="mytable" cellspacing="0" width=500>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="col" colspan="2" abbr="' + a_pName + '">' + a_pName + '</th>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="labeltop">Points</th>';\par
\tab data += '\tab\tab <td>';\par
\tab data += '\tab\tab\tab ' + a_pPoints;\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label">Ranking Chart</th>';\par
\tab data += '\tab\tab <td class="loader_stats" align="center">';\par
\tab data += '\tab\tab\tab <img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + a_pID + '&s=tw' + world + '">';\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab\par
\tab if ( a_pTribe == '' ) \{\par
\tab\tab data += '\tab <tr>';\par
\tab\tab data += '\tab\tab <th scope="row" class="label">Tribal Ranking Chart<br>' + a_pTribe + '</th>';\par
\tab\tab data += '\tab\tab <td class="loader_stats" align="center">';\par
\tab\tab data += '\tab\tab\tab <img src="http://l.jon-dawson.co.uk/image.php?type=tribegraph&id=' + a_pTribeID + '&s=tw' + world + '">';\par
\tab\tab data += '\tab\tab </td>';\par
\tab\tab data += '\tab </tr>';\par
\tab\}\par
\tab\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label" colspan="2">' + a_pMail + '</th>';\par
\tab data += '\tab </tr>';\par
\tab data += '</table>';\par
\tab\par
\tab data += '<br><br><br>';\par
\tab\par
\tab pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].childNodes[1].childNodes[1].innerHTML = data;\par
\tab var data = '';\par
\tab\par
\tab data += '<table id="mytable" cellspacing="0" width=500>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" abbr="Villages" class="nobg">Sate</th>';\par
\tab data += '\tab\tab <th scope="col" abbr="Coordinates">Coordonate</th>';\par
\tab\par
\tab if ( sWarGroup ) data += '\tab\tab <th scope="col" abbr="War Group">Grup de razboi</th>';\par
\tab\par
\tab data += '\tab\tab <th scope="col" abbr="Points">Puncte</th>';\par
\tab data += '\tab </tr>';\par
\tab\par
\tab for ( key = 1; key < a_pVillages.rows.length; key++ ) \{\par
\tab\tab var a_vCoords = a_pVillages.rows[key].cells[1].innerHTML.split ( '|' );\par
\tab\tab var a_vCoordX = a_vCoords[0];\par
\tab\tab var a_vCoordY = a_vCoords[1];\par
\tab\tab\par
\tab\tab data += '\tab <tr>';\par
\tab\tab data += '\tab\tab <th scope="row" class="label">' + a_pVillages.rows[key].cells[0].innerHTML + '</th>';\par
\tab\tab data += '\tab\tab <td align="center">';\par
\tab\tab data += '\tab\tab\tab <strong>(' + a_vCoordX + '|' + a_vCoordY + ') K' + getContinent ( a_vCoordX , a_vCoordY )[0] + '</strong>';\par
\tab\tab data += '\tab\tab </td>';\par
\tab\tab if ( sWarGroup ) \{\par
\tab\tab\tab data += '\tab\tab <td align="center">';\par
\tab\tab\tab data += '\tab\tab\tab War Group ' + getWarGroup ( a_vCoordX , a_vCoordY );\par
\tab\tab\tab data += '\tab\tab </td>';\par
\tab\tab\}\par
\tab\tab data += '\tab\tab <td align="center">';\par
\tab\tab data += '\tab\tab\tab ' + a_pVillages.rows[key].cells[2].innerHTML;\par
\tab\tab data += '\tab\tab </td>';\par
\tab\tab data += '\tab </tr>';\par
\tab\}\par
\tab\par
\tab data += '</table>';\par
\tab\par
\tab a_pVillages.innerHTML = data;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Info_Village\par
// Summary: Alters the village info screen\par
function FW_Screen_Info_Village() \{\par
\tab var a_vName = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0].innerHTML;\par
\tab var a_vPoints = pMain.rows[0].cells[0].childNodes[2].rows[2].cells[1].innerHTML;\par
\tab var a_vCoords = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[1].innerHTML.split ( '|' );\par
\tab var a_vCoordX = a_vCoords[0];\par
\tab var a_vCoordY = a_vCoords[1];\par
\tab\par
\tab var a_pID = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[1].innerHTML.match(/screen=info_player&amp;id=([\\d]+)/)[1];\par
\tab var a_pName = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[1].innerHTML;\par
\tab var a_pTribe = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[1].innerHTML;\par
\tab\par
\tab if ( a_pTribe != '<a href=""></a>' ) \{\par
\tab\tab var a_pTribeID = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[1].innerHTML.match(/id=([\\d]+)"/)[1];\par
\tab\}\par
\tab\par
\tab var data = '';\par
\par
\tab data += '<table id="mytable" cellspacing="0">';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="col" colspan="2" abbr="' + a_vName + '">' + a_vName + '</th>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="labeltop">Coordinates</th>';\par
\tab data += '\tab\tab <td>';\par
\tab data += '\tab\tab\tab <strong>(' + a_vCoordX + '|' + a_vCoordY + ') K' + getContinent ( a_vCoordX , a_vCoordY )[0] + '</strong>';\par
\tab\par
\tab if ( sWarGroup ) data += ' War Group ' + getWarGroup ( a_vCoordX , a_vCoordY );\par
\tab\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label">Points</th>';\par
\tab data += '\tab\tab <td>';\par
\tab data += '\tab\tab\tab ' + a_vPoints;\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label">Village Owner</th>';\par
\tab data += '\tab\tab <td>';\par
\tab data += '\tab\tab\tab ' + a_pName;\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label">Village Owner Stats</th>';\par
\tab data += '\tab\tab <td class="loader_stats">';\par
\tab data += '\tab\tab\tab <img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + a_pID + '&s=tw' + world + '">';\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab\par
\tab if ( a_pTribe != '<a href=""></a>' ) \{\par
\tab\tab data += '\tab <tr>';\par
\tab\tab data += '\tab\tab <th scope="row" class="label">Owning Tribe Stats<br>' + a_pTribe + '</th>';\par
\tab\tab data += '\tab\tab <td class="loader_stats">';\par
\tab\tab data += '\tab\tab\tab <img src="http://l.jon-dawson.co.uk/image.php?type=tribegraph&id=' + a_pTribeID + '&s=tw' + world + '">';\par
\tab\tab data += '\tab\tab </td>';\par
\tab\tab data += '\tab </tr>';\par
\tab\}\par
\tab\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label" colspan="2">' + pMain.rows[0].cells[0].childNodes[2].rows[5].cells[0].innerHTML + '</th>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label" colspan="2">' + pMain.rows[0].cells[0].childNodes[2].rows[6].cells[0].innerHTML + '</th>';\par
\tab data += '\tab </tr>';\par
\tab\par
\tab if ( pMain.rows[0].cells[0].childNodes[2].rows.length > 8 ) \{\par
\tab\tab data += '\tab <tr>';\par
\tab\tab data += '\tab\tab <th scope="row" class="label" colspan="2">' + pMain.rows[0].cells[0].childNodes[2].rows[7].cells[0].innerHTML + '</th>';\par
\tab\tab data += '\tab </tr>';\par
\tab\}\par
\tab\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="label" colspan="2">';\par
\tab data += '\tab\tab\tab <a id="favorite" href="#">';\par
\tab\par
\tab if ( GM_getValue ( 'favorite_villages' ).search ( a_vName ) != -1 ) \{\par
\tab\tab data += '\tab\tab\tab\tab\'bb Remove village from favorites';\par
\tab\} else \{\par
\tab\tab data += '\tab\tab\tab\tab\'bb Add village to favorites';\par
\tab\}\par
\tab\par
\tab data += '\tab\tab\tab </a>';\par
\tab data += '\tab\tab </th>';\par
\tab data += '\tab </tr>';\par
\tab\par
\tab data += '</table>';\par
\par
\tab document.addEventListener('click', function(event) \{\par
\tab\par
\tab\tab if ( event.target.id == 'favorite' ) \{\par
\tab\tab\tab $( '#' + event.target.id ).fadeOut('slow', function()\{\par
\tab\tab\tab\par
\tab\tab\tab\tab if ( GM_getValue ( 'favorite_villages' ).search ( a_vName ) != -1 ) \{\par
\tab\tab\tab\tab\tab var string = GM_getValue ( 'favorite_villages' );\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab string = string.replace ( a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' , '' );\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab GM_setValue ( 'favorite_villages' , string )\par
\tab\tab\tab\tab\tab $( '#' + event.target.id ).html( "\'bb Add village to favorites" ).fadeIn('slow');\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'favorite_villages' , GM_getValue ( 'favorite_villages' ) + a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' )\par
\tab\tab\tab\tab\tab $( '#' + event.target.id ).html( "\'bb Remove village from favorites" ).fadeIn('slow');\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab\});\par
\tab\tab\}\par
\tab\tab\par
\tab\}, true);\par
\tab\par
\tab pMain.rows[0].cells[0].childNodes[2].innerHTML = data;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Overview_Villages\par
// Summary: Alters the villages overview screen\par
function FW_Screen_Overview_Villages() \{\par
\tab if ( mode == 'troops' ) \{\par
\tab\tab var table = pMain.rows[0].cells[0].childNodes[0];\par
\tab\tab var data = '';\par
\tab\tab var attacks = 0;\par
\tab\tab\par
\tab\tab // Handle incoming attacks first\par
\tab\tab for ( key = 1; key < table.rows.length; key++ ) \{\par
\tab\tab\par
\tab\tab\tab if ( table.rows[key].cells[0].innerHTML.indexOf('graphic/command/attack.png') != -1 ) \{\par
\tab\tab\tab\tab var a_vID = table.rows[key].cells[0].innerHTML.match(/village=([\\d]+)/)[1];\par
\tab\tab\tab\tab var a_vName = '';\par
\tab\tab\tab\tab var a_vCoordX = '';\par
\tab\tab\tab\tab var a_vCoordY = '';\par
\tab\tab\tab\tab var a_vContinent = '';\par
\tab\tab\tab\tab var a_vWarGroup = '';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab for ( ikey = 0; ikey < pVillages; ikey++ ) \{\par
\tab\tab\tab\tab\tab var a_ivID = GM_getValue ( 'village' + ikey + 'id' );\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab if ( a_vID == a_ivID ) \{\par
\tab\tab\tab\tab\tab\tab a_vName = GM_getValue ( 'village' + ikey + 'name' );\par
\tab\tab\tab\tab\tab\tab a_vCoordX = GM_getValue ( 'village' + ikey + 'x' );\par
\tab\tab\tab\tab\tab\tab a_vCoordY = GM_getValue ( 'village' + ikey+ 'y' );\par
\tab\tab\tab\tab\tab\tab a_vContinent = GM_getValue ( 'village' + ikey + 'continent' );\par
\tab\tab\tab\tab\tab\tab a_vWarGroup = GM_getValue ( 'village' + ikey + 'wargroup' );\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab if ( attacks == 0 ) \{\par
\tab\tab\tab\tab\tab data += '<table id="mytable" cellspacing="0">';\par
\tab\tab\tab\tab\tab data += '\tab <tr>';\par
\tab\tab\tab\tab\tab data += '\tab\tab <th scope="col" abbr="Incoming Attack" class="nobg">Incoming Attack<br>Target</th>';\par
\tab\tab\tab\tab\tab data += '\tab\tab <th scope="col" abbr="Origin">Origin</th>';\par
\tab\tab\tab\tab\tab data += '\tab\tab <th scope="col" abbr="Arrival at">Arrival at</th>';\par
\tab\tab\tab\tab\tab data += '\tab\tab <th scope="col" abbr="Arrival in">Arrival in</th>';\par
\tab\tab\tab\tab\tab data += '\tab </tr>';\par
\tab\tab\tab\tab\tab data += '\tab <tr>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab GM_xmlhttpRequest(\{\par
\tab\tab\tab\tab\tab method: 'GET',\par
\tab\tab\tab\tab\tab url: baseURL + '/game.php?village=' + a_vID + '&screen=place',\par
\tab\tab\tab\tab\tab headers: \{\par
\tab\tab\tab\tab\tab\tab 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
\tab\tab\tab\tab\tab\tab 'Accept': 'text/html',\par
\tab\tab\tab\tab\tab\},\par
\tab\tab\tab\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab\tab\tab\tab var sStart = '<th width="250">Incoming troops</th>';\par
\tab\tab\tab\tab\tab\tab var sEnd = '</table>';\par
\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab var attackdata = '';\par
\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab var tabledata = responseDetails.responseText;\par
\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab if ( tabledata.indexOf( sStart ) != -1 ) \{\par
\tab\tab\tab\tab\tab\tab\tab var tabledata = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);\par
\tab\tab\tab\tab\tab\tab\tab tabledata = tabledata.substring(0, tabledata.indexOf(sEnd) + sEnd.length);\par
\tab\tab\tab\tab\tab\tab\tab //~ // tabledata = tabledata.split('</tr>');\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab\tab var limit = tabledata.split('graphic/command/attack.png');\par
\tab\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab\tab for ( key = 1; key < limit.length + 1; key++ ) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab <tr>';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab <th scope="row" class="spec">';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab\tab <a href="game.php?village=' + a_vID + '&amp;screen=overview&amp;">' + a_vName + '</a> <strong>(' + a_vCoordX + '|' + a_vCoordY + ')</strong>';\par
\tab\tab\tab\tab\tab\tab\tab\tab if ( sWarGroup ) attackdata += ' War Group ' + a_vWarGroup;\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab </th>';\par
\tab\tab\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab <td align="center">';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab\tab <a href="' + substrsub ( tabledata , '<a href="', '</a>' ) + '</a>';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab </td>';\par
\tab\tab\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab <td align="center">';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab\tab today at ' + substrsub ( tabledata , 'today at ', '</td>' );\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab </td>';\par
\tab\tab\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab <td align="center">';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab\tab <span class="timer">' + substrsub ( tabledata , '<span class="timer">', '</span>' ) + '</span>';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab\tab </td>';\par
\tab\tab\tab\tab\tab\tab\tab\tab attackdata += '\tab </tr>';\par
\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab attackdata = GM_getValue ( 'FW_temp' ) + attackdata;\par
\tab\tab\tab\tab\tab\tab GM_setValue ( 'FW_temp' , attackdata );\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\});\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab if ( attacks == 0 ) \{\par
\tab\tab\tab\tab\tab attacks = 1;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\par
\tab\tab //~ // Now handle friendly troop movements\par
\tab\tab //~ for ( key = 1; key < limit; key++ ) \{\par
\tab\tab\tab //~ var movements = 0;\par
\tab\tab\tab //~ data.rows[key].cells[0].innerHTML\par
\tab\tab\tab\par
\tab\tab\tab //~ if ( screen.indexOf('info') > -1 ) \{\par
\tab\tab\tab\tab //~ twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '&id=' + aID + '">' + a_vName + '</a></td></tr>'\par
\tab\tab\tab //~ \} else \{\par
\tab\tab\tab\tab //~ twInterface['playerBar'] += '<tr><td><a href="game.php?village=' + a_vID + '&amp;screen=' + screen + '">' + a_vName + '</a></td></tr>'\par
\tab\tab\tab //~ \}\par
\tab\tab //~ \}\par
\tab\tab\par
\tab\tab pMain.rows[0].cells[0].childNodes[0].innerHTML += data + GM_getValue ( 'FW_temp' ) + '</table>';\par
\tab\}\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Settings_Custom\par
// Summary: Alters the custom settings screen\par
function FW_Screen_Settings_Custom() \{\par
\tab var data = '';\par
\tab\par
\tab if ( getParam( 'job' ) == 'done' ) data += '<strong>Operation completed</strong>';\par
\tab data += '<br><br>';\par
\tab\par
\tab document.addEventListener('click', function(event) \{\par
\tab\tab if ( event.target.id == 'Submit' ) \{\par
\tab\tab\tab GM_setValue( 'sWidth' , document.getElementById('width_input').value )\par
\tab\tab\tab GM_setValue( 'sWarGroup' , document.getElementById('wargroup_input').checked )\par
\tab\tab\par
\tab\tab\tab window.location = gameURL +  vID + '&screen=settings_custom&job=done';\par
\tab\tab\}\par
\tab\}, true);\par
\tab\par
\tab data += '<table id="mytable" cellspacing="0">';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="col" abbr="Configurations" class="nobg">Configurations</th>';\par
\tab data += '\tab\tab <th scope="col" abbr="Setting">Setting</th>';\par
\tab data += '\tab\tab <th scope="col" abbr="Summary">Summary</th>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="spec">Show War Group</th>';\par
\tab data += '\tab\tab <td align="center">';\par
\tab\par
\tab if ( sWarGroup ) \{\par
\tab\tab data += '\tab\tab <input type="checkbox" id="wargroup_input" checked />';\par
\tab\} else \{\par
\tab\tab data += '\tab\tab <input type="checkbox" id="wargroup_input" />';\par
\tab\}\par
\tab\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab\tab <td>';\par
\tab data += "\tab\tab\tab Show current village's War Group on pages";\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="row" class="spec">Screen Width</th>';\par
\tab data += '\tab\tab <td align="center">';\par
\tab data += '\tab\tab\tab <input type="text" size="2" id="width_input" value="' + sWidth +'" />';\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab\tab <td>';\par
\tab data += "\tab\tab\tab Width (in pixels) the width of the screen should be";\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <td align="center">';\par
\tab data += '\tab\tab\tab <br><br><input type="submit" value="Submit" id="Submit">';\par
\tab data += '\tab\tab </td>';\par
\tab data += '\tab </tr>';\par
\tab data += '</table>';\par
\par
\tab pMain.innerHTML = data + pMain.innerHTML;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Rally_Point\par
// Summary: Alters the rally point screen\par
function FW_Screen_Rally_Point() \{\par
\tab var data = '';\par
\tab\par
\tab //~ pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[1].innerHTML += 'test';\par
\tab\par
\tab pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].id = 'mytable';\par
\tab\par
\tab var a_vCoordX = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].rows[0].cells[0].innerHTML.match(/name="x" value="([\\d]+)/)[1];\par
\tab var a_vCoordY = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].rows[0].cells[0].innerHTML.match(/name="y" value="([\\d]+)/)[1];\par
\tab\par
\tab data += '<th scope="row" class="labeltop">';\par
\tab data += '\tab X: <input type="text" name="x" value="' + a_vCoordX + '" size="5" />';\par
\tab data += '</th>';\par
\tab data += '<th scope="row" class="labeltop">';\par
\tab data += '\tab Y: <input type="text" name="y" value="' + a_vCoordY + '" size="5" />';\par
\tab data += '</th>';\par
\tab\par
\tab if ( typeof GM_getValue ( 'favorite_villages' ) != 'undefined' ) \{\par
\tab\tab data += '<th scope="row" class="nobg">';\par
\par
\tab\tab data += '\tab\tab\tab <table class="menu" align="left" style="border: 0px;">';\par
\tab\tab data += '\tab\tab\tab\tab <tr id="menu_row2">';\par
\tab\tab data += '\tab\tab\tab\tab\tab <td>';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab <a href="game.php?village=' + vID + '&amp;screen=favorite_villages">';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab\tab Favorite villages';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab </a><br />';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab <table class="menu nowrap">';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab\tab <tr id="menu_row">';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab\tab\tab <table cellspacing="0" width="120"style="border: 0px;">';\par
\tab\tab\par
\tab\tab var favorite = GM_getValue ( 'favorite_villages' ).split ( ';' )\par
\tab\tab\par
\tab\tab for ( key = 0; key < favorite.length - 1; key++ ) \{\par
\tab\tab\tab var f_vName = favorite[key].split ( '(' )[0];\par
\tab\tab\tab var f_vCoordX = favorite[key].split ( '(' )[1].split ( '|' )[0];\par
\tab\tab\tab var f_vCoordY = favorite[key].split ( '(' )[1].split ( '|' )[1].split ( ')' )[0];\par
\tab\tab\tab\par
\tab\tab\tab data += '<tr>';\par
\tab\tab\tab data += '\tab <td style="border: 0px;">';\par
\tab\tab\tab data += '\tab\tab <a href="javascript:insertNumber(document.forms[0].x, 000); javascript:insertNumber(document.forms[0].y, 000); javascript:insertNumber(document.forms[0].x, ' + f_vCoordX + '); javascript:insertNumber(document.forms[0].y, ' + f_vCoordY + ');">';\par
\tab\tab\tab data += f_vName;\par
\tab\tab\tab data += '\tab\tab </a>';\par
\tab\tab\tab data += '\tab </td>';\par
\tab\tab\tab data += '</tr>';\par
\tab\tab\}\par
\tab\tab\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab\tab </tr>';\par
\tab\tab data += '\tab\tab\tab\tab\tab\tab </table>';\par
\tab\tab data += '\tab\tab\tab\tab\tab </td>';\par
\tab\tab data += '\tab\tab\tab\tab </tr>';\par
\tab\tab data += '\tab\tab\tab </table>';\par
\par
\tab\tab data += '</th>';\par
\tab\}\par
\tab\par
\tab data += '<th scope="row" class="label">';\par
\tab data += '\tab <input class="attack" name="attack" type="submit" value="Attack" style="font-size: 10pt;" /> ';\par
\tab data += '\tab <input class="support" name="support" type="submit" value="Support" style="font-size: 10pt;" />';\par
\tab data += '</th>';\par
\tab\par
\tab pMain.rows[0].cells[0].childNodes[2].rows[0].cells[1].childNodes[3].childNodes[3].rows[0].innerHTML = data;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Favorite_Villages\par
// Summary: Alters the favorite villages screen\par
function FW_Screen_Favorite_Villages() \{\par
\tab var favorite = GM_getValue ( 'favorite_villages' ).split ( ';' )\par
\tab\par
\tab if ( mode == 'remove' ) \{\par
\tab\tab for ( key = 0; key < favorite.length - 1; key++ ) \{\par
\tab\tab\tab if ( key == getParam ( 'id' ) ) \{\par
\tab\tab\tab\tab GM_setValue ( 'favorite_villages' , GM_getValue ( 'favorite_villages' ).replace ( favorite[key] + ';' , '' ) );\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\par
\tab\tab var favorite = GM_getValue ( 'favorite_villages' ).split ( ';' )\par
\tab\}\par
\par
\tab var data = '<h2>Favorite Villages</h2>';\par
\tab\par
\tab data += '<table id="mytable" cellspacing="0">';\par
\tab data += '\tab <tr>';\par
\tab data += '\tab\tab <th scope="col" abbr="Setting">Name</th>';\par
\tab data += '\tab\tab <th scope="col" abbr="Summary">Coordinates</th>';\par
\tab data += '\tab </tr>';\par
\tab\par
\tab for ( key = 0; key < favorite.length - 1; key++ ) \{\par
\tab\tab var f_vName = favorite[key].split ( '(' )[0];\par
\tab\tab var f_vCoordX = favorite[key].split ( '(' )[1].split ( '|' )[0];\par
\tab\tab var f_vCoordY = favorite[key].split ( '(' )[1].split ( '|' )[1].split ( ')' )[0];\par
\tab\tab\par
\tab\tab data += '<tr>';\par
\tab\tab data += '\tab <th scope="row" class="spec">';\par
\tab\tab data += f_vName;\par
\tab\tab data += '\tab </th>';\par
\tab\tab data += '\tab <td><strong>(' + f_vCoordX + '|' + f_vCoordY + ') K' + getContinent ( f_vCoordX , f_vCoordY )[0] + '</td>';\par
\tab\tab data += '\tab <td><a href="' + gameURL + vID + '&screen=favorite_villages&mode=remove&id=' + key + '"> \'bb Remove</a></td>';\par
\tab\tab data += '</tr>';\par
\tab\}\par
\tab\par
\tab document.addEventListener('click', function(event) \{\par
\tab\par
\tab\tab if ( event.target.id == 'favorite' ) \{\par
\tab\tab\tab $( '#' + event.target.id ).fadeOut('slow', function()\{\par
\tab\tab\tab\par
\tab\tab\tab\tab if ( GM_getValue ( 'favorite_villages' ).search ( a_vName ) != -1 ) \{\par
\tab\tab\tab\tab\tab var string = GM_getValue ( 'favorite_villages' );\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab string = string.replace ( a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' , '' );\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab GM_setValue ( 'favorite_villages' , string )\par
\tab\tab\tab\tab\tab $( '#' + event.target.id ).html( "\'bb Add village to favorites" ).fadeIn('slow');\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab GM_setValue ( 'favorite_villages' , GM_getValue ( 'favorite_villages' ) + a_vName + ' (' + a_vCoordX + '|' + a_vCoordY + ');' )\par
\tab\tab\tab\tab\tab $( '#' + event.target.id ).html( "\'bb Remove village from favorites" ).fadeIn('slow');\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab\});\par
\tab\tab\}\par
\tab\tab\par
\tab\}, true);\par
\tab\par
\tab data += '</table>';\par
\tab\par
\tab pMain.rows[0].cells[0].innerHTML = data;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: FW_Screen_Misc\par
// Summary: Alters any screen not explicitly called for\par
function FW_Screen_Misc() \{\par
\tab var data = '';\par
\par
\tab //_____________________________________//\par
\tab // Edit village overview page\par
\tab //===================================//\par
\tab if ( screen == 'overview' ) \{\par
\tab\tab pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[0].cells[0].width = "490";\par
\tab\tab\par
\tab\tab // Add daily resource production\par
\tab\tab var Wood = pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[1].cells[1];\par
\tab\tab var rawAmount = Wood.innerHTML.split(" per Hour"); rawAmount = rawAmount[0].split("<strong>"); rawAmount = rawAmount[1].split("</strong>"); \par
\tab\tab Wood.innerHTML = Wood.innerHTML + '<br><small><strong>' + parseInt(rawAmount[0])*24 + '</strong> per Day</small>';\par
\par
\tab\tab var Clay = pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[2].cells[1];\par
\tab\tab var rawAmount = Clay.innerHTML.split(" per Hour"); rawAmount = rawAmount[0].split("<strong>"); rawAmount = rawAmount[1].split("</strong>"); \par
\tab\tab Clay.innerHTML = Clay.innerHTML + '<br><small><strong>' + parseInt(rawAmount[0])*24 + '</strong> per Day</small>';\par
\par
\tab\tab var Iron = pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].childNodes[0].rows[3].cells[1];\par
\tab\tab var rawAmount = Iron.innerHTML.split(" per Hour"); rawAmount = rawAmount[0].split("<strong>"); rawAmount = rawAmount[1].split("</strong>"); \par
\tab\tab Iron.innerHTML = Iron.innerHTML + '<br><small><strong>' + parseInt(rawAmount[0])*24 + '</strong> per Day</small>';\par
\tab\tab\par
\tab\tab GM_xmlhttpRequest(\{\par
\tab\tab\tab method: 'GET',\par
\tab\tab\tab url: baseURL + '/game.php?village=' + vID + '&screen=market',\par
\tab\tab\tab headers: \{\par
\tab\tab\tab\tab 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
\tab\tab\tab\tab 'Accept': 'text/html',\par
\tab\tab\tab\},\par
\tab\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab\tab var sStart = '</table><h3>Incoming transports</h3>';\par
\tab\tab\tab\tab var sEnd = '</table>';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab if ( Transports.indexOf(sStart) < 0 ) \{\par
\tab\tab\tab\tab\tab var Transports = responseDetails.responseText.substring(responseDetails.responseText.indexOf(sStart) + sStart.length);\par
\tab\tab\tab\tab\tab Transports = Transports.substring(0, Transports.indexOf(sEnd) + sEnd.length);\par
\tab\tab\tab\tab\tab //~ // Transports = Transports.split('</tr>');\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab pMain.rows[0].cells[0].childNodes[1].rows[0].cells[1].innerHTML += Transports;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\});\par
\tab\}\par
\tab\par
\tab //_____________________________________//\par
\tab // Edit incoming attack screen\par
\tab //===================================//\par
\tab if ( screen == 'info_command' ) \{\par
\tab\tab // Aesthetics\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[0].cells[0];\par
\tab\tab x.innerHTML = "<div style='height: 16px; background-image: url(http://joshdb.com/k46/GM/info_player_row_top.png); background-repeat: no-repeat;'><div style='position: relative; left: 96px; top: 1px;'>" + x.innerHTML;\par
\tab\tab\par
\tab\tab pMain.rows[0].cells[0].childNodes[2].rows[1].cells[0].innerHTML = '';\par
\tab\tab pMain.rows[0].cells[0].childNodes[2].rows[3].cells[0].innerHTML = '';\par
\tab\tab\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[1];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 144px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_attacker_stats.png); background-repeat: no-repeat;'>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[1];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 144px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_defender_stats.png); background-repeat: no-repeat;'>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[2].cells[0];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_village.png); background-repeat: no-repeat;'>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[0];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_village.png); background-repeat: no-repeat;'>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[5].cells[0];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/travel_time.png); background-repeat: no-repeat;'>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[6].cells[0];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_at.png); background-repeat: no-repeat;'>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[7];\par
\tab\tab x.innerHTML = "<td colspan='2'><div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_in.png); background-repeat: no-repeat;'></td><td>" + pMain.rows[0].cells[0].childNodes[2].rows[7].cells[1].innerHTML + "</td>";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[8].cells[0];\par
\tab\tab x.innerHTML = "<div style='background-color: #DED3B9; height: 16px; width: 80px; background-image: url(http://joshdb.com/k46/GM/incoming_row.png); background-repeat: no-repeat;'><div style='position: relative; left: 90px; top: 1px;'>" + x.innerHTML + "";\par
\tab\tab var x = pMain.rows[0].cells[0].childNodes[2].rows[9].cells[0];\par
\tab\tab x.innerHTML = "<div style='height: 16px; width: 200px; background-image: url(http://joshdb.com/k46/GM/incoming_row.png); background-repeat: no-repeat;'><div style='position: relative; left: 90px; top: 1px;'>" + x.innerHTML + "";\par
\tab\tab\par
\tab\tab // Get attacking player id\par
\tab\tab var aID = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[2].innerHTML.match(/screen=info_player&amp;id=([\\d]+)/);\par
\tab\tab\par
\tab\tab // Add attacking player stats\par
\tab\tab var aStats = pMain.rows[0].cells[0].childNodes[2].rows[1].cells[2];\par
\tab\tab aStats.innerHTML = '<div style="background: #DED3B9; height: 144px;">' + aStats.innerHTML + '<br><img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + aID + '&s=tw' + world + '">'\par
\tab\tab\par
\tab\tab // Add attacking village war group\par
\tab\tab var aVwG = pMain.rows[0].cells[0].childNodes[2].rows[2].cells[1];\par
\tab\tab var aCoords = aVwG.innerHTML.split("(");\par
\tab\tab aCoords = aCoords[1].split(")");\par
\tab\tab aCoords = aCoords[0].split("|");\par
\tab\tab aCoords = new Array(aCoords[0], aCoords[1]);\par
\tab\tab\par
\tab\tab if ( sWarGroup ) \{\par
\tab\tab\tab var aWargroup = getWarGroup( aCoords[0] , aCoords[1] );\par
\tab\tab\tab aVwG.innerHTML = aVwG.innerHTML + ' War Group <strong>' + aWargroup  + '</strong>';\par
\tab\tab\}\par
\tab\tab\par
\tab\tab // Get defending player id\par
\tab\tab var dID = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[2].innerHTML.match(/screen=info_player&amp;id=([\\d]+)/);\par
\tab\tab\par
\tab\tab // Add defending player stats\par
\tab\tab var dStats = pMain.rows[0].cells[0].childNodes[2].rows[3].cells[2];\par
\tab\tab dStats.innerHTML = '<div style="background: #DED3B9; height: 144px;">' + dStats.innerHTML + '<br><img src="http://l.jon-dawson.co.uk/image.php?type=playergraph&id=' + dID + '&s=tw' + world + '">'\par
\tab\tab\par
\tab\tab if ( sWarGroup ) \{\par
\tab\tab\tab // Add attacking village war group\par
\tab\tab\tab var dVwG = pMain.rows[0].cells[0].childNodes[2].rows[4].cells[1];\par
\tab\tab\tab var dCoords = dVwG.innerHTML.split("(");\par
\tab\tab\tab dCoords = dCoords[1].split(")");\par
\tab\tab\tab dCoords = dCoords[0].split("|");\par
\tab\tab\tab dCoords = new Array(dCoords[0], dCoords[1]);\par
\tab\tab\tab var dWargroup = getWarGroup( dCoords[0] , dCoords[1] );\par
\tab\tab\tab dVwG.innerHTML = dVwG.innerHTML + ' War Group <strong>' + dWargroup  + '</strong>';\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
// =================================================================================================================//\par
//__________________________________________________________________________________________________________________//\par
// GENERAL FUNCTIONS\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: getContinent\par
// Summary: Returns the continent a pair of coordinates falls in\par
// Params: int, int\par
// Returns: Array; [0] str, [1] int, [2] int\par
function getContinent( xCoord, yCoord ) \{\par
\tab for (var x = 0; x <= 9; x++)\{\par
\tab    if ( xCoord >= ( ( x*100 ) - 1 ) ) \{ var conY = x; \}\par
\tab\}\par
\tab for (var y = 0; y <= 9; y++)\{\par
\tab    if ( yCoord >= ( ( y*100 ) - 1 ) ) \{ var conX = y; \}\par
\tab\}\par
\par
\tab return new Array(conX + '' + conY, conX, conY);\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: getWarGroup\par
// Summary: Returns the War Group a pair of coordinates falls in\par
// Params: int, int\par
// Returns: str\par
function getWarGroup( xCoord, yCoord ) \{\par
\tab var tContinent = getContinent( xCoord, yCoord );\par
\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) \{ return 'A1' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) \{ return 'A2' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) \{ return 'A3' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) \{ return 'A4' \};\par
\tab\tab\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) \{ return 'B1' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1) ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) \{ return 'B2' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) \{ return 'B3' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+25 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) \{ return 'B4' \};\par
\tab\tab\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) \{ return 'C1' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) \{ return 'C2' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1) ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) ) \{ return 'C3' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+25 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) ) \{ return 'C4' \};\par
\tab\tab\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) \{ return 'D1' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+50 ) && ( yCoord < ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) \{ return 'D2' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+50 ) && ( xCoord < ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) ) \{ return 'D3' \};\par
\tab if ( ( yCoord >= ( ( parseInt( tContinent[1] )*100 ) - 1)+75 ) && ( yCoord <= ( ( parseInt( tContinent[1] )*100 ) - 1)+99 ) && ( xCoord >= ( ( parseInt( tContinent[2] )*100 ) - 1)+75 ) && ( xCoord <= ( ( parseInt( tContinent[2] )*100 ) - 1)+99 ) ) \{ return 'D4' \};\par
\tab\par
\tab return 'XX';\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: getParam\par
// Summary: Returns a parameter of the URL\par
// Params: str\par
// Returns: str\par
function getParam(name) \{\par
\tab if (name == 'GETURL') \{\par
\tab\tab var regexS = "(.*)/(.*)";\par
\tab\tab var regex = new RegExp( regexS );\par
\tab\tab var tmpURL = window.location.href;\par
\tab\tab var results = regex.exec( tmpURL );\par
\tab\} else \{\par
\tab\tab var regexS = "[\\\\?&]" + name + "=([^&#]*)";\par
\tab\tab var regex = new RegExp( regexS );\par
\tab\tab var tmpURL = window.location.href;\par
\tab\tab var results = regex.exec( tmpURL );\par
\tab\}\par
\tab if( results == null )\par
\tab\tab return "";\par
\tab else\par
\tab\tab return results[1];\par
\}\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: substrsub\par
// Summary: Returns the the string between two others\par
// Params: str, start, stop\par
\par
function substrsub( str, start, stop ) \{ \par
\tab return str.substring ( str.indexOf ( start ) + start.length, str.indexOf ( stop , str.indexOf ( start ) + start.length ) );\par
\}\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: addGlobalStyle\par
// Summary: Adds global CSS styles to the page\par
// Params: css\par
function addGlobalStyle(css) \{\par
\tab\tab var head, style;\par
\tab\tab head = document.getElementsByTagName('head')[0];\par
\tab\tab if (!head) \{ return; \}\par
\tab\tab style = document.createElement('style');\par
\tab\tab style.type = 'text/css';\par
\tab\tab style.innerHTML = css;\par
\tab\tab head.appendChild(style);\par
\}\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: addGlobalJS\par
// Summary: Adds global JS to the page\par
// Params: JS\par
function addGlobalJS(js) \{\par
\tab\tab var head, jscript;\par
\tab\tab head = document.getElementsByTagName('head')[0];\par
\tab\tab if (!head) \{ return; \}\par
\tab\tab jscript = document.createElement('script');\par
\tab\tab jscript.type = 'text/javascript';\par
\tab\tab jscript.innerHTML = js;\par
\tab\tab head.appendChild(jscript);\par
\}\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: addTableRow\par
// Summary: Adds rows to a table\par
// Params: table, str, str, str, int\par
function addTableRow(oTable, id, colSpan, text, pos) \{\par
\tab if (pos == null)\par
\tab\tab pos = oTable.rows.length;\par
\tab\tab\par
\tab var row = oTable.insertRow(pos);\par
\tab var newCell = row.insertCell(0);\par
\tab newCell.id = id;\par
\tab newCell.colSpan = colSpan;\par
\tab var textNode = document.createTextNode('');\par
\tab newCell.appendChild(textNode);\par
\tab document.getElementById(id).innerHTML = text;\par
\}\par
\par
//__________________________________________________________________________________________________________________//\par
\par
// Method: IsNumeric\par
// Summary: Checks if a number is numeric\par
// Params: str\par
function IsNumeric(sText) \{\par
   var ValidChars = "0123456789";\par
   var IsNumber=true;\par
   var Char;\par
\par
   for (i = 0; i < sText.length && IsNumber == true; i++) \par
      \{ \par
      Char = sText.charAt(i); \par
      if (ValidChars.indexOf(Char) == -1) \par
         \{\par
         IsNumber = false;\par
         \}\par
      \}\par
   return IsNumber;\par
\}\par
\par
//*/\par
}
