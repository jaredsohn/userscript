// ==UserScript==
// @description auto spy mode on omegle
// @name auto omegle
// @author Tareq Ibrahim
// @version 1
// @include http://*omegle.com/*
// ==/UserScript==

p=0;

///////////***************
chatnum=0;
chatPeriod=0;
maxChatPeriod=12;
maxReconnectPeriod=3;

smsgsnum =0;
ymsgsnum =0;
////////////////************

function switchOnOff()
{
    if (p==1)
    {
        p=0;
        $('btn').value="off";
        $('btn').style.color="red";
    }else{
        p=1;
        $('btn').value="on";
        $('btn').style.color="green";
        check();
    }
}


function check()
{
    if(p!=1) return 0;
    if (checkElExistsByClass('statuslog'))
    if (document.getElementsByClassName('statuslog')[0].innerText.indexOf("You're now chatting")>-1){alert("This works only when you're the spy.");switchOnOff();return 0;}
    //if ($("qsboxid").value=""){alert("Add questions in the Questions box.");switchOnOff();return 0;}
    if (document.getElementById("textbtnstatus")){startUpOmegle();return 0;p=0;}
    
    if (checkElExistsByClass('questionInput'))
    {
                if (chatPeriod<maxReconnectPeriod && chatPeriod>0){chatPeriod++;}else{
                $(document).getElements(".questionInput")[0].value=gen();
                copyLog();
                document.getElementsByClassName('disconnectbtn')[0].click();showNumOfChats(true);chatPeriod=0;
                }
    }else{
            if (checkElExistsByClass('questionText'))
            { 
                checkPeriod();
            }else{
                chatPeriod=0;
            }
    }
    if(p==1) window.setTimeout(check,3000);
}

function checkPeriod()
{
    if (maxChatPeriod<6)maxChatPeriod=6;
    chatPeriod++;
    logg("chatPeriod: " + chatPeriod);
    
    if (chatPeriod==1)
    {
        if (checkElExistsByClass("strangermsg"))
        smsgsnum =  document.getElementsByClassName('strangermsg').length;
        if (checkElExistsByClass("youmsg"))
        ymsgsnum =  document.getElementsByClassName('youmsg').length;
        logg("msgs: " + (smsgsnum+ymsgsnum));
    }
    
    if ((maxChatPeriod-chatPeriod)==1) 
    {
        var nochanges=true;
        if (checkElExistsByClass("strangermsg"))
        if (smsgsnum != document.getElementsByClassName('strangermsg').length) nochanges=false;
        if (checkElExistsByClass("youmsg"))
        if (smsgsnum != document.getElementsByClassName('youmsg').length) nochanges=false;
        if (nochanges) 
        {
            document.getElementsByClassName('disconnectbtn')[0].click();
        }else{
            chatPeriod=0;
        }
       
    }
    
    if (chatPeriod==(maxChatPeriod))
    {
        smsgsnum=0;ymsgsnum=0;chatPeriod=0;
        document.getElementsByClassName('disconnectbtn')[0].click();      
    }
    
}

function copyLog() 
{
    if (checkElExistsByClass('logbox') && (checkElExistsByClass("strangermsg") || checkElExistsByClass("youmsg") ))
    {
        //var smsgs =  document.getElementsByClassName('strangermsg');
        //var ymsgs =  document.getElementsByClassName('youmsg');
        var omeglelogbox =  document.getElementsByClassName('logbox')[0];
        var tomeglelog = omeglelogbox.innerHTML;
        var strippedString = tomeglelog.replace(/(<([^>]+)>)/ig,"");
        strippedString = strippedString.replace("You're now watching two strangers discuss your question!","");
        strippedString = strippedString.replace(/(.*?Stranger 1 has disconnected).*/g, "$1");
        strippedString = strippedString.replace(/(.*?You have disconnected).*/g, "$1");
        strippedString = strippedString.replace(/(.*?Enter a question:).*/g, "$1");
        strippedString = strippedString.replace(/(.*?I want Omegle to reuse).*/g, "$1");
        strippedString = strippedString.replace(/(.*?Save the log:).*/g, "$1");
        strippedString = strippedString.replace(/Stranger 2:/g, "\nStranger 2:");
        strippedString = strippedString.replace(/Stranger 1:/g, "\nStranger 1:");
        strippedString = strippedString.replace(/Enter a question:/g, "");
        strippedString = strippedString.replace("Stranger 1 has disconnected", "\nStranger 1 has disconnected");
        strippedString = strippedString.replace("Stranger 2 has disconnected", "\nStranger 2 has disconnected");
        strippedString = strippedString.replace("You have disconnected", "\nYou have disconnected");
        //chatLogNode.value = chatLogNode.value + "\n\n" + strippedString;
        $('logbox').value+="\n\n" + strippedString;
    }
}

