    // ==UserScript==
// @name           SimpleCommentTranslation
// @namespace      www.openHackIndia2011.com
// @description    As a part of openHackIndia
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 0.1
// ==/UserScript==

var translit = false;
var destLang = 'Hello';
var langMenu;

function OnLoad() {
	console.log("onload");
    var divs = $(".Mentions_Input,.uiTextareaAutogrow");
    
    console.log("Found " + divs.length + " divs");

	$.each(divs, function(index, value){
		if($(value).hasClass('fbtt-processed')){
			console.log("parsed a FB TT @as per the documentation--Bharath");
		}
		else{
			$(value).addClass('fbtt-processed');
            $(value).focus(function(e){
                console.log("It is being edited");
                console.log(e.target);
                showMenu(e.target, e);
            });
            
			$(value).keydown(function (e){
                var myDiv = this;
                spaceHandler(e, myDiv);
            });		
		}
	});

}

function spaceHandler(e, myDiv){
    
    if(translit){
        var keyId = (window.event) ? event.keyCode : e.keyCode;
        if(keyId == 32){
            var buffer = myText(myDiv);
            var allWords =	buffer.split(" ");
            console.log("allw="+ allWords);
            
            var word = allWords[allWords.length-1];
            if(!word || word === ' '){
            }
            else{
            
                transliterate(word,'en', destLang, function(result){
                    //var x = eval('(' + data.responseText + ')');
                    console.log("Tranlisterated");
                    x = eval('(' + result.responseText + ')');
                    console.log(x);
                   console.log(x.responseData);
                   console.log(x.responseData.transliterations['0'].transliteratedWords);
                   console.log("There are " + x.responseData.transliterations['0'].transliteratedWords.length + " words");
                    //var buffer = $(myDiv).text();
                    var buffer = myText(myDiv);
                    //		alert(buffer);
                    var allWords =	buffer.split(" ");
                    console.log("The array is " + allWords);
                    allWords[allWords.length-2] = x.responseData.transliterations['0'].transliteratedWords[0]+"";
                
                    var finalText = allWords.join(" ");
                    console.log("Joined string is " + finalText);
                    //$(myDiv).text(finalText);
                    myText(myDiv, finalText);
                    $(myDiv).setCursorPosition($(finalText).length);
                });
            }
        }
	}
}

function myText(element, text){
    if(!text){ //only do a get
        console.log(element.tagName);
        if(element.tagName === 'TEXTAREA'){
            console.log("tag is tA");
            return $(element).val();
        }
        else{
            console.log("returning $(element).text()");
            return $(element).text();
        }s
    }
    else{ //set
        if(element.tagName === 'TEXTAREA'){
            $(element).val(text);
        }
        else{
            $(element).text(text);
        }
    }
}
function init(){

    createMenu();
	setInterval(OnLoad, 5000);
}




function transliterate(text, sourcelang, destlang, callback){
    var url = "http://ajax.googleapis.com/ajax/services/language/transliterate?v=1.0&q=" + encodeURIComponent(text) + "&langpair="+encodeURIComponent(sourcelang + "|" + destlang);
		console.log(url);
		
		GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(result) {
                    callback(result);
                }
            });
}

function createMenu(){
    var menuHTML = '<div class="">Transliteration Options<br /><div><select id="translit-lang-select"><option value="hi">Hindi</option><option value="kn">Kannada</option></select><span id="toggle-translit">Start</span></div></div>';
    
    langMenu = $(menuHTML);
    $(langMenu).css('position','absolute');
    $(langMenu).css('z-index', '99');
    $(langMenu).css('height', 'auto');
    $(langMenu).css('width', 'auto');
    $(langMenu).css('border', '1px solid gray');
    $(langMenu).css('background-color', '#ffffff');
    $(langMenu).css('padding', '4px');
    
    $('body').append(langMenu);
    $(langMenu).hide();
    
    $("#toggle-translit").toggle(function(){
        console.log("Starting");
        translit = true;
        $("#toggle-translit").html("Stop");
    },
    function(){
        console.log("Stopping");
        translit = false;
        $("#toggle-translit").html("Start");
    });
    
    $("#translit-lang-select").change(function(){
        console.log("Selected lang" + $("#translit-lang-select option:selected").text());
        var langName = $("#translit-lang-select :selected").val();
        
        if(langName === 'Kannada')
            destLang = 'kn';
        else
            destLang = 'hi';
            
        $(langMenu).hide();
    });
}

function showMenu(element, e){
        console.log("Showing menu near element ");
        var topLMI = $(element).offset().top;
        var leftLMI = $(element).offset().left;
        var heightLMI = $(element).height();

        console.log('LMI: ' + topLMI + ',' + heightLMI + ',' + leftLMI);
        
        $(langMenu).css('top', (topLMI - heightLMI - 10));
        $(langMenu).css('left', leftLMI);
        $(langMenu).css('display', 'block');

        $(langMenu).show();
    
}


init();
