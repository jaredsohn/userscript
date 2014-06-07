// ==UserScript==
// @name        Twitch SRL addon
// @namespace   www.twitch.tv/zas_
// @description SRL Race funcions for twitch pages
// @include     *.twitch.tv/*
// @exclude     api.twitch.tv/*
// @exclude     blog.twitch.tv/*
// @exclude     help.twitch.tv/*
// @exclude     *.www.twitch.tv/*
// @version     2.7
// @grant       none
// @updateURL   http://userscripts.org/scripts/source/212900.user.js
// @downloadURL http://userscripts.org/scripts/source/212900.user.js
// ==/UserScript==

race=null;
entrant=null;
updatetimer=null;//online button
refreshtimer=null;//offline button
racetimetimer=null;//race time
racetime=0;
chatcooldown=0;
chatconfirm="";
request_in_progress=false;
initialized=false;
dragstarted=false;

var mousex;
var mousey;
var dragging=false;
var dragx=0;
var dragy=0;
var dragsx=0;
var dragsy=0;
var dragposx;
var dragposy;

if (window.top==window.self)
pagereload();

function pagereload()
{
    //console loads instantly
    if (document.title.indexOf("'s Dashboard - Twitch")>0)
    init_dashboard();
    else
    //since normal twitch pages now run in a single window we need to start listening to its changes
    document.documentElement.addEventListener("DOMSubtreeModified",checkload,false);
}

function checkload()
{
    //if srl button has been removed in a page change
    if (!document.getElementById("srl_button"))
    {
        if (document.getElementById("srl_outside_family"))
        {
            hide_menu();
            document.getElementById("srl_outside_family").remove();
        }
        
        init_channel();
    }
}

function init_channel()
{
    //check for channel-name node to grab the streamer's name and verify channel page
    var profilenode=document.getElementsByClassName("channel-name")[0];
    if (profilenode)
    {
        //stop all other events that would create more srl buttons
        document.documentElement.removeEventListener("DOMSubtreeModified",checkload,false);
        page_type="channel";
        var prof=profilenode.href.split("/");
        streamer=prof[prof.length-2];
        //initialize and create the srl button
        init();
        //now that the button exists start listening for more page changes
        document.documentElement.addEventListener("DOMSubtreeModified",checkload,false);
    }
}

function init_dashboard()
{
    page_type="dashboard";
    streamer=document.title.substring(0,document.title.indexOf("'"));
    init();
}

