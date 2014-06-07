	

    // ==UserScript==
    // @name        Marmelos 55ch
    // @namespace   55ch
    // @include     http://55ch.org/b/*
    // @version     1.1
    // @grant       none
    // @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
    // ==/UserScript==
     
    var words = ['>mcq', '4chan', 'anime', 'ateu', 'ateia', 'ateísmo', 'ateísta', 'BRchan', 'cristã', 'cristão', 'cristianismo', 'Dilma', 'ENEM', 'filtro', 'filtros', 'fio', 'foda', 'foda-se', 'fode', 'hétero', 'holocausto', 'Lula', 'mara', 'melhor horário', 'minha namorada', 'minha pitanga', 'mulher', 'mulheres', 'namorada', 'negra', 'negro', 'negros', 'Olavo', 'Olavo de Carvalho', 'Orkut', 'perguntem qualquer coisa', 'preto', 'punk', 'rateiem', 'Sakura', 'sentimento', 'Serra', 'sexo', 'sexo anal', 'sexo oral', 'skinhead', 'suicidio', 'trap', 'travesti', 'underage', 'VT'];
     
    $(document).ready(function() {
        hook_form();
        display_enabled();
    });
     
    // Exibe mensagem informando que filtro está habilitado abaixo do nome da board
    function display_enabled()
    {
        var css = {
            'display': 'block',
            'font-size': '12px',
        }
        var msg = $('<span>Burlador de filtros habilitado.<br/>Desenvolvido por: anão.</span>')
        $('.logo').append(msg);
        msg.css(css);
    }
     
    // Hook no submit do form
    function hook_form()
    {
        var form = $('#postform');
     
        form.submit(function(e) {
            replace_words();
        });
    }
     
    // Substituir palavras
    function replace_words()
    {
        var new_word,
            length,
            re,
            textarea = $('textarea[name="message"]'),
            text = textarea.val();
           
        $.each(words, function(index, value) {
            re = new RegExp(value, 'gi');
            matches = text.match(re, new_word);
            if (matches)
            {
                $.each(matches, function(index, v) {
                    length = v.length;
                    new_word = v.substring(0, length-1) + '\u200b' + v.substring(length-1, length);
                    re = new RegExp(v, 'g');
                    text = text.replace(v, new_word);
                });
            }
        });
        textarea.val(text);
    }

