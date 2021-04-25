import {
  Paper,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "../helpers";
import QuizAnswers from "./QuizAnswers";

const useStyles = makeStyles(() => {
  return styles;
});

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);

  const [quizData, setQuizData] = useState([]);
  const classes = useStyles();

  const [currentQuizStep, setCurrentQuizStep] = useState("start");

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`;
      const { data } = await axios.get(url);

      const formattedCategory = data.results.map((cat) => {

        const incorrectAnswersIndexes = cat.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );

        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);
        
        return {
          ...cat,
          answers: cat.incorrect_answers,
        };
      });

      setQuizData(formattedCategory);
      setCurrentQuizStep("results");
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
  };

  //The next code give categories :p
  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    setCategories(data.trivia_categories);
  };

  useEffect(() => {
    fetchCategories();
    window.scrollTo(0, "20px");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuizData();
  };

  const resetQuiz = (e) => {
    e.preventDefault();
    setQuizData([]);
    setCurrentQuizStep("start");
    window.scrollTo(0, "20px");
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        {currentQuizStep === "start" ? (
          <>
            <Typography variant="h1" className={classes.mainTitle}>
              Hey, welcome!
            </Typography>
            <Typography variant="h1" className={classes.answer}>
              This is a hard quiz, can you reach the highest score?
            </Typography>
            <form onSubmit={handleSubmit}>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Start
              </Button>
            </form>
          </>
        ) : (
          <QuizAnswers
            classes={classes}
            quizData={quizData}
            resetQuiz={resetQuiz}
            categories={categories}
            currentQuizStep={currentQuizStep}
            setCurrentQuizStep={setCurrentQuizStep}
          />
        )}
      </Paper>
    </Container>
  );
};

export default QuizCategories;
