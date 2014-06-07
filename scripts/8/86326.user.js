// ==UserScript==
// @name           New Extreme Redeemer Pro2
// @namespace      Vali202(fab_74 from talkprizes)
// @description    The script that does almost everything for you on a redemption! This is script is include in Extreme Redeemer pro version.
// @include        *ptzplace.lockerz.com*
// @include        *redeemquick*
// @include              *freecandy*
// @include 	http://tutudragon3.info/*
// @exclude            http://talkprizes.com/*
// @author         Vali202(fab_74 from talkprizes)
// @version        4.0
// @license        Extreme Redeemer
// @unwrap
// ==/UserScript==
var Email = "";
var Combination = "";
// Concept de Mode : US pour les us, CA pour les canadiens, toutes les autres valeurs : international.
var Mode = "international";
var FirstName = "";
var LastName = "";
var Address1 = "";
var Address2 = "";
var Phone = "";
var Phone1 = "321";
var Phone2 = "323";
var Phone3 = "2422";
var Country = "";
var State = "ON";
var Zip = "";
var City = "";
var Product1 = "";
var Product2 = "";
var Product3 = "";
var Product4 = "";
var Product5 = "";
var Product6 = "";
var Product7 = "";
var Product8 = "";
var Product9 = "";
var Product10 = "";
var Product11 = "";
var Product12 = "";
var Product13 = "";
var Product14 = "";
var Product15 = "";
var Product16 = "";
var Product17 = "";
var Product18 = "";
var Product19 = "";
var Product20 = "";

var username = "";
var pwd = "";
var Timer = 4;
var Running = true;
var boutique_fleches = true;
var select_random;
var table_products = true;
var cacher_wallpaper = true;

//encryptage, touche plus � rien

var version = '4.1.1';
function goToHref(link) {
    if (link == null) alert('Error in the script, please send a mail to fab@extreme-redeemer.com with this code : -1594');
    if (link.indexOf("http") < 0) {
        if (location.href.lastIndexOf('/') != -1) {
            var position = location.href.lastIndexOf('/') + 1;
            var url = location.href.substring(0, position);
            window.location = url + link;
        }
    } else {
        window.location = link;
    }
}
function fo() {
	test[i].focus();
}
var BOT_prizes=[
	Product1, 
	Product2, 
	Product3, 
	Product4, 
	Product5, 
	Product6, 
	Product7, 
	Product8, 
	Product9, 
	Product10,
	Product11,
	Product12,
	Product13,
	Product14,
	Product15,
	Product16,
	Product17,
	Product18,
	Product19,
	Product20
]; 
var linkcontainer = document.createElement("div");
var flashvars=[];
var prizenames=[];
var prizeurls=[];
var isprize=[];
function getElementsByClass(searchClass, domNode, tagName) {
    if (domNode == null) domNode = document;
    if (tagName == null) tagName = '*';
    if (searchClass == null) alert('Error in the script, please send a mail to fab@extreme-redeemer.com with this code : -1592');
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " " + searchClass + " ";
    var j = 0;
    for (i = 0; i < tags.length; i++) {
        var test = " " + tags[i].className + " ";
        if (test.indexOf(tcl) != -1) el[j++] = tags[i];
    }
    return el;
}
function $$(p_regexp, p_element, p_tagName) {
    p_element = p_element === undefined ? document : p_element;
    p_tagName = p_tagName === undefined ? '*' : p_tagName;
    if (p_regexp == null) alert('Error in the script, please send a mail to fab@extreme-redeemer.com with this code : -1593');
    var v_return = [];
    var v_inc = 0;
    for (var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) {
        if (p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) {
            v_return[v_inc] = p_element.getElementsByTagName(p_tagName).item(v_i);
            v_inc++;
        }
    }
    return v_return;
}
function getCountryCode(Country) {
	var class_si = document.getElementsByClassName('si');
	i = 0;
	for(i in class_si) {
		if(class_si[i].innerHTML == Country) {
			var onclick = class_si[i].parentNode.getAttribute('onclick');
			CountryCode = onclick.split('"');
			return CountryCode[1];
			break;
		}
	}
}

       var test = document.getElementsByTagName('input');
