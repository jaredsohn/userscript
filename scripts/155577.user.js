// ==UserScript==
// @name           Hootoh Nota Ringkas Widget
// @namespace      Hootoh Blog http://www.hootoh.my
// @description    Nota Ringkas Widget untuk Blogger
// @version        Edit version by Hootoh Tudia
// ==/UserScript==

var notepad={padHTML:'<div class="notepad"><span class="close" title="Close Notepad">X</span><h3 class="title">Nota Ringkas</h3>'
+'<p>Hootoh Nota Ringkas Widget 2013. Java eksperimen untuk Blogger</p>'
+'<form><!--noteHTML goes here--></form>'
+'</div>',noteHTML:'<fieldset><legend>Tajuk Nota:</legend>'
+'<input type="text" /><br />'
+'<b>Catatan:</b><br />'
+'<textarea></textarea>'
+'</fieldset>'
+'<a href="#" class="control save">Save</a>',zIndex:10,loadpad:function(id,position){var $=jQuery
function loadnote(){var notevalue=largestorage["notepad_"+id]
if(notevalue){notevalue=notevalue.split("|||")
$pad.find('.title').text(notevalue[0])
formfields.$subject.val(notevalue[0])
formfields.$content.val(notevalue[1])}}
function savenote(){$pad.find('.title').text(formfields.$subject.val())
largestorage["notepad_"+id]=formfields.$subject.val()+"|||"+ formfields.$content.val()}
function positionpad(x,y){var windowmeasure={w:$(window).width(),h:$(window).height(),left:$(document).scrollLeft(),top:$(document).scrollTop()}
var paddimensions={w:$pad.outerWidth(),h:$pad.outerHeight()}
var xpos=(x=="center")?windowmeasure.w/2-paddimensions.w/2:(x=="left")?10:(x=="right")?windowmeasure.w-paddimensions.w-25:parseInt(x)
var ypos=(y=="center")?windowmeasure.h/2-paddimensions.h/2:(y=="top")?10:(y=="bottom")?windowmeasure.h-paddimensions.h-25:parseInt(y)
xpos=xpos+windowmeasure.left
ypos=ypos+windowmeasure.top
$pad.css({left:xpos,top:ypos})}
if($('div#'+id).length==1||!window.localStorage&&!window.globalStorage){$('div#'+id).css({display:'block',visibility:'visible'})
return}
var $pad=$(this.padHTML).appendTo(document.body).attr('id',id).css({zIndex:this.zIndex})
var pad=$pad.get(0)
$(this.noteHTML).appendTo($pad.find('form:eq(0)'))
var padpos=position||['right','center']
positionpad(padpos[0],padpos[1])
var formfields={$subject:$pad.find('input[type="text"]:eq(0)'),$content:$pad.find('textarea:eq(0)')}
var buttons={$save:$pad.find('a.save')}
var largestorage=window.localStorage||(window.globalStorage?globalStorage[location.hostname]:{})
$pad.bind('keydown cut paste',function(e){var target=e.target
var $target=$(target)
if(target.tagName=="TEXTAREA"||(target.tagName=="INPUT"&&target.type=="text")){if(buttons.$save.css('opacity')!=1)
buttons.$save.css({opacity:1}).attr({title:'Click to Save Contents'}).text('Save')}})
$pad.bind('mousedown',function(e){var $startpos=$pad.offset()
$pad.css({zIndex:notepad.zIndex++})
$pad.bind('selectstart',function(){return false}).css('MozUserSelect','-moz-none').find('input, textarea').bind('selectstart',function(e){e.stopPropagation()}).css('MozUserSelect','text')
$pad.data({dragdata:{startpos:{left:$startpos.left,top:$startpos.top},startmousepos:{left:e.clientX,top:e.clientY}}})
$(document).bind('mousemove.dragpad mouseup.dragpad',function(e){if(e.type=="mousemove"){var startpos=$pad.data('dragdata').startpos
var startmousepos=$pad.data('dragdata').startmousepos
var dx=e.clientX-startmousepos.left,dy=e.clientY-startmousepos.top
$pad.css({left:startpos.left+dx,top:startpos.top+dy})}
else if(e.type=="mouseup"){$(document).unbind('mousemove.dragpad mouseup.dragpad')}})})
$pad.find('.close').bind('click',function(e){var padid=$(this).parents('.notepad').attr('id')
notepad.unloadpad(padid)})
$pad.find('form').bind('mousedown',function(e){e.stopPropagation()})
buttons.$save.click(function(e){buttons.$save.css({opacity:0.5}).attr({title:'Contents Saved'}).text('Saved')
savenote()
e.preventDefault()})
loadnote()
if(largestorage["notepad_"+id])
buttons.$save.css({opacity:0.5}).attr({title:'Contents Saved'}).text('Saved')},unloadpad:function(id){jQuery('div#'+id).remove()}}