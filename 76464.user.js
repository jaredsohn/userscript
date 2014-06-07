// ==UserScript==
// @name           Neat Digit Forum (2.7)
// @namespace      http://www.gauravtarey.com
// @description    Removes unnecessary Ads and provides space to worthy content
// @author         tarey_g 
// @include        http://www.thinkdigit.com/forum/*
// @include        http://www.thinkdigit.com/forum/*/*


// ==/UserScript==
// Credit : Translation help from http://userscripts.org/scripts/show/36898


// global variable used in various functions
var strongTag = document.getElementsByTagName("strong");
strongTag[0] = document.createElement('strong');
strongTag[1] = document.createElement('strong');
var userUrl;
var userId;
var settingsPanelLeft;
var announcementSpan = document.createElement('span');
var spanTag = document.getElementsByTagName("span"); // All span
var oTd = document.getElementsByTagName("td"); // All td
var allDivtags = document.getElementsByTagName("div"); //all div 
var allScripts = document.getElementsByTagName("script");
var allAnchor = document.getElementsByTagName("a"); // All anchor
var allIframe = document.getElementsByTagName("iframe"); // All anchor

// Expand image in data form
var img_plus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAADAFBMVEUEAgR8mrTUzrzs6uTc2tTEtqTc1sy0wtT09vTMyrzc0szEvqzUzsT08uzEuqzs7uTk4tzEuqTc2sz8/vzU0sQC60AAEjMAAAAASAIDQQ0AMx0AAABYAJDpAEASADMAAADpANvlABqBANd8AFoA7wwAAfcBABIAAABWdnAAACYAAEYAAABgkIToQAASMwAAAABlAAIAAA0AAB0AAACAAoTpAAASAAAAAAAY7ADu6gCQEgB8AABw+dEF2gCR1w98WgD/0QT/AAD/AAD/AABtCOQFAASRAAB8AACFSHHnQdWBM0F8AH4AcAAAAAAVAAAAAABYEAEDCQAAAAAAAACIAQEWAAAZAAAAAAA43ABvQAAVMwAAAAAA7HEAQNUAM0EAAH5+mAIAQQAAMwDAAAAAAlgADesAHRIAAAD/kHr/QDb/M9f/AFr/hC3/ADz/ANf/AFoAAAAAAAAAAQAAAAAAAQAAAAAAAgAAAAAAoNEAAAAVAA8AAACrH2BbAJ4AAIAAAHyQEQDpAAESABYAAACfBADrAACBAAB8AABKAwfjAACBAAB8AABAAAB4AABQAAAAAAA4AABvAAABABYAAABrBAAAAAAAAAAAAADMqwDoWwASAAAAAAA0qAAA6gAAEgDAAAAIhQD8KwASgwAAfAAYAGjuAJ6QAIB8AHxwAP8FAP+RAP98AP//AGD/AJ7/AID/AHxtADIFAQCRAAB8AABK6TL0KwCAgwB8fAAAzFgA6vEVEhIAAAAAxP8AK/8Ag/8AfP84AABvAAAVAAAAAAAAANQBAesAFhIAAAAANMYAZDwAg0wAfABX/7T0/+uA/xJ8/wC40Hfq6xASEk8AAAA4behvZOsVgxIAfAD/YDT/LWT/T4P/AHwCdJYANu0ATxIAAAAQAMzqAf8SAP8AAH/3zGTb6u3XEhJaAABoAAAkAQEzABYAAAAAiDQAZGQAg4MAfHxgAQBeAAE/ABYAAAABAKsAAFsAMAAAAABwEQABAAAAAAAAAAD0ALbpAOoSAEcAAAB/TANPAAABAHRSTlP/////////AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jbfv0AAAAD5JREFUeJw9zEEKACEMQ9EUnTFKK4L3v+ukI/izeaug2anB9sl+gZsSSTBWClmVIgpKHdJ6B9y75HM+muH+fWk1AiDL6P/OAAAAAElFTkSuQmCC';

// Collapse image in data form
var img_minus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAADAFBMVEUEAgR8mrTUzrzs6uTc2tTEtqTc1sy0wtT09vTMyrzc0szEvqzUzsT08uzEuqzs7uTk4tzEuqTc2sz8/vzU0sQCAIgAAEEAAH4A4P8DZP8AUP8AAP9YASrpAIgSAEEAAH7p4JvlZLiBUEF8AH4AGAAA6gABEgAAAABWmGAA1cAAQUUAfgBgAhboDQwSHSEAAABlIAwAAAAAAAAAAACAjgDpDAASHgAAAAAYEuDuAGSQAFB8AgBwAWwFAD+RAH98AAD/2QH/iwD/QQD/fgBtiI4FAAyRRx58fgCFrFjn6T+BEn98AAAAYIUA6j4VEkIAAH5YrBYD1QwAQSEAfgCIWVgW1T8ZQX8AfgA4zFBv9esVEhIAAAAAcFgAJvUARkIAAH5+IFgAAD8AAH/AAAAAAHgAAIsAAH4AAAD/AQD/AAD/AAD/AAD/AOD/AGT/AFD/AAAAMAEA6gAAEgAAAAAAeMMA6hwAEgEAAF8A6FwA9e8VEhIAAACrV2BbBJ4ARIAAfnyQYPDp1X0SQRcAfgCf/wDr/wCB/wB8/wBKWQfj1QCBQQB8fgBABwB4iwBQRgAAAAA4AgBvDXABHRcAAABrIAAAAAAAAAAAAADMqwDoWwASAAAAAAA0qAAA6gAAEgDAAAAIhQD8KwASgwAAfAAYAGjuAJ6QAIB8AHxwAP8FAP+RAP98AP//AGD/AJ7/AID/AHxtADMFAQCRAAB8AABK6TP0KwCAgwB8fAAAzFgA6vEVEhIAAAAAxP8AK/8Ag/8AfP84AABvAAAVAAAAAAAA8NQBfesAFxIAAAAANMYAZDwAg0wAfABX/7T0/+uA/xJ8/wC40Hfq6xASEk8AAAA4behvZOsVgxIAfAAtYDS0LWRBT4N+AHwCdJcNNu0dTxIAAAAgAMsAAf8AAP8AAH+OzGQM6u0eEhIAAAASAPAAAX0AABcCAAAAiDQAZGQAg4MAfHyeAfACAH0AABcAAAABAKsAAFsAMAAAAADMAQD1AAASAAAAAABwALYmAOpGAEcAAADmkgLxAAABAHRSTlP/////////AP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jbfv0AAAADtJREFUeJw9zMsKACAIRFGlhxaiQv3/t6ZE3dmc1QDhjQDXDZ84xJl5CrKaMivFZ8j73CIjJKothvD/DngPAnQiApQ1AAAAAElFTkSuQmCC';