function autofill() {
	if(test[10]) {
		if(Mode == 'US') {
			var CountryCode = 'US';
		}
		else if(Mode == 'CA') {
			var CountryCode = 'CA';
		}
		else {
			var CountryCode = getCountryCode(Country);
		}
		if(Mode != 'US') {
			$$(/country/i, document, 'input')[0].value = CountryCode;
			$$(/countryclicker/i)[0].getElementsByTagName("SPAN")[0].innerHTML = Country;
			$$(/countrydetails/i, document, 'input')[0].value = Country;
		}
		window.location= "javascript: manipulateForm('"+CountryCode+"'); void(0);";	
		if(State != '' && State != null) {
			$$(/state/i, document, 'input')[0].value = State;
			if(Mode != "international") {
				$$(/statesclicker/i, document)[0].getElementsByTagName("SPAN")[0].innerHTML = State;
				$$(/stateDetails/i, document, 'input')[0].value = State;
			}
		}
		//phone
		if(Mode == 'international') {
			$$(/phonewhole/i, document, 'input')[0].value = Phone;
		}
		else {
			$$(/phoneone/i, document, 'input')[0].value = Phone1;
			$$(/phonetwo/i, document, 'input')[0].value = Phone2;
			$$(/phonethree/i, document, 'input')[0].value = Phone3;
		}
			var regexZip1 = new RegExp("top\: (318|319|320|321|322|323|324|325|326|327|328|329|330|331|332|333|334|335|336|337|338|339|340|341|342|343)px\;", "ig");
			var regexZip2 = new RegExp("left\: (460|461|462|463|464|465|466|467|468|469|470|471|472|473|474|475|476|477|478|479|480|481|482|483|484|485)px\;", "ig");
			var regexZip3 = new RegExp("width\: (109|110|111|112)px\;", "ig");
			var regexCity1 = new RegExp("top\: (318|319|320|321|322|323|324|325|326|327|328|329|330|331|332|333|334|335|336|337|338|339|340|341|342|343)px\;", "ig");
			var regexCity2 = new RegExp("left\: (73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98)px\;", "ig");
			var regexCity3 = new RegExp("width\: (220|221|222|223)px\;", "ig");
			var regexFN1 = new RegExp("top\: (179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204)px\;", "ig");
			var regexFN2 = new RegExp("left\: (73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98)px\;", "ig");
			var regexFN3 = new RegExp("width\: (220|221|222|223)px\;", "ig");
			var regexA11 = new RegExp("top\: (247|248|249|250|251|252|253|254|255|256|257|258|259|260|261|262|263|264|265|266|267|268|269|270|271|272)px\;", "ig");
			var regexA12 = new RegExp("left\: (73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98)px\;", "ig");
			var regexA13 = new RegExp("width\: (220|221|222|223)px\;", "ig");
			var regexA21 = new RegExp("top\: (247|248|249|250|251|252|253|254|255|256|257|258|259|260|261|262|263|264|265|266|267|268|269|270|271|272)px\;", "ig");
			var regexA22 = new RegExp("left\: (348|349|350|351|352|353|354|355|356|357|358|359|360|361|362|363|364|365|366|367|368|369|370|371|372|373)px\;", "ig");
			var regexA23 = new RegExp("width\: (220|221|222|223)px\;", "ig");
			var regexLN1 = new RegExp("top\: (179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204)px\;", "ig");
			var regexLN2 = new RegExp("left\: (348|349|350|351|352|353|354|355|356|357|358|359|360|361|362|363|364|365|366|367|368|369|370|371|372|373)px\;", "ig");
			var regexLN3 = new RegExp("width\: (220|221|222|223)px\;", "ig");
				for (i in test) {
					try {
						if (test[i].getAttribute('style').match(regexFN1) && test[i].getAttribute('style').match(regexFN2) && test[i].getAttribute('style').match(regexFN3)) //FIRST NAME
						{
							fo();
							test[i].value = FirstName;
						}
						if (test[i].getAttribute('style').match(regexLN1) && test[i].getAttribute('style').match(regexLN2) && test[i].getAttribute('style').match(regexLN3)) //LAST NAME
						{
							fo();
							test[i].value = LastName;
						}
						if (test[i].getAttribute('style').match(regexZip1) && test[i].getAttribute('style').match(regexZip2) && test[i].getAttribute('style').match(regexZip3)) //ZIP
						{
							fo();
							test[i].value = Zip;
						}
						if (test[i].getAttribute('style').match(regexCity1) && test[i].getAttribute('style').match(regexCity2) && test[i].getAttribute('style').match(regexCity3)) //CITY
						{
							fo();
							test[i].value = City;
						}
						if (test[i].getAttribute('style').match(regexA11) && test[i].getAttribute('style').match(regexA12) && test[i].getAttribute('style').match(regexA13)) // ADDRESS1
						{
							fo();
							test[i].value = Address1;
						}
						if (test[i].getAttribute('style').match(regexA21) && test[i].getAttribute('style').match(regexA22) && test[i].getAttribute('style').match(regexA23)) // ADDRESS2
						{
							fo();
							test[i].value = Address2;
						}
					} catch(e) {continue;}
				}
				document.getElementById('users_ans').value = eval(GM_getValue('reponse_maths'));
				document.getElementById('recaptcha_response_field').focus();
	}
}
function login() {
	if(document.getElementById('welcomePage')) {
                    document.forms[0].elements[0].focus();
                    document.forms[0].elements[0].value = Email;
                    document.forms[0].elements[1].focus();
                    document.forms[0].elements[1].value = Combination;
                    if (document.getElementById('recaptcha_response_field')) {
                        document.getElementById('recaptcha_response_field').focus();
                    }
	}
}

