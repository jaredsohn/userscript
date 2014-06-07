// ==UserScript==
//
// @name           MythmongerTools Logger v0.0.4:<A
// @namespace      http://www.mythmongertools.com/
// @homepage       http://www.mythmongertools.com/
// @description    MythmongerTools Logger v0.0.4:<A
// @author         Toby Pinder
// @include        http://apps.facebook.com/mythmonger/*
//
// ==/UserScript==


//Supports Mythmonger version v1.0.10
//MAIN CODE FUNCTIONALITY (by Toby Pinder);
//TODO: Use GM preferences to store Verbose-Normal-Silent level.
//TODO: needdataname responses.
//TODO: debugquery:_____ response and handling to remove alert statement
//TODO: version checking, both client js and mythmonger
//TODO: user periodically 'forced' to visit http://apps.facebook.com/mythmonger/archive.php, every 20 turns? questcheckturnsremaining:____ response needed.
//TODO: record IP address?

//MAIN PROGRAM
try{
    updateCheck(false);
    //Update check!

    //tidy for GET, fb weirdness etc. Remove ?_=_&_=_etc.
    switch(location.href)
    {
        case "http://apps.facebook.com/mythmonger/turn.php":
        case "http://apps.facebook.com/mythmonger_sc/turn.php":
            mm_page_turn();
            break;
        case "http://apps.facebook.com/mythmonger/archive.php":
            mm_questrefresh_onpage();
            break;
        
    }
}catch(ex)
{
    GM_log("Error: "+ex.toString());
    
}



function mm_page_turn()
{
    try
    {
        //grab all variables
        document.getElementsByClassName("contentContainer")[0].innerHTML+="<span id='gm_mythmongertoolslog'>Logging to Mythmonger Tools...</span>";
        var mythversion=new String();
        mythversion=document.getElementsByClassName("build_version")[0].innerHTML.toString(); //eg version: v1.0.7
        mythversion=mythversion.replace("version",""); //1.0.7
        mythversion=mythversion.replace(": ",""); //1.0.7

        var mmversion=mythversion.split("."); //[0]=1,[1]=0,[2]=7;
        var creature=document.getElementsByClassName("charlabel")[1].innerHTML; //eg Blank Card
        var fbuser=document.getElementsByClassName("posttitle")[0].href;
        fbuser=fbuser.substring(fbuser.search(/snuid=/i)+6);//userID.replace("http://apps.facebook.com/mythmonger/profile.php?snuid=","");
        fbuser=parseInt(fbuser);
        var title=document.getElementsByClassName("posttitle")[0].innerHTML; //eg Toby the Strong Technologist
        title=title.split(" the "); //[0]=Toby [1]=Strong Technologist
        title=title[title.length-1]; //pick only the last item, as people could have " the " in their name.
        var location=document.getElementsByClassName("posttitle")[4].childNodes[0].innerHTML; //eg New Feron
        var level=document.getElementsByClassName("posttitle")[1].innerHTML; //19
        var challenge=document.getElementsByClassName("challengeCard")[0].childNodes[0].alt; //Basic

        //refresh quest status if needed.

        post('http://www.mythmongertools.com/gm/battlelog.php', 'lev='+level+'&ttl='+title+'&loc='+location+'&cc='+challenge+'&foe='+creature+'&fbuser='+fbuser+'&v1='+mmversion[0]+'&v2'+mmversion[1]+'&v3='+mmversion[2], function(text){
            mm_feedback_turn(text)
        })
    
    }
    catch(e)
    {
        document.getElementsByClassName("contentContainer")[0].innerHTML+="<span style='width: 620px; float: left;'>Unable to log to Mythmonger Tools: battle not detected.<br />Diagnostics: "+e.message+"<br /></span>";
    }

}



