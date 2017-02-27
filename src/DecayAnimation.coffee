
{Animation} = require "Animated"
{Number} = require "Nan"

Type = require "Type"

type = Type "DecayAnimation"

type.inherits Animation

type.defineArgs ->
  required: yes
  types:
    decayRate: Number
    velocity: Number
    restVelocity: Number

type.defineFrozenValues (options) ->

  decayRate: options.decayRate

  startVelocity: options.velocity

  restVelocity: options.restVelocity

type.defineValues

  value: null

  velocity: null

  _lastValue: null

  _lastVelocity: null

type.initInstance (options) ->
  @velocity = options.velocity

type.overrideMethods

  __onAnimationStart: ->
    @value = @fromValue
    @__super arguments

  __computeValue: ->

    @_lastValue = @value
    @_lastVelocity = @velocity

    elapsedTime = Date.now() - @startTime

    kd = 1 - @decayRate
    kv = Math.exp -1 * elapsedTime * kd

    @value = @fromValue + (@startVelocity / kd) * (1 - kv)
    @velocity = @startVelocity * kv

    return @value

  __onAnimationUpdate: ->
    if @restVelocity >= Math.abs @velocity
      @stop yes

  __getNativeConfig: ->
    {type: "decay", @decayRate, @velocity}

module.exports = type.build()
