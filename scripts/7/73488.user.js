// ==UserScript==
// @name           ev0.in show highlighter
// @namespace      http://userscripts.org/users/34456
// @include        http://www.ev0.in/*
// ==/UserScript==

var shows = GM_getValue("shows", "No Shows").split(',');

var list = document.getElementById('mainlist');

if(list) {

    GM_addStyle("a.highlight, a.highlight:hover, a.highlight:visited { color: #f00; font-size: 16px }");

    for(var i in list.childNodes) {
        var item = list.childNodes[i];
        if(item.tagName == 'DIV' && item.id == '') {
            var link = item.childNodes[5];
            var showname = item.childNodes[1].id;
            for(var j in shows) {
                if(!showname.indexOf(shows[j])) { //check if starts with show title
                    link.className += ' highlight';
                }
            }
        }
    }
}

function removeConnect() {
    var t = document.getElementById('sb-twitter');
    if(t) {
        var d = t.parentNode.parentNode;
        d.parentNode.removeChild(d);
    }
}

function addShow(p,show,i) {
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var link = document.createElement('a');
    var rem = document.createElement('span');

    link.className = "showname sn2";
    link.id = "show-"+i;
    link.innerHTML = show.replace('.',' ');
    
    rem.className = "button2";
    rem.innerHTML = "remove";
    rem.id = "rem-"+i;
    rem.addEventListener('click', function () {
        var i = this.id.substring(4);
        var p = document.getElementById("show-"+i);
        var sn = p.innerHTML.replace(' ','.');
        var i2 = -1;
        for (i = 0; i < shows.length; i++) {
            if(shows[i] == sn) i2 = i;
        }
        if(i2!=-1) shows.splice(i2,1);
        if (shows.length == 0) { shows[0] = "No Shows";
            addShow(p.parentNode.parentNode.parentNode,"No Shows",0);
        }
        GM_setValue("shows", shows.join(','));
        p.parentNode.parentNode.parentNode.removeChild(p.parentNode.parentNode);
    }, false);

    cell.appendChild(link);
    if(show != "No Shows") cell.appendChild(rem);
    row.appendChild(cell);
    p.appendChild(row);
}

function addMenu() {
    GM_addStyle(".button2 { background: #181819; border: 1px solid #333333; text-transform: lowercase; cursor:hand; padding: 0; margin-left: 1em; color: #fff; font-family: arial, Helvetica, Verdana, Tahoma; font-size: 8pt;}");
    GM_addStyle(".sn2 { display:inline}");
    
    var bar = document.getElementById('sidebar-content');
    
    var d = document.createElement('div');
    d.id = "sidebar-item";
    
    var d2 = document.createElement('div');
    d2.id = "sb-content";
    
    var title = document.createElement('div');
    title.className = "sb-head";
    title.innerHTML = "your shows";
    
    var stitle = document.createElement('span');
    stitle.className = "cal-title";
    stitle.innerHTML = "shows";
    
    var tbl = document.createElement('table');
    tbl.className= "cal-sub";
    tbl.id = "show-tbl";
    
    for(var i=0;i<shows.length;i++) {
        addShow(tbl,shows[i],i);
    }
    
    var st2 = document.createElement('span');
    st2.className = "cal-title";
    st2.innerHTML = "add a show";
    
    var tbl2 = document.createElement('table');
    tbl2.className= "cal-sub";
    
    
    var row2 = document.createElement('tr');
    var cell2 = document.createElement('td');
    var inp = document.createElement('input');
    inp.id = 'show-input';
    inp.className = 'field';
    var b = document.createElement('input');
    b.className = 'button';
    b.type = 'button';
    b.value = "Add";
    b.addEventListener("click", function () {
            var show = document.getElementById('show-input').value.replace(' ','.');
            
            var tbl = document.getElementById("show-tbl");
            addShow(tbl,show,shows.length);
            
            if(shows[0] == "No Shows") {
                shows[0] = show;
                var e = document.getElementById('show-0').parentNode.parentNode;
                e.parentNode.removeChild(e);
            } else {
                shows[shows.length] = show;
            }

            
            GM_setValue("shows", shows.join(','));
            
        }, false);
    cell2.appendChild(inp);
    cell2.appendChild(b);
    row2.appendChild(cell2);
    tbl2.appendChild(row2);
    
    
    d2.appendChild(stitle);
    d2.appendChild(tbl);
    
    d2.appendChild(st2);
    d2.appendChild(tbl2);
    
    
    d.appendChild(title);
    d.appendChild(d2);
    
    bar.appendChild(d);
}

removeConnect();
addMenu();