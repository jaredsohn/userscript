// ==UserScript==
// @name	   	   odloty links  checker
// @namespace      http://www.garsoniera.com.pl/
// @description    verifies links to odloty, roksa and some other popular polish escort ads 
// @include        http://*.garsoniera.com.pl/*
// @include	   	   https://*.swintuszek.pl/*
// ==/UserScript==

//declare variables
var thisLink;
var allElem = new Array();
var allLinks = new Array();
var flag = new Array();
var theAttribute = ['adead_link', 'alive_link'];

// set proper language if needed
var lngRoxan = true;
var lngOdloty = true;

function add_styles(){
	var	alive_link_png = 'data:image/png;base64,' + // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
	'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY' + 'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy' + 'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs' + 'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp' + 'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY' + 'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ' + 'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1' + '46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH' + 'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc' + '04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
	var	adead_link_png = 'data:image/png;base64,' + //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
	'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC' + 'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk' + 'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE' + '+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29' + 'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM' + '8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N' + 'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR' + 'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
	
	GM_addStyle("#alive_link_checked, #alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;color:green;}");
	GM_addStyle("#adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;text-decoration:line-through;}");
}

add_styles();

//get all links of the page in an array
if (location.hostname == "www.garsoniera.com.pl")
	allElem = document.getElementsByClassName('bbc_url');
else if (location.hostname == "www.swintuszek.pl")
	allElem = document.getElementsByClassName('postlink');

function isArray(a){
	return Object.prototype.toString.apply(a) === '[object Array]';
}

function setLinkAttr(i, details, A, bFlag){
		if (isArray(A)){
			for (k in A)
			{
				var result = details.responseText.indexOf(A[k]);
				if(result != -1){
					allElem[i].setAttribute('id',theAttribute[+bFlag]);
					return true;
				}		
			}
		}
		else // implied RegExp
		{
			var result = details.responseText.match(A);
			if(result != null){
				allElem[i].setAttribute('id',theAttribute[+bFlag]);
				return true;			
			}			
		}	
			
		return false;
}

function linkEval(i, details, A, bFlag, B){
	if (setLinkAttr(i, details, A, bFlag))
		return
	else if (B !== undefined){
		setLinkAttr(i, details, B, !bFlag);	
	}
	else		
		allElem[i].setAttribute('id',theAttribute[+(!bFlag)]);			
}

//const trackRegex = /\+48\d{9}|[0]\d{9}|\d{9}|\d{3}-\d{3}-\d{3}|\d{3}\s\d{3}\s\d{3}/g;
function theRequest(i){
	for (; i < allLinks.length; i++){	
		if (flag[i] != -1){	
			GM_xmlhttpRequest({
			  method:"GET",
			  url:allLinks[i],
			  headers:{
			    "User-Agent":"monkeyagent",
			    "Accept":"text/monkey,text/xml"
			    },
			  onload:function(details) {		  
				if (flag[i] == 1)       // ODLOTY 
					linkEval(i, details, /Oryginalne, unikalne - odloty|strona nie zosta.a znaleziona/, false, /\d{3}\s\d{3}\s\d{3}/);		
				else if (flag[i] == 9) // ROKSA
					linkEval(i, details, ["nie istnieje lub"], false, /\d{3}-\d{3}-\d{3}/);
				else if (flag[i] == 11) // EAMORE
					linkEval(i, details, ["Przepraszamy, ale szukana strona nie"], false, /Dane\sog.oszenia\sID/);			
				else if (flag[i] == 12) // GRZESZNICE 
					linkEval(i, details, /ID\s<B>[0-9]+<\/B>/, true);	
				else if (flag[i] == 13) // SEKRETKI
					linkEval(i, details, /Przepraszamy\sog.oszenie|escort\sadvert\shas\sexpired/, false, /\d{3}-\d{3}-\d{3}/);		
				else if (flag[i] == 14) // GODZINKA
					linkEval(i, details, ["Niestety nic nie znaleziono"], false, ["Telefon :"]);
				else if (flag[i] == 15) // KOCHANKA
					linkEval(i, details, /sex(\s)anons(\s)nr\.\s[0-9]+/, true, ["sex anons nr.  -"]);
				else if (flag[i] == 16) // ROXAN language set to polish 
					linkEval(i, details, /ID\snie\sistnieje|ID\sexistiert\snicht|ID\sneexistuje/, false, /\d{3}\s\d{3}\s\d{3}/);	
				else if (flag[i] == 17) // ODLOTY.WARSZAWA
					linkEval(i, details, ["Niestety nic nie znaleziono !!!"], false, /\d{3}-\d{3}-\d{3}/);	
				else if (flag[i] == 18) // BARA-BARA
					linkEval(i, details, /Adverts\snot\sfound|Nie\sznaleziono\sog.oszenia/, false, /Og.oszenie:|Adverts:/);	
				else if (flag[i] == 19) // SEXATLAS
					linkEval(i, details, ["Ostatnia aktualizacja:"], true);	
				else if (flag[i] == 20) // SEXOFERTY
					linkEval(i, details, ["Brak takiego profilu"], false);	
				else if (flag[i] == 21) // SEXPOSE
					linkEval(i, details, ["Brak og"], false, /\d{3}-\d{3}-\d{3}/);
				else if (flag[i] == 22) // OGLOSZENIATOWARZYSKIE
					linkEval(i, details, ["Podana nazwa profilu jest"], false);	
				else if (flag[i] == 23) // GOLDENLADIES
					linkEval(i, details, ["zadowolony ze spotkania"], true);
				else if (flag[i] == 24) // SEXDIVY 
					linkEval(i, details, /Telefon:\s<b>0-\d{3}\s\d{3}\s\d{3}<\/b>/, true);																																		
			  }
			});
			
			theRequest(i+1);
			break;	
		}
	}	
}