function init()
{
    channel=streamer.toLowerCase();
    //node to use CurrentChat in body for chat notifications
    notify_node=document.createElement("div");
    notify_node.style.display="none";
    document.body.insertBefore(notify_node,document.body.childNodes[0]);
    
    buttontext_node=document.createElement("div");
        buttontext_node.innerHTML="SRL";
        buttontext_node.style.opacity="0.3";
    button_node=document.createElement("a");
        button_node.id="srl_button";
        button_node.style.paddingRight="24px";
        button_node.appendChild(buttontext_node);
    comment_node=document.createElement("div");
        comment_node.id="srl_comment";
        comment_node.className="tipsy tipst-sw"
        comment_node.innerHTML="</div><div class='tipsy-inner' id='srl_comment_message'></div>"
        comment_node.style.display="none";
        comment_node.style.opacity="0.8";
        comment_node.style.width="100%";
    
    switch (page_type)
    {
        case "channel":
            {
                var insert_before=document.getElementsByClassName("buttons clearfix")[0];//share popup
                var insert_main=document.getElementById("left_col");
                var insert_element=document.getElementsByClassName("buttons clearfix")[0];//bookmark
                
                window_node=document.createElement("div");
                    window_node.id="srl";
                    window_node.className="dropmenu ember-view";
                button_node.className="ember-view dropdown_static action";
                    button_node.onclick=srl_button_action;
                    button_node.style.margin="0px 10px 10px 0px";
                
                //add padding to subscribe button
                var extrastyle_node=document.createElement("style");
                extrastyle_node.type="text/css";
                extrastyle_node.innerHTML="#is-subscribed{padding-right:15px;}";
                document.head.appendChild(extrastyle_node);
                
                insert_element.appendChild(button_node);
                inside_family_node=document.createElement("div");
                    inside_family_node.id="srl_inside_family";
                    inside_family_node.appendChild(window_node);
                    inside_family_node.appendChild(comment_node);
                outside_family_node=document.createElement("div");
                    outside_family_node.id="srl_outside_family";
                insert_main.parentNode.insertBefore(outside_family_node,insert_main);
                insert_before.parentNode.insertBefore(inside_family_node,insert_before);
            }
            break;
        case "dashboard":
            {
                var insert_before=document.getElementById("languages_popup");
                var insert_into=document.getElementById("site_header");
                insert_element=document.getElementById("vod_form");
                
                window_node=document.createElement("div");
                    window_node.id="srl";
                    window_node.className="dropmenu menu-like";
                button_node.className="dropdown";
                    button_node.onclick=srl_button_action;
                    button_node.style.margin="0px 0px 0px 1px";
                
                insert_element.insertBefore(button_node,document.getElementById("form_submit"));
                insert_element.appendChild(window_node);
                insert_element.appendChild(comment_node);
            }
            break;
        default:
            break;
    }
    
    window_node.innerHTML='\
    <div id="srl_window_content" style="min-height: 70px">\
        <div id="srl_draggable" style="padding:5px 5px;webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select: none;-ms-user-select:none;user-select:none;">\
            <div style="padding:0px; font-weight: bold;" class="dropmenu_action">\
                <span id="srl_racetitle" style="padding:0px;">Loading...</span>\
                <img id="srl_loading" style="float:right;" src="http://www-cdn.jtvnw.net/images/spinner.gif"></img>\
            </div>\
        </div>\
        <div id="srl_race_content" style="display:none;">\
            <div class="dropmenu_action" style="padding:0px 5px;">\
                <a class="g18_mail-FFFFFF80" style="cursor: pointer; width:22px; height:12px; margin:1px 0px 0px; float:left;" id="srl_post_goal"></a>\
                <span id="srl_racegoal">No goal</span>\
            </div>\
            <div style="box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1) inset;padding-top:2px">\
                <div style="padding: 0px 5px;">\
                    <span class="dropmenu_action" style="padding:0px;display:inline;" id="srl_racestatus"></span>\
                    <span id="srl_entrants_n" style="float:right;"></span>\
                </div>\
                <div style="padding:2px 0px;" id="srl_entrants"></div>\
            </div>\
            <div style="padding:5px 5px 0px 5px; box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1) inset;" class="dropmenu_action">\
                <a class="g18_mail-FFFFFF80" style="cursor: pointer; width:22px; height:12px; margin-top:0px;" id="srl_post_multitwitch"></a>\
                <a target="_blank" style="padding-top:0px; padding-bottom:0px; cursor: pointer;" id="srl_multitwitch">Multitwitch</a>\
                <a class="g18_mail-FFFFFF80" style="cursor: pointer; width:22px; height:12px; float:right; margin:1px -5px 0px 6px;" id="srl_post_racepage" style="float:right"></a>\
                <a target="_blank" style="padding-top:0px; padding-bottom:0px; cursor: pointer; width=100%; float:right;" id="srl_racepage">Race page</a>\
            </div>\
        </div>\
        <div style="width:100%;text-align:center;padding-bottom:5px;">\
            <a id="srl_advertise" style="cursor:pointer;padding:0px 10px;">Share this script with the chat</a>\
        </div>\
    </div>\
    <div id="srl_chat_confirm" style="display: none;position: absolute;width: 100%;text-align: center;height: 70px;bottom: 50%;margin-bottom: -35px;">\
        <div id="srl_chat_confirm_text" style="margin-bottom: 15px;"></div>\
        <div id="srl_chat_yes" class="ember-view normal_button action" style="position: absolute; margin: 0px; left: 60px;">\
           <div style="height: 30px; font-weight: bold; float: none; line-height: 24pt; width: 90px;">Yes</div>\
        </div>\
        <div id="srl_chat_no" class="ember-view normal_button action" style="position: absolute; margin: 0px; right: 60px;">\
           <div style="height: 30px; font-weight: bold; float: none; line-height: 24pt; width: 90px;">No</div>\
        </div>\
    </div>';
    
    window_node.parentNode.style.position="relative";
    window_node.style.display="none";
    window_node.style.position="absolute";
    window_node.style.setProperty("z-index","5444333","important");
    window_node.style.outline="medium none";
    window_node.style.width="320px";
    window_node.style.padding="0px";
    window_node.style.overflow="hidden";
    
    window_content_node=document.getElementById("srl_window_content");
    chat_confirm_node=document.getElementById("srl_chat_confirm");
    chat_confirm_text_node=document.getElementById("srl_chat_confirm_text");
    chat_yes_node=document.getElementById("srl_chat_yes");
    chat_no_node=document.getElementById("srl_chat_no");
    
    draggable_node=document.getElementById("srl_draggable");
    draggable_node.style.cursor="move";
    draggable_node.onmousedown=drag_start;
    document.body.onmouseup=drag_end;
    document.body.onmousemove=drag_perform;
    racetitle_node=document.getElementById("srl_racetitle");
    racetitle_node.style.fontSize="13px";
    loading_node=document.getElementById("srl_loading");
    racegoal_node=document.getElementById("srl_racegoal");
    entrants_n_node=document.getElementById("srl_entrants_n");
    multitwitch_node=document.getElementById("srl_multitwitch");
    racepage_node=document.getElementById("srl_racepage");
    racestatus_node=document.getElementById("srl_racestatus");
    entrants_node=document.getElementById("srl_entrants");
    postgoal_node=document.getElementById("srl_post_goal");
    postmulti_node=document.getElementById("srl_post_multitwitch");
    postrace_node=document.getElementById("srl_post_racepage");
    racecontent_node=document.getElementById("srl_race_content");
    
    message_node=document.getElementById("srl_comment_message");
    advertise_node=document.getElementById("srl_advertise");
    
    postgoal_node.addEventListener("click",event_post_goal,false);
    postmulti_node.addEventListener("click",event_post_multitwitch,false);
    postrace_node.addEventListener("click",event_post_racepage,false);
    advertise_node.addEventListener("click",advertise_script,false);
    chat_yes_node.addEventListener("click",chat_confirm,false);
    chat_no_node.addEventListener("click",chat_decline,false);
    
    get_srl_data();
    refreshtimer=setInterval(get_srl_data,180000);
}

