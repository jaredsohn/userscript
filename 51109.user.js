// ==UserScript==
// @name           Better Notefish
// @namespace      danieldesch[at]gmx[dot]de
// @include        http://www.notefish.com/notes.php?p=*
// ==/UserScript==


var sortType, sortOrder, sortIndex;
//default sort order for first use
sortType="modified";// = date
sortOrder="desc";// = descending
sortIndex=1;// = index of the radiobox for modified --> desc

var img_asc = "http://www.notefish.com/images/pl-sort-asc.png";
var img_desc = "http://www.notefish.com/images/pl-sort-desc.png";

function sendRequest(url,callback,postData) {
    var req = new XMLHttpRequest();
    if (!req) return;
    var method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    if (postData) req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304)
        {
            alert('HTTP error ' + req.status);
            return;
        }
        callback(req);
    }
    if (req.readyState == 4) return;
    req.send(postData);
}
function createTopToolbar(req)
{
    // overwrite function to be able to change the "BottomToolbar" into a "HeadToolbar"
    unsafeWindow.BottomToolbar.prototype._posVrt=function(){}

    // margin for the "HeadToolbar"
    var body = document.getElementsByTagName('body')[0];
    body.style.marginTop = "70px";

    var selection = document.createElement("select");
    selection.id = "projectSelection";
    selection.addEventListener("change",function(){top.location.href=this.options[this.selectedIndex].value;},true);
    var urlArr = top.location.href.split("=");
    var projects = req.responseXML.getElementsByTagName("project");
    for(var i=0;i<projects.length;i++)
    {
        var p = projects[i];
        var id, name;
        id = p.getAttribute('id');
        name = p.firstChild.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.value = "http://www.notefish.com/notes.php?p="+ id;
        opt.innerHTML = name;
        if (urlArr[1]==id) opt.selected = true;
        selection.appendChild(opt);
    }
    var sp = document.createElement("span");
    var st = sp.style;
    st.padding = "3px 2px 5px 2px";
    st.backgroundColor = "#e3f1ff";
    st.border = "solid 1px #0066cc";
    st.borderBottomWidth = "0px"
    st.cssFloat = "left";
    sp.innerHTML = "Show Project: ";
    sp.appendChild(selection);

    var note_tools = document.getElementById('note-tools');
    note_tools.style.top = "10px";
    note_tools.style.left = "10px";
    var table =  note_tools.childNodes[1];
    table.style.borderTopWidth = "0px";
    table.style.width = "100%";
    table.style.clear = "left";
    var c = table.rows[0].insertCell(-1);
    for(var i=0;i<2;i++)
    {
        var st = table.rows[0].cells[i].style
        st.whiteSpace = "nowrap";
        st.width = "1%";
    }
    note_tools.insertBefore(sp,table);

    var r = document.createElement("input");
    r.type = "radio";
    r.name = "sortorder";
    r.value = "modified|asc";
    r.addEventListener("change",function(){var tempArr = this.value.split("|");GM_setValue("sortType", tempArr[0]);GM_setValue("sortOrder", tempArr[1]);GM_setValue("sortIndex",0);sendRequest("x-projects.php?page=0&size=1000&sort="+ GM_getValue("sortType",sortType) +"&order="+ GM_getValue("sortOrder",sortOrder),updateDropDownList); },true);
    var img = document.createElement('img');
    img.src = img_asc;
    img.alt = "ascending";
    sp.appendChild(r);
    sp.appendChild(document.createTextNode("date "));
    sp.appendChild(img);

    var r = document.createElement("input");
    r.type = "radio";
    r.name = "sortorder";
    r.value = "modified|desc";
    r.addEventListener("change",function(){var tempArr = this.value.split("|");GM_setValue("sortType", tempArr[0]);GM_setValue("sortOrder", tempArr[1]);GM_setValue("sortIndex",1);sendRequest("x-projects.php?page=0&size=1000&sort="+ GM_getValue("sortType",sortType) +"&order="+ GM_getValue("sortOrder",sortOrder),updateDropDownList); },true);
    var img = document.createElement('img');
    img.src = img_desc;
    img.alt = "descending";
    sp.appendChild(r);
    sp.appendChild(document.createTextNode("date "));
    sp.appendChild(img);

    var r = document.createElement("input");
    r.type = "radio";
    r.name = "sortorder";
    r.value = "name|asc";
    r.addEventListener("change",function(){var tempArr = this.value.split("|");GM_setValue("sortType", tempArr[0]);GM_setValue("sortOrder", tempArr[1]);GM_setValue("sortIndex",2);sendRequest("x-projects.php?page=0&size=1000&sort="+ GM_getValue("sortType",sortType) +"&order="+ GM_getValue("sortOrder",sortOrder),updateDropDownList); },true);
    var img = document.createElement('img');
    img.src = img_asc;
    img.alt = "ascending";
    sp.appendChild(r);
    sp.appendChild(document.createTextNode("name "));
    sp.appendChild(img);

    var r = document.createElement("input");
    r.type = "radio";
    r.name = "sortorder";
    r.value =  "name|desc";
    r.addEventListener("change",function(){var tempArr = this.value.split("|");GM_setValue("sortType", tempArr[0]);GM_setValue("sortOrder", tempArr[1]);GM_setValue("sortIndex",3);sendRequest("x-projects.php?page=0&size=1000&sort="+ GM_getValue("sortType",sortType) +"&order="+ GM_getValue("sortOrder",sortOrder),updateDropDownList); },true);
    var img = document.createElement('img');
    img.src = img_desc;
    img.alt = "descending";
    sp.appendChild(r);
    sp.appendChild(document.createTextNode("name "));
    sp.appendChild(img);
    document.getElementsByName('sortorder')[GM_getValue("sortIndex",sortIndex)].checked = "checked";
    // expand "search-form" on the project sites
    expandSearchForm();
}

