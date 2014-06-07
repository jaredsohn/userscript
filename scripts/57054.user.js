// ==UserScript==
// @name           Stack Overflow: Show Interesting
// @namespace      http://chuckharmston.com/stackoverflow
// @description    Adds a tab to the Stack Overflow navigation that filters out all questions that are not marked as interesting
// @include        http://stackoverflow.com/questions
// @include        http://stackoverflow.com/questions/
// @include        http://stackoverflow.com/questions*
// ==/UserScript==

function transmogrify(){
    jQuery('#tabs .youarehere').removeClass('youarehere');
    jQuery('#filter-interesting')
        .addClass('youarehere')
        .unbind('click')
        .bind('click', function(event){
            event.preventDefault();
        });
    jQuery('.question-summary:not(.tagged-interesting)').hide();
    jQuery('.tagged-interesting').removeClass('tagged-interesting');
    jQuery('#subheader h2').html('Interesting Questions');
}

function wait() {
	if(typeof jQuery != 'function') { 
		window.setTimeout(wait, 100); 
	} else { 
        jQuery('#tabs').append('<a id="filter-interesting" title="Only show questions tagged as interesting" href="#interesting">interesting</a>');
        if(window.location.hash == '#interesting'){
            transmogrify();
        }else{
            jQuery('#filter-interesting').bind('click', function(event){
                event.preventDefault();
                transmogrify();
            });
        }
	}
}

wait();