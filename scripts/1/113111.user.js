// ==UserScript==
// @name           philips show product availaility
// @namespace      me
// @include        http://www.support.philips.com/support/catalog/products.jsp*
// @include        http://www.support.philips.com/support/catalog/worldproducts.jsp*
// @include		   https://philips_be.infotip-rts.com/Issue.xhtml*
// ==/UserScript==

/*global document, DOMParser*/
 function parseHTMLFromString(markup) {

	var
		  doc = document.implementation.createHTMLDocument("")
		, doc_elt = doc.documentElement
		, first_elt
	;
	doc_elt.innerHTML = markup;
	first_elt = doc_elt.firstElementChild;
	if ( // are we dealing with an entire document or a fragment?
		   doc_elt.childElementCount === 1
		&& first_elt.localName.toLowerCase() === "html"
	) {
		doc.replaceChild(first_elt, doc_elt);
	}
	return doc;

};

// function testProduits(listeProduits){
	// for(var i = 0; i < listeProduits.length; i++)
	// {
		// var produit = listeProduits[i];
		// GM_xmlhttpRequest({
		  // method: "GET",
		  // url: encodeURI("https://philips_be.infotip-rts.com/Home.xhtml?Sid=:00-44886-B2ED-9F53-32C82-0004C17D&Action=Home&ChgLg=fr&field_Orders_ProductId="+listeProduits[i]),
		  // data: "field_Orders_ProductId="+listeProduits[i],
		  // headers: {
			// "Content-Type": "application/x-www-form-urlencoded",
			// "Referer" :	"https://philips_be.infotip-rts.com/Home.xhtml?Sid=:00-44886-80F0-9F4B-645A6-000075EB&Action=Home",
			// "Cookie" : "sifrFetch=true; s_cc=true; s_pv=SP%3Arepair%3A@htmlpage@; s_sq=%5B%5BB%5D%5D; s_ppv=100"
		  // },
		  // onload: testCallback.bind( { idProduit:listeProduits[i] } )
		// });
	// }
// }

function testCallback( response ) {
	var balise = document.createElement("div");
	balise.setAttribute("class","col4");
	balise.setAttribute("style","text-align:right");
	var p = document.createElement("p");
	var validite="";
	
	if (response.responseText.indexOf(yes) > -1 || response.responseText.indexOf("sur le défaut rencontré") > -1) {
		p.setAttribute("style","background-color:green;color:white");
		validite = "oui";
		MyGM_log("==============================================\nProduit : "+this.idProduit+" marche!\n==============================================");
	}
	if(response.responseText.indexOf(no) > -1 ){
		p.setAttribute("style", "background-color:red;color:white");
		validite = "non";
		MyGM_log("-----------------------------------------------"+this.idProduit+" marche pas --------------------------------");
	}
	if(response.responseText.indexOf(notFound) > -1 ){
		p.setAttribute("style", "background-color:orange;color:white");
		validite = "non trouvé";
		MyGM_log("-----------------------------------------------"+this.idProduit+" marche pas --------------------------------");
	}	
	
	if(validite == ""){
			MyGM_log(response.responseText);
			p.setAttribute("style", "background-color:blue;color:white");
			validite = "nc";
	}
	p.textContent = validite;	
	balise.appendChild(p);
	this.parentNode.appendChild(balise);
}

//Setts logging and command menu
var log = false;
var defaultLanguage = "fr";

function MyGM_log(text){};
if(!log){
	MyGM_log = function () {}
}else{
	MyGM_log = GM_log;
}

MyGM_log("Début");

GM_registerMenuCommand("Langue : "+GM_getValue("language", defaultLanguage), function(){});
GM_registerMenuCommand("France", function(){ GM_setValue("language", "fr");});
GM_registerMenuCommand("Nedtherlands", function(){ GM_setValue("language", "nl");});

var langue = GM_getValue("language", defaultLanguage);

//Fix proof of purchase upload bug 
if(document.URL.indexOf("https://philips_be.infotip-rts.com/Issue.xhtml") > -1 && document.URL.indexOf("Action=NewOrder") > -1){
	document.body.innerHTML = document.body.innerHTML.replace("javascript:Uploader(frm.field_Others_ReceiptName.value)","javascript:Uploader('')");
	throw new Error("End of script");
}

