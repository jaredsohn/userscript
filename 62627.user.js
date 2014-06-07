// ==UserScript==
// @name          Depositfiles download timer remover and download slot getter
// @namespace     http://depositfiles.com
// @description   (v1.5) Gets a download slot for you and lets you download right away without captchas or timers
// @include       http://*.depositfiles.com/*/files/*
// @include       http://depositfiles.com/*/files/*
// ==/UserScript==

/*******************************************************************************
functions to edit the page:
*******************************************************************************/

function hide(id)
{
    if(document.getElementById(id))
        document.getElementById(id).style.display="none";
}

function show(id)
{
    if(document.getElementById(id))
        document.getElementById(id).style.display="";
}


function replace(id, val)
{
    if(document.getElementById(id))
        document.getElementById(id).innerHTML=val;
}

function append(id, val)
{
    if(document.getElementById(id))
        document.getElementById(id).innerHTML+=val;
}

function prepend(id, val)
{
    if(document.getElementById(id))
    {
        element=document.getElementById(id);
        element.innerHTML=val+element.innerHTML;
    }
}

function hard_refresh()
{
    window.location.href=window.location.href;
}

function replace_body(content)
{
    document.getElementsByTagName("body")[0].innerHTML=content;
}

function append_body(content)
{
    document.getElementsByTagName("body")[0].innerHTML+=content;
}

function prepend_body(content)
{
    body=document.getElementsByTagName("body")[0];
    body.innerHTML=content+body.innerHTML;
}


function replace_head(content)
{
    document.getElementsByTagName("head")[0].innerHTML=content;
}

function append_head(content)
{
    document.getElementsByTagName("head")[0].innerHTML+=content;
}

function prepend_head(content)
{
    head=document.getElementsByTagName("head")[0];
    head.innerHTML=content+head.innerHTML;
}

function search_page(tag, content)
{
    element=document.getElementsByTagName(tag);
    for(i=0; i<element.length; i++)
    {
        contents=element[i].innerHTML;
        if(contents.search(content)>=0)
            return true;
    }
    
    return false;
}


function getElementsByClassName(className)
{
    var arr=new Array();
    var j=0;

    element=document.getElementsByTagName("*");
    for(i=0; i<element.length; i++)
    {
        if(element[i].className==className)
        {  
            arr[j]=element[i];
            j++;
        }
    }
    
    return arr;
}

function print_msg(msg) {
	var div = getElementsByClassName("banner1")[0];
	
	div.innerHTML = "<div class=\"string\"><b>" + msg + "</b></div>";
}

function is_digit(ch) {
	if(ch == '0' || ch == '1' || ch == '2' || ch == '3' || ch == '4' || ch == '5' || ch == '6' || ch == '7' || ch == '8' || ch == '9') {
		return true;
	} else {
		return false;
	}
}

/*******************************************************************************
download options
*******************************************************************************/

function check_auto_download(autoSetting)
{
    if(GM_setValue && GM_getValue)
    {
        automatic=GM_getValue("automatic");
        
        if(automatic==undefined)
        {
            if(confirm(autoSetting))
                GM_setValue("automatic", true);
            else
                GM_setValue("automatic", false);
        }
        
        return GM_getValue("automatic");
    }
    else
        alert("You have an old version of greasemonkey.  You should upgrade greasemonkey if you want to be able to save settings regarding this script.");

}
/*******************************************************************************
script follows:
*******************************************************************************/

function notifyTimeToDownload()
{
    secLeft=timeLeft;
    
    result="Time left until download can start: <b>";
    if(secLeft<0)
        result+="Unknown";
    else if(secLeft>0)
        result+=secLeft+" seconds";
    result+="</b>";
    
    if(secLeft==0)
    {
        result="<a href=\"#\" id=\"dwn_link\" onClick=\"submit_img_code(); on_event('download_click');\">Click here for your file.</a>";
        
        if(autoDownload)
        {
            unsafeWindow.submit_img_code();
            unsafeWindow.on_event('download_click');
        }
        else
        {
            alert("Greasemonkey userscript alert: "+document.domain+" download is ready\n\nThe following file is ready to download:\n"+window.location.href);
        }
    }
    

    replace("gm_notifyTimeToDownloadElement", result);
    
    timeLeft--;
    if(timeLeft>=0)
        window.setTimeout(notifyTimeToDownload, 1000);
}

// set up

var div=document.getElementsByTagName("div");
var title;
for(var i=0; i<div.length; i++)
{
    if(div[i].class="string")
    {
        title=div[i];
    }
}


