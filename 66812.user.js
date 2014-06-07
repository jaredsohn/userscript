// ==UserScript==
// @name 8tracks keyboard shortcuts
// @match http://www.8tracks.com/*
// @match http://8tracks.com/*
// ==/UserScript==


// teh codez
var set_shortcuts = function()
{
    $j(document).keypress(function(e){
        if(e.which == 32)  // space
        {
            if($j('#player_pause_button').css('display') == 'block')
            {
                $j('#player_pause_button').trigger('click');
            } else if ($j('#player_play_button').css('display') == 'block')
            {
                $j('#player_play_button').trigger('click');
            }
            return false;
        } else if (e.which == 115) // s
        {
            $j('#player_skip_button').trigger('click');
        }
    });
};

// inject into the document (to run in the document's context)

// from http://www.dustindiaz.com/add-remove-elements-reprise/
var DOM_manager = {
  get: function(el) {
    if (typeof el === 'string') {
      return document.getElementById(el);
    } else {
      return el;
    }
  },
  add: function(el, dest) {
    var el = this.get(el);
    var dest = this.get(dest);
    dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.get(el);
    el.parentNode.removeChild(el);
  }
};

var e = document.createElement('script');
e.setAttribute('type', 'text/javascript');
e.innerHTML = 'var omgwtfbbq = ' + set_shortcuts + ';\nomgwtfbbq();';
DOM_manager.add(e, 'footer');