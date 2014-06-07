// ==UserScript==
// @name           Block da thread
// @namespace      quake.ingame.de
// @description    blocks threads
// @include        http://quake.ingame.de/forum/forumdisplay.php*
// ==/UserScript==

function getList()
{
    var threads = GM_getValue('pq.blocked_threads');
    if (threads == undefined)
    {
        GM_setValue('pq.blocked_threads', '0|1');
    }
    return threads.split("|");
}

function inList(id)
{
    var list = getList();
    for (i in list)
    {
        if (list[i] == id)
        {
            return true;
        }
    }
    return false;
}

function createFun(id){
    return function() {
        var old = GM_getValue('pq.blocked_threads');
        var newstr = old + "|" + id;
        GM_setValue('pq.blocked_threads', newstr);
    }
}

var nodes = document.getElementById("threadbits_forum_1").childNodes;
for (node in nodes)
{
    var j = nodes[node].childNodes[1];
    if (j != undefined)
    {
        var id = nodes[node].innerHTML.match(/td_threadtitle_([0-9]+)/)[1];
        
        // add block button
        var button = document.createElement('a');
        button.id = "button_" + id;
        button.style.padding = "0 0 0 8px";
        button.style.fontSize = "0.8em";
        button.innerHTML = "(block)";


        document.getElementById('td_threadtitle_' + id).childNodes[1].appendChild(button);
        document.getElementById(button.id).addEventListener('click', createFun(id), false);
    }
}

// block threads
for (node in nodes)
{
      if (nodes[node].innerHTML != undefined)
      {
          var id = nodes[node].innerHTML.match(/td_threadstatusicon_([0-9]+)/)[1];
          if (inList(id) == true)
          {
              nodes[node].style.display = "none";
          }
      }
}
