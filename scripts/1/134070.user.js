// ==UserScript==
// @name                Cerberus Time-since Row Colouring
// @author              David Duke, Luke Mulholland-Helme-Kelsall
// @namespace   		http://www.nublue.co.uk
// @description 		Looks for ATTR tags and their title parameter, and then calculates the time difference between Now and the timestamps. The parent table row then has an appropraite CSS class added to it based on the time difference calculated.
// @include             https://mailroom.nublue.co.uk/pages/2-Hosting_Support*
// @grant       		none
// ==/UserScript==
$ = unsafeWindow.$
var script = document.createElement('script');
script.src = 'http://www.datejs.com/build/date.js';
var btn = document.createElement('input');
var btn2 = document.createElement('input');
var div = document.createElement('div');
var div2 = document.createElement('div');
var div3 = document.createElement('div');
with( btn ) {
			setAttribute( 'id', 'highlighton' );
			setAttribute( 'type', 'button' );
			setAttribute( 'value', 'On' );
			}
with( btn2 ) {
			setAttribute( 'id', 'highlightoff' );
			setAttribute( 'type', 'button' );
			setAttribute( 'value', 'Off' );
			}
with( div ){
			setAttribute( 'id', 'highhead' );
			}
with( div2 ){
			setAttribute( 'id', 'high_count' );
			}
with( div3 ){
			setAttribute( 'id', 'highback' );
			}
document.getElementsByTagName('head')[0].appendChild(script);
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btn );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btn2 );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( div );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( div2 )
document.getElementsByTagName( 'body' )[ 0 ].appendChild( div3 )
$('#highback').css({"position":"fixed","top":"0px","right":"0px","width":"150px","height":"45px","background-color":"#ffffff","border-radius":"5px","border-color":"#000000","border-width":"2px","border-style":"solid"});
$('#high_count').css({"position":"fixed","top":"5px","right":"80px","z-index":"999"});
$('#highhead').css({"position":"fixed","top":"5px","right":"5px","z-index":"999"});
$('#highhead').html("<b>Traffic Light</b>");
$('#highlightoff').css({"position":"fixed","top":"20px","right":"5px","width":"30","-webkit-box-shadow":"rgba(0, 0, 0, 0.199219) 0px 1px 0px 0px","background-color":"#FA2","border-radius":"5px","border-bottom-color":"#333","border":"none","box-shadow":"rgba(0, 0, 0, 0.199219) 0px 1px 0px 0px;","z-index":"999"});
$('#highlightoff').click(highlight_off);
$('#highlighton').css({"position":"fixed","top":"20px","right":"40px","width":"30","-webkit-box-shadow":"rgba(0, 0, 0, 0.199219) 0px 1px 0px 0px","background-color":"#FA2","border-radius":"5px","border-bottom-color":"#333","border":"none","box-shadow":"rgba(0, 0, 0, 0.199219) 0px 1px 0px 0px;","z-index":"999"})
$('#highlighton').click(highlight_on);
$('#high_count').html("<font size='1'><b>Urgent: <br>Warning: </br>Updated: <br></b></font>");
function highlight_on(){
	var green_count = 0;
	var yellow_count = 0;
	var red_count = 0;
	$('td:nth-child(3) abbr').each(function(index){
		var _then = unsafeWindow.Date.parse($(this).attr('title'));
		var _now = new unsafeWindow.Date().getTime();
		_then = _then.getTime();
		var a_minute = 60000;
		if(_now < _then + (a_minute*30)){
			$(this).closest('tr').css("background-color","#CCFF99");
			green_count++;
			} else if(_now < _then + (a_minute*60)){
			$(this).closest('tr').css("background-color","#FFFF99");
			yellow_count++;
			} else {
			$(this).closest('tr').css("background-color","#FFBBBB");
			red_count++;
			}
		});
	$('#high_count').html("<font size='1'><b>Urgent: "+red_count+"<br>Warning: "+yellow_count+"</br>Updated: "+green_count+"<br></b></font>");
}
function highlight_off(){
	$('td:nth-child(3) abbr').each(function(index){
			$(this).closest('tr').css("background-color","#FEFEFE");
	});
	$('#high_count').html("<font size='1'><b>Urgent: <br>Warning: </br>Updated: <br></b></font>");
}