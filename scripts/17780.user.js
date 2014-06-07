// ==UserScript==
// @name         Facebook - Collpase/Expand Applications
// @description Add a functionality  to collapse/expand the applications.
// @namespace     http://userscripts.org/users/28401;scripts
// @include       http://*.facebook.com/profile.php?id=*
// @creator      Dan Kilman
// ==/UserScript==

(function() {
	if (document.getElementById('userprofile'))  
	{
		function collapseBoxes()
		{
			var expandedResults = document.evaluate("//div[@class='profile_box clearfix flex_open flex_header']", document.getElementById('userprofile'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);			
			var expandedResults2 = document.evaluate("//div[@class='profile_box clearfix flex_header flex_open']", document.getElementById('userprofile'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < expandedResults.snapshotLength; i++) 
			{
				expandedResults.snapshotItem(i).removeAttribute('class');
				expandedResults.snapshotItem(i).setAttribute('class', 'profile_box clearfix flex_shut flex_header');
			}			
			for (var i = 0; i < expandedResults2.snapshotLength; i++) 
			{
				expandedResults2.snapshotItem(i).removeAttribute('class');
				expandedResults2.snapshotItem(i).setAttribute('class', 'profile_box clearfix flex_header flex_shut');
			}
			
			document.getElementById('stateShifter').removeAttribute('state');
			document.getElementById('stateShifter').setAttribute('state', 'collapsed');
			
			var newSpan = document.createElement ('span');
			var newText = document.createTextNode('Expand Apps');
			newSpan.appendChild(newText);
			var targetDiv = document.getElementById('divNode');
			targetDiv.replaceChild(newSpan, targetDiv.firstChild);
		}	

		function expandBoxes()
		{
			var collapsedResults = document.evaluate("//div[@class='profile_box clearfix flex_shut flex_header']", document.getElementById('userprofile'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var collapsedResults2 = document.evaluate("//div[@class='profile_box clearfix flex_header flex_shut']", document.getElementById('userprofile'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < collapsedResults.snapshotLength; i++) 
			{
				collapsedResults.snapshotItem(i).removeAttribute('class');
				collapsedResults.snapshotItem(i).setAttribute('class', 'profile_box clearfix flex_open flex_header');
			}			
			for (var i = 0; i < collapsedResults2.snapshotLength; i++) 
			{
				collapsedResults2.snapshotItem(i).removeAttribute('class');
				collapsedResults2.snapshotItem(i).setAttribute('class', 'profile_box clearfix flex_header flex_open');
			}
			
			document.getElementById('stateShifter').removeAttribute('state');
			document.getElementById('stateShifter').setAttribute('state', 'expanded');
			
			var newSpan = document.createElement ('span');
			var newText = document.createTextNode('Collapse Apps');
			newSpan.appendChild(newText);
			var targetDiv = document.getElementById('divNode');
			targetDiv.replaceChild(newSpan, targetDiv.firstChild);
		}
		
		function checkBoxesState()
		{
			if (document.getElementById('stateShifter').getAttribute('state') == 'expanded')
				collapseBoxes();
			else if(document.getElementById('stateShifter').getAttribute('state') == 'collapsed')
				expandBoxes();
		}
		
		var collapseButton = document.createElement ('a');
		var collapseButtonDiv = document.createElement ('div');
		var collapseButtonDivSpan = document.createElement ('span');
		var collapseButtonDivSpanText = document.createTextNode ('Collapse Apps');
		
		collapseButtonDivSpan.appendChild (collapseButtonDivSpanText);
		collapseButtonDiv.appendChild (collapseButtonDivSpan);
		collapseButton.appendChild(collapseButtonDiv);
		
		collapseButton.setAttribute('id', 'stateShifter');
		collapseButton.addEventListener('click', checkBoxesState, false);
		collapseButton.setAttribute('state', 'expanded');
		collapseButtonDiv.setAttribute('class', 'holder');
		collapseButtonDiv.setAttribute('id', 'divNode');
				
		var profileBar = document.getElementById('profileActions'); 
		profileBar.appendChild(collapseButton);
		
		collapseBoxes();
	
		
	}	
})();	