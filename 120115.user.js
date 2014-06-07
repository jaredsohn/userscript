// ==UserScript==
// @id             ucoz-73a4db72-1cdc-4943-b945-cd0b6b6f26a9@script
// @name           ucoz tmpl content length counter
// @version        1.2
// @history        1.2 Недобльшой фикс ширины
// @history        1.1 Перенос слов (wrap) теперь включён по умолчанию.
// @history        1.0 Релиз, считает количество символов в окне шаблона, и меняет их по мере добавления/удаления
// @namespace      http://userscripts.org/scripts/show/120115
// @author         Black_Sun
// @description    
// @include        http://*/tmpls/*
// @run-at         document-end
// ==/UserScript==
var HTML=function(){
   var x,mnem=
   {34:"quot",38:"amp",39:"apos",60:"lt",62:"gt",402:"fnof",
   338:"OElig",339:"oelig",352:"Scaron",353:"scaron",
   376:"Yuml",710:"circ",732:"tilde",8226:"bull",8230:"hellip",
   8242:"prime",8243:"Prime",8254:"oline",8260:"frasl",8472:"weierp",
   8465:"image",8476:"real",8482:"trade",8501:"alefsym",8592:"larr",
   8593:"uarr",8594:"rarr",8595:"darr",8596:"harr",8629:"crarr",
   8656:"lArr",8657:"uArr",8658:"rArr",8659:"dArr",8660:"hArr",
   8704:"forall",8706:"part",8707:"exist",8709:"empty",8711:"nabla",
   8712:"isin",8713:"notin",8715:"ni",8719:"prod",8721:"sum",
   8722:"minus",8727:"lowast",8730:"radic",8733:"prop",8734:"infin",
   8736:"ang",8743:"and",8744:"or",8745:"cap",8746:"cup",8747:"int",
   8756:"there4",8764:"sim",8773:"cong",8776:"asymp",8800:"ne",
   8801:"equiv",8804:"le",8805:"ge",8834:"sub",8835:"sup",8836:"nsub",
   8838:"sube",8839:"supe",8853:"oplus",8855:"otimes",8869:"perp",
   8901:"sdot",8968:"lceil",8969:"rceil",8970:"lfloor",8971:"rfloor",
   9001:"lang",9002:"rang",9674:"loz",9824:"spades",9827:"clubs",
   9829:"hearts",9830:"diams",8194:"ensp",8195:"emsp",8201:"thinsp",
   8204:"zwnj",8205:"zwj",8206:"lrm",8207:"rlm",8211:"ndash",
   8212:"mdash",8216:"lsquo",8217:"rsquo",8218:"sbquo",8220:"ldquo",
   8221:"rdquo",8222:"bdquo",8224:"dagger",8225:"Dagger",8240:"permil",
   8249:"lsaquo",8250:"rsaquo",8364:"euro",977:"thetasym",978:"upsih",982:"piv"},
   tab=("nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|"+
   "copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|"+
   "acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|"+
   "frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|"+
   "Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|"+
   "Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|"+
   "Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|"+
   "szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|"+
   "egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|"+
   "ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|"+
   "ucirc|uuml|yacute|thorn|yuml").split("|");
   for(x=0;x<96;x++)mnem[160+x]=tab[x];
   tab=("Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|"+
   "Lambda|Mu|Nu|Xi|Omicron|Pi|Rho").split("|");
   for(x=0;x<17;x++)mnem[913+x]=tab[x];
   tab=("Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega").split("|");
   for(x=0;x<7;x++)mnem[931+x]=tab[x];
   tab=("alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|"+
   "lambda|mu|nu|xi|omicron|pi|rho|sigmaf|sigma|tau|upsilon|phi|chi|"+
   "psi|omega").split("|");
   for(x=0;x<25;x++)mnem[945+x]=tab[x];
   return {
     encode:function(text){
       return text.replace(/[\u00A0-\u2666<>\&]/g,function(a){
         return "&"+(mnem[a=a.charCodeAt(0)]||"#"+a)+";"
       })
     },
     decode:function(text){
       return text.replace(/\&#?(\w+);/g,function(a,b){
         if(Number(b))return String.fromCharCode(Number(b));
         for(x in mnem){
           if(mnem[x]===b)return String.fromCharCode(x);
         }
       })
     }
   }
}()


var cont=document.getElementById('tmpl'),
    place=document.getElementById('eMessage'),
    decount=HTML.decode(cont.innerHTML);
cont.wrap="on";
var ind=document.createElement('td');
ind.setAttribute('id','counter');
ind.setAttribute('style','width:9%');
ind.innerHTML="<span style='float:right'>Всего символов<br><center style='font-weight:bold'>"+decount.length+"</center></span>";
place.parentNode.parentNode.insertBefore(ind,place.parentNode.parentNode.firstChild);
document.getElementById('tmpl').addEventListener('keyup',function(){document.getElementById('counter').innerHTML="<span style='float:right'>Всего символов<br><center style='font-weight:bold'>"+cont.value.length+"</center></span>"},false)
