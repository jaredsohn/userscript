    // ==UserScript==
    // @name           widen Bytes.com
    // @namespace      http://bytes.com/
    // @description    widen bytes.com's too narrow main table
    // @include        http://bytes.com/*
    // ==/UserScript==
     
    window.bytes_new_width = function()
    {
        // define new size
        var new_size = 1200;
     
        // get the main table and reset its width
        var tbl = document.getElementsByTagName('table');
        var l = tbl.length;
        for (var i=0; i<l; i++)
        {
            // there is only one table with a width
            // attribute of 635
            if (tbl[i].getAttribute("width") == 1026) 
            {
                tbl[i].setAttribute("width", new_size);
            }
        }
     
        // get the code blocks and widen them too
        var code_box = new_size - 100 + "px";
        var code = document.getElementsByClassName('codeContent');
        var k = code.length;
        for (var j=0; j<k; j++)
        {
            // set box size (enclosed in table)
            code[j].style.width = code_box;
        }
    }
     
    window.addEventListener("load", window.bytes_new_width, false);

