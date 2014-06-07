// ==UserScript==
// @name       		EELab Pre Exam Fucker
// @namespace  		http://sdou.net/
// @version    		0.11
// @description  	We all know that.
// @require    		http://cdn.bootcss.com/jquery/2.1.0/jquery.min.js
// @include      	http://eelab.hitwh.edu.cn/xk/test.asp*
// @include			http://eelab.hitwh.edu.cn/xk/ykhTEST.asp*
// @copyright  		2012+, Shindo
// ==/UserScript==

function dispatchValue(val)
{
     if (val == "e7a70fa81a5935b7") // A
         return "A";
     else if (val == "fe57bcca61014095") // B
         return "B";
     else if (val == "0cad1d412f80b84d") // C
         return "C";
     else if (val == "f30e62bbd73d6df5") // D
         return "D";
     else 
         return "F";
}

$(document).ready(function() {
    if (location.href.indexOf("ykhTEST.asp") != -1)
    {
        document.getElementsByTagName("iframe")[0].height = document.body.scrollHeight;
        return;
    }
    
    $("input[type=hidden]").each(function() { 
    	if (this.name.indexOf("kg_answer") != -1) // that's what we want
        {
            var id = this.name.substring("kg_answer".length);
            var sel = dispatchValue(this.value);
            
            if (sel != "F") // WTF if 'F'?!
            {
                $("input[name=kg" + id + "]").each(function() {
                    if (this.value == sel) // that what's we deal with
                    {
                        $(this).parent().css("color", "green");
                        $(this).parent().css("font-weight", "bold");
                    }
                    else
                    {
                        $(this).parent().css("color", "red");
                    }
                });
            }
        }
    });
});