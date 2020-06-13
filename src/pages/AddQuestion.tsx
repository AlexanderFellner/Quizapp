import React, { Fragment, FormEvent, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonCard,
} from "@ionic/react";
import credentials from "../firebase/Credentials";
const firebase = credentials();

const AddQuestion: React.FC = () => {
  let [category, setCategory] = useState<string>("");
  let [subcategory, setSubCategory] = useState<string>("");
  let [question, setQuestion] = useState<string>("");
  let [answer1, setAnswer1] = useState<string>("");
  let [answer2, setAnswer2] = useState<string>("");
  let [answer3, setAnswer3] = useState<string>("");
  let [answer4, setAnswer4] = useState<string>("");
  let [correctAnswer, setCorrectAnswer] = useState<number>();
  const Absenden = (e: FormEvent) => {
    e.preventDefault();

    if (
      !category ||
      !subcategory ||
      !question ||
      !answer1 ||
      !answer2 ||
      !answer3 ||
      !answer4 ||
      !correctAnswer
    ) {
      return;
    }
    correctAnswer = correctAnswer - 1;
    firebase
      .firestore()
      .collection("Kategorien")
      .doc(category)
      .set({})
      .then((res) => {
        firebase
          .firestore()
          .doc(`Kategorien/${category}`)
          .collection("Unterkategorien")
          .doc(`${subcategory}`)
          .set({})
          .then((res) => {
            firebase
              .firestore()
              .doc(`Kategorien/${category}`)
              .collection("Unterkategorien")
              .doc(`${subcategory}`)
              .collection("Questions")
              .add({
                Answers: [answer1, answer2, answer3, answer4],
                Correct: correctAnswer,
                Question: question,
              });
          });
      });
  };
  return (
    <Fragment>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Question</IonTitle>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={Absenden}>
          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Kategorie(z.B Geschichte, Musik, Naturwissenschaften)
                    </IonLabel>
                    <IonInput
                      required
                      maxlength={40}
                      onIonChange={(e: any) => {
                        setCategory(e.target.value);
                      }}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Subkategorie(z.B Pop,Chemie)
                    </IonLabel>
                    <IonInput
                      maxlength={40}
                      required
                      onIonChange={(e: any) => setSubCategory(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Frage
                    </IonLabel>
                    <IonInput
                      maxlength={60}
                      required
                      onIonChange={(e: any) => setQuestion(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Antwort 1
                    </IonLabel>
                    <IonInput
                      maxlength={150}
                      required
                      onIonChange={(e: any) => setAnswer1(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Antwort 2
                    </IonLabel>
                    <IonInput
                      maxlength={150}
                      required
                      onIonChange={(e: any) => setAnswer2(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Antwort 3
                    </IonLabel>
                    <IonInput
                      maxlength={150}
                      required
                      onIonChange={(e: any) => setAnswer3(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Antwort 4
                    </IonLabel>
                    <IonInput
                      maxlength={150}
                      required
                      onIonChange={(e: any) => setAnswer4(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Korrekte Antwort(Bitte nur eine Zahl zwischen 1 und 4
                      eintragen: 1 steht für die erste Antwort, 2 für die zweite
                      ,3 für die dritte, 4 für die vierte)
                    </IonLabel>
                    <IonInput
                      required
                      type="number"
                      min="1"
                      max="4"
                      onIonChange={(e: any) => setCorrectAnswer(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButtons class="ion-margin">
                    <IonButton type="submit" color="primary">
                      Absenden
                    </IonButton>
                    <IonButton type="reset" color="danger" fill="outline">
                      Zurücksetzen
                    </IonButton>
                  </IonButtons>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </form>
      </IonContent>
    </Fragment>
  );
};
export default AddQuestion;
