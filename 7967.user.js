// ==UserScript==
// @name           RIAA Radar Search
// @description    Search RIAA Radar for the current Amazon item.
// @include        http://www.amazon.com/*
// @include        http://music.barnesandnoble.com/*
// ==/UserScript==

(function (window, console) {
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
                if (!contextDocument) {
                    contextDocument = window.document;
                }

                if (!contextNode) {
                    contextNode = contextDocument;
                }

                return contextDocument.evaluate('count(' + xpath + ')', contextNode, null, XPathResult.NUMBER_TYPE, null).numberValue !== 0;
            },

            stringFor: function (xpath, contextDocument, contextNode) {
                if (!contextDocument) {
                    contextDocument = window.document;
                }
    
                if (!contextNode) {
                    contextNode = contextDocument;
                }
    
                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.STRING_TYPE, null).stringValue;
            },

            nodeFor: function (xpath, contextDocument, contextNode) {
                if (!contextDocument) {
                    contextDocument = window.document;
                }
    
                if (!contextNode) {
                    contextNode = contextDocument;
                }
    
                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            },

            nodeIteratorFor: function (xpath, contextDocument, contextNode) {
                if (!contextDocument) {
                    contextDocument = window.document;
                }
    
                if (!contextNode) {
                    contextNode = contextDocument;
                }
    
                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            },

            nodeSnapshotFor: function (xpath, contextDocument, contextNode) {
                if (!contextDocument) {
                    contextDocument = window.document;
                }
    
                if (!contextNode) {
                    contextNode = contextDocument;
                }
    
                return contextDocument.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            }
        };

        function GreaseFrame() {
        }
        
        GreaseFrame.prototype = {
            statusUnknown: 0,
            statusPresent: 1,
            statusAbsent: 2,
            statusError: 3,
            status: this.statusUnknown,

            request: function (url, callback) {
                this.callback = callback;

                GM_xmlhttpRequest({
                    url: url,
                    method: 'GET',
                    onload: this.load.bind(this),
                    onerror: this.error.bind(this)
                });
            },

            load: function (response) {
                var iframe;

                iframe = window.document.createElement('iframe');
                iframe.style.position   = 'absolute';
                iframe.style.visibility = 'hidden';
                iframe.style.width      = '95%';
                iframe.style.height     = '0px';

                if (this.iframe) {
                    window.document.body.replaceChild(iframe, this.iframe);
                }
                else {
                    window.document.body.appendChild(iframe);
                }

                this.iframe = iframe;
	
                iframe.contentWindow.addEventListener('load', this.post.bind(this, iframe.contentDocument), false);
                iframe.contentWindow.location.href = window.location.href;
                iframe.contentDocument.open("text/html");
                iframe.contentDocument.write(response.responseText.replace(/<script(.|\s)*?>(.|\s)*?<\/script>/gmi, ''));
                iframe.contentDocument.close();
            },

            post: function (document) {
                this.callback(this.parse(document));
            },

            error: function (response) {
                this.status = this.statusError;
            }
        };

        function RIAARadar() {
        }

        RIAARadar.prototype = new GreaseFrame();
        RIAARadar.prototype.location        = 'http://www.riaaradar.com/search.asp?searchtype=Keywords&keyword=';
        RIAARadar.prototype.xpath           = {
            'result': '/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[2]/TD[3]/TABLE[1]/TBODY[1]/TR[2]/TD[4]/TABLE[1]/TBODY[1]/TR[7]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/SPAN[1]/IMG[1]/@alt'
        };
        RIAARadar.prototype.imgUnknown      = 'data:image/gif;base64,R0lGODlhwwA1ALMAAP%2BsMI1kJ0QzGv%2FSjv%2B5Uf%2FGcf%2Foxv%2Fao%2F%2BcCP%2BjGv%2Fitv%2Ft0beUYP%2Fw2f%2F9%2BwAAACH5BAAAAAAALAAAAADDADUAAAT%2F0LVAq7046827%2F2AojmQZOGiArGzrvnAsz3Rt33iu7zwSTL2gcEgsGo8uCnLJbDqfMyV0Sq1aa9KrdstdShMIsDhMHpvL6LM6zV672%2FC3PE6f2%2Bv4tU%2FVFvvZAg8PKn8JhYdhiIqFZYyGiZCPkodmjotpipGYjZmOkZ4UhqKjpKWPgQ8Ck36iiaavsLGro66yrbastrW4sru8sHu%2BvwioFAIChL%2FKy8zNzs%2FQtqHLe8aCAaiq0dvc3d7fpsHMgoPFAYLaAOC%2F6qbtvO%2Bi8e3xr%2FSw9czz7rGhAP8J%2FgkEONAQOWzozqUKyLDgQHUOHwaMKHAiQYgWK0K8%2BJBgxoYY%2F0NSDGmx5MaMHVGKbGgS5EZ1%2FiaydMjwoDl0Cfy9FLmyZ0uNMoHufDkzqE%2BNQj1eBGk0aFGlJjlGPQmRQserEotlU4hM0EisYMOKHUu2rNmzaNOm1GmWgc1rCil4VUu3rt27ePMOtIqW2LWtCefqHUy4sOGzOQP8IyCQcePH%2F94Oiqtw8UDHABxjxgzZMlnNnT1nfgjaM%2BfRl1OjRs359GnWHUurdm2aAmjGuEfnZiy5a6rKmnf%2Fw3YsQG7iyI4fW858ueLRyI1Dd668uXXFBBgjt%2B7ccvTqyacX9869%2BfPguj1bzZ6evXACDLTCnf8A9%2FvsqFLpzi9gP7n%2FAPaHG%2F9%2F%2FqFTIIABHoggOQIyRuCADB4oYGb5LWige%2FdlRoBtGmaHoYceRvYXfb59GKKDDIbIn4oW%2FicAi%2BjAmIqMLb7IXoUWvqjhijem2GOMP7Y4Y4cdfgiAbSeCaB%2BIAEgm12SCKFkkfj5SCaSV6CznIog8YmkjlqloWSUBFTK3pYddkjlmmmWKeaWScGaHZJwezgmffGFmGSWdaK7p55ts%2Fjljn4AK%2BqWahSY6qJdcGspnnHbGWUyIQgL4KKOELoqopoEqeminnDqa6aeiYmrqpXIa52EBSip0DQEFxFcpOUqyqiSopHraqK6j7hoqr6fi6muumqJqWwGsJpusrOQwkN3%2FrOQoCyusyW4qQLX8Ycugtuhwm2VxDITrbLLZTlsuq%2BcWcK613l5r7rbvdhtvKtIiS%2B29rFJQ7b7zDrJppfbyi6y6KQ6c7sEFI4tjsyAGjHCMBifMLrUrRiyvwvBiDLHG9NZbL7X6DiyyyP8iBO3II8OaLbnb2rsyx9eyvCADKcMs8soqt5xzty7rTDDP6LYcNM8704uvx%2FaGjDLKC5%2B89M1C%2F9yxzRZPLTWANC%2F9stQxU%2B0111ADDXbVXY%2F9NMpKn90ztP%2Bp%2FfXWcEcdt9hzW1132XeHbbfcUbtdQNpuNw1w4HzTXfjehieO%2BOJ4H9644o8z7rfIFAxQgOWYX665%2F%2BVXs73555jzl7nompNuuelcj86g6uiwnorrAsAue%2Bmr09667a%2FjHjvovFuu7wCYB3958K6y%2FcDwyAM%2FPH8WZAv8AM4DHz302z4%2F%2FfXVS89g89lTn1AFzINfu%2Fa3k0%2Bv8ugL%2F3zlz7fvfujGC%2FK%2B%2B50vGLvyolu%2FOvyt69%2F%2F5fk73f4AOKv7ETB%2BLmpfAL33uvm973Lsc%2BD8ijcrCfpPSPczXwYZuMEFenB%2FAzjAByvVQQQm8IIl7J8F20eBA6zwfRRsEQNeKDgXuVCDN%2BRgDvmzQwb1EB0%2FTEUQazREBAogiEdEYQ5fGMEQAu%2BGUHSiC2OIoBlG0YlSdOEVo5jDA%2F9oEYtf%2FKIUxzhGMYYRjGV8Ihm3iEYzqhGNbVTjGdPoRjhqsYVe1KIeQ6jHL9bwAQzIoxf5SMg95pGPgxRkGA3JyEKWMZGFTOQis8jIRgoSkZHMpCQ1aUlDRnKTXsSjIkc5SgVQsVmkTKUqV8nKVrrylbCMpSxnuUpTBkABtDylIBiAS1r68pfADKYwh6lIPPbymF5E5gFwaQBdAnKZycyjMqcpSGpC85rWzKY0txlNbHZTm9f05jfHKc5wgvOc47SlAXCpAHa6c5nvbKczGbAAeMIznvi8Zz7baU9%2B%2BnOf%2BHSnQPsJUIISNKAG%2FedB75nQgir0obZsp0QnSlGKNlP%2FSLysqEY3ytGOevSjIA2pSEdK0pJKtJkBWIBJ59kAk7r0pTCNqUxnWlEKtHOdClinTnN6U54aYAIY9WlPhbpTohp1p0jlqVGXmtSjOlWoUMVpUqWq1Kn2tKhYrapWqcrVq%2FJ0ARRogAHGOtaclpWsZyXrAtDK1gasla1sNStazSrXtNJ1rmSta17hqtO42jWtfA0sXvsKV70OVrCCrathBUsBxDr2sZCNrGQnS9nKWvaymIXrBH7w1s6O9a0G8KxaAwva0H4WraAVbWlNy9rSpha1p2Vta9n62tnyVbRwVW1sXRtb2cJ2t6O17W%2FRSoEFGHetx02ucpfL3OYi17nHrg0tdKcLXek%2B17rGxS51t5tc7WaXut61rne5u1wHUMAB5E2vetfL3va6973wdW9xG0Df%2BtqXvgu4r373q9%2F8upW%2FAK6vfwPs3wEHWMAEPrCBDXxg%2BzIYwfdl8IMLDGAJm9cB9GywhjfM4Q57%2BMMgDrGIR1zfE6QgAAygQIpTjOIWt5jFK1axi2P84hrbmMY4rjGMZ6xjGe%2F4xzwG8o2DTOQhCznHRzayj5dsZBREAAA7';
        RIAARadar.prototype.imgSafe         = 'data:image/gif;base64,R0lGODlhwwA1AMQAAMjpyKTapAecBxeiFyaoJpjWmEq2SuP04zNYBdPt03jJeFm8WWjDaLzkvBkyGdvx27XhtYPNgzOtM1tmJ0NqQ4vQizWFNT6yPoZ3UVOPU220bWWRZa7erkSkRIm%2FiAAAACH5BAAAAAAALAAAAADDADUAAAX%2F4HEgZGmeaKqubOu%2BcCzPdI2IxyTsfO%2F%2FwKBwSCwaj8ikcskU3BDNqHRKrVqvPhJ2y%2B16v0MteEwum4ukgUDNXrvb8Lc8Tp%2Fb6%2Fi7Ps%2Ff%2B%2FuAf4J8WoGGg2uHioiLeI2Me490aQOVlpeYmZqbnImcn6ChoqOWnqSnn6aomJSrrq%2BwsbKztK4kBLW5rbm8vb6vtwO4w8LEBMPGwsXKx8vNz8zIlRYfHxbSz8bY0czOztja3dDg4snj5uLp5Nvo4LfH8PHxxfL18N%2F39fQECNXVa%2FPs7ZM3EFm2fAbtJTyokGDAhhAZIoxo8B3FixgbDnDgr5qDjCBDihxJsmRDEhLi%2F6Wst1KlSXscO3586VJhSwI37bXMmRNnxp40Ke5EKaFoSqNIcSI9urSp06cEYvqb%2BbSqVaVOsTKtilXrVqNeuVodS%2FYq2AkTyqpdW9SCA45S%2FV1jS7eu3bt48xpFeaFoXwl%2FA%2FsdDLiwYcOCDRPoyNga4cSPIx9O%2FBcxYcuWKV%2FWjBlyZc6gjQoOLQHthdOoU6tezbr1amqN5fZ1Tbu27du4c%2Bvezfs0ggm9g5%2BOGvuDAwvCUSN4y7w5cwSplzufDl35dOrRrzuvvlr62%2BS3TRu4YKD8%2BPLk0as%2Fzz59%2B%2FUGYMd20MGC%2Ffv4ybtPz7983OIO8PfffAIWJ5N%2BBgzYWP%2BA7JlHQUf9vSfhhPuph5Z5GGao4YYcatiBgdV0oGA1HWZ4wYgyYYjiVCqC6FGLLjqw4QX9%2BFPijTiOdyGGC%2FBoXo8%2FBllej%2FdlgF99Ln7woYFAGtDkk%2F7JdB0CMHrEXIrmxaUdlU4mKCV1Pjr5oI1dhlnmmVAOKSRaC7TZppNuwtmjm3O%2BSaeXSRYnIpNx9mnnAlLJOGeXdLYZqJ2HuhkooYTeueigdd75Zo3VROqnnJHKiemfBrBZ6KeghtpmngYaAKKonyaKKqBT0akqqx6tamirstI5ZqW15gqqp24yQKevbQLb67DBklqcARlQYJ%2ByFjALrLDQKtpqtKnSOmv%2FrMAeSm2h2hIr6q0fLCCsuN5%2Buq23aDGgrrrirtuur%2Buy6268xsa2AAUIUICvvvlS8O6%2F8zKg5XX%2BrjvwWzLBK%2FCXDmQQb7wHN%2FzwxPd2pLC8GE988bsBM5CuxiCHTG%2B9jC0AosgPr%2BgRxEk6wHJsDms8Yswig4vyzTd%2FrMC6O6vbMwM%2F%2Fww0zwuT7I8GKAZN9NDqqmwcz067PPTM8fasANVLM82AzVVnrbTPYGv9M1oK7Fy22WUDnfbZaq%2B9ttEdaXAy23SjfXXLZ98d49oz591233WjvXVHedvd9uF1q4142WQX7vjjkJcNtz8K6Muv5flGrnnhgebd%2Bdmflx26%2F%2Bajb2766aifTXYECrDueuuwvy572a9XMLlxGmSg%2B%2B68sx7777MHH6jvEXTuuvGtI%2F868MrD7nzwvwMvPfTUx45WBRFkr%2F323HfvvdMGIm0g9t6X%2F%2F1U5BePvvaBpt%2B%2B%2BeyvD%2F%2F89Ndv%2FvURVIC9%2Fvn3vz%2F%2F%2B%2FNf%2FrB3uw%2BIrzgCDKACI5Asyznwffobnv4qAEEKrg%2BACbSgRxzowAz4738bcOACR0jCBGawAmgpwARXyMIWunCCt3OAB0CkwheyMGo11KBxchgoHk4lhzaM2gvBZcMiGpGF11OhEiuwxCYy8YlOLEABCuiBBnJQX1DMYhMLgEMmcvGHXuxhGMGoxP8ofjFGUtQiEaOoxTaycYtoCYAU50jHOtrxjgXYgB73yEdwxaYCfAzkBuSIxzpGjZBnNA4iA7XIqSCykIe8I7gKSclK1nECGJgjITdJR052Uoqc9OQc%2FcgYD6Dok6BMZQECwEpUbhKRrVxlLGcJy1dqEpWyVKUnZ9nJXarSlboM5i2liIEJsPKYyEymMpfJzGQWgJT%2BmKKBONBMZcqymsy8Jja3yc1uevObzcQkOMdpzQfF5JxnPKdHyMnOdrrznfBkZTE5QM962vOe%2BMynPvEZAHxCoJ7%2FpGdAA7rPghr0oAhNqEIXylCEYpIDBG3oQiMKUYBa9J4UNWhGJcrRjnb%2FdKMcxQAGIAqBkpr0pChNqUpXytKWuvSlMI2pTGdK05raFAIibYBOd8rTnvr0p0ANqlCHStSiGvWoSE2qUoEKAaJyQKRNXapUp0rVqlr1qlgdqkgB0AAAeLWrXg3rV8cq1rCClatkPStZzVrWtZ71rWWFa1vRuta0unWucqUrWPda17bK9a991atd6WrXBuR0rohNrGIXy9jGOvaxkI2sZCdL2bBuFQAJ8GpmM4tZzXb2s5wNbWdFC1rPjra0pz0taTeLWtGutrWefe1rUyvb2Ip1tq6lrWlrC1uvbjUBwA2ucIdL3OIa97jCxSxyl8vc5jr3udCNrnSfK9LpWve6btjNrna3y93mivQB4A2veMdL3vKa97zoTa9618ve9rr3vfCNb3i%2FK9%2F62ve%2B%2BM2vfvcrXgwcwL84CLCAB0zgAhv4wAhOsIIXzOAGO%2FjBEMYBgP8r0gpb%2BMIYzrCGN8zhDnv4wyAOsYhHTOISAzgEADs%3D';
        RIAARadar.prototype.imgWarning      = 'data:image/gif;base64,R0lGODlhwwA1ALMAALZISKorK8d0dNSVlZwHB82CgmceB6IXGDITE79gYNGMjIJWOG04KJM4OP36%2BgAAACH5BAAAAAAALAAAAADDADUAAAT%2F0DlDq7046827%2F2AojmRpSBOhrmzrvnAsz3Rt33iu78Rp8MCgcEgsGluUo3LJbDplyad0Sq3SotasdqtMHlzfVjgMXpHHLzSLbFad2wQ2jP0Wl%2B34mBxOo%2FPja4GAKhRfB4aDh4CIcV8IDw8Ii5Noiohjl5SajJeWmY2Ti5mWbqObpJygmKqGpq6bmo2Foq2qooCPka%2BHu6iNvrWtwZTDxazHvLeeysKdxMjMyr%2FSloW8zdfZyZCRBJE%2F2r%2FayeHj5uLm6erjrOXr2Ofv8ujoh9byyQgG%2Brn7kAj4AgocSLCgwYMI7wnk5u%2FbP4QQI0qcSDGgAQYFGfbLBbCix48g%2F0OqC0AhwAGTKE%2BqTGnygMZ%2FBh4WYrmyJs2bNnPi3KmzJ8%2BfPoMCHSq0ZsmiLF8%2BaNgwAMufRKOulEoVqVWqT6%2FqZMDAqdevYL%2B6hNRQH0xIKL2eDKuWrdu3bNfCnUu3rt27adviZVvyrdy8SpnmsvtXLN3CeNfK%2FYs4r2G%2Fbhs7diq5sl6wiLnudRqYY8wHm0OLHk26tGm6ffcqNesQ9FwEsPV9jS3bK20Ds2nrjo3b9u7dvZ3%2BBp4bdvAAw3UfT37b7b7YdDWHBeCUulfrDTaS1e7aegDv1HNFui4ewWxu5r8j58a%2Bffrv4tuzf79evvvz%2F%2FDbR09%2B%2F%2FzrX32GFv%2BA1VV3EXUIqqcgANZZF9hnrC1YoHXlKVheghVS6B9%2FGm4YCYYefqhehuGFaF6HGyKQoHoACPjAijAGoFmCCNZYHYINcMMAdxRAYiODLAJw4XdCcggfejXGR9t8Sc4X238IKvmkkUX%2B06CUsDFJJJbKNfAjSewFKSYAXNXIII0NXERkANn9w9GbPv5o44VAkliliCVaGSWSI1KpJYMZHmnllhwCSiWJ9eHJopcsEtkie2eOSV2ZQJoJQJqQMIBjiNxY%2BmOgd6q4p56GDlrqh2fSySCTdSKZqqt5oiooqqeKOquoZ%2BaqK4IueuoomZrueqaLwbbJqbC6qhpqrso2C%2Bv%2FsmeyWiuzzzpLKrTTIossA5BqyyClyBqb6aqcvugttuha62aW1TppXAMNMODlq9eqi2u67V77nD7I9nouuNrGp2l8G56Lb735pkitffPuau%2FCtB4c8cPCctvpv8EmAIDGGzPIscDlvsjxyB4v%2BzGSJ%2BupMcH23csyJF5qTDKdK6M8bcof4qyizh1jS7LFPnLcs9Bcydyx0Ua%2FHOLRTMt8odM2J1BeAlB7uDPVSsfc9NRV57zx1BtLHfXTX6Mns9j%2FUI00meytjXQCRZ8d9txU3xly3XjLzTXWZqsNds1pd40A3lyXHbjhkZy9d6hJ94344II3nvbRb1N%2Bttxlqq35%2F%2BZ8hxw055r%2FjXbiYe89%2BtWnh45y5zmzDrnrYafud9%2Buqx547aBfnrfucDOQO%2Bd2l%2Fv77LfLjvvxxidv%2BvK0K98888WbPvz0DCwwveZA3z19eVxxxX330CdOvPjIh%2F%2B689E%2Fr%2F4%2F3e%2FYvObxdn993NezLvz2nrsnwPgI7O%2B6%2F6cDYHkEiB4C%2FsOAkfCfAAbIPwT6p3%2Bgy970BMAVAezPghe0YAIwuEG4eS6DGdygBZXGKQiOsIAi5NoJD5hCFK5QfC804QLNdkEGxpBqL3xgBzVoweyFEIMXTMACrMdDERoRhB7k1AKKyMMa5m8%2BPBygEw84xQRWsX9X5KAU9yfFDf92cYZU5KKJOMhBH%2F7wiBUEohrXqMHstWyJbIyjHOdIxzra8Y54zKMe1yhCPtJxiHvMoXwYEMhCGvKQiEykItlYvUAWwI3t6eMiJ0nJSlpyj4C0YAE0yUkBbNKToKTghhawyVKC8pOo5KQpQ5nKVqqyk65cpSlnCUtW2lKWr6RlKm15yl760pW91OUtO7kABhTgmJ48ZimXmcxkQpI9pGQmMpUpzWlWU5nJrGY2l2lNbjZzmt%2B0ZjjD6U1xmhOb6LxmNtd5znGmk5lDpKY85ynPZ3IjAfTMpz73yc9%2B%2BvOfAA2oQAfKz3gS1J6QiCZBF8rQhjr0oRCVp0ELoIBjVpT%2FohbNaEUVgNAHJGCjGcWoSC9K0pCWdKQmTSlKV3rSlqrUpSx9qUxjSlOY2jSkQ1SATim60Z7yFKM67egCdErUn%2B70qEVNqk%2BJ2tOlOtWoT0UqVKHa1KhadapSzapSr6pVrBY1nkwNq1jHStYBkPWsaE2rWtfK1ra69a1whWtO40rXutr1rnjNq17VmlOz%2BlUBfw0sYAcr2MAWlrCIPaxiE8vYxTq2sZB9rGQjS9nJWhawQxyAZjerWcD6lbOgDa1nQwva0ZL2tJw1LWpX%2B1nWunazqn2tbGc729jCNrO0za1ud8vb3vr2t8B1LW6DS9ziGve4yCXuAhywgOQ697nQIo2uclEwxOpa97rYza52t8vd7nr3u%2BANr3jHS97yDlECEQAAOw%3D%3D';

        RIAARadar.prototype.get = function (key, document) {
            return xpath.stringFor(this.xpath[key], document);
        };

        RIAARadar.prototype.build = function (keyword, callback) {
            this.location = this.location + keyword;
            this.request(this.location, callback);
        };

        RIAARadar.prototype.parse = function (document) {
            this.result = this.get('result', document);

            return this;
        };

        RIAARadar.prototype.img = function () {
            if (this.result === 'Warning!') {
                return this.imgWarning;
            }
            else if (this.result === 'Safe') {
                return this.imgSafe;
            }
            else {
                return this.imgUnknown;
            }
        };

        var Amazon = {
            xpath: {
                'ASIN': '//li[b/text()="ASIN:"]/text()',
                'Audio CD': '//li[b/text()="Audio CD"]/text()'
            },

            get: function (key) {
                return xpath.stringFor(this.xpath[key]).replace(/^\s+|\s+$/g, "");
            },

            initialize: function () {
                if (this.get('ASIN') && this.get('Audio CD')) {
                    new RIAARadar().build(this.get('ASIN'), this.render.bind(this));
                }
            },

            render: function (radar) {
                var contextLocation, contextSize, img, a, width, height;

                contextLocation = window.document.getElementById('prodImageCell');
                contextSize     = contextLocation.getElementsByTagName('img')[0];
                img             = window.document.createElement('img');
                a               = window.document.createElement('a');
                width           = ((contextSize.offsetWidth * 0.9) > 195 ? 195 : (contextSize.offsetWidth * 0.9));
                height          = 53 * width / 195;

                img.src              = radar.img();
                img.style.border     = 'none';
                img.style.position   = 'absolute';
                img.style.width      = width;
                img.style.height     = height;
                img.style.marginLeft = contextSize.offsetWidth  / 2 - width / 2;
                img.style.marginTop  = contextSize.offsetHeight - height / 2;

                a.href = radar.location;
                a.appendChild(img);

                contextLocation.insertBefore(a, contextLocation.firstChild);
            }
        };

        var Barnes = {
            xpath: {
                UPC: '//li[@class = "isbn"]/a/text()',
                Format: '//ul[@class = "list-override"]/li/text()[starts-with(., "Format:")]'
            },

            get: function (key) {
                return xpath.stringFor(this.xpath[key]);
            },

            initialize: function () {
                if (this.get('UPC') && this.get('Format').indexOf('CD') !== -1) {
                    new RIAARadar().build(this.get('UPC'), this.render.bind(this));
                }
            },

            render: function (radar) {
                var contextLocation, contextSize, img, a, width, height;

                contextLocation = window.document.getElementById('product-image');
                contextSize     = contextLocation.getElementsByTagName('img')[0];
                img             = window.document.createElement('img');
                a               = window.document.createElement('a');
                width           = ((contextSize.offsetWidth * 0.9) > 195 ? 195 : (contextSize.offsetWidth * 0.9));
                height          = 53 * width / 195;

                img.src              = radar.img();
                img.style.border     = 'none';
                img.style.position   = 'absolute';
                img.style.width      = width;
                img.style.height     = height;
                img.style.marginLeft = contextSize.offsetWidth  / 2 - width / 2;
                img.style.marginTop  = contextSize.offsetHeight - height / 2;

                a.href = radar.location;
                a.appendChild(img);

                contextSize.parentNode.parentNode.insertBefore(a, contextSize.parentNode);
            }
        };

        if (window === window.top) {
            window.addEventListener('load', function () {
                Barnes.initialize();
                Amazon.initialize();
            }, false);
        }
    }
    catch (e) {
        console.log(e);
    }
})(window, {
    log : function () {}
});