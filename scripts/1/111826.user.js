// ==UserScript==
// @name           Weblabor - Minden további csirip
// @namespace      http://userscripts.org/users/278811
// @description    Beszúr még egy további csiripek hivatkozást, közvetlenül a minden nézetre
// @include        http://weblabor.hu/
// @include        http://www.weblabor.hu/
// @version        0.1
// ==/UserScript==

GM_addStyle('.csirip { font-size: smaller; margin-left: 5px; }')
GM_addStyle('.csirip::after { content: "»"; }')

var hivatkozas=[
  ['minden','http://twitter.com/#!/search/realtime/%23weblabor'],
  ['linkes','http://twitter.com/#!/search/links/%23weblabor'],
  ['újabb','#',function(e) { ujabb(e,5) }],
  ['újabb 10','#',function(e) { ujabb(e,10) }],
]

var tovabbi=document.querySelector('.block-wltwitter .more-link a')

if (!tovabbi) return

for (var i=0,l=hivatkozas.length;i<l;i++) {
  var link=document.createElement('a')
  link.className='csirip'
  link.href=hivatkozas[i][1]
  link.innerHTML=hivatkozas[i][0]
  if (hivatkozas[i][2]) link.addEventListener('click',hivatkozas[i][2],false)
  tovabbi.parentNode.parentNode.appendChild(link)
}

function ujabb(e,hany)
{
  var script=document.createElement('script')
  script.src='http://search.twitter.com/search.json?q=%23weblabor&rpp='+hany+'&callback=Drupal.twitterWidget'
  document.head.appendChild(script)
  e.preventDefault()
}
