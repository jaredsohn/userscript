// ==UserScript==
// @name           Swedbank gruppera på kontohändelse
// @namespace      se.swedbank.internetbank.accounteventgrouper
// @include        https://internetbank.swedbank.se/bviPrivat/privat?WindowSessId=*_flow_id_=SORTERA_KONTOTRANSAKTIONER_CLIENT*kolumnId=beskrivning*
// @description    Grupperar ihop alla kontohändelser och summerar ihop beloppet på Swedbanks internetbank. Välj Ekonomisk översikt > Konton och lån översikt > klicka på kontot du är intresserad av > Klicka på Kontohändelse (med en liten pil bredvid). Till höger om listan dyker en instruktionsruta upp. 
// @version        1.0
// @author         Gustav Axelsson http://userscripts.org/users/60090/scripts
// ==/UserScript==


/**
 * @memberOf bizo
 * @name AccountEventGrouper
 * @static
 * @type object
 * @description Groups all account events on swedbank
 */
var AccountEventGrouper = function () 
{
  // Private Variables
  var that,
  sidspalt2a;
  
  // Private methods
  /**
   * @memberOf AccountEventGrouper
   * @name getObj
   * @function
   * @description Returns an object from a table row
   * @private
   * @param {object} tr The table row.
   */
  function getObj(tr, i)
  {
    try
    {
      var obj = {}, tds;
      obj.row = tr;
      tds = tr.getElementsByTagName("td");
      if (tds && tds.length >= 5)
      {
        obj.row.belopp = tds[4].getElementsByTagName("span")[0].firstChild;
        obj.belopp = obj.row.belopp.nodeValue.replace(",", ".").replace(" ", "") * 1;
        obj.kontohandelse = tds[2].firstChild.nodeValue;
        return obj;
      }
      else
      {
        return false;
      }
    }
    catch (error)
    {
      throw "Error in AccountEventGrouper.getObj: " + error + " (tr = " + tr + ", tds.length = " + tds.length + ", i = " + i + ")";
    }
  }
  
  /**
   * @memberOf AccountEventGrouper
   * @name updateRow
   * @function
   * @description Updates a table row.
   * @private
   * @param {object} rowObj Object representing the row.
   */
  function updateRow(rowObj)
  {
    try
    {
      rowObj.row.belopp.nodeValue = (rowObj.belopp + "").replace(".", ",");
    }
    catch (error)
    {
      alert("Error in AccountEventGrouper.updateRow: " + error + " (rowObj = " + rowObj + ")");
    }
  }
  
  /**
   * @memberOf AccountEventGrouper
   * @name groupAccountEvents
   * @function
   * @description Groups the account events.
   * @param {object} event The event (onclick for example);
   * @private
   */
  function groupAccountEvents(event) 
  {
    try
    {
      var table, currentObj, lastObj, i, rows;
      event.stopPropagation();
      event.preventDefault();
      table = sidspalt2a.getElementsByTagName("table");
      table = table[table.length - 1];
      
      rows = table.getElementsByTagName("tr");
      i = 1; // First row is the header;
      while (i < rows.length - 2)
      {
        currentObj = getObj(rows[i], i);
        if (!lastObj)
        {
          lastObj = currentObj;
          i += 1;
        }
        else if (lastObj.kontohandelse === currentObj.kontohandelse)
        {
          lastObj.belopp += currentObj.belopp;
          rows[i].parentNode.removeChild(rows[i]);
          updateRow(lastObj);
        }
        else if (currentObj)
        {
          lastObj = currentObj;
          i += 1;
        }
        else
        {
          i += 1;
        }
      }
    }
    catch (error)
    {
      alert("Error in AccountEventGrouper.groupAccountEvents: " + error);
    }
  }
  
  // Public methods
  return /** @scope AccountEventGrouper */ {
    /**
     * @memberOf AccountEventGrouper
     * @description Initialization function for AccountEventGrouper.
     */
    init: function ()
    {
      try
      {
        var i, length, table, tables, sidinnehallTabell, sidspalt2b, sidinnehall, childNode, tempNode;
        
        if (!that)
        {
          that = this;
        }
        
        tables = document.getElementsByTagName("table");
        i = 0;
        length = tables.length;
        while (i < length)
        {
          table = tables[i];
          if (table.getAttribute("class") === "sidinnehall-tabell")
          {
            sidinnehallTabell = table;
            sidinnehallTabell = sidinnehallTabell.getElementsByTagName("table")[0];
            sidinnehall = sidinnehallTabell.lastChild.firstChild;
            i = length;
          }
          else
          {
            i += 1;
          }
        }
        
        if (sidinnehallTabell)
        {
          i = 0;
          length = sidinnehall.childNodes.length;
          while (i < length)
          {
            childNode = sidinnehall.childNodes[i];
            if (childNode.nodeType === 1)
            {
              if (childNode.getAttribute("class") === "sidspalt2a")
              {
                sidspalt2a = childNode;
              }
              else if (childNode.getAttribute("class") === "sidspalt2b")
              {
                sidspalt2b = childNode;
              }
            }
            i += 1;
          }
        }
        
        if (sidspalt2b)
        {
          childNode = sidspalt2b.getElementsByTagName("div")[0].cloneNode(true);
          childNode.getElementsByTagName("h3")[0].firstChild.nodeValue = "Gruppera kontohändelser";
          tempNode = childNode.getElementsByTagName("p")[1];
          tempNode.firstChild.nodeValue = "";
          tempNode.appendChild(document.createElement("a"));
          tempNode.lastChild.appendChild(document.createTextNode("Klicka för att gruppera kontohändelser och summera beloppen till en klumpsumma per händelse."));
          tempNode.lastChild.setAttribute("href", "");
          tempNode.lastChild.addEventListener("click", groupAccountEvents, false);
          tempNode = childNode.getElementsByTagName("p")[2];
          tempNode.parentNode.removeChild(tempNode);
          sidspalt2b.appendChild(childNode); 
        }
        
        delete that.init;
      }
      catch (error)
      {
        alert("Error in AccountEventGrouper.init: " + error);
      }
    }
  };
}();
AccountEventGrouper.init();
