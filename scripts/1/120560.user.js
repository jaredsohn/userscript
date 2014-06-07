// ==UserScript==
// @name           Tatoeba Sentence Diff
// @namespace      Jakob V. <jakov@gmx.at>
// @description    Shows the changes in the sentence history (Hover an element to compare the other elements to it)
// @include        http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://tatoeba.org/*/sentences/show/*
// @include        http://tatoeba.org/*/sentences/show/*
// @require        http://code.jquery.com/jquery-1.6.js
// @require        http://kccode.googlecode.com/svn/trunk/source/javascript/diff/source/js/diff_match_patch_uncompressed.js
// ==/UserScript==

//http://www.ke-cai.net/2010/05/tracking-change-with-google-diff-match.html

(function(jQuery) {
	jQuery.fn.clickoutside = function(callback) {
		var outside = 1, self = $(this);
		self.cb = callback;
		this.click(function() { 
			outside = 0; 
		});
		$(document).click(function() { 
			outside && self.cb();
			outside = 1;
		});
		return $(this);
	}
})(jQuery);

$(document).ready(function(){
	var logs = $('#logs');
	reacttomouseenter = true;
	$changes = $('#logs,.comments').find('.sentenceAdded,.sentenceModified').sort(function(a, b){ //compatibility for Tatoeba Sentence Timeline
		return $(a).prevAll(".sentenceAdded,.sentenceModified").length - $(b).prevAll(".sentenceAdded,.sentenceModified").length;
	});
	console.info('$changes=',$changes);
	
	if($changes.length>1){
		wait = false;
		$changes.bind("mouseenter click", function(event){
			if(event.type=="click"){
				reacttomouseenter = false;
			}
			if(!wait && (reacttomouseenter||event.type=="click")){
				$(this).find('.text').hide();
				reference = $(this).find('.text:first');
				reference.show();
				reference.parentsUntil('.annexeLogEntry').parent().css({'outline':(reacttomouseenter ? '1px dashed #998778':'1px solid #998778')});
				$(this).find('.difftext').hide();
				$changes.not($(this).get(0)).each(function(){
					compareto = $(this).find('.text:first');
					var dmp = new diff_match_patch();
					dmp.Diff_Timeout = 1;
					var d = dmp.diff_main(reference.text(), compareto.text());
					dmp.diff_cleanupSemantic(d);
					var ds = dmp.diff_prettyHtml(d);
					replace = ( $(this).find('.difftext').is('*') ? $(this).find('.difftext').show() : $('<span class="text difftext"></span>') );
					replace.html(ds).show();
					replace.find('del').css({'color':'red'});
					replace.find('ins').css({'color':'green'});
					compareto.parentsUntil('.annexeLogEntry').parent().css({'outline':'none'});
					compareto.hide();
					compareto.after(replace);
				});
				wait = true;
				window.setTimeout(function() {  
					wait = false;
				}, 1); 
			}
		});
		$changes.bind("mouseleave", function(event){
			if(event.type=="dblclick"){
				reacttomouseenter = true;
				
			}
			if(!wait && reacttomouseenter){
				$(this).find('.text').hide();
				reference = $(this).find('.text:first');
				reference.show();
				reference.parentsUntil('.annexeLogEntry').parent().css({'outline':(reacttomouseenter ? '1px dashed #998778':'1px solid #998778')});
				$(this).find('.difftext').hide();
				$changes.each(function(){
					compareto = $(this).find('.text:first');
					var dmp = new diff_match_patch();
					dmp.Diff_Timeout = 1;
					var d = dmp.diff_main(reference.text(), compareto.text());
					dmp.diff_cleanupSemantic(d);
					var ds = dmp.diff_prettyHtml(d);
					replace = ( $(this).find('.difftext').is('*') ? $(this).find('.difftext').show() : $('<span class="text difftext"></span>') );
					replace.html(ds).show();
					replace.find('del').css({'color':'red'});
					replace.find('ins').css({'color':'green'});
					compareto.parentsUntil('.annexeLogEntry').parent().css({'outline':'none'});
					compareto.after(replace);
					compareto.hide();
					if($(this).parent().is('.comments')){ //compatibility for Tatoeba Sentence Timeline
						reference = compareto;
					}
				});
			}
			wait = true;
			window.setTimeout(function() {  
				wait = false;
			}, 1); 
		});
		$changes.clickoutside(function(){
			reacttomouseenter = true;
			$(this).mouseleave();
		});
		$changes.filter(':first').mouseleave();
	}
});