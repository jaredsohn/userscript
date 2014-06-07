// ==UserScript==
// @name        Zope Python Script ACE Editor
// @namespace   zope
// @description Use ACE to edit python scripts
// @include     */manage_main
// @include     */ZPythonScriptHTML_editForm
// @include     *
// @version     2
// @require http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js
// @require http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/mode-python.js
// @require http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/mode-xml.js
// @require http://code.jquery.com/jquery-1.8.3.js
// @grant       none
// ==/UserScript==

// Python script
var textarea = $('textarea[name="body:text"]');
if (textarea.length) {
  $('<div id="editor">')
      .css({"position": "relative", "height": "300px"})                                
      .appendTo(textarea.parent());                                                    
  textarea.hide();                                

  var editor = ace.edit("editor");
  editor.getSession().setMode("ace/mode/python");                                       
  editor.getSession().setTabSize(2);

  editor.getSession().setValue(textarea.val());
  editor.getSession().on('change', function(){
   textarea.val(editor.getSession().getValue());
  });

  editor.commands.addCommand({
      name: "save",
      bindKey: {win: "Ctrl-S", mac: "Command-S"},
      exec: function() {
        $('input[value="Save Changes"]').click();
        // TODO: make an ajax request, so that we don't loose the focus
      } 
  });


} else {
  // Page templates
  var textarea = $('textarea[name="text:text"]');
  if (textarea) {
    $('<div id="editor">')
        .css({"position": "relative", "height": "300px"})                                
        .appendTo(textarea.parent());                                                    
    textarea.hide();                                

    var editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/xml");                                       
    editor.getSession().setTabSize(2);

    editor.getSession().setValue(textarea.val());
    editor.getSession().on('change', function(){
     textarea.val(editor.getSession().getValue());
    });
  };
};
