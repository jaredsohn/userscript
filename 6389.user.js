// ==UserScript==
// @name           Wikipedia language highlighter
// @description    Highlight some languages in Wikipedia's sidebar
// @include        http://*.wiki*.org/wiki/*
// @include        http://*.wiktionary.org/wiki/*
// ==/UserScript== 

(function() 
{	  
	  var languages= ["en", "nl"];		// Languages you want to display on top of the list
	  var showExpandWhenNoLangs= false;	// Show link to expand when none of your preferred langs are found
	  									// false just shows all the languages, without the option to expand or collapse the list
										
	  var arrowClosed= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00%8DIDAT8%8D%A5%D3%AD%0E%81a%18%06%E0k%23%086%9B%A4%3B%04%DD%01(NF%D6m%8E%C0%A6%9A%E4%18%9C%81%A4%8A_%D6%8D%5B%FA6%E9%C3%FB%86%3B%3C%E1%B9%C2%F3%23%89%24%B0%C7%A0%AD%7F%8D%0F%20%B8%60Z%03%04w%2Ck%80%E0%85%0Dz%A5%40%9B3%265%40%D0%60%5E%03%04%0F%ACj%806'%8Cj%80%E0P%0A%3C%B0F%BF%04%B8bV2%83'%B6%5D'%DE%05%DC%BA%D6%F7%0D%D8aXr%CA%0D%16%A5%CFt%C4%F8%9F%E6%24%DE%2B%EC%1B%03fm%ECD%00%00%00%00IEND%AEB%60%82";
	  var arrowOpened= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00%AFIDAT8%8D%C5%D3!%0E%C20%14%87%F1%AF%08B0s%3B%00%1E%B0(%14%9A%EC%0AX%3CG%E0%04X%0C'%E0%26%04MP%18%E4%1CA%10%FE%98%07%81n%2B%AC%134%A9%EA%FB~%E2%25u%92hrZ%8Dj%C0%01s%20%8D%EC%CF%00%19%A0%88%7B%03%C6%D8%0E6%11%C0B%12O%20%01N5%E2%AD%24%5E%80!%13%E0%FEC%7C%04%92%02%60%C8%EAK%7C%01%86%1F%8D%07t%81C%00%98%BD%CF%17%00CF%B6a%3F%5E%FB%B3%A5%80!K%2F%DE%01%9D%3A%40%1B%D8%5B%9C%03%BD%B2%B9J%C0%90%3Ep%05%A6U3A%C0%90A%E8%5D%12%EE%EF%BF%F1%01%92%7BFe%8CK8%EE%00%00%00%00IEND%AEB%60%82";										
	  
	  toggle= function()
	  {
		  var item = document.getElementById("expand");
		  list= item.parentNode.childNodes;
		  for(a= placeOfCollapse; a < list.length-1; a++)
		  {
			  while(list[a].nodeName != 'LI') { a++; }
			  if(show == true) list[a].style.visibility= 'hidden';
				  else list[a].style.visibility= 'visible';
		  }
		  if(show == true)
		  {
			show= false;
			icon= arrowClosed;
			height= (placeOfCollapse + 2) * item.parentNode.firstChild.offsetHeight + 5;
		  }
		  else
		  {
			show= true;
			icon= arrowOpened;
			height= (placeOfCollapse + 2) * item.parentNode.firstChild.offsetHeight * item.parentNode.childNodes.length;
		  }
			
		  document.getElementById('p-lang').style.height = height + 'px';
		  item.firstChild.src= icon;
	  }
	  
	  var pLang = document.getElementById("p-lang");
	  if(!pLang) { return; }
	  var lLang = pLang.getElementsByTagName("li");
	  	  
	  // Create and append link to collapse/expand additional languages
	  var more = document.createElement("a");
	  more.href= "javascript:void(null)";
	  more.setAttribute("id", "expand");
	  more.innerHTML= "<img src=" + arrowClosed + " width='10' height='10'> More languages";
	  more= pLang.getElementsByTagName("ul")[0].appendChild(more);
	  more= more.parentNode.insertBefore(more, more.parentNode.firstChild);
	  
	  // execute toggle() when an onClick event appears
	  var elmLink = document.getElementById('expand');
	  elmLink.addEventListener("click", toggle, true);
	  
	  var show= true;			// Additional languages visible or not?
	  var placeOfCollapse= 0, otherLangs= 0;

	  for (var i = 0; i < lLang.length; i++)
	  {
			langFound= placeOfCollapse;
			for(var j= 0; j < languages.length; j++)
			{ 	
				wpClass = lLang[i].getAttribute("class");
				if(wpClass == "interwiki-" + languages[j])
				{	
					lLang[i].parentNode.insertBefore(lLang[i], lLang[i].parentNode.firstChild);
					placeOfCollapse++;
				}
			}
			if(langFound == placeOfCollapse) otherLangs++;
	  }
	  
	  if(((placeOfCollapse == 0) && (showExpandWhenNoLangs == false)) || (otherLangs == 0)) more.parentNode.removeChild(more);
	  	else toggle();
})();
