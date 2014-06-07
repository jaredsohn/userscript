// ==UserScript==
// @name       JustEat.dk Ingredient Filter
// @version    0.2
// @description  enter something useful
// @match      *just-eat.dk/*/menu
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

$('.redTop.style16Frame').parent().prepend("<div style='text-align:center;'>Include: <input id='filterIncludes' type='text'/> Exclude: <input id='filterExcludes' type='text'/> <a id='filterClear' href='javascript:return false;'>Clear</a></div>");

function filterUpdate(){
    include = $('#filterIncludes').val();
    exclude = $('#filterExcludes').val();
       
    $('#ctl00_ContentPlaceHolder1_divMenuCardContent tr, #ctl00_ContentPlaceHolder1_divMenuCardContentLegacy tr').css('display','none');
    $('.prdDe div').each(function(){
        ingredients = $(this).text();
        if( ( (ingredients.indexOf(include) != -1) || include == '' ) && ((ingredients.indexOf(exclude) <= -1) || exclude == '' )){
            $(this).parent().parent().css('display','table-row');
            if(!$(this).parent().parent().next().children().hasClass('prdDe')){
              $(this).parent().parent().next().css('display','table-row');
            }
            if(!$(this).parent().parent().next().next().children().hasClass('prdDe')){
              $(this).parent().parent().next().next().css('display','table-row');
            }
            $(this).parent().parent().parents('tr').css('display','table-row');
            $(this).parent().parent().parents('tr').prev().css('display','table-row');
            $(this).parent().parent().parents('tr').prev().prev().css('display','table-row');
        }
        if(!((ingredients.indexOf(exclude) <= -1) || exclude == '' )){
            $(this).parent().parent().css('display','none');
        }
    });
}

$('#filterClear').click(function(){
  $('#filterIncludes').val('');
  $('#filterExcludes').val('');
    $('#ctl00_ContentPlaceHolder1_divMenuCardContentLegacy tr').css('display','table-row');
});

$('#filterIncludes').change(function(){
  filterUpdate();
    
});
$('#filterExcludes').change(function(){
  filterUpdate();
});