#!/usr/bin/env node

const prompter = require('cli-prompter')
const template = require('fs-template')

const questions = [{
  type: 'text',
  name: 'name',
  message: 'Give your app a name',
  default: 'john'
}]

prompter(questions, (err, values) => {
  if (err) throw err

  const options = {
    source: '',
    target: '',
    vars: values
  }

  template(options, (err) => {
    if (err) throw err
  })
})
