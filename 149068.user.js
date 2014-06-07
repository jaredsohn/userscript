// ==UserScript==
// @name infernal wrapper
// @description Supplies some wrapper functions for public use 
// @namespace infernal_wrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.384441 krisan pre
// @author ppl before me and me (KRS update)
// ==/UserScript==
(function () {
  var CCTAWrapper_main = function () {
    try {
    gni = function(o, idx){
        var i = 0;
        for (k in o){
            if (i++ == idx) return k;
            //i++;
        }
        return '';
    }
    gbi = function(n, o, idx)   {/*_log(n);_logp(o);*/var i=0;for(k in o){i++;if(i==idx) return o[k];}}
    sbi = function(n, o, idx, v){/*_log(n);_logp(o);*/var i=0;for(k in o){i++;if(i==idx) o[k]=v;}}
    _log = function(){
        if(typeof console != 'undefined') console.log(arguments);
	    else if(window.opera) opera.postError(arguments);
	    else GM_log(arguments);
	}
	hmm = []
	_show = function(o){var ks=[];var i=0; for (k in o)ks[i++]=k;return ks;}
	_logp = function(o){_log(_show(o));}
    _log('have fun :)')
    wrapper = {
       _val_or_def: function(val, def) {
            if(typeof val != 'undefined') return val;
            return def;
        },
        _prop_name: function(prop_map) {return prop_map[this.versions[this.version]];},
        _prop_index: function(prop_map) {return prop_map[this.versions[this.version]+1];},
		versions: {'384441': 0, '378171': 2},
        version: null,//'368132',
        init_wrap: function(wrap) {
            try {
                var fn = wrap[0]
                var to_name = wrap[1]
                var tp_name = wrap[2]
                var sp_map = wrap[3]
                if(wrap.length == 5) var opt_so_name = wrap[4];
                var so_name = this._val_or_def(opt_so_name, to_name)
                var sp_index = sp_map[this._index]
                //_log('testing'+to_name+'.'+tp_name+'='+sp_name+':'+sp_index+':'+sp_map[this._name])//
                var sp_name, eval_str;
                switch (fn){
                    case 0:
                        sp_name = gni(eval(so_name), sp_index)
                        eval_str = to_name+"."+tp_name+" = "+so_name+"."+sp_name;
                        break;
                    case 1: 
                        sp_name = gni(eval(so_name+'.prototype'), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = "+so_name+".prototype."+sp_name;
                        break;
                    case 2:
                        sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = function(){return this."+sp_name+";}"
                        break;
                    case 3:
                        sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = function(value){this."+sp_name+"=value;}"
                        break;
                    case 6:
                        //[3, 'ClientLib.Vis.Battleground.Battleground', 'set_CurrentReplay', ['EERHCU', 55, 'GHHUDD', 57]],
                        //[6, 'webfrontend.Util.getDateTimeString', 'phe.cnc.Util.getDateTimeString', ['',0,'',0]]
                        //3 ClientLib.Vis.Battleground.Battleground.prototype.set_CurrentReplay = function(value){this.KEHWTC=value;}
                        //fn  so_name                                 sp_index evel_str
                        //3   ClientLib.Vis.Battleground.Battleground 55       ClientLib.Vis.Battleground.Battleground.prototype.set_CurrentReplay = function(value){this.KEHWTC=value;}
                        sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = function(value){this."+sp_name+"=value;}"
                        break;
                }
                console.log(fn, so_name, sp_index, eval_str);
                eval(eval_str)
            } catch(e) {
                _log(e)
            }
        },
        wraps: [
            [0, 'System', 'EventHandler', ['VTJBRR', 577/*556*/, 'AFADHT', 543]],
			[1, 'System.EventHandler', '$ctor', ['UTJPOT', 1, 'UOZTQY', 1]],
			[1, 'ClientLib.Vis.ViewModeChange', '$ctor', ['UTJPOT', 1, 'UOZTQY', 1]],
            [0, 'SharedLib', 'Combat', ['ESVYJP', 511/*'CJLCVL', 519*/, 'NOOXEE', 503]],
            [0, 'SharedLib.Combat', 'CbtSetup', ['IOMJTL', 571/*'HIWRPX', 550*/, 'IIFAVI', 537], 'SharedLib'],
            [0, 'SharedLib.Combat', 'CbtSimulation', ['KSEAHB', 574/*'HGWILL', 553*/, 'UYGNWU', 540], 'SharedLib'],
			[2, 'ClientLib.Vis.Battleground.Battleground', 'get_Entities', ['ECZKLY', 32, 'XRJAVF', 34]],
			[1, 'SharedLib.Combat.CbtSimulation', 'DoStep', ['AXYNEQ', 26, 'JTYQVH', 26]],//IOMJTL.AXYNEQ //KSEAHB.prototype.YWLWQI==[574][26]
			[2, 'SharedLib.Combat.CbtSimulation', 'get_iCombatStep', ['ZMGJIP', 13,  'BMCNPQ', 13]],
            [0, 'SharedLib.Combat', 'CbtEntity', ['OPOFMB', 579/*558*/, 'IIAZTQ', 545], 'SharedLib'],
			[2, 'SharedLib.Combat.CbtEntity', 'get_eAlignment', ['ZBXTZH', 16, 'FOKJZX', 16]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_iHitpoints', ['UWDOOG', 25, 'VDCHUJ', 24]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_iHitpointsCurrent', ['WNQZQQ', 26, 'JZXSYD', 25]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_MDCTypeId', ['ASVHDS', 13, 'CMMKDD', 13]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_iLevel', ['NEYIYY', 41, 'XQMCPN', 40]],
			[0, 'ClientLib.Base.Util', 'GetUnitLevelData', ['KOPLTH', 38, 'LSTKZJ', 38]],
            [0, 'ClientLib.Data', 'World', ['UHPQFY', 114/*238*/, 'CVSXEK', 231], 'SharedLib'],
			[2, 'ClientLib.Data.World', 'getSectors', ['VDXWEY', 8, 'QNJSYU', 8]],
			[2, 'ClientLib.Data.CityUnits', 'get_FullRawRepairTimeForUnitGroupTypes', ['FQQDKU', 7, 'OPJJET', 7]],
			[1, 'ClientLib.Data.CityUnits', 'get_OffenseUnits', ['WXNKGM', 69, 'AYJNMO', 69]],
			[1, 'ClientLib.Data.CityUnits', 'get_DefenseUnits', ['HUDWHK', 70, 'IBJHND', 70]],
            [0, 'ClientLib.Data', 'CityRepair', ['BOIFDD', 361/*323*/, 'FQDPEX', 312], 'SharedLib'], //getWrapperNamespaceApi("$I.323", false);
			[1, 'ClientLib.Data.CityRepair', 'CanRepair', ['ZUSBPX', 53, 'AUFSAM', 53]],//$I.XFTHBD.prototype.APHJKC
			[1, 'ClientLib.Data.CityRepair', 'UpdateCachedFullRepairAllCost', ['NGLRIP', 64, 'VRKPYE', 64]],
			[1, 'ClientLib.Data.CityRepair', 'ConvertRepairCost', ['ZXZXBO', 55, 'AEITZO', 55]],
			[1, 'ClientLib.Data.CityPreArmyUnits', 'RefreshData', ['VDORYX', 20, 'DJQZII', 20]],
			[2, 'ClientLib.Data.City', 'getResourceLayout', ['UFYRPZ', 52, 'WPDEHJ', 52]],
			[2, 'ClientLib.Data.CityBuildings', 'get_Buildings', ['ELYFUE', 2, 'ZJTMHA', 2]],
			[2, 'ClientLib.Data.CityEntity', 'get_UnitLevelRequirements', ['NEKRGQ', 2, 'TCMROL', 2]],
			[1, 'ClientLib.Data.CityEntity', 'get_UnitLevelRepairCost', ['get_UnitLevelRequirements', 72, 'get_UnitLevelRequirements', 72]],
			[3, 'ClientLib.Data.Combat', 'set_Version', ['VAQFXB', 1, 'DOGGGJ', 1]],
			[3, 'ClientLib.Data.Combat', 'set_StartStep', ['RBWZKP', 3, 'BHPWTD', 3]],
			[3, 'ClientLib.Data.Combat', 'set_Attacker', ['URXNIW', 4, 'DSQFIO', 4]],
			[3, 'ClientLib.Data.Combat', 'set_Defender', ['PURJES', 5, 'UXMGLT', 5]],
			[3, 'ClientLib.Data.Combat', 'set_Blocker', ['SYHMUJ', 6, 'NLGWSU', 6]],
			[3, 'ClientLib.Data.Combat', 'set_Buildings', ['BMURJF', 7, 'HCYUZW', 7]],
			[3, 'ClientLib.Data.Combat', 'set_Supports', ['EAUKRT', 8, 'IERKJL', 8]],
			[3, 'ClientLib.Data.Combat', 'set_Debug', ['RHRTPD', 38, 'SYFSMI', 38]],
			[1, 'ClientLib.Data.Combat', 'setNPCNames', ['OHTDDF', 46, 'DXEQJR', 46]],
            [0, 'ClientLib.Vis.Battleground', 'BattlegroundEntity', ['IIYEQI', 578/*557*/, 'MGYGBY', 544], 'System'],
			[2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_Entity', ['IAHZWW', 26, 'USSQQS', 25]],
			[2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_UnitType', ['JMHYKA', 2, 'HXPPNL', 1]],
			[2, 'ClientLib.Vis.Battleground.Battleground', 'get_Simulation', ['EZXMKS', 29, 'RSJUWY', 31]],
			[3, 'ClientLib.Vis.Battleground.Battleground', 'set_CurrentReplay', ['EERHCU', 55, 'GHHUDD', 57]],
			[1, 'ClientLib.Vis.Battleground.Battleground', 'setCombatData', ['JPSIEV', 172, 'WXLNME', 174]],
			[2, 'ClientLib.Res.ResMain', 'get_Gamedata', ['SSBIUH', 1, 'FCSRFI', 1]]
			//[6, 'webfrontend.Util.getDateTimeString', 'phe.cnc.Util.getDateTimeString', ['',0,'',0]]
        ],

        init: function() {
            try{
                this._name = this.versions[this.version]
                this._index = this._name + 1
                console.log(arguments.callee.name, this._name, this._index);
                System = $I
                SharedLib = $I

                var j = 0;
                for (var i in this.wraps) {
                  console.log(j++);
                  this.init_wrap(this.wraps[i]);
                }

              }catch(e){
                _log(e)
            }
        }
    }  
      function createCCTAWrapper() {
        console.log('CCTAWrapper loaded');
        _log('wrapper loading'+PerforceChangelist);
        wrapper.version = '' + PerforceChangelist;
        wrapper.init()
        _log('wrapper loaded')
        _log(hmm)
      }
    } catch (e) {
      console.log("createCCTAWrapper: ", e);
    }

    function CCTAWrapper_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCCTAWrapper();
        } else {
          window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
      } catch (e) {
        CCTAWrapper_IsInstalled = false;
        console.log("CCTAWrapper_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
    }
  }

  try {
    var CCTAWrapper = document.createElement("script");
    CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
    CCTAWrapper.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
    }
  } catch (e) {
    console.log("CCTAWrapper: init error: ", e);
  }
})();