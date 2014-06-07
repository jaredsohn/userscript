// ==UserScript==
// @name           kknTool
// @namespace      kknTool
// @description    kknTool
// @include        http://*.sangokushi.in.th/*
// ==/UserScript==

//Sangokushi Tool
//Develop By KKN
//13/06/2555 Version 3.0000
//Update
//13/06/2555 Version 3.11

var LOCAL_STORAGE = 'kknTool';

//CSS
var PageHead = document.getElementsByTagName('head')[0];
var CssStyle = document.createElement('style');
var StyleStr;

//Array
var AreaClass = new Array();
var AreaShow = new Array();

//Toolbar หลัก
var kknToolBar = document.createElement('div');
var Credit = document.createElement('span');
var ToolBar = document.createElement('div');
var ToolBarUl = document.createElement('UL');

//ระดับอาณาเขต
var WarPowerLi = document.createElement('li');
var WarPowerA = document.createElement('a');
var WarPowerSpan = document.createElement('span');
var WarPowerSubDiv = document.createElement('div');
var WarPowerUL = document.createElement('ul');

InitGMWrapper();
CreateCSS();
CreateMainDiv();
GenerateAreaClass();
SetupAreaPowerMenu();
ShowAreaPower(false);
SetAreaPowerCheckBoxListener();
SetAreaJapVesion();

function CreateCSS() {
    var PageHead = document.getElementsByTagName('head')[0];
    var CssStyle = document.createElement('style');
    var StyleStr;

    CssStyle.type = 'text/css';
    StyleStr = '.Container { z-index:1100; display:block; width:100%; height:20px; background-color:Black; font-family:Tahoma; font-size: 11px; position:fixed; bottom:0px; left:0; color:White; } .Container a { text-decoration:none; } .Credit { float: right; margin: 3px 3px 0px 0px; } .MainNav { float: left; margin:0 0 0 5px; } .MainNav ul { float: left; margin: 0; list-style: none; } .MainNav .NavList { float:left; } .MainNav li a {	display: block;	line-height: 24px; overflow: hidden; float: left; color:White; } .MainNav a .menu-mid { height: 18px; line-height: 21px; display: block; float: left; } .MainNav li .subList { display: none; position: fixed; bottom:20px; padding-top: 3px; border: 1px solid Black; -moz-border-radius: 7px 7px 0px 0px; -webkit-border-radius: 7px 7px 0px 0px; border-radius: 7px 7px 0px 0px;} .subList { z-index:1090; background: -moz-linear-gradient(top, #444444, #000000); background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#444444), to(#000000)); border: 1px solid white; -moz-border-radius: 7px 7px 0px 0px; -webkit-border-radius: 7px 7px 0px 0px; border-radius: 7px 7px 0px 0px; }  .MainNav li:hover .subList{ display:block; } .MainNav li ul { width: auto; height: auto; margin: 0; padding: 0 5px 0px; list-style: none; } .MainNav li ul li { width: auto; display:block; padding: 0px 10px 0px 0px; } .MainNav li .subList li a { display:block; width:100%; padding: 0px 5px 0px 5px; } .MainNav li .subList li a:hover { background: -moz-linear-gradient(top, #999999, #000000); background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#999999), to(#000000)); -moz-border-radius: 7px 7px 0px 0px; -webkit-border-radius: 7px 7px 0px 0px; border-radius: 7px 7px 7px 7px; } .MainNav li .subList li a:active { background: -moz-linear-gradient(top, #000000, #444444); background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#000000), to(#444444)); -moz-border-radius: 7px 7px 0px 0px; -webkit-border-radius: 7px 7px 0px 0px; border-radius: 7px 7px 7px 7px; }';
    CssStyle.appendChild(document.createTextNode(StyleStr));
    PageHead.appendChild(CssStyle);
}

