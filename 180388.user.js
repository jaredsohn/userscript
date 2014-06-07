// ==UserScript==
// @name       Choppin' Wood Backup
// @namespace  http://blog.nabbotts.com/
// @version    0.2
// @description  Backup mechanism for choppin' wood
// @match      http://choppin-wood.com/*
// @copyright  2013+, Nathanael Abbotts
// ==/UserScript==

var backup = {};

backup.init = function () {
    var b = document.getElementsByTagName('body')[0], 
        div = document.createElement('div'),
        storedBackupNames = localStorage.getItem('backupNames'),
        storedBackups = localStorage.getItem('backup');
    
    
    
    backup.backupNames = storedBackupNames !== null ? JSON.parse(storedBackupNames) : [];
    backup.backups = storedBackups !== null ? JSON.parse(storedBackups) : {};
    
    div.id = 'backup';
    div.innerHTML = ['<form>',
                     '<div>',
                     '<label for="backup-name">Backup Name:</label>',
                     '<input type="text" id="backup-name" />',
                     '<input type="button" id="save-backup" value="Save">',
                     '</div><div>',
                     '<label for="backup-selection">Select Backup:</label>',
                     '<select id="backup-selection"></select>',
                     '<input type="button" id="load-backup" value="Load">',
                     '</div>',
                     '</form>'
                    ].join("");
    b.appendChild(div);
    
    backup.populateBackupList();
}

backup.populateBackupList = function () {
    var backupOptions = [], i;
    for (i = 0; i < backup.backupNames.length; i++) {
        backupOptions.push("<option>" + backup.backupNames[i] + "</option>");
    }
    
    document.getElementById('backup-selection').innerHTML = backupOptions.join("");
}

backup.loadBackup = function (b) {
    
    
    unsafeWindow.lumber = b.lumber;
    unsafeWindow.oil = b.oil;
    unsafeWindow.money = b.money;
    unsafeWindow.totalLumberCreated = b.totalLumberCreated;
    unsafeWindow.totalOilCreated = b.totalOilCreated;
    unsafeWindow.totalMoneySpent = b.totalMoneySpent;
    
    unsafeWindow.lumberjackFleet.count = b.lumberJackFleet.count;
    unsafeWindow.lumberjackFleet.cost = b.lumberJackFleet.cost;
    unsafeWindow.loggingTruckFleet.count = b.loggingTruckFleet.count;
    unsafeWindow.loggingTruckFleet.cost = b.loggingTruckFleet.cost;
    unsafeWindow.loggingHeliFleet.count = b.loggingHeliFleet.count;
    unsafeWindow.loggingHeliFleet.cost = b.loggingHeliFleet.cost;
    unsafeWindow.loggingCampFleet.count = b.loggingCampFleet.count;
    unsafeWindow.loggingCampFleet.cost = b.loggingCampFleet.cost;
    unsafeWindow.lumberMillFleet.count = b.lumberMillFleet.count;
    unsafeWindow.lumberMillFleet.cost = b.lumberMillFleet.cost;
    unsafeWindow.logBoomFleet.count = b.logBoomFleet.count;
    unsafeWindow.logBoomFleet.cost = b.logBoomFleet.cost;
    unsafeWindow.clearCutterFleet.count = b.clearCutterFleet.count;
    unsafeWindow.clearCutterFleet.cost = b.clearCutterFleet.cost;
    
    unsafeWindow.oilWorkerFleet.count = b.oilWorkerFleet.count;
    unsafeWindow.oilWorkerFleet.cost = b.oilWorkerFleet.cost;
    unsafeWindow.drillingRigFleet.count = b.drillingRigFleet.count;
    unsafeWindow.drillingRigFleet.cost = b.drillingRigFleet.cost;
    unsafeWindow.tankerTruckFleet.count = b.tankerTruckFleet.count;
    unsafeWindow.tankerTruckFleet.cost = b.tankerTruckFleet.cost;
    unsafeWindow.oilPlatformFleet.count = b.oilPlatformFleet.count;
    unsafeWindow.oilPlatformFleet.cost = b.oilPlatformFleet.cost;
    unsafeWindow.oilPipelineFleet.count = b.oilPipelineFleet.count;
    unsafeWindow.oilPipelineFleet.cost = b.oilPipelineFleet.cost;
    unsafeWindow.oilRefineryFleet.count = b.oilRefineryFleet.count;
    unsafeWindow.oilRefineryFleet.cost = b.oilRefineryFleet.cost;
    unsafeWindow.oilTankerFleet.count = b.oilTankerFleet.count;
    unsafeWindow.oilTankerFleet.cost = b.oilTankerFleet.cost;
}

