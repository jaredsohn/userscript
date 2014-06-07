// ==UserScript==
// @name          rLatin_Roman_Numerals
// @namespace     http://perk.ee/rLatin_Roman_Numerals
// @description   Converts all the numbers in /r/Latin to roman numerals
// @include       http://www.reddit.com/r/latin/*
// @version       1.0
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	}, false);
    document.body.appendChild(script);
}
function toRoman(j)
{
    return r;
}
function main()
{
  $('.score, .res_comment_ups, .res_comment_downs').each(function()
  {
    var t=$(this).text();
    var j=/\d+/.exec(t)[0];
    if(j==0)
    {
      r='nulla';
    }
    else
    {
      r='';
      while(j>99)
      {
	r+='C';
	j-=100;
      }
      if(j>89)
      {
	r+='XC';
	j-=90;
      }
      if(j>49)
      {
	r+='L';
	j-=50;
      }
      if(j>39)
      {
	r+='XL';
	j-=40;
      }
      while(j>9)
      {
	r+='X';
	j-=10;
      }
      if(j>8)
      {
	r+='IX';
	j-=9;
      }
      if(j>4)
      {
	r+='V';
	j-=5;
      }
      if(j>3)
      {
	r+='IV';
	j-=4;
      }
      while(j>0)
      {
	r+='I';
	j--;
      }
    }
    $(this).text(t.replace(/\d+/,r));
  });
}
addJQuery(main);