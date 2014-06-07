// ==UserScript==
// @name           MSDN
// @namespace      msdn
// @include        http://msdn.microsoft.com/*/library/*
// ==/UserScript==

var tables = document.getElementsByClassName("members");
for (var i = 0; i < tables.length; i++)
{
    var table = tables[i];
    if (table.tagName == "TABLE")
    {
        for (var j = 0; j < table.rows.length; j++)
        {
            var row = table.rows[j];
            var data = row.getAttribute("data");
            if (data && (
                data.indexOf("inherited") != -1 ||
                data.indexOf("protected") != -1))
            {
                row.style.opacity = 0.2;
            }
        }
    }
}