function selectBoutique2c(nom,valeur) {
	document.cookie = nom + "=" + escape(valeur)
}
function clearValuesPrize()
{
for each (var val in GM_listValues()) { 
	if(val.indexOf('prize')>-1)
	{
		GM_deleteValue(val);
	}
  }
  
}
var key = "7910805b01403f5fe5172b5e2b5c1b44";
function saveprizes() {
	clearValuesPrize();
	for(var i=0; i<prizenames.length; i++) {
		if(cacher_wallpaper) {
			if(prizenames[i].toLowerCase().indexOf('background') == -1 && isprize[i] == 'N') {
				GM_setValue('prize'+i,'<a href="'+prizeurls[i]+'">'+prizenames[i]+'</a>');
			}
		}
		else {
			if(isprize[i] == 'N') {
				GM_setValue('prize'+i,'<a href="'+prizeurls[i]+'">'+prizenames[i]+'</a>');
			}
		}
	}

} 
function chooseprize()
{
	var chosen=0;
	for(var i=0; i<BOT_prizes.length; i++) {
		if(BOT_prizes[i] != '' && BOT_prizes[i] != null) {
			for(var j=0; j<prizenames.length; j++) {
				if(prizenames[j].toLowerCase().match(BOT_prizes[i].toLowerCase()) && isprize[j]=='N') {
					unsafeWindow.location=prizeurls[j];		
					chosen=1;			
				}
				if(chosen==1) { 
					break;
				}
			}
		}
	}
}     /*function setCook2(nom,valeur,jours) {
        var expDate = new Date()
        expDate.setTime(expDate.getTime() + (jours * 24 * 3600 * 1000))
        document.cookie = nom + "=" + escape(valeur)
            + ";expires=" + expDate.toGMTString()
        }
/*function deletecok(nom) { setCook2(nom,"",-1) }
deletecok('autofill');*/
     function getCock(nom) {
        deb = document.cookie.indexOf(nom + "=")
        if (deb >= 0) {
            deb += nom.length + 1
            fin = document.cookie.indexOf(";",deb)
            if (fin < 0) fin = document.cookie.length
            return unescape(document.cookie.substring(deb,fin))
            }
        return ""
        }

