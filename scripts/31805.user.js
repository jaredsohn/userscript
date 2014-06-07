// ==UserScript==
// @name           HN keyboard navigation
// @namespace      http://jauco.nl/greasemonkey/HNKB
// @description    Adds keyboard shortcuts to HackerNews. press 'h' for a list.
// @include        http://news.ycombinator.com/*
// ==/UserScript==

//add a cursor to the top story
//move the cursor up and down
//add help screen
//open the current link
//open the comments page
//scroll window while moving
//vote up and down
//The same for comments
//store the cursor location
//nicer scroll
//open links from comments
//scroll on towards the top/bottom when the last node is hit
//upvote article from the comment page
//FIXME:Make everything an xpath

const CURSOR = "➤ ";      //the cursor character
var cursorpointer = 0;    //Where the cursor is located
var stories = null;       //placeholder for the list of links/comments (ie. 
                          //wherever the cursor is going to iterate over)

/**
  The keyboard shortcut mappings.
  the dict key is the shortcut, 
 -  the first string is the helptext for normal use
 -  the second string is the helptext for shift-key use 
 -  the third item is a function that will be called with one parameter 
    indicating whether shift was pressed or not.
*/
const ACTIONS = {  
  "j":["move to the next article/comment","jump by five", function(upperCase) {
    movepointer(1+4*upperCase);
  }],
  "k":["move to the previous article/comment","jump by five", function(upperCase) {
    movepointer(-1*(1+4*upperCase));
  }],
  "v":["Open link","in new tab", openlink],
  "c":["Open comments/reply to comment","in new tab", opencomments],
  "h":["Show this help","", showhelp],
  "u":["Vote up", "When on comments page, vote on OP",voteup],
  "d":["Vote down","", votedown],
  "m":["more","", gotonextpage],
};

/**
 * get specific items on the page.
 * This function will return the element that is identified by the parameter.
 * It's used on storylist pages, such as the main page, or the recently added 
 * page.
 */
