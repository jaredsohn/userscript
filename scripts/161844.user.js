// ==UserScript==
// @name        AniDB MyList Navigation
// @version     1.2.30
// @namespace   http://vk.com/seiya_loveless?#AniDB_MyList_Navigation.user.js
// @description New navigation for AniDB.net
// @include     http://anidb.net/perl-bin/animedb.pl?*show=mylist*
// @exclude     http://anidb.net/perl-bin/animedb.pl?*show=mylist*do=edit.state*
// @exclude     http://anidb.net/perl-bin/animedb.pl?*show=mylist*do=cmp*
// @exclude     http://anidb.net/perl-bin/animedb.pl?*show=mylist*do=mch*
// @grant       none
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @icon        http://static.anidb.net/favicon.ico
// @homepage	  http://userscripts.org/scripts/show/161844
// @updateURL	  https://userscripts.org/scripts/source/161844.meta.js
// @downloadURL	  https://userscripts.org/scripts/source/161844.user.js
// ==/UserScript==

/* removing old navigation */
$('ul.g_list .all').remove();
$('.0-9').remove();
for (i='a'.charCodeAt(0); i<='z'.charCodeAt(0); i++) { $('ul.g_list .'+String.fromCharCode(i)).remove(); }
$('ul.g_list .other').remove();
$('form ul.g_list').remove();
$('form table.animelist tr:last.action').remove();

/* main url */
var list_url ='http://anidb.net/perl-bin/animedb.pl?show=mylist'; //&uid=345411&char=0&page=0
/* url 2 vars */
function getUrlVars(){
var vars={};
var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){
vars[key]=value;});
return vars;}
/* get url vars */
var user_id=parseInt(getUrlVars()["uid"]);
var char_id=getUrlVars()["char"];
var page_id=parseInt(getUrlVars()["page"]);
/* get liststates */
var liststate_watching=parseInt(getUrlVars()["liststate.watching"]); //Currently Watching
var liststate_completed=parseInt(getUrlVars()["liststate.completed"]); //Completed
var liststate_stalled=parseInt(getUrlVars()["liststate.stalled"]); //On Hold
var liststate_dropped=parseInt(getUrlVars()["liststate.dropped"]); //Dropped
var liststate_collecting=parseInt(getUrlVars()["liststate.collecting"]); //Plan to Watch
var liststate_unknown=parseInt(getUrlVars()["liststate.unknown"]); //Recently Added
/* check active vars */
if(isNaN(user_id)){var user_url=''}else{var user_url='&uid='+user_id}
if(typeof char_id==='undefined'){var char_url=''}else{var char_url='&char='+char_id}
if(isNaN(page_id)){page_id=0}
var page_back_id=page_id-1;
var page_next_id=page_id+1;
/* check active vars for liststates */
if(isNaN(liststate_watching)){liststate_watching=0}
if(isNaN(liststate_completed)){liststate_completed=0}
if(isNaN(liststate_stalled)){liststate_stalled=0}
if(isNaN(liststate_dropped)){liststate_dropped=0}
if(isNaN(liststate_collecting)){liststate_collecting=0}
if(isNaN(liststate_unknown)){liststate_unknown=0}
/* urls for liststates */
//note: if<->else better?
if(liststate_watching==0){var liststate_watching_url=''}else{var liststate_watching_url='&liststate.watching=1'}
if(liststate_completed==0){var liststate_completed_url=''}else{var liststate_completed_url='&liststate.completed=1'}
if(liststate_stalled==0){var liststate_stalled_url=''}else{var liststate_stalled_url='&liststate.stalled=1'}
if(liststate_dropped==0){var liststate_dropped_url=''}else{var liststate_dropped_url='&liststate.dropped=1'}
if(liststate_collecting==0){var liststate_collecting_url=''}else{var liststate_collecting_url='&liststate.collecting=1'}
if(liststate_unknown==0){var liststate_unknown_url=''}else{var liststate_unknown_url='&liststate.unknown=1'}
//all liststates - liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url+

/* check vars */
//alert(user_id);
//alert(char_id);
//alert(page_id);
//alert(page_back_id);
//alert(page_next_id);

/* list states navigation */
$('ul.g_list').append('<li><a href="'+list_url+user_url+'">All Anime</a></li>');
$('ul.g_list').append('<li><a href="'+list_url+user_url+'&liststate.watching=1">Watching</a></li>');
$('ul.g_list').append('<li><a href="'+list_url+user_url+'&liststate.completed=1">Completed</a></li>');
$('ul.g_list').append('<li><a href="'+list_url+user_url+'&liststate.stalled=1">On Hold</a></li>');
$('ul.g_list').append('<li><a href="'+list_url+user_url+'&liststate.dropped=1">Dropped</a></li>');
$('ul.g_list').append('<li><a href="'+list_url+user_url+'&liststate.collecting=1">Plan to Watch</a></li>');
$('ul.g_list').append('<li><a href="'+list_url+user_url+'&liststate.unknown=1">Recently Added</a></li>');

/* prev - next */
if($('ul.g_list li.prev').hasClass('selected')){
	$('ul.g_list li.prev').html('Prev');
}
else{
	if(page_back_id==0){page_back_url=''}else{page_back_url='&page='+page_back_id}
	$('ul.g_list li.prev').html('<a href="'+list_url+user_url+liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url+char_url+page_back_url+'">Prev</a>');
}
if($('ul.g_list li.next').hasClass('selected')){
   $('ul.g_list li.next').html('Next');
}
else{
	page_next_url='&page='+page_next_id;
	$('ul.g_list li.next').html('<a href="'+list_url+user_url+liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url+char_url+page_next_url+'">Next</a>');
}

/* add navigation mod */
$('ul.g_list').after('<div id="js-nav-mod"></div>');
$('#js-nav-mod').css({'margin-bottom':'10px','text-align':'center'});

/* all anime */
$('#js-nav-mod').append('<a href="'+list_url+user_url+liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url+'">All</a>');
$('#js-nav-mod').append('<a href="'+list_url+user_url+liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url+'&char=0">#</a>');

for( j='a'.charCodeAt(0); j<='z'.charCodeAt(0); j++ ){
$('#js-nav-mod').append('<a href="'+list_url+user_url+liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url+'&char='+String.fromCharCode(j)+'">'+String.fromCharCode(j).toUpperCase()+'</a>');
}

/* css */
$('#js-nav-mod a').css({'padding':'2px 4px','margin':'0px 2px','border':'1px double white','border-color':'#C9D7F1 #97AACC #97AACC #C9D7F1','border-radius':'5px','font-size':'11px'});

/* menu loader end */
//alert('Menu loading complete');