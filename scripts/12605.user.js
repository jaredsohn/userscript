// ==UserScript==
// @name           Furigana adder
// @description    For anyone that is learning japanese and doesn't know all the kanji but knows some hiragana. This adds hiragana called furiga above any kanji via the ruby process at trans.hiragana.jp/ruby this script for now only works on pages that have the .co.jp extension
// @include        *
// ==/UserScript==
/*
	2007-09-27 Dakito <dakito@gmail.com>
*/
function mainFurigana()
{

  var Links = document.links;
  for(var i = 0; i < Links.length; i++)
  {
    link = Links[i];
    if (link.href.indexOf('.co.jp') >= 0)
    {
      furiganaLink(link);
    }
  }
}
function furiganaLink(link)
{
  link.href = 'http://trans.hiragana.jp/ruby/' + link.href;
}

mainFurigana();