function srl_button_action()
{
    if (window_node.style.display=="none")
    {
        show_menu();
        get_srl_data();
    }
    else
    hide_menu();
}

function show_menu()
{
    chat_decline();
    
    dragx=0;
    dragy=0;
    
    if (race===null)
    racetitle_node.innerHTML="Loading...";
    
    window_node.style.display="block";
    position_menu();
    if (refreshtimer!==null)
    {
        window.clearInterval(refreshtimer);
        refreshtimer=null;
    }
    if (updatetimer!=null)
    window.clearInterval(updatetimer);
    updatetimer=setInterval(get_srl_data,30000);
}

function hide_menu()
{
    chat_decline();
    
    if (page_type=="channel")
    if (dragstarted==true)
    {
        inside_family_node.appendChild(window_node);
        inside_family_node.appendChild(comment_node);
        outside_family_node.innerHTML="";
    }
    
    dragging=false;
    dragstarted=false;
    
    window_node.style.display="none";
    if (updatetimer!==null)
    {
        window.clearInterval(updatetimer);
        updatetimer=null;
    }
    if (racetimetimer!==null)
    {
        window.clearInterval(racetimetimer);
        racetimetimer=null;
    }
    if (refreshtimer!=null)
    window.clearInterval(refreshtimer);
    refreshtimer=setInterval(get_srl_data,180000);
}

function handle_hover(node,mesg)
{
    return function()
    {
        hover_on(node,mesg);
    };
}

function hover_on(node,mesg)
{
    message_node.innerHTML=mesg;
    comment_node.style.display="inline";
    comment_node.style.top=parseInt(window_node.style.top)+node.offsetTop-comment_node.offsetHeight+20-node.offsetHeight+"px";
    comment_node.style.left=parseInt(window_node.style.left)+node.offsetLeft+5+"px";
}

