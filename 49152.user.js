// ==UserScript==
// @name           Libro Agencia ISBN España a LibraryThing
// @namespace      www.mcu.es
// @description    Libro Agencia ISBN España a LibraryThing
// @include        http://www.mcu.es/webISBN/tituloDetalle.do*
// ==/UserScript==

	//Check updated.
    CheckUpdated();

	var form1 = document.getElementsByClassName('fichaISBN')[0];
	if (form1) {
		var button =	document.createElement('input');
				button.setAttribute('type', 'button');
				button.setAttribute('value', 'Export to LibraryThing');
				button.setAttribute('style', 'float: right');
				button.addEventListener('click', function () {GetLTResponse(GetRandomIDFromResponse);}, false);

		form1.parentNode.insertBefore(button, form1);
	}
	
	var ISBN13 = "";
	var ISBN10 = "";
	var booktitle = "";
	var bookauthor1 = "";
	var bookauthor2 = "";
	var bookauthor3 = "";
	var bookauthor4 = "";
	var booktranslator = "";
	var bookOriginallanguage = "Castellano"; //default
	var bookSecondaryLang = "";
	var fechaedicion = "";
	var fechaimpresion = "";
	var publicacion = "";
	var descripcion = ""
	var encuadernacion = "";
	var coleccion = "";
	var FullDescription="";
	var Authors=new Array(10);
	var entrydate=new String();
	var table1;
	



function GetRandomIDFromResponse(response) {
	button.setAttribute('disabled', 'true');

  	IndexRandom = response.indexOf('"LT_GetRandomID" value="');
	sLT_GetRandomID = response.substring(IndexRandom+24,IndexRandom+37);

	// get book info.
	GetMCUData();
	
	// post book info to LT.
	PostMCUData();
}
 

function GetMCUData() {
	var spam1 = form1.getElementsByClassName('cabTitulo')[0];
	ISBN13 = spam1.childNodes[1].textContent;

	var spam2 = form1.getElementsByClassName('cabInfAd')[0];
	ISBN10 = "";

	if (spam2) {
		if (spam2.childNodes.length == 5) {
			ISBN10 = spam2.childNodes[3].childNodes[1].textContent;
		}
		if (spam2.childNodes.length == 7) {
			ISBN10 = spam2.childNodes[5].childNodes[1].textContent;
		}
	}
	
	table1 = form1.childNodes[7];
	GM_log('before loop');
	if (table1) {
		//iterate the rows. And check based on the text.
		for (i=0; i != table1.rows.length; i++) {
			var strtype = table1.rows[i].childNodes[1].textContent;
			if (strtype == "Título:") {
				booktitle = table1.rows[i].childNodes[3].textContent;
				GM_log('titulo='+booktitle);
				continue;
			}
			
			if (strtype == "Autor/es:") {
				//Check several authors.
				if (table1.rows[1].childNodes[3].hasChildNodes()) {
					GM_log('total authors='+table1.rows[i].childNodes[3].childNodes.length);
					for (a=1; a < table1.rows[i].childNodes[3].childNodes.length-1; a=a+2) {
						//
						var authnum = ((a+1)/2)-1;
						GM_log('authornum='+authnum.toString());
						var author=new String(table1.rows[i].childNodes[3].childNodes[a].textContent);

						//Check if author is translator
						if  (author.indexOf("tr.") == -1) {
							
							author = RemoveSpacesAndDates(author);
							author = RemoveTabsSpaces(author);
							Authors[authnum] = author;
							GM_log('author '+(authnum).toString()+'='+Authors[authnum]);
							
						}
						else {
							//Check brackets
							author = RemoveSpacesAndDates(author);
							author = RemoveTabsSpaces(author);
							if (author.indexOf("[") != -1) {
								var indexb = author.lastIndexOf("]");
								if (indexb != -1) {
									author = author.substring(1,indexb);
								}	
							}
							booktranslator = author;						
							GM_log('translator ='+booktranslator);
						}
					}
				}
				else {
				  Authors[0] = table1.rows[i].childNodes[3].textContent;
				  Authors[0] = RemoveSpacesAndDates(Authors[0]);
				  Authors[0] = RemoveTabsSpaces(Authors[0]);
				}
				
				GM_log('Autor/es:='+Authors.toString());
				continue;
			}
			
			if (strtype == "Lengua de publicación:") {
				bookOriginallanguage = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				GM_log('Lengua de publicación:'+bookOriginallanguage);
				continue;
			}
			
			if (strtype == "Lengua/s de traducción:") {
				bookSecondaryLang = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				GM_log('Lengua de traducción:'+bookSecondaryLang);
				continue;
			}

			if (strtype == "Fecha Edición:") {
				fechaedicion = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				GM_log('Fecha Edición:'+fechaedicion);
				continue;
			}
			
			if (strtype == "Fecha Impresión:") {
				fechaimpresion = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				GM_log('Fecha Impresión:'+fechaimpresion);
				continue;
			}        
			
			if (strtype == "Publicación:") {
				publicacion = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				GM_log('Publicación:'+publicacion);
				continue;
			}  
					
			if (strtype == "Descripción:") {
				descripcion = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				descripcion = descripcion.replace(" p. ", " páginas, ");
				GM_log('Descripción:'+descripcion);
				continue;
			}

			if (strtype == "Encuadernación:") {
				encuadernacion = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				GM_log('Encuadernación:'+encuadernacion);
				continue;
			}

			if (strtype == "Colección:") {
				coleccion = RemoveTabsSpaces(table1.rows[i].childNodes[3].textContent);
				coleccion = RemoveSpacesAndDates(coleccion);
				GM_log('Colección:'+coleccion);
				continue;
			}                
					 
		}
	} //table1 loop
	
    //Format book description.
    FullDescription = publicacion + ", " + encuadernacion + ', ' + descripcion + '\n' + coleccion;
   
    //format entry date.
	var curdate = new Date();
    var themonth = new String(curdate.getMonth());
    var thedate = new String(curdate.getDate());
    if (themonth.length == 1) {themonth = '0'+themonth;}
    if (thedate.length == 1) {thedate = '0'+thedate;}
    entrydate = curdate.getFullYear() + '-' + themonth + '-' + thedate;    
    
    //format edition date.
    if (fechaedicion == '') {
        fechaedicion = fechaimpresion;
    }
}


