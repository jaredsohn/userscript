// ==UserScript==
// @name           IBDoF openInTabs
// @namespace      http://www.ibdof.com/
// @description    Open (new posts || daily posts)in tabs
// @include        http://www.ibdof.com/search.php*
// @include        http://www.ibdof.com/getdaily.php*
// ==/UserScript==

(function() {
  var forumNames = new Array();
  var posturls = new Array();
  var forumposts = new Array();
  var totalnewposts = 0;

  /* x-browser event register */
  function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) { elm.addEventListener(evType, fn, useCapture); return true; }
    else if (elm.attachEvent) { var r = elm.attachEvent('on' + evType, fn); return r; }
    else { elm['on' + evType] = fn; }
  }

  function addOption(selectbox,text,value ) {
    var optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
  }

  function openTab(url) {
    if (window.addEventListener)
      GM_openInTab(url);
    else
      PRO_openInTab(url, 2);
  }
  
  function openFora(idx) {
    if (forumposts[idx] == 1)
      openTab(posturls[idx]);
    else {
      var url_array = posturls[idx].split(',');
      for ( var i = 0; i < url_array.length; i++)
        openTab(url_array[i]);
    }
  }
  
  function openForaInTabs() {
    if (window.opera) {
      alert("Sorry! Opera doesn't support opening tabs by user script.");
      return;
    }
    var v = document.getElementById('posturls').value;

    if (v == -1) { // open all the fora
      for ( var i = 0; i < forumNames.length; i++ )
        openFora(i);
    } else
        openFora(v);
  }

// begin

  var t = document.getElementsByTagName('table')[4]; // newposts table

  /* step thru the rows checking column 2 for newpost images
          build arrays...
          1. the forum title from column 1
          2. the url from the newpost link
          3. increment a counter of urls stored for that forum title
          keep a total of newposts found
    */
  for ( var i = 1; i < t.rows.length-1; i++ ) { // ignore first & last row
    // CELL >> SPAN >> A >> IMG = newposting exists
    if ( t.rows[i].cells[2].firstChild.firstChild.getElementsByTagName('img').length > 0 ) {
      for ( var j = 0; j < forumNames.length; j++ ) {
        if ( forumNames[j] == (t.rows[i].cells[1].textContent || t.rows[i].cells[1].innerText) ) {
          posturls[j] += "," + t.rows[i].cells[2].firstChild.firstChild.href;
          forumposts[j] += 1;
          break;
        }
      }
      if ( j == forumNames.length ) {
        forumNames[j] = t.rows[i].cells[1].textContent || t.rows[i].cells[1].innerText;
        posturls[j] = t.rows[i].cells[2].firstChild.firstChild.href;
        forumposts[j] = 1;
      }
      totalnewposts += 1;
    }
  }

  /* create a UI selectbox and GO button
     */
  var sdiv = document.createElement('div'); // container
  sdiv.style.position = 'absolute';
  sdiv.style.right = '0px';
  sdiv.style.marginRight = '20px';

  var sbox = document.createElement('select');
  sbox.id = "posturls";
  if (!window.attachEvent) { // Firefox
    sbox.style.position = 'relative';
    sbox.style.top = '-20px';
    sbox.style.MozAppearance = "none";
  }

  /* as 1st option show total newposts - if GO clicked open all
          step thru arrays adding option items - forum title and total posts in that forum
     */
  addOption(sbox, "--Open all newposts--"+' ('+totalnewposts+')', -1);
  for ( var i = 0; i < forumNames.length; i++ ) {
    addOption(sbox, forumNames[i]+' ('+forumposts[i]+')', i );
  }

  sdiv.appendChild(sbox);

  var gobtn = document.createElement('button');
//  gobtn.type = "button";
//  gobtn.textContent = "Go";
  gobtn.innerHTML = "Go";
//  gobtn.value = "Go";
  gobtn.style.marginLeft = "2px";
  if (!window.attachEvent) { // Firefox
    gobtn.style.position = 'relative';
    gobtn.style.top = '-20px';
  }
  addEvent(gobtn, "click", openForaInTabs, false);
  sdiv.appendChild(gobtn);

  var c = document.getElementsByTagName('table')[2].getElementsByTagName('td')[0]; // find inject location
//  c.firstChild.style.cssFloat = 'left'; // float the span enclosing the page title
  c.appendChild(sdiv); // inject into document
  c.appendChild(c.getElementsByTagName('br')[0]); // shuffle the html line-break

})();