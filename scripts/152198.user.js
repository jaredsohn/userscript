// ==UserScript==
// @name        MTurk Service Status
// @namespace   localhost
// @description Adds MTurk Service Health RSS feed to your dashboard
// @author      ThirdClassInternationalMasterTurker 
// @include     https://www.mturk.com/mturk/dashboard
// @version     1.2
// @downloadURL https://userscripts.org/scripts/source/152198.user.js
// @updateURL   https://userscripts.org/scripts/source/152198.user.js
// ==/UserScript==

// 2012-11-11 First public release by ThirdClassInternationalMasterTurker
//
// 2012-11-15 1.1: Colour changes
//
// 2012-12-02 1.2: Added @downloadURL and @updateURL
//

var ret = GM_xmlhttpRequest({
  method: "GET",
  url: "http://status.aws.amazon.com/rss/mturk-worker.rss",
  onload: function(res) {
    add_rss(res.responseText);
  }
});



function add_rss(rss)
{
  var page_xml = document.createElement('div');
  page_xml.innerHTML = rss;
 
  var footer = document.getElementsByClassName('footer_separator')[0];
  if (footer == null)
    return;
 
  var extra_table = document.createElement('table');
  extra_table.width = '700';
  extra_table.style.boder = '1px solid black';
  extra_table.align = 'center';
  extra_table.cellSpacing = '0px';
  extra_table.cellPadding = '0px';

  var row1 = document.createElement('tr');
  var row2 = document.createElement('tr');
  var td1 = document.createElement('td');
  var content_td = document.createElement('td');
  var whatsthis = document.createElement('a');

  row1.style.height = '25px';
  td1.setAttribute('class', 'white_text_14_bold');
  td1.style.backgroundColor = '#7fb448';//'#7fb4cf';
  td1.style.paddingLeft = '10px';
  td1.innerHTML = 'MTurk Status Feed ';
  td1.title = 'Current service status feed for Amazon Mechanical Turk (Worker)';
  content_td.setAttribute('class', 'container-content');  
  
  whatsthis.href = 'http://status.aws.amazon.com/';
  whatsthis.title = 'Go to AWS Service Health Dashboard';
  whatsthis.setAttribute('class', 'whatis');
  whatsthis.textContent = '(AWS Service Health Dashboard)';
  
  extra_table.appendChild(row1);
  row1.appendChild(td1);
  td1.appendChild(whatsthis);
  extra_table.appendChild(row2);
  row2.appendChild(content_td);
  
  var colors = ['#000000','#222222','#333333','#444444','#555555'];
  var items = page_xml.getElementsByTagName('item');
  
  if (items == null)
  {
    content_td.innerHTML = 'Error loading <a href="http://status.aws.amazon.com/rss/mturk-worker.rss">http://status.aws.amazon.com/rss/mturk-worker.rss</a>';
  }
  else
  {
    for (var i=0; i<items.length; i++)
    {
      var c = colors[i] || '#666666';
      var title = items[i].getElementsByTagName('title')[0].textContent;
      //var link = items[i].getElementsByTagName('link')[0].textContent;
      var date = items[i].getElementsByTagName('pubDate')[0].textContent;
      //var guid = items[i].getElementsByTagName('guid')[0].textContent;
      var description = items[i].getElementsByTagName('description')[0].textContent;

      content_td.innerHTML += '<span style="color: ' + c + '" title="' + description + '"><b>' + date + '</b>: ' + title + '</span><br>';
    }
  }

  footer.parentNode.insertBefore(extra_table, footer); 
}