function GetLTResponse(response) {
GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.librarything.es/addnew.php',
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible)',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(xhr) { response(xhr.responseText) }
	});
}

function AddQuotes(sText)
{
    return ('"' + sText + '"');
}

function RemoveTabsSpaces(sText)
{
    var myStr=new String(sText);
    //remove first character if is a TAB or ENTER
    while ((myStr.charAt(0) == "\n") || (myStr.charAt(0) == "\t")) {
        //remove first
        myStr = myStr.substring(1);
    }   

    //remove last character if is a TAB or ENTER
    while ((myStr.charAt(myStr.length-1) == "\n") || (myStr.charAt(myStr.length-1) == "\t")) {
        //remove last
        myStr = myStr.substr(0, myStr.length-1 );
    }       
    
    return (myStr);
}

function RemoveSpacesAndDates(bookauthor)
{
    var myStr=new String(bookauthor);
    var lasttext = myStr.lastIndexOf('[Ver títulos]');
//    GM_log('RemoveSpacesAndDates1 - lasttext='+lasttext);
   
    if (lasttext > -1) { 
        myStr = myStr.substring(0,lasttext);
//        GM_log('RemoveSpacesAndDates2 - myStr='+myStr);
    }
    
    //remove linefeed
    var lasttext = myStr.indexOf("\n");
//    GM_log('RemoveSpacesAndDates3 - lasttext='+lasttext);
    if (lasttext > -1) { 
        myStr = myStr.substring(0,lasttext);
//        GM_log('RemoveSpacesAndDates4 - myStr='+myStr);
    }
    
    //remove dates if exists
    var lasttext = myStr.indexOf("(");
//    GM_log('RemoveSpacesAndDates5 - lasttext='+lasttext);
    
    if (lasttext > -1) {
        myStr = myStr.substring(0,lasttext-1);
//        GM_log('RemoveSpacesAndDates6 - myStr='+myStr);
        
    }
    
//    GM_log('RemoveSpacesAndDates - return='+myStr);
    return (myStr);
}