//////////////////////**************************
////////////////// PANEL
/////////////////////////*****************
function createPanel()
{
    if (checkElExists("myPanel"))
    {
        remove("myPanel");
        createPanel();
    }else{
      
        var chatPeriodNode = document.createElement('div');
        var element = document.getElementById("myPanel");
        var panelDiv = document.createElement('div');
        var logHdiv = document.createElement('h3');
        var qsHdiv = document.createElement('h3');
        var chatLogNode = document.createElement('textarea');
        var btnonoffNode = document.createElement('input');
        var qsboxNode = document.createElement('textarea');
        
        // PANEL
        panelDiv.setAttribute("id", "myPanel");
        document.getElementsByTagName('body')[0].appendChild(panelDiv);
        panelDiv.innerHTML=
        "<h1 style='text-shadow: #FFF 1px 1px 1px;text-align:center;color:black;'>auto omegle</h1>"
        + panelDiv.innerHTML
        ;
        
        panelDiv.style.cssText= 
        'box-shadow: 0 0 .75em #BBB;-webkit-box-shadow: 0 0 .75em #BBB;-moz-box-shadow: 0 0 .75em #BBB;font-family:tahoma;font-size:10px; position: fixed;top: 0;right: 0;width: 170px;height: 100%;background-color: #DEF;padding: 10px;z-index: 100;'
        ;
        
        // BTN ON OFF
        panelDiv.appendChild(btnonoffNode);
         btnonoffNode.style.cssText= 
        'line-height:25px; font-size:13px;text-align:center; width:50%; height:25px; color:black; margin: 0 37px;font-weight:bold;'
        ;
        btnonoffNode.setAttribute("type", "button");
        //btnonoffNode.setAttribute("onclick", "switchOnOff()");
        btnonoffNode.setAttribute("id", "btn");
        btnonoffNode.value="off";
        btnonoffNode.style.color="red";
        
        // NUMBER OF CHATS
        chatPeriodNode.setAttribute("id", "numofchats");
        panelDiv.appendChild(chatPeriodNode);
        $("numofchats").innerHTML = setCounter(0);
        chatPeriodNode.style.cssText= 
        'position:absolute;bottom:10px;'
        ;
        
        // CHAT LOGS
        panelDiv.appendChild(logHdiv);
        logHdiv.innerHTML = "Chats log:";
        chatLogNode.setAttribute("contenteditable", "true");
        chatLogNode.setAttribute("class", "exbox");
        chatLogNode.setAttribute("id", "logbox");
        chatLogNode.setAttribute("wrap", "off");
        panelDiv.appendChild(chatLogNode);
        chatLogNode.style.cssText= 
        'box-shadow: 0 0 .75em #BBB;border:none!important;transition: all 0.3s ease-out;background-color: white;border-left: 1px solid #353535;margin-bottom:20px;overflow:scroll;height:190px;width:95%;font-size:100%;'
        ;
        
        // QUESTION BOX
        panelDiv.appendChild(qsHdiv);
        qsHdiv.innerHTML = "Questions:";
        qsboxNode.setAttribute("class", "exbox");
        qsboxNode.setAttribute("wrap", "off");
        qsboxNode.setAttribute("id", "qsboxid");
        panelDiv.appendChild(qsboxNode);
        qsboxNode.style.cssText= 
        'box-shadow: 0 0 .75em #BBB;border:none!important;transition: all 0.3s ease-out;background-color: white;border-left: 1px solid #353535;margin-bottom:20px;overflow:scroll;height:190px;width:95%;font-size:100%;'
        ;
        
        $('btn').addEvent('click', function(event) {
        //event = new Event(event).stop();
            switchOnOff();
        });
        
    }
}

/////////////****************
// TOOLS
///////////////

function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

function startUpOmegle()
{
    $("textbtnstatus").getElements("a")[0].click();
    window.setTimeout(startUpOmegle2,500);
}
function startUpOmegle2()
{
    if ($("tryspymodetext").getElements(".questionInput")[0]==null)
    $("tryspymodetext").getElements("a")[0].click();
    
    window.setTimeout(startUpOmegle3,500);
}
function startUpOmegle3()
{
    $("tryspymodetext").getElements(".questionInput")[0].value=gen();
    window.setTimeout(startUpOmegle4,100);
}
function startUpOmegle4()
{
    $("tryspymodetext").getElements("button")[0].click();
    p=1;
    window.setTimeout(check,2000);
}

function showNumOfChats(inc)
{
    if (inc) chatnum++;
    $("numofchats").innerHTML = setCounter(chatnum);
}

function setCounter(counter) 
{
    return "<h3>Questions counter: " + counter + "</h3>";
}

function gen()
{
    if ($("qsboxid").value=="")$("qsboxid").value="Hello Strangers! :) \nHello Strangers! :D \nHello Strangers! :3 \n";
    var npossible = $("qsboxid").value.split('\n');
    return npossible[ Math.floor(Math.random() * npossible.length) ];
}

function checkElExists(theId)
{
    var element =  document.getElementById(theId);
    if (typeof(element) != 'undefined' && element != null)
    {return true;}else{return false;}
}

function checkElExistsByClass(theClass)
{
    var element =  document.getElementsByClassName(theClass)[0];
    if (typeof(element) != 'undefined' && element != null)
    {return true;}else{return false;}
}

addCssRule = function(/* string */ selector, /* string */ rule) {
  if (document.styleSheets) {
    if (!document.styleSheets.length) {
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(bc.createEl('style'));
    }

    var i = document.styleSheets.length-1;
    var ss = document.styleSheets[i];

    var l=0;
    if (ss.cssRules) {
      l = ss.cssRules.length;
    } else if (ss.rules) {
      // IE
      l = ss.rules.length;
    }

    if (ss.insertRule) {
      ss.insertRule(selector + ' {' + rule + '}', l);
    } else if (ss.addRule) {
      // IE
      ss.addRule(selector, rule, l);
    }
  }
};

if (document.body == null)
  document.addEventListener('DOMContentLoaded', createPanel, false);
else
  createPanel();