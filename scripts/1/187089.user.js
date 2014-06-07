// ==UserScript==
// @name        Facebook Timeline Wipe Automator
// @version     1.1
// @grant       none
// ==/UserScript==

//Original script: Facebook - Delete My Timeline Copyright (C) 2013  George Piskas (geopiskas@gmail.com)
//Modified by the Anus Panda, same year (anus.panda@gmail.com)

window.addEventListener('keydown', KeyCheck, true);

function KeyCheck(e)
    {
    if (e.keyCode == 69)
        {
        if (confirm("Are you sure you want to proceed?"))
            {
            var postList = document.getElementsByClassName('mrs _2fmu customimg img');
            var ignoreCount = 0;
            var free = true;
                
            if (postList.length == 0)
                {
                alert('No posts to work with'); 
                }
            else
                {
                // Wait for mutex
                var waitMutex = setInterval(function()
                    {
                    if (postList.length == ignoreCount)
                        {
                        clearInterval(waitMutex);
                        if (ignoreCount == 0)
                            {
                            alert('All visible posts have been deleted or hidden'); 
                            }
                        else
                            {
                            alert('All visible posts have been deleted or hidden but ' + ignoreCount + ' post(s) did not respond'); 
                            }
                        }
                    else if (free == true)
                        {
                        free = false;
                        deletePost();
                        }
                    }
                , 100);
                }
                
            function deletePost()
                {
                // Open menu and find delete or hide buttons
                postList[ignoreCount].click();
                var waitMenu = setInterval(function()
                    {
                    if (document.querySelectorAll('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)').length>0 && document.querySelectorAll('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)')[0].getElementsByTagName('a').length > 0)
                        {
                        clearInterval(waitMenu);
                    
                        var delIndex = -1;
                        var hideIndex = -1;
                        var buttons = document.querySelectorAll('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)')[0].getElementsByTagName('a');
                        for (var i=0;i<buttons.length;i++)
                            {
                            var ajaxify = buttons[i].getAttribute("ajaxify");
                            //comment out or delete below to remove specific functionality
                            if (ajaxify.indexOf("remove_content") > -1)
                                {
                                delIndex = i;
                                break;
                                }
                            //added by esnahn. removes likes
                            if (ajaxify.indexOf("unlike") > -1)
                                {
                                delIndex = i;
                                break;
                                }
                            if (ajaxify.indexOf("remove_comment") > -1)
                                {
                                delIndex = i;
                                break;
                                }
                            if (ajaxify.indexOf("hide") > -1)
                                {
                                hideIndex = i;
                                }
                            }
                        // got the index, work with it
                        if (delIndex > -1)
                            {
                            var postCount = postList.length - ignoreCount;  
                        
                            // Wait for del dialogue and click
                            buttons[delIndex].click();
                            var waitDel = setInterval(function()
                                {
                                if (document.getElementsByClassName('uiButtonConfirm').length > 0)
                                    {
                                    clearInterval(waitDel);
                                    // Wait for post gone and free mutex
                                    document.getElementsByClassName('uiButtonConfirm')[0].click();
                                    var waitGone = setInterval(function()
                                        {
                                        if (postCount > postList.length - ignoreCount)
                                            {
                                            clearInterval(waitGone);
                                            free = true;
                                            }
                                        }
                                    ,100);
                                    }
                                }
                            , 100);
                            }
                        else if (hideIndex > -1)
                            {
                            buttons[hideIndex].click();
                            var waitHide = setInterval(function()
                                {
                                clearInterval(waitHide);
                                free = true;
                                }
                            , 100);
                            }
                        else
                            {
                            ignoreCount+=1;
                            free = true;
                            }
                        }
                    }
                    , 100);
                }
            }
        }
    }

