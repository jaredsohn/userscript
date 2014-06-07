// ==UserScript==
// @name           rcForumKillfile_beta_V2.0
// @namespace      Jay Tanzman
// @description    Hides selected users' posts in rockclimbing.com forums
// @include        http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi*
// @include        http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?*list_type=friends*
// @exclude        http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=message_list;
// ==/UserScript==

var strVersion = "3.1.1";
// Version 3.1
// Extensive changes to conform to new web site format

// Version 3.0a
// Change to conform with site changes

// Changes since version 2.1
// Added options to hide posts from killfiled users in Recent Posts and My Topics pages
// Misc changes to conform to changes in DOM

// Function definitions

function fnKillPostsNow() {
    var arrAllTables = document.body.getElementsByTagName("table");
    for (var j=5; j<arrAllTables.length; j++) {
	var arrAllAnchors = arrAllTables[j].getElementsByTagName("a");
	for (var i=0; i<arrAllAnchors.length; i++) {
	    var strHrefName = arrAllAnchors[i].getAttribute("href");
	    for (var k=0; k<arrUsersToKill.length; k++) {
		if (strHrefName == "gforum.cgi?username=" + arrUsersToKill[k] + ";") {
		    arrAllTables[j].style.display = "none";
		    break;
		}
	    }
	}
    }
}

function killMyTopicTopics() {
    var k = 0;
    var success = false;
    function timedFunction() {
	var t = setTimeout(timedFunction, 100);
	k++;
	if ((k > 100) || (success == true)) {
	    clearTimeout(t);
	}
	try {
	    var nlTableRows = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr[position()>1]",document.body,null,7,null);
	    if (nlTableRows.snapshotLength == 0) throw("Loading");
	    var nlLastPosters = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr[position()>1]/td[5]/font",document.body,null,7,null);
	    for (var i = 0; i < nlTableRows.snapshotLength; i++) {
		for (var j = 0; j < arrUsersToKill.length; j++) {
		    if (nlLastPosters.snapshotItem(i).textContent == arrUsersToKill[j]) {
			nlTableRows.snapshotItem(i).style.display = "none";
			break;
		    }
		}
	    }
	    success = true;
	}
	catch (e1) {
	    return;
	}
    }
    timedFunction();
}

function killRecentPostsTopics() {
    var nlTableRows = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div[2]/table/tbody/tr[position()>1]",document.body,null,7,null);
    if (nlTableRows.snapshotLength == 0) throw("Loading");
    var nlLastPosters = document.evaluate("div/div/table/tbody/tr/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div[2]/table/tbody/tr[position()>1]/td[5]/a/font",document.body,null,7,null);
    for (var i = 0; i < nlTableRows.snapshotLength; i++) {
	for (var j = 0; j < arrUsersToKill.length; j++) {
	    if (nlLastPosters.snapshotItem(i).textContent == arrUsersToKill[j]) {
		nlTableRows.snapshotItem(i).style.display = "none";
		break;
	    }
	}
    }
}

function openHelpWindow() {
    if (wHelp == null || wHelp.closed) {
	wHelp = window.open("","","height=720, width=640, left=1000, top=0, dialog, scrollbars=yes, minimizable=yes, resizable=yes");
	wHelp.document.body.style.backgroundColor = "#f8faed";
	wHelp.document.body.innerHTML = " <h2>Help for Killfile Options</h2> \
    <h3>Synopsis</h3>  \
      Check the appropriate option boxes to prevent topics from appearing on the Recent Posts or  \
      My Topics page when a killfiled user posts to the thread. \
    <h3>Details</h3> \
      When a user posts to a thread, the topic appears on the Recent Posts page, \
      with the user listed as the thread\'s Last Poster.  If you have also posted to the thread, the topic will also appear on your \
      My Topics page.  On each of these pages, the orange New Post icon will appear in the left-most \
      column to alert you that a new post has been made to that thread.  Killfile, by default, does not prevent these alerts \
      when the Last Poster happens to be a killfiled user.  However, you can optionally block them. \
      \
      <p>If you wish to remain blissfully unaware of when a killfiled user posts to a thread, check the appropriate \
      option boxes on your killfile page.  Doing so will hide the topic on the Recent Posts page and/or your My Topics page while a \
      killfiled user is the Last Poster to that thread.  If an unkillfiled user later posts to that thread, the \
      topic will reappear on these pages with the orange New Posts icon, and the unkillfiled user listed as the Last Poster, \
      leaving no trace that a killfiled user ever posted to the thread. \
    <br><br><input type='button' value='Close' onclick=window.close()";
    }
    else wT12Help.focus();
}

