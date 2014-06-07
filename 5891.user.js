// ==UserScript==
// @name          E-zekiel Management Console UI Fixer
// @namespace     http://E-zekiel/ConsoleUIFixer
// @description   Adds "Edit this Page" feature, makes the SiteManger quick-nav menu right-clickable, replaces worthless page search mechanism with filter-as-you-type, removes page save warning, and some others. Works with release 2.3
// @include       http://209.61.148.165/console/*
// @include       https://secure.websrvcs.com/console/*
// ==/UserScript==



/*

  Author: MCE
  
  Uncollapses all SiteManager pages, makes manager menu right-clickable, and remove page save warning. Uses "unsafeWindow" feature of GreaseMonkey.
  
  Version: 1.4 (Nov 23, 2008)
    1.0 - First Release, works with e-Zekiel release 2.2.
    1.1 - Second Release, works with e-Zekiel release 2.3.
	1.2 - More usability tweaks. Added Dynasearch.
    1.3 - Added the EditThisPage functionality to enable a simple link click to go to directly edit a page, events, eventlist, or directory.
    1.4 - Fixed some broken functionality due to some Ezekiel changes. Works with e-Zekiel release 2.6?
 
   Improvements Needed:
   * Show all images in FCK Image browser.
   * Complete menu code.

*/



