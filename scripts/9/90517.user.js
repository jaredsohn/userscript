// JavaScript Document
// ==UserScript==
// @name Ikariam Message Formatter
// @author krwq
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage http://userscripts.org/scripts/show/90517
// @description Ability to send & receive in-game messaging with html formatting
// @include http://s*.ikariam.*/*
// @require http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version 2.01
// @exclude http://board.ikariam.*/*
// @exclude http://support*.ikariam.*/*
//
// @history 2.01 Deleted auto update (someone has deleted script)
// @history 2.00 Script is rewritten, but based on holyschmidt's code
//
// ==/UserScript==


const BEGIN_TAG = "&lt;MessageFormatter&gt;";
const   END_TAG = "&lt;/MessageFormatter&gt;";
const FORBIDDENINTAG = ["script","onload","onmouse","onkey","onclick","onerror"];

MessageFormatter =
{
  init:function()
  {
    switch($('body').attr('id'))
    {
      case 'diplomacyAdvisor':
      case 'diplomacyAdvisorOutBox':
        MessageFormatter.parseMessages();
        break;
      default: break;
    }
  },
  formatContent:function(html)
  {
   var newhtml = html.replace(/<br \/>/g,'\n').replace(/&lt;/g,"<").replace(/&gt;/g,">");
   //alert(newhtml);
   var p = -1;
   while (1)
    {
     p = newhtml.indexOf('<',p+1);
     if (p==-1)
       break;
     var p2 = newhtml.indexOf('>',p+1);
     if (p2==-1)
      {
       newhtml[p] = '?';
       break;
      }
     var tag = newhtml.substr(p+1,p2-p-1).toLowerCase().trim();
     //alert(tag);
     for (var i=0; i<FORBIDDENINTAG.length; i++)
      {
       if (tag.indexOf(FORBIDDENINTAG[i])!=-1)
         return '<font color="red"><b>This content may be dangerous and it\'s internally blocked by MessageFormatter!</b></font>';
      }
    }
   //alert(newhtml);
   return newhtml;
  },
  parseMessages:function()
  {
    $("td.msgText div").each(function()
    {
      var html = $(this).html();
      var p = html.indexOf(BEGIN_TAG);
      while (p!=-1)
        {
          var p2 = html.indexOf(END_TAG);
          if (p2==-1)
            break;
          //----
          var formatcontent = html.substr(p+BEGIN_TAG.length,p2-p-BEGIN_TAG.length);
          var onleft  = html.substr(0,p);
          var onright = html.substr(p2+END_TAG.length);
          html = onleft+MessageFormatter.formatContent(formatcontent)+onright;
          //----
          p = html.indexOf(BEGIN_TAG);
        }
      $(this).html(html);
    });
  }
};

MessageFormatter.init();
