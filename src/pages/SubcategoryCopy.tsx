import React, { useEffect, useState } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonSlides,
  IonSlide,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
//import "./Subcategory.css";
import { RouteComponentProps } from "react-router-dom";
import credentials from "../firebase/Credentials";
import Card from "../components/Card";
const firebase = credentials();
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};
const Subcategory: React.FC<RouteComponentProps<{
  category: string;
  subcategory: string;
}>> = ({ match }) => {
  let [collection] = useState<
    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  >();
  let [questions, setQuestions] = useState<string[]>([]);
  let [answers, setAnswers] = useState<string[][]>([]);
  let [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  let [cardBackColor, setCardBackColor] = useState<string>("#50BFE6");
  let [correctAnswerNumber, setCorrectAnswerNumber] = useState<number>(-1);
  let [cardClicked, setCardClicked] = useState<boolean>(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection("Kategorien")
      .doc(match.params.category)
      .collection("Unterkategorien")
      .doc(match.params.subcategory)
      .collection("Questions")
      .onSnapshot((snapshot) => {
        let data: string[] = snapshot.docs.map((doc) => {
          //console.log(doc.data()["Question"]);
          correctAnswers.push(doc.data()["Correct"]);
          setCorrectAnswers([...correctAnswers]);
          return doc.data()["Question"];
        });
        let dataanswers: string[][] = snapshot.docs.map((doc) => {
          // console.log(doc.data()["Answers"]);
          return doc.data()["Answers"];
        });
        //console.log(data);
        setAnswers(dataanswers);
        setQuestions(data);
      });
  }, [collection]);
  const checkAnswer = (
    answer: string,
    correctAnswer: string,
    correctAnswerNumber: number,
    cardClicked: boolean
  ) => {
    // console.log("Your answer " + answer);
    // console.log("correctAnswer: " + correctAnswer);
    console.log("correctAnswerNumber in button " + correctAnswerNumber);
    setCorrectAnswerNumber(correctAnswerNumber);
    cardClicked = true;
    setCardClicked(cardClicked);
    console.log("in button cardclicked " + cardClicked);
    if (answer === correctAnswer) {
      console.log("Your answer is correct");
      // setCardBackColor("#50BFE6");
    } else {
      console.log("Your answer is wrong");
      // setCardBackColor("red");
    }
  };
  return (
    <React.Fragment>
      <IonToolbar color="primary">
        <IonTitle style={{ textAlign: "center" }}>
          {match.params.subcategory}
        </IonTitle>{" "}
        <IonButtons slot="start">
          <IonBackButton defaultHref="/quizlist"></IonBackButton>
        </IonButtons>
      </IonToolbar>
      <IonContent style={{}}>
        {questions.length > 0 && (
          <IonSlides pager={false} options={slideOpts}>
            {questions.map((question, i) => {
              const numpx = i === 0 ? "-6%" : "0%";
              return (
                // <Card color="white" backgroundColor="green">
                <IonSlide
                  //   style={{ marginLeft: numpx, marginRight: numpx }}
                  key={i}
                >
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "space-around",
                      overflow: "scroll",
                      scrollBehavior: "smooth",
                    }}
                  >
                    <Card color="white" backgroundColor="#50BFE6">
                      <div
                        style={{
                          //  paddingTop: 100,
                          fontSize: 28,
                          color: "white",
                        }}
                      >
                        {question}
                      </div>
                    </Card>
                    {answers.map((answer, j) => {
                      if (i === j) {
                        //console.log("i is " + i + " j is " + j);
                        //console.log(answer);
                        return (
                          <div>
                            {answer.map((erg, k) => {
                              console.log(answer);
                              //cardBackColor = "#50BFE6";
                              console.log(
                                "correctAnswerNumber in if " +
                                  correctAnswerNumber
                              );
                              console.log(k);
                              /*  if (
                                correctAnswerNumber !== -1 &&
                                k === correctAnswerNumber &&
                                cardClicked == true
                              ) {
                                cardBackColor = "blue";

                                cardClicked = false;
                                setCardClicked(cardClicked);
                                console.log("cardClicked in if " + cardClicked);
                                console.log(cardBackColor);
                              } else if (
                                correctAnswerNumber !== -1 &&
                                k !== correctAnswerNumber &&
                                cardClicked == true
                              ) {
                                cardBackColor = "red";

                                cardClicked = false;
                                setCardClicked(cardClicked);
                                console.log(
                                  "cardClicked in else if " + cardClicked
                                );
                                console.log(cardBackColor);
                              } */
                              return (
                                <Card
                                  checkAnswer={checkAnswer}
                                  color="white"
                                  backgroundColor={cardBackColor}
                                  submittedAnswer={erg}
                                  correctAnswer={answer[correctAnswers[j]]}
                                  correctAnswerNumber={correctAnswers[j]}
                                  cardClicked={cardClicked}
                                >
                                  <div
                                    style={{
                                      // paddingTop: 100,
                                      fontSize: 16,
                                      color: "white",
                                    }}
                                  >
                                    {erg}
                                  </div>
                                </Card>
                              );
                            })}
                            {/* } }) } */}
                          </div>
                        );
                      } else {
                        return "";
                      }
                    })}
                  </div>
                </IonSlide>
              );
            })}
          </IonSlides>
        )}
      </IonContent>
    </React.Fragment>
  );
};
export default Subcategory;
