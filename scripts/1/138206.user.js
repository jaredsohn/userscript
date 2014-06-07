// ==UserScript==
// @name          TEST
// @description   
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
var chatTabs = document.getElementById('fbDockChatTabs'); //TODO: Alle 200 Millisekunden überprüfen, ob Objekt definiert ist
if(chatTabs != null)
{
    var emoticons = new Array();
    var listenerAdded = false;
    
    emoticons.push("219967678125974"); // Crazy
    emoticons.push("220248984764510"); // Dislike
    emoticons.push("220253981430677"); // Baby
    emoticons.push("220253994764009"); // Totenkopf
    emoticons.push("220254014764007"); // Fisch
    emoticons.push("220254018097340"); // Kuchen
    emoticons.push("220254024764006"); // Erstaunt
    emoticons.push("220254028097339"); // Nachdenklich
    emoticons.push("220254044764004"); // Übelkeit
    
    AddEmoticonsToNewChatTab();
    
    if(listenerAdded == false)
    {
        chatTabs.addEventListener("DOMNodeInserted", AddEmoticonsToNewChatTab , true);
        listenerAdded = true;
    }
    
}
/*
** FUNCTIONS
*/
function AddEmoticonsToNewChatTab()
{         
    var allEmoticonTables = chatTabs.getElementsByTagName('table');
         
    for(var i = 0; i < allEmoticonTables.length; i ++)
    {
        var emoticonsIndex = 0;
        
        if(allEmoticonTables[i].className == "" || allEmoticonTables[i].className == null) //allEmoticonTables[i].className != "EmoticonsPlusInserted"
        {
            var whileCounter = 0;
            
            allEmoticonTables[i].setAttribute("class", "EmoticonsPlusInserted", 0);
            
            while(emoticonsIndex < emoticons.length)
            {
                
                if(whileCounter > 100)
                    break;
                else
                    whileCounter++;
                
                var tr = document.createElement("tr");
                    
                for(var cols = 0; cols < 7; cols++)
                {
                  var td = document.createElement("td");
                  td.setAttribute("class", "panelCell", 0);
                    
                  if(emoticons[emoticonsIndex] != null)
                  {
                      td.innerHTML = '<a href="#"class="emoteIcon" onclick="javascript:this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(\'textarea\')[0].focus();this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(\'textarea\')[0].value += \' [[' + emoticons[emoticonsIndex] + ']] \';"><img src="https://graph.facebook.com/' + emoticons[emoticonsIndex] + '/picture" height="16" width="16" /></a>';
                  }
                  else
                  {
                    td.innerHTML = '&nbsp;';
                  }
                  
                  tr.appendChild(td);
                  
                  emoticonsIndex++;
                }
                
                allEmoticonTables[i].appendChild(tr);
            }
            
        }
    }
    
}
