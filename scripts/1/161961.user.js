// ==UserScript==
// @name       Harvest: Adds odometer fields for predefined categories.
// @namespace  http://www.intellisearch.no
// @version    0.1
// @description  Disable the distance field in the expence form. Instead show From and To odometer fields and update actual distance based on values entered. Use the comment-field for persisting From and To values, as well as for making the values visible in the report generated.
// @match      https://*.harvestapp.com/expenses
// @copyright  2013+, Ronny Hanssen
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant      GM_getValue
// ==/UserScript==
 
if (this.jQuery) this.$ = this.jQuery = jQuery.noConflict(true);

var timer = 100;

var activeOdometer = null;

var OdoCategories = [];

$.each(GM_getValue("Harvest.Expense.OdometerCategories", "1256657,1256670").split(","), function(idx, val){
    OdoCategories.push($.trim(val));
});

var FromLabel = GM_getValue("Harvest.Expense.FromLabel", "From: ");
var SeparatorLabel = GM_getValue("Harvest.Expense.SeparatorLabel", " - ");
var ToLabel = GM_getValue("Harvest.Expense.ToLabel", "To: ");

console.info("Expense categories set to trigger odometer fields: ", OdoCategories);

function Odometer(rowId){
    console.group("Odometer " + (rowId || ""));
    var self = this;

    var select, editForm, editUpdate, editCancel, editComment, editAmount, expenseUnits, odo, from, to, total = "";

    function init(){
        console.group("init")
        
        // Set some variables that will let us control which form is being used.
        if (rowId){
            editForm = "#" + rowId.join("-") + "-form";
            editUpdate = editForm + " input.save";
            editCancel = editForm + " a.cancel";
            select = $(editForm + ' select[name="expense[expense_category_id]"]');
        } else {
            editForm = "#add_expense_form";
            editUpdate = editForm + " input.btn-submit";
            editCancel = editForm + " a.btn-submit";
            select = $(editForm + ' select[name="expense[expense_category_id]"]');
        }
        editAmount   = editForm + " td.amount";
        editComment  = editForm + " input.notes";
        expenseUnits = editAmount + " input.units";

        if (activeOdometer != null && activeOdometer != self) {
            // Cleanup from previous form. Call cancel for the old control.
            console.debug("Cleaning up old active odometer.");
            destroy.call(activeOdometer);
        }
        activeOdometer = self;

        // Without the selector this makes no sense...
        if (select == null){
            console.error("Unable to find required html-element with id='expense_expense_category_id'. Harvest updated/changed?");
            return;
        }

        // Inject the extra fields (From and To)
        injectFromToFields();

        // Remove mileage from comment
        stripMileageFromComment();

        // Bind the selector to control whether or not to show Odometer fields
        select.bind("change.select", function(){
            toggleOdoIfNeeded();
        });

        // Make sure that odo is initialized properly when created.
        toggleOdoIfNeeded();
        activeFormCancel = editCancel;
        console.groupEnd();
    }

    function destroy(){
        console.group("destroy");
        // Unbind all handlers
        if (from) from.unbind("change.update");
        if (to) to.unbind("change.update");
        if (select) select.unbind("change.select");
        $(editUpdate).unbind("click.save");
        $(editCancel).unbind("click.cancel");
        // Remove the elements from DOM
        //$(odo).remove();
        // Reset how the expenseUnits element behaves
        $(expenseUnits).prop('disabled', false);
        $(expenseUnits).prop("tabindex", "");

        console.groupEnd();
    }

    function toggleOdoIfNeeded(){
        console.group("toggleOdoIfNeeded");
        updateTotalKms();
        var sel = select[0];
        var selValue = sel.options[sel.selectedIndex].value;
        if (OdoCategories.indexOf(selValue) !== -1){
            // Show the fields
            if (!odo.is(":visible")){
                odo.show();
            }
            from.select();
        } else {
            // Hide the fields
            odo.hide();
        }
        console.groupEnd();
    }

    function stripMileageFromComment(){
        console.group("stripMileageFromComment");
        console.debug("Comment pre: " + $(editComment)[0].value);

        var old = $(editComment)[0].value;

        // See if mileage is in the comment
        var regex = new RegExp("(.*) \\[" + FromLabel + "(\\d+)" + SeparatorLabel + ToLabel + "(\\d+)\\] \= ");
        var parts = old.match(regex);
        console.debug(parts);

        if (parts != null && parts.length > 0){
            $(editComment)[0].value = parts[1];
            console.debug("Comment post: " + $(editComment)[0].value);

            from[0].value = parts[2];
            console.debug("From (read from comment): " + from[0].value);
            
            to[0].value = parts[3];
            console.debug("To (read from comment): " + to[0].value);
        }
        console.groupEnd();
    }

    function addMileageToComment(){
        console.group("addMileageToComment");

        var fromVal = from[0].value;
        console.debug(fromVal);

        var toVal = to[0].value
        console.debug(toVal);

        var mileage = total > 0 ? (" [" + FromLabel + from[0].value + SeparatorLabel + ToLabel + to[0].value +"] = ") : "";
        console.debug(mileage);

        $(editComment)[0].value += mileage;
        
        console.groupEnd();
    }

    function updateTotalKms(){
        console.group("updateTotalKms");
        // Only show value if the from-to-ranges makes sense
        total = parseInt(to[0].value) - parseInt(from[0].value);
        total = isNaN(total) ? "" : (total < 0 ? "" : total);
        $(expenseUnits)[0].value = total;
        console.groupEnd();
    }

    function injectFromToFields(){
        console.group("injectFromToFields");
        // Inject the fields
        if ($(editForm + " #extension_odo").length == 0){
            $(editAmount).prepend('<div id="extension_odo"><div><span >From km: </span><input id="extension_odo_from" type="text" size="10" style="width:65px"/></div><div><span>To km: </span><input id="extension_odo_to" type="text" size="10" style="width:65px"/></div></div>');
        }
        odo = $(editForm + " #extension_odo");
        from = $(editForm + " #extension_odo_from");
        to = $(editForm + " #extension_odo_to");
        $(expenseUnits).prop('disabled', true);
        $(expenseUnits).prop("tabindex", "-1");
        
        // Setup handler to update the calculations
        from.bind("change.update", updateTotalKms);
        to.bind("change.update", updateTotalKms);
        
        // Setup handler to add the from and to odometer settings to the comment-field
        $(editUpdate).bind("click.save", function(event){
            console.group("editUpdate.click");
            // Save
            var sel = select[0];
            var selValue = sel.options[sel.selectedIndex].value;
            if (OdoCategories.indexOf(selValue) !== -1){
                addMileageToComment();
            }
            // After having updated the fields necessary before saving the item we should destroy the form
            destroy();
            // When saving the dom-elements are removed. Need to rebind to get this working.
            var loader = editForm.split("-");
            loader.splice(-2, 2);
            loader.push("loading");
            setTimeout(function(){
                bindEditForms(editForm, loader.join("-"));
            }, 100);
            console.groupEnd();
        });

        // Setup handler to deal with when user cancels
        $(editCancel).bind("click.cancel", function(event){
            console.group("editCancel.click");

            destroy();
            console.groupEnd();
        });
        console.groupEnd();
    }

    init();
    console.groupEnd();
}

