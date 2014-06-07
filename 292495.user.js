// ==UserScript==
// @name       open session
// @namespace  http://inn.co.il/
// @version    0.0.1
// @run-at         document-end
// @grant       none
// @description  enter something useful
// @match      http://*.inn.co.il/*
// @copyright  2012+, You
// ==/UserScript==

var old = '{ sessionname: t.value }';
var to_new = '(event.ctrlKey?{ session: t.value }:{ sessionname: t.value })';
eval("aUsers.List.WriteNickUpdateGo="+aUsers.List.WriteNickUpdateGo.toString().replace(old,to_new));
old = "oTab.divTab = div;";
to_new = "$(div).click(function(e){if (e.shiftKey&&e.ctrlKey) aSession.List.Add(session); })\n\
oTab.divTab = div";
eval("IMGUI.New="+IMGUI.New.toString().replace(old,to_new));

window.SessionsList = function (div, users, divoptions) { this.div = div; this.users = users, this.divoptions = divoptions; }
SessionsList.prototype = {
    divUser: function (iUser) {
        var user = document.createElement("div"), u = iUser;
        user.className = "out" //"spnUser"+ u.id +"
        user.innerHTML = "<div class=in style=color:green>" + u.name + "</div>";
        user.user = u;
        if (this.divoptions.onclick) $(user).click(this.divoptions.onclick);
        if (this.divoptions.ifbold && this.divoptions.ifbold(u)) $(user).css("font-weight", "bold");
        user.childNodes[0].className = "in c21";
        return user;
    },
    GetById: function(sid){
        for (var i=0;i<this.users.length;i++)
            if (this.users[i].session==sid)
                return this.users[i];
            },
    Update: function (users) {
        //if (users) this.users = users; else users = this.users;
        var sessionStr = INNData.Load("sessionSave");
        sessionStr = (sessionStr==""?"[]":sessionStr);
        this.users = eval(sessionStr);
        var users = this.users;
        //users.sort(function (a, b) { return User.SortUsersFunction(aUsersCache[a], aUsersCache[b]) })
        var div = this.div; $(div).empty();
        var d = document.createDocumentFragment()
        for (var i = 0; i < users.length; i++)
            d.appendChild(this.divUser(users[i]));
        div.appendChild(d);
    },
    Add: function(session){
        var ses = this.GetById(session.id);
        if (ses){
            if(!confirm("הסשן כבר קיים, התרצה לערוך את שמו?")){
                return;               
            }
            session.title = ses.name;
        }
        var name = prompt("תן שם לסשן",session.title);
        if (name==null) return;
        if (!name){
            alert("שם לא יכול להיות ריק");
            return;
        }
        console.log(session);
        if (ses){
            ses.name = name;
        }else{
            this.users.push(new Session(session.id,name));
        }
        INNData.Save("sessionSave","["+this.users+"]");
        this.Update();
    },
    Remove: function(session){
        this.users.splice(this.users.indexOf(session),1);
        INNData.Save("sessionSave","["+this.users+"]");
    },
    WriteNickUpdateGo: function (event) {
        var t = _('txtNewTab'); if (t.value != '') {
            if (t.value[0] == '#') { t.value = t.value.substring(1); event.shiftKey = true; }
            if (event.shiftKey) Poll.NewSession({ sessionname: t.value }, 1);
            else if (event.ctrlKey) {if(confirm("האם אתה בטוח שברצונך לצרף אדם נוסף לשיחה הנוכחית?")) Poll.AddUserToSession(Tabs.Active, t.value);} else IMGUI.NewTabByUser(t.value);
        }
        
        t.value = ''; IMGUI.UpdateUserList();
    }
}

window.Session = function(session,name){this.session= session; this.name= name;}
Session.prototype = {
    toString: function(){
        return "new Session("+this.session+",'"+this.name+"')";
    }
}
var sdiv = document.createElement("div");
sdiv.id = "divSessions";
sdiv.className="Users UsersList";
var sessionStr = INNData.Load("sessionSave");
sessionStr = (sessionStr==""?"[]":sessionStr)
window.aSession = eval(sessionStr);
window.aSession.List = new SessionsList(sdiv, aSession, { onclick: function (event) {
    if (event.ctrlKey&&confirm("בטוח שתרצה למחוק סשן?")){
        window.aSession.List.Remove(this.user);
        window.aSession.List.Update();
    }else{
        IMGUI.OpenSession(this.user.session);
    }
}} );
$(aUsers.List.div).wrap("<div id='usersListP'>")
$('#usersListP').after("<div id=hiddiv>");
$("#hiddiv").hide();
function listenforses(e){
    //shiftAndCtrl = false
    if(e.keyCode==83&&e.shiftKey&&e.ctrlKey){
        if (window.shiftAndCtrl){
            $('#usersListP').html($(aUsers.List.div));
            shiftAndCtrl = false;
            return;
        }
        shiftAndCtrl = true;
        aSession.List.Update();
        $("#hiddiv").html(aUsers.List.div);
        $('#usersListP').html(aSession.List.div);
    }
}
$(document.body).keydown(listenforses);
var EditorDoc= EditorGetDocument(oEditor.id);
$(EditorDoc).keydown(listenforses);