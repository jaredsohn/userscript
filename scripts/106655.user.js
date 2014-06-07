// ==UserScript==
// @name           GC Auto Scroll
// @namespace      delta68.gc_auto_scroll
// @include        http://www.geocaching.com/pocket/default.aspx*
// ==/UserScript==

var url = document.location.toString();

if(url.indexOf('pocket/default.aspx') > 0)
{

	var pqID = querySt("pq")
	var x = getTRContainingPQ(pqID)
	ScrollToElement(x)

}

function querySt(ji) {
hu = window.location.search.substring(1);
gy = hu.split("&");
for (i=0;i<gy.length;i++) {
	ft = gy[i].split("=");
	if (ft[0] == ji) 
	{
		return ft[1];
	}
}
}

function getTRContainingPQ(pq)
{
	var p = document.getElementById("pqRepeater");
	var descendants = p.getElementsByTagName("tr");
	for(var i=1;i<descendants.length;i++)
	{
		if(descendants.item(i).innerHTML.indexOf(pq)>0)
		{
	        return(descendants.item(i))
		}
	}
}

function ScrollToElement(theElement){

  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                        		      
 window.scrollTo(selectedPosX,selectedPosY);

}