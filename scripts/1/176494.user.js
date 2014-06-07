// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://www.immigration.govt.nz/WorkingHoliday/Application/Create.aspx?CountryId=*
// @copyright  2012+, You
// @include      https://www.immigration.govt.nz/WorkingHoliday/Application/Create.aspx?* 
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

var ApplyButton=$('input:image[alt="applyNow"]');
if(ApplyButton.length>0)
{
    var forms=$('form');
    setTimeout (function(){
        ApplyButton.trigger('click');
    },100);
    
}
else
{
    //alert("Oops");
    setTimeout (function(){
        location.reload();
    },1000);
}