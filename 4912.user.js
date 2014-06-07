// ==UserScript==
// @name          ContextMenu
// @description	  Highlight a word|phrase and right click to get a context menu full of search links for that phrase.  Hold down Ctrl key to disable menu and get original Firefox menu.  Alt+s brings up a dialog window to enter your own search term.  Set var collapse and var flat below to your liking.  Also set your links in var l below.   (search for "Config:" below for more configuration you can change)    - Robert J. Powers
// @include       *
// ==/UserScript==

window.gm_show_menu = function(e, t, x, y, isSame) {
  var collapse = 1; // Config: Set to 0 if you want default to be all visible 
  var flat = 0;     // Config: Set to 1 if you want a straight list of links

  var html = ''; var s; var opened; var l; var div; var undefined;

  if (!isSame || !document.getElementById('GmMenu')) {
    // Config: Add your sections here, in order
    s = new Array("Search", "Defn", "Bootlegs", "Movies", "Music", "Games", "Anime");
    opened = new Array;
    
    // Config: Add whichever sections you want open by default
    opened['Bootlegs'] = 1;
    
    l = new Object();  //var l = {}
    
    // Don't bother collapsing anything if there's only one section
    if (s.length == 1) {collapse = 0; flat = 1};
    
    // Fake auto-vivification to be more like beloved Perl
    for (var k in s) {
      l[s[k]] = new Object();
    }

    // Config: set these to your liking. Note: Google isn't
    // in here because they're fucking assholes
    l['Search']['Y! Search'] = 'http://search.yahoo.com/search?ei=UTF-8&fr=sfp&p=';
    l['Search']['Y! Imgs'] = 'http://images.search.yahoo.com/search/images?ei=UTF-8&fr=sfp&p=';
    l['Search']['Y! News'] = 'http://news.search.yahoo.com/search/news?fr2=sp-top&ei=UTF-8&x=wrt&p=';
    l['Search']['Cpan'] = 'http://search.cpan.org/search?mode=all&query=';

    l['Defn']['Wiki'] = 'http://en.wikipedia.org/w/wiki.phtml?search=';
    l['Defn']['M-W'] = 'http://m-w.com/dictionary/';
    
    l['Bootlegs']['Torrentspy'] = 'http://www.torrentspy.com/search.asp?submit.x=0&submit.y=0&query=';
    l['Bootlegs']['Isohunt'] = 'http://isohunt.com/torrents.php?ext=&op=and&ihp=1&iht=-1&ihs1=2&iho1=d&ihq=';
    l['Bootlegs']['Mininova'] = 'http://www.mininova.org/search/?search=';
    l['Bootlegs']['PirateBay'] = 'http://thepiratebay.org/search.php?q=';
    l['Bootlegs']['Torrentz'] = 'http://www.torrentz.com/search_';
    
    l['Movies']['Y! Movies'] = 'http://movies.yahoo.com/mv/search?p=';
    l['Movies']['IMDB'] = 'http://imdb.com/find?s=all&q=';
    l['Movies']['Intelli'] = 'http://www.intelliflix.com/movie_search.dvd?source=simple&search_field=Keyword&genre=0&search_text=';
    
    l['Music']['Y! Music Artist'] = 'http://search.music.yahoo.com/search/?m=artist&x=0&y=0&p=';
    l['Music']['Y! Music Album'] = 'http://search.music.yahoo.com/search/?m=album&x=0&y=0&p=';
    
    l['Games']['Gamespot'] = 'http://www.gamespot.com/search.html?type=11&stype=all&x=0&y=0&qs=';
    l['Games']['Gamefly'] = 'http://www.gamefly.com/products/search.asp?pf=&sub=1&sb=mostpop&spsrch.x=0&spsrch.y=0&k=';
    l['Games']['Gamerang'] = 'http://gamerang.com/Products/SearchShowcase.aspx?term=';

    l['Anime']['AnimeNfo'] = 'http://www.animenfo.com/search.php?queryin=anime_titles&action=Go&option=keywords&query=';
    l['Anime']['News Network'] = 'http://animenewsnetwork.com/encyclopedia/search.php?searchbox=';
    
    
    html = '<style>.menLink, div.menLink a {color: #FFF; text-align: left; padding: 0; margin: 0; font-size: 12px; display: inline;}</style>\n<center>\n<a href="javascript:void(document.getElementById(\'GmMenu\').style.display=\'none\')" class="menLink">[Close]</a></center>\n<hr width=80%>\n';
    
    for (var i in l) {
      var first = 1;
      var dn = "gm_menu_div_" + i;
      
      for (var k in l[i]) {
	if (first && !flat) {html += '<div style="display: block; float: left; font-size: 12px; padding: 0; color: #FFF; margin: 0;">\n'; }
	var link = '<a href="'+l[i][k]+t+'" target="farticle" class="menLink"';
	var estyle = 'padding: 0; ';
	if (!flat) {
	  if (first){ estyle = 'float: left; padding: 0; ';}
	  else {estyle = 'padding: 0 0 0 15px; ';}
	}
	html += '\n<span style="'+estyle+'display: block; font-size: 12px; color: #FFF; margin: 0;"> - ';
	if (k == "Torrentz") {
	  html += link.replace(/\%20/, '-');
	} else {
	  html += link;
	}
	html += '>' + k +'</a></span>\n';
	if (first && !flat) {
	  var cid = i + "_closed";

	  var closed = collapse;
	  if (opened[i]) {closed = 0;}
	  if (GM_getValue(cid) != undefined ){closed = GM_getValue(cid);}

	  //	  alert(i + " GMclosed: " + GM_getValue(i + "_closed") + " opened: " + opened[i] + " flag: " + closed);
	  var sign = (closed) ? "+" : "-";
	  html += '<span style="float: right; font-size: 12px; padding: 0; margin: 0; color: #FFF; display: block; text-align: right;"><a href="javascript:void(0);" id="gm_menu_link_'+i+'" style="color: rgb(225,225,255); font-size: 12px; padding: 0; margin: 0; display: inline;"><b>'+sign+'['+ i + ']</b></a></span>\n';
	  //html += link + ' style="{float: right; text-align: left; display: inline;}" onMouseOver="javascript:void();"><b>[' + i + ']</b></a>';
	  first = 0;
	  
	  html += '</div>\n<div id="'+dn+'" style="float: left; padding: 0; color: #FFF; margin: 0; font-size: 12px; display: ';
	  if (closed){
	    html += 'none';
	  } else {
	    html += 'block';
	  }
	  html += ';">\n';
	} else {
	  html += '\n'; //<br>
	}
      }
      if (!flat) html += '</div>\n';
    }
  }
  if (x == '' || !isFinite(x)) {x = 200;}
  if (y == '' || !isFinite(y)) {y = 200+window.scrollY;}

  if (document.getElementById('GmMenu')) {
    div = document.getElementById('GmMenu');
    if (html) {div.innerHTML = html;}
  } else {
    div = document.createElement('DIV');
    div.setAttribute('ID', 'GmMenu');
    div.setAttribute('name', 'GmMenu');
    div.setAttribute('class', 'menLink');
    div.setAttribute('style', 'position: absolute; z-Index: 999; width: 195px; background: #666; border: #333 solid 2px; -moz-opacity: 0.8; margin: 2px; color: #FFF; font-size: 12px; padding: 2px;');
    div.innerHTML = html;
    document.body.insertBefore(div, document.body.firstChild);
  }

  div.style.left = x + "px";
  div.style.top  = y + "px";
  div.style.display = "block";

  if (html) {
    for (var k in s) {
      var lid = "gm_menu_link_" + s[k];
      document.getElementById(lid).addEventListener("click", gm_menu_toggle, true);
      // Config: comment this out to allow mouseovers to expand and contract the list
      //document.getElementById(lid).addEventListener("mouseover", gm_menu_toggle, true);
    }
  }
  //  alert(html);
}

