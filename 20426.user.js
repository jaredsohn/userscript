// ==UserScript==
// @name          amazon2wem
// @version      1.94
// @description   Usefulness restricted to IBList Data Editors. Copy Product Description from Amazon. Paste values into IBL WEM Manifest edit boxes.
// @namespace amazon2wem
// @include       http://www.amazon.*
// @include       http://www.iblist.com/editorial/initial_record.php*
// @include       http://www.iblist.com/editorial/add_manifestation.php*
// @include       http://www.iblist.com/editorial/edit_manifestation.php*
// ==/UserScript==

/*
  DESCRIPTION
  Allows a DE to copy the book 'Product Details' from Amazon and paste them into
  an IBList 'Add a Manifestation' form.
 
  Firefox & IE7 users can view the currently 'saved' values by right-clicking
    the IE7Pro/Greasemonkey icon and choosing 'View' from "User Script Commands"
   
  Firefox users also have the option of viewing the saved values via...
  about:config
    amazon2wem
      - see the various stored values with this prefix
*/

/** changelog
2008-08-13
  Paste button not appearing on IBL - my silly error, apologies!
2008-08-10
  I had to revise my page checking, it was too aggressive - resulting in too many annoying alerts
2008-08-08
  Amazon altered page layout - fix script to work with amended design
2008-05-05
  Improved Publisher-name matching
2008-04-28
  Bugfix - corrected error where sometimes dimensions would not copy
2008-04-09
  Inserted another layer of testing for publisher matchup
    - exact match ?
    - try first two words (<< new)
    - finally, try first word match
2008-03-30
  Somehow I managed to screw-up the update process for Greasemonkey users -
    UNINSTALL PREVIOUS VERSION before installing this one 
    (IMPORTANT!! - select "Also uninstall associated preferences")
  regex date extraction, amazon was too chaotic/clever for me - so I decided to attack from another angle, hopefully? this particular problem is now solved
2008-03-23
  Amazon found another way to trip up regex month extraction - solved again!
2008-03-22
  All 'saved' vars should be reset prior to 'Copy' -- isbn-13 wasn't included in the reset :BLUSH:
    If Amazon had NO isbn-13, ... IBL paste would WRONGLY use whatever isbn-13 was last stored.
2008-03-11
  Finally fixed the non-handling of international dates,
  plus fixed the date paste - where a day not specified caused paste failure for all of published date
  New:
    added the excellent SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
2008-03-09
  ISBN, if present copy ISBN-13. Pastes ISBN-13 if present, otherwise fallback to ISBN-10
2008-01-13
  New:
  Added Month/Day copy & paste to conform to new IBL data entry cells.
  Added copy button to "Edit Manifestation" data screen.
2007-11-03
  New:
    Think it is now worthy of a version 1.0 release.
    as it's now cross-browser - Firefox, IE7
2007-09-30
  improved regex matching
  metric to imperial book size conversion
2007-08-??
  Firefox release ONLY
*/

