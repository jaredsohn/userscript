// ==UserScript==
// @name           NeoAVG
// @description    Neobux referrals manager
// @include        http://www.neobux.com/?u=c&s=r*
// @include        https://www.neobux.com/?u=c&s=r*
// @author 		   Bryan90001
// @version        1.0
// ==/UserScript==

/*
This script will work only for Neobux members with at least the Golden pack since it analyzes the 15days graph of each rented
referral looking for his avg. If the avg is under a specified value (myavg) near the referral's name will appear an "x" in order to show you he's a bad referral.
You can specify (mynumdays) the number of days before a referral isn't analysed, so you can give him a chance to become active in those initial days.

I decided to look to the last 15days avg because it's a more realistic and efficient way to find bad referrals because there are some referrals that seem to have a good global avg but in the reality are wasting your money.

NB.
This script won't work properly with other Greasemonkey script for Neobux so please disable them while using mine. In the future maybe I will modify this script to work together.
I release this script for free but I spent a lot of time working on it. So if you use it and find it useful please think about making
a donation to reward my efforts and maybe I will be able to buy an Ultimate membership. :)

So enjoy this script! By Bryan90001
*/

	
CreateMenuOptions();

if(GM_getValue('revision', 0) < 6) {
	GM_setValue('myavg', '0.8');
	GM_setValue('mynumdays', '4');
	alert("Your settings were set to their default values.");
}
GM_setValue('revision', '9');

var revision = GM_getValue('revision', 0);
var myavg = GM_getValue('myavg', 0.8); // the upper limit for the 'bad' refs
var mynumdays = GM_getValue('mynumdays', 4); // the upper limit for the 'okay' refs


//Menù
function CreateMenuOptions() {

  GM_registerMenuCommand('NeoAVG: Minimum avg in the last 15days', s_myavg);
  GM_registerMenuCommand('NeoAVG: Number of days to give as trial', s_mynumdays);

  function s_myavg() {
  	var tmp = prompt("Minimum avg:", myavg);
    	if(tmp) GM_setValue('myavg', tmp);
  }

  function s_mynumdays() {
  	var tmp = prompt("Number of days:", mynumdays);
    	if(tmp) GM_setValue('mynumdays', tmp);
  }
}

//FUNCTION GETELEMENTSBYCLASSNAME
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};
//FUNCTION GETELEMENTSBYVALUE
function getElementsByValue(value, tag, node) {
	var values = new Array();
	if (tag == null)
		tag = "*";
	if (node == null)
		node = document;
	var search = node.getElementsByTagName(tag);
	var pat = new RegExp(value, "i");
	for (var i=0; i<search.length; i++) {
		if (pat.test(search[i].value))
			values.push(search[i]);
	}
	return values;
}
//FUNCTION NUM DAYS SINCE
function NumDaysSince (tmp) {
	var MSPD = 86400000;
	var Today = new Date();
	var Yesterday = new Date()
	Yesterday.setDate(Today.getDate() - 1);
	var tmpDate = tmp.split(' ');

	if(tmpDate.length>1) {
		var tt = tmpDate[1].split(":");
	} else {
		var tt = new Array(2); // default to midnight
		tt[0] = "00";
		tt[1] = "00";
	}

	if(tmpDate[0].match("Today") || tmpDate[0].match("Hoje")) {
  		var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
	} else if(tmpDate[0].match("Yesterday") || tmpDate[0].match("Ontem")) {
  		var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
	} else {
  		var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[1] : ""));
	}

	var numDays = Math.floor((Today - Since) / MSPD);

	return numDays;
}

	
function BadRefs () {
	var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
			  	document,
			    	null,
			   	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			   	null).snapshotItem(0);


var rows = mainTable.childNodes;

	var col_NUM = 0;
	var col_NAME = 3;
	var col_AVG = 8;
	var col_CLICKS = 7;	
	var col_LAST = 6;
	var col_SINCE = 4;	

var x = Math.floor(rows.length / 3)*3;

var abc = 0;

