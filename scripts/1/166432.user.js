// ==UserScript==
// @name         JV - JV Chat +
// @namespace    Naptu
// @description  Propose trois nouvelles options pour JV Chat (récupération des messages privés, possibilité de changer de pseudo, possibilité de changer de skin) 
// @include      http://www.jeuxvideo.com/jvchat*
// ==/UserScript==

$(function() {
    // Préparation du localStorage
    if(!localStorage.jvChatPlus)
        localStorage.jvChatPlus = '{}';
    
    // Du CSS, pour les box et leur contenu
    $('head').append(
        $('<style />', {
            type: 'text/css',
            id: 'CssJvChatPlus',
            text: 'div[id^="box"] { display: none; background: #FFF;border: 1px solid #797979;border-top: none!important;padding: 5px;font: 12px Open Sans;position: fixed;top: 0;border-radius: 0 0 9px 9px;left: 25px;right: 25px;z-index: 456445484844848;box-shadow: 0 0 60px #000;width: 600px;margin: auto; }'+ 
                  '.dest { float: right; margin-right: 6px; }'+
                  '.ligne_mp { min-height: 16px; border-bottom: 1px solid #C7C7C7; margin: 0px -9px -11px -9px; padding: 2px 11px 7px 11px; }'+
                  '.ligne_mp a { float: left; display: block; clear: right; margin-left: 5px; }'+
                  '.ligne_mp a:not(.lu) { font-weight: 700!important; }'+
                  '#box_mp { overflow:hidden!important; max-height: 300px; }'+
                  '.titreBox { display: block; background: url(http://image.noelshack.com/fichiers/2013/27/1372630378-bg-box.png) repeat; margin: -5px -5px 5px -5px; padding: 6px; border-bottom: 1px solid #BEBEBE; }'+
                  '#lienBR { position: absolute; bottom: 0px; background: #D3D3D3; left: 0; right: 0; padding: 4px; border-top: 1px solid #BDBDBD; }'+
                  '#lienBR:hover { background: #CCC; }'+
                  '#lienBR > a { display: block; color: #475F6D!important; }'+
                  'input[type="text"], input[type="password"] { border-radius: 2px!important; padding: 2px!important; border: 1px solid #BEBEBE!important; }'+
                  '#box_pseudo input { display: block; margin-left: auto; margin-right: auto; }'+
                  '#label_cc img { border: 1px solid #B4B4B4; border-radius: 2px; padding: 0 26px; margin-right: 0px; padding-left: 27px!important; }'+
                  '#box_pseudo input { font: 13px Open Sans; }'+
                  '#box_pseudo > div > img { position: absolute; top: 35px; right: 7px; display: none; }'+
                  '#box_selectSkin div div { display: inline-block; padding: 10px; margin: -3px; }'+
                  '.fermerBox { opacity: 0.5; position: absolute; right: 10px; top: 4px; }'+
                  '.fermerBox:hover { opacity: 0.9; }'+
                  '#box_selectSkin select { max-width: 79px; }'
        })
    );
    
    // Objet principal, dont les propriétés directes deviendront ensuite des identifiants HTML, ce qui justifie la présence des underscores ("mp" tout court existe déjà, par exemple)
    var options = {
        _mp: {
            raccClavier: 'M',
            text: 'mp (0)',
            titre: 'Messages privés',
            go: function() {
                var callee = arguments.callee, curseurSurBox = false;
                
                // On stoppe l'AJAX lorsque le curseur de souris est sur la box, autrement, il faudrait cliquer plusieurs fois sur un lien pour qu'il fonctionne
                $('#box_mp').on({
                    mouseenter: function() { curseurSurBox = true;  },
                    mouseleave: function() { curseurSurBox = false; }
                }); 
                
                if(document.cookie.indexOf('tehlogin') === -1 || curseurSurBox) {
                    setTimeout(callee, 1000); 
                    return;                
                }
                
                // On stockera l'intégralité des MPs reçus dans une div cachée, pour la simple et bonne raison que l'HTML est plus simple à manier que du texte en brut
                if(!$('#mpsOriginaux').is('*')) {
                    $('body').prepend(
                        $('<div />', {
                            id: 'mpsOriginaux',
                            css: {display: 'none'}
                        })
                    );
                }
                
                // Mise à jour du nombre de MPs non lus, dans le bouton de la zone de post + mise à jour des MPs dans la box
                setTimeout(function() { 
                   $.get(
                        'http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php',
                        false,
                        function(r) {
                            $('#_mp').text($('#_mp').text().replace(/\d+/, r.nb_message));
                        },
                        'JSON'
                    );
                    
                    $.get(
                        'http://www.jeuxvideo.com/messages-prives/boite-reception.php',
                        false,
                        function(r) {     
                            var html = '';
                            
                            if(r.indexOf('Vous n\'avez aucun message dans la boîte de réception.') > -1 || (r.match(/<a href="http:\/\/www\.jeuxvideo\.com\/messages-prives\/message\.php/g).length === r.match(/<a.+?class="lu"/g).length))
                                html = 'Vous n\'avez aucun message non lu dans la boîte de réception.';
                            else if (r.indexOf('Vous tentez d\'accéder à un espace privé, qui nécessite d\'être inscrit et connecté à Jeuxvideo.com') > -1)
                                html = 'Veuillez vous connecter.';
                            else {   
                                $('#mpsOriginaux').html(r.split('cellspacing="1" summary="">')[1].split('</table>')[0]);
                                $('#mpsOriginaux a:not(.lu)').each(function() {
                                    $(this).attr('target', '_blank');
                                    html += '<div class="ligne_mp">'+ $(this).wrapAll('<a></a>').parent().html() +'<span class="dest">'+ $(this).parent().parent().prev().text() +'</span></div><br />';                                                                  
                                });
                            }
                            
                            $('#box_mp > div').html('<div style="padding-bottom: 14px!important;">'+ html +'</div><div id="lienBR"><a target="_blank" href="http://www.jeuxvideo.com/messages-prives/boite-reception.php">Boîte de réception</a></div>');
                        },
                        'text'
                    );
                    
                    setTimeout(callee, 2000);
                }, 1000);                
            }
        },
        
        _pseudo: {
            raccClavier: 'P',
            text: 'changer de pseudo',  
            titre: 'Changer de pseudo',
            go: function() { 
                $('#box_pseudo > div')
                .html(
                    $('<form />', {
                        html: '<input type="text" id="inputPseudo" placeholder="Pseudo">'+
                              '<input type="password" id="inputPass" placeholder="Mot de passe">'+
                              '<button type="submit" id="connex" class="bbtn">Connexion</button>',
                        submit: function(e) {
                            e.preventDefault();
                            
                            // Ces variables ne deviennent utiles qu'en cas d'erreurs liées à la présence d'un code de confirmation
                            var tk, session, code;
                            
                            if($('#_code').is('*')) {
                                tk = $('#_tk').val();
                                code = $('#_code').val();
                                session = $('#_session').val();
                            }  
                            
                            $.post(
                                'http://www.jeuxvideo.com/profil/ajax_connect.php',
                                {
                                    pseudo: $('#inputPseudo').val(),
                                    pass: $('#inputPass').val(),
                                    retenir: 1,
                                    tk: tk,
                                    session: session,
                                    code: code                                    
                                },
                                function(r) {
                                    // Suppression des éléments d'erreurs, pour ne pas qu'ils se dédoublent en cas d'erreurs consécutives
                                    if($('#_code').is('*'))
                                        $('#label_cc, #_tk, #_code, #_session').remove();
                                    
                                    // operation = 0 ==> OK
                                    if(r.operation == 0) {
                                        $('head').append(
                                            $('<style />', {
                                                type: 'text/css',
                                                text: '.pseudo a[title="'+ $('#inputPseudo').val().toLowerCase() +'"] { color: #09F!important; }'
                                            })
                                        );
                                        
                                        $('#inputPseudo, #inputPass').val('');
                                        
                                        $('#succesLog').fadeIn();
                                        
                                        setTimeout(function() {
                                            $('#succesLog').fadeOut({
                                                complete: function() {
                                                    $('#box_pseudo').slideUp('slow', function() {
                                                        $('#area').focus();
                                                    });
                                                }
                                            });
                                        }, 1000);
                                        
                                    // operation =/= 0 ==> ERREUR
                                    } else {
                                        $('#erreurLog').fadeIn();
                                        
                                        setTimeout(function() {
                                            $('#erreurLog').fadeOut();
                                        }, 2000);
                                        
                                        // operation = 101 ==> MAUVAISE COMBINAISON PSEUDO/PASS, operation =/= 101 => CODE DE CONFIRMATION 
                                        if(r.operation != 101) {
                                            $('#connex')
                                           .before(
                                               $('<label />', {
                                                   'for': '_code',
                                                   id: 'label_cc',
                                                   html: r.code_captsha
                                               }) 
                                           )
                                          .before(
                                               $('<input>', {
                                                   type: 'text',
                                                   id: '_code',
                                                   maxlength: '4',
                                                   autocomplete: 'off',
                                                   placeholder: 'Code'
                                               })
                                           )
                                           .before(
                                               $('<input>', {
                                                   type: 'hidden',
                                                   id: '_tk',
                                                   value: r.tk.toString().replace(/"/g, '')
                                               })
                                           )
                                           .before(
                                               $('<input>', {
                                                   type: 'hidden',
                                                   id: '_session',
                                                   value: r.session
                                               })
                                           );                                            
                                        }                                        
                                    }
                                }, 
                                'JSON'
                            );
                        }
                    })
                )
                .prepend(
                    $('<img>', {
                        id: 'erreurLog',
                        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAIAAAA2kktGAAAACXBIWXMAAAsSAAALEgHS3X78AAAAZklEQVR42mP4TwRgGBBFr44fvxkaeo6X9wwDAxABGUAuUBCh6MWOHXBpZAQUBEqBFAGVY1UBVwdUwAA0FsKHmIzJBipggBuDSxFQAYrhyD5CFidOEVHWEeVwooKAqMAkNloGW3oCAAmm+5w1a7LtAAAAAElFTkSuQmCC',
                    })
                )
                .prepend(
                    $('<img>', {
                        id: 'succesLog',
                        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAIAAAA2kktGAAAACXBIWXMAAAsSAAALEgHS3X78AAAAz0lEQVR42mP48/fPPyTwHxtgwJT49fsnEP3+/ROh6D8RAKro5bvHlx4fn3myvu9wIRABGUDu6w/PEIqAKpr2JRvPZEBDQMGff36AFAFVlO0OwVQBRB9/vIMYwbDkXB8eFY4LhIAKGIJXauBSkbbZAcgGKoCKWs7hmHmmAagPyN55ZzlQxeqr0+B6oBTEgUCy43AWkAE0CdlghEnIAYPmBoSbgNZBVACtQ1YBchPcdxDDgDYCGciKQL5DDifMAAOKgMIJf4gDpQjEHVmpgF6KAIxF+DYUcyjIAAAAAElFTkSuQmCC',
                    })                    
                );
            }
        },
        
        _selectSkin: {
            raccClavier: 'S',
            text: 'skin pokémon',
            titre: 'Choisir un skin',
            go: function() {
                if(!$('#skinCss').is('*'))
                    $('head').append(
                        $('<style />', {
                            type: 'text/css',
                            id: 'skinCss'
                        })
                    );
                
                // Retourne le CSS lié au skin, le dernier argument est destiné à contenir du CSS en brut, ça peut toujours servir
                function skin(bgPost, bdTopPost, bgTab, bdTab, colorTab, bgMsg, bdMsg, aHov, areaBd, autre) {
                    var css = '#post { background:'+ bgPost +'; border-top: 1px solid '+ bdTopPost +'; }'+
                    '#tabs li.tab_visible { background: '+ bgTab +'; border: 1px solid '+ bdTab +'; color: '+ colorTab +'; }'+
                    '.msg1 .message { background: '+ bgMsg + '; border: 1px solid '+ bdMsg +'; }'+
                    '#options a:hover { color:'+ aHov +'; }'+
                    '#area { border: 1px solid '+ areaBd +'; }';
                    
                    if(autre)
                        css += autre;
                    
                    return css.replace(/;/g, '!important;');
                }
                
                // La répartition par génération, c'était vraiment une excellente idée
                var skins = {
                    g1: {
                          roucarnage: skin('url(http://image.noelshack.com/fichiers/2013/34/1377106791-roucarnage.jpg) -14px -168px', '#000', '#7E7455', '#3A3A3A', '#271F0E', '#EBEBEB', '#C2C2C2', '#5A540D', '#000')
                        , magicarpe: skin('url(http://image.noelshack.com/fichiers/2013/34/1377079290-magicarpe.png) -14px -255px', '#575757', '#8B8B8B', '#5E5E5E', '#2E0707', '#DDD', '#BEBEBE', '#D82300', '#A2A2A2')
                        , aquali: skin('url(http://image.noelshack.com/fichiers/2013/34/1376936906-aquali.jpg) -61px -111px', '#4C7AA3', '#60E1FA', '#06C9C1', '#15807B', '#CEEBF8', '#74D4E7', '#08B8DA', '#469494')
                        , voltali: skin('url(http://image.noelshack.com/fichiers/2013/34/1376995472-voltali.jpg) -155px -305px', '#3D6F1C', '#FFEE6F', '#CA9F5D', '#646419', '#E8FFDD', '#B8FFB5', '#389912', '#729C32')
                        , pyroli: skin('url(http://image.noelshack.com/fichiers/2013/34/1376994301-pyroli.jpg) -14px -121px', '#6F1C1C', '#FD7C53', '#FD8952', '#A53B12', '#FFD0BA', '#FFBC96', '#FF5C00', '#94561C')                       
                    },
                    g2: {
                          mentali: skin('url(http://image.noelshack.com/fichiers/2013/34/1377017590-mentali.jpg) -292px -379px', '#398852', '#C3FFDE', '#35CFB7', '#1D8D72', '#E7FFF4', '#8CFFC8', '#B432AF', '#2CAA78')
                        , tyranocif: skin('url(http://image.noelshack.com/fichiers/2013/34/1377090599-tyra.jpg) -38px -108px', '#000', '#BBB', '#777', '#076D65', '#E6FFD8', '#D8D8D8', '#535353', '#1E5520')
                    },
                    g3: {
                          absol: skin('url(http://image.noelshack.com/fichiers/2013/34/1377016536-absol.jpg) -345px -351px', '#0F6151', '#AEC5FF', '#6F9DFF', '#0C536F', '#E7E8FF', '#B5D3FF', '#19649E', '#8B9FA5')
                        , latios: skin('url(http://image.noelshack.com/fichiers/2013/34/1377112332-latios.jpg) -13px -236px', '#141414', '#4E95EE', '#1C69BB', '#0C4368', '#D8FFF1', '#A2E0FD', '#0E4D86', '#272727')
                    }, 
                    g4: {
                        
                    },
                    g5: {
                        
                    },
                    g6: {
                          feunnec: skin('url(http://image.noelshack.com/fichiers/2013/34/1377024404-feunnec.png) 0 -313px', '#BE4212', '#FFB896', '#F5844F', '#B4180A', '#FFF5E7', '#FFD0BE', '#DF7019', '#AC4D35')
                        , 'mega-lucario': skin('url(http://image.noelshack.com/fichiers/2013/34/1377081688-megalucario.jpg) -57px -168px', '#575452', '#22D3E2', '#00A0A7', '#07777C', '#E0FFFE', '#90E4FF', '#AF2323', '#5E5E5E')
                        , 'mega-mewtwo': skin('url(http://image.noelshack.com/fichiers/2013/34/1377091406-pokemon-mewtwo-new-forme-by-mark331-d61derq.jpg) -39px -89px', '#310041', '#FDE0F6', '#6B00A7', '#6D0754', '#FDF4FC', '#F5BEFF', '#7D31CF', '#8A8A8A')
                        , 'mega-brasegali': skin('url(http://image.noelshack.com/fichiers/2013/34/1377103107-brasegali.jpg) -15px -149px', '#383533', '#FD9A58', '#E46501', '#7C3F07', '#FFF8DB', '#FFD3A3', '#974C07', '#5C340F')
                        , yveltal: ''
                        , xerneas: skin('url(http://image.noelshack.com/fichiers/2013/33/1376855900-xerneas1.jpg)', '#519261', '#96D9FF', '#4DA2FD', '#0A70B4', '#E7FDFF', '#BED8FF', '#0E9132')
                    }
                };
                
                // Mise en place des <option> dans les <select> adéquats + mise en mémoire du skin choisi
                $.each(skins, function(generation, pokemons) {
                    $('#box_selectSkin > div')
                    .append(
                        $('<div />')
                        .append(
                            $('<h5 />', {
                                text: generation.replace(/g(\d)/, 'Génération $1')
                            })
                        )
                        .append(
                            $('<select />', {
                                id: generation,
                                change: function() {
                                    var json = JSON.parse(localStorage.jvChatPlus);
                                        json.skin = $(this).val();
                                    localStorage.jvChatPlus = JSON.stringify(json);
                                
                                    $('#skinCss').html(pokemons[$(this).val()]);
                                }
                            })
                        )
                    );
                    
                    
                    $.each(pokemons, function(pokemon, css) {
                        $('#'+ generation).append(
                            $('<option />', {
                                text: pokemon.replace(new RegExp(pokemon.charAt(0)), pokemon.charAt(0).toUpperCase()),
                                value: pokemon
                            })
                        );
                    });
                    
                    var json = JSON.parse(localStorage.jvChatPlus);
                    if(json.skin)
                        setTimeout(function() {
                            $($('#box_selectSkin option[value="'+ json.skin +'"]').parent()).val(json.skin).trigger('change');
                        }, 500);
                });
            }
        }
    }
    
    // eventTermine est un booléen, il empêche la mise en place d'événements plus d'une fois (sauf pour les raccourcis clavier, puisque c'est nécessaire)
    function demarrer(eventTermine) {
        if(!$('#options').is('*'))
            // On relance la fonction tant que JV Chat n'est pas encore chargé
            setTimeout(function() {
                demarrer(false);
            }, 500);
        else
            // On navigue dans l'objet principal pour créer les box et lancer les fonctions
            $.each(options, function(id, obj) {
                $('body').prepend(
                    $('<div />', {
                        id: 'box'+ id
                    })
                    .append(
                        $('<h1 />', {
                            'class': 'titreBox',
                            text: obj.titre
                        })
                    )
                    .append(
                        $('<img>', {
                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAQAAAADHm0dAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABUAAAAVAHF8yDUAAABtSURBVCjP5ZLBCcAwCEWfHSXDBEeSjJRZMkNXSQ9pS2wgpMdSPYj8h35EqazGtkx+FxUkCndG8WztEqWQTsEoqFNdA+mErdUZ2uB8TZ+jkCnk0d54ASOwE7BBeUy1zqvNDLy6gHYL1avy+yc8APGFa375gR00AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==',
                            'class': 'fermerBox',
                            click: function() {
                                $(this).parent().slideUp('slow');
                            }
                        })
                    )
                    .append($('<div />'))
                );
                
                if(!eventTermine)
                    $('#area').on('focus', function(e) {
                        $('.fermerBox').trigger('click'); 
                    });
                
                // Raccourcis clavier
                $(document).on('keydown', function(e) {
                    if(!e.ctrlKey)
                        return;
                    else                    
                        if(e.keyCode !== 17 && String.fromCharCode(e.keyCode) === obj.raccClavier.toUpperCase()) {
                            $('#'+ id).trigger('click');
                            e.preventDefault();
                        }
                });
                
                eventTermine = true;
                
                $('#options').prepend(
                    $('<a />', {
                        id: id,
                        href: '#',   
                        text: obj.text.toLowerCase(),
                        click: function(e) {
                            e.preventDefault();
                            
                            $('.fermerBox').trigger('click');
                            
                            ($('#box'+ id).css('display') === 'block')
                            ? $('#box'+ id).slideUp('slow')
                            : $('#box'+ id).slideDown('slow');
                        }
                    })
                );
                
                obj.go();
            });
    } demarrer(false);
});