<script>
  import { tick } from 'svelte'
  import faker from 'minifaker'
  import 'minifaker/locales/en'

  let input = ['an']
  let data = {}

  let currentKey = '1'
  const lists = {
    '1': ['an array of', 'an object with'],
    'an array of': [1,2,4,8,10, 20, 25,30,50],
    'an object': ['with'],
    'an array of_number': ['objects', 'strings', 'numbers', 'random numbers'],
    objects: ['with these props'],
    strings: ['that start with'],
    numbers: ['that start at'],
    operators: ['and', 'or'],
    'that start with': ['anything'],
    'with these props': ['comma,separated,lists,with,key:value', 'name:firstName'],
    props: ['with']
  }
  $: currentDataList = lists[currentKey]

  const fakerMap = (type) => {
    if (faker[type]) {
      return faker[type]
    }
    return {
      strings: faker.firstName
    }[type]
  }

  async function next(e) {
    // console.log(e)
    let val = e.target.value
    if (['Tab', 'Enter'].includes(e.key) && !e.shiftKey && val) {
      e.preventDefault()
      input = input.concat('')
      e.target.dataset.key = currentKey
      if (lists[val]) {
        currentKey = val
      } else if (['and', 'or'].includes(val)) {
        currentKey += '_' + val
      } else if (currentKey.endsWith('with')) {
        currentKey = 'operators'
      } else if (Number(val)) {
        currentKey += '_number'
      } else {
        console.log('unknown' + val)
      }
      await tick()
      e.target.nextSibling.focus()
      try {
        parse(input)
      } catch (e) {}
    }
  }

  function parse(input) {
    let structure = input[0]
    data = structure === 'an array of' ? [] : {}

    if (structure === 'an array of') {
      let length = input.find((i) => Number(i))
      data = Array(Number(length)).fill('')
      let typeIndex = input.findIndex((i) => i === length) + 1
      let type = input[typeIndex]
      if (type === 'objects') {
        data = data.map(() => ({}))
        let propsIndex = input.findIndex((i) => i.includes('props')) + 1
        let props = input[propsIndex]
          .split(',')
          .map((prop) => prop.split(':'))
          .map(([key, faker]) => {
            return { key, value: fakerMap(faker) }
          })
        data = data.map((item) => {
          return props.reduce((acc, prop) => {
            acc[prop.key] = prop.value()
            return acc
          }, {})
        })
      }
      if (type === 'strings') {
        data = data.map((item) => {
          return fakerMap('strings')()
        })
      }
    }
  }

  function setKey(e) {
    if (e.target.dataset.key) {
      currentKey = e.target.dataset.key
    }
  }
</script>

<div class="m-16">
  <h1 class="text-4xl font-bold">Data Generator</h1>
  <div class="my-8 border-4 rounded shadow h-8 px-4 flex">
    {#each input as i, index}
      <input
        on:focus={setKey}
        on:input={(e) => (e.target.size = e.target.value.length + 1)}
        id="input-{index}"
        on:keydown={next}
        type="text"
        list="currentList"
        bind:value={i} />
    {/each}
  </div>

<datalist id="currentList">
  {#each currentDataList as value}
    <option {value} />{/each}
</datalist>

<button class="my-4 py-2 bg-blue-600 text-white px-4" on:click={() => navigator.clipboard.writeText(JSON.stringify(data))}>Copy Data</button>
<pre class="p-4 m-y shadow">{JSON.stringify(data, null, 2)}</pre>

<br>
<br>
<br>

<strong>Current Key: {currentKey}</strong>
<div>help: https://www.npmjs.com/package/minifaker</div>

</div>