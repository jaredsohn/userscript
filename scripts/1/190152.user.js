// ==UserScript==
// @name       Pathe Unlimited Card Autofill Reserveringen
// @namespace  http://www.pascaladriaansen.nl/
// @version    0.5
// @description  Voeg makkelijk meerdere Pathe Unlimited Cards toe aan een reservering, zonder elke keer de nummers en pincodes te hoeven overtypen.
// @match      https://onlinetickets.pathe.nl/ticketweb.php?sign=6*
// @match      https://onlinetickets.pathe.nl/ticketweb.php?sign=7*
// @exclude    https://onlinetickets.pathe.nl/ticketweb.php?sign=76*
// @grant      none
// @run-at     document-end
// @copyright  2012+, Pascal Adriaansen
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

//Make sure jQuery doesn't conflict with prototype.js
jQuery.noConflict();

jQuery(document).ready(function($){
	console.log("Pathe Autofill loaded.");
	var style = '<style> span { display: inline-block; } span.text { display: inline; } .close { position: absolute; top: 5px; right: 5px; font-size: 9px; font-weight: bold; } .modal { position: relative; background: #fff; width: 600px; max-height: 300px; overflow: auto; margin: 150px auto; padding: 15px; border-radius: 5px; }</style>';
	$("body").append(style);
	
	//Set empty localstorage items when the script runs for the very first time
	if(localStorage.getItem("passen") == undefined && localStorage.getItem("passen_body") == undefined){
		localStorage.setItem("passen", "");
		localStorage.setItem("passen_body", "");
	}
    
    //If there are cards, start the plugin and load the dropdown
    if(localStorage.getItem('passen') != "" && localStorage.getItem('passen') != undefined){
        initStuff();
    } else {
    	//Else show the overlay and prompt user to add cards
    	showOverlay("Je hebt nog geen passen toegevoegd.", false, 300);
        
        //But do show the settings link below the card input field!
        $("input#cardnumber").after('<a class="settings" href="#">Instellingen</a>');
    }
    
    //Listen for clicks on the "Voeg toe" button when adding cards
    $("body").on("click", '#voegtoe', function(e){
        e.preventDefault();
        var naam = $("body .modal input[name='naam']").val();
        var nummer = $("body .modal input[name='nummer']").val();
        var pin = $("body .modal input[name='pin']").val();
        
        if(naam == undefined || nummer == undefined || pin == undefined || naam == "" || nummer == "" || pin == ""){ alert("Je hebt niet alles ingevuld!"); } else {
            addPass(naam, nummer, pin);
            initStuff();
        	showOverlay();
        }
    });
    
    $('body').on('click', '.verwijder', function(e){
        e.preventDefault();
        var naam = $(this).attr("data-naam");
        var nummer = $(this).attr("data-nummer");
        var pin = $(this).attr("data-pin");
        
        //Remove entry from JSON string
        var passen_body_tmp = localStorage.getItem('passen_body');
        var passen_body_new1 = passen_body_tmp.replace('{"naam": "'+naam+'", "nummer": '+nummer+', "pin": '+pin+' },', "");
        var passen_body_new2 = passen_body_new1.replace(',{"naam": "'+naam+'", "nummer": '+nummer+', "pin": '+pin+' }', "");
        var passen_body_new = passen_body_new2.replace('{"naam": "'+naam+'", "nummer": '+nummer+', "pin": '+pin+' }', "");
        localStorage.setItem("passen_body", passen_body_new);
        
        //Create new JSON string and save it
        var passen_pre = '{"passen":[';
        var passen_body = localStorage.getItem('passen_body');
        var passen_post = '] }';
        var passen = passen_pre + passen_body + passen_post;
        localStorage.setItem("passen", passen);
        
        //Remove entry from the list in the modal
        $(this).parent(".entry").remove();
        
        //Empty everything if all cards are removed
        if(passen_body_new == "" || passen_body_new == " "){
        	localStorage.setItem("passen", "");
            $("#overlay").remove();
        }
        
        //Check again if there are cards and show interface accordingly
        if(localStorage.getItem('passen') != "" && localStorage.getItem('passen') != undefined){
        	//There are still cards, reload the dropdown
        	initStuff();
    	} else {
    		//There are no cards left, show the overlay/modal including a message
    		showOverlay("Je hebt nog geen passen toegevoegd.", false, 300);
    	}
        
    });
    
    
    //Close the modal/overlay
    $("body").on("click", '.close a', function(e){
        e.preventDefault();
        $("#overlay").remove();
    });
    
    //Show the modal/overlay
    $("body").on("click", '.settings', function(e){
        e.preventDefault();
        showOverlay();
    });
    
    //Export cards
    $("body").on("click", '.export', function(e){
        e.preventDefault();
        exportCards();
    });
    
    //Import cards
    $("body").on("click", '.import', function(e){
        e.preventDefault();
        importCards();
    });
    

  	//Function to add cards
     function addPass(naam, nummer, pin){
        var passen_pre = '{"passen":[';
        var passen_body = localStorage.getItem('passen_body');
        var passen_post = '] }';
        
        if(passen_body == "" || passen_body == undefined){
        	passen_body = passen_body + '{"naam": "'+naam+'", "nummer": '+nummer+', "pin": '+pin+' }';
        } else {
            passen_body = passen_body + ',{"naam": "'+naam+'", "nummer": '+nummer+', "pin": '+pin+' }';
        }
        var passen = passen_pre + passen_body + passen_post;
        
        localStorage.setItem('passen', passen);
        localStorage.setItem('passen_body', passen_body);
        console.log(passen);
    };
    
    //Function to load dropdown and settings link
    function initStuff(){
        
        var passen_obj = JSON.parse(localStorage.getItem('passen'));
        
        $("body .modal input[name='naam']").val("");
		$("body .modal input[name='nummer']").val("");
		$("body .modal input[name='pin']").val("");
        
        $("input#cardnumber").hide();
   		$("input#pin").hide();
    	
        $("select#pas").remove();
        $(".settings").remove();
   		$("input#cardnumber").after('<select id="pas"><option>Kies een kaart...</option></select><a class="settings" href="#">Instellingen</a>');
		
    	$.each(passen_obj.passen, function(i, item) {
    		$("select#pas").append('<option data-pas="'+item.nummer+'" data-pin="'+item.pin+'">'+item.naam+'</option>');
		});
   
    	$("select#pas").change(function(){
        	var nummer = $("select#pas option:selected").attr("data-pas");
        	var pin = $("select#pas option:selected").attr("data-pin");
    
   			$("input#cardnumber").val(nummer).change();
   			$("input#pin").val(pin).change();
   			
   			
    	});
        
        $("enterCardNr").show();
    }
    
    //Function to show the overlay
    function showOverlay(message, listbool, boxwidth){
    	//Remove any overlay if there still is one
    	$("#overlay").remove();
    	
    	//Show the overlay according to the passed parameters. Use default settings if no parameters are set.
    	var overlay = '<div id="overlay" style="top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); position: absolute; z-index: 1000;">';
    	if(boxwidth != undefined) { 
    		overlay += '<div class="modal" style="width:'+boxwidth+'px;">'; 
    	} else {
    		overlay += '<div class="modal">';
    	}
    	overlay += '<div class="close"><a href="#">SLUIT [X]</a></div>';
    	if(message != undefined) {
    		overlay += '<span class="text">'+message+'<br/><br/></span>';
    	} else {
    		//nothing
    	}
        overlay += 'Naam: <input type="text" name="naam" /><br/>Nummer: <input type="text" name="nummer" /><br/>Pin: <input type="text" name="pin" style="width: 50px;" /><br/><input id="voegtoe" type="submit" value="Voeg toe" /><br/>';
        
        overlay += '<br/><a href="#" class="export">Exporteer passen</a> | <a href="#" class="import">Importeer passen</a><br/>';
        
    	if(listbool == true || listbool == "" || listbool == undefined) {
    		if(localStorage.getItem('passen') != "" && localStorage.getItem('passen') != undefined){
    			overlay += '<div class="border" style="width: 100%; border-bottom: 1px solid #ccc; margin: 5px 0px 5px 0px;"></div>';
    			overlay += '<div class="lijst"><div style="border-bottom: 1px solid #ccc; padding: 5px;"><span style="margin-right: 10px; font-weight: bold; width:200px; text-overflow: ellipsis;">Naam</span><span style="margin-right: 10px; font-weight: bold; width:150px; text-overflow: ellipsis;">Pasnummer</span><span style="font-weight: bold; width: 50px;">Pin</span></div></div>';
	    		var passen_obj = JSON.parse(localStorage.getItem('passen'));
	    		$.each(passen_obj.passen, function(i, item) {
	    		    overlay += '<div style="border-bottom: 1px solid #ccc; padding: 5px;" class="entry"><span style="margin-right: 10px; width: 200px; text-overflow: ellipsis;">'+item.naam+'</span><span style="margin-right: 10px; width: 150px;">'+item.nummer+'</span><span style="width: 50px;">'+item.pin+'</span><a data-naam="'+item.naam+'" data-nummer="'+item.nummer+'" data-pin="'+item.pin+'" class="verwijder" href="#">Verwijder</a></div>';
	    		});
    		}
    	} else {
    		//nothing
    	}
    	
    	overlay += '</div></div>';
        
        $("body").append(overlay);
    }
    
    function exportCards(){
    	var exportedcards = Base64.encode(localStorage.getItem("passen_body"));
   		prompt("Bewaar onderstaande code ergens in een bestandje op je computer of stuur het naar je vriend: \n\n", exportedcards);
    }
    
    function importCards(){
    	var passen;
    	var importcode = prompt("Plak hier de code die je hebt opgeslagen of van een vriend ontvangen hebt (voer een geldige code in en geen onzin, anders gaat het stuk):","");
    	
    	if (importcode != null){
    		
    		var passen_pre = '{"passen":[';
    		var passen_body = Base64.decode(importcode);
    		var passen_post = '] }';
    		passen = passen_pre + passen_body + passen_post;
    		
    		localStorage.setItem('passen', passen);
    		localStorage.setItem('passen_body', Base64.decode(importcode));
    		
    		initStuff();
    		$('#overlay').remove();
    		
    	}
    	
    }
    
    //Base64 encoding / decoding for exporting and importing cards
    /**
	*
	*  Base64 encode / decode
	*  http://www.webtoolkit.info/
	*
	**/
	var Base64 = {
	
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	// public method for encoding
	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;
	
	    input = Base64._utf8_encode(input);
	
	    while (i < input.length) {
	
	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);
	
	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;
	
	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }
	
	        output = output +
	        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	
	    }
	
	    return output;
	},
	
	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;
	
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	    while (i < input.length) {
	
	        enc1 = this._keyStr.indexOf(input.charAt(i++));
	        enc2 = this._keyStr.indexOf(input.charAt(i++));
	        enc3 = this._keyStr.indexOf(input.charAt(i++));
	        enc4 = this._keyStr.indexOf(input.charAt(i++));
	
	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;
	
	        output = output + String.fromCharCode(chr1);
	
	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }
	
	    }
	
	    output = Base64._utf8_decode(output);
	
	    return output;
	
	},
	
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";
	
	    for (var n = 0; n < string.length; n++) {
	
	        var c = string.charCodeAt(n);
	
	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	
	    }
	
	    return utftext;
	},
	
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;
	
	    while ( i < utftext.length ) {
	
	        c = utftext.charCodeAt(i);
	
	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }
	
	    }
	
	    return string;
	}

}
   
});