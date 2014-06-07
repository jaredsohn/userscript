// ==UserScript==
// @name            ebay-list-watch
// @namespace       http://userscripts.org/scripts/show/40092
// @description     adds a watch-list button to ebay list views
// @include         http://*.ebay.co.uk/*
// @include         http://*.ebay.com/*
// @exclude         http://my.ebay.co*

// ==/UserScript==

// allow automatic change of .co.uk, .com etc.
tld = window.location.hostname.split('ebay')[1];

myEbayURL = 'http://my.ebay' + tld + '/ws/eBayISAPI.dll?MyEbayBeta&CurrentPage=MyeBayNextWatching';
myAddURL = 'http://cgi1.ebay' + tld + '/ws/eBayISAPI.dll?MakeTrack&item=';
myEbayURL = 'http://my.ebay' + tld + '/ws/eBayISAPI.dll?MyEbay&gbh=1&CurrentPage=MyeBaySummary&ssPageName=STRK:ME:LNLK';
placeholderImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAMAAAAHtrtKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXRQTFRF5+fn0tLSxMTEoqKimZmZAAAAWVhYjIyMlpaW09PTtra2ioqKhYSEAwMDgH9/d3d3nZ2dk5OTkpKSu7u7YmFhhIODj46OkJCQxcXFmpmZnJycr6+viIiIoaGhlZWVqKiopaSkSUlJe3t7YWBgc3JycXBwaWlpzs7OhoWFfHx8YF9fuLe3SkpK7OzsjY2NdnZ2pqWlmJeXbm5uWVlZfn19fX19rKysr66u2traYGBgi4uL29vbenl5urq6RUVFpKSk19fXfXx84uLivb29oKCgbGxscnJyVVVV5OTkZmVlWlpaT09P9PT0rq6uQkJCiYmJZmZmgICAh4aGgoKCZGNjbGtrX15emJiYdXV1e3p6Y2JiZWRkv7+/Ozs7iomJcG9vkZGRkI+PcXFxeHd3s7OzTExMgYGBXVxcZ2Zmo6Ojp6enqqmpq6urtbW12dnZ4ODg8fHxlJSUh4WFj4+POjo6dHR06enp7e3t9/f3h4eHf39/zMzMGuZN2wAAAb1JREFUeNqk0ldz3CAUBtALaFHbbO9r73qrY8e99957S++9CZSeSPz5SHEm0kSPnBkuXGC+FwC9rn2WpL3XgWR/SMsSKA7/kjZchIW9o0+SjvYWwJn7KW3OgUsdIPYPhPTcAujzR5+3vgdwTOlt6oP/6ZcwLTbs2Je/YnbIeK9t3xz3xit7LUfXbLvgbfQW7IgNMQ3J0iIPYnjImMp5Lsd5+xE/bt8f41xNcZ5SecRiKQk7WR0FMShkuYM+djrLiCL0rFx+g9BpGaHyKYrQszuwbfSLIEaE4JYoaAWNPRWixVhLiAtNCO1CRPQb23A2U8JBDA57Z0zMbq1vrePZQYwHP+B8BuNMHkeUZs5gfnWTBTEs7GXxIaveMfPM9N8nz6ZMxswpFrG5Og8HFcMKYqww98q1rO6VaXXjlvW8ay15U3zJijAqB7Bbq5IghoTF6RNCEjSdomlCvDKa8NpRQu7SBHnwwjtOX9+r1nbhcKSu3PD9+X5KmPrWL7Tm7vvdfpPSHqXZVpQibSq5CcWl6vW9+sghDDnkqyTiDMHKecWRVDlfgZOBjCspM3ACjcnv0iYbkHz9+JusRvK3AAMA99rMxAbU0C8AAAAASUVORK5CYII=";
unwatchedImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAMAAAAHtrtKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYBQTFRFxMTEmZmZtbW1zMzM4ODg5+fngoKCYWFhd3d309PTe3t7Dg4OAwMDqKioKysrenp6tra2bW1tcHBwi4uLYmJiaWlpTU1NW1tbnZ2du7u7PDw8o6OjnJycxcXFHx8flZWVKSkpl5eXVlZW0dHRbGxsUlJSXFxcjIyMcnJySUlJkJCQKioqIiIiFxcXT09PjY2N29vbZ2dn5OTkrKysDQ0Ng4ODS0tLwsLCVFRUkpKSvb294uLiGhoaDw8PgICAQkJClpaWqqqqRkZG9PT0X19f2NjYpKSkfX19dnZ2MDAwZmZmUFBQ7OzsvLy82traSkpKRUVFWlpaPj4+kZGRQUFBJycnVVVVDAwMWVlZzs7OfHx8LS0tYGBgLi4umpqar6+vCgoKHR0dGxsbsbGxGBgYfn5+hYWFV1dXhoaGiIiINDQ0vr6+TExMODg4qampyMjI0tLSoqKi2dnZq6ur8fHxf39/lJSUj4+P6enp7e3t9/f3Ojo6h4eHdHR0////AAAA6+SfEAAAAglJREFUeNqkkOVzGzEQxdfH56sdY8wQQ8zhNMzUMMfBugwpWac2aRu7+tcj6Tq9fr/fjHZX7+08zQh0z+KdQxYTOqDYT8fEEFR3fjtmpwrBkZXvDlkZCUJn75dj9jqg6LJM/iEzep/LspsdN51v5G/cca/1EnK0xjT5KGjtEWINugIb4oxE/vyFSIywJklPw/RkpPwcyVOFTEjS1VVeik9o1JPiH/heXMrMsT4jboCWGjLtGJOhvDdNwzBNb8s89j4oVCG7pvKSe90uLVxj7BqsDqU0KMf0th3TZnhq7VKt5mnTWygQWKYK8bWXQ9wLBGj58rZtEeKiHitDwXch2jEi45MhrvpX/YmsKBqJhEEV8lp81cM9P/8oaxY/Znm78BVgazQFdgxwZpdOo+Mn4ycQHQMYqwKQJZh9xq1wmJZba4bTKG+p0S24Xp8W7BiBE/e/Eb421UlBZU9PCgKJCpsqt1TWNv3WXvOYt+n1azhM+rAdgznbjW2M641hXI9gXK5jTO5wpMGtCFXwzTD+H1/yEM4yLWTHII5KCgjliNJHFIRYISXU1/Qi5C3lctT3qtZe2uqtzBkMDHpcTxj871ycnheskPv+NLuliy7yjt7ThNy6ikWqZPutvbTVPYMDsN9B9w5BnX04mE92HJKcP4CFy6kfDpm6XIDKedcx5xXQPscfnFLRHgUYADv550RpakVnAAAAAElFTkSuQmCC";
watchedImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAMAAAAHtrtKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYBQTFRFx9t2pMMoOkIYR0dHS1MrlZWR1/dUVGMUNjRJKTELqamkqMgpIioINTU1iaIhk64jlrIkOjo6WWoVgZkf5uSce5EeN0ENpaSdTVsTjouTPj4+LTIaf5UerKqTUVFRbYIbND0MCwwDXW4WdYocan0aiISGmbUludssGBwGoL4nHiMIjacimpmVQU0QSFUSZHcYDRAECwoURFAR1fZMzfMyv+Qun7smsdErx+ww3fht/fyc5fmPeoVMzvQzstMrgJQuLjcLt9ksUF8TwOUuXm8Xd44drMwqPUImeI4diZVWdoQ6n70mZ3Qzzudmc4kc8/zM6vumj6kjmaZff5gf4vmAcoMpVWIeorZQQEwP1uiFYHEXZnoZcIQbhZVB3/h36Oaeye8wwNlaERAaW1plqLdputhA3+LOnLQ4wL6nf4OBqsU94OTQREFcmpiAkaU+2eSxgoxrhIt1j5V+zd6Mp8Yo8Py+6/ur9/3afZMekawjOUMOjKYi5/qYcoYchJ0gAAAADbCt0QAAAoZJREFUeNqkkmlT2lAUhi8RhaiEEAERUEAiIipEspAQQZaIC67FfdfW1m7a2qjVtpy/3pPUGacfHZ6ZPGfyvjc3y4SUHN7HDvE2S0Sp/u6YqkImNx7+43Pv+4fXsjFJmK31uxduBoc83XevZH2LIe2e+xdupnwez+39a+lpk1ZJ1+GZmS8+38fbH843uj5rHbO67ozoxO5m950AC/tWpi8s6QsYvVtCRZZ0vdQiAfVEg6LN6VTY951o2sqypjlX8LjWVgVY1TQNzjUtElnVqPNl7DTqWKN2cR5TuBh2T9QASdZ7xOdthsO+b+eiKM7tiKIgiCL9SbymqTlM4FKcy4gW29sozKgP1kIKtUP11JPkqFqS/m3j7w67LyXEQUsMTTskkKSDWCyPCZSl/IFVSbEYKhiQgizOQBDFCqXqEeHLZ+rF1ZW/6J8Ke9yqxbigjvKjfJNWVaHZFDCBhppetDve/lDzahzdmI9j0oCzMk9yfXX57cjIoB9faWxGtqinTTrV2mvtySlBloVJWQaznl6zu8NDVHxNjmMqr8VRJtT7csSYGC9c9I50dQ/5PF+hYPPEpwuOhOEqGNatXYUCpAoVw64Ma1T4QmUAJ19BJRPjEwbhUmUTTge7wj7PmB9Mm1A6ZJr96ZzZz5nmUb9pwqPJpe2Kw8Ss5MxKAGeuggrmyymOuLwNBYr+YethiqDYGMAriguiXogqiiVgFG+CVhSacbmwpw2FTlrrMIonmIbXRUKMg7V/Pbd7BoC1WUxYgl9cxjrL1FgYwPMMQJyt1TChOZbGS2ocih5gHUyIZNvKrw5R2lmSj6baHZKK5sl0YPNnh2wGpkmW+9MxXJYks08dk03+FWAAeWjdJPfRficAAAAASUVORK5CYII=";

