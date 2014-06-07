// ==UserScript==
// @name          	Stupid Facebook Questions
// @namespace		stupid_facebook_questions
// @homepage     	http://jeltelagendijk.nl
// @author 			http://www.facebook.com/jwlagendijk
// @description   	Tired of those stupid questions? Let me fix that for you
// @include      	htt*://*.facebook.com/*
// @exclude        	htt*://*static*.facebook.com*
// @exclude        	htt*://*channel*.facebook.com*
// @exclude        	htt*://developers.facebook.com/*
// @exclude        	htt*://upload.facebook.com/*
// @exclude       	htt*://*onnect.facebook.com/*
// @exclude        	htt*://*acebook.com/connect*
// @exclude        	htt*://*.facebook.com/plugins/*
// @exclude        	htt*://*.facebook.com/l.php*
// @exclude        	htt*://*.facebook.com/ai.php*
// @exclude        	htt*://*.facebook.com/extern/*
// @exclude        	htt*://*.facebook.com/pagelet/*
// @exclude        	htt*://api.facebook.com/static/*
// @exclude        	htt*://*.facebook.com/contact_importer/*
// @exclude        	htt*://*.facebook.com/ajax/*
// @exclude        	htt*://www.facebook.com/places/map*_iframe.php*
// @version        	1.1
// ==/UserScript==

DOM = function () {

    function getByName(id) {
        if (id && typeof id === 'string') {
            id = document.getElementsByName(id);
        }
        return id || null;
    }

    return {
        getByName: getByName
    };
}();

var vragen = [	"Heb je de handen boven het bureau",
		"Waar ga je ons nu mee vervelen",
		"Zit je nu alweer op Facebook",
		"Allemachtig wat een dag",
		"Vind je ook niet dat het genoeg geweest is"];
var random = Math.floor(Math.random()*vragen.length);


function load(){ 
	var statusUpdate = DOM.getByName('xhpc_message')[0] || DOM.getByName('xhpc_message_text')[0];

	if (typeof(statusUpdate) !== 'undefined'){
		
		var replaceArray = statusUpdate.value.split(',');

		replaceArray[0] = vragen[random];
		var newText = replaceArray.join(',');

		statusUpdate.setAttribute('title', newText);
		statusUpdate.setAttribute('placeholder', newText);
		statusUpdate.value = newText;
	}
}

window.addEventListener("load",load,false);