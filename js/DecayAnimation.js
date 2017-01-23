// Generated by CoffeeScript 1.11.1
var Animation, Number, Type, type;

Animation = require("Animated").Animation;

Number = require("Nan").Number;

Type = require("Type");

type = Type("DecayAnimation");

type.inherits(Animation);

type.defineOptions({
  decayRate: Number.isRequired,
  velocity: Number.isRequired,
  restVelocity: Number.isRequired
});

type.defineFrozenValues(function(options) {
  return {
    decayRate: options.decayRate,
    startVelocity: options.velocity,
    restVelocity: options.restVelocity
  };
});

type.defineValues({
  value: null,
  velocity: null,
  _lastValue: null,
  _lastVelocity: null
});

type.initInstance(function(options) {
  return this.velocity = options.velocity;
});

type.overrideMethods({
  __onAnimationStart: function() {
    this.value = this.fromValue;
    return this.__super(arguments);
  },
  __computeValue: function() {
    var elapsedTime, kd, kv;
    this._lastValue = this.value;
    this._lastVelocity = this.velocity;
    elapsedTime = Date.now() - this.startTime;
    kd = 1 - this.decayRate;
    kv = Math.exp(-1 * elapsedTime * kd);
    this.value = this.fromValue + (this.startVelocity / kd) * (1 - kv);
    this.velocity = this.startVelocity * kv;
    return this.value;
  },
  __onAnimationUpdate: function() {
    if (this.restVelocity >= Math.abs(this.velocity)) {
      return this.stop(true);
    }
  },
  __getNativeConfig: function() {
    return {
      type: "decay",
      decayRate: this.decayRate,
      velocity: this.velocity
    };
  }
});

module.exports = type.build();
