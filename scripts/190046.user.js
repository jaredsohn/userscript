// ==UserScript==
// @name        K2 Script
// @namespace   tag://kongregate
// @description Script for the guild K2
// @author      Chillyskye
// @version     1.0.3
// @date        03.05.2014
// @grant       none
// @include     http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// ==/UserScript==
function init_k2script () {
    jQuery('<script>').attr('type', 'text/javascript').attr('src', "http://chillyskye.dk/scripts/jquery.html5storage.min.js").appendTo('head');
	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
    window.K2 = {};
    K2.ready = false;
    K2.updateMembers = function(){
        if (typeof K2.membersScript != "undefined") {
            K2.membersScript.remove();
        }
        K2.membersScript = jQuery('<script>').attr('type', 'text/javascript').attr('src', "http://chillyskye.dk/dotd/k2/whitelist.php");
        jQuery('head').append(K2.membersScript);
    }
	K2.updateMembersInterval = dom.setInterval(K2.updateMembers, 600000);
    K2.updateMembers();
    
	dom.K2ScriptexternalsReadyInterval = dom.setInterval(K2ScriptcheckIfexternalsLoaded, 100);
    function K2ScriptcheckIfexternalsLoaded() {
		console.log("[K2 Script] Checking if holodeck loaded");
		if(holodeck.ready && K2.ready) {
			dom.clearInterval(dom.K2ScriptexternalsReadyInterval);
			console.log("[K2 Script] Holodeck loaded");
            dom.CDa = dom.ChatDialogue;
            CDa.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
            startK2Script();
		}
	}
    
    function showMessages() {
        ChatDialogue.MESSAGE_TEMPLATE.K2_evaluate_old = ChatDialogue.MESSAGE_TEMPLATE.evaluate;
        ChatDialogue.MESSAGE_TEMPLATE.evaluate = function(args){
            var mutik = args.username.split(' ');
            args.username = mutik[mutik.length-1];
            if ((typeof window.SRDotDX !== 'undefined') && args.username == holodeck.username()) {
                args.userClassNames += ' is_self';
            }
            var date = new Date();
            date = new Date(Date.now() + date.getTimezoneOffset()*60000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var time;
            time = (hours<10?"0":"")+hours+":"+(minutes<10?"0":"")+minutes+":"+(seconds<10?"0":"")+seconds;
            args.time = time;
            var found = false;
            jQuery.each(K2.members,function(index,member) {
                if (member.kong.toLowerCase() == args.username.toLowerCase()) {
                    args.ign = member.ign;
                    found = true;
                    return false;
                }
            });
            if (found) {
                if (typeof window.SRDotDX === 'undefined') {
                    ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#{classNames}"><span style="float: left; color: #999999">[#{time}]&nbsp;</span><span username="#{username}" class="username #{userClassNames}">#{prefix}#{username}</span><span style="float:left">&nbsp;(#{ign})</span><span class="separator">: </span><span class="message">#{message}</span><span class="clear"></span></p>'
                } else {
                    ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#{classNames}"><span style="color: #999999">[#{time}]&nbsp;</span><span username="#{username}" class="username #{userClassNames}">#{prefix}#{username}</span><span>&nbsp;(#{ign})</span><span class="separator">: </span><span class="message">#{message}</span><span class="clear"></span></p>'
                }
            } else {
                if (typeof window.SRDotDX === 'undefined') {
                    ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#{classNames}"><span style="float: left; color: #999999">[#{time}]&nbsp;</span><span username="#{username}" class="username #{userClassNames}">#{prefix}#{username}</span><span class="separator">: </span><span class="message">#{message}</span><span class="clear"></span></p>'
                } else {
                    ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#{classNames}"><span style="color: #999999">[#{time}]&nbsp;</span><span username="#{username}" class="username #{userClassNames}">#{prefix}#{username}</span><span class="separator">: </span><span class="message">#{message}</span><span class="clear"></span></p>'
                }
            }
            return this.K2_evaluate_old(args);
        };
    }
    
    function checkIfMutikHasChangedMessageTemplate() {
        if (ChatDialogue.MESSAGE_TEMPLATE.template == '<p class="#{classNames}"><span class="timestamp">#{timestamp}</span><span class="room">#{room}</span></span><span class="username #{username}" oncontextmenu="return false;">#{prefix}#{username}</span><span class="separator">: </span><span name="SRDotDX_#{username}" class="message">#{message}</span><span class="clear"></span></p>') {
            showMessages();
        } else {
            setTimeout(checkIfMutikHasChangedMessageTemplate,100);
        }
    }
    
    function startK2Script() {
        if (typeof window.SRDotDX === 'undefined') {
            showMessages();
        } else {
            checkIfMutikHasChangedMessageTemplate();
        }
    }
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ init_k2script +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
