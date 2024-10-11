const questions = [
    {
        question: "Сколько единиц в двоичной записи десятичного числа 194,5?",
        variants: ["5", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        question: "Какое из чисел отвечает условию: A = A7₁₆, B = 251₈, A < C < B?",
        variants: ["10101100", "10101010", "10101011", "10101000"],
        correctAnswer: 3
    },
    {
        question: "Какое из приведённых имён удовлетворяет логическому условию: ¬(последняя буква гласная → первая буква согласная) ∧ вторая буква согласная?",
        variants: ["ИРИНА", "АРТЁМ", "СТЕПАН", "МАРИЯ"],
        correctAnswer: 3
    },
    {
        question: "Для какого из указанных значений X истинно высказывание ¬((X > 2) → (X > 3))?",
        variants: ["1", "2", "3", "4"],
        correctAnswer: 2
    },
    {
        question: "Какое из четырёх сообщений прошло без ошибки?",
        variants: ["110100001001100111", "111010000100110011", "110100001001100111", "11010000100110010"],
        correctAnswer: 1
    },
    {
        question: "Сообщение уменьшилось на 480 бит. Какова длина сообщения в символах?",
        variants: ["30", "60", "120", "480"],
        correctAnswer: 2
    },
    {
        question: "В коробке лежат 64 цветных карандаша, из них синие. Сообщение о том, что достали синий карандаш, несёт 4 бита информации. Сколько синих карандашей в коробке?",
        variants: [],
        correctAnswer: "16"
    },
    {
        question: "Сколько лампочек нужно, чтобы передать 20 сигналов?",
        variants: ["6", "5", "3", "4"],
        correctAnswer: 2
    },
    {
        question: "Каков объём памяти для 60 паролей?",
        variants: ["540 байт", "600 байт", "660 байт", "720 байт"],
        correctAnswer: 2
    },
    {
        question: "Сообщение уменьшилось на 480 бит. Какова длина сообщения в символах?",
        variants: ["30", "60", "120", "480"],
        correctAnswer: 2
    },
    {
        question: "Световое табло состоит из лампочек. Каждая лампочка может находиться в одном из трёх состояний («включено», «выключено» или «мигает»). Сколько лампочек нужно, чтобы передать 20 различных сигналов?",
        variants: ["6", "5", "3", "4"],
        correctAnswer: 2
    },
    {
        question: "Для регистрации на сайте требуется придумать пароль. Длина пароля — 11 символов. Символы — десятичные цифры и 12 букв алфавита (включая заглавные и строчные). Определите объём памяти для хранения 60 паролей.",
        variants: ["540 байт", "600 байт", "660 байт", "720 байт"],
        correctAnswer: 2
    }
];

function renderQuestions() {
    const container = document.getElementById('questions');
    questions.forEach((question, index) => {
        const questionHTML = `
            <table border="1" id="q${index + 1}">
                <tr>
                    <td rowspan="3">${index + 1}</td>
                    <td colspan="4" class="task">${question.question}</td>
                </tr>
                ${question.variants.length > 0 ? `
                <tr>
                    ${question.variants.map((variant, i) => `
                        <td class="variant">${i + 1}) ${variant}</td>
                    `).join('')}
                </tr>` : ''}
                <tr>
                    <td colspan="5">
                        <input id="a${index + 1}" type="text" class="answer" placeholder="Введите номер ответа${question.variants.length === 0 ? '' : ' (1-4)'}" />
                    </td>
                </tr>
            </table>
        `;
        container.innerHTML += questionHTML;
    });
}

function checkAnswers() {
    let correctCount = 0;

    questions.forEach((question, index) => {
        const answerInput = document.getElementById(`a${index + 1}`);
        const answer = answerInput.value;

        if (question.variants.length > 0) {
            // Вопрос с вариантами ответов
            if (parseInt(answer) === question.correctAnswer) {
                answerInput.classList.add('correct');
                correctCount++;
            } else {
                answerInput.classList.add('incorrect');
            }
        } else {
            // Вопрос с текстовым ответом
            if (answer === question.correctAnswer) {
                answerInput.classList.add('correct');
                correctCount++;
            } else {
                answerInput.classList.add('incorrect');
            }
        }
    });

    const totalQuestions = questions.length;
    const grade = calculateGrade(correctCount, totalQuestions);
    document.getElementById('result').innerText = `Правильных ответов: ${correctCount} из ${totalQuestions}. Ваша оценка: ${grade}`;
}

function calculateGrade(correctCount, totalQuestions) {
    const percentage = (correctCount / totalQuestions) * 100;

    if (percentage >= 90) {
        return "Отлично (5)";
    } else if (percentage >= 75) {
        return "Хорошо (4)";
    } else if (percentage >= 50) {
        return "Удовлетворительно (3)";
    } else {
        return "Неудовлетворительно (2)";
    }
}

// Вызов функции рендеринга вопросов при загрузке страницы
window.onload = renderQuestions;
