// ==UserScript==
// @name                UrbanDead Item Organizer v0.4
// @namespace           http://userscripts.org/scripts/show/5955
// @description         Organizes your inventory in the MMOBBRPG Urban Dead
// @include http://urbandead.com/map.cgi*
// @include http://www.urbandead.com/map.cgi*
// ==/UserScript==

/* 
   Copyright 2005 Ryan Forsythe -- ryan@pdxcb.net

   This is distributed under the terms of the GPL.
   http://www.gnu.org/licenses/gpl.txt
   -----------------------------------------------------------------------------

   This is very much a work-in-progress. Please send me the *exact text* of any
   items which end up in the "unknown" inventory category.

   -----------------------------------------------------------------------------

   ***
   *** As the original author seems to be busy with other things, I tried to
   *** update this script and continue his great work. I'm not sure whether
   *** he is interested to be contacted about this modified version, so please
   *** just comment it @ userscripts.org.
   ***

   VERSION 0.4:

   * Fix encumbrance value shown
   * Minor fix Inventory text changed
   * Added "tennis racket", "cricket bat", "fencing foil", "golf club",
	 "hockey stick" and "pool cue" to weapons
   * Changed "kitchen knife" to "knife"
   * Added script packing for smaller size

   VERSION 0.3:

   Changes:
   * Added "kitchen knife" to weapons
   * Added "radio" to other items
   * Added "radio transmitter" to other items
   * Added "binoculars" to other items
   * Changed namespace

   Fixes:
   * Fixed pattern matching bug, non ammo items with brackets(i.e. radio)
     should be displayed correctly now

   VERSION 0.2:

   Changes:
   * Added "portable generator" to other items.
   * Added newline fix (thx Kieren and Joshua).
   * Removed some newlines, fixed the namespace.
*/

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 10=[\'1p\',\'1c\',\'1S 1F\',\'2F 2m\',\'27 17\',\'9 H 1E\',\'1x\',\'2D\',\'2v 2l\',\'2e 17\',\'26 20\',\'1X 1U\',\'1R 1O\',\'1K 1I\',\'1D 1A\'];5 O=[\'1p 1u\',\'1c 2C\'];5 1m=[\'1k H 2t\',\'1k H 2k\'];5 1f=[\'2d-2a 25\'];5 1n=[\'1Z 1Y\',\'1W 1V\'];5 13=[\'1T 1Q\',\'1P 1N\',\'1M\',\'1J W\',\'1H\',\'1G Y\',\'1B Y\',\'1z H 1y\',\'1w 1v\',\'W\',\'1t 1s\',\'1r\',\'1r 2B\',\'2A\'];J y(a,b,c){F(5 i=0;i<c.9;i++){8(c[i]==a[2]){b.L(a);C 1}}C 0}J v(b,a){8(a.9>0){5 c=6.z(\'1d\');5 d=6.z(\'1a\');d.A(\'19\',\'16-1q: 15 R #P\');5 e=6.B(b);d.7(e);c.7(d);5 f=6.z(\'1a\');f.A(\'19\',\'16-1q: 15 R #P\');5 g=Z Q;F(5 i=0;i<a.9;i++){8(g[a[i][2]]==E){g[a[i][2]]=Z Q(a[i])}X{g[a[i][2]].L(a[i])}}F(5 h 1L g){5 k=g[h];8(k.9==0){C 6.B(\'\')}5 l=6.z(\'N\');l.V="T.U?G-"+k[0][1];l.12="1C";l.A(\'I\',\'a\');8(k.9>1){l.w+=k.9+" x "}5 n=6.z(\'11\');n.A(\'I\',\'m\');n.A(\'1e\',\'18\');n.A(\'14\',k[0][2]);l.7(n);5 o=/\\((\\d*?)\\)/;5 p=k[0][3].M(o);8(E!=p){5 q=[];5 r=0;F(5 j=0;j<k.9;j++){5 m=k[j][3].M(o);8(m==E){C 6.B(\'\')}5 s=m[1];5 t=s*1;r+=t;q.L(t)}5 u="";F(5 j=0;j<q.9;j++){8(u!=""){u+=", "}u+=q[j]}l.w+=" ("+u+") &2z; "+r+" 2y"}X{l.w+=k[0][3]}f.7(l);f.7(6.B(\' \'))}a.2x();c.7(f);C c}C 6.B(\'\')}J 1l(){5 a=[];5 b=[];5 c=[];5 d=[];5 e=[];5 f=[];5 g=[];5 h=/\\<p\\>1j \\(1i 1h G\\)\\:\\<\\/p\\>([\\s\\S]*?)\\<p\\><\\/p\\>/;5 i=/\\<N V\\="T.U\\?G-(.*?)" 12="2r" I="a"><11 14="(.*?)" I="m" 1e="18">([\\s\\S]*?)<\\/N>/g;5 j=/\\<p\\>2p 2n \\d{1,4}\\% 2j.\\<\\/p\\>/;5 k=6.K.w.M(h);5 l=6.K.w.M(j);8(k!=E){5 m=k[0];5 n;2i((n=i.2h(m))!=E){i.2g+=1;8(y(n,a,10)){D}8(y(n,b,O)){D}8(y(n,c,1m)){D}8(y(n,d,1f)){D}8(y(n,e,1n)){D}8(y(n,f,13)){D}g.L(n)}5 o=6.z(\'2f\');5 p=6.z(\'1d\');p.A(\'2o\',\'2\');p.7(6.B("1j (1i 1h G):"));o.7(p);o.7(v(\'2c\',a));o.7(v(\'2q\',b));o.7(v(\'2b\',c));o.7(v(\'2s\',d));o.7(v(\'29\',e));o.7(v(\'2u\',f));o.7(v(\'28\',g));6.K.w=6.K.w.2w(h,\'<1g 24="1b-1o"></1g>\'+l+\'<p> </p>\');5 q=6.23("1b-1o");q.7(o)}}22.21(\'2E\',J(){1l()},2G);',62,167,'|||||var|document|appendChild|if|length||||||||||||||||||||||section_block|innerHTML||assn_items|createElement|setAttribute|createTextNode|return|continue|null|for|use|of|class|function|body|push|match|form|ammo_list|676|Array|solid||map|cgi|action|book|else|can|new|weapon_list|input|method|other_list|value|3px|border|bat|submit|style|td|ud|shotgun|tr|type|med_list|div|to|click|Inventory|bottle|scan|bev_list|sci_list|tempdiv|pistol|bottom|radio|generator|portable|clip|phone|mobile|crowbar|wirecutters|pair|pole|spray|POST|ski|pipe|gun|fuel|crucifix|cue|poetry|pool|in|newspaper|unit|stick|GPS|jacket|hockey|flare|flak|club|syringe|revivification|golf|extractor|DNA|foil|addEventListener|window|getElementById|id|kit|fencing|baseball|Unknown|Science|aid|Beverages|Weapons|first|cricket|table|lastIndex|exec|while|encumbered|wine|racket|axe|are|colspan|You|Ammo|post|Medical|beer|Other|tennis|replace|sort|shots|rarr|binoculars|transmitter|shell|knife|load|fire|true'.split('|'),0,{}))