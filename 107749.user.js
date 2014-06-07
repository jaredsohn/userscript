// ==UserScript==
// @name           4chan unique links
// @description    Generate a unique link for each 4chan [Reply] button or >>123456789 quote button
// @version        0.1.5
// @include        http://boards.4chan.org/*
// ==/UserScript==

//PREFERENCES
var longnames = false;
var maskoriginal = false;
var accesskey = 'z';
//END PREFERENCES

var numpost = 0;
var numreply = 0;

var letters = [
"alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel",
"india", "juliet", "kilo", "lima", "mike", "november", "oscar", "papa",
"quebec", "romeo", "sierra", "tango", "uniform", "victor", "whiskey",
"xray", "yankee", "zulu" ];

var numbers = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
                "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
                "nineteen", "twenty" ]

if (accesskey)
  document.getElementsByName('com')[0].accessKey = accesskey;

parse();
document.body.addEventListener('DOMNodeInserted', function(e) { e.target.nodeName == 'TABLE' && parse(e.target); }, true);

function parse(root) {  
  for (var i = 0, node, result = document.evaluate('//a', (root ? root : document.body), null, 6, null);
       i < result.snapshotLength; node = result.snapshotItem(i++))
  {
    if (!node) continue;
    
    if (node.className == "quotejs" && !isNaN(node.textContent))
      node.textContent = generate(numpost++) + (maskoriginal ? '' : ' ' + node.textContent);
      
    if (node.textContent == "Reply")
      node.textContent = node.textContent + ' ' + (longnames && numreply < numbers.length ? numbers[numreply++] : ++numreply);
  }
}

function generate(i)
{
  if (i == 0)
    return ' ' + (longnames ? letters[0] : letters[0][0]);
  
  var o = '';
  
  while (i > 0)
  {
    var floor = Math.floor(i / letters.length);
    
    if (longnames) o = ' ' + letters[i - floor * letters.length] + o;
    else           o =    letters[i - floor * letters.length][0] + o;
    
    i = floor;
  }
  
  return (longnames ? o : ' ' + o);
}