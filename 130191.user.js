// ==UserScript==
// @name Multiquote for Lithium Forum
// @namespace http://allise.net/
// @version 1.0
// @copyright 2012+, Remedy Memory (aka Lady R or llfezll)
// @require https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @include http://community.eu.playstation.com/*
// ==/UserScript==


var i = $.cookie("quoteNumber");
if(i == null) i = 0;


// Inserimento tasti per la selezione dei post da quotare
$('div.lia-message-actions > div.lia-button-group')
    .append('<span class="lia-button-wrapper lia-button-wrapper-secondary"><a class="lia-button lia-button-secondary fez-quote">Quota</a></span>');
if(i > 0) {
$('div.message-editor-controls > div.lia-button-group')
    .append('<span class="lia-button-wrapper lia-button-wrapper-secondary"><a class="lia-button lia-button-secondary fez-postQuote">Inserisci multiquote</a></span>');
}


// Funzione di memorizzazione multiquote
$('a.fez-quote').live( "click", function() { 
    
    
    
        
    // Incremento i
    i = i + 1;
    
    // Ottengo username dell'autore del post
    var quoteTextAuthor = $(this).parents('div.lia-quilt-layout-forum-message').find('a.lia-user-name-link').children('span').text();
    
    // Ottengo il testo del messaggio selezionato attualmente
    var tmpQuoteText = $(this).parents('div.lia-quilt-layout-forum-message').find('div.lia-message-body-content').clone();
       
    // Rimuovo firma
    $('.UserSignature', tmpQuoteText).remove();
    tmpQuoteText = $(tmpQuoteText).html();
    
    
    // Aggiungo la sintassi del quote al nuovo messaggio ed aggiungo un "accapo"
    var quoteText = '<blockquote><hr>' + quoteTextAuthor + ' ha scritto:<br />' + tmpQuoteText + '<hr></blockquote><br /><br />'; 
    
    // Ottengo il peso del messaggio (in bit)
    var quoteTextLenght = (quoteText.length) * 8;
    
    
    // Memorizzo il nuovo elenco di quote nel cookie predisposto solo se il messaggio non pesa più di 4kb circa
    if(quoteTextLenght < 32000) {
        // Rendo grigio il tasto
        $(this).css('backgroundColor', '#999');
        
        // Salvo il cookie
        $.cookie("quoteText" + i, quoteText ,{ path:'/' }); 
    }
    else {
        // Rendo grigio il tasto
        $(this).css('backgroundColor', '#D40B0E');
    }
   
    // Memorizzo il numero di quote nel cookie predisposto
    $.cookie("quoteNumber", i ,{ path:'/' }); 
  
});


// Funzione di echo dei multiquote
$('.fez-postQuote').live( "click", function() {
    
    var quoteNumber = 0;
    quoteNumber = $.cookie("quoteNumber");
    
    for(i = 1;  i <= quoteNumber; i++) {
        
        var quoteText = $.cookie("quoteText" + i);
                
        $("#tinyMceEditor_ifr").contents().find("body").append(quoteText);
            
        // Svuoto il cookie visto che i quotes sono stati gia inseriti nel testo
        $.cookie("quoteText" + i, " " ,{ path:'/' }); 
        $.cookie("quoteText" + i, "", { path: '/', expires: -5 });
    }
     $.cookie("quoteNumber", " " ,{ path:'/' });
     $.cookie("quoteNumber", "", { path: '/', expires: -5 });
});
    
    