function fnAddUserNow(strUserToAdd) {
    arrUsersToKill.push(strUserToAdd);
    strUsersToKill = arrUsersToKill.toString();
    GM_setValue("keyUsersToKill", strUsersToKill);
}

function fnAddRowToKillfile(strUsername, ID, intRowNum) {
    var newRow = document.createElement("tr");
    var tdUsername = document.createElement("td");
    var aUsername = document.createElement("a");
    var strUsername = strUsername;
    var fntUsername = document.createElement("font");
    var tdRemoveUser = document.createElement("td");
    var aRemoveUser = document.createElement("a");
    var strID = "User" + ID;
    var strLinkToUser = "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?username=" + strUsername + ";";
    var fntRemoveUser = document.createElement("font");
    intRowNum % 2 == 0 ? newRow.style.backgroundColor = "#f8faed" : newRow.style.backgroundColor = "white";

    newRow.id = "kfRow" + (ID + 1);
    tdUsername.className = "ftablecol";
    aUsername.href = strLinkToUser;

    fntUsername.size = "2";
    fntUsername.textContent = strUsername;
    fntRemoveUser.size = "2";
    fntRemoveUser.innerHTML = "<u>Remove</u>";

    tdRemoveUser.className = "ftablecol";
    tdRemoveUser.align = "center";

    aRemoveUser.id = strID;
    aRemoveUser.addEventListener("click", function(event) { fnRemoveUserEventListener(event) }, true);
    aRemoveUser.style.cursor = "pointer";

    tbodyKillfile.insertBefore(newRow, tbodyKillfile.lastChild);
    newRow.appendChild(tdUsername);
    newRow.appendChild(tdRemoveUser);
    tdUsername.appendChild(aUsername);
    aUsername.appendChild(fntUsername);
    tdRemoveUser.appendChild(aRemoveUser);
    aRemoveUser.appendChild(fntRemoveUser);
}

function fnAddUserEventListener(event) {  
    if (event.target.value) {

	// Clean spaces from input from usertoadd textbox

	strUserToAdd_Raw = event.target.value;
	var strUserToAdd = new String;
	arrUserToAdd_Raw = strUserToAdd_Raw.split(" ");
	for(var i = 0; i < arrUserToAdd_Raw.length; i++) {
	    strUserToAdd += arrUserToAdd_Raw[i];
	}

	fnAddUserNow(strUserToAdd);

	var strUsername = strUserToAdd;
	var intRowNum = arrUsersToKill.length;
	var ID = arrUsersToKill.length;    
	fnAddRowToKillfile(strUsername, ID, intRowNum);

	tbUserToAdd.parentNode.reset();
    }
}

function fnRemoveUserEventListener(event) {
    strIdNum = event.target.parentNode.parentNode.id.substr(4); 
    intIdNum = parseInt(strIdNum);
    tbodyKillfile.removeChild(document.getElementById("kfRow" + (intIdNum + 1)));
    arrUsersToKill.splice(intIdNum - 1, 1);
    strUsersToKill = arrUsersToKill.toString();
    GM_setValue("keyUsersToKill", strUsersToKill);
    var arrAllTrs = tbodyKillfile.getElementsByTagName("tr");
    if (arrAllTrs.length > 2) {
	for(var i = intIdNum; i < arrAllTrs.length - 2; i++) {
	    arrAllTrs[i].id = "kfRow" + (i + 1);
	    arrAllTrs[i].getElementsByTagName("a")[1].id = "User" + i;
	}
    }
}

