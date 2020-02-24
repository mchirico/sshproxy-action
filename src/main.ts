import * as core from '@actions/core'
import * as fs from 'fs'
import {wait} from './wait'
import {make} from './make'
import * as exec from '@actions/exec'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const startAsync = async (callback: {
  (text: string): void
  (arg0: string): void
}) => {
  await exec.exec('mkdir', ['-p', '.sshproxy-action'])
  callback('.sshproxy-action')

  const makefile = make()
  fs.writeFileSync('.sshproxy-action/Makefile', makefile)

  await exec.exec('make', ['-C', '.sshproxy-action', 'clone'])
  callback('Done clone')

  const ms: string = core.getInput('milliseconds')
  await wait(parseInt(ms, 10))
  callback('Done wait')

  const idRsa: string = core.getInput('id_rsa')
  fs.writeFileSync('.sshproxy-action/sshDocker/id_rsa', `${idRsa}`)

  const user: string = core.getInput('user')
  fs.writeFileSync('.sshproxy-action/sshDocker/USER', user)

  const server: string = core.getInput('server')
  fs.writeFileSync('.sshproxy-action/sshDocker/SERVER', server)

  await exec.exec('make', ['-C', '.sshproxy-action', 'runDocker'])
  core.setOutput('time', `Exe...`)
  callback('Done make')
}

async function run(): Promise<void> {
  try {
    startAsync((text: string) => {
      core.debug(text)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
