// ==UserScript==
// @name           Sort TA To-Do List
// @namespace      http://giggas2.dyndns.org
// @include        http://www.trueachievements.com/todolist.aspx
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Add Tablesorter jQuery plugin.
// Check if jQuery's loaded
function wait()
{
   var jQueryEnabled = (typeof unsafeWindow.jQuery != 'undefined');
   if (jQueryEnabled)
   {
      var tablesorterEnabled = (typeof unsafeWindow.jQuery.tablesorter != 'undefined');
   }

   if (!jQueryEnabled)
   {
      unsafeWindow.setTimeout(wait, 100);
   }
   else if (jQueryEnabled && !tablesorterEnabled)
   {
      var GM_TS = document.createElement('script');
      GM_TS.src = 'http://tablesorter.com/__jquery.tablesorter.js';
      GM_TS.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(GM_TS);

      // Add cookie jQuery plugin
      var GM_CO = document.createElement('script');
      GM_CO.src = "https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js";
      GM_CO.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(GM_CO);

      //Soap plugin
      var GM_SP = document.createElement('script');
      GM_SP.src = "https://raw.github.com/gist/1038878/98794609279339ab353bb320ae2e5bda104e1b68/jqSOAPClient.js";
      GM_SP.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(GM_SP);

      unsafeWindow.setTimeout(wait, 100);
   }
   else
   {
      $ = unsafeWindow.jQuery;
      letsJQuery();
   }
}

wait();

function letsJQuery() {
   $(function() {
         //make TA list work with THEAD/TBODY
         var thead = $('<thead id="head"></thead>');
         var list = $('#oSmallList');
         var tr = $('tr.NoDrop');
         //make sure columns line up
         var nullColumn = $('<th/>');
         nullColumn.insertBefore($('.left'));
         $('.left').attr('colspan',1);

         thead.prependTo(list);
         tr.detach().appendTo(thead);

         // Apply tablesorter.
         list.tablesorter().addClass('tablesorter');
         list.bind("sortEnd", function() {
            var hashKey = $.cookie("HashKey");
            var position = 1;
            var regex = /[0-9]+/;
            $('tr#*[id^=ach]').each( function() {
               var achID = regex.exec($(this).attr('id'))[0];
               updateGame(hashKey, position, achID);
               position++;
               });
            alert("Sort is complete.");
            });
   }
   );
}

function updateGame(hashKey, position, achID)
{
   var soapMessage =
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ReOrderToDoList xmlns="http://tempuri.org"><AchievementID>'+achID+'</AchievementID><Position>'+position+'</Position><HashKey>'+hashKey+'</HashKey></ReOrderToDoList></soap:Body></soap:Envelope>';

   $.ajax({
      type: "POST",
      async: false,
      url: unsafeWindow.GetRootFolder()+'/ta.asmx',
      dataType: "text/xml",
      contentType: "text/xml",
      data: soapMessage
   });
}
