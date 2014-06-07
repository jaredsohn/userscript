// ==UserScript==
// @name        Currency Tomsk
// @namespace   http://bank.tomsk.ru/
// @include     http://banki.tomsk.ru/pages/41/
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require		http://jqueryjs.googlecode.com/svn-history/r6125/trunk/plugins/cookie/jquery.cookie.js
// @updateURL   http://userscripts.org/scripts/source/155089.meta.js
// @grant       none
// @version     1.6
// ==/UserScript==

(function () {
    function doProcess() {
        try {
            var panel = $("<div>" +
                "<div style='border-bottom: 2px solid red; font-weight: bold; color: black; font-size: 1.3em;'>" +
                "5 лучших курсов</div>" +
                "<table id='tbleMain'><tr><td style='width: 100%;'><select id='cboxFollowBank'></select></td><td><span style='color: yellow;' id='tbFollowBankRate'>--</span></td></tr></table>"+
                "</div>");
            panel.css({
                float:"left",
                border:"2px solid red",
                padding: "5px",
                width:"300px",
                height:"135px",
                position:"fixed",
                top:"5px",
                left:"20px",
                display:"block",
                "background-color":"#FF6A00",
                color: "white"
            });
            $("body").append(panel);

            $("#cboxFollowBank").change(function (){
                $("#tbFollowBankRate").text($(this).val());
                $.cookie("selected_bank_nm", $("#cboxFollowBank option:selected").text(), {
                    expires: 7
                });
            });

            var selectedBankName = $.cookie("selected_bank_nm");
            var banks = [];
            $("tr>.bank").each(function(){

                var ratio = $(this).next().text();
                var bankName = $(this).text();

                if (selectedBankName ==  bankName)
                    $("#tbFollowBankRate").text(ratio);
                $("#cboxFollowBank").append("<option "+ (selectedBankName ==  bankName ? "selected" : "")
                    +" value='"+ ratio +"'>"+ bankName +"</option>");

                banks.push({
                    bank: bankName,
                    href: $("a", $(this)).attr("href"),
                    ratio: parseFloat($(this).next().text().replace(",", ".")),
                    ratio_text: $(this).next().text()
                });
            });

            banks = banks.sort(function (item1, item2) {
                return item2.ratio - item1.ratio;
            });
            for (var i = 0; i < 5; i++) {
                if (!banks[i]) break;

                $("#tbleMain").append("<tr><td><a href='"+ banks[i].href +"' style='color: #7F0000;'>"
                    + banks[i].bank +"</a></td><td>"+ banks[i].ratio_text +"</td></tr>");
            }
        } catch (ex) {
            alert(ex.message);
        }
    }

    $(document).ready(doProcess);
})(jQuery);