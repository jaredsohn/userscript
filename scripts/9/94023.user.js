// ==UserScript==
// @name          La Banque Postale - No Virtual Keyboard
// @namespace     org.bouil
// @description   Remove virtual keyboard and add a classic input text field for the password on La Banque Postale website https://www.labanquepostale.fr/
// @include       https://voscomptesenligne.labanquepostale.fr/wsost/OstBrokerWeb/loginform?TAM_OP=login&ERROR_CODE=0x00000000&URL=%2Fvoscomptes%2FcanalXHTML%2Fidentif.ea%3Forigin%3Dparticuliers
// @version       0.4.2
// @updateURL     http://userscripts.org/scripts/source/94023.user.js
// @grant         none
// ==/UserScript==

var debug = false;

var hashToNumber = new Object();
// firefox
hashToNumber[2128638187]  = -1;
hashToNumber[-1351851654] = 0;
hashToNumber[-501921261]  = 1;
hashToNumber[913113212]   = 2;
hashToNumber[1768253725]  = 3;
hashToNumber[-277278126]  = 4;
hashToNumber[-2095057950] = 5;
hashToNumber[-174876805]  = 6;
hashToNumber[-1682956010] = 7;
hashToNumber[1387688270]  = 8;
hashToNumber[1092263165]  = 9;

// chrome
hashToNumber[-564694437]  = -1;
hashToNumber[-1651732861] = 0;
hashToNumber[-1352214691] = 1;
hashToNumber[2023185503]  = 2;
hashToNumber[-612770415]  = 3;
hashToNumber[600667828]   = 4;
hashToNumber[-295522482]  = 5;
hashToNumber[1173135910]  = 6;
hashToNumber[-975180446]  = 7;
hashToNumber[-431144701]  = 8;
hashToNumber[-988143661]  = 9;

function hashCode(s){           // djb2
  return s.split("").reduce(function(a,b){
    a=((a<<5)-a)+b.charCodeAt(0);
    return a&a;                 // Convert to 32bit integer
  },0);
}

function metaData(str) {
  if ("undefined" !== typeof(GM_info))
    return GM_info.script[str];
  else if ("undefined" !== typeof(GM_getMetadata))
    return GM_getMetadata(str);
  else {
    console.log("GM_ API unsupported");
    return "unknown";
  }
}

function image2number(imageDataBase64) {
  var imageHash = hashCode(imageDataBase64);
  var number = hashToNumber[imageHash];
  return number;
};

function decodeGrid(grid) {

  const kGridSize = 4;
  const kCellHeight = 35; // chaque case chiffre fait kCellHeight px de côté sans la bordure de 1px
  const kBorderSize = 2;

  var canvas, ctx, imageData;

  var n2p = new Object();

  for (var y=0; y<kGridSize; y++) {
    for (var x=0; x<kGridSize; x++) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", kCellHeight);
      canvas.setAttribute("height", kCellHeight);
      canvas.setAttribute("style", "display: inline; border: 1px solid red;");
      ctx = canvas.getContext('2d');

      ctx.fillStyle = "rgb(255,255,100)";
      ctx.fillRect(0, 0, kCellHeight, kCellHeight);

      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      ctx.drawImage(grid,
                    (kCellHeight+kBorderSize)*x,
                    (kCellHeight+kBorderSize)*y,
                    kCellHeight,
                    kCellHeight,
                    0, 0, kCellHeight, kCellHeight); // dst
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // no need to convertColor(imageData) here. see http://userscripts.org/scripts/show/126488 - FreeMobile TinyAuth
      ctx.putImageData(imageData, 0, 0);
      var imageDataBase64 = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
      var number = image2number(imageDataBase64);
      var gridPosition = (y * kGridSize + x);

      if (debug) {
        var br = document.createElement("br");
        document.body.appendChild(br);
        document.body.appendChild(canvas);
        numberElement = document.createElement("span");
        numberElement.setAttribute("style", "border-bottom: 1px solid red;");
        numberElement.innerHTML = " row=" + y + ";col=" + x +
          ";imgNumber=" + gridPosition +
          ";hash=" +
          hashCode(imageDataBase64) + " = " +
          number;
        document.body.appendChild(numberElement);
        document.body.appendChild(br);
      }

      if (number != -1) {
        n2p[number] = gridPosition;
      }

      if (number < -1 || number > 9) {
        alert("Décodage de la grille échoué " + number);
        throw new Error("Décodage échoué.");
      }

    }
  }

  if (debug) {
    console.log("Number -> Grille =");
    console.log(n2p);
  }

  for(n=0;n<10;n++){
    if (typeof n2p[n] == "undefined"){
      alert("Grille non decodee pour le chiffre " + n + ". Essayez de mettre a jour le script.");
      break;
    }
  }

  return n2p;
}