function hover_off(node)
{
    comment_node.style.display="none";
}

function position_menu()
{
    switch (page_type)
    {
        case "channel":
            if (dragstarted)
            {
                window_node.style.top=dragsy+dragy+"px";//below
                window_node.style.left=dragsx+dragx+"px";
            }
            else
            {
                window_node.style.top=/*dragy+*/button_node.clientHeight+7+button_node.clientTop+button_node.offsetTop+"px";//below
                window_node.style.left=/*dragx+*/button_node.offsetLeft+"px";
            }
            break;
        case "dashboard":
            window_node.style.top=dragy+button_node.clientHeight+7+button_node.clientTop+button_node.offsetTop+"px";//below
            window_node.style.left=dragx+button_node.offsetLeft+"px";
        default:
            break;
    }
}

function verify_page()
{
    switch (page_type)
    {
        case "channel":
            return (document.title==streamer + " - Twitch");
            break;
        case "dashboard":
            return (document.title==streamer + "'s Dashboard - Twitch");
        default:
            return false;
    }
}

function load_race()
{
    racetitle_node.innerHTML=race.game.name;
    
    var urlgoal=false;
    var goalresult="";
    if (typeof(race.goal)!=="undefined")
    {
        var goaltext=race.goal.split(" ");
        for(i=0;i<goaltext.length;i++)
        {
            if (goaltext[i].indexOf("http://")!=-1||goaltext[i].indexOf("https://")!=-1)
            {
                goaltext[i].replace("&amp;","&");//For some reason this can happen in bingos, i hope this is more use than harm
                goalresult+="<a href='"+goaltext[i]+"' target='_blank'>"+goaltext[i]+"</a> ";
                urlgoal=true;
            }
            else
            goalresult+=goaltext[i]+" ";
        }
    }
    racegoal_node.innerHTML=goalresult;
    
    //if (urlgoal==true)
    postgoal_node.style.display="inline";//always enabled
    //else
    //postgoal_node.style.display="none";
    
    var multitwitchurl=generate_multitwitch(race.entrants);
    
    
    if (multitwitchurl===null)
    {
        multitwitch_node.style.display="none";
        postmulti_node.style.display="none";
    }
    else
    {
        multitwitch_node.href=multitwitchurl;
        multitwitch_node.style.display="inline";
        postmulti_node.style.display="inline-block";
    }
    
    racepage_node.href="http://speedrunslive.com/race/?id="+race.id;
    
    switch (race.state)
    {
        case 3:
            racetime=new Date().getTime()/1000-race.time;
            srl_racestatus.innerHTML=make_time(racetime);
            if (racetimetimer!=null)
            window.clearInterval(racetimetimer);
            
            if (race.state==3)//run timer if in progress
            racetimetimer=setInterval(update_racetime,1000);
            break;
        case 4:
        case 5:
            if (racetimetimer!=null)
            window.clearInterval(racetimetimer);
            srl_racestatus.innerHTML="Race over";
            break;
        case 1://Entry Open
            if (racetimetimer!=null)
            window.clearInterval(racetimetimer);
            srl_racestatus.innerHTML="About to start";
            break;
        default:
            if (racetimetimer!=null)
            window.clearInterval(racetimetimer);
            srl_racestatus.innerHTML=race.statetext;
            break;
    }

    entrants_node.innerHTML="";
    var entrants_n=0;
    for(i in race.entrants)
    {
        entrants_n++;
        
        if (race.entrants[i].time>0)//finished
        entrants_node.innerHTML+="<div style='z-index:-100;opacity:0.4;position:absolute;width:100%;text-align:center;display:inline;'>"+finishPlace(race.entrants[i].place)+"</div>"
        
        var node=document.createElement("div");
        
        switch(race.entrants[i].place)
        {
            case 1:
                node.style.backgroundColor="rgba(255,255,0,.1)";
                break;
            case 2:
                node.style.backgroundColor="rgba(255,255,255,.1)";
                break;
            case 3:
                node.style.backgroundColor="rgba(255,150,0,.1)";
                break;
            default:
                break;
        }
        
        node.style.padding="0px 5px";
        if (race.entrants[i]==entrant)
        node.style.textDecoration="underline";
        
        node.style.borderTop="1px solid rgba(255,255,255,0.025)";
       
        var inner_html="";
        
        if (race.entrants[i].twitch!=""&&race.entrants[i].twitch.toLowerCase()!=channel)
        inner_html+="<a style='' target='_blank' href='http://www.twitch.tv/"+race.entrants[i].twitch+"'>"+race.entrants[i].displayname+"</a>";
        else
        inner_html+=race.entrants[i].displayname;
        
        inner_html+="<div style='float:right;'>"
        
        if (race.entrants[i].message!==null)
        if (race.entrants[i].message!=="")
        {
            node.onmouseover=handle_hover(node,race.entrants[i].message);
            node.onmouseout=function(){hover_off(this);};
        }
        
        switch(race.entrants[i].time)
        {
            case -1://forfeit
                inner_html+="Forfeit";
                break;
            case -3://in progress
                break;
            case 0://not in progress
                break;
            default:
                if (race.entrants[i].time>0)//finished
                {
                    inner_html+=make_time(race.entrants[i].time);
                }
                break;
        }
        inner_html+="</div></div>\n";
        
        node.innerHTML=inner_html;
        entrants_node.appendChild(node);
    }
    entrants_n_node.innerHTML=entrants_n+(entrants_n==1?" entrant":" entrants");
    
    position_menu();
}

