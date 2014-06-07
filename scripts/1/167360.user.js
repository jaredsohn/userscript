// ==UserScript==
// @name        notepade
// @namespace   horizon
// @description Notizen
// @include     http://www.horiversum.de/game/main/*
// @include     http://www.horiversum.org/game/main/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// ==/UserScript==

/***********************************************
* Dynamic Countdown script- © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/
//http://www.dynamicdrive.com/dynamicindex17/html5notepad.htm

var style = ".notepad{color:black; border:1px solid gray;background:#444C56;box-shadow: 0 0 12px #818181;-webkit-box-shadow: 0 0 12px #818181;-moz-box-shadow: 0 0 12px #818181;width:280px;padding:7px 10px;position:absolute;cursor:pointer;}.notepad  h3{margin:5px 0;}.notepad .close{float:right;font-weight:bold;text-align:center;display:block;} .notepad form{margin:0;padding:0;} .notepad  form fieldset{margin-top:1em;} .notepad  form legend{font-weight:bold;}.notepad  form input[type=text]{width:98%;} .notepad  form textarea{width:98%;height:150px;} .notepad  form a.control{text-decoration: none;padding: 2px 20px;text-align:center;margin:5px 0;display:block;margin-top:5px;font:bold 13px Verdana;border: 1px solid #778;color: white;border:1px solid gray;background: green;border-radius: 8px; /*w3c border radius*/box-shadow: 3px 3px 4px rgba(0,0,0,.5); /* w3c box shadow */-moz-border-radius: 8px; /* mozilla border radius */-moz-box-shadow: 3px 3px 4px rgba(0,0,0,.5); /* mozilla box shadow */background: -moz-linear-gradient(center top, #7ad690, #3ec05c 25%, #298a40 45%, #3ec05c 85%, #7ad690);-webkit-border-radius: 8px; /* webkit border radius */-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,.5); /* webkit box shadow */background: -webkit-gradient(linear, center top, center bottom, from(#7ad690), color-stop(25%, #3ec05c), color-stop(45%, #298a40), color-stop(85%, #3ec05c), to(#7ad690));}  .notepad form  a.delete{background: darkred;background: -moz-linear-gradient(center top, #f5795d, #e55e3f 25%, #d02700 45%, #e55e3f 85%, #f5795d);background: -webkit-gradient(linear, center top, center bottom, from(#f5795d), color-stop(25%, #e55e3f), color-stop(45%, #d02700), color-stop(85%, #e55e3f), to(#f5795d));} .notepad:before{ /*top left tape effect*/content: '';position:absolute;width: 120px;height: 25px;border-left: 1px dashed rgba(0, 0, 0, 0.1);border-right: 1px dashed rgba(0, 0, 0, 0.1);background: rgba(0, 0, 0, 0.1);background: -webkit-gradient(linear, 555% 20%, 0% 92%, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.0)), color-stop(.1,rgba(0, 0, 0, 0.2)));background: -moz-linear-gradient(555% 0 180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.0));-webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);-webkit-transform:translate(-70px,0)skew(10deg,10deg)rotate(-50deg);-moz-transform:translate(-70px,0)skew(10deg,10deg)rotate(-50deg);-o-transform:translate(-70px,0)skew(10deg,10deg)rotate(-50deg);-ms-transform:translate(-70px,0)skew(10deg,10deg)rotate(-50deg);transform:translate(-70px,0)skew(10deg,10deg)rotate(-50deg);}"
GM_addStyle(style);

var notepad={
	padHTML:'<div class="notepad"><span class="close" title="Close Notepad">X</span><h3 class="title">Note Pad</h3>'
+'<form><!--noteHTML goes here--></form>'
+'</div>',

noteHTML:'<fieldset>'
+'<input type="text" /><br />'
+'<b>Note content:</b><br />'
+'<textarea></textarea>'
+'</fieldset>'
+'<a href="#" class="control save">Save</a>',

	zIndex:10,

	loadpad:function(id, position){
		var $=jQuery
		function loadnote(){ //private loadnote function
			var notevalue=largestorage["notepad_"+id]
			if (notevalue){
				notevalue=notevalue.split("|||")
				$pad.find('.title').text(notevalue[0])
				formfields.$subject.val(notevalue[0])
				formfields.$content.val(notevalue[1])
			}
		}
		function savenote(){ //private savenote function
			$pad.find('.title').text(formfields.$subject.val())
			largestorage["notepad_"+id]=formfields.$subject.val() + "|||" + formfields.$content.val() //save subject and content fields, separated by "|||"
		}
		function positionpad(x,y){ //private position function
			var windowmeasure={w:$(window).width(), h:$(window).height(), left:$(document).scrollLeft(), top:$(document).scrollTop()} //get various window measurements
			var paddimensions={w:$pad.outerWidth(), h:$pad.outerHeight()}
			var xpos=(x=="center")? windowmeasure.w/2-paddimensions.w/2 : (x=="left")? 10 : (x=="right")? windowmeasure.w-paddimensions.w-25 : parseInt(x)
			var ypos=(y=="center")? windowmeasure.h/2-paddimensions.h/2 : (y=="top")? 10 : (y=="bottom")? windowmeasure.h-paddimensions.h-25 : parseInt(y)
			xpos=xpos+windowmeasure.left 
			ypos=ypos+windowmeasure.top
			$pad.css({left:xpos, top:ypos})
		}
		if ($('div#'+id).length==1 || !window.localStorage && !window.globalStorage){ //if pad already exists on the page or browser doesn't support DOM Storage
			$('div#'+id).css({display:'block', visibility:'visible'})
			return
		}
		var $pad=$(this.padHTML).appendTo(document.body).attr('id', id).css({zIndex:this.zIndex})
		var pad=$pad.get(0)
		$(this.noteHTML).appendTo($pad.find('form:eq(0)'))
		var padpos=position || ['right','center']
		positionpad(padpos[0], padpos[1])
		var formfields={$subject:$pad.find('input[type="text"]:eq(0)'), $content:$pad.find('textarea:eq(0)')}
		var buttons={$save:$pad.find('a.save')}
		var largestorage=window.localStorage || (window.globalStorage? globalStorage[location.hostname] : {})
		$pad.bind('keydown cut paste', function(e){ //detect when keyboard, cut or paste action occurs inside form fields
			var target=e.target
			var $target=$(target)
			if (target.tagName=="TEXTAREA" || (target.tagName=="INPUT" && target.type=="text")){
				if (buttons.$save.css('opacity')!=1)
					buttons.$save.css({opacity:1}).attr({title:'Click to Save Contents'}).text('Save')
			}
		})
		$pad.bind('mousedown', function(e){ //add drag behavior to note pad
			var $startpos=$pad.offset()
			$pad.css({zIndex:notepad.zIndex++})
			$pad.bind('selectstart', function(){return false}).css('MozUserSelect', '-moz-none') //disable text selection inside note pad, except input and textarea elements
				.find('input, textarea').bind('selectstart', function(e){e.stopPropagation()}).css('MozUserSelect', 'text')
			$pad.data({dragdata:{startpos:{left:$startpos.left, top:$startpos.top}, startmousepos:{left:e.clientX, top:e.clientY}}})
			$(document).bind('mousemove.dragpad mouseup.dragpad', function(e){
				if (e.type=="mousemove"){
					var startpos=$pad.data('dragdata').startpos
					var startmousepos=$pad.data('dragdata').startmousepos
					var dx=e.clientX-startmousepos.left, dy=e.clientY-startmousepos.top
					$pad.css({left:startpos.left+dx, top:startpos.top+dy})
				}
				else if (e.type=="mouseup"){
					$(document).unbind('mousemove.dragpad mouseup.dragpad')
				}
			})
		})
		$pad.find('.close').bind('click', function(e){
			var padid=$(this).parents('.notepad').attr('id')
			notepad.unloadpad(padid)
		})
		$pad.find('form').bind('mousedown', function(e){ //exclude form area from drag event
			e.stopPropagation()
		})
		buttons.$save.click(function(e){ //action when "save" button is clicked on
			buttons.$save.css({opacity:0.5}).attr({title:'Contents Saved'}).text('Saved')
			savenote()
			e.preventDefault()
		})
		loadnote()
		if (largestorage["notepad_"+id]) //if note contains persisted data
			buttons.$save.css({opacity:0.5}).attr({title:'Contents Saved'}).text('Saved')
	},

	unloadpad:function(id){
		jQuery('div#'+id).remove()
	}
}

notepad.loadpad('general', ['right','50px']);