// ==UserScript==
// @name           GoProblems search settings
// @description    Remembers GoProblems.com custom search settings, and automatically loads the first problem found after you click on "Get Problems".
// @namespace      http://www.userscripts.org/scripts/show/112623
// @include        http://www.goproblems.com/problems.php3
// @include        http://www.goproblems.com/problems.php3#gm_results
// ==/UserScript==


/*---------- XPATH ----------*/
function $xpath() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;

  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }

  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }

  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }

  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

// XPath wrapper
function $x(path)
{
  try
  {
    var el = $xpath(path, 'object');
    el = XPCNativeWrapper.unwrap(el[0]);
    return el;
  }
  catch (e)
  {
    return null;
  }
}

/*---------- SEARCH OPTIONS ----------*/
var searchOption = [];
// Number of problems
searchOption['num']              = $x('/html/body/table[2]/tbody/tr[3]/td[1]/input');
// Genres
searchOption['genre_elementary'] = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[1]');
searchOption['genre_life_death'] = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[2]');
searchOption['genre_joseki']     = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[3]');
searchOption['genre_fuseki']     = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[4]');
searchOption['genre_tesuji']     = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[5]');
searchOption['genre_best_move']  = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[6]');
searchOption['genre_endgame']    = $x('/html/body/table[2]/tbody/tr[3]/td[2]/input[7]');
// Ranks
searchOption['rank_from']        = $x('/html/body/table[2]/tbody/tr[3]/td[3]/table/tbody/tr[1]/td[2]/select');
searchOption['rank_to']          = $x('/html/body/table[2]/tbody/tr[3]/td[3]/table/tbody/tr[2]/td[2]/select');
// Problems order
searchOption['order_recent']     = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[1]');
searchOption['order_oldest']     = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[2]');
searchOption['order_hardest']    = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[3]');
searchOption['order_easiest']    = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[4]');
searchOption['order_genre']      = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[5]');
searchOption['order_stars']      = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[6]');
searchOption['order_random']     = $x('/html/body/table[2]/tbody/tr[3]/td[4]/input[7]');
// Status options
searchOption['untried']          = $x('/html/body/table[2]/tbody/tr[3]/td[5]/input[1]');
searchOption['unsolved']         = $x('/html/body/table[2]/tbody/tr[3]/td[5]/input[2]');
searchOption['solved']           = $x('/html/body/table[2]/tbody/tr[3]/td[5]/input[3]');


/*---------- SEARCH FORM ----------*/
searchOption['num'].value                = GM_getValue('num', '20');
searchOption['genre_elementary'].checked = GM_getValue('genre_elementary', true);
searchOption['genre_life_death'].checked = GM_getValue('genre_life_death', true);
searchOption['genre_joseki'].checked     = GM_getValue('genre_joseki', true);
searchOption['genre_fuseki'].checked     = GM_getValue('genre_fuseki', true);
searchOption['genre_tesuji'].checked     = GM_getValue('genre_tesuji', true);
searchOption['genre_best_move'].checked  = GM_getValue('genre_best_move', true);
searchOption['genre_endgame'].checked    = GM_getValue('genre_endgame', true);
searchOption['rank_from'].selectedIndex  = GM_getValue('rank_from', 0);
searchOption['rank_to'].selectedIndex    = GM_getValue('rank_to', 20);
searchOption['order_recent'].checked     = GM_getValue('order_recent', true);
searchOption['order_oldest'].checked     = GM_getValue('order_oldest', false);
searchOption['order_hardest'].checked    = GM_getValue('order_hardest', false);
searchOption['order_easiest'].checked    = GM_getValue('order_easiest', false);
searchOption['order_genre'].checked      = GM_getValue('order_genre', false);
searchOption['order_stars'].checked      = GM_getValue('order_stars', false);
searchOption['order_random'].checked     = GM_getValue('order_random', false);
searchOption['untried'].checked          = GM_getValue('untried', true);
searchOption['unsolved'].checked         = GM_getValue('unsolved', true);
searchOption['solved'].checked           = GM_getValue('solved', true);

var searchButton = $x('/html/body/table[2]/tbody/tr[4]/td/input[1]');
searchButton.onclick = function()
{
  GM_setValue('num', searchOption['num'].value);
  GM_setValue('genre_elementary', searchOption['genre_elementary'].checked);
  GM_setValue('genre_life_death', searchOption['genre_life_death'].checked);
  GM_setValue('genre_joseki', searchOption['genre_joseki'].checked);
  GM_setValue('genre_fuseki', searchOption['genre_fuseki'].checked);
  GM_setValue('genre_tesuji', searchOption['genre_tesuji'].checked);
  GM_setValue('genre_best_move', searchOption['genre_best_move'].checked);
  GM_setValue('genre_endgame', searchOption['genre_endgame'].checked);
  GM_setValue('rank_from', searchOption['rank_from'].selectedIndex);
  GM_setValue('rank_to', searchOption['rank_to'].selectedIndex);
  GM_setValue('order_recent', searchOption['order_recent'].checked);
  GM_setValue('order_oldest', searchOption['order_oldest'].checked);
  GM_setValue('order_hardest', searchOption['order_hardest'].checked);
  GM_setValue('order_easiest', searchOption['order_easiest'].checked);
  GM_setValue('order_genre', searchOption['order_genre'].checked);
  GM_setValue('order_stars', searchOption['order_stars'].checked);
  GM_setValue('order_random', searchOption['order_random'].checked);
  GM_setValue('untried', searchOption['untried'].checked);
  GM_setValue('unsolved', searchOption['unsolved'].checked);
  GM_setValue('solved', searchOption['solved'].checked);
  var searchForm = $x('/html/body/table[2]/tbody/form[1]');
  // I could probably make an XmlHttpRequest instead. Meh.
  searchForm.action = searchForm.action + '#gm_results';
  searchForm.submit();
}

/*---------- RESULTS PAGE ----------*/
var firstProblem = $x('/html/body/p/table/tbody/tr/td[2]/a');
if ((firstProblem != null) && /#gm_results$/.test(window.location.href))
{
  $x('/html/body/p/table').innerHTML = '<tbody><tr><td style="font-size:125%;">Loading first problem, please wait a few seconds...</td></tr></tbody>';
  window.location.href = firstProblem;
}
