var Animation, Type, type;

Animation = require("Animated").Animation;

Type = require("Type");

type = Type("DecayAnimation");

type.inherits(Animation);

type.optionTypes = {
  deceleration: Number,
  velocity: Number,
  restVelocity: Number
};

type.defineFrozenValues({
  deceleration: function(options) {
    return options.deceleration;
  },
  startVelocity: function(options) {
    return options.velocity;
  },
  restVelocity: function(options) {
    return options.restVelocity;
  }
});

type.defineValues({
  value: null,
  velocity: null,
  _lastValue: null,
  _lastVelocity: null
});

type.defineMethods({
  __onStart: function() {
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
  __didComputeValue: function() {
    if ((Math.abs(this.velocity)) < this.restVelocity) {
      return this.finish();
    }
  }
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/DecayAnimation.map