backup.load = function () {
    var name = document.getElementById('backup-selection').value;
    backup.loadBackup(backup.backups[name]);
    saveGame();
}

backup.save = function () {
    var name = document.getElementById('backup-name').value;
    backup.backups[name] = {
        lumber: unsafeWindow.lumber,
        oil: unsafeWindow.oil,
        money: unsafeWindow.money,
        totalLumberCreated: unsafeWindow.totalLumberCreated,
        totalOilCreated: unsafeWindow.totalOilCreated,
        totalMoneySpent: unsafeWindow.totalMoneySpent,
        lumberjackFleet: {
            count: unsafeWindow.lumberjackFleet.count,
            cost: unsafeWindow.lumberjackFleet.cost
        },
        loggingTruckFleet: {
            count: unsafeWindow.loggingTruckFleet.count,
            cost: unsafeWindow.loggingTruckFleet.cost
        },
        loggingHeliFleet: {
            count: unsafeWindow.loggingHeliFleet.count,
            cost: unsafeWindow.loggingHeliFleet.cost
        },
        loggingCampFleet: {
            count: unsafeWindow.loggingCampFleet.count,
            cost: unsafeWindow.loggingCampFleet.cost
        },
        lumberMillFleet: {
            count: unsafeWindow.lumberMillFleet.count,
            cost: unsafeWindow.lumberMillFleet.cost
        },
        logBoomFleet: {
            count: unsafeWindow.logBoomFleet.count,
            cost: unsafeWindow.logBoomFleet.cost
        },
        clearCutterFleet: {
            count: unsafeWindow.clearCutterFleet.count,
            cost: unsafeWindow.clearCutterFleet.cost
        },
        oilWorkerFleet: {
            count: unsafeWindow.oilWorkerFleet.count,
            cost: unsafeWindow.oilWorkerFleet.cost
        },
        drillingRigFleet: {
            count: unsafeWindow.drillingRigFleet.count,
            cost: unsafeWindow.drillingRigFleet.cost
        },
        tankerTruckFleet: {
            count: unsafeWindow.tankerTruckFleet.count,
            cost: unsafeWindow.tankerTruckFleet.cost
        },
        oilPlatformFleet: {
            count: unsafeWindow.oilPlatformFleet.count,
            cost: unsafeWindow.oilPlatformFleet.cost
        },
        oilPipelineFleet: {
            count: unsafeWindow.oilPipelineFleet.count,
            cost: unsafeWindow.oilPipelineFleet.cost
        },
        oilRefineryFleet: {
            count: unsafeWindow.oilRefineryFleet.count,
            cost: unsafeWindow.oilRefineryFleet.cost
        },
        oilTankerFleet: {
            count: unsafeWindow.oilTankerFleet.count,
            cost: unsafeWindow.oilTankerFleet.cost
        },
        
    }
    backup.backupNames.push(name);
    localStorage.setItem('backupNames', JSON.stringify(backup.backupNames));
    localStorage.setItem('backup', JSON.stringify(backup.backups));
    backup.populateBackupList();
}
backup.init();
document.getElementById('save-backup').addEventListener("click", backup.save, false);
document.getElementById('load-backup').addEventListener("click", backup.load, false);