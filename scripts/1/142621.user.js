// ==UserScript==
// @name          Bj-Linkfy
// @version        1.0.21
// @description	  Integração no Bj + IMDb + filmow + ratings nos links
// @include       http://www.bj2.me/detalhes.php?id=*
// @include       http://www.bj2.me/pesquisa_videos.php?*
// @include       http://www.imdb.com/title/tt*/
// @include       http://filmow.com/*
// @run-at         document-end
// @require       http://userscripts.org/scripts/source/142480.user.js
// @require       http://bj-linkfy.googlecode.com/files/imdb1021.user.js
// @require       http://bj-linkfy.googlecode.com/files/filmow.user.js
// ==/UserScript==
if (location.href.match ('bj2.me'))
{
//Get value para chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    }; 
}

window.gm_show_menu = function(e, t, x, y, isSame) {
  var collapse = 1; // Config: Set to 0 if you want default to be all visible 
  var flat = 0;     // Config: Set to 1 if you want a straight list of links 

  var html = ''; var s; var opened; var l; var div; var undefined;

  if (!isSame || !document.getElementById('GmMenu')) {
    // Config: Add your sections here, in order
    s = new Array("imdb", "youtube", "filmow");
    opened = new Array;
    
    // Config: Add whichever sections you want open by default
    // opened['Bootlegs'] = 1;
    
    l = new Object();  //var l = {}
    
    // Don't bother collapsing anything if there's only one section
    if (s.length == 1) {collapse = 0; flat = 1};
    
    // Fake auto-vivification to be more like beloved Perl
    for (var k in s) {
      l[s[k]] = new Object();
    }

     l['imdb']['<img src="http://img.bj2.me/files/1208uun127.png" class="imgb2">'] = 'http://imdb.com/find?s=all&q=';

     l['youtube']['<img src="http://img.bj2.me/files/1208wun742.png">'] = 'http://www.youtube.com/results?search_query='; 
	 
	 l['filmow']['<br/><img src="http://img.bj2.me/files/1208wsr239.png" width="90px" class="filmow">'] = 'http://filmow.com/buscar/?q=';

    html = '<style>.menLink, div.menLink a {color: #125298; text-align: left; padding: 0; margin: 0; font-size: 1px; display: inline;} .imgb {float: right; padding:0 !important; margin: -5px;} #gm_menu_link_Bootleg a{display: block !important; color: #125298 !important;} .imgb2 {margin-left: 5px;} .filmow { padding: 0 0 0 25px; } hr {width: 90%;}</style>\n<center>\n Bj-Linkfy v1 <a href="javascript:void(document.getElementById(\'GmMenu\').style.display=\'none\')" class="menLink"><img src="http://vernfonk.com/wp-content/themes/vern-fonk/images/close_icon1.gif" class="imgb"></a></center>\n<hr>\n'; 
    
    for (var i in l) {
      var first = 1;
      var dn = "gm_menu_div_" + i;
      
      for (var k in l[i]) {
	if (first && !flat) {html += '<div style="display: block; float: left; font-size: 12px; padding: 0; color: #125298; margin: 0;">\n'; }
	var link = '<a href="'+l[i][k]+t+'" target="farticle" class="menLink"';
	var estyle = 'padding: 0; ';
	if (!flat) {
	  if (first){ estyle = 'float: left; padding: 0; ';}
	  else {estyle = 'padding: 0 0 0 15px; ';}
	}
	html += '\n<span style="'+estyle+'display: block; font-size: 12px; color: #125298; margin: 0;"> ';
	//var trailer = "trailer legendado";
	if (i == "youtube") {
	  html += link.replace(/\+/, 'trailer+legendado+')
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
	  html += '<span style="float: right; font-size: 12px; padding: 0; margin: 0; color: #125298; display: block; text-align: right;"><a href="javascript:void(0);" id="gm_menu_link_'+i+'" style="color: rgb(225,225,255); font-size: 12px; padding: 0; margin: 0; display: iblock;"><b></b></a></span>\n';
	  //html += link + ' style="{float: right; text-align: left; display: inline;}" onMouseOver="javascript:void();"><b>[' + i + ']</b></a>';
	  first = 0;
	  
	  html += '</div>\n<div id="'+dn+'" style="float: left; padding: 0; color: #125298; margin: 0; font-size: 12px; display:block ';
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
    div.setAttribute('style', 'position: absolute; z-Index: 999; width: 155px; background: #125298; border: #333 solid 2px;/*-webkit-opacity: 0.8; -moz-opacity: 0.8;*/ margin: 2px; color: #FFF; font-size: 12px; padding: 5px; -webkit-box-shadow: 3px 3px #a6a5a5;box-shadow: 3px 3px #a6a5a5;');
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
  console.debug('codigo ok');
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
  text = text.replace(/^\s+|\s+$/g, " ").replace(/\s*\[\s*/g, "+").replace(/\s*\]\s*/g, "").replace(/\s/g, "+").replace(new RegExp('[ìîí]','gi'), 'i').replace(new RegExp('[Ç]','gi'), 'c').replace(new RegExp('[ÚÙÛ]','gi'), 'u').replace(new RegExp('[ÓÒÔÕ]','gi'), 'o').replace(new RegExp('[ÉÈÊ]','gi'), 'e').replace(new RegExp('[ÁÀÂÃ]','gi'), 'a').replace(/\s*\:\s*/g, "").replace(/\s*\(\s*/g, "+").replace(/\s*\)\s*/g, "")
  GM_setValue("text", text);
 // text = escape(text); 
 


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
}