// ==UserScript==
// @name       Playcanvas Gridsnap
// @namespace  http://gamejolt.com/profile/crefossus/184271/
// @version    0.1
// @description  Allows you to set grid units to snap to. Use at your own risk!
// @match      http://playcanvas.com/*
// @copyright  2014+, Crefossus
// @run-at document-end
// @grant unsafeWindow
// ==/UserScript==

//use this script at your own risk! you may need to increase the timeout on about line 83&92 if you load slowly

var uw = unsafeWindow;

//inject a dropdown into the toolbar

//make sure the page loads! If you don't use setTimeout or some way to 
//delay this it won't work
gridsnap();
rotsnap();


function gridsnap()
{
    if(document.getElementById("button-1092")==undefined)
    {
        setTimeout(gridsnap, 500);
    }
    else
    {
        
        var toolbar = document.getElementById("button-1092"); 
        var list = document.createElement("select");
        list.setAttribute("id","tanslationSnapAmount");
        
        //this could probably be a function
        var optionhalf = document.createElement("option");
        optionhalf.setAttribute("value",.5);
        optionhalf.appendChild(document.createTextNode(".5"));
        
        var option1 = document.createElement("option");
        option1.setAttribute("value",1);
        option1.appendChild(document.createTextNode("1"));
        
        var option2 = document.createElement("option");
        option2.setAttribute("value",2);
        option2.appendChild(document.createTextNode("2"));
        
        var option3 = document.createElement("option");
        option3.setAttribute("value",3);
        option3.appendChild(document.createTextNode("3"));
        
        var option4 = document.createElement("option");
        option4.setAttribute("value",4);
        option4.appendChild(document.createTextNode("4"));
        
        var option5 = document.createElement("option");
        option5.setAttribute("value",5);
        option5.appendChild(document.createTextNode("5"));
        
        var option10 = document.createElement("option");
        option10.setAttribute("value",10);
        option10.appendChild(document.createTextNode("10"));
        
        var option15 = document.createElement("option");
        option15.setAttribute("value",15);
        option15.appendChild(document.createTextNode("15"));
        
        list.appendChild(optionhalf);
        list.appendChild(option1);
        list.appendChild(option2);
        list.appendChild(option3);
        list.appendChild(option4);
        list.appendChild(option5);
        list.appendChild(option10);
        list.appendChild(option15);
        
        
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("value","1");
        checkbox.setAttribute("id","cb-translate");
        
        insertAfter(toolbar,checkbox);
        insertAfter(toolbar,list);
        
        //toolbar.appendChild(list);
        //toolbar.appendChild(checkbox);
        
        //wait a while
        setTimeout(overrideDrag,5000);
    }
}

function rotsnap()
{
    if(document.getElementById("button-1094")==undefined)
    {
        setTimeout(rotsnap, 500);
    }
    else
    {
        var toolbar = document.getElementById("button-1094"); 
        var list = document.createElement("select");
        list.setAttribute("id","rotationSnapAmount");
        
        var option1 = document.createElement("option");
        option1.setAttribute("value",1);
        option1.appendChild(document.createTextNode("1"));
        
        var option5 = document.createElement("option");
        option5.setAttribute("value",5);
        option5.appendChild(document.createTextNode("5"));
        
        var option10 = document.createElement("option");
        option10.setAttribute("value",10);
        option10.appendChild(document.createTextNode("10"));
        
        var option15 = document.createElement("option");
        option15.setAttribute("value",15);
        option15.appendChild(document.createTextNode("15"));
        
        var option30 = document.createElement("option");
        option30.setAttribute("value",30);
        option30.appendChild(document.createTextNode("30"));
        
        var option90 = document.createElement("option");
        option90.setAttribute("value",90);
        option90.appendChild(document.createTextNode("90"));
        
        var option180 = document.createElement("option");
        option180.setAttribute("value",180);
        option180.appendChild(document.createTextNode("180"));
        
        
        list.appendChild(option1);
        list.appendChild(option5);
        list.appendChild(option10);
        list.appendChild(option15);
        list.appendChild(option30);
        list.appendChild(option90);
        list.appendChild(option180);
        
        
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("value","1");
        checkbox.setAttribute("id","cb-rotate");
        
        insertAfter(toolbar,checkbox);
        insertAfter(toolbar,list);
        
        //toolbar.appendChild(list);
        //toolbar.appendChild(checkbox);
        
        //wait a while
        setTimeout(overrideRotateDrag,5000);
    }
}





