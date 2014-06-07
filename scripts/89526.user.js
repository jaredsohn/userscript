// ==UserScript==
// @name           H-BRS Stundenplan Marker
// @namespace      http://userscripts.org/scripts/show/89526
// @include        https://eva2.inf.h-brs.de/stundenplan/anzeigen*
// ==/UserScript==
//
// $LastChangedDate: 2011-04-01 19:01:21 +0200 (Fr, 01. Apr 2011) $
// $Rev: 60 $

// md5-Funktionen (gepackt)
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('g L(n){p(i=0;i<n;i++)1N[i]=0;1N.1y=n}g B(n){f n%(1k+1)}g O(a,b){a=B(a);b=B(b);A(a-r>=0){a=a%r;a>>=b;a+=1t>>(b-1)}C a>>=b;f a}g 1J(a){a=a%r;A(a&1t==1t){a-=1t;a*=2;a+=r}C a*=2;f a}g N(a,b){a=B(a);b=B(b);p(e i=0;i<b;i++)a=1J(a);f a}g w(a,b){a=B(a);b=B(b);e D=(a-r);e t=(b-r);A(D>=0)A(t>=0)f((D&t)+r);C f(D&b);C A(t>=0)f(a&t);C f(a&b)}g 1d(a,b){a=B(a);b=B(b);e D=(a-r);e t=(b-r);A(D>=0)A(t>=0)f((D|t)+r);C f((D|b)+r);C A(t>=0)f((a|t)+r);C f(a|b)}g 1p(a,b){a=B(a);b=B(b);e D=(a-r);e t=(b-r);A(D>=0)A(t>=0)f(D^t);C f((D^b)+r);C A(t>=0)f((a^t)+r);C f(a^b)}g 1o(a){a=B(a);f(1k-a)}e u=M L(4);e v=M L(2);v[0]=0;v[1]=0;e 1v=M L(1F);e 1K=M L(16);e J=M L(16);e 18=7;e 1f=12;e 1g=17;e X=22;e S=5;e T=9;e Z=14;e 1a=20;e 19=4;e Y=11;e 1c=16;e 1e=23;e R=6;e Q=10;e U=15;e V=21;g F(x,y,z){f 1d(w(x,y),w(1o(x),z))}g G(x,y,z){f 1d(w(x,z),w(y,1o(z)))}g H(x,y,z){f 1p(1p(x,y),z)}g I(x,y,z){f 1p(y,1d(x,1o(z)))}g 1b(a,n){f 1d(N(a,n),(O(a,(32-n))))}g o(a,b,c,d,x,s,K){a=a+F(b,c,d)+x+K;a=1b(a,s);a=a+b;f a}g q(a,b,c,d,x,s,K){a=a+G(b,c,d)+x+K;a=1b(a,s);a=a+b;f a}g h(a,b,c,d,x,s,K){a=a+H(b,c,d)+x+K;a=1b(a,s);a=a+b;f a}g m(a,b,c,d,x,s,K){a=a+I(b,c,d)+x+K;a=1b(a,s);a=a+b;f a}g 1L(1A,1w){e a=0,b=0,c=0,d=0;e x=1K;a=u[0];b=u[1];c=u[2];d=u[3];p(i=0;i<16;i++){x[i]=w(1A[i*4+1w],P);p(j=1;j<4;j++){x[i]+=N(w(1A[i*4+j+1w],P),j*8)}}a=o(a,b,c,d,x[0],18,1P);d=o(d,a,b,c,x[1],1f,1Q);c=o(c,d,a,b,x[2],1g,2o);b=o(b,c,d,a,x[3],X,2w);a=o(a,b,c,d,x[4],18,2u);d=o(d,a,b,c,x[5],1f,2l);c=o(c,d,a,b,x[6],1g,2c);b=o(b,c,d,a,x[7],X,2b);a=o(a,b,c,d,x[8],18,2j);d=o(d,a,b,c,x[9],1f,2i);c=o(c,d,a,b,x[10],1g,2p);b=o(b,c,d,a,x[11],X,2h);a=o(a,b,c,d,x[12],18,2g);d=o(d,a,b,c,x[13],1f,2f);c=o(c,d,a,b,x[14],1g,2a);b=o(b,c,d,a,x[15],X,2d);a=q(a,b,c,d,x[1],S,2e);d=q(d,a,b,c,x[6],T,2m);c=q(c,d,a,b,x[11],Z,2t);b=q(b,c,d,a,x[0],1a,2v);a=q(a,b,c,d,x[5],S,2s);d=q(d,a,b,c,x[10],T,2r);c=q(c,d,a,b,x[15],Z,2n);b=q(b,c,d,a,x[4],1a,29);a=q(a,b,c,d,x[9],S,2q);d=q(d,a,b,c,x[14],T,2x);c=q(c,d,a,b,x[3],Z,24);b=q(b,c,d,a,x[8],1a,1R);a=q(a,b,c,d,x[13],S,1S);d=q(d,a,b,c,x[2],T,1T);c=q(c,d,a,b,x[7],Z,1O);b=q(b,c,d,a,x[12],1a,28);a=h(a,b,c,d,x[5],19,25);d=h(d,a,b,c,x[8],Y,26);c=h(c,d,a,b,x[11],1c,27);b=h(b,c,d,a,x[14],1e,1U);a=h(a,b,c,d,x[1],19,1Z);d=h(d,a,b,c,x[4],Y,1V);c=h(c,d,a,b,x[7],1c,1W);b=h(b,c,d,a,x[10],1e,1X);a=h(a,b,c,d,x[13],19,1Y);d=h(d,a,b,c,x[0],Y,2k);c=h(c,d,a,b,x[3],1c,2M);b=h(b,c,d,a,x[6],1e,2V);a=h(a,b,c,d,x[9],19,2T);d=h(d,a,b,c,x[12],Y,2X);c=h(c,d,a,b,x[15],1c,3b);b=h(b,c,d,a,x[2],1e,2Y);a=m(a,b,c,d,x[0],R,2Z);d=m(d,a,b,c,x[7],Q,30);c=m(c,d,a,b,x[14],U,2W);b=m(b,c,d,a,x[5],V,31);a=m(a,b,c,d,x[12],R,33);d=m(d,a,b,c,x[3],Q,39);c=m(c,d,a,b,x[10],U,2y);b=m(b,c,d,a,x[1],V,37);a=m(a,b,c,d,x[8],R,34);d=m(d,a,b,c,x[15],Q,35);c=m(c,d,a,b,x[6],U,2S);b=m(b,c,d,a,x[13],V,2E);a=m(a,b,c,d,x[4],R,2F);d=m(d,a,b,c,x[11],Q,2D);c=m(c,d,a,b,x[2],U,2C);b=m(b,c,d,a,x[9],V,2B);u[0]+=a;u[1]+=b;u[2]+=c;u[3]+=d}g 1D(){v[0]=v[1]=0;u[0]=2I;u[1]=2O;u[2]=2Q;u[3]=2N;p(i=0;i<J.1y;i++)J[i]=0}g 1m(b){e E,i;E=w(O(v[0],3),1B);A(v[0]<1k-7)v[0]+=8;C{v[1]++;v[0]-=1k+1;v[0]+=8}1v[E]=w(b,P);A(E>=2K){1L(1v,0)}}g 1C(){e 1h=M L(8);e 1i;e i=0,E=0,1u=0;p(i=0;i<4;i++){1h[i]=w(O(v[0],(i*8)),P)}p(i=0;i<4;i++){1h[i+4]=w(O(v[1],(i*8)),P)}E=w(O(v[0],3),1B);1u=(E<1I)?(1I-E):(2J-E);1i=M L(1F);1i[0]=2P;p(i=0;i<1u;i++)1m(1i[i]);p(i=0;i<8;i++)1m(1h[i]);p(i=0;i<4;i++){p(j=0;j<4;j++){J[i*4+j]=w(O(u[i],(j*8)),P)}}}g W(n){e 1E="2H";e 1l="";e 1s=n;p(1x=0;1x<8;1x++){1l=1E.1G(1M.2A(1s)%16)+1l;1s=1M.2z(1s/16)}f 1l}e 1H="2G"+" !\\"#$%&\'()*+,-./2R:;<=>?@36"+"[\\\\]^38`3a{|}~";g 2U(1z){e l,s,k,1j,1q,1r,1n;1D();p(k=0;k<1z.1y;k++){l=1z.1G(k);1m(1H.2L(l))}1C();1j=1q=1r=1n=0;p(i=0;i<4;i++)1j+=N(J[15-i],(i*8));p(i=4;i<8;i++)1q+=N(J[15-i],((i-4)*8));p(i=8;i<12;i++)1r+=N(J[15-i],((i-8)*8));p(i=12;i<16;i++)1n+=N(J[15-i],((i-12)*8));s=W(1n)+W(1r)+W(1q)+W(1j);f s}',62,198,'||||||||||||||var|return|function|HH|||||II||FF|for|GG|0x80000000||t2|state|count|and||||if|integer|else|t1|index|||||digestBits|ac|array|new|shl|shr|0xff|S42|S41|S21|S22|S43|S44|hexa|S14|S32|S23|||||||||S11|S31|S24|rotateLeft|S33|or|S34|S12|S13|bits|padding|ka|0xffffffff|hexa_c|update|kd|not|xor|kb|kc|hexa_m|0x40000000|padLen|buffer|offset|hexa_i|length|nachricht|buf|0x3f|finish|init|hexa_h|64|charAt|ascii|56|shl1|transformBuffer|transform|Math|this|0x676f02d9|0xd76aa478|0xe8c7b756|0x455a14ed|0xa9e3e905|0xfcefa3f8|0xfde5380c|0x4bdecfa9|0xf6bb4b60|0xbebfbc70|0x289b7ec6|0xa4beea44|||||0xf4d50d87|0xfffa3942|0x8771f681|0x6d9d6122|0x8d2a4c8a|0xe7d3fbc8|0xa679438e|0xfd469501|0xa8304613|0x49b40821|0xf61e2562|0xfd987193|0x6b901122|0x895cd7be|0x8b44f7af|0x698098d8|0xeaa127fa|0x4787c62a|0xc040b340|0xd8a1e681|0x242070db|0xffff5bb1|0x21e1cde6|0x2441453|0xd62f105d|0x265e5a51|0xf57c0faf|0xe9b6c7aa|0xc1bdceee|0xc33707d6|0xffeff47d|floor|abs|0xeb86d391|0x2ad7d2bb|0xbd3af235|0x4e0811a1|0xf7537e82|01234567890123456789012345678901|0123456789abcdef|0x67452301|120|63|lastIndexOf|0xd4ef3085|0x10325476|0xefcdab89|0x80|0x98badcfe|0123456789|0xa3014314|0xd9d4d039|MD5|0x4881d05|0xab9423a7|0xe6db99e5|0xc4ac5665|0xf4292244|0x432aff97|0xfc93a039||0x655b59c3|0x6fa87e4f|0xfe2ce6e0|ABCDEFGHIJKLMNOPQRSTUVWXYZ|0x85845dd1|_|0x8f0ccc92|abcdefghijklmnopqrstuvwxyz|0x1fa27cf8'.split('|'),0,{}))

