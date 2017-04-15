#!/usr/bin/env node

const pull = require('pull-stream/pull')
const values = require('pull-stream/sources/values')
const drain = require('pull-stream/sinks/drain')

const prompt = require('pull-prompt')
const template = require('fs-template')

const target = process.cwd()
const folder = process.argv[2]
const source = `${target}/node_modules/${folder}`
const pasta = require(`${source}/pasta.js`)

let vars = {}
let i = 0

pull(
  values(pasta),
  prompt(),
  drain(answer => {
    vars[pasta[i++].name] = answer
  }, err => {
    if (err) throw err
    template({
      source,
      target,
      vars,
      ignore: 'pasta.js'
    }, (err) => {
      if (err) throw err
    })
  })
)
