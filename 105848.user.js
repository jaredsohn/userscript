// ==UserScript==

// @id             kitsflankbookmods

// @name           Kits' Flankbook Mods

// @namespace      kitsflankbookmods

// @description    Mods to Flankbook

// @include        http://flankbook.com/*

// ==/UserScript==


// @exclude        http://flankbook.com/sys/members/*/wire/

function removeFromParent(n) { if(n) n.parentNode.removeChild(n); return n;}



function addGlobalStyle(css) {

    var head, style;

    head = document.getElementsByTagName('head')[0];

    if (!head) { return; }

    style = document.createElement('style');

    style.type = 'text/css';

    style.innerHTML = css;

    head.appendChild(style);

}



(function(){


//send addtoany to the MOON!

var links = document.getElementsByTagName('a');

for( i=0;i<links.length;++i)

{

  var lnk = links[i];

  if(lnk.href=='http://www.addtoany.com/share_save' ||

     lnk.href.match(/.*flankbook.com.sys.members.*plau-bucks./) ) 

    removeFromParent(lnk);

}


//send addtoany to the MOON!
//send cubepoints to the MOON!

/*var divs = document.getElementsByTagName('div');

for( i=0;i<divs.length;++i) {

  var div = divs[i];

	if (//div.className == 'twitter_share_button' ||

      div.className == 'cubepoints_buddypress' ||

      div.className == 'cupepoints_buddypress_rank') {

    removeFromParent(div);

	}

}

var spans = document.getElementsByTagName('span');

for( i=0;i<spans.length;++i) {

  var span = spans[i];

	if (span.className == 'cubepoints_buddypress') {

    removeFromParent(span);

	}

}*/


//Stop loading slow external scripts
//TO THE MOON!

var scripts = document.getElementsByTagName('script');

for( i=0;i<scripts.length;++i)

{

  var s = scripts[i];

	if (s.src == 'http://static.addtoany.com/menu/page.js'/* ||

      s.src == 'http://platform.twitter.com/widgets.js'*/ ) {

      removeFromParent(s);

	}

}

//Useless sidebar junk? TO THE MOON!

removeFromParent( document.getElementById('text-4') ); // Celestia Radio

removeFromParent( document.getElementById('categories-3') ); // categories selection
removeFromParent( document.getElementById('search-3') ); // categories search

removeFromParent( document.getElementById('text-6') ); //Find us on

removeFromParent( document.getElementById('text-3') ); //page views


//already logged in? TO THE MOON!
removeFromParent(document.getElementById('sidebar-me'));


var msg = document.getElementById('message');

if( msg ) {

  var who = removeFromParent( document.getElementById('bp_core_whos_online_widget-3') );

  if(who) msg.parentNode.insertBefore(who, msg);
  var shout = removeFromParent( document.getElementById('text-7') );

  if(shout) {
    msg.parentNode.insertBefore(shout, msg);
    var title = shout.getElementsByTagName('h3');
    if(title) removeFromParent( title[0] )
  }

  var links = removeFromParent( document.getElementById('text-5') );

  if(links) {
    msg.parentNode.insertBefore(links, msg);
    var title = links.getElementsByTagName('h3');
    if(title) removeFromParent( title[0] )
  }
}

addGlobalStyle('h1,h2,h3,h4,h5,h6,h7 { font-family: Celestia !important; } \
  #sidebar, #sidebar h3, .padder { padding-top: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important; }');



})();