// colors
STATUS_NORMAL = "#F2F5ED";
STATUS_NEXT = "#FFFF66";
STATUS_NOW = "#F08080";
MARKED = "#97D8ED";
UNMARKED = "#FFFFFF";

// config
NEXT_NOTIFY_INTERVAL = 15;		//min
STATUS_UPDATE_INTERVAL = 60;	//sec

// language
STRING_OPTIONS_TOGGLER = "Userscript";
STRING_OPTIONS_TOGGLEMINIMIZE = " Nur markierte Veranstaltungen anzeigen";
STRING_OPTIONS_TOGGLESTATUS = " Ausblenden der Status-Spalte";
STRING_OPTIONS_NOTE_ERROR = "Userscript ist fehlerhaft. Bitte Entwickler kontaktieren."

STRING_STATUS_CURRENT = "jetzt";
STRING_STATUS_NEXT = "bald";

STRING_SCRIPT_UPDATE_NOTIFICATION = "Der Stundenplan hat sich geändert. Vorherige Markierungen haben sich verschoben."

// ab hier nicht mehr ändern!

// config name
SCRIPT_CONFIG_ID = "HBRS_STUNDENPLAN_MARKER"; 

// check booleans
CHECK_IS_MINIMIZED = false;
CHECK_IS_STATUS_DISABLED = false;

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

