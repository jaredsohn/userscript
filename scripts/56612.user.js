// ==UserScript==
// @name           GLB Export DPC 
// @namespace      GLB
// @description    Exports all DPC to another team
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// ==/UserScript==
// 
// 

function add_title(){
    var insertbefore = getElementsByClassName("button left", document);
    var title = document.createElement("div")
    title.innerHTML = '<div class="small_head">To transfer to another team, select the icon of the team to send the playbook to, and hit "Transfer Playbook")<br/><br/></div>'
    var Spacer = document.createElement("div")
    Spacer.setAttribute('id', 'SpacerNode');
    Spacer.innerHTML = '<br>';
    title.appendChild(Spacer);
    var subpagehidden = document.createElement("input");
    subpagehidden.setAttribute("name", "hiddentextname");
    subpagehidden.setAttribute("type", "text");
    subpagehidden.setAttribute("id", "hiddentext")
    var tranbutton = document.createElement('input');
    tranbutton.setAttribute('id', 'TranButton');
    tranbutton.setAttribute('type', 'button');
    tranbutton.setAttribute('value', 'Transfer Playbook');
    tranbutton.addEventListener('click', doTransfer, false);
    title.appendChild(tranbutton);
    title.appendChild(subpagehidden);
    var Spacer2 = document.createElement("div")
    Spacer2.setAttribute('id', 'SpacerNode');
    Spacer2.innerHTML = '<br>';
    title.appendChild(Spacer2);
    var insertpoint = insertbefore[0];
    insertpoint.parentNode.insertBefore(title, insertpoint);
    var headerrow = getElementsByClassName('nonalternating_color', document);
    headerrow[1].innerHTML += '<td width="5%">Export</td>';
    var playbuild = getElementsByClassNameMulti('alternating_color1', 'alternating_color2', document);
    for (var z=0;z<playbuild.length;z++) {
        var playid = playbuild[z].innerHTML.substring(playbuild[z].innerHTML.indexOf('play_id=') + 8, playbuild[z].innerHTML.indexOf('"', playbuild[z].innerHTML.indexOf('play_id=') + 8));
        var tablerow = document.createElement('td');
        tablerow.setAttribute('align', 'center');
        var chkbox = document.createElement('input');
        chkbox.setAttribute('type', 'checkbox');
        chkbox.setAttribute('id', 'chkbox' + playid);
        chkbox.checked = true;
        tablerow.appendChild(chkbox);
        playbuild[z].appendChild(tablerow);
    }
};

function buttonsel(){
    var hiddenvalue = document.getElementById('hiddentext');
    var deselect = getElementsByClassName('team_planner',document)
    
   for (var i = 0; i < deselect.length; i++) {
   	var des = deselect[i];
   	des.setAttribute("style", "opacity:0.3;margin: 5px 5px 5px 5px")
   	des.setAttribute("height", "75")
   	des.setAttribute("width", "75")
   }
	   
   var team_icon = document.getElementById(hiddenvalue.value)
   team_icon.setAttribute("style", "opacity:1.0;margin: 5px 5px 5px 5px;")
   team_icon.setAttribute("width", "75")
   team_icon.setAttribute("height", "75")
}

function playbook_exporter(team_id)
{
    var button = document.createElement("img")
    button.setAttribute("id",team_id)
    button.setAttribute("class","team_planner")
    button.setAttribute("height", "75")
    button.setAttribute("width", "75")
    button.setAttribute("style", "opacity:0.3;margin: 5px 5px 5px 5px")
    button.setAttribute("src","http://goallineblitz.com/game/team_pic.pl?team_id=" + team_id)
    button.addEventListener('click',function (e) {document.getElementById('hiddentext').value=team_id; buttonsel();},false)
    
    var insertbefore = document.getElementById('SpacerNode');
    insertbefore.parentNode.insertBefore(button, insertbefore);

  
};


function export_playbook(num)
{	
  
           var node_list = document.getElementsByTagName('input');
           for (var i = 0; i < node_list.length; i++) {
               var node = node_list[i];
               if (node.getAttribute('name') == 'team_id') {
                   node.value = num;
               }
           }
        
           var butclick = document.getElementsByName('action');
           
           butclick[0].click()
           self.close()
     
};


