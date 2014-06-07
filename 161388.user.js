// ==UserScript==
// @name           eRepublik Emoticons
// @namespace      http://www.erepublik.com/*/article/*
// @description    Add emoticons for eRepublik comments.
// @author		   Riccardo Quarta
// @version        1.0.0.0
// @include        http://www.erepublik.com/*/article/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js
// ==/UserScript==

	$ = jQuery = jQuery.noConflict(true);
	
	var fag=' <img src="http://i.imgur.com/NsrY1.gif" class="emoticons" name="fag"></img> ';
	var sisi=' <img src="http://i.imgur.com/Ko1LZ.gif" class="emoticons" name="sisi"></img> ';
	var snob=' <img src="http://i.imgur.com/6h6Ge.gif" class="emoticons" name="snob"></img> ';
	var look=' <img src="http://i.imgur.com/qJmfF.gif" class="emoticons" name="look"></img> ';
	var facepalm=' <img src="http://i.imgur.com/UAuMG.gif" class="emoticons" name="facepalm"></img> ';
	var asd=' <img src="http://i.imgur.com/HswDx.gif" class="emoticons" name="asd"></img> ';
	var rotfl=' <img src="http://i.imgur.com/x2W9h.gif" class="emoticons" name="rotfl"></img> ';
	var uhm=' <img src="http://i.imgur.com/gbtXE.gif" class="emoticons" name="uhm"></img> ';
	var rulez=' <img src="http://i.imgur.com/fceHs.gif" class="emoticons" name="rulez"></img> ';
	var lul=' <img src="http://i.imgur.com/j2zwx.gif" class="emoticons" name="lul"></img> ';
	var awesome=' <img src="http://i.imgur.com/1cvz5.gif" class="emoticons" name="awesome"></img> ';
	var caffe=' <img src="http://i.imgur.com/0np2G.gif" class="emoticons" name="caffe"></img> ';
	var vojo=' <img src="http://i.imgur.com/BJRxj.gif" class="emoticons" name="vojo"></img> ';
	
	var aid='';
	
	var aryClassElements = getElementsByClassName( 'holder', document.body );
	for ( var i = 0; i < aryClassElements.length; i++ ) {
			aid=aryClassElements[i].innerHTML;
			//----- emoticons
			aid=aid.replace(/:fag:/g,'<img src="http://i.imgur.com/NsrY1.gif"></img>')
			aid=aid.replace(/:sisi:/g,'<img src="http://i.imgur.com/Ko1LZ.gif"></img>')
			aid=aid.replace(/:snob:/g,'<img src="http://i.imgur.com/6h6Ge.gif"></img>')
			aid=aid.replace(/:uhlol:/g,'<img src="http://i.imgur.com/IzFX2.gif"></img>') //*
			aid=aid.replace(/:facepalm:/g,'<img src="http://i.imgur.com/UAuMG.gif"></img>')
			aid=aid.replace(/:rulez:/g,'<img src="http://i.imgur.com/fceHs.gif"></img>')
			aid=aid.replace(/:look:/g,'<img src="http://i.imgur.com/qJmfF.gif"></img>')
			aid=aid.replace(/:rotfl:/g,'<img src="http://i.imgur.com/x2W9h.gif"></img>')
			aid=aid.replace(/:uhm:/g,'<img src="http://i.imgur.com/gbtXE.gif"></img>')
			aid=aid.replace(/:asd:/g,'<img src="http://i.imgur.com/HswDx.gif"></img>')
			aid=aid.replace(/:lul:/g,'<img src="http://i.imgur.com/j2zwx.gif"></img>')
			aid=aid.replace(/:awesome:/g,'<img src="http://i.imgur.com/1cvz5.png"></img>')
			aid=aid.replace(/:caffe:/g,'<img src="http://i.imgur.com/0np2G.gif"></img>')
			aid=aid.replace(/:vojo:/g,'<img src="http://i.imgur.com/BJRxj.gif"></img>')		
			aid=aid.replace(/:facecin:/g,'<img src="http://i.imgur.com/INFDw.gif"></img>') //*
			//-----
			aryClassElements[i].innerHTML=aid;
	}
	
	//Add emoticons in nested replies
	$('.reply_comments_btn').click(function(){
		var $par = $(this).parents('.comment-content').find('[id^=textarea_reply_]');
		$('.emoticons').click(function(){
			$par.val($par.val() + ':'+$(this).attr('name')+':');
			$par.focus();
		});
	});
	
	//Add emoticons in standard reply
	$('#article_comment').click(function(){
		$par = $(this);
		$('.emoticons').click(function(){
			$par.val($par.val() + ':'+$(this).attr('name')+':');
			$par.focus();
		});
	});
	
	//Append list of emoticons near to Comments tab
	$(".tabs").append('<li>Emoticons:' + fag + sisi + snob + look + facepalm + asd + rotfl + uhm + rulez + lul + awesome + caffe + vojo +'</li>');
	
	function getElementsByClassName( strClassName, obj ) {
		var ar = arguments[2] || new Array();
		var re = new RegExp("\\b" + strClassName + "\\b", "g");

		if ( re.test(obj.className) ) {
			ar.push( obj );
		}
		for ( var i = 0; i < obj.childNodes.length; i++ )
			getElementsByClassName( strClassName, obj.childNodes[i], ar );
		
		return ar;
	}