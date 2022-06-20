const { execSync } = require('child_process')

const dry = false

const actions = [
  `cd ${__dirname}`,
  'git pull',
  'npm install --production',
  'npm run build:web',
  'caprover deploy -c ./web/.caprover.yml',
  // "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Web Deployed\"}' https://devn8n.awe.dev/webhook/deploy-7319dee3-d970-4b91-8dd0-2a9e868cd741"
]

actions.forEach((action) => {
  console.log(action)
  if (!dry) execSync(action)
})

console.log('Web deployed!')
