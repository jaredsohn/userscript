// ==UserScript==
// @name           WRTS Extra
// @namespace      nijtram1@userscripts
// @description    Uitbreidingsset op WRTS
// @include        *.wrts.nl/*
// @version        2.3.4
// ==/UserScript==
var isGM;
function setGM()
{
    typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
    if (typeof (unsafeWindow) == 'undefined') { unsafeWindow = window; }
    if (!isGM) { log = function (msg) { try { unsafeWindow.console.log(msg); } catch (e) { } }; } else { log = GM_log; }
    if (window.opera) log = opera.postError;
    setValue = isGM ? setValue : function (name, value) { return localStorage.setItem(name, value) };
    getValue = isGM ? getValue : function (name, def) { var s = localStorage.getItem(name); return s == null ? def : s };

}
setGM();
if (getValue('WRTS_message', '0') != '1') { alert("Dit script is op dit moment niet geheel werkend. Er wordt op dit moment aan een nieuwere versie gewerkt, maar het is niet zeker dat deze voor de uitkomst van de beta gerealiseerd kan worden"); setValue("WRTS_message", "1"); }
function updateCheck(forced) { if ((forced) || (parseInt(getValue('WRTS_last_update', '0')) + 86400000 <= (new Date().getTime()))) { try { GM_xmlhttpRequest({ method: 'GET', url: 'http://userscripts.org/scripts/source/64340.meta.js?' + new Date().getTime(), headers: { 'Cache-Control': 'no-cache' }, onload: function (resp) { var local_version, remote_version, rt, script_name; rt = resp.responseText; setValue('WRTS_last_update', new Date().getTime() + ''); remote_version = parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]); local_version = parseInt(getValue('WRTS_current_version', '-1')); if (local_version != -1) { script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; setValue('WRTS_target_script_name', script_name); if (remote_version > local_version) { GM_openInTab('http://userscripts.org/scripts/source/64340.user.js'); setValue('WRTS_current_version', remote_version); } else if (forced) alert('No update is available for "' + script_name + '."'); } else setValue('WRTS_current_version', remote_version + ''); } }); } catch (err) { if (forced) alert('An error occurred while checking for updates:\n' + err); } } } if (isGM) GM_registerMenuCommand('WRTS Extra - Manual Update Check', function () { updateCheck(true); }); updateCheck(false);
function contentEval(source) { if ('function' == typeof source) { source = '(' + source + ')();' } var script = document.createElement('script'); script.setAttribute("type", "application/javascript"); script.textContent = source; document.body.appendChild(script); if (false) document.body.removeChild(script); }
document.getElementsByClassName = function (cl) { var retnode = []; var myclass = new RegExp('\\b' + cl + '\\b'); var elem = this.getElementsByTagName('*'); for (var i = 0; i < elem.length; i++) { var classes = elem[i].className; if (myclass.test(classes)) retnode.push(elem[i]); } return retnode; };
document.getElementsByTagName("head")[0].innerHTML += "<style id='GMStyle'></style>";
function addStyle(text) { document.getElementById("GMStyle").innerHTML += text; }
var spacer = "data:image/gif,GIF89a%0F%00%0F%00%F7%00%00%EB%EB%EB%E0%E0%E0%DA%DA%DA%E7%E7%E7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0F%00%0F%00%00%08(%00%09%08%1CH%B0%A0%C1%83%08%13*%5C%08%60%E1%C0%01%0E%05B%8C8%D1a%C5%85%17%15fL%B8%11a%C7%88%20%09%06%04%00%3B";
var c = Array();
c[c.length] = ['Nieuwe lijst maken', "add", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAmFJREFUKM8t0stLFHEAB/Dv7zezo7Ozs+5Szc76Vky9BEKdFCMoiEoKAsW6RB0iuon9AXm26Fp0iQ5B2C3zYNFJpQhB7eHaId86+9557c7zNx3q8zd8CP6b/TgNgedo2ayqXuCpfhDEfBb6JOK0tJTSDqt59vLOOwAAAYAnnx4BQNILgrFU4sR4QmgZZlGUsD3bOqrtr5T1ylzEonnTsY039z+Am12cBiGkJQjDh9l01+OBtqGzqZQiNUtSTE6mJVlMDhoNfbRm6SFj7HtmVHF5jnLU8Z2rarpzaqB9SCn6BRQqeTDCQDkCrimGvo5BxWyYU8el/C4l5C0164YqivJE9mS3kvc0/K7kIHEyJk/fRRNEbOXXYUUGutQehfCYiBCp1Ak8VYzJIx71caDvIdvcjlapA7KQhEpb0S32oGwcISHFcSqRGbFcS6V+4AshC2XDN+BEDdzom8D5zosAgEv913D7zAMEYYCQ+eBoTHZ8V+ADxjzD0U3ebWpuBHW8/vkcvfF+XO6/js/b75Erb4ASAhIClmOaAQs9SsFpR7WD5YZlQ4SAX6VV7BibqDbKyJU28ENbRYuQQknXsV3cXSagGnfh1jnbqNdJ3bVHM4msJAkiivYxlnYWYbo61EQrYiyOL1vfCvla+anvh195FkUsZGyhXK10Ndy1qe5Mr6JKbQhDD4TwqOg6Vv4sFfaL+WeIsAACRgDg3qubsBw76freGCjGlWRmmKN8wnZta6e4t2LY9hyAeRAY6zO5f40AYPLFFRwWi1QQeNVy6qobODGfMZ+C09zQ0eJCnK3NbAIA/gIQ4TSF+ZC80AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0xMi0yMlQxNDoyMDo1NyswMTowMD0PGmYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDMtMTJUMjE6NDg6MTYrMDE6MDDJxkMxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="];
c[c.length] = [['Lijsten wissen', 'Wissen'], "remove", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAjtJREFUKM89kjtPFFEARr9757E7+2TZdRhDJKiJxhjRmGgBvQUQYwMx/gNBTAj+Dzr9ARZGaCygsLSAWEg0IQQjJMh7ssDszs7uPO7TQvH0pzk5BP84fDUHi1DaDdueFMxTnFuKKK5ypl/ob/hhcKIevv8EACAAcDT3GgAqQvDJ3EBjivT1jWqtSyrtdZPjg/Ve2FpWBCs863Uef/wMsj87C4MaVSnly/zw0Hxp5K5r2QCyGDpjSC4CnP/43mwHZ4tK8Hdd2QkpMQwqGBvPXxucrz564FrpBbKdTYjdLeB0DwXKUL9z23UcZ55LNk4opSaLep7j1qaLt4ZdGpyA7WxBxDGIFFAEgFaway5qQ8Nur3U2nUr9xZQq82itMmbpDNnxHnShAaNoQF0W4gzq9DcKNQ+5K+5Y6+CnZyopbC1lGVELlCVwZt6AFMqXClTYQrAwA7NUB3J2WfLMNqVWTHTakSgbeUQRoreL0Ib1X9JZClAKqQl4rxspLZipbNOPT47W8iXnmaPz4JvfIBMODQJoDQXAHrqJiEWImvtrMAyf2hJ+QtRScLDfTEsVGFevg1b6oE0bKFZgDd5AVi7hdHezmfB4idvEN2bv39NMZIcZi0UaBCO0v160qg0YxSrQX0dEOY5/bTTbvfNFRckHrVVKAGDjxVMwlVQkZ5OmVlO5xsAoMa2SSLvd8OxoPeXxsjbICgHpTKxu/90IAL4+f4IwDqhJqMdk4ukssyQkh236kiW+ZRfVxOo2AOAPbj4vRU8Vrr8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMDktMTItMjJUMTQ6MjA6NTkrMDE6MDBtMGE7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDA2LTAzLTEyVDIxOjUyOjEwKzAxOjAwfLo5AgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII="];
c[c.length] = ['Wrts Extra', "extra", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAeJJREFUKM9d0T9rVEEcheEzc2f27ibZLIIY4qawshDbgEXEoJY2AW1Ee8FGTOFHsPJTCAEFqyBIWtMkJOnsxJhAYsgSNsnuvTN35vfHQiw2p37e6hhc2Z/NRdhWOQ/BCqAbVIef/Yd7E8ZdjWC0MHCPYPEeLAbGHAJIE+R05wFUBBCBskCU5n179rMve0tpPPzRVOdPJPJvJYHwP2NdMQ1uas8pdoRSryg6zws3dc+5Nqwt71j4VyJ0jTl3hJNvdQVmsLt831j3WEUXIXrLtWYWnC+60gyh3EZT55Cqy0PNdCjMe5zSdzPYWf5YlDPPfKdXWhA0B3A8A4chlByAHpQtmCya6oJTrDZcDvWqZBaofdFqWSvhCJIiQAxpIjRfAsUN5MYgh3qdc3pjjTGnua7exeHgCzVG1XShJBBiKDMAD9Y2YnX+jZr41hhzYOeXtmAKd8IhrKVqfKI6DRUAYgE2UEyBYxhRjOtF2+/ffvkLFgD6y9sQkh5ES4jC2OuA68P4ORgtoCRtqvMMjZrJc4VkzsB2KQrSWAPF0T5EFwpbzkpuPIfUu/v6eDJSltkwPGMh+pqq0ZoQH0hDNy38CsX8lEIqVwF8mIx4sxlfbHGmXef9MdQADhgfnW6q4BNY9b/9Cw64NSTXJ0bjAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTIyVDE0OjIxOjAyKzAxOjAwyBVQmwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0xMi0yMlQxODoyMzoxNyswMTowMLmVrtgAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC"];
c[c.length] = ['Bekijken', "view", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAaxJREFUKM9lkLtuE2EQhb9/99+1nY1jhCJyITQUFEgpeAIaJBreAQnxIjwFT4IoKFMgQUWLQCghIoQQy8FxFntn5lAkjkCMdDTNnDmX9OzFq5279+/tTOcqCBHuuBsRQbgT4bg5VTK1vybf373/cpA379x+2evVjyipkFAEoUAhpEAS4UFZhKoy7e3uxvPcG649WTikBKREKjIF/09Kidls/rAZNpt5NCh5/GCdlKBQENK/1xICyqLg9duJ9vYX5KZORH8FE2zMDzk7PyeWNq/g7mxvbbI2KGnnHdk9uFGLINErGoapvMwRl3kk4e7U/QFuY9yMLAW/HVzQ6xa0bXtNWhLdndWmQQrCnKwIZgvoBP32gul0irtfQxJmxupqc/XAyGbG+gBCYiWvUeT6WuHvPRqNMBvTdUZOCo7bRBdwazbm5HSMu2O2VArMnVxAASnMyd+Oz45O9g+3kBirh2IDRaAkVF4WoUJ8ODD2jyY/67ps88fPR0+/nl5sh3kyc9wM7zo8gghHFoSccFHl8sfNYf9TrqryTdOvCCtwL3BLWJWu2luSgvBAAg/xB589W6VuRioZAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTIyVDE0OjIwOjU3KzAxOjAwPQ8aZgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwNi0wMy0xMlQyMTo0ODo0MCswMTowMOL2eG8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC"];
c[c.length] = ['Bewerken', "edit", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAdRJREFUKM91kU1rE1EUhp87M4bJRxtiEUMRLV1oRRd1FYqIZKEbFyoUN9noj9Ct/gv3gboSBKmaRUXRKkRbqraJDcSWmkJKMGJM0kwmd+5xkU5tBd/1+3Cec44CIrlc7kImkzmnlLI4EKUUvV5vUFh4t7RQeFIqPbqN/r2GAiKFQuFuNpu9LyKWUgoRQUQwxmBM4C+9mntm1RZfpxJBx+yWVhxA2bYdAY4YYwAQEbTW+L6Pa75Hp455s/bxq7Nad2iU+2+cUMOy/poZY7BtC+VV0d4KsUQc0RFGUqdpj25OO2ExhJRSKKXQnSqOv4o7GiVQX2lt9tj+7O14fnDPCXVCABH6v9YJ2h9xEzbSX8YM+jhWnFpz9/GDh/NPHf5Ju1Gm23jPWNoBfw3d9WhvucQmrmH3vZ/F6px3CPqx9YlWbRFFi0R8BzUI6NZc3FM3iU1ewtp+O1zlwFPY+PKCo8k0+tsq5ecf2FjuEDl5g9jEzFCd4Rr7kxSwXqnituoko2PopkfqzC1GJi+iLGcP4jAkwImpyzQ7dRLjac7OTJMcP49l24gI4dNDSIwxAzEmuHL9DgKIDC8qJtgviogYY3xAHIB8Pv+yUqnU9yz/F1MsFssAfwBM0eIZiclgzwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0xMi0yMlQxNDoyMTowMSswMTowMPn9SgYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDMtMTJUMjE6NTU6MzQrMDE6MDAoDAEVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="];
c[c.length] = ['Overhoren', "test", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAlFJREFUKM8t0j1PE2EAB/D/PffSF64vAr0eUyHGECM6alJ2B8LiACROLg6O/QLuTiQO+h0gcRGZNDgAIQRSVDRIFWxS4Gi5a+96veeee3keB/19hp+E/7ZOAkwUc+R6wEwIYXLB1STlcZRwa6pStNqdLl+pVwEAEgB8PPahanKRp2KxnCdLnIs651wXEH7Kxe6lw9YBseG4gff8cQ3Su4MBijm1xDl/Ma6ThkZSw3IovCBCLiPDKOXgM95t9+hqEqdvzy5slygyIZTFC8UcGjyNjP3WDYZhjFp1DBwCh2c3kERiTOpyww/ZgiwTQhx3ZBayYlmVUmP/1IbtMdRnJ1Cr5PHozjiE4Gie29CzxJjQlWUviExCWWxGUTJ/5QS4tEfwKcOXcxsnnQEEF5iu5NDpeeh5AaI4macsMok/CrWQxQWPRhixED3Xx7e2jRlDx/e2g8PTLoajEMNRiDCKC64faoo7pBFlmWFWJVlZkiA4x82A4v3eOVqdPvoeRUaToSkEjhcOPZ9GxBkG1sCnO8WsgqlSFmmcophT8HC2itKYiiRNUC1nkddk9F2643iBpUiEWEet3locJ/W5WtlgEUPfC7DV/APXDzFt6JibMXDU6nX3flytxUlqKUSS+CiMNneOL2s+ZY17tXFjSBkCyvCgXEFeU9H81e1uf71YFUJsyjLhEgA8e/UJthcUU84X79ZuLWVVuc6F0FMufD9guwc/r9eFEBsZTfW2X6/8awQAT15+wOfmbzJZLpgKkcw0/XePRrHl+aF1/3aV7715CgD4C7sVYfpsMb5zAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTEyLTIyVDE0OjIxOjAwKzAxOjAwX4pBsgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwNi0wMy0xMlQyMTo1MzozOCswMTowMOKyGyYAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC"];
c[c.length] = ['Printen', "print", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAj1JREFUKM81y8tLVFEAwOHfOffMDDPX0UYFmxxRpKzoTbWocKFJ4C6EciEUBP4FRYsWmSBCrdu3yU0tpE0QFIEQ2WMXQqlDM4bNaDoPH3fu3HPvOW3q23+Cf649Whg93td2Lx6Tg9biCCFCPwhluWJexaPk9JZf+/bm4SUA1P/kxOXw9QsHh450Z0QQGowhLqVhYdUb+7JU7Vlf8SaAVQA1PT2NJGJRShwpRd13aGhBMzRk05Kho2lB4J35XlA3x2+MzQahRU5NTVGrVBLS6qQFlATlCGKOoFQ3bO2G9LYnElLq3Ea5nJifn0fNzMzkUonYg12qE9KJEVeSCBDCITQSjUXGEmTC9Ym2gQEynV2zynXdu6dPnZiUf5T6lV/C30qjI4sxlsBYBLDveVw81t2aOzky+fbde61c17119tx5lVr+Qbm8Qbizg8DiAEkABAQNrhzuor9/RC2v5O8oIUQmnU6TTrfS3t6BUoooihBCYK3FcRyCIKDZbNLR0UE8Hm9R+/v7olAoUCgUyGQyAGitEUIAEIvFiKKI7e1tkskk+Xwetbe3R7FYpFKpoLUmikKazYAwDNFaY4xBSkkURbiuS6lUQvm+j+/7mCikUCySTLUQao3v+3ieh+d5bG6WyR3Kks1maTQaqFqt9uHT4seBRqqnc3T4qujLdmIsGGsx1iIErBZ/82zupV2ee75VrVa/qnq9fnut+LOtbXDw/sKaGP9cqmGtxViw1oKwhCaF6r384vXjp09aD7Rv/gV0JRQEnNOLDQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0xMi0yMlQxNDoyMTowMSswMTowMPn9SgYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDMtMTJUMjE6NTY6MzArMDE6MDA3dJ4FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="];
c[c.length] = ['Downloaden', "down", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAQAAADY4iz3AAAABGdBTUEAAK/INwWK6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAANAAAADQAc4tCaAAABN0lEQVQY003QvUrDUADF8XOTVA1osSClIoLgKi6K0tFBqBSLD1FwcdDFQR9BcBGK1KUOTkUnQWoQFEXpK0Qqtoq1ph8m6b29bW5uXKr2rL/p/AkGdoZpYs71uP1m8zrUf7iCrpTXxVFnRcaUiFPRfuEYw6SUFNtM8ie0W2lZ7lMWQ+R5VWyxNr9w8+WeGkdYA4ATjCnNhNhjH7zQKHV3CaFR6RAgB12tJ8UOrfLbxhdPUkLH/aw0yDkCpZoSaVbh93XKUzREo37m5dIMNKF8bnibXq611F5jgkkW8w+pMRmYUGojbIEXvTzL8lf3m074B/GCLu8AaLLnWN0pd9Sqea6Ylxnv5hEGAEBNSMtls/ZiJ+HP+KfM0IPr/lMC7MMMe8vdsFeMvFfx8FdHA5oIOcIACKwBAH4Ap2mfsWT/CKYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMDktMTItMjJUMTQ6MjA6NTgrMDE6MDDLR2qPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDA2LTAzLTEyVDIxOjQ4OjU2KzAxOjAwTYxNywAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII="];
c[c.length] = ['', 'share', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAQAAADY4iz3AAAABGdBTUEAAK/INwWK6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAANAAAADQAc4tCaAAABDUlEQVQY053Qv0oCcQAH8O/vfnppcenpWaacYTRYV0EJ5Vgg9Ai9QA/Q0hwtbc0tEc3NDkW0NGRBBZJE0HJcGpV6Qlec9/vT9Q5+HuEDDIMAZVQwjRTacJHBJHp4wy0eENHQo3IN26RA6uEJ2VKqcP6Ou3eajDBlrmIelpehktVgfXbGyI0FfsnavarTtG7trCw8n9WKWX2q4Gi1jn9qWP1E+0aJqiJjP740foUHFz488dn0nrgRVSmVaTNZLW3k813lnVNlftRc7OjOuX1NByJrixwvhj/yPjiIgcc/eOuyf/TqEmAfF+qEOg4iG8HSCOg3vtgm2wMFBkjIFNMYFfEwKWKMMCGbaA3VBPwDLdVmCWOByWIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMDktMTItMjJUMTQ6MjE6MDArMDE6MDBfikGyAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDA2LTAzLTEyVDIxOjU0OjE0KzAxOjAwhettVgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII="];
c[c.length] = ['', 'dopredef', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAoJJREFUKM8FwcFr21YAB+Dfk56fI9kvkSLFTgYhGyTtZSW0l7KNHnpKu7CRQ6+hOfY4GGSXjV567SG0h/4J3SG0uBRGRgdjLGtDoFXcseDFKbHsJZYWx7YsyU96lvt9BAAcx0G9XgfnHJzzaUrpA1VVv+z3+7u9Xu9Hz/M6W1tb2NzcxPr6Osj+/j4opdNZlq1KKakQwikWiy9t2y7X6/X22dnZKoDlNE0lgJe1Wq1DAfBcLndvYmLihyRJmBDiFyEEj6KIZFnGGWM/2bZ9K8uypNFozAN4RAFoYRheURSlqCiKMjU1tQYAQggYhlHQdX0tn8/DdV12fHx8ZTAYaDRNUy6EeJHL5a4RQi7FcQzP84J+v9+17RnDNEweDiLEcXyUJMkL0zQ52dvbq6mqOkkIMQGwZrMZVKvVh8PhsDJTsr+1PmPf6xNFrqWlxPPbF67r9hVCyJJlWeXxeMyklJCp7HLNfN6d332rMvL8defn7q7/FN6ozq4uXytLKZfI9vZ2DcCkZVmmruusG3nxr63Hr4fjXmckqWny8hfW5Jx2dHqISf/ywH8fn1Lf92+rqnrdMIz7Uo4ujUiiFfTizc9LX0FIAaKoSEcSs9YC3vy/k+tMR1vUNM2AEPKNpmmLhBD0en2MQEBVDYMkhkgjxEkEnRmYnVnIu9Gfd2gQBHGhUKi2Wq2v22dt1hj8s3P+SWM1I6qaZBI8Pw2dcdT9f1E9eV85v4i+owACx3GehGHohmFE6VxYLQ2WbxjMMg4OD2Kn+Go8P7vInJN3z5p+e5NSnKiVSgUrKyvxxsbGwe+//fGurH06RE8vBU3JolPs/J37q9QMWh/+617c1Shtug8zfARExz+Db4oHSQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0xMi0yMlQxNDoyMDo1OSswMTowMG0wYTsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDMtMTJUMjE6NTE6MDYrMDE6MDA497elAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="];
c[c.length] = ['', 'setpredef', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAm1JREFUKM8Fwc9P01AAB/Dve+26rtsbLS0/MjUm6LwYAtGDhpPZyYSIeODI3bsJxkRP7OqBePHPEBDjWQhZyIg2C/6YbjHdxnCBsbV7615bOj8fAgC2baNWq4ExBsbYpCzLRUmSllzXPez3+687nU53a2sLGxsbWF9fBymXy5BleTKO4+UoimQhhJ3JZPYsy5qp1Wr/zs7OlgEshGEYAdirVqtdGQBLJBLPVVV9GQSBIoT4LIRgw+GQxHHMFEV5Y1nW4ziOA8dxbgB4JwNIcc7nKaUZSimdmJhYBQAhBHRdT2uatppMJtFoNJR6vT4/GAxSchiGTAixm0gk7hFC7vi+j06n47mu27MsS9d1nXmeB9/3/wRBsGsYBiNHR0dVSZKyhBADgNJsNr1KpfJ2NBrtTE9Pr+Tz+ReMMdbv94Pz8/PLRqPhUkJI3jTNmfF4rERRhDAMe5qmbafT6a/JZHKbD3gvDEKoqqosLCzORFGUlx3H+e04TtY0TUPTNMU0Td3zvKej0YiMhL9yEbb0eusbuO8isMfBafOyLRUKhU9CiBNd1xcppaaiKMlUKnWfUvrMT1wWeLrB5m5dg25l8P1iH3/dXyXZMAyPEPIklUrdBoBerwdVVVkud42d/DjA3NwU7t58ABor4FFXard3HlHP8/yrq6tKq9UaHB8fj0ql0odqtcolStH1zuEO+0AsI6uasDI5UCKpMgDPtu33nPMG51zOZrP27OzsQ9/3tcAbh+Wf+1IiSaQpdh1fTj7GXAwOCQBsbm5ibW0NxWIRuVxucjweF8MwXOr0T8tto6ylM9qKRCWVi8HB0B+++g9BcTlX7mTZSgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0xMi0yMlQxNDoyMDo1OCswMTowMMtHao8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDMtMTJUMjE6NTE6MDQrMDE6MDCvaKaMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="];
c[c.length] = ['', 'editpredef', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAoNJREFUKM8FwU1o01AAB/B/8l7SNm2aZMnwY0xEa1FERUVk3lRk6hB21MMOXkRhCF7mxa+DVw/Di3fx4EV0OpSxgwd1CFXonKB1rZqua03t3JKlyctrUn8/AQDK5TKq1SpUVYWqqgOU0vuEkBOu637Y2Ni45TjO2vT0NKampjAxMQGhVCqBUjqQJMlYr9ejjLFyLpebtSxrS7Va/dNqtcYAHOKc9wDMViqVNQpAlSTpajqdvhlFkcwYe8MYU7vdrpAkiSrL8m3Lss4mSRLZtj0MCA8pgIzv+wdEUcyJoihqmjYOAIwx6LqeVZTseEomaKzY6fqvykiq13pMOecqY+ylJElHBEEoBkEAx3E813XXLWtQM/JEFf+WhQICDO/1T/LO8iQlhLxWVTXf7/eNfr+PdrvtLS0tPegG0Yudbu3S0H5pcpuWVTI7DoLIUnb5XXiDCoKwxzRNdDodxHEMzvl6KqM+v3b4es03rsj69qOCwDxsri6gH2uo/ZMlatv2D9u286ZpGoqiyKZpaqFXv+jlr8iDw8cui8TJJLGNOOTJ+4//3Plaqk3b7fY5QshxXdfv8l6vSMHU4tbwuj50lBDipOJgGd1mCrVquPqtI91zPP5WNAzD0zTtQiaTKYBvQvQWBcugSirdSSXhT7h1CX9aJlbzp4dWo4EzOSXjUc/zgmw2+6XRaJzHWil/ZN9O+L9KsNt1CDDjVjX88IkNHw9iJ4yiaLHZbAYUgFculx/5frdeUL7eOXVwd4HGQGXBwY9N5jlh9s7nZmlXEHQ553yWUuqRmZkZjI6OBqdHiovzr56OhWuNApVo76uD1qem8uy7bzwZzAkLtd8ri7quB3Nzc/gPellCuACwIFIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMDktMTItMjJUMTQ6MjA6NTgrMDE6MDDLR2qPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDA2LTAzLTEyVDIxOjUxOjA0KzAxOjAwr2imjAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII="];
c[c.length] = ['Mijn woordenlijsten', 'list', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAADQAAAA0AHOLQmgAAAX1JREFUKM+FkU9LlFEUh5975jqvZk4IJSqkFENBJLUNWrRy6TcIVFq4j/oiLQqClu2mbYv2EUUIjgxDRZbOaBsHR9/p/nvvfVsMBIEzHfitDg+H53fU+vOf1OczRMG3X45XW8v8b7TxabKI5V0RtAl8fvrksUFVKIoC7z3OObz3GGOIMdJoNNC3r04tXanpZ6LIJIWHp/vMAmuAnHPkNfBRD1w0M0F+iCIbeHLgFHgHqHOgQwD96fvv7r369KbWSjWPyG9BAvbGOl2sVrQvuDawsXLSM61ut+NCUWKtxRjzT0IIQ+jGQnX58oy8cIXKbi7Kut2jBqyOcHoDbOt+HvyEcBxCWc3z6DQcA60R0AmAft8+O7hzfXqj9KX6sG1694UItMc6hY6t9C5NzCpRkqWy39zdiSGCtRZrLc65v79KKQ2h+kptaXGu+lIplZHco06LKeDBiMrfArs6pjLFhBMFZSICHuiPcAoA+kvz7IAVtkSUfG3H/QvDxc44pz9qO79t+a8ikgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0xMi0yMlQxNDoyMTowMiswMTowMMgVUJsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDMtMTJUMjE6NTg6MzgrMDE6MDAaUuDRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="];
c[c.length] = ['', 'tags', "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%DCIDAT8%CB%85%93%D9%8A%1AA%14%86%EB%25%E66%C1%B7%10%9A%3C%5D%20d%92L.3C%12%F2%00%AE(%EE((*n%D3%3Dn%3D.%88%98%8E%A2%C6%DC5%A9fl%7B%FE%D4)%B1%1Dq%C9%C5%B9%A9%3A%FF%F7%FF%A7%FA4%D3u%1D%DDn%17%EDv%1B%ADV%0B%CDf%13%9A%A6AUU4%1A%8D%2B%00%ECR%B1N%A7%03%C7q%8Ej%3A%9DJH%B5Z%BD%08a%E4L%02%C30%A4%F3d2q!t%26R%A0T*%9D%850%8AL%CD%E4F%07%F5z%5D5M%13%B6m%CBs%02V*%15%E4%F3%F9%93%10F%AE%BBF!~%12%91%0D%CB%B2%B00m%E4~m%93%8C%C7c%14%8BE%E4r%B9%23%08%23%E7%5D%E4%CDf%03%12%FF%FE%EB%E0%C3%C33%DE%DE%03Yc%7B7%1A%8D(%05%D2%E9%F4%01%84%89%19%F9j%B5%92M%EB%F5%1As%E1%7C%AD%3D%E3K%17%F8%AA%03%1F%1F%F6%90%E1pH)%10%8F%C7%5D%08%AB%D5jo%C4%8C%7C%B9%5C%CA%A6%CE%CA%96%CEw%02%F0%A3%07%7C%7B%3C%84%0C%06%03J%81H%24%22!%92R.%97%151%23_%2C%16%B2%E9%F1%8F%8D%F7%AA%83%3B%7D%0F%B9%D6%80%CC%CF-%A4%D7%EBQ%0A%84B%A1%2Bw%96B%A1%A0%88%19%F9%7C%3E%3F%82%7C%17%80%CFM%E0%E6%DE%82%BD%D9%A6H%26%93%08%04%02%AF%0F%5ET%CC%A7d%B3Y%3E%9B%CD%5C%C8%3B%01%F9%24F%B8m%ADaZO%2F%C5%1Ew%84%97%95%C9d%94T*%C5i%13%09%A2%0B%C8m%DB%81e%EF%9D%FD~%BF%C7%7D%C4S%CB%91H%24%94X%2C%C6i%13w%9F%98%C4%E2%FC%40%7C%16%40%15%8DF%BD%E2%A59-X%BF%DF%3F)%BE%08%A0%0A%87%C3%DE%600%C8I%EC%F3%F9%3C'W%F9%7F%BF%ABp%F5%0A%F1%ABs%F7%FF%00Z%CC%3A%EC%B4%F4%7B)%00%00%00%00IEND%AEB%60%82"];
Array.prototype.search = function (s)
{
    for (var i = 0; i < this.length; i++)
    {
        if (this[i].constructor == Array)
        {
            if (this[i].search(s))
            {
                return this[i];
                break;
            }
        }
        else
        {
            if (this[i] == s)
            {
                return true;
                break;
            }
        }
    }
    return false;
}
document.getElementsByTagName('head')[0].innerHTML += "<style id='tagstyle'>.maximize { display: none; }</style>";
var links = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++)
{
    link = links.snapshotItem(i);
    if (link.parentNode.className == "command")
        continue;
    hit = c.search(link.innerHTML);
    if (link.innerHTML == "Mijn woordenlijsten")
        link.className += " " + hit[1];
    else if (hit)
    {
        link.parentNode.className += " " + hit[1];
        if (link.innerHTML == "Wrts Extra")
        {
            link.parentNode.parentNode.innerHTML = "<li class='tags'><a id='tags'>Uitklappen</a></li>" + link.parentNode.parentNode.innerHTML;
            document.getElementById('tags').addEventListener('click', function ()
            {
                if (this.innerHTML == "Uitklappen")
                {
                    this.innerHTML = "Inklappen";
                    document.getElementById('tagstyle').innerHTML = ".minimize { display: none; }";
                } else
                {
                    this.innerHTML = "Uitklappen";
                    document.getElementById('tagstyle').innerHTML = ".maximize { display: none; }";
                }
            }, false);
        }
    }
}
for (i = 0; i < c.length; i++)
{
    if (c[i][2])
        addStyle('.' + c[i][1] + '{ background: transparent url("' + c[i][2] + '") no-repeat scroll 0 2px !important; }');
}
addStyle(".hide { display: none }");
var td, id;
td = document.getElementsByTagName('td');
for (i = 0; i < td.length; i++)
{
    if (td[i].className == "command")
    {
        id = td[i].firstChild.href.match(/[0-9]+/);
        var innerHTML = "<div class='maximize'><a class=\"view\" href=\"/lijst/show/" + id + "\">Bekijken</a> <br /> <a class=\"edit\" href=\"/lijst/edit/" + id + "\">Bewerken</a> <br /> <a class=\"share\" href=\"/lijst/delen/" + id + "\">Delen</a> <br /> <a class=\"test\" href=\"/overhoor/start/" + id + "\">Overhoren</a> <br /> <a class=\"remove\" href=\"/lijst/delete/" + id + "\">Wissen</a> <br /> ";
        if (getValue("WRTS_predef_" + id, false))
        {
            innerHTML += "<a class=\"dopredef\" href=\"/overhoor/start/" + id + "?dopredef\">Start opgeslagen</a><br />" +
				"<a class=\"editpredef\" href=\"/overhoor/start/" + id + "?editpredef\">Bewerk opgeslagen</a></div>" +
				"<div class='minimize'><a class=\"view\" href=\"/lijst/show/" + id + "\" alt='Bekijken'><img src='" + spacer + "' /></a><a class=\"edit\" href=\"/lijst/edit/" + id + "\" alt='Bewerken'><img src='" + spacer + "' /></a><a class=\"share\" href=\"/lijst/delen/" + id + "\" alt='Delen'><img src='" + spacer + "' /></a><a class=\"test\" href=\"/overhoor/start/" + id + "\" alt='Overhoren'><img src='" + spacer + "' /></a><a class=\"remove\" href=\"/lijst/delete/" + id + "\" alt='Verwijderen'><img src='" + spacer + "' /></a><a class=\"dopredef\" href=\"/overhoor/start/" + id + "?dopredef\" alt='Start opgeslagen'><img src='" + spacer + "' /></a><a class=\"editpredef\" href=\"/overhoor/start/" + id + "?editpredef\" alt='Bewerk opgeslagen'><img src='" + spacer + "' /></a></div>";
        }
        else
            innerHTML += "<a class=\"setpredef\" href=\"/overhoor/start/" + id + "?setpredef\">Maak opgeslagen</a></div>" +
				"<div class='minimize'><a class=\"view\" href=\"/lijst/show/" + id + "\" alt='Bekijken'><img src='" + spacer + "' /></a><a class=\"edit\" href=\"/lijst/edit/" + id + "\" alt='Bewerken'><img src='" + spacer + "' /></a><a class=\"share\" href=\"/lijst/delen/" + id + "\" alt='Delen'><img src='" + spacer + "' /></a><a class=\"test\" href=\"/overhoor/start/" + id + "\" alt='Overhoren'><img src='" + spacer + "' /></a><a class=\"remove\" href=\"/lijst/delete/" + id + "\" alt='Verwijderen'><img src='" + spacer + "' /></a><a class=\"setpredef\" href=\"/overhoor/start/" + id + "?setpredef\" alt='Maak opgeslagen'><img src='" + spacer + "' /></a>";
        td[i].innerHTML = innerHTML;
    }
}
var ul, id;
ul = document.getElementsByTagName('ul');
for (i = 0; i < ul.length; i++)
{
    if (ul[i].className == "submenu")
    {
        if ((document.location.href.indexOf("lijst/") != -1) || (document.location.href.indexOf("/overhoor") != -1))
        {
            id = document.location.href.match(/[0-9]+/);
            if (getValue("WRTS_predef_" + id, false))
            {
                ul[i].innerHTML += "<li class=\"dopredef\"><a href=\"/overhoor/start/" + id + "?dopredef\">Start opgeslagen</a></li>";
                ul[i].innerHTML += "<li class=\"editpredef\"><a href=\"/overhoor/start/" + id + "?editpredef\">Bewerk opgeslagen</a></li>";
            }
            else
                ul[i].innerHTML += "<li class=\"setpredef\"><a href=\"/overhoor/start/" + id + "?setpredef\">Maak opgeslagen</a></li>";
        }
    }
}
var es = Array();
if (document.location.href.indexOf("?dopredef") != -1)
{
    var li, id;
    li = document.getElementsByTagName('li');
    for (i = 0; i < li.length; i++)
    {
        if (li[i].className.indexOf("actief") != -1)
        {
            li[i].className = "test";
        }
        if (li[i].className.indexOf("dopredef") != -1)
        {
            li[i].className = "actief dopredef";
        }
    }
    var id = document.location.href.match(/[0-9]+/);
    var formvars = getValue("WRTS_predef_" + id, null);
    if (!formvars) document.location.href = "http://www.wrts.nl/overhoor/start/" + id + "?setpredef";
    formvars = formvars.split('&');
    var e = document.getElementById('startOverhorenFormulier');
    for (var x in formvars)
    {
        var say = formvars[x].split('=');
        if (say[1] != "Y")
            e.innerHTML += '<input type="hidden" name="' + say[0] + '" value="' + say[1] + '"/>';
        else
            e.innerHTML += '<input style="display:none;" type="checkbox" name="' + say[0] + '" value="Y" checked="checked" />';
    }
    e.submit();
}
function removeTag(n, i)
{
    var el = document.getElementById(n + i);
    el.parentNode.removeChild(el);
}
function markTag(n)
{
    var el = document.getElementsByTagName(n);
    for (i in el) el[i].id = n + i;
}
if (document.location.href.indexOf("?setpredef") != -1)
{
    var li, id;
    li = document.getElementsByTagName('li');
    for (i = 0; i < li.length; i++)
    {
        if (li[i].className.indexOf("actief") != -1)
        {
            li[i].className = "test";
        }
        if (li[i].className.indexOf("setpredef") != -1)
        {
            li[i].className = "actief setpredef";
        }
    }
    id = document.location.href.match(/[0-9]+/);
    addStyle('.ask { background-color: rgb(255, 185, 172); }');
    document.getElementById('startOverhorenFormulier').action = "/overhoor/set/" + id;
    document.getElementById('startOverhorenFormulier').method = "get";
    document.getElementById('overhoortype_geen').parentNode.parentNode.innerHTML += "<br/><strong>Vraag:</strong><font class='ask'><br/><label for='overhoortype_ask'><span style='padding-left: 44px;'></span><input type='radio' id='overhoortype_ask' value='ask' name='overhoortype' />Vraag <span class='toelichting'>" + unescape("%26%238594%3B") + " vraag iedere keer voor de overhoring</span></label><br/></font>";
    document.getElementById('volgorde_ab').parentNode.innerHTML += '<font class="ask"><br/><input type="radio" id="volgorde_ask" value="ask" name="volgorde"/> <label class="ask" for="volgorde_ask">Vraag<span class="volgorde"></span> <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font>';
    document.getElementById('niveau_goed').parentNode.innerHTML += '<font class="ask"><br/><input type="radio" id="niveau_ask" value="ask" name="niveau"/> <label for="niveau_ask">Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font>';
    var e = document.getElementById('hoofdlettergevoelig_f').parentNode;
    e.className = "overhoortypes";
    e.innerHTML = '<strong>Hoofdletters zijn belangrijk</strong><br/>';
    e.innerHTML += '<label for="hoofdlettergevoelig_Y"><input style="margin-left: 45px;" type="radio" id="hoofdlettergevoelig_Y" value="Y" name="hoofdlettergevoelig"/> Ja </label><br/>';
    e.innerHTML += '<label for="hoofdlettergevoelig_N"><input style="margin-left: 45px;" type="radio" id="hoofdlettergevoelig_N" value="N" name="hoofdlettergevoelig" checked="checked"/> Nee </label><br/>';
    e.innerHTML += '<font class="ask"><label for="hoofdlettergevoelig_ask"><input style="margin-left: 45px;" type="radio" id="hoofdlettergevoelig_ask" value="ask" name="hoofdlettergevoelig"/> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font><br/>';
    e.innerHTML += '<strong>Accenten, trema' + unescape("%u2019") + 's en Umlaute zijn belangrijk</strong><br/>';
    e.innerHTML += '<label for="accentgevoelig_Y"><input style="margin-left: 45px;" type="radio" id="accentgevoelig_Y" value="Y" name="accentgevoelig" checked="checked"/> Ja </label><br/>';
    e.innerHTML += '<label for="accentgevoelig_N"><input style="margin-left: 45px;" type="radio" id="accentgevoelig_N" value="N" name="accentgevoelig"/> Nee </label><br/>';
    e.innerHTML += '<font class="ask"><label for="accentgevoelig_ask"><input style="margin-left: 45px;" type="radio" id="accentgevoelig_ask" value="ask" name="accentgevoelig"/> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font><br/>';
    e.innerHTML += '<strong>Leestekens zijn belangrijk</strong><br/>';
    e.innerHTML += '<label for="spatiegevoelig_Y"><input style="margin-left: 45px;" type="radio" id="spatiegevoelig_Y" value="Y" name="spatiegevoelig"/> Ja </label><br/>';
    e.innerHTML += '<label for="spatiegevoelig_N"><input style="margin-left: 45px;" type="radio" id="spatiegevoelig_N" value="N" name="spatiegevoelig" checked="checked"/> Nee </label><br/>';
    e.innerHTML += '<font class="ask"><label for="spatiegevoelig_ask"><input style="margin-left: 45px;" type="radio" id="spatiegevoelig_ask" value="ask" name="spatiegevoelig"/> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font><br/>';
    document.getElementsByName('commit')[0].value = "Opslaan";
    document.getElementById('verbergVraagNaDD').innerHTML = '<input type="radio" value="1" id="verberg_vraag_na_1" name="verberg_vraag_na"/><label for="verberg_vraag_na_1"> Na 1 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="2" id="verberg_vraag_na_2" name="verberg_vraag_na" checked="checked"/><label for="verberg_vraag_na_2"> Na 2 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="5" id="verberg_vraag_na_5" name="verberg_vraag_na"/><label for="verberg_vraag_na_5"> Na 5 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="10" id="verberg_vraag_na_10" name="verberg_vraag_na"/><label for="verberg_vraag_na_10"> Na 10 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="nil" id="verberg_vraag_na_nil" name="verberg_vraag_na"/><label for="verberg_vraag_na_nil"> De vraag niet verbergen</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<font class="ask"><input type="radio" value="ask" id="verberg_vraag_na_ask" name="verberg_vraag_na"/><label for="verberg_vraag_na_ask"> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label><br /></font>';
}
if (document.location.href.indexOf("/set/") != -1)
{
    var id = document.location.href.match(/[0-9]+/);
    var formvars = document.location.href.substr(document.location.href.indexOf('?') + 1);
    setValue("WRTS_predef_" + id, formvars);
    document.location.href = "http://www.wrts.nl/lijst/show/" + id;
}
if (document.location.href.indexOf("/overhoor/js/") != -1)
{
    var e = document.getElementById('paneel-voortgang').firstElementChild.innerHTML +=
		"<li id='skip' class='list'>Hierna doorgaan naar 'Mijn lijsten'</li>";
    var skip = document.getElementById('skip');
    skip.style.opacity = .5;
    skip.addEventListener('click', function ()
    {
        if (this.style.opacity == .5)
        {
            document.getElementById('paneel-form-resultaat-form').action = "/lijst";
            this.style.opacity = 1;
            this.style.color = "red";
        } else
        {
            document.getElementById('paneel-form-resultaat-form').action = document.location.href.replace("/js/", "/js_klaar/");
            this.style.opacity = .5;
            this.style.color = "";
        }
    }, false);
    e = document.getElementsByTagName('script');
    for (var i = 0; i < e.length; i++)
    {
        if (e[i].innerHTML.indexOf("function wrtsPrepareerAntwoord(antwoordtekst) {") == -1)
            continue;
        var a = e[i].innerHTML.indexOf("function wrtsPrepareerAntwoord(antwoordtekst) {") + 47;
        var b = e[i].innerHTML.indexOf("return antwoordtekst;");
        var script = document.createElement('script');
        script.innerHTML += "function wrtsPrepareerAntwoord(antwoordtekst) {\r\nvar split = antwoordtekst.split(',');\r\nsplit.sort();\r\nantwoordtekst=split.join();\r\n";
        script.innerHTML += e[i].innerHTML.substring(a, b);
        script.innerHTML += "return antwoordtekst;\r\n}";
        e[i].parentNode.insertBefore(script, e[i].nextSibling);
        break;
    }
    contentEval(function ()
    {
        wrtsSchermFoutTochGoed = function ()
        {
            var data = getWrtsDataStore();
            var ronde = data.getRonde(data.getHuidigeVraagId()) - 1;
            ronde = ronde || 1;
            var rondeIdx = ronde - 1;
            data.scores[rondeIdx][0]++;
            data.scores[rondeIdx][1]--;
            data.fouten[rondeIdx].pop();
            data.queue.pop();
            eval("wrtsSchermFoutOK()");
        };
        wrtsSchermVerbeterTochGoed = function ()
        {
            var data = getWrtsDataStore();
            var ronde = data.getRonde(data.getHuidigeVraagId()) - 1;
            ronde = ronde || 1;
            var rondeIdx = ronde - 1;
            $("scherm-verbeter-antwoord").disabled = false;
            $("scherm-verbeter-antwoord").className = $("scherm-verbeter-antwoord").className.replace(/disabled/, "");
            wrtsSchermSetVisibility("verbeter", false);
            wrtsSchermSetVisibility("tip", false);
            data.scores[rondeIdx][0]++;
            data.scores[rondeIdx][1]--;
            data.fouten[rondeIdx].pop();
            data.queue.shift();
            eval("wrtsNaarVolgendeVraag()");
        };
        var e = document.evaluate("//dt[@class='fout']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        e.innerHTML += " <a onclick='wrtsSchermFoutTochGoed();'>Het is wel goed!</a>";
        e = document.getElementById("scherm-verbeter-taal-antwoord").parentNode;
        e.innerHTML += " <a onclick='wrtsSchermVerbeterTochGoed();'>Het is wel goed!</a>";
    });
}

if (document.location.href.indexOf("?editpredef") != -1)
{
    var li, id;
    li = document.getElementsByTagName('li');
    for (i = 0; i < li.length; i++)
    {
        if (li[i].className.indexOf("actief") != -1)
        {
            li[i].className = "test";
        }
        if (li[i].className.indexOf("editpredef") != -1)
        {
            li[i].className = "actief editpredef";
        }
    }
    id = document.location.href.match(/[0-9]+/);
    addStyle('.ask { background-color: rgb(255, 185, 172); }');
    document.getElementById('startOverhorenFormulier').action = "/overhoor/set/" + id;
    document.getElementById('startOverhorenFormulier').method = "get";
    document.getElementById('overhoortype_geen').parentNode.parentNode.innerHTML += "<br/><strong>Vraag:</strong><font class='ask'><br/><label for='overhoortype_ask'><span style='padding-left: 44px;'></span><input type='radio' id='overhoortype_ask' value='ask' name='overhoortype' />Vraag <span class='toelichting'>" + unescape("%26%238594%3B") + " vraag iedere keer voor de overhoring</span></label><br/></font>";
    document.getElementById('volgorde_ab').parentNode.innerHTML += '<font class="ask"><br/><input type="radio" id="volgorde_ask" value="ask" name="volgorde"/> <label class="ask" for="volgorde_ask">Vraag<span class="volgorde"></span> <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font>';
    document.getElementById('niveau_goed').parentNode.innerHTML += '<font class="ask"><br/><input type="radio" id="niveau_ask" value="ask" name="niveau"/> <label for="niveau_ask">Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font>';
    var e = document.getElementById('hoofdlettergevoelig_f').parentNode;
    e.className = "overhoortypes";
    e.innerHTML = '<strong>Hoofdletters zijn belangrijk</strong><br/>';
    e.innerHTML += '<label for="hoofdlettergevoelig_Y"><input style="margin-left: 45px;" type="radio" id="hoofdlettergevoelig_Y" value="Y" name="hoofdlettergevoelig"/> Ja </label><br/>';
    e.innerHTML += '<label for="hoofdlettergevoelig_N"><input style="margin-left: 45px;" type="radio" id="hoofdlettergevoelig_N" value="N" name="hoofdlettergevoelig"/> Nee </label><br/>';
    e.innerHTML += '<font class="ask"><label for="hoofdlettergevoelig_ask"><input style="margin-left: 45px;" type="radio" id="hoofdlettergevoelig_ask" value="ask" name="hoofdlettergevoelig"/> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font><br/>';
    e.innerHTML += '<strong>Accenten, trema' + unescape("%u2019") + 's en Umlaute zijn belangrijk</strong><br/>';
    e.innerHTML += '<label for="accentgevoelig_Y"><input style="margin-left: 45px;" type="radio" id="accentgevoelig_Y" value="Y" name="accentgevoelig"/> Ja </label><br/>';
    e.innerHTML += '<label for="accentgevoelig_N"><input style="margin-left: 45px;" type="radio" id="accentgevoelig_N" value="N" name="accentgevoelig"/> Nee </label><br/>';
    e.innerHTML += '<font class="ask"><label for="accentgevoelig_ask"><input style="margin-left: 45px;" type="radio" id="accentgevoelig_ask" value="ask" name="accentgevoelig"/> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font><br/>';
    e.innerHTML += '<strong>Leestekens zijn belangrijk</strong><br/>';
    e.innerHTML += '<label for="spatiegevoelig_Y"><input style="margin-left: 45px;" type="radio" id="spatiegevoelig_Y" value="Y" name="spatiegevoelig"/> Ja </label><br/>';
    e.innerHTML += '<label for="spatiegevoelig_N"><input style="margin-left: 45px;" type="radio" id="spatiegevoelig_N" value="N" name="spatiegevoelig"/> Nee </label><br/>';
    e.innerHTML += '<font class="ask"><label for="spatiegevoelig_ask"><input style="margin-left: 45px;" type="radio" id="spatiegevoelig_ask" value="ask" name="spatiegevoelig"/> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label></font><br/>';
    document.getElementsByName('commit')[0].value = "Opslaan";
    document.getElementById('verbergVraagNaDD').innerHTML = '<input type="radio" value="1" id="verberg_vraag_na_1" name="verberg_vraag_na"/><label for="verberg_vraag_na_1"> Na 1 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="2" id="verberg_vraag_na_2" name="verberg_vraag_na"/><label for="verberg_vraag_na_2"> Na 2 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="5" id="verberg_vraag_na_5" name="verberg_vraag_na"/><label for="verberg_vraag_na_5"> Na 5 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="10" id="verberg_vraag_na_10" name="verberg_vraag_na"/><label for="verberg_vraag_na_10"> Na 10 seconde</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<input type="radio" value="nil" id="verberg_vraag_na_nil" name="verberg_vraag_na"/><label for="verberg_vraag_na_nil"> De vraag niet verbergen</label><br />';
    document.getElementById('verbergVraagNaDD').innerHTML += '<font class="ask"><input type="radio" value="ask" id="verberg_vraag_na_ask" name="verberg_vraag_na"/><label for="verberg_vraag_na_ask"> Vraag <span class="toelichting">' + unescape("%26%238594%3B") + ' vraag iedere keer voor de overhoring</span></label><br /></font>';
}
addStyle("#midcol { width: 810px; margin: 0 auto; }");
addStyle("#kopbalk { width: 820px; }");
addStyle("table.woordenlijst { width: 808px; }");
addStyle("table.woordenlijstInvoer { width: 808px; }");
addStyle("table.woordenlijsten { width: 808px; }");
addStyle("table.woordenlijstInvoer th span.sorteren { margin-left: 270px; }");
addStyle("table.woordenlijstInvoer input.textfield { width: 366px; }");
addStyle("table.woordenlijstInvoer tr.titel input.textfield { width: 749px; }");
addStyle("#loginVak { width: 492px; }");
addStyle("#taalVak { width: 450px; }");
addStyle("#midcolOnder { width: 821px; background-image: url('data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAAzUAAAAhCAIAAABvIRKrAAAABGdBTUEAALGPC/xhBQAABLZJREFUeF7t3VtrXFUYBuCmKYI/Q7z0WvwT/hubzOSo4J1eNUfTpDnNTHM2B5tD1QsLFaQtFkULpXppEfVKRC0o9VvZk0lsEjtJ6J6NecIKDGRm7Z1n5+LN9621d1vv2Pybr7/6xmuvXPBFgAABAgQIECDw4gVu3X+0c++7py+9fPHSpfb29raL8dUeh21ra6sfPPLZF1/effrkF4MAAQIECBAgQCAHgU9v3y4NVUtXl7sm13pnPuqrbL5d24nxzvWb2bggn+VwGRyCAAECBAgQINAQWNr6uDRck89UBwkQIECAAAEChRD4+8+f35u43jk6L58V4nr4v4EAAQIECBAg8ODhN+WB6Y4PFkvjK1l/s7+ydbC5qb8ptxEgQIAAAQIEchUYX1zvHK5l+axbPhPYCRAgQIAAAQKtFfj626+ieHZ5dL5zbLE8sdI9td47c0P9LNeA3Nq/AEcnQIAAAQIECiXw+6+P3x2tdKTi2ULn1aXyxIc9Uxt9s5v91W39TRGNAAECBAgQIJC3wF9//DSxtF4anL08Mt9YfNYzvXH45hrWn+V9bQqV4p0MAQIECBAgkJvAwubN0uDMbjirF88ONjfVz2QyAgQIECBAgEB+AlE5W975pDQw89bIXLbyLNu5mRXPDjc3s/rZwud37+QWHh2IAAECBAgQIHB+BJ789uPk8kZUzrJwljqb8diAa6ux8qyxM+CZ4lnKZ32Tq9X1rfPD5DclQIAAAQIECOQj8PDRg/cn52LNWSOcZdsCdjubRzzWaf/5ThHZekdqcau0fE7UUQgQIECAAAEC/3uBxz98P3djp3xlumOoGmvOsspZPZztPXMz62weLp6l+ll890+t9YzU4lFQd+7fMwgQIECAAAECBE4tsP3ZrbGFta4rU51DlZTMdjcEZG3NVDnLlp3t3VPjyHBWz2fxs7gxWs/4cvdIrWu4Uh6qlAdny4Mz5QGDAAECBAgQIEDgBAKlwXSHs72aWUpmUTZLGwKurWZPC3huODuQz6rb8e5Yqha7CWKKmCim2x0xr0GAAAECBAgQINC8QApRsU8zJbNUNku7NRtrzv6jrbm//ixeZb3PKKHFPoL4cEwRE0VKixkNAgQIECBAgACBEwuMr0SaioZmVjaLnmakrMbdNI5rax6Vz6KEVtmMD0cVLUtpBgECBAgQIECAwOkEIpZFoKons1hwVtlqpnKWRbS0P2C/hLYb0aLRGSkt+qMxYlKDAAECBAgQIECgeYEsRKWC2exmqpkdSGbPrZz9K581IlpqdFa300SVrZTVDAIECBAgQIAAgRMKZFEqZaq9m2g0mcyezWcHI1q2Is0gQIAAAQIECBA4u0BjYVmTL+r9zcPvPvupmIEAAQIECBAgcD4Fmsxhx73t2Hx2xnl9nAABAgQIECBA4HQC8lnaHmEQIECAAAECBIojIJ8JZwQIECBAgACBYgnIZ8W6HsVJ7s6EAAECBAgQaJWAfCafESBAgAABAgSKJSCfFet6tCqnOy4BAgQIECBQHAH5TD4jQIAAAQIECBRLQD4r1vUoTnJ3JgQIECBAgECrBOQz+YwAAQIECBAgUCwB+axY16NVOd1xCRAgQIAAgeII/AN5KR5SEa5MWQAAAABJRU5ErkJggg==') !important; }");
addStyle("#overhoring dd input.textfield { width: 663px; }");
addStyle("#overhoring dd.fout span { width: 663px; }");
addStyle("table.loginformulier { width: 808px; }");
addStyle("#colofon { width: 810px; }");
addStyle("div.tip { margin-left: 796px; }");
addStyle(".overhoringResultaat div.tip { margin-left: 759px; }");
addStyle("#fout { width: 755px; }");
addStyle("#overzicht { width: 580px; }");
addStyle(".list { padding-left: 15px; }");
addStyle(".minimize a { padding: 0px !important; background-position: center center !important; }\r\n .minimize a img { border: none; opacity: 0; heigth: 13px;}");
addStyle(".overhoringResultaat table.woordenlijst { width: 750px; }");