function mm_feedback_turn(text)
{
    document.getElementById("gm_mythmongertoolslog").innerHTML="Please wait... Analysing server response...";

    var responsedata=new Array();
    responsedata=text.split(";");

    for(var cmd in responsedata)
    {
        responsedata[cmd]=responsedata[cmd].split(":");
        switch(responsedata[cmd][0])
        {
            case "status":
                switch(responsedata[cmd][1])
                {
                    case "accountneeded":
                        document.getElementById("gm_mythmongertoolslog").innerHTML="You need to connect your Mythmonger Tools account to Facebook in order to log battles. <br /> &nbsp; &nbsp; &nbsp;<a href='http://www.mythmongertools.com/' target='_blank'>Click here to connect.</a>";
                        break;
                    case "logfull":
                        document.getElementById("gm_mythmongertoolslog").innerHTML="This battle was successfully logged in <a href='http://www.mythmongertools.com/' target='_blank'>Mythmonger Tools</a> automatically.";
                        break;
                    case "logpartial":
                        document.getElementById("gm_mythmongertoolslog").innerHTML="Your log was successful, but we do not fully understand some of the data we recieved. Your log has been queued for further analysis, but won't currently be included in <a href='http://www.mythmongertools.com/' target='_blank'>Mythmonger Tools's</a> statistics!";
                        break;
                    case "questrefresh":
                        document.getElementById("gm_mythmongertoolslog").innerHTML="Log failed: Mythmonger Tools needs to refresh your quest data...";
                        mm_questrefresh();
                        break;
                    case "serverupdateneeded":
                        document.getElementById("gm_mythmongertoolslog").innerHTML="Mythmonger Tools is not equipped to deal with log data due to the new updates to Mythmonger.";
                        break;
                }
                break;
            case "needdataname":
                switch(responsedata[cmd][1])
                {
                    case "enemy":
                        //need a creature identifying on the server side
                        document.getElementById("gm_mythmongertoolslog").innerHTML+="<br />Missing Creature: "+creature;
                        break;
                    case "challenge":
                        //need a challenge card identifying on the server side
                        document.getElementById("gm_mythmongertoolslog").innerHTML+="<br />Missing Challenge Card: "+challenge;
                        break;
                    case "location":
                        //need a location identifying on the server side
                        document.getElementById("gm_mythmongertoolslog").innerHTML+="<br />Missing Location: "+location;
                        break;
                    case "title":
                        //need a title identifying on the server side
                        document.getElementById("gm_mythmongertoolslog").innerHTML+="<br />Missing Title: "+title;
                        break;
                }
                break;
        }

    }
}

function mm_questrefresh_onpost(text)
{
//refresh the quests.
//
//post('http://www.mythmongertools.com/gm/','',function(text){
//        mm_questrefresh_onpage(text)
//    })
//////////////REMOVE GIANT ERROR!
//////////////alert("RESPONSE:\n"+text);
}
function mm_questrefresh_onpage()
{
    
    //
    //text;
    //
    var content=document.getElementsByClassName("cutsceneArchive")[0];
    var questparts=new Array();
    questparts['name']=new Array();
    questparts['title']=new Array();
    
    var count=0; //number of names

    var sections;
    try{
        sections=content.getElementsByClassName("content"); //my variable names suck
    }
    catch(ex)
    {
        sections=new Array(); //empty. No results.
    }
    for(var i=0;i<sections.length;i++)
    {
        var localBlock=sections[i];
        var itemsTitle=localBlock.getElementsByTagName("a");
        var itemsName=content.getElementsByTagName("h3");
        for(var j=0;j<itemsTitle.length;j++)
        {

               
            questparts['name'][count]=itemsName[i].innerHTML;
            questparts['title'][count]=itemsTitle[j].innerHTML;
            count++;
        }
    }
    var logdata="";
    for(var k=0;k<count;k++)
    {
        //TODO:URL ENCODE.
        logdata+="q"+k+"="+questparts['name'][k]+"&sq"+k+"="+questparts['title'][k]+"&";
    }
     post('http://www.mythmongertools.com/gm/questupdate.php', logdata, function(text){
            mm_questrefresh_onpost(text);
        })
//alert(content.getElementsByTagName("a")[1].innerHTML);
//alert(content.getElementsByTagName("a")[2].innerHTML);
}

//Source: Greasemonkey Wiki.
function post(url, data, cb) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{
            'Content-type':'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
        },
        data:encodeURI(data+new Date().getTime()),
        onload: function(xhr) {

            cb(xhr.responseText);
        },
        onerror: function(xhr){alert("Mythmonger Tools Server Error"+xhr.status)}
    });
}

//
//Source: http://userscripts.org/scripts/review/20145
//A gratefully provided autoupdate script!
//

var SUC_script_num = 64902; // Change this to the number given to the script by userscripts.org (check the address bar)

function updateCheck(forced)
{
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
        try
        {
            GM_xmlhttpRequest(
            {
                method: 'GET',
                url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                headers: {
                    'Cache-Control': 'no-cache'
                },
                onload: function(resp)
                {
                    var local_version, remote_version, rt, script_name;

                    rt=resp.responseText;
                    GM_setValue('SUC_last_update', new Date().getTime()+'');
                    remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                    local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
                    if(local_version!=-1)
                    {
                        script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                        GM_setValue('SUC_target_script_name', script_name);
                        if (remote_version > local_version)
                        {
                            if(confirm('Mythmonger Tools needs an update in order to log your battles: \nWould you like to go to the install page now?'))
                            {
                                GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                GM_setValue('SUC_current_version', remote_version);
                            }
                        }
                        else if (forced)
                            alert('No update is available for "'+script_name+'."');
                    }
                    else
                        GM_setValue('SUC_current_version', remote_version+'');
                }
            });
        }
        catch (err)
        {
            if (forced)
                alert('Mythmonger Tools Logging Script:\nAn error occurred while checking for updates:\n'+err);
        }
        
    }
}


GM_registerMenuCommand('Mythmonger Tools - Manual Update Check', function()
{
    updateCheck(true);
});