function initRows() {
	var cells = document.evaluate("//td[@class='liste-veranstaltung']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < cells.snapshotLength; i++) {
		var parentrow = cells.snapshotItem(i).parentNode;

		parentrow.setAttribute("id", "row_" + i);			
		parentrow.addEventListener("click", function execute(){togglemark(this.id); saveConfig();}, false);
		parentrow.style.cursor = "pointer";
	}
}

function initOptions() {
	var table = document.getElementsByTagName("table")[0];
	var optionsDiv = document.createElement("div");
	optionsDiv.id = "optionsbox";
	optionsDiv.style.border = "1px solid #CCC";
	optionsDiv.style.marginBottom = "10px";
	optionsDiv.style.padding = "5px";
	optionsDiv.style.width = "300px";
	table.parentNode.insertBefore(optionsDiv, table);
	
	var toggler = document.createElement("div");
	toggler.id = "toggler";
	toggler.style.paddingBottom = "5px";
	toggler.innerHTML = STRING_OPTIONS_TOGGLER + '<span id="option_toggleoptions"> &#9662;</span>';
		
	optionsDiv.parentNode.insertBefore(toggler, optionsDiv);
	
	var icon = document.getElementById('option_toggleoptions');
	icon.style.cursor = "pointer";
	
	optionsDiv.innerHTML = optionsDiv.innerHTML
		+ '<p><input type="checkbox" id="option_toggleminimize">'
		+ STRING_OPTIONS_TOGGLEMINIMIZE +'</input></p>';
	optionsDiv.innerHTML = optionsDiv.innerHTML
		+ '<p><input type="checkbox" id="option_togglestatus">'
		+ STRING_OPTIONS_TOGGLESTATUS +'</input></p>';
	optionsDiv.innerHTML = optionsDiv.innerHTML
		+ 'Script config: <input type="text" id="option_config" style="width:100%; border:none;"/>';
	optionsDiv.innerHTML = optionsDiv.innerHTML
		+ '<p>&nbsp;</p>Script status: <span id="option_scriptstatus">OK</span>';
		
	var element;
	
	element = document.getElementById('option_toggleminimize');
	element.addEventListener("click", function execute(){toggleMinimize();}, false);
	
	element = document.getElementById('option_togglestatus');
	element.addEventListener("click", function execute(){toggleStatus();}, false);
	
	element = document.getElementById('option_config');
	element.addEventListener("change", function execute(){saveConfig(this.value);}, false);
	
	element = document.getElementById('option_toggleoptions');
	element.addEventListener("click", function execute(){toggleOptions();}, false);
	
	toggleOptions();
}

