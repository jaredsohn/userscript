// ==UserScript==
// @name          Associate Newzbin files with http://binsearch.info
// @description   Provides a link with label nzb. It's not perfect but it does make it easier to search for nzb files
// @include       http://v3.newzbin.com/*
// @include       http://www.newzbin.com/*
// @include       http://newzbin2.es/*
// ==/UserScript==

String.prototype.reverse = function(){
splitext = this.split("");
revertext = splitext.reverse();
reversed = revertext.join("");
return reversed;
}

var items = document.evaluate(
   "//tbody[@class='odd']|//tbody[@class='odd-new']|//tbody[@class='even']|//tbody[@class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);
   
for (var i = 0; i < items.snapshotLength; i++)
{
   itemBody = items.snapshotItem(i);
   var titleText = itemBody.getElementsByTagName('td');
	 var url = "<a href='http://binsearch.info/index.php?q=[search]&m=&max=25&adv_g=[group]&adv_age=[date]&adv_sort=[sort]&minsize=&maxsize=&font=&postdate=10date' target='_blank' title='[title]'>[name]</a>";
	 var strNFO = "";
	 var strGroup = "";
	 var strDate = "";
	 var strSort = "date";

   var regexp = new RegExp("View Report NFO .(.*)\.nfo");
   var nfoTitle = itemBody.innerHTML.match(regexp);

   if (nfoTitle == null) {
     var regexp = new RegExp("\">(.*).</a></strong>");
     var nfoTitle = itemBody.innerHTML.match(regexp);
		 
		 if (nfoTitle == null)
		  strNFO = "";
 	 	 else
  		 strNFO = nfoTitle[1].substring(nfoTitle[1].reverse.indexOf,10);
	 } else
  	 strNFO = nfoTitle[1];

   var regexp = new RegExp("/group/p/(.*)\/\"");
	 var nfoTitle = itemBody.innerHTML.match(regexp);
	 
	 if (nfoTitle != null)
	   strGroup = nfoTitle[1];

   var regexp = new RegExp(">(.*) days");
	 var nfoTitle = itemBody.innerHTML.match(regexp);

   if (nfoTitle != null)
	 {
		 strSort = "asc_date"
		 switch (true)
		 {
			 case (parseInt(nfoTitle[1]) < 4): strDate = 7; strSort = "date"; break;
			 case (parseInt(nfoTitle[1]) < 7): strDate = 7; break;
			 case (parseInt(nfoTitle[1]) < 14): strDate = 14; break;
			 case (parseInt(nfoTitle[1]) < 21): strDate = 21; break;
			 case (parseInt(nfoTitle[1]) < 50): strDate = 50; break;
			 case (parseInt(nfoTitle[1]) < 70): strDate = 70; break;
			 case (parseInt(nfoTitle[1]) < 99): strDate = 99; break;
			 case (parseInt(nfoTitle[1]) < 120): strDate = 120; break;
			 default: strDate = 365; strSort = "date"; break;
		 }
	 }
	 

   if (strNFO.length > 0)
      titleText[2].innerHTML +=  url.replace("[search]" , strNFO).replace("[name]","nzb").replace("[title]","NZB link to www.binsearch.info").replace("[group]",strGroup).replace("[date]",strDate).replace("[sort]",strSort);
}	 