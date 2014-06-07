// ==UserScript==
// @name   NeopetsFix
// @description  Switches the username/pet/np info and the clock. Also restores the original top banner.
// @include   http://neopets.*
// @include   http://*neopets.*
// @include   www.neopets.*
// @include   www.*.neopets.*
// ==/UserScript==

(function() {
eval(function(A,r,s,e,n,a,l){s=function(e){return((e<a)?'':s(e/a))+n[l[131]](e%a+161)};while(++r<191)l[r]=(r<141)?'/'+l[r]+'/':'"'+l[r]+'"';while(--r>=0)A=A.replace(new RegExp(s(r),'g'),l[r]);return A}('¡ ·=¤(){¡ Ú=¢Ï;¡ õ=¢Æ;¡ ô=¢Çg;¡ ê=¢È;¡ ø=¢Ég;¡ ÷=¢Ð;¡ ú=¢Êg;¡ ù=¢Ñ;¡ á=1;¡ ð=3;¡ Ù=9;¡ Ç=¢Ë.§(¢Ã.¢Â),Ò;¡ Á={};¤ ·(¬,¢){if(!¬)¥[];¡ Û=¢Á.¢À.ý&&!¢;¢=(¢)?(¢.¢¿==¢¾)?¢:[¢]:[¸];Ò=ü(¢[0]);¡ Ü=û(¬).é(¢Ò);¡ ¨=[];°(¡ i in Ü){¬=ö(Ü[i]);¡ j=0,¼,¦,Â=¢Ó,ª=¢;¿(j<¬.º){¼=¬[j++];¦=¬[j++];Â+=¼+¦;ª=(Û&&Á[Â])?Á[Â]:ë(ª,¼,¦);if(Û)Á[Â]=ª}¨=¨.¢½(ª)}¥ ¨};·.ý=Ó;·.¢¼=¤(){Á={}};·.í=¤(){¥ ¢Ô+Ú+¢Õ};¡ ü=(Ç)?¤(®){if(®.Ä!=Ù)®=®.¸;¥ ®.¢»==¢Ö}:¤(®){if(®.Ä==Ù)®=®.ñ;¥ ®.¢¸!=¢×};¤ û(¬){¥ ¬.¶(ú,ù).¶(µ.ì,µ.ID).¶(ø,÷)};¤ ö(¬){if(õ.§(¬))¬=¢Ø+¬;¥ ¬.¨(ô)||[]};¡ ç={¢Ù:¤(£){°(¡ i=0;i<¸.ó;i++){if(¸.ó[i]==£)¥ ï}},¢Ú:¤(£){},¢Û:¤(£){¥!ä(£)},¢Ü:¤(£){¥!Å(£)},¢Ý:¤(£){¡ ¸=£.¢±||£.¸;¥ â(£==¸.ñ)},¢Þ:¤(£){°(¡ i=0;i<£.Ë.º;i++){if(»(£.Ë[i])||£.Ë[i].Ä==ð)¥ Ó}¥ ï}};¡ Ø=¢Ì;¤ î(«){¥(Ø.§(«))?«:¢ß+«+¢ß};¤ ×(«){¥(Ø.§(«))?«.Ï(1,-1):«};¡ É=[];¤ µ(À,Ì,«){¾.id=É.º;¡ §=¢à;Ö(À.¢­()){± ¢á:§+=¢á;¯;± ¢â:§+=¢ã;¯;¢«:§+=¢ä+À+¢å}Ö(Ì){± ¢æ:§+=¢ç+î(«);¯;± ¢è:§=¢é+×(«)+¢ê+§+¢ë;¯;± ¢ì:§=¢í+×(«)+¢î+§+¢ë;¯}²(É,Õ ¢©(¢ï,¢ð+§))};µ.Í.í=¤(){¥ µ.Æ+¾.id};µ.Æ=¢ñ;µ.ì=¢Íg;µ.ID=¤(¨,À,Ì,«){¥ Õ µ(À,Ì,«)};¤ ë(¢,¼,¦){¡ ©=¢Ó;if(ê.§(¦)){¦=¦.é(¢ò);©=¦[0];¦=¦[1]}¡ ª=[],i;Ö(¼){± ¢Ø:°(i in ¢){¡ ´=Ô(¢[i],¦,©);°(¡ j=0;j<´.º;j++){if(»(´[j])&&(!©||Ñ(´[j],©)))²(ª,´[j])}}¯;± ¢ó:°(i in ¢){¡ ´=¢[i].Ë;°(¡ j=0;j<´.º;j++)if(È(´[j],¦,©))²(ª,´[j])}¯;± ¢ô:°(i in ¢){¡ ³=Å(¢[i]);if(³&&È(³,¦,©))²(ª,³)}¯;± ¢õ:°(i in ¢){¡ ³=¢[i];¿(³=Å(³)){if(³&&È(³,¦,©))²(ª,³)}}¯;± ¢ö:¦=Õ ¢¨(¢÷+¦+¢ø);°(i in ¢)if(¦.§(¢[i].è))²(ª,¢[i]);¯;± ¢ù:°(i in ¢)if(¢[i].id==¦)²(ª,¢[i]);¯;± ¢ñ:¦=É[¦];°(i in ¢)if(¦(¢[i]))²(ª,¢[i]);¯;± ¢ú:¦=ç[¦];°(i in ¢)if(¦(¢[i]))²(ª,¢[i]);¯}¥ ª};¡ Ô=(Ç)?¤(¢,­){¥(­==¢û&&¢.æ)?¢.æ:¢.å(­)}:¤(¢,­,©){¥(©)?¢.Ô(¢û,­):¢.å(­)};¤ È(£,­,©){if(©&&!Ñ(£,©))¥ Ó;¥(­==¢û)?»(£):(Ò)?(£.­==­):(£.­==­.¢§())};¡ Æ=(Ç)?¢ü:¢ý;¤ Ñ(£,©){¥ £[Æ]==©};¤ ä(£){¿((£=£.¢¤)&&!»(£))ã;¥ £};¤ Å(£){¿((£=£.¢£)&&!»(£))ã;¥ £};¤ »(®){¥ â(®.Ä==á&&®.­!=¢þ)};¤ ²(Ð,à){Ð[Ð.º]=à};if(¢ÿ.¶(¢Î,¤(){¥¢Ó})){¡ Ý=ß.Í.¶;¡ Þ=¤(Ã,½){¡ ¨,Î=¢Ó,¹=¾;¿((¨=Ã.¢¢(¹))){Î+=¹.Ï(0,¨.¢¡)+½(¨[0],¨[1],¨[2],¨[3],¨[4]);¹=¹.Ï(¨.ÿ)}¥ Î+¹};ß.Í.¶=¤(Ã,½){¾.¶=(þ ½==£¡)?Þ:Ý;¥ ¾.¶(Ã,½)}}¥ ·}();',131,0,/./,String,95,'var`from`element`function`return`filter`test`match`namespace`filtered`value`selector`tagName`node`break`for`case`push`adjacent`subset`attributeSelector`replace`cssQuery`document`string`length`isElement`token`replacement`this`while`attribute`cssCache`cacheSelector`regexp`nodeType`nextElement`PREFIX`isMSIE`compareTagName`attributeSelectors`x5cs`childNodes`compare`prototype`newString`slice`array`compareNamespace`isXML`false`getElementsByTagNameNS`new`switch`unquote`QUOTED`NODE_DOCUMENT`version`useCache`selectors`string_replace`function_replace`String`item`NODE_ELEMENT`Boolean`continue`previousElement`getElementsByTagName`all`pseudoClasses`className`split`NAMESPACE`select`ALL`toString`quote`true`NODE_TEXT`documentElement`child`links`STREAM`STANDARD_SELECT`toStream`ASTERISK`IMPLIED_SELECTOR`TRIM`WHITESPACE`parseSelector`checkXML`caching`typeof`lastIndex`index`exec`nextSibling`previousSibling`prefix`scopeName`toUpperCase`RegExp`Function`getAttribute`default`class`toLowerCase`x22`x27`empty`ownerDocument`root`last`first`visited`link`HTML`localName`Document`XML`mimeType`reset`concat`Array`constructor`callee`arguments`appVersion`navigator`MSIE`fromCharCode`^[^>\\+~\\s]`[\\s>\\+~:@#\\.]|[^\\s>\\+~:@#\\.]+`\\|`([\\s>\\+~\\,]|^)([\\.:#@])`^\\s+|\\s*([\\+\\,>\\s;:])\\s*|\\s+$`¢Ä`([\\¢¯\\¢®])[^\\1]*\\1`\\[([^~|=\\]]+)([~|]?=?)([^\\]]+)?\\]`i`1.0.1`$1*$2`$1`,``¤ ·() {\\n  [Ú `]\\n}`¢º ¢¹`¢·` `¢¶`¢µ`¢´-ò`¢³-ò`¢²`¢°`\x27`£.`id`¢¬`è`¢ª(\x27`\x27)`=`==`~=`/(^|\\Ê)`(\\Ê|$)/.§(`)`|=`/(^|-)`(-|$)/.§(`£`¥ `@`|`>`+`~`.`(^|\\Ê)`(\\Ê|$)`#`:`*`¢¦`¢¥`!`i`¤'.split('\x60')));

var top = cssQuery("td[class=tt]"); //Retrieving the sidebar/topbar
var side = cssQuery("td[class=tl]");
var ban1 = cssQuery("div[id=ban]");
var ban2 = cssQuery("object[width=120]");
var header = cssQuery("table[width=728]");


ban1[0].innerHTML = "";
ban2[0].innerHTML = "";
var userInfo = top[0].innerHTML.split("e,"); // Removing the pipes and "welcome,"
userInfo = userInfo[1].split("|");

var newSide = side[0].innerHTML.split("<form"); // Removing all of the left except the time
side[0].innerHTML = "<form"+newSide[1]+"<form"+newSide[2];
side[0].innerHTML = "</font><font size=h1>User:<b>"+userInfo[0]+"</b><br>"+userInfo[1]+"<br>"+userInfo[2]+"<br><br>"+side[0].innerHTML;
var newTop = newSide[0].split("<br>")
//top[0].innerHTML = newTop[1];
header[0].setAttribute("style", "background-color:white; background-image:url('http://images.neopets.com/tb.gif'); background-position: bottom left; background-repeat: no-repeat;");
header[0].innerHTML = newTop[1];
//header[0].innerHTML = "<table WIDTH=\"100%\" height=44 STYLE=\"background-color:white; background-image:url('http://images.neopets.com/tb.gif'); background-position: bottom left; background-repeat: no-repeat; \" valign=top>"+newTop[1]+"</table>";
})();