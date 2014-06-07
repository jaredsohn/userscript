// ==UserScript==
// @name           Set default field `from` in gmail web ui when you have several ones
// @namespace      Settings
// @description    it selects default value for `from` email field

// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

function main() {

	var Settings = {
		//
		// There are config values that can be changed
		//
		// accessible values - correct email included in select `from`
		// note: There should be only email (without name)
		// for instance: yuriless@gmail.com, mary@hotmail.com, carl@mail.ru etc.
		default_email: "yuriless@gmail.com",
		// If dropbox or email in drop box are not found script show notify about issue. Accessible values: `true` or `false`
		show_error: true
	};

	var canvas_frame;
	if (null != window.parent) {
		canvas_frame = window.parent.parent.document.getElementById("canvas_frame");
	} else {
		canvas_frame = document.getElementById("canvas_frame");
	}
	if (!canvas_frame) {
		return;
	}
	
	var iframe_document = null;
	
	if(canvas_frame.contentDocument){
    	iframe_document = canvas_frame.contentDocument;
	}else if(canvas_frame.contentWindow){
		iframe_document = canvas_frame.contentWindow.document;
	}else{
		iframe_document = canvas_frame.document;
	}

	$(iframe_document).find('div').live('mouseup', function(){
		main();
	});

	for (var i = 0; i < iframe_document.forms.length; i++) { // finding all forms of document
		$form = $(iframe_document.forms[i]);
		$el = $form.find('select[name=from]');
		if ($el.size()) {
			if (1 == $el.data('is_value_changed')) {
				return;
			}
			$opt = $el.find('option[value="' + Settings.default_email + '"]');
			if ($opt.size()) {
				$el.find('option').removeAttr('selected');
				$opt.attr('selected', 'selected');
			} else if(Settings.show_error) { // @TODO: add "this.show_error"
				alert("Error: email `"+this.default_email+"` is not found in `from` select field")
			}
		}
	}
	
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(main);

	