function toggleOptions() {
	var optionsDiv = document.getElementById('optionsbox');
	var icon = document.getElementById('option_toggleoptions');
	
	if (optionsDiv.style.display == "none") {
		optionsDiv.style.display = "block";
		icon.innerHTML = " &#9652;"
		
	} else {
		optionsDiv.style.display = "none";
		icon.innerHTML = " &#9662;"
	}
}

function togglemark(id) {
	var row = document.getElementById(id);
	
	if (row.getAttribute("marked") == "true") {
		row.style.backgroundColor = UNMARKED;
		row.removeAttribute("marked", 1);
	} else {
		row.style.backgroundColor = MARKED;
		row.setAttribute("marked", "true");
	}
}

function saveConfig(val) {
	var savestring = "";

	if (val) {
		savestring = val;
	} else {
		var rows = document.evaluate("//tr[@marked='true']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
		for (var i = 0; i < rows.snapshotLength; i++) {
			var idstring = rows.snapshotItem(i).id.split("_");
		
			if (i == 0) var seperator = "";
			else var seperator = ";";
	
			savestring = savestring +  seperator + idstring[idstring.length -1];
		}
		
		document.getElementById('option_config').value = savestring;
	}
		
	GM_setValue(SCRIPT_CONFIG_ID + "_ID:" + MD5(location.href), savestring);
	GM_setValue(SCRIPT_CONFIG_ID + "_SELECTION_HASH", createSelectionHash());
}

function loadConfig() {
	var loadstring = GM_getValue(SCRIPT_CONFIG_ID + "_ID:" + MD5(location.href));
	var isMinimized = GM_getValue(SCRIPT_CONFIG_ID + "_IS_MINIMIZED");
	var isStatusDisabled = GM_getValue(SCRIPT_CONFIG_ID + "_IS_STATUS_DISABLED");
	
	if (!loadstring) return;
		
	var idstring = loadstring.split(";");
	
	for (var i = 0; i < idstring.length; i++) {
		togglemark("row_" + idstring[i]);
	}
	
	if (isMinimized == 'true') {
		document.getElementById("option_toggleminimize").checked = true;
		toggleMinimize();
	}
	
	if (isStatusDisabled == 'true') { 
		document.getElementById("option_togglestatus").checked = true;
		toggleStatus();
	}
	
	if (isOutOfDate()) {
		alert(STRING_SCRIPT_UPDATE_NOTIFICATION);
	}
	
	document.getElementById('option_config').value = loadstring;
}

function setDayIndex() {
	var daycells = document.evaluate("//td[@class='liste-wochentag']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < daycells.snapshotLength; i++) {
		var daytr =  daycells.snapshotItem(i).parentNode;	
		daytr.setAttribute("day", i +1);
	}
	
	var rows = document.evaluate("//tr[@id]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
	var day = "";
	
	for (var i = 0; i < rows.snapshotLength; i++) {
		var attr = rows.snapshotItem(i).getAttribute("day");
		if (attr != null && attr != "") {
			day = attr;
		} else {
			rows.snapshotItem(i).setAttribute("day", day);
		}
	}
}

function weekNumber() {
	var determinedate = new Date();
	var D = determinedate.getDay();
	
	if(D == 0) D = 7;
	
	determinedate.setDate(determinedate.getDate() + (4 - D));
	var YN = determinedate.getFullYear();
	var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
	var WN = 1 + Math.floor(ZBDoCY / 7);
	
	return WN;
}

function isOutOfDate() {
	var ret = true;
	var hash = GM_getValue(SCRIPT_CONFIG_ID + "_SELECTION_HASH");
	var newhash = createSelectionHash();
		
	if (!hash) ret = false;
	else if (hash == newhash) return false;
	
	return ret;
}

function createSelectionHash() {
	var markedrows = document.evaluate("//tr[@marked]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var hash = "nothing";
	
	for (var i = 0; i < markedrows.snapshotLength; i++) {
		var cells = document.evaluate("//td[@class='liste-veranstaltung']",
		markedrows.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
		hash += cells.snapshotItem(0).firstChild.data;
		hash = MD5(hash);
	}
	
	hash = MD5(hash);
	
	return hash;	
}

function matchesCalendarWeekInfo(str) {
	var wn = weekNumber();
	
	if (/KW \d{2}-\d{2}/.test(str)) { // case calendar week A-B
		var val = /KW (\d{2}-\d{2})/.exec(str)[1].split("-");
		
		if (wn >= val[0] && wn <= val[1]) return true;
		
		return false;
		
	} else if (/KW \d{2}\+\d{2}/.test(str)) { // case calendar week A+B
		var val = /KW (\d{2}\+\d{2})/.exec(str)[1].split("+");
		
		if (wn == val[0] || wn == val[1]) return true;
		
		return false;
		
	} else if (/KW \d{2}(,\d{2})*/.test(str)) { // case calendar week A,B,C,...
		var val = /KW (\d{2}(,\d{2})*)/.exec(str)[1].split(",");
		
		for (var i = 0; i < val.length; i++) {
			if (wn == val[i]) return true;
		}
		
		return false;
		
	} else if (/\wKW/.test(str)) { // case calendar week gKW or uKW
		var val = /(\w)KW/.exec(str)[1];
		
		if (val == 'g' && (wn % 2 == 0)) return true;
		if (val == 'u' && (wn % 2 != 0)) return true;
		
		return false;
		
	} else if (/\wKW ab KW \d{2}/.test(str)) { // case calendar week gKW ab KW A or uKW ab KW b
		var val1 = /(\w)KW ab KW \d{2}/.exec(str)[1];
		var val2 = /\wKW ab KW (\d{2})/.exec(str)[1];
		
		if (wn == val2) {
			if (val1 == 'g' && (wn % 2 == 0)) return true;
			if (val1 == 'u' && (wn % 2 != 0)) return true;
		}
				
		return false;
	}
	
	return null;	
}

function updateStatus() {
	var date = new Date();
	var hours = date.getHours();
	var minutes =  date.getMinutes();
	var day = date.getDay();

	var timecells = document.evaluate("//td[@class='liste-startzeit']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var datecells = document.evaluate("//td[@class='liste-beginn']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var statuscells = document.evaluate("//td[@class='liste-header']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var datepattern = /(.+?) \(\w?KW.*?\)/;
	var wnpattern = /\((\w?KW.*?)\)/;
	
	for (var i = 0; i < timecells.snapshotLength; i++) {
		var timebegin = timecells.snapshotItem(i).firstChild.data.split(":");
		var timeend = timecells.snapshotItem(i).nextSibling.nextSibling.firstChild.data.split(":");
		
		var dateinfo = datepattern.exec(datecells.snapshotItem(i).firstChild.data)[1].split("-");
		var datebegin = Date.UTC(dateinfo[0].split(".")[2], dateinfo[0].split(".")[1] - 1, dateinfo[0].split(".")[0]);
		var dateend = Date.UTC(dateinfo[1].split(".")[2], dateinfo[1].split(".")[1] - 1, dateinfo[1].split(".")[0]);
		var datenow = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
		
		var statustext = "-";
		statuscells.snapshotItem(i).style.backgroundColor = STATUS_NORMAL;
		
		var matchesWninfo = matchesCalendarWeekInfo(wnpattern.exec(datecells.snapshotItem(i).firstChild.data));
		
		if (matchesWninfo == null) {
			document.getElementById('option_scriptstatus').innerHTML = STRING_OPTIONS_NOTE_ERROR;
			matchesWninfo = false;
		}
		
		if (day == statuscells.snapshotItem(i).parentNode.getAttribute("day")) {
			if (datenow >= datebegin && datenow <= dateend) {	
				if (matchesWninfo) {
					datenow = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());		
					datebegin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), timebegin[0], timebegin[1], 00);
					dateend = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), timeend[0], timeend[1], 00);
			
					if (datenow > datebegin && datenow <= dateend) {
						statuscells.snapshotItem(i).style.backgroundColor = STATUS_NOW;
						statustext = STRING_STATUS_CURRENT;
					} else {
						var hoursnext = hours;
						var minnext = minutes + NEXT_NOTIFY_INTERVAL;
		
						if ((minnext % 60) != minnext) {
							var hoursnext = hours + 1;
			
							if ((hoursnext % 24) != hoursnext) {
								hoursnext = hoursnext % 24;
							}
			
							minnext = minnext % 60;
						}
				
						datenow = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hoursnext, minnext, 00);
			
						if (datenow > datebegin && datenow <= dateend) {
							statuscells.snapshotItem(i).style.backgroundColor = STATUS_NEXT;
							statustext = STRING_STATUS_NEXT;
						}
					}
				}
			}
		}
		
		statuscells.snapshotItem(i).innerHTML = statustext;
	}
}

