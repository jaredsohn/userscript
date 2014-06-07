// ==UserScript==
// @name        Anty-gimbo
// @grant GM_getValue 
// @grant GM_setValue 
// @description Dodaje przycisk do blokowania komentarzy użytkowników przy ikonce piwa. Działa tylko na głównej. 
// @include     http://www.sadistic.pl/
// @include     http://www.sadistic.pl/portal/*
// @include     http://www.sadistic.pl/poczekalnia*
// @include     http://www.sadistic.pl/humor_hard*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var banned = new Array();
var tmp = "";

getData();



 

 


function getData(){
	if(GM_getValue('banned') != null){
		
		tmp = GM_getValue('banned');
		banned = tmp.split(' ');
		
	}else{
		GM_setValue('banned', tmp);
		banned = new Array();
	}
}

function saveData(){
	tmp = banned.join(' ');
	GM_setValue('banned', tmp);
}

function removeFromBase(gimb){
	
	var index = banned.indexOf(gimb);
	if(index != -1) {
		banned.splice(index, 1);
	}
}
function checkIfExists(gimb){
	
	var index = banned.indexOf(gimb);
	
	if(index != -1) {
		return 1;
	}else{
		return 0;
	}
}
function hideComments(gimb){
	
	$('a.gensmall:contains("'+gimb+'")').parent().parent().find('.postbody').css('display','none');
	$('a.gensmall:contains("'+gimb+'")').parent().parent().find('.karny_kutas').css('opacity', '0.2');
}
function showComments(gimb){
	
	$('a.gensmall:contains("'+gimb+'")').parent().parent().find('.postbody').css('display','block');
	$('a.gensmall:contains("'+gimb+'")').parent().parent().find('.karny_kutas').css('opacity', '1');
}

$(document).on("click", ".karny_kutas", function(){
	
	var nick = $(this).parent().find('a.gensmall').text();
	
	if(!checkIfExists(nick)){
		banned.push(nick);
		hideComments(nick);
		saveData();
	}else{
		
		showComments(nick);
		removeFromBase(nick);
		saveData();
	}
	
	
});



waitForKeyElements ("div.komentarze", cengine);

function cengine(){
	
	dodajKutasy();
	
	for(var i = 0; i < banned.length; i++){
		
		if(banned[i].length > 1)
			hideComments(banned[i]);	
	}
	
}
function dodajKutasy(){
	
	var komenty = $('div.komentarz').find('div.naglowek').find('a.gensmall');
	
	$(komenty).each(function(e){
		if($(this).parent().find('.karny_kutas').length < 1){
			$(this).parent().prepend('<button class="karny_kutas" style="display:inline-block; background-color: black; color: rgb(166,166,166); margin: 0 0 0 10px; border: 1px solid rgb(43, 43, 43); opacity:1; float:right; font-size:9px; height:18px;">c===3</button>');
			
		}
	});
	
}


/*--- waitForKeyElements():  A handy, utility function that
    does what it says.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
)
{
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                500
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
} 