// ==UserScript==
// @name 	FurAffinity Direct Links: Search
// @description Makes all links in the FurAffinity search page into direct links to the final images/musics/docs. Last tested to work with the layout in November 2010.
// @namespace 	userscripts.org
// @include 	http://www.furaffinity.net/search/*
// ==/UserScript==

// Last tested to work with the layout in November 2010.

var allDivs,thisDiv,innerstring,artistname,interestingNode;
	
allDivs = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody/tr/td/div[2]/table/tbody/tr[2]/td/form/div[3]/fieldset/ul/li/table/tbody/tr/td/table/tbody/tr/td/div/a", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                             
for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
    if (thisDiv.nodeName.toUpperCase()=='A')
    {
  		if (thisDiv.firstChild.nodeName.toUpperCase()=='IMG')
  		{
  			thisDiv.href = thisDiv.firstChild.src.replace(/\.thumbnail\./,'.')
			//doc, docx, rtf, txt, pdf, odt, mid, wav, mp3, mpeg
  			thisDiv.href = thisDiv.href.replace(/\/\/s.\./,'//')
  			thisDiv.href = thisDiv.href.replace(/\.rtf\.gif/,'.rtf')
  			thisDiv.href = thisDiv.href.replace(/\.doc\.gif/,'.doc')
			thisDiv.href = thisDiv.href.replace(/\.docx\.gif/,'.docx')
  			thisDiv.href = thisDiv.href.replace(/\.mp3\.gif/,'.mp3')
  			thisDiv.href = thisDiv.href.replace(/\.txt\.gif/,'.txt')
  			thisDiv.href = thisDiv.href.replace(/\.swf\.gif/,'.swf')
			thisDiv.href = thisDiv.href.replace(/\.pdf\.gif/,'.pdf')
			thisDiv.href = thisDiv.href.replace(/\.odt\.gif/,'.odt')
			thisDiv.href = thisDiv.href.replace(/\.mid\.gif/,'.mid')
			thisDiv.href = thisDiv.href.replace(/\.wav\.gif/,'.wav')
			thisDiv.href = thisDiv.href.replace(/\.mpeg\.gif/,'.mpeg')
  		}
    }
}