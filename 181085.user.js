// ==UserScript==
// @name       ScuolaWeb+
// @namespace  http://userscripts.org/users/536982
// @version    0.2.1
// @description  Migliora ScuolaWeb+
// @match      http://scuolaweb.bonificaromagna.it/*
// @copyright  2013, Pietro Albini
// ==/UserScript==

/* Carica jQuery e avvia lo script */
function inizia(callback) {
    var script = document.createElement("script"); // Crea un nuovo elemento <script>
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"); // Imposta allo script di caricare jQuery 1.x
    script.addEventListener('load', function() { // Dopo che lo script è stato caricato - per prevenire errori
        var script = document.createElement("script"); // Crea un nuovo elemento <script>
        script.setAttribute("src", "//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"); // Imposta allo script di caricare Bootstrap 2.3.2
        script.addEventListener('load', function() {
            var script = document.createElement("script");
        	script.textContent = "("+callback.toString()+")(jQuery)"; // Includi nell'elemento <script> il codice della funzione di callback
        	document.head.appendChild(script); // Aggiungi all'<head> il codice della funzione di callback
        }, false);
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script); // Aggiungi all'<head> jQuery
}

/* Funzione principale */
function main($) {
    
    /* Carica Twitter Bootstrap 2.3.1 */
    $('head').append( $('<link rel="stylesheet">').attr('href', '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap.min.css') ); // Carica lo stile di base
    $('head').append( $('<link rel="stylesheet">').attr('href', '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-responsive.min.css') ); // Carica lo stile responsive
    
    /* Inizializza menu della navbar */
    window.nav_menu = $('<ul></ul>') // Crea un nuovo elemento <ul> globale
       .addClass('nav') // Assegnaci la classe .nav
    
    /* Popola menu della navbar */
    $('#ctl00_mnuHor tbody tr td').each(function() { // Per ogni voce di menu principale
        if ( typeof $( '#'+$(this).attr('id')+' table tbody tr td:first-child a' ).attr('href') !== 'undefined' ) // Se la voce non è nulla - aggiunto poiché alcune lo sono
        {
            if ( $('#'+$(this).attr('id')+'Items').length ) // Se la voce di menu ha un dropdown associato
            {
                window.dropdown_menu = $('<ul></ul') // Crea un container per le voci del dropdown
                    .addClass('dropdown-menu') // Rendilo un dropdown
                    .attr('role', 'menu') // Assegnali il ruolo corretto
                    .attr('aria-labelledby', 'dLabel') // Non so di preciso cosa faccia, ma senza non funziona...
                
                $('#'+$(this).attr('id')+'Items table tbody tr').each(function() { // Per ogni voce del sottomenu originario
                    if ( typeof $('#'+$(this).attr('id')+' td:first-child table tbody tr td a').attr('href') !== 'undefined' ) // Se la voce non è nulla - aggiunto poiché alcune lo sono
                    {
                        if ( $.trim( $( '#'+$(this).attr('id')+' td:first-child table tbody tr td a').text() ) === '-' ) // Se la voce è un separatore
                        {
                            $('<li></li>') // Crea un nuovo elemento <li>
                                .addClass('divider') // Impostalo come divisore
                                .appendTo(dropdown_menu); // Appendilo alle voci del dropdown
                        }
                        else // Se la voce non è un separatore
                        {
                            $('<li></li>') // Crea un nuovo elemento <li>
                                .append($('<a></a>') // Aggiunge un <a> al <li>
                                        .attr('href', $('#'+$(this).attr('id')+' td:first-child table tbody tr td a').attr('href') ) // Imposta il corretto href
                                        .html( $.trim( $( '#'+$(this).attr('id')+' td:first-child table tbody tr td a').text() ) ) // Imposta il corretto contenuto
                                )
                                .appendTo(dropdown_menu); // Appendilo alle voci del dropdown
                        }
                    }
                });
                
                $('<li></li>') // Crea una nuova lista
                	.addClass('dropdown') // Considera come una voce di menu con il dropdown
                    .append($('<a></a>') // Aggiungici un link
                            .addClass('dropdown-toggle') // Fai in modo che il link apra o chiuda il dropdown
                            .attr('href', $( '#'+$(this).attr('id')+' table tbody tr td:first-child a' ).attr('href') ) // Impostaci l'href della voce originale
                            .html( $.trim( $( '#'+$(this).attr('id')+' table tbody tr td:first-child a' ).text() )+' <b class="caret"></b>' ) // Impostaci la descrizione della voce principale
                    )
                    .append(dropdown_menu)
        	        .appendTo(nav_menu); // Appendilo al container delle voci di menu
            }
            else // Se la voce di menu non ha un dropdown associato
            {
                $('<li></li>') // Crea una nuova lista
                    .append($('<a></a>') // Aggiungici un link
                            .attr('href', $( '#'+$(this).attr('id')+' table tbody tr td:first-child a' ).attr('href') ) // Impostaci l'href della voce originale
                            .html( $.trim( $( '#'+$(this).attr('id')+' table tbody tr td:first-child a' ).text() ) ) // Impostaci la descrizione della voce principale
                    )
        	        .appendTo(nav_menu); // Appendilo al container delle voci di menu
            }
        }
    });
    
    /* Visualizzo la navbar corretta */
    $('<div></div>') // Crea il div della navbar
       .addClass('navbar') // Assegnali lo stile corretto
       .addClass('navbar-fixed-top') // Posizionala nel punto giusto (fixed top)
       .append($('<div></div>') // Crea il div per .navbar-inner
               .addClass('navbar-inner') // Prepara il contenitore della navbar
               .append($('<div></div') // Crea il contenitore
                       .addClass('container-fluid') // Assegna al contenitore il tipo fluid
                       .append($('<a></a>') // Crea l'elemento <a> per il titolo
                               .addClass('brand') // Assegnaci lo stile corretto
                               .attr('href', '#') // Fallo puntare a #
                               .html('Registro Elettronico') // Inserisci il contenuto
                               .click( function(event) { // Quando viene cliccato
                                    event.preventDefault(); // Non far niente
                                })
                       )
                       .append(nav_menu) // Aggiungici i links
               )
        )
        .prependTo( $('body') );
    $('#ctl00_mnuHor').hide(); // Nascondi la vecchia navbar
    
    /* Permetti al dropdown di aprirsi al passaggio del mouse */
    $('head').append('<style>ul.nav li.dropdown:hover > ul.dropdown-menu { display: block; margin-top: -5px; }</style>'); // Visualizza dropdown al passaggio del mouse
    $('head').append('<style>a.menu:after, .dropdown-toggle:after { content: none; }</style>'); // Rimuovi lo spazio tra dropdown e navbar
    
    /* Miglioro lo stile dei bottoni */
    $('button, input[type="submit"], input[type="button"]').removeAttr('style').addClass('btn'); // Applica la classe .btn ai bottoni
    
    /* Aggiungo la classe .container-fluid al body */
    $('#ctl00_ContentPlaceHolder1_pnlMain').addClass('container-fluid'); // Distanzia il contenuto dai bordi
    
    /* Converti il titolo in H1 */
    $('#ctl00_ContentPlaceHolder1_pnlMain > center').hide(); // Nascondi il vecchio titolo
    $('#ctl00_ContentPlaceHolder1_pnlMain').prepend( // Preponi l'elemento che si sta creando
        $('<h1></h1>') // Crea un H1
           .html( $('#ctl00_ContentPlaceHolder1_pnlMain > center > font > b').html() ) // Includici il vecchio titolo
           .css('margin-top', '5px') // Diminuisci il margin-top
           .css('font-weight', 'bold') // Rendilo grassetto
    );
    
    /* Migliora l'aspetto grafico dei bottoni */
    var bottoni = [
        { // Bottone "Esporta"
            id: '#ctl00_ContentPlaceHolder1_btnEsporta',
            icona: 'arrow-down'
        },
        { // Bottone "Visualizza"
            id: '#ctl00_ContentPlaceHolder1_btnVisualizza',
            icona: 'ok'
        },
        { // Bottone "Stampa"
            id: '#ctl00_ContentPlaceHolder1_btnStampa',
            icona: 'print'
        },
        { // Bottone "Voti Massimi"
            id: '#ctl00_ContentPlaceHolder1_btnVotiMassivi',
            icona: 'signal'
        },
        { // Bottone "Ok"
            id: '#ctl00_ContentPlaceHolder1_btnOk',
            icona: 'ok'
        }
    ];
    $.each(bottoni, function(i, info) { // Per ogni bottone originale (che in realtà è un'input[type="submit/button"]...)
        $('<button></button>') // Crea un nuovo bottone
        .addClass('btn') // Aggiungici uno stile
           .html( '<i class="icon icon-'+info.icona+'"></i> '+$(info.id).attr('value') ) // Inserisci il contenuto giusto
           .click( {id: info.id}, function(event) { // Quando il bottone viene cliccato (passando l'id dell'elemento da eseguire)
               $(event.data.id).trigger('click'); // Clicca il bottone originale
           })	          
           .insertAfter( $(info.id) ); // Inserisci dopo il bottone originale
       $(info.id).hide(); // Nascondi il bottone originale
    });
}

inizia(main); // Inizia