window.gm_menu_toggle = function(e) {
  var id = e.target.parentNode.id.replace(/link/, 'div');
  var d = document.getElementById(id);
  var did = id.substring(12) + "_closed"; // strlen(gm_menu_div_)
  if (d.style.display != "none") {
    e.target.innerHTML = e.target.innerHTML.replace(/\-/, '+');
    d.style.display = "none";
    GM_setValue(did, 1); // closed
    //alert("Closing - setting " + did + " to: " + GM_getValue(did));
  } else {
    e.target.innerHTML = e.target.innerHTML.replace(/\+/, '-');
    d.style.display = "block";
    GM_setValue(did, 0); // opened
    //alert("Opening - setting " + did + " to: " + GM_getValue(did));
  }
  e.preventDefault();
  e.returnValue = false;
  e.stopPropagation();
  return false;
}

window.gm_menu_clear = function(e) {
  m = document.getElementById('GmMenu');
  //alert("comparing X: " + m.offsetLeft + "to " + e.clientX + " comparing Y: " + m.offsetTop + "to " + e.clientY  );
  if (e.target && e.target.parentNode && e.target.parentNode.id &&
      e.target.parentNode.id.indexOf("gm_menu_") == 0) {return true;}
  // If menu is visible and didn't click on the menu, set it invisible
  if (e.target.id != "GmMenu" && m && m.style.display != "none" &&
      Math.abs(m.offsetLeft - e.clientX) > 5 && Math.abs(m.offsetTop - e.clientY) > 5) {
    m.style.display = "none";
  }
  return true;
}

window.gm_menu = function(e) {
  if (e.ctrlKey) {return true;}
  if (e.type == "keyup" && (e.which != 83 || !e.altKey)) {return true;} //alt-s
  var text = ''; var isSame = 0;
  if (e.type == "keyup") { //alt-s
    text=prompt('Search:');
    if (text == '') {return true;}
  }
  if (text == '') {text = window.getSelection();}
  if (text == '' && e.target.value) {
   text = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
  }
  // Config: Uncomment this to have the context menu
  // use the last term selected
  //if (text == '' && e.type == "contextmenu") {text = GM_getValue("text");}

  text += "";
  text = text.replace(/^\s+|\s+$/g, "");
  GM_setValue("text", text);
  text = escape(text);


  // e.ctrlKey;
  // if menu isnt visible and it's a right click, then pop that shit up
  if (text != '') {
    //document.getElementById('body').onContextMenu = 'return false';
    gm_show_menu(e, text, e.clientX+window.scrollX, e.clientY+window.scrollY, isSame);
    e.preventDefault();
    e.returnValue = false;
    e.stopPropagation();
    return false;
  }
  return true;
}

//var elmLink = document.getElementById('somelink');
//elmLink.addEventListener("click", my_func, true);

window.addEventListener("contextmenu", gm_menu, true);
//Config: uncomment the next line to allow double click to activate the menu
//window.addEventListener("dblclick", gm_menu, true);
window.addEventListener("keyup", gm_menu, true);
//window.addEventListener("select", gm_menu, true);
window.addEventListener("mouseup", gm_menu_clear, false);

// TODO
// #outerElementID DIV, #outerElementID SPAN, #outerElementID a { ... } 
// get YUI stylesheet to override
// add buttons to allow collapsed or whatever
// define fonts

// customizeable links via UI