(function() {

  if (window.opera) {
    alert("This script will not run on Opera as it needs to save preferences, use an IE or FF browser.");
    return;
  }
 
  var isIE = (document.attachEvent && !window.opera) ? true : false;
  
  if (!isIE) {
    // SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
    var version_scriptNum = 20426; // Change this to the number given to the script by userscripts.org (check the address bar)
    var version_timestamp = 1209964576234; // (new Date()).getTime() Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
    function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand("++ " + GM_getValue("targetScriptName", "Amazon2wem") + " - Manual Update Check ++", function() {updateCheck(true);}); updateCheck(false);
    // ENDS UPDATE CHECKER
  }

  $gv = function(name,defaultValue) {
    if (!isIE) return GM_getValue(name,defaultValue);
    else return PRO_getValue(name);
  };
  $sv = function(name,value) {
    if (!isIE) return GM_setValue(name,value);
    else return PRO_setValue(name,value);
  };

  // a macro function - just to save typing the same thing over, and over, and over,,,
  function $gen(en) {   return document.getElementsByName(en); }

  function reset_vars() {
    $sv('medium',''); $sv('pages',''); $sv('publisher','');
    $sv('pubyear',''); $sv('pubmonth',''); $sv('pubday','');
    $sv('isbn13',''); $sv('isbn','');
    $sv('dimy',''); $sv('dimx',''); $sv('dimz','');
  }

  function find_amazon_list() {
    var nodes = document.getElementsByTagName('ul');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].parentNode.nodeName == 'DIV'
      && (/content/i.test(nodes[i].parentNode.className))
      && nodes[i].parentNode.parentNode.nodeName == 'TD'
      && (/bucket/i.test(nodes[i].parentNode.parentNode.className))) {
        if (/Product Details/i.test(nodes[i].parentNode.parentNode.getElementsByTagName('h2')[0].firstChild.nodeValue))
          return nodes[i];
      }
    }
    return false;
  }

  function ibl_copy(e) {
  /*
    Amazon Event trap
    Trap a click on 'Copy' and save(store) the values
  */
    var r, n, x, cm;
    if (isIE) {
      window.event.cancelBubble = true; //window.event.returnValue = false;
//         window.event.srcElement.blur();
    } else {
      e.preventDefault();
//         e.target.blur();
    }
    reset_vars();
    n = find_amazon_list().getElementsByTagName('li');
    // look at each line, test the heading for the info we're interested in
    for (var i=0; i < n.length - 1; i++) {
      if (!n[i].firstChild.firstChild)
        continue;
      // pick out the sub-heading - ignore colon if present (sometimes it's not there!)
      var r = n[i].firstChild.firstChild.nodeValue.match(/^\s*(\w+[\s&\w-\d]+)[:]?/);
      if (r) {
        r = r[1].match(/(\w+[\w-\d]*)$/); // get last word
        if (r[1] == 'Binding') // School & Library Binding - always Hardcover??
          r[1] = 'Hardcover';
        if (r[1] == 'Hardcover' || r[1] == 'Paperback') {
          $sv('medium',r[1]);
          if (n[i].firstChild.nextSibling) {
            x = n[i].firstChild.nextSibling.nodeValue.match(/^\s*([0-9]*)\s*pages/);
            if (x)
              $sv('pages',x[1]);
          }
        }
        if (r[1] == 'Publisher') {
          var txt = n[i].firstChild.nextSibling.nodeValue;
          x = txt.match(/^\s*([\w*[\.\s\&\']+]*);??/);
          if (x) {
            if (x[1].match(/by\s(.*)$/))
              x[1] = x[1].match(/by\s(.*)$/)[1];
            $sv('publisher',x[1].match(/(.*?)\s*$/)[1]);
            // pick out the year date - at end of string test for round bracket preceded by 4 digits
            x = txt.match(/\(.*([\d]{4})\)\s*$/);
            if (x) {
              $sv('pubyear',x[1]);
              // 20080330 - regex was too convoluted trying to cope with variability of the of publisher/date line.
              // we found a "year" - assume last brackets on the line surround the date data
              x = txt.split("(");
              txt = x[x.length-1];
              // extract the month and day(if present) - now handles all date formats US/UK
              var md = txt.match(/\s*(.*?)[\,]?\s*[\d]{4}\)\s*$/)[1];
              x = md.match(/[A-Z][a-z]+/);
              if (x)
                $sv('pubmonth',x[0]);
              x = md.match(/[\d]+/);
              if (x) {
                $sv('pubday',x[0]);
              }
            }
          }
        }
        if (r[1] == 'ISBN-10') {
          x = n[i].firstChild.nextSibling.nodeValue.match(/^\s*(\d{9}[\d|X])/);
          if (x)
            $sv('isbn',x[1]);
        }
        if (r[1] == 'ISBN-13') {
          x = n[i].firstChild.nextSibling.nodeValue.replace('-','').match(/^\s*(\d{12}[\d|X])/i);
          if (x)
            $sv('isbn13',x[1]);
        }
        if (r[1] == 'Dimensions') {
          // D.d x D.d x D.d
          var x = n[i].firstChild.nextSibling.nodeValue.match(/^\s*(\d*[\.\d]+)\sx\s(\d*[\.\d]+)\sx\s(\d*[\.\d]+)\s/);
          if (x) {
            cm = (n[i].firstChild.nextSibling.nodeValue.match(/(\w+)\s*$/)[1] == 'cm')
            $sv('dimy',cm ? (x[1]/2.54).toFixed(1) : x[1]);
            $sv('dimx',cm ? (x[2]/2.54).toFixed(1) : x[2]);
            $sv('dimz',cm ? (x[3]/2.54).toFixed(1) : x[3]);
          }
        }
      }
    }
    if (isIE)
      window.event.returnValue = false;
  }

  function ibl_paste(e) {
  /*
    IBList Event trap
    Trap a click on 'Paste' and retrieve the saved values and plug them into the manifestation form.
  */
var DEBUG = false;
  var v;
    if (isIE) {
      window.event.cancelBubble = true; //window.event.returnValue = false;
      window.event.srcElement.blur();
    } else {
      e.preventDefault();
      e.target.blur();
    }

    var monthName = new Array ('January','February','March','April','May','June','July','August','September','October','November','December');
    
    var wem = location.pathname.match(/(add|edit)_manifestation.php$/) ? false : true;
    v = $gv('publisher');
    if (DEBUG) {GM_log(v)}
    if (v)
    {
      var p = v.replace(/\.|\'|\,/g, "").toLowerCase();
      if (DEBUG) {GM_log(p)}
      var n = wem ? ($gen('manifest_publisher'))[0] : ($gen('publisher'))[0]; //select
      if ( document.getElementById("matchText") ) {
        var mst = document.getElementById("matchText");
      } else {
        var mst = n.previousSibling.previousSibling.appendChild(document.createElement("span"));
        mst.id = "matchText";
      }
      var x = n.childNodes; //options
      var matched = false;
      for (var i=1; i < x.length; i++)
      {
        if (x[i].firstChild.nodeValue.replace(/\.|\'|\,/g, "").toLowerCase() == p)
        {
          n.value = x[i].value;
          matched = true;
          mst.innerHTML = ' Exact match: '+ v;
          mst.style.color = "green";
          break;
        }
      }
      if ( !matched && v.match(/^(\w*\s\w*)/i) ) // didn't find it first time through - try a two word match
      {
        for (var i=1; i < x.length; i++) {
          if (DEBUG) {GM_log(x[i].firstChild.nodeValue.replace(/\.|\'|\,/g, "").match(/^(\w*\s\w*)/i ))}
          if ( !x[i].firstChild.nodeValue.replace(/\.|\'|\,/g, "").match(/^(\w*\s\w*)/i ) )
            continue;
          if ((x[i].firstChild.nodeValue.replace(/\.|\'|\,/g, "").match(/^(\w*\s\w*)/i))[1].toLowerCase() == (p.match(/^(\w*\s\w*)/i))[1])
          {
            n.value = x[i].value;
            matched = true;
            mst.innerHTML = ' Possible match: '+ v;
            mst.style.color = "blue";
            break;
          }
        }
      }
      if (!matched) // still didn't find it - try a first word match
      {
        for (var i=1; i < x.length; i++)
        if ((x[i].firstChild.nodeValue.replace(/\.|\'|\,/g, "").match(/^(\w*)/i))[1].toLowerCase() == (p.match(/^(\w*)/i))[1])
        {
          n.value = x[i].value;
          matched = true;
          mst.innerHTML = ' First-word match: '+ v;
          mst.style.color = "red";
          break;
        }
      }
      if (!matched) // didn't find a match - advise
        mst.innerHTML = ' Failed match: '+ v;
    }
    v = $gv('isbn13');
    if (!v)
      v = $gv('isbn');
    if (v)
      wem ? ($gen('manifest_isbn'))[0].value = v : ($gen('isbn'))[0].value = v;
    v = $gv('pages');
    if (v)
      wem ? ($gen('manifest_extent'))[0].value = v : ($gen('extent'))[0].value = v; //page count
    v = $gv('medium');
    if (v)
      wem ? ($gen('manifest_medium'))[0].value = v : ($gen('medium'))[0].value = v; //bookType
    v = $gv('dimx');
    if (v)
      wem ? ($gen('manifest_dimensions_w'))[0].value = v : ($gen('dimensions[w]'))[0].value = v;
    v = $gv('dimy');
    if (v)
      wem ? ($gen('manifest_dimensions_h'))[0].value = v : ($gen('dimensions[h]'))[0].value = v;
    v = $gv('dimz');
    if (v)
      wem ? ($gen('manifest_dimensions_d'))[0].value = v : ($gen('dimensions[d]'))[0].value = v;
      
    v = $gv('pubmonth');
    if (v)
      for (i = 0; i < monthName.length; i++)
        if (monthName[i].indexOf(v) != -1)
          wem ? ($gen('manifest_copyright_month'))[0].value = i+1 : ($gen('copyright_month'))[0].value = i+1;
    v = $gv('pubday');
    if (v)
      wem ? ($gen('manifest_copyright_day'))[0].value = v : ($gen('copyright_day'))[0].value = v;
    v = $gv('pubyear');
    if (v)
      wem ? ($gen('manifest_copyright_date'))[0].value = v : ($gen('copyright_date'))[0].value = v;
  }

  function menu_values() {
    var str = 'Product Details\n';
    str += '\nmedium: '+ $gv('medium');
    str += '\npages: '+ $gv('pages');
    str += '\npublisher: '+ $gv('publisher');
    str += '\nDateY: '+ $gv('pubyear');
    str += '\nDateM: '+ $gv('pubmonth');
    str += '\nDateD: '+ $gv('pubday');
    str += '\nisbn13: '+ $gv('isbn13');
    str += '\nisbn: '+ $gv('isbn');
    str += '\ndimX: '+ $gv('dimx');
    str += '\ndimY: '+ $gv('dimy');
    str += '\ndimZ: '+ $gv('dimz');
    alert(str);
  }
 
  function go_amazon() {
  /*
    insert a 'Copy' link
  */
    if (!(document.body.hasAttribute("class") && document.body.className == "dp")) return;
  
    var pd = find_amazon_list();
    // is this the correct list?
    if (pd) {
      // create a copy TO storage link
      var link = document.createElement('button');
      link.id = 'IBList';
      link.setAttribute('title', 'Save values for use in IBList WEM entry.');
      link.appendChild(document.createTextNode('Copy Product Details'));

      var css = '#IBList{margin-left: 20px;} #IBList:hover{color: darkred;}';
      if (isIE)
        PRO_addStyle(css);
      else
        GM_addStyle(css);

      // create an event listener - trap the mouse click
      if (isIE) {
        link.attachEvent('onclick', ibl_copy);
        PRO_registerMenuCommand("View saved values", menu_values);
      } else {
        link.addEventListener('click', ibl_copy, true);
        GM_registerMenuCommand("View saved values", menu_values);
      }
      // insert into document
//      pd.parentNode.parentNode.insertBefore(link, pd.parentNode.parentNode.getElementsByTagName('div')[0]);
      pd.parentNode.parentNode.insertBefore(link, pd.parentNode);
    }
    else
    {
      alert("For some reason the script was unable to locate Amazon's 'Product Details'...please advise script author");
    }
  }

  function go_iblist() {
  /*
    insert a 'Paste' link
  */
    nodes = document.getElementsByTagName('h3');
    if (!nodes.length) // probably in "Edit Manifestation" page, try it
      nodes = document.getElementsByTagName('h2');
    for (var i = 0; i < nodes.length; i++) {
      if (/(Add a|Edit) Manifestation/i.test(nodes[i].firstChild.nodeValue)) {
        if (!(nodes[i].parentNode.nodeName == 'FORM' || nodes[i].parentNode.getElementsByTagName('form').length > 0))
          return;
        // create a paste FROM storage link
        var link = document.createElement('button');
        link.id = 'IBList';
        link.setAttribute('title', 'Paste Amazon info into manifestation.');
        link.appendChild(document.createTextNode("Insert Product Details"));

        var css = '#IBList{margin-left: 20px;} #IBList:hover{color: darkred;}';
        if (isIE)
          PRO_addStyle(css);
        else
          GM_addStyle(css);

        // create an event listener - trap the mouse click
        if (isIE)
          link.attachEvent('onclick', ibl_paste);
        else
          link.addEventListener('click', ibl_paste, true);
        // insert into document
        nodes[i].appendChild(link);

        break;
      }
    }
  }

  if (/iblist/i.test(location.host))
    go_iblist()
  else
    go_amazon()
})(); 