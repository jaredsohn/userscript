// ==UserScript==
// @name       Improve Reply Box
// @namespace  
// @version    0.5
// @description  Adds some new functionality to the post editor on the WotC online forums
// @match      http://community.wizards.com/go/post/reply/*
// @copyright  2013+, Glasir
// ==/UserScript==

function main() {
    // get rid of the old editor
    tinyMCE.execCommand('mceRemoveControl', false, tinyMCE.editors[0].id);
    
	var plugins = 'safari,media,inlinepopups,spellchecker,emotions,custom_smilies,paste,spoilers,-magicdeck,fullscreen,autosave,table';
	var baseURL = 'http:community.wizards.com';
	var defaultSmilies = {"cool":"smiley-cool","cry":"smiley-cry","embarrassed":"smiley-embarassed","foot in mouth":"smiley-foot-in-mouth","frown":"smiley-frown","innocent":"smiley-innocent","kiss":"smiley-kiss","laughing":"smiley-laughing","money mouth":"smiley-money-mouth","sealed":"smiley-sealed","smile":"smiley-smile","surprised":"smiley-surprised","tongue out":"smiley-tongue-out","undecided":"smiley-undecided","wink":"smiley-wink","yell":"smiley-yell"};
	
	var tinyMCERow1Buttons = "bold,italic,underline,strikethrough,separator,justifyleft,justifycenter,justifyright,justifyfull,formatselect,bullist,numlist,outdent,indent,fullscreen";
	var tinyMCERow2Buttons = "link,unlink,anchor,separator,undo,redo,cleanup,code,separator,sub,sup,charmap,media,spellchecker,emotions,custom_smilies,image,forecolor,magicdeck,spoilers";
    var tinyMCERow3Buttons = "";
		
	var Smiley = {
		// Insert a smiley image into the input text.
		insertImage : function (file, title, ed) {
			tinyMCE.execCommand('mceInsertContent', false, ed.dom.createHTML('img', {
				'src'      : '/tools/tiny_mce/plugins/emotions/img/' + file,
				'_mce_src' : baseURL + '/tools/tiny_mce/plugins/emotions/img/' + file,
				'class'    : 'oneSmileyImg',
				'alt'      : title,
				'title'    : title,
				'border'   : 0
			}));
			
		},
		// Add a button to the TinyMCE interface.
		addButton : function (smiley_img, smiley_name, ed) {
			var smiley_path = "/tools/tiny_mce/plugins/emotions/img/";
			ed.addButton(smiley_name, {
				title   : smiley_name,
				image   : smiley_path + smiley_img,
				onclick : function() {
					Smiley.insertImage(smiley_img, smiley_name, ed);
				}
			});
		}
	};
	
	tinyMCE.init({
		setup : function(ed) {
			// Add a button to TinyMCE interface for each default smiley.
			for (var key in defaultSmilies) {
				if (defaultSmilies.hasOwnProperty(key)) {
					var smiley_src = defaultSmilies[key] + ".gif";
					Smiley.addButton(smiley_src, key, ed);
				}
			}
            
            // convert some html to [*] tags, this makes external editing nicer
            ed.onBeforeSetContent.add(function (ed, o) {
                o.content = o.content.replace(/<strong>(.*?)<\/strong>/g, '[b]$1[/b]')
                					 .replace(/<em>(.*?)<\/em>/g, '[i]$1[/i]')
                	               .replace(/<span style="text-decoration: underline;">(.*?)<\/span>/g, '[u]$1[/u]')
                                              
            });
		},
		
		skin: "onesite",
		mode : "textareas",
		editor_deselector : "mceNoEditor",
		theme : "advanced",
        theme_advanced_resizing: true,
        theme_advanced_statusbar_location: 'bottom',
        
		relative_urls: false,
		apply_source_formatting: true,
		theme_advanced_toolbar_location : "top",
		theme_advanced_buttons1 : tinyMCERow1Buttons,
		theme_advanced_buttons2 : tinyMCERow2Buttons,
		theme_advanced_buttons3 : tinyMCERow3Buttons,
		valid_elements : "*[*]",
		plugins : plugins,
		
        convert_newlines_to_brs: true,
        force_br_newlines : true,
		forced_root_block : '',
		force_p_newlines  : false,
		paste_auto_cleanup_on_paste: true,
        convert_urls: false
	});

	tinymce.PluginManager.load('magicdeck', 'http://community.wizards.com/go/tinyMce/magicdeck');
}





// Everything below this line is annoying boilerplate to get the script to
// start only after the editor box has finished loading and initializing.






function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

function waitForEditor() {
    if (tinyMCE.editors.length == 0) {
        //console.log('waiting for editor');
        setTimeout(waitForEditor, 100);
    } else if (!tinyMCE.editors[0].initialized) {
        //console.log('waiting for initialization');
        setTimeout(waitForEditor, 100);
    } else {
        main();
    }
}

contentEval('main = ' + main);
contentEval(waitForEditor);