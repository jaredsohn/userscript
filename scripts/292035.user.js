// ==UserScript==
// @name        WME Fancy permalink
// @namespace   http://userscripts.org/users/548866
// @description Removes #, and gives several formats
// @include     https://www.waze.com/editor/*
// @include     https://www.waze.com/*/editor/*
// @include     https://editor-beta.waze.com/*
// @updateURL   http://userscripts.org/scripts/source/292035.meta.js
// @version     1.10
// @grant       none
// ==/UserScript==

/* helper function */
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}


function getId(node) {
  return document.getElementById(node);
}

function log(msg, obj)
{
  	console.log("WME Fancy Permalink - " + msg);
    if (obj!=null)
        console.dir(obj);
}

function bootstrapFP()
{
  var bGreasemonkeyServiceDefined = false;

  try {
    bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
  }
    catch (err) {  }

  if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
      var dummyElem = document.createElement('p');
      dummyElem.setAttribute('onclick', 'return window;');
      return dummyElem.onclick();
    }) ();
  }

  /* begin running the code! */
    log("bootstrap finished");
  setTimeout(initialiseFP, 500);
}

function initialiseFP()
{
    //   fp_W
   fp_W = unsafeWindow.W;
   if(typeof(fp_W) == "undefined"){
      log('W NOK');
      window.setTimeout(initialiseFP, 500);
      return;
   }
   //   Waze model
   wazeModel = unsafeWindow.Waze.model;
   if(typeof(wazeModel) == 'undefined'){
      log('Waze.model NOK');
      window.setTimeout(initialiseFP, 500);
      return;
   }
   log('Waze.model OK');
   //   loginManager
   loginManager = unsafeWindow.W.app;
   if(typeof(loginManager) == "undefined"){
      log('W.app NOK');
      window.setTimeout(initialiseFP, 500);
      return;
   }
   loginManager = unsafeWindow.W.app.loginManager;
   if(typeof(loginManager) == "undefined"){
      log('W.app.loginManager NOK');
      window.setTimeout(initialiseFP, 500);
      return;
   }
   log('WME_FP : W.app.loginManager OK');
   //   selectionManager
   selectionManager = unsafeWindow.W.geometryEditing;
   if(typeof(selectionManager) == "undefined"){
      log('W.geometryEditing NOK');
      window.setTimeout(initialiseFP, 500);
      return;
   }
   log('W.geometryEditing OK');
   selectionManager = unsafeWindow.W.geometryEditing.selectionManager;
   if(typeof(selectionManager) == "undefined"){
      log('W.geometryEditing.selectionManager NOK');
      window.setTimeout(initialiseFP, 500);
      return;
   }
   log('W.geometryEditing.selectionManager OK');
    
    var wmefplinks = getId("WMEFP-links");
    
   
    if (wmefplinks!=null)
        return;
    
    var mapFooter = getElementsByClassName("WazeControlPermalink");
    if (mapFooter.length==0)
    {
        log("error: can't find permalink container");
        setTimeout(initialiseFP, 1000);
        return;
    }
    
    divPerma=mapFooter[0];
    divPerma.firstElementChild.style.display="none";
    
    nodeWMEFP = document.createElement('div');
    nodeWMEFP.id = 'WMEFP-links';
    nodeWMEFP.className = 'WazeControlPermalink';
    divPerma.parentNode.insertBefore(nodeWMEFP, divPerma.nextSibling);
    
    curLink="";

    log("init done.");
    window.setInterval(update,250);
}

function getForumUserIdFromID(wmeUserID)
{
    var userName=wazeModel.users.get(wmeUserID);
	return (getForumUserIdFromName(userName.userName));
}

