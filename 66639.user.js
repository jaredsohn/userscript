// ==UserScript==
// @name           Neopets : Quick Search
// @namespace      http://www.gamingire.com/
// @author         Backslash
// @description    Adds a quick search sidebar box, if you need to search the shop wizard.
// @include        http://www.neopets.com*
// ==/UserScript==
  newDiv = document.createElement('div');
  newDiv.setAttribute('style', 'margin-bottom: 7px;');
  newDiv.setAttribute('class', 'sidebarModule');
  newDiv.innerHTML = '<table class="sidebarTable" border="0" cellpadding="2" cellspacing="0" width="160"><tbody><tr>\
  <td class="sidebarHeader medText" valign="middle">Quick Shop Wizard</td></tr><tr><td class="neofriend" align="center">\
						<form action="http://www.neopets.com/market.phtml" method="post">\
						  <input type="hidden" name="type" value="process_wizard">\
						<input type="hidden" name="feedset" id="feedset" value="0">\
<input type="text" name="shopwizard" value="" size="15" maxlength="60"><div align="center" style="background-color: #EFEFEF; padding: 1px;">\
						<input type="hidden" name="table" value="shop">\
						<input type="hidden" name="criteria" value="exact">\
						<input type="hidden" name="min_price" value="0">\
						<input type="hidden" name="max_price" value="99999">\
				<input type="submit" value="Search">\
			</div></form>\
</td></tr></tbody></table>';

  sidebar = document.evaluate('//td[@width="178"][@align="center"][@class="sidebar"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  if (sidebar){
    sidebar.insertBefore(newDiv, sidebar.firstChild.nextSibling);
  }  