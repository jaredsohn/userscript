// ==UserScript==
// @name           Referrals comments for NeoBux
// @namespace      http://userscripts.org/users/173064
// @homepage       http://dobrin79.blogspot.com/
// @description    Add comment to each referral to help in your referral management.
// @include        http://www.neobux.com/c/rl/*
// @license        GNU General Public License v3.0
// @version        1.1.110112.0250
// ==/UserScript==

(function () {
    var
        defineComment = [
            "",
            "Define a comment for ",
            "Defina uma comentário para "
        ],
        iconGrey = "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAItSURBVHjajJK/S2NBEIC/3bdPo5JGxKApLAwIHlj4g0gQRITjGv+ia477Vw6uvVIsbCSCnYWIkBRaPCTwRCxe4iZvZ/eK3FtOLe4GBmaHmdn5ZkaFEAA+Pz4+fs3z/BMgSin+JSKil5eXcwN86Xa7vy4vL2siAsDfBZxzOOcwxmCMiX5rLZ1OJzFZln3vdrs1rTWzs7Pvf6HRaLC1tUWv1yPLMpIkASCEgDGm1E9PT62yLNFaE0J4oyLC4eEhu7u77O/vIyIfYoxSqlRKEUKIrSul8N4zmUy4u7sjTVNubm7eoP2ZHaYyKl4RYTweA9BqtajVapyennJ/f8/8/DwiEjEAjPeeoigYDodxYHNzc3Q6HXZ2dlhZWaHZbHJ7e0tZliilUErhnMNai7bW8vLygrU2Mu7t7dHv9ymKAoA8z6k2FELAe4+1dlqgYq74kiTh4uKCJElYX19HRLi+vo7JlUaEqqL3PjpHoxHtdhutNQ8PD/R6PbTWb2Iq21SPyuGco9FosLm5CcDV1RX1eh2lFEVRxE6994QQ0O/3OplM2NjYoF6v8/r6iveeo6MjxuNxTKrUez8tICJRnXMsLS1N2zOG1dVVzs7O4kBFBO99Fa+NiEynqXXkOz8/ZzAYkGUZ/X4fpRTGGKy1MaYoChYXF52x1qbPz88Mh8PIl+d5vLw0TT9coHOO7e1tDg4Ofpi1tbXBycmJzMzMeP5DREQ3m83R8fHxz4WFhW+/BwBJYH8I3iC4qAAAAABJRU5ErkJggg==",
        iconRed = "data: image/png;base64,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",
        version = "1.1.110112.0250";

    function createStyle(icon) {
        return "cursor: pointer; background: url('" +
                icon + "') no-repeat right;";
    }

    function createToolTipScript(userName, comment) {
        return "new mk_tt('info_" + userName + "', 'rm', unescape('" +
                escape(comment) + "'));";
    }

    function createEventListener(userName) {
        return function () {
            var 
                cell,
                comment,
                icon,
                newScript,
                oldScript;
            comment = window.prompt(defineComment[0] + userName + ":",
                    GM_getValue(userName, ""));
            if (comment !== null) {
                cell = document.getElementById("info_" + userName);
                newScript = document.createElement("script");
                if (cell.getElementsByTagName("script").length > 0) {
                    oldScript = cell.getElementsByTagName("script")[0];
                    cell.removeChild(oldScript);
                    if (oldScript.textContent.indexOf("mk_tt") > -1) {
                        newScript.textContent =
                                "jQuery(document.getElementById('info_" +
                                userName + "')).qtip('api').destroy();";
                    }
                }
                if (comment !== "") {
                    icon = iconRed;
                    GM_setValue(userName, comment);
                    newScript.textContent += createToolTipScript(
                            userName, comment);
                } else {
                    icon = iconGrey;
                    GM_deleteValue(userName);
                }
                cell.setAttribute("style", createStyle(icon));
                if (newScript.textContent) {
                    cell.appendChild(newScript);
                }
            }
        };
    }

    function insertScriptVersion() {
        var
            cell,
            span;
        cell = document.evaluate(
            "//body/div[1]/table[1]/tbody/tr[last()]/td",
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        span = document.createElement("span");
        span.innerHTML =
                "<a class='cinza' " +
                "href='http://userscripts.org/scripts/show/81157'><small>" +
                "<span style='color: #000000'>Referrals comments for NeoBux</span> " + version +
                "&nbsp;&nbsp;&nbsp;&nbsp;</small></a>";
        cell.appendChild(span);
    }

    return function () {
        var 
            cells,
            comment,
            i,
            icon,
            language,
            languageIndex,
            n,
            row,
            rows,
            script,
            table,
            userName,
            userNameCell,
            userNameColumn;
        insertScriptVersion();
        languageIndex = document.body.innerHTML.indexOf("c0 f-") + 5;
        if (languageIndex > 4) {
            language = document.body.innerHTML.substring(languageIndex,
                    languageIndex + 2).toUpperCase();
        } else {
            language = "US";
        }
        if (language === "PT") {
            defineComment[0] = defineComment[2];
        } else {
            defineComment[0] = defineComment[1];
        }
        if (document.location.toString().indexOf("ss3=1") > -1) {
            userNameColumn = 1;
        } else {
            userNameColumn = 3;
        }
        table = document.evaluate("//td[@class='bgt']/ancestor::tbody[1]",
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
        if (table === null) {
            return;
        }
        rows = table.rows
        n = rows.length;
        for (i = 0; i < n; i += 1) {
            if (rows[i].getAttribute("onmouseover") !== null) {
                userNameCell = rows[i].cells[userNameColumn];
                userName = userNameCell.textContent.replace(
                        /^\s*(\S*(\s+\S+)*)\s*$/, "$1");
                comment = GM_getValue(userName);
                if (comment !== undefined) {
                    icon = iconRed;
                } else {
                    icon = iconGrey;
                }
                table = document.createElement("table");
                table.setAttribute("width", "100%");
                table.setAttribute("cellspacing", "0");
                table.setAttribute("cellpadding", "0");
                row = document.createElement("tr");
                cells = [
                    document.createElement("td"),
                    document.createElement("td")
                ];
                cells[0].setAttribute("class", "f_r");
                cells[0].setAttribute("nowrap", "");
                cells[0].setAttribute("align", "left");
                cells[0].innerHTML = userName + "&nbsp;";
                cells[1].setAttribute("id", "info_" + userName);
                cells[1].setAttribute("class", "f_r");
                cells[1].setAttribute("nowrap", "");
                cells[1].setAttribute("align", "left");
                cells[1].setAttribute("style", createStyle(icon));
                cells[1].addEventListener("click",
                        createEventListener(userName), false);
                cells[1].innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                if (comment !== undefined) {
                    script = document.createElement("script");
                    script.textContent =
                            createToolTipScript(userName, comment);
                    cells[1].appendChild(script);
                }
                row.appendChild(cells[0]);
                row.appendChild(cells[1]);
                table.appendChild(row);
                userNameCell.textContent = "";
                userNameCell.appendChild(table);
            }
        }
    };
}())();