for (var i = 0; i < allElem.length; i++) {
   thisLink = allElem[i].getAttribute('href');
     
	// ODLOTY 
	// http://odloty.pl/ogloszenia-towarzyskie
	// http://odloty.pl/ogloszenie.html?id=41317
	// http://www.odloty.pl/announcements
	result = thisLink.match(/^http:\/\/(www\.)?odloty\.pl\/(ogloszenia-towarzyskie|announcements|ogloszenie\.html)/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 1;
		continue;
	}
	
	// ROKSA
	//http://www.roksa.pl/lpl/anons.php?nr=2939
	//http://www.roksa.pl/len/anons.php?nr=2939
	result = thisLink.match(/^http:\/\/(www\.)?roksa\.pl\/(lpl|len|lit|lru|lge|lfr|les)/im);
   	if (result != null){		
		if (result[2] != "lpl")
			thisLink = thisLink.replace(result[2], 'lpl');
		
		flag[i] = 9;
		allLinks[i] = thisLink;
		continue;
	} 

	// EAMORE http://www.eamore.com.pl/94029
	result = thisLink.match(/^http:\/\/(www\.)?eamore\.com\.pl\/\d+/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 11;
		continue;
	} 

	// GRZESZNICE http://www.grzesznice.pl
	result = thisLink.match(/^http:\/\/(www\.)?grzesznice\.pl/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 12;
		continue;
	} 

	// SEKRETKI http://www.sekretki.pl/ogloszenia%20towarzyskie,anonse%20towarzyskie,spotkania%20sponsorowane.php?id=1060
	result = thisLink.match(/^http:\/\/(www\.)?sekretki\.pl/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 13;
		continue;
	} 

	// GODZINKA http://www.godzinka.pl/main.php?site=show&girl=1224&srv=&age=&prv=&cit=Warszawa&pgs=&page=1#
	result = thisLink.match(/^http:\/\/(www\.)?godzinka\.pl/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 14;
		continue;
	}

	// KOCHANKA http://kochanka.pl/prywatne-ogloszenia-towarzyskie-Zabrze%20Gliwice-80434-1.html
	result = thisLink.match(/^http:\/\/(www\.)?kochanka\.pl\/prywatne-ogloszenia-towarzyskie/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 15;
		continue;
	}

	// ROXAN http://www.roxan.pl/anonse_towarzyskie/1866/Warszawa/Ola_26_priv/
	result = thisLink.match(/^http:\/\/(www\.)?roxan\.pl\/(anonse_towarzyskie|private)/im);
   	if (result != null){
   		if (lngRoxan){
   			GM_xmlhttpRequest({method:"GET", url:"http://roxan.pl/lang/pl/"});
   			lngRoxan = false;
   			}	
		allLinks[i] = thisLink;
		flag[i] = 16;
		continue;
	}

	// ODLOTY.WARSZAWA http://www.odloty.warszawa.pl/card.php?girl=7990
	result = thisLink.match(/^http:\/\/(www\.)?odloty.warszawa\.pl\/card\.php/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 17;
		continue;
	}

	// BARA-BARA http://www.bara-bara.pl/anonse/czarna-mamba-warszawa-p-1934.html
	result = thisLink.match(/^http:\/\/(www\.)?bara-bara\.pl\/anonse/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 18;
		continue;
	}

	// SEXATLAS http://www.sexatlas.pl/monika27lodz
	result = thisLink.match(/^http:\/\/(www\.)?sexatlas(\.com)?\.pl/im);
   	if (result != null){
   		thisLink = thisLink.replace(/lng=en|lng=de/, 'lng=pl'); 				
 		thisLink = thisLink.replace(/;en|;de/, ';pl');		
		allLinks[i] = thisLink;
		flag[i] = 19;
		continue;
	}
	
    // SEXOFERTY http://www.sexoferty.com.pl/sexoferta28.html
	result = thisLink.match(/^http:\/\/(www\.)?sexoferty\.com\.pl/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 20;
		continue;
	}	
    
    // SEXPOSE http://sexpose.pl/ogloszenia-towarzyskie/1392/Warszawa.html
    // http://sexpose.pl/glowna/act/dziewczyny/id/1392/lang/EN/task/info/
	result = thisLink.match(/^http:\/\/(www\.)?sexpose\.pl\/(ogloszenia-towarzyskie|glowna\/act\/dziewczyny\/id)/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 21;
		continue;
	}
	
    // OGLOSZENIATOWARZYSKIE http://www.ogloszeniatowarzyskie.net/Justynka_25.html
	result = thisLink.match(/^http:\/\/(www\.)?ogloszeniatowarzyskie\.net/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 22;
		continue;
	}
		
    // GOLDENLADIES http://www.goldenladies.com.pl
	result = thisLink.match(/^http:\/\/(www\.)?goldenladies\.com\.pl/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 23;
		continue;
	}   
	
	// SEXDIVY http://www.sexdivy.pl/index.php?o=5&i=4225
	result = thisLink.match(/^http:\/\/(www\.)?sexdivy\.pl/im);
   	if (result != null){		
		allLinks[i] = thisLink;
		flag[i] = 24;
		continue;
	} 	
		
    allLinks[i] = "";
    flag[i] = -1;    
}

theRequest(0);
//end of script