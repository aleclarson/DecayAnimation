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

type.overrideMethods({
  __didStart: function(config) {
    this.time = this.startTime = Date.now();
    this.value = this.startValue = config.startValue;
    this.velocity = this.startVelocity != null ? this.startVelocity : this.startVelocity = config.velocity;
    return this._requestAnimationFrame();
  },
  __computeValue: function() {
    var elapsedTime, kd, kv;
    this._lastValue = this.value;
    this._lastVelocity = this.velocity;
    elapsedTime = Date.now() - this.startTime;
    kd = 1 - this.decayRate;
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

//# sourceMappingURL=map/DecayAnimation.map
