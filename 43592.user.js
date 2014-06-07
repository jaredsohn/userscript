// ==UserScript==
// @name           Sticky Condenser
// @namespace      shoecream@luelinks.net
// @description    Condenses stickies on the main board (42).
// @include        http://boards.endoftheinter.net/showtopics.php?board=42*
// @include        https://boards.endoftheinter.net/showtopics.php?board=42*
// ==/UserScript==

// inspired by http://luelinks.net/showmessages.php?board=42&topic=4146315

var nums = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];

function toWords(num) {
   if (num < nums.length) {
      return nums[num];
   } else {
      return num;
   }
}

function expand_sticks(e) {
   var sticks = document.getElementsByClassName('sticky-hidden');
   for (var i = 0; i < sticks.length; i++) {
      sticks[i].className = '';
   }
   e.target.parentNode.removeChild(e.target);
}

var tr = document.getElementsByTagName('tr');
var stickies = [];
for (var i = 0; i < tr.length; i++) {
   var td = tr[i].getElementsByTagName('td');
   if (td.length && td[0].firstElementChild.tagName == "A" && td[0].firstElementChild.childElementCount > 0) {
      stickies.push(tr[i]);
   }
}
// if there are less than two (ie, 1 or 0) stickies than we skip this script
if (stickies.length < 2) {
   return;
}

for (i in stickies) {
   stickies[i].className += ' sticky-hidden';
}

var table = document.getElementsByClassName('grid')[0];

var row = table.insertRow(1);
var cell = row.insertCell(0);
cell.colSpan = stickies[0].getElementsByTagName('td').length;
cell.innerHTML = toWords(stickies.length) + ' stickies! (click to expand)';
cell.innerHTML += '<style type="text/css">.sticky-hidden {display: none}</style>';
cell.style.fontWeight = 'bold';
cell.style.cursor = 'pointer';
cell.addEventListener('click', expand_sticks, false);
