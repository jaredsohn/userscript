// ==UserScript==
// @name           eslsort
// @namespace      eslsort
// @include        http://www.esl.eu/fr/css/1on1/eas/rankings/
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        var table = $('table').eq(4);
        var pair = false;
        var menu = '<tr bgcolor="#cccccc"><td align="center" class="table1_header">#</td><td align="center" class="table1_header">Points</td><td align="left" class="table1_header"> Name</td><td align="center" colspan="3" class="table1_header">Matches</td></tr>';
        var resultat = "";
        var cpt = 1;
       function printEltSort(element, index, array) {
          if (cpt%2) element = element.replace(/e3e0dd/g,'f5f4f3')
          resultat = element.replace(/#num#/g,cpt) + resultat;
          cpt -= 1;
        }
        
        table.before("<textarea id=tableresult style='width:715px;height:50px;'></textarea>");
        
          var sorttable = new Array();
          var i=0;
          $('tbody>tr',table).each(function(){
            if ($(this).children().size() == '11')
            {
              i=i+1;
              
              $('td',this).eq(0).html('#num#');
              $('td',this).eq(10).remove();
              $('td',this).eq(10).remove();
              $('td',this).eq(10).remove();
              $('td',this).eq(10).remove();
              $('td',this).eq(10).remove();
             
              
              //on recupere les points
              point = $('td',this).eq(1).html().split('<')[0];
              html1 = $(this).html().split('<script')[0];
              html2 = $(this).html().split('</script>')[1];
              while (sorttable[point])
                point++;
              
              sorttable[point] = "<tr bgcolor='#e3e0dd'>"+html1+html2+"</tr>";
              
              $(this).remove();
            }
          })
          cpt = i;
        //on parcourt le tableau et on insert les TR
          sorttable.forEach(printEltSort)
          table.html(menu+resultat);
         $("#tableresult").val("<table>"+menu+resultat+"</table>");
       
    }
