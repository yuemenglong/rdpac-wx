import Quiz = require("../entity/quiz");
import Question = require("../entity/question");
import QuizQuestion = require("../entity/quiz-question");
import Mark = require("../entity/mark");
/**
 * Created by yml on 2017/8/6.
 */

class QuizData {
    quiz: Quiz;
    question: QuizQuestion;
    mode: string;

    answer: string = "";
    mark: Mark = null;
}

module.exports = QuizData;
export =QuizData;

