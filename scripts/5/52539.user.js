// ==UserScript==
// @name          FireHawksInfo
// @namespace     b.gameforge.ikariam.firehawksinfo
// @description   Adds information and links for FireHawks members
// @include       http://s5.ikariam.org/index.php?*view=embassy*
// @include       http://s5.ikariam.org/index.php?*view=diplomacyAdvisorAlly*
// @version       0.1
// ==/UserScript==

// Links to add
var addLinks = {
	forum: 'http://tinyurl.com/FireHawks',
	chat: 'irc://irc.ogamenet.net:6667/FireHawks',
	forumTheme: 'http://tinyurl.com/FireHawks/Themes/Ikariam2'
};

// Add links to the Diplomacy Alliance section and the Embassy.
var diploRow = null;
var bold = false;
if (document.getElementById('allyinfo') != null)
    diploRow = document.getElementById('allyinfo').getElementsByTagName('tr')[5];
else if (document.getElementById('embassy') != null)
{
	diploRow = document.getElementById('mainview').getElementsByTagName('div')[1].getElementsByTagName('div')[0].getElementsByTagName('table')[0].getElementsByTagName('tr')[6];
	bold = true;
}

// Make sure we have an element to add to.    
if (diploRow != null)
{
	// Create the new table rows.
    var forumRow = document.createElement('tr');
    var chatRow = document.createElement('tr');
	
	// Create the label cells.
    var forumCell1 = document.createElement('td');
    var forumCell2 = document.createElement('td');
    var chatCell1 = document.createElement('td');
    var chatCell2 = document.createElement('td');
    
    // Add the labels.
    forumCell1.appendChild(document.createTextNode('Forum:'));
    chatCell1.appendChild(document.createTextNode('Chat:'));
    if (bold)
    {
    	forumCell1.style.fontWeight = 'bold';
    	chatCell1.style.fontWeight = 'bold';
    }
    
    // Create the link cells.
    var forumA = document.createElement('a');
    forumA.href = addLinks.forum;
    forumA.title = 'FireHawks Forum';
    forumA.target = '_blank';
    forumA.appendChild(document.createTextNode('FireHawks Forum'));
    
    var chatA = document.createElement('a');
	chatA.href = addLinks.chat;
	chatA.title = 'FireHawks Chat';
	chatA.target = '_blank';
    chatA.appendChild(document.createTextNode('FireHawks Chat'));
    
    // Add the links.
    forumCell2.appendChild(forumA);
    chatCell2.appendChild(chatA);
    
    // Add the cells to the new rows.
    forumRow.appendChild(forumCell1);
    forumRow.appendChild(forumCell2);
    chatRow.appendChild(chatCell1);
    chatRow.appendChild(chatCell2);
    
    // Add the rows to the table.
    diploRow.parentNode.insertBefore(forumRow, diploRow);
    diploRow.parentNode.insertBefore(chatRow, diploRow);
}

// Add forum registration icons to the Member List.
var list = document.getElementById('memberList');

for (var i = 1; i < list.rows.length; i++)
{
	var row = list.rows[i];
	var nameCell = row.cells[1];
	var name = nameCell.innerHTML;
	
	nameCell.innerHTML = '';
	nameCell.style.textAlign = 'left';
	
	var image = document.createElement('img');
	image.src = addLinks.forum + '/tools/memberCheck.php?member=' + name;
	image.alt = '';
	image.title = 'Forum Registration Status';
	image.style.cssFloat = 'right';

	nameCell.appendChild(document.createTextNode(name));	
	nameCell.appendChild(image);
}

var legendRow = document.createElement('tr');
var legendCell = document.createElement('td');
legendCell.colSpan = 6;

var imageOn = document.createElement('img');
imageOn.src = addLinks.forumTheme + '/images/warning_watch.gif';
imageOn.alt = '';
imageOn.title = 'Registered';

var imageOff = document.createElement('img');
imageOff.src = addLinks.forumTheme + '/images/warning_mute.gif';
imageOff.alt = '';
imageOff.title = 'Not Registered';

legendCell.appendChild(document.createTextNode('Forum Status: '));
legendCell.appendChild(imageOn);
legendCell.appendChild(document.createTextNode(' Registered - '));
legendCell.appendChild(imageOff);
legendCell.appendChild(document.createTextNode(' Not Registered'));

legendRow.appendChild(legendCell);
list.getElementsByTagName('tbody')[0].appendChild(legendRow);