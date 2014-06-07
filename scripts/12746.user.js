// ==UserScript==
// @name           MAL User Similarity
// @namespace      abhin4v.myinfo.ws
// @description    Calculates the similarity between two myanimelist.net users using the Carl Pearson's Correlation Coefficient
// @include        http://*myanimelist.net/sharedanime.php*
// ==/UserScript==

function $x(p, context) {
  if (!context) context = document;
  //alert(context);
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function getNumber(e) {
    return parseFloat(e.innerHTML);
}

function getCPCoeffSimilarity(p1, p2, context) {
    var scorelist1 = $x(p1, context).map(getNumber);
    var scorelist2 = $x(p2, context).map(getNumber);
    var scorenodes1 = $x(p1, context);
    var scorenodes2 = $x(p2, context);

    scorelist1.pop();
    scorelist2.pop();
    
    mean1 = 0;
    mean2 = 0;
    count = 0;
    for (i=0; i<scorelist1.length; i++) {
        if (isNaN(scorelist1[i]) || isNaN(scorelist2[i])) continue;
        mean1 += scorelist1[i];
        mean2 += scorelist2[i];
        count++;
    }
    mean1 = mean1/count;
    mean2 = mean2/count;
    
    product = 0;
    sqmag1 = 0;
    sqmag2 = 0;
    mincount = 5;
    count = 0;
    
    for (i=0; i<scorelist1.length; i++) {
        if (isNaN(scorelist1[i]) || isNaN(scorelist2[i])) continue;
        
        product += (scorelist1[i] - mean1)*(scorelist2[i] - mean2);
        sqmag1 += (scorelist1[i] - mean1)*(scorelist1[i] - mean1);
        sqmag2 += (scorelist2[i] - mean2)*(scorelist2[i] - mean2);
        count++;
    }
    
    similarity = product/Math.sqrt(sqmag1*sqmag2);
    similarity = Math.round(similarity*100)
    similarity = (count > mincount) ? similarity : "-999";
    return similarity;
}

if (window.location.pathname == "/sharedanime.php") {
    CPCoeffSimilarity = getCPCoeffSimilarity("/html/body/div/div[3]/div[2]/table/tbody/tr/td[2]/span", "/html/body/div/div[3]/div[2]/table/tbody/tr/td[3]/span", document);
    insertDiv = $x("/html/body/div/div[3]/div[2]/div")[0];
    node = document.createElement("span");
    if (CPCoeffSimilarity != "-999") {
        node.innerHTML =  " | <b>Similarity:</b> " + CPCoeffSimilarity + "%";
        if (CPCoeffSimilarity <= -50) {
            node.innerHTML += " (High Dissimilarity)";
        } else if ((CPCoeffSimilarity > -50) && (CPCoeffSimilarity <= -30)) {
            node.innerHTML += " (Medium Dissimilarity)";
        } else if ((CPCoeffSimilarity > -30) && (CPCoeffSimilarity <= -10)) {
            node.innerHTML += " (Low Dissimilarity)";
        } else if ((CPCoeffSimilarity > -10) && (CPCoeffSimilarity < 10)) {
            node.innerHTML += " (Unrelated)";
        } else if ((CPCoeffSimilarity >= 10) && (CPCoeffSimilarity < 30)) {
            node.innerHTML += " (Low Similarity)";
        } else if ((CPCoeffSimilarity >= 30) && (CPCoeffSimilarity < 50)) {
            node.innerHTML += " (Medium Similarity)";
        } else if (CPCoeffSimilarity >= 50) {
            node.innerHTML += " (High Similarity)";
        }
    } else {
        node.innerHTML =  " | <b>Similarity:</b> Not enough shared anime";
    }
    insertDiv.appendChild(node);
}

if (window.location.pathname.substring(0, 8) == "/profile") {
    try {
        sharedAnimeUrl = $x("/html/body/div/div[3]/div[2]/table/tbody/tr/td[2]/table[3]/tbody/tr/td/div/div/a")[0].href;

        GM_xmlhttpRequest({
            method: "GET",
            url: sharedAnimeUrl,
            onload: function(xhr) {
                sp = document.createElement("span");
                sp.style.display = "none";
                sp.id = "sharedAnime";
                sp.innerHTML = xhr.responseText;
                sp = document.body.appendChild(sp);
                similarity = getCPCoeffSimilarity("/html/body/span/div/div[3]/div[2]/table/tbody/tr/td[2]/span", "/html/body/span/div/div[3]/div[2]/table/tbody/tr/td[3]/span", document);
                ratingDiv = $x("/html/body/div/div[3]/div[2]/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td/div/div/div[2]/div")[0];
                ratingDiv.style.width = (similarity != "-999") ? (similarity + "%") : "1%";
                ratingDiv.innerHTML = (similarity != "-999") ? (similarity + "%") : "&nbsp;";
            }
      });
    }
    catch(e) {}
}