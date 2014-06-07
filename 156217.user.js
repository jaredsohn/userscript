// ==UserScript==
// @name        Tumblr - What am I uploading?
// @namespace   fix_submit
// @description fix FF mac file submits
// @include     *tumblr.com/new/photo*
// @include     *tumblr.com/blog/*/new/photo*
// @include     *tumblr.com/edit/*
// @version     1
// ==/UserScript==

window.toRight = function(){
	$('edit_post').getInputs('file').each(function(file){
		if(typeof(file.parentNode.select('div[class="file_able"]')[0])=='undefined'){
			var FF_file = new Element('div');
			FF_file.addClassName('file_able');
			file.parentNode.insert(FF_file);
			Event.observe(file, 'change', function(){
				this.parentNode.select('div[class="file_able"]')[0].update(this.getValue())
			});
		}
	});
}
Event.observe($('photo_type_bar'), 'click', function(event){window.toRight()});
window.toRight();