// ==UserScript==
    // @name          Neopets Auto Haggle
    // @namespace     http://www.neofriends.net/
    // @description   Auto haggle in main shops
    // @include       http://neopets.com/haggle.phtml*
    // @include       http://www.neopets.com/haggle.phtml*
    // @include       www.neopets.com/haggle.phtml*
    // @include       neopets.com/haggle.phtml*
    // ==/UserScript==

    function run_cap() {
        if (document.location.href.match('haggle.phtml') && (document.body.innerHTML.indexOf("captcha_show.phtml") > -1)) {
                       
            allForms = document.evaluate("//form[@name='haggleform']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
           
            for (var i = 0; i < allForms.snapshotLength; i++)
            {
                thisForm = allForms.snapshotItem(i);
               
                allImgs = document.evaluate("//input[@type='image']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
           
                for (var i = 0; i < allImgs.snapshotLength; i++)
                {
                    var image = allImgs.snapshotItem(i);
                   
                    if(image)
                    {
                        var newImg = document.createElement("img");
                        newImg.src = image.src;
                       
                        var canvas = unsafeWindow.document.createElement("canvas");
                        canvas.width = newImg.width;
                        canvas.height = newImg.height;
                   
                        canvas.getContext("2d").drawImage(newImg, 0, 0);
                       
                        var image_data = canvas.getContext("2d").getImageData(0, 0, newImg.width, newImg.height);
                       
                        var lowy = 999;
                        var lowx = 999;
                        var low = 999;
                       
                        for (var x = 0; x < image_data.width; x++)
                        {
                            for (var y = 0; y < image_data.height; y++)
                            {
                                var i = x*4+y*4*image_data.width;
                               
                                var avg = Math.floor((image_data.data[i]+image_data.data[i+1]+image_data.data[i+2])/3);
                               
                                if (avg < low)
                                {
                                    low = avg;
                                    lowx = x;
                                    lowy = y; 
                                }
                            }
                        }
                             
                        var newInput = document.createElement("input");
                        newInput.type="hidden";
                        newInput.name="x";
                        newInput.value=lowx;
                        thisForm.appendChild(newInput);
                       
                        var newInput = document.createElement("input");
                        newInput.type="hidden";
                        newInput.name="y";
                        newInput.value=lowy;
                        thisForm.appendChild(newInput);
                       
                        thisForm.submit();
                    }else{
                        alert("Image error");
                    }
                }           
            }
        }
    }

    function haggle_price(raw_price)
    {
        var iVal = new Array(2);
       
        iVal[0] = raw_price.substr(0,1);
        iVal[1] = raw_price.substr(1,1);

        var x = 0;
        var end_price = "";
       
        for(x=0; x<raw_price.length; x++)
        {
            end_price += iVal[(x%2)];
        }

        return end_price;
    }

    window.addEventListener('load', run_cap, false);