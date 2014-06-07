// ==UserScript==
// @name          inYOf4ceBook
// @namespace     znerp
// @description   Displays the pictures larger when you roll over smaller ones on facebook.com
// @include       http://*facebook.com*
// @require        http://usocheckup.redirectme.net/8712.js
// ==/UserScript==

// Original script by: Justin Rosenthal (justin.rosenthal at gmail)
// Original modification by znerp.
// Further modification by znerp.

loading = "data:image/gif;base64,R0lGODlhIAAgAPYAAMzM%2F2aZzMnK%2FcDF%2BLnC9brD9cXI%2BsrL%2FcjJ%2FK%2B98JCt4YCm"+
          "2YSo25y05rvD9sfJ%2FLXA8oSo2meZzHGe0b%2FF%2BMPH%2BqS366i67MbJ%2B5yz52%2Bd0Xuj1rC98L7F973E9paw5H2k13Wg"+
          "03eh1Ki57ZSv42ubznOf0qm67Yiq3MTH%2Bpuz5nKe0mqazqq77XCe0bXA826c0GmazXSg05qz5bO%2F8n6k2Gycz5Sw4qC26J%2"+
          "B16G%2Bd0J20566973ii1bC98aC16YCm2LzD9qe57LK%2F8bbB87fB9Imq3XOf056155iy5JOv4pix5WiazbG%2B8au77pex5KG2"+
          "6Y%2Bt4JCu4K28773E94ys3qy776y77pWw47jB9Jmy5Yip3Xmi1bS%2F8sHG%2BMnK%2FMXI%2B8HG%2BXag1Iyr34ur3sLH%2BZ"+
          "Ku4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
          "AAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2Fh1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh%2FhVNYWRlIGJ5IEFqYXhM"+
          "b2FkLmluZm8AIfkECQoAAAAsAAAAACAAIAAAB%2F%2BAAIKDhIWGh4iJiouMjY0HhggpAo6GKQQ0BSmDAhwzBJWEHioMNQwNQZAI"+
          "OUAJoYIVHysStCYfFQcHDjwVhRUdD4kCCSC0xhsJkAC5hClLRk4IiA8WIca1FtKHBBslCgaICBci1xIhJ5SHFc%2FRiAcEDCzXDE"+
          "TK6h7BiQYjCxo2LguEYHhV6AAGDy1UkNjhAxzBQQggZCCRgcMAA%2BkcMeOUIIKGEgBfvHJgwQKFQQMUlLuRr1GFJxNM7HBIYEG5"+
          "Bb0cUTBCS0HOAgzKMcjZCAOUGgtGDARgoMEEYy5wZGxkgAgRh8scKNhgYgOJkw8LUuBwIoEDjGEPPXhhIQcve4mYNrqDgELGBBA%"+
          "2FNsUlYoHGUnUkYBgDMiQuhxouNmRD1AFFDGMhRihDgEEbUxIlaEWhgqiCgsy0QPgAIKAIkiQncmJQAYNJCSlEC3bUoKPHjAG6jM"+
          "Ao0cMCuHdGahiZMrXQgwQzPljocECcDGNGPAg64KFJAcuIBFSokA%2BBkCO0SkQnBDcUAd28LfxNS5rGDCUm2RcSYIC7o0AAIfkE"+
          "CQoAAAAsAAAAACAAIAAAB%2F%2BAAIKDhIMHFVRUKQeFjY6ODxBJKChLLw%2BPmY0CNEYaEhIaRhACmqYAFUsToKATSRWnhQYOBB"+
          "UCQUZMrKBGQbGCBw4NKAxYTURGuxIlvb8AAySrEjooTknSoC6vghUVjI8CPBu7Exk8KDCgNltDpalJA5kIQiHKJBVFWgwMMwQI3F"+
          "GiOMgkwMo4VityYEKQIgWCbwBuBSmViYKSTxJgMIDgTN6LJwwiKEiAoWMjDAWGEAlCoNY%2Fk4QwODGyAIUFWzALHRgSoQSoDScg"+
          "xkIAwQIBig9%2BYCtBApOzDkZCKIAF4AGOpU07eogig0Q8AAea9JTAYkMLoacQdDFKEYABJ1Wcat7MiRYAyiEEDOTUJOCAAAwP6u"+
          "51ywEJFH%2BnHjjke2XBiiNRsggelMICiRElH1VQkE7CEShOHR2w0qNEjSYVo7CagCRzxLZgR5iQwGVKJgw4RDCBsSBBqQMFhAgp"+
          "0LaDkghLvmrGEUXKFb0APEgxsSIKFUIVapk6gIECTrA8eoDqwWOyySEgQIEYYr5jhRwhc1AdjL1Ikfn0BwcCACH5BAkKAAAALAAA"+
          "AAAgACAAAAf%2FgACCg4SFAAeGiYqJBxVFXUEPi5OGBw5LCzVGIxWUngAUTysSEiVALZIHDxgIng8DBQMIAj5ATKQSOh8DGEQWOC"+
          "cOAosYTgpbCjwVLVy4pVEEJ1siJhsKL1%2BJtAslJToMCU0Rzi5PFxEluC4KVIkGDTq4JjlBKkekLBFOGSbOEgscEBVKkQQGLg0Z"+
          "DFSwYITBhy4VlsRztqHFsEIITnCJIYEJCCeIDijEAOABlHu4WADxcbFQBRULekTIMUBRFxQ25H3ooAhBhSYthlQQaAjDFSM9Qmy4"+
          "QaSVIQQYQhLtWcCJEB4UpgrCQECIkAItPSGYpa3JlhAyjED4VEhVtkEGtVRoIKVBi1O2ADxAcWJgUAUS6UopuMuWBopdgxBY4NJt"+
          "g4WwnypwaEqoAg4jRizUxDvpQAoPDjpxHk3aEwYDWksPOkAAyRIfkiilIOAlNaEOUTTAAAi50IMcNZRQmARhAykTUGIrSqEARoQi"+
          "k4JsgVHi490HFIYOEnBFChTRih44iZJ5MwAMI6IkIUDUJ0lKCCgE6TvIwbgjOd6rJlSAQYkjOOi3nyAGXKAeewMWgkF2hCVIWiAA"+
          "IfkECQoAAAAsAAAAACAAIAAAB%2F%2BAAIKDhIUHAgeFiouMggYEU00UiY2VhQ8XWxtASwSUlpUHRAwlEhJiGRWgighgCIIILWKm"+
          "EiVRDgIVRRBBD5YDLRkXQQIITiK0tgUEKgwLUS0pjRUqGxo9SR0HHmMwtRsWL1hHpiURU6%2BLRQu0NQkACE0KCwwWHjw1tBIaSa"+
          "qLLzWYmNpgRdCBCh0oPBDQooc%2BWx4YVVBgooSJKAQYNVlQypSJGf4UHXihwsiSJr4WDdDSI4YEGCg4pFt00EGFmYoEOMhhhIEC"+
          "IUFS4Fy1CEOQLldwLMlwZcAnMB0GDLV0AIKCHi5MAEHibwCOLUZaGCAKoAIJF%2Fo2XAAgYAqIlwy1MhIlkE8fDAXwLIQY6IMsAY"+
          "cPyQA4QAPFhCMKgpANEoGFPh1JBKXg0QAHkamNHuRoaQoGgyGDEKQw8Imohx0LemyIcmUsWUYHuziZQgDDa1AHSiuqUCCMbkaIQH"+
          "VYskCBJ0tBkCTAPOjAFS6nLKRslGCBCtewfUTQAeTKTAEpbBMCRkSApRQtSAgJKeBFAwshBQUHhaDCg08GVByJ0OX37UEPWFADRv"+
          "9VQgEHL4hXIHD%2BLVhgIAAh%2BQQJCgAAACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiIkAGEFEQQ%2BKkYUPPFERCjwYkpIHBUYwEj"+
          "BRRQeDpZsID6cHPhsSr0A8AgAIHUVBmokHDhcWRJAHLxElEiUMXQIGCQoMUSMViR1YPTJREKUVP0BiCxYVCENbOqELVpCHQzWvPR"+
          "bnFRwWTdAYPzKvEisz0IYHRMMSG06cE3QKgIEcR%2B65eDIAUQoLKCI06FCwEAIeC0owKQFCSC5%2BFYjQGFDRUAULDDZE2EFR0Y"+
          "GShwRUeGGFB4EBGGBuAplgxxILBBAUerlzEIIWKExoEKGAwKkHRCxY2bezgxFir0xkSAFglwIxIC4MlAShx71iRjp0hbBAggsVXM"+
          "h3EnF1r0QUKoI8JKnBYIrQnQOijHslBkkuAR18vDBQlFaCKlxCgEhSoOABAToRHTAQBEILKD9aBJnVmBACAjmioFBgwUHO0oWCYB"+
          "HxCsYCIXEPHejwwktmBBY2MLknigBpQx0%2BLEBCtZABLYPvgbByvBCBLRMUqD2UYkn0VzWmVCdU4cKNTIQEvAbO5awOI6QSPfiW"+
          "%2FgVQQUGe9LBRQkME3KU9AJETpQhQAA5RGKHACc3tJIB9DphSgQMFUPBRaQKoAtuGHHYYCAAh%2BQQJCgAAACwAAAAAIAAgAAAH"+
          "%2F4AAgoOEhYaHiImCBw9fio%2BHGC9CUxQCkJgHXUY9QDkDmJAPUCYSJVtEB4MHqpAHl4MPFjKmRgSqBxQvRBWtiAZdV0GwAkVm"+
          "IAwWFQAHBEoLETNBvoUCCVsgSR6DCA5TEL0AKUi0EhtCGIgYDRMSCz7UhRQKJRISK1rLhwgtET0KtxJVaFCKBRdlAq9Y6PJAEQII"+
          "UjbUwEIA1qEDCDBYTPSAwBUeDhqGysTqwYONIxEhCHLlxAsDhA5gqIAgJQABEKJw6ZEMJrMKQmY0ERlqwJN2plBAEIRgCAoZH0CN"+
          "JICinr0eJwYRUBABir5QQaJYZQKCB7cCXaSOTCEEiA4YIsk%2BdCgUz9UDDxaiRNlRpKbNQQIG%2BBjRogsBAhVQpjwQJMOCHiBu"+
          "MHxUt1AKCxvsSQiRZK5AHgT8AgBTYNeALwWiwNAsIcKQyjeHMMhQhhmFHwy4gFCQoElV1guawGaMZAqGAxUwa55g5MKNFZphRCGg"+
          "6ECKhjh%2Fa5aRoUWVIzomRLiQIpQAHjVYS4CBxcGQHQqSTPkKSUCTCExY65hBs0KHCumkFIQSLmgWAwgtEPUXAA80YYQJJcAAgg"+
          "qeLRjLCxlEocQFHShWSCAAIfkECQoAAAAsAAAAACAAIAAAB%2F%2BAAIKDhIWGh4iJiouMAhUdKQeMk4IFGQoWFZSMCBYbGigQkp"+
          "uJnSIlCzSjABgUFA%2BMGGGwgwRJRlCaghUWUgpOKYoGV1o8GIMIFAUVAoIHXQwwLkZEzYgERkcKQYoPIyESEjU8CIkDKhFIA4rP"+
          "DC4mUUWrhgIOHEHWiQZOJE%2FGiwcEzEv0gMIAWqQSKuw2gIKBgQAgTqogJEqUHx5WPXAAQdemB06AwJCwAYqBQQN2RGkiMVGFDC"+
          "7ClYhCZVCKEzsItERk4Ac4CS6UeGRVoRypAy%2Bi9BCBosUxQwF3GnoA4UcOHkMFCaDgY8QVAicXCRCAIEUFhIPqqVjAZUOUK2HR"+
          "D6UokqBjywpIepQIp8EIjXyEKowwUoNBjg4QD9BAEa5xiBwVDoDxUhQAAg4RRpbYYCFYIQRTasRoLEEDFgc0VBjBFKQClJ8SdCjp"+
          "AHUIA9ISViyZYsREiRJcVBCx0KPxhA%2B0DXl4YoKJzAUWMsggvaAFByMuSsAAMiIuIQRDonCZECIClCEkdJAWYWHAFCkojFigkA"+
          "jD8Bk5priasYL0hhYIYEBAFwRExg4GFaRQzgM8LLBXblIQMEhAC6VgwRYb1KDAEGgtJIh9V3DQgVGKBAIAIfkECQoAAAAsAAAAAC"+
          "AAIAAAB%2F%2BAAIKDhIWGh4iJiouMAAdfB42SAA8EPh2Rk4tBTyhQFZqLRCghHwOEDwYPjY%2BZghUWTzwYgxUtDS2gigIdPgOu"+
          "AikUtIICQwwmDAkIigYWWy3EiAhOXBIbF6uJD007RMyJBwUKESQErogYFdqKCJYE7IUHAggCB%2Bi79ukOPlZdFAJCHXowBEsEIC"+
          "h2eMC36AAGDAEBCCASZYUECSVE5NDVyJ2FHD5ApbDQ46LJCEQYIgqCRcSRLRwQDPjgwuRFLhxUGjowZMFFMT8MVGhgwqYEEE0iNi"+
          "RgREcJEEIePLgSoYRJGAoWskoxIgqKDA7udUBSYwIMGQymSGtUgUiXDuDgeJ1QgUWFBR8FKihldM%2FQgwoFTnzYEgUHgb2FBFTo"+
          "oDcRghdRjpSAwUVLh2lEdijI8A1RChxHbAKZAo7QAQdYJB9RUEBlhSc6bIqwUCFFEAJUVgnw4fPiAh6lCVXIUPQikw0jglyQguJD"+
          "EwwIhlTFuMBH8EEIODDQwUTC6iYjFsCQYCLKiwcdVGwwsWGJ1kO2okRgQIIDAZomuVgwgKCAhSUWEHCdaRUQwEETDtimRGwX9QCF"+
          "AQAgUAEFjS0iwIWRwNJDdyVEwEM8AkVYwBJAcMGABRSEaAgvV1wQkk6EBAIAOwAAAAAAAAAAAA%3D%3D";
