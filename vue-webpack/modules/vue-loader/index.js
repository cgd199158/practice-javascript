const regTempalte = /\<template\>(.+?)\<\/template\>/;
const regScript = /\<script\>(.+?)\<\/script\>/;
const regFisrstSign = /(\{)/

module.exports = function(sourece){
  const _source = sourece.replace(/[\r\n]/g, '')
  const template = _source.match(regTempalte)[1]
  const script = _source.match(regScript)[1]
  const result =  script.replace(regFisrstSign, '$1 template:' + '`' + template + '`' + ',')
  return result
}