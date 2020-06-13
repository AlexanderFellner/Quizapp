import React, { useEffect, useState } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonSlides,
  IonSlide,
  IonBackButton,
  IonButtons,
  IonAlert,
  IonButton,
} from "@ionic/react";
import { createUserFields } from "../firebase/Authentication";
import "./Subcategory.css";
import { RouteComponentProps } from "react-router-dom";
import credentials from "../firebase/Credentials";
import Card from "../components/Card";
import { firestore } from "firebase";
const firebase = credentials();
const slideOpts = {
  initialSlide: 0,
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
  let [numberAnswers, setNumberAnswers] = useState<number>(0);
  let [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  let [cardBackColor, setCardBackColor] = useState<string>("#50BFE6");
  let [correctAnswerNumber, setCorrectAnswerNumber] = useState<number>(-1);
  let [cardClicked, setCardClicked] = useState<boolean>(false);
  let [slidenumber, setSlideNumber] = useState<number>(-1);
  let [cardnumber, setCardNumber] = useState<number>(-1);
  let [prevSlideNumbers, setPrevSlideNumbers] = useState<number[]>([]);
  let [showAlert, setShowAlert] = useState<boolean>(false);
  let [showAlert2, setShowAlert2] = useState<boolean>(false);
  let [points, setPoints] = useState<number>(0);
  //let numberdocs = useRef<number>(0);
  let [numberdocs, setNumberDocs] = useState<number>(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Kategorien")
      .doc(match.params.category)
      .collection("Unterkategorien")
      .doc(match.params.subcategory)
      .collection("Questions")
      .orderBy("Question")
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
    firebase
      .firestore()
      .collection("Kategorien")
      .doc(match.params.category)
      .collection("Unterkategorien")
      .doc(match.params.subcategory)
      .collection("Questions")
      .get()
      .then((snap) => {
        numberdocs = snap.size;
        setNumberDocs(numberdocs);
        console.log(snap.size);
      });
    console.log(firebase.auth().currentUser?.email);
  }, [collection]);
  const checkAnswer = (
    answer: string,
    correctAnswer: string,
    correctAnswerNum: number,
    cardClicked: boolean,
    slidenum: number,
    cardnum: number
  ) => {
    slidenumber = slidenum;
    setSlideNumber(slidenumber);

    cardnumber = cardnum;
    setCardNumber(cardnumber);
    prevSlideNumbers.push(slidenumber);
    setPrevSlideNumbers(prevSlideNumbers);

    correctAnswerNumber = correctAnswerNum;
    setCorrectAnswerNumber(correctAnswerNumber);
    if (!checkForSlideNumber()) {
      numberAnswers++;
      setNumberAnswers(numberAnswers);
      if (answer === correctAnswer) {
        points++;
        setPoints(points);
      }
      if (numberAnswers === numberdocs) {
        setShowAlert2(true);
        if (firebase.auth().currentUser?.email != null) {
          createUserFields(
            firebase.auth().currentUser?.uid,
            match.params.category,
            match.params.subcategory,
            points
          );
        }
      }
    }

    cardClicked = true;
    setCardClicked(cardClicked);

    if (checkForSlideNumber()) {
      setShowAlert(true);
    }
    // console.log(correctAnswer);
  };
  const checkForSlideNumber = () => {
    let prevNumbers = prevSlideNumbers.filter(
      (prevSlideNumber) => prevSlideNumber === slidenumber
    );
    return prevNumbers.length >= 2;
  };
  return (
    <React.Fragment>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/quizlist"></IonBackButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton>
            {" "}
            Punkte:{points}/{numberdocs}
          </IonButton>
        </IonButtons>
        <IonTitle> {match.params.subcategory}</IonTitle>
      </IonToolbar>

      <IonAlert
        isOpen={showAlert2}
        header={"Alle Fragen beantwortet!!"}
        message={`Du hast alle Fragen beantwortet in der Kategorie  ${match.params.subcategory}.Bitte wähle eine andere Kategorie. `}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Antwortebox"}
        message={
          "Du hast mehrmals versucht, eine Antwort auszuwählen.Zu jeder Frage kann nur eine Antwortbox ausgewählt werden."
        }
        buttons={["OK"]}
        cssClass="alert"
      ></IonAlert>
      <IonContent style={{}}>
        {questions.length > 0 && (
          <IonSlides pager={false} options={slideOpts}>
            {questions.map((question, i) => {
              const numpx = i === 0 ? "-6%" : "0%";
              return (
                <IonSlide key={i}>
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
                      <div>
                        <p
                          style={{
                            color: "red",
                            fontSize: 18,
                            whiteSpace: "pre-line",
                            lineHeight: 1.4,
                          }}
                        >
                          {question}
                        </p>
                      </div>
                    </Card>
                    {answers[i].map((answer, j) => {
                      cardBackColor = "#50BFE6";
                      if (cardClicked) {
                        /*  console.log("i " + i);
                        console.log("j " + j);
                        console.log("slidenumber " + slidenumber);
                        console.log("cardnumber " + cardnumber);
                        console.log(
                          "correctAnswerNumber " + correctAnswerNumber
                        ); */

                        if (i === slidenumber) {
                          console.log("slidenumber " + slidenumber);

                          if (
                            j === cardnumber &&
                            cardnumber === correctAnswerNumber
                          ) {
                            cardBackColor = "blue";
                            if (checkForSlideNumber()) {
                              cardBackColor = "#50BFE6";
                            }

                            cardClicked = false;
                          }
                          if (
                            j === cardnumber &&
                            cardnumber !== correctAnswerNumber
                          ) {
                            // console.log(j + " is red");
                            // if (checkForSlideNumber()) {
                            cardBackColor = "red";
                            // }
                            if (checkForSlideNumber()) {
                              cardBackColor = "#50BFE6";
                            }

                            cardClicked = false;
                          }

                          /* if (checkForSlideNumber()) {
                            if (
                              prohibitedSlideNumbers.indexOf(slidenumber) == -1
                            ) {
                              prohibitedSlideNumbers.push(slidenumber);
                            }
                          } */
                        }
                      }

                      return (
                        <div key={j}>
                          {/* {answer.map((erg, k) => { */}
                          {/* return ( */}
                          <Card
                            checkAnswer={checkAnswer}
                            color="white"
                            backgroundColor={cardBackColor}
                            submittedAnswer={answer}
                            correctAnswer={answers[i][correctAnswers[i]]}
                            correctAnswerNumber={correctAnswers[i]}
                            cardClicked={cardClicked}
                            slidenumber={i}
                            cardnumber={j}
                          >
                            <div
                              className="ion-text-sm-center"
                              style={{
                                fontSize: 12,
                                color: "white",
                                whiteSpace: "pre-line",
                                lineHeight: 1.4,
                                /*   display: "flex",
                                        justifyContent: "space-between", */
                              }}
                            >
                              {answer}
                            </div>
                          </Card>
                          {/* ); })} */}
                          {/* } }) } */}
                        </div>
                      );
                      //   } else {
                      //     return "";
                      //   }
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