// Checked-UnChecked images for toggle functionality
var img_checked = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAnUlEQVR4nI3ROwoCMRAG4P/hNbyAnQiCWHgFkS0sBM/iDfYoNjb2liIi6HUsJibBdWWnCCTzZSYPjjcHDIgRgEu7iwmpCNuSY5Q02bfKO/qQJAD6g6bHWawl14cARMnkAi3Pqy8UKZLF2QYwPy1q9No+SZZ6USNyXUSWvrZ9W1/xiRqVvvkJHs29i+rzpXeS/BNll1DcrosAcOD/vgHBqhx0rjI2RQAAAABJRU5ErkJggg==';
var img_unChecked = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAYklEQVR4nI3RsQ2AQAwDQMfOGmzANBT0jEJLyUKsRsFDvsHgLtLFUpQYphU/kgCObb4GtkhKSZkpidS47Hw23hBJAPxEpJrzqPo86p1D5TzqnUMRt/MoIqrPo7rDIwDx878ncvgH6guzsHEAAAAASUVORK5CYII=';

// localization images
var img_english = "data:image/bmp;base64,Qk0GAwAAAAAAADYAAAAoAAAADwAAAA8AAAABABgAAAAAANACAAATCwAAEwsAAAAAAAAAAAAA9/z5fMaCdMN8gcmMgcmMgcmMgcmMgcmMgcmMgcmMgcmMgcmMdMN8iMuO/P79Qzpce8aB3fDg////////////////////////////////////////////zOnOjs6VQzpcdMN8////v8bOZmRk9O7p////////////////////6O3zZGRmwbq0////b8F3Qzpcc8J3////4+rwBAgLpZqP////////////////////iZSfBAIB4NfO////ccF0Qzpcc8J3////////S1VhSD0z///+/////////////f7/KTE8UEU6////////ccF0Qzpcc8J3////////rrnDBQIBvbexy8vLy8vLy8vLo6y0AAACt6+j////////ccF0Qzpcc8J3////////+fz+Fx8oAAAAAAAAAAAAAAAAAAAAJhwW/Pr2////////ccF0Qzpcc8J3////////////c3+IKiMa8O/t8fHx4+jsCg8Vi4J2////////////ccF0Qzpcc8J3////////////1t7mAgMHzcK4////nKeyCgUE6+Tb////////////ccF0Qzpcc8J3////////////////O0ZQbGJW////O0VQX1VK////////////////ccF0Qzpcc8J3////////////////n6izFA4I0tnaAgQHyL2y////////////////ccF0Qzpcc8J3////////////////8vf6DxYcSUlLMyoh/v37////////////////ccF0QzpcdMN8////////////////////ZnB7AAAAnJGF////////////////////cMF2QzpcgciG1+7b////////////////6uzvxcXF9/Ty////////////////xOXIktCXQzpc+fz6hsqMcMF1cMF1cMF1cMF1cMF1cMF1cMF1cMF1cMF1cMF1ccF3ktCY/f7+Qzpc";
var img_hindi = "data:image/bmp;base64,Qk0GAwAAAAAAADYAAAAoAAAADwAAAA8AAAABABgAAAAAANACAAATCwAAEwsAAAAAAAAAAAAA9vv4e8aBdcN9gcmMgcmMgcmMgcmMgcmMgcmMgcmMgcmMgcmMecWChsqM/P79Qzpce8aB3vHh////////////////////////////////////////////z+rRjM2TQzpcdcR+////////tLe+b29wb2xrwby2////////////xcfOx8XC////////dMN7QzpcdMN4+/7/VltmFhMSbGtpY2ZpCAkMmpGD////////WmBzYFpT////////dMN4QzpcdMN43ePoSUpJ6eLf////////nqezGhAK//36////WmBzYFpT////////dMN4QzpcdMN4////////////////////zNbhBwMA/vnz////WmBzYFpT////////dMN4QzpcdMN4/////////////////P3+ZW13YVhO////////WmBzYFpT////////dMN4QzpcdMN4////////9vv/Tk5OJigsAAAAKSYlLi4uLi4uEBEVYFpT////////dMN4QzpcdMN4////////+/3/qqutWmJnCgkFm5iSr6+vr6+vPkJPYFpT////////dMN4QzpcdMN4////////////////////UFpmcGZb////////WmBzYFpT////////dMN4QzpcdMN4////////////////////Y214Vkg/////////WmBzYFpT////////dMN4QzpcdMN4/////f7/ZWdujo2NeHyABQgJraWY////RUtPExQYFBMSNjY2////dMN4QzpcdcN9////+fz+jZOWUVJSUlFQsqym////////rrCyp6enp6enp6en////csJ4QzpcgMiG2O7d////////////////////////////////////////////yOfMkM+VQzpc+fz6hcqLcMF1cMF1cMF1cMF1cMF1cMF1cMF1cMF1cMF1cMF1ccF3kM+W/f7+Qzpc";

