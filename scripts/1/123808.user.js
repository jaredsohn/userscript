// ==UserScript==
// @name           thread win
// @namespace      bperkins
// @description    thread win
// @include        http://www.metafilter.com/*
// ==/UserScript==


var savedstuff;

var winNode;
var unwinNode;
var copy;



function sortFav(a,b) {



    return (-(getFav(a)-getFav(b)));

}
function getFav(a) 
{
   var thing = a.getElementsByTagName("SPAN");
   if (thing.length ==0 ) {
          return 1;
    }   

    thing = thing[0].getElementsByTagName("SPAN");


    if (thing.length ==0) {
    	
       thing = a.getElementsByTagName("SPAN");
       if (thing.length ==0 ) {
          return 1;
       }
       thing =thing[0].getElementsByTagName("A");
           

       thing =new Array(thing[2]);

	if (thing == undefined) {
          thing= new Array();
          
        }	

    } else {


    thing = thing[0].getElementsByTagName("SPAN");
    

    thing = thing[0].getElementsByTagName("A");
    }
    var fav =0;
    re = new RegExp("\\d+")


    if (thing.length > 0 &&thing[0] != undefined ) { 

      var m =re.exec(thing[0].innerHTML);
      fav=m[0]

        }


    return (1*fav)+1;

}




function  unwin () {

    copy.replaceChild(winNode,unwinNode);

    page = document.evaluate(
			     "//div[@id='page']",
			     document,
			     null,
			     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			     null);


    for (var i = 0; i < page.snapshotLength; i++) {
   
	var parent=page.snapshotItem(i);
	
	var newstuff = parent.childNodes;
		
	while ( newstuff.length >0 ) {
	    
	    parent.removeChild(newstuff[0]);
	}
	

	for (var j = 0; j < savedstuff.length; j++) {
	    parent.appendChild(savedstuff[j]);
	}   
	
    }
}


function  threadwin () {

    copy.replaceChild(unwinNode,winNode);


    page = document.evaluate(
			     "//div[@id='page']",
			     document,
			     null,
			     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			     null);


    for (var i = 0; i < page.snapshotLength; i++) {
   
	var parent=page.snapshotItem(i);
	    
	var stuff = parent.childNodes;
	var commentidxs = new Array;
	var comments = new Array;
	var objects = new Array ;
	 savedstuff=new Array;

	var k=0;     
	var favs =""

	    for (var j = 0; j < stuff.length; j++) {

        
		if (stuff[j].nodeName.toUpperCase()=="DIV" &&stuff[j].getAttribute("class") == "comments") {

      
		    commentidxs.push(j);
		    comments.push(stuff[j]);
		} 
   
		objects.push(stuff[j]);
		savedstuff.push(stuff[j]);

	    }

	comments.sort(sortFav);

	for (var j = 0; j < comments.length; j++) {
	    objects[commentidxs[j]]=comments[j];
	}


	while ( stuff.length >0 ) {

	    parent.removeChild(stuff[0]);
	}


	for (var j = 0; j < objects.length; j++) {
	    parent.appendChild(objects[j]);
	}   

    }
}


res = document.evaluate(
    "//div[@class='copy']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

copy=res.snapshotItem(0)

    if (copy.parentNode.id == "page" ) {


	winNode = document.createElement('a');
	winNode.innerHTML = "<small>[threadwin]</small> ";
	winNode.href ="#";
	winNode.addEventListener("click", threadwin, true);
	
	copy.appendChild( winNode );
	
	unwinNode = document.createElement('a');
	unwinNode.innerHTML = "<small>[unwin]</small>";
	unwinNode.href ="#";
	unwinNode.addEventListener("click", unwin, true);
	

	
    }
