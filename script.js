let currentResult;
let term1, term2, rawTerm2;

// Genera una nueva expresión con dos términos
function generateExpression() {
  do {
    term1 = Math.floor(Math.random() * 201) - 100; // Número entre -100 y 100
    rawTerm2 = Math.floor(Math.random() * 201) - 100; // Número entre -100 y 100

    // Introduce el caso de doble signo negativo
    const isDoubleNegative = Math.random() > 0.7; // Probabilidad del 30% de generar un -(-n)
    term2 = isDoubleNegative ? -rawTerm2 : rawTerm2;

    const operator = Math.random() > 0.5 ? '+' : '-';
    currentResult = operator === '+' ? term1 + term2 : term1 - term2;
  } while (currentResult === 0); // Reintenta si el resultado es 0

  const term2Display = term2 !== rawTerm2 ? `-(${rawTerm2})` : term2;
  const operator = currentResult === term1 + term2 ? '+' : '-';
  const expressionText = operator === '+' ? `${term1} + (${term2Display})` : `${term1} - (${term2Display})`;

  document.getElementById('expression').innerText = expressionText;
  document.getElementById('result').innerText = '';
}

// Verifica si la respuesta es correcta, reproduce el sonido y muestra el resultado
function checkAnswer(answer) {
  const isPositive = currentResult >= 0;
  const userIsCorrect = (answer === 'positive' && isPositive) || (answer === 'negative' && !isPositive);

  if (userIsCorrect) {
    document.getElementById('result').innerText = '¡Correcto! 🎉';
    playSound('correct');
  } else {
    const correctAnswer = isPositive ? 'positivo' : 'negativo';
    const resultDescription = isPositive ? 'positivo' : 'negativo'; // Calcula si el resultado es positivo o negativo
    document.getElementById('result').innerText = 
      `Incorrecto. ❌ La contestación correcta es ${correctAnswer}. El resultado es ${currentResult}. Por lo tanto, el resultado es ${resultDescription}.`;
    playSound('incorrect');
  }
}

// Reproduce un sonido según la respuesta
function playSound(type) {
  const sound = document.getElementById(type === 'correct' ? 'correctSound' : 'incorrectSound');
  sound.play();
}

// Genera la primera expresión al cargar la página
generateExpression();