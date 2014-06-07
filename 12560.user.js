// ==UserScript==
// @name           immonet.morgenpost.helper
// @namespace      http://www.314bits.com
// @description    Allow writing comments and hiding properties in this real estate web site.
// @include        http://immonet.morgenpost.de/search*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://www.314bits.com/experiments/is24js/jquery.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
			//make sure there is no conflict between jQuery and other libraries
			$.noConflict()

			// this regExp grabs the property ID
			re = /object_id=(\d+)/ 
			
			// we look for A tags inside B tags that include a link, with the text object_id
			// and we execute this function for each A
			$('B A[@href*="object_id"]').each(function(i){
				// grab the ID
				found = re.exec(this.href);
				var id = found[1];
				
				// read stored info (visibility and comment for this property)
				var visible = GM_getValue("vis_"+id, "visible");
				var comment = GM_getValue("com_"+id, "");
				
				// append the hide button and comment textarea
				$('SPAN[A[@href*="object_id=' + id +'"][@href*="addedToMemoList"]]').append(
					'<input id="abe_hide_' + id + 
					'" type="button" class="abe_hide" style="border:1px solid #EEE; margin-left:10px; margin-bottom:1px;" value="hide"><br/>' + 
					'<textarea id="abe_ta_' + id + 
					'" class="abe_ta" style="border:1px solid #EEE; padding:3px; height:30px; width:260px;">' + 
					comment + '</textarea>');
				
				// add a new row (TR) containing a show button for hidden properties
				$('B[A[@href*="object_id=' + id +'"]]').parent().parent().parent().next().
					after('<tr style="background-color:#EEE;"><td/><td colspan="3"><input id="abe_show_' + id + '" type="button" class="abe_show" value="show" style="border:1px solid #BBB; margin-right:10px;"></td></tr>');				
				
				// if the property should be hidden, hide three rows and show the 'show' button
				// otherwise, show three rows and hide the 'show' button.
				if (visible == "hidden") {
					$('B[A[@href*="object_id=' + id +'"]]').parent().parent().parent().hide().next().hide().next().show();				
				} else {
					$('B[A[@href*="object_id=' + id +'"]]').parent().parent().parent().show().next().show().next().hide();									
				}
				// write the comment after the 'show' button (so we see the reason why a property is hidden)
				$('#abe_show_'+id).after(comment);
			});
			
			// event: when we change the comment on the textarea
			$('.abe_ta').change(function() { 
				var id = this.id.substr(7);
				// save the comment
				GM_setValue("com_"+id, this.value);
				// update the comment behind the show button (oops: bug, it will keep appending!)
				$('#abe_show_'+id).after(this.value);
			});
			// event: click the hide button
			$('.abe_hide').click(function() {
				var id = this.id.substr(9);
				// save the hidden state
				GM_setValue("vis_"+id, "hidden");
				// hide three rows, show the 'show' button
				$('B[A[@href*="object_id=' + id +'"]]').parent().parent().parent().hide().next().hide().next().show();
			});
			// event: click the show button
			$('.abe_show').click(function() {
				var id = this.id.substr(9);
				// save the shown state
				GM_setValue("vis_"+id, "visible");
				// show three rows, hide the 'show' button
				$('B[A[@href*="object_id=' + id +'"]]').parent().parent().parent().show().next().show().next().hide();
			});
    }