(function() {

    //configuration settings
    var ElementIDWhereToPlaceEditPageLink = "left-column-content"; //this element should exist and defines where the Edit Page link goes.

    //variables
	var DynaSearchTimeOutID;
    var SiteManagerRootURL = GM_getValue("Ezekiel_SiteManagerRoot");

	//fire events after render	
    AddLoad(RemovePageSaveWarning);
	AddLoad(RenameSiteManagerPage);	
	AddLoad(SiteManagerPageIDLinkTextSwitcheroo);	
	AddLoad(EnhanceQuickJumpManagerMenu);
	AddLoad(DynaSearch);
    AddLoad(SetAdminURL);
    AddLoad(EditThisPage);
    
	//AddLoad(ExpandSiteManagerLinks);	
	
    function SetAdminURL()
    {
        var root = "";
        if (window.location.href.indexOf("/console/admin.asp")>0)
		{
            root = "https://secure.websrvcs.com";
            if (window.location.href.indexOf(root)>0)
            {   
                //we already set it to the SSL
            }
            else
            {
                //assume the IP
                root = "http://209.61.148.165";                
            }
            GM_setValue("Ezekiel_SiteManagerRoot", root);
            SiteManagerRootURL = root
        }
    }
	
	//Dynasearch add a keystroke handler to the search box that make the SiteManager PageSearch dynmically filter the results
	function DynaSearch()
	{	
		if (window.location.href.indexOf("SiteManager.asp")>0)
		{
			document.getElementById("recordID").addEventListener(
			'keypress', 
			WaitToDynaSearch,
			true);
			
			window.setTimeout(function(){document.getElementById("recordID").focus()},100);
		}		
	}
	
	function WaitToDynaSearch()
	{
		if (DynaSearchTimeOutID) window.clearTimeout(DynaSearchTimeOutID);
		DynaSearchTimeOutID = window.setTimeout(DoDynaSearch,400);		
	}
	
	function DoDynaSearch()
	{
		var searchString = document.getElementById("recordID").value.toString().toLowerCase(); //breaks with "

		var els = GetSetOfElementsOnlyOnCertainPage("SiteManager.asp",'//tr[td/span//a[contains(@href,"PageManager.asp")]]');
		if (!els) return;		
		//GM_log(els.snapshotLength);		
		//hide everything
		for (var z = 0; z < els.snapshotLength; z++)            
		{
			var el = els.snapshotItem(z);
			var cl = unsafeWindow.GetClass(el);
			if (cl=="0" || cl=="head") continue;
			el.style.display = "none";
		}

		//show matching anchor text and spans
		var els = GetSetOfElementsOnlyOnCertainPage("SiteManager.asp",'//tr[td/span//a[contains( translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")   ,"' + searchString + '")] or td/span//span[contains( text()   ,"' + searchString + '")]]');
		if (!els) return;		
		//GM_log(els.snapshotLength);		
		for (var z = 0; z < els.snapshotLength; z++)            
		{
			var el = els.snapshotItem(z);
			el.style.display = "table-row";
		}
		
	}

    //Reformats the SiteManager Links in a more usable format
    function SiteManagerPageIDLinkTextSwitcheroo()
    {
		var els = GetSetOfElementsOnlyOnCertainPage("SiteManager.asp",'//a[contains(@href,"PageManager.asp")]/text()');
		if (!els) return;

		//shrink the spacing
		//addGlobalStyle('.listGrid td, .optionBox td { padding:1px 5px 0px 0px ! important; }');

		//loop throught the els and do the switcheroo.
		for (var z = 0; z < els.snapshotLength; z++)            
		{
			var el = els.snapshotItem(z);
			var t = el.data.toString();
			var p = t.indexOf(')');
			var par = el.parentNode;            
			el.data = t.substr(p+1,500);
			el = document.getElementById(el.id);
			var f = document.createElement("span");
			f.innerHTML = "" + t.substr(0,p+1);
			f.style.fontSize = "xx-small";
			f.style.color = "#BDBDBD";
			f.style.paddingLeft = "10px";
			par.parentNode.insertBefore(f, par.nextSibling);
		}   
	}


	function RenameSiteManagerPage()
	{
		if (window.location.href.indexOf("PageManager.asp")>0)
		{

			//rename pagetitle so we can see in tabs.
			var f = window.document.forms[0];
			var pt = f[0].value.toString().trim(); //["PageTitle"].value.toString();
			if (pt.length > 0)
			{
				window.document.title = "SMgr: " + pt;
			}
		}
	}
	

	//opens all collapsed page links on the SiteManager page..no longer needed in 2.3
	function ExpandSiteManagerLinks()
	{
		//if (!IsExpandSiteManagerLinks()) return;
		/*
		var els = GetSetOfElementsOnlyOnCertainPage("SiteManager.asp",'//a[contains(@href,"Toggle")]');
		if (!els) return;
		
		for (var z = 0; z < els.snapshotLength; z++)            
		{
			var el;
			var href;
			el = els.snapshotItem(z);
			href = el.href.toString();              							
			href = href.replace("javascript:TogglePages\(",""); 
			href = href.replace("\);","");
			
			var tr = el.parentNode.parentNode;
			tr.style.display = "block";
			//tr.parentNode.parentNode.style.display="block";
			//unsafeWindow.TogglePages(href);
		}
		*/
	}

	//Makes manager menu items right-clickable	
	function EnhanceQuickJumpManagerMenu()	
	{
		//if (!IsEnhanceQuickJumpManagerMenu()) return;

		//find the manager menu
		var mm = document.getElementById("managerMenu");
        
        if (!mm) return;
        
		var re = new RegExp("^.*'(.*)'.*$");
		var els = mm.getElementsByTagName("a");
		//GM_log(els.length);
		for (var i = 0; i < els.length; i++)
		{		
			var el = els[i];
			var href = el.href.toString();
			var matches = re.exec(href);
			if (matches.length>1)			
			{				
				el.href = matches[1];				
			}
		}

		//make page title, next to site manager dropdown clickable to back to previous parent menu
		var exitButtonAnchor = document.getElementById("BtnExit");
		matches = re.exec(exitButtonAnchor.href.toString());
		if (matches)
		{
			var exitURL = "/console/" + matches[1];
		}
		else
		{
			exitURL = "admin.asp";
		}
        var pt = document.getElementById("pageTitle");
        if(pt)
        {
            var span = pt.childNodes[0];
            a = document.createElement("a");
            a.href = exitURL;
            a.innerHTML = span.innerHTML;
            span.innerHTML = "";
            span.appendChild(a);		
		}
	}

	//replace the exit manager
	function RemovePageSaveWarning()
	{		
		//if (!IsRemovePageSaveWarning()) return;

		unsafeWindow.exitManager = function(exitPage)
		{
			var loc = document.location + "";
			if (exitPage == null) { exitPage = "admin.asp"; }
			unsafeWindow.win_close(); //-- Close all registered windows.
			if (loc.indexOf("admin.asp") != -1)
			{
				self.close();
			}
			else
			{
				unsafeWindow.document.location = exitPage;
			}
		}
	}
    
    //add an EDIT PAGE link to your site so you can quickly edit it
    function EditThisPage()
    {
        var loc = window.location.href;
        if (loc.indexOf("System/details.asp")>0 || loc.indexOf("System/default.asp")>0)
		{
        
            addGlobalStyle(".EditPageButton { position: absolute: z-index: 10; text-align:left; font-weight:bold; } .EditPageButton a {background-repeat: no-repeat; background-position: 0px 0px; padding-left: 20px;  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJeSURBVDjLpZNLSNRRFIe/O81o+WjISM0epuarEHuDqIFEDyoqEFtFD4gWQVDQoo0QhFARbowKNNpKi0DJRYVGqRmY5oPUBs3S1GnMcdR0/v8Z554WM44RGURne7nf+X6cc5SI8D9lBTh79/0VIBkoAHaCCIJCCxaLwqJAa40O4LFZpT9z/cpdaOFqcZZCRDhT0V4p/1i3HveIiAQNgEKAh83usNrfgp3Pj6NvyGOGI6AlceExPT4SAKX+/PnjNxMAr+GPCANEJGqhq8NlLtk53myk0FlN/0QO19a+Ul33Lp4OArRYF9SWqrmxWqb7WliRcwp7ynY8g5n0Pa+6vQBQACXX6zG0RgvU3djP4OhUMI7nBXZ6iEvPxz3QS4TyEbsykZjVG+0hgAbgu9fPvm1J1LWNhDtH+1qxSRf21IOYY9VERCm+dPQxPatQvolcS8gAgBkjgF+EOXM+OImpZmw/GrCnHcYYrUTZJrHFxBItbh4N5bH70hOHBUCFDEzTj9cfIGD4cfbWEjX7GvvmYxgj97HY/PimN+Fq7GTNgTKchh2AoMEvUxeBnKgOPF+bid96BJ+zimURgjmdzHhTO6qonOUJ2YjMLwL0vA4ThluqKT0UwBdIYqy7Ao3BrHsdrre9qKJyVHQCodgSBgS0/gzQ/eAExWntbCm4QORwE46aZjqeuXG87GTD8TukZmSRkmQPmcrk4iYGdE1JaUOGiOTlulyrfB+ekpJbyNT4BANtDupjLzNe9g6R1lBIPQOWXgD1+zmf3Bvn3ZGaYN2TnYLYzDde1/i5oze7Pi21YD8BVSdMJ0n4cQkAAAAASUVORK5CYII%3D) }");
        
            var SITEID = gup("id");        
            var editURL = "";
            var PID = gup("PID");
            var PG = gup("PG").toLowerCase();
            var CID = gup("CID");
            var RecordID = "";
            var LinkTitle = "Edit This Page";
            if (PID!="")
            {  
                editURL = SiteManagerRootURL + "/console/PageManager.asp?id=" + SITEID + "&PID=" + PID + "&func=update";
            }
            if (PG=="events")
            {
                if (CID!="")
                {
                    editURL = SiteManagerRootURL + "/console/EventManager.asp";
                    RecordID = CID;
                    LinkTitle = "Edit This Event";
                }
                else
                {
                    editURL = SiteManagerRootURL + "/console/EventManager.asp";
                    LinkTitle = "Edit Events";
                }
            }
            if (PG=="directory")
            {
                editURL = SiteManagerRootURL + "/console/UserManager.asp";
                LinkTitle = "Edit Directory";
            }
            if (SITEID!="" && loc.indexOf("System/default.asp")>0)
            {
                editURL = SiteManagerRootURL + "/console/PageManagerHome.asp";
            }            
            
            if (editURL=="") return; //bailout, we can't find an editable URL;
            
            var tackOnHere = document.getElementById(ElementIDWhereToPlaceEditPageLink);
            var mess = "";
            if (!tackOnHere)
            {
                tackOnHere = document.getElementById("copyright");
                mess = " - (Couldn't find location to place Edit Page Link)";
            }
            var div = document.createElement("div");
            var anc = document.createElement("a");
            anc.href = "#";
            anc.innerHTML = LinkTitle + mess;
            div.appendChild(anc);
            div.className = "EditPageButton";
            anc.addEventListener(
            'click', 
            //create a function that opens the page editor in a new tab
            function()
            {
                var frm = document.getElementById("EditForm");
                if (frm)
                {
                    frm.action = editURL;
                }
                else
                {
                    var frm = document.createElement("FORM");
                    frm.id = "EditForm";
                    frm.action = editURL;
                    frm.method = "POST";
                    if (RecordID!="")
                    {
                        var hidVal = document.createElement("INPUT");
                        hidVal.type = "hidden";
                        hidVal.name = "RecordID";
                        hidVal.value = RecordID;
                        frm.appendChild(hidVal);
                        
                        hidVal = document.createElement("INPUT");
                        hidVal.type = "hidden";
                        hidVal.name = "func";
                        hidVal.value = "update";
                        frm.appendChild(hidVal);
                    }
                    frm.target = "_blank";
                    tackOnHere.appendChild(frm);
                }
                
                if(SiteManagerRootURL == null || SiteManagerRootURL=="")
                {
                    alert("Oops! It appears as if you haven't logged into the administration system yet.\n\nLogin and then you will be able to use the 'Edit Page' functionality. Note that before using the 'Edit Page' feature in the future, you should always login first within the same browsing session. Note that once you login, you'll probably never see this reminder again.\n\nNote that if you've just logged in, you'll have to refresh this page.");
                }
                else
                {                        
                    frm.submit();
                }
            }            
            ,
            true);
            
            tackOnHere.insertBefore(div, tackOnHere.firstChild);
            
			
		}	
    }
    
    /*********************************************************************************
    BEGIN UTILITY FUNCTIONS
    **********************************************************************************/

	//used to add page load events
	function AddLoad(func)
	{
		window.addEventListener(
		'load', 
		func,
		true);
	}

	//trim function
	String.prototype.trim = function() {
	// skip leading and trailing whitespace
	// and return everything in between
	var x=this;
	x=x.replace(/^\s*(.*)/, "$1");
	x=x.replace(/(.*?)\s*$/, "$1");
	return x;
	}

	//adds something to the stylesheets
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	//gets a set of elements when the current page is a certain URL
	function GetSetOfElementsOnlyOnCertainPage(pageURL,elementXPathSelector)
	{
		if (window.location.href.indexOf(pageURL)>0)
				return document.evaluate(elementXPathSelector, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			{
			}
		return null;
	}

    //Parses a parameter from a querystring-likes string and returns the value
    function ParseLikeQueryString(queryString, qsParam)
    {
        var regexS = "(^|[\\?&])+"+qsParam+"=([^&#]*)";
        var regex = new RegExp( regexS, "i" );
        var tmpURL = queryString;
        var results = regex.exec( tmpURL );
        if( results == null )
            return "";
        else
            return results[2];
    }

    //Parses a parameter from the URL querystring based on name and returns the value
    function gup(qsParam)
    {
        return ParseLikeQueryString(window.location.href,qsParam);
    }



	/*

	The beginning of menu code. Didn't finish it.

	InitMenus();

	function InitMenus()
	{	
		if (window != window.top) return;
		GM_registerMenuCommand("--- Changing Settings Reloads Page ---",DoNothing);
		AddMenu("Hide Page Save Warnings",TogglePageSaveWarning, IsRemovePageSaveWarning());
		AddMenu("Expand Site Manager Links Automatically",ToggleExpandSiteManagerLinks, IsExpandSiteManagerLinks());
		AddMenu("Enhanced Quick Jump Manager Menu",ToggleExpandSiteManagerLinks, IsEnhanceQuickJumpManagerMenu());
	}

	function DoNothing()
	{

	}

	function WarnReload()
	{
		window.location.reload();
	}

	function AddMenu(featureName, callback, currentState)
	{
		GM_registerMenuCommand(featureName + ": " + (currentState ? "On" : "Off"),callback);
	}

	function TogglePageSaveWarning()
	{
		GM_setValue("IsRemovePageSaveWarning",!IsRemovePageSaveWarning());	
		WarnReload();
	}

	function ToggleExpandSiteManagerLinks()
	{
		GM_setValue("IsExpandSiteManagerLinks",!IsExpandSiteManagerLinks());	
		WarnReload();
	}

	function ToggleEnhanceQuickJumpManagerMenu()
	{
		GM_setValue("IsEnhanceQuickJumpManagerMenu",!IsEnhanceQuickJumpManagerMenu());	
		WarnReload();
	}

	//checks settings;
	function IsRemovePageSaveWarning() {return GM_getValue("IsRemovePageSaveWarning",true); }	
	function IsExpandSiteManagerLinks() {return GM_getValue("IsExpandSiteManagerLinks",true);	}	
	function IsEnhanceQuickJumpManagerMenu() {return GM_getValue("IsEnhanceQuickJumpManagerMenu",true);}	

	*/

})
();