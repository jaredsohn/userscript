// ==UserScript==
// @name       MyFitnessPal - Fixed Protein (in grams)
// @namespace  http://www.kennynet.co.uk
// @version    0.5.1
// @description Modifies the food diary to fix your protein intake to a fixed amount of grams, shifting the excess into carbs.
// @match      http://www.myfitnesspal.com/food/diary/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @copyright  2012+, Kenny Millington
// ==/UserScript==

// YOU MUST SET YOUR PROTEIN GOAL HERE (IN GRAMS)
var proteinTarget = 146;

// --------------- DO NOT TOUCH BELOW THIS LINE --------------- \\

var $ = unsafeWindow.jQuery;
var mfpUsername = $('A.user-2').html();

// Abort the script if we're not looking at our own diary
if(location.href.indexOf(mfpUsername) == -1) {
    return;
}

// Indexes for carb/protein summary
var proteinIndex = 4;
var carbsIndex = 2;

// Collate required cells
var proteinTargetCell = $($('TR.total.alt TD').get(proteinIndex));
var proteinRemainCell = $($('TR.total.remaining TD').get(proteinIndex));
var carbsTargetCell = $($('TR.total.alt TD').get(carbsIndex));
var carbsRemainCell = $($('TR.total.remaining TD').get(carbsIndex));
var extrasCell = $('TFOOT TD.extra');

// Calculate protein delta
var oldProteinTarget = parseInt(proteinTargetCell.html());
var proteinDelta = oldProteinTarget - proteinTarget;

// Update protein/carb goal and remaining values
proteinRemainCell.html(parseInt(proteinRemainCell.html()) - proteinDelta);
proteinTargetCell.html(proteinTarget);
carbsTargetCell.html(parseInt(carbsTargetCell.html()) + proteinDelta);
carbsRemainCell.html(parseInt(carbsRemainCell.html()) + proteinDelta);

// Ensure positive values are green and negative values are red 
$('TR.total.remaining TD[class!=first]').each(function() {
    if(parseInt($(this).html()) < 0) {
        $(this).removeClass('positive').addClass('negative');
    } else {
        $(this).removeClass('negative').addClass('positive');    
    }
});

// If there is no extra cell (e.g. no exercise logged) - create it
var spacer = '<br />';
if(extrasCell.length < 1) {
    extrasCell = $('<td class="extra" colspan="7"></td>');
    var extrasRow = $('<tr><td class="first"></td></tr>');
    extrasRow.append(extrasCell);
    $('DIV.container TFOOT').append(extrasRow);
    spacer = '';
}

// Add a message indicating that we've moved protein goal to carbs and how much
var msg = '*' + proteinDelta + 'g of excess protein goal was moved to carbs';   
extrasCell.html(extrasCell.html() + spacer + msg);