function initStatus() {	
	addStatusColumn();
	setDayIndex();
			
	var cells = document.evaluate("//td[@class='liste-startzeit']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
	for (var i = 0; i < cells.snapshotLength; i++) {			
			var newcell = document.createElement("td");
			newcell.setAttribute("class", "liste-header");
			newcell.style.textAlign = "center";
			newcell.style.backgroundColor = STATUS_NORMAL;
			var statustext = document.createTextNode("-");
			
			newcell.appendChild(statustext);
			cells.snapshotItem(i).parentNode.insertBefore(newcell, cells.snapshotItem(i));
	}
}

function addStatusColumn() {
	var cells = document.evaluate("//td[@class='header']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var newtd = document.createElement("td");
	newtd.setAttribute("class", "header");
	var tdtext = document.createTextNode("Status");
	newtd.appendChild(tdtext);
	
	cells.snapshotItem(0).parentNode.insertBefore(newtd, cells.snapshotItem(0));
}

function toggleMinimize() {	
	var cells = document.evaluate("//td[not(@class='header' or @class='ecke-links-oben')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var markedrows = document.evaluate("//tr[@marked]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	if (document.getElementById("option_toggleminimize").checked == true) {
		CHECK_IS_MINIMIZED = true;
		GM_setValue(SCRIPT_CONFIG_ID + "_IS_MINIMIZED", "true");
				
		for (var i = 0; i < cells.snapshotLength; i++) {
			cells.snapshotItem(i).style.display = "none";
		}
		
		for (var j = 0; j < markedrows.snapshotLength; j++) {
			var markedcells = markedrows.snapshotItem(j).getElementsByTagName("td");
				
			for (var k = 0; k < markedcells.length; k++) {
				markedcells[k].style.display = "table-cell";
			}
			
			var day = markedrows.snapshotItem(j).getAttribute('day');
						
			var rows = document.evaluate("//tr[@day='" + day + "']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
			rows.snapshotItem(0).getElementsByTagName('td')[0].style.display = "table-cell";
		}
	} else {
		CHECK_IS_MINIMIZED = false;
		GM_setValue(SCRIPT_CONFIG_ID + "_IS_MINIMIZED", "false");
		
		for (var i = 0; i < cells.snapshotLength; i++) {
			cells.snapshotItem(i).style.display = "table-cell";
		}
	}
	
	if (CHECK_IS_STATUS_DISABLED) toggleStatus();	
}

function toggleStatus() {
	var cells = document.evaluate("//td[@class='liste-header']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var headercell = document.evaluate("//td[@class='header']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (document.getElementById("option_togglestatus").checked == true) {
		CHECK_IS_STATUS_DISABLED = true;
		GM_setValue(SCRIPT_CONFIG_ID + "_IS_STATUS_DISABLED", "true");
		
		for (var i = 0; i < cells.snapshotLength; i++) {
			cells.snapshotItem(i).style.display = "none";
		}
				
		headercell.snapshotItem(0).style.display = "none";
	} else {
		CHECK_IS_STATUS_DISABLED = false;
		GM_setValue(SCRIPT_CONFIG_ID + "_IS_STATUS_DISABLED", "false");
				
		for (var i = 0; i < cells.snapshotLength; i++) {
			cells.snapshotItem(i).style.display = "table-cell";
		}
		
		headercell.snapshotItem(0).style.display = "table-cell";
		
		if (CHECK_IS_MINIMIZED) toggleMinimize();
	}
}

function initIntervals() {
	setInterval(updateStatus, STATUS_UPDATE_INTERVAL * 1000);
}

function run() {
	initRows();
	initOptions();
	initStatus();
	loadConfig();
	updateStatus();
	initIntervals();
}

run();