// get header elements
var toplink;
var topsearchpannel;
var topcategories;
var firstDiv;
for (z=0;z<allDivtags.length;z++) 
	{        
		if(allDivtags[z].getAttribute("class")=='toplink')
		{
			toplink = allDivtags[z];
		}
		if(allDivtags[z].getAttribute("class")=='topsearchpannel')
		{
			topsearchpannel = allDivtags[z];
		}
		if(allDivtags[z].getAttribute("class")=='topcategories')
		{
			topcategories = allDivtags[z];
		}	
		if(allDivtags[z].getAttribute("class")=='fixedarea')
		{
			firstDiv = allDivtags[z];
		}
	}


// Check if adBlock is enabled
if(GM_getValue("adBlock") != "disabled")
{
    var topAdba = document.getElementById('submenu');
    if (topAdba)
    {
        topAdba.parentNode.removeChild(topAdba);
    }

    var topAdbar = document.getElementById('topAd');
    if (topAdbar)
    {
        topAdbar.parentNode.removeChild(topAdbar);
    }

    var topHeader = document.getElementById('header');
    if (topHeader)
    {
        topHeader.parentNode.removeChild(topHeader);
    }
    
    for (i=0;i<oTd.length;i++)
    {
        if(oTd[i].className == "topPad5") 
        {            
			oTd[i].removeChild(oTd[i].children[0]);
        }
    }
    // Remove the ads between two posts
    var nagAdOut = document.getElementsByClassName('postbit_adcode');
    while(nagAdOut.length>0)
    {
        var nagAd = document.getElementsByClassName('postbit_adcode');	
        for (i=0;i<nagAd.length;i++)
        {
	        nagAd[i].parentNode.parentNode.parentNode.parentNode.removeChild(nagAd[i].parentNode.parentNode.parentNode);	
        }
        nagAdOut = document.getElementsByClassName('postbit_adcode');
    }

    //Remove the new ad on the top
    var bottomAd =  document.getElementById("bottomAd");
    if(bottomAd !=null)
    {
        bottomAd.parentNode.removeChild(bottomAd);
    }
    
    // remove the google syndication ad on top
    var allScript = document.evaluate('//script[@src]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for(i=0; i<allScript.snapshotLength;i++)
    {        
        if(allScript.snapshotItem(i).src.substring(0,25) == 'http://ad.doubleclick.net' || allScript.snapshotItem(i).src.substring(0,32) == 'http://pagead2.googlesyndication' || allScript.snapshotItem(i).src.substring(0,19) == 'http://ap.p-digital')
        {            
            if(allScript.snapshotItem(i).parentNode.parentNode != null)
            {
                allScript.snapshotItem(i).parentNode.parentNode.removeChild(allScript.snapshotItem(i).parentNode);
            }
        }
    }

	//remove new bottom ad
	for (z=0;z<allDivtags.length;z++) 
	{        
		if(allDivtags[z].getAttribute("id")=='footer')
		{
			allDivtags[z].parentNode.removeChild(allDivtags[z]);
		}
		if(allDivtags[z].getAttribute("class")=='make-center')
		{			
			allDivtags[z].parentNode.removeChild(allDivtags[z]);
		}
		
		// Set posts width to full
		if(allDivtags[z].getAttribute("style")=='padding: 0px 20px;')
		{			
			allDivtags[z].setAttribute("style","");
		}
	}
	
	// Expand forum content
	var widthTable = document.getElementsByClassName('forumarea');
	if(widthTable.length > 0)
	{		
		widthTable[0].setAttribute('width','100%');	
		widthTable[0].setAttribute('class','');
	}
	
	
	var forum_header = document.getElementById('div_level_1');
	if(forum_header)
	{
		forum_header.parentNode.removeChild(forum_header);
	}
	
	//Change background color of the page
	var mainDiv = document.getElementById('maindiv');
	if(mainDiv)
	{		
		mainDiv.setAttribute('style','');	
		mainDiv.parentNode.setAttribute("style","background-color:#FFFFFF;background-image:url('')");
	}
	
	
	
	
}


//---------------------- Base Code -------------------------//


// Identify the edit pages
var editPage = -1;
if(window.location.href.substring(0,40) == 'http://www.thinkdigit.com/forum/editpost' || window.location.href.substring(0,40) == 'http://www.thinkdigit.com/forum/newreply' || window.location.href.substring(0,41) == 'http://www.thinkdigit.com/forum/newthread' || window.location.href.substring(0,42) == 'http://www.thinkdigit.com/forum/member.php' || window.location.href.substring(0,52) == 'http://www.thinkdigit.com/forum/private.php?do=newpm' || window.location.href.substring(0,50) == 'http://www.thinkdigit.com/forum/login.php?do=login')
{
    editPage =1 ;
}
else
{
    editPage = 0;
}
GM_setValue("loggedIn", "undefined");
// If edit page then check for parameter 'includeEdit' and if it is enabled then let the features be provided on edit pages
editPage =0 ; //Setting editpage =0 as the problem of strongTag error msg is solved
if(editPage == 1)
{
    if(GM_getValue("includeEdit") == "enabled")
    {
        evalLoggedIn();
        loadUI();
    }
}
else // case when page is other than edit page
{    
	evalLoggedIn();    
    loadUI();
}

// Method to evaluate if the user is logged in ot not
function evalLoggedIn()
{   
	if (strongTag[1].innerHTML.substring(0,8) != 'Welcome,')
    {
        GM_setValue("loggedIn", "false");           
    }
    else
    {
        GM_setValue("loggedIn", "true");  		
    }    
}

// Loads all the UI elements on the page
function loadUI()
{
    // Provide features only if the user is logged in
    setSiteSearch(); // Made it available even when the user is not logged in
	if(GM_getValue("loggedIn") != "false")
    {   
		setBottomBreadcrumb();
        setLegendAndSettingsPanel();
        setMyThreadAndRepliedThreads();
        setPopularThreads();
        setSneakPeak();
        setAnnouncementToggleImage();
        setAnnoucementPanel();		
		AddLanguageIcon();
    }    
}

//----------------------------- Site search functionality --------------------------//
function setSiteSearch()
{	
	// var miniLogo = document.createElement('img');	
	// miniLogo.src = 'http://www.thinkdigit.com/images/logobot.gif';
	var searchTD = document.createElement('td');	
	searchTD.setAttribute('align','right');
	searchTD.setAttribute('valign','bottom');
	searchTD.setAttribute('width','25%');
	searchTD.setAttribute('class','vbmenu_control');	
	searchTD.innerHTML='<form method="get" action="http://www.google.com/search"><input id="CustomSearchBox" onfocus="if (this.value == \'NeatDigit Ver 2.7\') {this.value=\'\';}" onblur="if (this.value == \'\') { this.value=\'NeatDigit Ver 2.7\'; }" type="text" style="color:#A4A4A4;" name="q" size="20" maxlength="255" value="NeatDigit Ver 2.7" />&nbsp;<input type="submit" style="background-color:#F2F2F2;border-color:#BDBDBD;border-style:solid;border-width:1px;" value="Search" />&nbsp;<input type="radio" style="display:none" name="sitesearch" value="thinkdigit.com/forum" checked /></form>';	
	for (i=0;i<allAnchor.length;i++)
    {
        if(allAnchor[i].id == "navbar_search") 
        {				
			// allAnchor[i].parentNode.parentNode.appendChild(miniLogo);
			allAnchor[i].parentNode.parentNode.appendChild(searchTD);
        }
    }
}

//---------------------- Setting Legends and Settings -------------------------//

// Method to set the help legend and settings panel on the page
function setLegendAndSettingsPanel()
{    
    // Setting legend   
    var legndTr = document.createElement('tr');
    legndTr.setAttribute('style','width:100%;')        
    var legndTd = document.createElement('td');
    //legndTd.setAttribute('style','font-style: bold')
    // Style legend cell, change the color coded and icon path for the legends from here
    legndTd.innerHTML = '<span style="vertical-align:middle ;color :black; font-weight:normal; background-color:#F2F2F2;border-style: solid;border-width: 1px; border-color:#E8E8E8; padding-left:10px; padding-right:10px; padding-top:1px; padding-bottom:3px;"><b>Legend :</b> Popular Posts &nbsp;[<img style="vertical-align:middle;" src="http://farm4.static.flickr.com/3384/3268774927_63a0b3112a_o.gif"/>]&nbsp;,Subscribed Posts &nbsp;[<img style="vertical-align:middle;" src="http://farm4.static.flickr.com/3419/3271481185_0cee8066ef_o.jpg"></img>], My Thread [<img style="vertical-align:middle;" src="http://farm4.static.flickr.com/3441/3268530313_c50026a248_o.gif"></img>] &nbsp;.</span>';


    // Make the settings label with expand icon following it

    var settingsTD = document.createElement('td');
    var imgSet = document.createElement('img');
    imgSet.src = img_plus;
    imgSet.addEventListener("click", toggleSettingsPanelDisplay, false);
    settingsTD.innerHTML = '<b>Settings</b>&nbsp;';
    settingsTD.appendChild(imgSet);
    if(GM_getValue("legendHelp") != "disabled")
    {
        if(window.location.href != 'http://www.thinkdigit.com/forum/')
        {
            legndTr.appendChild(legndTd);
        }
    }

    legndTr.appendChild(settingsTD);
    strongTag[0].parentNode.appendChild(legndTr);

    // Make the settings panel
    settingsPanelLeft = document.createElement('td');
    settingsPanelLeft.setAttribute('style','background-color:#FAFCFF;border-style: solid;border-width: 1px; border-color:#BAD6FF;padding: 6px; display:none')

    //Set the current functionality variable
    var currentFunctionality = 'none';

    // Add heading of the settings panel
    var tr_heading = document.createElement('tr');
    var td_heading = document.createElement('td');
    td_heading.innerHTML = '<b>Enable/Disable features :</b><br/>';
    tr_heading.appendChild(td_heading);

    var tr_headingRight = document.createElement('tr');

    // Add title for the sneak peek functionality
    var tr_sneak = document.createElement('tr');
    var td_sneak = document.createElement('td');
    td_sneak.innerHTML = 'Sneak Peek &nbsp;';
    td_sneak.setAttribute('title','Enable the \'sneak peek\' feature to add collapsible panels for thread information');
    var td_sneak_img = document.createElement('td');
    var toggleSneakImg = document.createElement('img');
    if(GM_getValue("sneakPeak") == "disabled")
    {
        toggleSneakImg.src = img_unChecked;
    }
    else
    {
        toggleSneakImg.src = img_checked;
    }
    toggleSneakImg.setAttribute('fType','sneakPeak');
    toggleSneakImg.addEventListener("click", setFunctionalityStatus, false);
    td_sneak_img.appendChild(toggleSneakImg);
    tr_sneak.appendChild(td_sneak);
    tr_sneak.appendChild(td_sneak_img);

    // Add title for the tool tip functionality
    var tr_toolTip = document.createElement('tr');
    var td_toolTip = document.createElement('td');
    td_toolTip.innerHTML = 'Show ToolTip on thread URL &nbsp;&nbsp;&nbsp;';
    td_toolTip.setAttribute('title','Enable this to show tooltip for thread titles');
    var td_toolTip_img = document.createElement('td');
    var toggletoolTipImg = document.createElement('img');
    if(GM_getValue("toolTip") == "enabled")
    {
        toggletoolTipImg.src = img_checked;
    }
    else
    {
        toggletoolTipImg.src = img_unChecked;
    }
    toggletoolTipImg.setAttribute('fType','toolTip');
    toggletoolTipImg.addEventListener("click", setFunctionalityStatus, false);
    td_toolTip_img.appendChild(toggletoolTipImg);
    tr_toolTip.appendChild(td_toolTip);
    tr_toolTip.appendChild(td_toolTip_img);

    // Add title for the adBlock functionality
    var tr_adBlock = document.createElement('tr');
    var td_adBlock = document.createElement('td');
    td_adBlock.innerHTML = 'Ad Block &nbsp;';
    td_adBlock.setAttribute('title','Enable this to block Ads on Digit Forum');
    var td_adBlock_img = document.createElement('td');
    var toggleadBlockImg = document.createElement('img');
    if(GM_getValue("adBlock") == "disabled")
    {
        toggleadBlockImg.src = img_unChecked;
    }
    else
    {
        toggleadBlockImg.src = img_checked;
    }
    toggleadBlockImg.setAttribute('fType','adBlock');
    toggleadBlockImg.addEventListener("click", setFunctionalityStatus, false);
    td_adBlock_img.appendChild(toggleadBlockImg);
    tr_adBlock.appendChild(td_adBlock);
    tr_adBlock.appendChild(td_adBlock_img);

    //Add title for  myThread
    var tr_myThread = document.createElement('tr');
    var td_myThread = document.createElement('td');
    td_myThread.innerHTML = 'Mark \'My/Replied Threads\' &nbsp;';
    td_myThread.setAttribute('title','Enable this to mark the threads \'created\' or \'replied\' by you with different background color');
    var td_myThread_img = document.createElement('td');
    var togglemyThreadImg = document.createElement('img');
    if(GM_getValue("myThread") == "disabled")
    {
        togglemyThreadImg.src = img_unChecked;
    }
    else
    {
        togglemyThreadImg.src = img_checked;
    }
    togglemyThreadImg.setAttribute('fType','myThread');
    togglemyThreadImg.addEventListener("click", setFunctionalityStatus, false);
    td_myThread_img.appendChild(togglemyThreadImg);
    tr_myThread.appendChild(td_myThread);
    tr_myThread.appendChild(td_myThread_img);


    //Add title for  myThread
    var tr_legendHelp = document.createElement('tr');
    var td_legendHelp = document.createElement('td');
    td_legendHelp.innerHTML = 'Show Legend &nbsp;';
    td_legendHelp.setAttribute('title','Enable this to place \'legend\' on the pages(excluding forum main page) for quick help with features');
    var td_legendHelp_img = document.createElement('td');
    var togglelegendHelpImg = document.createElement('img');
    if(GM_getValue("legendHelp") == "disabled")
    {
        togglelegendHelpImg.src = img_unChecked;
    }
    else
    {
        togglelegendHelpImg.src = img_checked;
    }
    togglelegendHelpImg.setAttribute('fType','legendHelp');
    togglelegendHelpImg.addEventListener("click", setFunctionalityStatus, false);
    td_legendHelp_img.appendChild(togglelegendHelpImg);
    tr_legendHelp.appendChild(td_legendHelp);
    tr_legendHelp.appendChild(td_legendHelp_img);


    // Add title for popular threads
    var tr_popular = document.createElement('tr');
    var td_popular = document.createElement('td');
    td_popular.innerHTML = 'Mark popular threads &nbsp;';
    td_popular.setAttribute('title','Enabling this will mark the popular threads with \'stars\' icon followed by \'view count\'')
    var td_popular_img = document.createElement('td');
    var togglepopularImg = document.createElement('img');
    if(GM_getValue("popular") == "disabled")
    {
        togglepopularImg.src = img_unChecked;
    }
    else
    {
        togglepopularImg.src = img_checked;
    }
    togglepopularImg.setAttribute('fType','popular');
    togglepopularImg.addEventListener("click", setFunctionalityStatus, false);
    td_popular_img.appendChild(togglepopularImg);
    tr_popular.appendChild(td_popular);
    tr_popular.appendChild(td_popular_img);
    

    // Add title for bottom breadcrumb functionality
    var tr_btmBrdcrumTitle = document.createElement('tr');
    var td_btmBrdcrumTitle = document.createElement('td');
    td_btmBrdcrumTitle.innerHTML = 'Enable enhanced breadcrumb &nbsp;';
    td_btmBrdcrumTitle.setAttribute('title','Enabling this will provide breadcrumb(navigation) bar with thread name link appended at the end. Same breadcrumb will be available at the bottom of the page.')
    var td_btmBrdcrumTitle_img = document.createElement('td');
    var togglebtmBrdcrumTitleImg = document.createElement('img');
    if(GM_getValue("btmBrdcrumTitle") == "disabled")
    {
        togglebtmBrdcrumTitleImg.src = img_unChecked;
    }
    else
    {
        togglebtmBrdcrumTitleImg.src = img_checked;
    }
    togglebtmBrdcrumTitleImg.setAttribute('fType','btmBrdcrumTitle');
    togglebtmBrdcrumTitleImg.addEventListener("click", setFunctionalityStatus, false);
    td_btmBrdcrumTitle_img.appendChild(togglebtmBrdcrumTitleImg);
    tr_btmBrdcrumTitle.appendChild(td_btmBrdcrumTitle);
    tr_btmBrdcrumTitle.appendChild(td_btmBrdcrumTitle_img);

    // Adding the rows into the settings panel
    settingsPanelLeft.appendChild(tr_heading);
    settingsPanelLeft.appendChild(tr_sneak);
    settingsPanelLeft.appendChild(tr_toolTip);
    settingsPanelLeft.appendChild(tr_adBlock);
    settingsPanelLeft.appendChild(tr_headingRight);
    settingsPanelLeft.appendChild(tr_myThread); 
    settingsPanelLeft.appendChild(tr_legendHelp);
    settingsPanelLeft.appendChild(tr_popular);
    //settingsPanelLeft.appendChild(tr_includeEdit);
    settingsPanelLeft.appendChild(tr_btmBrdcrumTitle);
    strongTag[0].parentNode.appendChild(settingsPanelLeft);
    

    // Find userId and generate user url 
    var urlLength = strongTag[1].innerHTML.length;
    userId= strongTag[1].innerHTML.substring(9,urlLength-1);	
    //userUrl =  'window.open(\'member.php?u='+'koolbluez'+'\','+' '+'\'_self\')';

    // Setting dev message below the username 
    //strongTag[1].childNodes[1].innerHTML = strongTag[1].childNodes[1].innerHTML+'<br/><td><span style="font-weight:normal"> NeatDigit (Ver. 2.54) <img src="http://farm4.static.flickr.com/3342/3269765288_5118c0acc9_o.gif"/><span></td>';
}

// function to expand the settings panel
function toggleSettingsPanelDisplay()
{    
    if(this.src == img_plus)
    {
        settingsPanelLeft.style.display = 'block';        
        this.src = img_minus;
    }
    else
    {
        settingsPanelLeft.style.display = 'none';        
        this.src = img_plus;
    }
}

// Functional to set functionality status
function setFunctionalityStatus()
{
    if(this.src == img_checked)
    {
        this.src = img_unChecked;
        GM_setValue(this.getAttribute("fType"), "disabled");           
    }
    else if(this.src == img_unChecked)
    {
        this.src = img_checked;
        GM_setValue(this.getAttribute("fType"), "enabled");        
    }
}


//-----------------------Set bottom breadcrumb ------------------------------------//

// Sets breadcrumb bar at the bottom of page
function setBottomBreadcrumb()
{
    if(GM_getValue("btmBrdcrumTitle") != "disabled")
    {
        //fetching the breadcrumb bar from top and adding the page name and link to it
        var breadCrumbTd = document.createElement('td');
        for (s=0;s<spanTag.length;s++) 
        {
            if(spanTag[s].getAttribute("class")=='navbar')
            {
                //create anchor tag which will contain the thread url and name 
                var threadNameLink = document.createElement('a');
                threadNameLink.innerHTML= '<b>'+strongTag[0].innerHTML+'</b>';
                threadNameLink.href = window.location.href;        
                
                // Create span tag to contain the anchor tag and hve the same class as other navigation span tags
                var threadNameSpan = document.createElement('span');
                threadNameSpan.setAttribute("class","navbar");
                threadNameSpan.innerHTML = '>';
                threadNameSpan.appendChild(threadNameLink);
                breadCrumbTd = spanTag[s].parentNode;
                breadCrumbTd.appendChild(threadNameSpan);        
                break;
            }
            
        }
        
        // create new bottom breadcrumb td
        var btmBreadCrumb = document.createElement('td');
        btmBreadCrumb.innerHTML = breadCrumbTd.innerHTML; 
        
        if(window.location.href.substring(0,46) == 'http://www.thinkdigit.com/forum/showthread.php')
        { 
            // Attach the breadcrumb bar below quick reply
            for (a=0;a<oTd.length;a++) 
            {
                if(oTd[a].getAttribute("class")=='panelsurround')
                {
                    if(breadCrumbTd != null)
                    {                               
                        oTd[a].appendChild(btmBreadCrumb);
                    }
                    break;
                }
            }
        }
        else // Add breadcrumb at the bottom of the page
        {
            for (z=0;z<allDivtags.length;z++) 
            {        
                if(allDivtags[z].getAttribute("class")=='smallfont')
                {
                    if(allDivtags[z].innerHTML.substring(0,13) == 'All times are')
                    {
                        var btmBrdcrumTr = document.createElement('div');                    
                        btmBrdcrumTr.appendChild(btmBreadCrumb);  
                        btmBrdcrumTr.setAttribute("align","middle");                  
                        allDivtags[z].parentNode.insertBefore(btmBrdcrumTr,allDivtags[z])                    
                        break;
                    }
                }
            }
        }
    }
}


//---------------------- Setting My thread and replied threads -------------------------//

// Method to set My thread and replied threads functionality
function setMyThreadAndRepliedThreads()
{    
    if(GM_getValue("myThread") != "disabled")
    {        
		// style thread for which user has(ever) made reply in forum
        var imgTag = document.getElementsByClassName('inlineimg');		
        for (m=0;m<imgTag.length;m++) 
        {    
            if(imgTag[m].getAttribute("src")=='images/misc/subscribed.gif')
            {
                // Set background color for the thread for which the user has ever mage a reply
                // change the color code to change the background color
                imgTag[m].parentNode.parentNode.parentNode.setAttribute('style','background-color:#F7FFF2');
                
                // Change the url to change the image for subscribed thread
                imgTag[m].setAttribute('src','http://farm4.static.flickr.com/3490/3268436747_06a7ffe0eb_o.gif');         
            }
        }

        // Style the elements on left side for threads started by current user        
        for (k=0;k<spanTag.length;k++) 
        {				
			if(spanTag[k].innerHTML==userId)
            {		
                // Color the left cell of the thread started by the logged in user
                spanTag[k].parentNode.parentNode.setAttribute('style','background-color:#F7FFF2');
                
                //Change text to 'My thread' for the current logged in user
                spanTag[k].setAttribute('style','cursor: pointer;font-weight:bold');        
                spanTag[k].innerHTML = 'My Thread';            
                
                // Set background color for the thread started by the current logged in user.
                spanTag[k].parentNode.parentNode.parentNode.childNodes[3].setAttribute('style','background-color:#F7FFF2;');
                //Set the My thread smily icon				
                spanTag[k].parentNode.parentNode.parentNode.childNodes[3].childNodes[0].setAttribute('src','http://farm4.static.flickr.com/3441/3268530313_c50026a248_o.gif');
            }
        }
    }
}

//---------------------- Setting Popular threads -------------------------//

// Method to set popular threads
function setPopularThreads()
{    
    if(GM_getValue("popular") != "disabled")
    {
        //Mark the popular threads
        var trTag = document.getElementsByTagName("tr");
        for (i=0;i<trTag.length;i++)
        {
            if(trTag[i].childNodes.length == 13 || trTag[i].childNodes.length == 15) 
            {
                // Get the visit count of respective post
                var postCount = trTag[i].childNodes[11].innerHTML.replace(",", "");
                
                // If the view count is more than 10000 mark the thread as popular, 
                // change the value here if you want so set some other threshold
                
                if(parseInt(postCount) > 10000)
                {
                    var elemSpan = document.createElement('span');
                    elemSpan.innerHTML = '('+postCount+' views)';
                    var popularImage = document.createElement('img');
                    
                    // Set the image icon to denote popular posts 
                    popularImage.setAttribute('src','http://farm4.static.flickr.com/3384/3268774927_63a0b3112a_o.gif');
                    popularImage.setAttribute('style','valign:bottom');
                    elemSpan.setAttribute('style','color:red; font-style: italic');            
                    trTag[i].childNodes[5].childNodes[1].appendChild(popularImage);
                    trTag[i].childNodes[5].childNodes[1].appendChild(elemSpan);
                }
            }
        }
    }
}

//---------------------- Setting Sneak Peek Functionality -------------------------//

// Method to set the sneak peak functionality
function setSneakPeak()
{    
    if(GM_getValue("sneakPeak") != "disabled")
    {
        //creating Collapsible panel
        if(window.location.href != 'http://www.thinkdigit.com/forum/usercp.php')
        {
            var tdAlt = document.getElementsByTagName("td");
            for (t=0;t<tdAlt.length;t++)
            {
                if(tdAlt[t].getAttribute("id") != null)
                {
                    if(tdAlt[t].getAttribute("id").substring(0,14)== 'td_threadtitle')
                    {
                        var collapseImage = document.createElement('img');                
                        collapseImage.setAttribute('collapseImg','');
                        collapseImage.addEventListener("click", togglePannelStatus, false);       
                        var sneakTd = document.createElement('td');
                        sneakTd.setAttribute('sneak','sneakPanel');
                        sneakTd.setAttribute('style','display:none; width:85%; font-style: bold; background-color:#FAFCFF;border-style: dashed;border-width: 1px; border-color:#BAD6FF; color:#5775A3')//#7D7D7D
                        if(GM_getValue("collapsed") == "false")
                        {                    
                            sneakTd.style.display = 'block';
                            collapseImage.setAttribute('src',img_minus);
                        }
                        else
                        {
                            sneakTd.style.display = 'none';
                            collapseImage.setAttribute('src',img_plus);   
                        }
                        sneakTd.innerHTML = tdAlt[t].getAttribute("title");
                        if(GM_getValue("toolTip") != "enabled")
                        {
                            tdAlt[t].removeAttribute("title");
                        }
                        tdAlt[t].appendChild(sneakTd);            
                        tdAlt[t].childNodes[3].appendChild(collapseImage);            
                    }
                }    
            }
        }

        // Add collapse All and expand all sneak peak button
        var allTdColSpan = document.evaluate('//td[@colspan]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for(i=0; i<allTdColSpan.snapshotLength;i++)
        {
            if(allTdColSpan.snapshotItem(i).innerHTML == '&nbsp;')
            {
                allTdColSpan.snapshotItem(i).innerHTML = '&nbsp; All &nbsp;';
                var AllToggleImage = document.createElement('img');        
                if(GM_getValue("collapsed") == "false")
                {
                    AllToggleImage.setAttribute('src',img_minus);           
                }
                else
                {
                    AllToggleImage.setAttribute('src',img_plus);             
                }
                AllToggleImage.addEventListener("click", toggleAll, false); 
                allTdColSpan.snapshotItem(i).appendChild(AllToggleImage);
            }
        }    
    }
}

// Toggles sneak peak panel for a thread
function togglePannelStatus()
{
    var expand = (this.parentNode.nextSibling.nextSibling.style.display=="none");
    this.parentNode.nextSibling.nextSibling.style.display = (expand ? "block" : "none");   
    this.src = expand ? img_minus : img_plus;
}

// Function to toggle all the sneak peak td's
function toggleAll()
{   
    var allSneakTd = document.evaluate('//td[@sneak]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var allCollapseImg = document.evaluate('//img[@collapseImg]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(this.src == img_minus)
    {   
        for(l=0; l<allSneakTd.snapshotLength;l++)
        {
            allSneakTd.snapshotItem(l).style.display='none';
            this.src = img_plus;
            for(m=0; m<allCollapseImg.snapshotLength;m++)
            {
                allCollapseImg.snapshotItem(m).src=img_plus;                
            }
            GM_setValue("collapsed", "true");
        }
    }
    else
    {
        for(l=0; l<allSneakTd.snapshotLength;l++)
        {
            allSneakTd.snapshotItem(l).style.display ='block';
            this.src = img_minus;
            for(m=0; m<allCollapseImg.snapshotLength;m++)
            {
                allCollapseImg.snapshotItem(m).src=img_minus;
            }
            GM_setValue("collapsed", "false");
        }
    }
}


//---------------------- Setting Announcement Panel -------------------------//


// Sets the announcement toggle image to collapse/expand the announcement panel
function setAnnouncementToggleImage()
{    
    for(s=0;s<strongTag.length;s++)
    {
        if(strongTag[s].innerHTML=='Search:')
        {        
            var announcementToggleImg = document.createElement('img');                
            announcementToggleImg.setAttribute('announceImg','');            
            if(GM_getValue("announceExpand") != "false")
            {
                announcementToggleImg.src = img_plus;                
            }
            else
            {
                announcementToggleImg.src = img_minus;
            }
            //announcementSpan.innerHtml = 'Collapsed';
            announcementToggleImg.addEventListener("click", toggleAnnouncement, false);            
            strongTag[s].parentNode.parentNode.appendChild(announcementSpan);
            strongTag[s].parentNode.parentNode.appendChild(announcementToggleImg);
        }
    }
}

// Toggles image for announcement panel collapse and sets values to store last status
function toggleAnnouncement()
{      
    var result = (this.src==img_plus);
    this.src = result ? img_minus : img_plus;
    if(result)
    {
        GM_setValue("announceExpand","false");
    }
    else
    {
        GM_setValue("announceExpand","true");
    }
    setAnnoucementPanel();
}

// Sets the display status of the announcement panel
function setAnnoucementPanel()
{
    if(window.location.href.substring(0,42) == 'http://www.thinkdigit.com/forum/search.php')
    {        
        //GM_setValue("latestAnnouncement","jgf");
        var allImg = document.evaluate('//img[@title]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        var isFirstAnnouncement = true;
        var dontSetNewAnnouncement = true;
        for(i=0; i<allImg.snapshotLength;i++)
        {        
            if(allImg.snapshotItem(i).title == 'Announcement')
            {        
                if(allImg.snapshotItem(i).parentNode.parentNode.parentNode != null)
                {            
                    if(GM_getValue("announceExpand") != "false")
                    {
                        allImg.snapshotItem(i).parentNode.parentNode.style.display ='none';
                        if(dontSetNewAnnouncement)
                        {
                            announcementSpan.innerHTML = '&nbsp; | &nbsp; <b>Expand Announcements</b>&nbsp;';
                        }
                    }
                    else
                    {
                        allImg.snapshotItem(i).parentNode.parentNode.style.display ='';                    
                        if(dontSetNewAnnouncement)
                        {
                            announcementSpan.innerHTML = '&nbsp; | &nbsp; <b>Collapse Announcements</b>&nbsp;';
                        }
                    }
                    if(isFirstAnnouncement)
                    {
                        var currentAnnouncementTr = allImg.snapshotItem(i).parentNode.parentNode; 
                        var allChildLinks = document.evaluate('.//a[@href]',currentAnnouncementTr,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);                                        
                        for(j=0; j<allChildLinks.snapshotLength;j++)
                        {   
                            if(allChildLinks.snapshotItem(j).href.substring(0,48) == 'http://www.thinkdigit.com/forum/announcement.php')
                            {                            
                                if(GM_getValue("latestAnnouncement") != allChildLinks.snapshotItem(j).href)
                                {
                                    GM_setValue("latestAnnouncement",allChildLinks.snapshotItem(j).href);
                                    allImg.snapshotItem(i).parentNode.parentNode.style.display ='';
                                    announcementSpan.innerHTML = '&nbsp; | &nbsp; <span style="vertical-align:middle ;color :#FFFFFF; font-weight:bold;border-style: solid;border-width: 1px; border-color:#FFFFFF;padding-left:6px; padding-right:6px; padding-top:.2px; padding-bottom:.4px;"> New Announcements </span>&nbsp;';                                    
                                    dontSetNewAnnouncement = false;
                                }
                            }                        
                        }                    
                        isFirstAnnouncement= false;
                    }
                }
            }
        }
        if(!dontSetNewAnnouncement)
        {
            GM_setValue("announceExpand","false");
        }
    }   
}

//  Add language button to all posts
function AddLanguageIcon()
{
	for (z=0;z<allDivtags.length;z++) 
            {        
                if(allDivtags[z].id.substring(0,13)=='post_message_')
                {   
                        
						// Create language switch icon						
						var langIcon = document.createElement('img');
                        langIcon.src =   img_hindi;
						langIcon.setAttribute("divId",allDivtags[z].id);
						langIcon.setAttribute("divContent",allDivtags[z].innerHTML);
						langIcon.addEventListener("click", TranslatePost, false);						
						allDivtags[z].parentNode.childNodes[5].appendChild(langIcon);
                }
            }
}


// Translator function using Google service
function TranslatePost()
{	
	var postDiv = document.getElementById(this.getAttribute("divId"));
	if(this.src == img_hindi)
	{
		this.src=img_english;
		var fromLang, toLang;
		fromLang = "en";
		toLang = "hi";		
		var divText = this.getAttribute("divContent");
		divText = divText+'<img title="trans" alt="" src=""/>';
		var divText2 = divText; 
		
		// Parse text
		var textToSend =  new Array();
		var textToMerge =  new Array();
		var textIndex = 0;
		var sendString='';
		var simpleString = false;

		if(divText.indexOf('>')!=-1)
		{		    
		    //alert('divText:'+divText);
			do
			{				
				divText = divText2;				
				textToSend[textIndex] = divText.substring(0,divText.indexOf('<'));	
				textToMerge[textIndex] = divText.substring(divText.indexOf('<'),divText.indexOf('>')+1);									
				divText2 = divText.substring(divText.indexOf('>')+1,divText2.length);
				//alert('textToSend:'+textToSend[textIndex]+'textToMerge:'+textToMerge[textIndex]+'divText2:'+divText2);
				textIndex=textIndex+1;
				//alert(divText.lastIndexOf('>') +','+ divText.indexOf('>'));
			}
			while(divText.lastIndexOf('>') > divText.indexOf('>'))			
			
			for(i=0;i<textToSend.length;i++)
		    {
		        sendString = sendString+textToSend[i]+'|';		        
		    }	
		}
		else
		{
		    sendString = divText;
		    simpleString = true;
		}
		
		
		// Use google service
		if (fromLang == 'auto'){fromLang = '';}
		var postData = "v=1.0&q=" + sendString + "&langpair=" + fromLang + "%7C" + toLang;
		var googleapitranslatquery = "http://ajax.googleapis.com/ajax/services/language/translate";	
		GM_xmlhttpRequest({
			method: 'POST',		
			data: postData,
			url: googleapitranslatquery,
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			onload: function(resp) {			
				try
				{	
					translation = resp.responseText.match(/\"translatedText\"\:\"(.*?)\"/)[1];
					translation = translation.replace(/\\u0026/g,'&');
					translation = translation.replace(/\\u003c/g,'<');
					translation = translation.replace(/\\u003e/g,'>');
                    
					if(!simpleString)
					{
					    textToSend = translation.split('|');					
					    translation = '';
					    for(m=0;m<textToSend.length-1;m++)
					    {
					       translation = translation + textToSend[m]+textToMerge[m];
					    }
					}					
					postDiv.innerHTML = translation;				
					
				}
				catch(e)
				{				
					postDiv.innerHTML="<strong>Error</strong> : Translation failed";
				}
			}
		});	
	}
	else
	{
		this.src = img_hindi;		
		postDiv.innerHTML = this.getAttribute("divContent");	
		
	}	
	
}