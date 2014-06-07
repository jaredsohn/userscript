// ==UserScript==
// @name          تكبير الخريطة
javascript: newMapSize = parseInt(prompt("Plz enter map size (1 number) NOWZ!!1!!111ELEVEN!", "50"));
TWMap.resize(newMapSize);
btn = document.createElement("input", "button");
btn.type = "button";
btn.value = "Click to Start";

btn.onclick = function()
   {javascript: imageOverlay = prompt("Please enter the internet path for the image you want to overlay", 
      "http://www.supercoloring.com/wp-content/main/2010_06/a-cock-outline-coloring-page.jpg");
    imageWidth = parseInt(prompt("please enter the Total number of map fields HORIZONTALLY you want your image to cover (left to right)", "25")) * 
      53;
    imageHeight = parseInt(prompt("please enter the Total number of map fields VERTICALLY you want your image to cover (Top to Bottom)", "25")) * 
      38;
    imageBuffer = parseInt(prompt("Please enter the total map fields to buffer around the image (recommend > 10","5"));
    mapBox = $("#map_wrap")[0];
    $(mapBox).append( "<img src='" + imageOverlay + 
      "' style='position:absolute; top:"+ imageBuffer*38+"px; left:"+imageBuffer*53+"px; z-index: 5; width:" + imageWidth + "px; height:" + 
      imageHeight + "px; opacity:0.2;'>");
    void (0);
   };
document.body.appendChild(btn);

function dalesStuff()
   {if (format === undefined)
       {var format ="[coord]{coord}[/coord]";
       }
    var win = (window.frames.length > 0) ? window.main: window;
    var index = 0;
    var outputID = 'villageList';
    $(document).ready(function()
       {if ($('#' + outputID).length <= 0)
           {var srcHTML = '<div id="coord_picker">' + 
              '<span style="color:blue;text-decoration:underline;">The majority of dalesmckay\'s co-ordinate picker v7.1,\n has been used for simplicity in this script:</span><br/><br/><textarea id="' + 
              outputID + '" cols="40" rows="10" value="" onFocus="this.select(); "/>' + '</div>';
            ele = win.$('body').append(win.$(srcHTML));
           
            win.TWMap.map._handleClick = function(e)
               {index++;
                var pos = this.coordByEvent(e);
                var x = pos[0];
                var y = pos[1];
                var coord = pos.join( "|");
                coordidx = x * 1000 + y, village = TWMap.villages[coordidx];
                var ownername, ownerpoints, tribetag, tribename, tribepoints, ownerally;
                if (village.owner == 0)
                   {ownername = "";
                    ownerpoints = 0;
                   }
                else 
                   {owner = TWMap.players[village.owner];
                    if (TWMap.allies[TWMap.players[village.owner]] > 0)
                       {tribetag = TWMap.allies[TWMap.players[village.owner].ally].tag;
                        tribename = TWMap.allies[TWMap.players[village.owner].ally].name;
                        tribepoints = TWMap.allies[TWMap.players[village.owner].ally].points;
                        ownerally = owner.ally;
                        tribe = TWMap.allies[TWMap.players[village.owner].ally];
                       }
                    else 
                       {tribe = "";
                        tribetag = "";
                        tribename = "";
                        tribepoints = "";
                        ownerally = 0;
                       }
                   }
                var image = "";
                if (village.bonus)
                   {                   image = village.bonus[1];
                   }
                var data = format.replace("{coord\}", coord).replace("{player\}", owner.name).replace("{playerpoints\}", owner.points).replace("{playerid\}", 
                  village.owner).replace("{villageid\}", village.id).replace("{points\}", village.points.replace(".", "")).replace("{tag\}", tribetag).replace("{tribename\}", 
                  tribename).replace("{tribepoints\}", tribepoints).replace("{tribeid\}", owner.ally).replace("{x\}", x).replace("{y\}", y).replace("{kk\}", 
                  TWMap.con.continentByXY(x, y)).replace("{image\}", 'http://' + document.URL.split( '/')[2] + '/graphic/' + image).replace("{index\}", 
                  index).replace("{NL\}", "\n");
                document.getElementById(outputID).value += data; /* $('#' + outputID).value += data + "\n";*/
                return false;
               };
           }
       });
   }
dalesStuff();
void (0);
// ==/UserScript==
