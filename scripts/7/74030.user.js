// Modified by Müge Akbulut, mugeakbulut@gmail.com
// Written by Edward Vielmetti, emv@superpatron.com
// Original from Jon Udell "Library Lookup"
// adapted from SPL Linky by Carrick Mundell
// Suggested by Jessamyn West and Kevin Yezbick
// Javascript help by Gordon Mohr

// ==UserScript==
// @name        Google Books, Hacettepe
// @description	  Hacettepe Üniversitesi Kutuphanesi Katalogunda Google Books Araciligiyla Tarama Yapilir.
// @include       http://books.google.*
// ==/UserScript==

/*
Based on "QuickiWiki" by script by Tarmle (http://www.ruinsofmorning.net/greasemonkey/)

http://www.quirksmode.org/js/keys.html
*/

(


function()
{

var libraryUrlPattern = 'http://katalog.hacettepe.edu.tr/search/i?SEARCH=';
var libraryUrlPatternTrailer = '&sortdropdown=-&searchscope=3';
var libraryName = 'Hacettepe Üniversitesi';
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
                        "Aradığınız kitap " + libraryName + " Kütüphanesinde bulunamadı.",
                        "red"
                        );
                    }
		else if ( libraryHolds.test(page) )
                    {                  
			libraryLookup.insertLink (
                        isbn,                      
			"Ayirtilmis",
                        "Aranan kitap " + libraryName + " Kütüphanesinde ayırtılmıştır.",
                        "#AA7700"  // dark yellow
                        );
		    }	
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Uygun",
                        "Aranan kitap " + libraryName + " Kütüphanesinde bulundu.",
                        "green"
                        );
                    }
		else if ( libraryReference.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Danışma Kaynağı",
                        "Aranan kitap " + libraryName + " Kütüphanesinde sadece kütüphane içi kullanim icin uygundur.",
                        "#E07B8F"  // fuschia maybe
                        );
                    }  
		else if ( libraryDue.test(page) )
                    {   
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbn,
			"Kutuphane Disinda",
                        "Aradığınız kitap " + libraryName + " Kütüphanesinde " + due + " tarihine kadar uygun değildir.",
                        "#AA7700"
                        );
                    }
		else if ( libraryElectronic.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Birden cok format bulundu",
                        "Aranan kitap " + libraryName + " Kütüphanesinde bulundu.",
                        "#107FBF"  // bluie
                        );
                    }                          
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Hata olustu",
                        libraryName + " Kütüphanesinde kitap aranırken hata oluştu.",
                        "orange"
                        );
                    }
                }
            });
        }


    }

try 
    { var isbn = document.body.textContent.match(/(\d{7,9}[\d|X])/)[1];  }
catch (e)
    { return; }

var origTitle = document.evaluate("//span[@class='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();