function bindEditForms(saveElm, loader){
    console.group("bindEditForms " + (saveElm || "") + " " + (loader || ""));

    if (saveElm){
        // Cleanup any remaining bindings - if any
        $("a.new_entry").unbind("click.edit");
        $("#user_expense_rows a.edit").unbind("click.edit");

        var l = $(loader);
        var s = $(saveElm);
        // Loader gone + form available
        if ((l.length == 0 || !l.is(":visible")) && s.length > 0){
            console.log("Waited " + timer + " ms for save to finish.")
            timer = 100;
        } else {
            timer += 100;
            var msg = "";
            if (l.length > 0) msg +="Loader still spinning.\n";
            if (s.length == 0) msg += "Form not available.\n";
            console.debug(msg);
            setTimeout(function() {
                bindEditForms(saveElm, loader);
            }, timer);
            console.groupEnd();
            return;
        }
    }

    // Form displayed (no rows from before)
    if ($("#add_expense_form").is(":visible")){
        console.group("New expense form is open, create Odometer");
        new Odometer();
        console.groupEnd();
    }
    // Add handler to later show the form if needed
    $("a.new_entry").bind("click.new", function(){
        console.group("User opens form to register new expense, create Odometer");
        new Odometer();
        console.groupEnd();
    });
    
    $("#user_expense_rows a.edit").bind("click.edit", function(elm){
        console.group("User opens form to register new expense, create Odometer");
        // Convert the hit element id to an id that gives us the form for the relevant row
        var row = $(this).closest("tr");
        rowId = row[0].id.split("-");
        rowId.splice(-1,1);
        new Odometer(rowId);
        console.groupEnd();
    });
    
    console.groupEnd();
}

$(document).ready(function (){
    bindEditForms();
});

console.info('Harvest Expense Odometer processed.');