//attempt to override _dragTranslateStyleControl
function overrideDrag()
{
    uw.pc.designer.GizmoComponentSystem.prototype._dragTranslateStyleControl=function(name, x, y) {
        with(uw.pc.designer.GizmoComponentSystem.prototype){
            console.log("drag");
            var currentNearClipCoord = this._screenToNearClipCoord(x, y);
            var initialNearClipCoord = this._screenToNearClipCoord(this.draggingState.startX, this.draggingState.startY);
            var cameraEntity = this.camera;
            var eyePosition = cameraEntity.getPosition();
            var lookDir = cameraEntity.forward;
            var entityWtm = this.draggingState.originalTransform;
            var refWorld = this.currentCoordSys === uw.pc.designer.GizmoComponentSystem.GizmoCoordSys.WORLD;
            var axes = [];
            if(refWorld) {
                axes[0] = uw.pc.Vec3.RIGHT;
                axes[1] = uw.pc.Vec3.UP;
                axes[2] = uw.pc.Vec3.BACK
            }else {
                axes[0] = entityWtm.getX().normalize();
                axes[1] = entityWtm.getY().normalize();
                axes[2] = entityWtm.getZ().normalize()
            }
            var planePoint = entityWtm.getTranslation();
            var planeNormal;
            if(this.draggingState.axis === 0) {
                planeNormal = Math.abs(axes[1].dot(lookDir)) > Math.abs(axes[2].dot(lookDir)) ? axes[1] : axes[2]
            }else {
                if(this.draggingState.axis === 1) {
                    planeNormal = Math.abs(axes[0].dot(lookDir)) > Math.abs(axes[2].dot(lookDir)) ? axes[0] : axes[2]
                }else {
                    if(this.draggingState.axis === 2) {
                        planeNormal = Math.abs(axes[0].dot(lookDir)) > Math.abs(axes[1].dot(lookDir)) ? axes[0] : axes[1]
                    }
                }
            }
            var plane = new pc.shape.Plane(planePoint, planeNormal);
            if(cameraEntity.camera.projection === uw.pc.scene.Projection.PERSPECTIVE) {
                var currentIntersection = plane.intersectPosition(eyePosition, currentNearClipCoord);
                var initialIntersection = plane.intersectPosition(eyePosition, initialNearClipCoord)
                }else {
                    var temp = currentNearClipCoord.clone().add(lookDir);
                    var currentIntersection = plane.intersectPosition(currentNearClipCoord, temp);
                    temp.add2(initialNearClipCoord, lookDir);
                    var initialIntersection = plane.intersectPosition(initialNearClipCoord, temp)
                    }
            var dragVectorWorld = currentIntersection.clone().sub(initialIntersection);
            var gizmoTransform = new pc.Mat4(axes[0].x, axes[0].y, axes[0].z, 0, axes[1].x, axes[1].y, axes[1].z, 0, axes[2].x, axes[2].y, axes[2].z, 0, planePoint.x, planePoint.y, planePoint.z, 1);
            var invGizTrans = gizmoTransform.clone().invert();
            var dragVectorGizmo = new pc.Vec3;
            invGizTrans.transformVector(dragVectorWorld, dragVectorGizmo);
            var axis = this.draggingState.axis;
            var translate = axes[axis].clone().scale(dragVectorGizmo.data[axis]);
            //modify how much to translate based on 
            console.log(translate.data[axis]);
            if(document.getElementById("cb-translate").checked)
            {
                var e = document.getElementById("tanslationSnapAmount");
                var roundValue = e.options[e.selectedIndex].value;
                translate.data[axis]=roundToNearest(translate.data[axis],roundValue);
            }
            
            var entity = this.draggingState.entity;
            var parentWtm = entity.getParent().getWorldTransform();
            var invParentWtm = parentWtm.clone().invert();
            invParentWtm.transformVector(translate, translate);
            var undoable = false;
            var newValue = this.draggingState.original.clone().add(translate);
            this.draggingState.current = newValue;
            uw.pc.designer.api.setEntityTransformComponent(entity, name, newValue, undoable);
            
        }
    };
}

//overrideRotate