function CreateMainDiv() {
    kknToolBar.id = 'kknToolBar';
    kknToolBar.className = 'Container';

    ToolBar.id = 'MainNav';
    ToolBar.className = 'MainNav';

    ToolBar.appendChild(ToolBarUl);
    kknToolBar.appendChild(ToolBar);

    //Credit
    Credit.id = 'Credit';
    Credit.className = 'Credit';
    Credit.innerHTML = ' kknTool v3.11 | Develop By kkn ( XIV ) ';
    kknToolBar.appendChild(Credit)

    document.body.insertBefore(kknToolBar, document.body.firstChild);
}

function SetupAreaPowerMenu() {
    if (location.pathname == '/map.php') {
        //if (MenuConfig[AreaPower] = 'checked') {
            WarPowerLi.id = 'WarPowerLi';
            WarPowerUL.id = 'WarPowerUL';
            WarPowerSubDiv.className = 'subList';
            WarPowerSpan.className = 'menu-mid';
            WarPowerSpan.innerHTML = 'ระดับอาณาเขต'
            WarPowerA.href = '#';

            WarPowerSubDiv.appendChild(WarPowerUL);
            WarPowerA.appendChild(WarPowerSpan);
            WarPowerLi.appendChild(WarPowerA);
            WarPowerLi.appendChild(WarPowerSubDiv);

            for (i = 1; i <= 10; i++) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                var span = document.createElement('span');
                var Input = document.createElement('input');
                span.innerHTML = ' ระดับ ' + i;
                Input.type = 'checkbox';
                Input.id = 'Power' + i;

                a.href = '#';
                a.id = 'aPower' + i;
                a.appendChild(Input);
                a.appendChild(span);

                li.appendChild(a);
                WarPowerUL.appendChild(li);
            }

            var li = document.createElement('li');
            var a = document.createElement('a');
            var span = document.createElement('span');
            a.href = '#';
            a.title = 'ซ่อน-แสดง ทั้งหมด'
            a.id = 'aToggle'
            a.innerHTML = ''
            li.appendChild(a);

            WarPowerUL.appendChild(li);
            ToolBarUl.appendChild(WarPowerLi);
        //}
    }
}

