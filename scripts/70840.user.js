// ==UserScript==
// @name           MargoMap zmodyfikowany
// @namespace      http://userscripts.org/users/70840
// @description    Mapka do Margonem
// @copyright      Ni ma
// @version        1.0
// @include        
// @exclude        
// ==/UserScript==
function HealersBag(){
  this.healingObjects = new Array();
  this.objectsContainer = null;
  this.init = function(){
    var bagWrapper = $(document.createElement('div')).addClass('healerWrapper').css({top:$('#bagc').offset().top,left:$('#bagc').offset().left});
    var nameHolder = $(document.createElement('div')).addClass('nameHolder').text('Kliknij na przedmiot aby go uĹźyÄ�);
    this.objectsContainer = $(document.createElement('div')).addClass('objectHolder');
    bagWrapper.append(nameHolder);
    bagWrapper.append(this.objectsContainer);
    $(document).find('body').append(bagWrapper);
    var css = 'div.healerWrapper{z-index:399;width:170px;background-color:#777;border:1px solid #d4d4d4;font-size:10px;font-family:verdana;padding:2px}div.healerWrapper .nameHolder{text-align:center;color:#0f0;background-color:#666;margin-bottom:5px;cursor:move;padding:5px 3px}div.healerWrapper .objectHolder{color:#fff}div.healerWrapper .objectHolder .healerObject{width:32px;height:32px;text-align:center;vertical-align:bottom;float:left;margin:2px 2px 0 0}div.healerWrapper .objectHolder .healerObject:hover{background-color:#888}div.healerWrapper .objectHolder .healerObject span{background-color:#000;color:#fff;padding:1px;font-size:0.8em;display:block;width:16px}';
    $(document).find('body').append($(document.createElement('style')).html(css));
    bagWrapper.draggable({handle:'div.nameHolder'})
    this.refresh();
    this.refillObjectsHolder();
  }

  this.refresh = function(){
    this.healingObjects = new Array();
    var str = '';
    for (var i in g.item){
      if (g.item[i].stat.search(/leczy=/) >= 0 && g.item[i].loc == 'g'){
        if (this.healingObjects[g.item[i].pr] === undefined){
          this.healingObjects[g.item[i].pr] = new Array();
          this.healingObjects[g.item[i].pr]['icon'] = g.item[i].icon;
          this.healingObjects[g.item[i].pr]['name'] = g.item[i].name;
          this.healingObjects[g.item[i].pr]['amount'] = 0;
          str += this.healingObjects[g.item[i].pr]['name'];
        }
        this.healingObjects[g.item[i].pr]['ids'] = new Array();
        this.healingObjects[g.item[i].pr]['ids'].push(i);
        var stats = g.item[i].stat.split(';');
        for (var j in stats){
          var tmpStat = stats[j].split('=');
          if (g.item[i].stat.search(/amount=/) >= 0){
            if (tmpStat[0] == 'amount'){
              this.healingObjects[g.item[i].pr]['amount'] += parseInt(tmpStat[1]);
            }
          }else{
            this.healingObjects[g.item[i].pr]['amount'] += 1;
          }
          
          if (tmpStat[0] == 'leczy'){
            this.healingObjects[g.item[i].pr]['leczy'] = tmpStat[1];
          }
        }
      }
    }
  }

  this.refillObjectsHolder = function(){
    this.objectsContainer.html('');
    for (var i in this.healingObjects){
      var tmpObj = $(document.createElement('div')).addClass('healerObject');
      var hO = this.healingObjects;
      tmpObj.css({
        background:'url("/obrazki/itemy/'+this.healingObjects[i]['icon']+'") no-repeat #777',
      }).attr({
        'tip':'Leczy: '+this.healingObjects[i]['leczy'],
        'ctip':'t_item',
        'hId': i
      }).click(function(){
        var id = null;
        for(var j in hO[i]['ids']){
          id = hO[$(this).attr('hId')]['ids'][j];
          break;
        }
        _g("moveitem&st=1&id=" + id);
        window.setTimeout('__healBag.refresh();__healBag.refillObjectsHolder()', 1000);
      }); 
      tmpObj.append($(document.createElement('span')).text(this.healingObjects[i]['amount']).css({opacity:0.5}));
      this.objectsContainer.append(tmpObj)
    }
    this.objectsContainer.append($(document.createElement('div')).css({clear:'both'}))
  }

  this.init();
} 
// _g("moveitem&st=1&id=" + i)
__healBag = new HealersBag();