document.body.addEventListener("click", function(event) {
	if (event.target.id == "ProfileAddControl") {
	    fnAddUserNow(strUserToAdd);
	    event.target.parentNode.replaceChild(aRemoveFromKillfile, aAddToKillfile);
	}  
  
	if(event.target.id == "ProfileRemoveControl") {

	    loopUsersToKill:
	    for (var i = 0; i < arrUsersToKill.length; i++) {
		if (strUserToAdd == arrUsersToKill[i]) {
		    var intIndexNum = i;
		    break loopUsersToKill;
		}
	    }

	    arrUsersToKill.splice(intIndexNum, 1);
	    strUsersToKill = arrUsersToKill.toString();
	    GM_setValue("keyUsersToKill", strUsersToKill);  
	    event.target.parentNode.replaceChild(aAddToKillfile, aRemoveFromKillfile); 
	}
    }, true);

var arrUsersToKill = new Array(0);
var wHelp = null; // Initialize Help window

if (GM_getValue("killMyTopic") == undefined) GM_setValue("killMyTopic", false);
if (GM_getValue("killRecentTopic") == undefined) GM_setValue("killRecentTopic", false);


// declare icon constant and icon variable

const ICON1 = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys%2FRD84QzQ5Ojf%2F2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf%2FwAARCAAPAA8DASIAAhEBAxEB%2F8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIEBf%2FEACIQAAICAgIBBQEAAAAAAAAAAAECAwQFEQYSEwAUISIxFf%2FEABQBAQAAAAAAAAAAAAAAAAAAAAT%2FxAAdEQAABQUAAAAAAAAAAAAAAAAAAgMREhMUISIx%2F9oADAMBAAIRAxEAPwB%2BKQYKHIYDEXuPxZW9mMf%2FAEbF2yokSrGwdkVUYED8CEjrs6J2ToYvKpcVJBn7GOwi4mzgbaRSxxHrHaidmRW6gAKSdNvROgBsg%2FBR5law2CGNOSq12jnD1hdinZDEOhCK0J7L1YN9SCCrBfwEepsryGTPY6nTa7DbrwqfceCOVY3b69FPlJdyumJLaBLL8EjYOY6dGTYBDKJW8m1bg%2F%2FZ";

const ICON2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC6ElEQVR4nCXSy28TBADH8V%2FX9%2Fpau9SwdTKDAbcxo1Fi4oF49uhlR8EMoskIJMaEw%2BL7ccADUUM0ioncJiY6ExanlcyNrd3arfSxrmuh9LG1tfbhChkLIHw98PkbPjKdG5ZOunR48iUNjR2UbMJkED1mYZPwWoRJQiZxdGxUQ%2BNPy%2F6mV9ZzT0nGswcU%2BOCIFBDaJ%2FL1BHt3atxpVunUqxRvZEgmQ8TTc8gv1Cf6JgalCaf0xFsjUkBMJS9Tf1ims1vj%2Ft5tWq0G%2FzQbNP5tU2tWicQXSBRCfDN7Hu0TBydfkJ479rLUI3bpUK7k4NEDWo02%2BXKVrfYO8VsFttstqo0Kq8lFSp0M8oiR46OSLCK2EaW%2BXSIcnKNbFgyy0nkA23sPybY7yGRFhi4u%2FXCRxcVZrlydQr1CToederEEO%2FcYsPhwyIpRDrZ27hEp1bhebSKzHclMr8vDVjZD8LefMTqFjBL8B82NMh6Z8cmNWU4au5CoNIkWqhh6%2FNhtbizqIhkKkVoNIaOQLAaK5QKPbt%2FFJRNudTNzeZb0zSoblSapco0vv7%2BEzeLAIpGOR0iuh5FNSG5xNXuNfCXH31tFdustiuk8uVyZbLHK6nqGSCzBZibNyso8s3O%2FMB3%2BCfmEnj3ziuQX02u%2FkshGKN3c5G6zhVEmYmtJnC4vwWCQaPQawYVpppenkE84XvNLgckXpVet6LBYrSwRjv5JJZ9j%2B1aRjUSayPIK66nrxJNL%2FBW7grxi%2BNSwAu%2BOSBo3a%2F8nz0sDInV%2FDWuvMOpxSYvBjFFChsc957MzaEi43%2FDI8VG%2F1PWpX473%2BqQD4rvVC4RvzDFxehxJGGTGZnVy%2FOQxFmJ%2F8O3v51G%2FGHx%2Fv%2FS2JH3cLZ0xyH3CJQ2JizMXWE4tsbIWI71ZYD4UIZnP8PWPXyGvOPrhEfnOeqTPTJLekfq%2FeFL%2BiR4den1QcglnvwuZrajLgYx25HEivxgdO6RnTg1IJyTj52b9D%2FCH3se26VD%2BAAAAAElFTkSuQmCC";