noDownloadSlot=false;
downloadModeSelection=false;
timeLeft=60;
/*
autoDownload=check_auto_download("Would you like your downloads to start automatically on depositfiles.com?  Please note that you will still have to enter the captcha text.\n\nWARNING: Also note that you'll need to finish entering the captcha before the "+timeLeft+"-second timer runs out on each download page if you decide to start downloads automatically.\n\nClick \"OK\" if you want downloads to start automatically; click \"Cancel\" if not.  You will be notified via an alert box if you do not want downloads to start automatically.");
*/
autoDownload=check_auto_download("Would you like your downloads to start automatically on depositfiles.com?  Click \"OK\" if you want downloads to start automatically; click \"Cancel\" if not.");


// see if we are at the limit
downloadLimit=search_page("*", "page_download_limit") || search_page("*", "minute") || search_page("*", "Minute");

// see if we need to hard refresh for a download slot
noDownloadSlot=search_page("*", "slot");

// see if we're on a download mode selection page
downloadModeSelection=search_page("*", "page_download_gateway");

if(downloadLimit)
{
	// ipbg holds the time notice
	var timeItem = getElementsByClassName("ipbg")[0];
	var time = timeItem.innerHTML;
	var start = -1;
	var end = -1;
	
	// search for number
	
	for(var i = 0; i < time.length; i++) {
		if( is_digit(time.charAt(i)) ) {
			if(start == -1) {
				start = i;
			}
			
			end = i;
			
		} else if(start != -1) {
			end++;
			break;
		}
	}
	
	var minutes = time.substring(start, end);
	
	if( search_page("*", "minute")  || search_page("*", "Minute") ) {
		print_msg("Automatically reloading after " + minutes +" minute(s) when time limit ends.");
		window.setTimeout(hard_refresh,  minutes * 60000);
	} else {
		print_msg("Could not find number of minutes until time limit end.  Automatically reloading page every 60 seconds to wait for limit to end; please wait...");
		window.setTimeout(hard_refresh, 60000);
	}
	
	
}

// refresh if there's no download slot
else if(noDownloadSlot)
{
    print_msg("Automatically getting a download slot; please wait...");
    
    window.setTimeout(hard_refresh, 15000);
}

// press the free download button if we are on the download mode selection page
else if(downloadModeSelection)
{

    try
    {
        print_msg("Automatically going to the free download page; please wait...");
    
        var form=document.getElementsByTagName("form");
        var buttonForm;
        
        for(var i=0; i<form.length; i++)
        {
            if(form[i].action.search("files")>=0)
            {
                buttonForm=form[i];
            }
        }
    
        buttonForm.target="_self";
        buttonForm.onClick="";
        buttonForm.submit();
    }
    catch(e)
    {
        alert("[greasemonkey] An error occured while trying to go to the download page: "+e);
    }
}

// otherwise, we must be on the download link page
// modify the page as necessary
else
{

    hide("download_waiter");
    hide("dwn_link");
    show("download_url");
    show("img_code_block");
 
 	print_msg("Removed download timer; enjoy your download!");
 
    // remove the page changing junk after clicking the download link
    unsafeWindow.download_started = function() {
    };
    // remove pop up functions, too
    unsafeWindow.show_begin_popup = function() {
    };
    
    var form=document.getElementsByTagName("form");
    var buttonForm;
    
    for(var i=0; i<form.length && autoDownload; i++)
    {
        if(form[i].method.search("get")>=0)
        {
            form[i].submit();
            break;
        }
    }
    
    /*
    if(autoDownload)
        prepend("download_url", "<p style=\"text-align: left;\">The download will start automatically.  If you do not enter the captcha properly and you still click the download link, your download will not start.</p><br />");
    else
        prepend("download_url", "<p style=\"text-align: left;\">You will be alerted with an alert box when your download is ready.</p><br />");
    
    
    append("download_url", "<div class=\"docbody_content\"><div id=\"gm_notifyTimeToDownloadElement\" class=\"file_dwnld\">Time notifier not yet initialised</div></div> ");
    
    
    // set up the captcha
    unsafeWindow.img_code_cached = new Image();
    var date = new Date();
    var fixedDate=date.getTime()+1000*timeLeft; // fake out the captcha so we get the right one
    unsafeWindow.img_code_cached.src = unsafeWindow.img_code_url+'&rnd='+fixedDate;
    unsafeWindow.begin_script_url=true;
    unsafeWindow.refresh_img_code(); // show the captcha
    show("img_code_img");
    
    window.setTimeout(notifyTimeToDownload, 500);
    */
    
}
