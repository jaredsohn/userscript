// ==UserScript==
// @name        [w1ch] Enhancer - SHAMELESS COPY
// @namespace   https://userscripts.org/users/532546
// @email       wm@world1ch.org
// @description Highlights dubs - Never miss your chance to check em again!
// @include     https://boards.4chan.org/s4s/*
// @include     http://boards.4chan.org/s4s/*
// @include     http://world1ch.org/vip/*/*/
// @include     http://world1ch.org/vip/mod.php?/*/*/
// @author      le fun css man AKA Doctor Worse Than Hitler AKA anne who stole this.
// @version     1.32
// ==/UserScript==


initialize(); 
addCSS();               // add the css
highlightDubs();        // highlight dubs
changePosts();           // color and replace text


// if this page is a thread, then we need to periodically check for updates brought in by the auto-update
//if(document.URL.indexOf("res") != -1)
//{
    setInterval(function(){checkIfUpdated()}, 5000);   // check if the thread is updated every 5 seconds  
//}
function initialize()
{
    window.lastNo = 0;         // used to make sure we don't check posts twice
    window.lastMessage = 0;    // don't want to check texts twice either
    window.replaceLimit = 10;  // limits number of times an individual emote can be used
    window.totalLimit   = 50; // limits total number of emotes per post. These limits are too prevent errors like  "unresponsive script"
    window.posts = getPosts();
    // Replaces ":key:" with the image"
    window.replaceList = {
        doge:       'http://i.imgur.com/5XD1CYW.png',
        kek:        'http://i.imgur.com/lblY5Sn.png',
        checkem:    'http://i.imgur.com/PwAtIwi.png',
        froge:      'http://i.imgur.com/j8uUz62.png',
        lel:        'http://i.imgur.com/1DfcjLb.png',
        thinchin:   'http://i.imgur.com/SwNA28g.png',
        ptree:      'http://i.imgur.com/rUDbkXw.png',
        btree:      'http://i.imgur.com/M2kjuLL.png',
        pktree:     'http://i.imgur.com/GWepwsJ.png',
        rtree:      'http://i.imgur.com/l5fKXY7.png',
        ruse:       'http://i.imgur.com/8XBt7yF.png',
        mot:        'http://i.imgur.com/IfMpxw1.png',
        a:          'http://i.imgur.com/q8hHbwQ.gif',
        b:          'http://i.imgur.com/03xYJTU.gif',
        c:          'http://i.imgur.com/9UxS7ej.gif',
        d:          'http://i.imgur.com/gJezGs5.gif',
        e:          'http://i.imgur.com/J9df7FB.gif',
        f:          'http://i.imgur.com/XgufMCh.gif',
        g:          'http://i.imgur.com/BDKY6vy.gif',
        h:          'http://i.imgur.com/JWRrUUO.gif',
        i:          'http://i.imgur.com/gZLK7Dc.gif',
        j:          'http://i.imgur.com/BiZ3dqk.gif',
        k:          'http://i.imgur.com/15DDVOh.gif',
        l:          'http://i.imgur.com/p0HyNUw.gif',
        m:          'http://i.imgur.com/JX55XPt.gif',
        n:          'http://i.imgur.com/XhUUK36.gif',
        o:          'http://i.imgur.com/04fvVIM.gif',
        p:          'http://i.imgur.com/TlWblXt.gif',
        q:          'http://i.imgur.com/aEGHWjg.gif',
        r:          'http://i.imgur.com/PD6x0Uh.gif',
        s:          'http://i.imgur.com/wirH3pL.gif',
        t:          'http://i.imgur.com/hsKlJrv.gif',
        u:          'http://i.imgur.com/Xpf1VnM.gif',
        v:          'http://i.imgur.com/g3INSef.gif',
        w:          'http://i.imgur.com/cF6pbpj.gif',
        x:          'http://i.imgur.com/UVbdagZ.gif',
        y:          'http://i.imgur.com/2BJaMA3.gif',
        z:          'http://i.imgur.com/itOUZ85.gif',
        
    }
}
function highlightDubs()
{
    // grabs the elements that contain "No. <postno>"
    var postNum = document.getElementsByClassName("postNum");
    // iterate through all post numbers and check for dubs
    for(var i = window.lastNo; i < postNum.length; i++)
    {
        // get the post number
        var no = postNum[i].children[1].innerHTML;
        // check for dubs, but only if this isn't already highlighted
        if(no.charAt(no.length - 1) == no.charAt(no.length - 2))
        {
            // highlight it
            postNum[i].children[1].className += " dubsHighlight";
        }
    }
    window.lastNo = postNum.length;  //last number we checked
}