function overrideRotateDrag()
{
    uw.pc.designer.GizmoComponentSystem.prototype._dragRotateStyleControl = function(name, x, y) {
        console.log("started");
        with(uw.pc.designer.GizmoComponentSystem.prototype)
        {
            var currentNearClipCoord = this._screenToNearClipCoord(x, y);
            var initialNearClipCoord = this._screenToNearClipCoord(this.draggingState.startX, this.draggingState.startY);
            var cameraEntity = this.camera;
            var eyePosition = cameraEntity.getPosition();
            var lookDir = cameraEntity.forward;
            var entityWtm = this.draggingState.originalTransform;
            var refWorld = this.currentCoordSys === uw.pc.designer.GizmoComponentSystem.GizmoCoordSys.WORLD;
            var axes = [];
            if(refWorld) {
                axes[0] = uw.pc.Vec3.RIGHT;
                axes[1] = uw.pc.Vec3.UP;
                axes[2] = uw.pc.Vec3.BACK
            }else {
                axes[0] = entityWtm.getX().normalize();
                axes[1] = entityWtm.getY().normalize();
                axes[2] = entityWtm.getZ().normalize()
            }
            var planePoint = entityWtm.getTranslation();
            var planeNormal = axes[this.draggingState.axis];
            var plane = new uw.pc.shape.Plane(planePoint, planeNormal);
            if(cameraEntity.camera.projection === uw.pc.scene.Projection.PERSPECTIVE) {
                var currentIntersection = plane.intersectPosition(eyePosition, currentNearClipCoord);
                var initialIntersection = plane.intersectPosition(eyePosition, initialNearClipCoord)
                }else {
                    var temp = currentNearClipCoord.clone().add(lookDir);
                    var currentIntersection = plane.intersectPosition(currentNearClipCoord, temp);
                    temp.add2(initialNearClipCoord, lookDir);
                    var initialIntersection = plane.intersectPosition(initialNearClipCoord, temp)
                    }
            var dragVectorWorld = new uw.pc.Vec3;
            dragVectorWorld.sub2(currentIntersection, initialIntersection);
            var clickAxisZ = planePoint.clone().sub(initialIntersection).normalize();
            var clickAxisX = (new uw.pc.Vec3).cross(clickAxisZ, planeNormal);
            var clickTransform = new uw.pc.Mat4(clickAxisX.x, clickAxisX.y, clickAxisX.z, 0, planeNormal.x, planeNormal.y, planeNormal.z, 0, clickAxisZ.x, clickAxisZ.y, clickAxisZ.z, 0, initialIntersection.x, initialIntersection.y, initialIntersection.z, 1);
            var invClickTransform = clickTransform.clone().invert();
            var dragVec = new uw.pc.Vec3;
            invClickTransform.transformVector(dragVectorWorld, dragVec);
            //needed to dupe drag_scale_factor
            var DRAG_SCALE_FACTOR =0.5;
            var angle = dragVec.x * DRAG_SCALE_FACTOR;

            var entity = this.draggingState.entity;
            var rot = (new uw.pc.Mat4).setFromAxisAngle(planeNormal, angle * uw.pc.math.RAD_TO_DEG);
          
            var invParentWtm = entity.getParent().getWorldTransform().clone().invert();
            var updatedTransform = (new uw.pc.Mat4).mul2(invParentWtm, rot);
            updatedTransform.mul(entityWtm);
            var newValue = updatedTransform.getEulerAngles();
            
            if(document.getElementById("cb-rotate").checked)
            {
                var e = document.getElementById("rotationSnapAmount");
                var roundValue = e.options[e.selectedIndex].value;
                console.log(this.draggingState.axis);
                newValue.data[0]=roundToNearest(newValue.data[0],roundValue);
                newValue.data[1]=roundToNearest(newValue.data[1],roundValue);
                newValue.data[2]=roundToNearest(newValue.data[2],roundValue);
                /*
                if(this.draggingState.axis==0)
                {
                    newValue.data[0]=roundToNearest(newValue.data[0],roundValue);
                }
                else if(this.draggingState.axis==1)
                {
                    newValue.data[1]=roundToNearest(newValue.data[1],roundValue);
                }
                else if(this.draggingState.axis==2)
                {
                    newValue.data[2]=roundToNearest(newValue.data[2],roundValue);
                }
                    */
               
            }
            
            var undoable = false;
            this.draggingState.current = newValue;
            uw.pc.designer.api.setEntityTransformComponent(entity, name, newValue, undoable);
        }
        console.log("ended");
    };
    
}


function roundToNearest(n,roundAmount){
    //example 5,.5
    //decide which way to go
    //get the multiple of the roundAmount
    var multiple = Math.round(n/roundAmount);
    return roundAmount*multiple;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}