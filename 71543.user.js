// ==UserScript==
// @name        points
// @namespace   http://michael-ventura.com
// @description adds points to dailyburn nutrition tables
// @include     http://dailyburn.com/nutrition*
// @author      Michael Ventura
// ==/UserScript==

(function () 
{
  if(!document.body)
    return;
  var addPrototype = true;
  var scriptTags = document.getElementsByTagName('script');  
  for(i in scriptTags) 
  {  
    if( scriptTags[i].src && scriptTags[i].src.match(/prototype.*?\.js/) )   
      addPrototype = false;  
  }  
  if(addPrototype) 
  {
    var script = document.createElement('script');
    script.src = 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.1/prototype.js'; 
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  window.addEventListener('load', function(event) 
  {
    if (navigator.userAgent.indexOf("Firefox")!=-1)
    {
      $ = unsafeWindow['window'].$;
      $$ = unsafeWindow['window'].$$;
    }
    var div=$('food_log_entries');
    var calHeader = div.select('th.alt')[0];
    calHeader.insert({before: '<th>Points</th>'});
    calHeader.parentNode.select('th').invoke('toggleClassName','alt');
    var total = 0;
    div.select('tbody tr').each(function(row)
    {
      var columns = row.select('td');
      var calTd = columns[2];
      var cal = parseInt(calTd.textContent);
      var fat = parseInt(columns[3].textContent);
      var fiber = parseInt(columns[6].textContent);
      var points = Math.round((cal / 50) + (fat/12) - ((fiber > 4 ? 4 : fiber)/5));
      total+= points;
      calTd.insert({before: '<td>'+points+'</td>'});
    });
    div.select('tbody tr td').invoke('toggleClassName','alt');
    var totalCalTh = div.select('tfoot tr.meal_totals th.alt')[0];
    totalCalTh.insert({before: '<th>'+Math.round(total)+'</th>'});
    div.select('tfoot tr th').invoke('toggleClassName','alt');
  }, 'false');
})();