function LanguageToLTLanguage(language) {

	switch(language) {
		case "Alemán": return ("ger");
		case "Árabe": return ("ara");
		case "Búlgaro": return ("bul"); 	//unconfirmed 
		case "Castellano": return ("spa");
		case "Chino": return ("chi");
		case "Danés": return ("dan");
		case "Finés": return ("fin");
		case "Francés": return ("fre");
		case "Gallego":
		case "Griego": return ("gre");
		case "Hebreo": return ("heb");
		case "Inglés": return ("eng");
		case "Italiano": return ("ita");
		case "Japonés": return ("jpn");
		case "Latín": return ("lat");
		case "Neerlandés": return ("dut");
		case "Noruego": retrun ("nob");
		case "Portugués": return ("por");
		case "Ruso": return ("rus");
		case "Sueco": return ("swe");
		case "Turco": return ("tur");
	case "Otras lenguas":
	case "Checo":
	case "Croata":
	case "Eslovaco":
	case "Esloveno":
	case "Euskera":
	case "Hindí":
	case "Húngaro":
	case "Polaco":
	case "Rumano":
	case "Sánscrito":
	case "Serbio":
	case "Catalán":
	case "Aragonés":
	case "Aranés":
	case "Asturiano":
	case "Valenciano":
	
	default:
		return ("");
	}
	
//LT not used:
//<option value="ind">Indonesian</option>
//<option value="wel">Welsh</option>
}

function GetExtraAuthorsData() {
	var ExtraAuth = "";
	var count = 0;
	for (i=1; i != Authors.length-1; ++i) {
		if (Authors[i] != undefined) {
			ExtraAuth = ExtraAuth+"&person_name-"+count+"="+Authors[i]+"&person_role-"+count+"=num_2";
			count++;
		}
	}
	//ufff.. check translator... ugly... 
	if (booktranslator != "") {
		ExtraAuth = ExtraAuth+"&person_name-"+count+"="+booktranslator+"&person_role-"+count+"=num_10";
	}
	return (ExtraAuth);

}

function PostMCUData() {
	var options = {
		'url':"http://www.librarything.es/update.php",
		'method': "POST",
		'headers':{
		'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20080404',
		'Content-type':'application/x-www-form-urlencoded'
		},	
		'onload': function(r) {
		 alert('Libro enviado a LT!');
		 button.setAttribute('enabled', 'true');
	    },
		'onerror':function(e) {
			alert('Se ha producido un error enviando el Libro enviado a LT!');
		}
	};
	
	var thedata="form_ismanual=1&returnURL=addbooks&returnURL=http://www.librarything.com/addbooks"+
		 "&LT_GetRandomID=" + sLT_GetRandomID +
		 "&form_title=" + booktitle + "&form_authorunflip=" + Authors[0] + "&form_tags=&toread=0&form_rating="+
		 "&form_review=&bookreview_stamp=&form_previouspersonCount=0"+
		 GetExtraAuthorsData() + 
		 "&form_publication="+FullDescription + "&form_date="+fechaedicion+"&form_ISBN="+ISBN13+
		 "&form_lccallnumber=&form_lccallnumber_crc=0&form_dewey=&form_dewey_crc=0"+
		 "&field_lang="+LanguageToLTLanguage(bookOriginallanguage)+"&field_book=&original=1&longList=0"+
		 "&field_lang2=&field_book=&original=0&longList=0"+
		 "&field_lang_original="+LanguageToLTLanguage(bookSecondaryLang)+"&field_book=&original=1&longList=0"+
		 "&form_comments="+
		 //private comment
		 "&form_privatecomment=manualimport&form_summary=&form_summary_crc=0&form_copies=1"+
		 "&form_bcid_1=&form_bcid_2=&form_datebought="+entrydate;
		 
	options.data = thedata; 
	//alert('data= '+thedata);
	
	GM_xmlhttpRequest(options);
	
}


function CheckUpdated() {
    var SUC_script_num = 49152; // Change this to the number given to the script by userscripts.org (check the address bar)
    try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Libro Agencia ISBN España a LibraryThing') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}