for(var n=1; n<x; n=n+3) {
abc = abc + 1;

  var i = n;
  var refNo = ((n - 1) / 3) + 1;

  
//get the "age
	var tmpDate = rows[i].childNodes[col_SINCE].innerHTML.replace('&nbsp;','');
	var numDays = Math.max(1,NumDaysSince(tmpDate));

//get the number
	//var number = rows[i].childNodes[col_NUM].innerHTML.replace('&nbsp;','');

//get the code and the number
	var source = rows[i].getElementsByClassName("im")[0];
	var code = source.getAttribute('onclick');
	code = code.split("\(\'")[1];
	code = code.split("\'")[0];					 
	var url = "https://www.neobux.com/refstat/?refu="+code;	
	var num = source.getAttribute('onclick');
	num = num.split("\',")[1];
	number = num.split("\)")[0];
//check clicks
	var clicks = rows[i].childNodes[col_CLICKS].innerHTML.replace('&nbsp;','');
	if (clicks==0) {if(numDays>mynumdays){handle(0,0,number);} else {normal(number);}
	}
		
//get the name
	var name = rows[i].childNodes[col_NAME].innerHTML.replace('&nbsp;','');
	var name = name.substring(1);
	

	GM_xmlhttpRequest({
    method: 'GET',
    url: url,
	name : name,
	number : number,
	numDays : numDays,
	myavg : myavg,
	mynumdays : mynumdays,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
onload: function(r) {

var holder = document.createElement('div');
holder.innerHTML = r.responseText;

var clicks_totali=0;


var varss=atob(r.responseText.match(/wz\(\'(.+?)\'/)[1]);
var	vars=atob(varss.match(/setDataXML\("(.+?)"/)[1]);												
nvars=vars.split("<dataset seriesName");
nvars=nvars[1].split("<set value='");


for(a=0;a<nvars.length;a++){
	if(a>0){
		dato=nvars[a].split("'");
		value=dato[0];
		clicks_totali+=parseInt(value);
	}
}
if (this.numDays<15) {
var avg=Math.round((clicks_totali*1000)/this.numDays)/1000;
} else {
var avg=Math.round((clicks_totali*1000)/15)/1000;
}

if (avg<myavg) {if(this.numDays>mynumdays){
	handle(avg,this.name,this.number);
	}}
 else {normal(this.number);}
 }
 
    });

}//close for
}//close BadRefs 


//FUNZIONE HANDLE
function handle(avg,name,number) {
	
		
//http://img223.imageshack.us/img223/1048/92557129.png link to ok icon
//http://img261.imageshack.us/img261/5686/errorn.png link to error icon
var aa = "fgidu_"+number;
var butHTML= document.createElement("img");
butHTML.setAttribute("id",number);
butHTML.setAttribute("width","16");
butHTML.setAttribute("height","16");
butHTML.setAttribute("border","0");
butHTML.setAttribute("src","http://img261.imageshack.us/img261/5686/errorn.png");
var highlight = document.getElementById(aa).appendChild(butHTML);
}

function normal (number) {
var aa = "fgidu_"+number;
var butHTML= document.createElement("img");
butHTML.setAttribute("id",number);
butHTML.setAttribute("width","16");
butHTML.setAttribute("height","16");
butHTML.setAttribute("border","0");
butHTML.setAttribute("src","http://img223.imageshack.us/img223/1048/92557129.png");
var highlight = document.getElementById(aa).appendChild(butHTML);
	}


var divHTML = document.createElement("div");
divHTML.setAttribute("id","mydiv");
document.getElementById('jj').appendChild(divHTML);
function donate() {
var donCode = "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='encrypted' value='-----BEGIN PKCS7-----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-----END PKCS7-----'><input type='image' src='https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypal.com/it_IT/i/scr/pixel.gif' width='1' height='1'></form> ";
	
	var donDiv = document.createElement("DIV");
	donDiv.style.textAlign = "center";
	donDiv.innerHTML = donCode;
	document.getElementById('jj').appendChild(donDiv);
}
donate();
BadRefs();
