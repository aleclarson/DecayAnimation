var Animation, Type, getArgProp, type;

Animation = require("Animated").Animation;

getArgProp = require("getArgProp");

Type = require("Type");

type = Type("DecayAnimation");

type.inherits(Animation);

type.optionTypes = {
  deceleration: Number,
  velocity: Number,
  restVelocity: Number
};

type.defineFrozenValues({
  deceleration: getArgProp("deceleration"),
  startVelocity: getArgProp("velocity"),
  restVelocity: getArgProp("restVelocity")
});

type.defineValues({
  value: null,
  velocity: null,
  _lastValue: null,
  _lastVelocity: null
});

type.overrideMethods({
  __didStart: function() {
    this.value = this.startValue;
    this.velocity = this.startVelocity;
    return this._requestAnimationFrame();
  },
  __computeValue: function() {
    var elapsedTime, kd, kv;
    this._lastValue = this.value;
    this._lastVelocity = this.velocity;
    elapsedTime = Date.now() - this.startTime;
    kd = 1 - this._deceleration;
    kv = Math.exp(-1 * elapsedTime * kd);
    this.value = this.startValue + (this.startVelocity / kd) * (1 - kv);
    this.velocity = this.startVelocity * kv;
    return this.value;
  },
  __didUpdate: function() {
    if ((Math.abs(this.velocity)) < this.restVelocity) {
      return this.finish();
    }
  }
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/DecayAnimation.map
