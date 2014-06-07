// ==UserScript==
// @author		   yetsun
// @name           Tianya_Filter_Page1
// @namespace      foo
// @include        http://cache.tianya.cn/publicforum/*
// ==/UserScript==


function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function isFirstPage(){
	
	pageEles = xpath("//td/a[@style='text-decoration: underline;']/font");

	if(pageEles){
	
		if(pageEles.snapshotItem(0)){
			if(pageEles.snapshotItem(0).firstChild.nodeValue == '[1]'){
				return false;		
			}else{
				//the first link is not 1
				return true;
			}
		
		}else {
			//if the pagination is there.
			return true;
		}

	}else{


		pageEles = xpath("//div[@id='pageDIV1']/form[@id='pageForm1']/font");

		console.log(pageEles.snapshotLength);


		if(pageEles.snapshotItem(1)){
		
			if(pageEles.snapshotItem(1).firstChild.nodeValue == 1){
				console.log("This is the first page.");

				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}

	}
}


function remove(startIndex, allEles, eLouzhu ){
	var thisEle;
	var titleTable;
	var root;
	var content;

	//removing
	for( i = startIndex; i < allEles.snapshotLength ; i++){
		thisEle = allEles.snapshotItem(i);
		
		if(thisEle){

			if(encodeURI(thisEle.firstChild.nodeValue) == eLouzhu){	

				//thisEle.setAttribute("color", "red");
				//thisEle.setAttribute("size", "20");
				//thisEle.parentNode.parentNode.setAttribute("bgcolor","yellow");

			}else{
				
				console.log("remove the tiezi of " + thisEle.firstChild.nodeValue);


				titleTable = thisEle;
				
				titleTable = titleTable.parentNode;
				while(titleTable.nodeName != 'TABLE'){
					titleTable = titleTable.parentNode;
				}
				

				root = titleTable.parentNode;
				content = titleTable.nextSibling;

				//'#text'
				while(content && content.nodeName != 'TABLE'){
					
					//console.log(content1);
					//console.log("removed:" + content);
					root.removeChild(content);					
					content = titleTable.nextSibling;
					
				}

				root.removeChild(titleTable);

			}
		}
	}
}

console.log("process begin");

var allEles = xpath("//font[@size=-1]/a");	//anchor element

if(allEles){
	
	if(isFirstPage()){

		//the first page, get the louzhu from page
		thisEle = allEles.snapshotItem(0);
		//thisEle.parentNode.parentNode.setAttribute("color", "red");
		//thisEle.parentNode.setAttribute("size", "10");

		louzhu = thisEle.firstChild.nodeValue;
		eLouzhu = encodeURI(louzhu);

		remove(1, allEles, eLouzhu );

	}
}
console.log("process end");