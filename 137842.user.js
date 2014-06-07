// ==UserScript==
// @name        Billomat/mite Import Toolbox
// @description Provides various improvements for importing mite time entries to Billomat  
// @namespace   http://www.kaineder.com
// @include     http://*.billomat.net/portal/invoices/form/hashkey/*
// @include     https://*.billomat.net/portal/invoices/form/hashkey/*
// @version     1.1
// ==/UserScript==


// Inject this script into page scope
// source: http://wiki.greasespot.net/Content_Scope_Runner
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  return;
}
// ----------------------------


// set event handler for AJAX request completion
// this will execute code when the time list from mite is loaded
Ajax.Responders.register( {
    onComplete: function(req) {
        
    	// find the Billomat hash in url, e.g. 1eccddfc0cfce8b8c9e99ecb52fe16e7
    	if (window.location.href.length <= 32)
    		return;
    	var hashkey = window.location.href.substring(window.location.href.length - 32)
    	
        // test if request is "get time entries list"
        if (req.url == "/portal/mite/search/hashkey/" + hashkey)
        {
        	// script won't work when using group by (may be implemented later) -> exit
        	if ($('miteUse_group_time_period').checked || $('miteUse_group_customer').checked || $('miteUse_group_project').checked || $('miteUse_group_service').checked || $('miteUse_group_user').checked || $('miteUse_group_locked').checked)
        		return
        	
        	// insert notification that the website code has been altered
        	// also provides some checkbox which can be used to modify behaviour
            $('miteResults').insert({ top:
            		'<div style="border-bottom: 2px solid rgb(153, 204, 0); padding-bottom: 10px; font-size: 11px;">'+
            		'<b>Billomat/mite Import Toolbox</b> ist aktiviert!<br>' +
            		'<input type="checkbox" checked name="bkbu_dialog_no_close" id="bkbu_dialog_no_close" value="1"> <label for="bkbu_dialog_no_close">Dialog nicht schließen</label> &nbsp; ' +
            		'<input type="checkbox" checked name="bkbu_alt_desc" id="bkbu_alt_desc" value="1"> <label for="bkbu_alt_desc">Alternativen Positionstext verwenden</label>' +
            		'</div>'
            	});
            
            // for each table row with in time entries
            $$('table.mite-result tr').each( function (tr) {
                var code = tr.onclick;
                
                if (code != null)
                {
                	// get properties of mite entry from table cells
                	var tds = tr.childElements();
                	var miteEntry =
                		{
                			"Date":       tds[0].innerHTML,
                			"Customer":   tds[1].innerHTML,
                			"Project":    tds[2].innerHTML,
                			"Service":    tds[3].innerHTML,
                			"User":       tds[4].innerHTML,
                			"Note":       tds[5].innerHTML,
                			"Hours":      parseFloat(tds[6].innerHTML.replace(".", "").replace(",", ".")),
                			"Amount":     parseFloat(tds[7].innerHTML.replace(".", "").replace(",", "."))
                		}
                	
                    // replace the standard onlick function by this one
                    tr.onclick = function()
                    {
                    	// convert mite entry object to invoice item
                        var invoiceItem = convertMiteEntryToInvoiceItem(miteEntry);
                        
                        new Ajax.Request(
                            '/portal/invoiceitems/new/hashkey/'+ hashkey +'/index/'+Items.lineIndex,
                            {
                                onComplete:
                                    function(r){
                                        new Insertion.Bottom('items',r.responseText);
                                        Items.lineIndex++;
                                        Items.update('/portal/invoices/recalculate/hashkey/'+ hashkey, 'InvoicesForm');
                                        initTextareas();
                                        initSortables();
                                     },
                                parameters:
                                        $H({
											'InvoiceItem[description]': invoiceItem.Description,
											'InvoiceItem[unit_price]': invoiceItem.UnitPrice,
											'InvoiceItem[quantity]': invoiceItem.Quantity,
											'InvoiceItem[name]': invoiceItem.Name,
											'InvoiceItem[unit]': invoiceItem.Unit
                                        }).merge($('InvoicesForm').serialize(true))
                            }
                        );
                        
                        // remove table row or hide dialog depending on selected option 
                        if ($('bkbu_dialog_no_close').checked)
                        	new Effect.Fade(this, { duration:0.4 });
                        else
                        	closeLightbox('mite');
                    }
                }
            });
        }
    }
});

// This function converts the given mite time entry object to an invoice item object which is then
// used to populate the invoice in Billomat
function convertMiteEntryToInvoiceItem(miteEntry) 
	{
		var invoiceItem =
			{
				"Name":        "",
				"Description": "",
				"Quantity":    miteEntry.Hours,
				"UnitPrice":   miteEntry.Amount / miteEntry.Hours,
				"Unit":        (miteEntry.Hours==1 ? "Stunde" : "Stunden")
			}
		
		var altDesc = $('bkbu_alt_desc').checked;
		
		if($("filter1") != null && $("filter1").checked) {
			if (altDesc)
				invoiceItem.Name += miteEntry.Date + " / ";
			else
				invoiceItem.Description += "Datum: " + miteEntry.Date + "\n";
		}
		if($("filter2") != null && $("filter2").checked) {
			invoiceItem.Description += "Kunde: " + miteEntry.Customer + "\n";
		}
		if($("filter4") != null && $("filter4").checked) {
			if (altDesc)
				invoiceItem.Name += "Projekt: " + miteEntry.Project + " / ";
			else
				invoiceItem.Description += "Projekt: " + miteEntry.Project + "\n";
		}
		if($("filter8") != null && $("filter8").checked) {
			if (altDesc)
				invoiceItem.Name += miteEntry.Service + " / ";
			else
				invoiceItem.Description += "Leistung: " + miteEntry.Service + "\n";
		}
		if($("filter16") != null && $("filter16").checked) {
			invoiceItem.Description += "Benutzer: " + miteEntry.User + "\n";
		}
		if($("filter32") != null && $("filter32").checked) {
			if (altDesc)
				invoiceItem.Description += miteEntry.Note + "\n";
			else
				invoiceItem.Description += "Bemerkung: " + miteEntry.Note + "\n";
		}
		
		// filter trailing delimiters
		if (invoiceItem.Name.length > 0 && invoiceItem.Name.substr(-3) == " / ")
			invoiceItem.Name = invoiceItem.Name.substring(0, invoiceItem.Name.length - 3);
		
		if (invoiceItem.Description.length > 0 && invoiceItem.Description.substr(-1) == "\n")
			invoiceItem.Description = invoiceItem.Description.substring(0, invoiceItem.Description.length - 1);
		
		return invoiceItem;
	}

