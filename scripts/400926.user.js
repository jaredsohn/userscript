// ==UserScript==
// @name           TPT Textile inputs
// @description    Preprocesses TPT forum posts with your favourite markup processor.
// @version        0.5
// @match          http://powdertoy.co.uk/Discussions/Thread/*
// ==/UserScript==

var TYPE = 'textile'
  , configurations = {
    'textile': {
      src: 'http://boxmein.x10.mx/ext/js/textile.js',
      func: 'window.textile'
    },
    'markdown': {
      src: 'http://boxmein.x10.mx/ext/js/markdown.min.js',
      func: 'window.markdown.toHTML'
    }
  }
  , parser = document.createElement("script");

// Javascript source for parser code
parser.src = configurations[TYPE].src;
document.body.appendChild(parser); 

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();';
  }

  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function() {
  
  var TYPE = 'textile'
    , configurations = {
      'textile': {
        src: 'http://boxmein.x10.mx/ext/js/textile.js',
        func: 'window.textile'
      },
      'markdown': {
        src: 'http://boxmein.x10.mx/ext/js/markdown.min.js',
        func: 'window.markdown.toHTML'
      }
    }
    , DELAY = 1
    , reloadDelay = DELAY
    , $resultsbox = $('<div id="liveprev_f7ac10f4"></div>')
    , $messagebox = $('#AddReplyMessage')
    , $submitbutton = $('#AddReplyPost') 
    , updateParse = window.updateParse = function() {
      $resultsbox.html(
        eval(
          configurations[TYPE].func
        )(
          $messagebox.val()
        )
      );
    };

  /* EditPost.html support */
  if ($messagebox.length == 0 || $submitbutton.length == 0) {
    $messagebox = $('.OtherF .EditPlain');
    $submitbutton = $('.SubmitF .btn.btn-primary');
    $resultsbox.css({overflow: 'scroll'});
  }

  $resultsbox.css({
    backgroundColor: 'white',
    borderColor: '#F0F0F0',
    width: '770px',
    height: '150px',
    margin: '3px',
    borderRadius: '3px'
  });
  
  $messagebox.after($resultsbox);

  // reset reloading for a bit
  $messagebox.keyup(function() { 
    reloadDelay = DELAY; 
  }); 

  // let's preview it live after like #{DELAY} seconds of inactivity
  setTimeout(function tick(){
    // console.log('updating', configurations[TYPE].func, eval(configurations[TYPE].func));
    if (reloadDelay-- == 0)
      updateParse();
    setTimeout(tick,1000);
  }, 1000);
  
  // tap into the flow of sending a reply, and quickly parse the html
  // ..before they click it
  $submitbutton.click(function(evt) { 
    updateParse();
    $messagebox.val(
      $resultsbox.html()
    ); 
  }); 
  $submitbutton.hover(function(){updateParse()});

  console.log('input processor is now hooked!', TYPE, configurations[TYPE].src, configurations[TYPE].func);
  console.log($submitbutton, $messagebox, $resultsbox);
});