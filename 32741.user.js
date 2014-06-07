// ==UserScript==
// @name           Hindi reader
// @namespace      osias@hotmail.com
// ==/UserScript==


(function()
{
     var indice = {
                   //"a":"अ",  "e":"ए",  "i":"इ", "o":"ओ",  "u":"उ",
                   "ã":"अं",                     "õ":"ओं",          
          "ia":"य", "ao":"औ","ou":"औ",           
                   //"á":"अ'", "é":"ए'", "í":"ई", "ó":"ओ'", "ú":"ऊ",
                   "à":"आ",  "ê":"ऐ",
                   "ão":"औं",
          "b":"ब्", "ba":"ब" , "be":"बे", "bi":"बि",    "bo":"बो", "bu":"बु",
                   "bã":"बं",  "bé":"बे'",             "bom":"बों",
                   "ca":"क", "ce":"चे",  "ci":"चि",  "co":"को", "cu":"कु",              "cs":"क्स्",
                             "cê":"कै",
                   "ça":"शा","ço":"शो", "çu":"शु ",
                   "çã":"शों", "ção":"शं",
                   "cha":"छ", "chá":"छा","che":"छे",
          "d":"द्", "da":"द", "de":"दे", "di":"दि","do":"दो", "du":"दू",                             
                   "dá":"डा", "dé":"दे'", "dí":"दी", 
                   "dã":"दं",
          "f":"फ्", "fa":"फ",  "fe":"फे", "fi":"फि", "fo":"फो", "fu":"फु",
                   "fá":"फा",           "fí":"फी", "fó":"फो'",
                   "fã":"फं", 
          "g":"ग्", "ga":"ग", "ge":"गे", "gi":"गि",  "go":"गो", "gu":"गु",
                   "gá":"गा",         "gí":"गी", 
                   "gã":"गं",     
                   "já":"जा",
          "l":"ल्", "la":"ल","le":"ले", "li":"लि",   "lo":"लो",  "lu":"लु", 
                   "lá":"ला", "lé":"ले'", "lí":"ली", "ló":"लो'", "lú":"लू",  
                   "lã":"लं",
	     "m":"म्", "ma":"म", "me":"मे",  "mi":"मि",  "mo":"मो", "mu":"मु",
	              "má":"मा", "mé":"मे'", "mí":"मी",  
	              "mã":"मं",
          "n":"न्", "na":"न", "ne":"ने",   "ni":"नि",  "no":"नो", "nu":"नु",  "nú":"नू",
                   "nã":"नं", "né":"ने'",  "ní":"नी", 
                   "nha":"ञ", 
                   "não":"नों",	
          "p":"प्", "pa":"प", "pe":"पे",         "po":"पो",            "pu":"पु", 
                   "pá":"पा",         "pí":"पी", "pó":"पो'",            
                   "pã":"पं",   
          "q":"क्",        
                  "que":"क़े", "qui":"क़ि", "qu":"क़ु", 
          "r":"र्", "ra":"र",  "re":"रे", "ri":"रि",   "ro":"रो", "ru":"रू",
                   "raa":"रा ",          "rí":"री", 
                   "rra":"ख", "rrá":"खा","rre":"खे",
          "s":"स्", "sa":"स",  "se":"से", "si":"सि" ,"so":"सो",  "so":"सो", "su":"सु",
                   "sã":"सं", "sé":"से'", "sí":"सी", "só":"सो'",
                   "sim":"सिं",
                   
          "t":"त्", "ta":"त",  "te":"ते",  "ti":"ति", "to":"तो",  "tu":"तु",  
                   "tá":"टा", "té":"ते'", "tí":"टी", "tó":"तो´", "tú":"तू", 
                   "tã":"तं",
          "v":"व्", "va":"व",  "ve":"वे", "vi":"वि",  "vo":"वो", "vu":"वु", 
                   "vá":"वा",
                   "vã":"वं",            "ví":"वी",
          "za":"ज़", 
          "zão":"जों",
          "----":"----"
     };

	var entrada = document.body.innerHTML;
	saida  ='';
	bEmTag=false;
	bEmAmp=false;
	for (i=0; i!=entrada.length; i++)
	{
	     var c  = entrada.substring(i,i+1);
	     var c12 = entrada.substring(i,i+2);
	     var c123 = entrada.substring(i,i+3);
	     
	     var c123456 = entrada.substring(i,i+6);
	     if("<"==c)
	     {
	          bEmTag=true;
	     }
	     if(">"==c)
	     {
	          bEmTag=false;
	     }
	     if (!bEmTag)
	     {
	          if(bEmAmp)
	          {
	               if((" "==c)||("&"==c)||(";"==c))
	               {
	                    bEmAmp=false;
	               }
	          }
	          else
	          {
	               if(("&"==c))
	               {
	                    bEmAmp=true;
	               }
	          }
	     }     	     
	     
	     if (bEmTag || bEmAmp)
	     {
	          saida += c;     
	     }
	     else
	     {     
	          c_min    = c.toLowerCase();
	          c12min   = c12.toLowerCase();
	          c123min  = c123.toLowerCase();
	          
	          c3 = entrada.substring(i+2,i+3)
	          c4 = entrada.substring(i+3,i+4)
	          c5 = entrada.substring(i+4,i+5)
	          if (
	               (" "==c5)||("?"==c5)||(","==c5)||("."==c5)||
	               (" "==c4)||("?"==c4)||(","==c4)||("."==c4)||
	               (" "==c3)||("?"==c3)||(","==c3)||("."==c3))
	          {
	               if ((indice[c123min]) && !bEmTag)
	               {
	                    if (c123min != c123){
	                         saida += "<font color=red>";
	                    }
	                    saida += indice[c123min];
     	               
	                    if (c123min != c123){
	                         saida += "</font>";
	                    }
	                    i++;
	                    i++;
	               }
	               else
	               if ((indice[c12min]) && !bEmTag)
	               {
	                    if (c12min != c12){
	                         saida += "<font color=red>";
	                    }
	                    saida += indice[c12min];
     	               
	                    if (c12min != c12){
	                         saida += "</font>";
	                    }
	                    i++;
	               }
	               else
	               if ((indice[c_min]) && !bEmTag)
	               {
	                    if (c_min != c){
	                         saida += "<font color=red>";
	                    }
	                    saida += indice[c_min];
	                    if (c_min != c){
	                         saida += "</font>";
	                    }
	               }
	               else
	               {
	                    saida += c;
	               }
	          }
	          else
	          {
	               saida += c;
	          }
	     }
	}
	void(document.body.innerHTML=saida );
	if ((location.href.indexOf('#') > -1) ) 
     {
          location.href=location.href;
     }
}
)();