function decodearray(arg1)
        {
            var l1 = 0;
            var l2 = "";
            var l3 = "";
            for(var i=0; i<arg1.length; i++)
            {
                l1 = parseInt(arg1[i], 16);
                l3 = l3 + String.fromCharCode(l1-9);
            }
            return l3;
        }
    
function decodestring(arg1)
    {
    	temparray2=[];
		var k=0;
		while(k<arg1.length)
		{
			temparray2.push(arg1.substring(k,k+2));							
			k++;k++;
		}
						
		return decodearray(temparray2);
    }

function cutstring(arg1,arg2)
    {						
		return arg1.substring(6,arg1.indexOf(arg2));
    }
    

function processprizes() {
	for(var i=0; i<flashvars.length; i++) {
		var temparray=[];
		var A,B,C,D,E,F,G,H;
		var sign,tempstring;
		temparray=flashvars[i].split('&');
		for(var j=0; j<temparray.length; j++) {
			sign=temparray[j].substring(0,2);
			tempstring=temparray[j].substring(2,temparray[j].length);
			if (sign=='A=')
			{
				tempstring=cutstring(tempstring,'k');
				A=decodestring(tempstring);
			}
			else if(sign=='B=')
			{
				B=decodestring(tempstring);	
			}
			else if(sign=='C=')
			{
				C=decodestring(tempstring);
			}
			else if(sign=='D=')
			{
				D=decodestring(tempstring);
			}
			else if(sign=='E=')
			{
				E=decodestring(tempstring);
			}
			else if(sign=='F=')
			{
				tempstring=cutstring(tempstring,'i');
				F=decodestring(tempstring);						
			}
			else if(sign=='G=')
			{
				tempstring=cutstring(tempstring,'j');
				G=decodestring(tempstring);						
			}
			else if(sign=='H=')
			{
				tempstring=cutstring(tempstring,'n');
				H=decodestring(tempstring);						
			}
			
		}
		prizenames.push(D);
		prizeurls.push('http://'+window.location.hostname+'/'+E+'.php?p='+A+'&pn='+D.replace(/\ /g,'+')+'&b='+F+'&bn='+C);
		isprize.push(H);
	}
	saveprizes();
	chooseprize();
	WriteTable();		
} 

