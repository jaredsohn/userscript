// ==UserScript==
// @name       Edit grades
// @namespace  http://facebook.com/bernam92
// @version    0.1
// @description Edita suas notas no sistema do aluno da UVA.
// @match      http://www4.uva.br/NetStudent/ExtratoNotas.aspx
// @copyright  2013, Bernardo Menescal Conde Mariano
// @require    http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
$('body').prepend('<div id="edit-grades-loading">');
$('div#edit-grades-loading').css({
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 1
});
$(function(){
    var tabela_notas = $('#ctl00_ctl00_PrincipalContentPlaceHolder_PrincipalContentPlaceHolder_ctl03_PanelResultado');
    function geraNota (nota) {
        var nota_int = nota=='--'?5:parseInt(nota);
        return '<span style="color:'+ (nota_int>=5?'black':'red') +'">' + nota + '</span>';
    }
    function linha (n) {
        return 'table:eq(2) tr:eq('+ (n+1) +') td:eq(2)';
    }
    
    // Altere a partir daqui, de acordo com a linha que está a matéria:
    

    tabela_notas.find( linha(1) ).html( geraNota('10') );

    tabela_notas.find( linha(2) ).html( geraNota('10') );

    tabela_notas.find( linha(3) ).html( geraNota('10') );

    tabela_notas.find( linha(4) ).html( geraNota('10') );

    tabela_notas.find( linha(5) ).html( geraNota('10') );

    tabela_notas.find( linha(6) ).html( geraNota('10') );

    tabela_notas.find( linha(7) ).html( geraNota('10') );
    


    $('div#edit-grades-loading').remove();
});