import * as core from '@actions/core'
import * as fs from 'fs'
import {wait} from './wait'
import * as exec from '@actions/exec'

async function cmds(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    fs.writeFileSync('.junk', `stuff here: ${ms}`)

    const idRsa: string = core.getInput('id_rsa')
    fs.writeFileSync('./sshDocker/id_rsa', `a${idRsa}`)

    const user: string = core.getInput('user')
    fs.writeFileSync('./sshDocker/USER', user)

    const server: string = core.getInput('server')
    fs.writeFileSync('./sshDocker/SERVER', server)

    await exec.exec('make', ['runDocker'])
    core.setOutput('time', `Exe...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function run(): Promise<void> {
  try {
    core.debug('here...')

    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
cmds()
