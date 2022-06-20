function formatDates(context) {
  // const { serviceName, method, data, result, model, models, schema, items } = context
  const { schema, items } = context

  items.forEach((item) => {
    for (const prop in schema) {
      if (schema[prop].format === 'date-time' && item[prop]) {
        item[prop] = new Date(item[prop])
      }
    }
  })
}

export default {
  before: {
    all: [],
  },
  after: {
    all: [formatDates],
  },
}
