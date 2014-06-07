/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           Arkle autodonate 4 items for eRepublik modified from Alexc
// @namespace      http://www.erepublik.com/en/citizen/profile/196371
// @include        http://ww*.erepublik.com/*/citizen/*/donate/items
// @include        http://ww*.erepublik.com/*/organization/*/donate/items
// ==/UserScript==

document.getElementById('available_items').value=10;
document.getElementsByName('submitter')[0].value = 'Donate 2 Items';
document.getElementById('big').setAttribute('style', 'height: 68px;');

small = document.getElementById('small');
big = document.getElementById('big');

//This function tells us the id's of the elements which will be moved.
rm_node_ids = new Array;

imgs = small.getElementsByTagName('img');
rm_node_ids[0] = imgs[0].parentNode.getAttribute('id');
rm_node_ids[1] = imgs[2].parentNode.getAttribute('id');
rm_node_ids[2] = imgs[4].parentNode.getAttribute('id');
rm_node_ids[3] = imgs[6].parentNode.getAttribute('id');

//And this function moves the elements
big.appendChild(document.getElementById(rm_node_ids[0]));
big.appendChild(document.getElementById(rm_node_ids[1]));
big.appendChild(document.getElementById(rm_node_ids[2]));
big.appendChild(document.getElementById(rm_node_ids[3]));