function ShowAreaPower(Reload) {
    if (location.pathname == '/map.php') {
        var mapElem = document.evaluate('//*[@id="mapsAll"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        var AreasPos = document.evaluate('//*[@id="mapOverlayMap"]//area', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var Areas = document.evaluate('//*[@id="mapOverlayMap"]//area/@onmouseover', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        SetAreaPowerCheckBox();

        for (var i = 0; i < Areas.snapshotLength; i++) {
            //<img src=\'/20110921-01/extend_project/thai/img/common/star_warpower_b.gif\' />            
            try {
                var AreaPower = Areas.snapshotItem(i).textContent.match(/star_warpower_b/gi).length;
                if (AreaPower != 'undefined') {
                    var addElemPow = document.createElement("img");

                    addElemPow.id = 'AreaPower' + i;
                    addElemPow.className = AreaClass[i] + ' power';

                    if (Reload) {
                        var oldImg = document.getElementById('AreaPower' + i);
                        if (oldImg != null) {
                            mapElem.removeChild(oldImg);
                        }
                    }

                    if (AreaShow[AreaPower - 1] == 'checked') {
                        switch (AreaPower) {
                            case 1:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AKUwAAAAAAEBAQECAQIDAgIEAgMFAwMGAw0aDQ4bDhYqFhYrFhcsFxgvGBozGhw2' +
                                            'HChOKCtTKy5YLi5ZLjBcMDFdMTJfMjRjND54PkqPSkuRS02VTVKeUlOgU1akVlmqWV2zXWS/ZGTA' +
                                            'ZGXBZWXCZWfFZ23RbW7Ubnfld3vse3vte3zufHzvfH3xfX7yfoD2gIH3gf//////////////////' +
                                            '/////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5' +
                                            'BAEKAD8ALAAAAAA8ADwAQAbMwJ9wSCwaj8ikcslsOp/QqHRKrVqfAIDpVfK8XqLsdUwECFTfBoDM' +
                                            'brvf8Lh8Tq+Ts3ixHbv4sghre0oABy5fh4cTgYKMjY6PkJGSk5SVlkZZCBuGXwqLk3kAI18Vn5VZ' +
                                            'GF8aeqAADxcXHF8nsA+mkKG5l7u8vb6/wMHCw8TFxsfIycpvobx4DiBfELe4ABIpiCsD1I9ZHxEB' +
                                            'GV8ZrJR4AytfDNySABRfJOWnACFfFuyOeQlfLQbyuAVQIELUAd+eXAiXKVzIsKHDMUEAADs=';
                                break;
                            case 2:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AKU6AAAAAAEBAQIDAgIEAgMFAwUKBQcNBwkSCQoTCg0ZDREgEREhERQmFBQnFBgu' +
                                            'GBs1Gx89HyNEIyVIJTBcMDJfMjhrODpwOjx0PD54PkF8QUF9QUWFRUyTTE2VTVCaUFakVlalVlmq' +
                                            'WWK7YmXCZWfFZ2jIaGnJaWnKaW3SbW/Wb3DYcHHYcXHZcXLacnPdc3TedHfld3noeXrqenvte33w' +
                                            'fX7yfn7zfn/0f4D2gIH3gf///////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5' +
                                            'BAEKAD8ALAAAAAA8ADwAQAbbwJ9wSCwaj8ikcslsOp/QqHRKrVqfgIarcgAgVLmwBHC9AgAUWzhU' +
                                            'OJff8Lh8Tq/b73j8ec/PR88MMWEjA2R+SGckYYuMGW6HkJGSk5SVlpeYmZp/AB6MiyCPmHs/Zylh' +
                                            'MASGowAOL2EsCqKVZxOLLBy5uRezlHy/pJvCw8TFxsfIycrLzM3Oz9DRlsDDZxAdKDUzJRYCq5cA' +
                                            'Bjc5OC40jAzftADeex+LD+qstmEYvdMACy1hKwn3vgAiyAhjwp88gBoWbQjwi5WIT4xO/IMErOJB' +
                                            'aRgzatzI8UoQADs=';
                                break;
                            case 3:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AMZBAAAAAAEBAQMFAwMGAwUKBQYLBgcNBwcOBwkSCQsVCwwXDA0ZDRQmFBUoFRUp' +
                                            'FRcsFyA9ICJCIiNEIydLJy5ZLjFdMTRjNDZoNjdqNzhsODpvOjtyOzxzPDx0PD12PT95Pz96P0J+' +
                                            'QkWERUeJR0mNSVGbUVKdUlOfU1OgU1WjVVakVl60Xl61XmfGZ2nJaWnKaW/Vb2/Wb3fkd3fld3jm' +
                                            'eHnoeXrqenrrenvse3zufHzvfH7yfn7zfn/0f3/1f4D2gIH3gf//////////////////////////' +
                                            '////////////////////////////////////////////////////////////////////////////' +
                                            '////////////////////////////////////////////////////////////////////////////' +
                                            '/////////////////////////////////////////////////////////////////////////yH+' +
                                            'EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAA8ADwAQAf5gH+Cg4SFhoeIiYqLjI2Oj5CR' +
                                            'kpOUlZaPAAYcBwCdHkCgDACXl52mnRagQBOjpK6vsLGys7S1treyp7qduI0AATKqQDIVpr2JnQsi' +
                                            'LTc+Ni4joq3H1NXW19jZ2tvc3d6SnSjCqim83boONKAi5tunBBEwoD8N09idJj8sHxkkM6oY2mnb' +
                                            'ZeybwYMIEypcyLChw4cQI0qcSLEit10GTUkoAWNHjhcdBgjMBqCADxwnNISoMS+BvYG6QoDCIeDl' +
                                            'PQAQLmgwoQOUipo2rwFA4GMcjw0jYZqioKrYRQcPTimIAcqGgaDUOq0YB6oHiKRCCRa0SLas2bNo' +
                                            'ZwUCADs=';
                                break;
                            case 4:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AKU5AAAAAAEBAQECAQIEAgMGAwsWCwwXDA0ZDRAeEBEhERUpFRs0Gx47HiE/ISJB' +
                                            'IiVIJSZJJidLJytSKzVlNTZoNjltOT12PT95Pz96P0SCREiKSEiLSEyTTE6XTk+YT1WjVVipWFmq' +
                                            'WVuuW1yxXGC5YGK8YmO+Y2fFZ2jIaGrMam/Vb3Pcc3TedHXhdXfld3jmeHrqenvse33xfX7yfn7z' +
                                            'fn/0f3/1f4D2gIH3gf///////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5' +
                                            'BAEKAD8ALAAAAAA8ADwAQAbjwJ9wSCwaj8ikcslsOp/QqHRKrVqjAAEJB/vgcB0A4FoVp77oNE4l' +
                                            'Jrvf8Lh8Tq/b73axXo9fAggnOC0HAA9fKG19TmIlNy4KY4qSk5SVlpeYmZqbnFZiDDRoMwSRmWIQ' +
                                            'NzgaACxfC6WXAA5fFnogXxN8mHt6GF9hiZ0/vMLFxsfIycrLzM3Oz9DR0tPUdLywnGIUMF8xCdi7' +
                                            'AAWtNofBpgAZXxIiuOCVYggvOCYDBl+j75NiHDg1DWIu/DoHD4AHNWpkBNDXR0yFDRAhjviyYkME' +
                                            'guhCuDt2jWG1jyBDihwJJQgAOw==';
                                break;
                            case 5:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AKU+AAAAAAICAAUFAAYGAA0NABQUABUVABYWABsbAB0dACIiACUlACcnACsrADEx' +
                                            'ADIyADY2ADc3ADg4ADw8AEBAAFJSAFNTAFRUAFdXAF5eAGBgAGdnAGhoAGxsAG5uAHFxAHZ2AHd3' +
                                            'AHp6AICAAIGBAIWFAIaGAJaWAJeXAJycAKmpALW1ALa2ALi4AL29AMvLANDQANPTANbWAN/fAOXl' +
                                            'AOjoAOrqAOzsAO7uAPHxAPX1APb2APz8AP//AP///////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5' +
                                            'BAEKAD8ALAAAAAA8ADwAQAbcwJ9wSCwaj8ikcslsOp/QqHRKrVqfAECtx8p6s9fw10vpmR+AsHrN' +
                                            'brvf8Lh8/h7b03RltmXum2UDeHlHWQ0nMTo8Ni4eBGCDkJGSk5SVlpeYmZpTWSN+fhKClgAVZhsL' +
                                            'CAFem3YKfSCik1kkPCwiHyg4ZjoOj5d3sZvCw8TFxsfIycrLzM3Oz9DRssDBlQAQO59mGtWSWSs9' +
                                            'Nx3j4xm+owlmJWOsACafOSkH59YAERcXGCEzfRbdvwL6cPg3CEABBl8MwDDzgp43ACq09aAxweE0' +
                                            'atIyatzIsWOcIAA7';
                                break;
                            case 6:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AMZGAAAAAAEBAAICAAMDAAQEAAgIAA0NAA8PABISACIiACMjACUlACkpACwsAC0t' +
                                            'ADo6ADw8AD4+AD8/AEREAEhIAEpKAEtLAE1NAFxcAGFhAGJiAGNjAGhoAG9vAHR0AHt7AIGBAIKC' +
                                            'AIaGAImJAIyMAJiYAJ6eAKioAKurAKysAK2tAK+vALi4ALq6AL6+AMXFAMbGAMfHAM3NANPTANXV' +
                                            'ANbWANnZAN3dAOPjAOXlAObmAOzsAO3tAO7uAPDwAPT0APb2APn5APv7APz8AP39AP//AP//////' +
                                            '////////////////////////////////////////////////////////////////////////////' +
                                            '////////////////////////////////////////////////////////////////////////////' +
                                            '/////////////////////////////////////////////////////////////////////////yH+' +
                                            'EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAA8ADwAQAf+gH+Cg4SFhoeIiYqLjI2Oj5CR' +
                                            'kpOUlZaPAAMyRUUgAgCgoZeWoEGcCaEqnCKgo66vsLGys7S1tre0obqiuImgHpzBwiWtvb4AES0+' +
                                            'QjopE8XG0dLT1NXW19jZ2tuToA42wpwr0NWgM5wMDxobDwHk5QA0nBahFZw679OgLJw4HyQ/OI3I' +
                                            'Z20XQW4IEypcyLChw4cQI0qcSLGixYvUDAJACKoABxc8hviIgeFgNFALenCqIaJDCBclN14DlYHT' +
                                            'CY3aADjgBCSHsBcITPYClYKTjAsGDqDgdEMoLlAqizQIVbMIDKe3QO3gRAEUBCJFhCiQOROAhCHh' +
                                            'ipggQDabRqwJGOPKnUu3LqVAADs=';
                                break;
                            case 7:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AKUqAAAAAAMCAAQDAAYEAQ8JAhAKAxILAxkPBB8TBSEUBicYBzQgCTkjCj0lC1Qz' +
                                            'D1g1EF45EWtBE29DFHRGFXhJFX9NF4lTGJZbG5hcG5teHLZuIbdvIc59JdJ/JtaBJuOJKeeMKe2P' +
                                            'KvSTLPWULPiWLPqXLfuYLfyYLf2ZLf6aLv//////////////////////////////////////////' +
                                            '/////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5' +
                                            'BAEKAD8ALAAAAAA8ADwAQAbFwJ9wSCwaj8ikcslsOp/QqHRKrVqhgKx2cUqlLtnrNdtAeTFhsXrN' +
                                            'brvf8Lh8Dtfa72k6M6vxjhJ5ekgAFiUpH4AAgouMjY6PkJGSk5SVYw5emZopEIqWWROZD4GRWQUg' +
                                            'Xh0CnpRZFaKkrXaWtLW2t7i5uru8vb6/wMHCw7J4s5MABiGbmhKskAAJEdPUHV4mB8+tARxeIASx' +
                                            '0AAIIl4b4eIPmRToj1kZXigM7Y4AAx7e4NqSAAok5vTc4SFGsKDBgwjpBAEAOw==';
                                break;
                            case 8:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AMZNAAAAAAQDAAsHAg0IAg8JAhILAxUNAxYNBBgPBBoQBBsQBRwRBSQWBisaBzAd' +
                                            'CDIeCTUgCTgiCj0lC0IoDEgsDUksDU4vDlo2EFw4EGc+EmpAE25DFHhJFXtKFn9NF4BNF4FOF4RQ' +
                                            'F4VQGI1VGY9WGZNZGpRZGpVaG5ZbG5ldG6JiHaVkHaxoH65pH7BqH7VtILZuIbxyIr1yIsN2I8Z4' +
                                            'I8p6JMt7JM18JdaBJuCHKOGIKOOJKeSKKeaLKeiMKumNKuqNKu+QK/CRK/GSK/KSK/WULPaVLPeV' +
                                            'LPmWLfqXLfuYLfyYLf6aLv//////////////////////////////////////////////////////' +
                                            '////////////////////////////////////////////////////////////////////////////' +
                                            '/////////////////////////////////////////////////////////////////////////yH+' +
                                            'EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAA8ADwAQAf+gH+Cg4SFhoeIiYqLjI2Oj5CR' +
                                            'kpOUlZaPABlMTDYBAAAYmzSfl5UAH5srn58mmyoApbGys7S1tre4ubq3q72ru42fD0Cbmy8GpMCJ' +
                                            'nwcjOEVJPzIbAsnK19jZ2tvc3d7f4OGRnxA+xcVLFNbbnx2bM54WR0xBC+vZnxNDTEsoDiyblEC4' +
                                            'h+1TiE1ISmwQoWOTjmrhfP0SR7GixYsYM2rcyLGjx48gQ4oc+U0iLHGfCniwQSSaCwkEtQEY0GPT' +
                                            'DQ4ddmyCEbNgKyYhVoHYRKLnNQAKhGyq0WKTjwhGlX1iEOMcEyMXogIDkEBpkgqrZmw6oTXXpxWb' +
                                            'UqwikGOThrIWZhHwsLopRwO4ukz2Ism3r9+/gG8FAgA7';
                                break;
                            case 9:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AMZKAAAAAAEAAAIAAAQAAAUAAAgAAAoAAA0AAA8AABEAABQAABgAACgAACkAADEA' +
                                            'ADQAADUAADcAADkAAEMAAEwAAFEAAFsAAGYAAG4AAG8AAHMAAHYAAHoAAHwAAIQAAIcAAIoAAJEA' +
                                            'AJIAAJUAAJcAAJgAAJkAAJwAAKEAAKcAAK0AALEAALIAALUAAL0AAMEAAMYAAMoAAMsAAMwAAM8A' +
                                            'ANUAANgAAN4AAOAAAOEAAOYAAOcAAOgAAOoAAOwAAO4AAPAAAPIAAPQAAPkAAPoAAPsAAPwAAP0A' +
                                            'AP4AAP8AAP//////////////////////////////////////////////////////////////////' +
                                            '////////////////////////////////////////////////////////////////////////////' +
                                            '/////////////////////////////////////////////////////////////////////////yH+' +
                                            'EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAA8ADwAQAf+gH+Cg4SFhoeIiYqLjI2Oj5CR' +
                                            'kpOUlZaOAAAmSUkuA5kpnB8Al5eZp5kQSEk8BqSlsLGys7S1tre4ubWovK+6igAPnEkrGR82wxO+' +
                                            'v4WZDio6R0I1IgynzNjZ2tvc3d7f4OHilJkPOsPDNATL3AARnEABp5tJIOzbmQonO0U+LSicXmTy' +
                                            'lknCjRMaNqQYwonEwHC9Ho6bSLGixYsYM2rcyLGjx48gQ4r8FpFiJgQcYgQhgiNEAondMi3owWnG' +
                                            'hhJHOFW4pw1AASGcIpz6wGkEz2wAKHD6ISBTABicMMDEF0AGOnRFDhxF2osFpwtTe/ZqkIOThbBc' +
                                            'O1xNYsSDvK0N2CKiGkm3rt27eG8FAgA7';
                                break;
                            case 10:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'R0lGODlhPAA8AMZiAAAAAAEAAAIAAAMAAAQAAAUAAAYAAAcAAAkAAA4AABAAABQAABYAABoAABsA' +
                                            'ABwAAB4AACUAACYAACwAAC0AAC4AADAAADEAADUAADgAADoAADwAAEQAAFEAAFMAAFQAAFYAAFsA' +
                                            'AFwAAF8AAGAAAGEAAGMAAGYAAGcAAG8AAHAAAHMAAHUAAHYAAHoAAHwAAIMAAIgAAIkAAIwAAJEA' +
                                            'AJQAAJYAAJcAAJkAAJoAAKMAAKQAAKYAAKoAALAAALIAALQAALkAAMIAAMUAAMYAAMcAAMgAAMkA' +
                                            'AMwAAM0AANEAANcAANgAANkAANsAAN0AAOAAAOIAAOUAAOYAAOcAAO0AAPIAAPMAAPQAAPUAAPYA' +
                                            'APcAAPkAAPoAAPsAAPwAAP4AAP8AAP//////////////////////////////////////////////' +
                                            '/////////////////////////////////////////////////////////////////////////yH+' +
                                            'EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAA8ADwAQAf+gH+Cg4SFhoeIiYqLjI2Oj5CR' +
                                            'kpOUlZZ/AABOYUw+YWFGmZgAJJ9PCZk0nz+il4mZAANanxiiABufV7AASp8nra7BwsPExcbHyMnK' +
                                            'kLu7hM3Ny4MAFZ9cBQCjRZ8su0CfMMDEAA5gn+fnJLseQ1ZcUToWsNL09fb3+Pn6+/z9/pOZHuww' +
                                            '94lCtlELkqD7BEWBuGLNjnwysUvDJywIYKn4JOShsUw1PuWwBeHcg2wAInwCw+DgRwAdXrzg8amK' +
                                            'zA6ZBEz5lGTFDS+fPngcB83ZNGj/kipdyrSp06dQo0qdSrWq1atYmUYrVNTlMlgZiHwC4TLTgRTt' +
                                            'ukTB0WDosEyFIrKg20LgIAABQj41cSGDy6cWboNlChJCgI1PNmwBWPJJXSYUn0J5fQmAwJZPF1AC' +
                                            'iLFq14xPPQILy1TiExJbAi6H4bCLyieck19uC4PC1p9PXgJo/ERE9KVdEz51ObBLgslMIz5JyZgM' +
                                            'gAEsC8+FzmQi+hcVvn93Nbo9dtbv4MOLH48sEAA7';
                                break;
                        }
                        mapElem.appendChild(addElemPow);
                    } else {

                    }
                }
            }
            catch (ex) {
                //alert(ex.ToString);
            }
        }
    }
}

function GenerateAreaClass() {
    for (i = 0; i < 400; i++) {
        AreaClass[i] = 'mapAll' + padZero(i + 1);
    }

    var TempAreaShow = GM_getValue('AreaShow');
    if (TempAreaShow == undefined) {
        AreaShow = new Array();
        for (i = 0; i < 10; i++) {
            AreaShow[i] = 'checked';
        }
        GM_setValue('AreaShow', AreaShow.toString());
    } else {
        AreaShow = TempAreaShow.split(",");
    }
}

function SetAreaPowerCheckBox() {
    var IsShow = false;

    for (i = 0; i < 10; i++) {
        var checkbox = document.getElementById('Power' + (i + 1));
        checkbox.checked = AreaShow[i];
        if (AreaShow[i] == 'checked') {
            IsShow = true;
        }
    }

    var aToggle = document.getElementById('aToggle');
    if (IsShow) {
        aToggle.innerHTML = 'ซ่อนทั้งหมดทุกระดับ';
    } else {
        aToggle.innerHTML = 'แสดงทั้งหมดทุกระดับ';
    }
}

function SetAreaPowerCheckBoxListener() {
    if (location.pathname == '/map.php') {
        var a = document.getElementById('aPower1');
        a.addEventListener("click", function () { AreaCheckBoxChange(1) }, true);
        a = document.getElementById('aPower2');
        a.addEventListener("click", function () { AreaCheckBoxChange(2) }, true);
        a = document.getElementById('aPower3');
        a.addEventListener("click", function () { AreaCheckBoxChange(3) }, true);
        a = document.getElementById('aPower4');
        a.addEventListener("click", function () { AreaCheckBoxChange(4) }, true);
        a = document.getElementById('aPower5');
        a.addEventListener("click", function () { AreaCheckBoxChange(5) }, true);
        a = document.getElementById('aPower6');
        a.addEventListener("click", function () { AreaCheckBoxChange(6) }, true);
        a = document.getElementById('aPower7');
        a.addEventListener("click", function () { AreaCheckBoxChange(7) }, true);
        a = document.getElementById('aPower8');
        a.addEventListener("click", function () { AreaCheckBoxChange(8) }, true);
        a = document.getElementById('aPower9');
        a.addEventListener("click", function () { AreaCheckBoxChange(9) }, true);
        a = document.getElementById('aPower10');
        a.addEventListener("click", function () { AreaCheckBoxChange(10) }, true);
        a = document.getElementById('aToggle');
        a.addEventListener("click", function () { ToggleShowArea() }, true);
    }
}

function AreaCheckBoxChange(id) {
    if (AreaShow[id - 1] == 'checked') {
        AreaShow[id - 1] = '';
    } else {
        AreaShow[id - 1] = 'checked';
    }
    GM_setValue('AreaShow', AreaShow.toString());
    ShowAreaPower(true);
}

function ToggleShowArea() {
    var IsShow = false;

    for (i = 0; i < 10; i++) {
        if (AreaShow[i] == 'checked') {
            IsShow = true;
            break;
        }
    }

    for (i = 0; i < 10; i++) {
        if (IsShow) {
            AreaShow[i] = '';
        } else {
            AreaShow[i] = 'checked';
        }
    }

    var aToggle = document.getElementById('aToggle');
    if (IsShow) {
        aToggle.innerHTML = 'แสดงทั้งหมด';
    } else {
        aToggle.innerHTML = 'ซ่อนทั้งหมด';
    }

    GM_setValue('AreaShow', AreaShow.toString());
    ShowAreaPower(true);
}

function SetAreaJapVesion() {
    if (location.pathname == '/map.php') {
        var Territory = document.evaluate('//*[@id="mapsAll"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

        switch (getMapScale()) {
            case 20:
                document.getElementById('mapAll').setAttribute("style", "background-image: url(../img/common/mapall20_bg.gif)");
                break;
            case 15:
                document.getElementById('mapAll').setAttribute("style", "background-image: url(../img/common/mapall15_bg.gif)");
                break;
            case 11:
                document.getElementById('mapAll').setAttribute("style", "background-image: url(../img/common/mapall_bg.gif)");
                break;
        }

        if (Territory.hasChildNodes()) {
            var children = Territory.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i] != null) {
                    if (children[i].tagName == 'IMG' && children[i].src.match(/territory/gi)) {
                        var JapSrc = children[i].src.replace('/20120207-01/extend_project/thai_w945', '');
                        children[i].src = JapSrc;
                    }
                }
            }
        }
    }
}