function getForumUserIdFromName(userName)
{
    var forumID=-1;
    var forumIDs=new Array();
    
    if (userName.indexOf('/')!=-1)
    {
        var userNames=userName.split('/');
        for (var i=0; i<userNames.length; i++)
        {
        	forumID=getForumUserIdFromName(userNames[i]);
            forumIDs[i]=forumID[0];
        }
        return forumIDs;
    }
    
    var xhr3_object;
	if(window.XMLHttpRequest) // Firefox 
		xhr3_object = new XMLHttpRequest(); 
    else if(window.ActiveXObject) // Internet Explorer 
        xhr3_object = new ActiveXObject("Microsoft.XMLHTTP"); 
        
    log("looking for " + userName + " in the forum.");

    xhr3_object.open("GET", "https://www.waze.com/forum/memberlist.php?username=" + userName, false); 
    
    xhr3_object.onreadystatechange = function() { 
        
        if(xhr3_object.readyState == 4) 
        {
            
            var test = xhr3_object.responseText.match(/u=([0-9]+)"/g);
            if (test==null)
            {
                return(-1); // no match
            }
            if (test.length>1)
            {
                return(-2); // multiple match
            }
            forumID=test[0].substring(2, test[0].length-1);
            
        }
    };
    xhr3_object.send(null);
    forumIDs[0]=forumID;
	return (forumIDs);
}


function submitPMForm()
{
    var id = $(this)[0].id;
    var info = id.split('_');
    
    var formID = info[0];
    info.shift();
    info.shift();
    var userName = info.join("_");
    
    var isURPM=false;
    var domComments=null;
    var comments=[];
    
    var domComments=null;
    if (id.indexOf("WMEFP-UR-PM")!=-1)
    {
    	domComments = $(this)[0].parentElement.parentElement.parentElement.parentElement;
        isURPM=true;
    }
    if (id.indexOf("WMEFP-UR-ALLPM-FORM")!=-1)
    {
    	domComments = $(this)[0].parentElement.parentElement.parentElement.children[1];
        isURPM=true;
    }
    if (isURPM)
    {
        for (var i=0; i<domComments.children.length; i++)
        {
            var comment = domComments.children[i];
            if (comment.className=="comment reporter")
                comments.push({author:comment.children[0].textContent.replace(/\n  /g, "") , comment:comment.children[1].textContent.replace(/\n    \n/g, "\n").substring(1)});
            else
                comments.push({author:comment.children[1].textContent.replace(/\n  /g, "") , comment:comment.children[2].textContent.replace(/\n    \n/g, "\n").substring(1)});
        }
        //console.dir(comments);
    }
    
    if (userName=="" && selectionManager.selectedItems.length == 0)
    {
        alert("Please, select one segment before");
        return false;
    }
    readyToSubmit=false;
    if (userName=="")
    {
        //getting name of last editor or creator:
        var seg=selectionManager.selectedItems[0];
    
        var userID=seg.attributes.updatedBy;
        if (userID==-1)
        {
           userID=seg.attributes.createdBy;
            if (userID==-1)
            {
                log("PM request - Do not PM Admin!");
                alert("Can't PM admin!");
                return false;
            }
        }
    
    	forumIDs=getForumUserIdFromID(userID);
    }
    else
        forumIDs=getForumUserIdFromName(userName);
    
    if (forumIDs.length==1 && forumIDs[0]==-1)
    {
        log("PM request - User never logged to the forum...");
        alert("Sorry: unable to find the user in the forum");   
        return false;
    }
    if (forumIDs.length==1 && forumIDs[0]==-2)
    {
        log("PM request - Several users match name. Should never happen :s");
        alert("Sorry: more than one user found in the forum.\nYou should look for him/her by yourself.");    
        return false;
    }
    
    log("PM request - all OK. go to PM!");
    for (var i=0; i<forumIDs.length; i++)
    {
        var inputRcpt = document.createElement('input');
	    inputRcpt.type="hidden";
    	inputRcpt.name="address_list[u]["+forumIDs[i]+"]";
    	inputRcpt.value="to";
    	getId(formID).appendChild(inputRcpt);
    }
    
    getId(formID + '-message').value="[url=" + newLink + "]Permalink[/url]\n\n";
    if (isURPM)
    {
        for (var i=0; i<comments.length; i++)
        {
        	getId(formID + '-message').value+='[quote="' + comments[i].author + '"]\n' + comments[i].comment + '[/quote]\n';
        }
    }
    var now=new Date().getTime();
    now /= 1000;
    now = Math.floor(now);
    getId(formID + '-ct').value=now;
    getId(formID + '-lc').value=now;
    
    getId(formID).action="https://www.waze.com/forum/ucp.php?i=pm&mode=compose&action=post";
    
    getId(formID).submit();
    return true; // this forces to open in new tab!
}

function submitUnlockForm()
{
    if (selectionManager.selectedItems.length == 0)
    {
        alert("Please, select one or more (Ctrl + clic) segments before");
        return;
    }
    var now=new Date().getTime();
    now /= 1000;
    now = Math.floor(now);
    getId('wmeFP-form-ct').value=now;
    getId('wmeFP-form-lc').value=now;
    
    var segRank=0;
    var thisUser = loginManager.user;
  	if (thisUser === null) return;

  	var usrRank = thisUser.normalizedLevel;
    var city=null;
    var cityID=null;
    var segName=new Array();
    var segRanks=new Array();
    var segIds=new Array();
    for (var i=0; i<5; i++)
    {
        segRanks[i]=0;
        segIds[i]=new Array();
    }

    for(i = 0; i < selectionManager.selectedItems.length; i++)
    {
        
		if (selectionManager.selectedItems[i].type=="segment")
        {
            var seg=selectionManager.selectedItems[i];
            if (seg.attributes.lockRank<usrRank) continue;
            if (seg.attributes.lockRank>segRank) segRank=seg.attributes.lockRank;
            segRanks[seg.attributes.lockRank]++;
			segIds[seg.attributes.lockRank].push(seg.fid);

            var sid = seg.attributes.primaryStreetID;
            if (sid===null) continue;
            var street = wazeModel.streets.get(sid);
            if (typeof(segName[street.name])==='undefined') segName[street.name]=0;
            segName[street.name]++;
            
            if (city==null)
            {
                
                if (street === null) continue;
                var wmeCity = wazeModel.cities.get(street.cityID);
                if (wmeCity === null) continue;
                if (wmeCity.isEmpty == false) 
                {
                    cityID = street.cityID;
                    city = wmeCity.name;
                }
            }
        }
    }
    if (segRank+1<=usrRank)
    {
        log("Unlock request - Selected segments are editables");
        alert("You can edit those segments.\nYou don't need to send an unlock request.");
        return;
    }
    
    
    var names="";
	for (var k in segName){
        if (segName.hasOwnProperty(k)) {
             names += k + " / ";
        }
	}
    names = names.substring(0, names.length - 3);
    
    log("Unlock request - Street name list : " + names);
    
    
    
    if (city!=null)
        log("Unlock request - City from segment: " + city);
    
    if (city===null)
    {
        if (wazeModel.segments.topCityID!=null)
        {
            city = wazeModel.cities.get(wazeModel.segments.topCityID).name;
            cityID = wazeModel.segments.topCityID;
	        log("Unlock request - City from top city: " + city);
        }
    }
    if (city===null)
    {
        for (var i=0; i<wazeModel.cities.additionalInfo.length; i++)
        {
            if (wazeModel.cities.additionalInfo[i].isEmpty)
                continue;
            if (i==0) 
            {
                city=wazeModel.cities.additionalInfo[i].name;
                cityID=wazeModel.cities.additionalInfo[i].id;
            }
            else city = city + "/" + wazeModel.cities.additionalInfo[i].name;
           
        }
        if (city!=null)
        {
        	log("Unlock request - City from loaded cities: " + city);
        }
        
    }
    
    if (city===null)
    {
        log("Unlock request - No city found...");
    }

    
    getId('wmeFP-form-subject').value="L" + (segRank + 1) + " -> L" + usrRank + " " + (city===null || city=='undefined'?"":city) + " " + (names===""?"":"(" + names + ")") ;
    
    originalLink=divPerma.firstElementChild;
    curLink=originalLink.href;
    newLink=curLink.replace(/#/g, "");
    linkParts=newLink.split('&');
    
    getId('wmeFP-form-message').value="";
    for (var i=usrRank; i<5; i++)
    {
        if (segIds[i].length!=0)
        {
            
            for (var j=0; j<linkParts.length; j++)
            {
                if (linkParts[j].indexOf("segments=")==0)
                {
                    linkParts[j]="segments=" + segIds[i].join(',');
                    break;
                }
            }
            getId('wmeFP-form-message').value += "L" + (i+1) + " -> L" + usrRank + " [url=" + linkParts.join('&') + "]Permalink[/url]\n";
            
        }
    }
    
   
    
    var countryID = 73;
    if (wazeModel.countries.additionalInfo.length>0)
        countryID=wazeModel.countries.additionalInfo[0].id;
    
    var forumSection=unlockForumSection[countryID];
    if (cityID!=null)
    {
        
        if (typeof(unlockForumSection[wazeModel.cities.get(cityID).countryID]) != 'undefined')
        	forumSection=unlockForumSection[wazeModel.cities.get(cityID).countryID];
        else
        {
            alert("Your country is not registered in WME Fancy Permalink.\nPlease, help me by sending me this number: " + wazeModel.cities.get(cityID).countryID + " and a link to the unlock forum of your country by PM (dummyd2).\nThank you in advance.");
            return;
        }
    }
    else log("Unlock request - Country get from waze model.");
        
    
    getId('wmeFP-form').action="https://www.waze.com/forum/posting.php?" + forumSection + "#preview";
    getId('wmeFP-form').submit();
    return true;
}

function makePMForm(id, image, userName)
{
    var PMForm;
    PMForm='<form id="' + id + '" target="_blank" method="post" style="display: inline">';
    PMForm+='<input id="' + id + '-subject" type="hidden" name="subject" value="" />';
    PMForm+='<input type="hidden" name="addbbcode20" value="100" />';
    PMForm+='<input id="' + id + '-message" type="hidden" name="message" value="" />';
    PMForm+='<input type="hidden" name="preview" value="Preview" />';
    PMForm+='<input type="hidden" name="attach_sig" value="on" />';
    
    PMForm+='<input id="' + id + '-ct" type="hidden" name="creation_time" value="0" />';
    PMForm+='<input id="' + id + '-lc" type="hidden" name="lastclick" value="0" />';

    PMForm+='<a id="' + id + '_link_' + userName + '" href="#" >' + image + '</a>';
    PMForm+='</form>';
    return PMForm;
}

function joinOnKey(tab, sep)
{
    var keys="";
	for (var k in tab){
        if (tab.hasOwnProperty(k)) {
             keys += k + sep;
        }
	}
    keys = keys.substring(0, keys.length - sep.length);
    return keys;
}

function update()
{ 
    originalLink=divPerma.firstElementChild;
    
    
    var comments = document.getElementsByClassName("comment");
    var nocomments = document.getElementsByClassName("no-comments");
    var userNames = new Array();
    
    if (getId("WMEFP-SEG-PM-C")==null && selectionManager.selectedItems.length==1)
    {
        var segEl=document.getElementsByClassName("additional-attributes list-unstyled", getId("segment-edit-general"));
        if (segEl.length==1)
        {
            var selectedObject = selectionManager.selectedItems[0];
            var lastEditor=null;
            var creator=null;
            if (selectedObject.type=="segment")
            {
                lastEditor=selectedObject.attributes.updatedBy;
                creator=selectedObject.attributes.createdBy;
            }
            console.dir(lastEditor);
            if (lastEditor != null && lastEditor != -1)
            {
                var PMForm=makePMForm('WMEFP-SEG-PM-C',  smallredpermalink, wazeModel.users.get(lastEditor).userName );
                segEl[0].children[1].innerHTML += PMForm;
                getId('WMEFP-SEG-PM-C_link_' + wazeModel.users.get(lastEditor).userName).onclick = submitPMForm;
            }
            if (creator != null && creator != -1)
            {
                var PMForm=makePMForm('WMEFP-SEG-PM-C',  smallredpermalink, wazeModel.users.get(creator).userName );
                segEl[0].children[2].innerHTML += PMForm;
                getId('WMEFP-SEG-PM-C_link_' + wazeModel.users.get(creator).userName).onclick = submitPMForm;
            }
        }
    }
    
    for (var i=0; i<comments.length; i++)
    {
        if (comments[i].children.length==2)
        {
            // getting name:
            var userName = comments[i].firstElementChild.innerHTML;
            userName=userName.replace(/\s+/g, '');
            userName=userName.replace(/\n+/g, '');
            if (userName.indexOf('(')==-1)
            	continue;
            userName=userName.split('(')[0];
            
           	nodePM = document.createElement('div');
            nodePM.id = 'WMEFP-UR-PM-' + i;
            nodePM.style.display='inline';
            nodePM.innerHTML=makePMForm('WMEFP-UR-PM-FORM-' + i , smallredpermalink, userName);
            
            comments[i].insertBefore(nodePM, comments[i].firstElementChild);
            getId('WMEFP-UR-PM-FORM-' + i + "_link_" + userName).onclick = submitPMForm;
            userNames[userName]=userName;
        }
    }

    
    var urCommentList = document.getElementsByClassName("ur-comment-list");
    if (nocomments.length==0 && typeof urCommentList !== 'undefined' && urCommentList.length>=1)
    {
	    if (urCommentList[0].firstElementChild.id!="WMEFP-UR-ALLPM")
    	{
            var nodeAllPM = document.createElement('div');
            nodeAllPM.id = "WMEFP-UR-ALLPM";
            nodeAllPM.style.display='block';
            nodeAllPM.style.position='relative';
            nodeAllPM.style.right='15px';
            nodeAllPM.style.cssFloat='right';
            nodeAllPM.style.zIndex='9999';
            //log(joinOnKey(userNames, '/'));
            nodeAllPM.innerHTML=makePMForm('WMEFP-UR-ALLPM-FORM' , redpermalinkmulti, joinOnKey(userNames, '/'));
            urCommentList[0].insertBefore(nodeAllPM, urCommentList[0].firstElementChild);
            getId('WMEFP-UR-ALLPM-FORM_link_' + joinOnKey(userNames, '/')).onclick = submitPMForm;
        }
    }

    
    if (curLink==originalLink.href)
        return;
    
    nodeWMEFP.innerHTML="";
    
    curLink=originalLink.href;
    newLink=curLink.replace(/#/g, "");
    newbblLink="[url=" + newLink + "][/url]";

    var lat=null;
    var lon=null;
    var latMatch=newLink.match(/lat=\-?[0-9]+\.?[0-9]+/);
    if (latMatch!=null && latMatch.length==1)
    	lat = latMatch[0].substring(4);
    var lonMatch=newLink.match(/lon=\-?[0-9]+\.?[0-9]+/);
    if (lonMatch!=null && lonMatch.length==1)
    	lon = lonMatch[0].substring(4);
    
    if (lat!=null && lon!=null)
    {
        var ns="N";
        var eo="E";
        if (lat<0)
        {
            lat*=-1.0;
            ns="S";
        }
        if (lon<0)
        {
            lon*=-1.0;
            eo="O";
        }
        
    	nodeWMEFP.innerHTML+='<a onclick="window.prompt(\'Copy to clipboard: Ctrl+C, Enter\', \'' + lat + ' ' + ns + ' ' + lon + ' ' + eo + '\'); return false;" href="#">' + redLatLonImg + '</a>';
    }
    
    //var PMForm=makePMForm('wmeFP-formPM',  pmlinkImg, "" );
    //nodeWMEFP.innerHTML+=PMForm;

    
    var unlockForm;
    unlockForm='<form id="wmeFP-form" target="_blank" method="post" style="display: inline">';
    unlockForm+='<input id="wmeFP-form-subject" type="hidden" name="subject" value="" />';
    unlockForm+='<input type="hidden" name="addbbcode20" value="100" />';
    unlockForm+='<input id="wmeFP-form-message" type="hidden" name="message" value="" />';
    unlockForm+='<input type="hidden" name="preview" value="Preview" />';
    unlockForm+='<input type="hidden" name="attach_sig" value="on" />';
    
    unlockForm+='<input id="wmeFP-form-ct" type="hidden" name="creation_time" value="0" />';
    unlockForm+='<input id="wmeFP-form-lc" type="hidden" name="lastclick" value="0" />';
    unlockForm+='<a id="wmeFP-form-link" href="#" >' + unlocklinkImg + '</a>';
    unlockForm+='</form>';


    nodeWMEFP.innerHTML+=unlockForm;
    
    


    
    nodeWMEFP.innerHTML+='<a onclick="window.prompt(\'Copy to clipboard: Ctrl+C, Enter\', \'' + newbblLink + '\'); return false;" href="' + newLink + '">' + bubblelinkImg + '</a>';
    nodeWMEFP.innerHTML+='<a onclick="window.prompt(\'Copy to clipboard: Ctrl+C, Enter\', \'' + newLink + '\'); return false;" href="' + newLink + '">' + squarelinkImg + '</a>';
    nodeWMEFP.innerHTML+='<a href="' + newLink + '">' + redlinkImg + '</a>';
    getId('wmeFP-form-link').onclick = submitUnlockForm;
    //getId('wmeFP-formPM_link_').onclick = submitPMForm;
}

var divPerma;
var node;
var nodeWMEFP;
var curLink;
var redlinkImg='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BEg8MDmPBRG0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB4klEQVRIx+2Vv0sbYRjHP5e7S2quF0OWpm1MvIoVJItDkSyCi9NlddBNEMRBcPdPKSFEsgUEs+ngeE4qiItLDAE1NIdpUrmk9+PtUOhgm9IkOBT8ri/v53n5Pt/neaVmsyl4JoV4Rv2/cGXQgXN0xJeTE/x+n7f5PK+Wl4eGS39q6LeDAxqVCsLzEEIghUJk1tfR8vnxXu4cH9OoVJAUhdmdHUQQUCsUqJfLZGCoAr953j4/R/g+M1tbKIuLqLkcxsYGiq7TqFRQG43R4ZIsEwQB31stAFzLwj49JTY/j+84BP3+6La8M02619e/bPC6XWzLQgCReBw5GsUfp6GuZVErFPA6HTTD4LFWIxACLZViMpulZVmEFIXU6upfUyQNGn/XsqiXSvRsm7CuE02n+Xp1hQBkVQXx81p6bQ3NNIeDP9XD/j631SoC0KenSZomN8UiQa83sMA/TehEu03n8hI5EiGxsIASiyEtLfFhcxNJVbk9PCR8dzca3ImryJpG4LpMZrO839sjDKi5T8Tm5nA7HXzHGXW3aLxZWUHRderlMo/VKuBhfy7ycHGBlk7TzmRG9/xpisKJBH3bZiKZ5OPuLp5hjAcHCM7OuCmV6N3f89owmNnexp2aGi8tLz/RC5wfbR7T1wiFo3UAAAAASUVORK5CYII=" />';
var bubblelinkImg='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BEhEDBWUzD1AAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADF0lEQVRIx7WVT08TYRDGf9vdpUtLEUgMbdECgmlCvHAwpheNF0/lOxgTovVg9IDhoFxN9BM0mIry50RCotEYPRBPeNNouBApVipYS2ml1t1uu7se2i5UiZSqb/ImO7OTeWbmeWdGSKVSFv/xSHuF/NOn/FhdBdNs2qHD6eRoJGLLQiqVsqxikU+3b//TyOWuLvzj4xWAxM2bdT8FUWzasWUY9rdy7BjSVjRqK3quX0fy+21ZffGC9OIiRrGIb2QE5fz5hkA27tyhlM2iJZM4tI0NAES3u87594UFPj58yPd4nB/JJPFolMKTJw0BeK9e3SXZsqzfyqK+fMn6/DyCJHHy2jUs02QtFiMxO0sv4B4Z+SOA0Na2S/p+Brk3b7AMg4ErV5DOnEEOhei/dAnJ42F9fh55fb3xV7VvBKKIaZroW1sAlJaWyLx+TfvQEIaqYhaLzfVB7fjDYfIrK3ZJyvk8maUlLMDZ0YHocmH8TQZmMEjfxYtIHg+JmRly794hCEIlorY2vjx/zsroKB8iEbTFxcNnAFTqDiQePSIfj9Pi8eAKBPi2vEwhmUSUZQzLYm1ykkChgDscPhxADWQwFLLl7PQ035aXAXD19OANh/k4NcWnuTkCsC+Io1GyWnM5dt6/R3Q66RoeRmpvRzh7lhOjowiyzMbjx7RsbjYPoHbIiG43ZqnEkVOn6Ll1ixZADp2mPRiktLODoarNA4Cb7gsXKsTPzla7ukzm/hTZt29xBwLkent/56D2OkxdP3hCVolfi8VIzMzQ8uwZxUyGVq+XgUiEcnUaGNX+AXAo1fljahqFV68aAhmMRFB8PvRsFs/AAMGxMcr9/bbN11isfh/sHdcORUF0ufCPj9u6rWgU9fNnuxf+dExdt0e20+ercHB8YmLXQNMobW+z/eCBrSusrmJqGoaqHnhrzsXWVrw3blQyqDnKTE6i53Lo6TSCKOK7fJmv09OU83kcioLc2XngOhVEkSPnzqEMD++W6FejzXv30NPpOl3v3bvN7ej9lL6xsfrht2eB/BOAvRE7u7uR+/qaBvgJvWpSf5l/pPEAAAAASUVORK5CYII=" />';
var squarelinkImg='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BEhEXOWTypIIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC3ElEQVRIx7WVPUtbYRTHfzf3XhNNolYoNSqxVktAXBxKyaK4SIf4HUQQjIN0qXSwQ7v4GcQSrG+TIChK0UGcdLO1uEiNxgRtWkNSY8yb9z4dEq+KYpPUnuk59z7P+Z9z/udFCofDgv8oynUlvrTE+d4e6HrJBk1mM4+9XkOXwuGwEOk0h+/ePajnak0NdW/f5gACw8M3fkqyXLJhoWnG2dLQgHIyNmZ8qH/9GqWuztCTKyv8WltDS6dx9PRg6eoqCORodJRsNEoqFMKUOjoCQLZabxg/m5/n4NMnzvx+zkMh/GNjJBYXCwKoHRy8IlkIcSstydVVgnNzSIrC86EhhK6z7/MRmJmhEbD29NwLINlsV6TfdSG2tYXQNJoHBlBevkR1u2nq60Ox2wnOzaEGg4VX1Z0eyDK6rpM5OQEgu7FBZHOTytZWtGQSPZ0urQ8upc7jIb67a6TkIh4nsrGBAMzV1cgVFWj/EoHucvG0txfFbicwPU1sextJknIe2Wz8+PyZ3f5+vnu9pNbWio8AyOUdCExOEvf7KbPbqXA6+b2zQyIUQlZVNCHYHx/HmUhg9XiKA7gEaXG7DT06NcXvnR0AKurrqfV4OJiY4HB2FifcCWIqlKzyWIzTb9+QzWZq2ttRKiuROjp41t+PpKocLSxQdnxcOkCyWkW2WtGzWara2qgfGaEMUN0vqHS5yJ6eoiWTpQOAlSfd3TniZ2byXX1B5OME0S9fsDqdxBobb3NwWR16JvP3CZknft/nIzA9TdnyMulIhPLaWpq9Xi7y00DL9w+AyZKfP3oqRWJ9vSCQFq8Xi8NBJhrF3tyM680bLpqajDs/fb6b+yAwPIykqpgUBSGEUfOliJ7JGCPb7HDkAPSzM4IfPjzowpHLy2l4/z7XByabjUevXpH4+hVJ1+F6BKK4lS3JMlWdnVja269SBCDyhu9Lj8hmc49UtfhhJ5n+XrHFGC6hD0qTP05/HFCka8k0AAAAAElFTkSuQmCC" />';
var unlocklinkImg='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAOkA6QDpo2KvIgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BGBAEB6oDcugAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAD10lEQVRIx5WVy08UWRTGf7eq+iXQvCKPxtgKJJr4AA0kLHShMcTEzCxwAYk74wZikESjGedPICw0MR1MTHThwhhdGVkaFmQcNIPGx4CRkc7INNUIjTTV9qOq7iwaysGuhp67PPfe851zvu9+V+i6Limy7EwG/fZt0nNziP/EJSCA4MmT1Jw5w1ZLFAOwkkn+GRnBSia3TOBvbaWhv7/ovuIWlFIyPzyMuZFcSpRAAF9LC95duxBer3M2/fEjS48fFwXQ3ILG1BS2YThjqezupvLECRSfDwBzdZXlR48w3r5FAMmJCSq6uvCGQqV1sDY56czaGwpRffq0kxxACwap7etD9fuRUiKlJPXuXekjSkejeYKA2t5e14tqIIB/3z6EEAghSM/NbT8iKSVCUcA0nZivubnofOsuXEBunBUCpERaFkKIQgApJcLjwYrHQX4X1srDh5SypJSUtbfjP3gQe23NXabp2VkWIpHNOlZVSkQATUMNBGi6ft255wCYKytEr11Dq6lBeDzfE+dy2KaJomng8WyNkclgZzL46utpvHp184i+jI6i7NhB5bFj1Jw9C5qGOT/Pl7t3Sbx6RVV7O3Xnz6M2NoJlubCpkXr5ksX798noeiEH2WQSoaoowSDStjE/fGD+5k2Mz5+p7ehg6cULMrEYTRcvoobDeSEIsQkjcPgwnmfPsGZnXWS6LjfWyU6MjbEWjbJ3YID6oSGaBwdJxWLMRyJ4UimkopREjfspIbBSKeT6o7ITCYzpaaqOHsWYm4NUqqB6h+hSAOxslqaeHrzBIJ9u3cIYH2dpYoL4+Di+nTtBCGzDQGazjkT/XweWRS4cZu/gIEII/n7wAHN1FU95OdK2mR0e5s/eXhZGRrB0HaFprtUXNbsNeWqHDhEeGiLx+jXC50PE48SePAFVpaqtja/v32PeuEFoYCBPfMkdQJ5w28azfz91586xu6eH3PIyWlkZFc3NlB0/zu7+ftaiUWJ37uBNp8GFeG1bGdg2Mpsl45fYVt53Qn19eDo7UX0a1b8/Z+WPKTAMCAa3MbsfjW9dKQKJnfPQ8NPPGH99Ijo6yp5gOavTMyz99pyqI0f42tBAmcsDdABUTcO2LOeLFD/agpRonZ20XLlCNBLhwy+/ghDUdHSw59IlslKS1XXsZHIT4Q5AZXc3+r17fHvzBqEoKIGAu85Vleq2NqRlofp8VB44QHxyEiEl32ZmyC4soPj97m6aePqUlbGxwuoLpKE4ZihN06lYWhYymyV0+TL+1tZCDiq6usjpOubiYv7j2eKFunXnD4epOHUKrbbWCf8LyvqlshY6UeEAAAAASUVORK5CYII=" />';
var pmlinkImg='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAAAXNSR0IArs4c6QAAAAZiS0dEAL8AQABAbZLo6gAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BHxczBDuVrVoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADZUlEQVRIx7WVz2tTWRTHP+9Xfr50So0zmQbT0YwUREKCDJJNcWNBSDYVXYoIxdaFS1f+DS7ciaXU2tYKAUFFpArVVYMIlmpBypCaSW1jasY0SZukL+/dWbS2ta0zbWbmu7uHe7/n3u/5nnOl8VOnBP8TVAABSFuDBw6g6DrCMED8Q25VRRKC2sePO/aqAIrTieb1UstkAJBkGT0cprmjA9nhwFpd3cEpyTKSqrLy/j1/jo1txG1+P7LDQTWVQhWAouu09vRgrqyw0NeH8ekT+cePWUom8cbjtJw+vYO8XiySGxmhmExiVSqgKBzs6sJ79iy50VGqs7OoG3LIMnooxNGbNylPTZEbHaWWTpPt6yN37x6tly+jRyJY1Sq5+/cpPH++dszpxNvVxcFz55Bkef1Z0qYsWwMAeiiEHgpRnpyk8PIlpdevmbtxA5vPh5HPYxkGjkAAPRKhpbMTzev9VrKtmn8PejiMHg6z/O4dxVevKLx4geb10nLmDJ4TJ3aQ7uqW3VAZG2NxfByzVuPneBzfhQv8eP48yDKKy7V3K25H+cEDMokEol5HCEHq1i3aymXc8fj+ff7NjZ89I5NIIKkqR69eRVgWs/39pIeHaYN9JZC3Bwpv3iBMk2BPD+rJk2jRKIcvXUL1eMgkEmjrvdAQuaQoWJbF6ufPABgTE+STSZqOHcOsVLBqtcZlaY3FKM3MbMhQL5XIT0wgAHtzM4rLhdnoza32dn65eBHV4yE9NERhagrpa1PoOtmnT5np7ub33l6q4+P7d4sWjXIYSA8OUkqlsHk8uAIBlqanWZ6bQ9E0TCGYvX2bwPIy7lhsfz7XolF+jUY31l/u3mVpehoAl9+PLxbjw8AAf4yMEIBdE8h70c5ZKFB8+xbFbqclEkFtakLq6OBIdzeSpjH/8CG2hYXGyCvNGorbjWUY/HD8OP7r17EBWvQ3mtrbMYpFzEqlMXJw81Nn51qRh4dZfvQIqJPvG+DL5CTuQIBCW9veNf9ekWf7+0kPDWF78oRaPo/T5yPY20tdURon3yiy3c6HwUGq2SyeYJDglSsYhw5t68Qt81yYJsbiIorTibCsv8/g8+G/dm1zyAHMz2/qbLNhlkoIIdbI60tLZO/cQda0f/3jC0nCKhaRvpJjmtTXZ8l/ib8AxhdMqhXge60AAAAASUVORK5CYII=" />';
var smallredpermalink='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94CAxc4FJi59gIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB80lEQVQoz32RvUtbYRTGf+d+xI/bG8WlttXEW7GCZHEo4iJkcUpWB90EQRwEd/+UEiSSLSCYTQfH66SCuDg0hoAa6sU0Vm7S3Pe+HVpFWpsDz3aeh3N+jzQaDQDCg4P429GRqE6Hd/k8/dmsAWh6jDQaDX7s7al6uWzoKEJrjRgG6ZUV7eTzZq8AKzw8jOvlsohlMbW5iY5jqoUCtVJJ0qB6BRjN01PRSjG5vo41N2fa8/OGt7qqLdelXi6LXa8rQF41i2kSxzE/7+4AdNf3o+D4WJIzM6gwJO505L9nv8/leLi8pFYqkQYVPTxI4PtooG94GHNwENUDmHR9X1ULBYlaLRzP47FaJdYaZ2yMoUyGO9/XhmUxtrREfzb7zED+VCVd31e1YlHaQUDCdRlMpfh+cYEGTNsG/ZtZanlZO7mcCegnM39Dud/dVdeVimjAnZhgNJfjameHuN1+DjBe7OsnDTSbXuv8HLOvj5HZWaxkEllYMD+urWmxba739yVxc6OM10CEw/ZX03GIu12GMhk+bG+bCYjt+c9mcnpad1stVBiK8TpHh7eLi1iuS61U4rFSiSCS4MtOdH92Jk4qRTOdNl/+/E8TL1tIjIzoThDIwOgon7a2iDzP6GUGkPjkRF0Vi9K+veWN5zG5sUF3fNwE4l/01+wMq9VvvgAAAABJRU5ErkJggg==" />';
var redpermalinkmulti='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAgCAYAAADNLCKpAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94CBQwzL/9e1aAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACw0lEQVQ4y+3VsW9SQRwH8O/v3VFQBFurnhptoZiQaGJSEoe3mDjUydFVgiYm+Ad0dnRU0qTpYFKH0qHBRdhNTBq6ldqmg1ihgNBLUJBKscC9c2ipYES6ufQlb/zevd83n7tHGPBIKennu3eqFI+D2e24cPeu9jx8yACABgXr8bjajkZJWxaICMQ5rj14YPnCYUbHCXKXC97Hj0GGgU+zs9DtNjyhkMX7BW35vMrHYp2gtpkmA0A+y1LpSATV1VUy+u1s7e+TajTgvnEDX1dWqJVMtgHoZrkMy7JAjIH3C7PTpzE0PIxyMgkCcEoIg5fLajsahX1kBFfu3/9dWKfVwtISrHYb502Tvm9soF4owCCC0+tFPZMBd7uPxqCjchIJlVtcPFiMCKrVAgE4e/Mm9nI5NHd34RgdxXgwqG2myYQQmncHDYcDnlAIO4kEdrNZAIBzYkJfffaMdY8khNAAwIdKJZV++5bIZsPEkydamybn79+rc5OTqG1uora+Dufysvry5s0REgAMALhqNKhVq2H41i1tM28zIYSWUrJ6PK6qa2tgTid9mplBB0k9l6OtuTnlC4cZr46PM+fYmKqkUmR/9bot5Rdej8fb29EouMuFi1NT2CsUepDkYzEju7CgSEpJPJOxPr54gcbODuyjo7r57RtxtxueR4+QnZ/vQdJKJlU6EsFIIKANIYRue73MPz0Nl8+HZqVCjsuXcf3pU6RfvhyMRAhhdR8SKSUNFYvWCZITJD1IpJTG2PPnnULJViyqQUh6rqE/kICfOYP9ahVEhOqHD6hnMgfjhELa8vv/IxJjqFRSxS4kdOcO4243zk1OgtntqK2v41S16hVC6M7bWeQ4SOD2+z//7Xo2DpGgkkrR1wMk1I1E3LvX91/2TyQdHN2f2hM+bNuw5fNqa3YWPzIZOC5dgicY1EYg0DcIAL8AVl6FsfcWZWIAAAAASUVORK5CYII=" />';
var redLatLonImg='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94CEhYHDDpsHqUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADIUlEQVRIx92VTWidRRiFn5PUpkmlCFJMixALCmL9WailKMwr31WKrgS1gkQsRRBRhKCIFMG6UdBqaQV/wZ+N1EUtARFRvsH5XChYgz8RFReSIqYFaQ1qbdOS48J7m5s0ubjuu5uBed8zZ845A+dc1SmdtZcjVi6xt2wP9RqQIwawH0S6B9gInAZOAb8b9gteqko5vNz5vqVQ1CmtzBGjwDTSTtuTtkeBt4ELgZ8Eo9i/5JSeyhFrlrptX3fjqhTqlAYk7TW8DuzBHm41zfZW0xwAxrA/AIarUkaQHkJ6GNifI9a3mmYBTfPI7f94kl7FvhfYUpXydNU0J3JKneFzhkdsb8oRW6tS3sTeDFxiOFBH9FelLOK2fZ0ccXdOyTmlW3o9WI54t46Y6FoP54gTOaXd3f206NAk9sGqabbVKfVLGjKsBEYEa4HzgMO2L5P0BrCxKmWqffY+YJft61pNM7WgeY4IYBz7CqQR4HZgi+Ei2TNIfwFzwGrD+YJ1tickjRs+E3xp+3tJL1SlvJIjWNEF/ErgKNLzwG1AAzwr+0dg2vC3YM4wiL0aaULSFPYmSY8Bk4JZ4HKAqpSu5vYawwZJq4BbgYNVKaeXkO8/wNEc8Qd2rprmtRyxDtiJlIBv6pQGWk1zcl4tUr/gEPalVSlftA3Tq4aAX9sop6tSHsB+C1grWAUsoOUI0kxVyvGO5ns6F9YDxzqKso1hUPa3VdPM1CktcOhXhg11xDVVKT0zA/sm4DjSDx1+JQ1Kuhlpou2X+eZVKRPYX8ve2wNxh8I7gZ+rUo51LG97B/YsMN4Z2LdA9NLjhhvrlMY6tHTnRRdVW7H3AbQtf4OkJ5Geq0r586xErTuhFbEjR8zmiPtzRN9i1DliW53SyRxxQXtd5ZRm6oh9y6ZiqxRySrRKeQZ4AtgNvJcjru2gzhFD2GOCXdj9OaU9wIdI78jevjguVixM9zOGfRH4FPtlpM9zxCHgE+Aqw9WSBg2Pyv7NcIfg46ppTi1WmZZ7uDOcR1yPfZekzcDFwBHs75Der0r5qPMurab5/99cjugtx0WJem7VvxQQgtSQ02neAAAAAElFTkSuQmCC" />';

var unlockForumSection=new Array();
unlockForumSection[73] ="mode=post&f=244"; 			// FRANCE
unlockForumSection[203]="mode=reply&f=206&t=62420"; // SPAIN
unlockForumSection[181]="mode=post&f=611"; 	 		// PORTUGAL
unlockForumSection[21] ="mode=post&f=383"; 	 		// BELGIUM
unlockForumSection[130]="mode=post&f=386"; 	 		// LUXEMBOURG
unlockForumSection[158]="mode=post&f=382"; 	 		// NETHERLANDS
unlockForumSection[81] ="mode=post&f=850"; 	 		// GERMANY
unlockForumSection[14] ="mode=post&f=851"; 	 		// AUSTRIA
unlockForumSection[216]="mode=post&f=852"; 	 		// SWITZERLAND
unlockForumSection[234]="mode=post&f=375"; 	 		// UK


log("ready");
bootstrapFP();
