// ==UserScript==
// @name           Rate Book on List Page
// @namespace      pendevin
// @description    Adds a link to the rate page for each book directly on the book lists.
// @include        http://www.ibdof.com/IBDOF-author-booklist.php*
// @include        http://www.ibdof.com/IBDOF-series-booklist.php*
// @include        http://www.ibdof.com/IBDOF-genre-booklist.php*
// ==/UserScript==

function getUrlVars(urlz)
{
	//thanks for the function citizenray
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	return vars;
}

var links=document.getElementsByTagName("span");
for (var i=0;i<links.length;i++)
{
	if (links[i].className=="gen"&&links[i].parentNode.className=="row1"||links[i].className=="gen"&&links[i].parentNode.className=="row2")
	{
		var leenk=links[i].getElementsByClassName("gen")[0];
		var bookId=(leenk)?getUrlVars(leenk.href)["book_id"]:null;
		if (bookId!=null)
		{
			leenk.style.display="none";
			var rateMe=document.createElement("table");
			rateMe.className="rate_container gen";
			rateMe.style.border="0px";
			rateMe.style.borderSpacing="0px";
			rateMe.style.width="100%";
			rateMe.cellPadding="0px";
			rateMe.innerHTML="<tbody><tr><td align='left'><span class='gen'><a class='gen' href='"+leenk.href+"'>"+leenk.innerHTML+"</a></span></td><td align='right'><a style='position: relative; right: 4px;' class='rate_me' href='IBDOF-book-rate.php?book_id="+bookId+"'>Rate</a></td></tr></tbody>";
			links[i].parentNode.appendChild(rateMe);
		}
	}
}