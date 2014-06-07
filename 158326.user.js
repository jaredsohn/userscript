// ==UserScript==
// @name        FL View More Toggle On/Off
// @namespace   Cromagnon
// @description Toggles on/off the "View More" link at the bottom of the home page feed
// @include     *fetlife.com/home/v4*
// @version     1.0.0201
// ==/UserScript==



// define my own "last()" function for NodeLists
//
//   returns the last node in the node list (or null if the list is empty)
//
function lastNode(nodeList) {

    if (nodeList.length == 0) return null;
    
    return nodeList[ nodeList.length - 1 ];
};



// add the specified class to the given className (string)
//   OR add the class to the given node's .className
//
//      returns either the new className (string)
//      or the original node with the new .className
//
function addClass(classNameOrNode, newClassName) {

    var className = classNameOrNode;
    
    if ((typeof className) != (typeof "")) className = className.className;
    
    if (className != null) {

        var classes = className.split(" ");
        
        var j = classes.indexOf(newClassName);
        
        if (j == -1) {
	
	    className += " " + newClassName;

            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

              else classNameOrNode.className = className;
	};
    };

    return classNameOrNode;
};



// remove a specified class from the given className (string)
//   OR remove the class from the given node's .className
//
//      returns either the new className (string)
//      or the original node with the new .className
//
function removeClass(classNameOrNode, removeName) {

    var className = classNameOrNode;
    
    if ((typeof className) != (typeof "")) className = className.className;
    
    if (className != null) {

        var classes = className.split(" ");
        
        var j = classes.indexOf(removeName);
        
        if (j != -1) {
        
            classes.splice(j,1);
        
            className = classes[0];
        
            for (var i = 1; i < classes.length; i++)

                className += " " + classes[i];

            if (className == null)  className = "";

            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

              else classNameOrNode.className = className;
	};
    };

    return classNameOrNode;
};



// Toggle on/off the view_more link
//
var static_ViewMoreFunc = null;
function toggleViewMore(e) {

    e.preventDefault();
    
    var link = e.target;

    if ((activityFeed == null) || ((activityFeed.viewMore == null) && (static_ViewMoreFunc == null))) return;
    
    var view_more = document.getElementById("view_more");

    if (activityFeed.viewMore == null) {
    
        activityFeed.viewMore = static_ViewMoreFunc;
	
	if (view_more != null) removeClass(view_more, "hide");
	
        var span = document.createElement("span");
        span.className = "picto au2";
        span.innerHTML = "6";
	
	link.innerHTML = "";
        link.appendChild(span);
        link.innerHTML += " Stop Loading";
        
        link.addEventListener("click", toggleViewMore, false);
        link.title = "click to stop loading activities";

        activityFeed.viewMore();

     } else {
    
        static_ViewMoreFunc = activityFeed.viewMore;
	activityFeed.viewMore = null;
    
	if (view_more != null) addClass(view_more, "hide");
	
        var span = document.createElement("span");
        span.className = "picto au2";
        span.innerHTML = "9";
	
	link.innerHTML = "";
        link.appendChild(span);
        link.innerHTML += " Load More";
        
        link.addEventListener("click", toggleViewMore, false);
        link.title = "click to start loading activities again";
    
    };
    
};



// Main function
//
function init() {

    var menu = document.getElementById("hl_injector");
    if (menu == null) menu = lastNode(document.querySelectorAll("#activity_feed_container nav ul li"));
    if (menu == null) return alert("Feed Menu Not Found!");
    
    var link = document.createElement("a");
    link.href = "#";
    link.className = "db un";
    
    var span = document.createElement("span");
    span.className = "picto au2";
    span.innerHTML = "6";
    
    link.appendChild(span);
    link.innerHTML += " Stop Loading";
    
    link.addEventListener("click", toggleViewMore, false);
    link.title = "click to stop loading activities";
    
    var menu_item = document.createElement("li");
    menu_item.appendChild(link);

    if (menu.id == "hl_injector") menu.parentNode.insertBefore(menu_item, menu);
      else menu.parentNode.appendChild(menu_item);
   
};



// Call our main function.
//

init();

//end