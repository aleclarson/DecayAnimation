
{Animation} = require "Animated"
{Number} = require "Nan"

Type = require "Type"

type = Type "DecayAnimation"

type.inherits Animation

type.defineOptions
  decayRate: Number.isRequired
  velocity: Number.isRequired
  restVelocity: Number.isRequired

type.defineFrozenValues (options) ->

  decayRate: options.decayRate

  startVelocity: options.velocity

  restVelocity: options.restVelocity

type.defineValues

  value: null

  velocity: null

  _lastValue: null

  _lastVelocity: null

type.overrideMethods

  __didStart: (config) ->
    @time = @startTime = Date.now()
    @value = @startValue = config.startValue
    @velocity = @startVelocity ?= config.velocity
    @_requestAnimationFrame()

  __computeValue: ->

    @_lastValue = @value
    @_lastVelocity = @velocity

    elapsedTime = Date.now() - @startTime

    kd = 1 - @decayRate
    kv = Math.exp -1 * elapsedTime * kd

    @value = @startValue + (@startVelocity / kd) * (1 - kv)
    @velocity = @startVelocity * kv

    return @value

  __didUpdate: ->
    @finish() if (Math.abs @velocity) < @restVelocity

module.exports = type.build()