const ICON5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACyUlEQVR4nG2Sy2uTeRSGj1dq0XRyMZMvbS5Gk6ZpvsQ0SZu0tlM0WqlgFbzsFLygiCMudOGMd7oQRFAsKFpGZ9nN%2FA2DiwFxBsXaekGxahUs9pI0bfL9kuZxEXU1i7M5nIfD%2B%2FJI6fSocCcnz%2FofyvOhV0IBShWYVlAApgwoAZTgwdCwPB98LfO3p6R4%2Bq1I%2BcobGb%2FwSEABCp89Qs1KByutGia7hmddEF1PEw118%2F3m08CYMDAr8vnWiIBir74b%2B2IXploHy2pWYbHYWG21YfvJjMOqkYx2EvGmOdJzElC86v9P5Mn9fwQUtWLC5fQji5ZisZnxuTQazHVE13ipN1vQbE7iegduUxBQjNwbFsGAWFMCe72bVKabOQwqFDEtFeprFhMwm6BUhMoC%2B%2FYfpKOjh20b9wIKAYXd40bqlvPBmCRPkTJ5GuqWk3Q7WK9ZQc0Dii%2B5GRoCQTJbd1bhMiBLBGuTixkUk2RRzGKrFSJOKwmvRmV6gvlCFoMF9HSacDz97bNRwePysmjVCnKUyDJH7%2B4eQms1mpxWwi4Hvx7YR8HIYwChaBK9OfUNzsLGwAZ8Tj8%2FN3iotVvwhHz4%2FS4CHo14c5BkLEJjMERraxc93TvoS%2B2CSZCn1%2F8WUPS1bCcSSOJe28gKq4UyJWItOrO5KTKZDInEBjKdffS1VcvK%2FzUhMt7%2F7w9B4s52UolNOH1%2B6td4aIqESLa10hxeT1Rv55fYNkAxenNUxi%2BPiDCo5N3vjwUU4WUtFL9AuWojRkVRBqhUF12BXkCR%2FWNG8uc%2Biiz8NiH5S58EFIfix0it62bgxiBVRlEoznLvzn06Y5s5vKVq19jFd8I1RDg7J1yvSPZuTkBxsPcYbeF2WltihBq9dKWT6L4gR%2Fcchyl4cP6RTF6ZEc6URLiKfDzxXiYGpuXln2M%2F8v%2FfDA%2B9lBc3Pwh3kfIpJV8BIYIus7dARPAAAAAASUVORK5CYII%3D";