if(langue == "nl"){
	var yes = "we will send you a free of charge replacement";
	var no = "This product is not available for booking as a faulty exchange";
	var notFound = '<div class="error"><div>Model not found.';
	var languageParameters = "Cid=en&LgId=en";
}
if(langue == "fr"){
	var yes = "vous envoyer gratuitement";
	var no = "pas disponible pour réservation comme";
	var notFound = '<div class="error">';
	var languageParameters = "Cid=FR&LgId=fr";
}

GM_xmlhttpRequest({
		method: "GET",
		url : "https://philips_be.infotip-rts.com/Home.exe?"+languageParameters,
		 onload: function(response){
				var responseXML = parseHTMLFromString(response.responseText);
				var sidLine = responseXML.getElementById("frm").getAttribute("action");
				var sid = sidLine.substring(sidLine.indexOf("=") + 1, sidLine.lastIndexOf("&"));
				launchVerification(sid);
			}
});


function launchVerification(sid){
	var divDecalage;
	var xpathQuery;
	if(document.URL.indexOf("worldproducts.jsp") != -1){
		//world
		divDecalage = 7;
		xpathQuery = '//*[@class="rrow-world"]';
	}else{
		//france
		divDecalage = 5;
		xpathQuery = '//*[@class="rrow"]';
	}
	
	var produits = document.evaluate(xpathQuery,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	// var balise = document.createElement("div");
	// balise.setAttribute("class","col5");
	// var p = document.createElement("p");
	// p.textContent = "Validité";	
	// balise.appendChild(p);
	// produits.snapshotItem(i).parentNode.childNodes[3].appendChild(balise);
	for ( var i=0 ; i < produits.snapshotLength; i++ )
	{
		var id = produits.snapshotItem(i).childNodes[divDecalage].textContent;
		var parentNode = produits.snapshotItem(i);
		
		GM_xmlhttpRequest({
		  method: "GET",
		  url: "https://philips_be.infotip-rts.com/Issue.xhtml?Sid="+sid+"&field_Orders_ProductId="+id+"&Action=NewOrder&OrderId=&Producer=philips&allform=90&backform=&cmd=2&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_Adr21_City=&field_Adr21_CountryCode=&field_Adr21_Email=&field_Adr21_Fax=&field_Adr21_Firstline=&field_Adr21_Person=&field_Adr21_Phone=&field_Adr21_Postcode=&field_Adr21_Secondline=&field_Adr21_Street=&field_Adr21_Streetnumber=&field_Adr30_City=&field_Adr30_CountryCode=&field_Adr30_Firstline=&field_Adr30_Postcode=&field_Adr30_Secondline=&field_Adr30_Street=&field_Adr30_Streetnumber=&field_Adr31_City=&field_Adr31_CountryCode=NL&field_Adr31_Firstline=&field_Adr31_Postcode=&field_Adr31_Secondline=&field_Adr31_Street=&field_Adr31_Streetnumber=&field_Adr43_City=&field_Adr43_CountryCode=NL&field_Adr43_Firstline=&field_Adr43_Postcode=&field_Adr43_Secondline=&field_Adr43_Street=&field_Adr43_Streetnumber=&field_Error_CaseCondition=&field_Error_CaseConditionExtended=&field_Error_ErrorDescription=&field_Orders_Brand=&field_Orders_CountryId=NL&field_Orders_CreatorLoginName=Anonymous&field_Orders_CreatorName=Anonymous%20User&field_Orders_CreatorRole=Anonymous&field_Orders_Currency=EUR&field_Orders_HandlingType=SELECT&field_Orders_Interface=.RTS-Philips_BeNeLux&field_Orders_NoSerialNumber=&field_Orders_OrderId=&field_Orders_OrderState=10&field_Orders_PickupLoginName=&field_Orders_PreclarifyFlag=0&field_Orders_Producer=philips&field_Orders_ProductName=&field_Orders_ProductSubcat=&field_Orders_RepairFeeLimit=&field_Orders_SerialNumber=&field_Orders_SubmitGroup=consumer&field_Orders_TypeOfAccounting=&field_Orders_TypeOfOrder=guarantee&field_Others_DiffPickup=&field_Others_DiffReturn=&field_Others_ReceiptName=&field_Pickup_AccessoriesExtended=&field_Pickup_PackagingWeight=&field_Pickup_TypeOfPackaging=&field_RtsIntern_CheckPlz=&field_RtsIntern_CheckStreet=&form.button.next=next&itsdef=%5CRtsTexte%5Cxen%5CRTS_Philips_BeNeLux%5CWizard%5CXX%5CAnonymous%5CwId%5Cxphilips_Pickup.wid&itsform=20&nd=&nextform=21&savebutton=&subfield_Orders_SalesDate_day=12&subfield_Orders_SalesDate_month=12&subfield_Orders_SalesDate_year=2010",
		  //url: "https://philips_be.infotip-rts.com/Issue.xhtml?Sid="+sid+"&field_Orders_ProductId="+id+"&lndid=fr&Action=NewOrder&OrderId=&Producer=philips&allform=90&backform=&cmd=2&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_=&field_Adr21_City=&field_Adr21_CountryCode=FR&field_Adr21_Email=&field_Adr21_Fax=&field_Adr21_Firstline=&field_Adr21_Person=&field_Adr21_Phone=&field_Adr21_Postcode=&field_Adr21_Secondline=&field_Adr21_Street=&field_Adr21_Streetnumber=&field_Adr30_City=&field_Adr30_CountryCode=&field_Adr30_Firstline=&field_Adr30_Postcode=&field_Adr30_Secondline=&field_Adr30_Street=&field_Adr30_Streetnumber=&field_Adr31_City=&field_Adr31_CountryCode=FR&field_Adr31_Firstline=&field_Adr31_Postcode=&field_Adr31_Secondline=&field_Adr31_Street=&field_Adr31_Streetnumber=&field_Adr43_City=&field_Adr43_CountryCode=FR&field_Adr43_Firstline=&field_Adr43_Postcode=&field_Adr43_Secondline=&field_Adr43_Street=&field_Adr43_Streetnumber=&field_Error_CaseCondition=&field_Error_CaseConditionExtended=&field_Error_ErrorDescription=&field_Orders_Brand=&field_Orders_CountryId=FR&field_Orders_CreatorLoginName=Anonymous&field_Orders_CreatorName=Anonymous%20User&field_Orders_CreatorRole=Anonymous&field_Orders_Currency=EUR&field_Orders_HandlingType=SELECT&field_Orders_Interface=.RTS-Philips_BeNeLux&field_Orders_NoSerialNumber=0&field_Orders_OrderId=&field_Orders_OrderState=10&field_Orders_PickupLoginName=&field_Orders_PreclarifyFlag=0&field_Orders_Producer=philips&field_Orders_ProductName=&field_Orders_ProductSubcat=&field_Orders_RepairFeeLimit=&field_Orders_SerialNumber=&field_Orders_SubmitGroup=consumer&field_Orders_TypeOfAccounting=&field_Orders_TypeOfOrder=guarantee&field_Others_DiffPickup=0&field_Others_DiffReturn=0&field_Others_ReceiptName=&field_Pickup_AccessoriesExtended=&field_Pickup_PackagingWeight=&field_Pickup_TypeOfPackaging=&field_RtsIntern_CheckPlz=&field_RtsIntern_CheckStreet=&form.button.next=Continuer&itsdef=%5CRtsTexte%5Cxfr%5CRTS_Philips_BeNeLux%5CWizard%5CXX%5CAnonymous%5CwId%5Cxphilips_Pickup.wid&itsform=20&nd=&nextform=21&savebutton=&subfield_Orders_SalesDate_day=15&subfield_Orders_SalesDate_month=01&subfield_Orders_SalesDate_year=2011",
		  onload: testCallback.bind( { idProduit:id,parentNode:parentNode } )
		});
	}
}