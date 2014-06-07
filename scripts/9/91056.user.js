// ==UserScript==
// @name           DN-More-Comments-Per-Page
// @include        http://www.dn.se/*
// @namespace      http://userscripts.org/users/253805
// @description    Adds several more user defined values for comments per page
// ==/UserScript==

/*

This is a user-script for Swedish news site Dagens Nyheter: http://www.dn.se

This user-script adds several additional options to the drop-down box where you select how many comments per page you wish to see.
The values are user definable, and can be changed by modifying the initial array to the aditionalOptionValues variable.
The position in the array is not important for the values. They are inserted in to the drop-down box so they all come in ascending order.
At the end of the drop-down box, an option for showing all comments is automatically added.

Examples of how the aditionalOptionValues array may look like:
[15, 25, 30, 35]
[30, 50, 60, 70, 80, 90, 100]
[100, 30, 80, 50, 90, 70, 60]
[60, 300, 100, 500, 200, 400]

*/

(function($)
{
    var aditionalOptionValues = [60, 80, 100];
    var allOptionId = "pagesizeSelectAllOption";
    var commentTotal = 0;
    var selectedOption = "5";

    $(unsafeWindow.document).ready(function()
    {
        var commentWrapper = $("#article-comment-wrapper");
        if (commentWrapper.length > 0)
        {
            var strings = window.location.href.split('-');
            commentTotal = $("#article-comment-total").val();

            $("#pagesizeSelect").livequery(function()
            {
                var select = $("#pagesizeSelect").change(function()
                {
                    selectedOption = $("#pagesizeSelect option:selected").text();
                });

                for (i in aditionalOptionValues)
                {
                    var val = aditionalOptionValues[i];
                    var added = false;
                    var children = select.children().each(function()
                    {
                        var child = $(this);
                        var childVal = child.val();
                        if (childVal > val)
                        {
                            $("<option value='" + val + "'>" + val + "</option>").insertBefore(child);
                            added = true;
                            return false;
                        }
                    });
                    if (added == false)
                    {
                        select.append("<option value='" + val + "'>" + val + "</option>");
                    }
                }
                select.append("<option id='" + allOptionId + "' value='" + commentTotal + "'>Alla</option>");

                setTimeout(function()
                {
                    if ($("#pagesizeSelect option:selected").text() != selectedOption)
                    {
                        $("#pagesizeSelect option:selected").removeAttr("selected");
                        select.children().each(function()
                        {
                            var option = $(this);
                            if (option.text() == selectedOption)
                            {
                                option.attr("selected", "selected");
                                return false;
                            }
                        });
                    }
                }, 10);
            });

            setInterval(function()
            {
                var allOption = $("#" + allOptionId);
                if (allOption.length > 0)
                {
                    var newTotal = $("#article-comment-total").val();
                    if (isNaN(newTotal) == false && newTotal > commentTotal)
                    {
                        commentTotal = newTotal;
                        allOption.val(commentTotal);
                    }
                }
            }, 1000);
        }
    });
})(unsafeWindow.$);