const ICON6 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAC0klEQVR4nG2Sz28TdADFHwhkLNDZH9a2W39QaNd1%2FUHXdms3NhcozoyEaSJyw0Q0GqLGgxz8%2FSM7kBgTDEs0sAged%2FFvMBxMCBqMY0OIxgGDxIX9aNet7bddPx6KnDy823t5eS8f1c%2FOi4sl3Zy8plszd0QF1Zto1aAKaKWG6iDq6OrMrG5N%2F6nN71ZUPfu31Dj3lxY%2Fuy4wAqOgM0HbHhd77G4sTjf%2BAxHi8TzJ6Cj%2FeR5OLYipdemfb%2BcERifjJ3Bu92Jpd7GzbS82m4Nn7A4cT1tx2d1kk8MkAnneHHsPMLoz%2Bav025WfBUbtsuD1hNC2HdgcVoJeN13WDpL7AnRabbgdHtLxIXyWCGA0d3lWooZSPRmcnT5yhVE2qKlJVZYdorNtO2GrBepV0dzSqVdPMzQ0xrHDJwEjgZHT70Mdu7hfW1aZqhqU1dWxi6zPxUG3HcymwOhRaU1d4QiFF15qhRsgPSXsPV7WMFqmKMO6HO0i4bGTCbhpri5ps1JUjS3F83li6fzj5lpTfm%2BAbXt3U6KuIhsaPzFGdL%2BbHo%2BdmNfFO6%2BdolIrqwaKJrPEe3OPw0V0OHyIoCfEs11%2B2p02%2FNEgoZCXsN9NujdCNpWgOxKlv3%2BEsdEXmci9DMtIv5%2F%2FSWA00XecRDiLb383u%2B02GtSV6ouzXlpRoVAgkzlEYXiCiYHWWeUfl6TFyV%2BeAJL2DJLLHMETDNG5z09PIkp2oJ%2Fe2EGS8UGeSx0DjOYvzGvxyzmJaaO7H90QGMV29lF9hBq0kKw1jRogmi08R8LjgFHx%2BzWVP3kgbX24pPIXDwVGr6fPkDswytQ30wBqYlSpruvyxSsMp47yxvMtuhY%2Bvyu%2BRuLjDXG%2BqeKlksDo9PgZBmKD9PeliHYHGMlniQcjvPXK27CCrn56Xcvn1sQHdYmv0IN372lpalW3f1h4sv%2F%2FNDtzW39cuC8uocb7Rv8C1Y7j73pBUPkAAAAASUVORK5CYII%3D"

    var icon = ICON6;

// Add "Killfile" link to searchwrapper

var oSearchwrapper = document.getElementById("searchwrapper");
var liKillfile = document.createElement("li");
var arrSearchList = oSearchwrapper.getElementsByTagName("li");
var aKillfile = document.createElement("a");
aKillfile.href = "http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?list_type=friends#killfile";
aKillfile.addEventListener("click", function() { 
	window.location = "http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?list_type=friends#killfile";
	window.location.reload();
    }, false);
aKillfile.textContent = "Killfile";
liKillfile.appendChild(aKillfile);
var liPartners = arrSearchList[7];
oSearchwrapper.childNodes[1].insertBefore(liKillfile, liPartners);


// Retrieve stored killfile and convert to array

if (GM_getValue("keyUsersToKill") != undefined) {
    var strUsersToKill = GM_getValue("keyUsersToKill");
    if (strUsersToKill.length > 0) {
	arrUsersToKill = strUsersToKill.split(",");
    }
}

// Create Killfile page

