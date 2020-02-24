import * as core from '@actions/core'
import * as fs from 'fs'
import {wait} from './wait'
import * as exec from '@actions/exec'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const startAsync = async (callback: {
  (text: string): void
  (arg0: string): void
}) => {
  await exec.exec('make', ['clone'])
  callback('Done clone')

  const ms: string = core.getInput('milliseconds')
  await wait(parseInt(ms, 10))
  callback('Done wait')

  const idRsa: string = core.getInput('id_rsa')
  fs.writeFileSync('./sshDocker/id_rsa', `${idRsa}`)

  const user: string = core.getInput('user')
  fs.writeFileSync('./sshDocker/USER', user)

  const server: string = core.getInput('server')
  fs.writeFileSync('./sshDocker/SERVER', server)

  await exec.exec('make', ['runDocker'])
  core.setOutput('time', `Exe...`)
  callback('Done make')
}

async function cmds(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    fs.writeFileSync('.junk', `stuff here: ${ms}`)

    startAsync((text: string) => {
      core.debug(text)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

// async function run(): Promise<void> {
//   try {
//     core.debug('here...')
//
//     const ms: string = core.getInput('milliseconds')
//     core.debug(`Waiting ${ms} milliseconds ...`)
//
//     core.debug(new Date().toTimeString())
//     await wait(parseInt(ms, 10))
//     core.debug(new Date().toTimeString())
//
//     core.setOutput('time', new Date().toTimeString())
//   } catch (error) {
//     core.setFailed(error.message)
//   }
// }

cmds()