function getElementsByClassName(classname, par)
{
    var a=[];   
    var re = new RegExp('\\b' + classname + '\\b');
    var els = par.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++) 
    {       
        if(re.test(els[i].className)) 
        {	
            a.push(els[i]);
        }
    }
    return a;
};


function getElementsByClassNameMulti(classname,classname1, par)
{
    var a=[];   
    var re = new RegExp('\\b' + classname + '\\b');
    var re1 = new RegExp('\\b' + classname1 + '\\b');
    var els = par.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++) 
    {       
        if(re.test(els[i].className) || re1.test(els[i].className)) 
        {	
            a.push(els[i]);
        }
    }
    return a;
};

function getElementsByType(typename, par)
{
    var a=[];   
    var re = new RegExp('\\b' + typename + '\\b');
    var els = par.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++) 
    {       
        if(re.test(els[i].type)) 
        {	
            a.push(els[i]);
        }
    }
    return a;
};






function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}


function doTransfer(){
    
    var playrows = getElementsByClassNameMulti('alternating_color1', 'alternating_color2', document);
    var selteamid = document.getElementById('hiddentext').value;
    var checkboxes = getElementsByType('checkbox', document);
    var answer = confirm('Transfering this playbook will take approx ' + (playrows.length * 1.5) + ' secs. You will have an alert box open when the process has completed. Please make sure pop-up blocker is disabled for this process to work. would you like to continue?');
    if (answer) {
        if (selteamid.value != '') {
            var cookiearr = '';
            for (var t=0;t<playrows.length;t++) {
                if (checkboxes[t].checked==true) {
                    var playlinks = playrows[t].getElementsByTagName('a');
                    cookiearr += playlinks[0].href + ',';
                }
            }
            GM_setValue('playslist', cookiearr);
            GM_setValue('transto',selteamid);
            for (var q = 0; q<playrows.length;q++) {
                if (checkboxes[q].checked==true) {
                    var playlinks = playrows[q].getElementsByTagName('a');
                    
                    var newwindow2 = window.open(playlinks[0].href,"Defensive Play Creator Play Transfer" + q, "width=400,height=200,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
                    if (!newwindow2.opener) newwindow2.opener = self;
                }
            }
        
        }
        
        
        alert('Transfer of Custom D Plays has completed!!! Now moving you to the custom d plays for the transfered to team.');
        window.location.href = "http://goallineblitz.com/game/team_create_defense.pl?team_id=" + selteamid;
    }else{
        window.location.reload();
    }

};


if ((window.location.href.indexOf('&') ==-1) || (window.location.href.indexOf('&play_id=0') > 0)) {
    
    if (window.location.href.indexOf('&play_id=0') > 0) {

        var curid = window.location.href.substring(window.location.href.indexOf('team_id=')+8, window.location.href.indexOf('&'));
    }else{
    
        var curid = window.location.href.substring(window.location.href.indexOf('team_id=')+8, window.location.href.length);
    }
    
    var checkedarray = new Array;

    add_title();
    
    
    
    GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://goallineblitz.com/game/home.pl',
       headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
           'Accept': 'application/atom+xml,application/xml,text/xml',
       },
       onload: function(teams) {
        var response1=teams.responseText;
        
        var team=response1.split('/team_finances.pl?team_id=');
        
        for(var i=0; i<team.length; i++){
            var test = team[i+1].split('">', 2);
            var test2 = test[0];
            if (test2 != curid) {
                playbook_exporter(test2);
            }
            }
        } 
    });
    

}else{
    var playlist = GM_getValue('playslist', '');
    var teamimpid = GM_getValue('transto', '');
    if (playlist != '' && teamimpid != '') {
        if (playlist.indexOf(window.location.href + ',') > -1) {
            playlist = playlist.replace(window.location.href+',','');
            GM_setValue('playslist', playlist);
            export_playbook(teamimpid);
        }
    }

}

