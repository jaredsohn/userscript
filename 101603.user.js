// ==UserScript==
// @name          GcAutoVisit
// @namespace     http://www.sammyshp.de
// @description   Auto-visit for trackables.
// @author        Sven Karsten Greiner (SammysHP) <sven@sammyshp.de>
// @version       0.4
// @licence       http://creativecommons.org/licenses/by-nc-nd/3.0/
// @license       (CC) by-nc-nd
// @include       http://www.geocaching.com/seek/log.aspx?*
// ==/UserScript==

function addColumn()
{
    // Add header
    var head = document.evaluate("//table[@id='tblTravelBugs']/thead/tr",
                                 document,
                                 null,
                                 XPathResult.FIRST_ORDERED_NODE_TYPE,
                                 null);
    
    var header = document.createElement('th');
    header.setAttribute('style', 'width: 80px');
    header.innerHTML = 'AutoVisit';
    
    if (head.singleNodeValue)
    {
        head.singleNodeValue.appendChild(header);
    }
    
    // Add footer
    var footer = document.evaluate("//table[@id='tblTravelBugs']/tbody/tr[count(td)=1]/td",
                                   document,
                                   null,
                                   XPathResult.FIRST_ORDERED_NODE_TYPE,
                                   null);
    
    if (footer.singleNodeValue)
    {
        footer.singleNodeValue.setAttribute('colspan', footer.singleNodeValue.getAttribute('colspan') + 1);
    }
    
    // Add checkboxes in every row
    var rows = document.evaluate("//table[@id='tblTravelBugs']/tbody/tr[count(td)>1]",
                                 document,
                                 null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                 null);
    
    for (var i=0 ; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
        
        // Get trackable-select
        var options = document.evaluate("./td[3]/select/option",
                                        row,
                                        null,
                                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                        null);
        
        var id        = options.snapshotItem(0).getAttribute('value');
        var selection = (null == options.snapshotItem(2)) ? options.snapshotItem(1) : options.snapshotItem(2);
        
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        
        if (GM_getValue(getUserHash() + '_' + id, false))
        {
            selection.selected = true;
            unsafeWindow.setSelectedActions();
            checkbox.checked   = true;
        }
        
        checkbox.addEventListener('change', (function(id, selection)
                                            {
                                                return function(event)
                                                       {
                                                           if (event.target.checked)
                                                           {
                                                               GM_setValue(getUserHash() + '_' + id, true);
                                                               selection.selected = true;
                                                               unsafeWindow.setSelectedActions();
                                                           }
                                                           else
                                                           {
                                                               GM_setValue(getUserHash() + '_' + id, false);
                                                           }
                                                       }
                                            })(id, selection),
                                            false);
        
        var td = document.createElement('td');
        td.appendChild(checkbox);
        
        row.appendChild(td);
    }
}

function getUserHash()
{
    var username = document.evaluate("//a[@class='SignedInProfileLink']",
                                     document,
                                     null,
                                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                                     null);
    
    var data  = username.singleNodeValue.innerHTML;
    var norm  = Math.pow(2, -32);
    var a     = 2095533;
    var s     = 0, c = 1;
    var t, t0 = 0;
    var n0    = 1000000000;
    
    data = data.toString();
    for (var i = 0; i < data.length; i++)
    {
        s -= data.charCodeAt(i) * 65537 * norm;
        if (s < 0)
        {
            s += 1;
        }
        t = a * s + c * norm;
        t0 = s = t - (c = t | 0);
        t = a * s + c * norm;
        s = t - (c = t | 0);
    }
    return Math.floor(n0 * (s + t0 * norm));
}

// make it nice, use events
window.addEventListener('load', addColumn, false);