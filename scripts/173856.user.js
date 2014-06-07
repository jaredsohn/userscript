
// ==UserScript==
// @id             powdertoy.co.uk-f7ac10f4-5ccd-4504-94e8-60ac371ac11a@boxmein.web44.net
// @name           TPT Markdown inputs
// @version        1.1.4
// @namespace      boxmein.web44.net
// @author         boxmein
// @description    Makes an addition to TPT forum's comment text box for a 'semi-WYSIWYG' textbox via Markdown. Some tags might not work!
// @match          http://powdertoy.co.uk/*
// @run-at         document-end
// ==/UserScript==


// Needed for Markdown.js
var markdownjs = document.createElement("script"); 
markdownjs.src = "http://boxmein.x10.mx/ext/js/markdown.min.js"; 
document.body.appendChild(markdownjs); 

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();';
  }

  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function() {
  var newtext = document.createElement('div'), 
      refreshing = 10;
  
  newtext.id = 'liveprev_f7ac10f4';
  // sorry for the mess of code - I recovered it from a closure-compiled script

  function getSelectionHtml(){
    var a='';
    if('undefined'!=typeof window.getSelection){
      var c=window.getSelection();
      if(c.rangeCount){
        for(var a=document.createElement('div'), b=0, d=c.rangeCount; b<d; ++b)
          a.appendChild(c.getRangeAt(b).cloneContents());
        a=a.innerHTML
      }
    }
      else 
        'undefined' != typeof document.selection && 
        'Text' == document.selection.type && 
        ( a = document.selection.createRange().htmlText );
    return a;
  }
  newtext.style = 'background-color: white; border-color: #F0F0F0; width: 770px; height: 150px; margin: 3px; border-radius: 3px; overflow: scroll;';

  function insertAfter(referenceNode, newNode) { 
    console.log('appending...'); 
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling); 
    insertAfter(document.getElementById('AddReplyMessage'), newtext);

    document.getElementById('AddReplyMessage').onkeyup = function() { 
      refreshing = 10; 
    }; 

    setInterval(function() { 
      if (refreshing > 0) { 
        refreshing -= 1; 
        document.getElementById('liveprev_f7ac10f4').innerHTML = 
          markdown.toHTML(document.getElementById('AddReplyMessage').value)
        } 
      }, 1000);
    
    $('#AddReplyPost').click(function(evt) { 
      $('#AddReplyMessage').val($('#liveprev_f7ac10f4').html()); 
    }); 
  }
});   