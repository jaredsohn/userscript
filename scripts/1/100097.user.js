// ==UserScript==
// @name           Delete stuck posts
// @namespace      onyxstone
// @description    Delete stuck posts
// @include        http://www.stumbleupon.com/favorites/reviews/*
// ==/UserScript==


$ = unsafeWindow.$;

$( 'ul.listStumble li.listLi').prepend('<input type="button" class="deleteStuckPost" value="delete" />');

$( '.deleteStuckPost' ).bind('click',remove);


function remove( e ) {
w = $(e.target).parent('li.listLi');
        var f="/ajax/delete/favorite"
 o=w.children("var").attr("class");
 var h=$("#wrapperContent").attr("class");
var A=w.children("var").attr("id");
$.post(f,{commentid:A,publicid:o,token:h},success);
}

function success(data, textStatus, jqXHR) {
  alert( 'deleted' );
  window.location.reload();

}