function addCSS()
{
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".dubsHighlight { background-color: orange;" +
                    "padding: 0 1px; }";
    document.head.appendChild(css);
}

function getPosts()
{
    return document.getElementsByClassName("replyContainer").length
}


/* function colorText() colors the text in a post based on < > [] {} etc
 * This code is a modification of Chest54's extension
 *   http://userscripts.org/scripts/source/177986
 */
function colorText(postMessage)
{
        var checkora = postMessage.innerHTML.replace('<span class="fortune"','<br><span class="fortune"').split('<br>');
        for(j = 0; j < checkora.length; j++)
        {
        	temp = checkora[j].replace('\n','');
        	if(temp.length-temp.lastIndexOf('&lt;') == 4 && temp.indexOf('&lt;') !=-1)
        	{
        		checkora[j] = '<span style="color:orange">' + checkora[j] + '</span>';
        	}
        	else if(temp.indexOf('&lt;')==0)
        	{
        		checkora[j] = '<span style="color:red">' + checkora[j] + '</span>';
        	}
        	else if(temp.length-temp.lastIndexOf(' ]')== 2 && temp.indexOf(' ]') != -1)
        	{
        		if(temp.indexOf('[ ') == 0)
        		{
        			checkora[j] = '<span style="color:blue;font-family:monospace;font-weight:bold">' + checkora[j] + '</span>';
        		}
        	}
        	else if(temp.length-temp.lastIndexOf(' }') == 2 && temp.indexOf(' }') !=-1)
        	{
        		if(temp.indexOf('{ ') == 0)
        		{
        			checkora[j] = '<span style="color:purple;font-family:monospace;font-weight:bold">' + checkora[j] + '</span>';
        		}
        	}
        	if(temp.indexOf('[spoiler]') + 1 && temp.indexOf('[/spoiler]'))
        	{
        		if(temp.indexOf('[spoiler]')<temp.indexOf('[/spoiler]'))
        		{
        			checkora[j]=checkora[j].replace('[spoiler]','<span class="spoiler">');
        			checkora[j]=checkora[j].replace('[/spoiler]','</span>');
        		}
    	   }
        }
        var checkorb = checkora.join('<br>').replace('<br><span class="fortune"','<span class="fortune"');
        postMessage.innerHTML=checkorb;
} 
 
 
// handles post modifcations such as colorText() and replaceText()
function changePosts()
{
    var postMessage=document.getElementsByClassName('postMessage'); // get all post messages
    for(i = window.lastMessage; i < postMessage.length; i++)
    {
        colorText(postMessage[i]);
        replaceText(postMessage[i]);
    }
    window.lastMessage = postMessage.length;
}

function replaceText(postMessage)
{
    var totalCount = 0;  // count replaced stuff so we don't overdo it
    // replace everything in the replace list
    for(var key in window.replaceList)
    {
        var singleCount = 0;
        while(singleCount < window.replaceLimit && postMessage.innerHTML.indexOf(':'+key+':') != -1)
        {
            singleCount++;
            postMessage.innerHTML = postMessage.innerHTML.replace(':' + key + ':', '<img class="emote" src="' + window.replaceList[key] +
                                            '" alt="' + key + '" title="' + key + '" />');
        }
        totalCount += singleCount;
        if(totalCount >= window.totalLimit)
            break;
    }
}

// supposed to do stuff after a page is updated
function checkIfUpdated()
{
    //console.log("checked!");
    // if there are new posts, thread has been updated!
    if(window.posts < getPosts())
    {
        window.posts = getPosts();
        updateCare();       // update stuff!
    }
}

// things to do on thread update
function updateCare()
{
    highlightDubs();    // highlight new post dubs
    changePosts();      // update posts
}