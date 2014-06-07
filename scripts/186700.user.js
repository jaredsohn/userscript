// ==UserScript==
// @name        Preview Button for PMs
// @namespace   Selbi
// @include     http*://*fimfiction.net/manage_user/messages/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


var previewButton = '<a class="styled_button styled_button_blue" href="javascript:void(0);" id="preview_comment"><i class="fa fa-eye"></i> Preview Reply</a></div></div></form>';
var previewBox = '<div id="comment_preview" class="hidden" style="border-top:1px solid #BBB;"></div><script>$(document).on( "click", "#preview_comment", function( e ){$.post(\'/ajax/preview_comment.php\',{ "comment" : $("#comment_comment").val( ) },function(xml){$("#comment_preview").html( $( "comment", xml ).text( ) );$("#comment_preview").fadeIn( );} );} );</script>';

$(".add_comment_toolbar .comment_processing").before(previewButton);
$(".add_comment_toolbar").after(previewBox);