function WriteTableElectro() {
	document.getElementById('products').setAttribute('style', 'display:none;');
	var templinks='';
	var templinks2='';
	var templinks3='';
	var templinks4='';
	var templinks5='';	
	for each (var val in GM_listValues()) {
		if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('mac') > -1) {
			templinks=templinks+GM_getValue(val) + ' <br /> <br />';
		}
		else if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('touch') > -1) {
			templinks2=templinks2+GM_getValue(val) + ' <br /> <br />';
		}
		else if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('nano') > -1) {
			templinks3=templinks3+GM_getValue(val) + ' <br /> <br />';
		}
		else if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('shuffle') > -1) {
			templinks4=templinks4+GM_getValue(val) + ' <br /> <br />';
		}
		else if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('shuffle') == -1 && GM_getValue(val).toLowerCase().indexOf('mac') == -1 && GM_getValue(val).toLowerCase().indexOf('touch') == -1 && GM_getValue(val).toLowerCase().indexOf('nano') == -1) {
			templinks5=templinks5+GM_getValue(val) + ' <br /> <br />';
		}
	} 
	linkcontainer.innerHTML = '<center><div style="position:absolute; margin-top : 10px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> MACS <p>' + templinks + '</p></div></center><br />' +
				  '<center><div style="position:absolute; margin-top : 10px; margin-left: 300px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> IPODS TOUCH <p>' + templinks2 + '</p></div></center><br />' +
				  '<center><div style="position:absolute; margin-top : 10px; margin-left: 515px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> IPODS NANO <p>' + templinks3 + '</p></div></center><br />' +
				  '<center><div style="position:absolute; margin-top : 10px; margin-left: 750px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> IPODS SHUFFLE <p>' + templinks4 + '</p></div></center><br />' +		
				  '<center><div style="position:absolute; margin-top : 10px; margin-left: 1000px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> OTHER <p>' + templinks5 + '</p></div></center><br />';
	
	document.body.insertBefore(linkcontainer, document.body.firstChild);	
}
function WriteTableBrands() {
	document.getElementById('products').setAttribute('style', 'display:none;');
	var templinks='';
	var templinks2='';
	var templinks3='';	
	for each (var val in GM_listValues()) {
		if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('paypal') > -1) {
			templinks=templinks+GM_getValue(val) + ' <br /> <br />';
		}
		else if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('best') > -1) {
			templinks2=templinks2+GM_getValue(val) + ' <br /> <br />';
		}
		else if(val.indexOf('prize')>-1 && GM_getValue(val).toLowerCase().indexOf('paypal') == -1 && GM_getValue(val).toLowerCase().indexOf('best') == -1) {
			templinks3=templinks3+GM_getValue(val) + ' <br /> <br />';
		}

	} 
	linkcontainer.innerHTML = '<center><div style="position:absolute; margin-top : 10px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> PAYPAL <p>' + templinks + '</p></div></center><br />' +
				  '<center><div style="position:absolute; margin-top : 10px; margin-left: 300px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> BEST BUY <p>' + templinks2 + '</p></div></center><br />' +
				  '<center><div style="position:absolute; margin-top : 10px; margin-left: 515px; border-color:red; border-style:solid; z-index:100; opacity: 0.7; -moz-user-select: none; left:0; top:50%; background-color: #FFFFFF;"> OTHER <p>' + templinks3 + '</p></div></center><br />' +
	document.body.insertBefore(linkcontainer, document.body.firstChild);	
}
function catchvars(){
	var emb=document.embeds;
	for(var i=0;i<emb.length;i++)
	{
		flashvars.push(emb[i].getAttribute('flashvars'));
	}
	var obj=document.getElementsByTagName('object')
	for(var i=0;i<obj.length;i++)
	{
	
		if(obj[i].type!="application/x-shockwave-flash"){
		continue
		};
		
		for(var j=0;j<obj[i].childNodes.length;j++)
		{
			var param=obj[i].childNodes[j];
			if(param.name!='flashvars'){continue};
			flashvars.push(param.getAttribute('value'));
		}
	}
	processprizes();	
	}

function catchvars2()
{
var scr=document.getElementsByTagName('script');
var tempstring;
	for(var i=0; i<scr.length; i++)
	{
	var scra=scr[i];
		if(scra.innerHTML.indexOf('flashvars')>-1)
		{
			tempstring=scra.innerHTML;
			tempstring=tempstring.replace(/\s/g,'');
			tempstring=tempstring.substring(tempstring.indexOf('flashvars.A'),tempstring.length);
			tempstring=tempstring.substring(0,tempstring.indexOf('swfobject.embedSWF'));
			tempstring=tempstring.replace(/\"/g,'');
			tempstring=tempstring.replace(/\;/g,'&');
			tempstring=tempstring.replace(/flashvars./gi, '')
			flashvars.push(tempstring);					
		}
	}
	
	processprizes();

}
function storeBoutiques() {
	if(document.getElementsByClassName('boutiqueFrame')[0]) {
		var spans = document.getElementsByTagName('span');
		var i = 0;
		for(i in spans) {
			if(spans[i].innerHTML.match(/electronics/i)) {
				var parent_boutique = spans[i].parentNode;
				var lien_boutique = parent_boutique.getAttribute('href');
				GM_setValue('boutiques_electro', lien_boutique);
			}
			if(spans[i].innerHTML.match(/brands/i)) {
				var parent_boutique = spans[i].parentNode;
				var lien_boutique = parent_boutique.getAttribute('href');
				GM_setValue('boutiques_brands', lien_boutique);	
			}
		}
	}
}
	if(GM_getValue('autofill') === undefined || GM_getValue('autofill') == true) {
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://extreme-redeemer.com/newversion/software/check_login_js.php?statut=yes&key='+key+'&user='+username+'&password='+pwd,
		onload: function(response) {
				if(response.responseText == "43fa55b5ed75104cf9f8529777845033") {
					GM_setValue('autofill', 'false');
				}
				else {
					GM_setValue('autofill', 'true');
				}
			}
		});			
	}