// update the sorting of the selection list
function updateDropDownList(req)
{
    var selection = document.getElementById("projectSelection");
    var projects = req.responseXML.getElementsByTagName("project");
    var anzProjects = projects.length;
    // delete the opts
    for(var i=0;i<anzProjects;i++)
    {
        selection.removeChild(selection.firstChild);
    }
    var urlArr = top.location.href.split("=");
    // build the new sorting
    for(i=0;i<anzProjects;i++)
    {
        var p = projects[i];
        var id, name;
        id = p.getAttribute('id');
        name = p.firstChild.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.value = "http://www.notefish.com/notes.php?p="+ id;
        opt.innerHTML = name;
        if (urlArr[1]==id) opt.selected = true;
        selection.appendChild(opt);
    }
}
function expandSearchForm()
{
    // expand the "search-form" with 2 radio buttons and a checkbox
    var search = document.getElementById('search-form');
    var r = document.createElement('input');
    r.type = "radio";
    r.name = "st";
    r.value = "tag";
    r.checked = "checked";
    r.addEventListener("click",function(){document.getElementById('public').disabled=false;},true);
    search.appendChild(r);
    search.appendChild(document.createTextNode("Tags"));

    var r = document.createElement('input');
    r.type = "radio";
    r.name = "st";
    r.value = "full";
    r.addEventListener("click",function(){var e=document.getElementById('public'); e.disabled=true; e.checked=false;},true);
    search.appendChild(r);
    search.appendChild(document.createTextNode("Notes"));

    var chkbox = document.createElement('input');
    chkbox.type = "checkbox";
    chkbox.name = "public";
    chkbox.id = "public";
    search.appendChild(chkbox);
    search.appendChild(document.createTextNode("Search public pages"));
}
sendRequest("x-projects.php?page=0&size=1000&sort="+ GM_getValue("sortType",sortType) +"&order="+ GM_getValue("sortOrder",sortOrder),createTopToolbar);