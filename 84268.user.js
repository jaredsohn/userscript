// ==UserScript==
// @name           Grease Reader 2
// @namespace      http://userscripts.org/users/6989/grease-reader-2
// @description    Enhance the Google Reader user interface.
// @include        http://www.google.com/reader/*
// ==/UserScript==

(function (document, console) {
    try {
        var $A = Array.from = function (iterable) {
            if (!iterable) {
                return [];
            }

            if (iterable.toArray) {
                return iterable.toArray();
            }
            else {
                var i, results = [];

                for (i = 0; i < iterable.length; i = i + 1) {
                    results.push(iterable[i]);
                }

                return results;
            }
        };

        Function.prototype.bind = function () {
            var method = this, args = $A(arguments), object = args.shift();

            return function () {
                return method.apply(object, args.concat($A(arguments)));
            };
        };

        var xpath = {
            hasNode: function (xpath, contextDocument, contextNode) {
                if(!contextDocument) {
                    contextDocument = document;
                }

                if(!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate('count(' + xpath + ')', contextNode, null, XPathResult.NUMBER_TYPE, null).numberValue != 0;
            },

            stringFor: function (xpath, contextDocument, contextNode) {
                if(!contextDocument) {
                    contextDocument = document;
                }

                if(!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.STRING_TYPE, null).stringValue;
            },

            countFor: function (xpath, contextDocument, contextNode) {
                if(!contextDocument) {
                    contextDocument = document;
                }

                if(!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate('count(' + xpath + ')', contextNode, null, XPathResult.NUMBER_TYPE, null).numberValue;
            },

            nodeFor: function (xpath, contextDocument, contextNode) {
                if(!contextDocument) {
                    contextDocument = document;
                }

                if(!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            },

            nodeIteratorFor: function (xpath, contextDocument, contextNode) {
                if(!contextDocument) {
                    contextDocument = document;
                }

                if(!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            },

            nodeSnapshotFor: function (xpath, contextDocument, contextNode) {
                if(!contextDocument) {
                    contextDocument = document;
                }

                if(!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            }
        };

        function TwitterFactory() {
        }

        TwitterFactory.prototype.div = function(href, text) {
            var div = document.createElement('div');
            var a       = div.appendChild(document.createElement('a'));
            var img     = a.appendChild(document.createElement('img'));

            a.href = 'http://twitter.com/share?url=' + href + '&text=' + text;
            a.target = '_blank';
            img.src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%007%00%00%00%14%08%03%00%00%00%1E%3DU%EC%00%00%00%C3PLTE%00%00%00%D8%EB%F6z%B8%DFn%A1%BA%E7%EF%F3%B4%CE%DF%9A%C0%D4%DE%E9%EF%9A%BC%CC%C4%E6%F2%BE%E3%F1%C2%DD%ED%5B%93%AE%89%CF%E7%92%B8%CA*p%91%BB%D9%EC%AD%CC%DC%B5%E0%EF%81%AB%BE%AE%C6%D5%9A%D5%EAE%82%9F%9F%D9%EC%3F%7F%9C%1Bf%89%CF%E6%F4%E0%EB%F0%F4%F6%F7I%B5%DA%BB%D0%DE%B6%CC%D9%CF%E3%F0%A4%C5%D6%3A%7C%9A%CC%E0%ED%3D%B2%D8W%8E%A9%0A%9D%CEz%A5%B93v%95%D6%E6%EEb%96%AE%8D%B4%C5%C8%E0%EF%27n%8E%C4%D8%E5%BD%D4%E0%20j%8Bk%9D%B4L%87%A3%18d%87%DE%EF%F7%F2%F8%FC%00%99%CC%F1%F5%F7%E5%F0%F7%A4%BD%CC%E8%F3%F9%F9%FC%FD%A4%CC%E5%D5%E8%F5%F7%FA%FD%FF%FF%FF%DB%EA%F5%E7g%AC%AA%00%00%00%01tRNS%00%40%E6%D8f%00%00%01pIDAT8%CB%9D%D3%D9r%9B0%14%80a%D2%A4m%9C%3D%DE%E2%7D%C3%180%9B%84%8E%D1%F1%09%C5z%FF%A7%8A%84%D5%C4%17%9EL%F0%7F%A1%05%F4%CD0%0C8N%5C6%2Fv%9Cxth%DE(v%CA%C3%25%95N%F9~I%DAU%9F%8D%DA%D5O%3Bu%8F%C5%5D%13%B7%B3%B5%8Bb%DD2%8Ben%8Av%E7r%C3%E3%AC%9D%B4M%0B%1D%E8%85%1B%F9%82G%A9%3CW%CE%8F%B3vd%82%BB%91a%C5z%03%24%AB%B1H%AB%A8C8Hi%EE%D1%D3j%B5%27%9A%F5%03%9F%5E%D9s%1E%9A%F3%D6%B5%1F%D75%2B6%3D%B3%0DEF%FB%84%96%82%D3%C3%F6%0F%9Bw%D9%AB%CB%A2%2C%F0%C3%20%EF%E2%89%9B%16%B6%F5TZ7%1E%CE%3C%2F%19%B3y%FF!%CB%FA%9E%1F%A4%99%CFH%3F%27Y%87%BA%0A%DE%8E%0E%CC%0E%17%22C%F48%FB%9B%F0%84V%AB%ED%96%2F%AF%13%3Dv0%E7%F5%01%B4%0E%AF65%7B%C3%2F%D7%1D%0E%88%0F9v%82%B1%BC%0Dg%2C%AD%E63%CC%F3%C5%7F%07%D0%EAM-%23%A8S%89%0B%80%C9%13%A4%22%05%DA%0A1XP%C4%C4%F3oX%8A%A1kNh%A7%14RO%BF%96%CD%2F%20u%0C%0E%A8%87%89T8A%05%BB%89%7C%07%25%AB%1B%7D%95%E4%04%CC%89%DA)E%95%FEVw%A0%BE%ED%F4%B6u%8D%D3%EE%DF%25%95%CE%FD%CB%05%ECE%FF%F0%F7%FB%E6%C5%CE%07Go%EB%04%18%3A%D2%E7%00%00%00%00IEND%AEB%60%82';
            img.style.borderWidth = '0px';


            return div;
        }

        function FacebookFactory() {
        }

        FacebookFactory.prototype.div = function(href, text) {
            var div = document.createElement('div');
            div.style.fontSize='8pt';
            div.style.border='1px solid rgb(59, 89, 152)';
            div.style.borderRadius='2px'
            div.style.padding='2px 2px'
            div.style.background='rgb(59, 89, 152)';
            div.style.height='14px';

            var img = div.appendChild(document.createElement('img'));
            img.src = 'data:image/gif,GIF89a%0E%00%0E%00%F7%00%00%3BY%98Eb%9E%60x%ABay%ACm%84%B4%EB%EE%F4%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%0E%00%0E%00%00%08B%00%07%00%18H%B0%E0%40%81%06%13*%24(%A0%80%01%03%0B%07%3A%7C%18%11%00%C5%8A%16!F%7C%C8Qc%C2%02%13AV%BC8%D2%E3F%93%01%08%A8%5CI%E0%E1%CA%00)Y%AAt%A92%00%C2%8A%03%02%02%00%3B';

            var a    = div.appendChild(document.createElement('a'));
            a.style.color = 'white';
            a.style.verticalAlign='top';
            a.style.padding='2px 6px 2px 2px';
            a.href   = 'http://www.facebook.com/share.php?src=bm&v=4&i=1283035698&u=' + encodeURIComponent(href) + '&t=' + encodeURIComponent(text);
            a.title  = text;
            a.target ='_blank';
            a.appendChild(document.createTextNode('acebook'));

            return div;
        }

        function GoogleReader() {
        }

        function GreaseRule(entrySourceTitle, entryAuthorName, xpath) {
            this.entrySourceTitle = entrySourceTitle;
            this.entryAuthorName = entryAuthorName;
            this.xpath = xpath;
        }

        function GreaseEntryContainer(div) {
            this.div = div;
        }

        GreaseEntryContainer.prototype = {
            entryTitleNode: function() {
                if(!this.entryTitleNodeInner) {
                    this.entryTitleNodeInner = xpath.nodeFor('.//h2[@class="entry-title"]', document, this.div);
                }

                return this.entryTitleNodeInner;
            },

            entryAuthorName: function() {
                if(!this.entryAuthorNameString) {
                    this.entryAuthorNameString = xpath.stringFor('.//span[@class="entry-author-name"]/text()', document, this.div);
                }

                return this.entryAuthorNameString;
            },

            entrySourceTitle: function() {
                if(!this.entrySourceTitleString) {
                    this.entrySourceTitleString = xpath.stringFor('.//a[@class="entry-source-title"]/text()', document, this.div);
                }

                return this.entrySourceTitleString;
            },

            entryTitleLink: function() {
                if(!this.entryTitleLinkString) {
                    this.entryTitleLinkString = xpath.stringFor('.//a[@class="entry-title-link"]/text()', document, this.div);
                }

                return this.entryTitleLinkString;
            },

            entryTitleLinkHref: function() {
                if(!this.entryTitleLinkHrefString) {
                    this.entryTitleLinkHrefString = xpath.stringFor('.//a[@class="entry-title-link"]/@href', document, this.div);
                }

                return this.entryTitleLinkHrefString;
            },

            imgNodeSnapshot: function() {
                return xpath.nodeSnapshotFor('.//img', document, this.div);
            }
        }

        function GreaseReader() {
            GoogleReader.call(this);
        }

        GreaseReader.prototype = new GoogleReader();
        GreaseReader.prototype.ruleArray = [
        new GreaseRule('', '', './/p[iframe]'),
        new GreaseRule('', '', './/div[a/img[starts-with(@src, "http://feeds.feedburner.com")]]'),
        new GreaseRule('', '', './/a[starts-with(@href, "http://ads.pheedo.com")]'),
        new GreaseRule('', '', './/p[a[starts-with(@href, "http://api.tweetmeme.com/")]]'),
        new GreaseRule('', '', './/img[starts-with(@src, "http://segment-pixel.invitemedia.com/")]'),
        new GreaseRule('', '', './/img[starts-with(@src, "http://pixel.quantserve.com/")]'),
        new GreaseRule('', '', './/img[starts-with(@src, "http://feeds.feedburner.com/")]'),
        new GreaseRule('', '', './/a[starts-with(@href, "http://www.facebook.com/sharer.php")]'),
        new GreaseRule('', '', './/a[starts-with(@href, "http://api.tweetmeme.com/")]'),

        new GreaseRule('INHABITAT', '', './/small'),
        new GreaseRule('INHABITAT', '', './/hr'),

        new GreaseRule('Uploads from Goddard Photo and Video Blog', '', './/b[contains(text(), "Follow us on")]'),
        new GreaseRule('Uploads from Goddard Photo and Video Blog', '', './/b[contains(text(), "Join us on")]'),
        ];

        GreaseReader.prototype.listen = function(event) {
            if(event.type == 'DOMNodeInserted') {
                if(event.target.className.indexOf('entry-container') != -1) {
                    this.onNodeInsertedEntryContainer(event);
                }
            }
        }

        GreaseReader.prototype.onNodeInsertedEntryContainer = function(event) {
            try {
                var entry = new GreaseEntryContainer(event.target);

                this.onNodeInsertedEntryContainerRemove(entry);
                this.onNodeInsertedEntryContainerEdit(entry);

            }
            catch(e) {
                console.log(e);
            }
        }

        GreaseReader.prototype.onNodeInsertedEntryContainerRemove = function(entry) {
            for(var ruleIndex = 0; ruleIndex < this.ruleArray.length; ruleIndex++) {
                if((this.ruleArray[ruleIndex].entrySourceTitle == '' || this.ruleArray[ruleIndex].entrySourceTitle == entry.entrySourceTitle()) &&
                    (this.ruleArray[ruleIndex].entryAuthorName == '' || this.ruleArray[ruleIndex].entryAuthorName == entry.entryAuthorName())) {

                    if(xpath.hasNode(this.ruleArray[ruleIndex].xpath, document, entry.div)) {
                        var node = xpath.nodeFor(this.ruleArray[ruleIndex].xpath, document, entry.div);
                        node.parentNode.removeChild(node);

                        console.log("Grease Reader removed a node from '" +
                            entry.entryTitleLink() +
                            "' in '" +
                            entry.entrySourceTitle() +
                            "' by '" +
                            entry.entryAuthorName() +
                            "' on the basis of rule ('" +
                            this.ruleArray[ruleIndex].entrySourceTitle +
                            "', '" +
                            this.ruleArray[ruleIndex].entryAuthorName +
                            "', '" +
                            this.ruleArray[ruleIndex].xpath +
                            "').");
                    }
                }
            }
        }

        GreaseReader.prototype.onNodeInsertedEntryContainerEdit = function(entry) {
            var imgNodeSnapshot = entry.imgNodeSnapshot();

            for(var imgIndex = 0; imgIndex < imgNodeSnapshot.snapshotLength; imgIndex++) {
                imgNodeSnapshot.snapshotItem(imgIndex).style.cssFloat     = 'left';
                imgNodeSnapshot.snapshotItem(imgIndex).style.marginRight  = '10px';
            }

            var tf = new TwitterFactory();
            var ff = new FacebookFactory();
            var divT = tf.div(entry.entryTitleLinkHref(), entry.entryTitleLink());
            var divF = ff.div(entry.entryTitleLinkHref(), entry.entryTitleLink());

            entry.div.addEventListener('mouseup', function() {
                var text = '';

                if(window.getSelection().toString().length > 0) {
                    text = 'text="' + encodeURIComponent(window.getSelection().toString().replace(/"/g, "'")) + '"';
                }
                else {
                    text = 'text=' + encodeURIComponent(entry.entryTitleLink());
                }

                if(divT.firstChild.href != divT.firstChild.href.replace(/text=[^&]*/, text)) {
                    divT.firstChild.href = divT.firstChild.href.replace(/text=[^&]*/, text);
                }
            }, false);

            divT.style.cssFloat = 'right';
            divF.style.cssFloat = 'right';
            divF.style.marginRight='10px';
            entry.entryTitleNode().style.maxWidth='100%';
            entry.entryTitleNode().appendChild(divT);
            entry.entryTitleNode().appendChild(divF);
        }

        GreaseReader.prototype.run = function() {
            document.addEventListener('DOMNodeInserted', this.listen.bind(this), false);
        }

        var greaseReader = new GreaseReader();
        greaseReader.run();
    }
    catch (e) {
        console.log(e);
    }
})(document, {
    log: function() {}
});