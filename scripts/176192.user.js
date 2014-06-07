// ==UserScript==
// @name           Strims.pl - newComments
// @namespace      strims_newcomments
// @downloadurl    http://userscripts.org/scripts/source/176192.user.js
// @updateurl      http://userscripts.org/scripts/source/176192.meta.js 
// @description    Pokazuje ile nowych komentarzy od ostatniej wizyty pojawiło się w treści
// @include        *strims.pl*
// @version        1.7
// ==/UserScript==
// zwiększa licznik o 1, gdy dodamy nowy komentarz
function new_comment(){
    var button = $(".buttons_bar button.content_comments_form_submit.button");
    button.click( function(){
        var get = JSON.parse(localStorage.getItem( "strims_" + window.location.pathname ));
        var arr = new Array(parseInt(get[0])+1, get[1]);
        localStorage.setItem( "strims_" + window.location.pathname, JSON.stringify(arr) );
    });
}
// czy jestesmy w tresci
function is_topic(){
    var url = window.location.pathname;
    var reg = url.match(/\/([t])\/([0-9a-zA-Z]+)/g);
    
    if( reg ){
        return true;
    }
        
    return false;
}
// pobiera ilosc komentarzy z tresci
function get_comments_topic(){
    if( is_topic() ){
        var comments = $("#content_comments h3.border").text();
        var reg = comments.match(/\d+/);
        var date = new Date();
        date.setDate(date.getDate() + 7);
        var date_return = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        var arr = new Array( reg, date_return);
        return JSON.stringify(arr);
    }
    
    return false;
}
// aktualna data
function actual_date(){
	var date = new Date();
	return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
}
// pobiera ilosc komentarzy kazdego ze znalezisk na stronie, porownuje daty i ilosc komentarzy, wyswietla roznice
function get_comments_strim(){
    var string = $(".content_info_actions li a.bold");
    var strings = string.map( function(){
        var href = "strims_" + $(this).attr("href");
        var get = JSON.parse(localStorage.getItem( href ));
        var match = parseInt($(this).text().match(/\d+/));
        var result = match - get[0];
        var date = actual_date();
        if( get != null )
		if( get[1] > date ){
		     if(  result != 0 ){
			  $('<span />')
			      .html( "(" + result + " nowych)" )
			      .css({ 'color' : 'orangered' })
			      .appendTo( $(this) );
		     }
		} else {
			localStorage.removeItem( href );
		}
    })
}
function main(){
    new_comment();
    
    if( is_topic() == true ){
        localStorage.setItem( "strims_" + window.location.pathname, get_comments_topic() );
    } else
        get_comments_strim();
}

main();