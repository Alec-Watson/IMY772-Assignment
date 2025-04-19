<script setup lang="ts">
import { ref } from 'vue'

const expression = ref('')
const result = ref('')

const append = (char: string) => {
  expression.value += char
}

const clear = () => {
  expression.value = ''
  result.value = ''
}
const delChar = () => {
  expression.value = expression.value.slice(0, -1)
}
const calculate = async () => {
  if (!expression.value) return
  try {
    const res = await fetch(`http://localhost:3000/calculate/complex?expression=${encodeURIComponent(expression.value)}`)
    const data = await res.json()
    result.value = data.result||data.error
  } catch (err) {
    result.value = err
  }
}
</script>

<template>
    <div class="calculator">
      <div class="display">
        <div class="expression">{{ expression }}</div>
        <div class="result">{{ result }}</div>
      </div>
  
      <div class="buttons">
        <button @click="append('A')">A</button>
        <button @click="append('B')">B</button>
        <button @click="append('C')">C</button>
        <button @click="append('D')">D</button>
        <button @click="append('E')">E</button>
        <button @click="append('F')">F</button>
  
        <button @click="append('0')">0</button>
        <button @click="append('1')">1</button>
        <button @click="append('2')">2</button>
        <button @click="append('3')">3</button>
        <button @click="append('4')">4</button>
        <button @click="append('5')">5</button>
        <button @click="append('6')">6</button>
        <button @click="append('7')">7</button>
        <button @click="append('8')">8</button>
        <button @click="append('9')">9</button>
  
        <button @click="append('+')">+</button>
        <button @click="append('-')">-</button>
        <button @click="append('*')">*</button>
        <button @click="append('/')">/</button>
      </div>
  
      <div class="control-buttons">
        <button class="clear" @click="clear">Clear</button>
        <button class="del" @click="delChar">DEL</button>
        <button class="equals" @click="calculate">=</button>
      </div>
    </div>
  </template>
  

<style scoped>
.calculator {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 1rem;
  background: #f0f4f8;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.display {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.75rem;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.expression {
  font-size: 1.2rem;
  color: #555;
}

.result {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-top: 0.25rem;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.control-buttons {
  display: flex;
  gap: 0.75rem;
}

button {
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 0.6rem;
  background: linear-gradient(to bottom, #e0e0e0, #cacaca);
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

button:hover {
  background: linear-gradient(to bottom, #d0d0d0, #b8b8b8);
}

button:active {
  transform: scale(0.98);
  background: #aaa;
}

.control-buttons button.clear {
  background-color: #ff7070;
  color: black;
}

.control-buttons button.del {
  background-color: #ffa94d;
  color: black;
}

.control-buttons button.equals {
  background-color: #4caf50;
  color: black;
  flex: 1;
}

</style>
