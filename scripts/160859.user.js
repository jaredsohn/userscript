// ==UserScript==
// @name           [Gmail Window Enhancer]
// @namespace      aron
// @description    Implements chat and compose window resizing in Gmail similar to what is found in Google Plus.
// @include        http*://mail.google.*/*
// @version        1.4.1
// @icon           https://dl.dropbox.com/u/2795941/userscripts/bug.png
// @noframes
// ==/UserScript==

/*
    Copyright (c) 2013 Aaron Myles Landwehr
    Email: snaphat@gmail.com
    Website: http://www.bananahut.net

    Originally modeled off of Facebook Chat: Sort and Resize (Crude) by freshwire
    see: http://userscripts.org/scripts/show/132423
*/

//don't run on frames or iframes.
if (window.top != window.self)
{
    return;
}

//don't load if there are no iframes avaliable (1 on opera for popouts...)
//this is so the script doesn"t load for popped out chat windows.
if (document.getElementsByTagName("iframe").length < 2)
{
    return;
}

// inject jQuery First.
(function()
{
    injectJQuery();
})();

// inject jQuery.
function injectJQuery()
{
    var script = document.createElement("script");
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    script.addEventListener("load", injectJQueryUI, false); // call injector.
    document.head.appendChild(script);
}

//Injects jQuery UI.
function injectJQueryUI()
{
    var script = document.createElement("script");
    script.src = "//ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js";
    script.addEventListener("load", injectCode, false); // call injector.
    document.head.appendChild(script);
}

//Injects our Code - once jQuery is done.
function injectCode()
{
    //Inject our code.
    var script = document.createElement("script");
    script.textContent = "jQ=jQuery.noConflict();(" + injectedCode.toString() + ")();";
    document.body.appendChild(script);
}

