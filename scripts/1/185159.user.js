// ==UserScript==
// @name       idel external script
// @namespace  http://www.zeerd.com/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2013+, zeerd
// @include	http://idle*.marrla.com/Item.aspx*
// ==/UserScript==

if (document.location.href.indexOf('marrla.com/Item.aspx') != -1){
    document.body.appendChild( document.createElement( 'script'));
    document.body.lastChild.innerHTML = 
    '\
		var ies_unlocked_item_count = 0;\n\
		function ies_check_items(p) \n\
		{ \n\
			$.ajax({\n\
				type: "get",\n\
				url: "GetEquipList.aspx",\n\
				data: { "type": \'\', "mc": 5, "p": p },\n\
				cache: false,\n\
				async:false,\n\
				success: function (data) {\n\
					for (var i = 1; i < data.length; i++) { \n\
                        if(data[i].status == "0"){\n\
                            ies_unlocked_item_count++;\n\
                        }\n\
					}\n\
					if(data.length > 1){\n\
						setTimeout(function(){\n\
							ies_check_items(p+1);}, 500);\n\
					}\n\
					else{\n\
					}\n\
			   },\n\
				error: function () { alert(\'error_ies_check_items\') },\n\
				dataType: "json"\n\
			});\n\
			return ies_unlocked_item_count;\n\
		} \n\
    window.ComfirmSaleAll = function (){\n\
		ies_unlocked_item_count = 0;\n\
		var found_unlock = ies_check_items(1);\n\
        if(found_unlock != 0){\n\
            if (confirm("有"+found_unlock+"件橙色装备未上锁，确认要出售全部未上锁的物品吗？")) {\n\
                window.location = "SaleAll.aspx";\n\
            }\n\
        }\n\
        else {\n\
            if (confirm("确认要出售全部未上锁的物品吗？")) {\n\
                window.location = "SaleAll.aspx";\n\
            }\n\
        }\n\
	}\n\
    ';
}