
// ==UserScript==
// @author		nnfm26
// @namespace	http://userscripts.org/users/56730
// @name		Gamezer
// @description	gaud gamzer.com Ads
// @include		http://www.gamezer.com/billiards/*
// ==/UserScript==


package Box2D.Dynamics
{
    import Box2D.Collision.Shapes.*;
    import Box2D.Common.Math.*;
    import Box2D.Dynamics.Contacts.*;
    import Box2D.Dynamics.Joints.*;

    public class b2Body extends Object
    {
        public var m_next:b2Body;
        public var m_contactList:b2ContactEdge;
        public var m_angularVelocity:Number;
        public var m_shapeList:b2Shape;
        public var m_force:b2Vec2;
        public var m_mass:Number;
        public var m_sweep:b2Sweep;
        public var m_xf:b2XForm;
        public var m_torque:Number;
        public var m_userData:Object;
        public var m_flags:uint;
        public var m_world:b2World;
        public var m_prev:b2Body;
        public var m_invMass:Number;
        public var m_type:int;
        public var m_linearDamping:Number;
        public var m_angularDamping:Number;
        public var m_invI:Number;
        public var m_linearVelocity:b2Vec2;
        public var m_sleepTime:Number;
        public var m_shapeCount:int;
        public var m_jointList:b2JointEdge;
        public var m_I:Number;
        static public var e_fixedRotationFlag:uint = 64;
        static public var e_frozenFlag:uint = 2;
        static public var e_maxTypes:uint = 3;
        static public var e_sleepFlag:uint = 8;
        static private var s_massData:b2MassData;
        static public var e_bulletFlag:uint = 32;
        static public var e_staticType:uint = 1;
        static public var e_islandFlag:uint = 4;
        static public var e_allowSleepFlag:uint = 16;
        static private var s_xf1:b2XForm;
        static public var e_dynamicType:uint = 2;

        public function b2Body(param1:b2BodyDef, param2:b2World)
        {
            var _loc_3:b2Mat22;
            var _loc_4:b2Vec2;
            m_xf = new b2XForm();
            m_sweep = new b2Sweep();
            m_linearVelocity = new b2Vec2();
            m_force = new b2Vec2();
            m_flags = 0;
            if (param1.isBullet)
            {
                m_flags = m_flags | e_bulletFlag;
            }// end if
            if (param1.fixedRotation)
            {
                m_flags = m_flags | e_fixedRotationFlag;
            }// end if
            if (param1.allowSleep)
            {
                m_flags = m_flags | e_allowSleepFlag;
            }// end if
            if (param1.isSleeping)
            {
                m_flags = m_flags | e_sleepFlag;
            }// end if
            m_world = param2;
            m_xf.position.SetV(param1.position);
            m_xf.R.Set(param1.angle);
            m_sweep.localCenter.SetV(param1.massData.center);
            m_sweep.t0 = 1;
            var _loc_5:* = param1.angle;
            m_sweep.a = param1.angle;
            m_sweep.a0 = _loc_5;
            _loc_3 = m_xf.R;
            _loc_4 = m_sweep.localCenter;
            m_sweep.c.x = _loc_3.col1.x * _loc_4.x + _loc_3.col2.x * _loc_4.y;
            m_sweep.c.y = _loc_3.col1.y * _loc_4.x + _loc_3.col2.y * _loc_4.y;
            m_sweep.c.x = m_sweep.c.x + m_xf.position.x;
            m_sweep.c.y = m_sweep.c.y + m_xf.position.y;
            m_sweep.c0.SetV(m_sweep.c);
            m_jointList = null;
            m_contactList = null;
            m_prev = null;
            m_next = null;
            m_linearDamping = param1.linearDamping;
            m_angularDamping = param1.angularDamping;
            m_force.Set(0, 0);
            m_torque = 0;
            m_linearVelocity.SetZero();
            m_angularVelocity = 0;
            m_sleepTime = 0;
            m_invMass = 0;
            m_I = 0;
            m_invI = 0;
            m_mass = param1.massData.mass;
            if (m_mass > 0)
            {
                m_invMass = 1 / m_mass;
            }// end if
            if ((m_flags & b2Body.e_fixedRotationFlag) == 0)
            {
                m_I = param1.massData.I;
            }// end if
            if (m_I > 0)
            {
                m_invI = 1 / m_I;
            }// end if
            if (m_invMass == 0 && m_invI == 0)
            {
                m_type = e_staticType;
            }
            else
            {
                m_type = e_dynamicType;
            }// end else if
            m_userData = param1.userData;
            m_shapeList = null;
            m_shapeCount = 0;
            return;
        }

        public function GetLinearVelocityFromWorldPoint(param1:b2Vec2) : b2Vec2
        {
            return new b2Vec2(m_linearVelocity.x + m_angularVelocity * (param1.y - m_sweep.c.y), m_linearVelocity.x - m_angularVelocity * (param1.x - m_sweep.c.x));
        }

        public function SetLinearVelocity(param1:b2Vec2) : void
        {
            m_linearVelocity.SetV(param1);
            return;
        }

        public function WakeUp() : void
        {
            m_flags = m_flags & ~e_sleepFlag;
            m_sleepTime = 0;
            return;
        }

        public function GetLocalCenter() : b2Vec2
        {
            return m_sweep.localCenter;
        }

        public function ApplyTorque(param1:Number) : void
        {
            if (IsSleeping())
            {
                WakeUp();
            }// end if
            m_torque = m_torque + param1;
            return;
        }

        public function IsFrozen() : Boolean
        {
            return (m_flags & e_frozenFlag) == e_frozenFlag;
        }

        public function IsDynamic() : Boolean
        {
            return m_type == e_dynamicType;
        }

        public function GetLinearVelocity() : b2Vec2
        {
            return m_linearVelocity;
        }

        public function SynchronizeTransform() : void
        {
            var _loc_1:b2Mat22;
            var _loc_2:b2Vec2;
            m_xf.R.Set(m_sweep.a);
            _loc_1 = m_xf.R;
            _loc_2 = m_sweep.localCenter;
            m_xf.position.x = m_sweep.c.x - (_loc_1.col1.x * _loc_2.x + _loc_1.col2.x * _loc_2.y);
            m_xf.position.y = m_sweep.c.y - (_loc_1.col1.y * _loc_2.x + _loc_1.col2.y * _loc_2.y);
            return;
        }

        public function GetInertia() : Number
        {
            return m_I;
        }

        public function IsSleeping() : Boolean
        {
            return (m_flags & e_sleepFlag) == e_sleepFlag;
        }

        public function SetMassFromShapes() : void
        {
            var _loc_1:b2Shape;
            var _loc_2:Number;
            var _loc_3:Number;
            var _loc_4:b2MassData;
            var _loc_5:b2Mat22;
            var _loc_6:b2Vec2;
            var _loc_7:int;
            if (m_world.m_lock == true)
            {
                return;
            }// end if
            m_mass = 0;
            m_invMass = 0;
            m_I = 0;
            m_invI = 0;
            _loc_2 = 0;
            _loc_3 = 0;
            _loc_4 = s_massData;
            _loc_1 = m_shapeList;
            while (_loc_1)
            {
                // label
                _loc_1.ComputeMass(_loc_4);
                m_mass = m_mass + _loc_4.mass;
                _loc_2 = _loc_2 + _loc_4.mass * _loc_4.center.x;
                _loc_3 = _loc_3 + _loc_4.mass * _loc_4.center.y;
                m_I = m_I + _loc_4.I;
                _loc_1 = _loc_1.m_next;
            }
            if (m_mass > 0)
            {
                m_invMass = 1 / m_mass;
                _loc_2 = _loc_2 * m_invMass;
                _loc_3 = _loc_3 * m_invMass;
            }// end if
            if (m_I > 0 && (m_flags & e_fixedRotationFlag) == 0)
            {
                m_I = m_I - m_mass * (_loc_2 * _loc_2 + _loc_3 * _loc_3);
                m_invI = 1 / m_I;
            }
            else
            {
                m_I = 0;
                m_invI = 0;
            }// end else if
            m_sweep.localCenter.Set(_loc_2, _loc_3);
            _loc_5 = m_xf.R;
            _loc_6 = m_sweep.localCenter;
            m_sweep.c.x = _loc_5.col1.x * _loc_6.x + _loc_5.col2.x * _loc_6.y;
            m_sweep.c.y = _loc_5.col1.y * _loc_6.x + _loc_5.col2.y * _loc_6.y;
            m_sweep.c.x = m_sweep.c.x + m_xf.position.x;
            m_sweep.c.y = m_sweep.c.y + m_xf.position.y;
            m_sweep.c0.SetV(m_sweep.c);
            _loc_1 = m_shapeList;
            while (_loc_1)
            {
                // label
                _loc_1.UpdateSweepRadius(m_sweep.localCenter);
                _loc_1 = _loc_1.m_next;
            }
            _loc_7 = m_type;
            if (m_invMass == 0 && m_invI == 0)
            {
                m_type = e_staticType;
            }
            else
            {
                m_type = e_dynamicType;
            }// end else if
            if (_loc_7 != m_type)
            {
                _loc_1 = m_shapeList;
                while (_loc_1)
                {
                    // label
                    _loc_1.RefilterProxy(m_world.m_broadPhase, m_xf);
                    _loc_1 = _loc_1.m_next;
                }
            }// end if
            return;
        }

        public function PutToSleep() : void
        {
            m_flags = m_flags | e_sleepFlag;
            m_sleepTime = 0;
            m_linearVelocity.SetZero();
            m_angularVelocity = 0;
            m_force.SetZero();
            m_torque = 0;
            return;
        }

        public function GetJointList() : b2JointEdge
        {
            return m_jointList;
        }

        public function SetXForm(param1:b2Vec2, param2:Number) : Boolean
        {
            var _loc_3:b2Shape;
            var _loc_4:b2Mat22;
            var _loc_5:b2Vec2;
            var _loc_6:Boolean;
            var _loc_7:Boolean;
            if (m_world.m_lock == true)
            {
                return true;
            }// end if
            if (IsFrozen())
            {
                return false;
            }// end if
            m_xf.R.Set(param2);
            m_xf.position.SetV(param1);
            _loc_4 = m_xf.R;
            _loc_5 = m_sweep.localCenter;
            m_sweep.c.x = _loc_4.col1.x * _loc_5.x + _loc_4.col2.x * _loc_5.y;
            m_sweep.c.y = _loc_4.col1.y * _loc_5.x + _loc_4.col2.y * _loc_5.y;
            m_sweep.c.x = m_sweep.c.x + m_xf.position.x;
            m_sweep.c.y = m_sweep.c.y + m_xf.position.y;
            m_sweep.c0.SetV(m_sweep.c);
            var _loc_8:* = param2;
            m_sweep.a = param2;
            m_sweep.a0 = _loc_8;
            _loc_6 = false;
            _loc_3 = m_shapeList;
            while (_loc_3)
            {
                // label
                _loc_7 = _loc_3.Synchronize(m_world.m_broadPhase, m_xf, m_xf);
                if (_loc_7 == false)
                {
                    _loc_6 = true;
                    break;
                }// end if
                _loc_3 = _loc_3.m_next;
            }
            if (_loc_6 == true)
            {
                m_flags = m_flags | e_frozenFlag;
                m_linearVelocity.SetZero();
                m_angularVelocity = 0;
                _loc_3 = m_shapeList;
                while (_loc_3)
                {
                    // label
                    _loc_3.DestroyProxy(m_world.m_broadPhase);
                    _loc_3 = _loc_3.m_next;
                }
                return false;
            }// end if
            m_world.m_broadPhase.Commit();
            return true;
        }

        public function GetLocalPoint(param1:b2Vec2) : b2Vec2
        {
            return b2Math.b2MulXT(m_xf, param1);
        }

        public function ApplyForce(param1:b2Vec2, param2:b2Vec2) : void
        {
            if (IsSleeping())
            {
                WakeUp();
            }// end if
            m_force.x = m_force.x + param1.x;
            m_force.y = m_force.y + param1.y;
            m_torque = m_torque + ((param2.x - m_sweep.c.x) * param1.y - (param2.y - m_sweep.c.y) * param1.x);
            return;
        }

        public function SynchronizeShapes() : Boolean
        {
            var _loc_1:b2XForm;
            var _loc_2:b2Mat22;
            var _loc_3:b2Vec2;
            var _loc_4:b2Shape;
            var _loc_5:Boolean;
            _loc_1 = s_xf1;
            _loc_1.R.Set(m_sweep.a0);
            _loc_2 = _loc_1.R;
            _loc_3 = m_sweep.localCenter;
            _loc_1.position.x = m_sweep.c0.x - (_loc_2.col1.x * _loc_3.x + _loc_2.col2.x * _loc_3.y);
            _loc_1.position.y = m_sweep.c0.y - (_loc_2.col1.y * _loc_3.x + _loc_2.col2.y * _loc_3.y);
            _loc_5 = true;
            _loc_4 = m_shapeList;
            while (_loc_4)
            {
                // label
                _loc_5 = _loc_4.Synchronize(m_world.m_broadPhase, _loc_1, m_xf);
                if (_loc_5 == false)
                {
                    break;
                }// end if
                _loc_4 = _loc_4.m_next;
            }
            if (_loc_5 == false)
            {
                m_flags = m_flags | e_frozenFlag;
                m_linearVelocity.SetZero();
                m_angularVelocity = 0;
                _loc_4 = m_shapeList;
                while (_loc_4)
                {
                    // label
                    _loc_4.DestroyProxy(m_world.m_broadPhase);
                    _loc_4 = _loc_4.m_next;
                }
                return false;
            }// end if
            return true;
        }

        public function GetAngle() : Number
        {
            return m_sweep.a;
        }

        public function GetXForm() : b2XForm
        {
            return m_xf;
        }

        public function ApplyImpulse(param1:b2Vec2, param2:b2Vec2) : void
        {
            if (IsSleeping())
            {
                WakeUp();
            }// end if
            m_linearVelocity.x = m_linearVelocity.x + m_invMass * param1.x;
            m_linearVelocity.y = m_linearVelocity.y + m_invMass * param1.y;
            m_angularVelocity = m_angularVelocity + m_invI * ((param2.x - m_sweep.c.x) * param1.y - (param2.y - m_sweep.c.y) * param1.x);
            return;
        }

        public function GetNext() : b2Body
        {
            return m_next;
        }

        public function GetMass() : Number
        {
            return m_mass;
        }

        public function GetLinearVelocityFromLocalPoint(param1:b2Vec2) : b2Vec2
        {
            var _loc_2:b2Mat22;
            var _loc_3:b2Vec2;
            _loc_2 = m_xf.R;
            _loc_3 = new b2Vec2(_loc_2.col1.x * param1.x + _loc_2.col2.x * param1.y, _loc_2.col1.y * param1.x + _loc_2.col2.y * param1.y);
            _loc_3.x = _loc_3.x + m_xf.position.x;
            _loc_3.y = _loc_3.y + m_xf.position.y;
            return new b2Vec2(m_linearVelocity.x + m_angularVelocity * (_loc_3.y - m_sweep.c.y), m_linearVelocity.x - m_angularVelocity * (_loc_3.x - m_sweep.c.x));
        }

        public function GetAngularVelocity() : Number
        {
            return m_angularVelocity;
        }

        public function SetAngularVelocity(param1:Number) : void
        {
            m_angularVelocity = param1;
            return;
        }

        public function SetMass(param1:b2MassData) : void
        {
            var _loc_2:b2Shape;
            var _loc_3:b2Mat22;
            var _loc_4:b2Vec2;
            var _loc_5:int;
            if (m_world.m_lock == true)
            {
                return;
            }// end if
            m_invMass = 0;
            m_I = 0;
            m_invI = 0;
            m_mass = param1.mass;
            if (m_mass > 0)
            {
                m_invMass = 1 / m_mass;
            }// end if
            if ((m_flags & b2Body.e_fixedRotationFlag) == 0)
            {
                m_I = param1.I;
            }// end if
            if (m_I > 0)
            {
                m_invI = 1 / m_I;
            }// end if
            m_sweep.localCenter.SetV(param1.center);
            _loc_3 = m_xf.R;
            _loc_4 = m_sweep.localCenter;
            m_sweep.c.x = _loc_3.col1.x * _loc_4.x + _loc_3.col2.x * _loc_4.y;
            m_sweep.c.y = _loc_3.col1.y * _loc_4.x + _loc_3.col2.y * _loc_4.y;
            m_sweep.c.x = m_sweep.c.x + m_xf.position.x;
            m_sweep.c.y = m_sweep.c.y + m_xf.position.y;
            m_sweep.c0.SetV(m_sweep.c);
            _loc_2 = m_shapeList;
            while (_loc_2)
            {
                // label
                _loc_2.UpdateSweepRadius(m_sweep.localCenter);
                _loc_2 = _loc_2.m_next;
            }
            _loc_5 = m_type;
            if (m_invMass == 0 && m_invI == 0)
            {
                m_type = e_staticType;
            }
            else
            {
                m_type = e_dynamicType;
            }// end else if
            if (_loc_5 != m_type)
            {
                _loc_2 = m_shapeList;
                while (_loc_2)
                {
                    // label
                    _loc_2.RefilterProxy(m_world.m_broadPhase, m_xf);
                    _loc_2 = _loc_2.m_next;
                }
            }// end if
            return;
        }

        public function IsStatic() : Boolean
        {
            return m_type == e_staticType;
        }

        public function GetWorldVector(param1:b2Vec2) : b2Vec2
        {
            return b2Math.b2MulMV(m_xf.R, param1);
        }

        public function GetShapeList() : b2Shape
        {
            return m_shapeList;
        }

        public function Advance(param1:Number) : void
        {
            m_sweep.Advance(param1);
            m_sweep.c.SetV(m_sweep.c0);
            m_sweep.a = m_sweep.a0;
            SynchronizeTransform();
            return;
        }

        public function SetBullet(param1:Boolean) : void
        {
            if (param1)
            {
                m_flags = m_flags | e_bulletFlag;
            }
            else
            {
                m_flags = m_flags & ~e_bulletFlag;
            }// end else if
            return;
        }

        public function CreateShape(param1:b2ShapeDef) : b2Shape
        {
            var _loc_2:b2Shape;
            if (m_world.m_lock == true)
            {
                return null;
            }// end if
            _loc_2 = b2Shape.Create(param1, m_world.m_blockAllocator);
            _loc_2.m_next = m_shapeList;
            m_shapeList = _loc_2;
            m_shapeCount++;
            _loc_2.m_body = this;
            _loc_2.CreateProxy(m_world.m_broadPhase, m_xf);
            _loc_2.UpdateSweepRadius(m_sweep.localCenter);
            return _loc_2;
        }

        public function IsConnected(param1:b2Body) : Boolean
        {
            var _loc_2:b2JointEdge;
            _loc_2 = m_jointList;
            while (_loc_2)
            {
                // label
                if (_loc_2.other == param1)
                {
                    return _loc_2.joint.m_collideConnected == false;
                }// end if
                _loc_2 = _loc_2.next;
            }
            return false;
        }

        public function DestroyShape(param1:b2Shape) : void
        {
            var _loc_2:b2Shape;
            var _loc_3:b2Shape;
            var _loc_4:Boolean;
            if (m_world.m_lock == true)
            {
                return;
            }// end if
            param1.DestroyProxy(m_world.m_broadPhase);
            _loc_2 = m_shapeList;
            _loc_3 = null;
            _loc_4 = false;
            while (_loc_2 != null)
            {
                // label
                if (_loc_2 == param1)
                {
                    if (_loc_3)
                    {
                        _loc_3.m_next = param1.m_next;
                    }
                    else
                    {
                        m_shapeList = param1.m_next;
                    }// end else if
                    _loc_4 = true;
                    break;
                }// end if
                _loc_3 = _loc_2;
                _loc_2 = _loc_2.m_next;
            }
            param1.m_body = null;
            param1.m_next = null;
            m_shapeCount--;
            b2Shape.Destroy(param1, m_world.m_blockAllocator);
            return;
        }

        public function GetUserData()
        {
            return m_userData;
        }

        public function IsBullet() : Boolean
        {
            return (m_flags & e_bulletFlag) == e_bulletFlag;
        }

        public function GetWorldCenter() : b2Vec2
        {
            return m_sweep.c;
        }

        public function AllowSleeping(param1:Boolean) : void
        {
            if (param1)
            {
                m_flags = m_flags | e_allowSleepFlag;
            }
            else
            {
                m_flags = m_flags & ~e_allowSleepFlag;
                WakeUp();
            }// end else if
            return;
        }

        public function SetUserData(param1) : void
        {
            m_userData = param1;
            return;
        }

        public function GetLocalVector(param1:b2Vec2) : b2Vec2
        {
            return b2Math.b2MulTMV(m_xf.R, param1);
        }

        public function GetWorldPoint(param1:b2Vec2) : b2Vec2
        {
            var _loc_2:b2Mat22;
            var _loc_3:b2Vec2;
            _loc_2 = m_xf.R;
            _loc_3 = new b2Vec2(_loc_2.col1.x * param1.x + _loc_2.col2.x * param1.y, _loc_2.col1.y * param1.x + _loc_2.col2.y * param1.y);
            _loc_3.x = _loc_3.x + m_xf.position.x;
            _loc_3.y = _loc_3.y + m_xf.position.y;
            return _loc_3;
        }

        public function GetWorld() : b2World
        {
            return m_world;
        }

        public function GetPosition() : b2Vec2
        {
            return m_xf.position;
        }
    }
}