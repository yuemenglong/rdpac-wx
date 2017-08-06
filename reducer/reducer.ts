/**
 * Created by <yuemenglong@126.com> on 2017/7/27.
 */

import ActionType = require("../common/action-type")
import {Action} from "../common/interface";
import WxUser = require("../common/entity/wx-user");
import _ = require("../libs/lodash/index");
import QuizQuestion = require("../common/entity/quiz-question");
import kit = require("../kit/kit");
import State = require("../common/state/state");
import debug = require("../kit/debug");


function go(state: State, action: Action) {
    switch (action.type) {
        case ActionType.FETCH_WX_USER_SUCC: {
            let wxUser = action.data;
            return _.defaults({wxUser}, state);
        }
        case ActionType.FETCH_USER_SUCC: {
            let user = action.data;
            return _.defaults({user}, state);
        }
        case ActionType.REGIST_USER_SUCC: {
            let user = action.data;
            return _.defaults({user}, state);
        }
        case ActionType.NEW_QUIZ_SUCC: {
            let quiz = action.data;
            return kit.update(state, "user.quizs[]", [], quiz)
        }
        case ActionType.FETCH_QUIZ_SUCC: {
            let quiz = action.data;
            return kit.update(state, "user.quizs[id]", [quiz.id], quiz);
        }
        case ActionType.CHANGE_ANSWER: {
            let answer = action.data;
            return kit.update(state, "quiz.answer", [], answer);
        }
        case ActionType.FETCH_QUESTION_SUCC: {
            let question = action.data;
            return kit.update(state, "questions[$idx]", [question.id], question)
        }
        case ActionType.PUT_ANSWER_SUCC: {
            let question = action.data;
            return kit.updates("user.quizs[id].questions[id]", [question.quizId, question.id], question)
                .update("quiz.idx", [], question.idx)
                .update("quiz.answer", [], "")
                .call(state);
        }
        case ActionType.MERGE_ANSWER: {
            let {qzId, qtId, answer} = action.data;
            return kit.update(state, "user.quizs[id].questions[id].answer",
                [qzId, qtId], answer);
        }
        case ActionType.SET_QUIZ_DATA: {
            return kit.update(state, "quiz{}", [], action.data);
        }
        case ActionType.SET_RESULT_DATA: {
            return kit.update(state, "result{}", [], action.data);
        }
        case ActionType.PUT_QUIZ_SUCC: {
            let {id, corrected, answered} = action.data;
            return kit.update(state, "user.quizs[id]{}", [id], {corrected, answered});
        }
        case ActionType.PUT_STUDY_SUCC: {
            let study = action.data;
            return kit.update(state, "user.study{}", [], study);
        }
        default:
            return state;
    }
}

function reducer(state: State, action: Action): Object {
    debug("Before", state, action);
    let next = go(state, action);
    debug("After", next, action);
    return next
}


module.exports = reducer;
export =reducer;
