// ==UserScript==
// @name           Amazon Search Add to Listal
// @namespace      http://www.paulshannon.ca
// @description    Add items to your listal account from the search screen
// @include        http://www.amazon.tld/*
// ==/UserScript==

var issearch = document.evaluate("//td[@class='dataColumn']/table/tbody", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (!issearch) return;

for (var i = 0; i < issearch.snapshotLength; i++) {
  var avg = issearch.snapshotItem(i);
  
  var a = avg.firstChild.firstChild.firstChild.nextSibling.href;
  if (!a) continue;
  
  var b = a.match(/\/(B\w{7,9})\//);
  if (!b) b = a.match(/\/(\d{7,10}X?)\//);
  if (!b) continue;
  
  var asin = b[1];
  
  var n  = avg.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));

  var box = document.createElement('div');
  box.style.padding = '5px 10px';
  box.style.border = '1px solid #66c';
  box.style.background = '#ffc';
  box.style.margin = '2px';
  box.appendChild(document.createTextNode("Listal: "));
  n.appendChild(box);
  
  var link = document.createElement('a');
  link.style.color = '#663';
  link.href="http://www.listal.com/addasin/?asin="+asin+"&collection=Add to collection";
  link.appendChild(document.createTextNode("Add to Collection"));
  link.target="_blank";
  box.appendChild(link);

  box.appendChild(document.createTextNode(", "));

  var link = document.createElement('a');
  link.style.color = '#663';
  link.href="http://www.listal.com/addasin/?asin="+asin+"&wanted=Add to wanted";
  link.appendChild(document.createTextNode("Add to Wanted"));
  link.target="_blank";
  box.appendChild(link);

}

        /*,addTolistal: function(event){
            event.preventDefault();
            var command = this.innerHTML;
            var collection = this.id;
            var asin = listalButtons.getISBNorASIN();
            GM_xmlhttpRequest({
                method:"GET",
                url:"http://www.listal.com/addasin/?asin="+asin+"&"+collection+"="+command,
                onload:function(details) {
                response = details.responseText;
                if (/Added/g.test(response)){
                    document.getElementById('listalButtons').innerHTML='<p style="border: 1px solid #66c; font-weight: bold; margin: 2px; padding: 5px 10px; background: #ffc;">Item added to <a href="http://www.listal.com">listal</a>!</p>';
                }
                else {
                    document.getElementById('listalButtons').innerHTML='<p style="border: 1px solid #66c; font-weight: bold; margin: 2px; padding: 5px 10px; background: #ffc;">Error occured attempting to add item to listal.<br/>Are you logged in?<br/>Has listal been updated recently?</p>';
                }
            }
            });
            return false;
    */