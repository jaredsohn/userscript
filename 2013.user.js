// ==UserScript==
// @name          Shuffle Netflix Queue
// @namespace     http://ctro.net
// @description   Shuffles your Netflix queue
// @include       http://www.netflix.com/Queue*
// ==/UserScript==


//make an array full of 0 to n, then randomize.

(function() {

    //add a button to shuffle.
    //  this bit is pretty fragile -- if netflix changes it's markup it might break.
    shuffleButton = document.createElement("input");
    shuffleButton.setAttribute("type","button");
    shuffleButton.setAttribute("value","Shuffle Queue");
    shuffleButton.setAttribute("class","core-button");
    shuffleButton.onclick=shuffleQ;
    for(i=0; (inputTag = document.getElementsByTagName("input")[i]); i++) {
        if(inputTag.className=="core-button")
            break;
    }
    inputTag.parentNode.appendChild(shuffleButton);

    //pre: array of numbers
    //post: randomized array of numbers
    function randomizeArray(arr){
      var i = arr.length;
      if ( i == 0 ) return false;
      while ( --i ) {
         var j = Math.floor( Math.random() * ( i + 1 ) );
         var tempi = arr[i];
         var tempj = arr[j];
         arr[i] = tempj;
         arr[j] = tempi;
       }
    }

    //pre: netflix Queue page
    //post: a netflix Queue page with shuffled order.
    function shuffleQ(){
      //how many order text boxes are there?
      var numBoxes=0;
      for(i=0; (tb = document.getElementsByTagName("input")[i]); i++) {
          if (tb.className=="o")
            numBoxes += 1;
      }

      //fill an array with the
      var randomNumbers= new Array(numBoxes);
      for(i=0; i<numBoxes; i++)
        randomNumbers[i] = i;
      randomizeArray(randomNumbers);

      //fill the order text boxes with the randomized array values
      var currBoxCount = 0;
      for(i=0; (tb = document.getElementsByTagName("input")[i]); i++) {
        if (tb.className=="o") {
          tb.value = randomNumbers[currBoxCount]+1;
          currBoxCount += 1;
        }
      }
    }

})();