//All of our injected code is here.
function injectedCode()
{
///=============================================================================
///    Disables the overlay (think invisible curtain) for use when we          =
///=============================================================================
    function createChatStruct(domElement)
    {
        ///Note: the naming conventions below correspond to the physical layout
        ///of elements on screen.

        //Stores all useful chat box related variables.
        var chat = {};

        //The actual shown chatbox
        chat.box = jQ(domElement);

        //Add a reference to our chat data to the actual DOM element - useful to see if we've already handled a particular box.
        chat.box.data("chat", chat);

        //document the chatbox resides within.
        chat.document = jQ(document);

        //Top google bar.
        chat.gbar = jQ("#gbx3");
        
        //Body of the chat (we use it to check if the chat is hidden).
        chat.body = chat.box.children(".nH.Hy").next();

        //History pane is where text that has been sent is shown (or in the case of compose windows - a message body).
        //Check if we are chat box or compose window.
        if(chat.box.find(".M9").length == 0)
        {
            //Actual chat box.
            chat.historyPane = chat.box.find(".nH.ko.aXjCH");

            //normal and minimum chat window width as per google.
            chat.normWidth = 260;
            chat.minWidth = 200;
            
            //Inner Window is the width of the chat box up to the top of the page.
            chat.innerWindow = chat.box.closest(".nH.nn");
            chat.innerWindow.css("min-width", chat.minWidth);

            //Outer Window is the same as the inner window + the white space
            //inbetween this chat box and the one to the right.
            chat.outerWindow = chat.box.closest(".no").closest(".nH.nn");
            chat.outerWindow.css("min-width", chat.minWidth+5);
            
            //Title bar for programmatically clicking exit.
            chat.innerTitleBar = chat.box.find(".Hj").closest("tr");
            chat.outerTitleBar = chat.box.parent(".nH");
        }
        else
        {
            //Compose window.
            chat.historyPane = chat.box.find(".qz.aXjCH");

            //minimum compose window width per as googles minimized minimum
            //Note: 510 is the maximized minimum.
            //Note: 260 is the minimized minimum.
            chat.normWidth = 510;
            chat.minWidth = 510;//This isn't a real minimum width, but what is checked for when resizing chats.
            
            //Inner Window is the width of the chat box up to the top of the page.
            chat.innerWindow = chat.box.closest(".nH.nn");
            chat.innerWindow.css("min-width", 260);

            //Outer Window is the same as the inner window + the white space
            //inbetween this chat box and the one to the right.
            chat.outerWindow = chat.box.closest(".no").closest(".nH.nn");
            chat.outerWindow.css("min-width", 260+5);
            

            //Remove height restrictions imposed by google for compose windows.
            chat.historyPane.parent(".GP").addClass("removAllHeightRestrictionsStyle");
            chat.historyPane.addClass("removMaxHeightRestrictionsStyle");
            
            //Title bar for programmatically clicking exit.
            chat.innerTitleBar = chat.box.find(".Hp").closest("tr");
            chat.outerTitleBar = chat.box.parent(".nH");
        }
        
        //Functions to call to check if a chat is hidden or minimized.
        chat.hidden = function() { return chat.outerWindow.css("display") == "none"; };
        chat.minimized = function() { return chat.body.css("display") == "none"; };

        //Create pull resize corner grip.
        chat.cornerGrip = jQ("<div class=\"cornerResizeHandle\"></div>");
        chat.cornerGrip.height(12);
        chat.cornerGrip.width(12);
        chat.cornerGrip.css("left", -6);
        chat.cornerGrip.css("top", -6);
        chat.cornerGrip.css("background", "transparent");
        chat.cornerGrip.css("cursor", "nw-resize");
        chat.cornerGrip.css("position", "absolute");
        chat.cornerGrip.css("z-index", "2000");

        //Create pull resize top grip
        chat.topGrip = jQ("<div class=\"topResizeHandle\"></div>");
        chat.topGrip.height(12);
        chat.topGrip.width("100%");
        chat.topGrip.css("left", 0);
        chat.topGrip.css("top", -6);
        chat.topGrip.css("background", "transparent");
        chat.topGrip.css("cursor", "n-resize");
        chat.topGrip.css("position", "absolute");
        chat.topGrip.css("z-index", "1000");

        //Create pull resize left grip
        chat.leftGrip = jQ("<div class=\"leftResizeHandle\"></div>");
        chat.leftGrip.height("100%");
        chat.leftGrip.width(12);
        chat.leftGrip.css("left", -6);
        chat.leftGrip.css("top", 0);
        chat.leftGrip.css("background", "transparent");
        chat.leftGrip.css("cursor", "w-resize");
        chat.leftGrip.css("position", "absolute");
        chat.leftGrip.css("z-index", "1000");

        //prepend grips to the chatbox.
        chat.box.prepend(chat.cornerGrip);
        chat.box.prepend(chat.topGrip);
        chat.box.prepend(chat.leftGrip);

        return chat;
    }


///=============================================================================
///    Disables the overlay (think invisible curtain) for use when we          =
///    resizing windows. It rest on top of everything so that the mouse        =
///    doesn't select anything when dragging.                                  =
///=============================================================================
    function enableOverlay(cursorType)
    {
        //create the overlay
        var overlay = jQ("<div class=\"overlayMask\"></div>");
        overlay.height("100%");
        overlay.width("100%");
        overlay.css("background", "transparent");
        overlay.css("cursor", cursorType);
        overlay.css("position", "absolute");
        overlay.css("z-index", "3000");

        jQ(document.body).prepend(overlay);
    }

///=============================================================================
///    Disables the overlay (think invisible curtain) for use when we          =
///    resizing windows.                                                       =
///=============================================================================
    function disableOverlay()
    {
        //Delete the overlay.
        jQ(".overlayMask").remove();
    }

///=============================================================================
///    Doubles the internal viewport width to allow for chats to appear off to =
///    the left side. Used to mimick (Gogo style) Google Plus's behavior when  =
///    resizing windows that exceed the screen viewport width.                 =
///=============================================================================
    function doubleInternalViewportWidth()
    {
        //Div tag that includes every chat window.
        var house = jQ(".dw").children("div").children(".nH");

        //Set to float right so that chat windows can float off screen on the left side.
        house.css("float", "right");

        //Double width, assumes that user can only ever have at maximum two chatboxes fully extended.
        house.css("width", jQ(window).width()*2);
    }

///=============================================================================
///    Iterates and resizes chats so that none are out of bounds. Resizes      =
///    are ordered by size, starting with the largest window first.            =
///    The user is responsible for choose whther to use normal or              =
///    minimum widths during resizing.                                         =
///                                                                            =
///    chats: array of chats to resize.                                        =
///    resizeAmount: the amount we need to resize by.                          =
///    useNormalWidth: Whether to use normal width or not.                     =
///=============================================================================
function iterateResize(chats, resizeAmount, useNormalWidth)
{
    //Iterate chats.
    chats.each(function()
    {
        //Get the chat data.
        iter = jQ(this).data("chat");
        
        //Check if chat is even displayed.
        if(iter.hidden() == false)
        {
            //Get the width.
            startInnerWidth = iter.innerWindow.width();
            startOuterWidth = iter.outerWindow.width();

            //Get the difference between the minimum width and current width.

            if(useNormalWidth == true)
            {
                diff = iter.outerWindow.width() - (iter.normWidth+5);
            }
            else
            {
                diff = iter.outerWindow.width() - (iter.minWidth+5);
            }
            if(diff > 0)
            {
                //Create a click event on the historyPane (unselect recipients if selected).
                //Fixes an issue where the bottom bar of compose windows doesn't resize if 'Recipients' is selected.
                evt = document.createEvent("MouseEvents");
                evt.initEvent("click",true,true);
                iter.historyPane.get(0).dispatchEvent(evt);

                //Get the amount to shrink by.
                shrinkAmount = Math.min(resizeAmount, diff);

                //Adjust how much we are over still.
                resizeAmount -= shrinkAmount;

                //Resize the chat window.
                iter.innerWindow.width(startInnerWidth - shrinkAmount);
                iter.outerWindow.width(startOuterWidth - shrinkAmount);
            }
        }
    });
    
    return resizeAmount;
}

///=============================================================================
///    Checks if a chat is out of bounds and if so resizes chats (including    =
///    itself) to accomodate it.                                               =
///                                                                            =
///    checkedChat: The chat box to check bounds for.                          =
///    dontResizeChat: A chat box we don't want to resize when resizing chats. =
///                    If all else fails we will resize it though.             =
///=============================================================================
    function checkBoundsResizer(checkedChat, dontResizeChat)
    {
        //Since we are resizing, make sure the state is consistent. It won't be if google changed it.
        if(checkedChat.minimized())
        {
            //windows minimized change state.
            checkedChat.cornerGrip.css("display", "none");
            checkedChat.topGrip.css("display", "none");
            checkedChat.leftGrip.css("display", "none");
        }
        else
        {
            //window unminimized change state.
            checkedChat.cornerGrip.css("display", "");
            checkedChat.topGrip.css("display", "");
            checkedChat.leftGrip.css("display", "");
        }
        
        //Check if chat is out of the browser window top bounds.
        bounds = checkedChat.box.offset().top - checkedChat.gbar.height() - 5;
        if(bounds < 0)
        {
            //Get the length it is over.
            lengthOver = -1 * bounds;

            //Get the chats height.
            startHeight = checkedChat.historyPane.height();

            //Resize the chat window.
            checkedChat.historyPane.height(startHeight - lengthOver);
        }

        //Check if chat is out of the browser window left bounds.
        bounds = checkedChat.box.offset().left - 5;// -5 for space between chats.
        if(bounds < 0)
        {
            //Get the length it is over.
            lengthOver = -1 * bounds;

            //Order chats in descending order - we want to shrink the largest first.
            filteredChats = jQ(".nH.Hd:data(chat)").not(dontResizeChat.box);

            //Order chats in descending order - we want to shrink the largest first.
            orderedChats = filteredChats.sort(function(a, b)
            {
                return jQ(a).width() > jQ(b).width() ? -1 : 1;
            });

            //Try to resize to normal widths.
            lengthOver = iterateResize(orderedChats, lengthOver, true);

            //Check if we succeeded.
            if(lengthOver > 0)
            {
                //Try to resize to minimum widths.
                lengthOver = iterateResize(orderedChats, lengthOver, false);
            }

            //Last resort is always to resize the chat we didn't want to resize.
            if(lengthOver > 0)
            {
                //Get the chats width.
                startInnerWidth = dontResizeChat.innerWindow.width();
                startOuterWidth = dontResizeChat.outerWindow.width();

                //Resize the chat window.
                dontResizeChat.innerWindow.width(startInnerWidth - lengthOver);
                dontResizeChat.outerWindow.width(startOuterWidth - lengthOver);
            }
        }
    }

///=============================================================================
///    Registers a minimize event handler on mouseup to the specified element. =
///    Disables a chat boxes grippers if minimized and reenables them when     =
///    the chat is maximized. Should be registered on mouseups over a chat     =
///    box's title bar.                                                        =
///                                                                            =
///    chat: The chat box to disable/enable the grippers for.                  =
///    titleBarPiece: The element to register the mouseup event listeners to.  =
///=============================================================================
    function mouseupMinimizeEventHandler(chat, titleBar)
    {
        ///Note: This doesn't get called if google enables the chat window programmatically.
        ///Note: This should be handled by checking for minimized windows on any change.

        //lower event handler - registered where googles is.
        //handles the majority of the title bar.
        titleBar.on("mouseup", chat, function(event)
        {
            //grab a reference to the chat box.
            var chat = event.data;

            //Check if window is minimized (different from hidden).
            if(chat.minimized())
            {
                //windows minimized change state.
                chat.cornerGrip.css("display", "none");
                chat.topGrip.css("display", "none");
                chat.leftGrip.css("display", "none");
            }
            else
            {
                //window unminimized change state.
                chat.cornerGrip.css("display", "");
                chat.topGrip.css("display", "");
                chat.leftGrip.css("display", "");
            }
        });
    }

///=============================================================================
///    Registers a mousedown event handler to the specified gripper associated =
///    with the passed in chat box. When triggered it starts resize event      =
///    handling & stop-resizing event handling for the chat box by registering =
///    mousemove & mouseup events on a mousedown event.                        =
///                                                                            =
///    chat: The chat box the events correspond to.                            =
///    grip: The element to register the mousedown event listeners to.         =
///    enableX: Whether to allow events to modify the width of the chat box.   =
///    enableY: Whether to allow events to modify the height of the chat box.  =
///=============================================================================
    function mousedownResizeEventHandler(chat, grip, enableX, enableY)
    {
        //register a mousedown event for the gripper.
        grip.on("mousedown", chat, function(event)
        {
            //stop events from propagating so that we don't have bubbling.
            event.preventDefault();
            event.stopPropagation();

            //Create a click event on the historyPane (unselect recipients if selected).
            //Fixes an issue where the bottom bar of compose windows doesn't resize if 'Recipients' is selected.
            evt = document.createEvent("MouseEvents");
            evt.initEvent("click",true,true);
            chat.historyPane.get(0).dispatchEvent(evt);

            //Double the internal viewport width just incase google reset it.
            doubleInternalViewportWidth();

            //enable overlay so there is no accidental clicking.
            enableOverlay(grip.css("cursor"));

            //register mousemove event handler - i.e. resizing.
            mousemoveResizeEventHandler(event, enableX, enableY);

            //register mouseup event handler - i.e. stop resizing.
            mouseupResizeEventHandler(event.data);
        });
    }

///=============================================================================
///    Resizes the chat box w.r.t. the current mouse location. Since it        =
///    registers mousemove on the document, it will keep occuring until off()  =
///    is called for mousemove events on the document.                         =
///                                                                            =
///    event: The mousedown event which triggered this event.                  =
///    enableX: Whether to allow events to modify the width of the chat box.   =
///    enableY: Whether to allow events to modify the height of the chat box.  =
///=============================================================================
    function mousemoveResizeEventHandler(event, enableX, enableY)
    {
        //grab a reference to the chat box.
        var chat = event.data;

        //original mouse coordinates on mousedown.
        var startX = event.pageX;
        var startY = event.pageY;

        //grab original dimensions prior to resizing.
        var startHeight = chat.historyPane.height();
        var startInnerWidth = chat.innerWindow.width();
        var startOuterWidth = chat.outerWindow.width();
        var startLeftOffset = chat.box.offset().left; //for max width.
        var startTopOffset = chat.box.offset().top; //for max height.

        //register on mouse move event for the entire document.
        chat.document.on("mousemove", chat, function(event)
        {
            //grab a reference to the chat box.
            var chat = event.data;

            //stop events from propagating so that we don't have bubbling.
            event.preventDefault();
            event.stopPropagation();

            //check to see if we want to modify height of that chat window.
            if(enableY == true)
            {
                //difference in the original cursor position and current.
                var diffY = startY - event.pageY;

                //Check the sizes to make sure we aren't over the maximum height.
                if(startTopOffset - diffY - chat.gbar.height() > 5)
                {
                    //set new size - max-height property takes in account maximums.
                    chat.historyPane.height(startHeight + diffY);
                }
                else
                {
                    //Set maximum height.
                    chat.historyPane.height(startHeight + startTopOffset - chat.gbar.height() - 5);
                }
            }

            //check to see if we want to modify width of that chat window.
            if(enableX == true)
            {
                //difference in the original cursor position and current.
                var diffX = startX - event.pageX;

                //Check the sizes to make sure we aren't over the maximum width.
                if(startLeftOffset - diffX > 5)
                {
                    //set new size and offset - min-width property takes in account minimums.
                    chat.innerWindow.width(startInnerWidth + diffX);
                    chat.outerWindow.width(startOuterWidth + diffX);
                }
                else
                {
                    //Set maximum width - different for each chat.
                    chat.innerWindow.width(startInnerWidth + startLeftOffset - 5);
                    chat.outerWindow.width(startOuterWidth + startLeftOffset - 5);
                }

                //Check for cutoff sibling chat boxes.
                jQ(".nH.Hd:data(chat)").each(function()
                {
                    //Get the chat data.
                    iter = jQ(this).data("chat");

                    //Adjust the opacity of cutoff chats to signify that we will close them.
                    if(iter.box.offset().left < 0)
                    {
                        //Cutoff.
                        iter.box.css("opacity", "0.5");
                    }
                    else
                    {
                        iter.box.css("opacity", "");
                    }
                });
            }
        });
    }

///=============================================================================
///    Stops the resizing of a chat box when a mouseup event occurs. It does   =
///    this by turning off() mousedown and mousemove events.                   =
///                                                                            =
///    chat: The chat box the events correspond to.                            =
///=============================================================================
    function mouseupResizeEventHandler(chat)
    {
        //on mouseup event.
        chat.document.on("mouseup", chat, function(event)
        {
            //grab a reference to the chat box.
            var chat = event.data;

            //stop events from propagating so that we don't have bubbling.
            event.preventDefault();
            event.stopPropagation();

            //disable overlay since we are no longer dragging.
            disableOverlay();

            //disable other events.
            chat.document.off("mousemove");
            chat.document.off("mouseup");

            //Grab the current width - incase google changes it on when we close windows.
            var innerWidth = chat.innerWindow.width();
            var outerWidth = chat.outerWindow.width();

            ///FIXME: figure out what triggers the minimize operation.

            //Iterate chats to close any chatbox that is cutoff or invisible.
            jQ(".nH.Hd:data(chat)").each(function()
            {
                //Get the chat data.
                iter = jQ(this).data("chat");

                //Kill any undisplayed windows (diffrent from hidden) - otherwise google will re-enable them and resize everything on us.
                //Check the opacity because even if the window is no longer out of bounds we are killing it.
                if(iter.hidden() || iter.box.css("opacity") != 1)
                {
                    //Close the window.
                    evt = document.createEvent("MouseEvents");
                    evt.initEvent("mouseup",true,true);
                    iter.box.find(".Ha").get(0).dispatchEvent(evt);
                }
            });

            ///Note: Below is because google resizes chats after we close things. So we need to do sanity checking.

            //Rewrite the width we applied in case google changed it after we closed things.
            chat.innerWindow.width(innerWidth);
            chat.outerWindow.width(outerWidth);

            //Check if anything is out of bounds after resizing.
            //iterate chat windows which have associated stored metadata.
            jQ(".nH.Hd:data(chat)").each(function()
            {
                //Resize windows if out of bounds - don't resize the window we just changed.
                iter = jQ(this).data("chat");
                checkBoundsResizer(iter, chat);
            });
        });
    }

///=============================================================================
///    Fancy chat handler. Creates resize grippers and registers event         =
///    handlers. Called every N milliseconds to setup resize handling for any  =
///    new chats.                                                              =
///=============================================================================
    function chatResizeHandle()
    {
        //iterate chat windows which don't have any associated stored metadata.
        jQ(".nH.Hd:not(:data(chat))").each(function()
        {
            //grab chat box.
            var chat = createChatStruct(this);

            /*================================================================*/
            /*Sanity checks below for various things. ========================*/
            /*================================================================*/

            //Resize the internal viewport width to allow out of bounds chats.
            //We need this here as the elements we are changing don't exist until after a chat is created.
            doubleInternalViewportWidth();

            ///Note: We do need to check all windows here as google could have minimized some.
            //iterate chat windows which have associated stored metadata.
            jQ(".nH.Hd:data(chat)").each(function()
            {
                //Resize windows if out of bounds - don't resize the new window.
                iter = jQ(this).data("chat");
                checkBoundsResizer(iter, chat);
            });

            //Change the z-index so that chats are on top of the upper UI elements.
            jQ(".dw").css("z-index", 5);

            /*================================================================*/
            /*Minimize/Maximize Chat Window Handling below. ==================*/
            /*================================================================*/

            //Disables and re-enables grippers depending on chat state.
            mouseupMinimizeEventHandler(chat, chat.innerTitleBar);

            //delegate event handler - registered where googles is.
            //handles the upper 3px edge.
            mouseupMinimizeEventHandler(chat, chat.outerTitleBar);


            /*================================================================*/
            /* Resize Handling below. ========================================*/
            /*================================================================*/

            //register mouse events - hierarchical registering of event handlers.
            ///mousedownEventHandler(chat, grip, enableX, enableY)
            mousedownResizeEventHandler(chat, chat.cornerGrip, true, true);
            mousedownResizeEventHandler(chat, chat.topGrip, false, true);
            mousedownResizeEventHandler(chat, chat.leftGrip, true, false);
        });
    }

///=============================================================================
///    Put any code only to be called once below. Essentially, the code is     =
///    called after jquery, jqueryUI, and our code is successfully injected.   =
///=============================================================================
    var jQ;                   //jquery handle.
    var removeAllHeightStyle; //ssdfdsfsdf
    var removeMaxHeightStyle; //sdffsdsdfsdf
    var dragAttachmentStyle;

    (function calledOnce()
    {
        // Store jQuery handle for easy calling.
        jQ = jQuery.noConflict();

        /*====================================================================*/
        /*Viewport Resized Event Handling below. =============================*/
        /*====================================================================*/

        //register resize event.
        jQ(window).resize(function()
        {
            //Resize the internal viewport width since google writes over it on resize events.
            doubleInternalViewportWidth();

            //iterate chat windows which have associated stored metadata.
            jQ(".nH.Hd:data(chat)").each(function()
            {
                //Resize windows if out of bounds.
                iter = jQ(this).data("chat");
                checkBoundsResizer(iter);
            });

            //Change the z-index so that chats are on top of the upper UI elements.
            //I don't think google modifies this on re-size but just in case.
            jQ(".dw").css("z-index", 5);
        });

        /*====================================================================*/
        /*Styles to remove Googles compose window size restrictions. =========*/
        /*====================================================================*/

        //Create a style which overrides googles always.
        removeAllHeightStyle = document.createElement('style');
        removeAllHeightStyle.innerHTML = ".removAllHeightRestrictionsStyle {height: auto !important; min-height: auto !important; max-height: none !important;}";
        document.body.appendChild(removeAllHeightStyle);

        removeMaxHeightStyle = document.createElement('style');
        removeMaxHeightStyle.innerHTML = ".removMaxHeightRestrictionsStyle {max-height: none !important;}";
        document.body.appendChild(removeMaxHeightStyle);
        
        //Fix dragging attachments.
        dragAttachmentStyle = document.createElement('style');
        dragAttachmentStyle.innerHTML = ".aC7 { z-index: 5 !important; }";
        document.body.appendChild(dragAttachmentStyle);

        /*====================================================================*/
        /*Setup resize event handler to run at the given interval. ===========*/
        /*====================================================================*/

        //call resize handler at given interval.
        window.setInterval(chatResizeHandle, 500);

    })();
}
