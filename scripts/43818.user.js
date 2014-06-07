// ==UserScript==
// @name           538TrollRemover
// @namespace      http://userscripts.org/scripts/show/43818
// @description    Removes troll's comments from fivethirtyeight.com
// @include        http://www.fivethirtyeight.com/*
// @include        http://*.fivethirtyeight.com/*
// ==/UserScript==

/*
I do not mean for people to use this script to create their own echo-chamber on fivethiryeight.com,
but as a stop-gap measure to remove the trolls from the comment section in order to increase the
signal:noise ratio and improve the level of discourse.

Send comments/bugs/feature requests to nicksuserscripts+538TrollRemover@gmail.com
I am busy with other things, but will attempt to fix bugs in a timely manner  
*/

//Add the names of trolls to this array (e.g. trollList[2]='NameOfNewTroll')
var trollList = new Array();
trollList[0] = 'PeteKent';
trollList[1] = 'Jack-be-nimble';
  
commentNames = getElementsByClassName('comment-author', 'dt', document);
commentBodies = getElementsByClassName('comment-body', 'dd', document);
commentFooters = getElementsByClassName('comment-footer', 'dd', document);
var count = 0;
for (var i = 0; i < commentNames.length; i++)
{

	links = commentNames[i].getElementsByTagName("a");
	for(var curTroll = 0; curTroll < trollList.length; curTroll++)
	{
		var trollName = trollList[curTroll];
		
		//currently two anchors in the element
		if(links[1].innerHTML == trollName)
		{
			var wrapper = document.createElement('div');
			wrapper.id = "RemoveCommentWrapper";
			wrapper.innerHTML = "<small><p><a onclick=\"switchMenu('" + trollName + i + "');\">Redacted comment by " + trollName + "</a></p></small>";
			var inner = document.createElement("div");
			inner.id = trollName+i;
			//inner.appendChild(commentNames[i].cloneNode(true));
			inner.appendChild(commentBodies[i].cloneNode(true));
			inner.appendChild(commentFooters[i].cloneNode(true));
			wrapper.appendChild(inner);

			//To Remove the comment entirely, comment out the line immediately below this, and uncomment the line immediately below that
			commentNames[i].parentNode.replaceChild(wrapper, commentNames[i]);
			//commentNames[i].parentNode.removeChild(commentNames[i]);
			
			
			commentBodies[i].parentNode.removeChild(commentBodies[i]);
			commentFooters[i].parentNode.removeChild(commentFooters[i]);
			
			//hide the current redacted node
			var elm = document.getElementById(trollName + i);
			if(elm)
				elm.style.display='none';
			count ++;
		}
	}
}


/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
function getElementsByClassName (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};


//Here to enable people to read the comments if so desired.
(function() {
  function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML =
s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
 }

  function switchMenu(obj) {
    //console.profile();
    // Put everything you need for your Greasemonkey script in here
    // Don't use any of the GM_* functions!
		var el = document.getElementById(obj);
		if ( el.style.display != "none" ) {
			el.style.display = 'none';
		}
		else {
			el.style.display = '';
		}
  }


  embedFunction(switchMenu);
  // Method 1: embed the function call into the current page
  //document.body.appendChild(document.createElement('script')).innerHTML = "testtt('redacted');";
  // Method 2: directly call the function using unsafeWindow
//     window.addEventListener("load", function(e) {
//                   unsafeWindow.myKickassGreasemonkeyScript();
//                   this.removeEventListener('load',arguments.callee,false);
//                 }, false);

 })();
