// ==UserScript==
// @name          Orta Dogu Teknik Universitesi Kutuphane Katalogu Baglantisi
// @description	  Orta Dogu Teknik Universitesi Kutuphanesi Katalogunda Google Books Araciligiyla Tarama Yapilir.
// @include       http://books.google.*
// ==/UserScript==

/*
Based on "QuickiWiki" by script by Tarmle (http://www.ruinsofmorning.net/greasemonkey/)

http://www.quirksmode.org/js/keys.html
*/

(


function()
{

var libraryUrlPattern = 'http://library.metu.edu.tr/search/i?SEARCH=';
var libraryUrlPatternTrailer = '&sortdropdown=-&searchscope=3';
var libraryName = 'Orta Dogu Teknik Universitesi';
var libraryAvailability = /CHECKED IN/;
var libraryReference = /LIB USE ONLY/;
var libraryInProcess = /IN PROCESS/;
var libraryEbook = /[computer file]/;
var libraryDue = /DUE (\d\d\-\d\d\-\d\d)/;
var libraryMissing = /MISSING/;
var libraryTransit = /IN TRANSIT/;
var libraryElectronic = /[electronic resource]/;
var libraryHolds = /ON HOLDSHELF/;
var notFound = /would be here/;


var libraryLookup = 
    {

    buildBox: function() 
	{
	// Build popup //
    	var popup = document.createElement('iframe');
    	popup.setAttribute('id', 'ResultBox');
    	popup.setAttribute('style', "display:none;z-index:1000;position:fixed;top:0px;right:0px;width:560px;height:100%;border:1px solid black;");
    	document.body.appendChild(popup);
    
    	// Prevent miss-clicks from hiding popup //
    	window.LIPPointer = false;
    	popup.addEventListener('mouseover', function(e){
        	window.LIPPointer = true;
    	}, false);
    	popup.addEventListener('mouseout', function(e){
        	window.LIPPointer = false;
    	}, false);
    	return popup;
	},

    insertLink: function(isbn, hrefTitle, aLabel, color )
        {
        
	var box = document.getElementById('ResultBox');
    	if (!box) {
		box=libraryLookup.buildBox();
	}
	
	var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('class','sans');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryUrlPattern + isbn + libraryUrlPatternTrailer);
	link.setAttribute('style','color: ' + color);

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);

	box.src = libraryUrlPattern + isbn + libraryUrlPatternTrailer;
        box.style.display = 'block';

        },

    doLookup: function ( isbn )
        {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern + isbn + libraryUrlPatternTrailer,
            onload:function(results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Bulunamadi",
                        "Aranan kitap " + libraryName + " Kutuphanesinde bulunamadi.",
                        "red"
                        );
                    }
		else if ( libraryHolds.test(page) )
                    {                  
			libraryLookup.insertLink (
                        isbn,                      
			"Ayirtilmis",
                        "Aranan kitap " + libraryName + " Kutuphanesinde ayirtilmistir.",
                        "#AA7700"  // dark yellow
                        );
		    }	
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Uygun",
                        "Aranan kitap " + libraryName + " Kutuphanesinde bulundu.",
                        "green"
                        );
                    }
		else if ( libraryReference.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Danisma Kaynagi",
                        "Aranan kitap " + libraryName + " Kutuphanesinde sadece kutuphane ici kullanim icin uygundur.",
                        "#E07B8F"  // fuschia maybe
                        );
                    }  
		else if ( libraryDue.test(page) )
                    {   
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbn,
			"Kutuphane Disinda",
                        "Aranan kitap " + libraryName + " Kutuphanesinde " + due + " tarihine kadar uygun degildir.",
                        "#AA7700"
                        );
                    }
		else if ( libraryElectronic.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Birden cok format bulundu",
                        "Aranan kitap " + libraryName + " Kutuphanesinde bulundu.",
                        "#107FBF"  // bluie
                        );
                    }                          
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Hata olustu",
                        libraryName + " Kutuphanesinde kitap aranirken hata olustu.",
                        "orange"
                        );
                    }
                }
            });
        }


    }

try 
    { var isbn = location.href.match(/v?id=ISBN((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1];  }
catch (e)
    { return; }

var origTitle = document.evaluate("//span[@class='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();


