import express from 'express';
import bodyParser from 'body-parser';
import { add, subtract, multiply, divide } from '../calculator/calculator';
import { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

interface CalculationRequest {
  operation: string;
  a: string;
  b: string;
}

interface ComplexCalculationRequest {
  expression: string;
}

interface OperationResult {
  expression: string;
  result: string;
  steps: Array<{
    operation: string;
    operands: string[];
    intermediateResult: string;
  }>;
}

app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../../public')));



app.post('/calculate', (req: any, res: any) => {
  try {
    const { operation, a, b } = req.body as CalculationRequest;
    
    if (!operation || !a || !b) {
      return res.status(400).json({ error: 'Missing required parameters: operation, a, and b' });
    }
    
    let result: string;
    
    switch (operation.toLowerCase()) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation. Use add, subtract, multiply, or divide' });
    }
    
    res.json({ 
      operation, 
      a, 
      b, 
      result 
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.post('/calculate/complex', (req: Request, res: any) => {
  try {
    const { expression } = req.body as ComplexCalculationRequest;
    
    if (!expression) {
      return res.status(400).json({ error: 'Missing required parameter: expression' });
    }
    
    const result = evaluateComplexExpression(expression);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


app.get('/calculate/complex', (req: Request, res: any) => {
  try {
    const expression = req.query.expression as string;
    
    if (!expression) {
      return res.status(400).json({ error: 'Missing required parameter: expression' });
    }
    
    const result = evaluateComplexExpression(expression);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.get('/calculate', (req: Request, res: any) => {
  try {
    const operation = req.query.operation as string;
    const a = req.query.a as string;
    const b = req.query.b as string;
    
    if (!operation || !a || !b) {
      return res.status(400).json({ error: 'Missing required parameters: operation, a, and b' });
    }
    
    let result: string;
    
    switch (operation.toLowerCase()) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation. Use add, subtract, multiply, or divide' });
    }
    
    res.json({ 
      operation, 
      a, 
      b, 
      result 
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


function evaluateComplexExpression(expression: string): OperationResult {

  expression = expression.replace(/\s/g, '');
  

  if (!/^[0-9A-Fa-f+\-*/()]+$/.test(expression)) {
    throw new Error('Expression contains invalid characters. Only hex digits and operators (+, -, *, /) are allowed.');
  }

  const steps: Array<{
    operation: string;
    operands: string[];
    intermediateResult: string;
  }> = [];


  const tokens: Array<{type: 'operand' | 'operator', value: string}> = [];
  

  let currentToken = '';
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (/[0-9A-Fa-f]/.test(char)) {

      currentToken += char;
    } else if (/[+\-*/()]/.test(char)) {

      if (currentToken) {

        tokens.push({ type: 'operand', value: currentToken });
        currentToken = '';
      }

      tokens.push({ type: 'operator', value: char });
    }
  }
  

  if (currentToken) {
    tokens.push({ type: 'operand', value: currentToken });
  }
  

  if (tokens.length < 3) {
    throw new Error('Expression is too short or invalid');
  }
  

  let i = 1;
  while (i < tokens.length - 1) {
    if (tokens[i].type === 'operator' && (tokens[i].value === '*' || tokens[i].value === '/')) {
      if (tokens[i-1].type !== 'operand' || tokens[i+1].type !== 'operand') {
        throw new Error('Invalid expression format');
      }
      
      const operand1 = tokens[i-1].value;
      const operand2 = tokens[i+1].value;
      const operation = tokens[i].value;
      
      let result: string;
      if (operation === '*') {
        result = multiply(operand1, operand2);
        steps.push({
          operation: 'multiply',
          operands: [operand1, operand2],
          intermediateResult: result
        });
      } else {
        result = divide(operand1, operand2);
        steps.push({
          operation: 'divide',
          operands: [operand1, operand2],
          intermediateResult: result
        });
      }
      

      tokens.splice(i-1, 3, { type: 'operand', value: result });
      i = 1; 
    } else {
      i++;
    }
  }
  

  i = 1;
  while (i < tokens.length - 1) {
    if (tokens[i].type === 'operator' && (tokens[i].value === '+' || tokens[i].value === '-')) {
      if (tokens[i-1].type !== 'operand' || tokens[i+1].type !== 'operand') {
        throw new Error('Invalid expression format');
      }
      
      const operand1 = tokens[i-1].value;
      const operand2 = tokens[i+1].value;
      const operation = tokens[i].value;
      
      let result: string;
      if (operation === '+') {
        result = add(operand1, operand2);
        steps.push({
          operation: 'add',
          operands: [operand1, operand2],
          intermediateResult: result
        });
      } else {
        result = subtract(operand1, operand2);
        steps.push({
          operation: 'subtract',
          operands: [operand1, operand2],
          intermediateResult: result
        });
      }
      
      tokens.splice(i-1, 3, { type: 'operand', value: result });
      i = 1; 
    } else {
      i++;
    }
  }
  
  if (tokens.length !== 1 || tokens[0].type !== 'operand') {
    throw new Error('Invalid expression or calculation failed');
  }
  
  return {
    expression,
    result: tokens[0].value,
    steps
  };
}
app.get('/*catch-all', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Hexadecimal calculator server running on port ${PORT}`);
});