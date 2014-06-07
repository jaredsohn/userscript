// ==UserScript==
// @name           CodebaseHQ Tickets+
// @namespace      overkill_gm
// @include        http*://*.codebasehq.com/*/tickets*
// @version        0.3
// @description    Sort CodebaseHQ tickets, inline search, depaginate
// ==/UserScript==

function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}

function $(a) { return document.getElementById(a); }
function $x( xpath, root ) { var doc = root ? root.evaluate ? root : root.ownerDocument : document, next; var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = []; switch (got.resultType) { case got.STRING_TYPE: return got.stringValue; case got.NUMBER_TYPE: return got.numberValue; case got.BOOLEAN_TYPE: return got.booleanValue; default: while (next = got.iterateNext()) result.push( next ); return result; } } 
function $X(xpath,root){var doc=root?root.evaluate?root:root.ownerDocument:document,next;var got=doc.evaluate(xpath,root||doc,null,0,null);switch(got.resultType){case got.STRING_TYPE:return got.stringValue;case got.NUMBER_TYPE:return got.numberValue;case got.BOOLEAN_TYPE:return got.booleanValue;default:return got.iterateNext()}}
function node(type, className, styles, content) { var n = document.createElement(type||"div"); if (className) n.className = className; if (styles) for (var prop in styles) n.style[prop] = styles[prop]; if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString(); return n; } 
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }


var sorts = {
  Status : {
    'NEW'         : 0,
    'ACCEPTED'    : 1,
    'IN PROGRESS' : 2,
    'COMPLETED'   : 3,
    'INVALID'     : 4,
  },
  Priority :  {
    'LOW'      : 0,
    'NORMAL'   : 1,
    'HIGH'     : 2,
    'CRITICAL' : 3,
  }
}

var columns = {
  Summary : 2,
  Status : 4,
  Priority : 5,
  Milestone : 6,
  Assignee : 7,
  'Updated at' : 8,
}

function parseDate(s){
  var months = {
    'Jan' : 0,
    'Feb' : 1,
    'Mar' : 2,
    'Apr' : 3,
    'May' : 4,
    'Jun' : 5,
    'Jul' : 6,
    'Aug' : 7,
    'Sep' : 8,
    'Oct' : 9,
    'Nov' : 10,
    'Dec' : 11,
  };
  var year = (new Date).getFullYear();
  var ss = s.split(' ');
  var t = ss[2];
  var tt = t.split(':');
  var d = new Date(year,months[ss[1]],ss[0],tt[0],tt[1]);
  return +d;
}

function sortTickets(label,direction){
  direction = direction || -1;
  switch(label){
    case 'Summary' :
      return function(ticketA,ticketB){
        return direction*($X('./td[2]',ticketA).innerHTML - $X('./td[2]',ticketB).innerHTML);
      }
    break;
    case 'Status' :
    case 'Priority' :
      return function(ticketA,ticketB){
        return direction*(
          (sorts[label][$X('./td['+columns[label]+']/span',ticketA).innerHTML.toUpperCase()] || 0)
          - (sorts[label][$X('./td['+columns[label]+']/span',ticketB).innerHTML.toUpperCase()] || 0)
        );
      }
    break;
    case 'Milestone' :
      return function(ticketA,ticketB){
        return direction*(
          $X('./td[6]/a/@href | ./td[6]/span/text()',ticketA).nodeValue.toUpperCase()
          > $X('./td[6]/a/@href | ./td[6]/span/text()',ticketB).nodeValue.toUpperCase()
          ? 1 : -1
        );
      }
    break;
    case 'Assignee' :
      return function(ticketA,ticketB){
        
        return direction*(
          $X('./td[7]/a/@href | ./td[7]/span/text()',ticketA).nodeValue.toUpperCase()
          > $X('./td[7]/a/@href | ./td[7]/span/text()',ticketB).nodeValue.toUpperCase()
          ? 1 : -1
        );
      }
    break;
    case 'Updated at' :
      return function(ticketA,ticketB){
        return direction*(
          parseDate($X('./td[8]',ticketA).innerHTML)
          - parseDate($X('./td[8]',ticketB).innerHTML)
        );
      }
    break;
    default :
      return function(ticketA,ticketB){
        debug(label,columns[label]);
        return direction*(
          $X('./td['+columns[label]+']',ticketA).innerHTML.toUpperCase()
          > $X('./td['+columns[label]+']',ticketB).innerHTML.toUpperCase()
        );
      }
  }
}

function addSearch(){
  $('query').addEventListener('keyup',function(){
    var needle = this.value.toUpperCase();
    $x('./tr',tbody).forEach(function(row){
      if ($X('./td[3]/a/text()',row).nodeValue.toUpperCase().indexOf(needle) == -1) {
        row.style.display = 'none';
      } else {
        row.removeAttribute('style');
      }
    });
    evenOdd();
  },false);
}

function addSort(){
  var lastSort;
  $x('.//table[@class="tickets"]/thead/tr/td[text()]',$('tickets')).forEach(function(el){
    var label = el.innerHTML;
    el.innerHTML = '';

    var sortAsc = node('span','okShivSort','',label + '&#9660;');
    onClick(sortAsc,function(){
      if (this != lastSort) {
        if (lastSort) lastSort.className = lastSort.className.replace(/ active/,'');
        this.className += ' active';
        lastSort = this;
      }
      $x('./tr',tbody).sort(sortTickets(label,1)).forEach(function(ticket){ tbody.appendChild(ticket); });
      evenOdd();
    });
    
    var sortDesc = node('span','okShivSort','','&#9650;');
    sortDesc.href="#";
    onClick(sortDesc,function(){
      if (this != lastSort) {
        if (lastSort) lastSort.className = lastSort.className.replace(/ active/,'');
        this.className += ' active';
        lastSort = this;
      }
      $x('./tr',tbody).sort(sortTickets(label,-1)).forEach(function(ticket){ tbody.appendChild(ticket); });
      evenOdd();
    });

    el.appendChild(sortAsc);
    el.appendChild(sortDesc);
  });
  GM_addStyle('.okShivSort { cursor:pointer }'
  + '.okShivSort:hover { text-decoration:underline; }'
  + '.active { cursor:auto; color:black; }');
}

function dePaginate(){
  var nav = $X("./form/div[2]",$('tickets'));
  $x("./*[position()>1 and position()<last() and @href]", nav).forEach(function(link){
    GM_xmlhttpRequest({
      method: "GET",
      url: link.href,
      onload: function(response){
        var div = node('div','','',response.responseText);
        $x('.//*[@id="tickets"]//table[@class="tickets"]/tbody/tr',div).forEach(function(row){
          tbody.appendChild(row);
        });
      }
    });
  });
  nav.style.display = 'none';
  $X("./form/div[@class='pagination'][2]",$('tickets')).style.display = 'none';
}

function evenOdd(){
  $x('./tr[not(@style)]',tbody).forEach(function(row,i){
    row.className =  i % 2 ? 'e' : 'o';
  });
}

/***************************
 *         BEGIN
 ***************************/

var tbody = $X('.//table[@class="tickets"]/tbody',$('tickets'));  //cache this
addSearch();
addSort();
dePaginate();