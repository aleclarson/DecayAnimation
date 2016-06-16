
{ Animation } = require "Animated"

getArgProp = require "getArgProp"
Type = require "Type"

type = Type "DecayAnimation"

type.inherits Animation

type.optionTypes =
  deceleration: Number
  velocity: Number
  restVelocity: Number

type.defineFrozenValues

  deceleration: getArgProp "deceleration"

  startVelocity: getArgProp "velocity"

  restVelocity: getArgProp "restVelocity"

type.defineValues

  value: null

  velocity: null

  _lastValue: null

  _lastVelocity: null

type.overrideMethods

  __didStart: ->
    @value = @startValue
    @velocity = @startVelocity
    @_requestAnimationFrame()

  __computeValue: ->

    @_lastValue = @value
    @_lastVelocity = @velocity

    elapsedTime = Date.now() - @startTime

    kd = 1 - @_deceleration
    kv = Math.exp -1 * elapsedTime * kd

    @value = @startValue + (@startVelocity / kd) * (1 - kv)
    @velocity = @startVelocity * kv

    return @value

  __didUpdate: ->
    @finish() if (Math.abs @velocity) < @restVelocity

module.exports = type.build()
