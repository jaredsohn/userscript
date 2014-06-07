// ==UserScript==
// @name 	    Travian4 - Quick Links
// @version     1.0
// @developer   ww_start_t
// @size        8.20-KB
// @description For (Firefox, Chrome, Opera) You Can Add/Remove Links
// @include 	http://*s*.travian*.*/*
// ==/UserScript==

function ID(id) { return document.getElementById(id); };
function Child(tagName) { return document.createElement(tagName); };
function Remove(id) { return ID(id).parentNode.removeChild(ID(id)); };

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        };
    };
};

function setCookie(c_name, value, exdays) {
    var d;
    if (exdays) { d = exdays; } else { d = '365'; };
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + d);
    var c_value = escape(value) + ((d == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
};

function removeCookie(c_name) {
    return setCookie(c_name, '', '0');
};

function addQuickLinks() {
    var LinkName = window.prompt("- Please Write\n- Link Name:", '');
    if (LinkName) {
        var LinkURL = window.prompt("- Link URL:", window.location.href);
        if (LinkURL) {
            var targ = ID("QLbody");
            //--
            var tr = Child("tr");
            var td = Child("td");
            var img = Child("img");
            var a = Child("a");
            tr.setAttribute("id", LinkURL)
            td.setAttribute("colspan", "2");
            td.setAttribute("style", "text-align: center; border-top: 1px solid black;");
            img.setAttribute("class", "del");
            img.setAttribute("style", "float: left; cursor: pointer; margin: 3px 0px;");
            img.setAttribute("src", "img/x.gif");
            img.setAttribute("onclick", "if(confirm('- Deleting: " + LinkName + "')){Remove('" + LinkURL + "'); setCookie('T4-Links', ID('QLbody').innerHTML);};");
            a.setAttribute("href", LinkURL);
            a.appendChild(document.createTextNode(LinkName));
            td.appendChild(a);
            td.appendChild(img);
            tr.appendChild(td);
            targ.appendChild(tr);
            setCookie("T4-Links", targ.innerHTML, "365");
        };
    };
};
//////////////////////////////////////////


var img = {
    addLink_A: 'data:image/gif;base64,R0lGODlhMgAZAO4KAHax5TSO3RJ81xZ6ygt20kiX32er5bbU8oy+7L7a9czm/4zA8X6051Wg4mCm5R2C2iOF2Ax41qTL70aX3gAAAaTL8B2C21Wg4wcgNWCk4BB0yQU0XUiX4Hy26Bt5zQcSHQdYngtMhBZipRFmrg0iNgotTA1dogdYny+Czg5krhZipApnuBpko0h7qQdJgw9ruA05YBB0yBc9YQQpSV6h3Ap0zgpuxAY/cCx4vgQRHRVRhRIlNxNHcw1NhCBDYw9FdCZQdgdRkFqZ0gp100ON0SB8yyGA0TSO23Sw5Fye2DGG1DKI2AhfqxxssDZyqAxVlCZpplONwS5+xx5yuxdpsTp6tgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAnIAFYALAAAAAAyABkAAAf/gFZWHQOFhoeIiYqLix2CVgEOCpOUlZaXmJmZDgGDDgmgoaKjpKWmpwkOhAesra6vsLGys62FEhUVt7m3Erq9uMC7v73ExLnAvMm9hQjNzs/Q0dLT1M6FANjZ2tvc3d7f2YUODhnj5OPlSS005+bl6+XmUULl8efx9uOFBfz9/gVAdlThwOFfAQpEChTk58MJQYMQ+RUKQLGixQAfpJC4qARFAAoeAyzxKANKRRw4LqoMUMiCSwsPYspU0cMCBg8vf2AoUYICTio5YHzAIOKliKIvYcqUWUiA06dQMcQQ8CSE0xcYnKagMJWCBgEaKJgAqyFECA1foaotRKCtW7dY/9vWoND2RhC3FGykmOF2hgkCGzZgwBD4rWECbA8TGHKDgmPHTACDwGvjxAa3Gya3BaFZsdtCEUKLDk2AbgQCEVZgIODCBWkKNVSjjoDhhGgTtkfrDj3Ag9qnI0qopQD2w9cQXgV8GCFgBAUVv6NDLQShuvXqJJpch8BDB4QpHyiwoFAEghESFGTAYLG9fXsPHlbKn08/wJH6LAdMmPBv/35//gUo4ID/QfRQARMU0sCCDDJ4wYMNRiihhA9WaCGEDBZiwIYcdujhhyCGKCKHAwQAzokAIIHiigE04AADMMYo44w01mjjjB3A2EEHDjQAiQELBCnkkEQWaeSRR3LySBoDAQhggZNQPiCAlFROaWWVWF651JYPtChIIAA7',
    addLink_B: 'data:image/gif;base64,R0lGODlhMgAZAO4FAMjj+Nzo8JC006PR8a/W8Nrs+tbo9MHh99Hk8svh8Lze947H7LnX77TY84jC6gAAAZ/O7cTe7oy418Td74awzE1faoawzZrG5RccHyEvOZ3J6K3J37PX8ZTI7X+13IfB6UFYabnX7oq73nWas3udtVN3kIW63ZG/4FdiaW+QpUBLU1t7kVpxgDxWaGSAlKm+zsvh73qry4W+56TI4azS7CgzOyk0O4ShtS9EUjZHUz9YaDtKVDlJVKLQ8H6lwW6dvouis3Wnyr3V5ZG/33uv1H+Uo1dvgFZwf4eYo2uWsXWSpWqMpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAnIAEwALAAAAAAyABkAAAf/gExMFwKFhoeIiYqLixeCTAIRBZOUlZaXmJmZEQKDEQGgoaKjpKWmpwERhKisra6ghaAFAbO0sre2trO1u7q5vL6zEgIGxcbHyMnKy8zGhQjQ0dLT1NXW19GFCdvc3d7f4OHiCTAwhRERE+joE+0vKOnt6uxCKPLtES9I6/zx8fKcBDAYODAEQQYqVBQ5eHDDA4YMgKCASJFBiIuFCGjcuJEGhg0YOHKc8UAkgRsVOFa4YVJkoQEwY8ZM4WJABQkyKzyo4eIBTA01HvAwUiEnCZlIYRZywLRp0wxEHATJ8IFpixIfZGR44OADhh8OPDxokdWDBxwlzFZ12rTQgrdv/x28NYFBrgMMJhY44Po2BtcYGfQuKKFjQZIHiBPnhQvXgVvGCzR0WJEY8YoFIh681ZC5wwgQkT2DhgtixIIOHSDDLQShtevWGCycODEks4YLD1pzzu0jh+slFV6Xfk0cgoaXSSVkQFrhaIajA474hPDgBMwMRWfiTCozI4EBHFkoESkhZA8MO2ywKElAwoMKNioU1QiefkuNhRro399gBv/9GwBIQAMB6sdBgBzQ8N+CCw6jwIMQRqgAAxFSKOGFGGYIIQOFHODhhyCGKOKIJJb44TAApKjiiiy26OKLMKoowAUcxGjjjThy4AiNOPboY4o6PnKBBRRQIEGRRxqJpBSSEljQZJNGEglllFFC+aSUjjARCAA7',
    Links: 'data:image/gif;base64,R0lGODlh3AAeAN0BANjY2Pf39+fn58/Pz+/v78jIyOLi4sTExJmZmTMzMwAEBtfX1/b29t/f3+7u7mBgYGZmZszMzGlpaWRkZG1tbXFxcSEhIdHR0R8fH7a2tru7uz4+PpWVlVlZWXp6ejk5OY2NjVZWVqampnV1daqqqsHBwZycnDY2NiAgIJ6enrCwsOHh4WdnZ4eHh5iYmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAnIAC8ALAAAAADcAB4AAAb/QIRwSCwaj8ikcslsOp/QqHRKTSYQh6x2y+16v+CweEwum8/otHr9vRbe8Lh8Tq/b7/i8fs/v+/+AgXVuBQNvhoWHiomMiI6Lj42Qk5KVkZeUmJaZnJuemqCdoZ+ilFcDqKmqq6ytrq+wsbKztLW2t7i5uq4fCAC/wMHCw8TFxsfIycrLzM3Oz9DRxVfS1dbX2Nna29VXBgDf4eDj4uXk5+bp6Ovq7ezv7vHw8/L19Pf2+eveBv0GAv4A9hP4L6DBgQcLIlyosCHBhwkhMgT4S+IABQgkOuynQELEjxNBbgxJcqRJjShBXhHAsqXLlzBjypxJs6bNmR1jalDg4SbL/5w+gwodSnToP5YriypdytSlAggyGwh92rSq1asCCCBFQKCr169gw4odS7as2bNjHXREa1atBLZw48qdS7ergCtdA+TdS0BvX75+AwMe/LewYMOEDysmzGAtAwKPH3vVK5gl38ZvI0Pe/Lgf4s+LQSceLbp06NN5rwRYzbq169ewY8ueTbt27MYVYAtQoIG1ggoENigYDoA1btYLFHRYTYDC8OF9bUufTr06bdXWs2vfHvs3bAIKDvjuYOGAAwAWFDjwnTvA7uWrN1gYoNVEdO7481NPkEK///+y8QSbWgX4psAArDWgQAa+ebCaBRuwBh6DAFZoYWvYXaghdwpQwP/Aa7tp8GEACmww4mod+uahBRbcB56HG8aYXy9/UWZjdDgyp+ONO+bI448+BtnjkDd+CFlHlEGm124ZRNZhZI91uJkCIYRgQVZ6PebcBggKCSSRXoYJ5phflhkkAXjVpeaabD7lQFgGKKCCA2+6SSedCrDwJngYUJkVWBn0icIBbBZqaFxJYaXoortB4ABLj7IEwIICPJrTo5ZKUGmjBSjXUqQsFfCBAgUwaupViZ6qalFUwTQpCS21GitUP0FlggIg4ETrqrwK1Ys/Cgkk7ELDBkvsscYmW+yyyDL7zwpPAftPA8mR0I+CEwCL7bRUGQACrtdqy5OyzZZL7rnOpmv8rrP9UNMPPvDqI2+86CiAwQMT5DuBCwBcoIAIDQSswAMBAyAwwQ1MSrDBEyjQQgMDYDCCCCKccGDCBhQ878b0cpwONdyErM0DJJc8AQcADPCABsA8gHIwLrf8MgALVDCBBjX3KXEBIveMzSk+B93MAkQvMADRRx9dtNFLN+300kkzrbTSRAtttTIDnLLL1lxzbXTXqHwdi9hgl222Km6crfbZF6hSSNlvq9J2KnNfYHfca+dtCyGC9O3334DPEcHghEdQAOGBJ644HFew4fjjkB9QQORZTN5FCVxgTvnmnGeRwOeghy766KSXbvrpqKeu+uqst+7667DHjnoQADs%3D'
};

var functions = '/* Travian Quick Links Functions */\n' + setCookie + getCookie + removeCookie + ID + Child + Remove + addQuickLinks + '';
var script = Child("script");
script.setAttribute("type", "text/javascript");
script.appendChild(document.createTextNode(functions));
var Target = document.getElementsByTagName("head")[0].getElementsByTagName("script")[0];
Target.parentNode.insertBefore(script, Target);

function QuickLinks() {
    var GET;
    if (getCookie("T4-Links")) { GET = getCookie("T4-Links"); } else { GET = ''; };
    var div = Child("div");
    div.setAttribute("id", "QLinks");
    var table = Child("table");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("style", "border: 1px solid black;");
    var thead = Child("thead");
    thead.innerHTML = '<tr><td colspan="3" style="text-align: center; background-image: url(' + img.Links + ');">' +
                      '<img src="' + img.addLink_A + '" onmouseover="this.src=&apos;' + img.addLink_B + '&apos;" onmouseout="this.src=&apos;' + img.addLink_A + '&apos;" style="float: right; margin-top: -5px; cursor: pointer;" onclick="addQuickLinks();" /></td></tr>';
    var tbody = Child("tbody");
    tbody.setAttribute("id", "QLbody");
    tbody.innerHTML = GET;
    table.appendChild(thead);
    table.appendChild(tbody);
    div.appendChild(table);
    ID("side_info").appendChild(div);
};

if (ID("side_info")) { QuickLinks(); };
/*   var X = '\/\/\'.toString();  if(X = true){}       */