function bin2hex (s){
    var i, f = 0, a = []; 
    s += '';    f = s.length;  
    for (i = 0; i<f; i++) {
        a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");
    }    
    return a.join('');
}
String.prototype.reverse = function(){
	splitext = this.split("");
	revertext = splitext.reverse();
	reversed = revertext.join("");
	return reversed;
}
function loginTimeout(i) {
	if(test[3] && !test[10]) {
	    onche = "<center><div style='color:red;text-align:right;'>Login in "+Math.round(i*100)/100+" seconds...</div></center>";
	    document.getElementById('errBox').innerHTML = onche;
	    i=i-0.1;
	    if (i <= 0) {
		onche = "<center><div style='color:green;text-align:right;text-decoration:blink;'>Login now!</div></center>";
		document.getElementById('errBox').innerHTML = onche;
		window.clearTimeout(lT);
	    }
	    lT=window.setTimeout(function () { loginTimeout(i) },100);
	}
}
function KeyCheck(e) {
	if (e.keyCode == 13) {
		if (getElementsByClass('btnRedeem')[0]) {
			if (document.getElementById('shippingForm')) {
				if(GM_getValue('autofill') == 'true' || GM_getValue('autofill') == '') {
					document.forms[0].submit();
				}
				else {
					window.location = "javascript:submitForm(); void(0)";
				}
			}
			else if (document.getElementById('maths_problem')){
				GM_setValue('reponse_maths', document.getElementById('contenu_case_math').value);
				GM_setValue('maths', 'correct');
				goToHref(document.getElementsByClassName('btnRedeem')[0].href);
			}
		}
		else if (test[0]) {
			window.location = 'javascript:doLogin();void(0)';
		}
	}
	else if(e.keyCode == 39) {
		if(boutique_fleches) {
			goToHref(GM_getValue('boutiques_electro')); // where the fuck is search 
		}
	}
	else if(e.keyCode == 37) {
		if(boutique_fleches) {
			goToHref(GM_getValue('boutiques_brands'));
		}
	}
}
var anus = 's';
var eoin12 = 'b';
var oiewnvv = 'r';
var penis = 'a';
var pussy = 'n';
var omfgwtfass = 'd';
if(Running) {
	loginTimeout(Timer); 
}
var print = document.createElement("div");
if(document.getElementById('welcomePage')) {
	window.setTimeout(function() {
		if(GM_getValue('autofill') == 'false') { 	
			GM_setValue('timestart', new Date().getTime().toString());
			login();
			print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:#aeaeae;"><span style="opacity:1.0;filter:alpha(opacity=100)">Extreme Redeemer  PRO ' + version + ' is running. Get access to <a href="http://extreme-redeemer.com/support/client.php" target="_blank">live support</a>!</span></div>'
			document.body.insertBefore(print, document.body.firstChild);
		}
		else {
			alert('Leaked version detected !');
			print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:red;"><span style="opacity:1.0;filter:alpha(opacity=100)">Leaked version detected.</span></div>'
			document.body.insertBefore(print, document.body.firstChild);
		}
	}, 500);
}
if(test.length > 9) {
	if(GM_getValue('autofill') == 'true') {
		alert('Leaked version detected!');
		print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:red;"><span style="opacity:1.0;filter:alpha(opacity=100)">Leaked version detected.</span></div>'
		document.body.insertBefore(print, document.body.firstChild);
	}
	else {
		autofill();
	}
}
if(document.getElementById('products')) {
	if(GM_getValue('autofill') == 'false') {
		if(select_random) {
			try {
				catchvars2();
			}
			catch(e) {}
		}
		else {
			try {
				catchvars2();
			}
			catch(e) {}
		}
		if(table_products) {
			if(document.getElementsByClassName('bcInner')[0].innerHTML.match(/electronics/i)) {
				try{WriteTableElectro();}catch(e){}
			}
			else {
				try{WriteTableBrands();}catch(e){}
			}				
		}
	}
	else {
		alert('Leaked version detected!');
		print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:red;"><span style="opacity:1.0;filter:alpha(opacity=100)">Leaked version detected.</span></div>'
		document.body.insertBefore(print, document.body.firstChild);
	}
}
if (document.getElementsByClassName('allset')[0] || document.getElementsByClassName('allSet')[0]) {
	var timestop = (new Date()).getTime();
	var timestart = GM_getValue('timestart');
	var timemilli = timestop - timestart;
	var timemilli = timemilli.toString();
	var milli = timemilli.substring(timemilli.length-3,timemilli.length);
	var secondes = timemilli.substring(0,timemilli.length-3);
	var oldCode = document.getElementsByClassName('completeFields')[0].innerHTML;
	document.getElementsByClassName('redNote')[0].innerHTML = '<div style="background-color:#fffac1;font-family:Tahoma;font-size:12px;border:2px solid #fff9b4;"> <center>Extreme Redeemer Pro, version '+version+' is running.<br><b>Congratulations for your '+document.getElementsByClassName("bcInner")[1].innerHTML+'!</b><br><br><span style="font-size:14px;font-family:arial;"><b>You redeemed your prize in '+secondes+'.'+milli+' seconds!</b></span></center></div>'
  	if(window.location.match(/ptzplace\.lockerz\.com/)) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://extreme-redeemer.com/statistics/insert.php?prize='+bin2hex(document.getElementsByClassName("bcInner")[1].innerHTML)+'&time='+secondes+'.'+milli,
			onload: function(response) {
				if(response.responseText == 'ok') {
					document.getElementsByClassName('shipNote')[0].innerHTML = 'Your redeem performance has been recorded in the database.';
				}
				else {
					document.getElementsByClassName('shipNote')[0].innerHTML = 'Failed to record performance in database.';
				}
			}
		});
	}			
}
if(document.getElementById('maths_problem')) {
	var input_maths = document.createElement('div');
	document.getElementsByClassName('pdPTZValue')[0].appendChild(input_maths);
	input_maths.innerHTML = "<center><label style='color:red;'>Solve the problem or just write the question and press enter !</label><br /><input id='contenu_case_math' type='text'/>";
      	document.getElementById('contenu_case_math').focus();
}
if(document.getElementById('boutiques')) {
	if(GM_getValue('autofill') == 'false') {
		print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:#aeaeae;"><span style="opacity:1.0;filter:alpha(opacity=100)">Extreme Redeemer  PRO ' + version + ' is running. Get access to <a href="http://extreme-redeemer.com/support/client.php" target="_blank">live support</a>!</span></div>'
		document.body.insertBefore(print, document.body.firstChild);
		if(boutique_fleches) {
			if(GM_getValue('autofill') == 'true') {
				alert('Leaked version detected!');
				print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:red;"><span style="opacity:1.0;filter:alpha(opacity=100)">Leaked version detected.</span></div>'
				document.body.insertBefore(print, document.body.firstChild);
			}
			else { 
				storeBoutiques(); 
			}
		}
	}
}
window.setTimeout(function() {
	if(GM_getValue('autofill') == 'false') {
		print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:#aeaeae;"><span style="opacity:1.0;filter:alpha(opacity=100)">Extreme Redeemer  PRO ' + version + ' is running. Get access to <a href="http://extreme-redeemer.com/support/client.php" target="_blank">live support</a>!</span></div>'
		document.body.insertBefore(print, document.body.firstChild);
	}
	else if(GM_getValue('autofill') == 'true') {
		alert('Leaked version detected!');
		print.innerHTML = '<div style="clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:red;"><span style="opacity:1.0;filter:alpha(opacity=100)">Leaked version detected.</span></div>'
		document.body.insertBefore(print, document.body.firstChild);
	}
}, 600);
window.addEventListener('keydown', KeyCheck, true);