function update_racetime()
{
    racetime++;
    srl_racestatus.innerHTML=make_time(racetime);
}

function event_post_goal()
{
    chat_ask_confirm("Post race goal in the chat?","Race goal: "+race.goal);
}

function event_post_multitwitch()
{
    chat_ask_confirm("Post Multitwitch in the chat?",multitwitch_node.href);
}

function event_post_racepage()
{
    chat_ask_confirm("Post SRL page in the chat?",racepage_node.href);
}

function advertise_script()
{
    chat_ask_confirm("Post download link in the chat?","SRL race plugin for twitch: Firefox http://bombch.us/UHn, Chrome http://bombch.us/U-d");
}

function get_page()
{
    if (document.title.indexOf("'")!=-1)
    return "dashboard";
    else
    if (document.title.indexOf(" ")!=-1)
    return "channel";
    else
    return null;
}

function get_srl_data()
{
    if (request_in_progress==true)
    return;
    request_in_progress=true;
    
    loading_node.style.display="inline";
    
    pageRequest=new XMLHttpRequest();
    
    pageRequest.onreadystatechange=function()
    {
        if (pageRequest.readyState==4&&pageRequest.status==200)
        {
            request_in_progress=false;
            
            var srl=JSON&&JSON.parse(pageRequest.responseText)||$.parseJSON(pageRequest.responseText);
            race=null;
            
            if (srl.count>0)
            {
                var race_priority=-1;//any race found will do
                
                for(var i=0;i<srl.races.length;i++)
                {
                    for(j in srl.races[i].entrants)
                    {
                        if (srl.races[i].entrants[j].twitch.toLowerCase()==channel)//streamer found in a race
                        {
                            switch (srl.races[i].entrants[j].time)
                            {
                                case 0://race not started
                                    if (race_priority<4&&srl.races[i].goal!==""||race_priority==-1)
                                    {
                                        race=srl.races[i];
                                        race_priority=4;
                                        entrant=srl.races[i].entrants[j];
                                    }
                                    break;
                                case -3://in progress
                                    if (race_priority<3&&srl.races[i].goal!==""||race_priority==-1)
                                    {
                                        race=srl.races[i];
                                        race_priority=3;
                                        entrant=srl.races[i].entrants[j];
                                    }
                                    break;
                                case -1://forfeit
                                    if (race_priority<1&&srl.races[i].goal!==""||race_priority==-1)
                                    {
                                        race=srl.races[i];
                                        race_priority=1;
                                        entrant=srl.races[i].entrants[j];
                                    }
                                    break;
                                default://finished
                                    if (srl.races[i].entrants[j].time>0)//finished
                                    if (race_priority<2&&srl.races[i].goal!==""||race_priority==-1)
                                    {
                                        race=srl.races[i];
                                        race_priority=2;
                                        entrant=srl.races[i].entrants[j];
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            
            loading_node.style.display="none";
            
            if (race!==null)
            {
                buttontext_node.style.opacity="1.0";
                if (window_node.style.display!="none")
                {
                    racecontent_node.style.display="inline";
                    load_race();
                }
            }
            else
            {
            
                buttontext_node.style.opacity="0.3";
                racetitle_node.innerHTML="Not racing.";
                racecontent_node.style.display="none";
            }
        }
    }
    
    pageRequest.open("GET","http://api.speedrunslive.com/races",true);
    pageRequest.send();
}

function generate_multitwitch(entrants)
{
    var multi="http://multitwitch.tv";
    var streamers=0;
    for(k in entrants)
    {
        if (entrants[k].twitch!=="")
        {
            multi+="/" + entrants[k].twitch;
            streamers++;
        }
    }
    
    if (streamers>1)
    return multi;
    return null;
}

function chat_ask_confirm(question,chttxt)
{
    chatconfirm=chttxt;
    
    chat_confirm_text_node.innerHTML=question;
    window_content_node.style.visibility="hidden";
    chat_confirm_node.style.display="block";
}

function chat_confirm()
{
    post_in_chat(chatconfirm);
    chat_confirm_node.style.display="none";
    window_content_node.style.visibility="visible";
}

function chat_decline()
{
    chat_confirm_node.style.display="none";
    window_content_node.style.visibility="visible";
}

function notify_in_chat(text)
{
    notify_node.setAttribute("onclick","CurrentChat.admin_message(i18n('" + text + "'));");
    notify_node.click();
}

function post_in_chat(text)
{
    if (document.getElementById("speak").className.indexOf("fademe")==-1)//chat is enabled
    if (chatcooldown+1000<new Date().getTime())//1 second misclick cooldown
    {
        chatcooldown=new Date().getTime();
        var chatinput=document.getElementById("chat_text_input");
        var temp=chatinput.value;
        chatinput.value=text;
        document.getElementById("chat_speak").click();
        chatinput.value=temp;
    }
}

function make_time(time)
{
    var str="";
    
    var hours=Math.floor(time);
    var seconds=hours%60;
    hours-=seconds;
    
    var minutes=(hours%3600)/60;
    hours-=minutes*60;
    hours/=3600;
    
    if (hours>0)
    str+=hours+":";
    
    if (minutes>0||hours>0)
    {
        if (minutes<10&&hours>0)
        str+="0"+minutes+":";
        else
        str+=minutes+":";
    }
    
    if (seconds<10&&minutes>0)
    str+="0"+seconds;
    else
    str+=seconds;
    
    return str;
}

function addEventSimple(obj,event,func)
{
    if (obj.addEventListener)
    obj.addEventListener(event,func,false);
    else if (obj.attachEvent)
    obj.attachEvent('on'+event,func);
}

function finishPlace(place)
{
    switch (place)
    {
        case 1:
        return "1st";
        case 2:
        return "2nd";
        case 3:
        return "3rd";
        default:
        return place+"th";
    }
}

function drag_start(e)
{
    if (e.button==0)
    {
        if (page_type=="channel")
        if (dragstarted==false)
        {
            var bbox=window_node.getBoundingClientRect();
            dragsx=bbox.left;
            dragsy=bbox.top;
            outside_family_node.appendChild(window_node);
            outside_family_node.appendChild(comment_node);
            inside_family_node.innerHTML="";
        }
        dragging=true;
        dragstarted=true;
        mousex=e.clientX; 
        mousey=e.clientY;
        dragposx=e.clientX;
        dragposy=e.clientY;
        position_menu();
    }
}

function drag_end(e)
{
    if (e.button==0)
    {
        drag_perform(e);
        dragging=false;
    }
}

function drag_perform(e)
{
    if (dragging)
    {
        dragposx=mousex;
        dragposy=mousey;
        mousex=e.clientX; 
        mousey=e.clientY;
        dragx+=mousex-dragposx;
        dragy+=mousey-dragposy;
        position_menu();
        e.preventDefault();
        return false;
    }
}
