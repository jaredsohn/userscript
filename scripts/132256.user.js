// ==UserScript==
	// @name                tumblr tags
        // @namespace	        http://tumblr.com/
	// @description	        auto insert base tags for tumblr posts
	// @include		http://www.tumblr.com/tumblelog/new/photo*
        // ==/UserScript==

	var base_tags = ['suicidegirl', 'Photography', 'pinup', 'suicidegirls', suicidegirls.com', 'tattoos', 'tattoo'];
                
        base_tags.forEach(function(tag) { 
            insert_tag(tag); 
        });

        tag_editor_update_form();