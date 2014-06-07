// ==UserScript==
// @name        filmweb genre hider
// @namespace   balonik
// @description Ukrywa wybrane kategorie filmów w wynikach wyszukiwania filmweb.pl
// @include     http://www.filmweb.pl/search/film*
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

function setCharAt(str,index,chr)
{
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}


function searchAndHide()
{
  var allElements, thisElement;
  var hideCnt=0;
  allElements = document.evaluate("//li[contains(@id,'hit_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < allElements.snapshotLength; i++)
  {
    thisElement = allElements.snapshotItem(i);
    // test element against each checked genre and hide
    var found=false;
    for (var g=0; g<gmFormV.length; g++)
    {
      if(thisElement.innerHTML.search(gmFormV.elements[g].value+'\"')>=0 && gmFormV.elements[g].checked)
      {
        found=true;
      }
    }
    if (found)
    {
      thisElement.style.display='none';
      hideCnt++;
    }
    else
    {
      thisElement.style.display='block';
    }
  }
  document.getElementById('hideCounter').innerHTML=hideCnt;
  // save states of check boxes
  for (var i=0; i<gmFormV.length; i++)
  {
    if (gmFormV.elements[i].checked)
    {
      chBoxes=setCharAt(chBoxes, i, "1");
    }
    else
    {
      chBoxes=setCharAt(chBoxes, i, "0");
    }
  }
  GM_setValue ("filmwebChBoxes", chBoxes);
}

// add div with genre selector
var hiderDiv = document.createElement ('div');
hiderDiv.innerHTML=' \
  <div id="hDiv" style="position:fixed;top:5px;left:3px;height:90%;overflow-y:scroll;padding:3px;background-color:#00E0E0"> \
  Ukrytych na tej stronie:<span id="hideCounter">0 </span><br>\
  <br>Ukryj gatunki<br>\
  <form id="gmForm"> \
    <input type="checkbox" name="gmGenre" value="genreIds=28"> Akcja <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=2"> Animacja <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=66"> Anime <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=3"> Biograficzny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=5"> Dokumentalny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=6"> Dramat <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=59"> Dramat historyczny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=64"> Edukacyjny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=45"> Etiuda <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=8"> Familijny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=9"> Fantasy <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=11"> Historyczny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=12"> Horror <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=13"> Komedia <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=58"> Komedia kryminalna <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=29"> Komedia obycz. <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=30"> Komedia rom. <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=50"> Krótkometrażowy <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=15"> Kryminał <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=16"> Melodramat <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=17"> Musical <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=44"> Muzyczny <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=67"> Niemy <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=20"> Przygodowy <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=32"> Romans <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=33"> Sci-Fi <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=61"> Sportowy <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=24"> Thriller <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=25"> Western <br> \
    <input type="checkbox" name="gmGenre" value="genreIds=26"> Wojenny <br> \
  </form>            \
  </div>             \
';
document.body.appendChild (hiderDiv);

// add event listener to each checkbox to trigger searchAndHide function on change
// and set previously saved states of check boxes
var gmFormV=document.getElementById('gmForm'); // "gm Form Variable"
var chBoxes;
chBoxes=GM_getValue("filmwebChBoxes", "000000000000000000000000000000"); // 0 - check box clear, 1 - set (checked)
for (var i=0; i<gmFormV.length; i++)
{
  var elmChbox=gmFormV.elements[i];
  if (chBoxes.charAt(i)=="1")
  {
    elmChbox.checked=true;
  }
  else
  {
    elmChbox.checked=false;
  }
  elmChbox.addEventListener('change', searchAndHide, true);
}

// ------- add MutationObserver to call searchAndHide on DOM change ------

// select the target node
var target = document.querySelector('.searchInputs');
 
// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    searchAndHide();
  });    
});
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
// pass in the target node, as well as the observer options
observer.observe(target, config);

// ----------------

searchAndHide();
