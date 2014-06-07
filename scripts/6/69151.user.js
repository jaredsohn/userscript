// ==UserScript==
// @name           Blip.pl - Rdir.pl stats and re.blipi.pl
// @namespace      http://userscripts.org/users/20935
// @description    Rdir.pl stats and re.blipi.pl mashup
// @author         Wojciech 'KosciaK' Pietrzok
// @version        0.4
// @include        http://rdir.pl/*/stats
// ==/UserScript==

(function() {
    url = document.documentURI;
    rdir_id = url.substring(15, url.lastIndexOf("/"));
    reblipi_url = "http://re.blipi.pl/" + rdir_id;

    GM_addStyle("#loading { display: block; margin: 1em auto; }");
    GM_addStyle(".avatar {margin: 0 0.25em 0 0.5em; vertical-align:middle;} br {margin-bottom: 1em;} ");
    
    box = document.evaluate('//*[@class="module"]', 
                            document, null, 
                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                            null).snapshotItem(0); 

    header = document.createElement('h3');
    header.innerHTML = 'Magia reblipi <a href="' + reblipi_url + '">' + 
                       reblipi_url + '</a>';

    loading = document.createElement('img');
    loading.setAttribute('id', 'loading');
    loading.setAttribute('src', 'http://blip.pl/images/ajax-loading.gif');

    box.appendChild(header);
    box.appendChild(loading);

    GM_xmlhttpRequest({
        method: "GET",
        url: "http://re.blipi.pl/" + rdir_id,
        onload: function(response) {
            var responseXML = document.createElement('html');
            responseXML.innerHTML = response.responseText;
            
            results = document.createElement('ul');
            addedBy = document.createElement('li');
            addedBy.innerHTML = 'Dodane przez: <br />';
            results.appendChild(addedBy);
            
            quotes = document.evaluate('//li[@class="content"]/p', 
                                 responseXML, null, 
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                 null); 
            
            for (i=0; i < quotes.snapshotLength ; i++) {
                quote = quotes.snapshotItem(i);
                item = document.createElement('li');
                
                link = quote.parentNode.parentNode
                            .getElementsByTagName('a')[1];
                
                img = quote.parentNode.parentNode
                           .getElementsByTagName('img')[0];
                
                name = img.getAttribute('title');
                name = name.substring(1, name.length);
                
                image = document.createElement('a');
                image.setAttribute('href', 'http://blip.pl/users/'+ name +'/dashboard');
                image.appendChild(img);
                
                author = document.createElement('a');
                author.setAttribute('href', 'http://blip.pl/users/'+ name +'/dashboard');
                author.innerHTML = name;
                
                content = document.createElement('span');
                content.innerHTML = ': ' + quote.innerHTML
                
                item.appendChild(link);
                item.appendChild(image);
                item.appendChild(author);
                item.appendChild(content);
                item.appendChild(document.createElement('br'));
                
                results.appendChild(item);
            }
            box.replaceChild(results, loading);
        }
    });

})();
