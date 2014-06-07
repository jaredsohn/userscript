// ==UserScript==
// @name        AllKPop OP Hide Button
// @namespace   http://www.allkpop.com/profile/rumpelstiltskin
// @description Provides button in threads to show/hide the OP on the allkpop forums
// @include     http://www.allkpop.com/*
// @version     1.3
// ==/UserScript==

var timeoutID = window.setTimeout(delay, 3000);

function delay()
{
    //--- First post is always the first pink post. It is at position 0 in the array.
    var pinkPosts = document.getElementsByClassName('box-con group box-con-pink');
    
    //--- Creation of and styling Show/Hide button
    var opButton = document.createElement('a');
    //opButton.href = "javascript:void(0);";
    opButton.className = "forum_op_btn";
    opButton.style.display = 'block';
    if( pinkPosts[0].style.display === 'none' )
    {
        opButton.appendChild(document.createTextNode('Show OP'));
    }
    else
    {
        opButton.appendChild(document.createTextNode('Hide OP'));
    }
    opButton.style.backgroundColor="#52BEEC";
    opButton.style.color="#FFFFFF";
    opButton.style.fontSize="18px";
    opButton.style.boxShadow="6px 6px 0px 1px #00435D";
    opButton.style.cssFloat="left";
    opButton.style.margin="-5px 20px 10px 0px";
    opButton.style.padding="7px 15px";
    opButton.style.transition="all 0.2s ease-in-out 0s";
    
    //--- Functions of Show/Hide button
    opButton.addEventListener("click", onClick, false); // execute onClick function when pressed
    opButton.addEventListener("mouseover", onHover, false);
    opButton.addEventListener("mouseout", onLeave, false);
    
    //--- Position button before the first post
    var opId = pinkPosts[0].id
    var opFoo = document.getElementById(opId);
    opFoo.parentNode.insertBefore(opButton, opFoo);
    
    
    function onHover()
    {
        opButton.style.backgroundColor="#201B1B";
        opButton.style.boxShadow="6px 6px 0px 1px #555555";
    }
    
    function onLeave()
    {
        opButton.style.backgroundColor="#52BEEC";
        opButton.style.boxShadow="6px 6px 0px 1px #00435D";
    }
    
    function onClick()
    {
    	//--- Hide the OP if its visible. Show OP if its hidden.
    	if( pinkPosts[0].style.display === 'none' )
    	{
    		//--- Get document height
    		var originalHeightString = window.parent.document.getElementById('frame').style.height;
    		originalHeightString = originalHeightString.substring(0, originalHeightString.length - 2);
    		var originalHeightInt = parseInt(originalHeightString);
    		
    		pinkPosts[0].style.display = 'block';
    		opButton.childNodes[0].nodeValue="Hide OP";
    		
    		//--- Get OP height after it is made visible
    		var opHeight = pinkPosts[0].clientHeight;
    		
    		/* Add to document length unless it's still loading. If still loading, the page will auto-resize when finished
    		 * so there's no need to manually resize. Document height is 2000 if page is still loading */
    		if( originalHeightInt > 2000 )
    		{
                var newHeight = originalHeightInt + opHeight;
                window.parent.document.getElementById('frame').setAttribute('style', 'height: ' + newHeight + 'px');
            }
    	}
    	else
    	{
    		//--- Get OP height before it is hidden
    		var opHeight = pinkPosts[0].clientHeight;
    		
    		pinkPosts[0].style.display = 'none';
    		opButton.childNodes[0].nodeValue='Show OP';
    		
    		//--- Get document height
    		var originalHeightString = window.parent.document.getElementById('frame').style.height;
            originalHeightString = originalHeightString.substring(0, originalHeightString.length - 2);
            var originalHeightInt = parseInt(originalHeightString);
            
            /* Cut document length unless it's still loading. If still loading, the page will auto-resize when finished
    		 * so there's no need to manually resize. Document height is 2000 if page is still loading */
    		if( originalHeightInt > 2000 )
            {
                var newHeight = originalHeightInt - opHeight;
                window.parent.document.getElementById('frame').setAttribute('style', 'height: ' + newHeight + 'px');
    		}
    	}
    	
    	//--- Prevent scrolling when clicked (redundant)
    	//var mainBody = document.getElementById('frame');
    	//mainBody.parent.scrollTo(0,0);
    }
}