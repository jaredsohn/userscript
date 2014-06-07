// ==UserScript==
// @name       BBF-tweaks
// @namespace  http://buzzer-manager.com/
// @version    0.3
// @description  Some enhancements for the BuzzerBeaterFrance forum
// @match      http://buzzerbeaterfrance.forumpro.fr/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, sailor_man
// ==/UserScript==

(function(d) {
    
    var teamNames = new Array(); 
    
    String.prototype.splice = function( idx, rem, s ) {
        return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};
    
    function addTeamLink(node) {        
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            
            if(child.innerHTML == "Mon Club") {
                var lignes = child.parentNode.parentNode.innerHTML.split("<br>");
                for (var j = 0; j < lignes.length; j++) {
                    if((lignes[j].indexOf("Mon Club") != -1) && (lignes[j].indexOf("Mon Club Utopia") == -1))
                    {
                        var elements = lignes[j].split("</span>");
                        if(elements.length === 3) {
                            teamName = elements[2].substring(1);
                            buzzermanagerApi.getTeamId(teamName, 
                                                       child.parentNode.parentNode, 
                                                       'team');
                        }
                        break
                    }
                }
                return true;
            }
            
            var succes = addTeamLink(child);
            if(succes)
               return true;
        }
    }
    
    function addUtopiaTeamLink(node) {        
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            
            if(child.innerHTML == "Mon Club Utopia") {
                var lignes = child.parentNode.parentNode.innerHTML.split("<br>");
                for (var j = 0; j < lignes.length; j++) {
                    if(lignes[j].indexOf("Mon Club Utopia") != -1)
                    {
                        var elements = lignes[j].split("</span>");
                        if(elements.length === 3) {
                            teamName = elements[2].substring(1);
                            buzzermanagerApi.getTeamId(teamName, 
                                                       child.parentNode.parentNode, 
                                                       'utopiaTeam');
                        }
                        break
                    }
                }
                return true;
            }
            
            var succes = addUtopiaTeamLink(child);
            if(succes)
               return true;
        }
    }
    
    function insertTeamLink(teamName, teamId, node, teamType) {      
        var label = "Mon Club";
        if(teamType === 'utopiaTeam') label = "Mon Club Utopia";
        
        if(teamId != -1) {
            $(node).find('span:contains("'+label+'")').first().next().before(' <a href="http://www.buzzerbeater.com/team/' + 
                                                   teamId + '/overview.aspx"><img src="http://www.buzzer-manager.com/api/bb_logo.png"/></a>');
        }
        else {
            $(node).find('span:contains("'+label+'")').first().next().before(' <a href="http://www.buzzerbeater.com/community/search.aspx">' + 
                                                   '<img src="http://www.buzzer-manager.com/api/bb_logo_search.png"/></a>');
        }
    }
    
    var buzzermanagerApi = {
        getTeamId: function(teamName, node, teamType) {
            var api = 'http://www.buzzer-manager.com/api/getTeamId.php?teamName=' + encodeURIComponent(teamName);
            
            GM_xmlhttpRequest({
                method: "GET",
                url: api,
                onload: function(response) {
                    var data = eval('('+response.responseText+')');
                    if(data.errorCode == 0) {
                        teamId = data.results.teamId;
                        teamNames[teamName] = teamId;
                        insertTeamLink(teamName, teamId, node, teamType);
                    }
                    else {
                        insertTeamLink(teamName, -1, node, teamType);
                    }
                }
            });
        }
    }
    
    var users = new Array();
	users.push.apply(users, document.getElementsByClassName('postprofile'));
    
    for(var i=0; i<users.length; i++) {
        var user = users[i];
		addTeamLink(user);
        addUtopiaTeamLink(user);
    }
    
})(document);