// using img.src to load transactions is a quick hack, but it works, quickly, and from outside GM.
requestImg = document.createElement('img');
requestImg.name = 'requestImg';
document.body.insertBefore(requestImg, document.body.firstChild);

// loop through all the items listed on the page
var cells = document.getElementsByClassName('ttl'); // list view
if (cells.length == 0)
{
// TODO: shop view currently doesn't work - it submits the surrounding form.
//    cells = document.getElementsByClassName('ens fontnormal'); // shop gallery view
}
if (cells.length == 0)
{
    cells = document.getElementsByClassName('ttl g-std'); // gallery view
}
var numCells = cells.length;

// only install if the user is logged in and we've found the elements to change
tmp = document.getElementById('dynamicmenu-hdrCtr');
if (tmp != null && tmp.innerHTML.indexOf('GREETING:SIGNEDIN') > -1 && numCells > 0)
{

    // put placeholder "loading..." elements in while the script does its thing
    newHTML = '<br /><input disabled="disabled" value="wait..." type="image" src="' + placeholderImg + '" />';
    for (var c = 0; c < numCells; c++)
    {
        anchor = cells[c].getElementsByTagName('a')[0];
        cells[c].innerHTML += newHTML;
    }
    
    // request the "my ebay" page
    GM_xmlhttpRequest(
    {
        method: 'GET',
        url: myEbayURL,
        headers:
        {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails)
        {
            var myEbayContents = responseDetails.responseText;
            for (var i = 0; i < numCells; i++)
            {
                anchor = cells[i].getElementsByTagName('a')[0];
                id = anchor.href.match(/itemZ\d+/);
                
                if (id)
                {
                    // extract just the numerical part, which is the ID.
                    tmp = '' + id;
                    id = tmp.match(/\d+/);
          
                    // see if that ID exists on the My Ebay page - which means it's being watched already  
                    onWatchPage = (myEbayContents.match(id) == null) ? 0 : 1;
          
                    itemID = 'xyz_item_' + i;
                    statusID = 'xyz_status_' + i;
                    imageID = 'xyz_image_' + i;
                    anchorID = 'xyz_anchor_' + i;
                    title = onWatchPage ? 'this item is being watched in My Ebay' : 'add this item to your watch list';
                    newHTML  = '<a href="javascript:void(0)" id="' + anchorID + '"><img id="' + imageID + '" name="' + imageID + '" src="' + (onWatchPage ? watchedImg : unwatchedImg) + '" title="' + title + '" /><input id="' + statusID + '" name="' + statusID + '" type="hidden" value="' + onWatchPage + '" /><input id="' + itemID + '" name="' + itemID + '" type="hidden" value="' + id + '" /></a>';

                    // hide "loading..." element
                    tmp = cells[i].getElementsByTagName('input');
                    if (tmp)
                    {
                        tmp[0].style.display = 'none';
                    }

                    // add proper button
                    cells[i].innerHTML += newHTML;
                    el = document.getElementById(anchorID);
                    
                    // add event handler
                    el.addEventListener("click", function(e)
                    {
                        var i, anchor, item, status, button;
                        
                        anchor = e.target;
                        i = anchor.id.split('_')[2];
                        item = document.getElementById('xyz_item_' + i);
                        status = document.getElementById('xyz_status_' + i);
                        button = document.getElementById('xyz_image_' + i);
                        
                        if (status.value == '0')
                        {
                            requestURL = myAddURL + '' + item.value;
                            requestImg.src = requestURL;
                            button.src = watchedImg;
                            status.value = 1;
                            anchor.title = "this item is being watched in My Ebay";
                        }
                        else
                        {
                            if (confirm("Cannot remove items from watchlist directly\nGo to My Ebay?"))
                            {
                                window.location.href = myEbayURL;
                            }
                        }
                    }, false);
                }
            }
        }
    });
}
