// ==UserScript==
// @name			Saunalahti Webmail
// @namespace		_heisenberg_
// @version			0.1
// @description		Painikeriville käyttöä helpottavia/nopeuttavia buttoneita
// @include			https://webmail.saunalahti.fi/*
// @require			http://code.jquery.com/jquery-latest.min.js
// @require			https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @copyright		2012+, _heisenberg_
// ==/UserScript==

function App()
{
  app = this;
}

App.prototype =
{
    run : function()
    {
        // Siirry roskakoriin?
        if($.cookie('action') && !app.isTrashFolder())
        {
            // Siirry
            $("a[title='Roskakori']")[0].click();
        }
        else if($.cookie('action') && app.isTrashFolder())
        {
            var action = $.cookie("action");
            $.removeCookie("action");
            
            switch(action)
            {
                case "trash":
                    break;
                    
                case "destroy":
                    $("input[name='delete']").click();
                    break;
            }
        }
        else if($.cookie('returnLoc'))
        {
            var location = $.cookie('returnLoc');
            $.removeCookie('returnLoc');
            window.location.href = location;
        }
        // Painikkeen solu
        var td = $("table.txt2 td:nth-child(2)");
        // Sisältääkö solu jo poista-painikkeen?
        var hasDeleteButton = td.children("input[name='delete']").length != 0;
        // Jos solu ei sisällä poista-painiketta
        if(!hasDeleteButton)
        {
            td.append("| <img src='https://webmail.saunalahti.fi/wm2s/saunalahti/garbage_empty_16.gif' width='16' height='16' align='absmiddle'> <a href='#' data-action='trash'>Siirrä kaikki roskakoriin</a> | ");
            td.append("<img src='https://webmail.saunalahti.fi/wm2s/saunalahti/delete_24.gif' width='16' height='16' align='absmiddle'> <a href='#' data-action='destroy'>Siirrä kaikki roskakoriin ja tuhoa</a> |");
            td.children("a").click(function()
            {
                // Valitse kaikki sähköpostit
                $("td.checkbox input[type='checkbox']").attr("checked", "checked");
                
                var action = $(this).data("action");
                
                if(action == "destroy")
                {
                    $.cookie("action", $(this).data("action"));
                    $.cookie("returnLoc", window.location);
                }
                
                $("input[name='delete']").click();
            });
        }
    },
    
    getURLParam : function(name)
    {
        return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
	},
    
    isTrashFolder : function()
    {
        return app.getURLParam("folder") == "trash";
	}
};

var app = new App();
app.run();
