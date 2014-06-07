// ==UserScript==
// @name           HBMorePosts
// @namespace      handbag.com
// @description    Increase number of posts shown per page
// @include        http://www.handbag.com/vbulletin/showthread.php?t*
// @include        http://www.handbag.com/forums/showthread.php?t*
// ==/UserScript==
function getPageURL(oldPageURL,pageNum)
{
	//alert(oldPageURL);
	var pageNumPos=oldPageURL.indexOf("&page=");
	//alert(pageNumPos);
	var retval;
	if(pageNumPos==-1)retval=oldPageURL+"&page="+pageNum;else retval=oldPageURL.substr(0,pageNumPos+6)+pageNum;
	//alert(retval);
	return(retval);
}

function appendPosts(divToFill,pageToGet){
	var thisURL=document.URL;
	var getURL;
	//Check whether current document.URL already has page=x in querystring
	//page=x is always last argument, and never the first (ie, preceded by '&' not '?')
	getURL=getPageURL(thisURL,pageToGet);
	GM_xmlhttpRequest({
		method: "GET",
		url: getURL,
		onload: function(result) {
			var gotText=result.responseText;
			var postsInnerStartPos=gotText.indexOf('<div id="posts">'); //16 chars there
			var postsInnerEndPos=gotText.indexOf('<div id="lastpost"></div></div>');//31 chars in that
			var divBody=gotText.substring(postsInnerStartPos+16,postsInnerEndPos+31);
			divToFill.innerHTML=divBody;
			}
	});
}

var allDivs, thisDiv, allCells, thisCell, pagesText;
pagesText="Page 1 of 1";
allDivs = document.evaluate("//div[@class='pagenav']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
thisDiv = allDivs.snapshotItem(0);
if(thisDiv!=null){
allCells = document.evaluate("table/tbody/tr/td",thisDiv,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
thisCell = allCells.snapshotItem(0);
pagesText=thisCell.innerHTML;}
//alert(pagesText);
//pagesText is of the form "Page x of y" where integers x,y>0;x<=y
var x,y,ofPos,xLen;
ofPos=pagesText.indexOf("of");
//Start of x is always char index 5
xLen=ofPos-6;
x=pagesText.substr(5,xLen);
y=pagesText.substr(ofPos+3);
//Pages to grab: rest of thread if there aren't more than the maxExtraPages
var maxExtraPages=20,numExtraPages;
if(y-x>maxExtraPages)numExtraPages=maxExtraPages; else numExtraPages=y-x;
var offset,pageNum;
//Create DIVs after the original page's DIV id=posts: DIV id=posts1, posts2, posts3...
var insertPoint=document.evaluate("//div[@id='posts']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
//insertPoint.innerHTML
var newDiv;
for(offset=1;offset<=numExtraPages;offset++)
{
	pageNum=x+offset;
	//Create DIV in original page
	var newDivId='posts' + offset;
	newDiv=document.createElement('div');
	newDiv.setAttribute('id',newDivId);
	insertPoint.parentNode.insertBefore(newDiv,insertPoint.nextSibling);
	insertPoint=newDiv;
	appendPosts(insertPoint,+x+offset);
}
//Add one more div here, to put in a "more" link if required
//alert('x:'+x+' y:'+y+' extra:'+numExtraPages);
if((+x+numExtraPages)<y){
newDiv=document.createElement('div');
newDiv.setAttribute('id','morelink');
newDiv.setAttribute('width','100%');
newDiv.innerHTML='<a href="'+getPageURL(document.URL,+x+offset)+'"><font size=20 align=center>MORE</font></a>';
insertPoint.parentNode.insertBefore(newDiv,insertPoint.nextSibling);
}