// ==UserScript==
// @name           toggle youtube comments
// @namespace      meh
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @version        1
// ==/UserScript==
if(top!=self) return;
const COMM = '#watch-discussion';
var tries = 0;
var timerCreate, timerWait;

document.addEventListener(
	'click',
	function(){
		tries=0;
		setTimeout(waitComments,1000)
	},
	false
)

$('head').append('<style type="text/css" id="css_togglecommentsss">')

if(GM_getValue('hide')){
	$('#css_togglecommentsss').html(COMM+'{opacity: 0 !important;}');
}

waitComments()

function waitComments(){
	if($('#divvv').length > 0 || (tries++) >= 5 )
		return;
	if($(COMM).length==0){
		clearTimeout(timerWait)
		timerWait = setTimeout(waitComments,1000)
		//GM_log('waiting comments')
	}else{
		//GM_log('loaded new comments')
		clearTimeout(timerWait)
		clearTimeout(createDiv)
		timerCreate = setTimeout(createDiv,1000)
	}
	//GM_log('try #'+tries)
}

function createDiv(){
	clearTimeout(createDiv)
	clearTimeout(timerWait)
	$(COMM).before(
		$('<div id="divvv">')
			.html('Toggle comments')
			.css({textAlign:'center',width:'100%',fontSize:'11px',padding:'2px',backgroundColor:'#f2f2f2',color:'#555555',cursor:'pointer', marginTop:13, fontWeight:'bold', padding:'5px 0'})
			.click(function(evt){
				if(GM_getValue('hide')==true){
					$('#css_togglecommentsss').html('');
					GM_setValue('hide',false)
				}else{
					$('#css_togglecommentsss').html(COMM+'{opacity: 0 !important;}');
					GM_setValue('hide',true)
				}
			})
	);
}