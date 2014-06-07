// ==UserScript==
// @name           Word Definer
// @namespace      Word Definer
// @description    Ever wondered what that word on the page meant? Gone on google to find out? Now you don't have to. With this script enabled, just highlight the word and hold Shift and ? to see the definition. Simples! 
// @include        *
// ==/UserScript==


var googleKeys = new Array();
googleKeys[0] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSuWkgXNFs9ODZBmpD2MI4L63N08xTkWqmp44aYO-m_rLx6V_IJ1KYSjQ";
googleKeys[1] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BQTAKdeigGBgoBsbJ78Ec88CMQKbRRhnUDJljYk6nVROz7ocjyfInEdfw";
googleKeys[2] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSL8gV_6Pz9VPdDX8ZmNkORT1NCMBRWGCXOEyzJIAKjkQkH9bqZUWFgCQ";
googleKeys[3] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSX59-gjahmmNUX0GCeK_9kwuvxXxQWnzIBQSL2Mf_Q0QHxv31_buaM8A";
googleKeys[4] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BToTEYnD2XF39xiTUk5mK2LYVg0RhQETNmWxL7xKAPTD2Xe4dei6CnQ0w";
googleKeys[5] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BTaygQXBMBVFSfnPV4C1AUFsz80vRRloiTMAu3DLHmsIOxcyDd2iMy-nA";
googleKeys[6] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BT0BcuIk14Q-7GjuN4fgQG7DHJ5LRRG9quB39nFmwEbuZWDoOSjkvHAYA";
googleKeys[7] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSOQQ1c9OZmmLp2Molan2Owrh-xUxRUMLZeMKhaVrmmnpWoW8D1Dwq4hg";
//add more keys on here to reduce the amount of errors
//you can sign up for keys here:
//http://code.google.com/apis/ajaxsearch/signup.html


function showDefinition(word,itemNum) {

    if (word.length < 1){ return; }
	var googleKey;
	googleKey = googleKeys[(Math.ceil(Math.random()*googleKeys.length-1))];
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=Define:" + word + "&key=" + googleKey,
        onload: function (resp) {
            try {
                var def = JSON.parse(resp.responseText);
				if(def.responseStatus == 403){
					//showDefinition(word,itemNum);
					alert("Google API Key blocked: \n" + googleKey + "\n\n If you have your own key, edit the script to get it to work! Else, try again.");
					return;
				}else if(def.responseStatus == 400){
					//showDefinition(word,itemNum);
					alert("Google API Key Invalid: \n" + googleKey + "\n\n If you have your own key, edit the script to get it to work!");
					return;
				}
				var counter = def.responseData.results.length;

                var forwardLink;
                definition = stripCrap(def.responseData.results[itemNum].content.replace(/(<([^>]+)>)/ig, ""));
				definition = (itemNum+1) + ". " + definition;
				if(definition.indexOf("Defined Using a Free Online Dictionary")>-1){
					if(itemNum == 0){
						showDefinition(word,0);
					}else{
						showDefinition(word,itemNum + 1);
					}
					return;
				}
                forwardLink = def.responseData.results[itemNum].unescapedUrl;

                definition = escapeAscii(definition);

                var where_to = confirm(unescape(definition) + "\n\nWould you like to read another definition for this word?");


                if (where_to == true) {
                    showDefinition(word,itemNum + 1);
                }
            } catch (e) {
                alert("No more definitions found for \"" + word + "\"");
            }
        }
    });
}

function escapeAscii(str) {
    for (e = 32; e < 255; e++) {
        str = str.replace("&#" + e + ";", String.fromCharCode(e));
    }

    for (e = 338; e < 402; e++) {
        str = str.replace("&#" + e + ";", String.fromCharCode(e));
    }

    for (e = 8211; e < 8482; e++) {
        str = str.replace("&#" + e + ";", String.fromCharCode(e));
    }
    return str;
}

function stripCrap(str){
	return str;
}



function KeyCheck(e) {
    var intKey = 0;
    e = (window.event) ? event : e;
    intKey = (e.keyCode) ? e.keyCode : e.charCode;
    switch (intKey) {
    case 191:
        if (e.shiftKey) {
		    var selText = window.getSelection().toString().trim();
            showDefinition(selText,0);
        };
        intKey = 0;
        return false;
        break;
    default:
        break;
    };
};

window.addEventListener('keydown', KeyCheck, true);