function storylist_getitem(id){
    obj = stories.snapshotItem(cursorpointer);
    switch(id){
        //the currently selected element
        case "self":
            return obj;
        //The cursor place
        case "cursor":
            return obj.childNodes[0];
        //the story link
        case "link":
            return obj.childNodes[3].childNodes[0];
        //the comments link
        case "comments":
            return obj.nextSibling.childNodes[1].childNodes[4];
        //the vote up link
        case "voteUp":
            return obj.childNodes[2].childNodes[0].childNodes[0];
        //the vote down link
            //doesn't exist
        //then last element of the item
        case "itemEnd":
            return obj.nextSibling.nextSibling;
        //the "more" link
        case "more":
            return document.evaluate("//a[./text()='More']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        default:
            return null;
    }
}

/**
 * get specific items on the page.
 * The same function as above, but for pages that show a list of comments.
 */
function comments_getitem(id){
    obj = stories.snapshotItem(cursorpointer);
    switch(id){
        case "self":
            return obj;
        //The cursor place
        case "cursor":
            return obj.childNodes[0];
        case "more":
            return document.evaluate("//a[./text()='More']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        //the story link
        case "link":
            return document.evaluate("//td[@class='title']/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        //the comments link
        case "comments":
            return obj.childNodes[3].childNodes[4].childNodes[0].childNodes[0].childNodes[0];
        //the vote up link
        case "voteUp":
            return obj.childNodes[2].childNodes[0].childNodes[0];
        //the vote up link for an article on a comments page
        case "voteUpArticle":
            return document.evaluate("//td[@class='title']/preceding-sibling::td//a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        //the vote down link
        case "voteDown":
            return obj.childNodes[2].childNodes[0].childNodes[3];
        //then last element of the item
        case "itemEnd":
            return obj;
        default:
            return null;
    }
}

/**
 * the main function that sets up all of the interaction. 
 * it has the same code twice for comments and stories. I'll turn it into
 * something more generic once more than three types of pages need support.
 */
function setUpPointer(){
    //the story list and comments are quite different, test if it's comments
    //otherwise pretend it's a story list, the script will fail gracefully if 
    //it's neither
    if (window.location.pathname == "/item" || window.location.pathname == "/threads" || window.location.pathname == "/newcomments"){
        if (window.location.pathname == "/newcomments"){
            stories = document.evaluate("//tr[following-sibling::tr[1][@style='height: 15px;']]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        else {
            stories = document.evaluate( "//tr[count(./td)=3 and ./td/@valign='top' and ./td/@class='default']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        if (!stories.snapshotLength) { return; }
        for (i=0;i<stories.snapshotLength;i++){
            var td = document.createElement("td");
            td.setAttribute("style","width:1em;");
            stories.snapshotItem(i).insertBefore(td,stories.snapshotItem(i).childNodes[0]);
        }
        window.getItem = comments_getitem;
    }
    else {
        //find the story nodes 
        stories = document.evaluate( "//td[@class='title' and @valign='top' and @align='right']/..", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (!stories.snapshotLength) { return; }
        for (i=0;i<stories.snapshotLength;i++){
            stories.snapshotItem(i).insertBefore(document.createElement("td"),stories.snapshotItem(i).childNodes[0]);
            stories.snapshotItem(i).nextSibling.childNodes[0].setAttribute("colspan",parseInt(stories.snapshotItem(i).nextSibling.childNodes[0].getAttribute("colspan"))+1);
        }
        window.getItem = storylist_getitem;
    }
    movepointer();
    window.addEventListener('keypress', keyHandler, false);
}

/**
 * This function comes from Mihai Parparita's gmail macro script at
 * http://blog.persistent.info/2005/12/greasemonkey-christmas.html
 * I have made some changes, but most of it is his.
 */
function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return false;
  }  
  
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }
  
  var k = String.fromCharCode(event.charCode).toLowerCase();
  
  if (k in ACTIONS) {
    //the parameter indicates whether the user held 'shift' 
    //while pressing the key
    ACTIONS[k][2](event.charCode < 97);
    return true;
  }
  return false;
}

/*******************************************************************************
  helper functions
*******************************************************************************/

/**
 * Simulate that we clicked an anchor tag
 */
function clickAnchor(upperCase,anchor){
  if ("href" in anchor){
      if (upperCase)
          GM_openInTab(anchor.href);
      else
          window.location = anchor.href;
  }
}

/**
 * helper function to see where we have to scroll to
 */
function getAbsoluteOffset(element){
    if (element.offsetParent){
        return element.offsetTop+getAbsoluteOffset(element.offsetParent);
    }
    else {
        return element.offsetTop;
    }
}

/*******************************************************************************
   THE CALLBACK FUNCTIONS
*******************************************************************************/

/**
 * move the pointer offset places.
 * @offset: an integer describing how many places to move to pointer. Negative
 *          moves up, positive moves down.
 */
function movepointer(offset){
    var token = window.location.pathname+window.location.search;
    var tStamp = new Date();
    if (offset === undefined){
        if (tStamp.getTime() - GM_getValue(token+"_time",tStamp.getTime()) > 600000){//10 minutes in milliseconds
            offset = 0;
            cursorpointer = 0;
        }
        else {
            offset = 0;
            cursorpointer = GM_getValue(token,0);
        }
    }
    if (cursorpointer > 0 && cursorpointer < stories.snapshotLength-1){
        if(cursorpointer + offset >= stories.snapshotLength)
          offset = stories.snapshotLength-cursorpointer-1;
        if(cursorpointer + offset < 0)
          offset = -cursorpointer;
    }
    //are we moving to a new topic...
    if (cursorpointer + offset >= 0 && cursorpointer + offset < stories.snapshotLength){
        getItem("cursor").innerHTML = "";
        cursorpointer = cursorpointer + offset;
        GM_setValue(token,cursorpointer);
        GM_setValue(token+"_time",tStamp.getTime()+"");
        getItem("cursor").innerHTML = CURSOR;
        //And now, to scroll to the proper location.
        //I could have used scrollInto, but that one doesn't work as nice as this.
        if (window.pageYOffset > getAbsoluteOffset(getItem("self"))){
          window.scroll(window.pageXOffset,getAbsoluteOffset(getItem("self")));
        }
        else {
            if (window.pageYOffset+window.innerHeight < getAbsoluteOffset(getItem("itemEnd")) + getItem("itemEnd").clientHeight){
              window.scroll(window.pageXOffset,getAbsoluteOffset(getItem("itemEnd"))-window.innerHeight+getItem("itemEnd").clientHeight);
            }
        }
    }
    //...or have we reached the bottom.
    else {
        if (cursorpointer == 0 && offset < 0){
            window.scroll(window.pageXOffset,0);
        }
        if (cursorpointer == stories.snapshotLength-1 && offset > 0){
            window.scroll(window.pageXOffset,document.height);
        }
    }
}

/**
 * show a little div with the explanation of the commands
 */
function showhelp(){
    var helpWin = document.getElementById('shortcuthelp')
    if (helpWin){
        if (helpWin.style.display == "block"){
            helpWin.style.display = "none";
        }
        else {
            helpWin.style.top = window.pageYOffset+40;
            helpWin.style.display = "block";
        }
    }
    else {
        helpWin = document.createElement("div");
        helpText = document.createElement("div");
        helpWin.setAttribute("id","shortcuthelp");
        helpWin.innerHTML = "<div style='color:black; background-color:#ff6600; width:100%; font-weight:bold;'>Shortcut commands</div><div style='font-size:.8em;'><i>Use shift as a modifier</i></div>";
        helpWin.appendChild(helpText);
        for( i in ACTIONS) {
          helpText.innerHTML += "<pre style='display:inline'>"+i+"</pre> : "+ ACTIONS[i][0]+"<br/>";
          if (ACTIONS[i][1].length > 0 ){
            helpText.innerHTML += "<pre style='display:inline; padding-left:1em;'>"+i.toUpperCase()+"</pre> : "+ ACTIONS[i][1]+"<br/>";
          }
        }
        helpWin.setAttribute("style","display: block; position: absolute; top: "+(window.pageYOffset+40)+"px; right: 10px; background-color: rgb(246, 246, 239);");
        helpText.setAttribute("style","padding:5px;");
        
        document.childNodes[0].childNodes[1].appendChild(helpWin);
    }
}

/**
 * go to the next page.
 */
function gotonextpage(upperCase){
  clickAnchor(upperCase,getItem("more"));
}

/**
 * open the link of the currently selected story.
 */
function openlink(upperCase){
  clickAnchor(upperCase,getItem("link"));
}

/**
 * open the comments of the currently selected story.
 */
function opencomments(upperCase){
  clickAnchor(upperCase,getItem("comments"));
}

/**
 * Vote on the currently selected link/comment.
 */
function voteup(uppercase){
  if (uppercase){
    if (getItem("voteUpArticle") !== null){
        unsafeWindow.vote(getItem("voteUpArticle"));
    }
  }
  else {
    unsafeWindow.vote(getItem("voteUp"));
  }
}

/**
 * Vote down on the currently selected link/comment.
 */
function votedown(){
  unsafeWindow.vote(getItem("voteDown"));
}

//Call the main function
setUpPointer();