/**
 * replaces the img/map grid with a simple password input. The login input
 * remains unchanged.
 */
function customizeUi(grid) {
  var loginInput = document.getElementById("val_cel_identifiant");

  var divContenuBloc = loginInput.parentNode;
  var newPasswordLabel = document.createElement("label");
  newPasswordLabel.setAttribute("for", "gm_password");
  newPasswordLabel.setAttribute("id", "gm_labelpassword");
  newPasswordLabel.innerHTML = "Saisir le mot de passe";
  divContenuBloc.appendChild(newPasswordLabel);

  var newPasswordInput = document.createElement("input");
  newPasswordInput.setAttribute("type", "password");
  newPasswordInput.setAttribute("id", "gm_password");
  newPasswordInput.setAttribute("name", "gm_password");
  newPasswordInput.setAttribute("autocomplete", "On");
  newPasswordInput.setAttribute("maxlength","6");
  newPasswordInput.setAttribute("placeholder", "mot de passe");
  divContenuBloc.appendChild(newPasswordInput);

  var newSubmit = document.createElement("input");
  newSubmit.setAttribute("type", "submit");
  newSubmit.setAttribute("value", "VALIDER");
  newSubmit.style.height = "2em";
  divContenuBloc.appendChild(newSubmit);

  // add some info about this script
  var about = document.createElement("div");
  var ptmp = document.createElement("h3");
  ptmp.innerHTML = metaData("name");
  about.appendChild(ptmp);
  ptmp = document.createElement("p");
  ptmp.innerHTML = "Version " + metaData("version");
  about.appendChild(ptmp);
  divContenuBloc.appendChild(about);

  document.getElementById("motDePasseBloc").style.display = "none";
  loginInput.focus();

  return {newSubmit: newSubmit, newPasswordInput: newPasswordInput};
}

/**
 * attach the submit handler, that translates the password to a positional
 * string, and feeds the dedicated hidden field with it.
 */
function attachSubmitHandler(map, submitElt, passwordElt) {

  function createSubmitHandler(form, map, password){ return function (event) {
    var password = passwordElt.value;
    var keyboardPass = "";
    for(i = 0 ; i < password.length ; i++){
      var k = map[password[i]];
      if (k < 10) k = "0" + k;
      keyboardPass = keyboardPass + k;
    }
    document.getElementById("cs").value = keyboardPass;

    if (debug)
      alert("pass="+keyboardPass);
    else
      form.submit();
  }}

  var form = document.forms['formAccesCompte'];
  var submitHandler = createSubmitHandler(form, map, passwordElt.value);
  form.addEventListener('submit', submitHandler, false);
}


function main() {
  var grid = document.getElementById("clavierImg");

  if (!grid) {
    alert("Aucune grille d'identification trouvee");
    return;
  }

  if (debug) {
    console.log("Grid is");
    console.log(grid);
  }

  var customizeUiResult = customizeUi(grid);

  var image = new Image();
  image.onload = function() {
    var number2GridPositionMap = decodeGrid(grid);
    attachSubmitHandler(number2GridPositionMap, customizeUiResult.newSubmit, customizeUiResult.newPasswordInput);
  };
  image.src = grid.src;
};

main();
