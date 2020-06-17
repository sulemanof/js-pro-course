function createCounter(initialValue = 0) {
  let currentValue = initialValue;

  return {
    increment(value = 1) {
      currentValue += value;
      return this;
    },

    decrement(value = 1) {
      currentValue -= value;
      return this;
    },

    showValue() {
      return currentValue;
    },

    discard() {
      currentValue = initialValue;
      return this;
    },
  };
}