function getMapScale() {
    var sort15now = document.evaluate('//*[@id="change-map-scale"]/ul/li[@class="sort15 now"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (sort15now.snapshotLength != 0) {
        return 15;
    }

    var sort20now = document.evaluate('//*[@id="change-map-scale"]/ul/li[@class="sort20 now"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (sort20now.snapshotLength != 0) {
        return 20;
    }

    return 11;
}

function padZero(num) {
    var result;
    if (num < 10) {
        result = "0" + num;
    } else {
        result = "" + num;
    }
    return result;
}

//---------- Required Script ----------
//Google Chrome用GM_*系ラッパー関数
function InitGMWrapper() {

    // @copyright      2009, James Campos
    // @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
    if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
        GM_addStyle = function (css) {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

        GM_deleteValue = function (name) {
            localStorage.removeItem(LOCAL_STORAGE + "." + name);
        }

        GM_getValue = function (name, defaultValue) {
            var value = localStorage.getItem(LOCAL_STORAGE + "." + name);
            if (!value)
                return defaultValue;
            var type = value[0];
            value = value.substring(1);
            switch (type) {
                case 'b':
                    return value == 'true';
                case 'n':
                    return Number(value);
                default:
                    return value;
            }
        }

        GM_log = function (message) {
            console.log(message);
        }

        GM_registerMenuCommand = function (name, funk) {
            //todo
        }

        GM_setValue = function (name, value) {
            value = (typeof value)[0] + value;
            try {
                localStorage.setItem(LOCAL_STORAGE + "." + name, value);
            } catch (e) {
                alert("localStorage (" + e + ")");
                throw e;
            }
        }

        //by froo
        GM_listValues = function () {
            var res = new Array();
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(LOCAL_STORAGE + ".", 0) == 0) {
                    res.push(key.replace(/^.*?\./, ""));
                }
            }
            return res;
        }
    }
}