if (document.location.href == "http://www.rockclimbing.com/cgi-bin/forum/lists.cgi?list_type=friends#killfile") {
   
    // Create page header
                                     
    var bPageHeaderParent = document.evaluate("div/div/table/tbody/tr/td[3]/table/tbody/tr/td[2]/font/b", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var bPageHeaderParent = document.evaluate("div[@id='background']/div[@id='forumbody']/center/div[@id='wrapper']/div[4]/div/table/tbody/tr/td[2]/div/div[2]/table/tbody/tr/td[2]/font[1]/b",document.body,null,9,null).singleNodeValue;
    bPageHeaderParent.getElementsByTagName("a")[0].style.display = "none";
    bPageHeaderParent.removeChild(bPageHeaderParent.getElementsByTagName("a")[0].nextSibling);
    bPageHeaderParent.getElementsByTagName("a")[1].style.display = "none";
    bPageHeaderParent.innerHTML = "Killfile <font size='2'>(V " + strVersion + ")<br>Posts from these users will not appear in forum threads</font>";
    
    var tdParentOfBrs = document.evaluate("div[@id='background']/div[@id='forumbody']/center/div[@id='wrapper']/div[4]/div/table/tbody/tr/td[2]/div/div[2]/table/tbody/tr/td[2]",document.body,null,9,null).singleNodeValue;
    var arrBrs = tdParentOfBrs.getElementsByTagName("br");
    arrBrs[0].style.display = "none";
    //arrBrs[1].style.display = "none";
    //    arrBrs[3].style.display = "none";
    tdParentOfBrs.getElementsByTagName("font")[2].style.display = "none"

    // Create Killfile table

    var tbodyKillfile = document.createElement("tbody");
    tbodyKillfile.cellspacing="0";
    tbodyKillfile.cellpadding="4";
    tbodyKillfile.bgcolor="#dee0cb";
    tbodyKillfile.style.cssText = "border: 1px solid rgb(222, 224, 203);";


    // Create table header

    var trKillfileHeader = document.createElement("tr");
    trKillfileHeader.id = "toprow"
	

    var thUsername = document.createElement("th");
    thUsername.align = "left";
    thUsername.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="white";"><b>Username</b></font>';
    trKillfileHeader.appendChild(thUsername);

    var thRemove = document.createElement("th");
    thRemove.align = "center";
    thRemove.innerHTML = '<font size="2" face="Verdana,Arial,Helvetica" color="white";"><b>Remove from Killfile</b></font>';
    trKillfileHeader.appendChild(thRemove);

    tbodyKillfile.appendChild(trKillfileHeader);
  
  
    // Create last table row with Add User controls
  
    var trLastRow = document.createElement("tr");
    var tdUserToAdd = document.createElement("td");
    var tdAddUserButton = document.createElement("td");
    var frmAddUserButton = document.createElement("form");
    var fntAddUser = document.createElement("font");
    fntAddUser.size = "2";
    fntAddUser.textContent = "Add user:";
    frmAddUserButton.innerHTML = "<input type='button' value='Click to Add User' style='background-color: gainsboro'>";
    frmAddUserButton.style.backgroundColor = "gainsboro";
    frmAddUserButton.addEventListener("click", function() { return; }, true);
    frmUserToAdd = document.createElement("form");
    var tbUserToAdd = document.createElement("input");
    tbUserToAdd.type = "text";
  
    var tblAddUser = document.createElement("table");
    var trAddUser = document.createElement("tr");
    var tdAddUser1 = document.createElement("td");
    var tdAddUser2 = document.createElement("td");
    var tdAddUser3 = document.createElement("td");
  
    tblAddUser.appendChild(trAddUser);
    trAddUser.appendChild(tdAddUser1);
    trAddUser.appendChild(tdAddUser2);
    trAddUser.appendChild(tdAddUser3);
  
    tdUserToAdd.appendChild(tblAddUser);
  
    // Create options table row
  
    frmUserToAdd.appendChild(tbUserToAdd);
    tdAddUser1.appendChild(fntAddUser);
    tdAddUser2.appendChild(frmUserToAdd);
    tdAddUser3.appendChild(frmAddUserButton);
    trLastRow.appendChild(tdUserToAdd);
    tbUserToAdd.addEventListener("change", function(event) { fnAddUserEventListener(event); }, true);
    tbodyKillfile.appendChild(trLastRow);
  
    var tableOptions = document.createElement("table");
    var trOptions = document.createElement("tr");
    var tdOptions = document.createElement("td");
    tdOptions.style.fontSize = "12px";
    var txtCk1 = document.createTextNode(" My Topics");
    var txtCk2 = document.createTextNode(" Recent Posts");
    var bOptions = document.createElement("b");
    bOptions.textContent = "Options: ";
    var txtOptions = document.createTextNode("Also hide posts from killfiled users in ");
    var ckKillMyTopics = document.createElement("input");
    ckKillMyTopics.type = "checkbox";
    ckKillMyTopics.style.verticalAlign = "middle";
    ckKillMyTopics.checked = GM_getValue("killMyTopic");
    ckKillMyTopics.addEventListener("change", function() {GM_setValue("killMyTopic", ckKillMyTopics.checked); }, false);
    var ckKillRecent = document.createElement("input");
    ckKillRecent.type = "checkbox";
    ckKillRecent.style.verticalAlign = "middle";
    ckKillRecent.checked = GM_getValue("killRecentTopic");
    ckKillRecent.addEventListener("change", function() {GM_setValue("killRecentTopic", ckKillRecent.checked); }, false);
    var aHelp = document.createElement("a");    
    aHelp.href = "#killfile";
    aHelp.textContent = "Help";
    aHelp.style.fontSize = "10px";
    aHelp.style.color = "blue";
    aHelp.style.marginLeft = "8px";
    aHelp.addEventListener("click", function(event) {openHelpWindow(); event.preventDefault();}, false);
    aHelp.title = "Show help for these options";
  
    tdOptions.appendChild(bOptions);
    tdOptions.appendChild(txtOptions);
    tdOptions.appendChild(txtCk1);
    tdOptions.appendChild(ckKillMyTopics);
    tdOptions.appendChild(txtCk2);
    tdOptions.appendChild(ckKillRecent);
    tdOptions.appendChild(aHelp);
  
    trOptions.appendChild(tdOptions);
    tableOptions.appendChild(trOptions);
  
  
    // Disallow use of Enter key for adding users to killfile table

    tbUserToAdd.addEventListener("keypress", function(event) { 
	    if (event.keyCode == 13) {
		event.stopPropagation();
		event.preventDefault();
	    }
	}, true);
 
  
    // Populate killfile table with users to be killfiled and create Remove links

    for (var i=0; i<arrUsersToKill.length; i++) {
	var strUsername = arrUsersToKill[i];
	var intRowNum = i;
	var ID = i + 1;
	fnAddRowToKillfile(strUsername, ID, intRowNum);
    }

 
    // Replace Friends table with Killfile table

    var tbodyToReplace = document.evaluate("div[@id='background']/div[@id='forumbody']/center/div[@id='wrapper']/div[4]/div/table/tbody/tr/td[2]/div/div[2]/table/tbody/tr/td[2]/table/tbody",document.body,null,9,null).singleNodeValue;
    tbodyToReplace.style.display = "none";
    tbodyToReplace.parentNode.width = "";
    tbodyToReplace.parentNode.appendChild(tbodyKillfile);
    tbodyToReplace.parentNode.parentNode.appendChild(tableOptions);
}

// Add control for killfiling users to forum posts

var arrBefore = document.evaluate("div[@id='background']/div[@id='forumbody']/center/div[@id='wrapper']/div[4]/div/table/tbody/tr/td[1]/div/div[2]/center/table[position()>1]/tbody/tr/td[2]/table/tbody/tr/td/font/table/tbody/tr/td[1]/font/small/font/small/br[2]",document.body, null, 7, null);

var arrParent = document.evaluate("div[@id='background']/div[@id='forumbody']/center/div[@id='wrapper']/div[4]/div/table/tbody/tr/td[1]/div/div[2]/center/table[position()>1]/tbody/tr/td[2]/table/tbody/tr/td/font/table/tbody/tr/td[1]/font/small/font/small",document.body, null,7,null);

arrLogos = new Array(0);
arrPosters = new Array(0);
arrTxtNodes = new Array(0);

for (var i = 0; i<arrParent.snapshotLength; i++) {
    this["logo" + i] = document.createElement("img");
    this["logo" + i].src = icon;
    this["logo" + i].hspace = "2";
    this["logo" + i].align="absmiddle";
    arrLogos.push(this["logo" + i]);
 
    this["txtNode" + i] = document.createTextNode("Add to killfile");
    arrTxtNodes.push(this["txtNode" + i]);

    this["aPoster" + i] = document.createElement("a");
    this["aPoster" + i].href = "#";
    this["aPoster" + i].appendChild(arrLogos[i]);
    this["aPoster" + i].appendChild(arrTxtNodes[i]);
    arrPosters.push(this["aPoster" + i]);

    arrParent.snapshotItem(i).insertBefore(arrPosters[i], arrBefore.snapshotItem(i));
    arrParent.snapshotItem(i).insertBefore(document.createElement("br"), arrBefore.snapshotItem(i));
}

document.body.addEventListener("mouseup", function(event) {
	if ( event.target.text == "Add to killfile") {
	    var strUserToAdd = event.target.parentNode.parentNode.parentNode.getElementsByTagName("big")[0].textContent;
	    fnAddUserNow(strUserToAdd);
	    fnKillPostsNow(strUserToAdd);
	    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.scrollIntoView(true);
	}
    }, true);


// Add controls to profile pages 

if (document.location.toString().substr(0,62) == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?username=") {

    var intStartIndex = document.URL.indexOf("=") + 1;
    var intEndIndex = document.URL.indexOf(";");
    var strUserToAdd = document.URL.substring(intStartIndex, intEndIndex);
    var oProfileParent = document.evaluate("div[@id='wrapper']/div[4]/div/table/tbody/tr/td[2]/div/div[2]/table/tbody/tr/td[2]/table/tbody/tr[1]/td[1]/div/form/font[2]",document.body,null,9,null).singleNodeValue;
    var logo = document.createElement("img");
    logo.src = icon;
    logo.hspace = "3";
    logo.align = "absmiddle";
    logo.alt = "Killfile";

    oProfileParent.appendChild(document.createElement("br"));
    oProfileParent.appendChild(logo);
  
    var aRemoveFromKillfile = document.createElement("a");
    aRemoveFromKillfile.href = "#";
    aRemoveFromKillfile.textContent = "Remove from Killfile";
    aRemoveFromKillfile.id = "ProfileRemoveControl";
      
    var aAddToKillfile = document.createElement("a");
    aAddToKillfile.href = "#";
    aAddToKillfile.textContent = "Add to Killfile";
    aAddToKillfile.id = "ProfileAddControl";

    var UserIsInKillfile = false;
    loopThru_arrUsersToKill:
    for (var i = 0; i < arrUsersToKill.length; i++) {
	if (strUserToAdd == arrUsersToKill[i]) {
	    var intIndexNum = i;
	    break loopThru_arrUsersToKill;
	}
    }

    UserIsInKillfile = (intIndexNum > -1);

    switch (UserIsInKillfile) {

    case true:   
	oProfileParent.appendChild(aRemoveFromKillfile);
	break;

    case false:
	oProfileParent.appendChild(aAddToKillfile);
	break;

    default:
	break;
    } 
}


// Kill posts from killfiled users when page loads

if (arrUsersToKill.length > 0) {
    fnKillPostsNow();
    if (window.location.href == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=my_topics;") {
	if (GM_getValue("killMyTopic") == true) killMyTopicTopics();
    }
    if (window.location.href == "http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=recent_posts;") {
	if (GM_getValue("killRecentTopic") == true) killRecentPostsTopics();
    }
}
