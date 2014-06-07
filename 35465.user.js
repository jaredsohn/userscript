// ==UserScript==
// @name          graphingsystem
// @namespace     conquerClubClickableMaps
// @include       http://*conquerclub.com/game.php?game=*
// ==/UserScript==

var version = 3.22

var userGuideHTML = (<div id='ug-top' style="padding:15px;padding-top:5px;">
	<h4>Clickable Maps User Guide</h4>
	<p><hr/>
		
	<hr/></p><br/>
	<fieldset><legend><b>CONTENTS</b></legend>
		<a style='color:#115511;' href='#ug-menus'>MENU OPTIONS</a>
			:: <a style='color:#115511;' href='#ug-appearance'>Appearance</a>
			|  <a style='color:#115511;' href='#ug-confirmations'>Confirmations</a>
			|  <a style='color:#115511;' href='#ug-controls'>Controls</a> 
		<hr/>
		<a style='color:#333399;' href='#ug-gameplay'>GAMEPLAY</a>
			:: <a style='color:#333399;' href='#ug-deploy-phase'>Deploy Phase</a>
			|  <a style='color:#333399;' href='#ug-Assault-phase'>Assault Phase</a>
			|  <a style='color:#333399;' href='#ug-advance-phase'>Advance Phase</a>
			|  <a style='color:#333399;' href='#ug-Reinforce-phase'>Reinforcements Phase</a>
	</fieldset>
	<br/><br/>
	<fieldset id='ug-menus' style="color:#115511;"><legend><b>MENU OPTIONS</b></legend>
		Menu items with configurable options can be changed by clicking on that item.  NOTE: Cookies are no longer required.
		<br/><br/>
		<fieldset><legend id='ug-appearance'><b>Appearance</b></legend>
			<i><b>Note to BOB users:</b> Do not set the Action Menu option of Clickable Maps to <b>floating</b> if you have the
			<b>HUD</b> option for BOB enabled. Having both options enabled may cause strange behavior...</i>
			<ul>
				<li>
					<i><b>Action Menu:</b></i>							[ <b>floating</b> or <b>normal</b> ] <br/>
					If set to 'floating', then the action menu will always be along the bottom of the screen, and will never
					scroll out of view.
				</li>
				<li>
					<i><b>Map Border:</b></i>							[ <b>thin</b>, <b>thick</b> or <b>off</b> ] <br/>
					If set to 'thin' or 'thick', then the map border will change color with each phase, matching the color of
					the From-Marker.  Colors for the map border are blue (deploy), red (Assault), yellow (advance), and 
					green (Reinforce).
				</li>
				<li>
					<i><b>Show Enemy Crosshairs:</b></i>				[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then during the Assault phase crosshairs will appear when the mouse is moved over an enemy
					region--but only if that region is Assaultable from your own currently selected region.
				</li>
				<li>
					<i><b>Show From-Region Marker:</b></i>			[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then a pulsing circle will appear over your currently selected region during
					Assault, advance, and Reinforcements phases.
				</li>
				<li>
					<i><b>Show Advance-To Marker:</b></i>				[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then after conquering a region, a small, flashing yellow circle will appear over that
					region until troops have been advanced.
				</li>
				<li>
					<i><b>Show Floating Troop Counter Over Map:</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then during the deploy, advance, and Reinforcements phases, a small gray box will appear next to
					the region that is under the mouse pointer indicating how many troops are currently selected to deploy,
					advance, or Reinforce.  The troop counter updates when the increase/decrease troops hotkeys are pressed, or the
					mouse wheel is scrolled (see <a href='#ug-controls'>Controls</a>).
				</li>
				<li>
					<i><b>Show Help Tool-Tips:</b></i>					[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then a tool-tip will appear just below the mouse cursor when the mouse is moved over a
					region to show what will happen when the mouse is clicked (if no tool-tip appears, then it is
					probably because the region being moused over cannot be acted upon, or because the mouse was not held
					still long enough (it takes about a full second) for the tool-tip to appear).  The tool-tip will also
					show what click will perform what action, for example, "Left-click: Deploy 1. Right-click: Deploy 10" or
					"Left-click: Set Alaska as From-Region. Right-click: Reinforce 5 troops from Kamchatka to Alaska".
				</li>
			</ul>
		</fieldset> <!-- end Appearance -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-confirmations'><b>Confirmations</b></legend>
				<i><b>Note to BOB users:</b> Only use the confirmations from one script at a time for any given action. In other
				words, don't turn on the "Confirm Auto-Assault" option for Clickable Maps if you already have the same option
				enabled for BOB. <b>When Clickable Maps is first installed, all confirmations are turned <u>on</u> by default!</b></i>
				<ul>
					<li>
						<i><b>Confirm Deploy?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to deploy troops on a region, a confirmation message will
						appear with the number of troops that will be deployed.  This gives you a chance to cancel a deployment
						move and try again.
					</li>
					<li>
						<i><b>Confirm Assault?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to Assault an enemy region, a confirmation message will
						appear with the Assaulting region and the target region.  This gives you a chance to cancel an
						Assault move and try again.
					</li>
					<li>
						<i><b>Confirm Auto-Assault?</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to auto-Assault an enemy region, a confirmation message will
						appear with the Assaulting region and the target region.  This gives you a chance to cancel an
						auto-Assault move try again.
					</li>
					<li>
						<i><b>Confirm Advance?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt advance troops to a conquered region, a confirmation
						message will appear with the number of troops that will be advanced.  This gives you a chance to cancel
						an advancement move and try again.
					</li>
					<li>
						<i><b>Confirm Reinforce?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to Reinforce troops from one region to another, a
						confirmation message will appear with the number of troops to be fortified, the source region and the
						destination region.  This gives you a chance to cancel a Reinforcements move and try again.
					</li>
					<li>
						<i><b>Confirm Phase End?</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then when 'End Assaults' or 'End Reinforcements' is clicked, a
						confirmation message will appear offering you a chance to cancel.  A confirmation will also appear when
						attempting to Reinforce (unless Reinforcementss are set to 'unlimited').
					</li>
				</ul>
		</fieldset> <!-- end confirmations -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-controls'><b>Controls</b></legend>
			To change a hotkey to a key of your choosing: Expand the 'Controls' menu, click the menu item of the hotkey you
			want to change, and then enter your new hotkey in the box that appears. <b>Hotkeys are ignored while typing in the
			chat box, so if hotkeys don't appear to be working, make sure the cursor is not blinking in the chat box.</b><br/>
			<br/>
			<i><b>Note: The right arrow key is reserved for increasing the number of troops to be deployed, advanced or
			fortified, and the left arrow key is reserved for decreasing troops. Pressing a number key sets the number of troops
			to that of the key that was pressed.</b></i>
				<ul>
					<li>
						<i><b>Phase End Hotkey:</b></i>		[ (default: <b>e</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking 'End Assaults' during the Assault phase or 'End
						Reinforcements' during the Reinforcements phase.
					</li>
					<li>
						<i><b>Next Game Hotkey:</b></i>		[ (default: <b>n</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking the '<u>jump to your next playable game</u>' link.
					</li>
					<li>
						<i><b>Jump to Map Hotkey:</b></i>	[ (default: <b>m</b>) ] <br/>
						Pressing this hotkey will scroll the browser window to the top of the map.
					</li>
					<li>
						<i><b>Refresh Map Hotkey:</b></i>	[ (default: <b>r</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking the [<u>refresh map</u>] link.
					</li>
					<li>
						<i><b>Begin Turn Hotkey:</b></i>	[ (default: <b>b</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking the 'Begin Turn' button.
					</li>
					<li>
						<i><b>Increase Troops:</b></i>		[ (default: <b>w</b>) or <b>right-arrow</b> ] <br/>
						Pressing this hotkey increases the number of troops to be deployed, advanced, or fortified by one.
					</li>
					<li>
						<i><b>Decrease Troops:</b></i>		[ (default: <b>s</b>) or <b>left-arrow</b> ] <br/>
						Pressing this hotkey decreases the number of troops to be deployed, advanced or fortified by one.
					</li>
					<li>
						<i><b>Use Mouse Wheel to Increase/Decrease Troops:</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', scrolling the mouse wheel up will increase the number of troops to be deployed, advanced,
						or fortified, and scrolling it down will decrease the number of troops.
					</li>
					<li>
						<i><b>Deployment Clicks:</b></i>	[ <b>Left-1 Right-Selected</b> or <b>Right-1 Left-Selected</b> ] <br/>
						Changes which mouse buttons are used to deploy troops; either left-click deploys one troop and
						right-click deploys the number of troops currently selected in the action menu (or floating troop counter),
						or vice-versa.
					</li>
				</ul>
		</fieldset> <!-- end confirmations -->
	</fieldset><!-- end MENUS -->
	
	<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
	<fieldset id='ug-gameplay' style="color:#333399;"><legend><b>GAMEPLAY</b></legend>
		<fieldset><legend id='ug-deploy-phase'><b>Deploy Phase</b></legend>
			<ul>
				<li>
					Mouse over the region you want to deploy troops on. If the <a href='#ug-appearance'>Show Troop
					Counter</a> option is enabled, then a small box will appear next to your cursor letting you know how many
					troops are selected for deployment (if not, then you can see the number of troops in the action menu as
					usual).  The counter will remain visible until you move your mouse away from the region. The counter
					(and action menu) will update when you press the <a href='#ug-controls'> increase/decrease
					troops hotkeys</a> or <a href='#ug-controls'>use the mouse wheel</a>.
				</li>
				<li>
					If you only want to deploy one troop at a time, then click on the desired region with the mouse button
					that is configured to deploy only 1 troop. Otherwise, once the desired number of troops is selected, click
					the region to deploy on using the mouse button that is configured to deploy the selected number of troops.
					(You can choose which click deploys 1 troop and which click deploys the selected number of troops with the
					<a href='#ug-controls'>Deployment Clicks</a> option.)
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Deploy</a> option is enabled, then you will be asked to confirm
					each deployment click.
				</li>
			</ul>
		</fieldset> <!-- end deploy phase -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-Assault-phase'><b>Assault Phase</b></legend>
			<ul>
				<li>
					First select the region that you want to Assault from by clicking on it (either right- or left-click). If
					the <a href='#ug-appearance'>Show From-Region Marker</a> option is enabled, then a pulsing, red circle
					will appear around the region, showing that it is now selected as the Assaulting region. If not, then
					you can see which region is selected as the Assaulting region by looking in the action menu, as usual.
					If the region clicked does not become the Assaulting region (i.e. the from-region marker and/or
					action menu does not update), it is probably because that region is unable to make Assaults.
				</li>
				<li>
					Once the Assaulting region is selected, click an enemy region to Assault it. <b>Left-clicking</b> will
					execute a normal Assault, <b>right-clicking</b> (or holding <b>SHIFT</b> while clicking) will execute an
					auto-Assault.
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Assault or Confirm Auto-Assault</a> options are enabled, then you
					will be asked to confirm the move, and given a chance to cancel it.
				</li>
				<h5>Special Assaults</h5>
				<li>
					<b>Auto-Assault[x]</b>. If the <b>CTRL</b> key is held while auto-Assaulting, then a prompt will appear allowing you to
					enter the minimum number of troops to leave on the Assaulting region (to be sure that the number of troops
					does not go below the number entered, Assaults will stop if the remaining troops reaches the number entered
					plus one). This Assault is slower than a regular auto-Assault because each Assault	must be executed
					indivdually--but it is faster than doing it manually.  Works in conjunction with Auto-Advance.
				</li>
				<li>
					<b>Auto-Advance</b>. If the <b>ALT</b> key is held while auto-Assaulting, then all remaining troops on the Assaulting region will
					be automatically advanced to the conquered region.  Works in conjunction with Auto-Assault[x].
				</li>
			</ul>
		</fieldset> <!-- end Assault phase -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-advance-phase'><b>Advance Phase</b></legend>
			<ul>
				<li>
					After conquering an enemy region, moving the mouse cursor over either the Assaulting region or the 
					conquered region will cause the <a href='#ug-troop-counter'>floating troop counter</a> to appear (if
					enabled). Use the <a href='#ug-controls'>mouse wheel or configured hotkeys</a> to select the number of
					troops to advance, then	click on the region just conquered to advance those troops.
				</li>
				<li>
					Clicking on the region that was just Assaulted <i>from</i> will always advance zero troops.
				</li>
				<li>
					It does not matter whether right-click or left-click is used during the advance phase.
				</li>
				<li>
					If the <a href='#ug-appearance'>Show Advance-To Marker</a> option is enabled, then a small, flashing yellow
					circle will	appear on the region that was just conquered.
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Advance</a> option is enabled, then you will be asked to confirm
					the advancement move, and given a chance to cancel it.
				</li>
			</ul>
		</fieldset> <!-- end advance phase -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-Reinforce-phase'><b>Reinforcements Phase</b></legend>
			<ul>
				<li>
					Select the region that you want to Reinforce troops from by <b>left-clicking</b> on it. If
					the <a href='#ug-appearance'>Show From-Region Marker</a> option is enabled, then a pulsing, green circle
					will appear around the region, showing that it is now selected as the source region. If not, then
					you can see which region is selected as the source region by looking in the action menu, as usual.
					If the region clicked does not become the source region (i.e. the from-region marker and/or
					action menu does not update), it is probably because that region is unable to be fortified from.
				</li>
				<li>
					Mouse over the region you want to Reinforce troops to. If the <a href='#ug-appearance'>Show Troop
					Counter</a> option is enabled, then a small box will appear next to your cursor letting you know how many
					troops are selected to be fortified (if not, then you can see the number of troops in the action menu as
					usual).  The counter will remain visible until you move your mouse away from the region. The counter
					(and action menu) will update when you press the <a href='#ug-controls'> increase/decrease
					troops hotkeys</a> or <a href='#ug-controls'>use the mouse wheel</a>.
				</li>
				<li>
					Once the source region and the desired number of troops are selected, <b>right-click</b> (or hold
					<b>SHIFT</b> while left-clicking) the region you want to Reinforce troops to.
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Phase End</a> option is enabled and Reinforcementss for the current
					game are set to either <b>adjacent</b> or <b>chained</b>, then you will be warned that the Reinforcements
					move will end your turn, and you will have a chance to cancel the move if desired.
				</li>
			</ul>
		</fieldset> <!-- end Reinforcements phase -->
	</fieldset><!-- end GAMEPLAY -->
	<div style="position:fixed;top:55px;text-align:right;width:570px;">
		<strong><a style="background:#eeffee;" id="close-user-guide" href="javascript:void(0)">[x]</a></strong>
	</div>
</div>).toString()

function findPos(obj) {
	var curleft = 0
	var curtop = 0
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
function setCursor(state) {
	try {document.body.style.cursor						   = state}catch(err){}
	try {advanceFromMarker.style.cursor					   = state}catch(err){}
	try {AssaultFromMarker.style.cursor					   = state}catch(err){}
	try {ReinforceFromMarker.style.cursor					   = state}catch(err){}
	try {advanceToMarker.style.cursor					   = state}catch(err){}
	try {crosshair.style.cursor							   = state}catch(err){}
	// setTimeout(function(){try {innerMap.style.cursor							   = state}catch(err){}}, 1000)
	try {document.getElementById('magicmap').style.cursor  = state}catch(err){innerMap.style.cursor = state}
}
function createMenuItem(parentElem, id, listener, method, displayText, value) {
	var m = new Array()
	m['item']           		= document.createElement('li')
	m['link']           		= document.createElement('a')
	m['link'].id       	 		= id
	m['link'].href      		= 'javascript:void(0);'
	m['link'].innerHTML			= displayText+' '
	parentElem.appendChild(m['item'])
	m['item'].appendChild(m['link'])
	if (listener == 'mouseover') {
		m['subMenu'] = document.createElement('ul')
		m['subMenu'].style.position = 'absolute'
		m['subMenu'].style.display  = 'inline'
		m['subMenu'].style.zIndex   = 5
		m['subMenu'].style.left = '30px'
		m['subMenu'].style.textAlign='right'
		m['subMenu'].style.width = '85%'
		m['item'].appendChild(m['subMenu'])
		m['subMenu'].style.borderLeft   = 'medium solid #667766'
		m['subMenu'].style.borderBottom = 'thick solid #667766'
		m['item'].addEventListener('mouseout', function(){m['subMenu'].style.display = 'none'}, false)
		m['item'].addEventListener(listener, function(e){m['subMenu'].style.display='inline';m['subMenu'].style.top=e.pageX}, false)
		m['subMenu'].style.display  = 'none'
		return m['subMenu']
	} else {
		m['value']					= document.createElement('b')
		m['value'].style.textAlign	= 'right'
		m['value'].style.fontWeight	= 'bold'
		m['value'].innerHTML		= value
		m['link'].appendChild(m['value'])
		m['link'].addEventListener(listener, method, false)
		return m['item']
	}
}
function updateXML(){
	XMLisUpdated = false
	GM_xmlhttpRequest({method: 'GET',url: 'http://www.conquerclub.com/maps/'+mapName+'.xml',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3' , 'Accept': 'application/xml,text/xml'},
		onload: function(response) {
			debug('fetching map xml')		
			var parser	= new DOMParser()
			var dom		= parser.parseFromString(response.responseText,"application/xml")
			// get all "coordinates" tags since only regions will have coordinates sub tags, then assign the parentNodes to the cm_regions array.
			c = new Array()
			c = dom.getElementsByTagName('coordinates')
			for (i=0;i<c.length;i++) {
				cm_regions[i]=c[i].parentNode
				// debug(cm_regions[i].getElementsByTagName('name')[0].textContent)
			}
			mapSize	  = unsafeWindow.mapResolution; debug('mapSize: '+mapSize)
			switch(mapSize) { 
				case 'L':
					mapx='largex'
					mapy='largey'
					maph='largeheight'
					mapw='largewidth'
					break
				case 'S':
					mapx='smallx'
					mapy='smally'
					maph='smallheight'
					mapw='smallwidth'
					break
			}
			mapHeight = dom.getElementsByTagName(maph)[0].textContent
			mapWidth  = dom.getElementsByTagName(mapw)[0].textContent
			XMLisUpdated = true
		}
	})
}
function updateAction() {
	try{actionString = document.getElementById('action').innerHTML}catch(err){return}
	if ( actionString ) {
		if ( actionString.match('loading...') ) {
			debug('actionForm is loading... trying again in .1 sec...')
			setTimeout(function(){updateAction}, 250)
		}
	}
	try{floatingQuantity.innerHTML		= document.getElementById('quantity').value}catch(err){}
	// refresh the map and reload all regions
	oldMapSize = mapSize
	mapSize	   = unsafeWindow.mapResolution; debug('mapSize: '+mapSize+', oldMapSize: '+oldMapSize)
	troops	   = document.getElementById('troops').innerHTML.split(',')
	// see if the mapSize has changed, and if it has, then reload the xml to get the new coordinates, map width and map height.
	if ( mapSize != oldMapSize ) {
		updateXML()
		XMLinterval = setInterval(function(){
			debug('checking xml status')
			if ( XMLisUpdated ) {
				clearInterval(XMLinterval)
				updateAction()
			}
		}, 250)
		return
	}
	// set fromRegion and toRegion
	try {
		fromRegionNum = document.getElementById('from_region').value
		fromRegion    = cm_regions[parseInt(fromRegionNum)].getElementsByTagName('name')[0].textContent
	} catch(err){fromRegion = ''}
	try{
		toRegionNum = document.getElementById('to_region').value
		toRegion    = cm_regions[toRegionNum].getElementsByTagName('name')[0].textContent
	} catch(err){toRegion   = ''}
	
	crosshair.style.visibility			= 'hidden'
	floatingQuantity.style.visibility	= 'hidden'
	AssaultFromMarker.style.visibility	= 'hidden'
	advanceFromMarker.style.visibility	= 'hidden'
	advanceToMarker.style.visibility	= 'hidden'
	ReinforceFromMarker.style.visibility	= 'hidden'
	
	deployDeferred = false
	// parse the text of the action menu (actionString) to determine what phase we are in. if there is no action element, then we must be viewing someone else's game
	if ( actionString.match('Waiting for your next turn') || actionString.match('You may take your turn now') || actionString.match('You have won...') ) {
		outerMap.style.borderColor = '#eeeeee'
		doAction = 'Waiting'
	}
	if ( actionString.match('troops left to deploy') ) {
		outerMap.style.borderColor = '#0000ff'
		doAction = 'Deploy'
	}
	if ( actionString.match('deferred troops to deploy') ) {
		outerMap.style.borderColor = '#0000ff'
		deployDeferred = true
		doAction = 'Deploy'
		selectedQuantity = actionString.split(' ')[2]
	}
	if ( actionString.match('Assault from') || actionString.match('You cannot make any Assaults.') ) {
		outerMap.style.borderColor = '#ff0000'
		doAction = 'Assault'
	}
	if ( actionString.match('Advance') ) {
		outerMap.style.borderColor = '#ffff00'
		doAction = 'Advance'
		AssaultedFromRegion = actionString.split(' from ')[1].split(' to ')[0]
		fromRegion = AssaultedFromRegion
		AssaultedToRegion = actionString.split(' to ')[1].split('<input')[0].replace('\n', '')
		 if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
			 floatingQuantity.style.visibility = 'visible'
		}
	}
	if ( actionString.match('Reinforce') || actionString.match('You cannot make any Reinforcementss.') ) {
		outerMap.style.borderColor = '#00ff00'
		doAction = 'Reinforce'
	}
	debug('new action: '+doAction)
	
	debug("fromRegion == '"+fromRegion+"' && toRegion == '"+toRegion+"'")
	if ( fromRegion == '' && toRegion == '' ) {
		if ( doAction == 'Advance' ) {
			advanceFromMarker.style.visibility = 'visible'
		}
		debug('no from or toRegion. returning')
		return
	}
	for (i=0;i<cm_regions.length;i++) {
		title = cm_regions[i].getElementsByTagName('name')[0].textContent
		tX    = cm_regions[i].getElementsByTagName( mapx )[0].textContent
		tY    = cm_regions[i].getElementsByTagName( mapy )[0].textContent
		if ( title == fromRegion ) {
			setCursor('pointer')
			fromRegion_troops = troops[i].split('-')
			if ( selectedQuantity >= parseInt(fromRegion_troops[1]) ) {
				updateSelectedQuantity(parseInt(fromRegion_troops[1])-1)
			}
			remainingTroops	= fromRegion_troops[1]
			if ( userPrefs['showFromMarker'] == 'Y' ) {
				debug('showfrom')
				switch (doAction) {
					case 'Assault':
						if ( title == fromRegion ) {
							AssaultFromMarker.style.position = 'absolute'
							AssaultFromMarker.style.left = (parseInt(tX)-AssaultFromMarkerXoffset) + 'px'
							AssaultFromMarker.style.top  = (parseInt(tY)-AssaultFromMarkerYoffset) + 'px'
							AssaultFromMarker.style.visibility = 'visible'
						}
					break
					case 'Advance':
						if ( title == AssaultedFromRegion ) {
							advanceFromMarker.style.position = 'absolute'
							advanceFromMarker.style.left = (parseInt(tX)-advanceFromMarkerXoffset) + 'px'
							advanceFromMarker.style.top  = (parseInt(tY)-advanceFromMarkerYoffset) + 'px'
							advanceFromMarker.style.visibility = 'visible'
						}
					break
					case 'Reinforce':
						if ( title == fromRegion ) {
							ReinforceFromMarker.style.position = 'absolute'
							ReinforceFromMarker.style.left = (parseInt(tX)-ReinforceFromMarkerXoffset) + 'px'
							ReinforceFromMarker.style.top  = (parseInt(tY)-ReinforceFromMarkerYoffset) + 'px'
							ReinforceFromMarker.style.visibility = 'visible'
						}
					break
				}
			}
		}
		if ( userPrefs['showAdvanceToMarker'] == 'Y' ) {
			if ( doAction == 'Advance' ) {
				if ( title == AssaultedToRegion ) {
					try{floatingQuantity.innerHTML = selectQuantity.value}catch(err){}
					advanceToMarker.style.position = 'absolute'
					advanceToMarker.style.left = (parseInt(tX)-advanceToMarkerXoffset) + 'px'
					advanceToMarker.style.top  = (parseInt(tY)-advanceToMarkerYoffset) + 'px'
					advanceToMarker.style.visibility = 'visible'
				}
			}
		}
	}
	debug('setting actionUpdated to true')
	actionUpdated = true
	return
}
function setHotkey(el) {
	var pref = el.id
	if ( pref.match('Hotkey') ) {
		if ( userPrefs[pref] != '-1' ) {
			n = prompt('Enter new hotkey:', String.fromCharCode(userPrefs[pref]))
			if ( n == null ) { return false }
		} else {
			n = prompt('Enter new hotkey:')
		}
		if ( n != '' ) {
			// something was entered--make sure it is not already assigned to something else, and that is it not 0-9 since those are reserved for changing troop quantities
			for ( _pref in userPrefs ) {
				if ( _pref.match('Hotkey') && _pref != pref ) {
					if ( n == String.fromCharCode(userPrefs[_pref]) ) {
						alert('"'+n+'" is already being used for '+_pref)
						return false
					}
					if ( n.match(/[0-9]/) ) {
						alert('Number keys are reserved for changing the number of troops. Please choose another hotkey.')
						return false
					}
				}
			}
			userPrefs[pref] = n.charCodeAt(0)
		} else {
			userPrefs[pref] = '-1'
		}
		// update the menu item to display the new preference
		n = String.fromCharCode(userPrefs[pref])
		if ( n != String.fromCharCode('-1') ) {
			el.getElementsByTagName('b')[0].innerHTML = n
		} else {
			el.getElementsByTagName('b')[0].innerHTML = '(none)'
		}
		// store the updated preferences
		storeUserPrefs()
	}
}
function setPref(el) {
	var pref = el.id
	switch(pref) {
		case 'actionMenu':
			if ( actionForm ) {
				switch(userPrefs[pref]) {
					case 'normal':
						actionForm.style.position	= 'fixed'
						actionForm.style.bottom		= 0
						actionForm.style.width='100%'
						actionForm.style.left='0px'
						actionForm.style.zIndex		= 1
						userPrefs[pref]	= 'floating'
						break
					case 'floating':
						actionForm.style.position	= ''
						actionForm.style.bottom		= ''
						actionForm.style.zIndex		= 1
						userPrefs[pref] = 'normal'
						break
				}
			}
		break
		case 'mapBorder':
			var thin		 = '2px'
			var thick		 = '4px'
			switch(userPrefs[pref]) {
				case 'off':
					outerMap.style.borderWidth	= thin
					outerMap.style.borderStyle	= 'solid'
					outerMap.style.left			= '-'+thin
					outerMap.style.top			= '-'+thin
					userPrefs[pref]				= 'thin'
				break
				case 'thin':
					outerMap.style.borderWidth	= thick
					outerMap.style.borderStyle	= 'solid'
					outerMap.style.left			= '-'+thick
					outerMap.style.top			= '-'+thick
					userPrefs[pref]				= 'thick'
				break
				case 'thick':
					outerMap.style.borderStyle	= 'none'
					outerMap.style.left			= '0px'
					outerMap.style.top			= '0px'
					userPrefs[pref]				= 'off'
				break
			}
		break
		case 'deploymentClicks':
			switch(userPrefs[pref]) {
				case 'Left-1 Right-Selected':
					userPrefs[pref]	= 'Right-1 Left-Selected'
					break
				case 'Right-1 Left-Selected':
					userPrefs[pref] = 'Left-1 Right-Selected'
					break
			}
		break
		default:
			switch(userPrefs[pref]) {
				case 'Y':
					userPrefs[pref] = 'N'
				break
				case 'N':
					userPrefs[pref] = 'Y'
				break
			}
			updateAction()
		break
	}
	// update the menu item to display the new preference
	el.getElementsByTagName('b')[0].innerHTML = userPrefs[pref]
	// store the updated preferences
	storeUserPrefs()
}
function updateMap(regionNumber, playerNumber, tTroops) {
	debug('running updateMap. doAction: '+doAction)
	if ( sendingRequest ) { debug('returning from updateMap because sendingReqeust='+sendingRequest); return false }
	try{document.getElementById('magicmap').title
						= ''}catch(err){}
	innerMap.title		= ''
	AssaultFromMarker.title	= ''
	advanceFromMarker.title	= ''
	ReinforceFromMarker.title	= ''
	crosshair.title		= ''
	setCursor('default')
	crosshair.style.visibility			= 'hidden'
	floatingQuantity.style.visibility	= 'hidden'
	floatingQuantity.style.left 	    = (parseInt(tX) + floatingQuantityXoffset) + 'px'
	floatingQuantity.style.top          = (parseInt(tY) + floatingQuantityYoffset) + 'px'

	switch ( doAction ) {
		case 'Deploy':
			sameTeam = false
			for ( team in teams ) {
				for ( player in teams[team] ) {
					if ( player == playerNumber && team == currentPlayerTeam ) {
						sameTeam = true
					}
				}
			}
			if ( playerNumber == currentPlayerNumber || sameTeam == true ) {
				setCursor('pointer')
				troopsLeftToDeploy = actionString.split(' ')[2]
				if ( userPrefs['showToolTips'] == 'Y' ) {
					switch(userPrefs['deploymentClicks']) {
						case 'Left-1 Right-Selected':
							L='Deploy 1'
							R='Deploy '+selectedQuantity+' of '+troopsLeftToDeploy
						break
						case 'Right-1 Left-Selected':
							R='Deploy 1'
							L='Deploy '+selectedQuantity+' of '+troopsLeftToDeploy
						break
					}
					t = 'Left-click: '+L+'. Right-click: '+R+'. Shift-click: Deploy all available troops.'
					try{document.getElementById('magicmap').title
										= t}catch(err){}
					innerMap.title		= t
				}
				floatingQuantity.innerHTML        = selectedQuantity
				if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
					floatingQuantity.style.visibility = 'visible'
				}
			}
		break
		case 'Advance':
			setCursor('pointer')
			if ( userPrefs['showToolTips'] == 'Y' ) { advanceFromMarker.title = 'Any click: Advance 0' }
			if ( title == AssaultedFromRegion ) {
				q = '0'
				if ( userPrefs['showToolTips'] == 'Y' ) {
					try{document.getElementById('magicmap').title = 'Any click: Advance '+q}catch(err){}
					innerMap.title = 'Any click: Advance '+q
				}
				if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
					floatingQuantity.innerHTML        = q
					floatingQuantity.style.visibility = 'visible'
				}
			} else if ( title == AssaultedToRegion ) { 
				q = selectedQuantity
				if ( userPrefs['showToolTips'] == 'Y' ) {
					try{document.getElementById('magicmap').title = 'Any click: Advance '+selectedQuantity}catch(err){}
					innerMap.title = 'Any click: Advance '+selectedQuantity
				}
				if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
					floatingQuantity.innerHTML        = q
					floatingQuantity.style.visibility = 'visible'
				}
			} else {
				setCursor('default')
				try{document.getElementById('magicmap').title = ''}catch(err){}
				innerMap.title				= ''
			}
		break
		case 'Assault':
			if ( playerNumber == currentPlayerNumber ) {
				if ( tTroops == 1 ) { return }
				setCursor('pointer')
				if ( userPrefs['showToolTips'] == 'Y' && title != fromRegion ) {
					t = 'Left-click: Set '+title+' as From-Region.'
					try{document.getElementById('magicmap').title
									= t}catch(err){}
					crosshair.title = t
					innerMap.title  = t
				}
				return
			}
			try {
				document.getElementById('to_region').value = regionNumber
			} catch (err) {return}
			if ( document.getElementById('to_region').value != regionNumber ) {return}
			setCursor('pointer')
			if ( userPrefs['showCrosshairs'] == 'Y' ) {
				crosshair.style.visibility = 'visible'
				crosshair.style.left = (parseInt(tX) - crosshairXoffset) + 'px'
				crosshair.style.top  = (parseInt(tY) - crosshairYoffset) + 'px'
			}
			if ( userPrefs['showToolTips'] == 'Y' ) {
				t = 'Left-click: Assault from '+fromRegion+' to '+title+'. Right-click/Shift-click: Auto-Assault.'
				try{document.getElementById('magicmap').title
								= t}catch(err){}
				crosshair.title = t
				innerMap.title  = t
			}
		break
		case 'Reinforce':
			try {
				document.getElementById('to_region').value = regionNumber
			} catch (err) {return}
			if ( playerNumber == currentPlayerNumber && tTroops != 1 ) {
				setCursor('pointer')
			}
			if ( document.getElementById('to_region').value != regionNumber ) {return}
			if ( playerNumber == currentPlayerNumber ) {
				setCursor('pointer')
				if ( userPrefs['showToolTips'] == 'Y' ) {
					t = 'Right-click/Shift-click: Reinforce '+selectedQuantity+' troops from '+fromRegion+' to '+title
					try{document.getElementById('magicmap').title = t}catch(err){}
					innerMap.title = t
				}
			}
			floatingQuantity.innerHTML = selectedQuantity
			if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
				floatingQuantity.style.visibility = 'visible'
			}
		break
	}
}
function onMapMouseMove(e) {
	debug('running')
	if ( ! document.getElementById('action') ) { debug('spectator game. returning'); return false }
	if ( sendingRequest ) { debug('returning because sendingRequest='+sendingRequest); return false }
	var overRegion
	mapOffsetLeft	= outerMapPos[0]
	mapOffsetTop	= outerMapPos[1]
	
	mouseOverX = e.pageX - mapOffsetLeft - 4
	mouseOverY = e.pageY - mapOffsetTop + 19
	try{document.getElementById('magicmap').title = ''}catch(err){}
	innerMap.title = ''
	AssaultFromMarker.title = ''
	advanceFromMarker.title = ''
	ReinforceFromMarker.title = ''
	crosshair.title = ''
	try{selectedQuantity = document.getElementById('quantity').value}catch(err){}
		
	for (i=0;i<cm_regions.length;i++) {
		title = cm_regions[i].getElementsByTagName('name')[0].textContent
		tX    = cm_regions[i].getElementsByTagName( mapx )[0].textContent
		tY    = cm_regions[i].getElementsByTagName( mapy )[0].textContent
		if ( tX > mouseOverX - 15 && tX < mouseOverX + 15 && tY > mouseOverY - 15 && tY < mouseOverY + 15 ) {
			// if we're over any region...
			overRegion		= cm_regions[i]
			tIndex				= i
			tTroops				= troops[i].split('-')
			playerNumber		= tTroops[0]
			updateMap(i, playerNumber, tTroops[1])
			break
		} else {
			crosshair.style.visibility        = 'hidden'
			floatingQuantity.style.visibility = 'hidden'
			setCursor('default')
		}
	}
	if ( ! overRegion ) { return false }
	tName = overRegion.getElementsByTagName('name')[0].textContent
	return false
}
function onMapClick(e) {
	debug('running')
	e.preventDefault()
	e.returnValue = false
	if ( sendingRequest ) { return false }
	wait('on')
	floatingQuantity.style.visibility = 'hidden'
	var clickedRegion
	mapOffsetLeft	= outerMapPos[0]
	mapOffsetTop	= outerMapPos[1]
	clickX = e.pageX - mapOffsetLeft - 4
	clickY = e.pageY - mapOffsetTop + 19
	// see if a region was clicked
	for (i=0;i<cm_regions.length;i++) {
		title = cm_regions[i].getElementsByTagName('name')[0].textContent
		tX    = cm_regions[i].getElementsByTagName( mapx )[0].textContent
		tY    = cm_regions[i].getElementsByTagName( mapy )[0].textContent
		if ( tX > clickX - 15 && tX < clickX + 15 && tY > clickY - 15 && tY < clickY + 15 ) {
			clickedRegion	= cm_regions[i]
			tIndex				= i
			tTroops				= troops[i].split('-')
			playerNumber		= tTroops[0]
			break
		}
	}
	if ( ! clickedRegion ) { debug('no region clicked. x:'+clickX+' y:'+clickY); wait('off'); return false }
	
	if ( e.button == 0 && ! e.shiftKey ) {
		try{document.getElementById('from_region').value = tIndex}catch(err){}
	}
	
	updateAction()
	if ( doAction == 'Waiting' ) {
		debug('not your turn. exiting')
		wait('off')
		return false
	}
	
	tName = clickedRegion.getElementsByTagName('name')[0].textContent
	
	try {		fromRegion = cm_regions[document.getElementById('from_region').value].getElementsByTagName('name')[0].textContent
	}catch(err){fromRegion = ''}
	
	try {		toRegion   = cm_regions[document.getElementById('to_region').value].getElementsByTagName('name')[0].textContent
	}catch(err){toRegion   = ''}
	
	try{selectFromRegion	= document.getElementById('from_region')}catch(err){}
	try{selectToRegion		= document.getElementById('to_region')}catch(err){}
	try{selectQuantity		= document.getElementById('quantity')}catch(err){}
	
	if ( selectQuantity ) { numTroops = selectQuantity.value; selectQuantity.focus() }
	
	switch(doAction) {
		case 'Deploy':
			selectToRegion.value = tIndex
			if ( selectToRegion.value != tIndex ) { wait('off'); return } // an enemy region was clicked during deployment
			toRegion = tName
			if ( deployDeferred ) {
				troopsLeftToDeploy        = actionString.split(' ')[2]
				confirmMessage			  = 'Deploy '+troopsLeftToDeploy+' troops on '+toRegion+'?'
				unsafeWindow.submitButton = 'Deploy'
				unsafeWindow.quantity = new Object()
				unsafeWindow.quantity.value = troopsLeftToDeploy
				return unsafeWindow.sendRequest('Deploy')
			}
			if ( ! deployDeferred ) {
				if ( ! document.getElementById('quantity') ) { wait('off'); return }
			}
			if ( e.button == 2 ) { //right click
				if ( userPrefs['deploymentClicks'] == 'Left-1 Right-Selected' ) {
					confirmMessage = 'Deploy '+selectQuantity.value+' troops on '+toRegion+'?'
				} else {
					selectQuantity.value	= "1"
					confirmMessage			= 'Deploy 1 troop on '+toRegion+'?'
				}
			} else if ( e.shiftKey ) {
				troopsLeftToDeploy      = actionString.split(' ')[2]
				selectQuantity.value	= troopsLeftToDeploy
				confirmMessage			= 'Deploy all '+troopsLeftToDeploy+' troops on '+toRegion+'?'
			} else {
				if ( userPrefs['deploymentClicks'] == 'Left-1 Right-Selected' ) {
					selectQuantity.value	= "1"
					confirmMessage			= 'Deploy 1 troop on '+toRegion+'?'
				} else {
					confirmMessage = 'Deploy '+selectQuantity.value+' troops on '+toRegion+'?'
				}
			}
		break
		case 'Assault':
			if ( fromRegion == '' || toRegion == '' ) { wait('off'); return }
			
			// if freindly, then set from_region and return
			if ( playerNumber == currentPlayerNumber ) {
				if ( tTroops[1] == 1 ) { wait('off'); return }
				// try to set from_region, but if there is an error (which would happen if a freindly region was clicked with no Assaultable enemies around it), then return
				try{selectFromRegion.value = tIndex}catch(err){wait('off'); return}
				try{unsafeWindow.filterTo(tIndex)}catch(err){}
				if ( selectFromRegion.value != tIndex ) { wait('off'); return }
				fromRegion = tName
				wait('off')
				return
			// if enemy, set as to_region and continue to Assault
			} else {
				try{selectToRegion.value	= tIndex}catch(err){}
				if ( selectToRegion.value != tIndex ) { wait('off'); setTimeout(function(){alert(tName+' is not accessible from '+fromRegion)}, 500); return }
				if ( e.button == 2 || e.shiftKey ) {
					doAction = 'Auto-Assault'
					if ( e.ctrlKey ) {
						// this is an Auto-Assault[x]   (doAction will remain 'Assault')
						minTroops		= prompt('Enter the minimum number of troops to remain on the Assaulting region:')
						if ( ! minTroops ) { wait('off'); return }
						doAction		= 'Assault'
						autoAssaultX		= true
					}
					if ( e.altKey ) {
						// this is an auto-Assault/advance
						debug('executing auto-Assault/auto-advance')
						autoAdvance = true
					}
				}
				toRegion = tName
			}
			confirmMessage = doAction+' from '+fromRegion+' to '+toRegion+'?'

			AssaultedFromRegion = fromRegion
		break
		case 'Advance':
			if ( ! document.getElementById('quantity') ) { wait('off'); return }
			debug('AssaultedFromRegion: '+AssaultedFromRegion)
			toRegion = tName
			if ( toRegion == '' ) { wait('off'); return }
			if ( toRegion != AssaultedToRegion && toRegion != AssaultedFromRegion ) { wait('off'); return }
			if ( toRegion == AssaultedFromRegion ) { selectQuantity.value = '0'; numTroops = '0'; }
			confirmMessage = 'Advance '+numTroops+' troops?'
		break
		case 'Reinforce':
			if ( ! document.getElementById('quantity') ) { wait('off'); return }
			if ( e.button == 2 || e.shiftKey ) {
				try{selectToRegion.value	= tIndex}catch(err){}
				if ( selectToRegion.value != tIndex ) { wait('off'); setTimeout(function(){alert(tName+' is not accessible from '+fromRegion)}, 500); return }
				toRegion				= tName
			} else {
				selectFromRegion.value = tIndex
				fromRegion			= tName
				toRegion				= ''
				try{unsafeWindow.filterTo(tIndex)}catch(err){}
				wait('off')
				return
			}
			if ( fromRegion == '' || toRegion == '' ) { wait('off'); return }
			confirmMessage = 'Reinforce '+numTroops+' troops from '+fromRegion+' to '+toRegion+'?'
		break
	}
	unsafeWindow.sendRequest(doAction)

}
function getCurrentPlayer() {
	var allPlayers = new Array();
	debug('getting player number for '+currentPlayerName)
	playerElements = document.getElementById('players').getElementsByTagName('span')
	for (var i=0;i<playerElements.length;i++) {
		if ( playerElements[i].className.match('player') ) {
			allPlayers.push(playerElements[i])
		}
	}
	for (var i=0;i<allPlayers.length;i++) {
		debug('checking player: '+allPlayers[i].innerHTML)
		debug( ':'+allPlayers[i].innerHTML+': == :'+currentPlayerName+': i: '+i+' i+1: '+(parseInt(i)+1) )
		if ( allPlayers[i].innerHTML == currentPlayerName || allPlayers[i].innerHTML.match(':'+currentPlayerName) ) {
			var playerNumber = i+1
			debug(currentPlayerName+': player '+playerNumber)
			break
		}
	}
	return playerNumber
}
function onKeyPress(e) {
	if ( sendingRequest ) { return false }
	if ( chatHasFocus ) { return false }
	switch ( e.which ) {
		case parseInt(userPrefs['phaseEndHotkey']) :
			if ( doAction == 'Assault' ) {
				unsafeWindow.sendRequest("End Assaults")
			}
			if ( doAction == 'Reinforce' ) {
				unsafeWindow.sendRequest("End Reinforcements")
			}
			return
		break
		case parseInt(userPrefs['nextGameHotkey']) :
			window.location='http://www.conquerclub.com/player.php?page=next'
			return
		break
		case parseInt(userPrefs['jumpToMapHotkey']) :
			window.location.replace('#map-cell')
			return
		break
		case parseInt(userPrefs['refreshMapHotkey']) :
			unsafeWindow.sendRequest()
			return
		break
		case parseInt(userPrefs['beginTurnHotkey']) :
			unsafeWindow.sendRequest('Begin Turn')
			return
		break
	}
	
	// update the selected troop quantity
	selectQuantity = document.getElementById('quantity')
	if ( ! selectQuantity ) { return }
	switch (parseInt(e.keyCode)+parseInt(e.which)) {
		case 37: 										  // left arrow
		case parseInt(userPrefs['decreaseTroopsHotkey']): // custom hotkey
			updateSelectedQuantity(parseInt(selectQuantity.value) - 1)
			break
		case 39: 										  // right arrow
		case parseInt(userPrefs['increaseTroopsHotkey']): // custom hotkey
			updateSelectedQuantity(parseInt(selectQuantity.value) + 1)
			break
	}
	if ( e.which > 47 && e.which < 58 ) { updateSelectedQuantity(e.which - 48) } // set troop quantity to the value of the number pressed
	selectedQuantity = selectQuantity.value
}
function updateSelectedQuantity(q) {
	try { selectQuantity = document.getElementById('quantity') } catch (err) { return }
	if ( ! selectQuantity ) { return }
	selectQuantity.value       = q
	if ( parseInt(selectQuantity.value) >= parseInt(fromRegion_troops[1]) ) {
		selectQuantity.value = parseInt(fromRegion_troops[1]) - 1
	}
	floatingQuantity.innerHTML = selectQuantity.value
	selectedQuantity           = selectQuantity.value
}
function onMouseWheel(e) {
	if ( sendingRequest ) { return false }
	if ( userPrefs['useMouseWheel'] != 'Y' ) { return }
	try { selectQuantity = document.getElementById('quantity') } catch (err) { return }
	if ( ! selectQuantity ) { return }
	if (e.detail) {
		delta = -e.detail/3		
		if ( delta > 0 ) { updateSelectedQuantity((parseInt(selectQuantity.value) + 1)) }
		if ( delta < 0 ) { updateSelectedQuantity((parseInt(selectQuantity.value) - 1)) }
		e.preventDefault()
		e.returnValue = false
	}
}
function setCookie(c_name,value,expiredays) {
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name) {
	if (document.cookie.length>0) {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1) {
		c_start=c_start + c_name.length+1 
		c_end=document.cookie.indexOf(";",c_start)
		if (c_end==-1) { c_end=document.cookie.length } 
		return unescape(document.cookie.substring(c_start,c_end))
	  }
	}
	return ""
}
function checkForUpdate(force) {
	// scriptURL = 'http://neo/conquerclubclickablemaps.user.js'
	scriptURL = 'http://userscripts.org/scripts/source/13824.user.js'
	GM_xmlhttpRequest({method: 'GET', url: scriptURL, onload: function(response) {
		responseArray = response.responseText.split('\n')
		for ( line in responseArray ) {
			if ( responseArray[line].match('var version = ') ) {
				serverVersion = responseArray[line].split(' ')[3]
				debug('server version: '+serverVersion)
				break
			}
		}
		//alert('server version: '+parseFloat(serverVersion)+', '+'version: '+version)
		if ( parseFloat(serverVersion) > version ) {
			if ( getCookie('CLICKABLE_MAPS_UPDATE_CHECK') && ! force ) { return }
			setCookie('CLICKABLE_MAPS_UPDATE_CHECK', 1)
			if ( confirm('There is a newer version of Clickable Maps available. Install it now?') ) {
				try{window.location = scriptURL}catch(err){}
				alert('Click OK after installation...')
				location.reload()
			}
		} else if ( force ) {
			alert('There are no updates available.')
		}
	}})
}
function debug(debug_text) {
	if ( ! debugging ) { return false }
	GM_log(debug.caller.toString().split(/{/)[0].split('function')[1]+': '+debug_text)
	// trace(debug_text) 
}
function showUserGuide(state) {
	switch(state) {
		case 0:
			backScreen.style.display = 'none'
			userGuide.style.display  = 'none'
		break
		case 1:
			userGuide.style.left	 = (document.width/2)-(parseInt(userGuide.style.width)/2)+'px'
			backScreen.style.opacity='.7'
			backScreen.style.display = 'inline'
			setTimeout(function(){userGuide.style.display  = 'inline'}, 300)
			// document.getElementById('close-user-guide').style.right = (document.width/2)-(parseInt(userGuide.style.width)/2)+65+'px'
		break
	}
}
function storeUserPrefs() {
	var a = defaultPrefs
	var p = new Array()
	for (i=0;i<a.length;i++) {
		pref_name  = a[i].split(':')[0]
		pref_value = userPrefs[pref_name]
		p[i] = pref_name+':'+pref_value
	}
	GM_setValue('USER_PREFS2', uneval(p))
}
function loadUserPrefs(def) {
	var a = eval(GM_getValue('USER_PREFS2', (def || '[]')))
	var p = new Array()
	for (i=0;i<a.length;i++) {
		p[a[i].split(':')[0]] = a[i].split(':')[1]
	}
	return p
}
function waitAndUpdateAction(option) {
	debug('option: '+option)
	if ( unsafeWindow.updating ) {
		setTimeout(function(){waitAndUpdateAction(option)}, 250)
	} else {
		updateAction()
		debug('doAction: '+doAction)
		if ( option == 'updateActionOnly' ) { return }
		if ( option == 'autoAdvance' && doAction == 'Advance' ) {
			unsafeWindow.sendRequest('Advance')
			return
		}
		wait('off')
		outerMapPos = findPos(outerMap)
	}
}
var existingSendRequest = unsafeWindow.sendRequest
unsafeWindow.sendRequest = function(_cmd) {
	debug('running unsafeWindow.sendRequest')
	if ( userPrefs['confirm'+_cmd] == 'Y' ) {
		setTimeout(function(){
			if ( confirm(confirmMessage) ) {
				existingSendRequest(_cmd)
				waitAndUpdateAction()
				return false
			} else {
				wait('off')
				return false
			}
		}, 500)
		return false
	}
	if ( _cmd == 'Reinforce' && ReinforcementsType != 'Unlimited' ) {
		if ( userPrefs['confirmPhaseEnd'] == 'Y' ) {
			setTimeout(function(){
				if( confirm('This will end your turn.  Are you sure?') ) {
					existingSendRequest('Reinforce')
					waitAndUpdateAction()
					return false
				} else {
					wait('off')
				}
			}, 500)
			return false
		}
	}
	if ( _cmd == 'End Assaults' || _cmd == 'End Reinforcements' ) {
		if ( userPrefs['confirmPhaseEnd'] == 'Y' ) {
			if ( !confirm('Are you sure you want to '+_cmd.toLowerCase()+'?') ) {wait('off'); return false}
		}
	}
	if ( _cmd == 'Assault' && autoAssaultX ) {
		autoAssaultXinterval = setInterval(function()
		{
			autoAssaultX = false
			debug('actionUpdated: '+actionUpdated)
			if ( actionUpdated == false ) { return false }
			debug('remainingTroops: '+remainingTroops)
			debug('minTroops: '+minTroops)
			if ( parseInt(remainingTroops) <= parseInt(minTroops) + 1 || doAction == 'Advance' ) {
				clearInterval(autoAssaultXinterval)
				if ( autoAdvance ) {
					autoAdvance = false
					debug("calling waitAndUpdateAction('autoAdvance')")
					waitAndUpdateAction('autoAdvance')
				} else {
					waitAndUpdateAction()
				}
				// setTimeout(function(){updateAction(); outerMapPos = findPos(outerMap); wait('off')}, 750)
			} else {
				existingSendRequest(_cmd)
				waitAndUpdateAction('updateActionOnly') // only run updateAction, don't get outerMap or turn wait off
				actionUpdated = false
			}
		}, 250)
	} else {
		existingSendRequest(_cmd)
		if ( _cmd == 'Auto-Assault' && autoAdvance ) {
			autoAdvance = false
			debug("calling waitAndUpdateAction('autoAdvance')")
			waitAndUpdateAction('autoAdvance')
		} else {
			waitAndUpdateAction()
		}
	}
	return false
}
function wait(state) {
	debug('wait '+state)
	if ( state == 'on' ) {
		sendingRequest = true
		setCursor('wait')
	} else {
		sendingRequest = false
		setCursor('default')
	}
}
function initialize() {
	outerMap			= document.getElementById('outer-map')
	innerMap			= document.getElementById('inner-map')
	mapName				= unsafeWindow.mapFile
	outerMapPos			= findPos(outerMap)
	mapCell				= document.getElementById('map-cell')
	currentPlayerName	= document.getElementById('leftColumn').getElementsByTagName('div')[1].getElementsByTagName('b')[0].innerHTML
	currentPlayerNumber = getCurrentPlayer()
	actionForm			= document.getElementById('action-form')
	enemyGif            = "data:image/gif,GIF89a-%00-%00%B3%00%00%FF%15%15%FF%FF%FF%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15!%F9%04%01%00%00%01%00%2C%00%00%00%00-%00-%00%00%04i0%C8I%AB%BD8%EB%CD%BB%FF%60(%8Ed%09%02%A6%89%A6%23%E0%B2%A2%BB%C2'%1D%DB%E1%8Cw%FA%BE%F5%3E%8An%18%94%F4%8EA%A0r%07%0C4%9B%C5%A8t%FAy%D1%AC%1A%99v%0Bur%B9%1C%2CKL-K%BB%16t%2B%CD%F6!%85Q%E2D%8D%A3%17%EDIs%5B%3F%E7%C3%FD%5Exudf%82L%80%88%89%8A%8B6%11%00%00%3B"
	enemyGifSmall       = "data:image/gif,GIF89a%0D%00%0D%00%B3%00%00%FF%15%15%FF%FF%FF%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15!%F9%04%01%00%00%01%00%2C%00%00%00%00%0D%00%0D%00%00%04!0%C8%09%A6%B5%20%DF%5D7%0DUwu%24%E6Ia%A6%A1jx%82%26%2C%8F%B0%E8%D9%F7%FA%E2A%04%00%3B"
	AssaultFromGif		= "data:image/gif,GIF89a(%00(%00%A2%05%00%00%00%00%08%94%10%7B%00%00%AD%00%00%FF%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%84X%BA%AC%F40J%D2%AA%5D3%EB%CB%8B%FEY%D7%7C%17)n%A23ua%3AJ%DC%EAV%F2%0B%CDld%3F%F8%A9%AB%B7%9E%8F%07%A4%08%87%3C%D8%11%E9%09.%91%BFgN)%9DF%AB1*%B6%A4%DD%D2%AE%DE%AF3l%01%931%E6s3M%AE%A9%8B%C47%DC(_%B3%B7%A8%B7%E9%FC%BBK%FB~GW%5D%7F%60%813%84vtK%89%8A%8B%3D%8Ds%8FP%93en%5C%91b(%20%95%94%9Cc%82%9F%A0%16%09%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%8EX%BA%DC%FE0%C6A%AB%A52%B3%CB%B9%96%5Dx%7D%8Dh%8E%A4%E9%A8Z%D8v%19L%16%F2S%CF%F7%86%CE%8B%B7%EE%BC%1EP1%0C%12%81E%E3%B1%A2c*%7F%96%25%E6%09u%26%A9%A8%EB%D3%A3Ur%9D%D4*%26%1A%B6E%C9%E5%D2%19%9C%96%8E%D1%ED%2F%3B-%9F%B6i%E4n%D0%87%9Fcwz)%7C%7Dv%7Fp%84%85F9%88%03%5B%83B%81b%89M%871%8B%94%5D%2C%20'n.%1F'%A0%93%96%A1%97%2F%A4~%7B%A4w%9D%A8%10%09%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%8AX%BA%DC%FE0%CAI%2B%138k%5B%B5%FF%02%F7%80%A4'.e%9A%89%A9SZ%24%05v%26%FCM%F7%99%8F%F5Y%F4%AE%8D%0F%25l%00%87%3B%E2jx)*%8E%CC%234%EA%9C%22%ABN%E6%13%8B%D1%06%97%DB%AE%D7%08%FE%95%C7fq8%84V%B2%D7%ED%F5%3B%AD%1E%03%AD%3E%60%20K%3D%D3%E7%7DurvSx4~r%80%1C%86I6%7Cd%86M%91%89%82%90%93n3%7F%8D2*-W%9D%8F%2C%A0%95Z%9Eq%A7%A8%14%09%00%00!%F9%04%05%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03)X%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40F%02%00!%F9%04%09%0C%00%05%00%2C%02%00%02%00%24%00%24%00%00%03rX%BA%AC%F20%8AFk%93X%DA%5D%B2%D7%1C%F3%8DP%D8%7D%14%BAyf%B6%82%A6%03%8Bs%7CFWm%DFO%5E%EE)%9C%EC%07%F4%FDtE%DE%04%99%D40%9B%AAd%90%25%9Db%AA%95(%96v%DD%1A%85%DE%055%AC%7C%16Gd%25%8F%0C2%DB%DA%E0%EA%CC%1D%9A%D3-%BA.P%CF%8Ds%5Cx%80%81%7CYhew%24%24%7B%89wV%89%5E%86!%09%00%00!%F9%04%05%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%86X%BA%BC%F40%C2Fk%958%DB%ED%B2%C7%DC%F5%11%CAH%86%A5%16%AA%1C%8B%16n%03%BE%B2%B4%D9%B48Qx%AE%3F%B5%9D%EFw%EA%08%87%BC%88%11%88%BC%09%95%CD%D6%0E%1A%B5(%A9%D5%1F%EC%98M%CE%BAD.x)%1E%A7z%E6%60%D9%ECI%AB%B1%EE%B6%9B%BC%06%CB%E7P%F88_%AF%F2%FBHXhYh%83Q%86%86%81z%5B%8B%2F_%5E%80aR%89N%8Do%7Dw(%26g%994%26%1F%84%9F%919%239%09%00%00%3B"
	advanceFromGif		= "data:image/gif,GIF89a(%00(%00%A2%06%00%00%00%00%08%94%10%8C%8C%00%C6%C6%00%F7%F7%00%FF%FF%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%84h%BA%AC%F50%CA%D2%AA%5D3%EB%CB%8D%FEY%D7%7C%17)n%A23ua%3AJ%DC%EAV%F2%0B%CDld%3F%F8%A9%AB%B7%9E%8F%07%A4%08%87%3C%D8%11%E9%09.%91%BFgN)%9DF%AB1*%B6%A4%DD%D2%AE%DE%AF3l%01%931%E6s3M%AE%A9%8B%C47%DC(_%B3%B7%A8%B7%E9%FC%BBK%FB~GW%5D%7F%60%813%84vtK%89%8A%8B%3D%8Ds%8FP%93en%5C%91b(%20%95%94%9Cc%82%9F%A0%16%09%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%8Eh%BA%DC%FE0%C6A%AB%A52%B3%CB%B9%96%5Dx%7D%8Dh%8E%A4%E9%A8Z%D8v%19L%1A%F2S%CF%F7%86%CE%8B%B7%EE%BC%1EP1%0C%12%81E%E3%B1%A2c*%7F%96%25%E6%09u%26%A9%A8%EB%D3%A3Ur%9D%D4*%26%1A%B6E%C9%E5%D2%19%9C%96%8E%D1%ED%2F%3B-%9F%B6i%E4n%D0%87%9Fcwz)%7C%7Dv%7Fp%84%85F9%88%03%5B%83B%81b%89M%871%8B%94%5D%2C%20'n.%1F'%A0%93%96%A1%97%2F%A4~%7B%A4w%9D%A8%10%09%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%8Ah%BA%DC%FE0%CAI%2B%138k%5B%B5%FF%02%F7%80%A4'.e%9A%89%A9SZ%24%05v%26%FCM%F7%99%8F%F5i%F4%AE%8D%0F%25l%00%87%3B%E2jx)*%8E%CC%234%EA%9C%22%ABN%E6%13%8B%D1%06%97%DB%AE%D7%08%FE%95%C7fq8%84V%B2%D7%ED%F5%3B%AD%1E%03%AD%3E%60%20K%3D%D3%E7%7DurvSx4~r%80%1C%86I6%7Cd%86M%91%89%82%90%93n3%7F%8D2*-W%9D%8F%2C%A0%95Z%9Eq%A7%A8%14%09%00%00!%F9%04%05%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03)h%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40F%02%00!%F9%04%09%0C%00%06%00%2C%02%00%02%00%24%00%24%00%00%03rh%BA%AC%F20%8AFk%93X%DAm%B2%D7%1C%F3%8DP%D8%7D%14%BAyf%B6%82%A6%03%8Bs%7CFWm%DFO%5E%EE)%9C%EC%07%F4%FDtE%DE%04%99%D40%9B%AAd%90%25%9Db%AA%95(%96v%DD%1A%85%DE%055%AC%7C%16Gd%25%8F%0C2%DB%DA%E0%EA%CC%1D%9A%D3-%BA.P%CF%8Ds%5Cx%80%81%7CYhew%24%24%7B%89wV%89%5E%86!%09%00%00!%F9%04%05%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%86h%BA%BC%F40%C2Fk%958%DB%ED%B2%C7%DC%F5%11%CAH%86%A5%16%AA%1C%8B%1An%03%BE%B2%B4%D9%B48Qx%AE%3F%B5%9D%EFw%EA%08%87%BC%88%11%88%BC%09%95%CD%D6%0E%1A%B5(%A9%D5%1F%EC%98M%CE%BAD.x)%1E%A7z%E6%60%D9%ECI%AB%B1%EE%B6%9B%BC%06%CB%E7P%F88_%AF%F2%FBHXhYh%83Q%86%86%81z%5B%8B%2F_%5E%80aR%89N%8Do%7Dw(%26g%994%26%1F%84%9F%919%239%09%00%00%3B"
	advanceToGif		= "data:image/gif,GIF89a%14%00%14%00%91%00%00%00%00%00RR%00%D6%D6%18%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%02'%84%0F%A2%8B%7D%0B%99K%B1%AAf%B3%40%DA%BE%EEQ%60%24%8E%E6%89%A6%EA%0A%1A%AB%AB~'7c%E3%04g8%0DM%05%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%025%84%0F%A2%8B%7D%0B%99K%B1%AAV%8D%A0%10u%17%3D%D2%C4m%1C)%5E%1FZ%AE%A8%C5zY%0C%C7%ED%F8%5E'%FB%85%E4%EAJ%E94%B0%99%CC%12%3C%D6hI%40%01%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%025%84%0F%A1%8B%7D%1B%12t%86Q%FB%22%CDMm%E4U%DA%C7%25%A4%13%85g%A6%AER%BBb%AE8%BA%D3l%E6%B3%06%7Fj%8F%AA%01A5%DAe%F8%82%C86%CAM%01%00!%F9%04%05d%00%00%00%2C%00%00%00%00%14%00%14%00%00%02%11%84%8F%A9%CB%ED%0F%A3%9C%B4%DA%8B%B3%DE%BC%FB%AF%15%00!%F9%04%05%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%024%84%0F%A1%8B%7D%1B%12t%86Q%FB%22%CDMm%E4U%DA%C7%25%A4%13%85g%A6%AER%BBb%EE%3B%BA%D3l%E6%B6%06%7Fj%8F%AA%C9%82%97%1A%CB%07I%C6n%8E%02%00!%F9%04%05%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%024%84%0F%A2%8B%7D%0B%99K1Q%F90%AAY%CC%0E~%A1%22n%A4VF%5E%D9%91l%EB%BE%EAk%9C1%EB%DE%A2%84NX%DF2%A1%3C%3D%95qg%D4%7D%20%9F%02%00%3B"
	//green one: advanceToGif        = "data:image/gif,GIF89a%14%00%14%00%F7%04%00%00%00%00%00%B5%18%08k%08B%FFJ%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08C%00%09%08%1CH%60%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%23%1AL(%B1%E2%00%82%16%25.%CC%A8%11%22%C7%86%1E%3F%8A%1CI%B2%A4%C9%93%1C%05%9ETir%E3H%8C%2F)~%7C%C8%B2%22M%98%0C%1F%06%04%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08U%00%09%08%1CH%20%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%23%1AL%18Q%60%00%88%0C%09fT%D8p%A1%C3%87%18%2Fb%04%E9q%E2F%92!O%92%94%88Rc%C5%96%2C%5B%A6%FC%B8r%E2H%94%1B%3B%82%3C%A9%B2%A4M%8B%2C_%BA%94%D8shL%98E%09%04%04%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08U%00%09%08%1CH%40%80%C1%83%04%13%0E%3C(%A0%20C%85%02%11B%94%B8%B0!%C4%8A%09%0D%5E%24%A81%A2%C5%8D%18%0B%82T%D8%B0%E3%C8%8A%26O%3ALy%92%A2J%8F%1FU%3E%7C)%B2%E6K%8B%2C7%9A%CCI2%26O%8E1aN%FC%B9%92%A1%CB%8BF%2F%06%04%00!%F9%04%05d%00%04%00%2C%00%00%00%00%14%00%14%00%00%08%22%00%09%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DCh1%20%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08T%00%09%08%1CH%40%80%C1%83%04%13%0E%3C(%A0%20C%85%02%11B%94%B8%B0!%C4%8A%09%0D%5E%24%A81%A2%C5%8D%18%0B%82T%D8%B0%E3%C8%8A%26O%3ALy%92%A2%CA%95%1FU%3E%7C)%B2%A6L%8B%2C7%9A%CCI2%A6%CB%9E%13c%A2%D4%C9%B0h%CB%99%0A%03%02%00!%F9%04%05%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08T%00%09%08%1CH%20%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%0BBt%B8%90%22%C1%88%15%03%3C%CC%C8qcG%83%1E%2F%82%B4%18%B2%A1%C6%90%19A%A2L%A9r%A5%C9%95%02G%B6D%A9r%A6G%87%24%1FR%CC%99R%24I%8D9M%0A%BD)%D4%E6F%86%1B%03%02%00%3B"
	ReinforceFromGif		= "data:image/gif,GIF89a(%00(%00%F7%5C%00%00%00%00%00%18%08%00!%08%00)%08%001%08%001%10%009%08%009%10%00B%08%00B%10%00J%10%00R%10%00Z%08%00Z%10%00c%10%00c%18%00k%10%00k%18%00s%10%00s%18%00%7B%08%00%7B%10%00%7B%18%00%84%10%00%84%18%00%8C%00%00%8C%10%00%8C%18%00%94%10%00%94%18%00%9C%08%00%9C%10%00%9C%18%00%A5%10%00%A5%18%00%A5!%00%AD%18%00%B5%10%00%B5%18%00%BD%18%00%C6%18%00%C6!%00%CE%18%00%CE!%08c%18%08k%18%08s%18%08%7B%10%08%7B%18%08%84%10%08%84%18%08%94%10%18%84B!%7B9!%84J!%8CJ!%8CR!%94R!%9CJ)%94J)%94R)%9CR)%9CZ)%A5R)%A5Z)%ADZ)%ADc)%B5c1%ADc1%B5c1%BDc1%BDk1%C6k1%C6s1%CEk1%CEs1%D6s1%DE%7B9%ADR9%CEk9%D6s9%D6%7B9%DE%7B9%E7%7B9%E7%849%EF%849%F7%849%F7%8CB%EF%84B%F7%84B%F7%8CB%FF%8C%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CHP%E0%0D%22K%A8hY%C8p!%95%25%40l%14%9CHq%A0%0D%1EG%B04%DC%B8%91J%91%1B%15Cr%B9%81%24%0B%C7%93%1B%B1%14%91(%92%20%0F)'%2B.4%C9p%09%C8%965%80h%D4%B2%B3%E5%C0%8DSx%88%B4Q%84%A1I%9F%13y.%C4%02%24d%D1%99Z%90R%D4B%13%8B%0F%8A%40%96F%95%1A%92!%15%A1.5b%C9%C2%B5%A5B-RXr%A9%B1d%E1%94%B2%3E%A7%2C%2420%2BZ%B8%3E%B1%88%DD%C1%05%07L%2CT%F0%FA%84%B2%10%09%17%22%0B%A1%08F%FA%B7%07a%2CK%16%FBL%B20%E3%5D%C9-%99h%24%AC%E5%09f%9FQ%94b1%F2%B9%E5%11%86X%E8%96%0Ey%DA%E1j%91BvJy-%B2%CA%C2%D9%B4)%EA8%8B%3BwA%22%3BS%FB.%F8%94%A7%90%E1%04%5B%2F%2C%82%7C%20%E5%9D%86%9Bs%81I%C56%95%A6%C8%9FF%09%AD%E5H%F3%C7K%A2%84h%A4%E2d%F8%10%8DQ%04r%F6%EE%9B%3B%7B%26%0AU%E6F%B20%FD%40%24%E3%8F%AF.b%92Jt%E7%89%AD%26D%7CIP%C4Y%14%FA-%26%04LZ%FCW%D0%13%0Cb%C1%1E%5EG%9C%15YHO%B4u%9BjR%0D%C1%5D%16%17%B6%84%DFRP0%D7%12B%C1M%E8%D3%10%1A%3A%84D%11D%E8%17c%11H%C8%C5%10%14C%E0U%04w%A8%01%26%85%5E%1BEa%E2bD%20%F1%23JXH%91%04%87!%05%04%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%F7%00%B9%08%1CH%B0%A0%C1%83%08%13%26%EC%00B%84%89%13%10O%98%20!%02%84%C2%8B%047%800%91%A2%A3%C7%8F%1DO%88%C0%A8%10%C4%09%90(A%8A%24YP%03%89%940U%92%60%C9e%C3I%94%2B%0C%AE%80i%82%24%88%94%18S%F6T%D8%01%25M.(%87%1E%D4p%B3c%CE%A3H%8D%1E%14%01%12%EA%40%95%07%8B~%B4JP*%C1%A6O%B9%5E%AD%3A%F0%A7G%B1%06%C9%0A%E4x%16mW%B2%1B%B6%BA%7D%2B%97j%DB%B9cC%0Al%9A%02%2F%DD%B3%7C%FD%E6%3D%2BWp%D4%AD%1E%C3%1A%AEZx1%E2%BB%82%8D%06v%BCur%E4%AA%2F!%E3%25k%B7%23%E5%BB%96%E7z%CD%ECy3%DF%BE%83Q%BB%F5%BAV-W%95%AA%07%9E%16%0B%D4%20i%CD%24k%1Fd%DB8%A8%EE%DD0%15%C6%8C%8D%F0%B4%D4%E1%B8%11%A60%8E%9Cu%EE%E61_Cw-%1D%BA%E1%C3%CE%15%06%04%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0!%C1%04%10%15%2CX%A0%00%E2%01%87%0D!6h%E1%A2%A3%C7%8E-%16%24%B8%88%D1%60%01%05%1C%3F%AA%FC%C8BA%81%92%03%0F%B0P%09C%86M%9B0V.%20P2%40%82%94.j%DA4%18%C3%26K%92%0C%0B%2C%F8X%93%A1%8C%9C%20%13d%F4%D8%D4a%05%A8.Z%F0Th%20e%D5%92O%3B%B2%18%90p%C0%CC%A00%60%0E%C4%AA%20%E1%D2%8Ei%D5%AE%F5(%D5%E0O%8Fr%09%B24%60%F0m%C7%BCz%E9%16%1C%00%14p%E0%8E%0D%0A*%F8h%F8%B0%0B%BE%03%CF%FEm%2C%F0%E3%02%82%0E%18S%E6%F21%F1%C0%C2%9B9%7Bt%E08te%90%A5M%7B%84%90%3A%F4%EA%D6%94%3F%92%1E%98%19%EF%E6%CE%04_%60u%0D7%06%C1%19P%5B%DC%F6j0%B8%0B%CA%92%E3%12%94%E1%91E%E3%16%5E%2F%1C%C4%EA%1C%B0d%19%085P%CF%9B%5C!s%B1%97aJ%A2%84%8B%DD%BB%C7%90%D5%19%B2%D8%E8%B1%FC%C2%EF%E0%DB%26%94(%D9%85%7B%A7X%B3%8A%84(%F0%00%C4%05%40%05u_CF%AD%B4%5E%03%2C%04H%5E%5Ea%AD%E4%E0WyY%D0%E0%835a%60%DAM%18%DEd%DA%86%1C.%14%10%00%00!%F9%04%05%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08C%00%B9%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DC%C8%B1%A3%C7%8F%20C%8A%1CI%B2%A4%C9%93(S%AA%5C%C9%B2%A5%CB%970c%CA%9CI%B3%A6%CD%9B8%09%06%04%00!%F9%04%09%0C%00%5C%00%2C%02%00%02%00%24%00%24%00%00%08%F6%00%B9%08%1CHP%E0%84%09.%5C%C0X%08%C3%C5%84%08%05%23J%2C%18Aa%C3%84%18%13.%7C8%B1%23%97%08%0B3%8A%14%B9%D0%81%C7%82%13.%8E%5C%89%11%06%C4%93%08Uf%8C%B8%12%C6%04%8F)G%9E%E4B%F2%E6D%9D%3B%07ft)Q%E1%CC%A0%04%87%9A%24%D8B%26R%9A-%0B%3A%7D%0AU%A1O%9E*%A9%16m%09A%E0T%AD%053%DE%04%99%B0%05%D8%AD%1A%B9%20%C4x%16%ADK%91m%ABj%3C%1AW%E8P%B6u%93%DEM%987%AC%C6%AC%7D%EDZ%C4%1B%98g%C2%B5%7C%0B%8BD%ECB%B1F%08d%13%F7m%F9%80%0B%E0%BCC%0D%D2%8D%DB%F2e%E4%C6u3%0F%FCz%B6%E5U.%0EHS%15M%F03%E8%D5%5C%252%96%7C%92%E4%CB%A22i%CB%D5xZ%A2k%B8%86k%BE%F6%98%3A7%CB%A1f%9F%E6%3C~%F7%2C%84%94%C6%FFr%AC%DB%C2%E1%E2%AE%3B%03%02%00!%F9%04%05%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CHp%A0%07%11%24L%A4X%B8%F0%84%09%12%22%0AJ%9C8Q%84B%86%183%A601%82%A2%C7%81%165%8A%CC%C8%F1%E3D%12%1A!%8A%88%C8ee%C8%8C%2CMr%C9pq%A1%89%98%1E_.%24!S%C4%09%86'p%F6%C4x%22%83%C7%0C%18M%C8%9CH%93%A1R%8A5y.%A5%88r%E7I%86R%A7Be%D8%91%20R%9BZ%3F~%DDX%F0b%D1%B0%1FE0%8C%A9v%A1P%B4%12%AB%A6%18x%F1)%DC%8F%3FSH%5D%7B%D7dU%A5mO%F45%E9%81!%97%8BY%07S%CC%EB%D3%AD%E2%8FUI%E4%0D%F18%A7M%C3%95)%06%C6%9Cy%A2%C6%CE%155%BE%ED%5C%F5%04c%D0%05%FF%5E%1C%9Dy%F5_%D4%04%19%B7%9D%0B%BB%25f%BE%B0%EB%0A4%5B%1B%F7%08%DC%9Dy%D3eh4%F3l%9C%BF%C1VNN%B6%E0%EC%C4%7D%F3%A6(%9E%DA)u%B4M%1D%2F%C6%C8%3A%ADt%E8%05%B31%5B%D5*%B7%B9_%A2%24%3C%7C%F4%20%19%23x%8F%23j%DAT)0%04B%F9)%82%C2m%3Cr%E4%7B%F2%F8%89t%C2%7Fw%DDg%DA%81%10i%15%10%00%00%3B"
	
	if ( document.getElementById('dashboard').innerHTML.match('Reinforcementss: <b>Unlimited</b>') ) {
		ReinforcementsType   = 'Unlimited'
	} else {
		ReinforcementsType	= ''
	}
	debug('ReinforcementsType: '+ReinforcementsType)
	// get teams
	try{
	    teamGame = document.getElementById('players').getElementsByTagName('b')[0].innerHTML
	}catch(err){teamGame=0}
	t=0; p=0
	if ( teamGame ) {
		var playerList = document.getElementById('players').getElementsByTagName('li')
		t=0;p=0
		for ( item in playerList ) {
		    if ( ! playerList[item].innerHTML ) { continue }
		    if ( playerList[item].innerHTML.match('Team') ) {
		        t=t+1
		        teams[t] = new Array()
		    }
		    if ( playerList[item].innerHTML.match('class="player') ) {
		        p=p+1
		        teams[t][p] = playerList[item].getElementsByTagName('span')[0].innerHTML
				if ( p == currentPlayerNumber ) {
					currentPlayerTeam = t
				}
		    }
		}
	}
	
	setTimeout(function(){checkForUpdate(0)}, 1000)

	innerMap.style.cursor = 'default'
	setCursor('default')

	userGuide = document.createElement('div')
		userGuide.id				= 'user-guide'
		userGuide.style.position	= 'fixed'
		userGuide.style.overflow	= 'auto'
		userGuide.style.background	= '#eeffee'
		userGuide.style.width		= '600px'
		userGuide.style.height		= screen.height - 300+'px' //'600px'
		userGuide.style.top			= '50px'
		userGuide.style.zIndex		= 101
		userGuide.style.border		= 'thick double #000000'
		userGuide.style.display		= 'none'
		userGuide.innerHTML			= userGuideHTML
	document.body.appendChild(userGuide)

	document.getElementById('close-user-guide').addEventListener('click', function(){showUserGuide(0)}, false)

	backScreen = document.createElement('div')
		backScreen.style.position	= 'fixed'
		backScreen.style.top		= '0px'
		backScreen.style.left		= '0px'
		backScreen.style.width		= '100%'
		backScreen.style.height		= '100%'
		backScreen.style.background	= '#000000'
		backScreen.style.opacity	= '.7'
		backScreen.style.zIndex		= 100
		backScreen.style.display	= 'none'
	document.body.appendChild(backScreen)
		
	// set default preferences, then update userPrefs if necessary
		defaultPrefs.push('actionMenu:normal')
		defaultPrefs.push('mapBorder:thin')
		defaultPrefs.push('showCrosshairs:Y')
		defaultPrefs.push('showFromMarker:Y')	
		defaultPrefs.push('showAdvanceToMarker:Y')	
		defaultPrefs.push('showFloatingQuantity:Y')	
		defaultPrefs.push('showToolTips:Y')	
		defaultPrefs.push('confirmDeploy:Y')
		defaultPrefs.push('confirmAssault:Y')
		defaultPrefs.push('confirmAuto-Assault:Y')
		defaultPrefs.push('confirmAdvance:Y')
		defaultPrefs.push('confirmReinforce:Y')
		defaultPrefs.push('confirmPhaseEnd:Y')
		defaultPrefs.push('phaseEndHotkey:'			+'e'.charCodeAt(0))
		defaultPrefs.push('nextGameHotkey:'			+'n'.charCodeAt(0))
		defaultPrefs.push('jumpToMapHotkey:'		+'m'.charCodeAt(0))
		defaultPrefs.push('refreshMapHotkey:'		+'r'.charCodeAt(0))
		defaultPrefs.push('beginTurnHotkey:'		+'b'.charCodeAt(0))
		defaultPrefs.push('increaseTroopsHotkey:'	+'w'.charCodeAt(0))
		defaultPrefs.push('decreaseTroopsHotkey:'	+'s'.charCodeAt(0))
		defaultPrefs.push('useMouseWheel:Y')
		defaultPrefs.push('deploymentClicks:Left-1 Right-Selected')
		
	// replace any missing values in userPrefs with the default
	userPrefs = loadUserPrefs()
	for ( var pref in defaultPrefs ) {
		if ( userPrefs[defaultPrefs[pref].split(':')[0]] == 'undefined' || ! userPrefs[defaultPrefs[pref].split(':')[0]] ) {
			userPrefs[defaultPrefs[pref].split(':')[0]] = defaultPrefs[pref].split(':')[1]
		}
	}
	storeUserPrefs()

	userPrefs = loadUserPrefs()

	for ( pref in userPrefs ) {
		debug('userPrefs: '+userPrefs[pref])
	}

	crosshair = document.createElement('img')
		crosshair.id				= 'cm-crosshairs'
		crosshair_w					= 47
		crosshair_h					= 47
		crosshair.src = enemyGif
		crosshair.style.width		= crosshair_w+'px'
		crosshair.style.height		= crosshair_h+'px'
		crosshair.style.zIndex		= 0
		crosshair.style.position	= 'absolute'
		crosshair.style.visibility	= 'hidden'
		crosshair.title = 'test'
	mapCell.appendChild(crosshair)
	crosshairXoffset = (crosshair_w / 7)
	crosshairYoffset = (crosshair_h / 2)
		
	AssaultFromMarker = document.createElement('img')
		AssaultFromMarker.id					= 'cm-Assault-from-marker'
		AssaultFromMarker_w = 45
		AssaultFromMarker_h = 45
		AssaultFromMarker.src = AssaultFromGif
		AssaultFromMarker.style.width		= AssaultFromMarker_w+'px'
		AssaultFromMarker.style.height		= AssaultFromMarker_h+'px'
		AssaultFromMarker.style.zIndex		= 0
		AssaultFromMarker.style.left			= '-1000px'
		AssaultFromMarker.style.position		= 'absolute'
		AssaultFromMarker.style.visibility	= 'hidden'
	AssaultFromMarkerXoffset = (AssaultFromMarker_w / 7)
	AssaultFromMarkerYoffset = (AssaultFromMarker_h / 2)
	mapCell.appendChild(AssaultFromMarker)
	
	ReinforceFromMarker = document.createElement('img')
		ReinforceFromMarker.id				= 'cm-Reinforce-from-marker'
		ReinforceFromMarker_w = 45
		ReinforceFromMarker_h = 45
		ReinforceFromMarker.src = ReinforceFromGif
		ReinforceFromMarker.style.width		= ReinforceFromMarker_w+'px'
		ReinforceFromMarker.style.height		= ReinforceFromMarker_h+'px'
		ReinforceFromMarker.style.zIndex		= 0
		ReinforceFromMarker.style.left		= '-1000px'
		ReinforceFromMarker.style.position	= 'absolute'
		ReinforceFromMarker.style.visibility	= 'hidden'
	ReinforceFromMarkerXoffset = (ReinforceFromMarker_w / 7)
	ReinforceFromMarkerYoffset = (ReinforceFromMarker_h / 2)
	mapCell.appendChild(ReinforceFromMarker)
	
	advanceFromMarker = document.createElement('img')
		advanceFromMarker.id				= 'cm-advance-from-marker'
		advanceFromMarker_w = 45
		advanceFromMarker_h = 45
		advanceFromMarker.src = advanceFromGif
		advanceFromMarker.style.width		= advanceFromMarker_w+'px'
		advanceFromMarker.style.height		= advanceFromMarker_h+'px'
		advanceFromMarker.style.zIndex		= 0
		advanceFromMarker.style.left		= '-1000px'
		advanceFromMarker.style.position	= 'absolute'
		advanceFromMarker.style.visibility	= 'hidden'
	advanceFromMarkerXoffset = (advanceFromMarker_w / 7)
	advanceFromMarkerYoffset = (advanceFromMarker_h / 2)
	mapCell.appendChild(advanceFromMarker)
	
	advanceToMarker = document.createElement('img')
		advanceToMarker.id					= 'cm-advance-to-marker'
		advanceToMarker_w = 20
		advanceToMarker_h = 20
		advanceToMarker.src = advanceToGif
		advanceToMarker.style.width			= advanceToMarker_w+'px'
		advanceToMarker.style.height		= advanceToMarker_h+'px'
		advanceToMarker.style.zIndex		= 0
		advanceToMarker.style.left			= '-1000px'
		advanceToMarker.style.position		= 'absolute'
		advanceToMarker.style.visibility	= 'hidden'
	advanceToMarkerXoffset = -6
	advanceToMarkerYoffset = 11
	mapCell.appendChild(advanceToMarker)

	floatingQuantity = document.createElement('div')
		floatingQuantity.id					= 'cm-floating-quantity'
		floatingQuantity_w = 15
		floatingQuantity_h = 15
		floatingQuantity.style.paddingTop	= '0px'
		floatingQuantity.style.paddingBottom= '0px'
		floatingQuantity.style.paddingLeft	= '1px'
		floatingQuantity.style.paddingRight	= '1px'
		floatingQuantity.style.zIndex		= 1
		floatingQuantity.style.left		    = '-1000px'
		floatingQuantity.style.position 	= 'absolute'
		floatingQuantity.style.visibility	= 'hidden'
		floatingQuantity.style.border		= 'thin solid #ffffff'
		floatingQuantity.style.color		= '#ffffff'
		floatingQuantity.style.background	= '#556655'
	floatingQuantityXoffset = 15
	floatingQuantityYoffset = -25
	mapCell.appendChild(floatingQuantity)

	// insert menu container
	menuDiv = document.getElementById('leftColumn').getElementsByTagName('div')[1]
	clickableMapMenuDiv = document.createElement('div')
	clickableMapMenuHeading = document.createElement('h3')
	clickableMapMenu = document.createElement('ul')
	if(version.toString().length == 1){v=version.toString()+'.0'}else{v=version}
	clickableMapMenuDiv.id = 'clickable_map_menu'
	clickableMapMenuHeading.innerHTML = '<b>Clickable Maps v'+v+'</b>'
	menuDiv.appendChild(clickableMapMenuDiv)
	clickableMapMenuDiv.appendChild(clickableMapMenuHeading)
	clickableMapMenuDiv.appendChild(clickableMapMenu)

	// CREATE MENU ITEMS- [ createMenuItem( parent, id, listener, method, displayText, value )  ]
	// appearance
	sm= createMenuItem(clickableMapMenu, 'appearanceSubMenu', 'mouseover', function(){void(0)}, 'Appearance...')
		createMenuItem(sm, 'actionMenu',           'click', function(){setPref(this)}, 'Action Menu:',     userPrefs['actionMenu'])
		createMenuItem(sm, 'mapBorder',            'click', function(){setPref(this)}, 'Map Border:',      userPrefs['mapBorder'])
		createMenuItem(sm, 'showCrosshairs',       'click', function(){setPref(this)}, 'Show Enemy Crosshairs (Assault Phase)?<br><img border=0 height="13px" width="13px" src="'+enemyGifSmall+'" />',  userPrefs['showCrosshairs'])
		createMenuItem(sm, 'showFromMarker',       'click', function(){setPref(this)}, 'Show From-Region Marker (Assault/Advance/Reinforce Phases)?<br><img border=0 height="15px" width="15px" src="'+advanceFromGif+'" />', userPrefs['showFromMarker'])
		createMenuItem(sm, 'showAdvanceToMarker',  'click', function(){setPref(this)}, 'Show Advance-To Marker (Advance Phase)?<br><img border=0 height="10px" width="10px" src="'+advanceToGif+'" />', userPrefs['showAdvanceToMarker'])
		createMenuItem(sm, 'showFloatingQuantity', 'click', function(){setPref(this)}, 'Show Floating Troop Counter Over Map?', userPrefs['showFloatingQuantity'])
		createMenuItem(sm, 'showToolTips',         'click', function(){setPref(this)}, 'Show Help Tool-Tips?',  userPrefs['showToolTips'])

	// confirmations
	sm= createMenuItem(clickableMapMenu, 'confirmationSubMenu', 'mouseover', function(){void(0)}, 'Confirmations...')
		createMenuItem(sm, 'confirmDeploy',	     'click', function(){setPref(this)},    'Confirm Deploy?',	    userPrefs['confirmDeploy'])
		createMenuItem(sm, 'confirmAssault',	     'click', function(){setPref(this)},    'Confirm Assault?',	    userPrefs['confirmAssault'])
		createMenuItem(sm, 'confirmAuto-Assault', 'click', function(){setPref(this)},    'Confirm Auto-Assault?', userPrefs['confirmAuto-Assault'])
		createMenuItem(sm, 'confirmAdvance',	 'click', function(){setPref(this)},    'Confirm Advance?',	    userPrefs['confirmAdvance'])
		createMenuItem(sm, 'confirmReinforce',	 'click', function(){setPref(this)},    'Confirm Reinforce?',	    userPrefs['confirmReinforce'])
		createMenuItem(sm, 'confirmPhaseEnd',	 'click', function(){setPref(this)},    'Confirm Phase End?',	userPrefs['confirmPhaseEnd'])

	//  controls
	sm= createMenuItem(clickableMapMenu, 'controlSubMenu', 'mouseover', function(){void(0)}, 'Controls...')
		createMenuItem(sm, 'phaseEndHotkey',	   'click', function(){setHotkey(this)}, 'Phase End Hotkey:',   String.fromCharCode(userPrefs['phaseEndHotkey']))
		createMenuItem(sm, 'nextGameHotkey',	   'click', function(){setHotkey(this)}, 'Next Game Hotkey:',   String.fromCharCode(userPrefs['nextGameHotkey']))
		createMenuItem(sm, 'jumpToMapHotkey',	   'click', function(){setHotkey(this)}, 'Jump to Map Hotkey:', String.fromCharCode(userPrefs['jumpToMapHotkey']))
		createMenuItem(sm, 'refreshMapHotkey',	   'click', function(){setHotkey(this)}, 'Refresh Map Hotkey:', String.fromCharCode(userPrefs['refreshMapHotkey']))
		createMenuItem(sm, 'beginTurnHotkey',	   'click', function(){setHotkey(this)}, 'Begin Turn Hotkey:',  String.fromCharCode(userPrefs['beginTurnHotkey']))
		createMenuItem(sm, 'increaseTroopsHotkey', 'click', function(){setHotkey(this)}, 'Increase Troops: <font style="font-weight:bold;">right-arrow</font> or ',  String.fromCharCode(userPrefs['increaseTroopsHotkey']))
		createMenuItem(sm, 'decreaseTroopsHotkey', 'click', function(){setHotkey(this)}, 'Decrease Troops: <font style="font-weight:bold;">left-arrow </font> or ',  String.fromCharCode(userPrefs['decreaseTroopsHotkey']))
		createMenuItem(sm, 'useMouseWheel',	       'click',	function(){setPref(this)},   'Use Mouse Wheel to Increase/Decrease Troops? ',	userPrefs['useMouseWheel'])
		createMenuItem(sm, 'deploymentClicks',	   'click',	function(){setPref(this)},   'Deployment Clicks: ',	userPrefs['deploymentClicks'])
		
	// update
	createMenuItem(clickableMapMenu, 'checkForUpdates', 'click', function(){checkForUpdate(1)}, 'Check for Updates', '')

	// help
	createMenuItem(clickableMapMenu, 'userGuide', 'click', function(){showUserGuide(1)}, 'User Guide', '')

	//  load user prefs into menus
	for (var pref in userPrefs) {
		var el = document.getElementById(pref)
		switch(pref) {
			case 'actionMenu':
				// if BOB is running, remove the action menu option to prevent conflicts with BOB's HUD
				if ( bob ) {
					el.parentNode.parentNode.removeChild(el.parentNode)
					break
				}
				switch(userPrefs[pref]) {
					case 'normal': // DO NOTHING because on initial load, it will already be normal, unless someone is using another script to do the same thing, in which case we don't want ot undo it :)
						break
					case 'floating':
						if ( actionForm ) {
							actionForm.style.width='100%'
							actionForm.style.left='0px'
							actionForm.style.position='fixed'
							actionForm.style.bottom=0
							actionForm.style.zIndex=1
						}
						break
				}
				break
			case 'mapBorder':
				// color will be set by updateAction
				var thin	= '2px'
				var thick	= '4px'
				switch(userPrefs[pref]) {
					case 'off':
						// do nothing
					break
					case 'thin':
						outerMap.style.border	= thin + ' solid #eeeeee'
						outerMap.style.left		= '-'+thin
						outerMap.style.top		= '-'+thin
					break
					case 'thick':
						outerMap.style.border	= thick + ' solid #eeeeee'
						outerMap.style.left		= '-'+thick
						outerMap.style.top		= '-'+thick
					break
				}
			break
			default:
				if ( el.id.match('Hotkey') ) {
					n = String.fromCharCode(userPrefs[pref])
					if ( n != String.fromCharCode('-1') ) {
						el.getElementsByTagName('b')[0].innerHTML = n
					} else {
						el.getElementsByTagName('b')[0].innerHTML = '(none)'
					}
				} else {
					if ( el.id.match('confirm') ) {
						// if BOB is running, then remove the confirmations that BOB also has to prevent conflicts
						if ( bob && ( el.id == 'confirmDeploy' || el.id == 'confirmAuto-Assault' || el.id == 'confirmPhaseEnd' ) ) {
								el.parentNode.parentNode.removeChild(el.parentNode)
								userPrefs[pref] = 'N'
						} else {
							el.getElementsByTagName('b')[0].innerHTML = userPrefs[pref]
						}
					}
				}
				break
		}
	}

	mapCell.addEventListener('click',       	onMapClick,     false)
	mapCell.addEventListener('contextmenu', 	onMapClick,     false)
	mapCell.addEventListener('mousemove',   	onMapMouseMove, false)
	mapCell.addEventListener('mouseout',    	function(){crosshair.style.visibility = 'hidden'; floatingQuantity.style.visibility = 'hidden', setCursor('default')}, false)
	mapCell.addEventListener('DOMMouseScroll',	onMouseWheel,	false)

	document.addEventListener('keypress', 	    onKeyPress,		false)
	
	updateXML()
} // END initialize()

document.getElementById('message').addEventListener('focus', function(){chatHasFocus = 1}, false)
document.getElementById('message').addEventListener('blur',  function(){chatHasFocus = 0}, false)

// DECLARATIONS
var outerMap
var innerMap
var mapName
var outerMapPos
var mapCell
var currentPlayerName
var currentPlayerNumber
var actionForm
var AssaultFromGif
var advanceFromGif
var ReinforceFromGif
var advanceToGif
var enemyGif
var enemyGifSmall
var ReinforcementsType
var confirmMessage
var mapHeight
var mapWidth
var mapSize
var mapx
var mapy
var mapOffsetLeft
var mapOffsetTop
var fromRegion
var toRegion
var AssaultedFromRegion
var AssaultedToRegion
var selectQuantity
var selectedQuantity
var actionString
var doAction
var chatHasFocus
var userGuide
var backScreen
var crosshair
var crosshairXoffset
var crosshairYoffset
var AssaultFromMarker
var AssaultFromMarkerXoffset
var AssaultFromMarkerYoffset
var advanceFromMarker
var advanceFromMarkerXoffset
var advanceFromMarkerYoffset
var ReinforceFromMarker
var ReinforceFromMarkerXoffset
var ReinforceFromMarkerYoffset
var advanceToMarker
var advanceToMarkerXoffset
var advanceToMarkerYoffset
var floatingQuantity
var floatingQuantityXoffset
var floatingQuantityYoffset
var menuDiv
var clickableMapMenuDiv
var clickableMapMenuHeading
var clickableMapMenu
var teamGame
var minTroops
var remainingTroops
var teams			 	= new Array()
var userPrefs		 	= new Array()
var defaultPrefs	 	= new Array()
var	cm_regions		= new Array()
var	troops				= new Array()
var	fromRegion_troops= new Array()
var autoAdvance			= false
var autoAssaultX			= false
var deployDeferred	 	= false
var sendingRequest	 	= false
var XMLisUpdated	 	= false
var actionUpdated		= false
var bob					= false
var	debugging			= true

// see if bob's running, and wait for it to load before initializing
bobCheck = setInterval(function(){
	if ( unsafeWindow.refreshGMScript.toString().match('updateMagicMap()') ) {
		// bob is running
		bob = true
		if ( document.getElementById('magicmap') ) {
			clearInterval(bobCheck)
			initialize()
		}
	} else {
		// bob is not running
		clearInterval(bobCheck)
		initialize()
	}
}, 250)

XMLinterval = setInterval(function(){
	debug('checking xml status')
	if ( XMLisUpdated ) {
		clearInterval(XMLinterval)
		updateAction()
	}
}, 250)
// the end  :0)
// ==UserScript==
// @name          graphingsystem
// @namespace     conquerClubClickableMaps
// @include       http://*conquerclub.com/game.php?game=*
// ==/UserScript==

var version = 3.22

var userGuideHTML = (<div id='ug-top' style="padding:15px;padding-top:5px;">
	<h4>Clickable Maps User Guide</h4>
	<p><hr/>
		
	<hr/></p><br/>
	<fieldset><legend><b>CONTENTS</b></legend>
		<a style='color:#115511;' href='#ug-menus'>MENU OPTIONS</a>
			:: <a style='color:#115511;' href='#ug-appearance'>Appearance</a>
			|  <a style='color:#115511;' href='#ug-confirmations'>Confirmations</a>
			|  <a style='color:#115511;' href='#ug-controls'>Controls</a> 
		<hr/>
		<a style='color:#333399;' href='#ug-gameplay'>GAMEPLAY</a>
			:: <a style='color:#333399;' href='#ug-deploy-phase'>Deploy Phase</a>
			|  <a style='color:#333399;' href='#ug-Assault-phase'>Assault Phase</a>
			|  <a style='color:#333399;' href='#ug-advance-phase'>Advance Phase</a>
			|  <a style='color:#333399;' href='#ug-Reinforce-phase'>Reinforcements Phase</a>
	</fieldset>
	<br/><br/>
	<fieldset id='ug-menus' style="color:#115511;"><legend><b>MENU OPTIONS</b></legend>
		Menu items with configurable options can be changed by clicking on that item.  NOTE: Cookies are no longer required.
		<br/><br/>
		<fieldset><legend id='ug-appearance'><b>Appearance</b></legend>
			<i><b>Note to BOB users:</b> Do not set the Action Menu option of Clickable Maps to <b>floating</b> if you have the
			<b>HUD</b> option for BOB enabled. Having both options enabled may cause strange behavior...</i>
			<ul>
				<li>
					<i><b>Action Menu:</b></i>							[ <b>floating</b> or <b>normal</b> ] <br/>
					If set to 'floating', then the action menu will always be along the bottom of the screen, and will never
					scroll out of view.
				</li>
				<li>
					<i><b>Map Border:</b></i>							[ <b>thin</b>, <b>thick</b> or <b>off</b> ] <br/>
					If set to 'thin' or 'thick', then the map border will change color with each phase, matching the color of
					the From-Marker.  Colors for the map border are blue (deploy), red (Assault), yellow (advance), and 
					green (Reinforce).
				</li>
				<li>
					<i><b>Show Enemy Crosshairs:</b></i>				[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then during the Assault phase crosshairs will appear when the mouse is moved over an enemy
					region--but only if that region is Assaultable from your own currently selected region.
				</li>
				<li>
					<i><b>Show From-Region Marker:</b></i>			[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then a pulsing circle will appear over your currently selected region during
					Assault, advance, and Reinforcements phases.
				</li>
				<li>
					<i><b>Show Advance-To Marker:</b></i>				[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then after conquering a region, a small, flashing yellow circle will appear over that
					region until troops have been advanced.
				</li>
				<li>
					<i><b>Show Floating Troop Counter Over Map:</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then during the deploy, advance, and Reinforcements phases, a small gray box will appear next to
					the region that is under the mouse pointer indicating how many troops are currently selected to deploy,
					advance, or Reinforce.  The troop counter updates when the increase/decrease troops hotkeys are pressed, or the
					mouse wheel is scrolled (see <a href='#ug-controls'>Controls</a>).
				</li>
				<li>
					<i><b>Show Help Tool-Tips:</b></i>					[ <b>Y</b> or <b>N</b> ] <br/>
					If set to 'Y', then a tool-tip will appear just below the mouse cursor when the mouse is moved over a
					region to show what will happen when the mouse is clicked (if no tool-tip appears, then it is
					probably because the region being moused over cannot be acted upon, or because the mouse was not held
					still long enough (it takes about a full second) for the tool-tip to appear).  
				</li>
			</ul>
		</fieldset> <!-- end Appearance -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-confirmations'><b>Confirmations</b></legend>
				<i><b>Note to BOB users:</b> Only use the confirmations from one script at a time for any given action. In other
				words, don't turn on the "Confirm Auto-Assault" option for Clickable Maps if you already have the same option
				enabled for BOB. <b>When Clickable Maps is first installed, all confirmations are turned <u>on</u> by default!</b></i>
				<ul>
					<li>
						<i><b>Confirm Deploy?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to deploy troops on a region, a confirmation message will
						appear with the number of troops that will be deployed.  This gives you a chance to cancel a deployment
						move and try again.
					</li>
					<li>
						<i><b>Confirm Assault?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to Assault an enemy region, a confirmation message will
						appear with the Assaulting region and the target region.  This gives you a chance to cancel an
						Assault move and try again.
					</li>
					<li>
						<i><b>Confirm Auto-Assault?</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to auto-Assault an enemy region, a confirmation message will
						appear with the Assaulting region and the target region.  This gives you a chance to cancel an
						auto-Assault move try again.
					</li>
					<li>
						<i><b>Confirm Advance?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt advance troops to a conquered region, a confirmation
						message will appear with the number of troops that will be advanced.  This gives you a chance to cancel
						an advancement move and try again.
					</li>
					<li>
						<i><b>Confirm Reinforce?</b></i>		[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then every time you attempt to Reinforce troops from one region to another, a
						confirmation message will appear with the number of troops to be reinforced, the source region and the
						destination region.  This gives you a chance to cancel a Reinforcements move and try again.
					</li>
					<li>
						<i><b>Confirm Phase End?</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', then when 'End Assaults' or 'End Reinforcements' is clicked, a
						confirmation message will appear offering you a chance to cancel.  A confirmation will also appear when
						attempting to Reinforce (unless Reinforcements are set to 'unlimited').
					</li>
				</ul>
		</fieldset> <!-- end confirmations -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-controls'><b>Controls</b></legend>
			To change a hotkey to a key of your choosing: Expand the 'Controls' menu, click the menu item of the hotkey you
			want to change, and then enter your new hotkey in the box that appears. <b>Hotkeys are ignored while typing in the
			chat box, so if hotkeys don't appear to be working, make sure the cursor is not blinking in the chat box.</b><br/>
			<br/>
			<i><b>Note: The right arrow key is reserved for increasing the number of troops to be deployed, advanced or
			reinforced, and the left arrow key is reserved for decreasing troops. Pressing a number key sets the number of troops
			to that of the key that was pressed.</b></i>
				<ul>
					<li>
						<i><b>Phase End Hotkey:</b></i>		[ (default: <b>e</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking 'End Assaults' during the Assault phase or 'End
						Reinforcements' during the Reinforcements phase.
					</li>
					<li>
						<i><b>Next Game Hotkey:</b></i>		[ (default: <b>n</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking the '<u>jump to your next playable game</u>' link.
					</li>
					<li>
						<i><b>Jump to Map Hotkey:</b></i>	[ (default: <b>m</b>) ] <br/>
						Pressing this hotkey will scroll the browser window to the top of the map.
					</li>
					<li>
						<i><b>Refresh Map Hotkey:</b></i>	[ (default: <b>r</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking the [<u>refresh map</u>] link.
					</li>
					<li>
						<i><b>Begin Turn Hotkey:</b></i>	[ (default: <b>b</b>) ] <br/>
						Pressing this hotkey is equivalent to clicking the 'Begin Turn' button.
					</li>
					<li>
						<i><b>Increase Troops:</b></i>		[ (default: <b>w</b>) or <b>right-arrow</b> ] <br/>
						Pressing this hotkey increases the number of troops to be deployed, advanced, or reinforced by one.
					</li>
					<li>
						<i><b>Decrease Troops:</b></i>		[ (default: <b>s</b>) or <b>left-arrow</b> ] <br/>
						Pressing this hotkey decreases the number of troops to be deployed, advanced or reinforced by one.
					</li>
					<li>
						<i><b>Use Mouse Wheel to Increase/Decrease Troops:</b></i>	[ <b>Y</b> or <b>N</b> ] <br/>
						If set to 'Y', scrolling the mouse wheel up will increase the number of troops to be deployed, advanced,
						or reinforced, and scrolling it down will decrease the number of troops.
					</li>
					<li>
						<i><b>Deployment Clicks:</b></i>	[ <b>Left-1 Right-Selected</b> or <b>Right-1 Left-Selected</b> ] <br/>
						Changes which mouse buttons are used to deploy troops; either left-click deploys one troop and
						right-click deploys the number of troops currently selected in the action menu (or floating troop counter),
						or vice-versa.
					</li>
				</ul>
		</fieldset> <!-- end confirmations -->
	</fieldset><!-- end MENUS -->
	
	<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
	<fieldset id='ug-gameplay' style="color:#333399;"><legend><b>GAMEPLAY</b></legend>
		<fieldset><legend id='ug-deploy-phase'><b>Deploy Phase</b></legend>
			<ul>
				<li>
					Mouse over the region you want to deploy troops on. If the <a href='#ug-appearance'>Show Troop
					Counter</a> option is enabled, then a small box will appear next to your cursor letting you know how many
					troops are selected for deployment (if not, then you can see the number of troops in the action menu as
					usual).  The counter will remain visible until you move your mouse away from the region. The counter
					(and action menu) will update when you press the <a href='#ug-controls'> increase/decrease
					troops hotkeys</a> or <a href='#ug-controls'>use the mouse wheel</a>.
				</li>
				<li>
					If you only want to deploy one troop at a time, then click on the desired region with the mouse button
					that is configured to deploy only 1 troop. Otherwise, once the desired number of troops is selected, click
					the region to deploy on using the mouse button that is configured to deploy the selected number of troops.
					(You can choose which click deploys 1 troop and which click deploys the selected number of troops with the
					<a href='#ug-controls'>Deployment Clicks</a> option.)
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Deploy</a> option is enabled, then you will be asked to confirm
					each deployment click.
				</li>
			</ul>
		</fieldset> <!-- end deploy phase -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-Assault-phase'><b>Assault Phase</b></legend>
			<ul>
				<li>
					First select the region that you want to Assault from by clicking on it (either right- or left-click). If
					the <a href='#ug-appearance'>Show From-Region Marker</a> option is enabled, then a pulsing, red circle
					will appear around the region, showing that it is now selected as the Assaulting region. If not, then
					you can see which region is selected as the Assaulting region by looking in the action menu, as usual.
					If the region clicked does not become the Assaulting region (i.e. the from-region marker and/or
					action menu does not update), it is probably because that region is unable to make Assaults.
				</li>
				<li>
					Once the Assaulting region is selected, click an enemy region to Assault it. <b>Left-clicking</b> will
					execute a normal Assault, <b>right-clicking</b> (or holding <b>SHIFT</b> while clicking) will execute an
					auto-Assault.
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Assault or Confirm Auto-Assault</a> options are enabled, then you
					will be asked to confirm the move, and given a chance to cancel it.
				</li>
				<h5>Special Assaults</h5>
				<li>
					<b>Auto-Assault[x]</b>. If the <b>CTRL</b> key is held while auto-Assaulting, then a prompt will appear allowing you to
					enter the minimum number of troops to leave on the Assaulting region (to be sure that the number of troops
					does not go below the number entered, Assaults will stop if the remaining troops reaches the number entered
					plus one). This Assault is slower than a regular auto-Assault because each Assault	must be executed
					indivdually--but it is faster than doing it manually.  Works in conjunction with Auto-Advance.
				</li>
				<li>
					<b>Auto-Advance</b>. If the <b>ALT</b> key is held while auto-Assaulting, then all remaining troops on the Assaulting region will
					be automatically advanced to the conquered region.  Works in conjunction with Auto-Assault[x].
				</li>
			</ul>
		</fieldset> <!-- end Assault phase -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-advance-phase'><b>Advance Phase</b></legend>
			<ul>
				<li>
					After conquering an enemy region, moving the mouse cursor over either the Assaulting region or the 
					conquered region will cause the <a href='#ug-troop-counter'>floating troop counter</a> to appear (if
					enabled). Use the <a href='#ug-controls'>mouse wheel or configured hotkeys</a> to select the number of
					troops to advance, then	click on the region just conquered to advance those troops.
				</li>
				<li>
					Clicking on the region that was just Assaulted <i>from</i> will always advance zero troops.
				</li>
				<li>
					It does not matter whether right-click or left-click is used during the advance phase.
				</li>
				<li>
					If the <a href='#ug-appearance'>Show Advance-To Marker</a> option is enabled, then a small, flashing yellow
					circle will	appear on the region that was just conquered.
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Advance</a> option is enabled, then you will be asked to confirm
					the advancement move, and given a chance to cancel it.
				</li>
			</ul>
		</fieldset> <!-- end advance phase -->
		<p style='width:100%;text-align:right;'><a href='#ug-top'>[back to top]</a></p>
		<fieldset><legend id='ug-Reinforce-phase'><b>Reinforcements Phase</b></legend>
			<ul>
				<li>
					Select the region that you want to Reinforce troops from by <b>left-clicking</b> on it. If
					the <a href='#ug-appearance'>Show From-Region Marker</a> option is enabled, then a pulsing, green circle
					will appear around the region, showing that it is now selected as the source region. If not, then
					you can see which region is selected as the source region by looking in the action menu, as usual.
					If the region clicked does not become the source region (i.e. the from-region marker and/or
					action menu does not update), it is probably because that region is unable to be reinforced from.
				</li>
				<li>
					Mouse over the region you want to Reinforce troops to. If the <a href='#ug-appearance'>Show Troop
					Counter</a> option is enabled, then a small box will appear next to your cursor letting you know how many
					troops are selected to be reinforced (if not, then you can see the number of troops in the action menu as
					usual).  The counter will remain visible until you move your mouse away from the region. The counter
					(and action menu) will update when you press the <a href='#ug-controls'> increase/decrease
					troops hotkeys</a> or <a href='#ug-controls'>use the mouse wheel</a>.
				</li>
				<li>
					Once the source region and the desired number of troops are selected, <b>right-click</b> (or hold
					<b>SHIFT</b> while left-clicking) the region you want to Reinforce troops to.
				</li>
				<li>
					If the <a href='#ug-confirmations'>Confirm Phase End</a> option is enabled and Reinforcements for the current
					game are set to either <b>adjacent</b> or <b>chained</b>, then you will be warned that the Reinforcements
					move will end your turn, and you will have a chance to cancel the move if desired.
				</li>
			</ul>
		</fieldset> <!-- end Reinforcements phase -->
	</fieldset><!-- end GAMEPLAY -->
	<div style="position:fixed;top:55px;text-align:right;width:570px;">
		<strong><a style="background:#eeffee;" id="close-user-guide" href="javascript:void(0)">[x]</a></strong>
	</div>
</div>).toString()

function findPos(obj) {
	var curleft = 0
	var curtop = 0
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
function setCursor(state) {
	try {document.body.style.cursor						   = state}catch(err){}
	try {advanceFromMarker.style.cursor					   = state}catch(err){}
	try {AssaultFromMarker.style.cursor					   = state}catch(err){}
	try {ReinforceFromMarker.style.cursor					   = state}catch(err){}
	try {advanceToMarker.style.cursor					   = state}catch(err){}
	try {crosshair.style.cursor							   = state}catch(err){}
	// setTimeout(function(){try {innerMap.style.cursor							   = state}catch(err){}}, 1000)
	try {document.getElementById('magicmap').style.cursor  = state}catch(err){innerMap.style.cursor = state}
}
function createMenuItem(parentElem, id, listener, method, displayText, value) {
	var m = new Array()
	m['item']           		= document.createElement('li')
	m['link']           		= document.createElement('a')
	m['link'].id       	 		= id
	m['link'].href      		= 'javascript:void(0);'
	m['link'].innerHTML			= displayText+' '
	parentElem.appendChild(m['item'])
	m['item'].appendChild(m['link'])
	if (listener == 'mouseover') {
		m['subMenu'] = document.createElement('ul')
		m['subMenu'].style.position = 'absolute'
		m['subMenu'].style.display  = 'inline'
		m['subMenu'].style.zIndex   = 5
		m['subMenu'].style.left = '30px'
		m['subMenu'].style.textAlign='right'
		m['subMenu'].style.width = '85%'
		m['item'].appendChild(m['subMenu'])
		m['subMenu'].style.borderLeft   = 'medium solid #667766'
		m['subMenu'].style.borderBottom = 'thick solid #667766'
		m['item'].addEventListener('mouseout', function(){m['subMenu'].style.display = 'none'}, false)
		m['item'].addEventListener(listener, function(e){m['subMenu'].style.display='inline';m['subMenu'].style.top=e.pageX}, false)
		m['subMenu'].style.display  = 'none'
		return m['subMenu']
	} else {
		m['value']					= document.createElement('b')
		m['value'].style.textAlign	= 'right'
		m['value'].style.fontWeight	= 'bold'
		m['value'].innerHTML		= value
		m['link'].appendChild(m['value'])
		m['link'].addEventListener(listener, method, false)
		return m['item']
	}
}
function updateXML(){
	XMLisUpdated = false
	GM_xmlhttpRequest({method: 'GET',url: 'http://www.conquerclub.com/maps/'+mapName+'.xml',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3' , 'Accept': 'application/xml,text/xml'},
		onload: function(response) {
			debug('fetching map xml')		
			var parser	= new DOMParser()
			var dom		= parser.parseFromString(response.responseText,"application/xml")
			// get all "coordinates" tags since only regions will have coordinates sub tags, then assign the parentNodes to the cm_regions array.
			c = new Array()
			c = dom.getElementsByTagName('coordinates')
			for (i=0;i<c.length;i++) {
				cm_regions[i]=c[i].parentNode
				// debug(cm_regions[i].getElementsByTagName('name')[0].textContent)
			}
			mapSize	  = unsafeWindow.mapResolution; debug('mapSize: '+mapSize)
			switch(mapSize) { 
				case 'L':
					mapx='largex'
					mapy='largey'
					maph='largeheight'
					mapw='largewidth'
					break
				case 'S':
					mapx='smallx'
					mapy='smally'
					maph='smallheight'
					mapw='smallwidth'
					break
			}
			mapHeight = dom.getElementsByTagName(maph)[0].textContent
			mapWidth  = dom.getElementsByTagName(mapw)[0].textContent
			XMLisUpdated = true
		}
	})
}
function updateAction() {
	try{actionString = document.getElementById('action').innerHTML}catch(err){return}
	if ( actionString ) {
		if ( actionString.match('loading...') ) {
			debug('actionForm is loading... trying again in .1 sec...')
			setTimeout(function(){updateAction}, 250)
		}
	}
	try{floatingQuantity.innerHTML		= document.getElementById('quantity').value}catch(err){}
	// refresh the map and reload all regions
	oldMapSize = mapSize
	mapSize	   = unsafeWindow.mapResolution; debug('mapSize: '+mapSize+', oldMapSize: '+oldMapSize)
	troops	   = document.getElementById('troops').innerHTML.split(',')
	// see if the mapSize has changed, and if it has, then reload the xml to get the new coordinates, map width and map height.
	if ( mapSize != oldMapSize ) {
		updateXML()
		XMLinterval = setInterval(function(){
			debug('checking xml status')
			if ( XMLisUpdated ) {
				clearInterval(XMLinterval)
				updateAction()
			}
		}, 250)
		return
	}
	// set fromRegion and toRegion
	try {
		fromRegionNum = document.getElementById('from_region').value
		fromRegion    = cm_regions[parseInt(fromRegionNum)].getElementsByTagName('name')[0].textContent
	} catch(err){fromRegion = ''}
	try{
		toRegionNum = document.getElementById('to_region').value
		toRegion    = cm_regions[toRegionNum].getElementsByTagName('name')[0].textContent
	} catch(err){toRegion   = ''}
	
	crosshair.style.visibility			= 'hidden'
	floatingQuantity.style.visibility	= 'hidden'
	AssaultFromMarker.style.visibility	= 'hidden'
	advanceFromMarker.style.visibility	= 'hidden'
	advanceToMarker.style.visibility	= 'hidden'
	ReinforceFromMarker.style.visibility	= 'hidden'
	
	deployDeferred = false
	// parse the text of the action menu (actionString) to determine what phase we are in. if there is no action element, then we must be viewing someone else's game
	if ( actionString.match('Waiting for your next turn') || actionString.match('You may take your turn now') || actionString.match('You have won...') ) {
		outerMap.style.borderColor = '#eeeeee'
		doAction = 'Waiting'
	}
	if ( actionString.match('troops left to deploy') ) {
		outerMap.style.borderColor = '#0000ff'
		doAction = 'Deploy'
	}
	if ( actionString.match('deferred troops to deploy') ) {
		outerMap.style.borderColor = '#0000ff'
		deployDeferred = true
		doAction = 'Deploy'
		selectedQuantity = actionString.split(' ')[2]
	}
	if ( actionString.match('Assault from') || actionString.match('You cannot make any Assaults.') ) {
		outerMap.style.borderColor = '#ff0000'
		doAction = 'Assault'
	}
	if ( actionString.match('Advance') ) {
		outerMap.style.borderColor = '#ffff00'
		doAction = 'Advance'
		AssaultedFromRegion = actionString.split(' from ')[1].split(' to ')[0]
		fromRegion = AssaultedFromRegion
		AssaultedToRegion = actionString.split(' to ')[1].split('<input')[0].replace('\n', '')
		 if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
			 floatingQuantity.style.visibility = 'visible'
		}
	}
	if ( actionString.match('Reinforce') || actionString.match('You cannot make any Reinforcementss.') ) {
		outerMap.style.borderColor = '#00ff00'
		doAction = 'Reinforce'
	}
	debug('new action: '+doAction)
	
	debug("fromRegion == '"+fromRegion+"' && toRegion == '"+toRegion+"'")
	if ( fromRegion == '' && toRegion == '' ) {
		if ( doAction == 'Advance' ) {
			advanceFromMarker.style.visibility = 'visible'
		}
		debug('no from or toRegion. returning')
		return
	}
	for (i=0;i<cm_regions.length;i++) {
		title = cm_regions[i].getElementsByTagName('name')[0].textContent
		tX    = cm_regions[i].getElementsByTagName( mapx )[0].textContent
		tY    = cm_regions[i].getElementsByTagName( mapy )[0].textContent
		if ( title == fromRegion ) {
			setCursor('pointer')
			fromRegion_troops = troops[i].split('-')
			if ( selectedQuantity >= parseInt(fromRegion_troops[1]) ) {
				updateSelectedQuantity(parseInt(fromRegion_troops[1])-1)
			}
			remainingTroops	= fromRegion_troops[1]
			if ( userPrefs['showFromMarker'] == 'Y' ) {
				debug('showfrom')
				switch (doAction) {
					case 'Assault':
						if ( title == fromRegion ) {
							AssaultFromMarker.style.position = 'absolute'
							AssaultFromMarker.style.left = (parseInt(tX)-AssaultFromMarkerXoffset) + 'px'
							AssaultFromMarker.style.top  = (parseInt(tY)-AssaultFromMarkerYoffset) + 'px'
							AssaultFromMarker.style.visibility = 'visible'
						}
					break
					case 'Advance':
						if ( title == AssaultedFromRegion ) {
							advanceFromMarker.style.position = 'absolute'
							advanceFromMarker.style.left = (parseInt(tX)-advanceFromMarkerXoffset) + 'px'
							advanceFromMarker.style.top  = (parseInt(tY)-advanceFromMarkerYoffset) + 'px'
							advanceFromMarker.style.visibility = 'visible'
						}
					break
					case 'Reinforce':
						if ( title == fromRegion ) {
							ReinforceFromMarker.style.position = 'absolute'
							ReinforceFromMarker.style.left = (parseInt(tX)-ReinforceFromMarkerXoffset) + 'px'
							ReinforceFromMarker.style.top  = (parseInt(tY)-ReinforceFromMarkerYoffset) + 'px'
							ReinforceFromMarker.style.visibility = 'visible'
						}
					break
				}
			}
		}
		if ( userPrefs['showAdvanceToMarker'] == 'Y' ) {
			if ( doAction == 'Advance' ) {
				if ( title == AssaultedToRegion ) {
					try{floatingQuantity.innerHTML = selectQuantity.value}catch(err){}
					advanceToMarker.style.position = 'absolute'
					advanceToMarker.style.left = (parseInt(tX)-advanceToMarkerXoffset) + 'px'
					advanceToMarker.style.top  = (parseInt(tY)-advanceToMarkerYoffset) + 'px'
					advanceToMarker.style.visibility = 'visible'
				}
			}
		}
	}
	debug('setting actionUpdated to true')
	actionUpdated = true
	return
}
function setHotkey(el) {
	var pref = el.id
	if ( pref.match('Hotkey') ) {
		if ( userPrefs[pref] != '-1' ) {
			n = prompt('Enter new hotkey:', String.fromCharCode(userPrefs[pref]))
			if ( n == null ) { return false }
		} else {
			n = prompt('Enter new hotkey:')
		}
		if ( n != '' ) {
			// something was entered--make sure it is not already assigned to something else, and that is it not 0-9 since those are reserved for changing troop quantities
			for ( _pref in userPrefs ) {
				if ( _pref.match('Hotkey') && _pref != pref ) {
					if ( n == String.fromCharCode(userPrefs[_pref]) ) {
						alert('"'+n+'" is already being used for '+_pref)
						return false
					}
					if ( n.match(/[0-9]/) ) {
						alert('Number keys are reserved for changing the number of troops. Please choose another hotkey.')
						return false
					}
				}
			}
			userPrefs[pref] = n.charCodeAt(0)
		} else {
			userPrefs[pref] = '-1'
		}
		// update the menu item to display the new preference
		n = String.fromCharCode(userPrefs[pref])
		if ( n != String.fromCharCode('-1') ) {
			el.getElementsByTagName('b')[0].innerHTML = n
		} else {
			el.getElementsByTagName('b')[0].innerHTML = '(none)'
		}
		// store the updated preferences
		storeUserPrefs()
	}
}
function setPref(el) {
	var pref = el.id
	switch(pref) {
		case 'actionMenu':
			if ( actionForm ) {
				switch(userPrefs[pref]) {
					case 'normal':
						actionForm.style.position	= 'fixed'
						actionForm.style.bottom		= 0
						actionForm.style.width='100%'
						actionForm.style.left='0px'
						actionForm.style.zIndex		= 1
						userPrefs[pref]	= 'floating'
						break
					case 'floating':
						actionForm.style.position	= ''
						actionForm.style.bottom		= ''
						actionForm.style.zIndex		= 1
						userPrefs[pref] = 'normal'
						break
				}
			}
		break
		case 'mapBorder':
			var thin		 = '2px'
			var thick		 = '4px'
			switch(userPrefs[pref]) {
				case 'off':
					outerMap.style.borderWidth	= thin
					outerMap.style.borderStyle	= 'solid'
					outerMap.style.left			= '-'+thin
					outerMap.style.top			= '-'+thin
					userPrefs[pref]				= 'thin'
				break
				case 'thin':
					outerMap.style.borderWidth	= thick
					outerMap.style.borderStyle	= 'solid'
					outerMap.style.left			= '-'+thick
					outerMap.style.top			= '-'+thick
					userPrefs[pref]				= 'thick'
				break
				case 'thick':
					outerMap.style.borderStyle	= 'none'
					outerMap.style.left			= '0px'
					outerMap.style.top			= '0px'
					userPrefs[pref]				= 'off'
				break
			}
		break
		case 'deploymentClicks':
			switch(userPrefs[pref]) {
				case 'Left-1 Right-Selected':
					userPrefs[pref]	= 'Right-1 Left-Selected'
					break
				case 'Right-1 Left-Selected':
					userPrefs[pref] = 'Left-1 Right-Selected'
					break
			}
		break
		default:
			switch(userPrefs[pref]) {
				case 'Y':
					userPrefs[pref] = 'N'
				break
				case 'N':
					userPrefs[pref] = 'Y'
				break
			}
			updateAction()
		break
	}
	// update the menu item to display the new preference
	el.getElementsByTagName('b')[0].innerHTML = userPrefs[pref]
	// store the updated preferences
	storeUserPrefs()
}
function updateMap(regionNumber, playerNumber, tTroops) {
	debug('running updateMap. doAction: '+doAction)
	if ( sendingRequest ) { debug('returning from updateMap because sendingReqeust='+sendingRequest); return false }
	try{document.getElementById('magicmap').title
						= ''}catch(err){}
	innerMap.title		= ''
	AssaultFromMarker.title	= ''
	advanceFromMarker.title	= ''
	ReinforceFromMarker.title	= ''
	crosshair.title		= ''
	setCursor('default')
	crosshair.style.visibility			= 'hidden'
	floatingQuantity.style.visibility	= 'hidden'
	floatingQuantity.style.left 	    = (parseInt(tX) + floatingQuantityXoffset) + 'px'
	floatingQuantity.style.top          = (parseInt(tY) + floatingQuantityYoffset) + 'px'

	switch ( doAction ) {
		case 'Deploy':
			sameTeam = false
			for ( team in teams ) {
				for ( player in teams[team] ) {
					if ( player == playerNumber && team == currentPlayerTeam ) {
						sameTeam = true
					}
				}
			}
			if ( playerNumber == currentPlayerNumber || sameTeam == true ) {
				setCursor('pointer')
				troopsLeftToDeploy = actionString.split(' ')[2]
				if ( userPrefs['showToolTips'] == 'Y' ) {
					switch(userPrefs['deploymentClicks']) {
						case 'Left-1 Right-Selected':
							L='Deploy 1'
							R='Deploy '+selectedQuantity+' of '+troopsLeftToDeploy
						break
						case 'Right-1 Left-Selected':
							R='Deploy 1'
							L='Deploy '+selectedQuantity+' of '+troopsLeftToDeploy
						break
					}
					t = 'Left-click: '+L+'. Right-click: '+R+'. Shift-click: Deploy all available troops.'
					try{document.getElementById('magicmap').title
										= t}catch(err){}
					innerMap.title		= t
				}
				floatingQuantity.innerHTML        = selectedQuantity
				if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
					floatingQuantity.style.visibility = 'visible'
				}
			}
		break
		case 'Advance':
			setCursor('pointer')
			if ( userPrefs['showToolTips'] == 'Y' ) { advanceFromMarker.title = 'Any click: Advance 0' }
			if ( title == AssaultedFromRegion ) {
				q = '0'
				if ( userPrefs['showToolTips'] == 'Y' ) {
					try{document.getElementById('magicmap').title = 'Any click: Advance '+q}catch(err){}
					innerMap.title = 'Any click: Advance '+q
				}
				if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
					floatingQuantity.innerHTML        = q
					floatingQuantity.style.visibility = 'visible'
				}
			} else if ( title == AssaultedToRegion ) { 
				q = selectedQuantity
				if ( userPrefs['showToolTips'] == 'Y' ) {
					try{document.getElementById('magicmap').title = 'Any click: Advance '+selectedQuantity}catch(err){}
					innerMap.title = 'Any click: Advance '+selectedQuantity
				}
				if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
					floatingQuantity.innerHTML        = q
					floatingQuantity.style.visibility = 'visible'
				}
			} else {
				setCursor('default')
				try{document.getElementById('magicmap').title = ''}catch(err){}
				innerMap.title				= ''
			}
		break
		case 'Assault':
			if ( playerNumber == currentPlayerNumber ) {
				if ( tTroops == 1 ) { return }
				setCursor('pointer')
				if ( userPrefs['showToolTips'] == 'Y' && title != fromRegion ) {
					t = 'Left-click: Set '+title+' as From-Region.'
					try{document.getElementById('magicmap').title
									= t}catch(err){}
					crosshair.title = t
					innerMap.title  = t
				}
				return
			}
			try {
				document.getElementById('to_region').value = regionNumber
			} catch (err) {return}
			if ( document.getElementById('to_region').value != regionNumber ) {return}
			setCursor('pointer')
			if ( userPrefs['showCrosshairs'] == 'Y' ) {
				crosshair.style.visibility = 'visible'
				crosshair.style.left = (parseInt(tX) - crosshairXoffset) + 'px'
				crosshair.style.top  = (parseInt(tY) - crosshairYoffset) + 'px'
			}
			if ( userPrefs['showToolTips'] == 'Y' ) {
				t = 'Left-click: Assault from '+fromRegion+' to '+title+'. Right-click/Shift-click: Auto-Assault.'
				try{document.getElementById('magicmap').title
								= t}catch(err){}
				crosshair.title = t
				innerMap.title  = t
			}
		break
		case 'Reinforce':
			try {
				document.getElementById('to_region').value = regionNumber
			} catch (err) {return}
			if ( playerNumber == currentPlayerNumber && tTroops != 1 ) {
				setCursor('pointer')
			}
			if ( document.getElementById('to_region').value != regionNumber ) {return}
			if ( playerNumber == currentPlayerNumber ) {
				setCursor('pointer')
				if ( userPrefs['showToolTips'] == 'Y' ) {
					t = 'Right-click/Shift-click: Reinforce '+selectedQuantity+' troops from '+fromRegion+' to '+title
					try{document.getElementById('magicmap').title = t}catch(err){}
					innerMap.title = t
				}
			}
			floatingQuantity.innerHTML = selectedQuantity
			if ( userPrefs['showFloatingQuantity'] == 'Y' ) {
				floatingQuantity.style.visibility = 'visible'
			}
		break
	}
}
function onMapMouseMove(e) {
	debug('running')
	if ( ! document.getElementById('action') ) { debug('spectator game. returning'); return false }
	if ( sendingRequest ) { debug('returning because sendingRequest='+sendingRequest); return false }
	var overRegion
	mapOffsetLeft	= outerMapPos[0]
	mapOffsetTop	= outerMapPos[1]
	
	mouseOverX = e.pageX - mapOffsetLeft - 4
	mouseOverY = e.pageY - mapOffsetTop + 19
	try{document.getElementById('magicmap').title = ''}catch(err){}
	innerMap.title = ''
	AssaultFromMarker.title = ''
	advanceFromMarker.title = ''
	ReinforceFromMarker.title = ''
	crosshair.title = ''
	try{selectedQuantity = document.getElementById('quantity').value}catch(err){}
		
	for (i=0;i<cm_regions.length;i++) {
		title = cm_regions[i].getElementsByTagName('name')[0].textContent
		tX    = cm_regions[i].getElementsByTagName( mapx )[0].textContent
		tY    = cm_regions[i].getElementsByTagName( mapy )[0].textContent
		if ( tX > mouseOverX - 15 && tX < mouseOverX + 15 && tY > mouseOverY - 15 && tY < mouseOverY + 15 ) {
			// if we're over any region...
			overRegion		= cm_regions[i]
			tIndex				= i
			tTroops				= troops[i].split('-')
			playerNumber		= tTroops[0]
			updateMap(i, playerNumber, tTroops[1])
			break
		} else {
			crosshair.style.visibility        = 'hidden'
			floatingQuantity.style.visibility = 'hidden'
			setCursor('default')
		}
	}
	if ( ! overRegion ) { return false }
	tName = overRegion.getElementsByTagName('name')[0].textContent
	return false
}
function onMapClick(e) {
	debug('running')
	e.preventDefault()
	e.returnValue = false
	if ( sendingRequest ) { return false }
	wait('on')
	floatingQuantity.style.visibility = 'hidden'
	var clickedRegion
	mapOffsetLeft	= outerMapPos[0]
	mapOffsetTop	= outerMapPos[1]
	clickX = e.pageX - mapOffsetLeft - 4
	clickY = e.pageY - mapOffsetTop + 19
	// see if a region was clicked
	for (i=0;i<cm_regions.length;i++) {
		title = cm_regions[i].getElementsByTagName('name')[0].textContent
		tX    = cm_regions[i].getElementsByTagName( mapx )[0].textContent
		tY    = cm_regions[i].getElementsByTagName( mapy )[0].textContent
		if ( tX > clickX - 15 && tX < clickX + 15 && tY > clickY - 15 && tY < clickY + 15 ) {
			clickedRegion	= cm_regions[i]
			tIndex				= i
			tTroops				= troops[i].split('-')
			playerNumber		= tTroops[0]
			break
		}
	}
	if ( ! clickedRegion ) { debug('no region clicked. x:'+clickX+' y:'+clickY); wait('off'); return false }
	
	if ( e.button == 0 && ! e.shiftKey ) {
		try{document.getElementById('from_region').value = tIndex}catch(err){}
	}
	
	updateAction()
	if ( doAction == 'Waiting' ) {
		debug('not your turn. exiting')
		wait('off')
		return false
	}
	
	tName = clickedRegion.getElementsByTagName('name')[0].textContent
	
	try {		fromRegion = cm_regions[document.getElementById('from_region').value].getElementsByTagName('name')[0].textContent
	}catch(err){fromRegion = ''}
	
	try {		toRegion   = cm_regions[document.getElementById('to_region').value].getElementsByTagName('name')[0].textContent
	}catch(err){toRegion   = ''}
	
	try{selectFromRegion	= document.getElementById('from_region')}catch(err){}
	try{selectToRegion		= document.getElementById('to_region')}catch(err){}
	try{selectQuantity		= document.getElementById('quantity')}catch(err){}
	
	if ( selectQuantity ) { numTroops = selectQuantity.value; selectQuantity.focus() }
	
	switch(doAction) {
		case 'Deploy':
			selectToRegion.value = tIndex
			if ( selectToRegion.value != tIndex ) { wait('off'); return } // an enemy region was clicked during deployment
			toRegion = tName
			if ( deployDeferred ) {
				troopsLeftToDeploy        = actionString.split(' ')[2]
				confirmMessage			  = 'Deploy '+troopsLeftToDeploy+' troops on '+toRegion+'?'
				unsafeWindow.submitButton = 'Deploy'
				unsafeWindow.quantity = new Object()
				unsafeWindow.quantity.value = troopsLeftToDeploy
				return unsafeWindow.sendRequest('Deploy')
			}
			if ( ! deployDeferred ) {
				if ( ! document.getElementById('quantity') ) { wait('off'); return }
			}
			if ( e.button == 2 ) { //right click
				if ( userPrefs['deploymentClicks'] == 'Left-1 Right-Selected' ) {
					confirmMessage = 'Deploy '+selectQuantity.value+' troops on '+toRegion+'?'
				} else {
					selectQuantity.value	= "1"
					confirmMessage			= 'Deploy 1 troop on '+toRegion+'?'
				}
			} else if ( e.shiftKey ) {
				troopsLeftToDeploy      = actionString.split(' ')[2]
				selectQuantity.value	= troopsLeftToDeploy
				confirmMessage			= 'Deploy all '+troopsLeftToDeploy+' troops on '+toRegion+'?'
			} else {
				if ( userPrefs['deploymentClicks'] == 'Left-1 Right-Selected' ) {
					selectQuantity.value	= "1"
					confirmMessage			= 'Deploy 1 troop on '+toRegion+'?'
				} else {
					confirmMessage = 'Deploy '+selectQuantity.value+' troops on '+toRegion+'?'
				}
			}
		break
		case 'Assault':
			if ( fromRegion == '' || toRegion == '' ) { wait('off'); return }
			
			// if freindly, then set from_region and return
			if ( playerNumber == currentPlayerNumber ) {
				if ( tTroops[1] == 1 ) { wait('off'); return }
				// try to set from_region, but if there is an error (which would happen if a freindly region was clicked with no Assaultable enemies around it), then return
				try{selectFromRegion.value = tIndex}catch(err){wait('off'); return}
				try{unsafeWindow.filterTo(tIndex)}catch(err){}
				if ( selectFromRegion.value != tIndex ) { wait('off'); return }
				fromRegion = tName
				wait('off')
				return
			// if enemy, set as to_region and continue to Assault
			} else {
				try{selectToRegion.value	= tIndex}catch(err){}
				if ( selectToRegion.value != tIndex ) { wait('off'); setTimeout(function(){alert(tName+' is not accessible from '+fromRegion)}, 500); return }
				if ( e.button == 2 || e.shiftKey ) {
					doAction = 'Auto-Assault'
					if ( e.ctrlKey ) {
						// this is an Auto-Assault[x]   (doAction will remain 'Assault')
						minTroops		= prompt('Enter the minimum number of troops to remain on the Assaulting region:')
						if ( ! minTroops ) { wait('off'); return }
						doAction		= 'Assault'
						autoAssaultX		= true
					}
					if ( e.altKey ) {
						// this is an auto-Assault/advance
						debug('executing auto-Assault/auto-advance')
						autoAdvance = true
					}
				}
				toRegion = tName
			}
			confirmMessage = doAction+' from '+fromRegion+' to '+toRegion+'?'

			AssaultedFromRegion = fromRegion
		break
		case 'Advance':
			if ( ! document.getElementById('quantity') ) { wait('off'); return }
			debug('AssaultedFromRegion: '+AssaultedFromRegion)
			toRegion = tName
			if ( toRegion == '' ) { wait('off'); return }
			if ( toRegion != AssaultedToRegion && toRegion != AssaultedFromRegion ) { wait('off'); return }
			if ( toRegion == AssaultedFromRegion ) { selectQuantity.value = '0'; numTroops = '0'; }
			confirmMessage = 'Advance '+numTroops+' troops?'
		break
		case 'Reinforce':
			if ( ! document.getElementById('quantity') ) { wait('off'); return }
			if ( e.button == 2 || e.shiftKey ) {
				try{selectToRegion.value	= tIndex}catch(err){}
				if ( selectToRegion.value != tIndex ) { wait('off'); setTimeout(function(){alert(tName+' is not accessible from '+fromRegion)}, 500); return }
				toRegion				= tName
			} else {
				selectFromRegion.value = tIndex
				fromRegion			= tName
				toRegion				= ''
				try{unsafeWindow.filterTo(tIndex)}catch(err){}
				wait('off')
				return
			}
			if ( fromRegion == '' || toRegion == '' ) { wait('off'); return }
			confirmMessage = 'Reinforce '+numTroops+' troops from '+fromRegion+' to '+toRegion+'?'
		break
	}
	unsafeWindow.sendRequest(doAction)

}
function getCurrentPlayer() {
	var allPlayers = new Array();
	debug('getting player number for '+currentPlayerName)
	playerElements = document.getElementById('players').getElementsByTagName('span')
	for (var i=0;i<playerElements.length;i++) {
		if ( playerElements[i].className.match('player') ) {
			allPlayers.push(playerElements[i])
		}
	}
	for (var i=0;i<allPlayers.length;i++) {
		debug('checking player: '+allPlayers[i].innerHTML)
		debug( ':'+allPlayers[i].innerHTML+': == :'+currentPlayerName+': i: '+i+' i+1: '+(parseInt(i)+1) )
		if ( allPlayers[i].innerHTML == currentPlayerName || allPlayers[i].innerHTML.match(':'+currentPlayerName) ) {
			var playerNumber = i+1
			debug(currentPlayerName+': player '+playerNumber)
			break
		}
	}
	return playerNumber
}
function onKeyPress(e) {
	if ( sendingRequest ) { return false }
	if ( chatHasFocus ) { return false }
	switch ( e.which ) {
		case parseInt(userPrefs['phaseEndHotkey']) :
			if ( doAction == 'Assault' ) {
				unsafeWindow.sendRequest("End Assaults")
			}
			if ( doAction == 'Reinforce' ) {
				unsafeWindow.sendRequest("End Reinforcements")
			}
			return
		break
		case parseInt(userPrefs['nextGameHotkey']) :
			window.location='http://www.conquerclub.com/player.php?page=next'
			return
		break
		case parseInt(userPrefs['jumpToMapHotkey']) :
			window.location.replace('#map-cell')
			return
		break
		case parseInt(userPrefs['refreshMapHotkey']) :
			unsafeWindow.sendRequest()
			return
		break
		case parseInt(userPrefs['beginTurnHotkey']) :
			unsafeWindow.sendRequest('Begin Turn')
			return
		break
	}
	
	// update the selected troop quantity
	selectQuantity = document.getElementById('quantity')
	if ( ! selectQuantity ) { return }
	switch (parseInt(e.keyCode)+parseInt(e.which)) {
		case 37: 										  // left arrow
		case parseInt(userPrefs['decreaseTroopsHotkey']): // custom hotkey
			updateSelectedQuantity(parseInt(selectQuantity.value) - 1)
			break
		case 39: 										  // right arrow
		case parseInt(userPrefs['increaseTroopsHotkey']): // custom hotkey
			updateSelectedQuantity(parseInt(selectQuantity.value) + 1)
			break
	}
	if ( e.which > 47 && e.which < 58 ) { updateSelectedQuantity(e.which - 48) } // set troop quantity to the value of the number pressed
	selectedQuantity = selectQuantity.value
}
function updateSelectedQuantity(q) {
	try { selectQuantity = document.getElementById('quantity') } catch (err) { return }
	if ( ! selectQuantity ) { return }
	selectQuantity.value       = q
	if ( parseInt(selectQuantity.value) >= parseInt(fromRegion_troops[1]) ) {
		selectQuantity.value = parseInt(fromRegion_troops[1]) - 1
	}
	floatingQuantity.innerHTML = selectQuantity.value
	selectedQuantity           = selectQuantity.value
}
function onMouseWheel(e) {
	if ( sendingRequest ) { return false }
	if ( userPrefs['useMouseWheel'] != 'Y' ) { return }
	try { selectQuantity = document.getElementById('quantity') } catch (err) { return }
	if ( ! selectQuantity ) { return }
	if (e.detail) {
		delta = -e.detail/3		
		if ( delta > 0 ) { updateSelectedQuantity((parseInt(selectQuantity.value) + 1)) }
		if ( delta < 0 ) { updateSelectedQuantity((parseInt(selectQuantity.value) - 1)) }
		e.preventDefault()
		e.returnValue = false
	}
}
function setCookie(c_name,value,expiredays) {
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name) {
	if (document.cookie.length>0) {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1) {
		c_start=c_start + c_name.length+1 
		c_end=document.cookie.indexOf(";",c_start)
		if (c_end==-1) { c_end=document.cookie.length } 
		return unescape(document.cookie.substring(c_start,c_end))
	  }
	}
	return ""
}
function checkForUpdate(force) {
	// scriptURL = 'http://neo/conquerclubclickablemaps.user.js'
	scriptURL = 'http://userscripts.org/scripts/source/13824.user.js'
	GM_xmlhttpRequest({method: 'GET', url: scriptURL, onload: function(response) {
		responseArray = response.responseText.split('\n')
		for ( line in responseArray ) {
			if ( responseArray[line].match('var version = ') ) {
				serverVersion = responseArray[line].split(' ')[3]
				debug('server version: '+serverVersion)
				break
			}
		}
		//alert('server version: '+parseFloat(serverVersion)+', '+'version: '+version)
		if ( parseFloat(serverVersion) > version ) {
			if ( getCookie('CLICKABLE_MAPS_UPDATE_CHECK') && ! force ) { return }
			setCookie('CLICKABLE_MAPS_UPDATE_CHECK', 1)
			if ( confirm('There is a newer version of Clickable Maps available. Install it now?') ) {
				try{window.location = scriptURL}catch(err){}
				alert('Click OK after installation...')
				location.reload()
			}
		} else if ( force ) {
			alert('There are no updates available.')
		}
	}})
}
function debug(debug_text) {
	if ( ! debugging ) { return false }
	GM_log(debug.caller.toString().split(/{/)[0].split('function')[1]+': '+debug_text)
	// trace(debug_text) 
}
function showUserGuide(state) {
	switch(state) {
		case 0:
			backScreen.style.display = 'none'
			userGuide.style.display  = 'none'
		break
		case 1:
			userGuide.style.left	 = (document.width/2)-(parseInt(userGuide.style.width)/2)+'px'
			backScreen.style.opacity='.7'
			backScreen.style.display = 'inline'
			setTimeout(function(){userGuide.style.display  = 'inline'}, 300)
			// document.getElementById('close-user-guide').style.right = (document.width/2)-(parseInt(userGuide.style.width)/2)+65+'px'
		break
	}
}
function storeUserPrefs() {
	var a = defaultPrefs
	var p = new Array()
	for (i=0;i<a.length;i++) {
		pref_name  = a[i].split(':')[0]
		pref_value = userPrefs[pref_name]
		p[i] = pref_name+':'+pref_value
	}
	GM_setValue('USER_PREFS2', uneval(p))
}
function loadUserPrefs(def) {
	var a = eval(GM_getValue('USER_PREFS2', (def || '[]')))
	var p = new Array()
	for (i=0;i<a.length;i++) {
		p[a[i].split(':')[0]] = a[i].split(':')[1]
	}
	return p
}
function waitAndUpdateAction(option) {
	debug('option: '+option)
	if ( unsafeWindow.updating ) {
		setTimeout(function(){waitAndUpdateAction(option)}, 250)
	} else {
		updateAction()
		debug('doAction: '+doAction)
		if ( option == 'updateActionOnly' ) { return }
		if ( option == 'autoAdvance' && doAction == 'Advance' ) {
			unsafeWindow.sendRequest('Advance')
			return
		}
		wait('off')
		outerMapPos = findPos(outerMap)
	}
}
var existingSendRequest = unsafeWindow.sendRequest
unsafeWindow.sendRequest = function(_cmd) {
	debug('running unsafeWindow.sendRequest')
	if ( userPrefs['confirm'+_cmd] == 'Y' ) {
		setTimeout(function(){
			if ( confirm(confirmMessage) ) {
				existingSendRequest(_cmd)
				waitAndUpdateAction()
				return false
			} else {
				wait('off')
				return false
			}
		}, 500)
		return false
	}
	if ( _cmd == 'Reinforce' && ReinforcementsType != 'Unlimited' ) {
		if ( userPrefs['confirmPhaseEnd'] == 'Y' ) {
			setTimeout(function(){
				if( confirm('This will end your turn.  Are you sure?') ) {
					existingSendRequest('Reinforce')
					waitAndUpdateAction()
					return false
				} else {
					wait('off')
				}
			}, 500)
			return false
		}
	}
	if ( _cmd == 'End Assaults' || _cmd == 'End Reinforcements' ) {
		if ( userPrefs['confirmPhaseEnd'] == 'Y' ) {
			if ( !confirm('Are you sure you want to '+_cmd.toLowerCase()+'?') ) {wait('off'); return false}
		}
	}
	if ( _cmd == 'Assault' && autoAssaultX ) {
		autoAssaultXinterval = setInterval(function()
		{
			autoAssaultX = false
			debug('actionUpdated: '+actionUpdated)
			if ( actionUpdated == false ) { return false }
			debug('remainingTroops: '+remainingTroops)
			debug('minTroops: '+minTroops)
			if ( parseInt(remainingTroops) <= parseInt(minTroops) + 1 || doAction == 'Advance' ) {
				clearInterval(autoAssaultXinterval)
				if ( autoAdvance ) {
					autoAdvance = false
					debug("calling waitAndUpdateAction('autoAdvance')")
					waitAndUpdateAction('autoAdvance')
				} else {
					waitAndUpdateAction()
				}
				// setTimeout(function(){updateAction(); outerMapPos = findPos(outerMap); wait('off')}, 750)
			} else {
				existingSendRequest(_cmd)
				waitAndUpdateAction('updateActionOnly') // only run updateAction, don't get outerMap or turn wait off
				actionUpdated = false
			}
		}, 250)
	} else {
		existingSendRequest(_cmd)
		if ( _cmd == 'Auto-Assault' && autoAdvance ) {
			autoAdvance = false
			debug("calling waitAndUpdateAction('autoAdvance')")
			waitAndUpdateAction('autoAdvance')
		} else {
			waitAndUpdateAction()
		}
	}
	return false
}
function wait(state) {
	debug('wait '+state)
	if ( state == 'on' ) {
		sendingRequest = true
		setCursor('wait')
	} else {
		sendingRequest = false
		setCursor('default')
	}
}
function initialize() {
	outerMap			= document.getElementById('outer-map')
	innerMap			= document.getElementById('inner-map')
	mapName				= unsafeWindow.mapFile
	outerMapPos			= findPos(outerMap)
	mapCell				= document.getElementById('map-cell')
	currentPlayerName	= document.getElementById('leftColumn').getElementsByTagName('div')[1].getElementsByTagName('b')[0].innerHTML
	currentPlayerNumber = getCurrentPlayer()
	actionForm			= document.getElementById('action-form')
	enemyGif            = "data:image/gif,GIF89a-%00-%00%B3%00%00%FF%15%15%FF%FF%FF%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15!%F9%04%01%00%00%01%00%2C%00%00%00%00-%00-%00%00%04i0%C8I%AB%BD8%EB%CD%BB%FF%60(%8Ed%09%02%A6%89%A6%23%E0%B2%A2%BB%C2'%1D%DB%E1%8Cw%FA%BE%F5%3E%8An%18%94%F4%8EA%A0r%07%0C4%9B%C5%A8t%FAy%D1%AC%1A%99v%0Bur%B9%1C%2CKL-K%BB%16t%2B%CD%F6!%85Q%E2D%8D%A3%17%EDIs%5B%3F%E7%C3%FD%5Exudf%82L%80%88%89%8A%8B6%11%00%00%3B"
	enemyGifSmall       = "data:image/gif,GIF89a%0D%00%0D%00%B3%00%00%FF%15%15%FF%FF%FF%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15!%F9%04%01%00%00%01%00%2C%00%00%00%00%0D%00%0D%00%00%04!0%C8%09%A6%B5%20%DF%5D7%0DUwu%24%E6Ia%A6%A1jx%82%26%2C%8F%B0%E8%D9%F7%FA%E2A%04%00%3B"
	AssaultFromGif		= "data:image/gif,GIF89a(%00(%00%A2%05%00%00%00%00%08%94%10%7B%00%00%AD%00%00%FF%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%84X%BA%AC%F40J%D2%AA%5D3%EB%CB%8B%FEY%D7%7C%17)n%A23ua%3AJ%DC%EAV%F2%0B%CDld%3F%F8%A9%AB%B7%9E%8F%07%A4%08%87%3C%D8%11%E9%09.%91%BFgN)%9DF%AB1*%B6%A4%DD%D2%AE%DE%AF3l%01%931%E6s3M%AE%A9%8B%C47%DC(_%B3%B7%A8%B7%E9%FC%BBK%FB~GW%5D%7F%60%813%84vtK%89%8A%8B%3D%8Ds%8FP%93en%5C%91b(%20%95%94%9Cc%82%9F%A0%16%09%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%8EX%BA%DC%FE0%C6A%AB%A52%B3%CB%B9%96%5Dx%7D%8Dh%8E%A4%E9%A8Z%D8v%19L%16%F2S%CF%F7%86%CE%8B%B7%EE%BC%1EP1%0C%12%81E%E3%B1%A2c*%7F%96%25%E6%09u%26%A9%A8%EB%D3%A3Ur%9D%D4*%26%1A%B6E%C9%E5%D2%19%9C%96%8E%D1%ED%2F%3B-%9F%B6i%E4n%D0%87%9Fcwz)%7C%7Dv%7Fp%84%85F9%88%03%5B%83B%81b%89M%871%8B%94%5D%2C%20'n.%1F'%A0%93%96%A1%97%2F%A4~%7B%A4w%9D%A8%10%09%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%8AX%BA%DC%FE0%CAI%2B%138k%5B%B5%FF%02%F7%80%A4'.e%9A%89%A9SZ%24%05v%26%FCM%F7%99%8F%F5Y%F4%AE%8D%0F%25l%00%87%3B%E2jx)*%8E%CC%234%EA%9C%22%ABN%E6%13%8B%D1%06%97%DB%AE%D7%08%FE%95%C7fq8%84V%B2%D7%ED%F5%3B%AD%1E%03%AD%3E%60%20K%3D%D3%E7%7DurvSx4~r%80%1C%86I6%7Cd%86M%91%89%82%90%93n3%7F%8D2*-W%9D%8F%2C%A0%95Z%9Eq%A7%A8%14%09%00%00!%F9%04%05%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03)X%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40F%02%00!%F9%04%09%0C%00%05%00%2C%02%00%02%00%24%00%24%00%00%03rX%BA%AC%F20%8AFk%93X%DA%5D%B2%D7%1C%F3%8DP%D8%7D%14%BAyf%B6%82%A6%03%8Bs%7CFWm%DFO%5E%EE)%9C%EC%07%F4%FDtE%DE%04%99%D40%9B%AAd%90%25%9Db%AA%95(%96v%DD%1A%85%DE%055%AC%7C%16Gd%25%8F%0C2%DB%DA%E0%EA%CC%1D%9A%D3-%BA.P%CF%8Ds%5Cx%80%81%7CYhew%24%24%7B%89wV%89%5E%86!%09%00%00!%F9%04%05%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%86X%BA%BC%F40%C2Fk%958%DB%ED%B2%C7%DC%F5%11%CAH%86%A5%16%AA%1C%8B%16n%03%BE%B2%B4%D9%B48Qx%AE%3F%B5%9D%EFw%EA%08%87%BC%88%11%88%BC%09%95%CD%D6%0E%1A%B5(%A9%D5%1F%EC%98M%CE%BAD.x)%1E%A7z%E6%60%D9%ECI%AB%B1%EE%B6%9B%BC%06%CB%E7P%F88_%AF%F2%FBHXhYh%83Q%86%86%81z%5B%8B%2F_%5E%80aR%89N%8Do%7Dw(%26g%994%26%1F%84%9F%919%239%09%00%00%3B"
	advanceFromGif		= "data:image/gif,GIF89a(%00(%00%A2%06%00%00%00%00%08%94%10%8C%8C%00%C6%C6%00%F7%F7%00%FF%FF%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%84h%BA%AC%F50%CA%D2%AA%5D3%EB%CB%8D%FEY%D7%7C%17)n%A23ua%3AJ%DC%EAV%F2%0B%CDld%3F%F8%A9%AB%B7%9E%8F%07%A4%08%87%3C%D8%11%E9%09.%91%BFgN)%9DF%AB1*%B6%A4%DD%D2%AE%DE%AF3l%01%931%E6s3M%AE%A9%8B%C47%DC(_%B3%B7%A8%B7%E9%FC%BBK%FB~GW%5D%7F%60%813%84vtK%89%8A%8B%3D%8Ds%8FP%93en%5C%91b(%20%95%94%9Cc%82%9F%A0%16%09%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%8Eh%BA%DC%FE0%C6A%AB%A52%B3%CB%B9%96%5Dx%7D%8Dh%8E%A4%E9%A8Z%D8v%19L%1A%F2S%CF%F7%86%CE%8B%B7%EE%BC%1EP1%0C%12%81E%E3%B1%A2c*%7F%96%25%E6%09u%26%A9%A8%EB%D3%A3Ur%9D%D4*%26%1A%B6E%C9%E5%D2%19%9C%96%8E%D1%ED%2F%3B-%9F%B6i%E4n%D0%87%9Fcwz)%7C%7Dv%7Fp%84%85F9%88%03%5B%83B%81b%89M%871%8B%94%5D%2C%20'n.%1F'%A0%93%96%A1%97%2F%A4~%7B%A4w%9D%A8%10%09%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%8Ah%BA%DC%FE0%CAI%2B%138k%5B%B5%FF%02%F7%80%A4'.e%9A%89%A9SZ%24%05v%26%FCM%F7%99%8F%F5i%F4%AE%8D%0F%25l%00%87%3B%E2jx)*%8E%CC%234%EA%9C%22%ABN%E6%13%8B%D1%06%97%DB%AE%D7%08%FE%95%C7fq8%84V%B2%D7%ED%F5%3B%AD%1E%03%AD%3E%60%20K%3D%D3%E7%7DurvSx4~r%80%1C%86I6%7Cd%86M%91%89%82%90%93n3%7F%8D2*-W%9D%8F%2C%A0%95Z%9Eq%A7%A8%14%09%00%00!%F9%04%05%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03)h%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40F%02%00!%F9%04%09%0C%00%06%00%2C%02%00%02%00%24%00%24%00%00%03rh%BA%AC%F20%8AFk%93X%DAm%B2%D7%1C%F3%8DP%D8%7D%14%BAyf%B6%82%A6%03%8Bs%7CFWm%DFO%5E%EE)%9C%EC%07%F4%FDtE%DE%04%99%D40%9B%AAd%90%25%9Db%AA%95(%96v%DD%1A%85%DE%055%AC%7C%16Gd%25%8F%0C2%DB%DA%E0%EA%CC%1D%9A%D3-%BA.P%CF%8Ds%5Cx%80%81%7CYhew%24%24%7B%89wV%89%5E%86!%09%00%00!%F9%04%05%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%86h%BA%BC%F40%C2Fk%958%DB%ED%B2%C7%DC%F5%11%CAH%86%A5%16%AA%1C%8B%1An%03%BE%B2%B4%D9%B48Qx%AE%3F%B5%9D%EFw%EA%08%87%BC%88%11%88%BC%09%95%CD%D6%0E%1A%B5(%A9%D5%1F%EC%98M%CE%BAD.x)%1E%A7z%E6%60%D9%ECI%AB%B1%EE%B6%9B%BC%06%CB%E7P%F88_%AF%F2%FBHXhYh%83Q%86%86%81z%5B%8B%2F_%5E%80aR%89N%8Do%7Dw(%26g%994%26%1F%84%9F%919%239%09%00%00%3B"
	advanceToGif		= "data:image/gif,GIF89a%14%00%14%00%91%00%00%00%00%00RR%00%D6%D6%18%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%02'%84%0F%A2%8B%7D%0B%99K%B1%AAf%B3%40%DA%BE%EEQ%60%24%8E%E6%89%A6%EA%0A%1A%AB%AB~'7c%E3%04g8%0DM%05%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%025%84%0F%A2%8B%7D%0B%99K%B1%AAV%8D%A0%10u%17%3D%D2%C4m%1C)%5E%1FZ%AE%A8%C5zY%0C%C7%ED%F8%5E'%FB%85%E4%EAJ%E94%B0%99%CC%12%3C%D6hI%40%01%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%025%84%0F%A1%8B%7D%1B%12t%86Q%FB%22%CDMm%E4U%DA%C7%25%A4%13%85g%A6%AER%BBb%AE8%BA%D3l%E6%B3%06%7Fj%8F%AA%01A5%DAe%F8%82%C86%CAM%01%00!%F9%04%05d%00%00%00%2C%00%00%00%00%14%00%14%00%00%02%11%84%8F%A9%CB%ED%0F%A3%9C%B4%DA%8B%B3%DE%BC%FB%AF%15%00!%F9%04%05%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%024%84%0F%A1%8B%7D%1B%12t%86Q%FB%22%CDMm%E4U%DA%C7%25%A4%13%85g%A6%AER%BBb%EE%3B%BA%D3l%E6%B6%06%7Fj%8F%AA%C9%82%97%1A%CB%07I%C6n%8E%02%00!%F9%04%05%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%024%84%0F%A2%8B%7D%0B%99K1Q%F90%AAY%CC%0E~%A1%22n%A4VF%5E%D9%91l%EB%BE%EAk%9C1%EB%DE%A2%84NX%DF2%A1%3C%3D%95qg%D4%7D%20%9F%02%00%3B"
	//green one: advanceToGif        = "data:image/gif,GIF89a%14%00%14%00%F7%04%00%00%00%00%00%B5%18%08k%08B%FFJ%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08C%00%09%08%1CH%60%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%23%1AL(%B1%E2%00%82%16%25.%CC%A8%11%22%C7%86%1E%3F%8A%1CI%B2%A4%C9%93%1C%05%9ETir%E3H%8C%2F)~%7C%C8%B2%22M%98%0C%1F%06%04%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08U%00%09%08%1CH%20%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%23%1AL%18Q%60%00%88%0C%09fT%D8p%A1%C3%87%18%2Fb%04%E9q%E2F%92!O%92%94%88Rc%C5%96%2C%5B%A6%FC%B8r%E2H%94%1B%3B%82%3C%A9%B2%A4M%8B%2C_%BA%94%D8shL%98E%09%04%04%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08U%00%09%08%1CH%40%80%C1%83%04%13%0E%3C(%A0%20C%85%02%11B%94%B8%B0!%C4%8A%09%0D%5E%24%A81%A2%C5%8D%18%0B%82T%D8%B0%E3%C8%8A%26O%3ALy%92%A2J%8F%1FU%3E%7C)%B2%E6K%8B%2C7%9A%CCI2%26O%8E1aN%FC%B9%92%A1%CB%8BF%2F%06%04%00!%F9%04%05d%00%04%00%2C%00%00%00%00%14%00%14%00%00%08%22%00%09%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DCh1%20%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08T%00%09%08%1CH%40%80%C1%83%04%13%0E%3C(%A0%20C%85%02%11B%94%B8%B0!%C4%8A%09%0D%5E%24%A81%A2%C5%8D%18%0B%82T%D8%B0%E3%C8%8A%26O%3ALy%92%A2%CA%95%1FU%3E%7C)%B2%A6L%8B%2C7%9A%CCI2%A6%CB%9E%13c%A2%D4%C9%B0h%CB%99%0A%03%02%00!%F9%04%05%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08T%00%09%08%1CH%20%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%0BBt%B8%90%22%C1%88%15%03%3C%CC%C8qcG%83%1E%2F%82%B4%18%B2%A1%C6%90%19A%A2L%A9r%A5%C9%95%02G%B6D%A9r%A6G%87%24%1FR%CC%99R%24I%8D9M%0A%BD)%D4%E6F%86%1B%03%02%00%3B"
	ReinforceFromGif		= "data:image/gif,GIF89a(%00(%00%F7%5C%00%00%00%00%00%18%08%00!%08%00)%08%001%08%001%10%009%08%009%10%00B%08%00B%10%00J%10%00R%10%00Z%08%00Z%10%00c%10%00c%18%00k%10%00k%18%00s%10%00s%18%00%7B%08%00%7B%10%00%7B%18%00%84%10%00%84%18%00%8C%00%00%8C%10%00%8C%18%00%94%10%00%94%18%00%9C%08%00%9C%10%00%9C%18%00%A5%10%00%A5%18%00%A5!%00%AD%18%00%B5%10%00%B5%18%00%BD%18%00%C6%18%00%C6!%00%CE%18%00%CE!%08c%18%08k%18%08s%18%08%7B%10%08%7B%18%08%84%10%08%84%18%08%94%10%18%84B!%7B9!%84J!%8CJ!%8CR!%94R!%9CJ)%94J)%94R)%9CR)%9CZ)%A5R)%A5Z)%ADZ)%ADc)%B5c1%ADc1%B5c1%BDc1%BDk1%C6k1%C6s1%CEk1%CEs1%D6s1%DE%7B9%ADR9%CEk9%D6s9%D6%7B9%DE%7B9%E7%7B9%E7%849%EF%849%F7%849%F7%8CB%EF%84B%F7%84B%F7%8CB%FF%8C%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CHP%E0%0D%22K%A8hY%C8p!%95%25%40l%14%9CHq%A0%0D%1EG%B04%DC%B8%91J%91%1B%15Cr%B9%81%24%0B%C7%93%1B%B1%14%91(%92%20%0F)'%2B.4%C9p%09%C8%965%80h%D4%B2%B3%E5%C0%8DSx%88%B4Q%84%A1I%9F%13y.%C4%02%24d%D1%99Z%90R%D4B%13%8B%0F%8A%40%96F%95%1A%92!%15%A1.5b%C9%C2%B5%A5B-RXr%A9%B1d%E1%94%B2%3E%A7%2C%2420%2BZ%B8%3E%B1%88%DD%C1%05%07L%2CT%F0%FA%84%B2%10%09%17%22%0B%A1%08F%FA%B7%07a%2CK%16%FBL%B20%E3%5D%C9-%99h%24%AC%E5%09f%9FQ%94b1%F2%B9%E5%11%86X%E8%96%0Ey%DA%E1j%91BvJy-%B2%CA%C2%D9%B4)%EA8%8B%3BwA%22%3BS%FB.%F8%94%A7%90%E1%04%5B%2F%2C%82%7C%20%E5%9D%86%9Bs%81I%C56%95%A6%C8%9FF%09%AD%E5H%F3%C7K%A2%84h%A4%E2d%F8%10%8DQ%04r%F6%EE%9B%3B%7B%26%0AU%E6F%B20%FD%40%24%E3%8F%AF.b%92Jt%E7%89%AD%26D%7CIP%C4Y%14%FA-%26%04LZ%FCW%D0%13%0Cb%C1%1E%5EG%9C%15YHO%B4u%9BjR%0D%C1%5D%16%17%B6%84%DFRP0%D7%12B%C1M%E8%D3%10%1A%3A%84D%11D%E8%17c%11H%C8%C5%10%14C%E0U%04w%A8%01%26%85%5E%1BEa%E2bD%20%F1%23JXH%91%04%87!%05%04%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%F7%00%B9%08%1CH%B0%A0%C1%83%08%13%26%EC%00B%84%89%13%10O%98%20!%02%84%C2%8B%047%800%91%A2%A3%C7%8F%1DO%88%C0%A8%10%C4%09%90(A%8A%24YP%03%89%940U%92%60%C9e%C3I%94%2B%0C%AE%80i%82%24%88%94%18S%F6T%D8%01%25M.(%87%1E%D4p%B3c%CE%A3H%8D%1E%14%01%12%EA%40%95%07%8B~%B4JP*%C1%A6O%B9%5E%AD%3A%F0%A7G%B1%06%C9%0A%E4x%16mW%B2%1B%B6%BA%7D%2B%97j%DB%B9cC%0Al%9A%02%2F%DD%B3%7C%FD%E6%3D%2BWp%D4%AD%1E%C3%1A%AEZx1%E2%BB%82%8D%06v%BCur%E4%AA%2F!%E3%25k%B7%23%E5%BB%96%E7z%CD%ECy3%DF%BE%83Q%BB%F5%BAV-W%95%AA%07%9E%16%0B%D4%20i%CD%24k%1Fd%DB8%A8%EE%DD0%15%C6%8C%8D%F0%B4%D4%E1%B8%11%A60%8E%9Cu%EE%E61_Cw-%1D%BA%E1%C3%CE%15%06%04%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0!%C1%04%10%15%2CX%A0%00%E2%01%87%0D!6h%E1%A2%A3%C7%8E-%16%24%B8%88%D1%60%01%05%1C%3F%AA%FC%C8BA%81%92%03%0F%B0P%09C%86M%9B0V.%20P2%40%82%94.j%DA4%18%C3%26K%92%0C%0B%2C%F8X%93%A1%8C%9C%20%13d%F4%D8%D4a%05%A8.Z%F0Th%20e%D5%92O%3B%B2%18%90p%C0%CC%A00%60%0E%C4%AA%20%E1%D2%8Ei%D5%AE%F5(%D5%E0O%8Fr%09%B24%60%F0m%C7%BCz%E9%16%1C%00%14p%E0%8E%0D%0A*%F8h%F8%B0%0B%BE%03%CF%FEm%2C%F0%E3%02%82%0E%18S%E6%F21%F1%C0%C2%9B9%7Bt%E08te%90%A5M%7B%84%90%3A%F4%EA%D6%94%3F%92%1E%98%19%EF%E6%CE%04_%60u%0D7%06%C1%19P%5B%DC%F6j0%B8%0B%CA%92%E3%12%94%E1%91E%E3%16%5E%2F%1C%C4%EA%1C%B0d%19%085P%CF%9B%5C!s%B1%97aJ%A2%84%8B%DD%BB%C7%90%D5%19%B2%D8%E8%B1%FC%C2%EF%E0%DB%26%94(%D9%85%7B%A7X%B3%8A%84(%F0%00%C4%05%40%05u_CF%AD%B4%5E%03%2C%04H%5E%5Ea%AD%E4%E0WyY%D0%E0%835a%60%DAM%18%DEd%DA%86%1C.%14%10%00%00!%F9%04%05%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08C%00%B9%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DC%C8%B1%A3%C7%8F%20C%8A%1CI%B2%A4%C9%93(S%AA%5C%C9%B2%A5%CB%970c%CA%9CI%B3%A6%CD%9B8%09%06%04%00!%F9%04%09%0C%00%5C%00%2C%02%00%02%00%24%00%24%00%00%08%F6%00%B9%08%1CHP%E0%84%09.%5C%C0X%08%C3%C5%84%08%05%23J%2C%18Aa%C3%84%18%13.%7C8%B1%23%97%08%0B3%8A%14%B9%D0%81%C7%82%13.%8E%5C%89%11%06%C4%93%08Uf%8C%B8%12%C6%04%8F)G%9E%E4B%F2%E6D%9D%3B%07ft)Q%E1%CC%A0%04%87%9A%24%D8B%26R%9A-%0B%3A%7D%0AU%A1O%9E*%A9%16m%09A%E0T%AD%053%DE%04%99%B0%05%D8%AD%1A%B9%20%C4x%16%ADK%91m%ABj%3C%1AW%E8P%B6u%93%DEM%987%AC%C6%AC%7D%EDZ%C4%1B%98g%C2%B5%7C%0B%8BD%ECB%B1F%08d%13%F7m%F9%80%0B%E0%BCC%0D%D2%8D%DB%F2e%E4%C6u3%0F%FCz%B6%E5U.%0EHS%15M%F03%E8%D5%5C%252%96%7C%92%E4%CB%A22i%CB%D5xZ%A2k%B8%86k%BE%F6%98%3A7%CB%A1f%9F%E6%3C~%F7%2C%84%94%C6%FFr%AC%DB%C2%E1%E2%AE%3B%03%02%00!%F9%04%05%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CHp%A0%07%11%24L%A4X%B8%F0%84%09%12%22%0AJ%9C8Q%84B%86%183%A601%82%A2%C7%81%165%8A%CC%C8%F1%E3D%12%1A!%8A%88%C8ee%C8%8C%2CMr%C9pq%A1%89%98%1E_.%24!S%C4%09%86'p%F6%C4x%22%83%C7%0C%18M%C8%9CH%93%A1R%8A5y.%A5%88r%E7I%86R%A7Be%D8%91%20R%9BZ%3F~%DDX%F0b%D1%B0%1FE0%8C%A9v%A1P%B4%12%AB%A6%18x%F1)%DC%8F%3FSH%5D%7B%D7dU%A5mO%F45%E9%81!%97%8BY%07S%CC%EB%D3%AD%E2%8FUI%E4%0D%F18%A7M%C3%95)%06%C6%9Cy%A2%C6%CE%155%BE%ED%5C%F5%04c%D0%05%FF%5E%1C%9Dy%F5_%D4%04%19%B7%9D%0B%BB%25f%BE%B0%EB%0A4%5B%1B%F7%08%DC%9Dy%D3eh4%F3l%9C%BF%C1VNN%B6%E0%EC%C4%7D%F3%A6(%9E%DA)u%B4M%1D%2F%C6%C8%3A%ADt%E8%05%B31%5B%D5*%B7%B9_%A2%24%3C%7C%F4%20%19%23x%8F%23j%DAT)0%04B%F9)%82%C2m%3Cr%E4%7B%F2%F8%89t%C2%7Fw%DDg%DA%81%10i%15%10%00%00%3B"
	
	if ( document.getElementById('dashboard').innerHTML.match('Reinforcementss: <b>Unlimited</b>') ) {
		ReinforcementsType   = 'Unlimited'
	} else {
		ReinforcementsType	= ''
	}
	debug('ReinforcementsType: '+ReinforcementsType)
	// get teams
	try{
	    teamGame = document.getElementById('players').getElementsByTagName('b')[0].innerHTML
	}catch(err){teamGame=0}
	t=0; p=0
	if ( teamGame ) {
		var playerList = document.getElementById('players').getElementsByTagName('li')
		t=0;p=0
		for ( item in playerList ) {
		    if ( ! playerList[item].innerHTML ) { continue }
		    if ( playerList[item].innerHTML.match('Team') ) {
		        t=t+1
		        teams[t] = new Array()
		    }
		    if ( playerList[item].innerHTML.match('class="player') ) {
		        p=p+1
		        teams[t][p] = playerList[item].getElementsByTagName('span')[0].innerHTML
				if ( p == currentPlayerNumber ) {
					currentPlayerTeam = t
				}
		    }
		}
	}
	
	setTimeout(function(){checkForUpdate(0)}, 1000)

	innerMap.style.cursor = 'default'
	setCursor('default')

	userGuide = document.createElement('div')
		userGuide.id				= 'user-guide'
		userGuide.style.position	= 'fixed'
		userGuide.style.overflow	= 'auto'
		userGuide.style.background	= '#eeffee'
		userGuide.style.width		= '600px'
		userGuide.style.height		= screen.height - 300+'px' //'600px'
		userGuide.style.top			= '50px'
		userGuide.style.zIndex		= 101
		userGuide.style.border		= 'thick double #000000'
		userGuide.style.display		= 'none'
		userGuide.innerHTML			= userGuideHTML
	document.body.appendChild(userGuide)

	document.getElementById('close-user-guide').addEventListener('click', function(){showUserGuide(0)}, false)

	backScreen = document.createElement('div')
		backScreen.style.position	= 'fixed'
		backScreen.style.top		= '0px'
		backScreen.style.left		= '0px'
		backScreen.style.width		= '100%'
		backScreen.style.height		= '100%'
		backScreen.style.background	= '#000000'
		backScreen.style.opacity	= '.7'
		backScreen.style.zIndex		= 100
		backScreen.style.display	= 'none'
	document.body.appendChild(backScreen)
		
	// set default preferences, then update userPrefs if necessary
		defaultPrefs.push('actionMenu:normal')
		defaultPrefs.push('mapBorder:thin')
		defaultPrefs.push('showCrosshairs:Y')
		defaultPrefs.push('showFromMarker:Y')	
		defaultPrefs.push('showAdvanceToMarker:Y')	
		defaultPrefs.push('showFloatingQuantity:Y')	
		defaultPrefs.push('showToolTips:Y')	
		defaultPrefs.push('confirmDeploy:Y')
		defaultPrefs.push('confirmAssault:Y')
		defaultPrefs.push('confirmAuto-Assault:Y')
		defaultPrefs.push('confirmAdvance:Y')
		defaultPrefs.push('confirmReinforce:Y')
		defaultPrefs.push('confirmPhaseEnd:Y')
		defaultPrefs.push('phaseEndHotkey:'			+'e'.charCodeAt(0))
		defaultPrefs.push('nextGameHotkey:'			+'n'.charCodeAt(0))
		defaultPrefs.push('jumpToMapHotkey:'		+'m'.charCodeAt(0))
		defaultPrefs.push('refreshMapHotkey:'		+'r'.charCodeAt(0))
		defaultPrefs.push('beginTurnHotkey:'		+'b'.charCodeAt(0))
		defaultPrefs.push('increaseTroopsHotkey:'	+'w'.charCodeAt(0))
		defaultPrefs.push('decreaseTroopsHotkey:'	+'s'.charCodeAt(0))
		defaultPrefs.push('useMouseWheel:Y')
		defaultPrefs.push('deploymentClicks:Left-1 Right-Selected')
		
	// replace any missing values in userPrefs with the default
	userPrefs = loadUserPrefs()
	for ( var pref in defaultPrefs ) {
		if ( userPrefs[defaultPrefs[pref].split(':')[0]] == 'undefined' || ! userPrefs[defaultPrefs[pref].split(':')[0]] ) {
			userPrefs[defaultPrefs[pref].split(':')[0]] = defaultPrefs[pref].split(':')[1]
		}
	}
	storeUserPrefs()

	userPrefs = loadUserPrefs()

	for ( pref in userPrefs ) {
		debug('userPrefs: '+userPrefs[pref])
	}

	crosshair = document.createElement('img')
		crosshair.id				= 'cm-crosshairs'
		crosshair_w					= 47
		crosshair_h					= 47
		crosshair.src = enemyGif
		crosshair.style.width		= crosshair_w+'px'
		crosshair.style.height		= crosshair_h+'px'
		crosshair.style.zIndex		= 0
		crosshair.style.position	= 'absolute'
		crosshair.style.visibility	= 'hidden'
		crosshair.title = 'test'
	mapCell.appendChild(crosshair)
	crosshairXoffset = (crosshair_w / 7)
	crosshairYoffset = (crosshair_h / 2)
		
	AssaultFromMarker = document.createElement('img')
		AssaultFromMarker.id					= 'cm-Assault-from-marker'
		AssaultFromMarker_w = 45
		AssaultFromMarker_h = 45
		AssaultFromMarker.src = AssaultFromGif
		AssaultFromMarker.style.width		= AssaultFromMarker_w+'px'
		AssaultFromMarker.style.height		= AssaultFromMarker_h+'px'
		AssaultFromMarker.style.zIndex		= 0
		AssaultFromMarker.style.left			= '-1000px'
		AssaultFromMarker.style.position		= 'absolute'
		AssaultFromMarker.style.visibility	= 'hidden'
	AssaultFromMarkerXoffset = (AssaultFromMarker_w / 7)
	AssaultFromMarkerYoffset = (AssaultFromMarker_h / 2)
	mapCell.appendChild(AssaultFromMarker)
	
	ReinforceFromMarker = document.createElement('img')
		ReinforceFromMarker.id				= 'cm-Reinforce-from-marker'
		ReinforceFromMarker_w = 45
		ReinforceFromMarker_h = 45
		ReinforceFromMarker.src = ReinforceFromGif
		ReinforceFromMarker.style.width		= ReinforceFromMarker_w+'px'
		ReinforceFromMarker.style.height		= ReinforceFromMarker_h+'px'
		ReinforceFromMarker.style.zIndex		= 0
		ReinforceFromMarker.style.left		= '-1000px'
		ReinforceFromMarker.style.position	= 'absolute'
		ReinforceFromMarker.style.visibility	= 'hidden'
	ReinforceFromMarkerXoffset = (ReinforceFromMarker_w / 7)
	ReinforceFromMarkerYoffset = (ReinforceFromMarker_h / 2)
	mapCell.appendChild(ReinforceFromMarker)
	
	advanceFromMarker = document.createElement('img')
		advanceFromMarker.id				= 'cm-advance-from-marker'
		advanceFromMarker_w = 45
		advanceFromMarker_h = 45
		advanceFromMarker.src = advanceFromGif
		advanceFromMarker.style.width		= advanceFromMarker_w+'px'
		advanceFromMarker.style.height		= advanceFromMarker_h+'px'
		advanceFromMarker.style.zIndex		= 0
		advanceFromMarker.style.left		= '-1000px'
		advanceFromMarker.style.position	= 'absolute'
		advanceFromMarker.style.visibility	= 'hidden'
	advanceFromMarkerXoffset = (advanceFromMarker_w / 7)
	advanceFromMarkerYoffset = (advanceFromMarker_h / 2)
	mapCell.appendChild(advanceFromMarker)
	
	advanceToMarker = document.createElement('img')
		advanceToMarker.id					= 'cm-advance-to-marker'
		advanceToMarker_w = 20
		advanceToMarker_h = 20
		advanceToMarker.src = advanceToGif
		advanceToMarker.style.width			= advanceToMarker_w+'px'
		advanceToMarker.style.height		= advanceToMarker_h+'px'
		advanceToMarker.style.zIndex		= 0
		advanceToMarker.style.left			= '-1000px'
		advanceToMarker.style.position		= 'absolute'
		advanceToMarker.style.visibility	= 'hidden'
	advanceToMarkerXoffset = -6
	advanceToMarkerYoffset = 11
	mapCell.appendChild(advanceToMarker)

	floatingQuantity = document.createElement('div')
		floatingQuantity.id					= 'cm-floating-quantity'
		floatingQuantity_w = 15
		floatingQuantity_h = 15
		floatingQuantity.style.paddingTop	= '0px'
		floatingQuantity.style.paddingBottom= '0px'
		floatingQuantity.style.paddingLeft	= '1px'
		floatingQuantity.style.paddingRight	= '1px'
		floatingQuantity.style.zIndex		= 1
		floatingQuantity.style.left		    = '-1000px'
		floatingQuantity.style.position 	= 'absolute'
		floatingQuantity.style.visibility	= 'hidden'
		floatingQuantity.style.border		= 'thin solid #ffffff'
		floatingQuantity.style.color		= '#ffffff'
		floatingQuantity.style.background	= '#556655'
	floatingQuantityXoffset = 15
	floatingQuantityYoffset = -25
	mapCell.appendChild(floatingQuantity)

	// insert menu container
	menuDiv = document.getElementById('leftColumn').getElementsByTagName('div')[1]
	clickableMapMenuDiv = document.createElement('div')
	clickableMapMenuHeading = document.createElement('h3')
	clickableMapMenu = document.createElement('ul')
	if(version.toString().length == 1){v=version.toString()+'.0'}else{v=version}
	clickableMapMenuDiv.id = 'clickable_map_menu'
	clickableMapMenuHeading.innerHTML = '<b>Clickable Maps v'+v+'</b>'
	menuDiv.appendChild(clickableMapMenuDiv)
	clickableMapMenuDiv.appendChild(clickableMapMenuHeading)
	clickableMapMenuDiv.appendChild(clickableMapMenu)

	// CREATE MENU ITEMS- [ createMenuItem( parent, id, listener, method, displayText, value )  ]
	// appearance
	sm= createMenuItem(clickableMapMenu, 'appearanceSubMenu', 'mouseover', function(){void(0)}, 'Appearance...')
		createMenuItem(sm, 'actionMenu',           'click', function(){setPref(this)}, 'Action Menu:',     userPrefs['actionMenu'])
		createMenuItem(sm, 'mapBorder',            'click', function(){setPref(this)}, 'Map Border:',      userPrefs['mapBorder'])
		createMenuItem(sm, 'showCrosshairs',       'click', function(){setPref(this)}, 'Show Enemy Crosshairs (Assault Phase)?<br><img border=0 height="13px" width="13px" src="'+enemyGifSmall+'" />',  userPrefs['showCrosshairs'])
		createMenuItem(sm, 'showFromMarker',       'click', function(){setPref(this)}, 'Show From-Region Marker (Assault/Advance/Reinforce Phases)?<br><img border=0 height="15px" width="15px" src="'+advanceFromGif+'" />', userPrefs['showFromMarker'])
		createMenuItem(sm, 'showAdvanceToMarker',  'click', function(){setPref(this)}, 'Show Advance-To Marker (Advance Phase)?<br><img border=0 height="10px" width="10px" src="'+advanceToGif+'" />', userPrefs['showAdvanceToMarker'])
		createMenuItem(sm, 'showFloatingQuantity', 'click', function(){setPref(this)}, 'Show Floating Troop Counter Over Map?', userPrefs['showFloatingQuantity'])
		createMenuItem(sm, 'showToolTips',         'click', function(){setPref(this)}, 'Show Help Tool-Tips?',  userPrefs['showToolTips'])

	// confirmations
	sm= createMenuItem(clickableMapMenu, 'confirmationSubMenu', 'mouseover', function(){void(0)}, 'Confirmations...')
		createMenuItem(sm, 'confirmDeploy',	     'click', function(){setPref(this)},    'Confirm Deploy?',	    userPrefs['confirmDeploy'])
		createMenuItem(sm, 'confirmAssault',	     'click', function(){setPref(this)},    'Confirm Assault?',	    userPrefs['confirmAssault'])
		createMenuItem(sm, 'confirmAuto-Assault', 'click', function(){setPref(this)},    'Confirm Auto-Assault?', userPrefs['confirmAuto-Assault'])
		createMenuItem(sm, 'confirmAdvance',	 'click', function(){setPref(this)},    'Confirm Advance?',	    userPrefs['confirmAdvance'])
		createMenuItem(sm, 'confirmReinforce',	 'click', function(){setPref(this)},    'Confirm Reinforce?',	    userPrefs['confirmReinforce'])
		createMenuItem(sm, 'confirmPhaseEnd',	 'click', function(){setPref(this)},    'Confirm Phase End?',	userPrefs['confirmPhaseEnd'])

	//  controls
	sm= createMenuItem(clickableMapMenu, 'controlSubMenu', 'mouseover', function(){void(0)}, 'Controls...')
		createMenuItem(sm, 'phaseEndHotkey',	   'click', function(){setHotkey(this)}, 'Phase End Hotkey:',   String.fromCharCode(userPrefs['phaseEndHotkey']))
		createMenuItem(sm, 'nextGameHotkey',	   'click', function(){setHotkey(this)}, 'Next Game Hotkey:',   String.fromCharCode(userPrefs['nextGameHotkey']))
		createMenuItem(sm, 'jumpToMapHotkey',	   'click', function(){setHotkey(this)}, 'Jump to Map Hotkey:', String.fromCharCode(userPrefs['jumpToMapHotkey']))
		createMenuItem(sm, 'refreshMapHotkey',	   'click', function(){setHotkey(this)}, 'Refresh Map Hotkey:', String.fromCharCode(userPrefs['refreshMapHotkey']))
		createMenuItem(sm, 'beginTurnHotkey',	   'click', function(){setHotkey(this)}, 'Begin Turn Hotkey:',  String.fromCharCode(userPrefs['beginTurnHotkey']))
		createMenuItem(sm, 'increaseTroopsHotkey', 'click', function(){setHotkey(this)}, 'Increase Troops: <font style="font-weight:bold;">right-arrow</font> or ',  String.fromCharCode(userPrefs['increaseTroopsHotkey']))
		createMenuItem(sm, 'decreaseTroopsHotkey', 'click', function(){setHotkey(this)}, 'Decrease Troops: <font style="font-weight:bold;">left-arrow </font> or ',  String.fromCharCode(userPrefs['decreaseTroopsHotkey']))
		createMenuItem(sm, 'useMouseWheel',	       'click',	function(){setPref(this)},   'Use Mouse Wheel to Increase/Decrease Troops? ',	userPrefs['useMouseWheel'])
		createMenuItem(sm, 'deploymentClicks',	   'click',	function(){setPref(this)},   'Deployment Clicks: ',	userPrefs['deploymentClicks'])
		
	// update
	createMenuItem(clickableMapMenu, 'checkForUpdates', 'click', function(){checkForUpdate(1)}, 'Check for Updates', '')

	// help
	createMenuItem(clickableMapMenu, 'userGuide', 'click', function(){showUserGuide(1)}, 'User Guide', '')

	//  load user prefs into menus
	for (var pref in userPrefs) {
		var el = document.getElementById(pref)
		switch(pref) {
			case 'actionMenu':
				// if BOB is running, remove the action menu option to prevent conflicts with BOB's HUD
				if ( bob ) {
					el.parentNode.parentNode.removeChild(el.parentNode)
					break
				}
				switch(userPrefs[pref]) {
					case 'normal': // DO NOTHING because on initial load, it will already be normal, unless someone is using another script to do the same thing, in which case we don't want ot undo it :)
						break
					case 'floating':
						if ( actionForm ) {
							actionForm.style.width='100%'
							actionForm.style.left='0px'
							actionForm.style.position='fixed'
							actionForm.style.bottom=0
							actionForm.style.zIndex=1
						}
						break
				}
				break
			case 'mapBorder':
				// color will be set by updateAction
				var thin	= '2px'
				var thick	= '4px'
				switch(userPrefs[pref]) {
					case 'off':
						// do nothing
					break
					case 'thin':
						outerMap.style.border	= thin + ' solid #eeeeee'
						outerMap.style.left		= '-'+thin
						outerMap.style.top		= '-'+thin
					break
					case 'thick':
						outerMap.style.border	= thick + ' solid #eeeeee'
						outerMap.style.left		= '-'+thick
						outerMap.style.top		= '-'+thick
					break
				}
			break
			default:
				if ( el.id.match('Hotkey') ) {
					n = String.fromCharCode(userPrefs[pref])
					if ( n != String.fromCharCode('-1') ) {
						el.getElementsByTagName('b')[0].innerHTML = n
					} else {
						el.getElementsByTagName('b')[0].innerHTML = '(none)'
					}
				} else {
					if ( el.id.match('confirm') ) {
						// if BOB is running, then remove the confirmations that BOB also has to prevent conflicts
						if ( bob && ( el.id == 'confirmDeploy' || el.id == 'confirmAuto-Assault' || el.id == 'confirmPhaseEnd' ) ) {
								el.parentNode.parentNode.removeChild(el.parentNode)
								userPrefs[pref] = 'N'
						} else {
							el.getElementsByTagName('b')[0].innerHTML = userPrefs[pref]
						}
					}
				}
				break
		}
	}

	mapCell.addEventListener('click',       	onMapClick,     false)
	mapCell.addEventListener('contextmenu', 	onMapClick,     false)
	mapCell.addEventListener('mousemove',   	onMapMouseMove, false)
	mapCell.addEventListener('mouseout',    	function(){crosshair.style.visibility = 'hidden'; floatingQuantity.style.visibility = 'hidden', setCursor('default')}, false)
	mapCell.addEventListener('DOMMouseScroll',	onMouseWheel,	false)

	document.addEventListener('keypress', 	    onKeyPress,		false)
	
	updateXML()
} // END initialize()

document.getElementById('message').addEventListener('focus', function(){chatHasFocus = 1}, false)
document.getElementById('message').addEventListener('blur',  function(){chatHasFocus = 0}, false)

// DECLARATIONS
var outerMap
var innerMap
var mapName
var outerMapPos
var mapCell
var currentPlayerName
var currentPlayerNumber
var actionForm
var AssaultFromGif
var advanceFromGif
var ReinforceFromGif
var advanceToGif
var enemyGif
var enemyGifSmall
var ReinforcementsType
var confirmMessage
var mapHeight
var mapWidth
var mapSize
var mapx
var mapy
var mapOffsetLeft
var mapOffsetTop
var fromRegion
var toRegion
var AssaultedFromRegion
var AssaultedToRegion
var selectQuantity
var selectedQuantity
var actionString
var doAction
var chatHasFocus
var userGuide
var backScreen
var crosshair
var crosshairXoffset
var crosshairYoffset
var AssaultFromMarker
var AssaultFromMarkerXoffset
var AssaultFromMarkerYoffset
var advanceFromMarker
var advanceFromMarkerXoffset
var advanceFromMarkerYoffset
var ReinforceFromMarker
var ReinforceFromMarkerXoffset
var ReinforceFromMarkerYoffset
var advanceToMarker
var advanceToMarkerXoffset
var advanceToMarkerYoffset
var floatingQuantity
var floatingQuantityXoffset
var floatingQuantityYoffset
var menuDiv
var clickableMapMenuDiv
var clickableMapMenuHeading
var clickableMapMenu
var teamGame
var minTroops
var remainingTroops
var teams			 	= new Array()
var userPrefs		 	= new Array()
var defaultPrefs	 	= new Array()
var	cm_regions		= new Array()
var	troops				= new Array()
var	fromRegion_troops= new Array()
var autoAdvance			= false
var autoAssaultX			= false
var deployDeferred	 	= false
var sendingRequest	 	= false
var XMLisUpdated	 	= false
var actionUpdated		= false
var bob					= false
var	debugging			= true

// see if bob's running, and wait for it to load before initializing
bobCheck = setInterval(function(){
	if ( unsafeWindow.refreshGMScript.toString().match('updateMagicMap()') ) {
		// bob is running
		bob = true
		if ( document.getElementById('magicmap') ) {
			clearInterval(bobCheck)
			initialize()
		}
	} else {
		// bob is not running
		clearInterval(bobCheck)
		initialize()
	}
}, 250)

XMLinterval = setInterval(function(){
	debug('checking xml status')
	if ( XMLisUpdated ) {
		clearInterval(XMLinterval)
		updateAction()
	}
}, 250)
// the end  :0)