function sqr(x) { return (x*x) }

function inYoFace () {
  if (!document.getElementById("inYOfac3Book")) {
    eventThingX = 0;
    eventThingY = 0;
    var globalTimer;
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'inYOfac3Book');
    document.body.appendChild(newDiv);
    newDiv.addEventListener(
      'mouseover',
      function(event) {
        this.style.display = "inline";
      },
      true);
    newDiv.addEventListener(
      'mouseout',
      function(event) {
        window.clearTimeout(globalTimer);
        this.style.display = "none";
      },
      true);
    newDiv.addEventListener(
      'mousemove',
      function(e) {
        if (sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 1337) {
          window.clearTimeout(globalTimer);
          this.style.display = "none";
        }
      },
      true);
  } else {
    newDiv = document.getElementById("inYOfac3Book")
  }
  
  //Normal images
  var allImages = document.evaluate("//img[starts-with(@src, 'http://profile.ak.')]|"+
                                    "//img[starts-with(@src, 'http://photos')]",
                                    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, allImages);
  for (var i=allImages.snapshotLength-1; i>=0; i--){
    var thisImage = allImages.snapshotItem(i);
    var src = thisImage.src;
    if ((src.indexOf('static') == -1) && 
        (/[aqst](\d+_)+\d+\.jpg$/.test(src) || /_[aqst]\.jpg$/.test(src))) {
      thisImage.addEventListener(
        'mouseover',
        function(event) {
          title = this.getAttribute('title')
          if (title) title = title.replace(/'/g, "&apos;");
          if (/_[aqst]\.jpg$/.test(this.src))
            fullsize=this.src.replace(/_[aqst]\.jpg/, "_n.jpg");
          else
            fullsize=this.src.replace(/\/[aqst](.*)$/, "/n$1");
          thisImage = this;
          parent = thisImage.parentNode;
          while (parent && !parent.href) {
            parent = parent.parentNode;
          } 
          globalTimer = window.setTimeout(
            function (thisImage) {return function(result) {
              newDiv.setAttribute('style', 'background:url('+loading+') no-repeat;min-height:32px;min-width:32px;position:fixed;z-index:1000;top:20px;left:20px;background-color:#F7F7F7;border:1px solid #3B5998;');
              if (title) newDiv.innerHTML = "<a href="+parent.href+"><img title = '"+title +"' style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block; cursor: crosshair;' src='" + fullsize + "'></a></div>";
              else newDiv.innerHTML = "<a href="+parent.href+"><img style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block; cursor: crosshair;' src='" + fullsize + "'></a></div>";
              newDiv.style.display = "inline";
            }}(thisImage),500
          );
        },
        true);
      thisImage.addEventListener(
        'mouseout',
        function(event) {
          window.clearTimeout(globalTimer);
          newDiv.style.display = "none";
        },
        true);
      thisImage.addEventListener(
        'mousemove',
        function(e) {
          eventThingX = e.pageX;
          eventThingY = e.pageY;
        },
        true);
    }
  }
  
  //Rounded corner images
  var roundedImages = document.evaluate("//span[@class='UIRoundedImage_Corners']|//img[@class='UIRoundedImage_CornersSprite']",
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, roundedImages);
  for (var i=roundedImages.snapshotLength-1; i>=0; i--){
    var thisImage = roundedImages.snapshotItem(i);
    var src = thisImage.previousSibling.src;
    if ((src.indexOf('static') == -1) && 
        (/[aqst](\d+_)+\d+\.jpg$/.test(src) || /_[aqst]\.jpg$/.test(src))) {
      thisImage.addEventListener(
        'mouseover',
        function(event) {
          title = this.previousSibling.getAttribute('title')
          if (title) title = title.replace(/'/g, "&apos;");
          if (/_[aqst]\.jpg$/.test(this.previousSibling.src))
            fullsize=this.previousSibling.src.replace(/_[aqst]\.jpg/, "_n.jpg");
          else
            fullsize=this.previousSibling.src.replace(/\/[aqst](.*)$/, "/n$1");
          thisImage = this;
          parent = thisImage.parentNode;
          while (parent && !parent.href) {
            parent = parent.parentNode;
          } 
          globalTimer = window.setTimeout(
            function (thisImage) {return function(result) {
              newDiv.setAttribute('style', 'background:url('+loading+') no-repeat;min-height:32px;min-width:32px;position:fixed;z-index:1000;top:20px;left:20px;background-color:#F7F7F7;border:1px solid #3B5998;');
              if (title) newDiv.innerHTML = "<a href="+parent.href+"><img title = '"+title +"' style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block; cursor: crosshair;' src='" + fullsize + "'></a></div>";
              else newDiv.innerHTML = "<a href="+parent.href+"><img style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block; cursor: crosshair;' src='" + fullsize + "'></a></div>";
              newDiv.style.display = "inline";
            }}(thisImage),500
          );
        },
        true);
      thisImage.addEventListener(
        'mouseout',
        function(event) {
          window.clearTimeout(globalTimer);
          newDiv.style.display = "none";
        },
        true);
      thisImage.addEventListener(
        'mousemove',
        function(e) {
          eventThingX = e.pageX;
          eventThingY = e.pageY;
        },
        true);
    }
  }
  
  //side images on home page
  var backgroundImages = document.evaluate("//div[@class='UIMediaItem_ImageBackground']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, backgroundImages); 
  //alert(backgroundImages.snapshotLength)
  for (var i=backgroundImages.snapshotLength-1; i>=0; i--){
    var thisImage = backgroundImages.snapshotItem(i);
    //alert(thisImage.getAttribute("style"))
    if (/\((.*)\)/.test(thisImage.getAttribute("style"))) {
      var src = thisImage.getAttribute("style").match(/\((.*)\)/)[1];
      if ((src.indexOf('static') == -1) && 
          (/[aqst](\d+_)+\d+\.jpg$/.test(src) || /_[aqst]\.jpg$/.test(src))) {
        thisImage.addEventListener(
          'mouseover',
          function(event) {
            if (/_[aqst]\.jpg$/.test(this.getAttribute("style").match(/\((.*)\)/)[1]))
              fullsize=this.getAttribute("style").match(/\((.*)\)/)[1].replace(/_[aqst]\.jpg/, "_n.jpg");
            else
              fullsize=this.getAttribute("style").match(/\((.*)\)/)[1].replace(/\/[aqst](.*)$/, "/n$1");
            thisImage = this;
            parent = thisImage.parentNode;
            while (parent && !parent.href) {
              parent = parent.parentNode;
            } 
            globalTimer = window.setTimeout(
              function (thisImage) {return function(result) {
                newDiv.setAttribute('style', 'background:url('+loading+') no-repeat;min-height:32px;min-width:32px;position:fixed;z-index:1000;top:20px;left:20px;background-color:#F7F7F7;border:1px solid #3B5998;');
                newDiv.innerHTML = "<a href="+parent.href+"><img style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block; cursor: crosshair;' src='" + fullsize + "'></a></div>";
                newDiv.style.display = "inline";
              }}(thisImage),500
            );
          },
          true);
        thisImage.addEventListener(
          'mouseout',
          function(event) {
            window.clearTimeout(globalTimer);
            newDiv.style.display = "none";
          },
          true);
        thisImage.addEventListener(
          'mousemove',
          function(e) {
            eventThingX = e.pageX;
            eventThingY = e.pageY;
          },
          true);
      }
    }
  } 
  
  //new album images
  var newAlbumImages = document.evaluate("//a[@class='uiMediaThumb uiMediaThumbHuge' or @class='uiMediaThumb uiScrollableThumb uiMediaThumbHuge']/div/i|"+
                                         "//a[@class='uiMediaThumb uiMediaThumbHuge' or @class='uiMediaThumb uiScrollableThumb uiMediaThumbHuge']/i", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, backgroundImages); 
  //alert(newAlbumImages.snapshotLength)
  for (var i=backgroundImages.snapshotLength-1; i>=0; i--){
    var thisImage = backgroundImages.snapshotItem(i);
    //alert(thisImage.getAttribute("style"))
    if (/\((.*)\)/.test(thisImage.getAttribute("style"))) {
      var src = thisImage.getAttribute("style").match(/\("(.*)"\)/)[1];
      if ((src.indexOf('static') == -1) && src.indexOf('spacer') == -1 &&
          (/[aqst](\d+_)+\d+\.jpg$/.test(src) || /_[aqst]\.jpg$/.test(src))) {
        thisImage.addEventListener(
          'mouseover',
          function(event) {
            if (/_[aqst]\.jpg$/.test(this.getAttribute("style").match(/\("(.*)"\)/)[1]))
              fullsize=this.getAttribute("style").match(/\("(.*)"\)/)[1].replace(/_[aqst]\.jpg/, "_n.jpg");
            else
              fullsize=this.getAttribute("style").match(/\("(.*)"\)/)[1].replace(/\/[aqst](.*)$/, "/n$1");
            thisImage = this;
            parent = thisImage.parentNode;
            while (parent && !parent.href) {
              parent = parent.parentNode;
            } 
            globalTimer = window.setTimeout(
              function (thisImage) {return function(result) {
                newDiv.setAttribute('style', 'background:url('+loading+') no-repeat;min-height:32px;min-width:32px;position:fixed;z-index:1000;top:20px;left:20px;background-color:#F7F7F7;border:1px solid #3B5998;');
                newDiv.innerHTML = "<a href="+parent.href+"><img style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; display:block; cursor: crosshair;' src='" + fullsize + "'></a></div>";
                newDiv.style.display = "inline";
              }}(thisImage),500
            );
          },
          true);
        thisImage.addEventListener(
          'mouseout',
          function(event) {
            window.clearTimeout(globalTimer);
            newDiv.style.display = "none";
          },
          true);
        thisImage.addEventListener(
          'mousemove',
          function(e) {
            eventThingX = e.pageX;
            eventThingY = e.pageY;
          },
          true);
      }
    }
  } 
}

// *************
// The following code modified from code generously provided by 
// sizzlemctwizzle - http://userscripts.org/users/27715
// *************
// Re-run the code when the page changes
function process() {
  document.getElementById('content').removeEventListener('DOMSubtreeModified', process, false);
  window.setTimeout(function() {
    inYoFace();
    document.getElementById('content').addEventListener("DOMSubtreeModified", process, false);
  }, 200);
}

// Wait for Facebook's content element to exist
if (self.location == top.location) 
  var checker=setInterval(function(){
    if(document.getElementById('content')) {
      clearInterval(checker);
      process(); // Start the listener
    }
  }, 200);