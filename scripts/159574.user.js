// ==UserScript==
// @name        Fark Useless Site Remover
// @description Hides Gawker Media (and other) useless links.
// @include     http://www.fark.com/*
// @include     https://www.fark.com/*
// @grant       none
// @version     1.1
// ==/UserScript==

// Concept from this post by Britney Spear's Speculum
// http://www.fark.com/comments/7516369/81663812#c81663812
// Implementation by MrEricSir
// Adapted by ArcadianRefugee for complete headline removal
//   based on domain name rather than image filename

var dl = document.links;

/////////////////////////////////////////////////////////////
// hated links by URL keyword
// just add your hated domain names to the list
// you may also use any words that appear in the URL
// so if you don't like URLs that mention "reuters" or "iraq"
// you may simply list that keyword
//
// Gawker Media's current holdings (March 2012) are
//    Gawker.com, Deadspin, Lifehacker, Gizmodo, io9, Kotaku,
//    Jalopnik, and Jezebel

var hatedLinks = new Array(
    'gawker.com',
    'deadspin.com',
    'lifehacker.com',
    'gizmodo.com',
    'io9.com',
    'kotaku.com',
    'jalopnik.com',
    'jezebel.com',
    'buzzfeed.com'
)



/////////////////////////////////////////////////////////////
// for every hated site
//   iterate through the links
//     if there is a match
//       and if check to see if a greatgrandparent Node exists
//         and if the grandparent Node is a Headline Row
//           remove the Headline Row

for (j in hatedLinks)
  for (var i=0;i<dl.length;i++)
    if(dl[i].href.indexOf(hatedLinks[j])>-1)
      if(dl[i].parentNode.parentNode.parentNode)
        if(dl[i].parentNode.parentNode.className.indexOf("headlineRow")>-1)
          dl[i].parentNode.parentNode.parentNode.removeChild(dl[i].parentNode.parentNode);


/////////////////////////////////////////////////////////////
// this part kills the "Buzzfeed Partner Unit" links that 
// started to show up recently* by removing all "noscript"
// elements.  I'm sure there's a more elegant solution, but
// I don't see the noscripts as being all that useful either.
//
// * it's some stupid <noscript> thing
//

  var noScripts = document.getElementsByTagName('noscript');
  for (var i=0;i<noScripts.length;i++)
    noScripts[i].innerHTML = "";

