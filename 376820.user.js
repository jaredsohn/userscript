// ==UserScript==
// @name           amsParaVcard
// @namespace      http://portilho.com
// @version    	   0.1
// @description    gera um vCard com os dados do profissional
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        https://*.petrobras.com.br/buscaams/*
// ==/UserScript==

(function() {
		
    function geraVCard($btn) {
        var vcard = 'BEGIN:VCARD\n';
        var cols = []
        
        $btn.closest('tr')
        .find('td')
        .contents(':not(font)')
        .each(function(){ 
            cols.push( $(this).text().trim()
                      .replace(/\r?\n|\r/g,'') //remove line breaks
                      .replace(/\s{2,}/g, ' ')) //remove espaços duplos
        });
        
        console.log(cols);
        
        var nome = toTitleCase(cols[0])
        var bairro = toTitleCase(cols[4])
        var endereco = toTitleCase(cols[5])
        var cidade = toTitleCase(cols[7])
        var cep = cols[8]
        var telefone = cols[9]
        var especialidade = toTitleCase(cols[10])
        
        
        vcard += 'N:;'+ nome +';;;\n'
        vcard += 'ADR;;;WORK:;;'+ endereco + ';'+cidade+';;'+cep+';\n'
        vcard += 'TEL;WORK:'+ telefone +'\n'
        vcard += 'TITLE:'+ especialidade +'\n'
        vcard += 'END:VCARD'
        
        console.log(vcard);
        //gera conteudo para download
        var encodedUri = encodeURI("data:text/csv;charset=utf-8," + vcard);
        window.open(encodedUri);
    }
    
    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    
    $(document).ready(function() {
        $('table:eq(5) tr[bgcolor]').append('<td><button class="vcard" style="padding: 3px;background-color: forestgreen;color: whitesmoke;font-weight: bold;font-size: 11px;">vCard</button></td>');
        $(".vcard").bind('click', function(event) {geraVCard($(this));event.stopPropagation();event.preventDefault();});
    });
})();