// ==UserScript==
// @name		OTRS Move plugin
// @version		beta
// @description	OTRS Move plugin
// @author		videns
// @namespace	OTRSPlugin
// @include		https://otrs.masterhost.ru/otrs/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//(c) 2008 Michael Manning 
jQuery.parseQuery=function(A,B){var C=(typeof A==="string"?A:window.location.search),E={f:function(F){return unescape(F).replace(/\+/g," ")}},B=(typeof A==="object"&&typeof B==="undefined")?A:B,E=jQuery.extend({},E,B),D={};jQuery.each(C.match(/^\??(.*)$/)[1].split("&"),function(F,G){G=G.split("=");G[1]=E.f(G[1]);D[G[0]]=D[G[0]]?((D[G[0]] instanceof Array)?(D[G[0]].push(G[1]),D[G[0]]):[D[G[0]],G[1]]):G[1]});return D};


var q = $.parseQuery();
var otrsAction = q.Action;
var ticketID = q.TicketID;

if (otrsAction == "AgentZoom")
{
  var links = "";
 var queueNames = new Array("support_support","support_faq","support_ext","support_problem","win","info","operation","trash");
 var queueID = new Array("74","32","14","36","43","1","80","8");
  for (var i = 0; i < queueNames.length; i++)
  {
    links += '<a href="index.pl?Action=AgentMove&Subaction=InRage&QueueID=2&TicketID=' + ticketID + '&DestQueueID=' + queueID[i] + '">move 2 ' + queueNames[i] + '</a><br/>';
  }
  links += '<br/>';
  $('p b:first').before(links);
}