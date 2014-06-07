// ==UserScript==
// @name           resolver_redirecter
// @namespace      linkresolver.hit-u.ac.jp
// @include        *ver=Z39.88-2004*
// @include        http://sfx4.usaco.co.jp/hit*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require        http://www.lib.hit-u.ac.jp/global/js/exquerystring_1_0.js
// ==/UserScript==

jQuery(function($){
var param = $.ex.queryString();
// var url0 = location.search;
var url0 = location.search.replace(/rfr_id=info.+?&/gi,"rfr_id=info:sid/resolver_redirecter&");

if ( param['ctx_ver'] ) { 
if ( param['rft_dat'] ) { var ciniinaid = param['rfe_dat'].replace(/naid%2f/,"http://ci.nii.ac.jp/naid/") }
	else { ciniinaid = "" }; 

if ( param['rft.aulast'] ) { var sei = param['rft.aulast'] }
	else { sei = "" }; 
if ( param['rft.aufirst'] ) {var mei =  param['rft.aufirst']}
	else { mei = ""};
//var authorfull = param['rft.aulast'] + param['rft.aufirst'];
var authorfull = sei + mei;

var citation =  '<a href="' +ciniinaid + '">' + decodeURIComponent(authorfull) + ', 「' + decodeURIComponent(param['rft.atitle']) + '」('+ decodeURIComponent(param['rft.date']) + ')『' + decodeURIComponent(param['rft.jtitle']) + '』' + decodeURIComponent(param['rft.volume']) + '(' + decodeURIComponent(param['rft.issue']) + '), pp.' + decodeURIComponent(param['rft.spage']) + '-' + decodeURIComponent(param['rft.epage']) + '</a>';

$("#advanced_target_list_container").before(citation);
}

portal=[
	{"base":"http://vs2ga4mq9g.search.serialssolutions.com/","name":'東大'},
	{"base":"http://nw5sg2bn2y.search.serialssolutions.com/","name":'鹿児島大'},
	{"base":"http://qp4wz6vz5k.search.serialssolutions.com/","name":'千葉大'},
	{"base":"http://mx9kp2xn4f.search.serialssolutions.com/","name":'中央大学'},
	{"base":"http://sfx4.usaco.co.jp/kanazawa","name":'金沢大学'},
	{"base":"http://sfx.nul.nagoya-u.ac.jp/nagoya","name":'名古屋大学'},
	{"base":"http://tt2mx4dc7s.search.serialssolutions.com/","name":'京都大学'},
	{"base":"http://sfx.usaco.co.jp/osaka","name":'大阪大学'},
	{"base":"http://sfx.usaco.co.jp/kobe","name":'神戸大学'},
	{"base":"http://te8rl7nq6r.search.serialssolutions.com/","name":'九州大学'},
	{"base":"http://fukui.1cate.com/","name":'福井大学'},
	{"base":"http://search.tulips.tsukuba.ac.jp:70/sfx","name":'筑波大学'},
	{"base":"","name":''},
	{"base":"","name":''}
	];
	
for(i in portal)$("#advanced_target_list_container,#RefinerLink3,.foot").before('<br /><a href="' + portal[i]['base'] + url0 + '">' + portal[i]['name'] + '</a>');

});
